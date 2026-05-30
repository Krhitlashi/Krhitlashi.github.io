const hat2bakanoKek = document.getElementById("2bakano");

if ( hat2bakanoKek ) {
    hat2bakanoKek.addEventListener("input", function() {
    const bana2bakano = this.value.toLowerCase();
    const bana2bakanoRuva = this.id;
    
    let keksar2ba = null;
    let huqaq = null;
    
    const targetSelector = this.getAttribute("data-search-target");
    if ( targetSelector ) {
        keksar2ba = document.querySelector(targetSelector);
        if ( keksar2ba ) {
            if ( keksar2ba.tagName === "TABLE" || keksar2ba.querySelector("tbody") ) {
                huqaq = "table";
            } else {
                huqaq = "hataraq";
            }
        }
    }
    
    if ( !keksar2ba ) {
        keksar2ba = document.getElementById(bana2bakanoRuva + "-kef") || document.getElementById("kef");
        if ( keksar2ba ) {
            huqaq = "table";
        }
    }
    
    if ( !keksar2ba ) {
        keksar2ba = document.getElementById(bana2bakanoRuva + "-ariiba") || document.getElementById("ariiba") || document.querySelector("ariiba");
        if ( keksar2ba ) {
            huqaq = "hataraq";
        }
    }
    
    if ( huqaq === "table" && keksar2ba ) {
        iibaCax2l(bana2bakano, keksar2ba);
    } else if ( huqaq === "hataraq" && keksar2ba ) {
        iibaThala(bana2bakano, keksar2ba);
    }
    });
}

