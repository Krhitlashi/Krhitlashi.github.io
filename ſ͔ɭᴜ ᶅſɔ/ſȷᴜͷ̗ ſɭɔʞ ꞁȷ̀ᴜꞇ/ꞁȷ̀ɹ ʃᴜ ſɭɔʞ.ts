// ≺⧼ Iikrhian Dictionary Page Handler 🖱️ ⧽≻
// Fetches ſ͔ɭᴜ ᶅſɔ ꞁȷ̀ɔ ꞁȷ̀ɹ ſɭˬɔ.xlsx at runtime and parses it in-browser via
// SheetJS ( `xlsx` package ). No pre-built data.txt needed.
// List page. appends one <tr> per row to #kef tbody and wires click + search.
// Detail page. looks up a row by ?i=N and fills the named sections.
//
// POS determination and tag processing both mirror xlsx_html_etym.py.

import * as XLSX from "xlsx";

export interface Falkefu_N2k {
    i: number;
    vorto: string;
    traduko: string;
    poŝo: string;
    etikedoj: string;
    prao: string;
    fontVorto: string;
    fontPriskribo: string;
    pruntVorto: string;
    kalko: string;
}

const XLSX_CVPKSAKA = "ſ͔ɭᴜ ᶅſɔ ꞁȷ̀ɔ ꞁȷ̀ɹ ſɭˬɔ.xlsx";

const KEFHAXE: Readonly<Record<string, string>> = {
    "ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ": "Affix",
    "ſɭɔ ı],ɔ }ʃꞇ": "Evidential",
    "ſɭ,ɔ }ʃꞇ": "Verb",
    "j͑ʃɹ ᶅſɔ }ʃꞇ": "Adjective",
    "ſɭɹ ſȷɔ": "Number ( Noun )",
    "ſɭʞɔ }ʃꞇ": "Chemical ( Noun )",
    "ʃɔ": "Sound ( Noun )",
    "ŋᷠɜⅎᶗ‹": "Food ( Noun )",
    "ı],ᴜ ſ̀ȷɔ": "Plant ( Noun )",
    "ſןᴜ ſ͔ɭᴜ": "Animal ( Noun )",
    "ɭ(ᴜͷ̗": "Living Thing ( Noun )",
};

const VASAKA_KSAKA: Record<string, string> = {
    "j͐ʃэƣ̋ ꞁȷ̀ꞇ }ʃᴜƽ::3": "Loanword",
    "j͑ʃƽᴜ ſɭɔʞ::3": "Calque",
    "j͐ʃэ ɭʃᴜƴ ſɭɜ ɭʃᴜƴ::5": "Loanword ( LtKt )",
};

/**
 * Normalize a tag string to NFC so it can be compared against the
 * literal keys regardless of how the xlsx stored the original chars.
 *    @param s ( string ) - Raw tag string.
 * @returns string
 */
function normaliziEtikedon(s: string): string {
    return s.normalize("NFC");
}

const ETIKEDRENOMO_NFC: Record<string, string> = Object.fromEntries(
    Object.entries(VASAKA_KSAKA).map(( [ k, v ] ) => [ normaliziEtikedon(k), v ]),
);

const ETIKEDFORIGO_NFC: Set<string> = new Set(
    [ "ō֭̍ſɭᴜⅎ ı],ɹ::1" ].map(normaliziEtikedon),
);

/**
 * Decide POS by checking Theme first, then Is Under The Theme, for each
 * known marker.
 *    @param temo ( string ) - Theme cell ( column 0 ).
 *    @param estasSub ( string ) - Is Under The Theme cell ( column 1 ).
 * @returns string
 */
function determiniPoŝon(temo: string, estasSub: string): string {
    for ( const markilo in KEFHAXE ) {
        if ( temo.includes(markilo) ) return KEFHAXE[markilo]!;
    }
    for ( const markilo in KEFHAXE ) {
        if ( estasSub.includes(markilo) ) return KEFHAXE[markilo]!;
    }
    return "Noun";
}

/**
 * Coerce a sheet cell to a trimmed single-line string.
 *    @param v ( unknown ) - Raw cell value ( string, number, bool, null ).
 * @returns string
 */
function ĉeloAlTeksto(v: unknown): string {
    if ( v === null || v === undefined ) return "";
    return String(v).replace(/\r?\n/g, " ").trim();
}

/**
 * Format the raw Tags cell into a display string.
 *    @param kruda ( string ) - The raw Tags column value.
 * @returns string
 */
function formatiEtikedojn(kruda: string): string {
    if ( !kruda ) return "";
    const partoj = kruda.split("||");
    const eligo: string[] = [];
    for ( const parto of partoj ) {
        // ⟨ NFC-normalize so xlsx data with decomposed forms matches the literal keys ⟩
        const tondita = normaliziEtikedon(parto.trim());
        if ( !tondita || ETIKEDFORIGO_NFC.has(tondita) ) continue;
        eligo.push(ETIKEDRENOMO_NFC[tondita] ?? tondita);
    }
    return eligo.join(" ｡ ");
}

