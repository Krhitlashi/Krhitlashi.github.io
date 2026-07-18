// ≺⧼ Canvas Rendering & Management ⧽≻

import {
    canvas, ctx, state, layerState, objectState, pageState, panState, historyState,
    CANVAS_WIDTH, CANVAS_HEIGHT, PAGE_SIZE_PRESETS,
    HANDLE_SIZE, HANDLE_RADIUS,
    ROTATE_HANDLE_OFFSET, ROTATE_HANDLE_RADIUS, HISTORY_MAX,
    LINE_DASH_PATTERN, SELECTION_LINE_WIDTH, HANDLE_FILL_COLOR, HANDLE_STROKE_COLOR, SELECTION_STROKE_COLOR,
    WhiteboardObject, Page, setActiveCanvas
} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import {
    drawShapePath, drawPathSegments,
    getCenterX, getCenterY, getHandles,
    getConnectionEndpoints
} from "./ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

import {
    drawCachedText, renderHtmlTextToCanvas
} from "./ſןᴜ ʃɜƽ.js";

// ⟪ Canvas Elements 🎨 ⟫

// Active canvas is managed by setActiveCanvas() in the constants module.
// These lightweight wrappers provide backward compatibility.
export function getCurrentCanvas(): HTMLCanvasElement | null { return canvas; }
export function getCurrentCtx(): CanvasRenderingContext2D | null { return ctx; }

export function getPageWidth( page: Page | undefined ): number {
    if ( page?.infinite ) return window.innerWidth;
    return page?.width || CANVAS_WIDTH;
}

export function getPageHeight( page: Page | undefined ): number {
    if ( page?.infinite ) return window.innerHeight;
    return page?.height || CANVAS_HEIGHT;
}

export function isInfinitePage( page: Page | undefined ): boolean {
    return page?.infinite === true;
}

export function setCanvasSizeForPage( pageCanvas: HTMLCanvasElement, page: Page | undefined ): void {
    pageCanvas.width = getPageWidth( page );
    pageCanvas.height = getPageHeight( page );
}

export function updateCanvasSizeDisplay(): void {
    const sizeDisplay = document.getElementById( "canvasSize" );
    if ( sizeDisplay && canvas ) {
        sizeDisplay.textContent = `${canvas.width} × ${canvas.height}`;
    }
    const widthInput = document.getElementById( "customPageWidth" ) as HTMLInputElement | null;
    const heightInput = document.getElementById( "customPageHeight" ) as HTMLInputElement | null;
    if ( canvas && widthInput ) widthInput.value = canvas.width.toString();
    if ( canvas && heightInput ) heightInput.value = canvas.height.toString();
    if ( canvas ) {
        const activePage = pageState.pages.find( p => p.id === pageState.activeId );
        let activePreset = "custom";
        if ( activePage?.infinite ) {
            activePreset = "full";
        } else {
            const matchingPreset = Object.entries( PAGE_SIZE_PRESETS ).find(
                ( [ , size ] ) => size.width === canvas!.width && size.height === canvas!.height
            );
            activePreset = matchingPreset?.[ 0 ] || "custom";
        }
        updatePresetButtons( activePreset );
    }
}

export function updatePresetButtons( activePreset: string ): void {
    const buttons = document.querySelectorAll<HTMLButtonElement>( "#pageSizePresetButtons button[data-preset]" );
    buttons.forEach( btn => {
        const isActive = btn.dataset.preset === activePreset;
        btn.setAttribute( "aria-pressed", isActive.toString() );
    } );
}

/**
 * Update the border class on the canvas based on page type.
 * Infinite (full) pages have no border; other page sizes have a visible border.
 */
function updateCanvasBorder( pageCanvas: HTMLCanvasElement, page: Page ): void {
    pageCanvas.classList.toggle( "bordered-canvas", !page.infinite );
    pageCanvas.classList.toggle( "infinite-canvas", page.infinite );
}

/**
 * Toggle infinite-container mode on the whiteboard container.
 * Infinite pages fill the entire viewport behind the toolbar;
 * non-infinite pages stay in the normal flex layout and are scrollable.
 */
function updateContainerMode( page: Page ): void {
    const container = document.getElementById( "whiteboardContainer" );
    if ( container ) {
        container.classList.toggle( "infinite-container", page.infinite );
    }
    // Reset pan offset when switching from infinite to non-infinite
    if ( !page.infinite ) {
        panState.offsetX = 0;
        panState.offsetY = 0;
        syncPanToCSS();
    }
}

