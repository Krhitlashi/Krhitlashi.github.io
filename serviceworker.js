var staticCacheName = "pwa";
 
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(["/"]);
    })
  );
});
 
self.addEventListener("fetch", function (event) {
  console.log(event.request.url);
 
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

document.addEventListener("DOMContentLoaded", function() {
  var content = document.querySelector('.content');

  content.scrollTop = content.scrollHeight; // Scroll to the bottom initially

  content.addEventListener('wheel', function(event) {
    if (event.deltaY !== 0) {
      event.preventDefault();
      content.scrollTop -= event.deltaY;
    }
  });
});
