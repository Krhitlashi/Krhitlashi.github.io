// ≺⧼ WindowManager ⧽≻

/* eslint-disable @typescript-eslint/no-explicit-any */

declare const CONSTANTS: any;
declare const getWindowContainer: any;
declare const getWindowTitle: any;
declare const isTaskbarLarge: any;
declare const getHomeArea: any;
declare const getTaskbar: any;
declare const setDraggingState: any;
declare const InputHandler: any;
declare const AnimationManager: any;
declare const getStrings: any;
declare const vab6caja: any;
declare const APPS: any;
declare const updateDock: any;
declare const k2regawe: any;

class WindowManager {
    static zIndex: number = CONSTANTS.WM.BASE_Z_INDEX;
    static _themeWatcher: any = null;
    static _currentTheme: string = "detect";

    // ⟪ App URL Map ⟫ - Built from APPS_DATA ( path → path )

    static get APP_URLS(): { [ key: string ]: string } {
        if ( typeof CONSTANTS.APPS_DATA !== "undefined" ) {
            const map: { [ key: string ]: string } = {};
            CONSTANTS.APPS_DATA.forEach( ( app: any ) => {
                map[ app.path ] = app.path;
            } );
            return map;
        }
        return {};
    }

    // ⟪ Helper Functions ⟫

    static _randomWindowPosition( baseY: number ): { x: number; y: number } {
        return {
            x: ( Math.floor( Math.random() * CONSTANTS.WM.WINDOW_RANDOM_RANGE ) * CONSTANTS.WM.WINDOW_RANDOM_STEP ) + CONSTANTS.WM.WINDOW_BASE_X,
            y: ( Math.floor( Math.random() * CONSTANTS.WM.WINDOW_RANDOM_RANGE ) * CONSTANTS.WM.WINDOW_RANDOM_STEP ) + baseY
        };
    }

    static _createWindowElement( id: string, title: string, internalContent?: string ): HTMLElement {
        const win = document.createElement( "div" );
        win.classList.add( "window" );
        win.id = id;
        return win;
    }

    static _setupWindowInteractions( win: HTMLElement, id: string, title: string ): void {
        win.addEventListener( "mousedown", () => { win.style.zIndex = ( ++this.zIndex ).toString(); } );
        this.setAppActive( title, true );
    }

    static _injectStylesIntoIframe( iframeId: string ): void {
        const iframe = document.getElementById( iframeId ) as HTMLIFrameElement | null;
        if ( !iframe ) return;

        iframe.onload = (): void => {
            try {
                const doc = iframe.contentDocument || ( iframe.contentWindow as Window )?.document;
                if ( !doc?.head ) return;

                // Inject override styles
                if ( !doc.getElementById( "injected-style" ) ) {
                    const style = doc.createElement( "style" );
                    style.id = "injected-style";
                    style.textContent = `
                        h1, .saxesukef, .cakaxa, .soza, nav, footer, header { display: none !important; }
                        body { background-color: transparent !important; padding: var(--អារេងព៏) !important; }
                    `;
                    doc.head.appendChild( style );
                }

                // Link the global stylesheet for full design system
                if ( !doc.getElementById( "injected-global-css" ) ) {
                    const globalCss = document.querySelector( 'link[href*="֭ſɭᴜ ı],ɔ.css"]' ) as HTMLLinkElement | null;
                    if ( globalCss ) {
                        const link = doc.createElement( "link" );
                        link.id = "injected-global-css";
                        link.rel = "stylesheet";
                        link.href = globalCss.href;
                        doc.head.appendChild( link );
                    }
                }
            } catch ( e ) {
                // Cross-origin iframes will throw; silently ignore
            }
        };
    }

    static _buildTitleBar( id: string, title: string, simple: boolean = false ): string {
        if ( simple ) {
            return `
                <ksaka onmousedown="WindowManager.startDrag(event, '${id}')" ontouchstart="WindowManager.startDrag(event, '${id}')">
                    <button onclick="WindowManager.closeWindow('${id}')" title="Close">/</button>
                    <button onclick="WindowManager.toggleMaximize('${id}')" title="Maximize">O</button>
                    <button onclick="WindowManager.minimizeWindow('${id}')" title="Minimize">|</button>
                    <p class="title-bar-title">${title}</p>
                </ksaka>
            `;
        }
        return `
            <ksaka class="title-bar n2tase" onmousedown="WindowManager.startDrag(event, '${id}')" ontouchstart="WindowManager.startDrag(event, '${id}')">
                <div class="window-controls cakaxa">
                    <button class="control-btn" onclick="WindowManager.closeWindow('${id}')" title="Close">/</button>
                    <button class="control-btn" onclick="WindowManager.toggleMaximize('${id}')" title="Maximize">O</button>
                    <button class="control-btn" onclick="WindowManager.minimizeWindow('${id}')" title="Minimize">|</button>
                </div>
                <div class="title-bar-title">${title}</div>
            </ksaka>
        `;
    }

