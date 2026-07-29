// ≺⧼ Whiteboard Application - Main Entry Point ⧽≻

import {
    canvas, stato, panstato, paĝostato, spacstato, objektstato, tuŝaGeststato,
    TABULA_LARGXO, TABULA_ALTO,
    PLIGRANDIGPAŜO_NUM, PLIGRANDIGPAŜO_DEN, PLIGRANDIGBAZO,
    MIN_PLIGRANDIGO, MAX_PLIGRANDIGO
} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import {
    restarigiKursoron, agordiKursoron, akiriIlanKursoron, iniciiButonon,
    troviObjektonCePunkto, malvalidigiTekstajnKesxojn
} from "./ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

import { cxuKomunaUiElemento } from "../../}ʃɹ ɭʃᴜ j͑ʃɔ }ʃw j͑ʃᴜ ſɭᴜ ŋᷠᴜ.js";

import {
    tavolAdministranto, pagAdministranto, renderiTavolojnListon, renderiPagojnListon
} from "./ɭʃᴜ }ʃɔƽ.js";

import {
    akiriAktualanTabulon, akiriAktualanCtx, redesegniTabulon, konserviStaton, desegniTabulanKradon,
    sxangxiAlPagaTabulo, sinkronigiPanAlCSS, grandSxangxiAktivanPagon, gxisdatigiTabulanGrandanMontron,
    akiriAktivanPagon, cxuAktivaPagoSenfina
} from "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɹʞ.js";

import {
    initColors, initToolsAndShapes, initSizeSlider, initToolbar,
    handleKeyboard, initActions, initLayerControls, initPageControls,
    initFileOperations, initPageSizeControls
} from "./ſɭ,ɔ }ʃꞇ.js";

import {
    akiriTabulajnKoordinatojn, startDrawing, draw, stopDrawing,
    initTextEditInput, editTextObject
} from "./ſɟᴜ ſɭɹʞ.js";

// ⟪ Zoom State 📐 ⟫

let setZoomFn: ( zoom: number ) => void = () => { };

// ⟪ Initialization 🚀 ⟫

function initCanvas(): void {
    if ( !akiriAktualanTabulon() ) return;
    const activePage = pagAdministranto.getActive();
    const w = activePage?.width || TABULA_LARGXO;
    const h = activePage?.height || TABULA_ALTO;
    akiriAktualanTabulon()!.width = activePage?.infinite ? window.innerWidth : w;
    akiriAktualanTabulon()!.height = activePage?.infinite ? window.innerHeight : h;

    const ctx = akiriAktualanCtx()!;
    const curCanvas = akiriAktualanTabulon()!;
    if ( activePage?.infinite ) {
        desegniTabulanKradon( ctx, curCanvas.width, curCanvas.height );
    } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect( 0, 0, curCanvas.width, curCanvas.height );
    }

    document.getElementById( "canvasSize" )!.textContent = `${curCanvas.width} × ${curCanvas.height}`;
}

function initLayers(): void {
    tavolAdministranto.layers = [];
    tavolAdministranto.counter = 0;
    tavolAdministranto.create( "ꞙɭı ɭ(ꞇ ɭʃᴜ }ʃɔƽ" );
    tavolAdministranto.syncToState();
    renderiTavolojnListon();
}

function initPages(): void {
    pagAdministranto.pages = [];
    pagAdministranto.counter = 0;
    pagAdministranto.create( "ꞙɭı ɭ(ꞇ ɭʃᴜ }ʃɔƽ" );
    pagAdministranto.syncToState();
    renderiPagojnListon();
}

