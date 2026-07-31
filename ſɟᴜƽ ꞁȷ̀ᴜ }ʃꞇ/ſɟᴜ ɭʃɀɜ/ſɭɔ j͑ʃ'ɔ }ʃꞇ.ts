import { FFmpeg, FFFSType } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const TEKSTO = {
  CHOOSE_FILE: "ı],ᴜ ſ͕ɭᴜ ɭ(ꞇ ʌ j͑ʃw ſɭʞɹȝ ʌ ſɟᴜ j͑ʃ'ɜ ſןɹ ⟅",
  CHOOSE_FORMAT: "ı],ᴜ ſ͕ɭᴜ ɭ(ꞇ ʌ j͑ʃw ſɭʞɹȝ ʌ ſɭɔ ֭ſɭɔ }ʃꞇ ⟅",
  READY: "ꞁȷ̀ᴜ ŋᷠᴜͷ̗ ꞁȷ̀ᴜꞇ ʌ ꞁȷ̀ɜ ɭʃɀɜ ⟅",
  CONVERTING: (nomo: string) => `ſɭᶗ‹ɔ ʌ ɭʃɀɜ ⸙ ${nomo} ⸙ ⟅`,
  LOADING_ENGINE: "ſɭᶗ‹ɔ ʌ ʃэ ɭʃɔ ŋᷠɹ ʌ ſɟᴜ ɭʃɀɜ ⟅",
  LOADING_FONT_ENGINE: "ſɭᶗ‹ɔ ʌ ʃэ ɭʃɔ ŋᷠɹ ʌ ſɟᴜ ɭʃɀɜ ʌ ɭʃᴜ j͐ʃᴜ ſ͔ɭᴜ ⟅",
  CONVERTING_FONT: "ſɭᶗ‹ɔ ʌ ɭʃɀɜ ʌ j͐ʃᴜ ſ͔ɭᴜ ⟅",
  ENCODING: (mesaĝo: string) => `j͑ʃ'ᴜ ɽ͑ʃ'w ɭʃᴜ ${mesaĝo} ⟅`,
  DONE: (formato: string) => `ſ̀ȷᴜ ſɭᴜƽ ⟅ ${formato} ⟅`,
  FAILED: "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )",
  ERROR: (eraro: string) => `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ⸙ ${eraro} ⸙ ⟅`,
  DOWNLOAD_DEFAULT: "ſ͕ɭwc̭ ſɭɹ ⟅",
  DOWNLOAD: (nomo: string) => `ſ͕ɭwc̭ ſɭɹ ⸙ ${nomo} ⸙ ⟅`,
  COMPRESSING: (paŝo: number, tuta: number) => `ſɭᶗ‹ɔ ʌ j͑ʃ'ᴜ ŋᷠɹ ⸙ ${paŝo}/${tuta} ⸙ ⟅`,
  DETECTING_DURATION: "ſɭᶗ‹ɔ ʌ ſ͕ɭwȝ ʌ j͑ʃᴜ ſןɔ˞ɔ ſᶘꞇ ⟅",
} as const;

const FONTA_CDN = "https://esm.sh/fontverter";
const FFMPEG_CDN = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm";

const FORMATAJ_ETIKEDOJ: Record<string, string> = {
  mp3: "MP3 ( audio )",
  wav: "WAV ( audio )",
  m4a: "M4A ( audio )",
  ogg: "OGG ( audio )",
  aac: "AAC ( audio )",
  flac: "FLAC ( audio )",
  mp4: "MP4 ( video )",
  webm: "WebM ( video )",
  gif: "GIF ( video )",
  png: "PNG ( image )",
  jpeg: "JPEG ( image )",
  webp: "WebP ( image )",
  bmp: "BMP ( image )",
  ico: "ICO ( image )",
  tiff: "TIFF ( image )",
  ttf: "TTF ( tiparo )",
  otf: "OTF ( tiparo )",
  woff: "WOFF ( tiparo )",
  woff2: "WOFF2 ( tiparo )",
};

