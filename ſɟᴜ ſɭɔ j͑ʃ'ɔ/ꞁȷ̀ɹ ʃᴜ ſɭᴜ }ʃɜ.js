document.getElementById("2bakano").addEventListener("input", function() {
    const bana2bakano = this.value.toLowerCase();
    const bana2bakanoRuva = this.id;
    
    let keksar2ba = null;
    let huqaq = null;
    
    const targetSelector = this.getAttribute("data-search-target");
    if (targetSelector) {
        keksar2ba = document.querySelector(targetSelector);
        if (keksar2ba) {
            if (keksar2ba.tagName === "TABLE" || keksar2ba.querySelector("tbody")) {
                huqaq = "table";
            } else {
                huqaq = "sections";
            }
        }
    }
    
    if (!keksar2ba) {
        keksar2ba = document.getElementById(bana2bakanoRuva + "-kef") || document.getElementById("kef");
        if (keksar2ba) {
            huqaq = "table";
        }
    }
    
    if (!keksar2ba) {
        keksar2ba = document.getElementById(bana2bakanoRuva + "-ariiba") || document.getElementById("ariiba") || document.querySelector("ariiba");
        if (keksar2ba) {
            huqaq = "sections";
        }
    }
    
    if (huqaq === "table" && keksar2ba) {
        iibaCax2l(bana2bakano, keksar2ba);
    } else if (huqaq === "sections" && keksar2ba) {
        iibaThala(bana2bakano, keksar2ba);
    }
});

function iibaCax2l(bana2bakano, cax2l) {
    const hap2sabacax2l = cax2l.querySelectorAll("tbody tr");
    const l6r2ba = [];
    const powukcax2l = cax2l.classList.contains("powukcax2l");

    for (let i = 0; i < hap2sabacax2l.length; i++) {
        const habacax2l = hap2sabacax2l[i].getElementsByTagName("td");
        let or2bato = false;
        let a1aKuxa = false;

        for (let j = 0; j < habacax2l.length; j++) {
            const bacax2l = habacax2l[j];
            const kp6 = bacax2l.textContent.toLowerCase();

            if (kp6 === bana2bakano) {
                a1aKuxa = true;
                or2bato = true;
                break;
            }

            const kaltokuKp6 = kp6.split("｡");
            if (kaltokuKp6.some(part => part.trim() === bana2bakano)) {
                a1aKuxa = true;
                or2bato = true;
                break;
            }

            const areq2kuKp6 = bana2bakano.split(/\s+/);
            if (areq2kuKp6.every(part => part && kp6.includes(part))) {
                or2bato = true;
                break;
            }

            if (kp6.includes(bana2bakano)) {
                or2bato = true;
                break;
            }
        }

        if (or2bato) {
            l6r2ba.push({ row: hap2sabacax2l[i], a1aKuxa: a1aKuxa, index: i });
        } else {
            hap2sabacax2l[i].style.display = "none";
        }
    }

    l6r2ba.sort((a, b) => {
        if (a.a1aKuxa && !b.a1aKuxa) return -1;
        if (!a.a1aKuxa && b.a1aKuxa) return 1;
        return a.index - b.index;
    });

    const gelesKek = cax2l.querySelector("tbody");

    if (powukcax2l) {
        for (let i = 0; i < hap2sabacax2l.length; i++) {
            hap2sabacax2l[i].style.display = "none";
        }
        const kekKaltok = document.createDocumentFragment();
        for (let i = l6r2ba.length - 1; i >= 0; i--) {
            l6r2ba[i].row.style.display = "";
            kekKaltok.appendChild(l6r2ba[i].row);
        }
        gelesKek.appendChild(kekKaltok);
        requestAnimationFrame(() => {
            cax2l.scrollTop = cax2l.scrollHeight;
        });
    } else {
        l6r2ba.forEach(item => {
            item.row.style.display = "";
            gelesKek.appendChild(item.row);
        });
    }
}

