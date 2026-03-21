// ≺⧼ Whiteboard Application - Main Entry Point ⧽≻

import {
    canvas, state, panState, spaceState, objectState,
    CANVAS_WIDTH, CANVAS_HEIGHT,
    ZOOM_STEP_NUM, ZOOM_STEP_DEN, WHEEL_ZOOM_NUM, WHEEL_ZOOM_DEN,
    MIN_ZOOM, MAX_ZOOM, ZOOM_BASE
} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import {
    resetCursor, setCursor, getToolCursor, initButton,
    findObjectAtPoint
} from "./ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

import {
    invalidateTextCachesForObjects
} from "./ſןᴜ ʃɜƽ.js";

import {
    layerManager, pageManager, renderLayerList, renderPageList
} from "./ɭʃᴜ }ʃɔƽ.js";

import {
    getCurrentCanvas, getCurrentCtx, redrawCanvas, saveState,
    switchToPageCanvas
} from "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɹʞ.js";

import {
    initColors, initToolsAndShapes, initSizeSlider, initToolbar,
    handleKeyboard, initActions, initLayerControls, initPageControls,
    initFileOperations
} from "./ſɭ,ɔ }ʃꞇ.js";

import {
    getCanvasCoords, startDrawing, draw, stopDrawing,
    initTextEditInput, editTextObject
} from "./ſɟᴜ ſɭɹʞ.js";

// Local wrapper for backwards compatibility
function invalidateTextCaches(): void {
    invalidateTextCachesForObjects( objectState.objects );
}

// ⟪ Initialization 🚀 ⟫

function initCanvas(): void {
    if ( !getCurrentCanvas() ) return;
    getCurrentCanvas()!.width = CANVAS_WIDTH;
    getCurrentCanvas()!.height = CANVAS_HEIGHT;

    getCurrentCtx()!.fillStyle = "#ffffff";
    getCurrentCtx()!.fillRect( 0, 0, getCurrentCanvas()!.width, getCurrentCanvas()!.height );

    document.getElementById( "canvasSize" )!.textContent = `${getCurrentCanvas()!.width} × ${getCurrentCanvas()!.height}`;
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
        document.documentElement.style.setProperty( "--pan-x", panState.offsetX + "px" );
        document.documentElement.style.setProperty( "--pan-y", panState.offsetY + "px" );
        if ( zoomLevel ) zoomLevel.textContent = `${state.zoomNum}/${state.zoomDen}x`;
        invalidateTextCaches();
        redrawCanvas();
    }

    function setZoom( newZoom: number ): void {
        if ( newZoom < MIN_ZOOM ) {
            state.zoomNum = 1;
            state.zoomDen = 4;
        } else if ( newZoom > MAX_ZOOM ) {
            state.zoomNum = 4;
            state.zoomDen = 1;
        } else {
            const zoomNumerator = Math.round( newZoom * ZOOM_BASE );
            state.zoomNum = zoomNumerator;
            state.zoomDen = ZOOM_BASE;
        }
        constrainPan();
        updateZoom();
    }

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
        updateZoom();
    } );

    document.addEventListener( "wheel", ( e: WheelEvent ) => {
        if ( isUIElement( e.target ) ) return;
        if ( e.ctrlKey ) {
            e.preventDefault();
            const currentZoom = state.zoomNum / state.zoomDen;
            const zoomFactor = e.deltaY < 0 ? ( WHEEL_ZOOM_NUM / WHEEL_ZOOM_DEN ) : ( WHEEL_ZOOM_DEN / WHEEL_ZOOM_NUM );
            setZoom( currentZoom * zoomFactor );
        } else if ( isScrollableElement( e.target ) ) {
            return;
        } else {
            e.preventDefault();
            panState.offsetX -= e.deltaX;
            panState.offsetY -= e.deltaY;
            constrainPan();
            updateZoom();
        }
    }, { passive: false } );

    updateZoom();
}

function constrainPan(): void {
    const margin = Math.max( window.innerWidth, window.innerHeight ) * 2;
    panState.offsetX = Math.min( Math.max( panState.offsetX, -margin ), margin );
    panState.offsetY = Math.min( Math.max( panState.offsetY, -margin ), margin );
}

function initCanvasEvents(): void {
    if ( !canvas ) return;

    canvas.addEventListener( "dblclick", handleDoubleClick );
    initToolbarTouch();

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

    window.addEventListener( "resize", () => {
        constrainPan();
        document.documentElement.style.setProperty( "--zoom", ( state.zoomNum / state.zoomDen ).toString() );
        document.documentElement.style.setProperty( "--pan-x", panState.offsetX + "px" );
        document.documentElement.style.setProperty( "--pan-y", panState.offsetY + "px" );
        redrawCanvas();
    } );
}

