// ≺⧼ Constants ⧽≻

class WindowManager {
    static zIndex = WM_BASE_Z_INDEX;

    // ⟪ App URL Map ⟫ - Built from APPS_DATA ( path → path )

    static get APP_URLS() {
        if ( typeof APPS_DATA !== "undefined" ) {
            const map = {};
            APPS_DATA.forEach( app => {
                map[ app.path ] = app.path;
            } );
            return map;
        }
        return {};
    }

    // ⟪ Helper Functions ⟫

    static _randomWindowPosition( baseY ) {
        return {
            x: ( Math.floor( Math.random() * WM_WINDOW_RANDOM_RANGE ) * WM_WINDOW_RANDOM_STEP ) + WM_WINDOW_BASE_X,
            y: ( Math.floor( Math.random() * WM_WINDOW_RANDOM_RANGE ) * WM_WINDOW_RANDOM_STEP ) + baseY
        };
    }

    static _createWindowElement( id, title, internalContent ) {
        const win = document.createElement( "div" );
        win.classList.add( "window" );
        win.id = id;
        return win;
    }

    static _setupWindowInteractions( win, id, title ) {
        win.addEventListener( "mousedown", () => { win.style.zIndex = ++this.zIndex; } );
        this.setAppActive( title, true );
    }

    static _injectStylesIntoIframe( iframeId ) {
        const iframe = document.getElementById( iframeId );
        if ( !iframe ) return;

        iframe.onload = function() {
            try {
                const doc = this.contentDocument || this.contentWindow.document;
                if ( !doc?.head ) return;

                // Inject override styles
                if ( !doc.getElementById( "injected-style" ) ) {
                    const style = doc.createElement( "style" );
                    style.id = "injected-style";
                    style.textContent = `
                        h1, .saxesukef, .cakaxa, .soza, nav, footer, header { display: none !important; }
                        body { background-color: var(--ខេលេសៃច្ហិ, #000000a0) !important; }
                    `;
                    doc.head.appendChild( style );
                }

                // Link the global stylesheet for full design system
                if ( !doc.getElementById( "injected-global-css" ) ) {
                    const globalCss = document.querySelector( 'link[href*="֭ſɭᴜ ı],ɔ.css"]' );
                    if ( globalCss ) {
                        const link = doc.createElement( "link" );
                        link.id = "injected-global-css";
                        link.rel = "stylesheet";
                        link.href = globalCss.href;
                        doc.head.appendChild( link );
                    }
                }

                // Copy CSS custom properties from parent :root
                if ( !doc.getElementById( "injected-vars" ) ) {
                    const parentVars = getComputedStyle( document.documentElement );
                    const varsStyle = doc.createElement( "style" );
                    varsStyle.id = "injected-vars";
                    const varNames = [ "--តានេកខេលេ", "--តានេក", "--តានេក២", "--តានេក៣",
                        "--សាកព៏", "--សាកព៏២", "--សាកព៏៣",
                        "--ខេលេសៃ", "--ខេលេសៃច្ហិ", "--កេភ", "--កេភ២",
                        "--អារេងព៏", "--អារេងចិ", "--អារេង", "--អារេងមិ",
                        "--អិត្ភេពឺ", "--អិត្ភេ", "--អិត្ភេចិ", "--អិត្ភេមិ", "--ចិង",
                        "--ច្ហិនី" ];
                    const declarations = varNames
                        .map( v => `${v}: ${parentVars.getPropertyValue( v ).trim() || "inherit"};` )
                        .join( "\n" );
                    varsStyle.textContent = `:root { ${declarations} }`;
                    doc.head.appendChild( varsStyle );
                }
            } catch ( e ) {
                // Cross-origin iframes will throw; silently ignore
            }
        };
    }

