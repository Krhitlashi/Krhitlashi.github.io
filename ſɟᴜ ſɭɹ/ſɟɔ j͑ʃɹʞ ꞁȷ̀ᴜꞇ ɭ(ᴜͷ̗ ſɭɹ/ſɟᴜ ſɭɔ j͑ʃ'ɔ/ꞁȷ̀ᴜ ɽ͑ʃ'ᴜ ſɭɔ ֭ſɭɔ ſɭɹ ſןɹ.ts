// ≺⧼ Fenestra Administranto ⧽≻

declare const CONSTANTS: any;
declare const getWindowContainer: any;
declare const getWindowTitle: any;
declare const getHomeArea: any;
declare const getTaskbar: any;
declare const setDraggingState: any;
declare const EnigaAdministranto: any;
declare const AnimacioAdministranto: any;
declare const getStrings: any;
declare const APPS: any;
declare const updateDock: any;

class FenestraAdministranto {
    static statikaZIndekso: number = CONSTANTS.WM.BASE_Z_INDEX;
    static statikaTemoVigladilo: any = null;
    static statikaNunaTemo: string = "detect";

    // ⟪ Aplikaĵa URL-Mapo ⟫ - Konstruita el APPS_DATA ( vojo → vojo )

    static get aplikaĵajURLoj(): { [ key: string ]: string } {
        if ( typeof CONSTANTS.APPS_DATA !== "undefined" ) {
            const map: { [ key: string ]: string } = {};
            CONSTANTS.APPS_DATA.forEach( ( app: any ) => {
                map[ app.path ] = app.path;
            } );
            return map;
        }
        return {};
    }

    // ⟪ Helpaj Funkcioj ⟫

    static _aleatoriaFenestraPozicio( baseY: number ): { x: number; y: number } {
        return {
            x: ( Math.floor( Math.random() * CONSTANTS.WM.WINDOW_RANDOM_RANGE ) * CONSTANTS.WM.WINDOW_RANDOM_STEP ) + CONSTANTS.WM.WINDOW_BASE_X,
            y: ( Math.floor( Math.random() * CONSTANTS.WM.WINDOW_RANDOM_RANGE ) * CONSTANTS.WM.WINDOW_RANDOM_STEP ) + baseY
        };
    }

    static _kreiFenestranElementon( id: string, title: string ): HTMLElement {
        const win = document.createElement( "div" );
        win.classList.add( "window" );
        win.id = id;
        return win;
    }

    static _agordiFenestrajnInteragojn( win: HTMLElement, id: string, title: string ): void {
        win.addEventListener( "mousedown", () => { win.style.zIndex = ( ++this.statikaZIndekso ).toString(); } );
        this.agordiAplikonAktiva( title, true );
    }

    static _injektiStilojnEnIframon( iframeId: string ): void {
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
                        h1, .saxesukef, .cakaxa, .sozanu, nav, footer, header { display: none !important; }
                        body { background-color: transparent !important; padding: var(--អារេងព៏) !important; }
                        ciihii {
                        background-color: var(--តានេក) !important; }
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

    static _konstruiTitolaBreton( id: string, title: string, simple: boolean = false ): string {
        if ( simple ) {
            return `
                <ksaka onmousedown="FenestraAdministranto.komenciTrenadon(event, '${id}')" ontouchstart="FenestraAdministranto.komenciTrenadon(event, '${id}')">
                    <button onclick="FenestraAdministranto.fermiFenestron('${id}')" title="Fermi">/</button>
                    <button onclick="FenestraAdministranto.baskuligiMaksimumigxon('${id}')" title="Maksimumigi">O</button>
                    <button onclick="FenestraAdministranto.minimumigiFenestron('${id}')" title="Minimumigi">|</button>
                    <p class="title-bar-title">${title}</p>
                </ksaka>
            `;
        }
        return `
            <ksaka class="title-bar n2tase" onmousedown="FenestraAdministranto.komenciTrenadon(event, '${id}')" ontouchstart="FenestraAdministranto.komenciTrenadon(event, '${id}')">
                <div class="window-controls cakaxa">
                    <button class="control-btn" onclick="FenestraAdministranto.fermiFenestron('${id}')" title="Fermi">/</button>
                    <button class="control-btn" onclick="FenestraAdministranto.baskuligiMaksimumigxon('${id}')" title="Maksimumigi">O</button>
                    <button class="control-btn" onclick="FenestraAdministranto.minimumigiFenestron('${id}')" title="Minimumigi">|</button>
                </div>
                <div class="title-bar-title">${title}</div>
            </ksaka>
        `;
    }

    static _konstruiIframanEnhavon( iframeId: string, url: string ): string {
        return `<iframe id="${iframeId}" src="${url}" sandbox="allow-same-origin allow-scripts" style="inline-size:100%; block-size:100%;" class="n2tase"></iframe>`;
    }

    static _konstruiGrandSxangxilojn( id: string ): string {
        return `
            <div class="resize-handle resize-handle-n" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'n')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'n')"></div>
            <div class="resize-handle resize-handle-s" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 's')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 's')"></div>
            <div class="resize-handle resize-handle-e" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'e')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'e')"></div>
            <div class="resize-handle resize-handle-w" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'w')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'w')"></div>
            <div class="resize-handle resize-handle-ne" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'ne')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'ne')"></div>
            <div class="resize-handle resize-handle-nw" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'nw')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'nw')"></div>
            <div class="resize-handle resize-handle-se" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'se')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'se')"></div>
            <div class="resize-handle resize-handle-sw" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'sw')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', 'sw')"></div>
        `;
    }

    // ⟪ Alenporti Fenestron al Frunto ⟫

    static alenportiAlFrunto( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            win.style.zIndex = ( ++this.statikaZIndekso ).toString();
        }
    }

    // ⟪ Ŝargi Aplikon el Vojo ⟫

    static sxargiAplikonDeVojo( path: string, title: string ): void {
        const container = getWindowContainer();

        // Check if app is already open
        const existingWin = Array.from( document.querySelectorAll( ".window" ) ).find( ( win: any ) => {
            const iframe = win.querySelector( "iframe" );
            return iframe && iframe.src.includes( path );
        } );
        
        
        if ( existingWin ) {
            // App is already open - focus it and refresh recents
            this.fokusigiFenestron( existingWin.id );
            this.renderiLastatempajn();
            return;
        }

        const id = "win-" + Date.now();
        const win = this._kreiFenestranElementon( id, title );
        const app = ( typeof CONSTANTS.APPS_DATA !== "undefined" ) ? CONSTANTS.APPS_DATA.find( ( a: any ) => a.path === path ) : null;
        win.dataset.emoji = app?.emoji || "🖥️";
        const { x, y } = this._aleatoriaFenestraPozicio( CONSTANTS.WM.WINDOW_BASE_Y_LOAD );
        win.style.left = x + "px";
        win.style.top = y + "px";
        win.style.zIndex = ( ++this.statikaZIndekso ).toString();

        const iframeId = "iframe-" + id;
        win.innerHTML = `
        <div class="cepufal" style="padding: 0; inline-size: 100%;">
            ${this._konstruiTitolaBreton( id, title, true )}
            ${this._konstruiIframanEnhavon( iframeId, path )}
        </div>
        ` + this._konstruiGrandSxangxilojn( id );

        container.appendChild( win );
        this._agordiFenestrajnInteragojn( win, id, title );
        this.gxisdatigiTaskobretajnAplikojn();
        this._injektiStilojnEnIframon( iframeId );

        // Animate window opening with fractions
        AnimacioAdministranto.fenestroMalfermi( win, { ...CONSTANTS.ANIM_SETTINGS.windowOpen } );

        // Refresh recents to show new window
        this.renderiLastatempajn();
    }

    // ⟪ Krei Fenestron ⟫

    static kreiFenestron( path: string, content: string = "" ): void {
        const id = "win-" + Date.now();
        const title = path.split( "/" ).pop()?.replace( ".html", "" ) || "App";
        const container = getWindowContainer();
        const win = this._kreiFenestranElementon( id, title );
        const app = ( typeof CONSTANTS.APPS_DATA !== "undefined" ) ? CONSTANTS.APPS_DATA.find( ( a: any ) => a.path === path ) : null;
        win.dataset.emoji = app?.emoji || "🖥️";
        const { x, y } = this._aleatoriaFenestraPozicio( CONSTANTS.WM.WINDOW_BASE_Y_CREATE );
        win.style.left = x + "px";
        win.style.top = y + "px";
        win.style.zIndex = ( ++this.statikaZIndekso ).toString();

        const appUrl = this.aplikaĵajURLoj[ path ];
        const iframeId = "iframe-" + id;
        const internalContent = appUrl
            ? this._konstruiIframanEnhavon( iframeId, appUrl )
            : ( content || `<div><p>${title}</p></div>` );

        win.innerHTML = this._konstruiTitolaBreton( id, title ) + internalContent +
            this._konstruiGrandSxangxilojn( id );

        this._agordiFenestrajnInteragojn( win, id, title );
        container.appendChild( win );
        this.gxisdatigiTaskobretajnAplikojn();

        if ( appUrl ) {
            this._injektiStilojnEnIframon( iframeId );
        }

        // Animate window opening with fractions
        AnimacioAdministranto.fenestroMalfermi( win, { ...CONSTANTS.ANIM_SETTINGS.windowOpen } );
    }

    // ⟪ Komenci GrandŜanĝon ⟫

    static komenciGrandSxangxon( e: MouseEvent | TouchEvent, id: string, handle: string ): void {
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
        const pos = EnigaAdministranto.getPointerPos( e );
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

    // ⟪ Fermi Fenestron ⟫

    static fermiFenestron( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            const title = getWindowTitle( win );

            // Animate window closing with fractions
            AnimacioAdministranto.fenestroFermi( win, { ...CONSTANTS.ANIM_SETTINGS.windowClose } ).then( () => {
                this.agordiAplikonAktiva( title, false );
                win.remove();
                this.gxisdatigiTaskobretajnAplikojn();
                this.renderiLastatempajn();
            } );

            return;
        }
    }

    // ⟪ Komenci Trenadon ⟫

    static komenciTrenadon( e: MouseEvent | TouchEvent, id: string ): void {
        e.preventDefault();

        const win = document.getElementById( id );
        if ( !win || ( win as any )._isResizing ) return;

        setDraggingState( true );
        const rect = win.getBoundingClientRect();

        // Get pointer position using unified handler
        const pos = EnigaAdministranto.getPointerPos( e );
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

        EnigaAdministranto.setupDrag( win, null, onMove, onEnd );
    }

    // ⟪ Baskuli Maksimumigon ⟫

    static baskuligiMaksimumigxon( id: string ): void {
        const win = document.getElementById( id );
        if ( !win ) return;

        if ( win.classList.contains( "maximized" ) ) {
            // Play unmaximize animation first
            AnimacioAdministranto.malmaksimumigiFenestron( win, {
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
            AnimacioAdministranto.maksimumigiFenestron( win, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMaximize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMaximize.easing,
                fromScale: CONSTANTS.ANIM_SETTINGS.windowMaximize.scale
            } );
        }
    }

    // ⟪ Minimumigi Fenestron ⟫

    static minimumigiFenestron( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            // Add minimized class immediately to trigger state change,
            // but animation manager will handle the visual part.
            AnimacioAdministranto.minimumigiFenestron( win, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMinimize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMinimize.easing
            } ).then( () => {
                win.classList.add( "minimized" );
                this.gxisdatigiTaskobretajnAplikojn();
                this.renderiLastatempajn();
                if ( typeof updateDock === "function" ) updateDock();
            } );
        }
    }

    // ⟪ Fokusigi Fenestron ⟫

    static fokusigiFenestron( id: string ): void {
        const win = document.getElementById( id );
        if ( win ) {
            if ( win.classList.contains( "minimized" ) ) {
                win.classList.remove( "minimized" );
                AnimacioAdministranto.restaŭriFenestron( win );
            }
            win.style.zIndex = ( ++this.statikaZIndekso ).toString();
            if ( ( window as any ).PanelaAdministranto ) ( window as any ).PanelaAdministranto.fermiCxiujnPanelojn();
            this.gxisdatigiTaskobretajnAplikojn();
        }
    }

    // ⟪ Bildigi Lastatempajn ⟫
    static renderiLastatempajn(): void {
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
                <div class="recents-card" onclick="FenestraAdministranto.fokusigiFenestron('${id}')">
                    <ksaka class="title-bar">
                        <button class="recents-close-btn" onclick="event.stopPropagation(); FenestraAdministranto.fermiFenestron('${id}'); FenestraAdministranto.renderiLastatempajn();">/</button>
                        <p class="title-bar-title">${title}</p>
                    </ksaka>
                    <div class="recents-preview">
                        ${emoji}
                    </div>
                </div>
            `;
        } ).join( "" );
    }

    // ⟪ Ĝisdatigi Dokon ⟫

    static gxisdatigiDokon(): void {
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
                <button class="dock-btn n2tase ${isMinimized ? "minimized" : ""}" onclick="FenestraAdministranto.fokusigiFenestron('${id}')" title="${title}">
                    ${title[ 0 ].toUpperCase()}
                </button>
            `;
        } ).join( "" );
    }

    // ⟪ Agordi Aplikon Aktiva ⟫

    static agordiAplikonAktiva( appName: string | null, active: boolean | null ): void {
        const countSpan = document.querySelector( ".active-apps-count" ) as HTMLElement | null;
        if ( countSpan ) {
            const count = document.querySelectorAll( ".window" ).length;
            countSpan.innerText = typeof ( window as any ).vab6caja === "function" ? ( window as any ).vab6caja( count ) : count.toString();
        }
    }

    // ⟪ Ĝisdatigi Taskobretajn Aplikojn ⟫

    static gxisdatigiTaskobretajnAplikojn(): void {
        const center = getHomeArea();
        const taskbar = getTaskbar();
        if ( !center || !taskbar ) return;

        center.querySelectorAll( ".taskbar-app-btn" ).forEach( ( b: HTMLElement ) => b.remove() );

        // Recent apps only shown in recents panel and start menu, not in taskbar
        this.agordiAplikonAktiva( null, null );
    }

    // ⟪ Agordaj Traktiloj ⟫

    static gxisdatigiTaskobretajnAgordojn( val: string ): void {
        document.documentElement.style.setProperty( "--taskbar-width", val + "px" );

        const taskbar = getTaskbar();
        if ( taskbar ) {
            taskbar.dataset.large = ( parseInt( val ) >= CONSTANTS.WM.TASKBAR_LARGE_THRESHOLD ) ? "true" : "false";
        }
        
        // Save to localStorage
        localStorage.setItem( "os-taskbar-size", val );
    }

    // ⟪ Tema Administrado ⟫

    static agordiTemon( theme: string ): void {
        if ( theme === "detect" ) {
            const isDark = window.matchMedia( "(prefers-color-scheme: dark)" ).matches;
            this.aplikiTemon( isDark );
            // Watch for system changes
            if ( !this.statikaTemoVigladilo ) {
                this.statikaTemoVigladilo = ( e: MediaQueryListEvent ) => {
                    if ( this.statikaNunaTemo === "detect" ) this.aplikiTemon( e.matches );
                };
                window.matchMedia( "(prefers-color-scheme: dark)" ).addEventListener( "change", this.statikaTemoVigladilo );
            }
        } else {
            this.aplikiTemon( theme === "dark" );
        }
        this.statikaNunaTemo = theme;
        localStorage.setItem( "os-theme", theme );
    }

    static aplikiTemon( isDark: boolean ): void {
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

    // ⟪ Tapeta Administrado ⟫

    static agordiTapeton( url: string ): void {
        const root = document.getElementById( "os-root" );
        if ( root ) {
            root.classList.remove( "wallpaper-gradient" );
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

    static agordiGradientanTapeton( start: string, end: string ): void {
        const root = document.getElementById( "os-root" );
        if ( root ) {
            root.classList.add( "wallpaper-gradient" );
            root.style.backgroundImage = `linear-gradient(135deg, ${start}, ${end})`;
            root.style.backgroundSize = "100% 100%";
        }
        localStorage.setItem( "os-wallpaper-gradient", JSON.stringify( { start, end } ) );
        localStorage.removeItem( "os-wallpaper" );
    }

    static agordiHazardaGradientaTapeto(): void {
        const randomColor = () => '#' + Math.floor( Math.random() * 16777215 ).toString( 16 ).padStart( 6, '0' );
        const start = randomColor();
        const end = randomColor();
        this.agordiGradientanTapeton( start, end );
    }

    static forigiTapeton(): void {
        const root = document.getElementById( "os-root" );
        if ( root ) {
            root.classList.remove( "wallpaper-gradient" );
            root.style.backgroundImage = "none";
        }
        localStorage.removeItem( "os-wallpaper" );
        localStorage.removeItem( "os-wallpaper-gradient" );
    }

    // ⟪ Inicado ⟫

    static inicii(): void {
        const savedTheme = localStorage.getItem( "os-theme" ) || "detect";
        this.agordiTemon( savedTheme );

        // Load wallpaper (image or gradient)
        const savedWallpaper = localStorage.getItem( "os-wallpaper" );
        if ( savedWallpaper ) {
            this.agordiTapeton( savedWallpaper );
        } else {
            const savedGradient = JSON.parse( localStorage.getItem( "os-wallpaper-gradient" ) || "null" );
            if ( savedGradient ) {
                this.agordiGradientanTapeton( savedGradient.start, savedGradient.end );
            }
        }

        // Initialize taskbar size from localStorage
        const savedTaskbarSize = localStorage.getItem( "os-taskbar-size" ) || "48";
        this.gxisdatigiTaskobretajnAgordojn( savedTaskbarSize );

        // Initialize taskbar with saved position and insets
        this.iniciiTaskobreton();
    }

    // ⟪ Agordi Lingvon ⟫

    static agordiLingvon( val: string ): void {
        if ( typeof window.k2regawe === "function" ) {
            window.k2regawe( val );
        }
    }

    // ⟪ Agordi Etikedan Montron ⟫

    static agordiEtikedMontron( val: string ): void {
        if ( ( window as any ).LabortablaPiktogramoAdministranto ) {
            const dim = ( window as any ).LabortablaPiktogramoAdministranto;
            if ( dim.desktop ) {
                dim.desktop.etikedReĝimo = val;
                dim.desktop.inicii();
            }
            if ( dim.startMenu ) {
                dim.startMenu.etikedReĝimo = val;
                dim.startMenu.inicii();
            }

            // Re-add icons to both grids
            APPS.forEach( ( app: any, i: number ) => {
                dim.desktop?.aldoniPiktogramon( app, i );
                dim.startMenu?.aldoniPiktogramon( app, i );
            } );
            dim._rearanĝiCxiujn();
        }
    }

    // ⟪ Agordi Taskobretan Pozicion ⟫

    static agordiTaskobretanPozicion( pos: string ): void {
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
        if ( ( window as any ).LabortablaPiktogramoAdministranto ) {
            [ ( window as any ).LabortablaPiktogramoAdministranto.desktop, ( window as any ).LabortablaPiktogramoAdministranto.startMenu ].forEach( ( grid: any ) => {
                grid?.container?.querySelectorAll( ".app-tile" ).forEach( ( tile: HTMLElement ) => grid.gxisdatigiAdaptanOrientigon( tile ) );
            } );
        }

        if ( ( window as any ).LabortablaPiktogramoAdministranto?.desktop ) {
            setTimeout( () => {
                document.querySelectorAll( "#desktop .app-tile" ).forEach( ( tile: any ) =>
                    ( window as any ).LabortablaPiktogramoAdministranto.desktop.aplikiPozicion( tile, parseInt( tile.dataset.col ), parseInt( tile.dataset.row ) )
                );
            }, CONSTANTS.WM.TASKBAR_REPOSITION_DELAY );
        }

        // Save to localStorage
        localStorage.setItem( "os-taskbar-position", pos );
    }

    // ⟪ Inicii Taskobreton ⟫

    static iniciiTaskobreton(): void {
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
                    this.agordiTaskobretanPozicion( newIsPortrait ? "bottom" : "left" );
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
                    this.agordiTaskobretanPozicion( savedPos );
                } else {
                    // Auto-set based on orientation
                    this.agordiTaskobretanPozicion( isPortrait ? "bottom" : "left" );
                }
            } else {
                // No saved position - auto-set based on orientation
                this.agordiTaskobretanPozicion( isPortrait ? "bottom" : "left" );
            }

            // Listen for orientation changes and resize
            window.addEventListener( "orientationchange", autoPositionTaskbar );
            window.addEventListener( "resize", autoPositionTaskbar );
        } else {
            const savedPos = localStorage.getItem( "os-taskbar-position" ) || "left";
            this.agordiTaskobretanPozicion( savedPos );
        }
    }
}

