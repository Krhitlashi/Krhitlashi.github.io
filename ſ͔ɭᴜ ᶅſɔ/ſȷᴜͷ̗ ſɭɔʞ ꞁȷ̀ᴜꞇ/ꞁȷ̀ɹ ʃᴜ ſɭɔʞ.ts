/*
* ≺⧼ Iikrhia ʌ ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ ʌ ſ̀ȷᴜ ʌ ſɭᴜ ŋᷠᴜ }ʃꞇ 🖱️ ⧽≻
* ſ͕ɭɹȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( xlsx SheetJS )
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( #kef tbody tr )
* ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( ?i=N )
*
* j͑ʃƽᴜ ſɭɔʞ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( xlsx_html_etym.py )
*/

import * as XLSX from "xlsx";

export interface KefSak {
    k2fe: number;
    kef: string;
    kp6k2p2: string;
    haxe: string;
    s2tas: string;
    kumu: string;
    saxeKef: string;
    saxeKp6k2p2: string;
    inakKef: string;
    inakKp6k2p2: string;
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

const S2tasKsaka: Record<string, string> = {
    "j͐ʃэƣ̋ ꞁȷ̀ꞇ }ʃᴜƽ::3": "Loanword",
    "j͑ʃƽᴜ ſɭɔʞ::3": "Calque",
    "j͐ʃэ ɭʃᴜƴ ſɭɜ ɭʃᴜƴ::5": "Loanword ( LtKt )",
};

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( NFC )
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( xlsx NFC )
 * @param s ( string ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns k61e
 */
function k2fNfc(s: string): string {
    return s.normalize("NFC");
}

const NfcS2tasKsaka: Record<string, string> = Object.fromEntries(
    Object.entries(S2tasKsaka).map(( [ ksaka, eskek ] ) => [ k2fNfc(ksaka), eskek ]),
);

const PuS2tasNfc: Set<string> = new Set(
    [ "ō֭̍ſɭᴜⅎ ı],ɹ::1" ].map(k2fNfc),
);

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ֭ſɭᴜ ı],ɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( temo estasSub )
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ֭ſɭᴜ ı],ɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param temo ( string ) - ֭ſɭᴜ ı],ɔ ( 0 )
 * @param estasSub ( string ) - ֭ſɭᴜ ı],ɔ ( 1 )
 * @returns k61e
 */
function b6n2baHaxe(haxe: string, psazHaxe: string): string {
    for ( const s2tas in KEFHAXE ) {
        if ( haxe.includes(s2tas) ) return KEFHAXE[s2tas]!;
    }
    for ( const s2tas in KEFHAXE ) {
        if ( psazHaxe.includes(s2tas) ) return KEFHAXE[s2tas]!;
    }
    return "Noun";
}

/**
 * j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param v ( unknown ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns k61e
 */
function kubaKp6k2p2(eskek: unknown): string {
    if ( eskek === null || eskek === undefined ) return "";
    return String(eskek).replace(/\r?\n/g, " ").trim();
}

/**
 * j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param eskek ( string ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns k61e
 */
function s2tasKp6k2p2(eskek: string): string {
    if ( !eskek ) return "";
    const kekCa1ara = eskek.split("||");
    const s2tasCa1ara: string[] = [];
    for ( const kek of kekCa1ara ) {
        // ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( NFC xlsx ) ⟩
        const cataEskek = k2fNfc(kek.trim());
        if ( !cataEskek || PuS2tasNfc.has(cataEskek) ) continue;
        s2tasCa1ara.push(NfcS2tasKsaka[cataEskek] ?? cataEskek);
    }
    return s2tasCa1ara.join(" ｡ ");
}

/**
 * ſɭɜ ʃɔ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( HTML )
 * @param s ( string = "" ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns k61e
 */
function kobeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/**
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( s )
 * @param s ( string = "" ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns k61e
 */
function kubaEskek(s: string): string {
    return s ? kobeHtml(s) : " ";
}

let _ve3aqEskek: Promise<KefSak[]> | null = null;

/**
 * ſ͕ɭɹȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( xlsx SheetJS )
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @returns KefSak[]
 */
