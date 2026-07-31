// ≺⧼ j͑ʃ'ᴜ ſɭɹ ſ͔ɭɔ ſɭc̗ᴜ ʃɔ - SonŜanĝa Aplikilo ⧽≻

type Gawe = "aih" | "en";

// ⟪ ꞁȷ̀ɜ j͑ʃᴜ ⟫

interface SonoEniro {
  id: string;
  valoro: string;
}

interface Sonogrupo {
  id: string;
  nomo: string;
  sonajIdoj: string[];
}

interface FonologiaStato {
  sonoj: SonoEniro[];
  grupoj: Sonogrupo[];
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

interface EvoluaStato {
  reguloj: string;
  proprajVortoj: string;
  uziGeneritaj: boolean;
}

type Kongruilo =
  | { tipo: "laŭvorta"; valoro: string }
  | { tipo: "limo" }
  | { tipo: "grupo"; grupoNomo: string }
  | { tipo: "alternativoj"; opcioj: Kongruilo[] };

interface AnalizitaRegulo {
  antaŭKunteksto: Kongruilo[];
  celo: Kongruilo[];
  postKunteksto: Kongruilo[];
  anstataŭigo: string[];
}

// ⟪ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟫

const GENERATORA_STOKAJO_ŜLOSILO = "phonology-generator-state-v1";
const EVOLUA_STOKAJO_ŜLOSILO = "phonology-evolve-state-v1";
const LIMO = "#";

const TEKSTO = {
  aih: {
    READY: "ꞁȷ̀ᴜ ŋᷠᴜͷ̗",
    NO_RULES: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ſɭᴜc̗ ɭʃᴜ ⟅",
    NO_WORDS: "ꞁȷ̀ɔ ſ͕ɭɹƽ ʌ ſɭɔʞ ⟅",
    EVOLVED: "ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀ᴜꞇ ʌ ſɭɹ ſ͔ɭɔ ⟅",
    PARSE_ERROR: "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ )",
    RULES_PLACEHOLDER: "ſɭᴜc̗ ɭʃᴜ ⟅",
    CUSTOM_PLACEHOLDER: "ꞁȷ̀ꞇ j͐ʃᴜƽ ʌ ſɭɔʞ ⟅",
  },
  en: {
    READY: "Ready",
    NO_RULES: "No rules entered",
    NO_WORDS: "No words to evolve",
    EVOLVED: "Evolved",
    PARSE_ERROR: "Rule parse error at line",
    RULES_PLACEHOLDER: "Rules ( One per line )",
    CUSTOM_PLACEHOLDER: "Custom words ( One per line )",
  },
} as const;

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

const lingvo = akiriLingvon();
const T = TEKSTO[lingvo];

// ⟪ ꞁȷ̀ɜ ɽ͑ʃ'ᴜ ⟫

const REGULOJ_TEKSTAREJO = akiriElementon<HTMLTextAreaElement>("evoluigi-reguloj");
const FONTO_GENERITA = akiriElementon<HTMLInputElement>("evoluigi-fonto-generita");
const FONTO_PROPRA = akiriElementon<HTMLInputElement>("evoluigi-fonto-propra");
const PROPRAJVORTOJ_TEKSTAREJO = akiriElementon<HTMLTextAreaElement>("evoluigi-propraj-vortoj");
const RULI_BUTONO = akiriElementon<HTMLButtonElement>("evoluigi-ruli");
const STATO = akiriElementon<HTMLParagraphElement>("evoluigi-stato");
const ELIRO = akiriElementon<HTMLElement>("evoluigi-eliro");

const EVOLUAJ_KONSERVOJ_LISTO = akiriElementon<HTMLElement>("evoluigi-konservoj-listo");
const EVOLUA_KONSERVA_NOMO_ENIGO = akiriElementon<HTMLInputElement>("evoluigi-konserva-nomo-enigo");
const ALDONI_EVOLUAN_KONSERVON_BUTONO = akiriElementon<HTMLButtonElement>("evoluigi-aldoni-konservon");
const FORIGI_EVOLUAN_KONSERVON_BUTONO = akiriElementon<HTMLButtonElement>("evoluigi-forigi-konservon");

// ⟪ ꞁȷ̀ɜ ŋᷠᴜ ⟫

let konservojStato: KonservojStato = { konservoj: [], aktivaKonservoId: null };

function ŝargiKonservojnStaton(): void {
  try {
    const kruda = localStorage.getItem("phonology-generator-saves-v2");
    if ( kruda ) {
      const analizita = JSON.parse(kruda);
      if ( analizita && Array.isArray(analizita.konservoj) && analizita.konservoj.length > 0 ) {
        konservojStato = analizita;
        return;
      }
    }
  } catch {}
  konservojStato = { konservoj: [], aktivaKonservoId: null };
}

function akiriAktivanGeneratoranKonservon(): GeneratoraKonservo | undefined {
  return konservojStato.konservoj.find(k => k.id === konservojStato.aktivaKonservoId);
}

function akiriAktivanEvoluanKonservon(): EvoluaKonservo | undefined {
  const aktivaGen = akiriAktivanGeneratoranKonservon();
  if ( !aktivaGen ) return undefined;
  return aktivaGen.evoluaKonservoj.find(e => e.id === aktivaGen.aktivaEvoluaKonservoId);
}

function ŝargiFonologianStaton(): FonologiaStato {
  ŝargiKonservojnStaton();
  const aktivaGen = akiriAktivanGeneratoranKonservon();
  if ( aktivaGen ) {
    return {
      sonoj: aktivaGen.sonoj || [],
      grupoj: aktivaGen.grupoj || [],
    };
  }
  return { sonoj: [], grupoj: [] };
}

function ŝargiEvoluanStaton(): EvoluaStato {
  ŝargiKonservojnStaton();
  const aktivaEvoluo = akiriAktivanEvoluanKonservon();
  if ( aktivaEvoluo ) {
    return {
      reguloj: aktivaEvoluo.reguloj || "",
      proprajVortoj: aktivaEvoluo.proprajVortoj || "",
      uziGeneritaj: typeof aktivaEvoluo.uziGeneritaj === "boolean" ? aktivaEvoluo.uziGeneritaj : true,
    };
  }
  return { reguloj: "", proprajVortoj: "", uziGeneritaj: true };
}

function konserviEvoluanStaton(statDatumoj: EvoluaStato): void {
  ŝargiKonservojnStaton();
  const aktivaGen = akiriAktivanGeneratoranKonservon();
  if ( aktivaGen ) {
    const aktivaEvoluo = aktivaGen.evoluaKonservoj.find(e => e.id === aktivaGen.aktivaEvoluaKonservoId);
    if ( aktivaEvoluo ) {
      aktivaEvoluo.reguloj = statDatumoj.reguloj;
      aktivaEvoluo.proprajVortoj = statDatumoj.proprajVortoj;
      aktivaEvoluo.uziGeneritaj = statDatumoj.uziGeneritaj;
      localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(konservojStato));
      window.dispatchEvent(new CustomEvent("phonology-state-updated"));
    }
  }
}

