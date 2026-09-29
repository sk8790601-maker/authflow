import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,          // listen on 0.0.0.0 (needed for remote/preview access)
    allowedHosts: true,  // allow proxied preview hostnames
  },
});
