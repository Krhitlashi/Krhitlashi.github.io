// ≺⧼ Canvas Rendering & Management ⧽≻

import {
    canvas, ctx, layerState, objectState, pageState, historyState,
    HANDLE_SIZE, HANDLE_RADIUS,
    ROTATE_HANDLE_OFFSET, ROTATE_HANDLE_RADIUS, HISTORY_MAX,
    LINE_DASH_PATTERN, SELECTION_LINE_WIDTH, HANDLE_FILL_COLOR, HANDLE_STROKE_COLOR, SELECTION_STROKE_COLOR,
    WhiteboardObject, Page
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

let currentCanvas: HTMLCanvasElement | null = canvas;
let currentCtx: CanvasRenderingContext2D | null = ctx;

export function setCurrentCanvas( c: HTMLCanvasElement | null ): void { currentCanvas = c; }
export function setCurrentCtx( c: CanvasRenderingContext2D | null ): void { currentCtx = c; }
export function getCurrentCanvas(): HTMLCanvasElement | null { return currentCanvas; }
export function getCurrentCtx(): CanvasRenderingContext2D | null { return currentCtx; }

export function switchToPageCanvas( page: Page ): void {
    const pageCanvas = page.id === 1
        ? document.getElementById( "whiteboardCanvas" ) as HTMLCanvasElement
        : document.getElementById( `pageCanvas-${page.id}` ) as HTMLCanvasElement;
    if ( !pageCanvas ) return;
    syncPageObjects();
    currentCanvas = pageCanvas;
    currentCtx = pageCanvas.getContext( "2d" );
    objectState.objects = page.objects;
    objectState.selected = [];
    redrawCanvas();
}

export function syncPageObjects(): void {
    const activePage = pageState.pages.find( p => p.id === pageState.activeId );
    if ( activePage ) activePage.objects = [ ...objectState.objects ];
}

// ⟪ Canvas Rendering 🖼️ ⟫

export function redrawCanvas(): void {
    if ( !currentCtx || !currentCanvas ) return;
    currentCtx.fillStyle = "#ffffff";
    currentCtx.fillRect( 0, 0, currentCanvas.width, currentCanvas.height );
    objectState.objects
        .filter( obj => {
            const layer = layerState.layers.find( l => l.id === obj.layerId );
            return layer && layer.visible;
        } )
        .forEach( obj => drawObject( obj ) );
    objectState.selected.forEach( obj => drawSelectionBox( obj ) );
}

export function applyObjectTransform( obj: WhiteboardObject ): void {
    if ( !currentCtx ) return;
    const cx = getCenterX( obj ), cy = getCenterY( obj );
    if ( obj.rotation !== undefined && obj.rotation !== 0 ) {
        currentCtx.translate( cx, cy );
        currentCtx.rotate( obj.rotation );
        currentCtx.translate( -cx, -cy );
    }
    if ( obj.flipH && obj.width ) {
        currentCtx.translate( obj.x! + obj.width, 0 );
        currentCtx.scale( -1, 1 );
        currentCtx.translate( -obj.x!, 0 );
    }
    if ( obj.flipV && obj.height ) {
        currentCtx.translate( 0, obj.y! + obj.height );
        currentCtx.scale( 1, -1 );
        currentCtx.translate( 0, -obj.y! );
    }
}

function drawObject( obj: WhiteboardObject ): void {
    if ( !currentCtx ) return;
    currentCtx.save();
    applyObjectTransform( obj );
    currentCtx.strokeStyle = obj.color!;
    currentCtx.fillStyle = obj.color!;
    currentCtx.lineWidth = obj.size || 2;
    currentCtx.lineCap = "round";
    currentCtx.lineJoin = "round";
    switch ( obj.type ) {
        case "line":
            currentCtx.beginPath();
            currentCtx.moveTo( obj.x1!, obj.y1! );
            currentCtx.lineTo( obj.x2!, obj.y2! );
            currentCtx.stroke();
            break;
        case "connection":
            const endpoints = getConnectionEndpoints( obj );
            if ( endpoints ) {
                currentCtx.beginPath();
                currentCtx.moveTo( endpoints.start.x, endpoints.start.y );
                currentCtx.lineTo( endpoints.end.x, endpoints.end.y );
                currentCtx.stroke();
            }
            break;
        case "circle":
            currentCtx.beginPath();
            currentCtx.ellipse( obj.x!, obj.y!, obj.radiusX!, obj.radiusY!, 0, 0, Math.PI * 2 );
            currentCtx.stroke();
            break;
        case "text":
            currentCtx.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
            if ( obj.useHtmlText ) drawCachedText( currentCtx, obj );
            else currentCtx.fillText( obj.text || "", obj.x!, obj.y! );
            break;
        case "path":
        case "smoothPath":
            drawPath( obj );
            break;
        case "shape":
            drawShape( obj );
            break;
    }
    currentCtx.restore();
}

function drawPath( obj: WhiteboardObject ): void {
    if ( !currentCtx || obj.points!.length < 2 ) return;
    drawPathSegments( obj.points! );
    currentCtx.stroke();
}

function drawShape( obj: WhiteboardObject ): void {
    if ( !currentCtx ) return;
    currentCtx.strokeStyle = obj.color!;
    currentCtx.lineWidth = obj.size!;
    currentCtx.beginPath();
    drawShapePath( obj.x!, obj.y!, obj.width!, obj.height!, obj.shape! );
    currentCtx.stroke();
}

function drawSelectionBox( obj: WhiteboardObject ): void {
    if ( !currentCtx ) return;
    const handles = getHandles( obj );
    if ( handles.length < 4 ) return;
    
    // Get corner handles (nw, ne, se, sw are indices 0, 1, 2, 3)
    const nw = handles[ 0 ];
    const ne = handles[ 1 ];
    const se = handles[ 2 ];
    const sw = handles[ 3 ];
    
    currentCtx.save();
    currentCtx.strokeStyle = SELECTION_STROKE_COLOR;
    currentCtx.fillStyle = "rgba(0,0,0,0)";
    currentCtx.lineWidth = SELECTION_LINE_WIDTH;
    currentCtx.setLineDash( LINE_DASH_PATTERN );
    
    // Draw rotated rectangle connecting corner handles
    currentCtx.beginPath();
    currentCtx.moveTo( nw.x, nw.y );
    currentCtx.lineTo( ne.x, ne.y );
    currentCtx.lineTo( se.x, se.y );
    currentCtx.lineTo( sw.x, sw.y );
    currentCtx.closePath();
    currentCtx.stroke();
    
    currentCtx.restore();
    
    // Draw handles
    currentCtx.fillStyle = HANDLE_FILL_COLOR;
    currentCtx.strokeStyle = HANDLE_STROKE_COLOR;
    currentCtx.lineWidth = 2;
    currentCtx.setLineDash( [] );
    for ( let i = 0; i < handles.length && i < 0o10; i++ ) {
        const h = handles[ i ];
        if ( h ) {
            currentCtx.beginPath();
            currentCtx.roundRect( h.x - HANDLE_SIZE / 2, h.y - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE, HANDLE_RADIUS );
            currentCtx.fill();
            currentCtx.stroke();
        }
    }
    
    // Draw rotate handle above top-middle handle
    const topMidHandle = handles[ 4 ]; // "n" handle
    if ( topMidHandle ) {
        const rhX = topMidHandle.x;
        const rhY = topMidHandle.y - ROTATE_HANDLE_OFFSET;
        currentCtx.beginPath();
        currentCtx.arc( rhX, rhY, ROTATE_HANDLE_RADIUS, 0, Math.PI * 2 );
        currentCtx.fillStyle = HANDLE_FILL_COLOR;
        currentCtx.fill();
        currentCtx.stroke();
        currentCtx.beginPath();
        currentCtx.arc( rhX, rhY, 0o10, 0, Math.PI * ( 3 / 2 ) );
        currentCtx.strokeStyle = HANDLE_STROKE_COLOR;
        currentCtx.lineWidth = SELECTION_LINE_WIDTH;
        currentCtx.stroke();
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
