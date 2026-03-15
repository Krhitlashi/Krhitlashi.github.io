// ≺⧼ Whiteboard Application - Main ⧽≻

// ⟪ Layer Manager Class 📋 ⟫

class LayerManager {
    constructor() {
        this.layers = [];
        this.activeId = 0;
        this.counter = 0;
    }

    create(name) {
        this.counter++;
        const layer = {
            id: this.counter,
            name: name || `ꞙɭ${this.counter} ɭ(ꞇ ɭʃᴜ }ʃɔƽ`,
            visible: true,
            objects: []
        };
        this.layers.push(layer);
        this.activeId = this.counter;
        return layer;
    }

    delete(layerId) {
        if (this.layers.length <= 1) return false;
        const index = this.layers.findIndex(l => l.id === layerId);
        if (index === -1) return false;
        
        objectState.objects = objectState.objects.filter(o => o.layerId !== layerId);
        this.layers.splice(index, 1);
        
        if (this.activeId === layerId) {
            this.activeId = this.layers[0].id;
        }
        return true;
    }

    move(layerId, direction) {
        const index = this.layers.findIndex(l => l.id === layerId);
        const swapIndex = index + direction;
        if (swapIndex < 0 || swapIndex >= this.layers.length) return false;
        
        [this.layers[index], this.layers[swapIndex]] = 
        [this.layers[swapIndex], this.layers[index]];
        return true;
    }

    toggleVisibility(layerId) {
        const layer = this.layers.find(l => l.id === layerId);
        if (layer) {
            layer.visible = !layer.visible;
            return true;
        }
        return false;
    }

    setActive(layerId) {
        this.activeId = layerId;
    }

    getActive() {
        return this.layers.find(l => l.id === this.activeId);
    }

    isVisible(layerId) {
        return this.layers.find(l => l.id === layerId)?.visible ?? false;
    }

    syncToLayerState() {
        layerState.layers = this.layers;
        layerState.activeId = this.activeId;
        layerState.counter = this.counter;
    }
}

const layerManager = new LayerManager();

// ⟪ Initialization 🚀 ⟫

function init() {
    initCanvas();
    initLayers();
    initTextEditInput();
    initColors();
    initToolsAndShapes();
    initSizeSlider();
    initToolbar();
    initCanvasEvents();
    initActions();
    initLayerControls();
    initZoom();
    initFileOperations();
    saveState();
}

function initCanvas() {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.getElementById("canvasSize").textContent = `${canvas.width} × ${canvas.height}`;
}

function initLayers() {
    layerManager.layers = [];
    layerManager.counter = 0;
    layerManager.create("ꞙɭı ɭ(ꞇ ɭʃᴜ }ʃɔƽ");
    layerManager.syncToLayerState();
    renderLayerList();
}

// ⟪ Layer Management 📚 ⟫

function addLayer() {
    layerManager.create();
    layerManager.syncToLayerState();
    renderLayerList();
    saveState();
}

function deleteLayer() {
    if (layerManager.delete(layerState.activeId)) {
        layerManager.syncToLayerState();
        renderLayerList();
        redrawCanvas();
        saveState();
    }
}

function moveLayer(direction) {
    if (layerManager.move(layerState.activeId, direction)) {
        layerManager.syncToLayerState();
        renderLayerList();
        saveState();
    }
}

function moveLayerUp() { moveLayer(1); }
function moveLayerDown() { moveLayer(-1); }

function toggleLayerVisibility(layerId) {
    if (layerManager.toggleVisibility(layerId)) {
        renderLayerList();
        redrawCanvas();
        saveState();
    }
}

function selectLayer(layerId) {
    layerManager.setActive(layerId);
    layerManager.syncToLayerState();
    renderLayerList();
}

