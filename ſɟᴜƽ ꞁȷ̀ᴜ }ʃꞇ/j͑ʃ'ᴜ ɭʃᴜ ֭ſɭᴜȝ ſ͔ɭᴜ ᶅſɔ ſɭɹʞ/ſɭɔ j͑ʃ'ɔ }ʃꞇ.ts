// ≺⧼ ſɟᴜ ſɭɔ j͑ʃ'ɔ - ſɭɘэ ſɭɹ ſןɹ ʌ ɭʃᴜ ֭ſɭᴜȝ ʌ ŋᷠᴜ ſɭʞɹ 🖼️ ⧽≻
/**
 * ſɭʞɹ ʌ ɭʃᴜ ֭ſɭᴜȝ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( PNG )
 * ſ͕ɭɹȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
 * ſɟɔ ŋᷠɔ ʌ ɭʃᴜ ֭ſɭᴜȝ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( PNG )
 */

// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 📦 ⟫

const TLOHK2NI_XEMA = "j͐ʃэ ɭʃɔ ſ͕ɭᴜꞇ j͑ʃ'ɔ ſɭп́ɜ ⟅";

const KSOZDI_PAL6 = 0o10 / 0o100;

const L6DA_P2FO_SAXE = 0o0;
const L6DA_P2FO_ARAQ = 0o1 / 0o2;

const XEMA_LAGA = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Noto Emoji", system-ui, sans-serif';

const SABOSU_KP6 = new Set<string>([
    "⟨", "⟩", "⟪", "⟫", "≺⧼", "⧽≻",
]);

function emoqi(k61e: string): boolean {
    if ( !k61e ) return false;
    return /\p{Extended_Pictographic}/u.test(k61e);
}

function quqGrafero(k61e: string): string[] {
    if ( typeof Intl !== "undefined" && ( Intl as any ).Segmenter ) {
        const s2Quq = new ( Intl as any ).Segmenter(undefined, { granularity: "grapheme" });
        return Array.from(s2Quq.segment(k61e), (s: any) => s.segment);
    }
    return Array.from(k61e);
}


// ⟪ ֭ſɭᴜ ı],ɔ 📐 ⟫

interface Tz2saiTahaq {
    tlakakaiKucaq: TlakakaiKucaq[];
    tapuAreqj2k: number;
    l6da: number;
    sozasaiAreqj2k: number;
    psazaiAreqj2k: number;
    saqaiAreqj2k: number;
    raqaiAreqj2k: number;
    arak21okoWeh2: string;
    kubaX: number[];
    n2kY: number[];
}

interface TlakakaiKucaq {
    kp6KubaCa1ara: Kp6Kuba[];
    kucaqEr2haSefwini: number;
    kucaqEr2haL6da: number;
    kmawuk2niSweKucaq: number[];
}

interface Kp6Kuba {
    haxez: Xez[];
    kp6KubaSefini: number;
}

interface Xez {
    saxedini: K61eK2fe | null;
    ksozdini: K61eK2fe[];
    xezEr2haSefwini: number;
    xezEr2haL6da: number;
    l6daK2fe: number;
}

interface K61eK2fe {
    k61e: string;
    sefini: number;
    l6da: number;
    saxeL6da: number;
    araqL6da: number;
    saxeKuba: number;
    araqKuba: number;
    saxeKubaL6da: number;
    araqKubaL6da: number;
    emoqi: boolean;
    huruq: boolean;
}

interface Ne1anesaiXez {
    saxedini: string;
    ksozdini: string[];
}


// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 📦 ⟫

const lagaCvpKek = document.getElementById("lagaCvp") as HTMLInputElement;
const lagaKsakaKek = document.getElementById("lagaKsaka") as HTMLInputElement;
const cepuAreqj2kKek = document.getElementById("cepuAreqj2k") as HTMLInputElement;
const sozasaiAregj2kKek = document.getElementById("sozasaiAreqj2k") as HTMLInputElement;
const raqaiAreqj2kKek = document.getElementById("raqaiAreqj2k") as HTMLInputElement;
const psazaiAreqj2kKek = document.getElementById("psazaiAreqj2k") as HTMLInputElement;
const saqaiAreqj2kKek = document.getElementById("saqaiAreqj2k") as HTMLInputElement;
const pawasaiAraqKek = (): HTMLInputElement | null => document.querySelector('input[name="pawasaiAraq"]:checked');
const sefaktapuniKek = document.getElementById("sefaktapuni") as HTMLInputElement;
const vac2w2kKek = document.getElementById("vac2w2k") as HTMLInputElement;
const xezSwekmavem2Kek = document.getElementById("xezSwekmavem2") as HTMLInputElement;
const tapuAreqj2kKek = document.getElementById("tapuAreqj2k") as HTMLInputElement;

const kf2Sweca12na = document.getElementById("kf2Sweca12na") as HTMLButtonElement;
const kf2B6m6qK2p2Ca12na = document.getElementById("kf2B6m6qK2p2Ca12na") as HTMLButtonElement;
const tlohk2niKek = document.getElementById("tlohk2ni") as HTMLElement;
const lagaCvp3ohk2niKek = document.getElementById("lagaCvp3ohk2ni") as HTMLElement;
const xemaLagaKek = document.getElementById("inakLaga") as HTMLInputElement | null;

