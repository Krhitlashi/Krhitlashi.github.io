// ≺⧼ ſɭɔ j͑ʃ'ɔ }ʃꞇ - ſɭc̗ᴜ ſɭɔ ſȷɜⅎ 🔬 ⧽≻

const TLOHK2NI = "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )";

// ⟪ ſɭʞɔ }ʃꞇ ʌ ſɟᴜ ı],ɹͷ̗ ⚛️ ⟫

/**
* ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ ʌ ſɭɹ ſȷɔ ⟩
* j͑ʃᴜ ı],ɔ ʌ ſɭɹ ſȷɔ ( KOMENCAJ KODAJ )
*/
const SAXE_CA1ARA = [ "֭ſɭ", "ı],", "ſן", "ɭʃ", "ᶅſ", "ſɭ,", "j͑ʃ'", "ſɟ" ];
const S2TAS_CA1ARA = [ "ᴜ̩", "ᶗ‹", "ɘ", "ƨ", "п́", "ƴ", "ⰱ", "ᴜ̭" ];

/**
* ⟨ ſɭɹ ſȷɔ ⟩
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
* ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɭɹ ſȷɔ
*/
const BE_CA1ARA = [ "ɔ", "ᴜ", "ɹ", "ꞇ", "ɜ", "э", "w", "ɜⅎ" ];

// ⟨ ſɭɹ ſȷɔ ( SOST2_CA1ARA 1 ) ⟩
const SOST2_CA1ARA = [ "", "ȝ", "ɔ˞", "ⱷ̮̀", "ʞ", "c̭", "ƽ", "c̗" ];

// ⟨ ſɭɹ ſȷɔ ( PUF2_CA1ARA ) ⟩
const PUF2_CA1ARA = [ "֭ſɭ", "ſ͕ɭ", "j͑ʃ", "ſ͕ȷ", "ſȷ", "ŋᷠ", "ſɭ", "}ʃ" ];

// ⟨ ʃɔ ( e l CC CCc ) ⟩
const CATA_ESKEK = "ɔ";
const S2TAS_L = "j͐ʃ";

const BE_CAX2L: Record<string, number> = {};
SAXE_CA1ARA.forEach( ( s2tas, k2fe ) => { BE_CAX2L[s2tas] = k2fe; } );
BE_CAX2L["ɔⅎ"] = 0o0;   // nazala ɔ
BE_CAX2L["эⅎ"] = 0o5;   // nazala э
const BE_S2TAS = Object.keys( BE_CAX2L ).sort( ( a, b ) => b.length - a.length );

const PUF2_CAX2L: Record<string, number> = {};
PUF2_CA1ARA.forEach( ( s2tas, ruva ) => { PUF2_CAX2L[s2tas] = ruva; } );
const PUF2_S2TAS = Object.keys( PUF2_CAX2L ).sort( ( a, b ) => b.length - a.length );

const SOST2_CAX2L: Record<string, number> = {};
SOST2_CA1ARA.forEach( ( s2tas, ruva ) => { if ( s2tas ) SOST2_CAX2L[s2tas] = ruva; } );
const SOST2_S2TAS = Object.keys( SOST2_CAX2L ).sort( ( a, b ) => b.length - a.length );

const KFENI_CA1ARA = "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split( " " );

// ⟨ ſɭʞɔ }ʃꞇ ʌ ʃᴜ ſɭɹ ſןɹ }ʃꞇ ⚛️ ⟩

function cataOkef( okef: string ): { s2tas: string; vek2fe: number }[] | null {
    const okefKekCa1ara: { s2tas: string; vek2fe: number }[] = [];
    let i = 0o0;

    while ( i < okef.length ) {
        const c = okef[i];
        if ( c >= "A" && c <= "Z" ) {
            let s2tas = c;
            i++;
            if ( i < okef.length && okef[i] >= "a" && okef[i] <= "z" ) {
                s2tas += okef[i];
                i++;
            }
            let vek2fe = 0o1;
            if ( i < okef.length && okef[i] >= "0" && okef[i] <= "9" ) {
                const saxeK2fe = i;
                while ( i < okef.length && okef[i] >= "0" && okef[i] <= "9" ) i++;
                vek2fe = parseInt( okef.slice( saxeK2fe, i ), 0o12 );
            }
            okefKekCa1ara.push( { s2tas, vek2fe } );
        } else {
            return null;
        }
    }

    return okefKekCa1ara;
}

