import * as XLSX from "xlsx";

// ≺⧼ ꞁȷ̀ɔ ʌ ꞁȷ̀ɹ ſɭˬꞇᴜ ʌ ſɭᴜͷ̗ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ 🌐 ⧽≻
/**
 * ſɭʞɹ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( VOS )
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
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
    "SWER": [ "j͑ʃп́", "j͑ʃп́ɔ" ],
    "SER": [ "j͑ʃɔƣ̋", "j͑ʃɔ" ],
};

/*
* ⟨ ſɭɹ ֭ſɭɹ ʌ ɭʃᴜ 📃 ⟩
* j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſןɹ j͑ʃᴜ j͑ʃᴜꞇ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭɹ ֭ſɭɹ ɭʃᴜ ⟅
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɜ ı],ɹȝ ꞁȷ̀ᴜ }ʃꞇ ʌ ⺓ ʌ ſɭꞇ ⟅
* j͑ʃ'ɔ ſ̀ȷᴜȝ ꞁȷ̀ᴜͷ̗ ʌ ſןɹ j͑ʃᴜ j͑ʃᴜꞇ j͐ʃ ʌ ſɭ,ᴜʞ ʌ ſɭɔʞ ʌ ⺓ ʌ QUQXEMA_SAXES2TAS ⟅
*/
const QUQXEMA_WILL_SAXE = "ſɭɹ ֭ſɭɹ";
const QUQXEMA_WILL = `${ QUQXEMA_WILL_SAXE } ɭʃᴜ`;

const QUQXEMA_SAXES2TAS: Record<string, [ string, string ]> = {
    "OR": [ "ꞁȷ̀ɜƣ̋", "ꞁȷ̀ɜ" ],
    "YOR": [ "ſ͕ȷɜƣ̋", "ſ͕ȷɜ" ],
    "TAK": [ "ɭʃᴜƽ", "ɭʃᴜ" ],
    "KOTAK": [ "ſɭɜ ɭʃᴜƽ", "ſɭɜ ɭʃᴜ" ],
    "KN2": [ "ſɭc̗ɹƣ̋", "ſɭc̗ɹ" ],
    "TQ2": [ "ɭʃȝɹƣ̋", "ɭʃȝɹ" ],
    "WILL": [ QUQXEMA_WILL, QUQXEMA_WILL ]
};

const KO_SAXES2TAS: Record<string, [ string, string ]> = {
    "KON": [ "ſɭɜc̗", "ſɭɜ" ],
    "NER": [ "}ʃɔƣ̋", "}ʃɔ" ],
};

const VASAKA_SAXES2TAS: Record<string, [ string, string ]> = {
    "VER": [ "j͑ʃ'ɔƣ̋", "j͑ʃ'ɔ" ],
    "VES": [ "j͑ʃ'ᴜƣ̋", "j͑ʃ'ᴜ" ],
    "B6N": [ "ʃэc̗", "ʃэ" ],
    "L6R": [ "j͐ʃэƣ̋", "j͐ʃэ" ],
};

// ⟨ ſɭᴜ ɭl̀ɹ ɭʃɔ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ ( GES PUF SIIR BAZ XER SUP ) 📃 ⟩

const TANI_SAXES2TAS: Record<string, [ string, string ]> = {
    "GES": [ "ſ͔ɭɔɔ˞", "ſ͔ɭɔ" ],
    "PUF": [ "ſןwʞ", "ſןw" ],
    "SIIR": [ "j͑ʃɹƣ̋", "j͑ʃɹ" ],
    "BAZ": [ "ʃᴜƴ", "ʃᴜ" ],
    "XER": [ "ı],ɔƣ̋", "ı],ɔ" ],
    "SUP": [ "ſɭc̭ᴜʞ", "ſɭc̭ᴜ" ],
};

// ⟨ j͐ʃэ ſɟɹƽ ꞁȷ̀ᴜ ſɭꞇ j͑ʃᴜꞇ ( MAR ARA MARA KAP KER HAT ) 📃 ⟩

const KAKAI_SAXES2TAS: Record<string, [ string, string ]> = {
    "MAR": [ "ŋᷠᴜƣ̋", "ŋᷠᴜ" ],
    "ARA": [ "ſ͕ɭᴜƣ̋", "ſ͕ɭᴜ" ],
    "MARA": [ "ŋᷠᴜƣ̋ ſ͕ɭᴜƣ̋", "ŋᷠᴜ ſ͕ɭᴜ" ],
    "KAP": [ "ſɭᴜɘ", "ſɭᴜ" ],
    "KER": [ "ſɭɔƣ̋", "ſɭɔ" ],
    "HAT": [ "֭ſɭᴜƨ", "֭ſɭᴜ" ],
};

const SAXES2TAS_BAL2XA: Record<string, [ string, string ]> = {
    ...S2WENI_SAXES2TAS,
    ...QUQXEMA_SAXES2TAS,
    ...KO_SAXES2TAS,
    ...VASAKA_SAXES2TAS,
    ...TANI_SAXES2TAS,
    ...KAKAI_SAXES2TAS
};

const S2WENI_SAXES2TAS_HAT = new Set(Object.keys(S2WENI_SAXES2TAS));

const QUQXEMA_BAL2XA: Record<string, string> = {
    "YOR": "OR",
    "OR": "YOR",
    "KOTAK": "TAK",
    "TAK": "KOTAK"
};

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( ko )
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɟᴜ ſɭᴜ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param quqXema ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞ ( OR TAK KN2 TQ2 WILL )
    * @param ko ( boolean = false , optional ) - ſɭɜ j͑ʃᴜ
 * @returns saxeS2tas
 */
function quqXemaSaxeS2tas(quqXema: string, ko: boolean = false): string {
    if (ko) {
        const koS2tas = quqHaxeS2tas(quqXema);
        if (koS2tas) return koS2tas;
    }
    return quqXema;
}

/**
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( KON OR L6R )
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɟᴜ ſɭᴜ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param vasaka ( ZeniVasaka , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns saxeS2tasCa1ara
 */
function quqZeniS2tasCa1ara(vasaka: ZeniVasaka): string[] {
    const ca1ara: string[] = [];
    const kox2qQuqXema = vasaka.s2tas === "KON" && ( vasaka.quqXema === "OR" || vasaka.quqXema === "TAK" );

    if ( vasaka.s2tas === "KON" && !kox2qQuqXema ) ca1ara.push("KON");
    if ( vasaka.quqXema ) {
        ca1ara.push(kox2qQuqXema ? QUQXEMA_BAL2XA[vasaka.quqXema]! : quqXemaSaxeS2tas(vasaka.quqXema, vasaka.ko));
    }
    if ( vasaka.s2tas && vasaka.s2tas !== "KON" ) ca1ara.push(vasaka.s2tas);

    return ca1ara;
}

const ARAQS2TAS_BAL2XA: Record<string, [ string, string ]> = {
    "SU": [ "j͑ʃᴜꞇ", "ꞁȷ̀ᴜꞇ" ],
    "AL": [ "j͐ʃ", "ꞁȷ̀ᴜͷ̗" ],
    "ANI": [ "}ʃꞇ", "ꞁȷ̀ᴜ }ʃꞇ" ],
    "ANU": [ "}ʃw", "ꞁȷ̀ᴜ }ʃw" ],
    "KOZ": [ "ſɭɜƴ", "ꞁȷ̀ɜƴ" ],
    "STIF": [ "j͑ʃƨꞇʞ", "ɭʃꞇʞ" ],
    "DI": [ "ɭ(ꞇ", "ɭ(ꞇ" ],
    "OMA": [ "ꞁȷ̀ɜ ŋᷠᴜ", "ꞁȷ̀ɜ ŋᷠᴜ" ],
    "STAF": [ "j͑ʃƨᴜʞ", "ꞁȷ̀ᴜ j͑ʃƨᴜʞ" ],
    "CLOTHING": [ "ɭʃɔ", "ɭʃɔ" ],
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
    "KN2": "WANT_TO",
    "TQ2": "NEED_TO",
    "WILL": "WILL",
    "KON": "NOT",
    "NER": "OPPOSITE",
    "SER": "OF",
    "SU": "ADJECTIVIZER",
    "AL": "BOUNDARY",
    "ANI": "NOMINALIZER",
    "ANU": "NOMINALIZER",
    "KOZ": "VERY",
    "STIF": "STIFEH2",
    "DI": "ORDINAL",
    "OMA": "FRACTION",
    "STAF": "DAY",
    "CLOTHING": "CLOTHING",
    "GES": "MORE",
    "PUF": "A_BIT_MORE",
    "SIIR": "A_BIT_LESS",
    "BAZ": "LESS",
    "XER": "SMALLER",
    "SUP": "MOST",
    "MAR": "AGENTIVE",
    "ARA": "LOCATIVE",
    "MARA": "AGENTIVE_LOCATIVE",
    "KAP": "BUILDING",
    "KER": "STUDY_OF",
    "HAT": "COLLECTIVE",
    /*
    * ⟨ j͑ʃɹ ɭʃᴜɔ˞ 📃 ⟩
    * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɟᴜ ſ̀ȷᴜȝ ʌ ⺓ ʌ QU MU KAL ⟅
    * ſɭɜ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ ʌ ⺓ ʌ ſɭꞇ ⟅
    * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔ˞ᴜ ſɭᴜ ʌ ⺓ ʌ ſɭꞇ ⟅
    */
    "QU": "TOPIC",
    "MU": "FOCUS",
    "KAL": "SEPARATOR"
};

const HAXE_KSAKA: Record<string, string> = { Verb: "V", Noun: "N", Adjective: "ADJ", Evidential: "EVI", Affix: "AFFIX" };


// ⟪ j͑ʃ'ɜ ſןɹ ʌ ſɭɹ ſȷɔ 📚 ⟫

type Kf2Keve = () => unknown;

class XezHtakaB6vegejex {
    private _kf2Bal2xa: Record<string, Kf2Keve> = {};

    b6vegejex(ksaka: string) {
        return (kf2Keve: Kf2Keve): Kf2Keve => {
            this._kf2Bal2xa[ksaka] = kf2Keve;
            return kf2Keve;
        };
    }

