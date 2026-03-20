// ≺⧼ Tool Logic & Drawing ⧽≻

import {
    canvas, ctx, state, objectState, pathState, textState, eraserState, connectionState, clipboardState, layerState,
    CORNER_RADIUS,
    TEXT_SIZE_MULTIPLIER, LINE_DASH_PATTERN, SELECTION_LINE_WIDTH,
    SMOOTHING_FACTOR,
    WhiteboardObject, Point} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import {
    getClientCoords, generateId, resetCursor, setCursor, 
    resetSelectionState,
    startTextEdit, positionTextEditInput, getTextEditPosition, finishTextEditCommon,
    getObjectBounds, getCenter, getCenterX, getCenterY,
    TouchOrMouseEvent, findObjectAtPoint,
    drawRoundedRectPath, createShapeObject,
    createPathObject, drawPathPreview,
    drawPreviewShape, normalizeRect, isObjectInRect,
    getContrastingColors, getObjectInitialState, 
    findResizeHandle, findRotateHandle, getResizeCursor, resizeObject,
    moveObjectByDelta, eraseObjectsAlongPath} from "./ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

import {
    redrawCanvas, applyObjectTransform, saveState,
    getCurrentCtx
} from "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɹʞ.js";

export function updateTransformControls(): void {
    const controls = document.getElementById( "transformControls" );
    if ( controls ) {
        const hasTextObject = objectState.selected.some( obj => obj.type === "text" );
        controls.classList.toggle( "visible", objectState.selected.length > 0 );
        controls.classList.toggle( "has-text", hasTextObject );
    }
}

// ⟪ Text Editing 📝 ⟫

export function removeEmptyTextObject( index: number ): void {
    if ( index >= 0 && objectState.objects[ index ] ) {
        objectState.objects.splice( index, 1 );
        objectState.selected = [];
        updateTransformControls();
        redrawCanvas();
        saveState();
    }
}

export function initTextEditInput(): void {
    textState.input = document.createElement( "textarea" );
    textState.input.className = "text-edit-input";

    textState.input.addEventListener( "blur", finishTextEditing );
    textState.input.addEventListener( "keydown", ( e ) => {
        if ( e.key === "Escape" ) {
            e.preventDefault();
            cancelTextEditing();
        } else if ( e.key === "Enter" && !e.shiftKey ) {
            e.preventDefault();
            finishTextEditing();
        }
    } );
    textState.input.addEventListener( "input", () => {
        if ( textState.editingIndex >= 0 && objectState.objects[ textState.editingIndex ] ) {
            const obj = objectState.objects[ textState.editingIndex ];
            obj.text = textState.input!.value;
            obj.textDirty = true;
            obj.cachedCanvas = null;
            obj.cachedWidth = null;
            obj.cachedHeight = null;
            redrawCanvas();
        }
    } );

    document.getElementById( "whiteboardContainer" )!.appendChild( textState.input );
}

