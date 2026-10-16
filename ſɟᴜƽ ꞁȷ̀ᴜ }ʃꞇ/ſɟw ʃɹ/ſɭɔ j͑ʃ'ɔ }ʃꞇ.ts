/// <reference types="vite/client" />

/*
* ≺⧼ ſɟw ʃɹ - ſ̀ȷᴜ ⌨️ ⧽≻
* ſɭʞɹ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Cubii Cutlii first change symbol )
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( DOCUMENTATION/CULTURE/KEYBOARDLAYOUT.md git )
* ſɟᴜ ı],ɹͷ̗ ( first change symbol Cubii Cutlii )
* ſɟɔ ŋᷠɔ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( aih en )
*/

// ⟪ ֭ſɭᴜ ı],ɔ 📐 ⟫

type Kp6Keve = "shift" | "back" | "space" | "enter" | "symbol" | "extra";

interface Kp6S2 {
	ksaka: string;
	hat: "kp6";
	kp6: string;
}

interface KeveS2 {
	ksaka: string;
	hat: "keve";
	kp6: Kp6Keve;
}

type S2 = Kp6S2 | KeveS2;

interface Kuba {
	ksakaEn: string;
	ksakaAih: string;
	n2kCa1ara: S2[][];
	araqS2Ca1ara: S2[];
}

interface Kp6Htaka {
	ksakaEn: string;
	ksakaAih: string;
	kubaCa1ara: Kuba[];
}

// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 📦 ⟫

// ⟨ ſɭᴜc̗ ɭʃᴜ ſɭɔ j͑ʃ'ɔ j͑ʃᴜꞇ ⟩
const KEVE_SAXE: Readonly<Record<string, Kp6Keve>> = {
	"[Shift]": "shift",
	"[Back]": "back",
	"[Space]": "space",
	"[Enter]": "enter",
	"[Symbol]": "symbol",
};

// ⟨ j͑ʃᴜƽ ʌ ſɭɔʞ ( Also is ) ⟩
const KEVE_K61e: Readonly<Record<string, Kp6Keve>> = {
	"shift": "shift",
	"back": "back",
	"space": "space",
	"enter": "enter",
	"symbol": "symbol",
};

