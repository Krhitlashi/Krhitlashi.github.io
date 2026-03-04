const oskakefani = document.querySelectorAll("[data-oskakefani]");

const ruvaS2karani = new URLSearchParams(window.location.search);
let kxesuGawe = ruvaS2karani.get("lang") || document.documentElement.lang || "aih";
k2regawe(kxesuGawe);

function k2regawe(gawe) {
    kocepufal(gawe)
    document.documentElement.setAttribute("lang", gawe)
    oskakefani.forEach(kek => {
        const kef = kek.dataset.oskakefani;
        kek.textContent = skakefani[gawe][kef] || skakefani["aih"][kef] || kef;
    });
    if ( gawe != "aih" ) {
        document.querySelectorAll("a").forEach(cel2f => {
            if ( !cel2f.href || cel2f.href.startsWith("#") ) return;
            let ruvaOkef = decodeURIComponent(cel2f.href);
            if ( ruvaOkef.includes("ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ֭ſɭᴜ ı],ɹ.html") ) {
                ruvaOkef = ruvaOkef.replace("ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ֭ſɭᴜ ı],ɹ.html", "ſɭᴜ ɭl̀ɹ ɭʃɔ ı],ᴜͷ̗ ꞁȷ̀w/arahashii.html");
            }
            const ruva = new URL(ruvaOkef, window.location.href);
            ruva.searchParams.set("lang", gawe);
            cel2f.href = ruva.toString();
        });
    }
}
function kocepufal(gawe) {
    if ( gawe != "aih" ) {
        document.body.classList.remove("cepufal")
        document.body.classList.add("tapufal")
    }
}

const GAWEK2F_SAK2FE = {
    "ɔ": { en: "0", ar: "٠", fa: "۰", hi: "०", bn: "০", th: "๐", my: "၀", km: "០", lo: "໐" },
    "ı": { en: "1", ar: "١", fa: "۱", hi: "१", bn: "১", th: "๑", my: "၁", km: "១", lo: "໑" },
    "ɿ": { en: "2", ar: "٢", fa: "۲", hi: "२", bn: "২", th: "๒", my: "၂", km: "២", lo: "໒" },
    "ц": { en: "3", ar: "٣", fa: "۳", hi: "३", bn: "৩", th: "๓", my: "၃", km: "៣", lo: "໓" },
    "э": { en: "4", ar: "٤", fa: "۴", hi: "४", bn: "৪", th: "๔", my: "၄", km: "៤", lo: "໔" },
    "ꞟ": { en: "5", ar: "٥", fa: "۵", hi: "५", bn: "৫", th: "๕", my: "၅", km: "៥", lo: "໕" },
    "ɩ": { en: "6", ar: "٦", fa: "۶", hi: "६", bn: "৬", th: "๖", my: "၆", km: "៦", lo: "໖" },
    "ƨ": { en: "7", ar: "٧", fa: "۷", hi: "७", bn: "৭", th: "๗", my: "၇", km: "៧", lo: "໗" }
};
function skakefK2fe(okef) {
    if ( kxesuGawe === "aih" ) return okef;
    if ( !okef ) return "";
    let ts0ni = "";
    for ( let kp6 of okef ) {
        const sak2fe = GAWEK2F_SAK2FE[kp6]?.[kxesuGawe];
        ts0ni += sak2fe !== undefined ? sak2fe : kp6;
    }
    return ts0ni;
}