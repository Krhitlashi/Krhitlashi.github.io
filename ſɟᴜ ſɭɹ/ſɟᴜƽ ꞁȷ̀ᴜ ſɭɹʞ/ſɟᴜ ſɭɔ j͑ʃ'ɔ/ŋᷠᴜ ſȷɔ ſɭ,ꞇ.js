// ≺⧼ Utils and Helpers ⧽≻

// ⟪ Event Helpers 🖱️ ⟫

function getClientCoords(e) {
    const touch = e.touches?.[0] || e.changedTouches?.[0];
    return {
        x: touch ? touch.clientX : e.clientX,
        y: touch ? touch.clientY : e.clientY
    };
}

// ⟪ ID Generation 🆔 ⟫

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

// ⟪ Cursor Helpers 🖰 ⟫

function resetCursor() {
    if (!spaceState.isPressed) {
        setCursor(getToolCursor());
    }
}

function setCursor(cursorType) {
    canvas.classList.remove(...CURSOR_CLASSES);
    canvas.classList.add(`canvas-cursor-${cursorType}`);
}

function getToolCursor() {
    return TOOL_CURSORS[state.tool] || "default";
}

// ⟪ State Reset Helpers 🔄 ⟫

function resetAllState(options = {}) {
    const {
        selection = true,
        panning = true,
        drawing = true,
        textEdit = false
    } = options;

    if (selection) {
        objectState.isDragging = false;
        objectState.isSelecting = false;
        objectState.isResizing = false;
        objectState.isRotating = false;
        objectState.resizeHandle = null;
        objectState.selectionRect = null;
        objectState.dragStartX = 0;
        objectState.dragStartY = 0;
        objectState.initialRotationAngle = 0;
        objectState.initialObjectRotations = [];
        objectState.initialBounds = null;
        objectState.initialCenterX = 0;
        objectState.initialCenterY = 0;
        objectState.initialRotation = 0;
        objectState.initialObjectStates = [];
    }

    if (panning) {
        panState.isPanning = false;
        if (spaceState.isPressed) {
            setCursor("grab");
        } else {
            resetCursor();
        }
    }

    if (drawing) {
        state.isDrawing = false;
        pathState.current = [];
        pathState.preview = null;
    }

    if (textEdit && textState.input) {
        finishTextEditCommon();
    }

    resetCursor();
}

function resetSelectionState() {
    resetAllState({ selection: true, panning: false, drawing: false });
}

function stopPanning() {
    resetAllState({ selection: false, panning: true, drawing: false });
}

// ⟪ Button Initialization Helpers 🎛️ ⟫

function setButtonPressed(groupSelector, btn) {
    document.querySelectorAll(groupSelector).forEach(b =>
        b.setAttribute("aria-pressed", "false")
    );
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

function initButtons(buttonConfigs) {
    buttonConfigs.forEach(({ id, onClick }) => initButton(id, onClick));
}

// ⟪ Text Edit Helpers 📝 ⟫

function startTextEdit() {
    if (!textState.input) {
        initTextEditInput();
    }
}

function positionTextEditInput(x, y, size, color) {
    const zoom = state.zoomNum / state.zoomDen;

    textState.input.style.setProperty("--text-x", (x * zoom) + "px");
    textState.input.style.setProperty("--text-y", ((y - size) * zoom) + "px");
    textState.input.style.setProperty("--text-size", (size * zoom) + "px");
    textState.input.style.setProperty("--text-color", color);
}

function getTextEditPosition() {
    const zoom = state.zoomNum / state.zoomDen;

    const x = parseFloat(textState.input.style.getPropertyValue("--text-x")) / zoom;
    const y = parseFloat(textState.input.style.getPropertyValue("--text-y")) / zoom + state.size * TEXT_SIZE_MULTIPLIER;

    return { textX: x, textY: y };
}

function finishTextEditCommon() {
    textState.input.classList.remove("visible");
    textState.input.value = "";
    textState.isEditing = false;
    textState.editingIndex = TEXT_EDIT_INDEX_NONE;
}

// ⟪ Object Bounds Helpers 📐 ⟫

function getTextBounds(obj) {
    if (obj.useHtmlText && obj.cachedWidth && obj.cachedHeight) {
        return {
            x: obj.x,
            y: obj.y - obj.cachedHeight,
            width: obj.cachedWidth,
            height: obj.cachedHeight
        };
    }
    ctx.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
    const metrics = ctx.measureText(obj.text || "W");
    const width = Math.max(metrics.width, obj.size * TEXT_MIN_WIDTH_MULTIPLIER);
    const height = obj.size;
    return {
        x: obj.x,
        y: obj.y - height,
        width: width,
        height: height
    };
}

function getObjectBounds(obj) {
    return getHandler(obj).getBounds(obj);
}

function getObjectExpandedBounds(obj, padding = 0) {
    const bounds = getObjectBounds(obj);
    return {
        x: bounds.x - padding,
        y: bounds.y - padding,
        width: bounds.width + padding * 2,
        height: bounds.height + padding * 2
    };
}

function getObjectCornerPoints(obj, padding = 0) {
    const bounds = getObjectExpandedBounds(obj, padding);
    return [
        { x: bounds.x, y: bounds.y },
        { x: bounds.x + bounds.width, y: bounds.y },
        { x: bounds.x, y: bounds.y + bounds.height },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height }
    ];
}

function getCenter(obj) {
    return getHandler(obj).getCenter(obj);
}

function getCenterX(obj) {
    return getCenter(obj).x;
}

function getCenterY(obj) {
    return getCenter(obj).y;
}

// ⟪ Point/Object Detection 🎯 ⟫

