<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {worksheetOpen, worksheet, progress, generation_status} from "$lib/public/stores";
    import {getTopicals} from "$lib/worksheetApi";
    import {TOPICS} from "$lib/static-files/MHTopicBinds";
    import {PAPERS} from "$lib/static-files/Papers";
    import {availableYears} from "$lib/static-files/PastPaperInfo";
    import * as FileSaver from "file-saver";

    let dispatch = createEventDispatcher();
    let latest_worksheet = $worksheet

    const handleWorksheetGeneration = () => {
        if (Object.keys(topics).length === 0 || Object.keys(years).length === 0) {
            alert("Please select a topic and year to generate a worksheet")
            return
        }
        latest_worksheet = getTopicals(subject, topics, years, papers)
        latest_worksheet.then((w) => {progress.set(0); generation_status.set("")})
        worksheet.set(latest_worksheet)
        worksheetOpen.set(true)
    }


    let subject = "Physics";
    let topics: any = {}
    let years: any= {}
    let papers: any= {}
    $: subject_topics = TOPICS["A Levels"][subject]

    const clearHandler = () => {
        topics = {}
        years = {}
    }

    async function downloadQuestion() {
        let d = await latest_worksheet.then((w) => w.questionBytes)
        console.log(d)
        const blob = new Blob([d], {type: "application/pdf"})
        window.open(window.URL.createObjectURL(blob))
    }

    async function downloadMarkScheme() {
        let d = await latest_worksheet.then((w) => w.markschemeBytes)
        console.log(d)
        const blob = new Blob([d], {type: "application/pdf"})
        window.open(window.URL.createObjectURL(blob))
    }

</script>

<div class="flex flex-col place-content-between h-full xl:min-w-[900px]">
    <div class="inline-flex gap-2 p-5 pt-0">
        <select id="subject" class="select select-bordered w-full min-w-xs" bind:value={subject} on:change={clearHandler}>
            <option selected>Physics</option>
            <option>Mathematics</option>
        </select>
        <div class="dropdown dropdown-hover dropdown-bottom dropdown-end w-full min-w-xs">
            <div tabindex="-1" role="button" class="btn bg-base-100 w-full no-animation">Years</div>
            <ul tabindex="-1" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-[50vh] overflow-scroll  flex-nowrap">
                {#each availableYears as year (year)}
                <li>
                    <div class="form-control">
                        <label class="flex label cursor-pointer gap-2 overflow-x-hidden">
                            <input type="checkbox" class="checkbox" bind:checked={years[year]}/>
                            <span class="label-text">{year}</span>
                        </label>
                    </div>
                </li>
                {/each}
            </ul>
        </div>
        <div class="dropdown dropdown-hover dropdown-bottom dropdown-end w-full min-w-xs">
            <div tabindex="-2" role="button" class="btn bg-base-100 w-full no-animation">Topics</div>
            <ul tabindex="-2" class="dropdown-content z-[] menu p-2 shadow bg-base-100 rounded-box w-full max-h-[50vh] overflow-scroll flex-nowrap">
                {#each subject_topics as topic (topic._id)}
                <li>
                    <div class="form-control">
                        <label class="flex label cursor-pointer gap-2 overflow-x-hidden">
                            <input type="checkbox" class="checkbox" bind:checked={topics[topic.name]}/>
                            <span class="label-text">{topic.name}</span>
                        </label>
                    </div>
                </li>
                {/each}
            </ul>
        </div>
        <div class="dropdown dropdown-hover dropdown-bottom dropdown-end w-full min-w-xs">
            <div tabindex="-2" role="button" class="btn bg-base-100 w-full no-animation">Component</div>
            <ul tabindex="-2" class="dropdown-content z-[] menu p-2 shadow bg-base-100 rounded-box w-full max-h-[50vh] overflow-scroll flex-nowrap">
                {#each PAPERS["A Levels"][subject] as p (p)}
                    <li>
                        <div class="form-control">
                            <label class="flex label cursor-pointer gap-2 overflow-x-hidden">
                                <input type="checkbox" class="checkbox" bind:checked={papers[p]}/>
                                <span class="label-text">Component {p}</span>
                            </label>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
    {#if $worksheetOpen}
        {#await latest_worksheet}
            <div class="flex flex-col gap-4 w-full p-5 overflow-y-scroll h-full">
                <div class="skeleton h-40"></div>
                <div class="skeleton h-20"></div>
                <div class="skeleton h-20"></div>
                <div class="skeleton h-20"></div>
            </div>
        {:then url}
            <div class="flex flex-col gap-4 w-full p-5 overflow-y-scroll h-full">
                <h1 class="text-primary text-xl">Your files are ready! Click the buttons below to download the pdf. Downloads may take up to a few seconds.</h1>
                <button class="btn" on:click={downloadQuestion}>Question Paper</button>
                <button class="btn" on:click={downloadMarkScheme}>Mark Scheme</button>
            </div>
        {/await}
    {:else}
        <div class="flex flex-col gap-4 w-full p-5 overflow-y-scroll h-full">
            <h1 class='text-primary text-xl'>
                To generate a worksheet, choose a subject, year and topic and click the generate button below.<br/>Worksheets are meant to be used for practice and not examination purposes.
            </h1>
        </div>
    {/if}
    <div class="inline-flex items-center">
        <div class="inline-flex p-5 pb-0">
            <button on:click={handleWorksheetGeneration} disabled={$generation_status !== ""} class="ring ring-primary relative btn leading-none disabled:bg-base-200 hover:bg-white w-44">Generate Worksheet</button>
        </div>
        {#if $generation_status === "fetching"}
            <div class="inline-flex p-5 pb-0 w-full">
                <progress class="progress w-full h-10 relative leading-none" value="{$progress*100}" max="100"></progress>
            </div>
        {:else if $generation_status === "saving"}
            <div class="inline-flex p-5 pb-0 w-full">
                <progress class="progress w-full h-10 relative leading-none"></progress>
            </div>
        {/if}
    </div>
</div>