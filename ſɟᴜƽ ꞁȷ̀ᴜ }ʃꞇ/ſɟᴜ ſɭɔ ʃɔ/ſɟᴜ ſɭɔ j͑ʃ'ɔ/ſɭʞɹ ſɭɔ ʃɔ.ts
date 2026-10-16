// ≺⧼ ſɭʞɹ ſɭɔ ʃɔ - j͑ʃɔ ʃɔ ſ͔ɭᴜ ᶅſɔ j͑ʃᴜꞇ ʌ ſɟᴜ ſɭʞɹ ⧽≻

type Gawe = "aih" | "en";

interface BeEskek {
  ksaka: string;
  k61e: string;
}

interface BeHate {
  ksaka: string;
  k61eKsaka: string;
  beKsakaCa1ara: string[];
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
  ksaka: string;
  k61eKsaka: string;
  k61e: string;
  saxeKefCa1ara: string;
  quqK61e: boolean;
}

interface PuXema {
  ksaka: string;
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

const XEMA_KSAKA_V2 = "phonology-generator-saves-v2";

const K61e = {
  aih: {
    B6TEM2: "ꞁȷ̀ᴜ ŋᷠᴜͷ̗",
    NE1A_BE: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ʃɔ ⟅",
    NE1A_HATE: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ֭ſɭᴜ ɭʃɔ ⟅",
    NE1A_HAT: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ }ʃꞇ ⟅",
    NE1A_VOP2: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ֭ſɭᴜ ɭʃɔ ⟅",
    NE1A_XEZHTAKA: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ſɭc̗ᴜ ı],ɔƴ ⟅",
    KXESU_BE: "ſɭɜ ſɭ,ɔȝ ʌ ı],ɜ j͑ʃɹȝ ʌ ⺓ ʌ ʃɔ ⟅",
    KXESU_HATE: "ſɭɜ ſɭ,ɔȝ ʌ ı],ɜ j͑ʃɹȝ ʌ ⺓ ʌ ֭ſɭᴜ ɭʃɔ ⟅",
    KF2_BE: "ȏoͩſ̀ȷᴜƽ ʌ ʃɔ",
    KF2_HATE: "ȏoͩſ̀ȷᴜƽ ʌ ֭ſɭᴜ ɭʃɔ",
    SUKF2Q: "j͑ʃw ſɭʞɹȝ",
    NE1A: "j͑ʃ'ᴜ ᶅſɔ",
    NE1A_S2: "֭ſɭɹͷ̗",
    V3AK2: "j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ",
    V3AK2_HATE: "j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ֭ſɭᴜ ɭʃɔ",
    K2FE_SAXE: "ſɭɹ ſȷɔ",
    K2FE_ARAQ: "ɭ(ɜ ŋᷠᴜ }ʃꞇ",
    KARA: "ſɭᴜ ɽ͑ʃ'ᴜ",
    XEMA_XEZHTAKA: "j͑ʃ'ɔ ſ̀ȷᴜȝ",
    XEZHTAKA_NE1A: "j͑ʃ'ᴜ ᶅſɔ",
    V3AK2_XEZHTAKA: "j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ſɭc̗ᴜ ı],ɔƴ",
    TEQAZ_HATE: "ɭʃɔ ſ͕ɭᴜƴ ʌ ֭ſɭᴜ ɭʃɔ ⟅",
    TEQAZ_VOP2: "ɭʃɔ ſ͕ɭᴜƴ ʌ ֭ſɭᴜ ɭʃɔ ⟅",
    TEQAZ_XEZHTAKA: "ɭʃɔ ſ͕ɭᴜƴ ʌ ſɭc̗ᴜ ı],ɔƴ ⟅",
    TEQAZ_BE_HATE: "ɭʃɔ ſ͕ɭᴜƴ ʌ ʃɔ ⟅",
    KF2: "ſ̀ȷᴜ ſɭᴜƽ",
    XEZHTAKA: "ſɭc̗ᴜ ı],ɔƴ",
    S2: "ſɭɔƽ",
  },
  en: {
    B6TEM2: "Ready",
    NE1A_BE: "No sounds yet",
    NE1A_HATE: "No groups yet",
    NE1A_HAT: "Add a group and sounds first",
    NE1A_VOP2: "Add groups to the structure",
    NE1A_XEZHTAKA: "No structures yet",
    KXESU_BE: "Sound already exists",
    KXESU_HATE: "Group already exists",
    KF2_BE: "Added sound",
    KF2_HATE: "Added group",
    SUKF2Q: "Select",
    NE1A: "Delete",
    NE1A_S2: "Remove",
    V3AK2: "Edit",
    V3AK2_HATE: "Rename group",
    K2FE_SAXE: "Numerator",
    K2FE_ARAQ: "Denominator",
    KARA: "Always",
    XEMA_XEZHTAKA: "Saved structure",
    XEZHTAKA_NE1A: "Cleared structure",
    V3AK2_XEZHTAKA: "Edit structure",
    TEQAZ_HATE: "Add groups first",
    TEQAZ_VOP2: "Add groups to the current structure first",
    TEQAZ_XEZHTAKA: "Save at least one structure first",
    TEQAZ_BE_HATE: "Each required group needs at least one sound",
    KF2: "Generated",
    XEZHTAKA: "Structure",
    S2: "Part",
  },
} as const;

