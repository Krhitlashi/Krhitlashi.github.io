const GRID_W = 0o100;
const GRID_H = 0o40;
const GRID_OFFSET = 11.62354;

// ≺⧼ Constants 🔢 ⧽≻

// ⟨ Zoom Levels ⟩
const ZOOM_INITIAL = 0o7;
const ZOOM_MAX = 0o22;
const ZOOM_SEARCH_DEFAULT = 0o3;
const ZOOM_LEVEL_2 = 0o10;
const ZOOM_LEVEL_3 = 0o14;
const ZOOM_LEVEL_4 = 0o20;
const ZOOM_RESET = 0o3;

// ≺⧼ Helper Functions 🛠️ ⧽≻

// ⟨ Get multiple DOM elements by IDs ⟩
function getElements(...ids) {
    const elements = {};
    for (const id of ids) {
        elements[id] = document.getElementById(id);
    }
    return elements;
}

// ⟨ Add event listeners to multiple elements ⟩
function addEventListeners(elements, event, handler) {
    for (const el of elements) {
        el.addEventListener(event, handler);
    }
}

// ⟨ Calculate 4 levels of grid subdivision ⟩
function calcGridLevels(value, totalRange, divisions, isLongitude = false) {
    let raw1 = (value / totalRange) * divisions[0];
    if (raw1 >= divisions[0]) raw1 = divisions[0] - 0.000001;
    if (raw1 < 0) raw1 = 0;
    let level1 = Math.floor(raw1);
    let remainder = raw1 - level1;

    const levels = [level1];
    for (let i = 1; i < 4; i++) {
        let raw = remainder * divisions[i];
        let level = Math.floor(raw);
        remainder = raw - level;
        levels.push(level);
    }
    return levels;
}

// ≺⧼ Data Arrays 📚 ⧽≻

const CP_KSAKA = [
    "ᶅſ", "ſן", "ſȷ", "ŋᷠ", "ʃ", "ɽ͑ʃ'", "j͑ʃ'", "ſᶘ",
    "ɭ(", "ɭʃ", "j͑ʃ", "}ʃ", "j͐ʃ", "ſ̀ȷ", "ſɭ,", "ſɭˬ",
    "ɭl̀", "ſɟ", "ı],", "ſ͕ȷ", "ſ͔ɭ", "ſɭ", "֭ſɭ", "ſ͕ɭ",
    "j͑ʃɘ", "j͑ʃƨ", "j͑ʃᴜ̭", "j͑ʃƽ", "ſןᴜ̭", "ɭʃƽ", "ſɟɘ", "ſɭƨ"
];
const TP_KSAKA_KS = ["ʞ", "ⰱ", "ɔ˞", "ͷ̗", "ƴ", "ᶗ‹", "ƽ", "ȝ"];
const TP_KSAKA_KZ = ["ꞇ", "ɹ", "ɔ", "ᴜ", "w", "ɜ", "э", "эⅎ"];

const V_NAMES = [
    "w", "p", "f", "m", "b", "r", "v", "ts",
    "d", "t", "s", "n", "l", "tl", "z", "kz",
    "j", "c", "x", "y", "g", "k", "h", "q",
    "sp", "st", "sc", "sk", "pc", "tk", "cp", "kt"
];
const H_SUFFIXES = ["f", "v", "s", "l", "z", "x", "k", "q"];
const H_PREFIXES = ["i", "ii", "e", "a", "u", "o", "aa", "au"];

const CP_CHMUAH = [
    "វ", "ព", "ប", "ម", "រ", "ត", "ដ", "ន",
    "យ", "ច", "ឆ", "ញ", "ហ", "ក", "ខ", "ង",
    "អ", "ផ", "ថ", "ល", "ប្រ", "ត្រ", "ច្រ", "ក្រ",
    "ផ្ល", "ថ្ល", "ឆ្ល", "ខ្ល", "ផ្ច", "ថ្ក", "ឆ្ប", "ខ្ត"
];
const TP_CHMUAH_KRAOY = ["ប", "ត", "ស", "ក", "ម", "ន", "ល", "ង"];
const TP_CHMUAH_MON = ["ី", "ិ", "េ", "ា", "ើ", "ុ", "ូ", ""];


