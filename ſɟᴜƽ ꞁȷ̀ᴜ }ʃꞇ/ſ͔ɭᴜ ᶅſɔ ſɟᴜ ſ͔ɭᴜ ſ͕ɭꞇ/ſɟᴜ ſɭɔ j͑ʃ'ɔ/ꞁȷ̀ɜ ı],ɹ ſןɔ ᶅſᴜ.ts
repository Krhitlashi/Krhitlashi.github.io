import * as XLSX from "xlsx";

// ≺⧼ Iikrhia Hazarda Frazgenerilo 🌐 ⧽≻
/**
 * បង្កើតឃ្លាមានចង្វេកតាមវេទ្យាប័យីរហា Iikrhia។
 * - ពាក្យរាប់ VOS ( ការ-វត្ថ-ប្រព័ន្ធ ) ចោលដោយត្រាំង។
 * - ការប្រើប្រាក់ បុព្យបញ្ជា និងស្លាក់បៃឲ្យបានត្រឹមត្រូវ
 * - ប្រើពាក្យមាត្រកម្មការងារស្វែងរកពាក្យ
 *
 * ទម្រង់ឃ្លា គឺជា ( Tempo ) V ( Evi ) O ( ⺓ ( Evi ) ( Adj ) S )
 */

// ⟪ ថេរស្មែក 📦 ⟫

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

// ⟪ ប្រភេទប្រកប្រកប 🔧 ⟫

const ADJEKTIVIGAJ_PREFIKSOJ: Record<string, [ string, string ]> = {
    "2R": [ "ꞁȷ̀ɹƣ̋", "ꞁȷ̀ɹ" ],
    "K2R": [ "ſɭɹƣ̋", "ſɭɹ" ],
    "J6R": [ "ɭl̀эƣ̋", "ɭl̀э" ],
    "H2R": [ "֭ſɭɹƣ̋", "֭ſɭɹ" ],
    "SAR": [ "j͑ʃᴜƣ̋", "j͑ʃᴜ" ],
    "SWER": [ "j͑ʃп́ɔƣ̋", "j͑ʃп́ɔ" ],
    "SER": [ "j͑ʃɔƣ̋", "j͑ʃɔ" ],
};

const MODALECAJ_PREFIKSOJ: Record<string, [ string, string ]> = {
    "OR": [ "ꞁȷ̀ɜƣ̋", "ꞁȷ̀ɜ" ],
    "YOR": [ "ſ͕ȷɜƣ̋", "ſ͕ȷɜ" ],
    "TAK": [ "ɭʃᴜƽ", "ɭʃᴜ" ],
    "KOTAK": [ "ſɭɜ ɭʃᴜƽ", "ſɭɜ ɭʃᴜ" ]
};

const GENERALAJ_NEGACIAJ_PREFIKSOJ: Record<string, [ string, string ]> = {
    "KON": [ "ſɭɜc̗", "ſɭɜ" ],
};

const DERIVACIAJ_PREFIKSOJ: Record<string, [ string, string ]> = {
    "VER": [ "j͑ʃ'ɔƣ̋", "j͑ʃ'ɔ" ],
    "VES": [ "j͑ʃ'ɔɔ˞", "j͑ʃ'ᴜ" ],
    "B6N": [ "ʃэc̗", "ʃэ" ],
    "L6R": [ "j͐ʃэƣ̋", "j͐ʃэ" ],
};

const PREFIKSAJ_AFIKSOJ: Record<string, [ string, string ]> = {
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

const SUFIKSAJ_AFIKSOJ: Record<string, [ string, string ]> = {
    "SU": [ "j͑ʃᴜꞇ", "ꞁȷ̀ᴜꞇ" ],
    "AL": [ "j͐ʃ", "ꞁȷ̀ᴜͷ̗" ],
    "ANI": [ "}ʃꞇ", "ꞁȷ̀ᴜ }ʃꞇ" ],
    "ANU": [ "}ʃw", "ꞁȷ̀ᴜ }ʃw" ],
    "KOZ": [ "ſɭɜƴ", "ꞁȷ̀ɜƴ" ],
    "STIF": [ "j͑ʃƨꞇʞ", "ɭʃꞇʞ" ],
};

// ⟨ ភាសាប្រកប្រកប 🔤 ⟩

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


// ⟪ កំណត់ត្រាផ្សូរ និង ការ្រោះគណនា 📚 ⟫

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


// ⟪ ឧបករណ៍ជំរើសសំឡេង 🔤 ⟫

/**
 * ត្រួតពិនិត្យថា ពាក្យចាប់ផ្ដើមដោយស៊ី ឬអត់។
 *     @param vorto ( string , required ) - ពាក្យសម្រាប់ការត្រួតពិនិត្យ។
  *  @returns jesne
 * */
function cxuVokalaKomenco(vorto: string): boolean {
    if ( !vorto || !vorto.trim() ) {
        return false;
    }
    const stripped = vorto.trim();
    if ( stripped.startsWith("ꞁȷ̀") ) {
        return true;
    }
    return IIKRHIAJ_VOKALOJ.includes(stripped[0o0]);
}

/**
 * ត្រួតពិនិត្យថា ពាក្យបញ្ចប់ដោយសំឡេងស៊ី ឬអត់។
 *     @param vorto ( string , required ) - ពាក្យសម្រាប់ការត្រួតពិនិត្យ។
  *  @returns jesne
 * */
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
    return IIKRHIAJ_VOKALOJ.includes(stripped[stripped.length - 0o1]);
}


