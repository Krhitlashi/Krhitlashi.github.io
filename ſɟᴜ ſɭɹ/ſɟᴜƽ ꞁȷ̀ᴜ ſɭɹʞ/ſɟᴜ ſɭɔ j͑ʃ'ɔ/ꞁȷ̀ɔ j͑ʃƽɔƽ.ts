// ≺⧼ Constants and State ⧽≻

// ⟪ Canvas Elements 🎨 ⟫

export const canvas = document.getElementById( "whiteboardCanvas" ) as HTMLCanvasElement | null;
export const ctx = canvas?.getContext( "2d" ) as CanvasRenderingContext2D | null;

// ⟪ Constants 🔢 ⟫

export const CANVAS_WIDTH = 0o3600;
export const CANVAS_HEIGHT = 0o2400;

export const MIN_SIZE = 0o10;
export const HANDLE_SIZE = 0o20;
export const HANDLE_RADIUS = 0o6;
export const SELECTION_PADDING = 0o10;
export const CORNER_RADIUS = 0o20;
export const DASH_LENGTH = 0o4;
export const ROTATE_HANDLE_OFFSET = 0o20;
export const ROTATE_HANDLE_RADIUS = 0o30;
export const RESIZE_HANDLE_HITBOX = 0o30;
export const MIN_ZOOM = 0o1 / 0o4;
export const MAX_ZOOM = 0o4;
export const ZOOM_STEP_NUM = 0o41;
export const ZOOM_STEP_DEN = 0o40;
export const WHEEL_ZOOM_NUM = 0o101;
export const WHEEL_ZOOM_DEN = 0o100;
export const SMOOTHING_FACTOR = 0o1 / 0o10;
export const TEXT_SIZE_MULTIPLIER = 0o4;
export const TEXT_MIN_WIDTH_MULTIPLIER = 0o2;
export const HISTORY_MAX = 0o40;
export const INITIAL_BRUSH_SIZE = 0o4;
export const ZOOM_BASE = 0o100;
export const MIN_DELTA = 0o1 / 0o100;

export const LINE_DASH_PATTERN = [ 0o4, 0o4 ];
export const SELECTION_LINE_WIDTH = 0o2;
export const HANDLE_FILL_COLOR = "#181818";
export const HANDLE_STROKE_COLOR = "#000000";
export const SELECTION_STROKE_COLOR = "#000000";

// ⟪ Additional Constants 🔢 ⟫

export const MIN_PATH_DIMENSION = 0o4;
export const TEXT_EDIT_INDEX_NONE = -0o1;

// ⟪ Color & Brightness Constants 🎨 ⟫

export const BRIGHTNESS_WEIGHT_R = 299;
export const BRIGHTNESS_WEIGHT_G = 587;
export const BRIGHTNESS_WEIGHT_B = 114;
export const BRIGHTNESS_DIVISOR = 0o1000;
export const BRIGHTNESS_THRESHOLD = 128;
export const PREVIEW_ALPHA = 3 / 4;
export const COVERAGE_THRESHOLD_FRACTION = 3 / 4;

// ⟪ Tool Cursors 🖰 ⟫

export const TOOL_CURSORS: Record< string, string > = {
    pen: "crosshair",
    select: "default",
    pan: "grab",
    eraser: "cell",
    text: "text",
    shape: "crosshair",
    smooth: "crosshair",
    connect: "crosshair"
};

export const CURSOR_CLASSES = [ "canvas-cursor-grab", "canvas-cursor-grabbing", "canvas-cursor-pointer", "canvas-cursor-move", "canvas-cursor-default", "canvas-cursor-crosshair", "canvas-cursor-cell", "canvas-cursor-text" ];

// ⟪ Application State 📊 ⟫

