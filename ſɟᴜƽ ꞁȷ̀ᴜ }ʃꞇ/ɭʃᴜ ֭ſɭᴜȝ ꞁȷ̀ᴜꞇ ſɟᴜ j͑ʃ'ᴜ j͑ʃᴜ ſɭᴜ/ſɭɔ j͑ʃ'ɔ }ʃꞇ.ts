// ≺⧼ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ɭʃᴜ ֭ſɭᴜȝ - Image Modifier ⧽≻

// ⟪ ꞁȷ̀ɜ ʃэ ſɭɹ ⟫

const TLAKAKU_TAHAQ = document.getElementById("tlakaku-tahaq") as HTMLImageElement;
const ARAQ2Q_TAHAQ = document.getElementById("araq2q-tahaq") as HTMLInputElement;
const A1A_VACAJA = document.getElementById("a1a-vacaja") as HTMLInputElement;
const A1A_VATANEK = document.getElementById("a1a-vatanek") as HTMLInputElement;
const A1A_VAXAHA = document.getElementById("a1a-vaxaha") as HTMLInputElement;
const TLOHK2NI = document.getElementById("tlohk2ni") as HTMLElement;
const QUMK2 = document.getElementById("qumk2") as HTMLButtonElement;

let tlakakuTahaqSweruva: string | null = null;

// ⟪ j͑ʃп́ɔ ɭʃᴜ ֭ſɭᴜȝ ⟫

function cemeTahaq(araqTahaq: File): void {
  const maxemaSaxez = URL.createObjectURL(araqTahaq);
  TLAKAKU_TAHAQ.src = maxemaSaxez;
  TLAKAKU_TAHAQ.alt = "ɭʃᴜ ֭ſɭᴜȝ";
  tlakakuTahaqSweruva = maxemaSaxez;
  TLOHK2NI.style.display = "none";
}

// ⟨ ɭʃɀɜ HEIC - Convert HEIC ⟩