function initZoom(): void {
    const zoomLevel = document.getElementById( "zoomLevel" );

    if ( !zoomLevel ) {
        console.warn( "zoomLevel element not found" );
        return;
    }

    function updateZoom(): void {
        const zoom = stato.zoomNum / stato.zoomDen;
        document.documentElement.style.setProperty( "--zoom", zoom.toString() );
        if ( zoomLevel ) zoomLevel.textContent = `${Math.round( stato.zoomNum )}/${stato.zoomDen}x`;
        malvalidigiTekstajnKesxojn();
        redesegniTabulon();
    }

    function setZoom( newZoom: number ): void {
        const activePage = akiriAktivanPagon();
        // Infinite pages cannot zoom out below 1x — the canvas always fills the screen
        const minZoom = activePage?.infinite ? 0o1 : MIN_PLIGRANDIGO;
        const maxZoom = MAX_PLIGRANDIGO;
        
        if ( newZoom <= minZoom ) {
            stato.zoomNum = minZoom * PLIGRANDIGBAZO;
            stato.zoomDen = PLIGRANDIGBAZO;
        } else if ( newZoom >= maxZoom ) {
            stato.zoomNum = maxZoom * PLIGRANDIGBAZO;
            stato.zoomDen = PLIGRANDIGBAZO;
        } else {
            stato.zoomNum = newZoom * PLIGRANDIGBAZO;
            stato.zoomDen = PLIGRANDIGBAZO;
        }
        updateZoom();
    }

    setZoomFn = setZoom;

    function adjustZoom( numeratorMult: number, denominatorMult: number ): void {
        const oldZoom = stato.zoomNum / stato.zoomDen;
        const newZoom = oldZoom * ( numeratorMult / denominatorMult );
        setZoom( newZoom );
    }

    iniciiButonon( "zoomIn", () => adjustZoom( PLIGRANDIGPAŜO_NUM, PLIGRANDIGPAŜO_DEN ) );
    iniciiButonon( "zoomOut", () => adjustZoom( PLIGRANDIGPAŜO_DEN, PLIGRANDIGPAŜO_NUM ) );
    iniciiButonon( "zoomReset", () => {
        stato.zoomNum = 1; stato.zoomDen = 1;
        panstato.offsetX = 0; panstato.offsetY = 0;
        sinkronigiPanAlCSS();
        updateZoom();
    } );

    document.addEventListener( "wheel", ( e: WheelEvent ) => {
        if ( cxuKomunaUiElemento( e.target ) ) return;
        
        const activePage = akiriAktivanPagon();
        
        // Ctrl+wheel zoom works on ALL pages (both infinite and non-infinite)
        if ( e.ctrlKey ) {
            e.preventDefault();
            const currentZoom = stato.zoomNum / stato.zoomDen;
            const zoomFactor = Math.exp( -e.deltaY * 0o2 / 0o1000 );
            const newZoom = currentZoom * zoomFactor;
            setZoom( newZoom );
            return;
        }
        
        // Pan with the wheel
        e.preventDefault();
        const panSpeed = 0o2;
        panstato.offsetX -= e.deltaX * panSpeed;
        panstato.offsetY -= e.deltaY * panSpeed;
        if ( activePage?.infinite ) {
            updateZoom();  // redraws with canvas context translate
        } else {
            sinkronigiPanAlCSS();  // shift via CSS translate
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
    if ( e.button !== 0 || cxuKomunaUiElemento( e.target ) ) return;
    
    // Space+drag panning works on all pages
    const activePage = akiriAktivanPagon();
    if ( spacstato.isPressed ) {
        panstato.isPanning = true;
        panstato.startX = e.clientX - panstato.offsetX;
        panstato.startY = e.clientY - panstato.offsetY;
        if ( canvas ) canvas.dataset.cursor = "grabbing";
        return;
    }
    
    startDrawing( e );
}

function handleDocumentMouseMove( e: MouseEvent ): void {
    if ( panstato.isPanning ) {
        e.preventDefault();
        panstato.offsetX = e.clientX - panstato.startX;
        panstato.offsetY = e.clientY - panstato.startY;
        const activePage = akiriAktivanPagon();
        if ( activePage?.infinite ) {
            redesegniTabulon();  // redraw with canvas context translate
        } else {
            sinkronigiPanAlCSS();  // shift via CSS translate
        }
        return;
    }
    if ( stato.isDrawing ) draw( e );
}

// ⟪ Cursor Reset Helpers 🖰 ⟫

/**
 * Restore the canvas cursor after a pan ends.
 * Draws grab while space is held, otherwise restores the tool cursor
 * and clears the dataset override.
 */
function resetPanCursor(): void {
    if ( spacstato.isPressed ) {
        if ( canvas ) canvas.dataset.cursor = "grab";
    } else {
        if ( canvas ) delete canvas.dataset.cursor;
        agordiKursoron( akiriIlanKursoron() );
    }
}

function handleDocumentMouseUp( e: MouseEvent ): void {
    if ( panstato.isPanning ) {
        panstato.isPanning = false;
        resetPanCursor();
        return;
    }
    if ( stato.isDrawing ) stopDrawing( e );
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
    if ( e.touches.length > 2 || cxuKomunaUiElemento( e.target ) ) return;

    const activePage = akiriAktivanPagon();
    const isInfinite = activePage?.infinite === true;

    if ( e.touches.length === 2 ) {
        if ( !isInfinite ) return;  // Let browser handle 2-finger scroll natively
        e.preventDefault();
        // Start pinch-to-zoom
        tuŝaGeststato.isPinching = true;
        tuŝaGeststato.initialDistance = getTouchDistance( e );
        tuŝaGeststato.initialZoom = stato.zoomNum / stato.zoomDen;

        // Also start panning from center
        panstato.isPanning = true;
        const center = getTouchCenter( e );
        panstato.startX = center.x - panstato.offsetX;
        panstato.startY = center.y - panstato.offsetY;
        if ( canvas ) canvas.dataset.cursor = "grabbing";
        return;
    }

    if ( spacstato.isPressed ) {
        if ( !isInfinite ) return;  // Let browser handle space+scroll natively
        e.preventDefault();
        panstato.isPanning = true;
        panstato.startX = e.touches[ 0 ].clientX - panstato.offsetX;
        panstato.startY = e.touches[ 0 ].clientY - panstato.offsetY;
        if ( canvas ) canvas.dataset.cursor = "grabbing";
        return;
    }

    handleDocumentMouseDown( new MouseEvent( "mousedown", {
        clientX: e.touches[ 0 ].clientX, clientY: e.touches[ 0 ].clientY, button: 0
    } ) );
}

function handleTouchMove( e: TouchEvent ): void {
    if ( e.touches.length > 2 ) return;

    const activePage = akiriAktivanPagon();
    const isInfinite = activePage?.infinite === true;

    if ( e.touches.length === 2 && tuŝaGeststato.isPinching && isInfinite ) {
        e.preventDefault();

        // Handle pinch-to-zoom
        const currentDistance = getTouchDistance( e );
        if ( currentDistance > 0 && tuŝaGeststato.initialDistance > 0 ) {
            const zoomFactor = currentDistance / tuŝaGeststato.initialDistance;
            const newZoom = tuŝaGeststato.initialZoom * zoomFactor;
            setZoomFn( newZoom );
        }

        // Handle panning with two fingers
        const center = getTouchCenter( e );
        panstato.offsetX = center.x - panstato.startX;
        panstato.offsetY = center.y - panstato.startY;
        redesegniTabulon();
        return;
    }

    if ( panstato.isPanning && isInfinite ) {
        e.preventDefault();
        const center = getTouchCenter( e );
        panstato.offsetX = center.x - panstato.startX;
        panstato.offsetY = center.y - panstato.startY;
        redesegniTabulon();
        return;
    }

    if ( stato.isDrawing ) {
        draw( new MouseEvent( "mousemove", {
            clientX: e.touches[ 0 ].clientX, clientY: e.touches[ 0 ].clientY
        } ) );
    }
}

function handleTouchEnd( e: TouchEvent ): void {
    if ( tuŝaGeststato.isPinching ) {
        tuŝaGeststato.isPinching = false;
        tuŝaGeststato.initialDistance = 0;
        tuŝaGeststato.initialZoom = 0;
    }

    if ( panstato.isPanning ) {
        panstato.isPanning = false;
        resetPanCursor();
        return;
    }

    if ( e.changedTouches.length === 1 && stato.isDrawing ) {
        const touch = e.changedTouches[ 0 ];
        stopDrawing( new MouseEvent( "mouseup", {
            clientX: touch.clientX, clientY: touch.clientY
        } ) );
    }
}

function handleTouchCancel( e: TouchEvent ): void {
    if ( tuŝaGeststato.isPinching ) {
        tuŝaGeststato.isPinching = false;
        tuŝaGeststato.initialDistance = 0;
        tuŝaGeststato.initialZoom = 0;
    }

    if ( panstato.isPanning ) {
        panstato.isPanning = false;
        resetPanCursor();
        return;
    }
    handleTouchEnd( e );
}

function handleDoubleClick( e: MouseEvent ): void {
    if ( cxuKomunaUiElemento( e.target ) ) return;
    const coords = akiriTabulajnKoordinatojn( e );
    const clickedObject = troviObjektonCePunkto( coords.x, coords.y );
    if ( clickedObject && clickedObject.type === "text" ) {
        editTextObject( clickedObject );
    }
}

function handleKeyup( e: KeyboardEvent ): void {
    if ( e.code === "Space" ) {
        spacstato.isPressed = false;
        if ( !panstato.isPanning && !stato.isDrawing ) {
            if ( canvas ) delete canvas.dataset.cursor;
            agordiKursoron( akiriIlanKursoron() );
        }
    }
}

function handleBlur(): void {
    spacstato.isPressed = false;
    panstato.isPanning = false;
    if ( canvas ) delete canvas.dataset.cursor;
    restarigiKursoron();
}

// ⟪ Window Resize (unified single handler) 🪟 ⟫

function initWindowResize(): void {
    window.addEventListener( "resize", () => {
        const activePage = akiriAktivanPagon();
        document.documentElement.style.setProperty( "--zoom", ( stato.zoomNum / stato.zoomDen ).toString() );
        if ( activePage?.infinite ) {
            grandSxangxiAktivanPagon( window.innerWidth, window.innerHeight );
        } else {
            redesegniTabulon();
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
konserviStaton();
