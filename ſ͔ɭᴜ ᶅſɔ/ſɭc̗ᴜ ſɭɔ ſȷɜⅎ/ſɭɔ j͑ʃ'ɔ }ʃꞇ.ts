// ≺⧼ ſɭɔ j͑ʃ'ɔ }ʃꞇ - ſɭc̗ᴜ ſɭɔ ſȷɜⅎ 🔬 ⧽≻

const TLOHK2NI = "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )";

// ⟪ ſɭʞɔ }ʃꞇ ʌ ſɟᴜ ı],ɹͷ̗ ⚛️ ⟫

/**
* ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ ʌ ſɭɹ ſȷɔ 📃 ⟩
* j͑ʃᴜ ı],ɔ ʌ ſɭɹ ſȷɔ
*/
const SAXE_CA1ARA = [ "֭ſɭ", "ı],", "ſן", "ɭʃ", "ᶅſ", "ſɭ,", "j͑ʃ'", "ſɟ" ];
const S2TAS_CA1ARA = [ "ᴜ̩", "ᶗ‹", "ɘ", "ƨ", "п́", "ƴ", "ⰱ", "ᴜ̭" ];

/**
* ⟨ ſɭɹ ſȷɔ 📃 ⟩
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
* ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɭɹ ſȷɔ
*/
const BE_CA1ARA = [ "ɔ", "ᴜ", "ɹ", "ꞇ", "ɜ", "э", "w", "ɜⅎ" ];

// ⟨ ſɭɹ ſȷɔ 📃 ⟩
const SOST2_CA1ARA = [ "", "ȝ", "ɔ˞", "ⱷ̮̀", "ʞ", "c̭", "ƽ", "c̗" ];

// ⟨ ſɭɹ ſȷɔ 📃 ⟩
const PUF2_CA1ARA = [ "֭ſɭ", "ſ͕ɭ", "j͑ʃ", "ſ͕ȷ", "ſȷ", "ŋᷠ", "ſɭ", "}ʃ" ];

// ⟨ ʃɔ 📃 ⟩
const CATA_ESKEK = "ɔ";
const S2TAS_L = "j͐ʃ";

const BE_CAX2L: Record<string, number> = {};
SAXE_CA1ARA.forEach( ( s2tas, k2fe ) => { BE_CAX2L[s2tas] = k2fe; } );
BE_CAX2L["ɔⅎ"] = 0o0;
BE_CAX2L["эⅎ"] = 0o5;
const BE_S2TAS = Object.keys( BE_CAX2L ).sort( ( saxeS2tas, psazS2tas ) => psazS2tas.length - saxeS2tas.length );

const PUF2_CAX2L: Record<string, number> = {};
PUF2_CA1ARA.forEach( ( s2tas, k2fe ) => { PUF2_CAX2L[s2tas] = k2fe; } );
const PUF2_S2TAS = Object.keys( PUF2_CAX2L ).sort( ( saxeS2tas, psazS2tas ) => psazS2tas.length - saxeS2tas.length );

const SOST2_CAX2L: Record<string, number> = {};
SOST2_CA1ARA.forEach( ( s2tas, k2fe ) => { if ( s2tas ) SOST2_CAX2L[s2tas] = k2fe; } );
const SOST2_S2TAS = Object.keys( SOST2_CAX2L ).sort( ( saxeS2tas, psazS2tas ) => psazS2tas.length - saxeS2tas.length );

const KFENI_CA1ARA = "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split( " " );

// ⟨ ſɭʞɔ }ʃꞇ ʌ ʃᴜ ſɭɹ ſןɹ }ʃꞇ ⚛️ ⟩

function cataOkef( k61e: string ): { s2tas: string; vek2fe: number }[] | null {
    const okefKekCa1ara: { s2tas: string; vek2fe: number }[] = [];
    let caxef2K2fe = 0o0;

    while ( caxef2K2fe < k61e.length ) {
        const caxef2 = k61e[caxef2K2fe];
        if ( caxef2 >= "A" && caxef2 <= "Z" ) {
            let s2tas = caxef2;
            caxef2K2fe++;
            if ( caxef2K2fe < k61e.length && k61e[caxef2K2fe] >= "a" && k61e[caxef2K2fe] <= "z" ) {
                s2tas += k61e[caxef2K2fe];
                caxef2K2fe++;
            }
            let vek2fe = 0o1;
            if ( caxef2K2fe < k61e.length && k61e[caxef2K2fe] >= "0" && k61e[caxef2K2fe] <= "9" ) {
                const saxeK2fe = caxef2K2fe;
                while ( caxef2K2fe < k61e.length && k61e[caxef2K2fe] >= "0" && k61e[caxef2K2fe] <= "9" ) caxef2K2fe++;
                vek2fe = parseInt( k61e.slice( saxeK2fe, caxef2K2fe ), 0o12 );
            }
            okefKekCa1ara.push( { s2tas, vek2fe } );
        } else {
            return null;
        }
    }

    return okefKekCa1ara;
}