const FORMATAJ_OPCIOJ: Record<"audio" | "video" | "image" | "font", string[]> = {
  audio: ["mp3", "wav", "m4a", "ogg", "aac", "flac"],
  video: ["mp4", "webm", "gif"],
  image: ["png", "jpeg", "webp", "gif", "bmp", "ico", "tiff"],
  font: ["ttf", "otf", "woff", "woff2"],
};

const MIME_TIPOJ: Record<string, string> = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  m4a: "audio/mp4",
  ogg: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  mp4: "video/mp4",
  webm: "video/webm",
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  bmp: "image/bmp",
  ico: "image/x-icon",
  tiff: "image/tiff",
  ttf: "font/ttf",
  otf: "font/otf",
  woff: "font/woff",
  woff2: "font/woff2",
};

const DOSIERA_ENIGO = document.getElementById("konvertilo-dosiera-enigo") as HTMLInputElement;
const CELUJO = document.getElementById("konvertilo-celaj-formatoj") as HTMLElement;
const RULI_BUTONO = document.getElementById("konvertilo-ruli") as HTMLButtonElement;
const STATO_TEKSTO = document.getElementById("konvertilo-stato") as HTMLParagraphElement;
const REZULTA_PANELO = document.getElementById("konvertilo-rezulto") as HTMLElement;
const AUDIA_ANTASENO = document.getElementById("konvertilo-antaseno-audio") as HTMLAudioElement;
const VIDA_ANTASENO = document.getElementById("konvertilo-antaseno-video") as HTMLVideoElement;
const BILDA_ANTASENO = document.getElementById("konvertilo-antaseno-bildo") as HTMLImageElement;
const TIPARA_ANTASENO = document.getElementById("konvertilo-antaseno-tiparo") as HTMLParagraphElement;
const ELŜUTA_LIGILO = document.getElementById("konvertilo-elŝuto") as HTMLAnchorElement;

const ffmpeg = new FFmpeg();
let ffmpegPret = false;
let lastaDaŭroSekundoj = 0;

const KOMPRESA_BASKULO = document.getElementById("konvertilo-kompreso-baskulo") as HTMLInputElement;
const KOMPRESA_BASKULA_ETIKEDO = document.getElementById("konvertilo-kompreso-baskula-etikedo") as HTMLLabelElement;
const KOMPRESAJ_OPCIOJ = document.getElementById("konvertilo-kompresaj-opcioj") as HTMLElement;
const CELA_GRANDA_ENIGO = document.getElementById("konvertilo-cela-grando") as HTMLInputElement;
const GRANDA_UNUO_UJO = document.getElementById("konvertilo-granda-unuo") as HTMLElement;

function agordiStaton( mesaĝo: string ): void {
  STATO_TEKSTO.textContent = mesaĝo;
}

function montriAntasenon( elemento: HTMLMediaElement | HTMLImageElement, blobURL: string ): void {
  elemento.src = blobURL;
  elemento.style.display = "";
  if ("load" in elemento && typeof elemento.load === "function") {
    elemento.load();
  }
}

function prezentiRezulton( blobURL: string, eliraNomo: string, celaFormato: string ): void {
  ELŜUTA_LIGILO.href = blobURL;
  ELŜUTA_LIGILO.download = eliraNomo;
  ELŜUTA_LIGILO.textContent = TEKSTO.DOWNLOAD(eliraNomo);
  REZULTA_PANELO.style.display = "";
  agordiStaton(TEKSTO.DONE(celaFormato.toUpperCase()));
}

function detektiDosierKategorion( dosiero: File ): "audio" | "video" | "image" | "font" {
  const tipo = dosiero.type.toLowerCase();
  if ( tipo.startsWith("video/") ) return "video";
  if ( tipo.startsWith("audio/") ) return "audio";
  if ( tipo.startsWith("image/") ) return "image";
  if ( tipo.startsWith("font/") || tipo.includes("font") ) return "font";

  const pliMalgrandaNomo = dosiero.name.toLowerCase();
  if ( /\.(mov|mp4|m4v|webm|avi|mkv|ogv)$/i.test(pliMalgrandaNomo) ) return "video";
  if ( /\.(mp3|wav|m4a|ogg|aac|flac|wma)$/i.test(pliMalgrandaNomo) ) return "audio";
  if ( /\.(png|jpg|jpeg|webp|gif|bmp|ico|tiff)$/i.test(pliMalgrandaNomo) ) return "image";
  if ( /\.(ttf|otf|woff|woff2)$/i.test(pliMalgrandaNomo) ) return "font";

  return "audio";
}

