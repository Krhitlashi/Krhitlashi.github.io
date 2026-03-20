// ≺⧼ HTML Text Cache Module ⧽≻

import { WhiteboardObject } from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

// ⟪ Cache Management 📦 ⟫

/**
 * Invalidates text caches for the provided text objects.
 * @param objects - Array of whiteboard objects to process
 */
export function invalidateTextCachesForObjects( objects: WhiteboardObject[] ): void {
    objects.filter( obj => obj.type === "text" && obj.useHtmlText ).forEach( clearTextObjectCache );
}

export function clearTextObjectCache( obj: WhiteboardObject ): void {
    if ( obj.type === "text" ) {
        obj.textDirty = true;
        obj.cachedCanvas = null;
        obj.cachedWidth = null;
        obj.cachedHeight = null;
    }
}

// ⟪ HTML Text Rendering 🎨 ⟫

export interface HtmlTextRenderOptions {
    x: number;
    y: number;
    size: number;
    color: string;
    text: string;
    fontFamily?: string;
}

export function renderHtmlTextToCanvas( obj: WhiteboardObject ): HTMLCanvasElement | null {
    if ( obj.type !== "text" || !obj.text ) return null;

    const uniqueClass = "cepufal-html-text-" + Date.now();
    const tempContainer = createTempTextContainer( obj, uniqueClass );

    document.body.appendChild( tempContainer );
    ( window as any ).vacepu( uniqueClass );

    const dimensions = measureTextContainer( tempContainer, obj.size! );
    const offscreen = createOffscreenCanvas( dimensions );
    const offCtx = offscreen.getContext( "2d" )!;

    renderTextNodesToCanvas( tempContainer, offCtx, dimensions, obj );

    document.body.removeChild( tempContainer );

    // Cache the result on the object
    obj.cachedCanvas = offscreen;
    obj.cachedWidth = dimensions.width;
    obj.cachedHeight = dimensions.height;
    obj.textDirty = false;

    return offscreen;
}

function createTempTextContainer( obj: WhiteboardObject, uniqueClass: string ): HTMLDivElement {
    const tempContainer = document.createElement( "div" );
    tempContainer.className = "cepufal cepufal-html-text-measure " + uniqueClass;
    tempContainer.style.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
    tempContainer.style.color = obj.color!;
    tempContainer.appendChild( document.createTextNode( obj.text || " " ) );
    return tempContainer;
}

function measureTextContainer( container: HTMLDivElement, minSize: number ): { width: number; height: number } {
    let width = container.offsetWidth;
    let height = container.offsetHeight;

    width = Math.max( width, minSize * 2 );
    height = Math.max( height, minSize );

    return { width, height };
}

function createOffscreenCanvas( dimensions: { width: number; height: number } ): HTMLCanvasElement {
    const dpr = window.devicePixelRatio || 1;
    const offscreen = document.createElement( "canvas" );
    offscreen.width = Math.max( 1, Math.floor( dimensions.width * dpr ) );
    offscreen.height = Math.max( 1, Math.floor( dimensions.height * dpr ) );

    const offCtx = offscreen.getContext( "2d" )!;
    offCtx.scale( dpr, dpr );

    return offscreen;
}

function renderTextNodesToCanvas(
    container: HTMLDivElement,
    ctx: CanvasRenderingContext2D,
    dimensions: { width: number; height: number },
    obj: WhiteboardObject
): void {
    ctx.clearRect( 0, 0, dimensions.width, dimensions.height );
    ctx.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
    ctx.fillStyle = obj.color!;
    ctx.textBaseline = "top";
    ctx.textAlign = "left";

    const containerRect = container.getBoundingClientRect();
    const childNodes = container.childNodes;

    for ( let i = 0; i < childNodes.length; i++ ) {
        const node = childNodes[ i ];
        if ( node.nodeType === Node.ELEMENT_NODE && ( node as HTMLElement ).classList.contains( "cepufalxez" ) ) {
            renderElementNodeToCanvas( node as HTMLElement, ctx, containerRect );
        } else if ( node.nodeType === Node.TEXT_NODE && node.textContent?.trim() ) {
            renderTextNodeToCanvas( node, ctx, containerRect );
        }
    }
}

function renderElementNodeToCanvas(
    element: HTMLElement,
    ctx: CanvasRenderingContext2D,
    containerRect: DOMRect
): void {
    const rect = element.getBoundingClientRect();
    ctx.fillText(
        element.textContent!,
        rect.left - containerRect.left,
        rect.top - containerRect.top
    );
}

function renderTextNodeToCanvas(
    node: Node,
    ctx: CanvasRenderingContext2D,
    containerRect: DOMRect
): void {
    const range = document.createRange();
    range.selectNodeContents( node );
    const rect = range.getBoundingClientRect();
    ctx.fillText(
        node.textContent!,
        rect.left - containerRect.left,
        rect.top - containerRect.top
    );
}

// ⟪ Draw Cached Text 🖼️ ⟫

export function drawCachedText(
    ctx: CanvasRenderingContext2D,
    obj: WhiteboardObject
): void {
    if ( !obj.cachedCanvas || !obj.cachedWidth || !obj.cachedHeight ) {
        renderHtmlTextToCanvas( obj );
    }

    if ( obj.cachedCanvas && obj.cachedWidth && obj.cachedHeight && !obj.textDirty ) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
            obj.cachedCanvas,
            obj.x!,
            obj.y! - obj.cachedHeight,
            obj.cachedWidth,
            obj.cachedHeight
        );
    }
}
