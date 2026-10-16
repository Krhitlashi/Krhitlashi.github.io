// ≺⧼ ſɟᴜ ſɭɔ j͑ʃ'ɔ - j͑ʃɔƣ̋ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ }ʃɹƽ ʌ ʃᴜ j͐ʃɹ ı],ᴜ Ktash ⧽≻

// ⟪ ֭ſɭᴜ ı],ɔ 🔌 ⟫

declare const L: any;
declare const vab6k2fekp6: ( k61e: string ) => number;
declare const K2FE: string[];

// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 🔢 ⟫

const QOX2N2K_SANTA = 11.62354;

const BAM2_SAXE = 0o7;
const BAM2_KEMAFI = 0o22;
const BAM2_QUQ_SAXE = 0o3;
const BAM2_K2FE_2 = 0o10;
const BAM2_K2FE_3 = 0o14;
const BAM2_K2FE_4 = 0o20;
const BAM2_TOSAX = 0o3;

// ⟪ ֭ſɭᴜ ı],ɔ 📐 ⟫

interface Qox2n2kHtaka {
    ksaka: { v: string; hSaxe: string[]; hAraq: string[] };
    latin: { v: string; hSaxe: string[]; hAraq: string[] };
    chmuah: { v: string; hSaxe: string[]; hAraq: string[] };
}

interface Qox2Aran2k {
    v1: number; h1: number;
    v2: number; h2: number;
    v3: number; h3: number;
    v4: number; h4: number;
}

interface QuqK61e {
    cepu: number;
    tapu: number;
    v: number;
    h: number;
    startLevel?: number;
    saxeKsaka: string;
    latinKsaka: string;
    chmuahKsaka: string;
}

interface QuqXema {
    k61eCa1ara: QuqK61e[];
    bam2?: number;
}

interface Ne1anesaiAran2k {
    cepu: number;
    tapu: number;
}

interface SeQeHaS2 {
    sefini: number;
    qe: number;
    ha: number;
}

interface Vah2Pal6K61e {
    pal6: number;
    k2fe: number;
}

interface SwK61e {
    hat: string;
    kubaCa1ara?: string[];
}

// ⟪ ꞁȷ̀ɔ j͑ʃƽɔƽ 🌍 ⟫

let cepuXema: HTMLInputElement;
let tapuXema: HTMLInputElement;
let cepuSefini: HTMLInputElement;
let cepuQe: HTMLInputElement;
let cepuHa: HTMLInputElement;
let tapuSefini: HTMLInputElement;
let tapuQe: HTMLInputElement;
let tapuHa: HTMLInputElement;
let seQeHaXemaCa1ara: HTMLInputElement[];

let hatKnak2fe: HTMLButtonElement;
let hatSeQeHa: HTMLButtonElement;
let knak2feKuba: HTMLElement;
let seQeHaKuba: HTMLElement;

let suntaAran2k: HTMLDivElement;
let suntaKsakaAih: HTMLDivElement;
let suntaKsaka: HTMLDivElement;
let suntaKsakaC: HTMLDivElement;
let tahaqKuba: HTMLCanvasElement;
let k2fXema: CanvasRenderingContext2D;
let bal2xaXema: HTMLElement;
let suntaQox2Kp6: HTMLInputElement;
let quqKnak2feKp6: HTMLInputElement;
let tosaxKek: HTMLButtonElement;

let qumk2Kek: HTMLButtonElement;
let ne1aVah2Kek: HTMLButtonElement;
let vah2PuXema: HTMLSpanElement;
let vah2Pal6: HTMLSpanElement;
let k2feKuba: HTMLDivElement;
let k2feSunta: HTMLDivElement;
let qumk2PuXema: HTMLElement;

let quqXema: HTMLInputElement;
let quqKek: HTMLButtonElement;
let quqK61eCa1ara: HTMLElement;

let kxesuCepu = 47.48;
let kxesuTapu = -122.21;
let suntaQox2 = true;
let quqKnak2fe = false;

let bal2xa: any = null;
let bal2xaKp6: any = null;

// ⟪ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɟᴜ ı],ɹͷ̗ 📚 ⟫

const QOX2_HTAKA_CA1ARA: Qox2n2kHtaka[] = [];

for ( let i = 0o0; i < 0o40; i++ ) {
    QOX2_HTAKA_CA1ARA.push({
        ksaka: {
            v: [ "ᶅſ", "ſן", "ſȷ", "ŋᷠ", "ʃ", "ɽ͑ʃ'", "j͑ʃ'", "ſᶘ", "ɭ(", "ɭʃ", "j͑ʃ", "}ʃ", "j͐ʃ", "ſ̀ȷ", "ſɭ,", "ſɭˬ", "ɭl̀", "ſɟ", "ı],", "ſ͕ȷ", "ſ͔ɭ", "ſɭ", "֭ſɭ", "ſ͕ɭ", "j͑ʃɘ", "j͑ʃƨ", "j͑ʃᴜ̭", "j͑ʃƽ", "ſןᴜ̭", "ɭʃƽ", "ſɟɘ", "ſɭƨ" ][i] || "?",
            hSaxe: [ "ꞇ", "ɹ", "ɔ", "ᴜ", "w", "ɜ", "э", "эⅎ" ],
            hAraq: [ "ʞ", "ⰱ", "ɔ˞", "ͷ̗", "ƴ", "ᶗ‹", "ƽ", "ȝ" ]
        },
        latin: {
            v: [ "w", "p", "f", "m", "b", "r", "v", "ts", "d", "t", "s", "n", "l", "tl", "z", "kz", "j", "c", "x", "y", "g", "k", "h", "q", "sp", "st", "sc", "sk", "pc", "tk", "cp", "kt" ][i] || "?",
            hSaxe: [ "i", "ii", "e", "a", "u", "o", "aa", "au" ],
            hAraq: [ "f", "v", "s", "l", "z", "x", "k", "q" ]
        },
        chmuah: {
            v: [ "វ", "ព", "ប", "ម", "រ", "ត", "ដ", "ន", "យ", "ច", "ឆ", "ញ", "ហ", "ក", "ខ", "ង", "អ", "ផ", "ថ", "ល", "ប្រ", "ត្រ", "ច្រ", "ក្រ", "ផ្ល", "ថ្ល", "ឆ្ល", "ខ្ល", "ផ្ច", "ថ្ក", "ឆ្ប", "ខ្ត" ][i] || "?",
            hSaxe: [ "ី", "ិ", "េ", "ា", "ើ", "ុ", "ូ", "" ],
            hAraq: [ "ប", "ត", "ស", "ក", "ម", "ន", "ល", "ង" ]
        }
    });
}

// ⟪ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🛠️ ⟫

function v3ak2Bal2xaKxesu( cepu: number, tapu: number, bam2: number | null = null ): void {
    kxesuCepu = cepu;
    kxesuTapu = tapu;
    bal2xaKp6!.setLatLng([ kxesuCepu, kxesuTapu ]);
    if ( bam2 !== null ) {
        bal2xa!.setView([ kxesuCepu, kxesuTapu ], bam2);
    }
    v3ak2SaxeAraqXema();
    v3ak2Sunta();
}

