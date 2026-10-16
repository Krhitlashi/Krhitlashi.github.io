/// <reference types="vite/client" />

// ≺⧼ ſɭɘэ j͑ʃᴜꞇ ſɭɹʞ ꞁȷ̀ᴜ }ʃꞇ - ꞁȷ̀эȝ ɭʃɔ 🎨 ⧽≻


// ⟪ ֭ſɭᴜ ı],ɔ 📐 ⟫

interface Kp6Sab2 {
	ksaka: string;
	han2k: string[];
	sefini: number;
	l6da: number;
}

interface Kp6Kuba {
	kp6Ca1ara: Kp6Sab2[];
	sefini: number;
	l6da: number;
}

interface XezKuba {
	han2k: string[];
	l6da: number;
	sefini: number;
}

interface KubaSab2 {
	han2k: string[];
	sefini: number;
	l6da: number;
}


// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 📦 ⟫

// ⟨ j͑ʃɹ ɭʃᴜɔ˞ ʌ ſɭɔ˞ᴜ ſɭᴜ ⟩
const kp6Bal2xa = new Map<string, Kp6Sab2>();

const kp6Ca1ara = import.meta.glob("./**/*.txt", {
	query: "?raw",
	import: "default",
	eager: true
}) as Record<string, string>;

// ⟨ ſɭɔ˞ᴜ ſɭᴜ ʌ ſɭɹ ſȷɔ ⟩
let htakaKsakaCa1ara: string[] = [];


// ⟪ ſ͕ɭɹȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ 📂 ⟫

