// ≺⧼ Iikze Skribsistema Konvertilo 📜 ⧽≻
/**
 * Konvertas inter Gawekiif, La3os, kaj IPA skribsistemoj.
 * - Gawekiif - Denaska skribo kun komencaj kaj internaj formoj
 * - La3os - Romanigita transskribo (uzas numeralan stenografion. 1=ts, 2=ii, 3=tl, 4=au, 5=kz, 6=aa, 7=ou, 0=eu)
 * - IPA - Internacia Fonetika Alfabeto
 */


// ⟪ Konstantoj 📦 ⟫

const NUMERIKA: Record<string, string> = { "ts": "1", "ii": "2", "tl": "3", "au": "4", "kz": "5", "aa": "6", "ou": "7", "eu": "0" };
const NUMERIKA_MALO: Record<string, string> = { "1": "ts", "2": "ii", "3": "tl", "4": "au", "5": "kz", "6": "aa", "7": "ou", "0": "eu" };

const VOKALOJ_ORDIGITAJ: string[] = [ "ii", "aa", "eu", "ou", "au", "i", "e", "a", "u", "o", "2", "6", "0", "7", "4" ].sort( ( a, b ) => b.length - a.length );


// ⟪ Unuigitaj Mapoj 🗺️ ⟫

interface Mapo {
    gk: string;
    la3os: string;
    ipa: string;
}

