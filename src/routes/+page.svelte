<script>
    export let data;
    import {Auth} from "@supabase/auth-ui-svelte";
    import {ThemeSupa} from "@supabase/auth-ui-shared";
    import {invalidateAll, goto} from "$app/navigation";

    let {supabase, session} = data
    $: ({ supabase, session } = data)

</script>

<div class="hero min-h-screen bg-base-300">
    <div class="hero-content">
        <div class="max-w-xl text-center">
            <h1 class="text-primary text-4xl">Ace your exams with</h1>

            <h1 class="text-7xl font-bold bg-gradient-to-r from-blue-500 via-teal-300 to-indigo-600 inline-block text-transparent bg-clip-text pb-3">StudyBuddy</h1>
            {#if session == null}
                <p class="py-6">Use the power of artificial intelligence to enhance your study pattern, manage your timeline for your academic year and ace your exams.</p>
                <div class="relative inline-flex group">
                    <div class="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-blue-500 via-teal-300 to-indigo-600 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt p-3"></div>
                    <button on:click={() => goto("/account")} class="ring ring-primary relative btn btn-white leading-none hover:bg-white">Create Account</button>
                </div>
            {:else}
                <p class="py-6 text-xl">Use the power of artificial intelligence to enhance your study pattern, manage your timeline for your academic year and ace your exams.</p>
                <div class="relative inline-flex group">
                    <div class="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-blue-500 via-teal-300 to-indigo-600 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt p-3"></div>
                    <button on:click={() => goto("/dashboard")} class="ring ring-primary relative btn btn-white leading-none hover:bg-white">Start Studying</button>
                </div>
            {/if}
        </div>
    </div>
</div>
