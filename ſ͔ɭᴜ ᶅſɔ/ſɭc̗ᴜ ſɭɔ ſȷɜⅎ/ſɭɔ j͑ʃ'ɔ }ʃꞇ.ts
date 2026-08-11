// ≺⧼ ſɭɔ j͑ʃ'ɔ }ʃꞇ - ſɭc̗ᴜ ſɭɔ ſȷɜⅎ 🔬 ⧽≻

const ERARO = "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )";

// ⟪ Kemiaj tabloj ⚛️ ⟫

// ⟨ La atomnumero ( bazo 8 ) ⟩
// La unua cifero uzas la komencan formon, la ceteraj la kodan formon.
const KEMIAJ_KOMENCAJ = [ "֭ſɭ", "ı],", "ſן", "ɭʃ", "ᶅſ", "ſɭ,", "j͑ʃ'", "ſɟ" ];
const KEMIAJ_KODAJ = [ "ᴜ̩", "ᶗ‹", "ɘ", "ƨ", "п́", "ƴ", "ⰱ", "ᴜ̭" ];

// ⟨ La kvanto ( nombro de atomoj ) ⟩
// Ĉiu cifero estas aŭ vokalo aŭ konsonanto; la ciferoj estas legitaj sinsekve.
// Vokaloj ( unuoj de la kvanto kaj unuaj ciferoj de grandaj kvantoj ).
const KEMIAJ_UNUOJ = [ "ɔ", "ᴜ", "ɹ", "ꞇ", "ɜ", "э", "w", "ɜⅎ" ];

// Infiksaj konsonantoj ( en la unua silabo ) - la kodaj formoj de la kalkulaj konsonantoj.
const KEMIAJ_INFIKSA = [ "", "ȝ", "ɔ˞", "ⱷ̮̀", "ʞ", "c̭", "ƽ", "c̗" ];

// Kalkulaj konsonantoj ( en la postaj silaboj ) - la komencaj formoj, kies kodaj formoj estas la infiksoj.
const KEMIAJ_GRANDA = [ "֭ſɭ", "ſ͕ɭ", "j͑ʃ", "ſ͕ȷ", "ſȷ", "ŋᷠ", "ſɭ", "}ʃ" ];

// Fonologiaj disigiloj: e ( ɔ ) disigas la CCc-konstruon, l ( j͐ʃ ) estas komenco por vokalo post vokalo.
const KEMIAJ_SEPARO = "ɔ";
const KEMIAJ_L = "j͐ʃ";

const KEMIAJ_UNUOJ_MAPO: Record<string, number> = {};
KEMIAJ_UNUOJ.forEach( ( glifo, ruva ) => { KEMIAJ_UNUOJ_MAPO[ glifo ] = ruva; } );
KEMIAJ_UNUOJ_MAPO[ "ɔⅎ" ] = 0;   // nazala ɔ
KEMIAJ_UNUOJ_MAPO[ "эⅎ" ] = 5;   // nazala э
const KEMIAJ_UNUOJ_ORD = Object.keys( KEMIAJ_UNUOJ_MAPO ).sort( ( a, b ) => b.length - a.length );

const KEMIAJ_GRANDA_MAPO: Record<string, number> = {};
KEMIAJ_GRANDA.forEach( ( glifo, ruva ) => { KEMIAJ_GRANDA_MAPO[ glifo ] = ruva; } );
const KEMIAJ_GRANDA_ORD = Object.keys( KEMIAJ_GRANDA_MAPO ).sort( ( a, b ) => b.length - a.length );

const KEMIAJ_INFIKSA_MAPO: Record<string, number> = {};
KEMIAJ_INFIKSA.forEach( ( glifo, ruva ) => { if ( glifo ) KEMIAJ_INFIKSA_MAPO[ glifo ] = ruva; } );
const KEMIAJ_INFIKSA_ORD = Object.keys( KEMIAJ_INFIKSA_MAPO ).sort( ( a, b ) => b.length - a.length );

const ELEMENTOJ = "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split( " " );

// ⟨ Kemia enkodigo ⚛️ ⟩

function analiziFormulon( okef: string ): { simbolo: string; kvanto: number }[] | null {
    const rezultoj: { simbolo: string; kvanto: number }[] = [];
    let i = 0;

    while ( i < okef.length ) {
        const kp6 = okef[ i ];
        if ( kp6 >= "A" && kp6 <= "Z" ) {
            let simbolo = kp6;
            i++;
            if ( i < okef.length && okef[ i ] >= "a" && okef[ i ] <= "z" ) {
                simbolo += okef[ i ];
                i++;
            }
            let kvanto = 1;
            if ( i < okef.length && okef[ i ] >= "0" && okef[ i ] <= "9" ) {
                const komenco = i;
                while ( i < okef.length && okef[ i ] >= "0" && okef[ i ] <= "9" ) i++;
                kvanto = parseInt( okef.slice( komenco, i ), 10 );
            }
            rezultoj.push( { simbolo, kvanto } );
        } else {
            return null;
        }
    }

    return rezultoj;
}

