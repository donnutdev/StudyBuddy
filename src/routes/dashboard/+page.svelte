<script lang="ts">
    import Topicals from "$lib/shared/Topicals.svelte";

    export let data;
    import PastPapers from "$lib/shared/PastPapers.svelte";
    import QuestionCreator from "$lib/shared/QuestionCreator.svelte";
    import {goto} from "$app/navigation";
    import Flashcards from "$lib/shared/Flashcards.svelte";

    let active_tab: string = "topicals";

    let {supabase, session} = data;
    $: ({ supabase, session } = data)
    console.log(data)

    $: if (session == null) {
        goto('/account')
    }

</script>

<div class="container mx-auto bg-base-300 min-h-screen py-0 pt-16 pb-5 place-content-center align-middle">
    <div class="container z-0 w-full px-5 lg:min-w-[900px]">
        <div class="flex flex-row items-stretch gap-4 justify-between h-[80vh]">
            <div class="container z-0 basis-1/5 grow drop-shadow h-full">
                <ul class="menu bg-base-200 min-w-60 rounded-box h-full">
                    <li>
                        <h2 class="menu-title">Planning</h2>
                        <ul>
                            <li><a class:active={active_tab === "studyplans"} on:click={() => active_tab = "studyplans"}>Study Plan</a></li>
                            <li><a class:active={active_tab === "courses"} on:click={() => active_tab = "courses"}>Courses</a></li>
                            <li><a class:active={active_tab === "advice"} on:click={() => active_tab = "advice"}>Plan Advice<div class="badge badge-secondary">AI</div></a></li>
                        </ul>
                        <h2 class="menu-title">Practice</h2>
                        <ul>
                            <li ><a class:active={active_tab === "pastpapers"} on:click={() => active_tab = "pastpapers"}>Past Papers</a></li>
                            <li><a class:active={active_tab === "topicals"} on:click={() => active_tab = "topicals"}>Topical Questions</a></li>
                            <li>
                                <a class:active={active_tab === "creator"} on:click={() => active_tab = "creator"}>Question Creator<div class="badge badge-secondary">AI</div></a>
                            </li>
                            <li ><a class:active={active_tab === "flashcards"} on:click={() => active_tab = "flashcards"}>Flash Cards</a></li>

                        </ul>
                        <h2 class="menu-title">Profile</h2>
                        <ul>
                            <li><a class:active={active_tab === "abtme"} on:click={() => active_tab = "abtme"}>About Me</a></li>
                            <li><a class:active={active_tab === "achievements"} on:click={() => active_tab = "achievements"}>Achievements</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            {#key active_tab}
                <div class="container z-0 basis-4/5 bg-none">
                    {#if active_tab === "pastpapers"}
                        <PastPapers on:alert/>
                    {:else if active_tab === "creator"}
                        <QuestionCreator  {supabase} {session} on:alert/>
                    {:else if active_tab === "topicals"}
                        <Topicals on:alert/>
                    {:else if active_tab === "flashcards"}
                        <Flashcards  {supabase} {session} on:alert/>
                    {:else}
                        <div class="h-full w-full justify-center place-content-center p-5">
                            <p class="w-1/2 mx-auto text-3xl">
                                Uh oh! This page is still under development! If you are interested in finding out when this page is finally ready, you can check the
                                <a href="https://github.com/donnutdev/StudyBuddy" class="link text-primary">GitHub Repository!</a>
                            </p>
                        </div>
                    {/if}
                </div>
            {/key}
        </div>
    </div>
</div>