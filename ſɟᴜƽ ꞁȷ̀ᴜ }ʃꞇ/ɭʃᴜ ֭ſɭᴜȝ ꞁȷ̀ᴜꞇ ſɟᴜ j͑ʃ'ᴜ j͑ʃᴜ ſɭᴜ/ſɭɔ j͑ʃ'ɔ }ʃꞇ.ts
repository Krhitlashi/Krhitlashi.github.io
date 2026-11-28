// ≺⧼ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ɭʃᴜ ֭ſɭᴜȝ - j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ɭʃᴜ ֭ſɭᴜȝ 📃 ⧽≻

// ⟪ ꞁȷ̀ɜ ʃэ ſɭɹ 📃 ⟫

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
const BAKANANO_KF2 = document.getElementById("bakanano-ſɭʞɹ") as HTMLInputElement;
const BAKANANO_HAT = document.getElementById("bakanano-hat") as HTMLInputElement;
const BAKANANO_MAKF2 = document.getElementById("bakanano-MAKF2") as HTMLInputElement;
const BAKANANO_VAQACUK = document.getElementById("bakanano-j͑ʃɽ͑ʃꞇ") as HTMLInputElement;
const BAKANANO_SCFALI = document.getElementById("bakanano-scfali") as HTMLInputElement;
const BAKANANO = document.getElementById("bakanano") as HTMLElement;
const BAKANANO_CA1ARA: HTMLInputElement[] = [
  BAKANANO_KF2,
  BAKANANO_HAT,
  BAKANANO_MAKF2,
  BAKANANO_VAQACUK,
  BAKANANO_SCFALI
];
// ⟨ j͑ʃ'ɜ ſןɹ ( HTML ) 📃 ⟩
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

// ⟪ j͑ʃп́ɔ ɭʃᴜ ֭ſɭᴜȝ 📃 ⟫



// ⟨ ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ( HEIC ) 📃 ⟩

async function tboHEIC(cakavop2EHeic: File): Promise<Blob> {
  const heic2anySaxe = await import("heic2any");
  const heic2any = heic2anySaxe.default as unknown as ( options: { blob: Blob; toType: string } ) => Promise<Blob | Blob[]>;
  const tlakakani = await heic2any({
    blob: cakavop2EHeic,
    toType: "image/png"
  });
  const pngSunta = Array.isArray(tlakakani) ? tlakakani[0o0] : tlakakani;
  if ( !( pngSunta instanceof Blob ) ) {
    throw new Error("ne1aHEIC");
  }
  return pngSunta;
}

// ⟪ ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ( DNG ) 📃 ⟫

// ⟨ j͑ʃɜƨ ꞁȷ̀ᴜ }ʃꞇ ( vas2tas.py ) 📃 ⟩

const DNG_M2_P = 0o1 / 0o100;
const DNG_PU_P = 0o277 / 0o300;
const DNG_P6ZWA = 0o40 / 0o100;
const DNG_TAP2_SOZA = 0o70 / 0o100;
const DNG_SOZA_FKABE = 0o70 / 0o100;
const DNG_JU_K2FE = 0o10 / 0o100;

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ ( vas2tas.py skaligi_al_okbit ) 📃 ⟩

function kf2K2feCa1ara(saxeTahaqS2: Float32Array, pal6K2fe: number): Float32Array {
  const k2fePal6 = saxeTahaqS2.length;
  const k2feCa1ara = new Float32Array(k2fePal6);
  // ⟨ ſɭɹ ſȷɔ ( np.percentile ) 📃 ⟩
  const saxeK2feCa1ara = Float32Array.from(saxeTahaqS2).sort();
  const quqS2K2fe = ( kxesuAraq: number ): number => {
    const saxeK2feRuva = Math.floor(kxesuAraq);
    const araqK2feRuva = Math.ceil(kxesuAraq);
    if ( saxeK2feRuva === araqK2feRuva ) {
      return saxeK2feCa1ara[saxeK2feRuva];
    }
    return saxeK2feCa1ara[saxeK2feRuva] + ( kxesuAraq - saxeK2feRuva ) * ( saxeK2feCa1ara[araqK2feRuva] - saxeK2feCa1ara[saxeK2feRuva] );
  };
  const quqK2fe = ( vem2: number ): number => quqS2K2fe(( k2fePal6 - 0o1 ) * vem2);

  let hunaK2fe = quqK2fe(DNG_M2_P);
  // ⟨ g6 ʌ }ʃɹƽ 📃 ⟩
  const kemafiS2 = quqK2fe(DNG_VEM2);
  let kemafiPal6 = 0o0;
  for ( let k2feRuva = 0o0; k2feRuva < k2fePal6; k2feRuva++ ) {
    if ( saxeK2feCa1ara[k2feRuva] < kemafiS2 ) {
      kemafiPal6++;
    } else {
      break;
    }
  }
  let t6fK2fe = kemafiPal6 > 0o0
    ? quqS2K2fe(( kemafiPal6 - 0o1 ) * DNG_PU_P)
    : quqK2fe(DNG_PU_P);
  if ( t6fK2fe - hunaK2fe < 0o1 / 0o2000 ) {
    let hunaSaxe = saxeTahaqS2[0o0];
    let t6fSaxe = saxeTahaqS2[0o0];
    for ( let k2feRuva = 0o1; k2feRuva < k2fePal6; k2feRuva++ ) {
      if ( saxeTahaqS2[k2feRuva] < hunaSaxe ) hunaSaxe = saxeTahaqS2[k2feRuva];
      if ( saxeTahaqS2[k2feRuva] > t6fSaxe ) t6fSaxe = saxeTahaqS2[k2feRuva];
    }
    hunaK2fe = hunaSaxe;
    t6fK2fe = t6fSaxe;
  }
  let kxesuT6f = saxeTahaqS2[0o0];
  for ( let k2feRuva = 0o1; k2feRuva < k2fePal6; k2feRuva++ ) {
    if ( saxeTahaqS2[k2feRuva] > kxesuT6f ) kxesuT6f = saxeTahaqS2[k2feRuva];
  }
  if ( kxesuT6f < t6fK2fe ) {
    kxesuT6f = t6fK2fe;
  }
  let sozaK2fe = t6fK2fe * DNG_SOZA_FKABE;
  if ( sozaK2fe - hunaK2fe < 0o1 / 0o2000 ) {
    sozaK2fe = hunaK2fe + ( t6fK2fe - hunaK2fe ) * ( 0o1 / 0o2 );
  }

  /*
  * ⟨ ſɭc̗ᴜ j͑ʃ'ɔ ʌ ſɭɹ ſȷɔ 📃 ⟩
  * ⟨ j͑ʃᴜƽ ( smoothstep ) 📃 ⟩
  */
  for ( let k2feRuva = 0o0; k2feRuva < k2fePal6; k2feRuva++ ) {
    const saxeK2fe = saxeTahaqS2[k2feRuva];
    let j6fini: number;
    if ( saxeK2fe <= sozaK2fe ) {
      let ne1anesaiK2fe = sozaK2fe > hunaK2fe ? ( saxeK2fe - hunaK2fe ) / ( sozaK2fe - hunaK2fe ) : 0o0;
      if ( ne1anesaiK2fe < 0o0 ) ne1anesaiK2fe = 0o0;
      if ( ne1anesaiK2fe > 0o1 ) ne1anesaiK2fe = 0o1;
      if ( DNG_P6ZWA !== 0o1 ) {
        ne1anesaiK2fe = Math.pow(ne1anesaiK2fe, DNG_P6ZWA);
      }
      j6fini = ne1anesaiK2fe * DNG_TAP2_SOZA;
    } else {
      let ne1anesaiK2fe = kxesuT6f > sozaK2fe ? ( saxeK2fe - sozaK2fe ) / ( kxesuT6f - sozaK2fe ) : 0o1;
      if ( ne1anesaiK2fe < 0o0 ) ne1anesaiK2fe = 0o0;
      if ( ne1anesaiK2fe > 0o1 ) ne1anesaiK2fe = 0o1;
      ne1anesaiK2fe = ne1anesaiK2fe * ne1anesaiK2fe * ( 0o3 - ( 0o2 * ne1anesaiK2fe ) );
      j6fini = DNG_TAP2_SOZA + ( ( 0o1 - DNG_TAP2_SOZA ) * ne1anesaiK2fe );
      if ( j6fini > 0o1 ) j6fini = 0o1;
    }
    k2feCa1ara[k2feRuva] = j6fini < 0o0 ? 0o0 : j6fini > 0o1 ? 0o1 : j6fini;
  }

  if ( DNG_JU_K2FE > 0o0 ) {
    // ⟨ ſɭɜ ı],ɹȝ ʌ ᶅſɔ ֭ſɭɹ ( DNG ) 📃 ⟩
    for ( let tahaqRuva = 0o0; tahaqRuva < pal6K2fe; tahaqRuva++ ) {
      const saxeRuva = tahaqRuva * 0o3;
      const t6fPal6 = Math.max(k2feCa1ara[saxeRuva], k2feCa1ara[saxeRuva + 0o1], k2feCa1ara[saxeRuva + 0o2]);
      const hunaPal6 = Math.min(k2feCa1ara[saxeRuva], k2feCa1ara[saxeRuva + 0o1], k2feCa1ara[saxeRuva + 0o2]);
      const k2fe = t6fPal6 > 0o1 / 0o2000000 ? ( t6fPal6 - hunaPal6 ) / t6fPal6 : 0o0;
      const kxesuK2fe = 0o1 + ( DNG_JU_K2FE * ( 0o1 - k2fe ) );
      const kox2ha = ( k2feCa1ara[saxeRuva] + k2feCa1ara[saxeRuva + 0o1] + k2feCa1ara[saxeRuva + 0o2] ) / 0o3;
      for ( let vop2K2fe = 0o0; vop2K2fe < 0o3; vop2K2fe++ ) {
        const j6fini = kox2ha + ( ( k2feCa1ara[saxeRuva + vop2K2fe] - kox2ha ) * kxesuK2fe );
        k2feCa1ara[saxeRuva + vop2K2fe] = j6fini < 0o0 ? 0o0 : j6fini > 0o1 ? 0o1 : j6fini;
      }
    }
  }
  return k2feCa1ara;
}

// ⟨ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ j͑ʃ'ɜ ſןɹ ( TIFF IFD tifffile ) 📃 ⟩

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ ( JPEG XL libraw-wasm 52546 ) 📃 ⟩
const JXL_K2FE = 0o146502;

interface TIFFQuq {
  sefini: number;
  l6da: number;
  c2w2q: number;
  k2fe: number;
  g6: number[] | null;
  s2: Uint8Array;
}