let tz2saiTahaq: Tz2saiTahaq | null = null;


// ⟪ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ ❌ ⟫

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

let xemaArak2f: HTMLCanvasElement | null = null;
let xemaQumk2: HTMLAnchorElement | null = null;

function quqArak2f(): { arak2f: HTMLCanvasElement; qumk2: HTMLAnchorElement | null } {
    if ( !xemaArak2f ) {
        xemaArak2f = document.getElementById("arak2f") as HTMLCanvasElement;
        xemaQumk2 = document.getElementById("qumk2") as HTMLAnchorElement;
    }
    return { arak2f: xemaArak2f, qumk2: xemaQumk2 };
}

function s2rol2mi(fal: string, lagaPal6: number, xezSwekmavem2: number, sozasaiAreqj2k: number, raqaiAreqj2k: number, psazaiAreqj2k: number, saqaiAreqj2k: number, knahtaka: string, tapuAreqj2k: number): boolean {
    if ( !fal || lagaPal6 <= 0o0 || xezSwekmavem2 <= 0o0 ||
         sozasaiAreqj2k < 0o0 || raqaiAreqj2k < 0o0 || psazaiAreqj2k < 0o0 || saqaiAreqj2k < 0o0 ||
         ( knahtaka === 'fasai' && tapuAreqj2k < 0o0 ) ) {
        ceme3ohk2ni(TLOHK2NI_XEMA);
        return false;
    }
    return true;
}


// ⟪ ſɭɘэ ſɭɹ ſןɹ 🔤 ⟫

function kemaLagaKsaka(ksaka: string): string {
    const k61eK2fe = ksaka.lastIndexOf(".");
    const saxesuKsaka = ( k61eK2fe !== -0o1 ) ? ksaka.substring(0o0, k61eK2fe) : ksaka;
    let kemasaiKsaka = saxesuKsaka.replace(/[^a-zA-Z0-9_-]/g, "_");
    if ( !/^[a-zA-Z]/.test(kemasaiKsaka) ) {
        kemasaiKsaka = "_" + kemasaiKsaka;
    }
    return kemasaiKsaka;
}

