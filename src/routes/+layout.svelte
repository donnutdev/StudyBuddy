<script>
    export let data;
    import "../app.css";
    import {invalidateAll, goto} from "$app/navigation";

    let {supabase, session} = data
    $: ({ supabase, session } = data)

    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN") {
            invalidateAll()
        }

        if (event === "SIGNED_OUT") {
            await goto("/account")
            invalidateAll()
        }
    })
</script>

<div class="bg-base-200 justify-between fixed top-0 left-0 right-0">
    <div class="navbar max-w-3xl mx-auto justify-between">
        <div class="w-full text-center justify-center">
            <a href="/" class="btn btn-ghost text-2xl bg-gradient-to-r from-blue-500 via-teal-300 to-indigo-600 bg-clip-text text-transparent">StudyBuddy</a>
        </div>
        <div class="w-full text-center justify-center">
            <a href="/" class="btn btn-ghost">Home</a>
            <a href="/dashboard" class="btn btn-ghost">Dashboard</a>
            <a href="/resources" class="btn btn-ghost">Resources</a>
        </div>
        <div class="w-full text-center justify-center">
            {#if session == null}
                <button on:click={() => goto("/account")}>Login</button>
            {:else}
                <span class="text-primary">{session.user.email}</span>
                <button class="ml-2" on:click={async () => { await supabase.auth.signOut() }}>Logout</button>
            {/if}
        </div>
    </div>
</div>

<slot></slot>