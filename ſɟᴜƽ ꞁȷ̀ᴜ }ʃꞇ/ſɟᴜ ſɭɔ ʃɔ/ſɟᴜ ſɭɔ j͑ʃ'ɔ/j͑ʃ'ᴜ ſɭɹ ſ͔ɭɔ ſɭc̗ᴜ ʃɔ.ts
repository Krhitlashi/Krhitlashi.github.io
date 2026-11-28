// ≺⧼ j͑ʃ'ᴜ ſɭɹ ſ͔ɭɔ ſɭc̗ᴜ ʃɔ - j͑ʃᴜ j͑ʃᴜc̗ ɭʃᴜ }ʃꞇ ʃɔ j͑ʃᴜꞇ ʌ ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ 📃 ⧽≻

type Gawe = "aih" | "en";

// ⟪ ꞁȷ̀ɜ j͑ʃᴜ 📃 ⟫

interface BeEskek {
  ksaka: string;
  j6fini: string;
}

interface BeHate {
  readonly ksaka: string;
  k61eKsaka: string;
  beKsakaCa1ara: string[];
}

interface BeHatPuXema {
  beCa1ara: BeEskek[];
  hateCa1ara: BeHate[];
}

interface HtakaS2 {
  hateKsaka: string;
  k2fe: number;
}

interface XezHtaka {
  ksaka: string;
  s2Ca1ara: HtakaS2[];
}

interface S2Xema {
  readonly ksaka: string;
  k61eKsaka: string;
  k61e: string;
  saxeKefCa1ara: string;
  quqK61e: boolean;
}

interface PuXema {
  readonly ksaka: string;
  k61eKsaka: string;
  beCa1ara: BeEskek[];
  hateCa1ara: BeHate[];
  kxesuHateKsaka: string | null;
  vop2S2Ca1ara: HtakaS2[];
  xezHtakaCa1ara: XezHtaka[];
  s2XemaCa1ara: S2Xema[];
  kxesuS2XemaKsaka: string | null;
}

interface HatPuXema {
  puXemaCa1ara: PuXema[];
  kxesuPuXemaKsaka: string | null;
}

interface S2PuXema {
  k61e: string;
  saxeKefCa1ara: string;
  quqK61e: boolean;
}

type Xekox2qKek =
  | { hat: "saxe"; j6fini: string }
  | { hat: "kemafi" }
  | { hat: "hate"; hateKsaka: string }
  | { hat: "vop2"; k61eCa1ara: Xekox2qKek[] };

interface Ne1anesaiK61e {
  saxeK61e: Xekox2qKek[];
  araq: Xekox2qKek[];
  araqK61e: Xekox2qKek[];
  k61eAraq: string[];
}

// ⟪ j͑ʃ'ɜ ſןɹ 📃 ⟫

const TU5EKANI = "#";

const K61e = {
  aih: {
    B6TEM2: "ꞁȷ̀ᴜ ŋᷠᴜͷ̗",
    NE1A_K61E: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ſɭᴜc̗ ɭʃᴜ ⟅",
    NE1A_K61E_CA1ARA: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ſɭɔʞ ⟅",
    KF2: "ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ ʌ ſɭɹ ſ͔ɭɔ ⟅",
    TLOHK2NI: "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) j͑ʃɹ ſɭᴜc̗ ɭʃᴜ ʌ j͑ʃᴜƽ",
    S2XEMA_K61E: "ſɭᴜc̗ ɭʃᴜ",
    SAXE_KEF_K61E: "ꞁȷ̀ꞇ j͐ʃᴜƽ ʌ ſɭɔʞ",
  },
  en: {
    B6TEM2: "Ready",
    NE1A_K61E: "No rules entered",
    NE1A_K61E_CA1ARA: "No words to evolve",
    KF2: "Evolved",
    TLOHK2NI: "Rule parse error at line",
    S2XEMA_K61E: "Rules ( One per line )",
    SAXE_KEF_K61E: "Custom words ( One per line )",
  },
} as const;

// ⟪ ꞁȷ̀ɜ ʃэ ſɭɹ 📃 ⟫

function quqGawe(): Gawe {
  const xema = new URLSearchParams(window.location.search);
  return xema.get("gawe") === "en" ? "en" : "aih";
}

function quqKek<Kek extends HTMLElement>(ksaka: string): Kek {
  const kek = document.getElementById(ksaka);
  if ( !kek ) {
    throw new Error(`ꞁȷ̀ᴜ ſɭɹ }ʃᴜ ʌ kek ${ksaka}`);
  }
  return kek as Kek;
}

const gawe = quqGawe();
const hatK61e = K61e[gawe];

// ⟪ ꞁȷ̀ɜ ɽ͑ʃ'ᴜ 📃 ⟫

