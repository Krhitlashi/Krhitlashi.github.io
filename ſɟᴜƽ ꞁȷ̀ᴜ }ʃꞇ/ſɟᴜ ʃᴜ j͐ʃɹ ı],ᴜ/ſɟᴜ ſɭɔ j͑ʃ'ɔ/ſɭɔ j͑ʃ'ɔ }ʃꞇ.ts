// ≺⧼ ſɟᴜ ſɭɔ j͑ʃ'ɔ - Ktash Coordinate Map ⧽≻

// ⟪ External Declarations 🔌 ⟫

declare const L: any;
declare const vab6k2fekp6: ( text: string ) => number;
declare const K2FE: string[];

// ⟪ Constants 🔢 ⟫

const GRID_OFFSET = 11.62354;

const ZOOM_INITIAL = 0o7;
const ZOOM_MAX = 0o22;
const ZOOM_SEARCH_DEFAULT = 0o3;
const ZOOM_LEVEL_2 = 0o10;
const ZOOM_LEVEL_3 = 0o14;
const ZOOM_LEVEL_4 = 0o20;
const ZOOM_RESET = 0o3;

// ⟪ Types 📐 ⟫

interface GridSystem {
    ksaka: { v: string; hPrefix: string[]; hSuffix: string[] };
    latin: { v: string; hPrefix: string[]; hSuffix: string[] };
    chmuah: { v: string; hPrefix: string[]; hSuffix: string[] };
}

interface GridCoords {
    v1: number; h1: number;
    v2: number; h2: number;
    v3: number; h3: number;
    v4: number; h4: number;
}

interface SearchResult {
    lat: number;
    lon: number;
    v: number;
    h: number;
    startLevel?: number;
    ksakaName: string;
    latinName: string;
    chmuahName: string;
}

interface SearchReturn {
    results: SearchResult[];
    zoom?: number;
}

interface ParsedCoords {
    lat: number;
    lon: number;
}

interface DMSObject {
    deg: number;
    min: number;
    sec: number;
}

interface CacheSizeResult {
    size: number;
    count: number;
}

interface SWMessage {
    type: string;
    tiles?: string[];
}

// ⟪ Global Variables 🌍 ⟫

let latInput: HTMLInputElement;
let lonInput: HTMLInputElement;
let latDeg: HTMLInputElement;
let latMin: HTMLInputElement;
let latSec: HTMLInputElement;
let lonDeg: HTMLInputElement;
let lonMin: HTMLInputElement;
let lonSec: HTMLInputElement;
let dmsInputs: HTMLInputElement[];

let tabDecimal: HTMLButtonElement;
let tabDMS: HTMLButtonElement;
let decimalControls: HTMLElement;
let dmsControls: HTMLElement;

let outputCoords: HTMLDivElement;
let kefAraq: HTMLDivElement;
let outputName: HTMLDivElement;
let piak: HTMLDivElement;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let mapContainer: HTMLElement;
let showGridCheck: HTMLInputElement;
let useBase10Check: HTMLInputElement;
let resetBtn: HTMLButtonElement;

let downloadBtn: HTMLButtonElement;
let clearCacheBtn: HTMLButtonElement;
let cacheStatus: HTMLSpanElement;
let cacheSize: HTMLSpanElement;
let progressBar: HTMLDivElement;
let progressFill: HTMLDivElement;
let downloadStatus: HTMLElement;

let searchInput: HTMLInputElement;
let searchBtn: HTMLButtonElement;
let searchResults: HTMLElement;

let currentLat = 47.48;
let currentLon = -122.21;
let showGrid = true;
let useBase10 = false;

let map: any = null;
let marker: any = null;

// ⟪ Data Arrays 📚 ⟫

const GRID_SYSTEMS: GridSystem[] = [];

