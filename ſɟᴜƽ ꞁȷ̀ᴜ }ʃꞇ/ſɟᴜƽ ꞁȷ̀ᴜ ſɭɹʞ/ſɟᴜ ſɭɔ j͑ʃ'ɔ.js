// ⟪ ſɟᴜ ſɭɔ j͑ʃ'ɔ - Whiteboard Application ⟫

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
let initialRotationAngle = 0;
let initialObjectRotations = [];

let currentPath = [];
let previewShape = null;
let smoothPath = [];
let smoothX = 0;
let smoothY = 0;

let isEditingText = false;
let textEditInput = null;
let useHtmlText = true;
let editingTextObjectIndex = -1;


// ⟪ Helper Functions 🔧 ⟫

function resetCursor() {
    if (!isSpacePressed) {
        setCursor(getToolCursor());
    }
}

function setCursor(cursorType) {
    canvas.classList.remove(
        'canvas-cursor-grab', 'canvas-cursor-grabbing', 'canvas-cursor-pointer',
        'canvas-cursor-move', 'canvas-cursor-default', 'canvas-cursor-crosshair',
        'canvas-cursor-cell', 'canvas-cursor-text'
    );
    canvas.classList.add(`canvas-cursor-${cursorType}`);
}

function positionTextEditInput(x, y, size, color) {
    const zoom = zoomNum / zoomDen;
    const container = document.getElementById("whiteboardContainer");
    const containerRect = container.getBoundingClientRect();

    textEditInput.style.setProperty("--text-x", ((x * zoom) + containerRect.left + panOffsetX) + "px");
    textEditInput.style.setProperty("--text-y", (((y - size) * zoom) + containerRect.top + panOffsetY) + "px");
    textEditInput.style.setProperty("--text-size", (size * zoom) + "px");
    textEditInput.style.setProperty("--text-color", color);
}

function getTextEditPosition() {
    const zoom = zoomNum / zoomDen;
    const container = document.getElementById("whiteboardContainer");
    const containerRect = container.getBoundingClientRect();

    const x = ((parseFloat(textEditInput.style.getPropertyValue("--text-x")) - containerRect.left - panOffsetX) / zoom);
    const y = (((parseFloat(textEditInput.style.getPropertyValue("--text-y")) - containerRect.top - panOffsetY) / zoom) + currentSize * 0o4);

    return { textX: x, textY: y };
}

function getObjectBounds(obj) {
    let bounds;
    if (obj.type === "line") {
        bounds = {
            x: Math.min(obj.x1, obj.x2),
            y: Math.min(obj.y1, obj.y2),
            width: Math.abs(obj.x2 - obj.x1),
            height: Math.abs(obj.y2 - obj.y1)
        };
    } else if (obj.type === "circle") {
        bounds = {
            x: obj.x - obj.radiusX,
            y: obj.y - obj.radiusY,
            width: obj.radiusX * 2,
            height: obj.radiusY * 2
        };
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        bounds = {
            x: obj.bounds.x,
            y: obj.bounds.y,
            width: obj.bounds.width,
            height: obj.bounds.height
        };
    } else if (obj.type === "text") {
        if (obj.useHtmlText && obj.cachedWidth && obj.cachedHeight) {
            bounds = {
                x: obj.x,
                y: obj.y - obj.cachedHeight,
                width: obj.cachedWidth,
                height: obj.cachedHeight
            };
        } else {
            ctx.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
            const metrics = ctx.measureText(obj.text || "W");
            const width = Math.max(metrics.width, obj.size * 0o2);
            const height = Math.max(obj.size, obj.size * 0o2);
            bounds = {
                x: obj.x,
                y: obj.y - height,
                width: width,
                height: height
            };
        }
    } else {
        bounds = {
            x: obj.x,
            y: obj.y,
            width: obj.width || 0o100,
            height: obj.height || 0o100
        };
    }
    return bounds;
}


// ⟪ Initialization 🚀 ⟫

function init() {
    initCanvas();
    initLayers();
    createTextEditInput();
    initColors();
    initTools();
    initShapes();
    initSizeSlider();
    initToolbar();
    initCanvasEvents();
    initActions();
    initLayerControls();
    initTransformControls();
    initZoom();
    initFileOperations();
    saveState();
}

function initCanvas() {
    const container = document.getElementById("whiteboardContainer");

    canvas.width = 0o3000;
    canvas.height = 0o2100;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.getElementById("canvasSize").textContent = `${canvas.width} × ${canvas.height}`;
}

function initLayers() {
    layers = [{
        id: 0,
        name: "ꞙɭı ɭ(ꞇ ɭʃᴜ }ʃɔƽ",
        visible: true,
        objects: []
    }];
    activeLayerId = 0;
    layerCounter = 1;
    renderLayerList();
}


// ⟪ Layer Management 📚 ⟫

function addLayer() {
    layerCounter++;
    const newLayer = {
        id: layerCounter,
        name: `ꞙɭ${layerCounter} ɭ(ꞇ ɭʃᴜ }ʃɔƽ`,
        visible: true,
        objects: []
    };
    layers.push(newLayer);
    activeLayerId = layerCounter;
    renderLayerList();
    saveState();
}

function deleteLayer() {
    if (layers.length <= 1) return;
    
    const layerIndex = layers.findIndex(l => l.id === activeLayerId);
    if (layerIndex > -1) {
        objects = objects.filter(obj => obj.layerId !== activeLayerId);
        layers.splice(layerIndex, 1);
        activeLayerId = layers[0].id;
        renderLayerList();
        redrawCanvas();
        saveState();
    }
}

function moveLayerUp() {
    swapLayers(1);
}

function moveLayerDown() {
    swapLayers(-1);
}

function swapLayers(direction) {
    const layerIndex = layers.findIndex(l => l.id === activeLayerId);
    const swapIndex = layerIndex + direction;
    if (swapIndex < 0 || swapIndex >= layers.length) return;
    
    [layers[layerIndex], layers[swapIndex]] = [layers[swapIndex], layers[layerIndex]];
    renderLayerList();
    saveState();
}

function toggleLayerVisibility(layerId) {
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
        layer.visible = !layer.visible;
        renderLayerList();
        redrawCanvas();
        saveState();
    }
}

function selectLayer(layerId) {
    activeLayerId = layerId;
    renderLayerList();
}

function renderLayerList() {
    const layerList = document.getElementById("layerList");
    if (!layerList) return;

    layerList.innerHTML = "";

    layers.slice().reverse().forEach(layer => {
        const layerItem = document.createElement("button");
        layerItem.setAttribute("aria-pressed", layer.id === activeLayerId ? "true" : "false");
        layerItem.innerHTML = `
            <span>${layer.name}</span>
            <span class="layer-visibility" style="--visibility: ${layer.visible ? 'visible' : 'hidden'}"></span>
        `;
        layerItem.addEventListener("click", (e) => {
            if (e.target.classList.contains("layer-visibility")) {
                toggleLayerVisibility(layer.id);
            } else {
                selectLayer(layer.id);
            }
        });
        layerList.appendChild(layerItem);
    });
}


// ⟪ Text Editing 📝 ⟫

function createTextEditInput() {
    if (textEditInput) return;

    textEditInput = document.createElement("textarea");
    textEditInput.className = "text-edit-input";

    textEditInput.addEventListener("blur", finishTextEditing);
    textEditInput.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            e.preventDefault();
            cancelTextEditing();
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            finishTextEditing();
        }
    });
    textEditInput.addEventListener("input", () => {
        if (editingTextObjectIndex >= 0 && objects[editingTextObjectIndex]) {
            const obj = objects[editingTextObjectIndex];
            obj.text = textEditInput.value;
            obj.textDirty = true;
            obj.cachedCanvas = null;
            obj.cachedWidth = null;
            obj.cachedHeight = null;
            redrawCanvas();
        }
    });

    document.getElementById("whiteboardContainer").appendChild(textEditInput);
}

function startTextEditing(x, y, existingText = null) {
    if (!textEditInput) createTextEditInput();

    isEditingText = true;
    positionTextEditInput(x, y, currentSize * 0o4, currentColor);
    textEditInput.value = existingText || "";
    textEditInput.classList.add("visible");
    textEditInput.focus();

    const autoResize = () => {
        textEditInput.style.height = "auto";
        textEditInput.style.height = textEditInput.scrollHeight + "px";
    };
    autoResize();
    textEditInput.addEventListener("input", autoResize, { once: true });
}

