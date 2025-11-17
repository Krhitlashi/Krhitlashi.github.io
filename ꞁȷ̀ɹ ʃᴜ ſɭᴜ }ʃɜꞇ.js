document.getElementById("iixakanoi").addEventListener("input", function() {
    const bana2bakanoi = this.value.toLowerCase();
    const cax2l = document.getElementById("kef");
    const hap2sabacax2l = cax2l.getElementsByTagName("tr");
    let l6r2ba = false;

    for (let i = 0; i < hap2sabacax2l.length; i++) {
        const habacax2l = hap2sabacax2l[i].getElementsByTagName("td");
        let or2bato = false;

        for (let j = 0; j < habacax2l.length; j++) {
            const bacax2l = habacax2l[j];
            const kp6 = bacax2l.textContent.toLowerCase();

            if (kp6.includes(bana2bakanoi)) {
                or2bato = true;
                break;
            }
        }

        if (or2bato) {
            hap2sabacax2l[i].style.display = "";
            l6r2ba = true;
        } else {
            hap2sabacax2l[i].style.display = "none";
        }
    }
});