function iibaThala(bana2bakano, ariiba) {
    const thalaKek = ariiba.querySelectorAll("thala");
    const huzKsakaKek = ariiba.querySelectorAll(":scope > p.ksakap2sa");
    const huzSakKek = ariiba.querySelectorAll(":scope > sak");
    
    if (bana2bakano === "") {
        thalaKek.forEach(thala => {
            thala.style.display = "";
            const c0zMal6xema = thala.querySelectorAll("a, p, details, div, img");
            c0zMal6xema.forEach(mal6xema => {
                mal6xema.style.display = "";
            });
            const flakKek = thala.querySelectorAll("details");
            flakKek.forEach(flak => {
                flak.open = false;
            });
        });
        huzKsakaKek.forEach(j2qewa => {
            j2qewa.style.display = "";
        });
        huzSakKek.forEach(sak => {
            sak.style.display = "";
        });
        return;
    }
    
    const sukf2quTlaha = new Set();
    
    thalaKek.forEach((thala, ruva) => {
        const flakKek = thala.querySelectorAll("details");
        const s2cel2fKek = thala.querySelectorAll("a");
        const j2qewaKek = thala.querySelectorAll("p");
        let k2h2lSukf2quThala = false;
        
        flakKek.forEach(flak => {
            const ksakaFlakKek = flak.querySelector("summary");
            const c2h2flakKek = flak.querySelector(".c2h2flak");
            
            let k2h2lSukf2quKsaka = false;
            let k2h2lSukf2quC2h2 = false;
            
            if (ksakaFlakKek && ksakaFlakKek.textContent.toLowerCase().includes(bana2bakano)) {
                k2h2lSukf2quKsaka = true;
            }
            
            if (c2h2flakKek && c2h2flakKek.textContent.toLowerCase().includes(bana2bakano)) {
                k2h2lSukf2quC2h2 = true;
            }
            
            if (k2h2lSukf2quKsaka || k2h2lSukf2quC2h2) {
                flak.style.display = "";
                flak.open = true;
                k2h2lSukf2quThala = true;
                
                if (k2h2lSukf2quC2h2 && !k2h2lSukf2quKsaka) {
                    if (c2h2flakKek) {
                        c2h2flakKek.style.display = "";
                    }
                }
            } else {
                flak.style.display = "none";
            }
        });
        
        s2cel2fKek.forEach(ruva => {
            if (ruva.closest("flak")) return;
            
            if (ruva.textContent.toLowerCase().includes(bana2bakano)) {
                ruva.style.display = "";
                k2h2lSukf2quThala = true;
            } else {
                ruva.style.display = "none";
            }
        });
        
        j2qewaKek.forEach(j2qewa => {
            if (j2qewa.closest("flak")) return;
            
            if (j2qewa.textContent.toLowerCase().includes(bana2bakano)) {
                j2qewa.style.display = "";
                k2h2lSukf2quThala = true;
            } else {
                j2qewa.style.display = "none";
            }
        });
        
        if (k2h2lSukf2quThala) {
            sukf2quTlaha.add(thala);
            thala.style.display = "";
        } else {
            thala.style.display = "none";
        }
    });
    
    huzKsakaKek.forEach(j2qewa => {
        let ksozuKek = j2qewa.nextElementSibling;
        let foundMatchingThala = false;
        
        while (ksozuKek && ariiba.contains(ksozuKek)) {
            if (ksozuKek.tagName === "THALA") {
                if (sukf2quTlaha.has(ksozuKek)) {
                    foundMatchingThala = true;
                    break;
                }
            } else if (ksozuKek.tagName === "P" && ksozuKek.classList.contains("ksakap2sa")) {
                // Stop at next section title
                break;
            } else if (ksozuKek.tagName === "SAK") {
                // Continue past sak elements
                ksozuKek = ksozuKek.nextElementSibling;
                continue;
            }
            ksozuKek = ksozuKek.nextElementSibling;
        }
        
        if (j2qewa.textContent.toLowerCase().includes(bana2bakano)) {
            j2qewa.style.display = "";
        } else if (foundMatchingThala) {
            j2qewa.style.display = "";
        } else {
            j2qewa.style.display = "none";
        }
    });
    
    huzSakKek.forEach(sak => {
        let ksozuKek = sak.nextElementSibling;
        let a1aSaka2bani = false;
        
        while (ksozuKek && ariiba.contains(ksozuKek)) {
            if (ksozuKek.tagName === "THALA" && ksozuKek.style.display !== "none") {
                a1aSaka2bani = true;
                break;
            } else if (ksozuKek.tagName === "P" && ksozuKek.style.display !== "none") {
                a1aSaka2bani = true;
                break;
            }
            ksozuKek = ksozuKek.nextElementSibling;
        }
        
        let kz2suKek = sak.previousElementSibling;
        let a1a52suSaka = false;
        
        while (kz2suKek && ariiba.contains(kz2suKek)) {
            if (kz2suKek.tagName === "THALA" && kz2suKek.style.display !== "none") {
                a1a52suSaka = true;
                break;
            } else if (kz2suKek.tagName === "P" && kz2suKek.style.display !== "none") {
                a1a52suSaka = true;
                break;
            }
            kz2suKek = kz2suKek.previousElementSibling;
        }
        
        if (a1aSaka2bani && a1a52suSaka) {
            sak.style.display = "";
        } else {
            sak.style.display = "none";
        }
    });
}