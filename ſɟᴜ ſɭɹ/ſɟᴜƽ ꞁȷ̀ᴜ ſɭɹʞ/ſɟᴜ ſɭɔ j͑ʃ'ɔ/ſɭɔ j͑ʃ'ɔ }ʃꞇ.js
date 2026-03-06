// ≺⧼ Whiteboard Application - Main ⧽≻

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
    initTransformControls();
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
    layers.push({
        id: layerCounter,
        name: `ꞙɭ${layerCounter} ɭ(ꞇ ɭʃᴜ }ʃɔƽ`,
        visible: true,
        objects: []
    });
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

function moveLayer(direction) {
    const layerIndex = layers.findIndex(l => l.id === activeLayerId);
    const swapIndex = layerIndex + direction;
    if (swapIndex < 0 || swapIndex >= layers.length) return;

    [layers[layerIndex], layers[swapIndex]] = [layers[swapIndex], layers[layerIndex]];
    renderLayerList();
    saveState();
}

function moveLayerUp() { moveLayer(1); }
function moveLayerDown() { moveLayer(-1); }

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
    if (index >= 0 && objects[index]) {
        objects.splice(index, 1);
        selectedObjects = [];
        updateTransformControls();
        redrawCanvas();
        saveState();
    }
}

function initTextEditInput() {
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
    startTextEdit();
    isEditingText = true;
    positionTextEditInput(x, y, currentSize * TEXT_SIZE_MULTIPLIER, currentColor);
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
            removeEmptyTextObject(editingTextObjectIndex);
            finishTextEditCommon();
            return;
        }

        obj.text = text;
        obj.color = currentColor;
        obj.textDirty = true;
        obj.cachedCanvas = null;
        obj.cachedWidth = null;
        obj.cachedHeight = null;
        redrawCanvas();
    } else if (text.trim() !== "") {
        const { textX, textY } = getTextEditPosition();
        objects.push({
            type: "text",
            x: textX, y: textY,
            text: text,
            color: currentColor,
            size: currentSize * TEXT_SIZE_MULTIPLIER,
            rotation: 0,
            layerId: activeLayerId,
            useHtmlText: useHtmlText,
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
    if (!isEditingText || !textEditInput) return;

    if (editingTextObjectIndex >= 0 && objects[editingTextObjectIndex]?.text.trim() === "") {
        removeEmptyTextObject(editingTextObjectIndex);
    } else {
        finishTextEditCommon();
    }
}

function editTextObject(obj) {
    startTextEdit();
    isEditingText = true;
    editingTextObjectIndex = objects.indexOf(obj);
    positionTextEditInput(obj.x, obj.y, obj.size, obj.color);
    textEditInput.value = obj.text;
    textEditInput.classList.add("visible");
    textEditInput.focus();
    textEditInput.select();
}

// ⟪ UI Initialization 🎨 ⟫

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
        const value = normalizeHexColor(hexInput.value);
        if (isValidHexColor(value)) {
            colorPicker.value = value;
            currentColor = value;
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
        currentTool = btn.dataset.tool;
        canvas.dataset.tool = currentTool;
        updateTransformControls();
        if (!isPanning && !isDrawing) setCursor(getToolCursor());
    });

    initButtonGroup("button[data-shape]", "button[data-shape]", (btn) => {
        currentShape = btn.dataset.shape;
        currentTool = "shape";
        canvas.dataset.tool = "shape";
        updateTransformControls();
        if (!isPanning && !isDrawing) setCursor(getToolCursor());
    });

    const htmlTextCheckbox = document.getElementById("htmlTextCheckbox");
    if (htmlTextCheckbox) {
        useHtmlText = htmlTextCheckbox.checked;
        htmlTextCheckbox.addEventListener("change", () => { useHtmlText = htmlTextCheckbox.checked; });
    }

    const eraserModeCheckbox = document.getElementById("eraserModeCheckbox");
    if (eraserModeCheckbox) {
        eraserEraseObjects = eraserModeCheckbox.checked;
        eraserModeCheckbox.addEventListener("change", () => { eraserEraseObjects = eraserModeCheckbox.checked; });
    }
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
        if (toolbar) a3esoza(toolbar);
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

    if (history.length > HISTORY_MAX) {
        history.shift();
        historyIndex--;
    }

    updateUndoRedoButtons();
}