function isPointInObject(x, y, obj) {
    return getHandler(obj).isPointInside(x, y, obj);
}

function findObjectAtPoint(x, y) {
    for (let i = objectState.objects.length - 1; i >= 0; i--) {
        const obj = objectState.objects[i];
        const layer = layerState.layers.find(l => l.id === obj.layerId);
        if (!layer || !layer.visible) continue;

        if (isPointInObject(x, y, obj)) {
            return obj;
        }
    }
    return null;
}

function distanceToObject(x, y, obj) {
    switch (obj.type) {
        case "line":
            return pointToLineDistance(x, y, obj.x1, obj.y1, obj.x2, obj.y2);
        case "connection":
            const endpoints = getConnectionEndpoints(obj);
            if (!endpoints) return Infinity;
            return pointToLineDistance(x, y, endpoints.start.x, endpoints.start.y, 
                                       endpoints.end.x, endpoints.end.y);
        case "circle":
            const distToCenter = Math.sqrt(Math.pow(x - obj.x, 2) + Math.pow(y - obj.y, 2));
            return Math.abs(distToCenter - Math.max(obj.radiusX, obj.radiusY));
        case "path":
        case "smoothPath":
            let minDist = Infinity;
            for (let i = 0; i < obj.points.length - 1; i++) {
                const p1 = obj.points[i];
                const p2 = obj.points[i + 1];
                const dist = pointToLineDistance(x, y, p1.x, p1.y, p2.x, p2.y);
                minDist = Math.min(minDist, dist);
            }
            return minDist;
        default:
            const bounds = getObjectBounds(obj);
            const closestX = Math.max(bounds.x, Math.min(x, bounds.x + bounds.width));
            const closestY = Math.max(bounds.y, Math.min(y, bounds.y + bounds.height));
            return Math.sqrt(Math.pow(x - closestX, 2) + Math.pow(y - closestY, 2));
    }
}

// ⟪ Geometry Utilities 📏 ⟫

function pointToLineDistance(px, py, x1, y1, x2, y2) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;
    if (param < 0) {
        xx = x1; yy = y1;
    } else if (param > 1) {
        xx = x2; yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
}

function distance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// ⟪ Shape Utilities 🔷 ⟫

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
    ctx.moveTo(x + largeRadius, y);
    ctx.lineTo(x + width - smallRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + smallRadius);
    ctx.lineTo(x + width, y + height - largeRadius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - largeRadius, y + height);
    ctx.lineTo(x + smallRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - smallRadius);
    ctx.lineTo(x, y + largeRadius);
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
            const minDimension = Math.min(width, height);
            const largeRadius = minDimension / 0o3;
            const smallRadius = minDimension / 0o14;
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
        color: state.color,
        size: state.size,
        rotation: 0,
        layerId: layerState.activeId
    };

    switch (shape) {
        case "line":
            return { ...baseObj, type: "line", x1: x1, y1: y1, x2: x2, y2: y2 };
        case "circle":
            return {
                ...baseObj, type: "circle",
                x: (x1 + x2) / 2, y: (y1 + y2) / 2,
                radiusX: Math.abs(x2 - x1) / 2, radiusY: Math.abs(y2 - y1) / 2
            };
        case "square":
        case "triangle":
            return {
                ...baseObj, type: "shape", shape: shape,
                x: Math.min(x1, x2), y: Math.min(y1, y2),
                width: Math.abs(x2 - x1), height: Math.abs(y2 - y1)
            };
        default:
            return null;
    }
}

// ⟪ Path Utilities 〰️ ⟫

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
        layerId: layerState.activeId,
        bounds: { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
    };
}

function drawPathSegments(points) {
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
}

function drawPathPreview(points, color, size) {
    if (points.length < 2) return;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    drawPathSegments(points);
    ctx.stroke();
    ctx.restore();
}

// ⟪ Preview Utilities 👁️ ⟫

