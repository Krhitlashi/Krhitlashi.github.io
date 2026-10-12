/// <reference types="vite/client" />

/*
* ≺⧼ ſɟw ʃɹ - ſ̀ȷᴜ ⌨️ ⧽≻
* ſɭʞɹ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Cubii Cutlii Unua Ŝanĝo Simbolo )
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( DOCUMENTATION/CULTURE/KEYBOARDLAYOUT.md git )
* ſɟᴜ ı],ɹͷ̗ ( Unua Ŝanĝo Simbolo Cubii Cutlii )
* ſɟɔ ŋᷠɔ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( aih en )
*/

// ⟪ ֭ſɭᴜ ı],ɔ 📐 ⟫

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

// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 📦 ⟫

// ⟨ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ ⟩
const FUNKCIOJ: Readonly<Record<string, KlavaFunkcio>> = {
	"[Shift]": "shift",
	"[Back]": "back",
	"[Space]": "space",
	"[Enter]": "enter",
	"[Symbol]": "symbol",
};

// ⟨ j͑ʃᴜƽ ʌ ſɭɔʞ ( Also is ) ⟩
const NOTAJAGOJ: Readonly<Record<string, KlavaFunkcio>> = {
	"shift": "shift",
	"back": "back",
	"space": "space",
	"enter": "enter",
	"symbol": "symbol",
};

/**
* ⟨ ſɭɔ˞ᴜ ſɭᴜ ʌ ſɭɔʞ ( DOCUMENTATION/CULTURE/KEYBOARDLAYOUT.md ) ⟩
*/
const FUNKCIO_NOMOJ: Readonly<Record<KlavaFunkcio, { en: string; aih: string }>> = {
	shift: { en: "Shift", aih: "ſןw ſȷɹ" },
	back: { en: "Back", aih: "֭ſɭɹͷ̗" },
	space: { en: "Space", aih: "ꞁȷ̀ᴜ ɽ͑ʃ'ɔȝ" },
	enter: { en: "Enter", aih: "ſɭw ſ̀ȷᴜ" },
	symbol: { en: "Symbol", aih: "ſɭɘэ" },
	extra: { en: "Extra", aih: "ꞁȷ̀ꞇ }ʃᴜƽ" },
};

/**
* ⟨ j͑ʃɹ ɭʃᴜɔ˞ ⟩
*/
const VARIANTOJ: Readonly<Record<string, string[]>> = {};

// ⟨ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ( 1 ) ⟩
const LONGA_PREMO_DAŬRO = HE_L6HEINAK;

// ⟨ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ( 1 ) ⟩
const KOPII_KONFIRMA_DAŬRO = HE_L6HEINAK;