function ĝisdatigiCelajnFormatojn( kategorio: "audio" | "video" | "image" | "font" ): void {
  CELUJO.innerHTML = "";
  const opcioj = FORMATAJ_OPCIOJ[kategorio];
  opcioj.forEach((formato, indekso) => {
    const etikedaElemento = document.createElement("label");
    
    const enigaElemento = document.createElement("input");
    enigaElemento.type = "radio";
    enigaElemento.name = "cela-formato";
    enigaElemento.value = formato;
    if ( indekso === 0 ) {
      enigaElemento.checked = true;
    }

    const pElemento = document.createElement("p");
    pElemento.className = "cepufalxez";
    pElemento.textContent = FORMATAJ_ETIKEDOJ[formato];

    etikedaElemento.appendChild(pElemento);
    etikedaElemento.appendChild(enigaElemento);
    CELUJO.appendChild(etikedaElemento);
  });
}

function akiriElektitanCelFormaton(): string {
  const elektitaRadio = CELUJO.querySelector("input[name='cela-formato']:checked") as HTMLInputElement | null;
  return elektitaRadio ? elektitaRadio.value : "";
}

function akiriEliraMIME( celaFormato: string ): string {
  return MIME_TIPOJ[celaFormato] ?? "application/octet-stream";
}

function akiriElektitanGrandanUnuon(): string {
  const elektitaRadio = GRANDA_UNUO_UJO.querySelector("input[name='granda-unuo']:checked") as HTMLInputElement | null;
  return elektitaRadio ? elektitaRadio.value : "mb";
}

function akiriCelajnBajtojn(): number {
  const valoro = parseFloat(CELA_GRANDA_ENIGO.value) || 0o10;
  const unuo = akiriElektitanGrandanUnuon();
  if ( unuo === "gb" ) {
    return valoro * 1024 * 1024 * 1024;
  }
  return valoro * 1024 * 1024;
}

function ĉuKompresoŜaltita(): boolean {
  return KOMPRESA_BASKULO.checked;
}