// ≺⧼ DOM Elements 🔧 ⧽≻

let latInput, lonInput, latDeg, latMin, latSec, latHem, lonDeg, lonMin, lonSec, lonHem, dmsInputs;
let tabDecimal, tabDMS, decimalControls, dmsControls;
let outputCoords, kefAraq, outputName, piak, canvas, ctx, mapContainer, showGridCheck, useBase10Check, resetBtn;
let zoomSelect, downloadBtn, clearCacheBtn, cacheStatus, cacheSize, progressBar, progressFill, downloadStatus;
let searchInput, searchBtn, searchResults;

let currentLat = 47.48;
let currentLon = -122.21;
let showGrid = true;
let useBase10 = false;
let map = null;
let marker = null;

// ⟨ Initialize DOM elements ⟩
function initElements() {
    const elements = getElements(
        "latInput", "lonInput", "latDeg", "latMin", "latSec", "latHem",
        "lonDeg", "lonMin", "lonSec", "lonHem", "tabDecimal", "tabDMS",
        "decimalControls", "dmsControls", "outputCoords", "kefAraq",
        "outputName", "piak", "gridCanvas", "mapContainer", "showGridCheck",
        "useBase10Check", "resetBtn", "zoomSelect", "downloadBtn",
        "clearCacheBtn", "cacheStatus", "cacheSize", "progressBar",
        "progressFill", "downloadStatus", "searchInput", "searchBtn", "searchResults"
    );

    latInput = elements.latInput;
    lonInput = elements.lonInput;
    latDeg = elements.latDeg;
    latMin = elements.latMin;
    latSec = elements.latSec;
    latHem = elements.latHem;
    lonDeg = elements.lonDeg;
    lonMin = elements.lonMin;
    lonSec = elements.lonSec;
    lonHem = elements.lonHem;
    dmsInputs = [latDeg, latMin, latSec, latHem, lonDeg, lonMin, lonSec, lonHem];

    tabDecimal = elements.tabDecimal;
    tabDMS = elements.tabDMS;
    decimalControls = elements.decimalControls;
    dmsControls = elements.dmsControls;

    outputCoords = elements.outputCoords;
    kefAraq = elements.kefAraq;
    outputName = elements.outputName;
    piak = elements.piak;
    canvas = elements.gridCanvas;
    ctx = canvas.getContext("2d");
    mapContainer = elements.mapContainer;
    showGridCheck = elements.showGridCheck;
    useBase10Check = elements.useBase10Check;
    resetBtn = elements.resetBtn;

    zoomSelect = elements.zoomSelect;
    downloadBtn = elements.downloadBtn;
    clearCacheBtn = elements.clearCacheBtn;
    cacheStatus = elements.cacheStatus;
    cacheSize = elements.cacheSize;
    progressBar = elements.progressBar;
    progressFill = elements.progressFill;
    downloadStatus = elements.downloadStatus;

    searchInput = elements.searchInput;
    searchBtn = elements.searchBtn;
    searchResults = elements.searchResults;
}

