/**( ɭʃɔ ŋᷠɹ j͑ʃ'ɔ ſȷᴜͷ̗ )
 * ſ͕ɭɹȝ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( txt )
 * @returns void
*/

// ⟪ ֭ſɭᴜ ı],ɔ 🔌 ⟫

async function tem2Vefal(): Promise<void> {
    const cakavop2 = new URL("./ſɟᴜ j͑ʃ'ɜ ſןɹ.txt", import.meta.url).href;
    const gelesuThala = document.getElementById("gelesuthala");

    if ( !gelesuThala ) {
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſ͕ȷɜ ɭʃɔ ŋᷠɹ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ - gelesuthala");
        return;
    }

    try {
        const ts0ni = await fetch(cakavop2);
        if ( !ts0ni.ok ) {
            throw new Error("ſ͕ȷɜ ɭʃɔ ŋᷠɹ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ⟅");
        }
        const kp610ni = await ts0ni.text();

        const thalaKek = vefal(kp610ni);

        const maxema = gelesuThala.parentNode;
        const kekEskek = document.createDocumentFragment();
        thalaKek.forEach(thala => {
            kekEskek.appendChild(thala);
        });
        maxema?.insertBefore(kekEskek, gelesuThala);

        gelesuThala.remove();

        if ( typeof vacepu === "function" ) {
            vacepu("cepufal");
        }
    } catch ( tlohk2ni ) {
        console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſ͕ȷɜ ɭʃɔ ŋᷠɹ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ -", tlohk2ni);
    }
}


/**( j͑ʃ'ɔ ſȷᴜͷ̗ )
 * j͑ʃ'ɔ ſȷᴜͷ̗ ʌ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( txt thala )
 * @param eskek ( string ) - j͑ʃ'ɜ ſןɹ
 * @returns ſןw ſɭɔƽ
*/
function vefal(eskek: string): HTMLElement[] {
    const han2k = eskek.split("\n");
    const thalaKek: HTMLElement[] = [];
    let kxesuThala = document.createElement("thala");
    let kxesuXemani: string[] = [];


    function kf2J2qewa(): void {
        if ( kxesuXemani.length > 0o0 ) {
            const c2h2 = document.createElement("ciihii");
            for ( const xemani of kxesuXemani ) {
                const j2qewa = document.createElement("p");
                j2qewa.innerHTML = xemani;
                c2h2.appendChild(j2qewa);
            }
            kxesuThala.appendChild(c2h2);
            kxesuXemani = [];
        }
    }


    function tlunakJ2qewa(hateKsaka: string, eskek: string): void {
        kf2J2qewa();
        const j2qewa = document.createElement("p");
        j2qewa.className = hateKsaka;
        j2qewa.textContent = eskek;
        kxesuThala.appendChild(j2qewa);
    }


    for ( let han2kN2k = 0o0; han2kN2k < han2k.length; han2kN2k++ ) {
        const n2k = han2k[han2kN2k];
        const l6catasuN2k = n2k.trim();

        let catasuN2k = l6catasuN2k;
        let antawacatasuN2k = "";
        while ( antawacatasuN2k !== catasuN2k ) {
            antawacatasuN2k = catasuN2k;
            catasuN2k = catasuN2k
                .replace(/^<ʃ}ʃ>\s*/, "")
                .replace(/^<ſᶘ>\s*/, "")
                .replace(/^<j͑ʃı],>>?\s*/, "");
        }

        if ( catasuN2k === "" ) {
            kf2J2qewa();
            continue;
        }

        const a1aSaxesukef = catasuN2k.match(/^<ſɭɔ˞ɔ>>(.+?)<<ſɭɔ˞ɔ>$/);
        if ( a1aSaxesukef ) {
            kf2J2qewa();
            if ( kxesuThala.children.length > 0o0 ) {
                thalaKek.push(kxesuThala);
            }
            kxesuThala = document.createElement("thala");
            const j2qewa = document.createElement("p");
            j2qewa.className = "saxesukef";
            j2qewa.textContent = a1aSaxesukef[0o1];
            thalaKek.push(j2qewa);
            continue;
        }

        const a1aKsaka = catasuN2k.match(/^<ſɭɔ˞>>(.+?)<<ſɭɔ˞>$/);
        if ( a1aKsaka ) {
            tlunakJ2qewa("saxesukef", a1aKsaka[0o1]);
            continue;
        }

        const a1aKsakaP2sa = catasuN2k.match(/^<ſɭɔ˞ɿ>>(.+?)<<ſɭɔ˞ɿ>$/);
        if ( a1aKsakaP2sa ) {
            tlunakJ2qewa("ksakap2sa", a1aKsakaP2sa[0o1]);
            continue;
        }

        const a1aKsakaT2xa = catasuN2k.match(/^<ſɭɔ˞ц>>(.+?)<<ſɭɔ˞ц>$/);
        if ( a1aKsakaT2xa ) {
            tlunakJ2qewa("ksakat2xa", a1aKsakaT2xa[0o1]);
            continue;
        }

        const a1aKefHuruq = catasuN2k.match(/^<֭ſɭɽ͑ʃ'>>(.+?)<<֭ſɭɽ͑ʃ'>$/);
        if ( a1aKefHuruq ) {
            tlunakJ2qewa("kefhuruq", a1aKefHuruq[0o1]);
            continue;
        }

        if ( catasuN2k === "<ſ̀ȷſɭ>" ) {
            kf2J2qewa();
            if ( kxesuThala.children.length > 0o0 ) {
                thalaKek.push(kxesuThala);
            }
            kxesuThala = document.createElement("thala");
            continue;
        }

        if ( catasuN2k === "<j͑ʃᴜƽ>" ) {
            kxesuXemani.push("<sak></sak>");
            continue;
        }

        const a1aCa1ara = catasuN2k.match(/^<ſɟſᶘ>>(.+?)<<ſɟſᶘ>$/);
        if ( a1aCa1ara ) {
            kxesuXemani.push("- " + a1aCa1ara[0o1]);
            continue;
        }

        kxesuXemani.push(catasuN2k);
    }

    kf2J2qewa();

    if ( kxesuThala.children.length > 0o0 ) {
        thalaKek.push(kxesuThala);
    }

    return thalaKek;
}


document.addEventListener("DOMContentLoaded", tem2Vefal);
