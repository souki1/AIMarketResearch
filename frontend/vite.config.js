import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        // Reduces intermittent EBUSY on Windows when the editor/antivirus briefly locks a file mid-save
        watch: {
            awaitWriteFinish: {
                stabilityThreshold: 200,
                pollInterval: 50,
            },
        },
        proxy: {
            "/api": { target: "http://localhost:8000", changeOrigin: true },
            "/health": { target: "http://localhost:8000", changeOrigin: true },
        },
    },
});
