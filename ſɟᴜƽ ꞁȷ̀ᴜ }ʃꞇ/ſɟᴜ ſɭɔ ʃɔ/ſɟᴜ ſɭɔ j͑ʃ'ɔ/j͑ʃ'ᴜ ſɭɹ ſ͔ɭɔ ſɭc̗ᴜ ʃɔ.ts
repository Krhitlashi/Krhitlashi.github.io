// ≺⧼ j͑ʃ'ᴜ ſɭɹ ſ͔ɭɔ ſɭc̗ᴜ ʃɔ - Sound Change Applier ⧽≻

type Gawe = "aih" | "en";

// ⟪ ꞁȷ̀ɜ j͑ʃᴜ ⟫

interface SoundEntry {
  id: string;
  value: string;
}

interface SoundGroup {
  id: string;
  name: string;
  soundIds: string[];
}

interface PhonologyState {
  sounds: SoundEntry[];
  groups: SoundGroup[];
}

interface StructurePart {
  groupId: string;
  numerator: number;
}

interface SyllableStructure {
  id: string;
  parts: StructurePart[];
}

interface EvolveSave {
  id: string;
  name: string;
  rules: string;
  customWords: string;
  useGenerated: boolean;
}

interface GeneratorSave {
  id: string;
  name: string;
  sounds: SoundEntry[];
  groups: SoundGroup[];
  activeGroupId: string | null;
  draftParts: StructurePart[];
  structures: SyllableStructure[];
  evolveSaves: EvolveSave[];
  activeEvolveSaveId: string | null;
}

interface SavesState {
  saves: GeneratorSave[];
  activeSaveId: string | null;
}

interface EvolveState {
  rules: string;
  customWords: string;
  useGenerated: boolean;
}

type Matcher =
  | { type: "literal"; value: string }
  | { type: "boundary" }
  | { type: "group"; groupName: string }
  | { type: "alternatives"; options: Matcher[] };

interface ParsedRule {
  preContext: Matcher[];
  target: Matcher[];
  postContext: Matcher[];
  replacement: string[];
}

// ⟪ ꞁȷ̀ɔ j͑ʃƽɔƽ ⟫

const GENERATOR_STORAGE_KEY = "phonology-generator-state-v1";
const EVOLVE_STORAGE_KEY = "phonology-evolve-state-v1";
const BOUNDARY = "#";

const TEXT = {
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

function getLanguage(): Gawe {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") === "en" ? "en" : "aih";
}

function getElement<TElement extends HTMLElement>(id: string): TElement {
  const element = document.getElementById(id);
  if ( !element ) {
    throw new Error(`Missing element ${id}`);
  }
  return element as TElement;
}

const language = getLanguage();
const T = TEXT[language];

// ⟪ ꞁȷ̀ɜ ɽ͑ʃ'ᴜ ⟫

const RULES_TEXTAREA = getElement<HTMLTextAreaElement>("evolve-rules");
const SOURCE_GENERATED = getElement<HTMLInputElement>("evolve-source-generated");
const SOURCE_CUSTOM = getElement<HTMLInputElement>("evolve-source-custom");
const CUSTOM_WORDS_TEXTAREA = getElement<HTMLTextAreaElement>("evolve-custom-words");
const RUN_BUTTON = getElement<HTMLButtonElement>("evolve-run");
const STATUS = getElement<HTMLParagraphElement>("evolve-status");
const OUTPUT = getElement<HTMLElement>("evolve-output");

const EVOLVE_SAVES_LIST = getElement<HTMLElement>("evolve-saves-list");
const EVOLVE_SAVE_NAME_INPUT = getElement<HTMLInputElement>("evolve-save-name-input");
const EVOLVE_ADD_SAVE_BUTTON = getElement<HTMLButtonElement>("evolve-add-save");
const EVOLVE_DELETE_SAVE_BUTTON = getElement<HTMLButtonElement>("evolve-delete-save");

// ⟪ ꞁȷ̀ɜ ŋᷠᴜ ⟫

let savesState: SavesState = { saves: [], activeSaveId: null };

function loadSavesState(): void {
  try {
    const raw = localStorage.getItem("phonology-generator-saves-v2");
    if ( raw ) {
      const parsed = JSON.parse(raw);
      if ( parsed && Array.isArray(parsed.saves) && parsed.saves.length > 0 ) {
        savesState = parsed;
        return;
      }
    }
  } catch {}
  savesState = { saves: [], activeSaveId: null };
}

function getActiveGeneratorSave(): GeneratorSave | undefined {
  return savesState.saves.find(s => s.id === savesState.activeSaveId);
}

function getActiveEvolveSave(): EvolveSave | undefined {
  const activeGen = getActiveGeneratorSave();
  if ( !activeGen ) return undefined;
  return activeGen.evolveSaves.find(e => e.id === activeGen.activeEvolveSaveId);
}

function loadPhonologyState(): PhonologyState {
  loadSavesState();
  const activeGen = getActiveGeneratorSave();
  if ( activeGen ) {
    return {
      sounds: activeGen.sounds || [],
      groups: activeGen.groups || [],
    };
  }
  return { sounds: [], groups: [] };
}

function loadEvolveState(): EvolveState {
  loadSavesState();
  const activeEvolve = getActiveEvolveSave();
  if ( activeEvolve ) {
    return {
      rules: activeEvolve.rules || "",
      customWords: activeEvolve.customWords || "",
      useGenerated: typeof activeEvolve.useGenerated === "boolean" ? activeEvolve.useGenerated : true,
    };
  }
  return { rules: "", customWords: "", useGenerated: true };
}

function saveEvolveState(stateData: EvolveState): void {
  loadSavesState();
  const activeGen = getActiveGeneratorSave();
  if ( activeGen ) {
    const activeEvolve = activeGen.evolveSaves.find(e => e.id === activeGen.activeEvolveSaveId);
    if ( activeEvolve ) {
      activeEvolve.rules = stateData.rules;
      activeEvolve.customWords = stateData.customWords;
      activeEvolve.useGenerated = stateData.useGenerated;
      localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(savesState));
      window.dispatchEvent(new CustomEvent("phonology-state-updated"));
    }
  }
}

