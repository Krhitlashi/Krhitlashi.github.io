const GRID_W = 0o100;
const GRID_H = 0o40;

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

const latInput = document.getElementById("latInput");
const lonInput = document.getElementById("lonInput");

const latDeg = document.getElementById("latDeg");
const latMin = document.getElementById("latMin");
const latSec = document.getElementById("latSec");
const latHem = document.getElementById("latHem");
const lonDeg = document.getElementById("lonDeg");
const lonMin = document.getElementById("lonMin");
const lonSec = document.getElementById("lonSec");
const lonHem = document.getElementById("lonHem");
const dmsInputs = [latDeg, latMin, latSec, latHem, lonDeg, lonMin, lonSec, lonHem];

const tabDecimal = document.getElementById("tabDecimal");
const tabDMS = document.getElementById("tabDMS");
const decimalControls = document.getElementById("decimalControls");
const dmsControls = document.getElementById("dmsControls");

const outputCoords = document.getElementById("outputCoords");
const kefAraq = document.getElementById("kefAraq");
const outputName = document.getElementById("outputName");
const piak = document.getElementById("piak");
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");
const mapContainer = document.getElementById("mapContainer");
const showGridCheck = document.getElementById("showGridCheck");
const useBase10Check = document.getElementById("useBase10Check");
const resetBtn = document.getElementById("resetBtn");

const satelliteToggle = document.getElementById("satelliteToggle");
const gridOnlyToggle = document.getElementById("gridOnlyToggle");

const zoomSelect = document.getElementById("zoomSelect");
const downloadBtn = document.getElementById("downloadBtn");
const clearCacheBtn = document.getElementById("clearCacheBtn");
const cacheStatus = document.getElementById("cacheStatus");
const cacheSize = document.getElementById("cacheSize");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const downloadStatus = document.getElementById("downloadStatus");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchResults = document.getElementById("searchResults");

let currentLat = 47.48;
let currentLon = -122.21;
let showGrid = true;
let useBase10 = false;
let showSatellite = true;
let map = null;
let satelliteLayer = null;
let marker = null;

