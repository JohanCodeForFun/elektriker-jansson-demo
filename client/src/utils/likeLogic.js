// Pure like processing logic for testability.
// Given the previous like count, returns next count, whether to celebrate,
// and the cooldown duration (ms) for disabling the button.
export function processLike(
  prevLikes,
  { celebrateEvery = 10, cooldownMs = 3000 } = {}
) {
  const nextLikes = prevLikes + 1;
  const celebrates = nextLikes % celebrateEvery === 0;
  return { nextLikes, celebrates, cooldownMs };
}