/**
* j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɹ ſȷɔ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( IFD 256 257 259 273 274 279 50728 AsShotNeutral )
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
  let g6: number[] | null = null;
  for ( let ksakaK2fe = 0o0; ksakaK2fe < kxesuK2fe; ksakaK2fe++ ) {
    const saxeK2fe = ifd + 0o2 + ksakaK2fe * 0o14;
    if ( saxeK2fe + 0o14 > sab2.length ) break;
    const ksaka = quqSab2.getUint16(saxeK2fe, m2Kp6Htaka);
    const hat = quqSab2.getUint16(saxeK2fe + 0o2, m2Kp6Htaka);
    const ksakaPal6 = quqSab2.getUint32(saxeK2fe + 0o4, m2Kp6Htaka);
    // ⟨ ֭ſɭᴜ ı],ɔ ʌ ſɭɹ ſȷɔ ( 1 2 3 4 5 12 ) 📃 ⟩
    const k61e = hat === 0o1 ? 0o1 : hat === 0o3 ? 0o2 : hat === 0o4 ? 0o4 : ( hat === 0o5 || hat === 0o12 ) ? 0o10 : 0o0;
    if ( k61e === 0o0 || ksakaPal6 === 0o0 ) continue;
    const saxeAraq = k61e * ksakaPal6;
    const kxesuAraq = saxeAraq <= 0o4 ? saxeK2fe + 0o10 : quqSab2.getUint32(saxeK2fe + 0o10, m2Kp6Htaka);
    if ( kxesuAraq < 0o0 || kxesuAraq + saxeAraq > sab2.length ) continue;
    if ( ksaka === 0o143050 ) {
      // ⟨ ſɭɹ ſȷɔ ( AsShotNeutral ) 📃 ⟩
      const k2feCa1ara: number[] = [];
      for ( let g6K2fe = 0o0; g6K2fe < ksakaPal6 && k2feCa1ara.length < 0o3; g6K2fe++ ) {
        const k2fe = hat === 0o12 ? quqSab2.getInt32(kxesuAraq + g6K2fe * 0o10, m2Kp6Htaka) : quqSab2.getUint32(kxesuAraq + g6K2fe * 0o10, m2Kp6Htaka);
        const araqK2fe = hat === 0o12 ? quqSab2.getInt32(kxesuAraq + g6K2fe * 0o10 + 0o4, m2Kp6Htaka) : quqSab2.getUint32(kxesuAraq + g6K2fe * 0o10 + 0o4, m2Kp6Htaka);
        k2feCa1ara.push(araqK2fe !== 0o0 ? k2fe / araqK2fe : 0o1);
      }
      g6 = k2feCa1ara.length === 0o3 ? k2feCa1ara : null;
      continue;
    }
    const quqK2fe = ( k2feRuva: number ): number => hat === 0o3 ? quqSab2.getUint16(kxesuAraq + k2feRuva * 0o2, m2Kp6Htaka) : quqSab2.getUint32(kxesuAraq + k2feRuva * 0o4, m2Kp6Htaka);
    if ( ksaka === 0o400 ) sefini = quqK2fe(0o0);
    else if ( ksaka === 0o401 ) l6da = quqK2fe(0o0);
    else if ( ksaka === 0o403 ) k2fe = quqK2fe(0o0);
    else if ( ksaka === 0o422 ) c2w2q = quqK2fe(0o0);
    else if ( ksaka === 0o421 && s2K2fe < 0o0 ) s2K2fe = quqK2fe(0o0);
    else if ( ksaka === 0o427 && s2Pal6 === 0o0 ) s2Pal6 = quqK2fe(0o0);
  }
  if ( sefini <= 0o0 || l6da <= 0o0 || s2K2fe < 0o0 ) return null;
  if ( s2Pal6 <= 0o0 || s2K2fe + s2Pal6 > sab2.length ) s2Pal6 = sab2.length - s2K2fe;
  return { sefini, l6da, c2w2q, k2fe, g6, s2: sab2.subarray(s2K2fe, s2K2fe + s2Pal6) };
}

// ⟨ ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ( JXL DNG JPEG XL 52546 ) 📃 ⟩

// ⟨ j͑ʃ'ɜ ſןɹ ʌ ſɭɹ ſȷɔ ( PNG 16 8 65535 ) 📃 ⟩

function quqK2fe(eskek: Uint8Array, kxesuAraq: number, kxesuK2fe: number): number {
  return kxesuK2fe === 0o20 ? ( eskek[kxesuAraq] << 0o10 ) | eskek[kxesuAraq + 0o1] : eskek[kxesuAraq] * 0o401;
}

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ ( PNG jxl-oxide Float32 ) 📃 ⟩

/**
* ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ ( PNG jxl-oxide libjxl ) 📃 ⟩
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

  const saxeAraqSab2 = new Uint8Array(idatS2Ca1ara.reduce(( saxePal6, idatS2 ) => saxePal6 + idatS2.length, 0o0));
  let kxesuS2K2fe = 0o0;
  for ( const idatS2 of idatS2Ca1ara ) {
    saxeAraqSab2.set(idatS2, kxesuS2K2fe);
    kxesuS2K2fe += idatS2.length;
  }
  const s2Quq = new DecompressionStream("deflate");
  let suntaSab2: Uint8Array | null = new Uint8Array(await new Response(new Blob([ saxeAraqSab2 ]).stream().pipeThrough(s2Quq)).arrayBuffer());

  const kxesuSab2 = kxesuK2fe / 0o10;
  const kxesuSab2K2fe = saxeK2fe * kxesuSab2;
  const k2fe = sefini * kxesuSab2K2fe;
  let kxesuSuntaSab2 = new Uint8Array(l6da * k2fe);
  let ruvaPeceto = 0o0;
  for ( let cepu = 0o0; cepu < l6da; cepu++ ) {
    const kxesuHat = suntaSab2[ruvaPeceto++];
    const araq = cepu * k2fe;
    for ( let tapu = 0o0; tapu < k2fe; tapu++ ) {
      const saxeTapu = tapu >= kxesuSab2K2fe ? kxesuSuntaSab2[araq + tapu - kxesuSab2K2fe] : 0o0;
      const saxeCepu = cepu > 0o0 ? kxesuSuntaSab2[araq - k2fe + tapu] : 0o0;
      const saxeTapuCepu = cepu > 0o0 && tapu >= kxesuSab2K2fe ? kxesuSuntaSab2[araq - k2fe + tapu - kxesuSab2K2fe] : 0o0;
      const j6fini = suntaSab2[ruvaPeceto + tapu];
      let kxesuJ6fini = j6fini;
      if ( kxesuHat === 0o1 ) {
        kxesuJ6fini = ( j6fini + saxeTapu ) & 0o377;
      } else if ( kxesuHat === 0o2 ) {
        kxesuJ6fini = ( j6fini + saxeCepu ) & 0o377;
      } else if ( kxesuHat === 0o3 ) {
        kxesuJ6fini = ( j6fini + ( ( saxeTapu + saxeCepu ) >> 0o1 ) ) & 0o377;
      } else if ( kxesuHat === 0o4 ) {
        const saxeKox2ha = saxeTapu + saxeCepu - saxeTapuCepu;
        const tapuSaka = Math.abs(saxeKox2ha - saxeTapu);
        const cepuSaka = Math.abs(saxeKox2ha - saxeCepu);
        const tapuCepuSaka = Math.abs(saxeKox2ha - saxeTapuCepu);
        kxesuJ6fini = ( j6fini + ( tapuSaka <= cepuSaka && tapuSaka <= tapuCepuSaka ? saxeTapu : cepuSaka <= tapuCepuSaka ? saxeCepu : saxeTapuCepu ) ) & 0o377;
      }
      kxesuSuntaSab2[araq + tapu] = kxesuJ6fini;
    }
    ruvaPeceto += k2fe;
  }
  suntaSab2 = null;

  const tahaqS2 = new Float32Array(sefini * l6da * 0o3);
  const ne1anesaiCa1ara = kxesuSuntaSab2;
  for ( let tahaqRuva = 0o0, tahaqS2Ruva = 0o0; tahaqRuva < sefini * l6da; tahaqRuva++, tahaqS2Ruva += 0o3 ) {
    if ( saxeHat === 0o0 ) {
      const kox2ha = quqK2fe(ne1anesaiCa1ara, tahaqRuva * kxesuSab2, kxesuK2fe);
      tahaqS2[tahaqS2Ruva] = kox2ha;
      tahaqS2[tahaqS2Ruva + 0o1] = kox2ha;
      tahaqS2[tahaqS2Ruva + 0o2] = kox2ha;
      continue;
    }
    const saxeK2fe = tahaqRuva * kxesuSab2K2fe;
    const welaSaxe = quqK2fe(ne1anesaiCa1ara, saxeK2fe, kxesuK2fe);
    tahaqS2[tahaqS2Ruva] = welaSaxe;
    if ( saxeHat === 0o4 ) {
      tahaqS2[tahaqS2Ruva + 0o1] = welaSaxe;
      tahaqS2[tahaqS2Ruva + 0o2] = welaSaxe;
      continue;
    }
    tahaqS2[tahaqS2Ruva + 0o1] = quqK2fe(ne1anesaiCa1ara, saxeK2fe + kxesuSab2, kxesuK2fe);
    tahaqS2[tahaqS2Ruva + 0o2] = quqK2fe(ne1anesaiCa1ara, saxeK2fe + 0o2 * kxesuSab2, kxesuK2fe);
  }
  return { sefini, l6da, tahaqS2 };
}

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ ( jxl-oxide 16 ) 📃 ⟩

async function ne1aJXL(sab2: Uint8Array): Promise<{ sefini: number; l6da: number; tahaqS2: Float32Array } | null> {
  const jxlSaxe = await import("jxl-oxide-wasm");
  // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ 📃 ⟩
  await jxlSaxe.default( );
  const saxeTahaq = new jxlSaxe.JxlImage();
  try {
    // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ 📃 ⟩
    saxeTahaq.forceSrgb = false;
    saxeTahaq.feedBytes(sab2);
    if ( !saxeTahaq.tryInit() ) {
      return null;
    }
    const k61e = saxeTahaq.render();
    // ⟨ j͑ʃwc̗ ɭʃw ʌ j͑ʃ'ɜ ſןɹ 📃 ⟩
    try {
      const pngSab2 = k61e.encodeToPng( );
      const ne1anesaiCa1ara = await pngAraNe1anesaiCa1ara(pngSab2);
      return ne1anesaiCa1ara;
    } finally {
      try {
        k61e.free( );
      } catch {
        // ⟨ j͑ʃwc̗ ɭʃw ʌ j͑ʃ'ɜ ſןɹ 📃 ⟩
      }
    }
  } catch {
    return null;
  } finally {
    try {
      saxeTahaq.free( );
    } catch {
      // ⟨ j͑ʃwc̗ ɭʃw ʌ j͑ʃ'ɜ ſןɹ 📃 ⟩
    }
  }
}

// ⟨ ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ( DNG ) 📃 ⟩

// ⟨ g6 ʌ j͑ʃ'ɜ ſןɹ ( vas2tas.py 0 1 AsShotNeutral ) 📃 ⟩
const DNG_G6_K2FE = 0o1 / 0o2;
// ⟨ ſɭɹ ſȷɔ ( tifffile ) 📃 ⟩
const DNG_VEM2 = 0o1747 / 0o1750;

function kf2G6Pupahak(tahaqS2: Float32Array, g6Ca1ara: number[]): void {
  const k2feCa1ara = [ 0o1, 0o1, 0o1 ];
  for ( let g6K2fe = 0o0; g6K2fe < 0o3; g6K2fe++ ) {
    const j6fini = g6Ca1ara[g6K2fe] > 0o0 ? g6Ca1ara[g6K2fe] : 0o1;
    k2feCa1ara[g6K2fe] = 0o1 + DNG_G6_K2FE * ( j6fini - 0o1 );
  }
  const tahaqPal6 = tahaqS2.length / 0o3;
  for ( let tahaqRuva = 0o0; tahaqRuva < tahaqPal6; tahaqRuva++ ) {
    tahaqS2[tahaqRuva * 0o3] /= k2feCa1ara[0o0];
    tahaqS2[tahaqRuva * 0o3 + 0o1] /= k2feCa1ara[0o1];
    tahaqS2[tahaqRuva * 0o3 + 0o2] /= k2feCa1ara[0o2];
  }
}

/**
* ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɹ ſȷɔ ( 99.9 65535 tifffile ) 📃 ⟩
 * @returns void
*/
function kf2K2feSaxeS2(tahaqS2: Float32Array): void {
  const tahaqPal6 = tahaqS2.length / 0o3;
  const sab2 = new Float32Array(tahaqPal6);
  for ( let g6K2fe = 0o0; g6K2fe < 0o3; g6K2fe++ ) {
    for ( let tahaqRuva = 0o0; tahaqRuva < tahaqPal6; tahaqRuva++ ) sab2[tahaqRuva] = tahaqS2[tahaqRuva * 0o3 + g6K2fe];
    sab2.sort();
    const kxesuAraq = ( tahaqPal6 - 0o1 ) * DNG_VEM2;
    const saxeK2feRuva = Math.floor(kxesuAraq);
    const araqK2feRuva = Math.ceil(kxesuAraq);
    let kemafi = sab2[saxeK2feRuva];
    if ( araqK2feRuva !== saxeK2feRuva ) kemafi += ( kxesuAraq - saxeK2feRuva ) * ( sab2[araqK2feRuva] - sab2[saxeK2feRuva] );
    if ( kemafi < 0o1 ) kemafi = 0o1;
    const kxesuK2fe = 0o177777 / kemafi;
    for ( let tahaqRuva = 0o0; tahaqRuva < tahaqPal6; tahaqRuva++ ) tahaqS2[tahaqRuva * 0o3 + g6K2fe] *= kxesuK2fe;
  }
}

