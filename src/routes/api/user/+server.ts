import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema.js";
import { eq, or } from "drizzle-orm";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
    const idParam = url.searchParams.get("id");
    const usernameParam = url.searchParams.get("username");

    if (!idParam && !usernameParam) {
        return json({ error: "Missing id or username" }, { status: 400 });
    }

    let whereClause;
    if (idParam && usernameParam) {
        whereClause = or(
            eq(users.id, Number(idParam)),
            eq(users.username, usernameParam)
        );
    } else if (idParam) {
        whereClause = eq(users.id, Number(idParam));
    } else if (usernameParam) {
        whereClause = eq(users.username, usernameParam);
    } else {
        return json({ error: "Missing id or username" }, { status: 400 });
    }

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
        .where(whereClause);

    if (!user) {
        return json({ error: "User not found" }, { status: 404 });
    }

    return json({ user });
};
