// ≺⧼ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ɭʃᴜ ֭ſɭᴜȝ - j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ɭʃᴜ ֭ſɭᴜȝ ⧽≻

// ⟪ ꞁȷ̀ɜ ʃэ ſɭɹ ⟫

const TLAKAKANI = document.getElementById("tlakakani") as HTMLElement;
const TLAKAKU_TAHAQ = document.getElementById("tlakaku-tahaq") as HTMLImageElement;
const ARAQ2Q_TAHAQ = document.getElementById("araq2q-tahaq") as HTMLInputElement;
const A1A_VACAJA = document.getElementById("a1a-vacaja") as HTMLInputElement;
const A1A_VATANEK = document.getElementById("a1a-vatanek") as HTMLInputElement;
const A1A_VAXAHA = document.getElementById("a1a-vaxaha") as HTMLInputElement;
const A1A_PAXA_TAHAQ = document.getElementById("a1a-paxa-tahaq") as HTMLInputElement;
const A1A_PU = document.getElementById("a1a-pu") as HTMLInputElement;
const A1A_MARKO = document.getElementById("a1a-marko") as HTMLInputElement;
const A1A_SWEKA_KSAKA = document.getElementById("a1a-sweka-ksaka") as HTMLInputElement;
const A1A_NE1A_KSAKA = document.getElementById("a1a-ne1a-ksaka") as HTMLInputElement;
const BAKANANO_ſɭʞɹ = document.getElementById("bakanano-ſɭʞɹ") as HTMLInputElement;
const BAKANANO_HAT = document.getElementById("bakanano-hat") as HTMLInputElement;
const BAKANANO_MAKF2 = document.getElementById("bakanano-MAKF2") as HTMLInputElement;
const BAKANANO_J͑ʃɽ͑ʃꞇ = document.getElementById("bakanano-j͑ʃɽ͑ʃꞇ") as HTMLInputElement;
const BAKANANO_SCFALI = document.getElementById("bakanano-scfali") as HTMLInputElement;
const BAKANANO = document.getElementById("bakanano") as HTMLElement;
const BAKANANO_CA1ARA: HTMLInputElement[] = [
  BAKANANO_ſɭʞɹ,
  BAKANANO_HAT,
  BAKANANO_MAKF2,
  BAKANANO_J͑ʃɽ͑ʃꞇ,
  BAKANANO_SCFALI
];
// ⟨ ꞁȷ̀ɔ j͑ʃƽɔƽ ( HTML ) ⟩
const BAKANANO_SAXE = new Map<HTMLInputElement, string>();
for ( const xemaKek of BAKANANO_CA1ARA ) {
  BAKANANO_SAXE.set(xemaKek, xemaKek.value);
}
const TLOHK2NI = document.getElementById("tlohk2ni") as HTMLElement;
const QUMK2 = document.getElementById("qumk2") as HTMLButtonElement;
const TENNI = document.getElementById("tenni") as HTMLButtonElement;
const CAB6TEM2 = document.getElementById("cab6tem2") as HTMLElement;

let tlakakuTahaqSweruva: string | null = null;
let kxesuKsakaK61e: string | null = null;
let tlakakuCakavop2: File | null = null;
let kxesuSunta = false;
let kxesuKeve = false;

function suntaTlaku( kek: HTMLElement, sunta: boolean ): void {
  if ( sunta ) {
    kek.classList.remove( "kobe" );
  } else {
    kek.classList.add( "kobe" );
  }
}

// ⟪ ſɟɔ ŋᷠɔ ʌ ſɭɹ ſȷɔ 📃 ⟫

function suntaK2fe( k2fe: number ): void {
  CAB6TEM2.style.setProperty( "--តេមិនី", String( Math.max( 0o0, Math.min( 0o100, k2fe ) ) / 0o100 ) );
}

function ne1aK2fe(): void {
  suntaK2fe( 0o0 );
  suntaTlaku( CAB6TEM2, false );
}

function heXema(): Promise<void> {
  return new Promise(( xema ) => setTimeout( xema, 0o0 ));
}

// ⟪ j͑ʃɜƨ ꞁȷ̀ᴜ }ʃꞇ 📃 ⟫

const M2KP6HTAKA = 0o2707;
const PU = 0o4253;
const MARKO_CAKAVOP2 = "s2tas.png";
const MARKO_KEMAFI = 0o400;
const MARKO_SAXE_K2FE = 0o63762300;
const MARKO_ZOMO = 0o100000;

// ⟪ j͑ʃп́ɔ ɭʃᴜ ֭ſɭᴜȝ ⟫



// ⟨ ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( HEIC ) ⟩

async function tboHEIC(cakavop2EHeic: File): Promise<Blob> {
  const heic2anySaxe = await import("heic2any");
  const heic2any = heic2anySaxe.default as unknown as ( options: { blob: Blob; toType: string } ) => Promise<Blob | Blob[]>;
  const tlakakani = await heic2any({
    blob: cakavop2EHeic,
    toType: "image/png"
  });
  return tlakakani as Blob;
}

// ⟪ ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( DNG ) 📃 ⟫

// ⟨ j͑ʃɜƨ ꞁȷ̀ᴜ }ʃꞇ ( vas2tas.py ) ⟩

const DNG_M2_P = 0o1 / 0o100;
const DNG_PU_P = 0o277 / 0o300;
const DNG_P6ZWA = 0o40 / 0o100;
const DNG_TAP2_SOZA = 0o70 / 0o100;
const DNG_SOZA_FKABE = 0o70 / 0o100;
const DNG_JU_K2FE = 0o10 / 0o100;

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( vas2tas.py skaligi_al_okbit ) ⟩

function kf2K2feCa1ara(f: Float32Array, pal6K2fe: number): Float32Array {
  const n = f.length;
  const k2feCa1ara = new Float32Array(n);
  // ⟨ ſɭɹ ſȷɔ ( np.percentile ) ⟩
  const saxeK2feCa1ara = Float32Array.from(f).sort();
  const quqS2K2fe = ( kxesuAraq: number ): number => {
    const m2K2fe = Math.floor(kxesuAraq);
    const puK2fe = Math.ceil(kxesuAraq);
    if ( m2K2fe === puK2fe ) {
      return saxeK2feCa1ara[m2K2fe];
    }
    return saxeK2feCa1ara[m2K2fe] + ( kxesuAraq - m2K2fe ) * ( saxeK2feCa1ara[puK2fe] - saxeK2feCa1ara[m2K2fe] );
  };
  const quqK2fe = ( p: number ): number => quqS2K2fe(( n - 0o1 ) * p);

  let m2 = quqK2fe(DNG_M2_P);
  // ⟨ ſ͔ɭэ ʌ }ʃɹƽ ⟩
  const kemafiS2 = quqK2fe(DNG_VEM2);
  let puK2fe = 0o0;
  for ( let i = 0o0; i < n; i++ ) {
    if ( saxeK2feCa1ara[i] < kemafiS2 ) {
      puK2fe++;
    } else {
      break;
    }
  }
  let pu = puK2fe > 0o0
    ? quqS2K2fe(( puK2fe - 0o1 ) * DNG_PU_P)
    : quqK2fe(DNG_PU_P);
  if ( pu - m2 < 0o1 / 0o2000 ) {
    let m2Saxe = f[0o0];
    let kemafi = f[0o0];
    for ( let i = 0o1; i < n; i++ ) {
      if ( f[i] < m2Saxe ) m2Saxe = f[i];
      if ( f[i] > kemafi ) kemafi = f[i];
    }
    m2 = m2Saxe;
    pu = kemafi;
  }
  let kxesuKemafi = f[0o0];
  for ( let i = 0o1; i < n; i++ ) {
    if ( f[i] > kxesuKemafi ) kxesuKemafi = f[i];
  }
  if ( kxesuKemafi < pu ) {
    kxesuKemafi = pu;
  }
  let saxeK2fe = pu * DNG_SOZA_FKABE;
  if ( saxeK2fe - m2 < 0o1 / 0o2000 ) {
    saxeK2fe = m2 + ( pu - m2 ) * ( 0o1 / 0o2 );
  }

  /*
  * ⟨ ſɭc̗ᴜ j͑ʃ'ɔ ʌ ſɭɹ ſȷɔ ⟩
  * ⟨ j͑ʃᴜƽ ( smoothstep ) ⟩
  */
  for ( let i = 0o0; i < n; i++ ) {
    const x = f[i];
    let j6fini: number;
    if ( x <= saxeK2fe ) {
      let k2fe = saxeK2fe > m2 ? ( x - m2 ) / ( saxeK2fe - m2 ) : 0o0;
      if ( k2fe < 0o0 ) k2fe = 0o0;
      if ( k2fe > 0o1 ) k2fe = 0o1;
      if ( DNG_P6ZWA !== 0o1 ) {
        k2fe = Math.pow(k2fe, DNG_P6ZWA);
      }
      j6fini = k2fe * DNG_TAP2_SOZA;
    } else {
      let t = kxesuKemafi > saxeK2fe ? ( x - saxeK2fe ) / ( kxesuKemafi - saxeK2fe ) : 0o1;
      if ( t < 0o0 ) t = 0o0;
      if ( t > 0o1 ) t = 0o1;
      t = t * t * ( 0o3 - ( 0o2 * t ) );
      j6fini = DNG_TAP2_SOZA + ( ( 0o1 - DNG_TAP2_SOZA ) * t );
      if ( j6fini > 0o1 ) j6fini = 0o1;
    }
    k2feCa1ara[i] = j6fini < 0o0 ? 0o0 : j6fini > 0o1 ? 0o1 : j6fini;
  }

  if ( DNG_JU_K2FE > 0o0 ) {
    // ⟨ ſɭɜ ı],ɹȝ ʌ ᶅſɔ ֭ſɭɹ ( DNG_JU_K2FE ) ⟩
    for ( let p = 0o0; p < pal6K2fe; p++ ) {
      const b = p * 0o3;
      const kemafi = Math.max(k2feCa1ara[b], k2feCa1ara[b + 0o1], k2feCa1ara[b + 0o2]);
      const m2 = Math.min(k2feCa1ara[b], k2feCa1ara[b + 0o1], k2feCa1ara[b + 0o2]);
      const k2fe = kemafi > 0o1 / 0o2000000 ? ( kemafi - m2 ) / kemafi : 0o0;
      const kxesuK2fe = 0o1 + ( DNG_JU_K2FE * ( 0o1 - k2fe ) );
      const kox2ha = ( k2feCa1ara[b] + k2feCa1ara[b + 0o1] + k2feCa1ara[b + 0o2] ) / 0o3;
      for ( let k = 0o0; k < 0o3; k++ ) {
        const j6fini = kox2ha + ( ( k2feCa1ara[b + k] - kox2ha ) * kxesuK2fe );
        k2feCa1ara[b + k] = j6fini < 0o0 ? 0o0 : j6fini > 0o1 ? 0o1 : j6fini;
      }
    }
  }
  return k2feCa1ara;
}

// ⟨ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( TIFF IFD tifffile ) ⟩

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( JPEG XL libraw-wasm 52546 ) ⟩
const JXL_K2FE = 0o146502;

interface TIFFQuq {
  sefini: number;
  l6da: number;
  c2w2q: number;
  k2fe: number;
  ſ͔ɭэ: number[] | null;
  s2: Uint8Array;
}