    static _buildIframeContent( iframeId: string, url: string ): string {
        return `<iframe id="${iframeId}" src="${url}" sandbox="allow-same-origin allow-scripts" style="inline-size:100%; block-size:100%;" class="n2tase"></iframe>`;
    }

    static _buildResizeHandles( id: string ): string {
        return `
            <div class="resize-handle resize-handle-n" onmousedown="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'n')" ontouchstart="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'n')"></div>
            <div class="resize-handle resize-handle-s" onmousedown="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 's')" ontouchstart="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 's')"></div>
            <div class="resize-handle resize-handle-e" onmousedown="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'e')" ontouchstart="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'e')"></div>
            <div class="resize-handle resize-handle-w" onmousedown="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'w')" ontouchstart="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'w')"></div>
            <div class="resize-handle resize-handle-ne" onmousedown="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'ne')" ontouchstart="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'ne')"></div>
            <div class="resize-handle resize-handle-nw" onmousedown="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'nw')" ontouchstart="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'nw')"></div>
            <div class="resize-handle resize-handle-se" onmousedown="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'se')" ontouchstart="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'se')"></div>
            <div class="resize-handle resize-handle-sw" onmousedown="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'sw')" ontouchstart="WindowManager.bringToFront('${id}'); WindowManager.startResize(event, '${id}', 'sw')"></div>
        `;
    }

    // ⟪ Bring Window To Front ⟫

