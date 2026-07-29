import * as XLSX from "xlsx";

// ≺⧼ Iikrhia Hazarda Frazgenerilo 🌐 ⧽≻
/**
 * Generas hazardajn frazojn laŭ la Iikrhia gramatiko.
 * - Striktan VOS ( Verbo-Objekto-Subjekto ) vortordon
 * - Ĝusta uzo de afiksoj, partikloj, kaj markiloj
 * - Uzas la ĉafalkefu vortaron por vortserĉo
 *
 * Fraza ŝablono - ( Tempo ) V ( Evi ) O ( ⺓ ( Evi ) ( Adj ) S )
 */

// ⟪ Konstantoj 📦 ⟫

const SUBJEKTA_MARKILO = "⺓";
const DEMANDA_JEJNE = "ſɟɔƴ";
const DEMANDA_ENHAVA = "ɭʃᴜ ſɟɔ";
const KAL = "ſɭᴜͷ̗";
const QU = "ſ͕ɭw";
const MU = "ŋᷠw";
const VORTO_DISIGILO = "ʌ";
const FRAZA_FERMILO = "⟅";

const SPECALAJ_MARKILOJ = [ SUBJEKTA_MARKILO, DEMANDA_JEJNE, DEMANDA_ENHAVA, KAL, QU, MU ];

const IIKRHIAJ_VOKALOJ = "ꞇɹɔᴜwɜэⅎ";
const KODOJ = [
    "п́", "ɘ", "ʞ", "ɀ", "c̭", "ƣ̋", "ⰱ", "ƨ", "ԏ͕", "ꝛ̗",
    "ɔ˞", "c̗", "ŋ", "ͷ̗", "ɯ", "ƴ", "ᴎ", "ᴜ̭", "ᶗ‹", "ⱷ̮̀",
    "ɴ", "ƽ", "ᴜ̩", "ȝ"
];

// ⟪ Afiksoj 🔧 ⟫

const ADJEKTIVIGAJ_PREFIKSOJ: Record<string, [string, string]> = {
    "2R": [ "ꞁȷ̀ɹƣ̋", "ꞁȷ̀ɹ" ],
    "K2R": [ "ſɭɹƣ̋", "ſɭɹ" ],
    "J6R": [ "ɭl̀эƣ̋", "ɭl̀э" ],
    "H2R": [ "֭ſɭɹƣ̋", "֭ſɭɹ" ],
    "SAR": [ "j͑ʃᴜƣ̋", "j͑ʃᴜ" ],
    "SWER": [ "j͑ʃп́ɔƣ̋", "j͑ʃп́ɔ" ],
    "SER": [ "j͑ʃɔƣ̋", "j͑ʃɔ" ],
};

const MODALECAJ_PREFIKSOJ: Record<string, [string, string]> = {
    "OR": [ "ꞁȷ̀ɜƣ̋", "ꞁȷ̀ɜ" ],
    "YOR": [ "ſ͕ȷɜƣ̋", "ſ͕ȷɜ" ],
    "TAK": [ "ɭʃᴜƽ", "ɭʃᴜ" ],
    "KOTAK": [ "ſɭɜ ɭʃᴜƽ", "ſɭɜ ɭʃᴜ" ]
};

const GENERALAJ_NEGACIAJ_PREFIKSOJ: Record<string, [string, string]> = {
    "KON": [ "ſɭɜc̗", "ſɭɜ" ],
};

const DERIVACIAJ_PREFIKSOJ: Record<string, [string, string]> = {
    "VER": [ "j͑ʃ'ɔƣ̋", "j͑ʃ'ɔ" ],
    "VES": [ "j͑ʃ'ɔɔ˞", "j͑ʃ'ᴜ" ],
    "B6N": [ "ʃэc̗", "ʃэ" ],
    "L6R": [ "j͐ʃэƣ̋", "j͐ʃэ" ],
};

const PREFIKSAJ_AFIKSOJ: Record<string, [string, string]> = {
    ...ADJEKTIVIGAJ_PREFIKSOJ,
    ...MODALECAJ_PREFIKSOJ,
    ...GENERALAJ_NEGACIAJ_PREFIKSOJ,
    ...DERIVACIAJ_PREFIKSOJ
};

const ALL_ADJEKTIVIGAJ_PREFIKSOJ = new Set(Object.keys(ADJEKTIVIGAJ_PREFIKSOJ));

const MODALECAJ_PAROJ: Record<string, string> = {
    "YOR": "OR",
    "OR": "YOR",
    "KOTAK": "TAK",
    "TAK": "KOTAK"
};

const SUFIKSAJ_AFIKSOJ: Record<string, [string, string]> = {
    "SU": [ "j͑ʃᴜꞇ", "ꞁȷ̀ᴜꞇ" ],
    "AL": [ "j͐ʃ", "ꞁȷ̀ᴜͷ̗" ],
    "ANI": [ "}ʃꞇ", "ꞁȷ̀ᴜ }ʃꞇ" ],
    "ANU": [ "}ʃw", "ꞁȷ̀ᴜ }ʃw" ],
    "KOZ": [ "ſɭɜƴ", "ꞁȷ̀ɜƴ" ],
    "STIF": [ "j͑ʃƨꞇʞ", "ɭʃꞇʞ" ],
};

// ⟨ Afiksaj Tradukoj 🔤 ⟩

const AFIKSAJ_TRADUKOJ: Record<string, string> = {
    "VER": "VERBALIZER",
    "VES": "CAUSITIVE",
    "B6N": "INCHOATIVE",
    "L6R": "PASSIVE",
    "2R": "WITH",
    "K2R": "USING",
    "J6R": "IN",
    "H2R": "WITHOUT",
    "SAR": "FOR",
    "SWER": "ABOUT",
    "OR": "CAN",
    "YOR": "CANNOT",
    "TAK": "SHOULD",
    "KOTAK": "SHOULD_NOT",
    "KON": "NOT",
    "SER": "OF",
    "SU": "ADJECTIVIZER",
    "AL": "BOUNDARY",
    "ANI": "NOMINALIZER",
    "ANU": "NOMINALIZER",
    "KOZ": "VERY",
    "STIF": "TEMPORAL"
};

const POS_AL_ETIKEDO: Record<string, string> = { Verb: "V", Noun: "N", Adjective: "ADJ", Evidential: "EVI" };


// ⟪ Struktura Registro 📚 ⟫

type GeneratoraFunkcio = () => unknown;

class StrukturaRegistro {
    private _generiloj: Record<string, GeneratoraFunkcio> = {};

    registri(name: string) {
        return (func: GeneratoraFunkcio): GeneratoraFunkcio => {
            this._generiloj[name] = func;
            return func;
        };
    }

    akiriStrukturojn(): string[] {
        return Object.keys(this._generiloj);
    }

    generi(name: string): unknown {
        const generator = this._generiloj[name];
        if (generator) {
            return generator();
        }
        return null;
    }
}

const registraro = new StrukturaRegistro();


// ⟪ Fonologiaj Helpiloj 🔤 ⟫

/** Check if vorto is vowel-initial.
 *     @param vorto ( string , required ) - Word to check.
 * @returns boolean */
function cxuVokalaKomenco(vorto: string): boolean {
    if ( !vorto || !vorto.trim() ) {
        return false;
    }
    const stripped = vorto.trim();
    if ( stripped.startsWith("ꞁȷ̀") ) {
        return true;
    }
    return IIKRHIAJ_VOKALOJ.includes(stripped[0]);
}

/** Check if vorto ends with a vowel sound.
 *     @param vorto ( string , required ) - Word to check.
 * @returns boolean */
function cxuVokalaFino(vorto: string): boolean {
    if ( !vorto ) {
        return true;
    }
    const stripped = vorto.trimEnd();
    if ( !stripped ) {
        return true;
    }
    for ( const coda of KODOJ ) {
        if ( stripped.endsWith(coda) ) {
            return false;
        }
    }
    return IIKRHIAJ_VOKALOJ.includes(stripped[stripped.length - 1]);
}


// ⟪ Verba Modifo 🔧 ⟫

interface VortEniro {
    gawekiif: string;
    traduko: string;
    poŝo: string;
    vico_indekso?: number;
    _adjektivigitaEl?: string;
    _adjektivigaPrefikso?: string;
}

interface ModifitaVortEniro extends VortEniro {
    _aplikitaPrefikso?: string | null;
    _aplikitaSufikso?: string | null;
    _aplikitaModaleco?: string | null;
    _modalecoNegata?: boolean;
    _intensigilo?: boolean;
}

interface VerbModifiloOpcioj {
    afikso?: string | null;
    modaleco?: string | null;
    modalecoNegata?: boolean;
    aldoniIntensigilon?: boolean;
    hazardaAfikso?: boolean;
    hazardaModaleco?: boolean;
    ekzistantaPrefikso?: string | null;
}

/**
 * Apply modifiers to a verb (afikso, modaleco, intensifier).
 * Unified function for both main verbs and VN modifier verbs.
 * Negative prefixes (YOR, KOTAK) cannot co-occur with their positive counterparts (OR, TAK).
    * @param verbo ( VortEniro , required ) - Verb entry with gawekiif and traduko.
    * @param opcioj ( VerbModifiloOpcioj = {} , optional ) - Modifier opcioj.
 * @returns ModifitaVortEniro
 */
