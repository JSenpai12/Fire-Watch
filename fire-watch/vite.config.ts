import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Fire Watch dev server config.
// The backend FastAPI service is expected at http://localhost:8000 by default
// (override with VITE_API_BASE_URL in a .env file). This proxy avoids CORS
// pain during local development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_API_PROXY_TARGET ?? "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
