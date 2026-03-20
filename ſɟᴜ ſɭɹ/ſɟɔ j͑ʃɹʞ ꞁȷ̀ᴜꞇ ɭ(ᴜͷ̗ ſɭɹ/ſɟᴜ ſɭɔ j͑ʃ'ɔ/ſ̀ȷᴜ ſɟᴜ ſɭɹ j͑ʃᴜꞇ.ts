// ≺⧼ Desktop Icon Manager ⧽≻

declare const APPS_DATA: any;
declare const QS_TOGGLES: any;
declare const QSManager: any;
declare const NotificationManager: any;
declare const throttle: any;
declare const StorageUtil: any;
declare const toggleQsButton: any;

import { IconGrid, MOBILE_GRID_ROWS, MOBILE_GRID_COLS } from "./ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ.js";
import { AppData } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";

let APPS: AppData[] = [];

// ⟪ Desktop Icon Manager ⟫

export const DesktopIconManager = {
    desktop: null as IconGrid | null,
    startMenu: null as IconGrid | null,

    _relayoutAll() {
        [ this.desktop, this.startMenu ].forEach( grid => grid?.relayout() );
    },

    _snapAllGrids() {
        [ this.desktop, this.startMenu ].forEach( grid => {
            if ( grid?.container ) grid.container.querySelectorAll( ".app-tile" ).forEach( ( t: any ) => grid.snapAfterDrag( t as HTMLElement ) );
        } );
    },

    _handleResize() {
        [ this.desktop, this.startMenu ].forEach( grid => {
            if ( grid?.container ) grid.relayout();
        } );
    },

    _saveDesktopLayout() {
        if ( StorageUtil && this.desktop?.container ) {
            const tiles = Array.from( this.desktop.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[];
            StorageUtil.saveTileLayout( tiles, "desktopTileLayout" );
        }
    },

    // Move tile to a specific page (mobile only)
    moveTileToPage( tile: HTMLElement, targetPage: number ) {
        if ( !tile || !this.desktop ) return;

        const appPath = tile.dataset.app;
        const appIndex = APPS.findIndex( ( app: any ) => app.app === appPath );

        if ( appIndex === -1 ) return;

        // Remove tile from current position
        tile.remove();

        // Re-add at new page position
        const itemsPerPage = MOBILE_GRID_ROWS * MOBILE_GRID_COLS;
        const newIndex = ( targetPage * itemsPerPage ) + ( appIndex % itemsPerPage );

        const newEl = this.desktop.addIcon( APPS[ appIndex ], newIndex );
        this.desktop.snapToGrid( newEl, newIndex );

        // Update page indicators
        this._updatePageIndicators();

        // Refresh to show tile on new page
        this.desktop.currentPage = targetPage;
        this.desktop.refresh();
    },

    transferIconFromStartMenu( el: HTMLElement ) {
        const appData = {
            name: el.dataset.app?.split( "/" ).pop()?.replace( ".html", "" ) || "App",
            icon: ( el.querySelector( ".icon" ) as HTMLElement )?.innerText || "🖥️",
            app: el.dataset.app || ""
        };
        
        if ( !this.desktop || !this.startMenu ) return;
        
        // Add to desktop
        const newEl = this.desktop.addIcon( appData, 0 );
        this.desktop.snapToGrid( newEl, 0 );
        el.remove();
        
        // Remove duplicate from start menu and relayout
        const startMenu = this.startMenu;
        if ( !startMenu.container ) return;
        
        [ ...startMenu.container.querySelectorAll( ".app-tile" ) ]
            .forEach( ( tile: any, idx: number ) => {
                if ( tile.dataset.app === appData.app ) tile.remove();
                else startMenu.snapToGrid( tile, idx );
            } );
        
        this._relayoutAll();
        this._saveDesktopLayout();
    },

    async init() {
        // IconGrid auto-detects mobile vs desktop now
        this.desktop = new IconGrid( "desktop", { centered: false, bottomUp: true, labelMode: "external" } );
        this.startMenu = new IconGrid( "start-menu-content", { centered: false, bottomUp: true, labelMode: "external" } );

        // Set cross-references for transfer operations
        ( this.desktop as any ).desktop = this.desktop;
        ( this.desktop as any ).startMenu = this.startMenu;
        ( this.startMenu as any ).desktop = this.desktop;
        ( this.startMenu as any ).startMenu = this.startMenu;

        APPS = APPS_DATA.map( ( app: any ) => ( {
            name: app.path.split( "/" ).pop().replace( ".html", "" ),
            icon: app.emoji,
            app: app.path
        } ) );

        APPS.forEach( ( app: any, i: number ) => {
            this.desktop?.addIcon( app, i );
            this.startMenu?.addIcon( app, i );
        } );

        // Apply saved tile layout from storage
        if ( StorageUtil && this.desktop?.container ) {
            const tiles = Array.from( this.desktop.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[];
            const desktop = this.desktop;
            StorageUtil.applyTileLayout( tiles, "desktopTileLayout", ( tile: HTMLElement, col: number, row: number ) => {
                desktop.applyPosition( tile, col, row );
            } );
        }

        this._initQuickSettings();
        this._relayoutAll();
        this._createPageIndicators();
        setTimeout( () => this.desktop?.relayout(), 0o140 );

        window.addEventListener( "resize", throttle( () => {
            this._handleResize();
            setTimeout( () => this._snapAllGrids(), 0o200 );
        }, 0o312 ) );

        if ( QSManager ) QSManager.init();
        if ( NotificationManager ) NotificationManager.init();
    },

    _createPageIndicators() {
        // Remove existing indicators
        const existing = document.querySelector( ".page-indicators" );
        if ( existing ) existing.remove();

        // Create page indicators for mobile
        const itemsPerPage = MOBILE_GRID_ROWS * MOBILE_GRID_COLS;
        const totalPages = Math.ceil( APPS.length / itemsPerPage );

        if ( totalPages <= 1 ) return;

        const container = document.createElement( "div" );
        container.className = "page-indicators";

        for ( let i = 0; i < totalPages; i++ ) {
            const dot = document.createElement( "div" );
            dot.className = "page-indicator" + ( i === 0 ? " active" : "" );
            dot.onclick = () => {
                if ( this.desktop ) {
                    this.desktop.currentPage = i;
                    this.desktop.refresh();
                    this._updatePageIndicators();
                }
            };
            container.appendChild( dot );
        }

        document.body.appendChild( container );
    },

    _updatePageIndicators() {
        const container = document.querySelector( ".page-indicators" );
        if ( !container || !this.desktop ) return;

        const dots = container.querySelectorAll( ".page-indicator" );
        dots.forEach( ( dot, i ) => {
            dot.classList.toggle( "active", i === ( this.desktop as any )?.currentPage );
        } );
    },

    _initQuickSettings() {
        const qsContainer = document.getElementById( "quick-settings-container" );
        const qsGrid = document.getElementById( "quick-settings-buttons" );
        const slidersContainer = document.getElementById( "quick-settings-sliders" );
        const editActions = document.getElementById( "qs-edit-actions" );

        if ( !qsContainer || !qsGrid || !slidersContainer || !editActions ) return;

        const storage = StorageUtil;
        const savedToggleOrder = storage.get( "xeku1okek-order", null );
        const savedSliderOrder = storage.get( "qs-slider-order", null );
        const savedContainerOrder = storage.get( "qs-container-order", [ "quick-settings-sliders", "quick-settings-buttons" ] );

        const currentContainers: { [ key: string ]: HTMLElement | null } = { "quick-settings-buttons": qsGrid, "quick-settings-sliders": slidersContainer };
        savedContainerOrder.forEach( ( id: string ) => {
            const el = currentContainers[ id ];
            if ( el ) qsContainer.appendChild( el );
        } );
        qsContainer.appendChild( editActions );

        let toggles = [ ...QS_TOGGLES ];
        if ( savedToggleOrder ) {
            toggles = savedToggleOrder.map( ( id: string ) => QS_TOGGLES.find( ( t: any ) => t.id === id ) ).filter( Boolean );
            QS_TOGGLES.forEach( ( t: any ) => { if ( !savedToggleOrder.includes( t.id ) ) toggles.push( t ); } );
        }
        qsGrid.innerHTML = toggles.map( ( t: any ) => `
            <div class="xeku1okek" data-qs-id="${t.id}" onclick="window.DesktopIconManager._handleQSClick( event , this , 'xeku1okek-order' )">
                <button class="caku1o" data-setting="${t.id}" aria-pressed="${t.default}" onclick="if ( window.toggleQsButton ) toggleQsButton( this )">
                    <span class="icon">${t.icon}</span>
                    <span class="label" data-oskakefani="${t.string}">${t.label}</span>
                </button>
                <button class="qs-remove-btn" onclick="event.stopPropagation(); window.DesktopIconManager._removeQSItem( event , 'xeku1okek-order' , '${t.id}' )">/</button>
            </div>
        ` ).join( "" );

        const defaultSliders = [
            { id: "volume", label: "Volume", icon: "🔊", string: "qs_volume", max: 0o100, value: 0o40, handler: "volume" },
            { id: "brightness", label: "Brightness", icon: "🔆", string: "qs_brightness", max: 0o100, value: 0o60, handler: "brightness" }
        ];
        let sliders = [ ...defaultSliders ];
        if ( savedSliderOrder ) {
            sliders = savedSliderOrder.map( ( id: string ) => defaultSliders.find( ( s: any ) => s.id === id ) ).filter( Boolean as any );
            defaultSliders.forEach( ( s: any ) => { if ( !savedSliderOrder.includes( s.id ) ) sliders.push( s ); } );
        }
        slidersContainer.innerHTML = sliders.map( ( s: any ) => `
            <div class="xeku1okek" data-qs-id="${s.id}" onclick="window.DesktopIconManager._handleQSClick( event , this , 'qs-slider-order' )">
                <ciihii class="">
                    <span class="label" data-oskakefani="${s.string}">${s.label}</span>
                    <span class="icon">${s.icon}</span>
                    <input type="range" class="k6tani" min="0" max="${s.max}" value="${s.value}" oninput="if ( window.updateSlider ) updateSlider( '${s.handler}' , this.value )">
                </ciihii>
                <button class="qs-remove-btn" onclick="event.stopPropagation(); window.DesktopIconManager._removeQSItem( event , 'qs-slider-order' , '${s.id}' )">/</button>
            </div>
        ` ).join( "" );

        if ( !editActions.querySelector( ".qs-edit-btn" ) ) {
            const editBtn = document.createElement( "button" );
            editBtn.className = "qs-edit-btn n2tase";
            editBtn.innerHTML = "✏️";
            editBtn.onclick = () => {
                const isEditing = qsContainer.classList.toggle( "qs-editing" );
                editBtn.innerHTML = isEditing ? "✅" : "✏️";
            };
            editBtn.oncontextmenu = ( e: MouseEvent ) => {
                e.preventDefault();
                if ( !qsContainer.classList.contains( "qs-editing" ) ) return;
                const curT = Array.from( qsGrid.querySelectorAll( "[data-qs-id]" ) ).map( ( el: any ) => ( el as HTMLElement ).dataset.qsId );
                const curS = Array.from( slidersContainer.querySelectorAll( "[data-qs-id]" ) ).map( ( el: any ) => ( el as HTMLElement ).dataset.qsId );
                const remT = QS_TOGGLES.filter( ( t: any ) => !curT.includes( t.id ) );
                const remS = defaultSliders.filter( ( s: any ) => !curS.includes( s.id ) );
                if ( remT.length === 0 && remS.length === 0 ) return;
                if ( ( window as any ).ContextMenuManager ) {
                    const addA = [ ...remT.map( ( t: any ) => ( { action: `add-qs-${t.id}`, label: `+ ${t.label}`, icon: t.icon } ) ), ...remS.map( ( s: any ) => ( { action: `add-qs-${s.id}`, label: `+ ${s.label}`, icon: "S" } ) ) ];
                    ( window as any ).ContextMenuManager._renderMenu( [], addA, e.clientX, e.clientY );
                    const origH = ( window as any ).ContextMenuManager.handleAction;
                    ( window as any ).ContextMenuManager.handleAction = ( act: string ) => {
                        if ( act.startsWith( "add-qs-" ) ) {
                            const id = act.replace( "add-qs-", "" ), isS = ( id === "volume" || id === "brightness" );
                            const storage = StorageUtil;
                            const key = isS ? "qs-slider-order" : "xeku1okek-order", ord = storage.get( key, [] );
                            ord.push( id ); storage.set( key, ord ); this._initQuickSettings();
                        } else origH.call( ( window as any ).ContextMenuManager, act );
                        ( window as any ).ContextMenuManager.handleAction = origH;
                    };
                }
            };
            editActions.appendChild( editBtn );
        }

        [ qsGrid, slidersContainer ].forEach( c => this._setupQSDragReorder( c ) );
        this._setupQSContainerDrag( qsContainer );

        if ( QSManager ) QSManager.restoreUI();
    },

    _handleQSClick( e: any, el: HTMLElement ) {
        if ( document.getElementById( "quick-settings-container" )?.classList.contains( "qs-editing" ) ) {
            if ( e.target.tagName === "INPUT" ) return;
            e.preventDefault(); e.stopPropagation();
        } else if ( el.classList.contains( "xeku1okek" ) ) {
            if ( typeof toggleQsButton === "function" ) toggleQsButton( el );
        }
    },

    _removeQSItem( storageKey: string, id: string ) {
        const storage = StorageUtil;
        const ord = storage.get( storageKey, [] ).filter( ( itemId: string ) => itemId !== id );
        storage.set( storageKey, ord ); this._initQuickSettings();
    },

    _setupQSContainerDrag( container: HTMLElement | null ) {
        if ( !container ) return;
        const storage = StorageUtil;
        ( container as any ).onmousedown = ( e: MouseEvent ) => {
            if ( !container.classList.contains( "qs-editing" ) ) return;
            const target = ( e.target as HTMLElement ).closest( "#quick-settings-buttons, #quick-settings-sliders" ) as HTMLElement | null;
            if ( !target || ( e.target as HTMLElement ).tagName === "INPUT" || ( e.target as HTMLElement ).closest( "[data-qs-id]" ) ) return;
            const move = ( ev: any, data: any ) => {
                const hover = document.elementFromPoint( data.x, data.y )?.closest( "#quick-settings-buttons, #quick-settings-sliders" ) as HTMLElement | null;
                if ( hover && hover !== target ) {
                    if ( Array.from( container.children ).indexOf( target ) < Array.from( container.children ).indexOf( hover ) ) hover.after( target );
                    else hover.before( target );
                    storage.set( "qs-container-order", Array.from( container.children ).filter( c => c.id === "quick-settings-buttons" || c.id === "quick-settings-sliders" ).map( c => c.id ) );
                }
            };
            // Use unified input handler
            const InputHandler = ( window as any ).InputHandler;
            if ( InputHandler ) {
                InputHandler.setupDrag( target, null, move, () => {} );
            }
        };
    },

    _setupQSDragReorder( container: HTMLElement | null ) {
        if ( !container ) return;
        const storage = StorageUtil;
        container.addEventListener( "mousedown", ( e: MouseEvent ) => {
            const qsContainer = document.getElementById( "quick-settings-container" );
            if ( !qsContainer?.classList.contains( "qs-editing" ) ) return;
            const item = ( e.target as HTMLElement ).closest( "[data-qs-id]" ) as HTMLElement | null;
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
                storage.set( key, Array.from( container.querySelectorAll( "[data-qs-id]" ) ).map( el => ( el as HTMLElement ).dataset.qsId ) );
            };
            // Use unified input handler
            const InputHandler = ( window as any ).InputHandler;
            if ( InputHandler ) {
                InputHandler.setupDrag( item, null, move, up );
            }
        } );
    },
};

// Attach to window for global access
( window as any ).DesktopIconManager = DesktopIconManager;
( window as any ).APPS = APPS;
