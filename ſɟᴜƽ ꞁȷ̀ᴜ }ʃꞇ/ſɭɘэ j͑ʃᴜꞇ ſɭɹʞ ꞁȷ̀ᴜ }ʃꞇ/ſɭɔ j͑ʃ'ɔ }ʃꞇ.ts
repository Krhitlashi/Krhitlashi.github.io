/// <reference types="vite/client" />

// ≺⧼ ſɭɘэ j͑ʃᴜꞇ ſɭɹʞ ꞁȷ̀ᴜ }ʃꞇ - ម៉ាស្គន្យអក្សរអត្ថបទ 🎨 ⧽≻


// ⟪ ប្រភេទ 📐 ⟫

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


// ⟪ ថេរស្មែក 📦 ⟫

// ផែនទីស្លាក់ពីឈ្មោះសញ្ញាទៅទិន្នន័យតួអក្សរដែលបានផ្ទុក
const signaMapo = new Map<string, SignoDatumoj>();

const glifajDosieroj = import.meta.glob("./**/*.txt", {
	query: "?raw",
	import: "default",
	eager: true
}) as Record<string, string>;

// ឈ្មោះតាមលំដាប់តាមប្រវែងដាច់ជាចន្លោះ ដើម្បីឱ្យការត្រូវគ្នាចូលបានលឿន
let ordigitajNomoj: string[] = [];


// ⟪ ការផ្ទុកតួអក្សរ 📂 ⟫

/**
	រក្សាទិន្នន័យតួអក្សរសម្រាប់ឯកសារ txt នីមួយៗដែលបានរកឃើញនៅក្នុងថតរង្វេងនេះ។
	@returns promessa
*/
async function ŝargiSignojn(): Promise<void> {
	const eroj = Object.entries(glifajDosieroj);

	for ( const [ vojo, teksto ] of eroj ) {
		try {
			const nomo = vojo.split("/").pop()?.replace(/\.txt$/, "");
			if ( !nomo ) continue;

			const krudajLinioj = teksto.replace(/\r/g, "").split("\n");

			// ដកបន្ទាត់ទទេចុងក្រោយនៃថតឯកសារដែលបញ្ចប់ដោយបន្ទាត់ថ្មី
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


// ⟪ ការបំបែកស្លាក់ ✂️ ⟫

/**
	បំបែកខ្សែស៊ីឡាំងមួយជាបញ្ជីនៃឈ្មោះតួអក្សរដែលស្គាល់បាន ដោយប្រើការត្រូវគ្នាដែលវែងបំផុតមុន។
		ខ្សែស៊ីឡាំងបញ្ចូល។
	ជួយប្រគល់តារាងនៃឈ្មោះស្លាក់ដែលត្រូវគ្នា។
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
			// សញ្ញាមិនត្រូវគ្នា។ បន្តដោយមិនប៉ះពាល់
			ĵetonoj.push(silabo[i]);
			i++;
		}
	}

	return ĵetonoj;
}


// ⟪ ការបង្ហាញជាប្លង់ 🔲 ⟫

/**
	បង្ហាញស៊ីឡាំងនីមួយៗជាប្លង់នៃបន្ទាត់ការសរសេរ ASCII។
		ស៊ីឡាំងសម្រាប់បង្ហាញ។
	ជួយប្រគល់តារាងនៃខ្សែប្រវែងស្មើគ្នាដែលបង្កើតវ្លង់។
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


// ⟪ ការបង្ហាញចុងក្រោយ 🖥️ ⟫

/**
	ធ្វើបច្ចុប្បន្នភាពធាតុ pre ដោយការសរសេរដែលបានបង្ហាញពីខ្សែបញ្ចូល។
		អត្ថបទបញ្ចូលមូលដ្ឋានពីប្រអប់អក្សរ។
		ធាតុ pre គោល។
		ចំនួនប្លង់ស៊ីឡាំងអតិបរមាណក្នុងមួយជួរកាត់ក្រឡា មុនពេលរង្វាស់។ 0 = គ្មានដែនកំណត់។
	@returns void
*/
// ធ្វើបច្ចុប្បន្នភាពធាតុ pre ដោយការសរសេរដែលបានបង្ហាញពីខ្សែបញ្ចូល។
	function ĝisdatigiEliron(teksto: string, preElement: HTMLPreElement, maksLinio: number): void {
	if ( !teksto ) {
		preElement.textContent = "";
		return;
	}

	// ⟨ បង្កើតប្លង់ស៊ីឡាំង ដោយព្រមសារបន្ទាត់ថ្មីជាការបញ្ឈប់កាត់ក្រឡាចាំបាច់ ⟩
	const enigajLinioj = teksto.replace(/\r/g, "").split("\n");
	const kolumnajBlokoj: SilabaBloko[][] = [];
	let nunaKolumno: SilabaBloko[] = [];

	for ( const enigaLinio of enigajLinioj ) {
		// បន្ទាត់ថ្មី → បង្ខំឱ្យការបញ្ឈប់កាត់ក្រឡាចាំបាច់ ( បោះចោលអ្វីដែលបានប្រមូល )
		if ( nunaKolumno.length > 0o0 ) {
			kolumnajBlokoj.push(nunaKolumno);
			nunaKolumno = [];
		}

		const silaboj = enigaLinio.split(" ");
		for ( const silabo of silaboj ) {
			let bloko: SilabaBloko;
			if ( silabo === "" ) {
				// ស៊ីឡាំងទទេ ( ចន្លោះជាបន្ស្សប្រប់ប្រព័ន្ធ )។ បញ្ចូលប្លង់ទទេ
				bloko = { linioj: Array(0o7).fill(" "), alto: 0o7, larĝo: 0o1 };
			} else {
				const linioj = bildigiSilabanBlokon(silabo);
				const alto = linioj.length;
				const larĝo = linioj.length > 0o0 ? linioj[0o0].length : 0o0;
				bloko = { linioj, alto, larĝo };
			}

			// អនុវត្តការកំណត់កំណត់ maksLinio នៅក្នុងបន្ទាត់បញ្ចូលបច្ចុប្បន្ន
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

	// ⟨ បិទប្លង់នៅក្នុងជួរកាត់ក្រឡាដើម្បីឲ្យវាស្មើនឹងប្លង់ខ្ពស់បំផុតនៅជួរក្រឡានោះ ⟩
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

	// ⟨ បង្ហាញគ្រប់ជួរកាត់ក្រឡាពីខាងក្រោមទៅខាងលើ ⟩
	const kolumnajDatumoj: KolumnajDatumoj[] = kolumnajBlokoj.map((kol) => {
		const kolLinioj: string[] = [];
		for ( let i = kol.length - 0o1; i >= 0o0; i-- ) {
			kolLinioj.push(...kol[i].linioj);
		}

		const kolLarĝo = Math.max(...kol.map(b => b.larĝo), 0o0);
		const plenigitajKolLinioj = kolLinioj.map(linio => linio.padEnd(kolLarĝo, " "));

		return { linioj: plenigitajKolLinioj, larĝo: kolLarĝo, alto: plenigitajKolLinioj.length };
	});

	// ⟨ បញ្ជាក់ជួរកាត់ក្រឡាជាដᾔឡរាងត្រង់ ដោយតម្រង់តាមខាងក្រោម ⟩
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


// ⟪ ការចាប់ផ្ដើម 🚀 ⟫

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
