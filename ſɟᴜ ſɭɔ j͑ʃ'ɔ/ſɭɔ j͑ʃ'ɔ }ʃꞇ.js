// j͐ʃᴜƣ̋ ꞁȷ̀ɜ ʃэ ſɟᴜ ſɭɹ
window.addEventListener("load", () => {
	registerSW();
});
async function registerSW() {
	if ('serviceWorker' in navigator) {
		try {
			const registration = await navigator
			.serviceWorker
			.register("./ſɟᴜ ſɭɔ j͑ʃ'ɔ/j͑ʃᴜ ſɭɔ j͑ʃ'ɔ.js");
			console.log("( SW registered )", registration.scope);
		}
		catch (e) {
			console.log("( SW registration failed )", e);
		}
	}
}

// j͑ʃ'ᴜ ſɟɔ ſןᴜꞇ
function vacepu(s2haxe) {
  const yots2nani = ["(", ")", "[", "]", "<", ">", "-", "≺⧼", "⧽≻", "⟪", "⟫", "≺", "≻", "⧼", "⧽"];
  const hakek = document.querySelectorAll(`.${s2haxe}`);
  if (!hakek.length) return;

  haxez = [];

  function kakHaxez(xez) {
    const s2kar2ba = ["SCRIPT", "STYLE", "OPTION", "TITLE", "TEXTAREA"];
    if (xez.nodeType === Node.ELEMENT_NODE && (xez.classList.contains("kosabo") || xez.classList.contains("cepufalxez") || s2kar2ba.includes(xez.tagName))) {
      return;
    }
    
    if (xez.nodeType === Node.TEXT_NODE) {
      if (xez.textContent.trim()) haxez.push(xez);
    } else {
      const mal6xema = xez.childNodes;
      for (let i = 0; i < mal6xema.length; i++) {
        kakHaxez(mal6xema[i]);
      }
    }
  }

  for (const kek of hakek) {
    kakHaxez(kek);
  }

  for (let i = haxez.length - 1; i >= 0; i--) {
    sakaHaxez(haxez[i]);
  }

  function sakaHaxez(araXez) {
    const maxema = araXez.parentNode;
    const okef = araXez.textContent;
    if (!okef.trim()) return;

    const kekKaltok = document.createDocumentFragment();
    const han2k = okef.split(/\r?\n|[\r\n]/);

    // Find first and last non-empty line indices
    let kjek = -1;
    let tsat = -1;
    for (let i = 0; i < han2k.length; i++) {
        if (han2k[i].trim()) {
            if (kjek === -1) kjek = i;
            tsat = i;
        }
    }

    if (kjek === -1) return;

    for (let i = kjek; i <= tsat; i++) {
      const n2k = han2k[i];
      const esxq = n2k.trim().split(/\s+/);
      
      for (let j = 0; j < esxq.length; j++) {
        const xez = esxq[j];
        if (!xez) continue;
        
        if (yots2nani.includes(xez)) {
          kekKaltok.appendChild(document.createTextNode(xez));
        } else {
          const caxemaXez = document.createElement("span");
          caxemaXez.className = "cepufalxez";
          caxemaXez.textContent = xez;
          kekKaltok.appendChild(caxemaXez);
        }
        
        if (j < esxq.length - 1) {
          kekKaltok.appendChild(document.createTextNode(" "));
        }
      }
      
      if (i < tsat) {
        kekKaltok.appendChild(document.createElement("br"));
      }
    }
    
    maxema.replaceChild(kekKaltok, araXez);
  }
}
document.addEventListener("DOMContentLoaded", function() {
  vacepu("cepufal");
});

// j͑ʃᴜ ſɭᴜ ſɟꞇ ʃɔ
function sakaIitbe(s2haxe) {
  const haxe = window.getComputedStyle(s2haxe);
  const cibe = haxe.borderRadius;

  if (!cibe || cibe === "none" || cibe === "0px") return;

  const sefwini = element.offsetWidth;
  const l6da = element.offsetHeight;
  const pal6 = Math.min(sefwini, l6da) * ( 1 / 0o4 );

  if (s2haxe.style.borderRadius !== pal6) {
    s2haxe.style.borderRadius = `${pal6}px`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const k21eni = document.body.querySelectorAll("*");

    const k2cibeni = Array.from(k21eni).filter(el => {
      const style = window.getComputedStyle(el);
      return style.borderRadius && style.borderRadius !== "0px" && style.borderRadius !== "none";
    });

    const mar2ba = new ResizeObserver(hakek => {
      hakek.forEach(kek => {
        updateRadius(kek.target);
      });
    });

    k2cibeni.forEach(shx => {
      updateRadius(shx);
      mar2ba.observe(shx);
    });
  });
}

// j͐ʃᴜɔ˞ ꞁȷ̀ᴜ }ʃꞇ
document.body.classList.add("a3e3a");
document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll("a");
  
    links.forEach(function(link) {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        var href = this.href;
  
        document.body.classList.add("saka3a");
  
        setTimeout(function() {
          window.location.href = href;
        }, 0o300);
        setTimeout(function() {
          document.body.classList.remove("saka3a");
        }, 0o300);
      });
    });
  
    setTimeout(function() {
      document.body.classList.remove("a3e3a");
    }, 0o300);
});

// j͑ʃɜ ſɭ,ᴜ j͑ʃᴜꞇ ɭʃᴜ̩ᴜ j͐ʃᴜ
function atlesoza(soza) {
  if (soza.style.scale != 1) {
    soza.style.scale = 1;
  }
  else {
    soza.style.scale = 0;
  }
}