function aplikiVerbModifilojn(verbo: VortEniro, opcioj: VerbModifiloOpcioj = {}): ModifitaVortEniro {
    let {
        afikso = null,
        modaleco = null,
        modalecoNegata = false,
        aldoniIntensigilon = false,
        hazardaAfikso = false,
        hazardaModaleco = false,
        ekzistantaPrefikso = null
    } = opcioj;

    let verboFormo = verbo.gawekiif;
    let verboTraduko = verbo.traduko;
    let aplikitaPrefikso: string | null = null;
    let aplikitaSufikso: string | null = null;
    let aplikitaModaleco: string | null = null;

    const aplikiModalecanAfikson = (vorto: string, mod: string, negata: boolean): string => {
        const afiksoMapo: Record<string, string> = { "can": negata ? "YOR" : "OR", "should": negata ? "KOTAK" : "TAK" };
        const afiksoKlavo = afiksoMapo[mod];
        return afiksoKlavo ? aplikiAfikson(vorto, afiksoKlavo) : vorto;
    };

    if (modaleco) {
        const modalecoPrefikso = modalecoNegata ? "YOR" : "OR";
        if (ekzistantaPrefikso && akiriKonfliktantanPrefikson(modalecoPrefikso) === ekzistantaPrefikso) {
            modaleco = null;
            modalecoNegata = false;
        } else {
            verboFormo = aplikiModalecanAfikson(verboFormo, modaleco, modalecoNegata);
            aplikitaModaleco = modaleco;
            aplikitaPrefikso = modalecoPrefikso;
        }
    }

    if (!aplikitaModaleco && hazardaModaleco) {
        const modalities: [string, boolean][] = [["can", false], ["should", false]];
        const [elektitaModaleco, negata] = modalities[Math.floor(Math.random() * modalities.length)];
        const selectedPrefix = negata ? "YOR" : "OR";
        if (ekzistantaPrefikso && akiriKonfliktantanPrefikson(selectedPrefix) === ekzistantaPrefikso) {
        } else {
            verboFormo = aplikiModalecanAfikson(verboFormo, elektitaModaleco, negata);
            aplikitaModaleco = elektitaModaleco;
            aplikitaPrefikso = selectedPrefix;
        }
    }

    if (afikso) {
        verboFormo = aplikiAfikson(verboFormo, afikso);
        if (PREFIKSAJ_AFIKSOJ[afikso]) {
            aplikitaPrefikso = afikso;
        } else if (SUFIKSAJ_AFIKSOJ[afikso]) {
            aplikitaSufikso = afikso;
        }
    } else if (hazardaAfikso) {
        const afiksoj = ["L6R", "B6N"];
        const elektitaAfikso = afiksoj[Math.floor(Math.random() * afiksoj.length)];
        verboFormo = aplikiAfikson(verboFormo, elektitaAfikso);
        aplikitaPrefikso = elektitaAfikso;
    }

    if (aldoniIntensigilon) {
        verboFormo = aplikiAfikson(verboFormo, "KOZ");
        aplikitaSufikso = "KOZ";
    }

    return {
        ...verbo,
        gawekiif: verboFormo,
        traduko: verboTraduko,
        _aplikitaPrefikso: aplikitaPrefikso,
        _aplikitaSufikso: aplikitaSufikso,
        _aplikitaModaleco: aplikitaModaleco,
        _modalecoNegata: modalecoNegata,
        _intensigilo: aldoniIntensigilon
    };
}


// ⟪ Afiksa Apliko 🔧 ⟫

/**
 * Apply afikso based on phonological rules.
 * Automatically determines if prefix or suffix based on afikso type.
 * Selects vowel or consonant form based on vorto boundary.
    * @param vorto ( string , required ) - Word to apply afikso to.
    * @param afiksoTipo ( string , required ) - Type of afikso (e.g., "OR", "KON", "SU", "AL").
 * @returns string
 */
function aplikiAfikson(vorto: string, afiksoTipo: string): string {
    if ( !vorto ) return vorto;

    if ( PREFIKSAJ_AFIKSOJ[afiksoTipo] ) {
        const [vowelForm, consonantForm] = PREFIKSAJ_AFIKSOJ[afiksoTipo];
        const form = cxuVokalaKomenco(vorto) ? vowelForm : consonantForm;
        return `${form} ${vorto}`;
    }

    if ( SUFIKSAJ_AFIKSOJ[afiksoTipo] ) {
        const [vowelForm, consonantForm] = SUFIKSAJ_AFIKSOJ[afiksoTipo];
        const form = cxuVokalaFino(vorto) ? vowelForm : consonantForm;
        return `${vorto} ${form}`;
    }

    return vorto;
}

/**
 * Check if afikso is adjectivizing (turns vorto into adjective).
    * @param afiksoTipo ( string , required ) - Type of afikso.
 * @returns boolean
 */
function cxuAdjektivaAfikso(afiksoTipo: string): boolean {
    return ALL_ADJEKTIVIGAJ_PREFIKSOJ.has(afiksoTipo);
}

/**
 * Check if a vorto has an adjectivizing prefix.
 * Adjectivizing prefixes turn nouns/verbs into adjectives.
 * L6R only adjectivizes non-verbs (for verbs it's passive voice).
 * Uses akiriL6RUzon() to determine L6R function.
    * @param vorto ( string , required ) - Word to check.
    * @param vortoEniro ( VortEniro | null = null , optional ) - Word entry to check if L6R is passive.
 * @returns boolean
 */
function cxuAdjektivaPrefikso(vorto: string, vortoEniro: VortEniro | null = null): boolean {
    if ( !vorto ) return false;

    for ( const prefix of Object.keys(ADJEKTIVIGAJ_PREFIKSOJ) ) {
        const [vowelForm, consonantForm] = PREFIKSAJ_AFIKSOJ[prefix];
        if ( vorto.startsWith(vowelForm + " ") || vorto.startsWith(consonantForm + " ") ) {
            return true;
        }
    }

    const l6rUsage = akiriL6RUzon(vorto, vortoEniro);
    return l6rUsage === "adjectivizer";
}

/**
 * Check if L6R prefix is used as passive (on a verb) or adjectivizer (on non-verb).
    * @param vorto ( string | null , required ) - Word to check.
    * @param vortoEniro ( VortEniro | null , required ) - Word entry from dictionary.
 * @returns string
 */
function akiriL6RUzon(vorto: string | null, vortoEniro: VortEniro | null): string {
    if ( !vorto ) return "none";
    const [l6rVowel, l6rConsonant] = PREFIKSAJ_AFIKSOJ["L6R"];
    if ( vorto.startsWith(l6rVowel + " ") || vorto.startsWith(l6rConsonant + " ") ) {
        return cxuVerbo(vortoEniro) ? "passive" : "adjectivizer";
    }
    return "none";
}

/**
 * Get a random adjectivizing prefix type.
 * Returns one of the adjectivizing prefix keys (2R, K2R, J6R, H2R, SAR, SWER, SER).
 * @returns string
 */
function akiriHazardanAdjektivanPrefikson(): string {
    const prefixes = Object.keys(ADJEKTIVIGAJ_PREFIKSOJ);
    return prefixes[Math.floor(Math.random() * prefixes.length)];
}

/**
 * Apply an adjectivizing prefix to a vorto, converting it to an adjective.
 * Adjectivizing prefixes turn nouns/verbs into adjectives with relational meanings
 * - 2R. WITH (having the quality of)
 * - K2R. USING (by means of)
 * - J6R. IN (located within)
 * - H2R. WITHOUT (lacking)
 * - SAR. FOR (purpose/benefit)
 * - SWER. ABOUT (concerning)
 * - SER. OF (possession/relation)
    * @param vortoEniro ( VortEniro , required ) - Word entry with gawekiif, traduko, and pos.
    * @param prefiksoTipo ( string | null = null , optional ) - Specific prefix type, or null for random.
 * @returns VortEniro
 */
function aplikiAdjektivanPrefikson(vortoEniro: VortEniro, prefiksoTipo: string | null = null): VortEniro {
    if (!vortoEniro || !vortoEniro.gawekiif) {
        return vortoEniro;
    }

    const selectedPrefix = prefiksoTipo || akiriHazardanAdjektivanPrefikson();
    const prefixTranslation = AFIKSAJ_TRADUKOJ[selectedPrefix] || selectedPrefix;

    const adjectivizedForm = aplikiAfikson(vortoEniro.gawekiif, selectedPrefix);

    const adjectivalTranslation = `[${prefixTranslation}] - ${vortoEniro.traduko}`;

    return {
        ...vortoEniro,
        gawekiif: adjectivizedForm,
        traduko: adjectivalTranslation,
        poŝo: "Adjective",
        _adjektivigitaEl: vortoEniro.poŝo,
        _adjektivigaPrefikso: selectedPrefix
    };
}

/**
 * Create an adjective from a noun or verb using adjectivizing prefixes.
 * If no noun/verb is available, returns null.
    * @param fontoPoŝo ( "Noun" | "Verb" = "Noun" , optional ) - Source part of speech.
    * @param prefiksoTipo ( string | null = null , optional ) - Specific prefix type, or null for random.
 * @returns VortEniro | null
 */
function kreiAdjektivon(fontoPoŝo: "Noun" | "Verb" = "Noun", prefiksoTipo: string | null = null): VortEniro | null {
    const fontoVorto = akiriVortonPerPoŝo(fontoPoŝo);
    if (!fontoVorto) {
        return null;
    }
    return aplikiAdjektivanPrefikson(fontoVorto, prefiksoTipo);
}