function drawPreviewShape(obj) {
    if (!obj) return;

    ctx.save();
    ctx.setLineDash(LINE_DASH_PATTERN);
    ctx.strokeStyle = obj.color;
    ctx.lineWidth = obj.size || 2;
    ctx.globalAlpha = 3 / 4;

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

// ⟪ Rectangle Utilities ⬜ ⟫

function normalizeRect(rect) {
    return {
        x: Math.min(rect.x, rect.x + rect.width),
        y: Math.min(rect.y, rect.y + rect.height),
        width: Math.abs(rect.width),
        height: Math.abs(rect.height)
    };
}

function isObjectInRect(obj, rect) {
    const normalizedRect = normalizeRect(rect);
    const corners = getObjectCornerPoints(obj);

    for (const corner of corners) {
        if (corner.x >= normalizedRect.x && corner.x <= normalizedRect.x + normalizedRect.width &&
            corner.y >= normalizedRect.y && corner.y <= normalizedRect.y + normalizedRect.height) {
            return true;
        }
    }
    return false;
}

// ⟪ Color Utilities 🎨 ⟫

function normalizeHexColor(value) {
    if (!value.startsWith("#")) value = "#" + value;
    return value;
}

function isValidHexColor(value) {
    return /^#[0-9A-Fa-f]{6}$/.test(value);
}

function getContrastingColors(samplePoints) {
    let lightCount = 0;
    let darkCount = 0;

    for (const point of samplePoints) {
        const pixelData = ctx.getImageData(Math.floor(point.x), Math.floor(point.y), 1, 1).data;
        const brightness = (pixelData[0] * 299 + pixelData[1] * 587 + pixelData[2] * 114) / 1000;
        if (brightness > 128) lightCount++;
        else darkCount++;
    }

    return {
        stroke: lightCount > darkCount ? "#000000" : "#ffffff",
        fill: lightCount > darkCount ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"
    };
}

// ⟪ Transform Utilities 🔄 ⟫

function getObjectInitialState(obj) {
    if (obj.type === "line") {
        return { x1: obj.x1, y1: obj.y1, x2: obj.x2, y2: obj.y2 };
    } else if (obj.type === "circle") {
        return { x: obj.x, y: obj.y, radiusX: obj.radiusX, radiusY: obj.radiusY };
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        return {
            bounds: { ...obj.bounds },
            points: obj.points.map(p => ({ x: p.x, y: p.y }))
        };
    } else {
        return { x: obj.x, y: obj.y, width: obj.width, height: obj.height };
    }
}

function invalidateTextCaches() {
    objectState.objects.filter(obj => obj.type === "text" && obj.useHtmlText).forEach(clearTextObjectCache);
}

function clearTextObjectCache(obj) {
    if (obj.type === "text") {
        obj.textDirty = true;
        obj.cachedCanvas = null;
        obj.cachedWidth = null;
        obj.cachedHeight = null;
    }
}

function removeObject(obj) {
    const index = objectState.objects.indexOf(obj);
    if (index > -1) objectState.objects.splice(index, 1);
}

function transformSelectedObjects(transformFn) {
    if (objectState.selected.length === 0) return;
    objectState.selected.forEach(obj => {
        transformFn(obj);
        clearTextObjectCache(obj);
    });
    redrawCanvas();
    saveState();
}

// ⟪ Resize Handle Utilities 🎯 ⟫

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
        { x: bounds.x + bounds.width / 2, y: bounds.y, name: "n" },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height / 2, name: "e" },
        { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height, name: "s" },
        { x: bounds.x, y: bounds.y + bounds.height / 2, name: "w" }
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
    const obj = objectState.selected[0];
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
        { x: bounds.x + bounds.width / 2, y: bounds.y, name: "n" },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height / 2, name: "e" },
        { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height, name: "s" },
        { x: bounds.x, y: bounds.y + bounds.height / 2, name: "w" }
    ];

    for (const h of localHandles) {
        if (Math.abs(localX - h.x) < RESIZE_HANDLE_HITBOX &&
            Math.abs(localY - h.y) < RESIZE_HANDLE_HITBOX) {
            return h.name;
        }
    }
    return null;
}

function findRotateHandle(x, y) {
    const obj = objectState.selected[0];
    if (!obj) return false;

    const cx = getCenterX(obj);
    const cy = getCenterY(obj);
    const bounds = getObjectBounds(obj);
    const rotation = obj.rotation || 0;
    const c = Math.cos(rotation), s = Math.sin(rotation);

    const localTopMid = { x: bounds.x + bounds.width / 2, y: bounds.y };
    const rhX = cx + (localTopMid.x - cx) * c - (localTopMid.y - cy) * s;
    const rhY = cy + (localTopMid.x - cx) * s + (localTopMid.y - cy) * c - ROTATE_HANDLE_OFFSET;

    const dist = Math.sqrt((x - rhX) ** 2 + (y - rhY) ** 2);
    return dist < ROTATE_HANDLE_RADIUS;
}

function getResizeCursor(handle) {
    const cursors = {
        "nw": "nwse-resize", "ne": "nesw-resize",
        "sw": "nesw-resize", "se": "nwse-resize",
        "n": "ns-resize", "s": "ns-resize",
        "w": "ew-resize", "e": "ew-resize"
    };
    return cursors[handle] || "default";
}

function resizeObject(obj, x, y, handle) {
    const rotation = obj.rotation || 0;
    const cx = getCenterX(obj);
    const cy = getCenterY(obj);

    const cosR = Math.cos(-rotation);
    const sinR = Math.sin(-rotation);
    const localX = cx + (x - cx) * cosR - (y - cy) * sinR;
    const localY = cy + (x - cx) * sinR + (y - cy) * cosR;

    const objIndex = objectState.selected.indexOf(obj);
    const init = objectState.initialObjectStates[objIndex] || {};
    const baseBounds = init.bounds || init;

    let newLeft = baseBounds.x, newTop = baseBounds.y;
    let newRight = baseBounds.x + baseBounds.width;
    let newBottom = baseBounds.y + baseBounds.height;

    if (handle.includes("w")) newLeft = localX;
    if (handle.includes("e")) newRight = localX;
    if (handle.includes("n")) newTop = localY;
    if (handle.includes("s")) newBottom = localY;

    const newWidth = Math.max(MIN_SIZE, newRight - newLeft);
    const newHeight = Math.max(MIN_SIZE, newBottom - newTop);

    if (newWidth === MIN_SIZE) {
        if (handle.includes("w")) newLeft = newRight - MIN_SIZE;
        else newRight = newLeft + MIN_SIZE;
    }
    if (newHeight === MIN_SIZE) {
        if (handle.includes("n")) newTop = newBottom - MIN_SIZE;
        else newBottom = newTop + MIN_SIZE;
    }

    if (obj.type === "line") {
        resizeLineObject(obj, handle, baseBounds, newLeft, newTop, newRight, newBottom, newWidth, newHeight);
    } else if (obj.type === "circle") {
        obj.x = (newLeft + newRight) / 2;
        obj.y = (newTop + newBottom) / 2;
        obj.radiusX = newWidth / 2;
        obj.radiusY = newHeight / 2;
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        resizePathObject(obj, handle, baseBounds, newLeft, newTop, newWidth, newHeight, init);
    } else {
        resizeShapeObject(obj, handle, baseBounds, newLeft, newTop, newWidth, newHeight);
    }
}