function finishTextEditing() {
    if (!isEditingText || !textEditInput) return;

    const text = textEditInput.value;

    if (editingTextObjectIndex >= 0 && objects[editingTextObjectIndex]) {
        const obj = objects[editingTextObjectIndex];

        if (text.trim() === "") {
            objects.splice(editingTextObjectIndex, 1);
            selectedObjects = [];
        } else {
            obj.text = text;
            obj.color = currentColor;
            obj.textDirty = true;
            obj.cachedCanvas = null;
            obj.cachedWidth = null;
            obj.cachedHeight = null;
        }
        redrawCanvas();
        saveState();
    } else if (text.trim() !== "") {
        const { textX, textY } = getTextEditPosition();

        const textObj = {
            type: "text",
            x: textX,
            y: textY,
            text: text,
            color: currentColor,
            size: currentSize * 0o4,
            rotation: 0,
            layerId: activeLayerId,
            useHtmlText: useHtmlText,
            textDirty: true,
            cachedWidth: null,
            cachedHeight: null
        };
        objects.push(textObj);
        redrawCanvas();
        saveState();
    }

    textEditInput.classList.remove("visible");
    textEditInput.value = "";
    isEditingText = false;
    editingTextObjectIndex = -1;
}

function cancelTextEditing() {
    if (!isEditingText || !textEditInput) return;

    if (editingTextObjectIndex >= 0 && objects[editingTextObjectIndex]) {
        const obj = objects[editingTextObjectIndex];
        if (obj.text.trim() === "") {
            objects.splice(editingTextObjectIndex, 1);
            selectedObjects = [];
            updateTransformControls();
            redrawCanvas();
            saveState();
        }
    }

    textEditInput.classList.remove("visible");
    textEditInput.value = "";
    isEditingText = false;
    editingTextObjectIndex = -1;
}

function editTextObject(obj) {
    if (!textEditInput) createTextEditInput();

    isEditingText = true;
    editingTextObjectIndex = objects.indexOf(obj);
    positionTextEditInput(obj.x, obj.y, obj.size, obj.color);
    textEditInput.value = obj.text;
    textEditInput.classList.add("visible");
    textEditInput.focus();
    textEditInput.select();
}


// ⟪ UI Initialization 🎨 ⟫

function setButtonPressed(groupSelector, btn) {
    document.querySelectorAll(groupSelector).forEach(b => b.setAttribute("aria-pressed", "false"));
    if (btn) btn.setAttribute("aria-pressed", "true");
}

function initButtonGroup(selector, groupSelector, onClick) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.addEventListener("click", () => {
            if (groupSelector) setButtonPressed(groupSelector, btn);
            onClick(btn);
        });
    });
}

function initButton(id, onClick) {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", onClick);
}

function initColors() {
    const colorGrid = document.getElementById("colorGrid");
    if (!colorGrid) return;

    initButtonGroup("#colorGrid button[data-color]", "#colorGrid button", (btn) => {
        currentColor = btn.dataset.color;
    });

    initCustomColor();
}

function initCustomColor() {
    const colorPicker = document.getElementById("customColor");
    const hexInput = document.getElementById("hexColor");

    if (!colorPicker || !hexInput) return;

    colorPicker.addEventListener("input", () => {
        const color = colorPicker.value;
        hexInput.value = color.toUpperCase();
        currentColor = color;
        setButtonPressed("#colorGrid button", null);
    });

    hexInput.addEventListener("input", () => {
        let value = hexInput.value;
        if (!value.startsWith("#")) {
            value = "#" + value;
        }
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            colorPicker.value = value;
            currentColor = value;
            setButtonPressed("#colorGrid button", null);
        }
    });

    hexInput.addEventListener("blur", () => {
        let value = hexInput.value;
        if (!value.startsWith("#")) {
            value = "#" + value;
        }
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            hexInput.value = value.toUpperCase();
        }
    });
}

function initTools() {
    initButtonGroup("button[data-tool]", "button[data-tool]", (btn) => {
        currentTool = btn.dataset.tool;
        canvas.dataset.tool = currentTool;
        updateTransformControls();
        if (!isPanning && !isDrawing) {
            setCursor(getToolCursor());
        }
    });

    initHtmlTextToggle();
}

function initHtmlTextToggle() {
    const htmlTextCheckbox = document.getElementById("htmlTextCheckbox");
    if (!htmlTextCheckbox) return;
    
    // Set initial state (checked by default in HTML)
    useHtmlText = htmlTextCheckbox.checked;
    
    htmlTextCheckbox.addEventListener("change", () => {
        useHtmlText = htmlTextCheckbox.checked;
    });
}

function initShapes() {
    initButtonGroup("button[data-shape]", "button[data-shape]", (btn) => {
        currentShape = btn.dataset.shape;
        currentTool = "shape";
        canvas.dataset.tool = "shape";
        updateTransformControls();
        if (!isPanning && !isDrawing) {
            setCursor(getToolCursor());
        }
    });
}

function initSizeSlider() {
    const slider = document.getElementById("brushSize");
    const valueDisplay = document.getElementById("brushSizeValue");
    
    slider.addEventListener("input", () => {
        currentSize = parseInt(slider.value);
        valueDisplay.textContent = currentSize;
    });
}

function initToolbar() {
    const toolbar = document.getElementById("toolbarContainer");
    initButton("toolbarToggle", () => {
        if (toolbar) atlesoza(toolbar);
    });
}


// ⟪ History & Undo/Redo 📚 ⟫

function saveState() {
    history = history.slice(0, historyIndex + 1);
    
    const state = {
        layers: JSON.parse(JSON.stringify(layers)),
        objects: JSON.parse(JSON.stringify(objects))
    };
    
    history.push(JSON.stringify(state));
    historyIndex++;
    
    if (history.length > maxHistory) {
        history.shift();
        historyIndex--;
    }
    
    updateUndoRedoButtons();
}

function undo() {
    return changeHistory(-1);
}

function redo() {
    return changeHistory(1);
}

function changeHistory(direction) {
    const newIndex = historyIndex + direction;
    if (newIndex < 0 || newIndex >= history.length) return;
    
    historyIndex = newIndex;
    const state = JSON.parse(history[historyIndex]);
    layers = state.layers;
    objects = state.objects;
    renderLayerList();
    redrawCanvas();
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    const undoBtns = [document.getElementById("undoBtn"), document.getElementById("quickUndo")];
    const redoBtns = [document.getElementById("redoBtn"), document.getElementById("quickRedo")];

    undoBtns.forEach(btn => {
        if (btn) btn.disabled = historyIndex <= 0;
    });

    redoBtns.forEach(btn => {
        if (btn) btn.disabled = historyIndex >= history.length - 1;
    });
}


// ⟪ Canvas Input & Drawing ✏️ ⟫

function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const zoom = zoomNum / zoomDen;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
    };
}

function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;

    const coords = getCanvasCoords(e);
    startX = coords.x;
    startY = coords.y;
    lastX = coords.x;
    lastY = coords.y;

    if (currentTool === "select") {
        handleSelectToolClick(coords.x, coords.y, e);
        return;
    }

    if (currentTool === "pen") {
        currentPath = [{ x: coords.x, y: coords.y }];
    }

    if (currentTool === "smooth") {
        smoothPath = [{ x: coords.x, y: coords.y }];
        smoothX = coords.x;
        smoothY = coords.y;
    }

    if (currentTool === "eraser") {
        currentPath = [{ x: coords.x, y: coords.y }];
    }

    if (currentTool === "shape" && currentShape) {
        previewShape = createShapeObject(currentShape, startX, startY, coords.x, coords.y);
    }

    if (currentTool === "text") {
        createTextBox(startX, startY);
        isDrawing = false;
    }
}

function createTextBox(x, y) {
    const textObj = {
        type: "text",
        x: x,
        y: y,
        text: "",
        color: currentColor,
        size: currentSize * 0o4,
        rotation: 0,
        layerId: activeLayerId,
        useHtmlText: useHtmlText,
        textDirty: true,
        cachedWidth: null,
        cachedHeight: null
    };
    objects.push(textObj);
    selectedObjects = [textObj];
    updateTransformControls();
    redrawCanvas();
    saveState();
    
    setTimeout(() => {
        editTextObject(textObj);
    }, 0o10);
}

