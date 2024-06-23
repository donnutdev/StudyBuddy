<script lang="ts">
    export let front: string;
    export let back: string;
    export let hidden: boolean;
    export let editing: boolean;
    let flipped = false;
</script>

<div class="flex flex-col gap-1 h-full align-middle justify-center holder" class:hidden={hidden}>
    <button
            class="card mx-auto"
            class:flipped={flipped}
            on:click={() => flipped = !flipped}
            disabled={editing}
    >
        {#if editing === true}
            <div class="front bg-base-300 border-base-100 border-2 justify-center">
                <textarea class="w-full m-10 textarea" bind:value={back} hidden={!editing}></textarea>
            </div>
            <div class="back bg-base-300 border-base-100 border-2 justify-center">
                <input class="input m-10 text-wrap" type="text" bind:value={front} hidden={!editing}>
            </div>
        {:else}
            <div class="front bg-base-300 border-base-100 border-2 justify-center">
                <div class="text-xl m-10" hidden={editing}>{back}</div>
            </div>
            <div class="back bg-base-300 border-base-100 border-2 justify-center">
                <div class="text-4xl m-10" hidden={editing}>{front}</div>
            </div>
        {/if}
    </button>
</div>

<style>
    .holder {
        perspective: 100vh
    }

    .card {
        position: relative;
        aspect-ratio: 3.5/2.5;
        font-size: min(1vh, 0.25rem);
        height: 120em;
        background: var(--bg-1);
        border-radius: 2em;
        transform: rotateY(-180deg);
        transition: transform 0.4s;
        transform-style: preserve-3d;
        padding: 0;
        user-select: none;
        cursor: pointer;
    }

    .card.flipped {
        transform: rotateY(0);
    }

    .front, .back {
        display: flex;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        backface-visibility: hidden;
        border-radius: 2em;
        border: 1px solid var(--fg-2);
        box-sizing: border-box;
        padding: 2em;
    }

    .back {
        transform: rotateY(180deg);
    }
</style>
