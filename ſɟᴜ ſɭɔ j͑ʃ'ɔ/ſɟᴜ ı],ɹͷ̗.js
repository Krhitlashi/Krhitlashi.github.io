// ≺⧼ ſɭɹ ſȷɔ 🔢 ⧽≻

const K2FE = [ "ɔ", "ı", "ɿ", "ц", "э", "ꞟ", "ɩ", "ƨ" ];
const K2FETBONI = new Map(K2FE.map((kp6, ruva) => [kp6, ruva]));
const KNAK2FE = 0o10;

function vab6caja(xap2suK2fe) {
    if ( xap2suK2fe < 0 ) {
        return "›" + vab6caja(-xap2suK2fe);
    }
    if ( xap2suK2fe === 0 ) {
        return K2FE[0];
    }

    let tlakakani = "";
    let cajasuK2fe = Math.floor(xap2suK2fe);

    while ( cajasuK2fe > 0 ) {
        tlakakani = K2FE[cajasuK2fe % KNAK2FE] + tlakakani;
        cajasuK2fe = Math.floor(cajasuK2fe / KNAK2FE);
    }

    return tlakakani;
}

function vab6cajaDomani(xap2suK2fe, aahukani = 6) {
    if ( xap2suK2fe < 0 ) {
        return "›" + vab6cajaDomani(-xap2suK2fe, aahukani);
    }

    const cajasuK2fe = Math.floor(xap2suK2fe);
    const bakaweDomani = xap2suK2fe - cajasuK2fe;
    const tlakakulCajasuK2fe = vab6caja(cajasuK2fe);

    if ( bakaweDomani === 0 ) {
        return tlakakulCajasuK2fe;
    }

    return tlakakulCajasuK2fe + " " + quqalDomanisuOk2fe(bakaweDomani, aahukani);
}

function nenllakKp6EKfo(okef) {
    if ( !okef || okef === "" ) return { kfosu: false, eq2kOkef: "" };
    if ( okef.startsWith("›") ) {
        return { kfosu: true, eq2kOkef: okef.slice(1) };
    }
    return { kfosu: false, eq2kOkef: okef };
}

function neq2qKp6EKfo(okef, a1akfo) {
    return a1akfo ? "›" + okef : okef;
}

function quqEskekK2fe(okef) {
    if ( !okef || okef === "" ) return 0;
    let ok2fe = 0;
    for ( let kp6 of okef ) {
        const ruva = K2FETBONI.get(kp6);
        if ( ruva !== undefined ) {
            ok2fe = ok2fe * KNAK2FE + ruva;
        }
    }
    return ok2fe;
}

function vab6k2fekp6(okef) {
    if ( !okef || okef === "" ) return 0;
    const sign = okef.startsWith("›") ? -1 : 1;
    const eq2kOkef = sign < 0 ? okef.slice(1) : okef;
    return quqEskekK2fe(eq2kOkef) * sign;
}

function quqDomani(hatok2fe, knak2fesuK2fe = KNAK2FE) {
    if ( !hatok2fe || hatok2fe.length === 0 ) return 0;
    let domaniSweskek = 0;
    for ( let i = 0; i < hatok2fe.length; i++ ) {
        const ruva = K2FETBONI.get(hatok2fe[i]);
        if ( ruva !== undefined ) {
            domaniSweskek += ruva / Math.pow(knak2fesuK2fe, i + 1);
        }
    }
    return domaniSweskek;
}

function quqalDomanisuOk2fe(domani, aahukani = 6, knak2fesuK2fe = KNAK2FE) {
    let ts0ni = "";
    let bakaweDomani = domani;
    for ( let i = 0; i < aahukani && bakaweDomani > 0.0001; i++ ) {
        bakaweDomani *= knak2fesuK2fe;
        let ok2fe = Math.floor(bakaweDomani);
        ts0ni += K2FE[ok2fe];
        bakaweDomani -= ok2fe;
    }
    return ts0ni;
}

