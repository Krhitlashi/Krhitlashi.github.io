// ≺⧼ ſɟᴜ ſɭɔ j͑ʃ'ɔ - Teksta Bilda Generatoro 🖼️ ⧽≻
/**
 * Generas bildojn el teksto uzante proprajn tiparojn
 * - Subtenas propran tiparan ŝarĝon
 * - Plurlinia teksto kun diversaj aranĝoj
 * - Eksporto al PNG kun presa funkcio
 */

// ⟪ Konstantoj 📦 ⟫

const ERARO_MALVALIDA_ENIGO = "j͐ʃэ ɭʃɔ ſ͕ɭᴜꞇ j͑ʃ'ɔ ſɭп́ɜ ⟅";

const KSOZDI_PAL6 = 0o10 / 0o100;

const STACKA_VERTIKALA_MARĜENO_SUPRA = 0;
const STACKA_VERTIKALA_MARĜENO_MALSUPRA = 1 / 2;

const AŬTOFALLAJ_TIPAROJ = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "Noto Emoji", system-ui, sans-serif';

const SABOSU_KP6 = new Set<string>([
    "⟨", "⟩", "⟪", "⟫", "≺⧼", "⧽≻",
]);

function ĉuEmojiAro(ĉeno: string): boolean {
    if ( !ĉeno ) return false;
    return /\p{Extended_Pictographic}/u.test(ĉeno);
}

function disigiGraferojn(ĉeno: string): string[] {
    if ( typeof Intl !== "undefined" && ( Intl as any ).Segmenter ) {
        const seg = new ( Intl as any ).Segmenter(undefined, { granularity: "grapheme" });
        return Array.from(seg.segment(ĉeno), (s: any) => s.segment);
    }
    return Array.from(ĉeno);
}


// ⟪ Tipoj 📐 ⟫

interface Tz2saiTahaq {
    tlakakaiKucaq: TlakakaiKucaq[];
    tapuAreqj2k: number;
    alto: number;
    sozasaiAreqj2k: number;
    psazaiAreqj2k: number;
    saqaiAreqj2k: number;
    raqaiAreqj2k: number;
    arak21okoWeh2: string;
    blokajX: number[];
    liniajY: number[];
}

interface TlakakaiKucaq {
    kolumnoj: Cepuni[];
    kucaqEr2haSefwini: number;
    kucaqEr2haL6da: number;
    kmawuk2niSweKucaq: number[];
}

interface Cepuni {
    haxez: Xez[];
    cepuniKmasefwini: number;
}

interface Xez {
    saxedini: TekstaDimensioj | null;
    ksozdini: TekstaDimensioj[];
    xezEr2haSefwini: number;
    xezEr2haL6da: number;
    vertikalaSkalo: number;
}

interface TekstaDimensioj {
    teksto: string;
    larĝo: number;
    alto: number;
    supreniro: number;
    malsupreniro: number;
    faktaSaltujoMaldekstre: number;
    faktaSaltujoDekstre: number;
    faktaSaltujoSupreniro: number;
    faktaSaltujoMalsupreniro: number;
    ĉuEmoĝio: boolean;
    ĉuRotacii: boolean;
}

interface KrudaXez {
    saxedini: string;
    ksozdini: string[];
}


// ⟪ Konstantoj 📦 ⟫

const lagaCvpKek = document.getElementById("lagaCvp") as HTMLInputElement;
const lagaKsakaKek = document.getElementById("lagaKsaka") as HTMLInputElement;
const cepuAreqj2kKek = document.getElementById("cepuAreqj2k") as HTMLInputElement;
const sozasaiAregj2kKek = document.getElementById("sozasaiAreqj2k") as HTMLInputElement;
const raqaiAreqj2kKek = document.getElementById("raqaiAreqj2k") as HTMLInputElement;
const psazaiAreqj2kKek = document.getElementById("psazaiAreqj2k") as HTMLInputElement;
const saqaiAreqj2kKek = document.getElementById("saqaiAreqj2k") as HTMLInputElement;
const pawasaiAraqKek = (): HTMLInputElement | null => document.querySelector('input[name="pawasaiAraq"]:checked');
const sefaktapuniKek = document.getElementById("sefaktapuni") as HTMLInputElement;
const kompaktaVertikalaKek = document.getElementById("vac2w2k") as HTMLInputElement;
const xezSwekmavem2Kek = document.getElementById("xezSwekmavem2") as HTMLInputElement;
const tapuAreqj2kKek = document.getElementById("tapuAreqj2k") as HTMLInputElement;