const KOMENCAJ: Mapo[] = [
    { gk: "ᶅſ", la3os: "w", ipa: "ⱱ̥" },
    { gk: "ſן", la3os: "p", ipa: "p" },
    { gk: "ſȷ", la3os: "f", ipa: "ɸ" },
    { gk: "ʃ", la3os: "b", ipa: "ɸˠ" },
    { gk: "ŋᷠ", la3os: "m", ipa: "m̥" },
    { gk: "ɽ͑ʃ'", la3os: "r", ipa: "ɾ̪̥" },
    { gk: "j͑ʃ'", la3os: "v", ipa: "θ" },
    { gk: "ɭʃ", la3os: "t", ipa: "t" },
    { gk: "ɭ(", la3os: "d", ipa: "s̪" },
    { gk: "ſᶘ", la3os: "1", ipa: "ts" },
    { gk: "j͑ʃ", la3os: "s", ipa: "s" },
    { gk: "}ʃ", la3os: "n", ipa: "n̥" },
    { gk: "ſ̀ȷ", la3os: "3", ipa: "tɬ" },
    { gk: "j͐ʃ", la3os: "l", ipa: "ɬ" },
    { gk: "ſɭˬ", la3os: "5", ipa: "kʂ" },
    { gk: "ſɭ,", la3os: "z", ipa: "ʂ" },
    { gk: "ɭl̀", la3os: "j", ipa: "ɟ̥̆" },
    { gk: "ſɟ", la3os: "c", ipa: "c" },
    { gk: "ı],", la3os: "x", ipa: "ç" },
    { gk: "ſ͕ȷ", la3os: "y", ipa: "ɲ̥" },
    { gk: "ſ͔ɭ", la3os: "g", ipa: "xʲ" },
    { gk: "ſɭ", la3os: "k", ipa: "k" },
    { gk: "֭ſɭ", la3os: "h", ipa: "x" },
    { gk: "ſ͕ɭ", la3os: "q", ipa: "ŋ̥" },
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

const INTERNAJ: Mapo[] = [
    { gk: "п́", la3os: "w", ipa: "ⱱ̥" },
    { gk: "ɘ", la3os: "p", ipa: "p" },
    { gk: "ʞ", la3os: "f", ipa: "ɸ" },
    { gk: "ɀ", la3os: "b", ipa: "ɸˠ" },
    { gk: "c̭", la3os: "m", ipa: "m̥" },
    { gk: "ƣ̋", la3os: "r", ipa: "ɾ̪̥" },
    { gk: "ⰱ", la3os: "v", ipa: "θ" },
    { gk: "ƨ", la3os: "t", ipa: "t" },
    { gk: "ԏ͕", la3os: "d", ipa: "s̪" },
    { gk: "ꝛ̗", la3os: "1", ipa: "ts" },
    { gk: "ɔ˞", la3os: "s", ipa: "s" },
    { gk: "c̗", la3os: "n", ipa: "n̥" },
    { gk: "ŋ", la3os: "3", ipa: "tɬ" },
    { gk: "ͷ̗", la3os: "l", ipa: "ɬ" },
    { gk: "ɯ", la3os: "5", ipa: "kʂ" },
    { gk: "ƴ", la3os: "z", ipa: "ʂ" },
    { gk: "ᴎ", la3os: "j", ipa: "ɟ̥̆" },
    { gk: "ᴜ̭", la3os: "c", ipa: "c" },
    { gk: "ᶗ‹", la3os: "x", ipa: "ç" },
    { gk: "ⱷ̮̀", la3os: "y", ipa: "ɲ̥" },
    { gk: "ɴ", la3os: "g", ipa: "xʲ" },
    { gk: "ƽ", la3os: "k", ipa: "k" },
    { gk: "ᴜ̩", la3os: "h", ipa: "x" },
    { gk: "ȝ", la3os: "q", ipa: "ŋ̥" },
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

const MAPOJ: Mapo[] = [ ...KOMENCAJ, ...INTERNAJ ];


// ⟪ Helpaj Funkcioj 🔧 ⟫

interface Serxtabelo {
    map: Record<string, string>;
    keys: string[];
}

interface KonvertajOpcioj {
    laŭlitera?: boolean;
    majuskligi?: boolean;
    silabaDisigilo?: string;
    uziNumerikan?: boolean;
    enigaDisigilo?: string;
    eligaDisigilo?: string;
    antaŭprilabori?: ((teksto: string) => string) | null;
}

/**
 * Check if text is empty or contains only whitespace/special characters.
 * @param teksto ( string , required ) - Text to check.
 * @returns boolean
 */
function cxuMalplenaAUBlanko(teksto: string): boolean {
    return !teksto || /^[ ʌ-]*$/.test(teksto);
}

/**
 * Split text by whitespace into non-empty parts.
 * @param teksto ( string , required ) - Text to split.
 * @returns string[]
 */
function disigiPerSpacoj(teksto: string): string[] {
    return teksto.toLowerCase().split(/\s+/).filter(Boolean);
}

/**
 * Build a serxtabelo table from an array of mapping objects.
 * @param eroj ( T[] , required ) - Array of mapping objects.
 * @param fontoKlavo ( keyof T , required ) - Key for source property.
 * @param celoKlavo ( keyof T , required ) - Key for target property.
 * @param saltiEkzistantan ( boolean , optional ) - Skip if target already exists.
 * @returns Serxtabelo
 */
function konstruiSerxtabelon<T extends Mapo>(eroj: T[], fontoKlavo: keyof T, celoKlavo: keyof T, saltiEkzistantan = false): Serxtabelo {
    const serxtabelo: Serxtabelo = { map: {}, keys: [] };
    for ( const m of eroj ) {
        const fonto = m[fontoKlavo] as string;
        const celo = m[celoKlavo] as string;
        if ( fonto && celo !== undefined ) {
            if ( !saltiEkzistantan || !serxtabelo.map[fonto] ) {
                serxtabelo.map[fonto] = celo;
            }
        }
    }
    serxtabelo.keys = Object.keys(serxtabelo.map).sort((a, b) => b.length - a.length);
    return serxtabelo;
}


// ⟪ Serxtabeloj 🔍 ⟫

const SERXTABELO = {
    gk_la3os: konstruiSerxtabelon(MAPOJ, "gk", "la3os"),
    gk_ipa: konstruiSerxtabelon(MAPOJ, "gk", "ipa"),
    la3os_gk_initial: konstruiSerxtabelon(KOMENCAJ, "la3os", "gk"),
    la3os_gk_internal: konstruiSerxtabelon(INTERNAJ, "la3os", "gk"),
    la3os_ipa: konstruiSerxtabelon(KOMENCAJ, "la3os", "ipa"),
    ipa_la3os: konstruiSerxtabelon([...KOMENCAJ, ...INTERNAJ], "ipa", "la3os")
};

for ( const m of INTERNAJ ) {
    if ( m.la3os && m.ipa && !SERXTABELO.la3os_ipa.map[m.la3os] ) {
        SERXTABELO.la3os_ipa.map[m.la3os] = m.ipa;
    }
}
SERXTABELO.la3os_ipa.keys = Object.keys(SERXTABELO.la3os_ipa.map).sort((a, b) => b.length - a.length);


// ⟪ Bazo-8 Sistemoj 🔢 ⟫

// ⟨ Ciferoj de la oktala sistemo ( ɔ-ƨ = 0-7 ) kaj de la kodigo ( ɔ-⌅̊ = 0-F ) ⟩
const B8_CIFEROJ = [ "ɔ", "ı", "ɿ", "ц", "э", "ꞟ", "ɩ", "ƨ" ];
const B8_CIFEROJ_MALO: Record<string, number> = { "ɔ": 0, "ı": 1, "ɿ": 2, "ц": 3, "э": 4, "ꞟ": 5, "ɩ": 6, "ƨ": 7 };

const KODIGAJ_CIFEROJ = [ "ɔ", "ı", "ɿ", "ц", "э", "ꞟ", "ɩ", "ƨ", "ƨ̵", "ⱻ", "ɜ́", "ԏ", "u̵", "ᶔ", "ⲁ", "⌅̊" ];
const KODIGAJ_CIFEROJ_MALO: Record<string, number> = {
    "ɔ": 0, "ı": 1, "ɿ": 2, "ц": 3, "э": 4, "ꞟ": 5, "ɩ": 6, "ƨ": 7,
    "ƨ̵": 8, "ⱻ": 9, "ɜ́": 10, "ԏ": 11, "u̵": 12, "ᶔ": 13, "ⲁ": 14, "⌅̊": 15
};
const KODIGAJ_CIFEROJ_LAŬVALORO: Record<number, string> = {
    0: "ɔ", 1: "ı", 2: "ɿ", 3: "ц", 4: "э", 5: "ꞟ", 6: "ɩ", 7: "ƨ",
    8: "ƨ̵", 9: "ⱻ", 10: "ɜ́", 11: "ԏ", 12: "u̵", 13: "ᶔ", 14: "ⲁ", 15: "⌅̊"
};
const KODIGAJ_CIFEROJ_LAŬLONGO = [ ...KODIGAJ_CIFEROJ ].sort((a, b) => b.length - a.length);

// ⟨ Unua sistemo - la oktala valoro de ĉiu gawekiif ( vertikala, horizontala ) ⟩
const OKTALA_GRIDO: Record<string, string> = {
    "ᶅſ": "ɔɔ", "ſן": "ɔı", "ſȷ": "ɔɿ", "ŋᷠ": "ɔц",
    "ʃ": "ıɔ", "ɽ͑ʃ'": "ıı", "j͑ʃ'": "ıɿ", "ſᶘ": "ıц", "ɭʃ'": "ıэ",
    "ɭ(": "ɿɔ", "ɭʃ": "ɿı", "j͑ʃ": "ɿɿ", "}ʃ": "ɿц", "}ʃ'": "ɿэ",
    "j͐ʃ": "цɔ", "ſ̀ȷ": "цı", "ſɭ,": "цɿ", "ſɭˬ": "цц", "oͩſ̀ȷ": "цэ",
    "ɭl̀": "эɔ", "ſɟ": "эı", "ı],": "эɿ", "ſ͕ȷ": "эц",
    "ſ͔ɭ": "ꞟɔ", "ſɭ": "ꞟı", "֭ſɭ": "ꞟɿ", "ſ͕ɭ": "ꞟц",
    "ꞇ": "ɩɔ", "ɔ": "ɩı", "ɹ": "ɩɿ", "ᴜ": "ɩц", "ȏ": "ɩэ",
    "w": "ƨɔ", "ɜ": "ƨı", "э": "ƨɿ", "ⅎ": "ƨц",
    "⟅": "ꞟɔ", "｡": "ꞟı", "ʌ": "ꞟɿ", "v": "ꞟц", "⸙": "ꞟэ", "⸾": "ꞟꞟ", "⸰": "ꞟɩ"
};

// ⟨ IPA de la specialaj kolumnoj ( э ) en la oktala tabelo ⟩
const OKTALAJ_SPECIALAJ_IPA: Record<string, string> = { "ɭʃ'": "ǃ", "}ʃ'": "ǃ̃", "oͩſ̀ȷ": "ǁ̃" };

/**
 * Trovu la grandan formon de interna ( malgranda ) formo per la3os aŭ IPA.
 * @param malgranda ( Mapo , required ) - La interna formo.
 * @param ĉuAkceptebla ( ( gk ) => boolean , required ) - Kontrolilo de la granda formo.
 * @returns string | null
 */
function troviGrandanFormon(malgranda: Mapo, ĉuAkceptebla: (gk: string) => boolean): string | null {
    const la3osa = KOMENCAJ.find(m => m.la3os === malgranda.la3os);
    if ( la3osa && ĉuAkceptebla(la3osa.gk) ) return la3osa.gk;
    const ipa = malgranda.ipa;
    if ( ipa ) {
        const speciala = Object.entries(OKTALAJ_SPECIALAJ_IPA).find(([ , p ]) => p === ipa);
        if ( speciala && ĉuAkceptebla(speciala[0]) ) return speciala[0];
        const perIpa = KOMENCAJ.find(m => m.ipa === ipa);
        if ( perIpa && ĉuAkceptebla(perIpa.gk) ) return perIpa.gk;
    }
    return null;
}

// ⟨ Plena oktala tabelo - grandaj formoj plus la rekte tradukeblaj malgrandaj formoj ⟩
const OKTALAJ_VALOROJ: Record<string, string> = { ...OKTALA_GRIDO };
for ( const m of INTERNAJ ) {
    const granda = troviGrandanFormon(m, gk => Boolean(OKTALA_GRIDO[gk]));
    if ( granda && !OKTALAJ_VALOROJ[m.gk] ) {
        OKTALAJ_VALOROJ[m.gk] = OKTALA_GRIDO[granda];
    }
}

// ⟨ Inversa oktala tabelo - de oktala valoro al la granda formo ( unua venas unue ) ⟩
const OKTALAJ_LAŬVALORO: Record<string, string> = {};
for ( const [ gk, valoro ] of Object.entries(OKTALA_GRIDO) ) {
    if ( !OKTALAJ_LAŬVALORO[valoro] ) {
        OKTALAJ_LAŬVALORO[valoro] = gk;
    }
}

// ⟨ Duuma formo de la oktala sistemo - ĉiu oktala cifero ( ɔ-ƨ ) fariĝas tri bitoj ( ɔɔɔ-ııı ) ⟩
const OKTALA_DUUMA: Record<string, string> = {
    "ɔ": "ɔɔɔ", "ı": "ɔɔı", "ɿ": "ɔıɔ", "ц": "ɔıı",
    "э": "ıɔɔ", "ꞟ": "ıɔı", "ɩ": "ııɔ", "ƨ": "ııı"
};
const OKTALA_DUUMA_MALO: Record<string, string> = {};
for ( const [ cifero, duuma ] of Object.entries(OKTALA_DUUMA) ) {
    OKTALA_DUUMA_MALO[duuma] = cifero;
}

// ⟨ Dua sistemo - la kodigo ( ſɭɘэ ſɭɘɹ ) ⟩

// ⟨ Kategorioj de la kodigo ( cifero, duuma ) ⟩
const KODIGAJ_KATEGORIOJ: Record<string, { cifero: string; duuma: string }> = {
    "ɔ": { cifero: "ɔ", duuma: "ɔɔɔɔ" },
    "ı": { cifero: "ı", duuma: "ɔɔɔı" },
    "ɿ": { cifero: "ɿ", duuma: "ɔɔıɔ" },
    "ц": { cifero: "ц", duuma: "ɔɔıı" },
    "э": { cifero: "э", duuma: "ɔıɔɔ" }
};

// ⟨ Valoroj de la grandaj formoj ( du kodigaj ciferoj ) ⟩
const KODIGAJ_GRANDAJ_VALOROJ: Record<string, string> = {
    "ᶅſ": "00", "ſן": "01", "ſȷ": "02", "ŋᷠ": "07",
    "ʃ": "08", "ɽ͑ʃ'": "33", "j͑ʃ'": "32", "ſᶘ": "E3", "ɭʃ'": "31",
    "ɭ(": "48", "ɭʃ": "41", "j͑ʃ": "42", "}ʃ": "47", "}ʃ'": "37",
    "j͐ʃ": "46", "ſ̀ȷ": "E6", "ſɭ,": "58", "ſɭˬ": "E8",
    "ɭl̀": "60", "ſɟ": "61", "ı],": "62", "ſ͕ȷ": "67",
    "ſ͔ɭ": "88", "ſɭ": "81", "֭ſɭ": "82", "ſ͕ɭ": "87",
    "ꞁȷ̀": "B0"
};

// ⟨ Valoroj de la vokaloj ( ц-formo ) kaj de la specialaj ( э-formo ) ⟩
const KODIGAJ_VOKALAJ_VALOROJ: Record<string, string> = {
    "ꞇ": "07", "ɔ": "36", "ɹ": "13", "ᴜ": "45", "w": "23", "ɜ": "22", "э": "41"
};
const KODIGAJ_SPECIALAJ_VALOROJ: Record<string, string> = {
    "ȏ": "14", "ⅎ": "22", "oͩ": "22",
    "⟅": "50", "｡": "51", "ʌ": "52", "v": "53", "⸙": "54", "⸾": "55", "⸰": "56"
};

interface KodigaEniro {
    kategorio: string;
    valoro: string;
}

/**
 * Konvertu ASCII-heksan valoron al kodigaj ciferoj.
 * @param valoro ( string , required ) - ASCII-heksa valoro ( ekz. "E3" ).
 * @returns string
 */
function asciiValoroAlCiferoj(valoro: string): string {
    return valoroAlCiferoj(parseInt(valoro, 16), 2);
}

// ⟨ Plena kodiga tabelo - ĉiu gawekiif kun sia kategorio kaj valoro ⟩
const KODIGAJ_ENIROJ: Record<string, KodigaEniro> = {};
for ( const [ gk, valoro ] of Object.entries(KODIGAJ_GRANDAJ_VALOROJ) ) {
    KODIGAJ_ENIROJ[gk] = { kategorio: "ı", valoro: asciiValoroAlCiferoj(valoro) };
}
for ( const [ gk, valoro ] of Object.entries(KODIGAJ_VOKALAJ_VALOROJ) ) {
    KODIGAJ_ENIROJ[gk] = { kategorio: "ц", valoro: asciiValoroAlCiferoj(valoro) };
}
for ( const [ gk, valoro ] of Object.entries(KODIGAJ_SPECIALAJ_VALOROJ) ) {
    KODIGAJ_ENIROJ[gk] = { kategorio: "э", valoro: asciiValoroAlCiferoj(valoro) };
}
for ( const m of INTERNAJ ) {
    const granda = troviGrandanFormon(m, gk => Boolean(KODIGAJ_GRANDAJ_VALOROJ[gk]));
    if ( granda && !KODIGAJ_ENIROJ[m.gk] ) {
        KODIGAJ_ENIROJ[m.gk] = { kategorio: "ɿ", valoro: asciiValoroAlCiferoj(KODIGAJ_GRANDAJ_VALOROJ[granda]) };
    }
}

// ⟨ Inversa kodiga tabelo - de kategorio plus valoro al la formo ⟩
const KODIGAJ_LAŬENIRO: Record<string, string> = {};
for ( const [ gk, eniro ] of Object.entries(KODIGAJ_ENIROJ) ) {
    const klavo = `${eniro.kategorio}_${eniro.valoro}`;
    if ( !KODIGAJ_LAŬENIRO[klavo] ) {
        KODIGAJ_LAŬENIRO[klavo] = gk;
    }
}

// ⟨ Ĵetonaj ŝlosiloj por glifo-detekto ⟩
const OKTALAJ_KLAVOJ = Object.keys(OKTALAJ_VALOROJ).sort((a, b) => b.length - a.length);
const KODIGAJ_KLAVOJ = Object.keys(KODIGAJ_ENIROJ).sort((a, b) => b.length - a.length);

/**
 * Disigu tekston en glifojn laŭ plej-longa-unua kongruo.
 * @param teksto ( string , required ) - Teksto por disigi.
 * @param klavoj ( string[] , required ) - Ĵetonaj ŝlosiloj.
 * @returns string[]
 */
function disigiEnGlifojn(teksto: string, klavoj: string[]): string[] {
    const rezulto: string[] = [];
    let i = 0;
    while ( i < teksto.length ) {
        let kongruis = false;
        for ( const klavo of klavoj ) {
            if ( teksto.slice(i, i + klavo.length) === klavo ) {
                rezulto.push(klavo);
                i += klavo.length;
                kongruis = true;
                break;
            }
        }
        if ( !kongruis ) {
            rezulto.push(teksto[i]);
            i++;
        }
    }
    return rezulto;
}

/**
 * Konvertu oktalajn ciferojn ( ɔ-ƨ ) al nombro.
 * @param teksto ( string , required ) - Oktalaj ciferoj.
 * @returns number
 */
function oktalaAlValoro(teksto: string): number {
    let rezulto = 0;
    for ( const cifero of teksto ) {
        const valoro = B8_CIFEROJ_MALO[cifero];
        if ( valoro === undefined ) return NaN;
        rezulto = rezulto * 8 + valoro;
    }
    return rezulto;
}

/**
 * Konvertu nombron al oktalaj ciferoj ( ɔ-ƨ ).
 * @param valoro ( number , required ) - Nombro.
 * @returns string
 */
function valoroAlOktala(valoro: number): string {
    if ( valoro === 0 ) return "ɔ";
    let rezulto = "";
    let restanta = valoro;
    while ( restanta > 0 ) {
        rezulto = B8_CIFEROJ[restanta % 8] + rezulto;
        restanta = Math.floor(restanta / 8);
    }
    return rezulto;
}

/**
 * Konvertu kodigajn ciferojn al nombro.
 * @param ciferoj ( string , required ) - Ciferaĵo per kodigaj ciferoj.
 * @returns number
 */
function ciferojAlValoro(ciferoj: string): number {
    let rezulto = 0;
    let i = 0;
    while ( i < ciferoj.length ) {
        let kongruis = false;
        for ( const cifero of KODIGAJ_CIFEROJ_LAŬLONGO ) {
            if ( ciferoj.slice(i, i + cifero.length) === cifero ) {
                const valoro = KODIGAJ_CIFEROJ_MALO[cifero];
                if ( valoro === undefined ) return NaN;
                rezulto = rezulto * 16 + valoro;
                i += cifero.length;
                kongruis = true;
                break;
            }
        }
        if ( !kongruis ) return NaN;
    }
    return rezulto;
}

/**
 * Konvertu nombron al kodigaj ciferoj.
 * @param valoro ( number , required ) - Nombra valoro.
 * @param longo ( number = 2 , optional ) - Minimuma longo de la ciferaĵo.
 * @returns string
 */
function valoroAlCiferoj(valoro: number, longo = 2): string {
    let rezulto = valoro === 0 ? "ɔ" : "";
    let restanta = valoro;
    while ( restanta > 0 ) {
        rezulto = KODIGAJ_CIFEROJ_LAŬVALORO[restanta % 16] + rezulto;
        restanta = Math.floor(restanta / 16);
    }
    return rezulto.padStart(longo, "ɔ");
}

/**
 * Konvertu nombron al duuma ĉeno per ɔ kaj ı.
 * @param valoro ( number , required ) - Nombra valoro.
 * @param longo ( number = 8 , optional ) - Longo de la duuma ĉeno.
 * @returns string
 */
function valoroAlDuuma(valoro: number, longo = 8): string {
    return valoro.toString(2).padStart(longo, "0").replace(/0/g, "ɔ").replace(/1/g, "ı");
}

/**
 * Konvertu duuman ĉenon ( ɔ/ı ) al nombro.
 * @param duuma ( string , required ) - Duuma ĉeno per ɔ kaj ı.
 * @returns number
 */
function duumaAlValoro(duuma: string): number {
    let rezulto = 0;
    for ( const bito of duuma ) {
        if ( bito !== "ɔ" && bito !== "ı" ) return NaN;
        rezulto = rezulto * 2 + (bito === "ı" ? 1 : 0);
    }
    return rezulto;
}

/**
 * Konvertu Gawekiif-tekston al oktalaj valoroj ( Sistemo 1 - ſɭɹ ſȷɔ ).
 * @param teksto ( string , required ) - Gawekiif-teksto.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Opcioj.
 * @returns string
 */
function gawekiifAlNumero(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const { laŭlitera = false } = opcioj;
    const vortoj = String(teksto).split(/\s+/).filter(Boolean);
    return vortoj.map(vorto => {
        const valoroj = disigiEnGlifojn(vorto, OKTALAJ_KLAVOJ).map(glifo => {
            return OKTALAJ_VALOROJ[glifo] || "";
        }).filter(Boolean);
        return laŭlitera ? valoroj.join(" ") : valoroj.join("");
    }).filter(Boolean).join(" ");
}

/**
 * Konvertu oktalajn aŭ duumajn valorojn al Gawekiif-teksto ( Sistemo 1 ).
 * Akceptas la oktalan formon, la duuman formon, aŭ ambaŭn kun / apartigilo.
 * @param teksto ( string , required ) - Eniga formo.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Opcioj.
 * @returns string
 */
/**
 * Konvertu oktalajn valorojn al Gawekiif-teksto.
 * @param teksto ( string , required ) - Oktalaj valoroj ( ɔ-ƨ ).
 * @returns string
 */
function oktalaAlGawekiif(teksto: string): string {
    return String(teksto).split(/\s+/).filter(Boolean).map(vorto => {
        let rezulto = "";
        let i = 0;
        while ( i < vorto.length ) {
            const duopo = vorto.slice(i, i + 2);
            if ( B8_CIFEROJ_MALO[duopo[0]] !== undefined && B8_CIFEROJ_MALO[duopo[1]] !== undefined && OKTALAJ_LAŬVALORO[duopo] ) {
                rezulto += OKTALAJ_LAŬVALORO[duopo];
                i += 2;
            } else {
                rezulto += vorto[i];
                i++;
            }
        }
        return rezulto;
    }).join(" ");
}

/**
 * Konvertu oktalajn aŭ duumajn valorojn al Gawekiif-teksto ( Sistemo 1 ).
 * Akceptas la oktalan formon, la duuman formon, aŭ ambaŭn kun / apartigilo.
 * @param teksto ( string , required ) - Eniga formo.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Opcioj.
 * @returns string
 */
function numeroAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const ĉefa = String(teksto).split("/")[0] || "";
    const ĵetonoj = ĉefa.split(/\s+/).filter(Boolean);
    const ĉuDuuma = ĵetonoj.length > 0 && ĵetonoj.every(t => t.length % 3 === 0 && /^[ɔı]+$/.test(t));
    return ĉuDuuma ? oktalaAlGawekiif(duumaAlOktala(ĉefa)) : oktalaAlGawekiif(ĉefa);
}

/**
 * Konvertu Gawekiif-tekston al la kodiga formo ( Sistemo 2 - ſɭɘэ ſɭɘɹ ).
 * @param teksto ( string , required ) - Gawekiif-teksto.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Opcioj.
 * @returns string
 */
function gawekiifAlKodigo(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const { laŭlitera = false } = opcioj;
    const vortoj = String(teksto).split(/\s+/).filter(Boolean);
    return vortoj.map(vorto => {
        const kodoj = disigiEnGlifojn(vorto, KODIGAJ_KLAVOJ).map(glifo => {
            const eniro = KODIGAJ_ENIROJ[glifo];
            if ( !eniro ) return glifo;
            return eniro.kategorio + eniro.valoro;
        });
        return laŭlitera ? kodoj.join(" ") : kodoj.join("");
    }).join(" ");
}

/**
 * Disigu katenitan kodigan vorton en glifojn.
 * Ĉiu glifo estas kategorio plus du kodigaj ciferoj.
 * @param vorto ( string , required ) - Katenita kodiga vorto.
 * @returns string[]
 */
function disigiKodigitajnGlifojn(vorto: string): string[] {
    const glifoj: string[] = [];
    let i = 0;
    while ( i < vorto.length ) {
        const kategorio = vorto[i];
        if ( kategorio === "ɔ" ) {
            glifoj.push(vorto.slice(i + 1));
            break;
        }
        if ( kategorio !== "ı" && kategorio !== "ɿ" && kategorio !== "ц" && kategorio !== "э" ) {
            glifoj.push(kategorio);
            i++;
            continue;
        }
        i++;
        const postKategorio = i;
        let ciferoj = "";
        let trovita = false;
        for ( let k = 0; k < 2; k++ ) {
            trovita = false;
            for ( const cifero of KODIGAJ_CIFEROJ_LAŬLONGO ) {
                if ( vorto.slice(i, i + cifero.length) === cifero ) {
                    ciferoj += cifero;
                    i += cifero.length;
                    trovita = true;
                    break;
                }
            }
            if ( !trovita ) break;
        }
        if ( trovita ) {
            const glifo = KODIGAJ_LAŬENIRO[`${kategorio}_${ciferoj}`];
            glifoj.push(glifo || (kategorio + ciferoj));
        } else {
            glifoj.push(kategorio);
            i = postKategorio;
        }
    }
    return glifoj;
}

/**
 * Konvertu la kodigan formon al Gawekiif-teksto ( Sistemo 2 ).
 * @param teksto ( string , required ) - Kodiga formo.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Opcioj.
 * @returns string
 */
function kodigoAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return String(teksto).split(/\s+/).filter(Boolean).map(vorto => {
        return disigiKodigitajnGlifojn(vorto).join("");
    }).join(" ");
}