const K61E_XEMA = quqKek<HTMLTextAreaElement>("s2xema-k61e-xema");
const SAXE_KF2_KEK = quqKek<HTMLInputElement>("s2xema-saxe-kf2-kek");
const SAXE_KEF_KEK = quqKek<HTMLInputElement>("s2xema-saxe-kef-kek");
const SAXE_KEF_XEMA = quqKek<HTMLTextAreaElement>("s2xema-saxe-kef-xema");
const KEVE_KEK = quqKek<HTMLButtonElement>("s2xema-keve-kek");
const K61E_KEK = quqKek<HTMLParagraphElement>("s2xema-k61e-kek");
const SUNTA_KEK = quqKek<HTMLElement>("s2xema-sunta-kek");

const S2XEMA_CA1ARA = quqKek<HTMLElement>("s2xema-ca1ara");
const S2XEMA_KSAKA_KEK = quqKek<HTMLInputElement>("s2xema-ksaka-kek");
const KF2_S2XEMA_KEK = quqKek<HTMLButtonElement>("kf2-s2xema-kek");
const NE1A_S2XEMA_KEK = quqKek<HTMLButtonElement>("ne1a-s2xema-kek");

// ⟪ ꞁȷ̀ɜ ŋᷠᴜ 📃 ⟫

let hatPuXema: HatPuXema = { puXemaCa1ara: [], kxesuPuXemaKsaka: null };

function b6tem2HatPuXema(): void {
  try {
    const ne1anesaiK61e = localStorage.getItem("phonology-generator-saves-v2");
    if ( ne1anesaiK61e ) {
      const ne1anesai = JSON.parse(ne1anesaiK61e);
      if ( ne1anesai && Array.isArray(ne1anesai.puXemaCa1ara) && ne1anesai.puXemaCa1ara.length > 0o0 ) {
        hatPuXema = ne1anesai;
        return;
      }
    }
  } catch {}
  hatPuXema = { puXemaCa1ara: [], kxesuPuXemaKsaka: null };
}

function quqKxesuPuXema(): PuXema | undefined {
  return hatPuXema.puXemaCa1ara.find(puXema => puXema.ksaka === hatPuXema.kxesuPuXemaKsaka);
}

function quqKxesuS2Xema(): S2Xema | undefined {
  const kxesuPuXema = quqKxesuPuXema();
  if ( !kxesuPuXema ) return undefined;
  return kxesuPuXema.s2XemaCa1ara.find(s2Xema => s2Xema.ksaka === kxesuPuXema.kxesuS2XemaKsaka);
}

function b6tem2BeHatPuXema(): BeHatPuXema {
  b6tem2HatPuXema();
  const kxesuPuXema = quqKxesuPuXema();
  if ( kxesuPuXema ) {
    return {
      beCa1ara: kxesuPuXema.beCa1ara || [],
      hateCa1ara: kxesuPuXema.hateCa1ara || [],
    };
  }
  return { beCa1ara: [], hateCa1ara: [] };
}

function b6tem2S2PuXema(): S2PuXema {
  b6tem2HatPuXema();
  const kxesuS2Xema = quqKxesuS2Xema();
  if ( kxesuS2Xema ) {
    return {
      k61e: kxesuS2Xema.k61e || "",
      saxeKefCa1ara: kxesuS2Xema.saxeKefCa1ara || "",
      quqK61e: typeof kxesuS2Xema.quqK61e === "boolean" ? kxesuS2Xema.quqK61e : true,
    };
  }
  return { k61e: "", saxeKefCa1ara: "", quqK61e: true };
}

function xemaS2PuXema( s2PuXema: S2PuXema ): void {
  b6tem2HatPuXema();
  const kxesuPuXema = quqKxesuPuXema();
  if ( kxesuPuXema ) {
    const kxesuS2Xema = kxesuPuXema.s2XemaCa1ara.find(s2Xema => s2Xema.ksaka === kxesuPuXema.kxesuS2XemaKsaka);
    if ( kxesuS2Xema ) {
      kxesuS2Xema.k61e = s2PuXema.k61e;
      kxesuS2Xema.saxeKefCa1ara = s2PuXema.saxeKefCa1ara;
      kxesuS2Xema.quqK61e = s2PuXema.quqK61e;
      localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(hatPuXema));
      window.dispatchEvent(new CustomEvent("phonology-state-updated"));
    }
  }
}

// ⟪ ʃɔ ſɭɹ j͑ʃ'ɔ 📃 ⟫ - ſɭᴜͷ̗ ɭʃɜƽ ʌ ſɭɔʞ ʌ ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ

