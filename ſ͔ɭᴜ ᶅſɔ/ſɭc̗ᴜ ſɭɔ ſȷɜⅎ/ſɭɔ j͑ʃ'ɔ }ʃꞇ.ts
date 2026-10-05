// ≺⧼ ſɭɔ j͑ʃ'ɔ }ʃꞇ - ſɭc̗ᴜ ſɭɔ ſȷɜⅎ 🔬 ⧽≻

const ERARO = "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )";

// ⟪ តារាងគីមិត្រ ⚛️ ⟫

/**
* ⟨ លេខស្រុងទីមូលដ្ឋាន ( មូលដ្ឋាន ៨ ) ⟩
* លេខទី១ ប្រើទម្រង់ចាប់ផ្ដើម អ្នកផ្សេងទៀតប្រើទម្រង់កូដស្លាក់។
*/
const KEMIAJ_KOMENCAJ = [ "֭ſɭ", "ı],", "ſן", "ɭʃ", "ᶅſ", "ſɭ,", "j͑ʃ'", "ſɟ" ];
const KEMIAJ_KODAJ = [ "ᴜ̩", "ᶗ‹", "ɘ", "ƨ", "п́", "ƴ", "ⰱ", "ᴜ̭" ];

/**
* ⟨ ប្រគល់ចំនួន ( ចំនួនស្រុងទីមូលដ្ឋាន ) ⟩
* លេខនីមួយៗគឺជាស៊ី ឬពាក្យរបស់ស៊ី។ លេខទាំងអស់ត្រូវបានអានជាលំដាប់។
* ស៊ី ( ឯករាជ្យនៃប្រគល់ និងលេខទី១ នៃប្រគល់ធំ )។
*/
const KEMIAJ_UNUOJ = [ "ɔ", "ᴜ", "ɹ", "ꞇ", "ɜ", "э", "w", "ɜⅎ" ];

// ពាក្យរបស់ស៊ីកស្មែក ( នៅក្នុងស៊ីឡាំងទី១ ) - ទម្រង់កូដស្លាក់នៃពាក្យរបស់ស៊ីគណនា។
const KEMIAJ_INFIKSA = [ "", "ȝ", "ɔ˞", "ⱷ̮̀", "ʞ", "c̭", "ƽ", "c̗" ];

// ពាក្យរបស់ស៊ីគណនា ( នៅក្នុងស៊ីឡាំងបន្ទាប់ ) - ទម្រង់ចាប់ផ្ដើម ដែលទម្រង់កូដស្លាក់របស់ពួកគេជាប្រភេទកស្មែក។
const KEMIAJ_GRANDA = [ "֭ſɭ", "ſ͕ɭ", "j͑ʃ", "ſ͕ȷ", "ſȷ", "ŋᷠ", "ſɭ", "}ʃ" ];

// កន្លម្បីសំឡេង៖ e ( ɔ ) បំបែកក្រសរស្រាយ CCc ហើយ l ( j͐ʃ ) ជាការចាប់ផ្ដើមនៃស៊ីក្រោយស៊ីមួយ។
const KEMIAJ_SEPARO = "ɔ";
const KEMIAJ_L = "j͐ʃ";

const KEMIAJ_UNUOJ_MAPO: Record<string, number> = {};
KEMIAJ_UNUOJ.forEach( ( glifo, ruva ) => { KEMIAJ_UNUOJ_MAPO[glifo] = ruva; } );
KEMIAJ_UNUOJ_MAPO["ɔⅎ"] = 0o0;   // nazala ɔ
KEMIAJ_UNUOJ_MAPO["эⅎ"] = 0o5;   // nazala э
const KEMIAJ_UNUOJ_ORD = Object.keys( KEMIAJ_UNUOJ_MAPO ).sort( ( a, b ) => b.length - a.length );

