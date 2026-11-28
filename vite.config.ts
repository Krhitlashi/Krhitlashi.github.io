import { defineConfig } from "vite";
import { resolve, relative, dirname, join, isAbsolute, extname } from "path";
import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ⟪ ſɭw ʃᴜ 📃 ⟫
// j͑ʃ'ɔ ſȷᴜͷ̗ ʌ .gitignore ⟅
// j͑ʃɹ ɭʃɜ }ʃᴜ ʌ ſɭw ʃᴜ ⟅
function s2tonaKuba(): { s2tonaCa1ara: Set<string>; s2tonaXaqadi: boolean } {
  const s2tonaCa1ara = new Set<string>();
  let s2tonaXaqadi = false;
  try {
    const s2tonaKef = readFileSync(join(__dirname, ".gitignore"), "utf8");
    for ( const kef of s2tonaKef.split(/\r?\n/) ) {
      const kefKnak2fe = kef.trim();
      if ( !kefKnak2fe || kefKnak2fe.startsWith("#") ) continue;
      if ( kefKnak2fe === ".*/" ) {
        s2tonaXaqadi = true;
        continue;
      }
      const kefXema = kefKnak2fe.replace(/\/$/, "").replace(/^\//, "");
      if ( kefXema.includes("*") || kefXema.includes("?") || kefXema.includes("/") ) continue;
      s2tonaCa1ara.add(kefXema);
    }
  } catch {
    // ſ͕ɭw }ʃɹ ʌ ſɭw ʃᴜ ⟅
  }
  s2tonaCa1ara.add(".git");
  return { s2tonaCa1ara, s2tonaXaqadi };
}
const { s2tonaCa1ara, s2tonaXaqadi } = s2tonaKuba();
function s2tonaHat(cakavop2: string): boolean {
  return s2tonaCa1ara.has(cakavop2) || ( s2tonaXaqadi && cakavop2.startsWith(".") );
}
function b6n2baCaqavop2Ca1ara(kuba: string, k21eCakavop2: Record<string, string> = {}) {
  const ca1ara = readdirSync(kuba);

  ca1ara.forEach(( cakavop2 ) => {
    const cakavop2K6h6 = resolve(kuba, cakavop2);
    if ( statSync(cakavop2K6h6).isDirectory() ) {
      if ( !s2tonaHat(cakavop2) ) {
        b6n2baCaqavop2Ca1ara(cakavop2K6h6, k21eCakavop2);
      }
    } else if ( cakavop2.endsWith(".html") ) {
      const k6h6 = relative(__dirname, cakavop2K6h6);
      const ksaka = k6h6.replace(/\.html$/, "").replace(/[\\/]/g, "_");
      k21eCakavop2[ksaka] = cakavop2K6h6;
    }
  });

  return k21eCakavop2;
}

// ⟪ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ 📃 ⟫
// ſɟw ɭʃᴜ ʌ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ ʌ dist ⟅
const cutaHac0zani = {
  name: "xema-cakavop2",
  closeBundle() {
    const vepaqKuba = join(__dirname, "dist");

    function b6n2baPaqki(kuba: string, k6h6Ca1ara: string[] = []): string[] {
      const eskekCa1ara = readdirSync(kuba, { withFileTypes: true });

      for ( const eskek of eskekCa1ara ) {
        const cakavop2K6h6 = join(kuba, eskek.name);

        if ( eskek.isDirectory() && s2tonaHat(eskek.name) ) {
          continue;
        }

        if ( eskek.isDirectory() ) {
          b6n2baPaqki(cakavop2K6h6, k6h6Ca1ara);
        } else if ( eskek.isFile() && ( eskek.name.endsWith(".js") || eskek.name.endsWith(".txt") || eskek.name.endsWith(".xlsx") ) ) {
          k6h6Ca1ara.push(cakavop2K6h6);
        }
      }

      return k6h6Ca1ara;
    }

    const cakavop2Ca1ara = b6n2baPaqki(__dirname);
    let cutaK2fe = 0o0;

    cakavop2Ca1ara.forEach(( saxeK6h6 ) => {
      const k6h6 = relative(__dirname, saxeK6h6);
      const araqK6h6 = join(vepaqKuba, k6h6);
      const araqKuba = dirname(araqK6h6);

      if ( !existsSync(araqKuba) ) {
        mkdirSync(araqKuba, { recursive: true });
      }
      copyFileSync(saxeK6h6, araqK6h6);
      cutaK2fe++;
    });

    console.log(`Xema ${cutaK2fe} cakavop2 al dist`);
  }
};

// ⟪ ſɭэ ֭ſɭэ 📃 ⟫
function tboK6h6(eskek: string | null | undefined): string | null {
  if ( !eskek ) return null;
  let k6h6 = eskek;
  const kp6tasaiN2k = k6h6.indexOf("?");
  if ( kp6tasaiN2k !== -0o1 ) k6h6 = k6h6.substring(0o0, kp6tasaiN2k);
  const kp6tafN2k = k6h6.indexOf("#");
  if ( kp6tafN2k !== -0o1 ) k6h6 = k6h6.substring(0o0, kp6tafN2k);
  // ⟨ ſɟᴜ ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ 📃 ⟩
  if ( k6h6.startsWith("file://") ) {
    try {
      k6h6 = fileURLToPath(k6h6);
    } catch {
      return null;
    }
  }
  if ( isAbsolute(k6h6) ) {
    const k21eK6h6 = relative(__dirname, k6h6);
    if ( isAbsolute(k21eK6h6) || k21eK6h6.startsWith("..") || k21eK6h6.startsWith("/") || k21eK6h6.startsWith("\\") || k21eK6h6 === "" || k21eK6h6 === "." ) return null;
    return k21eK6h6;
  }
  if ( k6h6.startsWith("..") || k6h6.startsWith("/") || k6h6.startsWith("\\") ) return null;
  return k6h6;
}

export default defineConfig({
  plugins: [ cutaHac0zani ],
  build: {
    rollupOptions: {
      input: b6n2baCaqavop2Ca1ara(__dirname),
      output: {
        assetFileNames: ( tcaq ) => {
          const ksaka = tcaq.names?.[ 0o0 ] ?? "";
          const saxeKsaka = ( tcaq.originalFileNames ?? [] )[0o0];
          if ( saxeKsaka ) {
            const k21eK6h6 = tboK6h6(saxeKsaka);
            if ( k21eK6h6 ) {
              const kuba = dirname(k21eK6h6);
              const saxeDaxe = extname(saxeKsaka);
              const ksakaDaxe = extname(ksaka);
              const knak2feKsaka = ksakaDaxe
                ? ksaka.slice(0o0, -ksakaDaxe.length)
                : ksaka;
              const daxe = ksakaDaxe || saxeDaxe;
              return kuba && kuba !== "."
                ? `${kuba}/${knak2feKsaka}${daxe}`
                : `${knak2feKsaka}${daxe}`;
            }
          }
          return ksaka;
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