async function TboHEIC(ckvpEHeic: File): Promise<Blob> {
  const heic2anyHac0zani = await import("heic2any");
  const heic2any = heic2anyHac0zani.default as unknown as ( options: { blob: Blob; toType: string } ) => Promise<Blob | Blob[]>;
  const tlakakani = await heic2any({
    blob: ckvpEHeic,
    toType: "image/png"
  });
  return tlakakani as Blob;
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ᶅſɔ ֭ſɭɹ - Convert Color ⟫

function vabam2K2fe(k2fe: number): number {
  return k2fe < 0o10 ? 0 : 0o10;
}

const vasakaPabok = new Map<number, string>();

function vasakaBaweh2(channel: number): string {
  if ( vasakaPabok.has(channel) ) {
    return vasakaPabok.get(channel)!;
  }
  const puf2K2fe = channel >> 4;
  const m2K2fe = channel & 0xF;
  const tlakakuPuf2ni = puf2K2fe;
  const tlakakuM2ni = vabam2K2fe(m2K2fe);
  const tlakanani = `${tlakakuPuf2ni.toString(0o20)}${tlakakuM2ni.toString(0o20)}`;
  vasakaPabok.set(channel, tlakanani);
  return tlakanani;
}

function vasakaWeh2(hex: string): string {
  const xisaKp6Seweh2 = hex.replace("#", "");
  const wela = parseInt(xisaKp6Seweh2.substring(0, 2), 0o20);
  const lha = parseInt(xisaKp6Seweh2.substring(2, 4), 0o20);
  const c2s2k = parseInt(xisaKp6Seweh2.substring(4, 6), 0o20);

  const sef4Welani = vasakaBaweh2(wela);
  const sef4Lhani = vasakaBaweh2(lha);
  const sef4C2s2kani = vasakaBaweh2(c2s2k);

  return `#${sef4Welani}${sef4Lhani}${sef4C2s2kani}`;
}

// ⟪ j͑ʃ'ᴜ ɭʃᴜ }ʃɔƽ - Layer Colors ⟫

const KMABAKANT2 = 0o20;
const VATANEK_CAK2BAKANO = new Uint8Array(0o400);

for ( let i = 0; i < 0o400; i++ ) {
  VATANEK_CAK2BAKANO[i] = Math.floor(i / KMABAKANT2) * KMABAKANT2 + Math.floor(KMABAKANT2 / 2);
}

function vatanekWeh2(vop2: Uint8ClampedArray): void {
  for ( let i = 0; i < vop2.length; i += 4 ) {
    vop2[i] = VATANEK_CAK2BAKANO[vop2[i]];
    vop2[i + 1] = VATANEK_CAK2BAKANO[vop2[i + 1]];
    vop2[i + 2] = VATANEK_CAK2BAKANO[vop2[i + 2]];
  }
}

// ⟪ j͑ʃ'ᴜ ı],ᴜ ֭ſɭᴜ - Smoothen Strokes ⟫

const VAXAHA_PAL6 = 2;
const VAXAHA_PUKA5IK = VAXAHA_PAL6 * 2 + 1;
const VAXAHA_KUBA = 0o30 * 0o30;

function vaxahaNakoxa(vop2: Uint8ClampedArray, width: number, height: number): void {
  const cutani = new Uint8ClampedArray(vop2);

  for ( let y = VAXAHA_PAL6; y < height - VAXAHA_PAL6; y++ ) {
    for ( let x = VAXAHA_PAL6; x < width - VAXAHA_PAL6; x++ ) {
      const ruva = ( y * width + x ) * 4;

      let l6nllakWln = 0, l6nllakLhn = 0, l6nllakCskn = 0;
      let l6nllakP6zeWln = 0, l6nllakP6zeLhn = 0, l6nllakP6zeCskn = 0;

      for ( let ky = -VAXAHA_PAL6; ky <= VAXAHA_PAL6; ky++ ) {
        const offset = ( ( y + ky ) * width + x ) * 4;
        for ( let kx = -VAXAHA_PAL6; kx <= VAXAHA_PAL6; kx++ ) {
          const k2feRuva = offset + kx * 4;
          l6nllakWln += cutani[k2feRuva];
          l6nllakLhn += cutani[k2feRuva + 1];
          l6nllakCskn += cutani[k2feRuva + 2];
          l6nllakP6zeWln += cutani[k2feRuva] * cutani[k2feRuva];
          l6nllakP6zeLhn += cutani[k2feRuva + 1] * cutani[k2feRuva + 1];
          l6nllakP6zeCskn += cutani[k2feRuva + 2] * cutani[k2feRuva + 2];
        }
      }

      const neBavek2feni = 1 / ( VAXAHA_PUKA5IK * VAXAHA_PUKA5IK );
      const kox2haWln = l6nllakWln * neBavek2feni;
      const kox2haLhn = l6nllakLhn * neBavek2feni;
      const kox2haCskn = l6nllakCskn * neBavek2feni;
      const zezaniWln = l6nllakP6zeWln * neBavek2feni - kox2haWln * kox2haWln;
      const zezaniLhn = l6nllakP6zeLhn * neBavek2feni - kox2haLhn * kox2haLhn;
      const zezaniCskn = l6nllakP6zeCskn * neBavek2feni - kox2haCskn * kox2haCskn;
      const zezani = zezaniWln + zezaniLhn + zezaniCskn;

      if ( zezani < VAXAHA_KUBA ) {
        let sfKxhWln = 0, sfKxhLhn = 0, sfKxhCsk = 0;
        let swekox2haBavek2feni = 0;
        const saxesuRuva = ruva;

        for ( let ky = -VAXAHA_PAL6 * 2; ky <= VAXAHA_PAL6 * 2; ky++ ) {
          const tapuniXani = ( ( y + ky ) * width + x ) * 4;
          for ( let kx = -VAXAHA_PAL6 * 2; kx <= VAXAHA_PAL6 * 2; kx++ ) {
            const k2feRuva = tapuniXani + kx * 4;
            const sakaWln = cutani[k2feRuva] - cutani[saxesuRuva];
            const sakaLhn = cutani[k2feRuva + 1] - cutani[saxesuRuva + 1];
            const sakaCskn = cutani[k2feRuva + 2] - cutani[saxesuRuva + 2];

            if ( ( sakaWln * sakaWln ) < VAXAHA_KUBA && ( sakaLhn * sakaLhn ) < VAXAHA_KUBA && ( sakaCskn * sakaCskn ) < VAXAHA_KUBA ) {
              sfKxhWln += cutani[k2feRuva];
              sfKxhLhn += cutani[k2feRuva + 1];
              sfKxhCsk += cutani[k2feRuva + 2];
              swekox2haBavek2feni++;
            }
          }
        }

        if ( swekox2haBavek2feni > 0 ) {
          const inv = 1 / swekox2haBavek2feni;
          vop2[ruva] = ( sfKxhWln * inv + 1 / 2 ) | 0;
          vop2[ruva + 1] = ( sfKxhLhn * inv + 1 / 2 ) | 0;
          vop2[ruva + 2] = ( sfKxhCsk * inv + 1 / 2 ) | 0;
        }
      }
    }
  }
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ɭʃᴜ ֭ſɭᴜȝ ⟫

function vasakaTahaq(tahaq: File): void {
  const mavefal = new FileReader();

  mavefal.onload = function(event: ProgressEvent<FileReader>): void {
    const tla = event.target?.result as string;

    const tahaq = new Image();
    tahaq.onload = function(): void {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = tahaq.width;
        canvas.height = tahaq.height;

        const kumukalasu = canvas.getContext( "2d" );
        if ( !kumukalasu ) {
          TLOHK2NI.style.display = "flex";
          return;
        }

        kumukalasu.drawImage(tahaq, 0, 0);

        const tahaqSwevop2 = kumukalasu.getImageData(0, 0, canvas.width, canvas.height);
        const vop2 = tahaqSwevop2.data;

        if ( A1A_VAXAHA.checked ) {
          vaxahaNakoxa(vop2, canvas.width, canvas.height)
        }

        if ( A1A_VATANEK.checked ) {
          vatanekWeh2(vop2);
        }

        if ( A1A_VACAJA.checked ) {
          for ( let i = 0; i < vop2.length; i += 4 ) {
            const wela = vop2[i];
            const lha = vop2[i + 1];
            const c2s2k = vop2[i + 2];

            const sef4lKp6suWeh2 = vasakaWeh2(
              `#${wela.toString(0o20).padStart(2, "0")}${lha.toString(0o20).padStart(2, "0")}${c2s2k.toString(0o20).padStart(2, "0")}`
            );

            vop2[i] = parseInt(sef4lKp6suWeh2.substring(1, 3), 0o20);
            vop2[i + 1] = parseInt(sef4lKp6suWeh2.substring(3, 5), 0o20);
            vop2[i + 2] = parseInt(sef4lKp6suWeh2.substring(5, 7), 0o20);
          }
        }

        kumukalasu.putImageData(tahaqSwevop2, 0, 0);

        tlakakuTahaqSweruva = canvas.toDataURL("image/png");
        TLAKAKU_TAHAQ.src = tlakakuTahaqSweruva;
        TLAKAKU_TAHAQ.alt = "ɭʃᴜ ֭ſɭᴜȝ";
        TLOHK2NI.style.display = "none";
      } catch ( e ) {
        TLOHK2NI.style.display = "flex";
      }
    };

    tahaq.onerror = function(): void {
      TLOHK2NI.style.display = "flex";
    };

    tahaq.src = tla;
  };

  mavefal.onerror = function(): void {
    TLOHK2NI.style.display = "flex";
  };

  mavefal.readAsDataURL( tahaq );
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ֭ſɭᴜ ʃᴜ ⟫

// ⟨ ſ͕ɭwc̭ ſɭɹ - Download ⟩

function qumk2Tahaq(): void {
  if ( !tlakakuTahaqSweruva ) {
    return;
  }

  const qumk2Kek = document.createElement( "a" );
  qumk2Kek.href = tlakakuTahaqSweruva;
  qumk2Kek.download = "ɭʃᴜ ֭ſɭᴜȝ.png";
  document.body.appendChild( qumk2Kek );
  qumk2Kek.click();
  document.body.removeChild( qumk2Kek );
}

QUMK2.addEventListener( "click", qumk2Tahaq );

ARAQ2Q_TAHAQ.addEventListener( "change", async function(): Promise<void> {
  const ckvp = this.files?.[0];
  if ( !ckvp ) return;

  TLOHK2NI.style.display = "none";

  // Check if file is HEIC and convert to PNG
  if ( ckvp.type === "image/heic" || ckvp.type === "image/heif" || ckvp.name.toLowerCase().endsWith(".heic") || ckvp.name.toLowerCase().endsWith(".heif") ) {
    try {
      const pngBlob = await TboHEIC(ckvp);
      const pngCkvp = new File([pngBlob], ckvp.name.replace(/\.heic$/i, ".png").replace(/\.heif$/i, ".png"), { type: "image/png" });
      
      if ( A1A_VACAJA.checked || A1A_VATANEK.checked || A1A_VAXAHA.checked ) {
        vasakaTahaq(pngCkvp);
      } else {
        cemeTahaq(pngCkvp);
      }
      return;
    } catch ( e ) {
      TLOHK2NI.style.display = "flex";
      return;
    }
  }

  if ( A1A_VACAJA.checked || A1A_VATANEK.checked || A1A_VAXAHA.checked ) {
    vasakaTahaq( ckvp );
  } else {
    cemeTahaq( ckvp );
  }
} );

A1A_VACAJA.addEventListener( "change", function(): void {
  const ckvp = ARAQ2Q_TAHAQ.files?.[0];
  if ( !ckvp ) return;

  if ( A1A_VACAJA.checked || A1A_VATANEK.checked || A1A_VAXAHA.checked ) {
    vasakaTahaq( ckvp );
  } else {
    cemeTahaq( ckvp );
  }
} );

A1A_VATANEK.addEventListener( "change", function(): void {
  const ckvp = ARAQ2Q_TAHAQ.files?.[0];
  if ( !ckvp ) return;

  if ( A1A_VACAJA.checked || A1A_VATANEK.checked || A1A_VAXAHA.checked ) {
    vasakaTahaq( ckvp );
  } else {
    cemeTahaq( ckvp );
  }
} );

A1A_VAXAHA.addEventListener( "change", function(): void {
  const ckvp = ARAQ2Q_TAHAQ.files?.[0];
  if ( !ckvp ) return;

  if ( A1A_VACAJA.checked || A1A_VATANEK.checked || A1A_VAXAHA.checked ) {
    vasakaTahaq( ckvp );
  } else {
    cemeTahaq( ckvp );
  }
} );