// ⟪ ʃɔ ſɭɹ j͑ʃ'ɔ ⟫ - Tokenizer

function tokenize(word: string, knownSounds: string[]): string[] {
  if ( !word ) return [];
  const sorted = [...knownSounds].filter(s => s.length > 0).sort((a, b) => b.length - a.length);
  const tokens: string[] = [];
  let i = 0;

  while ( i < word.length ) {
    let matched = false;

    for ( const sound of sorted ) {
      if ( word.startsWith(sound, i) ) {
        tokens.push(sound);
        i += sound.length;
        matched = true;
        break;
      }
    }

    if ( !matched ) {
      // Take one base character plus any following combining marks
      let end = i + 1;
      while ( end < word.length ) {
        const cp = word.codePointAt(end);
        if ( cp === undefined || !isCombiningMark(cp) ) break;
        end += cp > 0xFFFF ? 2 : 1;
      }
      tokens.push(word.slice(i, end));
      i = end;
    }
  }

  return tokens;
}

function isCombiningMark(cp: number): boolean {
  return (
    (cp >= 0x0300 && cp <= 0x036F) ||
    (cp >= 0x1AB0 && cp <= 0x1AFF) ||
    (cp >= 0x1DC0 && cp <= 0x1DFF) ||
    (cp >= 0x20D0 && cp <= 0x20FF) ||
    (cp >= 0xFE20 && cp <= 0xFE2F)
  );
}

// ⟪ ſɭɹ ⟫ - Rule Parsing Utilities

function findMatchingBracket(str: string, start: number): number {
  let depth = 0;
  for ( let i = start; i < str.length; i++ ) {
    if ( str[i] === "[" ) depth++;
    else if ( str[i] === "]" ) {
      depth--;
      if ( depth === 0 ) return i;
    }
  }
  return -1;
}

function findTopLevelChar(str: string, ch: string): number {
  let bracketDepth = 0;
  for ( let i = 0; i < str.length; i++ ) {
    if ( str[i] === "[" ) bracketDepth++;
    else if ( str[i] === "]" ) bracketDepth--;
    else if ( bracketDepth === 0 && str[i] === ch ) return i;
  }
  return -1;
}

