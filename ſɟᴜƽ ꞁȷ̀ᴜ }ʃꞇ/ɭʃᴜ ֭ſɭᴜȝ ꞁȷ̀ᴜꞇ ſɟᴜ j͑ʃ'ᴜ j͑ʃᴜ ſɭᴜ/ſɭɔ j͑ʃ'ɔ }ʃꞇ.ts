// ≺⧼ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ɭʃᴜ ֭ſɭᴜȝ - Bilda Modifilo ⧽≻

// ⟪ ꞁȷ̀ɜ ʃэ ſɭɹ ⟫

const TLAKAKANI = document.getElementById("tlakakani") as HTMLElement;
const TLAKAKU_TAHAQ = document.getElementById("tlakaku-tahaq") as HTMLImageElement;
const ARAQ2Q_TAHAQ = document.getElementById("araq2q-tahaq") as HTMLInputElement;
const A1A_VACAJA = document.getElementById("a1a-vacaja") as HTMLInputElement;
const A1A_VATANEK = document.getElementById("a1a-vatanek") as HTMLInputElement;
const A1A_VAXAHA = document.getElementById("a1a-vaxaha") as HTMLInputElement;
const A1A_PAXA_TAHAQ = document.getElementById("a1a-paxa-tahaq") as HTMLInputElement;
const A1A_GRANDA = document.getElementById("a1a-granda") as HTMLInputElement;
const A1A_MARKO = document.getElementById("a1a-marko") as HTMLInputElement;
const A1A_SWEKA_METADATUMOJN = document.getElementById("a1a-sweka-metadatumojn") as HTMLInputElement;
const A1A_ANSTATAUX_METADATUMOJN = document.getElementById("a1a-anstataux-metadatumojn") as HTMLInputElement;
const BAKANANO_FABRIKANTO = document.getElementById("bakanano-fabrikanto") as HTMLInputElement;
const BAKANANO_MODELO = document.getElementById("bakanano-modelo") as HTMLInputElement;
const BAKANANO_ĵɔƭᴜꞇ = document.getElementById("bakanano-ĵɔƭᴜꞇ") as HTMLInputElement;
const BAKANANO_J͑ʃɽ͑ʃꞇ = document.getElementById("bakanano-j͑ʃɽ͑ʃꞇ") as HTMLInputElement;
const BAKANANO_SCFALI = document.getElementById("bakanano-scfali") as HTMLInputElement;
const BAKANANO = document.getElementById("bakanano") as HTMLElement;
const BAKANANOJ: HTMLInputElement[] = [
  BAKANANO_FABRIKANTO,
  BAKANANO_MODELO,
  BAKANANO_ĵɔƭᴜꞇ,
  BAKANANO_J͑ʃɽ͑ʃꞇ,
  BAKANANO_SCFALI
];
// la valoroj de la HTML-ŝablonoj - restarigitaj kiam la anstataŭigo malŝaltiĝas
const BAKANANO_ŜABLONOJ = new Map<HTMLInputElement, string>();
for ( const bakanano of BAKANANOJ ) {
  BAKANANO_ŜABLONOJ.set(bakanano, bakanano.value);
}
const TLOHK2NI = document.getElementById("tlohk2ni") as HTMLElement;
const QUMK2 = document.getElementById("qumk2") as HTMLButtonElement;
const TENNI = document.getElementById("tenni") as HTMLButtonElement;
const CAB6TEM2 = document.getElementById("cab6tem2") as HTMLElement;

let tlakakuTahaqSweruva: string | null = null;
let metadatumojKp6: string | null = null;
let tlakakuCkvp: File | null = null;
let lasiEligon = false;
let funkciigata = false;

function ŝoviTlaku( elemento: HTMLElement, montri: boolean ): void {
  if ( montri ) {
    elemento.classList.remove( "kobe" );
  } else {
    elemento.classList.add( "kobe" );
  }
}

// ⟪ Progreso 📃 ⟫

function agordiProgreson( procento: number ): void {
  CAB6TEM2.style.setProperty( "--តេមិនី", String( Math.max( 0o0, Math.min( 0o100, procento ) ) / 0o100 ) );
}

function finigiProgreson(): void {
  agordiProgreson( 0o0 );
  ŝoviTlaku( CAB6TEM2, false );
}

function novaTasko(): Promise<void> {
  return new Promise(( plenumi ) => setTimeout( plenumi, 0o0 ));
}

// ⟪ Parametroj 📃 ⟫

const MALGRANDA = 0o2707;
const GRANDA = 0o4253;
const MARKO_DOSIERO = "s2tas.png";
const MARKO_FLANKA = 0o400;
const MARKO_SEMO = 0o63762300;
const MARKO_ZOMO = 0o100000;

// ⟪ j͑ʃп́ɔ ɭʃᴜ ֭ſɭᴜȝ ⟫



// ⟨ ɭʃɀɜ HEIC - Konvertu HEIC ⟩

async function TboHEIC(ckvpEHeic: File): Promise<Blob> {
  const heic2anyHac0zani = await import("heic2any");
  const heic2any = heic2anyHac0zani.default as unknown as ( options: { blob: Blob; toType: string } ) => Promise<Blob | Blob[]>;
  const tlakakani = await heic2any({
    blob: ckvpEHeic,
    toType: "image/png"
  });
  return tlakakani as Blob;
}

// ⟪ Kruda DNG - Konvertu DNG 📃 ⟫

// ⟨ Parametroj de la tono-kurbo ( kopio de la agordoj de vas2tas.py ) ⟩

const DNG_MALALTA_P = 0o1 / 0o100;
const DNG_ALTA_P = 0o277 / 0o300;
const DNG_GAMMA = 0o40 / 0o100;
const DNG_PLATO = 0o70 / 0o100;
const DNG_ŜULTRO_FRAKCIO = 0o70 / 0o100;
const DNG_VIBRANCO = 0o10 / 0o100;

// ⟨ skaneriAlNorma - tono-kurbo de vas2tas.py ( skaligi_al_okbit ) ⟩

function skaligiAlNorma(f: Float32Array, pikseloj: number): Float32Array {
  const n = f.length;
  const norma = new Float32Array(n);
  // percentiloj per la ordigita kopio ( la sama matematiko kiel np.percentile )
  const ordigita = Float32Array.from(f).sort();
  const interpolu = ( poz: number ): number => {
    const malsupra = Math.floor(poz);
    const supraIdx = Math.ceil(poz);
    if ( malsupra === supraIdx ) {
      return ordigita[malsupra];
    }
    return ordigita[malsupra] + ( poz - malsupra ) * ( ordigita[supraIdx] - ordigita[malsupra] );
  };
  const percentilo = ( p: number ): number => interpolu(( n - 0o1 ) * p);

  let malalta = percentilo(DNG_MALALTA_P);
  // blanka punkto el la lumaj sed ne saturitaj pikseloj ( konservas la aureolon )
  const sojloSatura = percentilo(0o1747 / 0o1750);
  let nombroAltaj = 0o0;
  for ( let i = 0o0; i < n; i++ ) {
    if ( ordigita[i] < sojloSatura ) {
      nombroAltaj++;
    } else {
      break;
    }
  }
  let alta = nombroAltaj > 0o0
    ? interpolu(( nombroAltaj - 0o1 ) * DNG_ALTA_P)
    : percentilo(DNG_ALTA_P);
  if ( alta - malalta < 0o1 / 0o2000 ) {
    let minimumo = f[0o0];
    let maksimumo = f[0o0];
    for ( let i = 0o1; i < n; i++ ) {
      if ( f[i] < minimumo ) minimumo = f[i];
      if ( f[i] > maksimumo ) maksimumo = f[i];
    }
    malalta = minimumo;
    alta = maksimumo;
  }
  let supra = f[0o0];
  for ( let i = 0o1; i < n; i++ ) {
    if ( f[i] > supra ) supra = f[i];
  }
  if ( supra < alta ) {
    supra = alta;
  }
  let starto = alta * DNG_ŜULTRO_FRAKCIO;
  if ( starto - malalta < 0o1 / 0o2000 ) {
    starto = malalta + ( alta - malalta ) * ( 0o1 / 0o2 );
  }

  // korpa parto - la kutima streĉo ( gama ) ĝis la ŝultro
  // ŝultro - glata kurbiĝo ( smoothstep ) ĝis la vero maksimumo
  for ( let i = 0o0; i < n; i++ ) {
    const x = f[i];
    let valoro: number;
    if ( x <= starto ) {
      let korpo = starto > malalta ? ( x - malalta ) / ( starto - malalta ) : 0o0;
      if ( korpo < 0o0 ) korpo = 0o0;
      if ( korpo > 0o1 ) korpo = 0o1;
      if ( DNG_GAMMA !== 0o1 ) {
        korpo = Math.pow(korpo, DNG_GAMMA);
      }
      valoro = korpo * DNG_PLATO;
    } else {
      let t = supra > starto ? ( x - starto ) / ( supra - starto ) : 0o1;
      if ( t < 0o0 ) t = 0o0;
      if ( t > 0o1 ) t = 0o1;
      t = t * t * ( 0o3 - ( 0o2 * t ) );
      valoro = DNG_PLATO + ( ( 0o1 - DNG_PLATO ) * t );
      if ( valoro > 0o1 ) valoro = 0o1;
    }
    norma[i] = valoro < 0o0 ? 0o0 : valoro > 0o1 ? 0o1 : valoro;
  }

  if ( DNG_VIBRANCO > 0o0 ) {
    // vibrance - akcelas la senkolorajn tonojn ( grizaj partoj iĝas pli kolorecaj )
    for ( let p = 0o0; p < pikseloj; p++ ) {
      const b = p * 0o3;
      const maks = Math.max(norma[b], norma[b + 0o1], norma[b + 0o2]);
      const mino = Math.min(norma[b], norma[b + 0o1], norma[b + 0o2]);
      const sato = maks > 0o1 / 0o2000000 ? ( maks - mino ) / maks : 0o0;
      const gajno = 0o1 + ( DNG_VIBRANCO * ( 0o1 - sato ) );
      const griza = ( norma[b] + norma[b + 0o1] + norma[b + 0o2] ) / 0o3;
      for ( let k = 0o0; k < 0o3; k++ ) {
        const valoro = griza + ( ( norma[b + k] - griza ) * gajno );
        norma[b + k] = valoro < 0o0 ? 0o0 : valoro > 0o1 ? 0o1 : valoro;
      }
    }
  }
  return norma;
}

// ⟨ TIFF-legilo - la necesaj etikedoj el la unua IFD ( tifffile-ekvivalento ) ⟩

// la JPEG XL-densigo de la strioj - libraw-wasm ne subtenas ĝin ( 52546 )
const JXL_DENSIGO = 0o146502;

