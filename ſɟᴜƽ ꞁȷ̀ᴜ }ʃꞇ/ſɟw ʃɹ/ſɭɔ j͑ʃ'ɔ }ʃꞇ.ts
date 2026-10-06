/// <reference types="vite/client" />

/*
* ≺⧼ ſɟw ʃɹ - ទំព័រក្រឡប់ចំណុចកណ្តាល ⌨️ ⧽≻
* បង្កើតក្រឡប់ចំណុចកណ្តាលពីរចន្លោះដែលបានបញ្ចូល។ ឯកសាររចនាការ
* ( DOCUMENTATION/CULTURE/KEYBOARDLAYOUT.md ) មិនត្រូវបានតាមដានក្នុង git ដូច្នេះមាតិការរបស់វា
* ត្រូវបានបញ្ចូលទីនេះ ដើម្បីឱ្យក្រឡប់ចំណុចកណ្តាលដំណើរការដោយគ្មានវា។
* ឯកសារកំណត់ការរៀបចំពីរ - តូច ( Cubii / ſɟw ʃɹ ) ដែលមានតារាងបី
* ( Unua, Ŝanĝo, Simbolo ) និងធំ ( Cutlii / ſɟw ſ̀ȷɹ ) ដែលមាន
* តារាងមូលដ្ឋានតែមួយ។ ការរៀបចំធំដូចជាដើមបង្កើតតារាង Ŝanĝa និង Simbolan របស់ខ្លួនវាតាមមូលដ្ឋាន
* តាមមូលដ្ឋានរបស់ខ្លួនវា - សញ្ញានីមួយៗទទួលបានកំណែដែលបានបង្កើតនៃសញ្ញា
* ដូចគ្នាពីការរៀបចំតូច។ ឈ្មោះដែលមាន " / " បង្ហាញតែផ្នែកជា Iikrhia
* នៅក្នុង aih និងតែផ្នែកអង់គ្លេសនៅក្នុង en។
*/

// ⟪ ប្រភេទ 📐 ⟫

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

// ⟪ ថេរស្មែក 📦 ⟫

// ⟨ ក្រឡប់ចំណុចកណ្តាលមុខងងឹតនៃការរៀបចំតូច ⟩
const FUNKCIOJ: Readonly<Record<string, KlavaFunkcio>> = {
	"[Shift]": "shift",
	"[Back]": "back",
	"[Space]": "space",
	"[Enter]": "enter",
	"[Symbol]": "symbol",
};

// ⟨ សកម្មភាពតាមពាក្យក្នុងកំណត់ចំនាំ "Also ... is ..." នៃការរៀបចំធំ ⟩
const NOTAJAGOJ: Readonly<Record<string, KlavaFunkcio>> = {
	"shift": "shift",
	"back": "back",
	"space": "space",
	"enter": "enter",
	"symbol": "symbol",
};

/**
* ⟨ ឈ្មោះបកប្ប័យសម្រាប់ក្រឡប់ចំណុចកណ្តាលមុខងងឹត។ ឈ្មោះជា Iikrhia មកពី
*    កំណត់ចំនាំនៃការរៀបចំធំនៅក្នុង DOCUMENTATION/CULTURE/KEYBOARDLAYOUT.md។ ⟩
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
* ⟨ សញ្ញាជំនួសសម្រាប់សញ្ញាចំណុចកណ្តាលនីមួយៗ ( ឧទាហរណ៍ទម្រង់អក្សរបំពោប )។
*    មិនមានឥឡូវទេ - បំពេញវានៅពេលក្រោយ។ ⟩
*/
const VARIANTOJ: Readonly<Record<string, string[]>> = {};

// ⟨ រយៈពេលនៃការចុចបន្តយោបល់មុនពេលបង្ហាញសញ្ញាជំនួស ( 1 ហេ ត្រ ) ⟩
const LONGA_PREMO_DAŬRO = HE_L6HEINAK;

// ⟨ រយៈពេលនៃការបញ្ជាកែក្រោយពេលចម្លង ( 1 ហេ ត្រ ) ⟩
const KOPII_KONFIRMA_DAŬRO = HE_L6HEINAK;