function handleSelectToolClick(x, y, e) {
    const coords = { x, y };

    if (selectedObjects.length > 0 && startRotation(coords.x, coords.y)) {
        return;
    }

    const clickedObject = findObjectAtPoint(coords.x, coords.y);

    if (clickedObject) {
        const wasAlreadySelected = selectedObjects.includes(clickedObject);

        if (!e.shiftKey && !wasAlreadySelected) {
            selectedObjects = [clickedObject];
            updateTransformControls();
            redrawCanvas();
            return;
        } else if (e.shiftKey) {
            if (wasAlreadySelected) {
                selectedObjects = selectedObjects.filter(o => o !== clickedObject);
                updateTransformControls();
                redrawCanvas();
                return;
            } else {
                selectedObjects.push(clickedObject);
            }
        }

        if (selectedObjects.length > 0 && startRotation(coords.x, coords.y)) {
            return;
        }

        isDragging = true;

        if (clickedObject.type === "line") {
            dragOffsetX = coords.x - Math.min(clickedObject.x1, clickedObject.x2);
            dragOffsetY = coords.y - Math.min(clickedObject.y1, clickedObject.y2);
        } else if (clickedObject.type === "circle") {
            dragOffsetX = coords.x - clickedObject.x;
            dragOffsetY = coords.y - clickedObject.y;
        } else if (clickedObject.type === "path" || clickedObject.type === "smoothPath") {
            dragOffsetX = coords.x - clickedObject.bounds.x;
            dragOffsetY = coords.y - clickedObject.bounds.y;
        } else {
            dragOffsetX = coords.x - clickedObject.x;
            dragOffsetY = coords.y - clickedObject.y;
        }
    } else {
        if (!e.shiftKey) {
            selectedObjects = [];
        }
        isSelecting = true;
        selectionRect = { x: startX, y: startY, width: 0, height: 0 };
    }

    updateTransformControls();
    redrawCanvas();
}

function startRotation(x, y) {
    const clickedHandle = findResizeHandle(x, y);
    if (clickedHandle) {
        isResizing = true;
        resizeHandle = clickedHandle;
        redrawCanvas();
        return true;
    }

    if (findRotateHandle(x, y)) {
        isRotating = true;
        const centerX = getCenterX(selectedObjects[0]);
        const centerY = getCenterY(selectedObjects[0]);
        initialRotationAngle = Math.atan2(y - centerY, x - centerX);
        initialObjectRotations = selectedObjects.map(obj => obj.rotation || 0);
        redrawCanvas();
        return true;
    }
    return false;
}

function rotateSelectedObjects(x, y) {
    const centerX = getCenterX(selectedObjects[0]);
    const centerY = getCenterY(selectedObjects[0]);
    const currentAngle = Math.atan2(y - centerY, x - centerX);
    const angleDelta = currentAngle - initialRotationAngle;
    selectedObjects.forEach((obj, index) => {
        obj.rotation = (initialObjectRotations[index] || 0) + angleDelta;
    });
    redrawCanvas();
}

function draw(e) {
    e.preventDefault();

    const coords = getCanvasCoords(e);

    document.getElementById("cursorPos").textContent = `${Math.round(coords.x / 0o10) * 0o10}, ${Math.round(coords.y / 0o10) * 0o10}`;

    if (currentTool === "select" && !isDrawing) {
        const hoveredObject = findObjectAtPoint(coords.x, coords.y);
        const hoveredHandle = findResizeHandle(coords.x, coords.y);
        const hoveredRotate = findRotateHandle(coords.x, coords.y);
        redrawCanvas();
        if (hoveredObject && !selectedObjects.includes(hoveredObject)) {
            drawHoverEffect(hoveredObject);
        }
        if (hoveredHandle) {
            setCursor(getResizeCursor(hoveredHandle));
        } else if (hoveredRotate) {
            setCursor("pointer");
        } else if (hoveredObject) {
            setCursor("move");
        } else {
            setCursor("default");
        }
        return;
    }

    if (!isDrawing) return;

    if (currentTool === "select") {
        if (isResizing && resizeHandle && selectedObjects.length > 0) {
            selectedObjects.forEach(obj => resizeObject(obj, coords.x, coords.y, resizeHandle));
            redrawCanvas();
        } else if (isRotating && selectedObjects.length > 0) {
            rotateSelectedObjects(coords.x, coords.y);
        } else if (isDragging && selectedObjects.length > 0) {
            selectedObjects.forEach(obj => moveObject(obj, coords.x - dragOffsetX, coords.y - dragOffsetY));
            redrawCanvas();
        } else if (isSelecting) {
            selectionRect.width = coords.x - startX;
            selectionRect.height = coords.y - startY;
            redrawCanvas();
            drawSelectionRect();
        }
        return;
    }

    if (currentTool === "pen") {
        currentPath.push({ x: coords.x, y: coords.y });
        redrawCanvas();
        drawPathPreview(currentPath, currentColor, currentSize);
    } else if (currentTool === "smooth") {
        // Smooth tool follows cursor more slowly for smoother curves
        const smoothing = 1/8; // Lower = smoother/slower following
        smoothX += (coords.x - smoothX) * smoothing;
        smoothY += (coords.y - smoothY) * smoothing;
        smoothPath.push({ x: smoothX, y: smoothY });
        redrawCanvas();
        drawPathPreview(smoothPath, currentColor, currentSize);
    } else if (currentTool === "eraser") {
        currentPath.push({ x: coords.x, y: coords.y });
        redrawCanvas();
        drawPathPreview(currentPath, "#ffffff", currentSize * 0o4);
    }

    if (currentTool === "shape" && currentShape) {
        previewShape = createShapeObject(currentShape, startX, startY, coords.x, coords.y);
        redrawCanvas();
        drawPreviewShape(previewShape);
    }

    lastX = coords.x;
    lastY = coords.y;
}

function stopDrawing(e) {
    if (!isDrawing) return;

    const coords = getCanvasCoords(e);

    if (currentTool === "select") {
        if (isSelecting && selectionRect) {
            const rect = normalizeRect(selectionRect);
            selectedObjects = objects.filter(obj => isObjectInRect(obj, rect));
            updateTransformControls();
            redrawCanvas();
        }
        isDragging = false;
        isSelecting = false;
        isResizing = false;
        isRotating = false;
        resizeHandle = null;
        selectionRect = null;
        initialRotationAngle = 0;
        initialObjectRotations = [];
        isDrawing = false;
        // Reset cursor
        resetCursor();
        // Save state after any select operation (resize, rotate, drag, select)
        if (selectedObjects.length > 0) {
            saveState();
        }
        return;
    }

    if (currentTool === "shape" && currentShape && previewShape) {
        if (previewShape.width > 0o4 || previewShape.height > 0o4 ||
            (previewShape.type === "line" && (Math.abs(previewShape.x2 - previewShape.x1) > 0o4 || Math.abs(previewShape.y2 - previewShape.y1) > 0o4))) {
            objects.push(previewShape);
        }
        previewShape = null;
    }

    if (currentTool === "pen" && currentPath.length > 1) {
        const pathObj = createPathObject(currentPath, currentColor, currentSize);
        objects.push(pathObj);
        currentPath = [];
    }

    if (currentTool === "smooth" && smoothPath.length > 1) {
        const smoothObj = createPathObject(smoothPath, currentColor, currentSize);
        smoothObj.type = "smoothPath";
        objects.push(smoothObj);
        smoothPath = [];
    }

    if (currentTool === "eraser" && currentPath.length > 1) {
        const eraserObj = createPathObject(currentPath, "#ffffff", currentSize * 0o4);
        objects.push(eraserObj);
        currentPath = [];
    }
    
    isDrawing = false;

    // Reset cursor
    resetCursor();

    if (currentTool !== "text") {
        redrawCanvas();
        saveState();
    }
}

