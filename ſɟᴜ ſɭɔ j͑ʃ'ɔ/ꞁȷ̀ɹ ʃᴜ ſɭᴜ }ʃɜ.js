const hat2bakanoKek = document.getElementById("2bakano");

if ( hat2bakanoKek ) {
    hat2bakanoKek.addEventListener("input", function() {
    const bana2bakano = this.value.toLowerCase();
    const bana2bakanoRuva = this.id;
    
    let keksar2ba = null;
    let huqaq = null;
    
    const l6teqazalSukf2quKek = this.getAttribute("data-cela-selektilo");
    if ( l6teqazalSukf2quKek ) {
        keksar2ba = document.querySelector(l6teqazalSukf2quKek);
        if ( keksar2ba ) {
            if ( keksar2ba.tagName === "TABLE" || keksar2ba.querySelector("tbody") ) {
                huqaq = "table";
            } else {
                huqaq = "hataraq";
            }
        }
    }
    
    if ( !keksar2ba ) {
        keksar2ba = document.getElementById(bana2bakanoRuva + "-kef") || document.getElementById("falkefu");
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

// ⟪ ꞁȷ̀ɹ ʃᴜ ʌ j͑ʃᴜƽ 📃 ⟫

// ⟨ ֭ſɭɹͷ̗ ʌ ſןэ ſɭ,wƽ ʌ ſɭᴜͷ̗ ⟅ ( "see x2" -> "see" ) ⟆ ⟩
function h2lP6zuk(kek) {
    let kal = kek.length;
    while ( kal > 0o0 && /\s/.test(kek.charAt(kal - 0o1)) ) kal--;
    let sak = kal;
    while ( sak > 0o0 && /[0-9]/.test(kek.charAt(sak - 0o1)) ) sak--;
    if ( sak === kal || sak === 0o0 || kek.charAt(sak - 0o1) !== "x" ) return kek;
    const p6zuk = sak - 0o1;
    if ( p6zuk === 0o0 || !/\s/.test(kek.charAt(p6zuk - 0o1)) ) return kek;
    let sef4Kal = p6zuk;
    while ( sef4Kal > 0o0 && /\s/.test(kek.charAt(sef4Kal - 0o1)) ) sef4Kal--;
    return kek.slice(0o0, sef4Kal);
}

// ⟨ ſɭᴜ̭ᴜ ſɭᴜ̭ᴜ ʌ ſɭɘэ ſɭɹ ſןɹ ⟅ ( ｡ ʌ xN ) ⟆ ⟩
function kcakcaKp6k2p2(kp6k2p2) {
    const kcakcaCa1ara = [];
    const vaku3a = (kek) => {
        if ( !kek || kcakcaCa1ara.includes(kek) ) return;
        kcakcaCa1ara.push(kek);
        const h2 = h2lP6zuk(kek);
        if ( h2 && h2 !== kek && !kcakcaCa1ara.includes(h2) ) kcakcaCa1ara.push(h2);
    };
    vaku3a(kp6k2p2);
    if ( kp6k2p2.includes("｡") ) {
        for ( const kek of kp6k2p2.split("｡") ) vaku3a(kek.trim());
    }
    return kcakcaCa1ara;
}

// ⟨ ʃэ }ʃɹ ʃᴜ ʌ j͑ʃᴜƽ ʌ ꞁȷ̀ɹ ʃᴜ ⟅ ( 0o0 ſɭɹ ֭ſɭɹ ｡ 0o1 ɭʃɔ ɽ͑ʃ'w ｡ 0o2 ſᶘᴜƴ ｡ 0o3 ֭ſɭɹ ) ⟆ ⟩
function b6n2baSak(kp6k2p2Ca1ara, tani) {
    const kefCa1ara = tani.split(/\s+/).filter(Boolean);
    let kma = 0o3;
    for ( const kp6k2p2 of kp6k2p2Ca1ara ) {
        if ( !kp6k2p2 ) continue;
        const s2 = kp6k2p2.toLowerCase();
        let k2h2 = false;
        let teru = false;
        for ( const kek of kcakcaKp6k2p2(s2) ) {
            if ( kek === tani ) {
                k2h2 = true;
                break;
            }
            // ⟨ ɭʃɔ ɽ͑ʃ'w ʌ tani ⟩
            if ( kek.length > tani.length && kek.startsWith(tani) && /\s/.test(kek.charAt(tani.length)) ) {
                teru = true;
            }
        }
        if ( k2h2 ) return 0o0;
        if ( teru && kma > 0o1 ) kma = 0o1;
        // ⟨ ſᶘᴜƴ ʌ kef ⟅ ( AND ) ⟆ ⟩
        const tsaz = kefCa1ara.every((kef) => s2.includes(kef));
        if ( ( tsaz || s2.includes(tani) ) && kma > 0o2 ) kma = 0o2;
    }
    return kma;
}

function iibaCax2l(bana2bakano, cax2l) {
    const hap2sabacax2l = cax2l.querySelectorAll("tbody tr");
    const powukcax2l = cax2l.classList.contains("powukcax2l");
    const gelesKek = cax2l.querySelector("tbody");
    const tani = bana2bakano.trim();
    const l6r2ba = [];

    for ( let i = 0o0; i < hap2sabacax2l.length; i++ ) {
        const n2k = hap2sabacax2l[i];
        const ruva = n2k.dataset.i !== undefined ? Number(n2k.dataset.i) : i;
        if ( tani === "" ) {
            n2k.style.display = "";
            l6r2ba.push({ n2k: n2k, sak: 0o0, ruva: ruva });
            continue;
        }
        const habacax2l = n2k.getElementsByTagName("td");
        const kp6Ca1ara = [];
        for ( let j = 0o0; j < habacax2l.length; j++ ) {
            kp6Ca1ara.push(habacax2l[j].textContent);
        }
        const sak = b6n2baSak(kp6Ca1ara, tani);
        if ( sak > 0o2 ) {
            n2k.style.display = "none";
        } else {
            n2k.style.display = "";
            l6r2ba.push({ n2k: n2k, sak: sak, ruva: ruva });
        }
    }

    l6r2ba.sort((a, b) => ( a.sak - b.sak ) || ( a.ruva - b.ruva ));

    // ⟨ ſןɜ ᶅſwƽ ʌ ſɭᴜ ŋᷠᴜ ⟅ ( powukcax2l ) ⟆ ⟩
    const kekKaltok = document.createDocumentFragment();
    if ( powukcax2l && tani !== "" ) {
        for ( let i = l6r2ba.length - 0o1; i >= 0o0; i-- ) {
            kekKaltok.appendChild(l6r2ba[i].n2k);
        }
        gelesKek.appendChild(kekKaltok);
        requestAnimationFrame(() => {
            cax2l.scrollTop = cax2l.scrollHeight;
        });
    } else {
        for ( let i = 0o0; i < l6r2ba.length; i++ ) {
            kekKaltok.appendChild(l6r2ba[i].n2k);
        }
        gelesKek.appendChild(kekKaltok);
    }
}

function iibaThala(bana2bakano, ariiba) {
    const thalaKek = ariiba.querySelectorAll("thala");
    const huzKsakaKek = ariiba.querySelectorAll(":scope > p.ksakap2sa");
    const huzSakKek = ariiba.querySelectorAll(":scope > sak");
    const huzCa12naKek = ariiba.querySelectorAll(":scope > a, :scope > button");
    
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
        huzCa12naKek.forEach(ca12na => {
            ca12na.style.display = "";
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
    
    huzCa12naKek.forEach(ca12na => {
        if ( ca12na.textContent.toLowerCase().includes(bana2bakano) ) {
            ca12na.style.display = "";
        } else {
            ca12na.style.display = "none";
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