/**
 * Check if a vorto is a verb (for L6R restriction).
    * @param vortoEniro ( VortEniro | null , required ) - Word entry from dictionary.
 * @returns boolean
 */
function cxuVerbo(vortoEniro: VortEniro | null): boolean {
    return vortoEniro !== null && vortoEniro.poŝo === "Verb";
}

/**
 * Get the conflicting modaleco prefix for a given prefix.
 * Negative modaleco prefixes (YOR, KOTAK) cannot co-occur with their positive counterparts (OR, TAK).
    * @param prefiksoTipo ( string , required ) - The prefix type to check.
 * @returns string | null
 */
function akiriKonfliktantanPrefikson(prefiksoTipo: string): string | null {
    return MODALECAJ_PAROJ[prefiksoTipo] || null;
}


// ⟪ Vortara Ŝarĝo 📖 ⟫

const XLSX_CVPKSAKA = "ſ͔ɭᴜ ᶅſɔ ꞁȷ̀ɔ ꞁȷ̀ɹ ſɭˬɔ.xlsx";

const VORTARAJ_PATHS = [
    "../../ſ͔ɭᴜ ᶅſɔ/ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ/" + XLSX_CVPKSAKA,
    "../ſ͔ɭᴜ ᶅſɔ/ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ/" + XLSX_CVPKSAKA,
    "./" + XLSX_CVPKSAKA,
];

const IIKRHIAJ_KOMENCAJ = [
    "ᶅſ", "ſן", "ſȷ", "ʃ", "ŋᷠ", "ɽ͑ʃ'", "j͑ʃ'", "ɭʃ", "ɭ(", "ſᶘ", "j͑ʃ", "}ʃ",
    "ſ̀ȷ", "j͐ʃ", "ſɭˬ", "ſɭ,", "ɭl̀", "ſɟ", "ı],", "ſ͕ȷ", "ſ͔ɭ", "ſɭ", "֭ſɭ", "ſ͕ɭ",
    "ꞁȷ̀",
    "ȏſן", "ȏɭʃ'", "ȏſ̀ȷ", "ȏſɟ", "ȏɭʃ", "ȏŋᷠ", "ȏ}ʃ'", "ȏoͩſ̀ȷ", "ȏſ͕ȷ", "ȏ}ʃ",
];

const IIKRHIAJ_INTERNAJ = [
    "п́", "ɘ", "ʞ", "ɀ", "c̭", "ƣ̋", "ⰱ", "ƨ", "ԏ͕", "ꝛ̗", "ɔ˞", "c̗", "ŋ", "ͷ̗",
    "ɯ", "ƴ", "ᴎ", "ᴜ̭", "ᶗ‹", "ⱷ̮̀", "ɴ", "ƽ", "ᴜ̩", "ȝ",
    "ꞇ", "ɔ", "ᴜ", "ɹ", "ɜ", "э", "ɔⅎ", "ɜⅎ", "эⅎ",
];

const IIKRHIAJ_INTERPUNKCIOJ = ["⟅", "｡", "⸙", "ʌ"];

const _vortaroKaso = new Map<string, VortEniro[]>();

/**
 * Get all Iikrhia script sequences for character detection.
 * @returns string[]
 */
function akiriCxiujnIikrhiajnSekvencojn(): string[] {
    return [...IIKRHIAJ_KOMENCAJ, ...IIKRHIAJ_INTERNAJ, ...IIKRHIAJ_INTERPUNKCIOJ];
}

/**
 * Check if teksto contains Iikrhia script characters.
    * @param teksto ( string , required ) - Text to check.
 * @returns boolean
 */
function cxuEnhavasIikrhianSkribon(teksto: string): boolean {
    if (!teksto) {
        return false;
    }
    return akiriCxiujnIikrhiajnSekvencojn().some(seq => teksto.includes(seq));
}

/**
 * Select traduko parts that don't contain Iikrhia script.
    * @param tradukoPartoj ( string[] , required ) - List of traduko alternatives.
 * @returns string
 */
function elektiNeIikrhianTradukon(tradukoPartoj: string[]): string {
    for (const trans of tradukoPartoj) {
        if (!cxuEnhavasIikrhianSkribon(trans)) {
            return trans;
        }
    }
    return tradukoPartoj[0] || "";
}

// ⟨ POS markers — same as dictionary page handler ⟩
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

/**
 * Coerce a sheet cell to a trimmed single-line string.
 *    @param v ( unknown ) - Raw cell value.
 * @returns string
 */
function ĉeloAlTeksto(v: unknown): string {
    if ( v === null || v === undefined ) return "";
    return String(v).replace(/\r?\n/g, " ").trim();
}

/**
 * Decide POS by checking Theme first, then Is Under The Theme.
 *    @param temo ( string ) - Theme cell ( column 0 ).
 *    @param estasSub ( string ) - Is Under The Theme cell ( column 1 ).
 * @returns string
 */
function determiniPoŝon(temo: string, estasSub: string): string {
    for ( const markilo in KEFHAXE ) {
        if ( temo.includes(markilo) ) return normigiPoŝon(KEFHAXE[markilo]!);
    }
    for ( const markilo in KEFHAXE ) {
        if ( estasSub.includes(markilo) ) return normigiPoŝon(KEFHAXE[markilo]!);
    }
    return "Noun";
}

/**
 * Normalise a KEFHAXE POS label to its base type.
 * "Number ( Noun )" → "Noun", "Chemical ( Noun )" → "Noun", "Affix" → "Affix", etc.
 * This mirrors the original `determinePos()` regex extraction.
 *    @param poŝo ( string ) - Raw POS label.
 * @returns string
 */
function normigiPoŝon(poŝo: string): string {
    const match = poŝo.match( /\((\w+)\)$/ );
    if ( match ) return match[1];
    return poŝo;
}

/**
 * Fetch and parse the xlsx dictionary, returning VortEniro[] directly.
    * @param xlsxVojo ( string | null = null , optional ) - Path to the xlsx file.
 * @returns VortEniro[]
 */
async function sxargiVortaron(xlsxVojo: string | null = null): Promise<VortEniro[]> {
    const path = xlsxVojo || VORTARAJ_PATHS[0];

    if ( _vortaroKaso.has(path) ) {
        return _vortaroKaso.get(path)!;
    }

    try {
        const respondo = await fetch(path);
        if ( !respondo.ok ) {
            throw new Error("HTTP " + respondo.status + " loading " + path);
        }
        const bufro = await respondo.arrayBuffer();
        const wb = XLSX.read(bufro, { type: "array" });
        const folio = wb.Sheets[wb.SheetNames[0]!]!;
        const vicoj = XLSX.utils.sheet_to_json<unknown[]>(folio, {
            header: 1,
            defval: "",
            raw: false,
        });
        const eligo: VortEniro[] = [];
        for ( let r = 1; r < vicoj.length; r++ ) {
            const vico = vicoj[r];
            if ( !vico ) continue;
            const temo = ĉeloAlTeksto(vico[0]);
            const estasSub = ĉeloAlTeksto(vico[1]);
            const vortoKruda = ĉeloAlTeksto(vico[2]);
            const tradukoKruda = ĉeloAlTeksto(vico[3]);
            if ( !vortoKruda ) continue;
            const poŝo = determiniPoŝon(temo, estasSub);
            // ⟨ Split multi-vorto cells by "｡" — same as original HTML parser ⟩
            const vortoj = vortoKruda.split("｡").map(p => p.trim()).filter(p => p);
            const tradukoj = tradukoKruda ? tradukoKruda.split("｡").map(p => p.trim()).filter(p => p) : [];
            for ( const unuVorto of vortoj ) {
                const trans = tradukoj.length > 0
                    ? elektiNeIikrhianTradukon(tradukoj)
                    : unuVorto;
                eligo.push({
                    gawekiif: unuVorto,
                    traduko: trans,
                    poŝo: poŝo,
                    vico_indekso: r - 1,
                });
            }
        }
        _vortaroKaso.set(path, eligo);
        console.log("( ſ̀ȷᴜ ſɭɹ ) Loaded " + eligo.length + " vortos from " + path);
        return eligo;
    } catch ( eraro ) {
        console.warn("( ſ̀ȷᴜ ſɭɹ ) Could not load dictionary from " + path, eraro);
        const malplena: VortEniro[] = [];
        _vortaroKaso.set(path, malplena);
        return malplena;
    }
}

/**
 * Load dictionary by trying multiple paths in order.
 * @returns VortEniro[]
 */
async function sxargiVortaronKunFalreto(): Promise<VortEniro[]> {
    for ( const path of VORTARAJ_PATHS ) {
        const vortoj = await sxargiVortaron(path);
        if ( vortoj.length > 0 ) {
            console.log("( ſ̀ȷᴜ ſɭɹ ) Successfully loaded dictionary from " + path);
            return vortoj;
        }
    }
    return [];
}

/**
 * Load dictionary synchronously (if pre-loaded).
 * @returns VortEniro[]
 */
function sxargiVortaronSinkrone(): VortEniro[] {
    const firstEntry = _vortaroKaso.values().next();
    return firstEntry.value || [];
}

/**
 * Get random vorto by POS.
    * @param pos ( string , required ) - Part of speech tag.
 * @returns VortEniro | null
 */
