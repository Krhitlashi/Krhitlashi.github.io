// ≺⧼ ɭʃɀɜ ʌ ſ͔ɭᴜ ᶅſɔ ſɭɹʞ 📜 ⧽≻
/**
 * ɭʃɀɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( Gawekiif La3os IPA )
 * ֭ſɭᴜ ı],ɔ ( Gawekiif )
 * j͑ʃ'ɜ ſןɹ ʌ ſɭɹ ſȷɔ ( La3os 1=ts 2=ii 3=tl 4=au 5=kz 6=aa 7=ou 0=eu )
 * j͑ʃ'ɜ ſןɹ ( IPA )
 */


// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 📦 ⟫

const LA3OS_K2FE: Record<string, string> = { "ts": "1", "ii": "2", "tl": "3", "au": "4", "kz": "5", "aa": "6", "ou": "7", "eu": "0" };
const K2FE_LA3OS: Record<string, string> = { "1": "ts", "2": "ii", "3": "tl", "4": "au", "5": "kz", "6": "aa", "7": "ou", "0": "eu" };

const AWA_CA1ARA: string[] = [ "ii", "aa", "eu", "ou", "au", "ai", "i", "e", "a", "u", "o", "2", "6", "0", "7", "4" ].sort( ( saxeKef, ara3akakKef ) => ara3akakKef.length - saxeKef.length );


// ⟪ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ 🗺️ ⟫

interface Ca1araKef {
    gk: string;
    la3os: string;
    ipa: string;
}

