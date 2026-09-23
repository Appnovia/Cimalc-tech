export const SESSION_COOKIE_NAMES = ["better-auth.session_token", "__Secure-better-auth.session_token"];

export function hasSessionCookie(cookieHeader: string | null) {
    return SESSION_COOKIE_NAMES.some((name) => cookieHeader?.includes(`${name}=`));
}