/**
 * Konvertu Gawekiif-tekston al la duuma formo ( Sistemo 2 ).
 * @param teksto ( string , required ) - Gawekiif-teksto.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Opcioj.
 * @returns string
 */
function gawekiifAlDuuma(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const { laŭlitera = false } = opcioj;
    const vortoj = String(teksto).split(/\s+/).filter(Boolean);
    return vortoj.map(vorto => {
        const duumoj = disigiEnGlifojn(vorto, KODIGAJ_KLAVOJ).map(glifo => {
            const eniro = KODIGAJ_ENIROJ[glifo];
            if ( !eniro ) return glifo;
            const kategorio = KODIGAJ_KATEGORIOJ[eniro.kategorio];
            return kategorio.duuma + valoroAlDuuma(ciferojAlValoro(eniro.valoro), 8);
        });
        return laŭlitera ? duumoj.join(" ") : duumoj.join("");
    }).join(" ");
}

/**
 * Disigu katenitan duuman vorton en glifojn.
 * Ĉiu glifo estas dek du duumaj signoj ( kategorio plus valoro ).
 * @param vorto ( string , required ) - Katenita duuma vorto.
 * @returns string[]
 */
function disigiDuumajnGlifojn(vorto: string): string[] {
    const glifoj: string[] = [];
    let i = 0;
    while ( i < vorto.length ) {
        if ( i + 12 > vorto.length ) {
            glifoj.push(vorto.slice(i));
            break;
        }
        const ĵetono = vorto.slice(i, i + 12);
        const kategorio = Object.entries(KODIGAJ_KATEGORIOJ).find(([ , v ]) => v.duuma === ĵetono.slice(0, 4))?.[0];
        if ( !kategorio ) {
            glifoj.push(ĵetono[0]);
            i++;
            continue;
        }
        const valoro = duumaAlValoro(ĵetono.slice(4));
        if ( isNaN(valoro) ) {
            glifoj.push(ĵetono[0]);
            i++;
            continue;
        }
        const glifo = KODIGAJ_LAŬENIRO[`${kategorio}_${valoroAlCiferoj(valoro, 2)}`];
        glifoj.push(glifo || ĵetono);
        i += 12;
    }
    return glifoj;
}

