import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // URL de tu backend
        changeOrigin: true, // Cambia el origen de la solicitud a la URL del backend
        secure: false, // Si estás utilizando HTTP en lugar de HTTPS
        rewrite: (path) => path.replace(/^\/api/, ""), // Reescribe el path si es necesario
      },
    },
  },
});