function isUIElement( target: EventTarget | null ): boolean {
    if ( !target || !( target instanceof HTMLElement ) ) return false;
    return target.closest( ".n2tase, .toolbar-wrapper, .cakaxa" ) !== null;
}

function initToolbarTouch(): void {
    const toolbar = document.getElementById( "toolbarContainer" );
    if ( !toolbar ) return;

    let startY = 0, startScroll = 0;
    toolbar.addEventListener( "touchstart", ( e: TouchEvent ) => {
        if ( e.touches.length !== 1 ) return;
        startY = e.touches[ 0 ].clientY;
        startScroll = toolbar.scrollTop;
    }, { passive: true } );

    toolbar.addEventListener( "touchmove", ( e: TouchEvent ) => {
        if ( e.touches.length !== 1 ) return;
        toolbar.scrollTop = startScroll + ( startY - e.touches[ 0 ].clientY );
    }, { passive: true } );
}

function handleDocumentMouseDown( e: MouseEvent ): void {
    if ( e.button !== 0 || isUIElement( e.target ) ) return;
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
        constrainPan();
        document.documentElement.style.setProperty( "--pan-x", panState.offsetX + "px" );
        document.documentElement.style.setProperty( "--pan-y", panState.offsetY + "px" );
        return;
    }
    if ( state.isDrawing ) draw( e );
}

function handleDocumentMouseUp( e: MouseEvent ): void {
    if ( panState.isPanning ) {
        panState.isPanning = false;
        if ( spaceState.isPressed ) {
            if ( canvas ) canvas.dataset.cursor = "grab";
        } else {
            if ( canvas ) delete canvas.dataset.cursor;
            setCursor( getToolCursor() );
        }
        return;
    }
    if ( state.isDrawing ) stopDrawing( e );
}

function isScrollableElement( el: EventTarget | null ): boolean {
    if ( !el || !( el instanceof HTMLElement ) ) return false;
    const style = window.getComputedStyle( el );
    return style.overflowY === "auto" || style.overflowY === "scroll" ||
        style.overflowX === "auto" || style.overflowX === "scroll";
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

function startPanFromPoint( x: number, y: number ): void {
    panState.isPanning = true;
    panState.startX = x - panState.offsetX;
    panState.startY = y - panState.offsetY;
    if ( canvas ) canvas.dataset.cursor = "grabbing";
}

function updatePan( clientX: number, clientY: number ): void {
    panState.offsetX = clientX - panState.startX;
    panState.offsetY = clientY - panState.startY;
    constrainPan();
    document.documentElement.style.setProperty( "--pan-x", panState.offsetX + "px" );
    document.documentElement.style.setProperty( "--pan-y", panState.offsetY + "px" );
}

function endPan(): void {
    panState.isPanning = false;
    if ( spaceState.isPressed ) {
        if ( canvas ) canvas.dataset.cursor = "grab";
    } else {
        if ( canvas ) delete canvas.dataset.cursor;
        setCursor( getToolCursor() );
    }
}

function handleTouchStart( e: TouchEvent ): void {
    if ( e.touches.length > 2 || isUIElement( e.target ) ) return;

    if ( e.touches.length === 2 ) {
        e.preventDefault();
        const center = getTouchCenter( e );
        startPanFromPoint( center.x, center.y );
        return;
    }

    if ( spaceState.isPressed ) {
        e.preventDefault();
        startPanFromPoint( e.touches[ 0 ].clientX, e.touches[ 0 ].clientY );
        return;
    }

    handleDocumentMouseDown( new MouseEvent( "mousedown", {
        clientX: e.touches[ 0 ].clientX, clientY: e.touches[ 0 ].clientY, button: 0
    } ) );
}

function handleTouchMove( e: TouchEvent ): void {
    if ( e.touches.length > 2 ) return;

    if ( panState.isPanning ) {
        e.preventDefault();
        const center = getTouchCenter( e );
        updatePan( center.x, center.y );
        return;
    }

    if ( state.isDrawing ) {
        draw( new MouseEvent( "mousemove", {
            clientX: e.touches[ 0 ].clientX, clientY: e.touches[ 0 ].clientY
        } ) );
    }
}

function handleTouchEnd( e: TouchEvent ): void {
    if ( panState.isPanning ) {
        endPan();
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
    if ( panState.isPanning ) {
        endPan();
        return;
    }
    handleTouchEnd( e );
}

function handleDoubleClick( e: MouseEvent ): void {
    if ( isUIElement( e.target ) ) return;
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
initActions();
initLayerControls();
initPageControls();
initZoom();
initFileOperations();
saveState();