    static _buildTitleBar( id, title, simple = false ) {
        if ( simple ) {
            return `
                <ksaka onmousedown="WindowManager.startDrag(event, '${id}')">
                    <button onclick="WindowManager.closeWindow('${id}')" title="Close">/</button>
                    <button onclick="WindowManager.toggleMaximize('${id}')" title="Maximize">O</button>
                    <button onclick="WindowManager.minimizeWindow('${id}')" title="Minimize">|</button>
                    <p class="title-bar-title">${title}</p>
                </ksaka>
            `;
        }
        return `
            <ksaka class="title-bar n2tase" onmousedown="WindowManager.startDrag(event, '${id}')">
                <div class="window-controls cakaxa">
                    <button class="control-btn" onclick="WindowManager.closeWindow('${id}')" title="Close">/</button>
                    <button class="control-btn" onclick="WindowManager.toggleMaximize('${id}')" title="Maximize">O</button>
                    <button class="control-btn" onclick="WindowManager.minimizeWindow('${id}')" title="Minimize">|</button>
                </div>
                <div class="title-bar-title">${title}</div>
            </ksaka>
        `;
    }

    static _buildIframeContent( iframeId, url ) {
        return `<iframe id="${iframeId}" src="${url}" sandbox="allow-same-origin allow-scripts" style="inline-size:100%; block-size:100%; border:none; border-radius: var(--អិត្ភេចិ);"></iframe>`;
    }

    static _buildResizeHandles( id ) {
        return `
            <div class="resize-handle resize-handle-n" onmousedown="WindowManager.startResize(event, '${id}', 'n')"></div>
            <div class="resize-handle resize-handle-s" onmousedown="WindowManager.startResize(event, '${id}', 's')"></div>
            <div class="resize-handle resize-handle-e" onmousedown="WindowManager.startResize(event, '${id}', 'e')"></div>
            <div class="resize-handle resize-handle-w" onmousedown="WindowManager.startResize(event, '${id}', 'w')"></div>
            <div class="resize-handle resize-handle-ne" onmousedown="WindowManager.startResize(event, '${id}', 'ne')"></div>
            <div class="resize-handle resize-handle-nw" onmousedown="WindowManager.startResize(event, '${id}', 'nw')"></div>
            <div class="resize-handle resize-handle-se" onmousedown="WindowManager.startResize(event, '${id}', 'se')"></div>
            <div class="resize-handle resize-handle-sw" onmousedown="WindowManager.startResize(event, '${id}', 'sw')"></div>
        `;
    }

    // ⟪ Load App From Path ⟫

    static loadAppFromPath( path, title ) {
        const id = "win-" + Date.now();
        const container = getWindowContainer();
        const win = this._createWindowElement( id, title );
        const app = ( typeof APPS_DATA !== "undefined" ) ? APPS_DATA.find( a => a.path === path ) : null;
        win.dataset.emoji = app?.emoji || "🖥️";
        const { x, y } = this._randomWindowPosition( WM_WINDOW_BASE_Y_LOAD );
        win.style.left = x + "px";
        win.style.top = y + "px";
        win.style.zIndex = ++this.zIndex;

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
        AnimationManager.windowOpen( win, {
            duration: ANIM_SETTINGS.windowOpen.duration,
            easing: ANIM_SETTINGS.windowOpen.easing,
            offsetY: ANIM_SETTINGS.windowOpen.offsetY,
            scale: ANIM_SETTINGS.windowOpen.scale
        } );
    }

    // ⟪ Create Window ⟫

