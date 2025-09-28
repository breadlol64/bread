<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import { page } from "$app/state";

    import {
        A,
        Avatar,
        DarkMode,
        Footer,
        FooterCopyright,
        GradientButton,
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        P,
    } from "flowbite-svelte";
    import { getCookie } from "$lib/cookies";
    import { onMount } from "svelte";
    import { getCurrentUser } from "$lib/api";

    let { children } = $props();

    let activeUrl = $derived(page.url.pathname);

    let username = $state("");
    let avatar = $state("");
    let balance = $state(0);

    onMount(async () => {
        const user = await getCurrentUser();

        if (user) {
            username = user.username;
            avatar = user.avatar;
            balance = user.balance;
        }
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Navbar>
    <NavBrand href="/">
        <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >bread</span
        >
        <DarkMode />
    </NavBrand>
    <div class="flex md:order-2">
        {#if getCookie("token")}
            <A href="/profile" class="gap-1.5 hover:no-underline">
                <P>{balance}₿</P>
                <P>{username}</P>
                <Avatar src={avatar} size="xs" />
            </A>
        {:else}
            <GradientButton color="pinkToOrange" href="/login"
                >login</GradientButton
            >
        {/if}
    </div>
    <NavHamburger />
    <NavUl {activeUrl}>
        <NavLi href="/">Home</NavLi>
        <NavLi href="/bober">BOBER KOMBAET</NavLi>
        <NavLi href="/y">Y</NavLi>
        <NavLi href="/bobrtube">BobrTube</NavLi>
        <NavLi href="/tiptop">tiptop</NavLi>
    </NavUl>
</Navbar>

{@render children?.()}

<!-- <Footer>
    <FooterCopyright by="breadlol64" year={2025} class=""/>
</Footer> -->
