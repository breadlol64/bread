<script lang="ts">
    import { Label, Input, Card, Button, A, P } from "flowbite-svelte";
    import axios from "axios";

    let username = $state("");
    let email = $state("");
    let password = $state("");
    let status = $state("");

    const register = async () => {
        const regResponse = await axios.post("/api/register", {
            username,
            email,
            password,
        });
        if (regResponse.status === 200) {
            console.log(regResponse.data.user);
            const verificationResponse = await axios.post(
                "/api/send-verification",
                {
                    userId: regResponse.data.user.id,
                },
            );

            if (verificationResponse.status === 200) {
                status =
                    "Success. Check your email inbox to verify your account.";
            } else {
                status = verificationResponse.data.error;
            }
        } else {
            status = regResponse.data.error;
        }
    };
</script>

<Card class="p-3 gap-3">
    <Input
        id="email-input"
        placeholder="Email"
        type="email"
        bind:value={email}
    />
    <Input id="username-input" placeholder="Username" bind:value={username} />
    <Input
        id="password-input"
        placeholder="Password"
        type="password"
        bind:value={password}
    />
    <Button onclick={register}>Register</Button>
    <P>Already have an account? <A href="/login">Login.</A></P>
    <P>{status}</P>
</Card>