function akiriVortonPerPoŝo(pos: string): VortEniro | null {
    const vortoj = sxargiVortaronSinkrone().filter(w => w.poŝo === pos);
    if ( vortoj.length === 0 ) return null;
    return vortoj[Math.floor(Math.random() * vortoj.length)];
}


// ⟪ Frazaj Komponantoj 🧱 ⟫

/**
 * Word position types in VOS sentence strukturo.
 */
const VortPozicio = {
    TEMPORALA: "TEMPORALA",
    VERBO: "VERBO",
    EVIDENCA_VP: "EVIDENCA_VP",
    OBJEKTO: "OBJEKTO",
    SUBJEKTA_MARKILO: "SUBJEKTA_MARKILO",
    EVIDENCA_FRAZO: "EVIDENCA_FRAZO",
    SUBJEKTO: "SUBJEKTO"
} as const;

type VortPozicioTipo = typeof VortPozicio[keyof typeof VortPozicio];

interface DemandInformo {
    cxuDemando: boolean;
    cxuJesNe: boolean;
}

interface IntensigInformo {
    aktiva: boolean;
    surVerbo: boolean;
    celataAdjektivo?: VortEniro | null;
}

interface FrazVortEniro {
    vorto: VortEniro;
    pozicio: VortPozicioTipo;
    cxuAdjektivo: boolean;
    havasKalAntaŭe: boolean;
    temaMarkilo: string | null;
}

interface VerbModifiloj {
    afikso: string | null;
    modaleco: string | null;
    negata: boolean;
}

/**
 * Components for building a sentence.
 * Uses unified vortos array - all vortos (including adjectives, VN sequences, coordinated elements)
 * are stored as vorto entries with position and modifier information.
 */
class FrazKomponantoj {
    tempo: VortEniro | null = null;
    verbo: VortEniro | null = null;
    verboModifiloj: VerbModifiloj = { afikso: null, modaleco: null, negata: false };
    evidencialoVp: VortEniro | null = null;
    evidencialoFrazo: VortEniro | null = null;
    demando: DemandInformo = { cxuDemando: false, cxuJesNe: false };
    intensigilo: IntensigInformo = { aktiva: false, surVerbo: false };
    strukturoNomo = "";
    _modifitaVerbo?: ModifitaVortEniro;

    vortoj: FrazVortEniro[] = [];
}

/**
 * Helper to get afikso traduko with fallback to key.
    * @param klavo ( string , required ) - Affix key.
 * @returns string | null
 */
function _akiriAfiksoTradukon(klavo: string): string | null {
    return AFIKSAJ_TRADUKOJ[klavo] || klavo;
}


// ⟪ Fraza Konstruilo 🔨 ⟫

class FrazKonstruilo {
    components: FrazKomponantoj;

    constructor() {
        this.components = new FrazKomponantoj();
    }

    agordiStrukturnomon(name: string): FrazKonstruilo {
        this.components.strukturoNomo = name;
        return this;
    }

    agordiTemporalon(temporal: VortEniro): FrazKonstruilo {
        this.components.tempo = temporal;
        return this;
    }

    agordiVerbon(verbo: VortEniro, afikso: string | null = null, modaleco: string | null = null, negata: boolean = false): FrazKonstruilo {
        this.components.verbo = verbo;
        this.components.verboModifiloj = { afikso, modaleco, negata };
        return this;
    }

    aldoniVorton(vorto: VortEniro, pozicio: VortPozicioTipo, opcioj: {
        cxuAdjektivo?: boolean;
        havasKalAntaŭe?: boolean;
        temaMarkilo?: string | null;
    } = {}): FrazKonstruilo {
        const {
            cxuAdjektivo = false,
            havasKalAntaŭe = false,
            temaMarkilo = null
        } = opcioj;

        this.components.vortoj.push({
            vorto,
            pozicio,
            cxuAdjektivo,
            havasKalAntaŭe,
            temaMarkilo
        });
        return this;
    }

    aldoniAdjektivojn(adjectives: VortEniro[], targetPosition: VortPozicioTipo): FrazKonstruilo {
        for (const adj of adjectives) {
            this.components.vortoj.unshift({
                vorto: adj,
                pozicio: targetPosition,
                cxuAdjektivo: true,
                havasKalAntaŭe: false,
                temaMarkilo: null
            });
        }
        return this;
    }

    aldoniKoordinatanVorton(vorto: VortEniro, pozicio: VortPozicioTipo, useKal: boolean = true): FrazKonstruilo {
        this.aldoniVorton(vorto, pozicio, { havasKalAntaŭe: useKal });
        return this;
    }

    agordiEvidencialoVp(evidential: VortEniro): FrazKonstruilo {
        this.components.evidencialoVp = evidential;
        return this;
    }

    agordiEvidencialoFrazon(evidential: VortEniro): FrazKonstruilo {
        this.components.evidencialoFrazo = evidential;
        return this;
    }

    agordiDemandon(cxuJesNe: boolean = true): FrazKonstruilo {
        this.components.demando = { cxuDemando: true, cxuJesNe };
        return this;
    }

    agordiIntensigilon(adj: VortEniro | null, onVerb: boolean = false): FrazKonstruilo {
        if (onVerb) {
            this.components.intensigilo.surVerbo = true;
        } else if (adj) {
            this.components.intensigilo.celataAdjektivo = adj;
        }
        this.components.intensigilo.aktiva = true;
        return this;
    }

    private _aplikiVerbModifojn(): ModifitaVortEniro {
        const modifiedVerb = aplikiVerbModifilojn(this.components.verbo!, {
            afikso: this.components.verboModifiloj.afikso,
            modaleco: this.components.verboModifiloj.modaleco,
            modalecoNegata: this.components.verboModifiloj.negata,
            aldoniIntensigilon: this.components.intensigilo.aktiva && this.components.intensigilo.surVerbo
        });
        this.components._modifitaVerbo = modifiedVerb;
        return modifiedVerb;
    }

    private _aplikiLimon(parts: string[]): string[] {
        if (parts.length === 0) return parts;
        const lastIdx = parts.length - 1;
        if (!this._cxuSpecialaMarkilo(parts[lastIdx])) {
            parts[lastIdx] = aplikiAfikson(parts[lastIdx], "AL");
        }
        return parts;
    }

    private _cxuSpecialaMarkilo(teksto: string): boolean {
        return SPECALAJ_MARKILOJ.some(m => teksto === m || teksto.endsWith(m));
    }

    private _konstruiVerbanStrukturon(modifiers: VerbModifiloj, hasIntensifier: boolean): string {
        if (hasIntensifier) return "V-VERY";
        if (modifiers.modaleco) {
            const prefixName = modifiers.negata
                ? (modifiers.modaleco === "can" ? "YOR" : "KOTAK")
                : modifiers.modaleco.toUpperCase();
            return `${prefixName}-V`;
        }
        if (modifiers.afikso) {
            const afiksoTraduko = AFIKSAJ_TRADUKOJ[modifiers.afikso] || modifiers.afikso;
            return `${afiksoTraduko}-V`;
        }
        return "V";
    }

    private _konstruiTradukon(baseTrans: string, prefix: string | null = null, suffix: string | null = null): string {
        if (!baseTrans) return "";

        const prefixPart = prefix ? `[${prefix}] - ` : "";
        const suffixPart = suffix ? `-${suffix}` : "";

        return `${prefixPart}[${baseTrans}${suffixPart}]`;
    }

    private _akiriAfiksoTradukojn(modifiers: VerbModifiloj | ModifitaVortEniro | null, isWord: boolean = false): [string | null, string | null] {
        if (!modifiers) return [null, null];

        let prefix: string | null = null;
        let suffix: string | null = null;

        if (isWord) {
            const mod = modifiers as ModifitaVortEniro;
            if (mod._modalecoNegata && mod._aplikitaModaleco) {
                const prefixKey = mod._aplikitaModaleco === "can" ? "YOR" : "KOTAK";
                prefix = _akiriAfiksoTradukon(prefixKey);
            } else if (mod._aplikitaModaleco) {
                prefix = _akiriAfiksoTradukon(mod._aplikitaModaleco.toUpperCase());
            } else if (mod._aplikitaPrefikso) {
                prefix = _akiriAfiksoTradukon(mod._aplikitaPrefikso);
            }
            if (mod._aplikitaSufikso) {
                suffix = _akiriAfiksoTradukon(mod._aplikitaSufikso);
            }
        } else {
            const mod = modifiers as VerbModifiloj;
            if (mod.modaleco) {
                const prefixKey = mod.negata
                    ? (mod.modaleco === "can" ? "YOR" : "KOTAK")
                    : mod.modaleco.toUpperCase();
                prefix = _akiriAfiksoTradukon(prefixKey);
            } else if (mod.afikso) {
                prefix = _akiriAfiksoTradukon(mod.afikso);
            }
        }

        return [prefix, suffix];
    }

    private _aldoniVorton(
        gawekiif: string[],
        strukturo: string[],
        traduko: string[],
        gawekiifText: string,
        struct: string,
        transText: string,
        prefix: string | null = null,
        suffix: string | null = null
    ): void {
        gawekiif.push(gawekiifText);
        strukturo.push(struct.toUpperCase());
        traduko.push(this._konstruiTradukon(transText, prefix, suffix));
    }