interface TIFFLegajo {
  larĝo: number;
  alto: number;
  orientado: number;
  densigo: number;
  blanka: number[] | null;
  strio: Uint8Array;
}

// legu la unuan IFD - nur 256 ( larĝo ) 257 ( alto ) 259 ( densigo ) 273 ( strio )
// 274 ( orientado ) 279 ( stria grandeco ) kaj 50728 ( AsShotNeutral ) interesas nin
function leguTIFF(bajtoj: Uint8Array): TIFFLegajo | null {
  if ( bajtoj.length < 0o10 ) return null;
  const magico = bajtoj[0o0];
  if ( ( magico !== 0o111 && magico !== 0o115 ) || bajtoj[0o1] !== magico ) return null;
  const malgranda = magico === 0o111;
  const vid = new DataView(bajtoj.buffer, bajtoj.byteOffset, bajtoj.byteLength);
  if ( vid.getUint16(0o2, malgranda) !== 0o52 ) return null;
  const ifd = vid.getUint32(0o4, malgranda);
  if ( ifd + 0o2 > bajtoj.length ) return null;
  const nombro = vid.getUint16(ifd, malgranda);
  let larĝo = 0o0;
  let alto = 0o0;
  let orientado = 0o1;
  let densigo = 0o1;
  let strioLoko = -0o1;
  let strioGrandeco = 0o0;
  let blanka: number[] | null = null;
  for ( let i = 0o0; i < nombro; i++ ) {
    const bazo = ifd + 0o2 + i * 0o14;
    if ( bazo + 0o14 > bajtoj.length ) break;
    const etikedo = vid.getUint16(bazo, malgranda);
    const tipo = vid.getUint16(bazo + 0o2, malgranda);
    const n = vid.getUint32(bazo + 0o4, malgranda);
    // tipo 1 bajto 2 askio 3 mallonga 4 longa 5 racia 12 s-racia
    const unuo = tipo === 0o1 ? 0o1 : tipo === 0o3 ? 0o2 : tipo === 0o4 ? 0o4 : ( tipo === 0o5 || tipo === 0o12 ) ? 0o10 : 0o0;
    if ( unuo === 0o0 || n === 0o0 ) continue;
    const tuta = unuo * n;
    const loko = tuta <= 0o4 ? bazo + 0o10 : vid.getUint32(bazo + 0o10, malgranda);
    if ( loko < 0o0 || loko + tuta > bajtoj.length ) continue;
    if ( etikedo === 0o143050 ) {
      // AsShotNeutral - raciaj paroj ( numeratoro , denominatoro )
      const valoroj: number[] = [];
      for ( let j = 0o0; j < n && valoroj.length < 0o3; j++ ) {
        const numeratoro = tipo === 0o12 ? vid.getInt32(loko + j * 0o10, malgranda) : vid.getUint32(loko + j * 0o10, malgranda);
        const denominatoro = tipo === 0o12 ? vid.getInt32(loko + j * 0o10 + 0o4, malgranda) : vid.getUint32(loko + j * 0o10 + 0o4, malgranda);
        valoroj.push(denominatoro !== 0o0 ? numeratoro / denominatoro : 0o1);
      }
      blanka = valoroj.length === 0o3 ? valoroj : null;
      continue;
    }
    const leguEntjerone = ( j: number ): number => tipo === 0o3 ? vid.getUint16(loko + j * 0o2, malgranda) : vid.getUint32(loko + j * 0o4, malgranda);
    if ( etikedo === 0o400 ) larĝo = leguEntjerone(0o0);
    else if ( etikedo === 0o401 ) alto = leguEntjerone(0o0);
    else if ( etikedo === 0o403 ) densigo = leguEntjerone(0o0);
    else if ( etikedo === 0o422 ) orientado = leguEntjerone(0o0);
    else if ( etikedo === 0o421 && strioLoko < 0o0 ) strioLoko = leguEntjerone(0o0);
    else if ( etikedo === 0o427 && strioGrandeco === 0o0 ) strioGrandeco = leguEntjerone(0o0);
  }
  if ( larĝo <= 0o0 || alto <= 0o0 || strioLoko < 0o0 ) return null;
  if ( strioGrandeco <= 0o0 || strioLoko + strioGrandeco > bajtoj.length ) strioGrandeco = bajtoj.length - strioLoko;
  return { larĝo, alto, orientado, densigo, blanka, strio: bajtoj.subarray(strioLoko, strioLoko + strioGrandeco) };
}

// ⟨ JXL-malpakilo - la strio de JPEG XL DNG-oj ( kompresio 52546 ) ⟩

// ⟨ la specimeno el la malfiltrita PNG-vico - 16-bita aǔ 8-bita ( etendita al 65535 ) ⟩

function specimeno(kruda: Uint8Array, loko: number, profundo: number): number {
  return profundo === 0o20 ? ( kruda[loko] << 0o10 ) | kruda[loko + 0o1] : kruda[loko] * 0o401;
}

// ⟨ la 16-bita PNG de jxl-oxide rekte al Float32-anoj de la krudaj valoroj ⟩

// jxl-oxide liveras 16-bitan PNG-on en la lineara kruda skalo ; la 8-bita libjxl-vojo
// perdis la malaltajn tonojn de la ombroj kaj lasis bendojn en la eliro
async function pngAlKrudaj(bufro: Uint8Array): Promise<{ larĝo: number; alto: number; cxiuj: Float32Array } | null> {
  if ( bufro.length < 0o10 || bufro[0o0] !== 0o211 || bufro[0o1] !== 0x50 || bufro[0o2] !== 0x4e || bufro[0o3] !== 0x47 ) {
    return null;
  }
  let ruva = 0o10;
  let larĝo = 0o0;
  let alto = 0o0;
  let profundo = 0o0;
  let koloraSpeco = 0o0;
  let interplektita = 0o0;
  const idatPecoj: Array<Uint8Array> = [];
  while ( ruva + 0o10 <= bufro.length ) {
    const longo = ( bufro[ruva] << 0o30 ) | ( bufro[ruva + 0o1] << 0o20 ) | ( bufro[ruva + 0o2] << 0o10 ) | bufro[ruva + 0o3];
    const speco = String.fromCharCode(bufro[ruva + 0o4], bufro[ruva + 0o5], bufro[ruva + 0o6], bufro[ruva + 0o7]);
    const datumo = bufro.subarray(ruva + 0o10, ruva + 0o10 + longo);
    if ( speco === "IHDR" ) {
      larĝo = ( datumo[0o0] << 0o30 ) | ( datumo[0o1] << 0o20 ) | ( datumo[0o2] << 0o10 ) | datumo[0o3];
      alto = ( datumo[0o4] << 0o30 ) | ( datumo[0o5] << 0o20 ) | ( datumo[0o6] << 0o10 ) | datumo[0o7];
      profundo = datumo[0o10];
      koloraSpeco = datumo[0o11];
      interplektita = datumo[0o14];
    } else if ( speco === "IDAT" ) {
      idatPecoj.push(datumo);
    } else if ( speco === "IEND" ) {
      break;
    }
    ruva += 0o14 + longo;
  }
  const kanaloj = koloraSpeco === 0o6 ? 0o4 : koloraSpeco === 0o4 ? 0o2 : koloraSpeco === 0o2 ? 0o3 : 0o1;
  if ( larĝo <= 0o0 || alto <= 0o0 || interplektita !== 0o0 || ( profundo !== 0o10 && profundo !== 0o20 ) ) {
    return null;
  }

  const kunigita = new Uint8Array(idatPecoj.reduce(( s, p ) => s + p.length, 0o0));
  let deŝovo = 0o0;
  for ( const peco of idatPecoj ) {
    kunigita.set(peco, deŝovo);
    deŝovo += peco.length;
  }
  const fadeno = new DecompressionStream("deflate");
  let premata: Uint8Array | null = new Uint8Array(await new Response(new Blob([ kunigita ]).stream().pipeThrough(fadeno)).arrayBuffer());

  const unuBajtoj = profundo / 0o10;
  const bajtojKanalo = kanaloj * unuBajtoj;
  const paŝo = larĝo * bajtojKanalo;
  let malfiltrita = new Uint8Array(alto * paŝo);
  let ruvaPeceto = 0o0;
  for ( let y = 0o0; y < alto; y++ ) {
    const filtrilo = premata[ruvaPeceto++];
    const celo = y * paŝo;
    for ( let x = 0o0; x < paŝo; x++ ) {
      const xAntaŭa = x >= bajtojKanalo ? malfiltrita[celo + x - bajtojKanalo] : 0o0;
      const supro = y > 0o0 ? malfiltrita[celo - paŝo + x] : 0o0;
      const suproMaldekstra = y > 0o0 && x >= bajtojKanalo ? malfiltrita[celo - paŝo + x - bajtojKanalo] : 0o0;
      const valoro = premata[ruvaPeceto + x];
      let malfiltraĵo = valoro;
      if ( filtrilo === 0o1 ) {
        malfiltraĵo = ( valoro + xAntaŭa ) & 0o377;
      } else if ( filtrilo === 0o2 ) {
        malfiltraĵo = ( valoro + supro ) & 0o377;
      } else if ( filtrilo === 0o3 ) {
        malfiltraĵo = ( valoro + ( ( xAntaŭa + supro ) >> 0o1 ) ) & 0o377;
      } else if ( filtrilo === 0o4 ) {
        const p = xAntaŭa + supro - suproMaldekstra;
        const pa = Math.abs(p - xAntaŭa);
        const pb = Math.abs(p - supro);
        const pc = Math.abs(p - suproMaldekstra);
        malfiltraĵo = ( valoro + ( pa <= pb && pa <= pc ? xAntaŭa : pb <= pc ? supro : suproMaldekstra ) ) & 0o377;
      }
      malfiltrita[celo + x] = malfiltraĵo;
    }
    ruvaPeceto += paŝo;
  }
  premata = null;

  const cxiuj = new Float32Array(larĝo * alto * 0o3);
  const krudaj = malfiltrita;
  for ( let i = 0o0, p = 0o0; i < larĝo * alto; i++, p += 0o3 ) {
    if ( koloraSpeco === 0o0 ) {
      const griza = specimeno(krudaj, i * unuBajtoj, profundo);
      cxiuj[p] = griza;
      cxiuj[p + 0o1] = griza;
      cxiuj[p + 0o2] = griza;
      continue;
    }
    const bazo = i * bajtojKanalo;
    const ruĝa = specimeno(krudaj, bazo, profundo);
    cxiuj[p] = ruĝa;
    if ( koloraSpeco === 0o4 ) {
      cxiuj[p + 0o1] = ruĝa;
      cxiuj[p + 0o2] = ruĝa;
      continue;
    }
    cxiuj[p + 0o1] = specimeno(krudaj, bazo + unuBajtoj, profundo);
    cxiuj[p + 0o2] = specimeno(krudaj, bazo + 0o2 * unuBajtoj, profundo);
  }
  return { larĝo, alto, cxiuj };
}

