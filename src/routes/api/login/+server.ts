import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { env } from "$env/dynamic/private";
import { eq } from "drizzle-orm";

const secret = env.JWT_SECRET;

export const POST: RequestHandler = async ({ request }) => {
    const { username, password } = await request.json();
    if (!username || !password)
        return json(
            { error: "missing username and/or password" },
            { status: 400 }
        );

    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.username, username));
    if (!user) return json({ error: "user not found" }, { status: 404 });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return json({ error: "Incorrect password" }, { status: 401 });

    if (!user.verified)
        return json({ error: "Email not verified" }, { status: 403 });

    const token = jsonwebtoken.sign({ userId: user.id }, secret, {
        expiresIn: "30d",
    });

    return json({ token });
};
