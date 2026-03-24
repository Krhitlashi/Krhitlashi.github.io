// ≺⧼ System ⧽≻ - Main OS Coordination

const System = {
    // ⟪ Utilities ⟫

    toOctalString( str: any ) {
        if ( !str || typeof window.vab6caja !== "function" ) return str;
        if ( str.includes( ":" ) ) return str.split( ":" ).map( (p: any) => window.vab6caja( parseInt( p, 0o10 ) ) || p ).join( "." );
        return window.vab6caja( parseInt( str, 0o10 ) ) || str;
    },

    updateClock() {
        const el = document.getElementById( "clock" );
        if ( el && typeof window.castifeh2 === "function" && typeof window.vab6caja === "function" ) {
            const t = window.castifeh2( new Date() );
            el.innerText = `${window.vab6caja( t.she )}.${window.vab6caja( t.qe )}.${window.vab6caja( t.he )}`;
        }
    },

    // ⟪ Initialization ⟫

    init() {
        // 1. ⟨ Essential Managers ⟩
        if ( (window as any).WindowManager ) (window as any).WindowManager.init();
        if ( (window as any).ContextMenuManager ) (window as any).ContextMenuManager.init();
        if ( (window as any).PanelManager ) (window as any).PanelManager.initClickOutsideHandler();
        if ( (window as any).NotificationManager ) (window as any).NotificationManager.init();
        if ( (window as any).ClockManager ) (window as any).ClockManager.init();

        // 2. ⟨ Service Loops ⟩
        setInterval( () => this.updateClock(), 0o2000 );
        this.updateClock();

        // 3. ⟨ Events ⟩
        this.setupEvents();

        // 4. ⟨ Final Rendering ⟩
        if ( (window as any).DesktopIconManager ) {
            requestAnimationFrame( () => (window as any).DesktopIconManager.init() );
        }
    },

    setupEvents() {
        const hb = document.getElementById( "home-bar" );
        if ( hb ) hb.onclick = () => {
            if ( document.body.classList.contains( "start-menu-open" ) ) (window as any).PanelManager.closeAllPanels();
            else (window as any).PanelManager.toggleStartMenu();
        };

        const tb = document.getElementById( "taskbar" );
        if ( tb ) tb.onclick = ( e: any ) => {
            const btn = (e.target as HTMLElement).closest( "button" );
            if ( !btn ) return;
            const actions: { [key: string]: string } = { "status-area": "toggleQuickSettings", "notification-btn": "toggleNotifications", "recents-btn": "showRecents", "clock-area": "toggleClockFlyout" };
            if ( actions[ btn.id ] ) ((window as any).PanelManager as any)[ actions[ btn.id ] ]();
        };
    }
};

// ⟪ Global Aliases ⟫

function toggleQsButton( btn: any ) { if ( (window as any).QSManager ) (window as any).QSManager.handleToggle( btn ); }
function updateSlider( type: any, val: any ) {
    if ( !(window as any).QSManager ) return;
    if ( type === "brightness" ) (window as any).QSManager.setBrightness( parseInt( val ) );
    else if ( type === "volume" ) (window as any).QSManager.setVolume( parseInt( val ) );
}

// Attach to window for global access
(window as any).toggleQsButton = toggleQsButton;
(window as any).updateSlider = updateSlider;
(window as any).System = System;