function init() {
    initElements();

    map = L.map("map", {
        center: [currentLat, currentLon],
        zoom: ZOOM_INITIAL,
        zoomControl: false
    });

    // ⟨ Add zoom control to bottom right ⟩
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // ⟨ Add OpenStreetMap base layer ( open-source ) ⟩
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: ZOOM_MAX
    }).addTo(map);

    // ⟨ Add marker ⟩
    marker = L.marker([currentLat, currentLon], {
        icon: L.divIcon({
            className: "custom-marker",
            html: "<div style=\"width:12px;height:12px;background:#fff;border:2px solid #d0a040;border-radius:50%;\"></div>",
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        })
    }).addTo(map);

    // ⟨ Map event listeners ⟩
    map.on("click", handleMapClickLeaflet);
    map.on("move", updateMapSync);
    map.on("zoom", updateMapSync);

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ⟨ Listeners for Decimal ⟩
    addEventListeners([latInput, lonInput], "input", handleDecimalInput);

    // ⟨ Listeners for DMS ⟩
    dmsInputs.forEach(el => {
        el.addEventListener("input", handleDMSInput);
        el.addEventListener("change", handleDMSInput);
    });

    // ⟨ Tabs ⟩
    tabDecimal.addEventListener("click", () => switchMode("decimal"));
    tabDMS.addEventListener("click", () => switchMode("dms"));

    showGridCheck.addEventListener("change", (e) => {
        showGrid = e.target.checked;
        draw();
    });

    useBase10Check.addEventListener("change", (e) => {
        useBase10 = e.target.checked;
        update();
    });

    // Grid Only toggle button - hides map tiles, shows only grid
    const gridOnlyToggle = document.getElementById("gridOnlyToggle");
    let gridOnlyMode = false;
    gridOnlyToggle.addEventListener("click", () => {
        gridOnlyMode = !gridOnlyMode;
        gridOnlyToggle.setAttribute("aria-pressed", gridOnlyMode);
        // Hide/show map tiles (not the container, just the tiles)
        const mapTiles = document.querySelectorAll("#map .leaflet-tile-pane, #map .leaflet-layer");
        mapTiles.forEach(tile => {
            tile.style.opacity = gridOnlyMode ? "0" : "1";
        });
        draw();
    });

    resetBtn.addEventListener("click", () => {
        currentLat = 0;
        currentLon = 0;
        map.setView([currentLat, currentLon], ZOOM_RESET);
        updateAllInputs();
        update();
    });

    // ⟨ Offline controls ⟩
    downloadBtn.addEventListener("click", downloadCurrentView);
    clearCacheBtn.addEventListener("click", clearCache);

    // ⟨ Search controls ⟩
    searchBtn.addEventListener("click", searchAddress);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchAddress();
        }
    });

    // ⟨ Initial populate ⟩
    updateAllInputs();
    update();
    updateCacheInfo();

    // ⟨ Register service worker ⟩
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./j͑ʃᴜ ſɭɔ j͑ʃ'ɔ.js")
            .then(reg => console.log("Service Worker registered.", reg))
            .catch(err => console.error("Service Worker registration failed.", err));
    }
}

function handleMapClickLeaflet(e) {
    currentLat = e.latlng.lat;
    currentLon = e.latlng.lng;
    marker.setLatLng([currentLat, currentLon]);
    updateAllInputs();
    update();
}

function updateMapSync() {
    const center = map.getCenter();
    currentLat = center.lat;
    currentLon = center.lng;
    marker.setLatLng([currentLat, currentLon]);
    updateAllInputs();
    update();
}

function switchMode(mode) {
    if (mode === "decimal") {
        tabDecimal.setAttribute("aria-pressed", "true");
        tabDMS.setAttribute("aria-pressed", "false");
        decimalControls.classList.remove("hidden");
        dmsControls.classList.add("hidden");
    } else {
        tabDMS.setAttribute("aria-pressed", "true");
        tabDecimal.setAttribute("aria-pressed", "false");
        dmsControls.classList.remove("hidden");
        decimalControls.classList.add("hidden");
    }
}

function resizeCanvas() {
    const rect = mapContainer.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    update();
}


// ≺⧼ Data Handling 📊 ⧽≻

function handleDecimalInput() {
    let lat = parseFloat(latInput.value);
    let lon = parseFloat(lonInput.value);

    // ⟨ Validation ⟩
    if (isNaN(lat)) lat = 0;
    if (isNaN(lon)) lon = 0;
    if (lat < -90) lat = -90;
    if (lat > 90) lat = 90;
    if (lon < -180) lon = -180;
    if (lon > 180) lon = 180;

    currentLat = lat;
    currentLon = lon;

    map.setView([currentLat, currentLon]);
    marker.setLatLng([currentLat, currentLon]);

    updateDMSInputs();
    update();
}