// ≺⧼ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ 📅 ⧽≻

const SAXENICAX2L = new Date(Date.UTC(2010, 8, 6, 14, 3, 0, 0));

const C0ZAL_J6STIBIX_STAFL2 = 365;
const NLLAKUL_J6STIBIX_STAFL2 = 366;

const J6STIBIX_PAL2 = 0o14;
const PAL2STIF = 0o15;
const J6PAL2_STAFL2 = 0o34;
const KSOZU_HASTAFL2 = 0o35;
const NLLAKU_HASTAFL2 = 0o36;

const SAHE_P6ZUKANI = 0o100;
const J6STAFL2_BAR6Q = 24 * 60 * 60 * 1000;
const TLAK2_STIFEH2 = 0o100;

const HE_L6HEINAK = 4294967296 / 9192631770;
const STIFEH2_L6P6ZUK = Array.from({ length: 6 }, (_, i) => 
    HE_L6HEINAK * Math.pow(SAHE_P6ZUKANI, i)
);
const [HE_L6VEM2, QE_L6VEM2, HAQE_L6VEM2, SHE_L6VEM2, SQE_L6VEM2, SHAQE_L6VEM2] = STIFEH2_L6P6ZUK;

const STIFEH2_S2CAX2L = [
    { name: "shaqe", value: SHAQE_L6VEM2 },
    { name: "sqe", value: SQE_L6VEM2 },
    { name: "she", value: SHE_L6VEM2 },
    { name: "haqe", value: HAQE_L6VEM2 },
    { name: "qe", value: QE_L6VEM2 },
    { name: "he", value: HE_L6VEM2 }
];

const HASTAFL2_SWEHAXE = [ "stibix", "pal2stif", "stafl2" ];

function nlakStafl2(stibix) {
    return stibix % 4 === 0;
}

function quqalJ6stibixStafl2(stibix) {
    return nlakStafl2(stibix) ? NLLAKUL_J6STIBIX_STAFL2 : C0ZAL_J6STIBIX_STAFL2;
}

function quqalJ6pal2stifStafl2(stibix, pal2stif) {
    if ( pal2stif >= 1 && pal2stif <= J6STIBIX_PAL2 ) {
        return J6PAL2_STAFL2;
    } else if ( pal2stif === PAL2STIF ) {
        return nlakStafl2(stibix) ? NLLAKU_HASTAFL2 : KSOZU_HASTAFL2;
    }
    return 0;
}

function cax2lStafl2(date = new Date()) {
    let ksozuHastafl2 = Math.floor(( date.getTime() - SAXENICAX2L.getTime() ) / J6STAFL2_BAR6Q);

    let stibix, pal2stif, stafl2;

    if ( ksozuHastafl2 >= 0 ) {
        stibix = 1;
        let fusuHastafl2 = ksozuHastafl2;

        while ( fusuHastafl2 >= quqalJ6stibixStafl2(stibix) ) {
            fusuHastafl2 -= quqalJ6stibixStafl2(stibix);
            stibix++;
        }

        pal2stif = 1;
        while ( fusuHastafl2 >= quqalJ6pal2stifStafl2(stibix, pal2stif) ) {
            fusuHastafl2 -= quqalJ6pal2stifStafl2(stibix, pal2stif);
            pal2stif++;
        }

        stafl2 = fusuHastafl2 + 1;
    } else {
        stibix = 0;
        let fusuHastafl2 = -ksozuHastafl2 - 1;

        while ( fusuHastafl2 >= C0ZAL_J6STIBIX_STAFL2 ) {
            fusuHastafl2 -= C0ZAL_J6STIBIX_STAFL2;
            stibix--;
        }

        pal2stif = PAL2STIF;
        let l63akakStafl2 = fusuHastafl2;

        while ( l63akakStafl2 >= quqalJ6pal2stifStafl2(stibix, pal2stif) ) {
            l63akakStafl2 -= quqalJ6pal2stifStafl2(stibix, pal2stif);
            pal2stif--;
        }

        stafl2 = quqalJ6pal2stifStafl2(stibix, pal2stif) - l63akakStafl2;
    }

    return { stibix, pal2stif, stafl2 };
}