for ( let i = 0; i < 0o40; i++ ) {
    GRID_SYSTEMS.push({
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

// ⟪ Helper Functions 🛠️ ⟫

function updateMapPosition(lat: number, lon: number, zoom: number | null = null): void {
    currentLat = lat;
    currentLon = lon;
    marker!.setLatLng([currentLat, currentLon]);
    if ( zoom !== null ) {
        map!.setView([currentLat, currentLon], zoom);
    }
    updateAllInputs();
    update();
}

function getElements(...ids: string[]): Record<string, HTMLElement | null> {
    const elements: Record<string, HTMLElement | null> = {};
    for ( const id of ids ) {
        elements[id] = document.getElementById(id);
    }
    return elements;
}

function addEventListeners(elements: HTMLElement[], event: string, handler: EventListener): void {
    for ( const el of elements ) {
        el.addEventListener(event, handler);
    }
}

function clampCoordinate(value: number, min: number, max: number): number {
    if ( value < min ) return min;
    if ( value > max ) return max;
    return value;
}

function updateMarkerPosition(): void {
    map!.setView([currentLat, currentLon]);
    marker!.setLatLng([currentLat, currentLon]);
}

function parseCoordinatePairs(pairs: string[]): { fullV: number[]; fullH: number[] } | null {
    const fullV = [0, 0, 0, 0];
    const fullH = [0, 0, 0, 0];
    const v: number[] = [];
    const h: number[] = [];

    for ( const pair of pairs ) {
        const mid = Math.ceil(pair.length / 2);
        const vStr = pair.slice(0, mid);
        const hStr = pair.slice(mid);
        const vVal = parseInt(vStr, 8);
        const hVal = parseInt(hStr, 8);
        if ( isNaN(vVal) || isNaN(hVal) ) return null;
        v.push(vVal - 1);
        h.push(hVal - 1);
    }

    const startLevel = 4 - pairs.length;
    for ( let i = 0; i < pairs.length; i++ ) {
        fullV[startLevel + i] = v[i];
        fullH[startLevel + i] = h[i];
    }

    return { fullV, fullH };
}

function createResultButtons(containerSelector: string, results: SearchResult[], zoom: number, onSelect: (lat: number, lon: number, targetZoom: number) => void): void {
    const displayResults = results.slice(0, 0o40);
    document.querySelector(containerSelector)!.innerHTML = displayResults.map(r => `
        <button data-lat="${r.lat}" data-lon="${r.lon}">
            <p><strong>${r.ksakaName}</strong> ( ${r.latinName} )</p>
            <small>${r.v + 1} ${r.h + 1}</small>
        </button>
    `).join("");

    document.querySelectorAll(`${containerSelector} button`).forEach(item => {
        item.addEventListener("click", () => {
            const btn = item as HTMLButtonElement;
            onSelect(parseFloat(btn.dataset.lat!), parseFloat(btn.dataset.lon!), zoom);
        });
    });
}

function calcGridLevels(value: number, totalRange: number, divisions: number[], _isLongitude = false): number[] {
    let raw1 = ( value / totalRange ) * divisions[0];
    if ( raw1 >= divisions[0] ) raw1 = divisions[0] - 0.000001;
    if ( raw1 < 0 ) raw1 = 0;
    let level1 = Math.floor(raw1);
    let remainder = raw1 - level1;

    const levels = [ level1 ];
    for ( let i = 1; i < 4; i++ ) {
        let raw = remainder * divisions[i];
        let level = Math.floor(raw);
        remainder = raw - level;
        levels.push(level);
    }
    return levels;
}

// ⟪ Initialization 🚀 ⟫

function initElements(): void {
    const elements = getElements(
        "latInput", "lonInput", "latDeg", "latMin", "latSec",
        "lonDeg", "lonMin", "lonSec", "tabDecimal", "tabDMS",
        "decimalControls", "dmsControls", "outputCoords", "kefAraq",
        "outputName", "piak", "gridCanvas", "mapContainer", "showGridCheck",
        "useBase10Check", "resetBtn", "downloadBtn",
        "clearCacheBtn", "cacheStatus", "cacheSize", "progressBar",
        "progressFill", "downloadStatus", "searchInput", "searchBtn", "searchResults"
    ) as Record<string, HTMLElement>;

    latInput = elements.latInput as HTMLInputElement;
    lonInput = elements.lonInput as HTMLInputElement;
    latDeg = elements.latDeg as HTMLInputElement;
    latMin = elements.latMin as HTMLInputElement;
    latSec = elements.latSec as HTMLInputElement;
    lonDeg = elements.lonDeg as HTMLInputElement;
    lonMin = elements.lonMin as HTMLInputElement;
    lonSec = elements.lonSec as HTMLInputElement;
    dmsInputs = [ latDeg, latMin, latSec, lonDeg, lonMin, lonSec ];

    tabDecimal = elements.tabDecimal as HTMLButtonElement;
    tabDMS = elements.tabDMS as HTMLButtonElement;
    decimalControls = elements.decimalControls as HTMLElement;
    dmsControls = elements.dmsControls as HTMLElement;

    outputCoords = elements.outputCoords as HTMLDivElement;
    kefAraq = elements.kefAraq as HTMLDivElement;
    outputName = elements.outputName as HTMLDivElement;
    piak = elements.piak as HTMLDivElement;
    canvas = elements.gridCanvas as HTMLCanvasElement;
    ctx = canvas.getContext("2d")!;
    mapContainer = elements.mapContainer as HTMLElement;
    showGridCheck = elements.showGridCheck as HTMLInputElement;
    useBase10Check = elements.useBase10Check as HTMLInputElement;
    resetBtn = elements.resetBtn as HTMLButtonElement;

    downloadBtn = elements.downloadBtn as HTMLButtonElement;
    clearCacheBtn = elements.clearCacheBtn as HTMLButtonElement;
    cacheStatus = elements.cacheStatus as HTMLSpanElement;
    cacheSize = elements.cacheSize as HTMLSpanElement;
    progressBar = elements.progressBar as HTMLDivElement;
    progressFill = elements.progressFill as HTMLDivElement;
    downloadStatus = elements.downloadStatus as HTMLElement;

    searchInput = elements.searchInput as HTMLInputElement;
    searchBtn = elements.searchBtn as HTMLButtonElement;
    searchResults = elements.searchResults as HTMLElement;
}

function init(): void {
    initElements();

    const urlCoords = parseURLCoords();
    if ( urlCoords ) {
        currentLat = urlCoords.lat;
        currentLon = urlCoords.lon;
    }

    map = L.map("map", {
        center: [currentLat, currentLon],
        zoom: ZOOM_INITIAL,
        zoomControl: false
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: ZOOM_MAX
    }).addTo(map);

    marker = L.marker([currentLat, currentLon], {
        icon: L.divIcon({
            className: "custom-marker",
            html: "<div style=\"width:12px;height:12px;background:#fff;border:2px solid #d0a040;border-radius:50%;\"></div>",
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        })
    }).addTo(map);

    map.on("click", handleMapClickLeaflet);
    map.on("move", updateMapSync);
    map.on("zoom", updateMapSync);

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    addEventListeners([ latInput, lonInput ], "input", handleDecimalInput);

    dmsInputs.forEach(el => {
        el.addEventListener("input", handleDMSInput);
        el.addEventListener("change", handleDMSInput);
    });

    const latHemRadios = document.querySelectorAll(`input[name="latHem"]`);
    const lonHemRadios = document.querySelectorAll(`input[name="lonHem"]`);
    latHemRadios.forEach(radio => radio.addEventListener("change", handleDMSInput));
    lonHemRadios.forEach(radio => radio.addEventListener("change", handleDMSInput));

    tabDecimal.addEventListener("click", () => switchMode("decimal"));
    tabDMS.addEventListener("click", () => switchMode("dms"));

    showGridCheck.addEventListener("change", ( e ) => {
        showGrid = ( e.target as HTMLInputElement ).checked;
        draw();
    });

    useBase10Check.addEventListener("change", ( e ) => {
        useBase10 = ( e.target as HTMLInputElement ).checked;
        update();
    });

    const gridOnlyToggle = document.getElementById("gridOnlyToggle") as HTMLButtonElement;
    let gridOnlyMode = false;
    gridOnlyToggle.addEventListener("click", () => {
        gridOnlyMode = !gridOnlyMode;
        gridOnlyToggle.setAttribute("aria-pressed", gridOnlyMode.toString());
        document.querySelectorAll("#map .leaflet-tile-pane, #map .leaflet-layer")
            .forEach(tile => {
                ( tile as HTMLElement ).style.opacity = gridOnlyMode ? "0" : "1";
            });
        draw();
    } );

    resetBtn.addEventListener("click", () => {
        updateMapPosition( 0, 0, ZOOM_RESET );
    });

    const zoomRadios = document.querySelectorAll(`input[name="zoomSelect"]`);
    zoomRadios.forEach(radio => radio.addEventListener("change", () => {
        // Zoom level changed by user - can be used to trigger map zoom if needed
    }));

    downloadBtn.addEventListener( "click", downloadCurrentView );
    clearCacheBtn.addEventListener( "click", clearCache );

    searchBtn.addEventListener( "click", searchAddress );
    searchInput.addEventListener( "keypress", ( e ) => {
        if ( ( e as KeyboardEvent ).key === "Enter" ) {
            searchAddress();
        }
    } );
    searchInput.addEventListener( "paste", handlePaste );

    let urlUpdateTimeout: ReturnType<typeof setTimeout> | null = null;
    function updateURLDebounced(): void {
        if ( urlUpdateTimeout ) clearTimeout( urlUpdateTimeout );
        urlUpdateTimeout = setTimeout( updateURL, 0o400 );
    }
    map.on( "moveend", updateURLDebounced );
    map.on( "zoomend", updateURLDebounced );

    updateAllInputs();
    update();
    updateCacheInfo();

    if ( "serviceWorker" in navigator ) {
        navigator.serviceWorker.register( "./j͑ʃᴜ ſɭɔ j͑ʃ'ɔ.js" )
            .then( reg => console.log( "Service Worker registered.", reg ) )
            .catch( err => console.error( "Service Worker registration failed.", err ) );
    }
}

function handleMapClickLeaflet( e: any ): void {
    updateMapPosition( e.latlng.lat, e.latlng.lng );
}

function updateMapSync(): void {
    const center = map!.getCenter();
    updateMapPosition( center.lat, center.lng );
}

function switchMode( mode: "decimal" | "dms" ): void {
    if ( mode === "decimal" ) {
        tabDecimal.setAttribute( "aria-pressed", "true" );
        tabDMS.setAttribute( "aria-pressed", "false" );
        decimalControls.classList.remove( "hidden" );
        dmsControls.classList.add( "hidden" );
    } else {
        tabDMS.setAttribute( "aria-pressed", "true" );
        tabDecimal.setAttribute( "aria-pressed", "false" );
        dmsControls.classList.remove( "hidden" );
        decimalControls.classList.add( "hidden" );
    }
}

function resizeCanvas(): void {
    const rect = mapContainer.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    update();
}

// ⟪ Data Handling 📊 ⟫

function handleDecimalInput(): void {
    let lat = parseFloat( latInput.value );
    let lon = parseFloat( lonInput.value );

    if ( isNaN( lat ) ) lat = 0;
    if ( isNaN( lon ) ) lon = 0;
    lat = clampCoordinate(lat, -90, 90);
    lon = clampCoordinate(lon, -180, 180);

    currentLat = lat;
    currentLon = lon;

    updateMarkerPosition();

    updateDMSInputs();
    update();
}

function handleDMSInput(): void {
    let lDeg = parseFloat( latDeg.value ) || 0;
    let lMin = parseFloat( latMin.value ) || 0;
    let lSec = parseFloat( latSec.value ) || 0;
    let lHem = document.querySelector(`input[name="latHem"]:checked`)?.getAttribute("value") || "N";

    let loDeg = parseFloat( lonDeg.value ) || 0;
    let loMin = parseFloat( lonMin.value ) || 0;
    let loSec = parseFloat( lonSec.value ) || 0;
    let loHem = document.querySelector(`input[name="lonHem"]:checked`)?.getAttribute("value") || "E";

    let decLat = lDeg + ( lMin / 60 ) + ( lSec / 3600 );
    if ( lHem === "S" ) decLat = -decLat;

    let decLon = loDeg + ( loMin / 60 ) + ( loSec / 3600 );
    if ( loHem === "W" ) decLon = -decLon;

    decLat = clampCoordinate(decLat, -90, 90);
    decLon = clampCoordinate(decLon, -180, 180);

    currentLat = decLat;
    currentLon = decLon;

    updateMarkerPosition();

    latInput.value = currentLat.toFixed( 5 );
    lonInput.value = currentLon.toFixed( 5 );

    update();
}

function updateAllInputs(): void {
    latInput.value = currentLat.toFixed( 5 );
    lonInput.value = currentLon.toFixed( 5 );
    updateDMSInputs();
}

function updateDMSInputs(): void {
    const latObj = decimalToDMS( currentLat );
    latDeg.value = latObj.deg.toString();
    latMin.value = latObj.min.toString();
    latSec.value = latObj.sec.toFixed( 2 );
    const latRadio = document.querySelector(`input[name="latHem"][value="${currentLat >= 0 ? "N" : "S"}"]`) as HTMLInputElement | null;
    if ( latRadio ) latRadio.checked = true;

    const lonObj = decimalToDMS( currentLon );
    lonDeg.value = lonObj.deg.toString();
    lonMin.value = lonObj.min.toString();
    lonSec.value = lonObj.sec.toFixed( 2 );
    const lonRadio = document.querySelector(`input[name="lonHem"][value="${currentLon >= 0 ? "E" : "W"}"]`) as HTMLInputElement | null;
    if ( lonRadio ) lonRadio.checked = true;
}

function decimalToDMS( decimal: number ): DMSObject {
    const absVal = Math.abs( decimal );
    const deg = Math.floor( absVal );
    const minFull = ( absVal - deg ) * 60;
    const min = Math.floor( minFull );
    const sec = ( minFull - min ) * 60;
    return { deg, min, sec };
}

// ⟪ Coordinate & Grid Logic 📍 ⟫

function getGridCoords( lat: number, lon: number ): GridCoords {
    let baseDegWest = ( lon <= 0 ) ? -lon : ( 360 - lon );
    if ( lon === 0 ) baseDegWest = 0;

    let degWest = ( baseDegWest + GRID_OFFSET ) % 360;
    const hLevels = calcGridLevels( degWest, 360, [ 0o100, 0o40, 0o40, 0o40 ] );

    const vLevels = calcGridLevels( 90 - lat, 180, [ 0o40, 0o40, 0o40, 0o40 ] );

    return {
        v1: vLevels[ 0 ], h1: hLevels[ 0 ],
        v2: vLevels[ 1 ], h2: hLevels[ 1 ],
        v3: vLevels[ 2 ], h3: hLevels[ 2 ],
        v4: vLevels[ 3 ], h4: hLevels[ 3 ]
    };
}

function levelsToNormalized( levels: number[], divisors: number[] ): number {
    let total = 0;
    for ( let i = 0; i < levels.length; i++ ) {
        let divisor = 1;
        for ( let j = 0; j <= i; j++ ) {
            divisor *= divisors[ j ];
        }
        total += levels[ i ] / divisor;
    }
    return total;
}

function gridToLatLon( v1: number, h1: number, v2: number, h2: number, v3: number, h3: number, v4: number, h4: number ): ParsedCoords {
    const vLevels = [ v1, v2, v3, v4 ].map( v => Math.max( 0, v - 1 ) );
    const hLevels = [ h1, h2, h3, h4 ].map( h => Math.max( 0, h - 1 ) );

    const vTotal = levelsToNormalized( vLevels, [ 0o40, 0o40, 0o40, 0o40 ] );
    const hTotal = levelsToNormalized( hLevels, [ 0o100, 0o40, 0o40, 0o40 ] );

    let lat = 90 - ( vTotal * 180 );

    let degWest = hTotal * 360;
    let baseDegWest = ( degWest - GRID_OFFSET );
    while ( baseDegWest < 0 ) baseDegWest += 360;
    baseDegWest = baseDegWest % 360;

    let lon = ( baseDegWest <= 180 ) ? -baseDegWest : ( 360 - baseDegWest );

    return { lat, lon };
}

function getName( v: number, h: number, system: "ksaka" | "latin" | "chmuah" = "ksaka" ): string {
    const sys = GRID_SYSTEMS[ v ]?.[ system ];
    if ( !sys ) return "?";

    const vName = sys.v;
    const pIndex = Math.floor( h / 0o10 );
    const sIndex = h % 0o10;
    const hName = ( sys.hPrefix[ pIndex ] || "" ) + ( sys.hSuffix[ sIndex ] || "" );
    return vName + hName;
}

function getNameLatin( v: number, h: number ): string {
    const name = getName( v, h, "latin" );
    return name.charAt( 0 ).toUpperCase() + name.slice( 1 );
}

function getNameChmuah( v: number, h: number ): string {
    return getName( v, h, "chmuah" );
}

function getNamesForCoords( vArr: number[], hArr: number[] ): { ksakaName: string; latinName: string; chmuahName: string } {
    return {
        ksakaName: vArr.map( ( v, i ) => getName( v - 1, hArr[ i ] - 1, "ksaka" ) ).join( " " ),
        latinName: vArr.map( ( v, i ) => getNameLatin( v - 1, hArr[ i ] - 1 ) ).join( " " ),
        chmuahName: vArr.map( ( v, i ) => getNameChmuah( v - 1, hArr[ i ] - 1 ) ).join( " " )
    };
}

function draw(): void {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect( 0, 0, w, h );

    if ( !showGrid || !map ) return;

    const zoom = map.getZoom();
    const bounds = map.getBounds();
    const north = bounds.getNorth();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const west = bounds.getWest();

    function drawGridLinesForLevel( vDivisions: number, hDivisions: number, color: string, width: number ): void {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;

        for ( let vIdx = 0; vIdx <= vDivisions; vIdx++ ) {
            let lat = 90 - ( vIdx / vDivisions ) * 180;
            if ( lat < south - 1 || lat > north + 1 ) continue;

            const p1 = map!.latLngToContainerPoint( [ lat, west ] );
            const p2 = map!.latLngToContainerPoint( [ lat, east ] );

            ctx.moveTo( p1.x, p1.y );
            ctx.lineTo( p2.x, p2.y );
        }

        for ( let hIdx = 0; hIdx <= hDivisions; hIdx++ ) {
            let ratio = hIdx / hDivisions;
            let degWestOffset = ratio * 360;
            let baseDegWest = ( degWestOffset - GRID_OFFSET + 360 ) % 360;
            let lon = ( baseDegWest <= 180 ) ? -baseDegWest : ( 360 - baseDegWest );

            const centerLon = ( west + east ) / 2;
            let displayLon = lon;

            while ( displayLon < centerLon - 180 ) displayLon += 360;
            while ( displayLon > centerLon + 180 ) displayLon -= 360;

            let isInView = false;

            if ( displayLon >= west - 1 && displayLon <= east + 1 ) {
                isInView = true;
            }
            else if ( east - west > 180 ) {
                isInView = true;
            }
            else {
                let wrappedLon1 = displayLon + 360;
                let wrappedLon2 = displayLon - 360;
                if ( ( wrappedLon1 >= west - 1 && wrappedLon1 <= east + 1 ) ||
                    ( wrappedLon2 >= west - 1 && wrappedLon2 <= east + 1 ) ) {
                    isInView = true;
                }
            }

            if ( !isInView ) continue;

            const p1 = map!.latLngToContainerPoint( [ north, displayLon ] );
            const p2 = map!.latLngToContainerPoint( [ south, displayLon ] );

            ctx.moveTo( p1.x, p1.y );
            ctx.lineTo( p2.x, p2.y );
        }
        ctx.stroke();
    }

    drawGridLinesForLevel( 0o40, 0o100, "rgba(224, 160, 72, 0.5)", 3 );

    if ( zoom >= ZOOM_LEVEL_2 ) {
        drawGridLinesForLevel( 0o40 * 0o40, 0o100 * 0o40, "rgba(224, 160, 72, 0.5)", 2 );
    }

    if ( zoom >= ZOOM_LEVEL_3 ) {
        drawGridLinesForLevel( 0o40 * 0o40 * 0o40, 0o100 * 0o40 * 0o40, "rgba(224, 160, 72, 0.75)", 1 );
    }

    if ( zoom >= ZOOM_LEVEL_4 ) {
        drawGridLinesForLevel( 0o40 * 0o40 * 0o40 * 0o40, 0o100 * 0o40 * 0o40 * 0o40, "rgba(224, 160, 72, 1)", 1 / 2 );
    }
}

function update(): void {
    const n2k = getGridCoords( currentLat, currentLon );

    const v1 = n2k.v1 + 1; const h1 = n2k.h1 + 1;
    const v2 = n2k.v2 + 1; const h2 = n2k.h2 + 1;
    const v3 = n2k.v3 + 1; const h3 = n2k.h3 + 1;
    const v4 = n2k.v4 + 1; const h4 = n2k.h4 + 1;

    let coords: string;
    if ( useBase10 ) {
        coords = `${v1} ${h1} - ${v2} ${h2} - ${v3} ${h3} - ${v4} ${h4}`;
    } else {
        coords = `${window.vab6caja( v1 )} ${window.vab6caja( h1 )} - ${window.vab6caja( v2 )} ${window.vab6caja( h2 )} - ${window.vab6caja( v3 )} ${window.vab6caja( h3 )} - ${window.vab6caja( v4 )} ${window.vab6caja( h4 )}`;
    }

    outputCoords.textContent = window.skakefK2fe( coords );

    const names = getNamesForCoords( [ v1, v2, v3, v4 ], [ h1, h2, h3, h4 ] );
    kefAraq.innerHTML = names.ksakaName;
    outputName.innerHTML = names.latinName;
    piak.innerHTML = names.chmuahName;

    vacepu("cepufal");

    draw();
}

// ⟪ Search 🔍 ⟫

function parseCoordValue( val: string ): number {
    if ( !val ) return 0;
    if ( Array.from(val).some( c => K2FE.includes( c ) ) ) {
        return vab6k2fekp6( val );
    }
    return useBase10 ? parseInt( val, 0o12 ) : parseInt( val, 0o10 );
}

function isCoordinatePattern( query: string ): boolean {
    const parts = query.trim().split( /[\s\-–—]+/ ).filter( p => p.length > 0 );
    if ( parts.length < 2 ) return false;
    const numPattern = new RegExp( `^[\\d${K2FE}]+$` );
    return parts.every( p => numPattern.test( p ) );
}

// ⟪ URL Coordinate Handling 🔗 ⟫

function parseURLCoords(): ParsedCoords | null {
    const params = new URLSearchParams( window.location.search );
    const coords = params.get( "n2k" );
    if ( !coords ) return null;

    const pairs = coords.split( "-" ).filter( p => p.length > 0 );
    if ( pairs.length === 0 || pairs.length > 4 ) return null;

    const result = parseCoordinatePairs(pairs);
    if ( !result ) return null;

    const { fullV, fullH } = result;
    const gridResult = gridToLatLon(
        fullV[ 0 ] + 1, fullH[ 0 ] + 1,
        fullV[ 1 ] + 1, fullH[ 1 ] + 1,
        fullV[ 2 ] + 1, fullH[ 2 ] + 1,
        fullV[ 3 ] + 1, fullH[ 3 ] + 1
    );

    return { lat: gridResult.lat, lon: gridResult.lon };
}

function updateURL(): void {
    const n2k = getGridCoords( currentLat, currentLon );
    const v = [ n2k.v1 + 1, n2k.v2 + 1, n2k.v3 + 1, n2k.v4 + 1 ];
    const h = [ n2k.h1 + 1, n2k.h2 + 1, n2k.h3 + 1, n2k.h4 + 1 ];

    const pairs: string[] = [];
    for ( let i = 0; i < 4; i++ ) {
        const vStr = v[ i ].toString( 0o10 ).padStart( 2, "0" );
        const hStr = h[ i ].toString( 0o10 ).padStart( 2, "0" );
        pairs.push( vStr + hStr );
    }

    const url = new URL( window.location.href );
    url.searchParams.set( "n2k", pairs.join( "-" ) );
    window.history.replaceState( {}, "", url );
}

function handlePaste( e: ClipboardEvent ): void {
    const paste = e.clipboardData?.getData( "text" );
    if ( !paste ) return;

    try {
        const url = new URL( paste );
        const params = new URLSearchParams( url.search );
        const coords = params.get( "n2k" );

        if ( coords ) {
            e.preventDefault();
            const pairs = coords.split( "-" ).filter( p => p.length > 0 );
            const result = parseCoordinatePairs(pairs);
            if ( !result ) return;

            const { fullV, fullH } = result;
            const gridResult = gridToLatLon(
                fullV[ 0 ] + 1, fullH[ 0 ] + 1,
                fullV[ 1 ] + 1, fullH[ 1 ] + 1,
                fullV[ 2 ] + 1, fullH[ 2 ] + 1,
                fullV[ 3 ] + 1, fullH[ 3 ] + 1
            );

            let zoom = ZOOM_SEARCH_DEFAULT;
            if ( pairs.length >= 2 ) zoom = ZOOM_LEVEL_2;
            if ( pairs.length >= 3 ) zoom = ZOOM_LEVEL_3;
            if ( pairs.length >= 4 ) zoom = ZOOM_LEVEL_4;

            updateMapPosition( gridResult.lat, gridResult.lon, zoom );
            return;
        }
    } catch ( _err ) {
    }
}

function buildNames( vArr: number[], hArr: number[] ): { ksakaName: string; latinName: string; chmuahName: string } {
    return getNamesForCoords( vArr, hArr );
}

function search( query: string ): SearchReturn | null {
    if ( !query ) return null;

    if ( isCoordinatePattern( query ) ) {
        const pairs = query.trim().split( /[\s]*[\-–—][\s]*/ ).filter( p => p.length > 0 );
        const parseVal = ( val: string ) => parseCoordValue( val ) || 0;

        const v: number[] = [];
        const h: number[] = [];
        for ( const pair of pairs ) {
            const nums = pair.trim().split( /\s+/ ).filter( p => p.length > 0 );
            if ( nums.length >= 2 ) {
                v.push( parseVal( nums[ 0 ] ) );
                h.push( parseVal( nums[ 1 ] ) );
            } else if ( nums.length === 1 ) {
                if ( v.length === h.length ) {
                    v.push( parseVal( nums[ 0 ] ) );
                } else {
                    h.push( parseVal( nums[ 0 ] ) );
                }
            }
        }

        while ( v.length < 4 ) v.push( 0 );
        while ( h.length < 4 ) h.push( 0 );

        const result = gridToLatLon( v[ 0 ], h[ 0 ], v[ 1 ], h[ 1 ], v[ 2 ], h[ 2 ], v[ 3 ], h[ 3 ] );
        const numLevels = Math.max( 1, pairs.length );
        const names = buildNames( v.slice( 0, numLevels ), h.slice( 0, numLevels ) );

        return {
            results: [{
                lat: result.lat,
                lon: result.lon,
                v: v[ 0 ],
                h: h[ 0 ],
                ...names
            }],
            zoom: [ ZOOM_SEARCH_DEFAULT, ZOOM_LEVEL_2, ZOOM_LEVEL_3, ZOOM_LEVEL_4 ][ Math.min( numLevels - 1, 3 ) ] || ZOOM_SEARCH_DEFAULT
        };
    }

    const queryParts = query.trim().toLowerCase().split( /\s+/ ).filter( p => p.length > 0 );
    const numParts = queryParts.length;
    if ( numParts === 0 || numParts > 4 ) return null;

    const currentCoords = getGridCoords( currentLat, currentLon );
    const currentV = [ currentCoords.v1, currentCoords.v2, currentCoords.v3, currentCoords.v4 ];
    const currentH = [ currentCoords.h1, currentCoords.h2, currentCoords.h3, currentCoords.h4 ];

    const results: SearchResult[] = [];

    function searchLevel( level: number, startLevel: number, vArr: number[], hArr: number[], system: "k" | "l" | "c" ): void {
        const hLimit = level === 0 ? 0o100 : 0o40;
        const vLimit = 0o40;

        for ( let v = 0; v < vLimit; v++ ) {
            for ( let h = 0; h < hLimit; h++ ) {
                let name: string;
                if ( system === "k" ) name = getName( v, h, "ksaka" );
                else if ( system === "l" ) name = getNameLatin( v, h );
                else name = getNameChmuah( v, h );

                if ( !name.toLowerCase().startsWith( queryParts[ level - startLevel ] ) ) continue;

                const newV = [ ...vArr, v ];
                const newH = [ ...hArr, h ];
                const queryIndex = level - startLevel;

                if ( queryIndex === numParts - 1 ) {
                    const fullV = [ ...currentV.slice( 0, startLevel ), ...newV ];
                    const fullH = [ ...currentH.slice( 0, startLevel ), ...newH ];

                    while ( fullV.length < 4 ) { fullV.push( 0 ); fullH.push( 0 ); }

                    const coords = gridToLatLon(
                        fullV[ 0 ] + 1, fullH[ 0 ] + 1,
                        fullV[ 1 ] + 1, fullH[ 1 ] + 1,
                        fullV[ 2 ] + 1, fullH[ 2 ] + 1,
                        fullV[ 3 ] + 1, fullH[ 3 ] + 1
                    );
                    const names = getNamesForCoords( fullV.map( x => x + 1 ), fullH.map( x => x + 1 ) );
                    results.push({
                        lat: coords.lat,
                        lon: coords.lon,
                        v: fullV[ 0 ],
                        h: fullH[ 0 ],
                        startLevel,
                        ...names
                    });
                } else if ( level < 3 ) {
                    searchLevel( level + 1, startLevel, newV, newH, system );
                }
            }
        }
    }

    for ( let startLevel = 0; startLevel <= 4 - numParts; startLevel++ ) {
        ( [ "k", "l", "c" ] as const ).forEach( ( sys ) => searchLevel( startLevel, startLevel, [], [], sys ) );
    }

    results.sort( ( a, b ) => {
        const distA = Math.abs( a.lat - currentLat ) + Math.abs( a.lon - currentLon );
        const distB = Math.abs( b.lat - currentLat ) + Math.abs( b.lon - currentLon );
        return distA - distB;
    });

    return results.length > 0 ? { results } : null;
}

function displaySearchResults( result: SearchReturn | null ): void {
    if ( !result ) {
        searchResults.innerHTML = "<p>֭ſɭɹ ſɟɔ j͐ʃɹʞ ⟅</p>";
        searchResults.classList.remove( "hidden" );
        return;
    }

    const { results, zoom } = result;
    const queryParts = searchInput.value.trim().split( /\s+/ ).filter( p => p.length > 0 );
    const showList = queryParts.length >= 2 || results.length > 1;

    if ( !showList && results.length === 1 ) {
        const r = results[ 0 ];
        updateMapPosition( r.lat, r.lon, zoom || ZOOM_LEVEL_2 );
        searchResults.classList.add( "hidden" );
        return;
    }

    createResultButtons("#searchResults", results, zoom || ZOOM_LEVEL_2, (lat, lon, targetZoom) => {
        updateMapPosition(lat, lon, targetZoom);
        searchResults.classList.add("hidden");
        searchInput.value = "";
    });

    searchResults.classList.remove( "hidden" );
}

async function searchAddress(): Promise<void> {
    const query = searchInput.value.trim();
    if ( !query ) return;

    const result = search( query );
    if ( result ) {
        displaySearchResults( result );
        return;
    }

    searchResults.innerHTML = "<p>ſɭᴎɔ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ</p>";
    searchResults.classList.remove( "hidden" );

    try {
        const response = await fetch( `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent( query )}&limit=5` );
        if ( !response.ok ) throw new Error( "( ſ͕ȷɜƣ̋ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ )" );

        const results: any[] = await response.json();
        if ( results.length === 0 ) {
            searchResults.innerHTML = "<p>֭ſɭɹ ſɟɔ j͐ʃɹʞ ⟅</p>";
            return;
        }

        const osmResults: SearchResult[] = results.map(result => ({
            lat: parseFloat(result.lat),
            lon: parseFloat(result.lon),
            ksakaName: result.display_name,
            latinName: result.display_name,
            chmuahName: result.display_name,
            v: 0,
            h: 0
        }));

        createResultButtons("#searchResults", osmResults, 0o20, (lat, lon) => {
            updateMapPosition(lat, lon, 0o20);
            searchResults.classList.add("hidden");
            searchInput.value = "";
        });

    } catch ( error ) {
        console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", error );
        searchResults.innerHTML = "<p>ſ͕ȷɜƣ̋ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ⟅</p>";
    }
}

// ⟪ Offline functionality 📥 ⟫

async function downloadCurrentView(): Promise<void> {
    const zoom = parseInt( document.querySelector(`input[name="zoomSelect"]:checked`)?.getAttribute("value") || "7" );
    const bounds = map!.getBounds();

    downloadBtn.disabled = true;
    progressBar.classList.add( "active" );
    downloadStatus.textContent = "ſɭᴎɔ j͑ʃ'ɔ ſɟᴜ ſɭɹ ſȷɔ ⟅";

    const tiles = getTileList( bounds, zoom );
    const total = tiles.length;

    if ( total > 0o400 ) {
        if ( !confirm( `This will download ${total} tiles ( ~ ${( total * 1 / 0o20 ).toFixed( 1 ) } MB ) . Continue ?` ) ) {
            downloadBtn.disabled = false;
            progressBar.classList.remove( "active" );
            downloadStatus.textContent = "";
            return;
        }
    }

    downloadStatus.textContent = `ſɭᶗ‹ɔ ſ͕ɭwc̭ ſɭɹ j͐ʃ ${total} j͑ʃᴜꞇ ſɭɔƽ ⟅`;

    try {
        const result = await sendMessageToSW( { type: "CACHE_TILES", tiles } ) as CacheSizeResult;
        progressFill.style.width = "100%";
        setTimeout( () => {
            downloadStatus.textContent = `ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ ſ͕ɭwc̭ ſɭɹ j͐ʃ ${result.count} j͑ʃᴜꞇ ſɭɔƽ ✅ ⟅`;
            progressBar.classList.remove( "active" );
            progressFill.style.width = "0%";
            updateCacheInfo();
        }, 0o400 );
    } catch ( err ) {
        downloadStatus.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${( err as Error ).message} ❌ ⟅`;
        progressBar.classList.remove( "active" );
    }

    downloadBtn.disabled = false;
}

function getTileUrl(x: number, y: number, z: number): string {
    return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
}

function latLonToTile(lat: number, lon: number, zoom: number): { x: number; y: number } {
    const scale = Math.pow(2, zoom);
    const x = Math.floor(( lon + 180 ) / 360 * scale);
    const y = Math.floor(( 1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * scale);
    return { x, y };
}

function getTileList(bounds: any, zoom: number): string[] {
    const tiles: string[] = [];
    const nw = bounds.getNorthWest();
    const se = bounds.getSouthEast();

    const minTile = latLonToTile(nw.lat, nw.lng, zoom);
    const maxTile = latLonToTile(se.lat, se.lng, zoom);

    for ( let x = minTile.x; x <= maxTile.x; x++ ) {
        for ( let y = minTile.y; y <= maxTile.y; y++ ) {
            tiles.push(getTileUrl( x, y, zoom ));
        }
    }

    return tiles;
}

async function clearCache(): Promise<void> {
    if ( !confirm( "Clear all cached tiles ?" ) ) return;

    clearCacheBtn.disabled = true;
    try {
        await sendMessageToSW({ type: "CLEAR_TILE_CACHE" });
        downloadStatus.textContent = "ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ j͐ʃэ j͑ʃ'ᴜ ᶅſɔ ✅ ⟅";
        updateCacheInfo();
        setTimeout(() => downloadStatus.textContent = "", 0o3000);
    } catch ( err ) {
        downloadStatus.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${( err as Error ).message} ❌ ⟅`;
    }
    clearCacheBtn.disabled = false;
}

async function updateCacheInfo(): Promise<void> {
    try {
        const result = await sendMessageToSW( { type: "GET_CACHE_SIZE" } ) as CacheSizeResult;
        cacheStatus.textContent = `ꞁȷ̀ɜ ſןᴜ ʃɜƽ ꞁȷ̀ᴜꞇ j͑ʃ'ɜ ſןɹ - ${result.size} ⟅`;
        cacheSize.textContent = `~ ${( result.size * 1 / 0o10 ).toFixed(1)} j͑ʃᴜꞇ ꞙɭц ſɟᴜ ꞙɭıɔ ⟅`;
    } catch ( err ) {
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", err);
    }
}

function sendMessageToSW(message: SWMessage): Promise<any> {
    return new Promise(( resolve, reject ) => {
        if ( !navigator.serviceWorker.controller ) {
            reject(new Error("No service worker controller"));
            return;
        }

        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = ( event ) => {
            if ( event.data.error ) {
                reject(new Error(event.data.error));
            } else {
                resolve( event.data );
            }
        };

        navigator.serviceWorker.controller.postMessage(message, [ messageChannel.port2 ]);
    } );
}

init();