const kf2Sweca12na = document.getElementById("kf2Sweca12na") as HTMLButtonElement;
const kf2B6m6qK2p2Ca12na = document.getElementById("kf2B6m6qK2p2Ca12na") as HTMLButtonElement;
const tlohk2niKek = document.getElementById("tlohk2ni") as HTMLElement;
const lagaCvp3ohk2niKek = document.getElementById("lagaCvp3ohk2ni") as HTMLElement;
const inakLagaKek = document.getElementById("inakLaga") as HTMLInputElement | null;

let tz2saiTahaq: Tz2saiTahaq | null = null;


// ⟪ Eromontraj Funkcioj ❌ ⟫

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

function akiriArak2fElementojn(): { arak2f: HTMLCanvasElement; qumk2: HTMLAnchorElement | null } {
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
        ceme3ohk2ni(ERARO_MALVALIDA_ENIGO);
        return false;
    }
    return true;
}


// ⟪ Tiparo 🔤 ⟫

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
    const vac2w2k = kompaktaVertikalaKek.checked;
    const xezSwekmavem2 = parseInt(xezSwekmavem2Kek.value, 0o10);
    const tapuAreqj2k = parseInt(tapuAreqj2kKek.value, 0o10);

    const lagalInakLaga = `"${aralaga}"${inakLaga ? ", " + inakLaga : ""}, ${AŬTOFALLAJ_TIPAROJ}`;

    const knahtaka = ( document.querySelector("input[name=\"aranĝo\"]:checked") as HTMLInputElement )?.value || "fasai";

    const lagaWeh2 = ( document.getElementById("lagaWeh2") as HTMLInputElement ).value;
    const arak21okoWeh2Color = ( document.getElementById("arak21okoWeh2") as HTMLInputElement ).value;
    const arak21okoWeh2Ch2ni = parseFloat(( document.getElementById("arak21okoWeh2Ch2ni") as HTMLInputElement ).value);
    const arak21okoWeh2 = arak21okoWeh2Ch2ni < 1
        ? `rgba(${parseInt(arak21okoWeh2Color.slice(1,3),16)},${parseInt(arak21okoWeh2Color.slice(3,5),16)},${parseInt(arak21okoWeh2Color.slice(5,7),16)},${arak21okoWeh2Ch2ni})`
        : arak21okoWeh2Color;

    tlohk2niKek.style.display = "none";
    tlohk2niKek.textContent = "";

    if ( !s2rol2mi(fal, lagaPal6, xezSwekmavem2, sozasaiAreqj2k, raqaiAreqj2k, psazaiAreqj2k, saqaiAreqj2k, knahtaka, tapuAreqj2k) ) {
        return;
    }

    const { arak2f, qumk2 } = akiriArak2fElementojn();
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


    // ⟨ Signa Unua Kongruilo ⟩
    function iibaKanoiKmasahak(kp6: string, kp6Ca1ara: string[]): string | null {
        for ( const unit of kp6Ca1ara ) {
            if ( kp6.startsWith(unit) ) {
                return unit;
            }
        }
        return null;
    }


    // ⟨ Teksta Mezuro ⟩
    function mezuriTekstDimensiojn(teksto: string, ctx: CanvasRenderingContext2D): TekstaDimensioj {
        const mezuroj = ctx.measureText(teksto);
        const larĝo = mezuroj.width;
        const faktaAlto = ( mezuroj.actualBoundingBoxAscent || 0 ) + ( mezuroj.actualBoundingBoxDescent || 0 );
        const supreniro = mezuroj.actualBoundingBoxAscent || lagaPal6 * 3 / 4;
        const malsupreniro = mezuroj.actualBoundingBoxDescent || lagaPal6 * 1 / 4;
        const alto = faktaAlto || supreniro + malsupreniro;

        return {
            teksto: teksto,
            larĝo: larĝo,
            alto: alto,
            supreniro: supreniro,
            malsupreniro: malsupreniro,
            faktaSaltujoMaldekstre: mezuroj.actualBoundingBoxLeft || 0,
            faktaSaltujoDekstre: mezuroj.actualBoundingBoxRight || larĝo,
            faktaSaltujoSupreniro: mezuroj.actualBoundingBoxAscent || supreniro,
            faktaSaltujoMalsupreniro: mezuroj.actualBoundingBoxDescent || malsupreniro,
            ĉuEmoĝio: ĉuEmojiAro(teksto),
            ĉuRotacii: SABOSU_KP6.has(teksto)
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
            const rawXez = textBlock.split(/\s+/).filter(xez => xez.length > 0);
            const xez: string[] = [];
            for ( const kp6 of rawXez ) {
                let bufo = "";
                for ( const grafero of disigiGraferojn(kp6) ) {
                    if ( ĉuEmojiAro(grafero) ) {
                        if ( bufo ) { xez.push(bufo); bufo = ""; }
                        xez.push(grafero);
                    } else {
                        bufo += grafero;
                    }
                }
                if ( bufo ) xez.push(bufo);
            }
            const xezVop2: KrudaXez[] = [];

            for ( const xezai_kp6 of xez ) {
                if ( ĉuEmojiAro(xezai_kp6) ) {
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
                } else if ( fusai_fal.length > 0 ) {
                    const araGrapheme = disigiGraferojn(fusai_fal)[0];
                    saxesu_kp6 = araGrapheme;
                    fusai_fal = fusai_fal.substring(araGrapheme.length);
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
                        const grafero = disigiGraferojn(fusaini)[0];
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
                let saxediTanekVop2: TekstaDimensioj | null = null;
                const ksozdiTanekVop2: TekstaDimensioj[] = [];
                let tanekKmasefwini = 0;
                let er2haTanekL6da = 0;

                if ( xez.saxedini ) {
                    saxediTanekVop2 = mezuriTekstDimensiojn(xez.saxedini, ctx);
                }

                for ( const unit of xez.ksozdini ) {
                    const kantoni = mezuriTekstDimensiojn(unit, ctx);
                    ksozdiTanekVop2.push(kantoni);
                    tanekKmasefwini = Math.max(tanekKmasefwini, kantoni.larĝo);
                    er2haTanekL6da += kantoni.alto;
                }

                const ksozdiLineHeight = lagaPal6 * KSOZDI_PAL6;
                if ( ksozdiTanekVop2.length > 1 ) {
                    er2haTanekL6da += (ksozdiTanekVop2.length - 1) * ksozdiLineHeight;
                }
                if ( ksozdiTanekVop2.length > 0 ) {
                    er2haTanekL6da += STACKA_VERTIKALA_MARĜENO_SUPRA + STACKA_VERTIKALA_MARĜENO_MALSUPRA;
                }

                let xezEr2haL6da = Math.max((saxediTanekVop2 ? saxediTanekVop2.alto : 0), er2haTanekL6da);
                let vertikalaSkalo = 1;
                
                if (saxediTanekVop2 && ksozdiTanekVop2.length === 2 && er2haTanekL6da > 0) {
                    const celaAlto = Math.max(saxediTanekVop2.alto, lagaPal6);
                    vertikalaSkalo = celaAlto / er2haTanekL6da;
                    xezEr2haL6da = celaAlto;
                } else if (vac2w2k && saxediTanekVop2 && er2haTanekL6da > saxediTanekVop2.alto) {
                    vertikalaSkalo = saxediTanekVop2.alto / er2haTanekL6da;
                    xezEr2haL6da = saxediTanekVop2.alto;
                }
                
                const xezEr2haSefwini = (saxediTanekVop2 ? saxediTanekVop2.larĝo : 0) + tanekKmasefwini;

                vecax2lXezVop2.push({
                    saxedini: saxediTanekVop2,
                    ksozdini: ksozdiTanekVop2,
                    xezEr2haSefwini: xezEr2haSefwini,
                    xezEr2haL6da: xezEr2haL6da,
                    vertikalaSkalo: vertikalaSkalo
                });
            }

            const kolumnoj: Cepuni[] = [];
            let kjesaicepuniHaxez: Xez[] = [];
            let kjesaicepuniKmasefwini = 0;

            for ( const xez of vecax2lXezVop2 ) {
                if ( kjesaicepuniHaxez.length >= xezSwekmavem2 && kjesaicepuniHaxez.length > 0 ) {
                    kolumnoj.push({
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
                kolumnoj.push({
                    haxez: kjesaicepuniHaxez,
                    cepuniKmasefwini: kjesaicepuniKmasefwini
                });
            }

            const cepuniHal6da: number[] = [];
            for ( const cepuni of kolumnoj ) {
                let kjesaicepuniL6da = 0;
                for ( let w = 0; w < cepuni.haxez.length; w++ ) {
                    const xez = cepuni.haxez[w];
                    kjesaicepuniL6da += xez.xezEr2haL6da + (w < cepuni.haxez.length - 1 ? cepuAreqj2k : 0);
                }
                cepuniHal6da.push(kjesaicepuniL6da);
            }

            let kmawuk2niSweKucaq: number[] = [];
            if ( sefaktapuni ) {
                const kemafiXezcepuni = Math.max(0, ...kolumnoj.map(col => col.haxez.length));
                kmawuk2niSweKucaq = new Array(kemafiXezcepuni).fill(0);

                for ( const cepuni of kolumnoj ) {
                    for ( let w = 0; w < cepuni.haxez.length; w++ ) {
                        const xez = cepuni.haxez[w];
                        kmawuk2niSweKucaq[w] = Math.max(kmawuk2niSweKucaq[w], xez.xezEr2haL6da);
                    }
                }
            }

            let kucaqEr2haSefwini = 0;
            for ( const cepuni of kolumnoj ) {
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
                kolumnoj: kolumnoj,
                kucaqEr2haSefwini: kucaqEr2haSefwini,
                kucaqEr2haL6da: kucaqEr2haL6da,
                kmawuk2niSweKucaq: kmawuk2niSweKucaq
            });

            kemafitapuni = Math.max(kemafitapuni, Math.max(0, ...kolumnoj.map(col => col.haxez.length)));
        }

        if ( tlakakaiKucaq.length === 0 || tlakakaiKucaq.every(kucaq => kucaq.kolumnoj.length === 0) ) {
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
            const unuBloko = tlakakaiKucaq[0];
            sefwini = unuBloko.kucaqEr2haSefwini;
            l6da = unuBloko.kucaqEr2haL6da;
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

        const blokajX: number[] = [];
        const vicojYPerBloko: number[][] = [];

        for ( const kucaq of tlakakaiKucaq ) {
            const psazaiY = tlakakaiL6da - psazaiAreqj2k;

            blokajX.push(kjesaiKucaqX);
            const ĉiVicoY: number[] = [];

            let kjesaicepuniX = kjesaiKucaqX;

            for ( const cepuni of kucaq.kolumnoj ) {
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
                        let altoDeVicojSubeEnBloko = 0;
                        for ( let i = 0; i < w; i++ ) {
                            altoDeVicojSubeEnBloko += kucaq.kmawuk2niSweKucaq[i] + cepuAreqj2k;
                        }
                        xezTanekAlPsazaiY = psazaiY - (l6da - kucaq.kucaqEr2haL6da) - altoDeVicojSubeEnBloko;

                    } else {
                        const psazaiKucaqY = psazaiY - (l6da - kucaq.kucaqEr2haL6da);
                        xezTanekAlPsazaiY = psazaiKucaqY - er2haL6daLPsazaicepuni;
                    }

                    if ( w >= ĉiVicoY.length ) {
                        ĉiVicoY[w] = xezTanekAlPsazaiY - xez.xezEr2haL6da;
                    } else {
                        ĉiVicoY[w] = Math.min(ĉiVicoY[w], xezTanekAlPsazaiY - xez.xezEr2haL6da);
                    }

                    if ( xez.saxedini ) {
                        const saxediTanekVop2 = xez.saxedini;
                        const saxediTanekK2fY = xezTanekAlPsazaiY - saxediTanekVop2.faktaSaltujoMalsupreniro;

                        if ( saxediTanekVop2.ĉuRotacii ) {
                            const cx = xezK2f + saxediTanekVop2.larĝo / 2;
                            const cy = saxediTanekK2fY - saxediTanekVop2.faktaSaltujoSupreniro / 2;
                            ctx.save();
                            ctx.translate(cx, cy);
                            ctx.rotate(-Math.PI / 2);
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            ctx.fillText(saxediTanekVop2.teksto, 0, 0);
                            ctx.restore();
                            ctx.textAlign = "left";
                            ctx.textBaseline = "alphabetic";
                        } else {
                            ctx.fillText(saxediTanekVop2.teksto, xezK2f, saxediTanekK2fY);
                        }
                    }

                    const tanekSaxeX = xezK2f + (xez.saxedini ? xez.saxedini.larĝo : 0);
                    let kjesaiKucaqY = xezTanekAlPsazaiY - xez.xezEr2haL6da;
                    if ( xez.ksozdini.length > 0 ) {
                        kjesaiKucaqY += STACKA_VERTIKALA_MARĜENO_SUPRA * xez.vertikalaSkalo;
                    }

                    const ksozdiLineHeight = lagaPal6 * KSOZDI_PAL6;

                    for ( let i = 0; i < xez.ksozdini.length; i++ ) {
                        const ksozdiTanekVop2 = xez.ksozdini[i];
                        const unuSkalo = ksozdiTanekVop2.ĉuEmoĝio ? 1 : xez.vertikalaSkalo;
                        const skalitaAlto = ksozdiTanekVop2.alto * unuSkalo;
                        const skalitaSupreniro = ksozdiTanekVop2.faktaSaltujoSupreniro * unuSkalo;
                        const tanekY = kjesaiKucaqY + skalitaSupreniro;
                        const tanekX = tanekSaxeX;

                        ctx.save();
                        if ( ksozdiTanekVop2.ĉuRotacii ) {
                            const rotaciitaEkranaLarĝo = ksozdiTanekVop2.faktaSaltujoSupreniro + ksozdiTanekVop2.faktaSaltujoMalsupreniro;
                            const konformaSkalo = rotaciitaEkranaLarĝo > 0
                                ? ksozdiTanekVop2.larĝo / rotaciitaEkranaLarĝo
                                : 1;
                            ctx.translate(tanekX + ksozdiTanekVop2.larĝo / 2, kjesaiKucaqY + skalitaAlto / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.scale(unuSkalo, konformaSkalo);
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            ctx.fillText(ksozdiTanekVop2.teksto, 0, 0);
                        } else {
                            ctx.translate(tanekX, tanekY);
                            ctx.scale(1, unuSkalo);
                            ctx.fillText(ksozdiTanekVop2.teksto, 0, 0);
                        }
                        ctx.restore();

                        kjesaiKucaqY += skalitaAlto + (i < xez.ksozdini.length - 1 ? ksozdiLineHeight * unuSkalo : 0);
                    }

                    if ( !sefaktapuni || knahtaka === "kucaqai" ) {
                        er2haL6daLPsazaicepuni += xez.xezEr2haL6da + cepuAreqj2k;
                    }
                }
                kjesaicepuniX += cepuni.cepuniKmasefwini;
            }
            vicojYPerBloko.push(ĉiVicoY);
            kjesaiKucaqX += kucaq.kucaqEr2haSefwini + tapuAreqj2k;
        }

        tz2saiTahaq = {
            tlakakaiKucaq: tlakakaiKucaq,
            tapuAreqj2k: tapuAreqj2k,
            alto: arak2f.height,
            sozasaiAreqj2k: sozasaiAreqj2k,
            psazaiAreqj2k: psazaiAreqj2k,
            saqaiAreqj2k: saqaiAreqj2k,
            raqaiAreqj2k: raqaiAreqj2k,
            arak21okoWeh2: arak21okoWeh2,
            blokajX: blokajX,
            liniajY: vicojYPerBloko.reduce((acc, arr) => {
                for ( let i = 0; i < arr.length; i++ ) {
                    acc[i] = Math.min(acc[i] ?? Infinity, arr[i]);
                }
                return acc;
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
        const { qumk2, arak2f } = akiriArak2fElementojn();
        if ( qumk2 ) {
            qumk2.style.display = "none";
            qumk2.href = "";
        }
        arak2f.style.display = "none";
    } );
} );


// ⟪ Eksporto / Preso 💾 ⟫

function kf2Aravab6m6q(tahaqWeK2p2: HTMLCanvasElement[], a1aKnu3a = false): void {
    const aravab6m6q = window.open("", "_blank");
    if ( !aravab6m6q ) {
        ceme3ohk2ni("ſ͕ȷɜ ſɭʞɹ ʃэ ŋᷠэȝ ſɭɹ ſןɹ ⟅");
        return;
    }

    const paĝaTitolo = "j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ʃэ ŋᷠэȝ ſɭɹ ſןɹ";

    const paĝoj = tahaqWeK2p2.map((c, i) => {
        const fonto = c.toDataURL("image/png");
        const proporcio = c.width && c.height ? `${c.width} / ${c.height}` : "auto";
        return a1aKnu3a
            ? `<div class="page" style="--ar: ${proporcio};"><img src="${fonto}" alt="Page ${i + 1}"></div>`
            : `<img src="${fonto}">`;
    }).join(a1aKnu3a ? "" : "\n");

    const paĝajStiloj = a1aKnu3a
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
            <title>${paĝaTitolo}</title>
            <style>${paĝajStiloj}</style>
        </head>
        <body>
            ${paĝoj}
            <script>window.onload = function() { window.print(); };<\/script>
        </body>
        </html>
    `);

    aravab6m6q.document.close();
}


kf2B6m6qK2p2Ca12na.addEventListener("click", function (): void {
    const { arak2f, qumk2 } = akiriArak2fElementojn();

    if ( !qumk2 || !qumk2.href || arak2f.width === 0 ) {
        ceme3ohk2ni("ſ͕ȷɜ ſɭʞɹ ɭʃᴜ ֭ſɭᴜȝ ⟅");
        return;
    }

    if ( !tz2saiTahaq || !tz2saiTahaq.tlakakaiKucaq ) {
        kf2Aravab6m6q([arak2f]);
        return;
    }

    const { tlakakaiKucaq, tapuAreqj2k, alto, sozasaiAreqj2k, psazaiAreqj2k, saqaiAreqj2k, raqaiAreqj2k, arak21okoWeh2 } = tz2saiTahaq;

    const tutaLarĝo = arak2f.width;

    const marĝenoTutaY = sozasaiAreqj2k + psazaiAreqj2k;
    const enhavoAlto = alto - marĝenoTutaY;

    // ⟨ Paĝa alto estas la plena alto de la kanvaso (la maksimuma silabo-staka alto) ⟩
    const paĝaAlto = alto;
    const maksPaĝaAlto = alto;

    // ⟨ Paĝa larĝo estas pejzaĝa-proporcia de tiu alto ⟩
    const PEJZAĜA_PROPROCIO = 11 / 8.5; // Usona letero pejzaĝe
    const paĝaLarĝo = paĝaAlto * PEJZAĜA_PROPROCIO;

    if ( tutaLarĝo <= paĝaLarĝo && enhavoAlto <= maksPaĝaAlto ) {
        kf2Aravab6m6q([arak2f]);
        return;
    }

    const paĝajBildoj: HTMLCanvasElement[] = [];

    // ⟨ Blokaj x-limoj (en kanvasaj koordinatoj) por ke horizontalaj tranĉoj
    //   falas INTER blokoj kaj neniam fendas glifon duone. ⟩
    const blokajLimejoj: number[] = [];
    let limoX = saqaiAreqj2k; // blokoj komenciĝas je la maldekstra marĝeno
    for ( const kucaq of tlakakaiKucaq ) {
        blokajLimejoj.push(limoX);
        limoX += kucaq.kucaqEr2haSefwini + tapuAreqj2k;
    }
    blokajLimejoj.push(limoX); // posta rando

    // ⟨ Per-vicaj y-limoj por ke vertikalaj tranĉoj falas INTER linioj. ⟩
    const cepuAreqj2k = parseInt(cepuAreqj2kKek.value, 0o10);
    const maksVicoj = tlakakaiKucaq.reduce((max, kucaq) =>
        Math.max(max, ...kucaq.kolumnoj.map(col => col.haxez.length), 0), 0);
    const liniajLimejoj: number[] = [];
    let limoY = sozasaiAreqj2k; // enhavo komenciĝas je la supra marĝeno
    for ( let vi = 0; vi < maksVicoj; vi++ ) {
        let vicAlto = 0;
        for ( const kucaq of tlakakaiKucaq ) {
            const perTapu = kucaq.kmawuk2niSweKucaq;
            vicAlto = Math.max(vicAlto, (vi < perTapu.length ? perTapu[vi] : 0) + (vi < maksVicoj - 1 ? cepuAreqj2k : 0));
        }
        liniajLimejoj.push(limoY);
        limoY += vicAlto;
    }
    liniajLimejoj.push(limoY); // posta rando

    const fiksiLimejon = (valoro: number, randoj: number[]): number => {
        let plejBona = randoj[0];
        for ( const rando of randoj ) {
            if ( rando <= valoro ) plejBona = rando;
            else break;
        }
        return plejBona;
    };

    // ⟨ Paĝigu. Larĝo estas tranĉita je la plej proksima bloka limo ≤ paĝaLarĝo;
    //   linioj kiuj superfluas la pejzaĝan paĝan larĝon disiĝas sur kromajn paĝojn.
    //   Ĉiu paĝa kanvaso havas la samajn dimensiojn (paĝaLarĝo x paĝaAlto)
    //   por ke ili bildiĝas je konsekvenca skalo en presaj antaŭvidoj. ⟩
    const ĈIRKAŬO = tapuAreqj2k + 1;

    const enhavoDekstre = tutaLarĝo - raqaiAreqj2k;
    const enhavoMalsupro = alto - psazaiAreqj2k;

    let fontoY = sozasaiAreqj2k;
    while ( fontoY < enhavoMalsupro ) {
        const maksY = Math.min(fontoY + maksPaĝaAlto, enhavoMalsupro);
        const tranĉoY = fiksiLimejon(maksY, liniajLimejoj);
        const tranĉaĵoAlto = tranĉoY - fontoY;
        if ( tranĉaĵoAlto <= 0 ) break;

        let fontoX = saqaiAreqj2k;
        while ( fontoX < enhavoDekstre ) {
            const maksX = Math.min(fontoX + paĝaLarĝo, enhavoDekstre);
            const tranĉoX = fiksiLimejon(maksX, blokajLimejoj);
            const tranĉaĵoLarĝo = tranĉoX - fontoX;
            if ( tranĉaĵoLarĝo <= 0 ) break;

            const desegnaX = Math.max(0, fontoX - ĈIRKAŬO);
            const desegnaY = Math.max(0, fontoY - ĈIRKAŬO);
            
            const kopioLarĝo = Math.min(tranĉaĵoLarĝo + (fontoX - desegnaX), tutaLarĝo - desegnaX);
            const kopioAlto = Math.min(tranĉaĵoAlto + (fontoY - desegnaY), alto - desegnaY);

            const celaX = saqaiAreqj2k - (fontoX - desegnaX);
            const celaY = sozasaiAreqj2k - (fontoY - desegnaY);

            const tranĉaKanvaso = document.createElement("canvas");
            tranĉaKanvaso.width = paĝaLarĝo;
            tranĉaKanvaso.height = paĝaAlto;
            const tranĉaKunteksto = tranĉaKanvaso.getContext("2d")!;

            tranĉaKunteksto.fillStyle = arak21okoWeh2;
            tranĉaKunteksto.fillRect(0, 0, paĝaLarĝo, paĝaAlto);
            tranĉaKunteksto.drawImage(arak2f, desegnaX, desegnaY, kopioLarĝo, kopioAlto, celaX, celaY, kopioLarĝo, kopioAlto);

            paĝajBildoj.push(tranĉaKanvaso);

            fontoX = tranĉoX;
        }

        fontoY = tranĉoY;
    }

    kf2Aravab6m6q(paĝajBildoj, true);
} );
