// ≺⧼ Tool Logic & Drawing ⧽≻

import {
    canvas, stato, panstato, paĝostato, objektstato, vojstato, tekststato, viŝilostato, konektstato, poŝstato, tavolstato,
    ANGULA_RADIUSO,
    TEKSTGRANDA_MULTIPLIKANTO, LINIA_PUNKTO_PATRONO, SELEKTA_LINIO_LARGXO,
    GLATIGA_FACTORO,
    TabulObjekto, Punkto} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import {
    akiriKlientajnKoordinatojn, generiId, restarigiKursoron, agordiKursoron, 
    restarigiSelektanStaton,
    poziciigiTekstanEnigon, akiriTekstanPozicion, finiTekstanRedaktadon,
    akiriObjektonLimojn, akiriCentron, akiriCentronX, akiriCentronY,
    TuŝaMusaEvento, troviObjektonCePunkto,
    desegniRondigitanAngulanVojon, kreiFormanObjekton,
    kreiVojojnObjekton, desegniVojojnAntaprezenton,
    desegniAntaprezentanFormon, normaligiRectangulon, cxuObjektoEnRectangulo,
    akiriKontrastajnKolorojn, akiriObjektonKomencanStaton, 
    troviGrandSxangxanTenilon, troviRotacianTenilon, akiriGrandSxangxanKursoron, grandSxangxiObjekton,
    moviObjektonPerDelta, forvisxiObjektojnLaute
} from "./ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

import {
    redesegniTabulon, aplikiObjektonTransformon, konserviStaton,
    akiriAktualanCtx, komenciPanTradukon, finiPanTradukon,
    akiriAktivanPagon
} from "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɹʞ.js";

import { kalkuliFormajnRadiusojn } from "./ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

export function updateTransformControls(): void {
    const controls = document.getElementById( "transformControls" );
    if ( controls ) {
        const hasTextObject = objektstato.selected.some( obj => obj.type === "text" );
        controls.classList.toggle( "visible", objektstato.selected.length > 0 );
        controls.classList.toggle( "has-text", hasTextObject );
    }
}

// ⟪ Text Editing 📝 ⟫

export function removeEmptyTextObject( index: number ): void {
    if ( index >= 0 && objektstato.objects[ index ] ) {
        objektstato.objects.splice( index, 1 );
        objektstato.selected = [];
        updateTransformControls();
        redesegniTabulon();
        konserviStaton();
    }
}

export function initTextEditInput(): void {
    const input = document.createElement( "div" );
    input.className = "text-edit-input";
    input.contentEditable = "true";
    input.setAttribute( "spellcheck", "false" );
    tekststato.input = input;

    input.addEventListener( "blur", finishTextEditing );
    input.addEventListener( "keydown", ( e ) => {
        if ( e.key === "Escape" ) {
            e.preventDefault();
            cancelTextEditing();
        } else if ( e.key === "Enter" && !e.shiftKey ) {
            e.preventDefault();
            finishTextEditing();
        }
    } );
    input.addEventListener( "input", () => {
        // Run vacepu on the unique class so spans are live while editing
        const uniqueClass = input.dataset.vacepuClass;
        if ( uniqueClass ) window.vacepu( uniqueClass );

        if ( tekststato.editingIndex >= 0 && objektstato.objects[ tekststato.editingIndex ] ) {
            const obj = objektstato.objects[ tekststato.editingIndex ];
            obj.text = input.innerText;
            obj.textDirty = true;
            obj.cachedCanvas = null;
            obj.cachedWidth = null;
            obj.cachedHeight = null;
            redesegniTabulon();
        }
    } );

    document.getElementById( "whiteboardContainer" )!.appendChild( input );
}

