// ≺⧼ ſɭɔ j͑ʃ'ɔ }ʃꞇ - ſɟᴜ ı],ɹͷ̗ 🔄 ⧽≻

// ⟪ Stato 💾 ⟫

let uzuBazo10 = false;

// ⟨ Stato-ŝlosiloj 🔑 ⟩
const ERARA_MARKO = "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )";
const SERĈANTA_STATO = "ſɭᶗ‹ɔ ʌ ꞁȷ̀ɹ ʃᴜ v ſɭᴜ }ʃɜ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ";
const ŜARGITA_STATO = "ſɭᶗ‹ɔ ʌ ſ͕ɭwȝ ʌ j͑ʃƨᴜ ſȷͷ̗ɹ ʌ j͑ʃп́ɔ j͑ʃ'ɜ ſןɹ";
const NEŜARGEBLA_STATO = "ſ͕ȷɜ j͑ʃ'ɔ ɭʃɔ ŋᷠɹ ʌ j͑ʃɜ ſᶘɹ ʌ j͑ʃп́ɔ j͑ʃ'ɜ ſןɹ";
const NENIU_REZULTO = "ſ͕ȷɜ ſ͕ɭwȝ ʌ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ";

// ⟨ Kalendaro 📅 ⟩
const kalendaroEnigo = document.getElementById( "kalendaro-enigo" ) as HTMLInputElement;
const nunButono = document.getElementById( "nun-butono" ) as HTMLButtonElement;

// ⟨ Tempo 🕛 ⟩
const tempoHoroj = document.getElementById( "tempo-horoj" ) as HTMLInputElement;
const tempoMinutoj = document.getElementById( "tempo-minutoj" ) as HTMLInputElement;
const tempoSekundoj = document.getElementById( "tempo-sekundoj" ) as HTMLInputElement;
let tempoSumo = 0o250600;

const tempoUnuoj = [
    { nomo: "shaqe", valoro: SHAQE_L6VEM2 },
    { nomo: "sqe", valoro: SQE_L6VEM2 },
    { nomo: "she", valoro: SHE_L6VEM2 },
    { nomo: "haqe", valoro: HAQE_L6VEM2 },
    { nomo: "qe", valoro: QE_L6VEM2 },
    { nomo: "he", valoro: HE_L6VEM2 }
];

// ⟨ Longo ( Dimensiono ) 📏 ⟩
const longoC2taEnigo = document.getElementById( "longo-c2ta" ) as HTMLInputElement;
const longoPeuEnigo = document.getElementById( "longo-peu" ) as HTMLInputElement;
const longoMetroEnigo = document.getElementById( "longo-metro" ) as HTMLInputElement;
let longoMetroj = 1;

// ⟨ Temperaturo 🌡️ ⟩
const temperaturoHiaEnigo = document.getElementById( "temperaturo-hia" ) as HTMLInputElement;
const temperaturoKelvinoEnigo = document.getElementById( "temperaturo-kelvino" ) as HTMLInputElement;
const temperaturoCelsiusEnigo = document.getElementById( "temperaturo-celsius" ) as HTMLInputElement;
let temperaturoKelvino = 273.15;

// ⟨ Loka serĉo ( komuna por temperaturo kaj suna tago ) ⟩
const lokoEnigo = document.getElementById( "loko-enigo" ) as HTMLInputElement;
const lokoButono = document.getElementById( "loko-butono" ) as HTMLButtonElement;
const lokoMiaButono = document.getElementById( "loko-mia" ) as HTMLButtonElement;
const lokoRezultoj = document.getElementById( "loko-rezultoj" ) as HTMLElement;
const lokoStato = document.getElementById( "loko-stato" ) as HTMLElement;

// ⟨ Temperaturo de la loko 🌡️ ⟩
const lokoHia = document.getElementById( "loko-hia" ) as HTMLElement;
const lokoKelvino = document.getElementById( "loko-kelvino" ) as HTMLElement;
const lokoCelsius = document.getElementById( "loko-celsius" ) as HTMLElement;
let lokoTemperaturoPreta = false;