/**
* ſɭʞɹ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( CC CCeC )
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( xhal6 l )
 * @returns kef
*/
function k2fKef( k2fe: number, vek2fe: number ): string | null {
    if ( k2fe < 0o1 || k2fe > KFENI_CA1ARA.length ) return null;
    if ( vek2fe < 0o0 || !Number.isSafeInteger( vek2fe ) ) return null;

    const knakEskek = k2fe.toString( 0o10 );
    let xaqadiEskek = SAXE_CA1ARA[parseInt( knakEskek[0o0], 0o12 )];
    if ( knakEskek.length >= 0o2 ) xaqadiEskek += S2TAS_CA1ARA[parseInt( knakEskek[0o1], 0o12 )];
    if ( knakEskek.length === 0o3 ) xaqadiEskek += CATA_ESKEK + S2TAS_CA1ARA[parseInt( knakEskek[0o2], 0o12 )];

    const q = vek2fe.toString( 0o10 ).split( "" ).map( c => parseInt( c, 0o12 ) );
    const D = q.length;

    if ( D === 0o1 ) return xaqadiEskek + BE_CA1ARA[q[0o0]];

    const kekCa1ara: string[] = [];
    let i = 0o0;

    if ( D % 0o2 === 0o1 ) {
        // ⟨ ſɭɹ ſȷɔ ( 1 ) ⟩
        xaqadiEskek += BE_CA1ARA[q[0o0]];
        i = 0o1;
    } else if ( knakEskek.length === 0o2 ) {
        // ⟨ ſɭɹ ſȷɔ ( xhal6 l ) ⟩
        xaqadiEskek += BE_CA1ARA[q[0o0]];
        kekCa1ara.push( xaqadiEskek );
        kekCa1ara.push( S2TAS_L + BE_CA1ARA[q[0o1]] );
        i = 0o2;
    } else {
        // ⟨ ſɭɹ ſȷɔ ( 1 ) ⟩
        xaqadiEskek += SOST2_CA1ARA[q[0o0]] + BE_CA1ARA[q[0o1]];
        i = 0o2;
    }

    if ( kekCa1ara.length === 0o0 ) kekCa1ara.push( xaqadiEskek );

    while ( i < D ) {
        kekCa1ara.push( PUF2_CA1ARA[q[i]] + BE_CA1ARA[q[i + 0o1]] );
        i += 0o2;
    }

    return kekCa1ara.join( " " );
}

function tboKef( okef: string ): string {
    const okefKekCa1ara = cataOkef( okef );
    if ( !okefKekCa1ara || okefKekCa1ara.length === 0o0 ) return TLOHK2NI;

    const kefCa1ara: string[] = [];
    for ( const kek of okefKekCa1ara ) {
        const k2fe = KFENI_CA1ARA.indexOf( kek.s2tas ) + 0o1;
        if ( k2fe === 0o0 ) return TLOHK2NI;
        const kef = k2fKef( k2fe, kek.vek2fe );
        if ( kef === null ) return TLOHK2NI;
        kefCa1ara.push( kef );
    }

    return kefCa1ara.join( " " );
}

// ⟨ ſɭʞɔ }ʃꞇ ʌ ʃᴜ ſɭɹ ſןɹ }ʃꞇ ⚛️ ⟩