export function finishTextEditing(): void {
    if ( !tekststato.isEditing || !tekststato.input ) return;

    const text = tekststato.input.innerText;

    if ( tekststato.editingIndex >= 0 && objektstato.objects[ tekststato.editingIndex ] ) {
        const obj = objektstato.objects[ tekststato.editingIndex ];

        if ( text.trim() === "" ) {
            removeEmptyTextObject( tekststato.editingIndex );
            finiTekstanRedaktadon();
            return;
        }

        obj.text = text;
        obj.color = stato.color;
        obj.textDirty = true;
        obj.cachedCanvas = null;
        obj.cachedWidth = null;
        obj.cachedHeight = null;
        redesegniTabulon();
    } else if ( text.trim() !== "" ) {
        const { textX, textY } = akiriTekstanPozicion();
        objektstato.objects.push( {
            type: "text",
            x: textX, y: textY,
            text: text,
            color: stato.color,
            size: stato.size * TEKSTGRANDA_MULTIPLIKANTO,
            rotation: 0,
            layerId: tavolstato.activeId,
            useHtmlText: tekststato.useHtml,
            textDirty: true,
            cachedWidth: null,
            cachedHeight: null
        } );
        redesegniTabulon();
    }

    finiTekstanRedaktadon();
    konserviStaton();
}

export function cancelTextEditing(): void {
    if ( !tekststato.isEditing || !tekststato.input ) return;

    if ( tekststato.editingIndex >= 0 && objektstato.objects[ tekststato.editingIndex ]?.text?.trim() === "" ) {
        removeEmptyTextObject( tekststato.editingIndex );
    } else {
        finiTekstanRedaktadon();
    }
}

export function editTextObject( obj: TabulObjekto ): void {
    if ( !tekststato.input ) return;
    tekststato.isEditing = true;
    tekststato.editingIndex = objektstato.objects.indexOf( obj );
    poziciigiTekstanEnigon( obj.x!, obj.y!, obj.size!, obj.color! );

    // Assign a unique class so the input event handler can target it with vacepu
    const uniqueClass = "text-edit-vacepu-" + Date.now();
    tekststato.input.dataset.vacepuClass = uniqueClass;
    tekststato.input.className = "text-edit-input visible " + uniqueClass;

    tekststato.input.innerText = obj.text || "";
    window.vacepu( uniqueClass );

    tekststato.input.focus();
    // Select all content in the contenteditable div
    const sel = window.getSelection();
    if ( sel ) {
        const range = document.createRange();
        range.selectNodeContents( tekststato.input );
        sel.removeAllRanges();
        sel.addRange( range );
    }
}

// ⟪ Canvas Input Helpers 🖱️ ⟫

export function akiriTabulajnKoordinatojn( e: TuŝaMusaEvento ): Punkto {
    if ( !canvas ) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const zoom = stato.zoomNum / stato.zoomDen;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const coords = akiriKlientajnKoordinatojn( e );

    // Canvas-pixel coordinates (relative to the viewport/canvas)
    const cpX = ( coords.x - rect.left ) * scaleX;
    const cpY = ( coords.y - rect.top ) * scaleY;
    
    // For infinite pages, convert from canvas-pixel to world coordinates
    // (since redrawCanvas translates context by +pan when drawing objects)
    const activePage = akiriAktivanPagon();
    if ( activePage?.infinite ) {
        return { x: cpX - panstato.offsetX, y: cpY - panstato.offsetY };
    }
    
    return { x: cpX, y: cpY };
}

// ⟪ Drawing Start ✏️ ⟫

export function startDrawing( e: TuŝaMusaEvento ): void {
    e.preventDefault();
    stato.isDrawing = true;

    const coords = akiriTabulajnKoordinatojn( e );
    stato.startX = coords.x;
    stato.startY = coords.y;
    stato.lastX = coords.x;
    stato.lastY = coords.y;

    switch ( stato.tool ) {
        case "select":
            handleSelectToolClick( coords.x, coords.y, e );
            return;
        case "pen":
        case "eraser":
            vojstato.current = [ { x: coords.x, y: coords.y } ];
            break;
        case "smooth":
            vojstato.smooth = [ { x: coords.x, y: coords.y } ];
            vojstato.smoothX = coords.x;
            vojstato.smoothY = coords.y;
            break;
        case "shape":
            if ( stato.shape ) vojstato.preview = kreiFormanObjekton( stato.shape, stato.startX, stato.startY, coords.x, coords.y );
            break;
        case "text":
            createTextBox( stato.startX, stato.startY );
            stato.isDrawing = false;
            break;
        case "connect":
            const clickedObject = troviObjektonCePunkto( coords.x, coords.y );
            if ( clickedObject ) {
                if ( !clickedObject.id ) clickedObject.id = generiId();
                konektstato.startObj = clickedObject;
            } else {
                stato.isDrawing = false;
            }
            break;
    }
}

