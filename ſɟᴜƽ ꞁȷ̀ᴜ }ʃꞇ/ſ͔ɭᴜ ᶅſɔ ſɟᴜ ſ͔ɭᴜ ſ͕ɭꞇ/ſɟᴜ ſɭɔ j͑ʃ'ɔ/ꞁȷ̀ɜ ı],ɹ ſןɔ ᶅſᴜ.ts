import * as XLSX from "xlsx";

// ≺⧼ Iikrhia Random Sentence Generator 🌐 ⧽≻
/**
 * Generates random sentences following the Iikrhia language grammar
 * - Strict VOS ( Verb-Object-Subject ) word order
 * - Proper use of affixes, particles, and markers
 * - Uses the cafalkefu dictionary for word lookup
 *
 * Sentence Template - ( Time ) V ( Evi ) O ( ⺓ ( Evi ) ( Adj ) S )
 */

// ⟪ Constants 📦 ⟫

const SUBJECT_MARKER = "⺓";
const INTERROGATIVE_YESNO = "ſɟɔƴ";
const INTERROGATIVE_CONTENT = "ɭʃᴜ ſɟɔ";
const KAL = "ſɭᴜͷ̗";
const QU = "ſ͕ɭw";
const MU = "ŋᷠw";
const WORD_SEP = "ʌ";
const SENTENCE_CLOSER = "⟅";

const SPECIAL_MARKERS = [ SUBJECT_MARKER, INTERROGATIVE_YESNO, INTERROGATIVE_CONTENT, KAL, QU, MU ];

const IIKRHIA_VOWELS = "ꞇɹɔᴜwɜэⅎ";
const CODAS = [
    "п́", "ɘ", "ʞ", "ɀ", "c̭", "ƣ̋", "ⰱ", "ƨ", "ԏ͕", "ꝛ̗",
    "ɔ˞", "c̗", "ŋ", "ͷ̗", "ɯ", "ƴ", "ᴎ", "ᴜ̭", "ᶗ‹", "ⱷ̮̀",
    "ɴ", "ƽ", "ᴜ̩", "ȝ"
];

// ⟪ Affixes 🔧 ⟫

const ADJECTIVIZING_PREFIXES: Record<string, [string, string]> = {
    "2R": [ "ꞁȷ̀ɹƣ̋", "ꞁȷ̀ɹ" ],
    "K2R": [ "ſɭɹƣ̋", "ſɭɹ" ],
    "J6R": [ "ɭl̀эƣ̋", "ɭl̀э" ],
    "H2R": [ "֭ſɭɹƣ̋", "֭ſɭɹ" ],
    "SAR": [ "j͑ʃᴜƣ̋", "j͑ʃᴜ" ],
    "SWER": [ "j͑ʃп́ɔƣ̋", "j͑ʃп́ɔ" ],
    "SER": [ "j͑ʃɔƣ̋", "j͑ʃɔ" ],
};

const MODALITY_PREFIXES: Record<string, [string, string]> = {
    "OR": [ "ꞁȷ̀ɜƣ̋", "ꞁȷ̀ɜ" ],
    "YOR": [ "ſ͕ȷɜƣ̋", "ſ͕ȷɜ" ],
    "TAK": [ "ɭʃᴜƽ", "ɭʃᴜ" ],
    "KOTAK": [ "ſɭɜ ɭʃᴜƽ", "ſɭɜ ɭʃᴜ" ]
};

const GENERAL_NEGATION_PREFIXES: Record<string, [string, string]> = {
    "KON": [ "ſɭɜc̗", "ſɭɜ" ],
};

const DERIVATIONAL_PREFIXES: Record<string, [string, string]> = {
    "VER": [ "j͑ʃ'ɔƣ̋", "j͑ʃ'ɔ" ],
    "VES": [ "j͑ʃ'ɔɔ˞", "j͑ʃ'ᴜ" ],
    "B6N": [ "ʃэc̗", "ʃэ" ],
    "L6R": [ "j͐ʃэƣ̋", "j͐ʃэ" ],
};

const PREFIX_AFFIXES: Record<string, [string, string]> = {
    ...ADJECTIVIZING_PREFIXES,
    ...MODALITY_PREFIXES,
    ...GENERAL_NEGATION_PREFIXES,
    ...DERIVATIONAL_PREFIXES
};

const ALL_ADJECTIVIZING_PREFIXES = new Set(Object.keys(ADJECTIVIZING_PREFIXES));

const MODALITY_PAIRS: Record<string, string> = {
    "YOR": "OR",
    "OR": "YOR",
    "KOTAK": "TAK",
    "TAK": "KOTAK"
};

const SUFFIX_AFFIXES: Record<string, [string, string]> = {
    "SU": [ "j͑ʃᴜꞇ", "ꞁȷ̀ᴜꞇ" ],
    "AL": [ "j͐ʃ", "ꞁȷ̀ᴜͷ̗" ],
    "ANI": [ "}ʃꞇ", "ꞁȷ̀ᴜ }ʃꞇ" ],
    "ANU": [ "}ʃw", "ꞁȷ̀ᴜ }ʃw" ],
    "KOZ": [ "ſɭɜƴ", "ꞁȷ̀ɜƴ" ],
    "STIF": [ "j͑ʃƨꞇʞ", "ɭʃꞇʞ" ],
};

// ⟨ Affix Translations 🔤 ⟩