// ⟪ ʃɔ ſɭɹ j͑ʃ'ɔ ⟫ - Ĵetonigilo

function ĵetonigi( vorto: string, konatajSonoj: string[] ): string[] {
  if ( !vorto ) return [];
  const ordigitaj = [...konatajSonoj].filter(s => s.length > 0).sort((a, b) => b.length - a.length);
  const ĵetonoj: string[] = [];
  let i = 0;

  while ( i < vorto.length ) {
    let kongruis = false;

    for ( const sono of ordigitaj ) {
      if ( vorto.startsWith(sono, i) ) {
        ĵetonoj.push(sono);
        i += sono.length;
        kongruis = true;
        break;
      }
    }

    if ( !kongruis ) {
      // Prenu unu bazan signon plus ĉiujn sekvantajn kunigmarkojn
      let fino = i + 1;
      while ( fino < vorto.length ) {
        const kp = vorto.codePointAt(fino);
        if ( kp === undefined || !estasKunigmarko(kp) ) break;
        fino += kp > 0xFFFF ? 2 : 1;
      }
      ĵetonoj.push(vorto.slice(i, fino));
      i = fino;
    }
  }

  return ĵetonoj;
}

function estasKunigmarko( kp: number ): boolean {
  return (
    (kp >= 0x0300 && kp <= 0x036F) ||
    (kp >= 0x1AB0 && kp <= 0x1AFF) ||
    (kp >= 0x1DC0 && kp <= 0x1DFF) ||
    (kp >= 0x20D0 && kp <= 0x20FF) ||
    (kp >= 0xFE20 && kp <= 0xFE2F)
  );
}

