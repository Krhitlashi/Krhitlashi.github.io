// ≺⧼ Bazo-8 Kalkulilo - ſɟᴜ ſɭɔ j͑ʃ'ɔ ⧽≻

// ⟪ Simbolaj Mapoj 🔣 ⟫

// ⟨ Operatoraj simboloj ⟩
const opSimboloj = {
    adicio: "x",
    subtraho: "›",
    multipliko: "ɘ",
    divido: "ꭎ",
    potenco: "ɘɘ",
    radiko: "ꭎꭎ",
    egaleco: "=",
    negativo: "›",
    dekuma: "ɔ"
};

// ⟨ Operatora etiked-mapo por eventa pritraktado ⟩
const operatoraEtikedmapo = {
    "x": "adicio",
    "›": "subtraho",
    "ɘ": "multipliko",
    "ꭎ": "divido",
    "ɘɘ": "potenco",
    "ꭎꭎ": "radiko"
};

// ⟪ Stato-Variabloj 💾 ⟫

// ⟨ Nuna kalkula stato ⟩
let nunaValoro = 0;
let antaŭaValoro = 0;
let pritraktataOperatoro = null;
let lastaRezulto = 0;
let rekomencigiEkranon = false;

// ⟨ Ekrano kaj eniga reĝimo ⟩
let oktalaDekumaModo = true;
let enigoKomencita = false;
let ĉuFrakcia = false;
let frakciajCiferoj = "";
let historiaStako = "";

// ⟪ DOM-Elementoj 🔧 ⟫

const esprimoElemento = document.getElementById( "esprimo" );
const rezultoElemento = document.getElementById( "rezulto" );
const tastaroElemento = document.getElementById( "tastaro" );
const historiaUjoElemento = document.getElementById( "historio-ujo" );

// ⟪ Helpaj Funkcioj 🛠️ ⟫

// ⟨ Rekomencigi ĉiun kalkulan staton ⟩
function rekomencigiStaton() {
    nunaValoro = 0;
    antaŭaValoro = 0;
    pritraktataOperatoro = null;
    lastaRezulto = 0;
    enigoKomencita = false;
    ĉuFrakcia = false;
    frakciajCiferoj = "";
    historiaStako = "";
}

// ⟨ Rekomencigi nur enigan staton ⟩
function rekomencigiEniganStaton() {
    enigoKomencita = false;
    ĉuFrakcia = false;
    frakciajCiferoj = "";
}

// ⟪ Konvertaj Funkcioj 🔄 ⟫ ( uzante komunan ſɟᴜ ı],ɹͷ̗.js )

// ⟨ Konverti nombron al ekrana formato ⟩
function konvertiAlEkrano( nombro ) {
    return oktalaDekumaModo ? vab6cajaDomani( nombro ) : vab6caja( nombro );
}

// ⟨ Akiri nunan valoron kiel nombron kun frakcia parto ⟩
function akiriNunanNombron() {
    if ( !oktalaDekumaModo || !ĉuFrakcia || frakciajCiferoj.length === 0 ) {
        return nunaValoro;
    }
    const frakciaValoro = quqDomani( frakciajCiferoj );
    const rezulto = Math.abs( nunaValoro ) + frakciaValoro;
    return nunaValoro < 0 ? -rezulto : rezulto;
}

// ⟨ Akiri valoron kiel nombron el entjeraj kaj frakciaj ciferoj ⟩
function akiriValoronNombro( entjeraValoro, frakciciferoj ) {
    if ( !oktalaDekumaModo || !frakciciferoj || frakciciferoj.length === 0 ) {
        return entjeraValoro;
    }
    const frakciaValoro = quqDomani( frakciciferoj );
    const rezulto = Math.abs( entjeraValoro ) + frakciaValoro;
    return entjeraValoro < 0 ? -rezulto : rezulto;
}

