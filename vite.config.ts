import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/TODO/", // This should match your GitHub repository name
  plugins: [react(), tailwindcss()],
});
