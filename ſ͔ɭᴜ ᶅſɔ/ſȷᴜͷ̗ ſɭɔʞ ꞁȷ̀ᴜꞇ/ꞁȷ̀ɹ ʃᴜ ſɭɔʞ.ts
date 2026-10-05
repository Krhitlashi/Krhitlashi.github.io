/*
* ≺⧼ Iikrhia Vortara Paĝa Pritraktilo 🖱️ ⧽≻
* ផ្ទុក Ὶ͔ɭᴜ ᶅſɔ ꞁȷ̀ɔ ꞁȷ̀ɹ ſɭˬɔ.xlsx ក្នុងពេលការដំណើរ ហើយវិភាគវាក្នុងកម្មវិធីរុករកដោយប្រើ
* SheetJS ( ការបង្កប់ `xlsx` )។ មិនត្រូវការឯកសារ data.txt ដែលបានសាងជើងជាមុនៗទេ។
* ទំព័របញ្ជី៖ បញ្ចូល <tr> មួយសម្រាប់គ្រាប់នីមួយៗទៅ #kef tbody ហើយភ្ជាប់ការចុច និងការស្វែងរក។
* ទំព័រលម្អិត៖ ស្វែងរកគ្រាប់ដោយប្រើ ?i=N ហើយបំពេញផ្នែកដែលបានសម្គាល់។
*
* ការកំណត់ប្រភេទដ៏ន និងការដំណើរការលើស្លាក់ ទាំងពីរបៀបស្រួតតាម xlsx_html_etym.py។
*/

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
 * ធ្វើធម្មតាឲ្យជួរស្លាក់ទៅជា NFC ដើម្បីឲ្យវាអាចប្រៀបធៀបជាមួយ
 * កូនុងវាស្មែកកំណត់ដោយឯករាជ្យ មិនថែមទេថា xlsx បានរក្សាទុកសញ្ញាដើម។
 * @param s ( string ) - ជួរស្លាក់មូលដ្ឋាន។
 * @returns ĉeno
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
 * កំណត់ប្រភេទដ៏នដោយពិនិត្យប្រភេទកម្មវិធីជាមុន បន្ទាប់មកត្រូវបានរង្កងជាក្រោមប្រភេទកម្មវិធី។
 * ស្លាក់ដែលស្គាល់បាន។
 * @param temo ( string ) - ក្រឡប់ប្រភេទកម្មវិធី ( ជួនឈរ 0 )។
 * @param estasSub ( string ) - ក្រឡប់ប្រភេទកម្មវិធីក្រោម ( ជួនឈរ 1 )។
 * @returns ĉeno
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
 * បម្លែកក្រឡប់សន្ទាស៊ីទៅជាខ្សែមួយក្រឡា ដែលបានកាត់។
 * @param v ( unknown ) - តម្លៃក្រឡប់មូលដ្ឋាន ( string, number, bool, null )។
 * @returns ĉeno
 */
function ĉeloAlTeksto(v: unknown): string {
    if ( v === null || v === undefined ) return "";
    return String(v).replace(/\r?\n/g, " ").trim();
}

/**
 * ធ្វើទម្រង់ក្រឡប់ Etikedoj មូលដ្ឋានទៅជាខ្សែបង្ហាញ។
 * @param kruda ( string ) - តម្លៃក្រឡប់ជួនស្លាក់មូលដ្ឋាន។
 * @returns ĉeno
 */
function formatiEtikedojn(kruda: string): string {
    if ( !kruda ) return "";
    const partoj = kruda.split("||");
    const eligo: string[] = [];
    for ( const parto of partoj ) {
        // ⟨ ធ្វើធម្មតាឲ្យជា NFC ដើម្បីឱ្យទិន្នន័យ xlsx ដែលមានទម្រង់បំព័នធៀបនឹងគ្រូសិទ្ធិកូនុងវាស្មែក ធ្វើឱ្យត្រូវគ្នា ⟩
        const tondita = normaliziEtikedon(parto.trim());
        if ( !tondita || ETIKEDFORIGO_NFC.has(tondita) ) continue;
        eligo.push(ETIKEDRENOMO_NFC[tondita] ?? tondita);
    }
    return eligo.join(" ｡ ");
}