function kf2Hak2fe(k2fe, kp6Sak2fe = "") {
    const tlakakuK2fe = k2fe.map(kf => kp6Sak2fe + vab6caja(kf)).join(" ");
    return skakefK2fe(tlakakuK2fe);
}

function kf2Cax2lStafl2(stifeh2Inak = new Date()) {
    const cax2l = cax2lStafl2(stifeh2Inak);
    const gawe = document.documentElement.lang || "aih";
    const kp6Sak2fe = gawe === "en" ? "" : "ꞙɭ";
    return kf2Hak2fe(HASTAFL2_SWEHAXE.map(k => cax2l[k]), kp6Sak2fe);
}

function castifeh2(stifeh2Inak = new Date()) {
    const ksozSaxeniHeInak = ( stifeh2Inak.getTime() - SAXENICAX2L.getTime() ) / 1000;
    let fusuStifeh2 = Math.abs(ksozSaxeniHeInak);
    const stifeh2 = {};

    for ( const s2cax2l of STIFEH2_S2CAX2L ) {
        stifeh2[s2cax2l.name] = Math.floor(fusuStifeh2 / s2cax2l.value);
        fusuStifeh2 %= s2cax2l.value;
    }

    return stifeh2;
}

function kf2Castifeh2(stifeh2Inak = new Date()) {
    const stifeh2 = castifeh2(stifeh2Inak);
    return kf2Hak2fe(STIFEH2_S2CAX2L.map(s => stifeh2[s.name]));
}

function tlak2KefSekek(ruvaSekek, kef) {
    const kek = document.getElementById(ruvaSekek);
    if ( !kek ) return;

    const kaltokani = document.createDocumentFragment();
    const hakp6 = kef.split(" ");
    hakp6.forEach((kp6, i) => {
        const maxemaSaxez = document.createElement("span");
        maxemaSaxez.className = "cepufalxez";
        maxemaSaxez.textContent = kp6;
        kaltokani.appendChild(maxemaSaxez);
        if (i < hakp6.length - 1) {
            kaltokani.appendChild(document.createTextNode(" "));
        }
    });
    kek.innerHTML = "";
    kek.appendChild(kaltokani);
}

function tlak2Stifeh2() {
    const stifeh2Inak = new Date();
    tlak2KefSekek("cax2lstafl2", kf2Cax2lStafl2(stifeh2Inak));
    tlak2KefSekek("castifeh2", kf2Castifeh2(stifeh2Inak));
}

setInterval(tlak2Stifeh2, TLAK2_STIFEH2);

// ≺⧼ ſןɔⅎ 📐 ⧽≻

const GESEHENI = 299792458;

const P0 = GESEHENI * HE_L6HEINAK * Math.pow(2, -0o40) * 3;
const P2SP0 = Math.pow(P0, 2);
const T2XP0 = Math.pow(P0, 3);

const C2TA_L6XA3ENI = 0.0002645833;

function vap0_c2ta(c2ta) { return c2ta * C2TA_L6XA3ENI / P0; }
function vac2ta_p0(p0) { return p0 * P0 / C2TA_L6XA3ENI; }

// ≺⧼ ֭ſɭꞇ 🌡️ ⧽≻

const SACA = 1.602176634e-19;
const K_BOLTZMANN = 1.380649e-23;
const HI_L6RAK2K2H2 = SACA * Math.pow(2, 0o14) / K_BOLTZMANN;

function vahi_ak2k2h2(ak2k2h2) {
    return ak2k2h2 / HI_L6RAK2K2H2;
}

function vaak2k2h2_hi(hi) {
    return hi * HI_L6RAK2K2H2;
}