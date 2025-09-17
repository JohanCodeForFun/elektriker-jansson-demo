import { describe, it, expect } from "vitest";
import { computeLikeState } from "./likeLogic";

describe("computeLikeState", () => {
  it("increments like count without celebration", () => {
    const res = computeLikeState(5, { celebrateEvery: 10 });
    expect(res.nextLikes).toBe(6);
    expect(res.celebrates).toBe(false);
    expect(res.cooldownMs).toBe(3000); // default
  });

  it("celebrates at threshold", () => {
    const res = computeLikeState(9, { celebrateEvery: 10 });
    expect(res.nextLikes).toBe(10);
    expect(res.celebrates).toBe(true);
  });

  it("supports custom celebrateEvery and cooldown", () => {
    const res = computeLikeState(1, { celebrateEvery: 2, cooldownMs: 1500 });
    expect(res.nextLikes).toBe(2);
    expect(res.celebrates).toBe(true);
    expect(res.cooldownMs).toBe(1500);
  });
});