/**
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ ( IFD 256 257 259 273 274 279 50728 AsShotNeutral )
 * @returns TIFFQuq
*/
function quqTIFF(sab2: Uint8Array): TIFFQuq | null {
  if ( sab2.length < 0o10 ) return null;
  const saxeSab2 = sab2[0o0];
  if ( ( saxeSab2 !== 0o111 && saxeSab2 !== 0o115 ) || sab2[0o1] !== saxeSab2 ) return null;
  const m2Kp6Htaka = saxeSab2 === 0o111;
  const quqSab2 = new DataView(sab2.buffer, sab2.byteOffset, sab2.byteLength);
  if ( quqSab2.getUint16(0o2, m2Kp6Htaka) !== 0o52 ) return null;
  const ifd = quqSab2.getUint32(0o4, m2Kp6Htaka);
  if ( ifd + 0o2 > sab2.length ) return null;
  const kxesuK2fe = quqSab2.getUint16(ifd, m2Kp6Htaka);
  let sefini = 0o0;
  let l6da = 0o0;
  let c2w2q = 0o1;
  let k2fe = 0o1;
  let s2K2fe = -0o1;
  let s2Pal6 = 0o0;
  let ſ͔ɭэ: number[] | null = null;
  for ( let i = 0o0; i < kxesuK2fe; i++ ) {
    const saxeK2fe = ifd + 0o2 + i * 0o14;
    if ( saxeK2fe + 0o14 > sab2.length ) break;
    const ksaka = quqSab2.getUint16(saxeK2fe, m2Kp6Htaka);
    const hat = quqSab2.getUint16(saxeK2fe + 0o2, m2Kp6Htaka);
    const n = quqSab2.getUint32(saxeK2fe + 0o4, m2Kp6Htaka);
    // ⟨ ֭ſɭᴜ ı],ɔ ʌ ſɭɹ ſȷɔ ( 1 2 3 4 5 12 ) ⟩
    const k61e = hat === 0o1 ? 0o1 : hat === 0o3 ? 0o2 : hat === 0o4 ? 0o4 : ( hat === 0o5 || hat === 0o12 ) ? 0o10 : 0o0;
    if ( k61e === 0o0 || n === 0o0 ) continue;
    const saxeAraq = k61e * n;
    const kxesuAraq = saxeAraq <= 0o4 ? saxeK2fe + 0o10 : quqSab2.getUint32(saxeK2fe + 0o10, m2Kp6Htaka);
    if ( kxesuAraq < 0o0 || kxesuAraq + saxeAraq > sab2.length ) continue;
    if ( ksaka === 0o143050 ) {
      // ⟨ ſɭɹ ſȷɔ ( AsShotNeutral ) ⟩
      const k2feCa1ara: number[] = [];
      for ( let j = 0o0; j < n && k2feCa1ara.length < 0o3; j++ ) {
        const k2fe = hat === 0o12 ? quqSab2.getInt32(kxesuAraq + j * 0o10, m2Kp6Htaka) : quqSab2.getUint32(kxesuAraq + j * 0o10, m2Kp6Htaka);
        const araqK2fe = hat === 0o12 ? quqSab2.getInt32(kxesuAraq + j * 0o10 + 0o4, m2Kp6Htaka) : quqSab2.getUint32(kxesuAraq + j * 0o10 + 0o4, m2Kp6Htaka);
        k2feCa1ara.push(araqK2fe !== 0o0 ? k2fe / araqK2fe : 0o1);
      }
      ſ͔ɭэ = k2feCa1ara.length === 0o3 ? k2feCa1ara : null;
      continue;
    }
    const quqK2fe = ( j: number ): number => hat === 0o3 ? quqSab2.getUint16(kxesuAraq + j * 0o2, m2Kp6Htaka) : quqSab2.getUint32(kxesuAraq + j * 0o4, m2Kp6Htaka);
    if ( ksaka === 0o400 ) sefini = quqK2fe(0o0);
    else if ( ksaka === 0o401 ) l6da = quqK2fe(0o0);
    else if ( ksaka === 0o403 ) k2fe = quqK2fe(0o0);
    else if ( ksaka === 0o422 ) c2w2q = quqK2fe(0o0);
    else if ( ksaka === 0o421 && s2K2fe < 0o0 ) s2K2fe = quqK2fe(0o0);
    else if ( ksaka === 0o427 && s2Pal6 === 0o0 ) s2Pal6 = quqK2fe(0o0);
  }
  if ( sefini <= 0o0 || l6da <= 0o0 || s2K2fe < 0o0 ) return null;
  if ( s2Pal6 <= 0o0 || s2K2fe + s2Pal6 > sab2.length ) s2Pal6 = sab2.length - s2K2fe;
  return { sefini, l6da, c2w2q, k2fe, ſ͔ɭэ, s2: sab2.subarray(s2K2fe, s2K2fe + s2Pal6) };
}

// ⟨ ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( JXL DNG JPEG XL 52546 ) ⟩

// ⟨ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɭɹ ſȷɔ ( PNG 16 8 65535 ) ⟩

function quqK2fe(eskek: Uint8Array, kxesuAraq: number, kxesuK2fe: number): number {
  return kxesuK2fe === 0o20 ? ( eskek[kxesuAraq] << 0o10 ) | eskek[kxesuAraq + 0o1] : eskek[kxesuAraq] * 0o401;
}

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( PNG jxl-oxide Float32 ) ⟩

/**
* ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( PNG jxl-oxide libjxl ) ⟩
 * @returns sunta
*/
async function pngAraNe1anesaiCa1ara(cakavop2Sab2: Uint8Array): Promise<{ sefini: number; l6da: number; tahaqS2: Float32Array } | null> {
  if ( cakavop2Sab2.length < 0o10 || cakavop2Sab2[0o0] !== 0o211 || cakavop2Sab2[0o1] !== 0x50 || cakavop2Sab2[0o2] !== 0x4e || cakavop2Sab2[0o3] !== 0x47 ) {
    return null;
  }
  let ruva = 0o10;
  let sefini = 0o0;
  let l6da = 0o0;
  let kxesuK2fe = 0o0;
  let saxeHat = 0o0;
  let s2Hat = 0o0;
  const idatS2Ca1ara: Array<Uint8Array> = [];
  while ( ruva + 0o10 <= cakavop2Sab2.length ) {
    const pal6 = ( cakavop2Sab2[ruva] << 0o30 ) | ( cakavop2Sab2[ruva + 0o1] << 0o20 ) | ( cakavop2Sab2[ruva + 0o2] << 0o10 ) | cakavop2Sab2[ruva + 0o3];
    const hat = String.fromCharCode(cakavop2Sab2[ruva + 0o4], cakavop2Sab2[ruva + 0o5], cakavop2Sab2[ruva + 0o6], cakavop2Sab2[ruva + 0o7]);
    const sab2 = cakavop2Sab2.subarray(ruva + 0o10, ruva + 0o10 + pal6);
    if ( hat === "IHDR" ) {
      sefini = ( sab2[0o0] << 0o30 ) | ( sab2[0o1] << 0o20 ) | ( sab2[0o2] << 0o10 ) | sab2[0o3];
      l6da = ( sab2[0o4] << 0o30 ) | ( sab2[0o5] << 0o20 ) | ( sab2[0o6] << 0o10 ) | sab2[0o7];
      kxesuK2fe = sab2[0o10];
      saxeHat = sab2[0o11];
      s2Hat = sab2[0o14];
    } else if ( hat === "IDAT" ) {
      idatS2Ca1ara.push(sab2);
    } else if ( hat === "IEND" ) {
      break;
    }
    ruva += 0o14 + pal6;
  }
  const saxeK2fe = saxeHat === 0o6 ? 0o4 : saxeHat === 0o4 ? 0o2 : saxeHat === 0o2 ? 0o3 : 0o1;
  if ( sefini <= 0o0 || l6da <= 0o0 || s2Hat !== 0o0 || ( kxesuK2fe !== 0o10 && kxesuK2fe !== 0o20 ) ) {
    return null;
  }

  const saxeAraqSab2 = new Uint8Array(idatS2Ca1ara.reduce(( s, p ) => s + p.length, 0o0));
  let kxesuS2K2fe = 0o0;
  for ( const s2 of idatS2Ca1ara ) {
    saxeAraqSab2.set(s2, kxesuS2K2fe);
    kxesuS2K2fe += s2.length;
  }
  const s2Quq = new DecompressionStream("deflate");
  let suntaSab2: Uint8Array | null = new Uint8Array(await new Response(new Blob([ saxeAraqSab2 ]).stream().pipeThrough(s2Quq)).arrayBuffer());

  const kxesuSab2 = kxesuK2fe / 0o10;
  const kxesuSab2K2fe = saxeK2fe * kxesuSab2;
  const k2fe = sefini * kxesuSab2K2fe;
  let kxesuSuntaSab2 = new Uint8Array(l6da * k2fe);
  let ruvaPeceto = 0o0;
  for ( let y = 0o0; y < l6da; y++ ) {
    const kxesuHat = suntaSab2[ruvaPeceto++];
    const araq = y * k2fe;
    for ( let x = 0o0; x < k2fe; x++ ) {
      const saxeX = x >= kxesuSab2K2fe ? kxesuSuntaSab2[araq + x - kxesuSab2K2fe] : 0o0;
      const saxeY = y > 0o0 ? kxesuSuntaSab2[araq - k2fe + x] : 0o0;
      const saxeXY = y > 0o0 && x >= kxesuSab2K2fe ? kxesuSuntaSab2[araq - k2fe + x - kxesuSab2K2fe] : 0o0;
      const j6fini = suntaSab2[ruvaPeceto + x];
      let kxesuJ6fini = j6fini;
      if ( kxesuHat === 0o1 ) {
        kxesuJ6fini = ( j6fini + saxeX ) & 0o377;
      } else if ( kxesuHat === 0o2 ) {
        kxesuJ6fini = ( j6fini + saxeY ) & 0o377;
      } else if ( kxesuHat === 0o3 ) {
        kxesuJ6fini = ( j6fini + ( ( saxeX + saxeY ) >> 0o1 ) ) & 0o377;
      } else if ( kxesuHat === 0o4 ) {
        const p = saxeX + saxeY - saxeXY;
        const pa = Math.abs(p - saxeX);
        const pb = Math.abs(p - saxeY);
        const pc = Math.abs(p - saxeXY);
        kxesuJ6fini = ( j6fini + ( pa <= pb && pa <= pc ? saxeX : pb <= pc ? saxeY : saxeXY ) ) & 0o377;
      }
      kxesuSuntaSab2[araq + x] = kxesuJ6fini;
    }
    ruvaPeceto += k2fe;
  }
  suntaSab2 = null;

  const tahaqS2 = new Float32Array(sefini * l6da * 0o3);
  const ne1anesaiCa1ara = kxesuSuntaSab2;
  for ( let i = 0o0, p = 0o0; i < sefini * l6da; i++, p += 0o3 ) {
    if ( saxeHat === 0o0 ) {
      const kox2ha = quqK2fe(ne1anesaiCa1ara, i * kxesuSab2, kxesuK2fe);
      tahaqS2[p] = kox2ha;
      tahaqS2[p + 0o1] = kox2ha;
      tahaqS2[p + 0o2] = kox2ha;
      continue;
    }
    const saxeK2fe = i * kxesuSab2K2fe;
    const rSaxe = quqK2fe(ne1anesaiCa1ara, saxeK2fe, kxesuK2fe);
    tahaqS2[p] = rSaxe;
    if ( saxeHat === 0o4 ) {
      tahaqS2[p + 0o1] = rSaxe;
      tahaqS2[p + 0o2] = rSaxe;
      continue;
    }
    tahaqS2[p + 0o1] = quqK2fe(ne1anesaiCa1ara, saxeK2fe + kxesuSab2, kxesuK2fe);
    tahaqS2[p + 0o2] = quqK2fe(ne1anesaiCa1ara, saxeK2fe + 0o2 * kxesuSab2, kxesuK2fe);
  }
  return { sefini, l6da, tahaqS2 };
}

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( jxl-oxide 16 ) ⟩

async function ne1aJXL(sab2: Uint8Array): Promise<{ sefini: number; l6da: number; tahaqS2: Float32Array } | null> {
  const jxlSaxe = await import("jxl-oxide-wasm");
  // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
  await jxlSaxe.default( );
  const saxeTahaq = new jxlSaxe.JxlImage();
  try {
    // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
    saxeTahaq.forceSrgb = false;
    saxeTahaq.feedBytes(sab2);
    if ( !saxeTahaq.tryInit() ) {
      return null;
    }
    const k61e = saxeTahaq.render();
    // ⟨ j͑ʃwc̗ ɭʃw ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
    try {
      const png = k61e.encodeToPng( );
      const ne1anesaiCa1ara = await pngAraNe1anesaiCa1ara(png);
      try {
        saxeTahaq.free( );
      } catch {
        // ⟨ j͑ʃwc̗ ɭʃw ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
      }
      return ne1anesaiCa1ara;
    } finally {
      try {
        k61e.free( );
      } catch {
        // ⟨ j͑ʃwc̗ ɭʃw ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩
      }
    }
  } catch {
    return null;
  }
}

