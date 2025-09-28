import { db } from "$lib/server/db";
import { verificationTokens, users } from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
    const { token } = params;

    if (!token) {
        return new Response("Missing token", { status: 400 });
    }

    const [record] = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, token));

    if (!record) return new Response("Invalid token", { status: 400 });
    if (record.used) return new Response("Token already used", { status: 400 });
    if (record.expiresAt < new Date())
        return new Response("Token expired", { status: 400 });

    await db
        .update(verificationTokens)
        .set({ used: true })
        .where(eq(verificationTokens.id, record.id));

    await db
        .update(users)
        .set({ verified: true })
        .where(eq(users.id, record.userId));

    return new Response("Account verified successfully. You can now login.", {
        status: 200,
    });
};