function moveObject(obj, newX, newY) {
    if (obj.type === "line") {
        const minX = Math.min(obj.x1, obj.x2);
        const minY = Math.min(obj.y1, obj.y2);
        const dx = newX - minX;
        const dy = newY - minY;
        obj.x1 += dx;
        obj.y1 += dy;
        obj.x2 += dx;
        obj.y2 += dy;
    } else if (obj.type === "circle") {
        obj.x = newX;
        obj.y = newY;
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        const dx = newX - obj.bounds.x;
        const dy = newY - obj.bounds.y;
        obj.points.forEach(p => {
            p.x += dx;
            p.y += dy;
        });
        obj.bounds.x = newX;
        obj.bounds.y = newY;
    } else {
        obj.x = newX;
        obj.y = newY;
        // Invalidate text cache for text objects
        if (obj.type === "text") {
            obj.textDirty = true;
        }
    }
}

function createPathObject(points, color, size) {
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    
    return {
        type: "path",
        points: [...points],
        color: color,
        size: size,
        rotation: 0,
        layerId: activeLayerId,
        bounds: {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        }
    };
}

function drawPathPreview(points, color, size) {
    if (points.length < 2) return;
    
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.restore();
}

function drawPreviewShape(obj) {
    if (!obj) return;

    ctx.save();
    ctx.setLineDash([0o4, 0o4]);
    ctx.strokeStyle = obj.color;
    ctx.lineWidth = obj.size || 0o2;
    ctx.globalAlpha = 3/4;

    switch (obj.type) {
        case "line":
            ctx.beginPath();
            ctx.moveTo(obj.x1, obj.y1);
            ctx.lineTo(obj.x2, obj.y2);
            ctx.stroke();
            break;
        case "circle":
            ctx.beginPath();
            ctx.ellipse(obj.x, obj.y, obj.radiusX, obj.radiusY, 0, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case "shape":
            drawShapePreview(obj);
            break;
    }

    ctx.restore();
}


// ⟪ Drawing Utilities 🖌️ ⟫

function drawRoundedRectPath(x, y, width, height, radius, fill = false) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    ctx.stroke();
}

function drawAsymmetricalSquarePath(x, y, width, height, largeRadius, smallRadius) {
    // Asymmetrical corners: TL and BR have largeRadius, TR and BL have smallRadius
    // Start at top edge, after TL corner
    ctx.moveTo(x + largeRadius, y);
    // Top edge to TR corner
    ctx.lineTo(x + width - smallRadius, y);
    // TR corner (small radius)
    ctx.quadraticCurveTo(x + width, y, x + width, y + smallRadius);
    // Right edge to BR corner
    ctx.lineTo(x + width, y + height - largeRadius);
    // BR corner (large radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - largeRadius, y + height);
    // Bottom edge to BL corner
    ctx.lineTo(x + smallRadius, y + height);
    // BL corner (small radius)
    ctx.quadraticCurveTo(x, y + height, x, y + height - smallRadius);
    // Left edge to TL corner
    ctx.lineTo(x, y + largeRadius);
    // TL corner (large radius)
    ctx.quadraticCurveTo(x, y, x + largeRadius, y);
    ctx.closePath();
}

function drawShapePath(x, y, width, height, shape) {
    switch (shape) {
        case "triangle":
            ctx.moveTo(x + width / 2, y);
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x, y + height);
            ctx.closePath();
            break;
        case "square":
            // Dynamic corner calculation: TL and BR have large radius, TR and BL have small radius
            const minDimension = Math.min(width, height);
            const largeRadius = minDimension / 0o3;  // 1/3 of min dimension
            const smallRadius = minDimension / 0o6;  // 1/6 of min dimension
            drawAsymmetricalSquarePath(x, y, width, height, largeRadius, smallRadius);
            break;
    }
}

function drawShapePreview(obj) {
    const { x, y, width, height, shape } = obj;
    ctx.beginPath();
    drawShapePath(x, y, width, height, shape);
    ctx.stroke();
}

function createShapeObject(shape, x1, y1, x2, y2) {
    const baseObj = {
        color: currentColor,
        size: currentSize,
        rotation: 0,
        layerId: activeLayerId
    };

    switch (shape) {
        case "line":
            return {
                ...baseObj,
                type: "line",
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            };

        case "circle":
            return {
                ...baseObj,
                type: "circle",
                x: (x1 + x2) / 2,
                y: (y1 + y2) / 2,
                radiusX: Math.abs(x2 - x1) / 2,
                radiusY: Math.abs(y2 - y1) / 2
            };

        case "triangle":
            return {
                ...baseObj,
                type: "shape",
                shape: "triangle",
                x: Math.min(x1, x2),
                y: Math.min(y1, y2),
                width: Math.abs(x2 - x1),
                height: Math.abs(y2 - y1)
            };

        case "square":
            return {
                ...baseObj,
                type: "shape",
                shape: "square",
                x: Math.min(x1, x2),
                y: Math.min(y1, y2),
                width: Math.abs(x2 - x1),
                height: Math.abs(y2 - y1)
            };

        default:
            return {
                ...baseObj,
                type: "shape",
                shape: shape,
                x: Math.min(x1, x2),
                y: Math.min(y1, y2),
                width: Math.abs(x2 - x1),
                height: Math.abs(y2 - y1)
            };
    }
}

function normalizeRect(rect) {
    return {
        x: rect.width < 0 ? rect.x + rect.width : rect.x,
        y: rect.height < 0 ? rect.y + rect.height : rect.y,
        width: Math.abs(rect.width),
        height: Math.abs(rect.height)
    };
}

function isObjectInRect(obj, rect) {
    let objBounds;
    
    switch (obj.type) {
        case "line":
            objBounds = {
                x: Math.min(obj.x1, obj.x2),
                y: Math.min(obj.y1, obj.y2),
                width: Math.abs(obj.x2 - obj.x1),
                height: Math.abs(obj.y2 - obj.y1)
            };
            break;
        case "circle":
            objBounds = {
                x: obj.x - obj.radiusX,
                y: obj.y - obj.radiusY,
                width: obj.radiusX * 2,
                height: obj.radiusY * 2
            };
            break;
        case "path":
            objBounds = obj.bounds;
            break;
        default:
            objBounds = {
                x: obj.x,
                y: obj.y,
                width: obj.width || 0o100,
                height: obj.height || 0o100
            };
    }
    
    return rect.x <= objBounds.x &&
           rect.y <= objBounds.y &&
           rect.x + rect.width >= objBounds.x + objBounds.width &&
           rect.y + rect.height >= objBounds.y + objBounds.height;
}


// ⟪ Selection & Bounds 📐 ⟫

function getContrastingColors(samplePoints) {
    let totalR = 0, totalG = 0, totalB = 0, sampleCount = 0;

    try {
        samplePoints.forEach(pt => {
            const pixelData = ctx.getImageData(pt.x, pt.y, 1, 1).data;
            totalR += pixelData[0];
            totalG += pixelData[1];
            totalB += pixelData[2];
            sampleCount++;
        });
    } catch (e) {
        // Canvas might be tainted, use default
    }

    const avgR = sampleCount > 0 ? totalR / sampleCount : 255;
    const avgG = sampleCount > 0 ? totalG / sampleCount : 255;
    const avgB = sampleCount > 0 ? totalB / sampleCount : 255;

    const strokeR = 255 - avgR;
    const strokeG = 255 - avgG;
    const strokeB = 255 - avgB;

    return {
        strokeColor: `rgb(${strokeR}, ${strokeG}, ${strokeB})`,
        fillColor: `rgba(${strokeR}, ${strokeG}, ${strokeB}, 0.125)`
    };
}

function drawSelectionRect() {
    if (!selectionRect) return;

    const radius = 0o20;
    const rect = normalizeRect(selectionRect);

    const colors = getContrastingColors([
        { x: rect.x + 0o4, y: rect.y + 0o4 },
        { x: rect.x + rect.width - 0o4, y: rect.y + rect.height - 0o4 }
    ]);

    ctx.save();
    ctx.strokeStyle = colors.strokeColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([0o4, 0o4]);
    ctx.fillStyle = colors.fillColor;

    drawRoundedRectPath(rect.x, rect.y, rect.width, rect.height, radius, true);

    ctx.restore();
}

