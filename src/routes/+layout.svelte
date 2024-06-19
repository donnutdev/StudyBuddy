<script>
    export let data;
    import "../app.css";
    import {injectSpeedInsights} from "@vercel/speed-insights";
    import { inject } from '@vercel/analytics'
    import {invalidateAll, goto} from "$app/navigation";

    injectSpeedInsights();
    inject();

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

<div class="fixed w-screen h-screen" id="background"></div>

<div class="
  bg-base-100 text-base-content top-0 flex h-16 w-full justify-center bg-opacity-50 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]
  shadow-sm
  ">
    <div class="navbar max-w-6xl mx-auto justify-between">
        <div class="w-full text-center justify-center">
            <a href="/" class="btn btn-ghost text-2xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">StudyHaven</a>
        </div>
        <div class="w-full text-center justify-center">
            <a href="/" class="btn btn-ghost">Home</a>
            <a href="/dashboard" class="btn btn-ghost">Dashboard</a>
            <a href="/resources" class="btn btn-ghost">Resources</a>
        </div>
        <div class="w-full text-center justify-center gap-2">
            {#if session == null}
                <button on:click={() => goto("/account")}>Login</button>
            {:else}
                <span class="text-primary">{session.user.email}</span>
                <button on:click={async () => { await supabase.auth.signOut() }}>Logout</button>
            {/if}
        </div>
    </div>
</div>

    <slot></slot>

<style>
    ::-webkit-scrollbar {
        display: none;
    }

    #background {
        background-image: url("/layered-waves-haikei.svg");
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>