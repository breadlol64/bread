<script lang="ts">
    import { goto } from "$app/navigation";
    import { setCookie } from "$lib/cookies";
    import axios from "axios";
    import { Label, Input, Card, Button, A, P } from "flowbite-svelte";

    let username = $state("");
    let password = $state("");
    let status = $state("");

    const login = async () => {
        const loginResponse = await axios.post("/api/login", {
            username,
            password,
        });

        if (loginResponse.status === 200) {
            status = "Success";
            setCookie("token", loginResponse.data.token, {
                maxAge: 60 * 60 * 24 * 30, // expires in 30 days
            });
            goto("/profile");
        } else {
            status = loginResponse.data.error;
        }
    };
</script>

<Card class="p-3 gap-3">
    <Input id="username-input" placeholder="Username" bind:value={username} />
    <Input
        id="password-input"
        placeholder="Password"
        type="password"
        bind:value={password}
    />
    <Button onclick={login}>Login</Button>
    <P>Don't have an account? <A href="/register">Register.</A></P>
</Card>
