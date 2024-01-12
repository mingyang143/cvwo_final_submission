import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/users": "http://localhost:8000",
      "/checkuser": "http://localhost:8000",
      "/discussions": "http://localhost:8000",
      "/comment": "http://localhost:8000",
      "/likes": "http://localhost:8000",
      "/discussion": "http://localhost:8000",
    },
  },
  plugins: [react()],
});