// ⟨ ſןᴜ j͐ʃэ ʌ ſɟɹ ᶅſɹȝ 📃 ⟩
function quqC2w2qPal6(sefini: number, l6da: number, c2w2q: number): { sefini: number; l6da: number } {
  const c2w2qKetu = c2w2q >= 0o5 && c2w2q <= 0o10;
  return { sefini: c2w2qKetu ? l6da : sefini, l6da: c2w2qKetu ? sefini : l6da };
}

// ⟨ ʃᴜ j͑ʃᴜ ʃɜ ʌ ɭʃᴜ ֭ſɭᴜȝ ( EXIF ) 📃 ⟩
function kf2C2w2qSunta(sunta: Uint8ClampedArray, k2feCa1ara: Float32Array, sefini: number, l6da: number, c2w2q: number): void {
  const c2w2qKetu = c2w2q >= 0o5 && c2w2q <= 0o10;
  const suntaSefini = c2w2qKetu ? l6da : sefini;
  const suntaL6da = c2w2qKetu ? sefini : l6da;
  for ( let cepu = 0o0; cepu < suntaL6da; cepu++ ) {
    for ( let tapu = 0o0; tapu < suntaSefini; tapu++ ) {
      let saxeTapu = tapu;
      let saxeCepu = cepu;
      if ( c2w2q === 0o2 ) {
        saxeTapu = sefini - 0o1 - tapu;
      } else if ( c2w2q === 0o3 ) {
        saxeTapu = sefini - 0o1 - tapu;
        saxeCepu = l6da - 0o1 - cepu;
      } else if ( c2w2q === 0o4 ) {
        saxeCepu = l6da - 0o1 - cepu;
      } else if ( c2w2q === 0o5 ) {
        // ⟨ ʃᴜ j͑ʃᴜ ʃɜ 📃 ⟩
        saxeTapu = cepu;
        saxeCepu = tapu;
      } else if ( c2w2q === 0o6 ) {
        // ⟨ ʃᴜ j͑ʃᴜ ʃɜ ( 90 ) 📃 ⟩
        saxeTapu = cepu;
        saxeCepu = l6da - 0o1 - tapu;
      } else if ( c2w2q === 0o7 ) {
        // ⟨ ʃᴜ j͑ʃᴜ ʃɜ 📃 ⟩
        saxeTapu = sefini - 0o1 - cepu;
        saxeCepu = l6da - 0o1 - tapu;
      } else if ( c2w2q === 0o10 ) {
        // ⟨ ʃᴜ j͑ʃᴜ ʃɜ ( 90 ) 📃 ⟩
        saxeTapu = sefini - 0o1 - cepu;
        saxeCepu = tapu;
      }
      const suntaRuva = ( cepu * suntaSefini + tapu ) * 0o4;
      const saxeRuva = ( saxeCepu * sefini + saxeTapu ) * 0o3;
      sunta[suntaRuva] = Math.round(k2feCa1ara[saxeRuva] * 0o377);
      sunta[suntaRuva + 0o1] = Math.round(k2feCa1ara[saxeRuva + 0o1] * 0o377);
      sunta[suntaRuva + 0o2] = Math.round(k2feCa1ara[saxeRuva + 0o2] * 0o377);
      sunta[suntaRuva + 0o3] = 0o377;
    }
  }
}

// ⟨ j͑ʃ'ɜ ſןɹ ʌ ſɭɹ ſȷɔ ( DNG ) 📃 ⟩
function ne1aSunta(sab2: Uint8Array | Uint16Array | Uint8ClampedArray | Float32Array): boolean {
  const k2fe = Math.max(0o1, Math.floor(sab2.length / 0o10000));
  for ( let sab2Ruva = 0o0; sab2Ruva < sab2.length; sab2Ruva += k2fe ) {
    if ( sab2[sab2Ruva] !== 0o0 ) return false;
  }
  return true;
}

// ⟨ ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ( tboDNG DNG PNG rawpy tifffile vas2tas.py ) 📃 ⟩

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
  * ⟨ ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ( JPEG XL tifffile libraw-wasm ) 📃 ⟩
  */
  const s2JXL = tiffQuq !== null && tiffQuq.k2fe === JXL_K2FE;
  // ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ ( vas2tas.py ) 📃 ⟩
  const eskekAraPng = async ( sefini: number, l6da: number, sab2: Uint8Array | Uint16Array, kxesuK2fe: boolean ): Promise<Blob | null> => {
    if ( kxesuK2fe && ne1aSunta(sab2) ) return null;
    const tahaqPal6 = sefini * l6da;
    suntaKuba.width = sefini;
    suntaKuba.height = l6da;
    const vop2 = kumukalasu.createImageData(sefini, l6da);
    const sunta = vop2.data;
    const tahaqS2 = new Float32Array(tahaqPal6 * 0o3);
    if ( kxesuK2fe ) {
      tahaqS2.set(( sab2 as Uint16Array ).subarray(0o0, tahaqPal6 * 0o3));
    } else {
      for ( let tahaqRuva = 0o0; tahaqRuva < tahaqPal6; tahaqRuva++ ) {
        tahaqS2[tahaqRuva * 0o3] = ( sab2 as Uint8Array )[tahaqRuva * 0o3];
        tahaqS2[tahaqRuva * 0o3 + 0o1] = ( sab2 as Uint8Array )[tahaqRuva * 0o3 + 0o1];
        tahaqS2[tahaqRuva * 0o3 + 0o2] = ( sab2 as Uint8Array )[tahaqRuva * 0o3 + 0o2];
      }
    }
    const k2feCa1ara = kf2K2feCa1ara(tahaqS2, tahaqPal6);
    for ( let tahaqRuva = 0o0; tahaqRuva < tahaqPal6; tahaqRuva++ ) {
      sunta[tahaqRuva * 0o4] = Math.round(k2feCa1ara[tahaqRuva * 0o3] * 0o377);
      sunta[tahaqRuva * 0o4 + 0o1] = Math.round(k2feCa1ara[tahaqRuva * 0o3 + 0o1] * 0o377);
      sunta[tahaqRuva * 0o4 + 0o2] = Math.round(k2feCa1ara[tahaqRuva * 0o3 + 0o2] * 0o377);
      sunta[tahaqRuva * 0o4 + 0o3] = 0o377;
    }
    kumukalasu.putImageData(vop2, 0o0, 0o0);
    return await kf2PngSunta();
  };

  try {
    try {
      if ( !s2JXL ) {
      /*
      * ⟨ ſןw ʌ j͑ʃ'ɜ ſןɹ ( JPEG XL libraw ) 📃 ⟩
      * ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ ( RGB rawpy postprocess ) 📃 ⟩
      * ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ ( libraw ) 📃 ⟩
      */
      await librawQuq.open(sab2.slice(), { useCameraWb: true, outputColor: 0o1, outputBps: 0o20, noAutoBright: true, gamm: [ 0o1, 0o1 ] });
      const suntaEskek = await librawQuq.imageData();
      if ( suntaEskek && suntaEskek.width > 0o0 && suntaEskek.height > 0o0 && !ne1aSunta(suntaEskek.data) ) {
        const sefini = suntaEskek.width;
        const l6da = suntaEskek.height;
        const tahaqPal6 = sefini * l6da;
        const saxeK2fe = suntaEskek.colors === 0o4 ? 0o4 : 0o3;
        const sab2 = suntaEskek.data;
        const kxesuK2fe = suntaEskek.bits === 0o20;

        suntaKuba.width = sefini;
        suntaKuba.height = l6da;
        const vop2 = kumukalasu.createImageData(sefini, l6da);
        const sunta = vop2.data;
        if ( kxesuK2fe ) {
          // ⟨ ſɭc̗ᴜ ſɭɹ ſȷɔ ʌ ſɭɹ ſȷɔ ( 16 0 65535 vas2tas.py ) 📃 ⟩
          const tahaqS2 = new Float32Array(tahaqPal6 * 0o3);
          for ( let tahaqRuva = 0o0; tahaqRuva < tahaqPal6; tahaqRuva++ ) {
            tahaqS2[tahaqRuva * 0o3] = ( sab2 as Uint16Array )[tahaqRuva * saxeK2fe];
            tahaqS2[tahaqRuva * 0o3 + 0o1] = ( sab2 as Uint16Array )[tahaqRuva * saxeK2fe + 0o1];
            tahaqS2[tahaqRuva * 0o3 + 0o2] = ( sab2 as Uint16Array )[tahaqRuva * saxeK2fe + 0o2];
          }
          const k2feCa1ara = kf2K2feCa1ara(tahaqS2, tahaqPal6);
          for ( let tahaqRuva = 0o0; tahaqRuva < tahaqPal6; tahaqRuva++ ) {
            sunta[tahaqRuva * 0o4] = Math.round(k2feCa1ara[tahaqRuva * 0o3] * 0o377);
            sunta[tahaqRuva * 0o4 + 0o1] = Math.round(k2feCa1ara[tahaqRuva * 0o3 + 0o1] * 0o377);
            sunta[tahaqRuva * 0o4 + 0o2] = Math.round(k2feCa1ara[tahaqRuva * 0o3 + 0o2] * 0o377);
            sunta[tahaqRuva * 0o4 + 0o3] = 0o377;
          }
        } else {
          for ( let tahaqRuva = 0o0; tahaqRuva < tahaqPal6; tahaqRuva++ ) {
            sunta[tahaqRuva * 0o4] = ( sab2 as Uint8Array )[tahaqRuva * saxeK2fe];
            sunta[tahaqRuva * 0o4 + 0o1] = ( sab2 as Uint8Array )[tahaqRuva * saxeK2fe + 0o1];
            sunta[tahaqRuva * 0o4 + 0o2] = ( sab2 as Uint8Array )[tahaqRuva * saxeK2fe + 0o2];
            sunta[tahaqRuva * 0o4 + 0o3] = 0o377;
          }
        }
        kumukalasu.putImageData(vop2, 0o0, 0o0);
        return await kf2PngSunta();
      }
      }
    } catch {
    // ⟨ ſןw ʌ ſɭэ ֭ſɭэ ( tifffile ) 📃 ⟩
  }

  // ⟨ ſɭэ ֭ſɭэ ( tifffile legi_dng TIFF ) 📃 ⟩
  try {
    if ( tiffQuq ) {
      // ⟨ ɭʃɀɜ ʌ j͑ʃ'ɜ ſןɹ ( 3 JXL 16 ) 📃 ⟩
      const jxlTahaq = await ne1aJXL(tiffQuq.s2);
      if ( jxlTahaq && jxlTahaq.sefini > 0o0 && jxlTahaq.l6da > 0o0 && !ne1aSunta(jxlTahaq.tahaqS2) ) {
        const tahaqPal6 = jxlTahaq.sefini * jxlTahaq.l6da;
        const tahaqS2 = jxlTahaq.tahaqS2;
        if ( tiffQuq.g6 ) kf2G6Pupahak(tahaqS2, tiffQuq.g6);
        // ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭɹ ſȷɔ ( 65535 ) 📃 ⟩
        kf2K2feSaxeS2(tahaqS2);
        const k2feCa1ara = kf2K2feCa1ara(tahaqS2, tahaqPal6);
        const c2w2qPal6 = quqC2w2qPal6(jxlTahaq.sefini, jxlTahaq.l6da, tiffQuq.c2w2q);
        suntaKuba.width = c2w2qPal6.sefini;
        suntaKuba.height = c2w2qPal6.l6da;
        const vop2 = kumukalasu.createImageData(c2w2qPal6.sefini, c2w2qPal6.l6da);
        kf2C2w2qSunta(vop2.data, k2feCa1ara, jxlTahaq.sefini, jxlTahaq.l6da, tiffQuq.c2w2q);
        kumukalasu.putImageData(vop2, 0o0, 0o0);
        return await kf2PngSunta();
      }
    }
    /*
    * ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ ( 3 DNG RGB ) 📃 ⟩
    * ⟨ ſɟᴜ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ſɟᴜ ı],ɹͷ̗ 📃 ⟩
    */
    const eskek = await librawQuq.rawImageData();
    if ( eskek && eskek.width > 0o0 && eskek.height > 0o0 && eskek.data.length >= eskek.width * eskek.height * 0o3 && !ne1aSunta(eskek.data) ) {
      const pngSunta = await eskekAraPng(eskek.width, eskek.height, eskek.data, true);
      if ( pngSunta ) return pngSunta;
    }

    // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ɭʃᴜ ֭ſɭᴜȝ ( 4 JPEG TIFF ) 📃 ⟩
    const saxeKuba = await librawQuq.thumbnailData().catch(() => undefined);
    if ( saxeKuba && saxeKuba.data.length > 0o0 ) {
      const saxeTahaqSweruva = URL.createObjectURL(new Blob([ saxeKuba.data.slice() ], { type: saxeKuba.format === "jpeg" ? "image/jpeg" : "application/octet-stream" }));
      try {
        const saxeTahaq = await new Promise<HTMLImageElement>(( xema, ne1aXema ) => {
          const saxeTahaq = new Image();
          saxeTahaq.onload = () => xema(saxeTahaq);
          saxeTahaq.onerror = () => ne1aXema(new Error("tlohk2ni"));
          saxeTahaq.src = saxeTahaqSweruva;
        });
        suntaKuba.width = saxeTahaq.naturalWidth;
        suntaKuba.height = saxeTahaq.naturalHeight;
        kumukalasu.drawImage(saxeTahaq, 0o0, 0o0);
        return await kf2PngSunta();
      } finally {
        URL.revokeObjectURL(saxeTahaqSweruva);
      }
    }
  } catch {
    // ⟨ ſןw ʌ ſɭэ ֭ſɭэ 📃 ⟩
  }

  throw new Error("ne1aDNG");
  } finally {
    await librawQuq.dispose();
  }
}