function splitTopLevel(str: string, sep: string): string[] {
  const parts: string[] = [];
  let current = "";
  let bracketDepth = 0;
  let parenDepth = 0;
  let i = 0;

  while ( i < str.length ) {
    const ch = str[i];

    if ( ch === "[" ) {
      bracketDepth++;
      current += ch;
      i++;
    } else if ( ch === "]" ) {
      bracketDepth--;
      current += ch;
      i++;
    } else if ( ch === "(" ) {
      parenDepth++;
      current += ch;
      i++;
    } else if ( ch === ")" ) {
      parenDepth--;
      current += ch;
      i++;
    } else if ( bracketDepth === 0 && parenDepth === 0 && str.startsWith(sep, i) ) {
      parts.push(current);
      current = "";
      i += sep.length;
    } else {
      current += ch;
      i++;
    }
  }

  if ( current !== "" ) parts.push(current);
  return parts;
}

// ⟪ ſɭɹ ⟫ - Bracket & Pattern Parsing

function parseBracketContent(content: string): Matcher {
  content = content.trim();

  // Deletion marker - in matcher context returns a literal empty match
  if ( content === "›" ) {
    return { type: "literal", value: "" };
  }

  // Split by top-level ｡ (U+FF61) for alternatives
  const parts = splitTopLevel(content, "｡");

  if ( parts.length > 1 ) {
    const options = parts.map(part => parseSingleMatcher(part.trim()));
    return { type: "alternatives", options };
  }

  // Nested bracket expression
  if ( content.startsWith("[") && content.endsWith("]") ) {
    return parseBracketContent(content.slice(1, -1));
  }

  // Group reference: ends with 'o' and has more than one character
  if ( content.length > 1 && content.endsWith("o") ) {
    const groupName = content.slice(0, -1);
    return { type: "group", groupName };
  }

  // Literal sound
  return { type: "literal", value: content };
}

function parseSingleMatcher(text: string): Matcher {
  text = text.trim();

  if ( text === "#" ) {
    return { type: "boundary" };
  }

  if ( text.startsWith("[") && text.endsWith("]") ) {
    return parseBracketContent(text.slice(1, -1));
  }

  return { type: "literal", value: text };
}

function parsePatternElements(text: string): Matcher[] {
  text = text.trim();
  if ( !text ) return [];

  const matchers: Matcher[] = [];
  let i = 0;

  while ( i < text.length ) {
    // Skip whitespace
    while ( i < text.length && text[i] === " " ) i++;
    if ( i >= text.length ) break;

    if ( text[i] === "[" ) {
      const end = findMatchingBracket(text, i);
      if ( end === -1 ) {
        // Unmatched bracket - take rest as literal
        matchers.push({ type: "literal", value: text.slice(i) });
        break;
      }
      matchers.push(parseBracketContent(text.slice(i + 1, end)));
      i = end + 1;
    } else if ( text[i] === "#" ) {
      matchers.push({ type: "boundary" });
      i++;
    } else {
      // Read literal until whitespace or special character
      let end = i;
      while ( end < text.length && text[end] !== " " && text[end] !== "[" && text[end] !== "#" && text[end] !== "(" && text[end] !== ")" ) {
        end++;
      }
      const lit = text.slice(i, end);
      if ( lit ) matchers.push({ type: "literal", value: lit });
      i = end;
    }
  }

  return matchers;
}

// ⟪ ſɭɹ ⟫ - Replacement & Rule Parsing

function parseReplacement(text: string, knownSounds: string[]): string[] {
  text = text.trim();

  // Deletion markers
  if ( text === "[›]" ) return [];
  if ( text.startsWith("[") && text.endsWith("]") ) {
    const inner = text.slice(1, -1).trim();
    if ( inner === "›" ) return [];
  }

  // Tokenize each whitespace-separated segment using known sounds
  const segments = text.split(/\s+/).filter(s => s.length > 0);
  const result: string[] = [];
  for ( const segment of segments ) {
    result.push(...tokenize(segment, knownSounds));
  }
  return result;
}

