// ≺⧼ ſɟᴜ ſɭɹ ſȷɔ 0o10 - ſɟᴜ ſɭɔ j͑ʃ'ɔ ⧽≻

// ⟪ j͑ʃɔ ſɭɘэ ʃᴜ j͐ʃɹ ı],ᴜ 🔣 ⟫

// ⟨ j͑ʃɔ ſɭ,ɔ }ʃꞇ ſɭɘэ ⟩
const hatKp6 = {
    kf2: "x",
    ne1a: "›",
    kf2Pu: "ɘ",
    ne1aPu: "ꭎ",
    kf2Kf2: "ɘɘ",
    ne1aKf2: "ꭎꭎ",
    xekox2q: "=",
    ne1aKp6: "›",
    domani: "ɔ"
};

// ⟨ j͑ʃᴜ ſɟᴜͷ̗ ꞁȷ̀ᴜͷ̗ j͑ʃɔƣ̋ ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɔ˞ᴜ ſɭᴜ ʃᴜ j͐ʃɹ ı],ᴜ ⟩
const kp6HatBal2xa = {
    "x": "kf2",
    "›": "ne1a",
    "ɘ": "kf2Pu",
    "ꭎ": "ne1aPu",
    "ɘɘ": "kf2Kf2",
    "ꭎꭎ": "ne1aKf2"
};

// ⟪ ſɭɹ ſᶘɔ j͐ʃ ſɭᶗ‹ɔ ꞁȷ̀ɔ j͑ʃƽɔƽ 💾 ⟫

// ⟨ j͑ʃɔ ſɟᴜ ſɭɹ ſȷɔ j͐ʃ ſɭᶗ‹ɔ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
let kxesuK2fe = 0;
let saxeK2fe = 0;
let kxesuHat = null;
let kxesuK61e = 0;
let suntaV3ak2 = false;

// ⟨ ſɟᴜ ſȷᴜɔ˞ ſɭᴜͷ̗ ꞁȷ̀эⅎ ſᶘɔ }ʃꞇ ⟩
let domaniHat = true;
let xemaSaxe = false;
let hatDomani = false;
let domaniKsaka = "";
let xemaK61e = "";

// ⟪ DOM ſɭɔƽ 🔧 ⟫

const saxeSuntaKek = document.getElementById( "esprimo" );
const kxesuSuntaKek = document.getElementById( "k61e" );
const s2XemaKek = document.getElementById( "tastaro" );
const k61eCa1araKuba = document.getElementById( "historio-ujo" );

// ⟪ j͑ʃɔƣ̋ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🛠️ ⟫

// ⟨ j͑ʃɔ ſɭɹ ſᶘɔ ꞁȷ̀ɔ j͑ʃƽɔƽ ɭʃɜ j͑ʃᴜᶗ‹ ꞁȷ̀ᴜ }ʃꞇ ⟩
function ne1aPuXema() {
    kxesuK2fe = 0;
    saxeK2fe = 0;
    kxesuHat = null;
    kxesuK61e = 0;
    xemaSaxe = false;
    hatDomani = false;
    domaniKsaka = "";
    xemaK61e = "";
}

// ⟨ j͑ʃɔ }ʃᴜ ŋᷠᴜ ꞁȷ̀эⅎ ſᶘɔ }ʃꞇ ɭʃɜ j͑ʃᴜᶗ‹ ꞁȷ̀ᴜ }ʃꞇ ⟩
function ne1aXema() {
    xemaSaxe = false;
    hatDomani = false;
    domaniKsaka = "";
}

// ⟪ j͑ʃᴜ ɭʃɀɜ }ʃꞇ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🔄 ⟫ ( ſɭɹ ſɟᴜ ı],ɹͷ̗.js )

// ⟨ j͑ʃɔ ſɭɹ ſȷɔ j͐ʃ j͑ʃɔ ſɟᴜ ſȷᴜɔ˞ ı],ɔ ſɭᴜc̗ ɭʃᴜ ɭʃɀɜ }ʃꞇ ⟩
function kf2Sunta( k2fe ) {
    return domaniHat ? vab6cajaDomani( k2fe ) : vab6caja( k2fe );
}

