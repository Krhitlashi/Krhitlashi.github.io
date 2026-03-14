// ≺⧼ Constants ⧽≻

let APPS = [];

// ⟪ Mobile Grid Dimensions ⟫
const MOBILE_GRID_ROWS = 0o6;  // 6 rows
const MOBILE_GRID_COLS = 0o4;  // 4 columns
const DESKTOP_GRID_ROWS = 0o10;
const DESKTOP_GRID_COLS = 0o20;

// ⟪ Icon Grid ⟫

class IconGrid {
    constructor(containerId, config = {}) {
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
        this.fixedWidth = config.width;
        this.fixedHeight = config.height;
        this.editMode = false;
        this.labelMode = config.labelMode || "external";
        this.currentPage = 0;
        this.totalPages = 1;
        this.touchStartY = 0;
        this.touchStartX = 0;

        if ( !this.container ) return;

        this.container.addEventListener("dblclick", (e) => {
            const isClickableBackground = this.containerId === "desktop" || this.containerId === "start-menu";
            if (isClickableBackground && e.target === this.container) {
                this.toggleEdit();
            }
        });

        // Touch events for swipe pagination
        this.container.addEventListener("touchstart", (e) => this.handleTouchStart(e), { passive: true });
        this.container.addEventListener("touchmove", (e) => this.handleTouchMove(e), { passive: false });
        this.container.addEventListener("touchend", (e) => this.handleTouchEnd(e), { passive: true });

        // Listen for screen size changes
        window.addEventListener("resize", () => this.handleScreenResize());

        this.init();
    }

    checkIsMobile() {
        return window.innerWidth < 768 || window.innerHeight < 768;
    }

