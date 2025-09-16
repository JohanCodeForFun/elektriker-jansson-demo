// @ts-check
import { test, expect } from "@playwright/test";

// Assumes LikeCompany component is rendered on the home page.
// Verifies that clicking the Gilla button increments the like count by 1
// and that an immediate second click is blocked (button disabled) during timeout window.

test("like button increments and throttles rapid clicks", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  const likeCountEl = page.getByTestId("likes-count");
  const likeButton = page.getByTestId("like-button");

  // Extract initial count number from the paragraph text.
  const initialText = (await likeCountEl.textContent()) || "";
  // e.g., "Det är 610 Kunder ..." -> match first number
  const initialMatch = initialText.match(/\d+/);
  if (!initialMatch) throw new Error("Could not extract initial like count");
  const initial = parseInt(initialMatch[0], 10);

  await expect(likeButton).toBeEnabled();
  await likeButton.click();

  // After first click it should disable (throttle) and count +1
  await expect(likeButton).toBeDisabled();

  const afterClickText = (await likeCountEl.textContent()) || "";
  const afterMatch = afterClickText.match(/\d+/);
  if (!afterMatch) throw new Error("Could not extract like count after click");
  const after = parseInt(afterMatch[0], 10);
  expect(after).toBe(initial + 1);

  // Try immediate second click – should have no effect because disabled
  await likeButton.click({ trial: true }).catch(() => {}); // trial click won't fire if disabled

  const midText = (await likeCountEl.textContent()) || "";
  const midMatch = midText.match(/\d+/);
  if (!midMatch) throw new Error("Could not extract intermediate like count");
  const midVal = parseInt(midMatch[0], 10);
  expect(midVal).toBe(after);

  // Wait for the cooldown (button re-enabled ~3s). Add a little buffer.
  await page.waitForTimeout(3200);
  await expect(likeButton).toBeEnabled();

  // Click again -> count increments by 1 more
  await likeButton.click();
  const finalText = (await likeCountEl.textContent()) || "";
  const finalMatch = finalText.match(/\d+/);
  if (!finalMatch) throw new Error("Could not extract final like count");
  const finalVal = parseInt(finalMatch[0], 10);
  expect(finalVal).toBe(after + 1);
});
