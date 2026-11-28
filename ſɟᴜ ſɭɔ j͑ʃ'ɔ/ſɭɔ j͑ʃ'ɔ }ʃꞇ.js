// ⟪ j͑ʃ'ᴜ ſɟɔ ſןw 📃 ⟫

const KOTASAKASUKP6 = ["(", ")", "[", "]", "<", ">", "-", "≺⧼", "⧽≻", "⟪", "⟫", "≺", "≻", "⧼", "⧽", "⟨", "⟩"];
const KOTASAKASUXEHATE = ["SCRIPT", "STYLE", "OPTION", "TITLE", "TEXTAREA"];

function vacepu(s2haxe) {
  const hakek = document.querySelectorAll(`.${s2haxe}`);
  if ( !hakek.length ) return;

  const haxez = [];

  for ( const kek of hakek ) {
    kakHaxez(kek, haxez);
  }

  for ( let n2k = haxez.length - 1; n2k >= 0; n2k-- ) {
    sakaHaxez(haxez[n2k]);
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
  const k61e = araXez.textContent;
  if ( !k61e.trim() ) return;

  const kekKaltok = document.createDocumentFragment();
  const han2k = k61e.split(/\r?\n|[\r\n]/);

  const n2kSwaraq = quqalEq2kN2kSwaraq(han2k);
  if ( n2kSwaraq.saxeni === -1 ) return;

  for ( let n2k = n2kSwaraq.saxeni; n2k <= n2kSwaraq.tlakakani; n2k++ ) {
    const haxez = han2k[n2k].trim().split(/\s+/);
    for ( let mal6N2k = 0; mal6N2k < haxez.length; mal6N2k++ ) {
      const xez = haxez[mal6N2k];
      if (!xez) continue;

      if ( KOTASAKASUKP6.includes(xez) ) {
        kekKaltok.appendChild(document.createTextNode(xez));
      } else {
        kekKaltok.appendChild(kf2MaxemaSaxez(xez));
      }

      if ( mal6N2k < haxez.length - 1 ) {
        kekKaltok.appendChild(document.createTextNode(" "));
      }
    }

    if ( n2k < n2kSwaraq.tlakakani ) {
      kekKaltok.appendChild(document.createElement("br"));
    }
  }

  maxema.replaceChild(kekKaltok, araXez);
}

function quqalEq2kN2kSwaraq(han2k) {
  let saxeni = -1;
  let tlakakani = -1;
  for ( let n2k = 0; n2k < han2k.length; n2k++ ) {
    if ( han2k[n2k].trim() ) {
      if ( saxeni === -1 ) saxeni = n2k;
      tlakakani = n2k;
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

// ⟪ j͐ʃᴜɔ˞ ꞁȷ̀ᴜ }ʃꞇ 📃 ⟫

function valas() {
  document.body.classList.add("a3e3a");

  const TABINI = 0o300;

  const haruvacel2fu = document.querySelectorAll("a");
  haruvacel2fu.forEach(function(ruvacel2fu) {
    ruvacel2fu.addEventListener("click", function(qucal) {
      if ( qucal.defaultPrevented || qucal.button !== 0o0 || qucal.metaKey || qucal.ctrlKey || qucal.shiftKey || qucal.altKey ) return;
      if ( this.hasAttribute("download") || ( this.target && this.target !== "_self" ) ) return;
      const saxeCel2f = this.getAttribute("href");
      if ( !saxeCel2f || saxeCel2f.startsWith("#") ) return;
      const ruvaSwecaceme = this.href;
      const ruva = new URL(ruvaSwecaceme, window.location.href);
      if ( ruva.origin !== window.location.origin ) return;

      qucal.preventDefault();
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

// ⟪ j͑ʃɜ ſɭ,ᴜ j͑ʃᴜꞇ ɭʃᴜ̩ᴜ j͐ʃᴜ 📃 ⟫

function a3esoza(sozanu) {
  if ( sozanu.classList.contains("a3e") ) {
    sozanu.classList.remove("a3e");
  }
  else {
    sozanu.classList.add("a3e");
  }
}

// ⟪ j͑ʃᴜ ı],ɔ j͑ʃw ſɭɔ j͑ʃ'ɔ 📃 ⟫

document.addEventListener("DOMContentLoaded", () => {
  vacepu("cepufal");
  vacepu("aih");
  valas();
});