function akiriKonvertajnArgumentojn( enigaNomo: string, eliraNomo: string, kategorio: "audio" | "video" | "image" | "font", celaFormato: string ): string[] {
  if ( kategorio === "image" ) {
    if ( celaFormato === "ico" ) {
      return ["-y", "-i", enigaNomo, "-s", "256x256", eliraNomo];
    }
    return ["-y", "-i", enigaNomo, eliraNomo];
  }

  if ( kategorio === "audio" ) {
    if ( celaFormato === "wav" ) {
      return ["-y", "-i", enigaNomo, "-vn", "-c:a", "pcm_s16le", "-ar", "44100", eliraNomo];
    }
    if ( celaFormato === "m4a" || celaFormato === "aac" ) {
      return ["-y", "-i", enigaNomo, "-vn", "-c:a", "aac", "-b:a", "192k", eliraNomo];
    }
    if ( celaFormato === "ogg" ) {
      return ["-y", "-i", enigaNomo, "-vn", "-c:a", "libvorbis", "-q:a", "4", eliraNomo];
    }
    if ( celaFormato === "flac" ) {
      return ["-y", "-i", enigaNomo, "-vn", "-c:a", "flac", eliraNomo];
    }
    return ["-y", "-i", enigaNomo, "-vn", "-c:a", "libmp3lame", "-q:a", "2", eliraNomo];
  }

  // Video
  if ( celaFormato === "webm" ) {
    return ["-y", "-i", enigaNomo, "-c:v", "libvpx-vp9", "-c:a", "libopus", eliraNomo];
  }
  if ( celaFormato === "gif" ) {
    return ["-y", "-i", enigaNomo, "-vf", "fps=15,scale=320:-1:flags=lanczos", "-c:v", "gif", eliraNomo];
  }
  return ["-y", "-i", enigaNomo, "-c:v", "libx264", "-preset", "ultrafast", "-vf", "scale=if(gt(iw\\,1280)\\,1280\\,iw):-2", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", eliraNomo];
}

async function certigiFFmpegŜarĝo(): Promise<void> {
  if ( ffmpegPret ) return;
  agordiStaton(TEKSTO.LOADING_ENGINE);
  await ffmpeg.load({
    coreURL: await toBlobURL(`${FFMPEG_CDN}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${FFMPEG_CDN}/ffmpeg-core.wasm`, "application/wasm"),
  });

  ffmpeg.on("log", ({ message }: { message: string }) => {
    console.log(message);
    const daŭraKongruo = message.match(/Duration:\s*(\d+):(\d+):(\d+\.?\d*)/);
    if ( daŭraKongruo ) {
      const horoj = parseInt(daŭraKongruo[1]);
      const minutoj = parseInt(daŭraKongruo[2]);
      const sekundoj = parseFloat(daŭraKongruo[3]);
      lastaDaŭroSekundoj = horoj * 3600 + minutoj * 64 + sekundoj;
    }
    if ( message.includes("time=") ) {
      agordiStaton(TEKSTO.ENCODING(message.trim()));
    }
  });

  ffmpeg.on("progress", ({ progress }: { progress: number }) => {
    if ( progress > 0 && progress < 1 ) {
      agordiStaton(TEKSTO.ENCODING(`${Math.round(progress * 0o100)}`));
    }
  });

  ffmpegPret = true;
}

function restarigiAntasenon(): void {
  AUDIA_ANTASENO.pause();
  VIDA_ANTASENO.pause();
  AUDIA_ANTASENO.removeAttribute("src");
  VIDA_ANTASENO.removeAttribute("src");
  BILDA_ANTASENO.removeAttribute("src");
  AUDIA_ANTASENO.style.display = "none";
  VIDA_ANTASENO.style.display = "none";
  BILDA_ANTASENO.style.display = "none";
  TIPARA_ANTASENO.style.display = "none";
  REZULTA_PANELO.style.display = "none";
  ELŜUTA_LIGILO.removeAttribute("href");
  ELŜUTA_LIGILO.textContent = TEKSTO.DOWNLOAD_DEFAULT;
}

async function detektiDaŭron( enigaNomo: string ): Promise<number> {
  agordiStaton(TEKSTO.DETECTING_DURATION);
  lastaDaŭroSekundoj = 0;
  await ffmpeg.exec(["-i", enigaNomo, "-f", "null", "-t", "0", "-"]);
  return lastaDaŭroSekundoj;
}

function akiriKompresajVideoArgumentojn( enigaNomo: string, eliraNomo: string, celaFormato: string, celajBajtoj: number, daŭroSekundoj: number ): string[] {
  const aŭdiaBitrato = 128000;
  const tutaCelaBitrato = ( celajBajtoj * 0o10 ) / daŭroSekundoj;
  let vidaBitrato = Math.floor(tutaCelaBitrato - aŭdiaBitrato);
  if ( vidaBitrato < 64000 ) vidaBitrato = 64000;

  const vidaBitratoĈeno = `${vidaBitrato}`;
  const aŭdiaBitratoĈeno = `${aŭdiaBitrato}`;
  const bufGrandaĈeno = `${vidaBitrato * 2}`;

  if ( celaFormato === "webm" ) {
    return ["-y", "-i", enigaNomo, "-c:v", "libvpx-vp9", "-b:v", vidaBitratoĈeno, "-maxrate", vidaBitratoĈeno, "-bufsize", bufGrandaĈeno, "-c:a", "libopus", "-b:a", aŭdiaBitratoĈeno, eliraNomo];
  }
  if ( celaFormato === "gif" ) {
    return ["-y", "-i", enigaNomo, "-vf", "fps=15,scale=320:-1:flags=lanczos", "-c:v", "gif", eliraNomo];
  }
  return ["-y", "-i", enigaNomo, "-c:v", "libx264", "-preset", "ultrafast", "-b:v", vidaBitratoĈeno, "-maxrate", vidaBitratoĈeno, "-bufsize", bufGrandaĈeno, "-c:a", "aac", "-b:a", aŭdiaBitratoĈeno, "-movflags", "+faststart", eliraNomo];
}

function akiriKompresajAŭdioArgumentojn( enigaNomo: string, eliraNomo: string, celaFormato: string, celajBajtoj: number, daŭroSekundoj: number ): string[] {
  let celaBitrato = Math.floor(( celajBajtoj * 0o10 ) / daŭroSekundoj);
  if ( celaBitrato < 32000 ) celaBitrato = 32000;
  if ( celaBitrato > 320000 ) celaBitrato = 320000;
  const bitratoĈeno = `${celaBitrato}`;

  if ( celaFormato === "wav" ) {
    return ["-y", "-i", enigaNomo, "-vn", "-c:a", "pcm_s16le", "-ar", "44100", eliraNomo];
  }
  if ( celaFormato === "m4a" || celaFormato === "aac" ) {
    return ["-y", "-i", enigaNomo, "-vn", "-c:a", "aac", "-b:a", bitratoĈeno, eliraNomo];
  }
  if ( celaFormato === "ogg" ) {
    return ["-y", "-i", enigaNomo, "-vn", "-c:a", "libvorbis", "-b:a", bitratoĈeno, eliraNomo];
  }
  if ( celaFormato === "flac" ) {
    return ["-y", "-i", enigaNomo, "-vn", "-c:a", "flac", eliraNomo];
  }
  return ["-y", "-i", enigaNomo, "-vn", "-c:a", "libmp3lame", "-b:a", bitratoĈeno, eliraNomo];
}

async function kompresiBildon( enigaNomo: string, eliraNomo: string, celaFormato: string, celajBajtoj: number ): Promise<Uint8Array> {
  let malalta = 1;
  let alta = 64;
  let plejbonaDatumo: Uint8Array | null = null;
  const maksimumajPasoj = 0o10;

  for ( let i = 0; i < maksimumajPasoj; i++ ) {
    const kvalito = Math.floor(( malalta + alta ) / 2);
    agordiStaton(TEKSTO.COMPRESSING(i + 1, maksimumajPasoj));

    const argumentoj = celaFormato === "webp"
      ? ["-y", "-i", enigaNomo, "-quality", `${kvalito}`, eliraNomo]
      : ["-y", "-i", enigaNomo, "-q:v", `${Math.floor(32 - ( kvalito / 2 ))}`, eliraNomo];

    await ffmpeg.exec(argumentoj);
    const datumoj = await ffmpeg.readFile(eliraNomo);
    const bajtoj = datumoj instanceof Uint8Array ? datumoj : new Uint8Array(datumoj as unknown as ArrayBuffer);

    if ( bajtoj.byteLength <= celajBajtoj ) {
      plejbonaDatumo = bajtoj;
      malalta = kvalito + 1;
    } else {
      alta = kvalito - 1;
    }

    const proporcio = bajtoj.byteLength / celajBajtoj;
    if ( proporcio >= 0.9 && proporcio <= 1.0 ) {
      plejbonaDatumo = bajtoj;
      break;
    }
  }

  if ( !plejbonaDatumo ) {
    const datumoj = await ffmpeg.readFile(eliraNomo);
    plejbonaDatumo = datumoj instanceof Uint8Array ? datumoj : new Uint8Array(datumoj as unknown as ArrayBuffer);
  }

  return plejbonaDatumo;
}

async function konvertiElektitanDosieron(): Promise<void> {
  const dosiero = DOSIERA_ENIGO.files?.[0];
  if ( !dosiero ) {
    agordiStaton(TEKSTO.CHOOSE_FILE);
    return;
  }

  const kategorio = detektiDosierKategorion(dosiero);
  const celaFormato = akiriElektitanCelFormaton();
  if ( !celaFormato ) {
    agordiStaton(TEKSTO.CHOOSE_FORMAT);
    return;
  }

  restarigiAntasenon();
  agordiStaton(TEKSTO.CONVERTING(dosiero.name));

  const enigaNomo = `input-${Date.now()}-${dosiero.name.replace(/\s+/g, "_")}`;
  const dato = cax2lStafl2();
  const bazaNomo = dosiero.name.replace(/\.[^.]+$/, "").replace(/\s+/g, "_");
  const eliraNomo = `${dato.stibix}-${dato.pal2stif}-${dato.stafl2}_${bazaNomo}.${celaFormato}`;
  let blobURL: string;

  const kompresaReĝimo = ĉuKompresoŜaltita() && kategorio !== "font";
  const celajBajtoj = kompresaReĝimo ? akiriCelajnBajtojn() : 0;

  try {
    if ( kategorio === "font" ) {
      agordiStaton(TEKSTO.LOADING_FONT_ENGINE);
      const fontverterModulo = await import(/* @vite-ignore */ FONTA_CDN) as any;
      const fontverter = fontverterModulo.convert ? fontverterModulo : (fontverterModulo.default || fontverterModulo);
      agordiStaton(TEKSTO.CONVERTING_FONT);

      const arrayBuffer = await dosiero.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      let alFormato = celaFormato;
      if ( celaFormato === "ttf" || celaFormato === "otf" ) {
        alFormato = "sfnt";
      }

      const konvertitajBajtoj = await fontverter.convert(uint8Array, alFormato);
      
      const puraTiparaBufro = new ArrayBuffer(konvertitajBajtoj.byteLength);
      new Uint8Array(puraTiparaBufro).set(konvertitajBajtoj);
      
      const blobo = new Blob([puraTiparaBufro], {
        type: akiriEliraMIME(celaFormato),
      });

      blobURL = URL.createObjectURL(blobo);

      const tiparaNomo = `PreviewFont-${Date.now()}`;
      const tiparaVizaĝo = new (window as any).FontFace(tiparaNomo, `url(${blobURL})`);
      await tiparaVizaĝo.load();
      (document as any).fonts.add(tiparaVizaĝo);

      TIPARA_ANTASENO.style.fontFamily = tiparaNomo;
      TIPARA_ANTASENO.style.display = "";
    } else {
      await certigiFFmpegŜarĝo();

      if ( kategorio === "video" && dosiero.size > 10 * 1024 * 1024 ) {
        const muntpunkto = "/mnt";
        const enigaVojo = `${muntpunkto}/${enigaNomo}`;
        try {
          await ffmpeg.createDir(muntpunkto);
          await ffmpeg.mount(FFFSType.WORKERFS, { files: [dosiero] }, muntpunkto);

          if ( kompresaReĝimo && ( kategorio === "video" ) ) {
            const daŭro = await detektiDaŭron(enigaVojo);
            const argumentoj = akiriKompresajVideoArgumentojn(enigaVojo, eliraNomo, celaFormato, celajBajtoj, daŭro);
            await ffmpeg.exec(argumentoj);
          } else {
            const argumentoj = akiriKonvertajnArgumentojn(enigaVojo, eliraNomo, kategorio, celaFormato);
            await ffmpeg.exec(argumentoj);
          }

          await ffmpeg.unmount(muntpunkto);
        } catch {
          await ffmpeg.unmount(muntpunkto).catch(() => {});
          await ffmpeg.writeFile(enigaNomo, await fetchFile(dosiero));

          if ( kompresaReĝimo && ( kategorio === "video" ) ) {
            const daŭro = await detektiDaŭron(enigaNomo);
            const argumentoj = akiriKompresajVideoArgumentojn(enigaNomo, eliraNomo, celaFormato, celajBajtoj, daŭro);
            await ffmpeg.exec(argumentoj);
          } else {
            const argumentoj = akiriKonvertajnArgumentojn(enigaNomo, eliraNomo, kategorio, celaFormato);
            await ffmpeg.exec(argumentoj);
          }
        }
      } else {
        await ffmpeg.writeFile(enigaNomo, await fetchFile(dosiero));

        if ( kompresaReĝimo && kategorio === "image" ) {
          const kompresitajBajtoj = await kompresiBildon(enigaNomo, eliraNomo, celaFormato, celajBajtoj);
          const puraBufro = new ArrayBuffer(kompresitajBajtoj.byteLength);
          new Uint8Array(puraBufro).set(kompresitajBajtoj);

          const blobo = new Blob([puraBufro], {
            type: akiriEliraMIME(celaFormato),
          });

          blobURL = URL.createObjectURL(blobo);
          montriAntasenon(BILDA_ANTASENO, blobURL);
          prezentiRezulton(blobURL, eliraNomo, celaFormato);
          return;
        } else if ( kompresaReĝimo && kategorio === "audio" ) {
          const daŭro = await detektiDaŭron(enigaNomo);
          const argumentoj = akiriKompresajAŭdioArgumentojn(enigaNomo, eliraNomo, celaFormato, celajBajtoj, daŭro);
          await ffmpeg.exec(argumentoj);
        } else if ( kompresaReĝimo && kategorio === "video" ) {
          const daŭro = await detektiDaŭron(enigaNomo);
          const argumentoj = akiriKompresajVideoArgumentojn(enigaNomo, eliraNomo, celaFormato, celajBajtoj, daŭro);
          await ffmpeg.exec(argumentoj);
        } else {
          const argumentoj = akiriKonvertajnArgumentojn(enigaNomo, eliraNomo, kategorio, celaFormato);
          await ffmpeg.exec(argumentoj);
        }
      }

      const datumoj = await ffmpeg.readFile(eliraNomo);
      const bajtoj = datumoj instanceof Uint8Array
        ? datumoj
        : new Uint8Array(datumoj as unknown as ArrayBuffer);

      const puraBufro = new ArrayBuffer(bajtoj.byteLength);
      new Uint8Array(puraBufro).set(bajtoj);

      const blobo = new Blob([puraBufro], {
        type: akiriEliraMIME(celaFormato),
      });

      blobURL = URL.createObjectURL(blobo);

      if ( kategorio === "image" || celaFormato === "gif" ) {
        montriAntasenon(BILDA_ANTASENO, blobURL);
      } else if ( kategorio === "audio" ) {
        montriAntasenon(AUDIA_ANTASENO, blobURL);
      } else if ( kategorio === "video" ) {
        montriAntasenon(VIDA_ANTASENO, blobURL);
      }
    }

    prezentiRezulton(blobURL, eliraNomo, celaFormato);
  } catch ( eraro ) {
    console.error(eraro);
    agordiStaton(TEKSTO.ERROR(String(eraro)));
  }
}

RULI_BUTONO.addEventListener("click", () => {
  void konvertiElektitanDosieron();
});

KOMPRESA_BASKULO.addEventListener("change", () => {
  if ( KOMPRESA_BASKULO.checked ) {
    KOMPRESAJ_OPCIOJ.classList.remove("kobe");
  } else {
    KOMPRESAJ_OPCIOJ.classList.add("kobe");
  }
});

DOSIERA_ENIGO.addEventListener("change", () => {
  restarigiAntasenon();
  const dosiero = DOSIERA_ENIGO.files?.[0];
  if ( dosiero ) {
    const kategorio = detektiDosierKategorion(dosiero);
    ĝisdatigiCelajnFormatojn(kategorio);
    if ( kategorio === "font" ) {
      KOMPRESA_BASKULA_ETIKEDO.classList.add("kobe");
      KOMPRESAJ_OPCIOJ.classList.add("kobe");
      KOMPRESA_BASKULO.checked = false;
    } else {
      KOMPRESA_BASKULA_ETIKEDO.classList.remove("kobe");
    }
    agordiStaton(TEKSTO.READY);
  } else {
    CELUJO.innerHTML = "";
    agordiStaton(TEKSTO.CHOOSE_FILE);
  }
});
