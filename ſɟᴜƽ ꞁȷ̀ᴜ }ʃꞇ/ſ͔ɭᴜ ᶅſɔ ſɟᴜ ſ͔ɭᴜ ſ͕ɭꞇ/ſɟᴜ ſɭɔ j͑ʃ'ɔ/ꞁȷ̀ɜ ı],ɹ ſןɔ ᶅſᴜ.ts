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
    "п́", "ɘ", "ʞ", "ɀ", "c̭", "ƣ̋", "ⰱ", "ƨ", "ԏ͕", "ꝛ̗",
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
    "SWER": [ "j͑ʃп́ɔƣ̋", "j͑ʃп́ɔ" ],
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
    "ANU": [ "}ʃᴜ", "ꞁȷ̀ᴜ }ʃᴜ" ],
    "KOZ": [ "ſɭɜƴ", "ꞁȷ̀ɜƴ" ],
    "STIF": [ "j͑ʃƨꞇʞ", "j͑ʃƨꞇʞ" ],
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

type GeneratorFunction = () => unknown;

class StructureRegistry {
    private _generators: Record<string, GeneratorFunction> = {};

    register(name: string) {
        return (func: GeneratorFunction): GeneratorFunction => {
            this._generators[name] = func;
            return func;
        };
    }

    getStructures(): string[] {
        return Object.keys(this._generators);
    }

    generate(name: string): unknown {
        const generator = this._generators[name];
        if (generator) {
            return generator();
        }
        return null;
    }
}

const registry = new StructureRegistry();


// ⟪ Phonology Helpers 🔤 ⟫

/**
 * Check if word is vowel-initial.
 * @param word - Word to check.
 * @returns True if vowel-initial.
 */
function isVowelInitial(word: string): boolean {
    if (!word || !word.trim()) {
        return false;
    }
    const stripped = word.trim();
    if (stripped.startsWith("ꞁȷ̀")) {
        return true;
    }
    return IIKRHIA_VOWELS.includes(stripped[0]);
}

/**
 * Check if word ends with a vowel sound.
 * @param word - Word to check.
 * @returns True if vowel-final.
 */
function isVowelFinal(word: string): boolean {
    if (!word) {
        return true;
    }
    const stripped = word.trimEnd();
    if (!stripped) {
        return true;
    }
    for (const coda of CODAS) {
        if (stripped.endsWith(coda)) {
            return false;
        }
    }
    return IIKRHIA_VOWELS.includes(stripped[stripped.length - 1]);
}


// ⟪ Verb Modification 🔧 ⟫

interface WordEntry {
    gawekiif: string;
    translation: string;
    pos: string;
    row_index?: number;
    _adjectivizedFrom?: string;
    _adjectivizingPrefix?: string;
}

interface ModifiedWordEntry extends WordEntry {
    _appliedPrefix?: string | null;
    _appliedSuffix?: string | null;
    _appliedModality?: string | null;
    _modalityNegated?: boolean;
    _intensifier?: boolean;
}