// ⟪ កែចំទាក់ត្រា 🔧 ⟫

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
 * អនុវត្តម៉ូដ្ឋីទៅទាក់ត្រា ( ប្រភេទប្រកប្រកប , គ្រាប់មនុស្ស , ពង្រឹក្រឹមក )។
 * មុខងងឹតត្រូវបានបង្កើតសម្រាប់ទាក់ត្រាចម្បង និងទាក់ត្រា VN ទាំងពីរ។
 * ប្រភេទបុព្យបញ្ជាមិនអាច ( YOR, KOTAK ) មិនអាចធ្វើក្នុងពេលឯកជាមួយប្រភេទបុព្យបញ្ជាវិជីមិនជាទូទៅរបស់ខ្លួន ( OR, TAK )។
    * @param verbo ( VortEniro , required ) - ទាក់ត្រាបញ្ចូលដែលមាន gawekiif និងការបកប្ប័យ។
    * @param opcioj ( VerbModifiloOpcioj = {} , optional ) - ជម្រើសកែចំ។
 * @returns vorto
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
        const modalities: [ string, boolean ][] = [ [ "can", false ], [ "should", false ] ];
        const [ elektitaModaleco, negata ] = modalities[Math.floor(Math.random() * modalities.length)];
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
        const afiksoj = [ "L6R", "B6N" ];
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


// ⟪ ការអនុវត្តប្រភេទប្រកប្រកប 🔧 ⟫

/**
 * អនុវត្តប្រភេទប្រកប្រកបតាមច្បាប់សំឡេង។
 * កំណត់ដោយស្វ័យទស្សន៍ថា ប្រភេទបុព្យបញ្ជា ឬប្រភេទបទប្រភេទតាមប្រភេទប្រកប្រកប។
 * ជ្រើសរើសទម្រង់ស៊ី ឬទម្រង់ពាក្យមុខតាមចំនាក់ពាក្យ។
    * @param vorto ( string , required ) - ពាក្យដែលត្រូវអនុវត្តប្រភេទប្រកប្រកប។
    * @param afiksoTipo ( string , required ) - ប្រភេទនៃប្រភេទប្រកប្រកប ( ឧទាហរណ៍ "OR", "KON", "SU", "AL" )។
 * @returns ĉeno
 */
function aplikiAfikson(vorto: string, afiksoTipo: string): string {
    if ( !vorto ) return vorto;

    if ( PREFIKSAJ_AFIKSOJ[afiksoTipo] ) {
        const [ vowelForm, consonantForm ] = PREFIKSAJ_AFIKSOJ[afiksoTipo];
        const form = cxuVokalaKomenco(vorto) ? vowelForm : consonantForm;
        return `${form} ${vorto}`;
    }

    if ( SUFIKSAJ_AFIKSOJ[afiksoTipo] ) {
        const [ vowelForm, consonantForm ] = SUFIKSAJ_AFIKSOJ[afiksoTipo];
        const form = cxuVokalaFino(vorto) ? vowelForm : consonantForm;
        return `${vorto} ${form}`;
    }

    return vorto;
}

/**
 * ត្រួតពិនិត្យថា ប្រភេទប្រកប្រកបគឺជាប្រភេទធ្វើឱ្យពាក្យជាបន្ទាន្ន ( បម្លែងពាក្យទៅជាបន្ទាន្ន )។
    * @param afiksoTipo ( string , required ) - ប្រភេទនៃប្រភេទប្រកប្រកប។
 * @returns jesne
 */
function cxuAdjektivaAfikso(afiksoTipo: string): boolean {
    return ALL_ADJEKTIVIGAJ_PREFIKSOJ.has(afiksoTipo);
}

/**
 * ត្រួតពិនិត្យថា ពាក្យមានប្រភេទបុព្យបញ្ជាធ្វើឱ្យពាក្យជាបន្ទាន្នឬទេ។
 * ប្រភេទបុព្យបញ្ជាធ្វើឱ្យពាក្យជាបន្ទាន្នប្តូរពាក្យឈ្មោះ និងទាក់ត្រាទៅជាបន្ទាន្ន។
 * L6R ធ្វើឱ្យពាក្យជាបន្ទាន្នតែនៅទាក់ត្រាដែលមិនមែនជាទាក់ត្រា ( សម្រាប់ទាក់ត្រា វាជាការសកម្ម )។
 * ប្រើ akiriL6RUzon() ដើម្បីកំណត់មុខងងឹតរបស់ L6R។
    * @param vorto ( string , required ) - ពាក្យសម្រាប់ការត្រួតពិនិត្យ។
    * @param vortoEniro ( VortEniro | null = null , optional ) - ទាក់ត្រាបញ្ចូលដើម្បីត្រួតពិនិត្យថា L6R មានតួរការសកម្មឬអត់។
 * @returns jesne
 */