function resizeLineObject(obj, handle, baseBounds, newLeft, newTop, newRight, newBottom, newWidth, newHeight) {
    const { scaleX, scaleY, originX, originY } = getResizeOriginAndScale(baseBounds, handle, newWidth, newHeight);

    if (handle.includes("n")) {
        obj.y1 = originY + (obj.y1 - originY) * scaleY;
    }
    if (handle.includes("s")) {
        obj.y2 = originY + (obj.y2 - originY) * scaleY;
    }
    if (handle.includes("w")) {
        obj.x1 = originX + (obj.x1 - originX) * scaleX;
    }
    if (handle.includes("e")) {
        obj.x2 = originX + (obj.x2 - originX) * scaleX;
    }
}

function resizePathObject(obj, handle, baseBounds, newLeft, newTop, newWidth, newHeight, init) {
    const { scaleX, scaleY, originX, originY } = getResizeOriginAndScale(baseBounds, handle, newWidth, newHeight);

    if (init.points) {
        init.points.forEach((p, i) => {
            obj.points[i].x = originX + (p.x - originX) * scaleX;
            obj.points[i].y = originY + (p.y - originY) * scaleY;
        });
    }

    obj.bounds.width = newWidth;
    obj.bounds.height = newHeight;
    if (handle.includes("w")) obj.bounds.x = newLeft;
    if (handle.includes("n")) obj.bounds.y = newTop;
}

function resizeShapeObject(obj, handle, baseBounds, newLeft, newTop, newWidth, newHeight) {
    const adjustments = {
        "n": () => { obj.y = newTop; obj.height = newHeight; },
        "s": () => { obj.y = baseBounds.y; obj.height = newHeight; },
        "w": () => { obj.x = newLeft; obj.width = newWidth; },
        "e": () => { obj.x = baseBounds.x; obj.width = newWidth; },
        "nw": () => { obj.x = newLeft; obj.y = newTop; obj.width = newWidth; obj.height = newHeight; },
        "ne": () => { obj.x = baseBounds.x; obj.y = newTop; obj.width = newWidth; obj.height = newHeight; },
        "sw": () => { obj.x = newLeft; obj.y = baseBounds.y; obj.width = newWidth; obj.height = newHeight; },
        "se": () => { obj.x = baseBounds.x; obj.y = baseBounds.y; obj.width = newWidth; obj.height = newHeight; }
    };

    if (adjustments[handle]) adjustments[handle]();

    if (obj.type === "text") {
        obj.size = obj.height / TEXT_SIZE_MULTIPLIER;
        obj.textDirty = true;
        obj.cachedCanvas = null;
        obj.cachedWidth = null;
        obj.cachedHeight = null;
    }
}

// ⟪ Move Object Utilities 🚚 ⟫

function moveObject(obj, newX, newY) {
    if (obj.type === "line") {
        const minX = Math.min(obj.x1, obj.x2);
        const minY = Math.min(obj.y1, obj.y2);
        const dx = newX - minX;
        const dy = newY - minY;
        obj.x1 += dx; obj.y1 += dy;
        obj.x2 += dx; obj.y2 += dy;
    } else if (obj.type === "circle") {
        obj.x = newX; obj.y = newY;
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        const dx = newX - obj.bounds.x;
        const dy = newY - obj.bounds.y;
        obj.points.forEach(p => { p.x += dx; p.y += dy; });
        obj.bounds.x = newX; obj.bounds.y = newY;
    } else {
        obj.x = newX; obj.y = newY;
        clearTextObjectCache(obj);
    }
}

function moveObjectByDelta(obj, dx, dy, initial) {
    if (obj.type === "line") {
        obj.x1 = initial.x1 + dx; obj.y1 = initial.y1 + dy;
        obj.x2 = initial.x2 + dx; obj.y2 = initial.y2 + dy;
    } else if (obj.type === "circle") {
        obj.x = initial.x + dx; obj.y = initial.y + dy;
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        const initBounds = initial.bounds || initial;
        obj.points.forEach((p, i) => {
            const initPoint = initial.points ? initial.points[i] : p;
            p.x = initPoint.x + dx;
            p.y = initPoint.y + dy;
        });
        obj.bounds.x = initBounds.x + dx;
        obj.bounds.y = initBounds.y + dy;
    } else {
        obj.x = initial.x + dx;
        obj.y = initial.y + dy;
        clearTextObjectCache(obj);
    }
}

// ⟪ Eraser Utilities 🧹 ⟫

function expandBounds(bounds, radius) {
    return {
        x: bounds.x - radius,
        y: bounds.y - radius,
        width: bounds.width + radius * 2,
        height: bounds.height + radius * 2
    };
}

function eraseObjectsAlongPath(eraserPath, eraserSize, eraseEntireObjects = false) {
    const objectsToRemove = [];
    const objectsToSplit = [];
    const newObjects = [];
    const eraserRadius = eraserSize;

    for (let i = objectState.objects.length - 1; i >= 0; i--) {
        const obj = objectState.objects[i];
        const layer = layerState.layers.find(l => l.id === obj.layerId);
        if (!layer || !layer.visible) continue;

        if (eraseEntireObjects) {
            if (objectTouchesPath(obj, eraserPath, eraserRadius)) {
                objectsToRemove.push(obj);
            }
        } else {
            const intersection = objectIntersectsPath(obj, eraserPath, eraserRadius);
            if (intersection === "full") {
                objectsToRemove.push(obj);
            } else if (intersection === "partial") {
                objectsToSplit.push({ object: obj, index: i });
            }
        }
    }

    objectsToRemove.forEach(obj => removeObject(obj));

    objectsToSplit.reverse().forEach(item => {
        const { object: obj, index } = item;
        const splitResult = splitObjectByPath(obj, eraserPath, eraserRadius);

        if (splitResult) {
            removeObject(obj);
            if (splitResult.newObjects) {
                splitResult.newObjects.forEach(newObj => {
                    if (newObj && isValidObject(newObj)) {
                        newObjects.push(newObj);
                    }
                });
            }
        }
    });

    newObjects.forEach(obj => objectState.objects.push(obj));
    return objectsToRemove.length + objectsToSplit.length > 0;
}

