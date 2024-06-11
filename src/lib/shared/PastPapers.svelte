<script lang="ts">
    type Dictionary = { [key: string]: string }

    const series_codes: Dictionary = {
        "February/March": "m",
        "May/June": "s",
        "October/November": "w"
    }

    let year: string = "2023";
    let subject: string = "Physics (9702)";
    let series: string = "February/March";
    $: series_code = series_codes[series]
    $: subject_code = subject.split(" ")[1].slice(1, -1)
</script>
<div class="flex flex-col justify-between">
<div class="flex inline-flex gap-2 p-5 pt-0">
    <select class="select select-bordered w-full max-w-xs" bind:value={subject}>
        <option selected>Physics (9702)</option>
        <option>Mathematics (9709)</option>
        <option>Information Technology (9626)</option>
    </select>
    <select class="select select-bordered w-full max-w-xs" bind:value={year}>
        <option selected>2023</option>
        <option>2022</option>
        <option>2021</option>
        <option>2020</option>
        <option>2019</option>
        <option>2018</option>
    </select>
    <select class="select select-bordered w-full max-w-xs" bind:value={series}>
        <option selected>February/March</option>
        <option>May/June</option>
        <option>October/November</option>
    </select>
</div>

<div class="join join-vertical w-full">
    <div class="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4"/>
        <div class="collapse-title text-xl font-medium">
            Paper 1 MCQ
        </div>
        <div class="collapse-content">
            <div class="grid gap-4 grid-cols-4">
                {#if series_code === "m"}
                    <a class="btn">V1 Question Paper</a>
                    <a class="btn">V1 Mark Scheme</a>
                    <a class="btn">V1 Examiner Report</a>
                    <a class="btn">V1 Grade Threshold</a>
                {:else}
                    <a class="btn">V1 Question Paper</a>
                    <a class="btn">V1 Mark Scheme</a>
                    <a class="btn">V1 Examiner Report</a>
                    <a class="btn">V1 Grade Threshold</a>
                    <a class="btn">V2 Question Paper</a>
                    <a class="btn">V2 Mark Scheme</a>
                    <a class="btn">V2 Examiner Report</a>
                    <a class="btn">V2 Grade Threshold</a>
                    <a class="btn">V3 Question Paper</a>
                    <a class="btn">V3 Mark Scheme</a>
                    <a class="btn">V3 Examiner Report</a>
                    <a class="btn">V3 Grade Threshold</a>
                {/if}
            </div>
        </div>
    </div>
    <div class="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div class="collapse-title text-xl font-medium">
            Paper 2 Theory
        </div>
        <div class="collapse-content">
            <div class="grid gap-4 grid-cols-4">
                {#if series_code === "m"}
                    <a class="btn">V1 Question Paper</a>
                    <a class="btn">V1 Mark Scheme</a>
                    <a class="btn">V1 Examiner Report</a>
                    <a class="btn">V1 Grade Threshold</a>
                {:else}
                    <a class="btn">V1 Question Paper</a>
                    <a class="btn">V1 Mark Scheme</a>
                    <a class="btn">V1 Examiner Report</a>
                    <a class="btn">V1 Grade Threshold</a>
                    <a class="btn">V2 Question Paper</a>
                    <a class="btn">V2 Mark Scheme</a>
                    <a class="btn">V2 Examiner Report</a>
                    <a class="btn">V2 Grade Threshold</a>
                    <a class="btn">V3 Question Paper</a>
                    <a class="btn">V3 Mark Scheme</a>
                    <a class="btn">V3 Examiner Report</a>
                    <a class="btn">V3 Grade Threshold</a>
                {/if}
            </div>
        </div>
    </div>
    <div class="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div class="collapse-title text-xl font-medium">
            Paper 3 Practical
        </div>
        <div class="collapse-content">
            <div class="grid gap-4 grid-cols-4">
                {#if series_code === "m"}
                    <a class="btn">V1 Question Paper</a>
                    <a class="btn">V1 Mark Scheme</a>
                    <a class="btn">V1 Examiner Report</a>
                    <a class="btn">V1 Grade Threshold</a>
                {:else}
                    <a class="btn">V1 Question Paper</a>
                    <a class="btn">V1 Mark Scheme</a>
                    <a class="btn">V1 Examiner Report</a>
                    <a class="btn">V1 Grade Threshold</a>
                    <a class="btn">V2 Question Paper</a>
                    <a class="btn">V2 Mark Scheme</a>
                    <a class="btn">V2 Examiner Report</a>
                    <a class="btn">V2 Grade Threshold</a>
                    <a class="btn">V3 Question Paper</a>
                    <a class="btn">V3 Mark Scheme</a>
                    <a class="btn">V3 Examiner Report</a>
                    <a class="btn">V3 Grade Threshold</a>
                {/if}
            </div>
        </div>
    </div>
    <div class="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div class="collapse-title text-xl font-medium">
            Paper 4 Advanced Theory
        </div>
        <div class="collapse-content">
            <div class="grid gap-4 grid-cols-4">
                {#if series_code === "m"}
                    <a class="btn">V1 Question Paper</a>
                    <a class="btn">V1 Mark Scheme</a>
                    <a class="btn">V1 Examiner Report</a>
                    <a class="btn">V1 Grade Threshold</a>
                {:else}
                    <a class="btn">V1 Question Paper</a>
                    <a class="btn">V1 Mark Scheme</a>
                    <a class="btn">V1 Examiner Report</a>
                    <a class="btn">V1 Grade Threshold</a>
                    <a class="btn">V2 Question Paper</a>
                    <a class="btn">V2 Mark Scheme</a>
                    <a class="btn">V2 Examiner Report</a>
                    <a class="btn">V2 Grade Threshold</a>
                    <a class="btn">V3 Question Paper</a>
                    <a class="btn">V3 Mark Scheme</a>
                    <a class="btn">V3 Examiner Report</a>
                    <a class="btn">V3 Grade Threshold</a>
                {/if}
            </div>
        </div>
    </div>
    <div class="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" />
        <div class="collapse-title text-xl font-medium">
            Paper 5 Planning, Analysis and Evaluation
        </div>
        <div class="collapse-content">
            <div class="grid gap-4 grid-cols-4">
                {#if series_code === "m"}
                    <a class="btn">V1 Question Paper</a>
                    <a class="btn">V1 Mark Scheme</a>
                    <a class="btn">V1 Examiner Report</a>
                    <a class="btn">V1 Grade Threshold</a>
                {:else}
                    <a class="btn">V1 Question Paper</a>
                    <a class="btn">V1 Mark Scheme</a>
                    <a class="btn">V1 Examiner Report</a>
                    <a class="btn">V1 Grade Threshold</a>
                    <a class="btn">V2 Question Paper</a>
                    <a class="btn">V2 Mark Scheme</a>
                    <a class="btn">V2 Examiner Report</a>
                    <a class="btn">V2 Grade Threshold</a>
                    <a class="btn">V3 Question Paper</a>
                    <a class="btn">V3 Mark Scheme</a>
                    <a class="btn">V3 Examiner Report</a>
                    <a class="btn">V3 Grade Threshold</a>
                {/if}
            </div>
        </div>
    </div>
</div>
</div>