// ≺⧼ ſɟᴜ - Whiteboard Application ⧽≻

// ⟪ Initialization 🚀 ⟫

function init() {
    initCanvas();
    initLayers();
    initTextEditInput();
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

function moveLayer(direction) {
    const layerIndex = layers.findIndex(l => l.id === activeLayerId);
    const swapIndex = layerIndex + direction;
    if (swapIndex < 0 || swapIndex >= layers.length) return;

    [layers[layerIndex], layers[swapIndex]] = [layers[swapIndex], layers[layerIndex]];
    renderLayerList();
    saveState();
}

function moveLayerUp() {
    moveLayer(1);
}

function moveLayerDown() {
    moveLayer(-1);
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
    initEraserModeToggle();
}

function initHtmlTextToggle() {
    const htmlTextCheckbox = document.getElementById("htmlTextCheckbox");
    if (!htmlTextCheckbox) return;

    useHtmlText = htmlTextCheckbox.checked;

    htmlTextCheckbox.addEventListener("change", () => {
        useHtmlText = htmlTextCheckbox.checked;
    });
}

function initEraserModeToggle() {
    const eraserModeCheckbox = document.getElementById("eraserModeCheckbox");
    if (!eraserModeCheckbox) return;

    eraserEraseObjects = eraserModeCheckbox.checked;

    eraserModeCheckbox.addEventListener("change", () => {
        eraserEraseObjects = eraserModeCheckbox.checked;
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

    const touch = e.touches?.[0] || e.changedTouches?.[0];
    const clientX = touch ? touch.clientX : e.clientX;
    const clientY = touch ? touch.clientY : e.clientY;

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
            if (currentShape) {
                previewShape = createShapeObject(currentShape, startX, startY, coords.x, coords.y);
            }
            break;
        case "text":
            createTextBox(startX, startY);
            isDrawing = false;
            break;
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
            // Check for resize/rotate handle after selecting
            if (startRotation(coords.x, coords.y)) {
                return;
            }
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

        if (selectedObjects.length > 0 && startRotation(coords.x, coords.y)) {
            return;
        }

        isDragging = true;
        dragStartX = coords.x;
        dragStartY = coords.y;
        initialObjectStates = selectedObjects.map(getObjectInitialState);
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
    if (findRotateHandle(x, y)) {
        isRotating = true;
        const obj = selectedObjects[0];
        const center = { x: getCenterX(obj), y: getCenterY(obj) };
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
        const bounds = getObjectBounds(obj);
        const cx = getCenterX(obj);
        const cy = getCenterY(obj);
        const rotation = obj.rotation || 0;

        initialBounds = bounds;
        initialCenterX = cx;
        initialCenterY = cy;
        initialRotation = rotation;

        initialObjectStates = selectedObjects.map(getObjectInitialState);
        redrawCanvas();
        return true;
    }

    return false;
}

function rotateSelectedObjects(x, y) {
    const obj = selectedObjects[0];
    const center = { x: getCenterX(obj), y: getCenterY(obj) };
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
            const dx = coords.x - dragStartX;
            const dy = coords.y - dragStartY;
            selectedObjects.forEach((obj, i) => {
                const init = initialObjectStates[i] || {};
                moveObjectByDelta(obj, dx, dy, init);
            });
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
        const smoothing = 0o1/0o10;
        smoothX += (coords.x - smoothX) * smoothing;
        smoothY += (coords.y - smoothY) * smoothing;
        smoothPath.push({ x: smoothX, y: smoothY });
        redrawCanvas();
        drawPathPreview(smoothPath, currentColor, currentSize);
    } else if (currentTool === "eraser") {
        currentPath.push({ x: coords.x, y: coords.y });
        redrawCanvas();

        eraseObjectsAlongPath(currentPath, currentSize * 0o4, eraserEraseObjects);
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
        isDragging = false;
        isSelecting = false;
        isResizing = false;
        isRotating = false;
        resizeHandle = null;
        selectionRect = null;
        dragStartX = 0;
        dragStartY = 0;
        initialRotationAngle = 0;
        initialObjectRotations = [];
        initialBounds = null;
        initialCenterX = 0;
        initialCenterY = 0;
        initialRotation = 0;
        initialObjectStates = [];
        isDrawing = false;
        resetCursor();
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
        currentPath = [];
    }

    isDrawing = false;

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
        if (obj.type === "text") {
            obj.textDirty = true;
        }
    }
}

function moveObjectByDelta(obj, dx, dy, initial) {
    if (obj.type === "line") {
        obj.x1 = initial.x1 + dx;
        obj.y1 = initial.y1 + dy;
        obj.x2 = initial.x2 + dx;
        obj.y2 = initial.y2 + dy;
    } else if (obj.type === "circle") {
        obj.x = initial.x + dx;
        obj.y = initial.y + dy;
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        const initBounds = initial.bounds || initial;
        const baseDx = dx;
        const baseDy = dy;
        obj.points.forEach((p, i) => {
            const initPoint = initial.points ? initial.points[i] : p;
            p.x = initPoint.x + baseDx;
            p.y = initPoint.y + baseDy;
        });
        obj.bounds.x = initBounds.x + baseDx;
        obj.bounds.y = initBounds.y + baseDy;
    } else {
        obj.x = initial.x + dx;
        obj.y = initial.y + dy;
        if (obj.type === "text") {
            obj.textDirty = true;
        }
    }
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

function drawHoverEffect(obj) {
    const radius = 0o20;
    const hoverStroke = "#000000";

    ctx.save();

    applyObjectTransform(obj);

    ctx.strokeStyle = hoverStroke;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = 0o2;
    ctx.setLineDash([0o4, 0o4]);

    const bounds = getObjectBounds(obj);

    drawRoundedRectPath(bounds.x, bounds.y, bounds.width, bounds.height, radius, false);
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

function getHandles(obj) {
    const bounds = getObjectBounds(obj);
    const cx = getCenterX(obj);
    const cy = getCenterY(obj);
    const rotation = obj.rotation || 0;
    const c = Math.cos(rotation), s = Math.sin(rotation);

    const localHandles = [
        { x: bounds.x, y: bounds.y, name: "nw" },
        { x: bounds.x + bounds.width, y: bounds.y, name: "ne" },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height, name: "se" },
        { x: bounds.x, y: bounds.y + bounds.height, name: "sw" },
        { x: bounds.x + bounds.width/2, y: bounds.y, name: "n" },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height/2, name: "e" },
        { x: bounds.x + bounds.width/2, y: bounds.y + bounds.height, name: "s" },
        { x: bounds.x, y: bounds.y + bounds.height/2, name: "w" }
    ];

    return localHandles.map(h => ({
        x: cx + (h.x - cx) * c - (h.y - cy) * s,
        y: cy + (h.x - cx) * s + (h.y - cy) * c,
        name: h.name,
        localX: h.x,
        localY: h.y
    }));
}

function findResizeHandle(x, y) {
    const obj = selectedObjects[0];
    if (!obj) return null;

    const cx = getCenterX(obj);
    const cy = getCenterY(obj);
    const rotation = obj.rotation || 0;
    const c = Math.cos(-rotation), s = Math.sin(-rotation);

    const localX = cx + (x - cx) * c - (y - cy) * s;
    const localY = cy + (x - cx) * s + (y - cy) * c;

    const bounds = getObjectBounds(obj);
    const localHandles = [
        { x: bounds.x, y: bounds.y, name: "nw" },
        { x: bounds.x + bounds.width, y: bounds.y, name: "ne" },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height, name: "se" },
        { x: bounds.x, y: bounds.y + bounds.height, name: "sw" },
        { x: bounds.x + bounds.width/2, y: bounds.y, name: "n" },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height/2, name: "e" },
        { x: bounds.x + bounds.width/2, y: bounds.y + bounds.height, name: "s" },
        { x: bounds.x, y: bounds.y + bounds.height/2, name: "w" }
    ];

    const size = 0o30;
    for (const h of localHandles) {
        if (Math.abs(localX - h.x) < size && Math.abs(localY - h.y) < size) {
            return h.name;
        }
    }
    return null;
}

