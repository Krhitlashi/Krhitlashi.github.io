// ≺⧼ Iikze Skribsistema Konvertilo 📜 ⧽≻
/**
 * ɭʃɀɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif La3os IPA )
 * ֭ſɭᴜ ı],ɔ ( Gawekiif )
 * ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɭɹ ſȷɔ ( La3os 1=ts 2=ii 3=tl 4=au 5=kz 6=aa 7=ou 0=eu )
 * ꞁȷ̀ɔ j͑ʃƽɔƽ ( IPA )
 */


// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 📦 ⟫

const NUMERIKA: Record<string, string> = { "ts": "1", "ii": "2", "tl": "3", "au": "4", "kz": "5", "aa": "6", "ou": "7", "eu": "0" };
const NUMERIKA_MALO: Record<string, string> = { "1": "ts", "2": "ii", "3": "tl", "4": "au", "5": "kz", "6": "aa", "7": "ou", "0": "eu" };

const VOKALOJ_ORDIGITAJ: string[] = [ "ii", "aa", "eu", "ou", "au", "ai", "i", "e", "a", "u", "o", "2", "6", "0", "7", "4" ].sort( ( a, b ) => b.length - a.length );


// ⟪ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ 🗺️ ⟫

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
    { gk: "ᴜꞇ", la3os: "ai", ipa: "ə" },
    { gk: "⟅", la3os: ".", ipa: "\\" },
    { gk: "｡", la3os: ",", ipa: "," }
];

const MAPOJ: Mapo[] = [ ...KOMENCAJ, ...INTERNAJ ];

/* ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃᴜƽ ( IPA ) ⟩ */
const VOKALOJ_IPA: string[] = Array.from(
    new Set( MAPOJ.filter( m => VOKALOJ_ORDIGITAJ.includes( m.la3os ) ).map( m => m.ipa ) )
).sort( ( a, b ) => b.length - a.length );


// ⟪ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🔧 ⟫

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
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ
 * @returns jesne
 */
function cxuMalplenaAUBlanko(teksto: string): boolean {
    return !teksto || /^[ ʌ-]*$/.test(teksto);
}

/**
 * ſɟᴜ ɭʃᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ
 * @returns listo
 */
function disigiPerSpacoj(teksto: string): string[] {
    return teksto.toLowerCase().split(/\s+/).filter(Boolean);
}