function parseRule(line: string, knownSounds: string[]): ParsedRule | null {
  line = line.trim();
  if ( !line ) return null;

  // Split by ' / ' (spaced slash), fallback to '/'
  let sides = splitTopLevel(line, " / ");
  let rightSide: string;

  if ( sides.length >= 2 ) {
    rightSide = sides.slice(1).join(" / ").trim();
  } else {
    sides = splitTopLevel(line, "/");
    if ( sides.length < 2 ) return null;
    rightSide = sides.slice(1).join("/").trim();
  }

  const leftSide = sides[0].trim();
  const replacement = parseReplacement(rightSide, knownSounds);

  // Check for explicit target with ( )
  const openParen = findTopLevelChar(leftSide, "(");
  const closeParen = findTopLevelChar(leftSide, ")");

  if ( openParen !== -1 && closeParen !== -1 && closeParen > openParen ) {
    const preText = leftSide.slice(0, openParen).trim();
    const targetText = leftSide.slice(openParen + 1, closeParen).trim();
    const postText = leftSide.slice(closeParen + 1).trim();

    return {
      preContext: parsePatternElements(preText),
      target: parsePatternElements(targetText),
      postContext: parsePatternElements(postText),
      replacement,
    };
  }

  // No parentheses: leading # becomes pre-context, trailing # becomes post-context
  const all = parsePatternElements(leftSide);

  let preEnd = 0;
  while ( preEnd < all.length && all[preEnd].type === "boundary" ) preEnd++;

  let postStart = all.length;
  while ( postStart > preEnd && all[postStart - 1].type === "boundary" ) postStart--;

  return {
    preContext: all.slice(0, preEnd),
    target: all.slice(preEnd, postStart),
    postContext: all.slice(postStart),
    replacement,
  };
}

// ⟪ ʃɔ ɭʃw ⟫ - Matching Engine

function matchesMatcher(matcher: Matcher, token: string, phonState: PhonologyState): boolean {
  switch ( matcher.type ) {
    case "literal":
      return token === matcher.value;
    case "boundary":
      return token === BOUNDARY;
    case "group": {
      const group = phonState.groups.find(g => g.name === matcher.groupName);
      if ( !group ) return false;
      return group.soundIds.some(sid => {
        const sound = phonState.sounds.find(s => s.id === sid);
        return sound !== undefined && sound.value === token;
      });
    }
    case "alternatives":
      return matcher.options.some(opt => matchesMatcher(opt, token, phonState));
  }
}

function matchForward(pattern: Matcher[], tokens: string[], start: number, phonState: PhonologyState): boolean {
  if ( start + pattern.length > tokens.length ) return false;
  for ( let i = 0; i < pattern.length; i++ ) {
    if ( !matchesMatcher(pattern[i], tokens[start + i], phonState) ) return false;
  }
  return true;
}

function matchBackward(pattern: Matcher[], tokens: string[], end: number, phonState: PhonologyState): boolean {
  const start = end - pattern.length + 1;
  if ( start < 0 ) return false;
  return matchForward(pattern, tokens, start, phonState);
}

// ⟪ j͑ʃ'ᴜ ʃɔ ⟫ - Rule Application

function applyRule(rule: ParsedRule, wordTokens: string[], phonState: PhonologyState): string[] {
  if ( rule.target.length === 0 ) return wordTokens;

  // Pad with boundary tokens for # matching
  const padded = [BOUNDARY, ...wordTokens, BOUNDARY];
  const result: string[] = [];
  let i = 1; // Start after leading #
  const lastReal = padded.length - 2; // Index of last real token

  while ( i <= lastReal ) {
    let replaced = false;

    // Can the target fit starting at position i within the real tokens?
    if ( i + rule.target.length - 1 <= lastReal ) {
      if ( matchForward(rule.target, padded, i, phonState) ) {
        // Check preceding context ending at i-1
        const preOk = rule.preContext.length === 0 ||
          matchBackward(rule.preContext, padded, i - 1, phonState);

        // Check following context starting after the target
        const postIdx = i + rule.target.length;
        const postOk = rule.postContext.length === 0 ||
          (postIdx + rule.postContext.length <= padded.length &&
           matchForward(rule.postContext, padded, postIdx, phonState));

        if ( preOk && postOk ) {
          result.push(...rule.replacement);
          i += rule.target.length;
          replaced = true;
        }
      }
    }

    if ( !replaced ) {
      result.push(padded[i]);
      i++;
    }
  }

  return result;
}

function evolveWord(wordTokens: string[], rules: ParsedRule[], phonState: PhonologyState): string[] {
  let current = wordTokens;
  for ( const rule of rules ) {
    current = applyRule(rule, current, phonState);
  }
  return current;
}

// ⟪ j͑ʃᴜꞇ ⟫ - UI