// ⟨ Agordi nunan valoron el nombro ⟩
function agordiNunanValoronElNombro( nombro ) {
    if ( !oktalaDekumaModo ) {
        nunaValoro = Math.round( nombro );
        rekomencigiEniganStaton();
        return;
    }
    let negativa = nombro < 0;
    nombro = Math.abs( nombro );
    nunaValoro = Math.floor( nombro );
    if ( negativa ) nunaValoro = -nunaValoro;

    let frakciaParto = nombro - Math.floor( nombro );
    frakciajCiferoj = "";
    ĉuFrakcia = false;

    if ( frakciaParto > 0.0001 ) {
        ĉuFrakcia = true;
        frakciajCiferoj = quqalDomanisuOk2fe( frakciaParto );
    }
}

// ⟨ Efektivigi forigilon ⟩
function efektivigiForigilon() {
    traktiForigilon();
}

// ⟪ Ekranaj Funkcioj 🖥️ ⟫

// ⟨ Akiri ekranan valoron por nuna stato ⟩
function akiriEkrananValoron() {
    if ( oktalaDekumaModo ) {
        let rezulto = vab6cajaDomani( Math.abs( nunaValoro ) );
        if ( ĉuFrakcia ) {
            rezulto = vab6caja( Math.abs( nunaValoro ) ) + " " + frakciajCiferoj;
        }
        rezulto = skakefK2fe( rezulto );
        return neq2qKp6EKfo( rezulto, nunaValoro < 0 );
    } else {
        let rezulto = vab6caja( nunaValoro );
        return skakefK2fe( rezulto );
    }
}

// ⟨ Akiri nunan valoron por ekrano ⟩
function akiriNunanValoronPorEkrano() {
    if ( oktalaDekumaModo && ĉuFrakcia ) {
        return akiriEkrananValoron();
    }
    let rezulto = konvertiAlEkrano( nunaValoro );
    return skakefK2fe( rezulto );
}

// ⟨ Akiri operatoran simbolon ⟩
function akiriOpSimbolon( operatoro ) {
    switch ( operatoro ) {
        case "adicio": return opSimboloj.adicio;
        case "subtraho": return opSimboloj.subtraho;
        case "multipliko": return opSimboloj.multipliko;
        case "divido": return opSimboloj.divido;
        case "potenco": return opSimboloj.potenco;
        case "radiko": return opSimboloj.radiko;
        case "egaleco": return opSimboloj.egaleco;
        default: return operatoro;
    }
}

// ⟨ Ĝisdatigi ekranajn elementojn ⟩
function ĝisdatigiEkranon() {
    const simNuna = akiriNunanValoronPorEkrano();
    const simAntaŭa = konvertiAlEkrano( antaŭaValoro );
    const opSimbolo = akiriOpSimbolon( pritraktataOperatoro );

    if ( pritraktataOperatoro && enigoKomencita && antaŭaValoro !== 0 ) {
        esprimoElemento.textContent = `${ opSimbolo } ${ simAntaŭa } c ${ simNuna }`;
    } else if ( pritraktataOperatoro && enigoKomencita ) {
        esprimoElemento.textContent = `${ opSimbolo } ${ simNuna }`;
    } else if ( pritraktataOperatoro && antaŭaValoro !== 0 ) {
        esprimoElemento.textContent = `${ opSimbolo } ${ simAntaŭa } c`;
    } else if ( pritraktataOperatoro ) {
        esprimoElemento.textContent = opSimbolo;
    } else if ( antaŭaValoro !== 0 && !enigoKomencita ) {
        esprimoElemento.textContent = simAntaŭa + " c";
    } else {
        esprimoElemento.textContent = simNuna;
    }

    rezultoElemento.textContent = simNuna;
}