function handleDMSInput() {
    // ⟨ Parse Latitude ⟩
    let lDeg = parseFloat(latDeg.value) || 0;
    let lMin = parseFloat(latMin.value) || 0;
    let lSec = parseFloat(latSec.value) || 0;
    let lHem = latHem.value;

    // ⟨ Parse Longitude ⟩
    let loDeg = parseFloat(lonDeg.value) || 0;
    let loMin = parseFloat(lonMin.value) || 0;
    let loSec = parseFloat(lonSec.value) || 0;
    let loHem = lonHem.value;

    let decLat = lDeg + (lMin / 60) + (lSec / 3600);
    if (lHem === "S") decLat = -decLat;

    let decLon = loDeg + (loMin / 60) + (loSec / 3600);
    if (loHem === "W") decLon = -decLon;

    // ⟨ Validation bounds ⟩
    if (decLat > 90) decLat = 90;
    if (decLat < -90) decLat = -90;
    if (decLon > 180) decLon = 180;
    if (decLon < -180) decLon = -180;

    currentLat = decLat;
    currentLon = decLon;

    map.setView([currentLat, currentLon]);
    marker.setLatLng([currentLat, currentLon]);

    latInput.value = currentLat.toFixed(5);
    lonInput.value = currentLon.toFixed(5);

    update();
}

function updateAllInputs() {
    latInput.value = currentLat.toFixed(5);
    lonInput.value = currentLon.toFixed(5);
    updateDMSInputs();
}

function updateDMSInputs() {
    const latObj = decimalToDMS(currentLat);
    latDeg.value = latObj.deg;
    latMin.value = latObj.min;
    latSec.value = latObj.sec.toFixed(2);
    latHem.value = currentLat >= 0 ? "N" : "S";

    const lonObj = decimalToDMS(currentLon);
    lonDeg.value = lonObj.deg;
    lonMin.value = lonObj.min;
    lonSec.value = lonObj.sec.toFixed(2);
    lonHem.value = currentLon >= 0 ? "E" : "W";
}

function decimalToDMS(decimal) {
    const absVal = Math.abs(decimal);
    const deg = Math.floor(absVal);
    const minFull = (absVal - deg) * 60;
    const min = Math.floor(minFull);
    const sec = (minFull - min) * 60;
    return { deg, min, sec };
}

function toBase8(num) {
    return num.toString(8);
}


// ≺⧼ Grid Logic 📍 ⧽≻

// ⟨ Coordinate system - Longitude is converted to "degrees West" ( 0-360 )
//   then shifted by GRID_OFFSET. Grid lines are drawn by reversing this. ⟩
//   lon ⟶ baseDegWest ⟶ degWest ( +offset ) ⟶ grid index
//   grid index ⟶ degWestOffset ⟶ baseDegWest ( -offset ) ⟶ lon

function getGridCoords(lat, lon) {
    // ⟨ Horizontal ( H ) Calculation ⟩
    let baseDegWest = (lon <= 0) ? -lon : (360 - lon);
    if (lon === 0) baseDegWest = 0;

    let degWest = (baseDegWest + GRID_OFFSET) % 360;
    const hLevels = calcGridLevels(degWest, 360, [0o100, 0o40, 0o40, 0o40]);

    // ⟨ Vertical ( V ) Calculation ⟩
    const vLevels = calcGridLevels(90 - lat, 180, [0o40, 0o40, 0o40, 0o40]);

    return {
        v1: vLevels[0], h1: hLevels[0],
        v2: vLevels[1], h2: hLevels[1],
        v3: vLevels[2], h3: hLevels[2],
        v4: vLevels[3], h4: hLevels[3]
    };
}

