// ≺⧼ ŋᷠᴜ ſȷɔ ſɭ,ꞇ - Utils and Helpers ⧽≻

const CURSOR_CLASSES = [
    'canvas-cursor-grab', 'canvas-cursor-grabbing', 'canvas-cursor-pointer',
    'canvas-cursor-move', 'canvas-cursor-default', 'canvas-cursor-crosshair',
    'canvas-cursor-cell', 'canvas-cursor-text'
];

const TOOL_CURSORS = {
    pen: "crosshair",
    select: "default",
    pan: "grab",
    eraser: "cell",
    text: "text",
    shape: "crosshair",
    smooth: "crosshair"
};


// ⟪ Cursor Helpers 🖰 ⟫

function resetCursor() {
    if (!isSpacePressed) {
        setCursor(getToolCursor());
    }
}

function setCursor(cursorType) {
    canvas.classList.remove(...CURSOR_CLASSES);
    canvas.classList.add(`canvas-cursor-${cursorType}`);
}

function getToolCursor() {
    return TOOL_CURSORS[currentTool] || "default";
}


// ⟪ Text Edit Helpers 📝 ⟫

function startTextEdit() {
    if (!textEditInput) {
        initTextEditInput();
    }
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
    const width = Math.max(metrics.width, obj.size * 0o2);
    const height = Math.max(obj.size, obj.size * 0o2);
    return {
        x: obj.x,
        y: obj.y - height,
        width: width,
        height: height
    };
}

function getObjectBounds(obj) {
    switch (obj.type) {
        case "line":
            return {
                x: Math.min(obj.x1, obj.x2),
                y: Math.min(obj.y1, obj.y2),
                width: Math.abs(obj.x2 - obj.x1),
                height: Math.abs(obj.y2 - obj.y1)
            };
        case "circle":
            return {
                x: obj.x - obj.radiusX,
                y: obj.y - obj.radiusY,
                width: obj.radiusX * 2,
                height: obj.radiusY * 2
            };
        case "path":
        case "smoothPath":
            return {
                x: obj.bounds.x,
                y: obj.bounds.y,
                width: obj.bounds.width,
                height: obj.bounds.height
            };
        case "text":
            return getTextBounds(obj);
        default:
            return {
                x: obj.x,
                y: obj.y,
                width: obj.width || 0o100,
                height: obj.height || 0o100
            };
    }
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


// ⟪ Point/Object Detection 🎯 ⟫

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

function distanceToObject(x, y, obj) {
    switch (obj.type) {
        case "line":
            return pointToLineDistance(x, y, obj.x1, obj.y1, obj.x2, obj.y2);
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

function distance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
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

function getCenter(obj) {
    return { x: getCenterX(obj), y: getCenterY(obj) };
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

        case "square":
        case "triangle":
            return {
                ...baseObj,
                type: "shape",
                shape: shape,
                x: Math.min(x1, x2),
                y: Math.min(y1, y2),
                width: Math.abs(x2 - x1),
                height: Math.abs(y2 - y1)
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


// ⟪ Preview Utilities 👁️ ⟫

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
    let anyInside = false;

    for (const corner of corners) {
        if (corner.x >= normalizedRect.x && corner.x <= normalizedRect.x + normalizedRect.width &&
            corner.y >= normalizedRect.y && corner.y <= normalizedRect.y + normalizedRect.height) {
            anyInside = true;
            break;
        }
    }

    return anyInside;
}


// ⟪ Color Utilities 🎨 ⟫

function normalizeHexColor(value) {
    if (!value.startsWith("#")) {
        value = "#" + value;
    }
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
        if (brightness > 128) {
            lightCount++;
        } else {
            darkCount++;
        }
    }

    return {
        stroke: lightCount > darkCount ? "#000000" : "#ffffff",
        fill: lightCount > darkCount ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"
    };
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

    for (let i = objects.length - 1; i >= 0; i--) {
        const obj = objects[i];
        const layer = layers.find(l => l.id === obj.layerId);
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

    newObjects.forEach(obj => objects.push(obj));

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
            )) {
                return true;
            }
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
                )) {
                    return true;
                }
            }
        }
    }

    for (const point of path) {
        if (point.x >= expandedBounds.x && point.x <= expandedBounds.x + expandedBounds.width &&
            point.y >= expandedBounds.y && point.y <= expandedBounds.y + expandedBounds.height) {
            if (distanceToObject(point.x, point.y, obj) <= eraserRadius) {
                return true;
            }
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

    if (coveredCount >= objectSamplePoints.length * 0.8) {
        return "full";
    }

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
    const eraserRadius = eraserSize / 2;

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
                    e1.x, e1.y, e2.x, e2.y,
                    eraserRadius
                )) {
                    pointErased = true;
                    break;
                }
            }
        }

        if (pointErased) {
            if (currentSegment.length > 1) {
                segments.push([...currentSegment]);
                currentSegment = [];
            }
        } else {
            currentSegment.push({ x: point.x, y: point.y });
        }
    }

    if (currentSegment.length > 1) {
        segments.push(currentSegment);
    }

    if (segments.length === 0) {
        return { newObjects: [] };
    }

    if (segments.length === 1 && segments[0].length === obj.points.length) {
        return { newObjects: [obj] };
    }

    const newObjects = segments.map(segment => {
        const xs = segment.map(p => p.x);
        const ys = segment.map(p => p.y);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);
        const maxX = Math.max(...xs);
        const maxY = Math.max(...ys);

        return {
            type: obj.type,
            points: segment,
            color: obj.color,
            size: obj.size,
            rotation: 0,
            layerId: obj.layerId,
            bounds: {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY
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
            if (t !== null && t >= 0 && t <= 1) {
                intersections.push(t);
            }
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
        if (intersections[i] - intersections[i - 1] > 0.01) {
            unique.push(intersections[i]);
        }
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
    const sampleAngles = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4];
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

        if (!pointErased) {
            survivingPoints.push({ angle, x: point.x, y: point.y });
        }
    }

    let centerErased = false;
    const center = { x: obj.x, y: obj.y };
    for (const erasePoint of eraserPath) {
        if (distance(center, erasePoint) < eraserRadius) {
            centerErased = true;
            break;
        }
    }

    if (!anyPointErased) {
        return { newObjects: [obj] };
    }

    if (survivingPoints.length < 3 || centerErased) {
        return { newObjects: [] };
    }

    return { newObjects: [] };
}