function undo() { changeHistory(-1); }
function redo() { changeHistory(1); }

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
    const btnStates = [
        { ids: ["undoBtn", "quickUndo"], disabled: historyIndex <= 0 },
        { ids: ["redoBtn", "quickRedo"], disabled: historyIndex >= history.length - 1 }
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
    const zoom = zoomNum / zoomDen;
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
    isDrawing = true;

    const coords = getCanvasCoords(e);
    startX = coords.x;
    startY = coords.y;
    lastX = coords.x;
    lastY = coords.y;

    switch (currentTool) {
        case "select":
            handleSelectToolClick(coords.x, coords.y, e);
            return;
        case "pen":
        case "eraser":
            currentPath = [{ x: coords.x, y: coords.y }];
            break;
        case "smooth":
            smoothPath = [{ x: coords.x, y: coords.y }];
            smoothX = coords.x;
            smoothY = coords.y;
            break;
        case "shape":
            if (currentShape) previewShape = createShapeObject(currentShape, startX, startY, coords.x, coords.y);
            break;
        case "text":
            createTextBox(startX, startY);
            isDrawing = false;
            break;
    }
}

function createTextBox(x, y) {
    const textObj = {
        type: "text", x: x, y: y,
        text: "", color: currentColor,
        size: currentSize * TEXT_SIZE_MULTIPLIER,
        rotation: 0, layerId: activeLayerId,
        useHtmlText: useHtmlText,
        textDirty: true, cachedWidth: null, cachedHeight: null
    };
    objects.push(textObj);
    selectedObjects = [textObj];
    updateTransformControls();
    redrawCanvas();
    saveState();

    setTimeout(() => editTextObject(textObj), 0o10);
}

function handleSelectToolClick(x, y, e) {
    const coords = { x, y };

    if (selectedObjects.length > 0 && startRotation(coords.x, coords.y)) return;

    const clickedObject = findObjectAtPoint(coords.x, coords.y);

    if (clickedObject) {
        const wasAlreadySelected = selectedObjects.includes(clickedObject);

        if (!e.shiftKey && !wasAlreadySelected) {
            selectedObjects = [clickedObject];
            updateTransformControls();
            redrawCanvas();
            if (startRotation(coords.x, coords.y)) return;
            isDragging = true;
            dragStartX = coords.x;
            dragStartY = coords.y;
            initialObjectStates = selectedObjects.map(getObjectInitialState);
            return;
        }
        if (e.shiftKey) {
            if (wasAlreadySelected) {
                selectedObjects = selectedObjects.filter(o => o !== clickedObject);
                updateTransformControls();
                redrawCanvas();
                return;
            }
            selectedObjects.push(clickedObject);
        }

        if (selectedObjects.length > 0 && startRotation(coords.x, coords.y)) return;

        isDragging = true;
        dragStartX = coords.x;
        dragStartY = coords.y;
        initialObjectStates = selectedObjects.map(getObjectInitialState);
    } else {
        if (!e.shiftKey) selectedObjects = [];
        isSelecting = true;
        selectionRect = { x: startX, y: startY, width: 0, height: 0 };
    }

    updateTransformControls();
    redrawCanvas();
}

function startRotation(x, y) {
    if (findRotateHandle(x, y)) {
        isRotating = true;
        const obj = selectedObjects[0];
        const center = getCenter(obj);
        const dx = x - center.x, dy = y - center.y;
        initialRotationAngle = Math.atan2(dy, dx);
        initialObjectRotations = selectedObjects.map(o => o.rotation || 0);
        redrawCanvas();
        return true;
    }

    const clickedHandle = findResizeHandle(x, y);
    if (clickedHandle) {
        isResizing = true;
        resizeHandle = clickedHandle;
        const obj = selectedObjects[0];
        initialBounds = getObjectBounds(obj);
        initialCenterX = getCenterX(obj);
        initialCenterY = getCenterY(obj);
        initialRotation = obj.rotation || 0;
        initialObjectStates = selectedObjects.map(getObjectInitialState);
        redrawCanvas();
        return true;
    }

    return false;
}

function rotateSelectedObjects(x, y) {
    const obj = selectedObjects[0];
    const center = getCenter(obj);
    const dx = x - center.x, dy = y - center.y;
    const currentAngle = Math.atan2(dy, dx);
    const angleDelta = currentAngle - initialRotationAngle;
    selectedObjects.forEach((o, i) => {
        o.rotation = (initialObjectRotations[i] || 0) + angleDelta;
    });
    redrawCanvas();
}