/**
 * Konvertu la duuman formon al Gawekiif-teksto ( Sistemo 2 ).
 * @param teksto ( string , required ) - Duuma formo.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Opcioj.
 * @returns string
 */
function duumaAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return String(teksto).split(/\s+/).filter(Boolean).map(vorto => {
        return disigiDuumajnGlifojn(vorto).join("");
    }).join(" ");
}

/**
 * Konvertu la kodigan aŭ duuman formon al Gawekiif-teksto.
 * Akceptas la kodigan formon, la duuman formon, aŭ ambaŭn kun / apartigilo.
 * @param teksto ( string , required ) - Eniga formo.
 * @returns string
 */
function encodingAlGawekiif(teksto: string): string {
    const ĉefa = String(teksto).split("/")[0] || "";
    const ĵetonoj = ĉefa.split(/\s+/).filter(Boolean);
    const ĉuDuuma = ĵetonoj.length > 0 && ĵetonoj.every(t => t.length === 12 && /^[ɔı]+$/.test(t));
    return ĉuDuuma ? duumaAlGawekiif(ĉefa) : kodigoAlGawekiif(ĉefa);
}

/**
 * Konvertu oktalajn ciferojn al la kodiga numero-formo.
 * @param teksto ( string , required ) - Oktalaj ciferoj ( ɔ-ƨ ).
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Opcioj.
 * @returns string
 */
