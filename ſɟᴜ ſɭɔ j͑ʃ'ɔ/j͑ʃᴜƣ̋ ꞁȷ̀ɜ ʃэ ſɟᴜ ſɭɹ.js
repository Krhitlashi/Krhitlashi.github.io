// ≺⧼ ŋᷠᴜ ֭ſɭᴜʞ 📃 ⧽≻
// j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ ſןᴜ ʃɜƽ ꞁȷ̀ᴜꞇ ⟅

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
  "/ſ͕ɭᴜ ֭ſɭᴜ ı],ɹ.html",
  "/ſᶘɔ j͐ʃw.html"
];

// ⟨ j͑ʃᴜ ı],ɔ }ʃꞇ 📃 ⟩
self.addEventListener("install", ( cal ) => {
  console.log("[j͑ʃᴜ ſɭɔ j͑ʃ'ɔ] saxe -");
  self.skipWaiting();
  cal.waitUntil(
    caches.open(VAH2_KSAKA)
      .then(( vah2 ) => {
        console.log("[j͑ʃᴜ ſɭɔ j͑ʃ'ɔ] xema vah2S2Ca1ara");
        return vah2.addAll(VAH2_S2_CA1ARA);
      })
      .catch(( tlohk2ni ) => {
        console.error("[j͑ʃᴜ ſɭɔ j͑ʃ'ɔ] ne1a xema -", tlohk2ni);
        throw tlohk2ni;
      })
  );
});

// ⟨ ꞁȷ̀ᴜ ſ̀ȷɔ }ʃꞇ - j͑ʃ'ɔ ı],ꞇ j͑ʃᴜ j͑ʃᴜꞇ j͐ʃ ʌ ֭ſɭɹ ſ͕ȷɹƽ ʌ j͑ʃ'ɔ ſןᴜ ʃɜƽ ꞁȷ̀ᴜ }ʃw 📃 ⟩
self.addEventListener("activate", ( cal ) => {
  console.log("[j͑ʃᴜ ſɭɔ j͑ʃ'ɔ] kxesu -");
  cal.waitUntil(
    caches.keys()
      .then(( vah2KsakaCa1ara ) => {
        return Promise.all(
          vah2KsakaCa1ara
            .filter(( vah2Ksaka ) => vah2Ksaka.startsWith("pwa-") && vah2Ksaka !== VAH2_KSAKA)
            .map(( vah2Ksaka ) => {
              console.log("[j͑ʃᴜ ſɭɔ j͑ʃ'ɔ] ne1a saxe vah2 -", vah2Ksaka);
              return caches.delete(vah2Ksaka);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// ⟨ ʃɜƽ ꞁȷ̀ᴜ }ʃꞇ - ſɭɹ ɽ͑ʃ'ɔ ʌ ı],ᴜ ſ͕ɭᴜ ɭ(ꞇ j͐ʃ ʌ ɭʃᴜ ʃꞇ j͑ʃᴜꞇ ʌ j͑ʃ'ɔ ſןᴜ ʃɜƽ ꞁȷ̀ᴜ }ʃw 📃 ⟩
self.addEventListener("fetch", ( cal ) => {
  cal.respondWith(
    caches.match(cal.request)
      .then(( vah2Xema ) => {
        if ( vah2Xema ) {
          return vah2Xema;
        }

        return fetch(cal.request)
          .then(( saxeXema ) => {
            if ( cal.request.method === "GET" && saxeXema && saxeXema.status === 0o310 ) {
              return caches.open(VAH2_KSAKA)
                .then(( vah2 ) => vah2.put(cal.request, saxeXema.clone()))
                .then(() => saxeXema);
            }
            return saxeXema;
          })
          .catch(() => {
            return caches.match(cal.request);
          });
      })
  );
});
