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

const INTERNAJ: Mapo[] = [
    { gk: "п́", la3os: "w", ipa: "ⱱ" },
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
        "gawekiif_numerical": () => gawekiifAlNumerika(teksto, opciojLokala)
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
            ipa: document.getElementById("tlakakuRat0") as HTMLElement | null
        };
        const checkboxes ={ outGk: document.getElementById("a1a3kkG2") as HTMLInputElement | null,
            outLa3os: document.getElementById("a1a3kkLa3os") as HTMLInputElement | null,
            outIpa: document.getElementById("a1a3kkRat0") as HTMLInputElement | null,
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

            const eligo: Record<string, string> = { gk: "", la3os: "", ipa: "" };

            if ( fontaFormo === "gawekiif" ) {
                eligo.gk = eniraTeksto;
                eligo.la3os = konverti(eligo.gk, "gawekiif", "la3os", opcioj);
                eligo.ipa = konverti(eligo.gk, "gawekiif", "ipa", opcioj);
            } else if ( fontaFormo === "la3os" ) {
                eligo.la3os = eniraTeksto;
                eligo.gk = konverti(eligo.la3os, "la3os", "gawekiif", opcioj);
                eligo.ipa = konverti(eligo.la3os, "la3os", "ipa", opcioj);
            } else {
                eligo.ipa = eniraTeksto;
                eligo.la3os = konverti(eligo.ipa, "ipa", "la3os", opcioj);
                eligo.gk = konverti(eligo.la3os, "la3os", "gawekiif", opcioj);
            }

            const eligajKlavoj = [ "gk", "la3os", "ipa" ];
            const eligajNomoj: Record<string, string> = { gk: "Gk", la3os: "La3os", ipa: "Ipa" };
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
                }
            }

            if ( maxemaSa10Gwk ) maxemaSa10Gwk.style.display = "block";
        }

        const ciujElementoj: Element[] = [
            saxesuOx2pewa,
            ...saxesuGawek2fRadios,
            checkboxes.outGk, checkboxes.outLa3os, checkboxes.outIpa,
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