    quqXezHtakaCa1ara(): string[] {
        return Object.keys(this._kf2Bal2xa);
    }

    kf2(ksaka: string): unknown {
        const kf2Keve = this._kf2Bal2xa[ksaka];
        if (kf2Keve) {
            return kf2Keve();
        }
        return null;
    }
}

const xezHtakaB6vegejex = new XezHtakaB6vegejex();


// ⟪ ʃɔ 🔤 ⟫

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 *     @param kef ( string , required ) - ſɭɔʞ
  *  @returns cez
 * */
function ekAwaSaxe(kef: string): boolean {
    if ( !kef || !kef.trim() ) {
        return false;
    }
    const okef = kef.trim();
    if ( okef.startsWith("ꞁȷ̀") ) {
        return true;
    }
    return AIH_AWA.includes(okef[0o0]);
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( ʃɔ )
 *     @param kef ( string , required ) - ſɭɔʞ
  *  @returns cez
 * */
function ekAwaAraq(kef: string): boolean {
    if ( !kef ) {
        return true;
    }
    const okef = kef.trimEnd();
    if ( !okef ) {
        return true;
    }
    for ( const ketu of KSAKA_CA1ARA ) {
        if ( okef.endsWith(ketu) ) {
            return false;
        }
    }
    return AIH_AWA.includes(okef[okef.length - 0o1]);
}


// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔʞ 🔧 ⟫

interface KefEskek {
    gawekiif: string;
    skakefani: string;
    haxe: string;
    n2kK2fe?: number;
    _s2weniSaxe?: string;
    _s2weniSaxeS2tas?: string;
    /*
    * ⟨ ſᶘɔ j͐ʃw|j͐ʃэ ſɭɔʞ 📃 ⟩
    * ſɭɜ ſɭᴜͷ̗ ɭʃɜƽ ʌ ſɭɔƽ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * ᶅſɜ ſןɜ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ
    * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ ʌ ſɭɔʞ ʌ ⺓ ʌ _jexeK2fe ⟅
    */
    _jexeK2fe?: number;
}

interface VasakaKefEskek extends KefEskek {
    _quqSaxeS2tas?: string | null;
    _quqAraqS2tas?: string | null;
    /*
    * ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ 📃 ⟩
    * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſןɹ j͑ʃᴜ j͑ʃᴜꞇ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ ʌ ⺓ ʌ _quqAraqS2tasCa1ara ⟅
    * ſɭɜ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ }ʃᴜ ſɭᴜ ŋᷠᴜ j͐ʃ ʌ ı],ᴜ j͑ʃᴜꞇ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ ʌ ⺓ ʌ _quqAraqS2tasCa1ara ⟅
    */
    _quqAraqS2tasCa1ara?: string[];
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
}

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( OR TAK YOR KOTAK KN2 TQ2 WILL )
 * ſɭʞɹ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( OR TAK YOR KOTAK )
    * @param zeni ( KefEskek , required ) - ſɭɔʞ ( gawekiif )
    * @param k61eCa1ara ( ZeniVasakaHat = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns kef
 */
function quqZeniVasaka(zeni: KefEskek, k61eCa1ara: ZeniVasakaHat = {}): VasakaKefEskek {
    const {
        s2tas = null,
        quqXema = null,
        quqXemaKo = false,
        kf2Koz = false,
        xemaS2tas = false,
        xemaQuqXema = false
    } = k61eCa1ara;

    /*
    * ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ j͐ʃэ ſɭɔʞ 📃 ⟩
    * ſɭ,ɔ }ʃꞇ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ
    * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔƽ ʌ ⺓ ʌ ſɭɜ ı],ɹȝ ꞁȷ̀ᴜ }ʃꞇ ⟅
    */
    const [ jexeHat, jexeAraq ] = quqJexeHat(zeni);
    let zeniHat = jexeHat;
    const zeniSkakefani = zeni.skakefani;
    let quqSaxeS2tas: string | null = null;
    let quqAraqS2tas: string | null = null;
    const quqAraqS2tasCa1ara: string[] = [];
    let quqQuqXema: string | null = null;
    let quqXemaKoS2 = false;

    /*
    * ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( KON OR L6R ) 📃 ⟩
    * ſɭɜc̗ ꞁȷ̀ɜƣ̋ ｡ ꞁȷ̀ɜ j͐ʃэ
    */
    let quqS2tasK61e: string | null = null;
    let araqS2tasK61e: string | null = null;

    if (s2tas) {
        if (s2tas === "KON") {
            araqS2tasK61e = s2tas;
        } else {
            quqS2tasK61e = s2tas;
        }
    } else if (xemaS2tas) {
        const s2tasCa1ara = [ "L6R", "B6N" ];
        quqS2tasK61e = s2tasCa1ara[Math.floor(Math.random() * s2tasCa1ara.length)];
    }

    if (quqS2tasK61e) {
        zeniHat = quqS2tas(zeniHat, quqS2tasK61e);
        if (SAXES2TAS_BAL2XA[quqS2tasK61e]) {
            quqSaxeS2tas = quqS2tasK61e;
        } else if (ARAQS2TAS_BAL2XA[quqS2tasK61e]) {
            quqAraqS2tas = quqS2tasK61e;
            quqAraqS2tasCa1ara.push(quqS2tasK61e);
        }
    }

    if (quqXema) {
        /*
        * j͑ʃ'ɔ ʃэ ſɭɔƽ ʌ xaqadiXez ʌ ⺓ ʌ KON ⟅
        */
        const koForma = araqS2tasK61e === "KON" && ( quqXema === "OR" || quqXema === "TAK" )
            ? QUQXEMA_BAL2XA[quqXema] || null
            : null;
        if (koForma) {
            zeniHat = quqS2tas(zeniHat, koForma);
            araqS2tasK61e = null;
            quqQuqXema = quqXema;
            quqXemaKoS2 = true;
        } else {
            zeniHat = quqS2tas(zeniHat, quqXemaSaxeS2tas(quqXema, quqXemaKo));
            quqQuqXema = quqXema;
            quqXemaKoS2 = quqXemaKo;
        }
    } else if (xemaQuqXema) {
        const quqXemaCa1ara: [ string, boolean ][] = [
            [ "OR", false ],
            [ "OR", true ],
            [ "TAK", false ],
            [ "TAK", true ],
            [ "KN2", false ],
            [ "TQ2", false ],
            [ "WILL", false ]
        ];
        const [ sukf2qQuqXema, ko ] = quqXemaCa1ara[Math.floor(Math.random() * quqXemaCa1ara.length)];
        zeniHat = quqS2tas(zeniHat, quqXemaSaxeS2tas(sukf2qQuqXema, ko));
        quqQuqXema = sukf2qQuqXema;
        quqXemaKoS2 = ko;
    }

    if (araqS2tasK61e) {
        zeniHat = quqS2tas(zeniHat, araqS2tasK61e);
        quqSaxeS2tas = araqS2tasK61e;
    }

    if (kf2Koz) {
        zeniHat = quqS2tas(zeniHat, "KOZ");
        quqAraqS2tas = "KOZ";
        quqAraqS2tasCa1ara.push("KOZ");
    }

    return {
        ...zeni,
        gawekiif: jexeAraq ? `${zeniHat} ${jexeAraq}` : zeniHat,
        skakefani: zeniSkakefani,
        _quqSaxeS2tas: quqSaxeS2tas,
        _quqAraqS2tas: quqAraqS2tas,
        _quqAraqS2tasCa1ara: quqAraqS2tasCa1ara,
        _quqQuqXema: quqQuqXema,
        _quqXemaKo: quqXemaKoS2,
        _quqKoz: kf2Koz
    };
}


// ⟪ ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ 🔧 ⟫

/**
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param kef ( string , required ) - ſɭɔʞ
    * @param s2tasHat ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞ ( OR KON SU AL )
 * @returns k61e
 */
function quqS2tas(kef: string, s2tasHat: string): string {
    if ( !kef ) return kef;

    if ( SAXES2TAS_BAL2XA[s2tasHat] ) {
        const [ wajaQoxa, ketuQoxa ] = SAXES2TAS_BAL2XA[s2tasHat];
        const xaqadiXez = ekAwaSaxe(kef) ? wajaQoxa : ketuQoxa;
        return `${xaqadiXez} ${kef}`;
    }

    if ( ARAQS2TAS_BAL2XA[s2tasHat] ) {
        const [ wajaQoxa, ketuQoxa ] = ARAQS2TAS_BAL2XA[s2tasHat];
        const xaqadiXez = ekAwaAraq(kef) ? wajaQoxa : ketuQoxa;
        return `${kef} ${xaqadiXez}`;
    }

    return kef;
}

/**
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͐ʃэ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 *
 * ſɭᴜͷ̗ ɭʃɜƽ ʌ ᶅſɜ ſןɜ ʌ ſɭᴜͷ̗ ʌ ſɭɔƽ ʌ ⺓ ʌ ſɭɔʞ ⟅
 * ᶅſɜ ſןɜ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ᶅſɜ ſןɜ ⟅
 *
 *   N Adj  ->  [ N , Adj ]
 *   N      ->  [ N , ""  ]
 *
 * @param kefEskek ( KefEskek | null , required ) - ſɭɔʞ
 * @returns [ jexeHat , jexeAraq ]
 */
function quqJexeHat(kefEskek: KefEskek | null): [ string, string ] {
    const kef = kefEskek?.gawekiif || "";
    const jexeK2fe = kefEskek?._jexeK2fe || 0o0;
    if ( !kef || jexeK2fe < 0o1 ) return [ kef, "" ];

    const ca1ara = kef.split(/\s+/).filter(kef => kef);
    if ( jexeK2fe >= ca1ara.length ) return [ kef, "" ];

    return [ ca1ara.slice(0o0, jexeK2fe).join(" "), ca1ara.slice(jexeK2fe).join(" ") ];
}

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( SU ANI KOZ )
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͐ʃэ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 *
 * ᶅſɜ ſןɜ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔƽ ʌ ⺓ ʌ ſɭɜ ı],ɹȝ ꞁȷ̀ᴜ }ʃꞇ ⟅
 *
 *   quqS2tas( "N Adj" , SU )     ->  N Adj sai
 *   quqS2tasJexe( "N Adj" , SU ) ->  N sai Adj
 *
 * @param kefEskek ( KefEskek | null , required ) - ſɭɔʞ
 * @param s2tasHat ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞ ( SU ANI KOZ )
 * @returns kef
 */
