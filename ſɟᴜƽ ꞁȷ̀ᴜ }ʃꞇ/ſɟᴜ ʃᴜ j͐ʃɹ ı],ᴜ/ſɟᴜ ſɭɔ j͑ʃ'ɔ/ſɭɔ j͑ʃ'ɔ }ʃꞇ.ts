// ≺⧼ ſɟᴜ ſɭɔ j͑ʃ'ɔ - Ktash Koordinata Mapo ⧽≻

// ⟪ Eksteraj Deklaroj 🔌 ⟫

declare const L: any;
declare const vab6k2fekp6: ( teksto: string ) => number;
declare const K2FE: string[];

// ⟪ Konstantoj 🔢 ⟫

const KADRA_DEKALO = 11.62354;

const ZOMO_KOMENCA = 0o7;
const ZOMO_MAKSIMUMA = 0o22;
const ZOMO_SERĈA_DEFŬLTA = 0o3;
const ZOMO_NIVELO_2 = 0o10;
const ZOMO_NIVELO_3 = 0o14;
const ZOMO_NIVELO_4 = 0o20;
const ZOMO_RESTAŬRA = 0o3;

// ⟪ Tipoj 📐 ⟫

interface KadraSistemo {
    ksaka: { v: string; hPrefix: string[]; hSuffix: string[] };
    latin: { v: string; hPrefix: string[]; hSuffix: string[] };
    chmuah: { v: string; hPrefix: string[]; hSuffix: string[] };
}

interface KadrajKoordinatoj {
    v1: number; h1: number;
    v2: number; h2: number;
    v3: number; h3: number;
    v4: number; h4: number;
}

interface SerĉaRezulto {
    lat: number;
    lon: number;
    v: number;
    h: number;
    startLevel?: number;
    ksakaName: string;
    latinName: string;
    chmuahName: string;
}

interface SerĉaReveno {
    rezultoj: SerĉaRezulto[];
    zomo?: number;
}

interface AnalizitajKoordinatoj {
    lat: number;
    lon: number;
}

interface DMSObjekto {
    gra: number;
    min: number;
    sek: number;
}

interface KaŝaGrandaRezulto {
    grandeco: number;
    kvanto: number;
}

interface SWMesaĝo {
    tipo: string;
    kaheloj?: string[];
}

// ⟪ Tutmondaj Variabloj 🌍 ⟫

let latEnigo: HTMLInputElement;
let lonEnigo: HTMLInputElement;
let latGradoj: HTMLInputElement;
let latMinutoj: HTMLInputElement;
let latSekundoj: HTMLInputElement;
let lonGradoj: HTMLInputElement;
let lonMinutoj: HTMLInputElement;
let lonSekundoj: HTMLInputElement;
let dmsEnigoj: HTMLInputElement[];

let langetoDecimala: HTMLButtonElement;
let langetoDMS: HTMLButtonElement;
let decimalajRegiloj: HTMLElement;
let dmsRegiloj: HTMLElement;

let eliraKoordinatoj: HTMLDivElement;
let kefAraq: HTMLDivElement;
let eliraNomo: HTMLDivElement;
let piak: HTMLDivElement;
let kanvaso: HTMLCanvasElement;
let kunteksto: CanvasRenderingContext2D;
let mapaUjo: HTMLElement;
let montruKadronMarko: HTMLInputElement;
let uzuBazo10Marko: HTMLInputElement;
let restarigaButono: HTMLButtonElement;

let elŝutaButono: HTMLButtonElement;
let forigiKaŝaButono: HTMLButtonElement;
let kaŝaStato: HTMLSpanElement;
let kaŝaGrando: HTMLSpanElement;
let progresStrio: HTMLDivElement;
let progresPlenigo: HTMLDivElement;
let elŝutaStato: HTMLElement;

let serĉaEnigo: HTMLInputElement;
let serĉaButono: HTMLButtonElement;
let serĉajRezultoj: HTMLElement;

let nunaLat = 47.48;
let nunaLon = -122.21;
let montruKadron = true;
let uzuBazo10 = false;

let mapo: any = null;
let markilo: any = null;

// ⟪ Datumaj Tabeloj 📚 ⟫

const KADRAJ_SISTEMOJ: KadraSistemo[] = [];

for ( let i = 0; i < 0o40; i++ ) {
    KADRAJ_SISTEMOJ.push({
        ksaka: {
            v: ["ᶅſ", "ſן", "ſȷ", "ŋᷠ", "ʃ", "ɽ͑ʃ'", "j͑ʃ'", "ſᶘ", "ɭ(", "ɭʃ", "j͑ʃ", "}ʃ", "j͐ʃ", "ſ̀ȷ", "ſɭ,", "ſɭˬ", "ɭl̀", "ſɟ", "ı],", "ſ͕ȷ", "ſ͔ɭ", "ſɭ", "֭ſɭ", "ſ͕ɭ", "j͑ʃɘ", "j͑ʃƨ", "j͑ʃᴜ̭", "j͑ʃƽ", "ſןᴜ̭", "ɭʃƽ", "ſɟɘ", "ſɭƨ"][i] || "?",
            hPrefix: ["ꞇ", "ɹ", "ɔ", "ᴜ", "w", "ɜ", "э", "эⅎ"],
            hSuffix: ["ʞ", "ⰱ", "ɔ˞", "ͷ̗", "ƴ", "ᶗ‹", "ƽ", "ȝ"]
        },
        latin: {
            v: ["w", "p", "f", "m", "b", "r", "v", "ts", "d", "t", "s", "n", "l", "tl", "z", "kz", "j", "c", "x", "y", "g", "k", "h", "q", "sp", "st", "sc", "sk", "pc", "tk", "cp", "kt"][i] || "?",
            hPrefix: ["i", "ii", "e", "a", "u", "o", "aa", "au"],
            hSuffix: ["f", "v", "s", "l", "z", "x", "k", "q"]
        },
        chmuah: {
            v: ["វ", "ព", "ប", "ម", "រ", "ត", "ដ", "ន", "យ", "ច", "ឆ", "ញ", "ហ", "ក", "ខ", "ង", "អ", "ផ", "ថ", "ល", "ប្រ", "ត្រ", "ច្រ", "ក្រ", "ផ្ល", "ថ្ល", "ឆ្ល", "ខ្ល", "ផ្ច", "ថ្ក", "ឆ្ប", "ខ្ត"][i] || "?",
            hPrefix: ["ី", "ិ", "េ", "ា", "ើ", "ុ", "ូ", ""],
            hSuffix: ["ប", "ត", "ស", "ក", "ម", "ន", "ល", "ង"]
        }
    });
}

