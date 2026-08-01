// ≺⧼ j͑ʃᴜƣ̋ ꞁȷ̀ɜ ʃэ ſɟᴜ ſɭɹ - Ĉefa Servo-Laboranto ⧽≻

const STATIKA_KAŜO_NOMO = "pwa-v3";

const STATIKAJ_AKTIVAĴOJ = [
  "/",
  "/֭ſɭᴜ ı],ɔ.css",
  "/ſɟᴜ ſɭɔ j͑ʃ'ɔ/ſɭɔ j͑ʃ'ɔ }ʃꞇ.js",
  "/ſɟᴜ ſɭɔ j͑ʃ'ɔ/ſɟᴜ ı],ɹͷ̗.js",
  "/ſɟᴜ ſɭɔ j͑ʃ'ɔ/j͑ʃƽᴜ ſɭɔʞ.js",
  "/ſɟᴜ ſɭɔ j͑ʃ'ɔ/ſɟᴜ j͑ʃᴜƣ̋ ꞁȷ̀ɜ ʃэ ſɟᴜ ſɭɹ.js",
  "/index.html",
  "/ſ͔ɭᴜ ᶅſɔ.html",
  "/ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ֭ſɭᴜ ı],ɹ.html",
  "/ꞁȷ̀ꞇ }ʃᴜƽ.html"
];

// ⟨ Instalo ⟩
self.addEventListener("install", ( evento ) => {
  console.log("[Servo-Laboranto] Instalante -");
  self.skipWaiting();
  evento.waitUntil(
    caches.open(STATIKA_KAŜO_NOMO)
      .then(( kaŝo ) => {
        console.log("[Servo-Laboranto] Kaŝante statikajn aktivaĵojn");
        return kaŝo.addAll(STATIKAJ_AKTIVAĴOJ);
      })
      .catch(( eraro ) => console.error("[Servo-Laboranto] Instalado malsukcesis -", eraro))
  );
});

// ⟨ Aktivigo - Purigi malnovajn kaŝojn ⟩
self.addEventListener("activate", ( evento ) => {
  console.log("[Servo-Laboranto] Aktivigante -");
  evento.waitUntil(
    caches.keys()
      .then(( kaŝajNomoj ) => {
        return Promise.all(
          kaŝajNomoj
            .filter(( kaŝaNomo ) => {
              return kaŝaNomo.startsWith("pwa-");
            })
            .filter(( kaŝaNomo ) => {
              return kaŝaNomo !== STATIKA_KAŜO_NOMO;
            })
            .map(( kaŝaNomo ) => {
              console.log("[Servo-Laboranto] Forigante malnovan kaŝon -", kaŝaNomo);
              return caches.delete(kaŝaNomo);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// ⟨ Prendo - Kaŝo-unue por statikaj aktivaĵoj ⟩
self.addEventListener("fetch", ( evento ) => {
  evento.respondWith(
    caches.match(evento.request)
      .then(( kaŝitaRespondo ) => {
        if ( kaŝitaRespondo ) {
          return kaŝitaRespondo;
        }

        return fetch(evento.request)
          .then(( retaRespondo ) => {
            if ( retaRespondo && retaRespondo.status === 0o200 ) {
              caches.open(STATIKA_KAŜO_NOMO).then(( kaŝo ) => {
                kaŝo.put(evento.request, retaRespondo.clone());
              });
            }
            return retaRespondo;
          })
          .catch(() => {
            return caches.match(evento.request);
          });
      })
  );
});