/**
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( l xhal6 )
 * @returns rezulto
*/
function cataK2fe( kp6k2p2: string, xaqadiHaxe: "K" | "V" | null ): { k2feCa1ara: number[]; haxe: "K" | "V" | null; fuKp6k2p2: string } | null {
    const k2feCa1ara: number[] = [];
    let fuKp6k2p2 = kp6k2p2;
    let haxe = xaqadiHaxe;

    while ( fuKp6k2p2.length > 0o0 ) {
        if ( fuKp6k2p2.startsWith( S2TAS_L ) ) {
            if ( haxe !== "K" ) return null;
            haxe = "V";
            fuKp6k2p2 = fuKp6k2p2.slice( S2TAS_L.length );
            continue;
        }

        let j6fini = -0o1;
        let b6n2baHaxe: "K" | "V" | null = null;
        let pal6 = 0o0;

        for ( const s2tas of PUF2_S2TAS ) {
            if ( fuKp6k2p2.startsWith( s2tas ) ) {
                j6fini = PUF2_CAX2L[s2tas];
                b6n2baHaxe = "K";
                pal6 = s2tas.length;
                break;
            }
        }
        if ( j6fini < 0o0 ) {
            for ( const s2tas of SOST2_S2TAS ) {
                if ( fuKp6k2p2.startsWith( s2tas ) ) {
                    j6fini = SOST2_CAX2L[s2tas];
                    b6n2baHaxe = "K";
                    pal6 = s2tas.length;
                    break;
                }
            }
        }
        if ( j6fini < 0o0 ) {
            for ( const s2tas of BE_S2TAS ) {
                if ( fuKp6k2p2.startsWith( s2tas ) ) {
                    j6fini = BE_CAX2L[s2tas];
                    b6n2baHaxe = "V";
                    pal6 = s2tas.length;
                    break;
                }
            }
        }
        if ( j6fini < 0o0 || b6n2baHaxe === null ) return null;
        if ( haxe !== null && haxe !== b6n2baHaxe ) return null;

        k2feCa1ara.push( j6fini );
        haxe = b6n2baHaxe === "K" ? "V" : "K";
        fuKp6k2p2 = fuKp6k2p2.slice( pal6 );
    }

    return { k2feCa1ara, haxe, fuKp6k2p2 };
}

function saxeBe( kp6k2p2: string ): boolean {
    for ( const s2tas of BE_S2TAS ) {
        if ( kp6k2p2.startsWith( s2tas ) ) return true;
    }
    return false;
}

/**
* ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( 0 )
 * @returns jesne
*/
function saxeEskek( kef: string ): boolean {
    if ( !kef.startsWith( SAXE_CA1ARA[0o0] ) ) {
        for ( let i = 0o1; i < SAXE_CA1ARA.length; i++ ) {
            if ( kef.startsWith( SAXE_CA1ARA[i] ) ) return true;
        }
        return false;
    }
    return !saxeBe( kef.slice( SAXE_CA1ARA[0o0].length ) );
}

function k2fOkef( kekCa1ara: { s2tas: string; vek2fe: number }[] ): string {
    return kekCa1ara.map( kek => kek.vek2fe === 0o1 ? kek.s2tas : kek.s2tas + kek.vek2fe ).join( "" );
}