interface VerbModifierOptions {
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
function applyVerbModifiers(verb: WordEntry, options: VerbModifierOptions = {}): ModifiedWordEntry {
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

    const applyModalityAffix = (word: string, mod: string, negated: boolean): string => {
        const affixMap: Record<string, string> = { "can": negated ? "YOR" : "OR", "should": negated ? "KOTAK" : "TAK" };
        const affixKey = affixMap[mod];
        return affixKey ? applyAffix(word, affixKey) : word;
    };

    if (modality) {
        const modalityPrefix = modalityNegated ? "YOR" : "OR";
        if (existingPrefix && getConflictingPrefix(modalityPrefix) === existingPrefix) {
            modality = null;
            modalityNegated = false;
        } else {
            verbForm = applyModalityAffix(verbForm, modality, modalityNegated);
            appliedModality = modality;
            appliedPrefix = modalityPrefix;
        }
    }

    if (!appliedModality && randomModality) {
        const modalities: [string, boolean][] = [["can", false], ["should", false]];
        const [selectedModality, negated] = modalities[Math.floor(Math.random() * modalities.length)];
        const selectedPrefix = negated ? "YOR" : "OR";
        if (existingPrefix && getConflictingPrefix(selectedPrefix) === existingPrefix) {
        } else {
            verbForm = applyModalityAffix(verbForm, selectedModality, negated);
            appliedModality = selectedModality;
            appliedPrefix = selectedPrefix;
        }
    }

    if (!appliedModality) {
        if (affix) {
            verbForm = applyAffix(verbForm, affix);
            if (PREFIX_AFFIXES[affix]) {
                appliedPrefix = affix;
            } else if (SUFFIX_AFFIXES[affix]) {
                appliedSuffix = affix;
            }
        } else if (randomAffix) {
            const affixes = ["L6R", "B6N"];
            const selectedAffix = affixes[Math.floor(Math.random() * affixes.length)];
            verbForm = applyAffix(verbForm, selectedAffix);
            appliedPrefix = selectedAffix;
        }
    }

    if (addIntensifier) {
        verbForm = applyAffix(verbForm, "KOZ");
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
function applyAffix(word: string, affixType: string): string {
    if (!word) return word;

    if (PREFIX_AFFIXES[affixType]) {
        const [vowelForm, consonantForm] = PREFIX_AFFIXES[affixType];
        const form = isVowelInitial(word) ? vowelForm : consonantForm;
        return `${form} ${word}`;
    }

    if (SUFFIX_AFFIXES[affixType]) {
        const [vowelForm, consonantForm] = SUFFIX_AFFIXES[affixType];
        const form = isVowelFinal(word) ? vowelForm : consonantForm;
        return `${word} ${form}`;
    }

    return word;
}

/**
 * Check if affix is adjectivizing (turns word into adjective).
 * @param affixType - Type of affix.
 * @returns True if adjectivizing.
 */
function isAdjectivizingAffix(affixType: string): boolean {
    return ALL_ADJECTIVIZING_PREFIXES.has(affixType);
}

/**
 * Check if a word has an adjectivizing prefix.
 * Adjectivizing prefixes turn nouns/verbs into adjectives.
 * L6R only adjectivizes non-verbs (for verbs it's passive voice).
 * Uses getL6RUsage() to determine L6R function.
 * @param word - Word to check.
 * @param wordEntry - Optional word entry to check if L6R is passive.
 * @returns True if word has adjectivizing prefix.
 */
function hasAdjectivizingPrefix(word: string, wordEntry: WordEntry | null = null): boolean {
    if (!word) return false;

    for (const prefix of Object.keys(ADJECTIVIZING_PREFIXES)) {
        const [vowelForm, consonantForm] = PREFIX_AFFIXES[prefix];
        if (word.startsWith(vowelForm + " ") || word.startsWith(consonantForm + " ")) {
            return true;
        }
    }

    const l6rUsage = getL6RUsage(word, wordEntry);
    return l6rUsage === "adjectivizer";
}

/**
 * Check if L6R prefix is used as passive (on a verb) or adjectivizer (on non-verb).
 * @param word - Word to check.
 * @param wordEntry - Word entry from dictionary.
 * @returns "passive" if on verb, "adjectivizer" if on non-verb, "none" if no L6R.
 */
function getL6RUsage(word: string | null, wordEntry: WordEntry | null): string {
    if (!word) return "none";
    const [l6rVowel, l6rConsonant] = PREFIX_AFFIXES["L6R"];
    if (word.startsWith(l6rVowel + " ") || word.startsWith(l6rConsonant + " ")) {
        return isVerb(wordEntry) ? "passive" : "adjectivizer";
    }
    return "none";
}

/**
 * Get a random adjectivizing prefix type.
 * Returns one of the adjectivizing prefix keys (2R, K2R, J6R, H2R, SAR, SWER, SER).
 * @returns Random adjectivizing prefix type.
 */
function getRandomAdjectivizingPrefix(): string {
    const prefixes = Object.keys(ADJECTIVIZING_PREFIXES);
    return prefixes[Math.floor(Math.random() * prefixes.length)];
}

/**
 * Apply an adjectivizing prefix to a word, converting it to an adjective.
 * Adjectivizing prefixes turn nouns/verbs into adjectives with relational meanings:
 * - 2R: WITH (having the quality of)
 * - K2R: USING (by means of)
 * - J6R: IN (located within)
 * - H2R: WITHOUT (lacking)
 * - SAR: FOR (purpose/benefit)
 * - SWER: ABOUT (concerning)
 * - SER: OF (possession/relation)
 * @param wordEntry - Word entry with gawekiif, translation, and pos.
 * @param prefixType - Specific prefix type, or null for random.
 * @returns New word entry with adjectivized form and updated translation.
 */
function applyAdjectivizingPrefix(wordEntry: WordEntry, prefixType: string | null = null): WordEntry {
    if (!wordEntry || !wordEntry.gawekiif) {
        return wordEntry;
    }

    const selectedPrefix = prefixType || getRandomAdjectivizingPrefix();
    const prefixTranslation = AFFIX_TRANSLATIONS[selectedPrefix] || selectedPrefix;

    const adjectivizedForm = applyAffix(wordEntry.gawekiif, selectedPrefix);

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
function createAdjective(sourcePos: "Noun" | "Verb" = "Noun", prefixType: string | null = null): WordEntry | null {
    const sourceWord = getWordByPos(sourcePos);
    if (!sourceWord) {
        return null;
    }
    return applyAdjectivizingPrefix(sourceWord, prefixType);
}

/**
 * Check if a word is a verb (for L6R restriction).
 * @param wordEntry - Word entry from dictionary.
 * @returns True if word is a verb.
 */
function isVerb(wordEntry: WordEntry | null): boolean {
    return wordEntry !== null && wordEntry.pos === "Verb";
}

/**
 * Get the conflicting modality prefix for a given prefix.
 * Negative modality prefixes (YOR, KOTAK) cannot co-occur with their positive counterparts (OR, TAK).
 * @param prefixType - The prefix type to check.
 * @returns The conflicting prefix type, or null if none.
 */
function getConflictingPrefix(prefixType: string): string | null {
    return MODALITY_PAIRS[prefixType] || null;
}


// ⟪ Dictionary Loading 📖 ⟫

const DICTIONARY_PATHS = [
    "../../ſ͔ɭᴜ ᶅſɔ/ſȷſɭ ꞁȷ̀ɹ ſɭˬꞇᴜ.html",
    "../ſ͔ɭᴜ ᶅſɔ/ſȷſɭ ꞁȷ̀ɹ ſɭˬꞇᴜ.html",
    "ſȷſɭ ꞁȷ̀ɹ ſɭˬꞇᴜ.html"
];

const IIKRHIA_INITIALS = [
    "ᶅſ", "ſן", "ſȷ", "ʃ", "ŋᷠ", "ɽ͑ʃ'", "j͑ʃ'", "ɭʃ", "ɭ(", "ſᶘ", "j͑ʃ", "}ʃ",
    "ſ̀ȷ", "j͐ʃ", "ſɭˬ", "ſɭ,", "ɭl̀", "ſɟ", "ı],", "ſ͕ȷ", "ſ͔ɭ", "ſɭ", "֭ſɭ", "ſ͕ɭ",
    "ꞁȷ̀",
    "ȏſן", "ȏɭʃ'", "ȏſ̀ȷ", "ȏſɟ", "ȏɭʃ", "ȏŋᷠ", "ȏ}ʃ'", "ȏoͩſ̀ȷ", "ȏſ͕ȷ", "ȏ}ʃ",
];

const IIKRHIA_INTERNALS = [
    "п́", "ɘ", "ʞ", "ɀ", "c̭", "ƣ̋", "ⰱ", "ƨ", "ԏ͕", "ꝛ̗", "ɔ˞", "c̗", "ŋ", "ͷ̗",
    "ɯ", "ƴ", "ᴎ", "ᴜ̭", "ᶗ‹", "ⱷ̮̀", "ɴ", "ƽ", "ᴜ̩", "ȝ",
    "ꞇ", "ɔ", "ᴜ", "ɹ", "ɜ", "э", "ɔⅎ", "ɜⅎ", "эⅎ",
];

const IIKRHIA_PUNCTUATION = ["⟅", "｡", "⸙", "ʌ"];

const _dictionaryCache = new Map<string, WordEntry[]>();

/**
 * Get all Iikrhia script sequences for character detection.
 * @returns Array of all Iikrhia sequences.
 */
function getAllIikrhiaSequences(): string[] {
    return [...IIKRHIA_INITIALS, ...IIKRHIA_INTERNALS, ...IIKRHIA_PUNCTUATION];
}

/**
 * Check if text contains Iikrhia script characters.
 * @param text - Text to check.
 * @returns True if contains Iikrhia script.
 */
function containsIikrhiaScript(text: string): boolean {
    if (!text) {
        return false;
    }
    return getAllIikrhiaSequences().some(seq => text.includes(seq));
}

/**
 * Select translation parts that don't contain Iikrhia script.
 * @param transParts - List of translation alternatives.
 * @returns First non-Iikrhia translation, or falls back to first available.
 */
function selectNonIikrhiaTranslation(transParts: string[]): string {
    for (const trans of transParts) {
        if (!containsIikrhiaScript(trans)) {
            return trans;
        }
    }
    return transParts[0] || "";
}

/**
 * Determine POS from dictionary row data.
 * Uses the exact POS values from the HTML dictionary.
 * @param posText - POS text from dictionary.
 * @returns Normalized POS tag.
 */
function determinePos(posText: string): string {
    if (!posText) return "Noun";
    const pos = posText.trim();

    const match = pos.match(/\((\w+)\)$/);
    if (match) {
        return match[1];
    }

    const POS_MAP: Record<string, string> = {
        "Affix": "Affix",
        "Evidential": "Evidential",
        "Adjective": "Adjective",
        "Verb": "Verb",
        "Noun": "Noun"
    };

    for (const [key, value] of Object.entries(POS_MAP)) {
        if (pos === key || pos.endsWith(` (${key})`)) {
            return value;
        }
    }

    return "Noun";
}

/**
 * Parse dictionary from HTML table.
 * @param htmlContent - HTML content of dictionary page.
 * @returns Array of word entries.
 */
function parseDictionaryFromHTML(htmlContent: string): WordEntry[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const table = doc.getElementById("kef");
    if (!table) {
        console.warn("Dictionary table not found");
        return [];
    }

    const rows = table.querySelectorAll("tbody tr");
    const words: WordEntry[] = [];

    rows.forEach((row, idx) => {
        const cells = row.querySelectorAll("td");
        if (cells.length < 3) return;

        const wordText = cells[0].textContent?.trim() || "";
        const translationText = cells[1].textContent?.trim() || "";
        const posText = cells[2].textContent?.trim() || "";

        if (!wordText || wordText === "NaN") return;

        const wordParts = wordText.split("｡").map(p => p.trim()).filter(p => p);
        const transParts = translationText.split("｡").map(p => p.trim()).filter(p => p);

        const pos = determinePos(posText);

        wordParts.forEach((wordPart) => {
            const trans = selectNonIikrhiaTranslation(transParts);
            words.push({
                gawekiif: wordPart,
                translation: trans,
                pos,
                row_index: idx
            });
        });
    });

    return words;
}

/**
 * Load dictionary entries from HTML file.
 * @param dictionaryPath - Optional path to dictionary HTML.
 * @returns Array of word entries.
 */
async function loadDictionary(dictionaryPath: string | null = null): Promise<WordEntry[]> {
    const path = dictionaryPath || DICTIONARY_PATHS[0];

    if (_dictionaryCache.has(path)) {
        return _dictionaryCache.get(path)!;
    }

    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`( Failed to fetch dictionary ) ${response.status} ${response.statusText}`);
        }
        const htmlContent = await response.text();
        const words = parseDictionaryFromHTML(htmlContent);
        _dictionaryCache.set(path, words);
        console.log(`Loaded ${words.length} words from dictionary`);
        return words;
    } catch (error) {
        console.warn("Could not load dictionary via fetch -", error);
        const empty: WordEntry[] = [];
        _dictionaryCache.set(path, empty);
        return empty;
    }
}

/**
 * Load dictionary by trying multiple paths in order.
 * Returns the first successful result.
 * @returns Array of word entries.
 */
async function loadDictionaryWithFallback(): Promise<WordEntry[]> {
    for (const path of DICTIONARY_PATHS) {
        try {
            const words = await loadDictionary(path);
            if (words.length > 0) {
                console.log(`Successfully loaded dictionary from ${path}`);
                return words;
            }
        } catch (e) {
            console.log(`Failed to load from ${path} -`, (e as Error).message);
        }
    }
    return [];
}

/**
 * Load dictionary synchronously (if pre-loaded).
 * Returns the first cached dictionary or empty array.
 * @returns Array of word entries.
 */
function loadDictionarySync(): WordEntry[] {
    const firstEntry = _dictionaryCache.values().next();
    return firstEntry.value || [];
}

/**
 * Get random word by POS.
 * @param pos - Part of speech tag.
 * @returns Word entry or null.
 */
function getWordByPos(pos: string): WordEntry | null {
    const words = loadDictionarySync().filter(w => w.pos === pos);
    if (words.length === 0) {
        return null;
    }
    return words[Math.floor(Math.random() * words.length)];
}


// ⟪ Sentence Components 🧱 ⟫

/**
 * Word position types in VOS sentence structure.
 */
const WordPosition = {
    TEMPORAL: "TEMPORAL",
    VERB: "VERB",
    EVIDENTIAL_VP: "EVIDENTIAL_VP",
    OBJECT: "OBJECT",
    SUBJECT_MARKER: "SUBJECT_MARKER",
    EVIDENTIAL_SENTENCE: "EVIDENTIAL_SENTENCE",
    SUBJECT: "SUBJECT"
} as const;

type WordPositionType = typeof WordPosition[keyof typeof WordPosition];

interface QuestionInfo {
    isQuestion: boolean;
    isYesno: boolean;
}

interface IntensifierInfo {
    active: boolean;
    onVerb: boolean;
    targetAdjective?: WordEntry | null;
}

interface SentenceWordEntry {
    word: WordEntry;
    position: WordPositionType;
    isAdjective: boolean;
    hasKalBefore: boolean;
    topicMarker: string | null;
}

interface VerbModifiers {
    affix: string | null;
    modality: string | null;
    negated: boolean;
}

/**
 * Components for building a sentence.
 * Uses unified words array - all words (including adjectives, VN sequences, coordinated elements)
 * are stored as word entries with position and modifier information.
 */
class SentenceComponents {
    time: WordEntry | null = null;
    verb: WordEntry | null = null;
    verbModifiers: VerbModifiers = { affix: null, modality: null, negated: false };
    evidentialVp: WordEntry | null = null;
    evidentialSentence: WordEntry | null = null;
    question: QuestionInfo = { isQuestion: false, isYesno: false };
    intensifier: IntensifierInfo = { active: false, onVerb: false };
    structureName = "";
    _modifiedVerb?: ModifiedWordEntry;