function quqS2tasJexe(kefEskek: KefEskek | null, s2tasHat: string): string {
    const kef = kefEskek?.gawekiif || "";
    if ( !kef ) return kef;

    const [ jexeHat, jexeAraq ] = quqJexeHat(kefEskek);
    if ( !jexeAraq ) return quqS2tas(kef, s2tasHat);

    const jexeHatS2 = quqS2tas(jexeHat, s2tasHat);
    if ( jexeHatS2 === jexeHat ) return kef;

    return `${jexeHatS2} ${jexeAraq}`;
}

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( SU ANI KOZ )
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͐ʃэ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 *
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ᶅſɜ ſןɜ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ kefEskek ⟅
 *
 * @param kefEskek ( KefEskek | null , required ) - ſɭɔʞ
 * @param s2tasHat ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞ ( SU ANI KOZ )
 * @returns kef
 */
function quqS2tasJexeKef(kefEskek: KefEskek | null, s2tasHat: string): { gawekiif: string; jexeK2fe: number } {
    const kef = kefEskek?.gawekiif || "";
    const jexeK2fe = kefEskek?._jexeK2fe || 0o0;
    if ( !kef ) return { gawekiif: kef, jexeK2fe: 0o0 };

    const gawekiif = quqS2tasJexe(kefEskek, s2tasHat);
    if ( !jexeK2fe || gawekiif === kef || !SAXES2TAS_BAL2XA[s2tasHat] ) {
        return { gawekiif, jexeK2fe };
    }

    const k2fe = kef.split(/\s+/).filter(kef => kef).length;
    const k2feS2 = gawekiif.split(/\s+/).filter(kef => kef).length;

    return { gawekiif, jexeK2fe: jexeK2fe + ( k2feS2 - k2fe ) };
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param s2tasHat ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns cez
 */
function ekS2weniS2tas(s2tasHat: string): boolean {
    return S2WENI_SAXES2TAS_HAT.has(s2tasHat);
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( L6R )
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( L6R )
 * ſɭɹ ɽ͑ʃ'ɔ ʌ quqL6R ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( L6R )
    * @param kef ( string , required ) - ſɭɔʞ
    * @param kefEskek ( KefEskek | null = null , optional ) - ſɭɔʞ ( L6R )
 * @returns cez
 */
function ekS2weniSaxeS2tas(kef: string, kefEskek: KefEskek | null = null): boolean {
    if ( !kef ) return false;

    for ( const saxeS2tas of Object.keys(S2WENI_SAXES2TAS) ) {
        const [ wajaQoxa, ketuQoxa ] = SAXES2TAS_BAL2XA[saxeS2tas];
        if ( kef.startsWith(wajaQoxa + " ") || kef.startsWith(ketuQoxa + " ") ) {
            return true;
        }
    }

    const l6rVasaka = quqL6R(kef, kefEskek);
    return l6rVasaka === "s2weni";
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( L6R )
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
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( 2R K2R J6R H2R SAR SWER SER )
 * j͑ʃ'ɜ ſןɹ ʌ j͑ʃɹ ɭʃᴜɔ˞
 * @returns k61e
 */
function quqXemaS2weniSaxeS2tas(): string {
    const saxeS2tasCa1ara = Object.keys(S2WENI_SAXES2TAS);
    return saxeS2tasCa1ara[Math.floor(Math.random() * saxeS2tasCa1ara.length)];
}

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( 2R K2R J6R H2R SAR SWER SER )
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
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

    const { gawekiif: s2weniGawekiif, jexeK2fe } = quqS2tasJexeKef(kefEskek, sukf2qSaxeS2tas);

    const s2weniSkakefani = `[${saxeS2tasSkakefani}] - ${kefEskek.skakefani}`;

    return {
        ...kefEskek,
        gawekiif: s2weniGawekiif,
        skakefani: s2weniSkakefani,
        haxe: "Adjective",
        _s2weniSaxe: kefEskek.haxe,
        _s2weniSaxeS2tas: sukf2qSaxeS2tas,
        _jexeK2fe: jexeK2fe
    };
}

/**
 * ſɭʞɹ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( null )
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
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( L6R )
    * @param kefEskek ( KefEskek | null , required ) - ſɭɔʞ
 * @returns cez
 */
function ekZeni(kefEskek: KefEskek | null): boolean {
    return kefEskek !== null && kefEskek.haxe === "Verb";
}

/**
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( YOR KOTAK OR TAK )
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( YOR KOTAK OR TAK )
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
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @returns han2k
 */
function quqSaxeAraqAihK61e(): string[] {
    return [ ...AIH_SAXE_CA1ARA, ...AIH_M2_CA1ARA, ...AIH_KP6_CA1ARA ];
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param kp6k2p2 ( string , required ) - ſɭɘэ ſɭɹ ſןɹ
 * @returns cez
 */
function ekQuqAihK61e(kp6k2p2: string): boolean {
    if (!kp6k2p2) {
        return false;
    }
    return quqSaxeAraqAihK61e().some(aihK61e => kp6k2p2.includes(aihK61e));
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param skakefaniKekCa1ara ( string[] , required ) - j͑ʃ'ɜ ſןɹ
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

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͐ʃэ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( ｡ )
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͐ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( ｡ - x )
 *
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ſᶘɔ j͐ʃw|j͐ʃэ ſɭɔʞ ⟅
 * ſɭɜ ſɭᴜͷ̗ ɭʃɜƽ ʌ ſɭɔƽ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * ᶅſɜ ſןɜ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ ʌ ſɭɔʞ ʌ ⺓ ʌ _jexeK2fe ⟅
 *
 *   N ｡ Adj        -> 1   ( ᶅſɜ ſןɜ ʌ N ⟅ )
 *   ſ͕ɭэ ſɭɹ ｡ ꞁȷ̀ᴜ ŋᷠɹ -> 2   ( ᶅſɜ ſןɜ ʌ ſ͕ɭэ ſɭɹ ⟅ )
 *
 * @param jexeNe1anesai ( string , required ) - ſᶘɔ j͐ʃw|j͐ʃэ ſɭɔʞ
 * @param kef ( string , required ) - ſɭɔʞ
 * @returns jexeK2fe
 */
function quqJexeK2fe(jexeNe1anesai: string, kef: string): number {
    if ( !jexeNe1anesai || !kef ) return 0o0;

    const jexeCa1ara = jexeNe1anesai
        .split("｡")
        .map(kef => kef.trim())
        .filter(kef => kef);

    if ( jexeCa1ara.length < 0o2 ) return 0o0;

    /*
    * ⟨ - ʌ x 📃 ⟩
    * ſȷw ſ̀ȷэ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭꞇ ⟅
    * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ ʌ ſɭɔʞ ʌ ⺓ ʌ ᶅſɜ ſןɜ ⟅
    */
    const jexeHatCa1ara = jexeCa1ara[0o0]!
        .split(/\s+/)
        .map(kef => kef.trim())
        .filter(kef => kef && kef !== "-" && kef !== "x");

    if ( jexeHatCa1ara.length === 0o0 ) return 0o0;

    const kefCa1ara = kef.split(/\s+/).filter(kef => kef);
    const jexeK2fe = jexeHatCa1ara.length;

    /*
    * ⟨ ſɭɹ ɽ͑ʃ'ɔ 📃 ⟩
    * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ᶅſɜ ſןɜ ⟅
    * ſɭɜ ſɭʞɹ ʌ ſɭɜ ı],ɹȝ ꞁȷ̀ᴜ }ʃꞇ ʌ ⺓ ʌ ŋᷠᴜ ſɭʞɹ ⟅
    */
    if ( jexeK2fe < 0o1 || jexeK2fe >= kefCa1ara.length ) return 0o0;

    return jexeK2fe;
}

// ⟨ ֭ſɭᴜ ı],ɔ ( HAXE_BAL2XA ) 📃 ⟩

const HAXE_BAL2XA: Readonly<Record<string, string>> = {
    "ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ": "Affix",
    "ſɭɔ ı],ɔ }ʃꞇ": "Evidential",
    "ſɭ,ɔ }ʃꞇ": "Verb",
    "ſɭ,ɔ ſ͔ɭɔ }ʃꞇ": "Verb",
    "ſ͕ɭᴜ ɭʃᴜ ʃɔ": "Pending",
    "j͑ʃɹ ᶅſɔ }ʃꞇ": "Adjective",
    "ſɭɹ ſȷɔ": "Number ( Noun )",
    "ſɭʞɔ }ʃꞇ": "Chemical ( Noun )",
    "ʃɜ j͐ʃɔ": "Sound ( Noun )",
    "ʃɔ": "Sound ( Noun )",
    "ŋᷠɜⅎᶗ‹": "Food ( Noun )",
    "ı],ᴜ ſ̀ȷɔ": "Plant ( Noun )",
    "ſןᴜ ſ͔ɭᴜ": "Animal ( Noun )",
    "ɭ(ᴜͷ̗": "Living Thing ( Noun )",
};

function quqKefHateCa1ara(kefHate: string): string[] {
    return kefHate.normalize("NFC").split(/\s+/).filter(Boolean);
}

const HATE_BAL2XA_KEFCA1ARA: ReadonlyArray<{ kefCa1ara: string[]; araqKef: string }> =
    Object.entries(HAXE_BAL2XA).map(([ kefCa1ara, araqKef ]) => ({ kefCa1ara: quqKefHateCa1ara(kefCa1ara), araqKef }));

function kefHateHat(kefHate: string, kefCa1ara: readonly string[]): boolean {
    if ( kefCa1ara.length === 0o0 ) return false;
    const hateCa1ara = quqKefHateCa1ara(kefHate);
    if ( hateCa1ara.length < kefCa1ara.length ) return false;
    for ( let n2k = 0o0; n2k <= hateCa1ara.length - kefCa1ara.length; n2k++ ) {
        let a1a = true;
        for ( let kefN2k = 0o0; kefN2k < kefCa1ara.length; kefN2k++ ) {
            if ( hateCa1ara[n2k + kefN2k] !== kefCa1ara[kefN2k] ) {
                a1a = false;
                break;
            }
        }
        if ( a1a ) return true;
    }
    return false;
}

/**
 * j͑ʃ'ɔ ſȷᴜͷ̗ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 *    @param k61e ( unknown ) - j͑ʃ'ɜ ſןɹ
 * @returns k61e
 */
function kubaK61e(k61e: unknown): string {
    if ( k61e === null || k61e === undefined ) return "";
    return String(k61e).replace(/\r?\n/g, " ").normalize("NFC").trim();
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ֭ſɭᴜ ı],ɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( kefHate k21eKefHate )
 *    @param kefHate ( string ) - ֭ſɭᴜ ı],ɔ ( 0 )
 *    @param k21eKefHate ( string ) - ֭ſɭᴜ ı],ɔ ( 1 )
 * @returns k61e
 */
function quqHaxe(kefHate: string, k21eKefHate: string): string {
    for ( const eskek of HATE_BAL2XA_KEFCA1ARA ) {
        if ( kefHateHat(kefHate, eskek.kefCa1ara) ) return quqHateKef(eskek.araqKef);
    }
    for ( const eskek of HATE_BAL2XA_KEFCA1ARA ) {
        if ( kefHateHat(k21eKefHate, eskek.kefCa1ara) ) return quqHateKef(eskek.araqKef);
    }
    return "Noun";
}

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ֭ſɭᴜ ı],ɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( HATE_BAL2XA Number Chemical Affix Noun )
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ֭ſɭᴜ ı],ɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( quqHateKef HATE_BAL2XA )
 *    @param haxe ( string ) - ֭ſɭᴜ ı],ɔ
 * @returns k61e
 */
