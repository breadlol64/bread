<script lang="ts">
    import { getCurrentUser } from "$lib/api";
    import { onMount } from "svelte";
    import { P, Avatar } from "flowbite-svelte";

    let user: { username: string; avatar: string } | null = null;

    onMount(async () => {
        user = await getCurrentUser();
    });
</script>

{#if user}
    <Avatar src={user.avatar} />
    <P>{user.username}</P>
{/if}