function kefAlOkef( okef: string ): string {
    const kefCa1ara = okef.trim().split( /\s+/ ).filter( kef => kef.length > 0o0 );
    if ( kefCa1ara.length === 0o0 ) return "";

    const kekCa1ara: { s2tas: string; vek2fe: number }[] = [];
    let i = 0o0;

    while ( i < kefCa1ara.length ) {
        // ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ ʌ ſɭɹ ſȷɔ ⟩
        let fuKp6k2p2 = kefCa1ara[i];
        const k2feCa1ara: number[] = [];

        let saxeB6n2ba = false;
        for ( let k = 0o0; k < SAXE_CA1ARA.length; k++ ) {
            if ( fuKp6k2p2.startsWith( SAXE_CA1ARA[k] ) ) {
                k2feCa1ara.push( k );
                fuKp6k2p2 = fuKp6k2p2.slice( SAXE_CA1ARA[k].length );
                saxeB6n2ba = true;
                break;
            }
        }
        if ( !saxeB6n2ba ) return TLOHK2NI;

        let eB6n2ba = false;
        while ( true ) {
            if ( fuKp6k2p2.startsWith( CATA_ESKEK ) ) {
                const eskek = fuKp6k2p2.slice( CATA_ESKEK.length );
                let k2fe = -0o1;
                for ( let k = 0o0; k < S2TAS_CA1ARA.length; k++ ) {
                    if ( eskek.startsWith( S2TAS_CA1ARA[k] ) ) { k2fe = k; break; }
                }
                if ( k2fe < 0o0 ) break;   // la ɔ estas vokalo de la vek2fe
                if ( eB6n2ba ) return TLOHK2NI;
                k2feCa1ara.push( k2fe );
                fuKp6k2p2 = eskek.slice( S2TAS_CA1ARA[k2fe].length );
                eB6n2ba = true;
                continue;
            }
            let k2fe = -0o1;
            for ( let k = 0o0; k < S2TAS_CA1ARA.length; k++ ) {
                if ( fuKp6k2p2.startsWith( S2TAS_CA1ARA[k] ) ) { k2fe = k; break; }
            }
            if ( k2fe < 0o0 ) break;
            if ( eB6n2ba ) return TLOHK2NI;   // tria konsonanto sen e-separilo
            k2feCa1ara.push( k2fe );
            fuKp6k2p2 = fuKp6k2p2.slice( S2TAS_CA1ARA[k2fe].length );
        }

        if ( k2feCa1ara.length > 0o3 ) return TLOHK2NI;
        let k2fe = 0o0;
        for ( const d of k2feCa1ara ) k2fe = k2fe * 0o10 + d;
        if ( k2fe < 0o1 || k2fe > KFENI_CA1ARA.length ) return TLOHK2NI;

        // ⟨ ſɭɹ ſȷɔ ( 1 ) ⟩
        const xaqadiEskek = cataK2fe( fuKp6k2p2, null );
        if ( xaqadiEskek === null || xaqadiEskek.fuKp6k2p2.length > 0o0 ) return TLOHK2NI;
        const qCiferoj = xaqadiEskek.k2feCa1ara;
        let haxe = xaqadiEskek.haxe;
        i++;

        // ⟨ ſɭɹ ſȷɔ ʌ ſɭɔʞ ⟩
        while ( i < kefCa1ara.length && !saxeEskek( kefCa1ara[i] ) ) {
            const eskek = cataK2fe( kefCa1ara[i], haxe );
            if ( eskek === null || eskek.fuKp6k2p2.length > 0o0 ) return TLOHK2NI;
            qCiferoj.push( ...eskek.k2feCa1ara );
            haxe = eskek.haxe;
            i++;
        }

        let vek2fe = 0o1;
        if ( qCiferoj.length > 0o0 ) {
            vek2fe = parseInt( qCiferoj.join( "" ), 0o10 );
        }

        kekCa1ara.push( { s2tas: KFENI_CA1ARA[k2fe - 0o1], vek2fe } );
    }

    return k2fOkef( kekCa1ara );
}

// ⟪ ᶅſɔ ֭ſɭɹ ʌ ſɟᴜ ı],ɹͷ̗ 🌈 ⟫

// ⟨ ſןɹ j͑ʃᴜ ʌ ſɭɔʞ ( 1 #n-n-n- ) ⟩
const WEH2_S2TAS = [ "ᶅſ", "ſן", "ſȷ", "ŋᷠ", "ɽ͑ʃ'", "ɭʃ", "j͑ʃ", "}ʃ", "ɭl̀", "ſɟ", "ı],", "ſ͕ȷ", "ſ͔ɭ", "ſɭ", "֭ſɭ", "ſ͕ɭ" ];

// ⟨ ſןɹ j͑ʃᴜ ʌ ſɭɔʞ ( 2 #-n-n-n ) ⟩
const WEH2_BE = [ "w", "ɔ", "ᴜ", "ꞇ", "wⰱ", "ɔⰱ", "ᴜⰱ", "ꞇⰱ", "ɹ", "ɹⰱ", "ɜ", "ɜⰱ", "э", "эⰱ", "эⅎ", "эⅎⰱ" ];

const WEH2_S2TAS_CAX2L: Record<string, number> = {};
WEH2_S2TAS.forEach( ( s2tas, ruva ) => { WEH2_S2TAS_CAX2L[s2tas] = ruva; } );
const WEH2_S2TAS_CA1ARA = Object.keys( WEH2_S2TAS_CAX2L ).sort( ( a, b ) => b.length - a.length );

const WEH2_BE_CAX2L: Record<string, number> = {};
WEH2_BE.forEach( ( s2tas, ruva ) => { WEH2_BE_CAX2L[s2tas] = ruva; } );
const WEH2_BE_CA1ARA = Object.keys( WEH2_BE_CAX2L ).sort( ( a, b ) => b.length - a.length );