const AFFIX_TRANSLATIONS: Record<string, string> = {
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

const POS_TO_LABEL: Record<string, string> = { Verb: "V", Noun: "N", Adjective: "ADJ", Evidential: "EVI" };


// ⟪ Structure Registry 📚 ⟫

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


// ⟪ Phonology Helpers 🔤 ⟫

/** Check if word is vowel-initial.
 *     @param word ( string , required ) - Word to check.
 * @returns boolean */
function cxuVokalaKomenco(word: string): boolean {
    if ( !word || !word.trim() ) {
        return false;
    }
    const stripped = word.trim();
    if ( stripped.startsWith("ꞁȷ̀") ) {
        return true;
    }
    return IIKRHIA_VOWELS.includes(stripped[0]);
}

/** Check if word ends with a vowel sound.
 *     @param word ( string , required ) - Word to check.
 * @returns boolean */
function cxuVokalaFino(word: string): boolean {
    if ( !word ) {
        return true;
    }
    const stripped = word.trimEnd();
    if ( !stripped ) {
        return true;
    }
    for ( const coda of CODAS ) {
        if ( stripped.endsWith(coda) ) {
            return false;
        }
    }
    return IIKRHIA_VOWELS.includes(stripped[stripped.length - 1]);
}


// ⟪ Verb Modification 🔧 ⟫

interface VortEniro {
    gawekiif: string;
    translation: string;
    pos: string;
    row_index?: number;
    _adjectivizedFrom?: string;
    _adjectivizingPrefix?: string;
}

interface ModifitaVortEniro extends VortEniro {
    _appliedPrefix?: string | null;
    _appliedSuffix?: string | null;
    _appliedModality?: string | null;
    _modalityNegated?: boolean;
    _intensifier?: boolean;
}

interface VerbModifiloOpcioj {
    affix?: string | null;
    modality?: string | null;
    modalityNegated?: boolean;
    addIntensifier?: boolean;
    randomAffix?: boolean;
    randomModality?: boolean;
    existingPrefix?: string | null;
}

/**
 * Apply modifiers to a verb (affix, modality, intensifier).
 * Unified function for both main verbs and VN modifier verbs.
 * Negative prefixes (YOR, KOTAK) cannot co-occur with their positive counterparts (OR, TAK).
    * @param verb - Verb entry with gawekiif and translation.
    * @param options - Modifier options.
 * @returns Modified verb entry with gawekiif and translation.
 */
function aplikiVerbModifilojn(verb: VortEniro, options: VerbModifiloOpcioj = {}): ModifitaVortEniro {
    let {
        affix = null,
        modality = null,
        modalityNegated = false,
        addIntensifier = false,
        randomAffix = false,
        randomModality = false,
        existingPrefix = null
    } = options;

    let verbForm = verb.gawekiif;
    let verbTranslation = verb.translation;
    let appliedPrefix: string | null = null;
    let appliedSuffix: string | null = null;
    let appliedModality: string | null = null;

    const aplikiModalecanAfikson = (word: string, mod: string, negated: boolean): string => {
        const affixMap: Record<string, string> = { "can": negated ? "YOR" : "OR", "should": negated ? "KOTAK" : "TAK" };
        const affixKey = affixMap[mod];
        return affixKey ? aplikiAfikson(word, affixKey) : word;
    };

    if (modality) {
        const modalityPrefix = modalityNegated ? "YOR" : "OR";
        if (existingPrefix && akiriKonfliktantanPrefikson(modalityPrefix) === existingPrefix) {
            modality = null;
            modalityNegated = false;
        } else {
            verbForm = aplikiModalecanAfikson(verbForm, modality, modalityNegated);
            appliedModality = modality;
            appliedPrefix = modalityPrefix;
        }
    }

    if (!appliedModality && randomModality) {
        const modalities: [string, boolean][] = [["can", false], ["should", false]];
        const [selectedModality, negated] = modalities[Math.floor(Math.random() * modalities.length)];
        const selectedPrefix = negated ? "YOR" : "OR";
        if (existingPrefix && akiriKonfliktantanPrefikson(selectedPrefix) === existingPrefix) {
        } else {
            verbForm = aplikiModalecanAfikson(verbForm, selectedModality, negated);
            appliedModality = selectedModality;
            appliedPrefix = selectedPrefix;
        }
    }

    if (affix) {
        verbForm = aplikiAfikson(verbForm, affix);
        if (PREFIX_AFFIXES[affix]) {
            appliedPrefix = affix;
        } else if (SUFFIX_AFFIXES[affix]) {
            appliedSuffix = affix;
        }
    } else if (randomAffix) {
        const affixes = ["L6R", "B6N"];
        const selectedAffix = affixes[Math.floor(Math.random() * affixes.length)];
        verbForm = aplikiAfikson(verbForm, selectedAffix);
        appliedPrefix = selectedAffix;
    }

    if (addIntensifier) {
        verbForm = aplikiAfikson(verbForm, "KOZ");
        appliedSuffix = "KOZ";
    }

    return {
        ...verb,
        gawekiif: verbForm,
        translation: verbTranslation,
        _appliedPrefix: appliedPrefix,
        _appliedSuffix: appliedSuffix,
        _appliedModality: appliedModality,
        _modalityNegated: modalityNegated,
        _intensifier: addIntensifier
    };
}


// ⟪ Affix Application 🔧 ⟫

/**
 * Apply affix based on phonological rules.
 * Automatically determines if prefix or suffix based on affix type.
 * Selects vowel or consonant form based on word boundary.
    * @param word - Word to apply affix to.
    * @param affixType - Type of affix (e.g., "OR", "KON", "SU", "AL").
 * @returns Word with affix applied.
 */
function aplikiAfikson(word: string, affixType: string): string {
    if ( !word ) return word;

    if ( PREFIX_AFFIXES[affixType] ) {
        const [vowelForm, consonantForm] = PREFIX_AFFIXES[affixType];
        const form = cxuVokalaKomenco(word) ? vowelForm : consonantForm;
        return `${form} ${word}`;
    }

    if ( SUFFIX_AFFIXES[affixType] ) {
        const [vowelForm, consonantForm] = SUFFIX_AFFIXES[affixType];
        const form = cxuVokalaFino(word) ? vowelForm : consonantForm;
        return `${word} ${form}`;
    }

    return word;
}

/**
 * Check if affix is adjectivizing (turns word into adjective).
    * @param affixType - Type of affix.
 * @returns True if adjectivizing.
 */
function cxuAdjektivaAfikso(affixType: string): boolean {
    return ALL_ADJECTIVIZING_PREFIXES.has(affixType);
}

/**
 * Check if a word has an adjectivizing prefix.
 * Adjectivizing prefixes turn nouns/verbs into adjectives.
 * L6R only adjectivizes non-verbs (for verbs it's passive voice).
 * Uses akiriL6RUzon() to determine L6R function.
    * @param word - Word to check.
    * @param wordEntry - Optional word entry to check if L6R is passive.
 * @returns True if word has adjectivizing prefix.
 */
function cxuAdjektivaPrefikso(word: string, wordEntry: VortEniro | null = null): boolean {
    if ( !word ) return false;

    for ( const prefix of Object.keys(ADJECTIVIZING_PREFIXES) ) {
        const [vowelForm, consonantForm] = PREFIX_AFFIXES[prefix];
        if ( word.startsWith(vowelForm + " ") || word.startsWith(consonantForm + " ") ) {
            return true;
        }
    }

    const l6rUsage = akiriL6RUzon(word, wordEntry);
    return l6rUsage === "adjectivizer";
}

/**
 * Check if L6R prefix is used as passive (on a verb) or adjectivizer (on non-verb).
    * @param word - Word to check.
    * @param wordEntry - Word entry from dictionary.
 * @returns "passive" if on verb, "adjectivizer" if on non-verb, "none" if no L6R.
 */
function akiriL6RUzon(word: string | null, wordEntry: VortEniro | null): string {
    if ( !word ) return "none";
    const [l6rVowel, l6rConsonant] = PREFIX_AFFIXES["L6R"];
    if ( word.startsWith(l6rVowel + " ") || word.startsWith(l6rConsonant + " ") ) {
        return cxuVerbo(wordEntry) ? "passive" : "adjectivizer";
    }
    return "none";
}

/**
 * Get a random adjectivizing prefix type.
 * Returns one of the adjectivizing prefix keys (2R, K2R, J6R, H2R, SAR, SWER, SER).
 * @returns Random adjectivizing prefix type.
 */
function akiriHazardanAdjektivanPrefikson(): string {
    const prefixes = Object.keys(ADJECTIVIZING_PREFIXES);
    return prefixes[Math.floor(Math.random() * prefixes.length)];
}

/**
 * Apply an adjectivizing prefix to a word, converting it to an adjective.
 * Adjectivizing prefixes turn nouns/verbs into adjectives with relational meanings
 * - 2R. WITH (having the quality of)
 * - K2R. USING (by means of)
 * - J6R. IN (located within)
 * - H2R. WITHOUT (lacking)
 * - SAR. FOR (purpose/benefit)
 * - SWER. ABOUT (concerning)
 * - SER. OF (possession/relation)
    * @param wordEntry - Word entry with gawekiif, translation, and pos.
    * @param prefixType - Specific prefix type, or null for random.
 * @returns New word entry with adjectivized form and updated translation.
 */
function aplikiAdjektivanPrefikson(wordEntry: VortEniro, prefixType: string | null = null): VortEniro {
    if (!wordEntry || !wordEntry.gawekiif) {
        return wordEntry;
    }

    const selectedPrefix = prefixType || akiriHazardanAdjektivanPrefikson();
    const prefixTranslation = AFFIX_TRANSLATIONS[selectedPrefix] || selectedPrefix;

    const adjectivizedForm = aplikiAfikson(wordEntry.gawekiif, selectedPrefix);

    const adjectivalTranslation = `[${prefixTranslation}] - ${wordEntry.translation}`;

    return {
        ...wordEntry,
        gawekiif: adjectivizedForm,
        translation: adjectivalTranslation,
        pos: "Adjective",
        _adjectivizedFrom: wordEntry.pos,
        _adjectivizingPrefix: selectedPrefix
    };
}

/**
 * Create an adjective from a noun or verb using adjectivizing prefixes.
 * If no noun/verb is available, returns null.
    * @param sourcePos - Source part of speech ("Noun" or "Verb").
    * @param prefixType - Specific prefix type, or null for random.
 * @returns Adjectivized word entry, or null if no source word found.
 */
function kreiAdjektivon(sourcePos: "Noun" | "Verb" = "Noun", prefixType: string | null = null): VortEniro | null {
    const sourceWord = getWordByPos(sourcePos);
    if (!sourceWord) {
        return null;
    }
    return aplikiAdjektivanPrefikson(sourceWord, prefixType);
}

/**
 * Check if a word is a verb (for L6R restriction).
    * @param wordEntry - Word entry from dictionary.
 * @returns True if word is a verb.
 */
function cxuVerbo(wordEntry: VortEniro | null): boolean {
    return wordEntry !== null && wordEntry.pos === "Verb";
}

/**
 * Get the conflicting modality prefix for a given prefix.
 * Negative modality prefixes (YOR, KOTAK) cannot co-occur with their positive counterparts (OR, TAK).
    * @param prefixType - The prefix type to check.
 * @returns The conflicting prefix type, or null if none.
 */
function akiriKonfliktantanPrefikson(prefixType: string): string | null {
    return MODALITY_PAIRS[prefixType] || null;
}


// ⟪ Dictionary Loading 📖 ⟫

const XLSX_CVPKSAKA = "ſ͔ɭᴜ ᶅſɔ ꞁȷ̀ɔ ꞁȷ̀ɹ ſɭˬɔ.xlsx";

const DICTIONARY_PATHS = [
    "../../ſ͔ɭᴜ ᶅſɔ/ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ/" + XLSX_CVPKSAKA,
    "../ſ͔ɭᴜ ᶅſɔ/ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ/" + XLSX_CVPKSAKA,
    "./" + XLSX_CVPKSAKA,
];

const IIKRHIA_INITIALS = [
    "ᶅſ", "ſן", "ſȷ", "ʃ", "ŋᷠ", "ɽ͑ʃ'", "j͑ʃ'", "ɭʃ", "ɭ(", "ſᶘ", "j͑ʃ", "}ʃ",
    "ſ̀ȷ", "j͐ʃ", "ſɭˬ", "ſɭ,", "ɭl̀", "ſɟ", "ı],", "ſ͕ȷ", "ſ͔ɭ", "ſɭ", "֭ſɭ", "ſ͕ɭ",
    "ꞁȷ̀",
    "ȏſן", "ȏɭʃ'", "ȏſ̀ȷ", "ȏſɟ", "ȏɭʃ", "ȏŋᷠ", "ȏ}ʃ'", "ȏoͩſ̀ȷ", "ȏſ͕ȷ", "ȏ}ʃ",
];

const IIKRHIA_INTERNALS = [
    "п́", "ɘ", "ʞ", "ɀ", "c̭", "ƣ̋", "ⰱ", "ƨ", "ԏ͕", "ꝛ̗", "ɔ˞", "c̗", "ŋ", "ͷ̗",
    "ɯ", "ƴ", "ᴎ", "ᴜ̭", "ᶗ‹", "ⱷ̮̀", "ɴ", "ƽ", "ᴜ̩", "ȝ",
    "ꞇ", "ɔ", "ᴜ", "ɹ", "ɜ", "э", "ɔⅎ", "ɜⅎ", "эⅎ",
];

const IIKRHIA_PUNCTUATION = ["⟅", "｡", "⸙", "ʌ"];

const _vortaroKaso = new Map<string, VortEniro[]>();

/**
 * Get all Iikrhia script sequences for character detection.
 * @returns Array of all Iikrhia sequences.
 */
function akiriCxiujnIikrhiajnSekvencojn(): string[] {
    return [...IIKRHIA_INITIALS, ...IIKRHIA_INTERNALS, ...IIKRHIA_PUNCTUATION];
}

/**
 * Check if text contains Iikrhia script characters.
    * @param text - Text to check.
 * @returns True if contains Iikrhia script.
 */
function cxuEnhavasIikrhianSkribon(text: string): boolean {
    if (!text) {
        return false;
    }
    return akiriCxiujnIikrhiajnSekvencojn().some(seq => text.includes(seq));
}

/**
 * Select translation parts that don't contain Iikrhia script.
    * @param transParts - List of translation alternatives.
 * @returns First non-Iikrhia translation, or falls back to first available.
 */
function elektiNeIikrhianTradukon(transParts: string[]): string {
    for (const trans of transParts) {
        if (!cxuEnhavasIikrhianSkribon(trans)) {
            return trans;
        }
    }
    return transParts[0] || "";
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
    * @param xlsxPath - Path to the xlsx file.
 * @returns Array of word entries.
 */
async function loadDictionary(xlsxPath: string | null = null): Promise<VortEniro[]> {
    const path = xlsxPath || DICTIONARY_PATHS[0];

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
            // ⟨ Split multi-word cells by "｡" — same as original HTML parser ⟩
            const vortoj = vortoKruda.split("｡").map(p => p.trim()).filter(p => p);
            const tradukoj = tradukoKruda ? tradukoKruda.split("｡").map(p => p.trim()).filter(p => p) : [];
            for ( const unuVorto of vortoj ) {
                const trans = tradukoj.length > 0
                    ? elektiNeIikrhianTradukon(tradukoj)
                    : unuVorto;
                eligo.push({
                    gawekiif: unuVorto,
                    translation: trans,
                    pos: poŝo,
                    row_index: r - 1,
                });
            }
        }
        _vortaroKaso.set(path, eligo);
        console.log("( ſ̀ȷᴜ ſɭɹ ) Loaded " + eligo.length + " words from " + path);
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
 * @returns Array of word entries.
 */
async function loadDictionaryWithFallback(): Promise<VortEniro[]> {
    for ( const path of DICTIONARY_PATHS ) {
        const vortoj = await loadDictionary(path);
        if ( vortoj.length > 0 ) {
            console.log("( ſ̀ȷᴜ ſɭɹ ) Successfully loaded dictionary from " + path);
            return vortoj;
        }
    }
    return [];
}

/**
 * Load dictionary synchronously (if pre-loaded).
 * @returns Array of word entries.
 */
function loadDictionarySync(): VortEniro[] {
    const firstEntry = _vortaroKaso.values().next();
    return firstEntry.value || [];
}

/**
 * Get random word by POS.
    * @param pos - Part of speech tag.
 * @returns Word entry or null.
 */
function getWordByPos(pos: string): VortEniro | null {
    const words = loadDictionarySync().filter(w => w.pos === pos);
    if ( words.length === 0 ) return null;
    return words[Math.floor(Math.random() * words.length)];
}


// ⟪ Sentence Components 🧱 ⟫

/**
 * Word position types in VOS sentence structure.
 */
const VortPozicio = {
    TEMPORAL: "TEMPORAL",
    VERB: "VERB",
    EVIDENTIAL_VP: "EVIDENTIAL_VP",
    OBJECT: "OBJECT",
    SUBJECT_MARKER: "SUBJECT_MARKER",
    EVIDENTIAL_SENTENCE: "EVIDENTIAL_SENTENCE",
    SUBJECT: "SUBJECT"
} as const;

type VortPozicioTipo = typeof VortPozicio[keyof typeof VortPozicio];

interface DemandInformo {
    isQuestion: boolean;
    isYesno: boolean;
}

interface IntensigInformo {
    active: boolean;
    onVerb: boolean;
    targetAdjective?: VortEniro | null;
}

interface FrazVortEniro {
    word: VortEniro;
    position: VortPozicioTipo;
    isAdjective: boolean;
    hasKalBefore: boolean;
    topicMarker: string | null;
}

interface VerbModifiloj {
    affix: string | null;
    modality: string | null;
    negated: boolean;
}

/**
 * Components for building a sentence.
 * Uses unified words array - all words (including adjectives, VN sequences, coordinated elements)
 * are stored as word entries with position and modifier information.
 */
class FrazKomponantoj {
    time: VortEniro | null = null;
    verb: VortEniro | null = null;
    verbModifiers: VerbModifiloj = { affix: null, modality: null, negated: false };
    evidentialVp: VortEniro | null = null;
    evidentialSentence: VortEniro | null = null;
    question: DemandInformo = { isQuestion: false, isYesno: false };
    intensifier: IntensigInformo = { active: false, onVerb: false };
    structureName = "";
    _modifiedVerb?: ModifitaVortEniro;

    words: FrazVortEniro[] = [];
}

/**
 * Helper to get affix translation with fallback to key.
    * @param key - Affix key.
 * @returns Translation or key.
 */
function _akiriAfiksoTradukon(key: string): string | null {
    return AFFIX_TRANSLATIONS[key] || key;
}


// ⟪ Sentence Builder 🔨 ⟫

class FrazKonstruilo {
    components: FrazKomponantoj;

    constructor() {
        this.components = new FrazKomponantoj();
    }

    agordiStrukturnomon(name: string): FrazKonstruilo {
        this.components.structureName = name;
        return this;
    }

    agordiTemporalon(temporal: VortEniro): FrazKonstruilo {
        this.components.time = temporal;
        return this;
    }

    agordiVerbon(verb: VortEniro, affix: string | null = null, modality: string | null = null, negated: boolean = false): FrazKonstruilo {
        this.components.verb = verb;
        this.components.verbModifiers = { affix, modality, negated };
        return this;
    }

    aldoniVorton(word: VortEniro, position: VortPozicioTipo, options: {
        isAdjective?: boolean;
        hasKalBefore?: boolean;
        topicMarker?: string | null;
    } = {}): FrazKonstruilo {
        const {
            isAdjective = false,
            hasKalBefore = false,
            topicMarker = null
        } = options;

        this.components.words.push({
            word,
            position,
            isAdjective,
            hasKalBefore,
            topicMarker
        });
        return this;
    }

    aldoniAdjektivojn(adjectives: VortEniro[], targetPosition: VortPozicioTipo): FrazKonstruilo {
        for (const adj of adjectives) {
            this.components.words.unshift({
                word: adj,
                position: targetPosition,
                isAdjective: true,
                hasKalBefore: false,
                topicMarker: null
            });
        }
        return this;
    }

    aldoniKoordinatanVorton(word: VortEniro, position: VortPozicioTipo, useKal: boolean = true): FrazKonstruilo {
        this.aldoniVorton(word, position, { hasKalBefore: useKal });
        return this;
    }

    agordiEvidencialoVp(evidential: VortEniro): FrazKonstruilo {
        this.components.evidentialVp = evidential;
        return this;
    }

    agordiEvidencialoFrazon(evidential: VortEniro): FrazKonstruilo {
        this.components.evidentialSentence = evidential;
        return this;
    }

    agordiDemandon(isYesno: boolean = true): FrazKonstruilo {
        this.components.question = { isQuestion: true, isYesno };
        return this;
    }

    agordiIntensigilon(adj: VortEniro | null, onVerb: boolean = false): FrazKonstruilo {
        if (onVerb) {
            this.components.intensifier.onVerb = true;
        } else if (adj) {
            this.components.intensifier.targetAdjective = adj;
        }
        this.components.intensifier.active = true;
        return this;
    }

    private _aplikiVerbModifojn(): ModifitaVortEniro {
        const modifiedVerb = aplikiVerbModifilojn(this.components.verb!, {
            affix: this.components.verbModifiers.affix,
            modality: this.components.verbModifiers.modality,
            modalityNegated: this.components.verbModifiers.negated,
            addIntensifier: this.components.intensifier.active && this.components.intensifier.onVerb
        });
        this.components._modifiedVerb = modifiedVerb;
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

    private _cxuSpecialaMarkilo(text: string): boolean {
        return SPECIAL_MARKERS.some(m => text === m || text.endsWith(m));
    }

    private _konstruiVerbanStrukturon(modifiers: VerbModifiloj, hasIntensifier: boolean): string {
        if (hasIntensifier) return "V-VERY";
        if (modifiers.modality) {
            const prefixName = modifiers.negated
                ? (modifiers.modality === "can" ? "YOR" : "KOTAK")
                : modifiers.modality.toUpperCase();
            return `${prefixName}-V`;
        }
        if (modifiers.affix) {
            const affixTrans = AFFIX_TRANSLATIONS[modifiers.affix] || modifiers.affix;
            return `${affixTrans}-V`;
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
            if (mod._modalityNegated && mod._appliedModality) {
                const prefixKey = mod._appliedModality === "can" ? "YOR" : "KOTAK";
                prefix = _akiriAfiksoTradukon(prefixKey);
            } else if (mod._appliedModality) {
                prefix = _akiriAfiksoTradukon(mod._appliedModality.toUpperCase());
            } else if (mod._appliedPrefix) {
                prefix = _akiriAfiksoTradukon(mod._appliedPrefix);
            }
            if (mod._appliedSuffix) {
                suffix = _akiriAfiksoTradukon(mod._appliedSuffix);
            }
        } else {
            const mod = modifiers as VerbModifiloj;
            if (mod.modality) {
                const prefixKey = mod.negated
                    ? (mod.modality === "can" ? "YOR" : "KOTAK")
                    : mod.modality.toUpperCase();
                prefix = _akiriAfiksoTradukon(prefixKey);
            } else if (mod.affix) {
                prefix = _akiriAfiksoTradukon(mod.affix);
            }
        }

        return [prefix, suffix];
    }

    private _aldoniVorton(
        gawekiif: string[],
        structure: string[],
        translation: string[],
        gawekiifText: string,
        struct: string,
        transText: string,
        prefix: string | null = null,
        suffix: string | null = null
    ): void {
        gawekiif.push(gawekiifText);
        structure.push(struct.toUpperCase());
        translation.push(this._konstruiTradukon(transText, prefix, suffix));
    }

    konstrui(): { gawekiif: string; translation: string; structure: string; components: FrazKomponantoj } {
        const gawekiif: string[] = [];
        const structure: string[] = [];
        const translation: string[] = [];

        if (this.components.time) {
            const time = this.components.time;
            this._aldoniVorton(gawekiif, structure, translation, time.gawekiif, "T", time.translation);
        }

        const verbAdjectives = this.components.words.filter(w =>
            w.position === VortPozicio.VERB && w.isAdjective
        );
        this._elmetiAdjektivojn(verbAdjectives, gawekiif, structure, translation);

        const modifiedVerb = this._aplikiVerbModifojn();
        const modifiers = this.components.verbModifiers;
        const [verbPrefix, verbSuffix] = this._akiriAfiksoTradukojn(modifiers);
        const hasIntensifier = this.components.intensifier.active && this.components.intensifier.onVerb;
        this._aldoniVorton(gawekiif, structure, translation, modifiedVerb.gawekiif, this._konstruiVerbanStrukturon(modifiers, hasIntensifier), modifiedVerb.translation, verbPrefix, verbSuffix);

        if (this.components.evidentialVp) {
            const ev = this.components.evidentialVp;
            this._aldoniVorton(gawekiif, structure, translation, ev.gawekiif, "EVI", ev.translation);
        }

        this._konstruiObjektanFrazon(gawekiif, structure, translation);

        if (this.components.question.isQuestion) {
            const marker = this.components.question.isYesno ? INTERROGATIVE_YESNO : INTERROGATIVE_CONTENT;
            const structLabel = this.components.question.isYesno ? "CEZ" : "TACE";
            const markerTrans = this.components.question.isYesno ? "YES/NO_Q" : "CONTENT_Q";
            this._aldoniVorton(gawekiif, structure, translation, marker, structLabel, markerTrans);
        } else {
            this._aldoniVorton(gawekiif, structure, translation, SUBJECT_MARKER, "⺓", "⺓");
        }

        if (this.components.evidentialSentence) {
            const ev = this.components.evidentialSentence;
            this._aldoniVorton(gawekiif, structure, translation, ev.gawekiif, "EVI", ev.translation);
        }

        this._konstruiSubjektanFrazon(gawekiif, structure, translation);

        return {
            gawekiif: `${gawekiif.join(` ${WORD_SEP} `)} ${SENTENCE_CLOSER}`,
            translation: translation.join(" "),
            structure: structure.join(" "),
            components: this.components
        };
    }

    private _elmetiAdjektivanEniron(
        adjEntry: FrazVortEniro,
        gawekiif: string[],
        structure: string[],
        translation: string[],
        intensifierApplied: boolean
    ): { gaw: string; struct: string; translationText: string; intensifierApplied: boolean } {
        const addIntensifier = this.components.intensifier.active &&
            !this.components.intensifier.onVerb &&
            !intensifierApplied;
        if (addIntensifier) intensifierApplied = true;

        const gaw = addIntensifier ? aplikiAfikson(adjEntry.word.gawekiif, "KOZ") : adjEntry.word.gawekiif;

        let struct = "ADJ";
        let prefixTranslation: string | null = null;
        if (adjEntry.word._adjectivizingPrefix) {
            const prefixKey = adjEntry.word._adjectivizingPrefix;
            prefixTranslation = AFFIX_TRANSLATIONS[prefixKey] || prefixKey;
            struct = addIntensifier ? `${prefixKey}-ADJ-KOZ` : `${prefixKey}-ADJ`;
        } else if (addIntensifier) {
            struct = "ADJ-KOZ";
        }

        const suffix = addIntensifier ? "KOZ" : null;

        if (gawekiif.length > 0) {
            this._aplikiLimon(gawekiif);
            this._aplikiLimonAlStrukturo(structure);
        }

        let translationText = adjEntry.word.translation;
        if (prefixTranslation && !adjEntry.word.translation.startsWith(`[${prefixTranslation}]`)) {
            translationText = `[${prefixTranslation}] - ${adjEntry.word.translation}`;
        }

        this._aldoniVorton(gawekiif, structure, translation, gaw, struct, translationText, null, suffix);

        return { gaw, struct, translationText, intensifierApplied };
    }

    private _elmetiAdjektivojn(
        adjectives: FrazVortEniro[],
        gawekiif: string[],
        structure: string[],
        translation: string[]
    ): void {
        if (!adjectives || adjectives.length === 0) return;

        let intensifierApplied = this.components.intensifier.active && this.components.intensifier.onVerb;

        for (const adjEntry of adjectives) {
            const result = this._elmetiAdjektivanEniron(adjEntry, gawekiif, structure, translation, intensifierApplied);
            intensifierApplied = result.intensifierApplied;
        }
    }

    private _konstruiObjektanFrazon(gawekiif: string[], structure: string[], translation: string[]): void {
        this._konstruiFrazon(gawekiif, structure, translation, VortPozicio.OBJECT, false);
    }

    private _konstruiSubjektanFrazon(gawekiif: string[], structure: string[], translation: string[]): void {
        this._konstruiFrazon(gawekiif, structure, translation, VortPozicio.SUBJECT, true);
    }

    private _konstruiFrazon(
        gawekiif: string[],
        structure: string[],
        translation: string[],
        position: VortPozicioTipo,
        requireModifierAfterKal: boolean
    ): void {
        const words = this.components.words.filter(w => w.position === position);
        if (words.length === 0) return;

        let intensifierApplied = false;
        let pendingModifiers: FrazVortEniro[] = [];
        let expectModifierAfterKal = false;

        for (const entry of words) {
            const isModifier = entry.isAdjective;

            if (expectModifierAfterKal && !isModifier) {
                expectModifierAfterKal = false;
                continue;
            }

            if (isModifier) {
                pendingModifiers.push(entry);
                expectModifierAfterKal = false;
            } else {
                for (const modEntry of pendingModifiers) {
                    const result = this._elmetiModifilanEniron(modEntry, gawekiif, structure, translation, intensifierApplied);
                    intensifierApplied = result.intensifierApplied;
                }
                pendingModifiers = [];

                if (entry.topicMarker) {
                    const markerTrans = entry.topicMarker === QU ? "THIS/TOPIC" : "THAT/FOCUS";
                    this._aldoniVorton(gawekiif, structure, translation, entry.topicMarker, "TOPIC", markerTrans);
                }

                if (entry.hasKalBefore && gawekiif.length > 0) {
                    this._aldoniVorton(gawekiif, structure, translation, KAL, "KAL", "KAL");
                    expectModifierAfterKal = requireModifierAfterKal;
                }

                this._aldoniVorton(gawekiif, structure, translation, entry.word.gawekiif,
                    this._akiriPozicianEtikedon(entry.word, false), entry.word.translation);
            }
        }

        for (const modEntry of pendingModifiers) {
            this._elmetiModifilanEniron(modEntry, gawekiif, structure, translation, intensifierApplied);
        }
    }

    private _elmetiModifilanEniron(
        modEntry: FrazVortEniro,
        gawekiif: string[],
        structure: string[],
        translation: string[],
        intensifierApplied: boolean
    ): { gaw: string; struct: string; translationText: string; intensifierApplied: boolean } {
        if (modEntry.isAdjective) {
            return this._elmetiAdjektivanEniron(modEntry, gawekiif, structure, translation, intensifierApplied);
        }
        this._aldoniVorton(gawekiif, structure, translation, modEntry.word.gawekiif,
            this._akiriPozicianEtikedon(modEntry.word, false), modEntry.word.translation);
        return { gaw: modEntry.word.gawekiif, struct: "MOD", translationText: modEntry.word.translation, intensifierApplied };
    }

    private _akiriPozicianEtikedon(word: VortEniro, isAdjective: boolean): string {
        if (isAdjective) return "ADJ";
        if (!word || !word.pos) return "N";
        return POS_TO_LABEL[word.pos] || "N";
    }

    private _aplikiLimonAlStrukturo(structure: string[]): void {
        if (structure.length === 0) return;
        const lastIdx = structure.length - 1;
        const label = structure[lastIdx];
        // ⟨ CEZ and TACE structure labels are not in SPECIAL_MARKERS ( which stores
        //    Iikrhia words ), but they should skip -AL just like the subject marker ⺓. ⟩
        if ( label === "CEZ" || label === "TACE" || this._cxuSpecialaMarkilo(label) ) {
            return;
        }
        structure[lastIdx] += "-AL";
    }
}


// ⟪ Modular Sentence Generators 🏗️ ⟫

// ⟪ Helper Functions for Common Patterns 🔧 ⟫

/**
 * Generic helper for "maybe" pattern - applies a modifier with 50% probability.
    * @param builder - Builder to modify.
    * @param modifierFn - Function that applies the modifier.
    * @param skipIfVerbAffix - Skip if verb already has modality/affix.
 * @returns Modified builder.
 */
function ebleAplikiModifilon(
    builder: FrazKonstruilo,
    modifierFn: (b: FrazKonstruilo) => FrazKonstruilo,
    skipIfVerbAffix: boolean = false
): FrazKonstruilo {
    if (Math.random() > 1 / 2) return builder;
    if (skipIfVerbAffix && builder.components.verbModifiers.affix) return builder;
    return modifierFn(builder);
}

interface VNModifiloOpcioj {
    applyToObject?: boolean;
    applyToSubject?: boolean;
    addVerbAffix?: boolean;
    addModality?: boolean;
    addIntensifier?: boolean;
    addVerbAdjectives?: boolean;
    addNounAdjectives?: boolean;
}

/**
 * VN modifier function - adds V+N sequence as a modifier before a head noun.
 * V N works like an adjective - it modifies the following noun.
 * VN is V and N - each can have their own modifiers (adjectives, affixes, modality, intensifier).
 * Structure. (Adj V) (Adj N) N for subject/object with VN modifier.
    * @param builder - Builder to modify.
    * @param options - Optional configuration.
 * @returns Modified builder.
 */
function aplikiVNModifilonUnue(builder: FrazKonstruilo, options: VNModifiloOpcioj = {}): FrazKonstruilo {
    const {
        applyToObject = true,
        applyToSubject = true,
        addVerbAffix = false,
        addModality = false,
        addIntensifier = false,
        addVerbAdjectives = false,
        addNounAdjectives = false
    } = options;

    const modifierOptions = { addVerbAffix, addModality, addIntensifier, addVerbAdjectives, addNounAdjectives };

    if (applyToObject) {
        _aldoniVNModifilon(builder, VortPozicio.OBJECT, modifierOptions);
    }

    if (applyToSubject) {
        _aldoniVNModifilon(builder, VortPozicio.SUBJECT, modifierOptions);
    }

    return builder;
}

/**
 * Add a VN modifier sequence to a position.
 * VN is V and N - each can have their own modifiers (adjectives, affixes, modality).
 * VN acts as a modifier and comes BEFORE the head noun it modifies.
 * Structure. (Adj) V (Adj) N - where the entire VN sequence modifies the following head noun.
    * @param builder - Builder to modify.
    * @param position - VortPozicio to add to.
    * @param options - Modifier options.
 */
function _aldoniVNModifilon(builder: FrazKonstruilo, position: VortPozicioTipo, options: VNModifiloOpcioj): void {
    const {
        addVerbAffix = false,
        addModality = false,
        addIntensifier = false,
        addVerbAdjectives = false,
        addNounAdjectives = false
    } = options;

    const vnVerb = getWordByPos("Verb");
    const vnNoun = getWordByPos("Noun");
    if (!vnVerb || !vnNoun) return;

    const modifiedVerb = aplikiVerbModifilojn(vnVerb, {
        randomAffix: addVerbAffix,
        randomModality: addModality,
        addIntensifier
    });

    builder.components.words.unshift({
        word: vnNoun, position, isAdjective: false, hasKalBefore: false, topicMarker: null
    });

    if (addNounAdjectives) {
        const nounAdjCount = Math.floor(Math.random() * 2);
        for (let i = 0; i < nounAdjCount; i++) {
            const adj = kreiAdjektivon("Noun");
            if (adj) {
                builder.components.words.unshift({
                    word: adj, position, isAdjective: true, hasKalBefore: false, topicMarker: null
                });
            }
        }
    }

    builder.components.words.unshift({
        word: modifiedVerb, position, isAdjective: false, hasKalBefore: false, topicMarker: null
    });

    if (addVerbAdjectives) {
        const verbAdjCount = Math.floor(Math.random() * 2);
        for (let i = 0; i < verbAdjCount; i++) {
            const adj = kreiAdjektivon("Noun");
            if (adj) {
                builder.components.words.unshift({
                    word: adj, position, isAdjective: true, hasKalBefore: false, topicMarker: null
                });
            }
        }
    }

}

interface BazajFrazKomponantoj {
    verb: VortEniro;
    obj: VortEniro;
    subj: VortEniro;
}

/**
 * Get base sentence components (V, O, S).
 * @returns Base components or null.
 */
function akiriBazajnFrazKomponantojn(): BazajFrazKomponantoj | null {
    const verb = getWordByPos("Verb");
    const obj = getWordByPos("Noun");
    const subj = getWordByPos("Noun");
    if (!verb || !obj || !subj) {
        return null;
    }
    return { verb, obj, subj };
}

/**
 * Optionally add temporal frame.
    * @param builder - Builder to modify.
 * @returns Modified builder.
 */
function ebleAldoniTemporalon(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        const timeWord = getWordByPos("Noun");
        if (timeWord) {
            const temporalGawekiif = aplikiAfikson(timeWord.gawekiif, "STIF");
            b.agordiTemporalon({ gawekiif: temporalGawekiif, translation: timeWord.translation, pos: timeWord.pos });
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
    * @param builder - Builder to modify.
    * @param base - Base components (verb, obj, subj).
    * @param options - Optional configuration.
 * @returns Modified builder.
 */
function aplikiAdjektivojn(builder: FrazKonstruilo, base: BazajFrazKomponantoj, options: AdjektivoOpcioj = {}): FrazKonstruilo {
    const { useAdjectivizer = false, skipRandom = false } = options;

    if (!skipRandom && Math.random() > 1 / 2) {
        return builder;
    }

    const positions: VortPozicioTipo[] = [VortPozicio.VERB, VortPozicio.OBJECT, VortPozicio.SUBJECT];

    for (const pos of positions) {
        const adjCount = Math.floor(Math.random() * 3);

        for (let i = 0; i < adjCount; i++) {
            let adj: VortEniro | null = null;

            if (useAdjectivizer) {
                adj = kreiAdjektivon("Noun");
            } else {
                adj = getWordByPos("Adjective");
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
    * @param builder - Builder to modify.
    * @param options - Optional configuration.
 * @returns Modified builder.
 */
function aplikiEvidencialonUnue(builder: FrazKonstruilo, options: EvidencialoOpcioj = {}): FrazKonstruilo {
    const {
        addVpEvidential = true,
        addSentenceEvidential = false,
        evidential = null
    } = options;

    const ev = evidential || getWordByPos("Evidential");
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
    * @param builder - Builder to modify.
 * @returns Modified builder.
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
 * Optionally add modality (can/should with optional negation).
    * @param builder - Builder to modify.
 * @returns Modified builder.
 */
function ebleAldoniModalecojn(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        const modalities: [string, boolean][] = [
            ["can", false],
            ["can", true],
            ["should", false],
            ["should", true]
        ];
        const [modality, negated] = modalities[Math.floor(Math.random() * modalities.length)];
        b.agordiVerbon(b.components.verb!, null, modality, negated);
        return b;
    });
}

/**
 * Optionally add negation (KON-).
    * @param builder - Builder to modify.
 * @returns Modified builder.
 */
function ebleAldoniNegacion(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        if (b.components.verbModifiers.modality) return b;
        b.agordiVerbon(b.components.verb!, "KON");
        return b;
    });
}

interface IntensigiloOpcioj {
    onVerb?: boolean;
}

/**
 * Optionally add intensifier to object adjective or verb.
    * @param builder - Builder to modify.
    * @param options - Optional configuration.
 * @returns Modified builder.
 */
function ebleAldoniIntensigilon(builder: FrazKonstruilo, options: IntensigiloOpcioj = {}): FrazKonstruilo {
    const { onVerb = false } = options;

    if (onVerb) {
        return ebleAplikiModifilon(builder, (b) => {
            b.agordiIntensigilon(null, true);
            return b;
        });
    }

    const hasObjectAdj = builder.components.words.some(w =>
        w.position === VortPozicio.OBJECT && w.isAdjective
    );
    if (!hasObjectAdj) return builder;

    return ebleAplikiModifilon(builder, (b) => {
        b.agordiIntensigilon(b.components.intensifier.targetAdjective || null, false);
        return b;
    });
}

interface VerbaAfiksoOpcioj {
    affixType?: string;
    skipIfVerbModified?: boolean;
}

/**
 * Unified verb affix function - applies verb affixes (passive, inchoative, etc.).
    * @param builder - Builder to modify.
    * @param options - Optional configuration.
 * @returns Modified builder.
 */
function aplikiVerbanAfiksonUnue(builder: FrazKonstruilo, options: VerbaAfiksoOpcioj = {}): FrazKonstruilo {
    const {
        affixType = "L6R",
        skipIfVerbModified = true
    } = options;

    if (skipIfVerbModified && builder.components.verbModifiers.affix) {
        return builder;
    }

    builder.agordiVerbon(builder.components.verb!, affixType, builder.components.verbModifiers.modality, builder.components.verbModifiers.negated);
    return builder;
}

/**
 * Optionally add unified verb affix (passive, inchoative, etc.).
    * @param builder - Builder to modify.
    * @param affixType - Affix type (randomly selected if not provided).
 * @returns Modified builder.
 */
function ebleAldoniVerbanAfiksonUnue(builder: FrazKonstruilo, affixType: string | null = null): FrazKonstruilo {
    if (!affixType) {
        const affixes = ["L6R", "B6N"];
        affixType = affixes[Math.floor(Math.random() * affixes.length)];
    }
    return ebleAplikiModifilon(builder, (b) => {
        return aplikiVerbanAfiksonUnue(b, { affixType });
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
    * @param builder - Builder to modify.
    * @param options - Optional configuration.
 * @returns Modified builder.
 */
function aplikiKoordinatajnElementojnUnue(builder: FrazKonstruilo, options: KoordinatajElementojOpcioj = {}): FrazKonstruilo {
    const {
        coordinateObjects = true,
        coordinateSubjects = true,
        object2 = null,
        subject2 = null
    } = options;

    if (coordinateObjects) {
        const obj2 = object2 || getWordByPos("Noun");
        if (obj2) {
            builder.aldoniKoordinatanVorton(obj2, VortPozicio.OBJECT, true);
        }
    }

    if (coordinateSubjects) {
        const subj2 = subject2 || getWordByPos("Noun");
        if (subj2) {
            const adj = getWordByPos("Adjective") || kreiAdjektivon("Noun");
            if (adj) {
                builder.aldoniAdjektivojn([adj], VortPozicio.SUBJECT);
            }
            builder.aldoniKoordinatanVorton(subj2, VortPozicio.SUBJECT, true);
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
        const addIntensifier = Math.random() > 1 / 2;
        const addVerbAdjectives = Math.random() > 1 / 2;
        const addNounAdjectives = Math.random() > 1 / 2;

        return aplikiVNModifilonUnue(b, {
            applyToObject: true,
            applyToSubject: true,
            addVerbAffix,
            addModality,
            addIntensifier,
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
        const words = b.components.words;

        for (const entry of words) {
            if (!entry.isAdjective && !entry.hasKalBefore) {
                if (Math.random() > 1 / 2) {
                    entry.topicMarker = Math.random() > 1 / 2 ? QU : MU;
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
    modality?: boolean;
    negation?: boolean;
    verbAffix?: boolean;
    intensifier?: boolean;
    coordinated?: boolean;
    vnModifier?: boolean;
    question?: boolean;
    evidential?: boolean;
    topicMarker?: boolean;
}

/**
 * Optionally convert to question.
    * @param builder - Builder to modify.
    * @param enabledModifiers - Which modifiers are enabled.
 * @returns Modified builder.
 */
function ebleAldoniDemandon(builder: FrazKonstruilo, enabledModifiers: EbligitajModifiloj): FrazKonstruilo {
    if (!enabledModifiers.question) return builder;
    return ebleAplikiModifilon(builder, (b) => {
        const isYesno = Math.random() < 1 / 2;
        b.agordiDemandon(isYesno);
        return b;
    });
}

interface FrazaRezulto {
    gawekiif: string;
    translation: string;
    structure: string;
    components: FrazKomponantoj;
}

/**
 * Main sentence generator - builds sentence with random optional modifiers.
 * Uses unified word system - all words added via builder.aldoniVorton().
    * @param structure - Specific structure (unused in modular system).
    * @param enabledModifiers - Which modifiers are enabled.
 * @returns Sentence data or null.
 */
function generiFrazon(structure: string | null = null, enabledModifiers: EbligitajModifiloj = {}): FrazaRezulto | null {
    if (structure) {
        const result = registraro.generi(structure);
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
        .agordiVerbon(base.verb)
        .aldoniVorton(base.obj, VortPozicio.OBJECT)
        .aldoniVorton(base.subj, VortPozicio.SUBJECT);

    if (enabledModifiers.temporal !== false) builder = ebleAldoniTemporalon(builder);
    if (enabledModifiers.evidential !== false) builder = ebleAldoniEvidencialonUnue(builder);
    if (enabledModifiers.modality !== false) builder = ebleAldoniModalecojn(builder);
    if (enabledModifiers.negation !== false) builder = ebleAldoniNegacion(builder);
    if (enabledModifiers.verbAffix !== false) builder = ebleAldoniVerbanAfiksonUnue(builder);
    if (enabledModifiers.adjectivizer) {
        if (Math.random() > 1 / 2) {
            builder = aplikiAdjektivojn(builder, base, { useAdjectivizer: true, skipRandom: true });
        }
    } else if (enabledModifiers.adjectives !== false) {
        builder = aplikiAdjektivojn(builder, base, { useAdjectivizer: false, skipRandom: false });
    }

    if (enabledModifiers.intensifier !== false) {
        const onVerb = Math.random() < 1 / 2;
        builder = ebleAldoniIntensigilon(builder, { onVerb });
    }
    if (enabledModifiers.vnModifier !== false) builder = ebleAldoniUnuecanVNModifilon(builder);
    if (enabledModifiers.coordinated !== false) builder = ebleAldoniKoordinatajnElementojnUnue(builder);
    if (enabledModifiers.topicMarker !== false) builder = ebleAldoniTemajnMarkilojn(builder);
    if (enabledModifiers.question !== false) builder = ebleAldoniDemandon(builder, enabledModifiers);

    return builder.konstrui();
}


// ⟪ UI Initialization 🖥️ ⟫

/**
 * Initialize the sentence generator UI.
 * Sets up button click handlers and populates structure dropdown.
 */
function initSentenceGeneratorUI(): void {
    const generateBtn = document.getElementById("kf2Ox2pewaCa12na");
    const haxeSarox2pewa = document.getElementById("haxeSarox2pewa");
    const knox2pewaSwesukw2q = document.getElementById("knox2pewaSwesukw2q");
    const outputDiv = document.getElementById("maxemaSa10Ox2");
    const structureEl = document.getElementById("tlakakuKnox2pewa");
    const gawekiifEl = document.getElementById("tlakakuOx2pewa");
    const translationEl = document.getElementById("tlakakuSkakefani");
    const errorDiv = document.getElementById("tlohk2ni");
    const errorP = errorDiv?.querySelector("p") || null;

    let dictionaryLoaded = false;
    let selectedStructure = "";
    const enabledModifiers: EbligitajModifiloj = {
        temporal: true,
        adjectives: true,
        adjectivizer: true,
        modality: true,
        negation: true,
        verbAffix: true,
        intensifier: true,
        coordinated: true,
        vnModifier: true,
        question: true,
        evidential: true,
        topicMarker: true
    };

    interface ModifierInfo {
        id: keyof EbligitajModifiloj;
        name: string;
    }

    const MODIFIERS: ModifierInfo[] = [
        { id: "temporal", name: "Temporal (T)" },
        { id: "adjectives", name: "Adjectives (Adj)" },
        { id: "adjectivizer", name: "Adjectivizer (2R/K2R/...)" },
        { id: "modality", name: "Modality (can/should)" },
        { id: "negation", name: "Negation (KON-)" },
        { id: "verbAffix", name: "Verb Affix (L6R/B6N)" },
        { id: "intensifier", name: "Intensifier (-KOZ)" },
        { id: "coordinated", name: "Coordinated (KAL)" },
        { id: "vnModifier", name: "VN Modifiers" },
        { id: "question", name: "Questions" },
        { id: "evidential", name: "Evidentials" },
        { id: "topicMarker", name: "Topic Markers (QU/MU)" }
    ];

    function showError(message: string): void {
        if (errorP) errorP.textContent = message;
        if (errorDiv) errorDiv.style.display = "block";
        if (outputDiv) outputDiv.style.display = "none";
    }

    function showOutput(): void {
        if (errorDiv) errorDiv.style.display = "none";
        if (outputDiv) outputDiv.style.display = "block";
    }

    function populateStructures(): void {
        if (!knox2pewaSwesukw2q) return;
        const structures = registraro.akiriStrukturojn();

        knox2pewaSwesukw2q.innerHTML = "";

        const anyLabel = document.createElement("label");
        const anyRadio = document.createElement("input");
        anyRadio.type = "radio";
        anyRadio.name = "structure";
        anyRadio.value = "";
        anyRadio.checked = true;
        anyRadio.addEventListener("change", () => {
            selectedStructure = "";
            if (haxeSarox2pewa) haxeSarox2pewa.textContent = "ꞁȷ̀ꞇ j͐ʃᴜƽ";
        });
        anyLabel.appendChild(anyRadio);
        anyLabel.appendChild(document.createTextNode(" ꞁȷ̀ꞇ j͐ʃᴜƽ"));
        knox2pewaSwesukw2q.appendChild(anyLabel);

        structures.forEach(struct => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "structure";
            radio.value = struct;
            radio.addEventListener("change", () => {
                selectedStructure = struct;
                if (haxeSarox2pewa) haxeSarox2pewa.textContent = struct;
            });
            label.appendChild(radio);
            label.appendChild(document.createTextNode(" " + struct));
            knox2pewaSwesukw2q.appendChild(label);
        });
    }

    function populateModifiers(): void {
        const container = document.getElementById("modifierCheckboxes");
        if (!container) return;

        container.innerHTML = "";

        MODIFIERS.forEach(mod => {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = enabledModifiers[mod.id] ?? true;
            checkbox.addEventListener("change", () => {
                enabledModifiers[mod.id] = checkbox.checked;
            });
            label.appendChild(document.createTextNode(" " + mod.name));
            label.appendChild(checkbox);
            container.appendChild(label);
        });
    }

    async function generateSentenceHandler(): Promise<void> {
        if (!dictionaryLoaded) {
            showError("ſ͕ȷɜ ſ͕ɭwȝ ſɭɔʞ ⟅");
            return;
        }

        if (generateBtn) (generateBtn as HTMLButtonElement).disabled = true;
        showOutput();

        try {
            const sentence = generiFrazon(selectedStructure || null, enabledModifiers);

            if (!sentence) {
                showError("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Failed to generi sentence. Dictionary may be empty.");
            } else {
                if (structureEl) structureEl.textContent = sentence.structure;
                if (gawekiifEl) {
                    gawekiifEl.textContent = sentence.gawekiif;
                    window.vacepu("ox2pewa");
                }
                if (translationEl) translationEl.textContent = sentence.translation;
                showOutput();
            }
        } catch (e) {
            showError(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${(e as Error).message}`);
        } finally {
            if (generateBtn) (generateBtn as HTMLButtonElement).disabled = false;
        }
    }

    async function init(): Promise<void> {
        if (generateBtn) (generateBtn as HTMLButtonElement).disabled = true;
        if (errorDiv) errorDiv.style.display = "none";
        populateStructures();
        populateModifiers();

        try {
            const words = await loadDictionaryWithFallback();

            if (words.length > 0) {
                dictionaryLoaded = true;
                if (generateBtn) (generateBtn as HTMLButtonElement).disabled = false;
                console.log("Dictionary loaded successfully. Ready to generi sentences.");
            } else {
                showError("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Could not load dictionary.");
                if (generateBtn) {
                    (generateBtn as HTMLButtonElement).disabled = false;
                    generateBtn.addEventListener("click", () => {
                        init();
                    }, { once: true });
                }
            }
        } catch (e) {
            showError(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${(e as Error).message}`);
            if (generateBtn) (generateBtn as HTMLButtonElement).disabled = false;
        }
    }

    if (generateBtn) {
        generateBtn.addEventListener("click", generateSentenceHandler);
    }
    init();
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initSentenceGeneratorUI);
    } else {
        initSentenceGeneratorUI();
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
    initSentenceGeneratorUI,
    loadDictionary,
    loadDictionaryWithFallback,
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
    PREFIX_AFFIXES,
    SUFFIX_AFFIXES,
    ADJECTIVIZING_PREFIXES,
    MODALITY_PREFIXES,
    GENERAL_NEGATION_PREFIXES,
    DERIVATIONAL_PREFIXES,
    ALL_ADJECTIVIZING_PREFIXES,
    MODALITY_PAIRS,
    AFFIX_TRANSLATIONS,
    POS_TO_LABEL,
    SPECIAL_MARKERS,
    IIKRHIA_VOWELS,
    CODAS,
    SUBJECT_MARKER,
    INTERROGATIVE_YESNO,
    INTERROGATIVE_CONTENT,
    KAL,
    QU,
    MU,
    WORD_SEP,
    SENTENCE_CLOSER
};
export type { VortEniro, ModifitaVortEniro, VerbModifiloOpcioj, VNModifiloOpcioj, EbligitajModifiloj, FrazaRezulto };