/**
	j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( txt )
	@returns void
*/
async function b6tem2Kp6(): Promise<void> {
	const eskekCa1ara = Object.entries(kp6Ca1ara);

	for ( const [ k6h6, k61e ] of eskekCa1ara ) {
		try {
			const ksaka = k6h6.split("/").pop()?.replace(/\.txt$/, "");
			if ( !ksaka ) continue;

			const ne1anesaiHan2k = k61e.replace(/\r/g, "").split("\n");

			// ⟨ ſןw ʌ j͑ʃᴜƽ ⟩
			if ( ne1anesaiHan2k.length > 0o1 && ne1anesaiHan2k[ne1anesaiHan2k.length - 0o1] === "" ) {
				ne1anesaiHan2k.pop();
			}

			const sefini = Math.max(...ne1anesaiHan2k.map(n2k => n2k.length), 0o0);
			const han2k = ne1anesaiHan2k.map(n2k => n2k.padEnd(sefini, " "));
			const l6da = han2k.length;

			kp6Bal2xa.set(ksaka, { ksaka, han2k, sefini, l6da });

		} catch ( e ) {
			console.error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ne1a b6tem2 kp6. ${k6h6}`, e);
		}
	}

	htakaKsakaCa1ara = [ ...kp6Bal2xa.keys() ].sort(( a, b ) => b.length - a.length);
}


// ⟪ ſɟᴜ ɭʃᴜ ʌ j͑ʃɹ ɭʃᴜɔ˞ ✂️ ⟫

/**
	* ⟨ ſɟᴜ ɭʃᴜ ʌ j͑ʃᴜƽ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ⟩
		ꞁȷ̀ɔ j͑ʃƽɔƽ
	ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ
	@returns han2k
*/
function s2Xez(xez: string): string[] {
	const s2Ca1ara: string[] = [];
	let i = 0o0;

	while ( i < xez.length ) {
		let xekox2q = false;
		for ( const ksaka of htakaKsakaCa1ara ) {
			if ( xez.startsWith(ksaka, i) ) {
				s2Ca1ara.push(ksaka);
				i += ksaka.length;
				xekox2q = true;
				break;
			}
		}

		if ( !xekox2q ) {
			// ⟨ ſןw ʌ j͑ʃɹ ɭʃᴜɔ˞ ⟩
			s2Ca1ara.push(xez[i]);
			i++;
		}
	}

	return s2Ca1ara;
}


// ⟪ ſɟɔ ŋᷠɔ ʌ ſɟᴜ ſȷᴜɔ˞ 🔲 ⟫

/**
	* ⟨ ſɟɔ ŋᷠɔ ʌ j͑ʃᴜƽ ⟩
		j͑ʃᴜƽ
	ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ
	@returns han2k
*/
function kubaXez(xez: string): string[] {
	const s2Ca1ara = s2Xez(xez);
	if ( s2Ca1ara.length === 0o0 ) return [];

	const nekalaS2Ca1ara = [ ...s2Ca1ara ].reverse();
	const kp6KubaCa1ara: Kp6Kuba[] = [];
	let kxesuKp6Kuba: Kp6Kuba | null = null;

	for ( const s2 of nekalaS2Ca1ara ) {
		const kp6Sab2 = kp6Bal2xa.get(s2) || { ksaka: s2, han2k: [ "" ], sefini: 0o4, l6da: 0o4 };

		const m2 = kp6Sab2.l6da === 0o4;
		const kubaM2 = m2 && kxesuKp6Kuba && kxesuKp6Kuba.kp6Ca1ara.every(c => c.l6da === 0o4);

		if ( kubaM2 && kxesuKp6Kuba ) {
			kxesuKp6Kuba.kp6Ca1ara.unshift(kp6Sab2);
			kxesuKp6Kuba.sefini = Math.max(kxesuKp6Kuba.sefini, kp6Sab2.sefini);
			kxesuKp6Kuba.l6da += kp6Sab2.l6da;
		} else {
			kxesuKp6Kuba = { kp6Ca1ara: [ kp6Sab2 ], sefini: kp6Sab2.sefini, l6da: kp6Sab2.l6da };
			kp6KubaCa1ara.push(kxesuKp6Kuba);
		}
	}

	const p2saKp6KubaCa1ara = [ ...kp6KubaCa1ara ].reverse();
	if ( p2saKp6KubaCa1ara.length === 0o0 ) return [];

	const kubaL6da = Math.max(0o7, ...p2saKp6KubaCa1ara.map(kuba => kuba.l6da));

	const kubaHan2kCa1ara: string[][] = p2saKp6KubaCa1ara.map((kuba) => {
		const kubaHan2k: string[] = [];
		for ( const kp6 of kuba.kp6Ca1ara ) {
			for ( const n2k of kp6.han2k ) {
				kubaHan2k.push(n2k.padEnd(kuba.sefini, " "));
			}
		}

		const p2foK2fe = kubaL6da - kubaHan2k.length;
		const p2fo = Array(p2foK2fe).fill(" ".repeat(kuba.sefini));

		return [ ...kubaHan2k, ...p2fo ];
	});

	const p2saHan2k: string[] = [];
	for ( let r = 0o0; r < kubaL6da; r++ ) {
		let n2k = "";
		for ( let c = 0o0; c < kubaHan2kCa1ara.length; c++ ) {
			if ( c > 0o0 ) n2k += " ";
			n2k += kubaHan2kCa1ara[c][r];
		}
		p2saHan2k.push(n2k);
	}

	return p2saHan2k;
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
	function v3ak2Sunta(k61e: string, sunta: HTMLPreElement, maxN2k: number): void {
	if ( !k61e ) {
		sunta.textContent = "";
		return;
	}

	// ⟨ ſɭʞɹ ʌ j͑ʃᴜƽ ⟩
	const k61eHan2k = k61e.replace(/\r/g, "").split("\n");
	const kubaCa1ara: XezKuba[][] = [];
	let kxesuKuba: XezKuba[] = [];

	for ( const k61eN2k of k61eHan2k ) {
		// ⟨ ſןw ʌ j͑ʃᴜƽ ⟩
		if ( kxesuKuba.length > 0o0 ) {
			kubaCa1ara.push(kxesuKuba);
			kxesuKuba = [];
		}

		const xezCa1ara = k61eN2k.split(" ");
		for ( const xez of xezCa1ara ) {
			let kuba: XezKuba;
			if ( xez === "" ) {
				// ⟨ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃᴜƽ ⟩
				kuba = { han2k: Array(0o7).fill(" "), l6da: 0o7, sefini: 0o1 };
			} else {
				const han2k = kubaXez(xez);
				const l6da = han2k.length;
				const sefini = han2k.length > 0o0 ? han2k[0o0].length : 0o0;
				kuba = { han2k, l6da, sefini };
			}

			// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ ⟩
			if ( maxN2k > 0o0 && kxesuKuba.length >= maxN2k ) {
				kubaCa1ara.push(kxesuKuba);
				kxesuKuba = [ kuba ];
			} else {
				kxesuKuba.push(kuba);
			}
		}
	}
	if ( kxesuKuba.length > 0o0 ) kubaCa1ara.push(kxesuKuba);

	if ( kubaCa1ara.length === 0o0 ) {
		sunta.textContent = "";
		return;
	}

	// ⟨ ſɭc̗ᴜ j͑ʃ'ɔ ʌ ſןᴜ j͐ʃэ ⟩
	const maxKubaK2fe = Math.max(...kubaCa1ara.map(kuba => kuba.length), 0o0);
	const maxL6daCa1ara: number[] = Array(maxKubaK2fe).fill(0o0);
	for ( let r = 0o0; r < maxKubaK2fe; r++ ) {
		let maxL6da = 0o0;
		for ( const kuba of kubaCa1ara ) {
			if ( kuba[r] ) {
				maxL6da = Math.max(maxL6da, kuba[r].l6da);
			}
		}
		maxL6daCa1ara[r] = maxL6da;
	}

	for ( const kuba of kubaCa1ara ) {
		for ( let r = 0o0; r < kuba.length; r++ ) {
			const araqL6da = maxL6daCa1ara[r];
			const kxesu = kuba[r];
			if ( kxesu.l6da < araqL6da ) {
				const p2foK2fe = araqL6da - kxesu.l6da;
				const p2foN2k = " ".repeat(kxesu.sefini);
				const p2fo = Array(p2foK2fe).fill(p2foN2k);
				kxesu.han2k = [ ...kxesu.han2k, ...p2fo ];
				kxesu.l6da = araqL6da;
			}
		}
	}

	// ⟨ ſɟɔ ŋᷠɔ ʌ j͑ʃᴜƽ ⟩
	const kubaSab2Ca1ara: KubaSab2[] = kubaCa1ara.map((kuba) => {
		const kubaHan2k: string[] = [];
		for ( let i = kuba.length - 0o1; i >= 0o0; i-- ) {
			kubaHan2k.push(...kuba[i].han2k);
		}

		const kubaSefini = Math.max(...kuba.map(c => c.sefini), 0o0);
		const sefiniHan2k = kubaHan2k.map(n2k => n2k.padEnd(kubaSefini, " "));

		return { han2k: sefiniHan2k, sefini: kubaSefini, l6da: sefiniHan2k.length };
	});

	// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃᴜƽ ⟩
	const suntaL6da = Math.max(...kubaSab2Ca1ara.map(c => c.l6da), 0o0);

	const suntaKubaCa1ara: string[][] = kubaSab2Ca1ara.map((c) => {
		const p2foK2fe = suntaL6da - c.l6da;
		const p2foN2k = " ".repeat(c.sefini);
		const p2fo = Array(p2foK2fe).fill(p2foN2k);
		return [ ...p2fo, ...c.han2k ];
	});

	const p2saHan2k: string[] = [];
	for ( let r = 0o0; r < suntaL6da; r++ ) {
		let n2k = "";
		for ( let c = 0o0; c < suntaKubaCa1ara.length; c++ ) {
			if ( c > 0o0 ) n2k += " ";
			n2k += suntaKubaCa1ara[c][r];
		}
		p2saHan2k.push(n2k);
	}

	sunta.textContent = p2saHan2k.join("\n");
}


// ⟪ j͑ʃᴜ ı],ɔ 🚀 ⟫

document.addEventListener("DOMContentLoaded", async () => {
	const k61eXema = document.getElementById("saxesuOx2pewa") as HTMLTextAreaElement | null;
	const sunta = document.getElementById("tlakakuOx2pewa") as HTMLPreElement | null;
	const maxN2kXema = document.getElementById("maxlineInput") as HTMLInputElement | null;

	if ( !k61eXema || !sunta ) {
		console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ne1a k61eXema.");
		return;
	}

	sunta.textContent = "";

	await b6tem2Kp6();

	const quqMaxN2k = (): number => {
		if ( !maxN2kXema ) return 0o0;
		const k2fe = parseInt(maxN2kXema.value, 0o10);
		return isNaN(k2fe) ? 0o0 : k2fe;
	};

	v3ak2Sunta(k61eXema.value, sunta, quqMaxN2k());

	k61eXema.addEventListener("input", () => {
		v3ak2Sunta(k61eXema.value, sunta, quqMaxN2k());
	});

	if ( maxN2kXema ) {
		maxN2kXema.addEventListener("input", () => {
			v3ak2Sunta(k61eXema.value, sunta, quqMaxN2k());
		});
	}
});
