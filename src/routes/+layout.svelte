<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import { page } from "$app/state";

    import {
        DarkMode,
        Footer,
        FooterCopyright,
        GradientButton,
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
    } from "flowbite-svelte";

    let { children } = $props();

    let activeUrl = $derived(page.url.pathname);
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
        <GradientButton color="pinkToOrange">login</GradientButton>
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