// ⟪ Helpaj Funkcioj 🛠️ ⟫

function ĝisdatigiMapanPozicion( lat: number, lon: number, zomo: number | null = null ): void {
    nunaLat = lat;
    nunaLon = lon;
    markilo!.setLatLng([nunaLat, nunaLon]);
    if ( zomo !== null ) {
        mapo!.setView([nunaLat, nunaLon], zomo);
    }
    ĝisdatigiĈiujnEnigojn();
    ĝisdatigi();
}

function akiriElementojn( ...ids: string[] ): Record<string, HTMLElement | null> {
    const elementoj: Record<string, HTMLElement | null> = {};
    for ( const id of ids ) {
        elementoj[id] = document.getElementById(id);
    }
    return elementoj;
}

function aldoniEventajnAŭskultilojn( elementoj: HTMLElement[], evento: string, pritraktilo: EventListener ): void {
    for ( const el of elementoj ) {
        el.addEventListener(evento, pritraktilo);
    }
}

function alklampiKoordinaton( valoro: number, min: number, maks: number ): number {
    if ( valoro < min ) return min;
    if ( valoro > maks ) return maks;
    return valoro;
}

function ĝisdatigiMarkilanPozicion(): void {
    mapo!.setView([nunaLat, nunaLon]);
    markilo!.setLatLng([nunaLat, nunaLon]);
}

function analiziKoordinatoparojn( paroj: string[] ): { plenajV: number[]; plenajH: number[] } | null {
    const plenajV = [0, 0, 0, 0];
    const plenajH = [0, 0, 0, 0];
    const v: number[] = [];
    const h: number[] = [];

    for ( const paro of paroj ) {
        const mezo = Math.ceil(paro.length / 2);
        const vĈeno = paro.slice(0, mezo);
        const hĈeno = paro.slice(mezo);
        const vValoro = parseInt(vĈeno, 8);
        const hValoro = parseInt(hĈeno, 8);
        if ( isNaN(vValoro) || isNaN(hValoro) ) return null;
        v.push(vValoro - 1);
        h.push(hValoro - 1);
    }

    const komencaNivelo = 4 - paroj.length;
    for ( let i = 0; i < paroj.length; i++ ) {
        plenajV[komencaNivelo + i] = v[i];
        plenajH[komencaNivelo + i] = h[i];
    }

    return { plenajV, plenajH };
}

function kreiRezultbutonojn( ujselektilo: string, rezultoj: SerĉaRezulto[], zomo: number, postElektado: (lat: number, lon: number, celaZomo: number) => void ): void {
    const montritajRezultoj = rezultoj.slice(0, 0o40);
    document.querySelector(ujselektilo)!.innerHTML = montritajRezultoj.map(r => `
        <button data-lat="${r.lat}" data-lon="${r.lon}">
            <p><strong>${r.ksakaName}</strong> ( ${r.latinName} )</p>
            <small>${r.v + 1} ${r.h + 1}</small>
        </button>
    `).join("");

    document.querySelectorAll(`${ujselektilo} button`).forEach(ero => {
        ero.addEventListener("click", () => {
            const butono = ero as HTMLButtonElement;
            postElektado(parseFloat(butono.dataset.lat!), parseFloat(butono.dataset.lon!), zomo);
        });
    });
}

function kalkuliKadronivelojn( valoro: number, tutaĜis: number, dividoj: number[], _ĉuLongitudo = false ): number[] {
    let kruda1 = ( valoro / tutaĜis ) * dividoj[0];
    if ( kruda1 >= dividoj[0] ) kruda1 = dividoj[0] - 0.000001;
    if ( kruda1 < 0 ) kruda1 = 0;
    let nivelo1 = Math.floor(kruda1);
    let resto = kruda1 - nivelo1;

    const niveloj = [ nivelo1 ];
    for ( let i = 1; i < 4; i++ ) {
        let kruda = resto * dividoj[i];
        let nivelo = Math.floor(kruda);
        resto = kruda - nivelo;
        niveloj.push(nivelo);
    }
    return niveloj;
}

// ⟪ Inicialigo 🚀 ⟫

function inicialigiElementojn(): void {
    const elementoj = akiriElementojn(
        "latEnigo", "lonEnigo", "latGradoj", "latMinutoj", "latSekundoj",
        "lonGradoj", "lonMinutoj", "lonSekundoj", "langetoDecimala", "langetoDMS",
        "decimalajRegiloj", "dmsRegiloj", "eliraKoordinatoj", "kefAraq",
        "eliraNomo", "piak", "kradaKanvaso", "mapaUjo", "montruKadronMarko",
        "uzuBazo10Marko", "restarigaButono", "elŝutaButono",
        "forigiKaŝaButono", "kaŝaStato", "kaŝaGrando", "progresStrio",
        "progresPlenigo", "elŝutaStato", "serĉaEnigo", "serĉaButono", "serĉajRezultoj"
    ) as Record<string, HTMLElement>;

    latEnigo = elementoj.latEnigo as HTMLInputElement;
    lonEnigo = elementoj.lonEnigo as HTMLInputElement;
    latGradoj = elementoj.latGradoj as HTMLInputElement;
    latMinutoj = elementoj.latMinutoj as HTMLInputElement;
    latSekundoj = elementoj.latSekundoj as HTMLInputElement;
    lonGradoj = elementoj.lonGradoj as HTMLInputElement;
    lonMinutoj = elementoj.lonMinutoj as HTMLInputElement;
    lonSekundoj = elementoj.lonSekundoj as HTMLInputElement;
    dmsEnigoj = [ latGradoj, latMinutoj, latSekundoj, lonGradoj, lonMinutoj, lonSekundoj ];

    langetoDecimala = elementoj.langetoDecimala as HTMLButtonElement;
    langetoDMS = elementoj.langetoDMS as HTMLButtonElement;
    decimalajRegiloj = elementoj.decimalajRegiloj as HTMLElement;
    dmsRegiloj = elementoj.dmsRegiloj as HTMLElement;

    eliraKoordinatoj = elementoj.eliraKoordinatoj as HTMLDivElement;
    kefAraq = elementoj.kefAraq as HTMLDivElement;
    eliraNomo = elementoj.eliraNomo as HTMLDivElement;
    piak = elementoj.piak as HTMLDivElement;
    kanvaso = elementoj.kradaKanvaso as HTMLCanvasElement;
    kunteksto = kanvaso.getContext("2d")!;
    mapaUjo = elementoj.mapaUjo as HTMLElement;
    montruKadronMarko = elementoj.montruKadronMarko as HTMLInputElement;
    uzuBazo10Marko = elementoj.uzuBazo10Marko as HTMLInputElement;
    restarigaButono = elementoj.restarigaButono as HTMLButtonElement;

    elŝutaButono = elementoj.elŝutaButono as HTMLButtonElement;
    forigiKaŝaButono = elementoj.forigiKaŝaButono as HTMLButtonElement;
    kaŝaStato = elementoj.kaŝaStato as HTMLSpanElement;
    kaŝaGrando = elementoj.kaŝaGrando as HTMLSpanElement;
    progresStrio = elementoj.progresStrio as HTMLDivElement;
    progresPlenigo = elementoj.progresPlenigo as HTMLDivElement;
    elŝutaStato = elementoj.elŝutaStato as HTMLElement;

    serĉaEnigo = elementoj.serĉaEnigo as HTMLInputElement;
    serĉaButono = elementoj.serĉaButono as HTMLButtonElement;
    serĉajRezultoj = elementoj.serĉajRezultoj as HTMLElement;
}

