import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import paths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist'
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  base: './',
  plugins: [
    svelte({ configFile: '../svelte.config.js' }),
    paths()
  ],
});