// ⟪ j͑ʃ'ᴜ ɭʃᴜ }ʃɔƽ - ᶅſɔ ֭ſɭɹ ʌ ſɟᴜ ı],ɹͷ̗ 📃 ⟫

const KMABAKANT2 = 0o20;
const VATANEK_CAK2BAKANO = new Uint8Array(0o400);

for ( let k2feRuva = 0o0; k2feRuva < 0o400; k2feRuva++ ) {
  VATANEK_CAK2BAKANO[k2feRuva] = Math.floor(k2feRuva / KMABAKANT2) * KMABAKANT2 + Math.floor(KMABAKANT2 / 0o2);
}

function vatanekWeh2(vop2: Uint8ClampedArray): void {
  for ( let vop2Ruva = 0o0; vop2Ruva < vop2.length; vop2Ruva += 0o4 ) {
    vop2[vop2Ruva] = VATANEK_CAK2BAKANO[vop2[vop2Ruva]];
    vop2[vop2Ruva + 0o1] = VATANEK_CAK2BAKANO[vop2[vop2Ruva + 0o1]];
    vop2[vop2Ruva + 0o2] = VATANEK_CAK2BAKANO[vop2[vop2Ruva + 0o2]];
  }
}

// ⟪ ſɭʞɹ 📃 ⟫

const VAXAHA_PAL6 = 0o2;
const VAXAHA_PUKA5IK = VAXAHA_PAL6 * 0o2 + 0o1;
const VAXAHA_KUBA = 0o30 * 0o30;

function vaxahaNakoxa(vop2: Uint8ClampedArray, sefini: number, l6da: number): void {
  const saxeVop2 = new Uint8ClampedArray(vop2);

  for ( let cepu = VAXAHA_PAL6 * 0o2; cepu < l6da - VAXAHA_PAL6 * 0o2; cepu++ ) {
    for ( let tapu = VAXAHA_PAL6 * 0o2; tapu < sefini - VAXAHA_PAL6 * 0o2; tapu++ ) {
      const ruva = ( cepu * sefini + tapu ) * 0o4;

      let l6nllakWela = 0o0, l6nllakLha = 0o0, l6nllakC2s2k = 0o0;
      let l6nllakP6zeWela = 0o0, l6nllakP6zeLha = 0o0, l6nllakP6zeC2s2k = 0o0;

      for ( let cepuSaka = -VAXAHA_PAL6; cepuSaka <= VAXAHA_PAL6; cepuSaka++ ) {
        const saxeCepuRuva = ( ( cepu + cepuSaka ) * sefini + tapu ) * 0o4;
        for ( let tapuSaka = -VAXAHA_PAL6; tapuSaka <= VAXAHA_PAL6; tapuSaka++ ) {
          const kxesuVop2Ruva = saxeCepuRuva + tapuSaka * 0o4;
          l6nllakWela += saxeVop2[kxesuVop2Ruva];
          l6nllakLha += saxeVop2[kxesuVop2Ruva + 0o1];
          l6nllakC2s2k += saxeVop2[kxesuVop2Ruva + 0o2];
          l6nllakP6zeWela += saxeVop2[kxesuVop2Ruva] * saxeVop2[kxesuVop2Ruva];
          l6nllakP6zeLha += saxeVop2[kxesuVop2Ruva + 0o1] * saxeVop2[kxesuVop2Ruva + 0o1];
          l6nllakP6zeC2s2k += saxeVop2[kxesuVop2Ruva + 0o2] * saxeVop2[kxesuVop2Ruva + 0o2];
        }
      }

      const q6k2kaBavek2feni = 0o1 / ( VAXAHA_PUKA5IK * VAXAHA_PUKA5IK );
      const kox2haWela = l6nllakWela * q6k2kaBavek2feni;
      const kox2haLha = l6nllakLha * q6k2kaBavek2feni;
      const kox2haC2s2k = l6nllakC2s2k * q6k2kaBavek2feni;
      const zezaniWela = l6nllakP6zeWela * q6k2kaBavek2feni - kox2haWela * kox2haWela;
      const zezaniLha = l6nllakP6zeLha * q6k2kaBavek2feni - kox2haLha * kox2haLha;
      const zezaniC2s2k = l6nllakP6zeC2s2k * q6k2kaBavek2feni - kox2haC2s2k * kox2haC2s2k;
      const zezani = zezaniWela + zezaniLha + zezaniC2s2k;

      if ( zezani < VAXAHA_KUBA ) {
        let swekox2haWela = 0o0, swekox2haLha = 0o0, swekox2haC2s2k = 0o0;
        let swekox2haBavek2feni = 0o0;
        const saxeRuva = ruva;

        for ( let cepuSaka = -VAXAHA_PAL6 * 0o2; cepuSaka <= VAXAHA_PAL6 * 0o2; cepuSaka++ ) {
          const araqCepuRuva = ( ( cepu + cepuSaka ) * sefini + tapu ) * 0o4;
          for ( let tapuSaka = -VAXAHA_PAL6 * 0o2; tapuSaka <= VAXAHA_PAL6 * 0o2; tapuSaka++ ) {
            const kxesuVop2Ruva = araqCepuRuva + tapuSaka * 0o4;
            const sakaWela = saxeVop2[kxesuVop2Ruva] - saxeVop2[saxeRuva];
            const sakaLha = saxeVop2[kxesuVop2Ruva + 0o1] - saxeVop2[saxeRuva + 0o1];
            const sakaC2s2k = saxeVop2[kxesuVop2Ruva + 0o2] - saxeVop2[saxeRuva + 0o2];

            if ( ( sakaWela * sakaWela ) < VAXAHA_KUBA && ( sakaLha * sakaLha ) < VAXAHA_KUBA && ( sakaC2s2k * sakaC2s2k ) < VAXAHA_KUBA ) {
              swekox2haWela += saxeVop2[kxesuVop2Ruva];
              swekox2haLha += saxeVop2[kxesuVop2Ruva + 0o1];
              swekox2haC2s2k += saxeVop2[kxesuVop2Ruva + 0o2];
              swekox2haBavek2feni++;
            }
          }
        }

        if ( swekox2haBavek2feni > 0o0 ) {
          const q6k2ka = 0o1 / swekox2haBavek2feni;
          vop2[ruva] = ( swekox2haWela * q6k2ka + 0o1 / 0o2 ) | 0o0;
          vop2[ruva + 0o1] = ( swekox2haLha * q6k2ka + 0o1 / 0o2 ) | 0o0;
          vop2[ruva + 0o2] = ( swekox2haC2s2k * q6k2ka + 0o1 / 0o2 ) | 0o0;
        }
      }
    }
  }
}

// ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ 📃 ⟫

