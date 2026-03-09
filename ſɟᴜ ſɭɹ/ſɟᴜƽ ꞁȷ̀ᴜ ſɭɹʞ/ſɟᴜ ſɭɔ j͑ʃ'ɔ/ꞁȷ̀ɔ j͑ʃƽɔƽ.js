// ≺⧼ Constants and Variables ⧽≻

// ⟪ Canvas Elements 🎨 ⟫
const canvas = document.getElementById( "whiteboardCanvas" );
const ctx = canvas.getContext( "2d" );

// ⟪ Magic Numbers - Named Constants 🔢 ⟫
const CANVAS_WIDTH = 0o3577;
const CANVAS_HEIGHT = 0o2400;

const MIN_SIZE = 0o10;
const HANDLE_SIZE = 0o20;
const HANDLE_RADIUS = 0o6;
const SELECTION_PADDING = 0o10;
const CORNER_RADIUS = 0o20;
const DASH_LENGTH = 0o4;
const ROTATE_HANDLE_OFFSET = 0o20;
const ROTATE_HANDLE_RADIUS = 0o30;
const RESIZE_HANDLE_HITBOX = 0o30;
const MIN_ZOOM = 0o1 / 0o4;
const MAX_ZOOM = 0o4;
const ZOOM_STEP_NUM = 0o41;
const ZOOM_STEP_DEN = 0o40;
const WHEEL_ZOOM_NUM = 0o101;
const WHEEL_ZOOM_DEN = 0o100;
const SMOOTHING_FACTOR = 0o1 / 0o10;
const TEXT_SIZE_MULTIPLIER = 0o4;
const TEXT_MIN_WIDTH_MULTIPLIER = 0o2;
const HISTORY_MAX = 0o40;
const INITIAL_BRUSH_SIZE = 0o4;

const LINE_DASH_PATTERN = [ 0o4, 0o4 ];
const SELECTION_LINE_WIDTH = 0o2;
const HANDLE_FILL_COLOR = "#181818";
const HANDLE_STROKE_COLOR = "#000000";
const SELECTION_STROKE_COLOR = "#000000";

// ⟪ Global State 📊 ⟫
let currentTool = "select";
let currentColor = "#000000";
let currentSize = INITIAL_BRUSH_SIZE;
let isDrawing = false;
let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;
let zoomNum = 0o1;
let zoomDen = 0o1;
let currentShape = null;

let history = [];
let historyIndex = -0o1;

let panOffsetX = 0;
let panOffsetY = 0;
let isPanning = false;
let panStartX = 0;
let panStartY = 0;
let isSpacePressed = false;

let layers = [];
let activeLayerId = 0;
let layerCounter = 0;

let objects = [];
let selectedObjects = [];
let isDragging = false;
let isResizing = false;
let isRotating = false;
let isSelecting = false;
let selectionRect = null;
let resizeHandle = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let dragStartX = 0;
let dragStartY = 0;
let initialRotationAngle = 0;
let initialObjectRotations = [];
let initialBounds = null;
let initialCenterX = 0;
let initialCenterY = 0;
let initialRotation = 0;
let initialObjectStates = [];

let currentPath = [];
let previewShape = null;
let smoothPath = [];
let smoothX = 0;
let smoothY = 0;

let isEditingText = false;
let textEditInput = null;
let useHtmlText = true;
let editingTextObjectIndex = -0o1;

let eraserEraseObjects = false;