const KEMIAJ_GRANDA_MAPO: Record<string, number> = {};
KEMIAJ_GRANDA.forEach( ( glifo, ruva ) => { KEMIAJ_GRANDA_MAPO[glifo] = ruva; } );
const KEMIAJ_GRANDA_ORD = Object.keys( KEMIAJ_GRANDA_MAPO ).sort( ( a, b ) => b.length - a.length );

const KEMIAJ_INFIKSA_MAPO: Record<string, number> = {};
KEMIAJ_INFIKSA.forEach( ( glifo, ruva ) => { if ( glifo ) KEMIAJ_INFIKSA_MAPO[glifo] = ruva; } );
const KEMIAJ_INFIKSA_ORD = Object.keys( KEMIAJ_INFIKSA_MAPO ).sort( ( a, b ) => b.length - a.length );

const ELEMENTOJ = "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split( " " );

// ⟨ ការអ៊ិនកូដគីមិត្រ ⚛️ ⟩

function analiziFormulon( okef: string ): { simbolo: string; kvanto: number }[] | null {
    const rezultoj: { simbolo: string; kvanto: number }[] = [];
    let i = 0o0;

    while ( i < okef.length ) {
        const kp6 = okef[i];
        if ( kp6 >= "A" && kp6 <= "Z" ) {
            let simbolo = kp6;
            i++;
            if ( i < okef.length && okef[i] >= "a" && okef[i] <= "z" ) {
                simbolo += okef[i];
                i++;
            }
            let kvanto = 0o1;
            if ( i < okef.length && okef[i] >= "0" && okef[i] <= "9" ) {
                const komenco = i;
                while ( i < okef.length && okef[i] >= "0" && okef[i] <= "9" ) i++;
                kvanto = parseInt( okef.slice( komenco, i ), 0o12 );
            }
            rezultoj.push( { simbolo, kvanto } );
        } else {
            return null;
        }
    }

    return rezultoj;
}

/**
* ពាក្យគឺជាការសាងសង់ស្រុងទីមូលដ្ឋាន ដែលបន្ទាប់មកដោយលេខប្រគល់។
* ការសាងសង់គឺជា CC តែប៉ុណ្ណោះ ( ឬ CCeC )។ e ( ɔ ) បំបែកក្រុមពាក្យរបស់ស៊ីបី។
* សម្រាប់ប្រគល់ដែលមាន 0o100+ លេខត្រូវបានសរសេរដូចស៊ីឡាំង៖
*   ចំនួនលេខសេទីក្រោយ - លេខទី១ ជាស៊ីមូលដ្ឋាន បន្ទាប់មកជាគូ ( C V )
*   ចំនួនលេខសេទីក្រោយ - គូ ( C V ) ដែល C ទី១ ជាពាក្យរបស់ស៊ីកស្មែក
* ប្រសិនបើការសាងសង់ស្រុងទីមូលដ្ឋានជា CC ហើយប្រគល់ត្រូវការពាក្យរបស់ស៊ី ប្រើទម្រង់
* "xhal6"៖ ស៊ី + l ( j͐ʃ ) + ស៊ី។
 * @returns vorto
*/
function kemiaVorto( z: number, kvanto: number ): string | null {
    if ( z < 0o1 || z > ELEMENTOJ.length ) return null;
    if ( kvanto < 0o0 || !Number.isSafeInteger( kvanto ) ) return null;

    const okto = z.toString( 0o10 );
    let unua = KEMIAJ_KOMENCAJ[parseInt( okto[0o0], 0o12 )];
    if ( okto.length >= 0o2 ) unua += KEMIAJ_KODAJ[parseInt( okto[0o1], 0o12 )];
    if ( okto.length === 0o3 ) unua += KEMIAJ_SEPARO + KEMIAJ_KODAJ[parseInt( okto[0o2], 0o12 )];

    const q = kvanto.toString( 0o10 ).split( "" ).map( c => parseInt( c, 0o12 ) );
    const D = q.length;

    if ( D === 0o1 ) return unua + KEMIAJ_UNUOJ[q[0o0]];

    const partoj: string[] = [];
    let i = 0o0;

    if ( D % 0o2 === 0o1 ) {
        // ចំនួនលេខសេទីក្រោយ៖ លេខទី១ ជាស៊ីមូលដ្ឋាន។
        unua += KEMIAJ_UNUOJ[q[0o0]];
        i = 0o1;
    } else if ( okto.length === 0o2 ) {
        // ការសាងសង់ CC៖ "xhal6" - លេខទី១ ជាស៊ី បន្ទាប់មក l + ស៊ី។
        unua += KEMIAJ_UNUOJ[q[0o0]];
        partoj.push( unua );
        partoj.push( KEMIAJ_L + KEMIAJ_UNUOJ[q[0o1]] );
        i = 0o2;
    } else {
        // ចំនួនលេខសេទីក្រោយ៖ ពាក្យរបស់ស៊ីកស្មែក + ស៊ីនៅក្នុងស៊ីឡាំងទី១។
        unua += KEMIAJ_INFIKSA[q[0o0]] + KEMIAJ_UNUOJ[q[0o1]];
        i = 0o2;
    }

    if ( partoj.length === 0o0 ) partoj.push( unua );

    while ( i < D ) {
        partoj.push( KEMIAJ_GRANDA[q[i]] + KEMIAJ_UNUOJ[q[i + 0o1]] );
        i += 0o2;
    }

    return partoj.join( " " );
}