// La vorto konsistas el la atoma konstruo sekvata de la kvantaj ciferoj.
// Konstruo estas nur CC ( aŭ CCeC ); la e ( ɔ ) disigas trioblan konsonantaron.
// Por kvantoj kun 0o100+, la ciferoj estas skribataj kiel silaboj:
//   nepara nombro da ciferoj - unua cifero kiel nuda vokalo, poste (C V) paroj
//   para nombro da ciferoj - (C V) paroj, la unua C estas infiksa konsonanto
// Se la atoma konstruo jam estas CC kaj la kvanto bezonas konsonanton, uzu la
// formon "xhal6": vokalo + l ( j͐ʃ ) + vokalo.
function kemiaVorto( z: number, kvanto: number ): string | null {
    if ( z < 1 || z > ELEMENTOJ.length ) return null;
    if ( kvanto < 0 || !Number.isSafeInteger( kvanto ) ) return null;

    const okto = z.toString( 8 );
    let unua = KEMIAJ_KOMENCAJ[ parseInt( okto[ 0 ], 10 ) ];
    if ( okto.length >= 2 ) unua += KEMIAJ_KODAJ[ parseInt( okto[ 1 ], 10 ) ];
    if ( okto.length === 3 ) unua += KEMIAJ_SEPARO + KEMIAJ_KODAJ[ parseInt( okto[ 2 ], 10 ) ];

    const q = kvanto.toString( 8 ).split( "" ).map( c => parseInt( c, 10 ) );
    const D = q.length;

    if ( D === 1 ) return unua + KEMIAJ_UNUOJ[ q[ 0 ] ];

    const partoj: string[] = [];
    let i = 0;

    if ( D % 2 === 1 ) {
        // Nepara nombro da ciferoj: la unua cifero estas nuda vokalo.
        unua += KEMIAJ_UNUOJ[ q[ 0 ] ];
        i = 1;
    } else if ( okto.length === 2 ) {
        // CC-konstruo: "xhal6" - la unua cifero kiel vokalo, poste l + vokalo.
        unua += KEMIAJ_UNUOJ[ q[ 0 ] ];
        partoj.push( unua );
        partoj.push( KEMIAJ_L + KEMIAJ_UNUOJ[ q[ 1 ] ] );
        i = 2;
    } else {
        // Para nombro da ciferoj: infiksa konsonanto + vokalo en la unua silabo.
        unua += KEMIAJ_INFIKSA[ q[ 0 ] ] + KEMIAJ_UNUOJ[ q[ 1 ] ];
        i = 2;
    }

    if ( partoj.length === 0 ) partoj.push( unua );

    while ( i < D ) {
        partoj.push( KEMIAJ_GRANDA[ q[ i ] ] + KEMIAJ_UNUOJ[ q[ i + 1 ] ] );
        i += 2;
    }

    return partoj.join( " " );
}

function kemiaKodi( okef: string ): string {
    const formulo = analiziFormulon( okef );
    if ( !formulo || formulo.length === 0 ) return ERARO;

    const vortoj: string[] = [];
    for ( const parto of formulo ) {
        const z = ELEMENTOJ.indexOf( parto.simbolo ) + 1;
        if ( z === 0 ) return ERARO;
        const vorto = kemiaVorto( z, parto.kvanto );
        if ( vorto === null ) return ERARO;
        vortoj.push( vorto );
    }

    return vortoj.join( " " );
}

// ⟨ Kemia malkodigo ⚛️ ⟩