function draw(e) {
    e.preventDefault();
    const coords = getCanvasCoords(e);

    document.getElementById("cursorPos").textContent = 
        `${Math.round(coords.x / 0o10) * 0o10}, ${Math.round(coords.y / 0o10) * 0o10}`;

    if (currentTool === "select" && !isDrawing) {
        const hoveredObject = findObjectAtPoint(coords.x, coords.y);
        const hoveredHandle = findResizeHandle(coords.x, coords.y);
        const hoveredRotate = findRotateHandle(coords.x, coords.y);
        redrawCanvas();
        if (hoveredObject && !selectedObjects.includes(hoveredObject)) drawHoverEffect(hoveredObject);
        if (hoveredHandle) setCursor(getResizeCursor(hoveredHandle));
        else if (hoveredRotate) setCursor("pointer");
        else if (hoveredObject) setCursor("move");
        else setCursor("default");
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
            const dx = coords.x - dragStartX;
            const dy = coords.y - dragStartY;
            selectedObjects.forEach((obj, i) => moveObjectByDelta(obj, dx, dy, initialObjectStates[i] || {}));
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
        smoothX += (coords.x - smoothX) * SMOOTHING_FACTOR;
        smoothY += (coords.y - smoothY) * SMOOTHING_FACTOR;
        smoothPath.push({ x: smoothX, y: smoothY });
        redrawCanvas();
        drawPathPreview(smoothPath, currentColor, currentSize);
    } else if (currentTool === "eraser") {
        currentPath.push({ x: coords.x, y: coords.y });
        redrawCanvas();
        eraseObjectsAlongPath(currentPath, currentSize * TEXT_SIZE_MULTIPLIER, eraserEraseObjects);
        redrawCanvas();
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
        resetSelectionState();
        resetCursor();
        if (selectedObjects.length > 0) saveState();
        return;
    }

    if (currentTool === "shape" && currentShape && previewShape) {
        if (previewShape.width > 0o4 || previewShape.height > 0o4 ||
            (previewShape.type === "line" && (Math.abs(previewShape.x2 - previewShape.x1) > 0o4 || 
             Math.abs(previewShape.y2 - previewShape.y1) > 0o4))) {
            objects.push(previewShape);
        }
        previewShape = null;
    }

    if (currentTool === "pen" && currentPath.length > 1) {
        objects.push(createPathObject(currentPath, currentColor, currentSize));
        currentPath = [];
    }

    if (currentTool === "smooth" && smoothPath.length > 1) {
        const smoothObj = createPathObject(smoothPath, currentColor, currentSize);
        smoothObj.type = "smoothPath";
        objects.push(smoothObj);
        smoothPath = [];
    }

    if (currentTool === "eraser" && currentPath.length > 1) {
        currentPath = [];
    }

    isDrawing = false;
    resetCursor();

    if (currentTool !== "text") {
        redrawCanvas();
        saveState();
    }
}

