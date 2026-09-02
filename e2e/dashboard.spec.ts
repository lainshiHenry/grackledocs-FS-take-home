import { expect, test } from "@playwright/test";

test.describe("Accessibility remediation dashboard", () => {
    test("shows the summary snapshot and violation table after loading", async ({ page }) => {
        await page.goto("/");

        await expect(page.getByRole("heading", { name: "Accessibility remediation snapshot" })).toBeVisible();
        await expect(page.getByRole("heading", { name: /^Critical/ })).toBeVisible();
    });

    test("filters the table by severity", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("heading", { name: "Accessibility remediation snapshot" })).toBeVisible();

        await expect(page.getByRole("heading", { name: /^Minor/ })).toBeVisible();

        await page
            .getByRole("group", { name: "Severity" })
            .getByText("Critical", { exact: true })
            .click();

        await expect(page.getByRole("heading", { name: /^Critical/ })).toBeVisible();
        await expect(page.getByRole("heading", { name: /^Minor/ })).toHaveCount(0);
    });

    test("opens an issue's details and updates its remediation status", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("heading", { name: "Accessibility remediation snapshot" })).toBeVisible();

        await page
            .getByRole("button", { name: /View details for image-alt at Homepage/ })
            .click();

        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        await expect(dialog.getByRole("heading", { name: "Images must have alternate text" })).toBeVisible();

        await dialog.getByLabel("Remediation status").selectOption("completed");
        await expect(dialog.getByLabel("Remediation status")).toHaveValue("completed");

        await dialog.getByRole("button", { name: "Close issue details" }).click();
        await expect(dialog).toBeHidden();
    });

    test("shows reassuring empty state when a search matches nothing", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("heading", { name: "Accessibility remediation snapshot" })).toBeVisible();

        await page.getByLabel("Search violations").fill("no-such-violation-xyz");

        await expect(page.getByText("No violations match your filters")).toBeVisible();
        await page.getByRole("button", { name: "Clear filters" }).click();
        await expect(page.getByText("No violations match your filters")).toBeHidden();
    });
});
