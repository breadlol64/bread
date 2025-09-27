<script lang="ts">
    import { Alert } from "flowbite-svelte";
    import axios from "axios";
    import { onMount } from "svelte";

    let message = $state("");

    onMount(async () => {
        try {
            const response = await axios.get("/api/hello");
            message = response.data.msg;
        } catch (error) {
            console.error(error);
        }
    });
</script>

<div class="p-8">
    <Alert>
        <span class="font-medium">Info alert!</span>
        {message}
    </Alert>
</div>
