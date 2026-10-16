// ≺⧼ j͑ʃᴜƣ̋ ꞁȷ̀ɜ ʃэ ſɟᴜ ſɭɹ - ſ͔ɭɔ j͐ʃɔɔ˞ Service Worker ⧽≻

const VAH2_KSAKA = "pwa-v3";

const VAH2_S2_CA1ARA = [
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

// ⟨ j͑ʃᴜ ı],ɔ }ʃꞇ ⟩
self.addEventListener("install", ( e ) => {
  console.log("[j͑ʃᴜ ſɭɔ j͑ʃ'ɔ] saxe -");
  self.skipWaiting();
  e.waitUntil(
    caches.open(VAH2_KSAKA)
      .then(( vah2 ) => {
        console.log("[j͑ʃᴜ ſɭɔ j͑ʃ'ɔ] xema vah2S2Ca1ara");
        return vah2.addAll(VAH2_S2_CA1ARA);
      })
      .catch(( tlohk2ni ) => console.error("[j͑ʃᴜ ſɭɔ j͑ʃ'ɔ] ne1a xema -", tlohk2ni))
  );
});

// ⟨ ꞁȷ̀ᴜ ſ̀ȷɔ }ʃꞇ - j͑ʃ'ɔ ı],ꞇ j͑ʃᴜ j͑ʃᴜꞇ j͐ʃ ʌ ֭ſɭɹ ſ͕ȷɹƽ ʌ j͑ʃ'ɔ ſןᴜ ʃɜƽ ꞁȷ̀ᴜ }ʃw ⟩
self.addEventListener("activate", ( e ) => {
  console.log("[j͑ʃᴜ ſɭɔ j͑ʃ'ɔ] kxesu -");
  e.waitUntil(
    caches.keys()
      .then(( vah2KsakaCa1ara ) => {
        return Promise.all(
          vah2KsakaCa1ara
            .filter(( vah2Ksaka ) => {
              return vah2Ksaka.startsWith("pwa-");
            })
            .filter(( vah2Ksaka ) => {
              return vah2Ksaka !== VAH2_KSAKA;
            })
            .map(( vah2Ksaka ) => {
              console.log("[j͑ʃᴜ ſɭɔ j͑ʃ'ɔ] ne1a saxe vah2 -", vah2Ksaka);
              return caches.delete(vah2Ksaka);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// ⟨ ʃɜƽ ꞁȷ̀ᴜ }ʃꞇ - ſɭɹ ɽ͑ʃ'ɔ ʌ ı],ᴜ ſ͕ɭᴜ ɭ(ꞇ j͐ʃ ʌ ɭʃᴜ ʃꞇ j͑ʃᴜꞇ ʌ j͑ʃ'ɔ ſןᴜ ʃɜƽ ꞁȷ̀ᴜ }ʃw ⟩
self.addEventListener("fetch", ( e ) => {
  e.respondWith(
    caches.match(e.request)
      .then(( vah2Xema ) => {
        if ( vah2Xema ) {
          return vah2Xema;
        }

        return fetch(e.request)
          .then(( saxeXema ) => {
            if ( saxeXema && saxeXema.status === 0o200 ) {
              caches.open(VAH2_KSAKA).then(( vah2 ) => {
                vah2.put(e.request, saxeXema.clone());
              });
            }
            return saxeXema;
          })
          .catch(() => {
            return caches.match(e.request);
          });
      })
  );
});