    konstrui(): { gawekiif: string; traduko: string; strukturo: string; components: FrazKomponantoj } {
        const gawekiif: string[] = [];
        const strukturo: string[] = [];
        const traduko: string[] = [];

        if (this.components.tempo) {
            const time = this.components.tempo;
            this._aldoniVorton(gawekiif, strukturo, traduko, time.gawekiif, "T", time.traduko);
        }

        const verbAdjectives = this.components.vortoj.filter(w =>
            w.pozicio === VortPozicio.VERBO && w.cxuAdjektivo
        );
        this._elmetiAdjektivojn(verbAdjectives, gawekiif, strukturo, traduko);

        const modifiedVerb = this._aplikiVerbModifojn();
        const modifiers = this.components.verboModifiloj;
        const [verbPrefix, verbSuffix] = this._akiriAfiksoTradukojn(modifiers);
        const hasIntensifier = this.components.intensigilo.aktiva && this.components.intensigilo.surVerbo;
        this._aldoniVorton(gawekiif, strukturo, traduko, modifiedVerb.gawekiif, this._konstruiVerbanStrukturon(modifiers, hasIntensifier), modifiedVerb.traduko, verbPrefix, verbSuffix);

        if (this.components.evidencialoVp) {
            const ev = this.components.evidencialoVp;
            this._aldoniVorton(gawekiif, strukturo, traduko, ev.gawekiif, "EVI", ev.traduko);
        }

        this._konstruiObjektanFrazon(gawekiif, strukturo, traduko);

        if (this.components.demando.cxuDemando) {
            const marker = this.components.demando.cxuJesNe ? DEMANDA_JEJNE : DEMANDA_ENHAVA;
            const structLabel = this.components.demando.cxuJesNe ? "CEZ" : "TACE";
            const markerTrans = this.components.demando.cxuJesNe ? "YES/NO_Q" : "CONTENT_Q";
            this._aldoniVorton(gawekiif, strukturo, traduko, marker, structLabel, markerTrans);
        } else {
            this._aldoniVorton(gawekiif, strukturo, traduko, SUBJEKTA_MARKILO, "⺓", "⺓");
        }

        if (this.components.evidencialoFrazo) {
            const ev = this.components.evidencialoFrazo;
            this._aldoniVorton(gawekiif, strukturo, traduko, ev.gawekiif, "EVI", ev.traduko);
        }

        this._konstruiSubjektanFrazon(gawekiif, strukturo, traduko);

        return {
            gawekiif: `${gawekiif.join(` ${VORTO_DISIGILO} `)} ${FRAZA_FERMILO}`,
            traduko: traduko.join(" "),
            strukturo: strukturo.join(" "),
            components: this.components
        };
    }

    private _elmetiAdjektivanEniron(
        adjEntry: FrazVortEniro,
        gawekiif: string[],
        strukturo: string[],
        traduko: string[],
        intensifierApplied: boolean
    ): { gaw: string; struct: string; tradukoText: string; intensifierApplied: boolean } {
        const aldoniIntensigilon = this.components.intensigilo.aktiva &&
            !this.components.intensigilo.surVerbo &&
            !intensifierApplied;
        if (aldoniIntensigilon) intensifierApplied = true;

        const gaw = aldoniIntensigilon ? aplikiAfikson(adjEntry.vorto.gawekiif, "KOZ") : adjEntry.vorto.gawekiif;

        let struct = "ADJ";
        let prefixTranslation: string | null = null;
        if (adjEntry.vorto._adjektivigaPrefikso) {
            const prefixKey = adjEntry.vorto._adjektivigaPrefikso;
            prefixTranslation = AFIKSAJ_TRADUKOJ[prefixKey] || prefixKey;
            struct = aldoniIntensigilon ? `${prefixKey}-ADJ-KOZ` : `${prefixKey}-ADJ`;
        } else if (aldoniIntensigilon) {
            struct = "ADJ-KOZ";
        }

        const suffix = aldoniIntensigilon ? "KOZ" : null;

        if (gawekiif.length > 0) {
            this._aplikiLimon(gawekiif);
            this._aplikiLimonAlStrukturo(strukturo);
        }

        let tradukoText = adjEntry.vorto.traduko;
        if (prefixTranslation && !adjEntry.vorto.traduko.startsWith(`[${prefixTranslation}]`)) {
            tradukoText = `[${prefixTranslation}] - ${adjEntry.vorto.traduko}`;
        }

        this._aldoniVorton(gawekiif, strukturo, traduko, gaw, struct, tradukoText, null, suffix);

        return { gaw, struct, tradukoText, intensifierApplied };
    }

    private _elmetiAdjektivojn(
        adjectives: FrazVortEniro[],
        gawekiif: string[],
        strukturo: string[],
        traduko: string[]
    ): void {
        if (!adjectives || adjectives.length === 0) return;

        let intensifierApplied = this.components.intensigilo.aktiva && this.components.intensigilo.surVerbo;

        for (const adjEntry of adjectives) {
            const result = this._elmetiAdjektivanEniron(adjEntry, gawekiif, strukturo, traduko, intensifierApplied);
            intensifierApplied = result.intensifierApplied;
        }
    }

    private _konstruiObjektanFrazon(gawekiif: string[], strukturo: string[], traduko: string[]): void {
        this._konstruiFrazon(gawekiif, strukturo, traduko, VortPozicio.OBJEKTO, false);
    }

    private _konstruiSubjektanFrazon(gawekiif: string[], strukturo: string[], traduko: string[]): void {
        this._konstruiFrazon(gawekiif, strukturo, traduko, VortPozicio.SUBJEKTO, true);
    }

    private _konstruiFrazon(
        gawekiif: string[],
        strukturo: string[],
        traduko: string[],
        position: VortPozicioTipo,
        requireModifierAfterKal: boolean
    ): void {
        const vortoj = this.components.vortoj.filter(w => w.pozicio === position);
        if (vortoj.length === 0) return;

        let intensifierApplied = false;
        let pendingModifiers: FrazVortEniro[] = [];
        let expectModifierAfterKal = false;

        for (const entry of vortoj) {
            const isModifier = entry.cxuAdjektivo;

            if (expectModifierAfterKal && !isModifier) {
                expectModifierAfterKal = false;
                continue;
            }

            if (isModifier) {
                pendingModifiers.push(entry);
                expectModifierAfterKal = false;
            } else {
                for (const modEntry of pendingModifiers) {
                    const result = this._elmetiModifilanEniron(modEntry, gawekiif, strukturo, traduko, intensifierApplied);
                    intensifierApplied = result.intensifierApplied;
                }
                pendingModifiers = [];

                if (entry.temaMarkilo) {
                    const markerTrans = entry.temaMarkilo === QU ? "THIS/TOPIC" : "THAT/FOCUS";
                    this._aldoniVorton(gawekiif, strukturo, traduko, entry.temaMarkilo, "TOPIC", markerTrans);
                }

                if (entry.havasKalAntaŭe && gawekiif.length > 0) {
                    this._aldoniVorton(gawekiif, strukturo, traduko, KAL, "KAL", "KAL");
                    expectModifierAfterKal = requireModifierAfterKal;
                }

                this._aldoniVorton(gawekiif, strukturo, traduko, entry.vorto.gawekiif,
                    this._akiriPozicianEtikedon(entry.vorto, false), entry.vorto.traduko);
            }
        }

        for (const modEntry of pendingModifiers) {
            this._elmetiModifilanEniron(modEntry, gawekiif, strukturo, traduko, intensifierApplied);
        }
    }

    private _elmetiModifilanEniron(
        modEntry: FrazVortEniro,
        gawekiif: string[],
        strukturo: string[],
        traduko: string[],
        intensifierApplied: boolean
    ): { gaw: string; struct: string; tradukoText: string; intensifierApplied: boolean } {
        if (modEntry.cxuAdjektivo) {
            return this._elmetiAdjektivanEniron(modEntry, gawekiif, strukturo, traduko, intensifierApplied);
        }
        this._aldoniVorton(gawekiif, strukturo, traduko, modEntry.vorto.gawekiif,
            this._akiriPozicianEtikedon(modEntry.vorto, false), modEntry.vorto.traduko);
        return { gaw: modEntry.vorto.gawekiif, struct: "MOD", tradukoText: modEntry.vorto.traduko, intensifierApplied };
    }

    private _akiriPozicianEtikedon(vorto: VortEniro, isAdjective: boolean): string {
        if (isAdjective) return "ADJ";
        if (!vorto || !vorto.poŝo) return "N";
        return POS_AL_ETIKEDO[vorto.poŝo] || "N";
    }

    private _aplikiLimonAlStrukturo(strukturo: string[]): void {
        if (strukturo.length === 0) return;
        const lastIdx = strukturo.length - 1;
        const label = strukturo[lastIdx];
        // ⟨ CEZ and TACE strukturo labels are not in SPECALAJ_MARKILOJ ( which stores
        //    Iikrhia vortos ), but they should skip -AL just like the subject marker ⺓. ⟩
        if ( label === "CEZ" || label === "TACE" || this._cxuSpecialaMarkilo(label) ) {
            return;
        }
        strukturo[lastIdx] += "-AL";
    }
}


// ⟪ Modulaj Frazgeneriloj 🏗️ ⟫

// ⟪ Helpaj Funkcioj por Oftaj Ŝablonoj 🔧 ⟫

