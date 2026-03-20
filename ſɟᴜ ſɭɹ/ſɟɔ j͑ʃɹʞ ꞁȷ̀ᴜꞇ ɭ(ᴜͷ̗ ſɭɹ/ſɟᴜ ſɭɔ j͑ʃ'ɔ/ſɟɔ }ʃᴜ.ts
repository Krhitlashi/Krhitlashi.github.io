// ≺⧼ Tile Drag and Resize Handlers ⧽≻

declare const CONSTANTS: any;
declare const InputHandler: any;
declare const getStartMenu: any;
declare const closeAllPanels: any;
declare const getContainerDimensions: any;
declare const isWithinBounds: any;
declare const setElementDragging: any;

import { CustomHTMLElement } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";

/**
 * Setup pointer event listeners for drag/resize operations
 */
function setupPointerEvents(
    onMove: ( ev: any ) => void,
    onEnd: () => void
): void {
    document.addEventListener( "mousemove", onMove );
    document.addEventListener( "mouseup", onEnd );
    document.addEventListener( "touchmove", onMove, { passive: false } );
    document.addEventListener( "touchend", onEnd );
    document.addEventListener( "touchcancel", onEnd );
}

/**
 * Remove pointer event listeners for drag/resize operations
 */
function removePointerEvents(
    onMove: ( ev: any ) => void,
    onEnd: () => void
): void {
    document.removeEventListener( "mousemove", onMove );
    document.removeEventListener( "mouseup", onEnd );
    document.removeEventListener( "touchmove", onMove );
    document.removeEventListener( "touchend", onEnd );
    document.removeEventListener( "touchcancel", onEnd );
}

// Forward reference to avoid circular dependency
interface IconGridLike {
    containerId: string;
    container: HTMLElement | null;
    rows: number;
    cols: number;
    fixedWidth: number | null;
    fixedHeight: number | null;
    isMobile: boolean;
    snapAfterDrag( el: HTMLElement ): void;
    isAreaOccupied( c: number, r: number, colSpan: number, rowSpan: number, excludeEl: HTMLElement | null ): boolean;
    applyPosition( el: HTMLElement, c: number, r: number, xOffset?: number ): void;
    updateAdaptiveOrientation( el: HTMLElement ): void;
}

/**
 * Setup unified drag handling for tile
 * @param {IconGridLike} grid - The grid instance
 * @param {HTMLElement} el - Element being dragged
 * @param {number} startX - Start X position
 * @param {number} startY - Start Y position
 * @param {Function} onDragEnd - Callback when drag ends
 */
export function setupTileDrag( grid: IconGridLike, el: HTMLElement, startX: number, startY: number, onDragEnd: (() => void) | null ): void {
    const startLeft = el.offsetLeft;
    const startTop = el.offsetTop;
    let startMenuClosed = false;
    const startMenu = grid.containerId === "start-menu-content" ? getStartMenu() : null;
    const originalParent = el.parentElement;
    const originalNextSibling = el.nextSibling;
    let hasDragged = false;

    setElementDragging( el, true );
    el.style.zIndex = ( CONSTANTS.WM.BASE_Z_INDEX + 0o100 ).toString();

    if ( grid.containerId === "start-menu-content" ) {
        document.body.appendChild( el );
        el.style.position = "fixed";
    }

    const move = ( clientX: number, clientY: number ) => {
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        const dragDistance = Math.abs( deltaX ) + Math.abs( deltaY );

        // Set isDragging only after moving beyond threshold
        if ( !hasDragged && dragDistance > CONSTANTS.DIM.DRAG_THRESHOLD ) {
            hasDragged = true;
        }

        // Close start menu if dragging far enough
        if ( !startMenuClosed && startMenu && grid.containerId === "start-menu-content" && dragDistance > CONSTANTS.DIM.DRAG_THRESHOLD ) {
            startMenu.classList.remove( "open" );
            document.body.classList.remove( "start-menu-open" );
            if ( typeof closeAllPanels === "function" ) closeAllPanels();
            startMenuClosed = true;
        }

        if ( el.style.position === "fixed" ) {
            el.style.left = clientX - el.offsetWidth / 2 + "px";
            el.style.top = clientY - el.offsetHeight / 2 + "px";
        } else {
            const { width: containerW, height: containerH } = getContainerDimensions( grid.fixedWidth, grid.fixedHeight, grid.container );
            const gap = CONSTANTS.DIM.GAP_SIZE;
            const cellW = ( containerW - ( grid.cols - 1 ) * gap ) / grid.cols;
            const cellH = ( containerH - ( grid.rows - 1 ) * gap ) / grid.rows;

            const rawLeft = startLeft + deltaX;
            const rawTop = startTop + deltaY;

            const snapX = Math.round( rawLeft / ( cellW + gap ) ) * ( cellW + gap );
            const snapY = Math.round( rawTop / ( cellH + gap ) ) * ( cellH + gap );

            el.style.left = snapX + "px";
            el.style.top = snapY + "px";
        }
    };

    const up = () => {
        setElementDragging( el, false );
        el.style.zIndex = "";

        // Handle transfer from start menu to desktop
        if ( grid.containerId === "start-menu-content" && ( window as any ).DesktopIconManager?.desktop ) {
            const desktop = ( window as any ).DesktopIconManager.desktop.container;
            const desktopRect = desktop.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            const elCenterX = elRect.left + elRect.width / 2;
            const elCenterY = elRect.top + elRect.height / 2;

            if ( isWithinBounds( elCenterX, elCenterY, desktopRect ) ) {
                el.style.position = "";
                if ( onDragEnd ) onDragEnd();
                ( grid as any ).transferIconFromStartMenu( el );
                return;
            }
        }

        // Restore position or snap
        if ( grid.containerId === "start-menu-content" && originalParent ) {
            el.style.position = "";
            if ( onDragEnd ) onDragEnd();
            if ( originalNextSibling ) originalParent.insertBefore( el, originalNextSibling );
            else originalParent.appendChild( el );
            grid.snapAfterDrag( el );
        } else {
            if ( onDragEnd ) onDragEnd();
            grid.snapAfterDrag( el );
        }
    };

    // Setup event listeners for both mouse and touch
    const onMove = ( ev: any ) => {
        ev.preventDefault();
        const pos = InputHandler.getPointerPos( ev );
        move( pos.x, pos.y );
    };

    const onEnd = () => {
        removePointerEvents( onMove, onEnd );
        up();
    };

    setupPointerEvents( onMove, onEnd );
}

/**
 * Setup unified resize handling for tile
 * @param {IconGridLike} grid - The grid instance
 * @param {HTMLElement} el - Element being resized
 * @param {number} startX - Start X position
 * @param {number} startY - Start Y position
 */
export function setupTileResize( grid: IconGridLike, el: HTMLElement, startX: number, startY: number ): void {
    const startW = el.offsetWidth;
    const startH = el.offsetHeight;
    const { width: containerW, height: containerH } = getContainerDimensions( grid.fixedWidth, grid.fixedHeight, grid.container );
    const gap = CONSTANTS.DIM.GAP_SIZE;
    const cellW = ( containerW - ( grid.cols - 1 ) * gap ) / grid.cols;
    const cellH = ( containerH - ( grid.rows - 1 ) * gap ) / grid.rows;

    el.classList.add( "resizing" );

    const move = ( clientX: number, clientY: number ) => {
        const dx = clientX - startX;
        const dy = clientY - startY;

        let colSpan = Math.round( ( startW + dx ) / cellW );
        let rowSpan = Math.round( ( startH + dy ) / cellH );

        if ( colSpan < 1 ) colSpan = 1;
        if ( rowSpan < 1 ) rowSpan = 1;

        if ( grid.isAreaOccupied( parseInt( el.dataset.col || "0" ), parseInt( el.dataset.row || "0" ), colSpan, rowSpan, el ) ) return;

        el.style.width = `${cellW * colSpan + ( colSpan - 1 ) * gap}px`;
        el.style.height = `${cellH * rowSpan + ( rowSpan - 1 ) * gap}px`;

        el.dataset.pendingColSpan = colSpan.toString();
        el.dataset.pendingRowSpan = rowSpan.toString();
    };

    const up = () => {
        el.classList.remove( "resizing" );
        el.classList.remove( "dragging" );
        ( el as CustomHTMLElement )._isResizing = false;

        if ( el.dataset.pendingColSpan ) {
            const newColSpan = parseInt( el.dataset.pendingColSpan );
            const newRowSpan = parseInt( el.dataset.pendingRowSpan || "1" );
            if ( !grid.isAreaOccupied( parseInt( el.dataset.col || "0" ), parseInt( el.dataset.row || "0" ), newColSpan, newRowSpan, el ) ) {
                el.dataset.colSpan = newColSpan.toString();
                el.dataset.rowSpan = newRowSpan.toString();
            }
            delete el.dataset.pendingColSpan;
            delete el.dataset.pendingRowSpan;
        }

        void el.offsetWidth;
        grid.applyPosition( el, parseInt( el.dataset.col || "0" ), parseInt( el.dataset.row || "0" ) );
        grid.updateAdaptiveOrientation( el );

        // Save tile layout to storage
        if ( grid.containerId === "desktop" ) ( window as any ).DesktopIconManager?._saveDesktopLayout();
    };

    const onMove = ( ev: any ) => {
        ev.preventDefault();
        const pos = InputHandler.getPointerPos( ev );
        move( pos.x, pos.y );
    };

    const onEnd = () => {
        removePointerEvents( onMove, onEnd );
        up();
    };

    setupPointerEvents( onMove, onEnd );
}
