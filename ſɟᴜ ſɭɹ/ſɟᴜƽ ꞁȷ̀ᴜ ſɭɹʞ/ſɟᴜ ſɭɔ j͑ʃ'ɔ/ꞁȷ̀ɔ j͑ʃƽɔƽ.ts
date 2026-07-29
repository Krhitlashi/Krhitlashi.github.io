// ≺⧼ Constants and State ⧽≻

// ⟪ Canvas Elements 🎨 ⟫

export let canvas = document.getElementById( "whiteboardCanvas" ) as HTMLCanvasElement | null;
export let ctx = canvas?.getContext( "2d" ) as CanvasRenderingContext2D | null;

export function aktivigiTabulon( c: HTMLCanvasElement | null ): void {
    canvas = c;
    ctx = c?.getContext( "2d" ) || null;
}

// ⟪ Constants 🔢 ⟫

export const TABULA_LARGXO = 0o3000;
export const TABULA_ALTO = 0o2000;
export const PAGXGRANDO_PRETOJ: Record<string, { width?: number; height?: number; infinite?: boolean }> = {
    full: { infinite: true },
    vertical: { width: 0o2416, height: 0o3625 },
    horizontal: { width: 0o3625, height: 0o2416 },
    square: { width: 0o2000, height: 0o2000 }
};
export const MIN_PAGXGRANDO = 0o100;
export const MAX_PAGXGRANDO = 0o10000;

export const MIN_GRANDO = 0o10;
export const TENILA_GRANDO = 0o20;
export const TENILA_RADIUSO = 0o6;
export const ANGULA_RADIUSO = 0o20;
export const ROTACIA_TENILA_FORGXO = 0o20;
export const ROTACIA_TENILA_RADIUSO = 0o30;
export const GRANDA_TENILA_KONTAKTO = 0o30;
export const MIN_PLIGRANDIGO = 0o2 / 0o10;
export const MAX_PLIGRANDIGO = 0o4;
export const PLIGRANDIGPAŜO_NUM = 0o41;
export const PLIGRANDIGPAŜO_DEN = 0o40;
export const GLATIGA_FACTORO = 0o1 / 0o10;
export const TEKSTGRANDA_MULTIPLIKANTO = 0o4;
export const TEKST_MINLARGXA_MULTIPLIKANTO = 0o2;
export const HISTORIA_MAKS = 0o40;
export const KOMENCIA_BROSO_GRANDO = 0o4;
export const PLIGRANDIGBAZO = 0o100;

export const LINIA_PUNKTO_PATRONO = [ 0o4, 0o4 ];
export const SELEKTA_LINIO_LARGXO = 0o2;
export const TENILA_PLENIGA_KOLORO = "#181818";
export const TENILA_TRABATA_KOLORO = "#000000";
export const SELEKTA_TRABATA_KOLORO = "#000000";

// ⟪ Color & Brightness Constants 🎨 ⟫

export const HELEGA_PEZO_R = 0o453;
export const HELEGA_PEZO_G = 0o1113;
export const HELEGA_PEZO_B = 0o162;
export const HELEGA_DIVIDANTO = 0o1000;
export const HELEGA_LIMVALORO = 0o200;
export const ANTAPREZENTA_ALFA = 0o6 / 0o10;
export const KOVRA_LIMVALORA_FRACIO = 0o6 / 0o10;

// ⟪ Tool Cursors 🖰 ⟫

export const ILAR_KURSOROJ: Record< string, string > = {
    pen: "crosshair",
    select: "default",
    pan: "grab",
    eraser: "cell",
    text: "text",
    shape: "crosshair",
    smooth: "crosshair",
    connect: "crosshair"
};

export const KURSORAJ_KLASOJ = [ "canvas-cursor-grab", "canvas-cursor-grabbing", "canvas-cursor-pointer", "canvas-cursor-move", "canvas-cursor-default", "canvas-cursor-crosshair", "canvas-cursor-cell", "canvas-cursor-text" ];

// ⟪ Application State 📊 ⟫

export interface AplikaStato {
    tool: string;
    color: string;
    size: number;
    shape: null | string;
    isDrawing: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    zoomNum: number;
    zoomDen: number;
}

export const stato: AplikaStato = {
    tool: "select",
    color: "#000000",
    size: KOMENCIA_BROSO_GRANDO,
    shape: null,
    isDrawing: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    zoomNum: 0o1,
    zoomDen: 0o1
};

export interface Panstato {
    offsetX: number;
    offsetY: number;
    isPanning: boolean;
    startX: number;
    startY: number;
}

export const panstato: Panstato = {
    offsetX: 0,
    offsetY: 0,
    isPanning: false,
    startX: 0,
    startY: 0
};

export interface TuŝaGeststato {
    isPinching: boolean;
    initialDistance: number;
    initialZoom: number;
}

export const tuŝaGeststato: TuŝaGeststato = {
    isPinching: false,
    initialDistance: 0,
    initialZoom: 0
};