function cxuAdjektivaPrefikso(vorto: string, vortoEniro: VortEniro | null = null): boolean {
    if ( !vorto ) return false;

    for ( const prefix of Object.keys(ADJEKTIVIGAJ_PREFIKSOJ) ) {
        const [ vowelForm, consonantForm ] = PREFIKSAJ_AFIKSOJ[prefix];
        if ( vorto.startsWith(vowelForm + " ") || vorto.startsWith(consonantForm + " ") ) {
            return true;
        }
    }

    const l6rUsage = akiriL6RUzon(vorto, vortoEniro);
    return l6rUsage === "adjectivizer";
}

/**
 * ត្រួតពិនិត្យថា ប្រភេទបុព្យបញ្ជា L6R ត្រូវបានប្រើជាការសកម្ម ( លើទាក់ត្រា ) ឬធ្វើឱ្យពាក្យជាបន្ទាន្ន ( លើអ្វីដែលមិនមែនជាទាក់ត្រា )។
    * @param vorto ( string | null , required ) - ពាក្យសម្រាប់ការត្រួតពិនិត្យ។
    * @param vortoEniro ( VortEniro | null , required ) - ទាក់ត្រាបញ្ចូលពីពាក្យមាត្រ។
 * @returns ĉeno
 */
function akiriL6RUzon(vorto: string | null, vortoEniro: VortEniro | null): string {
    if ( !vorto ) return "none";
    const [ l6rVowel, l6rConsonant ] = PREFIKSAJ_AFIKSOJ["L6R"];
    if ( vorto.startsWith(l6rVowel + " ") || vorto.startsWith(l6rConsonant + " ") ) {
        return cxuVerbo(vortoEniro) ? "passive" : "adjectivizer";
    }
    return "none";
}

/**
 * យកប្រភេទបុព្យបញ្ជាធ្វើឱ្យពាក្យជាបន្ទាន្នមួយដែលមានចង្វេក។
 * ជួយប្រគល់ក្រឡប់ចំណុចប្រភេទបុព្យបញ្ជាធ្វើឱ្យពាក្យជាបន្ទាន្នមួយ ( 2R, K2R, J6R, H2R, SAR, SWER, SER )។
 * @returns ĉeno
 */
function akiriHazardanAdjektivanPrefikson(): string {
    const prefixes = Object.keys(ADJEKTIVIGAJ_PREFIKSOJ);
    return prefixes[Math.floor(Math.random() * prefixes.length)];
}

/**
 * អនុវត្តប្រភេទបុព្យបញ្ជាធ្វើឱ្យពាក្យជាបន្ទាន្ន ដោយបម្លែងវាទៅជាបន្ទាន្ន។
 * ប្រភេទបុព្យបញ្ជាធ្វើឱ្យពាក្យជាបន្ទាន្នប្តូរពាក្យឈ្មោះ និងទាក់ត្រាទៅជាបន្ទាន្នដោយមានអត្ថន័យពាក់ព័ន្ធ
 * - 2R. KUN ( មានគុណលក្ខន្ធនៃ )
 * - K2R. UZANTE ( ដោយផ្លូវនៃ )
 * - J6R. EN ( ដែលនៅក្នុង )
 * - H2R. SEN ( ដែលនៅមិនឃើញ )
 * - SAR. POR ( គោល / ប្រយោជន៍ )
 * - SWER. PRI ( ដែលជាកម្មសិទ្ធិនៃ )
 * - SER. DE ( ការកាន់ស្នាល / ទំនាក់ទំនង )
    * @param vortoEniro ( VortEniro , required ) - ទាក់ត្រាបញ្ចូលដែលមាន gawekiif, ការបកប្ប័យ និងក្រុមកម្មភាព។
    * @param prefiksoTipo ( string | null = null , optional ) - ប្រភេទបុព្យបញ្ជាជាក់ស្តែង ឬ null សម្រាប់ការចង្វេក។
 * @returns vorto
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
 * បង្កើតបន្ទាន្នពីពាក្យឈ្មោះ ឬទាក់ត្រាដោយប្រើប្រភេទបុព្យបញ្ជាធ្វើឱ្យពាក្យជាបន្ទាន្ន។
 * ប្រសិនបើគ្មានពាក្យឈ្មោះ ឬទាក់ត្រាទំនេរ ត្រឡប់ null។
    * @param fontoPoŝo ( "Noun" | "Verb" = "Noun" , optional ) - ប្រភពនៃក្រុមកម្មភាព។
    * @param prefiksoTipo ( string | null = null , optional ) - ប្រភេទបុព្យបញ្ជាជាក់ស្តែង ឬ null សម្រាប់ការចង្វេក។
 * @returns vorto
 */
function kreiAdjektivon(fontoPoŝo: "Noun" | "Verb" = "Noun", prefiksoTipo: string | null = null): VortEniro | null {
    const fontoVorto = akiriVortonPerPoŝo(fontoPoŝo);
    if (!fontoVorto) {
        return null;
    }
    return aplikiAdjektivanPrefikson(fontoVorto, prefiksoTipo);
}

/**
 * ត្រួតពិនិត្យថា ពាក្យគឺជាទាក់ត្រា ( សម្រាប់ការកំណត់ចំណនៃ L6R )។
    * @param vortoEniro ( VortEniro | null , required ) - ទាក់ត្រាបញ្ចូលពីពាក្យមាត្រ។
 * @returns jesne
 */
function cxuVerbo(vortoEniro: VortEniro | null): boolean {
    return vortoEniro !== null && vortoEniro.poŝo === "Verb";
}