function createTextBox( x: number, y: number ): void {
    const textObj: TabulObjekto = {
        type: "text", x: x, y: y,
        text: "", color: stato.color,
        size: stato.size * TEKSTGRANDA_MULTIPLIKANTO,
        rotation: 0, layerId: tavolstato.activeId,
        useHtmlText: tekststato.useHtml,
        textDirty: true, cachedWidth: null, cachedHeight: null
    };
    objektstato.objects.push( textObj );
    objektstato.selected = [ textObj ];
    updateTransformControls();
    redesegniTabulon();
    konserviStaton();

    setTimeout( () => editTextObject( textObj ), 0o10 );
}

function handleSelectToolClick( x: number, y: number, e: TuŝaMusaEvento ): void {
    const coords = { x, y };

    if ( objektstato.selected.length > 0 && startRotation( coords.x, coords.y ) ) return;

    const clickedObject = troviObjektonCePunkto( coords.x, coords.y );

    if ( clickedObject ) {
        const wasAlreadySelected = objektstato.selected.includes( clickedObject );

        if ( !e.shiftKey && !wasAlreadySelected ) {
            objektstato.selected = [ clickedObject ];
            updateTransformControls();
            redesegniTabulon();
            if ( startRotation( coords.x, coords.y ) ) return;
            objektstato.isDragging = true;
            objektstato.dragStartX = coords.x;
            objektstato.dragStartY = coords.y;
            objektstato.initialObjectStates = objektstato.selected.map( akiriObjektonKomencanStaton );
            return;
        }
        if ( e.shiftKey ) {
            if ( wasAlreadySelected ) {
                objektstato.selected = objektstato.selected.filter( o => o !== clickedObject );
                updateTransformControls();
                redesegniTabulon();
                return;
            }
            objektstato.selected.push( clickedObject );
        }

        if ( objektstato.selected.length > 0 && startRotation( coords.x, coords.y ) ) return;

        objektstato.isDragging = true;
        objektstato.dragStartX = coords.x;
        objektstato.dragStartY = coords.y;
        objektstato.initialObjectStates = objektstato.selected.map( akiriObjektonKomencanStaton );
    } else {
        if ( !e.shiftKey ) objektstato.selected = [];
        objektstato.isSelecting = true;
        objektstato.selectionRect = { x: stato.startX, y: stato.startY, width: 0, height: 0 };
    }

    updateTransformControls();
    redesegniTabulon();
}

function startRotation( x: number, y: number ): boolean {
    if ( troviRotacianTenilon( x, y ) ) {
        objektstato.isRotating = true;
        const obj = objektstato.selected[ 0 ];
        const center = akiriCentron( obj );
        const dx = x - center.x, dy = y - center.y;
        objektstato.initialRotationAngle = Math.atan2( dy, dx );
        objektstato.initialObjectRotations = objektstato.selected.map( o => o.rotation || 0 );
        redesegniTabulon();
        return true;
    }

    const clickedHandle = troviGrandSxangxanTenilon( x, y );
    if ( clickedHandle ) {
        objektstato.isResizing = true;
        objektstato.resizeHandle = clickedHandle;
        const obj = objektstato.selected[ 0 ];
        objektstato.initialBounds = akiriObjektonLimojn( obj );
        objektstato.initialCenterX = akiriCentronX( obj );
        objektstato.initialCenterY = akiriCentronY( obj );
        objektstato.initialRotation = obj.rotation || 0;
        objektstato.initialObjectStates = objektstato.selected.map( akiriObjektonKomencanStaton );
        redesegniTabulon();
        return true;
    }

    return false;
}

