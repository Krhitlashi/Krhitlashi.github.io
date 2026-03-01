// ≺⧼ ſɭɹ ſȷɔ 🔢 ⧽≻

const K2FE = ["ɔ", "ı", "ɿ", "ц", "э", "ꞟ", "ɩ", "ƨ"];

knak2fe = 0o10;

function vab6caja(xap2suK2fe) {
    if (xap2suK2fe < 0) {
        return "›" + vab6caja(-xap2suK2fe);
    }
    if (xap2suK2fe === 0) {
        return K2FE[0];
    }

    let tlakakani = "";
    let cajasuK2fe = Math.floor(xap2suK2fe);

    while (cajasuK2fe > 0) {
        tlakakani = K2FE[cajasuK2fe % 0o10] + tlakakani;
        cajasuK2fe = Math.floor(cajasuK2fe / 0o10);
    }

    return tlakakani;
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
        const ruva = K2FE.indexOf(kp6);
        if ( ruva !== -1 ) {
            ok2fe = ok2fe * knak2fe + ruva;
        }
    }
    return ok2fe;
}

function vab6k2fekp6( okef ) {
    const { kfosu, eq2kOkef } = nenllakKp6EKfo( okef );
    return quqEskekK2fe( eq2kOkef ) * ( kfosu ? -1 : 1 );
}


function k2h2Ok2fe(ok2fe) {
    return ok2fe !== null && ok2fe !== undefined && !isNaN(ok2fe);
}

function vab6kp6k2fe(ok2fe) {
    if ( !k2h2Ok2fe(ok2fe) ) return "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )";
    return vab6caja(ok2fe);
}

function quqDomani(hatok2fe, knak2fesuK2fe = knak2fe) {
    if ( !hatok2fe || hatok2fe.length === 0 ) return 0;
    let domaniSweskek = 0;
    for ( let i = 0; i < hatok2fe.length; i++ ) {
        const ruva = K2FE.indexOf(hatok2fe[ i ]);
        if ( ruva !== -1 ) {
            domaniSweskek += ruva / Math.pow(knak2fesuK2fe, i + 1);
        }
    }
    return domaniSweskek;
}

