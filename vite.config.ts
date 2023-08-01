import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@Animation", replacement: "/src/Animation" },
      { find: "@API", replacement: "/src/API" },
      { find: "@Assets", replacement: "/src/Assets" },
      { find: "@Components", replacement: "/src/Components" },
      { find: "@Constants", replacement: "/src/Constants" },
      { find: "@Fonts", replacement: "/src/Fonts" },
      { find: "@Hooks", replacement: "/src/Hooks" },
      { find: "@Icons", replacement: "/src/Icons" },
      { find: "@Layouts", replacement: "/src/Layouts" },
      { find: "@Lib", replacement: "/src/Lib" },
      { find: "@Styles", replacement: "/src/Styles" },
      { find: "@Types", replacement: "/src/Types" },
      { find: "@Views", replacement: "/src/Views" },
    ],
  },
});
