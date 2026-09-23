"use client";

const authBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

async function authRequest(path: string, body?: Record<string, unknown>) {
    const response = await fetch(`${authBaseUrl}/api/auth${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: body ? JSON.stringify(body) : undefined });
    if (!response.ok) { const payload = await response.json().catch(() => null); throw new Error(payload?.message ?? "Authentication request failed"); }
    return response.json();
}

export const authClient = {
    signIn: { email: (data: { email: string; password: string }) => authRequest("/sign-in/email", { ...data, callbackURL: "/account" }), social: async (data: { provider: "google"; callbackURL: string }) => { window.location.assign(`${authBaseUrl}/api/auth/sign-in/social?provider=${encodeURIComponent(data.provider)}&callbackURL=${encodeURIComponent(data.callbackURL)}`); } },
    signUp: { email: (data: { name: string; email: string; password: string }) => authRequest("/sign-up/email", { ...data, callbackURL: "/account" }) },
    forgetPassword: (data: { email: string; redirectTo: string }) => authRequest("/forget-password", data),
    resetPassword: (data: { token: string; newPassword: string }) => authRequest("/reset-password", data),
    signOut: () => authRequest("/sign-out"),
    getSession: async () => { const response = await fetch(`${authBaseUrl}/api/auth/get-session`, { credentials: "include" }); if (!response.ok) return null; return response.json(); },
};