export function rotateSelectedObjects( x: number, y: number ): void {
    const obj = objektstato.selected[ 0 ];
    const center = akiriCentron( obj );
    const dx = x - center.x, dy = y - center.y;
    const currentAngle = Math.atan2( dy, dx );
    const angleDelta = currentAngle - objektstato.initialRotationAngle;
    objektstato.selected.forEach( ( o, i ) => {
        o.rotation = ( objektstato.initialObjectRotations[ i ] || 0 ) + angleDelta;
    } );
    redesegniTabulon();
}

// ⟪ Drawing Move 🖌️ ⟫

export function draw( e: TuŝaMusaEvento ): void {
    e.preventDefault();
    const coords = akiriTabulajnKoordinatojn( e );

    document.getElementById( "cursorPos" )!.textContent =
        `${Math.round( coords.x / 0o10 ) * 0o10}, ${Math.round( coords.y / 0o10 ) * 0o10}`;

    if ( stato.tool === "select" && !stato.isDrawing ) {
        const hoveredObject = troviObjektonCePunkto( coords.x, coords.y );
        const hoveredHandle = troviGrandSxangxanTenilon( coords.x, coords.y );
        const hoveredRotate = troviRotacianTenilon( coords.x, coords.y );
        redesegniTabulon();
        if ( hoveredObject && !objektstato.selected.includes( hoveredObject ) ) {
            komenciPanTradukon();
            drawHoverEffect( hoveredObject );
            finiPanTradukon();
        }
        if ( hoveredHandle ) agordiKursoron( akiriGrandSxangxanKursoron( hoveredHandle ) );
        else if ( hoveredRotate ) agordiKursoron( "pointer" );
        else if ( hoveredObject ) agordiKursoron( "move" );
        else agordiKursoron( "default" );
        return;
    }

    if ( !stato.isDrawing ) return;

    if ( stato.tool === "select" ) {
        if ( objektstato.isResizing && objektstato.resizeHandle && objektstato.selected.length > 0 ) {
            objektstato.selected.forEach( obj => grandSxangxiObjekton( obj, coords.x, coords.y, objektstato.resizeHandle! ) );
            redesegniTabulon();
        } else if ( objektstato.isRotating && objektstato.selected.length > 0 ) {
            rotateSelectedObjects( coords.x, coords.y );
        } else if ( objektstato.isDragging && objektstato.selected.length > 0 ) {
            const dx = coords.x - objektstato.dragStartX;
            const dy = coords.y - objektstato.dragStartY;
            objektstato.selected.forEach( ( obj, i ) => moviObjektonPerDelta( obj, dx, dy, objektstato.initialObjectStates[ i ] || {} ) );
            redesegniTabulon();
        } else if ( objektstato.isSelecting ) {
            objektstato.selectionRect!.width = coords.x - stato.startX;
            objektstato.selectionRect!.height = coords.y - stato.startY;
            redesegniTabulon();
            komenciPanTradukon();
            drawSelectionRect();
            finiPanTradukon();
        }
        return;
    }

    if ( stato.tool === "pen" ) {
        vojstato.current.push( { x: coords.x, y: coords.y } );
        redesegniTabulon();
        komenciPanTradukon();
        desegniVojojnAntaprezenton( vojstato.current, stato.color, stato.size, akiriAktualanCtx() );
        finiPanTradukon();
    } else if ( stato.tool === "smooth" ) {
        vojstato.smoothX += ( coords.x - vojstato.smoothX ) * GLATIGA_FACTORO;
        vojstato.smoothY += ( coords.y - vojstato.smoothY ) * GLATIGA_FACTORO;
        vojstato.smooth.push( { x: vojstato.smoothX, y: vojstato.smoothY } );
        redesegniTabulon();
        komenciPanTradukon();
        desegniVojojnAntaprezenton( vojstato.smooth, stato.color, stato.size, akiriAktualanCtx() );
        finiPanTradukon();
    } else if ( stato.tool === "eraser" ) {
        vojstato.current.push( { x: coords.x, y: coords.y } );
        redesegniTabulon();
        forvisxiObjektojnLaute( vojstato.current, stato.size * TEKSTGRANDA_MULTIPLIKANTO, viŝilostato.eraseObjects );
        redesegniTabulon();
    } else if ( stato.tool === "connect" && konektstato.startObj ) {
        redesegniTabulon();
        komenciPanTradukon();
        const connectCtx = akiriAktualanCtx();
        if ( connectCtx ) {
            connectCtx.save();
            connectCtx.strokeStyle = stato.color;
            connectCtx.lineWidth = stato.size;
            connectCtx.setLineDash( LINIA_PUNKTO_PATRONO );
            connectCtx.beginPath();
            const startC = akiriCentron( konektstato.startObj );
            connectCtx.moveTo( startC.x, startC.y );
            connectCtx.lineTo( coords.x, coords.y );
            connectCtx.stroke();
            connectCtx.restore();
        }
        finiPanTradukon();
    }

    if ( stato.tool === "shape" && stato.shape ) {
        vojstato.preview = kreiFormanObjekton( stato.shape, stato.startX, stato.startY, coords.x, coords.y );
        redesegniTabulon();
        komenciPanTradukon();
        if ( vojstato.preview ) desegniAntaprezentanFormon( vojstato.preview, akiriAktualanCtx() );
        finiPanTradukon();
    }

    stato.lastX = coords.x;
    stato.lastY = coords.y;
}