// ⟪ Nombro-Helpiloj 🔢 ⟫

// ⟨ Konverti bazo-8 ĉenon ( ſɟᴜ ı],ɹͷ̗.js ciferoj aŭ ASCII 0-7 ) al nombro ⟩
function parseBazo8( okef: string ): number {
    const negativa = okef.startsWith( "›" ) || okef.startsWith( "-" );
    const kerno = ( negativa ? okef.slice( 1 ) : okef ).trim();
    if ( !kerno ) return NaN;

    const partoj = kerno.split( " " );
    let valoro = 0;

    for ( const kp6 of partoj[ 0 ] ) {
        const ruva = K2FE.indexOf( kp6 );
        if ( ruva !== -1 ) { valoro = valoro * 0o10 + ruva; continue; }
        if ( kp6 >= "0" && kp6 <= "7" ) { valoro = valoro * 0o10 + ( kp6.charCodeAt( 0 ) - 0o60 ); continue; }
        return NaN;
    }

    if ( partoj.length > 1 ) {
        let dividanto = 0o10;
        for ( const kp6 of partoj[ 1 ] ) {
            const ruva = K2FE.indexOf( kp6 );
            const cifero = ruva !== -1 ? ruva : ( kp6 >= "0" && kp6 <= "7" ? kp6.charCodeAt( 0 ) - 0o60 : NaN );
            if ( isNaN( cifero ) ) return NaN;
            valoro += cifero / dividanto;
            dividanto *= 0o10;
        }
    }

    return negativa ? -valoro : valoro;
}

// ⟨ Formati nombron laŭ la nuna bazo ⟩
function formatiNombron( valoro: number ): string {
    if ( !isFinite( valoro ) ) return "";
    if ( uzuBazo10 ) return parseFloat( valoro.toFixed( 0o12 ) ).toString();
    return skakefK2fe( vab6cajaDomani( valoro ) );
}

// ⟨ Legi enigan kampon laŭ la nuna bazo ⟩
function legiNombron( enigo: HTMLInputElement ): number {
    const teksto = enigo.value.trim();
    if ( !teksto ) return NaN;
    return uzuBazo10 ? parseFloat( teksto ) : parseBazo8( teksto );
}

// ⟨ Skribi nombron al eniga kampo laŭ la nuna bazo ⟩
function skribiNombron( enigo: HTMLInputElement, valoro: number ): void {
    enigo.value = formatiNombron( valoro );
}

// ⟪ Kalendaro 📅 ⟩

// ⟨ Formati kalendaran nombron ( datoj havas "ꞙɭ" prefikson en ne-angla reĝimo ) ⟩
function formatiKalendaron( valoro: number, ĉuDato: boolean ): string {
    if ( uzuBazo10 ) return String( valoro );
    const gawe = document.documentElement.lang || "aih";
    const kp6Sak2fe = gawe === "en" ? "" : "ꞙɭ";
    return skakefK2fe( ( ĉuDato ? kp6Sak2fe : "" ) + vab6caja( valoro ) );
}

// ⟨ Nunaj loka dato-tempo kiel ĉeno por datetime-local ⟩
function nunaLokaDatoKateno(): string {
    const nun = new Date();
    return new Date( nun.getTime() - nun.getTimezoneOffset() * 60000 ).toISOString().slice( 0, 16 );
}