function s2N2kBe( k61e: string, beK61eCa1ara: string[] ): string[] {
  if ( !k61e ) return [];
  const htakaBeK61eCa1ara = [ ...beK61eCa1ara ].filter(kxesuK61e => kxesuK61e.length > 0o0).sort((saxeBeK61e, araqBeK61e) => araqBeK61e.length - saxeBeK61e.length);
  const s2Ca1ara: string[] = [];
  let n2k = 0o0;

  while ( n2k < k61e.length ) {
    let xekox2q = false;

    for ( const be of htakaBeK61eCa1ara ) {
      if ( k61e.startsWith(be, n2k) ) {
        s2Ca1ara.push(be);
        n2k += be.length;
        xekox2q = true;
        break;
      }
    }

    if ( !xekox2q ) {
      // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃɹ ɭʃᴜɔ˞ 📃 ⟩
      let araqK2fe = n2k + 0o1;
      while ( araqK2fe < k61e.length ) {
        const k2fe = k61e.codePointAt(araqK2fe);
        if ( k2fe === undefined || !xekox2qKp6(k2fe) ) break;
        araqK2fe += k2fe > 0xFFFF ? 0o2 : 0o1;
      }
      s2Ca1ara.push(k61e.slice(n2k, araqK2fe));
      n2k = araqK2fe;
    }
  }

  return s2Ca1ara;
}

function xekox2qKp6( k2fe: number ): boolean {
  return (
    (k2fe >= 0x0300 && k2fe <= 0x036F) ||
    (k2fe >= 0x1AB0 && k2fe <= 0x1AFF) ||
    (k2fe >= 0x1DC0 && k2fe <= 0x1DFF) ||
    (k2fe >= 0x20D0 && k2fe <= 0x20FF) ||
    (k2fe >= 0xFE20 && k2fe <= 0xFE2F)
  );
}

// ⟪ ſɭɹ 📃 ⟫ - j͑ʃп́ɔ ſɭᴜc̗ ɭʃᴜ ʌ ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ

function quqKubaAraq( k61e: string, saxeK2fe: number ): number {
  let kubaK2fe = 0o0;
  for ( let n2k = saxeK2fe; n2k < k61e.length; n2k++ ) {
    if ( k61e[n2k] === "[" ) kubaK2fe++;
    else if ( k61e[n2k] === "]" ) {
      kubaK2fe--;
      if ( kubaK2fe === 0o0 ) return n2k;
    }
  }
  return -0o1;
}

function quqSaxeKp6( k61e: string, kp6: string ): number {
  let kubaK2fe = 0o0;
  for ( let n2k = 0o0; n2k < k61e.length; n2k++ ) {
    if ( k61e[n2k] === "[" ) kubaK2fe++;
    else if ( k61e[n2k] === "]" ) kubaK2fe--;
    else if ( kubaK2fe === 0o0 && k61e[n2k] === kp6 ) return n2k;
  }
  return -0o1;
}

function quqS2Ca1ara( k61e: string, s2Quq: string ): string[] {
  const s2Ca1ara: string[] = [];
  let kxesuK61e = "";
  let kubaK2fe = 0o0;
  let kp6KubaK2fe = 0o0;
  let n2k = 0o0;

  while ( n2k < k61e.length ) {
    const kp6 = k61e[n2k];

    if ( kp6 === "[" ) {
      kubaK2fe++;
      kxesuK61e += kp6;
      n2k++;
    } else if ( kp6 === "]" ) {
      kubaK2fe--;
      kxesuK61e += kp6;
      n2k++;
    } else if ( kp6 === "(" ) {
      kp6KubaK2fe++;
      kxesuK61e += kp6;
      n2k++;
    } else if ( kp6 === ")" ) {
      kp6KubaK2fe--;
      kxesuK61e += kp6;
      n2k++;
    } else if ( kubaK2fe === 0o0 && kp6KubaK2fe === 0o0 && k61e.startsWith(s2Quq, n2k) ) {
      s2Ca1ara.push(kxesuK61e);
      kxesuK61e = "";
      n2k += s2Quq.length;
    } else {
      kxesuK61e += kp6;
      n2k++;
    }
  }

  if ( kxesuK61e !== "" ) s2Ca1ara.push(kxesuK61e);
  return s2Ca1ara;
}

// ⟪ ſɭɹ 📃 ⟫ - ſɭɔƣ̋ ꞁȷ̀ɔ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ ( [ ] ) ʌ ֭ſɭᴜ ʃᴜ

function ne1anesaiKubaK61e( k61e: string ): Xekox2qKek {
  k61e = k61e.trim();

  // ⟨ j͑ʃɹ ɭʃᴜɔ˞ ( › ) 📃 ⟩
  if ( k61e === "›" ) {
    return { hat: "saxe", j6fini: "" };
  }

  // ⟨ j͑ʃᴜƽ 📃 ⟩
  const s2Ca1ara = quqS2Ca1ara(k61e, "｡");

  if ( s2Ca1ara.length > 0o1 ) {
    const k61eCa1ara = s2Ca1ara.map(s2K61e => ne1anesaiKxesuHat(s2K61e.trim()));
    return { hat: "vop2", k61eCa1ara };
  }

  // ⟨ j͑ʃᴜƽ ( [ ] ) 📃 ⟩
  if ( k61e.startsWith("[") && k61e.endsWith("]") ) {
    return ne1anesaiKubaK61e(k61e.slice(0o1, -0o1));
  }

  // ⟨ j͑ʃɹ ɭʃᴜɔ˞ 📃 ⟩
  if ( k61e.length > 0o1 && k61e.endsWith("o") ) {
    const hateKsaka = k61e.slice(0o0, -0o1);
    return { hat: "hate", hateKsaka };
  }

  // ⟨ ʃɔ ʌ ſɭɔʞ 📃 ⟩
  return { hat: "saxe", j6fini: k61e };
}