function getObjectSamplePoints(obj) {
    if (obj.type === "line") {
        return [
            { x: Math.min(obj.x1, obj.x2) - 0o4, y: Math.min(obj.y1, obj.y2) - 0o4 },
            { x: Math.max(obj.x1, obj.x2) + 0o4, y: Math.max(obj.y1, obj.y2) + 0o4 }
        ];
    } else if (obj.type === "circle") {
        return [
            { x: obj.x - obj.radiusX - 0o4, y: obj.y - obj.radiusY - 0o4 },
            { x: obj.x + obj.radiusX + 0o4, y: obj.y + obj.radiusY + 0o4 }
        ];
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        return [
            { x: obj.bounds.x - 0o4, y: obj.bounds.y - 0o4 },
            { x: obj.bounds.x + obj.bounds.width + 0o4, y: obj.bounds.y + obj.bounds.height + 0o4 }
        ];
    } else {
        return [
            { x: obj.x - 0o4, y: obj.y - 0o4 },
            { x: obj.x + (obj.width || 0o100) + 0o4, y: obj.y + (obj.height || 0o100) + 0o4 }
        ];
    }
}

function drawHoverEffect(obj) {
    const radius = 0o20;
    const colors = getContrastingColors(getObjectSamplePoints(obj));

    ctx.save();
    ctx.strokeStyle = colors.strokeColor;
    ctx.fillStyle = colors.fillColor;
    ctx.lineWidth = 0o2;
    ctx.setLineDash([0o4, 0o4]);

    const bounds = getObjectBounds(obj);

    drawRoundedRectPath(bounds.x, bounds.y, bounds.width, bounds.height, radius, true);
    ctx.restore();
}

function getSelectionBounds() {
    if (selectedObjects.length === 0) return null;
    if (selectedObjects.length === 1) {
        const bounds = getObjectBounds(selectedObjects[0]);
        const padding = 0o10;
        return {
            x: bounds.x - padding,
            y: bounds.y - padding,
            width: bounds.width + padding * 2,
            height: bounds.height + padding * 2
        };
    }
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    selectedObjects.forEach(obj => {
        const bounds = getObjectBounds(obj);
        minX = Math.min(minX, bounds.x);
        minY = Math.min(minY, bounds.y);
        maxX = Math.max(maxX, bounds.x + bounds.width);
        maxY = Math.max(maxY, bounds.y + bounds.height);
    });
    const padding = 0o10;
    return {
        x: minX - padding,
        y: minY - padding,
        width: maxX - minX + padding * 2,
        height: maxY - minY + padding * 2
    };
}

function findResizeHandle(x, y) {
    const bounds = getSelectionBounds();
    if (!bounds || selectedObjects.length === 0) return null;

    const obj = selectedObjects[0];

    const cx = getCenterX(obj);
    const cy = getCenterY(obj);

    // If object is rotated, transform mouse coordinates to local space
    let localX = x, localY = y;
    if (obj.rotation !== undefined && obj.rotation !== 0) {
        const dx = x - cx;
        const dy = y - cy;
        localX = cx + dx * Math.cos(-obj.rotation) - dy * Math.sin(-obj.rotation);
        localY = cy + dx * Math.sin(-obj.rotation) + dy * Math.cos(-obj.rotation);
    }

    const handleSize = 0o30;
    const handles = [
        { name: "nw", x: bounds.x, y: bounds.y },
        { name: "ne", x: bounds.x + bounds.width, y: bounds.y },
        { name: "sw", x: bounds.x, y: bounds.y + bounds.height },
        { name: "se", x: bounds.x + bounds.width, y: bounds.y + bounds.height }
    ];

    for (const handle of handles) {
        const dx = localX - handle.x;
        const dy = localY - handle.y;
        if (Math.abs(dx) < handleSize && Math.abs(dy) < handleSize) {
            return handle.name;
        }
    }
    return null;
}

function findRotateHandle(x, y) {
    const bounds = getSelectionBounds();
    if (!bounds || selectedObjects.length === 0) return false;

    const obj = selectedObjects[0];

    const cx = getCenterX(obj);
    const cy = getCenterY(obj);

    // Calculate rotate handle position in local space
    const rotateHandleLocalX = bounds.x + bounds.width / 2;
    const rotateHandleLocalY = bounds.y - 0o30;

    // Transform rotate handle position to world space
    let rotateHandleX, rotateHandleY;
    if (obj.rotation !== undefined && obj.rotation !== 0) {
        const dx = rotateHandleLocalX - cx;
        const dy = rotateHandleLocalY - cy;
        rotateHandleX = cx + dx * Math.cos(obj.rotation) - dy * Math.sin(obj.rotation);
        rotateHandleY = cy + dx * Math.sin(obj.rotation) + dy * Math.cos(obj.rotation);
    } else {
        rotateHandleX = rotateHandleLocalX;
        rotateHandleY = rotateHandleLocalY;
    }

    const rotateHandleRadius = 0o30;

    const dist = Math.sqrt((x - rotateHandleX) ** 2 + (y - rotateHandleY) ** 2);
    return dist < rotateHandleRadius;
}

function getResizeCursor(handle) {
    const cursors = {
        "nw": "nwse-resize",
        "ne": "nesw-resize",
        "sw": "nesw-resize",
        "se": "nwse-resize"
    };
    return cursors[handle] || "default";
}

