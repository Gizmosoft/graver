import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ Ensures correct asset paths in production
  build: {
    outDir: "dist", // ✅ Set output folder
    assetsDir: "assets", // ✅ Ensure assets are placed in a separate directory
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/[name]-[hash][extname]"; // ✅ Ensures correct path for CSS files
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  server: {
    strictPort: true,
    historyApiFallback: true, // ✅ Ensures React handles routing properly
  },
});
