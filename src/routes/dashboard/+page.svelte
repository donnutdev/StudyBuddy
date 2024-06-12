<script lang="ts">
    import Topicals from "$lib/shared/Topicals.svelte";

    export let data;
    import PastPapers from "$lib/shared/PastPapers.svelte";
    import QuestionCreator from "$lib/shared/QuestionCreator.svelte";
    import {goto} from "$app/navigation";

    let active_tab: string = "topicals";

    let {supabase, session} = data;
    $: ({ supabase, session } = data)

    $: if (session == null) {
        goto('/account')
    }

</script>

<div class="hero min-h-screen bg-base-300 px-10 py-0">
    <div class="hero-content w-full lg:min-w-[1000px]">
        <div class="flex flex-row items-stretch gap-4 justify-between h-[70vh]">
            <div class="container basis-1/5 grow drop-shadow h-full">
                <ul class="menu bg-base-200 min-w-60 rounded-box h-full">
                    <li>
                        <h2 class="menu-title">Planning</h2>
                        <ul>
                            <li><a class:active={active_tab === "studyplans"} on:click={() => active_tab = "studyplans"}>Study Plan</a></li>
                            <li><a class:active={active_tab === "courses"} on:click={() => active_tab = "courses"}>Courses</a></li>
                            <li><a class:active={active_tab === "advice"} on:click={() => active_tab = "advice"}>Plan Advice<div class="badge badge-secondary">beta</div></a></li>
                        </ul>
                        <h2 class="menu-title">Practice</h2>
                        <ul>
                            <li ><a class:active={active_tab === "pastpapers"} on:click={() => active_tab = "pastpapers"}>Past Papers</a></li>
                            <li><a class:active={active_tab === "topicals"} on:click={() => active_tab = "topicals"}>Topical Questions</a></li>
                            <li>
                                <a class:active={active_tab === "creator"} on:click={() => active_tab = "creator"}>Question Creator<div class="badge badge-secondary">beta</div></a>
                            </li>
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
                <div class="container basis-4/5 lg:w-[900px] grow bg-none">
                        {#if active_tab === "pastpapers"}
                            <PastPapers on:alert/>
                        {:else if active_tab === "creator"}
                            <QuestionCreator  {supabase} {session} on:alert/>
                        {:else if active_tab === "topicals"}
                            <Topicals on:alert/>
                        {/if}
                </div>
            {/key}
        </div>
    </div>
</div>