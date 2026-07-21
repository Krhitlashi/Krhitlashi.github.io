// ≺⧼ Whiteboard Application - Main Entry Point ⧽≻

import {
    canvas, state, panState, pageState, spaceState, objectState, touchGestureState,
    CANVAS_WIDTH, CANVAS_HEIGHT,
    ZOOM_STEP_NUM, ZOOM_STEP_DEN, ZOOM_BASE,
    MIN_ZOOM, MAX_ZOOM
} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import {
    resetCursor, setCursor, getToolCursor, initButton,
    findObjectAtPoint, invalidateTextCaches
} from "./ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

import { isSharedUiElement } from "../../}ʃɹ ɭʃᴜ j͑ʃɔ }ʃw j͑ʃᴜ ſɭᴜ ŋᷠᴜ.js";

import {
    layerManager, pageManager, renderLayerList, renderPageList
} from "./ɭʃᴜ }ʃɔƽ.js";

import {
    getCurrentCanvas, getCurrentCtx, redrawCanvas, saveState, drawWhiteboardGrid,
    switchToPageCanvas, syncPanToCSS, resizeActivePage, updateCanvasSizeDisplay,
    getActivePage, isActivePageInfinite
} from "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɹʞ.js";

import {
    initColors, initToolsAndShapes, initSizeSlider, initToolbar,
    handleKeyboard, initActions, initLayerControls, initPageControls,
    initFileOperations, initPageSizeControls
} from "./ſɭ,ɔ }ʃꞇ.js";

import {
    getCanvasCoords, startDrawing, draw, stopDrawing,
    initTextEditInput, editTextObject
} from "./ſɟᴜ ſɭɹʞ.js";

// ⟪ Zoom State 📐 ⟫

let setZoomFn: ( zoom: number ) => void = () => { };

// ⟪ Initialization 🚀 ⟫

function initCanvas(): void {
    if ( !getCurrentCanvas() ) return;
    const activePage = pageManager.getActive();
    const w = activePage?.width || CANVAS_WIDTH;
    const h = activePage?.height || CANVAS_HEIGHT;
    getCurrentCanvas()!.width = activePage?.infinite ? window.innerWidth : w;
    getCurrentCanvas()!.height = activePage?.infinite ? window.innerHeight : h;

    const ctx = getCurrentCtx()!;
    const curCanvas = getCurrentCanvas()!;
    if ( activePage?.infinite ) {
        drawWhiteboardGrid( ctx, curCanvas.width, curCanvas.height );
    } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect( 0, 0, curCanvas.width, curCanvas.height );
    }

    document.getElementById( "canvasSize" )!.textContent = `${curCanvas.width} × ${curCanvas.height}`;
}

function initLayers(): void {
    layerManager.layers = [];
    layerManager.counter = 0;
    layerManager.create( "ꞙɭı ɭ(ꞇ ɭʃᴜ }ʃɔƽ" );
    layerManager.syncToState();
    renderLayerList();
}

function initPages(): void {
    pageManager.pages = [];
    pageManager.counter = 0;
    pageManager.create( "ꞙɭı ɭ(ꞇ ɭʃᴜ }ʃɔƽ" );
    pageManager.syncToState();
    renderPageList();
}

function initZoom(): void {
    const zoomLevel = document.getElementById( "zoomLevel" );

    if ( !zoomLevel ) {
        console.warn( "zoomLevel element not found" );
        return;
    }

    function updateZoom(): void {
        const zoom = state.zoomNum / state.zoomDen;
        document.documentElement.style.setProperty( "--zoom", zoom.toString() );
        if ( zoomLevel ) zoomLevel.textContent = `${Math.round( state.zoomNum )}/${state.zoomDen}x`;
        invalidateTextCaches();
        redrawCanvas();
    }

    function setZoom( newZoom: number ): void {
        const activePage = getActivePage();
        // Infinite pages cannot zoom out below 1x — the canvas always fills the screen
        const minZoom = activePage?.infinite ? 0o1 : MIN_ZOOM;
        const maxZoom = MAX_ZOOM;
        
        if ( newZoom <= minZoom ) {
            state.zoomNum = minZoom * ZOOM_BASE;
            state.zoomDen = ZOOM_BASE;
        } else if ( newZoom >= maxZoom ) {
            state.zoomNum = maxZoom * ZOOM_BASE;
            state.zoomDen = ZOOM_BASE;
        } else {
            state.zoomNum = newZoom * ZOOM_BASE;
            state.zoomDen = ZOOM_BASE;
        }
        updateZoom();
    }

    setZoomFn = setZoom;

    function adjustZoom( numeratorMult: number, denominatorMult: number ): void {
        const oldZoom = state.zoomNum / state.zoomDen;
        const newZoom = oldZoom * ( numeratorMult / denominatorMult );
        setZoom( newZoom );
    }

    initButton( "zoomIn", () => adjustZoom( ZOOM_STEP_NUM, ZOOM_STEP_DEN ) );
    initButton( "zoomOut", () => adjustZoom( ZOOM_STEP_DEN, ZOOM_STEP_NUM ) );
    initButton( "zoomReset", () => {
        state.zoomNum = 1; state.zoomDen = 1;
        panState.offsetX = 0; panState.offsetY = 0;
        syncPanToCSS();
        updateZoom();
    } );

    document.addEventListener( "wheel", ( e: WheelEvent ) => {
        if ( isSharedUiElement( e.target ) ) return;
        
        const activePage = getActivePage();
        
        // Ctrl+wheel zoom works on ALL pages (both infinite and non-infinite)
        if ( e.ctrlKey ) {
            e.preventDefault();
            const currentZoom = state.zoomNum / state.zoomDen;
            const zoomFactor = Math.exp( -e.deltaY * 0o2 / 0o1000 );
            const newZoom = currentZoom * zoomFactor;
            setZoom( newZoom );
            return;
        }
        
        // Pan with the wheel
        e.preventDefault();
        const panSpeed = 0o2;
        panState.offsetX -= e.deltaX * panSpeed;
        panState.offsetY -= e.deltaY * panSpeed;
        if ( activePage?.infinite ) {
            updateZoom();  // redraws with canvas context translate
        } else {
            syncPanToCSS();  // shift via CSS translate
        }
    }, { passive: false } );

    updateZoom();
}