/**
* ⟨ ឯកសាររចនាការ ( DOCUMENTATION/CULTURE/KEYBOARDLAYOUT.md ) មិន
*    ត្រូវបានតាមដានក្នុង git ដូច្នេះមាតិការរបស់វាត្រូវបានបញ្ចូលទីនេះ ដើម្បីឱ្យក្រឡប់
*    ចំណុចកណ្តាលដំណើរការដោយគ្មានវា។ ⟩
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

// ⟪ ស្ថានភាព 💾 ⟫

let aktivaArangxoIndekso = 0o0;
let aktivaTavolaIndekso = 0o0;
let arangxoj: KlavarArangxo[] = [];
let funkciaMapo: Readonly<Record<string, KlavaFunkcio>> = FUNKCIOJ;
let enmetitaHistorio: string[] = [];
let ekstraReĝimo = false;
let longaPremo = false;
let ciklajIndeksoj = new Map<string, number>();

// ⟪ ធាតុ DOM 🔧 ⟫

let enigaKampo: HTMLTextAreaElement | null = null;
let klavaraUjo: HTMLElement | null = null;
let tavolaEtikedElemento: HTMLElement | null = null;
let arangxoButonojUjo: HTMLElement | null = null;
let ekstraPanelo: HTMLElement | null = null;

// ⟪ ការវិភាគ 📂 ⟫

/**
	វិភាគអត្ថបទមូលដ្ឋាននៃ KEYBOARDLAYOUT.md ជាការរៀបចំ។
		មាតិការមូលដ្ឋាននៃឯកសាររចនាការ។
	@returns KlavarArangxo[]
*/
function analiziArangxojn( krudaTeksto: string ): KlavarArangxo[] {
	const linioj = krudaTeksto.replace(/\r/g, "").split( "\n" );

	// ⟨ កំណត់ចំនាំកំណត់ក្រឡប់ចំណុចកណ្តាលមុខងងឹតនៃការរៀបចំធំ ⟩
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
	* ⟨ ការរៀបចំធំ ( Cutlii ) មានតែមូលដ្ឋានតែមួយ។ បង្កើតតារាង Ŝanĝa និង
	*    Simbolan តាមការរៀបចំធំ - សញ្ញានីមួយៗទទួលបាន
	*    កំណែដែលបានបង្កើតនៃសញ្ញាដូចគ្នាពីការរៀបចំតូច។ ⟩
	*/
	const malgranda = arangxoj[0o0];
	const granda = arangxoj[0o1];
	if ( malgranda && granda && granda.tavoloj.length === 0o1 && malgranda.tavoloj.length >= 0o3 ) {
		granda.tavoloj = kreiGrandajnTavolojn( granda.tavoloj[0o0], malgranda );
	}

	return arangxoj;
}

