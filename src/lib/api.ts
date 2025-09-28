import axios from "axios";
import { getCookie } from "$lib/cookies";

export async function getUserById(id: Number) {
    const user = await axios.get("/api/user?id=" + id);
    return user.data;
}

export async function getUserByUsername(username: String) {
    const user = await axios.get("/api/user?username=" + username);
    return user.data;
}

export async function getCurrentUser() {
    const token = getCookie("token");
    const user = await axios.get("/api/user/me", {
        headers: { Authorization: token },
    });
    return user.data.user;
}
