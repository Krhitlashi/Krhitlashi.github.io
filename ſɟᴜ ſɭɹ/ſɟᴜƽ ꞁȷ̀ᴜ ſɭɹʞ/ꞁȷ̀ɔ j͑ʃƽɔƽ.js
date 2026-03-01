// ≺⧼ ꞁȷ̀ɔ j͑ʃƽɔƽ - Constants and Variables ⧽≻

// ⟪ Canvas Elements 🎨 ⟫
const canvas = document.getElementById("whiteboardCanvas");
const ctx = canvas.getContext("2d");


// ⟪ Global State 📊 ⟫

let currentTool = "select";
let currentColor = "#000000";
let currentSize = 0o4;
let isDrawing = false;
let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;
let zoomNum = 0o1;
let zoomDen = 0o1;
let currentShape = null;

let history = [];
let historyIndex = -1;
const maxHistory = 0o40;

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
let editingTextObjectIndex = -1;

let eraserEraseObjects = false;