// ⟨ Listen For postMessage From Settings Iframe ⟩
window.addEventListener( "message", ( e ) => {
    if ( e.data?.source !== "settings" ) return;
    const { action, value } = e.data;
    
    // Handle gradient wallpaper actions
    if ( action === "setGradientWallpaper" && value?.start && value?.end ) {
        (window as any).FenestraAdministranto.agordiGradientanTapeton( value.start, value.end );
        return;
    }
    if ( action === "setRandomGradientWallpaper" ) {
        (window as any).FenestraAdministranto.agordiHazardaGradientaTapeto();
        return;
    }
    if ( action === "clearWallpaper" ) {
        (window as any).FenestraAdministranto.forigiTapeton();
        return;
    }
    
    if ( typeof ( window as any ).FenestraAdministranto[ action ] === "function" ) {
        ( window as any ).FenestraAdministranto[ action ]( value );
    }
} );

// Initialize Window Manager settings (theme, wallpaper, etc.)
document.addEventListener( "DOMContentLoaded", () => (window as any).FenestraAdministranto.inicii() );

( window as any ).FenestraAdministranto = FenestraAdministranto;
( window as any ).renderRecents = () => (window as any).FenestraAdministranto.renderiLastatempajn();
( window as any ).updateDock = () => (window as any).FenestraAdministranto.gxisdatigiDokon();