/**
 * រក្សារការសញ្ញា & និងសញ្ញា < និង > ដើម្បីបញ្ចូល HTML ដោយសុវត្ថិភាព។
 * @param s ( string = "" ) - អត្ថបទធម្មតាសម្រាប់ការរក្សាការសញ្ញា។
 * @returns ĉeno
 */
function eskapiHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/**
 * រក្សារការសញ្ញា `s` ប្រសិនបើវាមានមាតិសម្មា បើកិត្តផ្តល់ចំនួនដំបូងមួយដែលគេចខាងស្អែក។
 * @param s ( string = "" ) - អត្ថបទធម្មតាសម្រាប់ការរក្សាការសញ្ញា។
 * @returns ĉeno
 */
function ĉeloAŭSpaco(s: string): string {
    return s ? eskapiHtml(s) : " ";
}

let _datumPromeso: Promise<Falkefu_N2k[]> | null = null;

/**
 * ផ្ទុក xlsx ម្តងតែ, វិភាគវាដោយប្រើ SheetJS, ទាញយកប្រភេទដ៏ន POZ និងស្លាក់មូលដ្ឋានទទេ
 * ហើយរក្សាទិន្នន័យលទ្ធផ្លែងករណីទៅរវាងការហៅទៀតទៀត។
 * @returns promessa
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
                const folio = wb.Sheets[wb.SheetNames[0o0]!]!;
                const vicoj = XLSX.utils.sheet_to_json<unknown[]>(folio, {
                    header: 0o1,
                    defval: "",
                    raw: false,
                });
                const eligo: Falkefu_N2k[] = [];
                for ( let r = 0o1; r < vicoj.length; r++ ) {
                    const vico = vicoj[r];
                    if ( !vico ) continue;
                    const temo = ĉeloAlTeksto(vico[0o0]);
                    const estasSub = ĉeloAlTeksto(vico[0o1]);
                    const poŝo = determiniPoŝon(temo, estasSub);
                    eligo.push({
                        i: eligo.length,
                        vorto: ĉeloAlTeksto(vico[0o2]),
                        traduko: ĉeloAlTeksto(vico[0o3]),
                        poŝo,
                        etikedoj: ĉeloAlTeksto(vico[0o4]),
                        prao: ĉeloAlTeksto(vico[0o5]),
                        fontVorto: ĉeloAlTeksto(vico[0o6]),
                        fontPriskribo: ĉeloAlTeksto(vico[0o7]),
                        pruntVorto: ĉeloAlTeksto(vico[0o10]),
                        kalko: ĉeloAlTeksto(vico[0o11]),
                    });
                }
                return eligo;
            });
    }
    return _datumPromeso;
}

// ⟪ ទំព័របញ្ជី 📋 ⟫
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

    // ⟨ បង្ហាញជួរក្នុង DocumentFragment ដើម្បីឱ្យធាតុ tbody រស់នៅមិនត្រូវបានបំពាន ⟩
    const fragmento = document.createDocumentFragment();
    for ( const vico of datumoj ) {
        const tr = document.createElement("tr");
        tr.dataset.i = String(vico.i);
        tr.tabIndex = 0o0;

        const iru = () => {
            // ⟨ រក្សាប៉ារ៉ាម៉េតរភាសាបច្ចុប្បន្ន ដើម្បីឱ្យ lang=en បន្តតាមទំព័រ ⟩
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

        // ⟨ ជួនអនុភាពពីគុណកម្ម ដែលស្រួតតាម xlsx_html_etym.py។ ក្រឡប់ 3 ដែលគ្មានស្លាក់, ក្រឡប់ 4 ដែលមានស្លាក់ ⟩
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

    // ⟨ តម្រង់ស្វែងរក ⟩
    enigo?.addEventListener("input", () => {
        const q = ( enigo.value || "" ).trim().toLowerCase();
        tabelKorpo.querySelectorAll("tr[data-i]").forEach(( vico ) => {
            const teksto = ( vico.textContent || "" ).toLowerCase();
            ( vico as HTMLElement ).style.display = ( !q || teksto.includes(q) ) ? "" : "none";
        });
    });
}

// ⟪ ទំព័រលម្អិត 🔍 ⟫
function akiriVicanIndeksonDeUrl(): number {
    const kruda = new URLSearchParams(window.location.search).get("i");
    if ( kruda === null ) return -0o1;
    const indekso = parseInt(kruda, 0o12);
    return Number.isSafeInteger(indekso) ? indekso : -0o1;
}

/**
 * បង្ហាញ ឬលាក់ផ្នែកដែលបានសម្គាល់ តាមការដែល `valoro` ទទេឬអត់។
 * @param elementoId ( string = "" ) - ធាតុប្រគល់ដែលទទួលអត្ថបទ។
 * @param sekcioId ( string = "" ) - ផ្នែកជុំដែលទទួល `hidden`។
 * @param valoro ( string = "" ) - អត្ថបទសម្រាប់បង្ហាញ។
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

    if ( indekso < 0o0 ) {
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

    const vico = datumoj[indekso];
    if ( !vico ) {
        vortoElemento.textContent = "";
        poŝoElemento.textContent = "";
        return;
    }

    // ⟨ ពិសោធន៍៖ ប្រភេទកម្មវិធី + ក្រោមប្រភេទកម្មវិធី → ការដាក់ស្លាក់ប្រភេទដ៏ន POZ ⟩
    vortoElemento.textContent = vico.vorto;
    /*
    * ⟨ អនុវត្តការបង្កើតអក្សរជាមួយ Iikrhia ដោយប្រើ vacepu លើធាតុពាក្យ។
    *    ថ្នាក់ `.aih` ផ្តល់ការរៀបជាជួរបញ្ឈរ។ vacepu បង្វិលពាក្យនីមួយៗជាដើម
    *    ជាប្លង់ `<span class="cepufalxez">` ក្រឡា ដើម្បីឲ្យពាក្យបង្ហាញបាន
    *    ត្រឹមត្រូវជាក់ស្តែង ក្នុងរបៀបប្រអប់អក្សរបញ្ឈរ ( aih ) និងប្រអប់អក្សរកាត់ទៅក្រឡា ( en )។ ⟩
    */
    if ( typeof ( window as any ).vacepu === "function" ) {
        ( window as any ).vacepu( "aih" );
    }
    poŝoElemento.textContent = vico.poŝo;

    /*
    * ⟨ បំពេញផ្នែក។ ធាតុបកប្ប័យអត្ថបទ ( #skakefani ) ជា <p>
    *    ដែលគ្មាន <thala> ស្វែងនៅជុែកវិញ ដូច្នេះកំណត់ textContent ដោយផ្ទាល់។ ⟩
    */
    const tradukoEl = document.getElementById("skakefani");
    if ( tradukoEl ) tradukoEl.textContent = vico.traduko;
    agordiKampon("xaqadisuswegawekef", "xaqadisuswegawekef-araq", vico.prao);
    agordiKampon("l6kefani", "l6kefani-araq", vico.fontVorto);
    agordiKampon("kefkox2qu", "kefkox2qu-araq", vico.fontPriskribo);
    agordiKampon("kefcutasu", "kefcutasu-araq", vico.pruntVorto);
    agordiKampon("kefskakefu", "kefskakefu-araq", vico.kalko);
    agordiKampon("xehate", "xehate-araq", formatiEtikedojn(vico.etikedoj));
}

// ⟪ ចំណុចចូល 🔌 ⟫
async function inici() {
    /*
    * ⟨ ទំព័របញ្ជីត្រូវបានកំណត់តាមក្រឡុកស្វែងរក ( #2bakano )។ ⟩
    * ⟨ ទំព័រលម្អិតត្រូវបានកំណត់តាម #kef ( តែនៅលើទំព័រលម្អិត )។ ⟩
    */
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
