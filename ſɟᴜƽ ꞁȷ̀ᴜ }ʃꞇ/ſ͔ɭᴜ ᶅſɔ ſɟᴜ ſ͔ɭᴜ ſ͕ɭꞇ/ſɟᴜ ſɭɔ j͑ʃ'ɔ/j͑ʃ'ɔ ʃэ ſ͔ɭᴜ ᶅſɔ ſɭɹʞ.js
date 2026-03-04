// ≺⧼ Iikze Writing System Converter 📜 ⧽≻
/**
 * Converts between Gawekiif, La3os, and IPA writing systems
 * - Gawekiif - Native script with initial and internal forms
 * - La3os - Romanized transcription (uses numerical shorthand: 1=ts, 2=ii, 3=tl, 4=au, 5=kz, 6=aa, 7=ou, 0=eu)
 * - IPA - International Phonetic Alphabet
 */


// ⟪ Constants 📦 ⟫

const NUMERICAL = { "ts": "1", "ii": "2", "tl": "3", "au": "4", "kz": "5", "aa": "6", "ou": "7", "eu": "0" };
const NUMERICAL_REVERSE = { "1": "ts", "2": "ii", "3": "tl", "4": "au", "5": "kz", "6": "aa", "7": "ou", "0": "eu" };

const VOWELS_SORTED = [ "ii", "aa", "eu", "ou", "au", "i", "e", "a", "u", "o", "2", "6", "0", "7", "4" ].sort( ( a, b ) => b.length - a.length );


// ⟪ Unified Mappings 🗺️ ⟫

const INITIALS = [
    { gk: "ᶅſ", la3os: "w", ipa: "ⱱ" },
    { gk: "ſן", la3os: "p", ipa: "p" },
    { gk: "ſȷ", la3os: "f", ipa: "ɸ" },
    { gk: "ʃ", la3os: "b", ipa: "xʷ" },
    { gk: "ŋᷠ", la3os: "m", ipa: "m" },
    { gk: "ɽ͑ʃ'", la3os: "r", ipa: "ɾ̪" },
    { gk: "j͑ʃ'", la3os: "v", ipa: "θ" },
    { gk: "ɭʃ", la3os: "t", ipa: "t" },
    { gk: "ɭ(", la3os: "d", ipa: "s̪" },
    { gk: "ſᶘ", la3os: "1", ipa: "ts" },
    { gk: "j͑ʃ", la3os: "s", ipa: "s" },
    { gk: "}ʃ", la3os: "n", ipa: "n" },
    { gk: "ſ̀ȷ", la3os: "3", ipa: "tɬ" },
    { gk: "j͐ʃ", la3os: "l", ipa: "ɬ" },
    { gk: "ſɭˬ", la3os: "5", ipa: "kʂ" },
    { gk: "ſɭ,", la3os: "z", ipa: "ʂ" },
    { gk: "ɭl̀", la3os: "j", ipa: "ɟ̆" },
    { gk: "ſɟ", la3os: "c", ipa: "c" },
    { gk: "ı],", la3os: "x", ipa: "ç" },
    { gk: "ſ͕ȷ", la3os: "y", ipa: "ɲ" },
    { gk: "ſ͔ɭ", la3os: "g", ipa: "xʲ" },
    { gk: "ſɭ", la3os: "k", ipa: "k" },
    { gk: "֭ſɭ", la3os: "h", ipa: "x" },
    { gk: "ſ͕ɭ", la3os: "q", ipa: "ŋ" },
    { gk: "ȏſן", la3os: "p'", ipa: "ʘ" },
    { gk: "ȏɭʃ'", la3os: "v'", ipa: "ǀ" },
    { gk: "ȏſ̀ȷ", la3os: "l'", ipa: "ǁ" },
    { gk: "ȏſɟ", la3os: "c'", ipa: "ǂ" },
    { gk: "ȏɭʃ", la3os: "t'", ipa: "ǃ" },
    { gk: "ȏŋᷠ", la3os: "m'", ipa: "ʘ̃" },
    { gk: "ȏ}ʃ'", la3os: "nv'", ipa: "ǀ̃" },
    { gk: "ȏoͩſ̀ȷ", la3os: "nl'", ipa: "ǁ̃" },
    { gk: "ȏſ͕ȷ", la3os: "y'", ipa: "ǂ̃" },
    { gk: "ȏ}ʃ", la3os: "n'", ipa: "ǃ̃" },
    { gk: "ꞁȷ̀", la3os: "", ipa: "" },
    { gk: "⺓", la3os: "piise", ipa: "pɪ̈sɛ" }
];