function oktalaAlKodigo(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return "ɔ" + String(teksto).replace(/\s+/g, "");
}

/**
 * Konvertu la kodigan numero-formon al oktalaj ciferoj.
 * @param teksto ( string , required ) - Kodiga numero-formo.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Opcioj.
 * @returns string
 */
function kodigoAlOktala(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return String(teksto).replace(/^ɔ/, "");
}

/**
 * Konvertu oktalajn ciferojn al la duuma numero-formo.
 * @param teksto ( string , required ) - Oktalaj ciferoj ( ɔ-ƨ ).
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Opcioj.
 * @returns string
 */
function oktalaAlDuuma(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return String(teksto).split(/\s+/).filter(Boolean).map(vorto => {
        let rezulto = "";
        for ( const cifero of vorto ) {
            const duuma = OKTALA_DUUMA[cifero];
            if ( duuma === undefined ) return vorto;
            rezulto += duuma;
        }
        return rezulto;
    }).join(" ");
}

/**
 * Konvertu la duuman numero-formon al oktalaj ciferoj.
 * @param teksto ( string , required ) - Duuma numero-formo.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Opcioj.
 * @returns string
 */
function duumaAlOktala(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return String(teksto).split(/\s+/).filter(Boolean).map(vorto => {
        if ( vorto.length % 3 !== 0 ) return vorto;
        let rezulto = "";
        for ( let i = 0; i < vorto.length; i += 3 ) {
            const cifero = OKTALA_DUUMA_MALO[vorto.slice(i, i + 3)];
            if ( cifero === undefined ) return vorto;
            rezulto += cifero;
        }
        return rezulto;
    }).join(" ");
}


// ⟪ Helpaj Funkcioj (daŭrigo) 🔧 ⟫

/**
 * Normalize La3os input to numerical shorthand.
 * @param teksto ( string , required ) - Input text.
 * @returns string
 */
function normigiLa3osEnigon(teksto: string): string {
    return konvertiLa3osAlNumerika(teksto);
}

/**
 * Convert text using a serxtabelo map ( longest-first matching ).
 * @param teksto ( string , required ) - Input text.
 * @param serxtabelo ( Serxtabelo , required ) - Lookup table.
 * @returns string
 */
function konvertiPerSerxtabelo(teksto: string, serxtabelo: Serxtabelo): string {
    if ( !serxtabelo || !serxtabelo.keys ) return teksto;

    let rezulto = "";
    let i = 0;
    while ( i < teksto.length ) {
        let kongruis = false;
        for ( const klavo of serxtabelo.keys ) {
            if ( teksto.slice(i, i + klavo.length) === klavo ) {
                rezulto += serxtabelo.map[klavo];
                i += klavo.length;
                kongruis = true;
                break;
            }
        }
        if ( !kongruis ) { rezulto += teksto[i]; i++; }
    }
    return rezulto;
}

/**
 * Convert numerical shorthand to multi-character La3os.
 * @param teksto ( string , required ) - Text with numerical digits.
 * @returns string
 */
function konvertiNumerikanAlLa3os(teksto: string): string {
    let rezulto = "";
    for ( const char of teksto ) {
        rezulto += NUMERIKA_MALO[char] || char;
    }
    return rezulto;
}

/**
 * Convert multi-character La3os to numerical shorthand.
 * @param teksto ( string , required ) - Text with multi-character clusters or numerical.
 * @returns string
 */
function konvertiLa3osAlNumerika(teksto: string): string {
    let rezulto = teksto;
    const ordigitajGrupoj = Object.entries(NUMERIKA).sort((a, b) => b[0].length - a[0].length);
    for ( const [ grupo, cifero ] of ordigitajGrupoj ) {
        rezulto = rezulto.replace(new RegExp(grupo, "g"), cifero);
    }
    return rezulto;
}

/**
 * Convert numerical to IPA ( via La3os ).
 * @param teksto ( string , required ) - Numerical text.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { laŭlitera? }.
 * @returns string
 */