function q2qEskek(): Promise<KefSak[]> {
    if ( !_ve3aqEskek ) {
        _ve3aqEskek = fetch("./" + XLSX_CVPKSAKA)
            .then(( eskek ) => {
                if ( !eskek.ok ) {
                    throw new Error("HTTP " + eskek.status + " loading " + XLSX_CVPKSAKA);
                }
                return eskek.arrayBuffer();
            } )
            .then(( eskek ) => {
                const xlsxEskek = XLSX.read(eskek, { type: "array" });
                const cax2l = xlsxEskek.Sheets[xlsxEskek.SheetNames[0o0]!]!;
                const sakCa1ara = XLSX.utils.sheet_to_json<unknown[]>(cax2l, {
                    header: 0o1,
                    defval: "",
                    raw: false,
                });
                const kefSakCa1ara: KefSak[] = [];
                for ( let k2fe = 0o1; k2fe < sakCa1ara.length; k2fe++ ) {
                    const sak = sakCa1ara[k2fe];
                    if ( !sak ) continue;
                    const haxe = kubaKp6k2p2(sak[0o0]);
                    const psazHaxe = kubaKp6k2p2(sak[0o1]);
                    kefSakCa1ara.push({
                        k2fe: kefSakCa1ara.length,
                        kef: kubaKp6k2p2(sak[0o2]),
                        kp6k2p2: kubaKp6k2p2(sak[0o3]),
                        haxe: b6n2baHaxe(haxe, psazHaxe),
                        s2tas: kubaKp6k2p2(sak[0o4]),
                        kumu: kubaKp6k2p2(sak[0o5]),
                        saxeKef: kubaKp6k2p2(sak[0o6]),
                        saxeKp6k2p2: kubaKp6k2p2(sak[0o7]),
                        inakKef: kubaKp6k2p2(sak[0o10]),
                        inakKp6k2p2: kubaKp6k2p2(sak[0o11]),
                    });
                }
                return kefSakCa1ara;
            });
    }
    return _ve3aqEskek;
}

// ⟪ ſ̀ȷᴜ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ 📋 ⟫
async function k2fCa1ara() {
    const cax2lKuba = document.querySelector("#falkefu tbody") as HTMLTableSectionElement | null;
    const kevEskek = document.getElementById("2bakano") as HTMLInputElement | null;
    if ( !cax2lKuba ) return;

    let kefSakCa1ara: KefSak[];
    try {
        kefSakCa1ara = await q2qEskek();
    } catch ( tlohk2ni ) {
        const eskek = document.getElementById("b6tem2kef");
        if ( eskek ) eskek.textContent = "ʃэ ɭʃɔ ŋᷠɹ ⟅";
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Failed to load dictionary data ⟅", tlohk2ni);
        return;
    }

    // ⟨ ſɟɔ ŋᷠɔ ʌ j͑ʃᴜƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( DocumentFragment tbody ) ⟩
    const kekEskek = document.createDocumentFragment();
    for ( const sak of kefSakCa1ara ) {
        const sakEskek = document.createElement("tr");
        sakEskek.dataset.i = String(sak.k2fe);
        sakEskek.tabIndex = 0o0;

        const ceme3a = () => {
            // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( lang ) ⟩
            const langEskek = new URLSearchParams(window.location.search).get("lang");
            let araqEskek = "./ſɭɔʞ.html?i=" + sak.k2fe;
            if ( langEskek ) {
                araqEskek += "&lang=" + encodeURIComponent(langEskek);
            }
            window.location.href = araqEskek;
        };
        sakEskek.addEventListener("click", ceme3a);
        sakEskek.addEventListener("keydown", ( cal ) => {
            if ( cal.key === "Enter" || cal.key === " " ) {
                cal.preventDefault();
                ceme3a();
            }
        });

        // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( xlsx_html_etym.py 3 4 ) ⟩
        const s2tas = s2tasKp6k2p2(sak.s2tas);
        const s2tasKuba = s2tas
            ? "<td>" + kobeHtml(s2tas) + "</td>"
            : "";
        const haxeKuba = s2tas
            ? "<td>" + kubaEskek(sak.haxe) + "</td>"
            : "<td colspan=\"2\">" + kubaEskek(sak.haxe) + "</td>";
        sakEskek.innerHTML =
            "<td colspan=\"2\">" + kubaEskek(sak.kef) + "</td>" +
            "<td colspan=\"2\">" + kubaEskek(sak.kp6k2p2) + "</td>" +
            haxeKuba + s2tasKuba;
        kekEskek.appendChild(sakEskek);
    }
    cax2lKuba.replaceChildren(kekEskek);

    // ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ɭʃw ſɭˬɔƽ ꞁȷ̀ɜ ŋᷠᴜ ⟩
    kevEskek?.addEventListener("input", () => {
        const eskek = ( kevEskek.value || "" ).trim().toLowerCase();
        cax2lKuba.querySelectorAll("tr[data-i]").forEach(( sak ) => {
            const kp6k2p2 = ( sak.textContent || "" ).toLowerCase();
            ( sak as HTMLElement ).style.display = ( !eskek || kp6k2p2.includes(eskek) ) ? "" : "none";
        });
    });
}