const INTERNALS = [
    { gk: "п́", la3os: "w", ipa: "ⱱ" },
    { gk: "ɘ", la3os: "p", ipa: "p" },
    { gk: "ʞ", la3os: "f", ipa: "ɸ" },
    { gk: "ɀ", la3os: "b", ipa: "xʷ" },
    { gk: "c̭", la3os: "m", ipa: "m" },
    { gk: "ƣ̋", la3os: "r", ipa: "ɾ̪" },
    { gk: "ⰱ", la3os: "v", ipa: "θ" },
    { gk: "ƨ", la3os: "t", ipa: "t" },
    { gk: "ԏ͕", la3os: "d", ipa: "s̪" },
    { gk: "ꝛ̗", la3os: "1", ipa: "ts" },
    { gk: "ɔ˞", la3os: "s", ipa: "s" },
    { gk: "c̗", la3os: "n", ipa: "n" },
    { gk: "ŋ", la3os: "3", ipa: "tɬ" },
    { gk: "ͷ̗", la3os: "l", ipa: "ɬ" },
    { gk: "ɯ", la3os: "5", ipa: "kʂ" },
    { gk: "ƴ", la3os: "z", ipa: "ʂ" },
    { gk: "ᴎ", la3os: "j", ipa: "ɟ̆" },
    { gk: "ᴜ̭", la3os: "c", ipa: "c" },
    { gk: "ᶗ‹", la3os: "x", ipa: "ç" },
    { gk: "ⱷ̮̀", la3os: "y", ipa: "ɲ" },
    { gk: "ɴ", la3os: "g", ipa: "xʲ" },
    { gk: "ƽ", la3os: "k", ipa: "k" },
    { gk: "ᴜ̩", la3os: "h", ipa: "x" },
    { gk: "ȝ", la3os: "q", ipa: "ŋ" },
    { gk: "ɘȏ", la3os: "p'", ipa: "ʘ" },
    { gk: "ⱷ᷐ȏ", la3os: "v'", ipa: "ǀ" },
    { gk: "ŋȏ", la3os: "l'", ipa: "ǁ" },
    { gk: "ᴜ̭ȏ", la3os: "c'", ipa: "ǂ" },
    { gk: "ƨȏ", la3os: "t'", ipa: "ǃ" },
    { gk: "c̭ȏ", la3os: "m'", ipa: "ʘ̃" },
    { gk: "c̏ȏ", la3os: "nv'", ipa: "ǀ̃" },
    { gk: "ŋoͩȏ", la3os: "nl'", ipa: "ǁ̃" },
    { gk: "ⱷ̮̀ȏ", la3os: "y'", ipa: "ǂ̃" },
    { gk: "c̗ȏ", la3os: "n'", ipa: "ǃ̃" },
    { gk: "ꞇ", la3os: "i", ipa: "i" },
    { gk: "ɔ", la3os: "e", ipa: "ɛ" },
    { gk: "ᴜ", la3os: "a", ipa: "a" },
    { gk: "w", la3os: "u", ipa: "ə" },
    { gk: "ɹ", la3os: "2", ipa: "ɪ̈" },
    { gk: "ɜ", la3os: "o", ipa: "ɤ" },
    { gk: "э", la3os: "6", ipa: "ɑ" },
    { gk: "ɔⅎ", la3os: "0", ipa: "ɛ̃" },
    { gk: "ɜⅎ", la3os: "7", ipa: "ɤ̃" },
    { gk: "эⅎ", la3os: "4", ipa: "ɑ̃" },
    { gk: "ᴜꞇ", la3os: "ai", ipa: "ə" }
];

