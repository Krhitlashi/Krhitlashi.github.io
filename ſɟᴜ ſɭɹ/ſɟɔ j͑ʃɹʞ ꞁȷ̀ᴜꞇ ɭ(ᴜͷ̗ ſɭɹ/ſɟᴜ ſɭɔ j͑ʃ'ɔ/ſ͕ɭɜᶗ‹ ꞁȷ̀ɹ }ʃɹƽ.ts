// ≺⧼ Icon Grid Class ⧽≻

declare const CONSTANTS: any;
declare const InputHandler: any;
declare const getTaskbar: any;
declare const getElementSpans: any;

import { AppData, IconGridConfig, CustomHTMLElement } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";
import { getContainerDimensions, getElementPosition } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſɭɔƽ.js";
import { setupTileDrag, setupTileResize } from "./ſɟɔ }ʃᴜ.js";

// ⟪ Mobile Grid Dimension Aliases ( from CONSTANTS ) ⟫
export const MOBILE_GRID_ROWS = CONSTANTS.DIM.MOBILE_ROWS;
export const MOBILE_GRID_COLS = CONSTANTS.DIM.MOBILE_COLS;
export const DESKTOP_GRID_ROWS = CONSTANTS.DIM.DEFAULT_ROWS;
export const DESKTOP_GRID_COLS = CONSTANTS.DIM.DEFAULT_COLS;

let APPS: AppData[] = [];

// ⟪ Icon Grid ⟫

export class IconGrid {
    containerId: string;
    container: HTMLElement | null;
    config: IconGridConfig;
    isMobile: boolean;
    rows: number;
    cols: number;
    initialRows: number;
    initialCols: number;
    bottomUp: boolean;
    fixedWidth: number | null;
    fixedHeight: number | null;
    editMode: boolean;
    labelMode: string;
    currentPage: number;
    totalPages: number;
    touchStartY: number;
    touchStartX: number;

    constructor( containerId: string, config: IconGridConfig = {} ) {
        this.containerId = containerId;
        this.container = document.getElementById( containerId );
        this.config = config;

        // Auto-detect mobile vs desktop
        this.isMobile = this.checkIsMobile();
        this.rows = this.isMobile ? MOBILE_GRID_ROWS : ( config.rows || DESKTOP_GRID_ROWS );
        this.cols = this.isMobile ? MOBILE_GRID_COLS : ( config.cols || DESKTOP_GRID_COLS );
        this.initialRows = this.rows;
        this.initialCols = this.cols;
        this.bottomUp = config.bottomUp || false;
        this.fixedWidth = config.width ?? null;
        this.fixedHeight = config.height ?? null;
        this.editMode = false;
        this.labelMode = config.labelMode || "external";
        this.currentPage = 0;
        this.totalPages = 1;
        this.touchStartY = 0;
        this.touchStartX = 0;

        if ( !this.container ) return;

        this.container.addEventListener( "dblclick", ( e: MouseEvent ) => {
            const isClickableBackground = this.containerId === "desktop" || this.containerId === "start-menu";
            if ( isClickableBackground && e.target === this.container ) {
                this.toggleEdit();
            }
        } );

        // Touch events for swipe pagination
        this.container.addEventListener( "touchstart", ( e: TouchEvent ) => this.handleTouchStart( e ), { passive: true } );
        this.container.addEventListener( "touchmove", ( e: TouchEvent ) => this.handleTouchMove( e ), { passive: false } );
        this.container.addEventListener( "touchend", ( e: TouchEvent ) => this.handleTouchEnd( e ), { passive: true } );

        // Listen for screen size changes
        window.addEventListener( "resize", () => this.handleScreenResize() );

        this.init();
    }

    checkIsMobile(): boolean {
        return window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;
    }

    handleScreenResize(): void {
        const wasMobile = this.isMobile;
        this.isMobile = this.checkIsMobile();

        if ( wasMobile !== this.isMobile ) {
            // Screen size changed between mobile and desktop
            this.rows = this.isMobile ? MOBILE_GRID_ROWS : DESKTOP_GRID_ROWS;
            this.cols = this.isMobile ? MOBILE_GRID_COLS : DESKTOP_GRID_COLS;
            this.refresh();
            this.relayout();
        }
    }

    handleTouchStart( e: TouchEvent ): void {
        this.touchStartY = e.touches[0].clientY;
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchMove( e: TouchEvent ): void {
        if ( this.containerId === "desktop" || this.containerId === "start-menu-content" ) {
            e.preventDefault();
        }
    }

    handleTouchEnd( e: TouchEvent ): void {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchEndY - this.touchStartY;
        const diffX = touchEndX - this.touchStartX;

        // Vertical swipe for pagination (only on mobile)
        if ( this.isMobile && Math.abs( diffY ) > Math.abs( diffX ) && Math.abs( diffY ) > 50 ) {
            if ( diffY > 0 ) {
                // Swipe down - previous page
                if ( this.currentPage > 0 ) {
                    this.currentPage--;
                    this.refresh();
                    if ( ( window as any ).DesktopIconManager ) ( window as any ).DesktopIconManager._updatePageIndicators();
                }
            } else {
                // Swipe up - next page
                const maxPage = Math.ceil( APPS.length / ( this.rows * this.cols ) ) - 1;
                if ( this.currentPage < maxPage ) {
                    this.currentPage++;
                    this.refresh();
                    if ( ( window as any ).DesktopIconManager ) ( window as any ).DesktopIconManager._updatePageIndicators();
                }
            }
        }
    }

    init(): void {
        // Clear container to remove any existing tiles
        if ( this.container ) {
            this.container.innerHTML = "";
        }
    }

    updateAdaptiveOrientation( el: HTMLElement ): void {
        requestAnimationFrame( () => {
            const rect = el.getBoundingClientRect();
            if ( rect.width === 0 || rect.height === 0 ) return;

            const taskbar = typeof getTaskbar === "function" ? getTaskbar() : document.getElementById( "taskbar" );
            const taskbarPos = taskbar?.dataset.position || "left";

            let effectivePos = taskbarPos;
            const { colSpan: oldColSpan, rowSpan: oldRowSpan } = getElementSpans( el );
            let newColSpan = oldColSpan;
            let newRowSpan = oldRowSpan;

            // Measure actual pill thickness
            const titleBar = el.querySelector( "ksaka" ) as HTMLElement | null;
            let pillThickness = 0o40;
            if ( titleBar ) {
                pillThickness = Math.min( titleBar.offsetWidth || 0o40, titleBar.offsetHeight || 0o40 );
            }

            const padding = 0o20;
            const threshold = 0o100 + pillThickness + padding;

            if ( this.labelMode === "external" ) {
                if ( rect.width < threshold ) {
                    effectivePos = "bottom";
                    if ( this.containerId === "start-menu-content" ) {
                        newRowSpan = 2;
                        newColSpan = 1;
                    }
                } else if ( rect.height < threshold ) {
                    effectivePos = "left";
                    if ( this.containerId === "start-menu-content" ) {
                        newColSpan = 2;
                        newRowSpan = 1;
                    }
                } else if ( this.containerId === "start-menu-content" ) {
                    newColSpan = 1;
                    newRowSpan = 1;
                }
            }

            el.dataset.position = effectivePos;
            if ( titleBar ) {
                titleBar.dataset.position = effectivePos;
            }

            if ( newColSpan !== oldColSpan || newRowSpan !== oldRowSpan ) {
                el.dataset.colSpan = newColSpan.toString();
                el.dataset.rowSpan = newRowSpan.toString();
                this.applyPosition( el, parseInt( el.dataset.col || "0" ), parseInt( el.dataset.row || "0" ) );
            }
        } );
    }

    addIcon( appData: AppData, index: number ): HTMLElement {
        if ( !this.container ) return {} as any;

        const el = document.createElement( "div" );
        el.className = "app-tile";
        el.dataset.app = appData.app;
        el.dataset.colSpan = "1";
        el.dataset.rowSpan = "1";

        let isDragging = false;

        // Create cepufal wrapper (like recents-card)
        const cepufalEl = document.createElement( "div" );
        cepufalEl.className = "cepufal";
        cepufalEl.style.padding = "0";

        // Create button area
        const buttonEl = document.createElement( "button" );
        buttonEl.style.blockSize = "100%";
        buttonEl.style.inlineSize = "100%";
        buttonEl.onclick = ( e: MouseEvent ) => {
            e.stopPropagation();
            // Open app if not in edit mode, not resizing, and not dragging
            if ( !this.editMode && !el.classList.contains( "resizing" ) && !isDragging ) {
                const wm = ( window as any ).WindowManager || ( window as any ).getWindowManager();
                if ( wm && wm.loadAppFromPath ) {
                    wm.loadAppFromPath( appData.app, appData.name );
                } else {
                    console.error( "WindowManager not available" );
                }
            }
            isDragging = false;
        };
        buttonEl.oncontextmenu = ( e: MouseEvent ) => {
            e.stopPropagation();
            e.preventDefault();
            if ( ( window as any ).ContextMenuManager ) {
                ( window as any ).ContextMenuManager.showForTile( e.clientX, e.clientY, el );
            }
        };

        // Add label based on mode
        if ( this.labelMode === "inside" ) {
            // Internal mode: label inside button area
            const labelSpan = document.createElement( "span" );
            labelSpan.className = "label inside";
            labelSpan.innerText = appData.name;
            buttonEl.appendChild( labelSpan );
        } else if ( this.labelMode !== "hidden" && this.labelMode !== "off" ) {
            // External mode: create title bar (ksaka - like recents-card)
            const labelContainer = document.createElement( "ksaka" );
            labelContainer.className = "title-bar";
            const textSpan = document.createElement( "p" );
            textSpan.className = "title-bar-title";
            textSpan.innerText = appData.name;
            labelContainer.appendChild( textSpan );
            cepufalEl.appendChild( labelContainer );
        }

        const iconSpan = document.createElement( "span" );
        iconSpan.className = "icon";
        iconSpan.innerText = appData.icon;
        buttonEl.appendChild( iconSpan );

        cepufalEl.appendChild( buttonEl );
        el.appendChild( cepufalEl );

        const handle = document.createElement( "div" );
        handle.className = "resize-handle";
        const onResizeStart = ( e: any ) => {
            e.stopPropagation();
            e.preventDefault();
            const pos = InputHandler.getPointerPos( e );
            setupTileResize( this, el, pos.x, pos.y );
        };
        handle.addEventListener( "mousedown", onResizeStart );
        handle.addEventListener( "touchstart", onResizeStart, { passive: false } );

        el.appendChild( handle );

        if ( this.container ) this.container.appendChild( el );
        this.snapToGrid( el, index );
        this.updateAdaptiveOrientation( el );

        // Track resize state on the element itself
        ( el as CustomHTMLElement )._isResizing = false;

        // Handle mousedown and touchstart for drag initiation
        const onPointerDown = ( e: any ) => {
            // Check if clicking directly on resize handle element
            const isResizeHandle = e.target === handle;
            const canDrag = this.editMode || ( this.containerId === "desktop" && !isResizeHandle );

            // Block drag if currently resizing or on resize handle
            if ( ( el as CustomHTMLElement )._isResizing || isResizeHandle ) {
                return;
            }

            if ( canDrag ) {
                const pos = InputHandler.getPointerPos( e );
                setupTileDrag( this, el, pos.x, pos.y, () => {
                    isDragging = false;
                } );
            }
        };

        el.addEventListener( "mousedown", onPointerDown );
        el.addEventListener( "touchstart", onPointerDown, { passive: true } );

        return el;
    }

    snapToGrid( el: HTMLElement, index: number ): void {
        if ( !this.container ) return;

        // Handle pagination for mobile desktop only
        const itemsPerPage = this.rows * this.cols;
        const pageIndex = itemsPerPage > 0 ? Math.floor( index / itemsPerPage ) : 0;
        const indexOnPage = itemsPerPage > 0 ? index % itemsPerPage : index;

        // Store page info on element
        el.dataset.page = pageIndex.toString();

        // Show/hide based on pagination (mobile desktop only)
        if ( this.isMobile && this.containerId === "desktop" ) {
            el.style.display = pageIndex === this.currentPage ? "" : "none";
        }
        if ( this.containerId !== "start-menu-content" ) {
            const c = Math.floor( indexOnPage / this.rows );
            const r = ( this.rows - 1 ) - ( indexOnPage % this.rows );
            this.applyPosition( el, c, r );
            return;
        }

        // Start menu: use full index for scrolling layout
        const taskbar = typeof getTaskbar === "function" ? getTaskbar() : document.getElementById( "taskbar" );
        const taskbarPos = taskbar?.dataset.position || "left";
        const isVerticalTaskbar = taskbarPos === "left" || taskbarPos === "right";

        // Adaptive spanning
        if ( isVerticalTaskbar ) {
            el.dataset.colSpan = "2";
            el.dataset.rowSpan = "1";
        } else {
            el.dataset.colSpan = "1";
            el.dataset.rowSpan = "2";
        }

        const { colSpan: cs, rowSpan: rs } = getElementSpans( el );

        // Fill vertically (bottom to top), then horizontally
        if ( isVerticalTaskbar ) {
            const itemsPerCol = this.rows;
            const colGroup = Math.floor( index / itemsPerCol );
            const c = colGroup * cs;
            const r = ( this.rows - rs ) - ( index % itemsPerCol );
            this.applyPosition( el, c, r );
        } else {
            const itemsPerCol = Math.floor( this.rows / rs );
            const c = Math.floor( index / itemsPerCol ) * cs;
            const r = ( this.rows - rs ) - ( index % itemsPerCol ) * rs;
            this.applyPosition( el, c, r );
        }
    }

    applyPosition( el: HTMLElement, c: number, r: number, xOffset: number = 0 ): void {
        const { colSpan, rowSpan } = getElementSpans( el );

        const canExpand = this.containerId === "start-menu-content";
        if ( canExpand ) {
            let needsRefresh = false;
            if ( c + colSpan > this.cols ) {
                this.cols = c + colSpan;
                needsRefresh = true;
            }
            if ( r + rowSpan > this.rows ) {
                this.rows = r + rowSpan;
                needsRefresh = true;
            }
            if ( needsRefresh ) {
                this.refresh();
                return;
            }
        } else {
            if ( c + colSpan > this.cols ) c = this.cols - colSpan;
            if ( r + rowSpan > this.rows ) r = this.rows - rowSpan;
        }

        if ( c < 0 ) c = 0;
        if ( r < 0 ) r = 0;

        const gap = CONSTANTS.DIM.GAP_SIZE;

        const widthCalc = `calc((${colSpan} / ${this.cols}) * (100% - ${(this.cols - 1) * gap}px) + ${(colSpan - 1) * gap}px)`;
        const heightCalc = `calc((${rowSpan} / ${this.rows}) * (100% - ${(this.rows - 1) * gap}px) + ${(rowSpan - 1) * gap}px)`;
        const leftCalc = `calc((${c} / ${this.cols}) * (100% - ${(this.cols - 1) * gap}px) + ${c * gap}px${xOffset ? ` + ${xOffset}px` : ""})`;
        const topCalc = `calc((${r} / ${this.rows}) * (100% - ${(this.rows - 1) * gap}px) + ${r * gap}px)`;

        el.style.width = widthCalc;
        el.style.height = heightCalc;
        el.style.left = leftCalc;
        el.style.top = topCalc;

        el.dataset.col = c.toString();
        el.dataset.row = r.toString();

        if ( canExpand && this.container ) {
            this.container.style.minHeight = `${(this.rows / this.initialRows) * 100}%`;
            this.container.style.width = "100%";
        }
    }

    relayout(): void {
        if ( !this.config.centered || !this.container ) return;

        const tiles = Array.from( this.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[];
        if ( tiles.length === 0 ) return;

        let minC = this.cols;
        let maxC = 0;
        tiles.forEach( tile => {
            const { col: c, colSpan: cs } = getElementPosition( tile );
            if ( c < minC ) minC = c;
            if ( c + cs > maxC ) maxC = c + cs;
        } );

        const usedWidthCols = maxC - minC;
        const { width: containerW } = getContainerDimensions( this.fixedWidth, this.fixedHeight, this.container );
        const w = containerW / this.cols;
        const xOffset = ( containerW - ( usedWidthCols * w ) ) / 2 - ( minC * w );

        tiles.forEach( tile => {
            const { col, row } = getElementPosition( tile );
            this.applyPosition( tile, col, row, xOffset );
        } );

        if ( this.containerId === "start-menu-content" ) {
            this.container.style.minHeight = `${(this.rows / this.initialRows) * 100}%`;
            this.container.style.minWidth = `${(this.cols / this.initialCols) * 100}%`;
        }
    }

    isAreaOccupied( c: number, r: number, colSpan: number, rowSpan: number, excludeEl: HTMLElement | null ): boolean {
        if ( !this.container ) return false;
        for ( const tile of Array.from( this.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[] ) {
            if ( tile === excludeEl ) continue;

            // Use current position from dataset
            let tc = parseInt( tile.dataset.col || "0" );
            let tr = parseInt( tile.dataset.row || "0" );

            // For the excluded element, use its intended new position if provided
            if ( tile === excludeEl && tile.dataset._newCol !== undefined ) {
                tc = parseInt( tile.dataset._newCol );
                tr = parseInt( tile.dataset._newRow || "0" );
            }

            const { colSpan: tcs, rowSpan: trs } = getElementSpans( tile );

            if ( c < tc + tcs && c + colSpan > tc && r < tr + trs && r + rowSpan > tr ) {
                return true;
            }
        }
        return false;
    }

    snapAfterDrag( el: HTMLElement ): void {
        const { width: containerW, height: containerH } = getContainerDimensions( this.fixedWidth, this.fixedHeight, this.container );
        const gap = CONSTANTS.DIM.GAP_SIZE;
        const cellW = ( containerW - ( this.cols - 1 ) * gap ) / this.cols;
        const cellH = ( containerH - ( this.rows - 1 ) * gap ) / this.rows;

        if ( !this.container ) return;
        const containerRect = this.container.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        const localX = ( elRect.left - containerRect.left );
        const localY = ( elRect.top - containerRect.top );

        let c = Math.round( localX / ( cellW + gap ) );
        let r = Math.round( localY / ( cellH + gap ) );

        const { colSpan, rowSpan } = getElementSpans( el );
        if ( c < 0 ) c = 0;
        if ( r < 0 ) r = 0;

        if ( this.containerId !== "start-menu-content" ) {
            if ( c + colSpan > this.cols ) c = this.cols - colSpan;
            if ( r + rowSpan > this.rows ) r = this.rows - rowSpan;
        }

        // Set temporary new position for collision detection
        el.dataset._newCol = c.toString();
        el.dataset._newRow = r.toString();

        if ( this.isAreaOccupied( c, r, colSpan, rowSpan, el ) ) {
            let spotFound = false;
            for ( let radius = 1; radius < 0o40 && !spotFound; radius++ ) {
                for ( let dc = -radius; dc <= radius && !spotFound; dc++ ) {
                    for ( let dr = -radius; dr <= radius && !spotFound; dr++ ) {
                        const nc = c + dc;
                        const nr = r + dr;
                        if ( nc >= 0 && nc + colSpan <= this.cols && nr >= 0 && nr + rowSpan <= this.rows ) {
                            el.dataset._newCol = nc.toString();
                            el.dataset._newRow = nr.toString();
                            if ( !this.isAreaOccupied( nc, nr, colSpan, rowSpan, el ) ) {
                                c = nc; r = nr; spotFound = true;
                            }
                        }
                    }
                }
            }
            // If no empty spot found, keep the dropped position anyway
        }

        // Clear temporary values and apply position
        delete el.dataset._newCol;
        delete el.dataset._newRow;

        this.applyPosition( el, c, r );
        this.updateAdaptiveOrientation( el );

        // Save tile layout to storage
        if ( this.containerId === "desktop" ) ( window as any ).DesktopIconManager?._saveDesktopLayout();
    }

    toggleEdit(): void {
        this.editMode = !this.editMode;
        if ( this.container ) this.container.classList.toggle( "edit-mode" );
        document.body.classList.toggle( "edit-mode", this.editMode );
    }

    refresh(): void {
        if ( !this.container ) return;
        const tiles = Array.from( this.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[];
        tiles.forEach( ( tile, index ) => {
            const { col: c, row: r } = getElementPosition( tile );
            const page = parseInt( tile.dataset.page || "0" ) || 0;

            // Update pagination visibility (mobile desktop only)
            if ( this.isMobile && this.containerId === "desktop" ) {
                tile.style.display = page === this.currentPage ? "" : "none";
            }

            if ( !isNaN( c ) && !isNaN( r ) ) this.applyPosition( tile, c, r );
            else this.snapToGrid( tile, index );
        } );
    }
}

// Attach to window for global access
( window as any ).IconGrid = IconGrid;

/**
 * Get maximum page number for mobile pagination
 */
export function getMaxPage( apps?: any[] ): number {
    const itemsPerPage = MOBILE_GRID_ROWS * MOBILE_GRID_COLS;
    return Math.ceil( ( apps || ( window as any ).APPS || [] ).length / itemsPerPage ) - 1;
}
