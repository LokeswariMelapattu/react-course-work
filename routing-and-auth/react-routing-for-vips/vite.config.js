import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: "setupTests.js",
    environment: "jsdom",
    reporters: ["default", "json", "junit"],
    outputFile: {
      json: "../reports/unit_tests.json",
      junit: "../reports/unit_tests.xml",
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
