// @ts-check
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Elektriker Jansson/);
});

test("börja din planering", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Click the get started link.
  await page.getByRole("button", { name: "BÖRJA DIN PLANERING" }).click();

  // Expects page to open a modal and have a heading with the name of Börja här!.
  await expect(page.getByRole("heading", { name: "Börja här!" })).toBeVisible();
});