function numerikaAlIpa(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return la3osAlIpa(konvertiNumerikanAlLa3os(teksto), opcioj);
}

/**
 * Convert IPA to numerical ( via La3os ).
 * @param teksto ( string , required ) - IPA text.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { laŭlitera? }.
 * @returns string
 */
function ipaAlNumerika(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return konvertiLa3osAlNumerika(ipaAlLa3os(teksto, opcioj));
}

/**
 * Convert numerical directly to Gawekiif.
 * @param teksto ( string , required ) - Numerical text.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { laŭlitera? }.
 * @returns string
 */
function numerikaAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return la3osAlGawekiif(konvertiNumerikanAlLa3os(teksto), opcioj);
}

/**
 * Convert Gawekiif directly to numerical.
 * @param teksto ( string , required ) - Gawekiif text.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { laŭlitera? }.
 * @returns string
 */
function gawekiifAlNumerika(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return konvertiLa3osAlNumerika(gawekiifAlLa3os(teksto, opcioj));
}

interface VokalaKongruo {
    pozicio: number;
    vokalo: string;
    longo: number;
}

/**
 * Find vowel match at position.
 * @param teksto ( string , required ) - Text to search.
 * @param pozicio ( number , required ) - Position to start.
 * @returns VokalaKongruo | null
 */
function troviVokalonJe(teksto: string, pozicio: number): VokalaKongruo | null {
    for ( const v of VOKALOJ_ORDIGITAJ ) {
        if ( teksto.slice(pozicio).startsWith(v) ) {
            return { pozicio, vokalo: v, longo: v.length };
        }
    }
    return null;
}

/**
 * Split a La3os string into syllables based on vowel positions.
 * @param teksto ( string , required ) - Input text.
 * @returns string
 */
function disigiEnSilabojn(teksto: string): string {
    if ( !teksto ) return "";
    if ( teksto.includes(" ") ) return teksto;

    const vokalajPozicioj: VokalaKongruo[] = [];
    let i = 0;
    while ( i < teksto.length ) {
        const kongruo = troviVokalonJe(teksto, i);
        if ( kongruo ) {
            vokalajPozicioj.push(kongruo);
            i += kongruo.longo;
        } else {
            i++;
        }
    }

    if ( vokalajPozicioj.length <= 1 ) return teksto;

    const rezulto: string[] = [];
    for ( let j = 0; j < vokalajPozicioj.length; j++ ) {
        const kongruo = vokalajPozicioj[j];
        const start = j === 0 ? 0 : vokalajPozicioj[j - 1].pozicio + vokalajPozicioj[j - 1].longo;
        const end = j < vokalajPozicioj.length - 1 ? kongruo.pozicio + kongruo.longo : teksto.length;
        const silabo = teksto.slice(start, end);
        if ( silabo ) rezulto.push(silabo);
    }

    return rezulto.join(" ");
}

/**
 * Convert a single La3os syllable to Gawekiif.
 * @param silabo ( string , required ) - Syllable to convert.
 * @returns string
 */
function konvertiSilabon(silabo: string): string {
    if ( cxuMalplenaAUBlanko(silabo) ) return "";

    const komencaSerxtabelo = SERXTABELO.la3os_gk_initial;
    const internaSerxtabelo = SERXTABELO.la3os_gk_internal;

    if ( !komencaSerxtabelo?.map || !internaSerxtabelo?.map ) return "ꞁȷ̀";
    if ( internaSerxtabelo.map[silabo] ) return internaSerxtabelo.map[silabo];

    let rezulto = "";
    let i = 0;
    let cxuUnuaKonsonanto = true;

    while ( i < silabo.length ) {
        if ( troviVokalonJe(silabo, i) ) break;

        let kongruis = false;
        const serxtabelo = cxuUnuaKonsonanto ? komencaSerxtabelo : internaSerxtabelo;

        for ( const klavo of serxtabelo.keys ) {
            if ( silabo.slice(i).startsWith(klavo) ) {
                rezulto += serxtabelo.map[klavo];
                i += klavo.length;
                cxuUnuaKonsonanto = false;
                kongruis = true;
                break;
            }
        }
        if ( !kongruis ) break;
    }

    const vokalaKongruo = troviVokalonJe(silabo, i);
    if ( vokalaKongruo ) {
        const vokalaGk = internaSerxtabelo.map[vokalaKongruo.vokalo];
        if ( vokalaGk ) rezulto += vokalaGk;
        i += vokalaKongruo.longo;
    }

    if ( internaSerxtabelo.keys ) {
        while ( i < silabo.length ) {
            let kongruis = false;
            for ( const klavo of internaSerxtabelo.keys ) {
                if ( VOKALOJ_ORDIGITAJ.includes(klavo) ) continue;
                if ( silabo.slice(i).startsWith(klavo) ) {
                    rezulto += internaSerxtabelo.map[klavo];
                    i += klavo.length;
                    kongruis = true;
                    break;
                }
            }
            if ( !kongruis ) i++;
        }
    }

    if ( rezulto && troviVokalonJe(silabo, 0) && !rezulto.startsWith("ꞁȷ̀") ) {
        rezulto = "ꞁȷ̀" + rezulto;
    }

    return rezulto || "ꞁȷ̀";
}

/**
 * Convert a La3os word to Gawekiif.
 * @param vorto ( string , required ) - Word to convert.
 * @returns string
 */
function konvertiVorton(vorto: string): string {
    if ( cxuMalplenaAUBlanko(vorto) ) return "";

    return disigiPerSpacoj(vorto).map(s => {
        return disigiEnSilabojn(s).split(/\s+/).map(konvertiSilabon).join(" ");
    }).join(" ");
}


// ⟪ Konvertaj Funkcioj 🔄 ⟫

/**
 * Convert Gawekiif to another format (La3os or IPA).
 * @param teksto ( string , required ) - Gawekiif text.
 * @param serxtabelo ( Serxtabelo , required ) - Target serxtabelo table.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { laŭlitera?, majuskligi?, silabaDisigilo?, uziNumerikan? }.
 * @returns string
 */
function konvertiGawekiif(teksto: string, serxtabelo: Serxtabelo, opcioj: KonvertajOpcioj = {}): string {
    const { laŭlitera = false, majuskligi = false, silabaDisigilo = " ", uziNumerikan = true } = opcioj;

    const vortajPartoj = String(teksto).split("ʌ");

    const konvertitaj = vortajPartoj.map(vorto => {
        const silaboj = disigiPerSpacoj(vorto);
        const konvertitajSilaboj = silaboj.map(silabo => {
            let konvertita = konvertiPerSerxtabelo(silabo, serxtabelo);
            if ( majuskligi ) konvertita = konvertita.replace(/^./, c => c.toUpperCase());
            return konvertita;
        });
        const disigilo = laŭlitera ? silabaDisigilo : "";
        return konvertitajSilaboj.join(disigilo);
    });

    const rezulto = konvertitaj.join(" ");
    return uziNumerikan ? rezulto : konvertiNumerikanAlLa3os(rezulto);
}

/**
 * Convert Gawekiif to La3os.
 * @param teksto ( string , required ) - Gawekiif text.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { uziNumerikan?, laŭlitera? }.
 * @returns string
 */
function gawekiifAlLa3os(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return konvertiGawekiif(teksto, SERXTABELO.gk_la3os, opcioj);
}

/**
 * Convert La3os to Gawekiif.
 * @param teksto ( string , required ) - La3os text.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { laŭlitera? }.
 * @returns string
 */
