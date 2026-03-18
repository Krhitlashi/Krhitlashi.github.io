import { defineConfig } from "vite";
import { resolve, relative, dirname, join } from "path";
import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to find all HTML files
function getHtmlEntries(dir: string, allFiles: Record<string, string> = {}) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = resolve(dir, file);
    if (statSync(filePath).isDirectory()) {
      if (file !== "node_modules" && file !== "dist" && file !== ".git") {
        getHtmlEntries(filePath, allFiles);
      }
    } else if (file.endsWith(".html")) {
      const relativePath = relative(__dirname, filePath);
      const name = relativePath.replace(/\.html$/, "").replace(/[\\\/]/g, "_");
      allFiles[name] = filePath;
    }
  });

  return allFiles;
}

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      input: getHtmlEntries(__dirname),
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