function getLineT(x, y, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (Math.abs(dx) > Math.abs(dy)) {
        return dx !== 0 ? (x - x1) / dx : null;
    }
    return dy !== 0 ? (y - y1) / dy : null;
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
    const t = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    return t;
}

function segmentsIntersectWithRadius(x1, y1, x2, y2, x3, y3, x4, y4, radius) {
    if (linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4)) {
        return true;
    }

    const dist1 = pointToSegmentDistance(x1, y1, x3, y3, x4, y4);
    const dist2 = pointToSegmentDistance(x2, y2, x3, y3, x4, y4);
    if (dist1 <= radius || dist2 <= radius) {
        return true;
    }

    const dist3 = pointToSegmentDistance(x3, y3, x1, y1, x2, y2);
    const dist4 = pointToSegmentDistance(x4, y4, x1, y1, x2, y2);
    if (dist3 <= radius || dist4 <= radius) {
        return true;
    }

    return false;
}

function pointToSegmentDistance(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;

    if (lenSq === 0) {
        return distance({ x: px, y: py }, { x: x1, y: y1 });
    }

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
        return Math.abs(obj.x2 - obj.x1) > 0.1 || Math.abs(obj.y2 - obj.y1) > 0.1;
    }
    return true;
}


// ⟪ Transform Utilities 🔄 ⟫

function getObjectInitialState(obj) {
    if (obj.type === "line") {
        return {
            x1: obj.x1, y1: obj.y1,
            x2: obj.x2, y2: obj.y2
        };
    } else if (obj.type === "circle") {
        return {
            x: obj.x, y: obj.y,
            radiusX: obj.radiusX, radiusY: obj.radiusY
        };
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        return {
            bounds: {
                x: obj.bounds.x,
                y: obj.bounds.y,
                width: obj.bounds.width,
                height: obj.bounds.height
            },
            points: obj.points.map(p => ({ x: p.x, y: p.y }))
        };
    } else if (obj.type === "text") {
        return {
            x: obj.x, y: obj.y,
            width: obj.width, height: obj.height
        };
    } else {
        return {
            x: obj.x, y: obj.y,
            width: obj.width, height: obj.height
        };
    }
}

function invalidateTextCaches() {
    objects.filter(obj => obj.type === "text" && obj.useHtmlText).forEach(obj => {
        obj.textDirty = true;
        obj.cachedCanvas = null;
        obj.cachedWidth = null;
        obj.cachedHeight = null;
    });
}

