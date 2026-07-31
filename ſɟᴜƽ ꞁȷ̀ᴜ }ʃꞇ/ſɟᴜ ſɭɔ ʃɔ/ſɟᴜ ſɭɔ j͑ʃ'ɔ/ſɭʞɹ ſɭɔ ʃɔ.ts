// ≺⧼ ſɭʞɹ ſɭɔ ʃɔ - Fonologia Generatoro ⧽≻

type Gawe = "aih" | "en";

interface SonoEniro {
  id: string;
  valoro: string;
}

interface Sonogrupo {
  id: string;
  nomo: string;
  sonajIdoj: string[];
}

interface StrukturaParto {
  grupoId: string;
  numeratoro: number;
}

interface Silabostrukturo {
  id: string;
  partoj: StrukturaParto[];
}

interface EvoluaKonservo {
  id: string;
  nomo: string;
  reguloj: string;
  proprajVortoj: string;
  uziGeneritaj: boolean;
}

interface GeneratoraKonservo {
  id: string;
  nomo: string;
  sonoj: SonoEniro[];
  grupoj: Sonogrupo[];
  aktivaGrupoId: string | null;
  malnetajPartoj: StrukturaParto[];
  strukturoj: Silabostrukturo[];
  evoluaKonservoj: EvoluaKonservo[];
  aktivaEvoluaKonservoId: string | null;
}

interface KonservojStato {
  konservoj: GeneratoraKonservo[];
  aktivaKonservoId: string | null;
}

const STOKAJO_ŜLOSILO_V1 = "phonology-generator-state-v1";
const EVOLUA_STOKAJO_ŜLOSILO_V1 = "phonology-evolve-state-v1";
const STOKAJO_ŜLOSILO_V2 = "phonology-generator-saves-v2";

const TEKSTO = {
  aih: {
    READY: "ꞁȷ̀ᴜ ŋᷠᴜͷ̗",
    EMPTY_SOUNDS: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ʃɔ ⟅",
    EMPTY_GROUPS: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ֭ſɭᴜ ɭʃɔ ⟅",
    EMPTY_ASSIGNMENT: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ j͑ʃ'ᴜ ֭ſɭᴜ ɭʃɔ }ʃꞇ ⟅",
    EMPTY_DRAFT: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ֭ſɭᴜ ɭʃɔ ⟅",
    EMPTY_STRUCTURES: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ſɭc̗ᴜ ı],ɔƴ ⟅",
    DUPLICATE_SOUND: "ſɭɜ ſɭ,ɔȝ ʌ ı],ɜ j͑ʃɹȝ ʌ ⺓ ʌ ʃɔ ⟅",
    DUPLICATE_GROUP: "ſɭɜ ſɭ,ɔȝ ʌ ı],ɜ j͑ʃɹȝ ʌ ⺓ ʌ ֭ſɭᴜ ɭʃɔ ⟅",
    ADD_SOUND: "ȏoͩſ̀ȷᴜƽ ʌ ʃɔ",
    ADD_GROUP: "ȏoͩſ̀ȷᴜƽ ʌ ֭ſɭᴜ ɭʃɔ",
    SELECT: "j͑ʃw ſɭʞɹȝ",
    DELETE: "j͑ʃ'ᴜ ᶅſɔ",
    REMOVE: "֭ſɭɹͷ̗",
    EDIT: "j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ",
    RENAME_GROUP: "j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ֭ſɭᴜ ɭʃɔ",
    NUMERATOR: "ſɭɹ ſȷɔ",
    DENOMINATOR: "ɭ(ɜ ŋᷠᴜ }ʃꞇ",
    ALWAYS: "ſɭᴜ ɽ͑ʃ'ᴜ",
    SAVE_STRUCTURE: "j͑ʃ'ɔ ſ̀ȷᴜȝ",
    CLEAR_STRUCTURE: "j͑ʃ'ᴜ ᶅſɔ",
    EDIT_STRUCTURE: "j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ſɭc̗ᴜ ı],ɔƴ",
    NEED_GROUPS: "ɭʃɔ ſ͕ɭᴜƴ ʌ ֭ſɭᴜ ɭʃɔ ⟅",
    NEED_DRAFT: "ɭʃɔ ſ͕ɭᴜƴ ʌ ֭ſɭᴜ ɭʃɔ ⟅",
    NEED_STRUCTURE: "ɭʃɔ ſ͕ɭᴜƴ ʌ ſɭc̗ᴜ ı],ɔƴ ⟅",
    NEED_SOUND_IN_GROUP: "ɭʃɔ ſ͕ɭᴜƴ ʌ ʃɔ ⟅",
    GENERATED: "ſ̀ȷᴜ ſɭᴜƽ",
    STRUCTURE: "ſɭc̗ᴜ ı],ɔƴ",
    PART: "ſɭɔƽ",
  },
  en: {
    READY: "Ready",
    EMPTY_SOUNDS: "No sounds yet",
    EMPTY_GROUPS: "No groups yet",
    EMPTY_ASSIGNMENT: "Add a group and sounds first",
    EMPTY_DRAFT: "Add groups to the structure",
    EMPTY_STRUCTURES: "No structures yet",
    DUPLICATE_SOUND: "Sound already exists",
    DUPLICATE_GROUP: "Group already exists",
    ADD_SOUND: "Added sound",
    ADD_GROUP: "Added group",
    SELECT: "Select",
    DELETE: "Delete",
    REMOVE: "Remove",
    EDIT: "Edit",
    RENAME_GROUP: "Rename group",
    NUMERATOR: "Numerator",
    DENOMINATOR: "Denominator",
    ALWAYS: "Always",
    SAVE_STRUCTURE: "Saved structure",
    CLEAR_STRUCTURE: "Cleared structure",
    EDIT_STRUCTURE: "Edit structure",
    NEED_GROUPS: "Add groups first",
    NEED_DRAFT: "Add groups to the current structure first",
    NEED_STRUCTURE: "Save at least one structure first",
    NEED_SOUND_IN_GROUP: "Each required group needs at least one sound",
    GENERATED: "Generated",
    STRUCTURE: "Structure",
    PART: "Part",
  },
} as const;