/**
 * ſɭʞɹ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( serxtabelo )
 * @param eroj ( T[] , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param fontoKlavo ( keyof T , required ) - ſɭɔ˞ᴜ ſɭᴜ
 * @param celoKlavo ( keyof T , required ) - ſɭɔ˞ᴜ ſɭᴜ
 * @param saltiEkzistantan ( boolean , optional ) - ſןw ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns serxtabelo
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


// ⟪ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ 🔍 ⟫

const SERXTABELO = {
    gk_la3os: konstruiSerxtabelon(MAPOJ, "gk", "la3os"),
    gk_ipa: konstruiSerxtabelon(MAPOJ, "gk", "ipa"),
    la3os_gk_initial: konstruiSerxtabelon(KOMENCAJ, "la3os", "gk"),
    la3os_gk_internal: konstruiSerxtabelon(INTERNAJ, "la3os", "gk"),
    la3os_ipa: konstruiSerxtabelon(KOMENCAJ, "la3os", "ipa"),
    ipa_la3os: konstruiSerxtabelon([ ...KOMENCAJ, ...INTERNAJ ], "ipa", "la3os", true),
    ipa_gk_initial: konstruiSerxtabelon(KOMENCAJ, "ipa", "gk", true),
    ipa_gk_internal: konstruiSerxtabelon(INTERNAJ, "ipa", "gk", true)
};

for ( const m of INTERNAJ ) {
    if ( m.la3os && m.ipa && !SERXTABELO.la3os_ipa.map[m.la3os] ) {
        SERXTABELO.la3os_ipa.map[m.la3os] = m.ipa;
    }
}
SERXTABELO.la3os_ipa.keys = Object.keys(SERXTABELO.la3os_ipa.map).sort((a, b) => b.length - a.length);


// ⟪ ſɭc̗ᴜ ſɭɹ ſȷɔ 🔢 ⟫

// ⟨ ſɭɹ ſȷɔ ( ɔ-ƨ 0-7 ɔ-⌅̊ 0-F ) ⟩
const B8_CIFEROJ = [ "ɔ", "ı", "ɿ", "ц", "э", "ꞟ", "ɩ", "ƨ" ];
const B8_CIFEROJ_MALO: Record<string, number> = { "ɔ": 0o0, "ı": 0o1, "ɿ": 0o2, "ц": 0o3, "э": 0o4, "ꞟ": 0o5, "ɩ": 0o6, "ƨ": 0o7 };

const KODIGAJ_CIFEROJ = [ "ɔ", "ı", "ɿ", "ц", "э", "ꞟ", "ɩ", "ƨ", "ƨ̵", "ⱻ", "ɜ́", "ԏ", "u̵", "ᶔ", "ⲁ", "⌅̊" ];
const KODIGAJ_CIFEROJ_MALO: Record<string, number> = {
    "ɔ": 0o0, "ı": 0o1, "ɿ": 0o2, "ц": 0o3, "э": 0o4, "ꞟ": 0o5, "ɩ": 0o6, "ƨ": 0o7,
    "ƨ̵": 0o10, "ⱻ": 0o11, "ɜ́": 0o12, "ԏ": 0o13, "u̵": 0o14, "ᶔ": 0o15, "ⲁ": 0o16, "⌅̊": 0o17
};
const KODIGAJ_CIFEROJ_LAŬVALORO: Record<number, string> = {
    0o0: "ɔ", 0o1: "ı", 0o2: "ɿ", 0o3: "ц", 0o4: "э", 0o5: "ꞟ", 0o6: "ɩ", 0o7: "ƨ",
    0o10: "ƨ̵", 0o11: "ⱻ", 0o12: "ɜ́", 0o13: "ԏ", 0o14: "u̵", 0o15: "ᶔ", 0o16: "ⲁ", 0o17: "⌅̊"
};
const KODIGAJ_CIFEROJ_LAŬLONGO = [ ...KODIGAJ_CIFEROJ ].sort((a, b) => b.length - a.length);

// ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ ʌ ſɭɹ ſȷɔ ( Gawekiif ) ⟩
const OKTALA_GRIDO: Record<string, string> = {
    "ᶅſ": "ɔɔ", "ſן": "ɔı", "ſȷ": "ɔɿ", "ŋᷠ": "ɔц",
    "ʃ": "ıɔ", "ɽ͑ʃ'": "ıı", "j͑ʃ'": "ıɿ", "ſᶘ": "ıц", "ɭʃ'": "ıэ",
    "ɭ(": "ɿɔ", "ɭʃ": "ɿı", "j͑ʃ": "ɿɿ", "}ʃ": "ɿц", "}ʃ'": "ɿэ",
    "j͐ʃ": "цɔ", "ſ̀ȷ": "цı", "ſɭ,": "цɿ", "ſɭˬ": "цц", "oͩſ̀ȷ": "цэ",
    "ɭl̀": "эɔ", "ſɟ": "эı", "ı],": "эɿ", "ſ͕ȷ": "эц",
    "ſ͔ɭ": "ꞟɔ", "ſɭ": "ꞟı", "֭ſɭ": "ꞟɿ", "ſ͕ɭ": "ꞟц",
    "ꞇ": "ɩɔ", "ɔ": "ɩı", "ɹ": "ɩɿ", "ᴜ": "ɩц", "ȏ": "ɩэ",
    "w": "ƨɔ", "ɜ": "ƨı", "э": "ƨɿ", "ⅎ": "ƨц",
    "⟅": "эꞟɔ", "｡": "эꞟı", "ʌ": "эꞟɿ", "v": "эꞟц", "⸙": "эꞟэ", "⸾": "эꞟꞟ", "⸰": "эꞟɩ",
    "ꞁȷ̀": "ƨꞟ"
};

// ⟨ ʃɔ ( э ) ⟩
const OKTALAJ_SPECIALAJ_IPA: Record<string, string> = { "ɭʃ'": "ǃ", "}ʃ'": "ǃ̃", "oͩſ̀ȷ": "ǁ̃" };

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os IPA )
 * @param malgranda ( Mapo , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param ĉuAkceptebla ( ( gk ) => boolean , required ) - ꞁȷ̀ꞇ j͑ʃ'ɹƴ
 * @returns rezulto
 */
function troviGrandanFormon(malgranda: Mapo, ĉuAkceptebla: (gk: string) => boolean): string | null {
    const la3osa = KOMENCAJ.find(m => m.la3os === malgranda.la3os);
    if ( la3osa && ĉuAkceptebla(la3osa.gk) ) return la3osa.gk;
    const ipa = malgranda.ipa;
    if ( ipa ) {
        const speciala = Object.entries(OKTALAJ_SPECIALAJ_IPA).find(([ , p ]) => p === ipa);
        if ( speciala && ĉuAkceptebla(speciala[0o0]) ) return speciala[0o0];
        const perIpa = KOMENCAJ.find(m => m.ipa === ipa);
        if ( perIpa && ĉuAkceptebla(perIpa.gk) ) return perIpa.gk;
    }
    return null;
}

// ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ ⟩
const OKTALAJ_VALOROJ: Record<string, string> = { ...OKTALA_GRIDO };
for ( const m of INTERNAJ ) {
    const granda = troviGrandanFormon(m, gk => Boolean(OKTALA_GRIDO[gk]));
    if ( granda && !OKTALAJ_VALOROJ[m.gk] ) {
        OKTALAJ_VALOROJ[m.gk] = OKTALA_GRIDO[granda];
    }
}

// ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ ⟩
const OKTALAJ_LAŬVALORO: Record<string, string> = {};
for ( const [ gk, valoro ] of Object.entries(OKTALA_GRIDO) ) {
    if ( !OKTALAJ_LAŬVALORO[valoro] ) {
        OKTALAJ_LAŬVALORO[valoro] = gk;
    }
}

