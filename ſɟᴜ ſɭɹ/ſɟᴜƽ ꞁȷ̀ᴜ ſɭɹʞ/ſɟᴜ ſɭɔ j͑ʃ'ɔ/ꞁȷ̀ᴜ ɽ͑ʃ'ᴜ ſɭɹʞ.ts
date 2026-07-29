// ≺⧼ Canvas Rendering & Management ⧽≻

import {
    canvas, ctx, stato, tavolstato, objektstato, paĝostato, panstato, historioStato,
    TABULA_LARGXO, TABULA_ALTO, PAGXGRANDO_PRETOJ,
    TENILA_GRANDO, TENILA_RADIUSO,
    ROTACIA_TENILA_FORGXO, ROTACIA_TENILA_RADIUSO, HISTORIA_MAKS,
    LINIA_PUNKTO_PATRONO, SELEKTA_LINIO_LARGXO, TENILA_PLENIGA_KOLORO, TENILA_TRABATA_KOLORO, SELEKTA_TRABATA_KOLORO,
    TabulObjekto, Paĝo, aktivigiTabulon
} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import { pagAdministranto } from "./ɭʃᴜ }ʃɔƽ.js";

import {
    desegniFormanVojon, desegniVojojnSegmentojn,
    akiriCentronX, akiriCentronY, akiriTenilojn,
    akiriKonektajnFinpunktojn
} from "./ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

import {
    drawCachedText, renderiHTMLTekstonAlCanvas
} from "./ſןᴜ ʃɜƽ.js";

// ⟪ Canvas Elements 🎨 ⟫

// Active canvas is managed by aktivigiTabulon() in the constants module.
// These lightweight wrappers provide backward compatibility.
export function akiriAktualanTabulon(): HTMLCanvasElement | null { return canvas; }
export function akiriAktualanCtx(): CanvasRenderingContext2D | null { return ctx; }

/**
 * Return the currently active page, or undefined if none exists.
 * Wraps pagAdministranto.getActive() so callers do not need to import PageManager directly.
 */
export function akiriAktivanPagon(): Paĝo | undefined {
    return pagAdministranto.getActive();
}

/**
 * Return whether the currently active page is in infinite (full-whiteboard) mode.
 */
export function cxuAktivaPagoSenfina(): boolean {
    return akiriAktivanPagon()?.infinite === true;
}

export function akiriPaganLargxon( page: Paĝo | undefined ): number {
    if ( page?.infinite ) return window.innerWidth;
    return page?.width || TABULA_LARGXO;
}

export function akiriPaganAlton( page: Paĝo | undefined ): number {
    if ( page?.infinite ) return window.innerHeight;
    return page?.height || TABULA_ALTO;
}

export function cxuPagoSenfina( page: Paĝo | undefined ): boolean {
    return page?.infinite === true;
}

export function agordiTabulanGrandonPorPago( pageCanvas: HTMLCanvasElement, page: Paĝo | undefined ): void {
    pageCanvas.width = akiriPaganLargxon( page );
    pageCanvas.height = akiriPaganAlton( page );
}

export function gxisdatigiTabulanGrandanMontron(): void {
    const sizeDisplay = document.getElementById( "canvasSize" );
    if ( sizeDisplay && canvas ) {
        sizeDisplay.textContent = `${canvas.width} × ${canvas.height}`;
    }
    const widthInput = document.getElementById( "customPageWidth" ) as HTMLInputElement | null;
    const heightInput = document.getElementById( "customPageHeight" ) as HTMLInputElement | null;
    if ( canvas && widthInput ) widthInput.value = canvas.width.toString();
    if ( canvas && heightInput ) heightInput.value = canvas.height.toString();
    if ( canvas ) {
        const activePage = akiriAktivanPagon();
        let activePreset = "custom";
        if ( activePage?.infinite ) {
            activePreset = "full";
        } else {
            const matchingPreset = Object.entries( PAGXGRANDO_PRETOJ ).find(
                ( [ , size ] ) => size.width === canvas!.width && size.height === canvas!.height
            );
            activePreset = matchingPreset?.[ 0 ] || "custom";
        }
        gxisdatigiPretajnButonojn( activePreset );
    }
}