function quqHateKef(haxe: string): string {
    const a1a = haxe.match( /\(\s*(\w+)\s*\)$/ );
    if ( a1a ) return a1a[0o1];
    return haxe;
}

/**
 * ſ͕ɭɹȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( xlsx KefEskek )
    * @param xlsxK6h6 ( string | null = null , optional ) - ſɭэ ֭ſɭэ ( xlsx )
 * @returns kefCa1ara
 */
async function b6tem2KefCa1ara(xlsxK6h6: string | null = null): Promise<KefEskek[]> {
    const k6h6 = xlsxK6h6 || KEF_K6H6_CA1ARA[0o0];

    if ( _kefBal2xa.has(k6h6) ) {
        return _kefBal2xa.get(k6h6)!;
    }

    try {
        const xema = await fetch(k6h6);
        if ( !xema.ok ) {
            throw new Error("HTTP " + xema.status + " loading " + k6h6);
        }
        const p2saKuba = await xema.arrayBuffer();
        const xlsxKuba = XLSX.read(p2saKuba, { type: "array" });
        const cax2l = xlsxKuba.Sheets[xlsxKuba.SheetNames[0o0]!]!;
        const n2kCa1ara = XLSX.utils.sheet_to_json<unknown[]>(cax2l, {
            header: 0o1,
            defval: "",
            raw: false,
        });
        const sunta: KefEskek[] = [];
        for ( let sakN2k = 0o1; sakN2k < n2kCa1ara.length; sakN2k++ ) {
            const sak = n2kCa1ara[sakN2k];
            if ( !sak ) continue;
            const kefHate = kubaK61e(sak[0o0]);
            const k21eKefHate = kubaK61e(sak[0o1]);
            const kefNe1anesai = kubaK61e(sak[0o2]);
            const skakefaniNe1anesai = kubaK61e(sak[0o3]);
            // ⟨ ſᶘɔ j͐ʃw|j͐ʃэ ſɭɔʞ 📃 ⟩
            const jexeNe1anesai = kubaK61e(sak[0o6]);
            if ( !kefNe1anesai ) continue;
            const haxe = quqHaxe(kefHate, k21eKefHate);
            // ⟨ ſɟᴜ ɭʃᴜ ʌ j͑ʃ'ɜ ſןɹ ( ｡ ) 📃 ⟩
            const kefCa1ara = kefNe1anesai.split("｡").map(kef => kef.trim()).filter(kef => kef);
            const skakefaniCa1ara = skakefaniNe1anesai ? skakefaniNe1anesai.split("｡").map(kef => kef.trim()).filter(kef => kef) : [];
            for ( let kefN2k = 0o0; kefN2k < kefCa1ara.length; kefN2k++ ) {
                const xaqadiKef = kefCa1ara[kefN2k];
                const xaqadiSkakefani = skakefaniCa1ara[kefN2k];
                const skakefaniK61e = skakefaniCa1ara.length > 0o0
                ? sukf2qNe1aAihSkakefani( xaqadiSkakefani !== undefined ? [ xaqadiSkakefani ] : skakefaniCa1ara )
                : xaqadiKef;
                /*
                * ⟨ ſɭɹ ɽ͑ʃ'ɔ 📃 ⟩
                * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ſᶘɔ j͐ʃw|j͐ʃэ ſɭɔʞ ⟅
                * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ı],ᴜ ſ͕ɭᴜ ɭ(ꞇ ʌ ſɭɔƽ ʌ ⺓ ʌ ſɭɜ ı],ɹȝ ꞁȷ̀ᴜ }ʃꞇ ⟅
                */
                const jexeK2fe = kefN2k === 0o0 ? quqJexeK2fe( jexeNe1anesai, xaqadiKef ) : 0o0;
                sunta.push({
                    gawekiif: xaqadiKef,
                    skakefani: skakefaniK61e,
                    haxe: haxe,
                    n2kK2fe: sakN2k - 0o1,
                    _jexeK2fe: jexeK2fe,
                });
            }
        }
        _kefBal2xa.set(k6h6, sunta);
        console.log("( ſ̀ȷᴜ ſɭɹ ) j͑ʃ'ɔ ſȷᴜͷ̗ ʌ " + sunta.length + " j͑ʃᴜꞇ ʌ ſɭɔʞ ʌ ⺓ ʌ " + k6h6 + " ⟅");
        return sunta;
    } catch ( tlohk2ni ) {
        console.warn("( ſ̀ȷᴜ ſɭɹ ) ſɭɜc̗ ꞁȷ̀ɜ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ ʌ ⺓ ʌ " + k6h6 + " ⟅", tlohk2ni);
        const eq2k: KefEskek[] = [];
        return eq2k;
    }
}

/**
 * ſ͕ɭɹȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @returns kefCa1ara
 */
async function b6tem2KefCa1araVop2(): Promise<KefEskek[]> {
    for ( const k6h6 of KEF_K6H6_CA1ARA ) {
        const kefCa1ara = await b6tem2KefCa1ara(k6h6);
        if ( kefCa1ara.length > 0o0 ) {
            console.log("( ſ̀ȷᴜ ſɭɹ ) j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ ʌ ⺓ ʌ " + k6h6 + " ⟅");
            return kefCa1ara;
        }
    }
    return [];
}

/**
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @returns kefCa1ara
 */
function b6tem2KefCa1araKxesu(): KefEskek[] {
    for ( const kefCa1ara of _kefBal2xa.values() ) {
        if ( kefCa1ara.length > 0o0 ) return kefCa1ara;
    }

    return [];
}

/**
 * ſ͕ɭɹȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( HAXE )
    * @param haxe ( string , required ) - ֭ſɭᴜ ı],ɔ
 * @returns kef
 */
function quqKefHaxe(haxe: string): KefEskek | null {
    const kefCa1ara = b6tem2KefCa1araKxesu().filter(kefEskek => kefEskek.haxe === haxe);
    if ( kefCa1ara.length === 0o0 ) return null;
    return kefCa1ara[Math.floor(Math.random() * kefCa1ara.length)];
}


// ⟪ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ 🧱 ⟫

/**
 * ֭ſɭᴜ ı],ɔ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ( VOS )
 */