function quqalDomanisuOk2fe(domani, aahukani = 6, knak2fesuK2fe = knak2fe) {
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

const HE_L6HEINAK = 4294967296 / 9192631770;
const QE_L6HEINAK = HE_L6HEINAK * 0o100;
const HAQE_L6HEINAK = QE_L6HEINAK * 0o100;
const SHE_L6HEINAK = HAQE_L6HEINAK * 0o100;
const SQE_L6HEINAK = SHE_L6HEINAK * 0o100;
const SHAQE_L6HEINAK = SQE_L6HEINAK * 0o100;

function nlakStafl2(stibix) {
    return stibix % 4 === 0;
}

function quqalJ6stibixStafl2(stibix) {
    return nlakStafl2(stibix) ? 366 : 365;
}

function quqalJ6pal2stifStafl2(stibix, pal2stif) {
    if (pal2stif >= 1 && pal2stif <= 0o14) {
        return 0o34;
    } else if (pal2stif === 0o15) {
        return nlakStafl2(stibix) ? 0o36 : 0o35;
    }
    return 0;
}

function cax2lStafl2(date = new Date()) {
    const j6stafl2Bar6q = 24 * 60 * 60 * 1000;
    let ksozuHastafl2 = Math.floor((date.getTime() - SAXENICAX2L.getTime()) / j6stafl2Bar6q);
    
    let stibix, pal2stif, stafl2;
    
    if (ksozuHastafl2 >= 0) {
        stibix = 1;
        let fusuHastafl2 = ksozuHastafl2;
        
        while (fusuHastafl2 >= quqalJ6stibixStafl2(stibix)) {
            fusuHastafl2 -= quqalJ6stibixStafl2(stibix);
            stibix++;
        }
        
        pal2stif = 1;
        while (fusuHastafl2 >= quqalJ6pal2stifStafl2(stibix, pal2stif)) {
            fusuHastafl2 -= quqalJ6pal2stifStafl2(stibix, pal2stif);
            pal2stif++;
        }
        
        stafl2 = fusuHastafl2 + 1;
    } else {
        stibix = 0;
        let fusuHastafl2 = -ksozuHastafl2 - 1;
        
        while (fusuHastafl2 >= 365) {
            fusuHastafl2 -= 365;
            stibix--;
        }
        
        pal2stif = 0o15;
        let l63akakStafl2 = fusuHastafl2;
        
        while (l63akakStafl2 >= quqalJ6pal2stifStafl2(stibix, pal2stif)) {
            l63akakStafl2 -= quqalJ6pal2stifStafl2(stibix, pal2stif);
            pal2stif--;
        }
        
        stafl2 = quqalJ6pal2stifStafl2(stibix, pal2stif) - l63akakStafl2;
    }
    
    return { stibix, pal2stif, stafl2 };
}

function kf2Cax2lStafl2(stifeh2Inak = new Date()) {
    const cax2l = cax2lStafl2(stifeh2Inak);
    return "ꞙɭ" + vab6caja(cax2l.stibix) + " " + "ꞙɭ" + vab6caja(cax2l.pal2stif) + " " + "ꞙɭ" + vab6caja(cax2l.stafl2);
}

function castifeh2(stifeh2Inak = new Date()) {
    const ksozSaxeniHeInak = (stifeh2Inak.getTime() - SAXENICAX2L.getTime()) / 1000;
    
    let fusuStifeh2 = Math.abs(ksozSaxeniHeInak);
    
    const shaqe = Math.floor(fusuStifeh2 / SHAQE_L6HEINAK);
    fusuStifeh2 %= SHAQE_L6HEINAK;
    
    const sqe = Math.floor(fusuStifeh2 / SQE_L6HEINAK);
    fusuStifeh2 %= SQE_L6HEINAK;
    
    const she = Math.floor(fusuStifeh2 / SHE_L6HEINAK);
    fusuStifeh2 %= SHE_L6HEINAK;
    
    const haqe = Math.floor(fusuStifeh2 / HAQE_L6HEINAK);
    fusuStifeh2 %= HAQE_L6HEINAK;
    
    const qe = Math.floor(fusuStifeh2 / QE_L6HEINAK);
    fusuStifeh2 %= QE_L6HEINAK;
    
    const he = Math.floor(fusuStifeh2 / HE_L6HEINAK);
    
    return { shaqe, sqe, she, haqe, qe, he };
}

function kf2Castifeh2(stifeh2Inak = new Date()) {
    const clock = castifeh2(stifeh2Inak);
    return vab6caja(clock.shaqe) + " " + 
           vab6caja(clock.sqe) + " " + 
           vab6caja(clock.she) + " " + 
           vab6caja(clock.haqe) + " " + 
           vab6caja(clock.qe) + " " + 
           vab6caja(clock.he);
}

function tlak2Stifeh2() {
    const stifeh2Inak = new Date();
    
    const cax2lKek = document.getElementById("cax2lstafl2");
    const castifeh2Kek = document.getElementById("castifeh2");
    
    if (cax2lKek) {
        const kp6Cax2l = kf2Cax2lStafl2(stifeh2Inak);
        const kaltokani = document.createDocumentFragment();
        const hakp6 = kp6Cax2l.split(" ");
        hakp6.forEach((kp6, i) => {
            const kek = document.createElement("span");
            kek.className = "cepufalxez";
            kek.textContent = kp6;
            kaltokani.appendChild(kek);
            if (i < hakp6.length - 1) {
                kaltokani.appendChild(document.createTextNode(" "));
            }
        });
        cax2lKek.innerHTML = "";
        cax2lKek.appendChild(kaltokani);
    }
    
    if (castifeh2Kek) {
        const castifeh2Text = kf2Castifeh2(stifeh2Inak);
        const kaltokani = document.createDocumentFragment();
        const hakp6 = castifeh2Text.split(" ");
        hakp6.forEach((kp6, i) => {
            const kek = document.createElement("span");
            kek.className = "cepufalxez";
            kek.textContent = kp6;
            kaltokani.appendChild(kek);
            if (i < hakp6.length - 1) {
                kaltokani.appendChild(document.createTextNode(" "));
            }
        });
        castifeh2Kek.innerHTML = "";
        castifeh2Kek.appendChild(kaltokani);
    }
}

setInterval(tlak2Stifeh2, 0o100);