/**
* ſɭʞɹ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( CC CCeC )
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @returns ſɭɔʞ
*/
function k2fKef( k2fe: number, vek2fe: number ): string | null {
    if ( k2fe < 0o1 || k2fe > KFENI_CA1ARA.length ) return null;
    if ( vek2fe < 0o0 || !Number.isSafeInteger( vek2fe ) ) return null;

    const knakEskek = k2fe.toString( 0o10 );
    let xaqadiEskek = SAXE_CA1ARA[parseInt( knakEskek[0o0], 0o12 )];
    if ( knakEskek.length >= 0o2 ) xaqadiEskek += S2TAS_CA1ARA[parseInt( knakEskek[0o1], 0o12 )];
    if ( knakEskek.length === 0o3 ) xaqadiEskek += CATA_ESKEK + S2TAS_CA1ARA[parseInt( knakEskek[0o2], 0o12 )];

    const vek2feCa1ara = vek2fe.toString( 0o10 ).split( "" ).map( caxef2 => parseInt( caxef2, 0o12 ) );
    const vem2 = vek2feCa1ara.length;

    if ( vem2 === 0o1 ) return xaqadiEskek + BE_CA1ARA[vek2feCa1ara[0o0]];

    const kekCa1ara: string[] = [];
    let vek2feK2fe = 0o0;

    if ( vem2 % 0o2 === 0o1 ) {
        // ⟨ ſɭɹ ſȷɔ ( 1 ) 📃 ⟩
        xaqadiEskek += BE_CA1ARA[vek2feCa1ara[0o0]];
        vek2feK2fe = 0o1;
    } else if ( knakEskek.length === 0o2 ) {
        // ⟨ ſɭɹ ſȷɔ 📃 ⟩
        xaqadiEskek += BE_CA1ARA[vek2feCa1ara[0o0]];
        kekCa1ara.push( xaqadiEskek );
        kekCa1ara.push( S2TAS_L + BE_CA1ARA[vek2feCa1ara[0o1]] );
        vek2feK2fe = 0o2;
    } else {
        // ⟨ ſɭɹ ſȷɔ ( 1 ) 📃 ⟩
        xaqadiEskek += SOST2_CA1ARA[vek2feCa1ara[0o0]] + BE_CA1ARA[vek2feCa1ara[0o1]];
        vek2feK2fe = 0o2;
    }

    if ( kekCa1ara.length === 0o0 ) kekCa1ara.push( xaqadiEskek );

    while ( vek2feK2fe < vem2 ) {
        kekCa1ara.push( PUF2_CA1ARA[vek2feCa1ara[vek2feK2fe]] + BE_CA1ARA[vek2feCa1ara[vek2feK2fe + 0o1]] );
        vek2feK2fe += 0o2;
    }

    return kekCa1ara.join( " " );
}

function tboKef( k61e: string ): string {
    const okefKekCa1ara = cataOkef( k61e );
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
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅
 * @returns ſᶘɔⅎ }ʃꞇ
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
* ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔʞ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( 0 )
 * @returns ı],ɔƴ
*/
function saxeEskek( kef: string ): boolean {
    if ( !kef.startsWith( SAXE_CA1ARA[0o0] ) ) {
        for ( let saxeK2fe = 0o1; saxeK2fe < SAXE_CA1ARA.length; saxeK2fe++ ) {
            if ( kef.startsWith( SAXE_CA1ARA[saxeK2fe] ) ) return true;
        }
        return false;
    }
    return !saxeBe( kef.slice( SAXE_CA1ARA[0o0].length ) );
}

function k2fOkef( kekCa1ara: { s2tas: string; vek2fe: number }[] ): string {
    return kekCa1ara.map( kek => kek.vek2fe === 0o1 ? kek.s2tas : kek.s2tas + kek.vek2fe ).join( "" );
}