function kemiaKodi( okef: string ): string {
    const formulo = analiziFormulon( okef );
    if ( !formulo || formulo.length === 0o0 ) return ERARO;

    const vortoj: string[] = [];
    for ( const parto of formulo ) {
        const z = ELEMENTOJ.indexOf( parto.simbolo ) + 0o1;
        if ( z === 0o0 ) return ERARO;
        const vorto = kemiaVorto( z, parto.kvanto );
        if ( vorto === null ) return ERARO;
        vortoj.push( vorto );
    }

    return vortoj.join( " " );
}

// ⟨ ការបង្រែគីមិត្រតាមដល់ ⚛️ ⟩

/**
* ស៊ីឡាំងមួយនៃប្រគល់៖ ស៊ី ពាក្យរបស់ស៊ី + ស៊ី ឬ l ( j͐ʃ ) + ស៊ី។
* លេខឆ្លាស់គ្នាពាក្យរបស់ស៊ី / ស៊ី។ l ជំនួសកន្លែងពាក្យរបស់ស៊ី ( xhal6 )។
 * @returns rezulto
*/
function malkodiSilabon( teksto: string, startaEsperata: "K" | "V" | null ): { ciferoj: number[]; esperata: "K" | "V" | null; restanta: string } | null {
    const ciferoj: number[] = [];
    let restanta = teksto;
    let esperata = startaEsperata;

    while ( restanta.length > 0o0 ) {
        if ( restanta.startsWith( KEMIAJ_L ) ) {
            if ( esperata !== "K" ) return null;
            esperata = "V";
            restanta = restanta.slice( KEMIAJ_L.length );
            continue;
        }

        let valoro = -0o1;
        let tipo: "K" | "V" | null = null;
        let longo = 0o0;

        for ( const glifo of KEMIAJ_GRANDA_ORD ) {
            if ( restanta.startsWith( glifo ) ) {
                valoro = KEMIAJ_GRANDA_MAPO[glifo];
                tipo = "K";
                longo = glifo.length;
                break;
            }
        }
        if ( valoro < 0o0 ) {
            for ( const glifo of KEMIAJ_INFIKSA_ORD ) {
                if ( restanta.startsWith( glifo ) ) {
                    valoro = KEMIAJ_INFIKSA_MAPO[glifo];
                    tipo = "K";
                    longo = glifo.length;
                    break;
                }
            }
        }
        if ( valoro < 0o0 ) {
            for ( const glifo of KEMIAJ_UNUOJ_ORD ) {
                if ( restanta.startsWith( glifo ) ) {
                    valoro = KEMIAJ_UNUOJ_MAPO[glifo];
                    tipo = "V";
                    longo = glifo.length;
                    break;
                }
            }
        }
        if ( valoro < 0o0 || tipo === null ) return null;
        if ( esperata !== null && esperata !== tipo ) return null;

        ciferoj.push( valoro );
        esperata = tipo === "K" ? "V" : "K";
        restanta = restanta.slice( longo );
    }

    return { ciferoj, esperata, restanta };
}