function ne1anesaiKxesuHat( k61e: string ): Xekox2qKek {
  k61e = k61e.trim();

  if ( k61e === "#" ) {
    return { hat: "kemafi" };
  }

  if ( k61e.startsWith("[") && k61e.endsWith("]") ) {
    return ne1anesaiKubaK61e(k61e.slice(0o1, -0o1));
  }

  return { hat: "saxe", j6fini: k61e };
}

function ne1anesaiHatCa1ara( k61e: string ): Xekox2qKek[] {
  k61e = k61e.trim();
  if ( !k61e ) return [];

  const xekox2qCa1ara: Xekox2qKek[] = [];
  let n2k = 0o0;

  while ( n2k < k61e.length ) {
    // ⟨ ſןw 📃 ⟩
    while ( n2k < k61e.length && k61e[n2k] === " " ) n2k++;
    if ( n2k >= k61e.length ) break;

    if ( k61e[n2k] === "[" ) {
      const araqK2fe = quqKubaAraq(k61e, n2k);
      if ( araqK2fe === -0o1 ) {
        // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ j͑ʃ'ɜ ſןɹ 📃 ⟩
        xekox2qCa1ara.push({ hat: "saxe", j6fini: k61e.slice(n2k) });
        break;
      }
      xekox2qCa1ara.push(ne1anesaiKubaK61e(k61e.slice(n2k + 0o1, araqK2fe)));
      n2k = araqK2fe + 0o1;
    } else if ( k61e[n2k] === "#" ) {
      xekox2qCa1ara.push({ hat: "kemafi" });
      n2k++;
    } else {
      // ⟨ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ſɭɔʞ 📃 ⟩
      let araqK2fe = n2k;
      while ( araqK2fe < k61e.length && k61e[araqK2fe] !== " " && k61e[araqK2fe] !== "[" && k61e[araqK2fe] !== "#" && k61e[araqK2fe] !== "(" && k61e[araqK2fe] !== ")" ) {
        araqK2fe++;
      }
      const kxesuK61e = k61e.slice(n2k, araqK2fe);
      if ( kxesuK61e ) {
        xekox2qCa1ara.push({ hat: "saxe", j6fini: kxesuK61e });
        n2k = araqK2fe;
      } else {
        xekox2qCa1ara.push({ hat: "saxe", j6fini: k61e[n2k] });
        n2k++;
      }
    }
  }

  return xekox2qCa1ara;
}

// ⟪ ſɭɹ 📃 ⟫ - ſɭɔƣ̋ ꞁȷ̀ɔ ſᶘᴜ ɽ͑ʃ'ᴜ ʌ j͑ʃɹ ſɭᴜ̭ɹ ʌ ſɭᴜc̗ ɭʃᴜ

function ne1anesaiAraqK61e( k61e: string, beK61eCa1ara: string[] ): string[] {
  k61e = k61e.trim();

  // ⟨ j͑ʃɹ ɭʃᴜɔ˞ ( [›] ) 📃 ⟩
  if ( k61e === "[›]" ) return [];
  if ( k61e.startsWith("[") && k61e.endsWith("]") ) {
    const kubaK61e = k61e.slice(0o1, -0o1).trim();
    if ( kubaK61e === "›" ) return [];
  }

  // ⟨ ſɭʞɹ ʌ ʃɔ 📃 ⟩
  const k61eCa1ara = k61e.split(/\s+/).filter(kxesuK61e => kxesuK61e.length > 0o0);
  const s2Ca1ara: string[] = [];
  for ( const kxesuK61e of k61eCa1ara ) {
    s2Ca1ara.push(...s2N2kBe(kxesuK61e, beK61eCa1ara));
  }
  return s2Ca1ara;
}