function inicialigi(): void {
    inicialigiElementojn();

    const urlKoordinatoj = analiziURLkoordinatojn();
    if ( urlKoordinatoj ) {
        nunaLat = urlKoordinatoj.lat;
        nunaLon = urlKoordinatoj.lon;
    }

    mapo = L.map("map", {
        center: [nunaLat, nunaLon],
        zoom: ZOMO_KOMENCA,
        zoomControl: false
    });

    L.control.zoom({ position: "bottomright" }).addTo(mapo);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: ZOMO_MAKSIMUMA
    }).addTo(mapo);

    markilo = L.marker([nunaLat, nunaLon], {
        icon: L.divIcon({
            className: "custom-marker",
            html: "<div style=\"width:12px;height:12px;background:#fff;border:2px solid #d0a040;border-radius:50%;\"></div>",
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        })
    }).addTo(mapo);

    mapo.on("click", traktiMapklakonLeaflet);
    mapo.on("move", ĝisdatigiMapanSinkrone);
    mapo.on("zoom", ĝisdatigiMapanSinkrone);

    reskaligiKanvason();
    window.addEventListener("resize", reskaligiKanvason);

    aldoniEventajnAŭskultilojn([ latEnigo, lonEnigo ], "input", traktiDecimalanEnigon);

    dmsEnigoj.forEach(el => {
        el.addEventListener("input", traktiDMSEnigon);
        el.addEventListener("change", traktiDMSEnigon);
    });

    const latDuonsferoRadiobutonoj = document.querySelectorAll(`input[name="latDuonsfero"]`);
    const lonDuonsferoRadiobutonoj = document.querySelectorAll(`input[name="lonDuonsfero"]`);
    latDuonsferoRadiobutonoj.forEach(radio => radio.addEventListener("change", traktiDMSEnigon));
    lonDuonsferoRadiobutonoj.forEach(radio => radio.addEventListener("change", traktiDMSEnigon));

    langetoDecimala.addEventListener("click", () => ŝanĝiReĝimon("decimal"));
    langetoDMS.addEventListener("click", () => ŝanĝiReĝimon("dms"));

    montruKadronMarko.addEventListener("change", ( e ) => {
        montruKadron = ( e.target as HTMLInputElement ).checked;
        desegni();
    });

    uzuBazo10Marko.addEventListener("change", ( e ) => {
        uzuBazo10 = ( e.target as HTMLInputElement ).checked;
        ĝisdatigi();
    });

    const kadronurBaskulo = document.getElementById("kradonurBaskulo") as HTMLButtonElement;
    let kadronurReĝimo = false;
    kadronurBaskulo.addEventListener("click", () => {
        kadronurReĝimo = !kadronurReĝimo;
        kadronurBaskulo.setAttribute("aria-pressed", kadronurReĝimo.toString());
        document.querySelectorAll("#mapo .leaflet-tile-pane, #mapo .leaflet-layer")
            .forEach(kahelo => {
                ( kahelo as HTMLElement ).style.opacity = kadronurReĝimo ? "0" : "1";
            });
        desegni();
    } );

    restarigaButono.addEventListener("click", () => {
        ĝisdatigiMapanPozicion( 0, 0, ZOMO_RESTAŬRA );
    });

    const zomajRadiobutonoj = document.querySelectorAll(`input[name="zomoElektilo"]`);
    zomajRadiobutonoj.forEach(radio => radio.addEventListener("change", () => {
        // Zomonivelo ŝanĝita de la uzanto - povas esti uzata por deĉenigi mapan zomon se necese
    }));

    elŝutaButono.addEventListener( "click", elŝutiNunanVidon );
    forigiKaŝaButono.addEventListener( "click", forigiKaŝmemoron );

    serĉaButono.addEventListener( "click", serĉiAdreson );
    serĉaEnigo.addEventListener( "keypress", ( e ) => {
        if ( ( e as KeyboardEvent ).key === "Enter" ) {
            serĉiAdreson();
        }
    } );
    serĉaEnigo.addEventListener( "paste", traktiAlgluon );

    let urlĜisdatigaTemp: ReturnType<typeof setTimeout> | null = null;
    function ĝisdatigiURLMalfrue(): void {
        if ( urlĜisdatigaTemp ) clearTimeout( urlĜisdatigaTemp );
        urlĜisdatigaTemp = setTimeout( ĝisdatigiURL, 0o400 );
    }
    mapo.on( "moveend", ĝisdatigiURLMalfrue );
    mapo.on( "zoomend", ĝisdatigiURLMalfrue );

    ĝisdatigiĈiujnEnigojn();
    ĝisdatigi();
    ĝisdatigiKaŝinformojn();

    if ( "serviceWorker" in navigator ) {
        navigator.serviceWorker.register( "./j͑ʃᴜ ſɭɔ j͑ʃ'ɔ.js" )
            .then( reg => console.log( "Service Worker registrita.", reg ) )
            .catch( err => console.error( "Service Worker registrado malsukcesis.", err ) );
    }
}

function traktiMapklakonLeaflet( e: any ): void {
    ĝisdatigiMapanPozicion( e.latlng.lat, e.latlng.lng );
}

function ĝisdatigiMapanSinkrone(): void {
    const centro = mapo!.getCenter();
    ĝisdatigiMapanPozicion( centro.lat, centro.lng );
}

