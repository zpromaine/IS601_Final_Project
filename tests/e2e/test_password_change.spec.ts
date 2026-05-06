import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

test("user can change password and log in with new password", async ({ page }) => {
    const email = "test@example.com";
    const oldPass = "TestPass123";
    const newPass = "NewPass456";

    await login(page, email, oldPass);

    await page.goto("/profile/password");

    await page.fill('input[name="current_password"]', oldPass);
    await page.fill('input[name="new_password"]', newPass);
    await page.fill('input[name="confirm_password"]', newPass);
    await page.click('button[type="submit"]');

    await page.waitForURL("/login");

    // Old password should fail
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', oldPass);
    await page.click('button[type="submit"]');
    await expect(page.locator(".error-message")).toBeVisible();

    // New password should succeed
    await page.fill('input[name="password"]', newPass);
    await page.click('button[type="submit"]');
    await page.waitForURL("/profile");
});

test("password change fails with incorrect current password", async ({ page }) => {
    await login(page, "test@example.com", "TestPass123");

    await page.goto("/profile/password");

    await page.fill('input[name="current_password"]', "WrongPass123");
    await page.fill('input[name="new_password"]', "AnotherPass123");
    await page.fill('input[name="confirm_password"]', "AnotherPass123");
    await page.click('button[type="submit"]');

    await expect(page.locator(".error-message")).toBeVisible();
});
