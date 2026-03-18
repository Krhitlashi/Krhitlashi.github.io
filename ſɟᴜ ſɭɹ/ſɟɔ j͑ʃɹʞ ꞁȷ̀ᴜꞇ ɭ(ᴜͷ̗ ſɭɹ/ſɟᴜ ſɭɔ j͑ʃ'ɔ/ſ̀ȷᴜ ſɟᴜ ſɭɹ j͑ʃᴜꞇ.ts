// ≺⧼ IconGrid Class ⧽≻

/* eslint-disable @typescript-eslint/no-explicit-any */

declare const CONSTANTS: any;
declare const APPS_DATA: any;
declare const QS_TOGGLES: any;
declare const InputHandler: any;
declare const setElementDragging: any;
declare const getStartMenu: any;
declare const closeAllPanels: any;
declare const getElementSpans: any;
declare const getWindowManager: any;
declare const getTaskbar: any;
declare const Storage: any;
declare const StorageUtil: any;
declare const QSManager: any;
declare const NotificationManager: any;
declare const AnimationManager: any;
declare const DesktopIconManager: any;
declare const ContextMenuManager: any;
declare const throttle: any;
declare const vab6caja: any;
declare const castifeh2: any;
declare const kf2Cax2lStafl2: any;
declare const toggleQsButton: any;
declare const getStrings: any;
declare const updateSlider: any;

interface Window {
    DesktopIconManager: any;
    ContextMenuManager: any;
    AnimationManager: any;
    ClockManager: any;
}

interface CustomHTMLElement extends HTMLElement {
    _isResizing?: boolean;
}

interface AppData {
    name: string;
    icon: string;
    app: string;
}

interface IconGridConfig {
    rows?: number;
    cols?: number;
    centered?: boolean;
    bottomUp?: boolean;
    width?: number;
    height?: number;
    labelMode?: string;
}

let APPS: AppData[] = [];

// ⟪ Mobile Grid Dimension Aliases ( from CONSTANTS ) ⟫
const MOBILE_GRID_ROWS = CONSTANTS.DIM.MOBILE_ROWS;
const MOBILE_GRID_COLS = CONSTANTS.DIM.MOBILE_COLS;
const DESKTOP_GRID_ROWS = CONSTANTS.DIM.DEFAULT_ROWS;
const DESKTOP_GRID_COLS = CONSTANTS.DIM.DEFAULT_COLS;

// ⟪ Helper Functions ⟫

/**
 * Get container dimensions (fixed or from element)
 * @param {number} fixedWidth - Fixed width or null
 * @param {number} fixedHeight - Fixed height or null
 * @param {HTMLElement} container - Container element
 * @returns {{width: number, height: number}}
 */
function getContainerDimensions(fixedWidth: number | null, fixedHeight: number | null, container: HTMLElement | null): { width: number; height: number } {
    return {
        width: fixedWidth ?? (container?.clientWidth || window.innerWidth),
        height: fixedHeight ?? (container?.clientHeight || window.innerHeight)
    };
}

/**
 * Check if point is within bounds
 * @param {number} x
 * @param {number} y
 * @param {DOMRect} bounds
 * @returns {boolean}
 */
function isWithinBounds(x: number, y: number, bounds: DOMRect): boolean {
    return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
}

/**
 * Setup unified drag handling for tile
 * @param {IconGrid} grid - The grid instance
 * @param {HTMLElement} el - Element being dragged
 * @param {number} startX - Start X position
 * @param {number} startY - Start Y position
 * @param {Function} onDragEnd - Callback when drag ends
 */
function setupTileDrag(grid: IconGrid, el: HTMLElement, startX: number, startY: number, onDragEnd: (() => void) | null): void {
    const startLeft = el.offsetLeft;
    const startTop = el.offsetTop;
    let startMenuClosed = false;
    const startMenu = grid.containerId === "start-menu-content" ? getStartMenu() : null;
    const originalParent = el.parentElement;
    const originalNextSibling = el.nextSibling;
    let hasDragged = false;

    setElementDragging(el, true);
    el.style.zIndex = "8192";

    if (grid.containerId === "start-menu-content") {
        document.body.appendChild(el);
        el.style.position = "fixed";
    }

    const move = (clientX: number, clientY: number) => {
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        const dragDistance = Math.abs(deltaX) + Math.abs(deltaY);

        // Set isDragging only after moving beyond threshold
        if (!hasDragged && dragDistance > CONSTANTS.DIM.DRAG_THRESHOLD) {
            hasDragged = true;
        }

        // Close start menu if dragging far enough
        if (!startMenuClosed && startMenu && grid.containerId === "start-menu-content" && dragDistance > CONSTANTS.DIM.DRAG_THRESHOLD) {
            startMenu.classList.remove("open");
            document.body.classList.remove("start-menu-open");
            if (typeof closeAllPanels === "function") closeAllPanels();
            startMenuClosed = true;
        }

        if (el.style.position === "fixed") {
            el.style.left = clientX - el.offsetWidth / 2 + "px";
            el.style.top = clientY - el.offsetHeight / 2 + "px";
        } else {
            const { width: containerW, height: containerH } = getContainerDimensions(grid.fixedWidth, grid.fixedHeight, grid.container);
            const gap = CONSTANTS.DIM.GAP_SIZE;
            const cellW = (containerW - (grid.cols - 1) * gap) / grid.cols;
            const cellH = (containerH - (grid.rows - 1) * gap) / grid.rows;

            const rawLeft = startLeft + deltaX;
            const rawTop = startTop + deltaY;

            const snapX = Math.round(rawLeft / (cellW + gap)) * (cellW + gap);
            const snapY = Math.round(rawTop / (cellH + gap)) * (cellH + gap);

            el.style.left = snapX + "px";
            el.style.top = snapY + "px";
        }
    };

    const up = () => {
        setElementDragging(el, false);
        el.style.zIndex = "";

        // Handle transfer from start menu to desktop
        if (grid.containerId === "start-menu-content" && (window as any).DesktopIconManager?.desktop) {
            const desktop = (window as any).DesktopIconManager.desktop.container;
            const desktopRect = desktop.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            const elCenterX = elRect.left + elRect.width / 2;
            const elCenterY = elRect.top + elRect.height / 2;

            if (isWithinBounds(elCenterX, elCenterY, desktopRect)) {
                el.style.position = "";
                if (onDragEnd) onDragEnd();
                (grid as any).transferIconFromStartMenu(el);
                return;
            }
        }

        // Restore position or snap
        if (grid.containerId === "start-menu-content" && originalParent) {
            el.style.position = "";
            if (onDragEnd) onDragEnd();
            if (originalNextSibling) originalParent.insertBefore(el, originalNextSibling);
            else originalParent.appendChild(el);
            grid.snapAfterDrag(el);
        } else {
            if (onDragEnd) onDragEnd();
            grid.snapAfterDrag(el);
        }
    };

    // Setup event listeners for both mouse and touch
    const onMove = (ev: any) => {
        ev.preventDefault();
        const pos = InputHandler.getPointerPos(ev);
        move(pos.x, pos.y);
    };

    const onEnd = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onEnd);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onEnd);
        document.removeEventListener("touchcancel", onEnd);
        up();
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd);
    document.addEventListener("touchcancel", onEnd);
}

