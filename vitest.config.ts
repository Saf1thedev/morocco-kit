import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/index.ts", "tests/**", "dist/**", "apps/**"],
      thresholds: { statements: 95, branches: 80, functions: 85, lines: 95 },
    },
  },
});