export function switchToPageCanvas( page: Page ): void {
    const pageCanvas = page.id === 1
        ? document.getElementById( "whiteboardCanvas" ) as HTMLCanvasElement
        : document.getElementById( `pageCanvas-${page.id}` ) as HTMLCanvasElement;
    if ( !pageCanvas ) return;
    syncPageObjects();
    setActiveCanvas( pageCanvas );
    setCanvasSizeForPage( pageCanvas, page );
    updateCanvasBorder( pageCanvas, page );
    updateContainerMode( page );
    objectState.objects = page.objects;
    objectState.selected = [];
    redrawCanvas();
    updateCanvasSizeDisplay();
}

export function syncPageObjects(): void {
    const activePage = pageState.pages.find( p => p.id === pageState.activeId );
    if ( activePage ) activePage.objects = [ ...objectState.objects ];
}

// ⟪ Whiteboard Grid Background 📐 ⟫

/**
 * Draws a whiteboard-style dot grid background.
 * Small dots at regular intervals with slightly larger dots every 5th row/col.
 * Offset by pan position so the grid appears fixed in world space.
 */
export function drawWhiteboardGrid( ctx: CanvasRenderingContext2D, width: number, height: number ): void {
    const gridSpacing = 0o30;   // 24px — base-8 friendly
    const dotRadius = 0o1;
    const majorDotRadius = 1 + 0o7 / 0o10;  // 1.875px — base-8 fraction (7/8)
    const dotColor = "#d0d0d0";
    const majorDotColor = "#c0c0c0";

    // Offset grid dots by pan position so they stay fixed in world space
    const offsetX = ( ( panState.offsetX % gridSpacing ) + gridSpacing ) % gridSpacing;
    const offsetY = ( ( panState.offsetY % gridSpacing ) + gridSpacing ) % gridSpacing;

    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect( 0, 0, width, height );

    // Draw dots in a grid pattern offset by pan position
    for ( let x = offsetX; x < width; x += gridSpacing ) {
        for ( let y = offsetY; y < height; y += gridSpacing ) {
            const isMajor = ( ( x - offsetX ) % ( gridSpacing * 0o4 ) === 0 ) || ( ( y - offsetY ) % ( gridSpacing * 0o4 ) === 0 );
            ctx.beginPath();
            ctx.arc( x, y, isMajor ? majorDotRadius : dotRadius, 0, Math.PI * 0o2 );
            ctx.fillStyle = isMajor ? majorDotColor : dotColor;
            ctx.fill();
        }
    }
    ctx.restore();
}

/**
 * Check whether the active page is in full/whiteboard mode.
 */
function isActivePageInfinite(): boolean {
    const activePage = pageState.pages.find( p => p.id === pageState.activeId );
    return activePage?.infinite === true;
}

/**
 * Clamp pan offset for non-infinite pages so the canvas always stays
 * at least partially visible within the viewport.
 * When the canvas fits entirely, it stays fully visible.
 * When zoomed in past the viewport, limits the scroll extent.
 */
function clampPanForPage( panX: number, panY: number ): { x: number; y: number } {
    const activePage = pageState.pages.find( p => p.id === pageState.activeId );
    if ( !activePage || activePage.infinite || !canvas ) return { x: panX, y: panY };

    const zoom = state.zoomNum / state.zoomDen;
    const scaledW = canvas.width * zoom;
    const scaledH = canvas.height * zoom;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Get the container's natural (pre-transform) position
    // getBoundingClientRect includes the current CSS translate,
    // so subtract the current pan offset to get the natural position.
    const container = document.getElementById( "whiteboardContainer" );
    if ( !container ) return { x: panX, y: panY };
    const rect = container.getBoundingClientRect();
    const naturalLeft = rect.left - panState.offsetX;
    const naturalTop = rect.top - panState.offsetY;

    // --- Horizontal clamp ---
    // Fit range: canvas fully visible within viewport
    const fitMinX = -naturalLeft;
    const fitMaxX = vw - naturalLeft - scaledW;

    let clampedX: number;
    if ( fitMinX <= fitMaxX ) {
        // Canvas fits entirely → keep fully visible
        clampedX = Math.max( fitMinX, Math.min( fitMaxX, panX ) );
    } else {
        // Canvas larger than viewport → scroll extent
        const scrollMinX = vw - naturalLeft - scaledW;
        const scrollMaxX = -naturalLeft;
        clampedX = Math.max( scrollMinX, Math.min( scrollMaxX, panX ) );
    }

    // --- Vertical clamp ---
    const fitMinY = -naturalTop;
    const fitMaxY = vh - naturalTop - scaledH;

    let clampedY: number;
    if ( fitMinY <= fitMaxY ) {
        clampedY = Math.max( fitMinY, Math.min( fitMaxY, panY ) );
    } else {
        const scrollMinY = vh - naturalTop - scaledH;
        const scrollMaxY = -naturalTop;
        clampedY = Math.max( scrollMinY, Math.min( scrollMaxY, panY ) );
    }

    return { x: clampedX, y: clampedY };
}

