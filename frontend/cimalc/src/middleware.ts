import { NextResponse, type NextRequest } from "next/server";
import { hasSessionCookie } from "@/lib/auth/session";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const protectedArea = pathname.startsWith("/account") || pathname.startsWith("/admin");
    if (!protectedArea || process.env.AUTH_ENFORCE_PROTECTION !== "true") return NextResponse.next();
    if (hasSessionCookie(request.headers.get("cookie"))) return NextResponse.next();
    const signIn = new URL("/auth/sign-in", request.url);
    signIn.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signIn);
}

export const config = { matcher: ["/account/:path*", "/admin/:path*"] };