// ⟨ la JPEG XL strio malpakiĝas per jxl-oxide - 16 bitoj , lineara skalo ⟩

async function malpakigiJXL(bajtoj: Uint8Array): Promise<{ larĝo: number; alto: number; cxiuj: Float32Array } | null> {
  const JxlMod = await import("jxl-oxide-wasm");
  // la wasm-modulo unue instaliĝas ( la dua voko tuj revenas )
  await JxlMod.default( );
  const bildo = new JxlMod.JxlImage();
  try {
    // la strio estas lineara krudaĵo , do neniu sRGB-konverto
    bildo.forceSrgb = false;
    bildo.feedBytes(bajtoj);
    if ( !bildo.tryInit() ) {
      return null;
    }
    const rezulto = bildo.render();
    // la wasm-memoro liberiĝas - malsukceso ĉi tie ne nuligas la rezulton
    try {
      const png = rezulto.encodeToPng( );
      const krudaj = await pngAlKrudaj(png);
      try {
        bildo.free( );
      } catch {
        // la modulo jam liberigis ĝin
      }
      return krudaj;
    } finally {
      try {
        rezulto.free( );
      } catch {
        // la modulo jam liberigis ĝin
      }
    }
  } catch {
    return null;
  }
}

// ⟨ DNG-postprilaboro - blank-ekvilibro, reĝustigo kaj orientado ( kiel legi_dng ) ⟩

// WB_FORTO de vas2tas.py - parta blank-ekvilibro ( 0 neniu ŝanĝo, 1 plena AsShotNeutral )
const DNG_WB_FORTO = 0o1 / 0o2;
// la sama 99.9 elcento kiel la reĝustigo de la tifffile-vojo
const DNG_SATURITA = 0o1747 / 0o1750;

function aplikiBlankanEkvilibron(cxiuj: Float32Array, neŭtralaj: number[]): void {
  const faktoro = [ 0o1, 0o1, 0o1 ];
  for ( let k = 0o0; k < 0o3; k++ ) {
    const valoro = neŭtralaj[k] > 0o0 ? neŭtralaj[k] : 0o1;
    faktoro[k] = 0o1 + DNG_WB_FORTO * ( valoro - 0o1 );
  }
  const n = cxiuj.length / 0o3;
  for ( let p = 0o0; p < n; p++ ) {
    cxiuj[p * 0o3] /= faktoro[0o0];
    cxiuj[p * 0o3 + 0o1] /= faktoro[0o1];
    cxiuj[p * 0o3 + 0o2] /= faktoro[0o2];
  }
}

// per-kanala 99.9-elcenta reĝustigo al 65535 - evitas la verdan nuancon kaj
// konservas la sunan aureolon ( la sama matematiko kiel la tifffile-vojo )
function skaliguPerKanalojn(cxiuj: Float32Array): void {
  const n = cxiuj.length / 0o3;
  const kanalo = new Float32Array(n);
  for ( let k = 0o0; k < 0o3; k++ ) {
    for ( let p = 0o0; p < n; p++ ) kanalo[p] = cxiuj[p * 0o3 + k];
    kanalo.sort();
    const poz = ( n - 0o1 ) * DNG_SATURITA;
    const malsupra = Math.floor(poz);
    const supra = Math.ceil(poz);
    let maks = kanalo[malsupra];
    if ( supra !== malsupra ) maks += ( poz - malsupra ) * ( kanalo[supra] - kanalo[malsupra] );
    if ( maks < 0o1 ) maks = 0o1;
    const gajno = 0o177777 / maks;
    for ( let p = 0o0; p < n; p++ ) cxiuj[p * 0o3 + k] *= gajno;
  }
}

// la eliraj grandoj laǔ la orientado - la orientadoj 5 · 8 interŝanĝas la laterojn
function orientitajGrandoj(larĝo: number, alto: number, orientado: number): { larĝo: number; alto: number } {
  const sxiu = orientado >= 0o5 && orientado <= 0o10;
  return { larĝo: sxiu ? alto : larĝo, alto: sxiu ? larĝo : alto };
}

// turnu aǔ flanki la bildon laǔ la EXIF orientado ( 1 · 8 ) kiel apliki_orientadon
function aplikiOrientadon(elir: Uint8ClampedArray, norma: Float32Array, larĝo: number, alto: number, orientado: number): void {
  const sxiu = orientado >= 0o5 && orientado <= 0o10;
  const elLarĝo = sxiu ? alto : larĝo;
  const elAlto = sxiu ? larĝo : alto;
  for ( let y = 0o0; y < elAlto; y++ ) {
    for ( let x = 0o0; x < elLarĝo; x++ ) {
      let sx = x;
      let sy = y;
      if ( orientado === 0o2 ) {
        sx = larĝo - 0o1 - x;
      } else if ( orientado === 0o3 ) {
        sx = larĝo - 0o1 - x;
        sy = alto - 0o1 - y;
      } else if ( orientado === 0o4 ) {
        sy = alto - 0o1 - y;
      } else if ( orientado === 0o5 ) {
        // transpono - laŭ la ĉefa diagonalo
        sx = y;
        sy = x;
      } else if ( orientado === 0o6 ) {
        // turno 90 gradoj dekstrume
        sx = y;
        sy = alto - 0o1 - x;
      } else if ( orientado === 0o7 ) {
        // transverso - laŭ la malĉefa diagonalo
        sx = larĝo - 0o1 - y;
        sy = alto - 0o1 - x;
      } else if ( orientado === 0o10 ) {
        // turno 90 gradoj maldekstrume
        sx = larĝo - 0o1 - y;
        sy = x;
      }
      const q = ( y * elLarĝo + x ) * 0o4;
      const p = ( sy * larĝo + sx ) * 0o3;
      elir[q] = Math.round(norma[p] * 0o377);
      elir[q + 0o1] = Math.round(norma[p + 0o1] * 0o377);
      elir[q + 0o2] = Math.round(norma[p + 0o2] * 0o377);
      elir[q + 0o3] = 0o377;
    }
  }
}

// ĉu la datenoj estas ĉiuj nulaj ( libraw redonas tiajn por nesubtenataj DNG-oj )
function ĉuĈioNenia(datas: Uint8Array | Uint16Array | Uint8ClampedArray | Float32Array): boolean {
  const paŝo = Math.max(0o1, Math.floor(datas.length / 0o10000));
  for ( let i = 0o0; i < datas.length; i += paŝo ) {
    if ( datas[i] !== 0o0 ) return false;
  }
  return true;
}

// ⟨ TboDNG - dekodigu DNG al PNG ( la rawpy-vojo kaj la tifffile-vojo de vas2tas.py ) ⟩