// ⟪ ſɭɹ ⟫ - Regulaj Analizaj Utilaĵoj

function troviKongruanKrampon( ĉeno: string, komenco: number ): number {
  let profundo = 0;
  for ( let i = komenco; i < ĉeno.length; i++ ) {
    if ( ĉeno[i] === "[" ) profundo++;
    else if ( ĉeno[i] === "]" ) {
      profundo--;
      if ( profundo === 0 ) return i;
    }
  }
  return -1;
}

function troviSupraNivelanSignon( ĉeno: string, signo: string ): number {
  let krampaProfundo = 0;
  for ( let i = 0; i < ĉeno.length; i++ ) {
    if ( ĉeno[i] === "[" ) krampaProfundo++;
    else if ( ĉeno[i] === "]" ) krampaProfundo--;
    else if ( krampaProfundo === 0 && ĉeno[i] === signo ) return i;
  }
  return -1;
}

function disigiSupraNivela( ĉeno: string, disigilo: string ): string[] {
  const partoj: string[] = [];
  let nuna = "";
  let krampaProfundo = 0;
  let parentezaProfundo = 0;
  let i = 0;

  while ( i < ĉeno.length ) {
    const signo = ĉeno[i];

    if ( signo === "[" ) {
      krampaProfundo++;
      nuna += signo;
      i++;
    } else if ( signo === "]" ) {
      krampaProfundo--;
      nuna += signo;
      i++;
    } else if ( signo === "(" ) {
      parentezaProfundo++;
      nuna += signo;
      i++;
    } else if ( signo === ")" ) {
      parentezaProfundo--;
      nuna += signo;
      i++;
    } else if ( krampaProfundo === 0 && parentezaProfundo === 0 && ĉeno.startsWith(disigilo, i) ) {
      partoj.push(nuna);
      nuna = "";
      i += disigilo.length;
    } else {
      nuna += signo;
      i++;
    }
  }

  if ( nuna !== "" ) partoj.push(nuna);
  return partoj;
}

// ⟪ ſɭɹ ⟫ - Krampa & Ŝablona Analizo

function analiziKrampanEnhavon( enhavo: string ): Kongruilo {
  enhavo = enhavo.trim();

  // Foriga markilo - en kongruila kunteksto redonas laŭvortan malplenan kongruon
  if ( enhavo === "›" ) {
    return { tipo: "laŭvorta", valoro: "" };
  }

  // Disigu per supra-nivela ｡ (U+FF61) por alternativoj
  const partoj = disigiSupraNivela(enhavo, "｡");

  if ( partoj.length > 1 ) {
    const opcioj = partoj.map(parto => analiziUnuopKongruilon(parto.trim()));
    return { tipo: "alternativoj", opcioj };
  }

  // Nestita krampesprimo
  if ( enhavo.startsWith("[") && enhavo.endsWith("]") ) {
    return analiziKrampanEnhavon(enhavo.slice(1, -1));
  }

  // Grupo-referenco: finiĝas per 'o' kaj havas pli ol unu signon
  if ( enhavo.length > 1 && enhavo.endsWith("o") ) {
    const grupoNomo = enhavo.slice(0, -1);
    return { tipo: "grupo", grupoNomo };
  }

  // Laŭvorta sono
  return { tipo: "laŭvorta", valoro: enhavo };
}