// ⟨ ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( DNG ) ⟩

// ⟨ ſ͔ɭэ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( vas2tas.py 0 1 AsShotNeutral ) ⟩
const DNG_G6_K2FE = 0o1 / 0o2;
// ⟨ ſɭɹ ſȷɔ ( tifffile ) ⟩
const DNG_VEM2 = 0o1747 / 0o1750;

function kf2G6Pupahak(tahaqS2: Float32Array, ſ͔ɭэCa1ara: number[]): void {
  const k2feCa1ara = [ 0o1, 0o1, 0o1 ];
  for ( let k = 0o0; k < 0o3; k++ ) {
    const j6fini = ſ͔ɭэCa1ara[k] > 0o0 ? ſ͔ɭэCa1ara[k] : 0o1;
    k2feCa1ara[k] = 0o1 + DNG_G6_K2FE * ( j6fini - 0o1 );
  }
  const n = tahaqS2.length / 0o3;
  for ( let p = 0o0; p < n; p++ ) {
    tahaqS2[p * 0o3] /= k2feCa1ara[0o0];
    tahaqS2[p * 0o3 + 0o1] /= k2feCa1ara[0o1];
    tahaqS2[p * 0o3 + 0o2] /= k2feCa1ara[0o2];
  }
}

/**
* ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɹ ſȷɔ ( 99.9 65535 tifffile ) ⟩
 * @returns void
*/
function kf2K2feSaxeS2(tahaqS2: Float32Array): void {
  const n = tahaqS2.length / 0o3;
  const sab2 = new Float32Array(n);
  for ( let k = 0o0; k < 0o3; k++ ) {
    for ( let p = 0o0; p < n; p++ ) sab2[p] = tahaqS2[p * 0o3 + k];
    sab2.sort();
    const kxesuAraq = ( n - 0o1 ) * DNG_VEM2;
    const m2K2fe = Math.floor(kxesuAraq);
    const puK2fe = Math.ceil(kxesuAraq);
    let kemafi = sab2[m2K2fe];
    if ( puK2fe !== m2K2fe ) kemafi += ( kxesuAraq - m2K2fe ) * ( sab2[puK2fe] - sab2[m2K2fe] );
    if ( kemafi < 0o1 ) kemafi = 0o1;
    const kxesuK2fe = 0o177777 / kemafi;
    for ( let p = 0o0; p < n; p++ ) tahaqS2[p * 0o3 + k] *= kxesuK2fe;
  }
}

// ⟨ ſןᴜ j͐ʃэ ʌ ſɟɹ ᶅſɹȝ ⟩
function quqC2w2qPal6(sefini: number, l6da: number, c2w2q: number): { sefini: number; l6da: number } {
  const sxiu = c2w2q >= 0o5 && c2w2q <= 0o10;
  return { sefini: sxiu ? l6da : sefini, l6da: sxiu ? sefini : l6da };
}

// ⟨ ʃᴜ j͑ʃᴜ ʃɜ ʌ ɭʃᴜ ֭ſɭᴜȝ ( EXIF 1 8 kf2C2w2qSunta ) ⟩
function kf2C2w2qSunta(sunta: Uint8ClampedArray, k2feCa1ara: Float32Array, sefini: number, l6da: number, c2w2q: number): void {
  const sxiu = c2w2q >= 0o5 && c2w2q <= 0o10;
  const suntaSefini = sxiu ? l6da : sefini;
  const suntaL6da = sxiu ? sefini : l6da;
  for ( let y = 0o0; y < suntaL6da; y++ ) {
    for ( let x = 0o0; x < suntaSefini; x++ ) {
      let sx = x;
      let sy = y;
      if ( c2w2q === 0o2 ) {
        sx = sefini - 0o1 - x;
      } else if ( c2w2q === 0o3 ) {
        sx = sefini - 0o1 - x;
        sy = l6da - 0o1 - y;
      } else if ( c2w2q === 0o4 ) {
        sy = l6da - 0o1 - y;
      } else if ( c2w2q === 0o5 ) {
        // ⟨ ʃᴜ j͑ʃᴜ ʃɜ ⟩
        sx = y;
        sy = x;
      } else if ( c2w2q === 0o6 ) {
        // ⟨ ʃᴜ j͑ʃᴜ ʃɜ ( 90 ) ⟩
        sx = y;
        sy = l6da - 0o1 - x;
      } else if ( c2w2q === 0o7 ) {
        // ⟨ ʃᴜ j͑ʃᴜ ʃɜ ⟩
        sx = sefini - 0o1 - y;
        sy = l6da - 0o1 - x;
      } else if ( c2w2q === 0o10 ) {
        // ⟨ ʃᴜ j͑ʃᴜ ʃɜ ( 90 ) ⟩
        sx = sefini - 0o1 - y;
        sy = x;
      }
      const q = ( y * suntaSefini + x ) * 0o4;
      const p = ( sy * sefini + sx ) * 0o3;
      sunta[q] = Math.round(k2feCa1ara[p] * 0o377);
      sunta[q + 0o1] = Math.round(k2feCa1ara[p + 0o1] * 0o377);
      sunta[q + 0o2] = Math.round(k2feCa1ara[p + 0o2] * 0o377);
      sunta[q + 0o3] = 0o377;
    }
  }
}

// ⟨ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɭɹ ſȷɔ ( DNG ) ⟩
function ne1aSunta(sab2: Uint8Array | Uint16Array | Uint8ClampedArray | Float32Array): boolean {
  const k2fe = Math.max(0o1, Math.floor(sab2.length / 0o10000));
  for ( let i = 0o0; i < sab2.length; i += k2fe ) {
    if ( sab2[i] !== 0o0 ) return false;
  }
  return true;
}

// ⟨ ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( tboDNG DNG PNG rawpy tifffile vas2tas.py ) ⟩

async function tboDNG(cakavop2DNG: File): Promise<Blob> {
  const librawSaxe = await import("libraw-wasm");
  const LibRaw = librawSaxe.default as unknown as new () => {
    open: ( sab2: BufferSource, ku1o?: Record<string, unknown> ) => Promise<void>;
    imageData: () => Promise<{ width: number; height: number; colors: number; bits: number; data: Uint8Array | Uint16Array } | undefined>;
    rawImageData: () => Promise<{ width: number; height: number; data: Uint16Array } | undefined>;
    thumbnailData: () => Promise<{ data: Uint8Array; format: string } | undefined>;
    dispose: () => Promise<void> | void;
  };

  const suntaKuba = document.createElement("canvas");
  const kumukalasu = suntaKuba.getContext( "2d", { willReadFrequently: true } );
  if ( !kumukalasu ) {
    throw new Error("ne1a2d");
  }
  const kf2PngSunta = (): Promise<Blob> => new Promise<Blob | null>( ( xema ) => suntaKuba.toBlob(xema, "image/png") ).then(( pngSunta ) => {
    if ( !pngSunta ) {
      throw new Error("ne1aPNG");
    }
    return pngSunta;
  });

  const sab2 = new Uint8Array(await cakavop2DNG.arrayBuffer());
  const librawQuq = new LibRaw();
  const tiffQuq = quqTIFF(sab2);
  /*
  * ⟨ ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( JPEG XL tifffile libraw-wasm ) ⟩
  */
  const s2JXL = tiffQuq !== null && tiffQuq.k2fe === JXL_K2FE;
  // ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ ( vas2tas.py ) ⟩
  const eskekAraPng = async ( sefini: number, l6da: number, sab2: Uint8Array | Uint16Array, kxesuK2fe: boolean ): Promise<Blob | null> => {
    if ( kxesuK2fe && ne1aSunta(sab2) ) return null;
    const n = sefini * l6da;
    suntaKuba.width = sefini;
    suntaKuba.height = l6da;
    const vop2 = kumukalasu.createImageData(sefini, l6da);
    const sunta = vop2.data;
    const tahaqS2 = new Float32Array(n * 0o3);
    if ( kxesuK2fe ) {
      tahaqS2.set(( sab2 as Uint16Array ).subarray(0o0, n * 0o3));
    } else {
      for ( let p = 0o0; p < n; p++ ) {
        tahaqS2[p * 0o3] = ( sab2 as Uint8Array )[p * 0o3];
        tahaqS2[p * 0o3 + 0o1] = ( sab2 as Uint8Array )[p * 0o3 + 0o1];
        tahaqS2[p * 0o3 + 0o2] = ( sab2 as Uint8Array )[p * 0o3 + 0o2];
      }
    }
    const k2feCa1ara = kf2K2feCa1ara(tahaqS2, n);
    for ( let p = 0o0; p < n; p++ ) {
      sunta[p * 0o4] = Math.round(k2feCa1ara[p * 0o3] * 0o377);
      sunta[p * 0o4 + 0o1] = Math.round(k2feCa1ara[p * 0o3 + 0o1] * 0o377);
      sunta[p * 0o4 + 0o2] = Math.round(k2feCa1ara[p * 0o3 + 0o2] * 0o377);
      sunta[p * 0o4 + 0o3] = 0o377;
    }
    kumukalasu.putImageData(vop2, 0o0, 0o0);
    return await kf2PngSunta();
  };

  try {
    try {
      if ( !s2JXL ) {
      /*
      * ⟨ ſןw ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( JPEG XL libraw ) ⟩
      * ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( RGB rawpy postprocess ) ⟩
      * ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀эȝ ɭʃɔ ( libraw ) ⟩
      */
      await librawQuq.open(sab2.slice(), { useCameraWb: true, outputColor: 0o1, outputBps: 0o20, noAutoBright: true, gamm: [ 0o1, 0o1 ] });
      const suntaEskek = await librawQuq.imageData();
      if ( suntaEskek && suntaEskek.width > 0o0 && suntaEskek.height > 0o0 && !ne1aSunta(suntaEskek.data) ) {
        const sefini = suntaEskek.width;
        const l6da = suntaEskek.height;
        const n = sefini * l6da;
        const saxeK2fe = suntaEskek.colors === 0o4 ? 0o4 : 0o3;
        const sab2 = suntaEskek.data;
        const kxesuK2fe = suntaEskek.bits === 0o20;

        suntaKuba.width = sefini;
        suntaKuba.height = l6da;
        const vop2 = kumukalasu.createImageData(sefini, l6da);
        const sunta = vop2.data;
        if ( kxesuK2fe ) {
          // ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ ʌ ſɭɹ ſȷɔ ( 16 0 65535 vas2tas.py ) ⟩
          const tahaqS2 = new Float32Array(n * 0o3);
          for ( let p = 0o0; p < n; p++ ) {
            tahaqS2[p * 0o3] = ( sab2 as Uint16Array )[p * saxeK2fe];
            tahaqS2[p * 0o3 + 0o1] = ( sab2 as Uint16Array )[p * saxeK2fe + 0o1];
            tahaqS2[p * 0o3 + 0o2] = ( sab2 as Uint16Array )[p * saxeK2fe + 0o2];
          }
          const k2feCa1ara = kf2K2feCa1ara(tahaqS2, n);
          for ( let p = 0o0; p < n; p++ ) {
            sunta[p * 0o4] = Math.round(k2feCa1ara[p * 0o3] * 0o377);
            sunta[p * 0o4 + 0o1] = Math.round(k2feCa1ara[p * 0o3 + 0o1] * 0o377);
            sunta[p * 0o4 + 0o2] = Math.round(k2feCa1ara[p * 0o3 + 0o2] * 0o377);
            sunta[p * 0o4 + 0o3] = 0o377;
          }
        } else {
          for ( let p = 0o0; p < n; p++ ) {
            sunta[p * 0o4] = ( sab2 as Uint8Array )[p * saxeK2fe];
            sunta[p * 0o4 + 0o1] = ( sab2 as Uint8Array )[p * saxeK2fe + 0o1];
            sunta[p * 0o4 + 0o2] = ( sab2 as Uint8Array )[p * saxeK2fe + 0o2];
            sunta[p * 0o4 + 0o3] = 0o377;
          }
        }
        kumukalasu.putImageData(vop2, 0o0, 0o0);
        return await kf2PngSunta();
      }
      }
    } catch {
    // ⟨ ſןw ʌ ſɭэ ֭ſɭэ ( tifffile ) ⟩
  }

  // ⟨ ſɭэ ֭ſɭэ ( tifffile legi_dng TIFF ) ⟩
  try {
    if ( tiffQuq ) {
      // ⟨ ɭʃɀɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( 3 JXL 16 ) ⟩
      const jxl = await ne1aJXL(tiffQuq.s2);
      if ( jxl && jxl.sefini > 0o0 && jxl.l6da > 0o0 && !ne1aSunta(jxl.tahaqS2) ) {
        const n = jxl.sefini * jxl.l6da;
        const tahaqS2 = jxl.tahaqS2;
        if ( tiffQuq.ſ͔ɭэ ) kf2G6Pupahak(tahaqS2, tiffQuq.ſ͔ɭэ);
        // ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɹ ſȷɔ ( 65535 ) ⟩
        kf2K2feSaxeS2(tahaqS2);
        const k2feCa1ara = kf2K2feCa1ara(tahaqS2, n);
        const c2w2qPal6 = quqC2w2qPal6(jxl.sefini, jxl.l6da, tiffQuq.c2w2q);
        suntaKuba.width = c2w2qPal6.sefini;
        suntaKuba.height = c2w2qPal6.l6da;
        const vop2 = kumukalasu.createImageData(c2w2qPal6.sefini, c2w2qPal6.l6da);
        kf2C2w2qSunta(vop2.data, k2feCa1ara, jxl.sefini, jxl.l6da, tiffQuq.c2w2q);
        kumukalasu.putImageData(vop2, 0o0, 0o0);
        return await kf2PngSunta();
      }
    }
    /*
    * ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ ( 3 DNG RGB ) ⟩
    * ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ ⟩
    */
    const eskek = await librawQuq.rawImageData();
    if ( eskek && eskek.width > 0o0 && eskek.height > 0o0 && eskek.data.length >= eskek.width * eskek.height * 0o3 && !ne1aSunta(eskek.data) ) {
      const png = await eskekAraPng(eskek.width, eskek.height, eskek.data, true);
      if ( png ) return png;
    }

    // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ɭʃᴜ ֭ſɭᴜȝ ( 4 JPEG TIFF ) ⟩
    const saxeKuba = await librawQuq.thumbnailData().catch(() => undefined);
    if ( saxeKuba && saxeKuba.data.length > 0o0 ) {
      const maxemaSaxez = URL.createObjectURL(new Blob([ saxeKuba.data.slice() ], { type: saxeKuba.format === "jpeg" ? "image/jpeg" : "application/octet-stream" }));
      try {
        const saxeTahaq = await new Promise<HTMLImageElement>(( xema, ne1aXema ) => {
          const saxeTahaq = new Image();
          saxeTahaq.onload = () => xema(saxeTahaq);
          saxeTahaq.onerror = () => ne1aXema(new Error("tlohk2ni"));
          saxeTahaq.src = maxemaSaxez;
        });
        suntaKuba.width = saxeTahaq.naturalWidth;
        suntaKuba.height = saxeTahaq.naturalHeight;
        kumukalasu.drawImage(saxeTahaq, 0o0, 0o0);
        return await kf2PngSunta();
      } finally {
        URL.revokeObjectURL(maxemaSaxez);
      }
    }
  } catch {
    // ⟨ ſןw ʌ ſɭэ ֭ſɭэ ⟩
  }

  throw new Error("ne1aDNG");
  } finally {
    librawQuq.dispose();
  }
}