const lingvo = akiriLingvon();
const T = TEKSTO[lingvo];

const SONA_ENIGO = akiriElementon<HTMLInputElement>("fonologio-sono-enigo");
const ALDONI_SONON_BUTONO = akiriElementon<HTMLButtonElement>("fonologio-aldoni-sonon");
const SONA_LISTO = akiriElementon<HTMLElement>("fonologio-sona-listo");
const GRUPA_ENIGO = akiriElementon<HTMLInputElement>("fonologio-grupa-enigo");
const ALDONI_GRUPON_BUTONO = akiriElementon<HTMLButtonElement>("fonologio-aldoni-grupon");
const GRUPA_LISTO = akiriElementon<HTMLElement>("fonologio-grupa-listo");
const ASIGNA_LISTO = akiriElementon<HTMLElement>("fonologio-asigna-listo");
const STRUKTURA_GRUPA_LISTO = akiriElementon<HTMLElement>("fonologio-struktura-grupa-listo");
const MALNETA_STRUKTURO = akiriElementon<HTMLElement>("fonologio-malneta-strukturo");
const MALPLENIGI_MALNETON_BUTONO = akiriElementon<HTMLButtonElement>("fonologio-malplenigi-malneton");
const KONSERVI_STRUKTURON_BUTONO = akiriElementon<HTMLButtonElement>("fonologio-konservi-strukturon");
const STRUKTURA_LISTO = akiriElementon<HTMLElement>("fonologio-struktura-listo");
const GENERA_KVANTO = akiriElementon<HTMLInputElement>("fonologio-genera-kvanto");
const GENERA_BUTONO = akiriElementon<HTMLButtonElement>("fonologio-generi");
const STATO = akiriElementon<HTMLParagraphElement>("fonologio-stato");
const ELIRO = akiriElementon<HTMLElement>("fonologio-eliro");

const KONSERVA_LISTO = akiriElementon<HTMLElement>("fonologio-konservoj-listo");
const KONSERVA_NOMO_ENIGO = akiriElementon<HTMLInputElement>("fonologio-konserva-nomo-enigo");
const ALDONI_KONSERVON_BUTONO = akiriElementon<HTMLButtonElement>("fonologio-aldoni-konservon");
const FORIGI_KONSERVON_BUTONO = akiriElementon<HTMLButtonElement>("fonologio-forigi-konservon");

let konservojStato: KonservojStato = { konservoj: [], aktivaKonservoId: null };
let stato: GeneratoraKonservo = ŝargiStaton();

// ⟪ ꞁȷ̀ɜ ʃэ ſɭɹ ⟫

function akiriLingvon(): Gawe {
  const parametroj = new URLSearchParams(window.location.search);
  return parametroj.get("lang") === "en" ? "en" : "aih";
}

function akiriElementon<TElement extends HTMLElement>(id: string): TElement {
  const elemento = document.getElementById(id);
  if ( !elemento ) {
    throw new Error(`Mankas elemento ${id}`);
  }
  return elemento as TElement;
}

