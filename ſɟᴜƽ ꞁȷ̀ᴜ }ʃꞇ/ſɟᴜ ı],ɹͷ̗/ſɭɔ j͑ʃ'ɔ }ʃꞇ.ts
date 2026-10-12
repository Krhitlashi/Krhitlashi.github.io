// ≺⧼ ſɭɔ j͑ʃ'ɔ }ʃꞇ - ſɟᴜ ı],ɹͷ̗ 🔄 ⧽≻

// ⟪ j͑ʃɹ ſɭэ ſᶘɜ 💾 ⟫

let k2re10 = false;

// ⟨ ֭ſɭw }ʃᴜ ʌ j͑ʃɹ ſɭэ ſᶘɜ 🔑 ⟩
const ERARA_MARKO = "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )";
const SERĈANTA_STATO = "ſɭᶗ‹ɔ ʌ ꞁȷ̀ɹ ʃᴜ v ſɭᴜ }ʃɜ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ";
const ŜARGITA_STATO = "ſɭᶗ‹ɔ ʌ ſ͕ɭwȝ ʌ j͑ʃƨᴜ ſȷͷ̗ɹ ʌ j͑ʃп́ɔ j͑ʃ'ɜ ſןɹ";
const NEŜARGEBLA_STATO = "ſ͕ȷɜ j͑ʃ'ɔ ɭʃɔ ŋᷠɹ ʌ j͑ʃɜ ſᶘɹ ʌ j͑ʃп́ɔ j͑ʃ'ɜ ſןɹ";
const NENIU_REZULTO = "ſ͕ȷɜ ſ͕ɭwȝ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ";

// ⟨ ſɟᴜ ı],ɹͷ̗ j͑ʃƨᴜʞ j͐ʃɹ j͑ʃᴜꞇ 📅 ⟩
const t6ftifKev = document.getElementById( "kalendaro-enigo" ) as HTMLInputElement;
const t6ftif12nanu = document.getElementById( "nun-butono" ) as HTMLButtonElement;

// ⟨ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ 🕛 ⟩

// ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ - ֭ſɭɔ 🕛 ⟩
// 1 He = 4294967296 ( 0o40000000000 ) cikloj / 9192631770 ( 0o104373066732 ) ciklojn - ֭ſɭɔ ꞁȷ̀ꞇ }ʃᴜƽ
// ſɭɹ ſᶘɔ ʌ ſɭc̗ᴜ ſɭɹ ſȷɔ - 0o100
const SEKUNDOJ_POR_MINUTO = 0o74;
const SEKUNDOJ_POR_HORO = 0o7020;
const SEKUNDOJ_POR_TAGO = 0o250600;
const MILISEKUNDOJ_POR_HE = HE_L6VEM2 * 0o1750;
const HE_YN_L6QE = 0o100;
const HE_YN_L6HAQE = 0o10000;

const haqeaniKev = document.getElementById( "tempo-horoj" ) as HTMLInputElement;
const qeaniKev = document.getElementById( "tempo-minutoj" ) as HTMLInputElement;
const heaniKev = document.getElementById( "tempo-sekundoj" ) as HTMLInputElement;
let stifeh2K2fe = SEKUNDOJ_POR_TAGO / HE_L6VEM2;

const stifeh2EskekCa1ara = [
    { nomo: "shaqe", valoro: SHAQE_L6VEM2 },
    { nomo: "sqe", valoro: SQE_L6VEM2 },
    { nomo: "she", valoro: SHE_L6VEM2 },
    { nomo: "haqe", valoro: HAQE_L6VEM2 },
    { nomo: "qe", valoro: QE_L6VEM2 },
    { nomo: "he", valoro: HE_L6VEM2 }
];

// ⟨ ſןᴜ j͐ʃэ 📏 ⟩
const pal6C2taKev = document.getElementById( "longo-c2ta" ) as HTMLInputElement;
const pal6PeuKev = document.getElementById( "longo-peu" ) as HTMLInputElement;
const pal6MetroKev = document.getElementById( "longo-metro" ) as HTMLInputElement;
let pal6K2fe = 0o1;

