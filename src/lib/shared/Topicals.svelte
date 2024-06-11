<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {worksheetOpen, worksheet} from "$lib/public/stores";
    import {getTopicals} from "$lib/worksheetApi";
    import {TOPICS} from "$lib/static-files/MHTopicBinds";
    import {availableYears} from "$lib/static-files/PastPaperInfo";

    let dispatch = createEventDispatcher();
    let latest_worksheet = $worksheet

    const handleWorksheetGeneration = () => {
        if (Object.keys(topics).length === 0 || Object.keys(years).length === 0) {
            dispatch("alert", {type: "error", message: "Please select a topic and year."})
            return
        }
        latest_worksheet = getTopicals(subject, topics, years)
        worksheet.set(latest_worksheet)
        worksheetOpen.set(true)
    }

    let subject = "Physics";
    let topics: any = {}
    let years: any= {}
    $: subject_topics = TOPICS["A Levels"][subject]
    $: {console.log(topics);console.log(years)}

    const clearHandler = () => {
        topics = {}
        years = {}
    }

</script>

<div class="flex flex-col place-content-between h-full">
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
                        <label class="flex label cursor-pointer gap-2">
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
                        <label class="flex label cursor-pointer gap-2">
                            <input type="checkbox" class="checkbox" bind:checked={topics[topic.name]}/>
                            <span class="label-text">{topic.name}</span>
                        </label>
                    </div>
                </li>
                {/each}
            </ul>
        </div>
    </div>
    <div class="inline-flex gap-2 p-5 h-full">
        {#if $worksheetOpen}
            {#await latest_worksheet}
                waiting..
            {:then data}
                    {#each data.data[0].images as image}
                        <img src={image} alt="Question" class="h-full">
                    {/each}
            {/await}
        {:else}
            <h1 class='text-primary text-xl'>
                To generate a worksheet, choose a subject, year and topic and click the generate button below.
            </h1>
        {/if}
    </div>
    <div class="inline-flex gap-2 p-5 pb-0">
        <button on:click={handleWorksheetGeneration} class="ring ring-primary relative btn leading-none disabled:bg-base-200 hover:bg-white w-44">Generate Worksheet</button>
    </div>
</div>