    words: SentenceWordEntry[] = [];
}

/**
 * Helper to get affix translation with fallback to key.
 * @param key - Affix key.
 * @returns Translation or key.
 */
function _getAffixTranslation(key: string): string | null {
    return AFFIX_TRANSLATIONS[key] || key;
}


// ⟪ Sentence Builder 🔨 ⟫

class SentenceBuilder {
    components: SentenceComponents;

    constructor() {
        this.components = new SentenceComponents();
    }

    setStructureName(name: string): SentenceBuilder {
        this.components.structureName = name;
        return this;
    }

    setTemporal(temporal: WordEntry): SentenceBuilder {
        this.components.time = temporal;
        return this;
    }

    setVerb(verb: WordEntry, affix: string | null = null, modality: string | null = null, negated: boolean = false): SentenceBuilder {
        this.components.verb = verb;
        this.components.verbModifiers = { affix, modality, negated };
        return this;
    }

    addWord(word: WordEntry, position: WordPositionType, options: {
        isAdjective?: boolean;
        hasKalBefore?: boolean;
        topicMarker?: string | null;
    } = {}): SentenceBuilder {
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

    addAdjectives(adjectives: WordEntry[], targetPosition: WordPositionType): SentenceBuilder {
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

    addCoordinatedWord(word: WordEntry, position: WordPositionType, useKal: boolean = true): SentenceBuilder {
        this.addWord(word, position, { hasKalBefore: useKal });
        return this;
    }

    setEvidentialVp(evidential: WordEntry): SentenceBuilder {
        this.components.evidentialVp = evidential;
        return this;
    }

    setEvidentialSentence(evidential: WordEntry): SentenceBuilder {
        this.components.evidentialSentence = evidential;
        return this;
    }

    setQuestion(isYesno: boolean = true): SentenceBuilder {
        this.components.question = { isQuestion: true, isYesno };
        return this;
    }

    setIntensifier(adj: WordEntry | null, onVerb: boolean = false): SentenceBuilder {
        if (onVerb) {
            this.components.intensifier.onVerb = true;
        } else if (adj) {
            this.components.intensifier.targetAdjective = adj;
        }
        this.components.intensifier.active = true;
        return this;
    }

    private _applyVerbModifications(): ModifiedWordEntry {
        const modifiedVerb = applyVerbModifiers(this.components.verb!, {
            affix: this.components.verbModifiers.affix,
            modality: this.components.verbModifiers.modality,
            modalityNegated: this.components.verbModifiers.negated,
            addIntensifier: this.components.intensifier.active && this.components.intensifier.onVerb
        });
        this.components._modifiedVerb = modifiedVerb;
        return modifiedVerb;
    }

    private _applyBoundary(parts: string[]): string[] {
        if (parts.length === 0) return parts;
        const lastIdx = parts.length - 1;
        if (!this._isSpecialMarker(parts[lastIdx])) {
            parts[lastIdx] = applyAffix(parts[lastIdx], "AL");
        }
        return parts;
    }

    private _isSpecialMarker(text: string): boolean {
        return SPECIAL_MARKERS.some(m => text === m || text.endsWith(m));
    }

    private _buildVerbStructure(modifiers: VerbModifiers, hasIntensifier: boolean): string {
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

    private _buildTranslation(baseTrans: string, prefix: string | null = null, suffix: string | null = null): string {
        if (!baseTrans) return "";

        const prefixPart = prefix ? `[${prefix}] - ` : "";
        const suffixPart = suffix ? `-${suffix}` : "";

        return `${prefixPart}[${baseTrans}${suffixPart}]`;
    }

    private _getAffixTranslations(modifiers: VerbModifiers | ModifiedWordEntry | null, isWord: boolean = false): [string | null, string | null] {
        if (!modifiers) return [null, null];

        let prefix: string | null = null;
        let suffix: string | null = null;

        if (isWord) {
            const mod = modifiers as ModifiedWordEntry;
            if (mod._modalityNegated && mod._appliedModality) {
                const prefixKey = mod._appliedModality === "can" ? "YOR" : "KOTAK";
                prefix = _getAffixTranslation(prefixKey);
            } else if (mod._appliedModality) {
                prefix = _getAffixTranslation(mod._appliedModality.toUpperCase());
            } else if (mod._appliedPrefix) {
                prefix = _getAffixTranslation(mod._appliedPrefix);
            }
            if (mod._appliedSuffix) {
                suffix = _getAffixTranslation(mod._appliedSuffix);
            }
        } else {
            const mod = modifiers as VerbModifiers;
            if (mod.modality) {
                const prefixKey = mod.negated
                    ? (mod.modality === "can" ? "YOR" : "KOTAK")
                    : mod.modality.toUpperCase();
                prefix = _getAffixTranslation(prefixKey);
            } else if (mod.affix) {
                prefix = _getAffixTranslation(mod.affix);
            }
        }

        return [prefix, suffix];
    }

    private _addWord(
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
        translation.push(this._buildTranslation(transText, prefix, suffix));
    }

    build(): { gawekiif: string; translation: string; structure: string; components: SentenceComponents } {
        const gawekiif: string[] = [];
        const structure: string[] = [];
        const translation: string[] = [];

        if (this.components.time) {
            const time = this.components.time;
            this._addWord(gawekiif, structure, translation, time.gawekiif, "T", time.translation);
        }

        const verbAdjectives = this.components.words.filter(w =>
            w.position === WordPosition.VERB && w.isAdjective
        );
        this._outputAdjectives(verbAdjectives, gawekiif, structure, translation);

        const modifiedVerb = this._applyVerbModifications();
        const modifiers = this.components.verbModifiers;
        const [verbPrefix, verbSuffix] = this._getAffixTranslations(modifiers);
        const hasIntensifier = this.components.intensifier.active && this.components.intensifier.onVerb;
        this._addWord(gawekiif, structure, translation, modifiedVerb.gawekiif, this._buildVerbStructure(modifiers, hasIntensifier), modifiedVerb.translation, verbPrefix, verbSuffix);

        if (this.components.evidentialVp) {
            const ev = this.components.evidentialVp;
            this._addWord(gawekiif, structure, translation, ev.gawekiif, "EVI", ev.translation);
        }

        this._buildObjectPhrase(gawekiif, structure, translation);

        if (this.components.question.isQuestion) {
            const marker = this.components.question.isYesno ? INTERROGATIVE_YESNO : INTERROGATIVE_CONTENT;
            const structLabel = this.components.question.isYesno ? "CEZ" : "TACE";
            const markerTrans = this.components.question.isYesno ? "YES/NO_Q" : "CONTENT_Q";
            this._addWord(gawekiif, structure, translation, marker, structLabel, markerTrans);
        } else {
            this._addWord(gawekiif, structure, translation, SUBJECT_MARKER, "⺓", "⺓");
        }

        if (this.components.evidentialSentence) {
            const ev = this.components.evidentialSentence;
            this._addWord(gawekiif, structure, translation, ev.gawekiif, "EVI", ev.translation);
        }

        this._buildSubjectPhrase(gawekiif, structure, translation);

        return {
            gawekiif: `${gawekiif.join(` ${WORD_SEP} `)} ${SENTENCE_CLOSER}`,
            translation: translation.join(" "),
            structure: structure.join(" "),
            components: this.components
        };
    }

    private _outputAdjectiveEntry(
        adjEntry: SentenceWordEntry,
        gawekiif: string[],
        structure: string[],
        translation: string[],
        intensifierApplied: boolean
    ): { gaw: string; struct: string; translationText: string; intensifierApplied: boolean } {
        const addIntensifier = this.components.intensifier.active &&
            !this.components.intensifier.onVerb &&
            !intensifierApplied;
        if (addIntensifier) intensifierApplied = true;

        const gaw = addIntensifier ? applyAffix(adjEntry.word.gawekiif, "KOZ") : adjEntry.word.gawekiif;

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
            this._applyBoundary(gawekiif);
            this._applyBoundaryToStructure(structure);
        }

        let translationText = adjEntry.word.translation;
        if (prefixTranslation && !adjEntry.word.translation.startsWith(`[${prefixTranslation}]`)) {
            translationText = `[${prefixTranslation}] - ${adjEntry.word.translation}`;
        }

        this._addWord(gawekiif, structure, translation, gaw, struct, translationText, null, suffix);

        return { gaw, struct, translationText, intensifierApplied };
    }

    private _outputAdjectives(
        adjectives: SentenceWordEntry[],
        gawekiif: string[],
        structure: string[],
        translation: string[]
    ): void {
        if (!adjectives || adjectives.length === 0) return;

        let intensifierApplied = this.components.intensifier.active && this.components.intensifier.onVerb;

        for (const adjEntry of adjectives) {
            const result = this._outputAdjectiveEntry(adjEntry, gawekiif, structure, translation, intensifierApplied);
            intensifierApplied = result.intensifierApplied;
        }
    }

    private _buildObjectPhrase(gawekiif: string[], structure: string[], translation: string[]): void {
        this._buildPhrase(gawekiif, structure, translation, WordPosition.OBJECT, false);
    }

    private _buildSubjectPhrase(gawekiif: string[], structure: string[], translation: string[]): void {
        this._buildPhrase(gawekiif, structure, translation, WordPosition.SUBJECT, true);
    }

    private _buildPhrase(
        gawekiif: string[],
        structure: string[],
        translation: string[],
        position: WordPositionType,
        requireModifierAfterKal: boolean
    ): void {
        const words = this.components.words.filter(w => w.position === position);
        if (words.length === 0) return;

        let intensifierApplied = false;
        let pendingModifiers: SentenceWordEntry[] = [];
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
                    const result = this._outputModifierEntry(modEntry, gawekiif, structure, translation, intensifierApplied);
                    intensifierApplied = result.intensifierApplied;
                }
                pendingModifiers = [];

                if (entry.topicMarker) {
                    const markerTrans = entry.topicMarker === QU ? "THIS/TOPIC" : "THAT/FOCUS";
                    this._addWord(gawekiif, structure, translation, entry.topicMarker, "TOPIC", markerTrans);
                }

                if (entry.hasKalBefore && gawekiif.length > 0) {
                    this._addWord(gawekiif, structure, translation, KAL, "KAL", "KAL");
                    expectModifierAfterKal = requireModifierAfterKal;
                }

                this._addWord(gawekiif, structure, translation, entry.word.gawekiif,
                    this._getPositionLabel(entry.word, false), entry.word.translation);
            }
        }

