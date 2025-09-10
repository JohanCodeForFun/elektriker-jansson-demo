import { expect, test } from "vitest";
import { sum2 } from "./sum2";

test("Adds 1 + 2 to equal 3", () => {
  expect(sum2(1, 2)).toBe(3);
});