function getName(v, h, cp = CP_KSAKA, tp_kz = TP_KSAKA_KZ, tp_ks = TP_KSAKA_KS) {
    let vName = cp[v] || "?";
    let pIndex = Math.floor(h / 0o10);
    let sIndex = h % 0o10;
    let hName = (tp_kz[pIndex] || "") + (tp_ks[sIndex] || "");
    let fullName = vName + hName;
    return fullName;
}

function getNameLatin(v, h) {
    let vName = V_NAMES[v] || "?";
    let pIndex = Math.floor(h / 0o10);
    let sIndex = h % 0o10;
    let hName = (H_PREFIXES[pIndex] || "") + (H_SUFFIXES[sIndex] || "");
    let fullName = vName + hName;
    return fullName.charAt(0).toUpperCase() + fullName.slice(1);
}

function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (!showGrid || !map) return;

    const zoom = map.getZoom();
    const bounds = map.getBounds();
    const north = bounds.getNorth();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const west = bounds.getWest();

    // ⟨ Helper to draw grid lines for a specific level with proper offset ⟩
    function drawGridLinesForLevel(vDivisions, hDivisions, color, width) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;

        // ⟨ Draw horizontal lines ( latitude lines ) ⟩
        for (let vIdx = 0; vIdx <= vDivisions; vIdx++) {
            let lat = 90 - (vIdx / vDivisions) * 180;

            if (lat < south - 1 || lat > north + 1) continue;

            const p1 = map.latLngToContainerPoint([lat, west]);
            const p2 = map.latLngToContainerPoint([lat, east]);

            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
        }

        // ⟨ Draw vertical lines ( longitude lines ) with offset applied ⟩
        for (let hIdx = 0; hIdx <= hDivisions; hIdx++) {
            // ⟨ Calculate degWest in the OFFSET coordinate system ⟩
            let ratio = hIdx / hDivisions;
            let degWestOffset = ratio * 360;

            // ⟨ Reverse the offset to get baseDegWest ( same as getGridCoords but reversed ) ⟩
            let baseDegWest = (degWestOffset - GRID_OFFSET + 360) % 360;

            // ⟨ Convert baseDegWest to standard longitude ⟩
            let lon = (baseDegWest <= 180) ? -baseDegWest : (360 - baseDegWest);

            // ⟨ Handle longitude wrapping for map display ⟩
            const centerLon = (west + east) / 2;
            let displayLon = lon;

            // ⟨ Adjust longitude to be near the map center for proper rendering ⟩
            while (displayLon < centerLon - 180) displayLon += 360;
            while (displayLon > centerLon + 180) displayLon -= 360;

            // ⟨ Check if line is within visible bounds ( including map wrap ) ⟩
            let isInView = false;
            
            // ⟨ Check direct visibility ⟩
            if (displayLon >= west - 1 && displayLon <= east + 1) {
                isInView = true;
            }
            // ⟨ Check wrapped visibility ( for maps crossing antimeridian ) ⟩
            else if (east - west > 180) {
                // ⟨ Map spans more than 180°, show all lines ⟩
                isInView = true;
            }
            else {
                // ⟨ Check if line wraps into view from either side ⟩
                let wrappedLon1 = displayLon + 360;
                let wrappedLon2 = displayLon - 360;
                if ((wrappedLon1 >= west - 1 && wrappedLon1 <= east + 1) ||
                    (wrappedLon2 >= west - 1 && wrappedLon2 <= east + 1)) {
                    isInView = true;
                }
            }

            if (!isInView) continue;

            const p1 = map.latLngToContainerPoint([north, displayLon]);
            const p2 = map.latLngToContainerPoint([south, displayLon]);

            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();
    }

    // ⟨ Draw Level 1 grid ( 32 vertical x 64 horizontal ) ⟩
    drawGridLinesForLevel(0o40, 0o100, "rgba(224, 160, 72, 0.5)", 3);

    // ⟨ Draw Level 2 ( if zoomed in enough ) - each L1 cell divided into 32x32 ⟩
    if (zoom >= ZOOM_LEVEL_2) {
        drawGridLinesForLevel(0o40 * 0o40, 0o100 * 0o40, "rgba(224, 160, 72, 0.5)", 2);
    }

    // ⟨ Draw Level 3 ( if zoomed in enough ) - each L2 cell divided into 32x32 ⟩
    if (zoom >= ZOOM_LEVEL_3) {
        drawGridLinesForLevel(0o40 * 0o40 * 0o40, 0o100 * 0o40 * 0o40, "rgba(224, 160, 72, 0.75)", 1);
    }

    // ⟨ Draw Level 4 ( if zoomed in enough ) - each L3 cell divided into 32x32 ⟩
    if (zoom >= ZOOM_LEVEL_4) {
        drawGridLinesForLevel(0o40 * 0o40 * 0o40 * 0o40, 0o100 * 0o40 * 0o40 * 0o40, "rgba(224, 160, 72, 1)", 0.5);
    }
}

