// ≺⧼ ſɟᴜ ֭ſɭɹ j͑ʃɔ ʌ ʃᴜ j͐ʃɹ ı],ᴜ ʌ ſɭɔƽ ꞁȷ̀ɜƴ ꞁȷ̀ᴜꞇ ʌ ŋᷠᴜ ֭ſɭᴜʞ - ſɟᴜ ʃᴜ j͐ʃɹ ı],ᴜ ⧽≻

const TILE_CACHE_NAME = "satellite-tiles-v1";
const MAX_TILES = 0o2000;

// ⟨ ſ͕ɭw ŋᷠw ʌ ſɭɔƽ ꞁȷ̀ɜƴ ꞁȷ̀ᴜꞇ ( ſɭɔ j͑ʃ'ɔ ʌ ꞁȷ̀ɹ ſ͔ɭɔ j͐ʃɔɔ˞ ſ͕ɭw ŋᷠw ) ⟩
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  const isTileRequest = url.hostname.includes("tile.openstreetmap.org") ||
    url.pathname.match(/\/\d+\/\d+\/\d+\.(png|jpg|jpeg)/) ||
    url.pathname.includes("MapServer/tile/");

  if (isTileRequest) {
    event.respondWith(
      caches.open(TILE_CACHE_NAME)
        .then((cache) => {
          return cache.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }

              return fetch(event.request)
                .then((networkResponse) => {
                  if (networkResponse && networkResponse.status === 200) {
                    manageCacheSize(cache).then(() => {
                      cache.put(event.request, networkResponse.clone());
                    });
                  }
                  return networkResponse;
                })
                .catch((err) => {
                  console.log("[Service Worker] Tile fetch failed -", err);
                  return createPlaceholderTile();
                });
            });
        })
    );
  }
});

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɔƣ̋ ꞁȷ̀ɜ ſןᴜ ʃɜƽ ꞁȷ̀ᴜꞇ j͑ʃ'ɜ ſןɹ ʌ ſןᴜ j͐ʃэ - ֭ſɭɹͷ̗ ʌ ſɭc̗ᴜ ֭ſɭɹ ſ͕ȷɹƽ ʌ ſɭɔƽ ꞁȷ̀ɜƴ ꞁȷ̀ᴜꞇ ( MAX_TILES ) ⟩
async function manageCacheSize(cache) {
  const keys = await cache.keys();
  if (keys.length > MAX_TILES) {
    const deleteCount = Math.floor(MAX_TILES * 0.125);
    for (let i = 0; i < deleteCount; i++) {
      await cache.delete(keys[i]);
    }
  }
}

// ⟨ ſɭʞɹ ʌ ſɭɔƽ ꞁȷ̀ɜƴ ꞁȷ̀ᴜꞇ ʌ j͑ʃᴜ ֭ſɭᴜ ſȷɔ ⟩
function createPlaceholderTile() {
  const svg = `
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="#2a2a2a"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#666" font-family="Arial" font-size="14">
        Offline
      </text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store"
    }
  });
}

// ⟨ ſ͕ɭw ŋᷠw ʌ j͐ʃэ ŋᷠᴜ j͑ʃ'ɔ ɭʃᴜ ʌ ſɭэ ſᶘɔ ⟩
self.addEventListener("message", (event) => {
  if (event.data.hat === "XEMA_KUBA") {
    const { kubaCa1ara } = event.data;
    cacheTiles(kubaCa1ara).then((k2fe) => {
      event.ports[0]?.postMessage({ k2fe });
    });
  } else if (event.data.hat === "NE1A_KUBA") {
    caches.delete(TILE_CACHE_NAME).then(() => {
      event.ports[0]?.postMessage({ success: true });
    });
  } else if (event.data.hat === "QUQ_KUBA_PAL6") {
    getCacheSize().then((pal6) => {
      event.ports[0]?.postMessage({ pal6 });
    });
  }
});

// ⟨ j͑ʃ'ɔ ſןᴜ ʃɜƽ ʌ ſɭc̗w ʌ ſɭɔƽ ꞁȷ̀ɜƴ ꞁȷ̀ᴜꞇ ⟩
async function cacheTiles(tileUrls) {
  const cache = await caches.open(TILE_CACHE_NAME);
  let count = 0;

  for (const url of tileUrls) {
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        await cache.put(url, response);
        count++;
      }
    } catch (err) {
      console.error("[Service Worker] Failed to cache tile -", url, err);
    }
  }

  return count;
}

// ⟨ ſ͕ɭw ŋᷠw ʌ ꞁȷ̀ɔ ɽ͑ʃ'ɹ ֭ſɭᴜ j͐ʃ ʌ j͑ʃɔƣ̋ ꞁȷ̀ɜ ſןᴜ ʃɜƽ ꞁȷ̀ᴜꞇ j͑ʃ'ɜ ſןɹ ʌ ſןᴜ j͐ʃэ ⟩
async function getCacheSize() {
  const cache = await caches.open(TILE_CACHE_NAME);
  const keys = await cache.keys();
  return keys.length;
}