// ⟨ j͑ʃɔ ſɭᶗ‹ɔ ꞁȷ̀ɔ j͑ʃƽɔƽ ꞁȷ̀ᴜͷ̗ ꞁȷ̀ɹ j͑ʃɔ ɭ(ɜ ŋᷠᴜ }ʃꞇ ſɭɔƽ ʃɜƽ ꞁȷ̀ᴜ }ʃꞇ ⟩
function quqKxesuK2fe() {
    if ( !domaniHat || !hatDomani || domaniKsaka.length === 0 ) {
        return kxesuK2fe;
    }
    const domaniK2fe = quqDomani( domaniKsaka );
    const k61e = Math.abs( kxesuK2fe ) + domaniK2fe;
    return kxesuK2fe < 0 ? -k61e : k61e;
}

// ⟨ ſɭɹ ſɭɹ ſȷɔ ꞁȷ̀ɔ ɽ͑ʃ'ɹ ֭ſɭᴜ j͐ʃ ſɭɹ j͑ʃɔ ɭ(ɜ ŋᷠᴜ }ʃꞇ ſɭɔƽ ʃɜƽ ꞁȷ̀ᴜ }ʃꞇ ⟩
function quqK2fe( puK2fe, domaniKsaka ) {
    if ( !domaniHat || !domaniKsaka || domaniKsaka.length === 0 ) {
        return puK2fe;
    }
    const domaniK2fe = quqDomani( domaniKsaka );
    const k61e = Math.abs( puK2fe ) + domaniK2fe;
    return puK2fe < 0 ? -k61e : k61e;
}

// ⟨ j͑ʃɔ ſɭɹ ſȷɔ j͐ʃ ſɭᶗ‹ɔ ꞁȷ̀ɔ j͑ʃƽɔƽ }ʃɔ ſ͕ɭɹȝ ꞁȷ̀ᴜ }ʃꞇ ⟩
function xemaKxesuK2fe( k2fe ) {
    if ( !domaniHat ) {
        kxesuK2fe = Math.round( k2fe );
        ne1aXema();
        return;
    }
    let ne1aHat = k2fe < 0;
    k2fe = Math.abs( k2fe );
    kxesuK2fe = Math.floor( k2fe );
    if ( ne1aHat ) kxesuK2fe = -kxesuK2fe;

    let domaniS2 = k2fe - Math.floor( k2fe );
    domaniKsaka = "";
    hatDomani = false;

    if ( domaniS2 > 0.0001 ) {
        hatDomani = true;
        domaniKsaka = quqalDomanisuOk2fe( domaniS2 );
    }
}

// ⟨ j͑ʃɔ j͑ʃ'ᴜ ᶅſɔ }ʃꞇ ſɭɹ ɽ͑ʃ'ɔ }ʃꞇ ⟩
function xemaNe1aS2() {
    ne1aS2();
}

// ⟪ j͑ʃɔ ſɟᴜ ſȷᴜɔ˞ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🖥️ ⟫

// ⟨ ſɭᶗ‹ɔ j͐ʃ j͑ʃɔ ſɟᴜ ſȷᴜɔ˞ ꞁȷ̀ɔ j͑ʃƽɔƽ ʃɜƽ ꞁȷ̀ᴜ }ʃꞇ ⟩
function quqSuntaK61e() {
    if ( domaniHat ) {
        let k61e = vab6cajaDomani( Math.abs( kxesuK2fe ) );
        if ( hatDomani ) {
            k61e = vab6caja( Math.abs( kxesuK2fe ) ) + " " + domaniKsaka;
        }
        k61e = skakefK2fe( k61e );
        return neq2qKp6EKfo( k61e, kxesuK2fe < 0 );
    } else {
        let k61e = vab6caja( kxesuK2fe );
        return skakefK2fe( k61e );
    }
}