function update() {
    const c = getGridCoords(currentLat, currentLon);

    // ⟨ Display 1-based indexing ⟩
    const v1 = c.v1 + 1; const h1 = c.h1 + 1;
    const v2 = c.v2 + 1; const h2 = c.h2 + 1;
    const v3 = c.v3 + 1; const h3 = c.h3 + 1;
    const v4 = c.v4 + 1; const h4 = c.h4 + 1;

    // ⟨ Format coordinates based on base selection ⟩
    let coords;
    if (useBase10) {
        coords = `${v1} ${h1} - ${v2} ${h2} - ${v3} ${h3} - ${v4} ${h4}`;
    } else {
        coords = `${toBase8(v1)} ${toBase8(h1)} - ${toBase8(v2)} ${toBase8(h2)} - ${toBase8(v3)} ${toBase8(h3)} - ${toBase8(v4)} ${toBase8(h4)}`;
    }

    outputCoords.textContent = coords;

    // ⟨ Generate names for all 4 levels ⟩
    const coords4 = [[c.v1, c.h1], [c.v2, c.h2], [c.v3, c.h3], [c.v4, c.h4]];

    const ksakaNames = coords4.map(([v, h]) => getName(v, h));
    kefAraq.innerHTML = ksakaNames.join(" ");

    const latinNames = coords4.map(([v, h]) => getNameLatin(v, h));
    outputName.innerHTML = latinNames.join(" ");

    const chmuahNames = coords4.map(([v, h]) => getName(v, h, CP_CHMUAH, TP_CHMUAH_MON, TP_CHMUAH_KRAOY));
    piak.innerHTML = chmuahNames.join(" ");

    draw();
}


// ≺⧼ Search 🔍 ⧽≻