function initCanvasEvents(): void {
    if ( !canvas ) return;

    canvas.addEventListener( "dblclick", handleDoubleClick );

    document.addEventListener( "touchstart", handleTouchStart, { passive: false } );
    document.addEventListener( "touchmove", handleTouchMove, { passive: false } );
    document.addEventListener( "touchend", handleTouchEnd, { passive: false } );
    document.addEventListener( "touchcancel", handleTouchCancel, { passive: false } );

    document.addEventListener( "mousedown", handleDocumentMouseDown, { passive: false } );
    document.addEventListener( "mousemove", handleDocumentMouseMove, { passive: false } );
    document.addEventListener( "mouseup", handleDocumentMouseUp, { passive: false } );

    document.addEventListener( "keydown", handleKeyboard, { passive: false } );
    document.addEventListener( "keyup", handleKeyup, { passive: false } );
    window.addEventListener( "blur", handleBlur );

}

function handleDocumentMouseDown( e: MouseEvent ): void {
    if ( e.button !== 0 || isSharedUiElement( e.target ) ) return;
    
    // Space+drag panning works on all pages
    const activePage = getActivePage();
    if ( spaceState.isPressed ) {
        panState.isPanning = true;
        panState.startX = e.clientX - panState.offsetX;
        panState.startY = e.clientY - panState.offsetY;
        if ( canvas ) canvas.dataset.cursor = "grabbing";
        return;
    }
    
    startDrawing( e );
}

function handleDocumentMouseMove( e: MouseEvent ): void {
    if ( panState.isPanning ) {
        e.preventDefault();
        panState.offsetX = e.clientX - panState.startX;
        panState.offsetY = e.clientY - panState.startY;
        const activePage = getActivePage();
        if ( activePage?.infinite ) {
            redrawCanvas();  // redraw with canvas context translate
        } else {
            syncPanToCSS();  // shift via CSS translate
        }
        return;
    }
    if ( state.isDrawing ) draw( e );
}

// ⟪ Cursor Reset Helpers 🖰 ⟫

/**
 * Restore the canvas cursor after a pan ends.
 * Draws grab while space is held, otherwise restores the tool cursor
 * and clears the dataset override.
 */
function resetPanCursor(): void {
    if ( spaceState.isPressed ) {
        if ( canvas ) canvas.dataset.cursor = "grab";
    } else {
        if ( canvas ) delete canvas.dataset.cursor;
        setCursor( getToolCursor() );
    }
}

function handleDocumentMouseUp( e: MouseEvent ): void {
    if ( panState.isPanning ) {
        panState.isPanning = false;
        resetPanCursor();
        return;
    }
    if ( state.isDrawing ) stopDrawing( e );
}

function getTouchCenter( e: TouchEvent ): { x: number; y: number } {
    if ( e.touches.length === 2 ) {
        return {
            x: ( e.touches[ 0 ].clientX + e.touches[ 1 ].clientX ) / 2,
            y: ( e.touches[ 0 ].clientY + e.touches[ 1 ].clientY ) / 2
        };
    }
    return { x: e.touches[ 0 ].clientX, y: e.touches[ 0 ].clientY };
}

function getTouchDistance( e: TouchEvent ): number {
    if ( e.touches.length !== 2 ) return 0;
    const dx = e.touches[ 0 ].clientX - e.touches[ 1 ].clientX;
    const dy = e.touches[ 0 ].clientY - e.touches[ 1 ].clientY;
    return Math.sqrt( dx * dx + dy * dy );
}