/**
 * យកប្រភេទបុព្យបញ្ជាគ្រាប់មនុស្សដែលជាទំនាប់សម្រាប់ប្រភេទបុព្យបញ្ជាដែលបានកំណត់។
 * ប្រភេទបុព្យបញ្ជាគ្រាប់មនុស្សមិនអាច ( YOR, KOTAK ) មិនអាចធ្វើក្នុងពេលឯកជាមួយប្រភេទបុព្យបញ្ជាវិជីមិនជាទូទៅរបស់ខ្លួន ( OR, TAK )។
    * @param prefiksoTipo ( string , required ) - ប្រភេទបុព្យបញ្ជាសម្រាប់ការត្រួតពិនិត្យ។
 * @returns rezulto
 */
function akiriKonfliktantanPrefikson(prefiksoTipo: string): string | null {
    return MODALECAJ_PAROJ[prefiksoTipo] || null;
}


// ⟪ ការផ្ទុកពាក្យមាត្រ 📖 ⟫

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

const IIKRHIAJ_INTERPUNKCIOJ = [ "⟅", "｡", "⸙", "ʌ" ];

const _vortaroKaso = new Map<string, VortEniro[]>();

/**
 * យកខ្សែសរសេរ Iikrhia ទាំងអស់សម្រាប់ការរកឃើញសញ្ញា។
 * @returns listo
 */
function akiriCxiujnIikrhiajnSekvencojn(): string[] {
    return [ ...IIKRHIAJ_KOMENCAJ, ...IIKRHIAJ_INTERNAJ, ...IIKRHIAJ_INTERPUNKCIOJ ];
}

/**
 * ត្រួតពិនិត្យថា អត្ថបទមានសញ្ញាសរសេរ Iikrhia ឬអត់។
    * @param teksto ( string , required ) - អត្ថបទសម្រាប់ការត្រួតពិនិត្យ។
 * @returns jesne
 */
function cxuEnhavasIikrhianSkribon(teksto: string): boolean {
    if (!teksto) {
        return false;
    }
    return akiriCxiujnIikrhiajnSekvencojn().some(seq => teksto.includes(seq));
}

/**
 * ជ្រើសរើសផ្នែកបកប្ប័យដែលមិនមានការសរសេរ Iikrhia។
    * @param tradukoPartoj ( string[] , required ) - បញ្ជីជម្រើសបកប្ប័យ។
 * @returns ĉeno
 */
function elektiNeIikrhianTradukon(tradukoPartoj: string[]): string {
    for (const trans of tradukoPartoj) {
        if (!cxuEnhavasIikrhianSkribon(trans)) {
            return trans;
        }
    }
    return tradukoPartoj[0o0] || "";
}

// ⟨ ស្លាក់ POZ - ដូចគ្នានឹងកម្មវិធីដំណើរការទំព័រពាក្យមាត្រ ⟩
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
 * បម្លែកក្រឡប់សន្ទាស៊ីទៅជាខ្សែមួយក្រឡា ដែលបានកាត់។
 *    @param v ( unknown ) - តម្លៃក្រឡប់មូលដ្ឋាន។
 * @returns ĉeno
 */
function ĉeloAlTeksto(v: unknown): string {
    if ( v === null || v === undefined ) return "";
    return String(v).replace(/\r?\n/g, " ").trim();
}

/**
 * កំណត់ប្រភេទដ៏នដោយពិនិត្យប្រភេទកម្មវិធីជាមុន បន្ទាប់មកត្រូវបានរង្កងជាក្រោមប្រភេទកម្មវិធី។
 *    @param temo ( string ) - ក្រឡប់ប្រភេទកម្មវិធី ( ជួនឈរ 0 )។
 *    @param estasSub ( string ) - ក្រឡប់ប្រភេទកម្មវិធីក្រោម ( ជួនឈរ 1 )។
 * @returns ĉeno
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
 * ធ្វើធម្មតាស្លាក់ POZ នៃ KEFHAXE ទៅជាប្រភេទមូលដ្ឋានរបស់ខ្លួន។
 * "Number ( Noun )" → "Noun", "Chemical ( Noun )" → "Noun", "Affix" → "Affix", និងអ្នកផ្សេងៗ។
 * ទាំងនេះស្រួតតាមការដំណើរការបញ្ជាក់ឃ្លា `determinePos()` ដើមរបស់កូដដើម។
 *    @param poŝo ( string ) - ស្លាក់ POZ មូលដ្ឋាន។
 * @returns ĉeno
 */
function normigiPoŝon(poŝo: string): string {
    const match = poŝo.match( /\((\w+)\)$/ );
    if ( match ) return match[0o1];
    return poŝo;
}

/**
 * ផ្ទុក និងវិភាគពាក្យមាត្រ xlsx ដោយជួយប្រគល់ VortEniro[] ដោយផ្ទាល់។
    * @param xlsxVojo ( string | null = null , optional ) - ផ្លូវទៅឯកសារ xlsx។
 * @returns vortaro
 */