function analiziUnuopKongruilon( teksto: string ): Kongruilo {
  teksto = teksto.trim();

  if ( teksto === "#" ) {
    return { tipo: "limo" };
  }

  if ( teksto.startsWith("[") && teksto.endsWith("]") ) {
    return analiziKrampanEnhavon(teksto.slice(1, -1));
  }

  return { tipo: "laŭvorta", valoro: teksto };
}

function analiziŜablonerojn( teksto: string ): Kongruilo[] {
  teksto = teksto.trim();
  if ( !teksto ) return [];

  const kongruiloj: Kongruilo[] = [];
  let i = 0;

  while ( i < teksto.length ) {
    // Preterlasu spacojn
    while ( i < teksto.length && teksto[i] === " " ) i++;
    if ( i >= teksto.length ) break;

    if ( teksto[i] === "[" ) {
      const fino = troviKongruanKrampon(teksto, i);
      if ( fino === -1 ) {
        // Nekongrua krampo - prenu la reston kiel laŭvortan
        kongruiloj.push({ tipo: "laŭvorta", valoro: teksto.slice(i) });
        break;
      }
      kongruiloj.push(analiziKrampanEnhavon(teksto.slice(i + 1, fino)));
      i = fino + 1;
    } else if ( teksto[i] === "#" ) {
      kongruiloj.push({ tipo: "limo" });
      i++;
    } else {
      // Legu laŭvortan ĝis spaceto aŭ speciala signo
      let fino = i;
      while ( fino < teksto.length && teksto[fino] !== " " && teksto[fino] !== "[" && teksto[fino] !== "#" && teksto[fino] !== "(" && teksto[fino] !== ")" ) {
        fino++;
      }
      const laŭvorto = teksto.slice(i, fino);
      if ( laŭvorto ) kongruiloj.push({ tipo: "laŭvorta", valoro: laŭvorto });
      i = fino;
    }
  }

  return kongruiloj;
}

// ⟪ ſɭɹ ⟫ - Anstataŭigo & Regula Analizo

function analiziAnstataŭigon( teksto: string, konatajSonoj: string[] ): string[] {
  teksto = teksto.trim();

  // Forigaj markiloj
  if ( teksto === "[›]" ) return [];
  if ( teksto.startsWith("[") && teksto.endsWith("]") ) {
    const interno = teksto.slice(1, -1).trim();
    if ( interno === "›" ) return [];
  }

  // Ĵetonigu ĉiun spaceton-disigitan segmenton uzante konatajn sonojn
  const segmentoj = teksto.split(/\s+/).filter(s => s.length > 0);
  const rezulto: string[] = [];
  for ( const segmento of segmentoj ) {
    rezulto.push(...ĵetonigi(segmento, konatajSonoj));
  }
  return rezulto;
}