function paxaAraSefiniL6da(tahaq: HTMLImageElement, sefiniL6da: number): { tapu: number; cepu: number; sefini: number; l6da: number } {
  const sefini = tahaq.naturalWidth;
  const l6da = tahaq.naturalHeight;

  if ( sefini / l6da > sefiniL6da ) {
    const kxesuSefini = Math.round(l6da * sefiniL6da);
    const saxeTapu = Math.floor(( sefini - kxesuSefini ) / 0o2);
    return { tapu: saxeTapu, cepu: 0o0, sefini: kxesuSefini, l6da: l6da };
  }
  const kxesuL6da = Math.round(sefini / sefiniL6da);
  const saxeCepu = Math.floor(( l6da - kxesuL6da ) / 0o2);
  return { tapu: 0o0, cepu: saxeCepu, sefini: sefini, l6da: kxesuL6da };
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

// ⟨ ſɟᴜ ɭʃᴜ ʌ ſןᴜ j͐ʃэ ( PNG ) 📃 ⟩

async function pngAraWelaLhaC2s2k(cakavop2: Blob): Promise<{ sefini: number; l6da: number; welaLhaC2s2k: Uint8Array }> {
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

  const saxeAraqSab2 = new Uint8Array(idatS2Ca1ara.reduce(( saxePal6, idatS2 ) => saxePal6 + idatS2.length, 0o0));
  let kxesuS2K2fe = 0o0;
  for ( const idatS2 of idatS2Ca1ara ) {
    saxeAraqSab2.set(idatS2, kxesuS2K2fe);
    kxesuS2K2fe += idatS2.length;
  }
  const s2Quq = new DecompressionStream("deflate");
  const suntaSab2 = new Uint8Array(await new Response(new Blob([ saxeAraqSab2 ]).stream().pipeThrough(s2Quq)).arrayBuffer());

  const eskek = new Uint8Array(sefini * l6da * saxeK2fe);
  const k2fe = sefini * saxeK2fe;
  let ruvaKp6 = 0o0;
  for ( let cepu = 0o0; cepu < l6da; cepu++ ) {
    const kxesuHat = suntaSab2[ruvaKp6++];
    const araq = cepu * k2fe;
    for ( let tapu = 0o0; tapu < k2fe; tapu++ ) {
      const saxeTapu = tapu >= saxeK2fe ? eskek[araq + tapu - saxeK2fe] : 0o0;
      const saxeCepu = cepu > 0o0 ? eskek[araq - k2fe + tapu] : 0o0;
      const saxeTapuCepu = cepu > 0o0 && tapu >= saxeK2fe ? eskek[araq - k2fe + tapu - saxeK2fe] : 0o0;
      const j6fini = suntaSab2[ruvaKp6 + tapu];
      let kxesuSab2 = j6fini;
      if ( kxesuHat === 0o1 ) {
        kxesuSab2 = ( j6fini + saxeTapu ) & 0o377;
      } else if ( kxesuHat === 0o2 ) {
        kxesuSab2 = ( j6fini + saxeCepu ) & 0o377;
      } else if ( kxesuHat === 0o3 ) {
        kxesuSab2 = ( j6fini + ( ( saxeTapu + saxeCepu ) >> 0o1 ) ) & 0o377;
      } else if ( kxesuHat === 0o4 ) {
        const saxeKox2ha = saxeTapu + saxeCepu - saxeTapuCepu;
        const tapuSaka = Math.abs(saxeKox2ha - saxeTapu);
        const cepuSaka = Math.abs(saxeKox2ha - saxeCepu);
        const tapuCepuSaka = Math.abs(saxeKox2ha - saxeTapuCepu);
        kxesuSab2 = ( j6fini + ( tapuSaka <= cepuSaka && tapuSaka <= tapuCepuSaka ? saxeTapu : cepuSaka <= tapuCepuSaka ? saxeCepu : saxeTapuCepu ) ) & 0o377;
      }
      eskek[araq + tapu] = kxesuSab2;
    }
    ruvaKp6 += k2fe;
  }

  const welaLhaC2s2k = new Uint8Array(sefini * l6da * 0o3);
  if ( saxeHat === 0o6 || saxeHat === 0o2 ) {
    for ( let tahaqRuva = 0o0; tahaqRuva < sefini * l6da; tahaqRuva++ ) {
      welaLhaC2s2k[tahaqRuva * 0o3] = eskek[tahaqRuva * saxeK2fe];
      welaLhaC2s2k[tahaqRuva * 0o3 + 0o1] = eskek[tahaqRuva * saxeK2fe + 0o1];
      welaLhaC2s2k[tahaqRuva * 0o3 + 0o2] = eskek[tahaqRuva * saxeK2fe + 0o2];
    }
  } else if ( saxeHat === 0o0 ) {
    for ( let tahaqRuva = 0o0; tahaqRuva < sefini * l6da; tahaqRuva++ ) {
      welaLhaC2s2k[tahaqRuva * 0o3] = eskek[tahaqRuva];
      welaLhaC2s2k[tahaqRuva * 0o3 + 0o1] = eskek[tahaqRuva];
      welaLhaC2s2k[tahaqRuva * 0o3 + 0o2] = eskek[tahaqRuva];
    }
  } else {
    for ( let tahaqRuva = 0o0; tahaqRuva < sefini * l6da; tahaqRuva++ ) {
      welaLhaC2s2k[tahaqRuva * 0o3] = eskek[tahaqRuva * 0o2];
      welaLhaC2s2k[tahaqRuva * 0o3 + 0o1] = eskek[tahaqRuva * 0o2];
      welaLhaC2s2k[tahaqRuva * 0o3 + 0o2] = eskek[tahaqRuva * 0o2];
    }
  }
  return { sefini, l6da, welaLhaC2s2k };
}

function kf2Marko(): Promise<void> {
  return new Promise(( xema ) => {
    if ( MARKO_SAXE ) {
      xema();
      return;
    }
    fetch(MARKO_CAKAVOP2).then(( xema ) => xema.blob()).then(( sab2 ) => pngAraWelaLhaC2s2k(sab2)).then(( marko ) => {
      MARKO_SEFINI = marko.sefini;
      MARKO_L6DA = marko.l6da;
      /*
      * ⟨ ɭʃɀɜ ʌ ᶅſɔ ֭ſɭɹ ( PIL RGB L ) 📃 ⟩
      * ⟨ j͑ʃɹ ɭʃᴜɔ˞ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟩
      */
      const saxeS2Ca1ara = new Uint8Array(MARKO_SEFINI * MARKO_L6DA);
      for ( let tahaqRuva = 0o0; tahaqRuva < saxeS2Ca1ara.length; tahaqRuva++ ) {
        saxeS2Ca1ara[tahaqRuva] = ( marko.welaLhaC2s2k[tahaqRuva * 0o3] * 0o46213 + marko.welaLhaC2s2k[tahaqRuva * 0o3 + 0o1] * 0o113106 + marko.welaLhaC2s2k[tahaqRuva * 0o3 + 0o2] * 0o16457 + MARKO_ZOMO ) >>> 0o20;
      }
      MARKO_SAXE = saxeS2Ca1ara;
      xema();
    }).catch(() => {
      xema();
    });
  });
}

function kf2KubaCa1ara(sefini: number, l6da: number, saxeSefini: number, saxeL6da: number, kemafiPal6: number): { araqSefini: number; araqL6da: number; kxesuAraqCa1ara: Array<[ number, number ]> } {
  const kf2Vem2 = kemafiPal6 / Math.max(saxeSefini, saxeL6da);
  let araqSefini = Math.max(0o1, Math.round(saxeSefini * kf2Vem2));
  let araqL6da = Math.max(0o1, Math.round(saxeL6da * kf2Vem2));

  if ( araqSefini > sefini || araqL6da > l6da ) {
    const suntaVem2 = Math.min(sefini / araqSefini, l6da / araqL6da);
    araqSefini = Math.max(0o1, Math.round(araqSefini * suntaVem2));
    araqL6da = Math.max(0o1, Math.round(araqL6da * suntaVem2));
  }

  const tapuPal6 = Math.max(0o1, Math.floor(sefini / araqSefini));
  const cepuPal6 = Math.max(0o1, Math.floor(l6da / araqL6da));
  const tapuP2fo = ( sefini - tapuPal6 * araqSefini ) / ( tapuPal6 + 0o1 );
  const cepuP2fo = ( l6da - cepuPal6 * araqL6da ) / ( cepuPal6 + 0o1 );

  const kxesuAraqCa1ara: Array<[ number, number ]> = [];
  for ( let cepuK2fe = 0o0; cepuK2fe < cepuPal6; cepuK2fe++ ) {
    for ( let tapuK2fe = 0o0; tapuK2fe < tapuPal6; tapuK2fe++ ) {
      let tapu = Math.round(tapuP2fo * ( tapuK2fe + 0o1 ) + tapuK2fe * araqSefini);
      let cepu = Math.round(cepuP2fo * ( cepuK2fe + 0o1 ) + cepuK2fe * araqL6da);
      tapu = Math.min(tapu, sefini - araqSefini);
      cepu = Math.min(cepu, l6da - araqL6da);
      kxesuAraqCa1ara.push([ tapu, cepu ]);
    }
  }
  return { araqSefini, araqL6da, kxesuAraqCa1ara };
}

// ⟨ Mersenne-Twister 19937 📃 ⟩

const MT_N = 0o1160;
const MT_M = 0o615;
const MT_MATRICO = 0x9908b0df;
const MT_SUPRA = 0x80000000;
const MT_SUBA = 0x7fffffff;

function saxeK2feBavek2feni(saxeK2fe: number, sefini: number, l6da: number): Uint8Array {
  const bavek2feniCa1ara = new Uint32Array(MT_N);
  bavek2feniCa1ara[0o0] = saxeK2fe >>> 0o0;
  for ( let s2Ruva = 0o1; s2Ruva < MT_N; s2Ruva++ ) {
    bavek2feniCa1ara[s2Ruva] = ( Math.imul(0x6c078965, ( bavek2feniCa1ara[s2Ruva - 0o1] ^ ( bavek2feniCa1ara[s2Ruva - 0o1] >>> 0o36 ) ) ) + s2Ruva ) >>> 0o0;
  }
  let k2fe = MT_N;

  const ksaka = new Uint8Array(sefini * l6da);
  for ( let ksakaRuva = 0o0; ksakaRuva < ksaka.length; ksakaRuva++ ) {
    if ( k2fe >= MT_N ) {
      for ( let s2Ruva = 0o0; s2Ruva < MT_N - MT_M; s2Ruva++ ) {
        const kxesuBavek2feni = ( bavek2feniCa1ara[s2Ruva] & MT_SUPRA ) | ( bavek2feniCa1ara[s2Ruva + 0o1] & MT_SUBA );
        bavek2feniCa1ara[s2Ruva] = ( bavek2feniCa1ara[s2Ruva + MT_M] ^ ( kxesuBavek2feni >>> 0o1 ) ^ ( ( kxesuBavek2feni & 0o1 ) !== 0o0 ? MT_MATRICO : 0o0 ) ) >>> 0o0;
      }
      for ( let s2Ruva = MT_N - MT_M; s2Ruva < MT_N - 0o1; s2Ruva++ ) {
        const kxesuBavek2feni = ( bavek2feniCa1ara[s2Ruva] & MT_SUPRA ) | ( bavek2feniCa1ara[s2Ruva + 0o1] & MT_SUBA );
        bavek2feniCa1ara[s2Ruva] = ( bavek2feniCa1ara[s2Ruva + ( MT_M - MT_N )] ^ ( kxesuBavek2feni >>> 0o1 ) ^ ( ( kxesuBavek2feni & 0o1 ) !== 0o0 ? MT_MATRICO : 0o0 ) ) >>> 0o0;
      }
      const araqBavek2feni = ( bavek2feniCa1ara[MT_N - 0o1] & MT_SUPRA ) | ( bavek2feniCa1ara[0o0] & MT_SUBA );
      bavek2feniCa1ara[MT_N - 0o1] = ( bavek2feniCa1ara[MT_M - 0o1] ^ ( araqBavek2feni >>> 0o1 ) ^ ( ( araqBavek2feni & 0o1 ) !== 0o0 ? MT_MATRICO : 0o0 ) ) >>> 0o0;
      k2fe = 0o0;
    }
    let kxesuBavek2feni = bavek2feniCa1ara[k2fe];
    k2fe++;
    kxesuBavek2feni ^= kxesuBavek2feni >>> 0o13;
    kxesuBavek2feni ^= ( kxesuBavek2feni << 0o7 ) & 0x9d2c5680;
    kxesuBavek2feni ^= ( kxesuBavek2feni << 0o17 ) & 0xefc60000;
    kxesuBavek2feni ^= kxesuBavek2feni >>> 0o22;
    ksaka[ksakaRuva] = kxesuBavek2feni & 0o1;
  }
  return ksaka;
}

// ⟨ ſɟᴜ ɭʃᴜ ʌ ſןᴜ j͐ʃэ ( haba 3 ) 📃 ⟩

function quqHabaK2fe(tapu: number): number {
  const kuxaTapu = Math.abs(tapu);
  if ( kuxaTapu < 0o1 / 0o100000000 ) {
    return 1;
  }
  if ( kuxaTapu >= 0o3 ) {
    return 0;
  }
  const piTapu = Math.PI * kuxaTapu;
  return ( 0o3 * Math.sin(piTapu) * Math.sin(piTapu / 0o3) ) / ( piTapu * piTapu );
}

// ⟨ ſɭɹ ſȷɔ ʌ }ʃɹƽ ( Pillow Resample PRECISION_BITS 32-8-2 ) 📃 ⟩
const K2FE_BITOJ = 0o26;

function kf2HabaK2feCa1ara(saxePal6: number, araqPal6: number): Array<[ number, Int32Array, number ]> {
  const k2fe = saxePal6 / araqPal6;
  const kemafiVem2 = Math.max(0o1, k2fe);
  const q6k2kaKemafiVem2 = 0o1 / kemafiVem2;
  const saxeK2fe = 0o3 * kemafiVem2;
  const kemafiPal6 = Math.ceil(saxeK2fe) * 0o2 + 0o1;
  const habaK2feCa1ara: Array<[ number, Int32Array, number ]> = [];
  for ( let araqTapu = 0o0; araqTapu < araqPal6; araqTapu++ ) {
    const kxesuK2fe = ( araqTapu + 0o1 / 0o2 ) * k2fe;
    let saxeRuva = Math.trunc(kxesuK2fe - saxeK2fe + 0o1 / 0o2);
    if ( saxeRuva < 0o0 ) {
      saxeRuva = 0o0;
    }
    let araqRuva = Math.trunc(kxesuK2fe + saxeK2fe + 0o1 / 0o2);
    if ( araqRuva > saxePal6 ) {
      araqRuva = saxePal6;
    }
    const saxeK2feCa1ara = new Float64Array(kemafiPal6);
    let l6nllakK2fe = 0o0;
    for ( let saxeTapu = saxeRuva; saxeTapu < araqRuva; saxeTapu++ ) {
      const s2K2fe = quqHabaK2fe(( saxeTapu - kxesuK2fe + 0o1 / 0o2 ) * q6k2kaKemafiVem2);
      saxeK2feCa1ara[saxeTapu - saxeRuva] = s2K2fe;
      l6nllakK2fe += s2K2fe;
    }
    if ( l6nllakK2fe !== 0o0 ) {
      for ( let saxeTapu = 0o0; saxeTapu < araqRuva - saxeRuva; saxeTapu++ ) {
        saxeK2feCa1ara[saxeTapu] /= l6nllakK2fe;
      }
    }
    // ⟨ ſɭɹ ſȷɔ ( ±0o1 0o2 0o1 0o26 ) 📃 ⟩
    const k2feCa1ara = new Int32Array(kemafiPal6);
    for ( let saxeTapu = 0o0; saxeTapu < kemafiPal6; saxeTapu++ ) {
      const j6finiK2fe = saxeK2feCa1ara[saxeTapu] * ( 0o1 << K2FE_BITOJ );
      k2feCa1ara[saxeTapu] = j6finiK2fe < 0o0 ? Math.trunc(j6finiK2fe - 0o1 / 0o2) : Math.trunc(j6finiK2fe + 0o1 / 0o2);
    }
    habaK2feCa1ara.push([ saxeRuva, k2feCa1ara, araqRuva - saxeRuva ]);
  }
  return habaK2feCa1ara;
}

function habaKf2Sunta(saxe: Uint8Array, saxeSefini: number, saxeL6da: number, araqSefini: number, araqL6da: number): Uint8Array {
  const cepuK2feCa1ara = kf2HabaK2feCa1ara(saxeL6da, araqL6da);
  const tapuK2feCa1ara = kf2HabaK2feCa1ara(saxeSefini, araqSefini);

  /*
  * ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɹ ſȷɔ ( PIL 8 Resample 22 ) 📃 ⟩
  */
  const k2feP2fo = 0o1 << ( K2FE_BITOJ - 0o1 );
  const han2k = new Uint8Array(araqSefini * saxeL6da);
  for ( let cepu = 0o0; cepu < saxeL6da; cepu++ ) {
    const saxeN2k = cepu * saxeSefini;
    const araqN2k = cepu * araqSefini;
    for ( let tapu = 0o0; tapu < araqSefini; tapu++ ) {
      const [ saxeK2fe, k2feCa1ara, k2fe ] = tapuK2feCa1ara[tapu];
      let kxesuK2fe = k2feP2fo;
      for ( let k2feRuva = 0o0; k2feRuva < k2fe; k2feRuva++ ) {
        kxesuK2fe += saxe[saxeN2k + saxeK2fe + k2feRuva] * k2feCa1ara[k2feRuva];
      }
      const j6fini = kxesuK2fe >> K2FE_BITOJ;
      han2k[araqN2k + tapu] = j6fini < 0o0 ? 0o0 : j6fini > 0o377 ? 0o377 : j6fini;
    }
  }

  const k61e = new Uint8Array(araqSefini * araqL6da);
  for ( let cepu = 0o0; cepu < araqL6da; cepu++ ) {
    const [ saxeK2fe, k2feCa1ara, k2fe ] = cepuK2feCa1ara[cepu];
    const araqN2k = cepu * araqSefini;
    for ( let tapu = 0o0; tapu < araqSefini; tapu++ ) {
      let kxesuK2fe = k2feP2fo;
      for ( let k2feRuva = 0o0; k2feRuva < k2fe; k2feRuva++ ) {
        kxesuK2fe += han2k[( saxeK2fe + k2feRuva ) * araqSefini + tapu] * k2feCa1ara[k2feRuva];
      }
      const j6fini = kxesuK2fe >> K2FE_BITOJ;
      k61e[araqN2k + tapu] = j6fini < 0o0 ? 0o0 : j6fini > 0o377 ? 0o377 : j6fini;
    }
  }
  return k61e;
}

// ⟨ ſɟᴜ ɭʃᴜ ʌ ſןᴜ j͐ʃэ ( RFC ImageData haba PIL ) 📃 ⟩
function habaKf2SuntaWelaLhaC2s2kW2d2(saxe: Uint8ClampedArray, saxeSefini: number, saxeL6da: number, araqSefini: number, araqL6da: number, araq: Uint8ClampedArray, suntaK2fe?: ( k2fe: number ) => void): void {
  const saxeTahaqPal6 = saxeSefini * saxeL6da;
  const welaSaxe = new Uint8Array(saxeTahaqPal6);
  const lhaSaxe = new Uint8Array(saxeTahaqPal6);
  const c2s2kSaxe = new Uint8Array(saxeTahaqPal6);
  const w2d2Saxe = new Uint8Array(saxeTahaqPal6);
  for ( let tahaqRuva = 0o0, vop2Ruva = 0o0; tahaqRuva < saxeTahaqPal6; tahaqRuva++, vop2Ruva += 0o4 ) {
    welaSaxe[tahaqRuva] = saxe[vop2Ruva];
    lhaSaxe[tahaqRuva] = saxe[vop2Ruva + 0o1];
    c2s2kSaxe[tahaqRuva] = saxe[vop2Ruva + 0o2];
    w2d2Saxe[tahaqRuva] = saxe[vop2Ruva + 0o3];
  }
  const welaAraq = habaKf2Sunta(welaSaxe, saxeSefini, saxeL6da, araqSefini, araqL6da);
  if ( suntaK2fe ) suntaK2fe( 0o1 / 0o3 );
  const lhaAraq = habaKf2Sunta(lhaSaxe, saxeSefini, saxeL6da, araqSefini, araqL6da);
  if ( suntaK2fe ) suntaK2fe( 0o2 / 0o3 );
  const c2s2kAraq = habaKf2Sunta(c2s2kSaxe, saxeSefini, saxeL6da, araqSefini, araqL6da);
  if ( suntaK2fe ) suntaK2fe( 0o3 / 0o4 );
  // ⟨ ſɟᴜ ɭʃᴜ ʌ ſןᴜ j͐ʃэ 📃 ⟩
  const w2d2Araq = habaKf2Sunta(w2d2Saxe, saxeSefini, saxeL6da, araqSefini, araqL6da);
  if ( suntaK2fe ) suntaK2fe( 0o1 );
  const araqTahaqPal6 = araqSefini * araqL6da;
  for ( let tahaqRuva = 0o0, vop2Ruva = 0o0; tahaqRuva < araqTahaqPal6; tahaqRuva++, vop2Ruva += 0o4 ) {
    araq[vop2Ruva] = welaAraq[tahaqRuva];
    araq[vop2Ruva + 0o1] = lhaAraq[tahaqRuva];
    araq[vop2Ruva + 0o2] = c2s2kAraq[tahaqRuva];
    araq[vop2Ruva + 0o3] = w2d2Araq[tahaqRuva];
  }
}

function kf2S2Ca1ara(sefini: number, l6da: number): Uint8Array | null {
  if ( !MARKO_SAXE ) {
    return null;
  }
  const { araqSefini, araqL6da, kxesuAraqCa1ara } = kf2KubaCa1ara(sefini, l6da, MARKO_SEFINI, MARKO_L6DA, MARKO_KEMAFI);

  const saxeKuba = habaKf2Sunta(MARKO_SAXE, MARKO_SEFINI, MARKO_L6DA, araqSefini, araqL6da);
  const saxeS2Ca1ara = new Uint8Array(araqSefini * araqL6da);
  for ( let tahaqRuva = 0o0; tahaqRuva < saxeS2Ca1ara.length; tahaqRuva++ ) {
    saxeS2Ca1ara[tahaqRuva] = saxeKuba[tahaqRuva] > 0o127 ? 0o1 : 0o0;
  }

  const saxeAraqSab2 = new Uint8Array(sefini * l6da);
  for ( const [ tapu, cepu ] of kxesuAraqCa1ara ) {
    for ( let cepuK2fe = 0o0; cepuK2fe < araqL6da; cepuK2fe++ ) {
      for ( let tapuK2fe = 0o0; tapuK2fe < araqSefini; tapuK2fe++ ) {
        saxeAraqSab2[( cepu + cepuK2fe ) * sefini + ( tapu + tapuK2fe )] = saxeS2Ca1ara[cepuK2fe * araqSefini + tapuK2fe];
      }
    }
  }

  const ksaka = saxeK2feBavek2feni(MARKO_SAXE_K2FE, sefini, l6da);
  const s2Ca1ara = new Uint8Array(sefini * l6da);
  for ( let tahaqRuva = 0o0; tahaqRuva < s2Ca1ara.length; tahaqRuva++ ) {
    s2Ca1ara[tahaqRuva] = ( saxeAraqSab2[tahaqRuva] ^ ksaka[tahaqRuva] ) & 0o1;
  }
  return s2Ca1ara;
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ᶅſɔ ֭ſɭɹ - ɭʃɀɜ ʌ ᶅſɔ ֭ſɭɹ 📃 ⟫

function zez(saxeVop2: Float32Array, sefini: number, l6da: number, s2Ca1ara: Uint8Array | null, kxesuK2feCa1ara: boolean, saxeCepu: number, araqCepu: number, sunta: Uint8Array): void {
  const vatanekK2feCa1ara = [
    [ 0o0, 0o40, 0o10, 0o50, 0o2, 0o42, 0o12, 0o52 ],
    [ 0o60, 0o20, 0o70, 0o30, 0o62, 0o22, 0o72, 0o32 ],
    [ 0o14, 0o54, 0o4, 0o44, 0o16, 0o56, 0o6, 0o46 ],
    [ 0o74, 0o34, 0o64, 0o24, 0o76, 0o36, 0o66, 0o26 ],
    [ 0o3, 0o43, 0o13, 0o53, 0o1, 0o41, 0o11, 0o51 ],
    [ 0o63, 0o23, 0o73, 0o33, 0o61, 0o21, 0o71, 0o31 ],
    [ 0o17, 0o57, 0o7, 0o47, 0o15, 0o55, 0o5, 0o45 ],
    [ 0o77, 0o37, 0o67, 0o27, 0o75, 0o35, 0o65, 0o25 ]
  ];

  for ( let cepu = saxeCepu; cepu < araqCepu; cepu++ ) {
    for ( let tapu = 0o0; tapu < sefini; tapu++ ) {
      const ruva = ( cepu * sefini + tapu ) * 0o3;
      const vop2Ruva = ( cepu * sefini + tapu ) * 0o4;
      const vatanekK2fe = ( vatanekK2feCa1ara[cepu % 0o10][tapu % 0o10] + 0o1 / 0o2 ) / 0o100;

      for ( let vop2K2fe = 0o0; vop2K2fe < 0o2; vop2K2fe++ ) {
        if ( !kxesuK2feCa1ara ) {
          sunta[ruva + vop2K2fe] = saxeVop2[vop2Ruva + vop2K2fe];
          continue;
        }
        const k2fe = saxeVop2[vop2Ruva + vop2K2fe];
        let kubaK2fe = Math.floor(( k2fe + vatanekK2fe * 0o10 ) / 0o10);
        kubaK2fe = Math.max(0o0, Math.min(0o37, kubaK2fe));
        sunta[ruva + vop2K2fe] = kubaK2fe * 0o10;
      }

      const c2s2k = saxeVop2[vop2Ruva + 0o2];
      if ( s2Ca1ara ) {
        const markoK2fe = s2Ca1ara[cepu * sefini + tapu] * 0o10;
        let kubaK2fe = Math.floor(( c2s2k - markoK2fe + vatanekK2fe * 0o20 ) / 0o20);
        kubaK2fe = Math.max(0o0, Math.min(0o17, kubaK2fe));
        sunta[ruva + 0o2] = kubaK2fe * 0o20 + markoK2fe;
      } else if ( kxesuK2feCa1ara ) {
        let kubaK2fe = Math.floor(( c2s2k + vatanekK2fe * 0o10 ) / 0o10);
        kubaK2fe = Math.max(0o0, Math.min(0o37, kubaK2fe));
        sunta[ruva + 0o2] = kubaK2fe * 0o10;
      } else {
        sunta[ruva + 0o2] = c2s2k;
      }
    }
  }
}

// ⟪ j͑ʃп́ɔ j͑ʃɹ ɭʃᴜɔ˞ - j͑ʃ'ɜ ſןɹ 📃 ⟫

function kf2KsakaK61e(): string | null {
  if ( !A1A_SWEKA_KSAKA.checked ) {
    return null;
  }

  const ksakaCa1ara: Array<[ string, string ]> = [
    [ "Make", BAKANANO_KF2.value ],
    [ "Model", BAKANANO_HAT.value ],
    [ "Artist", BAKANANO_MAKF2.value ],
    [ "Copyright", BAKANANO_VAQACUK.value ],
    [ "Software", BAKANANO_SCFALI.value ]
  ];

  const bakananoK61eCa1ara: string[] = [];
  for ( const [ k61eKsaka, j6fini ] of ksakaCa1ara ) {
    const kxesuK61e = j6fini.trim();
    if ( !kxesuK61e ) {
      continue;
    }
    bakananoK61eCa1ara.push(`${k61eKsaka}\u0000${kxesuK61e}`);
  }
  if ( !bakananoK61eCa1ara.length ) {
    return null;
  }
  return bakananoK61eCa1ara.join("\u0001");
}

// ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃ'ɜ ſןɹ ( TIFF JPEG APP1 PNG eXIf ) 📃 ⟩

function quqEksif(sab2: Uint8Array): number {
  // ⟨ j͑ʃᴜƽ ( JPEG APP1 Exif ) 📃 ⟩
  if ( sab2.length > 0o10 && sab2[0o0] === 0xff && sab2[0o1] === 0xd8 ) {
    let ruva = 0o2;
    while ( ruva + 0o12 <= sab2.length ) {
      if ( sab2[ruva] !== 0xff ) break;
      const marko = sab2[ruva + 0o1];
      const pal6 = ( sab2[ruva + 0o2] << 0o10 ) | sab2[ruva + 0o3];
      if ( marko === 0xda ) break;
      if ( marko === 0xe1 && sab2[ruva + 0o4] === 0x45 && sab2[ruva + 0o5] === 0x78 &&
        sab2[ruva + 0o6] === 0x69 && sab2[ruva + 0o7] === 0x66 ) {
        return ruva + 0o12;
      }
      if ( pal6 < 0o2 ) break;
      ruva += 0o2 + pal6;
    }
    return -0o1;
  }
  // ⟨ j͑ʃᴜƽ ( PNG eXIf ) 📃 ⟩
  if ( sab2.length > 0o10 && sab2[0o0] === 0x89 && sab2[0o1] === 0x50 ) {
    let ruva = 0o10;
    while ( ruva + 0o10 <= sab2.length ) {
      const pal6 = ( sab2[ruva] << 0o30 ) | ( sab2[ruva + 0o1] << 0o20 ) | ( sab2[ruva + 0o2] << 0o10 ) | sab2[ruva + 0o3];
      if ( sab2[ruva + 0o4] === 0x65 && sab2[ruva + 0o5] === 0x58 && sab2[ruva + 0o6] === 0x49 && sab2[ruva + 0o7] === 0x66 ) {
        return ruva + 0o10;
      }
      ruva += 0o14 + pal6;
    }
    return -0o1;
  }
  // ⟨ j͑ʃᴜƽ ( Exif TIFF ) 📃 ⟩
  if ( sab2.length > 0o10 && sab2[0o0] === 0x45 && sab2[0o1] === 0x78 && sab2[0o2] === 0x69 && sab2[0o3] === 0x66 ) {
    return 0o6;
  }
  // ⟨ j͑ʃᴜƽ ( TIFF ) 📃 ⟩
  if ( sab2.length > 0o10 && ( sab2[0o0] === 0x49 || sab2[0o0] === 0x4d ) && sab2[0o1] === sab2[0o0] ) {
    return 0o0;
  }
  return -0o1;
}

function quqBakanano(sab2: Uint8Array): void {
  const xemaBakanano = ( k61eKsaka: string, j6fini: string ): void => {
    if ( k61eKsaka === "Make" ) {
      BAKANANO_KF2.value = j6fini;
    } else if ( k61eKsaka === "Model" ) {
      BAKANANO_HAT.value = j6fini;
    } else if ( k61eKsaka === "Artist" ) {
      BAKANANO_MAKF2.value = j6fini;
    } else if ( k61eKsaka === "Copyright" ) {
      BAKANANO_VAQACUK.value = j6fini;
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
  for ( let ksakaK2fe = 0o0; ksakaK2fe < kxesuK2fe; ksakaK2fe++ ) {
    const ksakaRuva = ifd + 0o2 + ksakaK2fe * 0o14;
    if ( ksakaRuva + 0o14 > sab2.length ) {
      break;
    }
    const ksaka = quqSab2.getUint16(ksakaRuva, m2Kp6Htaka);
    const hat = quqSab2.getUint16(ksakaRuva + 0o2, m2Kp6Htaka);
    const k2fe = quqSab2.getUint32(ksakaRuva + 0o4, m2Kp6Htaka);
    if ( hat !== 0o2 || k2fe === 0o0 ) {
      continue;
    }
    const kxesuAraq = k2fe <= 0o4 ? ksakaRuva + 0o10 : saxeK2fe + quqSab2.getUint32(ksakaRuva + 0o10, m2Kp6Htaka);
    if ( kxesuAraq + k2fe > sab2.length ) {
      continue;
    }
    // ⟨ ſןw ʌ ſɭɘэ ſɭɹ ſןɹ 📃 ⟩
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
  // ⟨ j͑ʃᴜƽ ( JPEG APP1 64 KiB ) 📃 ⟩
  const cakavop2Sab2 = await cakavop2.slice(0o0, 0o200000).arrayBuffer();
  const sab2 = new Uint8Array(cakavop2Sab2);
  quqBakanano(sab2);
}

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ 📃 ⟩

function ne1aBakanano(): void {
  for ( const xemaKek of BAKANANO_CA1ARA ) {
    xemaKek.value = "";
  }
}

// ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ ( HTML ) 📃 ⟩

async function v3ak2Bakanano(): Promise<void> {
  for ( const xemaKek of BAKANANO_CA1ARA ) {
    xemaKek.value = BAKANANO_SAXE.get(xemaKek) ?? "";
  }
  if ( tlakakuCakavop2 ) {
    await quqCakavop2Bakanano(tlakakuCakavop2);
  }
}

// ⟨ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ j͑ʃ'ɜ ſןɹ 📃 ⟩

async function v3ak2BakananoSaxeCakavop2(cakavop2: File | null): Promise<void> {
  if ( A1A_NE1A_KSAKA.checked ) {
    ne1aBakanano();
    return;
  }
  if ( cakavop2 ) {
    await quqCakavop2Bakanano(cakavop2);
  }
}

function kf2TahaqKef(kxesuKsakaCa1ara: Array<[ string, string ]>): Uint8Array {
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
    // ⟨ ſɭɹʞ ʌ ɭl̀э ſȷꞇ }ʃꞇ ( piexif UTF-8 ) 📃 ⟩
    ksakaCa1ara.push({ ksaka, sab2: kf2K61e.encode(j6fini) });
  }

  // ⟨ ſɭɹ ſȷɔ ʌ j͑ʃ'ɜ ſןɹ ( piexif ) 📃 ⟩
  ksakaCa1ara.sort(( saxeEskek, araqEskek ) => saxeEskek.ksaka - araqEskek.ksaka);

  // ⟨ ſɭɹ ſȷɔ ʌ j͑ʃ'ɜ ſןɹ ( IFD 4 ) 📃 ⟩
  const kxesuK2fe = ksakaCa1ara.length;
  let pal6IFD = 0o2 + kxesuK2fe * 0o14 + 0o4;
  let pal6Sab2 = 0o0;
  for ( const eskek of ksakaCa1ara ) {
    const sab2Pal6 = eskek.sab2.length + 0o1;
    if ( sab2Pal6 > 0o4 ) {
      pal6Sab2 += sab2Pal6;
    }
  }

  // ⟨ j͑ʃ'ɜ ſןɹ ʌ ſɭɹ ſȷɔ ( TIFF 8 ) 📃 ⟩
  let kxesuS2K2fe = 0o10 + pal6IFD;

  const saxeSab2 = [ 0x4d, 0x4d, 0x00, 0x2a, 0x00, 0x00, 0x00, 0x08 ];
  sab2Ca1ara.push(...saxeSab2);
  sab2Ca1ara.push(( kxesuK2fe >> 0o10 ) & 0o377, kxesuK2fe & 0o377);

  for ( const eskek of ksakaCa1ara ) {
    const sab2Pal6 = eskek.sab2.length + 0o1;
    if ( sab2Pal6 > 0o4 ) {
      sab2Ca1ara.push(...kf2XezHtaka(eskek.ksaka, 0o2, sab2Pal6, kxesuS2K2fe));
      kxesuS2K2fe += sab2Pal6;
    } else {
      const sab2 = [ ...eskek.sab2 ];
      while ( sab2.length < 0o4 ) {
        sab2.push(0o0);
      }
      sab2Ca1ara.push(( eskek.ksaka >> 0o10 ) & 0o377, eskek.ksaka & 0o377, 0o0, 0o2,
        0o0, 0o0, 0o0, sab2Pal6, sab2[0o0], sab2[0o1], sab2[0o2], sab2[0o3]);
    }
  }
  sab2Ca1ara.push(0o0, 0o0, 0o0, 0o0);

  for ( const eskek of ksakaCa1ara ) {
    const sab2Pal6 = eskek.sab2.length + 0o1;
    if ( sab2Pal6 > 0o4 ) {
      sab2Ca1ara.push(...eskek.sab2);
      sab2Ca1ara.push(0o0);
    }
  }

  return new Uint8Array(sab2Ca1ara);
}

function crc32Sab2(sab2: Uint8Array): number {
  let s2kantaK2fe = 0xffffffff;
  for ( let sab2Ruva = 0o0; sab2Ruva < sab2.length; sab2Ruva++ ) {
    s2kantaK2fe ^= sab2[sab2Ruva];
    for ( let p2saK2fe = 0o0; p2saK2fe < 0o10; p2saK2fe++ ) {
      s2kantaK2fe = ( s2kantaK2fe >>> 0o1 ) ^ ( 0xedb88320 & -( s2kantaK2fe & 0o1 ) );
    }
  }
  return ( s2kantaK2fe ^ 0xffffffff ) >>> 0o0;
}

function xemaExif(pngSab2: Uint8Array, eksifSab2: Uint8Array): Uint8Array<ArrayBuffer> {
  const kf2S2 = ( ): Uint8Array => {
    const eksifS2 = new Uint8Array(0o10 + 0o4 + eksifSab2.length);
    eksifS2[0o0] = ( eksifSab2.length >>> 0o30 ) & 0o377;
    eksifS2[0o1] = ( eksifSab2.length >>> 0o20 ) & 0o377;
    eksifS2[0o2] = ( eksifSab2.length >>> 0o10 ) & 0o377;
    eksifS2[0o3] = eksifSab2.length & 0o377;
    eksifS2.set(new TextEncoder().encode("eXIf"), 0o4);
    eksifS2.set(eksifSab2, 0o10);
    const s2kantaK2fe = crc32Sab2(eksifS2.subarray(0o4, 0o10 + eksifSab2.length));
    eksifS2[0o10 + eksifSab2.length] = ( s2kantaK2fe >>> 0o30 ) & 0o377;
    eksifS2[0o11 + eksifSab2.length] = ( s2kantaK2fe >>> 0o20 ) & 0o377;
    eksifS2[0o12 + eksifSab2.length] = ( s2kantaK2fe >>> 0o10 ) & 0o377;
    eksifS2[0o13 + eksifSab2.length] = s2kantaK2fe & 0o377;
    return eksifS2;
  };

  // ⟨ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ j͑ʃ'ɜ ſןɹ ( IHDR IDAT eXIf ) 📃 ⟩
  const s2Ca1ara: Array<Uint8Array> = [ pngSab2.slice(0o0, 0o10) ];
  let ruva = 0o10;
  let vaku3a = false;
  while ( ruva + 0o10 <= pngSab2.length ) {
    const pal6 = ( pngSab2[ruva] << 0o30 ) | ( pngSab2[ruva + 0o1] << 0o20 ) | ( pngSab2[ruva + 0o2] << 0o10 ) | pngSab2[ruva + 0o3];
    const hat = String.fromCharCode(pngSab2[ruva + 0o4], pngSab2[ruva + 0o5], pngSab2[ruva + 0o6], pngSab2[ruva + 0o7]);
    const araqK2fe = ruva + 0o14 + pal6;
    if ( hat === "eXIf" ) {
      if ( !vaku3a ) {
        s2Ca1ara.push(kf2S2( ));
        vaku3a = true;
      }
    } else {
      s2Ca1ara.push(pngSab2.slice(ruva, araqK2fe));
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
  for ( const s2Kek of s2Ca1ara ) {
    kxesuK2fe += s2Kek.length;
  }
  const saxeAraqSab2 = new Uint8Array(kxesuK2fe);
  let kxesuS2K2fe = 0o0;
  for ( const s2Kek of s2Ca1ara ) {
    saxeAraqSab2.set(s2Kek, kxesuS2K2fe);
    kxesuS2K2fe += s2Kek.length;
  }
  return saxeAraqSab2;
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ɭʃᴜ ֭ſɭᴜȝ 📃 ⟫

async function vasakaTahaq(tahaq: File): Promise<void> {
  const saxeTahaqSweruva = URL.createObjectURL(tahaq);
  try {
    const kxesuTahaq = await new Promise<HTMLImageElement>(( xema, ne1aXema ) => {
      const saxeTahaq = new Image();
      saxeTahaq.onload = () => xema(saxeTahaq);
      saxeTahaq.onerror = () => ne1aXema(new Error("tlohk2ni"));
      saxeTahaq.src = saxeTahaqSweruva;
    });

    await kf2Marko();
    await kf2SuntaSaxeTahaq(kxesuTahaq);
  } catch {
    suntaTlaku( TLOHK2NI, true );
    suntaTlaku( TLAKAKANI, false );
  } finally {
    URL.revokeObjectURL(saxeTahaqSweruva);
  }
}

async function kf2SuntaSaxeTahaq(kxesuTahaq: HTMLImageElement): Promise<void> {
  try {
    suntaK2fe( 0o20 );

        /*
        * ⟨ ſɭc̗ᴜ j͑ʃ'ɔ ʌ ſɭɹ ſȷɔ ( PIL haba ) 📃 ⟩
        * ⟨ j͑ʃᴜƽ ( drawImage ) 📃 ⟩
        */
        const araq = kf2Pu(kxesuTahaq.naturalWidth, kxesuTahaq.naturalHeight);
        const sefiniL6da = araq.sefini / araq.l6da;
        const paxa = A1A_PAXA_TAHAQ.checked
          ? paxaAraSefiniL6da(kxesuTahaq, sefiniL6da)
          : { tapu: 0o0, cepu: 0o0, sefini: kxesuTahaq.naturalWidth, l6da: kxesuTahaq.naturalHeight };

        const suntaKuba = document.createElement("canvas");
        if ( A1A_PU.checked ) {
          suntaKuba.width = araq.sefini;
          suntaKuba.height = araq.l6da;
        } else {
          // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſןᴜ j͐ʃэ 📃 ⟩
          suntaKuba.width = paxa.sefini;
          suntaKuba.height = paxa.l6da;
        }

        const kumukalasu = suntaKuba.getContext( "2d", { willReadFrequently: true } );
        if ( !kumukalasu ) {
          throw new Error("ne1a2d");
        }

        const saxeKuba = document.createElement("canvas");
        saxeKuba.width = paxa.sefini;
        saxeKuba.height = paxa.l6da;
        const saxeKumukalasu = saxeKuba.getContext( "2d", { willReadFrequently: true } );
        if ( !saxeKumukalasu ) {
          throw new Error("ne1a2d");
        }
        saxeKumukalasu.drawImage(kxesuTahaq, paxa.tapu, paxa.cepu, paxa.sefini, paxa.l6da, 0o0, 0o0, paxa.sefini, paxa.l6da);
        const saxeVop2 = saxeKumukalasu.getImageData(0o0, 0o0, paxa.sefini, paxa.l6da);

        let kxesuSuntaVop2: ImageData;
        if ( suntaKuba.width === paxa.sefini && suntaKuba.height === paxa.l6da ) {
          // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ɭʃᴜ ֭ſɭᴜȝ 📃 ⟩
          kxesuSuntaVop2 = new ImageData(new Uint8ClampedArray(saxeVop2.data), suntaKuba.width, suntaKuba.height);
          suntaK2fe( 0o60 );
        } else {
          kxesuSuntaVop2 = kumukalasu.createImageData(suntaKuba.width, suntaKuba.height);
          habaKf2SuntaWelaLhaC2s2kW2d2(saxeVop2.data, paxa.sefini, paxa.l6da, suntaKuba.width, suntaKuba.height, kxesuSuntaVop2.data, ( k2fe ) => suntaK2fe( 0o20 + Math.round( k2fe * 0o40 ) ));
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
          const vop2K2feCa1ara = new Float32Array(vop2.length);
          vop2K2feCa1ara.set(vop2);
          const sunta = new Uint8Array(suntaKuba.width * suntaKuba.height * 0o3);
          const kubaPal6 = 0o100;
          const kubaL6da = Math.ceil(suntaKuba.height / kubaPal6);
          const saxeK2fe = 0o66;
          for ( let kubaK2fe = 0o0; kubaK2fe < kubaPal6; kubaK2fe++ ) {
            const saxeCepu = kubaK2fe * kubaL6da;
            const araqCepu = Math.min(suntaKuba.height, saxeCepu + kubaL6da);
            if ( saxeCepu >= araqCepu ) break;
            zez(vop2K2feCa1ara, suntaKuba.width, suntaKuba.height, s2Ca1ara, A1A_VACAJA.checked, saxeCepu, araqCepu, sunta);
            suntaK2fe( saxeK2fe + Math.round( ( ( kubaK2fe + 0o1 ) / kubaPal6 ) * 0o6 ) );
            await heXema();
          }

          for ( let vop2Ruva = 0o0, suntaRuva = 0o0; vop2Ruva < vop2.length; vop2Ruva += 0o4, suntaRuva += 0o3 ) {
            vop2[vop2Ruva] = sunta[suntaRuva];
            vop2[vop2Ruva + 0o1] = sunta[suntaRuva + 0o1];
            vop2[vop2Ruva + 0o2] = sunta[suntaRuva + 0o2];
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
          const kxesuKsakaCa1ara: Array<[ string, string ]> = ksakaK61e.split("\u0001").map(( bakananoK61e ) => {
            const kxesuS2Ca1ara = bakananoK61e.split("\u0000");
            return [ kxesuS2Ca1ara[0o0], kxesuS2Ca1ara.slice(0o1).join("\u0000") ];
          });
          pngSab2 = xemaExif(pngSab2, kf2TahaqKef(kxesuKsakaCa1ara));
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
  } catch {
    kxesuSunta = false;
    suntaTlaku( TLOHK2NI, true );
    suntaTlaku( TLAKAKANI, false );
  }
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ֭ſɭᴜ ʃᴜ 📃 ⟫

// ⟨ ſ͕ɭwc̭ ſɭɹ 📃 ⟩

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

// ⟪ ſɭʞɹ 📃 ⟫

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
  } catch {
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
