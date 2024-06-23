<script lang="ts">
    import type {Session, SupabaseClient} from "@supabase/supabase-js";
    import {onMount} from "svelte";
    import Flashcard from "$lib/components/Flashcard.svelte";
    import {generation_status, progress} from "$lib/public/stores";

    export let supabase: SupabaseClient;
    export let session: Session;
    let compstate = "flashgroups"
    let current_group = {name: "None", flashcards: {cards: [{front: "None", back:"None"}]}, id:0}
    let card_index = 0
    let flashcard_groups = []
    let flashcards_loaded = false
    let editing = false;
    let group_editing = false;
    $: console.log(flashcard_groups, compstate, current_group)

    async function saveData() {
        console.log(current_group)
        const {error} = await supabase.from("flashcard_groups")
            .update({name: current_group.name, flashcards: current_group.flashcards})
            .eq("id", current_group.id)
        console.log(error)
    }

    function updateGroups() {
        flashcards_loaded = false
        supabase.from("flashcard_groups")
            .select()
            .eq("user_id", session.user.id)
            .then((data) => {
                console.log(data)
                flashcard_groups = data ? data.data : []
            })
        flashcards_loaded = true
    }

    function newCard() {
        current_group.flashcards.cards.push({front:"New Card Title", back:"New Card Description"})
        if (current_group.flashcards.cards.length > 1) {
            card_index++
        }
        editing = true
    }

    async function deleteCard() {
        current_group.flashcards.cards.splice(card_index, 1)
        card_index = 1
        await saveData()
    }

    async function newGroup() {
        const {error} = await supabase.from("flashcard_groups")
            .insert({
                flashcards: {cards:[]},
                user_id: session.user.id,
                name: "New Card Group"
            })
        console.log(error)
        updateGroups()
    }

    async function deleteGroup() {
        const {error} = await supabase.from("flashcard_groups")
            .delete()
            .eq("id", current_group.id)
        updateGroups()
        console.log(error)
        compstate = "flashgroups"
        editing = false
        group_editing = false
    }

    function openGroup(group) {
        current_group = group
        compstate = "flashcards"
        card_index = 0
        editing = false
        group_editing = false
    }

    async function toggleEditing() {
        if (editing === true) {
            editing = false;
            await saveData()
        }else {
            editing = true;
        }
    }

    async function toggleEditingGroup() {
        if (group_editing === true) {
            group_editing = false;
            await saveData()
        }else {
            group_editing = true;
        }
    }

    onMount(updateGroups)
</script>

<div class="flex flex-col place-content-between h-full xl:min-w-[900px]">
    {#if compstate === "flashcards"}
        <div class="inline-flex gap-2 p-5 pt-0 justify-center">
            <div class="inline-flex justify-start gap-2">
                <button class="btn" on:click={() => compstate="flashgroups"}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                </button>
            </div>
            <div class="inline-flex mx-auto gap justify-center gap-4">
                {#if group_editing === true}
                    <input class="input" type="text" bind:value={current_group.name}>
                {:else}
                    <h1 class="text-4xl font-bold">{current_group.name}</h1>
                {/if}
                <div class="inline-flex mx-auto gap justify-end gap-2">
                    <button class="btn btn-ghost" on:click={toggleEditingGroup}>{@html group_editing === true ?
                        "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" class=\"fill-neutral\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"/></svg>"
                        :
                        "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" class=\"fill-neutral\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z\"/></svg>"
                    }</button>
                    <button class="btn text-xl btn-ghost" on:click={deleteGroup}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" class="fill-neutral"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                    </button>
                </div>
            </div>
        </div>
        {#key compstate}
            <div class="flex flex-col gap-4 w-full p-5 overflow-y-scroll h-full place-content-center justify-center pt-0">
                {#each current_group.flashcards.cards as current_card,i (i)}
                    <Flashcard bind:back={current_card.back} bind:front={current_card.front} hidden={card_index !== i} editing={editing}/>
                {/each}
            </div>
        {/key}
        <div class="inline-flex items-center justify-center">
            <div class="inline-flex p-5 pb-0 gap-2">
                <div class="join">
                    <button class="join-item btn" on:click={() => {if (card_index > 0){card_index--}}}>«</button>
                    <div class="join-item btn">{card_index+1}</div>
                    <button class="join-item btn" on:click={() => {if (card_index+1 < current_group.flashcards.cards.length){card_index++}}}>»</button>
                </div>
                <button class="btn text-xl btn-primary" on:click={toggleEditing}>{@html editing === true ?
                    "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#e8eaed\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"/></svg>"
                    :
                    "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#e8eaed\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"/><path d=\"M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z\"/></svg>"
                }</button>
                <button class="btn text-xl btn-primary" on:click={newCard}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e8eaed"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </button>
                <button class="btn text-xl btn-error" on:click={deleteCard}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e8eaed"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>                </button>
                <!--<button class="btn text-xl" disabled>Export</button>-->
            </div>
        </div>
    {:else if compstate === "flashgroups"}
        <div class="flex flex-col gap-4 w-full px-5 overflow-y-scroll overflow-x-hidden h-full">
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 gap-10">
            {#if flashcard_groups.length > 0}
                {#each flashcard_groups as group}
                    <button class="btn bg-transparent lg:h-40 lg:w-56 md:h-32 md:w-42 stack hover:bg-transparent border-0 shadow-none" on:click={() => openGroup(group)}>
                        <div class="btn bg-base-300 lg:h-40 lg:w-56 md:h-32 md:w-42 place-content-center no-animation flex-col gap-3">
                            <p>{group.name}</p>
                            <p class="text-xs">{group.flashcards.cards.length} cards</p>
                        </div>
                        {#each group.flashcards.cards as card}
                            <div class="btn bg-base-300 lg:h-40 lg:w-56 md:h-32 md:w-42 no-animation hover:bg-base-300 hover:border-base-100">{card.front}</div>
                        {/each}
                    </button>
                {/each}
            {/if}
            <button class="btn bg-base-300 lg:h-40 lg:w-56 md:h-32 md:w-42 p-0 m-0 place-content-center" on:click={newGroup} disabled={!flashcards_loaded}>
                <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 0 24 24" width="64px" class="fill-neutral"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </button>
        </div>
    </div>
    {/if}

</div>