/**
 * Setup unified resize handling for tile
 * @param {IconGrid} grid - The grid instance
 * @param {HTMLElement} el - Element being resized
 * @param {number} startX - Start X position
 * @param {number} startY - Start Y position
 */
function setupTileResize(grid: IconGrid, el: HTMLElement, startX: number, startY: number): void {
    const startW = el.offsetWidth;
    const startH = el.offsetHeight;
    const { width: containerW, height: containerH } = getContainerDimensions(grid.fixedWidth, grid.fixedHeight, grid.container);
    const gap = CONSTANTS.DIM.GAP_SIZE;
    const cellW = (containerW - (grid.cols - 1) * gap) / grid.cols;
    const cellH = (containerH - (grid.rows - 1) * gap) / grid.rows;

    el.classList.add("resizing");

    const move = (clientX: number, clientY: number) => {
        const dx = clientX - startX;
        const dy = clientY - startY;

        let colSpan = Math.round((startW + dx) / cellW);
        let rowSpan = Math.round((startH + dy) / cellH);

        if (colSpan < 1) colSpan = 1;
        if (rowSpan < 1) rowSpan = 1;

        if (grid.isAreaOccupied(parseInt(el.dataset.col || "0"), parseInt(el.dataset.row || "0"), colSpan, rowSpan, el)) return;

        el.style.width = `${cellW * colSpan + (colSpan - 1) * gap}px`;
        el.style.height = `${cellH * rowSpan + (rowSpan - 1) * gap}px`;

        el.dataset.pendingColSpan = colSpan.toString();
        el.dataset.pendingRowSpan = rowSpan.toString();
    };

    const up = () => {
        el.classList.remove("resizing");
        el.classList.remove("dragging");
        (el as CustomHTMLElement)._isResizing = false;

        if (el.dataset.pendingColSpan) {
            const newColSpan = parseInt(el.dataset.pendingColSpan);
            const newRowSpan = parseInt(el.dataset.pendingRowSpan || "1");
            if (!grid.isAreaOccupied(parseInt(el.dataset.col || "0"), parseInt(el.dataset.row || "0"), newColSpan, newRowSpan, el)) {
                el.dataset.colSpan = newColSpan.toString();
                el.dataset.rowSpan = newRowSpan.toString();
            }
            delete el.dataset.pendingColSpan;
            delete el.dataset.pendingRowSpan;
        }

        void el.offsetWidth;
        grid.applyPosition(el, parseInt(el.dataset.col || "0"), parseInt(el.dataset.row || "0"));
        grid.updateAdaptiveOrientation(el);

        // Save tile layout to storage
        if ( grid.containerId === "desktop" ) (window as any).DesktopIconManager?._saveDesktopLayout();
    };

    const onMove = (ev: any) => {
        ev.preventDefault();
        const pos = InputHandler.getPointerPos(ev);
        move(pos.x, pos.y);
    };

    const onEnd = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onEnd);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onEnd);
        document.removeEventListener("touchcancel", onEnd);
        up();
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd);
    document.addEventListener("touchcancel", onEnd);
}

// ⟪ Icon Grid ⟫

class IconGrid {
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

    constructor(containerId: string, config: IconGridConfig = {}) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
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

        this.container.addEventListener("dblclick", (e: MouseEvent) => {
            const isClickableBackground = this.containerId === "desktop" || this.containerId === "start-menu";
            if (isClickableBackground && e.target === this.container) {
                this.toggleEdit();
            }
        });

        // Touch events for swipe pagination
        this.container.addEventListener("touchstart", (e: TouchEvent) => this.handleTouchStart(e), { passive: true });
        this.container.addEventListener("touchmove", (e: TouchEvent) => this.handleTouchMove(e), { passive: false });
        this.container.addEventListener("touchend", (e: TouchEvent) => this.handleTouchEnd(e), { passive: true });

        // Listen for screen size changes
        window.addEventListener("resize", () => this.handleScreenResize());

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