function kefAlOkef( k61e: string ): string {
    const kefCa1ara = k61e.trim().split( /\s+/ ).filter( kef => kef.length > 0o0 );
    if ( kefCa1ara.length === 0o0 ) return "";

    const kekCa1ara: { s2tas: string; vek2fe: number }[] = [];
    let kefK2fe = 0o0;

    while ( kefK2fe < kefCa1ara.length ) {
        // ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ ʌ ſɭɹ ſȷɔ 📃 ⟩
        let fuKp6k2p2 = kefCa1ara[kefK2fe];
        const k2feCa1ara: number[] = [];

        let saxeB6n2ba = false;
        for ( let saxeK2fe = 0o0; saxeK2fe < SAXE_CA1ARA.length; saxeK2fe++ ) {
            if ( fuKp6k2p2.startsWith( SAXE_CA1ARA[saxeK2fe] ) ) {
                k2feCa1ara.push( saxeK2fe );
                fuKp6k2p2 = fuKp6k2p2.slice( SAXE_CA1ARA[saxeK2fe].length );
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
                for ( let s2tasK2fe = 0o0; s2tasK2fe < S2TAS_CA1ARA.length; s2tasK2fe++ ) {
                    if ( eskek.startsWith( S2TAS_CA1ARA[s2tasK2fe] ) ) { k2fe = s2tasK2fe; break; }
                }
                if ( k2fe < 0o0 ) break;
                if ( eB6n2ba ) return TLOHK2NI;
                k2feCa1ara.push( k2fe );
                fuKp6k2p2 = eskek.slice( S2TAS_CA1ARA[k2fe].length );
                eB6n2ba = true;
                continue;
            }
            let k2fe = -0o1;
            for ( let s2tasK2fe = 0o0; s2tasK2fe < S2TAS_CA1ARA.length; s2tasK2fe++ ) {
                if ( fuKp6k2p2.startsWith( S2TAS_CA1ARA[s2tasK2fe] ) ) { k2fe = s2tasK2fe; break; }
            }
            if ( k2fe < 0o0 ) break;
            if ( eB6n2ba ) return TLOHK2NI;
            k2feCa1ara.push( k2fe );
            fuKp6k2p2 = fuKp6k2p2.slice( S2TAS_CA1ARA[k2fe].length );
        }

        if ( k2feCa1ara.length > 0o3 ) return TLOHK2NI;
        let k2fe = 0o0;
        for ( const k2feKek of k2feCa1ara ) k2fe = k2fe * 0o10 + k2feKek;
        if ( k2fe < 0o1 || k2fe > KFENI_CA1ARA.length ) return TLOHK2NI;

        // ⟨ ſɭɹ ſȷɔ ( 1 ) 📃 ⟩
        const xaqadiEskek = cataK2fe( fuKp6k2p2, null );
        if ( xaqadiEskek === null || xaqadiEskek.fuKp6k2p2.length > 0o0 ) return TLOHK2NI;
        const vek2feCa1ara = xaqadiEskek.k2feCa1ara;
        let haxe = xaqadiEskek.haxe;
        kefK2fe++;

        // ⟨ ſɭɹ ſȷɔ ʌ ſɭɔʞ 📃 ⟩
        while ( kefK2fe < kefCa1ara.length && !saxeEskek( kefCa1ara[kefK2fe] ) ) {
            const eskek = cataK2fe( kefCa1ara[kefK2fe], haxe );
            if ( eskek === null || eskek.fuKp6k2p2.length > 0o0 ) return TLOHK2NI;
            vek2feCa1ara.push( ...eskek.k2feCa1ara );
            haxe = eskek.haxe;
            kefK2fe++;
        }

        let vek2fe = 0o1;
        if ( vek2feCa1ara.length > 0o0 ) {
            vek2fe = parseInt( vek2feCa1ara.join( "" ), 0o10 );
        }

        kekCa1ara.push( { s2tas: KFENI_CA1ARA[k2fe - 0o1], vek2fe } );
    }

    return k2fOkef( kekCa1ara );
}

// ⟪ ᶅſɔ ֭ſɭɹ ʌ ſɟᴜ ı],ɹͷ̗ 🌈 ⟫