/**
* ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ( DOCUMENTATION/CULTURE/KEYBOARDLAYOUT.md git ) ⟩
*/
const KLAVARA_DEZAJNO = `# Small ( Cubii / ſɟw ʃɹ )

## First / ı],ᴜ ſ͕ɭᴜ ɭ(ꞇ

ɔ ı ɿ ц э ꞟ ɩ ƨ
ɭl̀ ſɟ ı], ſ͔ɭ ſ͕ȷ ſ͕ɭ ſɭ, ſɭˬ
ɽ͑ʃ' ɭʃ j͑ʃ' ɭ( }ʃ ֭ſɭ j͑ʃ j͐ʃ
ᶅſ ſן ſȷ ʃ ŋᷠ ſɭ ſᶘ ſ̀ȷ
ꞁȷ̀ ꞇ ɔ ɹ w ᴜ ɜ э ⅎ
[ Shift ] [ Back ] ｡ [ Space ] ⟅ [ Enter ] [ Symbol ]

## Second (Shift) / ſןɹ j͑ʃᴜ ɭ(ꞇ

ƨ̵ ⱻ ɜ́ ԏ u̵ ᶔ ⲁ ⌅̊
ᴎ ᴜ̭ ᶗ‹ ɴ ⱷ̮̀ ȝ ƴ ɯ
ƣ̋ ƨ ⰱ ԏ͕ c̗ ᴜ̩ ɔ˞ ͷ̗
п́ ɘ ʞ ɀ c̭ ƽ ꝛ̗ ŋ
ȏ ɭʃ' ⱷ᷐ ⲝ o ℩ }ʃ' c̏ oͩ
[ Shift ] [ Back ] v • ʌ [ Enter ] [ Symbol ]

## Third (Symbol) / ɭʃɹ ı],ᴜ ɭ(ꞇ

ꞙɭ [ x › ɘ ꭎ ] =
¥ ~ | < > # ; ⸰
ſ̋ȷ _ \ { } √ ‾ ⌑
ȏ̮ - / ( ) ^ — ⋄
≺ ⧼ ⟪ ⟨ ⺓ ⟩ ⟫ ⧽ ≻
[ Shift ] [ Back ] ⸙ [ Space ] ⸾ [ Enter ] [ Symbol ]

# Large ( Cutlii / ſɟw ſ̀ȷɹ )

ɔ ı ɿ ц э ꞟ ɩ ƨ ｡ ⟅ [ Extra ]
ɭl̀ ſɟ ı], ſ͔ɭ ꞇ ɹ ⅎ ſ͕ȷ ſ͕ɭ ſɭ, ſɭˬ
ɽ͑ʃ' ɭʃ j͑ʃ' ɭ( ɔ w ɜ }ʃ ֭ſɭ j͑ʃ j͐ʃ
ᶅſ ſן ſȷ ʃ ꞁȷ̀ ᴜ э ŋᷠ ſɭ ſᶘ ſ̀ȷ
[ ſןw ſȷɹ ] [ ֭ſɭɹͷ̗ ] [ ꞁȷ̀ᴜ ɽ͑ʃ'ɔȝ ] [ ſɭw ſ̀ȷᴜ ] [ ſɭɘэ ]

Also [ ſןw ſȷɹ ] is Shift, [ ֭ſɭɹͷ̗ ] is Back, [ ꞁȷ̀ᴜ ɽ͑ʃ'ɔȝ ] is Space, [ ſɭw ſ̀ȷᴜ ] is Enter, [ ſɭɘэ ] is Symbol.`;

// ⟪ j͑ʃɹ ſɭэ ſᶘɜ 💾 ⟫

let aktivaArangxoIndekso = 0o0;
let aktivaTavolaIndekso = 0o0;
let arangxoj: KlavarArangxo[] = [];
let funkciaMapo: Readonly<Record<string, KlavaFunkcio>> = FUNKCIOJ;
let enmetitaHistorio: string[] = [];
let ekstraReĝimo = false;
let longaPremo = false;
let ciklajIndeksoj = new Map<string, number>();

// ⟪ ꞁȷ̀ɔ j͑ʃƽɔƽ 🔧 ⟫

let enigaKampo: HTMLTextAreaElement | null = null;
let klavaraUjo: HTMLElement | null = null;
let tavolaEtikedElemento: HTMLElement | null = null;
let arangxoButonojUjo: HTMLElement | null = null;
let ekstraPanelo: HTMLElement | null = null;

// ⟪ j͑ʃ'ɔ ſȷᴜͷ̗ 📂 ⟫

