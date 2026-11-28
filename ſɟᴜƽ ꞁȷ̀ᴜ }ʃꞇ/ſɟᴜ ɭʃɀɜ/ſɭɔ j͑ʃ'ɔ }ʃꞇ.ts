import { FFmpeg, FFFSType } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const K61e = {
  SUKF2Q_CAKAVOP2: "ı],ᴜ ſ͕ɭᴜ ɭ(ꞇ ʌ j͑ʃw ſɭʞɹȝ ʌ ſɟᴜ j͑ʃ'ɜ ſןɹ ⟅",
  SUKF2Q_HAT: "ı],ᴜ ſ͕ɭᴜ ɭ(ꞇ ʌ j͑ʃw ſɭʞɹȝ ʌ ſɭɔ ֭ſɭɔ }ʃꞇ ⟅",
  B6TEM2: "ꞁȷ̀ᴜ ŋᷠᴜͷ̗ ꞁȷ̀ᴜꞇ ʌ ꞁȷ̀ɜ ɭʃɀɜ ⟅",
  KF2_CAKAVOP2: (ksaka: string) => `ſɭᶗ‹ɔ ʌ ɭʃɀɜ ⸙ ${ksaka} ⸙ ⟅`,
  B6TEM2_KF2: "ſɭᶗ‹ɔ ʌ ʃэ ɭʃɔ ŋᷠɹ ʌ ſɟᴜ ɭʃɀɜ ⟅",
  B6TEM2_LAGA: "ſɭᶗ‹ɔ ʌ ʃэ ɭʃɔ ŋᷠɹ ʌ ſɟᴜ ɭʃɀɜ ʌ ɭʃᴜ j͐ʃᴜ ſ͔ɭᴜ ⟅",
  KF2_LAGA: "ſɭᶗ‹ɔ ʌ ɭʃɀɜ ʌ j͐ʃᴜ ſ͔ɭᴜ ⟅",
  KF2: (k61e: string) => `j͑ʃ'ᴜ ɽ͑ʃ'w ɭʃᴜ ${k61e} ⟅`,
  ARAQ: (hat: string) => `ſ̀ȷᴜ ſɭᴜƽ ⟅ ${hat} ⟅`,
  TLOHK2NI: "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )",
  TLOHK2NI_XEMA: (tlohk2ni: string) => `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ⸙ ${tlohk2ni} ⸙ ⟅`,
  QUMK2_SAXE: "ſ͕ɭwc̭ ſɭɹ ⟅",
  QUMK2_K61E: (ksaka: string) => `ſ͕ɭwc̭ ſɭɹ ⸙ ${ksaka} ⸙ ⟅`,
  PU: (k2fe: number, saxeAraq: number) => `ſɭᶗ‹ɔ ʌ j͑ʃ'ᴜ ŋᷠɹ ⸙ ${k2fe}/${saxeAraq} ⸙ ⟅`,
  QUQ_HEANI: "ſɭᶗ‹ɔ ʌ ſ͕ɭwȝ ʌ j͑ʃᴜ ſןɔ˞ɔ ſᶘꞇ ⟅",
} as const;

const SAXE_CDN = "https://esm.sh/fontverter";
const FFMPEG_CDN = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm";