/**
 * Escape ampersand, less-than, and greater-than for safe HTML insertion.
 *    @param s ( string = "" ) - Plain text to escape.
 * @returns string
 */
function eskapiHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/**
 * Escape `s` if it has content, otherwise return a single space.
 *    @param s ( string = "" ) - Plain text to escape.
 * @returns string
 */
function ĉeloAŭSpaco(s: string): string {
    return s ? eskapiHtml(s) : " ";
}

let _datumPromeso: Promise<Falkefu_N2k[]> | null = null;

/**
 * Fetch the xlsx once, parse it with SheetJS, derive POS + raw tags,
 * and cache the resulting array across calls.
 * @returns Promise
 */
function ŝargiDatumojn(): Promise<Falkefu_N2k[]> {
    if ( !_datumPromeso ) {
        _datumPromeso = fetch("./" + XLSX_CVPKSAKA)
            .then(( respondo ) => {
                if ( !respondo.ok ) {
                    throw new Error("HTTP " + respondo.status + " loading " + XLSX_CVPKSAKA);
                }
                return respondo.arrayBuffer();
            } )
            .then(( bufro ) => {
                const wb = XLSX.read(bufro, { type: "array" });
                const folio = wb.Sheets[wb.SheetNames[0]!]!;
                const vicoj = XLSX.utils.sheet_to_json<unknown[]>(folio, {
                    header: 1,
                    defval: "",
                    raw: false,
                });
                const eligo: Falkefu_N2k[] = [];
                for ( let r = 1; r < vicoj.length; r++ ) {
                    const vico = vicoj[r];
                    if ( !vico ) continue;
                    const temo = ĉeloAlTeksto(vico[0]);
                    const estasSub = ĉeloAlTeksto(vico[1]);
                    const poŝo = determiniPoŝon(temo, estasSub);
                    eligo.push({
                        i: eligo.length,
                        vorto: ĉeloAlTeksto(vico[2]),
                        traduko: ĉeloAlTeksto(vico[3]),
                        poŝo,
                        etikedoj: ĉeloAlTeksto(vico[4]),
                        prao: ĉeloAlTeksto(vico[5]),
                        fontVorto: ĉeloAlTeksto(vico[6]),
                        fontPriskribo: ĉeloAlTeksto(vico[7]),
                        pruntVorto: ĉeloAlTeksto(vico[8]),
                        kalko: ĉeloAlTeksto(vico[9]),
                    });
                }
                return eligo;
            });
    }
    return _datumPromeso;
}

// ⟪ List Page 📋 ⟫
async function agordiListPaĝon() {
    const tabelKorpo = document.querySelector("#falkefu tbody") as HTMLTableSectionElement | null;
    const enigo = document.getElementById("2bakano") as HTMLInputElement | null;
    if ( !tabelKorpo ) return;

    let datumoj: Falkefu_N2k[];
    try {
        datumoj = await ŝargiDatumojn();
    } catch ( eraro ) {
        const ŝargado = document.getElementById("b6tem2kef");
        if ( ŝargado ) ŝargado.textContent = "ʃэ ɭʃɔ ŋᷠɹ ⟅";
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Failed to load dictionary data ⟅", eraro);
        return;
    }

    // ⟨ Render rows in a DocumentFragment so the live tbody stays untouched ⟩
    const fragmento = document.createDocumentFragment();
    for ( const vico of datumoj ) {
        const tr = document.createElement("tr");
        tr.dataset.i = String(vico.i);
        tr.tabIndex = 0;

        const iru = () => {
            // ⟨ Preserve the current lang parameter so lang=en persists across pages ⟩
            const langParam = new URLSearchParams(window.location.search).get("lang");
            let url = "./ſɭɔʞ.html?i=" + vico.i;
            if ( langParam ) {
                url += "&lang=" + encodeURIComponent(langParam);
            }
            window.location.href = url;
        };
        tr.addEventListener("click", iru);
        tr.addEventListener("keydown", ( ev ) => {
            if ( ev.key === "Enter" || ev.key === " " ) {
                ev.preventDefault();
                iru();
            }
        });

        // ⟨ Loanword column mirrors xlsx_html_etym.py. 3 cells when no tag, 4 cells when tagged ⟩
        const etiked = formatiEtikedojn(vico.etikedoj);
        const etikedĉelo = etiked
            ? "<td>" + eskapiHtml(etiked) + "</td>"
            : "";
        const poŝĉelo = etiked
            ? "<td>" + ĉeloAŭSpaco(vico.poŝo) + "</td>"
            : "<td colspan=\"2\">" + ĉeloAŭSpaco(vico.poŝo) + "</td>";
        tr.innerHTML =
            "<td colspan=\"2\">" + ĉeloAŭSpaco(vico.vorto) + "</td>" +
            "<td colspan=\"2\">" + ĉeloAŭSpaco(vico.traduko) + "</td>" +
            poŝĉelo + etikedĉelo;
        fragmento.appendChild(tr);
    }
    tabelKorpo.replaceChildren(fragmento);

    // ⟨ Search filter ⟩
    enigo?.addEventListener("input", () => {
        const q = ( enigo.value || "" ).trim().toLowerCase();
        tabelKorpo.querySelectorAll("tr[data-i]").forEach(( vico ) => {
            const teksto = ( vico.textContent || "" ).toLowerCase();
            ( vico as HTMLElement ).style.display = ( !q || teksto.includes(q) ) ? "" : "none";
        });
    });
}

