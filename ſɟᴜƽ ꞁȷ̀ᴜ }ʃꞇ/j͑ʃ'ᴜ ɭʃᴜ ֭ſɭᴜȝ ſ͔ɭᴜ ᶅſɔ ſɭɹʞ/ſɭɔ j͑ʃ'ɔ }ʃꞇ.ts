// ≺⧼ ſɟᴜ ſɭɔ j͑ʃ'ɔ - Text Image Generator 🖼️ ⧽≻
/**
 * Generates images from text using custom fonts
 * - Supports custom font loading
 * - Multi-line text with various arrangements
 * - Export to PNG with print functionality
 */


// ⟪ Constants 📦 ⟫

const PORTRAIT_PAGE_WIDTH = 794;
const LANDSCAPE_PAGE_WIDTH = 1123;
const ERROR_INVALID_INPUT = "j͐ʃэ ɭʃɔ ſ͕ɭᴜꞇ j͑ʃ'ɔ ſɭп́ɜ ⟅";


// ⟪ Types 📐 ⟫

interface Tz2saiTahaq {
    tlakakaiKucaq: TlakakaiKucaq[];
    tapuAreqj2k: number;
    height: number;
    sozasaiAreqj2k: number;
    psazaiAreqj2k: number;
    saqaiAreqj2k: number;
    raqaiAreqj2k: number;
    arak21okoWeh2: string;
}

interface TlakakaiKucaq {
    columns: Cepuni[];
    kucaqEr2haSefwini: number;
    kucaqEr2haL6da: number;
    kmawuk2niSweKucaq: number[];
}

interface Cepuni {
    haxez: Xez[];
    cepuniKmasefwini: number;
}

interface Xez {
    saxedini: TextDims | null;
    ksozdini: TextDims[];
    xezEr2haSefwini: number;
    xezEr2haL6da: number;
    verticalScale: number;
}

interface TextDims {
    text: string;
    width: number;
    height: number;
    ascent: number;
    descent: number;
    actualBoundingBoxLeft: number;
    actualBoundingBoxRight: number;
    actualBoundingBoxAscent: number;
    actualBoundingBoxDescent: number;
}

interface Page {
    blocks: TlakakaiKucaq[];
    startIndex: number;
}

interface RawXez {
    saxedini: string;
    ksozdini: string[];
}


// ⟪ Constants 📦 ⟫

const lagaCvpKek = document.getElementById("lagaCvp") as HTMLInputElement;
const lagaKsakaKek = document.getElementById("lagaKsaka") as HTMLInputElement;
const cepuAreqj2kKek = document.getElementById("cepuAreqj2k") as HTMLInputElement;
const sozasaiAregj2kKek = document.getElementById("sozasaiAreqj2k") as HTMLInputElement;
const raqaiAreqj2kKek = document.getElementById("raqaiAreqj2k") as HTMLInputElement;
const psazaiAreqj2kKek = document.getElementById("psazaiAreqj2k") as HTMLInputElement;
const saqaiAreqj2kKek = document.getElementById("saqaiAreqj2k") as HTMLInputElement;
const pawasaiAraqKek = (): HTMLInputElement | null => document.querySelector('input[name="pawasaiAraq"]:checked');
const sefaktapuniKek = document.getElementById("sefaktapuni") as HTMLInputElement;
const squeezeVerticalKek = document.getElementById("vac2w2k") as HTMLInputElement;
const xezSwekmavem2Kek = document.getElementById("xezSwekmavem2") as HTMLInputElement;
const tapuAreqj2kKek = document.getElementById("tapuAreqj2k") as HTMLInputElement;

const kf2Sweca12na = document.getElementById("kf2Sweca12na") as HTMLButtonElement;
const kf2B6m6qK2p2Ca12na = document.getElementById("kf2B6m6qK2p2Ca12na") as HTMLButtonElement;
const tlohk2niKek = document.getElementById("tlohk2ni") as HTMLElement;
const lagaCvp3ohk2niKek = document.getElementById("lagaCvp3ohk2ni") as HTMLElement;
const inakLagaKek = document.getElementById("inakLaga") as HTMLInputElement | null;

let tz2saiTahaq: Tz2saiTahaq | null = null;


// ⟪ Error Display Functions ❌ ⟫