// ⟨ ſɭɹ ſȷɔ ( ɔ-ƨ ɔɔɔ-ııı ) ⟩
const OKTALA_DUUMA: Record<string, string> = {
    "ɔ": "ɔɔɔ", "ı": "ɔɔı", "ɿ": "ɔıɔ", "ц": "ɔıı",
    "э": "ıɔɔ", "ꞟ": "ıɔı", "ɩ": "ııɔ", "ƨ": "ııı"
};
const OKTALA_DUUMA_MALO: Record<string, string> = {};
for ( const [ cifero, duuma ] of Object.entries(OKTALA_DUUMA) ) {
    OKTALA_DUUMA_MALO[duuma] = cifero;
}

// ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ ( ſɭɘэ ſɭɘɹ ) ⟩

// ⟨ ֭ſɭᴜ ı],ɔ ʌ ſɭɹ ſȷɔ ⟩
const KODIGAJ_KATEGORIOJ: Record<string, { cifero: string; duuma: string }> = {
    "ɔ": { cifero: "ɔ", duuma: "ɔɔɔɔ" },
    "ı": { cifero: "ı", duuma: "ɔɔɔı" },
    "ɿ": { cifero: "ɿ", duuma: "ɔɔıɔ" },
    "ц": { cifero: "ц", duuma: "ɔɔıı" },
    "э": { cifero: "э", duuma: "ɔıɔɔ" }
};

// ⟨ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɭɹ ſȷɔ ⟩
const KODIGAJ_GRANDAJ_VALOROJ: Record<string, string> = {
    "ᶅſ": "00", "ſן": "01", "ſȷ": "02", "ŋᷠ": "07",
    "ʃ": "08", "ɽ͑ʃ'": "33", "j͑ʃ'": "32", "ſᶘ": "E3", "ɭʃ'": "31",
    "ɭ(": "48", "ɭʃ": "41", "j͑ʃ": "42", "}ʃ": "47", "}ʃ'": "37",
    "j͐ʃ": "46", "ſ̀ȷ": "E6", "ſɭ,": "58", "ſɭˬ": "E8",
    "ɭl̀": "60", "ſɟ": "61", "ı],": "62", "ſ͕ȷ": "67",
    "ſ͔ɭ": "88", "ſɭ": "81", "֭ſɭ": "82", "ſ͕ɭ": "87",
    "ꞁȷ̀": "B0"
};

// ⟨ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɭɹ ſȷɔ ⟩
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
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param valoro ( string , required ) - ɭl̀э ſȷꞇ }ʃꞇ ( ASCII E3 )
 * @returns ĉeno
 */
function asciiValoroAlCiferoj(valoro: string): string {
    return valoroAlCiferoj(parseInt(valoro, 0o20), 0o2);
}

// ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ ⟩
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

// ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ ⟩
const KODIGAJ_LAŬENIRO: Record<string, string> = {};
for ( const [ gk, eniro ] of Object.entries(KODIGAJ_ENIROJ) ) {
    const klavo = `${eniro.kategorio}_${eniro.valoro}`;
    if ( !KODIGAJ_LAŬENIRO[klavo] ) {
        KODIGAJ_LAŬENIRO[klavo] = gk;
    }
}

// ⟨ j͑ʃɹ ɭʃᴜɔ˞ ʌ ſɭɔʞ ⟩
const OKTALAJ_KLAVOJ = Object.keys(OKTALAJ_VALOROJ).sort((a, b) => b.length - a.length);
const KODIGAJ_KLAVOJ = Object.keys(KODIGAJ_ENIROJ).sort((a, b) => b.length - a.length);

/**
 * ſɟᴜ ɭʃᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ
 * @param klavoj ( string[] , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns listo
 */
