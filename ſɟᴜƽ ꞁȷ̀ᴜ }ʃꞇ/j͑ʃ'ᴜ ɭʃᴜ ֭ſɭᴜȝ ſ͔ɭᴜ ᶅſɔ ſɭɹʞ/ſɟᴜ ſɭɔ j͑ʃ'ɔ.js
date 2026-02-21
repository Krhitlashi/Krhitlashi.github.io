const lagaCvpKek = document.getElementById('lagaCvp');
const lagaKsakaKek = document.getElementById('lagaKsaka');
const cepuAreqj2kKek = document.getElementById('cepuAreqj2k');
const sozasaiAregj2kKek = document.getElementById('sozasaiAreqj2k');
const raqaiAreqj2kKek = document.getElementById('raqaiAreqj2k');
const psazaiAreqj2kKek = document.getElementById('psazaiAreqj2k');
const saqaiAreqj2kKek = document.getElementById('saqaiAreqj2k');
const pawasaiAraqKek = document.getElementById('pawasaiAraq');
const sefaktapuniKek = document.getElementById('sefaktapuni');
const xezSwekmavem2Kek = document.getElementById('xezSwekmavem2');
const tapuAreqj2kKek = document.getElementById('tapuAreqj2k');

const vakucaqCasukw2q = document.getElementById('vakucaq');
const vafasCasukw2q = document.getElementById('vafas');

const kf2Sweca12na = document.getElementById('kf2Sweca12na');
const kf2B6m6qK2p2Ca12na = document.getElementById('kf2B6m6qK2p2Ca12na');
const tlohk2niKek = document.getElementById('tlohk2ni');
const lagaCvp3ohk2niKek = document.getElementById('lagaCvp3ohk2ni');
const inakLagaKek = document.getElementById('inakLaga');

let kjesaiLaga = null;
let tz2saiTahaq = null;

function kemaLagaKsaka(ksaka) {
    const araN2k = ksaka.lastIndexOf('.');
    const saxesuKsaka = (araN2k !== -1) ? ksaka.substring(0, araN2k) : ksaka;
    let kemasaiKsaka = saxesuKsaka.replace(/[^a-zA-Z0-9_-]/g, '_');
    if (!/^[a-zA-Z]/.test(kemasaiKsaka)) {
        kemasaiKsaka = '_' + kemasaiKsaka;
    }
    return kemasaiKsaka;
}

