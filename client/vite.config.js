import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "src/test/setup.js",
    // Correct glob: any nested folder under src ending with .test.* or .spec.*
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    exclude: [
      "node_modules",
      "dist",
      "tests", // Playwright E2E
      "tests-examples", // example E2E
      "playwright-report",
      "**/.{idea,git,cache,output,temp}/**",
    ],
    globals: true,
  },
});