const XAQADI_CA1ARA: Ca1araKef[] = [
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

const C2H2_CA1ARA: Ca1araKef[] = [
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

const KEF_CA1ARA: Ca1araKef[] = [ ...XAQADI_CA1ARA, ...C2H2_CA1ARA ];

/* ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃᴜƽ ( IPA ) 📃 ⟩ */
const AWA_IPA: string[] = Array.from(
    new Set( KEF_CA1ARA.filter( ca1araKef => AWA_CA1ARA.includes( ca1araKef.la3os ) ).map( ca1araKef => ca1araKef.ipa ) )
).sort( ( saxeKef, ara3akakKef ) => ara3akakKef.length - saxeKef.length );


// ⟪ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🔧 ⟫

interface Veracel2f {
    stakefani: Record<string, string>;
    ca3aqCa1ara: string[];
}

interface TboSukf2q {
    kaj2xa?: boolean;
    puf2?: boolean;
    xezKp6catasai?: string;
    k2K2fe?: boolean;
    saxeKp6catasai?: string;
    ara3akakKp6catasai?: string;
    saxeVasaka?: ((kp6k2p2: string) => string) | null;
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ
 * @returns ſɭc̗ᴜ ſɭɹ ֭ſɭɹ
 */
function eq2k(kp6k2p2: string): boolean {
    return !kp6k2p2 || /^[ ʌ-]*$/.test(kp6k2p2);
}

/**
 * ſɟᴜ ɭʃᴜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ
 * @returns ᶅſɔ ſɭɹ ſןɹ
 */
function kaltokKp6catasai(kp6k2p2: string): string[] {
    return kp6k2p2.toLowerCase().split(/\s+/).filter(Boolean);
}

/**
 * ſɭʞɹ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( veracel2f )
 * @param kefCa1ara ( KefHat[] , required ) - j͑ʃ'ɜ ſןɹ
 * @param saxeCa3aq ( keyof KefHat , required ) - ſɭɔ˞ᴜ ſɭᴜ
 * @param ara3akakCa3aq ( keyof KefHat , required ) - ſɭɔ˞ᴜ ſɭᴜ
 * @param xaqadi ( boolean , optional ) - ſןw ʌ j͑ʃ'ɜ ſןɹ
 * @returns ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗
 */
function vasakaVeracel2f<KefHat extends Ca1araKef>(kefCa1ara: KefHat[], saxeCa3aq: keyof KefHat, ara3akakCa3aq: keyof KefHat, xaqadi = false): Veracel2f {
    const veracel2f: Veracel2f = { stakefani: {}, ca3aqCa1ara: [] };
    for ( const kef of kefCa1ara ) {
        const saxe = kef[saxeCa3aq] as string;
        const ara3akak = kef[ara3akakCa3aq] as string;
        if ( saxe && ara3akak !== undefined ) {
            if ( !xaqadi || !veracel2f.stakefani[saxe] ) {
                veracel2f.stakefani[saxe] = ara3akak;
            }
        }
    }
    veracel2f.ca3aqCa1ara = Object.keys(veracel2f.stakefani).sort((saxeKef, ara3akakKef) => ara3akakKef.length - saxeKef.length);
    return veracel2f;
}


// ⟪ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ 🔍 ⟫

const VERACEL2F = {
    gk_la3os: vasakaVeracel2f(KEF_CA1ARA, "gk", "la3os"),
    gk_ipa: vasakaVeracel2f(KEF_CA1ARA, "gk", "ipa"),
    la3os_gk_xaqadi: vasakaVeracel2f(XAQADI_CA1ARA, "la3os", "gk"),
    la3os_gk_c2h2: vasakaVeracel2f(C2H2_CA1ARA, "la3os", "gk"),
    la3os_ipa: vasakaVeracel2f(XAQADI_CA1ARA, "la3os", "ipa"),
    ipa_la3os: vasakaVeracel2f([ ...XAQADI_CA1ARA, ...C2H2_CA1ARA ], "ipa", "la3os", true),
    ipa_gk_xaqadi: vasakaVeracel2f(XAQADI_CA1ARA, "ipa", "gk", true),
    ipa_gk_c2h2: vasakaVeracel2f(C2H2_CA1ARA, "ipa", "gk", true)
};

for ( const ca1araKef of C2H2_CA1ARA ) {
    if ( ca1araKef.la3os && ca1araKef.ipa && !VERACEL2F.la3os_ipa.stakefani[ca1araKef.la3os] ) {
        VERACEL2F.la3os_ipa.stakefani[ca1araKef.la3os] = ca1araKef.ipa;
    }
}
VERACEL2F.la3os_ipa.ca3aqCa1ara = Object.keys(VERACEL2F.la3os_ipa.stakefani).sort((saxeKef, ara3akakKef) => ara3akakKef.length - saxeKef.length);


// ⟪ ſɭc̗ᴜ ſɭɹ ſȷɔ 🔢 ⟫

// ⟨ ſɭɹ ſȷɔ ( ɔ-ƨ 0-7 ɔ-⌅̊ 0-F ) 📃 ⟩
const CAJA_K2FE = [ "ɔ", "ı", "ɿ", "ц", "э", "ꞟ", "ɩ", "ƨ" ];
const CAJA_K2FE_VEM2: Record<string, number> = { "ɔ": 0o0, "ı": 0o1, "ɿ": 0o2, "ц": 0o3, "э": 0o4, "ꞟ": 0o5, "ɩ": 0o6, "ƨ": 0o7 };

const S2KANTA_K2FE = [ "ɔ", "ı", "ɿ", "ц", "э", "ꞟ", "ɩ", "ƨ", "ƨ̵", "ⱻ", "ɜ́", "ԏ", "u̵", "ᶔ", "ⲁ", "⌅̊" ];
const S2KANTA_VEM2: Record<string, number> = {
    "ɔ": 0o0, "ı": 0o1, "ɿ": 0o2, "ц": 0o3, "э": 0o4, "ꞟ": 0o5, "ɩ": 0o6, "ƨ": 0o7,
    "ƨ̵": 0o10, "ⱻ": 0o11, "ɜ́": 0o12, "ԏ": 0o13, "u̵": 0o14, "ᶔ": 0o15, "ⲁ": 0o16, "⌅̊": 0o17
};
const VEM2_S2KANTA_K2FE: Record<number, string> = {
    0o0: "ɔ", 0o1: "ı", 0o2: "ɿ", 0o3: "ц", 0o4: "э", 0o5: "ꞟ", 0o6: "ɩ", 0o7: "ƨ",
    0o10: "ƨ̵", 0o11: "ⱻ", 0o12: "ɜ́", 0o13: "ԏ", 0o14: "u̵", 0o15: "ᶔ", 0o16: "ⲁ", 0o17: "⌅̊"
};
const S2KANTA_K2FE_PUF2 = [ ...S2KANTA_K2FE ].sort((saxeKef, ara3akakKef) => ara3akakKef.length - saxeKef.length);

// ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ ʌ ſɭɹ ſȷɔ ( Gawekiif ) 📃 ⟩
const CAJA_CA1ARA: Record<string, string> = {
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

// ⟨ ʃɔ ( э ) 📃 ⟩
const CAJA_IPA: Record<string, string> = { "ɭʃ'": "ǃ", "}ʃ'": "ǃ̃", "oͩſ̀ȷ": "ǁ̃" };

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( La3os IPA )
 * @param c2h2Kef ( Ca1araKef , required ) - j͑ʃ'ɜ ſןɹ
 * @param sem2 ( ( gk ) => boolean , required ) - ſɭᴜc̗ ɭʃᴜ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function b6n2baPuf2(c2h2Kef: Ca1araKef, sem2: (gk: string) => boolean): string | null {
    const la3osKef = XAQADI_CA1ARA.find(ca1araKef => ca1araKef.la3os === c2h2Kef.la3os);
    if ( la3osKef && sem2(la3osKef.gk) ) return la3osKef.gk;
    const ipa = c2h2Kef.ipa;
    if ( ipa ) {
        const kxesu = Object.entries(CAJA_IPA).find(([ , ipa ]) => ipa === ipa);
        if ( kxesu && sem2(kxesu[0o0]) ) return kxesu[0o0];
        const ipaKef = XAQADI_CA1ARA.find(ca1araKef => ca1araKef.ipa === ipa);
        if ( ipaKef && sem2(ipaKef.gk) ) return ipaKef.gk;
    }
    return null;
}

// ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ 📃 ⟩
const CAJA_VEM2: Record<string, string> = { ...CAJA_CA1ARA };
for ( const ca1araKef of C2H2_CA1ARA ) {
    const puf2 = b6n2baPuf2(ca1araKef, gk => Boolean(CAJA_CA1ARA[gk]));
    if ( puf2 && !CAJA_VEM2[ca1araKef.gk] ) {
        CAJA_VEM2[ca1araKef.gk] = CAJA_CA1ARA[puf2];
    }
}

// ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ 📃 ⟩
const VEM2_CAXEF2: Record<string, string> = {};
for ( const [ gk, vem2 ] of Object.entries(CAJA_CA1ARA) ) {
    if ( !VEM2_CAXEF2[vem2] ) {
        VEM2_CAXEF2[vem2] = gk;
    }
}

// ⟨ ſɭɹ ſȷɔ ( ɔ-ƨ ɔɔɔ-ııı ) 📃 ⟩
const P2SA: Record<string, string> = {
    "ɔ": "ɔɔɔ", "ı": "ɔɔı", "ɿ": "ɔıɔ", "ц": "ɔıı",
    "э": "ıɔɔ", "ꞟ": "ıɔı", "ɩ": "ııɔ", "ƨ": "ııı"
};
const P2SA_CAJA: Record<string, string> = {};
for ( const [ k2fe, p2sa ] of Object.entries(P2SA) ) {
    P2SA_CAJA[p2sa] = k2fe;
}

// ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ ( ſɭɘэ ſɭɘɹ ) 📃 ⟩

// ⟨ ֭ſɭᴜ ı],ɔ ʌ ſɭɹ ſȷɔ 📃 ⟩
const S2KANTA_HAXE: Record<string, { k2fe: string; p2sa: string }> = {
    "ɔ": { k2fe: "ɔ", p2sa: "ɔɔɔɔ" },
    "ı": { k2fe: "ı", p2sa: "ɔɔɔı" },
    "ɿ": { k2fe: "ɿ", p2sa: "ɔɔıɔ" },
    "ц": { k2fe: "ц", p2sa: "ɔɔıı" },
    "э": { k2fe: "э", p2sa: "ɔıɔɔ" }
};

// ⟨ j͑ʃ'ɜ ſןɹ ʌ ſɭɹ ſȷɔ 📃 ⟩
const S2KANTA_PUF2_VEM2: Record<string, string> = {
    "ᶅſ": "00", "ſן": "01", "ſȷ": "02", "ŋᷠ": "07",
    "ʃ": "08", "ɽ͑ʃ'": "33", "j͑ʃ'": "32", "ſᶘ": "E3", "ɭʃ'": "31",
    "ɭ(": "48", "ɭʃ": "41", "j͑ʃ": "42", "}ʃ": "47", "}ʃ'": "37",
    "j͐ʃ": "46", "ſ̀ȷ": "E6", "ſɭ,": "58", "ſɭˬ": "E8",
    "ɭl̀": "60", "ſɟ": "61", "ı],": "62", "ſ͕ȷ": "67",
    "ſ͔ɭ": "88", "ſɭ": "81", "֭ſɭ": "82", "ſ͕ɭ": "87",
    "ꞁȷ̀": "B0"
};

// ⟨ j͑ʃ'ɜ ſןɹ ʌ ſɭɹ ſȷɔ 📃 ⟩
const S2KANTA_AWA_VEM2: Record<string, string> = {
    "ꞇ": "07", "ɔ": "36", "ɹ": "13", "ᴜ": "45", "w": "23", "ɜ": "22", "э": "41"
};
const S2KANTA_GEL_VEM2: Record<string, string> = {
    "ȏ": "14", "ⅎ": "22", "oͩ": "22",
    "⟅": "50", "｡": "51", "ʌ": "52", "v": "53", "⸙": "54", "⸾": "55", "⸰": "56"
};

interface S2kantaKef {
    haxe: string;
    vem2: string;
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param vem2 ( string , required ) - ɭl̀э ſȷꞇ }ʃꞇ ( ASCII E3 )
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function asciiVem2K2fe(vem2: string): string {
    return vem2K2fe(parseInt(vem2, 0o20), 0o2);
}

// ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ 📃 ⟩
const S2KANTA_CA1ARA: Record<string, S2kantaKef> = {};
for ( const [ gk, vem2 ] of Object.entries(S2KANTA_PUF2_VEM2) ) {
    S2KANTA_CA1ARA[gk] = { haxe: "ı", vem2: asciiVem2K2fe(vem2) };
}
for ( const [ gk, vem2 ] of Object.entries(S2KANTA_AWA_VEM2) ) {
    S2KANTA_CA1ARA[gk] = { haxe: "ц", vem2: asciiVem2K2fe(vem2) };
}
for ( const [ gk, vem2 ] of Object.entries(S2KANTA_GEL_VEM2) ) {
    S2KANTA_CA1ARA[gk] = { haxe: "э", vem2: asciiVem2K2fe(vem2) };
}
for ( const ca1araKef of C2H2_CA1ARA ) {
    const puf2 = b6n2baPuf2(ca1araKef, gk => Boolean(S2KANTA_PUF2_VEM2[gk]));
    if ( puf2 && !S2KANTA_CA1ARA[ca1araKef.gk] ) {
        S2KANTA_CA1ARA[ca1araKef.gk] = { haxe: "ɿ", vem2: asciiVem2K2fe(S2KANTA_PUF2_VEM2[puf2]) };
    }
}

// ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ 📃 ⟩
const HAXE_VEM2_KEF: Record<string, string> = {};
for ( const [ gk, ca1araKef ] of Object.entries(S2KANTA_CA1ARA) ) {
    const ca3aq = `${ca1araKef.haxe}_${ca1araKef.vem2}`;
    if ( !HAXE_VEM2_KEF[ca3aq] ) {
        HAXE_VEM2_KEF[ca3aq] = gk;
    }
}

// ⟨ j͑ʃɹ ɭʃᴜɔ˞ ʌ ſɭɔʞ 📃 ⟩
const CAJA_CA3AQ = Object.keys(CAJA_VEM2).sort((saxeKef, ara3akakKef) => ara3akakKef.length - saxeKef.length);
const S2KANTA_CA3AQ = Object.keys(S2KANTA_CA1ARA).sort((saxeKef, ara3akakKef) => ara3akakKef.length - saxeKef.length);

/**
 * ſɟᴜ ɭʃᴜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ
 * @param ca3aqCa1ara ( string[] , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns ᶅſɔ ſɭɹ ſןɹ
 */
function kaltokCaxef2(kp6k2p2: string, ca3aqCa1ara: string[]): string[] {
    const caxef2Ca1ara: string[] = [];
    let n2k = 0o0;
    while ( n2k < kp6k2p2.length ) {
        const ca3aq = ca3aqCa1ara.find(ca3aqEskek => kp6k2p2.slice(n2k, n2k + ca3aqEskek.length) === ca3aqEskek);
        if ( ca3aq === undefined ) {
            caxef2Ca1ara.push(kp6k2p2[n2k]);
            n2k++;
            continue;
        }
        caxef2Ca1ara.push(ca3aq);
        n2k += ca3aq.length;
    }
    return caxef2Ca1ara;
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( ɔ-ƨ )
 * @param kp6k2p2 ( string , required ) - ſɭɹ ſȷɔ ( ɔ-ƨ )
 * @returns ſɭɹ ſȷɔ
 */
function cajaVem2(kp6k2p2: string): number {
    let vem2 = 0o0;
    for ( const k2fe of kp6k2p2 ) {
        const b6n2baVem2 = CAJA_K2FE_VEM2[k2fe];
        if ( b6n2baVem2 === undefined ) return NaN;
        vem2 = vem2 * 0o10 + b6n2baVem2;
    }
    return vem2;
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param vem2 ( number , required ) - ſɭɹ ſȷɔ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function vem2Caja(vem2: number): string {
    if ( vem2 === 0o0 ) return "ɔ";
    let nejeqana = "";
    let baVem2 = vem2;
    while ( baVem2 > 0o0 ) {
        nejeqana = CAJA_K2FE[baVem2 % 0o10] + nejeqana;
        baVem2 = Math.floor(baVem2 / 0o10);
    }
    return nejeqana;
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param s2kantaK2fe ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @returns ſɭɹ ſȷɔ
 */
function k2feVem2(s2kantaK2fe: string): number {
    let vem2 = 0o0;
    let n2k = 0o0;
    while ( n2k < s2kantaK2fe.length ) {
        const ca3aq = S2KANTA_K2FE_PUF2.find(ca3aqEskek => s2kantaK2fe.slice(n2k, n2k + ca3aqEskek.length) === ca3aqEskek);
        if ( ca3aq === undefined ) return NaN;
        const vem2S2kanta = S2KANTA_VEM2[ca3aq];
        if ( vem2S2kanta === undefined ) return NaN;
        vem2 = vem2 * 0o20 + vem2S2kanta;
        n2k += ca3aq.length;
    }
    return vem2;
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param vem2 ( number , required ) - ɭl̀э ſȷꞇ }ʃꞇ
 * @param puf2 ( number = 2 , optional ) - ſןᴜ j͐ʃэ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function vem2K2fe(vem2: number, puf2 = 0o2): string {
    let nejeqana = vem2 === 0o0 ? "ɔ" : "";
    let baVem2 = vem2;
    while ( baVem2 > 0o0 ) {
        nejeqana = VEM2_S2KANTA_K2FE[baVem2 % 0o20] + nejeqana;
        baVem2 = Math.floor(baVem2 / 0o20);
    }
    return nejeqana.padStart(puf2, "ɔ");
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( ɔ ı )
 * @param vem2 ( number , required ) - ɭl̀э ſȷꞇ }ʃꞇ
 * @param puf2 ( number = 8 , optional ) - ſןᴜ j͐ʃэ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function vem2P2sa(vem2: number, puf2 = 0o10): string {
    return vem2.toString(0o2).padStart(puf2, "0").replace(/0/g, "ɔ").replace(/1/g, "ı");
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( ɔ ı )
 * @param p2sa ( string , required ) - j͑ʃ'ɜ ſןɹ ( ɔ ı )
 * @returns ſɭɹ ſȷɔ
 */
function p2saVem2(p2sa: string): number {
    let vem2 = 0o0;
    for ( const k2fe of p2sa ) {
        if ( k2fe !== "ɔ" && k2fe !== "ı" ) return NaN;
        vem2 = vem2 * 0o2 + (k2fe === "ı" ? 0o1 : 0o0);
    }
    return vem2;
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( Gawekiif 1 ſɭɹ ſȷɔ )
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboGawekiifCaja(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const { kaj2xa = false } = sukf2q;
    const kefCa1ara = String(kp6k2p2).split(/\s+/).filter(Boolean);
    return kefCa1ara.map(kef => {
        const vem2Ca1ara = kaltokCaxef2(kef, CAJA_CA3AQ).map(caxef2 => {
            return CAJA_VEM2[caxef2] || "";
        }).filter(Boolean);
        return kaj2xa ? vem2Ca1ara.join(" ") : vem2Ca1ara.join("");
    }).filter(Boolean).join(" ");
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( Gawekiif )
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ ( ɔ-ƨ )
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboCajaGawekiif(kp6k2p2: string): string {
    return String(kp6k2p2).split(/\s+/).filter(Boolean).map(kef => {
        let nejeqana = "";
        let n2k = 0o0;
        while ( n2k < kef.length ) {
        /* ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɹ ſȷɔ 📃 ⟩ */
        const puf2 = [ 0o3, 0o2 ].find(ca3aqK2fe => {
            const s2kanta = kef.slice( n2k, n2k + ca3aqK2fe );
            return s2kanta.length === ca3aqK2fe && VEM2_CAXEF2[s2kanta] && Array.from( s2kanta ).every( k2fe => CAJA_K2FE_VEM2[k2fe] !== undefined );
        });
        if ( puf2 === undefined ) {
            nejeqana += kef[n2k];
            n2k++;
            continue;
        }
        const s2kanta = kef.slice( n2k, n2k + puf2 );
        nejeqana += VEM2_CAXEF2[s2kanta];
        n2k += puf2;
    }
        return nejeqana;
    }).join(" ");
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( Gawekiif 1 )
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboCajaP2saGawekiif(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const saxeKp6k2p2 = String(kp6k2p2).split("/")[0o0] || "";
    const kefCa1ara = saxeKp6k2p2.split(/\s+/).filter(Boolean);
    const p2sa = kefCa1ara.length > 0o0 && kefCa1ara.every(kef => kef.length % 0o3 === 0o0 && /^[ɔı]+$/.test(kef));
    return p2sa ? tboCajaGawekiif(p2saCaja(saxeKp6k2p2)) : tboCajaGawekiif(saxeKp6k2p2);
}

/**
 * ɭʃɀɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( ſɭɘэ ſɭɘɹ 2 )
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboGawekiifS2kanta(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const { kaj2xa = false } = sukf2q;
    const kefCa1ara = String(kp6k2p2).split(/\s+/).filter(Boolean);
    return kefCa1ara.map(kef => {
        const s2kantaCa1ara = kaltokCaxef2(kef, S2KANTA_CA3AQ).map(caxef2 => {
            const ca1araKef = S2KANTA_CA1ARA[caxef2];
            if ( !ca1araKef ) return caxef2;
            return ca1araKef.haxe + ca1araKef.vem2;
        });
        return kaj2xa ? s2kantaCa1ara.join(" ") : s2kantaCa1ara.join("");
    }).join(" ");
}

/**
 * ſɟᴜ ɭʃᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * ſɭɔʞ ʌ ſɭɹ ſȷɔ
 * @param kef ( string , required ) - ſɭɔʞ
 * @returns ᶅſɔ ſɭɹ ſןɹ
 */
function kaltokS2kantaCaxef2(kef: string): string[] {
    const caxef2Ca1ara: string[] = [];
    let n2k = 0o0;
    while ( n2k < kef.length ) {
        const haxe = kef[n2k];
        if ( haxe === "ɔ" ) {
            caxef2Ca1ara.push(kef.slice(n2k + 0o1));
            break;
        }
        if ( haxe !== "ı" && haxe !== "ɿ" && haxe !== "ц" && haxe !== "э" ) {
            caxef2Ca1ara.push(haxe);
            n2k++;
            continue;
        }
        n2k++;
        const haxeAraqN2k = n2k;
        let s2kantaK2fe = "";
        let b6n2ba = false;
        for ( let ca3aqN2k = 0o0; ca3aqN2k < 0o2; ca3aqN2k++ ) {
            b6n2ba = false;
            for ( const k2fe of S2KANTA_K2FE_PUF2 ) {
                if ( kef.slice(n2k, n2k + k2fe.length) === k2fe ) {
                    s2kantaK2fe += k2fe;
                    n2k += k2fe.length;
                    b6n2ba = true;
                    break;
                }
            }
            if ( !b6n2ba ) break;
        }
        if ( b6n2ba ) {
            const caxef2 = HAXE_VEM2_KEF[`${haxe}_${s2kantaK2fe}`];
            caxef2Ca1ara.push(caxef2 || (haxe + s2kantaK2fe));
        } else {
            caxef2Ca1ara.push(haxe);
            n2k = haxeAraqN2k;
        }
    }
    return caxef2Ca1ara;
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( 2 Gawekiif )
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboS2kantaGawekiif(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return String(kp6k2p2).split(/\s+/).filter(Boolean).map(kef => {
        return kaltokS2kantaCaxef2(kef).join("");
    }).join(" ");
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( Gawekiif 2 )
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboGawekiifP2sa(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const { kaj2xa = false } = sukf2q;
    const kefCa1ara = String(kp6k2p2).split(/\s+/).filter(Boolean);
    return kefCa1ara.map(kef => {
        const p2saCa1ara = kaltokCaxef2(kef, S2KANTA_CA3AQ).map(caxef2 => {
            const ca1araKef = S2KANTA_CA1ARA[caxef2];
            if ( !ca1araKef ) return caxef2;
            const haxe = S2KANTA_HAXE[ca1araKef.haxe];
            return haxe.p2sa + vem2P2sa(k2feVem2(ca1araKef.vem2), 0o10);
        });
        return kaj2xa ? p2saCa1ara.join(" ") : p2saCa1ara.join("");
    }).join(" ");
}

/**
 * ſɟᴜ ɭʃᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * ſɭɔʞ ʌ ֭ſɭᴜ ı],ɔ
 * @param kef ( string , required ) - ſɭɔʞ
 * @returns ᶅſɔ ſɭɹ ſןɹ
 */
function kaltokP2saCaxef2(kef: string): string[] {
    const caxef2Ca1ara: string[] = [];
    let n2k = 0o0;
    while ( n2k < kef.length ) {
        if ( n2k + 0o14 > kef.length ) {
            caxef2Ca1ara.push(kef.slice(n2k));
            break;
        }
        const s2 = kef.slice(n2k, n2k + 0o14);
        const haxe = Object.entries(S2KANTA_HAXE).find(([ , haxeEskek ]) => haxeEskek.p2sa === s2.slice(0o0, 0o4))?.[ 0o0 ];
        if ( !haxe ) {
            caxef2Ca1ara.push(s2[0o0]);
            n2k++;
            continue;
        }
        const vem2 = p2saVem2(s2.slice(0o4));
        if ( isNaN(vem2) ) {
            caxef2Ca1ara.push(s2[0o0]);
            n2k++;
            continue;
        }
        const caxef2 = HAXE_VEM2_KEF[`${haxe}_${vem2K2fe(vem2, 0o2)}`];
        caxef2Ca1ara.push(caxef2 || s2);
        n2k += 0o14;
    }
    return caxef2Ca1ara;
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( Gawekiif 2 )
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboP2saGawekiif(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return String(kp6k2p2).split(/\s+/).filter(Boolean).map(kef => {
        return kaltokP2saCaxef2(kef).join("");
    }).join(" ");
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboS2kantaP2saGawekiif(kp6k2p2: string): string {
    const saxeKp6k2p2 = String(kp6k2p2).split("/")[0o0] || "";
    const kefCa1ara = saxeKp6k2p2.split(/\s+/).filter(Boolean);
    const p2sa = kefCa1ara.length > 0o0 && kefCa1ara.every(kef => kef.length % 0o3 === 0o0 && /^[ɔı]+$/.test(kef));
    return p2sa ? tboP2saGawekiif(saxeKp6k2p2) : tboS2kantaGawekiif(saxeKp6k2p2);
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɹ ſȷɔ ( ɔ-ƨ )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function cajaS2kanta(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return "ɔ" + String(kp6k2p2).replace(/\s+/g, "");
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function s2kantaCaja(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return String(kp6k2p2).replace(/^ɔ/, "");
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɹ ſȷɔ ( ɔ-ƨ )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function cajaP2sa(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return String(kp6k2p2).split(/\s+/).filter(Boolean).map(kef => {
        let nejeqana = "";
        for ( const k2fe of kef ) {
            const b6n2baP2sa = P2SA[k2fe];
            if ( b6n2baP2sa === undefined ) return kef;
            nejeqana += b6n2baP2sa;
        }
        return nejeqana;
    }).join(" ");
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function p2saCaja(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return String(kp6k2p2).split(/\s+/).filter(Boolean).map(kef => {
        if ( kef.length % 0o3 !== 0o0 ) return kef;
        let nejeqana = "";
        for ( let n2k = 0o0; n2k < kef.length; n2k += 0o3 ) {
            const k2fe = P2SA_CAJA[kef.slice(n2k, n2k + 0o3)];
            if ( k2fe === undefined ) return kef;
            nejeqana += k2fe;
        }
        return nejeqana;
    }).join(" ");
}


// ⟪ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🔧 ⟫

/**
 * ɭʃɀɜ ʌ ſɭɘэ ſɭɹ ſןɹ ⟅ ( La3os ſɭɹ ſȷɔ )
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ ( La3os )
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboLa3osK2fe(kp6k2p2: string): string {
    let nejeqana = kp6k2p2;
    const hateCa1ara = Object.entries(LA3OS_K2FE).sort((saxeKef, ara3akakKef) => ara3akakKef[0o0].length - saxeKef[0o0].length);
    for ( const [ hate, k2fe ] of hateCa1ara ) {
        nejeqana = nejeqana.replace(new RegExp(hate, "g"), k2fe);
    }
    return nejeqana;
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( veracel2f )
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @param veracel2f ( Veracel2f , required ) - ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboVeracel2f(kp6k2p2: string, veracel2f: Veracel2f, kaj2xa = false): string {
    if ( !veracel2f || !veracel2f.ca3aqCa1ara ) return kp6k2p2;

    let nejeqana = "";
    let n2k = 0o0;
    while ( n2k < kp6k2p2.length ) {
        const ca3aq = veracel2f.ca3aqCa1ara.find(ca3aqEskek => kp6k2p2.slice(n2k, n2k + ca3aqEskek.length) === ca3aqEskek);
        if ( ca3aq === undefined ) {
            /* ⟨ ſןw ʌ j͑ʃ'ɜ ſןɹ 📃 ⟩ */
            if ( !kaj2xa ) nejeqana += kp6k2p2[n2k];
            n2k++;
            continue;
        }
        nejeqana += veracel2f.stakefani[ca3aq];
        n2k += ca3aq.length;
    }
    return nejeqana;
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( La3os )
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ ʌ ſɭɹ ſȷɔ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboK2feLa3os(kp6k2p2: string): string {
    let nejeqana = "";
    for ( const caxef2 of kp6k2p2 ) {
        nejeqana += K2FE_LA3OS[caxef2] || caxef2;
    }
    return nejeqana;
}

function tboK2feIpa(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const { kaj2xa = false } = sukf2q;
    const kefCa1ara = String(kp6k2p2).split(/\s+/).filter(Boolean);
    return kefCa1ara.map(kef => {
        const ipa = tboVeracel2f(kef, VERACEL2F.la3os_ipa);
        const xezCa1ara = kaltokIpaXez(ipa);
        return kaj2xa ? xezCa1ara.join(".") : xezCa1ara.join("");
    }).join(" ");
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( IPA numerical )
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ ( IPA )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboIpaK2fe(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const veracel2f = VERACEL2F.ipa_la3os;
    const kefCa1ara = String(kp6k2p2).split(/\s+/).filter(Boolean);
    return kefCa1ara.map(kef => {
        const xezCa1ara = kaltokIpaXez(kef);
        return xezCa1ara.map(xez => {
            let nejeqana = "";
            let n2k = 0o0;
            while ( n2k < xez.length ) {
                const ca3aq = veracel2f.ca3aqCa1ara.find(ca3aqEskek => xez.slice(n2k).startsWith(ca3aqEskek));
                if ( ca3aq === undefined ) {
                    nejeqana += xez[n2k];
                    n2k++;
                    continue;
                }
                const la3os = veracel2f.stakefani[ca3aq];
                nejeqana += LA3OS_K2FE[la3os] || la3os;
                n2k += ca3aq.length;
            }
            return nejeqana;
        }).join("");
    }).join(" ");
}

/**
 * ɭʃɀɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( Gawekiif )
 * @param kp6k2p2 ( string , required ) - ſɭɹ ſȷɔ
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboK2feGawekiif(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return tboLa3osGawekiif(tboK2feLa3os(kp6k2p2), sukf2q);
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( Gawekiif )
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboGawekiifK2fe(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return tboLa3osK2fe(tboGawekiifLa3os(kp6k2p2, sukf2q));
}

interface AwaB6n2ba {
    n2k: number;
    awa: string;
    puf2: number;
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ
 * @param n2k ( number , required ) - ſɭɹ ſȷɔ
 * @returns ꞁȷ̀ᴜ ᶅſᴜ
 */
function b6n2baAwa(kp6k2p2: string, n2k: number): AwaB6n2ba | null {
    for ( const awa of AWA_CA1ARA ) {
        if ( kp6k2p2.slice(n2k).startsWith(awa) ) {
            return { n2k, awa, puf2: awa.length };
        }
    }
    return null;
}

/**
 * ſɟᴜ ɭʃᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( La3os )
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function kaltokXez(kp6k2p2: string): string {
    if ( !kp6k2p2 ) return "";
    if ( kp6k2p2.includes(" ") ) return kp6k2p2;

    const awaN2kCa1ara: AwaB6n2ba[] = [];
    let n2k = 0o0;
    while ( n2k < kp6k2p2.length ) {
        const awaN2k = b6n2baAwa(kp6k2p2, n2k);
        if ( awaN2k ) {
            awaN2kCa1ara.push(awaN2k);
            n2k += awaN2k.puf2;
        } else {
            n2k++;
        }
    }

    if ( awaN2kCa1ara.length <= 0o1 ) return kp6k2p2;

    const tboXezCa1ara: string[] = [];
    for ( let xezN2k = 0o0; xezN2k < awaN2kCa1ara.length; xezN2k++ ) {
        const awaN2k = awaN2kCa1ara[xezN2k];
        const saxeN2k = xezN2k === 0o0 ? 0o0 : awaN2kCa1ara[xezN2k - 0o1].n2k + awaN2kCa1ara[xezN2k - 0o1].puf2;
        const ara3akakN2k = xezN2k < awaN2kCa1ara.length - 0o1 ? awaN2k.n2k + awaN2k.puf2 : kp6k2p2.length;
        const xez = kp6k2p2.slice(saxeN2k, ara3akakN2k);
        if ( xez ) tboXezCa1ara.push(xez);
    }

    return tboXezCa1ara.join(" ");
}

/**
 * @param nejeqana ( string , required ) - j͑ʃ'ɜ ſןɹ ( Gawekiif )
 * @param xez ( string , required ) - j͑ʃ'ɜ ſןɹ ( La3os )
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function vaku3aXaqadi(nejeqana: string, xez: string): string {
    if ( !nejeqana || nejeqana.startsWith("ꞁȷ̀") ) return nejeqana;
    return b6n2baAwa( xez, 0o0 ) ? "ꞁȷ̀" + nejeqana : nejeqana;
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( La3os Gawekiif )
 * @param xez ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboXez(xez: string): string {
    if ( eq2k(xez) ) return "";

    const xaqadiVeracel2f = VERACEL2F.la3os_gk_xaqadi;
    const c2h2Veracel2f = VERACEL2F.la3os_gk_c2h2;

    if ( !xaqadiVeracel2f?.stakefani || !c2h2Veracel2f?.stakefani ) return "ꞁȷ̀";

    if ( !b6n2baAwa( xez, 0o0 ) ) {
        if ( xaqadiVeracel2f.stakefani[xez] ) return vaku3aXaqadi( xaqadiVeracel2f.stakefani[xez], xez );
    } else if ( c2h2Veracel2f.stakefani[xez] ) {
        return vaku3aXaqadi( c2h2Veracel2f.stakefani[xez], xez );
    }

    let nejeqana = "";
    let n2k = 0o0;
    let xaqadiKetu = true;

    while ( n2k < xez.length ) {
        if ( b6n2baAwa(xez, n2k) ) break;

        const veracel2f = xaqadiKetu ? xaqadiVeracel2f : c2h2Veracel2f;
        const ca3aq = veracel2f.ca3aqCa1ara.find(ca3aqEskek => xez.slice(n2k).startsWith(ca3aqEskek));
        if ( ca3aq === undefined ) break;
        nejeqana += veracel2f.stakefani[ca3aq];
        n2k += ca3aq.length;
        xaqadiKetu = false;
    }

    const awaB6n2ba = b6n2baAwa(xez, n2k);
    if ( awaB6n2ba ) {
        const awaGk = c2h2Veracel2f.stakefani[awaB6n2ba.awa];
        if ( awaGk ) nejeqana += awaGk;
        n2k += awaB6n2ba.puf2;
    }

    if ( c2h2Veracel2f.ca3aqCa1ara ) {
        while ( n2k < xez.length ) {
            const ca3aq = c2h2Veracel2f.ca3aqCa1ara.find(ca3aqEskek => !AWA_CA1ARA.includes(ca3aqEskek) && xez.slice(n2k).startsWith(ca3aqEskek));
            if ( ca3aq === undefined ) {
                n2k++;
                continue;
            }
            nejeqana += c2h2Veracel2f.stakefani[ca3aq];
            n2k += ca3aq.length;
        }
    }

    if ( nejeqana && b6n2baAwa(xez, 0o0) && !nejeqana.startsWith("ꞁȷ̀") ) {
        nejeqana = "ꞁȷ̀" + nejeqana;
    }

    return nejeqana || "ꞁȷ̀";
}

/**
 * ɭʃɀɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( La3os Gawekiif )
 * @param kef ( string , required ) - ſɭɔʞ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboKef(kef: string): string {
    if ( eq2k(kef) ) return "";

    return kaltokKp6catasai(kef).map(xez => {
        return kaltokXez(xez).split(/\s+/).map(tboXez).join(" ");
    }).join(" ");
}

// ⟨ j͑ʃᴜƽ ( . , | ʌ ) 📃 ⟩
const N2K_LA3OS: Record<string, string> = { ".": "⟅", ",": "｡" };
const N2K_IPA: Record<string, string> = { "/": "⟅", ",": "｡" };

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kef ( string , required ) - ſɭɔʞ
 * @returns ſɭc̗ᴜ ſɭɹ ֭ſɭɹ
 */
function n2kLa3os(kef: string): boolean {
    if ( !kef ) return false;
    return Array.from(kef).every(ca3aq => N2K_LA3OS[ca3aq] !== undefined);
}

/**
 * ɭʃɀɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( La3os Gawekiif )
 * @param kef ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboN2kLa3os(kef: string): string {
    return Array.from(kef).map(ca3aq => N2K_LA3OS[ca3aq] || ca3aq).join("");
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( IPA )
 * @param kef ( string , required ) - ſɭɔʞ
 * @returns ſɭc̗ᴜ ſɭɹ ֭ſɭɹ
 */
function n2kIpa(kef: string): boolean {
    if ( !kef ) return false;
    return Array.from(kef).every(ca3aq => N2K_IPA[ca3aq] !== undefined);
}

/**
 * ɭʃɀɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( IPA Gawekiif )
 * @param kef ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboN2kIpa(kef: string): string {
    return Array.from(kef).map(ca3aq => N2K_IPA[ca3aq] || ca3aq).join("");
}


// ⟪ ɭʃɀɜ 🔄 ⟫

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( . , / )
 * @param xezNejeqana ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @returns ſɭc̗ᴜ ſɭɹ ֭ſɭɹ
 */
function n2kNejeqana(xezNejeqana: string): boolean {
    if ( !xezNejeqana ) return false;
    return Array.from(xezNejeqana).every(ca3aq => ca3aq === "." || ca3aq === "," || ca3aq === "/");
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( Gawekiif La3os IPA )
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param veracel2f ( Veracel2f , required ) - ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? puf2? xezKp6catasai? k2K2fe? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboGawekiifVeracel2f(kp6k2p2: string, veracel2f: Veracel2f, sukf2q: TboSukf2q = {}): string {
    const { kaj2xa = false, puf2 = false, xezKp6catasai = " ", k2K2fe = true } = sukf2q;

    const kefCa1ara = String(kp6k2p2).split("ʌ");

    const tboKefCa1ara = kefCa1ara.map(kef => {
        const xezCa1ara = kaltokKp6catasai(kef);
        const xezNejeqanaCa1ara = xezCa1ara.map(xez => {
            let xezNejeqana = tboVeracel2f(xez, veracel2f);
            if ( puf2 ) xezNejeqana = xezNejeqana.replace(/^./, ca3aq => ca3aq.toUpperCase());
            return xezNejeqana;
        }).filter(xezNejeqana => xezNejeqana !== "");
        if ( kaj2xa ) {
            let kefNejeqana = "";
            for ( const xezNejeqana of xezNejeqanaCa1ara ) {
                if ( n2kNejeqana(xezNejeqana) ) {
                    kefNejeqana += (kefNejeqana && !kefNejeqana.endsWith(" ") ? " " : "") + xezNejeqana + " ";
                } else {
                    kefNejeqana += (kefNejeqana && !kefNejeqana.endsWith(" ") ? xezKp6catasai : "") + xezNejeqana;
                }
            }
            return kefNejeqana.trim();
        }
        let kefNejeqana = "";
        for ( const xezNejeqana of xezNejeqanaCa1ara ) {
            kefNejeqana += xezNejeqana;
            if ( n2kNejeqana(xezNejeqana) ) kefNejeqana += " ";
        }
        return kefNejeqana.trim();
    });

    const kefNejeqana = tboKefCa1ara.join(" ");
    return k2K2fe ? kefNejeqana : tboK2feLa3os(kefNejeqana);
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( Gawekiif La3os )
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { k2K2fe? kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboGawekiifLa3os(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return tboGawekiifVeracel2f(kp6k2p2, VERACEL2F.gk_la3os, sukf2q);
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( La3os Gawekiif )
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( La3os )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboLa3osGawekiif(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const k2feKp6k2p2 = tboLa3osK2fe(kp6k2p2);
    const kefCa1ara = kaltokKp6catasai(k2feKp6k2p2);

    let nejeqana = "";
    let ksozkalN2k = false;
    for ( const kef of kefCa1ara ) {
        if ( n2kLa3os(kef) ) {
            nejeqana += (nejeqana ? " " : "") + tboN2kLa3os(kef);
            ksozkalN2k = true;
        } else {
            nejeqana += (nejeqana ? (ksozkalN2k ? " " : " ʌ ") : "") + tboKef(kef);
            ksozkalN2k = false;
        }
    }

    return nejeqana;
}

/**
 * ɭʃɀɜ ʌ j͑ʃᴜƽ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( veracel2f )
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @param veracel2f ( Veracel2f , required ) - ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? saxeKp6catasai? ara3akakKp6catasai? saxeVasaka? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboXezCa1ara(kp6k2p2: string, veracel2f: Veracel2f, sukf2q: TboSukf2q = {}): string {
    const { kaj2xa = false, saxeKp6catasai = ".", ara3akakKp6catasai = ".", saxeVasaka = null } = sukf2q;

    let vasakaKp6k2p2 = saxeVasaka ? saxeVasaka(kp6k2p2) : kp6k2p2;
    const xezCa1ara = vasakaKp6k2p2.split(saxeKp6catasai).map(xezNejeqana => xezNejeqana.trim()).filter(Boolean);
    const tboKefCa1ara = xezCa1ara.map(xez => tboVeracel2f(xez, veracel2f));

    return kaj2xa ? tboKefCa1ara.join(ara3akakKp6catasai) : tboKefCa1ara.join("");
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( La3os IPA )
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( La3os )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboLa3osIpa(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const { kaj2xa = false } = sukf2q;
    const veracel2f = VERACEL2F.la3os_ipa;

    const k2feKp6k2p2 = tboLa3osK2fe(kp6k2p2);
    const kefCa1ara = kaltokKp6catasai(k2feKp6k2p2);
    const tboKefCa1ara = kefCa1ara.map(kef => {
        const xezCa1ara = kaltokKp6catasai(kaltokXez(kef));
        const ipaXezCa1ara = xezCa1ara.map(xez => tboVeracel2f(xez, veracel2f));
        return kaj2xa ? ipaXezCa1ara.join(".") : ipaXezCa1ara.join("");
    });

    return tboKefCa1ara.join(" ");
}

/* ɭʃɀɜ ʌ ı],ɔƴ ʌ ꞁȷ̀ɔ ʌ ſɭc̭ɔ ʌ ſɭᴜͷ̗ ⟅ */
/* ſɟɹƽ ꞁȷ̀ᴜꞇ ſɭɔ ɭʃw ʌ ֭ſɭᴜ ɭʃɔ ⟅ */
/* z → ្រ ｡ h → ខ ⟅ */

const KME_ANGKOK = "្";
const KME_NEJEQANA = "អ";
const GK_EQ2K_XAQADI = "ꞁȷ̀";

interface KmeKef {
    la3os: string;
    tem2: string;
    xaqadi?: string;
    kmehate?: string;
}

interface KmeNejeqana {
    tem2: string;
    hate: string;
}

const KME_CA1ARA: KmeKef[] = [
    { la3os: "w", tem2: "វ" },
    { la3os: "p", tem2: "ព" },
    { la3os: "f", tem2: "ផ" },
    { la3os: "b", tem2: "ភ" },
    { la3os: "m", tem2: "ម" },
    { la3os: "r", tem2: "រ" },
    { la3os: "v", tem2: "ថ" },
    { la3os: "t", tem2: "ត" },
    { la3os: "d", tem2: "ធ" },
    { la3os: "1", tem2: "ស", xaqadi: "ត" },
    { la3os: "s", tem2: "ស", xaqadi: "ត" },
    { la3os: "n", tem2: "ន" },
    { la3os: "3", tem2: "ល", xaqadi: "ត" },
    { la3os: "l", tem2: "ល" },
    { la3os: "5", tem2: "រ", xaqadi: "ក" },
    { la3os: "z", tem2: "រ", xaqadi: "ហ" },
    { la3os: "j", tem2: "យ" },
    { la3os: "c", tem2: "ច" },
    { la3os: "x", tem2: "ឆ" },
    { la3os: "y", tem2: "ញ" },
    { la3os: "g", tem2: "ឃ" },
    { la3os: "k", tem2: "ក" },
    { la3os: "h", tem2: "ហ", kmehate: "ខ" },
    { la3os: "q", tem2: "ង" },
    { la3os: "p'", tem2: "ព", xaqadi: "គ" },
    { la3os: "v'", tem2: "ថ", xaqadi: "គ" },
    { la3os: "l'", tem2: "ល", xaqadi: "គ" },
    { la3os: "c'", tem2: "ច", xaqadi: "គ" },
    { la3os: "t'", tem2: "ត", xaqadi: "គ" },
    { la3os: "m'", tem2: "ម", xaqadi: "គ" },
    { la3os: "nv'", tem2: "ថ", xaqadi: "ណ" },
    { la3os: "nl'", tem2: "ល", xaqadi: "ណ" },
    { la3os: "y'", tem2: "ញ", xaqadi: "ណ" },
    { la3os: "n'", tem2: "ន", xaqadi: "ណ" },
    { la3os: "i", tem2: "ី" },
    { la3os: "e", tem2: "េ" },
    { la3os: "a", tem2: "ា" },
    { la3os: "u", tem2: "ឹ" },
    { la3os: "2", tem2: "ិ" },
    { la3os: "o", tem2: "ុ" },
    { la3os: "6", tem2: "៏" },
    { la3os: "0", tem2: "េំ" },
    { la3os: "7", tem2: "ុំ" },
    { la3os: "4", tem2: "ំ" },
    { la3os: "ai", tem2: "ឹ" },
    { la3os: ".", tem2: "។" },
    { la3os: ",", tem2: "｡" },
    { la3os: "piise", tem2: "ពិសេ" }
];

/* ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ı],ɔʞ ʌ kme 📃 ⟩ */
const KME_TEM2: Record<string, string> = {};
const KME_HATE: Record<string, string> = {};
const KME_LA3OS: Record<string, string> = {};
const KME_LA3OS_CA3ARA: string[] = [];
const KME_LA3OS_NEJEQANA: Record<string, KmeNejeqana> = {};
const KME_IPA_NEJEQANA: Record<string, KmeNejeqana> = {};
const GK_CA1ARA = [ ...KEF_CA1ARA ].sort((saxeKef, ara3akakKef) => ara3akakKef.gk.length - saxeKef.gk.length);
const GK_XAQADI: Set<string> = new Set(XAQADI_CA1ARA.map(kef => kef.gk));
const KME_KHMER_IPA: Record<string, string> = {};
const KME_KHMER_IPA_CA3ARA: string[] = [];
const KME_PIISE_IPA = "pɪ̈sɛ";
for ( const kef of KME_CA1ARA ) {
    const tem2 = kef.xaqadi ? kef.xaqadi + KME_ANGKOK + kef.tem2 : kef.tem2;
    const cxuKetu = kef.la3os !== "piise" && !AWA_CA1ARA.includes(kef.la3os) && kef.la3os !== "." && kef.la3os !== ",";
    const hate = cxuKetu ? ( kef.kmehate ?? KME_ANGKOK + kef.tem2 ) : tem2;
    const kmeNejeqana = { tem2, hate };
    if ( !KME_TEM2[kef.la3os] ) KME_TEM2[kef.la3os] = tem2;
    if ( !KME_HATE[kef.la3os] ) KME_HATE[kef.la3os] = hate;
    if ( !KME_LA3OS_NEJEQANA[kef.la3os] ) KME_LA3OS_NEJEQANA[kef.la3os] = kmeNejeqana;
    const ipa = kef.la3os === "piise"
        ? KME_PIISE_IPA
        : KEF_CA1ARA.find(ca1araKef => ca1araKef.la3os === kef.la3os)?.ipa;
    if ( ipa && !KME_IPA_NEJEQANA[ipa] ) KME_IPA_NEJEQANA[ipa] = kmeNejeqana;
    for ( const kmeCa3aq of [ tem2, hate ] ) {
        if ( !KME_LA3OS[kmeCa3aq] ) {
            KME_LA3OS[kmeCa3aq] = kef.la3os;
            KME_LA3OS_CA3ARA.push(kmeCa3aq);
            if ( ipa ) {
                KME_KHMER_IPA[kmeCa3aq] = ipa;
                KME_KHMER_IPA_CA3ARA.push(kmeCa3aq);
            }
        }
    }
}
KME_KHMER_IPA[KME_NEJEQANA] = "";
KME_KHMER_IPA_CA3ARA.push(KME_NEJEQANA);
KME_LA3OS_CA3ARA.sort((saxeKef, ara3akakKef) => ara3akakKef.length - saxeKef.length);
KME_KHMER_IPA_CA3ARA.sort((saxeKef, ara3akakKef) => ara3akakKef.length - saxeKef.length);
const KME_CA3AQ = Object.keys(KME_TEM2).sort((saxeKef, ara3akakKef) => ara3akakKef.length - saxeKef.length);
const KME_IPA_CA3AQ = Object.keys(KME_IPA_NEJEQANA).sort((saxeKef, ara3akakKef) => ara3akakKef.length - saxeKef.length);

/**
 * ɭʃɀɜ ʌ ı],ɔƴ ⟅
 * @param xez ( string , required ) - ı],ɔƴ
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboXezKmeCa1ara(xez: string, ca3aqCa1ara: string[], kmeNejeqanaCa1ara: Record<string, KmeNejeqana>, awaCa1ara: string[]): string {
    if ( eq2k(xez) ) return "";
    let nejeqana = "";
    let n2k = 0o0;
    let xaqadiKetu = true;
    let awa = false;
    while ( n2k < xez.length ) {
        const ca3aq = ca3aqCa1ara.find(ca3aqEskek => xez.slice(n2k).startsWith(ca3aqEskek));
        if ( ca3aq === undefined ) {
            nejeqana += xez[n2k];
            n2k++;
            continue;
        }
        const kmeNejeqana = kmeNejeqanaCa1ara[ca3aq];
        if ( awaCa1ara.includes(ca3aq) ) {
            if ( xaqadiKetu ) nejeqana += KME_NEJEQANA;
            awa = true;
            nejeqana += kmeNejeqana.tem2;
            xaqadiKetu = false;
        } else if ( awa || xaqadiKetu ) {
            nejeqana += kmeNejeqana.tem2;
            xaqadiKetu = false;
        } else {
            nejeqana += kmeNejeqana.hate;
            xaqadiKetu = false;
        }
        n2k += ca3aq.length;
    }
    return nejeqana;
}

function tboXezKme(xez: string): string {
    return tboXezKmeCa1ara(xez, KME_CA3AQ, KME_LA3OS_NEJEQANA, AWA_CA1ARA);
}

function tboXezIpaKme(xez: string): string {
    return tboXezKmeCa1ara(xez, KME_IPA_CA3AQ, KME_IPA_NEJEQANA, AWA_IPA);
}

/**
 * ɭʃɀɜ ʌ ſɭɘэ ſɭɹ ſןɹ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( La3os )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboLa3osKme(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const kefCa1ara = kaltokKp6catasai(tboLa3osK2fe(kp6k2p2));
    const tboKefCa1ara = kefCa1ara.map(kef => {
        const xezCa1ara = kaltokKp6catasai(kaltokXez(kef));
        const kmeXezCa1ara = xezCa1ara.map(xez => tboXezKme(xez));
        return kmeXezCa1ara.join("");
    });
    return tboKefCa1ara.join("");
}

/**
 * ɭʃɀɜ ʌ ſɭɘэ ſɭɹ ſןɹ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboGawekiifKme(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const tboCaxef2Kme = (caxef2: string): string => {
        let nejeqana = "";
        let n2k = 0o0;
        let ketuKetu = false;
        let ketuKetuXaqadi = false;
        let nejeqanaHat = false;
        while ( n2k < caxef2.length ) {
            const kef = GK_CA1ARA.find(ca1araKef => caxef2.startsWith(ca1araKef.gk, n2k));
            if ( kef === undefined ) {
                nejeqana += caxef2[n2k];
                n2k++;
                ketuKetu = false;
                ketuKetuXaqadi = false;
                nejeqanaHat = false;
                continue;
            }
            n2k += kef.gk.length;
            if ( kef.gk === GK_EQ2K_XAQADI ) {
                nejeqana += KME_NEJEQANA;
                ketuKetu = false;
                ketuKetuXaqadi = false;
                nejeqanaHat = true;
                continue;
            }
            if ( kef.gk === "⺓" ) {
                nejeqana += KME_LA3OS_NEJEQANA.piise.tem2;
                ketuKetu = false;
                ketuKetuXaqadi = false;
                nejeqanaHat = false;
                continue;
            }
            const kmeNejeqana = KME_IPA_NEJEQANA[kef.ipa];
            if ( !kmeNejeqana ) {
                nejeqana += kef.gk;
                ketuKetu = false;
                ketuKetuXaqadi = false;
                nejeqanaHat = false;
                continue;
            }
            if ( AWA_IPA.includes(kef.ipa) ) {
                if ( !ketuKetu && !nejeqanaHat ) nejeqana += KME_NEJEQANA;
                nejeqana += kmeNejeqana.tem2;
                ketuKetu = false;
                ketuKetuXaqadi = false;
                nejeqanaHat = false;
            } else {
                const ekXaqadi = GK_XAQADI.has(kef.gk);
                nejeqana += ketuKetuXaqadi && !ekXaqadi ? kmeNejeqana.hate : kmeNejeqana.tem2;
                ketuKetu = true;
                ketuKetuXaqadi ||= ekXaqadi;
                nejeqanaHat = false;
            }
        }
        return nejeqana;
    };
    return String(kp6k2p2).split("ʌ").map((kef, n2k) => {
        const kmeKef = kef.split(/\s+/).filter(Boolean).map(tboCaxef2Kme).join("");
        return n2k ? ` ${kmeKef}` : kmeKef;
    }).join("");
}

/**
 * ɭʃɀɜ ʌ ſɭɘэ ſɭɹ ſןɹ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( IPA )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboIpaKme(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const kefCa1ara = String(kp6k2p2).split(/\s+/).filter(Boolean);
    return kefCa1ara.map(kef => {
        const xezCa1ara = kef === KME_PIISE_IPA ? [ kef ] : kaltokIpaXez(kef);
        const kmeXezCa1ara = xezCa1ara.map(xez => tboXezIpaKme(xez));
        return kmeXezCa1ara.join("");
    }).join("");
}

/**
 * ɭʃɀɜ ʌ ſɭɘэ ſɭɹ ſןɹ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( ſɭɹ ſȷɔ )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboK2feKme(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return tboIpaKme(tboK2feIpa(kp6k2p2, { ...sukf2q, kaj2xa: false }), sukf2q);
}

/**
 * ɭʃɀɜ ʌ ı],ɔƴ ʌ ꞁȷ̀ɔ ʌ ſɭc̭ɔ ʌ ſɭᴜͷ̗ ⟅ ( la3os )
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( ꞁȷ̀ɔ ʌ ſɭc̭ɔ ʌ ſɭᴜͷ̗ )
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function kaltokKmeLa3os(kp6k2p2: string): string {
    let nejeqana = "";
    let n2k = 0o0;
    while ( n2k < kp6k2p2.length ) {
        if ( kp6k2p2.startsWith(KME_NEJEQANA, n2k) ) {
            n2k += KME_NEJEQANA.length;
            continue;
        }
        const ca3aq = KME_LA3OS_CA3ARA.find(caxef2 => kp6k2p2.slice(n2k, n2k + caxef2.length) === caxef2);
        if ( ca3aq === undefined ) {
            nejeqana += kp6k2p2[n2k];
            n2k++;
            continue;
        }
        nejeqana += KME_LA3OS[ca3aq];
        n2k += ca3aq.length;
    }
    return nejeqana;
}

/**
 * ɭʃɀɜ ʌ ſɭɘэ ſɭɹ ſןɹ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( ꞁȷ̀ɔ ʌ ſɭc̭ɔ ʌ ſɭᴜͷ̗ )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboKmeLa3os(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const kefCa1ara = kaltokKp6catasai(kp6k2p2);
    const tboKefCa1ara = kefCa1ara.map(kef => kaltokKmeLa3os(kef));
    return tboKefCa1ara.join(" ");
}

/**
 * ɭʃɀɜ ʌ ſɭɘэ ſɭɹ ſןɹ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( ꞁȷ̀ɔ ʌ ſɭc̭ɔ ʌ ſɭᴜͷ̗ )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboKmeGawekiif(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return String(kp6k2p2).split(/\s+/).filter(Boolean).map(kef => {
        const kmeCa1ara = kef.split(KME_NEJEQANA);
        return kmeCa1ara.map((kme, n2k) => {
            const gk = tboIpaGawekiif(tboKmeIpa(kme, { ...sukf2q, kaj2xa: false }), sukf2q);
            return n2k && gk.startsWith(GK_EQ2K_XAQADI) ? gk.slice(GK_EQ2K_XAQADI.length) : gk;
        }).join(GK_EQ2K_XAQADI);
    }).join(" ");
}

/**
 * ɭʃɀɜ ʌ ſɭɘэ ſɭɹ ſןɹ ⟅
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( ꞁȷ̀ɔ ʌ ſɭc̭ɔ ʌ ſɭᴜͷ̗ )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function kaltokKmeIpa(kp6k2p2: string): string {
    let nejeqana = "";
    let n2k = 0o0;
    while ( n2k < kp6k2p2.length ) {
        const ca3aq = KME_KHMER_IPA_CA3ARA.find(ca3aqEskek => kp6k2p2.slice(n2k).startsWith(ca3aqEskek));
        if ( ca3aq === undefined ) {
            nejeqana += kp6k2p2[n2k];
            n2k++;
            continue;
        }
        nejeqana += KME_KHMER_IPA[ca3aq];
        n2k += ca3aq.length;
    }
    return nejeqana;
}

function tboKmeIpa(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const { kaj2xa = false } = sukf2q;
    const kefCa1ara = String(kp6k2p2).split(/\s+/).filter(Boolean);
    return kefCa1ara.map(kef => {
        const ipaXezCa1ara = kaltokIpaXez(kaltokKmeIpa(kef));
        return kaj2xa ? ipaXezCa1ara.join(".") : ipaXezCa1ara.join("");
    }).join(" ");
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( IPA La3os )
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ ( IPA )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? k2K2fe? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboIpaLa3os(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    const { k2K2fe = true } = sukf2q;
    const veracel2f = VERACEL2F.ipa_la3os;

    /* ⟨ j͑ʃᴜƽ ʌ ſɭɔʞ ( IPA . ) 📃 ⟩ */
    const kefCa1ara = String(kp6k2p2).split(/\s+/).filter(Boolean);

    const kefNejeqana = kefCa1ara.map(kef => kef.split(".").map(xez => tboVeracel2f(xez, veracel2f, true)).filter(Boolean).join("")).filter(Boolean).join(" ");

    return k2K2fe ? kefNejeqana : tboK2feLa3os(kefNejeqana);
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( Gawekiif IPA )
 * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ ( Gawekiif )
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tboGawekiifIpa(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
    return tboGawekiifVeracel2f(kp6k2p2, VERACEL2F.gk_ipa, { ...sukf2q, xezKp6catasai: "." });
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( IPA )
 * @param xez ( string , required ) - j͑ʃ'ɜ ſןɹ ( IPA )
 * @param n2k ( number = 0o0 , optional ) - ſɭɹ ſȷɔ ( 0 )
 * @returns ꞁȷ̀ᴜ ᶅſᴜ
 */
function b6n2baAwaIpa( xez: string, n2k: number = 0o0 ): { n2k: number, awa: string, puf2: number } | null {
    for ( let awaN2k = n2k; awaN2k < xez.length; awaN2k++ ) {
        for ( const awa of AWA_IPA ) {
            if ( xez.slice(awaN2k, awaN2k + awa.length) === awa ) return { n2k: awaN2k, awa, puf2: awa.length };
        }
    }
    return null;
}

/**
* ſɟᴜ ɭʃᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( IPA La3os )
* @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ ( IPA )
* @returns ᶅſɔ ſɭɹ ſןɹ
*/
function kaltokIpaXez( kp6k2p2: string ): string[] {
    /* ⟨ j͑ʃᴜƽ ( IPA ) 📃 ⟩ */
    const tboXezCa1ara: string[] = [];
    for ( const xezHate of kp6k2p2.split(".") ) {
        if ( !xezHate ) continue;

        const awaN2kCa1ara: { n2k: number, awa: string, puf2: number }[] = [];
        let n2k = 0o0;
        while ( n2k < xezHate.length ) {
            const awa = AWA_IPA.find(awaKef => xezHate.slice( n2k, n2k + awaKef.length ) === awaKef);
            if ( awa === undefined ) {
                n2k++;
                continue;
            }
            awaN2kCa1ara.push( { n2k: n2k, awa, puf2: awa.length } );
            n2k += awa.length;
        }

        if ( awaN2kCa1ara.length <= 0o1 ) {
            tboXezCa1ara.push( xezHate );
            continue;
        }

        for ( let xezN2k = 0o0; xezN2k < awaN2kCa1ara.length; xezN2k++ ) {
            const awaN2k = awaN2kCa1ara[xezN2k];
            const saxeN2k = xezN2k === 0o0 ? 0o0 : awaN2kCa1ara[xezN2k - 0o1].n2k + awaN2kCa1ara[xezN2k - 0o1].puf2;
            const ara3akakN2k = xezN2k < awaN2kCa1ara.length - 0o1 ? awaN2k.n2k + awaN2k.puf2 : xezHate.length;
            const xez = xezHate.slice( saxeN2k, ara3akakN2k );
            if ( xez ) tboXezCa1ara.push( xez );
        }
    }
    return tboXezCa1ara;
}

/**
* ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( IPA Gawekiif )
* @param xez ( string , required ) - j͑ʃ'ɜ ſןɹ ( IPA )
* @returns ꞁȷ̀ɜ ſɭɔʞ
*/
function tboIpaXez( xez: string ): string {
    if ( eq2k(xez) ) return "";

    const xaqadiVeracel2f = VERACEL2F.ipa_gk_xaqadi;
    const c2h2Veracel2f = VERACEL2F.ipa_gk_c2h2;

    if ( !xaqadiVeracel2f?.stakefani || !c2h2Veracel2f?.stakefani ) return "";

    const awaB6n2ba = b6n2baAwaIpa( xez, 0o0 );
    if ( !awaB6n2ba ) return "";

    let nejeqana = "";

    /* ⟨ j͑ʃᴜ ı],ɔ ʌ j͑ʃᴜƽ 📃 ⟩ */
    let xaqadiKetu = true;
    for ( let n2k = 0o0; n2k < awaB6n2ba.n2k; ) {
        const veracel2f = xaqadiKetu ? xaqadiVeracel2f : c2h2Veracel2f;
        const ca3aq = veracel2f.ca3aqCa1ara.find(ca3aqEskek => ca3aqEskek.length <= awaB6n2ba.n2k - n2k && xez.slice(n2k).startsWith(ca3aqEskek));
        if ( ca3aq === undefined ) {
            n2k++;
            continue;
        }
        nejeqana += veracel2f.stakefani[ca3aq];
        n2k += ca3aq.length;
        xaqadiKetu = false;
    }

    nejeqana += c2h2Veracel2f.stakefani[awaB6n2ba.awa] || xaqadiVeracel2f.stakefani[awaB6n2ba.awa] || "";

    /* ⟨ j͑ʃᴜƽ 📃 ⟩ */
    const ksozkalAwa = xez.slice( awaB6n2ba.n2k + awaB6n2ba.puf2 );
    for ( const ca3aq of c2h2Veracel2f.ca3aqCa1ara ) {
        if ( AWA_IPA.includes( ca3aq ) ) continue;
        if ( ksozkalAwa.includes( ca3aq ) ) nejeqana += c2h2Veracel2f.stakefani[ca3aq];
    }

    if ( !awaB6n2ba.n2k && !nejeqana.startsWith("ꞁȷ̀") ) nejeqana = "ꞁȷ̀" + nejeqana;

    return nejeqana || "ꞁȷ̀";
}

/**
* ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( IPA Gawekiif )
* @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ ( IPA )
* @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { kaj2xa? }
* @returns ꞁȷ̀ɜ ſɭɔʞ
*/
function tboIpaGawekiif(kp6k2p2: string, sukf2q: TboSukf2q = {}): string {
const kefCa1ara = String(kp6k2p2).split(/\s+/).filter(Boolean);

    let nejeqana = "";
    let ksozkalN2k = false;
    for ( const kef of kefCa1ara ) {
        if ( n2kIpa(kef) ) {
            nejeqana += (nejeqana ? " " : "") + tboN2kIpa(kef);
            ksozkalN2k = true;
            continue;
        }
        const xezHateCa1ara = kef.split(".");
        const gkXezCa1ara: string[] = [];
        for ( let xezN2k = 0o0; xezN2k < xezHateCa1ara.length; xezN2k++ ) {
            const xezHate = xezHateCa1ara[xezN2k].trim();
            if ( !xezHate ) continue;
            const xezCa1ara = kaltokIpaXez( xezHate );
            for ( let ca3aqN2k = 0o0; ca3aqN2k < xezCa1ara.length; ca3aqN2k++ ) {
                gkXezCa1ara.push( tboIpaXez( xezCa1ara[ca3aqN2k] ) );
            }
        }
        const gkKef = gkXezCa1ara.filter( Boolean ).join(" ");
        if ( gkKef ) {
            nejeqana += (nejeqana ? (ksozkalN2k ? " " : " ʌ ") : "") + gkKef;
            ksozkalN2k = false;
        }
    }

    return nejeqana;
}

/**
 * ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @param kp6k2p2 ( string , required ) - j͑ʃ'ɜ ſןɹ
 * @param saxe ( string , required ) - ſɭɔ˞ᴜ ſɭᴜ
 * @param ara3akak ( string , required ) - ſɭɔ˞ᴜ ſɭᴜ
 * @param sukf2q ( TboSukf2q = {} , optional ) - j͑ʃ'ɜ ſןɹ - { k2K2fe? kaj2xa? }
 * @returns ꞁȷ̀ɜ ſɭɔʞ
 */
function tbo(kp6k2p2: string, saxe: string, ara3akak: string, sukf2q: TboSukf2q = {}): string {
    if ( saxe === "km" ) saxe = "khmer";
    if ( ara3akak === "km" ) ara3akak = "khmer";
    if ( saxe === ara3akak ) return kp6k2p2;

    const sukf2qCa1ara: TboSukf2q = { k2K2fe: sukf2q.k2K2fe ?? true, kaj2xa: sukf2q.kaj2xa ?? false };

    const TBO_CA1ARA: Record<string, () => string> = {
        "gawekiif_la3os": () => tboGawekiifLa3os(kp6k2p2, sukf2qCa1ara),
        "la3os_gawekiif": () => tboLa3osGawekiif(kp6k2p2, sukf2qCa1ara),
        "la3os_ipa": () => tboLa3osIpa(kp6k2p2, sukf2qCa1ara),
        "ipa_la3os": () => tboIpaLa3os(kp6k2p2, sukf2qCa1ara),
        "gawekiif_ipa": () => tboGawekiifIpa(kp6k2p2, sukf2qCa1ara),
        "ipa_gawekiif": () => tboIpaGawekiif(kp6k2p2, sukf2qCa1ara),
        "la3os_khmer": () => tboLa3osKme(kp6k2p2, sukf2qCa1ara),
        "gawekiif_khmer": () => tboGawekiifKme(kp6k2p2, sukf2qCa1ara),
        "ipa_khmer": () => tboIpaKme(kp6k2p2, sukf2qCa1ara),
        "numerical_khmer": () => tboK2feKme(kp6k2p2, sukf2qCa1ara),
        "khmer_la3os": () => tboKmeLa3os(kp6k2p2, sukf2qCa1ara),
        "khmer_gawekiif": () => tboKmeGawekiif(kp6k2p2, sukf2qCa1ara),
        "khmer_ipa": () => tboKmeIpa(kp6k2p2, sukf2qCa1ara),
        "khmer_numerical": () => tboIpaK2fe(tboKmeIpa(kp6k2p2, sukf2qCa1ara), sukf2qCa1ara),
        "numerical_la3os": () => tboK2feLa3os(kp6k2p2),
        "la3os_numerical": () => tboLa3osK2fe(kp6k2p2),
        "numerical_ipa": () => tboK2feIpa(kp6k2p2, sukf2qCa1ara),
        "ipa_numerical": () => tboIpaK2fe(kp6k2p2, sukf2qCa1ara),
        "numerical_gawekiif": () => tboK2feGawekiif(kp6k2p2, sukf2qCa1ara),
        "gawekiif_numerical": () => tboGawekiifK2fe(kp6k2p2, sukf2qCa1ara),
        "gawekiif_numero": () => {
            const k2fe = tboGawekiifCaja(kp6k2p2, sukf2qCa1ara);
            if ( !k2fe ) return "";
            return k2fe + " / " + cajaP2sa(k2fe);
        },
        "numero_gawekiif": () => tboCajaP2saGawekiif(kp6k2p2, sukf2qCa1ara),
        "gawekiif_kodigo": () => tboGawekiifS2kanta(kp6k2p2, sukf2qCa1ara),
        "kodigo_gawekiif": () => tboS2kantaGawekiif(kp6k2p2, sukf2qCa1ara),
        "gawekiif_duuma": () => tboGawekiifP2sa(kp6k2p2, sukf2qCa1ara),
        "duuma_gawekiif": () => tboP2saGawekiif(kp6k2p2, sukf2qCa1ara),
        "gawekiif_encoding": () => tboGawekiifS2kanta(kp6k2p2, sukf2qCa1ara) + " / " + tboGawekiifP2sa(kp6k2p2, sukf2qCa1ara),
        "encoding_gawekiif": () => tboS2kantaP2saGawekiif(kp6k2p2)
    };

    const tboCa3aq = `${saxe}_${ara3akak}`;

    if ( TBO_CA1ARA[tboCa3aq] ) {
        return TBO_CA1ARA[tboCa3aq]();
    }

    return kp6k2p2;
}


// ⟪ j͑ʃ'ɜ ſןɹ 📤 ⟫

if ( typeof module !== "undefined" && module.exports ) {
    module.exports = {
        KEF_CA1ARA,
        XAQADI_CA1ARA,
        C2H2_CA1ARA,
        LA3OS_K2FE,
        K2FE_LA3OS,
        VERACEL2F,
        tboVeracel2f,
        tboK2feLa3os,
        tboLa3osK2fe,
        tboK2feIpa,
        tboIpaK2fe,
        b6n2baAwa,
        kaltokXez,
        tboXez,
        tboKef,
        tboGawekiifLa3os,
        tboLa3osGawekiif,
        tboLa3osIpa,
        tboIpaLa3os,
        tboLa3osKme,
        tboGawekiifKme,
        tboIpaKme,
        tboK2feKme,
        tboKmeLa3os,
        tboKmeGawekiif,
        tboKmeIpa,
        kaltokKmeLa3os,
        KME_CA1ARA,
        tboGawekiifIpa,
        tboIpaGawekiif,
        tboK2feGawekiif,
        tboGawekiifK2fe,
        tboGawekiifCaja,
        tboCajaGawekiif,
        tboCajaP2saGawekiif,
        tboGawekiifS2kanta,
        tboS2kantaGawekiif,
        tboGawekiifP2sa,
        tboP2saGawekiif,
        tboS2kantaP2saGawekiif,
        cajaS2kanta,
        s2kantaCaja,
        cajaP2sa,
        p2saCaja,
        tbo
    };
}


// ⟪ j͑ʃᴜ ı],ɔ 🖥️ ⟫

(function() {
    if ( typeof document === "undefined" ) return;

    function saxeTbo() {
        const saxesuOx2pewa = document.getElementById("saxesuOx2pewa") as HTMLTextAreaElement | null;
        const maxemaSa10Gawekiif = document.getElementById("maxemaSa10Gwk") as HTMLElement | null;
        const xcanaCa1ara = {
            gk: document.getElementById("tlakakuG2") as HTMLElement | null,
            la3os: document.getElementById("tlakakuLa3os") as HTMLElement | null,
            ipa: document.getElementById("tlakakuRat0") as HTMLElement | null,
            khmer: document.getElementById("tlakakuKhmer") as HTMLElement | null,
            caja: document.getElementById("tlakakuK2fe") as HTMLElement | null,
            s2kanta: document.getElementById("tlakakuKodigo") as HTMLElement | null,
            cajaP2sa: document.getElementById("tlakakuK2feDuuma") as HTMLElement | null,
            s2kantaP2sa: document.getElementById("tlakakuKodigoDuuma") as HTMLElement | null
        };
        const nejeqanaSukf2q = { ara3akakGk: document.getElementById("a1a3kkG2") as HTMLInputElement | null,
            ara3akakLa3os: document.getElementById("a1a3kkLa3os") as HTMLInputElement | null,
            ara3akakIpa: document.getElementById("a1a3kkRat0") as HTMLInputElement | null,
            ara3akakKhmer: document.getElementById("a1a3kkKhmer") as HTMLInputElement | null,
            ara3akakCaja: document.getElementById("a1a3kkK2fe") as HTMLInputElement | null,
            ara3akakS2kanta: document.getElementById("a1a3kkKodigo") as HTMLInputElement | null,
            k2K2feKek: document.getElementById("a1aK2reK2fe") as HTMLInputElement | null,
            kaj2xa: document.getElementById("a1aKaj2xa") as HTMLInputElement | null
        };
        const saxesuGawek2fKekCa1ara = Array.from(document.getElementsByName("saxesuGawek2f")) as HTMLInputElement[];

        if ( !saxesuOx2pewa ) return;

        function b6n2baSaxeSukf2q(): string {
            if ( !saxesuGawek2fKekCa1ara || saxesuGawek2fKekCa1ara.length === 0o0 ) return "gawekiif";
            for ( const kal of saxesuGawek2fKekCa1ara ) {
                if ( kal.checked ) return kal.value;
            }
            return "gawekiif";
        }

        function tboKp6k2p2() {
            if ( !saxesuOx2pewa ) return;
            const saxesuKp6k2p2 = saxesuOx2pewa.value.trim();
            if ( !saxesuKp6k2p2 ) {
                if ( maxemaSa10Gawekiif ) maxemaSa10Gawekiif.style.display = "none";
                return;
            }

            const saxeSukf2q = b6n2baSaxeSukf2q();
            const k2K2fe = nejeqanaSukf2q.k2K2feKek?.checked ?? true;
            const sukf2q: TboSukf2q = {
                k2K2fe: k2K2fe,
                kaj2xa: nejeqanaSukf2q.kaj2xa?.checked || false
            };

            const nejeqanaCa1ara: Record<string, string> = { gk: "", la3os: "", ipa: "", khmer: "", caja: "", s2kanta: "", cajaP2sa: "", s2kantaP2sa: "" };

            if ( saxeSukf2q === "gawekiif" ) {
                nejeqanaCa1ara.gk = saxesuKp6k2p2;
                nejeqanaCa1ara.la3os = tbo(nejeqanaCa1ara.gk, "gawekiif", "la3os", sukf2q);
                nejeqanaCa1ara.ipa = tbo(nejeqanaCa1ara.gk, "gawekiif", "ipa", sukf2q);
                nejeqanaCa1ara.khmer = tbo(nejeqanaCa1ara.gk, "gawekiif", "khmer", sukf2q);
            } else if ( saxeSukf2q === "la3os" ) {
                nejeqanaCa1ara.la3os = saxesuKp6k2p2;
                nejeqanaCa1ara.gk = tbo(nejeqanaCa1ara.la3os, "la3os", "gawekiif", sukf2q);
                nejeqanaCa1ara.ipa = tbo(nejeqanaCa1ara.la3os, "la3os", "ipa", sukf2q);
                nejeqanaCa1ara.khmer = tbo(nejeqanaCa1ara.la3os, "la3os", "khmer", sukf2q);
            } else if ( saxeSukf2q === "ipa" ) {
                nejeqanaCa1ara.ipa = saxesuKp6k2p2;
                nejeqanaCa1ara.gk = tbo(nejeqanaCa1ara.ipa, "ipa", "gawekiif", sukf2q);
                nejeqanaCa1ara.la3os = tbo(nejeqanaCa1ara.ipa, "ipa", "la3os", sukf2q);
                nejeqanaCa1ara.khmer = tbo(nejeqanaCa1ara.ipa, "ipa", "khmer", sukf2q);
            } else if ( saxeSukf2q === "khmer" ) {
                nejeqanaCa1ara.khmer = saxesuKp6k2p2;
                nejeqanaCa1ara.la3os = tbo(nejeqanaCa1ara.khmer, "khmer", "la3os", sukf2q);
                nejeqanaCa1ara.gk = tbo(nejeqanaCa1ara.khmer, "khmer", "gawekiif", sukf2q);
                nejeqanaCa1ara.ipa = tbo(nejeqanaCa1ara.khmer, "khmer", "ipa", sukf2q);
            } else if ( saxeSukf2q === "numero" ) {
                nejeqanaCa1ara.caja = saxesuKp6k2p2;
                nejeqanaCa1ara.gk = tbo(nejeqanaCa1ara.caja, "numero", "gawekiif", sukf2q);
                nejeqanaCa1ara.la3os = tbo(nejeqanaCa1ara.gk, "gawekiif", "la3os", sukf2q);
                nejeqanaCa1ara.ipa = tbo(nejeqanaCa1ara.gk, "gawekiif", "ipa", sukf2q);
                nejeqanaCa1ara.khmer = tbo(nejeqanaCa1ara.gk, "gawekiif", "khmer", sukf2q);
            } else {
                nejeqanaCa1ara.s2kanta = saxesuKp6k2p2;
                nejeqanaCa1ara.gk = tboS2kantaP2saGawekiif(saxesuKp6k2p2);
                nejeqanaCa1ara.la3os = tbo(nejeqanaCa1ara.gk, "gawekiif", "la3os", sukf2q);
                nejeqanaCa1ara.ipa = tbo(nejeqanaCa1ara.gk, "gawekiif", "ipa", sukf2q);
                nejeqanaCa1ara.khmer = tbo(nejeqanaCa1ara.gk, "gawekiif", "khmer", sukf2q);
            }

            const k2fe = tboGawekiifCaja(nejeqanaCa1ara.gk, sukf2q);
            nejeqanaCa1ara.caja = k2fe;
            nejeqanaCa1ara.cajaP2sa = k2fe ? cajaP2sa(k2fe) : "";
            nejeqanaCa1ara.s2kanta = tboGawekiifS2kanta(nejeqanaCa1ara.gk, sukf2q);
            nejeqanaCa1ara.s2kantaP2sa = tboGawekiifP2sa(nejeqanaCa1ara.gk, sukf2q);

            const nejeqanaCa3aq = [ "gk", "la3os", "ipa", "khmer", "caja", "s2kanta" ];
            const nejeqanaAra3akak: Record<string, string> = { gk: "Gk", la3os: "La3os", ipa: "Ipa", khmer: "Khmer", caja: "Caja", s2kanta: "S2kanta" };
            const nejeqanaHtml: Record<string, string> = { caja: "number", s2kanta: "encoding" };
            for ( const ca3aq of nejeqanaCa3aq ) {
                const sukf2qKef = nejeqanaSukf2q[`ara3akak${nejeqanaAra3akak[ca3aq]}` as keyof typeof nejeqanaSukf2q];
                const nejeqanaKal = xcanaCa1ara[ca3aq as keyof typeof xcanaCa1ara];
                const hate = document.querySelector(`.ksakap2sa[data-output="${nejeqanaHtml[ca3aq] ?? ca3aq}"]`) as HTMLElement | null;
                const mana = nejeqanaKal?.parentElement;
                if ( sukf2qKef && nejeqanaKal && mana ) {
                    nejeqanaKal.textContent = nejeqanaCa1ara[ca3aq] || "";
                    if ( ca3aq === "gk" && typeof vacepu === "function" ) {
                        vacepu("ox2pewa");
                    }
                    const xcana = sukf2qKef.checked;
                    if ( hate ) {
                        hate.style.display = xcana ? "block" : "none";
                    }
                    mana.style.display = xcana ? "flex" : "none";
                    if ( ca3aq === "caja" || ca3aq === "s2kanta" ) {
                        const p2saS2 = ca3aq === "caja" ? "cajaP2sa" : "s2kantaP2sa";
                        const p2saKek = xcanaCa1ara[p2saS2 as keyof typeof xcanaCa1ara];
                        if ( p2saKek ) {
                            p2saKek.textContent = nejeqanaCa1ara[p2saS2] || "";
                            const p2saKuba = p2saKek.parentElement;
                            if ( p2saKuba ) p2saKuba.style.display = xcana ? "flex" : "none";
                        }
                    }
                }
            }

            if ( maxemaSa10Gawekiif ) maxemaSa10Gawekiif.style.display = "flex";
        }

        const c0zKalCa1ara: Element[] = [
            saxesuOx2pewa,
            ...saxesuGawek2fKekCa1ara,
            nejeqanaSukf2q.ara3akakGk, nejeqanaSukf2q.ara3akakLa3os, nejeqanaSukf2q.ara3akakIpa,
            nejeqanaSukf2q.ara3akakKhmer, nejeqanaSukf2q.ara3akakCaja, nejeqanaSukf2q.ara3akakS2kanta,
            nejeqanaSukf2q.k2K2feKek, nejeqanaSukf2q.kaj2xa
        ].filter(Boolean) as Element[];

        for ( const kal of c0zKalCa1ara ) {
            const lukfek = kal === saxesuOx2pewa ? "input" : "change";
            kal.addEventListener(lukfek, tboKp6k2p2);
        }
    }

    if ( document.readyState === "loading" ) {
        document.addEventListener("DOMContentLoaded", saxeTbo);
    } else {
        saxeTbo();
    }
})();