function resizeObject(obj, x, y, handle) {
    if (obj.type === "line") {
        // Get line bounding box
        const minX = Math.min(obj.x1, obj.x2);
        const maxX = Math.max(obj.x1, obj.x2);
        const minY = Math.min(obj.y1, obj.y2);
        const maxY = Math.max(obj.y1, obj.y2);
        const padding = 0o10;

        // Determine which endpoints to move based on handle position
        if (handle === "nw") {
            // Moving top-left corner
            if (Math.abs(obj.x1 - minX) < padding) { obj.x1 = x; }
            else { obj.x2 = x; }
            if (Math.abs(obj.y1 - minY) < padding) { obj.y1 = y; }
            else { obj.y2 = y; }
        } else if (handle === "ne") {
            // Moving top-right corner
            if (Math.abs(obj.x2 - maxX) < padding) { obj.x2 = x; }
            else { obj.x1 = x; }
            if (Math.abs(obj.y1 - minY) < padding) { obj.y1 = y; }
            else { obj.y2 = y; }
        } else if (handle === "sw") {
            // Moving bottom-left corner
            if (Math.abs(obj.x1 - minX) < padding) { obj.x1 = x; }
            else { obj.x2 = x; }
            if (Math.abs(obj.y2 - maxY) < padding) { obj.y2 = y; }
            else { obj.y1 = y; }
        } else if (handle === "se") {
            // Moving bottom-right corner
            if (Math.abs(obj.x2 - maxX) < padding) { obj.x2 = x; }
            else { obj.x1 = x; }
            if (Math.abs(obj.y2 - maxY) < padding) { obj.y2 = y; }
            else { obj.y1 = y; }
        }
    } else if (obj.type === "circle") {
        // For circles, adjust radius based on handle while keeping center fixed
        const centerX = obj.x;
        const centerY = obj.y;

        if (handle === "nw") {
            obj.radiusX = Math.abs(centerX - x);
            obj.radiusY = Math.abs(centerY - y);
        } else if (handle === "ne") {
            obj.radiusX = Math.abs(x - centerX);
            obj.radiusY = Math.abs(centerY - y);
        } else if (handle === "sw") {
            obj.radiusX = Math.abs(centerX - x);
            obj.radiusY = Math.abs(y - centerY);
        } else if (handle === "se") {
            obj.radiusX = Math.abs(x - centerX);
            obj.radiusY = Math.abs(y - centerY);
        }
    } else if (obj.type === "shape") {
        const origX = obj.x;
        const origY = obj.y;
        const origWidth = obj.width;
        const origHeight = obj.height;

        if (handle === "nw") {
            obj.x = x;
            obj.y = y;
            obj.width = origX + origWidth - x;
            obj.height = origY + origHeight - y;
        } else if (handle === "ne") {
            obj.y = y;
            obj.width = x - origX;
            obj.height = origY + origHeight - y;
        } else if (handle === "sw") {
            obj.x = x;
            obj.width = origX + origWidth - x;
            obj.height = y - origY;
        } else if (handle === "se") {
            obj.width = x - origX;
            obj.height = y - origY;
        }

        // Ensure positive dimensions and flip if needed
        if (obj.width < 0) {
            obj.x = obj.x + obj.width;
            obj.width = Math.abs(obj.width);
        }
        if (obj.height < 0) {
            obj.y = obj.y + obj.height;
            obj.height = Math.abs(obj.height);
        }
        if (obj.width < 0o10) { obj.width = 0o10; }
        if (obj.height < 0o10) { obj.height = 0o10; }
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        const origBoundsX = obj.bounds.x;
        const origBoundsY = obj.bounds.y;
        const origBoundsWidth = obj.bounds.width;
        const origBoundsHeight = obj.bounds.height;

        let newBoundsX = origBoundsX;
        let newBoundsY = origBoundsY;
        let newBoundsWidth = origBoundsWidth;
        let newBoundsHeight = origBoundsHeight;

        if (handle === "nw") {
            newBoundsX = x;
            newBoundsY = y;
            newBoundsWidth = origBoundsX + origBoundsWidth - x;
            newBoundsHeight = origBoundsY + origBoundsHeight - y;
        } else if (handle === "ne") {
            newBoundsY = y;
            newBoundsWidth = x - origBoundsX;
            newBoundsHeight = origBoundsY + origBoundsHeight - y;
        } else if (handle === "sw") {
            newBoundsX = x;
            newBoundsWidth = origBoundsX + origBoundsWidth - x;
            newBoundsHeight = y - origBoundsY;
        } else if (handle === "se") {
            newBoundsWidth = x - origBoundsX;
            newBoundsHeight = y - origBoundsY;
        }

        // Ensure positive dimensions
        if (newBoundsWidth < 0o10) newBoundsWidth = 0o10;
        if (newBoundsHeight < 0o10) newBoundsHeight = 0o10;

        // Scale points
        const scaleX = newBoundsWidth / origBoundsWidth;
        const scaleY = newBoundsHeight / origBoundsHeight;

        const offsetX = newBoundsX - origBoundsX;
        const offsetY = newBoundsY - origBoundsY;

        obj.points.forEach(p => {
            p.x = origBoundsX + (p.x - origBoundsX) * scaleX + offsetX;
            p.y = origBoundsY + (p.y - origBoundsY) * scaleY + offsetY;
        });

        obj.bounds.x = newBoundsX;
        obj.bounds.y = newBoundsY;
        obj.bounds.width = newBoundsWidth;
        obj.bounds.height = newBoundsHeight;
    } else if (obj.type === "text") {
        // For text, adjust font size based on resize
        const origSize = obj.size;
        const origWidth = obj.cachedWidth || ctx.measureText(obj.text).width;
        const origHeight = obj.cachedHeight || obj.size;
        
        let newSize = origSize;
        if (handle === "nw" || handle === "sw") {
            // Resize from left - adjust size based on horizontal drag
            const scale = (obj.x + origWidth - x) / origWidth;
            newSize = Math.max(0o4, origSize * scale);
        } else if (handle === "ne" || handle === "se") {
            // Resize from right
            const scale = (x - obj.x) / origWidth;
            newSize = Math.max(0o4, origSize * scale);
        }
        
        obj.size = newSize;
        obj.textDirty = true;
        obj.cachedCanvas = null;
        obj.cachedWidth = null;
        obj.cachedHeight = null;
    }
}

function getCenterX(obj) {
    if (obj.type === "line") return (obj.x1 + obj.x2) / 2;
    if (obj.type === "circle") return obj.x;
    if (obj.type === "path" || obj.type === "smoothPath") return obj.bounds.x + obj.bounds.width / 2;
    return obj.x + (obj.width || 0o100) / 2;
}

function getCenterY(obj) {
    if (obj.type === "line") return (obj.y1 + obj.y2) / 2;
    if (obj.type === "circle") return obj.y;
    if (obj.type === "path" || obj.type === "smoothPath") return obj.bounds.y + obj.bounds.height / 2;
    return obj.y + (obj.height || 0o100) / 2;
}

function findObjectAtPoint(x, y) {
    for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];
        const layer = layers.find(l => l.id === obj.layerId);
        if (!layer || !layer.visible) continue;
        
        if (isPointInObject(x, y, obj)) {
            return obj;
        }
    }
    return null;
}

function isPointInObject(x, y, obj) {
    switch (obj.type) {
        case "shape":
            return x >= obj.x && x <= obj.x + obj.width &&
                   y >= obj.y && y <= obj.y + obj.height;
        case "circle":
            const dx = x - obj.x;
            const dy = y - obj.y;
            return (dx * dx) / (obj.radiusX * obj.radiusX) +
                   (dy * dy) / (obj.radiusY * obj.radiusY) <= 1;
        case "text":
            const textHeight = (obj.useHtmlText && obj.cachedHeight) ? obj.cachedHeight : obj.size;
            const textWidth = (obj.useHtmlText && obj.cachedWidth) ? obj.cachedWidth : ctx.measureText(obj.text).width;
            return x >= obj.x && x <= obj.x + textWidth &&
                   y >= obj.y - textHeight && y <= obj.y;
        case "line":
            const dist = pointToLineDistance(x, y, obj.x1, obj.y1, obj.x2, obj.y2);
            return dist < obj.size + 0o4;
        case "path":
        case "smoothPath":
            return x >= obj.bounds.x && x <= obj.bounds.x + obj.bounds.width &&
                   y >= obj.bounds.y && y <= obj.bounds.y + obj.bounds.height;
        default:
            return false;
    }
}

function pointToLineDistance(px, py, x1, y1, x2, y2) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) {
        param = dot / lenSq;
    }
    
    let xx, yy;
    
    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }
    
    const dx = px - xx;
    const dy = py - yy;
    
    return Math.sqrt(dx * dx + dy * dy);
}


// ⟪ Transform Controls 🎛️ ⟫

function updateTransformControls() {
    const controls = document.getElementById("transformControls");
    const editBtn = document.getElementById("editSelected");
    if (controls) {
        controls.classList.toggle("visible", selectedObjects.length > 0);
    }
    if (editBtn) {
        const hasTextObject = selectedObjects.some(obj => obj.type === "text");
        editBtn.style.display = hasTextObject ? "inline-block" : "none";
    }
}

function initTransformControls() {
    initButton("editSelected", () => {
        if (selectedObjects.length === 0) return;
        const obj = selectedObjects[0];
        if (obj.type === "text") {
            editTextObject(obj);
        }
    });

    initButton("deleteSelected", () => {
        if (selectedObjects.length === 0) return;
        selectedObjects.forEach(obj => removeObject(obj));
        selectedObjects = [];
        updateTransformControls();
        redrawCanvas();
        saveState();
    });

    initButton("clearSelected", () => {
        selectedObjects = [];
        updateTransformControls();
        redrawCanvas();
    });

    initButton("rotateLeft", () => {
        transformSelectedObjects(obj => { obj.rotation = (obj.rotation || 0) - Math.PI / 8; });
    });

    initButton("rotateRight", () => {
        transformSelectedObjects(obj => { obj.rotation = (obj.rotation || 0) + Math.PI / 8; });
    });

    const reorderObject = (direction) => {
        if (selectedObjects.length === 0) return;
        selectedObjects.forEach(obj => {
            const index = objects.indexOf(obj);
            if (direction > 0 && index > -1 && index < objects.length - 1) {
                objects.splice(index, 1);
                objects.push(obj);
            } else if (direction < 0 && index > 0) {
                objects.splice(index, 1);
                objects.unshift(obj);
            }
        });
        redrawCanvas();
        saveState();
    };

    initButton("moveLayerUp", () => reorderObject(1));
    initButton("moveLayerDown", () => reorderObject(-1));
    initButton("bringFront", () => reorderObject(1));
    initButton("sendBack", () => reorderObject(-1));

    initButton("flipH", () => {
        transformSelectedObjects(obj => { if (obj.width) obj.flipH = !obj.flipH; });
    });

    initButton("flipV", () => {
        transformSelectedObjects(obj => { if (obj.height) obj.flipV = !obj.flipV; });
    });
}