export function gxisdatigiPretajnButonojn( activePreset: string ): void {
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
function updateCanvasBorder( pageCanvas: HTMLCanvasElement, page: Paĝo ): void {
    pageCanvas.classList.toggle( "bordered-canvas", !page.infinite );
    pageCanvas.classList.toggle( "infinite-canvas", page.infinite );
}

/**
 * Toggle infinite-container mode on the whiteboard container.
 * Infinite pages fill the entire viewport behind the toolbar;
 * non-infinite pages stay in the normal flex layout and are scrollable.
 */
function updateContainerMode( page: Paĝo ): void {
    const container = document.getElementById( "whiteboardContainer" );
    if ( container ) {
        container.classList.toggle( "infinite-container", page.infinite );
    }
    // Reset pan offset when switching from infinite to non-infinite
    if ( !page.infinite ) {
        panstato.offsetX = 0;
        panstato.offsetY = 0;
        sinkronigiPanAlCSS();
    }
}

export function sxangxiAlPagaTabulo( page: Paĝo ): void {
    const pageCanvas = page.id === 1
        ? document.getElementById( "whiteboardCanvas" ) as HTMLCanvasElement
        : document.getElementById( `pageCanvas-${page.id}` ) as HTMLCanvasElement;
    if ( !pageCanvas ) return;
    sinkronigiPagajnObjektojn();
    aktivigiTabulon( pageCanvas );
    agordiTabulanGrandonPorPago( pageCanvas, page );
    updateCanvasBorder( pageCanvas, page );
    updateContainerMode( page );
    objektstato.objects = page.objects;
    objektstato.selected = [];
    redesegniTabulon();
    gxisdatigiTabulanGrandanMontron();
}

export function sinkronigiPagajnObjektojn(): void {
    const activePage = akiriAktivanPagon();
    if ( activePage ) activePage.objects = [ ...objektstato.objects ];
}

// ⟪ Whiteboard Grid Background 📐 ⟫

/**
 * Draws a whiteboard-style dot grid background.
 * Small dots at regular intervals with slightly larger dots every 5th row/col.
 * Offset by pan position so the grid appears fixed in world space.
 */
export function desegniTabulanKradon( ctx: CanvasRenderingContext2D, width: number, height: number ): void {
    const gridSpacing = 0o30;   // 24px — base-8 friendly
    const dotRadius = 0o1;
    const majorDotRadius = 1 + 0o7 / 0o10;  // 1.875px — base-8 fraction (7/8)
    const dotColor = "#d0d0d0";
    const majorDotColor = "#c0c0c0";

    // Offset grid dots by pan position so they stay fixed in world space
    const offsetX = ( ( panstato.offsetX % gridSpacing ) + gridSpacing ) % gridSpacing;
    const offsetY = ( ( panstato.offsetY % gridSpacing ) + gridSpacing ) % gridSpacing;

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
 * Clamp pan offset for non-infinite pages so the canvas always stays
 * at least partially visible within the viewport.
 * When the canvas fits entirely, it stays fully visible.
 * When zoomed in past the viewport, limits the scroll extent.
 */
function clampPanForPage( panX: number, panY: number ): { x: number; y: number } {
    const activePage = akiriAktivanPagon();
    if ( !activePage || activePage.infinite || !canvas ) return { x: panX, y: panY };

    const zoom = stato.zoomNum / stato.zoomDen;
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
    const naturalLeft = rect.left - panstato.offsetX;
    const naturalTop = rect.top - panstato.offsetY;

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
export function sinkronigiPanAlCSS(): void {
    const clamped = clampPanForPage( panstato.offsetX, panstato.offsetY );
    panstato.offsetX = clamped.x;
    panstato.offsetY = clamped.y;
    document.documentElement.style.setProperty( "--pan-x", `${panstato.offsetX}px` );
    document.documentElement.style.setProperty( "--pan-y", `${panstato.offsetY}px` );
}

/**
 * Begin pan-aware drawing context for infinite pages.
 * Call before draw calls, and finishPan after.
 */
export function komenciPanTradukon(): void {
    const activePage = akiriAktivanPagon();
    if ( activePage?.infinite && ctx && ( panstato.offsetX !== 0 || panstato.offsetY !== 0 ) ) {
        ctx.save();
        ctx.translate( panstato.offsetX, panstato.offsetY );
    }
}

/**
 * End pan-aware drawing context.
 */
export function finiPanTradukon(): void {
    const activePage = akiriAktivanPagon();
    if ( activePage?.infinite && ctx && ( panstato.offsetX !== 0 || panstato.offsetY !== 0 ) ) {
        ctx.restore();
    }
}

// ⟪ Canvas Rendering 🖼️ ⟫

export function redesegniTabulon(): void {
    if ( !ctx || !canvas ) return;
    
    const activePage = akiriAktivanPagon();
    if ( activePage?.infinite ) {
        desegniTabulanKradon( ctx, canvas.width, canvas.height );
    } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect( 0, 0, canvas.width, canvas.height );
    }
    
    komenciPanTradukon();
    
    objektstato.objects
        .filter( obj => {
            const layer = tavolstato.layers.find( l => l.id === obj.layerId );
            return layer && layer.visible;
        } )
        .forEach( obj => drawObject( obj ) );
    objektstato.selected.forEach( obj => drawSelectionBox( obj ) );
    
    finiPanTradukon();
}

export function grandSxangxiAktivanPagon( width: number, height: number ): void {
    const activePage = akiriAktivanPagon();
    if ( !activePage || !canvas ) return;

    if ( activePage.infinite ) {
        // For infinite pages, just resize canvas to viewport
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        activePage.width = width;
        activePage.height = height;
        agordiTabulanGrandonPorPago( canvas, activePage );
    }
    updateCanvasBorder( canvas, activePage );
    updateContainerMode( activePage );
    gxisdatigiTabulanGrandanMontron();
    redesegniTabulon();
}

export function aplikiObjektonTransformon( obj: TabulObjekto ): void {
    if ( !ctx ) return;
    const cx = akiriCentronX( obj ), cy = akiriCentronY( obj );
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

function drawObject( obj: TabulObjekto ): void {
    if ( !ctx ) return;
    ctx.save();
    aplikiObjektonTransformon( obj );
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
            const endpoints = akiriKonektajnFinpunktojn( obj );
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
            ctx.font = `${obj.size}px "j͑ʃꞇȝ", "ı],ᴜ }ʃᴜ", sans-serif`;
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

function drawPath( obj: TabulObjekto ): void {
    if ( !ctx || obj.points!.length < 2 ) return;
    desegniVojojnSegmentojn( obj.points! );
    ctx.stroke();
}

function drawShape( obj: TabulObjekto ): void {
    if ( !ctx ) return;
    ctx.strokeStyle = obj.color!;
    ctx.lineWidth = obj.size!;
    ctx.beginPath();
    desegniFormanVojon( obj.x!, obj.y!, obj.width!, obj.height!, obj.shape! );
    ctx.stroke();
}

function drawSelectionBox( obj: TabulObjekto ): void {
    if ( !ctx ) return;
    const handles = akiriTenilojn( obj );
    if ( handles.length < 4 ) return;
    
    // Get corner handles (nw, ne, se, sw are indices 0, 1, 2, 3)
    const nw = handles[ 0 ];
    const ne = handles[ 1 ];
    const se = handles[ 2 ];
    const sw = handles[ 3 ];
    
    ctx.save();
    ctx.strokeStyle = SELEKTA_TRABATA_KOLORO;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.lineWidth = SELEKTA_LINIO_LARGXO;
    ctx.setLineDash( LINIA_PUNKTO_PATRONO );
    
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
    ctx.fillStyle = TENILA_PLENIGA_KOLORO;
    ctx.strokeStyle = TENILA_TRABATA_KOLORO;
    ctx.lineWidth = 2;
    ctx.setLineDash( [] );
    for ( let i = 0; i < handles.length && i < 0o10; i++ ) {
        const h = handles[ i ];
        if ( h ) {
            ctx.beginPath();
            ctx.roundRect( h.x - TENILA_GRANDO / 2, h.y - TENILA_GRANDO / 2, TENILA_GRANDO, TENILA_GRANDO, TENILA_RADIUSO );
            ctx.fill();
            ctx.stroke();
        }
    }
    
    // Draw rotate handle above top-middle handle
    const topMidHandle = handles[ 4 ]; // "n" handle
    if ( topMidHandle ) {
        const rhX = topMidHandle.x;
        const rhY = topMidHandle.y - ROTACIA_TENILA_FORGXO;
        ctx.beginPath();
        ctx.arc( rhX, rhY, ROTACIA_TENILA_RADIUSO, 0, Math.PI * 0o2 );
        ctx.fillStyle = TENILA_PLENIGA_KOLORO;
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc( rhX, rhY, 0o10, 0, Math.PI * ( 3 / 2 ) );
        ctx.strokeStyle = TENILA_TRABATA_KOLORO;
        ctx.lineWidth = SELEKTA_LINIO_LARGXO;
        ctx.stroke();
    }
}

// ⟪ History & State 📚 ⟫

export function konserviStaton(): void {
    historioStato.history = historioStato.history.slice( 0, historioStato.index + 1 );
    sinkronigiPagajnObjektojn();
    const stateData = {
        layers: JSON.parse( JSON.stringify( tavolstato.layers ) ),
        pages: JSON.parse( JSON.stringify( paĝostato.pages ) )
    };
    historioStato.history.push( JSON.stringify( stateData ) );
    historioStato.index++;
    if ( historioStato.history.length > HISTORIA_MAKS ) {
        historioStato.history.shift();
        historioStato.index--;
    }
    gxisdatigiMalfarRefarButonojn();
}

export function gxisdatigiMalfarRefarButonojn(): void {
    const btnStates = [
        { ids: [ "undoBtn", "quickUndo" ], disabled: historioStato.index <= 0 },
        { ids: [ "redoBtn", "quickRedo" ], disabled: historioStato.index >= historioStato.history.length - 1 }
    ];
    btnStates.forEach( ( { ids, disabled } ) => {
        ids.forEach( id => {
            const btn = document.getElementById( id );
            if ( btn ) ( btn as HTMLButtonElement ).disabled = disabled;
        } );
    } );
}