async function sxargiVortaron(xlsxVojo: string | null = null): Promise<VortEniro[]> {
    const path = xlsxVojo || VORTARAJ_PATHS[0o0];

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
        const folio = wb.Sheets[wb.SheetNames[0o0]!]!;
        const vicoj = XLSX.utils.sheet_to_json<unknown[]>(folio, {
            header: 0o1,
            defval: "",
            raw: false,
        });
        const eligo: VortEniro[] = [];
        for ( let r = 0o1; r < vicoj.length; r++ ) {
            const vico = vicoj[r];
            if ( !vico ) continue;
            const temo = ĉeloAlTeksto(vico[0o0]);
            const estasSub = ĉeloAlTeksto(vico[0o1]);
            const vortoKruda = ĉeloAlTeksto(vico[0o2]);
            const tradukoKruda = ĉeloAlTeksto(vico[0o3]);
            if ( !vortoKruda ) continue;
            const poŝo = determiniPoŝon(temo, estasSub);
            // ⟨ បំបែកក្រឡប់ពហុពាក្យដោយ "｡" - ដូចគ្នានឹងកម្មវិធីវិភាគ HTML ដើម ⟩
            const vortoj = vortoKruda.split("｡").map(p => p.trim()).filter(p => p);
            const tradukoj = tradukoKruda ? tradukoKruda.split("｡").map(p => p.trim()).filter(p => p) : [];
            for ( const unuVorto of vortoj ) {
                const trans = tradukoj.length > 0o0
                    ? elektiNeIikrhianTradukon(tradukoj)
                    : unuVorto;
                eligo.push({
                    gawekiif: unuVorto,
                    traduko: trans,
                    poŝo: poŝo,
                    vico_indekso: r - 0o1,
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
 * ផ្ទុកពាក្យមាត្រដោយព្យាយាមផ្លូវជាច្រើនតាមលំដាប់។
 * @returns vortaro
 */
async function sxargiVortaronKunFalreto(): Promise<VortEniro[]> {
    for ( const path of VORTARAJ_PATHS ) {
        const vortoj = await sxargiVortaron(path);
        if ( vortoj.length > 0o0 ) {
            console.log("( ſ̀ȷᴜ ſɭɹ ) Successfully loaded dictionary from " + path);
            return vortoj;
        }
    }
    return [];
}

/**
 * ផ្ទុកពាក្យមាត្រដោយស្ងាត់ ( ប្រសិនបើបានផ្ទុកទើបហើយ )។
 * @returns vortaro
 */
function sxargiVortaronSinkrone(): VortEniro[] {
    const firstEntry = _vortaroKaso.values().next();
    return firstEntry.value || [];
}

/**
 * យកពាក្យមួយដែលមានចង្វេកតាម POZ។
    * @param pos ( string , required ) - ស្លាក់ក្រុមកម្មភាព។
 * @returns vorto
 */
function akiriVortonPerPoŝo(pos: string): VortEniro | null {
    const vortoj = sxargiVortaronSinkrone().filter(w => w.poŝo === pos);
    if ( vortoj.length === 0o0 ) return null;
    return vortoj[Math.floor(Math.random() * vortoj.length)];
}


// ⟪ សមាជិកឃ្លា 🧱 ⟫

/**
 * ប្រភេទទីតាំងពាក្យក្នុងក្រសរស្រាយឃ្លា VOS។
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
 * សមាជិកសម្រាប់សាងសង់ឃ្លា។
 * ប្រើបញ្ជីពាក្យដែលត្រូវបានបង្កើត - ពាក្យទាំងអស់ ( រួមមានបន្ទាន្ន ខ្សែ VN និងធាតុផ្សូរជាក់ស្តែង )
 * ត្រូវបានរក្សាទុកជាទាក់ត្រាបញ្ចូលដែលមានព័ត្រនឹងទីតាំង និងព័ត្រនឹងកែចំ។
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
 * ឧបករណ៍ជំរើសដើម្បីយកការបកប្ប័យនៃប្រភេទប្រកប្រកប ដោយត្រឡប់ទៅក្រឡប់ចំណុចកណ្តាលប្រសិនបើមាន។
    * @param klavo ( string , required ) - ក្រឡប់ចំណុចកណ្តាលនៃប្រភេទប្រកប្រកប។
 * @returns rezulto
 */
function _akiriAfiksoTradukon(klavo: string): string | null {
    return AFIKSAJ_TRADUKOJ[klavo] || klavo;
}


// ⟪ កន្សល់ឃ្លា 🔨 ⟫

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
        if (parts.length === 0o0) return parts;
        const lastIdx = parts.length - 0o1;
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

    private _akiriAfiksoTradukojn(modifiers: VerbModifiloj | ModifitaVortEniro | null, isWord: boolean = false): [ string | null, string | null ] {
        if (!modifiers) return [ null, null ];

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

        return [ prefix, suffix ];
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
        const [ verbPrefix, verbSuffix ] = this._akiriAfiksoTradukojn(modifiers);
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

        if (gawekiif.length > 0o0) {
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
        if (!adjectives || adjectives.length === 0o0) return;

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
        if (vortoj.length === 0o0) return;

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

                if (entry.havasKalAntaŭe && gawekiif.length > 0o0) {
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
        if (strukturo.length === 0o0) return;
        const lastIdx = strukturo.length - 0o1;
        const label = strukturo[lastIdx];
        /*
        * ⟨ ស្លាក់ផ្សូរផ្សូរនៃ CEZ និង TACE មិននៅក្នុង SPECALAJ_MARKILOJ ( ដែលរក្សាទុក
        *    ពាក្យ Iikrhia ) ប៉ុន្តែពួកគេត្រូវបោះចោល -AL ដូចជាស្លាក់ប្រព័ន្ធ ⺓ ដូចខាងលើ។ ⟩
        */
        if ( label === "CEZ" || label === "TACE" || this._cxuSpecialaMarkilo(label) ) {
            return;
        }
        strukturo[lastIdx] += "-AL";
    }
}


// ⟪ ម៉ូឌុលបង្កើតឃ្លា 🏗️ ⟫

// ⟪ មុខងងឹតជំរើសសម្រាប់ទម្រង់ទូទៅ 🔧 ⟫

/**
 * ឧបករណ៍ជំរើសទូទៅសម្រាប់ទម្រង់ "eble" - អនុវត្តម៉ូដ្ឋីដោយមានប្រូបរាយ ៥០%។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
    * @param modifierFn ( Function , required ) - មុខងងឹតដែលអនុវត្តម៉ូដ្ឋី។
    * @param saltuSeVerbaAfikso ( boolean = false , optional ) - បោះចោលប្រសិនបើទាក់ត្រាមានគ្រាប់មនុស្ស ឬប្រភេទប្រកប្រកបរួចហើយ។
 * @returns konstruilo
 */
function ebleAplikiModifilon(
    builder: FrazKonstruilo,
    modifierFn: (b: FrazKonstruilo) => FrazKonstruilo,
    saltuSeVerbaAfikso: boolean = false
): FrazKonstruilo {
    if (Math.random() > 0o1 / 0o2) return builder;
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
 * មុខងងឹតកែចំ VN - បញ្ចូលខ្សែ V+N ជាម៉ូដ្ឋីមុនពាក្យឈ្មោះចម្បង។
 * V N ដំណើរការដោយជាបន្ទាន្ន - វាកែចំពាក្យឈ្មោះដែលបន្ទាប់របស់វា។
 * VN គឺជា V និង N - ទាំងពីរអាចមានម៉ូដ្ឋីផ្ទាល់ខ្លួន ( បន្ទាន្ន, ប្រភេទប្រកប្រកប, គ្រាប់មនុស្ស, ពង្រឹក្រឹមក )។
 * ក្រសរស្រាយ៖ ( Adj V ) ( Adj N ) N សម្រាប់ប្រព័ន្ធ/វត្ថប្រង់ដែលមានម៉ូដ្ឋី VN។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
    * @param opcioj ( VNModifiloOpcioj = {} , optional ) - ការកំណត់ជម្រើស។
 * @returns konstruilo
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
 * បញ្ចូលខ្សែកែចំ VN ទៅទីតាំង។
 * VN គឺជា V និង N - ទាំងពីរអាចមានម៉ូដ្ឋីផ្ទាល់ខ្លួន ( បន្ទាន្ន, ប្រភេទប្រកប្រកប, គ្រាប់មនុស្ស )។
 * VN ដំណើរការដោយជាម៉ូដ្ឋី និងមកមុនពាក្យឈ្មោះចម្បងដែលវាកែចំ។
 * ក្រសរស្រាយ៖ ( Adj ) V ( Adj ) N - ដែលខ្សែ VN ទាំងអស់កែចំពាក្យឈ្មោះចម្បងដែលបន្ទាប់របស់វា។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
    * @param pozicio ( VortPozicioTipo , required ) - ទីតាំងពាក្យដែលត្រូវបញ្ចូលទៅវា។
    * @param opcioj ( VNModifiloOpcioj , required ) - ជម្រើសកែចំ។
  * @returns void
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
        const nounAdjCount = Math.floor(Math.random() * 0o2);
        for (let i = 0o0; i < nounAdjCount; i++) {
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
        const verbAdjCount = Math.floor(Math.random() * 0o2);
        for (let i = 0o0; i < verbAdjCount; i++) {
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
 * យកសមាជិកឃ្លាមូលដ្ឋាន ( V, O, S )។
 * @returns bazaKomponanto
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
 * បញ្ចូលក្រ្លោ់ពេលវេលាបានជាជម្រើស។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
 * @returns konstruilo
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
 * បញ្ចូលបន្ទាន្នមានចង្វេកទៅទីតាំងណាមួយជាមួយចំនួនចង្វេក។
 * ទីតាំងនីមួយៗ ( ទាក់ត្រា, វត្ថប្រង់, ប្រព័ន្ធ ) អាចទទួលបន្ទាន្ន ០-២ ដោយចង្វេក។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
    * @param base ( BazajFrazKomponantoj , required ) - សមាជិកមូលដ្ឋាន ( ទាក់ត្រា, វត្ថប្រង់, ប្រព័ន្ធ )។
    * @param opcioj ( AdjektivoOpcioj = {} , optional ) - ការកំណត់ជម្រើស។
 * @returns konstruilo
 */
function aplikiAdjektivojn(builder: FrazKonstruilo, base: BazajFrazKomponantoj, opcioj: AdjektivoOpcioj = {}): FrazKonstruilo {
    const { useAdjectivizer = false, skipRandom = false } = opcioj;

    if (!skipRandom && Math.random() > 0o1 / 0o2) {
        return builder;
    }

    const positions: VortPozicioTipo[] = [ VortPozicio.VERBO, VortPozicio.OBJEKTO, VortPozicio.SUBJEKTO ];

    for (const pos of positions) {
        const adjCount = Math.floor(Math.random() * 0o3);

        for (let i = 0o0; i < adjCount; i++) {
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
                builder.aldoniAdjektivojn([ adj ], pos);
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
 * មុខងងឹតភស្តីនិយមត្រនៃតាមប្រភព - អនុវត្តភស្តីនិយមត្រនៃតាមប្រភពទៅលើ VP ឬវិសល្បនៃឃ្លា។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
    * @param opcioj ( EvidencialoOpcioj = {} , optional ) - ការកំណត់ជម្រើស។
 * @returns konstruilo
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
 * បញ្ចូលភស្តីនិយមត្រនៃតាមប្រភពដែលត្រូវបានបង្កើតទៅលើ VP ឬវិសល្បនៃឃ្លាបានជាជម្រើស។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
 * @returns konstruilo
 */
function ebleAldoniEvidencialonUnue(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        const useVp = Math.random() < 0o1 / 0o2;
        return aplikiEvidencialonUnue(b, {
            addVpEvidential: useVp,
            addSentenceEvidential: !useVp
        });
    });
}

/**
 * បញ្ចូលគ្រាប់មនុស្ស ( can/should ជាមួយការបដិសេធជម្រើស )បានជាជម្រើស។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
 * @returns konstruilo
 */
function ebleAldoniModalecojn(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        const modalities: [ string, boolean ][] = [
            [ "can", false ],
            [ "can", true ],
            [ "should", false ],
            [ "should", true ]
        ];
        const [ modaleco, negata ] = modalities[Math.floor(Math.random() * modalities.length)];
        b.agordiVerbon(b.components.verbo!, null, modaleco, negata);
        return b;
    });
}

/**
 * បញ្ចូលការបដិសេធ ( KON- )បានជាជម្រើស។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
 * @returns konstruilo
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
 * បញ្ចូលពង្រឹក្រឹមកទៅបន្ទាន្នវត្ថប្រង់ ឬទាក់ត្រាបានជាជម្រើស។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
    * @param opcioj ( IntensigiloOpcioj = {} , optional ) - ការកំណត់ជម្រើស។
 * @returns konstruilo
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
 * មុខងងឹតប្រភេទប្រកប្រកបនៃទាក់ត្រាដែលត្រូវបានបង្កើត - អនុវត្តប្រភេទប្រកប្រកបទាក់ត្រា ( ការសកម្ម, ការមិនសកម្ម និងអ្នកផ្សេងៗ )។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
    * @param opcioj ( VerbaAfiksoOpcioj = {} , optional ) - ការកំណត់ជម្រើស។
 * @returns konstruilo
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
 * បញ្ចូលប្រភេទប្រកប្រកបនៃទាក់ត្រាដែលត្រូវបានបង្កើត ( ការសកម្ម, ការមិនសកម្ម និងអ្នកផ្សេងៗ )បានជាជម្រើស។
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
    * @param afiksoTipo ( string | null = null , optional ) - ប្រភេទប្រភេទប្រកប្រកប។
 * @returns konstruilo
 */
function ebleAldoniVerbanAfiksonUnue(builder: FrazKonstruilo, afiksoTipo: string | null = null): FrazKonstruilo {
    if (!afiksoTipo) {
        const afiksoj = [ "L6R", "B6N" ];
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
 * មុខងងឹតធាតុផ្សូរជាក់ស្តែង - បញ្ចូលវត្ថប្រង់ និងប្រព័ន្ធដែលជាក់ស្តែង។
 * សម្រាប់វត្ថប្រង់៖ N KAL N ( អនុញ្ញាតការផ្សូរជាក់ស្តែងងាយ )
 * សម្រាប់ប្រព័ន្ធ៖ N KAL ( ម៉ូដ្ឋី ) N - បន្ទាប់ KAL ត្រូវមានបន្ទាន្ន ឬម៉ូដ្ឋី V N
 * ក្រសរស្រាយ៖ V O₁ KAL O₂ ⺓ S₁ KAL ( Adj / V N ) S₂
    * @param builder ( FrazKonstruilo , required ) - កន្សល់សម្រាប់កែចំ។
    * @param opcioj ( KoordinatajElementojOpcioj = {} , optional ) - ការកំណត់ជម្រើស។
 * @returns konstruilo
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
                builder.aldoniAdjektivojn([ adj ], VortPozicio.SUBJEKTO);
            }
            builder.aldoniKoordinatanVorton(subj2, VortPozicio.SUBJEKTO, true);
        }
    }

    return builder;
}

/**
 * បញ្ចូលធាតុផ្សូរជាក់ស្តែងដែលត្រូវបានបង្កើតទៅលើវត្ថប្រង់ និងប្រព័ន្ធទាំងពីរបានជាជម្រើស។
    * @param builder - កន្សល់សម្រាប់កែចំ។
 * @returns konstruilo
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
 * បញ្ចូលម៉ូដ្ឋី VN ដែលត្រូវបានបង្កើតទៅលើវត្ថប្រង់ និងប្រព័ន្ធទាំងពីរបានជាជម្រើស។
 * សមាជិក VN ( V និង N ) អាចមានម៉ូដ្ឋីផ្ទាល់ខ្លួននីមួយៗ។
    * @param builder - កន្សល់សម្រាប់កែចំ។
 * @returns konstruilo
 */
function ebleAldoniUnuecanVNModifilon(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        const addVerbAffix = Math.random() > 0o1 / 0o2;
        const addModality = Math.random() > 0o1 / 0o2;
        const aldoniIntensigilon = Math.random() > 0o1 / 0o2;
        const addVerbAdjectives = Math.random() > 0o1 / 0o2;
        const addNounAdjectives = Math.random() > 0o1 / 0o2;

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
 * បញ្ចូលស្លាក់ផ្សូរផ្សូរ ( QU / MU ) ទៅវត្ថប្រង់ និង ឬប្រព័ន្ធបានជាជម្រើស។
 * ស្លាក់ផ្សូរផ្សូរបង្ហាញមុនពាក្យឈ្មោះដែលពួកគេកែចំ។
 * QU = ĈI TIO / TOMO ( សម្គាល់ប្រធានបទនៃការជជែក )
 * MU = TIO / FOKUSO ( សម្គាល់ព័ត្រនឹងតំណាប់ការ ឬការប្រៀបធៀប )
    * @param builder - កន្សល់សម្រាប់កែចំ។
 * @returns konstruilo
 */
function ebleAldoniTemajnMarkilojn(builder: FrazKonstruilo): FrazKonstruilo {
    return ebleAplikiModifilon(builder, (b) => {
        const vortoj = b.components.vortoj;

        for (const entry of vortoj) {
            if (!entry.cxuAdjektivo && !entry.havasKalAntaŭe) {
                if (Math.random() > 0o1 / 0o2) {
                    entry.temaMarkilo = Math.random() > 0o1 / 0o2 ? QU : MU;
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
 * បម្លែងទៅជាសំណួរបានជាជម្រើស។
    * @param builder - កន្សល់សម្រាប់កែចំ។
    * @param ebligitajModifiloj - ម៉ូដ្ឋីណាដែលត្រូវបានអនុញ្ញាត។
 * @returns konstruilo
 */
function ebleAldoniDemandon(builder: FrazKonstruilo, ebligitajModifiloj: EbligitajModifiloj): FrazKonstruilo {
    if (!ebligitajModifiloj.question) return builder;
    return ebleAplikiModifilon(builder, (b) => {
        const cxuJesNe = Math.random() < 0o1 / 0o2;
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
 * ម៉ូឌុលបង្កើតឃ្លាចម្បង - សាងសង់ឃ្លាដោយមានម៉ូដ្ឋីជម្រើសមានចង្វេក។
 * ប្រើប្រព័ន្ធពាក្យដែលត្រូវបានបង្កើត - ពាក្យទាំងអស់ត្រូវបានបញ្ចូលដោយ builder.aldoniVorton()។
    * @param strukturo - ក្រសរស្រាយជាក់ស្តែង ( មិនបានប្រើក្នុងប្រព័ន្ធម៉ូឌុល )។
    * @param ebligitajModifiloj - ម៉ូដ្ឋីណាដែលត្រូវបានអនុញ្ញាត។
 * @returns frazo
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
        if (Math.random() > 0o1 / 0o2) {
            builder = aplikiAdjektivojn(builder, base, { useAdjectivizer: true, skipRandom: true });
        }
    } else if (ebligitajModifiloj.adjectives !== false) {
        builder = aplikiAdjektivojn(builder, base, { useAdjectivizer: false, skipRandom: false });
    }

    if (ebligitajModifiloj.intensifier !== false) {
        const onVerb = Math.random() < 0o1 / 0o2;
        builder = ebleAldoniIntensigilon(builder, { onVerb });
    }
    if (ebligitajModifiloj.vnModifier !== false) builder = ebleAldoniUnuecanVNModifilon(builder);
    if (ebligitajModifiloj.coordinated !== false) builder = ebleAldoniKoordinatajnElementojnUnue(builder);
    if (ebligitajModifiloj.temaMarkilo !== false) builder = ebleAldoniTemajnMarkilojn(builder);
    if (ebligitajModifiloj.question !== false) builder = ebleAldoniDemandon(builder, ebligitajModifiloj);

    return builder.konstrui();
}


// ⟪ ការចាប់ផ្ដើម UI 🖥️ ⟫

/**
 * ចាប់ផ្ដើមចំណុចជាទំនាក់ចំណុចបង្កើតឃ្លា។
 * កំណត់កម្មវិធីដំណើរការចុចលើប៊ូតុង និងបំពេញម៉ឺនុយរចនាសម្រាយ។
  * @returns void
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
        const modifilujo = document.getElementById("modifilajMarkobutonoj");
        if (!modifilujo) return;

        modifilujo.innerHTML = "";

        MODIFILOJ.forEach(mod => {
            const etikedo = document.createElement("label");
            const markobutono = document.createElement("input");
            markobutono.type = "checkbox";
            markobutono.checked = ebligitajModifiloj[mod.id] ?? true;
            markobutono.addEventListener("change", () => {
                ebligitajModifiloj[mod.id] = markobutono.checked;
            });
            etikedo.appendChild(document.createTextNode(" " + mod.name));
            etikedo.appendChild(markobutono);
            modifilujo.appendChild(etikedo);
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

            if (vortoj.length > 0o0) {
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


// ⟪ អត្ថបទលទ្ធផ្លែងករណី 📤 ⟫

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