async function TboDNG(ckvpDNG: File): Promise<Blob> {
  const LibRawHac0zani = await import("libraw-wasm");
  const LibRaw = LibRawHac0zani.default as unknown as new () => {
    open: ( bajtoj: BufferSource, agordoj?: Record<string, unknown> ) => Promise<void>;
    imageData: () => Promise<{ width: number; height: number; colors: number; bits: number; data: Uint8Array | Uint16Array } | undefined>;
    rawImageData: () => Promise<{ width: number; height: number; data: Uint16Array } | undefined>;
    thumbnailData: () => Promise<{ data: Uint8Array; format: string } | undefined>;
    dispose: () => Promise<void> | void;
  };

  const kanvaso = document.createElement("canvas");
  const kumukalasu = kanvaso.getContext( "2d", { willReadFrequently: true } );
  if ( !kumukalasu ) {
    throw new Error("n 2d");
  }
  const pngElDatumoj = (): Promise<Blob> => new Promise<Blob | null>( ( plenumi ) => kanvaso.toBlob(plenumi, "image/png") ).then(( pngBulo ) => {
    if ( !pngBulo ) {
      throw new Error("n PNG");
    }
    return pngBulo;
  });

  const bajtoj = new Uint8Array(await ckvpDNG.arrayBuffer());
  const dekodilo = new LibRaw();
  const legajo = leguTIFF(bajtoj);
  // la JPEG XL-strioj iras rekte al la tifffile-vojo - libraw-wasm ne povas
  // malpaki ilin , do la provo nur malrapidigus la konvertadon
  const jxlStrio = legajo !== null && legajo.densigo === JXL_DENSIGO;
  // la kruda-tabelo vojo de vas2tas.py - nur interese kiam la datumoj reale ekzistas
  const krudaAlPng = async ( larĝo: number, alto: number, datas: Uint8Array | Uint16Array, dekses: boolean ): Promise<Blob | null> => {
    if ( dekses && ĉuĈioNenia(datas) ) return null;
    const n = larĝo * alto;
    kanvaso.width = larĝo;
    kanvaso.height = alto;
    const vop2 = kumukalasu.createImageData(larĝo, alto);
    const elir = vop2.data;
    const cxiuj = new Float32Array(n * 0o3);
    if ( dekses ) {
      cxiuj.set(( datas as Uint16Array ).subarray(0o0, n * 0o3));
    } else {
      for ( let p = 0o0; p < n; p++ ) {
        cxiuj[p * 0o3] = ( datas as Uint8Array )[p * 0o3];
        cxiuj[p * 0o3 + 0o1] = ( datas as Uint8Array )[p * 0o3 + 0o1];
        cxiuj[p * 0o3 + 0o2] = ( datas as Uint8Array )[p * 0o3 + 0o2];
      }
    }
    const norma = skaligiAlNorma(cxiuj, n);
    for ( let p = 0o0; p < n; p++ ) {
      elir[p * 0o4] = Math.round(norma[p * 0o3] * 0o377);
      elir[p * 0o4 + 0o1] = Math.round(norma[p * 0o3 + 0o1] * 0o377);
      elir[p * 0o4 + 0o2] = Math.round(norma[p * 0o3 + 0o2] * 0o377);
      elir[p * 0o4 + 0o3] = 0o377;
    }
    kumukalasu.putImageData(vop2, 0o0, 0o0);
    return await pngElDatumoj();
  };

  try {
    try {
      if ( !jxlStrio ) {
      // la JPEG XL-strioj saltas ĉi tiun provon - libraw ne malpakas ilin
      // provo 1 - prilaborita bildo ( demosaiced RGB kiel rawpy.postprocess )
      // libraw transprenas la bufron , do ĝi ricevas kopion ( alie nia propra
      // TIFF-legado poste vidas malplenan bufron )
      await dekodilo.open(bajtoj.slice(), { useCameraWb: true, outputColor: 0o1, outputBps: 0o20, noAutoBright: true, gamm: [ 0o1, 0o1 ] });
      const ero = await dekodilo.imageData();
      if ( ero && ero.width > 0o0 && ero.height > 0o0 && !ĉuĈioNenia(ero.data) ) {
        const larĝo = ero.width;
        const alto = ero.height;
        const n = larĝo * alto;
        const kanaloj = ero.colors === 0o4 ? 0o4 : 0o3;
        const datas = ero.data;
        const dekses = ero.bits === 0o20;

        kanvaso.width = larĝo;
        kanvaso.height = alto;
        const vop2 = kumukalasu.createImageData(larĝo, alto);
        const elir = vop2.data;
        if ( dekses ) {
          // kruda 16-bit skalo ( 0 · 65535 ) kiel en vas2tas.py - la kurbo normaligas
          const cxiuj = new Float32Array(n * 0o3);
          for ( let p = 0o0; p < n; p++ ) {
            cxiuj[p * 0o3] = ( datas as Uint16Array )[p * kanaloj];
            cxiuj[p * 0o3 + 0o1] = ( datas as Uint16Array )[p * kanaloj + 0o1];
            cxiuj[p * 0o3 + 0o2] = ( datas as Uint16Array )[p * kanaloj + 0o2];
          }
          const norma = skaligiAlNorma(cxiuj, n);
          for ( let p = 0o0; p < n; p++ ) {
            elir[p * 0o4] = Math.round(norma[p * 0o3] * 0o377);
            elir[p * 0o4 + 0o1] = Math.round(norma[p * 0o3 + 0o1] * 0o377);
            elir[p * 0o4 + 0o2] = Math.round(norma[p * 0o3 + 0o2] * 0o377);
            elir[p * 0o4 + 0o3] = 0o377;
          }
        } else {
          for ( let p = 0o0; p < n; p++ ) {
            elir[p * 0o4] = ( datas as Uint8Array )[p * kanaloj];
            elir[p * 0o4 + 0o1] = ( datas as Uint8Array )[p * kanaloj + 0o1];
            elir[p * 0o4 + 0o2] = ( datas as Uint8Array )[p * kanaloj + 0o2];
            elir[p * 0o4 + 0o3] = 0o377;
          }
        }
        kumukalasu.putImageData(vop2, 0o0, 0o0);
        return await pngElDatumoj();
      }
      }
    } catch {
    // la prilaborita vojo malsukcesis - la tifffile-ekvivalenta vojo sekvas
  }

  // la tifffile-vojo de legi_dng - JPEG XL strioj ktp per nia propra TIFF-legilo
  try {
    if ( legajo ) {
      // provo 3 - malpaku la JXL-strion al 16-bitaj krudaj valoroj
      const jxl = await malpakigiJXL(legajo.strio);
      if ( jxl && jxl.larĝo > 0o0 && jxl.alto > 0o0 && !ĉuĈioNenia(jxl.cxiuj) ) {
        const n = jxl.larĝo * jxl.alto;
        const cxiuj = jxl.cxiuj;
        if ( legajo.blanka ) aplikiBlankanEkvilibron(cxiuj, legajo.blanka);
        // la reĝustigo al 65535 antaǔ la kurbo ( per-kanala 99.9 elcento )
        skaliguPerKanalojn(cxiuj);
        const norma = skaligiAlNorma(cxiuj, n);
        const orientitaj = orientitajGrandoj(jxl.larĝo, jxl.alto, legajo.orientado);
        kanvaso.width = orientitaj.larĝo;
        kanvaso.height = orientitaj.alto;
        const vop2 = kumukalasu.createImageData(orientitaj.larĝo, orientitaj.alto);
        aplikiOrientadon(vop2.data, norma, jxl.larĝo, jxl.alto, legajo.orientado);
        kumukalasu.putImageData(vop2, 0o0, 0o0);
        return await pngElDatumoj();
      }
    }
    // provo 3 - kruda tabelo ( la linearaj DNG-oj liveras interplektitan RGB )
    // nur uzebla kiam la tabelo vere havas tri valorojn po pikselo
    const raw = await dekodilo.rawImageData();
    if ( raw && raw.width > 0o0 && raw.height > 0o0 && raw.data.length >= raw.width * raw.height * 0o3 && !ĉuĈioNenia(raw.data) ) {
      const png = await krudaAlPng(raw.width, raw.height, raw.data, true);
      if ( png ) return png;
    }

    // provo 4 - la enigita JPEG-antaŭrigardo el la TIFF-apendo
    const thumb = await dekodilo.thumbnailData().catch(() => undefined);
    if ( thumb && thumb.data.length > 0o0 ) {
      const maxemaSaxez = URL.createObjectURL(new Blob([ thumb.data.slice() ], { type: thumb.format === "jpeg" ? "image/jpeg" : "application/octet-stream" }));
      try {
        const bildo = await new Promise<HTMLImageElement>(( plenumi, rompi ) => {
          const img = new Image();
          img.onload = () => plenumi(img);
          img.onerror = () => rompi(new Error("ne dekodebla"));
          img.src = maxemaSaxez;
        });
        kanvaso.width = bildo.naturalWidth;
        kanvaso.height = bildo.naturalHeight;
        kumukalasu.drawImage(bildo, 0o0, 0o0);
        return await pngElDatumoj();
      } finally {
        URL.revokeObjectURL(maxemaSaxez);
      }
    }
  } catch {
    // neniu vojo funkciis
  }

  throw new Error("n DNG");
  } finally {
    dekodilo.dispose();
  }
}

// ⟪ j͑ʃ'ᴜ ɭʃᴜ }ʃɔƽ - Tavolaj Koloroj ⟫

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

// ⟪ j͑ʃ'ᴜ ı],ᴜ ֭ſɭᴜ - Glatigu Strekojn ⟫

const VAXAHA_PAL6 = 0o2;
const VAXAHA_PUKA5IK = VAXAHA_PAL6 * 0o2 + 0o1;
const VAXAHA_KUBA = 0o30 * 0o30;