function kf23ohk2ni(tlohk2niKek: HTMLElement, ox2pewa: Error | string, tosaxKek: HTMLInputElement | null = null, tosaxRuva = "Arial"): void {
    console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", ox2pewa);
    tlohk2niKek.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${( ox2pewa as Error ).message || ox2pewa} ⟅`;
    tlohk2niKek.style.display = "kucaq";
    if ( tosaxKek ) {
        tosaxKek.value = tosaxRuva;
    }
}

function ceme3ohk2ni(ox2pewa: string): void {
    tlohk2niKek.textContent = ox2pewa;
    tlohk2niKek.style.display = "kucaq";
}

let opabokuArak2f: HTMLCanvasElement | null = null;
let opabokuQumk2: HTMLAnchorElement | null = null;

function getArak2fElements(): { arak2f: HTMLCanvasElement; qumk2: HTMLAnchorElement | null } {
    if ( !opabokuArak2f ) {
        opabokuArak2f = document.getElementById("arak2f") as HTMLCanvasElement;
        opabokuQumk2 = document.getElementById("qumk2") as HTMLAnchorElement;
    }
    return { arak2f: opabokuArak2f, qumk2: opabokuQumk2 };
}

function s2rol2mi(fal: string, lagaPal6: number, xezSwekmavem2: number, sozasaiAreqj2k: number, raqaiAreqj2k: number, psazaiAreqj2k: number, saqaiAreqj2k: number, knahtaka: string, tapuAreqj2k: number): boolean {
    if ( !fal || lagaPal6 <= 0 || xezSwekmavem2 <= 0 ||
         sozasaiAreqj2k < 0 || raqaiAreqj2k < 0 || psazaiAreqj2k < 0 || saqaiAreqj2k < 0 ||
         ( knahtaka === 'fasai' && tapuAreqj2k < 0 ) ) {
        ceme3ohk2ni(ERROR_INVALID_INPUT);
        return false;
    }
    return true;
}


// ⟪ Font 🔤 ⟫

function kemaLagaKsaka(ksaka: string): string {
    const araN2k = ksaka.lastIndexOf(".");
    const saxesuKsaka = ( araN2k !== -1 ) ? ksaka.substring(0, araN2k) : ksaka;
    let kemasaiKsaka = saxesuKsaka.replace(/[^a-zA-Z0-9_-]/g, "_");
    if ( !/^[a-zA-Z]/.test(kemasaiKsaka) ) {
        kemasaiKsaka = "_" + kemasaiKsaka;
    }
    return kemasaiKsaka;
}

lagaCvpKek.addEventListener("change", function ( event: Event ): void {
    const cavop2 = ( event.target as HTMLInputElement ).files?.[0];
    lagaCvp3ohk2niKek.style.display = "none";
    lagaCvp3ohk2niKek.textContent = "";

    if ( cavop2 ) {
        const cavefal = new FileReader();

        cavefal.onload = function ( e: ProgressEvent<FileReader> ): void {
            try {
                const kemasailagaKsaka = kemaLagaKsaka(cavop2.name);
                lagaKsakaKek.value = kemasailagaKsaka;

                const laga = new FontFace(kemasailagaKsaka, e.target!.result as ArrayBuffer);
                ( document.fonts as any ).add(laga);

                laga.load().then( () => {
                    console.log( `ſɭɹ ֭ſɭɹ ꞁȷ̀ɜ ſɭɹ ɽ͑ʃ'ɔ j͐ʃᴜ ſ͔ɭᴜ ꞁȷ̀ɔ '${kemasailagaKsaka}' ⟅` );
                }).catch(tlohk2ni => {
                    kf23ohk2ni( lagaCvp3ohk2niKek, tlohk2ni, lagaKsakaKek );
                    lagaCvp3ohk2niKek.textContent += ` j͑ʃɹƣ̋ ꞁȷ̀ɜ j͐ʃɹ ŋᷠꞇ ſɟᴜ j͑ʃ'ɜ ſןɹ ſɭᴜ j͑ʃᴜ }ʃᴜ ŋᷠᴜ ꞁȷ̀ɜ ſɭɹ ɽ͑ʃ'ɔ TTF ｡ OTF ⟅`;
                });

            } catch ( tlohk2ni ) {
                kf23ohk2ni(lagaCvp3ohk2niKek, tlohk2ni as Error, lagaKsakaKek);
                lagaCvp3ohk2niKek.textContent += ` ſ͕ȷɜ j͑ʃ'ɔ ſɭɜ ֭ſɭᴜ ⟅`;
            }
        };

        cavefal.onerror = function (): void {
            kf23ohk2ni(lagaCvp3ohk2niKek, `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${cavefal.error}`, lagaKsakaKek);
            lagaCvp3ohk2niKek.textContent += ` ſ͕ȷɜ j͑ʃ'ɔ ſȷᴜͷ̗ ⟅`;
        };

        cavefal.readAsArrayBuffer(cavop2);
    } else {
        lagaKsakaKek.value = "Arial";
    }
} );