function renderLayerList() {
    const layerList = document.getElementById("layerList");
    if (!layerList) return;

    layerList.innerHTML = "";

    layerState.layers.slice().reverse().forEach(layer => {
        const layerItem = document.createElement("button");
        layerItem.setAttribute("aria-pressed", layer.id === layerState.activeId ? "true" : "false");
        layerItem.innerHTML = `
            <span>${layer.name}</span>
            <span class="layer-visibility" data-visible="${layer.visible}"></span>
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

function removeEmptyTextObject(index) {
    if (index >= 0 && objectState.objects[index]) {
        objectState.objects.splice(index, 1);
        objectState.selected = [];
        updateTransformControls();
        redrawCanvas();
        saveState();
    }
}

function initTextEditInput() {
    textState.input = document.createElement("textarea");
    textState.input.className = "text-edit-input";

    textState.input.addEventListener("blur", finishTextEditing);
    textState.input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            e.preventDefault();
            cancelTextEditing();
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            finishTextEditing();
        }
    });
    textState.input.addEventListener("input", () => {
        if (textState.editingIndex >= 0 && objectState.objects[textState.editingIndex]) {
            const obj = objectState.objects[textState.editingIndex];
            obj.text = textState.input.value;
            obj.textDirty = true;
            obj.cachedCanvas = null;
            obj.cachedWidth = null;
            obj.cachedHeight = null;
            redrawCanvas();
        }
    });

    document.getElementById("whiteboardContainer").appendChild(textState.input);
}

function startTextEditing(x, y, existingText = null) {
    startTextEdit();
    textState.isEditing = true;
    positionTextEditInput(x, y, state.size * TEXT_SIZE_MULTIPLIER, state.color);
    textState.input.value = existingText || "";
    textState.input.classList.add("visible");
    textState.input.focus();

    const autoResize = () => {
        textState.input.style.height = "auto";
        textState.input.style.height = textState.input.scrollHeight + "px";
    };
    autoResize();
    textState.input.addEventListener("input", autoResize, { once: true });
}

function finishTextEditing() {
    if (!textState.isEditing || !textState.input) return;

    const text = textState.input.value;

    if (textState.editingIndex >= 0 && objectState.objects[textState.editingIndex]) {
        const obj = objectState.objects[textState.editingIndex];

        if (text.trim() === "") {
            removeEmptyTextObject(textState.editingIndex);
            finishTextEditCommon();
            return;
        }

        obj.text = text;
        obj.color = state.color;
        obj.textDirty = true;
        obj.cachedCanvas = null;
        obj.cachedWidth = null;
        obj.cachedHeight = null;
        redrawCanvas();
    } else if (text.trim() !== "") {
        const { textX, textY } = getTextEditPosition();
        objectState.objects.push({
            type: "text",
            x: textX, y: textY,
            text: text,
            color: state.color,
            size: state.size * TEXT_SIZE_MULTIPLIER,
            rotation: 0,
            layerId: layerState.activeId,
            useHtmlText: textState.useHtml,
            textDirty: true,
            cachedWidth: null,
            cachedHeight: null
        });
        redrawCanvas();
    }

    finishTextEditCommon();
    saveState();
}

function cancelTextEditing() {
    if (!textState.isEditing || !textState.input) return;

    if (textState.editingIndex >= 0 && objectState.objects[textState.editingIndex]?.text.trim() === "") {
        removeEmptyTextObject(textState.editingIndex);
    } else {
        finishTextEditCommon();
    }
}

function editTextObject(obj) {
    startTextEdit();
    textState.isEditing = true;
    textState.editingIndex = objectState.objects.indexOf(obj);
    positionTextEditInput(obj.x, obj.y, obj.size, obj.color);
    textState.input.value = obj.text;
    textState.input.classList.add("visible");
    textState.input.focus();
    textState.input.select();
}

// ⟪ UI Initialization 🎨 ⟫

function initColors() {
    const colorGrid = document.getElementById("colorGrid");
    if (!colorGrid) return;

    initButtonGroup("#colorGrid button[data-color]", "#colorGrid button", (btn) => {
        state.color = btn.dataset.color;
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
        state.color = color;
        setButtonPressed("#colorGrid button", null);
    });

    hexInput.addEventListener("input", () => {
        const value = normalizeHexColor(hexInput.value);
        if (isValidHexColor(value)) {
            colorPicker.value = value;
            state.color = value;
            setButtonPressed("#colorGrid button", null);
        }
    });

    hexInput.addEventListener("blur", () => {
        const value = normalizeHexColor(hexInput.value);
        if (isValidHexColor(value)) {
            hexInput.value = value.toUpperCase();
        }
    });
}

function initToolsAndShapes() {
    initButtonGroup("button[data-tool]", "button[data-tool]", (btn) => {
        state.tool = btn.dataset.tool;
        canvas.dataset.tool = state.tool;
        updateTransformControls();
        if (!panState.isPanning && !state.isDrawing) setCursor(getToolCursor());
    });

    initButtonGroup("button[data-shape]", "button[data-shape]", (btn) => {
        state.shape = btn.dataset.shape;
        state.tool = "shape";
        canvas.dataset.tool = "shape";
        updateTransformControls();
        if (!panState.isPanning && !state.isDrawing) setCursor(getToolCursor());
    });

    const htmlTextCheckbox = document.getElementById("htmlTextCheckbox");
    if (htmlTextCheckbox) {
        textState.useHtml = htmlTextCheckbox.checked;
        htmlTextCheckbox.addEventListener("change", () => { textState.useHtml = htmlTextCheckbox.checked; });
    }

    const eraserModeCheckbox = document.getElementById("eraserModeCheckbox");
    if (eraserModeCheckbox) {
        eraserState.eraseObjects = eraserModeCheckbox.checked;
        eraserModeCheckbox.addEventListener("change", () => { eraserState.eraseObjects = eraserModeCheckbox.checked; });
    }
}

function initSizeSlider() {
    const slider = document.getElementById("brushSize");
    const valueDisplay = document.getElementById("brushSizeValue");

    slider.addEventListener("input", () => {
        state.size = parseInt(slider.value);
        valueDisplay.textContent = state.size;
    });
}

function initToolbar() {
    const toolbar = document.getElementById("toolbarContainer");
    initButton("toolbarToggle", () => {
        if (toolbar) a3esoza(toolbar);
    });
}

// ⟪ History & Undo/Redo 📚 ⟫

function saveState() {
    historyState.history = historyState.history.slice(0, historyState.index + 1);

    const stateData = {
        layers: JSON.parse(JSON.stringify(layerState.layers)),
        objects: JSON.parse(JSON.stringify(objectState.objects))
    };

    historyState.history.push(JSON.stringify(stateData));
    historyState.index++;

    if (historyState.history.length > HISTORY_MAX) {
        historyState.history.shift();
        historyState.index--;
    }

    updateUndoRedoButtons();
}

function undo() { changeHistory(-1); }
function redo() { changeHistory(1); }

function changeHistory(direction) {
    const newIndex = historyState.index + direction;
    if (newIndex < 0 || newIndex >= historyState.history.length) return;

    historyState.index = newIndex;
    const stateData = JSON.parse(historyState.history[historyState.index]);
    layerState.layers = stateData.layers;
    objectState.objects = stateData.objects;
    renderLayerList();
    redrawCanvas();
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    const btnStates = [
        { ids: ["undoBtn", "quickUndo"], disabled: historyState.index <= 0 },
        { ids: ["redoBtn", "quickRedo"], disabled: historyState.index >= historyState.history.length - 1 }
    ];

    btnStates.forEach(({ ids, disabled }) => {
        ids.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.disabled = disabled;
        });
    });
}

// ⟪ Canvas Input & Drawing ✏️ ⟫

function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const zoom = state.zoomNum / state.zoomDen;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const coords = getClientCoords(e);

    return {
        x: (coords.x - rect.left) * scaleX,
        y: (coords.y - rect.top) * scaleY
    };
}

function startDrawing(e) {
    e.preventDefault();
    state.isDrawing = true;

    const coords = getCanvasCoords(e);
    state.startX = coords.x;
    state.startY = coords.y;
    state.lastX = coords.x;
    state.lastY = coords.y;

    switch (state.tool) {
        case "select":
            handleSelectToolClick(coords.x, coords.y, e);
            return;
        case "pen":
        case "eraser":
            pathState.current = [{ x: coords.x, y: coords.y }];
            break;
        case "smooth":
            pathState.smooth = [{ x: coords.x, y: coords.y }];
            pathState.smoothX = coords.x;
            pathState.smoothY = coords.y;
            break;
        case "shape":
            if (state.shape) pathState.preview = createShapeObject(state.shape, state.startX, state.startY, coords.x, coords.y);
            break;
        case "text":
            createTextBox(state.startX, state.startY);
            state.isDrawing = false;
            break;
        case "connect":
            const clickedObject = findObjectAtPoint(coords.x, coords.y);
            if (clickedObject) {
                if (!clickedObject.id) clickedObject.id = generateId();
                connectionState.startObj = clickedObject;
            } else {
                state.isDrawing = false;
            }
            break;
    }
}

function createTextBox(x, y) {
    const textObj = {
        type: "text", x: x, y: y,
        text: "", color: state.color,
        size: state.size * TEXT_SIZE_MULTIPLIER,
        rotation: 0, layerId: layerState.activeId,
        useHtmlText: textState.useHtml,
        textDirty: true, cachedWidth: null, cachedHeight: null
    };
    objectState.objects.push(textObj);
    objectState.selected = [textObj];
    updateTransformControls();
    redrawCanvas();
    saveState();

    setTimeout(() => editTextObject(textObj), 0o10);
}

function handleSelectToolClick(x, y, e) {
    const coords = { x, y };

    if (objectState.selected.length > 0 && startRotation(coords.x, coords.y)) return;

    const clickedObject = findObjectAtPoint(coords.x, coords.y);

    if (clickedObject) {
        const wasAlreadySelected = objectState.selected.includes(clickedObject);

        if (!e.shiftKey && !wasAlreadySelected) {
            objectState.selected = [clickedObject];
            updateTransformControls();
            redrawCanvas();
            if (startRotation(coords.x, coords.y)) return;
            objectState.isDragging = true;
            objectState.dragStartX = coords.x;
            objectState.dragStartY = coords.y;
            objectState.initialObjectStates = objectState.selected.map(getObjectInitialState);
            return;
        }
        if (e.shiftKey) {
            if (wasAlreadySelected) {
                objectState.selected = objectState.selected.filter(o => o !== clickedObject);
                updateTransformControls();
                redrawCanvas();
                return;
            }
            objectState.selected.push(clickedObject);
        }

        if (objectState.selected.length > 0 && startRotation(coords.x, coords.y)) return;

        objectState.isDragging = true;
        objectState.dragStartX = coords.x;
        objectState.dragStartY = coords.y;
        objectState.initialObjectStates = objectState.selected.map(getObjectInitialState);
    } else {
        if (!e.shiftKey) objectState.selected = [];
        objectState.isSelecting = true;
        objectState.selectionRect = { x: state.startX, y: state.startY, width: 0, height: 0 };
    }

    updateTransformControls();
    redrawCanvas();
}

function startRotation(x, y) {
    if (findRotateHandle(x, y)) {
        objectState.isRotating = true;
        const obj = objectState.selected[0];
        const center = getCenter(obj);
        const dx = x - center.x, dy = y - center.y;
        objectState.initialRotationAngle = Math.atan2(dy, dx);
        objectState.initialObjectRotations = objectState.selected.map(o => o.rotation || 0);
        redrawCanvas();
        return true;
    }

    const clickedHandle = findResizeHandle(x, y);
    if (clickedHandle) {
        objectState.isResizing = true;
        objectState.resizeHandle = clickedHandle;
        const obj = objectState.selected[0];
        objectState.initialBounds = getObjectBounds(obj);
        objectState.initialCenterX = getCenterX(obj);
        objectState.initialCenterY = getCenterY(obj);
        objectState.initialRotation = obj.rotation || 0;
        objectState.initialObjectStates = objectState.selected.map(getObjectInitialState);
        redrawCanvas();
        return true;
    }

    return false;
}

function rotateSelectedObjects(x, y) {
    const obj = objectState.selected[0];
    const center = getCenter(obj);
    const dx = x - center.x, dy = y - center.y;
    const currentAngle = Math.atan2(dy, dx);
    const angleDelta = currentAngle - objectState.initialRotationAngle;
    objectState.selected.forEach((o, i) => {
        o.rotation = (objectState.initialObjectRotations[i] || 0) + angleDelta;
    });
    redrawCanvas();
}

function draw(e) {
    e.preventDefault();
    const coords = getCanvasCoords(e);

    document.getElementById("cursorPos").textContent =
        `${Math.round(coords.x / 0o10) * 0o10}, ${Math.round(coords.y / 0o10) * 0o10}`;

    if (state.tool === "select" && !state.isDrawing) {
        const hoveredObject = findObjectAtPoint(coords.x, coords.y);
        const hoveredHandle = findResizeHandle(coords.x, coords.y);
        const hoveredRotate = findRotateHandle(coords.x, coords.y);
        redrawCanvas();
        if (hoveredObject && !objectState.selected.includes(hoveredObject)) drawHoverEffect(hoveredObject);
        if (hoveredHandle) setCursor(getResizeCursor(hoveredHandle));
        else if (hoveredRotate) setCursor("pointer");
        else if (hoveredObject) setCursor("move");
        else setCursor("default");
        return;
    }

    if (!state.isDrawing) return;

    if (state.tool === "select") {
        if (objectState.isResizing && objectState.resizeHandle && objectState.selected.length > 0) {
            objectState.selected.forEach(obj => resizeObject(obj, coords.x, coords.y, objectState.resizeHandle));
            redrawCanvas();
        } else if (objectState.isRotating && objectState.selected.length > 0) {
            rotateSelectedObjects(coords.x, coords.y);
        } else if (objectState.isDragging && objectState.selected.length > 0) {
            const dx = coords.x - objectState.dragStartX;
            const dy = coords.y - objectState.dragStartY;
            objectState.selected.forEach((obj, i) => moveObjectByDelta(obj, dx, dy, objectState.initialObjectStates[i] || {}));
            redrawCanvas();
        } else if (objectState.isSelecting) {
            objectState.selectionRect.width = coords.x - state.startX;
            objectState.selectionRect.height = coords.y - state.startY;
            redrawCanvas();
            drawSelectionRect();
        }
        return;
    }

    if (state.tool === "pen") {
        pathState.current.push({ x: coords.x, y: coords.y });
        redrawCanvas();
        drawPathPreview(pathState.current, state.color, state.size);
    } else if (state.tool === "smooth") {
        pathState.smoothX += (coords.x - pathState.smoothX) * SMOOTHING_FACTOR;
        pathState.smoothY += (coords.y - pathState.smoothY) * SMOOTHING_FACTOR;
        pathState.smooth.push({ x: pathState.smoothX, y: pathState.smoothY });
        redrawCanvas();
        drawPathPreview(pathState.smooth, state.color, state.size);
    } else if (state.tool === "eraser") {
        pathState.current.push({ x: coords.x, y: coords.y });
        redrawCanvas();
        eraseObjectsAlongPath(pathState.current, state.size * TEXT_SIZE_MULTIPLIER, eraserState.eraseObjects);
        redrawCanvas();
    } else if (state.tool === "connect" && connectionState.startObj) {
        redrawCanvas();
        ctx.save();
        ctx.strokeStyle = state.color;
        ctx.lineWidth = state.size;
        ctx.setLineDash(LINE_DASH_PATTERN);
        ctx.beginPath();
        const startC = getCenter(connectionState.startObj);
        ctx.moveTo(startC.x, startC.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        ctx.restore();
    }

    if (state.tool === "shape" && state.shape) {
        pathState.preview = createShapeObject(state.shape, state.startX, state.startY, coords.x, coords.y);
        redrawCanvas();
        drawPreviewShape(pathState.preview);
    }

    state.lastX = coords.x;
    state.lastY = coords.y;
}

function stopDrawing(e) {
    if (!state.isDrawing) return;

    const coords = getCanvasCoords(e);

    if (state.tool === "select") {
        if (objectState.isSelecting && objectState.selectionRect) {
            const rect = normalizeRect(objectState.selectionRect);
            objectState.selected = objectState.objects.filter(obj => isObjectInRect(obj, rect));
            updateTransformControls();
            redrawCanvas();
        }
        resetSelectionState();
        resetCursor();
        if (objectState.selected.length > 0) saveState();
        return;
    }

    if (state.tool === "shape" && state.shape && pathState.preview) {
        // Check minimum size based on shape type
        let shouldAdd = false;
        if (pathState.preview.type === "circle") {
            shouldAdd = pathState.preview.radiusX > 0o2 || pathState.preview.radiusY > 0o2;
        } else if (pathState.preview.type === "line") {
            shouldAdd = Math.abs(pathState.preview.x2 - pathState.preview.x1) > 0o4 ||
                       Math.abs(pathState.preview.y2 - pathState.preview.y1) > 0o4;
        } else {
            shouldAdd = pathState.preview.width > 0o4 || pathState.preview.height > 0o4;
        }
        
        if (shouldAdd) {
            objectState.objects.push(pathState.preview);
        }
        pathState.preview = null;
    }

    if (state.tool === "pen" && pathState.current.length > 1) {
        objectState.objects.push(createPathObject(pathState.current, state.color, state.size));
        pathState.current = [];
    }

    if (state.tool === "smooth" && pathState.smooth.length > 1) {
        const smoothObj = createPathObject(pathState.smooth, state.color, state.size);
        smoothObj.type = "smoothPath";
        objectState.objects.push(smoothObj);
        pathState.smooth = [];
    }

    if (state.tool === "connect" && connectionState.startObj) {
        const targetObj = findObjectAtPoint(coords.x, coords.y);
        if (targetObj && targetObj !== connectionState.startObj) {
            if (!targetObj.id) targetObj.id = generateId();
            objectState.objects.push({
                type: "connection",
                id: generateId(),
                startId: connectionState.startObj.id,
                endId: targetObj.id,
                color: state.color,
                size: state.size,
                layerId: layerState.activeId
            });
        }
        connectionState.startObj = null;
    }

    if (state.tool === "eraser" && pathState.current.length > 1) {
        pathState.current = [];
    }

    state.isDrawing = false;
    resetCursor();

    if (state.tool !== "text") {
        redrawCanvas();
        saveState();
    }
}

function drawSelectionRect() {
    if (!objectState.selectionRect) return;

    const rect = normalizeRect(objectState.selectionRect);
    const colors = getContrastingColors([
        { x: rect.x + 0o4, y: rect.y + 0o4 },
        { x: rect.x + rect.width - 0o4, y: rect.y + rect.height - 0o4 }
    ]);

    ctx.save();
    ctx.strokeStyle = colors.stroke;
    ctx.lineWidth = 1;
    ctx.setLineDash(LINE_DASH_PATTERN);
    ctx.fillStyle = colors.fill;
    drawRoundedRectPath(rect.x, rect.y, rect.width, rect.height, CORNER_RADIUS, true);
    ctx.restore();
}

function drawHoverEffect(obj) {
    const colors = getContrastingColors([{ x: getCenterX(obj), y: getCenterY(obj) }]);

    ctx.save();
    applyObjectTransform(obj);
    ctx.strokeStyle = colors.stroke;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = SELECTION_LINE_WIDTH;
    ctx.setLineDash(LINE_DASH_PATTERN);

    const bounds = getObjectBounds(obj);
    drawRoundedRectPath(bounds.x, bounds.y, bounds.width, bounds.height, CORNER_RADIUS, false);
    ctx.restore();
}

function getSelectionBounds() {
    if (objectState.selected.length === 0) return null;

    if (objectState.selected.length === 1) {
        const bounds = getObjectBounds(objectState.selected[0]);
        return {
            x: bounds.x - SELECTION_PADDING,
            y: bounds.y - SELECTION_PADDING,
            width: bounds.width + SELECTION_PADDING * 2,
            height: bounds.height + SELECTION_PADDING * 2
        };
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    objectState.selected.forEach(obj => {
        const bounds = getObjectBounds(obj);
        minX = Math.min(minX, bounds.x);
        minY = Math.min(minY, bounds.y);
        maxX = Math.max(maxX, bounds.x + bounds.width);
        maxY = Math.max(maxY, bounds.y + bounds.height);
    });

    return {
        x: minX - SELECTION_PADDING,
        y: minY - SELECTION_PADDING,
        width: maxX - minX + SELECTION_PADDING * 2,
        height: maxY - minY + SELECTION_PADDING * 2
    };
}

// ⟪ Transform Controls 🎛️ ⟫

function updateTransformControls() {
    const controls = document.getElementById("transformControls");
    if (controls) {
        const hasTextObject = objectState.selected.some(obj => obj.type === "text");
        controls.classList.toggle("visible", objectState.selected.length > 0);
        controls.classList.toggle("has-text", hasTextObject);
    }
}

function initTransformControls() {
    initButton("editSelected", () => {
        if (objectState.selected.length === 0) return;
        const obj = objectState.selected[0];
        if (obj.type === "text") editTextObject(obj);
    });

    initButton("deleteSelected", () => {
        if (objectState.selected.length === 0) return;
        objectState.selected.forEach(obj => removeObject(obj));
        objectState.selected = [];
        updateTransformControls();
        redrawCanvas();
        saveState();
    });

    initButton("clearSelected", () => {
        objectState.selected = [];
        updateTransformControls();
        redrawCanvas();
    });

    initButton("rotateLeft", () => transformSelectedObjects(obj => { obj.rotation -= Math.PI / 0o10; }));
    initButton("rotateRight", () => transformSelectedObjects(obj => { obj.rotation += Math.PI / 0o10; }));

    initButton("moveLayerUp", reorderSelectedObjects);
    initButton("moveLayerDown", () => reorderSelectedObjects(-1));
    initButton("bringFront", reorderSelectedObjects);
    initButton("sendBack", () => reorderSelectedObjects(-1));

    initButton("flipH", () => transformSelectedObjects(obj => { if (obj.width) obj.flipH = !obj.flipH; }));
    initButton("flipV", () => transformSelectedObjects(obj => { if (obj.height) obj.flipV = !obj.flipV; }));
}

function reorderSelectedObjects(direction = 1) {
    if (objectState.selected.length === 0) return;
    objectState.selected.forEach(obj => {
        const index = objectState.objects.indexOf(obj);
        if (direction > 0 && index > -1 && index < objectState.objects.length - 1) {
            objectState.objects.splice(index, 1);
            objectState.objects.push(obj);
        } else if (direction < 0 && index > 0) {
            objectState.objects.splice(index, 1);
            objectState.objects.unshift(obj);
        }
    });
    redrawCanvas();
    saveState();
}

// ⟪ Canvas Rendering 🖼️ ⟫

function redrawCanvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    objectState.objects
        .filter(obj => {
            const layer = layerState.layers.find(l => l.id === obj.layerId);
            return layer && layer.visible;
        })
        .forEach(obj => drawObject(obj));

    objectState.selected.forEach(obj => drawSelectionBox(obj));
}

function applyObjectTransform(obj) {
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
}

function drawObject(obj) {
    ctx.save();
    applyObjectTransform(obj);

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
        case "connection":
            const endpoints = getConnectionEndpoints(obj);
            if (endpoints) {
                ctx.beginPath();
                ctx.moveTo(endpoints.start.x, endpoints.start.y);
                ctx.lineTo(endpoints.end.x, endpoints.end.y);
                ctx.stroke();
            }
            break;
        case "circle":
            ctx.beginPath();
            ctx.ellipse(obj.x, obj.y, obj.radiusX, obj.radiusY, 0, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case "text":
            ctx.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
            if (obj.useHtmlText) drawHtmlText(obj);
            else ctx.fillText(obj.text || "", obj.x, obj.y);
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
    tempContainer.appendChild(document.createTextNode(textContent));
    document.body.appendChild(tempContainer);

    vacepu(uniqueClass);

    let width = tempContainer.offsetWidth;
    let height = tempContainer.offsetHeight;
    width = Math.max(width, obj.size * TEXT_MIN_WIDTH_MULTIPLIER);
    height = Math.max(height, obj.size);

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
            offCtx.fillText(node.textContent, rect.left - containerRect.left, rect.top - containerRect.top);
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            const range = document.createRange();
            range.selectNodeContents(node);
            const rect = range.getBoundingClientRect();
            offCtx.fillText(node.textContent, rect.left - containerRect.left, rect.top - containerRect.top);
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

    drawPathSegments(obj.points);
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
    const handles = getHandles(obj);
    const cx = getCenterX(obj);
    const cy = getCenterY(obj);
    const bounds = getObjectBounds(obj);
    const rotation = obj.rotation || 0;
    const c = Math.cos(rotation), s = Math.sin(rotation);

    ctx.save();
    ctx.strokeStyle = SELECTION_STROKE_COLOR;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = SELECTION_LINE_WIDTH;
    ctx.setLineDash(LINE_DASH_PATTERN);

    ctx.beginPath();
    ctx.moveTo(handles[0].x, handles[0].y);
    ctx.lineTo(handles[1].x, handles[1].y);
    ctx.lineTo(handles[2].x, handles[2].y);
    ctx.lineTo(handles[3].x, handles[3].y);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = HANDLE_FILL_COLOR;
    ctx.strokeStyle = HANDLE_STROKE_COLOR;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);

    for (let i = 0; i < 0o10; i++) {
        const h = handles[i];
        ctx.beginPath();
        ctx.roundRect(h.x - HANDLE_SIZE / 2, h.y - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE, HANDLE_RADIUS);
        ctx.fill();
        ctx.stroke();
    }

    const localTopMid = { x: bounds.x + bounds.width / 2, y: bounds.y };
    const rhX = cx + (localTopMid.x - cx) * c - (localTopMid.y - cy) * s;
    const rhY = cy + (localTopMid.x - cx) * s + (localTopMid.y - cy) * c - ROTATE_HANDLE_OFFSET;

    ctx.beginPath();
    ctx.arc(rhX, rhY, ROTATE_HANDLE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = HANDLE_FILL_COLOR;
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(rhX, rhY, 0o12, 0, Math.PI * (3 / 2));
    ctx.strokeStyle = HANDLE_STROKE_COLOR;
    ctx.lineWidth = SELECTION_LINE_WIDTH;
    ctx.stroke();

    ctx.restore();
}

// ⟪ Zoom & Pan 🔍 ⟫

function initZoom() {
    const zoomLevel = document.getElementById("zoomLevel");
    const toolbar = document.getElementById("toolbarContainer");

    if (!zoomLevel) {
        console.warn("zoomLevel element not found");
        return;
    }

    function updateZoom() {
        const zoom = state.zoomNum / state.zoomDen;
        document.documentElement.style.setProperty("--zoom", zoom);
        document.documentElement.style.setProperty("--pan-x", panState.offsetX + "px");
        document.documentElement.style.setProperty("--pan-y", panState.offsetY + "px");
        zoomLevel.textContent = `${state.zoomNum}/${state.zoomDen}x`;
        invalidateTextCaches();
        redrawCanvas();
    }

    function setZoom(newZoom) {
        if (newZoom < MIN_ZOOM) {
            state.zoomNum = 0o1;
            state.zoomDen = 0o4;
        } else if (newZoom > MAX_ZOOM) {
            state.zoomNum = 0o4;
            state.zoomDen = 0o1;
        } else {
            const zoomNumerator = Math.round(newZoom * ZOOM_BASE);
            state.zoomNum = zoomNumerator;
            state.zoomDen = ZOOM_BASE;
        }

        updateZoom();
    }

    function adjustZoom(numeratorMult, denominatorMult) {
        const oldZoom = state.zoomNum / state.zoomDen;
        const newZoom = oldZoom * (numeratorMult / denominatorMult);
        setZoom(newZoom);
    }

    initButton("zoomIn", () => adjustZoom(ZOOM_STEP_NUM, ZOOM_STEP_DEN));
    initButton("zoomOut", () => adjustZoom(ZOOM_STEP_DEN, ZOOM_STEP_NUM));
    initButton("zoomReset", () => {
        state.zoomNum = 0o1; state.zoomDen = 0o1;
        panState.offsetX = 0; panState.offsetY = 0;
        updateZoom();
    });

    canvas.addEventListener("wheel", (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            const currentZoom = state.zoomNum / state.zoomDen;
            const zoomFactor = e.deltaY < 0 ? (WHEEL_ZOOM_NUM / WHEEL_ZOOM_DEN) : (WHEEL_ZOOM_DEN / WHEEL_ZOOM_NUM);
            const newZoom = currentZoom * zoomFactor;
            setZoom(newZoom);
        } else {
            e.preventDefault();
            panState.offsetX -= e.deltaX;
            panState.offsetY -= e.deltaY;
            updateZoom();
        }
    }, { passive: false });
}

// ⟪ File Operations 💾 ⟫

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

function initFileOperations() {
    const loadInput = document.getElementById("fileInput");

    initButton("saveBtn", saveCanvas);
    initButton("quickSave", saveCanvas);

    if (loadInput) {
        initButton("loadBtn", () => loadInput.click());
        loadInput.addEventListener("change", (e) => {
            if (e.target.files[0]) loadCanvas(e.target.files[0]);
        });
    }
}

// ⟪ Actions & Keyboard Shortcuts ⌨️ ⟫

const KEYBOARD_SHORTCUTS = {
    "z": (shift) => shift ? redo() : undo(),
    "y": () => redo(),
    "s": () => document.getElementById("saveBtn")?.click()
};

function handleKeyboard(e) {
    const isCtrl = e.ctrlKey || e.metaKey;

    if (isCtrl && KEYBOARD_SHORTCUTS[e.key]) {
        e.preventDefault();
        KEYBOARD_SHORTCUTS[e.key](e.shiftKey);
        return;
    }
    if ((e.key === "Delete" || e.key === "Backspace") &&
        objectState.selected.length > 0 && document.activeElement === document.body) {
        e.preventDefault();
        document.getElementById("deleteSelected")?.click();
        return;
    }
    if (e.key === "Escape") {
        e.preventDefault();
        document.getElementById("clearSelected")?.click();
        return;
    }
    if (e.code === "Space" && e.target === document.body) {
        spaceState.isPressed = true;
        if (!state.isDrawing && !panState.isPanning) setCursor("grab");
    }
}

function initActions() {
    initButtons([
        { id: "undoBtn", onClick: undo },
        { id: "quickUndo", onClick: undo },
        { id: "redoBtn", onClick: redo },
        { id: "quickRedo", onClick: redo }
    ]);

    const clearCanvas = () => {
        if (confirm("Clear the entire canvas - This cannot be undone.")) {
            objectState.objects = [];
            objectState.selected = [];
            redrawCanvas();
            saveState();
        }
    };

    initButtons([
        { id: "clearBtn", onClick: clearCanvas },
        { id: "quickClear", onClick: clearCanvas }
    ]);
}

function initLayerControls() {
    initButtons([
        { id: "addLayerBtn", onClick: addLayer },
        { id: "deleteLayerBtn", onClick: deleteLayer },
        { id: "moveLayerUpBtn", onClick: moveLayerUp },
        { id: "moveLayerDownBtn", onClick: moveLayerDown }
    ]);
}

function handleKeyup(e) {
    if (e.code === "Space") {
        spaceState.isPressed = false;
        if (!panState.isPanning && !state.isDrawing) setCursor(getToolCursor());
        panState.isPanning = false;
    }
}

// ⟪ Canvas Events & Panning 🖱️ ⟫

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

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("mousedown", (e) => {
        if (e.button === 1) e.preventDefault();
    });

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

function handleMouseDown(e) {
    if (e.button === 1 || (spaceState.isPressed && e.button === 0)) {
        e.preventDefault();
        e.stopPropagation();
        panState.isPanning = true;
        panState.startX = e.clientX;
        panState.startY = e.clientY;
        setCursor("grabbing");
        return;
    }
    if (e.button === 0 && !spaceState.isPressed) {
        startDrawing(e);
    }
}

function handleMouseMove(e) {
    if (panState.isPanning) {
        e.preventDefault();
        e.stopPropagation();

        const dx = e.clientX - panState.startX;
        const dy = e.clientY - panState.startY;

        panState.offsetX += dx;
        panState.offsetY += dy;

        panState.startX = e.clientX;
        panState.startY = e.clientY;

        document.documentElement.style.setProperty("--pan-x", panState.offsetX + "px");
        document.documentElement.style.setProperty("--pan-y", panState.offsetY + "px");
    } else {
        draw(e);
    }
}

function handleMouseUp(e) {
    if (panState.isPanning) {
        stopPanning();
    } else {
        stopDrawing(e);
    }
}

function handleMouseLeave(e) {
    if (panState.isPanning) {
        stopPanning();
    } else {
        stopDrawing(e);
    }
}

function handleGlobalMouseUp(e) {
    stopPanning();
}

document.addEventListener("DOMContentLoaded", init);
