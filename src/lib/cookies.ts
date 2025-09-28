import { browser } from "$app/environment";

export function getCookie(name: string): string | null {
    if (!browser) return null;
    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
}

// Set a cookie
export function setCookie(
    name: string,
    value: string,
    options: {
        path?: string;
        maxAge?: number; // in seconds
        expires?: Date;
        secure?: boolean;
        sameSite?: "strict" | "lax" | "none";
    } = {}
) {
    if (!browser) return;
    let cookieStr = `${name}=${encodeURIComponent(value)}`;

    if (options.path) cookieStr += `; path=${options.path}`;
    if (options.maxAge) cookieStr += `; max-age=${options.maxAge}`;
    if (options.expires)
        cookieStr += `; expires=${options.expires.toUTCString()}`;
    if (options.secure) cookieStr += `; secure`;
    if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;

    document.cookie = cookieStr;
}

// Delete a cookie
export function deleteCookie(name: string, path = "/") {
    document.cookie = `${name}=; path=${path}; max-age=0`;
}