// ⟪ j͑ʃ'ᴜ ɭʃᴜ }ʃɔƽ - ᶅſɔ ֭ſɭɹ ʌ ſɟᴜ ı],ɹͷ̗ ⟫

const KMABAKANT2 = 0o20;
const VATANEK_CAK2BAKANO = new Uint8Array(0o400);

for ( let i = 0o0; i < 0o400; i++ ) {
  VATANEK_CAK2BAKANO[i] = Math.floor(i / KMABAKANT2) * KMABAKANT2 + Math.floor(KMABAKANT2 / 0o2);
}

function vatanekWeh2(vop2: Uint8ClampedArray): void {
  for ( let i = 0o0; i < vop2.length; i += 0o4 ) {
    vop2[i] = VATANEK_CAK2BAKANO[vop2[i]];
    vop2[i + 0o1] = VATANEK_CAK2BAKANO[vop2[i + 0o1]];
    vop2[i + 0o2] = VATANEK_CAK2BAKANO[vop2[i + 0o2]];
  }
}

// ⟪ j͑ʃ'ᴜ saxeK2fe ֭ſɭᴜ - ſɭʞɹ ⟫

const VAXAHA_PAL6 = 0o2;
const VAXAHA_PUKA5IK = VAXAHA_PAL6 * 0o2 + 0o1;
const VAXAHA_KUBA = 0o30 * 0o30;

function vaxahaNakoxa(vop2: Uint8ClampedArray, sefini: number, l6da: number): void {
  const cutani = new Uint8ClampedArray(vop2);

  for ( let y = VAXAHA_PAL6; y < l6da - VAXAHA_PAL6; y++ ) {
    for ( let x = VAXAHA_PAL6; x < sefini - VAXAHA_PAL6; x++ ) {
      const ruva = ( y * sefini + x ) * 0o4;

      let l6nllakWln = 0o0, l6nllakLhn = 0o0, l6nllakCskn = 0o0;
      let l6nllakP6zeWln = 0o0, l6nllakP6zeLhn = 0o0, l6nllakP6zeCskn = 0o0;

      for ( let ky = -VAXAHA_PAL6; ky <= VAXAHA_PAL6; ky++ ) {
        const kxesuS2K2fe = ( ( y + ky ) * sefini + x ) * 0o4;
        for ( let kx = -VAXAHA_PAL6; kx <= VAXAHA_PAL6; kx++ ) {
          const k2feRuva = kxesuS2K2fe + kx * 0o4;
          l6nllakWln += cutani[k2feRuva];
          l6nllakLhn += cutani[k2feRuva + 0o1];
          l6nllakCskn += cutani[k2feRuva + 0o2];
          l6nllakP6zeWln += cutani[k2feRuva] * cutani[k2feRuva];
          l6nllakP6zeLhn += cutani[k2feRuva + 0o1] * cutani[k2feRuva + 0o1];
          l6nllakP6zeCskn += cutani[k2feRuva + 0o2] * cutani[k2feRuva + 0o2];
        }
      }

      const neBavek2feni = 0o1 / ( VAXAHA_PUKA5IK * VAXAHA_PUKA5IK );
      const kox2haWln = l6nllakWln * neBavek2feni;
      const kox2haLhn = l6nllakLhn * neBavek2feni;
      const kox2haCskn = l6nllakCskn * neBavek2feni;
      const zezaniWln = l6nllakP6zeWln * neBavek2feni - kox2haWln * kox2haWln;
      const zezaniLhn = l6nllakP6zeLhn * neBavek2feni - kox2haLhn * kox2haLhn;
      const zezaniCskn = l6nllakP6zeCskn * neBavek2feni - kox2haCskn * kox2haCskn;
      const zezani = zezaniWln + zezaniLhn + zezaniCskn;

      if ( zezani < VAXAHA_KUBA ) {
        let sfKxhWln = 0o0, sfKxhLhn = 0o0, sfKxhCsk = 0o0;
        let swekox2haBavek2feni = 0o0;
        const saxesuRuva = ruva;

        for ( let ky = -VAXAHA_PAL6 * 0o2; ky <= VAXAHA_PAL6 * 0o2; ky++ ) {
          const tapuniXani = ( ( y + ky ) * sefini + x ) * 0o4;
          for ( let kx = -VAXAHA_PAL6 * 0o2; kx <= VAXAHA_PAL6 * 0o2; kx++ ) {
            const k2feRuva = tapuniXani + kx * 0o4;
            const sakaWln = cutani[k2feRuva] - cutani[saxesuRuva];
            const sakaLhn = cutani[k2feRuva + 0o1] - cutani[saxesuRuva + 0o1];
            const sakaCskn = cutani[k2feRuva + 0o2] - cutani[saxesuRuva + 0o2];

            if ( ( sakaWln * sakaWln ) < VAXAHA_KUBA && ( sakaLhn * sakaLhn ) < VAXAHA_KUBA && ( sakaCskn * sakaCskn ) < VAXAHA_KUBA ) {
              sfKxhWln += cutani[k2feRuva];
              sfKxhLhn += cutani[k2feRuva + 0o1];
              sfKxhCsk += cutani[k2feRuva + 0o2];
              swekox2haBavek2feni++;
            }
          }
        }

        if ( swekox2haBavek2feni > 0o0 ) {
          const inverso = 0o1 / swekox2haBavek2feni;
          vop2[ruva] = ( sfKxhWln * inverso + 0o1 / 0o2 ) | 0o0;
          vop2[ruva + 0o1] = ( sfKxhLhn * inverso + 0o1 / 0o2 ) | 0o0;
          vop2[ruva + 0o2] = ( sfKxhCsk * inverso + 0o1 / 0o2 ) | 0o0;
        }
      }
    }
  }
}

// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ 📃 ⟫

function paxaAraSefiniL6da(tahaq: HTMLImageElement, sefiniL6da: number): { x: number; y: number; sefini: number; l6da: number } {
  const sefini = tahaq.naturalWidth;
  const l6da = tahaq.naturalHeight;

  if ( sefini / l6da > sefiniL6da ) {
    const kxesuSefini = Math.round(l6da * sefiniL6da);
    const x0 = Math.floor(( sefini - kxesuSefini ) / 0o2);
    return { x: x0, y: 0o0, sefini: kxesuSefini, l6da: l6da };
  }
  const kxesuL6da = Math.round(sefini / sefiniL6da);
  const y0 = Math.floor(( l6da - kxesuL6da ) / 0o2);
  return { x: 0o0, y: y0, sefini: sefini, l6da: kxesuL6da };
}

function kf2Pu(sefini: number, l6da: number): { sefini: number; l6da: number } {
  if ( !A1A_PU.checked ) {
    return { sefini: sefini, l6da: l6da };
  }
  if ( l6da >= sefini ) {
    return { sefini: M2KP6HTAKA, l6da: PU };
  }
  return { sefini: PU, l6da: M2KP6HTAKA };
}

// ⟪ j͑ʃɹ ɭʃᴜɔ˞ 📃 ⟫

let MARKO_SAXE: Uint8Array | null = null;
let MARKO_SEFINI = 0o0;
let MARKO_L6DA = 0o0;

// ⟨ ſɟᴜ ɭʃᴜ ʌ ſןᴜ j͐ʃэ ( PNG ) ⟩