/**
 * Sync the current panState offset to CSS --pan-x/--pan-y variables.
 * Used for non-infinite pages which pan via CSS translate.
 * Also clamps the pan offset so the canvas stays within the viewport.
 * Infinite pages use canvas context translate instead.
 */
export function syncPanToCSS(): void {
    const clamped = clampPanForPage( panState.offsetX, panState.offsetY );
    panState.offsetX = clamped.x;
    panState.offsetY = clamped.y;
    document.documentElement.style.setProperty( "--pan-x", `${panState.offsetX}px` );
    document.documentElement.style.setProperty( "--pan-y", `${panState.offsetY}px` );
}

/**
 * Begin pan-aware drawing context for infinite pages.
 * Call before draw calls, and finishPan after.
 */
export function beginPanTranslation(): void {
    const activePage = pageState.pages.find( p => p.id === pageState.activeId );
    if ( activePage?.infinite && ctx && ( panState.offsetX !== 0 || panState.offsetY !== 0 ) ) {
        ctx.save();
        ctx.translate( panState.offsetX, panState.offsetY );
    }
}

/**
 * End pan-aware drawing context.
 */
export function endPanTranslation(): void {
    const activePage = pageState.pages.find( p => p.id === pageState.activeId );
    if ( activePage?.infinite && ctx && ( panState.offsetX !== 0 || panState.offsetY !== 0 ) ) {
        ctx.restore();
    }
}

// ⟪ Canvas Rendering 🖼️ ⟫

export function redrawCanvas(): void {
    if ( !ctx || !canvas ) return;
    
    const activePage = pageState.pages.find( p => p.id === pageState.activeId );
    if ( activePage?.infinite ) {
        drawWhiteboardGrid( ctx, canvas.width, canvas.height );
    } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect( 0, 0, canvas.width, canvas.height );
    }
    
    beginPanTranslation();
    
    objectState.objects
        .filter( obj => {
            const layer = layerState.layers.find( l => l.id === obj.layerId );
            return layer && layer.visible;
        } )
        .forEach( obj => drawObject( obj ) );
    objectState.selected.forEach( obj => drawSelectionBox( obj ) );
    
    endPanTranslation();
}

export function resizeActivePage( width: number, height: number ): void {
    const activePage = pageState.pages.find( p => p.id === pageState.activeId );
    if ( !activePage || !canvas ) return;

    if ( activePage.infinite ) {
        // For infinite pages, just resize canvas to viewport
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        activePage.width = width;
        activePage.height = height;
        setCanvasSizeForPage( canvas, activePage );
    }
    updateCanvasBorder( canvas, activePage );
    updateContainerMode( activePage );
    updateCanvasSizeDisplay();
    redrawCanvas();
}

export function applyObjectTransform( obj: WhiteboardObject ): void {
    if ( !ctx ) return;
    const cx = getCenterX( obj ), cy = getCenterY( obj );
    if ( obj.rotation !== undefined && obj.rotation !== 0 ) {
        ctx.translate( cx, cy );
        ctx.rotate( obj.rotation );
        ctx.translate( -cx, -cy );
    }
    if ( obj.flipH && obj.width ) {
        ctx.translate( obj.x! + obj.width, 0 );
        ctx.scale( -1, 1 );
        ctx.translate( -obj.x!, 0 );
    }
    if ( obj.flipV && obj.height ) {
        ctx.translate( 0, obj.y! + obj.height );
        ctx.scale( 1, -1 );
        ctx.translate( 0, -obj.y! );
    }
}

function drawObject( obj: WhiteboardObject ): void {
    if ( !ctx ) return;
    ctx.save();
    applyObjectTransform( obj );
    ctx.strokeStyle = obj.color!;
    ctx.fillStyle = obj.color!;
    ctx.lineWidth = obj.size || 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    switch ( obj.type ) {
        case "line":
            ctx.beginPath();
            ctx.moveTo( obj.x1!, obj.y1! );
            ctx.lineTo( obj.x2!, obj.y2! );
            ctx.stroke();
            break;
        case "connection":
            const endpoints = getConnectionEndpoints( obj );
            if ( endpoints ) {
                ctx.beginPath();
                ctx.moveTo( endpoints.start.x, endpoints.start.y );
                ctx.lineTo( endpoints.end.x, endpoints.end.y );
                ctx.stroke();
            }
            break;
        case "circle":
            ctx.beginPath();
            ctx.ellipse( obj.x!, obj.y!, obj.radiusX!, obj.radiusY!, 0, 0, Math.PI * 0o2 );
            ctx.stroke();
            break;
        case "text":
            ctx.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
            if ( obj.useHtmlText ) drawCachedText( ctx, obj );
            else ctx.fillText( obj.text || "", obj.x!, obj.y! );
            break;
        case "path":
        case "smoothPath":
            drawPath( obj );
            break;
        case "shape":
            drawShape( obj );
            break;
    }
    ctx.restore();
}

