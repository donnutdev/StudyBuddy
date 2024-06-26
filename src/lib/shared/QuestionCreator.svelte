<script lang="ts">
    import type {Session, SupabaseClient} from "@supabase/supabase-js";
    import SvelteMarkdown from "svelte-markdown";
    export let supabase: SupabaseClient;
    export let session: Session;
    import {SubjectTopics} from "$lib/static-files/SubjectTopics";
    import {generated_ques, generation_disabled, last_generated, current_countdown, starred, questionOpen} from "$lib/public/stores";
    import {onMount, onDestroy} from "svelte";
    import {createQuestion, regenerateQuestion} from "$lib/geminiApi";

    let subject: string = "Physics";
    let topic: string;
    let generated: any = $generated_ques;

    let countdownInterval: any;
    let selected_text = "";
    $: currently_quoted = selected_text.length > 0

    $: subject_topics = SubjectTopics[subject]

    const debounce: number = 30000;

    function makeid() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 5) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    function processLatex(process_string: string) {
        let found_latex = false;
        let index = 0;
        let id_latex = {}
        for (let c = 0; c < process_string.length; c++) {
            if (process_string[c] === "$" && found_latex === true) {
                if (c - index > 15) {
                    continue
                }
                found_latex = false
                const newLatex = process_string.substring(index, c)
                const newId = makeid()
                process_string.replace(newLatex, newId)
                id_latex[newId] = newLatex
            }else if (process_string[c] === "$" && found_latex === false){
                index = c
                found_latex = true
            }
        }
        return {process_string, id_latex}
    }

    function handleGeneration(regenerate=false) {
        selected_text = "";
        starred.set(true)
        generation_disabled.set(true)
        last_generated.set(Date.now())
        if (regenerate == true){
            generated.then((d) => {
                generated = regenerateQuestion(d, selected_text)
            })
        }else {
            generated = createQuestion(subject, topic, 3)
        }
        generated.then(() => {
            starred.set(false)
        })
        generated_ques.set(generated)
        current_countdown.set(debounce)
        questionOpen.set(true)
    }

    async function handleStar() {
        starred.set(true)
        await generated.then(async (r) => {
            const {data, error} = await supabase
                .from("generated_questions")
                .insert({
                    question: r.questions.question,
                    parts: r.questions.parts,
                    user_id: session?.user?.id,
                    subject: r.subject,
                    topic: r.topic,
                })
        })

    }

    onMount(() => {
        countdownInterval = setInterval(() => {
            const now = Date.now()
            if ($current_countdown <= 0){
                generation_disabled.set(false)
            }else {
                current_countdown.set(debounce - (now - $last_generated))
            }
        }, 1000)
    })
    onDestroy(() => {
        clearInterval(countdownInterval)
    })

    function getSelected() {
        if(window.getSelection) { return window.getSelection(); }
        else if(document.getSelection) { return document.getSelection(); }
        else {
            var selection = document.selection && document.selection.createRange();
            if(selection.text) { return selection.text; }
            return false;
        }
    }

    function showPopup() {
        const selection = getSelected()

        if (selection && selection.toString().length > 0) {
            selected_text = selection.toString()
        }else{
            selected_text = ""
        }
    }
</script>

