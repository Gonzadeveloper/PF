import react from "@vitejs/plugin-react";
import { defineConfig, ServerOptions } from "vite";
import { config as dotenvConfig } from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenvConfig();

interface MyServerOptions extends ServerOptions {
  rewrite: (path: string) => string;
}

export default defineConfig({
  plugins: [react()],
  server: {
    rewrite: (path: string) =>
      path === "/" || path === "/404" ? "/index.html" : "/404",
  } as MyServerOptions,
  define: {
    // Definir las variables de entorno
    "process.env.VITE_DOMAIN": JSON.stringify(process.env.VITE_AUTH0_DOMAIN),
    "process.env.VITE_CLIENT_ID": JSON.stringify(process.env.VITE_AUTH0_CLIENT_ID),
  },
});