const lang = quqLang();
const hatK61e = K61e[lang];

const BE_KEK = quqKek<HTMLInputElement>("be-xema");
const KF2_BE_KEK = quqKek<HTMLButtonElement>("kf2-be-kek");
const BE_CA1ARA = quqKek<HTMLElement>("be-ca1ara");
const HATE_KEK = quqKek<HTMLInputElement>("hate-xema");
const KF2_HATE_KEK = quqKek<HTMLButtonElement>("kf2-hate-kek");
const HATE_CA1ARA = quqKek<HTMLElement>("hate-ca1ara");
const HAT_CA1ARA = quqKek<HTMLElement>("hat-ca1ara");
const XEZHTAKA_HATE_CA1ARA = quqKek<HTMLElement>("xezhtaka-hate-ca1ara");
const VOP2_XEZHTAKA = quqKek<HTMLElement>("vop2-xezhtaka");
const NE1A_VOP2_KEK = quqKek<HTMLButtonElement>("ne1a-vop2-kek");
const XEMA_XEZHTAKA_KEK = quqKek<HTMLButtonElement>("xema-xezhtaka-kek");
const XEZHTAKA_CA1ARA = quqKek<HTMLElement>("xezhtaka-ca1ara");
const KF2_K2FE = quqKek<HTMLInputElement>("kf2-k2fe-xema");
const KF2_KEK = quqKek<HTMLButtonElement>("kf2-kek");
const K61E_KEK = quqKek<HTMLParagraphElement>("k61e-kek");
const SUNTA_KEK = quqKek<HTMLElement>("sunta-kek");

const PUXEMA_CA1ARA = quqKek<HTMLElement>("puxema-ca1ara");
const PUXEMA_KSAKA_KEK = quqKek<HTMLInputElement>("puxema-ksaka-kek");
const KF2_PUXEMA_KEK = quqKek<HTMLButtonElement>("kf2-puxema-kek");
const NE1A_PUXEMA_KEK = quqKek<HTMLButtonElement>("ne1a-puxema-kek");

let hatPuXema: HatPuXema = { puXemaCa1ara: [], kxesuPuXemaKsaka: null };
let puXema: PuXema = b6tem2PuXema();

// ⟪ ꞁȷ̀ɜ ʃэ ſɭɹ ⟫

function quqLang(): Gawe {
  const xema = new URLSearchParams(window.location.search);
  return xema.get("lang") === "en" ? "en" : "aih";
}

function quqKek<TElement extends HTMLElement>(ksaka: string): TElement {
  const kek = document.getElementById(ksaka);
  if ( !kek ) {
    throw new Error(`ꞁȷ̀ᴜ ſɭɹ }ʃᴜ ʌ kek ${ksaka}`);
  }
  return kek as TElement;
}