    handleScreenResize() {
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

    handleTouchStart(e) {
        this.touchStartY = e.touches[0].clientY;
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchMove(e) {
        if ( this.containerId === "desktop" || this.containerId === "start-menu-content" ) {
            e.preventDefault();
        }
    }

    handleTouchEnd(e) {
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
                    if ( window.DesktopIconManager ) DesktopIconManager._updatePageIndicators();
                }
            } else {
                // Swipe up - next page
                const maxPage = Math.ceil( APPS.length / ( this.rows * this.cols ) ) - 1;
                if ( this.currentPage < maxPage ) {
                    this.currentPage++;
                    this.refresh();
                    if ( window.DesktopIconManager ) DesktopIconManager._updatePageIndicators();
                }
            }
        }
    }

    init() {
        // Don't modify container styles - let CSS handle positioning
        // Container should use CSS rules from ֭ſɭᴜ ı],ɔ.css
    }

    updateAdaptiveOrientation(el) {
        requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();
            if ( rect.width === 0 || rect.height === 0 ) return;

            const taskbar = typeof getTaskbar === "function" ? getTaskbar() : document.getElementById("taskbar");
            const taskbarPos = taskbar?.dataset.position || "left";

            let effectivePos = taskbarPos;
            const oldColSpan = parseInt(el.dataset.colSpan) || 1;
            const oldRowSpan = parseInt(el.dataset.rowSpan) || 1;
            let newColSpan = oldColSpan;
            let newRowSpan = oldRowSpan;
            
            // Measure actual pill thickness
            const titleBar = el.querySelector("ksaka");
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
                el.dataset.colSpan = newColSpan;
                el.dataset.rowSpan = newRowSpan;
                this.applyPosition(el, parseInt(el.dataset.col), parseInt(el.dataset.row));
            }
        });
    }

    addIcon(appData, index) {
        if ( !this.container ) return;

        const el = document.createElement("div");
        el.className = "app-tile";
        el.dataset.app = appData.app;
        el.dataset.colSpan = 1;
        el.dataset.rowSpan = 1;
        
        let isDragging = false;

        // Create cepufal wrapper (like recents-card)
        const cepufalEl = document.createElement("div");
        cepufalEl.className = "cepufal";
        cepufalEl.style.padding = "0";

        // Create title bar (ksaka - like recents-card)
        const labelContainer = document.createElement("ksaka");
        labelContainer.className = "title-bar";
        const textSpan = document.createElement("p");
        textSpan.className = "title-bar-title";
        textSpan.innerText = appData.name;
        labelContainer.appendChild(textSpan);
        
        // Hide pill if mode is hidden (off) or inside
        const isPillVisible = this.labelMode !== "hidden" && this.labelMode !== "inside" && this.labelMode !== "off";
        if ( isPillVisible ) {
            cepufalEl.appendChild(labelContainer);
        }

        // Create button area
        const buttonEl = document.createElement("button");
        buttonEl.onclick = ( e ) => {
            e.stopPropagation();
            if ( !this.editMode && !el.classList.contains("resizing" ) && !isDragging) {
                const wm = getWindowManager();
                if ( wm ) wm.loadAppFromPath(appData.app, appData.name);
            }
            isDragging = false;
        };
        buttonEl.oncontextmenu = ( e ) => {
            e.stopPropagation();
            e.preventDefault();
            if ( window.ContextMenuManager ) {
                window.ContextMenuManager.showForTile(e.clientX, e.clientY, el);
            }
        };

        const iconSpan = document.createElement("span");
        iconSpan.className = "icon";
        iconSpan.innerText = appData.icon;
        buttonEl.appendChild(iconSpan);

        // Add label based on mode
        if ( this.labelMode === "inside" ) {
            // Internal mode: label inside button area
            const labelSpan = document.createElement("span");
            labelSpan.className = "label inside";
            labelSpan.innerText = appData.name;
            buttonEl.appendChild(labelSpan);
        }

        cepufalEl.appendChild(buttonEl);
        el.appendChild(cepufalEl);

        const handle = document.createElement("div");
        handle.className = "resize-handle";
        handle.onmousedown = (e) => {
            e.stopPropagation();
            this.handleResize(e, el);
        };

        el.appendChild(handle);

        this.container.appendChild(el);
        this.snapToGrid(el, index);
        this.updateAdaptiveOrientation(el);

        // Track resize state on the element itself
        el._isResizing = false;

        // Handle mousedown in capture phase (before button consumes it)
        el.addEventListener("mousedown", ( e ) => {
            // Check if clicking directly on resize handle element
            const isResizeHandle = e.target === handle;
            const canDrag = this.editMode || ( this.containerId === "desktop" && !isResizeHandle );

            // Block drag if currently resizing or on resize handle
            if ( el._isResizing || isResizeHandle ) {
                return;
            }

            if ( canDrag ) {
                e.preventDefault();
                e.stopPropagation();
                
                const startX = e.clientX;
                const startY = e.clientY;

                const onInitialMove = ( moveEv ) => {
                    const dist = Math.sqrt(Math.pow(moveEv.clientX - startX, 2) + Math.pow(moveEv.clientY - startY, 2));
                    if ( dist > 0o10 ) {
                        document.removeEventListener("mousemove", onInitialMove);
                        document.removeEventListener("mouseup", onInitialUp);
                        isDragging = true;
                        this.handleDrag(e, el, () => {
                            setTimeout(() => { isDragging = false; }, 0o10 );
                        });
                    }
                };

                const onInitialUp = () => {
                    document.removeEventListener("mousemove", onInitialMove);
                    document.removeEventListener("mouseup", onInitialUp);
                    isDragging = false;
                };

                document.addEventListener("mousemove", onInitialMove);
                document.addEventListener("mouseup", onInitialUp);
            }
        }, { capture: true });

        return el;
    }

    snapToGrid(el, index) {
        if ( !this.container ) return;

        // Handle pagination for mobile desktop only
        const itemsPerPage = this.rows * this.cols;
        const pageIndex = itemsPerPage > 0 ? Math.floor( index / itemsPerPage ) : 0;
        const indexOnPage = itemsPerPage > 0 ? index % itemsPerPage : index;

        // Store page info on element
        el.dataset.page = pageIndex;

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
            el.dataset.colSpan = 2;
            el.dataset.rowSpan = 1;
        } else {
            el.dataset.colSpan = 1;
            el.dataset.rowSpan = 2;
        }

        const cs = parseInt(el.dataset.colSpan);
        const rs = parseInt(el.dataset.rowSpan);

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

    applyPosition(el, c, r, xOffset = 0) {
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

        const gap = 0o10;

        const widthCalc = `calc((${colSpan} / ${this.cols}) * (100% - ${(this.cols - 1) * gap}px) + ${(colSpan - 1) * gap}px)`;
        const heightCalc = `calc((${rowSpan} / ${this.rows}) * (100% - ${(this.rows - 1) * gap}px) + ${(rowSpan - 1) * gap}px)`;
        const leftCalc = `calc((${c} / ${this.cols}) * (100% - ${(this.cols - 1) * gap}px) + ${c * gap}px${xOffset ? ` + ${xOffset}px` : ""})`;
        const topCalc = `calc((${r} / ${this.rows}) * (100% - ${(this.rows - 1) * gap}px) + ${r * gap}px)`;

        el.style.width = widthCalc;
        el.style.height = heightCalc;
        el.style.left = leftCalc;
        el.style.top = topCalc;

        el.dataset.col = c;
        el.dataset.row = r;

        if ( canExpand ) {
            this.container.style.minHeight = `${(this.rows / this.initialRows) * 100}%`;
            this.container.style.width = "100%";
        }
    }

    relayout() {
        if ( !this.config.centered ) return;

        const tiles = Array.from(this.container.querySelectorAll(".app-tile"));
        if ( tiles.length === 0 ) return;

        let minC = this.cols;
        let maxC = 0;
        tiles.forEach(tile => {
            const c = parseInt(tile.dataset.col);
            const cs = parseInt(tile.dataset.colSpan) || 1;
            if ( c < minC ) minC = c;
            if ( c + cs > maxC ) maxC = c + cs;
        });

        const usedWidthCols = maxC - minC;
        const { width: containerW } = getContainerDimensions(this.fixedWidth, this.fixedHeight, this.container);
        const w = containerW / this.cols;
        const xOffset = ( containerW - ( usedWidthCols * w ) ) / 2 - ( minC * w );

        tiles.forEach(tile => {
            this.applyPosition(tile, parseInt(tile.dataset.col), parseInt(tile.dataset.row), xOffset);
        });
        
        if ( this.containerId === "start-menu-content" ) {
            this.container.style.minHeight = `${(this.rows / this.initialRows) * 100}%`;
            this.container.style.minWidth = `${(this.cols / this.initialCols) * 100}%`;
        }
    }

    isAreaOccupied(c, r, colSpan, rowSpan, excludeEl) {
        for ( const tile of this.container.querySelectorAll(".app-tile") ) {
            if ( tile === excludeEl ) continue;

            // Use current position from dataset
            let tc = parseInt(tile.dataset.col);
            let tr = parseInt(tile.dataset.row);

            // For the excluded element, use its intended new position if provided
            if ( tile === excludeEl && excludeEl.dataset._newCol !== undefined ) {
                tc = parseInt(excludeEl.dataset._newCol);
                tr = parseInt(excludeEl.dataset._newRow);
            }

            const tcs = parseInt(tile.dataset.colSpan) || 1;
            const trs = parseInt(tile.dataset.rowSpan) || 1;

            if ( c < tc + tcs && c + colSpan > tc && r < tr + trs && r + rowSpan > tr ) {
                return true;
            }
        }
        return false;
    }

    handleDrag(e, el, onDragEnd) {
        if ( this.containerId !== "start-menu-content" && this.containerId !== "desktop" ) return;
        if ( !this.editMode && this.containerId === "start-menu-content" ) return;
        e.preventDefault();
        e.stopPropagation();

        const startX = e.clientX;
        const startY = e.clientY;
        const startLeft = el.offsetLeft;
        const startTop = el.offsetTop;

        let startMenuClosed = false;
        const startMenu = this.containerId === "start-menu-content" ? getStartMenu() : null;

        const originalParent = el.parentElement;
        const originalNextSibling = el.nextSibling;

        setElementDragging(el, true);
        el.style.zIndex = "10000";

        if ( this.containerId === "start-menu-content" ) {
            document.body.appendChild(el);
            el.style.position = "fixed";
            el.style.left = e.clientX - el.offsetWidth / 2 + "px";
            el.style.top = e.clientY - el.offsetHeight / 2 + "px";
        }

        const move = (ev) => {
            if ( !startMenuClosed && startMenu && this.containerId === "start-menu-content" ) {
                const dragDistance = Math.abs(ev.clientX - startX) + Math.abs(ev.clientY - startY);
                if ( dragDistance > 0o10 ) {
                    startMenu.classList.remove("open");
                    document.body.classList.remove("start-menu-open");
                    if (typeof closeAllPanels === "function") closeAllPanels();
                    startMenuClosed = true;
                }
            }

            if (el.style.position === "fixed") {
                el.style.left = ev.clientX - el.offsetWidth / 2 + "px";
                el.style.top = ev.clientY - el.offsetHeight / 2 + "px";
            } else {
                const { width: containerW, height: containerH } = getContainerDimensions(this.fixedWidth, this.fixedHeight, this.container);
                const gap = 0o10;
                const cellW = (containerW - (this.cols - 1) * gap) / this.cols;
                const cellH = (containerH - (this.rows - 1) * gap) / this.rows;

                const rawLeft = (startLeft + (ev.clientX - startX));
                const rawTop = (startTop + (ev.clientY - startY));

                const snapX = Math.round(rawLeft / (cellW + gap)) * (cellW + gap);
                const snapY = Math.round(rawTop / (cellH + gap)) * (cellH + gap);
                
                el.style.left = snapX + "px";
                el.style.top = snapY + "px";
            }
        };

        const up = () => {
            setElementDragging(el, false);
            el.style.zIndex = ""; 

            if (this.containerId === "start-menu-content" && window.DesktopIconManager?.desktop) {
                const desktop = window.DesktopIconManager.desktop.container;
                const desktopRect = desktop.getBoundingClientRect();
                const elRect = el.getBoundingClientRect();
                const elCenterX = elRect.left + elRect.width / 2;
                const elCenterY = elRect.top + elRect.height / 2;

                if (isWithinBounds(elCenterX, elCenterY, desktopRect)) {
                    el.style.position = "";
                    if (onDragEnd) onDragEnd();
                    this.transferIconFromStartMenu(el);
                    return;
                }
            }

            if (this.containerId === "start-menu-content" && originalParent) {
                el.style.position = "";
                if (onDragEnd) onDragEnd();
                if (originalNextSibling) originalParent.insertBefore(el, originalNextSibling);
                else originalParent.appendChild(el);
                this.snapAfterDrag(el);
            } else {
                if (onDragEnd) onDragEnd();
                this.snapAfterDrag(el);
            }
        };

        setupDragHandlers(move, up);
    }

    handleResize(e, el) {
        if ( !this.editMode ) return;
        e.preventDefault();
        e.stopPropagation();

        // Set resizing flag to block drag during resize
        el._isResizing = true;

        const startX = e.clientX;
        const startY = e.clientY;
        const startW = el.offsetWidth;
        const startH = el.offsetHeight;

        const { width: containerW, height: containerH } = getContainerDimensions(this.fixedWidth, this.fixedHeight, this.container);
        const gap = 0o10;
        const cellW = (containerW - (this.cols - 1) * gap) / this.cols;
        const cellH = (containerH - (this.rows - 1) * gap) / this.rows;

        el.classList.add("resizing");

        const move = (ev) => {
            const dx = ev.clientX - startX;
            const dy = ev.clientY - startY;

            let colSpan = Math.round((startW + dx) / cellW);
            let rowSpan = Math.round((startH + dy) / cellH);

            if (colSpan < 1) colSpan = 1;
            if (rowSpan < 1) rowSpan = 1;

            if (this.isAreaOccupied(parseInt(el.dataset.col), parseInt(el.dataset.row), colSpan, rowSpan, el)) return;

            el.style.width = `${cellW * colSpan + (colSpan - 1) * gap}px`;
            el.style.height = `${cellH * rowSpan + (rowSpan - 1) * gap}px`;

            el.dataset.pendingColSpan = colSpan;
            el.dataset.pendingRowSpan = rowSpan;
        };

        const up = () => {
            el.classList.remove("resizing");
            el.classList.remove("dragging");
            el._isResizing = false;

            if (el.dataset.pendingColSpan) {
                const newColSpan = parseInt(el.dataset.pendingColSpan);
                const newRowSpan = parseInt(el.dataset.pendingRowSpan);
                if (!this.isAreaOccupied(parseInt(el.dataset.col), parseInt(el.dataset.row), newColSpan, newRowSpan, el)) {
                    el.dataset.colSpan = newColSpan;
                    el.dataset.rowSpan = newRowSpan;
                }
                delete el.dataset.pendingColSpan;
                delete el.dataset.pendingRowSpan;
            }

            // Force reflow to ensure styles are applied
            void el.offsetWidth;

            this.applyPosition(el, parseInt(el.dataset.col), parseInt(el.dataset.row));
            this.updateAdaptiveOrientation(el);
        };

        // Use direct event listeners for proper cleanup
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", function onResizeUp() {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", onResizeUp);
            up();
        });
    }

    snapAfterDrag(el) {
        const { width: containerW, height: containerH } = getContainerDimensions(this.fixedWidth, this.fixedHeight, this.container);
        const gap = 0o10;
        const cellW = (containerW - (this.cols - 1) * gap) / this.cols;
        const cellH = (containerH - (this.rows - 1) * gap) / this.rows;

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
        el.dataset._newCol = c;
        el.dataset._newRow = r;

        if (this.isAreaOccupied(c, r, colSpan, rowSpan, el)) {
            let spotFound = false;
            for (let radius = 1; radius < 0o40 && !spotFound; radius++) {
                for (let dc = -radius; dc <= radius && !spotFound; dc++) {
                    for (let dr = -radius; dr <= radius && !spotFound; dr++) {
                        const nc = c + dc;
                        const nr = r + dr;
                        if (nc >= 0 && nc + colSpan <= this.cols && nr >= 0 && nr + rowSpan <= this.rows) {
                            el.dataset._newCol = nc;
                            el.dataset._newRow = nr;
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
    }

    toggleEdit() {
        this.editMode = !this.editMode;
        this.container.classList.toggle("edit-mode");
        document.body.classList.toggle("edit-mode", this.editMode);
    }

    refresh() {
        if (!this.container) return;
        const tiles = Array.from(this.container.querySelectorAll(".app-tile"));
        tiles.forEach((tile, index) => {
            const c = parseInt(tile.dataset.col);
            const r = parseInt(tile.dataset.row);
            const page = parseInt(tile.dataset.page) || 0;
            
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

window.ContextMenuManager = {
    init() {
        this.menu = document.getElementById("context-menu");
        this.desktop = document.getElementById("desktop");
        if (!this.menu || !this.desktop) return;

        this.desktop.addEventListener("contextmenu", (e) => {
            if (e.target.closest(".app-tile")) return;
            e.preventDefault();
            this.showForDesktop(e.clientX, e.clientY);
        });

        document.addEventListener("click", () => this.hide());
    },

    showForDesktop(x, y) {
        this.currentTile = null;
        this._renderMenu([
            { action: "edit-mode", label: "Edit Mode", icon: "✏️", i18n: "ctx_edit_mode" }
        ], [
            { action: "refresh", icon: "🔄", title: "Refresh", i18n: "ctx_refresh" },
            { action: "new-note", icon: "📝", title: "New Note", i18n: "ctx_new_note" },
            { action: "terminal", icon: "💻", title: "Terminal", i18n: "ctx_terminal" }
        ], x, y);
    },

    showForTile(x, y, tileEl) {
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
                    title: `Move to page ${i + 1}`
                });
            }
        }
        
        this._renderMenu([
            { action: "edit-mode", label: "Edit Mode", icon: "✏️", i18n: "ctx_edit_mode" }
        ], [
            ...movePageActions,
            { action: "toggle-widget", icon: "🖼️", title: "Widget Mode", i18n: "ctx_widget_mode" },
            { action: "toggle-live-tile", icon: "✨", title: "Live Tile Mode", i18n: "ctx_live_tile_mode" }
        ], x, y);
    },

    _renderMenu(primaryActions, secondaryActions, x, y) {
        const allActions = [...primaryActions, ...secondaryActions];
        const renderButton = (btn) => {
            const attrs = [`data-action="${btn.action}"`];
            if (btn.i18n) attrs.push(`data-oskakefani="${btn.i18n}"`);
            if (btn.title && !btn.i18n) attrs.push(`title="${btn.title}"`);
            return `<button ${attrs.join(" ")} ${btn.i18n ? `title="${btn.title}"` : ""}>${btn.label ? `<span>${btn.label}</span>` : ""}<span>${btn.icon}</span></button>`;
        };

        this.menu.innerHTML = allActions.map(renderButton).join("");
        this._bindMenuEvents();
        this.show(x, y);
    },

    _bindMenuEvents() {
        this.menu.querySelectorAll("button").forEach(item => {
            item.onclick = (e) => {
                this.handleAction(e.currentTarget.dataset.action);
                this.hide();
            };
        });
    },

    show(x, y) {
        this.menu.style.left = x + "px";
        this.menu.style.top = y + "px";
        this.menu.classList.add("visible");

        const rect = this.menu.getBoundingClientRect();
        if (rect.right > window.innerWidth) this.menu.style.left = (window.innerWidth - rect.width) + "px";
        if (rect.bottom > window.innerHeight) this.menu.style.top = (window.innerHeight - rect.height) + "px";

        if (window.AnimationManager) AnimationManager.popup(this.menu);
    },

    hide() { this.menu.classList.remove("visible"); },

    handleAction(action) {
        const wm = getWindowManager();
        
        // Handle move page actions for mobile
        if ( action.startsWith("move-page-") ) {
            const targetPage = parseInt( action.replace("move-page-", "") );
            if ( this.currentTile && window.DesktopIconManager?.desktop ) {
                window.DesktopIconManager.moveTileToPage( this.currentTile, targetPage );
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
            case "edit-mode": window.DesktopIconManager?.desktop?.toggleEdit(); break;
            case "new-note": wm?.loadAppFromPath("ſɟᴜ ſɭɹ/ſɟᴜ ſᶘᴜ j͐ʃɹ.html", "Notes"); break;
            case "terminal": wm?.loadAppFromPath("ſɟᴜ ſɭɹ/ſןɔ ſɭʞꞇ.html", "Terminal"); break;
        }
    }
};

// ⟪ Desktop Icon Manager ⟫

window.DesktopIconManager = {
    _relayoutAll() { [this.desktop, this.startMenu].forEach(grid => grid?.relayout()); },

    _snapAllGrids() {
        [this.desktop, this.startMenu].forEach(grid => {
            if (grid?.container) grid.container.querySelectorAll(".app-tile").forEach(t => grid.snapAfterDrag(t));
        });
    },

    _handleResize() {
        [this.desktop, this.startMenu].forEach(grid => {
            if (grid?.container) grid.relayout();
        });
    },

    // Move tile to a specific page (mobile only)
    moveTileToPage(tile, targetPage) {
        if ( !tile || !this.desktop ) return;
        
        const appPath = tile.dataset.app;
        const appIndex = APPS.findIndex( app => app.app === appPath );
        
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

    transferIconFromStartMenu(el) {
        const appData = {
            name: el.dataset.app?.split("/").pop().replace(".html", "") || "App",
            icon: el.querySelector(".icon")?.innerText || "🖥️",
            app: el.dataset.app
        };
        const newEl = this.desktop.addIcon(appData, 0);
        this.desktop.snapToGrid(newEl, 0);
        if (el.parentElement) el.remove();
        this.startMenu.container.querySelectorAll(".app-tile").forEach((tile, idx) => {
            if (tile.dataset.app === appData.app) tile.remove();
            else this.startMenu.snapToGrid(tile, idx);
        });
        this._relayoutAll();
    },

    async init() {
        // IconGrid auto-detects mobile vs desktop now
        this.desktop = new IconGrid("desktop", { centered: false, bottomUp: true, labelMode: 'external' });
        this.startMenu = new IconGrid("start-menu-content", { centered: false, bottomUp: true, labelMode: 'external' });

        APPS = APPS_DATA.map(app => ({
            name: app.path.split("/").pop().replace(".html", ""),
            icon: app.emoji,
            app: app.path
        }));

        APPS.forEach((app, i) => {
            this.desktop?.addIcon(app, i);
            this.startMenu?.addIcon(app, i);
        });

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

        const savedToggleOrder = Storage.get("xeku1okek-order", null);
        const savedSliderOrder = Storage.get("qs-slider-order", null);
        const savedContainerOrder = Storage.get("qs-container-order", ["quick-settings-sliders", "quick-settings-buttons"]);

        const currentContainers = { "quick-settings-buttons": qsGrid, "quick-settings-sliders": slidersContainer };
        savedContainerOrder.forEach(id => {
            const el = currentContainers[id];
            if (el) qsContainer.appendChild(el);
        });
        qsContainer.appendChild(editActions);

        let toggles = [...QS_TOGGLES];
        if (savedToggleOrder) {
            toggles = savedToggleOrder.map(id => QS_TOGGLES.find(t => t.id === id)).filter(Boolean);
            QS_TOGGLES.forEach(t => { if (!savedToggleOrder.includes(t.id)) toggles.push(t); });
        }
        qsGrid.innerHTML = toggles.map( t => `
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
            sliders = savedSliderOrder.map( id => defaultSliders.find( s => s.id === id ) ).filter( Boolean );
            defaultSliders.forEach( s => { if ( !savedSliderOrder.includes( s.id ) ) sliders.push( s ); } );
        }
        slidersContainer.innerHTML = sliders.map( s => `
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
            editBtn.oncontextmenu = (e) => {
                e.preventDefault();
                if (!qsContainer.classList.contains("qs-editing")) return;
                const curT = Array.from(qsGrid.querySelectorAll("[data-qs-id]")).map(el => el.dataset.qsId);
                const curS = Array.from(slidersContainer.querySelectorAll("[data-qs-id]")).map(el => el.dataset.qsId);
                const remT = QS_TOGGLES.filter(t => !curT.includes(t.id));
                const remS = defaultSliders.filter(s => !curS.includes(s.id));
                if (remT.length === 0 && remS.length === 0) return;
                if (window.ContextMenuManager) {
                    const addA = [...remT.map(t => ({ action: `add-qs-${t.id}`, label: `+ ${t.label}`, icon: t.icon })), ...remS.map(s => ({ action: `add-qs-${s.id}`, label: `+ ${s.label}`, icon: "S" }))];
                    window.ContextMenuManager._renderMenu([], addA, e.clientX, e.clientY);
                    const origH = window.ContextMenuManager.handleAction;
                    window.ContextMenuManager.handleAction = (act) => {
                        if (act.startsWith("add-qs-")) {
                            const id = act.replace("add-qs-", ""), isS = (id === "volume" || id === "brightness");
                            const key = isS ? "qs-slider-order" : "xeku1okek-order", ord = Storage.get(key, []);
                            ord.push(id); Storage.set(key, ord); this._initQuickSettings();
                        } else origH.call(window.ContextMenuManager, act);
                        window.ContextMenuManager.handleAction = origH;
                    };
                }
            };
            editActions.appendChild(editBtn);
        }

        [qsGrid, slidersContainer].forEach(c => this._setupQSDragReorder(c));
        this._setupQSContainerDrag(qsContainer);
        if (window.QSManager) QSManager.restoreUI();
    },

    _handleQSClick( e , el , storageKey ) {
        if ( document.getElementById( "quick-settings-container" )?.classList.contains( "qs-editing" ) ) {
            if ( e.target.tagName === "INPUT" ) return;
            e.preventDefault(); e.stopPropagation();
        } else if ( el.classList.contains( "xeku1okek" ) ) {
            if ( typeof toggleQsButton === "function" ) toggleQsButton( el );
        }
    },

    _removeQSItem( e , storageKey , id ) {
        const ord = Storage.get( storageKey , [] ).filter( itemId => itemId !== id );
        Storage.set( storageKey , ord ); this._initQuickSettings();
    },

    _setupQSContainerDrag( container ) {
        if ( !container ) return;
        container.onmousedown = ( e ) => {
            if ( !container.classList.contains( "qs-editing" ) ) return;
            const target = e.target.closest( "#quick-settings-buttons, #quick-settings-sliders" );
            if ( !target || e.target.tagName === "INPUT" || e.target.closest( "[data-qs-id]" ) ) return;
            const move = ( ev ) => {
                const hover = document.elementFromPoint( ev.clientX , ev.clientY )?.closest( "#quick-settings-buttons, #quick-settings-sliders" );
                if ( hover && hover !== target ) {
                    if ( Array.from( container.children ).indexOf( target ) < Array.from( container.children ).indexOf( hover ) ) hover.after( target );
                    else hover.before( target );
                    Storage.set( "qs-container-order" , Array.from( container.children ).filter( c => c.id === "quick-settings-buttons" || c.id === "quick-settings-sliders" ).map( c => c.id ) );
                }
            };
            const up = () => { document.removeEventListener( "mousemove" , move ); document.removeEventListener( "mouseup" , up ); };
            document.addEventListener( "mousemove" , move ); document.addEventListener( "mouseup" , up );
        };
    },

    _setupQSDragReorder( container ) {
        if ( !container ) return;
        container.addEventListener( "mousedown" , ( e ) => {
            if ( !document.getElementById( "quick-settings-container" )?.classList.contains( "qs-editing" ) ) return;
            const item = e.target.closest( "[data-qs-id]" );
            if ( !item || !container.contains( item ) ) return;
            e.preventDefault(); item.classList.add( "qs-dragging" );
            const move = ( ev ) => {
                const drop = document.elementFromPoint( ev.clientX , ev.clientY )?.closest( "[data-qs-id]" );
                if ( drop && drop !== item && container.contains( drop ) ) {
                    const all = Array.from( container.querySelectorAll( "[data-qs-id]" ) );
                    if ( all.indexOf( item ) < all.indexOf( drop ) ) drop.after( item ); else drop.before( item );
                }
            };
            const up = () => {
                item.classList.remove( "qs-dragging" );
                const key = ( container.id === "quick-settings-buttons" ) ? "xeku1okek-order" : "qs-slider-order";
                Storage.set( key , Array.from( container.querySelectorAll( "[data-qs-id]" ) ).map( el => el.dataset.qsId ) );
                document.removeEventListener( "mousemove" , move ); document.removeEventListener( "mouseup" , up );
            };
            document.addEventListener( "mousemove" , move ); document.addEventListener( "mouseup" , up );
        } );
    },
};

// ⟪ Clock Manager ⟫

window.ClockManager = {
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
