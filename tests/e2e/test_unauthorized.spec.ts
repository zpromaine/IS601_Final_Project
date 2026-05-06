import { test, expect } from "@playwright/test";

test("unauthenticated user is redirected to login", async ({ page }) => {
    await page.goto("/profile");
    await page.waitForURL("/login");
});