// ⟨ ſןɹ j͑ʃᴜ ʌ ſɭɔʞ ( 1 #n-n-n- ) 📃 ⟩
const WEH2_S2TAS = [ "ᶅſ", "ſן", "ſȷ", "ŋᷠ", "ɽ͑ʃ'", "ɭʃ", "j͑ʃ", "}ʃ", "ɭl̀", "ſɟ", "ı],", "ſ͕ȷ", "ſ͔ɭ", "ſɭ", "֭ſɭ", "ſ͕ɭ" ];

// ⟨ ſןɹ j͑ʃᴜ ʌ ſɭɔʞ ( 2 #-n-n-n ) 📃 ⟩
const WEH2_BE = [ "w", "ɔ", "ᴜ", "ꞇ", "wⰱ", "ɔⰱ", "ᴜⰱ", "ꞇⰱ", "ɹ", "ɹⰱ", "ɜ", "ɜⰱ", "э", "эⰱ", "эⅎ", "эⅎⰱ" ];

const WEH2_S2TAS_CAX2L: Record<string, number> = {};
WEH2_S2TAS.forEach( ( s2tas, k2fe ) => { WEH2_S2TAS_CAX2L[s2tas] = k2fe; } );
const WEH2_S2TAS_CA1ARA = Object.keys( WEH2_S2TAS_CAX2L ).sort( ( saxeS2tas, psazS2tas ) => psazS2tas.length - saxeS2tas.length );

const WEH2_BE_CAX2L: Record<string, number> = {};
WEH2_BE.forEach( ( s2tas, k2fe ) => { WEH2_BE_CAX2L[s2tas] = k2fe; } );
const WEH2_BE_CA1ARA = Object.keys( WEH2_BE_CAX2L ).sort( ( saxeS2tas, psazS2tas ) => psazS2tas.length - saxeS2tas.length );

// ⟨ ᶅſɔ ֭ſɭɹ ʌ ʃᴜ ſɭɹ ſןɹ }ʃꞇ 🌈 ⟩

function weh2Sak( j6fini: number ): string {
    return WEH2_S2TAS[j6fini >> 0o4] + WEH2_BE[j6fini & 0o17];
}