function transformSelectedObjects(transformFn) {
    if (selectedObjects.length === 0) return;
    selectedObjects.forEach(obj => {
        transformFn(obj);
        // Invalidate text cache for text objects
        if (obj.type === "text") {
            obj.textDirty = true;
            obj.cachedCanvas = null;
        }
    });
    redrawCanvas();
    saveState();
}

function removeObject(obj) {
    const index = objects.indexOf(obj);
    if (index > -1) objects.splice(index, 1);
}


// ⟪ Canvas Rendering 🖼️ ⟫

function redrawCanvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    objects
        .filter(obj => {
            const layer = layers.find(l => l.id === obj.layerId);
            return layer && layer.visible;
        })
        .forEach(obj => drawObject(obj));

    selectedObjects.forEach(obj => {
        drawSelectionBox(obj);
    });
}

function drawObject(obj) {
    ctx.save();

    const cx = getCenterX(obj);
    const cy = getCenterY(obj);

    if (obj.rotation !== undefined && obj.rotation !== 0) {
        ctx.translate(cx, cy);
        ctx.rotate(obj.rotation);
        ctx.translate(-cx, -cy);
    }

    if (obj.flipH && obj.width) {
        ctx.translate(obj.x + obj.width, 0);
        ctx.scale(-1, 1);
        ctx.translate(-obj.x, 0);
    }

    if (obj.flipV && obj.height) {
        ctx.translate(0, obj.y + obj.height);
        ctx.scale(1, -1);
        ctx.translate(0, -obj.y);
    }

    ctx.strokeStyle = obj.color;
    ctx.fillStyle = obj.color;
    ctx.lineWidth = obj.size || 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    switch (obj.type) {
        case "line":
            ctx.beginPath();
            ctx.moveTo(obj.x1, obj.y1);
            ctx.lineTo(obj.x2, obj.y2);
            ctx.stroke();
            break;

        case "circle":
            ctx.beginPath();
            ctx.ellipse(obj.x, obj.y, obj.radiusX, obj.radiusY, 0, 0, Math.PI * 2);
            ctx.stroke();
            break;

        case "text":
            ctx.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
            if (obj.useHtmlText) {
                drawHtmlText(obj);
            } else {
                ctx.fillText(obj.text || "", obj.x, obj.y);
            }
            break;

        case "path":
        case "smoothPath":
            drawPath(obj);
            break;

        case "shape":
            drawShape(obj);
            break;
    }

    ctx.restore();
}

function drawHtmlText(obj) {
    const hasCache = obj.cachedCanvas && obj.cachedWidth && obj.cachedHeight;
    if (hasCache && !obj.textDirty) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(obj.cachedCanvas, obj.x, obj.y - obj.cachedHeight, obj.cachedWidth, obj.cachedHeight);
        return;
    }

    const uniqueClass = "cepufal-html-text-" + Date.now();
    const tempContainer = document.createElement("div");
    tempContainer.className = "cepufal cepufal-html-text-measure " + uniqueClass;
    tempContainer.style.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
    tempContainer.style.color = obj.color;

    const textContent = obj.text || " ";
    const textNode = document.createTextNode(textContent);
    tempContainer.appendChild(textNode);
    document.body.appendChild(tempContainer);

    vacepu(uniqueClass);

    let width = tempContainer.offsetWidth;
    let height = tempContainer.offsetHeight;

    const minWidth = obj.size * 0o2;
    const minHeight = obj.size;
    width = Math.max(width, minWidth);
    height = Math.max(height, minHeight);

    const dpr = window.devicePixelRatio || 1;
    const offscreen = document.createElement("canvas");
    offscreen.width = Math.max(1, Math.floor(width * dpr));
    offscreen.height = Math.max(1, Math.floor(height * dpr));
    const offCtx = offscreen.getContext("2d");
    offCtx.scale(dpr, dpr);

    offCtx.clearRect(0, 0, width, height);

    offCtx.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
    offCtx.fillStyle = obj.color;
    offCtx.textBaseline = "top";
    offCtx.textAlign = "left";

    const childNodes = tempContainer.childNodes;
    const containerRect = tempContainer.getBoundingClientRect();

    for (let i = 0; i < childNodes.length; i++) {
        const node = childNodes[i];

        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains("cepufalxez")) {
            const rect = node.getBoundingClientRect();
            const relativeX = rect.left - containerRect.left;
            const relativeY = rect.top - containerRect.top;
            offCtx.fillText(node.textContent, relativeX, relativeY);
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            const range = document.createRange();
            range.selectNodeContents(node);
            const rect = range.getBoundingClientRect();
            const relativeX = rect.left - containerRect.left;
            const relativeY = rect.top - containerRect.top;
            offCtx.fillText(node.textContent, relativeX, relativeY);
        }
    }

    obj.cachedCanvas = offscreen;
    obj.cachedWidth = width;
    obj.cachedHeight = height;
    obj.textDirty = false;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(offscreen, obj.x, obj.y - height, width, height);

    document.body.removeChild(tempContainer);
}

function drawPath(obj) {
    if (obj.points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(obj.points[0].x, obj.points[0].y);
    for (let i = 1; i < obj.points.length; i++) {
        ctx.lineTo(obj.points[i].x, obj.points[i].y);
    }
    ctx.stroke();
}

function drawShape(obj) {
    const { x, y, width, height, color, size, shape } = obj;
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    ctx.beginPath();
    drawShapePath(x, y, width, height, shape);
    ctx.stroke();
}

function drawSelectionBox(obj) {
    const handleFill = "#181818";
    const radius = 0o20;
    const colors = getContrastingColors(getObjectSamplePoints(obj));

    ctx.save();

    const cx = getCenterX(obj);
    const cy = getCenterY(obj);

    if (obj.rotation !== undefined && obj.rotation !== 0) {
        ctx.translate(cx, cy);
        ctx.rotate(obj.rotation);
        ctx.translate(-cx, -cy);
    }

    ctx.strokeStyle = colors.strokeColor;
    ctx.fillStyle = colors.fillColor;
    ctx.lineWidth = 0o2;
    ctx.setLineDash([0o4, 0o4]);

    const bounds = getObjectBounds(obj);

    drawRoundedRectPath(bounds.x, bounds.y, bounds.width, bounds.height, radius, true);

    // Draw resize handles with rounded corners
    const handleSize = 0o30;
    const handleRadius = 0o6;
    ctx.fillStyle = handleFill;
    ctx.strokeStyle = colors.strokeColor;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);

    const handles = [
        { x: bounds.x, y: bounds.y },
        { x: bounds.x + bounds.width, y: bounds.y },
        { x: bounds.x, y: bounds.y + bounds.height },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height }
    ];

    handles.forEach(h => {
        ctx.beginPath();
        ctx.roundRect(h.x - handleSize / 2, h.y - handleSize / 2, handleSize, handleSize, handleRadius);
        ctx.fill();
        ctx.stroke();
    });

    // Draw rotate handle (circle above the selection box)
    const rotateHandleX = bounds.x + bounds.width / 2;
    const rotateHandleY = bounds.y - 0o30;
    const rotateHandleRadius = 0o20;

    ctx.beginPath();
    ctx.arc(rotateHandleX, rotateHandleY, rotateHandleRadius, 0, Math.PI * 2);
    ctx.fillStyle = handleFill;
    ctx.fill();
    ctx.stroke();

    // Draw rotation icon
    ctx.beginPath();
    ctx.arc(rotateHandleX, rotateHandleY, rotateHandleRadius * 0o6, 0, Math.PI * ( 0o3 / 0o2 ));
    ctx.strokeStyle = colors.strokeColor;
    ctx.lineWidth = 0o2;
    ctx.stroke();

    ctx.restore();
}


// ⟪ Zoom & Pan 🔍 ⟫