function la3osAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const normaligitaTeksto = normigiLa3osEnigon(teksto);
    const vortoj = disigiPerSpacoj(normaligitaTeksto);

    const rezulto = vortoj.map(w => {
        return konvertiVorton(w);
    }).join("ʌ");

    return rezulto;
}

/**
 * Convert syllables using a serxtabelo table with separator handling.
 * @param teksto ( string , required ) - Input text.
 * @param serxtabelo ( Serxtabelo , required ) - Lookup table.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { laŭlitera?, enigaDisigilo?, eligaDisigilo?, antaŭprilabori? }.
 * @returns string
 */
function konvertiSilabojn(teksto: string, serxtabelo: Serxtabelo, opcioj: KonvertajOpcioj = {}): string {
    const { laŭlitera = false, enigaDisigilo = ".", eligaDisigilo = ".", antaŭprilabori = null } = opcioj;

    let prilaboritaTeksto = antaŭprilabori ? antaŭprilabori(teksto) : teksto;
    const silaboj = prilaboritaTeksto.split(enigaDisigilo).map(s => s.trim()).filter(Boolean);
    const konvertitaj = silaboj.map(silabo => konvertiPerSerxtabelo(silabo, serxtabelo));

    return laŭlitera ? konvertitaj.join(eligaDisigilo) : konvertitaj.join("");
}

/**
 * Convert La3os to IPA.
 * @param teksto ( string , required ) - La3os text.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { laŭlitera? }.
 * @returns string
 */
function la3osAlIpa(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const { laŭlitera = false } = opcioj;
    const serxtabelo = SERXTABELO.la3os_ipa;

    const normaligitaTeksto = normigiLa3osEnigon(teksto);
    const vortoj = disigiPerSpacoj(normaligitaTeksto);
    const konvertitaj = vortoj.map(vorto => {
        const silaboj = disigiPerSpacoj(disigiEnSilabojn(vorto));
        const ipaSilaboj = silaboj.map(silabo => konvertiPerSerxtabelo(silabo, serxtabelo));
        return laŭlitera ? ipaSilaboj.join(".") : ipaSilaboj.join("");
    });

    return konvertitaj.join(" ");
}

/**
 * Convert IPA to La3os.
 * @param teksto ( string , required ) - IPA text.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { laŭlitera?, uziNumerikan? }.
 * @returns string
 */
function ipaAlLa3os(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const { laŭlitera = false, uziNumerikan = true } = opcioj;
    const serxtabelo = SERXTABELO.ipa_la3os;

    const silaboj = teksto.split(".").map(s => s.trim()).filter(Boolean);
    const konvertitaj = silaboj.map(silabo => konvertiPerSerxtabelo(silabo, serxtabelo));

    const kunigita = laŭlitera ? konvertitaj.join(".") : konvertitaj.join("");
    return uziNumerikan ? kunigita : konvertiNumerikanAlLa3os(kunigita);
}

/**
 * Convert Gawekiif directly to IPA.
 * @param teksto ( string , required ) - Gawekiif text.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { laŭlitera? }.
 * @returns string
 */
function gawekiifAlIpa(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return konvertiGawekiif(teksto, SERXTABELO.gk_ipa, { ...opcioj, silabaDisigilo: "." });
}

/**
 * Convert IPA directly to Gawekiif.
 * @param teksto ( string , required ) - IPA text.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { laŭlitera? }.
 * @returns string
 */
function ipaAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const { laŭlitera = false } = opcioj;
    const serxtabelo = SERXTABELO.ipa_la3os;

    const vortoj = laŭlitera ? teksto.split(".").map(s => s.trim()).filter(Boolean) : [teksto];

    const rezulto = vortoj.map(vorto => {
        const la3osSilabo = konvertiPerSerxtabelo(vorto, serxtabelo);
        return konvertiSilabon(la3osSilabo);
    }).join("ʌ");

    return rezulto;
}

/**
 * Convert between formats.
 * @param teksto ( string , required ) - Input text.
 * @param de ( string , required ) - Source format.
 * @param al ( string , required ) - Target format.
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - Options - { uziNumerikan?, laŭlitera? }.
 * @returns string
 */
function konverti(teksto: string, de: string, al: string, opcioj: KonvertajOpcioj = {}): string {
    if ( de === al ) return teksto;

    const opciojLokala: KonvertajOpcioj = { uziNumerikan: opcioj.uziNumerikan ?? true, laŭlitera: opcioj.laŭlitera ?? false };

    const KONVERTOJ: Record<string, () => string> = {
        "gawekiif_la3os": () => gawekiifAlLa3os(teksto, opciojLokala),
        "la3os_gawekiif": () => la3osAlGawekiif(teksto, opciojLokala),
        "la3os_ipa": () => la3osAlIpa(teksto, opciojLokala),
        "ipa_la3os": () => ipaAlLa3os(teksto, opciojLokala),
        "gawekiif_ipa": () => gawekiifAlIpa(teksto, opciojLokala),
        "ipa_gawekiif": () => ipaAlGawekiif(teksto, opciojLokala),
        "numerical_la3os": () => konvertiNumerikanAlLa3os(teksto),
        "la3os_numerical": () => konvertiLa3osAlNumerika(teksto),
        "numerical_ipa": () => numerikaAlIpa(teksto, opciojLokala),
        "ipa_numerical": () => ipaAlNumerika(teksto, opciojLokala),
        "numerical_gawekiif": () => numerikaAlGawekiif(teksto, opciojLokala),
        "gawekiif_numerical": () => gawekiifAlNumerika(teksto, opciojLokala),
        "gawekiif_numero": () => {
            const numero = gawekiifAlNumero(teksto, opciojLokala);
            if ( !numero ) return "";
            return numero + " / " + oktalaAlDuuma(numero);
        },
        "numero_gawekiif": () => numeroAlGawekiif(teksto, opciojLokala),
        "gawekiif_kodigo": () => gawekiifAlKodigo(teksto, opciojLokala),
        "kodigo_gawekiif": () => kodigoAlGawekiif(teksto, opciojLokala),
        "gawekiif_duuma": () => gawekiifAlDuuma(teksto, opciojLokala),
        "duuma_gawekiif": () => duumaAlGawekiif(teksto, opciojLokala),
        "gawekiif_encoding": () => gawekiifAlKodigo(teksto, opciojLokala) + " / " + gawekiifAlDuuma(teksto, opciojLokala),
        "encoding_gawekiif": () => encodingAlGawekiif(teksto)
    };

    const rektaKlavo = `${de}_${al}`;

    if ( KONVERTOJ[rektaKlavo] ) {
        return KONVERTOJ[rektaKlavo]();
    }

    return teksto;
}


// ⟪ Elportoj 📤 ⟫

if ( typeof module !== "undefined" && module.exports ) {
    module.exports = {
        MAPOJ,
        KOMENCAJ,
        INTERNAJ,
        NUMERIKA,
        NUMERIKA_MALO,
        SERXTABELO,
        konvertiPerSerxtabelo,
        konvertiNumerikanAlLa3os,
        konvertiLa3osAlNumerika,
        numerikaAlIpa,
        ipaAlNumerika,
        troviVokalonJe,
        disigiEnSilabojn,
        konvertiSilabon,
        konvertiVorton,
        gawekiifAlLa3os,
        la3osAlGawekiif,
        la3osAlIpa,
        ipaAlLa3os,
        gawekiifAlIpa,
        ipaAlGawekiif,
        numerikaAlGawekiif,
        gawekiifAlNumerika,
        gawekiifAlNumero,
        numeroAlGawekiif,
        gawekiifAlKodigo,
        kodigoAlGawekiif,
        gawekiifAlDuuma,
        duumaAlGawekiif,
        encodingAlGawekiif,
        oktalaAlKodigo,
        kodigoAlOktala,
        oktalaAlDuuma,
        duumaAlOktala,
        konverti
    };
}


