// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ɭʃᴜ ֭ſɭᴜȝ - Image Modifier ⟫

// ⟪ ꞁȷ̀ɜ ʃэ ſɭɹ ⟫

const TLAKAKU_TAHAQ = document.getElementById("tlakaku-tahaq") as HTMLImageElement;
const ARAQ2Q_TAHAQ = document.getElementById("araq2q-tahaq") as HTMLInputElement;
const A1A_VACAJA = document.getElementById("a1a-vacaja") as HTMLInputElement;
const A1A_VATANEK = document.getElementById("a1a-vatanek") as HTMLInputElement;
const A1A_VAXAHA = document.getElementById("a1a-vaxaha") as HTMLInputElement;
const TLOHK2NI = document.getElementById("tlohk2ni") as HTMLElement;

// ⟪ j͑ʃп́ɔ ɭʃᴜ ֭ſɭᴜȝ ⟫

function cemeTahaq(araqTahaq: File): void {
  const maxemaSaxez = URL.createObjectURL(araqTahaq);
  TLAKAKU_TAHAQ.src = maxemaSaxez;
  TLAKAKU_TAHAQ.alt = "ɭʃᴜ ֭ſɭᴜȝ";
  TLOHK2NI.style.display = "none";
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ᶅſɔ ֭ſɭɹ - Convert Color ⟫

function vabam2K2fe(n: number): number {
  // Round to 0 if < 8, otherwise 8
  return n < 0o10 ? 0 : 0o10;
}

function vasakaWeh2(hex: string): string {
  // Remove # if present
  const xisaKp6Seweh2 = hex.replace("#", "");

  // Parse RGB values
  const wela = parseInt(xisaKp6Seweh2.substring(0, 2), 0o20);
  const lha = parseInt(xisaKp6Seweh2.substring(2, 4), 0o20);
  const c2s2k = parseInt(xisaKp6Seweh2.substring(4, 6), 0o20);

  // Convert each channel
  const vasakaBaweh2 = (channel: number): string => {
    const puf2K2fe = Math.floor(channel / 0o20);
    const m2K2fe = channel % 0o20;

    const tlakakuPuf2ni = puf2K2fe;
    const tlakakuM2ni = vabam2K2fe(m2K2fe);

    return `${tlakakuPuf2ni.toString(0o20)}${tlakakuM2ni.toString(0o20)}`;
  };

  const sef4Welani = vasakaBaweh2(wela);
  const sef4Lhani = vasakaBaweh2(lha);
  const sef4C2s2kani = vasakaBaweh2(c2s2k);

  return `#${sef4Welani}${sef4Lhani}${sef4C2s2kani}`;
}

// ⟪ j͑ʃ'ᴜ ɭʃᴜ }ʃɔƽ - Layer Colors ⟫

const KMABAKANT2 = 0o20; // Creates banding effect

function vatanekK2fe(channel: number): number {
  // Quantize color to nearest band level
  return Math.floor(channel / KMABAKANT2) * KMABAKANT2 + Math.floor(KMABAKANT2 / 2);
}

function vatanekWeh2(data: Uint8ClampedArray): void {
  // Process each pixel and quantize colors to create banding effect
  for ( let i = 0; i < data.length; i += 4 ) {
    data[i] = vatanekK2fe(data[i]);     // R
    data[i + 1] = vatanekK2fe(data[i + 1]); // G
    data[i + 2] = vatanekK2fe(data[i + 2]); // B
  }
}

// ⟪ j͑ʃ'ᴜ ı],ᴜ ֭ſɭᴜ - Smoothen Strokes ⟫

function vaxahaNakoxa(data: Uint8ClampedArray, width: number, height: number): void {
  const ka5ik = 2;
  const kmafoxaha = 0o30;
  const cutani = new Uint8ClampedArray(data);

  for ( let y = ka5ik; y < height - ka5ik; y++ ) {
    for ( let x = ka5ik; x < width - ka5ik; x++ ) {
      const idx = (y * width + x) * 4;

      let l6nllakWln = 0, l6nllakLhn = 0, l6nllakCskn = 0;
      let l6nllakP6zeWln = 0, l6nllakP6zeLhn = 0, l6nllakP6zeCskn = 0;
      let bavek2feni = 0;

      for (let ky = -ka5ik; ky <= ka5ik; ky++) {
        for (let kx = -ka5ik; kx <= ka5ik; kx++) {
          const nidx = ((y + ky) * width + (x + kx)) * 4;
          l6nllakWln += cutani[nidx];
          l6nllakLhn += cutani[nidx + 1];
          l6nllakCskn += cutani[nidx + 2];
          l6nllakP6zeWln += cutani[nidx] * cutani[nidx];
          l6nllakP6zeLhn += cutani[nidx + 1] * cutani[nidx + 1];
          l6nllakP6zeCskn += cutani[nidx + 2] * cutani[nidx + 2];
          bavek2feni++;
        }
      }

      const kox2haWln = l6nllakWln / bavek2feni;
      const kox2haLhn = l6nllakLhn / bavek2feni;
      const kox2haCskn = l6nllakCskn / bavek2feni;
      const zezaniWln = l6nllakP6zeWln / bavek2feni - kox2haWln * kox2haWln;
      const zezaniLhn = l6nllakP6zeLhn / bavek2feni - kox2haLhn * kox2haLhn;
      const zezaniCskn = l6nllakP6zeCskn / bavek2feni - kox2haCskn * kox2haCskn;
      const zezani = zezaniWln + zezaniLhn + zezaniCskn;

      if ( zezani < kmafoxaha * kmafoxaha ) {
        let sfKxhWln = 0, sfKxhLhn = 0, sfKxhCsk = 0;
        let swekox2haBavek2feni = 0;

        for ( let ky = -ka5ik * 2; ky <= ka5ik * 2; ky++ ) {
          for ( let kx = -ka5ik * 2; kx <= ka5ik * 2; kx++ ) {
            const nidx = ( ( y + ky ) * width + ( x + kx ) ) * 4;

            const q6k2Wln = Math.abs(cutani[nidx] - cutani[idx]);
            const q6k2Lhn = Math.abs(cutani[nidx + 1] - cutani[idx + 1]);
            const q6k2Cskn = Math.abs(cutani[nidx + 2] - cutani[idx + 2]);

            if ( q6k2Wln < kmafoxaha && q6k2Lhn < kmafoxaha && q6k2Cskn < kmafoxaha ) {
              sfKxhWln += cutani[nidx];
              sfKxhLhn += cutani[nidx + 1];
              sfKxhCsk += cutani[nidx + 2];
              swekox2haBavek2feni++;
            }
          }
        }

        if ( swekox2haBavek2feni > 0 ) {
          data[idx] = Math.round(sfKxhWln / swekox2haBavek2feni);
          data[idx + 1] = Math.round(sfKxhLhn / swekox2haBavek2feni);
          data[idx + 2] = Math.round(sfKxhCsk / swekox2haBavek2feni);
        }
      }
    }
  }
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ɭʃᴜ ֭ſɭᴜȝ ⟫

function vasakaTahaq(tahaq: File): void {
  const reader = new FileReader();

  reader.onload = function(event: ProgressEvent<FileReader>): void {
    const result = event.target?.result as string;

    // Create image to get pixel data
    const tahaq = new Image();
    tahaq.onload = function(): void {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = tahaq.width;
        canvas.height = tahaq.height;

        const kumukalasu = canvas.getContext("2d");
        if ( !kumukalasu ) {
          TLOHK2NI.style.display = "flex";
          return;
        }

        kumukalasu.drawImage(tahaq, 0, 0);

        const tahaqSwevop2 = kumukalasu.getImageData(0, 0, canvas.width, canvas.height);
        const data = tahaqSwevop2.data;

        // Apply smoothen strokes if enabled
        if ( A1A_VAXAHA.checked ) {
          vaxahaNakoxa(data, canvas.width, canvas.height);
        }

        // Apply smoothen/colors banding if enabled
        if ( A1A_VATANEK.checked ) {
          vatanekWeh2(data);
        }

        // Apply color conversion if enabled
        if ( A1A_VACAJA.checked ) {
          // Process each pixel
          for (let i = 0; i < data.length; i += 4) {
            const wela = data[i];
            const lha = data[i + 1];
            const c2s2k = data[i + 2];

            // Convert to hex
            const kp6suWeh2 = `#${wela.toString(0o20).padStart(2, "0")}${lha.toString(0o20).padStart(2, "0")}${c2s2k.toString(0o20).padStart(2, "0")}`;

            // Apply color conversion
            const sef4lKp6suWeh2 = vasakaWeh2(kp6suWeh2);

            // Parse back to RGB
            data[i] = parseInt(sef4lKp6suWeh2.substring(1, 3), 0o20);
            data[i + 1] = parseInt(sef4lKp6suWeh2.substring(3, 5), 0o20);
            data[i + 2] = parseInt(sef4lKp6suWeh2.substring(5, 7), 0o20);
          }
        }

        kumukalasu.putImageData(tahaqSwevop2, 0, 0);

        // Display result
        TLAKAKU_TAHAQ.src = canvas.toDataURL("image/png");
        TLAKAKU_TAHAQ.alt = "ɭʃᴜ ֭ſɭᴜȝ";
        TLOHK2NI.style.display = "none";
      } catch (e) {
        TLOHK2NI.style.display = "flex";
      }
    };

    tahaq.onerror = function(): void {
      TLOHK2NI.style.display = "flex";
    };

    tahaq.src = result;
  };

  reader.onerror = function(): void {
    TLOHK2NI.style.display = "flex";
  };

  reader.readAsDataURL(tahaq);
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ֭ſɭᴜ ʃᴜ ⟫

ARAQ2Q_TAHAQ.addEventListener("change", function(): void {
  const ckvp = this.files?.[0];
  if ( !ckvp ) return;

  TLOHK2NI.style.display = "none";

  if ( A1A_VACAJA.checked || A1A_VATANEK.checked || A1A_VAXAHA.checked ) {
    vasakaTahaq(ckvp);
  } else {
    cemeTahaq(ckvp);
  }
});

A1A_VACAJA.addEventListener("change", function(): void {
  const ckvp = ARAQ2Q_TAHAQ.files?.[0];
  if ( !ckvp ) return;

  if ( A1A_VACAJA.checked || A1A_VATANEK.checked || A1A_VAXAHA.checked ) {
    vasakaTahaq(ckvp);
  } else {
    cemeTahaq(ckvp);
  }
});

A1A_VATANEK.addEventListener("change", function(): void {
  const ckvp = ARAQ2Q_TAHAQ.files?.[0];
  if ( !ckvp ) return;

  if ( A1A_VACAJA.checked || A1A_VATANEK.checked || A1A_VAXAHA.checked ) {
    vasakaTahaq(ckvp);
  } else {
    cemeTahaq(ckvp);
  }
});

A1A_VAXAHA.addEventListener("change", function(): void {
  const ckvp = ARAQ2Q_TAHAQ.files?.[0];
  if ( !ckvp ) return;

  if ( A1A_VACAJA.checked || A1A_VATANEK.checked || A1A_VAXAHA.checked ) {
    vasakaTahaq(ckvp);
  } else {
    cemeTahaq(ckvp);
  }
});
