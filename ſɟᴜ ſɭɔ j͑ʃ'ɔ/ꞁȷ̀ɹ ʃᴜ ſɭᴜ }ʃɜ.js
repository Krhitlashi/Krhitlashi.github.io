document.getElementById("2bakano").addEventListener("input", function() {
    const bana2bakano = this.value.toLowerCase();
    const cax2l = document.getElementById("kef");
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
        gelesKek.forEach(item => {
            item.row.style.display = "";
            tbody.appendChild(item.row);
        });
    }
});;