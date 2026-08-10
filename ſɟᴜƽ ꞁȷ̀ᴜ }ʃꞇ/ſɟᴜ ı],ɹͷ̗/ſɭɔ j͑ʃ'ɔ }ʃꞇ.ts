// ≺⧼ ſɭɔ j͑ʃ'ɔ }ʃꞇ - ſɟᴜ ı],ɹͷ̗ 🔄 ⧽≻

// ⟪ Stato 💾 ⟫

let uzuBazo10 = false;

// ⟨ Kalendaro 📅 ⟩
const kalendaroEnigo = document.getElementById( "kalendaro-enigo" ) as HTMLInputElement;
const nunButono = document.getElementById( "nun-butono" ) as HTMLButtonElement;

// ⟨ Tempo 🕛 ⟩
const tempoHoroj = document.getElementById( "tempo-horoj" ) as HTMLInputElement;
const tempoMinutoj = document.getElementById( "tempo-minutoj" ) as HTMLInputElement;
const tempoSekundoj = document.getElementById( "tempo-sekundoj" ) as HTMLInputElement;
let tempoSumo = 86400;

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

// ⟨ Loka serĉo ( kiel en la krada mapo ) ⟩
const lokoEnigo = document.getElementById( "temperaturo-loko-enigo" ) as HTMLInputElement;
const lokoButono = document.getElementById( "temperaturo-loko-butono" ) as HTMLButtonElement;
const lokoRezultoj = document.getElementById( "temperaturo-loko-rezultoj" ) as HTMLElement;
const lokoStato = document.getElementById( "temperaturo-loko-stato" ) as HTMLElement;

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
        if ( ruva !== -1 ) { valoro = valoro * 8 + ruva; continue; }
        if ( kp6 >= "0" && kp6 <= "7" ) { valoro = valoro * 8 + ( kp6.charCodeAt( 0 ) - 48 ); continue; }
        return NaN;
    }

    if ( partoj.length > 1 ) {
        let dividanto = 8;
        for ( const kp6 of partoj[ 1 ] ) {
            const ruva = K2FE.indexOf( kp6 );
            const cifero = ruva !== -1 ? ruva : ( kp6 >= "0" && kp6 <= "7" ? kp6.charCodeAt( 0 ) - 48 : NaN );
            if ( isNaN( cifero ) ) return NaN;
            valoro += cifero / dividanto;
            dividanto *= 8;
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

function aktualigiKalendaron(): void {
    const valoro = kalendaroEnigo.value;
    if ( !valoro ) return;

    const dato = new Date( valoro );
    if ( isNaN( dato.getTime() ) ) return;

    const cax2l = cax2lStafl2( dato );
    const stifeh2 = castifeh2( dato ) as unknown as { shaqe: number; sqe: number; she: number; haqe: number; qe: number; he: number };

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
        ( isNaN( horoj ) ? 0 : horoj ) * 3600 +
        ( isNaN( minutoj ) ? 0 : minutoj ) * 60 +
        ( isNaN( sekundoj ) ? 0 : sekundoj )
    );

    renduTempoUnuojn();
}

// ⟨ Reskribi horojn / minutojn / sekundojn el la suma sekund-valoro ⟩
function renduTempoEnigojn(): void {
    let fusu = Math.floor( tempoSumo );
    const horoj = Math.floor( fusu / 3600 ); fusu %= 3600;
    const minutoj = Math.floor( fusu / 60 ); fusu %= 60;

    skribiNombron( tempoHoroj, horoj );
    skribiNombron( tempoMinutoj, minutoj );
    skribiNombron( tempoSekundoj, fusu );
}

function renduTempoUnuojn(): void {
    let fusu = tempoSumo;

    for ( let i = 0; i < tempoUnuoj.length - 1; i++ ) {
        const unuo = tempoUnuoj[ i ];
        const kvanto = Math.floor( fusu / unuo.valoro );
        document.getElementById( "tempo-" + unuo.nomo )!.textContent = uzuBazo10
            ? String( kvanto )
            : skakefK2fe( vab6caja( kvanto ) );
        fusu %= unuo.valoro;
    }

    const he = fusu / HE_L6VEM2;
    document.getElementById( "tempo-he" )!.textContent = uzuBazo10
        ? parseFloat( he.toFixed( 0o12 ) ).toString()
        : skakefK2fe( vab6cajaDomani( he ) );
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

// ⟨ Serĉi realan lokon per Nominatim ( OpenStreetMap ) ⟩
async function serĉiLokon(): Promise<void> {
    const demando = lokoEnigo.value.trim();
    if ( !demando ) return;

    lokoRezultoj.innerHTML = "<p>ſɭᴎɔ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ</p>";
    lokoRezultoj.classList.remove( "kobe" );

    try {
        const respondo = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent( demando )}&limit=5`
        );
        if ( !respondo.ok ) throw new Error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )" );

        const rezultoj: { lat: string; lon: string; display_name: string }[] = await respondo.json();
        if ( rezultoj.length === 0 ) {
            lokoRezultoj.innerHTML = "<p>֭ſɭɹ ſɟɔ j͐ʃɹʞ ⟅</p>";
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
                preniTemperaturon( lat, lon, nomo );
            } );
        } );
    } catch ( eraro ) {
        console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", eraro );
        lokoRezultoj.innerHTML = "<p>ſ͕ȷɜƣ̋ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ⟅</p>";
    }
}

// ⟨ Preni nunan temperaturon de elektita loko ( Open-Meteo ) ⟩
async function preniTemperaturon( lat: number, lon: number, nomo: string ): Promise<void> {
    lokoStato.textContent = "ſɭᴎɔ " + nomo + " ⟅";

    try {
        const respondo = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`
        );
        if ( !respondo.ok ) throw new Error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )" );

        const datumoj: { current?: { temperature_2m?: number } } = await respondo.json();
        const celsiuso = datumoj.current?.temperature_2m;
        if ( typeof celsiuso !== "number" ) throw new Error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )" );

        temperaturoKelvino = celsiuso + 273.15;
        renduTemperaturon();
        lokoStato.textContent = skakefK2fe( nomo ) + " ⟅";
    } catch ( eraro ) {
        console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", eraro );
        lokoStato.textContent = "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )";
    }
}

// ⟪ Eventaj Aŭskultiloj 📡 ⟩

const uzuBazo10Marko = document.getElementById( "uzuBazo10Marko" ) as HTMLInputElement;

uzuBazo10Marko.addEventListener( "change", () => {
    uzuBazo10 = uzuBazo10Marko.checked;
    aktualigiKalendaron();
    renduTempoEnigojn();
    renduTempoUnuojn();
    renduLongon();
    renduTemperaturon();
} );

kalendaroEnigo.addEventListener( "input", aktualigiKalendaron );
nunButono.addEventListener( "click", () => {
    const nun = new Date();
    const loka = new Date( nun.getTime() - nun.getTimezoneOffset() * 60000 ).toISOString().slice( 0, 16 );
    kalendaroEnigo.value = loka;
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
lokoEnigo.addEventListener( "keypress", ( evento ) => {
    if ( ( evento as KeyboardEvent ).key === "Enter" ) {
        serĉiLokon();
    }
} );

// ⟪ Inicialigo 🚀 ⟩

const nun = new Date();
kalendaroEnigo.value = new Date( nun.getTime() - nun.getTimezoneOffset() * 60000 ).toISOString().slice( 0, 16 );
aktualigiKalendaron();

renduTempoEnigojn();
renduTempoUnuojn();
renduLongon();
renduTemperaturon();