const MAPPINGS = [ ...INITIALS, ...INTERNALS ];


// ⟪ Helper Functions 🔧 ⟫

/**
 * Check if text is empty or contains only whitespace/special characters
 * @param {string} text - Text to check
 * @returns {boolean} True if empty or whitespace
 */
function isEmptyOrWhitespace(text) {
    return !text || /^[ ʌ-]*$/.test(text);
}

/**
 * Split text by whitespace into non-empty parts
 * @param {string} text - Text to split
 * @returns {string[]} Array of non-empty parts
 */
function splitByWhitespace(text) {
    return text.toLowerCase().split(/\s+/).filter(Boolean);
}

/**
 * Build a lookup table from an array of mapping objects
 * @param {Array} items - Array of mapping objects
 * @param {string} sourceKey - Key for source property
 * @param {string} targetKey - Key for target property
 * @param {boolean} skipExisting - Skip if target already exists (for non-overwrite)
 * @returns {Object} Lookup table with map and sorted keys
 */
function buildLookup(items, sourceKey, targetKey, skipExisting = false) {
    const lookup = { map: {}, keys: [] };
    for ( const m of items ) {
        const src = m[sourceKey];
        const tgt = m[targetKey];
        if ( src && tgt !== undefined ) {
            if ( !skipExisting || !lookup.map[src] ) {
                lookup.map[src] = tgt;
            }
        }
    }
    lookup.keys = Object.keys(lookup.map).sort((a, b) => b.length - a.length);
    return lookup;
}


// ⟪ Lookup Tables 🔍 ⟫

const LOOKUP = {
    gk_la3os: buildLookup(MAPPINGS, 'gk', 'la3os'),
    gk_ipa: buildLookup(MAPPINGS, 'gk', 'ipa'),
    la3os_gk_initial: buildLookup(INITIALS, 'la3os', 'gk'),
    la3os_gk_internal: buildLookup(INTERNALS, 'la3os', 'gk'),
    la3os_ipa: buildLookup(INITIALS, 'la3os', 'ipa'),
    ipa_la3os: buildLookup([...INITIALS, ...INTERNALS], 'ipa', 'la3os')
};

for ( const m of INTERNALS ) {
    if ( m.la3os && m.ipa && !LOOKUP.la3os_ipa.map[m.la3os] ) {
        LOOKUP.la3os_ipa.map[m.la3os] = m.ipa;
    }
}
LOOKUP.la3os_ipa.keys = Object.keys(LOOKUP.la3os_ipa.map).sort((a, b) => b.length - a.length);


// ⟪ Helper Functions (continued) 🔧 ⟫

/**
 * Normalize La3os input to numerical shorthand
 * @param {string} text - Input text
 * @returns {string} Text with numerical digits
 */
function normalizeLa3osInput(text) {
    return convertLa3osToNumerical(text);
}

/**
 * Convert text using a lookup map ( longest-first matching )
 * @param {string} text - Input text
 * @param {Object} lookup - Lookup table
 * @returns {string} Converted text
 */
function convertWithLookup(text, lookup) {
    if ( !lookup || !lookup.keys ) return text;

    let result = "";
    let i = 0;
    while ( i < text.length ) {
        let matched = false;
        for ( const key of lookup.keys ) {
            if ( text.slice(i, i + key.length) === key ) {
                result += lookup.map[key];
                i += key.length;
                matched = true;
                break;
            }
        }
        if ( !matched ) { result += text[i]; i++; }
    }
    return result;
}

/**
 * Convert numerical shorthand to multi-character La3os
 * @param {string} text - Text with numerical digits
 * @returns {string} Text with multi-character clusters
 */
function convertNumericalToLa3os(text) {
    let result = "";
    for ( const char of text ) {
        result += NUMERICAL_REVERSE[char] || char;
    }
    return result;
}

/**
 * Convert multi-character La3os to numerical shorthand
 * @param {string} text - Text with multi-character clusters or numerical
 * @returns {string} Text with numerical digits
 */