/**
	j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ
		ꞁȷ̀ɔ j͑ʃƽɔƽ
	@returns KlavarArangxo[]
*/
function analiziArangxojn( krudaTeksto: string ): KlavarArangxo[] {
	const linioj = krudaTeksto.replace(/\r/g, "").split( "\n" );

	// ⟨ j͑ʃɹ ɭʃᴜɔ˞ ⟩
	funkciaMapo = { ...FUNKCIOJ, ...analiziNoton( linioj ) };

	const limoj: number[] = [];
	for ( let i = 0o0; i < linioj.length; i++ ) {
		const linio = linioj[i].trim();
		const senMark = linio.replace( /^#+\s*/, "" );
		if ( senMark.startsWith( "Small" ) || senMark.startsWith( "Large" ) ) {
			limoj.push( i );
		}
	}

	const arangxoj: KlavarArangxo[] = [];
	for ( let a = 0o0; a < limoj.length; a++ ) {
		const komenco = limoj[a];
		const fino = a + 0o1 < limoj.length ? limoj[a + 0o1] : linioj.length;
		arangxoj.push( analiziArangxon( linioj, komenco, fino ) );
	}

	/*
	* ⟨ ſɭʞɹ ʌ ſɟᴜ ı],ɹͷ̗ ( Cutlii Ŝanĝa Simbolo ) ⟩
	*/
	const malgranda = arangxoj[0o0];
	const granda = arangxoj[0o1];
	if ( malgranda && granda && granda.tavoloj.length === 0o1 && malgranda.tavoloj.length >= 0o3 ) {
		granda.tavoloj = kreiGrandajnTavolojn( granda.tavoloj[0o0], malgranda );
	}

	return arangxoj;
}

/**
	j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃᴜƽ
		ſɭɹ ſȷɔ
		ſɭɹ ſȷɔ
	@returns KlavarArangxo
*/
function analiziArangxon( linioj: string[], komenco: number, fino: number ): KlavarArangxo {
	const titolo = disigiNomon( linioj[komenco].replace( /^#+\s*/, "" ) );

	const tavolajLimoj: number[] = [];
	for ( let i = komenco + 0o1; i < fino; i++ ) {
		const linio = linioj[i].trim();
		const senMark = linio.replace( /^#+\s*/, "" );
		if ( senMark.startsWith( "First" ) || senMark.startsWith( "Second" ) || senMark.startsWith( "Third" ) ) {
			tavolajLimoj.push( i );
		}
	}

	if ( tavolajLimoj.length > 0o0 ) {
		const tavoloj: Tavolo[] = [];
		for ( let t = 0o0; t < tavolajLimoj.length; t++ ) {
			const tavolaKomenco = tavolajLimoj[t];
			const tavolaFino = t + 0o1 < tavolajLimoj.length ? tavolajLimoj[t + 0o1] : fino;
			tavoloj.push( analiziTavolon( linioj, tavolaKomenco, tavolaFino ) );
		}
		return { titoloEn: titolo.en, titoloAih: titolo.aih, tavoloj };
	}

	// ⟨ ſɟᴜ ı],ɹͷ̗ ( Cutlii ) ⟩
	return { titoloEn: titolo.en, titoloAih: titolo.aih, tavoloj: [ analiziTavolon( linioj, komenco, fino ) ] };
}

/**
	j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃᴜƽ
		ſɭɹ ſȷɔ
		ſɭɹ ſȷɔ
	@returns Tavolo
*/
function analiziTavolon( linioj: string[], komenco: number, fino: number ): Tavolo {
	const nomo = disigiNomon( linioj[komenco].replace( /^#+\s*/, "" ) );
	const vicaroj: Klavo[][] = [];
	let malsupraStrio: Klavo[] = [];

	for ( let i = komenco + 0o1; i < fino; i++ ) {
		const linio = linioj[i].trim();
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
	ſɭʞɹ ʌ j͑ʃᴜƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃᴜƽ
	@returns string[]
*/
function ĵetonigiLinion( linio: string ): string[] {
	const krudaj = linio.match( /\[[^\]]*\]|\S+/g ) ?? [];
	const ĵetonoj: string[] = [];

	for ( const kruda of krudaj ) {
		if ( estasFunkciaGrupo( kruda ) || estasUnuvortaGrupo( kruda ) ) {
			ĵetonoj.push( kruda );
		} else if ( kruda.startsWith( "[" ) && kruda.endsWith( "]" ) ) {
			// ⟨ ſɟᴜ ɭʃᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ⟩
			ĵetonoj.push( "[", ...kruda.slice( 0o1, -0o1 ).trim().split( /\s+/ ), "]" );
		} else {
			ĵetonoj.push( kruda );
		}
	}

	return ĵetonoj;
}

/**
	ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns boolean
*/
function estasFunkciaGrupo( ĵetono: string ): boolean {
	return !!funkciaMapo[ĵetono];
}

/**
	ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( [ Shift ] [ Empty ] )
		j͑ʃɹ ɭʃᴜɔ˞
	@returns boolean
*/
function estasUnuvortaGrupo( ĵetono: string ): boolean {
	return ĵetono.startsWith( "[" ) && ĵetono.endsWith( "]" ) && ĵetono.slice( 0o1, -0o1 ).trim().split( /\s+/ ).length === 0o1;
}

/**
	j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( [ Empty ] )
		j͑ʃɹ ɭʃᴜɔ˞
	@returns Klavo
*/
function kreiKlavon( ĵetono: string ): Klavo {
	const funkcio = funkciaMapo[ĵetono];
	if ( funkcio ) {
		return { etiked: ĵetono.slice( 0o1, -0o1 ).trim(), speco: "funkcio", valoro: funkcio };
	}
	if ( ĵetono === "[ Extra ]" || ĵetono === "[ Empty ]" ) {
		return { etiked: "", speco: "funkcio", valoro: "extra" };
	}
	return { etiked: ĵetono, speco: "signo", valoro: ĵetono };
}

/**
	j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Also is )
		j͑ʃᴜƽ
	@returns Record<string, KlavaFunkcio>
*/
function analiziNoton( linioj: string[] ): Record<string, KlavaFunkcio> {
	const mapo: Record<string, KlavaFunkcio> = {};

	for ( const linio of linioj ) {
		const t = linio.trim();
		if ( !t.startsWith( "Also" ) ) continue;

		for ( const kongruo of t.matchAll( /(\[[^\]]*\])\s+is\s+([^\s,.]+)/g ) ) {
			const grupo = kongruo[0o1];
			const ago = kongruo[0o2].toLowerCase();
			const funkcio = NOTAJAGOJ[ago];
			if ( grupo && funkcio ) mapo[grupo] = funkcio;
		}
	}

	return mapo;
}

/**
	j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔ˞ᴜ ſɭᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Cubii ſɟw ʃɹ )
		ſɭɔ˞ᴜ ſɭᴜ
	@returns { en: string; aih: string }
*/
function disigiNomon( kruda: string ): { en: string; aih: string } {
	const kongruo = kruda.match( /^(.+?)\s*\(\s*(.+?)\s*\/\s*(.+?)\s*\)$/ );
	if ( kongruo ) {
		return { en: `${kongruo[0o1].trim()} ( ${kongruo[0o2].trim()} )`, aih: kongruo[0o3].trim() };
	}

	const partoj = kruda.split( " / " );
	if ( partoj.length >= 0o2 ) {
		return {
			en: partoj[0o0].trim().replace( /\(\s*/g, "( " ).replace( /\s*\)/g, " )" ),
			aih: partoj[0o1].trim(),
		};
	}

	return { en: kruda, aih: kruda };
}

/**
	ſɭʞɹ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Ŝanĝa Simbolo )
		ſɟᴜ ı],ɹͷ̗
		ſɟᴜ ı],ɹͷ̗
	@returns Tavolo[]
*/
function kreiGrandajnTavolojn( bazo: Tavolo, malgranda: KlavarArangxo ): Tavolo[] {
	const ŝanĝaMapo = kreiSignanMapon( malgranda.tavoloj[0o0], malgranda.tavoloj[0o1] );
	const simbolaMapo = kreiSignanMapon( malgranda.tavoloj[0o0], malgranda.tavoloj[0o2] );

	const derivi = ( mapo: Record<string, string> ): Tavolo => ( {
		nomoEn: "",
		nomoAih: "",
		vicaroj: bazo.vicaroj.map( vico => vico.map( klavo =>
			klavo.speco === "signo" && mapo[klavo.valoro]
				? { etiked: mapo[klavo.valoro], speco: "signo", valoro: mapo[klavo.valoro] }
				: klavo
		) ),
		malsupraStrio: bazo.malsupraStrio,
	} );

	// ⟨ ſɭɔ˞ᴜ ſɭᴜ ʌ ſɟᴜ ı],ɹͷ̗ ⟩
	const ŝanĝa = derivi( ŝanĝaMapo );
	const simbola = derivi( simbolaMapo );
	ŝanĝa.nomoEn = malgranda.tavoloj[0o1].nomoEn;
	ŝanĝa.nomoAih = malgranda.tavoloj[0o1].nomoAih;
	simbola.nomoEn = malgranda.tavoloj[0o2].nomoEn;
	simbola.nomoAih = malgranda.tavoloj[0o2].nomoAih;

	return [ bazo, ŝanĝa, simbola ];
}

/**
	ſɭʞɹ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		ſɟᴜ ı],ɹͷ̗
		ſɟᴜ ı],ɹͷ̗
	@returns Record<string, string>
*/
function kreiSignanMapon( fontaTavolo: Tavolo, celaTavolo: Tavolo ): Record<string, string> {
	const mapo: Record<string, string> = {};

	const registri = ( fontaKlavo: Klavo, celaKlavo: Klavo | undefined ): void => {
		if ( fontaKlavo.speco !== "signo" || !celaKlavo || celaKlavo.speco !== "signo" ) return;
		if ( !( fontaKlavo.valoro in mapo ) ) mapo[fontaKlavo.valoro] = celaKlavo.valoro;
	};

	for ( let v = 0o0; v < fontaTavolo.vicaroj.length; v++ ) {
		const fontaVico = fontaTavolo.vicaroj[v];
		const celaVico = celaTavolo.vicaroj[v];
		for ( let k = 0o0; k < fontaVico.length; k++ ) {
			registri( fontaVico[k], celaVico?.[ k ] );
		}
	}

	for ( let k = 0o0; k < fontaTavolo.malsupraStrio.length; k++ ) {
		registri( fontaTavolo.malsupraStrio[k], celaTavolo.malsupraStrio[k] );
	}

	return mapo;
}

// ⟪ ſɭɔʞ 🈯 ⟫

/**
	j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( html )
	@returns string
*/
function nunaLingvo(): string {
	return document.documentElement.lang || "aih";
}

/**
	ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔ˞ᴜ ſɭᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( aih en )
		ſɭɔ˞ᴜ ſɭᴜ ( en )
		ſɭɔ˞ᴜ ſɭᴜ ( aih )
	@returns string
*/
function nomoPerLingvo( en: string, aih: string ): string {
	return nunaLingvo() === "aih" ? aih : en;
}

// ⟪ ſɟᴜ ſȷᴜɔ˞ 🖥️ ⟫

/**
	ſɟɔ ŋᷠɔ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		ſɭɹ ſȷɔ
	@returns void
*/
function montriArangxon( indekso: number ): void {
	const arangxo = arangxoj[indekso];
	if ( !arangxo || !arangxoButonojUjo ) return;
	aktivaArangxoIndekso = indekso;

	arangxoButonojUjo.replaceChildren();
	for ( let i = 0o0; i < arangxoj.length; i++ ) {
		const butono = document.createElement( "button" );
		butono.type = "button";
		butono.textContent = nomoPerLingvo( arangxoj[i].titoloEn, arangxoj[i].titoloAih );
		if ( i === aktivaArangxoIndekso ) {
			butono.setAttribute( "aria-pressed", "true" );
		}
		butono.addEventListener( "click", () => montriArangxon( i ) );
		arangxoButonojUjo.appendChild( butono );
	}

	montriTavolon( 0o0 );
}

/**
	ſɟɔ ŋᷠɔ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		ſɭɹ ſȷɔ
	@returns void
*/
function montriTavolon( indekso: number ): void {
	const arangxo = arangxoj[aktivaArangxoIndekso];
	const tavolo = arangxo?.tavoloj[indekso];
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

	// ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ ſɭɔʞ ( vacepu aih ) ⟩
	vacepu( "cepufal" );
}

/**
	ſɭʞɹ ʌ j͑ʃᴜƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( thala cakaxa )
		j͑ʃɹ ɭʃᴜɔ˞
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
	ſɭʞɹ ʌ ſᶘɹ }ʃᴜ }ʃw ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns HTMLButtonElement
*/
function kreiButonon( klavo: Klavo ): HTMLButtonElement {
	const butono = document.createElement( "button" );
	butono.type = "button";

	// ⟨ ſɟɔ ŋᷠɔ ʌ ſɭɔ˞ᴜ ſɭᴜ ⟩
	if ( klavo.speco === "funkcio" ) {
		const nomo = FUNKCIO_NOMOJ[klavo.valoro];
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
	ſɭʞɹ ʌ ſᶘɹ }ʃᴜ }ʃw ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		ſᶘɹ }ʃᴜ }ʃw
		j͑ʃɹ ɭʃᴜɔ˞
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

	butono.addEventListener( "pointerdown", ( evento ) => {
		evento.preventDefault();
		fermi();

		if ( ( VARIANTOJ[klavo.valoro]?.length ?? 0o0 ) === 0o0 ) return;

		temporizilo = window.setTimeout( () => {
			temporizilo = null;
			longaPremo = true;
			malfermiPanelon( klavo );
		}, LONGA_PREMO_DAŬRO * 0o1750 );
	} );

	// ⟨ ſɟɔ ŋᷠɔ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
	butono.addEventListener( "pointerup", () => {
		nuligi();
		fermiPanelon();
	} );
	butono.addEventListener( "pointerleave", fermi );
	butono.addEventListener( "pointercancel", fermi );
}

/**
	ſɟɔ ŋᷠɔ ʌ ſᶘɹ }ʃᴜ }ʃw ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns void
*/
function malfermiPanelon( klavo: SignaKlavo ): void {
	if ( !ekstraPanelo ) return;

	ekstraPanelo.replaceChildren();
	for ( const varianto of VARIANTOJ[klavo.valoro] ?? [] ) {
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
	ſɭɜ ʃɔ ʌ ſᶘɹ }ʃᴜ }ʃw ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
	@returns void
*/
function fermiPanelon(): void {
	if ( !ekstraPanelo ) return;
	ekstraPanelo.replaceChildren();
	ekstraPanelo.classList.add( "kobe" );
}

// ⟪ ſןɔ ʌ ſᶘɹ }ʃᴜ }ʃw 🖱️ ⟫

/**
	ſןɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns void
*/
function pritraktiKlavon( klavo: Klavo ): void {
	// ⟨ ſןw ʌ j͑ʃɹ ɭʃᴜɔ˞ ⟩
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
	j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns void
*/
function enmetiKlavon( klavo: SignaKlavo ): void {
	if ( aktivaArangxoIndekso === 0o1 && ekstraReĝimo ) {
		const variantoj = VARIANTOJ[klavo.valoro] ?? [];
		if ( variantoj.length > 0o0 ) {
			const indekso = ciklajIndeksoj.get( klavo.valoro ) ?? 0o0;
			enmetiTekston( variantoj[indekso] );
			ciklajIndeksoj.set( klavo.valoro, ( indekso + 0o1 ) % variantoj.length );
			return;
		}
	}

	enmetiTekston( klavo.valoro );
}

/**
	ſɭɹ ɽ͑ʃ'ɔ ʌ ſɭᴜc̗ ɭʃᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns void
*/
function pritraktiFunkcion( funkcio: KlavaFunkcio ): void {
	switch ( funkcio ) {
		case "shift":
			montriTavolon( aktivaTavolaIndekso === 0o1 ? 0o0 : 0o1 );
			break;
		case "symbol":
			montriTavolon( aktivaTavolaIndekso === 0o2 ? 0o0 : 0o2 );
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
	j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		ꞁȷ̀ɔ j͑ʃƽɔƽ
	@returns void
*/
function enmetiTekston( teksto: string ): void {
	if ( !enigaKampo ) return;
	const komenco = enigaKampo.selectionStart ?? enigaKampo.value.length;
	const fino = enigaKampo.selectionEnd ?? enigaKampo.value.length;

	enigaKampo.value = enigaKampo.value.slice( 0o0, komenco ) + teksto + enigaKampo.value.slice( fino );
	const novaPozicio = komenco + teksto.length;
	enigaKampo.setSelectionRange( novaPozicio, novaPozicio );
	enigaKampo.focus();

	// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ⟩
	enmetitaHistorio.push( teksto );
}

/**
	ſɟᴜ ɭʃᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
	@returns void
*/
function forigiLastanGrafemon(): void {
	if ( !enigaKampo ) return;
	const komenco = enigaKampo.selectionStart ?? enigaKampo.value.length;
	const fino = enigaKampo.selectionEnd ?? enigaKampo.value.length;

	// ⟨ ſןw ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
	if ( komenco !== fino ) {
		enigaKampo.value = enigaKampo.value.slice( 0o0, komenco ) + enigaKampo.value.slice( fino );
		enigaKampo.setSelectionRange( komenco, komenco );
		enigaKampo.focus();
		enmetitaHistorio = [];
		return;
	}

	if ( komenco > 0o0 ) {
		const antaŭa = enigaKampo.value.slice( 0o0, komenco );
		const lastaĴetono = enmetitaHistorio[enmetitaHistorio.length - 0o1];

		// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ⟩
		if ( lastaĴetono && antaŭa.endsWith( lastaĴetono ) ) {
			const novaPozicio = komenco - lastaĴetono.length;
			enigaKampo.value = enigaKampo.value.slice( 0o0, novaPozicio ) + enigaKampo.value.slice( komenco );
			enigaKampo.setSelectionRange( novaPozicio, novaPozicio );
			enmetitaHistorio.pop();
		} else {
			// ⟨ ſɟᴜ ɭʃᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
			const novaPozicio = komenco - longecoDeLastaGrafemo( antaŭa );
			enigaKampo.value = enigaKampo.value.slice( 0o0, novaPozicio ) + enigaKampo.value.slice( komenco );
			enigaKampo.setSelectionRange( novaPozicio, novaPozicio );
			enmetitaHistorio = [];
		}
		enigaKampo.focus();
	}
}

/**
	ſɭc̗ᴜ j͑ʃ'ɔ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Intl Segmenter )
		ꞁȷ̀ɔ j͑ʃƽɔƽ
	@returns number
*/
function longecoDeLastaGrafemo( teksto: string ): number {
	if ( !teksto ) return 0o0;

	const Segmentero = ( Intl as { Segmenter?: new ( lokaĵo?: string, opcioj?: { granularity?: string } ) => { segment( t: string ): Iterable<{ segment: string }> } } ).Segmenter;

	if ( Segmentero ) {
		const segmentilo = new Segmentero( undefined, { granularity: "grapheme" } );
		const segmentoj = [ ...segmentilo.segment( teksto ) ];
		const lasta = segmentoj[segmentoj.length - 0o1];
		if ( lasta ) return lasta.segment.length;
	}

	const kodpunktoj = Array.from( teksto );
	const lastaKodpunkto = kodpunktoj[kodpunktoj.length - 0o1];
	return lastaKodpunkto ? lastaKodpunkto.length : 0o0;
}

/**
	ſɟᴜ ɭʃᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
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
			}, KOPII_KONFIRMA_DAŬRO * 0o1750 ); // Heoj → ms
		}
	} catch ( eraro ) {
		console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Malsukcesis kopii la tekston.", eraro );
	}
}

/**
	ſɭɜ ʃɔ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
	@returns void
*/
function viŝiEnigon(): void {
	if ( !enigaKampo ) return;
	enigaKampo.value = "";
	enigaKampo.focus();
	enmetitaHistorio = [];
}

// ⟪ j͑ʃᴜ ı],ɔ 🚀 ⟫

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

	const krudaTeksto = KLAVARA_DEZAJNO;
	arangxoj = analiziArangxojn( krudaTeksto );
	montriArangxon( 0o0 );

	// ⟨ ſןw ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
	enigaKampo.addEventListener( "input", () => {
		enmetitaHistorio = [];
	} );

	kopiiButono?.addEventListener( "click", () => { void kopiiTekston(); } );
	viŝiButono?.addEventListener( "click", viŝiEnigon );
});
