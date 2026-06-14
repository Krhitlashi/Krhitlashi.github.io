import { FFmpeg, FFFSType } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const TEXT = {
  CHOOSE_FILE: "ı],ᴜ ſ͕ɭᴜ ɭ(ꞇ ʌ j͑ʃw ſɭʞɹȝ ʌ ſɟᴜ j͑ʃ'ɜ ſןɹ ⟅",
  CHOOSE_FORMAT: "ı],ᴜ ſ͕ɭᴜ ɭ(ꞇ ʌ j͑ʃw ſɭʞɹȝ ʌ ſɭɔ ֭ſɭɔ }ʃꞇ ⟅",
  READY: "ꞁȷ̀ᴜ ŋᷠᴜͷ̗ ꞁȷ̀ᴜꞇ ʌ ꞁȷ̀ɜ ɭʃɀɜ ⟅",
  CONVERTING: (name: string) => `ſɭᶗ‹ɔ ʌ ɭʃɀɜ ⸙ ${name} ⸙ ⟅`,
  LOADING_ENGINE: "ſɭᶗ‹ɔ ʌ ʃэ ɭʃɔ ŋᷠɹ ʌ ſɟᴜ ɭʃɀɜ ⟅",
  LOADING_FONT_ENGINE: "ſɭᶗ‹ɔ ʌ ʃэ ɭʃɔ ŋᷠɹ ʌ ſɟᴜ ɭʃɀɜ ʌ ɭʃᴜ j͐ʃᴜ ſ͔ɭᴜ ⟅",
  CONVERTING_FONT: "ſɭᶗ‹ɔ ʌ ɭʃɀɜ ʌ j͐ʃᴜ ſ͔ɭᴜ ⟅",
  ENCODING: (msg: string) => `j͑ʃ'ᴜ ɽ͑ʃ'w ɭʃᴜ ${msg} ⟅`,
  DONE: (fmt: string) => `ſ̀ȷᴜ ſɭᴜƽ ⟅ ${fmt} ⟅`,
  FAILED: "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )",
  ERROR: (err: string) => `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) ⸙ ${err} ⸙ ⟅`,
  DOWNLOAD_DEFAULT: "ſ͕ɭwc̭ ſɭɹ ⟅",
  DOWNLOAD: (name: string) => `ſ͕ɭwc̭ ſɭɹ ⸙ ${name} ⸙ ⟅`,
  COMPRESSING: (pass: number, total: number) => `ſɭᶗ‹ɔ ʌ j͑ʃ'ᴜ ŋᷠɹ ⸙ ${pass}/${total} ⸙ ⟅`,
  DETECTING_DURATION: "ſɭᶗ‹ɔ ʌ ſ͕ɭwȝ ʌ j͑ʃᴜ ſןɔ˞ɔ ſᶘꞇ ⟅",
} as const;

const FONT_CDN = "https://esm.sh/fontverter";
const FFMPEG_CDN = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm";

const FORMAT_LABELS: Record<string, string> = {
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
  ttf: "TTF ( font )",
  otf: "OTF ( font )",
  woff: "WOFF ( font )",
  woff2: "WOFF2 ( font )",
};

const FORMAT_OPTIONS: Record<"audio" | "video" | "image" | "font", string[]> = {
  audio: ["mp3", "wav", "m4a", "ogg", "aac", "flac"],
  video: ["mp4", "webm", "gif"],
  image: ["png", "jpeg", "webp", "gif", "bmp", "ico", "tiff"],
  font: ["ttf", "otf", "woff", "woff2"],
};