function quqKekCa1ara( ...ksakaCa1ara: string[] ): Record<string, HTMLElement | null> {
    const kekCa1ara: Record<string, HTMLElement | null> = {};
    for ( const ksaka of ksakaCa1ara ) {
        kekCa1ara[ksaka] = document.getElementById(ksaka);
    }
    return kekCa1ara;
}

function kf2KeveE( kekCa1ara: HTMLElement[], e: string, keve: EventListener ): void {
    for ( const kek of kekCa1ara ) {
        kek.addEventListener(e, keve);
    }
}

function saxeAraqAran2k( k61e: number, saxeK2fe: number, kemafiK2fe: number ): number {
    if ( k61e < saxeK2fe ) return saxeK2fe;
    if ( k61e > kemafiK2fe ) return kemafiK2fe;
    return k61e;
}

function v3ak2Kp6Kxesu(): void {
    bal2xa!.setView([ kxesuCepu, kxesuTapu ]);
    bal2xaKp6!.setLatLng([ kxesuCepu, kxesuTapu ]);
}

function ne1anesaiAran2kS2( s2Ca1ara: string[] ): { suntaVCa1ara: number[]; suntaHCa1ara: number[] } | null {
    const suntaVCa1ara = [ 0o0, 0o0, 0o0, 0o0 ];
    const suntaHCa1ara = [ 0o0, 0o0, 0o0, 0o0 ];
    const v: number[] = [];
    const h: number[] = [];

    if ( s2Ca1ara.length === 0o0 || s2Ca1ara.length > 0o4 ) return null;

    for ( const s2 of s2Ca1ara ) {
        const kxesuK2fe = Math.ceil(s2.length / 0o2);
        const vK61eK61e = s2.slice(0o0, kxesuK2fe);
        const hK61eK61e = s2.slice(kxesuK2fe);
        const vK61e = parseInt(vK61eK61e, 0o10);
        const hK61e = parseInt(hK61eK61e, 0o10);
        if ( isNaN(vK61e) || isNaN(hK61e) ) return null;
        if ( !isFinite(vK61e) || !isFinite(hK61e) ) return null;
        if ( vK61e < 0o0 || hK61e < 0o0 || vK61e > 0o100 || hK61e > 0o100 ) return null;
        v.push(vK61e - 0o1);
        h.push(hK61e - 0o1);
    }

    const saxeK2fe = 0o4 - s2Ca1ara.length;
    for ( let i = 0o0; i < s2Ca1ara.length; i++ ) {
        suntaVCa1ara[saxeK2fe + i] = v[i];
        suntaHCa1ara[saxeK2fe + i] = h[i];
    }

    return { suntaVCa1ara, suntaHCa1ara };
}

