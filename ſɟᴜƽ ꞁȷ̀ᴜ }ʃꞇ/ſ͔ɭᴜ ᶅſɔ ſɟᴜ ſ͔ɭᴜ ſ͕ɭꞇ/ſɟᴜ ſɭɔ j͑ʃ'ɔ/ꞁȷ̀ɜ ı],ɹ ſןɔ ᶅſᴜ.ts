import * as XLSX from "xlsx";

// ≺⧼ Iikrhia Xema Ox2pewaKf2 🌐 ⧽≻
/**
 * ſɭʞɹ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Iikrhia VOS )
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 *
 * ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ( He V Evi O ⺓ Evi Adj S )
 */

// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 📦 ⟫

const P2SE = "⺓";
const CEZ = "ſɟɔƴ";
const TACE = "ɭʃᴜ ſɟɔ";
const KAL = "ſɭᴜͷ̗";
const QU = "ſ͕ɭw";
const MU = "ŋᷠw";
const KEF_PUK2FE = "ʌ";
const OX2PEWA_NE1A = "⟅";

const KP6_CA1ARA = [ P2SE, CEZ, TACE, KAL, QU, MU ];

const AIH_AWA = "ꞇɹɔᴜwɜэⅎ";
const KSAKA_CA1ARA = [
    "п́", "ɘ", "ʞ", "ɀ", "c̭", "ƣ̋", "ⰱ", "ƨ", "ԏ͕", "ꝛ̗",
    "ɔ˞", "c̗", "ŋ", "ͷ̗", "ɯ", "ƴ", "ᴎ", "ᴜ̭", "ᶗ‹", "ⱷ̮̀",
    "ɴ", "ƽ", "ᴜ̩", "ȝ"
];

// ⟪ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ 🔧 ⟫

const S2WENI_SAXES2TAS: Record<string, [ string, string ]> = {
    "2R": [ "ꞁȷ̀ɹƣ̋", "ꞁȷ̀ɹ" ],
    "K2R": [ "ſɭɹƣ̋", "ſɭɹ" ],
    "J6R": [ "ɭl̀эƣ̋", "ɭl̀э" ],
    "H2R": [ "֭ſɭɹƣ̋", "֭ſɭɹ" ],
    "SAR": [ "j͑ʃᴜƣ̋", "j͑ʃᴜ" ],
    "SWER": [ "j͑ʃп́ɔƣ̋", "j͑ʃп́ɔ" ],
    "SER": [ "j͑ʃɔƣ̋", "j͑ʃɔ" ],
};

const QUQXEMA_SAXES2TAS: Record<string, [ string, string ]> = {
    "OR": [ "ꞁȷ̀ɜƣ̋", "ꞁȷ̀ɜ" ],
    "YOR": [ "ſ͕ȷɜƣ̋", "ſ͕ȷɜ" ],
    "TAK": [ "ɭʃᴜƽ", "ɭʃᴜ" ],
    "KOTAK": [ "ſɭɜ ɭʃᴜƽ", "ſɭɜ ɭʃᴜ" ]
};

const KO_SAXES2TAS: Record<string, [ string, string ]> = {
    "KON": [ "ſɭɜc̗", "ſɭɜ" ],
};

const VASAKA_SAXES2TAS: Record<string, [ string, string ]> = {
    "VER": [ "j͑ʃ'ɔƣ̋", "j͑ʃ'ɔ" ],
    "VES": [ "j͑ʃ'ɔɔ˞", "j͑ʃ'ᴜ" ],
    "B6N": [ "ʃэc̗", "ʃэ" ],
    "L6R": [ "j͐ʃэƣ̋", "j͐ʃэ" ],
};

const SAXES2TAS_BAL2XA: Record<string, [ string, string ]> = {
    ...S2WENI_SAXES2TAS,
    ...QUQXEMA_SAXES2TAS,
    ...KO_SAXES2TAS,
    ...VASAKA_SAXES2TAS
};

const S2WENI_SAXES2TAS_HAT = new Set(Object.keys(S2WENI_SAXES2TAS));

const QUQXEMA_BAL2XA: Record<string, string> = {
    "YOR": "OR",
    "OR": "YOR",
    "KOTAK": "TAK",
    "TAK": "KOTAK"
};

const ARAQS2TAS_BAL2XA: Record<string, [ string, string ]> = {
    "SU": [ "j͑ʃᴜꞇ", "ꞁȷ̀ᴜꞇ" ],
    "AL": [ "j͐ʃ", "ꞁȷ̀ᴜͷ̗" ],
    "ANI": [ "}ʃꞇ", "ꞁȷ̀ᴜ }ʃꞇ" ],
    "ANU": [ "}ʃw", "ꞁȷ̀ᴜ }ʃw" ],
    "KOZ": [ "ſɭɜƴ", "ꞁȷ̀ɜƴ" ],
    "STIF": [ "j͑ʃƨꞇʞ", "ɭʃꞇʞ" ],
};

// ⟨ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ ʌ ſɭɔʞ 🔤 ⟩

const S2TAS_SKAKEFANI: Record<string, string> = {
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
    "STIF": "STIFEH2"
};

const HAXE_KSAKA: Record<string, string> = { Verb: "V", Noun: "N", Adjective: "ADJ", Evidential: "EVI" };


// ⟪ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɭɹ ſȷɔ 📚 ⟫

type Kf2Keve = () => unknown;

class XezHtakaB6vegejex {
    private _kf2Bal2xa: Record<string, Kf2Keve> = {};

    b6vegejex(name: string) {
        return (func: Kf2Keve): Kf2Keve => {
            this._kf2Bal2xa[name] = func;
            return func;
        };
    }

    quqXezHtakaCa1ara(): string[] {
        return Object.keys(this._kf2Bal2xa);
    }

    kf2(name: string): unknown {
        const generator = this._kf2Bal2xa[name];
        if (generator) {
            return generator();
        }
        return null;
    }
}

const xezHtakaB6vegejex = new XezHtakaB6vegejex();


// ⟪ ʃɔ 🔤 ⟫

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 *     @param kef ( string , required ) - ſɭɔʞ
  *  @returns cez
 * */