function ne1anesaiK61e( n2k: string, beK61eCa1ara: string[] ): Ne1anesaiK61e | null {
  n2k = n2k.trim();
  if ( !n2k ) return null;

  // ⟨ j͑ʃᴜƽ ( / ) 📃 ⟩
  let saxeAraqCa1ara = quqS2Ca1ara(n2k, " / ");
  let araqSaxeK61e: string;

  if ( saxeAraqCa1ara.length >= 0o2 ) {
    araqSaxeK61e = saxeAraqCa1ara.slice(0o1).join(" / ").trim();
  } else {
    saxeAraqCa1ara = quqS2Ca1ara(n2k, "/");
    if ( saxeAraqCa1ara.length < 0o2 ) return null;
    araqSaxeK61e = saxeAraqCa1ara.slice(0o1).join("/").trim();
  }

  const xekox2qK61e = saxeAraqCa1ara[0o0].trim();
  const k61eAraq = ne1anesaiAraqK61e(araqSaxeK61e, beK61eCa1ara);

  // ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ j͑ʃᴜƽ 📃 ⟩
  const saxeKp6K2fe = quqSaxeKp6(xekox2qK61e, "(");
  const araqKp6K2fe = quqSaxeKp6(xekox2qK61e, ")");

  if ( saxeKp6K2fe !== -0o1 && araqKp6K2fe !== -0o1 && araqKp6K2fe > saxeKp6K2fe ) {
    const saxeK61e = xekox2qK61e.slice(0o0, saxeKp6K2fe).trim();
    const kxesuK61e = xekox2qK61e.slice(saxeKp6K2fe + 0o1, araqKp6K2fe).trim();
    const araqK61e = xekox2qK61e.slice(araqKp6K2fe + 0o1).trim();

    return {
      saxeK61e: ne1anesaiHatCa1ara(saxeK61e),
      araq: ne1anesaiHatCa1ara(kxesuK61e),
      araqK61e: ne1anesaiHatCa1ara(araqK61e),
      k61eAraq,
    };
  }

  // ⟨ j͑ʃᴜƽ ( # ) 📃 ⟩
  const xekox2qCa1ara = ne1anesaiHatCa1ara(xekox2qK61e);

  let saxeK2fe = 0o0;
  while ( saxeK2fe < xekox2qCa1ara.length && xekox2qCa1ara[saxeK2fe].hat === "kemafi" ) saxeK2fe++;

  let araqK2fe = xekox2qCa1ara.length;
  while ( araqK2fe > saxeK2fe && xekox2qCa1ara[araqK2fe - 0o1].hat === "kemafi" ) araqK2fe--;

  return {
    saxeK61e: xekox2qCa1ara.slice(0o0, saxeK2fe),
    araq: xekox2qCa1ara.slice(saxeK2fe, araqK2fe),
    araqK61e: xekox2qCa1ara.slice(araqK2fe),
    k61eAraq,
  };
}

// ⟪ ʃɔ ɭʃw 📃 ⟫ - j͑ʃ'ɔ ſɭᴜc̗ ɭʃɹ ʌ ֭ſɭᴜ ʃᴜ ʌ ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ

function xekox2qHat( hat: Xekox2qKek, s2: string, beHatPuXema: BeHatPuXema ): boolean {
  switch ( hat.hat ) {
    case "saxe":
      return s2 === hat.j6fini;
    case "kemafi":
      return s2 === TU5EKANI;
    case "hate": {
      const hate = beHatPuXema.hateCa1ara.find(kxesuHate => kxesuHate.k61eKsaka === hat.hateKsaka);
      if ( !hate ) return false;
      return hate.beKsakaCa1ara.some(beKsaka => {
        const be = beHatPuXema.beCa1ara.find(kxesuBe => kxesuBe.ksaka === beKsaka);
        return be !== undefined && be.j6fini === s2;
      });
    }
    case "vop2":
      return hat.k61eCa1ara.some(kxesuHat => xekox2qHat(kxesuHat, s2, beHatPuXema));
  }
}

function xekox2qSaxe( xekox2qCa1ara: Xekox2qKek[], s2Ca1ara: string[], saxeK2fe: number, beHatPuXema: BeHatPuXema ): boolean {
  if ( saxeK2fe + xekox2qCa1ara.length > s2Ca1ara.length ) return false;
  for ( let n2k = 0o0; n2k < xekox2qCa1ara.length; n2k++ ) {
    if ( !xekox2qHat(xekox2qCa1ara[n2k], s2Ca1ara[saxeK2fe + n2k], beHatPuXema) ) return false;
  }
  return true;
}

function xekox2qAraq( xekox2qCa1ara: Xekox2qKek[], s2Ca1ara: string[], araqK2fe: number, beHatPuXema: BeHatPuXema ): boolean {
  const saxeK2fe = araqK2fe - xekox2qCa1ara.length + 0o1;
  if ( saxeK2fe < 0o0 ) return false;
  return xekox2qSaxe(xekox2qCa1ara, s2Ca1ara, saxeK2fe, beHatPuXema);
}

// ⟪ j͑ʃ'ᴜ ʃɔ 📃 ⟫ - ſɭɹ ɽ͑ʃ'ɔ ʌ ſɭᴜc̗ ɭʃᴜ ʌ ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ

function kf2AraqS2Ca1ara( ne1anesai: Ne1anesaiK61e, saxeS2Ca1ara: string[], beHatPuXema: BeHatPuXema ): string[] {
  if ( ne1anesai.araq.length === 0o0 ) return saxeS2Ca1ara;

  // ⟨ j͑ʃ'ɔ ɭʃɔ ŋᷠɹ ʌ j͑ʃɹ ɭʃᴜɔ˞ 📃 ⟩
  const saxeAraqS2Ca1ara = [ TU5EKANI, ...saxeS2Ca1ara, TU5EKANI ];
  const s2Ca1ara: string[] = [];
  let n2k = 0o1;
  const kxesuK2fe = saxeAraqS2Ca1ara.length - 0o2;

  while ( n2k <= kxesuK2fe ) {
    let xekox2q = false;

    // ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ʃɔ 📃 ⟩
    if ( n2k + ne1anesai.araq.length - 0o1 <= kxesuK2fe ) {
      if ( xekox2qSaxe(ne1anesai.araq, saxeAraqS2Ca1ara, n2k, beHatPuXema) ) {
        // ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ 📃 ⟩
        const saxeXekox2q = ne1anesai.saxeK61e.length === 0o0 ||
          xekox2qAraq(ne1anesai.saxeK61e, saxeAraqS2Ca1ara, n2k - 0o1, beHatPuXema);

        // ⟨ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ 📃 ⟩
        const araqK2fe = n2k + ne1anesai.araq.length;
        const araqXekox2q = ne1anesai.araqK61e.length === 0o0 ||
          (araqK2fe + ne1anesai.araqK61e.length <= saxeAraqS2Ca1ara.length &&
           xekox2qSaxe(ne1anesai.araqK61e, saxeAraqS2Ca1ara, araqK2fe, beHatPuXema));

        if ( saxeXekox2q && araqXekox2q ) {
          s2Ca1ara.push(...ne1anesai.k61eAraq);
          n2k += ne1anesai.araq.length;
          xekox2q = true;
        }
      }
    }

    if ( !xekox2q ) {
      s2Ca1ara.push(saxeAraqS2Ca1ara[n2k]);
      n2k++;
    }
  }

  return s2Ca1ara;
}

function v3ak2S2Ca1ara( saxeS2Ca1ara: string[], ne1anesaiCa1ara: Ne1anesaiK61e[], beHatPuXema: BeHatPuXema ): string[] {
  let kxesuS2Ca1ara = saxeS2Ca1ara;
  for ( const ne1anesai of ne1anesaiCa1ara ) {
    kxesuS2Ca1ara = kf2AraqS2Ca1ara(ne1anesai, kxesuS2Ca1ara, beHatPuXema);
  }
  return kxesuS2Ca1ara;
}

// ⟪ j͑ʃᴜꞇ 📃 ⟫

