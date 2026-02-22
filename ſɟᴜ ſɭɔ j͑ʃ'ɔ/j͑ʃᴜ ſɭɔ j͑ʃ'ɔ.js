var staticCacheName = "pwa-v2";
var assetsToCache = [
  "/",
  "/֭ſɭᴜ ı],ɔ.css",
  "/ſɟᴜ ſɭɔ j͑ʃ'ɔ/ſɭɔ j͑ʃ'ɔ }ʃꞇ.js",
  "/index.html",
  "/ſ͔ɭᴜ ᶅſɔ.html",
  "/ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ֭ſɭᴜ ı],ɹ.html",
  "/ꞁȷ̀ꞇ }ʃᴜƽ.html"
];

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request).then(function (response) {
        return caches.open(staticCacheName).then(function (cache) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).then(function () {
      return caches.open(staticCacheName).then(function (cache) {
        return cache.addAll(assetsToCache);
      });
    })
  );
  return self.clients.claim();
});