/**
	វិភាគការរៀបចំមួយរវាងពីរចំណុច។ ការរៀបចំដែលមានចំណងជើងតារាងនឹងក្លាយជា
	ច្រើនតារាង បើកិត្តនឹងក្លាយជាតារាងតែមួយ។
		បន្ទាត់ទាំងអស់នៃឯកសាររចនាការ។
		លេខសន្ទាញ់នៃបន្ទាត់ចំណងជើងនៃការរៀបចំ។
		លេខសន្ទាញ់នៃបន្ទាត់ចំណងជើងបន្ទាប់ ( ឬចុងនៃឯកសារ )។
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

	// ⟨ ការរៀបចំមួយតារាង ( ឧទាហរណ៍ធំ Cutlii ) ⟩
	return { titoloEn: titolo.en, titoloAih: titolo.aih, tavoloj: [ analiziTavolon( linioj, komenco, fino ) ] };
}

/**
	វិភាគតារាងមួយរវាងពីរចំណុច ( ជួរសញ្ញា និងបន្ទាត់ខាងក្រោម )។
		បន្ទាត់ទាំងអស់នៃឯកសាររចនាការ។
		លេខសន្ទាញ់នៃបន្ទាត់ចំណងជើងនៃតារាង។
		លេខសន្ទាញ់នៃបន្ទាត់ចំណងជើងបន្ទាប់ ( ឬចុងនៃឯកសារ )។
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
	បង្កើតស្លាក់មួយពីបន្ទាត់។ ក្រុមក្រឡប់ ( [ ... ] ) នៅតែជាស្លាក់តែមួយពេលពួកគេ
	ជាក្រឡប់ចំណុចកណ្តាលតែមួយ បើកិត្តពួកគេបែងចែកជាសញ្ញាតាមតំនាំ។
		បន្ទាត់តែមួយនៃឯកសាររចនាការ។
	@returns string[]
*/
function ĵetonigiLinion( linio: string ): string[] {
	const krudaj = linio.match( /\[[^\]]*\]|\S+/g ) ?? [];
	const ĵetonoj: string[] = [];

	for ( const kruda of krudaj ) {
		if ( estasFunkciaGrupo( kruda ) || estasUnuvortaGrupo( kruda ) ) {
			ĵetonoj.push( kruda );
		} else if ( kruda.startsWith( "[" ) && kruda.endsWith( "]" ) ) {
			// ⟨ ក្រុមមិនមែនជាក្រឡប់ចំណុចកណ្តាលតែមួយ ( ឧទាហរណ៍ [ x › ɘ ꭎ ] ) - បំបែកវា ⟩
			ĵetonoj.push( "[", ...kruda.slice( 0o1, -0o1 ).trim().split( /\s+/ ), "]" );
		} else {
			ĵetonoj.push( kruda );
		}
	}

	return ĵetonoj;
}

/**
	តើស្លាក់មួយជាក្រឡប់ចំណុចកណ្តាលមុខងងឹតដែលស្គាល់បានឬទេ។
		ស្លាក់សម្រាប់ការពិនិត្យ។
	@returns boolean
*/
function estasFunkciaGrupo( ĵetono: string ): boolean {
	return !!funkciaMapo[ĵetono];
}

/**
	តើស្លាក់មួយជាក្រុមក្រឡប់ដែលមានពាក្យតែមួយ ( ឧទាហរណ៍ [ Shift ] ឬ
	[ Empty ] )។
		ស្លាក់សម្រាប់ការពិនិត្យ។
	@returns boolean
*/
function estasUnuvortaGrupo( ĵetono: string ): boolean {
	return ĵetono.startsWith( "[" ) && ĵetono.endsWith( "]" ) && ĵetono.slice( 0o1, -0o1 ).trim().split( /\s+/ ).length === 0o1;
}

