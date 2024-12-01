import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "./src/components"),
            "@ui": path.resolve(__dirname, "./src/components/ui"),
            "@assets": path.resolve(__dirname, "./src/assets"),
        },
    },
});
