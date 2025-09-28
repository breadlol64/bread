import type { Handle } from "@sveltejs/kit";
import { paraglideMiddleware } from "$lib/paraglide/server";
import jsonwebtoken from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { env } from "$env/dynamic/private";

const secret = env.JWT_SECRET;

function normalizePath(path: string) {
    // Remove trailing slashes
    path = path.replace(/\/+$/, "");
    // Replace multiple slashes with a single slash
    path = path.replace(/\/{2,}/g, "/");
    return path;
}

const handleParaglide: Handle = ({ event, resolve }) =>
    paraglideMiddleware(event.request, ({ request, locale }) => {
        event.request = request;
        const path = normalizePath(event.url.pathname);

        if (["/api/user/me"].includes(path)) {
            const token = event.request.headers.get("Authorization");
            if (token) {
                const decoded = jsonwebtoken.verify(token, secret);

                if (
                    typeof decoded === "object" &&
                    decoded !== null &&
                    "userId" in decoded
                ) {
                    event.locals.userId = (decoded as JwtPayload)
                        .userId as number;
                } else {
                    event.locals.userId = null;
                }
            } else {
                event.locals.userId = null;
            }
        }

        return resolve(event, {
            transformPageChunk: ({ html }) =>
                html.replace("%paraglide.lang%", locale),
        });
    });

export const handle: Handle = handleParaglide;