const KefLuj2 = {
    ZENI: "ZENI",
    KEFMA3AKAKAI: "KEFMA3AKAKAI",
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
 * ſɭʞɹ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 */
class Ox2pewaKek {
    stifeh2: KefEskek | null = null;
    zeni: KefEskek | null = null;
    zeniVasaka: ZeniVasaka = { s2tas: null, quqXema: null, ko: false };
    zeniKexeni: KefEskek | null = null;
    kexeniOx2pewa: KefEskek | null = null;
    tani: TaniK61e = { ekTani: false, ekCez: false };
    koz: KozK61e = { kxesu: false, zeniAraq: false };
    xezHtakaKsaka = "";
    _vasakaZeni?: VasakaKefEskek;

    kefCa1ara: Ox2pewaKefEskek[] = [];
}

/**
 * ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param s2tas ( string , required ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns k61e
 */
function _quqS2tasK61e(s2tas: string): string | null {
    return S2TAS_SKAKEFANI[s2tas] || s2tas;
}


// ⟪ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ 🔨 ⟫

const TLOHK2NI_NE1AZENI = "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ꞁȷ̀ɜ ſɭɔ ſɭɔ ſ͕ȷᴜ ʌ ſɭ,ɔ }ʃꞇ";

class Ox2pewaVepaq {
    ox2pewaKek: Ox2pewaKek;

    constructor() {
        this.ox2pewaKek = new Ox2pewaKek();
    }

    xemaKsaka(ksaka: string): Ox2pewaVepaq {
        this.ox2pewaKek.xezHtakaKsaka = ksaka;
        return this;
    }

    xemaStifeh2(stifeh2: KefEskek): Ox2pewaVepaq {
        this.ox2pewaKek.stifeh2 = stifeh2;
        return this;
    }

    xemaZeni(zeni: KefEskek, s2tas: string | null = null, quqXema: string | null = null, ko: boolean = false): Ox2pewaVepaq {
        this.ox2pewaKek.zeni = zeni;
        this.ox2pewaKek.zeniVasaka = { s2tas, quqXema, ko };
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

        this.ox2pewaKek.kefCa1ara.push({
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
            this.ox2pewaKek.kefCa1ara.unshift({
                kef: s2weni,
                kefLuj2: kefLuj2,
                ekS2weni: true,
                quqKal: false,
                quMu: null
            });
        }
        return this;
    }

    kf2KalKef(kef: KefEskek, kefLuj2: KefLuj2Hat, quqKal: boolean = true): Ox2pewaVepaq {
        this.kf2Kef(kef, kefLuj2, { quqKal: quqKal });
        return this;
    }

    xemaKexeniVp(kexeni: KefEskek): Ox2pewaVepaq {
        this.ox2pewaKek.zeniKexeni = kexeni;
        return this;
    }

    xemaKexeniOx2pewa(kexeni: KefEskek): Ox2pewaVepaq {
        this.ox2pewaKek.kexeniOx2pewa = kexeni;
        return this;
    }

    xemaTani(ekCez: boolean = true): Ox2pewaVepaq {
        this.ox2pewaKek.tani = { ekTani: true, ekCez };
        return this;
    }

    xemaKoz(s2weni: KefEskek | null, ekZeni: boolean = false): Ox2pewaVepaq {
        if (ekZeni) {
            this.ox2pewaKek.koz.zeniAraq = true;
        } else if (s2weni) {
            this.ox2pewaKek.koz.s2weniAraq = s2weni;
        }
        this.ox2pewaKek.koz.kxesu = true;
        return this;
    }

    private _quqZeniVasaka(): VasakaKefEskek {
        const zeni = this.ox2pewaKek.zeni;

        if ( !zeni ) throw new Error( TLOHK2NI_NE1AZENI );

        const vasakaZeni = quqZeniVasaka(zeni, {
            s2tas: this.ox2pewaKek.zeniVasaka.s2tas,
            quqXema: this.ox2pewaKek.zeniVasaka.quqXema,
            quqXemaKo: this.ox2pewaKek.zeniVasaka.ko,
            kf2Koz: this.ox2pewaKek.koz.kxesu && this.ox2pewaKek.koz.zeniAraq
        });
        this.ox2pewaKek._vasakaZeni = vasakaZeni;
        return vasakaZeni;
    }

    private _quqZ2hakAl(kefCa1ara: string[]): string[] {
        if (kefCa1ara.length === 0o0) return kefCa1ara;
        const kmaN2k = kefCa1ara.length - 0o1;
        /*
        * ⟨ ſɭᴜͷ̗ ʌ ꞁȷ̀ᴜͷ̗ ( KAL AL ) 📃 ⟩
        * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ AL ʌ ⺓ ʌ KAL ⟅
        */
        if (kefCa1ara[kmaN2k] === KAL || !this._ekKp6(kefCa1ara[kmaN2k])) {
            kefCa1ara[kmaN2k] = quqS2tas(kefCa1ara[kmaN2k], "AL");
        }
        return kefCa1ara;
    }

    private _ekKp6(kp6k2p2: string): boolean {
        return KP6_CA1ARA.some(kp6 => kp6k2p2 === kp6 || kp6k2p2.endsWith(kp6));
    }

    private _vepaqZeniXezHtaka(vasaka: ZeniVasaka, quqKoz: boolean): string {
        const ca1ara = quqZeniS2tasCa1ara(vasaka);
        ca1ara.push("V");
        if (quqKoz) ca1ara.push("KOZ");
        return ca1ara.join("-");
    }

    private _vepaqSkakefani(skakefaniK61e: string, saxeK61e: string | null = null, araqK61e: string | null = null): string {
        if (!skakefaniK61e) return "";

        const saxeK61eS2 = saxeK61e ? `[${saxeK61e}] - ` : "";
        const araqK61eS2 = araqK61e ? `-${araqK61e}` : "";

        return `${saxeK61eS2}[${skakefaniK61e}${araqK61eS2}]`;
    }

    private _quqS2tasSkakefani(vasaka: ZeniVasaka | VasakaKefEskek | null, ekKef: boolean = false): [ string | null, string | null ] {
        if (!vasaka) return [ null, null ];

        let saxeK61e: string | null = null;
        let araqK61e: string | null = null;

        if (ekKef) {
            const vasakaKefEskek = vasaka as VasakaKefEskek;
            const ca1ara: string[] = [];

            /*
            * ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( KON OR L6R ) 📃 ⟩
            * ſɭɜc̗ ꞁȷ̀ɜƣ̋ ｡ ꞁȷ̀ɜ j͐ʃэ
            */
            if (vasakaKefEskek._quqSaxeS2tas === "KON") {
                ca1ara.push(_quqS2tasK61e("KON")!);
            }
            if (vasakaKefEskek._quqQuqXema) {
                ca1ara.push(_quqS2tasK61e(quqXemaSaxeS2tas(vasakaKefEskek._quqQuqXema, !!vasakaKefEskek._quqXemaKo))!);
            }
            if (vasakaKefEskek._quqSaxeS2tas && vasakaKefEskek._quqSaxeS2tas !== "KON") {
                ca1ara.push(_quqS2tasK61e(vasakaKefEskek._quqSaxeS2tas)!);
            }

            saxeK61e = ca1ara.length > 0o0 ? ca1ara.join(" - ") : null;

            /*
            * ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ 📃 ⟩
            * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſןɹ j͑ʃᴜ j͑ʃᴜꞇ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ ʌ ⺓ ʌ ſɭɔʞ ⟅
            * j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ ʌ ⺓ ʌ ſɭꞇ ⟅
            */
            const araqCa1ara = vasakaKefEskek._quqAraqS2tasCa1ara?.length
                ? vasakaKefEskek._quqAraqS2tasCa1ara
                : ( vasakaKefEskek._quqAraqS2tas ? [ vasakaKefEskek._quqAraqS2tas ] : [] );

            if ( araqCa1ara.length > 0o0 ) {
                araqK61e = araqCa1ara.map(s2tas => _quqS2tasK61e(s2tas) || s2tas).join(" - ");
            }
        } else {
            const vasakaZeni = vasaka as ZeniVasaka;
            const ca1ara = quqZeniS2tasCa1ara(vasakaZeni).map(s2tas => _quqS2tasK61e(s2tas) || s2tas);

            saxeK61e = ca1ara.length > 0o0 ? ca1ara.join(" - ") : null;
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

    /**
     * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
     * ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
     *
     * j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ ʌ ⺓ ʌ ſɭꞇ ⟅
     * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ſɟɹƽ ꞁȷ̀ᴜꞇ ʌ ⺓ ʌ ſɭɔʞ ⟅
     *
     * @param kef ( KefEskek , required ) - ſɭɔʞ
     * @param xezHtakaKsaka ( string , required ) - j͑ʃ'ɜ ſןɹ
     * @returns void
     */
    private _suntaKefJexe(
        gawekiif: string[],
        xezHtaka: string[],
        skakefani: string[],
        kef: KefEskek,
        xezHtakaKsaka: string
    ): void {
        const [ saxeK61e, araqK61e ] = this._quqS2tasSkakefani(kef as VasakaKefEskek, true);
        this._kf2Kef(gawekiif, xezHtaka, skakefani, kef.gawekiif, xezHtakaKsaka, kef.skakefani, saxeK61e, araqK61e);
    }

    vepaq(): { gawekiif: string; skakefani: string; xezHtaka: string; ox2pewaKek: Ox2pewaKek } {
        const gawekiif: string[] = [];
        const xezHtaka: string[] = [];
        const skakefani: string[] = [];

        if (this.ox2pewaKek.stifeh2) {
            const stifeh2 = this.ox2pewaKek.stifeh2;
            this._suntaKefJexe(gawekiif, xezHtaka, skakefani, stifeh2, "T");
        }

        const s2weniCa1ara = this.ox2pewaKek.kefCa1ara.filter(ox2pewaKef =>
            ox2pewaKef.kefLuj2 === KefLuj2.ZENI && ox2pewaKef.ekS2weni
        );
        this._suntaS2weniCa1ara(s2weniCa1ara, gawekiif, xezHtaka, skakefani);

        const vasakaZeni = this._quqZeniVasaka();
        const vasaka = this.ox2pewaKek.zeniVasaka;
        const [ zeniSaxe, zeniAraq ] = this._quqS2tasSkakefani(vasaka);
        const quqKoz = this.ox2pewaKek.koz.kxesu && this.ox2pewaKek.koz.zeniAraq;
        this._kf2Kef(gawekiif, xezHtaka, skakefani, vasakaZeni.gawekiif, this._vepaqZeniXezHtaka(vasaka, quqKoz), vasakaZeni.skakefani, zeniSaxe, zeniAraq);

        if (this.ox2pewaKek.zeniKexeni) {
            const kexeni = this.ox2pewaKek.zeniKexeni;
            this._kf2Kef(gawekiif, xezHtaka, skakefani, kexeni.gawekiif, "EVI", kexeni.skakefani);
        }

        this._vepaqKefma3akakaiOx2pewa(gawekiif, xezHtaka, skakefani);

        if (this.ox2pewaKek.tani.ekTani) {
            const tani = this.ox2pewaKek.tani.ekCez ? CEZ : TACE;
            const xezHtakaKsaka = this.ox2pewaKek.tani.ekCez ? "CEZ" : "TACE";
            const taniSkakefani = this.ox2pewaKek.tani.ekCez ? "CEZ" : "TACE";
            this._kf2Kef(gawekiif, xezHtaka, skakefani, tani, xezHtakaKsaka, taniSkakefani);
        } else {
            this._kf2Kef(gawekiif, xezHtaka, skakefani, P2SE, "⺓", "⺓");
        }

        if (this.ox2pewaKek.kexeniOx2pewa) {
            const kexeni = this.ox2pewaKek.kexeniOx2pewa;
            this._kf2Kef(gawekiif, xezHtaka, skakefani, kexeni.gawekiif, "EVI", kexeni.skakefani);
        }

        this._vepaqKefmasaxesaiOx2pewa(gawekiif, xezHtaka, skakefani);

        return {
            gawekiif: `${gawekiif.join(` ${KEF_PUK2FE} `)} ${OX2PEWA_NE1A}`,
            skakefani: skakefani.join(" "),
            xezHtaka: xezHtaka.join(" "),
            ox2pewaKek: this.ox2pewaKek
        };
    }

    private _suntaS2weniEskek(
        s2weniEskek: Ox2pewaKefEskek,
        gawekiif: string[],
        xezHtaka: string[],
        skakefani: string[],
        quqKoz: boolean
    ): { gawekiifK61e: string; xezHtaka: string; skakefaniK61e: string; quqKoz: boolean } {
        const kf2Koz = this.ox2pewaKek.koz.kxesu &&
            !this.ox2pewaKek.koz.zeniAraq &&
            !quqKoz;
        if (kf2Koz) quqKoz = true;

        const gawekiifK61e = kf2Koz ? quqS2tasJexe(s2weniEskek.kef, "KOZ") : s2weniEskek.kef.gawekiif;

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
            this._quqZ2hakAl(gawekiif);
            this._quqALXezHtaka(xezHtaka);
        }

        let skakefaniK61e = s2weniEskek.kef.skakefani;
        if (saxeS2tasSkakefani && !s2weniEskek.kef.skakefani.startsWith(`[${saxeS2tasSkakefani}]`)) {
            skakefaniK61e = `[${saxeS2tasSkakefani}] - ${s2weniEskek.kef.skakefani}`;
        }

        this._kf2Kef(gawekiif, xezHtaka, skakefani, gawekiifK61e, xezHtakaKsaka, skakefaniK61e, null, araqK61e);

        return { gawekiifK61e, xezHtaka: xezHtakaKsaka, skakefaniK61e, quqKoz };
    }

    private _suntaS2weniCa1ara(
        s2weniCa1ara: Ox2pewaKefEskek[],
        gawekiif: string[],
        xezHtaka: string[],
        skakefani: string[]
    ): void {
        if (!s2weniCa1ara || s2weniCa1ara.length === 0o0) return;

        let quqKoz = this.ox2pewaKek.koz.kxesu && this.ox2pewaKek.koz.zeniAraq;

        for (const s2weniEskek of s2weniCa1ara) {
            const sef10ni = this._suntaS2weniEskek(s2weniEskek, gawekiif, xezHtaka, skakefani, quqKoz);
            quqKoz = sef10ni.quqKoz;
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
        const kefCa1ara = this.ox2pewaKek.kefCa1ara.filter(ox2pewaKef => ox2pewaKef.kefLuj2 === kefLuj2);
        if (kefCa1ara.length === 0o0) return;

        let quqKoz = false;
        let vasakaEskekCa1ara: Ox2pewaKefEskek[] = [];
        let kalVasakaS2 = false;

        for (const eskek of kefCa1ara) {
            const ekVasaka = eskek.ekS2weni;

            if (kalVasakaS2 && !ekVasaka) {
                kalVasakaS2 = false;
                continue;
            }

            if (ekVasaka) {
                vasakaEskekCa1ara.push(eskek);
                kalVasakaS2 = false;
            } else {
                for (const vasakaEskek of vasakaEskekCa1ara) {
                    const sef10ni = this._suntaVasakaEskek(vasakaEskek, gawekiif, xezHtaka, skakefani, quqKoz);
                    quqKoz = sef10ni.quqKoz;
                }
                vasakaEskekCa1ara = [];

                if (eskek.quMu) {
                    const quMuSkakefani = _quqS2tasK61e(eskek.quMu) || eskek.quMu;
                    const quMuXezHtaka = eskek.quMu === QU ? "TOPIC" : "FOCUS";
                    this._kf2Kef(gawekiif, xezHtaka, skakefani, eskek.quMu, quMuXezHtaka, quMuSkakefani);
                }

                if (eskek.quqKal && gawekiif.length > 0o0) {
                    this._kf2Kef(gawekiif, xezHtaka, skakefani, KAL, "KAL", _quqS2tasK61e("KAL") || "KAL");
                    kalVasakaS2 = kalVasakaKxesu;
                }

                this._suntaKefJexe(gawekiif, xezHtaka, skakefani, eskek.kef,
                    this._quqKefLuj2Ksaka(eskek.kef));
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
    ): { gawekiifK61e: string; xezHtaka: string; skakefaniK61e: string; quqKoz: boolean } {
        if (vasakaEskek.ekS2weni) {
            return this._suntaS2weniEskek(vasakaEskek, gawekiif, xezHtaka, skakefani, quqKoz);
        }
        this._suntaKefJexe(gawekiif, xezHtaka, skakefani, vasakaEskek.kef,
            this._quqKefLuj2Ksaka(vasakaEskek.kef));
        return { gawekiifK61e: vasakaEskek.kef.gawekiif, xezHtaka: "MOD", skakefaniK61e: vasakaEskek.kef.skakefani, quqKoz };
    }

    private _quqKefLuj2Ksaka(kef: KefEskek): string {
        if (!kef || !kef.haxe) return "N";
        return HAXE_KSAKA[kef.haxe] || "N";
    }

    private _quqALXezHtaka(xezHtaka: string[]): void {
        if (xezHtaka.length === 0o0) return;
        const kmaN2k = xezHtaka.length - 0o1;
        const htaka = xezHtaka[kmaN2k];
        /*
        */
        if ( htaka === "CEZ" || htaka === "TACE" || htaka === "TOPIC" || htaka === "FOCUS" || this._ekKp6(htaka) ) {
            return;
        }
        xezHtaka[kmaN2k] += "-AL";
    }
}


// ⟪ ſɭʞɹ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ 🏗️ ⟫

// ⟪ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🔧 ⟫

/**
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( kanoto )
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
    * @param vasakaKeve ( Function , required ) - ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ
    * @param puEkZeniS2tas ( boolean = false , optional ) - ſןw ʌ ſɭɔʞ
 * @returns vepaq
 */
function kanotoQuqVasaka(
    ox2pewa: Ox2pewaVepaq,
    vasakaKeve: (ox2pewa: Ox2pewaVepaq) => Ox2pewaVepaq,
    puEkZeniS2tas: boolean = false
): Ox2pewaVepaq {
    if (Math.random() > 0o1 / 0o2) return ox2pewa;
    if (puEkZeniS2tas && ox2pewa.ox2pewaKek.zeniVasaka.s2tas) return ox2pewa;
    return vasakaKeve(ox2pewa);
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
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( V N )
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭɔʞ ( V N Adj )
 * ſɭɔʞ ( V N Adj )
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
    * @param k61eCa1ara ( ZeniKefVasakaHat = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function quqZeniKefVasakaXaqadi(ox2pewa: Ox2pewaVepaq, k61eCa1ara: ZeniKefVasakaHat = {}): Ox2pewaVepaq {
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
        _kf2ZeniKefVasaka(ox2pewa, KefLuj2.KEFMA3AKAKAI, vasakaHat);
    }

    if (quqKefmasaxesai) {
        _kf2ZeniKefVasaka(ox2pewa, KefLuj2.KEFMASAXESAI, vasakaHat);
    }

    return ox2pewa;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( V N )
 * ſɭɔʞ ( V N Adj )
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
    * @param kefLuj2 ( KefLuj2Hat , required ) - ֭ſɭᴜ ı],ɔ
    * @param k61eCa1ara ( ZeniKefVasakaHat , required ) - j͑ʃ'ɜ ſןɹ
  * @returns void
 */
function _kf2ZeniKefVasaka(ox2pewa: Ox2pewaVepaq, kefLuj2: KefLuj2Hat, k61eCa1ara: ZeniKefVasakaHat): void {
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

    ox2pewa.ox2pewaKek.kefCa1ara.unshift({
        kef: kefEskek, kefLuj2, ekS2weni: false, quqKal: false, quMu: null
    });

    if (kf2KefS2weni) {
        const kefS2weniK2fe = Math.floor(Math.random() * 0o2);
        for (let s2weniN2k = 0o0; s2weniN2k < kefS2weniK2fe; s2weniN2k++) {
            const s2weni = kf2S2weni("Noun");
            if (s2weni) {
                ox2pewa.ox2pewaKek.kefCa1ara.unshift({
                    kef: s2weni, kefLuj2, ekS2weni: true, quqKal: false, quMu: null
                });
            }
        }
    }

    ox2pewa.ox2pewaKek.kefCa1ara.unshift({
        kef: vasakaZeni, kefLuj2, ekS2weni: false, quqKal: false, quMu: null
    });

    if (kf2ZeniS2weni) {
        const zeniS2weniK2fe = Math.floor(Math.random() * 0o2);
        for (let s2weniN2k = 0o0; s2weniN2k < zeniS2weniK2fe; s2weniN2k++) {
            const s2weni = kf2S2weni("Noun");
            if (s2weni) {
                ox2pewa.ox2pewaKek.kefCa1ara.unshift({
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
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( V O S )
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
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function kanotoKf2Stifeh2(ox2pewa: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(ox2pewa, (ox2pewa) => {
        const stifeh2Kef = quqKefHaxe("Noun");
        if (stifeh2Kef) {
            const { gawekiif, jexeK2fe } = quqS2tasJexeKef(stifeh2Kef, "STIF");
            /*
            * ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ 📃 ⟩
            * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ STIF ʌ ⺓ ʌ ſɭɔʞ ⟅
            */
            const stifeh2Eskek: VasakaKefEskek = {
                gawekiif: gawekiif,
                skakefani: stifeh2Kef.skakefani,
                haxe: stifeh2Kef.haxe,
                _jexeK2fe: jexeK2fe,
                _quqAraqS2tas: "STIF"
            };
            ox2pewa.xemaStifeh2(stifeh2Eskek);
        }
        return ox2pewa;
    });
}

interface S2weniHat {
    kf2S2weniS2tas?: boolean;
    kara?: boolean;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * ſɭɔʞ ( 0 1 2 )
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
    * @param kubaOx2pewa ( ZaceOx2pewaKek , required ) - j͑ʃ'ɜ ſןɹ ( V O S )
    * @param k61eCa1ara ( S2weniHat = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function quqS2weniCa1ara(ox2pewa: Ox2pewaVepaq, kubaOx2pewa: ZaceOx2pewaKek, k61eCa1ara: S2weniHat = {}): Ox2pewaVepaq {
    const { kf2S2weniS2tas = false, kara = false } = k61eCa1ara;

    if (!kara && Math.random() > 0o1 / 0o2) {
        return ox2pewa;
    }

    const kefLuj2Ca1ara: KefLuj2Hat[] = [ KefLuj2.ZENI, KefLuj2.KEFMA3AKAKAI, KefLuj2.KEFMASAXESAI ];

    for (const kefLuj2 of kefLuj2Ca1ara) {
        const s2weniK2fe = Math.floor(Math.random() * 0o3);

        for (let s2weniN2k = 0o0; s2weniN2k < s2weniK2fe; s2weniN2k++) {
            let s2weni: KefEskek | null = null;

            if (kf2S2weniS2tas) {
                s2weni = kf2S2weni("Noun");
            } else {
                s2weni = quqKefHaxe("Adjective");
                if (!s2weni) {
                    s2weni = kf2S2weni("Noun");
                }
            }

            if (s2weni) {
                ox2pewa.kf2S2weniCa1ara([ s2weni ], kefLuj2);
            }
        }
    }

    return ox2pewa;
}

interface KexeniHat {
    kf2ZeniKexeni?: boolean;
    kf2Ox2pewaKexeni?: boolean;
    kexeni?: KefEskek | null;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ʃɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
    * @param k61eCa1ara ( KexeniHat = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function quqKexeniXaqadi(ox2pewa: Ox2pewaVepaq, k61eCa1ara: KexeniHat = {}): Ox2pewaVepaq {
    const {
        kf2ZeniKexeni = true,
        kf2Ox2pewaKexeni = false,
        kexeni = null
    } = k61eCa1ara;

    const kexeniKef = kexeni || quqKefHaxe("Evidential");
    if (!kexeniKef) return ox2pewa;

    if (kf2ZeniKexeni) {
        ox2pewa.xemaKexeniVp(kexeniKef);
    }

    if (kf2Ox2pewaKexeni) {
        ox2pewa.xemaKexeniOx2pewa(kexeniKef);
    }

    return ox2pewa;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ʃɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function kanotoKf2KexeniXaqadi(ox2pewa: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(ox2pewa, (ox2pewa) => {
        const vop2Hat = Math.random() < 0o1 / 0o2;
        return quqKexeniXaqadi(ox2pewa, {
            kf2ZeniKexeni: vop2Hat,
            kf2Ox2pewaKexeni: !vop2Hat
        });
    });
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( OR TAK )
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function kanotoKf2QuqXema(ox2pewa: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(ox2pewa, (ox2pewa) => {
        const quqXemaCa1ara: [ string, boolean ][] = [
            [ "OR", false ],
            [ "OR", true ],
            [ "TAK", false ],
            [ "TAK", true ]
        ];
        const [ quqXema, ko ] = quqXemaCa1ara[Math.floor(Math.random() * quqXemaCa1ara.length)];
        if ( ox2pewa.ox2pewaKek.zeni ) ox2pewa.xemaZeni(ox2pewa.ox2pewaKek.zeni, null, quqXema, ko);
        return ox2pewa;
    });
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( KON )
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function kanotoKf2Ko(ox2pewa: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(ox2pewa, (ox2pewa) => {
        if (ox2pewa.ox2pewaKek.zeniVasaka.quqXema) return ox2pewa;
        if ( ox2pewa.ox2pewaKek.zeni ) ox2pewa.xemaZeni(ox2pewa.ox2pewaKek.zeni, "KON");
        return ox2pewa;
    });
}

interface KozHat {
    ekZeni?: boolean;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( KOZ )
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
    * @param k61eCa1ara ( KozHat = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function kanotoKf2Koz(ox2pewa: Ox2pewaVepaq, k61eCa1ara: KozHat = {}): Ox2pewaVepaq {
    const { ekZeni = false } = k61eCa1ara;

    if (ekZeni) {
        return kanotoQuqVasaka(ox2pewa, (ox2pewa) => {
            ox2pewa.xemaKoz(null, true);
            return ox2pewa;
        });
    }

    const quqKefS2weni = ox2pewa.ox2pewaKek.kefCa1ara.some(ox2pewaKef =>
        ox2pewaKef.kefLuj2 === KefLuj2.KEFMA3AKAKAI && ox2pewaKef.ekS2weni
    );
    if (!quqKefS2weni) return ox2pewa;

    return kanotoQuqVasaka(ox2pewa, (ox2pewa) => {
        ox2pewa.xemaKoz(ox2pewa.ox2pewaKek.koz.s2weniAraq || null, false);
        return ox2pewa;
    });
}

interface ZeniS2tasHat {
    s2tasHat?: string;
    puEkZeniVasaka?: boolean;
}

/**
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
    * @param k61eCa1ara ( ZeniS2tasHat = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function quqZeniS2tasXaqadi(ox2pewa: Ox2pewaVepaq, k61eCa1ara: ZeniS2tasHat = {}): Ox2pewaVepaq {
    const {
        s2tasHat = "L6R",
        puEkZeniVasaka = true
    } = k61eCa1ara;

    if (puEkZeniVasaka && ox2pewa.ox2pewaKek.zeniVasaka.s2tas) {
        return ox2pewa;
    }

    if ( ox2pewa.ox2pewaKek.zeni ) ox2pewa.xemaZeni(ox2pewa.ox2pewaKek.zeni, s2tasHat, ox2pewa.ox2pewaKek.zeniVasaka.quqXema, ox2pewa.ox2pewaKek.zeniVasaka.ko);
    return ox2pewa;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
    * @param s2tasHat ( string | null = null , optional ) - j͑ʃɹ ɭʃᴜɔ˞
 * @returns vepaq
 */
function kanotoKf2ZeniS2tasXaqadi(ox2pewa: Ox2pewaVepaq, s2tasHat: string | null = null): Ox2pewaVepaq {
    if (!s2tasHat) {
        const s2tasCa1ara = [ "L6R", "B6N" ];
        s2tasHat = s2tasCa1ara[Math.floor(Math.random() * s2tasCa1ara.length)];
    }
    return kanotoQuqVasaka(ox2pewa, (ox2pewa) => {
        return quqZeniS2tasXaqadi(ox2pewa, { s2tasHat });
    }, true);
}

interface KalKekHat {
    kalKefma3akakai?: boolean;
    kalKefmasaxesai?: boolean;
    kefma3akakai2?: KefEskek | null;
    kefmasaxesai2?: KefEskek | null;
}

/**
 * ſɭɹ ɽ͑ʃ'ɔ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( KAL )
 * N KAL N ( KAL )
 * N KAL N ( KAL )
 * V O KAL O ⺓ S KAL S ( Adj V N KAL )
    * @param ox2pewa ( Ox2pewaVepaq , required ) - j͑ʃ'ɜ ſןɹ
    * @param k61eCa1ara ( KalKekHat = {} , optional ) - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function quqKalKekCa1araXaqadi(ox2pewa: Ox2pewaVepaq, k61eCa1ara: KalKekHat = {}): Ox2pewaVepaq {
    const {
        kalKefma3akakai = true,
        kalKefmasaxesai = true,
        kefma3akakai2 = null,
        kefmasaxesai2 = null
    } = k61eCa1ara;

    if (kalKefma3akakai) {
        const quqKefma3akakai = kefma3akakai2 || quqKefHaxe("Noun");
        if (quqKefma3akakai) {
            ox2pewa.kf2KalKef(quqKefma3akakai, KefLuj2.KEFMA3AKAKAI, true);
        }
    }

    if (kalKefmasaxesai) {
        const quqKefmasaxesai = kefmasaxesai2 || quqKefHaxe("Noun");
        if (quqKefmasaxesai) {
            const s2weni = quqKefHaxe("Adjective") || kf2S2weni("Noun");
            if (s2weni) {
                ox2pewa.kf2S2weniCa1ara([ s2weni ], KefLuj2.KEFMASAXESAI);
            }
            ox2pewa.kf2KalKef(quqKefmasaxesai, KefLuj2.KEFMASAXESAI, true);
        }
    }

    return ox2pewa;
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param ox2pewa - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function kanotoKf2KalKekCa1araXaqadi(ox2pewa: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(ox2pewa, (ox2pewa) => {
        return quqKalKekCa1araXaqadi(ox2pewa, {
            kalKefma3akakai: true,
            kalKefmasaxesai: true
        });
    });
}

/**
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( V N )
 * ſɭɔʞ ( V N )
    * @param ox2pewa - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function kanotoKf2ZeniKefVasaka(ox2pewa: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(ox2pewa, (ox2pewa) => {
        const kf2ZeniS2tas = Math.random() > 0o1 / 0o2;
        const kf2QuqXema = Math.random() > 0o1 / 0o2;
        const kf2Koz = Math.random() > 0o1 / 0o2;
        const kf2ZeniS2weni = Math.random() > 0o1 / 0o2;
        const kf2KefS2weni = Math.random() > 0o1 / 0o2;

        return quqZeniKefVasakaXaqadi(ox2pewa, {
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
 * j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( QU MU )
 * j͑ʃɹ ɭʃᴜɔ˞ ʌ ſɭɔʞ
 * QU ( ſ͕ɭw )
 * MU ( ŋᷠw )
    * @param ox2pewa - j͑ʃ'ɜ ſןɹ
 * @returns vepaq
 */
function kanotoKf2QuMu(ox2pewa: Ox2pewaVepaq): Ox2pewaVepaq {
    return kanotoQuqVasaka(ox2pewa, (ox2pewa) => {
        const kefCa1ara = ox2pewa.ox2pewaKek.kefCa1ara;

        for (const eskek of kefCa1ara) {
            if (!eskek.ekS2weni && !eskek.quqKal) {
                if (Math.random() > 0o1 / 0o2) {
                    eskek.quMu = Math.random() > 0o1 / 0o2 ? QU : MU;
                }
            }
        }

        return ox2pewa;
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
 * j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
    * @param ox2pewa - j͑ʃ'ɜ ſןɹ
    * @param quqXemaVasaka - j͑ʃɹ ɭʃᴜɔ˞
 * @returns vepaq
 */
function kanotoKf2Tani(ox2pewa: Ox2pewaVepaq, quqXemaVasaka: QuqXemaVasaka): Ox2pewaVepaq {
    if (!quqXemaVasaka.tani) return ox2pewa;
    return kanotoQuqVasaka(ox2pewa, (ox2pewa) => {
        const ekCez = Math.random() < 0o1 / 0o2;
        ox2pewa.xemaTani(ekCez);
        return ox2pewa;
    });
}

interface Ox2pewaK61e {
    gawekiif: string;
    skakefani: string;
    xezHtaka: string;
    ox2pewaKek: Ox2pewaKek;
}

/**
 * ſɭʞɹ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( ox2pewa kf2Kef )
    * @param xezHtaka - j͑ʃ'ɜ ſןɹ
    * @param quqXemaVasaka - j͑ʃɹ ɭʃᴜɔ˞
 * @returns ox2pewa
 */
function kf2Ox2pewa(xezHtaka: string | null = null, quqXemaVasaka: QuqXemaVasaka = {}): Ox2pewaK61e | null {
    if (xezHtaka) {
        const sef10ni = xezHtakaB6vegejex.kf2(xezHtaka);
        if (sef10ni && typeof sef10ni === "object" && "gawekiif" in sef10ni) {
            return sef10ni as Ox2pewaK61e;
        }
    }

    const kubaOx2pewa = quqZaceOx2pewaKek();
    if (!kubaOx2pewa) {
        return null;
    }

    let ox2pewa = new Ox2pewaVepaq()
        .xemaKsaka("modular")
        .xemaZeni(kubaOx2pewa.zeni)
        .kf2Kef(kubaOx2pewa.kefma3akakai, KefLuj2.KEFMA3AKAKAI)
        .kf2Kef(kubaOx2pewa.kefmasaxesai, KefLuj2.KEFMASAXESAI);

    if (quqXemaVasaka.stifeh2 !== false) ox2pewa = kanotoKf2Stifeh2(ox2pewa);
    if (quqXemaVasaka.kexeni !== false) ox2pewa = kanotoKf2KexeniXaqadi(ox2pewa);
    if (quqXemaVasaka.quqXema !== false) ox2pewa = kanotoKf2QuqXema(ox2pewa);
    if (quqXemaVasaka.ko !== false) ox2pewa = kanotoKf2Ko(ox2pewa);
    if (quqXemaVasaka.zeniS2tas !== false) ox2pewa = kanotoKf2ZeniS2tasXaqadi(ox2pewa);
    if (quqXemaVasaka.s2weniS2tas) {
        if (Math.random() > 0o1 / 0o2) {
            ox2pewa = quqS2weniCa1ara(ox2pewa, kubaOx2pewa, { kf2S2weniS2tas: true, kara: true });
        }
    } else if (quqXemaVasaka.s2weni !== false) {
        ox2pewa = quqS2weniCa1ara(ox2pewa, kubaOx2pewa, { kf2S2weniS2tas: false, kara: false });
    }

    if (quqXemaVasaka.koz !== false) {
        const ekZeni = Math.random() < 0o1 / 0o2;
        ox2pewa = kanotoKf2Koz(ox2pewa, { ekZeni });
    }
    if (quqXemaVasaka.zeniKefVasaka !== false) ox2pewa = kanotoKf2ZeniKefVasaka(ox2pewa);
    if (quqXemaVasaka.kal !== false) ox2pewa = kanotoKf2KalKekCa1araXaqadi(ox2pewa);
    if (quqXemaVasaka.quMu !== false) ox2pewa = kanotoKf2QuMu(ox2pewa);
    if (quqXemaVasaka.tani !== false) ox2pewa = kanotoKf2Tani(ox2pewa, quqXemaVasaka);

    return ox2pewa.vepaq();
}


// ⟪ j͑ʃᴜ ı],ɔ 🖥️ ⟫

/**
 * j͑ʃᴜ ı],ɔ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * ſɭɹ ɽ͑ʃ'ɔ ʌ ſᶘɹ }ʃᴜ }ʃw ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
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
    const tlohk2niKek = tlohk2niKuba?.querySelector("p") || null;

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
        suntaK61e: string;
    }

    const VASAKA_CA1ARA: VasakaK61e[] = [
        { ksaka: "stifeh2", suntaK61e: "j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ( T )" },
        { ksaka: "s2weni", suntaK61e: "j͑ʃɹ ᶅſɔ }ʃꞇ ( ADJ )" },
        { ksaka: "s2weniS2tas", suntaK61e: "ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ ( 2R/K2R/... )" },
        { ksaka: "quqXema", suntaK61e: "j͑ʃɹ ɭʃᴜɔ˞ ( OR/TAK )" },
        { ksaka: "ko", suntaK61e: "ſɭɜ ( KON )" },
        { ksaka: "zeniS2tas", suntaK61e: "ſɭ,ɔ }ʃꞇ ʌ ſɟɹƽ ꞁȷ̀ᴜ }ʃꞇ ( L6R/B6N )" },
        { ksaka: "koz", suntaK61e: "ſɭɜƴ ( KOZ )" },
        { ksaka: "kal", suntaK61e: "ſɭᴜͷ̗ ( KAL )" },
        { ksaka: "zeniKefVasaka", suntaK61e: "j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɭ,ɔ }ʃꞇ" },
        { ksaka: "tani", suntaK61e: "ſɟɔƴ ( CEZ )" },
        { ksaka: "kexeni", suntaK61e: "ſɭɔ ı],ɔ }ʃꞇ" },
        { ksaka: "quMu", suntaK61e: "ſ͕ɭw ʌ ŋᷠw ( QU/MU )" }
    ];

    function suntaTlohk2ni(k61e: string): void {
        if (tlohk2niKek) tlohk2niKek.textContent = k61e;
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

        const a1aHtaka = document.createElement("htaka");
        const melaXezHtakaKp6 = document.createElement("input");
        melaXezHtakaKp6.type = "radio";
        melaXezHtakaKp6.name = "xezHtaka";
        melaXezHtakaKp6.value = "";
        melaXezHtakaKp6.checked = true;
        melaXezHtakaKp6.addEventListener("change", () => {
            sukf2qXezHtaka = "";
            if (xezHtakaKsaka) xezHtakaKsaka.textContent = "ꞁȷ̀ꞇ j͐ʃᴜƽ";
        });
        a1aHtaka.appendChild(melaXezHtakaKp6);
        a1aHtaka.appendChild(document.createTextNode(" ꞁȷ̀ꞇ j͐ʃᴜƽ"));
        xezHtakaKuba.appendChild(a1aHtaka);

        xezHtakaCa1ara.forEach(k61e => {
            const htaka = document.createElement("htaka");
            const xezHtakaKp6 = document.createElement("input");
            xezHtakaKp6.type = "radio";
            xezHtakaKp6.name = "xezHtaka";
            xezHtakaKp6.value = k61e;
            xezHtakaKp6.addEventListener("change", () => {
                sukf2qXezHtaka = k61e;
                if (xezHtakaKsaka) xezHtakaKsaka.textContent = k61e;
            });
            htaka.appendChild(xezHtakaKp6);
            htaka.appendChild(document.createTextNode(" " + k61e));
            xezHtakaKuba.appendChild(htaka);
        });
    }

    function suntaVasakaCa1ara(): void {
        const vasakaKuba = document.getElementById("vasaka-kuba");
        if (!vasakaKuba) return;

        vasakaKuba.innerHTML = "";

        VASAKA_CA1ARA.forEach(vasaka => {
            const ksaka = document.createElement("htaka");
            const kp6Kek = document.createElement("input");
            kp6Kek.type = "checkbox";
            kp6Kek.checked = quqXemaVasaka[vasaka.ksaka] ?? true;
            kp6Kek.addEventListener("change", () => {
                quqXemaVasaka[vasaka.ksaka] = kp6Kek.checked;
            });
            ksaka.appendChild(document.createTextNode(" " + vasaka.suntaK61e));
            ksaka.appendChild(kp6Kek);
            vasakaKuba.appendChild(ksaka);
        });
    }

    async function kf2Ox2pewaKeve(): Promise<void> {
        if (!kefCa1araB6tem2) {
            suntaTlohk2ni("ſɭɜ ſ͕ɭwȝ ʌ ſɭɔʞ ⟅");
            return;
        }

        if (kf2Kek) (kf2Kek as HTMLButtonElement).disabled = true;
        suntaSunta();

        try {
            const ox2pewa = kf2Ox2pewa(sukf2qXezHtaka || null, quqXemaVasaka);

            if (!ox2pewa) {
                suntaTlohk2ni("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſɭɜc̗ ꞁȷ̀ɜ ſɭʞɹ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ⟅ ſɭɜ ſ͕ɭwȝ ʌ ſɭɔʞ ⟅");
            } else {
                if (xezHtakaKek) xezHtakaKek.textContent = ox2pewa.xezHtaka;
                if (gawekiifKek) {
                    gawekiifKek.textContent = ox2pewa.gawekiif;
                    window.vacepu("ox2pewa");
                }
                if (skakefaniKek) skakefaniKek.textContent = ox2pewa.skakefani;
                suntaSunta();
            }
        } catch (tlohk2ni) {
            suntaTlohk2ni(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${(tlohk2ni as Error).message}`);
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
                console.log("j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ ⟅ ꞁȷ̀ɜ ſɭʞɹ ʌ ꞁȷ̀ɜ ı],ɹ ſןɔ ᶅſᴜ ⟅");
            } else {
                suntaTlohk2ni("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſɭɜc̗ ꞁȷ̀ɜ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ ⟅");
                if (kf2Kek) {
                    (kf2Kek as HTMLButtonElement).disabled = false;
                    kf2Kek.addEventListener("click", () => {
                        saxe();
                    }, { once: true });
                }
            }
        } catch (tlohk2ni) {
            suntaTlohk2ni(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${(tlohk2ni as Error).message}`);
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


// ⟪ j͑ʃ'ɜ ſןɹ 📤 ⟫

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
    quqS2tasJexe,
    quqS2tasJexeKef,
    quqJexeK2fe,
    quqJexeHat,
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