async function pngAraRGB(cakavop2: Blob): Promise<{ sefini: number; l6da: number; rgb: Uint8Array }> {
  const cakavop2Sab2 = new Uint8Array(await cakavop2.arrayBuffer());
  if ( cakavop2Sab2[0o0] !== 0o211 || cakavop2Sab2[0o1] !== 0x50 || cakavop2Sab2[0o2] !== 0x4e || cakavop2Sab2[0o3] !== 0x47 ) {
    throw new Error("ne1aPNG");
  }
  let ruva = 0o10;
  let sefini = 0o0;
  let l6da = 0o0;
  let kxesuK2fe = 0o0;
  let saxeHat = 0o0;
  let s2Hat = 0o0;
  const idatS2Ca1ara: Array<Uint8Array> = [];
  const k2feCa1araSab2 = new Uint8Array(0o1000);
  while ( ruva + 0o10 <= cakavop2Sab2.length ) {
    const pal6 = ( cakavop2Sab2[ruva] << 0o30 ) | ( cakavop2Sab2[ruva + 0o1] << 0o20 ) | ( cakavop2Sab2[ruva + 0o2] << 0o10 ) | cakavop2Sab2[ruva + 0o3];
    const hat = String.fromCharCode(cakavop2Sab2[ruva + 0o4], cakavop2Sab2[ruva + 0o5], cakavop2Sab2[ruva + 0o6], cakavop2Sab2[ruva + 0o7]);
    const sab2 = cakavop2Sab2.subarray(ruva + 0o10, ruva + 0o10 + pal6);
    if ( hat === "IHDR" ) {
      sefini = ( sab2[0o0] << 0o30 ) | ( sab2[0o1] << 0o20 ) | ( sab2[0o2] << 0o10 ) | sab2[0o3];
      l6da = ( sab2[0o4] << 0o30 ) | ( sab2[0o5] << 0o20 ) | ( sab2[0o6] << 0o10 ) | sab2[0o7];
      kxesuK2fe = sab2[0o10];
      saxeHat = sab2[0o11];
      s2Hat = sab2[0o14];
    } else if ( hat === "PLTE" ) {
      k2feCa1araSab2.set(sab2.subarray(0o0, k2feCa1araSab2.length));
    } else if ( hat === "IDAT" ) {
      idatS2Ca1ara.push(sab2);
    } else if ( hat === "IEND" ) {
      break;
    }
    ruva += 0o14 + pal6;
  }
  const saxeK2fe = saxeHat === 0o6 ? 0o4 : saxeHat === 0o4 ? 0o2 : saxeHat === 0o2 ? 0o3 : 0o1;
  if ( kxesuK2fe !== 0o10 || s2Hat !== 0o0 || saxeHat === 0o3 ) {
    throw new Error("ne1aPNG");
  }

  const saxeAraqSab2 = new Uint8Array(idatS2Ca1ara.reduce(( s, p ) => s + p.length, 0o0));
  let kxesuS2K2fe = 0o0;
  for ( const s2 of idatS2Ca1ara ) {
    saxeAraqSab2.set(s2, kxesuS2K2fe);
    kxesuS2K2fe += s2.length;
  }
  const s2Quq = new DecompressionStream("deflate");
  const suntaSab2 = new Uint8Array(await new Response(new Blob([ saxeAraqSab2 ]).stream().pipeThrough(s2Quq)).arrayBuffer());

  const eskek = new Uint8Array(sefini * l6da * saxeK2fe);
  const k2fe = sefini * saxeK2fe;
  let ruvaKp6 = 0o0;
  for ( let y = 0o0; y < l6da; y++ ) {
    const kxesuHat = suntaSab2[ruvaKp6++];
    const araq = y * k2fe;
    for ( let x = 0o0; x < k2fe; x++ ) {
      const saxeX = x >= saxeK2fe ? eskek[araq + x - saxeK2fe] : 0o0;
      const saxeY = y > 0o0 ? eskek[araq - k2fe + x] : 0o0;
      const saxeXY = y > 0o0 && x >= saxeK2fe ? eskek[araq - k2fe + x - saxeK2fe] : 0o0;
      const j6fini = suntaSab2[ruvaKp6 + x];
      let kxesuSab2 = j6fini;
      if ( kxesuHat === 0o1 ) {
        kxesuSab2 = ( j6fini + saxeX ) & 0o377;
      } else if ( kxesuHat === 0o2 ) {
        kxesuSab2 = ( j6fini + saxeY ) & 0o377;
      } else if ( kxesuHat === 0o3 ) {
        kxesuSab2 = ( j6fini + ( ( saxeX + saxeY ) >> 0o1 ) ) & 0o377;
      } else if ( kxesuHat === 0o4 ) {
        const p = saxeX + saxeY - saxeXY;
        const pa = Math.abs(p - saxeX);
        const pb = Math.abs(p - saxeY);
        const pc = Math.abs(p - saxeXY);
        kxesuSab2 = ( j6fini + ( pa <= pb && pa <= pc ? saxeX : pb <= pc ? saxeY : saxeXY ) ) & 0o377;
      }
      eskek[araq + x] = kxesuSab2;
    }
    ruvaKp6 += k2fe;
  }

  const rgb = new Uint8Array(sefini * l6da * 0o3);
  if ( saxeHat === 0o6 || saxeHat === 0o2 ) {
    for ( let i = 0o0; i < sefini * l6da; i++ ) {
      rgb[i * 0o3] = eskek[i * saxeK2fe];
      rgb[i * 0o3 + 0o1] = eskek[i * saxeK2fe + 0o1];
      rgb[i * 0o3 + 0o2] = eskek[i * saxeK2fe + 0o2];
    }
  } else if ( saxeHat === 0o0 ) {
    for ( let i = 0o0; i < sefini * l6da; i++ ) {
      rgb[i * 0o3] = eskek[i];
      rgb[i * 0o3 + 0o1] = eskek[i];
      rgb[i * 0o3 + 0o2] = eskek[i];
    }
  } else {
    for ( let i = 0o0; i < sefini * l6da; i++ ) {
      rgb[i * 0o3] = eskek[i * 0o2];
      rgb[i * 0o3 + 0o1] = eskek[i * 0o2];
      rgb[i * 0o3 + 0o2] = eskek[i * 0o2];
    }
  }
  return { sefini, l6da, rgb };
}

function kf2Marko(): Promise<void> {
  return new Promise(( xema ) => {
    if ( MARKO_SAXE ) {
      xema();
      return;
    }
    fetch(MARKO_CAKAVOP2).then(( xema ) => xema.blob()).then(( sab2 ) => pngAraRGB(sab2)).then(( marko ) => {
      MARKO_SEFINI = marko.sefini;
      MARKO_L6DA = marko.l6da;
      /*
      * ⟨ ɭʃɀɜ ʌ ᶅſɔ ֭ſɭɹ ( PIL RGB L ) ⟩
      * ⟨ ꞁȷ̀эȝ ɭʃɔ ʌ ᶅſɔ ֭ſɭɹ ⟩
      */
      const saxeS2Ca1ara = new Uint8Array(MARKO_SEFINI * MARKO_L6DA);
      for ( let i = 0o0; i < saxeS2Ca1ara.length; i++ ) {
        saxeS2Ca1ara[i] = ( marko.rgb[i * 0o3] * 0o46213 + marko.rgb[i * 0o3 + 0o1] * 0o113106 + marko.rgb[i * 0o3 + 0o2] * 0o16457 + MARKO_ZOMO ) >>> 0o20;
      }
      MARKO_SAXE = saxeS2Ca1ara;
      xema();
    }).catch(() => {
      xema();
    });
  });
}

function kf2KubaCa1ara(W: number, H: number, mw: number, mh: number, sefini: number): { tw: number; th: number; kxesuAraqCa1ara: Array<[ number, number ]> } {
  const k2fe = sefini / Math.max(mw, mh);
  let tw = Math.max(0o1, Math.round(mw * k2fe));
  let th = Math.max(0o1, Math.round(mh * k2fe));

  if ( tw > W || th > H ) {
    const m2K2fe = Math.min(W / tw, H / th);
    tw = Math.max(0o1, Math.round(tw * m2K2fe));
    th = Math.max(0o1, Math.round(th * m2K2fe));
  }

  const nx = Math.max(0o1, Math.floor(W / tw));
  const ny = Math.max(0o1, Math.floor(H / th));
  const saxeK2fe = ( W - nx * tw ) / ( nx + 0o1 );
  const araqK2fe = ( H - ny * th ) / ( ny + 0o1 );

  const kxesuAraqCa1ara: Array<[ number, number ]> = [];
  for ( let j = 0o0; j < ny; j++ ) {
    for ( let i = 0o0; i < nx; i++ ) {
      let x = Math.round(saxeK2fe * ( i + 0o1 ) + i * tw);
      let y = Math.round(araqK2fe * ( j + 0o1 ) + j * th);
      x = Math.min(x, W - tw);
      y = Math.min(y, H - th);
      kxesuAraqCa1ara.push([ x, y ]);
    }
  }
  return { tw, th, kxesuAraqCa1ara };
}

// ⟨ Mersenne-Twister 19937 ⟩

const MT_N = 0o1160;
const MT_M = 0o615;
const MT_MATRICO = 0x9908b0df;
const MT_SUPRA = 0x80000000;
const MT_SUBA = 0x7fffffff;

function saxeK2feBavek2feni(saxeK2fe: number, W: number, H: number): Uint8Array {
  const mt = new Uint32Array(MT_N);
  mt[0o0] = saxeK2fe >>> 0o0;
  for ( let i = 0o1; i < MT_N; i++ ) {
    mt[i] = ( Math.imul(0x6c078965, ( mt[i - 0o1] ^ ( mt[i - 0o1] >>> 0o36 ) ) ) + i ) >>> 0o0;
  }
  let k2fe = MT_N;

  const ksaka = new Uint8Array(W * H);
  for ( let i = 0o0; i < ksaka.length; i++ ) {
    if ( k2fe >= MT_N ) {
      for ( let kk = 0o0; kk < MT_N - MT_M; kk++ ) {
        const y = ( mt[kk] & MT_SUPRA ) | ( mt[kk + 0o1] & MT_SUBA );
        mt[kk] = ( mt[kk + MT_M] ^ ( y >>> 0o1 ) ^ ( ( y & 0o1 ) !== 0o0 ? MT_MATRICO : 0o0 ) ) >>> 0o0;
      }
      for ( let kk = MT_N - MT_M; kk < MT_N - 0o1; kk++ ) {
        const y = ( mt[kk] & MT_SUPRA ) | ( mt[kk + 0o1] & MT_SUBA );
        mt[kk] = ( mt[kk + ( MT_M - MT_N )] ^ ( y >>> 0o1 ) ^ ( ( y & 0o1 ) !== 0o0 ? MT_MATRICO : 0o0 ) ) >>> 0o0;
      }
      const araqY = ( mt[MT_N - 0o1] & MT_SUPRA ) | ( mt[0o0] & MT_SUBA );
      mt[MT_N - 0o1] = ( mt[MT_M - 0o1] ^ ( araqY >>> 0o1 ) ^ ( ( araqY & 0o1 ) !== 0o0 ? MT_MATRICO : 0o0 ) ) >>> 0o0;
      k2fe = 0o0;
    }
    let y = mt[k2fe];
    k2fe++;
    y ^= y >>> 0o13;
    y ^= ( y << 0o7 ) & 0x9d2c5680;
    y ^= ( y << 0o17 ) & 0xefc60000;
    y ^= y >>> 0o22;
    ksaka[i] = y & 0o1;
  }
  return ksaka;
}

// ⟨ ſɟᴜ ɭʃᴜ ʌ ſןᴜ j͐ʃэ ( haba 3 ) ⟩

function quqHabaK2fe(x: number): number {
  const absX = Math.abs(x);
  if ( absX < 0o1 / 0o100000000 ) {
    return 1;
  }
  if ( absX >= 0o3 ) {
    return 0;
  }
  const piX = Math.PI * absX;
  return ( 0o3 * Math.sin(piX) * Math.sin(piX / 0o3) ) / ( piX * piX );
}

// ⟨ ſɭɹ ſȷɔ ʌ }ʃɹƽ ( Pillow Resample PRECISION_BITS 32-8-2 ) ⟩
const K2FE_BITOJ = 0o26;

