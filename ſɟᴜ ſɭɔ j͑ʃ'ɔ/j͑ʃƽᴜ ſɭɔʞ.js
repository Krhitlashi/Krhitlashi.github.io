const oskakefani = document.querySelectorAll("[data-oskakefani]");

const ruvaS2karani = new URLSearchParams(window.location.search);
let kjesaiGawe = ruvaS2karani.get("lang") || document.documentElement.lang || "aih";
k2regawe(kjesaiGawe);

function k2regawe(gawe) {
    kocepufal(gawe)
    document.documentElement.setAttribute("lang", gawe)
    oskakefani.forEach(kek => {
        const kef = kek.dataset.oskakefani;
        kek.textContent = skakefani[gawe][kef] || skakefani["aih"][kef] || kef;
    });
    if (gawe != "aih") {
        document.querySelectorAll("a").forEach(cel2f => {
            if (!cel2f.href || cel2f.href.startsWith("#")) return;
            let ruvaOkef = decodeURIComponent(cel2f.href);
            if (ruvaOkef.includes("ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ֭ſɭᴜ ı],ɹ.html")) {
                ruvaOkef = ruvaOkef.replace("ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ֭ſɭᴜ ı],ɹ.html", "ſɭᴜ ɭl̀ɹ ɭʃɔ ı],ᴜͷ̗ ꞁȷ̀w/arahashii.html");
            }
            const ruva = new URL(ruvaOkef, window.location.href);
            ruva.searchParams.set("lang", gawe);
            cel2f.href = ruva.toString();
        });
    }
}
function kocepufal(gawe) {
    if (gawe != "aih") {
        document.body.classList.remove("cepufal")
        document.body.classList.add("tapufal")
    }
}