// ⟪ ſ̀ȷᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ 🔍 ⟫
function q2qK2fe(): number {
    const eskek = new URLSearchParams(window.location.search).get("i");
    if ( eskek === null ) return -0o1;
    const k2fe = parseInt(eskek, 0o12);
    return Number.isSafeInteger(k2fe) ? k2fe : -0o1;
}

/**
 * ſɟɔ ŋᷠɔ ʌ ꞁȷ̀ᴜƣ̋ ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( j6fini )
 * @param eskekKsaka ( string = "" ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param kekKsaka ( string = "" ) - ꞁȷ̀ᴜƣ̋ ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ
 * @param j6fini ( string = "" ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns void
 */
function k2fKek(eskekKsaka: string, kekKsaka: string, j6fini: string): void {
    const eskek = document.getElementById(eskekKsaka);
    const kek = document.getElementById(kekKsaka);
    if ( !eskek || !kek ) return;
    if ( !j6fini ) {
        kek.classList.add("kobe");
        return;
    }
    kek.classList.remove("kobe");
    eskek.textContent = j6fini;
}

async function cemeEskek() {
    const k2fe = q2qK2fe();
    const kefEskek = document.getElementById("kef");
    const haxeEskek = document.getElementById("haxesekef");
    if ( !kefEskek || !haxeEskek ) return;

    if ( k2fe < 0o0 ) {
        kefEskek.textContent = "";
        haxeEskek.textContent = "";
        return;
    }

    let kefSakCa1ara: KefSak[];
    try {
        kefSakCa1ara = await q2qEskek();
    } catch ( tlohk2ni ) {
        kefEskek.textContent = "ʃэ ɭʃɔ ŋᷠɹ ⟅";
        haxeEskek.textContent = "";
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Failed to load dictionary data.", tlohk2ni);
        return;
    }

    const sak = kefSakCa1ara[k2fe];
    if ( !sak ) {
        kefEskek.textContent = "";
        haxeEskek.textContent = "";
        return;
    }

    // ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ֭ſɭᴜ ı],ɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( POZ ) ⟩
    kefEskek.textContent = sak.kef;
    /*
    * ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( vacepu .aih ) ⟩
    */
    if ( typeof ( window as any ).vacepu === "function" ) {
        ( window as any ).vacepu( "aih" );
    }
    haxeEskek.textContent = sak.haxe;

    /*
    * ⟨ j͑ʃ'ɔ ɭʃɔ ŋᷠɹ ʌ ꞁȷ̀ᴜƣ̋ ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( #skakefani p thala textContent ) ⟩
    */
    const kp6Eskek = document.getElementById("skakefani");
    if ( kp6Eskek ) kp6Eskek.textContent = sak.kp6k2p2;
    k2fKek("xaqadisuswegawekef", "xaqadisuswegawekef-araq", sak.kumu);
    k2fKek("l6kefani", "l6kefani-araq", sak.saxeKef);
    k2fKek("kefkox2qu", "kefkox2qu-araq", sak.saxeKp6k2p2);
    k2fKek("kefcutasu", "kefcutasu-araq", sak.inakKef);
    k2fKek("kefskakefu", "kefskakefu-araq", sak.inakKp6k2p2);
    k2fKek("xehate", "xehate-araq", s2tasKp6k2p2(sak.s2tas));
}

// ⟪ j͑ʃᴜ ı],ɔ ʌ }ʃɹƽ 🔌 ⟫
async function saxe() {
    /*
    * ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſ̀ȷᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( #2bakano ) ⟩
    * ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſ̀ȷᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( #kef ) ⟩
    */
    if ( document.getElementById("2bakano") ) {
        await k2fCa1ara();
    } else if ( document.getElementById("kef") ) {
        await cemeEskek();
    }
}

if ( typeof window !== "undefined" ) {
    if ( document.readyState === "loading" ) {
        document.addEventListener("DOMContentLoaded", () => { void saxe(); });
    } else {
        void saxe();
    }
}
