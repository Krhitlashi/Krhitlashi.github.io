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

// Plugin to copy static JS and CSS files to dist
const copyStaticFilesPlugin = {
  name: "copy-static-files",
  closeBundle() {
    const distDir = join(__dirname, "dist");
    const excludedDirs = ["node_modules", "dist", ".git", ".github", ".idea"];
    
    // Recursively find all .js and .css files
    function findStaticFiles(dir: string, files: string[] = []): string[] {
      const entries = readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        
        // Skip excluded directories
        if (entry.isDirectory() && excludedDirs.includes(entry.name)) {
          continue;
        }
        
        if (entry.isDirectory()) {
          findStaticFiles(fullPath, files);
        } else if (entry.isFile() && (entry.name.endsWith(".js") || entry.name.endsWith(".css"))) {
          files.push(fullPath);
        }
      }
      
      return files;
    }
    
    const staticFiles = findStaticFiles(__dirname);
    let copiedCount = 0;
    
    staticFiles.forEach((srcPath) => {
      // Get relative path from project root
      const relativePath = relative(__dirname, srcPath);
      const destPath = join(distDir, relativePath);
      const destDirPath = dirname(destPath);
      
      if (!existsSync(destDirPath)) {
        mkdirSync(destDirPath, { recursive: true });
      }
      copyFileSync(srcPath, destPath);
      copiedCount++;
    });
    
    console.log("Copied ${copiedCount} static files to dist");
  }
};

export default defineConfig({
  plugins: [copyStaticFilesPlugin],
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
