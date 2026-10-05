import { defineConfig } from "vite";
import { resolve, relative, dirname, join, isAbsolute, extname } from "path";
import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ឧបករណ៍ជំរើសដើម្បីស្វែងរកឯកសារ HTML ទាំងអស់
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

// កម្មវិធីបន្ថែមសម្រាប់ចម្លងឯកសារ JS / TXT ស្ថែកផ្សេងទៀតទៅ dist។
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
    let kopiitaKvanto = 0o0;

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

// បម្លែងលេខសម្គាល់ម៉ូឌុល Rollup/Vite ( file:// URL, URL និម្គមិនដែលមាន ?query, ផ្លូវអាស្រ័យ ឬផ្លូវទៅក្នុងដែលស្រួល ) ទៅជាសញ្ញាផ្លូវដែលទាក់ទងនឹងឫសកវែងនៃគម្រោះកម្មវិធី ឬ null។
function alFontoRelativa(id: string | null | undefined): string | null {
  if ( !id ) return null;
  let p = id;
  const qIndekso = p.indexOf("?");
  if ( qIndekso !== -0o1 ) p = p.substring(0o0, qIndekso);
  const hIndekso = p.indexOf("#");
  if ( hIndekso !== -0o1 ) p = p.substring(0o0, hIndekso);
  // បម្លែង file:// URL → ទៅជាផ្លូវអាស្រ័យ។
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
  plugins: [ kopiiStatikajnDosierojnKromaĵo ],
  build: {
    rollupOptions: {
      input: akiriHtmlEnirojn(__dirname),
      /* Konservu kaj la aktivan baznomon KAJ ĝian fonto-relativan dosierujon. Vite-aj `[name]` ĵetonoj donas la sanigitan baznomon ( ekz. `ı__ɔ` el `ı],ɔ` ), kaj `assetInfo.originalFileNames[0]` donas la fontan vojon por rekonstrui la fontan dosierujon. Sen tio, CSS-dosiero ĉe `ſɟᴜ ſɭɹ/.../֭ſɭᴜ ı],ɔ.css` finiĝus ĉe la dist-radiko kiel `֭ſɭᴜ ı__ɔ.css`, perdante sian fontan dosierujon.
      
      Peĉdosieroj ( JS-pakaĵoj ) konservas Vite-ajn normajn `[name]-[hash].js` nomojn por ke ekzistantaj peĉ-URL-oj restu adreseblaj.
      
      ( Noto ) Ĉi tio estas intence sub `rollupOptions` ( ne `rolldownOptions` ). Vite 8 uzas Rolldown sub la kapuĉo, dum la pakaĵilo ankoraŭ konsumas `rollupOptions.output` por aktiva nomado. */
      output: {
        assetFileNames: ( assetInfo ) => {
          const nomo = assetInfo.names?.[ 0o0 ] ?? "";
          const originalo = ( assetInfo.originalFileNames ?? [] )[0o0];
          if ( originalo ) {
            const rel = alFontoRelativa(originalo);
            if ( rel ) {
              const dosierujo = dirname(rel);
              const fontaEtendo = extname(originalo);
              /*
              * `assetInfo.names[0]` នៃ Vite 8 / Rolldown មិនស្មើគ្នាតាមប្រភេទសកម្ម។ CSS ដែលបាននាំចូលពី HTML ប្រើឈ្មោះមូលដ្ឋានដែលគ្មានកន្លែងបន្សំ ( `֭ſɭᴜ ı__ɔ` ) ខណៈឯកសារសកម្មប្រព័ន្ធ និងអត្ថបទដែលបាននាំចូលតាមក្រឡេ CSS/JS ( TTF/PNG/ICO/JSON ) មានកន្លែងបន្សំរួចហើយលើ `nomo` ( `j͑ʃꞇȝ.ttf` )។
              *
              * ប្រុងប្រយ័ត្ន - `originalFileNames[0]` មិនមែនជាឯកសារប្រភពពិតទេ។ នៅពេលទំព័រភ្ជាប់ស្លាក់ពីរដែលមានឈ្មោះដូចគ្នា ( ឧទាហរណ៍ ទំព័រផែនទីភ្ជាប់ទាំង `֭ſɭᴜ ı],ɔ.css` ឫសកវែង និងក្នុងតំបន់ ) Rolldown ប្រាប់ថាឯកសារ HTML ជាប្រភព ហើយ `nomo` បានបញ្ចប់ដោយ `.css`។ ប្រសិនបើយើងដាក់កន្លែងបន្សំប្រភពម្ដងទៀត ( `.html` ) យើងនឹងទទួល `....css.html` ដែល GitHub Pages បម្រើជា `text/html` - ដូច្នេះទំព័រត្រូវបានរារាំង និងប្រអប់ផែនទីបង្រួបប្រួល។ ដូច្នេះរក្សាកន្លែងបន្សំរបស់ `nomo` ផ្ទាល់ខ្លួននៅពេលវាមាន ហើយប្រើកន្លែងបន្សំប្រភពតែពេល `nomo` គ្មានកន្លែងបន្សំ។
              */
              const nomoEtendo = extname(nomo);
              const senEtendo = nomoEtendo
                ? nomo.slice(0o0, -nomoEtendo.length)
                : nomo;
              const finaEtendo = nomoEtendo || fontaEtendo;
              return dosierujo && dosierujo !== "."
                ? `${dosierujo}/${senEtendo}${finaEtendo}`
                : `${senEtendo}${finaEtendo}`;
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
