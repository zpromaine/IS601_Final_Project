import { request } from "@playwright/test";

export async function apiLogin(email: string, password: string) {
    const context = await request.newContext();
    const response = await context.post("/auth/login", {
        data: { email, password }
    });
    return response.json();
}