function analiziRegulon( linio: string, konatajSonoj: string[] ): AnalizitaRegulo | null {
  linio = linio.trim();
  if ( !linio ) return null;

  // Disigu per ' / ' (spacita oblikvo), defaŭlte al '/'
  let flankoj = disigiSupraNivela(linio, " / ");
  let dekstraFlanko: string;

  if ( flankoj.length >= 2 ) {
    dekstraFlanko = flankoj.slice(1).join(" / ").trim();
  } else {
    flankoj = disigiSupraNivela(linio, "/");
    if ( flankoj.length < 2 ) return null;
    dekstraFlanko = flankoj.slice(1).join("/").trim();
  }

  const maldekstraFlanko = flankoj[0].trim();
  const anstataŭigo = analiziAnstataŭigon(dekstraFlanko, konatajSonoj);

  // Kontrolu eksplicitan celon per ( )
  const malfermaParentezo = troviSupraNivelanSignon(maldekstraFlanko, "(");
  const fermaParentezo = troviSupraNivelanSignon(maldekstraFlanko, ")");

  if ( malfermaParentezo !== -1 && fermaParentezo !== -1 && fermaParentezo > malfermaParentezo ) {
    const antaŭTeksto = maldekstraFlanko.slice(0, malfermaParentezo).trim();
    const celoTeksto = maldekstraFlanko.slice(malfermaParentezo + 1, fermaParentezo).trim();
    const postTeksto = maldekstraFlanko.slice(fermaParentezo + 1).trim();

    return {
      antaŭKunteksto: analiziŜablonerojn(antaŭTeksto),
      celo: analiziŜablonerojn(celoTeksto),
      postKunteksto: analiziŜablonerojn(postTeksto),
      anstataŭigo,
    };
  }

  // Sen parentezoj: komenca # iĝas antaŭ-kunteksto, fina # iĝas post-kunteksto
  const ĉiuj = analiziŜablonerojn(maldekstraFlanko);

  let antaŭFino = 0;
  while ( antaŭFino < ĉiuj.length && ĉiuj[antaŭFino].tipo === "limo" ) antaŭFino++;

  let postKomenco = ĉiuj.length;
  while ( postKomenco > antaŭFino && ĉiuj[postKomenco - 1].tipo === "limo" ) postKomenco--;

  return {
    antaŭKunteksto: ĉiuj.slice(0, antaŭFino),
    celo: ĉiuj.slice(antaŭFino, postKomenco),
    postKunteksto: ĉiuj.slice(postKomenco),
    anstataŭigo,
  };
}

// ⟪ ʃɔ ɭʃw ⟫ - Kongrua Motorilo

function kongruasKongruilo( kongruilo: Kongruilo, ĵetono: string, fonologiaStato: FonologiaStato ): boolean {
  switch ( kongruilo.tipo ) {
    case "laŭvorta":
      return ĵetono === kongruilo.valoro;
    case "limo":
      return ĵetono === LIMO;
    case "grupo": {
      const grupo = fonologiaStato.grupoj.find(g => g.nomo === kongruilo.grupoNomo);
      if ( !grupo ) return false;
      return grupo.sonajIdoj.some(sid => {
        const sono = fonologiaStato.sonoj.find(s => s.id === sid);
        return sono !== undefined && sono.valoro === ĵetono;
      });
    }
    case "alternativoj":
      return kongruilo.opcioj.some(opcio => kongruasKongruilo(opcio, ĵetono, fonologiaStato));
  }
}

function kongruiAntaŭen( ŝablono: Kongruilo[], ĵetonoj: string[], komenco: number, fonologiaStato: FonologiaStato ): boolean {
  if ( komenco + ŝablono.length > ĵetonoj.length ) return false;
  for ( let i = 0; i < ŝablono.length; i++ ) {
    if ( !kongruasKongruilo(ŝablono[i], ĵetonoj[komenco + i], fonologiaStato) ) return false;
  }
  return true;
}

function kongruiMalantaŭen( ŝablono: Kongruilo[], ĵetonoj: string[], fino: number, fonologiaStato: FonologiaStato ): boolean {
  const komenco = fino - ŝablono.length + 1;
  if ( komenco < 0 ) return false;
  return kongruiAntaŭen(ŝablono, ĵetonoj, komenco, fonologiaStato);
}

// ⟪ j͑ʃ'ᴜ ʃɔ ⟫ - Regula Apliko

