<script lang="ts">
    export let supabase;

    let mode = "login"

    let email: string;
    let password: string;

    function signIn() {
        if (mode === "login") {
            supabase.auth.signInWithPassword({email, password})
        } else {
            supabase.auth.signUp({email, password})
        }
    }

</script>


<div class="text-center my-5">
    {#if mode === "login"}
        <h1 class="text-5xl font-bold">Login now!</h1>
    {:else}
        <h1 class="text-5xl font-bold">Sign Up now!</h1>
    {/if}
</div>

<div class="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
    <form class="card-body">
        <div class="form-control">
            <label class="label" for="email">
                <span class="label-text">Email</span>
            </label>
            <input id="email" type="email" placeholder="example@gmail.com" bind:value={email} class="input input-bordered" required />
        </div>
        <div class="form-control">
            <label class="label" for="pass">
                <span class="label-text">Password</span>
            </label>
            <input id="pass" type="password" placeholder="password" bind:value={password} class="input input-bordered" required />
            <p class="label">
                {#if mode === "login"}
                    <button class="label-text-alt link link-hover" on:click={() => {mode="signup"}}>Don't have an account?</button>
                {:else}
                    <button class="label-text-alt link link-hover" on:click={() => {mode="login"}}>Already have an account?</button>
                {/if}
            </p>
        </div>
        <div class="form-control mt-6">
            {#if mode === "login"}
                <button class="btn btn-primary" on:click={signIn}>Login</button>
            {:else}
                <button class="btn btn-primary" on:click={signIn}>Create Account</button>
            {/if}
        </div>
    </form>
</div>