import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vitest configuration: ensure we only run unit tests (e.g. src/**/*.test.{js,jsx,ts,tsx})
  // and avoid executing Playwright E2E specs that live in tests/ or tests-examples/.
  test: {
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    exclude: [
      "node_modules",
      "dist",
      "tests", // Playwright specs
      "tests-examples", // Playwright example specs
      "**/playwright-report/**",
      "**/.{idea,git,cache,output,temp}/**",
    ],
  },
});
