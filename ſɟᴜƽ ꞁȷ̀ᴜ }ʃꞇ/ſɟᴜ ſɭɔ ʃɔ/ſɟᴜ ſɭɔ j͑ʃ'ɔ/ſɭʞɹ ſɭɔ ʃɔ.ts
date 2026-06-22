// ≺⧼ ſɭʞɹ ſɭɔ ʃɔ - Phonology Generator ⧽≻

type Gawe = "aih" | "en";

interface SoundEntry {
  id: string;
  value: string;
}

interface SoundGroup {
  id: string;
  name: string;
  soundIds: string[];
}

interface StructurePart {
  groupId: string;
  numerator: number;
  denominator: number;
}

interface SyllableStructure {
  id: string;
  parts: StructurePart[];
}

interface PhonologyState {
  sounds: SoundEntry[];
  groups: SoundGroup[];
  activeGroupId: string | null;
  draftParts: StructurePart[];
  structures: SyllableStructure[];
}

const STORAGE_KEY = "phonology-generator-state-v1";

const TEXT = {
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

const language = getLanguage();
const T = TEXT[language];

const SOUND_INPUT = getElement<HTMLInputElement>("phonology-sound-input");
const ADD_SOUND_BUTTON = getElement<HTMLButtonElement>("phonology-add-sound");
const SOUND_LIST = getElement<HTMLElement>("phonology-sound-list");
const GROUP_INPUT = getElement<HTMLInputElement>("phonology-group-input");
const ADD_GROUP_BUTTON = getElement<HTMLButtonElement>("phonology-add-group");
const GROUP_LIST = getElement<HTMLElement>("phonology-group-list");
const ASSIGNMENT_LIST = getElement<HTMLElement>("phonology-assignment-list");
const STRUCTURE_GROUP_LIST = getElement<HTMLElement>("phonology-structure-group-list");
const DRAFT_STRUCTURE = getElement<HTMLElement>("phonology-draft-structure");
const CLEAR_DRAFT_BUTTON = getElement<HTMLButtonElement>("phonology-clear-draft");
const SAVE_STRUCTURE_BUTTON = getElement<HTMLButtonElement>("phonology-save-structure");
const STRUCTURE_LIST = getElement<HTMLElement>("phonology-structure-list");
const GENERATE_COUNT = getElement<HTMLInputElement>("phonology-generate-count");
const GENERATE_BUTTON = getElement<HTMLButtonElement>("phonology-generate");
const STATUS = getElement<HTMLParagraphElement>("phonology-status");
const OUTPUT = getElement<HTMLElement>("phonology-output");

let state: PhonologyState = loadState();

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

function makeId(): string {
  if ( typeof crypto !== "undefined" && "randomUUID" in crypto ) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(0o10)}-${Math.random().toString(0o10).slice(2)}`;
}

function loadState(): PhonologyState {
  const emptyState: PhonologyState = {
    sounds: [],
    groups: [],
    activeGroupId: null,
    draftParts: [],
    structures: [],
  };

  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if ( !savedState ) return emptyState;

    const parsedState = JSON.parse(savedState);
    if ( !parsedState || typeof parsedState !== "object" ) return emptyState;

    const sounds: SoundEntry[] = [];
    if ( Array.isArray(parsedState.sounds) ) {
      for ( const s of parsedState.sounds ) {
        if ( s && typeof s === "object" && typeof s.id === "string" && typeof s.value === "string" ) {
          sounds.push({ id: s.id, value: s.value });
        }
      }
    }

    const groups: SoundGroup[] = [];
    if ( Array.isArray(parsedState.groups) ) {
      for ( const g of parsedState.groups ) {
        if ( g && typeof g === "object" && typeof g.id === "string" && typeof g.name === "string" ) {
          const soundIds: string[] = [];
          if ( Array.isArray(g.soundIds) ) {
            for ( const sid of g.soundIds ) {
              if ( typeof sid === "string" ) {
                soundIds.push(sid);
              }
            }
          }
          groups.push({ id: g.id, name: g.name, soundIds });
        }
      }
    }

    let activeGroupId: string | null = null;
    if ( typeof parsedState.activeGroupId === "string" ) {
      activeGroupId = parsedState.activeGroupId;
    }

    const draftParts: StructurePart[] = [];
    if ( Array.isArray(parsedState.draftParts) ) {
      for ( const p of parsedState.draftParts ) {
        if ( p && typeof p === "object" && typeof p.groupId === "string" ) {
          draftParts.push({
            groupId: p.groupId,
            numerator: typeof p.numerator === "number" ? p.numerator : 1,
            denominator: typeof p.denominator === "number" ? p.denominator : 1,
          });
        }
      }
    }

    const structures: SyllableStructure[] = [];
    if ( Array.isArray(parsedState.structures) ) {
      for ( const str of parsedState.structures ) {
        if ( str && typeof str === "object" && typeof str.id === "string" && Array.isArray(str.parts) ) {
          const parts: StructurePart[] = [];
          for ( const p of str.parts ) {
            if ( p && typeof p === "object" && typeof p.groupId === "string" ) {
              parts.push({
                groupId: p.groupId,
                numerator: typeof p.numerator === "number" ? p.numerator : 1,
                denominator: typeof p.denominator === "number" ? p.denominator : 1,
              });
            }
          }
          structures.push({ id: str.id, parts });
        }
      }
    }

    return {
      sounds,
      groups,
      activeGroupId,
      draftParts,
      structures,
    };
  } catch {
    return emptyState;
  }
}

function saveState(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setStatus(message: string): void {
  STATUS.textContent = message;
  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

function resetChildren(element: HTMLElement): void {
  element.replaceChildren();
}

function createTextElement(tagName: "p" | "span", text: string, className = typeof vacepu === "function" ? "" : "cepufalxez"): HTMLElement {
  const element = document.createElement(tagName);
  if ( className ) {
    element.className = className;
  }
  element.textContent = text;
  return element;
}

function createButton(text: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.appendChild(createTextElement("span", text));
  button.addEventListener("click", onClick);
  return button;
}

function createEmptyMessage(text: string): HTMLParagraphElement {
  const message = document.createElement("p");
  message.className = "ksakat2xa";
  message.appendChild(createTextElement("span", text));
  return message;
}

function findGroup(groupId: string): SoundGroup | undefined {
  return state.groups.find((group) => group.id === groupId);
}

function findSound(soundId: string): SoundEntry | undefined {
  return state.sounds.find((sound) => sound.id === soundId);
}

function normalizeFraction(part: StructurePart): StructurePart {
  const denominator = Math.max(1, Math.floor(part.denominator || 1));
  const numerator = Math.min(denominator, Math.max(0, Math.floor(part.numerator || 0)));
  return {
    groupId: part.groupId,
    numerator,
    denominator,
  };
}

function describePart(part: StructurePart): string {
  const group = findGroup(part.groupId);
  const groupName = group ? group.name : "?";
  const normalizedPart = normalizeFraction(part);
  if ( normalizedPart.numerator === normalizedPart.denominator ) {
    return `${groupName} ${T.ALWAYS}`;
  }
  return `${groupName} ${normalizedPart.numerator}/${normalizedPart.denominator}`;
}

function describeStructure(structure: SyllableStructure): string {
  return structure.parts.map(describePart).join(" ");
}

// ⟪ j͑ʃᴜ ſᶘɔ ⟫

function addSound(): void {
  const value = SOUND_INPUT.value.trim();
  if ( !value ) return;

  const duplicate = state.sounds.some((sound) => sound.value === value);
  if ( duplicate ) {
    setStatus(T.DUPLICATE_SOUND);
    return;
  }

  state.sounds.push({
    id: makeId(),
    value,
  });

  SOUND_INPUT.value = "";
  setStatus(T.ADD_SOUND);
  commit();
}

function removeSound(soundId: string): void {
  state.sounds = state.sounds.filter((sound) => sound.id !== soundId);
  state.groups = state.groups.map((group) => ({
    ...group,
    soundIds: group.soundIds.filter((assignedSoundId) => assignedSoundId !== soundId),
  }));
  commit();
}

function renderSounds(): void {
  resetChildren(SOUND_LIST);
  if ( state.sounds.length === 0 ) {
    SOUND_LIST.appendChild(createEmptyMessage(T.EMPTY_SOUNDS));
    return;
  }

  for ( const sound of state.sounds ) {
    const wrapper = document.createElement("ciihii");
    wrapper.appendChild(createTextElement("span", sound.value));
    wrapper.appendChild(createButton(T.DELETE, () => removeSound(sound.id)));
    SOUND_LIST.appendChild(wrapper);
  }
}

// ⟪ ſ͕ɭwȝ ⟫

function addGroup(): void {
  const name = GROUP_INPUT.value.trim();
  if ( !name ) return;

  const duplicate = state.groups.some((group) => group.name === name);
  if ( duplicate ) {
    setStatus(T.DUPLICATE_GROUP);
    return;
  }

  const group: SoundGroup = {
    id: makeId(),
    name,
    soundIds: [],
  };

  state.groups.push(group);
  state.activeGroupId = group.id;
  GROUP_INPUT.value = "";
  setStatus(T.ADD_GROUP);
  commit();
}

function removeGroup(groupId: string): void {
  state.groups = state.groups.filter((group) => group.id !== groupId);
  state.draftParts = state.draftParts.filter((part) => part.groupId !== groupId);
  state.structures = state.structures
    .map((structure) => ({
      ...structure,
      parts: structure.parts.filter((part) => part.groupId !== groupId),
    }))
    .filter((structure) => structure.parts.length > 0);

  if ( state.activeGroupId === groupId ) {
    state.activeGroupId = state.groups[0]?.id ?? null;
  }

  commit();
}

function selectGroup(groupId: string): void {
  state.activeGroupId = groupId;
  commit();
}

function editGroup(groupId: string, newName: string): void {
  const trimmed = newName.trim();
  if ( !trimmed ) return;
  const duplicate = state.groups.some(g => g.name === trimmed && g.id !== groupId);
  if ( duplicate ) {
    setStatus(T.DUPLICATE_GROUP);
    return;
  }
  const group = findGroup(groupId);
  if ( !group ) return;
  group.name = trimmed;
  commit();
}

function toggleSoundAssignment(soundId: string, assigned: boolean): void {
  const group = state.groups.find((candidate) => candidate.id === state.activeGroupId);
  if ( !group ) return;

  if ( assigned && !group.soundIds.includes(soundId) ) {
    group.soundIds.push(soundId);
  } else if ( !assigned ) {
    group.soundIds = group.soundIds.filter((assignedSoundId) => assignedSoundId !== soundId);
  }

  commit();
}

function renderGroups(): void {
  resetChildren(GROUP_LIST);
  if ( state.groups.length === 0 ) {
    GROUP_LIST.appendChild(createEmptyMessage(T.EMPTY_GROUPS));
    return;
  }

  for ( const group of state.groups ) {
    const wrapper = document.createElement("ciihii");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "phonology-active-group";
    radio.checked = group.id === state.activeGroupId;
    radio.addEventListener("change", () => selectGroup(group.id));

    const nameSpan = createTextElement("span", group.name);
    nameSpan.style.cursor = "pointer";
    nameSpan.title = T.EDIT;
    nameSpan.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = group.name;
      nameSpan.replaceWith(input);
      input.focus();
      input.select();
      const commitEdit = () => {
        editGroup(group.id, input.value);
      };
      input.addEventListener("blur", commitEdit);
      input.addEventListener("keydown", (e) => {
        if ( e.key === "Enter" ) {
          input.blur();
        } else if ( e.key === "Escape" ) {
          input.value = group.name;
          input.blur();
        }
      });
    });

    wrapper.appendChild(radio);
    wrapper.appendChild(nameSpan);
    wrapper.appendChild(createButton(T.DELETE, () => removeGroup(group.id)));
    GROUP_LIST.appendChild(wrapper);
  }
}

function renderAssignments(): void {
  resetChildren(ASSIGNMENT_LIST);
  const activeGroup = state.activeGroupId ? findGroup(state.activeGroupId) : undefined;

  if ( !activeGroup || state.sounds.length === 0 ) {
    ASSIGNMENT_LIST.appendChild(createEmptyMessage(T.EMPTY_ASSIGNMENT));
    return;
  }

  for ( const sound of state.sounds ) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = activeGroup.soundIds.includes(sound.id);
    checkbox.addEventListener("change", () => toggleSoundAssignment(sound.id, checkbox.checked));

    label.appendChild(createTextElement("span", sound.value));
    label.appendChild(checkbox);
    ASSIGNMENT_LIST.appendChild(label);
  }
}

// ⟪ ſɭɔ ʃɔ ſɭʞɹ ⟫

function addDraftPart(groupId: string): void {
  state.draftParts.push({
    groupId,
    numerator: 1,
    denominator: 1,
  });
  commit();
}

function updateDraftPart(index: number, key: "numerator" | "denominator", value: number): void {
  const part = state.draftParts[index];
  if ( !part ) return;

  const nextPart = normalizeFraction({
    ...part,
    [key]: value,
  });

  state.draftParts[index] = nextPart;
  commit();
}

function removeDraftPart(index: number): void {
  state.draftParts.splice(index, 1);
  commit();
}

function clearDraft(): void {
  state.draftParts = [];
  setStatus(T.CLEAR_STRUCTURE);
  commit();
}

function saveStructure(): void {
  if ( state.draftParts.length === 0 ) {
    setStatus(T.NEED_DRAFT);
    return;
  }

  state.structures.push({
    id: makeId(),
    parts: state.draftParts.map(normalizeFraction),
  });
  state.draftParts = [];
  setStatus(T.SAVE_STRUCTURE);
  commit();
}

function removeStructure(structureId: string): void {
  state.structures = state.structures.filter((structure) => structure.id !== structureId);
  commit();
}

function editStructure(structureId: string): void {
  const structure = state.structures.find(s => s.id === structureId);
  if ( !structure ) return;
  state.draftParts = structure.parts.map(p => ({ ...p }));
  state.structures = state.structures.filter(s => s.id !== structureId);
  setStatus(T.EDIT_STRUCTURE);
  commit();
}

function renderStructureGroupButtons(): void {
  resetChildren(STRUCTURE_GROUP_LIST);
  if ( state.groups.length === 0 ) {
    STRUCTURE_GROUP_LIST.appendChild(createEmptyMessage(T.NEED_GROUPS));
    return;
  }

  for ( const group of state.groups ) {
    STRUCTURE_GROUP_LIST.appendChild(createButton(group.name, () => addDraftPart(group.id)));
  }
}

function renderDraftStructure(): void {
  resetChildren(DRAFT_STRUCTURE);
  if ( state.draftParts.length === 0 ) {
    DRAFT_STRUCTURE.appendChild(createEmptyMessage(T.EMPTY_DRAFT));
    return;
  }

  state.draftParts.forEach((part, index) => {
    const normalizedPart = normalizeFraction(part);
    const wrapper = document.createElement("ciihii");

    const label = createTextElement("span", `${T.PART} ${index + 1} ${findGroup(part.groupId)?.name ?? "?"}`);

    const numeratorInput = document.createElement("input");
    numeratorInput.type = "number";
    numeratorInput.min = "0";
    numeratorInput.max = `${normalizedPart.denominator}`;
    numeratorInput.step = "1";
    numeratorInput.value = `${normalizedPart.numerator}`;
    numeratorInput.title = T.NUMERATOR;
    numeratorInput.addEventListener("change", () => updateDraftPart(index, "numerator", Number(numeratorInput.value)));

    const denominatorInput = document.createElement("input");
    denominatorInput.type = "number";
    denominatorInput.min = "1";
    denominatorInput.step = "1";
    denominatorInput.value = `${normalizedPart.denominator}`;
    denominatorInput.title = T.DENOMINATOR;
    denominatorInput.addEventListener("change", () => updateDraftPart(index, "denominator", Number(denominatorInput.value)));

    wrapper.appendChild(label);
    wrapper.appendChild(numeratorInput);
    wrapper.appendChild(denominatorInput);
    wrapper.appendChild(createButton(T.REMOVE, () => removeDraftPart(index)));
    DRAFT_STRUCTURE.appendChild(wrapper);
  });
}

function renderStructures(): void {
  resetChildren(STRUCTURE_LIST);
  if ( state.structures.length === 0 ) {
    STRUCTURE_LIST.appendChild(createEmptyMessage(T.EMPTY_STRUCTURES));
    return;
  }

  state.structures.forEach((structure, index) => {
    const wrapper = document.createElement("ciihii");
    wrapper.appendChild(createTextElement("span", `${T.STRUCTURE} ${index + 1} ${describeStructure(structure)}`));
    wrapper.appendChild(createButton(T.EDIT, () => editStructure(structure.id)));
    wrapper.appendChild(createButton(T.DELETE, () => removeStructure(structure.id)));
    STRUCTURE_LIST.appendChild(wrapper);
  });
}

// ⟪ ſɭʞɹȝ ⟫

function chooseRandom<TItem>(items: TItem[]): TItem | undefined {
  if ( items.length === 0 ) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}

function shouldIncludePart(part: StructurePart): boolean {
  const normalizedPart = normalizeFraction(part);
  if ( normalizedPart.numerator <= 0 ) return false;
  if ( normalizedPart.numerator >= normalizedPart.denominator ) return true;
  return Math.random() < normalizedPart.numerator / normalizedPart.denominator;
}

function generateSyllable(): string | null {
  const structure = chooseRandom(state.structures);
  if ( !structure ) return null;

  let output = "";
  for ( const part of structure.parts ) {
    if ( !shouldIncludePart(part) ) continue;

    const group = findGroup(part.groupId);
    if ( !group || group.soundIds.length === 0 ) {
      return null;
    }

    const soundId = chooseRandom(group.soundIds);
    const sound = soundId ? findSound(soundId) : undefined;
    if ( !sound ) return null;
    output += sound.value;
  }

  return output || null;
}

function generateOutput(): void {
  resetChildren(OUTPUT);

  if ( state.structures.length === 0 ) {
    setStatus(T.NEED_STRUCTURE);
    return;
  }

  const count = Math.max(1, Math.min(0o100, Number(GENERATE_COUNT.value) || 0o20));
  const results: string[] = [];
  let attempts = 0;
  const maxAttempts = count * 0o20;

  while ( results.length < count && attempts < maxAttempts ) {
    attempts++;
    const syllable = generateSyllable();
    if ( syllable ) {
      results.push(syllable);
    }
  }

  if ( results.length === 0 ) {
    setStatus(T.NEED_SOUND_IN_GROUP);
    return;
  }

  for ( const result of results ) {
    const wrapper = document.createElement("ciihii");
    wrapper.appendChild(createTextElement("span", result));
    OUTPUT.appendChild(wrapper);
  }

  setStatus(`${T.GENERATED} ${results.length}`);
}

// ⟪ j͑ʃᴜꞇ ⟫

function renderAll(): void {
  if ( state.activeGroupId && !findGroup(state.activeGroupId) ) {
    state.activeGroupId = state.groups[0]?.id ?? null;
  }

  renderSounds();
  renderGroups();
  renderAssignments();
  renderStructureGroupButtons();
  renderDraftStructure();
  renderStructures();

  if ( typeof vacepu === "function" ) {
    vacepu("cepufal");
  }
}

function commit(): void {
  saveState();
  renderAll();
}

function setPlaceholders(): void {
  const placeholders = document.querySelectorAll<HTMLInputElement>("[data-oskakefani-placeholder]");
  placeholders.forEach((input) => {
    const key = input.dataset.oskakefaniPlaceholder;
    if ( !key ) return;
    const text = language === "en"
      ? ( key === "ʃɔ ı" ? "Sound string" : "Group name" )
      : key;
    input.placeholder = text;
  });
}

ADD_SOUND_BUTTON.addEventListener("click", addSound);
SOUND_INPUT.addEventListener("keydown", (event) => {
  if ( event.key === "Enter" ) addSound();
});

ADD_GROUP_BUTTON.addEventListener("click", addGroup);
GROUP_INPUT.addEventListener("keydown", (event) => {
  if ( event.key === "Enter" ) addGroup();
});

CLEAR_DRAFT_BUTTON.addEventListener("click", clearDraft);
SAVE_STRUCTURE_BUTTON.addEventListener("click", saveStructure);
GENERATE_BUTTON.addEventListener("click", generateOutput);

setPlaceholders();
renderAll();
setStatus(T.READY);

export {};
