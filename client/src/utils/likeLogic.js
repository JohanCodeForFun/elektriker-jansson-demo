// Pure like computation logic for testability.
// Input: previous likes count and optional config.
// Output: { nextLikes, celebrates, cooldownMs }
export function computeLikeState(prevLikes, config = {}) {
  const { celebrateEvery = 10, cooldownMs = 3000 } = config;

  const nextLikes = prevLikes + 1;

  const celebrates = nextLikes % celebrateEvery === 0;

  return { nextLikes, celebrates, cooldownMs };
}