function iibaCax2l(bana2bakano, cax2l) {
    const hap2sabacax2l = cax2l.querySelectorAll("tbody tr");
    const l6r2ba = [];
    const powukcax2l = cax2l.classList.contains("powukcax2l");

    for ( let i = 0; i < hap2sabacax2l.length; i++ ) {
        const habacax2l = hap2sabacax2l[i].getElementsByTagName("td");
        let or2bato = false;
        let a1aKuxa = false;

        for ( let j = 0; j < habacax2l.length; j++ ) {
            const bacax2l = habacax2l[j];
            const kp6 = bacax2l.textContent.toLowerCase();

            if ( kp6 === bana2bakano ) {
                a1aKuxa = true;
                or2bato = true;
                break;
            }

            const kaltokuKp6 = kp6.split("｡");
            if ( kaltokuKp6.some(part => part.trim() === bana2bakano) ) {
                a1aKuxa = true;
                or2bato = true;
                break;
            }

            const areq2kuKp6 = bana2bakano.split(/\s+/);
            if ( areq2kuKp6.every(part => part && kp6.includes(part)) ) {
                or2bato = true;
                break;
            }

            if ( kp6.includes(bana2bakano) ) {
                or2bato = true;
                break;
            }
        }

        if ( or2bato ) {
            l6r2ba.push({ row: hap2sabacax2l[i], a1aKuxa: a1aKuxa, index: i });
        } else {
            hap2sabacax2l[i].style.display = "none";
        }
    }

    l6r2ba.sort((a, b) => {
        if ( a.a1aKuxa && !b.a1aKuxa ) return -1;
        if ( !a.a1aKuxa && b.a1aKuxa ) return 1;
        return a.index - b.index;
    });

    const gelesKek = cax2l.querySelector("tbody");

    if ( powukcax2l ) {
        for (let i = 0; i < hap2sabacax2l.length; i++) {
            hap2sabacax2l[i].style.display = "none";
        }
        const kekKaltok = document.createDocumentFragment();
        for ( let i = l6r2ba.length - 1; i >= 0; i-- ) {
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
    
    if ( bana2bakano === "" ) {
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
            
            if ( ksakaFlakKek && ksakaFlakKek.textContent.toLowerCase().includes(bana2bakano) ) {
                k2h2lSukf2quKsaka = true;
            }
            
            if ( c2h2flakKek && c2h2flakKek.textContent.toLowerCase().includes(bana2bakano) ) {
                k2h2lSukf2quC2h2 = true;
            }
            
            if ( k2h2lSukf2quKsaka || k2h2lSukf2quC2h2 ) {
                flak.style.display = "";
                flak.open = true;
                k2h2lSukf2quThala = true;
                
                if ( k2h2lSukf2quC2h2 && !k2h2lSukf2quKsaka ) {
                    if ( c2h2flakKek ) {
                        c2h2flakKek.style.display = "";
                    }
                }
            } else {
                flak.style.display = "none";
            }
        });
        
        s2cel2fKek.forEach(ruva => {
            if ( ruva.closest("flak") ) return;
            
            if ( ruva.textContent.toLowerCase().includes(bana2bakano) ) {
                ruva.style.display = "";
                k2h2lSukf2quThala = true;
            } else {
                ruva.style.display = "none";
            }
        });
        
        j2qewaKek.forEach(j2qewa => {
            if ( j2qewa.closest("flak") ) return;
            
            if ( j2qewa.textContent.toLowerCase().includes(bana2bakano) ) {
                j2qewa.style.display = "";
                k2h2lSukf2quThala = true;
            } else {
                j2qewa.style.display = "none";
            }
        });
        
        if ( k2h2lSukf2quThala ) {
            sukf2quTlaha.add(thala);
            thala.style.display = "";
        } else {
            thala.style.display = "none";
        }
    });
    
    huzKsakaKek.forEach(j2qewa => {
        let ksozuKek = j2qewa.nextElementSibling;
        let l6sukf2quThala = false;
        
        while ( ksozuKek && ariiba.contains(ksozuKek) ) {
            if ( ksozuKek.tagName === "THALA" ) {
                if ( sukf2quTlaha.has(ksozuKek) ) {
                    l6sukf2quThala = true;
                    break;
                }
            } else if ( ksozuKek.tagName === "P" && ksozuKek.classList.contains("ksakap2sa") ) {
                break;
            } else if ( ksozuKek.tagName === "SAK" ) {
                ksozuKek = ksozuKek.nextElementSibling;
                continue;
            }
            ksozuKek = ksozuKek.nextElementSibling;
        }
        
        if ( j2qewa.textContent.toLowerCase().includes(bana2bakano) ) {
            j2qewa.style.display = "";
        } else if ( l6sukf2quThala ) {
            j2qewa.style.display = "";
        } else {
            j2qewa.style.display = "none";
        }
    });
    
    huzSakKek.forEach(sak => {
        let ksozuKek = sak.nextElementSibling;
        let a1aSaka2bani = false;
        
        while ( ksozuKek && ariiba.contains(ksozuKek) ) {
            if ( ksozuKek.tagName === "THALA" && ksozuKek.style.display !== "none" ) {
                a1aSaka2bani = true;
                break;
            } else if ( ksozuKek.tagName === "P" && ksozuKek.style.display !== "none" ) {
                a1aSaka2bani = true;
                break;
            }
            ksozuKek = ksozuKek.nextElementSibling;
        }
        
        let kz2suKek = sak.previousElementSibling;
        let a1a52suSaka = false;
        
        while ( kz2suKek && ariiba.contains(kz2suKek) ) {
            if ( kz2suKek.tagName === "THALA" && kz2suKek.style.display !== "none" ) {
                a1a52suSaka = true;
                break;
            } else if ( kz2suKek.tagName === "P" && kz2suKek.style.display !== "none" ) {
                a1a52suSaka = true;
                break;
            }
            kz2suKek = kz2suKek.previousElementSibling;
        }
        
        if ( a1aSaka2bani && a1a52suSaka ) {
            sak.style.display = "";
        } else {
            sak.style.display = "none";
        }
    });
}