function aktualigiKalendaron(): void {
    const valoro = kalendaroEnigo.value;
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

// ⟪ Tempo 🕛 ⟩

function aktualigiTempon(): void {
    const horoj = legiNombron( tempoHoroj );
    const minutoj = legiNombron( tempoMinutoj );
    const sekundoj = legiNombron( tempoSekundoj );

    if ( isNaN( horoj ) && isNaN( minutoj ) && isNaN( sekundoj ) ) return;

    tempoSumo = Math.max( 0,
        ( isNaN( horoj ) ? 0 : horoj ) * 0o7000 +
        ( isNaN( minutoj ) ? 0 : minutoj ) * 0o74 +
        ( isNaN( sekundoj ) ? 0 : sekundoj )
    );

    renduTempoUnuojn();
}

// ⟨ Reskribi horojn / minutojn / sekundojn el la suma sekund-valoro ⟩
function renduTempoEnigojn(): void {
    let fusu = Math.floor( tempoSumo );
    const horoj = Math.floor( fusu / 0o7000 ); fusu %= 0o7000;
    const minutoj = Math.floor( fusu / 0o74 ); fusu %= 0o74;

    skribiNombron( tempoHoroj, horoj );
    skribiNombron( tempoMinutoj, minutoj );
    skribiNombron( tempoSekundoj, fusu );
}

function renduTempoUnuojn(): void {
    let fusu = tempoSumo;

    for ( let i = 0; i < tempoUnuoj.length - 1; i++ ) {
        const unuo = tempoUnuoj[ i ];
        const kvanto = Math.floor( fusu / unuo.valoro );
        document.getElementById( "tempo-" + unuo.nomo )!.textContent = formatiNombron( kvanto );
        fusu %= unuo.valoro;
    }

    document.getElementById( "tempo-he" )!.textContent = formatiNombron( fusu / HE_L6VEM2 );
}

// ⟪ Longo ( Dimensiono ) 📏 ⟩

function traktiLonganEnigon( fonto: HTMLInputElement ): void {
    const valoro = legiNombron( fonto );
    if ( isNaN( valoro ) ) return;

    longoMetroj =
        fonto === longoC2taEnigo ? valoro * C2TA_L6XA3ENI :
        fonto === longoPeuEnigo ? valoro * P0 :
        valoro;

    renduLongon();
}

function renduLongon(): void {
    skribiNombron( longoC2taEnigo, longoMetroj / C2TA_L6XA3ENI );
    skribiNombron( longoPeuEnigo, longoMetroj / P0 );
    skribiNombron( longoMetroEnigo, longoMetroj );
}

// ⟪ Temperaturo 🌡️ ⟩

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

// ⟨ Montri la nunan temperaturon de la loko ⟩
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

// ⟨ Serĉi lokon per Nominatim ( OpenStreetMap ) - komuna ⟩
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
        if ( rezultoj.length === 0 ) {
            lokoRezultoj.innerHTML = "<p>" + skakefaniK2fe( NENIU_REZULTO ) + "</p>";
            return;
        }

        lokoRezultoj.innerHTML = rezultoj.map( r =>
            `<button data-lat="${r.lat}" data-lon="${r.lon}" data-nomo="${encodeURIComponent( r.display_name )}">${r.display_name}</button>`
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

// ⟨ Veteraj fonoj ( WMO-kodoj → helaj / malhelaj koloroj ) ⟩
const VETERAJ_FONOJ: { testas: ( kodo: number ) => boolean; hela: string; malhela: string }[] = [
    { testas: kodo => kodo === 0, hela: "#88c8f8", malhela: "#58a8f8" },
    { testas: kodo => kodo === 1 || kodo === 2, hela: "#a8c8e8", malhela: "#88b8e8" },
    { testas: kodo => kodo === 3, hela: "#c8c8c8", malhela: "#a8a8a8" },
    { testas: kodo => kodo === 45 || kodo === 48, hela: "#e8e8e8", malhela: "#c8c8c8" },
    { testas: kodo => kodo >= 51 && kodo <= 57, hela: "#a8c8e8", malhela: "#88a8c8" },
    { testas: kodo => kodo >= 61 && kodo <= 67, hela: "#7888c8", malhela: "#5868a8" },
    { testas: kodo => kodo >= 71 && kodo <= 77, hela: "#f8f8f8", malhela: "#e8f8f8" },
    { testas: kodo => kodo >= 80 && kodo <= 82, hela: "#6878c8", malhela: "#4868a8" },
    { testas: kodo => kodo === 85 || kodo === 86, hela: "#f8f8f8", malhela: "#d8e8f8" },
    { testas: kodo => kodo >= 95, hela: "#4818a8", malhela: "#2828a8" },
];
const VETERA_ORIGINALA: { hela: string; malhela: string } = { hela: "#a8c8f8", malhela: "#58a8f8" };

// ⟨ Fono laŭ la vetera kodo ( WMO ) - duontravidebla al travidebla ⟩
function veteroFono( kodo: number ): string {
    const gradiento = ( hela: string, malhela: string ) =>
        "linear-gradient( 45deg, " + koloroAlRgba( hela, 0o100 / 0xff ) + ", " + koloroAlRgba( malhela, 0 ) + " )";
    const fono = VETERAJ_FONOJ.find( opcio => opcio.testas( kodo ) ) || VETERA_ORIGINALA;
    return gradiento( fono.hela, fono.malhela );
}

// ⟨ Preni nunan temperaturon de elektita loko ( Open-Meteo ) ⟩
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

// ⟪ Suna Tago ☀️ ⟩

// ⟨ Traduki tekston laŭ la nuna lingvo ( novaj ŝlosiloj havas anglajn lokokupilojn ) ⟩
function skakefaniK2fe( okef: string ): string {
    const gawe = document.documentElement.lang || "aih";
    return skakefK2fe( skakefani[ gawe ]?.[ okef ] ?? skakefani[ "aih" ]?.[ okef ] ?? okef );
}

let sunaTago = {
    preta: false,
    sunlevigo: null as Date | null,
    sunsubiro: null as Date | null,
    sekvaSunlevigo: null as Date | null,
    tagoLongo: 0,
};

// ⟨ Formati horon kiel unuopan nombron en horoj ( sama kiel la aliaj valoroj ) ⟩
function formatiHoron( dato: Date ): string {
    return formatiNombron( dato.getHours() + dato.getMinutes() / 0o74 + dato.getSeconds() / 0o7000 );
}

// ⟨ Formati daton kiel aaaa-mm-tt laŭ loka tempo ⟩
function formatiDaton( dato: Date ): string {
    const jaro = dato.getFullYear();
    const monato = String( dato.getMonth() + 1 ).padStart( 2, "0" );
    const tago = String( dato.getDate() ).padStart( 2, "0" );
    return jaro + "-" + monato + "-" + tago;
}

// ⟨ Preni sunleviĝon kaj sunsubiron por dato ( sunrise-sunset API ) ⟩
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

// ⟨ Preni loknomon de koordinatoj ( Nominatim reverse ) ⟩
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

// ⟨ Ĝisdatigi la sunan tagon por loko ⟩
async function aktualigiSunalokon( lat: number, lng: number ): Promise<void> {
    const nun = new Date();
    const hodiaŭ = new Date( nun.getFullYear(), nun.getMonth(), nun.getDate() );
    const morgaŭ = new Date( hodiaŭ );
    morgaŭ.setDate( morgaŭ.getDate() + 1 );

    const [ hodiaŭaj, morgaŭaj ] = await Promise.all( [
        preniSunlevigonSunsubiron( lat, lng, hodiaŭ ),
        preniSunlevigonSunsubiron( lat, lng, morgaŭ ),
    ] );

    sunaTago.sunlevigo = hodiaŭaj.sunlevigo;
    sunaTago.sunsubiro = hodiaŭaj.sunsubiro;
    sunaTago.sekvaSunlevigo = morgaŭaj.sunlevigo;
    sunaTago.tagoLongo = ( morgaŭaj.sunlevigo.getTime() - hodiaŭaj.sunlevigo.getTime() ) / 1000;

    if ( !isFinite( sunaTago.tagoLongo ) || sunaTago.tagoLongo <= 0 ) {
        sunaTago.preta = false;
        throw new Error( ERARA_MARKO );
    }

    sunaTago.preta = true;
    renduSubdividojn();
    renduSunanTagon();
    ĝisdatigiĈielon();
}

// ⟨ Vivanta ĝisdatigo de horloĝoj ⟩
function renduSunanTagon(): void {
    if ( !sunaTago.preta ) return;
    const nun = new Date();
    const sunlevigo = sunaTago.sunlevigo as Date;
    const sunsubiro = sunaTago.sunsubiro as Date;
    const sekvaSunlevigo = sunaTago.sekvaSunlevigo as Date;
    if ( isNaN( sunlevigo.getTime() ) || isNaN( sunsubiro.getTime() ) || isNaN( sekvaSunlevigo.getTime() ) ) return;

    document.getElementById( "suno-sunlevigo" )!.textContent = formatiHoron( sunlevigo );
    document.getElementById( "suno-sunsubiro" )!.textContent = formatiHoron( sunsubiro );
    document.getElementById( "suno-tago-longeco" )!.textContent = formatiNombron( sunaTago.tagoLongo / 0o7000 );

    // ⟨ Pasita tempo ekde la plej lasta sunleviĝo ( mod la suna tago ) ⟩
    let pasis = ( nun.getTime() - sunlevigo.getTime() ) / 1000;
    if ( pasis < 0 ) {
        pasis = ( nun.getTime() - ( sunlevigo.getTime() - sunaTago.tagoLongo * 1000 ) ) / 1000;
    }
    pasis = pasis % sunaTago.tagoLongo;
    if ( pasis < 0 ) pasis += sunaTago.tagoLongo;

    // ⟨ Bazo-64 horloĝo ( 64 3-niveloj ) ⟩
    const nivelo1 = sunaTago.tagoLongo / 0o100;
    const nivelo2 = sunaTago.tagoLongo / 0o10000;
    const nivelo3 = sunaTago.tagoLongo / 0o1000000;
    const kvanto1 = Math.floor( pasis / nivelo1 );
    const rest1 = pasis % nivelo1;
    const kvanto2 = Math.floor( rest1 / nivelo2 );
    const rest2 = rest1 % nivelo2;
    const kvanto3 = Math.floor( rest2 / nivelo3 );

    document.getElementById( "suno-bazo64-ı" )!.textContent = formatiNombron( kvanto1 );
    document.getElementById( "suno-bazo64-ɿ" )!.textContent = formatiNombron( kvanto2 );
    document.getElementById( "suno-bazo64-ц" )!.textContent = formatiNombron( kvanto3 );

    // ⟨ Kutimaj unuoj horloĝo ( Haqe.Qe.He ) ⟩
    const haqe = Math.floor( pasis / HAQE_L6VEM2 );
    const qe = Math.floor( ( pasis % HAQE_L6VEM2 ) / QE_L6VEM2 );
    const he = ( pasis % QE_L6VEM2 ) / HE_L6VEM2;
    document.getElementById( "suno-kutima-haqe" )!.textContent = formatiNombron( haqe );
    document.getElementById( "suno-kutima-qe" )!.textContent = formatiNombron( qe );
    document.getElementById( "suno-kutima-he" )!.textContent = formatiNombron( he );

    // ⟨ Progreso de la taga lumo ⟩
    const lumoLongo = ( sunsubiro.getTime() - sunlevigo.getTime() ) / 1000;
    const progreso = Math.min( 1, Math.max( 0, ( ( nun.getTime() - sunlevigo.getTime() ) / 1000 ) / lumoLongo ) );
    document.getElementById( "suno-progreso" )!.textContent = formatiNombron( progreso * ( uzuBazo10 ? 100 : 0o100 ) );
}

// ⟨ Subdividoj de la suna tago ⟩
function renduSubdividojn(): void {
    if ( !sunaTago.preta ) return;
    const tago = sunaTago.tagoLongo;
    const valoroj = [ tago / 0o100, tago / 0o10000, tago / 0o1000000 ];
    const sufiksoj = [ "ı", "ɿ", "ц" ];
    const unuoj = [
        { kodo: "sek", funkcio: ( sek: number ) => sek },
        { kodo: "min", funkcio: ( sek: number ) => sek / 0o74 },
        { kodo: "hor", funkcio: ( sek: number ) => sek / 0o7000 },
        { kodo: "he", funkcio: ( sek: number ) => sek / HE_L6VEM2 },
        { kodo: "qe", funkcio: ( sek: number ) => sek / QE_L6VEM2 },
        { kodo: "haqe", funkcio: ( sek: number ) => sek / HAQE_L6VEM2 },
    ];
    for ( let i = 0; i < valoroj.length; i++ ) {
        for ( const unuo of unuoj ) {
            document.getElementById( `suno-sub-${unuo.kodo}-${sufiksoj[ i ]}` )!.textContent = formatiNombron( unuo.funkcio( valoroj[ i ] ) );
        }
    }
}

// ⟨ Hazardaj lokoj por aŭtomata ŝarĝo ⟩
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

// ⟨ Ŝargi lokon per koordinatoj ( temperaturo + suna tago ) ⟩
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

// ⟨ Elekti hazardan lokon ⟩
function uziHazardanLokon(): void {
    const loko = HAZARDAJ_LOKOJ[ Math.floor( Math.random() * HAZARDAJ_LOKOJ.length ) ];
    lokoStato.textContent = skakefaniK2fe( SERĈANTA_STATO );
    ŝargiLokon( loko.lat, loko.lon, "ſɭᶗ‹ɔ j͐ʃ ʌ ꞁȷ̀ɜ j͑ʃᴜ ſɭᴜ ɭl̀ɜ ʌ j͑ʃ'ɔƣ̋ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ ⟅", loko.nomo );
}

// ⟨ Uzi la aparatan lokon ( se ne disponeblas aŭ malsukcesas, hazarda loko ) ⟩
function uziAparatanLokon(): void {
    lokoStato.textContent = skakefaniK2fe( SERĈANTA_STATO );
    navigator.geolocation.getCurrentPosition(
        pozicio => ŝargiLokon( pozicio.coords.latitude, pozicio.coords.longitude, ŜARGITA_STATO ),
        () => uziHazardanLokon(),
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
}

// ⟨ Uzi la aparatan lokon ( defaŭlte hazarda loko ) ⟩
function uziMianLokon(): void {
    if ( !navigator.geolocation ) {
        uziHazardanLokon();
        return;
    }
    uziAparatanLokon();
}

// ⟨ Aŭtomata ŝarĝo je komenco: jam-permesita loko aŭ hazarda loko ⟩
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

// ⟪ Ĉielo 🎨 ⟩

// ⟨ Ĉielaj koloroj laŭ la horo ( nokto → mateniĝo → tago → krepusko ) ⟩
const ĈIELAJ_KOLOROJ: { horo: number; koloro: [ number, number, number ] }[] = [
    { horo: 0, koloro: [ 0x08, 0x08, 0xa8 ] },
    { horo: 0o6, koloro: [ 0xf8, 0xa8, 0xe8 ] },
    { horo: 0o10, koloro: [ 0xa8, 0xc8, 0xf8 ] },
    { horo: 0o14, koloro: [ 0x58, 0xa8, 0xf8 ] },
    { horo: 0o20, koloro: [ 0xa8, 0xc8, 0xf8 ] },
    { horo: 0o22, koloro: [ 0xf8, 0xa8, 0xe8 ] },
    { horo: 0o25, koloro: [ 0x48, 0x18, 0xa8 ] },
    { horo: 0o30, koloro: [ 0x08, 0x08, 0xa8 ] },
];

function koloroKateno( koloro: [ number, number, number ] ): string {
    return "#" + koloro.map( v => v.toString( 16 ).padStart( 2, "0" ) ).join( "" );
}

// ⟨ Heksa koloro al rgba kun donita alfao ( #80 ≈ duontravidebla ) ⟩
function koloroAlRgba( okef: string, alfa: number ): string {
    const ruva = parseInt( okef.slice( 1 ), 16 );
    return "rgba( " + ( ruva >> 16 ) + ", " + ( ( ruva >> 8 ) & 0xff ) + ", " + ( ruva & 0xff ) + ", " + alfa + " )";
}

// ⟨ Interpoli inter du koloroj ⟩
function interpoliKoloron( a: [ number, number, number ], b: [ number, number, number ], t: number ): [ number, number, number ] {
    return [
        Math.round( a[ 0 ] + ( b[ 0 ] - a[ 0 ] ) * t ),
        Math.round( a[ 1 ] + ( b[ 1 ] - a[ 1 ] ) * t ),
        Math.round( a[ 2 ] + ( b[ 2 ] - a[ 2 ] ) * t ),
    ];
}

// ⟨ Kalkuli la nunan ĉielan gradienton laŭ la loka horo ⟩
function kalkuliĈielon(): string {
    const nun = new Date();
    const horo = nun.getHours() + nun.getMinutes() / 0o74;
    let de = ĈIELAJ_KOLOROJ[ 0 ];
    let al = ĈIELAJ_KOLOROJ[ ĈIELAJ_KOLOROJ.length - 1 ];
    for ( let i = 0; i < ĈIELAJ_KOLOROJ.length - 1; i++ ) {
        if ( horo >= ĈIELAJ_KOLOROJ[ i ].horo && horo <= ĈIELAJ_KOLOROJ[ i + 1 ].horo ) {
            de = ĈIELAJ_KOLOROJ[ i ];
            al = ĈIELAJ_KOLOROJ[ i + 1 ];
            break;
        }
    }
    const t = ( horo - de.horo ) / ( al.horo - de.horo );
    const bazo = interpoliKoloron( de.koloro, al.koloro, t );
    const hela = interpoliKoloron( bazo, [ 0xff, 0xff, 0xff ], 0o26 / 0o100 );

    // ⟨ Direkto: startas malsupre-maldekstre ( 45° ) kaj rotacias dekstrume laŭ la suna fazo ( tempo ĝis la sekva sunleviĝo ) ⟩
    let fazo: number;
    if ( sunaTago.preta && sunaTago.sekvaSunlevigo ) {
        const tempoĜisSekvaSunlevigo = ( sunaTago.sekvaSunlevigo.getTime() - nun.getTime() ) / 1000;
        fazo = 1 - tempoĜisSekvaSunlevigo / sunaTago.tagoLongo;
        fazo = ( ( fazo % 1 ) + 1 ) % 1;
    } else {
        fazo = horo / 0o30;
    }
    const angulo = 0o55 + fazo * 0o550;

    return "linear-gradient( " + angulo + "deg, " + koloroAlRgba( koloroKateno( hela ), 0o100 / 0xff ) + ", " + koloroAlRgba( koloroKateno( bazo ), 0 ) + " )";
}

function ĝisdatigiĈielon(): void {
    const sunoTabo = document.getElementById( "suno-tabo" );
    if ( sunoTabo ) sunoTabo.style.setProperty( "--ĉielo", kalkuliĈielon() );
}

// ⟪ Langetoj 📑 ⟩

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

// ⟪ Eventaj Aŭskultiloj 📡 ⟩

const uzuBazo10Marko = document.getElementById( "uzuBazo10Marko" ) as HTMLInputElement;

uzuBazo10Marko.addEventListener( "change", () => {
    uzuBazo10 = uzuBazo10Marko.checked;
    aktualigiKalendaron();
    renduTempoEnigojn();
    renduTempoUnuojn();
    renduLongon();
    renduTemperaturon();
    renduLokoTemperaturon();
    renduSunanTagon();
    renduSubdividojn();
} );

kalendaroEnigo.addEventListener( "input", aktualigiKalendaron );
nunButono.addEventListener( "click", () => {
    kalendaroEnigo.value = nunaLokaDatoKateno();
    aktualigiKalendaron();
} );

[ tempoHoroj, tempoMinutoj, tempoSekundoj ].forEach( enigo => {
    enigo.addEventListener( "input", aktualigiTempon );
} );

[ longoC2taEnigo, longoPeuEnigo, longoMetroEnigo ].forEach( enigo => {
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

// ⟪ Inicialigo 🚀 ⟩

kalendaroEnigo.value = nunaLokaDatoKateno();
aktualigiKalendaron();

renduTempoEnigojn();
renduTempoUnuojn();
renduLongon();
renduTemperaturon();

ĝisdatigiĈielon();
inicialigiLokon();
setInterval( renduSunanTagon, 0o100 );
setInterval( ĝisdatigiĈielon, 60000 );