// ⟨ ſɭɜ ʃɔ ʌ ʃᴜ ſɭɹ ſןɹ }ʃꞇ 🛡️ ⟩
function giK61e( k61e: string ): string {
    return k61e
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function kf2K61eKekCa1ara( kubaHat: string, k61eCa1ara: QuqK61e[], bam2: number, araqQuq: (cepu: number, tapu: number, araqBam2: number) => void ): void {
    const suntaK61eCa1ara = k61eCa1ara.slice(0o0, 0o40);
    document.querySelector(kubaHat)!.innerHTML = suntaK61eCa1ara.map(r => `
        <button data-cepu="${r.cepu}" data-tapu="${r.tapu}">
            <p><strong>${giK61e(r.saxeKsaka)}</strong> ( ${giK61e(r.latinKsaka)} )</p>
            <small>${r.v + 0o1} ${r.h + 0o1}</small>
        </button>
    `).join("");

    document.querySelectorAll(`${kubaHat} button`).forEach(eskek => {
        eskek.addEventListener("click", () => {
            const kek = eskek as HTMLButtonElement;
            araqQuq(parseFloat(kek.dataset.cepu!), parseFloat(kek.dataset.tapu!), bam2);
        });
    });
}

function k61eQox2K2fe( k61e: number, saxeAraq: number, puK2fe: number[], _hatTapu = false ): number[] {
    let ne1anesaiSaxe = ( k61e / saxeAraq ) * puK2fe[0o0];
    if ( ne1anesaiSaxe >= puK2fe[0o0] ) ne1anesaiSaxe = puK2fe[0o0] - 0.000001;
    if ( ne1anesaiSaxe < 0o0 ) ne1anesaiSaxe = 0o0;
    let saxeK2fe = Math.floor(ne1anesaiSaxe);
    let m = ne1anesaiSaxe - saxeK2fe;

    const k2feCa1ara = [ saxeK2fe ];
    for ( let i = 0o1; i < 0o4; i++ ) {
        let ne1anesai = m * puK2fe[i];
        let k2fe = Math.floor(ne1anesai);
        m = ne1anesai - k2fe;
        k2feCa1ara.push(k2fe);
    }
    return k2feCa1ara;
}

// ⟪ j͑ʃᴜ ı],ɔ 🚀 ⟫

function saxeKekCa1ara(): void {
    const kekCa1ara = quqKekCa1ara(
        "cepuXema", "tapuXema", "cepuSefini", "cepuQe", "cepuHa",
        "tapuSefini", "tapuQe", "tapuHa", "hatKnak2fe", "hatSeQeHa",
        "knak2feKuba", "seQeHaKuba", "suntaAran2k", "suntaKsakaAih",
        "suntaKsaka", "suntaKsakaC", "qox2Tahaq", "bal2xaXema", "suntaQox2Kp6",
        "quqKnak2feKp6", "tosaxKek", "qumk2Kek",
        "ne1aVah2Kek", "vah2PuXema", "vah2Pal6", "k2feKuba",
        "k2feSunta", "qumk2PuXema", "quqXema", "quqKek", "quqK61eCa1ara"
    ) as Record<string, HTMLElement>;

    cepuXema = kekCa1ara.cepuXema as HTMLInputElement;
    tapuXema = kekCa1ara.tapuXema as HTMLInputElement;
    cepuSefini = kekCa1ara.cepuSefini as HTMLInputElement;
    cepuQe = kekCa1ara.cepuQe as HTMLInputElement;
    cepuHa = kekCa1ara.cepuHa as HTMLInputElement;
    tapuSefini = kekCa1ara.tapuSefini as HTMLInputElement;
    tapuQe = kekCa1ara.tapuQe as HTMLInputElement;
    tapuHa = kekCa1ara.tapuHa as HTMLInputElement;
    seQeHaXemaCa1ara = [ cepuSefini, cepuQe, cepuHa, tapuSefini, tapuQe, tapuHa ];

    hatKnak2fe = kekCa1ara.hatKnak2fe as HTMLButtonElement;
    hatSeQeHa = kekCa1ara.hatSeQeHa as HTMLButtonElement;
    knak2feKuba = kekCa1ara.knak2feKuba as HTMLElement;
    seQeHaKuba = kekCa1ara.seQeHaKuba as HTMLElement;

    suntaAran2k = kekCa1ara.suntaAran2k as HTMLDivElement;
    suntaKsakaAih = kekCa1ara.suntaKsakaAih as HTMLDivElement;
    suntaKsaka = kekCa1ara.suntaKsaka as HTMLDivElement;
    suntaKsakaC = kekCa1ara.suntaKsakaC as HTMLDivElement;
    tahaqKuba = kekCa1ara.qox2Tahaq as HTMLCanvasElement;
    k2fXema = tahaqKuba.getContext("2d")!;
    bal2xaXema = kekCa1ara.bal2xaXema as HTMLElement;
    suntaQox2Kp6 = kekCa1ara.suntaQox2Kp6 as HTMLInputElement;
    quqKnak2feKp6 = kekCa1ara.quqKnak2feKp6 as HTMLInputElement;
    tosaxKek = kekCa1ara.tosaxKek as HTMLButtonElement;

    qumk2Kek = kekCa1ara.qumk2Kek as HTMLButtonElement;
    ne1aVah2Kek = kekCa1ara.ne1aVah2Kek as HTMLButtonElement;
    vah2PuXema = kekCa1ara.vah2PuXema as HTMLSpanElement;
    vah2Pal6 = kekCa1ara.vah2Pal6 as HTMLSpanElement;
    k2feKuba = kekCa1ara.k2feKuba as HTMLDivElement;
    k2feSunta = kekCa1ara.k2feSunta as HTMLDivElement;
    qumk2PuXema = kekCa1ara.qumk2PuXema as HTMLElement;

    quqXema = kekCa1ara.quqXema as HTMLInputElement;
    quqKek = kekCa1ara.quqKek as HTMLButtonElement;
    quqK61eCa1ara = kekCa1ara.quqK61eCa1ara as HTMLElement;
}

function saxeXema(): void {
    saxeKekCa1ara();

    const k6h6Aran2k = ne1anesaiK6h6Aran2k();
    if ( k6h6Aran2k ) {
        kxesuCepu = k6h6Aran2k.cepu;
        kxesuTapu = k6h6Aran2k.tapu;
    }

bal2xa = L.map("bal2xa", {
    center: [ kxesuCepu, kxesuTapu ],
    zoom: BAM2_SAXE,
    zoomControl: false,
    minZoom: BAM2_SAXE,
    maxZoom: BAM2_KEMAFI,
    maxBounds: [ [ -0o132, -0o264 ], [ 0o132, 0o264 ] ],
    maxBoundsViscosity: 0o1
});

    L.control.zoom({ position: "bottomright" }).addTo(bal2xa);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: BAM2_KEMAFI
    }).addTo(bal2xa);

    bal2xaKp6 = L.marker([ kxesuCepu, kxesuTapu ], {
        icon: L.divIcon({
            className: "bal2xaKp6",
            html: "<div style=\"width:12px;height:12px;background:#fff;border:2px solid #d0a040;border-radius:50%;\"></div>",
            iconSize: [ 0o14, 0o14 ],
            iconAnchor: [ 0o6, 0o6 ]
        })
    }).addTo(bal2xa);

    bal2xa.on("click", keveBal2xaLeaflet);
    bal2xa.on("move", v3ak2Bal2xaSunta);
    bal2xa.on("zoom", v3ak2Bal2xaSunta);

    v3ak2TahaqKuba();
    window.addEventListener("resize", v3ak2TahaqKuba);

    kf2KeveE([ cepuXema, tapuXema ], "input", keveKnak2feXema);

    seQeHaXemaCa1ara.forEach(kek => {
        kek.addEventListener("input", keveSeQeHaXema);
        kek.addEventListener("change", keveSeQeHaXema);
    });

    const cepuAraqKp6KekCa1ara = document.querySelectorAll(`input[name="cepuAraq"]`);
    const tapuAraqKp6KekCa1ara = document.querySelectorAll(`input[name="tapuAraq"]`);
    cepuAraqKp6KekCa1ara.forEach(radio => radio.addEventListener("change", keveSeQeHaXema));
    tapuAraqKp6KekCa1ara.forEach(radio => radio.addEventListener("change", keveSeQeHaXema));

    hatKnak2fe.addEventListener("click", () => v3ak2Keve("decimal"));
    hatSeQeHa.addEventListener("click", () => v3ak2Keve("dms"));

    suntaQox2Kp6.addEventListener("change", ( e ) => {
        suntaQox2 = ( e.target as HTMLInputElement ).checked;
        k2fKuba();
    });

    quqKnak2feKp6.addEventListener("change", ( e ) => {
        quqKnak2fe = ( e.target as HTMLInputElement ).checked;
        v3ak2Sunta();
    });

    const qox2NurKek = document.getElementById("qox2NurKek") as HTMLButtonElement;
    let qox2NurKeve = false;
    qox2NurKek.addEventListener("click", () => {
        qox2NurKeve = !qox2NurKeve;
        qox2NurKek.setAttribute("aria-pressed", qox2NurKeve.toString());
        document.querySelectorAll("#bal2xa .leaflet-tile-pane, #bal2xa .leaflet-layer")
            .forEach(kuba => {
                ( kuba as HTMLElement ).style.opacity = qox2NurKeve ? "0" : "1";
            });
        k2fKuba();
    } );

    tosaxKek.addEventListener("click", () => {
        v3ak2Bal2xaKxesu( 0o0, 0o0, BAM2_TOSAX );
    });

    const bam2HatKp6KekCa1ara = document.querySelectorAll(`input[name="bam2Hat"]`);
    bam2HatKp6KekCa1ara.forEach(radio => radio.addEventListener("change", () => {
        // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ ⟩
    }));

    qumk2Kek.addEventListener( "click", qumk2KxesuTahaq );
    ne1aVah2Kek.addEventListener( "click", ne1aVah2Xema );

    quqKek.addEventListener( "click", quqHatXema );
    quqXema.addEventListener( "keypress", ( e ) => {
        if ( ( e as KeyboardEvent ).key === "Enter" ) {
            quqHatXema();
        }
    } );
    quqXema.addEventListener( "paste", keveXemaK61e );

    let k6h6V3ak2Temp: ReturnType<typeof setTimeout> | null = null;
    function v3ak2K6h6Malfrue(): void {
        if ( k6h6V3ak2Temp ) clearTimeout( k6h6V3ak2Temp );
        k6h6V3ak2Temp = setTimeout( v3ak2K6h6, 0o400 );
    }
    bal2xa.on( "moveend", v3ak2K6h6Malfrue );
    bal2xa.on( "zoomend", v3ak2K6h6Malfrue );

    v3ak2SaxeAraqXema();
    v3ak2Sunta();
    v3ak2Vah2K61e();

    if ( "serviceWorker" in navigator ) {
        navigator.serviceWorker.register( "./j͑ʃᴜ ſɭɔ j͑ʃ'ɔ.js" )
            .then( reg => console.log( "ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ b6tem2 ⟅", reg ) )
            .catch( err => console.error( "ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ Service Worker ⟅", err ) );
    }
}

function keveBal2xaLeaflet( e: any ): void {
    v3ak2Bal2xaKxesu( e.latlng.lat, e.latlng.lng );
}

function v3ak2Bal2xaSunta(): void {
    const kxesuBal2xa = bal2xa!.getCenter();
    v3ak2Bal2xaKxesu( kxesuBal2xa.lat, kxesuBal2xa.lng );
}