function convertLa3osToNumerical(text) {
    let result = text;
    const sortedClusters = Object.entries(NUMERICAL).sort((a, b) => b[0].length - a[0].length);
    for ( const [ cluster, digit ] of sortedClusters ) {
        result = result.replaceAll(cluster, digit);
    }
    return result;
}

/**
 * Convert numerical to IPA ( via La3os )
 * @param {string} text - Numerical text
 * @param {Object} opts - Options - { literal? }
 * @returns {string} IPA text
 */
function numericalToIpa(text, opts = {}) {
    return la3osToIpa(convertNumericalToLa3os(text), opts);
}

/**
 * Convert IPA to numerical ( via La3os )
 * @param {string} text - IPA text
 * @param {Object} opts - Options - { literal? }
 * @returns {string} Numerical text
 */
function ipaToNumerical(text, opts = {}) {
    return convertLa3osToNumerical(ipaToLa3os(text, opts));
}

/**
 * Convert numerical directly to Gawekiif
 * @param {string} text - Numerical text
 * @param {Object} opts - Options - { literal? }
 * @returns {string} Gawekiif text
 */
function numericalToGawekiif(text, opts = {}) {
    return la3osToGawekiif(convertNumericalToLa3os(text), opts);
}

/**
 * Convert Gawekiif directly to numerical
 * @param {string} text - Gawekiif text
 * @param {Object} opts - Options - { literal? }
 * @returns {string} Numerical text
 */
function gawekiifToNumerical(text, opts = {}) {
    return convertLa3osToNumerical(gawekiifToLa3os(text, opts));
}

/**
 * Find vowel match at position
 * @param {string} text - Text to search
 * @param {number} pos - Position to start
 * @returns {Object|null} Match object or null
 */
function findVowelAt(text, pos) {
    for ( const v of VOWELS_SORTED ) {
        if ( text.slice(pos).startsWith(v) ) {
            return { vowel: v, len: v.length };
        }
    }
    return null;
}

/**
 * Split a La3os string into syllables based on vowel positions
 * @param {string} text - Input text
 * @returns {string} Space-separated syllables
 */
function splitIntoSyllables(text) {
    if ( !text ) return "";
    if ( text.includes(" ") ) return text;

    const vowelPositions = [];
    let i = 0;
    while ( i < text.length ) {
        const match = findVowelAt(text, i);
        if ( match ) {
            vowelPositions.push({ pos: i, len: match.len });
            i += match.len;
        } else {
            i++;
        }
    }

    if ( vowelPositions.length <= 1 ) return text;

    const result = [];
    for ( let j = 0; j < vowelPositions.length; j++ ) {
        const match = vowelPositions[j];
        const start = j === 0 ? 0 : vowelPositions[j - 1].pos + vowelPositions[j - 1].len;
        const end = j < vowelPositions.length - 1 ? match.pos + match.len : text.length;
        const syllable = text.slice(start, end);
        if ( syllable ) result.push(syllable);
    }

    return result.join(" ");
}

/**
 * Convert a single La3os syllable to Gawekiif
 * @param {string} syl - Syllable to convert
 * @returns {string} Gawekiif syllable
 */
function convertSyllable(syl) {
    if ( isEmptyOrWhitespace(syl) ) return "";

    const initialLookup = LOOKUP.la3os_gk_initial;
    const internalLookup = LOOKUP.la3os_gk_internal;

    if ( !initialLookup?.map || !internalLookup?.map ) return "ꞁȷ̀";
    if ( internalLookup.map[syl] ) return internalLookup.map[syl];

    let result = "";
    let i = 0;
    let isFirstConsonant = true;

    while ( i < syl.length ) {
        if ( findVowelAt(syl, i) ) break;

        let matched = false;
        const lookup = isFirstConsonant ? initialLookup : internalLookup;

        for ( const key of lookup.keys ) {
            if ( syl.slice(i).startsWith(key) ) {
                result += lookup.map[key];
                i += key.length;
                isFirstConsonant = false;
                matched = true;
                break;
            }
        }
        if ( !matched ) break;
    }

    const vowelMatch = findVowelAt(syl, i);
    if ( vowelMatch ) {
        const vowelGk = internalLookup.map[vowelMatch.vowel];
        if ( vowelGk ) result += vowelGk;
        i += vowelMatch.len;
    }

    if ( internalLookup.keys ) {
        while ( i < syl.length ) {
            let matched = false;
            for ( const key of internalLookup.keys ) {
                if ( VOWELS_SORTED.includes(key) ) continue;
                if ( syl.slice(i).startsWith(key) ) {
                    result += internalLookup.map[key];
                    i += key.length;
                    matched = true;
                    break;
                }
            }
            if ( !matched ) i++;
        }
    }

    if ( result && findVowelAt(syl, 0) && !result.startsWith("ꞁȷ̀") ) {
        result = "ꞁȷ̀" + result;
    }

    return result || "ꞁȷ̀";
}

