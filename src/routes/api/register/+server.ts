import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema.js";
import bcrypt from "bcrypt";

export const POST: RequestHandler = async ({ request }) => {
    const { email, username, password } = await request.json();

    if (!email || !username || !password)
        return json({ error: "Missing required fields" }, { status: 400 });

    const passwordHash = await bcrypt.hash(password, 10);
    const avatar =
        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?w=360";

    const [user] = await db
        .insert(users)
        .values({ email, username, password: passwordHash, avatar })
        .returning({
            id: users.id,
            username: users.username,
            email: users.email,
            balance: users.balance,
            avatar: users.avatar,
            verified: users.verified,
            createdAt: users.createdAt,
        });

    return json({ user });
};