// ⟨ j͑ʃɔ ſɭᶗ‹ɔ ꞁȷ̀ɔ j͑ʃƽɔƽ ꞁȷ̀ᴜͷ̗ j͑ʃᴜ ſɟᴜ ſȷᴜɔ˞ ʃɜƽ ꞁȷ̀ᴜ }ʃꞇ ⟩
function quqKxesuSunta() {
    if ( domaniHat && hatDomani ) {
        return quqSuntaK61e();
    }
    let k61e = kf2Sunta( kxesuK2fe );
    return skakefK2fe( k61e );
}

// ⟨ j͑ʃɔ j͑ʃɔ ſɭ,ɔ }ʃꞇ ſɭɘэ ʃɜƽ ꞁȷ̀ᴜ }ʃꞇ ⟩
function quqHatKp6( hat ) {
    switch ( hat ) {
        case "kf2": return hatKp6.kf2;
        case "ne1a": return hatKp6.ne1a;
        case "kf2Pu": return hatKp6.kf2Pu;
        case "ne1aPu": return hatKp6.ne1aPu;
        case "kf2Kf2": return hatKp6.kf2Kf2;
        case "ne1aKf2": return hatKp6.ne1aKf2;
        case "xekox2q": return hatKp6.xekox2q;
        default: return hat;
    }
}

// ⟨ j͑ʃɔ j͑ʃɔ ſɟᴜ ſȷᴜɔ˞ ſɭɔƽ ſ̀ȷᴜ ſɭɹ }ʃꞇ ⟩
function v3ak2Sunta() {
    const kxesuSunta = quqKxesuSunta();
    const saxeSunta = kf2Sunta( saxeK2fe );
    const kp6 = quqHatKp6( kxesuHat );

    if ( kxesuHat && xemaSaxe && saxeK2fe !== 0 ) {
        saxeSuntaKek.textContent = `${ kp6 } ${ saxeSunta } c ${ kxesuSunta }`;
    } else if ( kxesuHat && xemaSaxe ) {
        saxeSuntaKek.textContent = `${ kp6 } ${ kxesuSunta }`;
    } else if ( kxesuHat && saxeK2fe !== 0 ) {
        saxeSuntaKek.textContent = `${ kp6 } ${ saxeSunta } c`;
    } else if ( kxesuHat ) {
        saxeSuntaKek.textContent = kp6;
    } else if ( saxeK2fe !== 0 && !xemaSaxe ) {
        saxeSuntaKek.textContent = saxeSunta + " c";
    } else {
        saxeSuntaKek.textContent = kxesuSunta;
    }

    kxesuSuntaKek.textContent = kxesuSunta;
}

function xemaK2fe( kp6 ) {
    if ( suntaV3ak2 ) {
        kxesuK2fe = 0;
        suntaV3ak2 = false;
        ne1aXema();
    }

    if ( !xemaSaxe ) {
        kxesuK2fe = 0;
        xemaSaxe = true;
    }

    const k2feRuva = K2FE.indexOf( kp6 );
    if ( k2feRuva !== -1 ) {
        if ( domaniHat && hatDomani ) {
            domaniKsaka += kp6;
        } else {
            kxesuK2fe = kxesuK2fe * KNAK2FE + k2feRuva;
        }
        v3ak2Sunta();
    }
}

function xemaDomani() {
    if ( !domaniHat ) return;
    if ( !xemaSaxe ) {
        xemaSaxe = true;
        kxesuK2fe = 0;
    }
    if ( !hatDomani ) {
        hatDomani = true;
        domaniKsaka = "";
    }
    v3ak2Sunta();
}