/**
	បម្លែកស្លាក់មួយទៅជាក្រឡប់ចំណុចកណ្តាល។ ស្លាក់មុខងងឹតនឹងក្លាយជាក្រឡប់ចំណុចកណ្តាលមុខងងឹត,
	[ Empty ] នឹងក្លាយជាក្រឡប់ទទេ អ្នកផ្សេងទាំងអស់នឹងក្លាយជាក្រឡប់ចំណុចកណ្តាលសញ្ញា។
		ស្លាក់តែមួយពីឯកសាររចនាការ។
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
	យកក្រឡប់ចំណុចកណ្តាលមុខងងឹតចេញពីកំណត់ចំនាំ "Also ... is ..."។
		បន្ទាត់ទាំងអស់នៃឯកសាររចនាការ។
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
	បំបែកឈ្មោះ "Angla / Iikrhia" ជាផ្នែកពីររបស់វា។ ចំណងជើងដូចជាក្នុង
	"Small ( Cubii / ſɟw ʃɹ )" នឹងក្លាយជា "Small ( Cubii )" និង "ſɟw ʃɹ"។
		ឈ្មោះមូលដ្ឋានពីឯកសាររចនាការ។
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
	បង្កើតតារាង Ŝanĝa និង Simbolan នៃការរៀបចំធំតាមមូលដ្ឋានរបស់ខ្លួនវា។
	ក្រឡប់ចំណុចកណ្តាលសញ្ញានីមួយៗទទួលបានកំណែដែលបានបញ្ជាទាំងអស់ / សញ្ញានូសនៃសញ្ញា
	ដូចគ្នាពីការរៀបចំតូច ( តាមសញ្ញាខ្លួនឯង មិនមែនតាមទីតាំង )។
	ក្រឡប់ចំណុចកណ្តាលមុខងងឹតនៅតែដូចទេ។ សញ្ញាដែលគ្មានកំណែដែលបានបង្កើត
	រក្សាតម្លៃផ្ទាល់ខ្លួនរបស់ខ្លួន។ បន្ទាត់ខាងក្រោមនៅតែជារបស់
	ការរៀបចំធំ។
		bazo ( Tavolo ) - តារាងមូលដ្ឋាននៃការរៀបចំធំ។
		ការរៀបចំតូចដែលមានតារាងបីរបស់ខ្លួនវា។
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

	// ⟨ ឈ្មោះនៃតារាងដែលបានបង្កើតមកពីការរៀបចំតូច ⟩
	const ŝanĝa = derivi( ŝanĝaMapo );
	const simbola = derivi( simbolaMapo );
	ŝanĝa.nomoEn = malgranda.tavoloj[0o1].nomoEn;
	ŝanĝa.nomoAih = malgranda.tavoloj[0o1].nomoAih;
	simbola.nomoEn = malgranda.tavoloj[0o2].nomoEn;
	simbola.nomoAih = malgranda.tavoloj[0o2].nomoAih;

	return [ bazo, ŝanĝa, simbola ];
}

/**
	បង្កើតភ្លាក់សញ្ញាពីតារាងមួយទៅតារាងមួយទៀត៖ ក្រឡប់ចំណុចកណ្តាលសញ្ញានីមួយៗនៃតារាងប្រភព
	នឹងទទួលបានសញ្ញានៅទីតាំងដូចគ្នានៃតារាងគោល
	( កំណែដែលបានបញ្ជាទាំងអស់ / សញ្ញានូសន៍ )។ ការបង្ហាញលើកទី១ នឹងឈយកយក។ បន្ទាត់ខាងក្រោមក៏
	ក៏ចូលរួមផ្ដល់ដែរ ( ឧទាហរណ៍ ｡ → v, ⟅ → ʌ )។
		តារាងមូលដ្ឋាន។
		តារាងនៃកំណែដែលបានបង្កើត។
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

// ⟪ ភាសា 🈯 ⟫

/**
	យកភាសាទំព័របច្ចុប្បន្នពីធាតុ html។
	@returns string
*/
function nunaLingvo(): string {
	return document.documentElement.lang || "aih";
}

/**
	ជ្រើសរើសឈ្មោះតាមភាសាបច្ចុប្បន្ន។ កំណែជា Iikrhia បង្ហាញក្នុង aih
	ហើយកំណែជាអង់គ្លេសនៅផ្ដាក់ផ្សេងៗ។
		ឈ្មោះជាអង់គ្លេស។
		ឈ្មោះជា Iikrhia។
	@returns string
*/
function nomoPerLingvo( en: string, aih: string ): string {
	return nunaLingvo() === "aih" ? aih : en;
}

// ⟪ ការបង្ហាញ 🖥️ ⟫

