import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

test("profile loads with correct user data", async ({ page }) => {
    await login(page, "test@example.com", "TestPass123");

    await expect(page.locator('input[name="email"]')).toHaveValue("test@example.com");
    await expect(page.locator('input[name="first_name"]')).not.toBeEmpty();
    await expect(page.locator('input[name="last_name"]')).not.toBeEmpty();
});

test("profile update fails with invalid data", async ({ page }) => {
    await login(page, "test@example.com", "TestPass123");

    await page.fill('input[name="first_name"]', "");
    await page.click('button[type="submit"]');

    await expect(page.locator(".error-message")).toBeVisible();
});
