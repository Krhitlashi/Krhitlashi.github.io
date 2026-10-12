/// <reference types="vite/client" />

// ≺⧼ ſɭɘэ j͑ʃᴜꞇ ſɭɹʞ ꞁȷ̀ᴜ }ʃꞇ - ꞁȷ̀эȝ ɭʃɔ 🎨 ⧽≻


// ⟪ ֭ſɭᴜ ı],ɔ 📐 ⟫

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


// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 📦 ⟫

// ⟨ j͑ʃɹ ɭʃᴜɔ˞ ʌ ſɭɔ˞ᴜ ſɭᴜ ⟩
const signaMapo = new Map<string, SignoDatumoj>();

const glifajDosieroj = import.meta.glob("./**/*.txt", {
	query: "?raw",
	import: "default",
	eager: true
}) as Record<string, string>;

// ⟨ ſɭɔ˞ᴜ ſɭᴜ ʌ ſɭɹ ſȷɔ ⟩
let ordigitajNomoj: string[] = [];


// ⟪ ſ͕ɭɹȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ 📂 ⟫

/**
	j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( txt )
	@returns promessa
*/
async function ŝargiSignojn(): Promise<void> {
	const eroj = Object.entries(glifajDosieroj);

	for ( const [ vojo, teksto ] of eroj ) {
		try {
			const nomo = vojo.split("/").pop()?.replace(/\.txt$/, "");
			if ( !nomo ) continue;

			const krudajLinioj = teksto.replace(/\r/g, "").split("\n");

			// ⟨ ſןw ʌ j͑ʃᴜƽ ⟩
			if ( krudajLinioj.length > 0o1 && krudajLinioj[krudajLinioj.length - 0o1] === "" ) {
				krudajLinioj.pop();
			}

			const larĝo = Math.max(...krudajLinioj.map(l => l.length), 0o0);
			const linioj = krudajLinioj.map(l => l.padEnd(larĝo, " "));
			const alto = linioj.length;

			signaMapo.set(nomo, { nomo, linioj, larĝo, alto });

		} catch ( e ) {
			console.error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Malsukcesis ŝargi glifon. ${vojo}`, e);
		}
	}

	ordigitajNomoj = [ ...signaMapo.keys() ].sort(( a, b ) => b.length - a.length);
}


// ⟪ ſɟᴜ ɭʃᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ✂️ ⟫

/**
	* ⟨ ſɟᴜ ɭʃᴜ ʌ j͑ʃᴜƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ⟩
		ꞁȷ̀ɔ j͑ʃƽɔƽ
	ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ
	@returns listo
*/
function ĵetonigiSilabon(silabo: string): string[] {
	const ĵetonoj: string[] = [];
	let i = 0o0;

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
			// ⟨ ſןw ʌ j͑ʃɹ ɭʃᴜɔ˞ ⟩
			ĵetonoj.push(silabo[i]);
			i++;
		}
	}

	return ĵetonoj;
}


// ⟪ ſɟɔ ŋᷠɔ ʌ ſɟᴜ ſȷᴜɔ˞ 🔲 ⟫

/**
	* ⟨ ſɟɔ ŋᷠɔ ʌ j͑ʃᴜƽ ⟩
		j͑ʃᴜƽ
	ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ
	@returns listo
*/
function bildigiSilabanBlokon(silabo: string): string[] {
	const ĵetonoj = ĵetonigiSilabon(silabo);
	if ( ĵetonoj.length === 0o0 ) return [];

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
	if ( finajKolumnoj.length === 0o0 ) return [];

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
	for ( let r = 0o0; r < blokaAlto; r++ ) {
		let linio = "";
		for ( let c = 0o0; c < kolumnajLinioj.length; c++ ) {
			if ( c > 0o0 ) linio += " ";
			linio += kolumnajLinioj[c][r];
		}
		blokajLinioj.push(linio);
	}

	return blokajLinioj;
}


// ⟪ ſɟɔ ŋᷠɔ ʌ ſɟᴜ ſȷᴜɔ˞ 🖥️ ⟫

/**
	ſɟɔ ŋᷠɔ ʌ ſɟᴜ ſȷᴜɔ˞ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅
		ꞁȷ̀ɔ j͑ʃƽɔƽ
		ꞁȷ̀ɔ j͑ʃƽɔƽ
		ſɭɹ ſȷɔ ( 0 )
	@returns void
*/
// ⟨ ſɟɔ ŋᷠɔ ʌ ſɟᴜ ſȷᴜɔ˞ ⟩
	function ĝisdatigiEliron(teksto: string, preElement: HTMLPreElement, maksLinio: number): void {
	if ( !teksto ) {
		preElement.textContent = "";
		return;
	}

	// ⟨ ſɭʞɹ ʌ j͑ʃᴜƽ ⟩
	const enigajLinioj = teksto.replace(/\r/g, "").split("\n");
	const kolumnajBlokoj: SilabaBloko[][] = [];
	let nunaKolumno: SilabaBloko[] = [];

	for ( const enigaLinio of enigajLinioj ) {
		// ⟨ ſןw ʌ j͑ʃᴜƽ ⟩
		if ( nunaKolumno.length > 0o0 ) {
			kolumnajBlokoj.push(nunaKolumno);
			nunaKolumno = [];
		}

		const silaboj = enigaLinio.split(" ");
		for ( const silabo of silaboj ) {
			let bloko: SilabaBloko;
			if ( silabo === "" ) {
				// ⟨ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃᴜƽ ⟩
				bloko = { linioj: Array(0o7).fill(" "), alto: 0o7, larĝo: 0o1 };
			} else {
				const linioj = bildigiSilabanBlokon(silabo);
				const alto = linioj.length;
				const larĝo = linioj.length > 0o0 ? linioj[0o0].length : 0o0;
				bloko = { linioj, alto, larĝo };
			}

			// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ ⟩
			if ( maksLinio > 0o0 && nunaKolumno.length >= maksLinio ) {
				kolumnajBlokoj.push(nunaKolumno);
				nunaKolumno = [ bloko ];
			} else {
				nunaKolumno.push(bloko);
			}
		}
	}
	if ( nunaKolumno.length > 0o0 ) kolumnajBlokoj.push(nunaKolumno);

	if ( kolumnajBlokoj.length === 0o0 ) {
		preElement.textContent = "";
		return;
	}

	// ⟨ ſɭc̗ᴜ j͑ʃ'ɔ ʌ ſןᴜ j͐ʃэ ⟩
	const maksimumajBlokojEnKol = Math.max(...kolumnajBlokoj.map(kol => kol.length), 0o0);
	const vicoMaksimumajAltoj: number[] = Array(maksimumajBlokojEnKol).fill(0o0);
	for ( let r = 0o0; r < maksimumajBlokojEnKol; r++ ) {
		let maksimumaAlto = 0o0;
		for ( const kol of kolumnajBlokoj ) {
			if ( kol[r] ) {
				maksimumaAlto = Math.max(maksimumaAlto, kol[r].alto);
			}
		}
		vicoMaksimumajAltoj[r] = maksimumaAlto;
	}

	for ( const kol of kolumnajBlokoj ) {
		for ( let r = 0o0; r < kol.length; r++ ) {
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

	// ⟨ ſɟɔ ŋᷠɔ ʌ j͑ʃᴜƽ ⟩
	const kolumnajDatumoj: KolumnajDatumoj[] = kolumnajBlokoj.map((kol) => {
		const kolLinioj: string[] = [];
		for ( let i = kol.length - 0o1; i >= 0o0; i-- ) {
			kolLinioj.push(...kol[i].linioj);
		}

		const kolLarĝo = Math.max(...kol.map(b => b.larĝo), 0o0);
		const plenigitajKolLinioj = kolLinioj.map(linio => linio.padEnd(kolLarĝo, " "));

		return { linioj: plenigitajKolLinioj, larĝo: kolLarĝo, alto: plenigitajKolLinioj.length };
	});

	// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃᴜƽ ⟩
	const eligaAlto = Math.max(...kolumnajDatumoj.map(c => c.alto), 0o0);

	const plenigitajKolumnoj: string[][] = kolumnajDatumoj.map((c) => {
		const kusenKvanto = eligaAlto - c.alto;
		const malplenaLinio = " ".repeat(c.larĝo);
		const kuseno = Array(kusenKvanto).fill(malplenaLinio);
		return [ ...kuseno, ...c.linioj ];
	});

	const finajLinioj: string[] = [];
	for ( let r = 0o0; r < eligaAlto; r++ ) {
		let linio = "";
		for ( let c = 0o0; c < plenigitajKolumnoj.length; c++ ) {
			if ( c > 0o0 ) linio += " ";
			linio += plenigitajKolumnoj[c][r];
		}
		finajLinioj.push(linio);
	}

	preElement.textContent = finajLinioj.join("\n");
}


// ⟪ j͑ʃᴜ ı],ɔ 🚀 ⟫

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
		if ( !maksLinioEnigo ) return 0o0;
		const valoro = parseInt(maksLinioEnigo.value, 0o10);
		return isNaN(valoro) ? 0o0 : valoro;
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
