const oskakefani = document.querySelectorAll("[data-oskakefani]");

const ruvaS2karani = new URLSearchParams(window.location.search);
let kjesaiGawe = ruvaS2karani.get("lang") || document.documentElement.lang || "aih";
k2regawe(kjesaiGawe);

function k2regawe(gawe) {
    kocepaifal(gawe)
    document.documentElement.setAttribute("lang", gawe)
    oskakefani.forEach(kek => {
        const kef = kek.dataset.oskakefani;
        kek.textContent = skakefani[gawe][kef] || skakefani["aih"][kef] || kef;
    });
    if (gawe != "aih") {
        document.querySelectorAll("a").forEach(cel2f => {
            if (!cel2f.href || cel2f.href.startsWith("#")) return;
            const ruva = new URL(cel2f.href, window.location.href);
            ruva.searchParams.set("lang", gawe);
            cel2f.href = ruva.toString();
        });
    }
}
function kocepaifal(gawe) {
    if (gawe != "aih") {
        document.body.classList.remove("cepaifal")
        document.body.classList.add("tapaifal")
    }
}