function ŝanĝiReĝimon( reĝimo: "decimal" | "dms" ): void {
    if ( reĝimo === "decimal" ) {
        langetoDecimala.setAttribute( "aria-pressed", "true" );
        langetoDMS.setAttribute( "aria-pressed", "false" );
        decimalajRegiloj.classList.remove( "kobe" );
        dmsRegiloj.classList.add( "kobe" );
    } else {
        langetoDMS.setAttribute( "aria-pressed", "true" );
        langetoDecimala.setAttribute( "aria-pressed", "false" );
        dmsRegiloj.classList.remove( "kobe" );
        decimalajRegiloj.classList.add( "kobe" );
    }
}

function reskaligiKanvason(): void {
    const rektangulo = mapaUjo.getBoundingClientRect();
    kanvaso.width = rektangulo.width;
    kanvaso.height = rektangulo.height;
    ĝisdatigi();
}

// ⟪ Datumprilaboro 📊 ⟫

function traktiDecimalanEnigon(): void {
    let lat = parseFloat( latEnigo.value );
    let lon = parseFloat( lonEnigo.value );

    if ( isNaN( lat ) ) lat = 0;
    if ( isNaN( lon ) ) lon = 0;
    lat = alklampiKoordinaton(lat, -90, 90);
    lon = alklampiKoordinaton(lon, -180, 180);

    nunaLat = lat;
    nunaLon = lon;

    ĝisdatigiMarkilanPozicion();

    ĝisdatigiDMSEnigojn();
    ĝisdatigi();
}

function traktiDMSEnigon(): void {
    let lGra = parseFloat( latGradoj.value ) || 0;
    let lMin = parseFloat( latMinutoj.value ) || 0;
    let lSek = parseFloat( latSekundoj.value ) || 0;
    let latDuonsfero = document.querySelector(`input[name="latDuonsfero"]:checked`)?.getAttribute("value") || "N";

    let loGra = parseFloat( lonGradoj.value ) || 0;
    let loMin = parseFloat( lonMinutoj.value ) || 0;
    let loSek = parseFloat( lonSekundoj.value ) || 0;
    let lonDuonsfero = document.querySelector(`input[name="lonDuonsfero"]:checked`)?.getAttribute("value") || "E";

    let dekLat = lGra + ( lMin / 60 ) + ( lSek / 3600 );
    if ( latDuonsfero === "S" ) dekLat = -dekLat;

    let dekLon = loGra + ( loMin / 60 ) + ( loSek / 3600 );
    if ( lonDuonsfero === "W" ) dekLon = -dekLon;

    dekLat = alklampiKoordinaton(dekLat, -90, 90);
    dekLon = alklampiKoordinaton(dekLon, -180, 180);

    nunaLat = dekLat;
    nunaLon = dekLon;

    ĝisdatigiMarkilanPozicion();

    latEnigo.value = nunaLat.toFixed( 5 );
    lonEnigo.value = nunaLon.toFixed( 5 );

    ĝisdatigi();
}

function ĝisdatigiĈiujnEnigojn(): void {
    latEnigo.value = nunaLat.toFixed( 5 );
    lonEnigo.value = nunaLon.toFixed( 5 );
    ĝisdatigiDMSEnigojn();
}

function ĝisdatigiDMSEnigojn(): void {
    const latObjekto = decimalaAlDMS( nunaLat );
    latGradoj.value = latObjekto.gra.toString();
    latMinutoj.value = latObjekto.min.toString();
    latSekundoj.value = latObjekto.sek.toFixed( 2 );
    const latRadio = document.querySelector(`input[name="latDuonsfero"][value="${nunaLat >= 0 ? "N" : "S"}"]`) as HTMLInputElement | null;
    if ( latRadio ) latRadio.checked = true;

    const lonObjekto = decimalaAlDMS( nunaLon );
    lonGradoj.value = lonObjekto.gra.toString();
    lonMinutoj.value = lonObjekto.min.toString();
    lonSekundoj.value = lonObjekto.sek.toFixed( 2 );
    const lonRadio = document.querySelector(`input[name="lonDuonsfero"][value="${nunaLon >= 0 ? "E" : "W"}"]`) as HTMLInputElement | null;
    if ( lonRadio ) lonRadio.checked = true;
}

function decimalaAlDMS( decimalo: number ): DMSObjekto {
    const absolutaValoro = Math.abs( decimalo );
    const gra = Math.floor( absolutaValoro );
    const minPlena = ( absolutaValoro - gra ) * 60;
    const min = Math.floor( minPlena );
    const sek = ( minPlena - min ) * 60;
    return { gra, min, sek };
}

// ⟪ Koordinata & Kadra Logiko 📍 ⟫

function akiriKadrajnKoordinatojn( lat: number, lon: number ): KadrajKoordinatoj {
    let bazaGradOkcidenten = ( lon <= 0 ) ? -lon : ( 360 - lon );
    if ( lon === 0 ) bazaGradOkcidenten = 0;

    let gradOkcidenten = ( bazaGradOkcidenten + KADRA_DEKALO ) % 360;
    const hNiveloj = kalkuliKadronivelojn( gradOkcidenten, 360, [ 0o100, 0o40, 0o40, 0o40 ] );

    const vNiveloj = kalkuliKadronivelojn( 90 - lat, 180, [ 0o40, 0o40, 0o40, 0o40 ] );

    return {
        v1: vNiveloj[ 0 ], h1: hNiveloj[ 0 ],
        v2: vNiveloj[ 1 ], h2: hNiveloj[ 1 ],
        v3: vNiveloj[ 2 ], h3: hNiveloj[ 2 ],
        v4: vNiveloj[ 3 ], h4: hNiveloj[ 3 ]
    };
}

function nivelojAlNormaligitaj( niveloj: number[], dividantoj: number[] ): number {
    let tuta = 0;
    for ( let i = 0; i < niveloj.length; i++ ) {
        let dividanto = 1;
        for ( let j = 0; j <= i; j++ ) {
            dividanto *= dividantoj[ j ];
        }
        tuta += niveloj[ i ] / dividanto;
    }
    return tuta;
}