function ekAwaSaxe(kef: string): boolean {
    if ( !kef || !kef.trim() ) {
        return false;
    }
    const stripped = kef.trim();
    if ( stripped.startsWith("ꞁȷ̀") ) {
        return true;
    }
    return AIH_AWA.includes(stripped[0o0]);
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( ʃɔ )
 *     @param kef ( string , required ) - ſɭɔʞ
  *  @returns cez
 * */
function ekAwaAraq(kef: string): boolean {
    if ( !kef ) {
        return true;
    }
    const stripped = kef.trimEnd();
    if ( !stripped ) {
        return true;
    }
    for ( const coda of KSAKA_CA1ARA ) {
        if ( stripped.endsWith(coda) ) {
            return false;
        }
    }
    return AIH_AWA.includes(stripped[stripped.length - 0o1]);
}


// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔʞ 🔧 ⟫

interface KefEskek {
    gawekiif: string;
    skakefani: string;
    haxe: string;
    n2kK2fe?: number;
    _s2weniSaxe?: string;
    _s2weniSaxeS2tas?: string;
}

interface VasakaKefEskek extends KefEskek {
    _quqSaxeS2tas?: string | null;
    _quqAraqS2tas?: string | null;
    _quqQuqXema?: string | null;
    _quqXemaKo?: boolean;
    _quqKoz?: boolean;
}

interface ZeniVasakaHat {
    s2tas?: string | null;
    quqXema?: string | null;
    quqXemaKo?: boolean;
    kf2Koz?: boolean;
    xemaS2tas?: boolean;
    xemaQuqXema?: boolean;
    saxeSaxeS2tas?: string | null;
}

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( OR TAK YOR KOTAK )
 * ſɭʞɹ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( OR TAK YOR KOTAK )
    * @param zeni ( KefEskek , required ) - ſɭɔʞ ( gawekiif )
    * @param hatCa1ara ( ZeniVasakaHat = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns kef
 */
function quqZeniVasaka(zeni: KefEskek, k61eCa1ara: ZeniVasakaHat = {}): VasakaKefEskek {
    let {
        s2tas = null,
        quqXema = null,
        quqXemaKo = false,
        kf2Koz = false,
        xemaS2tas = false,
        xemaQuqXema = false,
        saxeSaxeS2tas = null
    } = k61eCa1ara;

    let zeniHat = zeni.gawekiif;
    let zeniSkakefani = zeni.skakefani;
    let quqSaxeS2tas: string | null = null;
    let quqAraqS2tas: string | null = null;
    let quqQuqXema: string | null = null;

    const quqQuqXemaS2tas = (kef: string, vasaka: string, ko: boolean): string => {
        const s2tasBal2xa: Record<string, string> = { "OR": ko ? "YOR" : "OR", "TAK": ko ? "KOTAK" : "TAK" };
        const s2tasS2 = s2tasBal2xa[vasaka];
        return s2tasS2 ? quqS2tas(kef, s2tasS2) : kef;
    };

    if (quqXema) {
        const quqXemaSaxeS2tas = quqXemaKo ? "YOR" : "OR";
        if (saxeSaxeS2tas && quqHaxeS2tas(quqXemaSaxeS2tas) === saxeSaxeS2tas) {
            quqXema = null;
            quqXemaKo = false;
        } else {
            zeniHat = quqQuqXemaS2tas(zeniHat, quqXema, quqXemaKo);
            quqQuqXema = quqXema;
            quqSaxeS2tas = quqXemaSaxeS2tas;
        }
    }

    if (!quqQuqXema && xemaQuqXema) {
        const modalities: [ string, boolean ][] = [ [ "OR", false ], [ "TAK", false ] ];
        const [ sukf2qQuqXema, ko ] = modalities[Math.floor(Math.random() * modalities.length)];
        const sukf2qSaxeS2tas = ko ? "YOR" : "OR";
        if (saxeSaxeS2tas && quqHaxeS2tas(sukf2qSaxeS2tas) === saxeSaxeS2tas) {
        } else {
            zeniHat = quqQuqXemaS2tas(zeniHat, sukf2qQuqXema, ko);
            quqQuqXema = sukf2qQuqXema;
            quqSaxeS2tas = sukf2qSaxeS2tas;
        }
    }

    if (s2tas) {
        zeniHat = quqS2tas(zeniHat, s2tas);
        if (SAXES2TAS_BAL2XA[s2tas]) {
            quqSaxeS2tas = s2tas;
        } else if (ARAQS2TAS_BAL2XA[s2tas]) {
            quqAraqS2tas = s2tas;
        }
    } else if (xemaS2tas) {
        const s2tasCa1ara = [ "L6R", "B6N" ];
        const sukf2qS2tas = s2tasCa1ara[Math.floor(Math.random() * s2tasCa1ara.length)];
        zeniHat = quqS2tas(zeniHat, sukf2qS2tas);
        quqSaxeS2tas = sukf2qS2tas;
    }

    if (kf2Koz) {
        zeniHat = quqS2tas(zeniHat, "KOZ");
        quqAraqS2tas = "KOZ";
    }

    return {
        ...zeni,
        gawekiif: zeniHat,
        skakefani: zeniSkakefani,
        _quqSaxeS2tas: quqSaxeS2tas,
        _quqAraqS2tas: quqAraqS2tas,
        _quqQuqXema: quqQuqXema,
        _quqXemaKo: quqXemaKo,
        _quqKoz: kf2Koz
    };
}


// ⟪ ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ 🔧 ⟫

/**
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param kef ( string , required ) - ſɭɔʞ
    * @param s2tasHat ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞ ( OR KON SU AL )
 * @returns k61e
 */
function quqS2tas(kef: string, s2tasHat: string): string {
    if ( !kef ) return kef;

    if ( SAXES2TAS_BAL2XA[s2tasHat] ) {
        const [ vowelForm, consonantForm ] = SAXES2TAS_BAL2XA[s2tasHat];
        const form = ekAwaSaxe(kef) ? vowelForm : consonantForm;
        return `${form} ${kef}`;
    }

    if ( ARAQS2TAS_BAL2XA[s2tasHat] ) {
        const [ vowelForm, consonantForm ] = ARAQS2TAS_BAL2XA[s2tasHat];
        const form = ekAwaAraq(kef) ? vowelForm : consonantForm;
        return `${kef} ${form}`;
    }

    return kef;
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param s2tasHat ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns cez
 */
function ekS2weniS2tas(s2tasHat: string): boolean {
    return S2WENI_SAXES2TAS_HAT.has(s2tasHat);
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( L6R )
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( L6R )
 * ſɭɹ ɽ͑ʃ'ɔ ʌ quqL6R ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( L6R )
    * @param kef ( string , required ) - ſɭɔʞ
    * @param kefEskek ( KefEskek | null = null , optional ) - ſɭɔʞ ( L6R )
 * @returns cez
 */
function ekS2weniSaxeS2tas(kef: string, kefEskek: KefEskek | null = null): boolean {
    if ( !kef ) return false;

    for ( const saxeS2tas of Object.keys(S2WENI_SAXES2TAS) ) {
        const [ vowelForm, consonantForm ] = SAXES2TAS_BAL2XA[saxeS2tas];
        if ( kef.startsWith(vowelForm + " ") || kef.startsWith(consonantForm + " ") ) {
            return true;
        }
    }

    const l6rUsage = quqL6R(kef, kefEskek);
    return l6rUsage === "s2weni";
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( L6R )
    * @param kef ( string | null , required ) - ſɭɔʞ
    * @param kefEskek ( KefEskek | null , required ) - ſɭɔʞ
 * @returns k61e
 */
function quqL6R(kef: string | null, kefEskek: KefEskek | null): string {
    if ( !kef ) return "eq2k";
    const [ l6rVowel, l6rConsonant ] = SAXES2TAS_BAL2XA["L6R"];
    if ( kef.startsWith(l6rVowel + " ") || kef.startsWith(l6rConsonant + " ") ) {
        return ekZeni(kefEskek) ? "zeni" : "s2weni";
    }
    return "eq2k";
}

/**
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( 2R K2R J6R H2R SAR SWER SER )
 * ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ j͑ʃɹ ɭʃᴜɔ˞
 * @returns k61e
 */
function quqXemaS2weniSaxeS2tas(): string {
    const saxeS2tasCa1ara = Object.keys(S2WENI_SAXES2TAS);
    return saxeS2tasCa1ara[Math.floor(Math.random() * saxeS2tasCa1ara.length)];
}

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( 2R K2R J6R H2R SAR SWER SER )
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param kefEskek ( KefEskek , required ) - ſɭɔʞ ( gawekiif )
    * @param saxeS2tasHat ( string | null = null , optional ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns kef
 */
function quqS2weniSaxeS2tas(kefEskek: KefEskek, saxeS2tasHat: string | null = null): KefEskek {
    if (!kefEskek || !kefEskek.gawekiif) {
        return kefEskek;
    }

    const sukf2qSaxeS2tas = saxeS2tasHat || quqXemaS2weniSaxeS2tas();
    const saxeS2tasSkakefani = S2TAS_SKAKEFANI[sukf2qSaxeS2tas] || sukf2qSaxeS2tas;

    const s2weniGawekiif = quqS2tas(kefEskek.gawekiif, sukf2qSaxeS2tas);

    const s2weniSkakefani = `[${saxeS2tasSkakefani}] - ${kefEskek.skakefani}`;

    return {
        ...kefEskek,
        gawekiif: s2weniGawekiif,
        skakefani: s2weniSkakefani,
        haxe: "Adjective",
        _s2weniSaxe: kefEskek.haxe,
        _s2weniSaxeS2tas: sukf2qSaxeS2tas
    };
}

/**
 * ſɭʞɹ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( null )
    * @param saxeHaxe ( "Noun" | "Verb" = "Noun" , optional ) - ֭ſɭᴜ ı],ɔ
    * @param saxeS2tasHat ( string | null = null , optional ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns kef
 */
function kf2S2weni(saxeHaxe: "Noun" | "Verb" = "Noun", saxeS2tasHat: string | null = null): KefEskek | null {
    const saxeKef = quqKefHaxe(saxeHaxe);
    if (!saxeKef) {
        return null;
    }
    return quqS2weniSaxeS2tas(saxeKef, saxeS2tasHat);
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( L6R )
    * @param kefEskek ( KefEskek | null , required ) - ſɭɔʞ
 * @returns cez
 */
function ekZeni(kefEskek: KefEskek | null): boolean {
    return kefEskek !== null && kefEskek.haxe === "Verb";
}

/**
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( YOR KOTAK OR TAK )
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( YOR KOTAK OR TAK )
    * @param saxeS2tasHat ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns k61e
 */
function quqHaxeS2tas(saxeS2tasHat: string): string | null {
    return QUQXEMA_BAL2XA[saxeS2tasHat] || null;
}


// ⟪ ſ͕ɭɹȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ 📖 ⟫

const XLSX_KEF_CAKAVOP2 = "ſ͔ɭᴜ ᶅſɔ ꞁȷ̀ɔ ꞁȷ̀ɹ ſɭˬɔ.xlsx";

const KEF_K6H6_CA1ARA = [
    "../../ſ͔ɭᴜ ᶅſɔ/ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ/" + XLSX_KEF_CAKAVOP2,
    "../ſ͔ɭᴜ ᶅſɔ/ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ/" + XLSX_KEF_CAKAVOP2,
    "./" + XLSX_KEF_CAKAVOP2,
];

const AIH_SAXE_CA1ARA = [
    "ᶅſ", "ſן", "ſȷ", "ʃ", "ŋᷠ", "ɽ͑ʃ'", "j͑ʃ'", "ɭʃ", "ɭ(", "ſᶘ", "j͑ʃ", "}ʃ",
    "ſ̀ȷ", "j͐ʃ", "ſɭˬ", "ſɭ,", "ɭl̀", "ſɟ", "ı],", "ſ͕ȷ", "ſ͔ɭ", "ſɭ", "֭ſɭ", "ſ͕ɭ",
    "ꞁȷ̀",
    "ȏſן", "ȏɭʃ'", "ȏſ̀ȷ", "ȏſɟ", "ȏɭʃ", "ȏŋᷠ", "ȏ}ʃ'", "ȏoͩſ̀ȷ", "ȏſ͕ȷ", "ȏ}ʃ",
];

const AIH_M2_CA1ARA = [
    "п́", "ɘ", "ʞ", "ɀ", "c̭", "ƣ̋", "ⰱ", "ƨ", "ԏ͕", "ꝛ̗", "ɔ˞", "c̗", "ŋ", "ͷ̗",
    "ɯ", "ƴ", "ᴎ", "ᴜ̭", "ᶗ‹", "ⱷ̮̀", "ɴ", "ƽ", "ᴜ̩", "ȝ",
    "ꞇ", "ɔ", "ᴜ", "ɹ", "ɜ", "э", "ɔⅎ", "ɜⅎ", "эⅎ",
];

const AIH_KP6_CA1ARA = [ "⟅", "｡", "⸙", "ʌ" ];

const _kefBal2xa = new Map<string, KefEskek[]>();

/**
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @returns han2k
 */
function quqSaxeAraqAihK61e(): string[] {
    return [ ...AIH_SAXE_CA1ARA, ...AIH_M2_CA1ARA, ...AIH_KP6_CA1ARA ];
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param teksto ( string , required ) - ſɭɘэ ſɭɹ ſןɹ
 * @returns cez
 */
function ekQuqAihK61e(teksto: string): boolean {
    if (!teksto) {
        return false;
    }
    return quqSaxeAraqAihK61e().some(seq => teksto.includes(seq));
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param skakefaniKekCa1ara ( string[] , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns k61e
 */
function sukf2qNe1aAihSkakefani(skakefaniKekCa1ara: string[]): string {
    for (const skakefaniK61e of skakefaniKekCa1ara) {
        if (!ekQuqAihK61e(skakefaniK61e)) {
            return skakefaniK61e;
        }
    }
    return skakefaniKekCa1ara[0o0] || "";
}

// ⟨ ֭ſɭᴜ ı],ɔ ( HAXE_BAL2XA ) ⟩
const HAXE_BAL2XA: Readonly<Record<string, string>> = {
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
 * j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 *    @param v ( unknown ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns k61e
 */
function kubaK61e(v: unknown): string {
    if ( v === null || v === undefined ) return "";
    return String(v).replace(/\r?\n/g, " ").trim();
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ֭ſɭᴜ ı],ɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( haxeSaxe m2HaxeSaxe )
 *    @param haxeSaxe ( string ) - ֭ſɭᴜ ı],ɔ ( 0 )
 *    @param m2HaxeSaxe ( string ) - ֭ſɭᴜ ı],ɔ ( 1 )
 * @returns k61e
 */
function quqHaxe(haxeSaxe: string, m2HaxeSaxe: string): string {
    for ( const kp6 in HAXE_BAL2XA ) {
        if ( haxeSaxe.includes(kp6) ) return giHaxe(HAXE_BAL2XA[kp6]!);
    }
    for ( const kp6 in HAXE_BAL2XA ) {
        if ( m2HaxeSaxe.includes(kp6) ) return giHaxe(HAXE_BAL2XA[kp6]!);
    }
    return "Noun";
}

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ֭ſɭᴜ ı],ɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( HAXE_BAL2XA Number Chemical Affix Noun )
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ֭ſɭᴜ ı],ɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( determinePos HAXE_BAL2XA )
 *    @param haxe ( string ) - ֭ſɭᴜ ı],ɔ
 * @returns k61e
 */
function giHaxe(haxe: string): string {
    const match = haxe.match( /\(\s*(\w+)\s*\)$/ );
    if ( match ) return match[0o1];
    return haxe;
}

/**
 * ſ͕ɭɹȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( xlsx KefEskek )
    * @param xlsxVojo ( string | null = null , optional ) - ſɭэ ֭ſɭэ ( xlsx )
 * @returns kefCa1ara
 */
async function b6tem2KefCa1ara(xlsxVojo: string | null = null): Promise<KefEskek[]> {
    const path = xlsxVojo || KEF_K6H6_CA1ARA[0o0];

    if ( _kefBal2xa.has(path) ) {
        return _kefBal2xa.get(path)!;
    }

    try {
        const xema = await fetch(path);
        if ( !xema.ok ) {
            throw new Error("HTTP " + xema.status + " loading " + path);
        }
        const bufro = await xema.arrayBuffer();
        const wb = XLSX.read(bufro, { type: "array" });
        const cax2l = wb.Sheets[wb.SheetNames[0o0]!]!;
        const n2kCa1ara = XLSX.utils.sheet_to_json<unknown[]>(cax2l, {
            header: 0o1,
            defval: "",
            raw: false,
        });
        const sunta: KefEskek[] = [];
        for ( let r = 0o1; r < n2kCa1ara.length; r++ ) {
            const n2k = n2kCa1ara[r];
            if ( !n2k ) continue;
            const haxeSaxe = kubaK61e(n2k[0o0]);
            const m2HaxeSaxe = kubaK61e(n2k[0o1]);
            const kefNe1anesai = kubaK61e(n2k[0o2]);
            const skakefaniNe1anesai = kubaK61e(n2k[0o3]);
            if ( !kefNe1anesai ) continue;
            const haxe = quqHaxe(haxeSaxe, m2HaxeSaxe);
            // ⟨ ſɟᴜ ɭʃᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( ｡ ) ⟩
            const kefCa1ara = kefNe1anesai.split("｡").map(p => p.trim()).filter(p => p);
            const skakefaniCa1ara = skakefaniNe1anesai ? skakefaniNe1anesai.split("｡").map(p => p.trim()).filter(p => p) : [];
for ( let i = 0o0; i < kefCa1ara.length; i++ ) {
            const xaqadiKef = kefCa1ara[i];
            const xaqadiSkakefani = skakefaniCa1ara[i];
            const skakefaniK61e = skakefaniCa1ara.length > 0o0
            ? sukf2qNe1aAihSkakefani( xaqadiSkakefani !== undefined ? [ xaqadiSkakefani ] : skakefaniCa1ara )
            : xaqadiKef;
                sunta.push({
                    gawekiif: xaqadiKef,
                    skakefani: skakefaniK61e,
                    haxe: haxe,
                    n2kK2fe: r - 0o1,
                });
            }
        }
        _kefBal2xa.set(path, sunta);
        console.log("( ſ̀ȷᴜ ſɭɹ ) Loaded " + sunta.length + " kef from " + path);
        return sunta;
    } catch ( tlohk2ni ) {
        console.warn("( ſ̀ȷᴜ ſɭɹ ) Could not load dictionary from " + path, tlohk2ni);
        const eq2k: KefEskek[] = [];
        return eq2k;
    }
}

/**
 * ſ͕ɭɹȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @returns kefCa1ara
 */
async function b6tem2KefCa1araVop2(): Promise<KefEskek[]> {
    for ( const path of KEF_K6H6_CA1ARA ) {
        const kefCa1ara = await b6tem2KefCa1ara(path);
        if ( kefCa1ara.length > 0o0 ) {
            console.log("( ſ̀ȷᴜ ſɭɹ ) Successfully loaded dictionary from " + path);
            return kefCa1ara;
        }
    }
    return [];
}

/**
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * @returns kefCa1ara
 */
function b6tem2KefCa1araKxesu(): KefEskek[] {
    for ( const kefCa1ara of _kefBal2xa.values() ) {
        if ( kefCa1ara.length > 0o0 ) return kefCa1ara;
    }

    return [];
}

/**
 * ſ͕ɭɹȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( HAXE )
    * @param haxe ( string , required ) - ֭ſɭᴜ ı],ɔ
 * @returns kef
 */
function quqKefHaxe(haxe: string): KefEskek | null {
    const kefCa1ara = b6tem2KefCa1araKxesu().filter(w => w.haxe === haxe);
    if ( kefCa1ara.length === 0o0 ) return null;
    return kefCa1ara[Math.floor(Math.random() * kefCa1ara.length)];
}


// ⟪ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ 🧱 ⟫

/**
 * ֭ſɭᴜ ı],ɔ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ( VOS )
 */
const KefLuj2 = {
    STIFEH2: "STIFEH2",
    ZENI: "ZENI",
    KEXENI_VP: "KEXENI_VP",
    KEFMA3AKAKAI: "KEFMA3AKAKAI",
    P2SE: "P2SE",
    KEXENI_OX2PEWA: "KEXENI_OX2PEWA",
    KEFMASAXESAI: "KEFMASAXESAI"
} as const;

type KefLuj2Hat = typeof KefLuj2[keyof typeof KefLuj2];

interface TaniK61e {
    ekTani: boolean;
    ekCez: boolean;
}

interface KozK61e {
    kxesu: boolean;
    zeniAraq: boolean;
    s2weniAraq?: KefEskek | null;
}

interface Ox2pewaKefEskek {
    kef: KefEskek;
    kefLuj2: KefLuj2Hat;
    ekS2weni: boolean;
    quqKal: boolean;
    quMu: string | null;
}

interface ZeniVasaka {
    s2tas: string | null;
    quqXema: string | null;
    ko: boolean;
}

/**
 * ſɭʞɹ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 */
class Ox2pewaKek {
    stifeh2: KefEskek | null = null;
    zeni: KefEskek | null = null;
    zeniVasaka: ZeniVasaka = { s2tas: null, quqXema: null, ko: false };
    kexeniVp: KefEskek | null = null;
    kexeniOx2pewa: KefEskek | null = null;
    tani: TaniK61e = { ekTani: false, ekCez: false };
    koz: KozK61e = { kxesu: false, zeniAraq: false };
    xezHtakaKsaka = "";
    _vasakaZeni?: VasakaKefEskek;

    kefCa1ara: Ox2pewaKefEskek[] = [];
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param klavo ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns k61e
 */
function _quqS2tasK61e(s2: string): string | null {
    return S2TAS_SKAKEFANI[s2] || s2;
}


// ⟪ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ 🔨 ⟫

const TLOHK2NI_NE1AZENI = "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ꞁȷ̀ɜ ſɭɔ ſɭɔ ſ͕ȷᴜ ʌ ſɭ,ɔ }ʃꞇ";

class Ox2pewaVepaq {
    components: Ox2pewaKek;

    constructor() {
        this.components = new Ox2pewaKek();
    }

    xemaKsaka(name: string): Ox2pewaVepaq {
        this.components.xezHtakaKsaka = name;
        return this;
    }

    xemaStifeh2(stifeh2: KefEskek): Ox2pewaVepaq {
        this.components.stifeh2 = stifeh2;
        return this;
    }

    xemaZeni(zeni: KefEskek, s2tas: string | null = null, quqXema: string | null = null, ko: boolean = false): Ox2pewaVepaq {
        this.components.zeni = zeni;
        this.components.zeniVasaka = { s2tas, quqXema, ko };
        return this;
    }

    kf2Kef(kef: KefEskek, kefLuj2: KefLuj2Hat, k61eCa1ara: {
        ekS2weni?: boolean;
        quqKal?: boolean;
        quMu?: string | null;
    } = {}): Ox2pewaVepaq {
        const {
            ekS2weni = false,
            quqKal = false,
            quMu = null
        } = k61eCa1ara;

        this.components.kefCa1ara.push({
            kef,
            kefLuj2,
            ekS2weni,
            quqKal,
            quMu
        });
        return this;
    }

    kf2S2weniCa1ara(s2weniCa1ara: KefEskek[], kefLuj2: KefLuj2Hat): Ox2pewaVepaq {
        for (const s2weni of s2weniCa1ara) {
            this.components.kefCa1ara.unshift({
                kef: s2weni,
                kefLuj2: kefLuj2,
                ekS2weni: true,
                quqKal: false,
                quMu: null
            });
        }
        return this;
    }

    kf2KalKef(kef: KefEskek, kefLuj2: KefLuj2Hat, useKal: boolean = true): Ox2pewaVepaq {
        this.kf2Kef(kef, kefLuj2, { quqKal: useKal });
        return this;
    }

    xemaKexeniVp(kexeni: KefEskek): Ox2pewaVepaq {
        this.components.kexeniVp = kexeni;
        return this;
    }

    xemaKexeniOx2pewa(kexeni: KefEskek): Ox2pewaVepaq {
        this.components.kexeniOx2pewa = kexeni;
        return this;
    }

    xemaTani(ekCez: boolean = true): Ox2pewaVepaq {
        this.components.tani = { ekTani: true, ekCez };
        return this;
    }

    xemaKoz(s2weni: KefEskek | null, ekZeni: boolean = false): Ox2pewaVepaq {
        if (ekZeni) {
            this.components.koz.zeniAraq = true;
        } else if (s2weni) {
            this.components.koz.s2weniAraq = s2weni;
        }
        this.components.koz.kxesu = true;
        return this;
    }

    private _quqZeniVasaka(): VasakaKefEskek {
        const zeni = this.components.zeni;

        if ( !zeni ) throw new Error( TLOHK2NI_NE1AZENI );

        const vasakaZeni = quqZeniVasaka(zeni, {
            s2tas: this.components.zeniVasaka.s2tas,
            quqXema: this.components.zeniVasaka.quqXema,
            quqXemaKo: this.components.zeniVasaka.ko,
            kf2Koz: this.components.koz.kxesu && this.components.koz.zeniAraq
        });
        this.components._vasakaZeni = vasakaZeni;
        return vasakaZeni;
    }

    private _aplikiLimon(parts: string[]): string[] {
        if (parts.length === 0o0) return parts;
        const lastIdx = parts.length - 0o1;
        if (!this._ekKp6(parts[lastIdx])) {
            parts[lastIdx] = quqS2tas(parts[lastIdx], "AL");
        }
        return parts;
    }

    private _ekKp6(teksto: string): boolean {
        return KP6_CA1ARA.some(m => teksto === m || teksto.endsWith(m));
    }

    private _vepaqZeniXezHtaka(vasaka: ZeniVasaka, quqKoz: boolean): string {
        if (quqKoz) return "V-KOZ";
        if (vasaka.quqXema) {
            const saxeS2tasKsaka = vasaka.ko
                ? (vasaka.quqXema === "OR" ? "YOR" : "KOTAK")
                : vasaka.quqXema.toUpperCase();
            return `${saxeS2tasKsaka}-V`;
        }
        if (vasaka.s2tas) {
            const s2tasSkakefani = S2TAS_SKAKEFANI[vasaka.s2tas] || vasaka.s2tas;
            return `${s2tasSkakefani}-V`;
        }
        return "V";
    }

    private _vepaqSkakefani(skakefaniK61e: string, saxeK61e: string | null = null, araqK61e: string | null = null): string {
        if (!skakefaniK61e) return "";

        const saxeK61eS2 = saxeK61e ? `[${saxeK61e}] - ` : "";
        const araqK61eS2 = araqK61e ? `-${araqK61e}` : "";

        return `${saxeK61eS2}[${skakefaniK61e}${araqK61eS2}]`;

        return `${saxeK61eS2}[${skakefaniK61e}${araqK61eS2}]`;
    }

    private _quqS2tasSkakefani(vasaka: ZeniVasaka | VasakaKefEskek | null, isWord: boolean = false): [ string | null, string | null ] {
        if (!vasaka) return [ null, null ];

        let saxeK61e: string | null = null;
        let araqK61e: string | null = null;

        if (isWord) {
            const vasakaKefEskek = vasaka as VasakaKefEskek;
            if (vasakaKefEskek._quqXemaKo && vasakaKefEskek._quqQuqXema) {
                const saxeS2tasS2 = vasakaKefEskek._quqQuqXema === "OR" ? "YOR" : "KOTAK";
                saxeK61e = _quqS2tasK61e(saxeS2tasS2);
            } else if (vasakaKefEskek._quqQuqXema) {
                saxeK61e = _quqS2tasK61e(vasakaKefEskek._quqQuqXema.toUpperCase());
            } else if (vasakaKefEskek._quqSaxeS2tas) {
                saxeK61e = _quqS2tasK61e(vasakaKefEskek._quqSaxeS2tas);
            }
            if (vasakaKefEskek._quqAraqS2tas) {
                araqK61e = _quqS2tasK61e(vasakaKefEskek._quqAraqS2tas);
            }
        } else {
            const vasakaZeni = vasaka as ZeniVasaka;
            if (vasakaZeni.quqXema) {
                const saxeS2tasS2 = vasakaZeni.ko
                    ? (vasakaZeni.quqXema === "OR" ? "YOR" : "KOTAK")
                    : vasakaZeni.quqXema.toUpperCase();
                saxeK61e = _quqS2tasK61e(saxeS2tasS2);
            } else if (vasakaZeni.s2tas) {
                saxeK61e = _quqS2tasK61e(vasakaZeni.s2tas);
            }
        }

        return [ saxeK61e, araqK61e ];
    }

    private _kf2Kef(
        gawekiif: string[],
        xezHtaka: string[],
        skakefani: string[],
        gawekiifK61e: string,
        xezHtakaKsaka: string,
        skakefaniK61e: string,
        saxeK61e: string | null = null,
        araqK61e: string | null = null
    ): void {
        gawekiif.push(gawekiifK61e);
        xezHtaka.push(xezHtakaKsaka.toUpperCase());
        skakefani.push(this._vepaqSkakefani(skakefaniK61e, saxeK61e, araqK61e));
    }

    vepaq(): { gawekiif: string; skakefani: string; xezHtaka: string; components: Ox2pewaKek } {
        const gawekiif: string[] = [];
        const xezHtaka: string[] = [];
        const skakefani: string[] = [];

        if (this.components.stifeh2) {
            const stifeh2 = this.components.stifeh2;
            this._kf2Kef(gawekiif, xezHtaka, skakefani, stifeh2.gawekiif, "T", stifeh2.skakefani);
        }

        const s2weniCa1ara = this.components.kefCa1ara.filter(w =>
            w.kefLuj2 === KefLuj2.ZENI && w.ekS2weni
        );
        this._suntaS2weniCa1ara(s2weniCa1ara, gawekiif, xezHtaka, skakefani);

        const vasakaZeni = this._quqZeniVasaka();
        const vasaka = this.components.zeniVasaka;
        const [ zeniSaxe, zeniAraq ] = this._quqS2tasSkakefani(vasaka);
        const quqKoz = this.components.koz.kxesu && this.components.koz.zeniAraq;
        this._kf2Kef(gawekiif, xezHtaka, skakefani, vasakaZeni.gawekiif, this._vepaqZeniXezHtaka(vasaka, quqKoz), vasakaZeni.skakefani, zeniSaxe, zeniAraq);

        if (this.components.kexeniVp) {
            const kexeni = this.components.kexeniVp;
            this._kf2Kef(gawekiif, xezHtaka, skakefani, kexeni.gawekiif, "EVI", kexeni.skakefani);
        }

        this._vepaqKefma3akakaiOx2pewa(gawekiif, xezHtaka, skakefani);

        if (this.components.tani.ekTani) {
            const tani = this.components.tani.ekCez ? CEZ : TACE;
            const xezHtakaKsaka = this.components.tani.ekCez ? "CEZ" : "TACE";
            const taniSkakefani = this.components.tani.ekCez ? "CEZ" : "TACE";
            this._kf2Kef(gawekiif, xezHtaka, skakefani, tani, xezHtakaKsaka, taniSkakefani);
        } else {
            this._kf2Kef(gawekiif, xezHtaka, skakefani, P2SE, "⺓", "⺓");
        }

        if (this.components.kexeniOx2pewa) {
            const kexeni = this.components.kexeniOx2pewa;
            this._kf2Kef(gawekiif, xezHtaka, skakefani, kexeni.gawekiif, "EVI", kexeni.skakefani);
        }

        this._vepaqKefmasaxesaiOx2pewa(gawekiif, xezHtaka, skakefani);

        return {
            gawekiif: `${gawekiif.join(` ${KEF_PUK2FE} `)} ${OX2PEWA_NE1A}`,
            skakefani: skakefani.join(" "),
            xezHtaka: xezHtaka.join(" "),
            components: this.components
        };
    }

    private _suntaS2weniEskek(
        s2weniEskek: Ox2pewaKefEskek,
        gawekiif: string[],
        xezHtaka: string[],
        skakefani: string[],
        quqKoz: boolean
    ): { gaw: string; xezHtaka: string; skakefaniK61e: string; quqKoz: boolean } {
        const kf2Koz = this.components.koz.kxesu &&
            !this.components.koz.zeniAraq &&
            !quqKoz;
        if (kf2Koz) quqKoz = true;

        const gaw = kf2Koz ? quqS2tas(s2weniEskek.kef.gawekiif, "KOZ") : s2weniEskek.kef.gawekiif;

        let xezHtakaKsaka = "ADJ";
        let saxeS2tasSkakefani: string | null = null;
        if (s2weniEskek.kef._s2weniSaxeS2tas) {
            const saxeS2tasS2 = s2weniEskek.kef._s2weniSaxeS2tas;
            saxeS2tasSkakefani = S2TAS_SKAKEFANI[saxeS2tasS2] || saxeS2tasS2;
            xezHtakaKsaka = kf2Koz ? `${saxeS2tasS2}-ADJ-KOZ` : `${saxeS2tasS2}-ADJ`;
        } else if (kf2Koz) {
            xezHtakaKsaka = "ADJ-KOZ";
        }

        const araqK61e = kf2Koz ? "KOZ" : null;

        if (gawekiif.length > 0o0) {
            this._aplikiLimon(gawekiif);
            this._quqALXezHtaka(xezHtaka);
        }

        let skakefaniK61e = s2weniEskek.kef.skakefani;
        if (saxeS2tasSkakefani && !s2weniEskek.kef.skakefani.startsWith(`[${saxeS2tasSkakefani}]`)) {
            skakefaniK61e = `[${saxeS2tasSkakefani}] - ${s2weniEskek.kef.skakefani}`;
        }

        this._kf2Kef(gawekiif, xezHtaka, skakefani, gaw, xezHtakaKsaka, skakefaniK61e, null, araqK61e);

        return { gaw, xezHtaka: xezHtakaKsaka, skakefaniK61e, quqKoz };
    }

    private _suntaS2weniCa1ara(
        s2weniCa1ara: Ox2pewaKefEskek[],
        gawekiif: string[],
        xezHtaka: string[],
        skakefani: string[]
    ): void {
        if (!s2weniCa1ara || s2weniCa1ara.length === 0o0) return;

        let quqKoz = this.components.koz.kxesu && this.components.koz.zeniAraq;

        for (const s2weniEskek of s2weniCa1ara) {
            const result = this._suntaS2weniEskek(s2weniEskek, gawekiif, xezHtaka, skakefani, quqKoz);
            quqKoz = result.quqKoz;
        }
    }

    private _vepaqKefma3akakaiOx2pewa(gawekiif: string[], xezHtaka: string[], skakefani: string[]): void {
        this._vepaqOx2pewa(gawekiif, xezHtaka, skakefani, KefLuj2.KEFMA3AKAKAI, false);
    }

    private _vepaqKefmasaxesaiOx2pewa(gawekiif: string[], xezHtaka: string[], skakefani: string[]): void {
        this._vepaqOx2pewa(gawekiif, xezHtaka, skakefani, KefLuj2.KEFMASAXESAI, true);
    }

    private _vepaqOx2pewa(
        gawekiif: string[],
        xezHtaka: string[],
        skakefani: string[],
        kefLuj2: KefLuj2Hat,
        kalVasakaKxesu: boolean
    ): void {
        const kefCa1ara = this.components.kefCa1ara.filter(w => w.kefLuj2 === kefLuj2);
        if (kefCa1ara.length === 0o0) return;

        let quqKoz = false;
        let vasakaEskekCa1ara: Ox2pewaKefEskek[] = [];
        let kalVasakaS2 = false;

        for (const entry of kefCa1ara) {
            const ekVasaka = entry.ekS2weni;

            if (kalVasakaS2 && !ekVasaka) {
                kalVasakaS2 = false;
                continue;
            }

            if (ekVasaka) {
                vasakaEskekCa1ara.push(entry);
                kalVasakaS2 = false;
            } else {
                for (const vasakaEskek of vasakaEskekCa1ara) {
                    const result = this._suntaVasakaEskek(vasakaEskek, gawekiif, xezHtaka, skakefani, quqKoz);
                    quqKoz = result.quqKoz;
                }
                vasakaEskekCa1ara = [];

                if (entry.quMu) {
                    const quMuSkakefani = entry.quMu === QU ? "QU" : "MU";
                    this._kf2Kef(gawekiif, xezHtaka, skakefani, entry.quMu, "TOPIC", quMuSkakefani);
                }

                if (entry.quqKal && gawekiif.length > 0o0) {
                    this._kf2Kef(gawekiif, xezHtaka, skakefani, KAL, "KAL", "KAL");
                    kalVasakaS2 = kalVasakaKxesu;
                }

                this._kf2Kef(gawekiif, xezHtaka, skakefani, entry.kef.gawekiif,
                    this._quqKefLuj2Ksaka(entry.kef, false), entry.kef.skakefani);
            }
        }

        for (const vasakaEskek of vasakaEskekCa1ara) {
            this._suntaVasakaEskek(vasakaEskek, gawekiif, xezHtaka, skakefani, quqKoz);
        }
    }

    private _suntaVasakaEskek(
        vasakaEskek: Ox2pewaKefEskek,
        gawekiif: string[],
        xezHtaka: string[],
        skakefani: string[],
        quqKoz: boolean
    ): { gaw: string; xezHtaka: string; skakefaniK61e: string; quqKoz: boolean } {
        if (vasakaEskek.ekS2weni) {
            return this._suntaS2weniEskek(vasakaEskek, gawekiif, xezHtaka, skakefani, quqKoz);
        }
        this._kf2Kef(gawekiif, xezHtaka, skakefani, vasakaEskek.kef.gawekiif,
            this._quqKefLuj2Ksaka(vasakaEskek.kef, false), vasakaEskek.kef.skakefani);
        return { gaw: vasakaEskek.kef.gawekiif, xezHtaka: "MOD", skakefaniK61e: vasakaEskek.kef.skakefani, quqKoz };
    }

    private _quqKefLuj2Ksaka(kef: KefEskek, isAdjective: boolean): string {
        if (isAdjective) return "ADJ";
        if (!kef || !kef.haxe) return "N";
        return HAXE_KSAKA[kef.haxe] || "N";
    }

    private _quqALXezHtaka(xezHtaka: string[]): void {
        if (xezHtaka.length === 0o0) return;
        const lastIdx = xezHtaka.length - 0o1;
        const label = xezHtaka[lastIdx];
        /*
        * ⟨ ſןw ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( CEZ TACE AL ⺓ ) ⟩
        */
        if ( label === "CEZ" || label === "TACE" || this._ekKp6(label) ) {
            return;
        }
        xezHtaka[lastIdx] += "-AL";
    }
}


// ⟪ ſɭʞɹ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ 🏗️ ⟫

// ⟪ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🔧 ⟫

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( kanoto )
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
    * @param vasakaKeve ( Function , required ) - ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ
    * @param puEkZeniS2tas ( boolean = false , optional ) - ſןw ʌ ſɭɔʞ
 * @returns vepaq
 */
function kanotoQuqVasaka(
    builder: Ox2pewaVepaq,
    vasakaKeve: (b: Ox2pewaVepaq) => Ox2pewaVepaq,
    puEkZeniS2tas: boolean = false
): Ox2pewaVepaq {
    if (Math.random() > 0o1 / 0o2) return builder;
    if (puEkZeniS2tas && builder.components.zeniVasaka.s2tas) return builder;
    return vasakaKeve(builder);
}

interface ZeniKefVasakaHat {
    quqKefma3akakai?: boolean;
    quqKefmasaxesai?: boolean;
    kf2ZeniS2tas?: boolean;
    kf2QuqXema?: boolean;
    kf2Koz?: boolean;
    kf2ZeniS2weni?: boolean;
    kf2KefS2weni?: boolean;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( V N )
 * ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( V N Adj )
 * ſɭɔʞ ( V N Adj )
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
    * @param hatCa1ara ( ZeniKefVasakaHat = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function quqZeniKefVasakaXaqadi(builder: Ox2pewaVepaq, k61eCa1ara: ZeniKefVasakaHat = {}): Ox2pewaVepaq {
    const {
        quqKefma3akakai = true,
        quqKefmasaxesai = true,
        kf2ZeniS2tas = false,
        kf2QuqXema = false,
        kf2Koz = false,
        kf2ZeniS2weni = false,
        kf2KefS2weni = false
    } = k61eCa1ara;

    const vasakaHat = { kf2ZeniS2tas, kf2QuqXema, kf2Koz, kf2ZeniS2weni, kf2KefS2weni };

    if (quqKefma3akakai) {
        _kf2ZeniKefVasaka(builder, KefLuj2.KEFMA3AKAKAI, vasakaHat);
    }

    if (quqKefmasaxesai) {
        _kf2ZeniKefVasaka(builder, KefLuj2.KEFMASAXESAI, vasakaHat);
    }

    return builder;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( V N )
 * ſɭɔʞ ( V N Adj )
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
    * @param kefLuj2 ( KefLuj2Hat , required ) - ֭ſɭᴜ ı],ɔ
    * @param hatCa1ara ( ZeniKefVasakaHat , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
  * @returns void
 */
function _kf2ZeniKefVasaka(builder: Ox2pewaVepaq, kefLuj2: KefLuj2Hat, k61eCa1ara: ZeniKefVasakaHat): void {
    const {
        kf2ZeniS2tas = false,
        kf2QuqXema = false,
        kf2Koz = false,
        kf2ZeniS2weni = false,
        kf2KefS2weni = false
    } = k61eCa1ara;

    const zeniEskek = quqKefHaxe("Verb");
    const kefEskek = quqKefHaxe("Noun");
    if (!zeniEskek || !kefEskek) return;

    const vasakaZeni = quqZeniVasaka(zeniEskek, {
        xemaS2tas: kf2ZeniS2tas,
        xemaQuqXema: kf2QuqXema,
        kf2Koz
    });

    builder.components.kefCa1ara.unshift({
        kef: kefEskek, kefLuj2, ekS2weni: false, quqKal: false, quMu: null
    });

    if (kf2KefS2weni) {
        const kefS2weniK2fe = Math.floor(Math.random() * 0o2);
        for (let i = 0o0; i < kefS2weniK2fe; i++) {
            const s2weni = kf2S2weni("Noun");
            if (s2weni) {
                builder.components.kefCa1ara.unshift({
                    kef: s2weni, kefLuj2, ekS2weni: true, quqKal: false, quMu: null
                });
            }
        }
    }

    builder.components.kefCa1ara.unshift({
        kef: vasakaZeni, kefLuj2, ekS2weni: false, quqKal: false, quMu: null
    });

    if (kf2ZeniS2weni) {
        const zeniS2weniK2fe = Math.floor(Math.random() * 0o2);
        for (let i = 0o0; i < zeniS2weniK2fe; i++) {
            const s2weni = kf2S2weni("Noun");
            if (s2weni) {
                builder.components.kefCa1ara.unshift({
                    kef: s2weni, kefLuj2, ekS2weni: true, quqKal: false, quMu: null
                });
            }
        }
    }

}

interface ZaceOx2pewaKek {
    zeni: KefEskek;
    kefma3akakai: KefEskek;
    kefmasaxesai: KefEskek;
}

/**
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( V O S )
 * @returns zaceOx2pewaKek
 */
function quqZaceOx2pewaKek(): ZaceOx2pewaKek | null {
    const zeni = quqKefHaxe("Verb");
    const kefma3akakai = quqKefHaxe("Noun");
    const kefmasaxesai = quqKefHaxe("Noun");
    if (!zeni || !kefma3akakai || !kefmasaxesai) {
        return null;
    }
    return { zeni, kefma3akakai, kefmasaxesai };
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function kanotoKf2Stifeh2(builder: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(builder, (b) => {
        const stifeh2Kef = quqKefHaxe("Noun");
        if (stifeh2Kef) {
            const stifeh2Gawekiif = quqS2tas(stifeh2Kef.gawekiif, "STIF");
            b.xemaStifeh2({ gawekiif: stifeh2Gawekiif, skakefani: stifeh2Kef.skakefani, haxe: stifeh2Kef.haxe });
        }
        return b;
    });
}

interface S2weniHat {
    useAdjectivizer?: boolean;
    skipRandom?: boolean;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * ſɭɔʞ ( 0 1 2 )
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
    * @param base ( ZaceOx2pewaKek , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ ( V O S )
    * @param hatCa1ara ( S2weniHat = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function quqS2weniCa1ara(builder: Ox2pewaVepaq, base: ZaceOx2pewaKek, k61eCa1ara: S2weniHat = {}): Ox2pewaVepaq {
    const { useAdjectivizer = false, skipRandom = false } = k61eCa1ara;

    if (!skipRandom && Math.random() > 0o1 / 0o2) {
        return builder;
    }

    const kefLuj2Ca1ara: KefLuj2Hat[] = [ KefLuj2.ZENI, KefLuj2.KEFMA3AKAKAI, KefLuj2.KEFMASAXESAI ];

    for (const kefLuj2 of kefLuj2Ca1ara) {
        const adjCount = Math.floor(Math.random() * 0o3);

        for (let i = 0o0; i < adjCount; i++) {
            let s2weni: KefEskek | null = null;

            if (useAdjectivizer) {
                s2weni = kf2S2weni("Noun");
            } else {
                s2weni = quqKefHaxe("Adjective");
                if (!s2weni) {
                    s2weni = kf2S2weni("Noun");
                }
            }

            if (s2weni) {
                builder.kf2S2weniCa1ara([ s2weni ], kefLuj2);
            }
        }
    }

    return builder;
}

interface KexeniHat {
    addVpEvidential?: boolean;
    kf2Ox2pewaKexeni?: boolean;
    kexeni?: KefEskek | null;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ʃɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
    * @param hatCa1ara ( KexeniHat = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function quqKexeniXaqadi(builder: Ox2pewaVepaq, k61eCa1ara: KexeniHat = {}): Ox2pewaVepaq {
    const {
        addVpEvidential = true,
        kf2Ox2pewaKexeni = false,
        kexeni = null
    } = k61eCa1ara;

    const kexeniKef = kexeni || quqKefHaxe("Evidential");
    if (!kexeniKef) return builder;

    if (addVpEvidential) {
        builder.xemaKexeniVp(kexeniKef);
    }

    if (kf2Ox2pewaKexeni) {
        builder.xemaKexeniOx2pewa(kexeniKef);
    }

    return builder;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ʃɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function kanotoKf2KexeniXaqadi(builder: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(builder, (b) => {
        const useVp = Math.random() < 0o1 / 0o2;
        return quqKexeniXaqadi(b, {
            addVpEvidential: useVp,
            kf2Ox2pewaKexeni: !useVp
        });
    });
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( OR TAK )
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function kanotoKf2QuqXema(builder: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(builder, (b) => {
        const modalities: [ string, boolean ][] = [
            [ "OR", false ],
            [ "OR", true ],
            [ "TAK", false ],
            [ "TAK", true ]
        ];
        const [ quqXema, ko ] = modalities[Math.floor(Math.random() * modalities.length)];
        if ( b.components.zeni ) b.xemaZeni(b.components.zeni, null, quqXema, ko);
        return b;
    });
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( KON )
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function kanotoKf2Ko(builder: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(builder, (b) => {
        if (b.components.zeniVasaka.quqXema) return b;
        if ( b.components.zeni ) b.xemaZeni(b.components.zeni, "KON");
        return b;
    });
}

interface KozHat {
    ekZeni?: boolean;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( KOZ )
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
    * @param hatCa1ara ( KozHat = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function kanotoKf2Koz(builder: Ox2pewaVepaq, k61eCa1ara: KozHat = {}): Ox2pewaVepaq {
    const { ekZeni = false } = k61eCa1ara;

    if (ekZeni) {
        return kanotoQuqVasaka(builder, (b) => {
            b.xemaKoz(null, true);
            return b;
        });
    }

    const quqKefS2weni = builder.components.kefCa1ara.some(w =>
        w.kefLuj2 === KefLuj2.KEFMA3AKAKAI && w.ekS2weni
    );
    if (!quqKefS2weni) return builder;

    return kanotoQuqVasaka(builder, (b) => {
        b.xemaKoz(b.components.koz.s2weniAraq || null, false);
        return b;
    });
}

interface ZeniS2tasHat {
    s2tasHat?: string;
    puEkZeniVasaka?: boolean;
}

/**
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
    * @param hatCa1ara ( ZeniS2tasHat = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function quqZeniS2tasXaqadi(builder: Ox2pewaVepaq, k61eCa1ara: ZeniS2tasHat = {}): Ox2pewaVepaq {
    const {
        s2tasHat = "L6R",
        puEkZeniVasaka = true
    } = k61eCa1ara;

    if (puEkZeniVasaka && builder.components.zeniVasaka.s2tas) {
        return builder;
    }

    if ( builder.components.zeni ) builder.xemaZeni(builder.components.zeni, s2tasHat, builder.components.zeniVasaka.quqXema, builder.components.zeniVasaka.ko);
    return builder;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
    * @param s2tasHat ( string | null = null , optional ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns vepaq
 */
function kanotoKf2ZeniS2tasXaqadi(builder: Ox2pewaVepaq, s2tasHat: string | null = null): Ox2pewaVepaq {
    if (!s2tasHat) {
        const s2tasCa1ara = [ "L6R", "B6N" ];
        s2tasHat = s2tasCa1ara[Math.floor(Math.random() * s2tasCa1ara.length)];
    }
    return kanotoQuqVasaka(builder, (b) => {
        return quqZeniS2tasXaqadi(b, { s2tasHat });
    }, true);
}

interface KalKekHat {
    kalKefma3akakai?: boolean;
    kalKefmasaxesai?: boolean;
    kefma3akakai2?: KefEskek | null;
    kefmasaxesai2?: KefEskek | null;
}

/**
 * ſɭɹ ɽ͑ʃ'ɔ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( KAL )
 * N KAL N ( KAL )
 * N KAL N ( KAL )
 * V O KAL O ⺓ S KAL S ( Adj V N KAL )
    * @param builder ( Ox2pewaVepaq , required ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
    * @param hatCa1ara ( KalKekHat = {} , optional ) - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function quqKalKekCa1araXaqadi(builder: Ox2pewaVepaq, k61eCa1ara: KalKekHat = {}): Ox2pewaVepaq {
    const {
        kalKefma3akakai = true,
        kalKefmasaxesai = true,
        kefma3akakai2 = null,
        kefmasaxesai2 = null
    } = k61eCa1ara;

    if (kalKefma3akakai) {
        const quqKefma3akakai = kefma3akakai2 || quqKefHaxe("Noun");
        if (quqKefma3akakai) {
            builder.kf2KalKef(quqKefma3akakai, KefLuj2.KEFMA3AKAKAI, true);
        }
    }

    if (kalKefmasaxesai) {
        const quqKefmasaxesai = kefmasaxesai2 || quqKefHaxe("Noun");
        if (quqKefmasaxesai) {
            const s2weni = quqKefHaxe("Adjective") || kf2S2weni("Noun");
            if (s2weni) {
                builder.kf2S2weniCa1ara([ s2weni ], KefLuj2.KEFMASAXESAI);
            }
            builder.kf2KalKef(quqKefmasaxesai, KefLuj2.KEFMASAXESAI, true);
        }
    }

    return builder;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param builder - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function kanotoKf2KalKekCa1araXaqadi(builder: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(builder, (b) => {
        return quqKalKekCa1araXaqadi(b, {
            kalKefma3akakai: true,
            kalKefmasaxesai: true
        });
    });
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( V N )
 * ſɭɔʞ ( V N )
    * @param builder - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function kanotoKf2ZeniKefVasaka(builder: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(builder, (b) => {
        const kf2ZeniS2tas = Math.random() > 0o1 / 0o2;
        const kf2QuqXema = Math.random() > 0o1 / 0o2;
        const kf2Koz = Math.random() > 0o1 / 0o2;
        const kf2ZeniS2weni = Math.random() > 0o1 / 0o2;
        const kf2KefS2weni = Math.random() > 0o1 / 0o2;

        return quqZeniKefVasakaXaqadi(b, {
            quqKefma3akakai: true,
            quqKefmasaxesai: true,
            kf2ZeniS2tas,
            kf2QuqXema,
            kf2Koz,
            kf2ZeniS2weni,
            kf2KefS2weni
        });
    });
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( QU MU )
 * j͑ʃɹ ɭʃᴜɔ˞ ʌ ſɭɔʞ
 * QU ( ſ͕ɭw )
 * MU ( ŋᷠw )
    * @param builder - ꞁȷ̀ɔ j͑ʃƽɔƽ
 * @returns vepaq
 */
function kanotoKf2QuMu(builder: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(builder, (b) => {
        const kefCa1ara = b.components.kefCa1ara;

        for (const entry of kefCa1ara) {
            if (!entry.ekS2weni && !entry.quqKal) {
                if (Math.random() > 0o1 / 0o2) {
                    entry.quMu = Math.random() > 0o1 / 0o2 ? QU : MU;
                }
            }
        }

        return b;
    });
}

interface QuqXemaVasaka {
    stifeh2?: boolean;
    s2weni?: boolean;
    s2weniS2tas?: boolean;
    quqXema?: boolean;
    ko?: boolean;
    zeniS2tas?: boolean;
    koz?: boolean;
    kal?: boolean;
    zeniKefVasaka?: boolean;
    tani?: boolean;
    kexeni?: boolean;
    quMu?: boolean;
}

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
    * @param builder - ꞁȷ̀ɔ j͑ʃƽɔƽ
    * @param quqXemaVasaka - j͑ʃɹ ɭʃᴜɔ˞
 * @returns vepaq
 */
function kanotoKf2Tani(builder: Ox2pewaVepaq, quqXemaVasaka: QuqXemaVasaka): Ox2pewaVepaq {
    if (!quqXemaVasaka.tani) return builder;
    return kanotoQuqVasaka(builder, (b) => {
        const ekCez = Math.random() < 0o1 / 0o2;
        b.xemaTani(ekCez);
        return b;
    });
}

interface Ox2pewaK61e {
    gawekiif: string;
    skakefani: string;
    xezHtaka: string;
    components: Ox2pewaKek;
}

/**
 * ſɭʞɹ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( builder kf2Kef )
    * @param xezHtaka - ꞁȷ̀ɔ j͑ʃƽɔƽ
    * @param quqXemaVasaka - j͑ʃɹ ɭʃᴜɔ˞
 * @returns ox2pewa
 */
function kf2Ox2pewa(xezHtaka: string | null = null, quqXemaVasaka: QuqXemaVasaka = {}): Ox2pewaK61e | null {
    if (xezHtaka) {
        const result = xezHtakaB6vegejex.kf2(xezHtaka);
        if (result && typeof result === "object" && "gawekiif" in result) {
            return result as Ox2pewaK61e;
        }
    }

    const base = quqZaceOx2pewaKek();
    if (!base) {
        return null;
    }

    let builder = new Ox2pewaVepaq()
        .xemaKsaka("modular")
        .xemaZeni(base.zeni)
        .kf2Kef(base.kefma3akakai, KefLuj2.KEFMA3AKAKAI)
        .kf2Kef(base.kefmasaxesai, KefLuj2.KEFMASAXESAI);

    if (quqXemaVasaka.stifeh2 !== false) builder = kanotoKf2Stifeh2(builder);
    if (quqXemaVasaka.kexeni !== false) builder = kanotoKf2KexeniXaqadi(builder);
    if (quqXemaVasaka.quqXema !== false) builder = kanotoKf2QuqXema(builder);
    if (quqXemaVasaka.ko !== false) builder = kanotoKf2Ko(builder);
    if (quqXemaVasaka.zeniS2tas !== false) builder = kanotoKf2ZeniS2tasXaqadi(builder);
    if (quqXemaVasaka.s2weniS2tas) {
        if (Math.random() > 0o1 / 0o2) {
            builder = quqS2weniCa1ara(builder, base, { useAdjectivizer: true, skipRandom: true });
        }
    } else if (quqXemaVasaka.s2weni !== false) {
        builder = quqS2weniCa1ara(builder, base, { useAdjectivizer: false, skipRandom: false });
    }

    if (quqXemaVasaka.koz !== false) {
        const ekZeni = Math.random() < 0o1 / 0o2;
        builder = kanotoKf2Koz(builder, { ekZeni });
    }
    if (quqXemaVasaka.zeniKefVasaka !== false) builder = kanotoKf2ZeniKefVasaka(builder);
    if (quqXemaVasaka.kal !== false) builder = kanotoKf2KalKekCa1araXaqadi(builder);
    if (quqXemaVasaka.quMu !== false) builder = kanotoKf2QuMu(builder);
    if (quqXemaVasaka.tani !== false) builder = kanotoKf2Tani(builder, quqXemaVasaka);

    return builder.vepaq();
}


// ⟪ j͑ʃᴜ ı],ɔ 🖥️ ⟫

/**
 * j͑ʃᴜ ı],ɔ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * ſɭɹ ɽ͑ʃ'ɔ ʌ ſᶘɹ }ʃᴜ }ʃw ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
  * @returns void
 */
function saxeKf2Ox2pewa(): void {
    const kf2Kek = document.getElementById("kf2Ox2pewaCa12na");
    const xezHtakaKsaka = document.getElementById("haxeSarox2pewa");
    const xezHtakaKuba = document.getElementById("knox2pewaSwesukw2q");
    const suntaKuba = document.getElementById("maxemaSa10Ox2");
    const xezHtakaKek = document.getElementById("tlakakuKnox2pewa");
    const gawekiifKek = document.getElementById("tlakakuOx2pewa");
    const skakefaniKek = document.getElementById("tlakakuSkakefani");
    const tlohk2niKuba = document.getElementById("tlohk2ni");
    const tlohk2niP = tlohk2niKuba?.querySelector("p") || null;

    let kefCa1araB6tem2 = false;
    let sukf2qXezHtaka = "";
    const quqXemaVasaka: QuqXemaVasaka = {
        stifeh2: true,
        s2weni: true,
        s2weniS2tas: true,
        quqXema: true,
        ko: true,
        zeniS2tas: true,
        koz: true,
        kal: true,
        zeniKefVasaka: true,
        tani: true,
        kexeni: true,
        quMu: true
    };

    interface VasakaK61e {
        ksaka: keyof QuqXemaVasaka;
        name: string;
    }

    const VASAKA_CA1ARA: VasakaK61e[] = [
        { ksaka: "stifeh2", name: "Stifeh2 (T)" },
        { ksaka: "s2weni", name: "S2weni (ADJ)" },
        { ksaka: "s2weniS2tas", name: "S2weniS2tas (2R/K2R/...)" },
        { ksaka: "quqXema", name: "QuqXema (OR/TAK)" },
        { ksaka: "ko", name: "Ko (KON-)" },
        { ksaka: "zeniS2tas", name: "ZeniS2tas (L6R/B6N)" },
        { ksaka: "koz", name: "Koz (-KOZ)" },
        { ksaka: "kal", name: "Kal (KAL)" },
        { ksaka: "zeniKefVasaka", name: "ZeniKefVasaka" },
        { ksaka: "tani", name: "Tani" },
        { ksaka: "kexeni", name: "Kexeni" },
        { ksaka: "quMu", name: "QuMu (QU/MU)" }
    ];

    function suntaTlohk2ni(k61e: string): void {
        if (tlohk2niP) tlohk2niP.textContent = k61e;
        if (tlohk2niKuba) tlohk2niKuba.style.display = "block";
        if (suntaKuba) suntaKuba.style.display = "none";
    }

    function suntaSunta(): void {
        if (tlohk2niKuba) tlohk2niKuba.style.display = "none";
        if (suntaKuba) suntaKuba.style.display = "block";
    }

    function suntaXezHtakaCa1ara(): void {
        if (!xezHtakaKuba) return;
        const xezHtakaCa1ara = xezHtakaB6vegejex.quqXezHtakaCa1ara();

        xezHtakaKuba.innerHTML = "";

        const anyLabel = document.createElement("label");
        const anyRadio = document.createElement("input");
        anyRadio.type = "radio";
        anyRadio.name = "xezHtaka";
        anyRadio.value = "";
        anyRadio.checked = true;
        anyRadio.addEventListener("change", () => {
            sukf2qXezHtaka = "";
            if (xezHtakaKsaka) xezHtakaKsaka.textContent = "ꞁȷ̀ꞇ j͐ʃᴜƽ";
        });
        anyLabel.appendChild(anyRadio);
        anyLabel.appendChild(document.createTextNode(" ꞁȷ̀ꞇ j͐ʃᴜƽ"));
        xezHtakaKuba.appendChild(anyLabel);

        xezHtakaCa1ara.forEach(k61e => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "xezHtaka";
            radio.value = k61e;
            radio.addEventListener("change", () => {
                sukf2qXezHtaka = k61e;
                if (xezHtakaKsaka) xezHtakaKsaka.textContent = k61e;
            });
            label.appendChild(radio);
            label.appendChild(document.createTextNode(" " + k61e));
            xezHtakaKuba.appendChild(label);
        });
    }

    function suntaVasakaCa1ara(): void {
        const vasakaKuba = document.getElementById("vasaka-kuba");
        if (!vasakaKuba) return;

        vasakaKuba.innerHTML = "";

        VASAKA_CA1ARA.forEach(vasaka => {
            const ksaka = document.createElement("label");
            const kp6Kek = document.createElement("input");
            kp6Kek.type = "checkbox";
            kp6Kek.checked = quqXemaVasaka[vasaka.ksaka] ?? true;
            kp6Kek.addEventListener("change", () => {
                quqXemaVasaka[vasaka.ksaka] = kp6Kek.checked;
            });
            ksaka.appendChild(document.createTextNode(" " + vasaka.name));
            ksaka.appendChild(kp6Kek);
            vasakaKuba.appendChild(ksaka);
        });
    }

    async function kf2Ox2pewaKeve(): Promise<void> {
        if (!kefCa1araB6tem2) {
            suntaTlohk2ni("ſ͕ȷɜ ſ͕ɭwȝ ſɭɔʞ ⟅");
            return;
        }

        if (kf2Kek) (kf2Kek as HTMLButtonElement).disabled = true;
        suntaSunta();

        try {
            const ox2pewa = kf2Ox2pewa(sukf2qXezHtaka || null, quqXemaVasaka);

            if (!ox2pewa) {
                suntaTlohk2ni("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ne1a kf2 ox2pewa. ne1a kefCa1ara.");
            } else {
                if (xezHtakaKek) xezHtakaKek.textContent = ox2pewa.xezHtaka;
                if (gawekiifKek) {
                    gawekiifKek.textContent = ox2pewa.gawekiif;
                    window.vacepu("ox2pewa");
                }
                if (skakefaniKek) skakefaniKek.textContent = ox2pewa.skakefani;
                suntaSunta();
            }
        } catch (e) {
            suntaTlohk2ni(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${(e as Error).message}`);
        } finally {
            if (kf2Kek) (kf2Kek as HTMLButtonElement).disabled = false;
        }
    }

    async function saxe(): Promise<void> {
        if (kf2Kek) (kf2Kek as HTMLButtonElement).disabled = true;
        if (tlohk2niKuba) tlohk2niKuba.style.display = "none";
        suntaXezHtakaCa1ara();
        suntaVasakaCa1ara();

        try {
            const kefCa1ara = await b6tem2KefCa1araVop2();

            if (kefCa1ara.length > 0o0) {
                kefCa1araB6tem2 = true;
                if (kf2Kek) (kf2Kek as HTMLButtonElement).disabled = false;
                console.log("Dictionary loaded successfully. Ready to kf2 ox2pewa.");
            } else {
                suntaTlohk2ni("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Could not load dictionary.");
                if (kf2Kek) {
                    (kf2Kek as HTMLButtonElement).disabled = false;
                    kf2Kek.addEventListener("click", () => {
                        saxe();
                    }, { once: true });
                }
            }
        } catch (e) {
            suntaTlohk2ni(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${(e as Error).message}`);
            if (kf2Kek) (kf2Kek as HTMLButtonElement).disabled = false;
        }
    }

    if (kf2Kek) {
        kf2Kek.addEventListener("click", kf2Ox2pewaKeve);
    }
    saxe();
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", saxeKf2Ox2pewa);
    } else {
        saxeKf2Ox2pewa();
    }
}


// ⟪ ꞁȷ̀ɔ j͑ʃƽɔƽ 📤 ⟫

export {
    xezHtakaB6vegejex,
    Ox2pewaVepaq,
    Ox2pewaKek,
    KefLuj2,
    quqZaceOx2pewaKek,
    kf2Ox2pewa,
    saxeKf2Ox2pewa,
    b6tem2KefCa1ara,
    b6tem2KefCa1araVop2,
    quqS2tas,
    quqZeniVasaka,
    ekAwaSaxe,
    ekAwaAraq,
    ekQuqAihK61e,
    quqHaxe,
    ekS2weniS2tas,
    ekS2weniSaxeS2tas,
    quqL6R,
    ekZeni,
    quqHaxeS2tas,
    quqXemaS2weniSaxeS2tas,
    quqS2weniSaxeS2tas,
    kf2S2weni,
    quqS2weniCa1ara,
    quqZeniKefVasakaXaqadi,
    kanotoKf2ZeniKefVasaka,
    kanotoKf2QuMu,
    SAXES2TAS_BAL2XA,
    ARAQS2TAS_BAL2XA,
    S2WENI_SAXES2TAS,
    QUQXEMA_SAXES2TAS,
    KO_SAXES2TAS,
    VASAKA_SAXES2TAS,
    S2WENI_SAXES2TAS_HAT,
    QUQXEMA_BAL2XA,
    S2TAS_SKAKEFANI,
    HAXE_KSAKA,
    KP6_CA1ARA,
    AIH_AWA,
    KSAKA_CA1ARA,
    P2SE,
    CEZ,
    TACE,
    KAL,
    QU,
    MU,
    KEF_PUK2FE,
    OX2PEWA_NE1A
};
export type { KefEskek, VasakaKefEskek, ZeniVasakaHat, ZeniKefVasakaHat, QuqXemaVasaka, Ox2pewaK61e };