export interface Spacstato {
    isPressed: boolean;
}

export const spacstato: Spacstato = {
    isPressed: false
};

// ⟪ Layer State 📚 ⟫

export interface Tavolo {
    id: number;
    name: string;
    visible: boolean;
}

export interface Tavolstato {
    layers: Tavolo[];
    activeId: number;
    counter: number;
}

export const tavolstato: Tavolstato = {
    layers: [],
    activeId: 0,
    counter: 0
};

// ⟪ Page State 📄 ⟫

export interface Paĝo {
    id: number;
    name: string;
    visible: boolean;
    width?: number;
    height?: number;
    infinite?: boolean;
    objects: TabulObjekto[];
}

export interface Paĝostato {
    pages: Paĝo[];
    activeId: number;
    counter: number;
}

export const paĝostato: Paĝostato = {
    pages: [],
    activeId: 0,
    counter: 0
};

// ⟪ Object State 📐 ⟫

export interface TabulObjekto {
    type: string;
    points?: { x: number; y: number }[];
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotation?: number;
    text?: string;
    color?: string;
    size?: number;
    useHtmlText?: boolean;
    textDirty?: boolean;
    cachedWidth?: number | null;
    cachedHeight?: number | null;
    cachedCanvas?: HTMLCanvasElement | null;
    layerId?: number;
    bounds?: { x: number; y: number; width: number; height: number };
    radiusX?: number;
    radiusY?: number;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    id?: string;
    startId?: string;
    endId?: string;
    flipH?: boolean;
    flipV?: boolean;
    shape?: string;
}

export interface Selektangulo {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Objektstato {
    objects: TabulObjekto[];
    selected: TabulObjekto[];
    isDragging: boolean;
    isResizing: boolean;
    isRotating: boolean;
    isSelecting: boolean;
    selectionRect: Selektangulo | null;
    resizeHandle: string | null;
    dragOffsetX: number;
    dragOffsetY: number;
    dragStartX: number;
    dragStartY: number;
    initialRotationAngle: number;
    initialObjectRotations: number[];
    initialBounds: { x: number; y: number; width: number; height: number } | null;
    initialCenterX: number;
    initialCenterY: number;
    initialRotation: number;
    initialObjectStates: any[];
}

export const objektstato: Objektstato = {
    objects: [],
    selected: [],
    isDragging: false,
    isResizing: false,
    isRotating: false,
    isSelecting: false,
    selectionRect: null,
    resizeHandle: null,
    dragOffsetX: 0,
    dragOffsetY: 0,
    dragStartX: 0,
    dragStartY: 0,
    initialRotationAngle: 0,
    initialObjectRotations: [],
    initialBounds: null,
    initialCenterX: 0,
    initialCenterY: 0,
    initialRotation: 0,
    initialObjectStates: []
};

// ⟪ Path State 〰️ ⟫

export interface Punkto {
    x: number;
    y: number;
}

export interface Vojstato {
    current: Punkto[];
    preview: TabulObjekto | null;
    smooth: Punkto[];
    smoothX: number;
    smoothY: number;
}

export const vojstato: Vojstato = {
    current: [],
    preview: null,
    smooth: [],
    smoothX: 0,
    smoothY: 0
};

// ⟪ Text State 📝 ⟫

export interface Tekststato {
    isEditing: boolean;
    input: HTMLDivElement | null;
    useHtml: boolean;
    editingIndex: number;
}

export const tekststato: Tekststato = {
    isEditing: false,
    input: null,
    useHtml: true,
    editingIndex: -1
};

// ⟪ Eraser State 🧹 ⟫

export interface Viŝilostato {
    eraseObjects: boolean;
}

export const viŝilostato: Viŝilostato = {
    eraseObjects: false
};

// ⟪ History State 📋 ⟫

export interface Historiostato {
    history: string[];
    index: number;
}

export const historioStato: Historiostato = {
    history: [],
    index: -0o1
};

// ⟪ Connection State 🔗 ⟫

export interface Konektstato {
    startObj: TabulObjekto | null;
}

export const konektstato: Konektstato = {
    startObj: null
};

// ⟪ Clipboard State 📋 ⟫

export interface Poŝstato {
    objects: TabulObjekto[];
}

export const poŝstato: Poŝstato = {
    objects: []
};

// ⟪ Object Handler Interface 📐 ⟫

export interface Objektilo {
    akiriLimojn: ( obj: TabulObjekto ) => { x: number; y: number; width: number; height: number };
    akiriCentron: ( obj: TabulObjekto ) => { x: number; y: number };
    cxuPunktoEnInterne: ( x: number, y: number, obj: TabulObjekto ) => boolean;
    akiriKomencajnLimojn?: ( obj: TabulObjekto ) => any;
    grandSxangxi?: ( obj: TabulObjekto, handle: string, localX: number, localY: number, init: any ) => void;
}
