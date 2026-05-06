import { test, expect } from "@playwright/test";

test("successful login stores token and redirects to profile", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "e2etest");
    await page.fill('input[name="password"]', "TestPass123!");
    await page.click('button[type="submit"]');

    await page.waitForURL("/profile");

    const token = await page.evaluate(() => localStorage.getItem("access_token"));
    expect(token).not.toBeNull();
});

test("login fails with wrong password", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "e2etest");
    await page.fill('input[name="password"]', "WrongPassword123!");
    await page.click('button[type="submit"]');

    await expect(page.locator(".error-message")).toBeVisible();
});
