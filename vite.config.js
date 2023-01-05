import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig( {
    plugins: [react()],
    root: "public",
    optimizeDeps: {
        esbuildOptions: {
            loader: { '.js': 'jsx' }
        }
    }
} );