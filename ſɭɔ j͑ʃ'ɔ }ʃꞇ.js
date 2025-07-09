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
  const hatarakef = document.querySelectorAll(s2haxe);
  if (hatarakef.length === 0) { return; }

  hatarakef.forEach(arakef => {
    const tsiqaiOx2 = arakef.textContent.trim();
    arakef.innerHTML = "";

    let kaltokani = document.createElement("div");
    kaltokani.className = "cepaifalkek";
    arakef.appendChild(kaltokani);

    tsiqaiOx2.split("\n").forEach((cepaini, ruva) => {
      if (ruva > 0) kaltokani.appendChild(document.createElement("br"));
      cepaini.split(" ").forEach((xez, xezruva, xezrakaz) => {
        if (xez) {
          const xezKek = document.createElement("div");
          xezKek.className = "cepaifalkef";
          xezKek.textContent = xez;
          kaltokani.appendChild(xezKek);
        }
        if (xezruva < xezrakaz.length - 1) {
          kaltokani.appendChild(document.createTextNode(" "));
        }
      });
    });
  });
}

window.onload = function() {
  vacepai(".cepaifal");
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
    }
    else {
      var ciihiiflak = this.nextElementSibling;
      if (ciihiiflak.style.maxWidth) {
			  ciihiiflak.style.maxWidth = null;
      } else {
     		ciihiiflak.style.maxWidth = ciihiiflak.scrollWidth + "px";
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