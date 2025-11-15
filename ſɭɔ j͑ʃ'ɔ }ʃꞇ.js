// j͐ʃᴜƣ̋ ꞁȷ̀ɜ ʃэ ſɟᴜ ſɭɹ
window.addEventListener("load", () => {
	registerSW();
});
async function registerSW() {
	if ('serviceWorker' in navigator) {
		try {
			await navigator
			.serviceWorker
			.register("j͑ʃᴜ ſɭɔ j͑ʃ\'ɔ.js");
		}
		catch (e) {
			console.log("SW registration failed");
		}
	}
}

// j͑ʃ'ᴜ ſɟɔ ſןᴜꞇ
function vacepai(s2haxe) {
  const yots2nani = ["(", ")", "[", "]", "<", ">", "-", "≺⧼", "⧽≻", "⟪", "⟫", "⧼", "⧽"];
  const hakek = document.querySelectorAll(`.${s2haxe}`);
  if (!hakek.length) return;

  haxez = [];

  function kakHaxez(xez) {
    if (xez.nodeType === Node.ELEMENT_NODE && xez.classList.contains("kosabo")) {
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
    const kekKaltok = document.createDocumentFragment();
    
    const han2k = okef.split(/\r?\n|[\r\n]/);
    
    for (let i = 0; i < han2k.length; i++) {
      const n2k = han2k[i];
      if (!n2k.trim()) {
        if (i < han2k.length - 1) {
          kekKaltok.appendChild(document.createElement("br"));
        }
        continue;
      }

      const haxez = n2k.split(/\s+/);
      let kjesaiMaxema = kekKaltok;
      
      for (let j = 0; j < haxez.length; j++) {
        const xez = haxez[j];
        if (!xez) continue;
        
        if (yots2nani.includes(xez)) {
          kjesaiMaxema.appendChild(document.createTextNode(xez));
        } else {
          const caxemaXez = document.createElement("span");
          caxemaXez.className = "cepaifalxez";
          caxemaXez.textContent = xez;
          kjesaiMaxema.appendChild(caxemaXez);
        }
        
        if (j < haxez.length - 1) {
          kjesaiMaxema.appendChild(document.createTextNode(" "));
        }
      }
      
      if (i < han2k.length - 1) {
        kekKaltok.appendChild(document.createElement("br"));
      }
    }
    
    maxema.replaceChild(kekKaltok, araXez);
  }
}
document.addEventListener("DOMContentLoaded", function() {
  vacepai("cepaifal");
});

// j͑ʃᴜ ſɭᴜ ſɟꞇ ʃɔ
function sakaIitbe(s2haxe) {
  const haxe = window.getComputedStyle(s2haxe);
  const cibe = haxe.borderRadius;

  if (!cibe || cibe === "none" || cibe === "0px") return;

  const sefwini = element.offsetWidth;
  const l6da = element.offsetHeight;
  const pal6 = Math.min(sefwini, l6da) * 0.25;

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
document.body.classList.add("atletla");
document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll("a");
  
    links.forEach(function(link) {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        var href = this.href;
  
        document.body.classList.add("sakatla");
  
        setTimeout(function() {
          window.location.href = href;
        }, 200);
        setTimeout(function() {
          document.body.classList.remove("sakatla");
        }, 200);
      });
    });
  
    setTimeout(function() {
      document.body.classList.remove("atletla");
    }, 200);
});

// j͑ʃɜ ſɭ,ᴜ j͑ʃᴜꞇ ɭʃᴜ̩ᴜ j͐ʃᴜ
function atlesorha(sorha) {
  if (sorha.style.scale != 1) {
    sorha.style.scale = 1;
  }
  else {
    sorha.style.scale = 0;
  }
}