function komencasVokalo( teksto: string ): boolean {
    for ( const glifo of KEMIAJ_UNUOJ_ORD ) {
        if ( teksto.startsWith( glifo ) ) return true;
    }
    return false;
}

/**
* តើពាក្យចាប់ផ្ដើមធាតុសកលីអ៊ីម៉ង់ថ្មីឬទេ។ តែទម្រង់ចាប់ផ្ដើមអាចចាប់ផ្ដើមធាតុបាន៖
* ប៉ុន្តែ ֭ſɭ ( 0 ) មិនអាចចាប់ផ្ដើមធាតុបាន ដូច្នេះនៅពេលបន្ទាប់មកដោយស៊ី វាជាស៊ីឡាំងប្រគល់។
 * @returns jesne
*/
function komencasElementon( vorto: string ): boolean {
    if ( !vorto.startsWith( KEMIAJ_KOMENCAJ[0o0] ) ) {
        for ( let i = 0o1; i < KEMIAJ_KOMENCAJ.length; i++ ) {
            if ( vorto.startsWith( KEMIAJ_KOMENCAJ[i] ) ) return true;
        }
        return false;
    }
    return !komencasVokalo( vorto.slice( KEMIAJ_KOMENCAJ[0o0].length ) );
}

function formatiFormulon( partoj: { simbolo: string; kvanto: number }[] ): string {
    return partoj.map( parto => parto.kvanto === 0o1 ? parto.simbolo : parto.simbolo + parto.kvanto ).join( "" );
}