function kadroAlLatLon( v1: number, h1: number, v2: number, h2: number, v3: number, h3: number, v4: number, h4: number ): AnalizitajKoordinatoj {
    const vNiveloj = [ v1, v2, v3, v4 ].map( v => Math.max( 0, v - 1 ) );
    const hNiveloj = [ h1, h2, h3, h4 ].map( h => Math.max( 0, h - 1 ) );

    const vTuta = nivelojAlNormaligitaj( vNiveloj, [ 0o40, 0o40, 0o40, 0o40 ] );
    const hTuta = nivelojAlNormaligitaj( hNiveloj, [ 0o100, 0o40, 0o40, 0o40 ] );

    let lat = 90 - ( vTuta * 180 );

    let gradOkcidenten = hTuta * 360;
    let bazaGradOkcidenten = ( gradOkcidenten - KADRA_DEKALO );
    while ( bazaGradOkcidenten < 0 ) bazaGradOkcidenten += 360;
    bazaGradOkcidenten = bazaGradOkcidenten % 360;

    let lon = ( bazaGradOkcidenten <= 180 ) ? -bazaGradOkcidenten : ( 360 - bazaGradOkcidenten );

    return { lat, lon };
}

function akiriNomon( v: number, h: number, sistemo: "ksaka" | "latin" | "chmuah" = "ksaka" ): string {
    const sys = KADRAJ_SISTEMOJ[ v ]?.[ sistemo ];
    if ( !sys ) return "?";

    const vNomo = sys.v;
    const pIndekso = Math.floor( h / 0o10 );
    const sIndekso = h % 0o10;
    const hNomo = ( sys.hPrefix[ pIndekso ] || "" ) + ( sys.hSuffix[ sIndekso ] || "" );
    return vNomo + hNomo;
}

function akiriLatinanNomon( v: number, h: number ): string {
    const nomo = akiriNomon( v, h, "latin" );
    return nomo.charAt( 0 ).toUpperCase() + nomo.slice( 1 );
}

function akiriĈmuahnomon( v: number, h: number ): string {
    return akiriNomon( v, h, "chmuah" );
}

function akiriNomojnPorKoordinatoj( vTabelo: number[], hTabelo: number[] ): { ksakaName: string; latinName: string; chmuahName: string } {
    return {
        ksakaName: vTabelo.map( ( v, i ) => akiriNomon( v - 1, hTabelo[ i ] - 1, "ksaka" ) ).join( " " ),
        latinName: vTabelo.map( ( v, i ) => akiriLatinanNomon( v - 1, hTabelo[ i ] - 1 ) ).join( " " ),
        chmuahName: vTabelo.map( ( v, i ) => akiriĈmuahnomon( v - 1, hTabelo[ i ] - 1 ) ).join( " " )
    };
}

function desegni(): void {
    const w = kanvaso.width;
    const h = kanvaso.height;
    kunteksto.clearRect( 0, 0, w, h );

    if ( !montruKadron || !mapo ) return;

    const zomo = mapo.getZoom();
    const limoj = mapo.getBounds();
    const nordo = limoj.getNorth();
    const sudo = limoj.getSouth();
    const oriento = limoj.getEast();
    const okcidento = limoj.getWest();

    function desegniKadrojnPorNivelo( vDividoj: number, hDividoj: number, koloro: string, larĝo: number ): void {
        kunteksto.beginPath();
        kunteksto.strokeStyle = koloro;
        kunteksto.lineWidth = larĝo;

        for ( let vIndekso = 0; vIndekso <= vDividoj; vIndekso++ ) {
            let lat = 90 - ( vIndekso / vDividoj ) * 180;
            if ( lat < sudo - 1 || lat > nordo + 1 ) continue;

            const p1 = mapo!.latLngToContainerPoint( [ lat, okcidento ] );
            const p2 = mapo!.latLngToContainerPoint( [ lat, oriento ] );

            kunteksto.moveTo( p1.x, p1.y );
            kunteksto.lineTo( p2.x, p2.y );
        }

        for ( let hIndekso = 0; hIndekso <= hDividoj; hIndekso++ ) {
            let proporcio = hIndekso / hDividoj;
            let gradOkcidentaDeŝovo = proporcio * 360;
            let bazaGradOkcidenten = ( gradOkcidentaDeŝovo - KADRA_DEKALO + 360 ) % 360;
            let lon = ( bazaGradOkcidenten <= 180 ) ? -bazaGradOkcidenten : ( 360 - bazaGradOkcidenten );

            const centraLon = ( okcidento + oriento ) / 2;
            let montraLon = lon;

            while ( montraLon < centraLon - 180 ) montraLon += 360;
            while ( montraLon > centraLon + 180 ) montraLon -= 360;

            let ĉuEnVido = false;

            if ( montraLon >= okcidento - 1 && montraLon <= oriento + 1 ) {
                ĉuEnVido = true;
            }
            else if ( oriento - okcidento > 180 ) {
                ĉuEnVido = true;
            }
            else {
                let volvitaLon1 = montraLon + 360;
                let volvitaLon2 = montraLon - 360;
                if ( ( volvitaLon1 >= okcidento - 1 && volvitaLon1 <= oriento + 1 ) ||
                    ( volvitaLon2 >= okcidento - 1 && volvitaLon2 <= oriento + 1 ) ) {
                    ĉuEnVido = true;
                }
            }

            if ( !ĉuEnVido ) continue;

            const p1 = mapo!.latLngToContainerPoint( [ nordo, montraLon ] );
            const p2 = mapo!.latLngToContainerPoint( [ sudo, montraLon ] );

            kunteksto.moveTo( p1.x, p1.y );
            kunteksto.lineTo( p2.x, p2.y );
        }
        kunteksto.stroke();
    }

    desegniKadrojnPorNivelo( 0o40, 0o100, "rgba(224, 160, 72, 0.5)", 3 );

    if ( zomo >= ZOMO_NIVELO_2 ) {
        desegniKadrojnPorNivelo( 0o40 * 0o40, 0o100 * 0o40, "rgba(224, 160, 72, 0.5)", 2 );
    }

    if ( zomo >= ZOMO_NIVELO_3 ) {
        desegniKadrojnPorNivelo( 0o40 * 0o40 * 0o40, 0o100 * 0o40 * 0o40, "rgba(224, 160, 72, 0.75)", 1 );
    }

    if ( zomo >= ZOMO_NIVELO_4 ) {
        desegniKadrojnPorNivelo( 0o40 * 0o40 * 0o40 * 0o40, 0o100 * 0o40 * 0o40 * 0o40, "rgba(224, 160, 72, 1)", 1 / 2 );
    }
}