function init() {
    map = L.map("map", {
        center: [currentLat, currentLon],
        zoom: 0o7,
        zoomControl: false
    });

    // ⟪ Add zoom control to bottom right ⟫
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // ⟪ Add satellite tile layer ⟫
    satelliteLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles © Esri",
        maxZoom: 0o22
    }).addTo(map);

    // ⟪ Add marker ⟫
    marker = L.marker([currentLat, currentLon], {
        icon: L.divIcon({
            className: "custom-marker",
            html: "<div style=\"width:12px;height:12px;background:#fff;border:2px solid #dca54e;border-radius:50%;box-shadow:0 0 10px rgba(220,165,78,0.8);\"></div>",
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        })
    }).addTo(map);

    // ⟪ Map event listeners ⟫
    map.on("click", handleMapClickLeaflet);
    map.on("move", updateMapSync);
    map.on("zoom", updateMapSync);

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ⟪ Listeners for Decimal ⟫
    latInput.addEventListener("input", handleDecimalInput);
    lonInput.addEventListener("input", handleDecimalInput);

    // ⟪ Listeners for DMS ⟫
    dmsInputs.forEach(el => {
        el.addEventListener("input", handleDMSInput);
        el.addEventListener("change", handleDMSInput);
    });

    // ⟪ Tabs ⟫
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

    resetBtn.addEventListener("click", () => {
        currentLat = 0;
        currentLon = 0;
        map.setView([currentLat, currentLon], 0o3);
        updateAllInputs();
        update();
    });

    // ⟪ Map view toggles ⟫
    satelliteToggle.addEventListener("click", () => {
        showSatellite = true;
        if (satelliteLayer) satelliteLayer.addTo(map);
        satelliteToggle.classList.add("active");
        gridOnlyToggle.classList.remove("active");
    });

    gridOnlyToggle.addEventListener("click", () => {
        showSatellite = false;
        if (satelliteLayer) map.removeLayer(satelliteLayer);
        gridOnlyToggle.classList.add("active");
        satelliteToggle.classList.remove("active");
    });

    // ⟪ Offline controls ⟫
    downloadBtn.addEventListener("click", downloadCurrentView);
    clearCacheBtn.addEventListener("click", clearCache);

    // ⟪ Search controls ⟫
    searchBtn.addEventListener("click", searchAddress);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchAddress();
        }
    });

    // ⟪ Initial populate ⟫
    updateAllInputs();
    update();
    updateCacheInfo();

    // ⟪ Register service worker ⟫
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
        tabDecimal.classList.add("active");
        tabDMS.classList.remove("active");
        decimalControls.classList.remove("hidden");
        dmsControls.classList.add("hidden");
    } else {
        tabDMS.classList.add("active");
        tabDecimal.classList.remove("active");
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
    // ⟨ Parse Lat ⟩
    let lDeg = parseFloat(latDeg.value) || 0;
    let lMin = parseFloat(latMin.value) || 0;
    let lSec = parseFloat(latSec.value) || 0;
    let lHem = latHem.value;

    // ⟨ Parse Lon ⟩
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

function getGridCoords(lat, lon) {
    // ⟨ Horizontal ( H ) Calculation ⟩
    let baseDegWest = (lon <= 0) ? -lon : (360 - lon);
    if (lon === 0) baseDegWest = 0;

    const offset = 11.62354;
    let degWest = (baseDegWest + offset) % 360;

    // ⟨ Level 1 H ( 0-64 ) ⟩
    let rawH1 = (degWest / 360) * 0o100;
    if (rawH1 >= 0o100) rawH1 = 63.999999;
    if (rawH1 < 0) rawH1 = 0;
    let h1 = Math.floor(rawH1);
    let remH1 = rawH1 - h1;

    // ⟨ Level 2 H ( 0-32 ) ⟩
    let rawH2 = remH1 * 0o40;
    let h2 = Math.floor(rawH2);
    let remH2 = rawH2 - h2;

    // ⟨ Level 3 H ( 0-32 ) ⟩
    let rawH3 = remH2 * 0o40;
    let h3 = Math.floor(rawH3);
    let remH3 = rawH3 - h3;

    // ⟨ Level 4 H ( 0-32 ) ⟩
    let rawH4 = remH3 * 0o40;
    let h4 = Math.floor(rawH4);

    // ⟨ Vertical ( V ) Calculation ⟩
    let rawV1 = ((90 - lat) / 180) * 0o40;
    if (rawV1 >= 0o40) rawV1 = 31.999999;
    if (rawV1 < 0) rawV1 = 0;
    let v1 = Math.floor(rawV1);
    let remV1 = rawV1 - v1;

    // ⟨ Level 2 V ( 0-32 ) ⟩
    let rawV2 = remV1 * 0o40;
    let v2 = Math.floor(rawV2);
    let remV2 = rawV2 - v2;

    // ⟨ Level 3 V ( 0-32 ) ⟩
    let rawV3 = remV2 * 0o40;
    let v3 = Math.floor(rawV3);
    let remV3 = rawV3 - v3;

    // ⟨ Level 4 V ( 0-32 ) ⟩
    let rawV4 = remV3 * 0o40;
    let v4 = Math.floor(rawV4);

    return { v1, h1, v2, h2, v3, h3, v4, h4 };
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

    // ⟨ Same offset used in getGridCoords for consistency ⟩
    const OFFSET = 11.62354;

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

            ctx.moveTo(0, p1.y);
            ctx.lineTo(w, p2.y);
        }

        // ⟨ Draw vertical lines ( longitude lines ) with offset applied ⟩
        for (let hIdx = 0; hIdx <= hDivisions; hIdx++) {
            // ⟨ Calculate position in the offset coordinate system ⟩
            let ratio = hIdx / hDivisions;
            let degWestOffset = ratio * 360;

            // ⟨ Apply reverse offset to get actual longitude ⟩
            let degWest = (degWestOffset - OFFSET + 360) % 360;

            // ⟨ Convert to standard longitude ⟩
            let lon = (degWest <= 180) ? -degWest : (360 - degWest);

            // ⟨ Handle longitude wrapping for map display ⟩
            let displayLon = lon;
            if (displayLon < west - 1 && displayLon + 360 >= west) {
                displayLon += 360;
            } else if (displayLon > east + 1 && displayLon - 360 <= east) {
                displayLon -= 360;
            }

            if (displayLon < west - 1 || displayLon > east + 1) continue;

            const p1 = map.latLngToContainerPoint([north, displayLon]);
            const p2 = map.latLngToContainerPoint([south, displayLon]);

            ctx.moveTo(p1.x, 0);
            ctx.lineTo(p2.x, h);
        }
        ctx.stroke();
    }

    // ⟨ Draw Level 1 grid ( 32 vertical x 64 horizontal ) ⟩
    drawGridLinesForLevel(0o40, 0o100, "rgba(224, 160, 72, 0.5)", 3);

    // ⟨ Draw Level 2 ( if zoomed in enough ) - each L1 cell divided into 32x32 ⟩
    if (zoom >= 0o10) {
        drawGridLinesForLevel(0o40 * 0o40, 0o100 * 0o40, "rgba(224, 160, 72, 0.5)", 2);
    }

    // ⟨ Draw Level 3 ( if zoomed in enough ) - each L2 cell divided into 32x32 ⟩
    if (zoom >= 0o14) {
        drawGridLinesForLevel(0o40 * 0o40 * 0o40, 0o100 * 0o40 * 0o40, "rgba(224, 160, 72, 0.75)", 1);
    }

    // ⟨ Draw Level 4 ( if zoomed in enough ) - each L3 cell divided into 32x32 ⟩
    if (zoom >= 0o20) {
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

    const ksakaXaqa = getName(c.v1, c.h1);
    const ksakaP2sa = getName(c.v2, c.h2);
    const ksakaT2xa = getName(c.v3, c.h3);
    const ksakaTawa = getName(c.v4, c.h4);
    kefAraq.innerHTML = `${ksakaXaqa} ${ksakaP2sa} ${ksakaT2xa} ${ksakaTawa}`;

    const name1 = getNameLatin(c.v1, c.h1);
    const name2 = getNameLatin(c.v2, c.h2);
    const name3 = getNameLatin(c.v3, c.h3);
    const name4 = getNameLatin(c.v4, c.h4);
    outputName.innerHTML = `${name1} ${name2} ${name3} ${name4}`;

    const ឈ្មោះ១ = getName(c.v1, c.h1, CP_CHMUAH, TP_CHMUAH_MON, TP_CHMUAH_KRAOY);
    const ឈ្មោះ២ = getName(c.v2, c.h2, CP_CHMUAH, TP_CHMUAH_MON, TP_CHMUAH_KRAOY);
    const ឈ្មោះ៣ = getName(c.v3, c.h3, CP_CHMUAH, TP_CHMUAH_MON, TP_CHMUAH_KRAOY);
    const ឈ្មោះ៤ = getName(c.v4, c.h4, CP_CHMUAH, TP_CHMUAH_MON, TP_CHMUAH_KRAOY);
    piak.innerHTML = `${ឈ្មោះ១} ${ឈ្មោះ២} ${ឈ្មោះ៣} ${ឈ្មោះ៤}`;

    draw();
}


