/// <reference types="vite/client" />

// ≺⧼ ſɟw ʃɹ - Klavara Paĝo ⌨️ ⧽≻
// Ŝarĝas la dezajnon el DOCUMENTATION/KEYBOARDLAYOUT.md kaj bildigas interagan klavaron.
// La dosiero difinas du aranĝojn - la Malgranda ( Cubii / ſɟw ʃɹ ) kun tri
// tavoloj ( Unua, Ŝanĝo, Simbolo ) kaj la Granda ( Cutlii / ſɟw ſ̀ȷɹ ) kun
// unu baza tavolo. La Granda aranĝo derivas siajn Ŝanĝan kaj Simbolan
// tavolojn laŭ sia bazo - ĉiu signo ricevas la derivitan version de la sama
// signo el la Malgranda aranĝo. Nomo kun " / " montras nur la Iikrhaian
// parton en aih kaj nur la anglan parton en en.

// ⟪ Tipoj 📐 ⟫

type KlavaFunkcio = "shift" | "back" | "space" | "enter" | "symbol" | "extra";

interface SignaKlavo {
	etiked: string;
	speco: "signo";
	valoro: string;
}

interface FunkciaKlavo {
	etiked: string;
	speco: "funkcio";
	valoro: KlavaFunkcio;
}

type Klavo = SignaKlavo | FunkciaKlavo;

interface Tavolo {
	nomoEn: string;
	nomoAih: string;
	vicaroj: Klavo[][];
	malsupraStrio: Klavo[];
}

interface KlavarArangxo {
	titoloEn: string;
	titoloAih: string;
	tavoloj: Tavolo[];
}

// ⟪ Konstantoj 📦 ⟫

// ⟨ Funkciaj klavoj de la Malgranda aranĝo ⟩
const FUNKCIOJ: Readonly<Record<string, KlavaFunkcio>> = {
	"[Shift]": "shift",
	"[Back]": "back",
	"[Space]": "space",
	"[Enter]": "enter",
	"[Symbol]": "symbol",
};

// ⟨ Agoj laŭ la vortoj en la noto "Also ... is ..." de la Granda aranĝo ⟩
const NOTAJAGOJ: Readonly<Record<string, KlavaFunkcio>> = {
	"shift": "shift",
	"back": "back",
	"space": "space",
	"enter": "enter",
	"symbol": "symbol",
};

// ⟨ Tradukitaj nomoj de la funkciaj klavoj. La Iikrhaiaj nomoj venas el la
//    noto de la Granda aranĝo en DOCUMENTATION/KEYBOARDLAYOUT.md. ⟩
const FUNKCIO_NOMOJ: Readonly<Record<KlavaFunkcio, { en: string; aih: string }>> = {
	shift: { en: "Shift", aih: "ſןw ſȷɹ" },
	back: { en: "Back", aih: "֭ſɭɹͷ̗" },
	space: { en: "Space", aih: "ꞁȷ̀ᴜ ɽ͑ʃ'ɔȝ" },
	enter: { en: "Enter", aih: "ſɭw ſ̀ȷᴜ" },
	symbol: { en: "Symbol", aih: "ſɭɘэ" },
	extra: { en: "Extra", aih: "ꞁȷ̀ꞇ }ʃᴜƽ" },
};

// ⟨ Alternativaj signoj por ĉiu klava signo ( ekz. diakritaj formoj ).
//    Malplenaj nun - plenigu ilin poste. ⟩
const VARIANTOJ: Readonly<Record<string, string[]>> = {};

// ⟨ Daŭro de longa premo antaŭ montri la alternativajn signojn ( 1 Heo ) ⟩
const LONGA_PREMO_DAŬRO = HE_L6HEINAK;

// ⟨ Daŭro de la konfirmo post kopiado ( 1 Heo ) ⟩
const KOPII_KONFIRMA_DAŬRO = HE_L6HEINAK;

// ⟨ Ŝarĝu la dezajndokumenton ( DOCUMENTATION/KEYBOARDLAYOUT.md ) ⟩
const klavarajDosieroj = import.meta.glob( "../../DOCUMENTATION/KEYBOARDLAYOUT.md", {
	query: "?raw",
	import: "default",
	eager: true,
}) as Record<string, string>;

// ⟪ Stato 💾 ⟫

