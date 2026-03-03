import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // ← добавьте этот импорт

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/mixins" as *;` // ← автоматический импорт во все SCSS файлы
      }
    }
  }
});