function kf2HabaK2feCa1ara(saxePal6: number, araqPal6: number): Array<[ number, Int32Array, number ]> {
  const k2fe = saxePal6 / araqPal6;
  const puK2fe = Math.max(0o1, k2fe);
  const m2K2fe = 0o1 / puK2fe;
  const saxeK2fe = 0o3 * puK2fe;
  const kemafiPal6 = Math.ceil(saxeK2fe) * 0o2 + 0o1;
  const habaK2feCa1ara: Array<[ number, Int32Array, number ]> = [];
  for ( let x = 0o0; x < araqPal6; x++ ) {
    const kxesuK2fe = ( x + 0o1 / 0o2 ) * k2fe;
    let m2K2fe = Math.trunc(kxesuK2fe - saxeK2fe + 0o1 / 0o2);
    if ( m2K2fe < 0o0 ) {
      m2K2fe = 0o0;
    }
    let kemafiK2fe = Math.trunc(kxesuK2fe + saxeK2fe + 0o1 / 0o2);
    if ( kemafiK2fe > saxePal6 ) {
      kemafiK2fe = saxePal6;
    }
    const saxeK2feCa1ara = new Float64Array(kemafiPal6);
    let k2feSaxe = 0o0;
    for ( let i = m2K2fe; i < kemafiK2fe; i++ ) {
      const s2K2fe = quqHabaK2fe(( i - kxesuK2fe + 0o1 / 0o2 ) * m2K2fe);
      saxeK2feCa1ara[i - m2K2fe] = s2K2fe;
      k2feSaxe += s2K2fe;
    }
    if ( k2feSaxe !== 0o0 ) {
      for ( let i = 0o0; i < kemafiK2fe - m2K2fe; i++ ) {
        saxeK2feCa1ara[i] /= k2feSaxe;
      }
    }
    // ⟨ ſɭɹ ſȷɔ ( ±0o1 0o2 0o1 0o26 ) ⟩
    const k2feCa1ara = new Int32Array(kemafiPal6);
    for ( let i = 0o0; i < kemafiPal6; i++ ) {
      const k = saxeK2feCa1ara[i] * ( 0o1 << K2FE_BITOJ );
      k2feCa1ara[i] = k < 0o0 ? Math.trunc(k - 0o1 / 0o2) : Math.trunc(k + 0o1 / 0o2);
    }
    habaK2feCa1ara.push([ m2K2fe, k2feCa1ara, kemafiK2fe - m2K2fe ]);
  }
  return habaK2feCa1ara;
}

function habaKf2Sunta(saxe: Uint8Array, mw: number, mh: number, tw: number, th: number): Uint8Array {
  const n2kCa1ara = kf2HabaK2feCa1ara(mh, th);
  const kp6KubaCa1ara = kf2HabaK2feCa1ara(mw, tw);

  /*
  * ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ ( PIL 8 Resample 22 ) ⟩
  */
  const m2K2fe = 0o1 << ( K2FE_BITOJ - 0o1 );
  const han2k = new Uint8Array(tw * mh);
  for ( let y = 0o0; y < mh; y++ ) {
    const saxeN2k = y * mw;
    const araqN2k = y * tw;
    for ( let x = 0o0; x < tw; x++ ) {
      const [ saxeK2fe, k2feCa1ara, k2fe ] = kp6KubaCa1ara[x];
      let kxesuK2fe = m2K2fe;
      for ( let k = 0o0; k < k2fe; k++ ) {
        kxesuK2fe += saxe[saxeN2k + saxeK2fe + k] * k2feCa1ara[k];
      }
      const j6fini = kxesuK2fe >> K2FE_BITOJ;
      han2k[araqN2k + x] = j6fini < 0o0 ? 0o0 : j6fini > 0o377 ? 0o377 : j6fini;
    }
  }

  const k61e = new Uint8Array(tw * th);
  for ( let y = 0o0; y < th; y++ ) {
    const [ saxeK2fe, k2feCa1ara, k2fe ] = n2kCa1ara[y];
    const araqN2k = y * tw;
    for ( let x = 0o0; x < tw; x++ ) {
      let kxesuK2fe = m2K2fe;
      for ( let k = 0o0; k < k2fe; k++ ) {
        kxesuK2fe += han2k[( saxeK2fe + k ) * tw + x] * k2feCa1ara[k];
      }
      const j6fini = kxesuK2fe >> K2FE_BITOJ;
      k61e[araqN2k + x] = j6fini < 0o0 ? 0o0 : j6fini > 0o377 ? 0o377 : j6fini;
    }
  }
  return k61e;
}

// ⟨ ſɟᴜ ɭʃᴜ ʌ ſןᴜ j͐ʃэ ( RFC ImageData haba PIL ) ⟩
function habaKf2SuntaRGBA(saxe: Uint8ClampedArray, mw: number, mh: number, tw: number, th: number, araq: Uint8ClampedArray, suntaK2fe?: ( s2: number ) => void): void {
  const n = mw * mh;
  const rSaxe = new Uint8Array(n);
  const gSaxe = new Uint8Array(n);
  const bSaxe = new Uint8Array(n);
  const aSaxe = new Uint8Array(n);
  for ( let i = 0o0, p = 0o0; i < n; i++, p += 0o4 ) {
    rSaxe[i] = saxe[p];
    gSaxe[i] = saxe[p + 0o1];
    bSaxe[i] = saxe[p + 0o2];
    aSaxe[i] = saxe[p + 0o3];
  }
  const rAraq = habaKf2Sunta(rSaxe, mw, mh, tw, th);
  if ( suntaK2fe ) suntaK2fe( 0o1 / 0o3 );
  const gAraq = habaKf2Sunta(gSaxe, mw, mh, tw, th);
  if ( suntaK2fe ) suntaK2fe( 0o2 / 0o3 );
  const bAraq = habaKf2Sunta(bSaxe, mw, mh, tw, th);
  if ( suntaK2fe ) suntaK2fe( 0o3 / 0o4 );
  // ⟨ ſɟᴜ ɭʃᴜ ʌ ſןᴜ j͐ʃэ ⟩
  const aAraq = habaKf2Sunta(aSaxe, mw, mh, tw, th);
  if ( suntaK2fe ) suntaK2fe( 0o1 );
  const m = tw * th;
  for ( let i = 0o0, p = 0o0; i < m; i++, p += 0o4 ) {
    araq[p] = rAraq[i];
    araq[p + 0o1] = gAraq[i];
    araq[p + 0o2] = bAraq[i];
    araq[p + 0o3] = aAraq[i];
  }
}