        for (const modEntry of pendingModifiers) {
            this._outputModifierEntry(modEntry, gawekiif, structure, translation, intensifierApplied);
        }
    }

    private _outputModifierEntry(
        modEntry: SentenceWordEntry,
        gawekiif: string[],
        structure: string[],
        translation: string[],
        intensifierApplied: boolean
    ): { gaw: string; struct: string; translationText: string; intensifierApplied: boolean } {
        if (modEntry.isAdjective) {
            return this._outputAdjectiveEntry(modEntry, gawekiif, structure, translation, intensifierApplied);
        }
        this._addWord(gawekiif, structure, translation, modEntry.word.gawekiif,
            this._getPositionLabel(modEntry.word, false), modEntry.word.translation);
        return { gaw: modEntry.word.gawekiif, struct: "MOD", translationText: modEntry.word.translation, intensifierApplied };
    }

    private _getPositionLabel(word: WordEntry, isAdjective: boolean): string {
        if (isAdjective) return "ADJ";
        if (!word || !word.pos) return "N";
        return POS_TO_LABEL[word.pos] || "N";
    }

    private _applyBoundaryToStructure(structure: string[]): void {
        if (structure.length === 0) return;
        const lastIdx = structure.length - 1;
        if (!this._isSpecialMarker(structure[lastIdx])) {
            structure[lastIdx] += "-AL";
        }
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
function maybeApplyModifier(
    builder: SentenceBuilder,
    modifierFn: (b: SentenceBuilder) => SentenceBuilder,
    skipIfVerbAffix: boolean = false
): SentenceBuilder {
    if (Math.random() > 1 / 2) return builder;
    if (skipIfVerbAffix && (builder.components.verbModifiers.modality || builder.components.verbModifiers.affix)) return builder;
    return modifierFn(builder);
}

interface VNModifierOptions {
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
 * Structure: (Adj V) (Adj N) N for subject/object with VN modifier.
 * @param builder - Builder to modify.
 * @param options - Optional configuration.
 * @returns Modified builder.
 */
function applyVNModifierUnified(builder: SentenceBuilder, options: VNModifierOptions = {}): SentenceBuilder {
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
        _addVNModifier(builder, WordPosition.OBJECT, modifierOptions);
    }

    if (applyToSubject) {
        _addVNModifier(builder, WordPosition.SUBJECT, modifierOptions);
    }

    return builder;
}

/**
 * Add a VN modifier sequence to a position.
 * VN is V and N - each can have their own modifiers (adjectives, affixes, modality).
 * VN acts as a modifier and comes BEFORE the head noun it modifies.
 * Structure: (Adj) V (Adj) N - where the entire VN sequence modifies the following head noun.
 * @param builder - Builder to modify.
 * @param position - WordPosition to add to.
 * @param options - Modifier options.
 */
function _addVNModifier(builder: SentenceBuilder, position: WordPositionType, options: VNModifierOptions): void {
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

    const modifiedVerb = applyVerbModifiers(vnVerb, {
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
            const adj = createAdjective("Noun");
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
            const adj = createAdjective("Noun");
            if (adj) {
                builder.components.words.unshift({
                    word: adj, position, isAdjective: true, hasKalBefore: false, topicMarker: null
                });
            }
        }
    }

}

interface BaseSentenceComponents {
    verb: WordEntry;
    obj: WordEntry;
    subj: WordEntry;
}

/**
 * Get base sentence components (V, O, S).
 * @returns Base components or null.
 */
function getBaseSentenceComponents(): BaseSentenceComponents | null {
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
function maybeAddTemporal(builder: SentenceBuilder): SentenceBuilder {
    return maybeApplyModifier(builder, (b) => {
        const timeWord = getWordByPos("Noun");
        if (timeWord) {
            const temporalGawekiif = applyAffix(timeWord.gawekiif, "STIF");
            b.setTemporal({ gawekiif: temporalGawekiif, translation: timeWord.translation, pos: timeWord.pos });
        }
        return b;
    });
}

interface AdjectiveOptions {
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
function applyAdjectives(builder: SentenceBuilder, base: BaseSentenceComponents, options: AdjectiveOptions = {}): SentenceBuilder {
    const { useAdjectivizer = false, skipRandom = false } = options;

    if (!skipRandom && Math.random() > 1 / 2) {
        return builder;
    }

    const positions: WordPositionType[] = [WordPosition.VERB, WordPosition.OBJECT, WordPosition.SUBJECT];

    for (const pos of positions) {
        const adjCount = Math.floor(Math.random() * 3);

        for (let i = 0; i < adjCount; i++) {
            let adj: WordEntry | null = null;

            if (useAdjectivizer) {
                adj = createAdjective("Noun");
            } else {
                adj = getWordByPos("Adjective");
                if (!adj) {
                    adj = createAdjective("Noun");
                }
            }

            if (adj) {
                builder.addAdjectives([adj], pos);
            }
        }
    }

    return builder;
}

interface EvidentialOptions {
    addVpEvidential?: boolean;
    addSentenceEvidential?: boolean;
    evidential?: WordEntry | null;
}

/**
 * Unified evidential function - applies evidential to VP or sentence scope.
 * @param builder - Builder to modify.
 * @param options - Optional configuration.
 * @returns Modified builder.
 */
function applyEvidentialUnified(builder: SentenceBuilder, options: EvidentialOptions = {}): SentenceBuilder {
    const {
        addVpEvidential = true,
        addSentenceEvidential = false,
        evidential = null
    } = options;

    const ev = evidential || getWordByPos("Evidential");
    if (!ev) return builder;

    if (addVpEvidential) {
        builder.setEvidentialVp(ev);
    }

    if (addSentenceEvidential) {
        builder.setEvidentialSentence(ev);
    }

    return builder;
}

/**
 * Optionally add unified evidential to VP or sentence scope.
 * @param builder - Builder to modify.
 * @returns Modified builder.
 */
function maybeAddEvidentialUnified(builder: SentenceBuilder): SentenceBuilder {
    return maybeApplyModifier(builder, (b) => {
        const useVp = Math.random() < 1 / 2;
        return applyEvidentialUnified(b, {
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
function maybeAddModality(builder: SentenceBuilder): SentenceBuilder {
    return maybeApplyModifier(builder, (b) => {
        const modalities: [string, boolean][] = [
            ["can", false],
            ["can", true],
            ["should", false],
            ["should", true]
        ];
        const [modality, negated] = modalities[Math.floor(Math.random() * modalities.length)];
        b.setVerb(b.components.verb!, null, modality, negated);
        return b;
    });
}

/**
 * Optionally add negation (KON-).
 * @param builder - Builder to modify.
 * @returns Modified builder.
 */
function maybeAddNegation(builder: SentenceBuilder): SentenceBuilder {
    return maybeApplyModifier(builder, (b) => {
        if (b.components.verbModifiers.modality) return b;
        b.setVerb(b.components.verb!, "KON");
        return b;
    });
}

interface IntensifierOptions {
    onVerb?: boolean;
}

/**
 * Optionally add intensifier to object adjective or verb.
 * @param builder - Builder to modify.
 * @param options - Optional configuration.
 * @returns Modified builder.
 */
function maybeAddIntensifier(builder: SentenceBuilder, options: IntensifierOptions = {}): SentenceBuilder {
    const { onVerb = false } = options;

    if (onVerb) {
        return maybeApplyModifier(builder, (b) => {
            b.setIntensifier(null, true);
            return b;
        });
    }

    const hasObjectAdj = builder.components.words.some(w =>
        w.position === WordPosition.OBJECT && w.isAdjective
    );
    if (!hasObjectAdj) return builder;

    return maybeApplyModifier(builder, (b) => {
        b.setIntensifier(b.components.intensifier.targetAdjective || null, false);
        return b;
    });
}

interface VerbAffixOptions {
    affixType?: string;
    skipIfVerbModified?: boolean;
}

/**
 * Unified verb affix function - applies verb affixes (passive, inchoative, etc.).
 * @param builder - Builder to modify.
 * @param options - Optional configuration.
 * @returns Modified builder.
 */
function applyVerbAffixUnified(builder: SentenceBuilder, options: VerbAffixOptions = {}): SentenceBuilder {
    const {
        affixType = "L6R",
        skipIfVerbModified = true
    } = options;

    if (skipIfVerbModified && (builder.components.verbModifiers.modality || builder.components.verbModifiers.affix)) {
        return builder;
    }

    builder.setVerb(builder.components.verb!, affixType);
    return builder;
}

/**
 * Optionally add unified verb affix (passive, inchoative, etc.).
 * @param builder - Builder to modify.
 * @param affixType - Affix type (randomly selected if not provided).
 * @returns Modified builder.
 */
function maybeAddVerbAffixUnified(builder: SentenceBuilder, affixType: string | null = null): SentenceBuilder {
    if (!affixType) {
        const affixes = ["L6R", "B6N"];
        affixType = affixes[Math.floor(Math.random() * affixes.length)];
    }
    return maybeApplyModifier(builder, (b) => {
        return applyVerbAffixUnified(b, { affixType });
    }, true);
}

interface CoordinatedElementsOptions {
    coordinateObjects?: boolean;
    coordinateSubjects?: boolean;
    object2?: WordEntry | null;
    subject2?: WordEntry | null;
}

/**
 * Coordinated elements function - adds coordinated objects and subjects.
 * For objects: N KAL N (simple coordination allowed)
 * For subjects: N KAL (modifier) N - after KAL, must have adjective or V N modifier
 * Structure: V O₁ KAL O₂ ⺓ S₁ KAL (Adj/V N) S₂
 * @param builder - Builder to modify.
 * @param options - Optional configuration.
 * @returns Modified builder.
 */
function applyCoordinatedElementsUnified(builder: SentenceBuilder, options: CoordinatedElementsOptions = {}): SentenceBuilder {
    const {
        coordinateObjects = true,
        coordinateSubjects = true,
        object2 = null,
        subject2 = null
    } = options;

    if (coordinateObjects) {
        const obj2 = object2 || getWordByPos("Noun");
        if (obj2) {
            builder.addCoordinatedWord(obj2, WordPosition.OBJECT, true);
        }
    }

    if (coordinateSubjects) {
        const subj2 = subject2 || getWordByPos("Noun");
        if (subj2) {
            const adj = getWordByPos("Adjective") || createAdjective("Noun");
            if (adj) {
                builder.addAdjectives([adj], WordPosition.SUBJECT);
            }
            builder.addCoordinatedWord(subj2, WordPosition.SUBJECT, true);
        }
    }

    return builder;
}

/**
 * Optionally add unified coordinated elements to both objects and subjects.
 * @param builder - Builder to modify.
 * @returns Modified builder.
 */
function maybeAddCoordinatedElementsUnified(builder: SentenceBuilder): SentenceBuilder {
    return maybeApplyModifier(builder, (b) => {
        return applyCoordinatedElementsUnified(b, {
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
function maybeAddUnifiedVNModifier(builder: SentenceBuilder): SentenceBuilder {
    return maybeApplyModifier(builder, (b) => {
        const addVerbAffix = Math.random() > 1 / 2;
        const addModality = !addVerbAffix && Math.random() > 1 / 2;
        const addIntensifier = Math.random() > 1 / 2;
        const addVerbAdjectives = Math.random() > 1 / 2;
        const addNounAdjectives = Math.random() > 1 / 2;

        return applyVNModifierUnified(b, {
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
function maybeAddTopicMarkers(builder: SentenceBuilder): SentenceBuilder {
    return maybeApplyModifier(builder, (b) => {
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

interface EnabledModifiers {
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
function maybeAddQuestion(builder: SentenceBuilder, enabledModifiers: EnabledModifiers): SentenceBuilder {
    if (!enabledModifiers.question) return builder;
    return maybeApplyModifier(builder, (b) => {
        const isYesno = Math.random() < 1 / 2;
        b.setQuestion(isYesno);
        return b;
    });
}

interface SentenceResult {
    gawekiif: string;
    translation: string;
    structure: string;
    components: SentenceComponents;
}

/**
 * Main sentence generator - builds sentence with random optional modifiers.
 * Uses unified word system - all words added via builder.addWord().
 * @param structure - Specific structure (unused in modular system).
 * @param enabledModifiers - Which modifiers are enabled.
 * @returns Sentence data or null.
 */
function generateSentence(structure: string | null = null, enabledModifiers: EnabledModifiers = {}): SentenceResult | null {
    if (structure) {
        const result = registry.generate(structure);
        if (result && typeof result === "object" && "gawekiif" in result) {
            return result as SentenceResult;
        }
    }

    const base = getBaseSentenceComponents();
    if (!base) {
        return null;
    }

    let builder = new SentenceBuilder()
        .setStructureName("modular")
        .setVerb(base.verb)
        .addWord(base.obj, WordPosition.OBJECT)
        .addWord(base.subj, WordPosition.SUBJECT);

    if (enabledModifiers.temporal !== false) builder = maybeAddTemporal(builder);
    if (enabledModifiers.evidential !== false) builder = maybeAddEvidentialUnified(builder);
    if (enabledModifiers.modality !== false) builder = maybeAddModality(builder);
    if (enabledModifiers.negation !== false) builder = maybeAddNegation(builder);
    if (enabledModifiers.verbAffix !== false) builder = maybeAddVerbAffixUnified(builder);
    if (enabledModifiers.adjectivizer) {
        if (Math.random() > 1 / 2) {
            builder = applyAdjectives(builder, base, { useAdjectivizer: true, skipRandom: true });
        }
    } else if (enabledModifiers.adjectives !== false) {
        builder = applyAdjectives(builder, base, { useAdjectivizer: false, skipRandom: false });
    }

    if (enabledModifiers.intensifier !== false) {
        const onVerb = Math.random() < 1 / 2;
        builder = maybeAddIntensifier(builder, { onVerb });
    }
    if (enabledModifiers.vnModifier !== false) builder = maybeAddUnifiedVNModifier(builder);
    if (enabledModifiers.coordinated !== false) builder = maybeAddCoordinatedElementsUnified(builder);
    if (enabledModifiers.topicMarker !== false) builder = maybeAddTopicMarkers(builder);
    if (enabledModifiers.question !== false) builder = maybeAddQuestion(builder, enabledModifiers);

    return builder.build();
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
    const enabledModifiers: EnabledModifiers = {
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
        id: keyof EnabledModifiers;
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
        const structures = registry.getStructures();

        knox2pewaSwesukw2q.innerHTML = "";

        const anyLabel = document.createElement("label");
        const anyRadio = document.createElement("input");
        anyRadio.type = "radio";
        anyRadio.name = "structure";
        anyRadio.className = "ca12nasukf2qu";
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
            radio.className = "ca12nasukf2qu";
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
            const sentence = generateSentence(selectedStructure || null, enabledModifiers);

            if (!sentence) {
                showError("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Failed to generate sentence. Dictionary may be empty.");
            } else {
                if (structureEl) structureEl.textContent = sentence.structure;
                if (gawekiifEl) {
                    gawekiifEl.textContent = sentence.gawekiif;
                    if (typeof (window as unknown as Record<string, unknown>).vacepu === "function") {
                        ((window as unknown as Record<string, unknown>).vacepu as (id: string) => void)("ox2pewa");
                    }
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
                console.log("Dictionary loaded successfully. Ready to generate sentences.");
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
    registry,
    SentenceBuilder,
    SentenceComponents,
    WordPosition,
    getBaseSentenceComponents,
    generateSentence,
    initSentenceGeneratorUI,
    loadDictionary,
    loadDictionaryWithFallback,
    applyAffix,
    applyVerbModifiers,
    isVowelInitial,
    isVowelFinal,
    containsIikrhiaScript,
    determinePos,
    isAdjectivizingAffix,
    hasAdjectivizingPrefix,
    getL6RUsage,
    isVerb,
    getConflictingPrefix,
    getRandomAdjectivizingPrefix,
    applyAdjectivizingPrefix,
    createAdjective,
    applyAdjectives,
    applyVNModifierUnified,
    maybeAddUnifiedVNModifier,
    maybeAddTopicMarkers,
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
export type { WordEntry, ModifiedWordEntry, VerbModifierOptions, VNModifierOptions, EnabledModifiers, SentenceResult };
