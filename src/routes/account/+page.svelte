<script lang="ts">
    export let data;
    import Auth from "$lib/components/Auth.svelte";
    import {goto} from "\$app/navigation";

    $: ({ supabase, session } = data)

    $: if (session) {
        goto('/')
    }
</script>

<div class="hero min-h-screen bg-base-300">
    <div class="hero-content w-[800px] flex-col">
        <Auth {supabase}/>
    </div>
</div>