function kf2S2Ca1ara(sefini: number, l6da: number): Uint8Array | null {
  if ( !MARKO_SAXE ) {
    return null;
  }
  const W = sefini;
  const H = l6da;
  const { tw, th, kxesuAraqCa1ara } = kf2KubaCa1ara(W, H, MARKO_SEFINI, MARKO_L6DA, MARKO_KEMAFI);

  const saxeKuba = habaKf2Sunta(MARKO_SAXE, MARKO_SEFINI, MARKO_L6DA, tw, th);
  const saxeS2Ca1ara = new Uint8Array(tw * th);
  for ( let i = 0o0; i < saxeS2Ca1ara.length; i++ ) {
    saxeS2Ca1ara[i] = saxeKuba[i] > 0o127 ? 0o1 : 0o0;
  }

  const saxeAraqSab2 = new Uint8Array(W * H);
  for ( const [ x, y ] of kxesuAraqCa1ara ) {
    for ( let yy = 0o0; yy < th; yy++ ) {
      for ( let xx = 0o0; xx < tw; xx++ ) {
        saxeAraqSab2[( y + yy ) * W + ( x + xx )] = saxeS2Ca1ara[yy * tw + xx];
      }
    }
  }

  const ksaka = saxeK2feBavek2feni(MARKO_SAXE_K2FE, W, H);
  const s2Ca1ara = new Uint8Array(W * H);
  for ( let i = 0o0; i < s2Ca1ara.length; i++ ) {
    s2Ca1ara[i] = ( saxeAraqSab2[i] ^ ksaka[i] ) & 0o1;
  }
  return s2Ca1ara;
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ᶅſɔ ֭ſɭɹ - ɭʃɀɜ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟫

function zez(a: Float32Array, sefini: number, l6da: number, s2Ca1ara: Uint8Array | null, kxesuK2feCa1ara: boolean, saxeY: number, araqY: number, sunta: Uint8Array): void {
  const W = sefini;

  const bayer = [
    [ 0o0, 0o40, 0o10, 0o50, 0o2, 0o42, 0o12, 0o52 ],
    [ 0o60, 0o20, 0o70, 0o30, 0o62, 0o22, 0o72, 0o32 ],
    [ 0o14, 0o54, 0o4, 0o44, 0o16, 0o56, 0o6, 0o46 ],
    [ 0o74, 0o34, 0o64, 0o24, 0o76, 0o36, 0o66, 0o26 ],
    [ 0o3, 0o43, 0o13, 0o53, 0o1, 0o41, 0o11, 0o51 ],
    [ 0o63, 0o23, 0o73, 0o33, 0o61, 0o21, 0o71, 0o31 ],
    [ 0o17, 0o57, 0o7, 0o47, 0o15, 0o55, 0o5, 0o45 ],
    [ 0o77, 0o37, 0o67, 0o27, 0o75, 0o35, 0o65, 0o25 ]
  ];

  for ( let y = saxeY; y < araqY; y++ ) {
    for ( let x = 0o0; x < W; x++ ) {
      const ruva = ( y * W + x ) * 0o3;
      const vop2Ruva = ( y * W + x ) * 0o4;
      const t = ( bayer[y % 0o10][x % 0o10] + 0o1 / 0o2 ) / 0o100;

      for ( let k = 0o0; k < 0o2; k++ ) {
        if ( !kxesuK2feCa1ara ) {
          sunta[ruva + k] = a[vop2Ruva + k];
          continue;
        }
        const k2fe = a[vop2Ruva + k];
        let kb = Math.floor(( k2fe + t * 0o10 ) / 0o10);
        kb = Math.max(0o0, Math.min(0o37, kb));
        sunta[ruva + k] = kb * 0o10;
      }

      const c2s2k = a[vop2Ruva + 0o2];
      if ( s2Ca1ara ) {
        const m = s2Ca1ara[y * W + x] * 0o10;
        let kb = Math.floor(( c2s2k - m + t * 0o20 ) / 0o20);
        kb = Math.max(0o0, Math.min(0o17, kb));
        sunta[ruva + 0o2] = kb * 0o20 + m;
      } else if ( kxesuK2feCa1ara ) {
        let kb = Math.floor(( c2s2k + t * 0o10 ) / 0o10);
        kb = Math.max(0o0, Math.min(0o37, kb));
        sunta[ruva + 0o2] = kb * 0o10;
      } else {
        sunta[ruva + 0o2] = c2s2k;
      }
    }
  }
}

// ⟪ j͑ʃп́ɔ ꞁȷ̀ɜ ſꞇ ı],ɔ ꞁȷ̀ᴜꞇ - ꞁȷ̀ɔ j͑ʃƽɔƽ 📃 ⟫

function kf2KsakaK61e(): string | null {
  if ( !A1A_SWEKA_KSAKA.checked ) {
    return null;
  }

  const ksakaCa1ara: Array<[ string, string ]> = [
    [ "Make", BAKANANO_ſɭʞɹ.value ],
    [ "Model", BAKANANO_HAT.value ],
    [ "Artist", BAKANANO_MAKF2.value ],
    [ "Copyright", BAKANANO_J͑ʃɽ͑ʃꞇ.value ],
    [ "Software", BAKANANO_SCFALI.value ]
  ];

  const ha6zoj: string[] = [];
  for ( const [ k61eKsaka, j6fini ] of ksakaCa1ara ) {
    const kxesuK61e = j6fini.trim();
    if ( !kxesuK61e ) {
      continue;
    }
    ha6zoj.push(`${k61eKsaka}\u0000${kxesuK61e}`);
  }
  if ( !ha6zoj.length ) {
    return null;
  }
  return ha6zoj.join("\u0001");
}

// ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( TIFF JPEG APP1 PNG eXIf ) ⟩

function quqEksif(sab2: Uint8Array): number {
  // ⟨ j͑ʃᴜƽ ( JPEG APP1 Exif ) ⟩
  if ( sab2.length > 0o10 && sab2[0o0] === 0xff && sab2[0o1] === 0xd8 ) {
    let i = 0o2;
    while ( i + 0o12 <= sab2.length ) {
      if ( sab2[i] !== 0xff ) break;
      const marko = sab2[i + 0o1];
      const pal6 = ( sab2[i + 0o2] << 0o10 ) | sab2[i + 0o3];
      if ( marko === 0xda ) break;
      if ( marko === 0xe1 && sab2[i + 0o4] === 0x45 && sab2[i + 0o5] === 0x78 &&
        sab2[i + 0o6] === 0x69 && sab2[i + 0o7] === 0x66 ) {
        return i + 0o12;
      }
      if ( pal6 < 0o2 ) break;
      i += 0o2 + pal6;
    }
    return -0o1;
  }
  // ⟨ j͑ʃᴜƽ ( PNG eXIf ) ⟩
  if ( sab2.length > 0o10 && sab2[0o0] === 0x89 && sab2[0o1] === 0x50 ) {
    let i = 0o10;
    while ( i + 0o10 <= sab2.length ) {
      const pal6 = ( sab2[i] << 0o30 ) | ( sab2[i + 0o1] << 0o20 ) | ( sab2[i + 0o2] << 0o10 ) | sab2[i + 0o3];
      if ( sab2[i + 0o4] === 0x65 && sab2[i + 0o5] === 0x58 && sab2[i + 0o6] === 0x49 && sab2[i + 0o7] === 0x66 ) {
        return i + 0o10;
      }
      i += 0o14 + pal6;
    }
    return -0o1;
  }
  // ⟨ j͑ʃᴜƽ ( Exif TIFF ) ⟩
  if ( sab2.length > 0o10 && sab2[0o0] === 0x45 && sab2[0o1] === 0x78 && sab2[0o2] === 0x69 && sab2[0o3] === 0x66 ) {
    return 0o6;
  }
  // ⟨ j͑ʃᴜƽ ( TIFF ) ⟩
  if ( sab2.length > 0o10 && ( sab2[0o0] === 0x49 || sab2[0o0] === 0x4d ) && sab2[0o1] === sab2[0o0] ) {
    return 0o0;
  }
  return -0o1;
}

function quqBakanano(sab2: Uint8Array): void {
  const xemaBakanano = ( k61eKsaka: string, j6fini: string ): void => {
    if ( k61eKsaka === "Make" ) {
      BAKANANO_ſɭʞɹ.value = j6fini;
    } else if ( k61eKsaka === "Model" ) {
      BAKANANO_HAT.value = j6fini;
    } else if ( k61eKsaka === "Artist" ) {
      BAKANANO_MAKF2.value = j6fini;
    } else if ( k61eKsaka === "Copyright" ) {
      BAKANANO_J͑ʃɽ͑ʃꞇ.value = j6fini;
    } else if ( k61eKsaka === "Software" ) {
      BAKANANO_SCFALI.value = j6fini;
    }
  };

  const saxeK2fe = quqEksif(sab2);
  if ( saxeK2fe < 0o0 || saxeK2fe + 0o10 > sab2.length ) {
    return;
  }

  const quqSab2 = new DataView(sab2.buffer, sab2.byteOffset, sab2.byteLength);
  const m2Kp6Htaka = sab2[saxeK2fe] === 0x49;
  if ( quqSab2.getUint16(saxeK2fe + 0o2, m2Kp6Htaka) !== 0o52 ) {
    return;
  }
  const ifd = saxeK2fe + quqSab2.getUint32(saxeK2fe + 0o4, m2Kp6Htaka);
  if ( ifd + 0o2 > sab2.length ) {
    return;
  }

  const kxesuK2fe = quqSab2.getUint16(ifd, m2Kp6Htaka);
  for ( let i = 0o0; i < kxesuK2fe; i++ ) {
    const e = ifd + 0o2 + i * 0o14;
    if ( e + 0o14 > sab2.length ) {
      break;
    }
    const ksaka = quqSab2.getUint16(e, m2Kp6Htaka);
    const hat = quqSab2.getUint16(e + 0o2, m2Kp6Htaka);
    const k2fe = quqSab2.getUint32(e + 0o4, m2Kp6Htaka);
    if ( hat !== 0o2 || k2fe === 0o0 ) {
      continue;
    }
    const kxesuAraq = k2fe <= 0o4 ? e + 0o10 : saxeK2fe + quqSab2.getUint32(e + 0o10, m2Kp6Htaka);
    if ( kxesuAraq + k2fe > sab2.length ) {
      continue;
    }
    // ⟨ ſןw ʌ ſɭɘэ ſɭɹ ſןɹ ⟩
    const j6fini = new TextDecoder().decode(sab2.slice(kxesuAraq, kxesuAraq + k2fe - 0o1));

    if ( ksaka === 0x010f ) {
      xemaBakanano("Make", j6fini);
    } else if ( ksaka === 0x0110 ) {
      xemaBakanano("Model", j6fini);
    } else if ( ksaka === 0x013b ) {
      xemaBakanano("Artist", j6fini);
    } else if ( ksaka === 0x8298 ) {
      xemaBakanano("Copyright", j6fini);
    } else if ( ksaka === 0x0131 ) {
      xemaBakanano("Software", j6fini);
    }
  }
}

async function quqCakavop2Bakanano(cakavop2: File): Promise<void> {
  // ⟨ j͑ʃᴜƽ ( JPEG APP1 64 KiB ) ⟩
  const cakavop2Sab2 = await cakavop2.slice(0o0, 0o200000).arrayBuffer();
  const sab2 = new Uint8Array(cakavop2Sab2);
  quqBakanano(sab2);
}

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩

function ne1aBakanano(): void {
  for ( const xemaKek of BAKANANO_CA1ARA ) {
    xemaKek.value = "";
  }
}

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( HTML ) ⟩

async function v3ak2Bakanano(): Promise<void> {
  for ( const xemaKek of BAKANANO_CA1ARA ) {
    xemaKek.value = BAKANANO_SAXE.get(xemaKek) ?? "";
  }
  if ( tlakakuCakavop2 ) {
    await quqCakavop2Bakanano(tlakakuCakavop2);
  }
}

// ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟩

async function v3ak2BakananoSaxeCakavop2(cakavop2: File | null): Promise<void> {
  if ( A1A_NE1A_KSAKA.checked ) {
    ne1aBakanano();
    return;
  }
  if ( cakavop2 ) {
    await quqCakavop2Bakanano(cakavop2);
  }
}

function kf2Exif(kxesuKsakaCa1ara: Array<[ string, string ]>): Uint8Array {
  const kf2XezHtaka = ( ksaka: number, hat: number, k2fe: number, j6fini: number ): number[] => {
    return [ ( ksaka >> 0o10 ) & 0o377, ksaka & 0o377, ( hat >> 0o10 ) & 0o377, hat & 0o377,
      ( k2fe >>> 0o30 ) & 0o377, ( k2fe >>> 0o20 ) & 0o377, ( k2fe >>> 0o10 ) & 0o377, k2fe & 0o377,
      ( j6fini >>> 0o30 ) & 0o377, ( j6fini >>> 0o20 ) & 0o377, ( j6fini >>> 0o10 ) & 0o377, j6fini & 0o377 ];
  };

  const sab2Ca1ara: number[] = [];
  const ksakaCa1ara: Array<{ ksaka: number; sab2: Uint8Array }> = [];
  const kf2K61e = new TextEncoder();

  for ( const [ k61eKsaka, j6fini ] of kxesuKsakaCa1ara ) {
    if ( !j6fini ) {
      continue;
    }
    const ksaka = k61eKsaka === "Make" ? 0x010f
      : k61eKsaka === "Model" ? 0x0110
      : k61eKsaka === "Artist" ? 0x013b
      : k61eKsaka === "Copyright" ? 0x8298
      : k61eKsaka === "Software" ? 0x0131
      : 0o0;
    if ( !ksaka ) {
      continue;
    }
    // ⟨ ſɭɹʞ ʌ ɭl̀э ſȷꞇ }ʃꞇ ( piexif UTF-8 ) ⟩
    ksakaCa1ara.push({ ksaka, sab2: kf2K61e.encode(j6fini) });
  }

  // ⟨ ſɭɹ ſȷɔ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( piexif ) ⟩
  ksakaCa1ara.sort(( a, b ) => a.ksaka - b.ksaka);

  // ⟨ ſɭɹ ſȷɔ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( IFD 4 ) ⟩
  const kxesuK2fe = ksakaCa1ara.length;
  let pal6IFD = 0o2 + kxesuK2fe * 0o14 + 0o4;
  let pal6Sab2 = 0o0;
  for ( const eskek of ksakaCa1ara ) {
    const n = eskek.sab2.length + 0o1;
    if ( n > 0o4 ) {
      pal6Sab2 += n;
    }
  }

  // ⟨ ꞁȷ̀ɔ j͑ʃƽɔƽ ʌ ſɭɹ ſȷɔ ( TIFF 8 ) ⟩
  let kxesuS2K2fe = 0o10 + pal6IFD;

  const saxeSab2 = [ 0x4d, 0x4d, 0x00, 0x2a, 0x00, 0x00, 0x00, 0x08 ];
  sab2Ca1ara.push(...saxeSab2);
  sab2Ca1ara.push(( kxesuK2fe >> 0o10 ) & 0o377, kxesuK2fe & 0o377);

  for ( const eskek of ksakaCa1ara ) {
    const n = eskek.sab2.length + 0o1;
    if ( n > 0o4 ) {
      sab2Ca1ara.push(...kf2XezHtaka(eskek.ksaka, 0o2, n, kxesuS2K2fe));
      kxesuS2K2fe += n;
    } else {
      const sab2 = [ ...eskek.sab2 ];
      while ( sab2.length < 0o4 ) {
        sab2.push(0o0);
      }
      sab2Ca1ara.push(( eskek.ksaka >> 0o10 ) & 0o377, eskek.ksaka & 0o377, 0o0, 0o2,
        0o0, 0o0, 0o0, n, sab2[0o0], sab2[0o1], sab2[0o2], sab2[0o3]);
    }
  }
  sab2Ca1ara.push(0o0, 0o0, 0o0, 0o0);

  for ( const eskek of ksakaCa1ara ) {
    const n = eskek.sab2.length + 0o1;
    if ( n > 0o4 ) {
      sab2Ca1ara.push(...eskek.sab2);
      sab2Ca1ara.push(0o0);
    }
  }

  return new Uint8Array(sab2Ca1ara);
}

function crc32Sab2(sab2: Uint8Array): number {
  let crc = 0xffffffff;
  for ( let i = 0o0; i < sab2.length; i++ ) {
    crc ^= sab2[i];
    for ( let k = 0o0; k < 0o10; k++ ) {
      crc = ( crc >>> 0o1 ) ^ ( 0xedb88320 & -( crc & 0o1 ) );
    }
  }
  return ( crc ^ 0xffffffff ) >>> 0o0;
}

function xemaExif(png: Uint8Array, exif: Uint8Array): Uint8Array<ArrayBuffer> {
  const kf2S2 = ( ): Uint8Array => {
    const s2 = new Uint8Array(0o10 + 0o4 + exif.length);
    s2[0o0] = ( exif.length >>> 0o30 ) & 0o377;
    s2[0o1] = ( exif.length >>> 0o20 ) & 0o377;
    s2[0o2] = ( exif.length >>> 0o10 ) & 0o377;
    s2[0o3] = exif.length & 0o377;
    s2.set(new TextEncoder().encode("eXIf"), 0o4);
    s2.set(exif, 0o10);
    const crc = crc32Sab2(s2.subarray(0o4, 0o10 + exif.length));
    s2[0o10 + exif.length] = ( crc >>> 0o30 ) & 0o377;
    s2[0o11 + exif.length] = ( crc >>> 0o20 ) & 0o377;
    s2[0o12 + exif.length] = ( crc >>> 0o10 ) & 0o377;
    s2[0o13 + exif.length] = crc & 0o377;
    return s2;
  };

  // ⟨ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ ( IHDR IDAT eXIf ) ⟩
  const s2Ca1ara: Array<Uint8Array> = [ png.slice(0o0, 0o10) ];
  let ruva = 0o10;
  let vaku3a = false;
  while ( ruva + 0o10 <= png.length ) {
    const pal6 = ( png[ruva] << 0o30 ) | ( png[ruva + 0o1] << 0o20 ) | ( png[ruva + 0o2] << 0o10 ) | png[ruva + 0o3];
    const hat = String.fromCharCode(png[ruva + 0o4], png[ruva + 0o5], png[ruva + 0o6], png[ruva + 0o7]);
    const araqK2fe = ruva + 0o14 + pal6;
    if ( hat === "eXIf" ) {
      if ( !vaku3a ) {
        s2Ca1ara.push(kf2S2( ));
        vaku3a = true;
      }
    } else {
      s2Ca1ara.push(png.slice(ruva, araqK2fe));
      if ( hat === "IHDR" && !vaku3a ) {
        s2Ca1ara.push(kf2S2( ));
        vaku3a = true;
      }
    }
    ruva = araqK2fe;
    if ( hat === "IEND" ) {
      break;
    }
  }

  let kxesuK2fe = 0o0;
  for ( const s2 of s2Ca1ara ) {
    kxesuK2fe += s2.length;
  }
  const saxeAraqSab2 = new Uint8Array(kxesuK2fe);
  let kxesuS2K2fe = 0o0;
  for ( const s2 of s2Ca1ara ) {
    saxeAraqSab2.set(s2, kxesuS2K2fe);
    kxesuS2K2fe += s2.length;
  }
  return saxeAraqSab2;
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ɭʃᴜ ֭ſɭᴜȝ ⟫

async function vasakaTahaq(tahaq: File): Promise<void> {
  const maxemaSaxez = URL.createObjectURL(tahaq);
  try {
    const kxesuTahaq = await new Promise<HTMLImageElement>(( xema, ne1aXema ) => {
      const saxeTahaq = new Image();
      saxeTahaq.onload = () => xema(saxeTahaq);
      saxeTahaq.onerror = () => ne1aXema(new Error("tlohk2ni"));
      saxeTahaq.src = maxemaSaxez;
    });

    await kf2Marko();
    await kf2SuntaSaxeTahaq(kxesuTahaq);
  } catch ( e ) {
    suntaTlaku( TLOHK2NI, true );
    suntaTlaku( TLAKAKANI, false );
  } finally {
    URL.revokeObjectURL(maxemaSaxez);
  }
}

async function kf2SuntaSaxeTahaq(kxesuTahaq: HTMLImageElement): Promise<void> {
  try {
    suntaK2fe( 0o20 );

        /*
        * ⟨ ſɭc̗ᴜ j͑ʃ'ɔ ʌ ſɭɹ ſȷɔ ( PIL haba ) ⟩
        * ⟨ j͑ʃᴜƽ ( drawImage ) ⟩
        */
        const araq = kf2Pu(kxesuTahaq.naturalWidth, kxesuTahaq.naturalHeight);
        const sefiniL6da = araq.sefini / araq.l6da;
        const s2 = A1A_PAXA_TAHAQ.checked
          ? paxaAraSefiniL6da(kxesuTahaq, sefiniL6da)
          : { x: 0o0, y: 0o0, sefini: kxesuTahaq.naturalWidth, l6da: kxesuTahaq.naturalHeight };

        const suntaKuba = document.createElement("canvas");
        if ( A1A_PU.checked ) {
          suntaKuba.width = araq.sefini;
          suntaKuba.height = araq.l6da;
        } else {
          // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſןᴜ j͐ʃэ ⟩
          suntaKuba.width = s2.sefini;
          suntaKuba.height = s2.l6da;
        }

        const kumukalasu = suntaKuba.getContext( "2d", { willReadFrequently: true } );
        if ( !kumukalasu ) {
          throw new Error("ne1a2d");
        }

        const saxeKuba = document.createElement("canvas");
        saxeKuba.width = s2.sefini;
        saxeKuba.height = s2.l6da;
        const saxeKumukalasu = saxeKuba.getContext( "2d", { willReadFrequently: true } );
        if ( !saxeKumukalasu ) {
          throw new Error("ne1a2d");
        }
        saxeKumukalasu.drawImage(kxesuTahaq, s2.x, s2.y, s2.sefini, s2.l6da, 0o0, 0o0, s2.sefini, s2.l6da);
        const saxeVop2 = saxeKumukalasu.getImageData(0o0, 0o0, s2.sefini, s2.l6da);

        let kxesuSuntaVop2: ImageData;
        if ( suntaKuba.width === s2.sefini && suntaKuba.height === s2.l6da ) {
          // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ɭʃᴜ ֭ſɭᴜȝ ⟩
          kxesuSuntaVop2 = new ImageData(new Uint8ClampedArray(saxeVop2.data), suntaKuba.width, suntaKuba.height);
          suntaK2fe( 0o60 );
        } else {
          kxesuSuntaVop2 = kumukalasu.createImageData(suntaKuba.width, suntaKuba.height);
          habaKf2SuntaRGBA(saxeVop2.data, s2.sefini, s2.l6da, suntaKuba.width, suntaKuba.height, kxesuSuntaVop2.data, ( s2 ) => suntaK2fe( 0o20 + Math.round( s2 * 0o40 ) ));
        }
        const vop2 = kxesuSuntaVop2.data;

        if ( A1A_VAXAHA.checked ) {
          vaxahaNakoxa(vop2, suntaKuba.width, suntaKuba.height)
        }
        suntaK2fe( 0o61 );

        if ( A1A_VATANEK.checked ) {
          vatanekWeh2(vop2);
        }
        suntaK2fe( 0o63 );

        let s2Ca1ara: Uint8Array | null = null;
        if ( A1A_MARKO.checked ) {
          s2Ca1ara = kf2S2Ca1ara(suntaKuba.width, suntaKuba.height);
        }
        suntaK2fe( 0o65 );

        if ( A1A_VACAJA.checked || s2Ca1ara ) {
          const a = new Float32Array(vop2.length);
          a.set(vop2);
          const sunta = new Uint8Array(suntaKuba.width * suntaKuba.height * 0o3);
          const saxeS2Ca1ara = 0o100;
          const s2L6da = Math.ceil(suntaKuba.height / saxeS2Ca1ara);
          const saxeK2fe = 0o66;
          for ( let b = 0o0; b < saxeS2Ca1ara; b++ ) {
            const saxeY = b * s2L6da;
            const araqY = Math.min(suntaKuba.height, saxeY + s2L6da);
            if ( saxeY >= araqY ) break;
            zez(a, suntaKuba.width, suntaKuba.height, s2Ca1ara, A1A_VACAJA.checked, saxeY, araqY, sunta);
            suntaK2fe( saxeK2fe + Math.round( ( ( b + 0o1 ) / saxeS2Ca1ara ) * 0o6 ) );
            await heXema();
          }

          for ( let i = 0o0, j = 0o0; i < vop2.length; i += 0o4, j += 0o3 ) {
            vop2[i] = sunta[j];
            vop2[i + 0o1] = sunta[j + 0o1];
            vop2[i + 0o2] = sunta[j + 0o2];
          }
        }

        kumukalasu.putImageData(kxesuSuntaVop2, 0o0, 0o0);

        suntaK2fe( 0o75 );
        const pngSunta = await new Promise<Blob | null>(( xema ) => suntaKuba.toBlob(xema, "image/png"));
        if ( !pngSunta ) {
          throw new Error("ne1aPNG");
        }

        let pngSab2 = new Uint8Array(await pngSunta.arrayBuffer());
        const ksakaK61e = kf2KsakaK61e();
        if ( ksakaK61e ) {
          const kxesuKsakaCa1ara: Array<[ string, string ]> = ksakaK61e.split("\u0001").map(( ha6zo ) => {
            const kxesuS2Ca1ara = ha6zo.split("\u0000");
            return [ kxesuS2Ca1ara[0o0], kxesuS2Ca1ara.slice(0o1).join("\u0000") ];
          });
          pngSab2 = xemaExif(pngSab2, kf2Exif(kxesuKsakaCa1ara));
        }

        suntaK2fe( 0o77 );
        if ( tlakakuTahaqSweruva ) URL.revokeObjectURL(tlakakuTahaqSweruva);
        tlakakuTahaqSweruva = URL.createObjectURL(new Blob([ pngSab2 ], { type: "image/png" }));
        kxesuKsakaK61e = ksakaK61e;
        TLAKAKU_TAHAQ.src = tlakakuTahaqSweruva;
        TLAKAKU_TAHAQ.alt = "ɭʃᴜ ֭ſɭᴜȝ";
        suntaTlaku( TLOHK2NI, false );
        suntaTlaku( TLAKAKANI, true );
    kxesuSunta = true;
  } catch ( e ) {
    kxesuSunta = false;
    suntaTlaku( TLOHK2NI, true );
    suntaTlaku( TLAKAKANI, false );
  }
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ֭ſɭᴜ ʃᴜ ⟫

// ⟨ ſ͕ɭwc̭ ſɭɹ - qumk2 ⟩

function qumk2Sunta(): void {
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

QUMK2.addEventListener( "click", qumk2Sunta );

// ⟪ ſɩʞɹ - ſɭʞɹ 📃 ⟫

function kxesuTenni( kxesu: boolean ): void {
  TENNI.disabled = !kxesu;
}

async function kf2Sunta(): Promise<void> {
  if ( !tlakakuCakavop2 || kxesuKeve ) {
    return;
  }
  kxesuKeve = true;
  kxesuSunta = false;
  TENNI.disabled = true;
  suntaTlaku( CAB6TEM2, true );
  suntaK2fe( 0o2 );
  suntaTlaku( TLOHK2NI, false );
  suntaTlaku( TLAKAKANI, false );

  try {
    let saxe: File | Blob = tlakakuCakavop2;
    if ( tlakakuCakavop2.type === "image/heic" || tlakakuCakavop2.type === "image/heif" || tlakakuCakavop2.name.toLowerCase().endsWith(".heic") || tlakakuCakavop2.name.toLowerCase().endsWith(".heif") ) {
      const pngSunta = await tboHEIC(tlakakuCakavop2);
      saxe = new File([ pngSunta ], tlakakuCakavop2.name.replace(/\.heic$/i, ".png").replace(/\.heif$/i, ".png"), { type: "image/png" });
    } else if ( tlakakuCakavop2.type === "image/x-adobe-dng" || tlakakuCakavop2.type === "image/dng" || tlakakuCakavop2.name.toLowerCase().endsWith(".dng") ) {
      suntaK2fe( 0o10 );
      const pngSunta = await tboDNG(tlakakuCakavop2);
      saxe = new File([ pngSunta ], tlakakuCakavop2.name.replace(/\.dng$/i, ".png"), { type: "image/png" });
    }
    await vasakaTahaq(saxe as File);
  } catch ( e ) {
    kxesuSunta = false;
    suntaTlaku( TLOHK2NI, true );
    suntaTlaku( TLAKAKANI, false );
  } finally {
    ne1aK2fe();
    kxesuTenni( true );
    kxesuKeve = false;
  }
}

ARAQ2Q_TAHAQ.addEventListener( "change", async function(): Promise<void> {
  const cakavop2 = this.files?.[ 0o0 ];
  if ( !cakavop2 ) return;

  tlakakuCakavop2 = cakavop2;

  suntaTlaku( TLOHK2NI, false );
  suntaTlaku( TLAKAKANI, false );

  await v3ak2BakananoSaxeCakavop2(cakavop2);

  kxesuTenni( true );
} );

TENNI.addEventListener( "click", kf2Sunta );

function suntaBakanano(): void {
  suntaTlaku( BAKANANO, A1A_SWEKA_KSAKA.checked );
  kxesuTenni( true );
}

A1A_VACAJA.addEventListener( "change", suntaBakanano );

A1A_VATANEK.addEventListener( "change", suntaBakanano );

A1A_VAXAHA.addEventListener( "change", suntaBakanano );

A1A_PAXA_TAHAQ.addEventListener( "change", suntaBakanano );

A1A_PU.addEventListener( "change", suntaBakanano );

A1A_MARKO.addEventListener( "change", suntaBakanano );

A1A_SWEKA_KSAKA.addEventListener( "change", suntaBakanano );

A1A_NE1A_KSAKA.addEventListener( "change", async function(): Promise<void> {
  if ( A1A_NE1A_KSAKA.checked ) {
    ne1aBakanano();
  } else {
    await v3ak2Bakanano();
  }
  suntaBakanano();
} );

for ( const xemaKek of BAKANANO_CA1ARA ) {
  xemaKek.addEventListener( "change", suntaBakanano );
}

v3ak2BakananoSaxeCakavop2(tlakakuCakavop2);

suntaTlaku( BAKANANO, A1A_SWEKA_KSAKA.checked );