// ⟨ ᶅſɔ ֭ſɭɹ ʌ ʃᴜ ſɭɹ ſןɹ }ʃꞇ 🌈 ⟩

function weh2Sak( j6fini: number ): string {
    return WEH2_S2TAS[j6fini >> 0o4] + WEH2_BE[j6fini & 0o17];
}

function tboWeh2( okef: string ): string {
    const cataEskek = okef.trim().replace( /^#/, "" );
    let xaqadiK2fe = -0o1;
    let r, g, b;

    if ( /^[0-9a-fA-F]{6}$/.test( cataEskek ) ) {
        r = parseInt( cataEskek.slice( 0o0, 0o2 ), 0o20 );
        g = parseInt( cataEskek.slice( 0o2, 0o4 ), 0o20 );
        b = parseInt( cataEskek.slice( 0o4, 0o6 ), 0o20 );
    } else if ( /^[0-9a-fA-F]{8}$/.test( cataEskek ) ) {
        xaqadiK2fe = parseInt( cataEskek.slice( 0o0, 0o2 ), 0o20 );
        r = parseInt( cataEskek.slice( 0o2, 0o4 ), 0o20 );
        g = parseInt( cataEskek.slice( 0o4, 0o6 ), 0o20 );
        b = parseInt( cataEskek.slice( 0o6, 0o10 ), 0o20 );
    } else {
        return TLOHK2NI;
    }

    /*
    * ⟨ ᶅſɔ ֭ſɭɹ ʌ j͑ʃɜ j͑ʃƨɹ ʌ ſɭɹ ſȷɔ ⟩
    */
    if ( xaqadiK2fe < 0o0 && r === g && g === b ) {
        const c2naEskek = weh2Sak( r );
        const sahakEskek = [ weh2Sak( r ), weh2Sak( r ), weh2Sak( r ), weh2Sak( r ) ].join( " " );
        return c2naEskek + " / " + sahakEskek;
    }

    // ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ᶅſɔ ֭ſɭɹ ⟩
    if ( xaqadiK2fe >= 0o0 ) {
        return [ weh2Sak( xaqadiK2fe ), weh2Sak( b ), weh2Sak( g ), weh2Sak( r ) ].join( " " );
    }
    return [ weh2Sak( b ), weh2Sak( g ), weh2Sak( r ) ].join( " " );
}

// ⟨ ᶅſɔ ֭ſɭɹ ʌ ʃᴜ ſɭɹ ſןɹ }ʃꞇ 🌈 ⟩

function cataWeh2Sak( silabo: string ): number | null {
    let fuKp6k2p2 = silabo;
    let konsonanto = -0o1;

    for ( const s2tas of WEH2_S2TAS_CA1ARA ) {
        if ( fuKp6k2p2.startsWith( s2tas ) ) {
            konsonanto = WEH2_S2TAS_CAX2L[s2tas];
            fuKp6k2p2 = fuKp6k2p2.slice( s2tas.length );
            break;
        }
    }
    if ( konsonanto < 0o0 ) return null;

    let vokalo = -0o1;
    for ( const s2tas of WEH2_BE_CA1ARA ) {
        if ( fuKp6k2p2.startsWith( s2tas ) ) {
            vokalo = WEH2_BE_CAX2L[s2tas];
            fuKp6k2p2 = fuKp6k2p2.slice( s2tas.length );
            break;
        }
    }
    if ( vokalo < 0o0 || fuKp6k2p2.length > 0o0 ) return null;

    return ( konsonanto << 0o4 ) | vokalo;
}

function p2saK2fe( j6fini: number ): string {
    return j6fini.toString( 0o20 ).padStart( 0o2, "0" ).toUpperCase();
}

function weh2AlOkef( okef: string ): string {
    const kefCa1ara = okef.trim().replace( /\//g, " " ).split( /\s+/ ).filter( kef => kef.length > 0o0 );
    if ( kefCa1ara.length === 0o0 ) return "";
    if ( kefCa1ara.length !== 0o1 && kefCa1ara.length !== 0o3 && kefCa1ara.length !== 0o4 ) return TLOHK2NI;

    const j6finiCa1ara = kefCa1ara.map( cataWeh2Sak );
    if ( j6finiCa1ara.some( j6fini => j6fini === null ) ) return TLOHK2NI;

    if ( kefCa1ara.length === 0o1 ) {
        const j6fini = j6finiCa1ara[0o0] as number;
        return "#" + p2saK2fe( j6fini ) + p2saK2fe( j6fini ) + p2saK2fe( j6fini );
    }

    if ( kefCa1ara.length === 0o4 ) {
        // ⟨ ᶅſɔ ֭ſɭɹ ( ARGB ) ⟩
        if ( j6finiCa1ara[0o0] === j6finiCa1ara[0o1] && j6finiCa1ara[0o1] === j6finiCa1ara[0o2] && j6finiCa1ara[0o2] === j6finiCa1ara[0o3] ) {
            const j6fini = j6finiCa1ara[0o0] as number;
            return "#" + p2saK2fe( j6fini ) + p2saK2fe( j6fini ) + p2saK2fe( j6fini );
        }
        const [ xaqadiK2fe, b, v, r ] = j6finiCa1ara as number[];
        return "#" + p2saK2fe( xaqadiK2fe ) + p2saK2fe( r ) + p2saK2fe( v ) + p2saK2fe( b );
    }

    const [ b, v, r ] = j6finiCa1ara as number[];
    return "#" + p2saK2fe( r ) + p2saK2fe( v ) + p2saK2fe( b );
}

// ⟪ j͐ʃw ſɭʞɔƽ ʌ ſɟᴜͷ̗ 📡 ⟫

const kfeniKev = document.getElementById( "kemia-enigo" ) as HTMLInputElement;
const kfeniCeme = document.getElementById( "kemia-eligo" ) as HTMLElement;
const weh2Kev = document.getElementById( "koloro-enigo" ) as HTMLInputElement;
const weh2Ceme = document.getElementById( "koloro-eligo" ) as HTMLElement;

const CATA_S2TAS = [ "(", ")", "/", "-" ];

function cemeKef( kubaEskek: HTMLElement, kef: string ): void {
    kubaEskek.innerHTML = "";
    if ( !kef ) return;

    const kekCa1ara = kef.split( " " );
    for ( let i = 0o0; i < kekCa1ara.length; i++ ) {
        const kek = kekCa1ara[i];
        if ( !kek ) continue;

        if ( CATA_S2TAS.includes( kek ) ) {
            kubaEskek.appendChild( document.createTextNode( kek ) );
        } else {
            const puf2Eskek = document.createElement( "span" );
            puf2Eskek.className = "cepufalxez";
            puf2Eskek.textContent = kek;
            kubaEskek.appendChild( puf2Eskek );
        }

        if ( i < kekCa1ara.length - 0o1 ) {
            kubaEskek.appendChild( document.createTextNode( " " ) );
        }
    }
}

function cemeKfeni(): void {
    const kp6k2p2 = kfeniKev.value.trim();
    if ( !kp6k2p2 ) {
        kfeniCeme.textContent = "";
        return;
    }

    const quqOkef = /^[A-Za-z0-9]+$/.test( kp6k2p2 );
    cemeKef( kfeniCeme, quqOkef ? tboKef( kp6k2p2 ) : kefAlOkef( kp6k2p2 ) );
}

function cemeWeh2(): void {
    const kp6k2p2 = weh2Kev.value.trim();
    if ( !kp6k2p2 ) {
        weh2Ceme.textContent = "";
        return;
    }

    const quqK2fe = /^#?[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test( kp6k2p2 );
    cemeKef( weh2Ceme, quqK2fe ? tboWeh2( kp6k2p2 ) : weh2AlOkef( kp6k2p2 ) );
}

kfeniKev.addEventListener( "input", cemeKfeni );
weh2Kev.addEventListener( "input", cemeWeh2 );

// ⟪ j͑ʃᴜ ı],ɔ 🚀 ⟫

kfeniKev.value = "H2O";
weh2Kev.value = "F0F0F0";
cemeKfeni();
cemeWeh2();