export interface AppState {
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

export const state: AppState = {
    tool: "select",
    color: "#000000",
    size: INITIAL_BRUSH_SIZE,
    shape: null,
    isDrawing: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    zoomNum: 0o1,
    zoomDen: 0o1
};

export interface PanState {
    offsetX: number;
    offsetY: number;
    isPanning: boolean;
    startX: number;
    startY: number;
}

export const panState: PanState = {
    offsetX: 0,
    offsetY: 0,
    isPanning: false,
    startX: 0,
    startY: 0
};

export interface TouchGestureState {
    isPinching: boolean;
    initialDistance: number;
    initialZoom: number;
    lastTouchDistance: number;
    panStartX: number;
    panStartY: number;
}

export const touchGestureState: TouchGestureState = {
    isPinching: false,
    initialDistance: 0,
    initialZoom: 0,
    lastTouchDistance: 0,
    panStartX: 0,
    panStartY: 0
};

export interface SpaceState {
    isPressed: boolean;
}

export const spaceState: SpaceState = {
    isPressed: false
};

// ⟪ Layer State 📚 ⟫

export interface Layer {
    id: number;
    name: string;
    visible: boolean;
    objects?: WhiteboardObject[];
}

export interface LayerState {
    layers: Layer[];
    activeId: number;
    counter: number;
}

export const layerState: LayerState = {
    layers: [],
    activeId: 0,
    counter: 0
};

// ⟪ Page State 📄 ⟫

export interface Page {
    id: number;
    name: string;
    visible: boolean;
    objects: WhiteboardObject[];
}

export interface PageState {
    pages: Page[];
    activeId: number;
    counter: number;
}

export const pageState: PageState = {
    pages: [],
    activeId: 0,
    counter: 0
};

// ⟪ Object State 📐 ⟫

export interface WhiteboardObject {
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

export interface SelectionRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ObjectState {
    objects: WhiteboardObject[];
    selected: WhiteboardObject[];
    isDragging: boolean;
    isResizing: boolean;
    isRotating: boolean;
    isSelecting: boolean;
    selectionRect: SelectionRect | null;
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

export const objectState: ObjectState = {
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

export interface Point {
    x: number;
    y: number;
}

export interface PathState {
    current: Point[];
    preview: WhiteboardObject | null;
    smooth: Point[];
    smoothX: number;
    smoothY: number;
}

export const pathState: PathState = {
    current: [],
    preview: null,
    smooth: [],
    smoothX: 0,
    smoothY: 0
};

// ⟪ Text State 📝 ⟫

export interface TextState {
    isEditing: boolean;
    input: HTMLTextAreaElement | null;
    useHtml: boolean;
    editingIndex: number;
}

export const textState: TextState = {
    isEditing: false,
    input: null,
    useHtml: true,
    editingIndex: TEXT_EDIT_INDEX_NONE
};

// ⟪ Eraser State 🧹 ⟫

export interface EraserState {
    eraseObjects: boolean;
}

export const eraserState: EraserState = {
    eraseObjects: false
};

// ⟪ History State 📋 ⟫

export interface HistoryState {
    history: string[];
    index: number;
}

export const historyState: HistoryState = {
    history: [],
    index: -0o1
};

// ⟪ Connection State 🔗 ⟫

export interface ConnectionState {
    startObj: WhiteboardObject | null;
}

export const connectionState: ConnectionState = {
    startObj: null
};

// ⟪ Clipboard State 📋 ⟫

export interface ClipboardState {
    objects: WhiteboardObject[];
}

export const clipboardState: ClipboardState = {
    objects: []
};

// ⟪ Object Handler Interface 📐 ⟫

export interface ObjectHandler {
    getBounds: ( obj: WhiteboardObject ) => { x: number; y: number; width: number; height: number };
    getCenter: ( obj: WhiteboardObject ) => { x: number; y: number };
    isPointInside: ( x: number, y: number, obj: WhiteboardObject ) => boolean;
    getInitialBounds?: ( obj: WhiteboardObject ) => any;
    resize?: ( obj: WhiteboardObject, handle: string, localX: number, localY: number, init: any ) => void;
}