function setStatus(message: string): void {
  STATUS.textContent = message;
  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

function createTextElement(tagName: "p" | "span", text: string, className = typeof vacepu === "function" ? "" : "cepufalxez"): HTMLElement {
  const element = document.createElement(tagName);
  if ( className ) element.className = className;
  element.textContent = text;
  return element;
}

function getGeneratedWords(): string[] {
  const container = document.getElementById("phonology-output");
  if ( !container ) return [];
  const words: string[] = [];
  container.querySelectorAll("ciihii").forEach(item => {
    const text = item.textContent?.trim();
    if ( text ) words.push(text);
  });
  return words;
}

function toggleCustomWords(): void {
  if ( SOURCE_CUSTOM.checked ) {
    CUSTOM_WORDS_TEXTAREA.classList.remove("kobe");
  } else {
    CUSTOM_WORDS_TEXTAREA.classList.add("kobe");
  }
}

function saveCurrentState(): void {
  saveEvolveState({
    rules: RULES_TEXTAREA.value,
    customWords: CUSTOM_WORDS_TEXTAREA.value,
    useGenerated: SOURCE_GENERATED.checked,
  });
}

function runEvolve(): void {
  const phonState = loadPhonologyState();
  const rulesText = RULES_TEXTAREA.value.trim();

  if ( !rulesText ) {
    setStatus(T.NO_RULES);
    return;
  }

  // Get source words
  let words: string[];
  if ( SOURCE_GENERATED.checked ) {
    words = getGeneratedWords();
  } else {
    words = CUSTOM_WORDS_TEXTAREA.value
      .split("\n")
      .map(w => w.trim())
      .filter(w => w.length > 0);
  }

  if ( words.length === 0 ) {
    setStatus(T.NO_WORDS);
    return;
  }

  // Parse all rules
  const knownSounds = phonState.sounds.map(s => s.value);
  const ruleLines = rulesText.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  const rules: ParsedRule[] = [];

  for ( let idx = 0; idx < ruleLines.length; idx++ ) {
    const parsed = parseRule(ruleLines[idx], knownSounds);
    if ( !parsed ) {
      setStatus(`${T.PARSE_ERROR} ${idx + 1}`);
      return;
    }
    rules.push(parsed);
  }

  // Apply rules to each word and render output
  OUTPUT.replaceChildren();
  let count = 0;

  for ( const word of words ) {
    const tokens = tokenize(word, knownSounds);
    const evolved = evolveWord(tokens, rules, phonState);
    const evolvedStr = evolved.join("");

    const wrapper = document.createElement("ciihii");
    wrapper.appendChild(createTextElement("span", `${word} \n🔼\n ${evolvedStr}`));
    OUTPUT.appendChild(wrapper);
    count++;
  }

  setStatus(`${T.EVOLVED} ${count}`);

  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

// ⟪ ꞁȷ̀ᴜ j͑ʃᴜ ⟫ - Initialization

function renderEvolveState(): void {
  const state = loadEvolveState();
  RULES_TEXTAREA.value = state.rules;
  CUSTOM_WORDS_TEXTAREA.value = state.customWords;

  if ( state.useGenerated ) {
    SOURCE_GENERATED.checked = true;
  } else {
    SOURCE_CUSTOM.checked = true;
  }

  toggleCustomWords();
}

function renderEvolveSaves(): void {
  resetChildren(EVOLVE_SAVES_LIST);
  
  const activeGen = getActiveGeneratorSave();
  if ( !activeGen ) return;

    activeGen.evolveSaves.forEach((save) => {
      const tabButton = document.createElement("button");
      tabButton.type = "button";
      const tabLabel = createTextElement("span", save.name);
      tabButton.appendChild(tabLabel);
      
      if ( save.id === activeGen.activeEvolveSaveId ) {
        tabButton.setAttribute("aria-pressed", "true");
      }
      
      tabButton.addEventListener("click", () => {
        const gen = savesState.saves.find(s => s.id === savesState.activeSaveId);
        if ( gen ) {
          gen.activeEvolveSaveId = save.id;
        }
        localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(savesState));
        loadSavesState();
        updateEvolveUI();
      });

      tabButton.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const input = document.createElement("input");
        input.type = "text";
        input.value = save.name;
        tabLabel.replaceWith(input);
        input.focus();
        input.select();
        const finish = () => {
          const newName = input.value.trim();
          if ( newName && newName !== save.name ) {
            save.name = newName;
            localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(savesState));
            loadSavesState();
            updateEvolveUI();
          } else {
            input.replaceWith(tabLabel);
          }
        };
        input.addEventListener("blur", finish);
        input.addEventListener("keydown", (ke) => {
          if ( ke.key === "Enter" ) {
            input.blur();
          } else if ( ke.key === "Escape" ) {
            input.value = save.name;
            input.blur();
          }
        });
      });

      EVOLVE_SAVES_LIST.appendChild(tabButton);
    });

  const activeEvolve = getActiveEvolveSave();
  if ( activeEvolve ) {
    EVOLVE_SAVE_NAME_INPUT.value = activeEvolve.name;
  }

  if ( activeGen.evolveSaves.length <= 1 ) {
    EVOLVE_DELETE_SAVE_BUTTON.style.display = "none";
  } else {
    EVOLVE_DELETE_SAVE_BUTTON.style.display = "";
  }
}