const HAT_KSAKA: Record<string, string> = {
  mp3: "MP3 ( ʃɜ j͐ʃɔ )",
  wav: "WAV ( ʃɜ j͐ʃɔ )",
  m4a: "M4A ( ʃɜ j͐ʃɔ )",
  ogg: "OGG ( ʃɜ j͐ʃɔ )",
  aac: "AAC ( ʃɜ j͐ʃɔ )",
  flac: "FLAC ( ʃɜ j͐ʃɔ )",
  mp4: "MP4 ( j͐ʃᴜ ſ͕ɭᴜƽ )",
  webm: "WebM ( j͐ʃᴜ ſ͕ɭᴜƽ )",
  gif: "GIF ( j͐ʃᴜ ſ͕ɭᴜƽ )",
  png: "PNG ( ɭʃᴜ ֭ſɭᴜȝ )",
  jpeg: "JPEG ( ɭʃᴜ ֭ſɭᴜȝ )",
  webp: "WebP ( ɭʃᴜ ֭ſɭᴜȝ )",
  bmp: "BMP ( ɭʃᴜ ֭ſɭᴜȝ )",
  ico: "ICO ( ɭʃᴜ ֭ſɭᴜȝ )",
  tiff: "TIFF ( ɭʃᴜ ֭ſɭᴜȝ )",
  ttf: "TTF ( ֭ſɭᴜ ſ͔ɭᴜ )",
  otf: "OTF ( ֭ſɭᴜ ſ͔ɭᴜ )",
  woff: "WOFF ( ֭ſɭᴜ ſ͔ɭᴜ )",
  woff2: "WOFF2 ( ֭ſɭᴜ ſ͔ɭᴜ )",
};

const HAT_CA1ARA: Record<"audio" | "video" | "image" | "font", string[]> = {
  audio: [ "mp3", "wav", "m4a", "ogg", "aac", "flac" ],
  video: [ "mp4", "webm", "gif" ],
  image: [ "png", "jpeg", "webp", "gif", "bmp", "ico", "tiff" ],
  font: [ "ttf", "otf", "woff", "woff2" ],
};