/**
 * Generic helper for "maybe" pattern - applies a modifier with 50% probability.
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
    * @param modifierFn ( Function , required ) - Function that applies the modifier.
    * @param saltuSeVerbaAfikso ( boolean = false , optional ) - Skip if verb already has modaleco/afikso.
 * @returns FrazKonstruilo
 */
function ebleAplikiModifilon(
    builder: FrazKonstruilo,
    modifierFn: (b: FrazKonstruilo) => FrazKonstruilo,
    saltuSeVerbaAfikso: boolean = false
): FrazKonstruilo {
    if (Math.random() > 1 / 2) return builder;
    if (saltuSeVerbaAfikso && builder.components.verboModifiloj.afikso) return builder;
    return modifierFn(builder);
}

interface VNModifiloOpcioj {
    applyToObject?: boolean;
    applyToSubject?: boolean;
    addVerbAffix?: boolean;
    addModality?: boolean;
    aldoniIntensigilon?: boolean;
    addVerbAdjectives?: boolean;
    addNounAdjectives?: boolean;
}

/**
 * VN modifier function - adds V+N sequence as a modifier before a head noun.
 * V N works like an adjective - it modifies the following noun.
 * VN is V and N - each can have their own modifiers (adjectives, afiksoj, modaleco, intensifier).
 * Structure. (Adj V) (Adj N) N for subject/object with VN modifier.
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
    * @param opcioj ( VNModifiloOpcioj = {} , optional ) - Optional configuration.
 * @returns FrazKonstruilo
 */
function aplikiVNModifilonUnue(builder: FrazKonstruilo, opcioj: VNModifiloOpcioj = {}): FrazKonstruilo {
    const {
        applyToObject = true,
        applyToSubject = true,
        addVerbAffix = false,
        addModality = false,
        aldoniIntensigilon = false,
        addVerbAdjectives = false,
        addNounAdjectives = false
    } = opcioj;

    const modifierOptions = { addVerbAffix, addModality, aldoniIntensigilon, addVerbAdjectives, addNounAdjectives };

    if (applyToObject) {
        _aldoniVNModifilon(builder, VortPozicio.OBJEKTO, modifierOptions);
    }

    if (applyToSubject) {
        _aldoniVNModifilon(builder, VortPozicio.SUBJEKTO, modifierOptions);
    }

    return builder;
}

/**
 * Add a VN modifier sequence to a position.
 * VN is V and N - each can have their own modifiers (adjectives, afiksoj, modaleco).
 * VN acts as a modifier and comes BEFORE the head noun it modifies.
 * Structure. (Adj) V (Adj) N - where the entire VN sequence modifies the following head noun.
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
    * @param pozicio ( VortPozicioTipo , required ) - VortPozicio to add to.
    * @param opcioj ( VNModifiloOpcioj , required ) - Modifier opcioj.
 */
function _aldoniVNModifilon(builder: FrazKonstruilo, pozicio: VortPozicioTipo, opcioj: VNModifiloOpcioj): void {
    const {
        addVerbAffix = false,
        addModality = false,
        aldoniIntensigilon = false,
        addVerbAdjectives = false,
        addNounAdjectives = false
    } = opcioj;

    const vnVerb = akiriVortonPerPoŝo("Verb");
    const vnNoun = akiriVortonPerPoŝo("Noun");
    if (!vnVerb || !vnNoun) return;

    const modifiedVerb = aplikiVerbModifilojn(vnVerb, {
        hazardaAfikso: addVerbAffix,
        hazardaModaleco: addModality,
        aldoniIntensigilon
    });

    builder.components.vortoj.unshift({
        vorto: vnNoun, pozicio, cxuAdjektivo: false, havasKalAntaŭe: false, temaMarkilo: null
    });

    if (addNounAdjectives) {
        const nounAdjCount = Math.floor(Math.random() * 2);
        for (let i = 0; i < nounAdjCount; i++) {
            const adj = kreiAdjektivon("Noun");
            if (adj) {
                builder.components.vortoj.unshift({
                    vorto: adj, pozicio, cxuAdjektivo: true, havasKalAntaŭe: false, temaMarkilo: null
                });
            }
        }
    }

    builder.components.vortoj.unshift({
        vorto: modifiedVerb, pozicio, cxuAdjektivo: false, havasKalAntaŭe: false, temaMarkilo: null
    });

    if (addVerbAdjectives) {
        const verbAdjCount = Math.floor(Math.random() * 2);
        for (let i = 0; i < verbAdjCount; i++) {
            const adj = kreiAdjektivon("Noun");
            if (adj) {
                builder.components.vortoj.unshift({
                    vorto: adj, pozicio, cxuAdjektivo: true, havasKalAntaŭe: false, temaMarkilo: null
                });
            }
        }
    }

}

interface BazajFrazKomponantoj {
    verbo: VortEniro;
    obj: VortEniro;
    subj: VortEniro;
}

/**
 * Get base sentence components (V, O, S).
 * @returns BazajFrazKomponantoj | null
 */
function akiriBazajnFrazKomponantojn(): BazajFrazKomponantoj | null {
    const verbo = akiriVortonPerPoŝo("Verb");
    const obj = akiriVortonPerPoŝo("Noun");
    const subj = akiriVortonPerPoŝo("Noun");
    if (!verbo || !obj || !subj) {
        return null;
    }
    return { verbo, obj, subj };
}

/**
 * Optionally add temporal frame.
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
 * @returns FrazKonstruilo
 */
function ebleAldoniTemporalon(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        const tempaVorto = akiriVortonPerPoŝo("Noun");
        if (tempaVorto) {
            const temporalGawekiif = aplikiAfikson(tempaVorto.gawekiif, "STIF");
            b.agordiTemporalon({ gawekiif: temporalGawekiif, traduko: tempaVorto.traduko, poŝo: tempaVorto.poŝo });
        }
        return b;
    });
}

interface AdjektivoOpcioj {
    useAdjectivizer?: boolean;
    skipRandom?: boolean;
}

/**
 * Add random adjectives to any positions with random counts.
 * Each position (verb, object, subject) can get 0-2 adjectives randomly.
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
    * @param base ( BazajFrazKomponantoj , required ) - Base components (verb, obj, subj).
    * @param opcioj ( AdjektivoOpcioj = {} , optional ) - Optional configuration.
 * @returns FrazKonstruilo
 */
function aplikiAdjektivojn(builder: FrazKonstruilo, base: BazajFrazKomponantoj, opcioj: AdjektivoOpcioj = {}): FrazKonstruilo {
    const { useAdjectivizer = false, skipRandom = false } = opcioj;

    if (!skipRandom && Math.random() > 1 / 2) {
        return builder;
    }

    const positions: VortPozicioTipo[] = [VortPozicio.VERBO, VortPozicio.OBJEKTO, VortPozicio.SUBJEKTO];

    for (const pos of positions) {
        const adjCount = Math.floor(Math.random() * 3);

        for (let i = 0; i < adjCount; i++) {
            let adj: VortEniro | null = null;

            if (useAdjectivizer) {
                adj = kreiAdjektivon("Noun");
            } else {
                adj = akiriVortonPerPoŝo("Adjective");
                if (!adj) {
                    adj = kreiAdjektivon("Noun");
                }
            }

            if (adj) {
                builder.aldoniAdjektivojn([adj], pos);
            }
        }
    }

    return builder;
}

interface EvidencialoOpcioj {
    addVpEvidential?: boolean;
    addSentenceEvidential?: boolean;
    evidential?: VortEniro | null;
}

/**
 * Unified evidential function - applies evidential to VP or sentence scope.
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
    * @param opcioj ( EvidencialoOpcioj = {} , optional ) - Optional configuration.
 * @returns FrazKonstruilo
 */
function aplikiEvidencialonUnue(builder: FrazKonstruilo, opcioj: EvidencialoOpcioj = {}): FrazKonstruilo {
    const {
        addVpEvidential = true,
        addSentenceEvidential = false,
        evidential = null
    } = opcioj;

    const ev = evidential || akiriVortonPerPoŝo("Evidential");
    if (!ev) return builder;

    if (addVpEvidential) {
        builder.agordiEvidencialoVp(ev);
    }

    if (addSentenceEvidential) {
        builder.agordiEvidencialoFrazon(ev);
    }

    return builder;
}

/**
 * Optionally add unified evidential to VP or sentence scope.
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
 * @returns FrazKonstruilo
 */
function ebleAldoniEvidencialonUnue(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        const useVp = Math.random() < 1 / 2;
        return aplikiEvidencialonUnue(b, {
            addVpEvidential: useVp,
            addSentenceEvidential: !useVp
        });
    });
}

/**
 * Optionally add modaleco (can/should with optional negation).
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
 * @returns FrazKonstruilo
 */
function ebleAldoniModalecojn(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        const modalities: [string, boolean][] = [
            ["can", false],
            ["can", true],
            ["should", false],
            ["should", true]
        ];
        const [modaleco, negata] = modalities[Math.floor(Math.random() * modalities.length)];
        b.agordiVerbon(b.components.verbo!, null, modaleco, negata);
        return b;
    });
}

/**
 * Optionally add negation (KON-).
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
 * @returns FrazKonstruilo
 */
function ebleAldoniNegacion(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        if (b.components.verboModifiloj.modaleco) return b;
        b.agordiVerbon(b.components.verbo!, "KON");
        return b;
    });
}