function objectTouchesPath(obj, path, eraserRadius) {
    const expandedBounds = expandBounds(getObjectBounds(obj), eraserRadius);

    if (obj.type === "line") {
        for (let i = 0; i < path.length - 1; i++) {
            if (segmentsIntersectWithRadius(
                obj.x1, obj.y1, obj.x2, obj.y2,
                path[i].x, path[i].y, path[i + 1].x, path[i + 1].y,
                eraserRadius
            )) return true;
        }
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        for (let j = 0; j < obj.points.length - 1; j++) {
            const p1 = obj.points[j];
            const p2 = obj.points[j + 1];
            for (let i = 0; i < path.length - 1; i++) {
                if (segmentsIntersectWithRadius(
                    p1.x, p1.y, p2.x, p2.y,
                    path[i].x, path[i].y, path[i + 1].x, path[i + 1].y,
                    eraserRadius
                )) return true;
            }
        }
    }

    for (const point of path) {
        if (point.x >= expandedBounds.x && point.x <= expandedBounds.x + expandedBounds.width &&
            point.y >= expandedBounds.y && point.y <= expandedBounds.y + expandedBounds.height) {
            if (distanceToObject(point.x, point.y, obj) <= eraserRadius) return true;
        }
    }
    return false;
}

function objectIntersectsPath(obj, path, eraserRadius) {
    const expandedBounds = expandBounds(getObjectBounds(obj), eraserRadius);
    let anyPointNearObject = false;

    for (const point of path) {
        if (point.x >= expandedBounds.x && point.x <= expandedBounds.x + expandedBounds.width &&
            point.y >= expandedBounds.y && point.y <= expandedBounds.y + expandedBounds.height) {
            anyPointNearObject = true;
            break;
        }
    }

    if (!anyPointNearObject) return "none";

    const objectSamplePoints = getObjectSamplePointsForErasure(obj);
    let coveredCount = 0;

    for (const samplePoint of objectSamplePoints) {
        for (const erasePoint of path) {
            if (distance(samplePoint, erasePoint) <= eraserRadius) {
                coveredCount++;
                break;
            }
        }
    }

    if (coveredCount >= objectSamplePoints.length * 3 / 4) return "full";
    return "partial";
}

function getObjectSamplePointsForErasure(obj) {
    const points = [];
    const bounds = getObjectBounds(obj);
    const center = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };

    points.push(center);
    points.push(
        { x: bounds.x, y: bounds.y },
        { x: bounds.x + bounds.width, y: bounds.y },
        { x: bounds.x, y: bounds.y + bounds.height },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height },
        { x: center.x, y: bounds.y },
        { x: center.x, y: bounds.y + bounds.height },
        { x: bounds.x, y: center.y },
        { x: bounds.x + bounds.width, y: center.y }
    );

    if (obj.type === "path" || obj.type === "smoothPath") {
        obj.points.forEach(p => points.push({ x: p.x, y: p.y }));
    }

    if (obj.type === "line") {
        points.push({ x: obj.x1, y: obj.y1 }, { x: obj.x2, y: obj.y2 });
    }

    return points;
}

function splitObjectByPath(obj, eraserPath, eraserSize) {
    const eraserRadius = eraserSize;

    if (obj.type === "path" || obj.type === "smoothPath") {
        return splitPathObject(obj, eraserPath, eraserRadius);
    } else if (obj.type === "line") {
        return splitLineObject(obj, eraserPath, eraserRadius);
    } else if (obj.type === "circle") {
        return splitCircleObject(obj, eraserPath, eraserRadius);
    }

    return { newObjects: [] };
}

function splitPathObject(obj, eraserPath, eraserRadius) {
    const segments = [];
    let currentSegment = [];

    for (let i = 0; i < obj.points.length; i++) {
        const point = obj.points[i];
        let pointErased = false;

        for (const erasePoint of eraserPath) {
            if (distance(point, erasePoint) <= eraserRadius) {
                pointErased = true;
                break;
            }
        }

        if (i > 0 && !pointErased) {
            const prevPoint = obj.points[i - 1];
            for (let j = 0; j < eraserPath.length - 1; j++) {
                const e1 = eraserPath[j];
                const e2 = eraserPath[j + 1];
                if (segmentsIntersectWithRadius(
                    prevPoint.x, prevPoint.y, point.x, point.y,
                    e1.x, e1.y, e2.x, e2.y, eraserRadius
                )) {
                    pointErased = true;
                    break;
                }
            }
        }

        if (pointErased) {
            if (currentSegment.length > 1) segments.push([...currentSegment]);
            currentSegment = [];
        } else {
            currentSegment.push({ x: point.x, y: point.y });
        }
    }

    if (currentSegment.length > 1) segments.push(currentSegment);

    if (segments.length === 0) return { newObjects: [] };
    if (segments.length === 1 && segments[0].length === obj.points.length) return { newObjects: [obj] };

    const newObjects = segments.map(segment => {
        const xs = segment.map(p => p.x);
        const ys = segment.map(p => p.y);
        return {
            type: obj.type,
            points: segment,
            color: obj.color,
            size: obj.size,
            rotation: 0,
            layerId: obj.layerId,
            bounds: {
                x: Math.min(...xs),
                y: Math.min(...ys),
                width: Math.max(...xs) - Math.min(...xs),
                height: Math.max(...ys) - Math.min(...ys)
            }
        };
    });

    return { newObjects };
}