function aplikiRegulon( regulo: AnalizitaRegulo, vortajĴetonoj: string[], fonologiaStato: FonologiaStato ): string[] {
  if ( regulo.celo.length === 0 ) return vortajĴetonoj;

  // Plenigu per limaj ĵetonoj por # kongruo
  const plenigita = [LIMO, ...vortajĴetonoj, LIMO];
  const rezulto: string[] = [];
  let i = 1; // Komencu post la komenca #
  const lastaReala = plenigita.length - 2; // Indekso de lasta reala ĵetono

  while ( i <= lastaReala ) {
    let anstataŭigita = false;

    // Ĉu la celo povas eniri komencante je pozicio i ene de la realaj ĵetonoj?
    if ( i + regulo.celo.length - 1 <= lastaReala ) {
      if ( kongruiAntaŭen(regulo.celo, plenigita, i, fonologiaStato) ) {
        // Kontrolu antaŭan kuntekston finiĝantan je i-1
        const antaŭOke = regulo.antaŭKunteksto.length === 0 ||
          kongruiMalantaŭen(regulo.antaŭKunteksto, plenigita, i - 1, fonologiaStato);

        // Kontrolu postan kuntekston komenciĝantan post la celo
        const postIndekso = i + regulo.celo.length;
        const postOke = regulo.postKunteksto.length === 0 ||
          (postIndekso + regulo.postKunteksto.length <= plenigita.length &&
           kongruiAntaŭen(regulo.postKunteksto, plenigita, postIndekso, fonologiaStato));

        if ( antaŭOke && postOke ) {
          rezulto.push(...regulo.anstataŭigo);
          i += regulo.celo.length;
          anstataŭigita = true;
        }
      }
    }

    if ( !anstataŭigita ) {
      rezulto.push(plenigita[i]);
      i++;
    }
  }

  return rezulto;
}

function evoluiVorton( vortajĴetonoj: string[], reguloj: AnalizitaRegulo[], fonologiaStato: FonologiaStato ): string[] {
  let nuna = vortajĴetonoj;
  for ( const regulo of reguloj ) {
    nuna = aplikiRegulon(regulo, nuna, fonologiaStato);
  }
  return nuna;
}

// ⟪ j͑ʃᴜꞇ ⟫ - UI