let aktivaArangxoIndekso = 0;
let aktivaTavolaIndekso = 0;
let arangxoj: KlavarArangxo[] = [];
let funkciaMapo: Readonly<Record<string, KlavaFunkcio>> = FUNKCIOJ;
let enmetitaHistorio: string[] = [];
let ekstraReĝimo = false;
let longaPremo = false;
let ciklajIndeksoj = new Map<string, number>();

// ⟪ DOM-Elementoj 🔧 ⟫

let enigaKampo: HTMLTextAreaElement | null = null;
let klavaraUjo: HTMLElement | null = null;
let tavolaEtikedElemento: HTMLElement | null = null;
let arangxoButonojUjo: HTMLElement | null = null;
let ekstraPanelo: HTMLElement | null = null;

// ⟪ Analizo 📂 ⟫

/**
	Analizu la krudan tekston de KEYBOARDLAYOUT.md en aranĝojn.
		krudaTeksto ( string ) - La kruda enhavo de la dezajna dosiero.
	@returns KlavarArangxo[]
*/
function analiziArangxojn( krudaTeksto: string ): KlavarArangxo[] {
	const linioj = krudaTeksto.replace(/\r/g, "").split( "\n" );

	// ⟨ La noto difinas la funkciajn klavojn de la Granda aranĝo ⟩
	funkciaMapo = { ...FUNKCIOJ, ...analiziNoton( linioj ) };

	const limoj: number[] = [];
	for ( let i = 0; i < linioj.length; i++ ) {
		const linio = linioj[ i ].trim();
		const senMark = linio.replace( /^#+\s*/, "" );
		if ( senMark.startsWith( "Small" ) || senMark.startsWith( "Large" ) ) {
			limoj.push( i );
		}
	}

	const arangxoj: KlavarArangxo[] = [];
	for ( let a = 0; a < limoj.length; a++ ) {
		const komenco = limoj[ a ];
		const fino = a + 1 < limoj.length ? limoj[ a + 1 ] : linioj.length;
		arangxoj.push( analiziArangxon( linioj, komenco, fino ) );
	}

	// ⟨ La Granda aranĝo ( Cutlii ) havas nur bazon. Kreu ĝiajn Ŝanĝan kaj
	//    Simbolan tavolojn laŭ la Granda aranĝo - ĉiu signo ricevas la
	//    derivitan version de la sama signo el la Malgranda aranĝo. ⟩
	const malgranda = arangxoj[ 0 ];
	const granda = arangxoj[ 1 ];
	if ( malgranda && granda && granda.tavoloj.length === 1 && malgranda.tavoloj.length >= 3 ) {
		granda.tavoloj = kreiGrandajnTavolojn( granda.tavoloj[ 0 ], malgranda );
	}

	return arangxoj;
}

/**
	Analizu unu aranĝon inter du limoj. Aranĝo kun tavolaj titoloj fariĝas
	plurtavola, alie ĝi fariĝas unu-tavola.
		linioj ( string[] ) - Ĉiuj linioj de la dezajna dosiero.
		komenco ( number ) - Indekso de la titola linio de la aranĝo.
		fino ( number ) - Indekso de la sekva titola linio ( aŭ fino de la dosiero ).
	@returns KlavarArangxo
*/
function analiziArangxon( linioj: string[], komenco: number, fino: number ): KlavarArangxo {
	const titolo = disigiNomon( linioj[ komenco ].replace( /^#+\s*/, "" ) );

	const tavolajLimoj: number[] = [];
	for ( let i = komenco + 1; i < fino; i++ ) {
		const linio = linioj[ i ].trim();
		const senMark = linio.replace( /^#+\s*/, "" );
		if ( senMark.startsWith( "First" ) || senMark.startsWith( "Second" ) || senMark.startsWith( "Third" ) ) {
			tavolajLimoj.push( i );
		}
	}

	if ( tavolajLimoj.length > 0 ) {
		const tavoloj: Tavolo[] = [];
		for ( let t = 0; t < tavolajLimoj.length; t++ ) {
			const tavolaKomenco = tavolajLimoj[ t ];
			const tavolaFino = t + 1 < tavolajLimoj.length ? tavolajLimoj[ t + 1 ] : fino;
			tavoloj.push( analiziTavolon( linioj, tavolaKomenco, tavolaFino ) );
		}
		return { titoloEn: titolo.en, titoloAih: titolo.aih, tavoloj };
	}

	// ⟨ Unu-tavola aranĝo ( ekz. Granda Cutlii ) ⟩
	return { titoloEn: titolo.en, titoloAih: titolo.aih, tavoloj: [ analiziTavolon( linioj, komenco, fino ) ] };
}

/**
	Analizu unu tavolon inter du limoj ( vicoj de signoj kaj la malsupra strio ).
		linioj ( string[] ) - Ĉiuj linioj de la dezajna dosiero.
		komenco ( number ) - Indekso de la titola linio de la tavolo.
		fino ( number ) - Indekso de la sekva titola linio ( aŭ fino de la dosiero ).
	@returns Tavolo
*/
function analiziTavolon( linioj: string[], komenco: number, fino: number ): Tavolo {
	const nomo = disigiNomon( linioj[ komenco ].replace( /^#+\s*/, "" ) );
	const vicaroj: Klavo[][] = [];
	let malsupraStrio: Klavo[] = [];

	for ( let i = komenco + 1; i < fino; i++ ) {
		const linio = linioj[ i ].trim();
		if ( !linio || linio.startsWith( "Also" ) ) continue;

		const ĵetonoj = ĵetonigiLinion( linio );
		if ( ĵetonoj.some( estasFunkciaGrupo ) ) {
			malsupraStrio = ĵetonoj.map( kreiKlavon );
		} else {
			vicaroj.push( ĵetonoj.map( kreiKlavon ) );
		}
	}

	return { nomoEn: nomo.en, nomoAih: nomo.aih, vicaroj, malsupraStrio };
}

/**
	Ĵetonigu linion. Krampaj grupoj ( [ ... ] ) restas unu ĵetono kiam ili
	estas unu klavo, alie ili disiĝas en siajn unuopajn signojn.
		linio ( string ) - Unu linio de la dezajna dosiero.
	@returns string[]
*/
function ĵetonigiLinion( linio: string ): string[] {
	const krudaj = linio.match( /\[[^\]]*\]|\S+/g ) ?? [];
	const ĵetonoj: string[] = [];

	for ( const kruda of krudaj ) {
		if ( estasFunkciaGrupo( kruda ) || estasUnuvortaGrupo( kruda ) ) {
			ĵetonoj.push( kruda );
		} else if ( kruda.startsWith( "[" ) && kruda.endsWith( "]" ) ) {
			// ⟨ Grupo ne estas unu klavo ( ekz. [ x › ɘ ꭎ ] ) - disigu ĝin ⟩
			ĵetonoj.push( "[", ...kruda.slice( 1, -1 ).trim().split( /\s+/ ), "]" );
		} else {
			ĵetonoj.push( kruda );
		}
	}

	return ĵetonoj;
}

/**
	Ĉu ĵetono estas konata funkcia klavo.
		ĵetono ( string ) - La ĵetono por ekzameni.
	@returns boolean
*/
function estasFunkciaGrupo( ĵetono: string ): boolean {
	return !!funkciaMapo[ ĵetono ];
}

/**
	Ĉu ĵetono estas krampa grupo kun unu sola vorto ( ekz. [ Shift ] aŭ
	[ Empty ] ).
		ĵetono ( string ) - La ĵetono por ekzameni.
	@returns boolean
*/
function estasUnuvortaGrupo( ĵetono: string ): boolean {
	return ĵetono.startsWith( "[" ) && ĵetono.endsWith( "]" ) && ĵetono.slice( 1, -1 ).trim().split( /\s+/ ).length === 1;
}

/**
	Konvertu ĵetonon en klavon. Funkciaj ĵetonoj fariĝas funkciaj klavoj,
	[ Empty ] fariĝas malplena ŝlosilo, ĉio alia fariĝas signa klavo.
		ĵetono ( string ) - Unu ĵetono el la dezajna dosiero.
	@returns Klavo
*/
function kreiKlavon( ĵetono: string ): Klavo {
	const funkcio = funkciaMapo[ ĵetono ];
	if ( funkcio ) {
		return { etiked: ĵetono.slice( 1, -1 ).trim(), speco: "funkcio", valoro: funkcio };
	}
	if ( ĵetono === "[ Extra ]" || ĵetono === "[ Empty ]" ) {
		return { etiked: "", speco: "funkcio", valoro: "extra" };
	}
	return { etiked: ĵetono, speco: "signo", valoro: ĵetono };
}

/**
	Eltiru la funkciajn klavojn el la noto "Also ... is ...".
		linioj ( string[] ) - Ĉiuj linioj de la dezajna dosiero.
	@returns Record<string, KlavaFunkcio>
*/
function analiziNoton( linioj: string[] ): Record<string, KlavaFunkcio> {
	const mapo: Record<string, KlavaFunkcio> = {};

	for ( const linio of linioj ) {
		const t = linio.trim();
		if ( !t.startsWith( "Also" ) ) continue;

		for ( const kongruo of t.matchAll( /(\[[^\]]*\])\s+is\s+([^\s,.]+)/g ) ) {
			const grupo = kongruo[ 1 ];
			const ago = kongruo[ 2 ].toLowerCase();
			const funkcio = NOTAJAGOJ[ ago ];
			if ( grupo && funkcio ) mapo[ grupo ] = funkcio;
		}
	}

	return mapo;
}

/**
	Disigu nomon "Angla / Iikrhia" en ĝiajn du partojn. Titolo kiel
	"Small ( Cubii / ſɟw ʃɹ )" fariĝas "Small ( Cubii )" kaj "ſɟw ʃɹ".
		kruda ( string ) - Kruda nomo el la dezajna dosiero.
	@returns { en: string; aih: string }
*/
function disigiNomon( kruda: string ): { en: string; aih: string } {
	const kongruo = kruda.match( /^(.+?)\s*\(\s*(.+?)\s*\/\s*(.+?)\s*\)$/ );
	if ( kongruo ) {
		return { en: `${kongruo[ 1 ].trim()} ( ${kongruo[ 2 ].trim()} )`, aih: kongruo[ 3 ].trim() };
	}

	const partoj = kruda.split( " / " );
	if ( partoj.length >= 2 ) {
		return {
			en: partoj[ 0 ].trim().replace( /\(\s*/g, "( " ).replace( /\s*\)/g, " )" ),
			aih: partoj[ 1 ].trim(),
		};
	}

	return { en: kruda, aih: kruda };
}

/**
	Kreu la Ŝanĝan kaj Simbolan tavolojn de la Granda aranĝo laŭ ĝia bazo.
	Ĉiu signa klavo ricevas la ŝanĝitan / simbolan version de la sama signo
	el la Malgranda aranĝo ( laŭ la signo mem, ne laŭ la pozicio );
	funkciaj klavoj restas kiel ili estas. Signoj sen derivita versio
	konservas sian propran valoron. La malsupra strio restas tiu de la
	Granda aranĝo.
		bazo ( Tavolo ) - La baza tavolo de la Granda aranĝo.
		malgranda ( KlavarArangxo ) - La Malgranda aranĝo kun ĝiaj tri tavoloj.
	@returns Tavolo[]
*/
function kreiGrandajnTavolojn( bazo: Tavolo, malgranda: KlavarArangxo ): Tavolo[] {
	const ŝanĝaMapo = kreiSignanMapon( malgranda.tavoloj[ 0 ], malgranda.tavoloj[ 0o1 ] );
	const simbolaMapo = kreiSignanMapon( malgranda.tavoloj[ 0 ], malgranda.tavoloj[ 0o2 ] );

	const derivi = ( mapo: Record<string, string> ): Tavolo => ( {
		nomoEn: "",
		nomoAih: "",
		vicaroj: bazo.vicaroj.map( vico => vico.map( klavo =>
			klavo.speco === "signo" && mapo[ klavo.valoro ]
				? { etiked: mapo[ klavo.valoro ], speco: "signo", valoro: mapo[ klavo.valoro ] }
				: klavo
		) ),
		malsupraStrio: bazo.malsupraStrio,
	} );

	// ⟨ La nomoj de la derivitaj tavoloj venas de la Malgranda aranĝo ⟩
	const ŝanĝa = derivi( ŝanĝaMapo );
	const simbola = derivi( simbolaMapo );
	ŝanĝa.nomoEn = malgranda.tavoloj[ 0o1 ].nomoEn;
	ŝanĝa.nomoAih = malgranda.tavoloj[ 0o1 ].nomoAih;
	simbola.nomoEn = malgranda.tavoloj[ 0o2 ].nomoEn;
	simbola.nomoAih = malgranda.tavoloj[ 0o2 ].nomoAih;

	return [ bazo, ŝanĝa, simbola ];
}

/**
	Konstruu signan mapon de unu tavolo al alia: ĉiu signa klavo de la fonta
	tavolo ( la bazo ) ricevas la signon ĉe la sama pozicio de la cela tavolo
	( la ŝanĝita / simbola versio ). La unua apero gajnas. Ankaŭ la malsupraj
	strioj kontribuas ( ekz. ｡ → v, ⟅ → ʌ ).
		fontaTavolo ( Tavolo ) - La baza tavolo.
		celaTavolo ( Tavolo ) - La tavolo de la derivitaj versioj.
	@returns Record<string, string>
*/
function kreiSignanMapon( fontaTavolo: Tavolo, celaTavolo: Tavolo ): Record<string, string> {
	const mapo: Record<string, string> = {};

	const registri = ( fontaKlavo: Klavo, celaKlavo: Klavo | undefined ): void => {
		if ( fontaKlavo.speco !== "signo" || !celaKlavo || celaKlavo.speco !== "signo" ) return;
		if ( !( fontaKlavo.valoro in mapo ) ) mapo[ fontaKlavo.valoro ] = celaKlavo.valoro;
	};

	for ( let v = 0; v < fontaTavolo.vicaroj.length; v++ ) {
		const fontaVico = fontaTavolo.vicaroj[ v ];
		const celaVico = celaTavolo.vicaroj[ v ];
		for ( let k = 0; k < fontaVico.length; k++ ) {
			registri( fontaVico[ k ], celaVico?.[ k ] );
		}
	}

	for ( let k = 0; k < fontaTavolo.malsupraStrio.length; k++ ) {
		registri( fontaTavolo.malsupraStrio[ k ], celaTavolo.malsupraStrio[ k ] );
	}

	return mapo;
}

// ⟪ Lingvo 🈯 ⟫

/**
	Akiru la nunan paĝlingvon el la html-elemento.
	@returns string
*/
function nunaLingvo(): string {
	return document.documentElement.lang || "aih";
}

/**
	Elektu nomon laŭ la nuna lingvo. La Iikrhia versio montriĝas en aih
	kaj la angla versio alie.
		en ( string ) - La angla nomo.
		aih ( string ) - La Iikrhia nomo.
	@returns string
*/
function nomoPerLingvo( en: string, aih: string ): string {
	return nunaLingvo() === "aih" ? aih : en;
}

// ⟪ Bildigo 🖥️ ⟫

/**
	Montru unu aranĝon. Rekonstruas la aranĝo-ŝaltilojn kaj montras la
	unuan tavolon de la aranĝo.
		indekso ( number ) - Indekso de la aranĝo por montri.
	@returns void
*/
function montriArangxon( indekso: number ): void {
	const arangxo = arangxoj[ indekso ];
	if ( !arangxo || !arangxoButonojUjo ) return;
	aktivaArangxoIndekso = indekso;

	arangxoButonojUjo.replaceChildren();
	for ( let i = 0; i < arangxoj.length; i++ ) {
		const butono = document.createElement( "button" );
		butono.type = "button";
		butono.textContent = nomoPerLingvo( arangxoj[ i ].titoloEn, arangxoj[ i ].titoloAih );
		if ( i === aktivaArangxoIndekso ) {
			butono.setAttribute( "aria-pressed", "true" );
		}
		butono.addEventListener( "click", () => montriArangxon( i ) );
		arangxoButonojUjo.appendChild( butono );
	}

	montriTavolon( 0 );
}

/**
	Montru unu tavolon de la nuna aranĝo. Rekonstruas la klavaron kaj
	ĝisdatigas la tavolan etikedon.
		indekso ( number ) - Indekso de la tavolo por montri.
	@returns void
*/
function montriTavolon( indekso: number ): void {
	const arangxo = arangxoj[ aktivaArangxoIndekso ];
	const tavolo = arangxo?.tavoloj[ indekso ];
	if ( !tavolo || !klavaraUjo || !tavolaEtikedElemento ) return;

	aktivaTavolaIndekso = indekso;
	tavolaEtikedElemento.textContent = nomoPerLingvo( tavolo.nomoEn, tavolo.nomoAih );
	klavaraUjo.replaceChildren();
	fermiPanelon();
	longaPremo = false;
	ciklajIndeksoj.clear();

	for ( const vico of tavolo.vicaroj ) {
		klavaraUjo.appendChild( kreiVicon( vico ) );
	}
	klavaraUjo.appendChild( kreiVicon( tavolo.malsupraStrio ) );

	// ⟨ Apliku vacepu al la nova teksto por ke ĝi montriĝu ĝuste en aih ⟩
	vacepu( "cepufal" );
}

/**
	Kreu unu vicon de klavoj kiel thala.cakaxa.
		klavoj ( Klavo[] ) - La klavoj de la vico.
	@returns HTMLElement
*/
function kreiVicon( klavoj: Klavo[] ): HTMLElement {
	const vico = document.createElement( "thala" );
	vico.className = "cakaxa";

	for ( const klavo of klavoj ) {
		vico.appendChild( kreiButonon( klavo ) );
	}
	return vico;
}

/**
	Kreu butonon por unu klavo.
		klavo ( Klavo ) - La klavo por bildigi.
	@returns HTMLButtonElement
*/
function kreiButonon( klavo: Klavo ): HTMLButtonElement {
	const butono = document.createElement( "button" );
	butono.type = "button";

	// ⟨ Funkciaj klavoj montras tradukitajn nomojn laŭ la lingvo ⟩
	if ( klavo.speco === "funkcio" ) {
		const nomo = FUNKCIO_NOMOJ[ klavo.valoro ];
		butono.textContent = nomoPerLingvo( nomo.en, nomo.aih );
	} else {
		butono.textContent = klavo.etiked;
	}

	if ( klavo.speco === "funkcio" ) {
		if ( ( klavo.valoro === "shift" && aktivaTavolaIndekso === 0o1 ) ||
			( klavo.valoro === "symbol" && aktivaTavolaIndekso === 0o2 ) ||
			( klavo.valoro === "extra" && ekstraReĝimo ) ) {
			butono.setAttribute( "aria-pressed", "true" );
		}
	} else {
		aldoniLonganPremon( butono, klavo );
	}

	butono.addEventListener( "click", () => pritraktiKlavon( klavo ) );
	return butono;
}

/**
	Aldonu long-premajn gestojn al signa klavo. Teni la klavon malfermas la
	panelon de alternativaj signoj: vico en la Granda aranĝo ( kiam la
	Extra-ŝaltilo estas ŝaltita ) aŭ panelo de ekstraj signoj en la
	Malgranda aranĝo. La posta klako estas forigita post longa premo.
		butono ( HTMLButtonElement ) - La butono de la klavo.
		klavo ( SignaKlavo ) - La signa klavo.
	@returns void
*/
function aldoniLonganPremon( butono: HTMLButtonElement, klavo: SignaKlavo ): void {
	let temporizilo: number | null = null;

	const nuligi = (): void => {
		if ( temporizilo !== null ) {
			window.clearTimeout( temporizilo );
			temporizilo = null;
		}
	};

	const fermi = (): void => {
		nuligi();
		fermiPanelon();
		longaPremo = false;
	};

	butono.addEventListener( "pointerdown", () => {
		fermi();
		temporizilo = window.setTimeout( () => {
			temporizilo = null;
			longaPremo = true;
			malfermiPanelon( klavo );
		}, LONGA_PREMO_DAŬRO * 1000 ); // Heoj → ms
	} );

	// ⟨ Ne nuligu longaPremo ĉi tie: la sekva klako devas ĝin konsumi ⟩
	butono.addEventListener( "pointerup", () => {
		nuligi();
		fermiPanelon();
	} );
	butono.addEventListener( "pointerleave", fermi );
	butono.addEventListener( "pointercancel", fermi );
}

/**
	Malfermu la panelon de alternativaj signoj por unu klavo. En la Granda
	aranĝo ĝi montras la variantojn en vico; en la Malgranda aranĝo ĝi
	malfermas la panelon de ekstraj signoj. La variantoj estas malplenaj nun.
		klavo ( SignaKlavo ) - La klavo, kies variantojn montri.
	@returns void
*/
function malfermiPanelon( klavo: SignaKlavo ): void {
	if ( !ekstraPanelo ) return;

	ekstraPanelo.replaceChildren();
	for ( const varianto of VARIANTOJ[ klavo.valoro ] ?? [] ) {
		const butono = document.createElement( "button" );
		butono.type = "button";
		butono.textContent = varianto;
		butono.addEventListener( "click", () => {
			enmetiTekston( varianto );
			fermiPanelon();
		} );
		ekstraPanelo.appendChild( butono );
	}

	ekstraPanelo.classList.remove( "kobe" );
	vacepu( "cepufal" );
}

/**
	Fermu kaj malplenigu la panelon de alternativaj signoj.
	@returns void
*/
function fermiPanelon(): void {
	if ( !ekstraPanelo ) return;
	ekstraPanelo.replaceChildren();
	ekstraPanelo.classList.add( "kobe" );
}

// ⟪ Prenado 🖱️ ⟫

/**
	Pritraktu klakan sur klavo.
		klavo ( Klavo ) - La klakita klavo.
	@returns void
*/
function pritraktiKlavon( klavo: Klavo ): void {
	// ⟨ Post longa premo la sekva klako nur malfermis la panelon - forigu ĝin ⟩
	if ( longaPremo ) {
		longaPremo = false;
		return;
	}

	if ( klavo.speco === "signo" ) {
		enmetiKlavon( klavo );
	} else {
		pritraktiFunkcion( klavo.valoro );
	}
}

/**
	Enmetu la valoron de signa klavo. En la Granda aranĝo kun la
	Extra-ŝaltilo ŝaltita, ripetaj klakoj trairas la alternativajn
	variantojn de la signo ( malplenaj nun - la baza signo enmetiĝas ).
		klavo ( SignaKlavo ) - La signa klavo.
	@returns void
*/
function enmetiKlavon( klavo: SignaKlavo ): void {
	if ( aktivaArangxoIndekso === 1 && ekstraReĝimo ) {
		const variantoj = VARIANTOJ[ klavo.valoro ] ?? [];
		if ( variantoj.length > 0 ) {
			const indekso = ciklajIndeksoj.get( klavo.valoro ) ?? 0;
			enmetiTekston( variantoj[ indekso ] );
			ciklajIndeksoj.set( klavo.valoro, ( indekso + 1 ) % variantoj.length );
			return;
		}
	}

	enmetiTekston( klavo.valoro );
}

/**
	Pritraktu funkcion de la malsupra strio.
		funkcio ( KlavaFunkcio ) - La ago de la funkcia klavo.
	@returns void
*/
function pritraktiFunkcion( funkcio: KlavaFunkcio ): void {
	switch ( funkcio ) {
		case "shift":
			montriTavolon( aktivaTavolaIndekso === 0o1 ? 0 : 0o1 );
			break;
		case "symbol":
			montriTavolon( aktivaTavolaIndekso === 0o2 ? 0 : 0o2 );
			break;
		case "extra":
			ekstraReĝimo = !ekstraReĝimo;
			ciklajIndeksoj.clear();
			montriTavolon( aktivaTavolaIndekso );
			break;
		case "back":
			forigiLastanGrafemon();
			break;
		case "space":
			enmetiTekston( " " );
			break;
		case "enter":
			enmetiTekston( "\n" );
			break;
	}
}

/**
	Enmetu tekston ĉe la nuna kursora pozicio de la eniga kampo.
		teksto ( string ) - La teksto por enmeti.
	@returns void
*/
function enmetiTekston( teksto: string ): void {
	if ( !enigaKampo ) return;
	const komenco = enigaKampo.selectionStart ?? enigaKampo.value.length;
	const fino = enigaKampo.selectionEnd ?? enigaKampo.value.length;

	enigaKampo.value = enigaKampo.value.slice( 0, komenco ) + teksto + enigaKampo.value.slice( fino );
	const novaPozicio = komenco + teksto.length;
	enigaKampo.setSelectionRange( novaPozicio, novaPozicio );
	enigaKampo.focus();

	// ⟨ Konservu la enmetitan klavan ĵetonon por ke forigo forigu tutajn klavojn ⟩
	enmetitaHistorio.push( teksto );
}

/**
	Forigu la lastan grafemon ( signon kun ĉiuj ĝiaj kombinitaj diakritoj )
	antaŭ la kursoro, aŭ la tutan elektitan tekston se ekzistas selektado.
	@returns void
*/
function forigiLastanGrafemon(): void {
	if ( !enigaKampo ) return;
	const komenco = enigaKampo.selectionStart ?? enigaKampo.value.length;
	const fino = enigaKampo.selectionEnd ?? enigaKampo.value.length;

	// ⟨ Se ekzistas selektado, forigu ĝin kaj forĵetu la historion ⟩
	if ( komenco !== fino ) {
		enigaKampo.value = enigaKampo.value.slice( 0, komenco ) + enigaKampo.value.slice( fino );
		enigaKampo.setSelectionRange( komenco, komenco );
		enigaKampo.focus();
		enmetitaHistorio = [];
		return;
	}

	if ( komenco > 0 ) {
		const antaŭa = enigaKampo.value.slice( 0, komenco );
		const lastaĴetono = enmetitaHistorio[ enmetitaHistorio.length - 1 ];

		// ⟨ Preferu forigi la lastan klavan ĵetonon tute ( ekz. ꞁȷ̀ ) ⟩
		if ( lastaĴetono && antaŭa.endsWith( lastaĴetono ) ) {
			const novaPozicio = komenco - lastaĴetono.length;
			enigaKampo.value = enigaKampo.value.slice( 0, novaPozicio ) + enigaKampo.value.slice( komenco );
			enigaKampo.setSelectionRange( novaPozicio, novaPozicio );
			enmetitaHistorio.pop();
		} else {
			// ⟨ Alie forigu unu grafemon kaj forĵetu la historian sinsekvon ⟩
			const novaPozicio = komenco - longecoDeLastaGrafemo( antaŭa );
			enigaKampo.value = enigaKampo.value.slice( 0, novaPozicio ) + enigaKampo.value.slice( komenco );
			enigaKampo.setSelectionRange( novaPozicio, novaPozicio );
			enmetitaHistorio = [];
		}
		enigaKampo.focus();
	}
}

/**
	Kalkulu la longecon de la lasta grafemo en ĉeno, uzante Intl.Segmenter
	kiam ĝi disponeblas kaj falante reen al kodpunktoj alie.
		teksto ( string ) - La ĉeno por ekzameni.
	@returns number
*/
function longecoDeLastaGrafemo( teksto: string ): number {
	if ( !teksto ) return 0;

	const Segmentero = ( Intl as { Segmenter?: new ( lokaĵo?: string, opcioj?: { granularity?: string } ) => { segment( t: string ): Iterable<{ segment: string }> } } ).Segmenter;

	if ( Segmentero ) {
		const segmentilo = new Segmentero( undefined, { granularity: "grapheme" } );
		const segmentoj = [ ...segmentilo.segment( teksto ) ];
		const lasta = segmentoj[ segmentoj.length - 1 ];
		if ( lasta ) return lasta.segment.length;
	}

	const kodpunktoj = Array.from( teksto );
	const lastaKodpunkto = kodpunktoj[ kodpunktoj.length - 1 ];
	return lastaKodpunkto ? lastaKodpunkto.length : 0;
}

/**
	Kopiu la tekston de la eniga kampo al la tondujo kaj montru konfirmon.
	@returns Promise
*/
async function kopiiTekston(): Promise<void> {
	if ( !enigaKampo ) return;
	const butono = document.getElementById( "kopii-butono" ) as HTMLButtonElement | null;

	try {
		await navigator.clipboard.writeText( enigaKampo.value );
		if ( butono ) {
			const antaŭaEtiked = butono.textContent;
			butono.textContent = "✓";
			setTimeout( () => {
				butono.textContent = antaŭaEtiked;
			}, KOPII_KONFIRMA_DAŬRO * 1000 ); // Heoj → ms
		}
	} catch ( eraro ) {
		console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Malsukcesis kopii la tekston.", eraro );
	}
}

/**
	Viŝu la tutan tekston de la eniga kampo.
	@returns void
*/
function viŝiEnigon(): void {
	if ( !enigaKampo ) return;
	enigaKampo.value = "";
	enigaKampo.focus();
	enmetitaHistorio = [];
}

// ⟪ Inicialigo 🚀 ⟫

document.addEventListener( "DOMContentLoaded", () => {
	enigaKampo = document.getElementById( "enigo" ) as HTMLTextAreaElement | null;
	klavaraUjo = document.getElementById( "klavaro" ) as HTMLElement | null;
	tavolaEtikedElemento = document.getElementById( "tavolo-etiked" ) as HTMLElement | null;
	arangxoButonojUjo = document.getElementById( "arangxo-butonoj" ) as HTMLElement | null;
	ekstraPanelo = document.getElementById( "ekstra-panelo" ) as HTMLElement | null;
	const kopiiButono = document.getElementById( "kopii-butono" ) as HTMLButtonElement | null;
	const viŝiButono = document.getElementById( "viŝi-butono" ) as HTMLButtonElement | null;

	if ( !enigaKampo || !klavaraUjo || !tavolaEtikedElemento || !arangxoButonojUjo ) {
		console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Klavara paĝo. Mankas eniga kampo aŭ klavara ujo." );
		return;
	}

	const krudaTeksto = Object.values( klavarajDosieroj )[ 0 ] ?? "";
	arangxoj = analiziArangxojn( krudaTeksto );
	montriArangxon( 0 );

	// ⟨ Mana redaktado de la uzanto rompas la historion - forĵetu ĝin ⟩
	enigaKampo.addEventListener( "input", () => {
		enmetitaHistorio = [];
	} );

	kopiiButono?.addEventListener( "click", () => { void kopiiTekston(); } );
	viŝiButono?.addEventListener( "click", viŝiEnigon );
});