// ⟪ Detail Page 🔍 ⟫
function akiriVicanIndeksonDeUrl(): number {
    const kruda = new URLSearchParams(window.location.search).get("i");
    if ( kruda === null ) return -1;
    const indekso = parseInt(kruda, 10);
    return Number.isSafeInteger(indekso) ? indekso : -1;
}

/**
 * Show or hide a named section based on whether `valoro` is empty.
 *    @param elementoId ( string = "" ) - Body element to receive the text.
 *    @param sekcioId ( string = "" ) - Wrapper section that gets `hidden`.
 *    @param valoro ( string = "" ) - Text to render.
 * @returns void
 */
function agordiKampon(elementoId: string, sekcioId: string, valoro: string): void {
    const elemento = document.getElementById(elementoId);
    const sekcio = document.getElementById(sekcioId);
    if ( !elemento || !sekcio ) return;
    if ( !valoro ) {
        sekcio.classList.add("kobe");
        return;
    }
    sekcio.classList.remove("kobe");
    elemento.textContent = valoro;
}

async function agordiDetalPaĝon() {
    const indekso = akiriVicanIndeksonDeUrl();
    const vortoElemento = document.getElementById("kef");
    const poŝoElemento = document.getElementById("haxesekef");
    if ( !vortoElemento || !poŝoElemento ) return;

    if ( indekso < 0 ) {
        vortoElemento.textContent = "";
        poŝoElemento.textContent = "";
        return;
    }

    let datumoj: Falkefu_N2k[];
    try {
        datumoj = await ŝargiDatumojn();
    } catch ( eraro ) {
        vortoElemento.textContent = "ʃэ ɭʃɔ ŋᷠɹ ⟅";
        poŝoElemento.textContent = "";
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Failed to load dictionary data.", eraro);
        return;
    }

    const vico = datumoj[ indekso ];
    if ( !vico ) {
        vortoElemento.textContent = "";
        poŝoElemento.textContent = "";
        return;
    }

    // ⟨ Spec. Theme + Is Under The Theme → POS tagging ⟩
    vortoElemento.textContent = vico.vorto;
    // ⟨ Apply Iikrhia script rendering via vacepu on the word element.
    //    The `.aih` class provides vertical layout; vacepu wraps each word
    //    in horizontal `<span class="cepufalxez">` blocks so the word displays
    //    correctly in both body-vertical ( aih ) and body-horizontal ( en ) modes. ⟩
    if ( typeof ( window as any ).vacepu === "function" ) {
        ( window as any ).vacepu( "aih" );
    }
    poŝoElemento.textContent = vico.poŝo;

    // ⟨ Fill sections. The translation element ( #skakefani ) is a bare <p>
    //    without a <thala> wrapper, so set textContent directly.  ⟩
    const tradukoEl = document.getElementById("skakefani");
    if ( tradukoEl ) tradukoEl.textContent = vico.traduko;
    agordiKampon("xaqadisuswegawekef", "xaqadisuswegawekef-araq", vico.prao);
    agordiKampon("l6kefani", "l6kefani-araq", vico.fontVorto);
    agordiKampon("kefkox2qu", "kefkox2qu-araq", vico.fontPriskribo);
    agordiKampon("kefcutasu", "kefcutasu-araq", vico.pruntVorto);
    agordiKampon("kefskakefu", "kefskakefu-araq", vico.kalko);
    agordiKampon("xehate", "xehate-araq", formatiEtikedojn(vico.etikedoj));
}

// ⟪ Entry Point 🔌 ⟫
async function inici() {
    // ⟨ List page is identified by the search input ( #2bakano ).     ⟩
    // ⟨ Detail page is identified by #kef ( only on the detail page ) . ⟩
    if ( document.getElementById("2bakano") ) {
        await agordiListPaĝon();
    } else if ( document.getElementById("kef") ) {
        await agordiDetalPaĝon();
    }
}

if ( typeof window !== "undefined" ) {
    if ( document.readyState === "loading" ) {
        document.addEventListener("DOMContentLoaded", () => { void inici(); });
    } else {
        void inici();
    }
}