function disigiEnGlifojn(teksto: string, klavoj: string[]): string[] {
    const rezulto: string[] = [];
    let i = 0o0;
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
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( ɔ-ƨ )
 * @param teksto ( string , required ) - ſɭɹ ſȷɔ ( ɔ-ƨ )
 * @returns nombro
 */
function oktalaAlValoro(teksto: string): number {
    let rezulto = 0o0;
    for ( const cifero of teksto ) {
        const valoro = B8_CIFEROJ_MALO[cifero];
        if ( valoro === undefined ) return NaN;
        rezulto = rezulto * 0o10 + valoro;
    }
    return rezulto;
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param valoro ( number , required ) - ſɭɹ ſȷɔ
 * @returns ĉeno
 */
function valoroAlOktala(valoro: number): string {
    if ( valoro === 0o0 ) return "ɔ";
    let rezulto = "";
    let restanta = valoro;
    while ( restanta > 0o0 ) {
        rezulto = B8_CIFEROJ[restanta % 0o10] + rezulto;
        restanta = Math.floor(restanta / 0o10);
    }
    return rezulto;
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param ciferoj ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns nombro
 */
function ciferojAlValoro(ciferoj: string): number {
    let rezulto = 0o0;
    let i = 0o0;
    while ( i < ciferoj.length ) {
        let kongruis = false;
        for ( const cifero of KODIGAJ_CIFEROJ_LAŬLONGO ) {
            if ( ciferoj.slice(i, i + cifero.length) === cifero ) {
                const valoro = KODIGAJ_CIFEROJ_MALO[cifero];
                if ( valoro === undefined ) return NaN;
                rezulto = rezulto * 0o20 + valoro;
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
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param valoro ( number , required ) - ɭl̀э ſȷꞇ }ʃꞇ
 * @param longo ( number = 2 , optional ) - ſןᴜ j͐ʃэ
 * @returns ĉeno
 */
function valoroAlCiferoj(valoro: number, longo = 0o2): string {
    let rezulto = valoro === 0o0 ? "ɔ" : "";
    let restanta = valoro;
    while ( restanta > 0o0 ) {
        rezulto = KODIGAJ_CIFEROJ_LAŬVALORO[restanta % 0o20] + rezulto;
        restanta = Math.floor(restanta / 0o20);
    }
    return rezulto.padStart(longo, "ɔ");
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( ɔ ı )
 * @param valoro ( number , required ) - ɭl̀э ſȷꞇ }ʃꞇ
 * @param longo ( number = 8 , optional ) - ſןᴜ j͐ʃэ
 * @returns ĉeno
 */
function valoroAlDuuma(valoro: number, longo = 0o10): string {
    return valoro.toString(0o2).padStart(longo, "0").replace(/0/g, "ɔ").replace(/1/g, "ı");
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( ɔ ı )
 * @param duuma ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( ɔ ı )
 * @returns nombro
 */
function duumaAlValoro(duuma: string): number {
    let rezulto = 0o0;
    for ( const bito of duuma ) {
        if ( bito !== "ɔ" && bito !== "ı" ) return NaN;
        rezulto = rezulto * 0o2 + (bito === "ı" ? 0o1 : 0o0);
    }
    return rezulto;
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif 1 ſɭɹ ſȷɔ )
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
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
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif 1 )
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
 */
/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif )
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( ɔ-ƨ )
 * @returns ĉeno
 */
function oktalaAlGawekiif(teksto: string): string {
    return String(teksto).split(/\s+/).filter(Boolean).map(vorto => {
        let rezulto = "";
        let i = 0o0;
while ( i < vorto.length ) {
        /* ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɹ ſȷɔ ⟩ */
        let kongruis = false;
        for ( const longo of [ 0o3, 0o2 ] ) {
            const kodo = vorto.slice( i, i + longo );
            if ( kodo.length !== longo || !OKTALAJ_LAŬVALORO[kodo] ) continue;
            if ( !Array.from( kodo ).every( cifero => B8_CIFEROJ_MALO[cifero] !== undefined ) ) continue;
            rezulto += OKTALAJ_LAŬVALORO[kodo];
            i += longo;
            kongruis = true;
            break;
        }
        if ( !kongruis ) {
            rezulto += vorto[i];
            i++;
        }
    }
        return rezulto;
    }).join(" ");
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif 1 )
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
 */
function numeroAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const ĉefa = String(teksto).split("/")[0o0] || "";
    const ĵetonoj = ĉefa.split(/\s+/).filter(Boolean);
    const ĉuDuuma = ĵetonoj.length > 0o0 && ĵetonoj.every(t => t.length % 0o3 === 0o0 && /^[ɔı]+$/.test(t));
    return ĉuDuuma ? oktalaAlGawekiif(duumaAlOktala(ĉefa)) : oktalaAlGawekiif(ĉefa);
}

/**
 * ɭʃɀɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( ſɭɘэ ſɭɘɹ 2 )
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
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
 * ſɟᴜ ɭʃᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * ſɭɔʞ ʌ ſɭɹ ſȷɔ
 * @param vorto ( string , required ) - ſɭɔʞ
 * @returns listo
 */
function disigiKodigitajnGlifojn(vorto: string): string[] {
    const glifoj: string[] = [];
    let i = 0o0;
    while ( i < vorto.length ) {
        const kategorio = vorto[i];
        if ( kategorio === "ɔ" ) {
            glifoj.push(vorto.slice(i + 0o1));
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
        for ( let k = 0o0; k < 0o2; k++ ) {
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
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( 2 Gawekiif )
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
 */
function kodigoAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return String(teksto).split(/\s+/).filter(Boolean).map(vorto => {
        return disigiKodigitajnGlifojn(vorto).join("");
    }).join(" ");
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif 2 )
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
 */
function gawekiifAlDuuma(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const { laŭlitera = false } = opcioj;
    const vortoj = String(teksto).split(/\s+/).filter(Boolean);
    return vortoj.map(vorto => {
        const duumoj = disigiEnGlifojn(vorto, KODIGAJ_KLAVOJ).map(glifo => {
            const eniro = KODIGAJ_ENIROJ[glifo];
            if ( !eniro ) return glifo;
            const kategorio = KODIGAJ_KATEGORIOJ[eniro.kategorio];
            return kategorio.duuma + valoroAlDuuma(ciferojAlValoro(eniro.valoro), 0o10);
        });
        return laŭlitera ? duumoj.join(" ") : duumoj.join("");
    }).join(" ");
}

/**
 * ſɟᴜ ɭʃᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * ſɭɔʞ ʌ ֭ſɭᴜ ı],ɔ
 * @param vorto ( string , required ) - ſɭɔʞ
 * @returns listo
 */
function disigiDuumajnGlifojn(vorto: string): string[] {
    const glifoj: string[] = [];
    let i = 0o0;
    while ( i < vorto.length ) {
        if ( i + 0o14 > vorto.length ) {
            glifoj.push(vorto.slice(i));
            break;
        }
        const ĵetono = vorto.slice(i, i + 0o14);
        const kategorio = Object.entries(KODIGAJ_KATEGORIOJ).find(([ , v ]) => v.duuma === ĵetono.slice(0o0, 0o4))?.[ 0o0 ];
        if ( !kategorio ) {
            glifoj.push(ĵetono[0o0]);
            i++;
            continue;
        }
        const valoro = duumaAlValoro(ĵetono.slice(0o4));
        if ( isNaN(valoro) ) {
            glifoj.push(ĵetono[0o0]);
            i++;
            continue;
        }
        const glifo = KODIGAJ_LAŬENIRO[`${kategorio}_${valoroAlCiferoj(valoro, 0o2)}`];
        glifoj.push(glifo || ĵetono);
        i += 0o14;
    }
    return glifoj;
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif 2 )
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
 */
function duumaAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return String(teksto).split(/\s+/).filter(Boolean).map(vorto => {
        return disigiDuumajnGlifojn(vorto).join("");
    }).join(" ");
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
 */
function encodingAlGawekiif(teksto: string): string {
    const ĉefa = String(teksto).split("/")[0o0] || "";
    const ĵetonoj = ĉefa.split(/\s+/).filter(Boolean);
    const ĉuDuuma = ĵetonoj.length > 0o0 && ĵetonoj.every(t => t.length % 0o3 === 0o0 && /^[ɔı]+$/.test(t));
    return ĉuDuuma ? duumaAlGawekiif(ĉefa) : kodigoAlGawekiif(ĉefa);
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ſɭɹ ſȷɔ ( ɔ-ƨ )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
 */
function oktalaAlKodigo(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return "ɔ" + String(teksto).replace(/\s+/g, "");
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
 */
function kodigoAlOktala(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return String(teksto).replace(/^ɔ/, "");
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ſɭɹ ſȷɔ ( ɔ-ƨ )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
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
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
 */
function duumaAlOktala(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return String(teksto).split(/\s+/).filter(Boolean).map(vorto => {
        if ( vorto.length % 0o3 !== 0o0 ) return vorto;
        let rezulto = "";
        for ( let i = 0o0; i < vorto.length; i += 0o3 ) {
            const cifero = OKTALA_DUUMA_MALO[vorto.slice(i, i + 0o3)];
            if ( cifero === undefined ) return vorto;
            rezulto += cifero;
        }
        return rezulto;
    }).join(" ");
}


// ⟪ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🔧 ⟫

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os )
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
 */
function normigiLa3osEnigon(teksto: string): string {
    return konvertiLa3osAlNumerika(teksto);
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( serxtabelo )
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param serxtabelo ( Serxtabelo , required ) - ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗
 * @returns ĉeno
 */
function konvertiPerSerxtabelo(teksto: string, serxtabelo: Serxtabelo, strikta = false): string {
    if ( !serxtabelo || !serxtabelo.keys ) return teksto;

    let rezulto = "";
    let i = 0o0;
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
        /* ⟨ ſןw ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩ */
        if ( !kongruis ) {
            if ( !strikta ) rezulto += teksto[i];
            i++;
        }
    }
    return rezulto;
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os )
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɭɹ ſȷɔ
 * @returns ĉeno
 */
function konvertiNumerikanAlLa3os(teksto: string): string {
    let rezulto = "";
    for ( const char of teksto ) {
        rezulto += NUMERIKA_MALO[char] || char;
    }
    return rezulto;
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os )
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( La3os )
 * @returns ĉeno
 */
function konvertiLa3osAlNumerika(teksto: string): string {
    let rezulto = teksto;
    const ordigitajGrupoj = Object.entries(NUMERIKA).sort((a, b) => b[0o0].length - a[0o0].length);
    for ( const [ grupo, cifero ] of ordigitajGrupoj ) {
        rezulto = rezulto.replace(new RegExp(grupo, "g"), cifero);
    }
    return rezulto;
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os IPA )
 * @param teksto ( string , required ) - ſɭɹ ſȷɔ
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { laŭlitera? }
 * @returns ĉeno
 */
function numerikaAlIpa(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return la3osAlIpa(konvertiNumerikanAlLa3os(teksto), opcioj);
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os IPA )
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( IPA )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { laŭlitera? }
 * @returns ĉeno
 */
function ipaAlNumerika(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return konvertiLa3osAlNumerika(ipaAlLa3os(teksto, opcioj));
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif )
 * @param teksto ( string , required ) - ſɭɹ ſȷɔ
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { laŭlitera? }
 * @returns ĉeno
 */
function numerikaAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return la3osAlGawekiif(konvertiNumerikanAlLa3os(teksto), opcioj);
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif )
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { laŭlitera? }
 * @returns ĉeno
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
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ
 * @param pozicio ( number , required ) - ſɭɹ ſȷɔ
 * @returns kongruo
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
 * ſɟᴜ ɭʃᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os )
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns ĉeno
 */
function disigiEnSilabojn(teksto: string): string {
    if ( !teksto ) return "";
    if ( teksto.includes(" ") ) return teksto;

    const vokalajPozicioj: VokalaKongruo[] = [];
    let i = 0o0;
    while ( i < teksto.length ) {
        const kongruo = troviVokalonJe(teksto, i);
        if ( kongruo ) {
            vokalajPozicioj.push(kongruo);
            i += kongruo.longo;
        } else {
            i++;
        }
    }

    if ( vokalajPozicioj.length <= 0o1 ) return teksto;

    const rezulto: string[] = [];
    for ( let j = 0o0; j < vokalajPozicioj.length; j++ ) {
        const kongruo = vokalajPozicioj[j];
        const start = j === 0o0 ? 0o0 : vokalajPozicioj[j - 0o1].pozicio + vokalajPozicioj[j - 0o1].longo;
        const end = j < vokalajPozicioj.length - 0o1 ? kongruo.pozicio + kongruo.longo : teksto.length;
        const silabo = teksto.slice(start, end);
        if ( silabo ) rezulto.push(silabo);
    }

    return rezulto.join(" ");
}

/**
* j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
* @param valoro ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( Gawekiif )
* @param silabo ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( La3os )
* @returns valoro
*/
function aldonuKomenconSilabo(valoro: string, silabo: string): string {
    if ( !valoro || valoro.startsWith("ꞁȷ̀") ) return valoro;
    return troviVokalonJe( silabo, 0o0 ) ? "ꞁȷ̀" + valoro : valoro;
}

/**
* ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os Gawekiif )
* @param silabo ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
* @returns ĉeno
*/
function konvertiSilabon(silabo: string): string {
    if ( cxuMalplenaAUBlanko(silabo) ) return "";

    const komencaSerxtabelo = SERXTABELO.la3os_gk_initial;
    const internaSerxtabelo = SERXTABELO.la3os_gk_internal;

    if ( !komencaSerxtabelo?.map || !internaSerxtabelo?.map ) return "ꞁȷ̀";

    if ( !troviVokalonJe( silabo, 0o0 ) ) {
        if ( komencaSerxtabelo.map[silabo] ) return aldonuKomenconSilabo( komencaSerxtabelo.map[silabo], silabo );
    } else if ( internaSerxtabelo.map[silabo] ) {
        return aldonuKomenconSilabo( internaSerxtabelo.map[silabo], silabo );
    }

    let rezulto = "";
    let i = 0o0;
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

    if ( rezulto && troviVokalonJe(silabo, 0o0) && !rezulto.startsWith("ꞁȷ̀") ) {
        rezulto = "ꞁȷ̀" + rezulto;
    }

    return rezulto || "ꞁȷ̀";
}

/**
 * ɭʃɀɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os Gawekiif )
 * @param vorto ( string , required ) - ſɭɔʞ
 * @returns ĉeno
 */
function konvertiVorton(vorto: string): string {
    if ( cxuMalplenaAUBlanko(vorto) ) return "";

    return disigiPerSpacoj(vorto).map(s => {
        return disigiEnSilabojn(s).split(/\s+/).map(konvertiSilabon).join(" ");
    }).join(" ");
}

// ⟨ j͑ʃᴜƽ ( . , | ʌ ) ⟩
const INTERPUNKCIAJ_LA3OS: Record<string, string> = { ".": "⟅", ",": "｡" };
const INTERPUNKCIAJ_IPA: Record<string, string> = { "/": "⟅", ",": "｡" };

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param vorto ( string , required ) - ſɭɔʞ
 * @returns jesne
 */
function cxuNurLa3osInterpunkcio(vorto: string): boolean {
    if ( !vorto ) return false;
    return Array.from(vorto).every(c => INTERPUNKCIAJ_LA3OS[c] !== undefined);
}

/**
 * ɭʃɀɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os Gawekiif )
 * @param vorto ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns ĉeno
 */
function konvertiLa3osInterpunkcion(vorto: string): string {
    return Array.from(vorto).map(c => INTERPUNKCIAJ_LA3OS[c] || c).join("");
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( IPA )
 * @param vorto ( string , required ) - ſɭɔʞ
 * @returns jesne
 */
function cxuNurIpaInterpunkcio(vorto: string): boolean {
    if ( !vorto ) return false;
    return Array.from(vorto).every(c => INTERPUNKCIAJ_IPA[c] !== undefined);
}

/**
 * ɭʃɀɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( IPA Gawekiif )
 * @param vorto ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns ĉeno
 */
function konvertiIpaInterpunkcion(vorto: string): string {
    return Array.from(vorto).map(c => INTERPUNKCIAJ_IPA[c] || c).join("");
}


// ⟪ ɭʃɀɜ 🔄 ⟫

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( . , / )
 * @param konvertita ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns jesne
 */
function cxuNurEligaInterpunkcio(konvertita: string): boolean {
    if ( !konvertita ) return false;
    return Array.from(konvertita).every(c => c === "." || c === "," || c === "/");
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif La3os IPA )
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param serxtabelo ( Serxtabelo , required ) - ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { laŭlitera? majuskligi? silabaDisigilo? uziNumerikan? }
 * @returns ĉeno
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
        }).filter(s => s !== "");
        if ( laŭlitera ) {
            let kunigita = "";
            for ( const s of konvertitajSilaboj ) {
                if ( cxuNurEligaInterpunkcio(s) ) {
                    kunigita += (kunigita && !kunigita.endsWith(" ") ? " " : "") + s + " ";
                } else {
                    kunigita += (kunigita && !kunigita.endsWith(" ") ? silabaDisigilo : "") + s;
                }
            }
            return kunigita.trim();
        }
        let kunigita = "";
        for ( const s of konvertitajSilaboj ) {
            kunigita += s;
            if ( cxuNurEligaInterpunkcio(s) ) kunigita += " ";
        }
        return kunigita.trim();
    });

    const rezulto = konvertitaj.join(" ");
    return uziNumerikan ? rezulto : konvertiNumerikanAlLa3os(rezulto);
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif La3os )
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { uziNumerikan? laŭlitera? }
 * @returns ĉeno
 */
function gawekiifAlLa3os(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return konvertiGawekiif(teksto, SERXTABELO.gk_la3os, opcioj);
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os Gawekiif )
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( La3os )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { laŭlitera? }
 * @returns ĉeno
 */
function la3osAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const normaligitaTeksto = normigiLa3osEnigon(teksto);
    const vortoj = disigiPerSpacoj(normaligitaTeksto);

    let rezulto = "";
    let lastWasPunct = false;
    for ( const v of vortoj ) {
        if ( cxuNurLa3osInterpunkcio(v) ) {
            rezulto += (rezulto ? " " : "") + konvertiLa3osInterpunkcion(v);
            lastWasPunct = true;
        } else {
            rezulto += (rezulto ? (lastWasPunct ? " " : " ʌ ") : "") + konvertiVorton(v);
            lastWasPunct = false;
        }
    }

    return rezulto;
}

/**
 * ɭʃɀɜ ʌ j͑ʃᴜƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( serxtabelo )
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param serxtabelo ( Serxtabelo , required ) - ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { laŭlitera? enigaDisigilo? eligaDisigilo? antaŭprilabori? }
 * @returns ĉeno
 */
function konvertiSilabojn(teksto: string, serxtabelo: Serxtabelo, opcioj: KonvertajOpcioj = {}): string {
    const { laŭlitera = false, enigaDisigilo = ".", eligaDisigilo = ".", antaŭprilabori = null } = opcioj;

    let prilaboritaTeksto = antaŭprilabori ? antaŭprilabori(teksto) : teksto;
    const silaboj = prilaboritaTeksto.split(enigaDisigilo).map(s => s.trim()).filter(Boolean);
    const konvertitaj = silaboj.map(silabo => konvertiPerSerxtabelo(silabo, serxtabelo));

    return laŭlitera ? konvertitaj.join(eligaDisigilo) : konvertitaj.join("");
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( La3os IPA )
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( La3os )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { laŭlitera? }
 * @returns ĉeno
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
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( IPA La3os )
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( IPA )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { laŭlitera? uziNumerikan? }
 * @returns ĉeno
 */
function ipaAlLa3os(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    const { uziNumerikan = true } = opcioj;
    const serxtabelo = SERXTABELO.ipa_la3os;

    /* ⟨ j͑ʃᴜƽ ʌ ſɭɔʞ ( IPA . ) ⟩ */
    const vortoj = String(teksto).split(/\s+/).filter(Boolean);

    const kunigita = vortoj.map(vorto => vorto.split(".").map(silabo => konvertiPerSerxtabelo(silabo, serxtabelo, true)).filter(Boolean).join("")).filter(Boolean).join(" ");

    return uziNumerikan ? kunigita : konvertiNumerikanAlLa3os(kunigita);
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Gawekiif IPA )
 * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { laŭlitera? }
 * @returns ĉeno
 */
function gawekiifAlIpa(teksto: string, opcioj: KonvertajOpcioj = {}): string {
    return konvertiGawekiif(teksto, SERXTABELO.gk_ipa, { ...opcioj, silabaDisigilo: "." });
}

/**
* ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( IPA )
* @param silabo ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( IPA )
* @param pozicio ( number = 0o0 , optional ) - ſɭɹ ſȷɔ ( 0 )
* @returns kungruo
*/
function troviVokalonIpaJe( silabo: string, pozicio: number = 0o0 ): { pozicio: number, vokalo: string, longo: number } | null {
    for ( let i = pozicio; i < silabo.length; i++ ) {
        for ( const vokalo of VOKALOJ_IPA ) {
            if ( silabo.slice(i, i + vokalo.length) === vokalo ) return { pozicio: i, vokalo, longo: vokalo.length };
        }
    }
    return null;
}

/**
* ſɟᴜ ɭʃᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( IPA La3os )
* @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( IPA )
* @returns silaboj
*/
function disigiIpaEnSilabojn( teksto: string ): string[] {
    /* ⟨ j͑ʃᴜƽ ( IPA ) ⟩ */
    const rezulto: string[] = [];
    for ( const segmento of teksto.split(".") ) {
        if ( !segmento ) continue;

        const vokalajPozicioj: { pozicio: number, vokalo: string, longo: number }[] = [];
        let i = 0o0;
        while ( i < segmento.length ) {
            let kongruis = false;
            for ( const vokalo of VOKALOJ_IPA ) {
                if ( segmento.slice( i, i + vokalo.length ) === vokalo ) {
                    vokalajPozicioj.push( { pozicio: i, vokalo, longo: vokalo.length } );
                    i += vokalo.length;
                    kongruis = true;
                    break;
                }
            }
            if ( !kongruis ) i++;
        }

        if ( vokalajPozicioj.length <= 0o1 ) {
            rezulto.push( segmento );
            continue;
        }

        for ( let j = 0o0; j < vokalajPozicioj.length; j++ ) {
            const kongruo = vokalajPozicioj[j];
            const start = j === 0o0 ? 0o0 : vokalajPozicioj[j - 0o1].pozicio + vokalajPozicioj[j - 0o1].longo;
            const end = j < vokalajPozicioj.length - 0o1 ? kongruo.pozicio + kongruo.longo : segmento.length;
            const silabo = segmento.slice( start, end );
            if ( silabo ) rezulto.push( silabo );
        }
    }
    return rezulto;
}

/**
* ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( IPA Gawekiif )
* @param silabo ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( IPA )
* @param estasKomenca ( boolean = false , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( 1 )
* @returns ĉeno
*/
function konvertiIpaSilabon( silabo: string ): string {
    if ( cxuMalplenaAUBlanko(silabo) ) return "";

    const komencaSerxtabelo = SERXTABELO.ipa_gk_initial;
    const internaSerxtabelo = SERXTABELO.ipa_gk_internal;

    if ( !komencaSerxtabelo?.map || !internaSerxtabelo?.map ) return "";

    const vokalo = troviVokalonIpaJe( silabo, 0o0 );
    if ( !vokalo ) return "";

    let rezulto = "";

    /* ⟨ j͑ʃᴜ ı],ɔ ʌ j͑ʃᴜƽ ⟩ */
    let unuaKonsonanto = true;
    for ( let i = 0o0; i < vokalo.pozicio; ) {
        let kongruis = false;
        const serxtabelo = unuaKonsonanto ? komencaSerxtabelo : internaSerxtabelo;
        for ( const klavo of serxtabelo.keys ) {
            if ( klavo.length <= vokalo.pozicio - i && silabo.slice(i).startsWith(klavo) ) {
                rezulto += serxtabelo.map[klavo];
                i += klavo.length;
                unuaKonsonanto = false;
                kongruis = true;
                break;
            }
        }
        if ( !kongruis ) i++;
    }

    rezulto += internaSerxtabelo.map[vokalo.vokalo] || komencaSerxtabelo.map[vokalo.vokalo] || "";

    /* ⟨ j͑ʃᴜƽ ⟩ */
    const resto = silabo.slice( vokalo.pozicio + vokalo.longo );
    for ( const klavo of internaSerxtabelo.keys ) {
        if ( VOKALOJ_IPA.includes( klavo ) ) continue;
        if ( resto.includes( klavo ) ) rezulto += internaSerxtabelo.map[klavo];
    }

    if ( !vokalo.pozicio && !rezulto.startsWith("ꞁȷ̀") ) rezulto = "ꞁȷ̀" + rezulto;

    return rezulto || "ꞁȷ̀";
}

/**
* ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( IPA Gawekiif )
* @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( IPA )
* @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { laŭlitera? }
* @returns ĉeno
*/
function ipaAlGawekiif(teksto: string, opcioj: KonvertajOpcioj = {}): string {
const vortoj = String(teksto).split(/\s+/).filter(Boolean);

    let rezulto = "";
    let lastWasPunct = false;
    for ( const vorto of vortoj ) {
        if ( cxuNurIpaInterpunkcio(vorto) ) {
            rezulto += (rezulto ? " " : "") + konvertiIpaInterpunkcion(vorto);
            lastWasPunct = true;
            continue;
        }
        const segmentoj = vorto.split(".");
        const gkSilaboj: string[] = [];
        for ( let j = 0o0; j < segmentoj.length; j++ ) {
            const segmento = segmentoj[j].trim();
            if ( !segmento ) continue;
            const eksteraj = disigiIpaEnSilabojn( segmento );
            for ( let k = 0o0; k < eksteraj.length; k++ ) {
                gkSilaboj.push( konvertiIpaSilabon( eksteraj[k] ) );
            }
        }
        const gkVorto = gkSilaboj.filter( Boolean ).join(" ");
        if ( gkVorto ) {
            rezulto += (rezulto ? (lastWasPunct ? " " : " ʌ ") : "") + gkVorto;
            lastWasPunct = false;
        }
    }

    return rezulto;
}

/**
 * ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @param teksto ( string , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @param de ( string , required ) - ſɭɔ˞ᴜ ſɭᴜ
 * @param al ( string , required ) - ſɭɔ˞ᴜ ſɭᴜ
 * @param opcioj ( KonvertajOpcioj = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ - { uziNumerikan? laŭlitera? }
 * @returns ĉeno
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


// ⟪ ꞁȷ̀ɔ j͑ʃƽɔƽ 📤 ⟫

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


// ⟪ j͑ʃᴜ ı],ɔ 🖥️ ⟫

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
            if ( !saxesuGawek2fRadios || saxesuGawek2fRadios.length === 0o0 ) return "gawekiif";
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
                eligo.gk = konverti(eligo.ipa, "ipa", "gawekiif", opcioj);
                eligo.la3os = konverti(eligo.gk, "gawekiif", "la3os", opcioj);
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
