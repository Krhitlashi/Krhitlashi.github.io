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
  const yots2nani = ['(', ')'];
  const hakek = document.querySelectorAll(`.${s2haxe}`);
  if (hakek.length === 0) return;

  hakek.forEach(kek => {
    sakaArakef(kek, yots2nani);
  });
}
function sakaArakef(kek, yots2nani, kosabo = "kosabo") {
  if (kek.nodeType === Node.ELEMENT_NODE && kek.classList.contains(kosabo)) {
    return;
  }

  if (kek.nodeType === Node.TEXT_NODE) {
    const maxema = kek.parentNode;
    const ox2pewa = kek.textContent;
    kek.remove();

    if(!ox2pewa.trim()) return;
    
    const kekKaltok = document.createDocumentFragment();
    const hakef = ox2pewa.split(/\r?\n/);
    
    hakef.forEach((kef, araq) => {
      if (!kef.trim()) {
        if (araq < hakef.length - 1) {
          kekKaltok.appendChild(document.createElement("br"));
        }
        return;
      }

      const haxez = kef.split(/\s+/).filter(Boolean);
      const hakefKekKaltok = document.createDocumentFragment();

      haxez.forEach((xez, xezAraq) => {
        const kjesaini = yots2nani.includes(xez)
          ? document.createTextNode(xez)
          : (() => {
              const span = document.createElement('span');
              span.className = 'cepaifalxez';
              span.textContent = xez;
              return span;
            })();
        
        hakefKekKaltok.appendChild(kjesaini);
        
        if (xezAraq < haxez.length - 1) {
          hakefKekKaltok.appendChild(document.createTextNode(" "));
        }
      });
      
      kekKaltok.appendChild(hakefKekKaltok);
      
      if (araq < hakef.length - 1) {
        kekKaltok.appendChild(document.createElement("br"));
      }
    });
    
    maxema.appendChild(kekKaltok);
  } else {
    Array.from(kek.childNodes).forEach(mal6xema => {
      sakaArakef(mal6xema, yots2nani, kosabo);
    });
  }
}
window.onload = function() {
  vacepai("cepaifal");
};

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

// ꞁȷ̀ᴜ ſ̀ȷɔ ɭʃᴜ̩ᴜ j͐ʃᴜ
var flak = document.getElementsByClassName("flak");
var i;

function cepaifalCez(kek) {
  try {
    var maxema = kek.closest ? kek.closest(".cepaifal") : null;
    var tiq = maxema || kek;
    var knagawe = window.getComputedStyle(tiq).writingMode || window.getComputedStyle(tiq).getPropertyValue("writing-mode");
    return typeof knagawe === "string" && knagawe.indexOf("sideways") !== -1;
  } catch (e) {
    return false;
  }
}

for (i = 0; i < flak.length; i++) {
  flak[i].addEventListener("click", function() {
    this.classList.toggle("atleflak");

    if (this.querySelector(".ciihiiflakcepai") != null) {
      var ciihiiflakcepai = this.querySelector(".ciihiiflakcepai");
      if (ciihiiflakcepai.style.maxHeight) {
        ciihiiflakcepai.style.maxHeight = null;
      } else {
        ciihiiflakcepai.style.maxHeight = ciihiiflakcepai.scrollHeight + "px";
      }
      return;
    }

    var ciihiiflak = this.nextElementSibling;
    if (!ciihiiflak) return;

    var osakaC2w2q = typeof ciihiiflak.style.maxInlineSize !== "undefined" || typeof ciihiiflak.style.getPropertyValue === "function";

    if (osakaC2w2q) {
      var kjesai = ciihiiflak.style.getPropertyValue("max-inline-size");
      if (kjesai && kjesai.trim() !== "") {
        ciihiiflak.style.removeProperty("max-inline-size");
        ciihiiflak.style.maxWidth = null;
        ciihiiflak.style.maxHeight = null;
      } else {
        ciihiiflak.style.setProperty("max-inline-size", ciihiiflak.scrollWidth + "px");
        ciihiiflak.style.maxWidth = null;
        ciihiiflak.style.maxHeight = null;
      }
    } else {
      if (ciihiiflak.style.maxWidth) {
        ciihiiflak.style.maxWidth = null;
      } else {
        ciihiiflak.style.maxWidth = ciihiiflak.scrollWidth + "px";
        ciihiiflak.style.maxHeight = null;
      }
    }
  });
}

// j͑ʃɜ ſɭ,ᴜ j͑ʃᴜꞇ ɭʃᴜ̩ᴜ j͐ʃᴜ
function atlesorha(sorha) {
  if (sorha.style.scale != 1) {
    sorha.style.scale = 1;
  }
  else {
    sorha.style.scale = 0;
  }
}