function splitLineObject(obj, eraserPath, eraserRadius) {
    const intersections = [];

    for (let i = 0; i < eraserPath.length - 1; i++) {
        const e1 = eraserPath[i];
        const e2 = eraserPath[i + 1];

        const expandedEraserSegments = [
            { x1: e1.x - eraserRadius, y1: e1.y, x2: e2.x - eraserRadius, y2: e2.y },
            { x1: e1.x + eraserRadius, y1: e1.y, x2: e2.x + eraserRadius, y2: e2.y }
        ];

        for (const seg of expandedEraserSegments) {
            const t = lineLineIntersection(
                obj.x1, obj.y1, obj.x2, obj.y2,
                seg.x1, seg.y1, seg.x2, seg.y2
            );
            if (t !== null && t >= 0 && t <= 1) intersections.push(t);
        }

        const dist1 = pointToLineDistance(e1.x, e1.y, obj.x1, obj.y1, obj.x2, obj.y2);
        const dist2 = pointToLineDistance(e2.x, e2.y, obj.x1, obj.y1, obj.x2, obj.y2);

        if (dist1 < eraserRadius) {
            const t = getLineT(e1.x, e1.y, obj.x1, obj.y1, obj.x2, obj.y2);
            if (t !== null) intersections.push(t);
        }
        if (dist2 < eraserRadius) {
            const t = getLineT(e2.x, e2.y, obj.x1, obj.y1, obj.x2, obj.y2);
            if (t !== null) intersections.push(t);
        }
    }

    intersections.push(0, 1);
    intersections.sort((a, b) => a - b);
    const unique = [intersections[0]];
    for (let i = 1; i < intersections.length; i++) {
        if (intersections[i] - intersections[i - 1] > MIN_DELTA) unique.push(intersections[i]);
    }

    const newObjects = [];
    for (let i = 0; i < unique.length - 1; i++) {
        const t1 = unique[i];
        const t2 = unique[i + 1];
        const midT = (t1 + t2) / 2;

        const midX = obj.x1 + (obj.x2 - obj.x1) * midT;
        const midY = obj.y1 + (obj.y2 - obj.y1) * midT;

        let isErased = false;
        const midPoint = { x: midX, y: midY };
        for (const erasePoint of eraserPath) {
            if (distance(midPoint, erasePoint) < eraserRadius) {
                isErased = true;
                break;
            }
        }

        if (!isErased) {
            newObjects.push({
                type: "line",
                x1: obj.x1 + (obj.x2 - obj.x1) * t1,
                y1: obj.y1 + (obj.y2 - obj.y1) * t1,
                x2: obj.x1 + (obj.x2 - obj.x1) * t2,
                y2: obj.y1 + (obj.y2 - obj.y1) * t2,
                color: obj.color,
                size: obj.size,
                rotation: 0,
                layerId: obj.layerId
            });
        }
    }

    return { newObjects };
}

function splitCircleObject(obj, eraserPath, eraserRadius) {
    let anyPointErased = false;
    const sampleAngles = [0, Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4, Math.PI, 5 * Math.PI / 4, 3 * Math.PI / 2, 7 * Math.PI / 4];
    const survivingPoints = [];

    for (const angle of sampleAngles) {
        const point = {
            x: obj.x + obj.radiusX * Math.cos(angle),
            y: obj.y + obj.radiusY * Math.sin(angle)
        };

        let pointErased = false;
        for (const erasePoint of eraserPath) {
            if (distance(point, erasePoint) < eraserRadius) {
                pointErased = true;
                anyPointErased = true;
                break;
            }
        }

        if (!pointErased) survivingPoints.push({ angle, x: point.x, y: point.y });
    }

    let centerErased = false;
    const center = { x: obj.x, y: obj.y };
    for (const erasePoint of eraserPath) {
        if (distance(center, erasePoint) < eraserRadius) {
            centerErased = true;
            break;
        }
    }

    if (!anyPointErased) return { newObjects: [obj] };
    if (survivingPoints.length < 3 || centerErased) return { newObjects: [] };
    return { newObjects: [] };
}

function getLineT(x, y, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.abs(dx) > Math.abs(dy) ? (dx !== 0 ? (x - x1) / dx : null) : (dy !== 0 ? (y - y1) / dy : null);
}

function linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom === 0) return false;
    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}

function lineLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom === 0) return null;
    return ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
}

function segmentsIntersectWithRadius(x1, y1, x2, y2, x3, y3, x4, y4, radius) {
    if (linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4)) return true;

    const dist1 = pointToSegmentDistance(x1, y1, x3, y3, x4, y4);
    const dist2 = pointToSegmentDistance(x2, y2, x3, y3, x4, y4);
    if (dist1 <= radius || dist2 <= radius) return true;

    const dist3 = pointToSegmentDistance(x3, y3, x1, y1, x2, y2);
    const dist4 = pointToSegmentDistance(x4, y4, x1, y1, x2, y2);
    return dist3 <= radius || dist4 <= radius;
}

function pointToSegmentDistance(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;

    if (lenSq === 0) return distance({ x: px, y: py }, { x: x1, y: y1 });

    let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));

    const closestX = x1 + t * dx;
    const closestY = y1 + t * dy;

    return distance({ x: px, y: py }, { x: closestX, y: closestY });
}