function xemaHat( hat ) {
    if ( saxeK2fe !== 0 && xemaSaxe ) {
        kf2K61e();
        kxesuHat = hat;
        xemaSaxe = false;
        suntaV3ak2 = false;
        v3ak2Sunta();
        return;
    }

    if ( saxeK2fe === 0 && !xemaSaxe ) {
        saxeK2fe = kxesuK2fe;
        kxesuK2fe = 0;
    }

    // j͑ʃɔ ſɭᶗ‹ɔ ꞁȷ̀ɔ j͑ʃƽɔƽ ꞁȷ̀ɹ j͑ʃɔ ɭ(ɜ ŋᷠᴜ }ʃꞇ ſɭɔƽ j͑ʃ'ɔ ſ̀ȷᴜȝ ꞁȷ̀ᴜ }ʃꞇ ſɭˬɹ ſɭᴜ j͑ʃᴜ j͑ʃɔ ſɭ,ɔ }ʃꞇ ſɭw ʃɜ }ʃꞇ
    if ( xemaSaxe ) {
        saxeK2fe = quqKxesuK2fe();
        kxesuK2fe = 0;
        ne1aXema();
    }

    kxesuHat = hat;
    suntaV3ak2 = false;
    v3ak2Sunta();
}

// ⟪ j͑ʃɔ ſɭc̗ᴜ j͑ʃ'ɔ ſɭɹ ſȷɔ }ʃꞇ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🧮 ⟫

// ⟨ j͑ʃɔ ſɭc̗ᴜ j͑ʃ'ɔ ſɭɹ ſȷɔ }ʃꞇ ſɭɹ ɽ͑ʃ'ɔ }ʃꞇ ⟩
function kf2K61e() {
    if ( !kxesuHat ) return;
    if ( saxeK2fe === 0 && kxesuK2fe === 0 && !hatDomani ) return;

    let k61e = 0;
    let saxeK2fe = quqK2fe( saxeK2fe, "" );
    let kxesuK2fe = quqKxesuK2fe();

    switch ( kxesuHat ) {
        case "kf2":
            k61e = kxesuK2fe + saxeK2fe;
            break;
        case "ne1a":
            k61e = kxesuK2fe - saxeK2fe;
            break;
        case "kf2Pu":
            k61e = kxesuK2fe * saxeK2fe;
            break;
        case "ne1aPu":
            k61e = saxeK2fe !== 0 ? kxesuK2fe / saxeK2fe : 0;
            break;
        case "kf2Kf2":
            k61e = Math.pow( kxesuK2fe, saxeK2fe );
            break;
        case "ne1aKf2":
            k61e = Math.pow( kxesuK2fe, 1 / saxeK2fe );
            break;
        default:
            return;
    }

    const saxeSunta = kf2Sunta( saxeK2fe );
    const kxesuSunta = quqKxesuSunta();
    const k61eSunta = kf2Sunta( k61e );
    const kp6 = quqHatKp6( kxesuHat );

    const k61eKek = document.createElement( "p" );
    k61eKek.className = "ksakap2sa";
    k61eKek.textContent = `${ kp6 } ${ kxesuSunta } c ${ saxeSunta } = ${ k61eSunta }`;
    k61eCa1araKuba.prepend( k61eKek );

    kxesuK61e = k61e;
    xemaKxesuK2fe( k61e );
    saxeK2fe = 0;
    kxesuHat = null;
    xemaSaxe = false;
    suntaV3ak2 = true;

    kxesuSuntaKek.textContent = quqKxesuSunta();
}

// ⟪ j͑ʃɔ ſɭᴜ ŋᷠᴜ }ʃꞇ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ 🎛️ ⟫

// ⟨ j͑ʃɔ ſɭɹ ſᶘɔ ꞁȷ̀ɔ j͑ʃƽɔƽ ſɭᴜͷ̗ ſɟᴜ ſȷᴜɔ˞ j͑ʃ'ᴜ ᶅſɔ }ʃꞇ ⟩
function ne1aSaxeAraq() {
    ne1aPuXema();
    saxeSuntaKek.textContent = "";
    kxesuSuntaKek.textContent = K2FE[ 0 ];
    k61eCa1araKuba.innerHTML = "";
}

// ⟨ j͑ʃɔ j͑ʃɔ ſɭɔƽ ꞁȷ̀эⅎ ſᶘɔ }ʃꞇ ı],ɔ ſɭɔ ŋᷠᴜ }ʃꞇ ⟩
function xemaS2() {
    if ( xemaSaxe ) {
        if ( saxeK2fe === 0 ) {
            saxeK2fe = quqKxesuK2fe();
            kxesuK2fe = 0;
            ne1aXema();
            xemaSaxe = false;
        } else if ( kxesuHat ) {
            kf2K61e();
        }
        v3ak2Sunta();
    }
}