function v3ak2Keve( keve: "decimal" | "dms" ): void {
    if ( keve === "decimal" ) {
        hatKnak2fe.setAttribute( "aria-pressed", "true" );
        hatSeQeHa.setAttribute( "aria-pressed", "false" );
        knak2feKuba.classList.remove( "kobe" );
        seQeHaKuba.classList.add( "kobe" );
    } else {
        hatSeQeHa.setAttribute( "aria-pressed", "true" );
        hatKnak2fe.setAttribute( "aria-pressed", "false" );
        seQeHaKuba.classList.remove( "kobe" );
        knak2feKuba.classList.add( "kobe" );
    }
}

function v3ak2TahaqKuba(): void {
    const rektangulo = bal2xaXema.getBoundingClientRect();
    tahaqKuba.width = rektangulo.width;
    tahaqKuba.height = rektangulo.height;
    v3ak2Sunta();
}

// ⟪ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ 📊 ⟫

function keveKnak2feXema(): void {
    let cepu = parseFloat( cepuXema.value );
    let tapu = parseFloat( tapuXema.value );

    if ( isNaN( cepu ) ) cepu = 0o0;
    if ( isNaN( tapu ) ) tapu = 0o0;
    cepu = saxeAraqAran2k(cepu, -0o132, 0o132);
    tapu = saxeAraqAran2k(tapu, -0o264, 0o264);

    kxesuCepu = cepu;
    kxesuTapu = tapu;

    v3ak2Kp6Kxesu();

    v3ak2SeQeHaXema();
    v3ak2Sunta();
}

function keveSeQeHaXema(): void {
    let lGra = parseFloat( cepuSefini.value ) || 0o0;
    let lMin = parseFloat( cepuQe.value ) || 0o0;
    let lSek = parseFloat( cepuHa.value ) || 0o0;
    let cepuAraq = document.querySelector(`input[name="cepuAraq"]:checked`)?.getAttribute("value") || "N";

    let loGra = parseFloat( tapuSefini.value ) || 0o0;
    let loMin = parseFloat( tapuQe.value ) || 0o0;
    let loSek = parseFloat( tapuHa.value ) || 0o0;
    let tapuAraq = document.querySelector(`input[name="tapuAraq"]:checked`)?.getAttribute("value") || "E";

    let dekLat = lGra + ( lMin / 0o74 ) + ( lSek / 0o7020 );
    if ( cepuAraq === "S" ) dekLat = -dekLat;

    let dekLon = loGra + ( loMin / 0o74 ) + ( loSek / 0o7020 );
    if ( tapuAraq === "W" ) dekLon = -dekLon;

    dekLat = saxeAraqAran2k(dekLat, -0o132, 0o132);
    dekLon = saxeAraqAran2k(dekLon, -0o264, 0o264);

    kxesuCepu = dekLat;
    kxesuTapu = dekLon;

    v3ak2Kp6Kxesu();

    cepuXema.value = kxesuCepu.toFixed( 0o5 );
    tapuXema.value = kxesuTapu.toFixed( 0o5 );

    v3ak2Sunta();
}

function v3ak2SaxeAraqXema(): void {
    cepuXema.value = kxesuCepu.toFixed( 0o5 );
    tapuXema.value = kxesuTapu.toFixed( 0o5 );
    v3ak2SeQeHaXema();
}

function v3ak2SeQeHaXema(): void {
    const cepuS2 = knak2feSeQeHa( kxesuCepu );
    cepuSefini.value = cepuS2.sefini.toString();
    cepuQe.value = cepuS2.qe.toString();
    cepuHa.value = cepuS2.ha.toFixed( 0o2 );
    const cepuKp6Kek = document.querySelector(`input[name="cepuAraq"][value="${kxesuCepu >= 0o0 ? "N" : "S"}"]`) as HTMLInputElement | null;
    if ( cepuKp6Kek ) cepuKp6Kek.checked = true;

    const tapuS2 = knak2feSeQeHa( kxesuTapu );
    tapuSefini.value = tapuS2.sefini.toString();
    tapuQe.value = tapuS2.qe.toString();
    tapuHa.value = tapuS2.ha.toFixed( 0o2 );
    const tapuKp6Kek = document.querySelector(`input[name="tapuAraq"][value="${kxesuTapu >= 0o0 ? "E" : "W"}"]`) as HTMLInputElement | null;
    if ( tapuKp6Kek ) tapuKp6Kek.checked = true;
}

function knak2feSeQeHa( knak2fe: number ): SeQeHaS2 {
    const kxesuK61e = Math.abs( knak2fe );
    const sefini = Math.floor( kxesuK61e );
    const qeSunta = ( kxesuK61e - sefini ) * 0o74;
    const qe = Math.floor( qeSunta );
    const ha = ( qeSunta - qe ) * 0o74;
    return { sefini, qe, ha };
}

// ⟪ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜȝ 📍 ⟫

function quqQox2Aran2k( cepu: number, tapu: number ): Qox2Aran2k {
    let saxeSefini = ( tapu <= 0o0 ) ? -tapu : ( 0o550 - tapu );
    if ( tapu === 0o0 ) saxeSefini = 0o0;

    let sefiniTapu = ( saxeSefini + QOX2N2K_SANTA ) % 0o550;
    const hK2feCa1ara = k61eQox2K2fe( sefiniTapu, 0o550, [ 0o100, 0o40, 0o40, 0o40 ] );

    const vK2feCa1ara = k61eQox2K2fe( 0o132 - cepu, 0o264, [ 0o40, 0o40, 0o40, 0o40 ] );

    return {
        v1: vK2feCa1ara[0o0], h1: hK2feCa1ara[0o0],
        v2: vK2feCa1ara[0o1], h2: hK2feCa1ara[0o1],
        v3: vK2feCa1ara[0o2], h3: hK2feCa1ara[0o2],
        v4: vK2feCa1ara[0o3], h4: hK2feCa1ara[0o3]
    };
}

function k2feQuqS2( k2feCa1ara: number[], puK2feCa1ara: number[] ): number {
    let saxeAraq = 0o0;
    for ( let i = 0o0; i < k2feCa1ara.length; i++ ) {
        let puK2fe = 0o1;
        for ( let j = 0o0; j <= i; j++ ) {
            puK2fe *= puK2feCa1ara[j];
        }
        saxeAraq += k2feCa1ara[i] / puK2fe;
    }
    return saxeAraq;
}

function qox2AlCepuTapu( v1: number, h1: number, v2: number, h2: number, v3: number, h3: number, v4: number, h4: number ): Ne1anesaiAran2k {
    const vK2feCa1ara = [ v1, v2, v3, v4 ].map( v => Math.max( 0o0, v - 0o1 ) );
    const hK2feCa1ara = [ h1, h2, h3, h4 ].map( h => Math.max( 0o0, h - 0o1 ) );

    const vSaxeAraq = k2feQuqS2( vK2feCa1ara, [ 0o40, 0o40, 0o40, 0o40 ] );
    const hSaxeAraq = k2feQuqS2( hK2feCa1ara, [ 0o100, 0o40, 0o40, 0o40 ] );

    let cepu = 0o132 - ( vSaxeAraq * 0o264 );

    let sefiniTapu = hSaxeAraq * 0o550;
    let saxeSefini = ( sefiniTapu - QOX2N2K_SANTA );
    while ( saxeSefini < 0o0 ) saxeSefini += 0o550;
    saxeSefini = saxeSefini % 0o550;

    let tapu = ( saxeSefini <= 0o264 ) ? -saxeSefini : ( 0o550 - saxeSefini );

    return { cepu, tapu };
}