function agordiStaton( mesaĝo: string ): void {
  STATO.textContent = mesaĝo;
  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

function kreiTekstanElementon( etikednomo: "p" | "span", teksto: string, klasnomo = typeof vacepu === "function" ? "" : "cepufalxez"): HTMLElement {
  const elemento = document.createElement(etikednomo);
  if ( klasnomo ) elemento.className = klasnomo;
  elemento.textContent = teksto;
  return elemento;
}

function akiriGeneritajnVortojn(): string[] {
  const ujo = document.getElementById("fonologio-eliro");
  if ( !ujo ) return [];
  const vortoj: string[] = [];
  ujo.querySelectorAll("ciihii").forEach(ero => {
    const teksto = ero.textContent?.trim();
    if ( teksto ) vortoj.push(teksto);
  });
  return vortoj;
}

function baskuliProprajnVortojn(): void {
  if ( FONTO_PROPRA.checked ) {
    PROPRAJVORTOJ_TEKSTAREJO.classList.remove("kobe");
  } else {
    PROPRAJVORTOJ_TEKSTAREJO.classList.add("kobe");
  }
}

function konserviNunanStaton(): void {
  konserviEvoluanStaton({
    reguloj: REGULOJ_TEKSTAREJO.value,
    proprajVortoj: PROPRAJVORTOJ_TEKSTAREJO.value,
    uziGeneritaj: FONTO_GENERITA.checked,
  });
}

function ruliEvoluon(): void {
  const fonologiaStato = ŝargiFonologianStaton();
  const regulojTeksto = REGULOJ_TEKSTAREJO.value.trim();

  if ( !regulojTeksto ) {
    agordiStaton(T.NO_RULES);
    return;
  }

  // Akiru fontvortojn
  let vortoj: string[];
  if ( FONTO_GENERITA.checked ) {
    vortoj = akiriGeneritajnVortojn();
  } else {
    vortoj = PROPRAJVORTOJ_TEKSTAREJO.value
      .split("\n")
      .map(v => v.trim())
      .filter(v => v.length > 0);
  }

  if ( vortoj.length === 0 ) {
    agordiStaton(T.NO_WORDS);
    return;
  }

  // Analizu ĉiujn regulojn
  const konatajSonoj = fonologiaStato.sonoj.map(s => s.valoro);
  const regulajLinioj = regulojTeksto.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  const reguloj: AnalizitaRegulo[] = [];

  for ( let indekso = 0; indekso < regulajLinioj.length; indekso++ ) {
    const analizita = analiziRegulon(regulajLinioj[indekso], konatajSonoj);
    if ( !analizita ) {
      agordiStaton(`${T.PARSE_ERROR} ${indekso + 1}`);
      return;
    }
    reguloj.push(analizita);
  }

  // Apliku regulojn al ĉiu vorto kaj bildigu eliron
  ELIRO.replaceChildren();
  let kvanto = 0;

  for ( const vorto of vortoj ) {
    const ĵetonoj = ĵetonigi(vorto, konatajSonoj);
    const evoluinta = evoluiVorton(ĵetonoj, reguloj, fonologiaStato);
    const evoluintaĈeno = evoluinta.join("");

    const envolvilo = document.createElement("ciihii");
    envolvilo.appendChild(kreiTekstanElementon("span", `${vorto} \n🔼\n ${evoluintaĈeno}`));
    ELIRO.appendChild(envolvilo);
    kvanto++;
  }

  agordiStaton(`${T.EVOLVED} ${kvanto}`);

  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

// ⟪ ꞁȷ̀ᴜ j͑ʃᴜ ⟫ - Inicialigo

function bildigiEvoluanStaton(): void {
  const stato = ŝargiEvoluanStaton();
  REGULOJ_TEKSTAREJO.value = stato.reguloj;
  PROPRAJVORTOJ_TEKSTAREJO.value = stato.proprajVortoj;

  if ( stato.uziGeneritaj ) {
    FONTO_GENERITA.checked = true;
  } else {
    FONTO_PROPRA.checked = true;
  }

  baskuliProprajnVortojn();
}

function bildigiEvoluajnKonservojn(): void {
  restarigiInfanojn(EVOLUAJ_KONSERVOJ_LISTO);
  
  const aktivaGen = akiriAktivanGeneratoranKonservon();
  if ( !aktivaGen ) return;

    aktivaGen.evoluaKonservoj.forEach((konservo) => {
      const langetaButono = document.createElement("button");
      langetaButono.type = "button";
      const langetaEtikedo = kreiTekstanElementon("span", konservo.nomo);
      langetaButono.appendChild(langetaEtikedo);
      
      if ( konservo.id === aktivaGen.aktivaEvoluaKonservoId ) {
        langetaButono.setAttribute("aria-pressed", "true");
      }
      
      langetaButono.addEventListener("click", () => {
        const gen = konservojStato.konservoj.find(k => k.id === konservojStato.aktivaKonservoId);
        if ( gen ) {
          gen.aktivaEvoluaKonservoId = konservo.id;
        }
        localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(konservojStato));
        ŝargiKonservojnStaton();
        ĝisdatigiEvoluanUI();
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
            localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(konservojStato));
            ŝargiKonservojnStaton();
            ĝisdatigiEvoluanUI();
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

      EVOLUAJ_KONSERVOJ_LISTO.appendChild(langetaButono);
    });

  const aktivaEvoluo = akiriAktivanEvoluanKonservon();
  if ( aktivaEvoluo ) {
    EVOLUA_KONSERVA_NOMO_ENIGO.value = aktivaEvoluo.nomo;
  }

  if ( aktivaGen.evoluaKonservoj.length <= 1 ) {
    FORIGI_EVOLUAN_KONSERVON_BUTONO.style.display = "none";
  } else {
    FORIGI_EVOLUAN_KONSERVON_BUTONO.style.display = "";
  }
}

function aldoniEvoluanKonservon(): void {
  const aktivaGen = akiriAktivanGeneratoranKonservon();
  if ( !aktivaGen ) return;

  let maksNum = 0;
  for ( const k of aktivaGen.evoluaKonservoj ) {
    const valoro = parseInt(k.nomo, 0o10);
    if ( !isNaN(valoro) && valoro > maksNum ) {
      maksNum = valoro;
    }
  }
  const sekvaNomo = ( maksNum + 1 ).toString();

  const novaKonservo: EvoluaKonservo = {
    id: kreiId(),
    nomo: sekvaNomo,
    reguloj: "",
    proprajVortoj: "",
    uziGeneritaj: true,
  };

  aktivaGen.evoluaKonservoj.push(novaKonservo);
  aktivaGen.aktivaEvoluaKonservoId = novaKonservo.id;
  
  localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(konservojStato));
  window.dispatchEvent(new CustomEvent("phonology-state-updated"));

  EVOLUA_KONSERVA_NOMO_ENIGO.focus();
  EVOLUA_KONSERVA_NOMO_ENIGO.select();
}

function forigiEvoluanKonservon(): void {
  const aktivaGen = akiriAktivanGeneratoranKonservon();
  if ( !aktivaGen || aktivaGen.evoluaKonservoj.length <= 1 ) return;

  const indekso = aktivaGen.evoluaKonservoj.findIndex(e => e.id === aktivaGen.aktivaEvoluaKonservoId);
  aktivaGen.evoluaKonservoj = aktivaGen.evoluaKonservoj.filter(e => e.id !== aktivaGen.aktivaEvoluaKonservoId);

  const sekvaAktivaIndekso = Math.min(indekso, aktivaGen.evoluaKonservoj.length - 1);
  const sekvaAktiva = aktivaGen.evoluaKonservoj[sekvaAktivaIndekso];
  aktivaGen.aktivaEvoluaKonservoId = sekvaAktiva.id;

  localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(konservojStato));
  window.dispatchEvent(new CustomEvent("phonology-state-updated"));
}