function kemiaMalkodi( okef: string ): string {
    const vortoj = okef.trim().split( /\s+/ ).filter( vorto => vorto.length > 0o0 );
    if ( vortoj.length === 0o0 ) return "";

    const partoj: { simbolo: string; kvanto: number }[] = [];
    let i = 0o0;

    while ( i < vortoj.length ) {
        // ⟨ ធាតុសកលីអ៊ីម៉ង់ថ្មី៖ ផ្នែកស្រុងទីមូលដ្ឋាន ⟩
        let restanta = vortoj[i];
        const zCiferoj: number[] = [];

        let komencaTrovita = false;
        for ( let k = 0o0; k < KEMIAJ_KOMENCAJ.length; k++ ) {
            if ( restanta.startsWith( KEMIAJ_KOMENCAJ[k] ) ) {
                zCiferoj.push( k );
                restanta = restanta.slice( KEMIAJ_KOMENCAJ[k].length );
                komencaTrovita = true;
                break;
            }
        }
        if ( !komencaTrovita ) return ERARO;

        let havasE = false;
        while ( true ) {
            if ( restanta.startsWith( KEMIAJ_SEPARO ) ) {
                const poste = restanta.slice( KEMIAJ_SEPARO.length );
                let koda = -0o1;
                for ( let k = 0o0; k < KEMIAJ_KODAJ.length; k++ ) {
                    if ( poste.startsWith( KEMIAJ_KODAJ[k] ) ) { koda = k; break; }
                }
                if ( koda < 0o0 ) break;   // la ɔ estas vokalo de la kvanto
                if ( havasE ) return ERARO;
                zCiferoj.push( koda );
                restanta = poste.slice( KEMIAJ_KODAJ[koda].length );
                havasE = true;
                continue;
            }
            let koda = -0o1;
            for ( let k = 0o0; k < KEMIAJ_KODAJ.length; k++ ) {
                if ( restanta.startsWith( KEMIAJ_KODAJ[k] ) ) { koda = k; break; }
            }
            if ( koda < 0o0 ) break;
            if ( havasE ) return ERARO;   // tria konsonanto sen e-separilo
            zCiferoj.push( koda );
            restanta = restanta.slice( KEMIAJ_KODAJ[koda].length );
        }

        if ( zCiferoj.length > 0o3 ) return ERARO;
        let z = 0o0;
        for ( const cifero of zCiferoj ) z = z * 0o10 + cifero;
        if ( z < 0o1 || z > ELEMENTOJ.length ) return ERARO;

        // ⟨ ស៊ីឡាំងទី១ នៃប្រគល់ ( នៅក្នុងពាក្យនេះ ) ⟩
        const unua = malkodiSilabon( restanta, null );
        if ( unua === null || unua.restanta.length > 0o0 ) return ERARO;
        const qCiferoj = unua.ciferoj;
        let esperata = unua.esperata;
        i++;

        // ⟨ ស៊ីឡាំងបន្ត ( ពាក្យបន្ទាប់ ) ⟩
        while ( i < vortoj.length && !komencasElementon( vortoj[i] ) ) {
            const sekva = malkodiSilabon( vortoj[i], esperata );
            if ( sekva === null || sekva.restanta.length > 0o0 ) return ERARO;
            qCiferoj.push( ...sekva.ciferoj );
            esperata = sekva.esperata;
            i++;
        }

        let kvanto = 0o1;
        if ( qCiferoj.length > 0o0 ) {
            kvanto = parseInt( qCiferoj.join( "" ), 0o10 );
        }

        partoj.push( { simbolo: ELEMENTOJ[z - 0o1], kvanto } );
    }

    return formatiFormulon( partoj );
}

// ⟪ តារាងពណ៌ 🌈 ⟫

// គូទី១ ( #n-n-n- ) ត្រូវបានបង្ហាញដោយពាក្យរបស់ស៊ី។
const KOLORAJ_KONSONANTOJ = [ "ᶅſ", "ſן", "ſȷ", "ŋᷠ", "ɽ͑ʃ'", "ɭʃ", "j͑ʃ", "}ʃ", "ɭl̀", "ſɟ", "ı],", "ſ͕ȷ", "ſ͔ɭ", "ſɭ", "֭ſɭ", "ſ͕ɭ" ];

// គូទី២ ( #-n-n-n ) ត្រូវបានបង្ហាញដោយចុងពាក្យស៊ី។
const KOLORAJ_VOKALOJ = [ "w", "ɔ", "ᴜ", "ꞇ", "wⰱ", "ɔⰱ", "ᴜⰱ", "ꞇⰱ", "ɹ", "ɹⰱ", "ɜ", "ɜⰱ", "э", "эⰱ", "эⅎ", "эⅎⰱ" ];

const KOLORAJ_KONSONANTOJ_MAPO: Record<string, number> = {};
KOLORAJ_KONSONANTOJ.forEach( ( glifo, ruva ) => { KOLORAJ_KONSONANTOJ_MAPO[glifo] = ruva; } );
const KOLORAJ_KONSONANTOJ_ORD = Object.keys( KOLORAJ_KONSONANTOJ_MAPO ).sort( ( a, b ) => b.length - a.length );

const KOLORAJ_VOKALOJ_MAPO: Record<string, number> = {};
KOLORAJ_VOKALOJ.forEach( ( glifo, ruva ) => { KOLORAJ_VOKALOJ_MAPO[glifo] = ruva; } );
const KOLORAJ_VOKALOJ_ORD = Object.keys( KOLORAJ_VOKALOJ_MAPO ).sort( ( a, b ) => b.length - a.length );