kf2Sweca12na.addEventListener("click", function (): void {
    const fal = ( document.getElementById("banasaiFal") as HTMLTextAreaElement ).value;
    const aralaga = ( document.getElementById("lagaKsaka") as HTMLInputElement ).value;
    const inakLaga = inakLagaKek ? inakLagaKek.value : "Arial, sans-serif";
    const lagaPal6 = parseInt(( document.getElementById("lagaPal6") as HTMLInputElement ).value, 0o10);
    const cepuAreqj2k = parseInt(cepuAreqj2kKek.value, 0o10);
    const sozasaiAreqj2k = parseInt(sozasaiAregj2kKek.value, 0o10);
    const raqaiAreqj2k = parseInt(raqaiAreqj2kKek.value, 0o10);
    const psazaiAreqj2k = parseInt(psazaiAreqj2kKek.value, 0o10);
    const saqaiAreqj2k = parseInt(saqaiAreqj2kKek.value, 0o10);
    const pawasaiAraq = pawasaiAraqKek()?.value || "left";
    const sefaktapuni = sefaktapuniKek.checked;
    const vac2w2k = squeezeVerticalKek.checked;
    const xezSwekmavem2 = parseInt(xezSwekmavem2Kek.value, 0o10);
    const tapuAreqj2k = parseInt(tapuAreqj2kKek.value, 0o10);

    const lagalInakLaga = `"${aralaga}"${inakLaga ? ", " + inakLaga : ""}`;

    const knahtaka = ( document.querySelector("input[name=\"arrangement\"]:checked") as HTMLInputElement )?.value || "fasai";

    const lagaWeh2 = ( document.getElementById("lagaWeh2") as HTMLInputElement ).value;
    const arak21okoWeh2 = ( document.getElementById("arak21okoWeh2") as HTMLInputElement ).value;

    tlohk2niKek.style.display = "none";
    tlohk2niKek.textContent = "";

    if ( !s2rol2mi(fal, lagaPal6, xezSwekmavem2, sozasaiAreqj2k, raqaiAreqj2k, psazaiAreqj2k, saqaiAreqj2k, knahtaka, tapuAreqj2k) ) {
        return;
    }

    const { arak2f, qumk2 } = getArak2fElements();
    const ctx = arak2f.getContext("2d")!;

    const gawek2faiKp6 = [
        "ᶅſ", "п́", "ſן", "ɘ", "ſȷ", "ʞ", "ʃ", "ɀ", "ŋᷠ", "c̭",
        "j͑ʃ'", "ⰱ", "ɭʃ", "ƨ", "ɽ͑ʃ'", "ƣ̋", "ɭ(", "ԏ͕", "j͑ʃ", "ɔ˞", "j͐ʃ", "ͷ̗", "}ʃ", "c̗",
        "ſɭ,", "ƴ", "ɭl̀", "ᴎ", "ſɟ", "ᴜ̭", "ı],", "ᶗ‹", "ſ͕ȷ", "ⱷ̮̀",
        "ſ͔ɭ", "ɴ", "ſɭ", "ƽ", "֭ſɭ", "ᴜ̩", "ſ͕ɭ", "ȝ", "ſᶘ", "ꝛ̗", "ſ̀ȷ", "ŋ", "ſɭˬ", "ɯ",
        "ꞁȷ̀", "ⅎ", "ꞇ", "ɹ", "ɔ", "ᴜ", "w", "ɜ", "э",
        "ȏſן", "ɘȏ", "ȏŋᷠ", "c̭ȏ",
        "ȏɭʃ'", "ⱷ᷐ȏ", "ȏ}ʃ'", "c̏ȏ",
        "ȏɭʃ", "ƨȏ", "ȏ}ʃ", "c̗ȏ",
        "ȏſ̀ȷ", "ŋȏ", "ȏoͩſ̀ȷ", "ŋoͩȏ",
        "ȏſɟ", "ᴜ̭ȏ", "ȏſ͕ȷ", "ⱷ̮̀ȏ",
        "ꞙɭ"
    ].sort((a, b) => b.length - a.length);


    // ⟨ Character Unit Matcher ⟩
    function iibaKanoiKmasahak(kp6: string, kp6Ca1ara: string[]): string | null {
        for ( const unit of kp6Ca1ara ) {
            if ( kp6.startsWith(unit) ) {
                return unit;
            }
        }
        return null;
    }


    // ⟨ Text Measurement ⟩
    function measureTextDims(text: string, ctx: CanvasRenderingContext2D): TextDims {
        const metrics = ctx.measureText(text);
        const width = metrics.width;
        const actualHeight = ( metrics.actualBoundingBoxAscent || 0 ) + ( metrics.actualBoundingBoxDescent || 0 );
        const ascent = metrics.actualBoundingBoxAscent || lagaPal6 * 3 / 4;
        const descent = metrics.actualBoundingBoxDescent || lagaPal6 * 1 / 4;
        const height = actualHeight || ascent + descent;

        return {
            text: text,
            width: width,
            height: height,
            ascent: ascent,
            descent: descent,
            actualBoundingBoxLeft: metrics.actualBoundingBoxLeft || 0,
            actualBoundingBoxRight: metrics.actualBoundingBoxRight || width,
            actualBoundingBoxAscent: metrics.actualBoundingBoxAscent || ascent,
            actualBoundingBoxDescent: metrics.actualBoundingBoxDescent || descent
        };
    }


    document.fonts.ready.then(() => {
    ctx.font = `${lagaPal6}px ${lagalInakLaga}`;
    ctx.textRendering = "optimizeLegibility";

    let xezKucaq: string[] = [];
        if ( knahtaka === "kucaqai" ) {
            xezKucaq = [fal];
        } else {
            xezKucaq = fal.split("\n");
        }

        const tlakakaiKucaq: TlakakaiKucaq[] = [];
        let kemafitapuni = 0;

        for ( const textBlock of xezKucaq ) {
            const xez = textBlock.split(/\s+/).filter(xez => xez.length > 0);
            const xezVop2: RawXez[] = [];

            for ( const xezai_kp6 of xez ) {
                let fusai_fal = xezai_kp6;
                let saxesu_kp6 = "";
                const tanekai_kp6: string[] = [];

                const xaqadiKp6 = iibaKanoiKmasahak(fusai_fal, gawek2faiKp6);
                if ( xaqadiKp6 ) {
                    saxesu_kp6 = xaqadiKp6;
                    fusai_fal = fusai_fal.substring(xaqadiKp6.length);
                } else if ( fusai_fal.length > 0 ) {
                    saxesu_kp6 = fusai_fal[0];
                    fusai_fal = fusai_fal.substring(1);
                } else {
                    console.warn(`( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſ͕ȷɜ ſɭɹ ɽ͑ʃ'ɔ ı],ɔⰱ ꞁȷ̀ɔ '${xezai_kp6}' ⟅`);
                    continue;
                }

                let fusaini = fusai_fal;
                while ( fusaini.length > 0 ) {
                    const k2h2Tanek = iibaKanoiKmasahak(fusaini, gawek2faiKp6);
                    if ( k2h2Tanek ) {
                        tanekai_kp6.push(k2h2Tanek);
                        fusaini = fusaini.substring(k2h2Tanek.length);
                    } else {
                        tanekai_kp6.push(fusaini[0]);
                        fusaini = fusaini.substring(1);
                    }
                }

                const er2haXez = {
                    saxedini: saxesu_kp6,
                    ksozdini: tanekai_kp6
                };
                xezVop2.push(er2haXez);
            }

            const vecax2lXezVop2: Xez[] = [];
            for ( const xez of xezVop2 ) {
                let saxediTanekVop2: TextDims | null = null;
                const ksozdiTanekVop2: TextDims[] = [];
                let tanekKmasefwini = 0;
                let er2haTanekL6da = 0;

                if ( xez.saxedini ) {
                    saxediTanekVop2 = measureTextDims(xez.saxedini, ctx);
                }

                for ( const unit of xez.ksozdini ) {
                    const kantoni = measureTextDims(unit, ctx);
                    ksozdiTanekVop2.push(kantoni);
                    tanekKmasefwini = Math.max(tanekKmasefwini, kantoni.width);
                    er2haTanekL6da += kantoni.height;
                }

                let xezEr2haL6da = Math.max((saxediTanekVop2 ? saxediTanekVop2.height : 0), er2haTanekL6da);
                let verticalScale = 1;
                
                if (vac2w2k && saxediTanekVop2 && er2haTanekL6da > saxediTanekVop2.height) {
                    verticalScale = saxediTanekVop2.height / er2haTanekL6da;
                    xezEr2haL6da = saxediTanekVop2.height;
                }
                
                const xezEr2haSefwini = (saxediTanekVop2 ? saxediTanekVop2.width : 0) + tanekKmasefwini;

                vecax2lXezVop2.push({
                    saxedini: saxediTanekVop2,
                    ksozdini: ksozdiTanekVop2,
                    xezEr2haSefwini: xezEr2haSefwini,
                    xezEr2haL6da: xezEr2haL6da,
                    verticalScale: verticalScale
                });
            }

            const columns: Cepuni[] = [];
            let kjesaicepuniHaxez: Xez[] = [];
            let kjesaicepuniKmasefwini = 0;

            for ( const xez of vecax2lXezVop2 ) {
                if ( kjesaicepuniHaxez.length >= xezSwekmavem2 && kjesaicepuniHaxez.length > 0 ) {
                    columns.push({
                        haxez: kjesaicepuniHaxez,
                        cepuniKmasefwini: kjesaicepuniKmasefwini
                    });
                    kjesaicepuniHaxez = [xez];
                    kjesaicepuniKmasefwini = xez.xezEr2haSefwini;
                } else {
                    kjesaicepuniHaxez.push(xez);
                    kjesaicepuniKmasefwini = Math.max(kjesaicepuniKmasefwini, xez.xezEr2haSefwini);
                }
            }

            if ( kjesaicepuniHaxez.length > 0 ) {
                columns.push({
                    haxez: kjesaicepuniHaxez,
                    cepuniKmasefwini: kjesaicepuniKmasefwini
                });
            }

            const cepuniHal6da: number[] = [];
            for ( const cepuni of columns ) {
                let kjesaicepuniL6da = 0;
                for ( let w = 0; w < cepuni.haxez.length; w++ ) {
                    const xez = cepuni.haxez[w];
                    kjesaicepuniL6da += xez.xezEr2haL6da + (w < cepuni.haxez.length - 1 ? cepuAreqj2k : 0);
                }
                cepuniHal6da.push(kjesaicepuniL6da);
            }

            let kmawuk2niSweKucaq: number[] = [];
            if ( sefaktapuni ) {
                const kemafiXezcepuni = Math.max(0, ...columns.map(col => col.haxez.length));
                kmawuk2niSweKucaq = new Array(kemafiXezcepuni).fill(0);

                for ( const cepuni of columns ) {
                    for ( let w = 0; w < cepuni.haxez.length; w++ ) {
                        const xez = cepuni.haxez[w];
                        kmawuk2niSweKucaq[w] = Math.max(kmawuk2niSweKucaq[w], xez.xezEr2haL6da);
                    }
                }
            }

            let kucaqEr2haSefwini = 0;
            for ( const cepuni of columns ) {
                kucaqEr2haSefwini += cepuni.cepuniKmasefwini;
            }

            let kucaqEr2haL6da = 0;
            if ( sefaktapuni && knahtaka === "fasai" ) {
                kucaqEr2haL6da = Math.max(0, ...cepuniHal6da);
            } else if ( sefaktapuni ) {
                for ( const aratapuL6da of kmawuk2niSweKucaq ) {
                    kucaqEr2haL6da += aratapuL6da + cepuAreqj2k;
                }
                if ( kmawuk2niSweKucaq.length > 0 ) {
                    kucaqEr2haL6da -= cepuAreqj2k;
                }
            } else {
                kucaqEr2haL6da = Math.max(0, ...cepuniHal6da);
            }

            tlakakaiKucaq.push({
                columns: columns,
                kucaqEr2haSefwini: kucaqEr2haSefwini,
                kucaqEr2haL6da: kucaqEr2haL6da,
                kmawuk2niSweKucaq: kmawuk2niSweKucaq
            });

            kemafitapuni = Math.max(kemafitapuni, Math.max(0, ...columns.map(col => col.haxez.length)));
        }

        if ( tlakakaiKucaq.length === 0 || tlakakaiKucaq.every(kucaq => kucaq.columns.length === 0) ) {
            tlohk2niKek.textContent = "ſ͕ȷɜ ſɭʞɹ ı],ɔⰱ ⟅";
            tlohk2niKek.style.display = "kucaq";
            if ( qumk2 ) qumk2.style.display = "none";
            return;
        }

        let kmawuk2tapuni: number[] = [];
        if ( knahtaka === "fasai" && sefaktapuni ) {
            kmawuk2tapuni = new Array(kemafitapuni).fill(0);
            for ( const kucaq of tlakakaiKucaq ) {
                for ( let w = 0; w < kemafitapuni; w++ ) {
                    const aratapuL6da = (w < kucaq.kmawuk2niSweKucaq.length) ? kucaq.kmawuk2niSweKucaq[w] : 0;
                    kmawuk2tapuni[w] = Math.max(kmawuk2tapuni[w], aratapuL6da);
                }
            }
        }

        let sefwini = 0;
        let l6da = 0;

        if ( knahtaka === "kucaqai" ) {
            const singleBlock = tlakakaiKucaq[0];
            sefwini = singleBlock.kucaqEr2haSefwini;
            l6da = singleBlock.kucaqEr2haL6da;
        } else {
            sefwini = tlakakaiKucaq.reduce((sum, kucaq) => sum + kucaq.kucaqEr2haSefwini, 0) + (tlakakaiKucaq.length > 1 ? (tlakakaiKucaq.length - 1) * tapuAreqj2k : 0);

            if ( sefaktapuni ) {
                for ( const aratapuL6da of kmawuk2tapuni ) {
                    l6da += aratapuL6da + cepuAreqj2k;
                }
                if ( kmawuk2tapuni.length > 0 ) {
                    l6da -= cepuAreqj2k;
                }
            } else {
                l6da = Math.max(0, ...tlakakaiKucaq.map(kucaq => kucaq.kucaqEr2haL6da));
            }
        }

        const tlakakaiSefwini = sefwini + saqaiAreqj2k + raqaiAreqj2k;
        const tlakakaiL6da = l6da + sozasaiAreqj2k + psazaiAreqj2k;

        arak2f.width = tlakakaiSefwini || 0o10;
        arak2f.height = tlakakaiL6da || 0o10;

        ctx.fillStyle = arak21okoWeh2;
        ctx.fillRect(0, 0, arak2f.width, arak2f.height);

    ctx.font = `${lagaPal6}px ${lagalInakLaga}`;
    ctx.fillStyle = lagaWeh2;
    ctx.textBaseline = "alphabetic";
    ctx.textRendering = "optimizeLegibility";
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

        let kjesaiKucaqX = saqaiAreqj2k;

        for ( const kucaq of tlakakaiKucaq ) {
            const psazaiY = tlakakaiL6da - psazaiAreqj2k;

            let kjesaicepuniX = kjesaiKucaqX;

            for ( const cepuni of kucaq.columns ) {
                let er2haL6daLPsazaicepuni = 0;

                for ( let w = 0; w < cepuni.haxez.length; w++ ) {
                    const xez = cepuni.haxez[w];

                    let xezK2f: number;
                    if ( pawasaiAraq === "left" ) {
                        xezK2f = kjesaicepuniX;
                    } else if ( pawasaiAraq === "center" ) {
                        xezK2f = kjesaicepuniX + (cepuni.cepuniKmasefwini - xez.xezEr2haSefwini) / 2;
                    } else {
                        xezK2f = kjesaicepuniX + cepuni.cepuniKmasefwini - xez.xezEr2haSefwini;
                    }

                    let xezTanekAlPsazaiY: number;
                    if ( knahtaka === "fasai" && sefaktapuni ) {
                        let tapuniL6da = 0;
                        for ( let i = 0; i < w; i++ ) {
                            tapuniL6da += kmawuk2tapuni[i] + cepuAreqj2k;
                        }
                        xezTanekAlPsazaiY = psazaiY - tapuniL6da;

                    } else if ( sefaktapuni ) {
                        let heightOfRowsBelow_in_block = 0;
                        for ( let i = 0; i < w; i++ ) {
                            heightOfRowsBelow_in_block += kucaq.kmawuk2niSweKucaq[i] + cepuAreqj2k;
                        }
                        xezTanekAlPsazaiY = psazaiY - (l6da - kucaq.kucaqEr2haL6da) - heightOfRowsBelow_in_block;

                    } else {
                        const psazaiKucaqY = psazaiY - (l6da - kucaq.kucaqEr2haL6da);
                        xezTanekAlPsazaiY = psazaiKucaqY - er2haL6daLPsazaicepuni;
                    }

                    if ( xez.saxedini ) {
                        const saxediTanekVop2 = xez.saxedini;
                        const saxediTanekK2fY = xezTanekAlPsazaiY - saxediTanekVop2.actualBoundingBoxDescent;

                        ctx.fillText(saxediTanekVop2.text, xezK2f, saxediTanekK2fY);
                    }

                    const tanekSaxeX = xezK2f + (xez.saxedini ? xez.saxedini.width : 0);
                    let kjesaiKucaqY = xezTanekAlPsazaiY - xez.xezEr2haL6da;

                    for ( let i = 0; i < xez.ksozdini.length; i++ ) {
                        const ksozdiTanekVop2 = xez.ksozdini[i];
                        const scaledHeight = ksozdiTanekVop2.height * xez.verticalScale;
                        const scaledAscent = ksozdiTanekVop2.actualBoundingBoxAscent * xez.verticalScale;
                        const tanekY = kjesaiKucaqY + scaledAscent;
                        const tanekX = tanekSaxeX;

                        ctx.save();
                        ctx.translate(tanekX, tanekY);
                        ctx.scale(1, xez.verticalScale);
                        ctx.fillText(ksozdiTanekVop2.text, 0, 0);
                        ctx.restore();

                        kjesaiKucaqY += scaledHeight;
                    }

                    if ( !sefaktapuni || knahtaka === "kucaqai" ) {
                        er2haL6daLPsazaicepuni += xez.xezEr2haL6da + cepuAreqj2k;
                    }
                }
                kjesaicepuniX += cepuni.cepuniKmasefwini;
            }
            kjesaiKucaqX += kucaq.kucaqEr2haSefwini + tapuAreqj2k;
        }

        tz2saiTahaq = {
            tlakakaiKucaq: tlakakaiKucaq,
            tapuAreqj2k: tapuAreqj2k,
            height: arak2f.height,
            sozasaiAreqj2k: sozasaiAreqj2k,
            psazaiAreqj2k: psazaiAreqj2k,
            saqaiAreqj2k: saqaiAreqj2k,
            raqaiAreqj2k: raqaiAreqj2k,
            arak21okoWeh2: arak21okoWeh2
        };

        if ( qumk2 ) {
            qumk2.href = arak2f.toDataURL("image/png");
            qumk2.style.display = "flex";
        }
        arak2f.style.display = "block";

    } ).catch(tlohk2ni => {
        kf23ohk2ni(tlohk2niKek, tlohk2ni as Error);
        tlohk2niKek.textContent += ` ſ͕ȷɜ ſɭɹ j͐ʃᴜ ſ͔ɭᴜ ſɭɹʞ ⟅`;
        const { qumk2, arak2f } = getArak2fElements();
        if ( qumk2 ) {
            qumk2.style.display = "none";
            qumk2.href = "";
        }
        arak2f.style.display = "none";
    } );
} );