/**
 * Convert a La3os word to Gawekiif
 * @param {string} word - Word to convert
 * @returns {string} Gawekiif word
 */
function convertWord(word) {
    if ( isEmptyOrWhitespace(word) ) return "";

    return splitByWhitespace(word).map(s => {
        return splitIntoSyllables(s).split(/\s+/).map(convertSyllable).join(" ");
    }).join(" ");
}


// ⟪ Conversion Functions 🔄 ⟫

/**
 * Convert Gawekiif to another format (La3os or IPA)
 * @param {string} text - Gawekiif text
 * @param {Object} lookup - Target lookup table
 * @param {Object} opts - Options - { literal?, capitalize?, syllableSeparator?, useNumerical? }
 * @returns {string} Converted text
 */
function convertGawekiif(text, lookup, opts = {}) {
    const { literal = false, capitalize = false, syllableSeparator = " ", useNumerical = true } = opts;

    const wordParts = String(text).split("ʌ");

    const converted = wordParts.map(word => {
        const syllables = splitByWhitespace(word);
        const convertedSyllables = syllables.map(syll => {
            let converted = convertWithLookup(syll, lookup);
            if ( capitalize ) converted = converted.replace(/^./, c => c.toUpperCase());
            return converted;
        });
        const separator = literal ? syllableSeparator : "";
        return convertedSyllables.join(separator);
    });

    const result = converted.join(" ");
    return useNumerical ? result : convertNumericalToLa3os(result);
}

/**
 * Convert Gawekiif to La3os
 * @param {string} text - Gawekiif text
 * @param {Object} opts - Options - { useNumerical?, literal? }
 * @returns {string} La3os text
 */
function gawekiifToLa3os(text, opts = {}) {
    return convertGawekiif(text, LOOKUP.gk_la3os, opts);
}

/**
 * Convert La3os to Gawekiif
 * @param {string} text - La3os text
 * @param {Object} opts - Options - { literal? }
 * @returns {string} Gawekiif text
 */
function la3osToGawekiif(text, opts = {}) {
    const normalizedText = normalizeLa3osInput(text);
    const words = splitByWhitespace(normalizedText);

    const result = words.map(w => {
        return convertWord(w);
    }).join("ʌ");

    return result;
}

/**
 * Convert syllables using a lookup table with separator handling
 * @param {string} text - Input text
 * @param {Object} lookup - Lookup table
 * @param {Object} opts - Options - { literal?, inputSeparator?, outputSeparator?, preProcess? }
 * @returns {string} Converted text
 */
function convertSyllables(text, lookup, opts = {}) {
    const { literal = false, inputSeparator = ".", outputSeparator = ".", preProcess = null } = opts;

    let processedText = preProcess ? preProcess(text) : text;
    const syllables = processedText.split(inputSeparator).map(s => s.trim()).filter(Boolean);
    const converted = syllables.map(syl => convertWithLookup(syl, lookup));

    return literal ? converted.join(outputSeparator) : converted.join("");
}

/**
 * Convert La3os to IPA
 * @param {string} text - La3os text
 * @param {Object} opts - Options - { literal? }
 * @returns {string} IPA text
 */