function handleTouchStart( e: TouchEvent ): void {
    if ( e.touches.length > 2 || isSharedUiElement( e.target ) ) return;

    const activePage = getActivePage();
    const isInfinite = activePage?.infinite === true;

    if ( e.touches.length === 2 ) {
        if ( !isInfinite ) return;  // Let browser handle 2-finger scroll natively
        e.preventDefault();
        // Start pinch-to-zoom
        touchGestureState.isPinching = true;
        touchGestureState.initialDistance = getTouchDistance( e );
        touchGestureState.initialZoom = state.zoomNum / state.zoomDen;

        // Also start panning from center
        panState.isPanning = true;
        const center = getTouchCenter( e );
        panState.startX = center.x - panState.offsetX;
        panState.startY = center.y - panState.offsetY;
        if ( canvas ) canvas.dataset.cursor = "grabbing";
        return;
    }

    if ( spaceState.isPressed ) {
        if ( !isInfinite ) return;  // Let browser handle space+scroll natively
        e.preventDefault();
        panState.isPanning = true;
        panState.startX = e.touches[ 0 ].clientX - panState.offsetX;
        panState.startY = e.touches[ 0 ].clientY - panState.offsetY;
        if ( canvas ) canvas.dataset.cursor = "grabbing";
        return;
    }

    handleDocumentMouseDown( new MouseEvent( "mousedown", {
        clientX: e.touches[ 0 ].clientX, clientY: e.touches[ 0 ].clientY, button: 0
    } ) );
}

function handleTouchMove( e: TouchEvent ): void {
    if ( e.touches.length > 2 ) return;

    const activePage = getActivePage();
    const isInfinite = activePage?.infinite === true;

    if ( e.touches.length === 2 && touchGestureState.isPinching && isInfinite ) {
        e.preventDefault();

        // Handle pinch-to-zoom
        const currentDistance = getTouchDistance( e );
        if ( currentDistance > 0 && touchGestureState.initialDistance > 0 ) {
            const zoomFactor = currentDistance / touchGestureState.initialDistance;
            const newZoom = touchGestureState.initialZoom * zoomFactor;
            setZoomFn( newZoom );
        }

        // Handle panning with two fingers
        const center = getTouchCenter( e );
        panState.offsetX = center.x - panState.startX;
        panState.offsetY = center.y - panState.startY;
        redrawCanvas();
        return;
    }

    if ( panState.isPanning && isInfinite ) {
        e.preventDefault();
        const center = getTouchCenter( e );
        panState.offsetX = center.x - panState.startX;
        panState.offsetY = center.y - panState.startY;
        redrawCanvas();
        return;
    }

    if ( state.isDrawing ) {
        draw( new MouseEvent( "mousemove", {
            clientX: e.touches[ 0 ].clientX, clientY: e.touches[ 0 ].clientY
        } ) );
    }
}

function handleTouchEnd( e: TouchEvent ): void {
    if ( touchGestureState.isPinching ) {
        touchGestureState.isPinching = false;
        touchGestureState.initialDistance = 0;
        touchGestureState.initialZoom = 0;
    }

    if ( panState.isPanning ) {
        panState.isPanning = false;
        resetPanCursor();
        return;
    }

    if ( e.changedTouches.length === 1 && state.isDrawing ) {
        const touch = e.changedTouches[ 0 ];
        stopDrawing( new MouseEvent( "mouseup", {
            clientX: touch.clientX, clientY: touch.clientY
        } ) );
    }
}

function handleTouchCancel( e: TouchEvent ): void {
    if ( touchGestureState.isPinching ) {
        touchGestureState.isPinching = false;
        touchGestureState.initialDistance = 0;
        touchGestureState.initialZoom = 0;
    }

    if ( panState.isPanning ) {
        panState.isPanning = false;
        resetPanCursor();
        return;
    }
    handleTouchEnd( e );
}

function handleDoubleClick( e: MouseEvent ): void {
    if ( isSharedUiElement( e.target ) ) return;
    const coords = getCanvasCoords( e );
    const clickedObject = findObjectAtPoint( coords.x, coords.y );
    if ( clickedObject && clickedObject.type === "text" ) {
        editTextObject( clickedObject );
    }
}

function handleKeyup( e: KeyboardEvent ): void {
    if ( e.code === "Space" ) {
        spaceState.isPressed = false;
        if ( !panState.isPanning && !state.isDrawing ) {
            if ( canvas ) delete canvas.dataset.cursor;
            setCursor( getToolCursor() );
        }
    }
}

function handleBlur(): void {
    spaceState.isPressed = false;
    panState.isPanning = false;
    if ( canvas ) delete canvas.dataset.cursor;
    resetCursor();
}

// ⟪ Window Resize (unified single handler) 🪟 ⟫

function initWindowResize(): void {
    window.addEventListener( "resize", () => {
        const activePage = getActivePage();
        document.documentElement.style.setProperty( "--zoom", ( state.zoomNum / state.zoomDen ).toString() );
        if ( activePage?.infinite ) {
            resizeActivePage( window.innerWidth, window.innerHeight );
        } else {
            redrawCanvas();
        }
    } );
}

// ⟪ Initialize Application 🚀 ⟫

initCanvas();
initLayers();
initPages();
initTextEditInput();
initColors();
initToolsAndShapes();
initSizeSlider();
initToolbar();
initCanvasEvents();
initWindowResize();
initActions();
initLayerControls();
initPageControls();
initPageSizeControls();
initZoom();
initFileOperations();
saveState();