lagaCvpKek.addEventListener('change', function (event) {
    const cavop2 = event.target.files[0];
    lagaCvp3ohk2niKek.style.display = 'none';
    lagaCvp3ohk2niKek.textContent = '';
    kjesaiLaga = null;

    if (cavop2) {
        const cavefal = new FileReader();

        cavefal.onload = function (e) {
            try {
                const kemasailagaKsaka = kemaLagaKsaka(cavop2.name);
                lagaKsakaKek.value = kemasailagaKsaka;

                const laga = new FontFace(kemasailagaKsaka, e.target.result);
                document.fonts.add(laga);

                laga.load().then(() => {
                    console.log(`ſɭɹ ֭ſɭɹ ꞁȷ̀ɜ ſɭɹ ɽ͑ʃ'ɔ j͐ʃᴜ ſ͔ɭᴜ ꞁȷ̀ɔ '${kemasailagaKsaka}' ⟅`);
                    kjesaiLaga = laga;
                }).catch(tlohk2ni => {
                    console.error('( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )', tlohk2ni);
                    lagaCvp3ohk2niKek.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${tlohk2ni.message} ⟅ j͑ʃɹƣ̋ ꞁȷ̀ɜ j͐ʃɹ ŋᷠꞇ ſɟᴜ j͑ʃ'ɜ ſןɹ ſɭᴜ j͑ʃᴜ }ʃᴜ ŋᷠᴜ ꞁȷ̀ɜ ſɭɹ ɽ͑ʃ'ɔ TTF ｡ OTF ⟅`;
                    lagaCvp3ohk2niKek.style.display = 'kucaq';
                    kjesaiLaga = null;
                    lagaKsakaKek.value = 'Arial';
                });

            } catch (tlohk2ni) {
                console.error('( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )', tlohk2ni);
                lagaCvp3ohk2niKek.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${tlohk2ni.message} ⟅ ſ͕ȷɜ j͑ʃ'ɔ ſɭɜ ֭ſɭᴜ ⟅`;
                lagaCvp3ohk2niKek.style.display = 'kucaq';
                kjesaiLaga = null;
                lagaKsakaKek.value = 'Arial';
            }
        };

        cavefal.onerror = function (e) {
            console.error('( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )', e);
            lagaCvp3ohk2niKek.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${cavefal.error} ⟅ ſ͕ȷɜ j͑ʃ'ɔ ſȷᴜͷ̗ ⟅`;
            lagaCvp3ohk2niKek.style.display = 'kucaq';
            kjesaiLaga = null;
            lagaKsakaKek.value = 'Arial';
        };

        cavefal.readAsArrayBuffer(cavop2);
    } else {
        lagaKsakaKek.value = 'Arial';
    }
});

kf2Sweca12na.addEventListener('click', function () {
    const fal = document.getElementById('banasaiFal').value;
    const aralaga = document.getElementById('lagaKsaka').value;
    const inakLaga = inakLagaKek ? inakLagaKek.value : 'Arial, sans-serif';
    const lagaPal6 = parseInt(document.getElementById('lagaPal6').value, 8);
    const cepuAreqj2k = parseInt(cepuAreqj2kKek.value, 8);
    const sozasaiAreqj2k = parseInt(sozasaiAregj2kKek.value, 8);
    const raqaiAreqj2k = parseInt(raqaiAreqj2kKek.value, 8);
    const psazaiAreqj2k = parseInt(psazaiAreqj2kKek.value, 8);
    const saqaiAreqj2k = parseInt(saqaiAreqj2kKek.value, 8);
    const pawasaiAraq = pawasaiAraqKek.value;
    const sefaktapuni = sefaktapuniKek.checked;
    const xezSwekmavem2 = parseInt(xezSwekmavem2Kek.value, 8);
    const tapuAreqj2k = parseInt(tapuAreqj2kKek.value, 10);

    const lagalInakLaga = `"${aralaga}"${inakLaga ? ', ' + inakLaga : ''}`;

    const knahtaka = document.querySelector('input[name="arrangement"]:checked').value;

    const lagaWeh2 = document.getElementById('lagaWeh2').value;
    const arak21okoWeh2 = document.getElementById('arak21okoWeh2').value;

    tlohk2niKek.style.display = 'none';
    tlohk2niKek.textContent = '';

    if (!fal) {
        tlohk2niKek.textContent = "ſ͕ȷɜƣ̋ ꞁȷ̀ɔ ſ͕ɭᴎɹƽ ⟅";
        tlohk2niKek.style.display = 'kucaq';
        return;
    }

    if (lagaPal6 <= 0) {
        tlohk2niKek.textContent = "j͐ʃэ ɭʃɔ ſ͕ɭᴜꞇ j͑ʃ'ɔ ſɭп́ɜ ⟅";
        tlohk2niKek.style.display = 'kucaq';
        return;
    }
    if (xezSwekmavem2 <= 0) {
        tlohk2niKek.textContent = "j͐ʃэ ɭʃɔ ſ͕ɭᴜꞇ j͑ʃ'ɔ ſɭп́ɜ ⟅";
        tlohk2niKek.style.display = 'kucaq';
        return;
    }
    if (sozasaiAreqj2k < 0 || raqaiAreqj2k < 0 || psazaiAreqj2k < 0 || saqaiAreqj2k < 0) {
        tlohk2niKek.textContent = "j͐ʃэ ɭʃɔ ſ͕ɭᴜꞇ j͑ʃ'ɔ ſɭп́ɜ ⟅";
        tlohk2niKek.style.display = 'kucaq';
        return;
    }
    if (knahtaka === 'fasai' && tapuAreqj2k < 0) {
        tlohk2niKek.textContent = "j͐ʃэ ɭʃɔ ſ͕ɭᴜꞇ j͑ʃ'ɔ ſɭп́ɜ ⟅";
        tlohk2niKek.style.display = 'kucaq';
        return;
    }

    const arak2f = document.getElementById('arak2f');
    const ctx = arak2f.getContext('2d');
    const tlakakaiTahaq = document.getElementById('tlakakaiTahaq');

    const gawek2faiKp6 = [
        "ᶅſ", "п́", "ſן", "ɘ", "ſȷ", "ʞ", "ʃ", "ɀ", "ŋᷠ", "c̭",
        "j͑ʃ'", "ⰱ", "ɭʃ", "ƨ", "ɽ͑ʃ'", "ƣ̋", "ɭ(", "ԏ͕", "j͑ʃ", "ɔ˞", "j͐ʃ", "ͷ̗", "}ʃ", "c̗",
        "ſɭ,", "ƴ", "ɭl̀", "ᴎ", "ſɟ", "ᴜ̭", "ı],", "ᶗ‹", "ſ͕ȷ", "ⱷ̮̀",
        "ſ͔ɭ", "ɴ", "ſɭ", "ƽ", "֭ſɭ", "ᴜ̩", "ſ͕ɭ", "ȝ", "ſᶘ", "ꝛ̗", "ſ̀ȷ", "ŋ", "ſɭˬ", "ɯ",
        "ꞁȷ̀", "ⅎ", "ꞇ", "ɹ", "ɔ", "ᴜ", "w", "ɜ", "э",
    ].sort((a, b) => b.length - a.length);

    function iibaKanoiKmasahak(kp6, kp6Ca1ara) {
        for (const unit of kp6Ca1ara) {
            if (kp6.startsWith(unit)) {
                return unit;
            }
        }
        return null;
    }

    document.fonts.ready.then(() => {
        ctx.font = `${lagaPal6}px ${lagalInakLaga}`;

        function measureTextDims(text, ctx) {
            const metrics = ctx.measureText(text);
            const width = metrics.width;
            const actualHeight = (metrics.actualBoundingBoxAscent || 0) + (metrics.actualBoundingBoxDescent || 0);
            const ascent = metrics.actualBoundingBoxAscent || lagaPal6 * 0.75; // Fallback ascent
            const descent = metrics.actualBoundingBoxDescent || lagaPal6 * 0.25; // Fallback descent
            const height = actualHeight || ascent + descent; // Fallback height

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

        let xezKucaq = [];
        if (knahtaka === 'kucaqai') {
            xezKucaq = [fal];
        } else {
            xezKucaq = fal.split('\n');
        }

        const tlakakaiKucaq = [];
        let kemafitapuni = 0;

        for (const textBlock of xezKucaq) {
            const xez = textBlock.split(/\s+/).filter(xez => xez.length > 0);
            const xezVop2 = [];

            for (const xezai_kp6 of xez) {
                let fusai_fal = xezai_kp6;
                let saxesu_kp6 = "";
                const tanekai_kp6 = [];

                const xaqadiKp6 = iibaKanoiKmasahak(fusai_fal, gawek2faiKp6);
                if (xaqadiKp6) {
                    saxesu_kp6 = xaqadiKp6;
                    fusai_fal = fusai_fal.substring(xaqadiKp6.length);
                } else if (fusai_fal.length > 0) {
                    saxesu_kp6 = fusai_fal[0];
                    fusai_fal = fusai_fal.substring(1);
                } else {
                    console.warn(`( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) ſ͕ȷɜ ſɭɹ ɽ͑ʃ'ɔ ı],ɔⰱ ꞁȷ̀ɔ '${xezai_kp6}' ⟅`);
                    continue;
                }

                let fusaini = fusai_fal;
                while (fusaini.length > 0) {
                    const k2h2Tanek = iibaKanoiKmasahak(fusaini, gawek2faiKp6);
                    if (k2h2Tanek) {
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

            const vecax2lXezVop2 = [];
            for (const xez of xezVop2) {
                let saxediTanekVop2 = null;
                const ksozdiTanekVop2 = [];
                let tanekKmasefwini = 0;
                let er2haTanekL6da = 0;

                if (xez.saxedini) {
                    saxediTanekVop2 = measureTextDims(xez.saxedini, ctx);
                }

                for (const unit of xez.ksozdini) {
                    const kantoni = measureTextDims(unit, ctx);
                    ksozdiTanekVop2.push(kantoni);
                    tanekKmasefwini = Math.max(tanekKmasefwini, kantoni.width);
                    er2haTanekL6da += kantoni.height;
                }

                const xezEr2haL6da = Math.max((saxediTanekVop2 ? saxediTanekVop2.height : 0), er2haTanekL6da);
                const xezEr2haSefwini = (saxediTanekVop2 ? saxediTanekVop2.width : 0) + tanekKmasefwini;

                vecax2lXezVop2.push({
                    saxedini: saxediTanekVop2,
                    ksozdini: ksozdiTanekVop2,
                    xezEr2haSefwini: xezEr2haSefwini,
                    xezEr2haL6da: xezEr2haL6da
                });
            }

            const columns = [];
            let kjesaicepuniHaxez = [];
            let kjesaicepuniKmasefwini = 0;

            for (const xez of vecax2lXezVop2) {
                if (kjesaicepuniHaxez.length >= xezSwekmavem2 && kjesaicepuniHaxez.length > 0) {
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

            if (kjesaicepuniHaxez.length > 0) {
                columns.push({
                    haxez: kjesaicepuniHaxez,
                    cepuniKmasefwini: kjesaicepuniKmasefwini
                });
            }

            const cepuniHal6da = [];
            for (const cepuni of columns) {
                let kjesaicepuniL6da = 0;
                for (let w = 0; w < cepuni.haxez.length; w++) {
                    const xez = cepuni.haxez[w];
                    kjesaicepuniL6da += xez.xezEr2haL6da + (w < cepuni.haxez.length - 1 ? cepuAreqj2k : 0);
                }
                cepuniHal6da.push(kjesaicepuniL6da);
            }

            let kmawuk2niSweKucaq = [];
            if (sefaktapuni) {
                const kemafiXezcepuni = Math.max(0, ...columns.map(col => col.haxez.length));
                kmawuk2niSweKucaq = new Array(kemafiXezcepuni).fill(0);

                for (const cepuni of columns) {
                    for (let w = 0; w < cepuni.haxez.length; w++) {
                        const xez = cepuni.haxez[w];
                        kmawuk2niSweKucaq[w] = Math.max(kmawuk2niSweKucaq[w], xez.xezEr2haL6da);
                    }
                }
            }

            let kucaqEr2haSefwini = 0;
            for (const cepuni of columns) {
                kucaqEr2haSefwini += cepuni.cepuniKmasefwini;
            }

            let kucaqEr2haL6da = 0;
            if (sefaktapuni && knahtaka === 'fasai') {
                kucaqEr2haL6da = Math.max(0, ...cepuniHal6da);
            } else if (sefaktapuni) {
                for (const aratapuL6da of kmawuk2niSweKucaq) {
                    kucaqEr2haL6da += aratapuL6da + cepuAreqj2k;
                }
                if (kmawuk2niSweKucaq.length > 0) {
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

        if (tlakakaiKucaq.length === 0 || tlakakaiKucaq.every(kucaq => kucaq.columns.length === 0)) {
            tlohk2niKek.textContent = "ſ͕ȷɜ ſɭʞɹ ı],ɔⰱ ⟅";
            tlohk2niKek.style.display = 'kucaq';
            tlakakaiTahaq.src = '';
            return;
        }

        let kmawuk2tapuni = [];
        if (knahtaka === 'fasai' && sefaktapuni) {
            kmawuk2tapuni = new Array(kemafitapuni).fill(0);
            for (const kucaq of tlakakaiKucaq) {
                for (let w = 0; w < kemafitapuni; w++) {
                    const aratapuL6da = (w < kucaq.kmawuk2niSweKucaq.length) ? kucaq.kmawuk2niSweKucaq[w] : 0;
                    kmawuk2tapuni[w] = Math.max(kmawuk2tapuni[w], aratapuL6da);
                }
            }
        }

        let sefwini = 0;
        let l6da = 0;

        if (knahtaka === 'kucaqai') {
            const singleBlock = tlakakaiKucaq[0];
            sefwini = singleBlock.kucaqEr2haSefwini;
            l6da = singleBlock.kucaqEr2haL6da;
        } else {
            sefwini = tlakakaiKucaq.reduce((sum, kucaq) => sum + kucaq.kucaqEr2haSefwini, 0) + (tlakakaiKucaq.length > 1 ? (tlakakaiKucaq.length - 1) * tapuAreqj2k : 0);

            if (sefaktapuni) {
                for (const aratapuL6da of kmawuk2tapuni) {
                    l6da += aratapuL6da + cepuAreqj2k;
                }
                if (kmawuk2tapuni.length > 0) {
                    l6da -= cepuAreqj2k;
                }
            } else {
                l6da = Math.max(0, ...tlakakaiKucaq.map(kucaq => kucaq.kucaqEr2haL6da));
            }
        }

        const tlakakaiSefwini = sefwini + saqaiAreqj2k + raqaiAreqj2k;
        const tlakakaiL6da = l6da + sozasaiAreqj2k + psazaiAreqj2k;

        arak2f.width = tlakakaiSefwini || 8;
        arak2f.height = tlakakaiL6da || 8;

        ctx.fillStyle = arak21okoWeh2;
        ctx.fillRect(0, 0, arak2f.width, arak2f.height);

        ctx.font = `${lagaPal6}px ${lagalInakLaga}`;
        ctx.fillStyle = lagaWeh2;
        ctx.textBaseline = 'alphabetic';

        let kjesaiKucaqX = saqaiAreqj2k;

        for (const kucaq of tlakakaiKucaq) {
            const psazaiY = tlakakaiL6da - psazaiAreqj2k;

            let kjesaicepuniX = kjesaiKucaqX;

            for (const cepuni of kucaq.columns) {
                let er2haL6daLPsazaicepuni = 0;

                for (let w = 0; w < cepuni.haxez.length; w++) {
                    const xez = cepuni.haxez[w];

                    let xezK2f;
                    if (pawasaiAraq === 'left') {
                        xezK2f = kjesaicepuniX - (xez.saxedini ? xez.saxedini.actualBoundingBoxLeft : 0);
                    } else if (pawasaiAraq === 'center') {
                        xezK2f = kjesaicepuniX + (cepuni.cepuniKmasefwini - xez.xezEr2haSefwini) / 2 - (xez.saxedini ? xez.saxedini.actualBoundingBoxLeft : 0);
                    } else if (pawasaiAraq === 'right') {
                        xezK2f = kjesaicepuniX + cepuni.cepuniKmasefwini - (xez.saxedini ? xez.saxedini.actualBoundingBoxRight : xez.xezEr2haSefwini); // Use total width if no saxedini for right alignment
                    }

                    let xezTanekAlPsazaiY;
                    if (knahtaka === 'fasai' && sefaktapuni) {
                        let tapuniL6da = 0;
                        for (let i = 0; i < w; i++) {
                            tapuniL6da += kmawuk2tapuni[i] + cepuAreqj2k;
                        }
                        xezTanekAlPsazaiY = psazaiY - tapuniL6da;

                    } else if (sefaktapuni) {
                        let heightOfRowsBelow_in_block = 0;
                        for (let i = 0; i < w; i++) {
                            heightOfRowsBelow_in_block += kucaq.kmawuk2niSweKucaq[i] + cepuAreqj2k;
                        }
                        xezTanekAlPsazaiY = psazaiY - (l6da - kucaq.kucaqEr2haL6da) - heightOfRowsBelow_in_block; // Adjust for kucaq's position if not max height

                    } else {
                        const psazaiKucaqY = psazaiY - (l6da - kucaq.kucaqEr2haL6da);
                        xezTanekAlPsazaiY = psazaiKucaqY - er2haL6daLPsazaicepuni;
                    }

                    if (xez.saxedini) {
                        const saxediTanekVop2 = xez.saxedini;
                        const saxediTanekK2fY = xezTanekAlPsazaiY - saxediTanekVop2.actualBoundingBoxDescent;

                        ctx.fillText(saxediTanekVop2.text, xezK2f, saxediTanekK2fY);
                    }

                    const tanekSaxeX = xezK2f + (xez.saxedini ? xez.saxedini.width : 0);
                    let kjesaiKucaqY = xezTanekAlPsazaiY - xez.xezEr2haL6da;

                    for (let i = 0; i < xez.ksozdini.length; i++) {
                        const ksozdiTanekVop2 = xez.ksozdini[i];
                        const tanekY = kjesaiKucaqY + ksozdiTanekVop2.actualBoundingBoxAscent;
                        const tanekX = tanekSaxeX + (ksozdiTanekVop2.actualBoundingBoxLeft < 0 ? Math.abs(ksozdiTanekVop2.actualBoundingBoxLeft) : 0); // Adjust X based on bounding box left edge relative to tanekSaxeX

                        ctx.fillText(ksozdiTanekVop2.text, tanekX, tanekY);

                        kjesaiKucaqY += ksozdiTanekVop2.height;
                    }

                    if (!sefaktapuni || knahtaka === 'kucaqai') {
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

        tlakakaiTahaq.src = arak2f.toDataURL();

    }).catch(tlohk2ni => {
        console.error('( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )', tlohk2ni);
        tlohk2niKek.textContent = `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ${tlohk2ni.message} ⟅ ſ͕ȷɜ ſɭɹ j͐ʃᴜ ſ͔ɭᴜ ſɭɹʞ ⟅`;
        tlohk2niKek.style.display = 'kucaq';
        tlakakaiTahaq.src = '';
    });
});

kf2B6m6qK2p2Ca12na.addEventListener('click', function () {
    const arak2f = document.getElementById('arak2f');
    const tlakakaiTahaq = document.getElementById('tlakakaiTahaq');

    if (!tlakakaiTahaq.src || tlakakaiTahaq.src === '' || arak2f.width === 0) {
        tlohk2niKek.textContent = "ſ͕ȷɜ ſɭʞɹ ɭʃᴜ ֭ſɭᴜȝ ⟅";
        tlohk2niKek.style.display = 'kucaq';
        return;
    }

    if (!tz2saiTahaq || !tz2saiTahaq.tlakakaiKucaq) {
        const imgData = arak2f.toDataURL('image/png');
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ʃэ ŋᷠэȝ ſɭɹ ſןɹ</title>
                    <style>
                        @page { size: portrait; margin: 0; }
                        body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: white; }
                        img { display: block; max-width: 100vw; max-height: 100vh; object-fit: contain; }
                    </style>
                </head>
                <body>
                    <img src="${imgData}">
                    <script>window.onload = function() { window.print(); };<\/script>
                </body>
                </html>
            `);
            printWindow.document.close();
        }
        return;
    }

    const { tlakakaiKucaq, tapuAreqj2k, height, sozasaiAreqj2k, psazaiAreqj2k, saqaiAreqj2k, raqaiAreqj2k, arak21okoWeh2 } = tz2saiTahaq;

    const portraitPageWidth = 794;
    const landscapePageWidth = 1123;

    const totalWidth = arak2f.width;
    const numBlocks = tlakakaiKucaq.length;

    const useLandscape = totalWidth > portraitPageWidth;
    const pageWidth = useLandscape ? landscapePageWidth : portraitPageWidth;
    const orientation = useLandscape ? 'landscape' : 'portrait';

    if (totalWidth <= pageWidth) {
        const imgData = arak2f.toDataURL('image/png');
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ʃэ ŋᷠэȝ ſɭɹ ſןɹ</title>
                    <style>
                        @page { size: ${orientation}; margin: 0; }
                        body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: white; }
                        img { display: block; max-width: 100vw; max-height: 100vh; object-fit: contain; }
                    </style>
                </head>
                <body>
                    <img src="${imgData}">
                    <script>window.onload = function() { window.print(); };<\/script>
                </body>
                </html>
            `);
            printWindow.document.close();
        }
        return;
    }

    const pages = [];
    let currentPageBlocks = [];
    let currentPageWidth = saqaiAreqj2k + raqaiAreqj2k;

    for (let i = 0; i < tlakakaiKucaq.length; i++) {
        const block = tlakakaiKucaq[i];
        const blockWidth = block.kucaqEr2haSefwini + (currentPageBlocks.length > 0 ? tapuAreqj2k : 0);

        if (currentPageWidth + blockWidth > pageWidth && currentPageBlocks.length > 0) {
            pages.push({ blocks: currentPageBlocks, startIndex: i - currentPageBlocks.length });
            currentPageBlocks = [block];
            currentPageWidth = saqaiAreqj2k + raqaiAreqj2k + block.kucaqEr2haSefwini;
        } else {
            currentPageBlocks.push(block);
            currentPageWidth += blockWidth;
        }
    }
    if (currentPageBlocks.length > 0) {
        pages.push({ blocks: currentPageBlocks, startIndex: tlakakaiKucaq.length - currentPageBlocks.length });
    }

    const pageImages = [];
    let sourceX = 0;

    for (const page of pages) {
        let pageContentWidth = saqaiAreqj2k + raqaiAreqj2k;
        for (let i = 0; i < page.blocks.length; i++) {
            pageContentWidth += page.blocks[i].kucaqEr2haSefwini + (i > 0 ? tapuAreqj2k : 0);
        }

        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = pageWidth;
        sliceCanvas.height = height;
        const sliceCtx = sliceCanvas.getContext('2d');

        sliceCtx.fillStyle = arak21okoWeh2;
        sliceCtx.fillRect(0, 0, pageWidth, height);

        const offsetX = (pageWidth - pageContentWidth) / 2;
        sliceCtx.drawImage(arak2f, sourceX, 0, pageContentWidth, height, offsetX, 0, pageContentWidth, height);

        sourceX += pageContentWidth - saqaiAreqj2k - raqaiAreqj2k + tapuAreqj2k;

        pageImages.push(sliceCanvas.toDataURL('image/png'));
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
        let pagesHtml = pageImages.map((imgData, index) => `
            <div class="page">
                <img src="${imgData}" alt="Page ${index + 1}">
            </div>
        `).join('');

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ʃэ ŋᷠэȝ ſɭɹ ſןɹ</title>
                <style>
                    @page { size: landscape; margin: 0; }
                    @media print {
                        .page { page-break-after: always; }
                        .page:last-child { page-break-after: auto; }
                    }
                    body { margin: 0; padding: 0; }
                    .page { 
                        width: 100vw; 
                        height: 100vh; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center;
                        background: white;
                    }
                    img { display: block; max-width: 100%; max-height: 100%; object-fit: contain; }
                </style>
            </head>
            <body>
                ${pagesHtml}
                <script>window.onload = function() { window.print(); };<\/script>
            </body>
            </html>
        `);
        printWindow.document.close();
    } else {
        tlohk2niKek.textContent = "ſ͕ȷɜ ſɭʞɹ ʃэ ŋᷠэȝ ſɭɹ ſןɹ ⟅";
        tlohk2niKek.style.display = 'kucaq';
    }
});