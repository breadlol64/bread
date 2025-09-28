import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import cryptoRandomString from "crypto-random-string";
import nodemailer from "nodemailer";
import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { verificationTokens, users } from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "breadlol64@gmail.com",
        pass: env.GMAIL_APP_PASSWORD,
    },
});

export const POST: RequestHandler = async ({ request }) => {
    const { userId } = await request.json();
    if (userId === undefined)
        return json({ error: "User id required" }, { status: 400 });

    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) return json({ error: "User not found" }, { status: 404 });

    const token = cryptoRandomString({ length: 64, type: "hex" });
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await db.insert(verificationTokens).values({ token, userId, expiresAt });

    // Get the base URL from the request
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const verificationUrl = `${baseUrl}/verify/${token}`;
    await transporter.sendMail({
        from: `"bread" <breadlol64@gnail.com>`,
        to: user.email,
        subject: "Verify your email",
        html: `<p>Hello, ${user.username}. <a href="${verificationUrl}">Click here to verify your email</a></p>`,
    });

    return json({ message: "success" });
};