// ⟨ ſɭɜ ʃɔ ʌ ʃᴜ ſɭɹ ſןɹ }ʃꞇ 🛡️ ⟩
function kobeHtml( teksto: string ): string {
    return teksto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

// ⟨ ı],ᴜ }ʃꞇ ſɭʞɔ }ʃꞇ j͑ʃᴜꞇ 🌡️ ⟩
const temperaturoHiaEnigo = document.getElementById( "temperaturo-hia" ) as HTMLInputElement;
const temperaturoKelvinoEnigo = document.getElementById( "temperaturo-kelvino" ) as HTMLInputElement;
const temperaturoCelsiusEnigo = document.getElementById( "temperaturo-celsius" ) as HTMLInputElement;
let temperaturoKelvino = 273.15;

// ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ( ı],ᴜ }ʃꞇ ſɭʞɔ }ʃꞇ j͑ʃᴜꞇ ) ⟩
const lokoEnigo = document.getElementById( "loko-enigo" ) as HTMLInputElement;
const lokoButono = document.getElementById( "loko-butono" ) as HTMLButtonElement;
const lokoMiaButono = document.getElementById( "loko-mia" ) as HTMLButtonElement;
const lokoRezultoj = document.getElementById( "loko-rezultoj" ) as HTMLElement;
const lokoStato = document.getElementById( "loko-stato" ) as HTMLElement;

// ⟨ ı],ᴜ }ʃꞇ ſɭʞɔ }ʃꞇ j͑ʃᴜꞇ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ 🌡️ ⟩
const lokoHia = document.getElementById( "loko-hia" ) as HTMLElement;
const lokoKelvino = document.getElementById( "loko-kelvino" ) as HTMLElement;
const lokoCelsius = document.getElementById( "loko-celsius" ) as HTMLElement;
let lokoTemperaturoPreta = false;

// ⟪ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɹ ſȷɔ 🔢 ⟫

// ⟨ ɭʃɀɜ ʌ ſɭɹ ſȷɔ ( ſɟᴜ ı],ɹͷ̗.js ASCII 0-7 ) ⟩
function parseBazo8( okef: string ): number {
    const negativa = okef.startsWith( "›" ) || okef.startsWith( "-" );
    const kerno = ( negativa ? okef.slice( 0o1 ) : okef ).trim();
    if ( !kerno ) return NaN;

    const partoj = kerno.split( " " );
    let valoro = 0o0;

    for ( const kp6 of partoj[0o0] ) {
        const ruva = K2FE.indexOf( kp6 );
        if ( ruva !== -0o1 ) { valoro = valoro * 0o10 + ruva; continue; }
        if ( kp6 >= "0" && kp6 <= "7" ) { valoro = valoro * 0o10 + ( kp6.charCodeAt( 0o0 ) - 0o60 ); continue; }
        return NaN;
    }

    if ( partoj.length > 0o1 ) {
        let dividanto = 0o10;
        for ( const kp6 of partoj[0o1] ) {
            const ruva = K2FE.indexOf( kp6 );
            const cifero = ruva !== -0o1 ? ruva : ( kp6 >= "0" && kp6 <= "7" ? kp6.charCodeAt( 0o0 ) - 0o60 : NaN );
            if ( isNaN( cifero ) ) return NaN;
            valoro += cifero / dividanto;
            dividanto *= 0o10;
        }
    }

    return negativa ? -valoro : valoro;
}

// ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɹ ſȷɔ ⟩
function formatiNombron( valoro: number ): string {
    if ( !isFinite( valoro ) ) return "";
    if ( k2re10 ) return parseFloat( valoro.toFixed( 0o12 ) ).toString();
    return skakefK2fe( vab6cajaDomani( valoro ) );
}

// ⟨ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
function legiNombron( enigo: HTMLInputElement ): number {
    const teksto = enigo.value.trim();
    if ( !teksto ) return NaN;
    return k2re10 ? parseFloat( teksto ) : parseBazo8( teksto );
}

// ⟨ ſɭɹʞ ʌ ſɭɹ ſȷɔ ⟩
function skribiNombron( enigo: HTMLInputElement, valoro: number ): void {
    enigo.value = formatiNombron( valoro );
}

// ⟪ ſɟᴜ ı],ɹͷ̗ j͑ʃƨᴜʞ j͐ʃɹ j͑ʃᴜꞇ 📅 ⟫

// ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɹ ſȷɔ ( ꞙɭ ) ⟩
function formatiKalendaron( valoro: number, ĉuDato: boolean ): string {
    if ( k2re10 ) return String( valoro );
    const gawe = document.documentElement.lang || "aih";
    const kp6Sak2fe = gawe === "en" ? "" : "ꞙɭ";
    return skakefK2fe( ( ĉuDato ? kp6Sak2fe : "" ) + vab6caja( valoro ) );
}

// ⟨ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ( datetime-local ) ⟩
function nunaLokaDatoKateno(): string {
    const nun = new Date();
    return new Date( nun.getTime() - nun.getTimezoneOffset() * 0o165140 ).toISOString().slice( 0o0, 0o20 );
}

function aktualigiKalendaron(): void {
    const valoro = t6ftifKev.value;
    if ( !valoro ) return;

    const dato = new Date( valoro );
    if ( isNaN( dato.getTime() ) ) return;

    const cax2l = cax2lStafl2( dato );
    const stifeh2 = castifeh2( dato );

    document.getElementById( "kalendaro-stibix" )!.textContent = formatiKalendaron( cax2l.stibix, true );
    document.getElementById( "kalendaro-pal2stif" )!.textContent = formatiKalendaron( cax2l.pal2stif, true );
    document.getElementById( "kalendaro-stafl2" )!.textContent = formatiKalendaron( cax2l.stafl2, true );

    document.getElementById( "kalendaro-shaqe" )!.textContent = formatiKalendaron( stifeh2.shaqe, false );
    document.getElementById( "kalendaro-sqe" )!.textContent = formatiKalendaron( stifeh2.sqe, false );
    document.getElementById( "kalendaro-she" )!.textContent = formatiKalendaron( stifeh2.she, false );
    document.getElementById( "kalendaro-haqe" )!.textContent = formatiKalendaron( stifeh2.haqe, false );
    document.getElementById( "kalendaro-qe" )!.textContent = formatiKalendaron( stifeh2.qe, false );
    document.getElementById( "kalendaro-he" )!.textContent = formatiKalendaron( stifeh2.he, false );
}

// ⟪ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ 🕛 ⟫

function aktualigiTempon(): void {
    const horoj = legiNombron( haqeaniKev );
    const minutoj = legiNombron( qeaniKev );
    const sekundoj = legiNombron( heaniKev );

    if ( isNaN( horoj ) && isNaN( minutoj ) && isNaN( sekundoj ) ) return;

    const sekundojSumaj =
        ( isNaN( horoj ) ? 0o0 : horoj ) * SEKUNDOJ_POR_HORO +
        ( isNaN( minutoj ) ? 0o0 : minutoj ) * SEKUNDOJ_POR_MINUTO +
        ( isNaN( sekundoj ) ? 0o0 : sekundoj );

    stifeh2K2fe = Math.max( 0o0, sekundojSumaj / HE_L6VEM2 );

    renduTempoUnuojn();
}

// ⟨ ſɭɹʞ ʌ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ⟩
function renduTempoEnigojn(): void {
    let fusuSekundoj = Math.floor( stifeh2K2fe * HE_L6VEM2 );
    const horoj = Math.floor( fusuSekundoj / SEKUNDOJ_POR_HORO ); fusuSekundoj %= SEKUNDOJ_POR_HORO;
    const minutoj = Math.floor( fusuSekundoj / SEKUNDOJ_POR_MINUTO ); fusuSekundoj %= SEKUNDOJ_POR_MINUTO;

    skribiNombron( haqeaniKev, horoj );
    skribiNombron( qeaniKev, minutoj );
    skribiNombron( heaniKev, fusuSekundoj );
}

function renduTempoUnuojn(): void {
    let restuHe = stifeh2K2fe;

    for ( let i = 0o0; i < stifeh2EskekCa1ara.length - 0o1; i++ ) {
        const unuo = stifeh2EskekCa1ara[i];
        const hePorUnuo = unuo.valoro / HE_L6VEM2;
        const kvanto = Math.floor( restuHe / hePorUnuo );
        document.getElementById( "tempo-" + unuo.nomo )!.textContent = formatiNombron( kvanto );
        restuHe %= hePorUnuo;
    }

    document.getElementById( "tempo-he" )!.textContent = formatiNombron( restuHe );
}

// ⟪ ſןᴜ j͐ʃэ 📏 ⟫

function traktiLonganEnigon( fonto: HTMLInputElement ): void {
    const valoro = legiNombron( fonto );
    if ( isNaN( valoro ) ) return;

    pal6K2fe =
        fonto === pal6C2taKev ? valoro * C2TA_L6XA3ENI :
        fonto === pal6PeuKev ? valoro * P0 :
        valoro;

    renduLongon();
}

function renduLongon(): void {
    skribiNombron( pal6C2taKev, pal6K2fe / C2TA_L6XA3ENI );
    skribiNombron( pal6PeuKev, pal6K2fe / P0 );
    skribiNombron( pal6MetroKev, pal6K2fe );
}

// ⟪ ı],ᴜ }ʃꞇ ſɭʞɔ }ʃꞇ j͑ʃᴜꞇ 🌡️ ⟫

function traktiTemperaturanEnigon( fonto: HTMLInputElement ): void {
    const valoro = legiNombron( fonto );
    if ( isNaN( valoro ) ) return;

    temperaturoKelvino =
        fonto === temperaturoHiaEnigo ? vaak2k2h2_hi( valoro ) :
        fonto === temperaturoCelsiusEnigo ? valoro + 273.15 :
        valoro;

    renduTemperaturon();
}

function renduTemperaturon(): void {
    skribiNombron( temperaturoHiaEnigo, vahi_ak2k2h2( temperaturoKelvino ) );
    skribiNombron( temperaturoKelvinoEnigo, temperaturoKelvino );
    skribiNombron( temperaturoCelsiusEnigo, temperaturoKelvino - 273.15 );
}

// ⟨ ſɟɔ ŋᷠɔ ʌ ı],ᴜ }ʃꞇ ſɭʞɔ }ʃꞇ j͑ʃᴜꞇ ⟩
function renduLokoTemperaturon(): void {
    if ( !lokoTemperaturoPreta ) {
        lokoHia.textContent = "—";
        lokoKelvino.textContent = "—";
        lokoCelsius.textContent = "—";
        return;
    }
    lokoHia.textContent = formatiNombron( vahi_ak2k2h2( temperaturoKelvino ) );
    lokoKelvino.textContent = formatiNombron( temperaturoKelvino );
    lokoCelsius.textContent = formatiNombron( temperaturoKelvino - 273.15 );
}

// ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ( Nominatim OpenStreetMap ) ⟩
async function serĉiLokon(): Promise<void> {
    const demando = lokoEnigo.value.trim();
    if ( !demando ) return;

    lokoRezultoj.innerHTML = "<p>" + skakefaniK2fe( SERĈANTA_STATO ) + "</p>";
    lokoRezultoj.classList.remove( "kobe" );

    try {
        const respondo = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent( demando )}&limit=5`
        );
        if ( !respondo.ok ) throw new Error( ERARA_MARKO );

        const rezultoj: { lat: string; lon: string; display_name: string }[] = await respondo.json();
        if ( rezultoj.length === 0o0 ) {
            lokoRezultoj.innerHTML = "<p>" + skakefaniK2fe( NENIU_REZULTO ) + "</p>";
            return;
        }

        lokoRezultoj.innerHTML = rezultoj.map( r =>
            `<button data-lat="${r.lat}" data-lon="${r.lon}" data-nomo="${encodeURIComponent( r.display_name )}">${kobeHtml( r.display_name )}</button>`
        ).join( "" );

        lokoRezultoj.querySelectorAll( "button" ).forEach( butono => {
            butono.addEventListener( "click", () => {
                const lat = parseFloat( butono.getAttribute( "data-lat" ) || "" );
                const lon = parseFloat( butono.getAttribute( "data-lon" ) || "" );
                const nomo = decodeURIComponent( butono.getAttribute( "data-nomo" ) || "" );
                lokoRezultoj.classList.add( "kobe" );
                lokoRezultoj.innerHTML = "";
                lokoStato.textContent = skakefaniK2fe( SERĈANTA_STATO );
                ŝargiLokon( lat, lon, ŜARGITA_STATO, nomo );
            } );
        } );
    } catch ( eraro ) {
        console.error( ERARA_MARKO, eraro );
        lokoRezultoj.innerHTML = "<p>" + skakefaniK2fe( NENIU_REZULTO ) + "</p>";
    }
}

// ⟨ ᶅſɔ ֭ſɭɹ ʌ ſ͕ɭɹ ſᶘɜ ( WMO ) ⟩
const VETERAJ_FONOJ: { testas: ( kodo: number ) => boolean; hela: string; malhela: string }[] = [
    { testas: kodo => kodo === 0o0, hela: "#88c8f8", malhela: "#58a8f8" },
    { testas: kodo => kodo === 0o1 || kodo === 0o2, hela: "#a8c8e8", malhela: "#88b8e8" },
    { testas: kodo => kodo === 0o3, hela: "#c8c8c8", malhela: "#a8a8a8" },
    { testas: kodo => kodo === 0o55 || kodo === 0o60, hela: "#e8e8e8", malhela: "#c8c8c8" },
    { testas: kodo => kodo >= 0o63 && kodo <= 0o71, hela: "#a8c8e8", malhela: "#88a8c8" },
    { testas: kodo => kodo >= 0o75 && kodo <= 0o103, hela: "#7888c8", malhela: "#5868a8" },
    { testas: kodo => kodo >= 0o107 && kodo <= 0o115, hela: "#f8f8f8", malhela: "#e8f8f8" },
    { testas: kodo => kodo >= 0o120 && kodo <= 0o122, hela: "#6878c8", malhela: "#4868a8" },
    { testas: kodo => kodo === 0o125 || kodo === 0o126, hela: "#f8f8f8", malhela: "#d8e8f8" },
    { testas: kodo => kodo >= 0o137, hela: "#4818a8", malhela: "#2828a8" },
];
const VETERA_ORIGINALA: { hela: string; malhela: string } = { hela: "#a8c8f8", malhela: "#58a8f8" };

// ⟨ ſɟᴜ ſȷᴜɔ˞ ʌ ᶅſɔ ֭ſɭɹ ( WMO ) ⟩
function veteroFono( kodo: number ): string {
    const gradiento = ( hela: string, malhela: string ) =>
        "linear-gradient( 45deg, " + koloroAlRgba( hela, 0o100 / 0xff ) + ", " + koloroAlRgba( malhela, 0o0 ) + " )";
    const fono = VETERAJ_FONOJ.find( opcio => opcio.testas( kodo ) ) || VETERA_ORIGINALA;
    return gradiento( fono.hela, fono.malhela );
}

// ⟨ ſ͕ɭɹȝ ʌ ı],ᴜ }ʃꞇ ſɭʞɔ }ʃꞇ j͑ʃᴜꞇ ( Open-Meteo ) ⟩
async function preniTemperaturon( lat: number, lon: number ): Promise<void> {
    try {
        const respondo = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );
        if ( !respondo.ok ) throw new Error( ERARA_MARKO );

        const datumoj: { current?: { temperature_2m?: number; weather_code?: number } } = await respondo.json();
        const celsiuso = datumoj.current?.temperature_2m;
        if ( typeof celsiuso !== "number" ) throw new Error( ERARA_MARKO );

        temperaturoKelvino = celsiuso + 273.15;
        lokoTemperaturoPreta = true;

        const veteroTablo = document.getElementById( "temperaturo-tabo" );
        if ( veteroTablo && typeof datumoj.current?.weather_code === "number" ) {
            veteroTablo.style.setProperty( "--vetero", veteroFono( datumoj.current.weather_code ) );
        }

        renduTemperaturon();
        renduLokoTemperaturon();
    } catch ( eraro ) {
        console.error( ERARA_MARKO, eraro );
        lokoTemperaturoPreta = false;
        renduLokoTemperaturon();
    }
}

// ⟪ j͑ʃɜ ſᶘɹ ʌ ɭʃэʞ ɭʃꞇʞ ☀️ ⟫

// ⟨ j͑ʃƽᴜ ſɭɔʞ ʌ ſɭɔʞ ⟩
function skakefaniK2fe( okef: string ): string {
    const gawe = document.documentElement.lang || "aih";
    return skakefK2fe( skakefani[gawe]?.[ okef ] ?? skakefani["aih"]?.[ okef ] ?? okef );
}

let sunaTago = {
    preta: false,
    sunlevigo: null as Date | null,
    sunsubiro: null as Date | null,
    sekvaSunlevigo: null as Date | null,
    tagoLongoHe: 0o0,
};

// ⟨ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɹ ſȷɔ ( 64 ſןᴜɔ˞ ɭʃꞇʞ ) ⟩
function bazo64Legi( he: number, tagoLongoHe: number ): [ number, number, number ] {
    const nivelo1 = tagoLongoHe / 0o100;
    const nivelo2 = tagoLongoHe / 0o10000;
    const nivelo3 = tagoLongoHe / 0o1000000;
    const kvanto1 = Math.floor( he / nivelo1 );
    const rest1 = he % nivelo1;
    const kvanto2 = Math.floor( rest1 / nivelo2 );
    const rest2 = rest1 % nivelo2;
    const kvanto3 = Math.floor( rest2 / nivelo3 );
    return [ kvanto1, kvanto2, kvanto3 ];
}

// ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ( aaaa-mm-tt ) ⟩
function formatiDaton( dato: Date ): string {
    const jaro = dato.getFullYear();
    const monato = String( dato.getMonth() + 0o1 ).padStart( 0o2, "0" );
    const tago = String( dato.getDate() ).padStart( 0o2, "0" );
    return jaro + "-" + monato + "-" + tago;
}

// ⟨ ſ͕ɭɹȝ ʌ ſןᴜɔ˞ ɭʃꞇʞ ( sunrise-sunset API ) ⟩
async function preniSunlevigonSunsubiron( lat: number, lng: number, dato: Date ): Promise<{ sunlevigo: Date; sunsubiro: Date }> {
    const datoKateno = formatiDaton( dato );
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${datoKateno}&formatted=0&tzid=UTC`;
    const respondo = await fetch( url );
    if ( !respondo.ok ) throw new Error( ERARA_MARKO );
    const datumoj = await respondo.json();
    if ( datumoj.status !== "OK" ) throw new Error( ERARA_MARKO );
    return {
        sunlevigo: new Date( datumoj.results.sunrise ),
        sunsubiro: new Date( datumoj.results.sunset ),
    };
}

// ⟨ ſ͕ɭɹȝ ʌ ſɭɔ˞ᴜ ſɭᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Nominatim reverse ) ⟩
async function preniLoknomon( lat: number, lng: number ): Promise<string> {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=10&accept-language=en`;
        const respondo = await fetch( url, { headers: { "User-Agent": "Freebuff/1.0" } } );
        if ( !respondo.ok ) return "";
        const datumoj = await respondo.json();
        const adreso = datumoj.address || {};
        const urbo = adreso.city || adreso.town || adreso.village || adreso.hamlet || "";
        const lando = adreso.country || "";
        if ( urbo && lando ) return urbo + ", " + lando;
        if ( urbo ) return urbo;
        if ( lando ) return lando;
        return "";
    } catch ( _ ) {
        return "";
    }
}

// ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃɜ ſᶘɹ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ⟩
async function aktualigiSunalokon( lat: number, lng: number ): Promise<void> {
    const nun = new Date();
    const hodiaŭ = new Date( nun.getFullYear(), nun.getMonth(), nun.getDate() );
    const morgaŭ = new Date( hodiaŭ );
    morgaŭ.setDate( morgaŭ.getDate() + 0o1 );

    const [ hodiaŭaj, morgaŭaj ] = await Promise.all( [
        preniSunlevigonSunsubiron( lat, lng, hodiaŭ ),
        preniSunlevigonSunsubiron( lat, lng, morgaŭ ),
    ] );

    sunaTago.sunlevigo = hodiaŭaj.sunlevigo;
    sunaTago.sunsubiro = hodiaŭaj.sunsubiro;
    sunaTago.sekvaSunlevigo = morgaŭaj.sunlevigo;
    sunaTago.tagoLongoHe = ( morgaŭaj.sunlevigo.getTime() - hodiaŭaj.sunlevigo.getTime() ) / MILISEKUNDOJ_POR_HE;

    if ( !isFinite( sunaTago.tagoLongoHe ) || sunaTago.tagoLongoHe <= 0o0 ) {
        sunaTago.preta = false;
        throw new Error( ERARA_MARKO );
    }

    sunaTago.preta = true;
    renduSubdividojn();
    renduSunanTagon();
    ĝisdatigiĈielon();
}

// ⟨ ſɟɔ ŋᷠɔ ʌ j͑ʃɜ ſᶘɹ ⟩
function renduSunanTagon(): void {
    if ( !sunaTago.preta ) return;
    const nun = new Date();
    const sunlevigo = sunaTago.sunlevigo as Date;
    const sunsubiro = sunaTago.sunsubiro as Date;
    const sekvaSunlevigo = sunaTago.sekvaSunlevigo as Date;
    if ( isNaN( sunlevigo.getTime() ) || isNaN( sunsubiro.getTime() ) || isNaN( sekvaSunlevigo.getTime() ) ) return;

    // ⟨ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɹ ſȷɔ ( 0 0 0 ſןᴜɔ˞ ɭʃꞇʞ ) ⟩
    const sunlevigo64 = bazo64Legi( 0o0, sunaTago.tagoLongoHe );
    const sunsubiro64 = bazo64Legi( ( sunsubiro.getTime() - sunlevigo.getTime() ) / MILISEKUNDOJ_POR_HE, sunaTago.tagoLongoHe );
    document.getElementById( "suno-sunlevigo" )!.textContent =
        [ sunlevigo64[0o0], sunlevigo64[0o1], sunlevigo64[0o2] ].map( v => formatiNombron( v ) ).join( " " );
    document.getElementById( "suno-sunsubiro" )!.textContent =
        [ sunsubiro64[0o0], sunsubiro64[0o1], sunsubiro64[0o2] ].map( v => formatiNombron( v ) ).join( " " );
    document.getElementById( "suno-tago-longeco" )!.textContent = formatiNombron( sunaTago.tagoLongoHe * HE_L6VEM2 / SEKUNDOJ_POR_HORO );

    // ⟨ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ( ſןᴜɔ˞ ɭʃꞇʞ ) ⟩
    let pasis = ( nun.getTime() - sunlevigo.getTime() ) / MILISEKUNDOJ_POR_HE;
    if ( pasis < 0o0 ) {
        pasis = ( nun.getTime() - ( sunlevigo.getTime() - sunaTago.tagoLongoHe * MILISEKUNDOJ_POR_HE ) ) / MILISEKUNDOJ_POR_HE;
    }
    pasis = pasis % sunaTago.tagoLongoHe;
    if ( pasis < 0o0 ) pasis += sunaTago.tagoLongoHe;

    // ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ ʌ ſɭɹ ſȷɔ ( 64 ) ⟩
    const [ kvanto1, kvanto2, kvanto3 ] = bazo64Legi( pasis, sunaTago.tagoLongoHe );

    document.getElementById( "suno-bazo64-ı" )!.textContent = formatiNombron( kvanto1 );
    document.getElementById( "suno-bazo64-ɿ" )!.textContent = formatiNombron( kvanto2 );
    document.getElementById( "suno-bazo64-ц" )!.textContent = formatiNombron( kvanto3 );

    // ⟨ ſɭɹ ſȷɔ ( Haqe Qe He ) ⟩
    const haqe = Math.floor( pasis / HE_YN_L6HAQE );
    const qe = Math.floor( ( pasis % HE_YN_L6HAQE ) / HE_YN_L6QE );
    const he = pasis % HE_YN_L6QE;
    document.getElementById( "suno-kutima-haqe" )!.textContent = formatiNombron( haqe );
    document.getElementById( "suno-kutima-qe" )!.textContent = formatiNombron( qe );
    document.getElementById( "suno-kutima-he" )!.textContent = formatiNombron( he );

    // ⟨ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɹ ſȷɔ ⟩
    const lumoLongo = ( sunsubiro.getTime() - sunlevigo.getTime() ) / 0o1750;
    const progreso = Math.min( 0o1, Math.max( 0o0, ( ( nun.getTime() - sunlevigo.getTime() ) / 0o1750 ) / lumoLongo ) );
    document.getElementById( "suno-progreso" )!.textContent = formatiNombron( progreso * ( k2re10 ? 0o144 : 0o100 ) );
}

// ⟨ ſɭɹ ſȷɔ ʌ j͑ʃɜ ſᶘɹ ⟩
function renduSubdividojn(): void {
    if ( !sunaTago.preta ) return;
    const tago = sunaTago.tagoLongoHe * HE_L6VEM2;
    const valoroj = [ tago / 0o100, tago / 0o10000, tago / 0o1000000 ];
    const sufiksoj = [ "ı", "ɿ", "ц" ];
    const unuoj = [
        { kodo: "sek", funkcio: ( sek: number ) => sek },
        { kodo: "min", funkcio: ( sek: number ) => sek / SEKUNDOJ_POR_MINUTO },
        { kodo: "hor", funkcio: ( sek: number ) => sek / SEKUNDOJ_POR_HORO },
        { kodo: "he", funkcio: ( sek: number ) => sek / HE_L6VEM2 },
        { kodo: "qe", funkcio: ( sek: number ) => sek / QE_L6VEM2 },
        { kodo: "haqe", funkcio: ( sek: number ) => sek / HAQE_L6VEM2 },
    ];
    for ( let i = 0o0; i < valoroj.length; i++ ) {
        for ( const unuo of unuoj ) {
            document.getElementById( `suno-sub-${unuo.kodo}-${sufiksoj[i]}` )!.textContent = formatiNombron( unuo.funkcio( valoroj[i] ) );
        }
    }
}

// ⟨ ſ͔ɭɔ j͐ʃɔɔ˞ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ⟩
const HAZARDAJ_LOKOJ: { nomo: string; lat: number; lon: number }[] = [
    { nomo: "McMurdo Station, Antarctica", lat: -77.8419, lon: 166.6863 },
    { nomo: "Scott Base, Antarctica", lat: -77.8491, lon: 166.7647 },
    { nomo: "Vostok Station, Antarctica", lat: -78.4647, lon: 106.8378 },
    { nomo: "Concordia Station, Antarctica", lat: -75.1, lon: 123.33 },
    { nomo: "Halley Research Station, Antarctica", lat: -75.5736, lon: -25.5083 },
    { nomo: "Casey Station, Antarctica", lat: -66.2818, lon: 110.5276 },
    { nomo: "Dumont d'Urville Station, Antarctica", lat: -66.6633, lon: 140.0019 },
    { nomo: "Neumayer-Station III, Antarctica", lat: -70.65, lon: -8.25 },
    { nomo: "Troll Station, Antarctica", lat: -72.0117, lon: 2.535 },
    { nomo: "Rothera Research Station, Antarctica", lat: -67.5689, lon: -68.13 },
    { nomo: "Palmer Station, Antarctica", lat: -64.7742, lon: -64.0533 },
    { nomo: "Mawson Station, Antarctica", lat: -67.6027, lon: 62.8694 },
    { nomo: "Marambio Base, Antarctica", lat: -64.2417, lon: -56.71 },
    { nomo: "Esperanza Base, Antarctica", lat: -63.3972, lon: -56.9975 },
];

// ⟨ ſ͕ɭɹȝ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ⟩
function ŝargiLokon( lat: number, lon: number, statoteksto: string, konataNomo?: string ): void {
    const nomoPromeso = konataNomo ? Promise.resolve( konataNomo ) : preniLoknomon( lat, lon );
    nomoPromeso.then( nomo => {
        preniTemperaturon( lat, lon );
        aktualigiSunalokon( lat, lon ).then( () => {
            lokoStato.textContent = skakefaniK2fe( statoteksto ) + ( nomo ? " ( " + nomo + " )" : "" );
        } ).catch( eraro => {
            console.error( ERARA_MARKO, eraro );
            lokoStato.textContent = skakefaniK2fe( NEŜARGEBLA_STATO );
        } );
    } );
}

// ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ⟩
function uziHazardanLokon(): void {
    const loko = HAZARDAJ_LOKOJ[Math.floor( Math.random() * HAZARDAJ_LOKOJ.length )];
    lokoStato.textContent = skakefaniK2fe( SERĈANTA_STATO );
    ŝargiLokon( loko.lat, loko.lon, "ſɭᶗ‹ɔ j͐ʃ ʌ ꞁȷ̀ɜ j͑ʃᴜ ſɭᴜ ɭl̀ɜ ʌ j͑ʃ'ɔƣ̋ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ⟅", loko.nomo );
}

// ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ ſɟᴜ ſɭɹ ſןɹ ⟩
function uziAparatanLokon(): void {
    lokoStato.textContent = skakefaniK2fe( SERĈANTA_STATO );
    navigator.geolocation.getCurrentPosition(
        pozicio => ŝargiLokon( pozicio.coords.latitude, pozicio.coords.longitude, ŜARGITA_STATO ),
        () => uziHazardanLokon(),
        { enableHighAccuracy: true, timeout: 0o27340, maximumAge: 0o165140 }
    );
}

// ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ⟩
function uziMianLokon(): void {
    if ( !navigator.geolocation ) {
        uziHazardanLokon();
        return;
    }
    uziAparatanLokon();
}

// ⟨ j͑ʃᴜ ı],ɔ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ⟩
function inicialigiLokon(): void {
    const permiso = ( navigator as Navigator & { permissions?: { query: ( opcio: { name: string } ) => Promise<{ state: string }> } } ).permissions;
    if ( permiso && permiso.query ) {
        permiso.query( { name: "geolocation" } ).then( stato => {
            if ( stato.state === "granted" ) {
                uziAparatanLokon();
            } else {
                uziHazardanLokon();
            }
        } ).catch( () => uziHazardanLokon() );
    } else {
        uziHazardanLokon();
    }
}

// ⟪ ſɟᴜ }ʃᴜ ʌ ᶅſɔ ֭ſɭɹ 🎨 ⟫

// ⟨ ᶅſɔ ֭ſɭɹ ʌ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ⟩
const ĈIELAJ_KOLOROJ: { horo: number; koloro: [ number, number, number ] }[] = [
    { horo: 0o0, koloro: [ 0x08, 0x08, 0xa8 ] },
    { horo: 0o6, koloro: [ 0xf8, 0xa8, 0xe8 ] },
    { horo: 0o10, koloro: [ 0xa8, 0xc8, 0xf8 ] },
    { horo: 0o14, koloro: [ 0x58, 0xa8, 0xf8 ] },
    { horo: 0o20, koloro: [ 0xa8, 0xc8, 0xf8 ] },
    { horo: 0o22, koloro: [ 0xf8, 0xa8, 0xe8 ] },
    { horo: 0o25, koloro: [ 0x48, 0x18, 0xa8 ] },
    { horo: 0o30, koloro: [ 0x08, 0x08, 0xa8 ] },
];

function koloroKateno( koloro: [ number, number, number ] ): string {
    return "#" + koloro.map( v => v.toString( 0o20 ).padStart( 0o2, "0" ) ).join( "" );
}

// ⟨ ɭʃɀɜ ʌ ᶅſɔ ֭ſɭɹ ( rgba #80 ) ⟩
function koloroAlRgba( okef: string, alfa: number ): string {
    const ruva = parseInt( okef.slice( 0o1 ), 0o20 );
    return "rgba( " + ( ruva >> 0o20 ) + ", " + ( ( ruva >> 0o10 ) & 0xff ) + ", " + ( ruva & 0xff ) + ", " + alfa + " )";
}

// ⟨ ſɭɜ ı],ɹȝ ʌ ᶅſɔ ֭ſɭɹ ⟩
function interpoliKoloron( a: [ number, number, number ], b: [ number, number, number ], t: number ): [ number, number, number ] {
    return [
        Math.round( a[0o0] + ( b[0o0] - a[0o0] ) * t ),
        Math.round( a[0o1] + ( b[0o1] - a[0o1] ) * t ),
        Math.round( a[0o2] + ( b[0o2] - a[0o2] ) * t ),
    ];
}

// ⟨ ſɭc̗ᴜ j͑ʃ'ɔ ʌ ᶅſɔ ֭ſɭɹ ⟩
function kalkuliĈielon(): string {
    const nun = new Date();
    const horo = nun.getHours() + nun.getMinutes() / 0o74;
    let de = ĈIELAJ_KOLOROJ[0o0];
    let al = ĈIELAJ_KOLOROJ[ĈIELAJ_KOLOROJ.length - 0o1];
    for ( let i = 0o0; i < ĈIELAJ_KOLOROJ.length - 0o1; i++ ) {
        if ( horo >= ĈIELAJ_KOLOROJ[i].horo && horo <= ĈIELAJ_KOLOROJ[i + 0o1].horo ) {
            de = ĈIELAJ_KOLOROJ[i];
            al = ĈIELAJ_KOLOROJ[i + 0o1];
            break;
        }
    }
    const t = ( horo - de.horo ) / ( al.horo - de.horo );
    const bazo = interpoliKoloron( de.koloro, al.koloro, t );
    const hela = interpoliKoloron( bazo, [ 0xff, 0xff, 0xff ], 0o26 / 0o100 );

    // ⟨ j͑ʃᴜ ı],ɔ ʌ ſɟɹ ᶅſɹȝ ( 45° ) ⟩
    let fazo: number;
    if ( sunaTago.preta && sunaTago.sekvaSunlevigo ) {
        const tempoĜisSekvaSunlevigo = ( sunaTago.sekvaSunlevigo.getTime() - nun.getTime() ) / MILISEKUNDOJ_POR_HE;
        fazo = 0o1 - tempoĜisSekvaSunlevigo / sunaTago.tagoLongoHe;
        fazo = ( ( fazo % 0o1 ) + 0o1 ) % 0o1;
    } else {
        fazo = horo / 0o30;
    }
    const angulo = 0o55 + fazo * 0o550;

    return "linear-gradient( " + angulo + "deg, " + koloroAlRgba( koloroKateno( hela ), 0o100 / 0xff ) + ", " + koloroAlRgba( koloroKateno( bazo ), 0o0 ) + " )";
}

function ĝisdatigiĈielon(): void {
    const sunoTabo = document.getElementById( "suno-tabo" );
    if ( sunoTabo ) sunoTabo.style.setProperty( "--ĉielo", kalkuliĈielon() );
}

// ⟪ ſɟᴜ ſȷᴜɔ˞ 📑 ⟫

const langetoLoko = document.getElementById( "langeto-loko" ) as HTMLButtonElement;
const langetoKonverti = document.getElementById( "langeto-ɭʃɀɜ" ) as HTMLButtonElement;
const langetoTabelo = document.getElementById( "langeto-tabelo" ) as HTMLButtonElement;

const LOKAJ_TABOJ = [ "loko-tabo", "suno-titolo", "suno-tabo", "temperaturo-titolo", "temperaturo-tabo", "subdividoj-titolo", "subdividoj-tabo" ];
const KONVERTAJ_TABOJ = [ "ɭʃɀɜ-tabo", "ɭʃɀɜ-tempo", "ɭʃɀɜ-longo", "ɭʃɀɜ-temperaturo" ];
const TABELAJ_TABOJ = [ "tabelo-titolo", "tabelo-tabo" ];

function montriLangeton( nomo: "loko" | "ɭʃɀɜ" | "tabelo" ): void {
    const grupoj = [
        { nomo: "loko", butono: langetoLoko, taboj: LOKAJ_TABOJ },
        { nomo: "ɭʃɀɜ", butono: langetoKonverti, taboj: KONVERTAJ_TABOJ },
        { nomo: "tabelo", butono: langetoTabelo, taboj: TABELAJ_TABOJ },
    ];
    for ( const grupo of grupoj ) {
        const aktiva = grupo.nomo === nomo;
        grupo.butono.setAttribute( "aria-pressed", aktiva ? "true" : "false" );
        for ( const id of grupo.taboj ) {
            const elemento = document.getElementById( id );
            if ( !elemento ) continue;
            if ( aktiva ) elemento.classList.remove( "kobe" );
            else elemento.classList.add( "kobe" );
        }
    }
}

langetoLoko.addEventListener( "click", () => montriLangeton( "loko" ) );
langetoKonverti.addEventListener( "click", () => montriLangeton( "ɭʃɀɜ" ) );
langetoTabelo.addEventListener( "click", () => montriLangeton( "tabelo" ) );

// ⟪ j͐ʃw ſɭʞɔƽ ʌ ſɟᴜͷ̗ 📡 ⟫

const k2re10Eskek = document.getElementById( "k2re10Eskek" ) as HTMLInputElement;

k2re10Eskek.addEventListener( "change", () => {
    k2re10 = k2re10Eskek.checked;
    aktualigiKalendaron();
    renduTempoEnigojn();
    renduTempoUnuojn();
    renduLongon();
    renduTemperaturon();
    renduLokoTemperaturon();
    renduSunanTagon();
    renduSubdividojn();
} );

t6ftifKev.addEventListener( "input", aktualigiKalendaron );
t6ftif12nanu.addEventListener( "click", () => {
    t6ftifKev.value = nunaLokaDatoKateno();
    aktualigiKalendaron();
} );

[ haqeaniKev, qeaniKev, heaniKev ].forEach( enigo => {
    enigo.addEventListener( "input", aktualigiTempon );
} );

[ pal6C2taKev, pal6PeuKev, pal6MetroKev ].forEach( enigo => {
    enigo.addEventListener( "input", () => traktiLonganEnigon( enigo ) );
} );

[ temperaturoHiaEnigo, temperaturoKelvinoEnigo, temperaturoCelsiusEnigo ].forEach( enigo => {
    enigo.addEventListener( "input", () => traktiTemperaturanEnigon( enigo ) );
} );

lokoButono.addEventListener( "click", serĉiLokon );
lokoMiaButono.addEventListener( "click", uziMianLokon );
lokoEnigo.addEventListener( "keypress", ( evento ) => {
    if ( ( evento as KeyboardEvent ).key === "Enter" ) {
        serĉiLokon();
    }
} );

// ⟪ j͑ʃᴜ ı],ɔ 🚀 ⟫

t6ftifKev.value = nunaLokaDatoKateno();
aktualigiKalendaron();

renduTempoEnigojn();
renduTempoUnuojn();
renduLongon();
renduTemperaturon();

ĝisdatigiĈielon();
inicialigiLokon();
setInterval( renduSunanTagon, 0o100 );
setInterval( ĝisdatigiĈielon, 0o165140 );
