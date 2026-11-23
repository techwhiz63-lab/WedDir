import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "icons/*.svg"],
      manifest: {
        name: "Wedding Invitation",
        short_name: "Wedding",
        theme_color: "#FDF6EC",
        background_color: "#FDF6EC",
        display: "standalone",
        start_url: "/",
      },
      workbox: {
        // 1. ONLY precache core code & icons—exclude mp4, mp3, png, jpg, jpeg
        globPatterns: ["**/*.{js,css,html,ico,svg}"],

        // 2. Skip any single file larger than 500 KB during precache
        maximumFileSizeToCacheInBytes: 500 * 1024,

        // 3. Cache images on-demand ONLY after the user actually views them
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|webp)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "wedding-images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