    static createWindow( path, content = "" ) {
        const id = "win-" + Date.now();
        const title = path.split( "/" ).pop().replace( ".html", "" );
        const container = getWindowContainer();
        const win = this._createWindowElement( id, title );
        const app = ( typeof APPS_DATA !== "undefined" ) ? APPS_DATA.find( a => a.path === path ) : null;
        win.dataset.emoji = app?.emoji || "🖥️";
        const { x, y } = this._randomWindowPosition( WM_WINDOW_BASE_Y_CREATE );
        win.style.left = x + "px";
        win.style.top = y + "px";
        win.style.zIndex = ++this.zIndex;

        const appUrl = this.APP_URLS[ path ];
        const iframeId = "iframe-" + id;
        const internalContent = appUrl
            ? this._buildIframeContent( iframeId, appUrl )
            : ( content || `<div style="padding:16px; height:100%; justify-content:center;"><p>${title}</p></div>` );

        win.innerHTML = this._buildTitleBar( id, title ) + internalContent +
            this._buildResizeHandles( id );

        this._setupWindowInteractions( win, id, title );
        container.appendChild( win );
        this.updateTaskbarApps();

        if ( appUrl ) {
            this._injectStylesIntoIframe( iframeId );
        }

        // Animate window opening with fractions
        AnimationManager.windowOpen( win, {
            duration: ANIM_SETTINGS.windowOpen.duration,
            easing: ANIM_SETTINGS.windowOpen.easing,
            offsetY: ANIM_SETTINGS.windowOpen.offsetY,
            scale: ANIM_SETTINGS.windowOpen.scale
        } );
    }

    // ⟪ Start Resize ⟫

    static startResize( e, id, handle ) {
        e.stopPropagation();
        e.preventDefault();
        setDraggingState( true );
        const win = document.getElementById( id );
        if ( !win || win.classList.contains( "maximized" ) || win.classList.contains( "fullscreen" ) ) return;

        const rect = win.getBoundingClientRect();
        const startLeft = win.offsetLeft;
        const startTop = win.offsetTop;
        const startWidth = win.offsetWidth;
        const startHeight = win.offsetHeight;
        const startRight = startLeft + startWidth;
        const startBottom = startTop + startHeight;
        const startX = e.clientX, startY = e.clientY;
        
        // Calculate cursor offset from window edge (handles extend outside window)
        const offsetX = handle.includes( 'w' ) ? startX - rect.left : 0;
        const offsetY = handle.includes( 'n' ) ? startY - rect.top : 0;

        const doDrag = e => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            
            // Calculate new position and size using consistent formula
            let newLeft = startLeft, newTop = startTop, newRight = startRight, newBottom = startBottom;
            
            if ( handle.includes( 'w' ) ) {
                newLeft = startLeft + dx + offsetX;
            } else if ( handle.includes( 'e' ) ) {
                newRight = startRight + dx;
            }
            if ( handle.includes( 'n' ) ) {
                newTop = startTop + dy + offsetY;
            } else if ( handle.includes( 's' ) ) {
                newBottom = startBottom + dy;
            }
            
            // Calculate final position and size
            const finalWidth = Math.max( 0o460, newRight - newLeft );
            const finalHeight = Math.max( 0o310, newBottom - newTop );
            
            win.style.left = newLeft + "px";
            win.style.top = newTop + "px";
            win.style.width = finalWidth + "px";
            win.style.height = finalHeight + "px";
        };

        const stopDrag = () => {
            setDraggingState( false );
            document.removeEventListener( "mousemove", doDrag );
            document.removeEventListener( "mouseup", stopDrag );
        };

