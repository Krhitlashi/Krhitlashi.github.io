// ≺⧼ System ⧽≻ - Main OS Coordination

declare const vab6caja: any;
declare const castifeh2: any;
declare const WindowManager: any;
declare const ContextMenuManager: any;
declare const PanelManager: any;
declare const NotificationManager: any;
declare const ClockManager: any;
declare const DesktopIconManager: any;
declare const QSManager: any;

const System = {
    touch: { startX: 0, startY: 0, endX: 0, endY: 0, active: false },

    // ⟪ Utilities ⟫

    toOctalString( str: any ) {
        if ( !str || typeof vab6caja !== "function" ) return str;
        if ( str.includes( ":" ) ) return str.split( ":" ).map( (p: any) => vab6caja( parseInt( p, 0o10 ) ) || p ).join( "." );
        return vab6caja( parseInt( str, 0o10 ) ) || str;
    },

    updateClock() {
        const el = document.getElementById( "clock" );
        if ( el && typeof castifeh2 === "function" && typeof vab6caja === "function" ) {
            const t = castifeh2( new Date() );
            el.innerText = `${vab6caja( t.she )}.${vab6caja( t.qe )}.${vab6caja( t.he )}`;
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

// ⟪ Bootstrap ⟫

if ( document.readyState === "loading" ) {
    document.addEventListener( "DOMContentLoaded", () => { System.init(); } );
} else {
    System.init();
}

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

// Attach System to window for global access
(window as any).System = System;