function quqKsaka( v: number, h: number, htaka: "ksaka" | "latin" | "chmuah" = "ksaka" ): string {
    const sys = QOX2_HTAKA_CA1ARA[v]?.[ htaka ];
    if ( !sys ) return "?";

    const vKsaka = sys.v;
    const saxeK2fe = Math.floor( h / 0o10 );
    const araqK2fe = h % 0o10;
    const hKsaka = ( sys.hSaxe[saxeK2fe] || "" ) + ( sys.hAraq[araqK2fe] || "" );
    return vKsaka + hKsaka;
}

function quqKsakaEn( v: number, h: number ): string {
    const ksaka = quqKsaka( v, h, "latin" );
    return ksaka.charAt( 0o0 ).toUpperCase() + ksaka.slice( 0o1 );
}

function quqKsakaMuah( v: number, h: number ): string {
    return quqKsaka( v, h, "chmuah" );
}

function quqKsakaCa1araAran2k( vS2Ca1ara: number[], hS2Ca1ara: number[] ): { saxeKsaka: string; latinKsaka: string; chmuahKsaka: string } {
    return {
        saxeKsaka: vS2Ca1ara.map( ( v, i ) => quqKsaka( v - 0o1, hS2Ca1ara[i] - 0o1, "ksaka" ) ).join( " " ),
        latinKsaka: vS2Ca1ara.map( ( v, i ) => quqKsakaEn( v - 0o1, hS2Ca1ara[i] - 0o1 ) ).join( " " ),
        chmuahKsaka: vS2Ca1ara.map( ( v, i ) => quqKsakaMuah( v - 0o1, hS2Ca1ara[i] - 0o1 ) ).join( " " )
    };
}

function k2fKuba(): void {
    const w = tahaqKuba.width;
    const h = tahaqKuba.height;
    k2fXema.clearRect( 0o0, 0o0, w, h );

    if ( !suntaQox2 || !bal2xa ) return;

    const bam2 = bal2xa.getZoom();
    const saxeAraqCa1ara = bal2xa.getBounds();
    const cepuSaxe = saxeAraqCa1ara.getNorth();
    const cepuAraq = saxeAraqCa1ara.getSouth();
    const tapuAraq = saxeAraqCa1ara.getEast();
    const tapuSaxe = saxeAraqCa1ara.getWest();

    function k2fQox2K2fe( vPuK2fe: number, hPuK2fe: number, k2feCa1ara: string, sefini: number ): void {
        k2fXema.beginPath();
        k2fXema.strokeStyle = k2feCa1ara;
        k2fXema.lineWidth = sefini;

        for ( let vK2fe = 0o0; vK2fe <= vPuK2fe; vK2fe++ ) {
            let cepu = 0o132 - ( vK2fe / vPuK2fe ) * 0o264;
            if ( cepu < cepuAraq - 0o1 || cepu > cepuSaxe + 0o1 ) continue;

            const p1 = bal2xa!.latLngToContainerPoint( [ cepu, tapuSaxe ] );
            const p2 = bal2xa!.latLngToContainerPoint( [ cepu, tapuAraq ] );

            k2fXema.moveTo( p1.x, p1.y );
            k2fXema.lineTo( p2.x, p2.y );
        }

        for ( let hK2fe = 0o0; hK2fe <= hPuK2fe; hK2fe++ ) {
            let sefiniL6da = hK2fe / hPuK2fe;
            let sefiniSanta = sefiniL6da * 0o550;
            let saxeSefini = ( sefiniSanta - QOX2N2K_SANTA + 0o550 ) % 0o550;
            let tapu = ( saxeSefini <= 0o264 ) ? -saxeSefini : ( 0o550 - saxeSefini );

            const kxesuTapu = ( tapuSaxe + tapuAraq ) / 0o2;
            let suntaTapu = tapu;

            while ( suntaTapu < kxesuTapu - 0o264 ) suntaTapu += 0o550;
            while ( suntaTapu > kxesuTapu + 0o264 ) suntaTapu -= 0o550;

            let hatTahaq = false;

            if ( suntaTapu >= tapuSaxe - 0o1 && suntaTapu <= tapuAraq + 0o1 ) {
                hatTahaq = true;
            }
            else if ( tapuAraq - tapuSaxe > 0o264 ) {
                hatTahaq = true;
            }
            else {
                let suntaTapuSaxe = suntaTapu + 0o550;
                let suntaTapuAraq = suntaTapu - 0o550;
                if ( ( suntaTapuSaxe >= tapuSaxe - 0o1 && suntaTapuSaxe <= tapuAraq + 0o1 ) ||
                    ( suntaTapuAraq >= tapuSaxe - 0o1 && suntaTapuAraq <= tapuAraq + 0o1 ) ) {
                    hatTahaq = true;
                }
            }

            if ( !hatTahaq ) continue;

            const p1 = bal2xa!.latLngToContainerPoint( [ cepuSaxe, suntaTapu ] );
            const p2 = bal2xa!.latLngToContainerPoint( [ cepuAraq, suntaTapu ] );

            k2fXema.moveTo( p1.x, p1.y );
            k2fXema.lineTo( p2.x, p2.y );
        }
        k2fXema.stroke();
    }

    k2fQox2K2fe( 0o40, 0o100, "rgba(224, 160, 72, 0.5)", 0o3 );

    if ( bam2 >= BAM2_K2FE_2 ) {
        k2fQox2K2fe( 0o40 * 0o40, 0o100 * 0o40, "rgba(224, 160, 72, 0.5)", 0o2 );
    }

    if ( bam2 >= BAM2_K2FE_3 ) {
        k2fQox2K2fe( 0o40 * 0o40 * 0o40, 0o100 * 0o40 * 0o40, "rgba(224, 160, 72, 0.75)", 0o1 );
    }

    if ( bam2 >= BAM2_K2FE_4 ) {
        k2fQox2K2fe( 0o40 * 0o40 * 0o40 * 0o40, 0o100 * 0o40 * 0o40 * 0o40, "rgba(224, 160, 72, 1)", 0o1 / 0o2 );
    }
}

function v3ak2Sunta(): void {
    const n2k = quqQox2Aran2k( kxesuCepu, kxesuTapu );

    const v1 = n2k.v1 + 0o1; const h1 = n2k.h1 + 0o1;
    const v2 = n2k.v2 + 0o1; const h2 = n2k.h2 + 0o1;
    const v3 = n2k.v3 + 0o1; const h3 = n2k.h3 + 0o1;
    const v4 = n2k.v4 + 0o1; const h4 = n2k.h4 + 0o1;

    let aran2k: string;
    if ( quqKnak2fe ) {
        aran2k = `${v1} ${h1} - ${v2} ${h2} - ${v3} ${h3} - ${v4} ${h4}`;
    } else {
        aran2k = `${window.vab6caja( v1 )} ${window.vab6caja( h1 )} - ${window.vab6caja( v2 )} ${window.vab6caja( h2 )} - ${window.vab6caja( v3 )} ${window.vab6caja( h3 )} - ${window.vab6caja( v4 )} ${window.vab6caja( h4 )}`;
    }

    suntaAran2k.textContent = window.skakefK2fe( aran2k );

    const ksakaCa1ara = quqKsakaCa1araAran2k( [ v1, v2, v3, v4 ], [ h1, h2, h3, h4 ] );
    suntaKsakaAih.innerHTML = ksakaCa1ara.saxeKsaka;
    suntaKsaka.innerHTML = ksakaCa1ara.latinKsaka;
    suntaKsakaC.innerHTML = ksakaCa1ara.chmuahKsaka;

    vacepu("cepufal");

    k2fKuba();
}