function ĝisdatigi(): void {
    const n2k = akiriKadrajnKoordinatojn( nunaLat, nunaLon );

    const v1 = n2k.v1 + 1; const h1 = n2k.h1 + 1;
    const v2 = n2k.v2 + 1; const h2 = n2k.h2 + 1;
    const v3 = n2k.v3 + 1; const h3 = n2k.h3 + 1;
    const v4 = n2k.v4 + 1; const h4 = n2k.h4 + 1;

    let koordinatoj: string;
    if ( uzuBazo10 ) {
        koordinatoj = `${v1} ${h1} - ${v2} ${h2} - ${v3} ${h3} - ${v4} ${h4}`;
    } else {
        koordinatoj = `${window.vab6caja( v1 )} ${window.vab6caja( h1 )} - ${window.vab6caja( v2 )} ${window.vab6caja( h2 )} - ${window.vab6caja( v3 )} ${window.vab6caja( h3 )} - ${window.vab6caja( v4 )} ${window.vab6caja( h4 )}`;
    }

    eliraKoordinatoj.textContent = window.skakefK2fe( koordinatoj );

    const nomoj = akiriNomojnPorKoordinatoj( [ v1, v2, v3, v4 ], [ h1, h2, h3, h4 ] );
    kefAraq.innerHTML = nomoj.ksakaName;
    eliraNomo.innerHTML = nomoj.latinName;
    piak.innerHTML = nomoj.chmuahName;

    vacepu("cepufal");

    desegni();
}

// ⟪ Serĉo 🔍 ⟫

function analiziKoordinatanValoron( valoro: string ): number {
    if ( !valoro ) return 0;
    if ( Array.from(valoro).some( c => K2FE.includes( c ) ) ) {
        return vab6k2fekp6( valoro );
    }
    return uzuBazo10 ? parseInt( valoro, 0o12 ) : parseInt( valoro, 0o10 );
}

function ĉuKoordinataŜablono( demando: string ): boolean {
    const partoj = demando.trim().split( /[\s\-–—]+/ ).filter( p => p.length > 0 );
    if ( partoj.length < 2 ) return false;
    const nombraŜablono = new RegExp( `^[\\d${K2FE}]+$` );
    return partoj.every( p => nombraŜablono.test( p ) );
}

// ⟪ URL-Koordinata Prilaboro 🔗 ⟫

function analiziURLkoordinatojn(): AnalizitajKoordinatoj | null {
    const parametroj = new URLSearchParams( window.location.search );
    const koordinatoj = parametroj.get( "n2k" );
    if ( !koordinatoj ) return null;

    const paroj = koordinatoj.split( "-" ).filter( p => p.length > 0 );
    if ( paroj.length === 0 || paroj.length > 4 ) return null;

    const rezulto = analiziKoordinatoparojn(paroj);
    if ( !rezulto ) return null;

    const { plenajV, plenajH } = rezulto;
    const kadraRezulto = kadroAlLatLon(
        plenajV[ 0 ] + 1, plenajH[ 0 ] + 1,
        plenajV[ 1 ] + 1, plenajH[ 1 ] + 1,
        plenajV[ 2 ] + 1, plenajH[ 2 ] + 1,
        plenajV[ 3 ] + 1, plenajH[ 3 ] + 1
    );

    return { lat: kadraRezulto.lat, lon: kadraRezulto.lon };
}

function ĝisdatigiURL(): void {
    const n2k = akiriKadrajnKoordinatojn( nunaLat, nunaLon );
    const v = [ n2k.v1 + 1, n2k.v2 + 1, n2k.v3 + 1, n2k.v4 + 1 ];
    const h = [ n2k.h1 + 1, n2k.h2 + 1, n2k.h3 + 1, n2k.h4 + 1 ];

    const paroj: string[] = [];
    for ( let i = 0; i < 4; i++ ) {
        const vĈeno = v[ i ].toString( 0o10 ).padStart( 2, "0" );
        const hĈeno = h[ i ].toString( 0o10 ).padStart( 2, "0" );
        paroj.push( vĈeno + hĈeno );
    }

    const url = new URL( window.location.href );
    url.searchParams.set( "n2k", paroj.join( "-" ) );
    window.history.replaceState( {}, "", url );
}

function traktiAlgluon( e: ClipboardEvent ): void {
    const algluaĵo = e.clipboardData?.getData( "text" );
    if ( !algluaĵo ) return;

    try {
        const url = new URL( algluaĵo );
        const parametroj = new URLSearchParams( url.search );
        const koordinatoj = parametroj.get( "n2k" );

        if ( koordinatoj ) {
            e.preventDefault();
            const paroj = koordinatoj.split( "-" ).filter( p => p.length > 0 );
            const rezulto = analiziKoordinatoparojn(paroj);
            if ( !rezulto ) return;

            const { plenajV, plenajH } = rezulto;
            const kadraRezulto = kadroAlLatLon(
                plenajV[ 0 ] + 1, plenajH[ 0 ] + 1,
                plenajV[ 1 ] + 1, plenajH[ 1 ] + 1,
                plenajV[ 2 ] + 1, plenajH[ 2 ] + 1,
                plenajV[ 3 ] + 1, plenajH[ 3 ] + 1
            );

            let zomo = ZOMO_SERĈA_DEFŬLTA;
            if ( paroj.length >= 2 ) zomo = ZOMO_NIVELO_2;
            if ( paroj.length >= 3 ) zomo = ZOMO_NIVELO_3;
            if ( paroj.length >= 4 ) zomo = ZOMO_NIVELO_4;

            ĝisdatigiMapanPozicion( kadraRezulto.lat, kadraRezulto.lon, zomo );
            return;
        }
    } catch ( _eraro ) {
    }
}

function konstruiNomojn( vTabelo: number[], hTabelo: number[] ): { ksakaName: string; latinName: string; chmuahName: string } {
    return akiriNomojnPorKoordinatoj( vTabelo, hTabelo );
}