function traktiCiferon( simbolo ) {
    if ( rekomencigiEkranon ) {
        nunaValoro = 0;
        rekomencigiEkranon = false;
        rekomencigiEniganStaton();
    }

    if ( !enigoKomencita ) {
        nunaValoro = 0;
        enigoKomencita = true;
    }

    const ciferecaIndekso = K2FE.indexOf( simbolo );
    if ( ciferecaIndekso !== -1 ) {
        if ( oktalaDekumaModo && ĉuFrakcia ) {
            frakciajCiferoj += simbolo;
        } else {
            nunaValoro = nunaValoro * KNAK2FE + ciferecaIndekso;
        }
        ĝisdatigiEkranon();
    }
}

function traktiDekumanPunkton() {
    if ( !oktalaDekumaModo ) return;
    if ( !enigoKomencita ) {
        enigoKomencita = true;
        nunaValoro = 0;
    }
    if ( !ĉuFrakcia ) {
        ĉuFrakcia = true;
        frakciajCiferoj = "";
    }
    ĝisdatigiEkranon();
}

function traktiOperatoron( operatoro ) {
    if ( antaŭaValoro !== 0 && enigoKomencita ) {
        kalkuli();
        pritraktataOperatoro = operatoro;
        enigoKomencita = false;
        rekomencigiEkranon = false;
        ĝisdatigiEkranon();
        return;
    }

    if ( antaŭaValoro === 0 && !enigoKomencita ) {
        antaŭaValoro = nunaValoro;
        nunaValoro = 0;
    }

    // Konservi nunan valoron kiel nombron ( inkluzive frakcian parton ) antaŭ ol ŝanĝi operatoron
    if ( enigoKomencita ) {
        antaŭaValoro = akiriNunanNombron();
        nunaValoro = 0;
        rekomencigiEniganStaton();
    }

    pritraktataOperatoro = operatoro;
    rekomencigiEkranon = false;
    ĝisdatigiEkranon();
}

// ⟪ Kalkulaj Funkcioj 🧮 ⟫

// ⟨ Efektivigi kalkulon ⟩
function kalkuli() {
    if ( !pritraktataOperatoro ) return;
    if ( antaŭaValoro === 0 && nunaValoro === 0 && !ĉuFrakcia ) return;

    let rezulto = 0;
    let antaŭaNombro = akiriValoronNombro( antaŭaValoro, "" );
    let nunaNombro = akiriNunanNombron();

    switch ( pritraktataOperatoro ) {
        case "adicio":
            rezulto = nunaNombro + antaŭaNombro;
            break;
        case "subtraho":
            rezulto = nunaNombro - antaŭaNombro;
            break;
        case "multipliko":
            rezulto = nunaNombro * antaŭaNombro;
            break;
        case "divido":
            rezulto = antaŭaNombro !== 0 ? nunaNombro / antaŭaNombro : 0;
            break;
        case "potenco":
            rezulto = Math.pow( nunaNombro, antaŭaNombro );
            break;
        case "radiko":
            rezulto = Math.pow( nunaNombro, 1 / antaŭaNombro );
            break;
        default:
            return;
    }

    const antaŭaSimbolo = konvertiAlEkrano( antaŭaValoro );
    const nunaSimbolo = akiriNunanValoronPorEkrano();
    const rezultaSimbolo = konvertiAlEkrano( rezulto );
    const opSimbolo = akiriOpSimbolon( pritraktataOperatoro );

    const historiaEniro = document.createElement( "p" );
    historiaEniro.className = "ksakap2sa";
    historiaEniro.textContent = `${ opSimbolo } ${ nunaSimbolo } c ${ antaŭaSimbolo } = ${ rezultaSimbolo }`;
    historiaUjoElemento.prepend( historiaEniro );

    lastaRezulto = rezulto;
    agordiNunanValoronElNombro( rezulto );
    antaŭaValoro = 0;
    pritraktataOperatoro = null;
    enigoKomencita = false;
    rekomencigiEkranon = true;

    rezultoElemento.textContent = akiriNunanValoronPorEkrano();
}