// ⟨ j͑ʃɔ ſɭʞɜ ſɭw ʃɜ }ʃꞇ ⟩
function xemaNe1a() {
    if ( !xemaSaxe && kxesuK2fe === 0 && domaniKsaka.length === 0 ) return;
    kxesuK2fe = -kxesuK2fe;
    v3ak2Sunta();
}

// ⟨ j͑ʃɔ j͑ʃ'ᴜ ᶅſɔ }ʃꞇ ı],ɔ ſɭɔ ŋᷠᴜ }ʃꞇ ⟩
function ne1aS2() {
    if ( domaniHat && hatDomani && domaniKsaka.length > 0 ) {
        domaniKsaka = domaniKsaka.slice( 0, -1 );
        if ( domaniKsaka.length === 0 ) {
            hatDomani = false;
        }
    } else if ( domaniHat && hatDomani ) {
        hatDomani = false;
    } else {
        kxesuK2fe = Math.floor( kxesuK2fe / KNAK2FE );
        if ( kxesuK2fe === 0 ) xemaSaxe = false;
    }
    v3ak2Sunta();
}

// ⟪ j͑ʃɔ ſɟᴜͷ̗ j͐ʃw ſɭʞɔƽ ꞁȷ̀ᴜ }ʃꞇ 📡 ⟫

// ⟨ j͑ʃɔ j͑ʃɔ ſɟw ʃɹ ſᶘɹ }ʃᴜ }ʃw ſןɔ }ʃꞇ ⟩
s2XemaKek.querySelectorAll( ".k2fe-kek-ca1ara button, .keve-kek-ca1ara button, .kama-kek-ca1ara button" ).forEach( kek => {
    kek.addEventListener( "click", () => {
        const ksaka = kek.textContent;
        const kubaKsaka = kek.className;

        if ( ksaka === "c" ) { xemaS2(); return; }
        if ( kubaKsaka.includes( "k2re10-kek" ) ) { xemaDomani(); return; }
        else if ( kubaKsaka.includes( "k2fe-kek" ) ) xemaK2fe( ksaka );
        else if ( kubaKsaka.includes( "keve-kek" ) && kp6HatBal2xa[ ksaka ] ) xemaHat( kp6HatBal2xa[ ksaka ] );
        else if ( kubaKsaka.includes( "pu-kek" ) && ksaka === "›" ) xemaNe1a();
        else if ( kubaKsaka.includes( "ne1a-kek" ) && ksaka === "///" ) ne1aSaxeAraq();
        else if ( kubaKsaka.includes( "ne1a-kek" ) && ksaka === "⌫" ) xemaNe1aS2();
        else if ( kubaKsaka.includes( "kf2-kek" ) ) kf2K61e();
    } );
} );

// ⟨ j͑ʃɔ j͑ʃɔ ſɟw ʃɹ ſɟᴜͷ̗ ı],ɔ ſɭɔ ŋᷠᴜ }ʃꞇ ⟩
document.addEventListener( "keydown", ( e ) => {
    if ( K2FE.includes( e.key ) ) {
        xemaK2fe( e.key );
    } else if ( e.key === "." || e.key === "," ) {
        xemaDomani();
    } else if ( e.key === "Enter" || e.key === "=" ) {
        kf2K61e();
    } else if ( e.key === "Escape" ) {
        ne1aSaxeAraq();
    } else if ( e.key === "Backspace" ) {
        xemaNe1aS2();
    } else if ( e.key === "n" || e.key === "N" ) {
        xemaNe1a();
    }
} );

// ⟨ j͑ʃɔ ſɟᴜ ſȷᴜɔ˞ j͑ʃᴜ ı],ɔ }ʃꞇ ⟩
v3ak2Sunta();
