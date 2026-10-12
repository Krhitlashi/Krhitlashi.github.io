import { defineConfig } from "vite";
import { resolve, relative, dirname, join, isAbsolute, extname } from "path";
import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ⟪ ſ͕ɭw ʌ ꞁȷ̀ɔ ⸙ HTML ⸙ ſɭᴜͷ̗ ꞁȷ̀ᴜͷ̗ ʌ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɹ ſᶘɔ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ⟫
function b6n2baHtml(kuba: string, k21eCakavop2: Record<string, string> = {}) {
  const ca1ara = readdirSync(kuba);

  ca1ara.forEach(( cakavop2 ) => {
    const cakavop2K6h6 = resolve(kuba, cakavop2);
    if ( statSync(cakavop2K6h6).isDirectory() ) {
      if ( cakavop2 !== "node_modules" && cakavop2 !== "dist" && cakavop2 !== ".git" ) {
        b6n2baHtml(cakavop2K6h6, k21eCakavop2);
      }
    } else if ( cakavop2.endsWith(".html") ) {
      const k6h6 = relative(__dirname, cakavop2K6h6);
      const ksaka = k6h6.replace(/\.html$/, "").replace(/[\\/]/g, "_");
      k21eCakavop2[ksaka] = cakavop2K6h6;
    }
  });

  return k21eCakavop2;
}

// ⟪ ſ͕ɭw ʌ ꞁȷ̀ɔ ⸙ dist ⸙ ſɭᴜͷ̗ ꞁȷ̀ᴜͷ̗ ʌ ſɟw ɭʃᴜ ʌ ſɭɹ ſᶘɔ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ֭ſɭᴜ ſɟɔⅎƴ ꞁȷ̀ᴜ }ʃꞇ ⟅ ⟫
const cutaHac0zani = {
  name: "kopii-statikajn-dosierojn",
  closeBundle() {
    const distKuba = join(__dirname, "dist");
    const puKuba = [ "node_modules", "dist", ".git", ".github", ".idea" ];

    function b6n2baPaqki(kuba: string, k6h6Ca1ara: string[] = []): string[] {
      const eskekCa1ara = readdirSync(kuba, { withFileTypes: true });

      for ( const eskek of eskekCa1ara ) {
        const cakavop2K6h6 = join(kuba, eskek.name);

        if ( eskek.isDirectory() && puKuba.includes(eskek.name) ) {
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
      const araqK6h6 = join(distKuba, k6h6);
      const araqKuba = dirname(araqK6h6);

      if ( !existsSync(araqKuba) ) {
        mkdirSync(araqKuba, { recursive: true });
      }
      copyFileSync(saxeK6h6, araqK6h6);
      cutaK2fe++;
    });

    console.log(`Kopiitaj ${cutaK2fe} statikaj dosieroj al dist`);
  }
};

// ⟪ ɭʃɀɜ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ ʌ ſɭэ ֭ſɭэ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ⟫
function tboK6h6(eskek: string | null | undefined): string | null {
  if ( !eskek ) return null;
  let k6h6 = eskek;
  const qK2fe = k6h6.indexOf("?");
  if ( qK2fe !== -0o1 ) k6h6 = k6h6.substring(0o0, qK2fe);
  const hK2fe = k6h6.indexOf("#");
  if ( hK2fe !== -0o1 ) k6h6 = k6h6.substring(0o0, hK2fe);
  // ⟨ ſ͕ɭw ʌ ꞁȷ̀ɔ ⸙ file:// ⸙ ſɭᴜͷ̗ ꞁȷ̀ᴜͷ̗ ʌ ɭʃɀɜ ʌ ſɭэ ֭ſɭэ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ⟩
  if ( k6h6.startsWith("file://") ) {
    try {
      k6h6 = fileURLToPath(k6h6);
    } catch {
      return null;
    }
  }
  if ( isAbsolute(k6h6) ) {
    const rel = relative(__dirname, k6h6);
    if ( rel.startsWith("..") || rel.startsWith("/") || rel === "" || rel === "." ) return null;
    return rel;
  }
  if ( k6h6.startsWith("..") || k6h6.startsWith("/") ) return null;
  return k6h6;
}

export default defineConfig({
  plugins: [ cutaHac0zani ],
  build: {
    rollupOptions: {
      input: b6n2baHtml(__dirname),
      /* Konservu kaj la aktivan baznomon KAJ ĝian fonto-relativan dosierujon. Vite-aj `[name]` ĵetonoj donas la sanigitan baznomon ( ekz. `ı__ɔ` el `ı],ɔ` ), kaj `assetInfo.originalFileNames[0]` donas la fontan vojon por rekonstrui la fontan dosierujon. Sen tio, CSS-dosiero ĉe `ſɟᴜ ſɭɹ/.../֭ſɭᴜ ı],ɔ.css` finiĝus ĉe la dist-radiko kiel `֭ſɭᴜ ı__ɔ.css`, perdante sian fontan dosierujon.
      
      Peĉdosieroj ( JS-pakaĵoj ) konservas Vite-ajn normajn `[name]-[hash].js` nomojn por ke ekzistantaj peĉ-URL-oj restu adreseblaj.
      
      ( Noto ) Ĉi tio estas intence sub `rollupOptions` ( ne `rolldownOptions` ). Vite 8 uzas Rolldown sub la kapuĉo, dum la pakaĵilo ankoraŭ konsumas `rollupOptions.output` por aktiva nomado. */
      output: {
        assetFileNames: ( tcaq ) => {
          const ksaka = tcaq.names?.[ 0o0 ] ?? "";
          const saxeKsaka = ( tcaq.originalFileNames ?? [] )[0o0];
          if ( saxeKsaka ) {
            const rel = tboK6h6(saxeKsaka);
            if ( rel ) {
              const kuba = dirname(rel);
              const saxeDaxe = extname(saxeKsaka);
              /*
              * ⟨ j͑ʃ'ɔ ſ͕ɭэ ſɭɹ ʌ ſɭɔ˞ᴜ ſɭᴜ ʌ ⺓ ʌ ֭ſɭᴜ ı],ɔ ⟅ ⟩
              * ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ ſɭɔ˞ᴜ ſɭᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ⟩
              *
              * ⟨ ɭʃɹ ı],ɔ ʌ ſɭɔ˞ᴜ ſɭᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ⟩
              * ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔ˞ᴜ ſɭᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ⟩
              */
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