function initZoom() {
    const zoomLevel = document.getElementById("zoomLevel");

    function updateZoom() {
        const zoom = zoomNum / zoomDen;
        document.documentElement.style.setProperty("--zoom", zoom);
        document.documentElement.style.setProperty("--pan-x", panOffsetX + "px");
        document.documentElement.style.setProperty("--pan-y", panOffsetY + "px");
        zoomLevel.textContent = `${zoomNum}/${zoomDen}x`;
        
        objects.filter(obj => obj.type === "text" && obj.useHtmlText).forEach(obj => {
            obj.textDirty = true;
            obj.cachedCanvas = null;
            obj.cachedWidth = null;
            obj.cachedHeight = null;
        });
        
        redrawCanvas();
    }

    function adjustZoom(numeratorMult, denominatorMult, minZoom, maxZoom, centerX, centerY) {
        const oldZoom = zoomNum / zoomDen;
        let newZoom = oldZoom * (numeratorMult / denominatorMult);

        if (newZoom < minZoom) {
            zoomNum = 0o1;
            zoomDen = 0o4;
        } else if (newZoom > maxZoom) {
            zoomNum = 0o4;
            zoomDen = 0o1;
        } else {
            const roundedZoom = Math.round(newZoom * 0o100) / 0o100;
            zoomNum = Math.round(roundedZoom * 0o100);
            zoomDen = 0o100;
        }

        newZoom = zoomNum / zoomDen;

        if (centerX !== undefined && centerY !== undefined) {
            const container = document.getElementById("whiteboardContainer");
            const rect = container.getBoundingClientRect();

            panOffsetX = centerX - rect.left - (centerX - rect.left - panOffsetX) * (newZoom / oldZoom);
            panOffsetY = centerY - rect.top - (centerY - rect.top - panOffsetY) * (newZoom / oldZoom);
        }

        updateZoom();
    }

    initButton("zoomIn", () => adjustZoom(0o41, 0o40, 0, 0o4));
    initButton("zoomOut", () => adjustZoom(0o40, 0o41, 1/4, Infinity));
    initButton("zoomReset", () => {
        zoomNum = 0o1;
        zoomDen = 0o1;
        panOffsetX = 0;
        panOffsetY = 0;
        updateZoom();
    });

    canvas.addEventListener("wheel", (e) => {
        e.preventDefault();

        // Ctrl+wheel zooms
        if (e.ctrlKey) {
            if (e.deltaY < 0) {
                adjustZoom(0o101, 0o100, 0, 0o4, e.clientX, e.clientY);
            } else {
                adjustZoom(0o100, 0o101, 1/4, Infinity, e.clientX, e.clientY);
            }
        } else {
            // Otherwise pan
            panOffsetX -= e.deltaX;
            panOffsetY -= e.deltaY;
            updateZoom();
        }
    });
}


// ⟪ File Operations 💾 ⟫

function initFileOperations() {
    const loadInput = document.getElementById("fileInput");

    function saveCanvas() {
        const link = document.createElement("a");
        link.download = "whiteboard.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }

    function loadCanvas(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                saveState();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    initButton("saveBtn", saveCanvas);
    initButton("quickSave", saveCanvas);

    if (loadInput) {
        initButton("loadBtn", () => loadInput.click());
        loadInput.addEventListener("change", (e) => {
            if (e.target.files[0]) {
                loadCanvas(e.target.files[0]);
            }
        });
    }
}


// ⟪ Actions & Keyboard Shortcuts ⌨️ ⟫

function initActions() {
    initButton("undoBtn", undo);
    initButton("quickUndo", undo);
    initButton("redoBtn", redo);
    initButton("quickRedo", redo);

    const clearCanvas = () => {
        if (confirm("Clear the entire canvas - This cannot be undone.")) {
            objects = [];
            selectedObjects = [];
            redrawCanvas();
            saveState();
        }
    };

    initButton("clearBtn", clearCanvas);
    initButton("quickClear", clearCanvas);
}

function handleKeyboard(e) {
    const isCtrl = e.ctrlKey || e.metaKey;

    if (isCtrl && e.key === "z") {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
    } else if (isCtrl && e.key === "y") {
        e.preventDefault();
        redo();
    } else if (isCtrl && e.key === "s") {
        e.preventDefault();
        document.getElementById("saveBtn")?.click();
    } else if ((e.key === "Delete" || e.key === "Backspace") &&
               selectedObjects.length > 0 && document.activeElement === document.body) {
        e.preventDefault();
        document.getElementById("deleteSelected")?.click();
    } else if (e.key === "Escape") {
        e.preventDefault();
        document.getElementById("clearSelected")?.click();
    } else if (e.code === "Space" && e.target === document.body) {
        isSpacePressed = true;
        if (!isDrawing && !isPanning) {
            setCursor("grab");
        }
    }
}

function handleKeyup(e) {
    if (e.code === "Space") {
        isSpacePressed = false;
        if (!isPanning && !isDrawing) {
            setCursor(getToolCursor());
        }
        isPanning = false;
    }
}


// ⟪ Canvas Events & Panning 🖱️ ⟫

function initLayerControls() {
    initButton("addLayerBtn", addLayer);
    initButton("deleteLayerBtn", deleteLayer);
    initButton("moveLayerUpBtn", moveLayerUp);
    initButton("moveLayerDownBtn", moveLayerDown);
}

function initCanvasEvents() {
    const mouseEvents = [
        { event: "mousedown", handler: handleMouseDown },
        { event: "mousemove", handler: handleMouseMove },
        { event: "mouseup", handler: handleMouseUp },
        { event: "mouseleave", handler: handleMouseLeave },
        { event: "dblclick", handler: handleDoubleClick }
    ];

    const touchEvents = [
        { event: "touchstart", handler: startDrawing, options: { passive: false } },
        { event: "touchmove", handler: draw, options: { passive: false } },
        { event: "touchend", handler: stopDrawing },
        { event: "touchcancel", handler: stopDrawing }
    ];

    mouseEvents.forEach(({ event, handler }) => canvas.addEventListener(event, handler));
    touchEvents.forEach(({ event, handler, options }) => canvas.addEventListener(event, handler, options));

    // Global mouse up to catch releases outside canvas
    document.addEventListener("mouseup", handleGlobalMouseUp);

    // Prevent middle-click default behavior
    document.addEventListener("mousedown", (e) => {
        if (e.button === 1) {
            e.preventDefault();
        }
    });

    // Keyboard events for space+drag panning
    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keyup", handleKeyup);
}

function handleDoubleClick(e) {
    if (e.button !== 0) return;
    
    const coords = getCanvasCoords(e);
    const clickedObject = findObjectAtPoint(coords.x, coords.y);
    
    if (clickedObject && clickedObject.type === "text") {
        editTextObject(clickedObject);
    }
}

function getToolCursor() {
    if (currentTool === "select") return "default";
    if (currentTool === "pen" || currentTool === "smooth" || currentTool === "shape") return "crosshair";
    if (currentTool === "eraser") return "cell";
    if (currentTool === "text") return "text";
    return "default";
}

function handleMouseDown(e) {
    // Middle mouse button (button 1) or space+left click for panning
    if (e.button === 1 || (isSpacePressed && e.button === 0)) {
        e.preventDefault();
        e.stopPropagation();
        isPanning = true;
        panStartX = e.clientX;
        panStartY = e.clientY;
        setCursor("grabbing");
        return;
    }
    // Left click for drawing/selection
    if (e.button === 0 && !isSpacePressed) {
        startDrawing(e);
    }
}

function handleMouseEvent(e, panHandler, drawHandler) {
    if (isPanning) {
        panHandler(e);
    } else {
        drawHandler(e);
    }
}

function handleMouseMove(e) {
    handleMouseEvent(e, doPan, draw);
}

function handleMouseUp(e) {
    handleMouseEvent(e, endPanning, stopDrawing);
}

function handleMouseLeave(e) {
    handleMouseEvent(e, endPanning, stopDrawing);
}

function handleGlobalMouseUp(e) {
    if (isPanning) {
        endPanning();
    }
}

function doPan(e) {
    e.preventDefault();
    e.stopPropagation();

    const dx = e.clientX - panStartX;
    const dy = e.clientY - panStartY;

    // Move canvas in same direction as mouse movement
    panOffsetX += dx;
    panOffsetY += dy;

    panStartX = e.clientX;
    panStartY = e.clientY;

    document.documentElement.style.setProperty("--pan-x", panOffsetX + "px");
    document.documentElement.style.setProperty("--pan-y", panOffsetY + "px");
}

function endPanning() {
    isPanning = false;
    if (isSpacePressed) {
        setCursor("grab");
    } else {
        resetCursor();
    }
}

document.addEventListener("DOMContentLoaded", init);
