/// <reference types="vite/client" />

// ≺⧼ ſɭɘэ j͑ʃᴜꞇ ſɭɹʞ ꞁȷ̀ᴜ }ʃꞇ - Teksta Arta Generatoro 🎨 ⧽≻


// ⟪ Tipoj 📐 ⟫

interface SignoDatumoj {
	nomo: string;
	linioj: string[];
	larĝo: number;
	alto: number;
}

interface Kolumno {
	signoj: SignoDatumoj[];
	larĝo: number;
	alto: number;
}

interface SilabaBloko {
	linioj: string[];
	alto: number;
	larĝo: number;
}

interface KolumnajDatumoj {
	linioj: string[];
	larĝo: number;
	alto: number;
}


// ⟪ Konstantoj 📦 ⟫

// Mapo de signa nomo al ĝia ŝargita glifo-datumo
const signaMapo = new Map<string, SignoDatumoj>();

const glifajDosieroj = import.meta.glob("./**/*.txt", {
	query: "?raw",
	import: "default",
	eager: true
}) as Record<string, string>;

// Ordaj nomoj laŭ longo malkreskante, por avida kongruo
let ordigitajNomoj: string[] = [];


// ⟪ Glifo Ŝarĝado 📂 ⟫

/**
	Stoku glifo-datumojn por ĉiu trovita txt-dosiero en ĉi tiu dosierujo.
*/
async function ŝargiSignojn(): Promise<void> {
	const eroj = Object.entries(glifajDosieroj);

	for ( const [ vojo, teksto ] of eroj ) {
		try {
			const nomo = vojo.split("/").pop()?.replace(/\.txt$/, "");
			if ( !nomo ) continue;

			const krudajLinioj = teksto.replace(/\r/g, "").split("\n");

			// Forigu finan malplenan linion de dosieroj finiĝantaj per novlinio
			if ( krudajLinioj.length > 1 && krudajLinioj[krudajLinioj.length - 1] === "" ) {
				krudajLinioj.pop();
			}

			const larĝo = Math.max(...krudajLinioj.map(l => l.length), 0);
			const linioj = krudajLinioj.map(l => l.padEnd(larĝo, " "));
			const alto = linioj.length;

			signaMapo.set(nomo, { nomo, linioj, larĝo, alto });

		} catch ( e ) {
			console.error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Malsukcesis ŝargi glifon. ${vojo}`, e);
		}
	}

	ordigitajNomoj = [ ...signaMapo.keys() ].sort(( a, b ) => b.length - a.length);
}


// ⟪ Ĵetonigado ✂️ ⟫

/**
	Ĵetonigu silaban ĉenon en liston de konataj glifnomoj uzante avidan plej-longan-unuan kongruon.
		silabo ( string ) - Eniga silaba ĉeno.
	Revenigas tabelon de kongruitaj ĵetonnomoj.
*/
function ĵetonigiSilabon(silabo: string): string[] {
	const ĵetonoj: string[] = [];
	let i = 0;

	while ( i < silabo.length ) {
		let kongruis = false;
		for ( const nomo of ordigitajNomoj ) {
			if ( silabo.startsWith(nomo, i) ) {
				ĵetonoj.push(nomo);
				i += nomo.length;
				kongruis = true;
				break;
			}
		}

		if ( !kongruis ) {
			// Nekongruita signo. pasu tra neŝanĝite
			ĵetonoj.push(silabo[i]);
			i++;
		}
	}

	return ĵetonoj;
}


// ⟪ Bloka Bildigo 🔲 ⟫

/**
	Bildigu unuopajn silabojn kiel blokon da ASCII-tekstartaj linioj.
		silabo ( string ) - La silabo por bildigi.
	Revenigas tabelon da egal-longaj ĉenoj formantaj la blokon.
*/
function bildigiSilabanBlokon(silabo: string): string[] {
	const ĵetonoj = ĵetonigiSilabon(silabo);
	if ( ĵetonoj.length === 0 ) return [];

	const renversitajĴetonoj = [ ...ĵetonoj ].reverse();
	const kolumnoj: Kolumno[] = [];
	let nunaKolono: Kolumno | null = null;

	for ( const ĵetono of renversitajĴetonoj ) {
		const signoDatumo = signaMapo.get(ĵetono) || { nomo: ĵetono, linioj: [ "" ], larĝo: 0o4, alto: 0o4 };

		const estasMalgranda = signoDatumo.alto === 0o4;
		const povasAmasigi = estasMalgranda && nunaKolono && nunaKolono.signoj.every(c => c.alto === 0o4);

		if ( povasAmasigi && nunaKolono ) {
			nunaKolono.signoj.unshift(signoDatumo);
			nunaKolono.larĝo = Math.max(nunaKolono.larĝo, signoDatumo.larĝo);
			nunaKolono.alto += signoDatumo.alto;
		} else {
			nunaKolono = { signoj: [ signoDatumo ], larĝo: signoDatumo.larĝo, alto: signoDatumo.alto };
			kolumnoj.push(nunaKolono);
		}
	}

	const finajKolumnoj = [ ...kolumnoj ].reverse();
	if ( finajKolumnoj.length === 0 ) return [];

	const blokaAlto = Math.max(0o7, ...finajKolumnoj.map(kol => kol.alto));

	const kolumnajLinioj: string[][] = finajKolumnoj.map((kol) => {
		const kolLinioj: string[] = [];
		for ( const signo of kol.signoj ) {
			for ( const linio of signo.linioj ) {
				kolLinioj.push(linio.padEnd(kol.larĝo, " "));
			}
		}

		const kusenKvanto = blokaAlto - kolLinioj.length;
		const kuseno = Array(kusenKvanto).fill(" ".repeat(kol.larĝo));

		return [ ...kolLinioj, ...kuseno ];
	});

	const blokajLinioj: string[] = [];
	for ( let r = 0; r < blokaAlto; r++ ) {
		let linio = "";
		for ( let c = 0; c < kolumnajLinioj.length; c++ ) {
			if ( c > 0 ) linio += " ";
			linio += kolumnajLinioj[c][r];
		}
		blokajLinioj.push(linio);
	}

	return blokajLinioj;
}


// ⟪ Eliga Bildigo 🖥️ ⟫

/**
	Ĝisdatigu la pre-elementon per bildigita tekstarto el la eniga ĉeno.
		teksto ( string ) - La kruda eniga teksto el la tekstareo.
		preElement ( HTMLPreElement ) - La cela pre-elemento.
		maksLinio ( number ) - Maksimumo da silabaj blokoj po vertikala kolumno antaŭ volvado. 0 = sen limo.
*/
// Ĝisdatigu la pre-elementon per bildigita tekstarto el la eniga ĉeno.
	function ĝisdatigiEliron(teksto: string, preElement: HTMLPreElement, maksLinio: number): void {
	if ( !teksto ) {
		preElement.textContent = "";
		return;
	}

	// ⟨ Konstruu silabajn blokojn, traktante novliniojn kiel devigajn kolumnopaŭzojn ⟩
	const enigajLinioj = teksto.replace(/\r/g, "").split("\n");
	const kolumnajBlokoj: SilabaBloko[][] = [];
	let nunaKolumno: SilabaBloko[] = [];

	for ( const enigaLinio of enigajLinioj ) {
		// Novlinio → devigu kolumnopaŭzon (forĵetu kio ajn amasiĝis)
		if ( nunaKolumno.length > 0 ) {
			kolumnajBlokoj.push(nunaKolumno);
			nunaKolumno = [];
		}

		const silaboj = enigaLinio.split(" ");
		for ( const silabo of silaboj ) {
			let bloko: SilabaBloko;
			if ( silabo === "" ) {
				// Malplena silabo (sinsekvaj spacoj). enmetu malplenan blokon
				bloko = { linioj: Array(0o7).fill(" "), alto: 0o7, larĝo: 1 };
			} else {
				const linioj = bildigiSilabanBlokon(silabo);
				const alto = linioj.length;
				const larĝo = linioj.length > 0 ? linioj[0].length : 0;
				bloko = { linioj, alto, larĝo };
			}

			// Apliku la maksLinio-limigon ene de la nuna eniga linio
			if ( maksLinio > 0 && nunaKolumno.length >= maksLinio ) {
				kolumnajBlokoj.push(nunaKolumno);
				nunaKolumno = [ bloko ];
			} else {
				nunaKolumno.push(bloko);
			}
		}
	}
	if ( nunaKolumno.length > 0 ) kolumnajBlokoj.push(nunaKolumno);

	if ( kolumnajBlokoj.length === 0 ) {
		preElement.textContent = "";
		return;
	}

	// ⟨ Kusenu blokojn en la sama horizontala vico por egali la plej altan blokon en tiu vico ⟩
	const maksimumajBlokojEnKol = Math.max(...kolumnajBlokoj.map(kol => kol.length), 0);
	const vicoMaksimumajAltoj: number[] = Array(maksimumajBlokojEnKol).fill(0);
	for ( let r = 0; r < maksimumajBlokojEnKol; r++ ) {
		let maksimumaAlto = 0;
		for ( const kol of kolumnajBlokoj ) {
			if ( kol[r] ) {
				maksimumaAlto = Math.max(maksimumaAlto, kol[r].alto);
			}
		}
		vicoMaksimumajAltoj[r] = maksimumaAlto;
	}

	for ( const kol of kolumnajBlokoj ) {
		for ( let r = 0; r < kol.length; r++ ) {
			const celaAlto = vicoMaksimumajAltoj[r];
			const bloko = kol[r];
			if ( bloko.alto < celaAlto ) {
				const kusenKvanto = celaAlto - bloko.alto;
				const malplenaLinio = " ".repeat(bloko.larĝo);
				const kuseno = Array(kusenKvanto).fill(malplenaLinio);
				bloko.linioj = [ ...bloko.linioj, ...kuseno ];
				bloko.alto = celaAlto;
			}
		}
	}

	// ⟨ Bildigu ĉiun kolumnon malsupre-al-supre ⟩
	const kolumnajDatumoj: KolumnajDatumoj[] = kolumnajBlokoj.map((kol) => {
		const kolLinioj: string[] = [];
		for ( let i = kol.length - 1; i >= 0; i-- ) {
			kolLinioj.push(...kol[i].linioj);
		}

		const kolLarĝo = Math.max(...kol.map(b => b.larĝo), 0);
		const plenigitajKolLinioj = kolLinioj.map(linio => linio.padEnd(kolLarĝo, " "));

		return { linioj: plenigitajKolLinioj, larĝo: kolLarĝo, alto: plenigitajKolLinioj.length };
	});

	// ⟨ Kombinu kolumnojn horizontale, malsupro-aliniitaj ⟩
	const eligaAlto = Math.max(...kolumnajDatumoj.map(c => c.alto), 0);

	const plenigitajKolumnoj: string[][] = kolumnajDatumoj.map((c) => {
		const kusenKvanto = eligaAlto - c.alto;
		const malplenaLinio = " ".repeat(c.larĝo);
		const kuseno = Array(kusenKvanto).fill(malplenaLinio);
		return [ ...kuseno, ...c.linioj ];
	});

	const finajLinioj: string[] = [];
	for ( let r = 0; r < eligaAlto; r++ ) {
		let linio = "";
		for ( let c = 0; c < plenigitajKolumnoj.length; c++ ) {
			if ( c > 0 ) linio += " ";
			linio += plenigitajKolumnoj[c][r];
		}
		finajLinioj.push(linio);
	}

	preElement.textContent = finajLinioj.join("\n");
}


// ⟪ Inicialigo 🚀 ⟫

document.addEventListener("DOMContentLoaded", async () => {
	const tekstareo = document.getElementById("saxesuOx2pewa") as HTMLTextAreaElement | null;
	const pre = document.getElementById("tlakakuOx2pewa") as HTMLPreElement | null;
	const maksLinioEnigo = document.getElementById("maxlineInput") as HTMLInputElement | null;

	if ( !tekstareo || !pre ) {
		console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Teksta Arta generatoro. tekstareo aŭ pre-elemento ne trovita.");
		return;
	}

	pre.textContent = "";

	await ŝargiSignojn();

	const akiriMaksLinion = (): number => {
		if ( !maksLinioEnigo ) return 0;
		const valoro = parseInt(maksLinioEnigo.value, 0o10);
		return isNaN(valoro) ? 0 : valoro;
	};

	ĝisdatigiEliron(tekstareo.value, pre, akiriMaksLinion());

	tekstareo.addEventListener("input", () => {
		ĝisdatigiEliron(tekstareo.value, pre, akiriMaksLinion());
	});

	if ( maksLinioEnigo ) {
		maksLinioEnigo.addEventListener("input", () => {
			ĝisdatigiEliron(tekstareo.value, pre, akiriMaksLinion());
		});
	}
});