export function finishTextEditing(): void {
    if ( !textState.isEditing || !textState.input ) return;

    const text = textState.input.value;

    if ( textState.editingIndex >= 0 && objectState.objects[ textState.editingIndex ] ) {
        const obj = objectState.objects[ textState.editingIndex ];

        if ( text.trim() === "" ) {
            removeEmptyTextObject( textState.editingIndex );
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
    } else if ( text.trim() !== "" ) {
        const { textX, textY } = getTextEditPosition();
        objectState.objects.push( {
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
        } );
        redrawCanvas();
    }

    finishTextEditCommon();
    saveState();
}

export function cancelTextEditing(): void {
    if ( !textState.isEditing || !textState.input ) return;

    if ( textState.editingIndex >= 0 && objectState.objects[ textState.editingIndex ]?.text?.trim() === "" ) {
        removeEmptyTextObject( textState.editingIndex );
    } else {
        finishTextEditCommon();
    }
}

export function editTextObject( obj: WhiteboardObject ): void {
    startTextEdit();
    textState.isEditing = true;
    textState.editingIndex = objectState.objects.indexOf( obj );
    positionTextEditInput( obj.x!, obj.y!, obj.size!, obj.color! );
    textState.input!.value = obj.text || "";
    textState.input!.classList.add( "visible" );
    textState.input!.focus();
    textState.input!.select();
}

// ⟪ Canvas Input Helpers 🖱️ ⟫

export function getCanvasCoords( e: TouchOrMouseEvent ): Point {
    if ( !canvas ) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const zoom = state.zoomNum / state.zoomDen;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const coords = getClientCoords( e );

    return {
        x: ( coords.x - rect.left ) * scaleX,
        y: ( coords.y - rect.top ) * scaleY
    };
}

// ⟪ Drawing Start ✏️ ⟫

export function startDrawing( e: TouchOrMouseEvent ): void {
    e.preventDefault();
    state.isDrawing = true;

    const coords = getCanvasCoords( e );
    state.startX = coords.x;
    state.startY = coords.y;
    state.lastX = coords.x;
    state.lastY = coords.y;

    switch ( state.tool ) {
        case "select":
            handleSelectToolClick( coords.x, coords.y, e );
            return;
        case "pen":
        case "eraser":
            pathState.current = [ { x: coords.x, y: coords.y } ];
            break;
        case "smooth":
            pathState.smooth = [ { x: coords.x, y: coords.y } ];
            pathState.smoothX = coords.x;
            pathState.smoothY = coords.y;
            break;
        case "shape":
            if ( state.shape ) pathState.preview = createShapeObject( state.shape, state.startX, state.startY, coords.x, coords.y );
            break;
        case "text":
            createTextBox( state.startX, state.startY );
            state.isDrawing = false;
            break;
        case "connect":
            const clickedObject = findObjectAtPoint( coords.x, coords.y );
            if ( clickedObject ) {
                if ( !clickedObject.id ) clickedObject.id = generateId();
                connectionState.startObj = clickedObject;
            } else {
                state.isDrawing = false;
            }
            break;
    }
}

function createTextBox( x: number, y: number ): void {
    const textObj: WhiteboardObject = {
        type: "text", x: x, y: y,
        text: "", color: state.color,
        size: state.size * TEXT_SIZE_MULTIPLIER,
        rotation: 0, layerId: layerState.activeId,
        useHtmlText: textState.useHtml,
        textDirty: true, cachedWidth: null, cachedHeight: null
    };
    objectState.objects.push( textObj );
    objectState.selected = [ textObj ];
    updateTransformControls();
    redrawCanvas();
    saveState();

    setTimeout( () => editTextObject( textObj ), 0o10 );
}

function handleSelectToolClick( x: number, y: number, e: TouchOrMouseEvent ): void {
    const coords = { x, y };

    if ( objectState.selected.length > 0 && startRotation( coords.x, coords.y ) ) return;

    const clickedObject = findObjectAtPoint( coords.x, coords.y );

    if ( clickedObject ) {
        const wasAlreadySelected = objectState.selected.includes( clickedObject );

        if ( !e.shiftKey && !wasAlreadySelected ) {
            objectState.selected = [ clickedObject ];
            updateTransformControls();
            redrawCanvas();
            if ( startRotation( coords.x, coords.y ) ) return;
            objectState.isDragging = true;
            objectState.dragStartX = coords.x;
            objectState.dragStartY = coords.y;
            objectState.initialObjectStates = objectState.selected.map( getObjectInitialState );
            return;
        }
        if ( e.shiftKey ) {
            if ( wasAlreadySelected ) {
                objectState.selected = objectState.selected.filter( o => o !== clickedObject );
                updateTransformControls();
                redrawCanvas();
                return;
            }
            objectState.selected.push( clickedObject );
        }

        if ( objectState.selected.length > 0 && startRotation( coords.x, coords.y ) ) return;

        objectState.isDragging = true;
        objectState.dragStartX = coords.x;
        objectState.dragStartY = coords.y;
        objectState.initialObjectStates = objectState.selected.map( getObjectInitialState );
    } else {
        if ( !e.shiftKey ) objectState.selected = [];
        objectState.isSelecting = true;
        objectState.selectionRect = { x: state.startX, y: state.startY, width: 0, height: 0 };
    }

    updateTransformControls();
    redrawCanvas();
}

function startRotation( x: number, y: number ): boolean {
    if ( findRotateHandle( x, y ) ) {
        objectState.isRotating = true;
        const obj = objectState.selected[ 0 ];
        const center = getCenter( obj );
        const dx = x - center.x, dy = y - center.y;
        objectState.initialRotationAngle = Math.atan2( dy, dx );
        objectState.initialObjectRotations = objectState.selected.map( o => o.rotation || 0 );
        redrawCanvas();
        return true;
    }

    const clickedHandle = findResizeHandle( x, y );
    if ( clickedHandle ) {
        objectState.isResizing = true;
        objectState.resizeHandle = clickedHandle;
        const obj = objectState.selected[ 0 ];
        objectState.initialBounds = getObjectBounds( obj );
        objectState.initialCenterX = getCenterX( obj );
        objectState.initialCenterY = getCenterY( obj );
        objectState.initialRotation = obj.rotation || 0;
        objectState.initialObjectStates = objectState.selected.map( getObjectInitialState );
        redrawCanvas();
        return true;
    }

    return false;
}

export function rotateSelectedObjects( x: number, y: number ): void {
    const obj = objectState.selected[ 0 ];
    const center = getCenter( obj );
    const dx = x - center.x, dy = y - center.y;
    const currentAngle = Math.atan2( dy, dx );
    const angleDelta = currentAngle - objectState.initialRotationAngle;
    objectState.selected.forEach( ( o, i ) => {
        o.rotation = ( objectState.initialObjectRotations[ i ] || 0 ) + angleDelta;
    } );
    redrawCanvas();
}

// ⟪ Drawing Move 🖌️ ⟫

export function draw( e: TouchOrMouseEvent ): void {
    e.preventDefault();
    const coords = getCanvasCoords( e );

    document.getElementById( "cursorPos" )!.textContent =
        `${Math.round( coords.x / 0o10 ) * 0o10}, ${Math.round( coords.y / 0o10 ) * 0o10}`;

    if ( state.tool === "select" && !state.isDrawing ) {
        const hoveredObject = findObjectAtPoint( coords.x, coords.y );
        const hoveredHandle = findResizeHandle( coords.x, coords.y );
        const hoveredRotate = findRotateHandle( coords.x, coords.y );
        redrawCanvas();
        if ( hoveredObject && !objectState.selected.includes( hoveredObject ) ) drawHoverEffect( hoveredObject );
        if ( hoveredHandle ) setCursor( getResizeCursor( hoveredHandle ) );
        else if ( hoveredRotate ) setCursor( "pointer" );
        else if ( hoveredObject ) setCursor( "move" );
        else setCursor( "default" );
        return;
    }

    if ( !state.isDrawing ) return;

    if ( state.tool === "select" ) {
        if ( objectState.isResizing && objectState.resizeHandle && objectState.selected.length > 0 ) {
            objectState.selected.forEach( obj => resizeObject( obj, coords.x, coords.y, objectState.resizeHandle! ) );
            redrawCanvas();
        } else if ( objectState.isRotating && objectState.selected.length > 0 ) {
            rotateSelectedObjects( coords.x, coords.y );
        } else if ( objectState.isDragging && objectState.selected.length > 0 ) {
            const dx = coords.x - objectState.dragStartX;
            const dy = coords.y - objectState.dragStartY;
            objectState.selected.forEach( ( obj, i ) => moveObjectByDelta( obj, dx, dy, objectState.initialObjectStates[ i ] || {} ) );
            redrawCanvas();
        } else if ( objectState.isSelecting ) {
            objectState.selectionRect!.width = coords.x - state.startX;
            objectState.selectionRect!.height = coords.y - state.startY;
            redrawCanvas();
            drawSelectionRect();
        }
        return;
    }

    if ( state.tool === "pen" ) {
        pathState.current.push( { x: coords.x, y: coords.y } );
        redrawCanvas();
        drawPathPreview( pathState.current, state.color, state.size, getCurrentCtx() );
    } else if ( state.tool === "smooth" ) {
        pathState.smoothX += ( coords.x - pathState.smoothX ) * SMOOTHING_FACTOR;
        pathState.smoothY += ( coords.y - pathState.smoothY ) * SMOOTHING_FACTOR;
        pathState.smooth.push( { x: pathState.smoothX, y: pathState.smoothY } );
        redrawCanvas();
        drawPathPreview( pathState.smooth, state.color, state.size, getCurrentCtx() );
    } else if ( state.tool === "eraser" ) {
        pathState.current.push( { x: coords.x, y: coords.y } );
        redrawCanvas();
        eraseObjectsAlongPath( pathState.current, state.size * TEXT_SIZE_MULTIPLIER, eraserState.eraseObjects );
        redrawCanvas();
    } else if ( state.tool === "connect" && connectionState.startObj ) {
        redrawCanvas();
        ctx!.save();
        ctx!.strokeStyle = state.color;
        ctx!.lineWidth = state.size;
        ctx!.setLineDash( LINE_DASH_PATTERN );
        ctx!.beginPath();
        const startC = getCenter( connectionState.startObj );
        ctx!.moveTo( startC.x, startC.y );
        ctx!.lineTo( coords.x, coords.y );
        ctx!.stroke();
        ctx!.restore();
    }

    if ( state.tool === "shape" && state.shape ) {
        pathState.preview = createShapeObject( state.shape, state.startX, state.startY, coords.x, coords.y );
        redrawCanvas();
        if ( pathState.preview ) drawPreviewShape( pathState.preview, getCurrentCtx() );
    }

    state.lastX = coords.x;
    state.lastY = coords.y;
}

// ⟪ Drawing Stop ✅ ⟫

export function stopDrawing( e: TouchOrMouseEvent ): void {
    if ( !state.isDrawing ) return;

    const coords = getCanvasCoords( e );

    if ( state.tool === "select" ) {
        if ( objectState.isSelecting && objectState.selectionRect ) {
            const rect = normalizeRect( objectState.selectionRect );
            objectState.selected = objectState.objects.filter( obj => isObjectInRect( obj, rect ) );
            updateTransformControls();
            redrawCanvas();
        }
        resetSelectionState();
        resetCursor();
        state.isDrawing = false;
        if ( objectState.selected.length > 0 ) saveState();
        return;
    }

    if ( state.tool === "shape" && state.shape && pathState.preview ) {
        let shouldAdd = false;
        if ( pathState.preview.type === "circle" ) {
            shouldAdd = pathState.preview.radiusX! > 0o2 || pathState.preview.radiusY! > 0o2;
        } else if ( pathState.preview.type === "line" ) {
            shouldAdd = Math.abs( pathState.preview.x2! - pathState.preview.x1! ) > 0o4 ||
                Math.abs( pathState.preview.y2! - pathState.preview.y1! ) > 0o4;
        } else {
            shouldAdd = pathState.preview.width! > 0o4 || pathState.preview.height! > 0o4;
        }

        if ( shouldAdd ) {
            objectState.objects.push( pathState.preview );
        }
        pathState.preview = null;
    }

    if ( state.tool === "pen" && pathState.current.length > 1 ) {
        objectState.objects.push( createPathObject( pathState.current, state.color, state.size ) );
        pathState.current = [];
    }

    if ( state.tool === "smooth" && pathState.smooth.length > 1 ) {
        const smoothObj = createPathObject( pathState.smooth, state.color, state.size );
        smoothObj.type = "smoothPath";
        objectState.objects.push( smoothObj );
        pathState.smooth = [];
    }

    if ( state.tool === "connect" && connectionState.startObj ) {
        const targetObj = findObjectAtPoint( coords.x, coords.y );
        if ( targetObj && targetObj !== connectionState.startObj ) {
            if ( !targetObj.id ) targetObj.id = generateId();
            objectState.objects.push( {
                type: "connection",
                id: generateId(),
                startId: connectionState.startObj.id!,
                endId: targetObj.id,
                color: state.color,
                size: state.size,
                layerId: layerState.activeId
            } );
        }
        connectionState.startObj = null;
    }

    if ( state.tool === "eraser" && pathState.current.length > 1 ) {
        pathState.current = [];
    }

    state.isDrawing = false;
    resetCursor();

    if ( state.tool !== "text" ) {
        redrawCanvas();
        saveState();
    }
}

// ⟪ Selection & Hover Effects 🎯 ⟫

export function drawSelectionRect(): void {
    if ( !objectState.selectionRect ) return;
    const ctx = getCurrentCtx();
    if ( !ctx ) return;

    const rect = normalizeRect( objectState.selectionRect );
    const colors = getContrastingColors( [
        { x: rect.x + 0o4, y: rect.y + 0o4 },
        { x: rect.x + rect.width - 0o4, y: rect.y + rect.height - 0o4 }
    ] );

    const minDimension = Math.min( rect.width, rect.height );
    const largeRadius = minDimension / 0o3;
    const smallRadius = minDimension / 0o14;

    ctx.save();
    ctx.strokeStyle = colors.stroke;
    ctx.lineWidth = 1;
    ctx.setLineDash( LINE_DASH_PATTERN );
    ctx.fillStyle = colors.fill;
    ctx.beginPath();
    ctx.moveTo( rect.x + largeRadius, rect.y );
    ctx.lineTo( rect.x + rect.width - smallRadius, rect.y );
    ctx.quadraticCurveTo( rect.x + rect.width, rect.y, rect.x + rect.width, rect.y + smallRadius );
    ctx.lineTo( rect.x + rect.width, rect.y + rect.height - largeRadius );
    ctx.quadraticCurveTo( rect.x + rect.width, rect.y + rect.height, rect.x + rect.width - largeRadius, rect.y + rect.height );
    ctx.lineTo( rect.x + smallRadius, rect.y + rect.height );
    ctx.quadraticCurveTo( rect.x, rect.y + rect.height, rect.x, rect.y + rect.height - smallRadius );
    ctx.lineTo( rect.x, rect.y + largeRadius );
    ctx.quadraticCurveTo( rect.x, rect.y, rect.x + largeRadius, rect.y );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

export function drawHoverEffect( obj: WhiteboardObject ): void {
    const ctx = getCurrentCtx();
    if ( !ctx ) return;
    const colors = getContrastingColors( [ { x: getCenterX( obj ), y: getCenterY( obj ) } ] );

    ctx.save();
    applyObjectTransform( obj );
    ctx.strokeStyle = colors.stroke;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = SELECTION_LINE_WIDTH;
    ctx.setLineDash( LINE_DASH_PATTERN );

    const bounds = getObjectBounds( obj );
    ctx.beginPath();
    drawRoundedRectPath( bounds.x, bounds.y, bounds.width, bounds.height, CORNER_RADIUS, false );
    ctx.stroke();
    ctx.restore();
}

// ⟪ Duplicate, Copy, Paste 📋 ⟫

export function duplicateSelectedObjects(): void {
    if ( objectState.selected.length === 0 ) return;

    const newObjects: WhiteboardObject[] = [];
    const offset = 0o20;

    objectState.selected.forEach( obj => {
        const newObj = JSON.parse( JSON.stringify( obj ) );
        newObj.id = generateId();

        if ( newObj.x !== undefined ) newObj.x += offset;
        if ( newObj.y !== undefined ) newObj.y += offset;
        if ( newObj.x1 !== undefined ) newObj.x1 += offset;
        if ( newObj.y1 !== undefined ) newObj.y1 += offset;
        if ( newObj.x2 !== undefined ) newObj.x2 += offset;
        if ( newObj.y2 !== undefined ) newObj.y2 += offset;
        if ( newObj.points ) {
            newObj.points = newObj.points.map( ( p: Point ) => ( { x: p.x + offset, y: p.y + offset } ) );
        }

        objectState.objects.push( newObj );
        newObjects.push( newObj );
    } );

    objectState.selected = newObjects;
    updateTransformControls();
    redrawCanvas();
    saveState();
}

export function copySelectedObjects(): void {
    if ( objectState.selected.length === 0 ) return;
    clipboardState.objects = objectState.selected.map( obj => JSON.parse( JSON.stringify( obj ) ) );
}

export function pasteObjects(): void {
    if ( clipboardState.objects.length === 0 ) return;

    const newObjects: WhiteboardObject[] = [];
    const offset = 0o20;

    clipboardState.objects.forEach( obj => {
        const newObj = JSON.parse( JSON.stringify( obj ) );
        newObj.id = generateId();

        if ( newObj.x !== undefined ) newObj.x += offset;
        if ( newObj.y !== undefined ) newObj.y += offset;
        if ( newObj.x1 !== undefined ) newObj.x1 += offset;
        if ( newObj.y1 !== undefined ) newObj.y1 += offset;
        if ( newObj.x2 !== undefined ) newObj.x2 += offset;
        if ( newObj.y2 !== undefined ) newObj.y2 += offset;
        if ( newObj.points ) {
            newObj.points = newObj.points.map( ( p: Point ) => ( { x: p.x + offset, y: p.y + offset } ) );
        }

        objectState.objects.push( newObj );
        newObjects.push( newObj );
    } );

    objectState.selected = newObjects;
    updateTransformControls();
    redrawCanvas();
    saveState();
}
