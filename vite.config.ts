import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1600, },
  server: {
    port: 3000, // default 5173
  },
  resolve: {
    alias: {
      fonts: "/src/assets/fonts",
      src: "/src",
    },
  },
});
