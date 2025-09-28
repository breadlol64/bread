import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ request, locals }) => {
    if (locals.userId == null)
        return json({ error: "unauthorized" }, { status: 401 });

    const [user] = await db
        .select({
            id: users.id,
            username: users.username,
            email: users.email,
            balance: users.balance,
            avatar: users.avatar,
            verified: users.verified,
            createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.id, locals.userId));

    if (!user) {
        return json({ error: "User not found" }, { status: 404 });
    }

    return json({ user });
};