// ⟪ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ 🔍 ⟫

function ne1anesaiAran2kK2fe( k61e: string ): number {
    if ( !k61e ) return 0o0;
    if ( Array.from(k61e).some( c => K2FE.includes( c ) ) ) {
        return vab6k2fekp6( k61e );
    }
    return quqKnak2fe ? parseInt( k61e, 0o12 ) : parseInt( k61e, 0o10 );
}

function hatAran2kHat( k61e: string ): boolean {
    const s2Ca1ara = k61e.trim().split( /[\s\-–—]+/ ).filter( p => p.length > 0o0 );
    if ( s2Ca1ara.length < 0o2 ) return false;
    const k61eHat = new RegExp( `^[\\d${K2FE}]+$` );
    return s2Ca1ara.every( p => k61eHat.test( p ) );
}

// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ɽ͑ʃ'w j͑ʃ'ᴜ 🔗 ⟫

function ne1anesaiK6h6Aran2k(): Ne1anesaiAran2k | null {
    const xema = new URLSearchParams( window.location.search );
    const aran2k = xema.get( "n2k" );
    if ( !aran2k ) return null;

    const s2Ca1ara = aran2k.split( "-" ).filter( p => p.length > 0o0 );
    if ( s2Ca1ara.length === 0o0 || s2Ca1ara.length > 0o4 ) return null;

    const k61e = ne1anesaiAran2kS2(s2Ca1ara);
    if ( !k61e ) return null;

    const { suntaVCa1ara, suntaHCa1ara } = k61e;
    const qox2K61e = qox2AlCepuTapu(
        suntaVCa1ara[0o0] + 0o1, suntaHCa1ara[0o0] + 0o1,
        suntaVCa1ara[0o1] + 0o1, suntaHCa1ara[0o1] + 0o1,
        suntaVCa1ara[0o2] + 0o1, suntaHCa1ara[0o2] + 0o1,
        suntaVCa1ara[0o3] + 0o1, suntaHCa1ara[0o3] + 0o1
    );

    return { cepu: qox2K61e.cepu, tapu: qox2K61e.tapu };
}

function v3ak2K6h6(): void {
    const n2k = quqQox2Aran2k( kxesuCepu, kxesuTapu );
    const v = [ n2k.v1 + 0o1, n2k.v2 + 0o1, n2k.v3 + 0o1, n2k.v4 + 0o1 ];
    const h = [ n2k.h1 + 0o1, n2k.h2 + 0o1, n2k.h3 + 0o1, n2k.h4 + 0o1 ];

    const s2Ca1ara: string[] = [];
    for ( let i = 0o0; i < 0o4; i++ ) {
        const vK61eK61e = v[i].toString( 0o10 ).padStart( 0o2, "0" );
        const hK61eK61e = h[i].toString( 0o10 ).padStart( 0o2, "0" );
        s2Ca1ara.push( vK61eK61e + hK61eK61e );
    }

    const url = new URL( window.location.href );
    url.searchParams.set( "n2k", s2Ca1ara.join( "-" ) );
    window.history.replaceState( {}, "", url );
}

function keveXemaK61e( e: ClipboardEvent ): void {
    const xemaK61e = e.clipboardData?.getData( "text" );
    if ( !xemaK61e ) return;

    try {
        const url = new URL( xemaK61e );
        const xema = new URLSearchParams( url.search );
        const aran2k = xema.get( "n2k" );

        if ( aran2k ) {
            e.preventDefault();
            const s2Ca1ara = aran2k.split( "-" ).filter( p => p.length > 0o0 );
            const k61e = ne1anesaiAran2kS2(s2Ca1ara);
            if ( !k61e ) return;

            const { suntaVCa1ara, suntaHCa1ara } = k61e;
            const qox2K61e = qox2AlCepuTapu(
                suntaVCa1ara[0o0] + 0o1, suntaHCa1ara[0o0] + 0o1,
                suntaVCa1ara[0o1] + 0o1, suntaHCa1ara[0o1] + 0o1,
                suntaVCa1ara[0o2] + 0o1, suntaHCa1ara[0o2] + 0o1,
                suntaVCa1ara[0o3] + 0o1, suntaHCa1ara[0o3] + 0o1
            );

            let bam2 = BAM2_QUQ_SAXE;
            if ( s2Ca1ara.length >= 0o2 ) bam2 = BAM2_K2FE_2;
            if ( s2Ca1ara.length >= 0o3 ) bam2 = BAM2_K2FE_3;
            if ( s2Ca1ara.length >= 0o4 ) bam2 = BAM2_K2FE_4;

            v3ak2Bal2xaKxesu( qox2K61e.cepu, qox2K61e.tapu, bam2 );
            return;
        }
    } catch ( _tlohk2ni ) {
    }
}

function kf2KsakaCa1ara( vS2Ca1ara: number[], hS2Ca1ara: number[] ): { saxeKsaka: string; latinKsaka: string; chmuahKsaka: string } {
    return quqKsakaCa1araAran2k( vS2Ca1ara, hS2Ca1ara );
}