// Unu silabo de la kvanto: vokalo, konsonanto + vokalo, aŭ l ( j͐ʃ ) + vokalo.
// La ciferoj alternas konsonanto / vokalo; la l anstataŭas konsonantan pozicion ( xhal6 ).
function malkodiSilabon( teksto: string, startaEsperata: "K" | "V" | null ): { ciferoj: number[]; esperata: "K" | "V" | null; restanta: string } | null {
    const ciferoj: number[] = [];
    let restanta = teksto;
    let esperata = startaEsperata;

    while ( restanta.length > 0 ) {
        if ( restanta.startsWith( KEMIAJ_L ) ) {
            if ( esperata !== "K" ) return null;
            esperata = "V";
            restanta = restanta.slice( KEMIAJ_L.length );
            continue;
        }

        let valoro = -1;
        let tipo: "K" | "V" | null = null;
        let longo = 0;

        for ( const glifo of KEMIAJ_GRANDA_ORD ) {
            if ( restanta.startsWith( glifo ) ) {
                valoro = KEMIAJ_GRANDA_MAPO[ glifo ];
                tipo = "K";
                longo = glifo.length;
                break;
            }
        }
        if ( valoro < 0 ) {
            for ( const glifo of KEMIAJ_INFIKSA_ORD ) {
                if ( restanta.startsWith( glifo ) ) {
                    valoro = KEMIAJ_INFIKSA_MAPO[ glifo ];
                    tipo = "K";
                    longo = glifo.length;
                    break;
                }
            }
        }
        if ( valoro < 0 ) {
            for ( const glifo of KEMIAJ_UNUOJ_ORD ) {
                if ( restanta.startsWith( glifo ) ) {
                    valoro = KEMIAJ_UNUOJ_MAPO[ glifo ];
                    tipo = "V";
                    longo = glifo.length;
                    break;
                }
            }
        }
        if ( valoro < 0 || tipo === null ) return null;
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

// Ĉu la vorto komencas novan elementon? Nur komencaj formoj povas komenci elementon;
// tamen ֭ſɭ ( 0 ) ne povas komenci elementon, do sekvata de vokalo ĝi estas kvanta silabo.
function komencasElementon( vorto: string ): boolean {
    if ( !vorto.startsWith( KEMIAJ_KOMENCAJ[ 0 ] ) ) {
        for ( let i = 1; i < KEMIAJ_KOMENCAJ.length; i++ ) {
            if ( vorto.startsWith( KEMIAJ_KOMENCAJ[ i ] ) ) return true;
        }
        return false;
    }
    return !komencasVokalo( vorto.slice( KEMIAJ_KOMENCAJ[ 0 ].length ) );
}

function formatiFormulon( partoj: { simbolo: string; kvanto: number }[] ): string {
    return partoj.map( parto => parto.kvanto === 1 ? parto.simbolo : parto.simbolo + parto.kvanto ).join( "" );
}

function kemiaMalkodi( okef: string ): string {
    const vortoj = okef.trim().split( /\s+/ ).filter( vorto => vorto.length > 0 );
    if ( vortoj.length === 0 ) return "";

    const partoj: { simbolo: string; kvanto: number }[] = [];
    let i = 0;

    while ( i < vortoj.length ) {
        // ⟨ Nova elemento: atoma parto ⟩
        let restanta = vortoj[ i ];
        const zCiferoj: number[] = [];

        let komencaTrovita = false;
        for ( let k = 0; k < KEMIAJ_KOMENCAJ.length; k++ ) {
            if ( restanta.startsWith( KEMIAJ_KOMENCAJ[ k ] ) ) {
                zCiferoj.push( k );
                restanta = restanta.slice( KEMIAJ_KOMENCAJ[ k ].length );
                komencaTrovita = true;
                break;
            }
        }
        if ( !komencaTrovita ) return ERARO;

        let havasE = false;
        while ( true ) {
            if ( restanta.startsWith( KEMIAJ_SEPARO ) ) {
                const poste = restanta.slice( KEMIAJ_SEPARO.length );
                let koda = -1;
                for ( let k = 0; k < KEMIAJ_KODAJ.length; k++ ) {
                    if ( poste.startsWith( KEMIAJ_KODAJ[ k ] ) ) { koda = k; break; }
                }
                if ( koda < 0 ) break;   // la ɔ estas vokalo de la kvanto
                if ( havasE ) return ERARO;
                zCiferoj.push( koda );
                restanta = poste.slice( KEMIAJ_KODAJ[ koda ].length );
                havasE = true;
                continue;
            }
            let koda = -1;
            for ( let k = 0; k < KEMIAJ_KODAJ.length; k++ ) {
                if ( restanta.startsWith( KEMIAJ_KODAJ[ k ] ) ) { koda = k; break; }
            }
            if ( koda < 0 ) break;
            if ( havasE ) return ERARO;   // tria konsonanto sen e-separilo
            zCiferoj.push( koda );
            restanta = restanta.slice( KEMIAJ_KODAJ[ koda ].length );
        }

        if ( zCiferoj.length > 3 ) return ERARO;
        let z = 0;
        for ( const cifero of zCiferoj ) z = z * 8 + cifero;
        if ( z < 1 || z > ELEMENTOJ.length ) return ERARO;

        // ⟨ La unua silabo de la kvanto ( en ĉi tiu vorto ) ⟩
        const unua = malkodiSilabon( restanta, null );
        if ( unua === null || unua.restanta.length > 0 ) return ERARO;
        const qCiferoj = unua.ciferoj;
        let esperata = unua.esperata;
        i++;

        // ⟨ Daŭrigaj silaboj ( sekvaj vortoj ) ⟩
        while ( i < vortoj.length && !komencasElementon( vortoj[ i ] ) ) {
            const sekva = malkodiSilabon( vortoj[ i ], esperata );
            if ( sekva === null || sekva.restanta.length > 0 ) return ERARO;
            qCiferoj.push( ...sekva.ciferoj );
            esperata = sekva.esperata;
            i++;
        }

        let kvanto = 1;
        if ( qCiferoj.length > 0 ) {
            kvanto = parseInt( qCiferoj.join( "" ), 8 );
        }

        partoj.push( { simbolo: ELEMENTOJ[ z - 1 ], kvanto } );
    }

    return formatiFormulon( partoj );
}

// ⟪ Koloraj tabloj 🌈 ⟫

// La unua paro ( #n-n-n- ) estas reprezentita per konsonantoj.
const KOLORAJ_KONSONANTOJ = [ "ᶅſ", "ſן", "ſȷ", "ŋᷠ", "ɽ͑ʃ'", "ɭʃ", "j͑ʃ", "}ʃ", "ɭl̀", "ſɟ", "ı],", "ſ͕ȷ", "ſ͔ɭ", "ſɭ", "֭ſɭ", "ſ͕ɭ" ];

// La dua paro ( #-n-n-n ) estas reprezentita per vokalaj finaĵoj.
const KOLORAJ_VOKALOJ = [ "w", "ɔ", "ᴜ", "ꞇ", "wⰱ", "ɔⰱ", "ᴜⰱ", "ꞇⰱ", "ɹ", "ɹⰱ", "ɜ", "ɜⰱ", "э", "эⰱ", "эⅎ", "эⅎⰱ" ];

const KOLORAJ_KONSONANTOJ_MAPO: Record<string, number> = {};
KOLORAJ_KONSONANTOJ.forEach( ( glifo, ruva ) => { KOLORAJ_KONSONANTOJ_MAPO[ glifo ] = ruva; } );
const KOLORAJ_KONSONANTOJ_ORD = Object.keys( KOLORAJ_KONSONANTOJ_MAPO ).sort( ( a, b ) => b.length - a.length );

const KOLORAJ_VOKALOJ_MAPO: Record<string, number> = {};
KOLORAJ_VOKALOJ.forEach( ( glifo, ruva ) => { KOLORAJ_VOKALOJ_MAPO[ glifo ] = ruva; } );
const KOLORAJ_VOKALOJ_ORD = Object.keys( KOLORAJ_VOKALOJ_MAPO ).sort( ( a, b ) => b.length - a.length );

// ⟨ Kolora enkodigo 🌈 ⟩

function koloroSilabo( valoro: number ): string {
    return KOLORAJ_KONSONANTOJ[ valoro >> 4 ] + KOLORAJ_VOKALOJ[ valoro & 0o17 ];
}

function koloroKodi( okef: string ): string {
    const purigita = okef.trim().replace( /^#/, "" );
    let alfo = -1;
    let r, g, b;

    if ( /^[0-9a-fA-F]{6}$/.test( purigita ) ) {
        r = parseInt( purigita.slice( 0, 2 ), 16 );
        g = parseInt( purigita.slice( 2, 4 ), 16 );
        b = parseInt( purigita.slice( 4, 6 ), 16 );
    } else if ( /^[0-9a-fA-F]{8}$/.test( purigita ) ) {
        alfo = parseInt( purigita.slice( 0, 2 ), 16 );
        r = parseInt( purigita.slice( 2, 4 ), 16 );
        g = parseInt( purigita.slice( 4, 6 ), 16 );
        b = parseInt( purigita.slice( 6, 8 ), 16 );
    } else {
        return ERARO;
    }

    // Griza koloro bezonas nur unu silabon, sed nur sen travidebleco:
    // kun alfo la kvar silaboj ( Travidebleco, Blua, Verda, Ruĝa ) estas ĉiam uzataj.
    if ( alfo < 0 && r === g && g === b ) {
        const mallonga = koloroSilabo( r );
        const longa = [ koloroSilabo( r ), koloroSilabo( r ), koloroSilabo( r ), koloroSilabo( r ) ].join( " " );
        return mallonga + " / " + longa;
    }

    // Ordo estas Travidebleco, Blua, Verda kaj Ruĝa.
    if ( alfo >= 0 ) {
        return [ koloroSilabo( alfo ), koloroSilabo( b ), koloroSilabo( g ), koloroSilabo( r ) ].join( " " );
    }
    return [ koloroSilabo( b ), koloroSilabo( g ), koloroSilabo( r ) ].join( " " );
}

// ⟨ Kolora malkodigo 🌈 ⟩

function malkodiKolorSilabon( silabo: string ): number | null {
    let restanta = silabo;
    let konsonanto = -1;

    for ( const glifo of KOLORAJ_KONSONANTOJ_ORD ) {
        if ( restanta.startsWith( glifo ) ) {
            konsonanto = KOLORAJ_KONSONANTOJ_MAPO[ glifo ];
            restanta = restanta.slice( glifo.length );
            break;
        }
    }
    if ( konsonanto < 0 ) return null;

    let vokalo = -1;
    for ( const glifo of KOLORAJ_VOKALOJ_ORD ) {
        if ( restanta.startsWith( glifo ) ) {
            vokalo = KOLORAJ_VOKALOJ_MAPO[ glifo ];
            restanta = restanta.slice( glifo.length );
            break;
        }
    }
    if ( vokalo < 0 || restanta.length > 0 ) return null;

    return ( konsonanto << 4 ) | vokalo;
}

function duCiferoj( valoro: number ): string {
    return valoro.toString( 16 ).padStart( 2, "0" ).toUpperCase();
}

function koloroMalkodi( okef: string ): string {
    const vortoj = okef.trim().replace( /\//g, " " ).split( /\s+/ ).filter( vorto => vorto.length > 0 );
    if ( vortoj.length === 0 ) return "";
    if ( vortoj.length !== 1 && vortoj.length !== 3 && vortoj.length !== 4 ) return ERARO;

    const valoroj = vortoj.map( malkodiKolorSilabon );
    if ( valoroj.some( valoro => valoro === null ) ) return ERARO;

    if ( vortoj.length === 1 ) {
        const valoro = valoroj[ 0 ] as number;
        return "#" + duCiferoj( valoro ) + duCiferoj( valoro ) + duCiferoj( valoro );
    }

    if ( vortoj.length === 4 ) {
        // Kvar identaj silaboj estas la longa griza formo ( ne ARGB ).
        if ( valoroj[ 0 ] === valoroj[ 1 ] && valoroj[ 1 ] === valoroj[ 2 ] && valoroj[ 2 ] === valoroj[ 3 ] ) {
            const valoro = valoroj[ 0 ] as number;
            return "#" + duCiferoj( valoro ) + duCiferoj( valoro ) + duCiferoj( valoro );
        }
        const [ alfo, bluo, verdo, ruĝo ] = valoroj as number[];
        return "#" + duCiferoj( alfo ) + duCiferoj( ruĝo ) + duCiferoj( verdo ) + duCiferoj( bluo );
    }

    const [ bluo, verdo, ruĝo ] = valoroj as number[];
    return "#" + duCiferoj( ruĝo ) + duCiferoj( verdo ) + duCiferoj( bluo );
}

// ⟪ Eventaj aŭskultiloj 📡 ⟫

const kemiaEnigo = document.getElementById( "kemia-enigo" ) as HTMLInputElement;
const kemiaEligo = document.getElementById( "kemia-eligo" ) as HTMLElement;
const koloroEnigo = document.getElementById( "koloro-enigo" ) as HTMLInputElement;
const koloroEligo = document.getElementById( "koloro-eligo" ) as HTMLElement;

const KOTASAKASUKP6 = [ "(", ")", "/", "-" ];

function eldoniKefon( celo: HTMLElement, kef: string ): void {
    celo.innerHTML = "";
    if ( !kef ) return;

    const partoj = kef.split( " " );
    for ( let i = 0; i < partoj.length; i++ ) {
        const parto = partoj[ i ];
        if ( !parto ) continue;

        if ( KOTASAKASUKP6.includes( parto ) ) {
            celo.appendChild( document.createTextNode( parto ) );
        } else {
            const maxema = document.createElement( "span" );
            maxema.className = "cepufalxez";
            maxema.textContent = parto;
            celo.appendChild( maxema );
        }

        if ( i < partoj.length - 1 ) {
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

// ⟪ Inicialigo 🚀 ⟫

kemiaEnigo.value = "H2O";
koloroEnigo.value = "F0F0F0";
aktualigiKemion();
aktualigiKoloron();