function isValidObject(obj) {
    if (!obj) return false;
    if (obj.type === "path" || obj.type === "smoothPath") {
        return obj.points && obj.points.length > 1;
    }
    if (obj.type === "line") {
        return Math.abs(obj.x2 - obj.x1) > MIN_DELTA || Math.abs(obj.y2 - obj.y1) > MIN_DELTA;
    }
    return true;
}

// ⟪ Resize Helpers 📐 ⟫

function getResizeOriginAndScale(baseBounds, handle, newWidth, newHeight) {
    const scaleX = newWidth / baseBounds.width;
    const scaleY = newHeight / baseBounds.height;
    const originX = handle.includes("w") ? baseBounds.x + baseBounds.width : baseBounds.x;
    const originY = handle.includes("n") ? baseBounds.y + baseBounds.height : baseBounds.y;

    return { scaleX, scaleY, originX, originY };
}

// ⟪ Object Type Registry 📐 ⟫

const OBJECT_HANDLERS = {
    line: {
        getBounds(obj) {
            return {
                x: Math.min(obj.x1, obj.x2),
                y: Math.min(obj.y1, obj.y2),
                width: Math.abs(obj.x2 - obj.x1),
                height: Math.abs(obj.y2 - obj.y1)
            };
        },
        getCenter(obj) {
            return { x: (obj.x1 + obj.x2) / 2, y: (obj.y1 + obj.y2) / 2 };
        },
        isPointInside(x, y, obj) {
            return pointToLineDistance(x, y, obj.x1, obj.y1, obj.x2, obj.y2) < obj.size + DASH_LENGTH;
        },
        getInitialBounds(obj) {
            return { x1: obj.x1, y1: obj.y1, x2: obj.x2, y2: obj.y2 };
        },
        resize(obj, handle, localX, localY, init) {
            if (handle.includes("n")) obj.y1 = localY;
            if (handle.includes("s")) obj.y2 = localY;
            if (handle.includes("w")) obj.x1 = localX;
            if (handle.includes("e")) obj.x2 = localX;
        }
    },

    circle: {
        getBounds(obj) {
            return {
                x: obj.x - obj.radiusX,
                y: obj.y - obj.radiusY,
                width: obj.radiusX * 2,
                height: obj.radiusY * 2
            };
        },
        getCenter(obj) {
            return { x: obj.x, y: obj.y };
        },
        isPointInside(x, y, obj) {
            const dx = x - obj.x;
            const dy = y - obj.y;
            return (dx * dx) / (obj.radiusX * obj.radiusX) +
                   (dy * dy) / (obj.radiusY * obj.radiusY) <= 1;
        },
        getInitialBounds(obj) {
            return { x: obj.x, y: obj.y, radiusX: obj.radiusX, radiusY: obj.radiusY };
        },
        resize(obj, handle, localX, localY, init) {
            const newLeft = localX, newTop = localY;
            const newRight = init.x + (init.radiusX * 2);
            const newBottom = init.y + (init.radiusY * 2);
            obj.x = (newLeft + newRight) / 2;
            obj.y = (newTop + newBottom) / 2;
            obj.radiusX = Math.max(MIN_SIZE, newRight - newLeft) / 2;
            obj.radiusY = Math.max(MIN_SIZE, newBottom - newTop) / 2;
        }
    },

    text: {
        getBounds(obj) {
            if (obj.useHtmlText && obj.cachedWidth && obj.cachedHeight) {
                return {
                    x: obj.x,
                    y: obj.y - obj.cachedHeight,
                    width: obj.cachedWidth,
                    height: obj.cachedHeight
                };
            }
            ctx.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
            const metrics = ctx.measureText(obj.text || "W");
            const width = Math.max(metrics.width, obj.size * TEXT_MIN_WIDTH_MULTIPLIER);
            const height = obj.size;
            return { x: obj.x, y: obj.y - height, width, height };
        },
        getCenter(obj) {
            const bounds = OBJECT_HANDLERS.text.getBounds(obj);
            return { x: obj.x + bounds.width / 2, y: obj.y - bounds.height / 2 };
        },
        isPointInside(x, y, obj) {
            const bounds = OBJECT_HANDLERS.text.getBounds(obj);
            return x >= bounds.x && x <= bounds.x + bounds.width &&
                   y >= bounds.y && y <= bounds.y + bounds.height;
        },
        getInitialBounds(obj) {
            return { x: obj.x, y: obj.y, width: obj.cachedWidth, height: obj.cachedHeight };
        },
        resize(obj, handle, localX, localY, init) {
            obj.x = localX;
            obj.y = localY + obj.size;
        }
    },

    path: {
        getBounds(obj) {
            return { ...obj.bounds };
        },
        getCenter(obj) {
            return {
                x: obj.bounds.x + obj.bounds.width / 2,
                y: obj.bounds.y + obj.bounds.height / 2
            };
        },
        isPointInside(x, y, obj) {
            return x >= obj.bounds.x && x <= obj.bounds.x + obj.bounds.width &&
                   y >= obj.bounds.y && y <= obj.bounds.y + obj.bounds.height;
        },
        getInitialBounds(obj) {
            return {
                bounds: { ...obj.bounds },
                points: obj.points.map(p => ({ x: p.x, y: p.y }))
            };
        },
        resize(obj, handle, localX, localY, init) {
            const { scaleX, scaleY, originX, originY } = getResizeOriginAndScale(init.bounds, handle, 
                localX - init.bounds.x, localY - init.bounds.y);
            obj.points = init.points.map(p => ({
                x: originX + (p.x - originX) * scaleX,
                y: originY + (p.y - originY) * scaleY
            }));
            const xs = obj.points.map(p => p.x);
            const ys = obj.points.map(p => p.y);
            obj.bounds = {
                x: Math.min(...xs),
                y: Math.min(...ys),
                width: Math.max(...xs) - Math.min(...xs),
                height: Math.max(...ys) - Math.min(...ys)
            };
        }
    },

    smoothPath: {
        getBounds(obj) { return OBJECT_HANDLERS.path.getBounds(obj); },
        getCenter(obj) { return OBJECT_HANDLERS.path.getCenter(obj); },
        isPointInside(x, y, obj) { return OBJECT_HANDLERS.path.isPointInside(x, y, obj); },
        getInitialBounds(obj) { return OBJECT_HANDLERS.path.getInitialBounds(obj); },
        resize(obj, handle, localX, localY, init) { OBJECT_HANDLERS.path.resize(obj, handle, localX, localY, init); }
    },

    connection: {
        getBounds(obj) {
            const endpoints = getConnectionEndpoints(obj);
            if (!endpoints) return { x: 0, y: 0, width: 0, height: 0 };
            return {
                x: Math.min(endpoints.start.x, endpoints.end.x),
                y: Math.min(endpoints.start.y, endpoints.end.y),
                width: Math.abs(endpoints.end.x - endpoints.start.x),
                height: Math.abs(endpoints.end.y - endpoints.start.y)
            };
        },
        getCenter(obj) {
            const endpoints = getConnectionEndpoints(obj);
            if (!endpoints) return { x: 0, y: 0 };
            return {
                x: (endpoints.start.x + endpoints.end.x) / 2,
                y: (endpoints.start.y + endpoints.end.y) / 2
            };
        },
        isPointInside(x, y, obj) {
            const endpoints = getConnectionEndpoints(obj);
            if (!endpoints) return false;
            return pointToLineDistance(x, y, endpoints.start.x, endpoints.start.y, 
                                       endpoints.end.x, endpoints.end.y) < obj.size + DASH_LENGTH;
        },
        getInitialBounds(obj) {
            return { startId: obj.startId, endId: obj.endId };
        },
    },

    shape: {
        getBounds(obj) {
            return {
                x: obj.x,
                y: obj.y,
                width: obj.width || CANVAS_WIDTH,
                height: obj.height || CANVAS_HEIGHT
            };
        },
        getCenter(obj) {
            return {
                x: obj.x + (obj.width || CANVAS_WIDTH) / 2,
                y: obj.y + (obj.height || CANVAS_HEIGHT) / 2
            };
        },
        isPointInside(x, y, obj) {
            return x >= obj.x && x <= obj.x + obj.width &&
                   y >= obj.y && y <= obj.y + obj.height;
        },
        getInitialBounds(obj) {
            return { x: obj.x, y: obj.y, width: obj.width, height: obj.height };
        },
        resize(obj, handle, localX, localY, init) {
            const { scaleX, scaleY, originX, originY } = getResizeOriginAndScale(init, handle, 
                localX - init.x, localY - init.y);
            obj.x = originX;
            obj.y = originY;
            obj.width = Math.max(MIN_SIZE, init.width * scaleX);
            obj.height = Math.max(MIN_SIZE, init.height * scaleY);
        }
    }
};

