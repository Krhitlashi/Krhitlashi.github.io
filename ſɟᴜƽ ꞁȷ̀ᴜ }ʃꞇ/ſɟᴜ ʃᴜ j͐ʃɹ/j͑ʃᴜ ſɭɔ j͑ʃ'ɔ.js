// ≺⧼ ſɟᴜ ſɭɔƽ ꞁȷ̀ɜƴ ꞁȷ̀ᴜꞇ ʌ ŋᷠᴜ ֭ſɭᴜʞ 📃 ⧽≻
// ſɟᴜ ʃᴜ j͐ʃɹ ı],ᴜ ʌ j͑ʃᴜ ſɭɔ j͑ʃ'ɔ ⟅

const VOP2PABOKAI = "satellite-tiles-v1";
const PLOSTEQ_KEKOZAI = 0o2000;

// ⟨ ſ͕ɭw ŋᷠw ʌ ſɭɔƽ ꞁȷ̀ɜƴ ꞁȷ̀ᴜꞇ ( ſɭɔ j͑ʃ'ɔ ʌ ꞁȷ̀ɹ ſ͔ɭɔ j͐ʃɔɔ˞ ſ͕ɭw ŋᷠw ) 📃 ⟩
self.addEventListener("fetch", (k61e) => {
  const k6h6 = new URL(k61e.request.url);

  const kekozaiK61e = k6h6.hostname.includes("tile.openstreetmap.org") ||
    k6h6.pathname.match(/\/\d+\/\d+\/\d+\.(png|jpg|jpeg)/) ||
    k6h6.pathname.includes("MapServer/tile/");

  if (kekozaiK61e) {
    k61e.respondWith(
      caches.open(VOP2PABOKAI)
        .then((vop2pabokai) => {
          return vop2pabokai.match(k61e.request)
            .then((xema10ni) => {
              if (xema10ni) {
                return xema10ni;
              }

              return fetch(k61e.request)
                .then((saxe10ni) => {
                  if (saxe10ni && saxe10ni.status === 200) {
                    plosteqVop2(vop2pabokai).then(() => {
                      vop2pabokai.put(k61e.request, saxe10ni.clone());
                    });
                  }
                  return saxe10ni;
                })
                .catch((tlohk2ni) => {
                  console.log("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) kekozai ʌ ſɭᴜƽ", tlohk2ni);
                  return kekozaiTahaq();
                });
            });
        })
    );
  }
});

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɔƣ̋ ꞁȷ̀ɜ ſןᴜ ʃɜƽ ꞁȷ̀ᴜꞇ j͑ʃ'ɜ ſןɹ ʌ ſןᴜ j͐ʃэ - ֭ſɭɹͷ̗ ʌ ſɭc̗ᴜ ֭ſɭɹ ſ͕ȷɹƽ ʌ ſɭɔƽ ꞁȷ̀ɜƴ ꞁȷ̀ᴜꞇ ( PLOSTEQ_KEKOZAI ) 📃 ⟩
async function plosteqVop2(vop2pabokai) {
  const ca3aqCa1ara = await vop2pabokai.keys();
  if (ca3aqCa1ara.length > PLOSTEQ_KEKOZAI) {
    const ne1aK2fe = Math.floor(PLOSTEQ_KEKOZAI * 0.125);
    for (let i = 0; i < ne1aK2fe; i++) {
      await vop2pabokai.delete(ca3aqCa1ara[i]);
    }
  }
}

// ⟨ ſɭʞɹ ʌ ſɭɔƽ ꞁȷ̀ɜƴ ꞁȷ̀ᴜꞇ ʌ j͑ʃᴜ ֭ſɭᴜ ſȷɔ 📃 ⟩
function kekozaiTahaq() {
  const tahaqGek2f = `
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" fill="#2a2a2a"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#666" font-family="Arial" font-size="14">
        Offline
      </text>
    </svg>
  `;

  return new Response(tahaqGek2f, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store"
    }
  });
}

// ⟨ ſ͕ɭw ŋᷠw ʌ j͐ʃэ ŋᷠᴜ j͑ʃ'ɔ ɭʃᴜ ʌ ſɭэ ſᶘɔ 📃 ⟩
self.addEventListener("message", (k61e) => {
  if (k61e.data.hat === "XEMA_KUBA") {
    const { kubaCa1ara } = k61e.data;
    vop2Kekozai(kubaCa1ara).then((k2fe) => {
      k61e.ports[0]?.postMessage({ k2fe });
    });
  } else if (k61e.data.hat === "NE1A_KUBA") {
    caches.delete(VOP2PABOKAI).then(() => {
      k61e.ports[0]?.postMessage({ ne1a: true });
    });
  } else if (k61e.data.hat === "QUQ_KUBA_PAL6") {
    vop2Pal6().then((pal6) => {
      k61e.ports[0]?.postMessage({ pal6 });
    });
  }
});

// ⟨ j͑ʃ'ɔ ſןᴜ ʃɜƽ ʌ ſɭc̗w ʌ ſɭɔƽ ꞁȷ̀ɜƴ ꞁȷ̀ᴜꞇ 📃 ⟩
async function vop2Kekozai(kekozaiK6h6Ca1ara) {
  const vop2pabokai = await caches.open(VOP2PABOKAI);
  let vek2fe = 0;

  for (const k6h6 of kekozaiK6h6Ca1ara) {
    try {
      const saxe10ni = await fetch(k6h6);
      if (saxe10ni.status === 200) {
        await vop2pabokai.put(k6h6, saxe10ni);
        vek2fe++;
      }
    } catch (tlohk2ni) {
      console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) kekozai ʌ ſɭᴜƽ", k6h6, tlohk2ni);
    }
  }

  return vek2fe;
}

// ⟨ ſ͕ɭw ŋᷠw ʌ ꞁȷ̀ɔ ɽ͑ʃ'ɹ ֭ſɭᴜ j͐ʃ ʌ j͑ʃɔƣ̋ ꞁȷ̀ɜ ſןᴜ ʃɜƽ ꞁȷ̀ᴜꞇ j͑ʃ'ɜ ſןɹ ʌ ſןᴜ j͐ʃэ 📃 ⟩
async function vop2Pal6() {
  const vop2pabokai = await caches.open(VOP2PABOKAI);
  const ca3aqCa1ara = await vop2pabokai.keys();
  return ca3aqCa1ara.length;
}