function kreiId(): string {
  if ( typeof crypto !== "undefined" && "randomUUID" in crypto ) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(0o10)}-${Math.random().toString(0o10).slice(2)}`;
}

function migriAŭInicialigiStaton(): GeneratoraKonservo {
  let migritaGen: any = null;
  let migritaEvoluo: any = null;

  try {
    const krudaGen = localStorage.getItem(STOKAJO_ŜLOSILO_V1);
    if ( krudaGen ) {
      migritaGen = JSON.parse(krudaGen);
    }
  } catch {}

  try {
    const krudaEvoluo = localStorage.getItem(EVOLUA_STOKAJO_ŜLOSILO_V1);
    if ( krudaEvoluo ) {
      migritaEvoluo = JSON.parse(krudaEvoluo);
    }
  } catch {}

  const defaŭltaEvoluaKonservo: EvoluaKonservo = {
    id: kreiId(),
    nomo: "1",
    reguloj: migritaEvoluo?.rules || "",
    proprajVortoj: migritaEvoluo?.customWords || "",
    uziGeneritaj: typeof migritaEvoluo?.useGenerated === "boolean" ? migritaEvoluo.useGenerated : true,
  };

  const novaKonservo: GeneratoraKonservo = {
    id: kreiId(),
    nomo: "1",
    sonoj: [],
    grupoj: [],
    aktivaGrupoId: null,
    malnetajPartoj: [],
    strukturoj: [],
    evoluaKonservoj: [defaŭltaEvoluaKonservo],
    aktivaEvoluaKonservoId: defaŭltaEvoluaKonservo.id,
  };

  if ( migritaGen ) {
    if ( Array.isArray(migritaGen.sounds) ) {
      novaKonservo.sonoj = migritaGen.sounds;
    }
    if ( Array.isArray(migritaGen.groups) ) {
      novaKonservo.grupoj = migritaGen.groups;
    }
    novaKonservo.aktivaGrupoId = migritaGen.activeGroupId || null;

    if ( Array.isArray(migritaGen.draftParts) ) {
      novaKonservo.malnetajPartoj = migritaGen.draftParts.map((p: any) => ({
        grupoId: p.groupId,
        numeratoro: Math.min(64, Math.max(0, Math.floor(p.numerator || 0))),
      }));
    }

    if ( Array.isArray(migritaGen.structures) ) {
      novaKonservo.strukturoj = migritaGen.structures.map((s: any) => ({
        id: s.id,
        partoj: Array.isArray(s.parts) ? s.parts.map((p: any) => ({
          grupoId: p.groupId,
          numeratoro: Math.min(64, Math.max(0, Math.floor(p.numerator || 0))),
        })) : [],
      }));
    }
  }

  konservojStato = {
    konservoj: [novaKonservo],
    aktivaKonservoId: novaKonservo.id,
  };

  konserviStaton();
  return novaKonservo;
}

function alMalnovaFormato(): string {
  return JSON.stringify({
    saves: konservojStato.konservoj.map(k => ({
      id: k.id,
      name: k.nomo,
      sounds: k.sonoj,
      groups: k.grupoj,
      activeGroupId: k.aktivaGrupoId,
      draftParts: k.malnetajPartoj.map(p => ({ groupId: p.grupoId, numerator: p.numeratoro })),
      structures: k.strukturoj.map(st => ({ id: st.id, parts: st.partoj.map(p => ({ groupId: p.grupoId, numerator: p.numeratoro })) })),
      evolveSaves: k.evoluaKonservoj.map(e => ({ id: e.id, name: e.nomo, rules: e.reguloj, customWords: e.proprajVortoj, useGenerated: e.uziGeneritaj })),
      activeEvolveSaveId: k.aktivaEvoluaKonservoId,
    })),
    activeSaveId: konservojStato.aktivaKonservoId,
  });
}

function mapiKrudaStaton( kruda: any ): KonservojStato {
  const savoj = Array.isArray(kruda.saves) ? kruda.saves : (Array.isArray(kruda.konservoj) ? kruda.konservoj : []);
  return {
    aktivaKonservoId: kruda.activeSaveId ?? kruda.aktivaKonservoId ?? null,
    konservoj: savoj.map((s: any) => ({
      id: s.id,
      nomo: s.nomo ?? s.name,
      sonoj: s.sonoj ?? s.sounds ?? [],
      grupoj: s.grupoj ?? s.groups ?? [],
      aktivaGrupoId: s.aktivaGrupoId ?? s.activeGroupId ?? null,
      malnetajPartoj: (s.malnetajPartoj ?? s.draftParts ?? []).map((p: any) => ({
        grupoId: p.grupoId,
        numeratoro: p.numeratoro ?? p.numerator ?? 0,
      })),
      strukturoj: (s.strukturoj ?? s.structures ?? []).map((st: any) => ({
        id: st.id,
        partoj: (st.partoj ?? st.parts ?? []).map((p: any) => ({
          grupoId: p.grupoId,
          numeratoro: p.numeratoro ?? p.numerator ?? 0,
        })),
      })),
      evoluaKonservoj: (s.evoluaKonservoj ?? s.evolveSaves ?? []).map((e: any) => ({
        id: e.id,
        nomo: e.nomo ?? e.name,
        reguloj: e.reguloj ?? e.rules ?? "",
        proprajVortoj: e.proprajVortoj ?? e.customWords ?? "",
        uziGeneritaj: e.uziGeneritaj ?? e.useGenerated ?? true,
      })),
      aktivaEvoluaKonservoId: s.aktivaEvoluaKonservoId ?? s.activeEvolveSaveId ?? null,
    })),
  };
}

function ŝargiStaton(): GeneratoraKonservo {
  try {
    const konservita = localStorage.getItem(STOKAJO_ŜLOSILO_V2);
    if ( konservita ) {
      const analizita = JSON.parse(konservita);
      if ( analizita && ( Array.isArray(analizita.saves) || Array.isArray(analizita.konservoj) ) ) {
        const mapita = mapiKrudaStaton(analizita);
        if ( mapita.konservoj.length > 0 ) {
          konservojStato = mapita;
          let aktiva = konservojStato.konservoj.find(k => k.id === konservojStato.aktivaKonservoId);
          if ( !aktiva ) {
            aktiva = konservojStato.konservoj[0];
            konservojStato.aktivaKonservoId = aktiva.id;
          }
          return aktiva;
        }
      }
    }
  } catch {}

  return migriAŭInicialigiStaton();
}

function konserviStaton(): void {
  localStorage.setItem(STOKAJO_ŜLOSILO_V2, alMalnovaFormato());
}

function agordiStaton( mesaĝo: string ): void {
  STATO.textContent = mesaĝo;
  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

function restarigiInfanojn( elemento: HTMLElement ): void {
  elemento.replaceChildren();
}

function kreiTekstanElementon( etikednomo: "p" | "span", teksto: string, klasnomo = typeof vacepu === "function" ? "" : "cepufalxez"): HTMLElement {
  const elemento = document.createElement(etikednomo);
  if ( klasnomo ) {
    elemento.className = klasnomo;
  }
  elemento.textContent = teksto;
  return elemento;
}

function kreiButonon( teksto: string, alklako: () => void ): HTMLButtonElement {
  const butono = document.createElement("button");
  butono.type = "button";
  butono.appendChild(kreiTekstanElementon("span", teksto));
  butono.addEventListener("click", alklako);
  return butono;
}

function kreiMalplenanMesaĝon( teksto: string ): HTMLParagraphElement {
  const mesaĝo = document.createElement("p");
  mesaĝo.className = "ksakat2xa";
  mesaĝo.appendChild(kreiTekstanElementon("span", teksto));
  return mesaĝo;
}

function troviGrupon( grupoId: string ): Sonogrupo | undefined {
  return stato.grupoj.find((grupo) => grupo.id === grupoId);
}

function troviSonon( sonoId: string ): SonoEniro | undefined {
  return stato.sonoj.find((sono) => sono.id === sonoId);
}

function normaligiFraktion( parto: StrukturaParto ): StrukturaParto {
  const numeratoro = Math.min(64, Math.max(0, Math.floor(parto.numeratoro || 0)));
  return {
    grupoId: parto.grupoId,
    numeratoro,
  };
}

function priskribiParton( parto: StrukturaParto ): string {
  const grupo = troviGrupon(parto.grupoId);
  const grupoNomo = grupo ? grupo.nomo : "?";
  const normaligitaParto = normaligiFraktion(parto);
  if ( normaligitaParto.numeratoro === 64 ) {
    return `${grupoNomo} ${T.ALWAYS}`;
  }
  return `${grupoNomo} ${normaligitaParto.numeratoro}/64`;
}

function priskribiStrukturon( strukturo: Silabostrukturo ): string {
  return strukturo.partoj.map(priskribiParton).join(" ");
}

// ⟪ j͑ʃᴜ ſᶘɔ ⟫

function aldoniSonon(): void {
  const valoro = SONA_ENIGO.value.trim();
  if ( !valoro ) return;

  const duobla = stato.sonoj.some((sono) => sono.valoro === valoro);
  if ( duobla ) {
    agordiStaton(T.DUPLICATE_SOUND);
    return;
  }

  stato.sonoj.push({
    id: kreiId(),
    valoro,
  });

  SONA_ENIGO.value = "";
  agordiStaton(T.ADD_SOUND);
  konfirmi();
}

function forigiSonon( sonoId: string ): void {
  stato.sonoj = stato.sonoj.filter((sono) => sono.id !== sonoId);
  stato.grupoj = stato.grupoj.map((grupo) => ({
    ...grupo,
    sonajIdoj: grupo.sonajIdoj.filter((asignitaSonoId) => asignitaSonoId !== sonoId),
  }));
  konfirmi();
}

function bildigiSonojn(): void {
  restarigiInfanojn(SONA_LISTO);
  if ( stato.sonoj.length === 0 ) {
    SONA_LISTO.appendChild(kreiMalplenanMesaĝon(T.EMPTY_SOUNDS));
    return;
  }

  for ( const sono of stato.sonoj ) {
    const envolvilo = document.createElement("ciihii");
    envolvilo.appendChild(kreiTekstanElementon("span", sono.valoro));
    envolvilo.appendChild(kreiButonon(T.DELETE, () => forigiSonon(sono.id)));
    SONA_LISTO.appendChild(envolvilo);
  }
}

// ⟪ ſ͕ɭwȝ ⟫

function aldoniGrupon(): void {
  const nomo = GRUPA_ENIGO.value.trim();
  if ( !nomo ) return;

  const duobla = stato.grupoj.some((grupo) => grupo.nomo === nomo);
  if ( duobla ) {
    agordiStaton(T.DUPLICATE_GROUP);
    return;
  }

  const grupo: Sonogrupo = {
    id: kreiId(),
    nomo,
    sonajIdoj: [],
  };

  stato.grupoj.push(grupo);
  stato.aktivaGrupoId = grupo.id;
  GRUPA_ENIGO.value = "";
  agordiStaton(T.ADD_GROUP);
  konfirmi();
}

function forigiGrupon( grupoId: string ): void {
  stato.grupoj = stato.grupoj.filter((grupo) => grupo.id !== grupoId);
  stato.malnetajPartoj = stato.malnetajPartoj.filter((parto) => parto.grupoId !== grupoId);
  stato.strukturoj = stato.strukturoj
    .map((strukturo) => ({
      ...strukturo,
      partoj: strukturo.partoj.filter((parto) => parto.grupoId !== grupoId),
    }))
    .filter((strukturo) => strukturo.partoj.length > 0);

  if ( stato.aktivaGrupoId === grupoId ) {
    stato.aktivaGrupoId = stato.grupoj[0]?.id ?? null;
  }

  konfirmi();
}

function elektiGrupon( grupoId: string ): void {
  stato.aktivaGrupoId = grupoId;
  konfirmi();
}

function redaktiGrupon( grupoId: string, novaNomo: string ): void {
  const tondita = novaNomo.trim();
  if ( !tondita ) return;
  const duobla = stato.grupoj.some(g => g.nomo === tondita && g.id !== grupoId);
  if ( duobla ) {
    agordiStaton(T.DUPLICATE_GROUP);
    return;
  }
  const grupo = troviGrupon(grupoId);
  if ( !grupo ) return;
  grupo.nomo = tondita;
  konfirmi();
}

function baskuliSonanAsignon( sonoId: string, asignita: boolean ): void {
  const grupo = stato.grupoj.find((kandidato) => kandidato.id === stato.aktivaGrupoId);
  if ( !grupo ) return;

  if ( asignita && !grupo.sonajIdoj.includes(sonoId) ) {
    grupo.sonajIdoj.push(sonoId);
  } else if ( !asignita ) {
    grupo.sonajIdoj = grupo.sonajIdoj.filter((asignitaSonoId) => asignitaSonoId !== sonoId);
  }

  konfirmi();
}

function bildigiGrupojn(): void {
  restarigiInfanojn(GRUPA_LISTO);
  if ( stato.grupoj.length === 0 ) {
    GRUPA_LISTO.appendChild(kreiMalplenanMesaĝon(T.EMPTY_GROUPS));
    return;
  }

  for ( const grupo of stato.grupoj ) {
    const envolvilo = document.createElement("ciihii");

    const radiobutono = document.createElement("input");
    radiobutono.type = "radio";
    radiobutono.name = "fonologio-aktiva-grupo";
    radiobutono.checked = grupo.id === stato.aktivaGrupoId;
    radiobutono.addEventListener("change", () => elektiGrupon(grupo.id));

    const nomoSpan = kreiTekstanElementon("span", grupo.nomo);
    nomoSpan.style.cursor = "pointer";
    nomoSpan.title = T.EDIT;
    nomoSpan.addEventListener("click", () => {
      const enigo = document.createElement("input");
      enigo.type = "text";
      enigo.value = grupo.nomo;
      nomoSpan.replaceWith(enigo);
      enigo.focus();
      enigo.select();
      const konfirmiRedakton = () => {
        redaktiGrupon(grupo.id, enigo.value);
      };
      enigo.addEventListener("blur", konfirmiRedakton);
      enigo.addEventListener("keydown", (e) => {
        if ( e.key === "Enter" ) {
          enigo.blur();
        } else if ( e.key === "Escape" ) {
          enigo.value = grupo.nomo;
          enigo.blur();
        }
      });
    });

    envolvilo.appendChild(radiobutono);
    envolvilo.appendChild(nomoSpan);
    envolvilo.appendChild(kreiButonon(T.DELETE, () => forigiGrupon(grupo.id)));
    GRUPA_LISTO.appendChild(envolvilo);
  }
}

function bildigiAsignojn(): void {
  restarigiInfanojn(ASIGNA_LISTO);
  const aktivaGrupo = stato.aktivaGrupoId ? troviGrupon(stato.aktivaGrupoId) : undefined;

  if ( !aktivaGrupo || stato.sonoj.length === 0 ) {
    ASIGNA_LISTO.appendChild(kreiMalplenanMesaĝon(T.EMPTY_ASSIGNMENT));
    return;
  }

  for ( const sono of stato.sonoj ) {
    const etikedo = document.createElement("label");
    const markobutono = document.createElement("input");
    markobutono.type = "checkbox";
    markobutono.checked = aktivaGrupo.sonajIdoj.includes(sono.id);
    markobutono.addEventListener("change", () => baskuliSonanAsignon(sono.id, markobutono.checked));

    etikedo.appendChild(kreiTekstanElementon("span", sono.valoro));
    etikedo.appendChild(markobutono);
    ASIGNA_LISTO.appendChild(etikedo);
  }
}

// ⟪ ſɭɔ ʃɔ ſɭʞɹ ⟫

function aldoniMalnetanParton( grupoId: string ): void {
  stato.malnetajPartoj.push({
    grupoId,
    numeratoro: 64,
  });
  konfirmi();
}

function ĝisdatigiMalnetanParton( indekso: number, valoro: number ): void {
  const parto = stato.malnetajPartoj[indekso];
  if ( !parto ) return;

  const sekvaParto = normaligiFraktion({
    ...parto,
    numeratoro: valoro,
  });

  stato.malnetajPartoj[indekso] = sekvaParto;
  konfirmi();
}

function moviMalnetanPartonSupren( indekso: number ): void {
  if ( indekso <= 0 ) return;
  const portempa = stato.malnetajPartoj[indekso];
  stato.malnetajPartoj[indekso] = stato.malnetajPartoj[indekso - 1];
  stato.malnetajPartoj[indekso - 1] = portempa;
  konfirmi();
}

function moviMalnetanPartonMalsupren( indekso: number ): void {
  if ( indekso >= stato.malnetajPartoj.length - 1 ) return;
  const portempa = stato.malnetajPartoj[indekso];
  stato.malnetajPartoj[indekso] = stato.malnetajPartoj[indekso + 1];
  stato.malnetajPartoj[indekso + 1] = portempa;
  konfirmi();
}

function forigiMalnetanParton( indekso: number ): void {
  stato.malnetajPartoj.splice(indekso, 1);
  konfirmi();
}

function malplenigiMalneton(): void {
  stato.malnetajPartoj = [];
  agordiStaton(T.CLEAR_STRUCTURE);
  konfirmi();
}

function konserviStrukturon(): void {
  if ( stato.malnetajPartoj.length === 0 ) {
    agordiStaton(T.NEED_DRAFT);
    return;
  }

  stato.strukturoj.push({
    id: kreiId(),
    partoj: stato.malnetajPartoj.map(normaligiFraktion),
  });
  stato.malnetajPartoj = [];
  agordiStaton(T.SAVE_STRUCTURE);
  konfirmi();
}

function forigiStrukturon( strukturoId: string ): void {
  stato.strukturoj = stato.strukturoj.filter((strukturo) => strukturo.id !== strukturoId);
  konfirmi();
}

function redaktiStrukturon( strukturoId: string ): void {
  const strukturo = stato.strukturoj.find(s => s.id === strukturoId);
  if ( !strukturo ) return;
  stato.malnetajPartoj = strukturo.partoj.map(p => ({ ...p }));
  stato.strukturoj = stato.strukturoj.filter(s => s.id !== strukturoId);
  agordiStaton(T.EDIT_STRUCTURE);
  konfirmi();
}

function bildigiStrukturgrupoButonojn(): void {
  restarigiInfanojn(STRUKTURA_GRUPA_LISTO);
  if ( stato.grupoj.length === 0 ) {
    STRUKTURA_GRUPA_LISTO.appendChild(kreiMalplenanMesaĝon(T.NEED_GROUPS));
    return;
  }

  for ( const grupo of stato.grupoj ) {
    STRUKTURA_GRUPA_LISTO.appendChild(kreiButonon(grupo.nomo, () => aldoniMalnetanParton(grupo.id)));
  }
}

function bildigiMalnetanStrukturon(): void {
  restarigiInfanojn(MALNETA_STRUKTURO);
  if ( stato.malnetajPartoj.length === 0 ) {
    MALNETA_STRUKTURO.appendChild(kreiMalplenanMesaĝon(T.EMPTY_DRAFT));
    return;
  }

  stato.malnetajPartoj.forEach((parto, indekso) => {
    const normaligitaParto = normaligiFraktion(parto);
    const envolvilo = document.createElement("ciihii");

    const etikedo = kreiTekstanElementon("span", `${T.PART} ${indekso + 1} ${troviGrupon(parto.grupoId)?.nomo ?? "?"}`);

    const numeratoroEnigo = document.createElement("input");
    numeratoroEnigo.type = "number";
    numeratoroEnigo.min = "0";
    numeratoroEnigo.max = "64";
    numeratoroEnigo.step = "1";
    numeratoroEnigo.value = `${normaligitaParto.numeratoro}`;
    numeratoroEnigo.title = T.NUMERATOR;
    numeratoroEnigo.addEventListener("change", () => ĝisdatigiMalnetanParton(indekso, Number(numeratoroEnigo.value)));

    const statikaDenominatoro = kreiTekstanElementon("span", "/64");

    envolvilo.appendChild(etikedo);
    envolvilo.appendChild(numeratoroEnigo);
    envolvilo.appendChild(statikaDenominatoro);

    const komencaButono = kreiButonon("<", () => moviMalnetanPartonSupren(indekso));
    const finaButono = kreiButonon(">", () => moviMalnetanPartonMalsupren(indekso));
    if ( indekso === 0 ) {
      komencaButono.disabled = true;
    }
    if ( indekso === stato.malnetajPartoj.length - 1 ) {
      finaButono.disabled = true;
    }

    envolvilo.appendChild(komencaButono);
    envolvilo.appendChild(finaButono);
    envolvilo.appendChild(kreiButonon(T.REMOVE, () => forigiMalnetanParton(indekso)));
    MALNETA_STRUKTURO.appendChild(envolvilo);
  });
}

function bildigiStrukturojn(): void {
  restarigiInfanojn(STRUKTURA_LISTO);
  if ( stato.strukturoj.length === 0 ) {
    STRUKTURA_LISTO.appendChild(kreiMalplenanMesaĝon(T.EMPTY_STRUCTURES));
    return;
  }

  stato.strukturoj.forEach((strukturo, indekso) => {
    const envolvilo = document.createElement("ciihii");
    envolvilo.appendChild(kreiTekstanElementon("span", `${T.STRUCTURE} ${indekso + 1} ${priskribiStrukturon(strukturo)}`));
    envolvilo.appendChild(kreiButonon(T.EDIT, () => redaktiStrukturon(strukturo.id)));
    envolvilo.appendChild(kreiButonon(T.DELETE, () => forigiStrukturon(strukturo.id)));
    STRUKTURA_LISTO.appendChild(envolvilo);
  });
}

// ⟪ ſɭʞɹȝ ⟫

function elektiHazarde<Tero>( eroj: Tero[] ): Tero | undefined {
  if ( eroj.length === 0 ) return undefined;
  return eroj[Math.floor(Math.random() * eroj.length)];
}

function ĉuInkluziviParton( parto: StrukturaParto ): boolean {
  const normaligitaParto = normaligiFraktion(parto);
  if ( normaligitaParto.numeratoro <= 0 ) return false;
  if ( normaligitaParto.numeratoro >= 64 ) return true;
  return Math.random() < normaligitaParto.numeratoro / 64;
}

function generiSilabon(): string | null {
  const strukturo = elektiHazarde(stato.strukturoj);
  if ( !strukturo ) return null;

  let eliro = "";
  for ( const parto of strukturo.partoj ) {
    if ( !ĉuInkluziviParton(parto) ) continue;

    const grupo = troviGrupon(parto.grupoId);
    if ( !grupo || grupo.sonajIdoj.length === 0 ) {
      return null;
    }

    const sonoId = elektiHazarde(grupo.sonajIdoj);
    const sono = sonoId ? troviSonon(sonoId) : undefined;
    if ( !sono ) return null;
    eliro += sono.valoro;
  }

  return eliro || null;
}

function generiEliron(): void {
  restarigiInfanojn(ELIRO);

  if ( stato.strukturoj.length === 0 ) {
    agordiStaton(T.NEED_STRUCTURE);
    return;
  }

  const kvanto = Math.max(1, Math.min(0o100, Number(GENERA_KVANTO.value) || 0o20));
  const rezultoj: string[] = [];
  let provoj = 0;
  const maksimumajProvoj = kvanto * 0o20;

  while ( rezultoj.length < kvanto && provoj < maksimumajProvoj ) {
    provoj++;
    const silabo = generiSilabon();
    if ( silabo ) {
      rezultoj.push(silabo);
    }
  }

  if ( rezultoj.length === 0 ) {
    agordiStaton(T.NEED_SOUND_IN_GROUP);
    return;
  }

  for ( const rezulto of rezultoj ) {
    const envolvilo = document.createElement("ciihii");
    envolvilo.appendChild(kreiTekstanElementon("span", rezulto));
    ELIRO.appendChild(envolvilo);
  }

  agordiStaton(`${T.GENERATED} ${rezultoj.length}`);
}

// ⟪ j͑ʃᴜꞇ ⟫

function bildigiKonservojn(): void {
   restarigiInfanojn(KONSERVA_LISTO);

   konservojStato.konservoj.forEach((konservo) => {
     const langetaButono = document.createElement("button");
     langetaButono.type = "button";
     const langetaEtikedo = kreiTekstanElementon("span", konservo.nomo);
     langetaButono.appendChild(langetaEtikedo);
     
     if ( konservo.id === konservojStato.aktivaKonservoId ) {
       langetaButono.setAttribute("aria-pressed", "true");
     }
     
     langetaButono.addEventListener("click", () => {
       konservojStato.aktivaKonservoId = konservo.id;
       stato = konservo;
       konfirmi();
     });

     langetaButono.addEventListener("contextmenu", (e) => {
       e.preventDefault();
       const enigo = document.createElement("input");
       enigo.type = "text";
       enigo.value = konservo.nomo;
       langetaEtikedo.replaceWith(enigo);
       enigo.focus();
       enigo.select();
       const fini = () => {
         const novaNomo = enigo.value.trim();
         if ( novaNomo && novaNomo !== konservo.nomo ) {
           konservo.nomo = novaNomo;
           konfirmi();
         } else {
           enigo.replaceWith(langetaEtikedo);
         }
       };
       enigo.addEventListener("blur", fini);
       enigo.addEventListener("keydown", (ke) => {
         if ( ke.key === "Enter" ) {
           enigo.blur();
         } else if ( ke.key === "Escape" ) {
           enigo.value = konservo.nomo;
           enigo.blur();
         }
       });
     });

     KONSERVA_LISTO.appendChild(langetaButono);
   });

  const aktivaKonservo = konservojStato.konservoj.find(k => k.id === konservojStato.aktivaKonservoId);
  if ( aktivaKonservo ) {
    KONSERVA_NOMO_ENIGO.value = aktivaKonservo.nomo;
  }

  if ( konservojStato.konservoj.length <= 1 ) {
    FORIGI_KONSERVON_BUTONO.style.display = "none";
  } else {
    FORIGI_KONSERVON_BUTONO.style.display = "";
  }
}

function aldoniKonservon(): void {
  let maksimumaNumero = 0;
  for ( const k of konservojStato.konservoj ) {
    const valoro = parseInt(k.nomo, 0o10);
    if ( !isNaN(valoro) && valoro > maksimumaNumero ) {
      maksimumaNumero = valoro;
    }
  }
  const sekvaNomo = ( maksimumaNumero + 1 ).toString();

  const defaŭltaEvoluaKonservo: EvoluaKonservo = {
    id: kreiId(),
    nomo: "ɔ",
    reguloj: "",
    proprajVortoj: "",
    uziGeneritaj: true,
  };

  const novaKonservo: GeneratoraKonservo = {
    id: kreiId(),
    nomo: sekvaNomo,
    sonoj: [],
    grupoj: [],
    aktivaGrupoId: null,
    malnetajPartoj: [],
    strukturoj: [],
    evoluaKonservoj: [ defaŭltaEvoluaKonservo ],
    aktivaEvoluaKonservoId: defaŭltaEvoluaKonservo.id,
  };

  konservojStato.konservoj.push(novaKonservo);
  konservojStato.aktivaKonservoId = novaKonservo.id;
  stato = novaKonservo;
  konfirmi();

  KONSERVA_NOMO_ENIGO.focus();
  KONSERVA_NOMO_ENIGO.select();
}

function forigiKonservon(): void {
  if ( konservojStato.konservoj.length <= 1 ) return;

  const indekso = konservojStato.konservoj.findIndex(k => k.id === konservojStato.aktivaKonservoId);
  konservojStato.konservoj = konservojStato.konservoj.filter(k => k.id !== konservojStato.aktivaKonservoId);

  const sekvaAktivaIndekso = Math.min(indekso, konservojStato.konservoj.length - 1);
  const sekvaAktiva = konservojStato.konservoj[sekvaAktivaIndekso];
  konservojStato.aktivaKonservoId = sekvaAktiva.id;
  stato = sekvaAktiva;
  konfirmi();
}

function alinomiKonservon(): void {
  const novaNomo = KONSERVA_NOMO_ENIGO.value.trim();
  if ( !novaNomo ) return;

  const aktivaKonservo = konservojStato.konservoj.find(k => k.id === konservojStato.aktivaKonservoId);
  if ( aktivaKonservo ) {
    aktivaKonservo.nomo = novaNomo;
    konfirmi();
  }
}

function bildigiĈion(): void {
  if ( stato.aktivaGrupoId && !troviGrupon(stato.aktivaGrupoId) ) {
    stato.aktivaGrupoId = stato.grupoj[0]?.id ?? null;
  }

  bildigiKonservojn();
  bildigiSonojn();
  bildigiGrupojn();
  bildigiAsignojn();
  bildigiStrukturgrupoButonojn();
  bildigiMalnetanStrukturon();
  bildigiStrukturojn();

  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

function konfirmi(): void {
  konserviStaton();
  window.dispatchEvent(new CustomEvent("phonology-state-updated"));
  bildigiĈion();
}

window.addEventListener("phonology-state-updated", () => {
  try {
    const konservita = localStorage.getItem(STOKAJO_ŜLOSILO_V2);
    if ( konservita ) {
      const analizita = JSON.parse(konservita);
      if ( analizita && ( Array.isArray(analizita.saves) || Array.isArray(analizita.konservoj) ) ) {
        const mapita = mapiKrudaStaton(analizita);
        if ( mapita.konservoj.length > 0 ) {
          konservojStato = mapita;
          const aktiva = konservojStato.konservoj.find(k => k.id === konservojStato.aktivaKonservoId);
          if ( aktiva ) {
            stato = aktiva;
          }
        }
      }
    }
  } catch {}
  bildigiĈion();
});

function agordiLoktenilojn(): void {
  const lokteniloj = document.querySelectorAll<HTMLInputElement>("[data-oskakefani-placeholder]");
  lokteniloj.forEach((enigo) => {
    const ŝlosilo = enigo.dataset.oskakefaniPlaceholder;
    if ( !ŝlosilo ) return;
    let teksto = ŝlosilo;
    if ( lingvo === "en" ) {
      if ( ŝlosilo.startsWith("ʃɔ ʌ j͑ʃп́ɔ ſɭɔ˞ᴜ ſɭᴜ") ) {
        teksto = "Sound string";
      } else if ( ŝlosilo.startsWith("֭ſɭᴜ ɭʃɔ ʌ j͑ʃп́ɔ ſɭɔ˞ᴜ ſɭᴜ") ) {
        teksto = "Group name";
      } else if ( ŝlosilo.startsWith("ſ̀ȷᴜȝ ʌ j͑ʃп́ɔ ſɭɔ˞ᴜ ſɭᴜ") ) {
        teksto = "Save name";
      }
    }
    enigo.placeholder = teksto;
  });
}

ALDONI_SONON_BUTONO.addEventListener("click", aldoniSonon);
SONA_ENIGO.addEventListener("keydown", (evento) => {
  if ( evento.key === "Enter" ) aldoniSonon();
});

ALDONI_GRUPON_BUTONO.addEventListener("click", aldoniGrupon);
GRUPA_ENIGO.addEventListener("keydown", (evento) => {
  if ( evento.key === "Enter" ) aldoniGrupon();
});

MALPLENIGI_MALNETON_BUTONO.addEventListener("click", malplenigiMalneton);
KONSERVI_STRUKTURON_BUTONO.addEventListener("click", konserviStrukturon);
GENERA_BUTONO.addEventListener("click", generiEliron);

ALDONI_KONSERVON_BUTONO.addEventListener("click", aldoniKonservon);
FORIGI_KONSERVON_BUTONO.addEventListener("click", forigiKonservon);
KONSERVA_NOMO_ENIGO.addEventListener("input", alinomiKonservon);
KONSERVA_NOMO_ENIGO.addEventListener("keydown", (e) => {
  if ( e.key === "Enter" ) {
    KONSERVA_NOMO_ENIGO.blur();
  }
});

agordiLoktenilojn();
bildigiĈion();
agordiStaton(T.READY);

export {};
