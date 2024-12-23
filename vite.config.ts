import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@context": path.resolve(__dirname, "./src/context"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@ui": path.resolve(__dirname, "./src/components/ui"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@utils": path.resolve(__dirname, "./src/utils"),
        },
    },
});