function alinomiEvoluanKonservon(): void {
  const novaNomo = EVOLUA_KONSERVA_NOMO_ENIGO.value.trim();
  if ( !novaNomo ) return;

  const aktivaEvoluo = akiriAktivanEvoluanKonservon();
  if ( aktivaEvoluo ) {
    aktivaEvoluo.nomo = novaNomo;
    localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(konservojStato));
    window.dispatchEvent(new CustomEvent("phonology-state-updated"));
  }
}

function restarigiInfanojn( elemento: HTMLElement ): void {
  elemento.replaceChildren();
}

function kreiId(): string {
  if ( typeof crypto !== "undefined" && "randomUUID" in crypto ) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(0o10)}-${Math.random().toString(0o10).slice(2)}`;
}

function ĝisdatigiEvoluanUI(): void {
  bildigiEvoluajnKonservojn();
  bildigiEvoluanStaton();
}

function inicialigiEvoluon(): void {
  ŝargiKonservojnStaton();
  ĝisdatigiEvoluanUI();

  REGULOJ_TEKSTAREJO.placeholder = T.RULES_PLACEHOLDER;
  PROPRAJVORTOJ_TEKSTAREJO.placeholder = T.CUSTOM_PLACEHOLDER;

  RULI_BUTONO.addEventListener("click", () => {
    konserviNunanStaton();
    ruliEvoluon();
  });

  FONTO_GENERITA.addEventListener("change", () => {
    baskuliProprajnVortojn();
    konserviNunanStaton();
  });

  FONTO_PROPRA.addEventListener("change", () => {
    baskuliProprajnVortojn();
    konserviNunanStaton();
  });

  REGULOJ_TEKSTAREJO.addEventListener("input", konserviNunanStaton);
  PROPRAJVORTOJ_TEKSTAREJO.addEventListener("input", konserviNunanStaton);

  ALDONI_EVOLUAN_KONSERVON_BUTONO.addEventListener("click", aldoniEvoluanKonservon);
  FORIGI_EVOLUAN_KONSERVON_BUTONO.addEventListener("click", forigiEvoluanKonservon);
  EVOLUA_KONSERVA_NOMO_ENIGO.addEventListener("input", alinomiEvoluanKonservon);
  EVOLUA_KONSERVA_NOMO_ENIGO.addEventListener("keydown", (e) => {
    if ( e.key === "Enter" ) {
      EVOLUA_KONSERVA_NOMO_ENIGO.blur();
    }
  });

  agordiStaton(T.READY);
}

window.addEventListener("phonology-state-updated", () => {
  ŝargiKonservojnStaton();
  ĝisdatigiEvoluanUI();
});

inicialigiEvoluon();

export {};