// ≺⧼ Search 🔍 ⧽≻

async function searchAddress() {
    const query = searchInput.value.trim();

    if (!query) {
        return;
    }

    // ⟨ Check for coordinate pattern ( e.g., "12 34 - 5 6" or "12 34" ) ⟩
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
        let zoom = 0o3;
        if (match[3]) zoom = 0o10;
        if (match[5]) zoom = 0o14;
        if (match[7]) zoom = 0o20;

        map.setView([currentLat, currentLon], zoom);
        marker.setLatLng([currentLat, currentLon]);

        updateAllInputs();
        update();

        searchResults.classList.add("hidden");
        return;
    }

    searchResults.innerHTML = "<div class=\"search-loading\">ſɭᴎɔ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ</div>";
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
            searchResults.innerHTML = "<div class=\"search-no-results\">֭ſɭɹ ſɟɔ j͐ʃɹʞ ⟅</div>";
            return;
        }

        searchResults.innerHTML = results.map((result, index) => `
            <div class="search-result-item" data-lat="${result.lat}" data-lon="${result.lon}">
                <div class="search-result-name">${result.display_name}</div>
            </div>
        `).join("");

        document.querySelectorAll(".search-result-item").forEach(item => {
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
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ", error);
        searchResults.innerHTML = "<div class=\"search-error\">ſ͕ȷɜƣ̋ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ⟅</div>";
    }
}

function gridToLatLon(v1, h1, v2, h2, v3, h3, v4, h4) {
    const v1_0 = Math.max(0, v1 - 1);
    const h1_0 = Math.max(0, h1 - 1);
    const v2_0 = Math.max(0, v2 - 1);
    const h2_0 = Math.max(0, h2 - 1);
    const v3_0 = Math.max(0, v3 - 1);
    const h3_0 = Math.max(0, h3 - 1);
    const v4_0 = Math.max(0, v4 - 1);
    const h4_0 = Math.max(0, h4 - 1);

    // ⟨ ( 0.0 to 1.0 ) ⟩

    // ⟨ Vertical - 32 * 32 * 32 * 32 ⟩
    const vTotal = v1_0 / 0o40 + v2_0 / (0o40 * 0o40) + v3_0 / (0o40 * 0o40 * 0o40) + v4_0 / (0o40 * 0o40 * 0o40 * 0o40);

    // ⟨ Horizontal - 64 * 32 * 32 * 32 ⟩
    const hTotal = h1_0 / 0o100 + h2_0 / (0o100 * 0o40) + h3_0 / (0o100 * 0o40 * 0o40) + h4_0 / (0o100 * 0o40 * 0o40 * 0o40);

    let lat = 90 - (vTotal * 180);

    // ⟨ Calculate Lon ⟩

    let degWest = hTotal * 360;
    const OFFSET = 11.62354;
    let baseDegWest = (degWest - OFFSET);
    while (baseDegWest < 0) baseDegWest += 360;
    baseDegWest = baseDegWest % 360;

    let lon;
    if (baseDegWest <= 180) {
        lon = -baseDegWest;
    } else {
        lon = 360 - baseDegWest;
    }

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

function latLonToTile(lat, lon, zoom) {
    const x = Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
    const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
    return { x, y };
}

function getTileUrl(x, y, z) {
    return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
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
