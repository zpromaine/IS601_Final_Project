import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

test("user can log out and token is cleared", async ({ page }) => {
    await login(page, "test@example.com", "TestPass123");

    await page.click("#logout-button");
    await page.waitForURL("/login");

    const token = await page.evaluate(() => localStorage.getItem("access_token"));
    expect(token).toBeNull();
});