function serĉi( demando: string ): SerĉaReveno | null {
    if ( !demando ) return null;

    if ( ĉuKoordinataŜablono( demando ) ) {
        const paroj = demando.trim().split( /[\s]*[\-–—][\s]*/ ).filter( p => p.length > 0 );
        const analiziValoron = ( valoro: string ) => analiziKoordinatanValoron( valoro ) || 0;

        const v: number[] = [];
        const h: number[] = [];
        for ( const paro of paroj ) {
            const nombroj = paro.trim().split( /\s+/ ).filter( p => p.length > 0 );
            if ( nombroj.length >= 2 ) {
                v.push( analiziValoron( nombroj[ 0 ] ) );
                h.push( analiziValoron( nombroj[ 1 ] ) );
            } else if ( nombroj.length === 1 ) {
                if ( v.length === h.length ) {
                    v.push( analiziValoron( nombroj[ 0 ] ) );
                } else {
                    h.push( analiziValoron( nombroj[ 0 ] ) );
                }
            }
        }

        while ( v.length < 4 ) v.push( 0 );
        while ( h.length < 4 ) h.push( 0 );

        const rezulto = kadroAlLatLon( v[ 0 ], h[ 0 ], v[ 1 ], h[ 1 ], v[ 2 ], h[ 2 ], v[ 3 ], h[ 3 ] );
        const nombraNivelo = Math.max( 1, paroj.length );
        const nomoj = konstruiNomojn( v.slice( 0, nombraNivelo ), h.slice( 0, nombraNivelo ) );

        return {
            rezultoj: [{
                lat: rezulto.lat,
                lon: rezulto.lon,
                v: v[ 0 ],
                h: h[ 0 ],
                ...nomoj
            }],
            zomo: [ ZOMO_SERĈA_DEFŬLTA, ZOMO_NIVELO_2, ZOMO_NIVELO_3, ZOMO_NIVELO_4 ][ Math.min( nombraNivelo - 1, 3 ) ] || ZOMO_SERĈA_DEFŬLTA
        };
    }

    const demandopartoj = demando.trim().toLowerCase().split( /\s+/ ).filter( p => p.length > 0 );
    const nombroDePartoj = demandopartoj.length;
    if ( nombroDePartoj === 0 || nombroDePartoj > 4 ) return null;

    const nunajKoordinatoj = akiriKadrajnKoordinatojn( nunaLat, nunaLon );
    const nunajV = [ nunajKoordinatoj.v1, nunajKoordinatoj.v2, nunajKoordinatoj.v3, nunajKoordinatoj.v4 ];
    const nunajH = [ nunajKoordinatoj.h1, nunajKoordinatoj.h2, nunajKoordinatoj.h3, nunajKoordinatoj.h4 ];

    const rezultoj: SerĉaRezulto[] = [];

    function serĉiNivelon( nivelo: number, komencaNivelo: number, vTabelo: number[], hTabelo: number[], sistemo: "k" | "l" | "c" ): void {
        const hLimito = nivelo === 0 ? 0o100 : 0o40;
        const vLimito = 0o40;

        for ( let v = 0; v < vLimito; v++ ) {
            for ( let h = 0; h < hLimito; h++ ) {
                let nomo: string;
                if ( sistemo === "k" ) nomo = akiriNomon( v, h, "ksaka" );
                else if ( sistemo === "l" ) nomo = akiriLatinanNomon( v, h );
                else nomo = akiriĈmuahnomon( v, h );

                if ( !nomo.toLowerCase().startsWith( demandopartoj[ nivelo - komencaNivelo ] ) ) continue;

                const novajV = [ ...vTabelo, v ];
                const novajH = [ ...hTabelo, h ];
                const demandaIndekso = nivelo - komencaNivelo;

                if ( demandaIndekso === nombroDePartoj - 1 ) {
                    const plenajV = [ ...nunajV.slice( 0, komencaNivelo ), ...novajV ];
                    const plenajH = [ ...nunajH.slice( 0, komencaNivelo ), ...novajH ];

                    while ( plenajV.length < 4 ) { plenajV.push( 0 ); plenajH.push( 0 ); }

                    const koordinatoj = kadroAlLatLon(
                        plenajV[ 0 ] + 1, plenajH[ 0 ] + 1,
                        plenajV[ 1 ] + 1, plenajH[ 1 ] + 1,
                        plenajV[ 2 ] + 1, plenajH[ 2 ] + 1,
                        plenajV[ 3 ] + 1, plenajH[ 3 ] + 1
                    );
                    const nomoj = akiriNomojnPorKoordinatoj( plenajV.map( x => x + 1 ), plenajH.map( x => x + 1 ) );
                    rezultoj.push({
                        lat: koordinatoj.lat,
                        lon: koordinatoj.lon,
                        v: plenajV[ 0 ],
                        h: plenajH[ 0 ],
                        startLevel: komencaNivelo,
                        ...nomoj
                    });
                } else if ( nivelo < 3 ) {
                    serĉiNivelon( nivelo + 1, komencaNivelo, novajV, novajH, sistemo );
                }
            }
        }
    }

    for ( let komencaNivelo = 0; komencaNivelo <= 4 - nombroDePartoj; komencaNivelo++ ) {
        ( [ "k", "l", "c" ] as const ).forEach( ( sys ) => serĉiNivelon( komencaNivelo, komencaNivelo, [], [], sys ) );
    }

    rezultoj.sort( ( a, b ) => {
        const distA = Math.abs( a.lat - nunaLat ) + Math.abs( a.lon - nunaLon );
        const distB = Math.abs( b.lat - nunaLat ) + Math.abs( b.lon - nunaLon );
        return distA - distB;
    });

    return rezultoj.length > 0 ? { rezultoj } : null;
}

function montriSerĉajnRezultojn( rezulto: SerĉaReveno | null ): void {
    if ( !rezulto ) {
        serĉajRezultoj.innerHTML = "<p>֭ſɭɹ ſɟɔ j͐ʃɹʞ ⟅</p>";
        serĉajRezultoj.classList.remove( "kobe" );
        return;
    }

    const { rezultoj, zomo } = rezulto;
    const demandopartoj = serĉaEnigo.value.trim().split( /\s+/ ).filter( p => p.length > 0 );
    const montriListon = demandopartoj.length >= 2 || rezultoj.length > 1;

    if ( !montriListon && rezultoj.length === 1 ) {
        const r = rezultoj[ 0 ];
        ĝisdatigiMapanPozicion( r.lat, r.lon, zomo || ZOMO_NIVELO_2 );
        serĉajRezultoj.classList.add( "kobe" );
        return;
    }

    kreiRezultbutonojn("#serĉajRezultoj", rezultoj, zomo || ZOMO_NIVELO_2, (lat, lon, celaZomo) => {
        ĝisdatigiMapanPozicion(lat, lon, celaZomo);
        serĉajRezultoj.classList.add("kobe");
        serĉaEnigo.value = "";
    });

    serĉajRezultoj.classList.remove( "kobe" );
}