function suntaK61e( k61e: string ): void {
  K61E_KEK.textContent = k61e;
  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

function kf2K61eKek( ksaka: "p" | "span", k61e: string, kubaKsaka = typeof vacepu === "function" ? "" : "cepufalxez"): HTMLElement {
  const kek = document.createElement(ksaka);
  if ( kubaKsaka ) kek.className = kubaKsaka;
  kek.textContent = k61e;
  return kek;
}

function quqSuntaK61eCa1ara(): string[] {
  const kuba = document.getElementById("sunta-kek");
  if ( !kuba ) return [];
  const k61eCa1ara: string[] = [];
  kuba.querySelectorAll("ciihii").forEach(kek => {
    const k61e = kek.textContent?.trim();
    if ( k61e ) k61eCa1ara.push(k61e);
  });
  return k61eCa1ara;
}

function suntaSaxeKefXema(): void {
  if ( SAXE_KEF_KEK.checked ) {
    SAXE_KEF_XEMA.classList.remove("kobe");
  } else {
    SAXE_KEF_XEMA.classList.add("kobe");
  }
}

function xemaKxesu(): void {
  xemaS2PuXema({
    k61e: K61E_XEMA.value,
    saxeKefCa1ara: SAXE_KEF_XEMA.value,
    quqK61e: SAXE_KF2_KEK.checked,
  });
}

function keveS2(): void {
  const beHatPuXema = b6tem2BeHatPuXema();
  const saxeK61e = K61E_XEMA.value.trim();

  if ( !saxeK61e ) {
    suntaK61e(hatK61e.NE1A_K61E);
    return;
  }

  // ⟨ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ſɭɔʞ 📃 ⟩
  let k61eCa1ara: string[];
  if ( SAXE_KF2_KEK.checked ) {
    k61eCa1ara = quqSuntaK61eCa1ara();
  } else {
    k61eCa1ara = SAXE_KEF_XEMA.value
      .split("\n")
      .map(saxeKef => saxeKef.trim())
      .filter(saxeKef => saxeKef.length > 0o0);
  }

  if ( k61eCa1ara.length === 0o0 ) {
    suntaK61e(hatK61e.NE1A_K61E_CA1ARA);
    return;
  }

  // ⟨ j͑ʃ'ɔ ſȷᴜͷ̗ ʌ ʃᴜ ſɭɹ ſןɹ }ʃꞇ 📃 ⟩
  const beK61eCa1ara = beHatPuXema.beCa1ara.map(be => be.j6fini);
  const k61eHan2k = saxeK61e.split("\n").map(k61e => k61e.trim()).filter(k61e => k61e.length > 0o0);
  const ne1anesaiCa1ara: Ne1anesaiK61e[] = [];

  for ( let k2fe = 0o0; k2fe < k61eHan2k.length; k2fe++ ) {
    const ne1anesai = ne1anesaiK61e(k61eHan2k[k2fe], beK61eCa1ara);
    if ( !ne1anesai ) {
      suntaK61e(`${hatK61e.TLOHK2NI} ${k2fe + 0o1}`);
      return;
    }
    ne1anesaiCa1ara.push(ne1anesai);
  }

  // ⟨ ſɟɔ ŋᷠɔ ʌ j͑ʃ'ɜ ſןɹ 📃 ⟩
  SUNTA_KEK.replaceChildren();
  let k2fe = 0o0;

  for ( const k61e of k61eCa1ara ) {
    const s2Ca1ara = s2N2kBe(k61e, beK61eCa1ara);
    const araqS2Ca1ara = v3ak2S2Ca1ara(s2Ca1ara, ne1anesaiCa1ara, beHatPuXema);
    const araqK61e = araqS2Ca1ara.join("");

    const kuba = document.createElement("ciihii");
    kuba.appendChild(kf2K61eKek("span", `${k61e} \n🔼\n ${araqK61e}`));
    SUNTA_KEK.appendChild(kuba);
    k2fe++;
  }

  suntaK61e(`${hatK61e.KF2} ${k2fe}`);

  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

// ⟪ ꞁȷ̀ᴜ j͑ʃᴜ 📃 ⟫ - j͑ʃᴜ ı],ɔ }ʃꞇ

function suntaS2PuXema(): void {
  const s2PuXema = b6tem2S2PuXema();
  K61E_XEMA.value = s2PuXema.k61e;
  SAXE_KEF_XEMA.value = s2PuXema.saxeKefCa1ara;

  SAXE_KF2_KEK.checked = s2PuXema.quqK61e;

  suntaSaxeKefXema();
}

function suntaS2XemaCa1ara(): void {
  ne1aS2Ca1ara(S2XEMA_CA1ARA);

  const kxesuPuXema = quqKxesuPuXema();
  if ( !kxesuPuXema ) return;

  kxesuPuXema.s2XemaCa1ara.forEach((s2Xema) => {
    const k61eKek = document.createElement("button");
    k61eKek.type = "button";
    const k61eKsaka = kf2K61eKek("span", s2Xema.k61eKsaka);
    k61eKek.appendChild(k61eKsaka);

    if ( s2Xema.ksaka === kxesuPuXema.kxesuS2XemaKsaka ) {
      k61eKek.setAttribute("aria-pressed", "true");
    }

    k61eKek.addEventListener("click", () => {
      const kxesu = hatPuXema.puXemaCa1ara.find(puXema => puXema.ksaka === hatPuXema.kxesuPuXemaKsaka);
      if ( kxesu ) {
        kxesu.kxesuS2XemaKsaka = s2Xema.ksaka;
      }
      localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(hatPuXema));
      b6tem2HatPuXema();
      suntaS2Sunta();
    });

    k61eKek.addEventListener("contextmenu", (cal) => {
      cal.preventDefault();
      const kek = document.createElement("input");
      kek.type = "text";
      kek.value = s2Xema.k61eKsaka;
      k61eKsaka.replaceWith(kek);
      kek.focus();
      kek.select();
      const araq = () => {
        const kxesuKsaka = kek.value.trim();
        const xekox2qKsaka = kxesuPuXema.s2XemaCa1ara.some(kxesuS2Xema => kxesuS2Xema.k61eKsaka === kxesuKsaka && kxesuS2Xema.ksaka !== s2Xema.ksaka);
        if ( kxesuKsaka && kxesuKsaka !== s2Xema.k61eKsaka && !xekox2qKsaka ) {
          s2Xema.k61eKsaka = kxesuKsaka;
          localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(hatPuXema));
          b6tem2HatPuXema();
          suntaS2Sunta();
        } else {
          kek.replaceWith(k61eKsaka);
        }
      };
      kek.addEventListener("blur", araq);
      kek.addEventListener("keydown", (cal) => {
        if ( cal.key === "Enter" ) {
          kek.blur();
        } else if ( cal.key === "Escape" ) {
          kek.value = s2Xema.k61eKsaka;
          kek.blur();
        }
      });
    });

    S2XEMA_CA1ARA.appendChild(k61eKek);
  });

  const kxesuS2Xema = quqKxesuS2Xema();
  if ( kxesuS2Xema ) {
    S2XEMA_KSAKA_KEK.value = kxesuS2Xema.k61eKsaka;
  }

  if ( kxesuPuXema.s2XemaCa1ara.length <= 0o1 ) {
    NE1A_S2XEMA_KEK.style.display = "none";
  } else {
    NE1A_S2XEMA_KEK.style.display = "";
  }
}