    static bringToFront( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            win.style.zIndex = ( ++this.zIndex ).toString();
        }
    }

    // ⟪ Load App From Path ⟫

    static loadAppFromPath( path: string, title: string ): void {
        const container = getWindowContainer();

        // Check if app is already open
        const existingWin = Array.from( document.querySelectorAll( ".window" ) ).find( ( win: any ) => {
            const iframe = win.querySelector( "iframe" );
            return iframe && iframe.src.includes( path );
        } );
        
        
        if ( existingWin ) {
            // App is already open - focus it and refresh recents
            this.focusWindow( existingWin.id );
            this.renderRecents();
            return;
        }

        const id = "win-" + Date.now();
        const win = this._createWindowElement( id, title );
        const app = ( typeof CONSTANTS.APPS_DATA !== "undefined" ) ? CONSTANTS.APPS_DATA.find( ( a: any ) => a.path === path ) : null;
        win.dataset.emoji = app?.emoji || "🖥️";
        const { x, y } = this._randomWindowPosition( CONSTANTS.WM.WINDOW_BASE_Y_LOAD );
        win.style.left = x + "px";
        win.style.top = y + "px";
        win.style.zIndex = ( ++this.zIndex ).toString();

        const iframeId = "iframe-" + id;
        win.innerHTML = `
        <div class="cepufal" style="padding: 0; inline-size: 100%;">
            ${this._buildTitleBar( id, title, true )}
            ${this._buildIframeContent( iframeId, path )}
        </div>
        ` + this._buildResizeHandles( id );

        container.appendChild( win );
        this._setupWindowInteractions( win, id, title );
        this.updateTaskbarApps();
        this._injectStylesIntoIframe( iframeId );

        // Animate window opening with fractions
        AnimationManager.windowOpen( win, { ...CONSTANTS.ANIM_SETTINGS.windowOpen } );

        // Refresh recents to show new window
        this.renderRecents();
    }

    // ⟪ Create Window ⟫

    static createWindow( path: string, content: string = "" ): void {
        const id = "win-" + Date.now();
        const title = path.split( "/" ).pop()?.replace( ".html", "" ) || "App";
        const container = getWindowContainer();
        const win = this._createWindowElement( id, title );
        const app = ( typeof CONSTANTS.APPS_DATA !== "undefined" ) ? CONSTANTS.APPS_DATA.find( ( a: any ) => a.path === path ) : null;
        win.dataset.emoji = app?.emoji || "🖥️";
        const { x, y } = this._randomWindowPosition( CONSTANTS.WM.WINDOW_BASE_Y_CREATE );
        win.style.left = x + "px";
        win.style.top = y + "px";
        win.style.zIndex = ( ++this.zIndex ).toString();

        const appUrl = this.APP_URLS[ path ];
        const iframeId = "iframe-" + id;
        const internalContent = appUrl
            ? this._buildIframeContent( iframeId, appUrl )
            : ( content || `<div><p>${title}</p></div>` );

        win.innerHTML = this._buildTitleBar( id, title ) + internalContent +
            this._buildResizeHandles( id );

        this._setupWindowInteractions( win, id, title );
        container.appendChild( win );
        this.updateTaskbarApps();

        if ( appUrl ) {
            this._injectStylesIntoIframe( iframeId );
        }

        // Animate window opening with fractions
        AnimationManager.windowOpen( win, { ...CONSTANTS.ANIM_SETTINGS.windowOpen } );
    }

    // ⟪ Start Resize ⟫

    static startResize( e: MouseEvent | TouchEvent, id: string, handle: string ): void {
        e.stopPropagation();
        e.preventDefault();

        const win = document.getElementById( id );
        if ( !win || win.classList.contains( "maximized" ) || win.classList.contains( "fullscreen" ) ) return;

        // Set resizing flag
        ( win as any )._isResizing = true;
        setDraggingState( true );

        const rect = win.getBoundingClientRect();
        const startLeft = win.offsetLeft;
        const startTop = win.offsetTop;
        const startWidth = win.offsetWidth;
        const startHeight = win.offsetHeight;
        const startRight = startLeft + startWidth;
        const startBottom = startTop + startHeight;

        // Get pointer position using unified handler
        const pos = InputHandler.getPointerPos( e );
        const startX = pos.x;
        const startY = pos.y;

        // Calculate cursor offset from window edge ( handles extend outside window )
        const isWest = handle.includes( "w" );
        const isEast = handle.includes( "e" );
        const isNorth = handle.includes( "n" );
        const isSouth = handle.includes( "s" );
        const offsetX = isWest ? startX - rect.left : 0;
        const offsetY = isNorth ? startY - rect.top : 0;

        const doDrag = ( clientX: number, clientY: number ) => {
            const dx = clientX - startX;
            const dy = clientY - startY;

            // Calculate new position and size using direction flags
            let newLeft = startLeft;
            let newTop = startTop;
            let newRight = startRight;
            let newBottom = startBottom;

            if ( isWest ) newLeft = startLeft + dx + offsetX;
            else if ( isEast ) newRight = startRight + dx;

            if ( isNorth ) newTop = startTop + dy + offsetY;
            else if ( isSouth ) newBottom = startBottom + dy;

            // Calculate final position and size
            const finalWidth = Math.max( CONSTANTS.INPUT.RESIZE_MIN_WIDTH, newRight - newLeft );
            const finalHeight = Math.max( CONSTANTS.INPUT.RESIZE_MIN_HEIGHT, newBottom - newTop );

            win.style.left = newLeft + "px";
            win.style.top = newTop + "px";
            win.style.width = finalWidth + "px";
            win.style.height = finalHeight + "px";
        };

        // Create move handlers
        const onMove = ( ev: MouseEvent ) => {
            doDrag( ev.clientX, ev.clientY );
        };

        const onTouchMove = ( ev: TouchEvent ) => {
            ev.preventDefault();
            const touch = ev.touches[ 0 ] || ev.changedTouches[ 0 ];
            if ( touch ) doDrag( touch.clientX, touch.clientY );
        };

        const onEnd = () => {
            setDraggingState( false );
            ( win as any )._isResizing = false;
            // Remove event listeners
            document.removeEventListener( "mousemove", onMove );
            document.removeEventListener( "mouseup", onEnd );
            document.removeEventListener( "touchmove", onTouchMove, { passive: false } as any );
            document.removeEventListener( "touchend", onEnd );
            document.removeEventListener( "touchcancel", onEnd );
        };

        // Set up event listeners directly on document
        document.addEventListener( "mousemove", onMove );
        document.addEventListener( "mouseup", onEnd );
        document.addEventListener( "touchmove", onTouchMove, { passive: false } as any );
        document.addEventListener( "touchend", onEnd );
        document.addEventListener( "touchcancel", onEnd );
    }

    // ⟪ Close Window ⟫

    static closeWindow( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            const title = getWindowTitle( win );

            // Animate window closing with fractions
            AnimationManager.windowClose( win, { ...CONSTANTS.ANIM_SETTINGS.windowClose } ).then( () => {
                this.setAppActive( title, false );
                win.remove();
                this.updateTaskbarApps();
                this.renderRecents();
            } );

            return;
        }
    }

    // ⟪ Start Drag ⟫

    static startDrag( e: MouseEvent | TouchEvent, id: string ): void {
        e.preventDefault();

        const win = document.getElementById( id );
        if ( !win || ( win as any )._isResizing ) return;

        setDraggingState( true );
        const rect = win.getBoundingClientRect();

        // Get pointer position using unified handler
        const pos = InputHandler.getPointerPos( e );
        const clientX = pos.x;
        const clientY = pos.y;
        const shiftX = clientX - rect.left;
        const shiftY = clientY - rect.top;

        const doDrag = ( newX: number, newY: number ) => {
            win.style.left = ( newX - shiftX ) + "px";
            win.style.top = ( newY - shiftY ) + "px";
        };

        const stopDrag = () => {
            setDraggingState( false );
        };

        // Use unified input handler for both mouse and touch
        const onMove = ( ev: any, data: any ) => {
            doDrag( data.x, data.y );
        };

        const onEnd = () => {
            stopDrag();
        };

        InputHandler.setupDrag( win, null, onMove, onEnd );
    }

    // ⟪ Toggle Maximize ⟫

    static toggleMaximize( id: string ): void {
        const win = document.getElementById( id );
        if ( !win ) return;

        if ( win.classList.contains( "maximized" ) ) {
            // Play unmaximize animation first
            AnimationManager.unmaximizeWindow( win, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMaximize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMaximize.easing,
                toScale: CONSTANTS.ANIM_SETTINGS.windowMaximize.scale
            } );
            // Restore previous dimensions
            win.style.width = win.dataset.prevWidth || "";
            win.style.height = win.dataset.prevHeight || "";
            win.style.left = win.dataset.prevLeft || "";
            win.style.top = win.dataset.prevTop || "";
            ( win.style as any ).right = "";
            ( win.style as any ).bottom = "";
            win.classList.remove( "maximized" );
        } else {
            // Save current dimensions
            win.dataset.prevWidth = win.style.width || win.offsetWidth + "px";
            win.dataset.prevHeight = win.style.height || win.offsetHeight + "px";
            win.dataset.prevLeft = win.style.left || win.offsetLeft + "px";
            win.dataset.prevTop = win.style.top || win.offsetTop + "px";
            // Clear inline styles so CSS .maximized rules take over
            win.style.width = "";
            win.style.height = "";
            win.style.left = "";
            win.style.top = "";
            ( win.style as any ).right = "";
            ( win.style as any ).bottom = "";
            win.classList.add( "maximized" );
            // Play maximize animation
            AnimationManager.maximizeWindow( win, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMaximize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMaximize.easing,
                fromScale: CONSTANTS.ANIM_SETTINGS.windowMaximize.scale
            } );
        }
    }

    // ⟪ Minimize Window ⟫

    static minimizeWindow( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            // Add minimized class immediately to trigger state change,
            // but animation manager will handle the visual part.
            AnimationManager.minimizeWindow( win, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMinimize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMinimize.easing
            } ).then( () => {
                win.classList.add( "minimized" );
                this.updateTaskbarApps();
                this.renderRecents();
                if ( typeof updateDock === "function" ) updateDock();
            } );
        }
    }

    // ⟪ Focus Window ⟫

    static focusWindow( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            if ( win.classList.contains( "minimized" ) ) {
                win.classList.remove( "minimized" );
                AnimationManager.restoreWindow( win );
            }
            win.style.zIndex = ( ++this.zIndex ).toString();
            if ( ( window as any ).PanelManager ) ( window as any ).PanelManager.closeAllPanels();
            this.updateTaskbarApps();
        }
    }

    // ⟪ Render Recents ⟫
    static renderRecents(): void {
        const list = document.getElementById( "recents-list" );
        if ( !list ) return;

        const windows = document.querySelectorAll( ".window" );
        const strings = typeof getStrings === "function" ? getStrings() : {};

        if ( windows.length === 0 ) {
            list.innerHTML = `<div style="padding: 24px; text-align: center; opacity: 0.5;">${strings.recents_no_apps || "No open apps"}</div>`;
            return;
        }

        list.innerHTML = Array.from( windows ).map( ( win: any ) => {
            const title = win.querySelector( ".title-bar-title" )?.innerText || "App";
            const emoji = win.dataset.emoji || "🖥️";
            const id = win.id;
            return `
                <div class="recents-card" onclick="WindowManager.focusWindow('${id}')">
                    <ksaka class="title-bar">
                        <button class="recents-close-btn" onclick="event.stopPropagation(); WindowManager.closeWindow('${id}'); WindowManager.renderRecents();">/</button>
                        <p class="title-bar-title">${title}</p>
                    </ksaka>
                    <div class="recents-preview">
                        ${emoji}
                    </div>
                </div>
            `;
        } ).join( "" );
    }

    // ⟪ Update Dock ⟫

    static updateDock(): void {
        const dock = document.getElementById( "taskbar-dock" );
        if ( !dock ) return;

        const windows = document.querySelectorAll( ".window" );
        if ( windows.length === 0 ) {
            dock.classList.remove( "visible" );
            return;
        }

        dock.innerHTML = Array.from( windows ).map( ( win: any ) => {
            const title = win.querySelector( ".title-bar-title" )?.innerText || "App";
            const id = win.id;
            const isMinimized = win.classList.contains( "minimized" );
            return `
                <button class="dock-btn n2tase ${isMinimized ? "minimized" : ""}" onclick="WindowManager.focusWindow('${id}')" title="${title}">
                    ${title[ 0 ].toUpperCase()}
                </button>
            `;
        } ).join( "" );
    }

    // ⟪ Set App Active ⟫

    static setAppActive( appName: string | null, active: boolean | null ): void {
        const countSpan = document.querySelector( ".active-apps-count" ) as HTMLElement | null;
        if ( countSpan ) {
            const count = document.querySelectorAll( ".window" ).length;
            countSpan.innerText = typeof ( window as any ).vab6caja === "function" ? ( window as any ).vab6caja( count ) : count.toString();
        }
    }

    // ⟪ Update Taskbar Apps ⟫

    static updateTaskbarApps(): void {
        const center = getHomeArea();
        const taskbar = getTaskbar();
        if ( !center || !taskbar ) return;

        center.querySelectorAll( ".taskbar-app-btn" ).forEach( ( b: HTMLElement ) => b.remove() );

        // Recent apps only shown in recents panel and start menu, not in taskbar
        this.setAppActive( null, null );
    }

    // ⟪ Settings Handlers ⟫

    static updateTaskbarSettings( val: string ): void {
        document.documentElement.style.setProperty( "--taskbar-width", val + "px" );

        const taskbar = getTaskbar();
        if ( taskbar ) {
            taskbar.dataset.large = ( parseInt( val ) >= CONSTANTS.WM.TASKBAR_LARGE_THRESHOLD ) ? "true" : "false";
        }
        this.updateTaskbarApps();
        if ( typeof updateHomeBarAppearance === "function" ) {
            updateHomeBarAppearance();
        }

        // Save to localStorage
        localStorage.setItem( "os-taskbar-size", val );
    }

    // ⟪ Theme Management ⟫

    static setTheme( theme: string ): void {
        if ( theme === "detect" ) {
            const isDark = window.matchMedia( "(prefers-color-scheme: dark)" ).matches;
            this.applyTheme( isDark );
            // Watch for system changes
            if ( !this._themeWatcher ) {
                this._themeWatcher = ( e: MediaQueryListEvent ) => {
                    if ( this._currentTheme === "detect" ) this.applyTheme( e.matches );
                };
                window.matchMedia( "(prefers-color-scheme: dark)" ).addEventListener( "change", this._themeWatcher );
            }
        } else {
            this.applyTheme( theme === "dark" );
        }
        this._currentTheme = theme;
        localStorage.setItem( "os-theme", theme );
    }

    static applyTheme( isDark: boolean ): void {
        const themeVars: { [ key: string ]: string } = isDark ? {
            "--ខេលេសៃ": "#000", "--ខេលេសៃច្ហិ": "#000000a0", "--កេភ": "#fff", "--កេភ២": "#c4c4c4",
            "--តានេក": "#ffffff10", "--តានេកខេលេ": "#ffffff10", "--តានេក២": "#ffffff20",
            "--ឆាងាធី": "#181818", "--ឆាងាធីច្ហិ": "#181818c0"
        } : {
            "--ខេលេសៃ": "#fff", "--ខេលេសៃច្ហិ": "#ffffffa0", "--កេភ": "#000", "--កេភ២": "#484848",
            "--តានេក": "#00000010", "--តានេកខេលេ": "#00000008", "--តានេក២": "#00000020",
            "--ឆាងាធី": "#f4f4f4", "--ឆាងាធីច្ហិ": "#f4f4f4c0"
        };
        const applyTo = ( doc: Document | null ) => {
            if ( !doc?.documentElement ) return;
            Object.entries( themeVars ).forEach( ( [ p, v ] ) => doc.documentElement.style.setProperty( p, v ) );
        };
        applyTo( document );
        document.querySelectorAll( "iframe" ).forEach( ( f: HTMLIFrameElement ) => { try { applyTo( f.contentDocument ); } catch ( e ) { /* ignore */ } } );
    }

    // ⟪ Wallpaper Management ⟫

    static setWallpaper( url: string ): void {
        const root = document.getElementById( "os-root" );
        if ( root ) {
            if ( url ) {
                root.style.backgroundImage = `url('${url}')`;
                root.style.backgroundSize = "cover";
                root.style.backgroundPosition = "center";
            } else {
                root.style.backgroundImage = "none";
            }
        }
        localStorage.setItem( "os-wallpaper", url || "" );
    }

    // ⟪ Initialization ⟫

    static init(): void {
        const savedTheme = localStorage.getItem( "os-theme" ) || "detect";
        this.setTheme( savedTheme );

        const savedWallpaper = localStorage.getItem( "os-wallpaper" );
        if ( savedWallpaper ) {
            this.setWallpaper( savedWallpaper );
        }

        // Initialize taskbar size from localStorage
        const savedTaskbarSize = localStorage.getItem( "os-taskbar-size" ) || "48";
        this.updateTaskbarSettings( savedTaskbarSize );

        // Initialize taskbar with saved position and insets
        this.initTaskbar();
    }

    // ⟪ Set Language ⟫

    static setLanguage( val: string ): void {
        if ( typeof k2regawe === "function" ) {
            k2regawe( val );
        }
    }

    // ⟪ Set Label Display ⟫

    static setLabelDisplay( val: string ): void {
        if ( ( window as any ).DesktopIconManager ) {
            const dim = ( window as any ).DesktopIconManager;
            if ( dim.desktop ) {
                dim.desktop.labelMode = val;
                dim.desktop.init();
            }
            if ( dim.startMenu ) {
                dim.startMenu.labelMode = val;
                dim.startMenu.init();
            }

            // Re-add icons to both grids
            APPS.forEach( ( app: any, i: number ) => {
                dim.desktop?.addIcon( app, i );
                dim.startMenu?.addIcon( app, i );
            } );
            dim._relayoutAll();
        }
    }

    // ⟪ Set Taskbar Position ⟫

    static setTaskbarPosition( pos: string ): void {
        const taskbar = getTaskbar();
        if ( taskbar ) taskbar.dataset.position = pos;

        const root = document.documentElement;
        const sizeWithGap = "calc(var(--taskbar-width) + var(--អារេងព៏) + var(--អារេងព៏) + var(--inset-gap))";
        const margin = "var(--អារេងព៏)";

        const panelInsets: { [ key: string ]: { [ key: string ]: string } } = {
            left: { "left": sizeWithGap, "right": margin, "top": margin, "bottom": margin },
            right: { "right": sizeWithGap, "left": margin, "top": margin, "bottom": margin },
            top: { "top": sizeWithGap, "bottom": margin, "left": margin, "right": margin },
            bottom: { "bottom": sizeWithGap, "top": margin, "left": margin, "right": margin }
        };

        // Reset all panel insets
        [ "top", "bottom", "left", "right" ].forEach( p => {
            root.style.setProperty( `--panel-inset-${p}`, "0px" );
        } );

        const panelValues = panelInsets[ pos ] || panelInsets.left;

        Object.entries( panelValues ).forEach( ( [ prop, val ] ) => {
            root.style.setProperty( `--panel-inset-${prop}`, val );
        } );

        // Update title bar orientation for windows
        document.querySelectorAll( ".window" ).forEach( ( el: any ) => {
            const titleBar = el.querySelector( ".title-bar" );
            if ( titleBar ) {
                titleBar.dataset.position = pos;
            }
            el.dataset.position = pos;
        } );

        // Update tile orientations via managers
        if ( ( window as any ).DesktopIconManager ) {
            [ ( window as any ).DesktopIconManager.desktop, ( window as any ).DesktopIconManager.startMenu ].forEach( ( grid: any ) => {
                grid?.container?.querySelectorAll( ".app-tile" ).forEach( ( tile: HTMLElement ) => grid.updateAdaptiveOrientation( tile ) );
            } );
        }

        if ( ( window as any ).DesktopIconManager?.desktop ) {
            setTimeout( () => {
                document.querySelectorAll( "#desktop .app-tile" ).forEach( ( tile: any ) =>
                    ( window as any ).DesktopIconManager.desktop.applyPosition( tile, parseInt( tile.dataset.col ), parseInt( tile.dataset.row ) )
                );
            }, CONSTANTS.WM.TASKBAR_REPOSITION_DELAY );
        }

        if ( typeof updateHomeBarAppearance === "function" ) {
            updateHomeBarAppearance();
        }

        // Save to localStorage
        localStorage.setItem( "os-taskbar-position", pos );
    }

    // ⟪ Init Taskbar ⟫

    static initTaskbar(): void {
        const taskbar = getTaskbar();
        if ( !taskbar ) return;

        taskbar.dataset.position = "left";
        taskbar.dataset.flow = "default";
        taskbar.dataset.large = "false";

        // Check if mobile device ( small screen )
        const isMobile = window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;

        // Auto-position taskbar based on screen size and orientation
        const autoPositionTaskbar = () => {
            const newIsMobile = window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;
            const newIsPortrait = window.innerHeight > window.innerWidth;
            const currentPos = taskbar.dataset.position;

            if ( newIsMobile ) {
                const isValidForPortrait = currentPos === "bottom";
                const isValidForLandscape = currentPos === "left" || currentPos === "right";
                const needsUpdate = newIsPortrait ? !isValidForPortrait : !isValidForLandscape;

                if ( needsUpdate ) {
                    this.setTaskbarPosition( newIsPortrait ? "bottom" : "left" );
                }
            }
        };

        if ( isMobile ) {
            // Mobile auto-detect orientation and set position
            const isPortrait = window.innerHeight > window.innerWidth;
            const savedPos = localStorage.getItem( "os-taskbar-position" );

            if ( savedPos ) {
                // Use saved position if it matches orientation
                const validForPortrait = savedPos === "bottom";
                const validForLandscape = savedPos === "left" || savedPos === "right";

                if ( ( isPortrait && validForPortrait ) || ( !isPortrait && validForLandscape ) ) {
                    this.setTaskbarPosition( savedPos );
                } else {
                    // Auto-set based on orientation
                    this.setTaskbarPosition( isPortrait ? "bottom" : "left" );
                }
            } else {
                // No saved position - auto-set based on orientation
                this.setTaskbarPosition( isPortrait ? "bottom" : "left" );
            }

            // Listen for orientation changes and resize
            window.addEventListener( "orientationchange", autoPositionTaskbar );
            window.addEventListener( "resize", autoPositionTaskbar );
        } else {
            const savedPos = localStorage.getItem( "os-taskbar-position" ) || "left";
            this.setTaskbarPosition( savedPos );
        }
    }
}

// ⟨ Listen For postMessage From Settings Iframe ⟩
window.addEventListener( "message", ( e ) => {
    if ( e.data?.source !== "settings" ) return;
    const { action, value } = e.data;
    if ( typeof ( WindowManager as any )[ action ] === "function" ) {
        ( WindowManager as any )[ action ]( value );
    }
} );

// Initialize Window Manager settings (theme, wallpaper, etc.)
document.addEventListener( "DOMContentLoaded", () => WindowManager.init() );

( window as any ).WindowManager = WindowManager;
( window as any ).renderRecents = () => WindowManager.renderRecents();
( window as any ).updateDock = () => WindowManager.updateDock();

// Stub for updateHomeBarAppearance (optional feature)
function updateHomeBarAppearance(): void {
    // Optional: Implement home bar appearance update logic
}
( window as any ).updateHomeBarAppearance = updateHomeBarAppearance;