// ⟪ Drawing Stop ✅ ⟫

export function stopDrawing( e: TuŝaMusaEvento ): void {
    if ( !stato.isDrawing ) return;

    const coords = akiriTabulajnKoordinatojn( e );

    if ( stato.tool === "select" ) {
        if ( objektstato.isSelecting && objektstato.selectionRect ) {
            const rect = normaligiRectangulon( objektstato.selectionRect );
            objektstato.selected = objektstato.objects.filter( obj => cxuObjektoEnRectangulo( obj, rect ) );
            updateTransformControls();
            redesegniTabulon();
        }
        restarigiSelektanStaton();
        restarigiKursoron();
        stato.isDrawing = false;
        if ( objektstato.selected.length > 0 ) konserviStaton();
        return;
    }

    if ( stato.tool === "shape" && stato.shape && vojstato.preview ) {
        let shouldAdd = false;
        if ( vojstato.preview.type === "circle" ) {
            shouldAdd = vojstato.preview.radiusX! > 0o2 || vojstato.preview.radiusY! > 0o2;
        } else if ( vojstato.preview.type === "line" ) {
            shouldAdd = Math.abs( vojstato.preview.x2! - vojstato.preview.x1! ) > 0o4 ||
                Math.abs( vojstato.preview.y2! - vojstato.preview.y1! ) > 0o4;
        } else {
            shouldAdd = vojstato.preview.width! > 0o4 || vojstato.preview.height! > 0o4;
        }

        if ( shouldAdd ) {
            objektstato.objects.push( vojstato.preview );
        }
        vojstato.preview = null;
    }

    if ( stato.tool === "pen" && vojstato.current.length > 1 ) {
        objektstato.objects.push( kreiVojojnObjekton( vojstato.current, stato.color, stato.size ) );
        vojstato.current = [];
    }

    if ( stato.tool === "smooth" && vojstato.smooth.length > 1 ) {
        const smoothObj = kreiVojojnObjekton( vojstato.smooth, stato.color, stato.size );
        smoothObj.type = "smoothPath";
        objektstato.objects.push( smoothObj );
        vojstato.smooth = [];
    }

    if ( stato.tool === "connect" && konektstato.startObj ) {
        const targetObj = troviObjektonCePunkto( coords.x, coords.y );
        if ( targetObj && targetObj !== konektstato.startObj ) {
            if ( !targetObj.id ) targetObj.id = generiId();
            objektstato.objects.push( {
                type: "connection",
                id: generiId(),
                startId: konektstato.startObj.id!,
                endId: targetObj.id,
                color: stato.color,
                size: stato.size,
                layerId: tavolstato.activeId
            } );
        }
        konektstato.startObj = null;
    }

    if ( stato.tool === "eraser" && vojstato.current.length > 1 ) {
        vojstato.current = [];
    }

    stato.isDrawing = false;
    restarigiKursoron();

    if ( stato.tool !== "text" ) {
        redesegniTabulon();
        konserviStaton();
    }
}