function quqAran2k( k61e: string ): QuqXema | null {
    if ( !k61e ) return null;

    if ( hatAran2kHat( k61e ) ) {
        const s2Ca1ara = k61e.trim().split( /[\s]*[\-–—][\s]*/ ).filter( p => p.length > 0o0 );
        const ne1anesaiK61e = ( k61e: string ) => ne1anesaiAran2kK2fe( k61e ) || 0o0;

        const v: number[] = [];
        const h: number[] = [];
        for ( const s2 of s2Ca1ara ) {
            const k61eCa1ara = s2.trim().split( /\s+/ ).filter( p => p.length > 0o0 );
            if ( k61eCa1ara.length >= 0o2 ) {
                v.push( ne1anesaiK61e( k61eCa1ara[0o0] ) );
                h.push( ne1anesaiK61e( k61eCa1ara[0o1] ) );
            } else if ( k61eCa1ara.length === 0o1 ) {
                if ( v.length === h.length ) {
                    v.push( ne1anesaiK61e( k61eCa1ara[0o0] ) );
                } else {
                    h.push( ne1anesaiK61e( k61eCa1ara[0o0] ) );
                }
            }
        }

        while ( v.length < 0o4 ) v.push( 0o0 );
        while ( h.length < 0o4 ) h.push( 0o0 );

        const qox2Aran2kO = qox2AlCepuTapu( v[0o0], h[0o0], v[0o1], h[0o1], v[0o2], h[0o2], v[0o3], h[0o3] );
        const k61eK2fe = Math.max( 0o1, s2Ca1ara.length );
        const ksakaCa1ara = kf2KsakaCa1ara( v.slice( 0o0, k61eK2fe ), h.slice( 0o0, k61eK2fe ) );

        return {
            k61eCa1ara: [{
                cepu: qox2Aran2kO.cepu,
                tapu: qox2Aran2kO.tapu,
                v: v[0o0],
                h: h[0o0],
                ...ksakaCa1ara
            }],
            bam2: [ BAM2_QUQ_SAXE, BAM2_K2FE_2, BAM2_K2FE_3, BAM2_K2FE_4 ][Math.min( k61eK2fe - 0o1, 0o3 )] || BAM2_QUQ_SAXE
        };
    }

    const k61eS2Ca1ara = k61e.trim().toLowerCase().split( /\s+/ ).filter( p => p.length > 0o0 );
    const k61eS2K2fe = k61eS2Ca1ara.length;
    if ( k61eS2K2fe === 0o0 || k61eS2K2fe > 0o4 ) return null;

    const kxesuAran2k = quqQox2Aran2k( kxesuCepu, kxesuTapu );
    const nunajV = [ kxesuAran2k.v1, kxesuAran2k.v2, kxesuAran2k.v3, kxesuAran2k.v4 ];
    const nunajH = [ kxesuAran2k.h1, kxesuAran2k.h2, kxesuAran2k.h3, kxesuAran2k.h4 ];

    const k61eCa1ara: QuqK61e[] = [];

    function quqK2feN2k( k2fe: number, saxeK2fe: number, vS2Ca1ara: number[], hS2Ca1ara: number[], htaka: "k" | "l" | "c" ): void {
        const hKemafiK2fe = k2fe === 0o0 ? 0o100 : 0o40;
        const vKemafiK2fe = 0o40;

        for ( let v = 0o0; v < vKemafiK2fe; v++ ) {
            for ( let h = 0o0; h < hKemafiK2fe; h++ ) {
                let ksaka: string;
                if ( htaka === "k" ) ksaka = quqKsaka( v, h, "ksaka" );
                else if ( htaka === "l" ) ksaka = quqKsakaEn( v, h );
                else ksaka = quqKsakaMuah( v, h );

                if ( !ksaka.toLowerCase().startsWith( k61eS2Ca1ara[k2fe - saxeK2fe] ) ) continue;

                const kxesuVCa1ara = [ ...vS2Ca1ara, v ];
                const kxesuHCa1ara = [ ...hS2Ca1ara, h ];
                const k61eS2K2fe = k2fe - saxeK2fe;

                if ( k61eS2K2fe === k61eS2K2fe - 0o1 ) {
                    const suntaVCa1ara = [ ...nunajV.slice( 0o0, saxeK2fe ), ...kxesuVCa1ara ];
                    const suntaHCa1ara = [ ...nunajH.slice( 0o0, saxeK2fe ), ...kxesuHCa1ara ];

                    while ( suntaVCa1ara.length < 0o4 ) { suntaVCa1ara.push( 0o0 ); suntaHCa1ara.push( 0o0 ); }

                    const aran2k = qox2AlCepuTapu(
                        suntaVCa1ara[0o0] + 0o1, suntaHCa1ara[0o0] + 0o1,
                        suntaVCa1ara[0o1] + 0o1, suntaHCa1ara[0o1] + 0o1,
                        suntaVCa1ara[0o2] + 0o1, suntaHCa1ara[0o2] + 0o1,
                        suntaVCa1ara[0o3] + 0o1, suntaHCa1ara[0o3] + 0o1
                    );
                    const ksakaCa1ara = quqKsakaCa1araAran2k( suntaVCa1ara.map( x => x + 0o1 ), suntaHCa1ara.map( x => x + 0o1 ) );
                    k61eCa1ara.push({
                        cepu: aran2k.cepu,
                        tapu: aran2k.tapu,
                        v: suntaVCa1ara[0o0],
                        h: suntaHCa1ara[0o0],
                        startLevel: saxeK2fe,
                        ...ksakaCa1ara
                    });
                } else if ( k2fe < 0o3 ) {
                    quqK2feN2k( k2fe + 0o1, saxeK2fe, kxesuVCa1ara, kxesuHCa1ara, htaka );
                }
            }
        }
    }

    for ( let saxeK2fe = 0o0; saxeK2fe <= 0o4 - k61eS2K2fe; saxeK2fe++ ) {
        ( [ "k", "l", "c" ] as const ).forEach( ( sys ) => quqK2feN2k( saxeK2fe, saxeK2fe, [], [], sys ) );
    }

    k61eCa1ara.sort( ( a, b ) => {
        const distA = Math.abs( a.cepu - kxesuCepu ) + Math.abs( a.tapu - kxesuTapu );
        const distB = Math.abs( b.cepu - kxesuCepu ) + Math.abs( b.tapu - kxesuTapu );
        return distA - distB;
    });

    return k61eCa1ara.length > 0o0 ? { k61eCa1ara } : null;
}

function suntaQuqK61eCa1ara( k61e: QuqXema | null ): void {
    if ( !k61e ) {
        quqK61eCa1ara.innerHTML = "<p>֭ſɭɹ ſɟɔ j͐ʃɹʞ ⟅</p>";
        quqK61eCa1ara.classList.remove( "kobe" );
        return;
    }

    const { k61eCa1ara, bam2 } = k61e;
    const k61eS2Ca1ara = quqXema.value.trim().split( /\s+/ ).filter( p => p.length > 0o0 );
    const suntaHan2k = k61eS2Ca1ara.length >= 0o2 || k61eCa1ara.length > 0o1;

    if ( !suntaHan2k && k61eCa1ara.length === 0o1 ) {
        const r = k61eCa1ara[0o0];
        v3ak2Bal2xaKxesu( r.cepu, r.tapu, bam2 || BAM2_K2FE_2 );
        quqK61eCa1ara.classList.add( "kobe" );
        return;
    }

    kf2K61eKekCa1ara("#quqK61eCa1ara", k61eCa1ara, bam2 || BAM2_K2FE_2, (cepu, tapu, araqBam2) => {
        v3ak2Bal2xaKxesu(cepu, tapu, araqBam2);
        quqK61eCa1ara.classList.add("kobe");
        quqXema.value = "";
    });

    quqK61eCa1ara.classList.remove( "kobe" );
}