function kf2Ksaka(): string {
  if ( typeof crypto !== "undefined" && "randomUUID" in crypto ) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(0o10)}-${Math.random().toString(0o10).slice(0o2)}`;
}

function kf2SaxePuXema(): PuXema {
  const saxeS2Xema: S2Xema = {
    ksaka: kf2Ksaka(),
    k61eKsaka: "1",
    k61e: "",
    saxeKefCa1ara: "",
    quqK61e: true,
  };

  const kxesuPuXema: PuXema = {
    ksaka: kf2Ksaka(),
    k61eKsaka: "1",
    beCa1ara: [],
    hateCa1ara: [],
    kxesuHateKsaka: null,
    vop2S2Ca1ara: [],
    xezHtakaCa1ara: [],
    s2XemaCa1ara: [ saxeS2Xema ],
    kxesuS2XemaKsaka: saxeS2Xema.ksaka,
  };

  hatPuXema = {
    puXemaCa1ara: [ kxesuPuXema ],
    kxesuPuXemaKsaka: kxesuPuXema.ksaka,
  };

  xemaHatPuXema();
  return kxesuPuXema;
}

function suntaHatPuXema(): string {
  return JSON.stringify({
    puXemaCa1ara: hatPuXema.puXemaCa1ara.map(k => ({
      ksaka: k.ksaka,
      k61eKsaka: k.ksaka,
      beCa1ara: k.beCa1ara.map(o => ({ ksaka: o.ksaka, k61e: o.k61e })),
      hateCa1ara: k.hateCa1ara.map(o => ({ ksaka: o.ksaka, k61eKsaka: o.k61eKsaka, beKsakaCa1ara: o.beKsakaCa1ara })),
      kxesuHateKsaka: k.kxesuHateKsaka,
      vop2S2Ca1ara: k.vop2S2Ca1ara.map(p => ({ hateKsaka: p.hateKsaka, k2fe: p.k2fe })),
      xezHtakaCa1ara: k.xezHtakaCa1ara.map(st => ({ ksaka: st.ksaka, s2Ca1ara: st.s2Ca1ara.map(p => ({ hateKsaka: p.hateKsaka, k2fe: p.k2fe })) })),
      s2XemaCa1ara: k.s2XemaCa1ara.map(e => ({ ksaka: e.ksaka, k61eKsaka: e.ksaka, k61e: e.k61e, saxeKefCa1ara: e.saxeKefCa1ara, quqK61e: e.quqK61e })),
      kxesuS2XemaKsaka: k.kxesuS2XemaKsaka,
    })),
    kxesuPuXemaKsaka: hatPuXema.kxesuPuXemaKsaka,
  });
}

function quqHatPuXema( ne1anesai: any ): HatPuXema {
  const puXemaCa1ara = Array.isArray(ne1anesai.puXemaCa1ara) ? ne1anesai.puXemaCa1ara : [];
  return {
    kxesuPuXemaKsaka: ne1anesai.kxesuPuXemaKsaka ?? null,
    puXemaCa1ara: puXemaCa1ara.map((s: any) => ({
      ksaka: s.ksaka,
      k61eKsaka: s.k61eKsaka ?? "",
      beCa1ara: (s.beCa1ara ?? []).map((o: any) => ({ksaka: o.ksaka, k61e: o.k61e})),
      hateCa1ara: (s.hateCa1ara ?? []).map((o: any) => ({ksaka: o.ksaka, k61eKsaka: o.k61eKsaka, beKsakaCa1ara: o.beKsakaCa1ara})),
      kxesuHateKsaka: s.kxesuHateKsaka ?? null,
      vop2S2Ca1ara: (s.vop2S2Ca1ara ?? []).map((p: any) => ({
        hateKsaka: p.hateKsaka,
        k2fe: p.k2fe ?? 0o0,
      })),
      xezHtakaCa1ara: (s.xezHtakaCa1ara ?? []).map((st: any) => ({
        ksaka: st.ksaka,
        s2Ca1ara: (st.s2Ca1ara ?? []).map((p: any) => ({
          hateKsaka: p.hateKsaka,
          k2fe: p.k2fe ?? 0o0,
        })),
      })),
      s2XemaCa1ara: (s.s2XemaCa1ara ?? []).map((e: any) => ({
        ksaka: e.ksaka,
        k61eKsaka: e.k61eKsaka ?? "",
        k61e: e.k61e ?? "",
        saxeKefCa1ara: e.saxeKefCa1ara ?? "",
        quqK61e: e.quqK61e ?? true,
      })),
      kxesuS2XemaKsaka: s.kxesuS2XemaKsaka ?? null,
    })),
  };
}

function b6tem2PuXema(): PuXema {
  try {
    const ne1anesaiK61e = localStorage.getItem(XEMA_KSAKA_V2);
    if ( ne1anesaiK61e ) {
      const ne1anesai = JSON.parse(ne1anesaiK61e);
      if ( ne1anesai && Array.isArray(ne1anesai.puXemaCa1ara) ) {
        const saxeHatPuXema = quqHatPuXema(ne1anesai);
        if ( saxeHatPuXema.puXemaCa1ara.length > 0o0 ) {
          hatPuXema = saxeHatPuXema;
          let kxesu = saxeHatPuXema.puXemaCa1ara.find(k => k.ksaka === saxeHatPuXema.kxesuPuXemaKsaka);
          if ( !kxesu ) {
            kxesu = saxeHatPuXema.puXemaCa1ara[0o0];
            hatPuXema.kxesuPuXemaKsaka = kxesu.ksaka;
          }
          return kxesu;
        }
      }
    }
  } catch {}

  return kf2SaxePuXema();
}

function xemaHatPuXema(): void {
  localStorage.setItem(XEMA_KSAKA_V2, suntaHatPuXema());
}

function suntaK61e( k61e: string ): void {
  K61E_KEK.textContent = k61e;
  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

function ne1aS2Ca1ara( kek: HTMLElement ): void {
  kek.replaceChildren();
}

function kf2K61eKek( ksaka: "p" | "span", k61e: string, kubaKsaka = typeof vacepu === "function" ? "" : "cepufalxez"): HTMLElement {
  const kek = document.createElement(ksaka);
  if ( kubaKsaka ) {
    kek.className = kubaKsaka;
  }
  kek.textContent = k61e;
  return kek;
}

function kf2Kek( k61e: string, keve: () => void ): HTMLButtonElement {
  const kek = document.createElement("button");
  kek.type = "button";
  kek.appendChild(kf2K61eKek("span", k61e));
  kek.addEventListener("click", keve);
  return kek;
}

function kf2P2foK61e( k61e: string ): HTMLParagraphElement {
  const k61eKek = document.createElement("p");
  k61eKek.className = "ksakat2xa";
  k61eKek.appendChild(kf2K61eKek("span", k61e));
  return k61eKek;
}

function quqHate( hateKsaka: string ): BeHate | undefined {
  return puXema.hateCa1ara.find((hate) => hate.ksaka === hateKsaka);
}

function quqBe( beKsaka: string ): BeEskek | undefined {
  return puXema.beCa1ara.find((be) => be.ksaka === beKsaka);
}

function quqS2( s2: HtakaS2 ): HtakaS2 {
  const k2fe = Math.min(0o100, Math.max(0o0, Math.floor(s2.k2fe || 0o0)));
  return {
    hateKsaka: s2.hateKsaka,
    k2fe,
  };
}

function k61eS2( s2: HtakaS2 ): string {
  const hate = quqHate(s2.hateKsaka);
  const hateKsaka = hate ? hate.ksaka : "?";
  const kxesuS2 = quqS2(s2);
  if ( kxesuS2.k2fe === 0o100 ) {
    return `${hateKsaka} ${hatK61e.KARA}`;
  }
  return `${hateKsaka} ${kxesuS2.k2fe}/64`;
}

function k61eHtaka( xezHtaka: XezHtaka ): string {
  return xezHtaka.s2Ca1ara.map(k61eS2).join(" ");
}

// ⟪ j͑ʃᴜ ſᶘɔ ⟫

function kf2Be(): void {
  const k61e = BE_KEK.value.trim();
  if ( !k61e ) return;

  const xekox2qKsaka = puXema.beCa1ara.some((be) => be.k61e === k61e);
  if ( xekox2qKsaka ) {
    suntaK61e(hatK61e.KXESU_BE);
    return;
  }

  puXema.beCa1ara.push({
    ksaka: kf2Ksaka(),
    k61e,
  });

  BE_KEK.value = "";
  suntaK61e(hatK61e.KF2_BE);
  xema();
}

function ne1aBe( beKsaka: string ): void {
  puXema.beCa1ara = puXema.beCa1ara.filter((be) => be.ksaka !== beKsaka);
  puXema.hateCa1ara = puXema.hateCa1ara.map((hate) => ({
    ...hate,
    beKsakaCa1ara: hate.beKsakaCa1ara.filter((hatBeKsaka) => hatBeKsaka !== beKsaka),
  }));
  xema();
}

function suntaBeCa1ara(): void {
  ne1aS2Ca1ara(BE_CA1ARA);
  if ( puXema.beCa1ara.length === 0o0 ) {
    BE_CA1ARA.appendChild(kf2P2foK61e(hatK61e.NE1A_BE));
    return;
  }

  for ( const be of puXema.beCa1ara ) {
    const kuba = document.createElement("ciihii");
    kuba.appendChild(kf2K61eKek("span", be.k61e));
    kuba.appendChild(kf2Kek(hatK61e.NE1A, () => ne1aBe(be.ksaka)));
    BE_CA1ARA.appendChild(kuba);
  }
}

// ⟪ ſ͕ɭwȝ ⟫

function kf2Hate(): void {
  const kxesuKsaka = HATE_KEK.value.trim();
  if ( !kxesuKsaka ) return;

  const xekox2qKsaka = puXema.hateCa1ara.some((hate) => hate.ksaka === kxesuKsaka);
  if ( xekox2qKsaka ) {
    suntaK61e(hatK61e.KXESU_HATE);
    return;
  }

  const hate: BeHate = {
    ksaka: kf2Ksaka(),
    k61eKsaka: kxesuKsaka,
    beKsakaCa1ara: [],
  };

  puXema.hateCa1ara.push(hate);
  puXema.kxesuHateKsaka = hate.ksaka;
  HATE_KEK.value = "";
  suntaK61e(hatK61e.KF2_HATE);
  xema();
}

function ne1aHate( hateKsaka: string ): void {
  puXema.hateCa1ara = puXema.hateCa1ara.filter((hate) => hate.ksaka !== hateKsaka);
  puXema.vop2S2Ca1ara = puXema.vop2S2Ca1ara.filter((s2) => s2.hateKsaka !== hateKsaka);
  puXema.xezHtakaCa1ara = puXema.xezHtakaCa1ara
    .map((xezHtaka) => ({
      ...xezHtaka,
      s2Ca1ara: xezHtaka.s2Ca1ara.filter((s2) => s2.hateKsaka !== hateKsaka),
    }))
    .filter((xezHtaka) => xezHtaka.s2Ca1ara.length > 0o0);

  if ( puXema.kxesuHateKsaka === hateKsaka ) {
    puXema.kxesuHateKsaka = puXema.hateCa1ara[0o0]?.ksaka ?? null;
  }

  xema();
}

function xemaHate( hateKsaka: string ): void {
  puXema.kxesuHateKsaka = hateKsaka;
  xema();
}

function v3ak2Hate( hateKsaka: string, kxesuKsaka: string ): void {
  const k61e = kxesuKsaka.trim();
  if ( !k61e ) return;
  const xekox2qKsaka = puXema.hateCa1ara.some(g => g.ksaka === k61e && g.ksaka !== hateKsaka);
  if ( xekox2qKsaka ) {
    suntaK61e(hatK61e.KXESU_HATE);
    return;
  }
  const hate = quqHate(hateKsaka);
  if ( !hate ) return;
  hate.ksaka = k61e;
  xema();
}

function vop2Hate( beKsaka: string, hat: boolean ): void {
  const hate = puXema.hateCa1ara.find((g) => g.ksaka === puXema.kxesuHateKsaka);
  if ( !hate ) return;

  if ( hat && !hate.beKsakaCa1ara.includes(beKsaka) ) {
    hate.beKsakaCa1ara.push(beKsaka);
  } else if ( !hat ) {
    hate.beKsakaCa1ara = hate.beKsakaCa1ara.filter((hatBeKsaka) => hatBeKsaka !== beKsaka);
  }

  xema();
}

function suntaHateCa1ara(): void {
  ne1aS2Ca1ara(HATE_CA1ARA);
  if ( puXema.hateCa1ara.length === 0o0 ) {
    HATE_CA1ARA.appendChild(kf2P2foK61e(hatK61e.NE1A_HATE));
    return;
  }

  for ( const hate of puXema.hateCa1ara ) {
    const kuba = document.createElement("ciihii");

    const kp6Kek = document.createElement("input");
    kp6Kek.type = "radio";
    kp6Kek.name = "kxesu-hate";
    kp6Kek.checked = hate.ksaka === puXema.kxesuHateKsaka;
    kp6Kek.addEventListener("change", () => xemaHate(hate.ksaka));

    const ksakaKek = kf2K61eKek("span", hate.ksaka);
    ksakaKek.style.cursor = "pointer";
    ksakaKek.title = hatK61e.V3AK2;
    ksakaKek.addEventListener("click", () => {
      const kek = document.createElement("input");
      kek.type = "text";
      kek.value = hate.ksaka;
      ksakaKek.replaceWith(kek);
      kek.focus();
      kek.select();
      const xemaKsaka = () => {
        v3ak2Hate(hate.ksaka, kek.value);
      };
      kek.addEventListener("blur", xemaKsaka);
      kek.addEventListener("keydown", (e) => {
        if ( e.key === "Enter" ) {
          kek.blur();
        } else if ( e.key === "Escape" ) {
          kek.value = hate.ksaka;
          kek.blur();
        }
      });
    });

    kuba.appendChild(kp6Kek);
    kuba.appendChild(ksakaKek);
    kuba.appendChild(kf2Kek(hatK61e.NE1A, () => ne1aHate(hate.ksaka)));
    HATE_CA1ARA.appendChild(kuba);
  }
}

function suntaHatCa1ara(): void {
  ne1aS2Ca1ara(HAT_CA1ARA);
  const kxesuHate = puXema.kxesuHateKsaka ? quqHate(puXema.kxesuHateKsaka) : undefined;

  if ( !kxesuHate || puXema.beCa1ara.length === 0o0 ) {
    HAT_CA1ARA.appendChild(kf2P2foK61e(hatK61e.NE1A_HAT));
    return;
  }

  for ( const be of puXema.beCa1ara ) {
    const ksaka = document.createElement("label");
    const kp6Kek = document.createElement("input");
    kp6Kek.type = "checkbox";
    kp6Kek.checked = kxesuHate.beKsakaCa1ara.includes(be.ksaka);
    kp6Kek.addEventListener("change", () => vop2Hate(be.ksaka, kp6Kek.checked));

    ksaka.appendChild(kf2K61eKek("span", be.k61e));
    ksaka.appendChild(kp6Kek);
    HAT_CA1ARA.appendChild(ksaka);
  }
}

// ⟪ ſɭɔ ʃɔ ſɭʞɹ ⟫

function kf2Vop2S2( hateKsaka: string ): void {
  puXema.vop2S2Ca1ara.push({
    hateKsaka,
    k2fe: 0o100,
  });
  xema();
}

function v3ak2Vop2S2( k2fe: number, k61e: number ): void {
  const s2 = puXema.vop2S2Ca1ara[k2fe];
  if ( !s2 ) return;

  const araqS2 = quqS2({
    ...s2,
    k2fe: k61e,
  });

  puXema.vop2S2Ca1ara[k2fe] = araqS2;
  xema();
}

function saxeVop2S2( k2fe: number ): void {
  if ( k2fe <= 0o0 ) return;
  const xemaS2 = puXema.vop2S2Ca1ara[k2fe];
  puXema.vop2S2Ca1ara[k2fe] = puXema.vop2S2Ca1ara[k2fe - 0o1];
  puXema.vop2S2Ca1ara[k2fe - 0o1] = xemaS2;
  xema();
}

function araqVop2S2( k2fe: number ): void {
  if ( k2fe >= puXema.vop2S2Ca1ara.length - 0o1 ) return;
  const xemaS2 = puXema.vop2S2Ca1ara[k2fe];
  puXema.vop2S2Ca1ara[k2fe] = puXema.vop2S2Ca1ara[k2fe + 0o1];
  puXema.vop2S2Ca1ara[k2fe + 0o1] = xemaS2;
  xema();
}

function ne1aVop2S2( k2fe: number ): void {
  puXema.vop2S2Ca1ara.splice(k2fe, 0o1);
  xema();
}

function ne1aVop2(): void {
  puXema.vop2S2Ca1ara = [];
  suntaK61e(hatK61e.XEZHTAKA_NE1A);
  xema();
}

function xemaXezHtaka(): void {
  if ( puXema.vop2S2Ca1ara.length === 0o0 ) {
    suntaK61e(hatK61e.TEQAZ_VOP2);
    return;
  }

  puXema.xezHtakaCa1ara.push({
    ksaka: kf2Ksaka(),
    s2Ca1ara: puXema.vop2S2Ca1ara.map(quqS2),
  });
  puXema.vop2S2Ca1ara = [];
  suntaK61e(hatK61e.XEMA_XEZHTAKA);
  xema();
}

function ne1aXezHtaka( xezHtakaKsaka: string ): void {
  puXema.xezHtakaCa1ara = puXema.xezHtakaCa1ara.filter((xezHtaka) => xezHtaka.ksaka !== xezHtakaKsaka);
  xema();
}

function v3ak2XezHtaka( xezHtakaKsaka: string ): void {
  const xezHtaka = puXema.xezHtakaCa1ara.find(s => s.ksaka === xezHtakaKsaka);
  if ( !xezHtaka ) return;
  puXema.vop2S2Ca1ara = xezHtaka.s2Ca1ara.map(p => ({ ...p }));
  puXema.xezHtakaCa1ara = puXema.xezHtakaCa1ara.filter(s => s.ksaka !== xezHtakaKsaka);
  suntaK61e(hatK61e.V3AK2_XEZHTAKA);
  xema();
}

function suntaHateKekCa1ara(): void {
  ne1aS2Ca1ara(XEZHTAKA_HATE_CA1ARA);
  if ( puXema.hateCa1ara.length === 0o0 ) {
    XEZHTAKA_HATE_CA1ARA.appendChild(kf2P2foK61e(hatK61e.TEQAZ_HATE));
    return;
  }

  for ( const hate of puXema.hateCa1ara ) {
    XEZHTAKA_HATE_CA1ARA.appendChild(kf2Kek(hate.ksaka, () => kf2Vop2S2(hate.ksaka)));
  }
}

function suntaVop2XezHtaka(): void {
  ne1aS2Ca1ara(VOP2_XEZHTAKA);
  if ( puXema.vop2S2Ca1ara.length === 0o0 ) {
    VOP2_XEZHTAKA.appendChild(kf2P2foK61e(hatK61e.NE1A_VOP2));
    return;
  }

  puXema.vop2S2Ca1ara.forEach((s2, k2fe) => {
    const kxesuS2 = quqS2(s2);
    const kuba = document.createElement("ciihii");

    const ksaka = kf2K61eKek("span", `${hatK61e.S2} ${k2fe + 0o1} ${quqHate(s2.hateKsaka)?.ksaka ?? "?"}`);

    const k2feKek = document.createElement("input");
    k2feKek.type = "number";
    k2feKek.min = "0";
    k2feKek.max = "64";
    k2feKek.step = "1";
    k2feKek.value = `${kxesuS2.k2fe}`;
    k2feKek.title = hatK61e.K2FE_SAXE;
    k2feKek.addEventListener("change", () => v3ak2Vop2S2(k2fe, Number(k2feKek.value)));

    const k61e = kf2K61eKek("span", "/64");

    kuba.appendChild(ksaka);
    kuba.appendChild(k2feKek);
    kuba.appendChild(k61e);

    const saxeKek = kf2Kek("<", () => saxeVop2S2(k2fe));
    const araqKek = kf2Kek(">", () => araqVop2S2(k2fe));
    if ( k2fe === 0o0 ) {
      saxeKek.disabled = true;
    }
    if ( k2fe === puXema.vop2S2Ca1ara.length - 0o1 ) {
      araqKek.disabled = true;
    }

    kuba.appendChild(saxeKek);
    kuba.appendChild(araqKek);
    kuba.appendChild(kf2Kek(hatK61e.NE1A_S2, () => ne1aVop2S2(k2fe)));
    VOP2_XEZHTAKA.appendChild(kuba);
  });
}

function suntaXezHtakaCa1ara(): void {
  ne1aS2Ca1ara(XEZHTAKA_CA1ARA);
  if ( puXema.xezHtakaCa1ara.length === 0o0 ) {
    XEZHTAKA_CA1ARA.appendChild(kf2P2foK61e(hatK61e.NE1A_XEZHTAKA));
    return;
  }

  puXema.xezHtakaCa1ara.forEach((xezHtaka, k2fe) => {
    const kuba = document.createElement("ciihii");
    kuba.appendChild(kf2K61eKek("span", `${hatK61e.XEZHTAKA} ${k2fe + 0o1} ${k61eHtaka(xezHtaka)}`));
    kuba.appendChild(kf2Kek(hatK61e.V3AK2, () => v3ak2XezHtaka(xezHtaka.ksaka)));
    kuba.appendChild(kf2Kek(hatK61e.NE1A, () => ne1aXezHtaka(xezHtaka.ksaka)));
    XEZHTAKA_CA1ARA.appendChild(kuba);
  });
}

// ⟪ ſɭʞɹȝ ⟫

function quqHat<S2>( hat: S2[] ): S2 | undefined {
  if ( hat.length === 0o0 ) return undefined;
  return hat[Math.floor(Math.random() * hat.length)];
}

function hatS2( s2: HtakaS2 ): boolean {
  const kxesuS2 = quqS2(s2);
  if ( kxesuS2.k2fe <= 0o0 ) return false;
  if ( kxesuS2.k2fe >= 0o100 ) return true;
  return Math.random() < kxesuS2.k2fe / 0o100;
}

function kf2Xez(): string | null {
  const xezHtaka = quqHat(puXema.xezHtakaCa1ara);
  if ( !xezHtaka ) return null;

  let sunta = "";
  for ( const s2 of xezHtaka.s2Ca1ara ) {
    if ( !hatS2(s2) ) continue;

    const hate = quqHate(s2.hateKsaka);
    if ( !hate || hate.beKsakaCa1ara.length === 0o0 ) {
      return null;
    }

    const beKsaka = quqHat(hate.beKsakaCa1ara);
    const be = beKsaka ? quqBe(beKsaka) : undefined;
    if ( !be ) return null;
    sunta += be.k61e;
  }

  return sunta || null;
}

function kf2Sunta(): void {
  ne1aS2Ca1ara(SUNTA_KEK);

  if ( puXema.xezHtakaCa1ara.length === 0o0 ) {
    suntaK61e(hatK61e.TEQAZ_XEZHTAKA);
    return;
  }

  const k2fe = Math.max(0o1, Math.min(0o100, Number(KF2_K2FE.value) || 0o20));
  const k61eCa1ara: string[] = [];
  let vop2K2fe = 0o0;
  const kemafiVop2K2fe = k2fe * 0o20;

  while ( k61eCa1ara.length < k2fe && vop2K2fe < kemafiVop2K2fe ) {
    vop2K2fe++;
    const xez = kf2Xez();
    if ( xez ) {
      k61eCa1ara.push(xez);
    }
  }

  if ( k61eCa1ara.length === 0o0 ) {
    suntaK61e(hatK61e.TEQAZ_BE_HATE);
    return;
  }

  for ( const k61e of k61eCa1ara ) {
    const kuba = document.createElement("ciihii");
    kuba.appendChild(kf2K61eKek("span", k61e));
    SUNTA_KEK.appendChild(kuba);
  }

  suntaK61e(`${hatK61e.KF2} ${k61eCa1ara.length}`);
}

// ⟪ j͑ʃᴜꞇ ⟫

function suntaPuXemaCa1ara(): void {
   ne1aS2Ca1ara(PUXEMA_CA1ARA);

   hatPuXema.puXemaCa1ara.forEach((k) => {
     const k61eKek = document.createElement("button");
     k61eKek.type = "button";
     const k61eKsaka = kf2K61eKek("span", k.ksaka);
     k61eKek.appendChild(k61eKsaka);
     
     if ( k.ksaka === hatPuXema.kxesuPuXemaKsaka ) {
       k61eKek.setAttribute("aria-pressed", "true");
     }
     
     k61eKek.addEventListener("click", () => {
       hatPuXema.kxesuPuXemaKsaka = k.ksaka;
       puXema = k;
       xema();
     });

     k61eKek.addEventListener("contextmenu", (e) => {
       e.preventDefault();
       const kek = document.createElement("input");
       kek.type = "text";
       kek.value = k.ksaka;
       k61eKsaka.replaceWith(kek);
       kek.focus();
       kek.select();
       const araq = () => {
         const kxesuKsaka = kek.value.trim();
         if ( kxesuKsaka && kxesuKsaka !== k.ksaka ) {
           k.ksaka = kxesuKsaka;
           xema();
         } else {
           kek.replaceWith(k61eKsaka);
         }
       };
       kek.addEventListener("blur", araq);
       kek.addEventListener("keydown", (ke) => {
         if ( ke.key === "Enter" ) {
           kek.blur();
         } else if ( ke.key === "Escape" ) {
           kek.value = k.ksaka;
           kek.blur();
         }
       });
     });

     PUXEMA_CA1ARA.appendChild(k61eKek);
   });

  const kxesuPuXema = hatPuXema.puXemaCa1ara.find(k => k.ksaka === hatPuXema.kxesuPuXemaKsaka);
  if ( kxesuPuXema ) {
    PUXEMA_KSAKA_KEK.value = kxesuPuXema.ksaka;
  }

  if ( hatPuXema.puXemaCa1ara.length <= 0o1 ) {
    NE1A_PUXEMA_KEK.style.display = "none";
  } else {
    NE1A_PUXEMA_KEK.style.display = "";
  }
}

function kf2PuXema(): void {
  let kemafiK2fe = 0o0;
  for ( const k of hatPuXema.puXemaCa1ara ) {
    const k2fe = parseInt(k.ksaka, 0o10);
    if ( !isNaN(k2fe) && k2fe > kemafiK2fe ) {
      kemafiK2fe = k2fe;
    }
  }
  const araqKsaka = ( kemafiK2fe + 0o1 ).toString();

  const saxeS2Xema: S2Xema = {
    ksaka: kf2Ksaka(),
    k61eKsaka: "ɔ",
    k61e: "",
    saxeKefCa1ara: "",
    quqK61e: true,
  };

  const kxesuPuXema: PuXema = {
    ksaka: kf2Ksaka(),
    k61eKsaka: araqKsaka,
    beCa1ara: [],
    hateCa1ara: [],
    kxesuHateKsaka: null,
    vop2S2Ca1ara: [],
    xezHtakaCa1ara: [],
    s2XemaCa1ara: [ saxeS2Xema ],
    kxesuS2XemaKsaka: saxeS2Xema.ksaka,
  };

  hatPuXema.puXemaCa1ara.push(kxesuPuXema);
  hatPuXema.kxesuPuXemaKsaka = kxesuPuXema.ksaka;
  puXema = kxesuPuXema;
  xema();

  PUXEMA_KSAKA_KEK.focus();
  PUXEMA_KSAKA_KEK.select();
}

function ne1aPuXema(): void {
  if ( hatPuXema.puXemaCa1ara.length <= 0o1 ) return;

  const k2fe = hatPuXema.puXemaCa1ara.findIndex(k => k.ksaka === hatPuXema.kxesuPuXemaKsaka);
  hatPuXema.puXemaCa1ara = hatPuXema.puXemaCa1ara.filter(k => k.ksaka !== hatPuXema.kxesuPuXemaKsaka);

  const araqKxesuK2fe = Math.min(k2fe, hatPuXema.puXemaCa1ara.length - 0o1);
  const araqKxesu = hatPuXema.puXemaCa1ara[araqKxesuK2fe];
  hatPuXema.kxesuPuXemaKsaka = araqKxesu.ksaka;
  puXema = araqKxesu;
  xema();
}

function v3ak2PuXema(): void {
  const kxesuKsaka = PUXEMA_KSAKA_KEK.value.trim();
  if ( !kxesuKsaka ) return;

  const kxesuPuXema = hatPuXema.puXemaCa1ara.find(k => k.ksaka === hatPuXema.kxesuPuXemaKsaka);
  if ( kxesuPuXema ) {
    kxesuPuXema.ksaka = kxesuKsaka;
    xema();
  }
}

function suntaSaxeAraq(): void {
  if ( puXema.kxesuHateKsaka && !quqHate(puXema.kxesuHateKsaka) ) {
    puXema.kxesuHateKsaka = puXema.hateCa1ara[0o0]?.ksaka ?? null;
  }

  suntaPuXemaCa1ara();
  suntaBeCa1ara();
  suntaHateCa1ara();
  suntaHatCa1ara();
  suntaHateKekCa1ara();
  suntaVop2XezHtaka();
  suntaXezHtakaCa1ara();

  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

function xema(): void {
  xemaHatPuXema();
  window.dispatchEvent(new CustomEvent("phonology-state-updated"));
  suntaSaxeAraq();
}

window.addEventListener("phonology-state-updated", () => {
  try {
    const ne1anesaiK61e = localStorage.getItem(XEMA_KSAKA_V2);
    if ( ne1anesaiK61e ) {
      const ne1anesai = JSON.parse(ne1anesaiK61e);
      if ( ne1anesai && Array.isArray(ne1anesai.puXemaCa1ara) ) {
        const saxeHatPuXema = quqHatPuXema(ne1anesai);
        if ( saxeHatPuXema.puXemaCa1ara.length > 0o0 ) {
          hatPuXema = saxeHatPuXema;
          const kxesu = saxeHatPuXema.puXemaCa1ara.find(k => k.ksaka === saxeHatPuXema.kxesuPuXemaKsaka);
          if ( kxesu ) {
            puXema = kxesu;
          }
        }
      }
    }
  } catch {}
  suntaSaxeAraq();
});

function xemaKubaXema(): void {
  const kubaXema = document.querySelectorAll<HTMLInputElement>("[data-oskakefani-placeholder]");
  kubaXema.forEach((kek) => {
    const ksaka = kek.dataset.oskakefaniPlaceholder;
    if ( !ksaka ) return;
    let k61e = ksaka;
    if ( lang === "en" ) {
      if ( ksaka.startsWith("ʃɔ ʌ j͑ʃп́ɔ ſɭɔ˞ᴜ ſɭᴜ") ) {
        k61e = "Sound string";
      } else if ( ksaka.startsWith("֭ſɭᴜ ɭʃɔ ʌ j͑ʃп́ɔ ſɭɔ˞ᴜ ſɭᴜ") ) {
        k61e = "Group name";
      } else if ( ksaka.startsWith("ſ̀ȷᴜȝ ʌ j͑ʃп́ɔ ſɭɔ˞ᴜ ſɭᴜ") ) {
        k61e = "Save name";
      }
    }
    kek.placeholder = k61e;
  });
}

KF2_BE_KEK.addEventListener("click", kf2Be);
BE_KEK.addEventListener("keydown", (e) => {
  if ( e.key === "Enter" ) kf2Be();
});

KF2_HATE_KEK.addEventListener("click", kf2Hate);
HATE_KEK.addEventListener("keydown", (e) => {
  if ( e.key === "Enter" ) kf2Hate();
});

NE1A_VOP2_KEK.addEventListener("click", ne1aVop2);
XEMA_XEZHTAKA_KEK.addEventListener("click", xemaXezHtaka);
KF2_KEK.addEventListener("click", kf2Sunta);

KF2_PUXEMA_KEK.addEventListener("click", kf2PuXema);
NE1A_PUXEMA_KEK.addEventListener("click", ne1aPuXema);
PUXEMA_KSAKA_KEK.addEventListener("input", v3ak2PuXema);
PUXEMA_KSAKA_KEK.addEventListener("keydown", (e) => {
  if ( e.key === "Enter" ) {
    PUXEMA_KSAKA_KEK.blur();
  }
});

xemaKubaXema();
suntaSaxeAraq();
suntaK61e(hatK61e.B6TEM2);

export {};