        document.addEventListener( "mousemove", doDrag );
        document.addEventListener( "mouseup", stopDrag );
    }

    // ⟪ Close Window ⟫

    static closeWindow( id ) {
        const win = document.getElementById( id );
        if ( win ) {
            const title = getWindowTitle( win );

            // Animate window closing with fractions
            AnimationManager.windowClose( win, {
                duration: ANIM_SETTINGS.windowClose.duration,
                easing: ANIM_SETTINGS.windowClose.easing,
                offsetY: ANIM_SETTINGS.windowClose.offsetY,
                scale: ANIM_SETTINGS.windowClose.scale
            } ).then( () => {
                this.setAppActive( title, false );
                win.remove();
                this.updateTaskbarApps();
            } );

            return;
        }
    }

    // ⟪ Start Drag ⟫

    static startDrag( e, id ) {
        e.preventDefault();
        setDraggingState( true );
        const win = document.getElementById( id );
        const rect = win.getBoundingClientRect();
        const shiftX = e.clientX - rect.left;
        const shiftY = e.clientY - rect.top;

        const onMouseMove = e => {
            win.style.left = ( e.pageX - shiftX ) + "px";
            win.style.top = ( e.pageY - shiftY ) + "px";
        };

        const onMouseUp = () => {
            setDraggingState( false );
            document.removeEventListener( "mousemove", onMouseMove );
            document.removeEventListener( "mouseup", onMouseUp );
        };

        document.addEventListener( "mousemove", onMouseMove );
        document.addEventListener( "mouseup", onMouseUp );
    }

    // ⟪ Toggle Maximize ⟫

    static toggleMaximize( id ) {
        const win = document.getElementById( id );
        if ( !win ) return;

        if ( win.classList.contains( "maximized" ) ) {
            // Restore previous dimensions
            win.style.width = win.dataset.prevWidth || "";
            win.style.height = win.dataset.prevHeight || "";
            win.style.left = win.dataset.prevLeft || "";
            win.style.top = win.dataset.prevTop || "";
            win.style.right = "";
            win.style.bottom = "";
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
            win.style.right = "";
            win.style.bottom = "";
            win.classList.add( "maximized" );
        }
    }

    // ⟪ Minimize Window ⟫

    static minimizeWindow( id ) {
        const win = document.getElementById( id );
        if ( win ) {
            // Add minimized class immediately to trigger state change, 
            // but animation manager will handle the visual part.
            AnimationManager.minimizeWindow( win, {
                duration: ANIM_SETTINGS.windowMinimize.duration,
                easing: ANIM_SETTINGS.windowMinimize.easing
            } ).then( () => {
                win.classList.add( "minimized" );
                this.updateTaskbarApps();
                if ( typeof updateDock === "function" ) updateDock();
            } );
        }
    }

    // ⟪ Focus Window ⟫

    static focusWindow( id ) {
        const win = document.getElementById( id );
        if ( win ) {
            if ( win.classList.contains( "minimized" ) ) {
                win.classList.remove( "minimized" );
                AnimationManager.restoreWindow( win );
            }
            win.style.zIndex = ++this.zIndex;
            if ( window.PanelManager ) PanelManager.closeAllPanels();
            this.updateTaskbarApps();
        }
    }

    // ⟪ Render Recents ⟫
    static renderRecents() {
        const list = document.getElementById( "recents-list" );
        if ( !list ) return;

        const windows = document.querySelectorAll( ".window" );
        const strings = typeof getStrings === "function" ? getStrings() : {};

        if ( windows.length === 0 ) {
            list.innerHTML = `<div style="padding: 24px; text-align: center; opacity: 0.5;">${strings.recents_no_apps || "No open apps"}</div>`;
            return;
        }

        list.innerHTML = Array.from( windows ).map( win => {
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

    static updateDock() {
        const dock = document.getElementById( "taskbar-dock" );
        if ( !dock ) return;

        const windows = document.querySelectorAll( ".window" );
        if ( windows.length === 0 ) {
            dock.classList.remove( "visible" );
            return;
        }

        dock.innerHTML = Array.from( windows ).map( win => {
            const title = win.querySelector( ".title-bar-title" )?.innerText || "App";
            const id = win.id;
            const isMinimized = win.classList.contains( "minimized" );
            return `
                <button class="dock-btn n2tase ${isMinimized ? "minimized" : ""}" onclick="WindowManager.focusWindow('${id}')" title="${title}">
                    ${title[0].toUpperCase()}
                </button>
            `;
        } ).join( "" );
    }

    // ⟪ Set App Active ⟫

    static setAppActive( appName, active ) {
        const countSpan = document.querySelector( ".active-apps-count" );
        if ( countSpan ) {
            const count = document.querySelectorAll( ".window" ).length;
            countSpan.innerText = typeof vab6caja === "function" ? vab6caja( count ) : count;
        }
    }

    // ⟪ Update Taskbar Apps ⟫

    static updateTaskbarApps() {
        const center = getHomeArea();
        const taskbar = getTaskbar();
        if ( !center || !taskbar ) return;

        const isLarge = isTaskbarLarge();
        center.querySelectorAll( ".taskbar-app-btn" ).forEach( b => b.remove() );

        // Recent apps only shown in recents panel and start menu, not in taskbar
        this.setAppActive( null, null );
    }

    // ⟪ Settings Handlers ⟫

    static updateTaskbarSettings( val ) {
        document.documentElement.style.setProperty( "--taskbar-width", val + "px" );

        const taskbar = getTaskbar();
        if ( taskbar ) {
            taskbar.dataset.large = ( parseInt( val ) >= WM_TASKBAR_LARGE_THRESHOLD ) ? "true" : "false";
        }
        this.updateTaskbarApps();
        if ( typeof updateHomeBarAppearance === "function" ) {
            updateHomeBarAppearance();
        }

        // Save to localStorage
        localStorage.setItem( "os-taskbar-size", val );
    }

    // ⟪ Theme Management ⟫

    static setTheme( theme ) {
        if ( theme === "detect" ) {
            const isDark = window.matchMedia( "(prefers-color-scheme: dark)" ).matches;
            this.applyTheme( isDark );
            // Watch for system changes
            if (!this._themeWatcher) {
                this._themeWatcher = (e) => {
                    if (this._currentTheme === "detect") this.applyTheme(e.matches);
                };
                window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this._themeWatcher);
            }
        } else {
            this.applyTheme( theme === "dark" );
        }
        this._currentTheme = theme;
        localStorage.setItem("os-theme", theme);
    }

    static applyTheme( isDark ) {
        const themeVars = isDark ? {
            "--ខេលេសៃ": "#000", "--ខេលេសៃច្ហិ": "#000000a0", "--កេភ": "#fff", "--កេភ២": "#c4c4c4",
            "--តានេក": "#ffffff10", "--តានេកខេលេ": "#ffffff10", "--តានេក២": "#ffffff20",
            "--ឆាងាធី": "#181818", "--ឆាងាធីច្ហិ": "#181818c0"
        } : {
            "--ខេលេសៃ": "#fff", "--ខេលេសៃច្ហិ": "#ffffffa0", "--កេភ": "#000", "--កេភ២": "#484848",
            "--តានេក": "#00000010", "--តានេកខេលេ": "#00000008", "--តានេក២": "#00000020",
            "--ឆាងាធី": "#f4f4f4", "--ឆាងាធីច្ហិ": "#f4f4f4c0"
        };
        const applyTo = ( doc ) => {
            if ( !doc?.documentElement ) return;
            Object.entries( themeVars ).forEach( ( [ p, v ] ) => doc.documentElement.style.setProperty( p, v ) );
        };
        applyTo( document );
        document.querySelectorAll( "iframe" ).forEach( f => { try { applyTo( f.contentDocument ); } catch ( e ) {} } );
    }

    // ⟪ Wallpaper Management ⟫

    static setWallpaper( url ) {
        const root = document.getElementById("os-root");
        if ( root ) {
            if ( url ) {
                root.style.backgroundImage = `url('${url}')`;
                root.style.backgroundSize = "cover";
                root.style.backgroundPosition = "center";
            } else {
                root.style.backgroundImage = "none";
            }
        }
        localStorage.setItem("os-wallpaper", url || "");
    }

    // ⟪ Initialization ⟫

    static init() {
        const savedTheme = localStorage.getItem("os-theme") || "detect";
        this.setTheme(savedTheme);

        const savedWallpaper = localStorage.getItem("os-wallpaper");
        if (savedWallpaper) {
            this.setWallpaper(savedWallpaper);
        }

        // Initialize taskbar size from localStorage
        const savedTaskbarSize = localStorage.getItem("os-taskbar-size") || "48";
        this.updateTaskbarSettings(savedTaskbarSize);

        // Initialize taskbar with saved position and insets
        this.initTaskbar();
    }

    // ⟪ Set Language ⟫

    static setLanguage( val ) {
        if ( typeof k2regawe === "function" ) {
            k2regawe( val );
        }
    }

    // ⟪ Set Label Display ⟫

    static setLabelDisplay( val ) {
        if (window.DesktopIconManager) {
            if (window.DesktopIconManager.desktop) {
                window.DesktopIconManager.desktop.labelMode = val;
                window.DesktopIconManager.desktop.init();
            }
            if (window.DesktopIconManager.startMenu) {
                window.DesktopIconManager.startMenu.labelMode = val;
                window.DesktopIconManager.startMenu.init();
            }

            // Re-add icons to both grids
            APPS.forEach((app, i) => {
                window.DesktopIconManager.desktop?.addIcon(app, i);
                window.DesktopIconManager.startMenu?.addIcon(app, i);
            });
            window.DesktopIconManager._relayoutAll();
        }
    }

    // ⟪ Set Taskbar Position ⟫

    static setTaskbarPosition( pos ) {
        const taskbar = getTaskbar();
        if ( taskbar ) taskbar.dataset.position = pos;

        const root = document.documentElement;
        const sizeWithGap = "calc(var(--taskbar-width) + var(--អារេងព៏) + var(--អារេងព៏) + var(--inset-gap))";
        const margin = "var(--អារេងព៏)";

        const panelInsets = {
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
        document.querySelectorAll( ".window" ).forEach( el => {
            const titleBar = el.querySelector( ".title-bar" );
            if ( titleBar ) {
                titleBar.dataset.position = pos;
            }
            el.dataset.position = pos;
        } );

        // Update tile orientations via managers
        if (window.DesktopIconManager) {
            [window.DesktopIconManager.desktop, window.DesktopIconManager.startMenu].forEach(grid => {
                grid?.container?.querySelectorAll(".app-tile").forEach(tile => grid.updateAdaptiveOrientation(tile));
            });
        }

        if ( window.DesktopIconManager?.desktop ) {
            setTimeout( () => {
                document.querySelectorAll( "#desktop .app-tile" ).forEach( tile =>
                    window.DesktopIconManager.desktop.applyPosition( tile, parseInt( tile.dataset.col ), parseInt( tile.dataset.row ) )
                );
            }, WM_TASKBAR_REPOSITION_DELAY );
        }

        if ( typeof updateHomeBarAppearance === "function" ) {
            updateHomeBarAppearance();
        }

        // Save to localStorage
        localStorage.setItem( "os-taskbar-position", pos );
    }

    // ⟪ Init Taskbar ⟫
    
    static initTaskbar() {
        const taskbar = getTaskbar();
        if ( !taskbar ) return;

        taskbar.dataset.position = "left";
        taskbar.dataset.flow = "default";
        taskbar.dataset.large = "false";

        // Read saved position from localStorage (same as settings uses)
        const savedPos = localStorage.getItem( "os-taskbar-position" ) || "left";
        this.setTaskbarPosition( savedPos );
    }
}

// ⟨ Listen For postMessage From Settings Iframe ⟩
window.addEventListener( "message", ( e ) => {
    if ( e.data?.source !== "settings" ) return;
    const { action, value } = e.data;
    if ( typeof WindowManager[ action ] === "function" ) {
        WindowManager[ action ]( value );
    }
} );

// Initialize Window Manager settings (theme, wallpaper, etc.)
document.addEventListener("DOMContentLoaded", () => WindowManager.init());

window.WindowManager = WindowManager;
window.renderRecents = () => WindowManager.renderRecents();
window.updateDock = () => WindowManager.updateDock();