interface IntensigiloOpcioj {
    onVerb?: boolean;
}

/**
 * Optionally add intensifier to object adjective or verb.
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
    * @param opcioj ( IntensigiloOpcioj = {} , optional ) - Optional configuration.
 * @returns FrazKonstruilo
 */
function ebleAldoniIntensigilon(builder: FrazKonstruilo, opcioj: IntensigiloOpcioj = {}): FrazKonstruilo {
    const { onVerb = false } = opcioj;

    if (onVerb) {
        return ebleAplikiModifilon(builder, (b) => {
            b.agordiIntensigilon(null, true);
            return b;
        });
    }

    const hasObjectAdj = builder.components.vortoj.some(w =>
        w.pozicio === VortPozicio.OBJEKTO && w.cxuAdjektivo
    );
    if (!hasObjectAdj) return builder;

    return ebleAplikiModifilon(builder, (b) => {
        b.agordiIntensigilon(b.components.intensigilo.celataAdjektivo || null, false);
        return b;
    });
}

interface VerbaAfiksoOpcioj {
    afiksoTipo?: string;
    saltuSeVerboModifita?: boolean;
}

/**
 * Unified verb afikso function - applies verb afiksoj (passive, inchoative, etc.).
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
    * @param opcioj ( VerbaAfiksoOpcioj = {} , optional ) - Optional configuration.
 * @returns FrazKonstruilo
 */
function aplikiVerbanAfiksonUnue(builder: FrazKonstruilo, opcioj: VerbaAfiksoOpcioj = {}): FrazKonstruilo {
    const {
        afiksoTipo = "L6R",
        saltuSeVerboModifita = true
    } = opcioj;

    if (saltuSeVerboModifita && builder.components.verboModifiloj.afikso) {
        return builder;
    }

    builder.agordiVerbon(builder.components.verbo!, afiksoTipo, builder.components.verboModifiloj.modaleco, builder.components.verboModifiloj.negata);
    return builder;
}

/**
 * Optionally add unified verb afikso (passive, inchoative, etc.).
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
    * @param afiksoTipo ( string | null = null , optional ) - Affix type.
 * @returns FrazKonstruilo
 */
function ebleAldoniVerbanAfiksonUnue(builder: FrazKonstruilo, afiksoTipo: string | null = null): FrazKonstruilo {
    if (!afiksoTipo) {
        const afiksoj = ["L6R", "B6N"];
        afiksoTipo = afiksoj[Math.floor(Math.random() * afiksoj.length)];
    }
    return ebleAplikiModifilon(builder, (b) => {
        return aplikiVerbanAfiksonUnue(b, { afiksoTipo });
    }, true);
}

interface KoordinatajElementojOpcioj {
    coordinateObjects?: boolean;
    coordinateSubjects?: boolean;
    object2?: VortEniro | null;
    subject2?: VortEniro | null;
}

/**
 * Coordinated elements function - adds coordinated objects and subjects.
 * For objects. N KAL N (simple coordination allowed)
 * For subjects. N KAL (modifier) N - after KAL, must have adjective or V N modifier
 * Structure. V O₁ KAL O₂ ⺓ S₁ KAL (Adj/V N) S₂
    * @param builder ( FrazKonstruilo , required ) - Builder to modify.
    * @param opcioj ( KoordinatajElementojOpcioj = {} , optional ) - Optional configuration.
 * @returns FrazKonstruilo
 */
function aplikiKoordinatajnElementojnUnue(builder: FrazKonstruilo, opcioj: KoordinatajElementojOpcioj = {}): FrazKonstruilo {
    const {
        coordinateObjects = true,
        coordinateSubjects = true,
        object2 = null,
        subject2 = null
    } = opcioj;

    if (coordinateObjects) {
        const obj2 = object2 || akiriVortonPerPoŝo("Noun");
        if (obj2) {
            builder.aldoniKoordinatanVorton(obj2, VortPozicio.OBJEKTO, true);
        }
    }

    if (coordinateSubjects) {
        const subj2 = subject2 || akiriVortonPerPoŝo("Noun");
        if (subj2) {
            const adj = akiriVortonPerPoŝo("Adjective") || kreiAdjektivon("Noun");
            if (adj) {
                builder.aldoniAdjektivojn([adj], VortPozicio.SUBJEKTO);
            }
            builder.aldoniKoordinatanVorton(subj2, VortPozicio.SUBJEKTO, true);
        }
    }

    return builder;
}

/**
 * Optionally add unified coordinated elements to both objects and subjects.
    * @param builder - Builder to modify.
 * @returns Modified builder.
 */
function ebleAldoniKoordinatajnElementojnUnue(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        return aplikiKoordinatajnElementojnUnue(b, {
            coordinateObjects: true,
            coordinateSubjects: true
        });
    });
}

/**
 * Optionally add unified VN modifier to both object and subject.
 * VN components (V and N) can each have their own modifiers.
    * @param builder - Builder to modify.
 * @returns Modified builder.
 */
function ebleAldoniUnuecanVNModifilon(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        const addVerbAffix = Math.random() > 1 / 2;
        const addModality = Math.random() > 1 / 2;
        const aldoniIntensigilon = Math.random() > 1 / 2;
        const addVerbAdjectives = Math.random() > 1 / 2;
        const addNounAdjectives = Math.random() > 1 / 2;

        return aplikiVNModifilonUnue(b, {
            applyToObject: true,
            applyToSubject: true,
            addVerbAffix,
            addModality,
            aldoniIntensigilon,
            addVerbAdjectives,
            addNounAdjectives
        });
    });
}

/**
 * Optionally add topic markers (QU/MU) to object and/or subject nouns.
 * Topic markers appear before the noun they modify.
 * QU = THIS/TOPIC (marks the topic of discussion)
 * MU = THAT/FOCUS (marks focused/contrastive information)
    * @param builder - Builder to modify.
 * @returns Modified builder.
 */
function ebleAldoniTemajnMarkilojn(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        const vortoj = b.components.vortoj;

        for (const entry of vortoj) {
            if (!entry.cxuAdjektivo && !entry.havasKalAntaŭe) {
                if (Math.random() > 1 / 2) {
                    entry.temaMarkilo = Math.random() > 1 / 2 ? QU : MU;
                }
            }
        }

        return b;
    });
}

interface EbligitajModifiloj {
    temporal?: boolean;
    adjectives?: boolean;
    adjectivizer?: boolean;
    modaleco?: boolean;
    negation?: boolean;
    verbAffix?: boolean;
    intensifier?: boolean;
    coordinated?: boolean;
    vnModifier?: boolean;
    question?: boolean;
    evidential?: boolean;
    temaMarkilo?: boolean;
}

/**
 * Optionally convert to question.
    * @param builder - Builder to modify.
    * @param ebligitajModifiloj - Which modifiers are enabled.
 * @returns Modified builder.
 */
function ebleAldoniDemandon(builder: FrazKonstruilo, ebligitajModifiloj: EbligitajModifiloj): FrazKonstruilo {
    if (!ebligitajModifiloj.question) return builder;
    return ebleAplikiModifilon(builder, (b) => {
        const cxuJesNe = Math.random() < 1 / 2;
        b.agordiDemandon(cxuJesNe);
        return b;
    });
}

interface FrazaRezulto {
    gawekiif: string;
    traduko: string;
    strukturo: string;
    components: FrazKomponantoj;
}

/**
 * Main sentence generator - builds sentence with random optional modifiers.
 * Uses unified vorto system - all vortos added via builder.aldoniVorton().
    * @param strukturo - Specific strukturo (unused in modular system).
    * @param ebligitajModifiloj - Which modifiers are enabled.
 * @returns Sentence data or null.
 */
function generiFrazon(strukturo: string | null = null, ebligitajModifiloj: EbligitajModifiloj = {}): FrazaRezulto | null {
    if (strukturo) {
        const result = registraro.generi(strukturo);
        if (result && typeof result === "object" && "gawekiif" in result) {
            return result as FrazaRezulto;
        }
    }

    const base = akiriBazajnFrazKomponantojn();
    if (!base) {
        return null;
    }

    let builder = new FrazKonstruilo()
        .agordiStrukturnomon("modular")
        .agordiVerbon(base.verbo)
        .aldoniVorton(base.obj, VortPozicio.OBJEKTO)
        .aldoniVorton(base.subj, VortPozicio.SUBJEKTO);

    if (ebligitajModifiloj.temporal !== false) builder = ebleAldoniTemporalon(builder);
    if (ebligitajModifiloj.evidential !== false) builder = ebleAldoniEvidencialonUnue(builder);
    if (ebligitajModifiloj.modaleco !== false) builder = ebleAldoniModalecojn(builder);
    if (ebligitajModifiloj.negation !== false) builder = ebleAldoniNegacion(builder);
    if (ebligitajModifiloj.verbAffix !== false) builder = ebleAldoniVerbanAfiksonUnue(builder);
    if (ebligitajModifiloj.adjectivizer) {
        if (Math.random() > 1 / 2) {
            builder = aplikiAdjektivojn(builder, base, { useAdjectivizer: true, skipRandom: true });
        }
    } else if (ebligitajModifiloj.adjectives !== false) {
        builder = aplikiAdjektivojn(builder, base, { useAdjectivizer: false, skipRandom: false });
    }

    if (ebligitajModifiloj.intensifier !== false) {
        const onVerb = Math.random() < 1 / 2;
        builder = ebleAldoniIntensigilon(builder, { onVerb });
    }
    if (ebligitajModifiloj.vnModifier !== false) builder = ebleAldoniUnuecanVNModifilon(builder);
    if (ebligitajModifiloj.coordinated !== false) builder = ebleAldoniKoordinatajnElementojnUnue(builder);
    if (ebligitajModifiloj.temaMarkilo !== false) builder = ebleAldoniTemajnMarkilojn(builder);
    if (ebligitajModifiloj.question !== false) builder = ebleAldoniDemandon(builder, ebligitajModifiloj);

    return builder.konstrui();
}