function resizeObject(obj, x, y, handle) {
    const minSize = 0o10;
    const rotation = obj.rotation || 0;
    const cx = getCenterX(obj);
    const cy = getCenterY(obj);

    const cosR = Math.cos(-rotation);
    const sinR = Math.sin(-rotation);
    const localX = cx + (x - cx) * cosR - (y - cy) * sinR;
    const localY = cy + (x - cx) * sinR + (y - cy) * cosR;

    const objIndex = selectedObjects.indexOf(obj);
    const init = initialObjectStates[objIndex] || {};
    const baseBounds = init.bounds || init;

    let newLeft = baseBounds.x;
    let newTop = baseBounds.y;
    let newRight = baseBounds.x + baseBounds.width;
    let newBottom = baseBounds.y + baseBounds.height;

    if (handle.includes("w")) newLeft = localX;
    if (handle.includes("e")) newRight = localX;
    if (handle.includes("n")) newTop = localY;
    if (handle.includes("s")) newBottom = localY;

    const newWidth = Math.max(minSize, newRight - newLeft);
    const newHeight = Math.max(minSize, newBottom - newTop);

    if (newWidth === minSize) {
        if (handle.includes("w")) newLeft = newRight - minSize;
        else newRight = newLeft + minSize;
    }
    if (newHeight === minSize) {
        if (handle.includes("n")) newTop = newBottom - minSize;
        else newBottom = newTop + minSize;
    }

    if (obj.type === "line") {
        const scaleX = newWidth / baseBounds.width;
        const scaleY = newHeight / baseBounds.height;
        const originX = handle.includes("w") ? baseBounds.x + baseBounds.width : baseBounds.x;
        const originY = handle.includes("n") ? baseBounds.y + baseBounds.height : baseBounds.y;
        
        if (handle === "nw" || handle === "n" || handle === "ne") {
            obj.y1 = originY + (obj.y1 - originY) * scaleY;
        }
        if (handle === "sw" || handle === "s" || handle === "se") {
            obj.y2 = originY + (obj.y2 - originY) * scaleY;
        }
        if (handle === "nw" || handle === "w" || handle === "sw") {
            obj.x1 = originX + (obj.x1 - originX) * scaleX;
        }
        if (handle === "ne" || handle === "e" || handle === "se") {
            obj.x2 = originX + (obj.x2 - originX) * scaleX;
        }
    } else if (obj.type === "circle") {
        const newRadiusX = newWidth / 2;
        const newRadiusY = newHeight / 2;
        const newCenterX = (newLeft + newRight) / 2;
        const newCenterY = (newTop + newBottom) / 2;
        
        obj.x = newCenterX;
        obj.y = newCenterY;
        obj.radiusX = newRadiusX;
        obj.radiusY = newRadiusY;
    } else if (obj.type === "path" || obj.type === "smoothPath") {
        const scaleX = newWidth / baseBounds.width;
        const scaleY = newHeight / baseBounds.height;
        const originX = handle.includes("w") ? baseBounds.x + baseBounds.width : baseBounds.x;
        const originY = handle.includes("n") ? baseBounds.y + baseBounds.height : baseBounds.y;

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
    } else {
        if (handle === "n") {
            obj.y = newTop;
            obj.height = newHeight;
        } else if (handle === "s") {
            obj.y = baseBounds.y;
            obj.height = newHeight;
        } else if (handle === "w") {
            obj.x = newLeft;
            obj.width = newWidth;
        } else if (handle === "e") {
            obj.x = baseBounds.x;
            obj.width = newWidth;
        } else if (handle === "nw") {
            obj.x = newLeft;
            obj.y = newTop;
            obj.width = newWidth;
            obj.height = newHeight;
        } else if (handle === "ne") {
            obj.x = baseBounds.x;
            obj.y = newTop;
            obj.width = newWidth;
            obj.height = newHeight;
        } else if (handle === "sw") {
            obj.x = newLeft;
            obj.y = baseBounds.y;
            obj.width = newWidth;
            obj.height = newHeight;
        } else if (handle === "se") {
            obj.x = baseBounds.x;
            obj.y = baseBounds.y;
            obj.width = newWidth;
            obj.height = newHeight;
        }

        if (obj.type === "text") {
            obj.size = obj.height / 0o4;
            obj.textDirty = true;
            obj.cachedCanvas = null;
            obj.cachedWidth = null;
            obj.cachedHeight = null;
        }
    }
}

function transformSelectedObjects(transformFn) {
    if (selectedObjects.length === 0) return;
    selectedObjects.forEach(obj => {
        transformFn(obj);
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
