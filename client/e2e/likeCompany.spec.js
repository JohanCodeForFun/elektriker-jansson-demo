import { test, expect } from "@playwright/test";

// Assumes dev server running at :5173 (Vite default). If not, run `npm run dev` before this test.

test("LikeCompany increments like count and disables button briefly", async ({
  page,
}) => {
  await page.goto("/");

  const likeButton = page.getByTestId("like-button");
  const likeCount = page.getByTestId("like-count");

  // Initial count should contain 610
  await expect(likeCount).toContainText("610");

  // Click like
  await likeButton.click();

  // Button should be disabled immediately
  await expect(likeButton).toBeDisabled();

  // Count should now show 611
  await expect(likeCount).toContainText("611");
});