const MIME_TYPES: Record<string, string> = {
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

const FILE_INPUT = document.getElementById("converter-file-input") as HTMLInputElement;
const TARGET_CONTAINER = document.getElementById("converter-target-formats") as HTMLElement;
const RUN_BUTTON = document.getElementById("converter-run") as HTMLButtonElement;
const STATUS_TEXT = document.getElementById("converter-status") as HTMLParagraphElement;
const RESULT_PANEL = document.getElementById("converter-result") as HTMLElement;
const AUDIO_PREVIEW = document.getElementById("converter-preview-audio") as HTMLAudioElement;
const VIDEO_PREVIEW = document.getElementById("converter-preview-video") as HTMLVideoElement;
const IMAGE_PREVIEW = document.getElementById("converter-preview-image") as HTMLImageElement;
const FONT_PREVIEW = document.getElementById("converter-preview-font") as HTMLParagraphElement;
const DOWNLOAD_LINK = document.getElementById("converter-download") as HTMLAnchorElement;

const ffmpeg = new FFmpeg();
let ffmpegReady = false;
let lastDurationSeconds = 0;

const COMPRESS_TOGGLE = document.getElementById("converter-compress-toggle") as HTMLInputElement;
const COMPRESS_TOGGLE_LABEL = document.getElementById("converter-compress-toggle-label") as HTMLLabelElement;
const COMPRESS_OPTIONS = document.getElementById("converter-compress-options") as HTMLElement;
const TARGET_SIZE_INPUT = document.getElementById("converter-target-size") as HTMLInputElement;
const SIZE_UNIT_CONTAINER = document.getElementById("converter-size-unit") as HTMLElement;

function setStatus(message: string): void {
  STATUS_TEXT.textContent = message;
}

function showPreview(element: HTMLMediaElement | HTMLImageElement, blobURL: string): void {
  element.src = blobURL;
  element.style.display = "";
  if ("load" in element && typeof element.load === "function") {
    element.load();
  }
}

function presentResult(blobURL: string, outputName: string, targetFormat: string): void {
  DOWNLOAD_LINK.href = blobURL;
  DOWNLOAD_LINK.download = outputName;
  DOWNLOAD_LINK.textContent = TEXT.DOWNLOAD(outputName);
  RESULT_PANEL.style.display = "";
  setStatus(TEXT.DONE(targetFormat.toUpperCase()));
}

function detectFileCategory(file: File): "audio" | "video" | "image" | "font" {
  const type = file.type.toLowerCase();
  if ( type.startsWith("video/") ) return "video";
  if ( type.startsWith("audio/") ) return "audio";
  if ( type.startsWith("image/") ) return "image";
  if ( type.startsWith("font/") || type.includes("font") ) return "font";

  const lowerName = file.name.toLowerCase();
  if ( /\.(mov|mp4|m4v|webm|avi|mkv|ogv)$/i.test(lowerName) ) return "video";
  if ( /\.(mp3|wav|m4a|ogg|aac|flac|wma)$/i.test(lowerName) ) return "audio";
  if ( /\.(png|jpg|jpeg|webp|gif|bmp|ico|tiff)$/i.test(lowerName) ) return "image";
  if ( /\.(ttf|otf|woff|woff2)$/i.test(lowerName) ) return "font";

  return "audio";
}

function updateTargetFormats(category: "audio" | "video" | "image" | "font"): void {
  TARGET_CONTAINER.innerHTML = "";
  const options = FORMAT_OPTIONS[category];
  options.forEach((format, idx) => {
    const labelEl = document.createElement("label");
    
    const inputEl = document.createElement("input");
    inputEl.type = "radio";
    inputEl.name = "target-format";
    inputEl.value = format;
    if ( idx === 0 ) {
      inputEl.checked = true;
    }

    const pEl = document.createElement("p");
    pEl.className = "cepufalxez";
    pEl.textContent = FORMAT_LABELS[format];

    labelEl.appendChild(pEl);
    labelEl.appendChild(inputEl);
    TARGET_CONTAINER.appendChild(labelEl);
  });
}

function getSelectedTargetFormat(): string {
  const selectedRadio = TARGET_CONTAINER.querySelector("input[name='target-format']:checked") as HTMLInputElement | null;
  return selectedRadio ? selectedRadio.value : "";
}

function getOutputMime(targetFormat: string): string {
  return MIME_TYPES[targetFormat] ?? "application/octet-stream";
}

function getSelectedSizeUnit(): string {
  const selectedRadio = SIZE_UNIT_CONTAINER.querySelector("input[name='size-unit']:checked") as HTMLInputElement | null;
  return selectedRadio ? selectedRadio.value : "mb";
}

function getTargetSizeBytes(): number {
  const value = parseFloat(TARGET_SIZE_INPUT.value) || 0o10;
  const unit = getSelectedSizeUnit();
  if ( unit === "gb" ) {
    return value * 1024 * 1024 * 1024;
  }
  return value * 1024 * 1024;
}

function isCompressionEnabled(): boolean {
  return COMPRESS_TOGGLE.checked;
}

function getConversionArgs(inputName: string, outputName: string, category: "audio" | "video" | "image" | "font", targetFormat: string): string[] {
  if ( category === "image" ) {
    if ( targetFormat === "ico" ) {
      return ["-y", "-i", inputName, "-s", "256x256", outputName];
    }
    return ["-y", "-i", inputName, outputName];
  }

  if ( category === "audio" ) {
    if ( targetFormat === "wav" ) {
      return ["-y", "-i", inputName, "-vn", "-c:a", "pcm_s16le", "-ar", "44100", outputName];
    }
    if ( targetFormat === "m4a" || targetFormat === "aac" ) {
      return ["-y", "-i", inputName, "-vn", "-c:a", "aac", "-b:a", "192k", outputName];
    }
    if ( targetFormat === "ogg" ) {
      return ["-y", "-i", inputName, "-vn", "-c:a", "libvorbis", "-q:a", "4", outputName];
    }
    if ( targetFormat === "flac" ) {
      return ["-y", "-i", inputName, "-vn", "-c:a", "flac", outputName];
    }
    return ["-y", "-i", inputName, "-vn", "-c:a", "libmp3lame", "-q:a", "2", outputName];
  }

  // Video
  if ( targetFormat === "webm" ) {
    return ["-y", "-i", inputName, "-c:v", "libvpx-vp9", "-c:a", "libopus", outputName];
  }
  if ( targetFormat === "gif" ) {
    return ["-y", "-i", inputName, "-vf", "fps=15,scale=320:-1:flags=lanczos", "-c:v", "gif", outputName];
  }
  return ["-y", "-i", inputName, "-c:v", "libx264", "-preset", "ultrafast", "-vf", "scale=if(gt(iw\,1280)\,1280\,iw):-2", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", outputName];
}

async function ensureFFmpegLoaded(): Promise<void> {
  if ( ffmpegReady ) return;
  setStatus(TEXT.LOADING_ENGINE);
  await ffmpeg.load({
    coreURL: await toBlobURL(`${FFMPEG_CDN}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${FFMPEG_CDN}/ffmpeg-core.wasm`, "application/wasm"),
  });

  ffmpeg.on("log", ({ message }: { message: string }) => {
    console.log(message);
    const durationMatch = message.match(/Duration:\s*(\d+):(\d+):(\d+\.?\d*)/);
    if ( durationMatch ) {
      const hours = parseInt(durationMatch[1]);
      const minutes = parseInt(durationMatch[2]);
      const seconds = parseFloat(durationMatch[3]);
      lastDurationSeconds = hours * 3600 + minutes * 64 + seconds;
    }
    if ( message.includes("time=") ) {
      setStatus(TEXT.ENCODING(message.trim()));
    }
  });

  ffmpeg.on("progress", ({ progress }: { progress: number }) => {
    if ( progress > 0 && progress < 1 ) {
      setStatus(TEXT.ENCODING(`${Math.round(progress * 0o100)}`));
    }
  });

  ffmpegReady = true;
}

function resetPreview(): void {
  AUDIO_PREVIEW.pause();
  VIDEO_PREVIEW.pause();
  AUDIO_PREVIEW.removeAttribute("src");
  VIDEO_PREVIEW.removeAttribute("src");
  IMAGE_PREVIEW.removeAttribute("src");
  AUDIO_PREVIEW.style.display = "none";
  VIDEO_PREVIEW.style.display = "none";
  IMAGE_PREVIEW.style.display = "none";
  FONT_PREVIEW.style.display = "none";
  RESULT_PANEL.style.display = "none";
  DOWNLOAD_LINK.removeAttribute("href");
  DOWNLOAD_LINK.textContent = TEXT.DOWNLOAD_DEFAULT;
}

async function detectDuration(inputName: string): Promise<number> {
  setStatus(TEXT.DETECTING_DURATION);
  lastDurationSeconds = 0;
  await ffmpeg.exec(["-i", inputName, "-f", "null", "-t", "0", "-"]);
  return lastDurationSeconds;
}

function getCompressVideoArgs(inputName: string, outputName: string, targetFormat: string, targetBytes: number, durationSeconds: number): string[] {
  const audioBitrate = 128000;
  const targetTotalBitrate = ( targetBytes * 0o10 ) / durationSeconds;
  let videoBitrate = Math.floor(targetTotalBitrate - audioBitrate);
  if ( videoBitrate < 64000 ) videoBitrate = 64000;

  const videoBitrateStr = `${videoBitrate}`;
  const audioBitrateStr = `${audioBitrate}`;
  const bufsizeStr = `${videoBitrate * 2}`;

  if ( targetFormat === "webm" ) {
    return ["-y", "-i", inputName, "-c:v", "libvpx-vp9", "-b:v", videoBitrateStr, "-maxrate", videoBitrateStr, "-bufsize", bufsizeStr, "-c:a", "libopus", "-b:a", audioBitrateStr, outputName];
  }
  if ( targetFormat === "gif" ) {
    return ["-y", "-i", inputName, "-vf", "fps=15,scale=320:-1:flags=lanczos", "-c:v", "gif", outputName];
  }
  return ["-y", "-i", inputName, "-c:v", "libx264", "-preset", "ultrafast", "-b:v", videoBitrateStr, "-maxrate", videoBitrateStr, "-bufsize", bufsizeStr, "-c:a", "aac", "-b:a", audioBitrateStr, "-movflags", "+faststart", outputName];
}

function getCompressAudioArgs(inputName: string, outputName: string, targetFormat: string, targetBytes: number, durationSeconds: number): string[] {
  let targetBitrate = Math.floor(( targetBytes * 0o10 ) / durationSeconds);
  if ( targetBitrate < 32000 ) targetBitrate = 32000;
  if ( targetBitrate > 320000 ) targetBitrate = 320000;
  const bitrateStr = `${targetBitrate}`;

  if ( targetFormat === "wav" ) {
    return ["-y", "-i", inputName, "-vn", "-c:a", "pcm_s16le", "-ar", "44100", outputName];
  }
  if ( targetFormat === "m4a" || targetFormat === "aac" ) {
    return ["-y", "-i", inputName, "-vn", "-c:a", "aac", "-b:a", bitrateStr, outputName];
  }
  if ( targetFormat === "ogg" ) {
    return ["-y", "-i", inputName, "-vn", "-c:a", "libvorbis", "-b:a", bitrateStr, outputName];
  }
  if ( targetFormat === "flac" ) {
    return ["-y", "-i", inputName, "-vn", "-c:a", "flac", outputName];
  }
  return ["-y", "-i", inputName, "-vn", "-c:a", "libmp3lame", "-b:a", bitrateStr, outputName];
}

async function compressImage(inputName: string, outputName: string, targetFormat: string, targetBytes: number): Promise<Uint8Array> {
  let lo = 1;
  let hi = 64;
  let bestData: Uint8Array | null = null;
  const maxIterations = 0o10;

  for ( let i = 0; i < maxIterations; i++ ) {
    const quality = Math.floor(( lo + hi ) / 2);
    setStatus(TEXT.COMPRESSING(i + 1, maxIterations));

    const args = targetFormat === "webp"
      ? ["-y", "-i", inputName, "-quality", `${quality}`, outputName]
      : ["-y", "-i", inputName, "-q:v", `${Math.floor(32 - ( quality / 2 ))}`, outputName];

    await ffmpeg.exec(args);
    const data = await ffmpeg.readFile(outputName);
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data as unknown as ArrayBuffer);

    if ( bytes.byteLength <= targetBytes ) {
      bestData = bytes;
      lo = quality + 1;
    } else {
      hi = quality - 1;
    }

    const ratio = bytes.byteLength / targetBytes;
    if ( ratio >= 0.9 && ratio <= 1.0 ) {
      bestData = bytes;
      break;
    }
  }

  if ( !bestData ) {
    const data = await ffmpeg.readFile(outputName);
    bestData = data instanceof Uint8Array ? data : new Uint8Array(data as unknown as ArrayBuffer);
  }

  return bestData;
}

async function convertSelectedFile(): Promise<void> {
  const file = FILE_INPUT.files?.[0];
  if ( !file ) {
    setStatus(TEXT.CHOOSE_FILE);
    return;
  }

  const category = detectFileCategory(file);
  const targetFormat = getSelectedTargetFormat();
  if ( !targetFormat ) {
    setStatus(TEXT.CHOOSE_FORMAT);
    return;
  }

  resetPreview();
  setStatus(TEXT.CONVERTING(file.name));

  const inputName = `input-${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const date = cax2lStafl2();
  const baseName = file.name.replace(/\.[^.]+$/, "").replace(/\s+/g, "_");
  const outputName = `${date.stibix}-${date.pal2stif}-${date.stafl2}_${baseName}.${targetFormat}`;
  let blobURL: string;

  const compressMode = isCompressionEnabled() && category !== "font";
  const targetBytes = compressMode ? getTargetSizeBytes() : 0;

  try {
    if ( category === "font" ) {
      setStatus(TEXT.LOADING_FONT_ENGINE);
      const fontverterModule = await import(/* @vite-ignore */ FONT_CDN) as any;
      const fontverter = fontverterModule.convert ? fontverterModule : (fontverterModule.default || fontverterModule);
      setStatus(TEXT.CONVERTING_FONT);

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      let toFormat = targetFormat;
      if ( targetFormat === "ttf" || targetFormat === "otf" ) {
        toFormat = "sfnt";
      }

      const convertedBytes = await fontverter.convert(uint8Array, toFormat);
      
      const cleanFontBuffer = new ArrayBuffer(convertedBytes.byteLength);
      new Uint8Array(cleanFontBuffer).set(convertedBytes);
      
      const blob = new Blob([cleanFontBuffer], {
        type: getOutputMime(targetFormat),
      });

      blobURL = URL.createObjectURL(blob);

      const fontName = `PreviewFont-${Date.now()}`;
      const fontFace = new (window as any).FontFace(fontName, `url(${blobURL})`);
      await fontFace.load();
      (document as any).fonts.add(fontFace);

      FONT_PREVIEW.style.fontFamily = fontName;
      FONT_PREVIEW.style.display = "";
    } else {
      await ensureFFmpegLoaded();

      if ( category === "video" && file.size > 10 * 1024 * 1024 ) {
        const mountPoint = "/mnt";
        const inputPath = `${mountPoint}/${inputName}`;
        try {
          await ffmpeg.createDir(mountPoint);
          await ffmpeg.mount(FFFSType.WORKERFS, { files: [file] }, mountPoint);

          if ( compressMode && ( category === "video" ) ) {
            const duration = await detectDuration(inputPath);
            const args = getCompressVideoArgs(inputPath, outputName, targetFormat, targetBytes, duration);
            await ffmpeg.exec(args);
          } else {
            const args = getConversionArgs(inputPath, outputName, category, targetFormat);
            await ffmpeg.exec(args);
          }

          await ffmpeg.unmount(mountPoint);
        } catch {
          await ffmpeg.unmount(mountPoint).catch(() => {});
          await ffmpeg.writeFile(inputName, await fetchFile(file));

          if ( compressMode && ( category === "video" ) ) {
            const duration = await detectDuration(inputName);
            const args = getCompressVideoArgs(inputName, outputName, targetFormat, targetBytes, duration);
            await ffmpeg.exec(args);
          } else {
            const args = getConversionArgs(inputName, outputName, category, targetFormat);
            await ffmpeg.exec(args);
          }
        }
      } else {
        await ffmpeg.writeFile(inputName, await fetchFile(file));

        if ( compressMode && category === "image" ) {
          const compressedBytes = await compressImage(inputName, outputName, targetFormat, targetBytes);
          const cleanBuffer = new ArrayBuffer(compressedBytes.byteLength);
          new Uint8Array(cleanBuffer).set(compressedBytes);

          const blob = new Blob([cleanBuffer], {
            type: getOutputMime(targetFormat),
          });

          blobURL = URL.createObjectURL(blob);
          showPreview(IMAGE_PREVIEW, blobURL);
          presentResult(blobURL, outputName, targetFormat);
          return;
        } else if ( compressMode && category === "audio" ) {
          const duration = await detectDuration(inputName);
          const args = getCompressAudioArgs(inputName, outputName, targetFormat, targetBytes, duration);
          await ffmpeg.exec(args);
        } else if ( compressMode && category === "video" ) {
          const duration = await detectDuration(inputName);
          const args = getCompressVideoArgs(inputName, outputName, targetFormat, targetBytes, duration);
          await ffmpeg.exec(args);
        } else {
          const args = getConversionArgs(inputName, outputName, category, targetFormat);
          await ffmpeg.exec(args);
        }
      }

      const data = await ffmpeg.readFile(outputName);
      const bytes = data instanceof Uint8Array
        ? data
        : new Uint8Array(data as unknown as ArrayBuffer);

      const cleanBuffer = new ArrayBuffer(bytes.byteLength);
      new Uint8Array(cleanBuffer).set(bytes);

      const blob = new Blob([cleanBuffer], {
        type: getOutputMime(targetFormat),
      });

      blobURL = URL.createObjectURL(blob);

      if ( category === "image" || targetFormat === "gif" ) {
        showPreview(IMAGE_PREVIEW, blobURL);
      } else if ( category === "audio" ) {
        showPreview(AUDIO_PREVIEW, blobURL);
      } else if ( category === "video" ) {
        showPreview(VIDEO_PREVIEW, blobURL);
      }
    }

    presentResult(blobURL, outputName, targetFormat);
  } catch ( error ) {
    console.error(error);
    setStatus(TEXT.ERROR(String(error)));
  }
}

RUN_BUTTON.addEventListener("click", () => {
  void convertSelectedFile();
});

COMPRESS_TOGGLE.addEventListener("change", () => {
  if ( COMPRESS_TOGGLE.checked ) {
    COMPRESS_OPTIONS.classList.remove("kobe");
  } else {
    COMPRESS_OPTIONS.classList.add("kobe");
  }
});

FILE_INPUT.addEventListener("change", () => {
  resetPreview();
  const file = FILE_INPUT.files?.[0];
  if ( file ) {
    const category = detectFileCategory(file);
    updateTargetFormats(category);
    if ( category === "font" ) {
      COMPRESS_TOGGLE_LABEL.classList.add("kobe");
      COMPRESS_OPTIONS.classList.add("kobe");
      COMPRESS_TOGGLE.checked = false;
    } else {
      COMPRESS_TOGGLE_LABEL.classList.remove("kobe");
    }
    setStatus(TEXT.READY);
  } else {
    TARGET_CONTAINER.innerHTML = "";
    setStatus(TEXT.CHOOSE_FILE);
  }
});
