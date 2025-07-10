var staticCacheName = "pwa-v1";
var assetsToCache = [
  "/",
  "/֭ſɭᴜ ı],ɔ.css",
  "/ſɭɔ j͑ʃ'ɔ }ʃꞇ.js",
  "/index.html",
  "/ſ͔ɭᴜ ᶅſɔ.html",
  "/ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ֭ſɭᴜ ı],ɹ.html",
  "/ꞁȷ̀ꞇ }ʃᴜƽ.html"
];

self.addEventListener("install", function (e) {
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
  var cacheWhitelist = [staticCacheName];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

document.addEventListener("DOMContentLoaded", function() {
  var content = document.querySelector('.content');

  content.scrollTop = content.scrollHeight;

  content.addEventListener('wheel', function(event) {
    if (event.deltaY !== 0) {
      event.preventDefault();
      content.scrollTop -= event.deltaY;
    }
  });
});
