import { defineConfig, ServerOptions } from "vite";
import react from "@vitejs/plugin-react";

interface MyServerOptions extends ServerOptions {
  rewrite: (path: string) => string;
}

export default defineConfig({
  plugins: [react()],
  server: {
    rewrite: (path: string) =>
      path === "/" || path === "/404" ? "/index.html" : "/404",
  } as MyServerOptions,
});