const DEFAULT_HANDLER = {
    getBounds(obj) {
        return { x: obj.x, y: obj.y, width: CANVAS_WIDTH, height: CANVAS_HEIGHT };
    },
    getCenter(obj) {
        return { x: obj.x + CANVAS_WIDTH / 2, y: obj.y + CANVAS_HEIGHT / 2 };
    },
    isPointInside(x, y, obj) {
        return false;
    },
    getInitialBounds(obj) {
        return { x: obj.x, y: obj.y, width: obj.width, height: obj.height };
    },
    resize(obj, handle, localX, localY, init) {}
};

function getHandler(obj) {
    return OBJECT_HANDLERS[obj.type] || DEFAULT_HANDLER;
}

// ⟪ Connection Helpers 🔗 ⟫

function getConnectionEndpoints(connectionObj) {
    const startObj = objectState.objects.find(o => o.id === connectionObj.startId);
    const endObj = objectState.objects.find(o => o.id === connectionObj.endId);
    if (!startObj || !endObj) return null;
    return { start: getCenter(startObj), end: getCenter(endObj) };
}

function isConnectionValid(connectionObj) {
    return getConnectionEndpoints(connectionObj) !== null;
}

// ⟪ Unified State Reset 🔄 ⟫

function resetAllState(options = {}) {
    const {
        selection = true,
        panning = true,
        drawing = true,
        textEdit = false
    } = options;

    if (selection) {
        objectState.isDragging = false;
        objectState.isSelecting = false;
        objectState.isResizing = false;
        objectState.isRotating = false;
        objectState.resizeHandle = null;
        objectState.selectionRect = null;
        objectState.dragStartX = 0;
        objectState.dragStartY = 0;
        objectState.initialRotationAngle = 0;
        objectState.initialObjectRotations = [];
        objectState.initialBounds = null;
        objectState.initialCenterX = 0;
        objectState.initialCenterY = 0;
        objectState.initialRotation = 0;
        objectState.initialObjectStates = [];
    }

    if (panning) {
        panState.isPanning = false;
    }

    if (drawing) {
        state.isDrawing = false;
        pathState.current = [];
        pathState.preview = null;
    }

    if (textEdit && textState.input) {
        finishTextEditCommon();
    }

    resetCursor();
}