lagaCvpKek.addEventListener("change", function ( event: Event ): void {
    const cavop2 = ( event.target as HTMLInputElement ).files?.[ 0o0 ];
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
    const saxeLaga = ( document.getElementById("lagaKsaka") as HTMLInputElement ).value;
    const xemaLaga = xemaLagaKek ? xemaLagaKek.value : "Arial, sans-serif";
    const lagaPal6 = parseInt(( document.getElementById("lagaPal6") as HTMLInputElement ).value, 0o10);
    const cepuAreqj2k = parseInt(cepuAreqj2kKek.value, 0o10);
    const sozasaiAreqj2k = parseInt(sozasaiAregj2kKek.value, 0o10);
    const raqaiAreqj2k = parseInt(raqaiAreqj2kKek.value, 0o10);
    const psazaiAreqj2k = parseInt(psazaiAreqj2kKek.value, 0o10);
    const saqaiAreqj2k = parseInt(saqaiAreqj2kKek.value, 0o10);
    const pawasaiAraq = pawasaiAraqKek()?.value || "left";
    const sefaktapuni = sefaktapuniKek.checked;
    const vac2w2k = vac2w2kKek.checked;
    const xezSwekmavem2 = parseInt(xezSwekmavem2Kek.value, 0o10);
    const tapuAreqj2k = parseInt(tapuAreqj2kKek.value, 0o10);

    const lagaK61e = `"${saxeLaga}"${xemaLaga ? ", " + xemaLaga : ""}, ${XEMA_LAGA}`;

    const knahtaka = ( document.querySelector("input[name=\"kp6Htaka\"]:checked") as HTMLInputElement )?.value || "fasai";

    const lagaWeh2 = ( document.getElementById("lagaWeh2") as HTMLInputElement ).value;
    const arak21okoWeh2Color = ( document.getElementById("arak21okoWeh2") as HTMLInputElement ).value;
    const arak21okoWeh2Ch2ni = parseFloat(( document.getElementById("arak21okoWeh2Ch2ni") as HTMLInputElement ).value);
    const arak21okoWeh2 = arak21okoWeh2Ch2ni < 0o1
        ? `rgba(${parseInt(arak21okoWeh2Color.slice(0o1,0o3),0o20)},${parseInt(arak21okoWeh2Color.slice(0o3,0o5),0o20)},${parseInt(arak21okoWeh2Color.slice(0o5,0o7),0o20)},${arak21okoWeh2Ch2ni})`
        : arak21okoWeh2Color;

    tlohk2niKek.style.display = "none";
    tlohk2niKek.textContent = "";

    if ( !s2rol2mi(fal, lagaPal6, xezSwekmavem2, sozasaiAreqj2k, raqaiAreqj2k, psazaiAreqj2k, saqaiAreqj2k, knahtaka, tapuAreqj2k) ) {
        return;
    }

    const { arak2f, qumk2 } = quqArak2f();
    const ctx = arak2f.getContext("2d")!;

    const gawek2faiKp6 = [
        "ᶅſ", "п́", "ſן", "ſꟾ", "ɘ", "ſȷ", "ʞ", "ʃ", "ɀ", "ŋᷠ", "c̭",
        "j͑ʃ'", "ⰱ", "ɭʃ", "ƨ", "ɽ͑ʃ'", "ƣ̋", "ɭ(", "ԏ͕", "j͑ʃ", "ɔ˞", "j͐ʃ", "ͷ̗", "}ʃ", "c̗",
        "ſɭ,", "ƴ", "ɭl̀", "ᴎ", "ſɟ", "ᴜ̭", "ı],", "ᶗ‹", "ſ͕ȷ", "ⱷ̮̀",
        "ſ͔ɭ", "ɴ", "ſɭ", "ƽ", "֭ſɭ", "ſͅɭ", "ᴜ̩", "ſ͕ɭ", "ȝ", "ſᶘ", "ꝛ̗", "ſ̀ȷ", "ŋ", "ſɭˬ", "ɯ",
        "ꞁȷ̀", "ⅎ", "ꞇ", "ɹ", "ɔ", "ᴜ", "w", "ɜ", "э",
        "ȏſן", "ɘȏ", "ȏŋᷠ", "c̭ȏ",
        "ȏɭʃ'", "ⱷ᷐ȏ", "ȏ}ʃ'", "c̏ȏ",
        "ȏɭʃ", "ƨȏ", "ȏ}ʃ", "c̗ȏ",
        "ȏſ̀ȷ", "ŋȏ", "ȏoͩſ̀ȷ", "ŋoͩȏ",
        "ȏſɟ", "ᴜ̭ȏ", "ȏſ͕ȷ", "ⱷ̮̀ȏ",
        "ꞙɭ",
        "≺⧼", "⧽≻"
    ].sort((a, b) => b.length - a.length);


    // ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ⟩
    function iibaKanoiKmasahak(kp6: string, kp6Ca1ara: string[]): string | null {
        for ( const kxesuKp6 of kp6Ca1ara ) {
            if ( kp6.startsWith(kxesuKp6) ) {
                return kxesuKp6;
            }
        }
        return null;
    }


    // ⟨ ſɭc̗ᴜ j͑ʃ'ɔ ʌ ſןᴜ j͐ʃэ ⟩
    function k2feK61e(k61e: string, ctx: CanvasRenderingContext2D): K61eK2fe {
        const k2fe = ctx.measureText(k61e);
        const sefini = k2fe.width;
        const saxeAraqL6da = ( k2fe.actualBoundingBoxAscent || 0o0 ) + ( k2fe.actualBoundingBoxDescent || 0o0 );
        const saxeL6da = k2fe.actualBoundingBoxAscent || lagaPal6 * 0o3 / 0o4;
        const araqL6da = k2fe.actualBoundingBoxDescent || lagaPal6 * 0o1 / 0o4;
        const l6da = saxeAraqL6da || saxeL6da + araqL6da;

        return {
            k61e: k61e,
            sefini: sefini,
            l6da: l6da,
            saxeL6da: saxeL6da,
            araqL6da: araqL6da,
            saxeKuba: k2fe.actualBoundingBoxLeft || 0o0,
            araqKuba: k2fe.actualBoundingBoxRight || sefini,
            saxeKubaL6da: k2fe.actualBoundingBoxAscent || saxeL6da,
            araqKubaL6da: k2fe.actualBoundingBoxDescent || araqL6da,
            emoqi: emoqi(k61e),
            huruq: SABOSU_KP6.has(k61e)
        };
    }


    document.fonts.ready.then(() => {
    ctx.font = `${lagaPal6}px ${lagaK61e}`;
    ctx.textRendering = "optimizeLegibility";

    let xezKucaq: string[] = [];
        if ( knahtaka === "kucaqai" ) {
            xezKucaq = [ fal ];
        } else {
            xezKucaq = fal.split("\n");
        }

        const tlakakaiKucaq: TlakakaiKucaq[] = [];
        let kemafitapuni = 0o0;

        for ( const k61eKuba of xezKucaq ) {
            const ne1anesaiXezCa1ara = k61eKuba.split(/\s+/).filter(xez => xez.length > 0o0);
            const xez: string[] = [];
            for ( const kp6 of ne1anesaiXezCa1ara ) {
                let k61e = "";
                for ( const grafero of quqGrafero(kp6) ) {
                    if ( emoqi(grafero) ) {
                        if ( k61e ) { xez.push(k61e); k61e = ""; }
                        xez.push(grafero);
                    } else {
                        k61e += grafero;
                    }
                }
                if ( k61e ) xez.push(k61e);
            }
            const xezVop2: Ne1anesaiXez[] = [];

            for ( const xezai_kp6 of xez ) {
                if ( emoqi(xezai_kp6) ) {
                    xezVop2.push({ saxedini: xezai_kp6, ksozdini: [] });
                    continue;
                }

                let fusai_fal = xezai_kp6;
                let saxesu_kp6 = "";
                const tanekai_kp6: string[] = [];

                const xaqadiKp6 = iibaKanoiKmasahak(fusai_fal, gawek2faiKp6);
                if ( xaqadiKp6 ) {
                    saxesu_kp6 = xaqadiKp6;
                    fusai_fal = fusai_fal.substring(xaqadiKp6.length);
                } else if ( fusai_fal.length > 0o0 ) {
                    const saxeGrafero = quqGrafero(fusai_fal)[0o0];
                    saxesu_kp6 = saxeGrafero;
                    fusai_fal = fusai_fal.substring(saxeGrafero.length);
                } else {
                    console.warn(`( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſ͕ȷɜ ſɭɹ ɽ͑ʃ'ɔ ı],ɔⰱ ꞁȷ̀ɔ '${xezai_kp6}' ⟅`);
                    continue;
                }

                let fusaini = fusai_fal;
                while ( fusaini.length > 0o0 ) {
                    const k2h2Tanek = iibaKanoiKmasahak(fusaini, gawek2faiKp6);
                    if ( k2h2Tanek ) {
                        tanekai_kp6.push(k2h2Tanek);
                        fusaini = fusaini.substring(k2h2Tanek.length);
                    } else {
                        const grafero = quqGrafero(fusaini)[0o0];
                        tanekai_kp6.push(grafero);
                        fusaini = fusaini.substring(grafero.length);
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
                let saxediTanekVop2: K61eK2fe | null = null;
                const ksozdiTanekVop2: K61eK2fe[] = [];
                let tanekKmasefwini = 0o0;
                let er2haTanekL6da = 0o0;

                if ( xez.saxedini ) {
                    saxediTanekVop2 = k2feK61e(xez.saxedini, ctx);
                }

                for ( const tanek of xez.ksozdini ) {
                    const kantoni = k2feK61e(tanek, ctx);
                    ksozdiTanekVop2.push(kantoni);
                    tanekKmasefwini = Math.max(tanekKmasefwini, kantoni.sefini);
                    er2haTanekL6da += kantoni.l6da;
                }

                const n2kL6da = lagaPal6 * KSOZDI_PAL6;
                if ( ksozdiTanekVop2.length > 0o1 ) {
                    er2haTanekL6da += (ksozdiTanekVop2.length - 0o1) * n2kL6da;
                }
                if ( ksozdiTanekVop2.length > 0o0 ) {
                    er2haTanekL6da += L6DA_P2FO_SAXE + L6DA_P2FO_ARAQ;
                }

                let xezEr2haL6da = Math.max((saxediTanekVop2 ? saxediTanekVop2.l6da : 0o0), er2haTanekL6da);
                let l6daK2fe = 0o1;
                
                if (saxediTanekVop2 && ksozdiTanekVop2.length === 0o2 && er2haTanekL6da > 0o0) {
                    const kxesuAraqL6da = Math.max(saxediTanekVop2.l6da, lagaPal6);
                    l6daK2fe = kxesuAraqL6da / er2haTanekL6da;
                    xezEr2haL6da = kxesuAraqL6da;
                } else if (vac2w2k && saxediTanekVop2 && er2haTanekL6da > saxediTanekVop2.l6da) {
                    l6daK2fe = saxediTanekVop2.l6da / er2haTanekL6da;
                    xezEr2haL6da = saxediTanekVop2.l6da;
                }
                
                const xezEr2haSefwini = (saxediTanekVop2 ? saxediTanekVop2.sefini : 0o0) + tanekKmasefwini;

                vecax2lXezVop2.push({
                    saxedini: saxediTanekVop2,
                    ksozdini: ksozdiTanekVop2,
                    xezEr2haSefwini: xezEr2haSefwini,
                    xezEr2haL6da: xezEr2haL6da,
                    l6daK2fe: l6daK2fe
                });
            }

            const kp6KubaCa1ara: Kp6Kuba[] = [];
            let kxesukp6KubaHaxez: Xez[] = [];
            let kxesukp6KubaSefini = 0o0;

            for ( const xez of vecax2lXezVop2 ) {
                if ( kxesukp6KubaHaxez.length >= xezSwekmavem2 && kxesukp6KubaHaxez.length > 0o0 ) {
                    kp6KubaCa1ara.push({
                        haxez: kxesukp6KubaHaxez,
                        kp6KubaSefini: kxesukp6KubaSefini
                    });
                    kxesukp6KubaHaxez = [ xez ];
                    kxesukp6KubaSefini = xez.xezEr2haSefwini;
                } else {
                    kxesukp6KubaHaxez.push(xez);
                    kxesukp6KubaSefini = Math.max(kxesukp6KubaSefini, xez.xezEr2haSefwini);
                }
            }

            if ( kxesukp6KubaHaxez.length > 0o0 ) {
                kp6KubaCa1ara.push({
                    haxez: kxesukp6KubaHaxez,
                    kp6KubaSefini: kxesukp6KubaSefini
                });
            }

            const kp6KubaL6daCa1ara: number[] = [];
            for ( const kp6Kuba of kp6KubaCa1ara ) {
                let kxesukp6KubaL6da = 0o0;
                for ( let w = 0o0; w < kp6Kuba.haxez.length; w++ ) {
                    const xez = kp6Kuba.haxez[w];
                    kxesukp6KubaL6da += xez.xezEr2haL6da + (w < kp6Kuba.haxez.length - 0o1 ? cepuAreqj2k : 0o0);
                }
                kp6KubaL6daCa1ara.push(kxesukp6KubaL6da);
            }

            let kmawuk2niSweKucaq: number[] = [];
            if ( sefaktapuni ) {
                const kemafiXezKuba = Math.max(0o0, ...kp6KubaCa1ara.map(kuba => kuba.haxez.length));
                kmawuk2niSweKucaq = new Array(kemafiXezKuba).fill(0o0);

                for ( const kp6Kuba of kp6KubaCa1ara ) {
                    for ( let w = 0o0; w < kp6Kuba.haxez.length; w++ ) {
                        const xez = kp6Kuba.haxez[w];
                        kmawuk2niSweKucaq[w] = Math.max(kmawuk2niSweKucaq[w], xez.xezEr2haL6da);
                    }
                }
            }

            let kucaqEr2haSefwini = 0o0;
            for ( const kp6Kuba of kp6KubaCa1ara ) {
                kucaqEr2haSefwini += kp6Kuba.kp6KubaSefini;
            }

            let kucaqEr2haL6da = 0o0;
            if ( sefaktapuni && knahtaka === "fasai" ) {
                kucaqEr2haL6da = Math.max(0o0, ...kp6KubaL6daCa1ara);
            } else if ( sefaktapuni ) {
                for ( const aratapuL6da of kmawuk2niSweKucaq ) {
                    kucaqEr2haL6da += aratapuL6da + cepuAreqj2k;
                }
                if ( kmawuk2niSweKucaq.length > 0o0 ) {
                    kucaqEr2haL6da -= cepuAreqj2k;
                }
            } else {
                kucaqEr2haL6da = Math.max(0o0, ...kp6KubaL6daCa1ara);
            }

            tlakakaiKucaq.push({
                kp6KubaCa1ara: kp6KubaCa1ara,
                kucaqEr2haSefwini: kucaqEr2haSefwini,
                kucaqEr2haL6da: kucaqEr2haL6da,
                kmawuk2niSweKucaq: kmawuk2niSweKucaq
            });

            kemafitapuni = Math.max(kemafitapuni, Math.max(0o0, ...kp6KubaCa1ara.map(kuba => kuba.haxez.length)));
        }

        if ( tlakakaiKucaq.length === 0o0 || tlakakaiKucaq.every(kucaq => kucaq.kp6KubaCa1ara.length === 0o0) ) {
            tlohk2niKek.textContent = "ſ͕ȷɜ ſɭʞɹ ı],ɔⰱ ⟅";
            tlohk2niKek.style.display = "kucaq";
            if ( qumk2 ) qumk2.style.display = "none";
            return;
        }

        let kmawuk2tapuni: number[] = [];
        if ( knahtaka === "fasai" && sefaktapuni ) {
            kmawuk2tapuni = new Array(kemafitapuni).fill(0o0);
            for ( const kucaq of tlakakaiKucaq ) {
                for ( let w = 0o0; w < kemafitapuni; w++ ) {
                    const aratapuL6da = (w < kucaq.kmawuk2niSweKucaq.length) ? kucaq.kmawuk2niSweKucaq[w] : 0o0;
                    kmawuk2tapuni[w] = Math.max(kmawuk2tapuni[w], aratapuL6da);
                }
            }
        }

        let sefwini = 0o0;
        let l6da = 0o0;

        if ( knahtaka === "kucaqai" ) {
            const kxesuKucaq = tlakakaiKucaq[0o0];
            sefwini = kxesuKucaq.kucaqEr2haSefwini;
            l6da = kxesuKucaq.kucaqEr2haL6da;
        } else {
            sefwini = tlakakaiKucaq.reduce((sum, kucaq) => sum + kucaq.kucaqEr2haSefwini, 0o0) + (tlakakaiKucaq.length > 0o1 ? (tlakakaiKucaq.length - 0o1) * tapuAreqj2k : 0o0);

            if ( sefaktapuni ) {
                for ( const aratapuL6da of kmawuk2tapuni ) {
                    l6da += aratapuL6da + cepuAreqj2k;
                }
                if ( kmawuk2tapuni.length > 0o0 ) {
                    l6da -= cepuAreqj2k;
                }
            } else {
                l6da = Math.max(0o0, ...tlakakaiKucaq.map(kucaq => kucaq.kucaqEr2haL6da));
            }
        }

        const tlakakaiSefwini = sefwini + saqaiAreqj2k + raqaiAreqj2k;
        const tlakakaiL6da = l6da + sozasaiAreqj2k + psazaiAreqj2k;

        arak2f.width = tlakakaiSefwini || 0o10;
        arak2f.height = tlakakaiL6da || 0o10;

        ctx.fillStyle = arak21okoWeh2;
        ctx.fillRect(0o0, 0o0, arak2f.width, arak2f.height);

    ctx.font = `${lagaPal6}px ${lagaK61e}`;
    ctx.fillStyle = lagaWeh2;
    ctx.textBaseline = "alphabetic";
    ctx.textRendering = "optimizeLegibility";
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

        let kxesuKucaqX = saqaiAreqj2k;

        const kubaX: number[] = [];
        const n2kYKubaCa1ara: number[][] = [];

        for ( const kucaq of tlakakaiKucaq ) {
            const psazaiY = tlakakaiL6da - psazaiAreqj2k;

            kubaX.push(kxesuKucaqX);
            const kxesuN2kY: number[] = [];

            let kxesukp6KubaX = kxesuKucaqX;

            for ( const kp6Kuba of kucaq.kp6KubaCa1ara ) {
                let er2haL6daLPsazaikp6Kuba = 0o0;

                for ( let w = 0o0; w < kp6Kuba.haxez.length; w++ ) {
                    const xez = kp6Kuba.haxez[w];

                    let xezK2f: number;
                    if ( pawasaiAraq === "left" ) {
                        xezK2f = kxesukp6KubaX;
                    } else if ( pawasaiAraq === "center" ) {
                        xezK2f = kxesukp6KubaX + (kp6Kuba.kp6KubaSefini - xez.xezEr2haSefwini) / 0o2;
                    } else {
                        xezK2f = kxesukp6KubaX + kp6Kuba.kp6KubaSefini - xez.xezEr2haSefwini;
                    }

                    let xezTanekAlPsazaiY: number;
                    if ( knahtaka === "fasai" && sefaktapuni ) {
                        let tapuniL6da = 0o0;
                        for ( let i = 0o0; i < w; i++ ) {
                            tapuniL6da += kmawuk2tapuni[i] + cepuAreqj2k;
                        }
                        xezTanekAlPsazaiY = psazaiY - tapuniL6da;

                    } else if ( sefaktapuni ) {
                        let araqL6daKuba = 0o0;
                        for ( let i = 0o0; i < w; i++ ) {
                            araqL6daKuba += kucaq.kmawuk2niSweKucaq[i] + cepuAreqj2k;
                        }
                        xezTanekAlPsazaiY = psazaiY - (l6da - kucaq.kucaqEr2haL6da) - araqL6daKuba;

                    } else {
                        const psazaiKucaqY = psazaiY - (l6da - kucaq.kucaqEr2haL6da);
                        xezTanekAlPsazaiY = psazaiKucaqY - er2haL6daLPsazaikp6Kuba;
                    }

                    if ( w >= kxesuN2kY.length ) {
                        kxesuN2kY[w] = xezTanekAlPsazaiY - xez.xezEr2haL6da;
                    } else {
                        kxesuN2kY[w] = Math.min(kxesuN2kY[w], xezTanekAlPsazaiY - xez.xezEr2haL6da);
                    }

                    if ( xez.saxedini ) {
                        const saxediTanekVop2 = xez.saxedini;
                        const saxediTanekK2fY = xezTanekAlPsazaiY - saxediTanekVop2.araqKubaL6da;

                        if ( saxediTanekVop2.huruq ) {
                            const cx = xezK2f + saxediTanekVop2.sefini / 0o2;
                            const cy = saxediTanekK2fY - saxediTanekVop2.saxeKubaL6da / 0o2;
                            ctx.save();
                            ctx.translate(cx, cy);
                            ctx.rotate(-Math.PI / 0o2);
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            ctx.fillText(saxediTanekVop2.k61e, 0o0, 0o0);
                            ctx.restore();
                            ctx.textAlign = "left";
                            ctx.textBaseline = "alphabetic";
                        } else {
                            ctx.fillText(saxediTanekVop2.k61e, xezK2f, saxediTanekK2fY);
                        }
                    }

                    const tanekSaxeX = xezK2f + (xez.saxedini ? xez.saxedini.sefini : 0o0);
                    let kxesuKucaqY = xezTanekAlPsazaiY - xez.xezEr2haL6da;
                    if ( xez.ksozdini.length > 0o0 ) {
                        kxesuKucaqY += L6DA_P2FO_SAXE * xez.l6daK2fe;
                    }

                    const n2kL6da = lagaPal6 * KSOZDI_PAL6;

                    for ( let i = 0o0; i < xez.ksozdini.length; i++ ) {
                        const ksozdiTanekVop2 = xez.ksozdini[i];
                        const kxesuK2fe = ksozdiTanekVop2.emoqi ? 0o1 : xez.l6daK2fe;
                        const k2feL6da = ksozdiTanekVop2.l6da * kxesuK2fe;
                        const k2feSaxeL6da = ksozdiTanekVop2.saxeKubaL6da * kxesuK2fe;
                        const tanekY = kxesuKucaqY + k2feSaxeL6da;
                        const tanekX = tanekSaxeX;

                        ctx.save();
                        if ( ksozdiTanekVop2.huruq ) {
                            const huruqSefini = ksozdiTanekVop2.saxeKubaL6da + ksozdiTanekVop2.araqKubaL6da;
                            const xekox2qK2fe = huruqSefini > 0o0
                                ? ksozdiTanekVop2.sefini / huruqSefini
                                : 0o1;
                            ctx.translate(tanekX + ksozdiTanekVop2.sefini / 0o2, kxesuKucaqY + k2feL6da / 0o2);
                            ctx.rotate(-Math.PI / 0o2);
                            ctx.scale(kxesuK2fe, xekox2qK2fe);
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            ctx.fillText(ksozdiTanekVop2.k61e, 0o0, 0o0);
                        } else {
                            ctx.translate(tanekX, tanekY);
                            ctx.scale(0o1, kxesuK2fe);
                            ctx.fillText(ksozdiTanekVop2.k61e, 0o0, 0o0);
                        }
                        ctx.restore();

                        kxesuKucaqY += k2feL6da + (i < xez.ksozdini.length - 0o1 ? n2kL6da * kxesuK2fe : 0o0);
                    }

                    if ( !sefaktapuni || knahtaka === "kucaqai" ) {
                        er2haL6daLPsazaikp6Kuba += xez.xezEr2haL6da + cepuAreqj2k;
                    }
                }
                kxesukp6KubaX += kp6Kuba.kp6KubaSefini;
            }
            n2kYKubaCa1ara.push(kxesuN2kY);
            kxesuKucaqX += kucaq.kucaqEr2haSefwini + tapuAreqj2k;
        }

        tz2saiTahaq = {
            tlakakaiKucaq: tlakakaiKucaq,
            tapuAreqj2k: tapuAreqj2k,
            l6da: arak2f.height,
            sozasaiAreqj2k: sozasaiAreqj2k,
            psazaiAreqj2k: psazaiAreqj2k,
            saqaiAreqj2k: saqaiAreqj2k,
            raqaiAreqj2k: raqaiAreqj2k,
            arak21okoWeh2: arak21okoWeh2,
            kubaX: kubaX,
            n2kY: n2kYKubaCa1ara.reduce((m2Ca1ara, n2kCa1ara) => {
                for ( let i = 0o0; i < n2kCa1ara.length; i++ ) {
                    m2Ca1ara[i] = Math.min(m2Ca1ara[i] ?? Infinity, n2kCa1ara[i]);
                }
                return m2Ca1ara;
            }, [] as number[])
        };

        if ( qumk2 ) {
            qumk2.href = arak2f.toDataURL("image/png");
            qumk2.style.display = "flex";
        }
        arak2f.style.display = "block";

    } ).catch(tlohk2ni => {
        kf23ohk2ni(tlohk2niKek, tlohk2ni as Error);
        tlohk2niKek.textContent += ` ſ͕ȷɜ ſɭɹ j͐ʃᴜ ſ͔ɭᴜ ſɭɹʞ ⟅`;
        const { qumk2, arak2f } = quqArak2f();
        if ( qumk2 ) {
            qumk2.style.display = "none";
            qumk2.href = "";
        }
        arak2f.style.display = "none";
    } );
} );


// ⟪ ſ͕ɭɹȝ ʌ ɭʃᴜ ֭ſɭᴜȝ 💾 ⟫

function kf2Aravab6m6q(tahaqWeK2p2: HTMLCanvasElement[], a1aKnu3a = false): void {
    const aravab6m6q = window.open("", "_blank");
    if ( !aravab6m6q ) {
        ceme3ohk2ni("ſ͕ȷɜ ſɭʞɹ ʃэ ŋᷠэȝ ſɭɹ ſןɹ ⟅");
        return;
    }

    const ksaka3a = "j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ʃэ ŋᷠэȝ ſɭɹ ſןɹ";

    const k61e3a = tahaqWeK2p2.map((c, i) => {
        const saxe = c.toDataURL("image/png");
        const sefiniL6da = c.width && c.height ? `${c.width} / ${c.height}` : "auto";
        return a1aKnu3a
            ? `<div class="page" style="--ar: ${sefiniL6da};"><img src="${saxe}" alt="Page ${i + 0o1}"></div>`
            : `<img src="${saxe}">`;
    }).join(a1aKnu3a ? "" : "\n");

    const saxeK61e3a = a1aKnu3a
        ? `@page { size: landscape; margin: 0; }
           @media print { .page { page-break-after: always; } .page:last-child { page-break-after: auto; } }
           body { margin: 0; padding: 0; }
           .page { width: 100vi; max-height: 100vb; aspect-ratio: var(--ar, auto); margin: 0 auto; display: flex; justify-content: center; align-items: center; background: white; }
           img { display: block; width: 100%; height: 100%; object-fit: contain; }`
        : `@page { size: landscape; margin: 0; }
           body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vb; background: white; }
           img { display: block; max-width: 100vi; max-height: 100vb; object-fit: contain; }`;

    aravab6m6q.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${ksaka3a}</title>
            <style>${saxeK61e3a}</style>
        </head>
        <body>
            ${k61e3a}
            <script>window.onload = function() { window.print(); };<\/script>
        </body>
        </html>
    `);

    aravab6m6q.document.close();
}


kf2B6m6qK2p2Ca12na.addEventListener("click", function (): void {
    const { arak2f, qumk2 } = quqArak2f();

    if ( !qumk2 || !qumk2.href || arak2f.width === 0o0 ) {
        ceme3ohk2ni("ſ͕ȷɜ ſɭʞɹ ɭʃᴜ ֭ſɭᴜȝ ⟅");
        return;
    }

    if ( !tz2saiTahaq || !tz2saiTahaq.tlakakaiKucaq ) {
        kf2Aravab6m6q([ arak2f ]);
        return;
    }

    const { tlakakaiKucaq, tapuAreqj2k, l6da, sozasaiAreqj2k, psazaiAreqj2k, saqaiAreqj2k, raqaiAreqj2k, arak21okoWeh2, n2kY } = tz2saiTahaq;

    const saxeAraqSefini = arak2f.width;

    const saxeAraqAreqj2k = sozasaiAreqj2k + psazaiAreqj2k;
    const s2L6da = l6da - saxeAraqAreqj2k;

    // ⟨ ſɟᴜ ſȷᴜɔ˞ ʌ ſɭw ʃᴜ ⟩
    const l6da3a = l6da;
    const maxL6da3a = l6da;

    // ⟨ j͑ʃɔ ſȷꞇ }ʃꞇ ʌ ſɭw ʃᴜ ⟩
    const SEFINI_L6DA_3A = 0o13 / 8.5; // j͑ʃɔƣ̋ ꞁȷ̀ᴜ ſȷᶗ‹ᴜ j͐ʃᴜ j͐ʃ ʌ ɭʃᴜ ſןw ʌ ʃэ ŋᷠэȝ
    const sefini3a = l6da3a * SEFINI_L6DA_3A;

    if ( saxeAraqSefini <= sefini3a && s2L6da <= maxL6da3a ) {
        kf2Aravab6m6q([ arak2f ]);
        return;
    }

    const kuba3aCa1ara: HTMLCanvasElement[] = [];

    /*
    * ⟨ ſɟᴜ ɭʃᴜ ʌ j͑ʃᴜƽ ⟩
    */
    const kubaSaxeAraqCa1ara: number[] = [];
    let kxesuX = saqaiAreqj2k; // ſɟƨᴜ ŋᷠᴜ j͑ʃᴜꞇ j͐ʃ ʌ j͐ʃэ ſןw ſɭᴜƴ ʌ j͑ʃᴜ ı],ɔ ʌ ⺓ ʌ ſɭw ʃᴜ ⟅
    for ( const kucaq of tlakakaiKucaq ) {
        kubaSaxeAraqCa1ara.push(kxesuX);
        kxesuX += kucaq.kucaqEr2haSefwini + tapuAreqj2k;
    }
    kubaSaxeAraqCa1ara.push(kxesuX); // ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ ʌ ɭʃw ſɭˬɔƽ

    // ⟨ ſɟᴜ ɭʃᴜ ʌ j͑ʃᴜƽ ⟩
    // ⟨ j͑ʃᴜƽ 📏 ⟩
    const n2kSaxeAraqCa1ara: number[] = n2kY.length > 0o1
        ? [ sozasaiAreqj2k, ...n2kY, l6da ]
        : [ sozasaiAreqj2k, l6da ];

    const quqSaxeAraq = (k2fe: number, saxeAraqCa1ara: number[]): number => {
        let kemafi = saxeAraqCa1ara[0o0];
        for ( const saxeAraq of saxeAraqCa1ara ) {
            if ( saxeAraq <= k2fe ) kemafi = saxeAraq;
            else break;
        }

        return Math.max( kemafi, Math.min( k2fe, saxeAraqCa1ara[saxeAraqCa1ara.length - 0o1] ) );
    };

    /*
    * ⟨ ſɭʞɹ ʌ ſ̀ȷᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( sefini3a l6da3a ) ⟩
    */
    const p2fo = tapuAreqj2k + 0o1;

    const s2AraqX = saxeAraqSefini - raqaiAreqj2k;
    const s2AraqY = l6da - psazaiAreqj2k;

    let saxeY = sozasaiAreqj2k;
    while ( saxeY < s2AraqY ) {
        const maxY = Math.min(saxeY + maxL6da3a, s2AraqY);
        const y12t = quqSaxeAraq(maxY, n2kSaxeAraqCa1ara);
        const l6da12t = y12t - saxeY;
        if ( l6da12t <= 0o0 ) break;

        let saxeX = saqaiAreqj2k;
        while ( saxeX < s2AraqX ) {
            const maxX = Math.min(saxeX + sefini3a, s2AraqX);
            const x12t = quqSaxeAraq(maxX, kubaSaxeAraqCa1ara);
            const sefini12t = x12t - saxeX;
            if ( sefini12t <= 0o0 ) break;

            const desegnaX = Math.max(0o0, saxeX - p2fo);
            const desegnaY = Math.max(0o0, saxeY - p2fo);
            
            const xemaSefini = Math.min(sefini12t + (saxeX - desegnaX), saxeAraqSefini - desegnaX);
            const xemaL6da = Math.min(l6da12t + (saxeY - desegnaY), l6da - desegnaY);

            const araqX = saqaiAreqj2k - (saxeX - desegnaX);
            const araqY = sozasaiAreqj2k - (saxeY - desegnaY);

            const kuba12t = document.createElement("canvas");
            kuba12t.width = sefini3a;
            kuba12t.height = l6da3a;
            const xema12t = kuba12t.getContext("2d")!;

            xema12t.fillStyle = arak21okoWeh2;
            xema12t.fillRect(0o0, 0o0, sefini3a, l6da3a);
            xema12t.drawImage(arak2f, desegnaX, desegnaY, xemaSefini, xemaL6da, araqX, araqY, xemaSefini, xemaL6da);

            kuba3aCa1ara.push(kuba12t);

            saxeX = x12t;
        }

        saxeY = y12t;
    }

    kf2Aravab6m6q(kuba3aCa1ara, true);
} );