function findRotateHandle(x, y) {
    const obj = selectedObjects[0];
    if (!obj) return false;
    const cx = getCenterX(obj);
    const cy = getCenterY(obj);
    const bounds = getObjectBounds(obj);
    const rotation = obj.rotation || 0;
    const c = Math.cos(rotation), s = Math.sin(rotation);

    const localTopMid = { x: bounds.x + bounds.width/2, y: bounds.y };
    const rhX = cx + (localTopMid.x - cx) * c - (localTopMid.y - cy) * s;
    const rhY = cy + (localTopMid.x - cx) * s + (localTopMid.y - cy) * c - 0o20;

    const dist = Math.sqrt((x - rhX) ** 2 + (y - rhY) ** 2);
    return dist < 0o30;
}

function getResizeCursor(handle) {
    const cursors = {
        "nw": "nwse-resize",
        "ne": "nesw-resize",
        "sw": "nesw-resize",
        "se": "nwse-resize",
        "n": "ns-resize",
        "s": "ns-resize",
        "w": "ew-resize",
        "e": "ew-resize"
    };
    return cursors[handle] || "default";
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
    const handles = getHandles(obj);
    const hs = 0o20, hr = 0o6;
    const cx = getCenterX(obj);
    const cy = getCenterY(obj);
    const bounds = getObjectBounds(obj);
    const rotation = obj.rotation || 0;
    const c = Math.cos(rotation), s = Math.sin(rotation);

    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = 0o2;
    ctx.setLineDash([0o4, 0o4]);

    ctx.beginPath();
    ctx.moveTo(handles[0].x, handles[0].y);
    ctx.lineTo(handles[1].x, handles[1].y);
    ctx.lineTo(handles[2].x, handles[2].y);
    ctx.lineTo(handles[3].x, handles[3].y);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "#181818";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.setLineDash([]);

    for (let i = 0; i < 8; i++) {
        const h = handles[i];
        ctx.beginPath();
        ctx.roundRect(h.x - hs/2, h.y - hs/2, hs, hs, hr);
        ctx.fill();
        ctx.stroke();
    }

    const localTopMid = { x: bounds.x + bounds.width/2, y: bounds.y };
    const rhX = cx + (localTopMid.x - cx) * c - (localTopMid.y - cy) * s;
    const rhY = cy + (localTopMid.x - cx) * s + (localTopMid.y - cy) * c - 0o20;

    ctx.beginPath();
    ctx.arc(rhX, rhY, 0o20, 0, Math.PI * 2);
    ctx.fillStyle = "#181818";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(rhX, rhY, 0o12, 0, Math.PI * 1.5);
    ctx.strokeStyle = "#000000";
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

        invalidateTextCaches();

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

        if (e.ctrlKey) {
            if (e.deltaY < 0) {
                adjustZoom(0o101, 0o100, 0, 0o4, e.clientX, e.clientY);
            } else {
                adjustZoom(0o100, 0o101, 0o1/0o4, Infinity, e.clientX, e.clientY);
            }
        } else {
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
        return;
    }
    if (isCtrl && e.key === "y") {
        e.preventDefault();
        redo();
        return;
    }
    if (isCtrl && e.key === "s") {
        e.preventDefault();
        document.getElementById("saveBtn")?.click();
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

    document.addEventListener("mouseup", handleGlobalMouseUp);

    document.addEventListener("mousedown", (e) => {
        if (e.button === 1) {
            e.preventDefault();
        }
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
        isPanning = false;
        if (isSpacePressed) {
            setCursor("grab");
        } else {
            resetCursor();
        }
    } else {
        stopDrawing(e);
    }
}

function handleMouseLeave(e) {
    if (isPanning) {
        isPanning = false;
        if (isSpacePressed) {
            setCursor("grab");
        } else {
            resetCursor();
        }
    } else {
        stopDrawing(e);
    }
}

function handleGlobalMouseUp(e) {
    if (isPanning) {
        isPanning = false;
        if (isSpacePressed) {
            setCursor("grab");
        } else {
            resetCursor();
        }
    }
}

document.addEventListener("DOMContentLoaded", init);