    handleTouchStart(e: TouchEvent): void {
        this.touchStartY = e.touches[0].clientY;
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchMove(e: TouchEvent): void {
        if ( this.containerId === "desktop" || this.containerId === "start-menu-content" ) {
            e.preventDefault();
        }
    }

    handleTouchEnd(e: TouchEvent): void {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchEndY - this.touchStartY;
        const diffX = touchEndX - this.touchStartX;
        
        // Vertical swipe for pagination (only on mobile)
        if ( this.isMobile && Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50 ) {
            if ( diffY > 0 ) {
                // Swipe down - previous page
                if ( this.currentPage > 0 ) {
                    this.currentPage--;
                    this.refresh();
                    if ( (window as any).DesktopIconManager ) (window as any).DesktopIconManager._updatePageIndicators();
                }
            } else {
                // Swipe up - next page
                const maxPage = Math.ceil( APPS.length / ( this.rows * this.cols ) ) - 1;
                if ( this.currentPage < maxPage ) {
                    this.currentPage++;
                    this.refresh();
                    if ( (window as any).DesktopIconManager ) (window as any).DesktopIconManager._updatePageIndicators();
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

    updateAdaptiveOrientation(el: HTMLElement): void {
        requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();
            if ( rect.width === 0 || rect.height === 0 ) return;

            const taskbar = typeof getTaskbar === "function" ? getTaskbar() : document.getElementById("taskbar");
            const taskbarPos = taskbar?.dataset.position || "left";

            let effectivePos = taskbarPos;
            const oldColSpan = parseInt(el.dataset.colSpan || "1") || 1;
            const oldRowSpan = parseInt(el.dataset.rowSpan || "1") || 1;
            let newColSpan = oldColSpan;
            let newRowSpan = oldRowSpan;
            
            // Measure actual pill thickness
            const titleBar = el.querySelector("ksaka") as HTMLElement | null;
            let pillThickness = 0o40; 
            if ( titleBar ) {
                pillThickness = Math.min(titleBar.offsetWidth || 0o40, titleBar.offsetHeight || 0o40);
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
                this.applyPosition(el, parseInt(el.dataset.col || "0"), parseInt(el.dataset.row || "0"));
            }
        });
    }

    addIcon(appData: AppData, index: number): HTMLElement {
        if ( !this.container ) return {} as any;

        const el = document.createElement("div");
        el.className = "app-tile";
        el.dataset.app = appData.app;
        el.dataset.colSpan = "1";
        el.dataset.rowSpan = "1";
        
        let isDragging = false;

        // Create cepufal wrapper (like recents-card)
        const cepufalEl = document.createElement("div");
        cepufalEl.className = "cepufal";
        cepufalEl.style.padding = "0";

        // Create button area
        const buttonEl = document.createElement("button");
        buttonEl.style.blockSize = "100%";
        buttonEl.style.inlineSize = "100%";
        buttonEl.onclick = ( e: MouseEvent ) => {
            e.stopPropagation();
            // Open app if not in edit mode, not resizing, and not dragging
            if ( !this.editMode && !el.classList.contains("resizing" ) && !isDragging) {
                const wm = (window as any).WindowManager || getWindowManager();
                if ( wm && wm.loadAppFromPath ) {
                    wm.loadAppFromPath(appData.app, appData.name);
                } else {
                    console.error("WindowManager not available");
                }
            }
            isDragging = false;
        };
        buttonEl.oncontextmenu = ( e: MouseEvent ) => {
            e.stopPropagation();
            e.preventDefault();
            if ( (window as any).ContextMenuManager ) {
                (window as any).ContextMenuManager.showForTile(e.clientX, e.clientY, el);
            }
        };

        // Add label based on mode
        if ( this.labelMode === "inside" ) {
            // Internal mode: label inside button area
            const labelSpan = document.createElement("span");
            labelSpan.className = "label inside";
            labelSpan.innerText = appData.name;
            buttonEl.appendChild(labelSpan);
        } else if ( this.labelMode !== "hidden" && this.labelMode !== "off" ) {
            // External mode: create title bar (ksaka - like recents-card)
            const labelContainer = document.createElement("ksaka");
            labelContainer.className = "title-bar";
            const textSpan = document.createElement("p");
            textSpan.className = "title-bar-title";
            textSpan.innerText = appData.name;
            labelContainer.appendChild(textSpan);
            cepufalEl.appendChild(labelContainer);
        }

        const iconSpan = document.createElement("span");
        iconSpan.className = "icon";
        iconSpan.innerText = appData.icon;
        buttonEl.appendChild(iconSpan);

        cepufalEl.appendChild(buttonEl);
        el.appendChild(cepufalEl);

        const handle = document.createElement("div");
        handle.className = "resize-handle";
        const onResizeStart = (e: any) => {
            e.stopPropagation();
            e.preventDefault();
            const pos = InputHandler.getPointerPos(e);
            setupTileResize(this, el, pos.x, pos.y);
        };
        handle.addEventListener("mousedown", onResizeStart);
        handle.addEventListener("touchstart", onResizeStart, { passive: false });

        el.appendChild(handle);

        if (this.container) this.container.appendChild(el);
        this.snapToGrid(el, index);
        this.updateAdaptiveOrientation(el);

        // Track resize state on the element itself
        (el as CustomHTMLElement)._isResizing = false;

        // Handle mousedown and touchstart for drag initiation
        const onPointerDown = ( e: any ) => {
            // Check if clicking directly on resize handle element
            const isResizeHandle = e.target === handle;
            const canDrag = this.editMode || ( this.containerId === "desktop" && !isResizeHandle );

            // Block drag if currently resizing or on resize handle
            if ( (el as CustomHTMLElement)._isResizing || isResizeHandle ) {
                return;
            }

            if ( canDrag ) {
                const pos = InputHandler.getPointerPos(e);
                setupTileDrag(this, el, pos.x, pos.y, () => {
                    isDragging = false;
                });
            }
        };

        el.addEventListener("mousedown", onPointerDown);
        el.addEventListener("touchstart", onPointerDown, { passive: true });

        return el;
    }

    snapToGrid(el: HTMLElement, index: number): void {
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
            const c = Math.floor(indexOnPage / this.rows);
            const r = ( this.rows - 1 ) - ( indexOnPage % this.rows );
            this.applyPosition(el, c, r);
            return;
        }

        // Start menu: use full index for scrolling layout
        const taskbar = typeof getTaskbar === "function" ? getTaskbar() : document.getElementById("taskbar");
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

        const cs = parseInt(el.dataset.colSpan || "1");
        const rs = parseInt(el.dataset.rowSpan || "1");

        // Fill vertically (bottom to top), then horizontally
        if ( isVerticalTaskbar ) {
            const itemsPerCol = this.rows;
            const colGroup = Math.floor(index / itemsPerCol);
            const c = colGroup * cs;
            const r = ( this.rows - rs ) - ( index % itemsPerCol );
            this.applyPosition(el, c, r);
        } else {
            const itemsPerCol = Math.floor(this.rows / rs);
            const c = Math.floor(index / itemsPerCol) * cs;
            const r = ( this.rows - rs ) - ( index % itemsPerCol ) * rs;
            this.applyPosition(el, c, r);
        }
    }

    applyPosition(el: HTMLElement, c: number, r: number, xOffset: number = 0): void {
        const { colSpan, rowSpan } = getElementSpans(el);

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

        const tiles = Array.from(this.container.querySelectorAll(".app-tile")) as HTMLElement[];
        if ( tiles.length === 0 ) return;

        let minC = this.cols;
        let maxC = 0;
        tiles.forEach(tile => {
            const c = parseInt(tile.dataset.col || "0");
            const cs = parseInt(tile.dataset.colSpan || "1") || 1;
            if ( c < minC ) minC = c;
            if ( c + cs > maxC ) maxC = c + cs;
        });

        const usedWidthCols = maxC - minC;
        const { width: containerW } = getContainerDimensions(this.fixedWidth, this.fixedHeight, this.container);
        const w = containerW / this.cols;
        const xOffset = ( containerW - ( usedWidthCols * w ) ) / 2 - ( minC * w );

        tiles.forEach(tile => {
            this.applyPosition(tile, parseInt(tile.dataset.col || "0"), parseInt(tile.dataset.row || "0"), xOffset);
        });
        
        if ( this.containerId === "start-menu-content" ) {
            this.container.style.minHeight = `${(this.rows / this.initialRows) * 100}%`;
            this.container.style.minWidth = `${(this.cols / this.initialCols) * 100}%`;
        }
    }

    isAreaOccupied(c: number, r: number, colSpan: number, rowSpan: number, excludeEl: HTMLElement | null): boolean {
        if (!this.container) return false;
        for ( const tile of Array.from(this.container.querySelectorAll(".app-tile")) as HTMLElement[] ) {
            if ( tile === excludeEl ) continue;

            // Use current position from dataset
            let tc = parseInt(tile.dataset.col || "0");
            let tr = parseInt(tile.dataset.row || "0");

            // For the excluded element, use its intended new position if provided
            if ( tile === excludeEl && tile.dataset._newCol !== undefined ) {
                tc = parseInt(tile.dataset._newCol);
                tr = parseInt(tile.dataset._newRow || "0");
            }

            const tcs = parseInt(tile.dataset.colSpan || "1") || 1;
            const trs = parseInt(tile.dataset.rowSpan || "1") || 1;

            if ( c < tc + tcs && c + colSpan > tc && r < tr + trs && r + rowSpan > tr ) {
                return true;
            }
        }
        return false;
    }

    snapAfterDrag(el: HTMLElement): void {
        const { width: containerW, height: containerH } = getContainerDimensions(this.fixedWidth, this.fixedHeight, this.container);
        const gap = CONSTANTS.DIM.GAP_SIZE;
        const cellW = (containerW - (this.cols - 1) * gap) / this.cols;
        const cellH = (containerH - (this.rows - 1) * gap) / this.rows;

        if (!this.container) return;
        const containerRect = this.container.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();

        const localX = (elRect.left - containerRect.left);
        const localY = (elRect.top - containerRect.top);

        let c = Math.round(localX / (cellW + gap));
        let r = Math.round(localY / (cellH + gap));

        const { colSpan, rowSpan } = getElementSpans(el);
        if (c < 0) c = 0;
        if (r < 0) r = 0;

        if (this.containerId !== "start-menu-content") {
            if (c + colSpan > this.cols) c = this.cols - colSpan;
            if (r + rowSpan > this.rows) r = this.rows - rowSpan;
        }

        // Set temporary new position for collision detection
        el.dataset._newCol = c.toString();
        el.dataset._newRow = r.toString();

        if (this.isAreaOccupied(c, r, colSpan, rowSpan, el)) {
            let spotFound = false;
            for (let radius = 1; radius < 0o40 && !spotFound; radius++) {
                for (let dc = -radius; dc <= radius && !spotFound; dc++) {
                    for (let dr = -radius; dr <= radius && !spotFound; dr++) {
                        const nc = c + dc;
                        const nr = r + dr;
                        if (nc >= 0 && nc + colSpan <= this.cols && nr >= 0 && nr + rowSpan <= this.rows) {
                            el.dataset._newCol = nc.toString();
                            el.dataset._newRow = nr.toString();
                            if (!this.isAreaOccupied(nc, nr, colSpan, rowSpan, el)) {
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

        this.applyPosition(el, c, r);
        this.updateAdaptiveOrientation(el);

        // Save tile layout to storage
        if ( this.containerId === "desktop" ) (window as any).DesktopIconManager?._saveDesktopLayout();
    }

    toggleEdit(): void {
        this.editMode = !this.editMode;
        if (this.container) this.container.classList.toggle("edit-mode");
        document.body.classList.toggle("edit-mode", this.editMode);
    }

    refresh(): void {
        if (!this.container) return;
        const tiles = Array.from(this.container.querySelectorAll(".app-tile")) as HTMLElement[];
        tiles.forEach((tile, index) => {
            const c = parseInt(tile.dataset.col || "");
            const r = parseInt(tile.dataset.row || "");
            const page = parseInt(tile.dataset.page || "0") || 0;
            
            // Update pagination visibility (mobile desktop only)
            if ( this.isMobile && this.containerId === "desktop" ) {
                tile.style.display = page === this.currentPage ? "" : "none";
            }

            if (!isNaN(c) && !isNaN(r)) this.applyPosition(tile, c, r);
            else this.snapToGrid(tile, index);
        });
    }
}

// ⟪ Context Menu Manager ⟫

(window as any).ContextMenuManager = {
    menu: null as HTMLElement | null,
    desktop: null as HTMLElement | null,
    menuOpen: false,

    init() {
        this.menu = document.getElementById("context-menu");
        this.desktop = document.getElementById("desktop");
        if (!this.menu || !this.desktop) return;

        this.desktop.addEventListener("contextmenu", (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest(".app-tile")) return;
            e.preventDefault();
            e.stopPropagation();
            this.menuOpen = true;
            this.showForDesktop(e.clientX, e.clientY);
        });

        // Hide menu on click outside (same pattern as PanelManager)
        document.addEventListener("mousedown", (e: MouseEvent) => {
            if (!this.menuOpen) return;
            const selectors: string[] = ["#context-menu"];
            if (!selectors.some(sel => (e.target as HTMLElement).closest(sel))) {
                this.hide();
            }
        });

        // Hide menu on right click outside (to show new context menu)
        document.addEventListener("contextmenu", (e: MouseEvent) => {
            if (!this.menuOpen) return;
            const inMenu = (e.target as HTMLElement).closest("#context-menu");
            if (!inMenu) {
                this.hide();
            }
        });
    },

    showForDesktop(x: number, y: number) {
        this.currentTile = null;
        this._renderMenu([
            { action: "edit-mode", label: "Edit Mode", icon: "✏️", i18n: "ctx_edit_mode" }
        ], [
            { action: "refresh", label: "Refresh", icon: "🔄", i18n: "ctx_refresh" },
            { action: "new-note", label: "New Note", icon: "📝", i18n: "ctx_new_note" },
            { action: "terminal", label: "Terminal", icon: "💻", i18n: "ctx_terminal" }
        ], x, y);
    },

    showForTile(x: number, y: number, tileEl: HTMLElement) {
        this.currentTile = tileEl;

        // Build move page actions for mobile
        const movePageActions = [];
        const maxPage = Math.ceil( APPS.length / ( MOBILE_GRID_ROWS * MOBILE_GRID_COLS ) ) - 1;

        if ( maxPage > 0 ) {
            for ( let i = 0; i <= maxPage; i++ ) {
                movePageActions.push({
                    action: `move-page-${i}`,
                    label: `Page ${i + 1}`,
                    icon: `${i + 1}`,
                    i18n: "ctx_move_page"
                });
            }
        }

        this._renderMenu([
            { action: "edit-mode", label: "Edit Mode", icon: "✏️", i18n: "ctx_edit_mode" }
        ], [
            ...movePageActions,
            { action: "toggle-widget", label: "Widget Mode", icon: "🖼️", i18n: "ctx_widget_mode" },
            { action: "toggle-live-tile", label: "Live Tile Mode", icon: "✨", i18n: "ctx_live_tile_mode" }
        ], x, y);
    },

    _renderMenu(primaryActions: any[], secondaryActions: any[], x: number, y: number) {
        const allActions = [...primaryActions, ...secondaryActions];
        const strings = typeof getStrings === "function" ? getStrings() : {};
        const renderButton = (btn: any) => {
            const attrs = [`data-action="${btn.action}"`];
            let label = btn.label || "";
            if (btn.i18n && strings[btn.i18n]) {
                label = strings[btn.i18n];
                // Handle placeholder substitution for ctx_move_page
                if (btn.i18n === "ctx_move_page" && btn.label) {
                    const pageNum = btn.label.replace("Page ", "");
                    label = label.replace("{ɿ}", pageNum);
                }
            }
            if (btn.i18n) attrs.push(`data-oskakefani="${btn.i18n}"`);
            return `<button ${attrs.join(" ")} title="${label}">${label ? `<span>${label}</span>` : ""}<span>${btn.icon}</span></button>`;
        };

        if (this.menu) {
            this.menu.innerHTML = allActions.map(renderButton).join("");
            this._bindMenuEvents();
            this.show(x, y);
        }
    },

    _bindMenuEvents() {
        if (this.menu) {
            this.menu.querySelectorAll("button").forEach((item: any) => {
                (item as HTMLElement).onclick = (e: MouseEvent) => {
                    this.handleAction((e.currentTarget as HTMLElement).dataset.action);
                    this.hide();
                };
            });
        }
    },

    show(x: number, y: number) {
        if (this.menu) {
            this.menu.style.left = x + "px";
            this.menu.style.top = y + "px";
            this.menu.classList.add("visible");

            const rect = this.menu.getBoundingClientRect();
            if (rect.right > window.innerWidth) this.menu.style.left = (window.innerWidth - rect.width) + "px";
            if (rect.bottom > window.innerHeight) this.menu.style.top = (window.innerHeight - rect.height) + "px";

            if ((window as any).AnimationManager) {
                (window as any).AnimationManager.popupIn(this.menu, {
                    duration: CONSTANTS.ANIM_SETTINGS.popup.duration,
                    easing: CONSTANTS.ANIM_SETTINGS.popup.easing
                });
            }
        }
    },

    hide() {
        if (this.menu) {
            const anim = (window as any).AnimationManager;
            if (anim) {
                anim.popupOut(this.menu, {
                    duration: CONSTANTS.ANIM_SETTINGS.popup.duration,
                    easing: CONSTANTS.ANIM_SETTINGS.popup.easing
                }).then(() => {
                    this.menu.classList.remove("visible");
                });
            } else {
                this.menu.classList.remove("visible");
            }
        }
        this.menuOpen = false;
    },

    handleAction(action: string | undefined) {
        if (!action) return;
        const wm = getWindowManager();
        
        // Handle move page actions for mobile
        if ( action.startsWith("move-page-") ) {
            const targetPage = parseInt( action.replace("move-page-", "") );
            if ( this.currentTile && (window as any).DesktopIconManager?.desktop ) {
                (window as any).DesktopIconManager.moveTileToPage( this.currentTile, targetPage );
            }
            return;
        }
        
        switch (action) {
            case "refresh": location.reload(); break;
            case "toggle-widget":
            case "toggle-live-tile":
                if (this.currentTile) {
                    this.currentTile.classList.toggle("widget-mode", action === "toggle-widget");
                    this.currentTile.classList.toggle("live-tile-mode", action === "toggle-live-tile");
                }
                break;
            case "edit-mode": (window as any).DesktopIconManager?.desktop?.toggleEdit(); break;
            case "new-note": wm?.loadAppFromPath("ſɟᴜ ſɭɹ/ſɟᴜ ſᶘᴜ j͐ʃɹ.html", "Notes"); break;
            case "terminal": wm?.loadAppFromPath("ſɟᴜ ſɭɹ/ſןɔ ſɭʞꞇ.html", "Terminal"); break;
        }
    }
};

// ⟪ Desktop Icon Manager ⟫

(window as any).DesktopIconManager = {
    _relayoutAll() { [this.desktop, this.startMenu].forEach(grid => grid?.relayout()); },

    _snapAllGrids() {
        [this.desktop, this.startMenu].forEach(grid => {
            if (grid?.container) grid.container.querySelectorAll(".app-tile").forEach((t: any) => grid.snapAfterDrag(t as HTMLElement));
        });
    },

    _handleResize() {
        [this.desktop, this.startMenu].forEach(grid => {
            if (grid?.container) grid.relayout();
        });
    },

    _saveDesktopLayout() {
        if ( StorageUtil && this.desktop?.container ) {
            const tiles = Array.from(this.desktop.container.querySelectorAll(".app-tile")) as HTMLElement[];
            StorageUtil.saveTileLayout(tiles, "desktopTileLayout");
        }
    },

    // Move tile to a specific page (mobile only)
    moveTileToPage(tile: HTMLElement, targetPage: number) {
        if ( !tile || !this.desktop ) return;

        const appPath = tile.dataset.app;
        const appIndex = APPS.findIndex( (app: any) => app.app === appPath );
        
        if ( appIndex === -1 ) return;
        
        // Remove tile from current position
        tile.remove();
        
        // Re-add at new page position
        const itemsPerPage = MOBILE_GRID_ROWS * MOBILE_GRID_COLS;
        const newIndex = ( targetPage * itemsPerPage ) + ( appIndex % itemsPerPage );
        
        const newEl = this.desktop.addIcon( APPS[appIndex], newIndex );
        this.desktop.snapToGrid( newEl, newIndex );
        
        // Update page indicators
        this._updatePageIndicators();
        
        // Refresh to show tile on new page
        this.desktop.currentPage = targetPage;
        this.desktop.refresh();
    },

    transferIconFromStartMenu(el: HTMLElement) {
        const appData = {
            name: el.dataset.app?.split("/").pop()?.replace(".html", "") || "App",
            icon: (el.querySelector(".icon") as HTMLElement)?.innerText || "🖥️",
            app: el.dataset.app || ""
        };
        const newEl = this.desktop.addIcon(appData, 0);
        this.desktop.snapToGrid(newEl, 0);
        if (el.parentElement) el.remove();
        this.startMenu.container.querySelectorAll(".app-tile").forEach((tile: any, idx: number) => {
            const tileEl = tile as HTMLElement;
            if (tileEl.dataset.app === appData.app) tileEl.remove();
            else this.startMenu.snapToGrid(tileEl, idx);
        });
        this._relayoutAll();
        this._saveDesktopLayout();
    },

    async init() {
        // IconGrid auto-detects mobile vs desktop now
        this.desktop = new IconGrid("desktop", { centered: false, bottomUp: true, labelMode: 'external' });
        this.startMenu = new IconGrid("start-menu-content", { centered: false, bottomUp: true, labelMode: 'external' });

        (APPS as any) = APPS_DATA.map((app: any) => ({
            name: app.path.split("/").pop().replace(".html", ""),
            icon: app.emoji,
            app: app.path
        }));

        APPS.forEach((app: any, i: number) => {
            this.desktop?.addIcon(app, i);
            this.startMenu?.addIcon(app, i);
        });

        // Apply saved tile layout from storage
        if ( StorageUtil && this.desktop?.container ) {
            const tiles = Array.from(this.desktop.container.querySelectorAll(".app-tile")) as HTMLElement[];
            const desktop = this.desktop;
            StorageUtil.applyTileLayout(tiles, "desktopTileLayout", (tile: HTMLElement, col: number, row: number) => {
                desktop.applyPosition(tile, col, row);
            });
        }

        this._initQuickSettings();
        this._relayoutAll();
        this._createPageIndicators();
        setTimeout(() => this.desktop?.relayout(), 0o140);

        window.addEventListener("resize", throttle(() => {
            this._handleResize();
            setTimeout(() => this._snapAllGrids(), 0o200);
        }, 0o312));

        QSManager.init();
        NotificationManager.init();
    },

    _createPageIndicators() {
        // Remove existing indicators
        const existing = document.querySelector(".page-indicators");
        if (existing) existing.remove();

        // Create page indicators for mobile
        const itemsPerPage = MOBILE_GRID_ROWS * MOBILE_GRID_COLS;
        const totalPages = Math.ceil(APPS.length / itemsPerPage);
        
        if (totalPages <= 1) return;

        const container = document.createElement("div");
        container.className = "page-indicators";
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement("div");
            dot.className = "page-indicator" + (i === 0 ? " active" : "");
            dot.onclick = () => {
                if (this.desktop) {
                    this.desktop.currentPage = i;
                    this.desktop.refresh();
                    this._updatePageIndicators();
                }
            };
            container.appendChild(dot);
        }
        
        document.body.appendChild(container);
    },

    _updatePageIndicators() {
        const container = document.querySelector(".page-indicators");
        if (!container || !this.desktop) return;
        
        const dots = container.querySelectorAll(".page-indicator");
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === this.desktop.currentPage);
        });
    },

    _initQuickSettings() {
        const qsContainer = document.getElementById("quick-settings-container");
        const qsGrid = document.getElementById("quick-settings-buttons");
        const slidersContainer = document.getElementById("quick-settings-sliders");
        const editActions = document.getElementById("qs-edit-actions");

        if (!qsContainer || !qsGrid || !slidersContainer || !editActions) return;

        const storage = (window as any).StorageUtil;
        const savedToggleOrder = storage.get("xeku1okek-order", null);
        const savedSliderOrder = storage.get("qs-slider-order", null);
        const savedContainerOrder = storage.get("qs-container-order", ["quick-settings-sliders", "quick-settings-buttons"]);

        const currentContainers: { [key: string]: HTMLElement | null } = { "quick-settings-buttons": qsGrid, "quick-settings-sliders": slidersContainer };
        savedContainerOrder.forEach((id: string) => {
            const el = currentContainers[id];
            if (el) qsContainer.appendChild(el);
        });
        qsContainer.appendChild(editActions);

        let toggles = [...QS_TOGGLES];
        if (savedToggleOrder) {
            toggles = savedToggleOrder.map((id: string) => QS_TOGGLES.find((t: any) => t.id === id)).filter(Boolean);
            QS_TOGGLES.forEach((t: any) => { if (!savedToggleOrder.includes(t.id)) toggles.push(t); });
        }
        qsGrid.innerHTML = toggles.map( (t: any) => `
            <div class="xeku1okek" data-qs-id="${t.id}" onclick="window.DesktopIconManager._handleQSClick( event , this , 'xeku1okek-order' )">
                <button class="caku1o" data-setting="${t.id}" aria-pressed="${t.default}" onclick="if ( window.toggleQsButton ) toggleQsButton( this )">
                    <span class="icon">${t.icon}</span>
                    <span class="label" data-oskakefani="${t.string}">${t.label}</span>
                </button>
                <button class="qs-remove-btn" onclick="event.stopPropagation(); window.DesktopIconManager._removeQSItem( event , 'xeku1okek-order' , '${t.id}' )">/</button>
            </div>
        `).join( "" );

        const defaultSliders = [
            { id: "volume", label: "Volume", icon: "🔊", string: "qs_volume", max: 0o100, value: 0o40, handler: "volume" },
            { id: "brightness", label: "Brightness", icon: "🔆", string: "qs_brightness", max: 0o100, value: 0o60, handler: "brightness" }
        ];
        let sliders = [ ...defaultSliders ];
        if ( savedSliderOrder ) {
            sliders = savedSliderOrder.map( (id: string) => defaultSliders.find( (s: any) => s.id === id ) ).filter( Boolean as any );
            defaultSliders.forEach( (s: any) => { if ( !savedSliderOrder.includes( s.id ) ) sliders.push( s ); } );
        }
        slidersContainer.innerHTML = sliders.map( (s: any) => `
            <div class="xeku1okek" data-qs-id="${s.id}" onclick="window.DesktopIconManager._handleQSClick( event , this , 'qs-slider-order' )">
                <ciihii class="">
                    <span class="label" data-oskakefani="${s.string}">${s.label}</span>
                    <span class="icon">${s.icon}</span>
                    <input type="range" class="k6tani" min="0" max="${s.max}" value="${s.value}" oninput="if ( window.updateSlider ) updateSlider( '${s.handler}' , this.value )">
                </ciihii>
                <button class="qs-remove-btn" onclick="event.stopPropagation(); window.DesktopIconManager._removeQSItem( event , 'qs-slider-order' , '${s.id}' )">/</button>
            </div>
        `).join( "" );

        if (!editActions.querySelector(".qs-edit-btn")) {
            const editBtn = document.createElement("button");
            editBtn.className = "qs-edit-btn n2tase";
            editBtn.innerHTML = "✏️";
            editBtn.onclick = () => {
                const isEditing = qsContainer.classList.toggle("qs-editing");
                editBtn.innerHTML = isEditing ? "✅" : "✏️";
            };
            editBtn.oncontextmenu = (e: MouseEvent) => {
                e.preventDefault();
                if (!qsContainer.classList.contains("qs-editing")) return;
                const curT = Array.from(qsGrid.querySelectorAll("[data-qs-id]")).map((el: any) => (el as HTMLElement).dataset.qsId);
                const curS = Array.from(slidersContainer.querySelectorAll("[data-qs-id]")).map((el: any) => (el as HTMLElement).dataset.qsId);
                const remT = QS_TOGGLES.filter((t: any) => !curT.includes(t.id));
                const remS = defaultSliders.filter((s: any) => !curS.includes(s.id));
                if (remT.length === 0 && remS.length === 0) return;
                if ((window as any).ContextMenuManager) {
                    const addA = [...remT.map((t: any) => ({ action: `add-qs-${t.id}`, label: `+ ${t.label}`, icon: t.icon })), ...remS.map((s: any) => ({ action: `add-qs-${s.id}`, label: `+ ${s.label}`, icon: "S" }))];
                    (window as any).ContextMenuManager._renderMenu([], addA, e.clientX, e.clientY);
                    const origH = (window as any).ContextMenuManager.handleAction;
                    (window as any).ContextMenuManager.handleAction = (act: string) => {
                        if (act.startsWith("add-qs-")) {
                            const id = act.replace("add-qs-", ""), isS = (id === "volume" || id === "brightness");
                            const storage = (window as any).StorageUtil;
                            const key = isS ? "qs-slider-order" : "xeku1okek-order", ord = storage.get(key, []);
                            ord.push(id); storage.set(key, ord); this._initQuickSettings();
                        } else origH.call((window as any).ContextMenuManager, act);
                        (window as any).ContextMenuManager.handleAction = origH;
                    };
                }
            };
            editActions.appendChild(editBtn);
        }

        [qsGrid, slidersContainer].forEach(c => this._setupQSDragReorder(c));
        this._setupQSContainerDrag(qsContainer);
        if ((window as any).QSManager) QSManager.restoreUI();
    },

    _handleQSClick( e: any , el: HTMLElement , storageKey: string ) {
        if ( document.getElementById( "quick-settings-container" )?.classList.contains( "qs-editing" ) ) {
            if ( e.target.tagName === "INPUT" ) return;
            e.preventDefault(); e.stopPropagation();
        } else if ( el.classList.contains( "xeku1okek" ) ) {
            if ( typeof toggleQsButton === "function" ) toggleQsButton( el );
        }
    },

    _removeQSItem( e: any , storageKey: string , id: string ) {
        const storage = (window as any).StorageUtil;
        const ord = storage.get( storageKey , [] ).filter( (itemId: string) => itemId !== id );
        storage.set( storageKey , ord ); this._initQuickSettings();
    },

    _setupQSContainerDrag( container: HTMLElement | null ) {
        if ( !container ) return;
        const storage = (window as any).StorageUtil;
        (container as any).onmousedown = ( e: MouseEvent ) => {
            if ( !container.classList.contains( "qs-editing" ) ) return;
            const target = (e.target as HTMLElement).closest( "#quick-settings-buttons, #quick-settings-sliders" ) as HTMLElement | null;
            if ( !target || (e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).closest( "[data-qs-id]" ) ) return;
            const move = ( ev: any, data: any ) => {
                const hover = document.elementFromPoint( data.x, data.y )?.closest( "#quick-settings-buttons, #quick-settings-sliders" ) as HTMLElement | null;
                if ( hover && hover !== target ) {
                    if ( Array.from( container.children ).indexOf( target ) < Array.from( container.children ).indexOf( hover ) ) hover.after( target );
                    else hover.before( target );
                    storage.set( "qs-container-order" , Array.from( container.children ).filter( c => c.id === "quick-settings-buttons" || c.id === "quick-settings-sliders" ).map( c => c.id ) );
                }
            };
            // Use unified input handler
            InputHandler.setupDrag( target, null, move, () => {} );
        };
    },

    _setupQSDragReorder( container: HTMLElement | null ) {
        if ( !container ) return;
        const storage = (window as any).StorageUtil;
        container.addEventListener( "mousedown" , ( e: MouseEvent ) => {
            const qsContainer = document.getElementById( "quick-settings-container" );
            if ( !qsContainer?.classList.contains( "qs-editing" ) ) return;
            const item = (e.target as HTMLElement).closest( "[data-qs-id]" ) as HTMLElement | null;
            if ( !item || !container.contains( item ) ) return;
            e.preventDefault(); item.classList.add( "qs-dragging" );
            const move = ( ev: any, data: any ) => {
                const drop = document.elementFromPoint( data.x, data.y )?.closest( "[data-qs-id]" ) as HTMLElement | null;
                if ( drop && drop !== item && container.contains( drop ) ) {
                    const all = Array.from( container.querySelectorAll( "[data-qs-id]" ) ) as HTMLElement[];
                    if ( all.indexOf( item ) < all.indexOf( drop ) ) drop.after( item ); else drop.before( item );
                }
            };
            const up = () => {
                item.classList.remove( "qs-dragging" );
                const key = ( container.id === "quick-settings-buttons" ) ? "xeku1okek-order" : "qs-slider-order";
                storage.set( key , Array.from( container.querySelectorAll( "[data-qs-id]" ) ).map( el => (el as HTMLElement).dataset.qsId ) );
            };
            // Use unified input handler
            InputHandler.setupDrag( item, null, move, up );
        } );
    },
};

// ⟪ Clock Manager ⟫

(window as any).ClockManager = {
    timeEl: null as HTMLElement | null,
    dateEl: null as HTMLElement | null,
    init() {
        this.timeEl = document.getElementById("full-clock-time");
        this.dateEl = document.getElementById("full-clock-date");
        this.update(); setInterval(() => this.update(), 0o2000);
    },
    update() {
        this.timeEl = this.timeEl || document.getElementById( "full-clock-time" );
        this.dateEl = this.dateEl || document.getElementById( "full-clock-date" );
        const now = new Date();
        if ( this.timeEl && typeof vab6caja === "function" && typeof castifeh2 === "function" ) {
            const time = castifeh2( now );
            this.timeEl.innerText = `${vab6caja( time.she )} . ${vab6caja( time.qe )} . ${vab6caja( time.he )}`;
        }
        if ( this.dateEl && typeof kf2Cax2lStafl2 === "function" ) this.dateEl.innerText = kf2Cax2lStafl2( now );
    }
};

// Attach APPS to window for global access
(window as any).APPS = APPS;