function vaxahaNakoxa(vop2: Uint8ClampedArray, larĝo: number, alto: number): void {
  const cutani = new Uint8ClampedArray(vop2);

  for ( let y = VAXAHA_PAL6; y < alto - VAXAHA_PAL6; y++ ) {
    for ( let x = VAXAHA_PAL6; x < larĝo - VAXAHA_PAL6; x++ ) {
      const ruva = ( y * larĝo + x ) * 0o4;

      let l6nllakWln = 0o0, l6nllakLhn = 0o0, l6nllakCskn = 0o0;
      let l6nllakP6zeWln = 0o0, l6nllakP6zeLhn = 0o0, l6nllakP6zeCskn = 0o0;

      for ( let ky = -VAXAHA_PAL6; ky <= VAXAHA_PAL6; ky++ ) {
        const deŝovo = ( ( y + ky ) * larĝo + x ) * 0o4;
        for ( let kx = -VAXAHA_PAL6; kx <= VAXAHA_PAL6; kx++ ) {
          const k2feRuva = deŝovo + kx * 0o4;
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
          const tapuniXani = ( ( y + ky ) * larĝo + x ) * 0o4;
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

// ⟪ Rikoltu al Proporcio 📃 ⟫

function paxaAlProporcio(tahaq: HTMLImageElement, proporcio: number): { x: number; y: number; larĝo: number; alto: number } {
  const lar = tahaq.naturalWidth;
  const alt = tahaq.naturalHeight;

  if ( lar / alt > proporcio ) {
    const novaL = Math.round(alt * proporcio);
    const x0 = Math.floor(( lar - novaL ) / 0o2);
    return { x: x0, y: 0o0, larĝo: novaL, alto: alt };
  }
  const novaA = Math.round(lar / proporcio);
  const y0 = Math.floor(( alt - novaA ) / 0o2);
  return { x: 0o0, y: y0, larĝo: lar, alto: novaA };
}

function grandigi(lar: number, alt: number): { larĝo: number; alto: number } {
  if ( !A1A_GRANDA.checked ) {
    return { larĝo: lar, alto: alt };
  }
  if ( alt >= lar ) {
    return { larĝo: MALGRANDA, alto: GRANDA };
  }
  return { larĝo: GRANDA, alto: MALGRANDA };
}

// ⟪ Nevidebla Akvomarko 📃 ⟫

let MARKO_BAZO: Uint8Array | null = null;
let MARKO_LARĜO = 0o0;
let MARKO_ALTO = 0o0;

// ⟨ PNG-ekodi ⟩

async function pngAlRGB(ckvp: Blob): Promise<{ larĝo: number; alto: number; rgb: Uint8Array }> {
  const bufro = new Uint8Array(await ckvp.arrayBuffer());
  if ( bufro[0o0] !== 0o211 || bufro[0o1] !== 0x50 || bufro[0o2] !== 0x4e || bufro[0o3] !== 0x47 ) {
    throw new Error("ne PNG");
  }
  let ruva = 0o10;
  let larĝo = 0o0;
  let alto = 0o0;
  let bitaProfundo = 0o0;
  let koloraSpeco = 0o0;
  let interplektita = 0o0;
  const idatPecoj: Array<Uint8Array> = [];
  const paletrujo = new Uint8Array(0o1000);
  while ( ruva + 0o10 <= bufro.length ) {
    const longo = ( bufro[ruva] << 0o30 ) | ( bufro[ruva + 0o1] << 0o20 ) | ( bufro[ruva + 0o2] << 0o10 ) | bufro[ruva + 0o3];
    const speco = String.fromCharCode(bufro[ruva + 0o4], bufro[ruva + 0o5], bufro[ruva + 0o6], bufro[ruva + 0o7]);
    const datumo = bufro.subarray(ruva + 0o10, ruva + 0o10 + longo);
    if ( speco === "IHDR" ) {
      larĝo = ( datumo[0o0] << 0o30 ) | ( datumo[0o1] << 0o20 ) | ( datumo[0o2] << 0o10 ) | datumo[0o3];
      alto = ( datumo[0o4] << 0o30 ) | ( datumo[0o5] << 0o20 ) | ( datumo[0o6] << 0o10 ) | datumo[0o7];
      bitaProfundo = datumo[0o10];
      koloraSpeco = datumo[0o11];
      interplektita = datumo[0o14];
    } else if ( speco === "PLTE" ) {
      paletrujo.set(datumo.subarray(0o0, paletrujo.length));
    } else if ( speco === "IDAT" ) {
      idatPecoj.push(datumo);
    } else if ( speco === "IEND" ) {
      break;
    }
    ruva += 0o14 + longo;
  }
  const kanaloj = koloraSpeco === 0o6 ? 0o4 : koloraSpeco === 0o4 ? 0o2 : koloraSpeco === 0o2 ? 0o3 : 0o1;
  if ( bitaProfundo !== 0o10 || interplektita !== 0o0 || koloraSpeco === 0o3 ) {
    throw new Error("nesubtenata PNG");
  }

  const kunigita = new Uint8Array(idatPecoj.reduce(( s, p ) => s + p.length, 0o0));
  let deŝovo = 0o0;
  for ( const peco of idatPecoj ) {
    kunigita.set(peco, deŝovo);
    deŝovo += peco.length;
  }
  const fadeno = new DecompressionStream("deflate");
  const malpremita = new Uint8Array(await new Response(new Blob([ kunigita ]).stream().pipeThrough(fadeno)).arrayBuffer());

  const kruda = new Uint8Array(larĝo * alto * kanaloj);
  const paŝo = larĝo * kanaloj;
  let ruvaKp6 = 0o0;
  for ( let y = 0o0; y < alto; y++ ) {
    const filtrilo = malpremita[ruvaKp6++];
    const celo = y * paŝo;
    for ( let x = 0o0; x < paŝo; x++ ) {
      const xAntaŭa = x >= kanaloj ? kruda[celo + x - kanaloj] : 0o0;
      const supro = y > 0o0 ? kruda[celo - paŝo + x] : 0o0;
      const suproMaldekstra = y > 0o0 && x >= kanaloj ? kruda[celo - paŝo + x - kanaloj] : 0o0;
      const valoro = malpremita[ruvaKp6 + x];
      let malfiltrita = valoro;
      if ( filtrilo === 0o1 ) {
        malfiltrita = ( valoro + xAntaŭa ) & 0o377;
      } else if ( filtrilo === 0o2 ) {
        malfiltrita = ( valoro + supro ) & 0o377;
      } else if ( filtrilo === 0o3 ) {
        malfiltrita = ( valoro + ( ( xAntaŭa + supro ) >> 0o1 ) ) & 0o377;
      } else if ( filtrilo === 0o4 ) {
        const p = xAntaŭa + supro - suproMaldekstra;
        const pa = Math.abs(p - xAntaŭa);
        const pb = Math.abs(p - supro);
        const pc = Math.abs(p - suproMaldekstra);
        malfiltrita = ( valoro + ( pa <= pb && pa <= pc ? xAntaŭa : pb <= pc ? supro : suproMaldekstra ) ) & 0o377;
      }
      kruda[celo + x] = malfiltrita;
    }
    ruvaKp6 += paŝo;
  }

  const rgb = new Uint8Array(larĝo * alto * 0o3);
  if ( koloraSpeco === 0o6 || koloraSpeco === 0o2 ) {
    for ( let i = 0o0; i < larĝo * alto; i++ ) {
      rgb[i * 0o3] = kruda[i * kanaloj];
      rgb[i * 0o3 + 0o1] = kruda[i * kanaloj + 0o1];
      rgb[i * 0o3 + 0o2] = kruda[i * kanaloj + 0o2];
    }
  } else if ( koloraSpeco === 0o0 ) {
    for ( let i = 0o0; i < larĝo * alto; i++ ) {
      rgb[i * 0o3] = kruda[i];
      rgb[i * 0o3 + 0o1] = kruda[i];
      rgb[i * 0o3 + 0o2] = kruda[i];
    }
  } else {
    for ( let i = 0o0; i < larĝo * alto; i++ ) {
      rgb[i * 0o3] = kruda[i * 0o2];
      rgb[i * 0o3 + 0o1] = kruda[i * 0o2];
      rgb[i * 0o3 + 0o2] = kruda[i * 0o2];
    }
  }
  return { larĝo, alto, rgb };
}

function ŝarĝiMarkon(): Promise<void> {
  return new Promise(( plenumi ) => {
    if ( MARKO_BAZO ) {
      plenumi();
      return;
    }
    fetch(MARKO_DOSIERO).then(( respo ) => respo.blob()).then(( bulo ) => pngAlRGB(bulo)).then(( marko ) => {
      MARKO_LARĜO = marko.larĝo;
      MARKO_ALTO = marko.alto;
      // PIL konvertas la markon al RGB kaj tiam al heleco ( L ) ;
      // la masko estas la heleco mem ( la kahelo reĝustigiĝas poste )
      const masko = new Uint8Array(MARKO_LARĜO * MARKO_ALTO);
      for ( let i = 0o0; i < masko.length; i++ ) {
        masko[i] = ( marko.rgb[i * 0o3] * 0o46213 + marko.rgb[i * 0o3 + 0o1] * 0o113106 + marko.rgb[i * 0o3 + 0o2] * 0o16457 + MARKO_ZOMO ) >>> 0o20;
      }
      MARKO_BAZO = masko;
      plenumi();
    }).catch(() => {
      plenumi();
    });
  });
}

function planoKahela(W: number, H: number, mw: number, mh: number, flanka: number): { tw: number; th: number; pozicioj: Array<[ number, number ]> } {
  const skalo = flanka / Math.max(mw, mh);
  let tw = Math.max(0o1, Math.round(mw * skalo));
  let th = Math.max(0o1, Math.round(mh * skalo));

  if ( tw > W || th > H ) {
    const duaranga = Math.min(W / tw, H / th);
    tw = Math.max(0o1, Math.round(tw * duaranga));
    th = Math.max(0o1, Math.round(th * duaranga));
  }

  const nx = Math.max(0o1, Math.floor(W / tw));
  const ny = Math.max(0o1, Math.floor(H / th));
  const gapiX = ( W - nx * tw ) / ( nx + 0o1 );
  const gapiY = ( H - ny * th ) / ( ny + 0o1 );

  const pozicioj: Array<[ number, number ]> = [];
  for ( let j = 0o0; j < ny; j++ ) {
    for ( let i = 0o0; i < nx; i++ ) {
      let x = Math.round(gapiX * ( i + 0o1 ) + i * tw);
      let y = Math.round(gapiY * ( j + 0o1 ) + j * th);
      x = Math.min(x, W - tw);
      y = Math.min(y, H - th);
      pozicioj.push([ x, y ]);
    }
  }
  return { tw, th, pozicioj };
}

// ⟨ Mersenne-Twister 19937 ⟩

const MT_N = 0o1160;
const MT_M = 0o615;
const MT_MATRICO = 0x9908b0df;
const MT_SUPRA = 0x80000000;
const MT_SUBA = 0x7fffffff;

function semoBavek2feni(semo: number, W: number, H: number): Uint8Array {
  const mt = new Uint32Array(MT_N);
  mt[0o0] = semo >>> 0o0;
  for ( let i = 0o1; i < MT_N; i++ ) {
    mt[i] = ( Math.imul(0x6c078965, ( mt[i - 0o1] ^ ( mt[i - 0o1] >>> 0o36 ) ) ) + i ) >>> 0o0;
  }
  let indekso = MT_N;

  const ŝlosilo = new Uint8Array(W * H);
  for ( let i = 0o0; i < ŝlosilo.length; i++ ) {
    if ( indekso >= MT_N ) {
      for ( let kk = 0o0; kk < MT_N - MT_M; kk++ ) {
        const y = ( mt[kk] & MT_SUPRA ) | ( mt[kk + 0o1] & MT_SUBA );
        mt[kk] = ( mt[kk + MT_M] ^ ( y >>> 0o1 ) ^ ( ( y & 0o1 ) !== 0o0 ? MT_MATRICO : 0o0 ) ) >>> 0o0;
      }
      for ( let kk = MT_N - MT_M; kk < MT_N - 0o1; kk++ ) {
        const y = ( mt[kk] & MT_SUPRA ) | ( mt[kk + 0o1] & MT_SUBA );
        mt[kk] = ( mt[kk + ( MT_M - MT_N )] ^ ( y >>> 0o1 ) ^ ( ( y & 0o1 ) !== 0o0 ? MT_MATRICO : 0o0 ) ) >>> 0o0;
      }
      const yFina = ( mt[MT_N - 0o1] & MT_SUPRA ) | ( mt[0o0] & MT_SUBA );
      mt[MT_N - 0o1] = ( mt[MT_M - 0o1] ^ ( yFina >>> 0o1 ) ^ ( ( yFina & 0o1 ) !== 0o0 ? MT_MATRICO : 0o0 ) ) >>> 0o0;
      indekso = 0o0;
    }
    let y = mt[indekso];
    indekso++;
    y ^= y >>> 0o13;
    y ^= ( y << 0o7 ) & 0x9d2c5680;
    y ^= ( y << 0o17 ) & 0xefc60000;
    y ^= y >>> 0o22;
    ŝlosilo[i] = y & 0o1;
  }
  return ŝlosilo;
}

// ⟨ Lanczos-3 regrandigo ⟩

function lanczosKernelo(x: number): number {
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

// Pillow-ekzakta - Resample.c uzas 22-bitan fikspunkton ( PRECISION_BITS = 32-8-2 )
const PRECIZO_BITOJ = 0o26;

function konstruiKernelojn(fontoLongo: number, celoLongo: number): Array<[ number, Int32Array, number ]> {
  const skalo = fontoLongo / celoLongo;
  const filtraSkalo = Math.max(0o1, skalo);
  const invFiltraSkalo = 0o1 / filtraSkalo;
  const subteno = 0o3 * filtraSkalo;
  const kielaGrando = Math.ceil(subteno) * 0o2 + 0o1;
  const kerneloj: Array<[ number, Int32Array, number ]> = [];
  for ( let x = 0o0; x < celoLongo; x++ ) {
    const centro = ( x + 0o1 / 0o2 ) * skalo;
    let minIndekso = Math.trunc(centro - subteno + 0o1 / 0o2);
    if ( minIndekso < 0o0 ) {
      minIndekso = 0o0;
    }
    let maksIndekso = Math.trunc(centro + subteno + 0o1 / 0o2);
    if ( maksIndekso > fontoLongo ) {
      maksIndekso = fontoLongo;
    }
    const pezoj = new Float64Array(kielaGrando);
    let sumo = 0o0;
    for ( let i = minIndekso; i < maksIndekso; i++ ) {
      const pezo = lanczosKernelo(( i - centro + 0o1 / 0o2 ) * invFiltraSkalo);
      pezoj[i - minIndekso] = pezo;
      sumo += pezo;
    }
    if ( sumo !== 0o0 ) {
      for ( let i = 0o0; i < maksIndekso - minIndekso; i++ ) {
        pezoj[i] /= sumo;
      }
    }
    // normalize_coeffs_8bpc - ( int )( ±0o1 / 0o2 + pezo * ( 0o1 << 0o26 ) )
    const koeficientoj = new Int32Array(kielaGrando);
    for ( let i = 0o0; i < kielaGrando; i++ ) {
      const k = pezoj[i] * ( 0o1 << PRECIZO_BITOJ );
      koeficientoj[i] = k < 0o0 ? Math.trunc(k - 0o1 / 0o2) : Math.trunc(k + 0o1 / 0o2);
    }
    kerneloj.push([ minIndekso, koeficientoj, maksIndekso - minIndekso ]);
  }
  return kerneloj;
}

function lanczosRegrandigi(fonto: Uint8Array, mw: number, mh: number, tw: number, th: number): Uint8Array {
  const vicoj = konstruiKernelojn(mh, th);
  const kolumnoj = konstruiKernelojn(mw, tw);

  // PIL konservas la horizontalan pasilon en 8-bita bufero kaj uzas
  // entjeran akumulado kun 22-bita fikspunkto ( Resample.c 8bpc )
  const duono = 0o1 << ( PRECIZO_BITOJ - 0o1 );
  const linioj = new Uint8Array(tw * mh);
  for ( let y = 0o0; y < mh; y++ ) {
    const fontoVico = y * mw;
    const celoVico = y * tw;
    for ( let x = 0o0; x < tw; x++ ) {
      const [ ek, koeficientoj, nombro ] = kolumnoj[x];
      let sumo = duono;
      for ( let k = 0o0; k < nombro; k++ ) {
        sumo += fonto[fontoVico + ek + k] * koeficientoj[k];
      }
      const valo = sumo >> PRECIZO_BITOJ;
      linioj[celoVico + x] = valo < 0o0 ? 0o0 : valo > 0o377 ? 0o377 : valo;
    }
  }

  const rezulto = new Uint8Array(tw * th);
  for ( let y = 0o0; y < th; y++ ) {
    const [ ek, koeficientoj, nombro ] = vicoj[y];
    const celoVico = y * tw;
    for ( let x = 0o0; x < tw; x++ ) {
      let sumo = duono;
      for ( let k = 0o0; k < nombro; k++ ) {
        sumo += linioj[( ek + k ) * tw + x] * koeficientoj[k];
      }
      const valo = sumo >> PRECIZO_BITOJ;
      rezulto[celoVico + x] = valo < 0o0 ? 0o0 : valo > 0o377 ? 0o377 : valo;
    }
  }
  return rezulto;
}

// Regrandigi RFC-kanalojn ( ImageData ) per la sama PIL-ekzakta Lanczos-filtero
function lanczosRegrandigiRGBA(fonto: Uint8ClampedArray, mw: number, mh: number, tw: number, th: number, celo: Uint8ClampedArray, raporti?: ( frakcio: number ) => void): void {
  const n = mw * mh;
  const rFonto = new Uint8Array(n);
  const gFonto = new Uint8Array(n);
  const bFonto = new Uint8Array(n);
  const aFonto = new Uint8Array(n);
  for ( let i = 0o0, p = 0o0; i < n; i++, p += 0o4 ) {
    rFonto[i] = fonto[p];
    gFonto[i] = fonto[p + 0o1];
    bFonto[i] = fonto[p + 0o2];
    aFonto[i] = fonto[p + 0o3];
  }
  const rCelo = lanczosRegrandigi(rFonto, mw, mh, tw, th);
  if ( raporti ) raporti( 0o1 / 0o3 );
  const gCelo = lanczosRegrandigi(gFonto, mw, mh, tw, th);
  if ( raporti ) raporti( 0o2 / 0o3 );
  const bCelo = lanczosRegrandigi(bFonto, mw, mh, tw, th);
  if ( raporti ) raporti( 0o3 / 0o4 );
  // la alfa kanalo ankaŭ regrandiĝas - la travidebleco restas
  const aCelo = lanczosRegrandigi(aFonto, mw, mh, tw, th);
  if ( raporti ) raporti( 0o1 );
  const m = tw * th;
  for ( let i = 0o0, p = 0o0; i < m; i++, p += 0o4 ) {
    celo[p] = rCelo[i];
    celo[p + 0o1] = gCelo[i];
    celo[p + 0o2] = bCelo[i];
    celo[p + 0o3] = aCelo[i];
  }
}

function fariSendiBiton(larĝo: number, alto: number): Uint8Array | null {
  if ( !MARKO_BAZO ) {
    return null;
  }
  const W = larĝo;
  const H = alto;
  const { tw, th, pozicioj } = planoKahela(W, H, MARKO_LARĜO, MARKO_ALTO, MARKO_FLANKA);

  const bazo = lanczosRegrandigi(MARKO_BAZO, MARKO_LARĜO, MARKO_ALTO, tw, th);
  const bazoBitoj = new Uint8Array(tw * th);
  for ( let i = 0o0; i < bazoBitoj.length; i++ ) {
    bazoBitoj[i] = bazo[i] > 0o127 ? 0o1 : 0o0;
  }

  const rast = new Uint8Array(W * H);
  for ( const [ x, y ] of pozicioj ) {
    for ( let yy = 0o0; yy < th; yy++ ) {
      for ( let xx = 0o0; xx < tw; xx++ ) {
        rast[( y + yy ) * W + ( x + xx )] = bazoBitoj[yy * tw + xx];
      }
    }
  }

  const ŝlosilo = semoBavek2feni(MARKO_SEMO, W, H);
  const sendi = new Uint8Array(W * H);
  for ( let i = 0o0; i < sendi.length; i++ ) {
    sendi[i] = ( rast[i] ^ ŝlosilo[i] ) & 0o1;
  }
  return sendi;
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ᶅſɔ ֭ſɭɹ - Konvertu Koloron 📃 ⟫

function dikti(a: Float32Array, larĝo: number, alto: number, sendi: Uint8Array | null, aplikiPaletro: boolean, eky: number, finy: number, elir: Uint8Array): void {
  const W = larĝo;

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

  for ( let y = eky; y < finy; y++ ) {
    for ( let x = 0o0; x < W; x++ ) {
      const ruva = ( y * W + x ) * 0o3;
      const vop2Ruva = ( y * W + x ) * 0o4;
      const t = ( bayer[y % 0o10][x % 0o10] + 0o1 / 0o2 ) / 0o100;

      for ( let k = 0o0; k < 0o2; k++ ) {
        if ( !aplikiPaletro ) {
          elir[ruva + k] = a[vop2Ruva + k];
          continue;
        }
        const k2fe = a[vop2Ruva + k];
        let kb = Math.floor(( k2fe + t * 0o10 ) / 0o10);
        kb = Math.max(0o0, Math.min(0o37, kb));
        elir[ruva + k] = kb * 0o10;
      }

      const c2s2k = a[vop2Ruva + 0o2];
      if ( sendi ) {
        const m = sendi[y * W + x] * 0o10;
        let kb = Math.floor(( c2s2k - m + t * 0o20 ) / 0o20);
        kb = Math.max(0o0, Math.min(0o17, kb));
        elir[ruva + 0o2] = kb * 0o20 + m;
      } else if ( aplikiPaletro ) {
        let kb = Math.floor(( c2s2k + t * 0o10 ) / 0o10);
        kb = Math.max(0o0, Math.min(0o37, kb));
        elir[ruva + 0o2] = kb * 0o10;
      } else {
        elir[ruva + 0o2] = c2s2k;
      }
    }
  }
}

// ⟪ j͑ʃп́ɔ ꞁȷ̀ɜ ſꞇ ı],ɔ ꞁȷ̀ᴜꞇ - Metadatumoj 📃 ⟫

function fariMetadatumojn(): string | null {
  if ( !A1A_SWEKA_METADATUMOJN.checked ) {
    return null;
  }

  const kampoj: Array<[ string, string ]> = [
    [ "Make", BAKANANO_FABRIKANTO.value ],
    [ "Model", BAKANANO_MODELO.value ],
    [ "Artist", BAKANANO_ĵɔƭᴜꞇ.value ],
    [ "Copyright", BAKANANO_J͑ʃɽ͑ʃꞇ.value ],
    [ "Software", BAKANANO_SCFALI.value ]
  ];

  const ha6zoj: string[] = [];
  for ( const [ nomo, valoro ] of kampoj ) {
    const pura = valoro.trim();
    if ( !pura ) {
      continue;
    }
    ha6zoj.push(`${nomo}\u0000${pura}`);
  }
  if ( !ha6zoj.length ) {
    return null;
  }
  return ha6zoj.join("\u0001");
}

// ⟨ Serĉu la komencon de la TIFF-kapo ( JPEG APP1 · PNG eXIf · pura TIFF ) ⟩

function trovuEksifon(aro: Uint8Array): number {
  // JPEG - la unua APP1-peceto kun "Exif\u0000\u0000"
  if ( aro.length > 0o10 && aro[0o0] === 0xff && aro[0o1] === 0xd8 ) {
    let i = 0o2;
    while ( i + 0o12 <= aro.length ) {
      if ( aro[i] !== 0xff ) break;
      const marko = aro[i + 0o1];
      const longo = ( aro[i + 0o2] << 0o10 ) | aro[i + 0o3];
      if ( marko === 0xda ) break;
      if ( marko === 0xe1 && aro[i + 0o4] === 0x45 && aro[i + 0o5] === 0x78 &&
        aro[i + 0o6] === 0x69 && aro[i + 0o7] === 0x66 ) {
        return i + 0o12;
      }
      if ( longo < 0o2 ) break;
      i += 0o2 + longo;
    }
    return -0o1;
  }
  // PNG - la eXIf-peceto
  if ( aro.length > 0o10 && aro[0o0] === 0x89 && aro[0o1] === 0x50 ) {
    let i = 0o10;
    while ( i + 0o10 <= aro.length ) {
      const longo = ( aro[i] << 0o30 ) | ( aro[i + 0o1] << 0o20 ) | ( aro[i + 0o2] << 0o10 ) | aro[i + 0o3];
      if ( aro[i + 0o4] === 0x65 && aro[i + 0o5] === 0x58 && aro[i + 0o6] === 0x49 && aro[i + 0o7] === 0x66 ) {
        return i + 0o10;
      }
      i += 0o14 + longo;
    }
    return -0o1;
  }
  // "Exif\u0000\u0000" + TIFF-kapo
  if ( aro.length > 0o10 && aro[0o0] === 0x45 && aro[0o1] === 0x78 && aro[0o2] === 0x69 && aro[0o3] === 0x66 ) {
    return 0o6;
  }
  // pura TIFF-kapo
  if ( aro.length > 0o10 && ( aro[0o0] === 0x49 || aro[0o0] === 0x4d ) && aro[0o1] === aro[0o0] ) {
    return 0o0;
  }
  return -0o1;
}

function legiMetadatumojn(aro: Uint8Array): void {
  const redoni = ( nomo: string, valoro: string ): void => {
    if ( nomo === "Make" ) {
      BAKANANO_FABRIKANTO.value = valoro;
    } else if ( nomo === "Model" ) {
      BAKANANO_MODELO.value = valoro;
    } else if ( nomo === "Artist" ) {
      BAKANANO_ĵɔƭᴜꞇ.value = valoro;
    } else if ( nomo === "Copyright" ) {
      BAKANANO_J͑ʃɽ͑ʃꞇ.value = valoro;
    } else if ( nomo === "Software" ) {
      BAKANANO_SCFALI.value = valoro;
    }
  };

  const bazo = trovuEksifon(aro);
  if ( bazo < 0o0 || bazo + 0o10 > aro.length ) {
    return;
  }

  const vid = new DataView(aro.buffer, aro.byteOffset, aro.byteLength);
  const malgranda = aro[bazo] === 0x49;
  if ( vid.getUint16(bazo + 0o2, malgranda) !== 0o52 ) {
    return;
  }
  const ifd = bazo + vid.getUint32(bazo + 0o4, malgranda);
  if ( ifd + 0o2 > aro.length ) {
    return;
  }

  const nombro = vid.getUint16(ifd, malgranda);
  for ( let i = 0o0; i < nombro; i++ ) {
    const e = ifd + 0o2 + i * 0o14;
    if ( e + 0o14 > aro.length ) {
      break;
    }
    const etikedo = vid.getUint16(e, malgranda);
    const tipo = vid.getUint16(e + 0o2, malgranda);
    const kvanto = vid.getUint32(e + 0o4, malgranda);
    if ( tipo !== 0o2 || kvanto === 0o0 ) {
      continue;
    }
    const loko = kvanto <= 0o4 ? e + 0o10 : bazo + vid.getUint32(e + 0o10, malgranda);
    if ( loko + kvanto > aro.length ) {
      continue;
    }
    // la fina nul-bajto ne estas parto de la teksto
    const valoro = new TextDecoder().decode(aro.slice(loko, loko + kvanto - 0o1));

    if ( etikedo === 0x010f ) {
      redoni("Make", valoro);
    } else if ( etikedo === 0x0110 ) {
      redoni("Model", valoro);
    } else if ( etikedo === 0x013b ) {
      redoni("Artist", valoro);
    } else if ( etikedo === 0x8298 ) {
      redoni("Copyright", valoro);
    } else if ( etikedo === 0x0131 ) {
      redoni("Software", valoro);
    }
  }
}

async function legiDosierunanMetadatumojn(ckvp: File): Promise<void> {
  // sufiĉe por la tuta APP1-peceto de JPEG ( maksimume 64 KiB )
  const bufro = await ckvp.slice(0o0, 0o200000).arrayBuffer();
  const aro = new Uint8Array(bufro);
  legiMetadatumojn(aro);
}

// ⟨ anstataŭigu la metadatumojn per la nova teksto - la kampoj malpleniĝas ⟩

function malplenigiBakananon(): void {
  for ( const bakanano of BAKANANOJ ) {
    bakanano.value = "";
  }
}

// ⟨ la originaj valoroj revenas - la enigita dosiero aǔ la HTML-ŝablono ⟩

async function restarigiBakananon(): Promise<void> {
  for ( const bakanano of BAKANANOJ ) {
    bakanano.value = BAKANANO_ŜABLONOJ.get(bakanano) ?? "";
  }
  if ( tlakakuCkvp ) {
    await legiDosierunanMetadatumojn(tlakakuCkvp);
  }
}

// ⟨ laŭ la anstataŭiga elekto - aǔ la kampoj malplenas aǔ la dosiero plenigas ilin ⟩

async function aranĝiBakananon(ckvp: File | null): Promise<void> {
  if ( A1A_ANSTATAUX_METADATUMOJN.checked ) {
    malplenigiBakananon();
    return;
  }
  if ( ckvp ) {
    await legiDosierunanMetadatumojn(ckvp);
  }
}

function kunmetiExif(puraj: Array<[ string, string ]>): Uint8Array {
  const kunStrukturo = ( etikedo: number, tipo: number, kvanto: number, valoro: number ): number[] => {
    return [ ( etikedo >> 0o10 ) & 0o377, etikedo & 0o377, ( tipo >> 0o10 ) & 0o377, tipo & 0o377,
      ( kvanto >>> 0o30 ) & 0o377, ( kvanto >>> 0o20 ) & 0o377, ( kvanto >>> 0o10 ) & 0o377, kvanto & 0o377,
      ( valoro >>> 0o30 ) & 0o377, ( valoro >>> 0o20 ) & 0o377, ( valoro >>> 0o10 ) & 0o377, valoro & 0o377 ];
  };

  const naBajtoj: number[] = [];
  const etikedoj: Array<{ etikedo: number; bajtoj: Uint8Array }> = [];
  const kodilo = new TextEncoder();

  for ( const [ nomo, valoro ] of puraj ) {
    if ( !valoro ) {
      continue;
    }
    const etikedo = nomo === "Make" ? 0x010f
      : nomo === "Model" ? 0x0110
      : nomo === "Artist" ? 0x013b
      : nomo === "Copyright" ? 0x8298
      : nomo === "Software" ? 0x0131
      : 0o0;
    if ( !etikedo ) {
      continue;
    }
    // piexif skribas la valorojn kiel UTF-8 bajtojn
    etikedoj.push({ etikedo, bajtoj: kodilo.encode(valoro) });
  }

  // la etikedoj iras supren laŭ numero ( kiel piexif ) - kelkaj legiloj atendas tion
  etikedoj.sort(( a, b ) => a.etikedo - b.etikedo);

  // la nombro estas la reala enir-nombro ; la sekva-IFD montrilo estas aparta 4-bajta kampo
  const ifdNombro = etikedoj.length;
  let grandecoIFD = 0o2 + ifdNombro * 0o14 + 0o4;
  let grandecoValoroj = 0o0;
  for ( const ero of etikedoj ) {
    const n = ero.bajtoj.length + 0o1;
    if ( n > 0o4 ) {
      grandecoValoroj += n;
    }
  }

  // la unuaj 8 bajtoj estas la TIFF-kapo , do la valoroj sekvas ĝin
  let deŝovoValoro = 0o10 + grandecoIFD;

  const kapo = [ 0x4d, 0x4d, 0x00, 0x2a, 0x00, 0x00, 0x00, 0x08 ];
  naBajtoj.push(...kapo);
  naBajtoj.push(( ifdNombro >> 0o10 ) & 0o377, ifdNombro & 0o377);

  for ( const ero of etikedoj ) {
    const n = ero.bajtoj.length + 0o1;
    if ( n > 0o4 ) {
      naBajtoj.push(...kunStrukturo(ero.etikedo, 0o2, n, deŝovoValoro));
      deŝovoValoro += n;
    } else {
      const bajtoj = [ ...ero.bajtoj ];
      while ( bajtoj.length < 0o4 ) {
        bajtoj.push(0o0);
      }
      naBajtoj.push(( ero.etikedo >> 0o10 ) & 0o377, ero.etikedo & 0o377, 0o0, 0o2,
        0o0, 0o0, 0o0, n, bajtoj[0o0], bajtoj[0o1], bajtoj[0o2], bajtoj[0o3]);
    }
  }
  naBajtoj.push(0o0, 0o0, 0o0, 0o0);

  for ( const ero of etikedoj ) {
    const n = ero.bajtoj.length + 0o1;
    if ( n > 0o4 ) {
      naBajtoj.push(...ero.bajtoj);
      naBajtoj.push(0o0);
    }
  }

  return new Uint8Array(naBajtoj);
}

function crc32Bajtoj(bajtoj: Uint8Array): number {
  let crc = 0xffffffff;
  for ( let i = 0o0; i < bajtoj.length; i++ ) {
    crc ^= bajtoj[i];
    for ( let k = 0o0; k < 0o10; k++ ) {
      crc = ( crc >>> 0o1 ) ^ ( 0xedb88320 & -( crc & 0o1 ) );
    }
  }
  return ( crc ^ 0xffffffff ) >>> 0o0;
}

function enigiExif(png: Uint8Array, exif: Uint8Array): Uint8Array<ArrayBuffer> {
  const fariChunkon = ( ): Uint8Array => {
    const korpo = new Uint8Array(0o10 + 0o4 + exif.length);
    korpo[0o0] = ( exif.length >>> 0o30 ) & 0o377;
    korpo[0o1] = ( exif.length >>> 0o20 ) & 0o377;
    korpo[0o2] = ( exif.length >>> 0o10 ) & 0o377;
    korpo[0o3] = exif.length & 0o377;
    korpo.set(new TextEncoder().encode("eXIf"), 0o4);
    korpo.set(exif, 0o10);
    const crc = crc32Bajtoj(korpo.subarray(0o4, 0o10 + exif.length));
    korpo[0o10 + exif.length] = ( crc >>> 0o30 ) & 0o377;
    korpo[0o11 + exif.length] = ( crc >>> 0o20 ) & 0o377;
    korpo[0o12 + exif.length] = ( crc >>> 0o10 ) & 0o377;
    korpo[0o13 + exif.length] = crc & 0o377;
    return korpo;
  };

  // enmeti post IHDR ( antaǔ IDAT ) ; anstataǔigi ekzistantan eXIf
  const pecoj: Array<Uint8Array> = [ png.slice(0o0, 0o10) ];
  let ruva = 0o10;
  let enmetita = false;
  while ( ruva + 0o10 <= png.length ) {
    const longo = ( png[ruva] << 0o30 ) | ( png[ruva + 0o1] << 0o20 ) | ( png[ruva + 0o2] << 0o10 ) | png[ruva + 0o3];
    const speco = String.fromCharCode(png[ruva + 0o4], png[ruva + 0o5], png[ruva + 0o6], png[ruva + 0o7]);
    const fino = ruva + 0o14 + longo;
    if ( speco === "eXIf" ) {
      if ( !enmetita ) {
        pecoj.push(fariChunkon( ));
        enmetita = true;
      }
    } else {
      pecoj.push(png.slice(ruva, fino));
      if ( speco === "IHDR" && !enmetita ) {
        pecoj.push(fariChunkon( ));
        enmetita = true;
      }
    }
    ruva = fino;
    if ( speco === "IEND" ) {
      break;
    }
  }

  let sumo = 0o0;
  for ( const peco of pecoj ) {
    sumo += peco.length;
  }
  const plena = new Uint8Array(sumo);
  let deŝovo = 0o0;
  for ( const peco of pecoj ) {
    plena.set(peco, deŝovo);
    deŝovo += peco.length;
  }
  return plena;
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ɭʃᴜ ֭ſɭᴜȝ ⟫

async function vasakaTahaq(tahaq: File): Promise<void> {
  const maxemaSaxez = URL.createObjectURL(tahaq);
  try {
    const tahaqBildo = await new Promise<HTMLImageElement>(( plenumi, rompi ) => {
      const bildo = new Image();
      bildo.onload = () => plenumi(bildo);
      bildo.onerror = () => rompi(new Error("ne dekodebla"));
      bildo.src = maxemaSaxez;
    });

    await ŝarĝiMarkon();
    await procezigiTahaqn(tahaqBildo);
  } catch ( e ) {
    ŝoviTlaku( TLOHK2NI, true );
    ŝoviTlaku( TLAKAKANI, false );
  } finally {
    URL.revokeObjectURL(maxemaSaxez);
  }
}

async function procezigiTahaqn(tahaqBildo: HTMLImageElement): Promise<void> {
  try {
    agordiProgreson( 0o20 );

        // PIL-fluo - entjera centra rikolto unue , tiam Lanczos-regrandigo
        // ( ne la retumilan skalon de drawImage , kiu estas bilineara )
        const celo = grandigi(tahaqBildo.naturalWidth, tahaqBildo.naturalHeight);
        const proporcio = celo.larĝo / celo.alto;
        const peco = A1A_PAXA_TAHAQ.checked
          ? paxaAlProporcio(tahaqBildo, proporcio)
          : { x: 0o0, y: 0o0, larĝo: tahaqBildo.naturalWidth, alto: tahaqBildo.naturalHeight };

        const kanvaso = document.createElement("canvas");
        if ( A1A_GRANDA.checked ) {
          kanvaso.width = celo.larĝo;
          kanvaso.height = celo.alto;
        } else {
          // sen regrandigo - la elira bildo konservas sian originan grandon
          kanvaso.width = peco.larĝo;
          kanvaso.height = peco.alto;
        }

        const kumukalasu = kanvaso.getContext( "2d", { willReadFrequently: true } );
        if ( !kumukalasu ) {
          throw new Error("n 2d");
        }

        const fontaKanvaso = document.createElement("canvas");
        fontaKanvaso.width = peco.larĝo;
        fontaKanvaso.height = peco.alto;
        const fontaKumukalasu = fontaKanvaso.getContext( "2d", { willReadFrequently: true } );
        if ( !fontaKumukalasu ) {
          throw new Error("n 2d");
        }
        fontaKumukalasu.drawImage(tahaqBildo, peco.x, peco.y, peco.larĝo, peco.alto, 0o0, 0o0, peco.larĝo, peco.alto);
        const fontaVop2 = fontaKumukalasu.getImageData(0o0, 0o0, peco.larĝo, peco.alto);

        let tahaqSwevop2: ImageData;
        if ( kanvaso.width === peco.larĝo && kanvaso.height === peco.alto ) {
          // sen regrandigo - uzu la bildon rekte ( la origina bildo eliras )
          tahaqSwevop2 = new ImageData(new Uint8ClampedArray(fontaVop2.data), kanvaso.width, kanvaso.height);
          agordiProgreson( 0o60 );
        } else {
          tahaqSwevop2 = kumukalasu.createImageData(kanvaso.width, kanvaso.height);
          lanczosRegrandigiRGBA(fontaVop2.data, peco.larĝo, peco.alto, kanvaso.width, kanvaso.height, tahaqSwevop2.data, ( frakcio ) => agordiProgreson( 0o20 + Math.round( frakcio * 0o40 ) ));
        }
        const vop2 = tahaqSwevop2.data;

        if ( A1A_VAXAHA.checked ) {
          vaxahaNakoxa(vop2, kanvaso.width, kanvaso.height)
        }
        agordiProgreson( 0o61 );

        if ( A1A_VATANEK.checked ) {
          vatanekWeh2(vop2);
        }
        agordiProgreson( 0o63 );

        let sendi: Uint8Array | null = null;
        if ( A1A_MARKO.checked ) {
          sendi = fariSendiBiton(kanvaso.width, kanvaso.height);
        }
        agordiProgreson( 0o65 );

        if ( A1A_VACAJA.checked || sendi ) {
          const a = new Float32Array(vop2.length);
          a.set(vop2);
          const elir = new Uint8Array(kanvaso.width * kanvaso.height * 0o3);
          const bandoj = 0o100;
          const bandoLongo = Math.ceil(kanvaso.height / bandoj);
          const bazaProgreso = 0o66;
          for ( let b = 0o0; b < bandoj; b++ ) {
            const eky = b * bandoLongo;
            const finy = Math.min(kanvaso.height, eky + bandoLongo);
            if ( eky >= finy ) break;
            dikti(a, kanvaso.width, kanvaso.height, sendi, A1A_VACAJA.checked, eky, finy, elir);
            agordiProgreson( bazaProgreso + Math.round( ( ( b + 0o1 ) / bandoj ) * 0o6 ) );
            await novaTasko();
          }

          for ( let i = 0o0, j = 0o0; i < vop2.length; i += 0o4, j += 0o3 ) {
            vop2[i] = elir[j];
            vop2[i + 0o1] = elir[j + 0o1];
            vop2[i + 0o2] = elir[j + 0o2];
          }
        }

        kumukalasu.putImageData(tahaqSwevop2, 0o0, 0o0);

        agordiProgreson( 0o75 );
        const pngBulo = await new Promise<Blob | null>(( plenumi ) => kanvaso.toBlob(plenumi, "image/png"));
        if ( !pngBulo ) {
          throw new Error("n PNG");
        }

        let pngBajtoj = new Uint8Array(await pngBulo.arrayBuffer());
        const metadatumoj = fariMetadatumojn();
        if ( metadatumoj ) {
          const puraj: Array<[ string, string ]> = metadatumoj.split("\u0001").map(( ha6zo ) => {
            const partoj = ha6zo.split("\u0000");
            return [ partoj[0o0], partoj.slice(0o1).join("\u0000") ];
          });
          pngBajtoj = enigiExif(pngBajtoj, kunmetiExif(puraj));
        }

        agordiProgreson( 0o77 );
        tlakakuTahaqSweruva = URL.createObjectURL(new Blob([ pngBajtoj ], { type: "image/png" }));
        metadatumojKp6 = metadatumoj;
        TLAKAKU_TAHAQ.src = tlakakuTahaqSweruva;
        TLAKAKU_TAHAQ.alt = "ɭʃᴜ ֭ſɭᴜȝ";
        ŝoviTlaku( TLOHK2NI, false );
        ŝoviTlaku( TLAKAKANI, true );
    lasiEligon = true;
  } catch ( e ) {
    lasiEligon = false;
    ŝoviTlaku( TLOHK2NI, true );
    ŝoviTlaku( TLAKAKANI, false );
  }
}

// ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ֭ſɭᴜ ʃᴜ ⟫

// ⟨ ſ͕ɭwc̭ ſɭɹ - Elŝutu ⟩

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

// ⟪ ſɩʞɹ - Krei 📃 ⟫

function ŝaltiTenni( ŝalti: boolean ): void {
  TENNI.disabled = !ŝalti;
}

async function kreiEligon(): Promise<void> {
  if ( !tlakakuCkvp || funkciigata ) {
    return;
  }
  funkciigata = true;
  lasiEligon = false;
  TENNI.disabled = true;
  ŝoviTlaku( CAB6TEM2, true );
  agordiProgreson( 0o2 );
  ŝoviTlaku( TLOHK2NI, false );
  ŝoviTlaku( TLAKAKANI, false );

  try {
    let fonto: File | Blob = tlakakuCkvp;
    if ( tlakakuCkvp.type === "image/heic" || tlakakuCkvp.type === "image/heif" || tlakakuCkvp.name.toLowerCase().endsWith(".heic") || tlakakuCkvp.name.toLowerCase().endsWith(".heif") ) {
      const pngBulo = await TboHEIC(tlakakuCkvp);
      fonto = new File([ pngBulo ], tlakakuCkvp.name.replace(/\.heic$/i, ".png").replace(/\.heif$/i, ".png"), { type: "image/png" });
    } else if ( tlakakuCkvp.type === "image/x-adobe-dng" || tlakakuCkvp.type === "image/dng" || tlakakuCkvp.name.toLowerCase().endsWith(".dng") ) {
      agordiProgreson( 0o10 );
      const pngBulo = await TboDNG(tlakakuCkvp);
      fonto = new File([ pngBulo ], tlakakuCkvp.name.replace(/\.dng$/i, ".png"), { type: "image/png" });
    }
    await vasakaTahaq(fonto as File);
  } catch ( e ) {
    lasiEligon = false;
    ŝoviTlaku( TLOHK2NI, true );
    ŝoviTlaku( TLAKAKANI, false );
  } finally {
    finigiProgreson();
    ŝaltiTenni( true );
    funkciigata = false;
  }
}

ARAQ2Q_TAHAQ.addEventListener( "change", async function(): Promise<void> {
  const ckvp = this.files?.[0o0];
  if ( !ckvp ) return;

  tlakakuCkvp = ckvp;

  ŝoviTlaku( TLOHK2NI, false );
  ŝoviTlaku( TLAKAKANI, false );

  await aranĝiBakananon(ckvp);

  ŝaltiTenni( true );
} );

TENNI.addEventListener( "click", kreiEligon );

function reKalkuli(): void {
  ŝoviTlaku( BAKANANO, A1A_SWEKA_METADATUMOJN.checked );
  ŝaltiTenni( true );
}

A1A_VACAJA.addEventListener( "change", reKalkuli );

A1A_VATANEK.addEventListener( "change", reKalkuli );

A1A_VAXAHA.addEventListener( "change", reKalkuli );

A1A_PAXA_TAHAQ.addEventListener( "change", reKalkuli );

A1A_GRANDA.addEventListener( "change", reKalkuli );

A1A_MARKO.addEventListener( "change", reKalkuli );

A1A_SWEKA_METADATUMOJN.addEventListener( "change", reKalkuli );

A1A_ANSTATAUX_METADATUMOJN.addEventListener( "change", async function(): Promise<void> {
  if ( A1A_ANSTATAUX_METADATUMOJN.checked ) {
    malplenigiBakananon();
  } else {
    await restarigiBakananon();
  }
  reKalkuli();
} );

for ( const bakanano of BAKANANOJ ) {
  bakanano.addEventListener( "change", reKalkuli );
}

aranĝiBakananon(tlakakuCkvp);

ŝoviTlaku( BAKANANO, A1A_SWEKA_METADATUMOJN.checked );