const MIME_HAT: Record<string, string> = {
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

// ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ - ֭ſɭɔ ⏱️ ⟩
// j͑ʃ'ɔ ſȷᴜͷ̗ ʌ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ ⟅
const HEANI_QEANI = 0o74;
const HEANI_HAQEANI = 0o7020;

const SEFINI_L6DA_KEMAFI = 0o72 / 0o100;

const CAKAVOP2_XEMA = document.getElementById("cakavop2-xema") as HTMLInputElement;
const ARAQ_XEMA = document.getElementById("araq-xema") as HTMLElement;
const KEVE_KEK = document.getElementById("keve-kek") as HTMLButtonElement;
const K61E_KEK = document.getElementById("k61e-kek") as HTMLParagraphElement;
const hatSuntaKuba = document.getElementById("hat-sunta-kuba") as HTMLElement;
const BOLE_SUNTA_KUBA = document.getElementById("audia-sunta-kuba") as HTMLAudioElement;
const LAQAZ_SUNTA_KUBA = document.getElementById("vida-sunta-kuba") as HTMLVideoElement;
const TAHAQ_SUNTA_KUBA = document.getElementById("bilda-sunta-kuba") as HTMLImageElement;
const LAGA_SUNTA_KUBA = document.getElementById("laga-sunta-kuba") as HTMLParagraphElement;
const QUMK2 = document.getElementById("qumk2") as HTMLAnchorElement;
const K2FE_KUBA = document.getElementById("k2fe-kuba") as HTMLElement;

const catbo = new FFmpeg();
let catboPu = false;
let catboB6tem2 = false;
let kxesuK2fe = 0o0;
let kxesuQumk2K6h6: string | null = null;

const PU_KEK = document.getElementById("pu-kek") as HTMLInputElement;
const PU_KEK_KSAKA = document.getElementById("pu-kek-ksaka") as HTMLLabelElement;
const PU_XEMA = document.getElementById("pu-xema") as HTMLElement;
const ARAQ_PU_XEMA = document.getElementById("araq-pu-xema") as HTMLInputElement;
const PU_K2FE_XEMA = document.getElementById("pu-k2fe-xema") as HTMLElement;

function suntaK61e( k61e: string ): void {
  K61E_KEK.textContent = k61e;
}

function suntaK2fe( k2fe: number ): void {
  K2FE_KUBA.classList.remove( "kobe" );
  K2FE_KUBA.style.setProperty( "--តេមិនី", String( Math.max( 0o0, Math.min( 0o100, k2fe ) ) / 0o100 ) );
}

function ne1aK2fe(): void {
  K2FE_KUBA.style.setProperty( "--តេមិនី", "0" );
  K2FE_KUBA.classList.add( "kobe" );
}

function vop2Kuba( kek: HTMLElement, sunta: boolean ): void {
  if ( sunta ) {
    kek.classList.remove( "kobe" );
  } else {
    kek.classList.add( "kobe" );
  }
}

function suntaKuba( kek: HTMLMediaElement | HTMLImageElement, k61e: string ): void {
  kek.src = k61e;
  kek.style.display = "";
  if ("load" in kek && typeof kek.load === "function") {
    kek.load();
  }
}

function sunta( k61e: string, suntaKsaka: string, araqHat: string ): void {
  QUMK2.href = k61e;
  QUMK2.download = suntaKsaka;
  QUMK2.textContent = K61e.QUMK2_K61E(suntaKsaka);
  vop2Kuba( hatSuntaKuba, true );
  suntaK2fe( 0o100 );
  setTimeout( ne1aK2fe, 0o620 );
  suntaK61e(K61e.ARAQ(araqHat.toUpperCase()));
}

function quqCakavop2Hat( cakavop2: File ): "audio" | "video" | "image" | "font" {
  const hat = cakavop2.type.toLowerCase();
  if ( hat.startsWith("video/") ) return "video";
  if ( hat.startsWith("audio/") ) return "audio";
  if ( hat.startsWith("image/") ) return "image";
  if ( hat.startsWith("font/") || hat.includes("font") ) return "font";

  const m2Ksaka = cakavop2.name.toLowerCase();
  if ( /\.(mov|mp4|m4v|webm|avi|mkv|ogv)$/i.test(m2Ksaka) ) return "video";
  if ( /\.(mp3|wav|m4a|ogg|aac|flac|wma)$/i.test(m2Ksaka) ) return "audio";
  if ( /\.(png|jpg|jpeg|webp|gif|bmp|ico|tiff)$/i.test(m2Ksaka) ) return "image";
  if ( /\.(ttf|otf|woff|woff2)$/i.test(m2Ksaka) ) return "font";

  return "audio";
}

function v3ak2AraqHat( hat: "audio" | "video" | "image" | "font" ): void {
  ARAQ_XEMA.innerHTML = "";
  const k61eCa1ara = HAT_CA1ARA[hat];
  k61eCa1ara.forEach((hat, k2fe) => {
    const ksakaKek = document.createElement("label");
    
    const xemaKek = document.createElement("input");
    xemaKek.type = "radio";
    xemaKek.name = "araq-hat";
    xemaKek.value = hat;
    if ( k2fe === 0o0 ) {
      xemaKek.checked = true;
    }

    const k61eKek = document.createElement("p");
    k61eKek.className = "cepufalxez";
    k61eKek.textContent = HAT_KSAKA[hat];

    ksakaKek.appendChild(k61eKek);
    ksakaKek.appendChild(xemaKek);
    ARAQ_XEMA.appendChild(ksakaKek);
  });
}

function quqAraqHat(): string {
  const kxesuKek = ARAQ_XEMA.querySelector("input[name='araq-hat']:checked") as HTMLInputElement | null;
  return kxesuKek ? kxesuKek.value : "";
}

function quqHat( araqHat: string ): string {
  return MIME_HAT[araqHat] ?? "application/octet-stream";
}

function k2falPuSab2( sab2: Uint8Array, araqHat: string ): Blob {
  const cutaVop2 = new ArrayBuffer(sab2.byteLength);
  new Uint8Array(cutaVop2).set(sab2);
  return new Blob([ cutaVop2 ], {
    type: quqHat(araqHat),
  });
}

function quqPuK61e(): string {
  const kxesuKek = PU_K2FE_XEMA.querySelector("input[name='pu-k2fe']:checked") as HTMLInputElement | null;
  return kxesuKek ? kxesuKek.value : "m2Sab2";
}

function quqAraqK2fe(): number {
  const k2fe = parseFloat(ARAQ_PU_XEMA.value) || 0o10;
  const k61e = quqPuK61e();
  if ( k61e === "puSab2" ) {
    return k2fe * 0o2000 * 0o2000 * 0o2000;
  }
  return k2fe * 0o2000 * 0o2000;
}

function puHat(): boolean {
  return PU_KEK.checked;
}

function kf2K61eCa1ara( xemaKsaka: string, suntaKsaka: string, hat: "audio" | "video" | "image" | "font", araqHat: string ): string[] {
  if ( hat === "image" ) {
    if ( araqHat === "ico" ) {
      return [ "-y", "-i", xemaKsaka, "-s", "256x256", suntaKsaka ];
    }
    return [ "-y", "-i", xemaKsaka, suntaKsaka ];
  }

  if ( hat === "audio" ) {
    if ( araqHat === "wav" ) {
      return [ "-y", "-i", xemaKsaka, "-vn", "-c:a", "pcm_s16le", "-ar", "44100", suntaKsaka ];
    }
    if ( araqHat === "m4a" || araqHat === "aac" ) {
      return [ "-y", "-i", xemaKsaka, "-vn", "-c:a", "aac", "-b:a", "192k", suntaKsaka ];
    }
    if ( araqHat === "ogg" ) {
      return [ "-y", "-i", xemaKsaka, "-vn", "-c:a", "libvorbis", "-q:a", "4", suntaKsaka ];
    }
    if ( araqHat === "flac" ) {
      return [ "-y", "-i", xemaKsaka, "-vn", "-c:a", "flac", suntaKsaka ];
    }
    return [ "-y", "-i", xemaKsaka, "-vn", "-c:a", "libmp3lame", "-q:a", "2", suntaKsaka ];
  }

  // ⟨ j͐ʃᴜ ſ͕ɭᴜƽ 📃 ⟩
  if ( araqHat === "webm" ) {
    return [ "-y", "-i", xemaKsaka, "-c:v", "libvpx-vp9", "-c:a", "libopus", suntaKsaka ];
  }
  if ( araqHat === "gif" ) {
    return [ "-y", "-i", xemaKsaka, "-vf", "fps=15,scale=320:-1:flags=lanczos", "-c:v", "gif", suntaKsaka ];
  }
  return [ "-y", "-i", xemaKsaka, "-c:v", "libx264", "-preset", "ultrafast", "-vf", "scale=if(gt(iw\\,1280)\\,1280\\,iw):-2", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", suntaKsaka ];
}

async function kf2Catbo(): Promise<void> {
  if ( catboPu || catboB6tem2 ) return;
  catboB6tem2 = true;
  KEVE_KEK.disabled = true;
  suntaK61e(K61e.B6TEM2_KF2);
  try {
    await catbo.load({
      coreURL: await toBlobURL(`${FFMPEG_CDN}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${FFMPEG_CDN}/ffmpeg-core.wasm`, "application/wasm"),
    });
  } catch ( tlohk2ni ) {
    catboB6tem2 = false;
    KEVE_KEK.disabled = false;
    throw tlohk2ni;
  }

  catbo.on("log", ({ message: k61e }: { message: string }) => {
    console.log(k61e);
    const xekox2q = k61e.match(/Duration:\s*(\d+):(\d+):(\d+\.?\d*)/);
    if ( xekox2q ) {
      const haqeani = parseInt(xekox2q[0o1]);
      const qeani = parseInt(xekox2q[0o2]);
      const heani = parseFloat(xekox2q[0o3]);
      kxesuK2fe = haqeani * HEANI_HAQEANI + qeani * HEANI_QEANI + heani;
    }
    if ( k61e.includes("time=") ) {
      suntaK61e(K61e.KF2(k61e.trim()));
      const kxesuXekox2q = k61e.match(/time=(\d+):(\d+):(\d+\.?\d*)/);
      if ( kxesuXekox2q && kxesuK2fe > 0o0 ) {
        const haqeani = parseInt(kxesuXekox2q[0o1]);
        const qeani = parseInt(kxesuXekox2q[0o2]);
        const heani = parseFloat(kxesuXekox2q[0o3]);
        suntaK2fe( 0o2 + ( ( haqeani * HEANI_HAQEANI + qeani * HEANI_QEANI + heani ) / kxesuK2fe ) * ( 0o130 - 0o2 ) );
      }
    }
  });

  catbo.on("progress", ({ progress: kf2K2fe }: { progress: number }) => {
    if ( kf2K2fe > 0o0 && kf2K2fe < 0o1 ) {
      suntaK61e(K61e.KF2(`${Math.round(kf2K2fe * 0o100)}`));
      suntaK2fe( 0o2 + kf2K2fe * ( 0o130 - 0o2 ) );
    }
  });

  catboPu = true;
  catboB6tem2 = false;
  KEVE_KEK.disabled = false;
}

function ne1aQumk2K6h6(): void {
  if ( kxesuQumk2K6h6 !== null ) {
    URL.revokeObjectURL(kxesuQumk2K6h6);
    kxesuQumk2K6h6 = null;
  }
}

function k2falQumk2K6h6( puSab2: Blob ): string {
  ne1aQumk2K6h6();
  kxesuQumk2K6h6 = URL.createObjectURL(puSab2);
  return kxesuQumk2K6h6;
}

function ne1aSuntaKuba(): void {
  ne1aQumk2K6h6();
  BOLE_SUNTA_KUBA.pause();
  LAQAZ_SUNTA_KUBA.pause();
  BOLE_SUNTA_KUBA.removeAttribute("src");
  LAQAZ_SUNTA_KUBA.removeAttribute("src");
  TAHAQ_SUNTA_KUBA.removeAttribute("src");
  BOLE_SUNTA_KUBA.style.display = "none";
  LAQAZ_SUNTA_KUBA.style.display = "none";
  TAHAQ_SUNTA_KUBA.style.display = "none";
  LAGA_SUNTA_KUBA.style.display = "none";
  vop2Kuba( hatSuntaKuba, false );
  QUMK2.removeAttribute("href");
  QUMK2.textContent = K61e.QUMK2_SAXE;
}

async function quqK2fe( xemaKsaka: string ): Promise<number> {
  suntaK61e(K61e.QUQ_HEANI);
  kxesuK2fe = 0o0;
  await catbo.exec([ "-i", xemaKsaka, "-f", "null", "-t", "0", "-" ]);
  return kxesuK2fe;
}

function puTahaqKf2K61eCa1ara( xemaKsaka: string, suntaKsaka: string, araqHat: string, araqK2fe: number, heaniPu: number ): string[] {
  const beK2fe = 0o372000;
  const heani = heaniPu > 0o0 ? heaniPu : 0o1;
  const puK2fe = ( araqK2fe * 0o10 ) / heani;
  let tahaqK2fe = Math.floor(puK2fe - beK2fe);
  if ( !isFinite( tahaqK2fe ) || tahaqK2fe < 0o175000 ) tahaqK2fe = 0o175000;

  const tahaqK2feK61e = `${tahaqK2fe}`;
  const beK2feK61e = `${beK2fe}`;
  const puK2feK61e = `${tahaqK2fe * 0o2}`;

  if ( araqHat === "webm" ) {
    return [ "-y", "-i", xemaKsaka, "-c:v", "libvpx-vp9", "-b:v", tahaqK2feK61e, "-maxrate", tahaqK2feK61e, "-bufsize", puK2feK61e, "-c:a", "libopus", "-b:a", beK2feK61e, suntaKsaka ];
  }
  if ( araqHat === "gif" ) {
    return [ "-y", "-i", xemaKsaka, "-vf", "fps=15,scale=320:-1:flags=lanczos", "-c:v", "gif", suntaKsaka ];
  }
  return [ "-y", "-i", xemaKsaka, "-c:v", "libx264", "-preset", "ultrafast", "-b:v", tahaqK2feK61e, "-maxrate", tahaqK2feK61e, "-bufsize", puK2feK61e, "-c:a", "aac", "-b:a", beK2feK61e, "-movflags", "+faststart", suntaKsaka ];
}

function puBeKf2K61eCa1ara( xemaKsaka: string, suntaKsaka: string, araqHat: string, araqK2fe: number, heaniPu: number ): string[] {
  const heani = heaniPu > 0o0 ? heaniPu : 0o1;
  let beK2fe = Math.floor(( araqK2fe * 0o10 ) / heani);
  if ( !isFinite( beK2fe ) ) beK2fe = 0o76400;
  if ( beK2fe < 0o76400 ) beK2fe = 0o76400;
  if ( beK2fe > 0o1161000 ) beK2fe = 0o1161000;
  const beK2feK61e = `${beK2fe}`;

  if ( araqHat === "wav" ) {
    return [ "-y", "-i", xemaKsaka, "-vn", "-c:a", "pcm_s16le", "-ar", "44100", suntaKsaka ];
  }
  if ( araqHat === "m4a" || araqHat === "aac" ) {
    return [ "-y", "-i", xemaKsaka, "-vn", "-c:a", "aac", "-b:a", beK2feK61e, suntaKsaka ];
  }
  if ( araqHat === "ogg" ) {
    return [ "-y", "-i", xemaKsaka, "-vn", "-c:a", "libvorbis", "-b:a", beK2feK61e, suntaKsaka ];
  }
  if ( araqHat === "flac" ) {
    return [ "-y", "-i", xemaKsaka, "-vn", "-c:a", "flac", suntaKsaka ];
  }
  return [ "-y", "-i", xemaKsaka, "-vn", "-c:a", "libmp3lame", "-b:a", beK2feK61e, suntaKsaka ];
}

async function puKf2Tahaq( xemaKsaka: string, suntaKsaka: string, araqHat: string, araqK2fe: number ): Promise<Uint8Array> {
  let m2 = 0o1;
  let pu = 0o100;
  let kemafiSab2: Uint8Array | null = null;
  const kemafiK2fe = 0o10;

  for ( let kemafi = 0o0; kemafi < kemafiK2fe; kemafi++ ) {
    const k2fe = Math.floor(( m2 + pu ) / 0o2);
    suntaK61e(K61e.PU(kemafi + 0o1, kemafiK2fe));

    const qv = Math.max( 0o1, Math.min( 0o37, Math.floor( 0o40 - ( k2fe / 0o2 ) ) ) );

    const k61eCa1ara = araqHat === "webp"
      ? [ "-y", "-i", xemaKsaka, "-quality", `${k2fe}`, suntaKsaka ]
      : [ "-y", "-i", xemaKsaka, "-q:v", `${qv}`, suntaKsaka ];

    await catbo.exec(k61eCa1ara);
    const quqSab2 = await catbo.readFile(suntaKsaka);
    const sab2 = quqSab2 instanceof Uint8Array ? quqSab2 : new Uint8Array(quqSab2 as unknown as ArrayBuffer);

    if ( sab2.byteLength <= araqK2fe ) {
      kemafiSab2 = sab2;
      m2 = k2fe + 0o1;
    } else {
      pu = k2fe - 0o1;
    }

    const sefiniL6da = sab2.byteLength / araqK2fe;
    if ( sefiniL6da >= SEFINI_L6DA_KEMAFI && sefiniL6da <= 0o1 ) {
      kemafiSab2 = sab2;
      break;
    }
  }

  if ( !kemafiSab2 ) {
    const quqSab2 = await catbo.readFile(suntaKsaka);
    kemafiSab2 = quqSab2 instanceof Uint8Array ? quqSab2 : new Uint8Array(quqSab2 as unknown as ArrayBuffer);
  }

  return kemafiSab2;
}

async function kf2Cakavop2(): Promise<void> {
  const cakavop2 = CAKAVOP2_XEMA.files?.[ 0o0 ];
  if ( !cakavop2 ) {
    suntaK61e(K61e.SUKF2Q_CAKAVOP2);
    return;
  }

  const hat = quqCakavop2Hat(cakavop2);
  const araqHat = quqAraqHat();
  if ( !araqHat ) {
    suntaK61e(K61e.SUKF2Q_HAT);
    return;
  }

  ne1aSuntaKuba();
  suntaK2fe( 0o2 );
  suntaK61e(K61e.KF2_CAKAVOP2(cakavop2.name));

  const xemaKsaka = `input-${Date.now()}-${cakavop2.name.replace(/\s+/g, "_")}`;
  const kxesu = cax2lStafl2();
  const saxeKsaka = cakavop2.name.replace(/\.[^.]+$/, "").replace(/\s+/g, "_");
  const suntaKsaka = `${kxesu.stibix}-${kxesu.pal2stif}-${kxesu.stafl2}_${saxeKsaka}.${araqHat}`;
  let k61e: string;

  const puVop2 = puHat() && hat !== "font";
  const araqK2fe = puVop2 ? quqAraqK2fe() : 0o0;

  try {
    if ( hat === "font" ) {
      suntaK61e(K61e.B6TEM2_LAGA);
      suntaK2fe( 0o20 );
      const lagaKf2Hac0zani = await import(/* @vite-ignore */ SAXE_CDN) as any;
      const lagaCatbo = lagaKf2Hac0zani.convert ? lagaKf2Hac0zani : (lagaKf2Hac0zani.default || lagaKf2Hac0zani);
      suntaK61e(K61e.KF2_LAGA);

      const lagaVop2 = await cakavop2.arrayBuffer();
      const cap2saCa1ara = new Uint8Array(lagaVop2);

      let hat = araqHat;
      if ( araqHat === "ttf" || araqHat === "otf" ) {
        hat = "sfnt";
      }

      const kf2Sab2 = await lagaCatbo.convert(cap2saCa1ara, hat);
      suntaK2fe( 0o66 );

      const puSab2 = k2falPuSab2(kf2Sab2, araqHat);
      k61e = k2falQumk2K6h6(puSab2);

      const lagaKsaka = `PreviewFont-${Date.now()}`;
      const lagaTez = new (window as any).FontFace(lagaKsaka, `url(${k61e})`);
      await lagaTez.load();
      (document as any).fonts.add(lagaTez);

      LAGA_SUNTA_KUBA.style.fontFamily = lagaKsaka;
      LAGA_SUNTA_KUBA.style.display = "";
    } else {
      suntaK2fe( 0o20 );
      await kf2Catbo();
      suntaK2fe( 0o24 );

      if ( hat === "video" && cakavop2.size > 0o12 * 0o2000 * 0o2000 ) {
        const saxeK6h6 = "/mnt";
        const xemaK6h6 = `${saxeK6h6}/${xemaKsaka}`;
        try {
          await catbo.createDir(saxeK6h6);
          await catbo.mount(FFFSType.WORKERFS, { files: [ cakavop2 ] }, saxeK6h6);

          if ( puVop2 && ( hat === "video" ) ) {
            const heaniPu = await quqK2fe(xemaK6h6);
            const k61eCa1ara = puTahaqKf2K61eCa1ara(xemaK6h6, suntaKsaka, araqHat, araqK2fe, heaniPu);
            await catbo.exec(k61eCa1ara);
          } else {
            const k61eCa1ara = kf2K61eCa1ara(xemaK6h6, suntaKsaka, hat, araqHat);
            await catbo.exec(k61eCa1ara);
          }

          await catbo.unmount(saxeK6h6);
        } catch {
          await catbo.unmount(saxeK6h6).catch(() => {});
          await catbo.writeFile(xemaKsaka, await fetchFile(cakavop2));

          if ( puVop2 && ( hat === "video" ) ) {
            const heaniPu = await quqK2fe(xemaKsaka);
            const k61eCa1ara = puTahaqKf2K61eCa1ara(xemaKsaka, suntaKsaka, araqHat, araqK2fe, heaniPu);
            await catbo.exec(k61eCa1ara);
          } else {
            const k61eCa1ara = kf2K61eCa1ara(xemaKsaka, suntaKsaka, hat, araqHat);
            await catbo.exec(k61eCa1ara);
          }
        }
      } else {
        await catbo.writeFile(xemaKsaka, await fetchFile(cakavop2));

        if ( puVop2 && hat === "image" ) {
          const kubaSab2 = await puKf2Tahaq(xemaKsaka, suntaKsaka, araqHat, araqK2fe);
          const puSab2 = k2falPuSab2(kubaSab2, araqHat);
          k61e = k2falQumk2K6h6(puSab2);
          suntaKuba(TAHAQ_SUNTA_KUBA, k61e);
          sunta(k61e, suntaKsaka, araqHat);
          return;
        } else if ( puVop2 && hat === "audio" ) {
          const heaniPu = await quqK2fe(xemaKsaka);
          const k61eCa1ara = puBeKf2K61eCa1ara(xemaKsaka, suntaKsaka, araqHat, araqK2fe, heaniPu);
          await catbo.exec(k61eCa1ara);
        } else if ( puVop2 && hat === "video" ) {
          const heaniPu = await quqK2fe(xemaKsaka);
          const k61eCa1ara = puTahaqKf2K61eCa1ara(xemaKsaka, suntaKsaka, araqHat, araqK2fe, heaniPu);
          await catbo.exec(k61eCa1ara);
        } else {
          const k61eCa1ara = kf2K61eCa1ara(xemaKsaka, suntaKsaka, hat, araqHat);
          await catbo.exec(k61eCa1ara);
        }
      }

      const quqSab2 = await catbo.readFile(suntaKsaka);
      suntaK2fe( 0o75 );
      const sab2 = quqSab2 instanceof Uint8Array
        ? quqSab2
        : new Uint8Array(quqSab2 as unknown as ArrayBuffer);

      const puSab2 = k2falPuSab2(sab2, araqHat);
      k61e = k2falQumk2K6h6(puSab2);

      if ( hat === "image" || araqHat === "gif" ) {
        suntaKuba(TAHAQ_SUNTA_KUBA, k61e);
      } else if ( hat === "audio" ) {
        suntaKuba(BOLE_SUNTA_KUBA, k61e);
      } else if ( hat === "video" ) {
        suntaKuba(LAQAZ_SUNTA_KUBA, k61e);
      }
    }

    sunta(k61e, suntaKsaka, araqHat);
  } catch ( tlohk2ni ) {
    console.error(tlohk2ni);
    ne1aSuntaKuba();
    ne1aK2fe();
    suntaK61e(K61e.TLOHK2NI_XEMA(String(tlohk2ni)));
  }
}

KEVE_KEK.addEventListener("click", () => {
  void kf2Cakavop2();
});

PU_KEK.addEventListener("change", () => {
  if ( PU_KEK.checked ) {
    PU_XEMA.classList.remove("kobe");
  } else {
    PU_XEMA.classList.add("kobe");
  }
});

CAKAVOP2_XEMA.addEventListener("change", () => {
  ne1aSuntaKuba();
  const cakavop2 = CAKAVOP2_XEMA.files?.[ 0o0 ];
  if ( cakavop2 ) {
    const hat = quqCakavop2Hat(cakavop2);
    v3ak2AraqHat(hat);
    if ( hat === "font" ) {
      PU_KEK_KSAKA.classList.add("kobe");
      PU_XEMA.classList.add("kobe");
      PU_KEK.checked = false;
    } else {
      PU_KEK_KSAKA.classList.remove("kobe");
    }
    suntaK61e(K61e.B6TEM2);
  } else {
    ARAQ_XEMA.innerHTML = "";
    suntaK61e(K61e.SUKF2Q_CAKAVOP2);
  }
});