async function serĉiAdreson(): Promise<void> {
    const demando = serĉaEnigo.value.trim();
    if ( !demando ) return;

    const rezulto = serĉi( demando );
    if ( rezulto ) {
        montriSerĉajnRezultojn( rezulto );
        return;
    }

    serĉajRezultoj.innerHTML = "<p>ſɭᴎɔ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ</p>";
    serĉajRezultoj.classList.remove( "kobe" );

    try {
        const respondo = await fetch( `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent( demando )}&limit=5` );
        if ( !respondo.ok ) throw new Error( "( ſ͕ȷɜƣ̋ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ )" );

        const rezultoj: any[] = await respondo.json();
        if ( rezultoj.length === 0 ) {
            serĉajRezultoj.innerHTML = "<p>֭ſɭɹ ſɟɔ j͐ʃɹʞ ⟅</p>";
            return;
        }

        const osmajRezultoj: SerĉaRezulto[] = rezultoj.map(rezultato => ({
            lat: parseFloat(rezultato.lat),
            lon: parseFloat(rezultato.lon),
            ksakaName: rezultato.display_name,
            latinName: rezultato.display_name,
            chmuahName: rezultato.display_name,
            v: 0,
            h: 0
        }));

        kreiRezultbutonojn("#serĉajRezultoj", osmajRezultoj, 0o20, (lat, lon) => {
            ĝisdatigiMapanPozicion(lat, lon, 0o20);
            serĉajRezultoj.classList.add("kobe");
            serĉaEnigo.value = "";
        });

    } catch ( eraro ) {
        console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", eraro );
        serĉajRezultoj.innerHTML = "<p>ſ͕ȷɜƣ̋ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ⟅</p>";
    }
}

// ⟪ Malreteca funkciado 📥 ⟫

async function elŝutiNunanVidon(): Promise<void> {
    const zomo = parseInt( document.querySelector(`input[name="zomoElektilo"]:checked`)?.getAttribute("value") || "7" );
    const limoj = mapo!.getBounds();

    elŝutaButono.disabled = true;
    progresStrio.classList.add( "active" );
    elŝutaStato.textContent = "ſɭᴎɔ j͑ʃ'ɔ ſɟᴜ ſɭɹ ſȷɔ ⟅";

    const kaheloj = akiriKahelanListon( limoj, zomo );
    const tuta = kaheloj.length;

    if ( tuta > 0o400 ) {
        if ( !confirm( `Ĉi tio elŝutos ${tuta} kahelojn ( ~ ${( tuta * 1 / 0o20 ).toFixed( 1 ) } MB ) . Daŭrigi ?` ) ) {
            elŝutaButono.disabled = false;
            progresStrio.classList.remove( "active" );
            elŝutaStato.textContent = "";
            return;
        }
    }

    elŝutaStato.textContent = `ſɭᶗ‹ɔ ſ͕ɭwc̭ ſɭɹ j͐ʃ ${tuta} j͑ʃᴜꞇ ſɭɔƽ ⟅`;

    try {
        const rezulto = await sendiMesaĝonAlSW( { tipo: "CACHE_TILES", kaheloj } ) as KaŝaGrandaRezulto;
        progresPlenigo.style.width = "100%";
        setTimeout( () => {
            elŝutaStato.textContent = `ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ ſ͕ɭwc̭ ſɭɹ j͐ʃ ${rezulto.kvanto} j͑ʃᴜꞇ ſɭɔƽ ✅ ⟅`;
            progresStrio.classList.remove( "active" );
            progresPlenigo.style.width = "0%";
            ĝisdatigiKaŝinformojn();
        }, 0o400 );
    } catch ( eraro ) {
        elŝutaStato.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${( eraro as Error ).message} ❌ ⟅`;
        progresStrio.classList.remove( "active" );
    }

    elŝutaButono.disabled = false;
}

function akiriKahelanURL( x: number, y: number, z: number ): string {
    return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
}

function latLonAlKahelo( lat: number, lon: number, zomo: number ): { x: number; y: number } {
    const skalo = Math.pow(2, zomo);
    const x = Math.floor(( lon + 180 ) / 360 * skalo);
    const y = Math.floor(( 1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * skalo);
    return { x, y };
}

function akiriKahelanListon( limoj: any, zomo: number ): string[] {
    const kaheloj: string[] = [];
    const nw = limoj.getNorthWest();
    const se = limoj.getSouthEast();

    const minKahelo = latLonAlKahelo(nw.lat, nw.lng, zomo);
    const maksKahelo = latLonAlKahelo(se.lat, se.lng, zomo);

    for ( let x = minKahelo.x; x <= maksKahelo.x; x++ ) {
        for ( let y = minKahelo.y; y <= maksKahelo.y; y++ ) {
            kaheloj.push(akiriKahelanURL( x, y, zomo ));
        }
    }

    return kaheloj;
}

async function forigiKaŝmemoron(): Promise<void> {
    if ( !confirm( "Forigi ĉiujn kaŝitajn kahelojn ?" ) ) return;

    forigiKaŝaButono.disabled = true;
    try {
        await sendiMesaĝonAlSW({ tipo: "CLEAR_TILE_CACHE" });
        elŝutaStato.textContent = "ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ j͐ʃэ j͑ʃ'ᴜ ᶅſɔ ✅ ⟅";
        ĝisdatigiKaŝinformojn();
        setTimeout(() => elŝutaStato.textContent = "", 0o3000);
    } catch ( eraro ) {
        elŝutaStato.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${( eraro as Error ).message} ❌ ⟅`;
    }
    forigiKaŝaButono.disabled = false;
}

async function ĝisdatigiKaŝinformojn(): Promise<void> {
    try {
        const rezulto = await sendiMesaĝonAlSW( { tipo: "GET_CACHE_SIZE" } ) as KaŝaGrandaRezulto;
        kaŝaStato.textContent = `ꞁȷ̀ɜ ſןᴜ ʃɜƽ ꞁȷ̀ᴜꞇ j͑ʃ'ɜ ſןɹ - ${rezulto.grandeco} ⟅`;
        kaŝaGrando.textContent = `~ ${( rezulto.grandeco * 1 / 0o10 ).toFixed(1)} j͑ʃᴜꞇ ꞙɭц ſɟᴜ ꞙɭıɔ ⟅`;
    } catch ( eraro ) {
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", eraro);
    }
}

function sendiMesaĝonAlSW( mesaĝo: SWMesaĝo ): Promise<any> {
    return new Promise(( solvi, rifuzi ) => {
        if ( !navigator.serviceWorker.controller ) {
            rifuzi(new Error("Neniu servilo-laboranto reganto"));
            return;
        }

        const mesaĝaKanalo = new MessageChannel();
        mesaĝaKanalo.port1.onmessage = ( evento ) => {
            if ( evento.data.eraro ) {
                rifuzi(new Error(evento.data.eraro));
            } else {
                solvi( evento.data );
            }
        };

        navigator.serviceWorker.controller.postMessage(mesaĝo, [ mesaĝaKanalo.port2 ]);
    } );
}

inicialigi();