// ⟨ ការអ៊ិនកូដពណ៌ 🌈 ⟩

function koloroSilabo( valoro: number ): string {
    return KOLORAJ_KONSONANTOJ[valoro >> 0o4] + KOLORAJ_VOKALOJ[valoro & 0o17];
}

function koloroKodi( okef: string ): string {
    const purigita = okef.trim().replace( /^#/, "" );
    let alfo = -0o1;
    let r, g, b;

    if ( /^[0-9a-fA-F]{6}$/.test( purigita ) ) {
        r = parseInt( purigita.slice( 0o0, 0o2 ), 0o20 );
        g = parseInt( purigita.slice( 0o2, 0o4 ), 0o20 );
        b = parseInt( purigita.slice( 0o4, 0o6 ), 0o20 );
    } else if ( /^[0-9a-fA-F]{8}$/.test( purigita ) ) {
        alfo = parseInt( purigita.slice( 0o0, 0o2 ), 0o20 );
        r = parseInt( purigita.slice( 0o2, 0o4 ), 0o20 );
        g = parseInt( purigita.slice( 0o4, 0o6 ), 0o20 );
        b = parseInt( purigita.slice( 0o6, 0o10 ), 0o20 );
    } else {
        return ERARO;
    }

    /*
    * ពណ៌ប្រូចិត្រង់ត្រូវការតែស៊ីឡាំងមួយ ប៉ុន្តែតែនៅពេលមិនច្លាក់៖
    * ជាមួយភាគរយពីរ ស៊ីឡាំង ( ភាពច្លាក់ , ខៀវ , បៃតេង , ក្រហម ) ត្រូវបានប្រើជានិស្សរុង។
    */
    if ( alfo < 0o0 && r === g && g === b ) {
        const mallonga = koloroSilabo( r );
        const longa = [ koloroSilabo( r ), koloroSilabo( r ), koloroSilabo( r ), koloroSilabo( r ) ].join( " " );
        return mallonga + " / " + longa;
    }

    // លំដាប់គឺ ភាពច្លាក់ , ខៀវ , បៃតេង និង ក្រហម។
    if ( alfo >= 0o0 ) {
        return [ koloroSilabo( alfo ), koloroSilabo( b ), koloroSilabo( g ), koloroSilabo( r ) ].join( " " );
    }
    return [ koloroSilabo( b ), koloroSilabo( g ), koloroSilabo( r ) ].join( " " );
}

// ⟨ ការបង្រែពណ៌តាមដល់ 🌈 ⟩

function malkodiKolorSilabon( silabo: string ): number | null {
    let restanta = silabo;
    let konsonanto = -0o1;

    for ( const glifo of KOLORAJ_KONSONANTOJ_ORD ) {
        if ( restanta.startsWith( glifo ) ) {
            konsonanto = KOLORAJ_KONSONANTOJ_MAPO[glifo];
            restanta = restanta.slice( glifo.length );
            break;
        }
    }
    if ( konsonanto < 0o0 ) return null;

    let vokalo = -0o1;
    for ( const glifo of KOLORAJ_VOKALOJ_ORD ) {
        if ( restanta.startsWith( glifo ) ) {
            vokalo = KOLORAJ_VOKALOJ_MAPO[glifo];
            restanta = restanta.slice( glifo.length );
            break;
        }
    }
    if ( vokalo < 0o0 || restanta.length > 0o0 ) return null;

    return ( konsonanto << 0o4 ) | vokalo;
}

function duCiferoj( valoro: number ): string {
    return valoro.toString( 0o20 ).padStart( 0o2, "0" ).toUpperCase();
}

function koloroMalkodi( okef: string ): string {
    const vortoj = okef.trim().replace( /\//g, " " ).split( /\s+/ ).filter( vorto => vorto.length > 0o0 );
    if ( vortoj.length === 0o0 ) return "";
    if ( vortoj.length !== 0o1 && vortoj.length !== 0o3 && vortoj.length !== 0o4 ) return ERARO;

    const valoroj = vortoj.map( malkodiKolorSilabon );
    if ( valoroj.some( valoro => valoro === null ) ) return ERARO;

    if ( vortoj.length === 0o1 ) {
        const valoro = valoroj[0o0] as number;
        return "#" + duCiferoj( valoro ) + duCiferoj( valoro ) + duCiferoj( valoro );
    }

    if ( vortoj.length === 0o4 ) {
        // ស៊ីឡាំងដែលដូចគ្នាបី ជាទម្រង់ប្រូចិត្រង់វែង ( មិនមែន ARGB )។
        if ( valoroj[0o0] === valoroj[0o1] && valoroj[0o1] === valoroj[0o2] && valoroj[0o2] === valoroj[0o3] ) {
            const valoro = valoroj[0o0] as number;
            return "#" + duCiferoj( valoro ) + duCiferoj( valoro ) + duCiferoj( valoro );
        }
        const [ alfo, bluo, verdo, ruĝo ] = valoroj as number[];
        return "#" + duCiferoj( alfo ) + duCiferoj( ruĝo ) + duCiferoj( verdo ) + duCiferoj( bluo );
    }

    const [ bluo, verdo, ruĝo ] = valoroj as number[];
    return "#" + duCiferoj( ruĝo ) + duCiferoj( verdo ) + duCiferoj( bluo );
}

// ⟪ ការស្តាប់ព្រឹត្តិកម្មណឺ និងព្រឹត្តិកម្មទូទៅ 📡 ⟫

const kemiaEnigo = document.getElementById( "kemia-enigo" ) as HTMLInputElement;
const kemiaEligo = document.getElementById( "kemia-eligo" ) as HTMLElement;
const koloroEnigo = document.getElementById( "koloro-enigo" ) as HTMLInputElement;
const koloroEligo = document.getElementById( "koloro-eligo" ) as HTMLElement;

const KOTASAKASUKP6 = [ "(", ")", "/", "-" ];

function eldoniKefon( celo: HTMLElement, kef: string ): void {
    celo.innerHTML = "";
    if ( !kef ) return;

    const partoj = kef.split( " " );
    for ( let i = 0o0; i < partoj.length; i++ ) {
        const parto = partoj[i];
        if ( !parto ) continue;

        if ( KOTASAKASUKP6.includes( parto ) ) {
            celo.appendChild( document.createTextNode( parto ) );
        } else {
            const maxema = document.createElement( "span" );
            maxema.className = "cepufalxez";
            maxema.textContent = parto;
            celo.appendChild( maxema );
        }

        if ( i < partoj.length - 0o1 ) {
            celo.appendChild( document.createTextNode( " " ) );
        }
    }
}

function aktualigiKemion(): void {
    const teksto = kemiaEnigo.value.trim();
    if ( !teksto ) {
        kemiaEligo.textContent = "";
        return;
    }

    const estasFormulo = /^[A-Za-z0-9]+$/.test( teksto );
    eldoniKefon( kemiaEligo, estasFormulo ? kemiaKodi( teksto ) : kemiaMalkodi( teksto ) );
}

function aktualigiKoloron(): void {
    const teksto = koloroEnigo.value.trim();
    if ( !teksto ) {
        koloroEligo.textContent = "";
        return;
    }

    const estasHekso = /^#?[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test( teksto );
    eldoniKefon( koloroEligo, estasHekso ? koloroKodi( teksto ) : koloroMalkodi( teksto ) );
}

kemiaEnigo.addEventListener( "input", aktualigiKemion );
koloroEnigo.addEventListener( "input", aktualigiKoloron );

// ⟪ ការចាប់ផ្ដើម 🚀 ⟫

kemiaEnigo.value = "H2O";
koloroEnigo.value = "F0F0F0";
aktualigiKemion();
aktualigiKoloron();