function la3osToIpa(text, opts = {}) {
    const { literal = false } = opts;
    const lookup = LOOKUP.la3os_ipa;

    const normalizedText = normalizeLa3osInput(text);
    const words = splitByWhitespace(normalizedText);
    const converted = words.map(word => {
        const syllables = splitByWhitespace(splitIntoSyllables(word));
        const ipaSyllables = syllables.map(syl => convertWithLookup(syl, lookup));
        return literal ? ipaSyllables.join(".") : ipaSyllables.join("");
    });

    return converted.join(" ");
}

/**
 * Convert IPA to La3os
 * @param {string} text - IPA text
 * @param {Object} opts - Options - { literal?, useNumerical? }
 * @returns {string} La3os text
 */
function ipaToLa3os(text, opts = {}) {
    const { literal = false, useNumerical = true } = opts;
    const lookup = LOOKUP.ipa_la3os;

    const syllables = text.split(".").map(s => s.trim()).filter(Boolean);
    const converted = syllables.map(syl => convertWithLookup(syl, lookup));

    const joined = literal ? converted.join(".") : converted.join("");
    return useNumerical ? joined : convertNumericalToLa3os(joined);
}

/**
 * Convert Gawekiif directly to IPA
 * @param {string} text - Gawekiif text
 * @param {Object} opts - Options - { literal? }
 * @returns {string} IPA text
 */
function gawekiifToIpa(text, opts = {}) {
    return convertGawekiif(text, LOOKUP.gk_ipa, { ...opts, syllableSeparator: "." });
}

/**
 * Convert IPA directly to Gawekiif
 * @param {string} text - IPA text
 * @param {Object} opts - Options - { literal? }
 * @returns {string} Gawekiif text
 */
function ipaToGawekiif(text, opts = {}) {
    const { literal = false } = opts;
    const lookup = LOOKUP.ipa_la3os;

    const words = literal ? text.split(".").map(s => s.trim()).filter(Boolean) : [text];

    const result = words.map(word => {
        const la3osSyl = convertWithLookup(word, lookup);
        return convertSyllable(la3osSyl);
    }).join("ʌ");

    return result;
}

/**
 * Convert between formats
 * @param {string} text - Input text
 * @param {string} from - Source format
 * @param {string} to - Target format
 * @param {Object} opts - Options - { useNumerical?, literal? }
 * @returns {string} Converted text
 */
function convert(text, from, to, opts = {}) {
    if ( from === to ) return text;

    const options = { useNumerical: opts.useNumerical ?? true, literal: opts.literal ?? false };

    const CONVERSIONS = {
        'gawekiif_la3os': () => gawekiifToLa3os(text, options),
        'la3os_gawekiif': () => la3osToGawekiif(text, options),
        'la3os_ipa': () => la3osToIpa(text, options),
        'ipa_la3os': () => ipaToLa3os(text, options),
        'gawekiif_ipa': () => gawekiifToIpa(text, options),
        'ipa_gawekiif': () => ipaToGawekiif(text, options),
        'numerical_la3os': () => convertNumericalToLa3os(text),
        'la3os_numerical': () => convertLa3osToNumerical(text),
        'numerical_ipa': () => numericalToIpa(text, options),
        'ipa_numerical': () => ipaToNumerical(text, options),
        'numerical_gawekiif': () => numericalToGawekiif(text, options),
        'gawekiif_numerical': () => gawekiifToNumerical(text, options)
    };

    const directKey = `${from}_${to}`;

    if ( CONVERSIONS[directKey] ) {
        return CONVERSIONS[directKey]();
    }

    return text;
}


// ⟪ Exports 📤 ⟫

if ( typeof module !== "undefined" && module.exports ) {
    module.exports = {
        MAPPINGS,
        INITIALS,
        INTERNALS,
        NUMERICAL,
        NUMERICAL_REVERSE,
        LOOKUP,
        convertWithLookup,
        convertNumericalToLa3os,
        convertLa3osToNumerical,
        numericalToIpa,
        ipaToNumerical,
        findVowelAt,
        splitIntoSyllables,
        convertSyllable,
        convertWord,
        gawekiifToLa3os,
        la3osToGawekiif,
        la3osToIpa,
        ipaToLa3os,
        gawekiifToIpa,
        ipaToGawekiif,
        numericalToGawekiif,
        gawekiifToNumerical,
        convert
    };
}


