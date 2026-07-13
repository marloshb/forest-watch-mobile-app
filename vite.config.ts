import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Repo name for GitHub Pages. In dev/preview inside Lovable, use '/'.
const REPO_NAME = "forest-watch-mobile-app";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  // On production build we deploy to https://<user>.github.io/<REPO_NAME>/
  // In dev the app is served from the root, so keep base='/'.
  base: command === "build" ? `/${REPO_NAME}/` : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