async function searchAddress() {
    const query = searchInput.value.trim();

    if (!query) {
        return;
    }

    // ⟨ Check for coordinate pattern - e.g. "12 34 - 5 6" or "12 34" ⟩
    // ⟨ "v1 h1", "v1 h1 - v2 h2", etc. ⟩
    // ⟨ Allow spaces, dashes, and optional parts. ⟩
    const coordRegex = /^(\d+)\s+(\d+)(?:\s*[-–—]\s*(\d+)\s+(\d+))?(?:\s*[-–—]\s*(\d+)\s+(\d+))?(?:\s*[-–—]\s*(\d+)\s+(\d+))?$/;
    const match = query.match(coordRegex);

    if (match) {
        const parseVal = (val) => {
            if (!val) return 0;
            return useBase10 ? parseInt(val, 10) : parseInt(val, 8);
        };

        // ⟨ 1=v1, 2=h1, 3=v2, 4=h2, 5=v3, 6=h3, 7=v4, 8=h4 ⟩
        const v1 = parseVal(match[1]);
        const h1 = parseVal(match[2]);
        const v2 = parseVal(match[3]);
        const h2 = parseVal(match[4]);
        const v3 = parseVal(match[5]);
        const h3 = parseVal(match[6]);
        const v4 = parseVal(match[7]);
        const h4 = parseVal(match[8]);

        const coords = gridToLatLon(v1, h1, v2, h2, v3, h3, v4, h4);

        currentLat = coords.lat;
        currentLon = coords.lon;

        // ⟨ Determine zoom level based on precision ⟩
        let zoom = ZOOM_SEARCH_DEFAULT;
        if (match[3]) zoom = ZOOM_LEVEL_2;
        if (match[5]) zoom = ZOOM_LEVEL_3;
        if (match[7]) zoom = ZOOM_LEVEL_4;

        map.setView([currentLat, currentLon], zoom);
        marker.setLatLng([currentLat, currentLon]);

        updateAllInputs();
        update();

        searchResults.classList.add("hidden");
        return;
    }

    searchResults.innerHTML = "<p>ſɭᴎɔ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ</p>";
    searchResults.classList.remove("hidden");

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );

        if (!response.ok) {
            throw new Error("Search failed");
        }

        const results = await response.json();

        if (results.length === 0) {
            searchResults.innerHTML = "<p>֭ſɭɹ ſɟɔ j͐ʃɹʞ ⟅</p>";
            return;
        }

        searchResults.innerHTML = results.map((result, index) => `
            <button data-lat="${result.lat}" data-lon="${result.lon}">
                <p>${result.display_name}</p>
            </button>
        `).join("");

        document.querySelectorAll("#searchResults button").forEach(item => {
            item.addEventListener("click", () => {
                const lat = parseFloat(item.dataset.lat);
                const lon = parseFloat(item.dataset.lon);

                currentLat = lat;
                currentLon = lon;

                map.setView([lat, lon], 0o14);
                marker.setLatLng([lat, lon]);

                updateAllInputs();
                update();

                searchResults.classList.add("hidden");
                searchInput.value = "";
            });
        });

    } catch (error) {
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", error);
        searchResults.innerHTML = "<p>ſ͕ȷɜƣ̋ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ⟅</p>";
    }
}

// ⟨ Convert grid levels to normalized position ( 0.0 to 1.0 ) ⟩
function levelsToNormalized(levels, divisors) {
    let total = 0;
    for (let i = 0; i < levels.length; i++) {
        let divisor = 1;
        for (let j = 0; j <= i; j++) {
            divisor *= divisors[j];
        }
        total += levels[i] / divisor;
    }
    return total;
}

function gridToLatLon(v1, h1, v2, h2, v3, h3, v4, h4) {
    // ⟨ Convert to 0-based indexing ⟩
    const vLevels = [v1, v2, v3, v4].map(v => Math.max(0, v - 1));
    const hLevels = [h1, h2, h3, h4].map(h => Math.max(0, h - 1));

    // ⟨ Calculate normalized positions ⟩
    const vTotal = levelsToNormalized(vLevels, [0o40, 0o40, 0o40, 0o40]);
    const hTotal = levelsToNormalized(hLevels, [0o100, 0o40, 0o40, 0o40]);

    // ⟨ Calculate latitude ⟩
    let lat = 90 - (vTotal * 180);

    // ⟨ Calculate longitude ⟩
    let degWest = hTotal * 360;
    let baseDegWest = (degWest - GRID_OFFSET);
    while (baseDegWest < 0) baseDegWest += 360;
    baseDegWest = baseDegWest % 360;

    let lon = (baseDegWest <= 180) ? -baseDegWest : (360 - baseDegWest);

    return { lat, lon };
}


// ≺⧼ Offline functionality 📥 ⧽≻