// ⟪ UI Initialization 🖥️ ⟫

/**
 * Initialize the sentence generator UI.
 * Sets up button click handlers and populates strukturo dropdown.
 */
function iniciiFrazGeneratoranUI(): void {
    const generiButono = document.getElementById("kf2Ox2pewaCa12na");
    const haxeSarox2pewa = document.getElementById("haxeSarox2pewa");
    const knox2pewaSwesukw2q = document.getElementById("knox2pewaSwesukw2q");
    const eligoUjo = document.getElementById("maxemaSa10Ox2");
    const strukturaElemento = document.getElementById("tlakakuKnox2pewa");
    const gawekiifElemento = document.getElementById("tlakakuOx2pewa");
    const tradukaElemento = document.getElementById("tlakakuSkakefani");
    const eraraUjo = document.getElementById("tlohk2ni");
    const eraraP = eraraUjo?.querySelector("p") || null;

    let vortaroŜargita = false;
    let elektitaStrukturo = "";
    const ebligitajModifiloj: EbligitajModifiloj = {
        temporal: true,
        adjectives: true,
        adjectivizer: true,
        modaleco: true,
        negation: true,
        verbAffix: true,
        intensifier: true,
        coordinated: true,
        vnModifier: true,
        question: true,
        evidential: true,
        temaMarkilo: true
    };

    interface ModifierInfo {
        id: keyof EbligitajModifiloj;
        name: string;
    }

    const MODIFILOJ: ModifierInfo[] = [
        { id: "temporal", name: "Temporal (T)" },
        { id: "adjectives", name: "Adjectives (Adj)" },
        { id: "adjectivizer", name: "Adjectivizer (2R/K2R/...)" },
        { id: "modaleco", name: "Modality (can/should)" },
        { id: "negation", name: "Negation (KON-)" },
        { id: "verbAffix", name: "Verb Affix (L6R/B6N)" },
        { id: "intensifier", name: "Intensifier (-KOZ)" },
        { id: "coordinated", name: "Coordinated (KAL)" },
        { id: "vnModifier", name: "VN Modifiers" },
        { id: "question", name: "Questions" },
        { id: "evidential", name: "Evidentials" },
        { id: "temaMarkilo", name: "Topic Markers (QU/MU)" }
    ];

    function montriEraron(message: string): void {
        if (eraraP) eraraP.textContent = message;
        if (eraraUjo) eraraUjo.style.display = "block";
        if (eligoUjo) eligoUjo.style.display = "none";
    }

    function montriEligon(): void {
        if (eraraUjo) eraraUjo.style.display = "none";
        if (eligoUjo) eligoUjo.style.display = "block";
    }

    function plenigiStrukturojn(): void {
        if (!knox2pewaSwesukw2q) return;
        const strukturos = registraro.akiriStrukturojn();

        knox2pewaSwesukw2q.innerHTML = "";

        const anyLabel = document.createElement("label");
        const anyRadio = document.createElement("input");
        anyRadio.type = "radio";
        anyRadio.name = "strukturo";
        anyRadio.value = "";
        anyRadio.checked = true;
        anyRadio.addEventListener("change", () => {
            elektitaStrukturo = "";
            if (haxeSarox2pewa) haxeSarox2pewa.textContent = "ꞁȷ̀ꞇ j͐ʃᴜƽ";
        });
        anyLabel.appendChild(anyRadio);
        anyLabel.appendChild(document.createTextNode(" ꞁȷ̀ꞇ j͐ʃᴜƽ"));
        knox2pewaSwesukw2q.appendChild(anyLabel);

        strukturos.forEach(struct => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "strukturo";
            radio.value = struct;
            radio.addEventListener("change", () => {
                elektitaStrukturo = struct;
                if (haxeSarox2pewa) haxeSarox2pewa.textContent = struct;
            });
            label.appendChild(radio);
            label.appendChild(document.createTextNode(" " + struct));
            knox2pewaSwesukw2q.appendChild(label);
        });
    }

    function plenigiModifilojn(): void {
        const container = document.getElementById("modifierCheckboxes");
        if (!container) return;

        container.innerHTML = "";

        MODIFILOJ.forEach(mod => {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = ebligitajModifiloj[mod.id] ?? true;
            checkbox.addEventListener("change", () => {
                ebligitajModifiloj[mod.id] = checkbox.checked;
            });
            label.appendChild(document.createTextNode(" " + mod.name));
            label.appendChild(checkbox);
            container.appendChild(label);
        });
    }

    async function generiFrazonHandler(): Promise<void> {
        if (!vortaroŜargita) {
            montriEraron("ſ͕ȷɜ ſ͕ɭwȝ ſɭɔʞ ⟅");
            return;
        }

        if (generiButono) (generiButono as HTMLButtonElement).disabled = true;
        montriEligon();

        try {
            const sentence = generiFrazon(elektitaStrukturo || null, ebligitajModifiloj);

            if (!sentence) {
                montriEraron("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Failed to generi sentence. Dictionary may be empty.");
            } else {
                if (strukturaElemento) strukturaElemento.textContent = sentence.strukturo;
                if (gawekiifElemento) {
                    gawekiifElemento.textContent = sentence.gawekiif;
                    window.vacepu("ox2pewa");
                }
                if (tradukaElemento) tradukaElemento.textContent = sentence.traduko;
                montriEligon();
            }
        } catch (e) {
            montriEraron(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${(e as Error).message}`);
        } finally {
            if (generiButono) (generiButono as HTMLButtonElement).disabled = false;
        }
    }

    async function inicii(): Promise<void> {
        if (generiButono) (generiButono as HTMLButtonElement).disabled = true;
        if (eraraUjo) eraraUjo.style.display = "none";
        plenigiStrukturojn();
        plenigiModifilojn();

        try {
            const vortoj = await sxargiVortaronKunFalreto();

            if (vortoj.length > 0) {
                vortaroŜargita = true;
                if (generiButono) (generiButono as HTMLButtonElement).disabled = false;
                console.log("Dictionary loaded successfully. Ready to generi sentences.");
            } else {
                montriEraron("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Could not load dictionary.");
                if (generiButono) {
                    (generiButono as HTMLButtonElement).disabled = false;
                    generiButono.addEventListener("click", () => {
                        inicii();
                    }, { once: true });
                }
            }
        } catch (e) {
            montriEraron(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${(e as Error).message}`);
            if (generiButono) (generiButono as HTMLButtonElement).disabled = false;
        }
    }

    if (generiButono) {
        generiButono.addEventListener("click", generiFrazonHandler);
    }
    inicii();
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciiFrazGeneratoranUI);
    } else {
        iniciiFrazGeneratoranUI();
    }
}


// ⟪ Exports 📤 ⟫

export {
    registraro,
    FrazKonstruilo,
    FrazKomponantoj,
    VortPozicio,
    akiriBazajnFrazKomponantojn,
    generiFrazon,
    iniciiFrazGeneratoranUI,
    sxargiVortaron,
    sxargiVortaronKunFalreto,
    aplikiAfikson,
    aplikiVerbModifilojn,
    cxuVokalaKomenco,
    cxuVokalaFino,
    cxuEnhavasIikrhianSkribon,
    determiniPoŝon,
    cxuAdjektivaAfikso,
    cxuAdjektivaPrefikso,
    akiriL6RUzon,
    cxuVerbo,
    akiriKonfliktantanPrefikson,
    akiriHazardanAdjektivanPrefikson,
    aplikiAdjektivanPrefikson,
    kreiAdjektivon,
    aplikiAdjektivojn,
    aplikiVNModifilonUnue,
    ebleAldoniUnuecanVNModifilon,
    ebleAldoniTemajnMarkilojn,
    PREFIKSAJ_AFIKSOJ,
    SUFIKSAJ_AFIKSOJ,
    ADJEKTIVIGAJ_PREFIKSOJ,
    MODALECAJ_PREFIKSOJ,
    GENERALAJ_NEGACIAJ_PREFIKSOJ,
    DERIVACIAJ_PREFIKSOJ,
    ALL_ADJEKTIVIGAJ_PREFIKSOJ,
    MODALECAJ_PAROJ,
    AFIKSAJ_TRADUKOJ,
    POS_AL_ETIKEDO,
    SPECALAJ_MARKILOJ,
    IIKRHIAJ_VOKALOJ,
    KODOJ,
    SUBJEKTA_MARKILO,
    DEMANDA_JEJNE,
    DEMANDA_ENHAVA,
    KAL,
    QU,
    MU,
    VORTO_DISIGILO,
    FRAZA_FERMILO
};
export type { VortEniro, ModifitaVortEniro, VerbModifiloOpcioj, VNModifiloOpcioj, EbligitajModifiloj, FrazaRezulto };