function tboWeh2( k61e: string ): string {
    const cataEskek = k61e.trim().replace( /^#/, "" );
    let xaqadiK2fe = -0o1;
    let wela, lha, c2s2k;

    if ( /^[0-9a-fA-F]{6}$/.test( cataEskek ) ) {
        wela = parseInt( cataEskek.slice( 0o0, 0o2 ), 0o20 );
        lha = parseInt( cataEskek.slice( 0o2, 0o4 ), 0o20 );
        c2s2k = parseInt( cataEskek.slice( 0o4, 0o6 ), 0o20 );
    } else if ( /^[0-9a-fA-F]{8}$/.test( cataEskek ) ) {
        xaqadiK2fe = parseInt( cataEskek.slice( 0o0, 0o2 ), 0o20 );
        wela = parseInt( cataEskek.slice( 0o2, 0o4 ), 0o20 );
        lha = parseInt( cataEskek.slice( 0o4, 0o6 ), 0o20 );
        c2s2k = parseInt( cataEskek.slice( 0o6, 0o10 ), 0o20 );
    } else {
        return TLOHK2NI;
    }

    /*
    * ⟨ ᶅſɔ ֭ſɭɹ ʌ j͑ʃɜ j͑ʃƨɹ ʌ ſɭɹ ſȷɔ 📃 ⟩
    */
    if ( xaqadiK2fe < 0o0 && wela === lha && lha === c2s2k ) {
        const c2naEskek = weh2Sak( wela );
        const sahakEskek = [ weh2Sak( wela ), weh2Sak( wela ), weh2Sak( wela ), weh2Sak( wela ) ].join( " " );
        return c2naEskek + " / " + sahakEskek;
    }

    // ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟩
    if ( xaqadiK2fe >= 0o0 ) {
        return [ weh2Sak( xaqadiK2fe ), weh2Sak( c2s2k ), weh2Sak( lha ), weh2Sak( wela ) ].join( " " );
    }
    return [ weh2Sak( c2s2k ), weh2Sak( lha ), weh2Sak( wela ) ].join( " " );
}

// ⟨ ᶅſɔ ֭ſɭɹ ʌ ʃᴜ ſɭɹ ſןɹ }ʃꞇ 🌈 ⟩

function cataWeh2Sak( xez: string ): number | null {
    let fuKp6k2p2 = xez;
    let ketuK2fe = -0o1;

    for ( const s2tas of WEH2_S2TAS_CA1ARA ) {
        if ( fuKp6k2p2.startsWith( s2tas ) ) {
            ketuK2fe = WEH2_S2TAS_CAX2L[s2tas];
            fuKp6k2p2 = fuKp6k2p2.slice( s2tas.length );
            break;
        }
    }
    if ( ketuK2fe < 0o0 ) return null;

    let waja = -0o1;
    for ( const s2tas of WEH2_BE_CA1ARA ) {
        if ( fuKp6k2p2.startsWith( s2tas ) ) {
            waja = WEH2_BE_CAX2L[s2tas];
            fuKp6k2p2 = fuKp6k2p2.slice( s2tas.length );
            break;
        }
    }
    if ( waja < 0o0 || fuKp6k2p2.length > 0o0 ) return null;

    return ( ketuK2fe << 0o4 ) | waja;
}

function p2saK2fe( j6fini: number ): string {
    return j6fini.toString( 0o20 ).padStart( 0o2, "0" ).toUpperCase();
}

function weh2AlOkef( k61e: string ): string {
    const kefCa1ara = k61e.trim().replace( /\//g, " " ).split( /\s+/ ).filter( kef => kef.length > 0o0 );
    if ( kefCa1ara.length === 0o0 ) return "";
    if ( kefCa1ara.length !== 0o1 && kefCa1ara.length !== 0o3 && kefCa1ara.length !== 0o4 ) return TLOHK2NI;

    const j6finiCa1ara = kefCa1ara.map( cataWeh2Sak );
    if ( j6finiCa1ara.some( j6fini => j6fini === null ) ) return TLOHK2NI;

    if ( kefCa1ara.length === 0o1 ) {
        const j6fini = j6finiCa1ara[0o0] as number;
        return "#" + p2saK2fe( j6fini ) + p2saK2fe( j6fini ) + p2saK2fe( j6fini );
    }

    if ( kefCa1ara.length === 0o4 ) {
        // ⟨ ᶅſɔ ֭ſɭɹ ( ARGB ) 📃 ⟩
        if ( j6finiCa1ara[0o0] === j6finiCa1ara[0o1] && j6finiCa1ara[0o1] === j6finiCa1ara[0o2] && j6finiCa1ara[0o2] === j6finiCa1ara[0o3] ) {
            const j6fini = j6finiCa1ara[0o0] as number;
            return "#" + p2saK2fe( j6fini ) + p2saK2fe( j6fini ) + p2saK2fe( j6fini );
        }
        const [ xaqadiK2fe, c2s2k, lha, wela ] = j6finiCa1ara as number[];
        return "#" + p2saK2fe( xaqadiK2fe ) + p2saK2fe( wela ) + p2saK2fe( lha ) + p2saK2fe( c2s2k );
    }

    const [ c2s2k, lha, wela ] = j6finiCa1ara as number[];
    return "#" + p2saK2fe( wela ) + p2saK2fe( lha ) + p2saK2fe( c2s2k );
}

// ⟪ j͐ʃw ſɭʞɔƽ ʌ ſɟᴜͷ̗ 📡 ⟫

const kfeniKev = document.getElementById( "kfeni-kev" ) as HTMLInputElement;
const kfeniCeme = document.getElementById( "kfeni-ceme" ) as HTMLElement;
const weh2Kev = document.getElementById( "weh2-kev" ) as HTMLInputElement;
const weh2Ceme = document.getElementById( "weh2-ceme" ) as HTMLElement;

const CATA_S2TAS = [ "(", ")", "/", "-" ];

function cemeKef( kubaEskek: HTMLElement, kef: string ): void {
    kubaEskek.innerHTML = "";
    if ( !kef ) return;

    const kekCa1ara = kef.split( " " );
    for ( let kekK2fe = 0o0; kekK2fe < kekCa1ara.length; kekK2fe++ ) {
        const kek = kekCa1ara[kekK2fe];
        if ( !kek ) continue;

        if ( CATA_S2TAS.includes( kek ) ) {
            kubaEskek.appendChild( document.createTextNode( kek ) );
        } else {
            const puf2Eskek = document.createElement( "span" );
            puf2Eskek.className = "cepufalxez";
            puf2Eskek.textContent = kek;
            kubaEskek.appendChild( puf2Eskek );
        }

        if ( kekK2fe < kekCa1ara.length - 0o1 ) {
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