function iibaHate() {
    const cakaxaSar2bahate = document.getElementById("2bahate");
    if ( !cakaxaSar2bahate ) return;

    const ca12naKek = Array.from(cakaxaSar2bahate.querySelectorAll("button"));
    const hat2bakano = document.getElementById("2bakano");
    const ariiba = document.querySelector("ariiba");
    if ( !ca12naKek.length || !ariiba ) return;

    const sakKek = iibaSak(cakaxaSar2bahate, ariiba);
    const sak21eni = ca12naKek.find(button => button.getAttribute("aria-pressed") === "true") || ca12naKek[0];
    let k21eniCa12na = sak21eni;

    ca12naKek.forEach(cakar2ba => {
        if ( !cakar2ba.hasAttribute("aria-pressed") ) {
            cakar2ba.setAttribute("aria-pressed", "false");
        }

        cakar2ba.addEventListener("click", () => {
            k21eniCa12na = cakar2ba;
            ca12naKek.forEach(ca12na => {
                ca12na.setAttribute("aria-pressed", ca12na === cakar2ba ? "true" : "false");
            });
            if ( hat2bakano ) {
                iibaThala(hat2bakano.value.toLowerCase(), ariiba);
            }
            iibalK2resuKsaka();
        });
    });

    if ( hat2bakano ) {
        hat2bakano.addEventListener("input", () => {
            requestAnimationFrame(iibalK2resuKsaka);
        });
    }

    iibalK2resuKsaka();

    function iibalK2resuKsaka() {
        const k2reK21eni = k21eniCa12na === sak21eni;
        const ksakaK21eni = k21eniCa12na.dataset.oskakefani;
        const bana2bakano = hat2bakano ? hat2bakano.value.toLowerCase() : "";

        sakKek.forEach(araq => {
            const sukf2quCakar2ba = k2reK21eni || araq.ruva === ksakaK21eni;
            const hasVisibleContent = sukf2quCakar2ba && araq.hakek.some(kek => {
                return !kek.matches?.("p.saxesukef") && kek.style.display !== "none";
            });

            araq.hakek.forEach(kek => {
                if ( !sukf2quCakar2ba ) {
                    kek.style.display = "none";
                } else if ( kek.matches?.("p.saxesukef") ) {
                    const sukf2quSaxesukef = kek.textContent.toLowerCase().includes(bana2bakano);
                    kek.style.display = bana2bakano === "" || sukf2quSaxesukef || hasVisibleContent ? "" : "none";
                }
            });
            araq.hasak.forEach(sak => {
                sak.style.display = sukf2quCakar2ba && ( hasVisibleContent || bana2bakano === "" ) ? "" : "none";
            });
        });
    }
}

function iibaSak(cakaxaSar2bahate, ariiba) {
    const hataraq = [];
    let kxesuAraq = null;
    let kxesuSak = null;

    const gelesMal6xema = Array.from(document.body.children);
    for ( const mal6xema of gelesMal6xema ) {
        if ( mal6xema === cakaxaSar2bahate ) {
            kxesuSak = null;
            kxesuAraq = null;
            continue;
        }

        if ( mal6xema.tagName === "SAK" ) {
            kxesuSak = mal6xema;
            kxesuAraq = null;
            continue;
        }

        if ( mal6xema.matches?.("p.saxesukef") ) {
            kxesuAraq = {
                ruva: mal6xema.dataset.oskakefani,
                hasak: kxesuSak ? [ kxesuSak ] : [],
                hakek: [ mal6xema ],
            };
            hataraq.push(kxesuAraq);
            kxesuSak = null;
            continue;
        }

        if ( mal6xema === ariiba ) {
            iibaSakThala(mal6xema, kxesuAraq, hataraq);
        }
    }

    return hataraq;
}

function iibaSakThala(maxema, kxesuAraq, hataraq) {
    let araq = kxesuAraq;
    let ksozuSak = [];

    Array.from(maxema.children).forEach(mal6xema => {
        if ( mal6xema.tagName === "SAK" ) {
            ksozuSak.push(mal6xema);
            return;
        }

        if ( mal6xema.matches?.("p.saxesukef") ) {
            araq = {
                ruva: mal6xema.dataset.oskakefani,
                hasak: ksozuSak,
                hakek: [ mal6xema ],
            };
            hataraq.push(araq);
            ksozuSak = [];
            return;
        }

        if ( araq ) {
            araq.hakek.push(mal6xema);
            if ( ksozuSak.length ) {
                araq.hasak.push(...ksozuSak);
                ksozuSak = [];
            }
        }
    });
}

if ( document.readyState === "loading" ) {
    document.addEventListener("DOMContentLoaded", iibaHate);
} else {
    iibaHate();
}