// ⟪ Selection & Hover Effects 🎯 ⟫

export function drawSelectionRect(): void {
    if ( !objektstato.selectionRect ) return;
    const ctx = akiriAktualanCtx();
    if ( !ctx ) return;

    const rect = normaligiRectangulon( objektstato.selectionRect );
    const colors = akiriKontrastajnKolorojn( [
        { x: rect.x + 0o4, y: rect.y + 0o4 },
        { x: rect.x + rect.width - 0o4, y: rect.y + rect.height - 0o4 }
    ] );

    const { largeRadius, smallRadius } = kalkuliFormajnRadiusojn( Math.min( rect.width, rect.height ) );

    ctx.save();
    ctx.strokeStyle = colors.stroke;
    ctx.lineWidth = 1;
    ctx.setLineDash( LINIA_PUNKTO_PATRONO );
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

export function drawHoverEffect( obj: TabulObjekto ): void {
    const ctx = akiriAktualanCtx();
    if ( !ctx ) return;
    const colors = akiriKontrastajnKolorojn( [ { x: akiriCentronX( obj ), y: akiriCentronY( obj ) } ] );

    ctx.save();
    aplikiObjektonTransformon( obj );
    ctx.strokeStyle = colors.stroke;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = SELEKTA_LINIO_LARGXO;
    ctx.setLineDash( LINIA_PUNKTO_PATRONO );

    const bounds = akiriObjektonLimojn( obj );
    ctx.beginPath();
    desegniRondigitanAngulanVojon( bounds.x, bounds.y, bounds.width, bounds.height, ANGULA_RADIUSO, false );
    ctx.stroke();
    ctx.restore();
}

// ⟪ Duplicate, Copy, Paste 📋 ⟫

/**
 * Deep-clone each object, assign a fresh id, and shift every coordinate by `offset`.
 * Shared between duplicate and paste to keep offset behaviour in lock-step.
 *     sources ( TabulObjekto[] ) - objects to clone.
 *     offset ( number ) - pixel offset along both axes.
 * Returns array of new cloned objects ( not yet pushed ).
 */
function cloneAndOffsetObjects( sources: TabulObjekto[], offset: number ): TabulObjekto[] {
    return sources.map( obj => {
        const newObj: TabulObjekto = JSON.parse( JSON.stringify( obj ) );
        newObj.id = generiId();

        if ( newObj.x !== undefined ) newObj.x += offset;
        if ( newObj.y !== undefined ) newObj.y += offset;
        if ( newObj.x1 !== undefined ) newObj.x1 += offset;
        if ( newObj.y1 !== undefined ) newObj.y1 += offset;
        if ( newObj.x2 !== undefined ) newObj.x2 += offset;
        if ( newObj.y2 !== undefined ) newObj.y2 += offset;
        if ( newObj.points ) {
            newObj.points = newObj.points.map( ( p: Punkto ) => ( { x: p.x + offset, y: p.y + offset } ) );
        }

        return newObj;
    } );
}

/**
 * Push cloned objects into objektstato.objects and select them.
 * Centralises the duplicate/paste side-effects ( selection, redraw, save ).
 */
function commitClonedObjects( newObjects: TabulObjekto[] ): void {
    newObjects.forEach( obj => objektstato.objects.push( obj ) );
    objektstato.selected = newObjects;
    updateTransformControls();
    redesegniTabulon();
    konserviStaton();
}

export function duplicateSelectedObjects(): void {
    if ( objektstato.selected.length === 0 ) return;
    commitClonedObjects( cloneAndOffsetObjects( objektstato.selected, 0o20 ) );
}

export function copySelectedObjects(): void {
    if ( objektstato.selected.length === 0 ) return;
    poŝstato.objects = objektstato.selected.map( obj => JSON.parse( JSON.stringify( obj ) ) );
}

export function pasteObjects(): void {
    if ( poŝstato.objects.length === 0 ) return;
    commitClonedObjects( cloneAndOffsetObjects( poŝstato.objects, 0o20 ) );
}