// ⟪ Kontrolaj Funkcioj 🎛️ ⟫

// ⟨ Nuligi ĉiun staton kaj ekranon ⟩
function nuligiĈion() {
    rekomencigiStaton();
    esprimoElemento.textContent = "";
    rezultoElemento.textContent = K2FE[ 0 ];
    historiaUjoElemento.innerHTML = "";
}

// ⟨ Trakti apartigilan enigon ⟩
function traktiApartigilon() {
    if ( enigoKomencita ) {
        if ( antaŭaValoro === 0 ) {
            antaŭaValoro = akiriNunanNombron();
            nunaValoro = 0;
            rekomencigiEniganStaton();
            enigoKomencita = false;
        } else if ( pritraktataOperatoro ) {
            kalkuli();
        }
        ĝisdatigiEkranon();
    }
}

// ⟨ Baskuligi negativan signon ⟩
function baskuligiNegativon() {
    if ( !enigoKomencita && nunaValoro === 0 && frakciajCiferoj.length === 0 ) return;
    nunaValoro = -nunaValoro;
    ĝisdatigiEkranon();
}

// ⟨ Trakti forigilon ⟩
function traktiForigilon() {
    if ( oktalaDekumaModo && ĉuFrakcia && frakciajCiferoj.length > 0 ) {
        frakciajCiferoj = frakciajCiferoj.slice( 0, -1 );
        if ( frakciajCiferoj.length === 0 ) {
            ĉuFrakcia = false;
        }
    } else if ( oktalaDekumaModo && ĉuFrakcia ) {
        ĉuFrakcia = false;
    } else {
        nunaValoro = Math.floor( nunaValoro / KNAK2FE );
        if ( nunaValoro === 0 ) enigoKomencita = false;
    }
    ĝisdatigiEkranon();
}

// ⟪ Eventaj Aŭskultiloj 📡 ⟫

// ⟨ Tastaraj butonklakaj pritraktiloj ⟩
tastaroElemento.querySelectorAll( ".nombro-butonoj button, .funkcio-butonoj button, .kontrolo-butonoj button" ).forEach( butono => {
    butono.addEventListener( "click", () => {
        const etiked = butono.textContent;
        const klasaNomo = butono.className;

        if ( etiked === "c" ) { traktiApartigilon(); return; }
        if ( klasaNomo.includes( "dekuma-butono" ) ) { traktiDekumanPunkton(); return; }
        else if ( klasaNomo.includes( "nombro-butono" ) ) traktiCiferon( etiked );
        else if ( klasaNomo.includes( "operatoro-butono" ) && operatoraEtikedmapo[ etiked ] ) traktiOperatoron( operatoraEtikedmapo[ etiked ] );
        else if ( klasaNomo.includes( "potenco-butono" ) && etiked === "›" ) baskuligiNegativon();
        else if ( klasaNomo.includes( "nuliga-butono" ) && etiked === "///" ) nuligiĈion();
        else if ( klasaNomo.includes( "nuliga-butono" ) && etiked === "⌫" ) efektivigiForigilon();
        else if ( klasaNomo.includes( "egaleco-butono" ) ) kalkuli();
    } );
} );

// ⟨ Klavar-eventaj pritraktiloj ⟩
document.addEventListener( "keydown", ( evento ) => {
    if ( K2FE.includes( evento.key ) ) {
        traktiCiferon( evento.key );
    } else if ( evento.key === "." || evento.key === "," ) {
        traktiDekumanPunkton();
    } else if ( evento.key === "Enter" || evento.key === "=" ) {
        kalkuli();
    } else if ( evento.key === "Escape" ) {
        nuligiĈion();
    } else if ( evento.key === "Backspace" ) {
        efektivigiForigilon();
    } else if ( evento.key === "n" || evento.key === "N" ) {
        baskuligiNegativon();
    }
} );

// ⟨ Inicialigi ekranon ⟩
ĝisdatigiEkranon();
