import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import Checker from "vite-plugin-checker";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    plugins: [
      Checker({ typescript: true }), // Remove the enforce property
      react(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Specify manual chunks here if needed
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Set your preferred limit in kilobytes
    },
    server: {
      host: true,
    },
  };
});