// ⟪ UI Inicialigo ( Retumilo ) 🖥️ ⟫

(function() {
    if ( typeof document === "undefined" ) return;

    function iniciatiKonvertiloUI() {
        const saxesuOx2pewa = document.getElementById("saxesuOx2pewa") as HTMLTextAreaElement | null;
        const maxemaSa10Gwk = document.getElementById("maxemaSa10Gwk") as HTMLElement | null;
        const outputs = {
            gk: document.getElementById("tlakakuG2") as HTMLElement | null,
            la3os: document.getElementById("tlakakuLa3os") as HTMLElement | null,
            ipa: document.getElementById("tlakakuRat0") as HTMLElement | null,
            number: document.getElementById("tlakakuK2fe") as HTMLElement | null,
            encoding: document.getElementById("tlakakuKodigo") as HTMLElement | null,
            numberDuuma: document.getElementById("tlakakuK2feDuuma") as HTMLElement | null,
            encodingDuuma: document.getElementById("tlakakuKodigoDuuma") as HTMLElement | null
        };
        const checkboxes ={ outGk: document.getElementById("a1a3kkG2") as HTMLInputElement | null,
            outLa3os: document.getElementById("a1a3kkLa3os") as HTMLInputElement | null,
            outIpa: document.getElementById("a1a3kkRat0") as HTMLInputElement | null,
            outNumber: document.getElementById("a1a3kkK2fe") as HTMLInputElement | null,
            outEncoding: document.getElementById("a1a3kkKodigo") as HTMLInputElement | null,
            numbers: document.getElementById("a1aK2reK2fe") as HTMLInputElement | null,
            laŭlitera: document.getElementById("a1aKaj2xa") as HTMLInputElement | null
        };
        const saxesuGawek2fRadios = Array.from(document.getElementsByName("saxesuGawek2f")) as HTMLInputElement[];

        if ( !saxesuOx2pewa ) return;

        function akiriEniganFormon(): string {
            if ( !saxesuGawek2fRadios || saxesuGawek2fRadios.length === 0 ) return "gawekiif";
            for ( const radio of saxesuGawek2fRadios ) {
                if ( radio.checked ) return radio.value;
            }
            return "gawekiif";
        }

        function konvertiTekston() {
            if ( !saxesuOx2pewa ) return;
            const eniraTeksto = saxesuOx2pewa.value.trim();
            if ( !eniraTeksto ) {
                if ( maxemaSa10Gwk ) maxemaSa10Gwk.style.display = "none";
                return;
            }

            const fontaFormo = akiriEniganFormon();
            const uziNumerikan = checkboxes.numbers?.checked ?? true;
            const opcioj: KonvertajOpcioj = {
                uziNumerikan: uziNumerikan,
                laŭlitera: checkboxes.laŭlitera?.checked || false
            };

            const eligo: Record<string, string> = { gk: "", la3os: "", ipa: "", number: "", encoding: "", numberDuuma: "", encodingDuuma: "" };

            if ( fontaFormo === "gawekiif" ) {
                eligo.gk = eniraTeksto;
                eligo.la3os = konverti(eligo.gk, "gawekiif", "la3os", opcioj);
                eligo.ipa = konverti(eligo.gk, "gawekiif", "ipa", opcioj);
            } else if ( fontaFormo === "la3os" ) {
                eligo.la3os = eniraTeksto;
                eligo.gk = konverti(eligo.la3os, "la3os", "gawekiif", opcioj);
                eligo.ipa = konverti(eligo.la3os, "la3os", "ipa", opcioj);
            } else if ( fontaFormo === "ipa" ) {
                eligo.ipa = eniraTeksto;
                eligo.la3os = konverti(eligo.ipa, "ipa", "la3os", opcioj);
                eligo.gk = konverti(eligo.la3os, "la3os", "gawekiif", opcioj);
            } else if ( fontaFormo === "numero" ) {
                eligo.number = eniraTeksto;
                eligo.gk = konverti(eligo.number, "numero", "gawekiif", opcioj);
                eligo.la3os = konverti(eligo.gk, "gawekiif", "la3os", opcioj);
                eligo.ipa = konverti(eligo.gk, "gawekiif", "ipa", opcioj);
            } else {
                eligo.encoding = eniraTeksto;
                eligo.gk = encodingAlGawekiif(eniraTeksto);
                eligo.la3os = konverti(eligo.gk, "gawekiif", "la3os", opcioj);
                eligo.ipa = konverti(eligo.gk, "gawekiif", "ipa", opcioj);
            }

            const numero = gawekiifAlNumero(eligo.gk, opcioj);
            eligo.number = numero;
            eligo.numberDuuma = numero ? oktalaAlDuuma(numero) : "";
            eligo.encoding = gawekiifAlKodigo(eligo.gk, opcioj);
            eligo.encodingDuuma = gawekiifAlDuuma(eligo.gk, opcioj);

            const eligajKlavoj = [ "gk", "la3os", "ipa", "number", "encoding" ];
            const eligajNomoj: Record<string, string> = { gk: "Gk", la3os: "La3os", ipa: "Ipa", number: "Number", encoding: "Encoding" };
            for ( const klavo of eligajKlavoj ) {
                const markobutono = checkboxes[`out${eligajNomoj[klavo]}` as keyof typeof checkboxes];
                const eligaElemento = outputs[klavo as keyof typeof outputs];
                const titolo = document.querySelector(`.ksakap2sa[data-output="${klavo}"]`) as HTMLElement | null;
                const gepatro = eligaElemento?.parentElement;
                if ( markobutono && eligaElemento && gepatro ) {
                    eligaElemento.textContent = eligo[klavo] || "";
                    if ( klavo === "gk" && typeof vacepu === "function" ) {
                        vacepu("ox2pewa");
                    }
                    const videbla = markobutono.checked;
                    if ( titolo ) {
                        titolo.style.display = videbla ? "block" : "none";
                    }
                    gepatro.style.display = videbla ? "flex" : "none";
                    if ( klavo === "number" || klavo === "encoding" ) {
                        const duumaKlavo = klavo === "number" ? "numberDuuma" : "encodingDuuma";
                        const duumaElemento = outputs[duumaKlavo as keyof typeof outputs];
                        if ( duumaElemento ) {
                            duumaElemento.textContent = eligo[duumaKlavo] || "";
                            const gepatroDuuma = duumaElemento.parentElement;
                            if ( gepatroDuuma ) gepatroDuuma.style.display = videbla ? "flex" : "none";
                        }
                    }
                }
            }

            if ( maxemaSa10Gwk ) maxemaSa10Gwk.style.display = "flex";
        }

        const ciujElementoj: Element[] = [
            saxesuOx2pewa,
            ...saxesuGawek2fRadios,
            checkboxes.outGk, checkboxes.outLa3os, checkboxes.outIpa,
            checkboxes.outNumber, checkboxes.outEncoding,
            checkboxes.numbers, checkboxes.laŭlitera
        ].filter(Boolean) as Element[];

        for ( const elemento of ciujElementoj ) {
            const okazaTipo = elemento === saxesuOx2pewa ? "input" : "change";
            elemento.addEventListener(okazaTipo, konvertiTekston);
        }
    }

    if ( document.readyState === "loading" ) {
        document.addEventListener("DOMContentLoaded", iniciatiKonvertiloUI);
    } else {
        iniciatiKonvertiloUI();
    }
})();
