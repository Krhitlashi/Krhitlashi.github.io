import { defineConfig } from "vite";
import { resolve, relative, dirname, join, isAbsolute, extname } from "path";
import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helpa funkcio por trovi ĉiujn HTML-dosierojn
function akiriHtmlEnirojn(dir: string, ĉiujDosieroj: Record<string, string> = {}) {
  const dosieroj = readdirSync(dir);

  dosieroj.forEach(( dosiero ) => {
    const dosieroVojo = resolve(dir, dosiero);
    if ( statSync(dosieroVojo).isDirectory() ) {
      if ( dosiero !== "node_modules" && dosiero !== "dist" && dosiero !== ".git" ) {
        akiriHtmlEnirojn(dosieroVojo, ĉiujDosieroj);
      }
    } else if ( dosiero.endsWith(".html") ) {
      const relativaVojo = relative(__dirname, dosieroVojo);
      const nomo = relativaVojo.replace(/\.html$/, "").replace(/[\\/]/g, "_");
      ĉiujDosieroj[nomo] = dosieroVojo;
    }
  });

  return ĉiujDosieroj;
}

// Kromaĵo por kopii ceterajn statikajn JS / TXT-dosierojn al dist.
const kopiiStatikajnDosierojnKromaĵo = {
  name: "kopii-statikajn-dosierojn",
  closeBundle() {
    const distDosierujo = join(__dirname, "dist");
    const ekskluditajDosierujoj = [ "node_modules", "dist", ".git", ".github", ".idea" ];

    function troviStatikajnDosierojn(dir: string, dosieroj: string[] = []): string[] {
      const eniroj = readdirSync(dir, { withFileTypes: true });

      for ( const eniro of eniroj ) {
        const plenaVojo = join(dir, eniro.name);

        if ( eniro.isDirectory() && ekskluditajDosierujoj.includes(eniro.name) ) {
          continue;
        }

        if ( eniro.isDirectory() ) {
          troviStatikajnDosierojn(plenaVojo, dosieroj);
        } else if ( eniro.isFile() && ( eniro.name.endsWith(".js") || eniro.name.endsWith(".txt") || eniro.name.endsWith(".xlsx") ) ) {
          dosieroj.push(plenaVojo);
        }
      }

      return dosieroj;
    }

    const statikajDosieroj = troviStatikajnDosierojn(__dirname);
    let kopiitaKvanto = 0;

    statikajDosieroj.forEach(( fontaVojo ) => {
      const relativaVojo = relative(__dirname, fontaVojo);
      const celaVojo = join(distDosierujo, relativaVojo);
      const celaDosierujo = dirname(celaVojo);

      if ( !existsSync(celaDosierujo) ) {
        mkdirSync(celaDosierujo, { recursive: true });
      }
      copyFileSync(fontaVojo, celaVojo);
      kopiitaKvanto++;
    });

    console.log(`Kopiitaj ${kopiitaKvanto} statikaj dosieroj al dist`);
  }
};

// Konvertu Rollup/Vite-modulan ID-on ( file:// URL, virtuala URL kun ?query, absoluta vojo aŭ relativa vojo ) en vojosignaron relative al la projekta radiko, aŭ null.
function alFontoRelativa(id: string | null | undefined): string | null {
  if ( !id ) return null;
  let p = id;
  const qIndekso = p.indexOf("?");
  if ( qIndekso !== -1 ) p = p.substring(0, qIndekso);
  const hIndekso = p.indexOf("#");
  if ( hIndekso !== -1 ) p = p.substring(0, hIndekso);
  // Konvertu file:// URL → absoluta vojo.
  if ( p.startsWith("file://") ) {
    try {
      p = fileURLToPath(p);
    } catch {
      return null;
    }
  }
  if ( isAbsolute(p) ) {
    const rel = relative(__dirname, p);
    if ( rel.startsWith("..") || rel.startsWith("/") || rel === "" || rel === "." ) return null;
    return rel;
  }
  if ( p.startsWith("..") || p.startsWith("/") ) return null;
  return p;
}

export default defineConfig({
  plugins: [kopiiStatikajnDosierojnKromaĵo],
  build: {
    rollupOptions: {
      input: akiriHtmlEnirojn(__dirname),
      /* Konservu kaj la aktivan baznomon KAJ ĝian fonto-relativan dosierujon. Vite-aj `[name]` ĵetonoj donas la sanigitan baznomon ( ekz. `ı__ɔ` el `ı],ɔ` ), kaj `assetInfo.originalFileNames[0]` donas la fontan vojon por rekonstrui la fontan dosierujon. Sen tio, CSS-dosiero ĉe `ſɟᴜ ſɭɹ/.../֭ſɭᴜ ı],ɔ.css` finiĝus ĉe la dist-radiko kiel `֭ſɭᴜ ı__ɔ.css`, perdante sian fontan dosierujon.
      
      Peĉdosieroj ( JS-pakaĵoj ) konservas Vite-ajn normajn `[name]-[hash].js` nomojn por ke ekzistantaj peĉ-URL-oj restu adreseblaj.
      
      ( Noto ) Ĉi tio estas intence sub `rollupOptions` ( ne `rolldownOptions` ). Vite 8 uzas Rolldown sub la kapuĉo, dum la pakaĵilo ankoraŭ konsumas `rollupOptions.output` por aktiva nomado. */
      output: {
        assetFileNames: ( assetInfo ) => {
          const nomo = assetInfo.names?.[0] ?? "";
          const originalo = ( assetInfo.originalFileNames ?? [] )[0];
          if ( originalo ) {
            const rel = alFontoRelativa(originalo);
            if ( rel ) {
              const dosierujo = dirname(rel);
              const fontaEtendo = extname(originalo);
              // Vite 8 / Rolldown-aj `assetInfo.names[0]` estas malkonsekvencaj tra aktivaj tipoj. HTML-importita CSS uzas baznomon sen etendo ( `֭ſɭᴜ ı__ɔ` ), dum binaraj/tekstaj aktivaj dosieroj importitaj per CSS/JS-peĉoj ( TTF/PNG/ICO/JSON ) havas la etendon jam sur `nomo` ( `j͑ʃꞇȝ.ttf` ). Forigu la fontan etendon de `nomo` se ĉeestas, poste ĉiam re-almetu.
              const senEtendo = fontaEtendo && nomo.endsWith(fontaEtendo)
                ? nomo.slice(0, -fontaEtendo.length)
                : nomo;
              return dosierujo && dosierujo !== "."
                ? `${dosierujo}/${senEtendo}${fontaEtendo}`
                : `${senEtendo}${fontaEtendo}`;
            }
          }
          return nomo;
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