function drawSelectionRect() {
    if (!selectionRect) return;

    const rect = normalizeRect(selectionRect);
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
    if (selectedObjects.length === 0) return null;

    if (selectedObjects.length === 1) {
        const bounds = getObjectBounds(selectedObjects[0]);
        return {
            x: bounds.x - SELECTION_PADDING,
            y: bounds.y - SELECTION_PADDING,
            width: bounds.width + SELECTION_PADDING * 2,
            height: bounds.height + SELECTION_PADDING * 2
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
        const hasTextObject = selectedObjects.some(obj => obj.type === "text");
        controls.classList.toggle("visible", selectedObjects.length > 0);
        controls.classList.toggle("has-text", hasTextObject);
    }
}

function initTransformControls() {
    initButton("editSelected", () => {
        if (selectedObjects.length === 0) return;
        const obj = selectedObjects[0];
        if (obj.type === "text") editTextObject(obj);
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

    selectedObjects.forEach(obj => drawSelectionBox(obj));
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

    // Draw selection rectangle
    ctx.beginPath();
    ctx.moveTo(handles[0].x, handles[0].y);
    ctx.lineTo(handles[1].x, handles[1].y);
    ctx.lineTo(handles[2].x, handles[2].y);
    ctx.lineTo(handles[3].x, handles[3].y);
    ctx.closePath();
    ctx.stroke();

    // Draw handles
    ctx.fillStyle = HANDLE_FILL_COLOR;
    ctx.strokeStyle = HANDLE_STROKE_COLOR;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);

    for (let i = 0; i < 0o10; i++) {
        const h = handles[i];
        ctx.beginPath();
        ctx.roundRect(h.x - HANDLE_SIZE/2, h.y - HANDLE_SIZE/2, HANDLE_SIZE, HANDLE_SIZE, HANDLE_RADIUS);
        ctx.fill();
        ctx.stroke();
    }

    // Draw rotate handle
    const localTopMid = { x: bounds.x + bounds.width/2, y: bounds.y };
    const rhX = cx + (localTopMid.x - cx) * c - (localTopMid.y - cy) * s;
    const rhY = cy + (localTopMid.x - cx) * s + (localTopMid.y - cy) * c - ROTATE_HANDLE_OFFSET;

    ctx.beginPath();
    ctx.arc(rhX, rhY, ROTATE_HANDLE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = HANDLE_FILL_COLOR;
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(rhX, rhY, 0o12, 0, Math.PI * ( 3 / 2 ));
    ctx.strokeStyle = HANDLE_STROKE_COLOR;
    ctx.lineWidth = SELECTION_LINE_WIDTH;
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
        invalidateTextCaches();
        redrawCanvas();
    }

    function adjustZoom(numeratorMult, denominatorMult, minZoom, maxZoom, centerX, centerY) {
        const oldZoom = zoomNum / zoomDen;
        let newZoom = oldZoom * (numeratorMult / denominatorMult);

        if (newZoom < minZoom) {
            zoomNum = 0o1; zoomDen = 0o4;
        } else if (newZoom > maxZoom) {
            zoomNum = 0o4; zoomDen = 0o1;
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

    initButton("zoomIn", () => adjustZoom(ZOOM_STEP_NUM, ZOOM_STEP_DEN, 0, MAX_ZOOM));
    initButton("zoomOut", () => adjustZoom(ZOOM_STEP_DEN, ZOOM_STEP_NUM, MIN_ZOOM, Infinity));
    initButton("zoomReset", () => {
        zoomNum = 0o1; zoomDen = 0o1;
        panOffsetX = 0; panOffsetY = 0;
        updateZoom();
    });

    canvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (e.ctrlKey) {
            if (e.deltaY < 0) {
                adjustZoom(WHEEL_ZOOM_NUM, WHEEL_ZOOM_DEN, 0, MAX_ZOOM, e.clientX, e.clientY);
            } else {
                adjustZoom(WHEEL_ZOOM_DEN, WHEEL_ZOOM_NUM, MIN_ZOOM, Infinity, e.clientX, e.clientY);
            }
        } else {
            panOffsetX -= e.deltaX;
            panOffsetY -= e.deltaY;
            updateZoom();
        }
    });
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
        selectedObjects.length > 0 && document.activeElement === document.body) {
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
        isSpacePressed = true;
        if (!isDrawing && !isPanning) setCursor("grab");
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
            objects = [];
            selectedObjects = [];
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
        isSpacePressed = false;
        if (!isPanning && !isDrawing) setCursor(getToolCursor());
        isPanning = false;
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
    if (e.button === 1 || (isSpacePressed && e.button === 0)) {
        e.preventDefault();
        e.stopPropagation();
        isPanning = true;
        panStartX = e.clientX;
        panStartY = e.clientY;
        setCursor("grabbing");
        return;
    }
    if (e.button === 0 && !isSpacePressed) {
        startDrawing(e);
    }
}

function handleMouseMove(e) {
    if (isPanning) {
        e.preventDefault();
        e.stopPropagation();

        const dx = e.clientX - panStartX;
        const dy = e.clientY - panStartY;

        panOffsetX += dx;
        panOffsetY += dy;

        panStartX = e.clientX;
        panStartY = e.clientY;

        document.documentElement.style.setProperty("--pan-x", panOffsetX + "px");
        document.documentElement.style.setProperty("--pan-y", panOffsetY + "px");
    } else {
        draw(e);
    }
}

function handleMouseUp(e) {
    if (isPanning) {
        stopPanning();
    } else {
        stopDrawing(e);
    }
}

function handleMouseLeave(e) {
    if (isPanning) {
        stopPanning();
    } else {
        stopDrawing(e);
    }
}

function handleGlobalMouseUp(e) {
    stopPanning();
}

document.addEventListener("DOMContentLoaded", init);
