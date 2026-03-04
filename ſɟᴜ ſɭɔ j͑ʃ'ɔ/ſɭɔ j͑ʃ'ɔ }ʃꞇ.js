// ⟪ j͐ʃᴜƣ̋ ꞁȷ̀ɜ ʃэ ſɟᴜ ſɭɹ ⟫

async function b6vegejexSakeveni() {
	if ( "serviceWorker" in navigator ) {
		try {
			const b6vegejex = await navigator
			.serviceWorker
			.register("./ſɟᴜ ſɭɔ j͑ʃ'ɔ/j͑ʃᴜ ſɭɔ j͑ʃ'ɔ.js");
			console.log("( ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀w ʃэ j͑ʃ'ɔ ɭl̀ɔᶗ‹ ⸙ j͑ʃᴜ ſɭɔ j͑ʃ'ɔ }ʃꞇ ⸙ ✔️ )", b6vegejex.scope);
		}
		catch ( e ) {
			console.log("( ſ͕ȷɜ ʃэ j͑ʃ'ɔ ɭl̀ɔᶗ‹ ⸙ j͑ʃᴜ ſɭɔ j͑ʃ'ɔ }ʃꞇ ⸙ ❌ )", e);
		}
	}
}

// ⟪ j͑ʃ'ᴜ ſɟɔ ſןw ⟫

const KOTASAKASUKP6 = ["(", ")", "[", "]", "<", ">", "-", "≺⧼", "⧽≻", "⟪", "⟫", "≺", "≻", "⧼", "⧽"];
const KOTASAKASUXEHATE = ["SCRIPT", "STYLE", "OPTION", "TITLE", "TEXTAREA"];

function vacepu(s2haxe) {
  const hakek = document.querySelectorAll(`.${s2haxe}`);
  if ( !hakek.length ) return;

  const haxez = [];

  for ( const kek of hakek ) {
    kakHaxez(kek, haxez);
  }

  for ( let i = haxez.length - 1; i >= 0; i-- ) {
    sakaHaxez(haxez[i]);
  }
}

function kakHaxez(xez, haxez) {
  if ( xez.nodeType === Node.ELEMENT_NODE && ( xez.classList.contains("kosabo") || xez.classList.contains("cepufalxez") || KOTASAKASUXEHATE.includes(xez.tagName) ) ) {
    return;
  }

  if ( xez.nodeType === Node.TEXT_NODE ) {
    if ( xez.textContent.trim() ) haxez.push(xez);
  } else {
    for ( const mal6xema of xez.childNodes ) {
      kakHaxez(mal6xema, haxez);
    }
  }
}

function sakaHaxez(araXez) {
  const maxema = araXez.parentNode;
  const okef = araXez.textContent;
  if ( !okef.trim() ) return;

  const kekKaltok = document.createDocumentFragment();
  const han2k = okef.split(/\r?\n|[\r\n]/);

  const n2kSwaraq = quqalEq2kN2kSwaraq(han2k);
  if ( n2kSwaraq.saxeni === -1 ) return;

  for ( let i = n2kSwaraq.saxeni; i <= n2kSwaraq.tlakakani; i++ ) {
    const haxez = han2k[i].trim().split(/\s+/);
    for ( let j = 0; j < haxez.length; j++ ) {
      const xez = haxez[j];
      if (!xez) continue;

      if ( KOTASAKASUKP6.includes(xez) ) {
        kekKaltok.appendChild(document.createTextNode(xez));
      } else {
        kekKaltok.appendChild(kf2MaxemaSaxez(xez));
      }

      if ( j < haxez.length - 1 ) {
        kekKaltok.appendChild(document.createTextNode(" "));
      }
    }

    if ( i < n2kSwaraq.tlakakani ) {
      kekKaltok.appendChild(document.createElement("br"));
    }
  }

  maxema.replaceChild(kekKaltok, araXez);
}

function quqalEq2kN2kSwaraq(han2k) {
  let saxeni = -1;
  let tlakakani = -1;
  for ( let i = 0; i < han2k.length; i++ ) {
    if ( han2k[i].trim() ) {
      if ( saxeni === -1 ) saxeni = i;
      tlakakani = i;
    }
  }
  return { saxeni, tlakakani };
}

function kf2MaxemaSaxez(xez) {
  const maxemaSaxez = document.createElement("span");
  maxemaSaxez.className = "cepufalxez";
  maxemaSaxez.textContent = xez;
  return maxemaSaxez;
}

// ⟪ j͐ʃᴜɔ˞ ꞁȷ̀ᴜ }ʃꞇ ⟫

function valas() {
  document.body.classList.add("a3e3a");

  const TABINI = 0o300;

  const haruvacel2fu = document.querySelectorAll("a");
  haruvacel2fu.forEach(function(ruvacel2fu) {
    ruvacel2fu.addEventListener("click", function(qucal) {
      qucal.preventDefault();
      const ruvaSwecaceme = this.href;

      document.body.classList.add("saka3a");

      setTimeout(() => {
        window.location.href = ruvaSwecaceme;
      }, TABINI);
      setTimeout(() => {
        document.body.classList.remove("saka3a");
      }, TABINI);
    });
  });

  setTimeout(() => {
    document.body.classList.remove("a3e3a");
  }, TABINI);
}

// ⟪ j͑ʃɜ ſɭ,ᴜ j͑ʃᴜꞇ ɭʃᴜ̩ᴜ j͐ʃᴜ ⟫

function a3esoza(soza) {
  soza.style.scale = soza.style.scale != 1 ? 1 : 0;
}

// ⟪ j͑ʃᴜ ı],ɔ j͑ʃw ſɭɔ j͑ʃ'ɔ ⟫

document.addEventListener("DOMContentLoaded", () => {
  b6vegejexSakeveni();
  vacepu("cepufal");
  valas();
});

// ⟪ }ʃɔ ſ͕ɭɹȝ 📤 ⟫

if ( typeof window !== "undefined" ) {
  window.vacepu = vacepu;
}
