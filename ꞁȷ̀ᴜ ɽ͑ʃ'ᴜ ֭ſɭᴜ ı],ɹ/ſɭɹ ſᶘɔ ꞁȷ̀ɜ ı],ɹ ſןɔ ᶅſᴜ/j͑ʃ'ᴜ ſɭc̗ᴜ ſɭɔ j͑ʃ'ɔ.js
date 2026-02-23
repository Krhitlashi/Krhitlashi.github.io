/**( ɭʃɔ ŋᷠɹ j͑ʃ'ɔ ſȷᴜͷ̗ )
 Loads and parses txt content with defined styles.
Returns void
*/
async function tem2Vefal() {
const cakavop2 = "ſɟᴜ j͑ʃ'ɜ ſןɹ.txt";
const gelesuThala = document.getElementById("gelesuthala");

try {
    const ts0ni = await fetch(cakavop2);
    const kp610ni = await ts0ni.text();
    
    const thalaKek = vefal(kp610ni);
    
    const maxema = gelesuThala.parentNode;
    thalaKek.forEach(thala => {
    maxema.insertBefore(thala, gelesuThala.nextSibling);
    });
    
    gelesuThala.remove();
    
    if (typeof vacepu === "function") {
    vacepu("cepufal");
    }
} catch (error) {
    console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ſ͕ȷɜ ɭʃɔ ŋᷠɹ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ -", error);
}
}

/**( j͑ʃ'ɔ ſȷᴜͷ̗ )
 Parses txt content and creates thala elements.
kp6 ( string ) - The text content to parse.
Returns Array of thala elements
*/
function vefal(kp6) {
const han2k = kp6.split("\n");
const thalaKek = [];
let kxesuThala = document.createElement("thala");
let kxesuXemani = [];

function kf2J2qewa() {
    if (kxesuXemani.length > 0o0) {
    const c2h2 = document.createElement("ciihii");
    for (const xemani of kxesuXemani) {
        const j2qewa = document.createElement("p");
        j2qewa.className = "ox2pewa";
        j2qewa.innerHTML = xemani;
        c2h2.appendChild(j2qewa);
    }
    kxesuThala.appendChild(c2h2);
    kxesuXemani = [];
    }
}

function tlunakJ2qewa(hateKsaka, kp6) {
    kf2J2qewa();
    const j2qewa = document.createElement("p");
    j2qewa.className = hateKsaka;
    j2qewa.textContent = kp6;
    kxesuThala.appendChild(j2qewa);
}

for (let i = 0o0; i < han2k.length; i++) {
    const n2k = han2k[i];
    const l6catasuN2k = n2k.trim();
    
    const a1aKsaka = l6catasuN2k.match(/^<ſɭɔ˞>>(.+?)<<ſɭɔ˞>$/);
    if (a1aKsaka) {
    tlunakJ2qewa("saxesukef", a1aKsaka[0o1]);
    continue;
    }
    
    const a1aKsakaP2sa = l6catasuN2k.match(/^<ſɭɔ˞ɿ>>(.+?)<<ſɭɔ˞ɿ>$/);
    if (a1aKsakaP2sa) {
    tlunakJ2qewa("ksakap2sa", a1aKsakaP2sa[0o1]);
    continue;
    }
    
    const a1aKsakaT2xa = l6catasuN2k.match(/^<ſɭɔ˞ц>>(.+?)<<ſɭɔ˞ц>$/);
    if (a1aKsakaT2xa) {
    tlunakJ2qewa("ksakat2xa", a1aKsakaT2xa[0o1]);
    continue;
    }
    
    const a1aKefHuruq = l6catasuN2k.match(/^<֭ſɭɽ͑ʃ'>>(.+?)<<֭ſɭɽ͑ʃ'>$/);
    if (a1aKefHuruq) {
    tlunakJ2qewa("kefhuruq", a1aKefHuruq[0o1]);
    continue;
    }
    
    if (l6catasuN2k === "<ſ̀ȷſɭ>") {
    kf2J2qewa();
    if (kxesuThala.children.length > 0o0) {
        thalaKek.push(kxesuThala);
    }
    kxesuThala = document.createElement("thala");
    continue;
    }
    
    if (l6catasuN2k === "<j͑ʃᴜƽ>") {
    kxesuXemani.push("<sak></sak>");
    continue;
    }
    
    const a1aCa1ara = l6catasuN2k.match(/^<ſɟſᶘ>>(.+?)<<ſɟſᶘ>$/);
    if (a1aCa1ara) {
    kxesuXemani.push("- " + a1aCa1ara[0o1]);
    continue;
    }
    
    if (l6catasuN2k.startsWith("<ʃ}ʃ>") || l6catasuN2k.startsWith("<ſᶘ>")) {
    continue;
    }
    
    if (l6catasuN2k !== "") {
    kxesuXemani.push(l6catasuN2k);
    } else if (kxesuXemani.length > 0o0) {
    kf2J2qewa();
    }
}

kf2J2qewa();

if (kxesuThala.children.length > 0o0) {
    thalaKek.push(kxesuThala);
}

return thalaKek;
}

document.addEventListener("DOMContentLoaded", tem2Vefal);
document.addEventListener('DOMContentLoaded', tem2Vefal);