/**
	បង្ហាញការរៀបចំមួយ។ ស្ថាបថកឡើងវិញការបិទភ្ជាប់ការរៀបចំ ហើយបង្ហាញ
	តារាងទី១ នៃការរៀបចំ។
		លេខសន្ទាញ់នៃការរៀបចំសម្រាប់បង្ហាញ។
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
	បង្ហាញតារាងមួយនៃការរៀបចំបច្ចុប្បន្ន។ ស្ថាបថកឡើងវិញក្រឡប់ចំណុចកណ្តាល និង
	ធ្វើបច្ចុប្បន្នភាពស្លាក់តារាង។
		លេខសន្ទាញ់នៃតារាងសម្រាប់បង្ហាញ។
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

	// ⟨ អនុវត្ត vacepu ទៅអត្ថបទថ្មី ដើម្បីឱ្យវាបង្ហាញត្រឹមត្រូវក្នុង aih ⟩
	vacepu( "cepufal" );
}

/**
	បង្កើតជួរក្រឡប់ចំណុចកណ្តាលតែមួយដោយប្រើ thala.cakaxa។
		ក្រឡប់ចំណុចកណ្តាលនៃជួរ។
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
	បង្កើតប៊ូតុងសម្រាប់ក្រឡប់ចំណុចកណ្តាលតែមួយ។
		ក្រឡប់ចំណុចកណ្តាលសម្រាប់បង្ហាញ។
	@returns HTMLButtonElement
*/
function kreiButonon( klavo: Klavo ): HTMLButtonElement {
	const butono = document.createElement( "button" );
	butono.type = "button";

	// ⟨ ក្រឡប់ចំណុចកណ្តាលមុខងងឹតបង្ហាញឈ្មោះបកប្ប័យតាមភាសា ⟩
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
	បញ្ចូលសកម្មភាពចុចបន្តយោបល់ទៅក្រឡប់ចំណុចកណ្តាលសញ្ញា។ ការសង្កប់ក្រឡប់នឹងបើក
	ផ្ទាំងសញ្ញាជំនួស៖ ជួរនៅក្នុងការរៀបចំធំ ( ពេល
	ប្រុង Extra ចាក់ផ្ដើម ) ឬផ្ទាំងសញ្ញាបន្ថែមនៅក្នុង
	ការរៀបចំតូច។ ការចុចបន្ទាប់ត្រូវបានដកចេញបន្ទាប់ពីការចុចបន្តយោបល់។
		ប៊ូតុងនៃក្រឡប់ចំណុចកណ្តាល។
		ក្រឡប់ចំណុចកណ្តាលសញ្ញា។
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

	// ⟨ កុំធ្វើឱ្យវាទទេនៅទីនេះ៖ ការចុចបន្ទាប់ត្រូវតែបង្ហាញវា ⟩
	butono.addEventListener( "pointerup", () => {
		nuligi();
		fermiPanelon();
	} );
	butono.addEventListener( "pointerleave", fermi );
	butono.addEventListener( "pointercancel", fermi );
}

/**
	បើកផ្ទាំងសញ្ញាជំនួសសម្រាប់ក្រឡប់ចំណុចកណ្តាលតែមួយ។ នៅក្នុង
	ការរៀបចំធំ វាបង្ហាញជម្រើសក្នុងជួរ។ នៅក្នុងការរៀបចំតូច វា
	បើកផ្ទាំងសញ្ញាបន្ថែម។ ជម្រើសមិនមានឥឡូវទេ។
		ក្រឡប់ចំណុចកណ្តាលដែលត្រូវបង្ហាញជម្រើស។
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
	បិទ និងលាក់ផ្ទាំងសញ្ញាជំនួស។
	@returns void
*/
function fermiPanelon(): void {
	if ( !ekstraPanelo ) return;
	ekstraPanelo.replaceChildren();
	ekstraPanelo.classList.add( "kobe" );
}

// ⟪ ការចុច និងអូស 🖱️ ⟫

/**
	ដំណើរការនៃការចុចលើក្រឡប់ចំណុចកណ្តាល។
		ក្រឡប់ចំណុចកណ្តាលដែលត្រូវបានចុច។
	@returns void
*/
function pritraktiKlavon( klavo: Klavo ): void {
	// ⟨ បន្ទាប់ពីការចុចបន្តយោបល់ ការចុចបន្ទាប់គ្រាន់តែបើកផ្ទាំង - ដកវាចេញ ⟩
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
	បញ្ចូលតម្លៃនៃក្រឡប់ចំណុចកណ្តាលសញ្ញា។ នៅក្នុងការរៀបចំធំដែលមាន
	ប្រុង Extra ចាក់ផ្ដើម ការចុចម្ដងហើយម្ដងទៀតឆ្លងកាត់តាមជម្រើស
	ជម្រើសនៃសញ្ញា ( មិនមានឥឡូវទេ - សញ្ញាមូលដ្ឋាននឹងត្រូវបញ្ចូល )។
		ក្រឡប់ចំណុចកណ្តាលសញ្ញា។
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
	ដំណើរការនៃមុខងងឹតនៃបន្ទាត់ខាងក្រោម។
		សកម្មភាពនៃក្រឡប់ចំណុចកណ្តាលមុខងងឹត។
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
	បញ្ចូលអត្ថបទនៅទីតាំងកូនុស្លែងបច្ចុប្បន្ននៃវាលបញ្ចូល។
		អត្ថបទសម្រាប់បញ្ចូល។
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

	// ⟨ រក្សាស្លាក់ចំណុចកណ្តាលក្រឡប់ដែលបានបញ្ចូល ដើម្បីឱ្យការលុបដកចំណុចកណ្តាលទាំងអស់ ⟩
	enmetitaHistorio.push( teksto );
}