function addEvolveSave(): void {
  const activeGen = getActiveGeneratorSave();
  if ( !activeGen ) return;

  let maxNum = 0;
  for ( const s of activeGen.evolveSaves ) {
    const val = parseInt(s.name, 0o10);
    if ( !isNaN(val) && val > maxNum ) {
      maxNum = val;
    }
  }
  const nextName = ( maxNum + 1 ).toString();

  const newSave: EvolveSave = {
    id: makeId(),
    name: nextName,
    rules: "",
    customWords: "",
    useGenerated: true,
  };

  activeGen.evolveSaves.push(newSave);
  activeGen.activeEvolveSaveId = newSave.id;
  
  localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(savesState));
  window.dispatchEvent(new CustomEvent("phonology-state-updated"));

  EVOLVE_SAVE_NAME_INPUT.focus();
  EVOLVE_SAVE_NAME_INPUT.select();
}

function deleteEvolveSave(): void {
  const activeGen = getActiveGeneratorSave();
  if ( !activeGen || activeGen.evolveSaves.length <= 1 ) return;

  const index = activeGen.evolveSaves.findIndex(e => e.id === activeGen.activeEvolveSaveId);
  activeGen.evolveSaves = activeGen.evolveSaves.filter(e => e.id !== activeGen.activeEvolveSaveId);

  const nextActiveIndex = Math.min(index, activeGen.evolveSaves.length - 1);
  const nextActive = activeGen.evolveSaves[nextActiveIndex];
  activeGen.activeEvolveSaveId = nextActive.id;

  localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(savesState));
  window.dispatchEvent(new CustomEvent("phonology-state-updated"));
}

function renameEvolveSave(): void {
  const newName = EVOLVE_SAVE_NAME_INPUT.value.trim();
  if ( !newName ) return;

  const activeEvolve = getActiveEvolveSave();
  if ( activeEvolve ) {
    activeEvolve.name = newName;
    localStorage.setItem("phonology-generator-saves-v2", JSON.stringify(savesState));
    window.dispatchEvent(new CustomEvent("phonology-state-updated"));
  }
}

function resetChildren(element: HTMLElement): void {
  element.replaceChildren();
}

function makeId(): string {
  if ( typeof crypto !== "undefined" && "randomUUID" in crypto ) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(0o10)}-${Math.random().toString(0o10).slice(2)}`;
}

function updateEvolveUI(): void {
  renderEvolveSaves();
  renderEvolveState();
}

function initEvolve(): void {
  loadSavesState();
  updateEvolveUI();

  RULES_TEXTAREA.placeholder = T.RULES_PLACEHOLDER;
  CUSTOM_WORDS_TEXTAREA.placeholder = T.CUSTOM_PLACEHOLDER;

  RUN_BUTTON.addEventListener("click", () => {
    saveCurrentState();
    runEvolve();
  });

  SOURCE_GENERATED.addEventListener("change", () => {
    toggleCustomWords();
    saveCurrentState();
  });

  SOURCE_CUSTOM.addEventListener("change", () => {
    toggleCustomWords();
    saveCurrentState();
  });

  RULES_TEXTAREA.addEventListener("input", saveCurrentState);
  CUSTOM_WORDS_TEXTAREA.addEventListener("input", saveCurrentState);

  EVOLVE_ADD_SAVE_BUTTON.addEventListener("click", addEvolveSave);
  EVOLVE_DELETE_SAVE_BUTTON.addEventListener("click", deleteEvolveSave);
  EVOLVE_SAVE_NAME_INPUT.addEventListener("input", renameEvolveSave);
  EVOLVE_SAVE_NAME_INPUT.addEventListener("keydown", (e) => {
    if ( e.key === "Enter" ) {
      EVOLVE_SAVE_NAME_INPUT.blur();
    }
  });

  setStatus(T.READY);
}

window.addEventListener("phonology-state-updated", () => {
  loadSavesState();
  updateEvolveUI();
});

initEvolve();

export {};