// ⟪ UI Initialization ( Browser ) 🖥️ ⟫

(function() {
    if ( typeof document === "undefined" ) return;

    function initConverterUI() {
        const saxesuOx2pewa = document.getElementById("saxesuOx2pewa");
        const maxemaSa10Gwk = document.getElementById("maxemaSa10Gwk");
        const outputs = {
            gk: document.getElementById("tlakakuG2"),
            la3os: document.getElementById("tlakakuLa3os"),
            ipa: document.getElementById("tlakakuRat0")
        };
        const checkboxes = {
            outGk: document.getElementById("a1a3kkG2"),
            outLa3os: document.getElementById("a1a3kkLa3os"),
            outIpa: document.getElementById("a1a3kkRat0"),
            numbers: document.getElementById("a1aK2reK2fe"),
            literal: document.getElementById("a1aKaj2xa")
        };
        const saxesuGawek2fRadios = document.getElementsByName("saxesuGawek2f");

        if ( !saxesuOx2pewa ) return;

        function getInputFormat() {
            if ( !saxesuGawek2fRadios || saxesuGawek2fRadios.length === 0 ) return "gawekiif";
            for ( const radio of saxesuGawek2fRadios ) {
                if ( radio.checked ) return radio.value;
            }
            return "gawekiif";
        }

        function convertText() {
            const text = saxesuOx2pewa.value.trim();
            if ( !text ) {
                if ( maxemaSa10Gwk ) maxemaSa10Gwk.style.display = "none";
                return;
            }

            const saxesuGawek2f = getInputFormat();
            const useNumerical = checkboxes.numbers?.checked ?? true;
            const opts = {
                useNumerical: useNumerical,
                literal: checkboxes.literal?.checked || false
            };

            const result = { gk: "", la3os: "", ipa: "" };

            if ( saxesuGawek2f === "gawekiif" ) {
                result.gk = text;
                result.la3os = convert(result.gk, "gawekiif", "la3os", opts);
                result.ipa = convert(result.gk, "gawekiif", "ipa", opts);
            } else if ( saxesuGawek2f === "la3os" ) {
                result.la3os = text;
                result.gk = convert(result.la3os, "la3os", "gawekiif", opts);
                result.ipa = convert(result.la3os, "la3os", "ipa", opts);
            } else {
                result.ipa = text;
                result.la3os = convert(result.ipa, "ipa", "la3os", opts);
                result.gk = convert(result.la3os, "la3os", "gawekiif", opts);
            }

            const outputKeys = [ "gk", "la3os", "ipa" ];
            const outputNames = { gk: "Gk", la3os: "La3os", ipa: "Ipa" };
            for ( const key of outputKeys ) {
                const checkbox = checkboxes[`out${outputNames[key]}`];
                const output = outputs[key];
                const title = document.querySelector(`.ksakap2sa[data-output="${key}"]`);
                const ciihii = output?.parentElement;
                if ( checkbox && output && ciihii ) {
                    output.textContent = result[key] || "";
                    if ( key === "gk" && typeof window.vacepu === "function" ) {
                        window.vacepu("ox2pewa");
                    }
                    const isVisible = checkbox.checked;
                    if ( title ) {
                        title.style.display = isVisible ? "block" : "none";
                    }
                    ciihii.style.display = isVisible ? "flex" : "none";
                }
            }

            if ( maxemaSa10Gwk ) maxemaSa10Gwk.style.display = "block";
        }

        const allElements = [
            saxesuOx2pewa,
            ...saxesuGawek2fRadios,
            checkboxes.outGk, checkboxes.outLa3os, checkboxes.outIpa,
            checkboxes.numbers, checkboxes.literal
        ].filter(Boolean);

        for ( const el of allElements ) {
            const eventType = el === saxesuOx2pewa ? "input" : "change";
            el.addEventListener(eventType, convertText);
        }
    }

    if ( document.readyState === "loading" ) {
        document.addEventListener("DOMContentLoaded", initConverterUI);
    } else {
        initConverterUI();
    }
})();