/**
	ដកកូនុងអក្សរចុងក្រោយ ( សញ្ញាជាមួយអក្សរបំពោបតគ្រប់យ៉ាងរបស់វា )
	មុនកូនុស្លែង ឬអត្ថបទបានជ្រើសរើសទាំងអស់ ប្រសិនបើមានការជ្រើសរើស។
	@returns void
*/
function forigiLastanGrafemon(): void {
	if ( !enigaKampo ) return;
	const komenco = enigaKampo.selectionStart ?? enigaKampo.value.length;
	const fino = enigaKampo.selectionEnd ?? enigaKampo.value.length;

	// ⟨ ប្រសិនបើមានការជ្រើសរើស ដកវាចេញ និងបោះចោលប្រវត្តិសាស្ត្រចេញ ⟩
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

		// ⟨ ចូលចិត្តលុបស្លាក់ក្រឡប់ចំណុចកណ្តាលចុងក្រោយទាំងអស់ ( ឧទាហរណ៍ ꞁȷ̀ ) ⟩
		if ( lastaĴetono && antaŭa.endsWith( lastaĴetono ) ) {
			const novaPozicio = komenco - lastaĴetono.length;
			enigaKampo.value = enigaKampo.value.slice( 0o0, novaPozicio ) + enigaKampo.value.slice( komenco );
			enigaKampo.setSelectionRange( novaPozicio, novaPozicio );
			enmetitaHistorio.pop();
		} else {
			// ⟨ បើកិត្តដកកូនុងអក្សរមួយ និងបោះចោលលំដាប់ប្រវត្តិសាស្ត្រចេញ ⟩
			const novaPozicio = komenco - longecoDeLastaGrafemo( antaŭa );
			enigaKampo.value = enigaKampo.value.slice( 0o0, novaPozicio ) + enigaKampo.value.slice( komenco );
			enigaKampo.setSelectionRange( novaPozicio, novaPozicio );
			enmetitaHistorio = [];
		}
		enigaKampo.focus();
	}
}

/**
	គណនាប្រវែងនៃកូនុងអក្សរចុងក្រោយក្នុងខ្សែ ដោយប្រើ Intl.Segmenter
	ពេលវាអាចប្រើបាន និងត្រឡប់ទៅកំណត់លេខកូដវិញប្រសិនបើមិន។
		ខ្សែសម្រាប់ការពិនិត្យ។
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
	ចម្លងអត្ថបទពីវាលបញ្ចូលទៅកន្លោៀប័ណ្តប់ ហើយបង្ហាញការបញ្ជាកែ។
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
	សម្អាតអត្ថបទទាំងអស់នៃវាលបញ្ចូល។
	@returns void
*/
function viŝiEnigon(): void {
	if ( !enigaKampo ) return;
	enigaKampo.value = "";
	enigaKampo.focus();
	enmetitaHistorio = [];
}

// ⟪ ការចាប់ផ្ដើម 🚀 ⟫

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

	// ⟨ ការកែសម្រួលដោយដៃរបស់អ្នកប្រើបានបំផ្លាញប្រវត្តិសាស្ត្រ - បោះចោលវាចេញ ⟩
	enigaKampo.addEventListener( "input", () => {
		enmetitaHistorio = [];
	} );

	kopiiButono?.addEventListener( "click", () => { void kopiiTekston(); } );
	viŝiButono?.addEventListener( "click", viŝiEnigon );
});
