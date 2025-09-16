import { describe, it, expect } from "vitest";
import { processLike } from "./likeLogic";

describe("processLike", () => {
  it("increments like count", () => {
    const r = processLike(610);
    expect(r.nextLikes).toBe(611);
    expect(r.celebrates).toBe(false);
    expect(r.cooldownMs).toBe(3000);
  });

  it("celebrates on multiples of 10 by default", () => {
    const r = processLike(619); // becomes 620
    expect(r.nextLikes).toBe(620);
    expect(r.celebrates).toBe(true);
  });

  it("supports custom celebrateEvery and cooldown", () => {
    const r = processLike(4, { celebrateEvery: 5, cooldownMs: 1500 });
    expect(r.nextLikes).toBe(5);
    expect(r.celebrates).toBe(true);
    expect(r.cooldownMs).toBe(1500);
  });
});