<div class="flex flex-col place-content-between h-full xl:min-w-[900px]">
    <div class="inline-flex gap-2 p-5 pt-0">
        <select class="select select-bordered w-full min-w-xs" bind:value={subject}>
            {#each Object.keys(SubjectTopics) as subj, i (subj)}
                {#if subj.startsWith("div")}
                    <option disabled>{subj.split(" ").slice(1).join(" ")}</option>
                {:else if i === 0}
                    <option value={subj} selected>{subj}</option>
                {:else}
                    <option value={subj}>{subj}</option>
                {/if}
            {/each}
        </select>
        <select id="topic" class="select select-bordered w-full min-w-xs" bind:value={topic}>
            {#each subject_topics as topic, i (topic)}
                {#if topic.startsWith("div")}
                    <option disabled>{topic.split(" ").slice(1).join(" ")}</option>
                {:else if i === 0}
                    <option value={topic} selected>{topic}</option>
                {:else}
                    <option value={topic}>{topic}</option>
                {/if}
            {/each}
        </select>
    </div>
    {#if $questionOpen}
        {#await generated}
            <div class="flex flex-col gap-4 w-full p-5 overflow-y-scroll h-full ">
                <div class="skeleton h-40"></div>
                <div class="skeleton h-20"></div>
                <div class="skeleton h-20"></div>
                <div class="skeleton h-20"></div>
            </div>
        {:then question}
            <div class="flex flex-col gap-4 w-full p-5 overflow-y-scroll h-full" on:mouseup={showPopup} role="textbox" tabindex="-1">
                <div class=""><SvelteMarkdown source={question.questions.question} /></div>
                {#each question.questions.parts as part, i}
                    <div class="inline-flex"><span class="font-bold pr-1">{i+1}.</span><SvelteMarkdown source={part.part}/></div>
                    <div class="blur transition duration-300 hover:blur-0"><SvelteMarkdown source={part.answer}/></div>
                {/each}
            </div>
        {:catch error}
            <div class="flex flex-col gap-4 w-full p-5 overflow-y-scroll h-full">
                <p style="color: red" class="text-xl">{error.message}</p>
            </div>
        {/await}
    {:else}
        <div class="flex flex-col gap-4 w-full p-5 overflow-y-scroll h-full">
            <h1 class='text-primary text-xl'>
                To generate a question, choose a subject and a topic. We will automatically generate a question catering to that specific topic along with answers.<br/>
                Since this uses AI, it may provide inaccurate answers or incomplete questions. If so, please regenerate the question.
            </h1>
        </div>
    {/if}

    <div class="inline-flex">
        <div>
            <div class="inline-flex gap-5 p-5 pb-0">
                <div class="relative inline-flex group">
                    <div class="absolute transition-all duration-300 opacity-70 -inset-px bg-gradient-to-r from-blue-500 via-teal-300 to-indigo-600 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-300 animate-tilt p-3"></div>
                    <button disabled={$generation_disabled} on:click={handleGeneration} class="ring ring-primary relative btn leading-none disabled:bg-base-200 hover:bg-white w-44">
                    <span class:hidden={!$generation_disabled} class="countdown text-2xl text-black content-center">
                        <span style="--value:{Math.round($current_countdown/1000)};"></span>
                    </span>
                        <span class:hidden={$generation_disabled}>Generate Question</span>
                    </button>
                </div>
            </div>
        </div>
        <div>
            <div class="inline-flex gap-5 p-5 pb-0">
                <div class="relative inline-flex group">
                    <div class="tooltip tooltip-right" data-tip="Think this question is great? Click this so we know!">
                    <button class="relative btn leading-none hover:bg-white swap" on:click={handleStar} disabled={$starred} class:swap-active={$starred}>
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="26px" viewBox="0 0 24 24" width="26px"  class="swap-on fill-amber-400"><g><path d="M0 0h24v24H0V0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/></g><g><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/></g></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"  class="swap-off fill-amber-400"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>
                    </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="inline-flex gap-5 p-5 pb-0" class:hidden={!currently_quoted}>
                <div class="relative inline-flex group">
                    <div class="tooltip tooltip-right" data-tip="Think this question has an error? Click this to regenerate it!">
                    <button on:click={() => handleGeneration(true)} class="relative btn leading-none disabled:bg-base-200 hover:bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" class="swap-off fill-red-600"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z"/></svg>
                    </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="inline-flex gap-5 p-5 pb-0 my-auto place-content-center">
            <p class:hidden={currently_quoted} class="w-80">If you think this question has an error, highlight the part with the error.</p>
        </div>
    </div>

</div>