async function downloadCurrentView() {
    const zoom = parseInt(zoomSelect.value);
    const bounds = map.getBounds();

    downloadBtn.disabled = true;
    progressBar.classList.add("active");
    downloadStatus.textContent = "ſɭᴎɔ j͑ʃ'ɔ ſɟᴜ ſɭɹ ſȷɔ ⟅";

    const tiles = getTileList(bounds, zoom);
    const total = tiles.length;

    if (total > 500) {
        if (!confirm(`This will download ${total} tiles ( ~ ${(total * 0.05).toFixed(1)} MB ) . Continue ?`)) {
            downloadBtn.disabled = false;
            progressBar.classList.remove("active");
            downloadStatus.textContent = "";
            return;
        }
    }

    downloadStatus.textContent = `ſɭᴎɔ ſ͕ɭwc̭ ſɭɹ j͐ʃ ${total} j͑ʃᴜꞇ ſɭɔƽ ⟅`;

    try {
        const result = await sendMessageToSW({ type: "CACHE_TILES", tiles });
        progressFill.style.width = "100%";
        setTimeout(() => {
            downloadStatus.textContent = `ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ ſ͕ɭwc̭ ſɭɹ j͐ʃ ${result.count} j͑ʃᴜꞇ ſɭɔƽ ✅ ⟅`;
            progressBar.classList.remove("active");
            progressFill.style.width = "0%";
            updateCacheInfo();
        }, 500);
    } catch (err) {
        downloadStatus.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${err.message} ❌ ⟅`;
        progressBar.classList.remove("active");
    }

    downloadBtn.disabled = false;
}

// ⟨ Get tile URL from coordinates ⟩
function getTileUrl(x, y, z) {
    return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
}

// ⟨ Convert lat/lon to tile coordinates ⟩
function latLonToTile(lat, lon, zoom) {
    const scale = Math.pow(2, zoom);
    const x = Math.floor((lon + 180) / 360 * scale);
    const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * scale);
    return { x, y };
}

// ⟨ Get list of tiles for bounds ⟩
function getTileList(bounds, zoom) {
    const tiles = [];
    const nw = bounds.getNorthWest();
    const se = bounds.getSouthEast();

    const minTile = latLonToTile(nw.lat, nw.lng, zoom);
    const maxTile = latLonToTile(se.lat, se.lng, zoom);

    for (let x = minTile.x; x <= maxTile.x; x++) {
        for (let y = minTile.y; y <= maxTile.y; y++) {
            tiles.push(getTileUrl(x, y, zoom));
        }
    }

    return tiles;
}

async function clearCache() {
    if (!confirm("Clear all cached tiles ?")) return;

    clearCacheBtn.disabled = true;
    try {
        await sendMessageToSW({ type: "CLEAR_TILE_CACHE" });
        downloadStatus.textContent = "ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ j͐ʃэ j͑ʃ'ᴜ ᶅſɔ ✅ ⟅";
        updateCacheInfo();
        setTimeout(() => downloadStatus.textContent = "", 0o3000);
    } catch (err) {
        downloadStatus.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${err.message} ❌ ⟅`;
    }
    clearCacheBtn.disabled = false;
}

async function updateCacheInfo() {
    try {
        const result = await sendMessageToSW({ type: "GET_CACHE_SIZE" });
        cacheStatus.textContent = `ꞁȷ̀ɜ ſןᴜ ʃɜƽ ꞁȷ̀ᴜꞇ j͑ʃ'ɜ ſןɹ - ${result.size} ⟅`;
        cacheSize.textContent = `~ ${(result.size * 0.05).toFixed(1)} j͑ʃᴜꞇ ꞙɭц ſɟᴜ ꞙɭıɔ ⟅`;
    } catch (err) {
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", err);
    }
}

function sendMessageToSW(message) {
    return new Promise((resolve, reject) => {
        if (!navigator.serviceWorker.controller) {
            reject(new Error("No service worker controller"));
            return;
        }

        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (event) => {
            if (event.data.error) {
                reject(new Error(event.data.error));
            } else {
                resolve(event.data);
            }
        };

        navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
    });
}

init();