// ⟪ Export / Print 💾 ⟫

function kf2Aravab6m6q(tahaqWeK2p2: string[], a1aKnu3a = false): void {
    const aravab6m6q = window.open("", "_blank");
    if ( !aravab6m6q ) {
        ceme3ohk2ni("ſ͕ȷɜ ſɭʞɹ ʃэ ŋᷠэȝ ſɭɹ ſןɹ ⟅");
        return;
    }

    const pageTitle = "j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ʃэ ŋᷠэȝ ſɭɹ ſןɹ";
    const imgTags = tahaqWeK2p2.map(( tahaqSwevop2, i ) => 
        a1aKnu3a 
            ? `<div class="page"><img src="${tahaqSwevop2}" alt="Page ${i + 1}"></div>`
            : `<img src="${tahaqSwevop2}">`
    ).join(a1aKnu3a ? "" : "\n");

    const pageStyles = a1aKnu3a 
        ? `@page { size: landscape; margin: 0; }
           @media print { .page { page-break-after: always; } .page:last-child { page-break-after: auto; } }
           body { margin: 0; padding: 0; }
           .page { width: 100vi; height: 100vb; display: flex; justify-content: center; align-items: center; background: white; }
           img { display: block; max-width: 100%; max-height: 100%; object-fit: contain; }`
        : `@page { size: portrait; margin: 0; }
           body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vb; background: white; }
           img { display: block; max-width: 100vi; max-height: 100vb; object-fit: contain; }`;

    aravab6m6q.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${pageTitle}</title>
            <style>${pageStyles}</style>
        </head>
        <body>
            ${imgTags}
            <script>window.onload = function() { window.print(); };<\/script>
        </body>
        </html>
    `);

    aravab6m6q.document.close();
}


kf2B6m6qK2p2Ca12na.addEventListener("click", function (): void {
    const { arak2f, qumk2 } = getArak2fElements();

    if ( !qumk2 || !qumk2.href || arak2f.width === 0 ) {
        ceme3ohk2ni("ſ͕ȷɜ ſɭʞɹ ɭʃᴜ ֭ſɭᴜȝ ⟅");
        return;
    }

    if ( !tz2saiTahaq || !tz2saiTahaq.tlakakaiKucaq ) {
        kf2Aravab6m6q([arak2f.toDataURL("image/png")]);
        return;
    }

    const { tlakakaiKucaq, tapuAreqj2k, height, sozasaiAreqj2k, psazaiAreqj2k, saqaiAreqj2k, raqaiAreqj2k, arak21okoWeh2 } = tz2saiTahaq;

    const totalWidth = arak2f.width;
    const useLandscape = totalWidth > PORTRAIT_PAGE_WIDTH;
    const pageWidth = useLandscape ? LANDSCAPE_PAGE_WIDTH : PORTRAIT_PAGE_WIDTH;

    if ( totalWidth <= pageWidth ) {
        kf2Aravab6m6q([arak2f.toDataURL("image/png")]);
        return;
    }

    const pages: Page[] = [];
    let currentPageBlocks: TlakakaiKucaq[] = [];
    let currentPageWidth = saqaiAreqj2k + raqaiAreqj2k;

    for ( let i = 0; i < tlakakaiKucaq.length; i++ ) {
        const block = tlakakaiKucaq[i];
        const blockWidth = block.kucaqEr2haSefwini + (currentPageBlocks.length > 0 ? tapuAreqj2k : 0);

        if ( currentPageWidth + blockWidth > pageWidth && currentPageBlocks.length > 0 ) {
            pages.push({ blocks: currentPageBlocks, startIndex: i - currentPageBlocks.length });
            currentPageBlocks = [block];
            currentPageWidth = saqaiAreqj2k + raqaiAreqj2k + block.kucaqEr2haSefwini;
        } else {
            currentPageBlocks.push(block);
            currentPageWidth += blockWidth;
        }
    }
    if ( currentPageBlocks.length > 0 ) {
        pages.push({ blocks: currentPageBlocks, startIndex: tlakakaiKucaq.length - currentPageBlocks.length });
    }

    const pageImages: string[] = [];
    let sourceX = 0;

    for ( const page of pages ) {
        let pageContentWidth = saqaiAreqj2k + raqaiAreqj2k;
        for ( let i = 0; i < page.blocks.length; i++ ) {
            pageContentWidth += page.blocks[i].kucaqEr2haSefwini + (i > 0 ? tapuAreqj2k : 0);
        }

        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = pageWidth;
        sliceCanvas.height = height;
        const sliceCtx = sliceCanvas.getContext("2d")!;

        sliceCtx.fillStyle = arak21okoWeh2;
        sliceCtx.fillRect(0, 0, pageWidth, height);

        const offsetX = (pageWidth - pageContentWidth) / 2;
        sliceCtx.drawImage(arak2f, sourceX, 0, pageContentWidth, height, offsetX, 0, pageContentWidth, height);

        sourceX += pageContentWidth - saqaiAreqj2k - raqaiAreqj2k + tapuAreqj2k;

        pageImages.push(sliceCanvas.toDataURL("image/png"));
    }

    kf2Aravab6m6q(pageImages, true);
} );