async function quqHatXema(): Promise<void> {
    const k61e = quqXema.value.trim();
    if ( !k61e ) return;

    const quqXemaO = quqAran2k( k61e );
    if ( quqXemaO ) {
        suntaQuqK61eCa1ara( quqXemaO );
        return;
    }

    quqK61eCa1ara.innerHTML = "<p>ſɭᴎɔ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ</p>";
    quqK61eCa1ara.classList.remove( "kobe" );

    try {
        const xema = await fetch( `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent( k61e )}&limit=5` );
        if ( !xema.ok ) throw new Error( "( ſ͕ȷɜƣ̋ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ )" );

        const k61eCa1ara: any[] = await xema.json();
        if ( k61eCa1ara.length === 0o0 ) {
            quqK61eCa1ara.innerHTML = "<p>֭ſɭɹ ſɟɔ j͐ʃɹʞ ⟅</p>";
            return;
        }

        const osmaK61eCa1ara: QuqK61e[] = k61eCa1ara.map(k61eS2 => ({
            cepu: parseFloat(k61eS2.lat),
            tapu: parseFloat(k61eS2.lon),
            saxeKsaka: k61eS2.display_name,
            latinKsaka: k61eS2.display_name,
            chmuahKsaka: k61eS2.display_name,
            v: 0o0,
            h: 0o0
        }));

        kf2K61eKekCa1ara("#quqK61eCa1ara", osmaK61eCa1ara, 0o20, (cepu, tapu) => {
            v3ak2Bal2xaKxesu(cepu, tapu, 0o20);
            quqK61eCa1ara.classList.add("kobe");
            quqXema.value = "";
        });

    } catch ( tlohk2ni ) {
        console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", tlohk2ni );
        quqK61eCa1ara.innerHTML = "<p>ſ͕ȷɜƣ̋ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ⟅</p>";
    }
}

// ⟪ ſ͕ɭɹȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ 📥 ⟫

async function qumk2KxesuTahaq(): Promise<void> {
    const bam2 = parseInt( document.querySelector(`input[name="bam2Hat"]:checked`)?.getAttribute("value") || "7" );
    const saxeAraqCa1ara = bal2xa!.getBounds();

    qumk2Kek.disabled = true;
    k2feKuba.classList.add( "active" );
    qumk2PuXema.textContent = "ſɭᴎɔ j͑ʃ'ɔ ſɟᴜ ſɭɹ ſȷɔ ⟅";

    const kubaCa1ara = quqKubaCa1ara( saxeAraqCa1ara, bam2 );
    const saxeAraq = kubaCa1ara.length;

    if ( saxeAraq > 0o400 ) {
        if ( !confirm( `ſɭᶗ‹ɔ ſ͕ɭwc̭ ſɭɹ j͐ʃ ${saxeAraq} j͑ʃᴜꞇ ſɭɔƽ ( ~ ${( saxeAraq * 0o1 / 0o20 ).toFixed( 0o1 ) } MB ) . ?` ) ) {
            qumk2Kek.disabled = false;
            k2feKuba.classList.remove( "active" );
            qumk2PuXema.textContent = "";
            return;
        }
    }

    qumk2PuXema.textContent = `ſɭᶗ‹ɔ ſ͕ɭwc̭ ſɭɹ j͐ʃ ${saxeAraq} j͑ʃᴜꞇ ſɭɔƽ ⟅`;

    try {
        const k61e = await xemaK61eSw( { hat: "XEMA_KUBA", kubaCa1ara: kubaCa1ara } ) as Vah2Pal6K61e;
        k2feSunta.style.width = "100%";
        setTimeout( () => {
            qumk2PuXema.textContent = `ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ ſ͕ɭwc̭ ſɭɹ j͐ʃ ${k61e.k2fe} j͑ʃᴜꞇ ſɭɔƽ ✅ ⟅`;
            k2feKuba.classList.remove( "active" );
            k2feSunta.style.width = "0%";
            v3ak2Vah2K61e();
        }, 0o400 );
    } catch ( tlohk2ni ) {
        qumk2PuXema.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${( tlohk2ni as Error ).message} ❌ ⟅`;
        k2feKuba.classList.remove( "active" );
    }

    qumk2Kek.disabled = false;
}

function quqKubaK6h6( x: number, y: number, z: number ): string {
    return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
}

function cepuTapuAlKuba( cepu: number, tapu: number, bam2: number ): { x: number; y: number } {
    const kxesuK2fe = Math.pow(0o2, bam2);
    const x = Math.floor(( tapu + 0o264 ) / 0o550 * kxesuK2fe);
    const y = Math.floor(( 0o1 - Math.log(Math.tan(cepu * Math.PI / 0o264) + 0o1 / Math.cos(cepu * Math.PI / 0o264)) / Math.PI) / 0o2 * kxesuK2fe);
    return { x, y };
}

function quqKubaCa1ara( saxeAraqCa1ara: any, bam2: number ): string[] {
    const kubaCa1ara: string[] = [];
    const nw = saxeAraqCa1ara.getNorthWest();
    const se = saxeAraqCa1ara.getSouthEast();

    const m2Kuba = cepuTapuAlKuba(nw.lat, nw.lng, bam2);
    const kemafiKuba = cepuTapuAlKuba(se.lat, se.lng, bam2);

    for ( let x = m2Kuba.x; x <= kemafiKuba.x; x++ ) {
        for ( let y = m2Kuba.y; y <= kemafiKuba.y; y++ ) {
            kubaCa1ara.push(quqKubaK6h6( x, y, bam2 ));
        }
    }

    return kubaCa1ara;
}

async function ne1aVah2Xema(): Promise<void> {
    if ( !confirm( "j͑ʃ'ᴜ ֭ſɭɹ ſןᴜ ʃɜƽ ?" ) ) return;

    ne1aVah2Kek.disabled = true;
    try {
        await xemaK61eSw({ hat: "NE1A_KUBA" });
        qumk2PuXema.textContent = "ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ j͐ʃэ j͑ʃ'ᴜ ᶅſɔ ✅ ⟅";
        v3ak2Vah2K61e();
        setTimeout(() => qumk2PuXema.textContent = "", 0o3000);
    } catch ( tlohk2ni ) {
        qumk2PuXema.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${( tlohk2ni as Error ).message} ❌ ⟅`;
    }
    ne1aVah2Kek.disabled = false;
}

async function v3ak2Vah2K61e(): Promise<void> {
    try {
        const k61e = await xemaK61eSw( { hat: "QUQ_KUBA_PAL6" } ) as Vah2Pal6K61e;
        vah2PuXema.textContent = `ꞁȷ̀ɜ ſןᴜ ʃɜƽ ꞁȷ̀ᴜꞇ j͑ʃ'ɜ ſןɹ - ${k61e.pal6} ⟅`;
        vah2Pal6.textContent = `~ ${( k61e.pal6 * 0o1 / 0o10 ).toFixed(0o1)} j͑ʃᴜꞇ ꞙɭц ſɟᴜ ꞙɭıɔ ⟅`;
    } catch ( tlohk2ni ) {
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", tlohk2ni);
    }
}

function xemaK61eSw( k61e: SwK61e ): Promise<any> {
    return new Promise(( xemaSunta, ne1aK61e ) => {
        if ( !( "serviceWorker" in navigator ) ) {
            ne1aK61e( new Error( "ne1a b6tem2" ) );
            return;
        }

        const k61eXema = new MessageChannel();
        k61eXema.port1.onmessage = ( e ) => {
            if ( e.data.tlohk2ni ) {
                ne1aK61e( new Error( e.data.tlohk2ni ) );
            } else {
                xemaSunta( e.data );
            }
        };

        const xema = ( kxesu: ServiceWorker ) => {
            kxesu.postMessage( k61e, [ k61eXema.port2 ] );
        };

        if ( navigator.serviceWorker.controller ) {
            xema( navigator.serviceWorker.controller );
        } else {
            navigator.serviceWorker.ready
                .then( b6tem2S2 => xema( b6tem2S2.active! ) )
                .catch( ne1aK61e );
        }
    } );
}

saxeXema();