function kf2S2Xema(): void {
  const kxesuPuXema = quqKxesuPuXema();
  if ( !kxesuPuXema ) return;

  let kemafiK2fe = 0o0;
  for ( const s2Xema of kxesuPuXema.s2XemaCa1ara ) {
    const j6fini = parseInt(s2Xema.k61eKsaka, 0o10);
    if ( !isNaN(j6fini) && j6fini > kemafiK2fe ) {
      kemafiK2fe = j6fini;
    }
  }
  const araqKsaka = ( kemafiK2fe + 0o1 ).toString();

  const kxesuS2Xema: S2Xema = {
    ksaka: kf2Ksaka(),
    k61eKsaka: araqKsaka,
    k61e: "",
    saxeKefCa1ara: "",
    quqK61e: true,
  };

  kxesuPuXema.s2XemaCa1ara.push(kxesuS2Xema);
  kxesuPuXema.kxesuS2XemaKsaka = kxesuS2Xema.ksaka;
  
  localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(hatPuXema));
  window.dispatchEvent(new CustomEvent("phonology-state-updated"));

  S2XEMA_KSAKA_KEK.focus();
  S2XEMA_KSAKA_KEK.select();
}

function ne1aS2Xema(): void {
  const kxesuPuXema = quqKxesuPuXema();
  if ( !kxesuPuXema || kxesuPuXema.s2XemaCa1ara.length <= 0o1 ) return;

  const k2fe = kxesuPuXema.s2XemaCa1ara.findIndex(s2Xema => s2Xema.ksaka === kxesuPuXema.kxesuS2XemaKsaka);
  kxesuPuXema.s2XemaCa1ara = kxesuPuXema.s2XemaCa1ara.filter(s2Xema => s2Xema.ksaka !== kxesuPuXema.kxesuS2XemaKsaka);

  const araqKxesuK2fe = Math.min(k2fe, kxesuPuXema.s2XemaCa1ara.length - 0o1);
  const araqKxesu = kxesuPuXema.s2XemaCa1ara[araqKxesuK2fe];
  kxesuPuXema.kxesuS2XemaKsaka = araqKxesu.ksaka;

  localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(hatPuXema));
  window.dispatchEvent(new CustomEvent("phonology-state-updated"));
}

function v3ak2S2Xema(): void {
  const kxesuKsaka = S2XEMA_KSAKA_KEK.value.trim();
  if ( !kxesuKsaka ) return;

  const kxesuPuXema = quqKxesuPuXema();
  const kxesuS2Xema = quqKxesuS2Xema();
  if ( !kxesuPuXema || !kxesuS2Xema ) return;

  const xekox2qKsaka = kxesuPuXema.s2XemaCa1ara.some(s2Xema => s2Xema.k61eKsaka === kxesuKsaka && s2Xema.ksaka !== kxesuS2Xema.ksaka);
  if ( xekox2qKsaka ) return;

  kxesuS2Xema.k61eKsaka = kxesuKsaka;
  localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(hatPuXema));
  window.dispatchEvent(new CustomEvent("phonology-state-updated"));
}

function ne1aS2Ca1ara( kek: HTMLElement ): void {
  kek.replaceChildren();
}

function kf2Ksaka(): string {
  if ( typeof crypto !== "undefined" && "randomUUID" in crypto ) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(0o10)}-${Math.random().toString(0o10).slice(0o2)}`;
}

function suntaS2Sunta(): void {
  suntaS2XemaCa1ara();
  suntaS2PuXema();
}

function saxeS2Sunta(): void {
  b6tem2HatPuXema();
  suntaS2Sunta();

  K61E_XEMA.placeholder = hatK61e.S2XEMA_K61E;
  SAXE_KEF_XEMA.placeholder = hatK61e.SAXE_KEF_K61E;

  KEVE_KEK.addEventListener("click", () => {
    xemaKxesu();
    keveS2();
  });

  SAXE_KF2_KEK.addEventListener("change", () => {
    suntaSaxeKefXema();
    xemaKxesu();
  });

  SAXE_KEF_KEK.addEventListener("change", () => {
    suntaSaxeKefXema();
    xemaKxesu();
  });

  K61E_XEMA.addEventListener("input", xemaKxesu);
  SAXE_KEF_XEMA.addEventListener("input", xemaKxesu);

  KF2_S2XEMA_KEK.addEventListener("click", kf2S2Xema);
  NE1A_S2XEMA_KEK.addEventListener("click", ne1aS2Xema);
  S2XEMA_KSAKA_KEK.addEventListener("input", v3ak2S2Xema);
  S2XEMA_KSAKA_KEK.addEventListener("keydown", (cal) => {
    if ( cal.key === "Enter" ) {
      S2XEMA_KSAKA_KEK.blur();
    }
  });

  suntaK61e(hatK61e.B6TEM2);
}

window.addEventListener("phonology-state-updated", () => {
  b6tem2HatPuXema();
  suntaS2Sunta();
});

saxeS2Sunta();

export {};