/**
* ⟨ ſɭɔ˞ᴜ ſɭᴜ ʌ ſɭɔʞ ( DOCUMENTATION/CULTURE/KEYBOARDLAYOUT.md ) ⟩
*/
const KEVE_KSAKA: Readonly<Record<Kp6Keve, { en: string; aih: string }>> = {
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
const VOP2: Readonly<Record<string, string[]>> = {};

// ⟨ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ( 1 ) ⟩
const PU_XEMA_K2FE = HE_L6HEINAK;

// ⟨ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ( 1 ) ⟩
const XEMA_XEKOX2Q_K2FE = HE_L6HEINAK;

/**
* ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ( DOCUMENTATION/CULTURE/KEYBOARDLAYOUT.md git ) ⟩
*/
const SAXE_KP6HTAKA = `# Small ( Cubii / ſɟw ʃɹ )

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

let kxesuKp6HtakaK2fe = 0o0;
let kxesuKubaK2fe = 0o0;
let kp6HtakaCa1ara: Kp6Htaka[] = [];
let keveBal2xa: Readonly<Record<string, Kp6Keve>> = KEVE_SAXE;
let xemaK61eCa1ara: string[] = [];
let puKeve = false;
let puXema = false;
let vop2K2feBal2xa = new Map<string, number>();

// ⟪ ꞁȷ̀ɔ j͑ʃƽɔƽ 🔧 ⟫

let xemaKuba: HTMLTextAreaElement | null = null;
let s2Xema: HTMLElement | null = null;
let kubaKsakaKek: HTMLElement | null = null;
let htakaKekXema: HTMLElement | null = null;
let puKuba: HTMLElement | null = null;

// ⟪ j͑ʃ'ɔ ſȷᴜͷ̗ 📂 ⟫

/**
	j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ
		ꞁȷ̀ɔ j͑ʃƽɔƽ
	@returns Kp6Htaka[]
*/
function kf2Kp6HtakaCa1ara( ne1anesaiK61e: string ): Kp6Htaka[] {
	const han2k = ne1anesaiK61e.replace(/\r/g, "").split( "\n" );

	// ⟨ j͑ʃɹ ɭʃᴜɔ˞ ⟩
	keveBal2xa = { ...KEVE_SAXE, ...kf2Keve( han2k ) };

	const saxeAraqCa1ara: number[] = [];
	for ( let i = 0o0; i < han2k.length; i++ ) {
		const n2k = han2k[i].trim();
		const saxeK61e = n2k.replace( /^#+\s*/, "" );
		if ( saxeK61e.startsWith( "Small" ) || saxeK61e.startsWith( "Large" ) ) {
			saxeAraqCa1ara.push( i );
		}
	}

	const kp6HtakaCa1ara: Kp6Htaka[] = [];
	for ( let a = 0o0; a < saxeAraqCa1ara.length; a++ ) {
		const saxeK2fe = saxeAraqCa1ara[a];
		const araqK2fe = a + 0o1 < saxeAraqCa1ara.length ? saxeAraqCa1ara[a + 0o1] : han2k.length;
		kp6HtakaCa1ara.push( kf2Kp6Htaka( han2k, saxeK2fe, araqK2fe ) );
	}

	/*
	* ⟨ ſɭʞɹ ʌ ſɟᴜ ı],ɹͷ̗ ( Cutlii change symbol ) ⟩
	*/
	const m2Kp6Htaka = kp6HtakaCa1ara[0o0];
	const puKp6Htaka = kp6HtakaCa1ara[0o1];
	if ( m2Kp6Htaka && puKp6Htaka && puKp6Htaka.kubaCa1ara.length === 0o1 && m2Kp6Htaka.kubaCa1ara.length >= 0o3 ) {
		puKp6Htaka.kubaCa1ara = kf2PuKuba( puKp6Htaka.kubaCa1ara[0o0], m2Kp6Htaka );
	}

	return kp6HtakaCa1ara;
}

/**
	j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃᴜƽ
		ſɭɹ ſȷɔ
		ſɭɹ ſȷɔ
	@returns Kp6Htaka
*/
function kf2Kp6Htaka( han2k: string[], saxeK2fe: number, araqK2fe: number ): Kp6Htaka {
	const ksaka = quqKsaka( han2k[saxeK2fe].replace( /^#+\s*/, "" ) );

	const kubaSaxeAraqCa1ara: number[] = [];
	for ( let i = saxeK2fe + 0o1; i < araqK2fe; i++ ) {
		const n2k = han2k[i].trim();
		const saxeK61e = n2k.replace( /^#+\s*/, "" );
		if ( saxeK61e.startsWith( "First" ) || saxeK61e.startsWith( "Second" ) || saxeK61e.startsWith( "Third" ) ) {
			kubaSaxeAraqCa1ara.push( i );
		}
	}

	if ( kubaSaxeAraqCa1ara.length > 0o0 ) {
		const kubaCa1ara: Kuba[] = [];
		for ( let t = 0o0; t < kubaSaxeAraqCa1ara.length; t++ ) {
			const kubaSaxeK2fe = kubaSaxeAraqCa1ara[t];
			const kubaAraqK2fe = t + 0o1 < kubaSaxeAraqCa1ara.length ? kubaSaxeAraqCa1ara[t + 0o1] : araqK2fe;
			kubaCa1ara.push( kf2Kuba( han2k, kubaSaxeK2fe, kubaAraqK2fe ) );
		}
		return { ksakaEn: ksaka.en, ksakaAih: ksaka.aih, kubaCa1ara };
	}

	// ⟨ ſɟᴜ ı],ɹͷ̗ ( Cutlii ) ⟩
	return { ksakaEn: ksaka.en, ksakaAih: ksaka.aih, kubaCa1ara: [ kf2Kuba( han2k, saxeK2fe, araqK2fe ) ] };
}

/**
	j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃᴜƽ
		ſɭɹ ſȷɔ
		ſɭɹ ſȷɔ
	@returns Kuba
*/
function kf2Kuba( han2k: string[], saxeK2fe: number, araqK2fe: number ): Kuba {
	const ksaka = quqKsaka( han2k[saxeK2fe].replace( /^#+\s*/, "" ) );
	const n2kCa1ara: S2[][] = [];
	let araqS2Ca1ara: S2[] = [];

	for ( let i = saxeK2fe + 0o1; i < araqK2fe; i++ ) {
		const n2k = han2k[i].trim();
		if ( !n2k || n2k.startsWith( "Also" ) ) continue;

		const s2Ca1ara = s2N2k( n2k );
		if ( s2Ca1ara.some( keveHate ) ) {
			araqS2Ca1ara = s2Ca1ara.map( kf2S2 );
		} else {
			n2kCa1ara.push( s2Ca1ara.map( kf2S2 ) );
		}
	}

	return { ksakaEn: ksaka.en, ksakaAih: ksaka.aih, n2kCa1ara, araqS2Ca1ara };
}

/**
	ſɭʞɹ ʌ j͑ʃᴜƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃᴜƽ
	@returns string[]
*/
function s2N2k( n2k: string ): string[] {
	const ne1anesaiCa1ara = n2k.match( /\[[^\]]*\]|\S+/g ) ?? [];
	const s2Ca1ara: string[] = [];

	for ( const ne1anesai of ne1anesaiCa1ara ) {
		if ( keveHate( ne1anesai ) || s2Kp6( ne1anesai ) ) {
			s2Ca1ara.push( ne1anesai );
		} else if ( ne1anesai.startsWith( "[" ) && ne1anesai.endsWith( "]" ) ) {
			// ⟨ ſɟᴜ ɭʃᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ⟩
			s2Ca1ara.push( "[", ...ne1anesai.slice( 0o1, -0o1 ).trim().split( /\s+/ ), "]" );
		} else {
			s2Ca1ara.push( ne1anesai );
		}
	}

	return s2Ca1ara;
}

/**
	ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns boolean
*/
function keveHate( s2: string ): boolean {
	return !!keveBal2xa[s2];
}

/**
	ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( [ Shift ] [ Empty ] )
		j͑ʃɹ ɭʃᴜɔ˞
	@returns boolean
*/
function s2Kp6( s2: string ): boolean {
	return s2.startsWith( "[" ) && s2.endsWith( "]" ) && s2.slice( 0o1, -0o1 ).trim().split( /\s+/ ).length === 0o1;
}

/**
	j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( [ Empty ] )
		j͑ʃɹ ɭʃᴜɔ˞
	@returns S2
*/
function kf2S2( s2: string ): S2 {
	const keve = keveBal2xa[s2];
	if ( keve ) {
		return { ksaka: s2.slice( 0o1, -0o1 ).trim(), hat: "keve", kp6: keve };
	}
	if ( s2 === "[ Extra ]" || s2 === "[ Empty ]" ) {
		return { ksaka: "", hat: "keve", kp6: "extra" };
	}
	return { ksaka: s2, hat: "kp6", kp6: s2 };
}

/**
	j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Also is )
		j͑ʃᴜƽ
	@returns Record<string, Kp6Keve>
*/
function kf2Keve( han2k: string[] ): Record<string, Kp6Keve> {
	const bal2xa: Record<string, Kp6Keve> = {};

	for ( const n2k of han2k ) {
		const t = n2k.trim();
		if ( !t.startsWith( "Also" ) ) continue;

		for ( const xekox2q of t.matchAll( /(\[[^\]]*\])\s+is\s+([^\s,.]+)/g ) ) {
			const hate = xekox2q[0o1];
			const k61e = xekox2q[0o2].toLowerCase();
			const keve = KEVE_K61e[k61e];
			if ( hate && keve ) bal2xa[hate] = keve;
		}
	}

	return bal2xa;
}

/**
	j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɔ˞ᴜ ſɭᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Cubii ſɟw ʃɹ )
		ſɭɔ˞ᴜ ſɭᴜ
	@returns { en: string; aih: string }
*/
function quqKsaka( ne1anesai: string ): { en: string; aih: string } {
	const xekox2q = ne1anesai.match( /^(.+?)\s*\(\s*(.+?)\s*\/\s*(.+?)\s*\)$/ );
	if ( xekox2q ) {
		return { en: `${xekox2q[0o1].trim()} ( ${xekox2q[0o2].trim()} )`, aih: xekox2q[0o3].trim() };
	}

	const s2Ca1ara = ne1anesai.split( " / " );
	if ( s2Ca1ara.length >= 0o2 ) {
		return {
			en: s2Ca1ara[0o0].trim().replace( /\(\s*/g, "( " ).replace( /\s*\)/g, " )" ),
			aih: s2Ca1ara[0o1].trim(),
		};
	}

	return { en: ne1anesai, aih: ne1anesai };
}

/**
	ſɭʞɹ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( change symbol )
		ſɟᴜ ı],ɹͷ̗
		ſɟᴜ ı],ɹͷ̗
	@returns Kuba[]
*/
function kf2PuKuba( kubaSaxe: Kuba, m2Kp6Htaka: Kp6Htaka ): Kuba[] {
	const vop2Bal2xa = kf2Kp6Bal2xa( m2Kp6Htaka.kubaCa1ara[0o0], m2Kp6Htaka.kubaCa1ara[0o1] );
	const kp6Bal2xa = kf2Kp6Bal2xa( m2Kp6Htaka.kubaCa1ara[0o0], m2Kp6Htaka.kubaCa1ara[0o2] );

	const kf2Bal2xa = ( bal2xa: Record<string, string> ): Kuba => ( {
		ksakaEn: "",
		ksakaAih: "",
		n2kCa1ara: kubaSaxe.n2kCa1ara.map( n2k => n2k.map( s2 =>
			s2.hat === "kp6" && bal2xa[s2.kp6]
				? { ksaka: bal2xa[s2.kp6], hat: "kp6", kp6: bal2xa[s2.kp6] }
				: s2
		) ),
		araqS2Ca1ara: kubaSaxe.araqS2Ca1ara,
	} );

	// ⟨ ſɭɔ˞ᴜ ſɭᴜ ʌ ſɟᴜ ı],ɹͷ̗ ⟩
	const vop2 = kf2Bal2xa( vop2Bal2xa );
	const kp6 = kf2Bal2xa( kp6Bal2xa );
	vop2.ksakaEn = m2Kp6Htaka.kubaCa1ara[0o1].ksakaEn;
	vop2.ksakaAih = m2Kp6Htaka.kubaCa1ara[0o1].ksakaAih;
	kp6.ksakaEn = m2Kp6Htaka.kubaCa1ara[0o2].ksakaEn;
	kp6.ksakaAih = m2Kp6Htaka.kubaCa1ara[0o2].ksakaAih;

	return [ kubaSaxe, vop2, kp6 ];
}

/**
	ſɭʞɹ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		ſɟᴜ ı],ɹͷ̗
		ſɟᴜ ı],ɹͷ̗
	@returns Record<string, string>
*/
function kf2Kp6Bal2xa( saxeKuba: Kuba, araqKuba: Kuba ): Record<string, string> {
	const bal2xa: Record<string, string> = {};

	const xemaBal2xa = ( saxeS2: S2, araqS2: S2 | undefined ): void => {
		if ( saxeS2.hat !== "kp6" || !araqS2 || araqS2.hat !== "kp6" ) return;
		if ( !( saxeS2.kp6 in bal2xa ) ) bal2xa[saxeS2.kp6] = araqS2.kp6;
	};

	for ( let v = 0o0; v < saxeKuba.n2kCa1ara.length; v++ ) {
		const saxeN2k = saxeKuba.n2kCa1ara[v];
		const araqN2k = araqKuba.n2kCa1ara[v];
		for ( let k = 0o0; k < saxeN2k.length; k++ ) {
			xemaBal2xa( saxeN2k[k], araqN2k?.[ k ] );
		}
	}

	for ( let k = 0o0; k < saxeKuba.araqS2Ca1ara.length; k++ ) {
		xemaBal2xa( saxeKuba.araqS2Ca1ara[k], araqKuba.araqS2Ca1ara[k] );
	}

	return bal2xa;
}

// ⟪ ſɭɔʞ 🈯 ⟫

/**
	j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( html )
	@returns string
*/
function kxesuLang(): string {
	return document.documentElement.lang || "aih";
}

/**
	ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɭɔ˞ᴜ ſɭᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( aih en )
		ſɭɔ˞ᴜ ſɭᴜ ( en )
		ſɭɔ˞ᴜ ſɭᴜ ( aih )
	@returns string
*/
function kxesuKsaka( en: string, aih: string ): string {
	return kxesuLang() === "aih" ? aih : en;
}

// ⟪ ſɟᴜ ſȷᴜɔ˞ 🖥️ ⟫

/**
	ſɟɔ ŋᷠɔ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		ſɭɹ ſȷɔ
	@returns void
*/
function suntaKp6Htaka( k2fe: number ): void {
	const htaka = kp6HtakaCa1ara[k2fe];
	if ( !htaka || !htakaKekXema ) return;
	kxesuKp6HtakaK2fe = k2fe;

	htakaKekXema.replaceChildren();
	for ( let i = 0o0; i < kp6HtakaCa1ara.length; i++ ) {
		const kek = document.createElement( "button" );
		kek.type = "button";
		kek.textContent = kxesuKsaka( kp6HtakaCa1ara[i].ksakaEn, kp6HtakaCa1ara[i].ksakaAih );
		if ( i === kxesuKp6HtakaK2fe ) {
			kek.setAttribute( "aria-pressed", "true" );
		}
		kek.addEventListener( "click", () => suntaKp6Htaka( i ) );
		htakaKekXema.appendChild( kek );
	}

	suntaKuba( 0o0 );
}

/**
	ſɟɔ ŋᷠɔ ʌ ſɟᴜ ı],ɹͷ̗ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		ſɭɹ ſȷɔ
	@returns void
*/
function suntaKuba( k2fe: number ): void {
	const htaka = kp6HtakaCa1ara[kxesuKp6HtakaK2fe];
	const kuba = htaka?.kubaCa1ara[k2fe];
	if ( !kuba || !s2Xema || !kubaKsakaKek ) return;

	kxesuKubaK2fe = k2fe;
	kubaKsakaKek.textContent = kxesuKsaka( kuba.ksakaEn, kuba.ksakaAih );
	s2Xema.replaceChildren();
	araqKuba();
	puXema = false;
	vop2K2feBal2xa.clear();

	for ( const n2k of kuba.n2kCa1ara ) {
		s2Xema.appendChild( kf2N2k( n2k ) );
	}
	s2Xema.appendChild( kf2N2k( kuba.araqS2Ca1ara ) );

	// ⟨ ſɭɹ ɽ͑ʃ'ɔ ʌ ſɭɔʞ ( vacepu aih ) ⟩
	vacepu( "cepufal" );
}

/**
	ſɭʞɹ ʌ j͑ʃᴜƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( thala cakaxa )
		j͑ʃɹ ɭʃᴜɔ˞
	@returns HTMLElement
*/
function kf2N2k( s2Ca1ara: S2[] ): HTMLElement {
	const n2k = document.createElement( "thala" );
	n2k.className = "cakaxa";

	for ( const s2 of s2Ca1ara ) {
		n2k.appendChild( kf2S2Kek( s2 ) );
	}
	return n2k;
}

/**
	ſɭʞɹ ʌ ſᶘɹ }ʃᴜ }ʃw ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns HTMLButtonElement
*/
function kf2S2Kek( s2: S2 ): HTMLButtonElement {
	const kek = document.createElement( "button" );
	kek.type = "button";

	// ⟨ ſɟɔ ŋᷠɔ ʌ ſɭɔ˞ᴜ ſɭᴜ ⟩
	if ( s2.hat === "keve" ) {
		const ksaka = KEVE_KSAKA[s2.kp6];
		kek.textContent = kxesuKsaka( ksaka.en, ksaka.aih );
	} else {
		kek.textContent = s2.ksaka;
	}

	if ( s2.hat === "keve" ) {
		if ( ( s2.kp6 === "shift" && kxesuKubaK2fe === 0o1 ) ||
			( s2.kp6 === "symbol" && kxesuKubaK2fe === 0o2 ) ||
			( s2.kp6 === "extra" && puKeve ) ) {
			kek.setAttribute( "aria-pressed", "true" );
		}
	} else {
		kf2PuXema( kek, s2 );
	}

	kek.addEventListener( "click", () => keveS2( s2 ) );
	return kek;
}

/**
	ſɭʞɹ ʌ ſᶘɹ }ʃᴜ }ʃw ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		ſᶘɹ }ʃᴜ }ʃw
		j͑ʃɹ ɭʃᴜɔ˞
	@returns void
*/
function kf2PuXema( kek: HTMLButtonElement, s2: Kp6S2 ): void {
	let k2feXema: number | null = null;

	const ne1aK2feXema = (): void => {
		if ( k2feXema !== null ) {
			window.clearTimeout( k2feXema );
			k2feXema = null;
		}
	};

	const ne1aPuXema = (): void => {
		ne1aK2feXema();
		araqKuba();
		puXema = false;
	};

	kek.addEventListener( "pointerdown", ( e ) => {
		e.preventDefault();
		ne1aPuXema();

		if ( ( VOP2[s2.kp6]?.length ?? 0o0 ) === 0o0 ) return;

		k2feXema = window.setTimeout( () => {
			k2feXema = null;
			puXema = true;
			saxePuKuba( s2 );
		}, PU_XEMA_K2FE * 0o1750 );
	} );

	// ⟨ ſɟɔ ŋᷠɔ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
	kek.addEventListener( "pointerup", () => {
		ne1aK2feXema();
		araqKuba();
	} );
	kek.addEventListener( "pointerleave", ne1aPuXema );
	kek.addEventListener( "pointercancel", ne1aPuXema );
}

/**
	ſɟɔ ŋᷠɔ ʌ ſᶘɹ }ʃᴜ }ʃw ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns void
*/
function saxePuKuba( s2: Kp6S2 ): void {
	if ( !puKuba ) return;

	puKuba.replaceChildren();
	for ( const vop2 of VOP2[s2.kp6] ?? [] ) {
		const kek = document.createElement( "button" );
		kek.type = "button";
		kek.textContent = vop2;
		kek.addEventListener( "click", () => {
			xemaK61e( vop2 );
			araqKuba();
		} );
		puKuba.appendChild( kek );
	}

	puKuba.classList.remove( "kobe" );
	vacepu( "cepufal" );
}

/**
	ſɭɜ ʃɔ ʌ ſᶘɹ }ʃᴜ }ʃw ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
	@returns void
*/
function araqKuba(): void {
	if ( !puKuba ) return;
	puKuba.replaceChildren();
	puKuba.classList.add( "kobe" );
}

// ⟪ ſןɔ ʌ ſᶘɹ }ʃᴜ }ʃw 🖱️ ⟫

/**
	ſןɔ ʌ j͑ʃɹ ɭʃᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns void
*/
function keveS2( s2: S2 ): void {
	// ⟨ ſןw ʌ j͑ʃɹ ɭʃᴜɔ˞ ⟩
	if ( puXema ) {
		puXema = false;
		return;
	}

	if ( s2.hat === "kp6" ) {
		xemaS2( s2 );
	} else {
		keve( s2.kp6 );
	}
}

/**
	j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns void
*/
function xemaS2( s2: Kp6S2 ): void {
	if ( kxesuKp6HtakaK2fe === 0o1 && puKeve ) {
		const vop2Ca1ara = VOP2[s2.kp6] ?? [];
		if ( vop2Ca1ara.length > 0o0 ) {
			const k2fe = vop2K2feBal2xa.get( s2.kp6 ) ?? 0o0;
			xemaK61e( vop2Ca1ara[k2fe] );
			vop2K2feBal2xa.set( s2.kp6, ( k2fe + 0o1 ) % vop2Ca1ara.length );
			return;
		}
	}

	xemaK61e( s2.kp6 );
}

/**
	ſɭɹ ɽ͑ʃ'ɔ ʌ ſɭᴜc̗ ɭʃᴜ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		j͑ʃɹ ɭʃᴜɔ˞
	@returns void
*/
function keve( keve: Kp6Keve ): void {
	switch ( keve ) {
		case "shift":
			suntaKuba( kxesuKubaK2fe === 0o1 ? 0o0 : 0o1 );
			break;
		case "symbol":
			suntaKuba( kxesuKubaK2fe === 0o2 ? 0o0 : 0o2 );
			break;
		case "extra":
			puKeve = !puKeve;
			vop2K2feBal2xa.clear();
			suntaKuba( kxesuKubaK2fe );
			break;
		case "back":
			ne1aGrafero();
			break;
		case "space":
			xemaK61e( " " );
			break;
		case "enter":
			xemaK61e( "\n" );
			break;
	}
}

/**
	j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		ꞁȷ̀ɔ j͑ʃƽɔƽ
	@returns void
*/
function xemaK61e( k61e: string ): void {
	if ( !xemaKuba ) return;
	const saxeK2fe = xemaKuba.selectionStart ?? xemaKuba.value.length;
	const araqK2fe = xemaKuba.selectionEnd ?? xemaKuba.value.length;

	xemaKuba.value = xemaKuba.value.slice( 0o0, saxeK2fe ) + k61e + xemaKuba.value.slice( araqK2fe );
	const kxesuK2fe = saxeK2fe + k61e.length;
	xemaKuba.setSelectionRange( kxesuK2fe, kxesuK2fe );
	xemaKuba.focus();

	// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ⟩
	xemaK61eCa1ara.push( k61e );
}

/**
	ſɟᴜ ɭʃᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
	@returns void
*/
function ne1aGrafero(): void {
	if ( !xemaKuba ) return;
	const saxeK2fe = xemaKuba.selectionStart ?? xemaKuba.value.length;
	const araqK2fe = xemaKuba.selectionEnd ?? xemaKuba.value.length;

	// ⟨ ſןw ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
	if ( saxeK2fe !== araqK2fe ) {
		xemaKuba.value = xemaKuba.value.slice( 0o0, saxeK2fe ) + xemaKuba.value.slice( araqK2fe );
		xemaKuba.setSelectionRange( saxeK2fe, saxeK2fe );
		xemaKuba.focus();
		xemaK61eCa1ara = [];
		return;
	}

	if ( saxeK2fe > 0o0 ) {
		const saxeK61e = xemaKuba.value.slice( 0o0, saxeK2fe );
		const kxesuS2 = xemaK61eCa1ara[xemaK61eCa1ara.length - 0o1];

		// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ⟩
		if ( kxesuS2 && saxeK61e.endsWith( kxesuS2 ) ) {
			const kxesuK2fe = saxeK2fe - kxesuS2.length;
			xemaKuba.value = xemaKuba.value.slice( 0o0, kxesuK2fe ) + xemaKuba.value.slice( saxeK2fe );
			xemaKuba.setSelectionRange( kxesuK2fe, kxesuK2fe );
			xemaK61eCa1ara.pop();
		} else {
			// ⟨ ſɟᴜ ɭʃᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
			const kxesuK2fe = saxeK2fe - k2feGrafero( saxeK61e );
			xemaKuba.value = xemaKuba.value.slice( 0o0, kxesuK2fe ) + xemaKuba.value.slice( saxeK2fe );
			xemaKuba.setSelectionRange( kxesuK2fe, kxesuK2fe );
			xemaK61eCa1ara = [];
		}
		xemaKuba.focus();
	}
}

/**
	ſɭc̗ᴜ j͑ʃ'ɔ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( Intl Segmenter )
		ꞁȷ̀ɔ j͑ʃƽɔƽ
	@returns number
*/
function k2feGrafero( k61e: string ): number {
	if ( !k61e ) return 0o0;

	const S2Xema = ( Intl as { Segmenter?: new ( lang?: string, xema?: { granularity?: string } ) => { segment( t: string ): Iterable<{ segment: string }> } } ).Segmenter;

	if ( S2Xema ) {
		const s2Quq = new S2Xema( undefined, { granularity: "grapheme" } );
		const s2Ca1ara = [ ...s2Quq.segment( k61e ) ];
		const kxesuS2 = s2Ca1ara[s2Ca1ara.length - 0o1];
		if ( kxesuS2 ) return kxesuS2.segment.length;
	}

	const k2feCa1ara = Array.from( k61e );
	const k2fe = k2feCa1ara[k2feCa1ara.length - 0o1];
	return k2fe ? k2fe.length : 0o0;
}

/**
	ſɟᴜ ɭʃᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
	@returns Promise
*/
async function suntaK61e(): Promise<void> {
	if ( !xemaKuba ) return;
	const kek = document.getElementById( "xema-kek" ) as HTMLButtonElement | null;

	try {
		await navigator.clipboard.writeText( xemaKuba.value );
		if ( kek ) {
			const saxeKsaka = kek.textContent;
			kek.textContent = "✓";
			setTimeout( () => {
				kek.textContent = saxeKsaka;
			}, XEMA_XEKOX2Q_K2FE * 0o1750 ); // ខ្មែរ - ហេទៅមិល្លីវិនាទី
		}
	} catch ( tlohk2ni ) {
		console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )", tlohk2ni );
	}
}

/**
	ſɭɜ ʃɔ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
	@returns void
*/
function ne1aXema(): void {
	if ( !xemaKuba ) return;
	xemaKuba.value = "";
	xemaKuba.focus();
	xemaK61eCa1ara = [];
}

// ⟪ j͑ʃᴜ ı],ɔ 🚀 ⟫

document.addEventListener( "DOMContentLoaded", () => {
	xemaKuba = document.getElementById( "xema-kuba" ) as HTMLTextAreaElement | null;
	s2Xema = document.getElementById( "s2-xema" ) as HTMLElement | null;
	kubaKsakaKek = document.getElementById( "kuba-ksaka" ) as HTMLElement | null;
	htakaKekXema = document.getElementById( "htaka-kek-xema" ) as HTMLElement | null;
	puKuba = document.getElementById( "pu-kuba" ) as HTMLElement | null;
	const xemaKek = document.getElementById( "xema-kek" ) as HTMLButtonElement | null;
	const ne1aKek = document.getElementById( "ne1a-kek" ) as HTMLButtonElement | null;

	if ( !xemaKuba || !s2Xema || !kubaKsakaKek || !htakaKekXema ) {
		console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ne1a xemaKuba s2Xema." );
		return;
	}

	const ne1anesaiK61e = SAXE_KP6HTAKA;
	kp6HtakaCa1ara = kf2Kp6HtakaCa1ara( ne1anesaiK61e );
	suntaKp6Htaka( 0o0 );

	// ⟨ ſןw ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
	xemaKuba.addEventListener( "input", () => {
		xemaK61eCa1ara = [];
	} );

	xemaKek?.addEventListener( "click", () => { void suntaK61e(); } );
	ne1aKek?.addEventListener( "click", ne1aXema );
});