function drawPath( obj: WhiteboardObject ): void {
    if ( !ctx || obj.points!.length < 2 ) return;
    drawPathSegments( obj.points! );
    ctx.stroke();
}

function drawShape( obj: WhiteboardObject ): void {
    if ( !ctx ) return;
    ctx.strokeStyle = obj.color!;
    ctx.lineWidth = obj.size!;
    ctx.beginPath();
    drawShapePath( obj.x!, obj.y!, obj.width!, obj.height!, obj.shape! );
    ctx.stroke();
}

function drawSelectionBox( obj: WhiteboardObject ): void {
    if ( !ctx ) return;
    const handles = getHandles( obj );
    if ( handles.length < 4 ) return;
    
    // Get corner handles (nw, ne, se, sw are indices 0, 1, 2, 3)
    const nw = handles[ 0 ];
    const ne = handles[ 1 ];
    const se = handles[ 2 ];
    const sw = handles[ 3 ];
    
    ctx.save();
    ctx.strokeStyle = SELECTION_STROKE_COLOR;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = SELECTION_LINE_WIDTH;
    ctx.setLineDash( LINE_DASH_PATTERN );
    
    // Draw rotated rectangle connecting corner handles
    ctx.beginPath();
    ctx.moveTo( nw.x, nw.y );
    ctx.lineTo( ne.x, ne.y );
    ctx.lineTo( se.x, se.y );
    ctx.lineTo( sw.x, sw.y );
    ctx.closePath();
    ctx.stroke();
    
    ctx.restore();
    
    // Draw handles
    ctx.fillStyle = HANDLE_FILL_COLOR;
    ctx.strokeStyle = HANDLE_STROKE_COLOR;
    ctx.lineWidth = 2;
    ctx.setLineDash( [] );
    for ( let i = 0; i < handles.length && i < 0o10; i++ ) {
        const h = handles[ i ];
        if ( h ) {
            ctx.beginPath();
            ctx.roundRect( h.x - HANDLE_SIZE / 2, h.y - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE, HANDLE_RADIUS );
            ctx.fill();
            ctx.stroke();
        }
    }
    
    // Draw rotate handle above top-middle handle
    const topMidHandle = handles[ 4 ]; // "n" handle
    if ( topMidHandle ) {
        const rhX = topMidHandle.x;
        const rhY = topMidHandle.y - ROTATE_HANDLE_OFFSET;
        ctx.beginPath();
        ctx.arc( rhX, rhY, ROTATE_HANDLE_RADIUS, 0, Math.PI * 0o2 );
        ctx.fillStyle = HANDLE_FILL_COLOR;
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc( rhX, rhY, 0o10, 0, Math.PI * ( 3 / 2 ) );
        ctx.strokeStyle = HANDLE_STROKE_COLOR;
        ctx.lineWidth = SELECTION_LINE_WIDTH;
        ctx.stroke();
    }
}

// ⟪ History & State 📚 ⟫

export function saveState(): void {
    historyState.history = historyState.history.slice( 0, historyState.index + 1 );
    syncPageObjects();
    const stateData = {
        layers: JSON.parse( JSON.stringify( layerState.layers ) ),
        pages: JSON.parse( JSON.stringify( pageState.pages ) )
    };
    historyState.history.push( JSON.stringify( stateData ) );
    historyState.index++;
    if ( historyState.history.length > HISTORY_MAX ) {
        historyState.history.shift();
        historyState.index--;
    }
    updateUndoRedoButtons();
}

export function updateUndoRedoButtons(): void {
    const btnStates = [
        { ids: [ "undoBtn", "quickUndo" ], disabled: historyState.index <= 0 },
        { ids: [ "redoBtn", "quickRedo" ], disabled: historyState.index >= historyState.history.length - 1 }
    ];
    btnStates.forEach( ( { ids, disabled } ) => {
        ids.forEach( id => {
            const btn = document.getElementById( id );
            if ( btn ) ( btn as HTMLButtonElement ).disabled = disabled;
        } );
    } );
}
