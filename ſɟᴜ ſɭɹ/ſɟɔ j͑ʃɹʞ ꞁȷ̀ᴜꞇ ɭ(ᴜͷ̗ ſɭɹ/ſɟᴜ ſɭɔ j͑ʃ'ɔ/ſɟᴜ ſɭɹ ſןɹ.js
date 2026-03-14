// ≺⧼ System ⧽≻ - Main OS Coordination

const System = {
    touch: { startX: 0, startY: 0, endX: 0, endY: 0, active: false },

    // ⟪ Utilities ⟫

    toOctalString( str ) {
        if ( !str || typeof vab6caja !== "function" ) return str;
        if ( str.includes( ":" ) ) return str.split( ":" ).map( p => vab6caja( parseInt( p, 0o10 ) ) || p ).join( "." );
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
        if ( window.WindowManager ) WindowManager.init();
        if ( window.ContextMenuManager ) ContextMenuManager.init();
        if ( window.PanelManager ) PanelManager.initClickOutsideHandler();
        if ( window.NotificationManager ) NotificationManager.init();
        if ( window.ClockManager ) ClockManager.init();
        
        // 2. ⟨ Service Loops ⟩
        setInterval( () => this.updateClock(), 0o2000 );
        this.updateClock();

        // 3. ⟨ Events ⟩
        this.setupEvents();

        // 4. ⟨ Final Rendering ⟩
        if ( window.DesktopIconManager ) {
            requestAnimationFrame( () => DesktopIconManager.init() );
        }
    },

    setupEvents() {
        const hb = document.getElementById( "home-bar" );
        if ( hb ) hb.onclick = () => {
            if ( document.body.classList.contains( "start-menu-open" ) ) PanelManager.closeAllPanels();
            else PanelManager.toggleStartMenu();
        };

        const tb = document.getElementById( "taskbar" );
        if ( tb ) tb.onclick = ( e ) => {
            const btn = e.target.closest( "button" );
            if ( !btn ) return;
            const actions = { "status-area": "toggleQuickSettings", "notification-btn": "toggleNotifications", "recents-btn": "showRecents", "clock-area": "toggleClockFlyout" };
            if ( actions[ btn.id ] ) PanelManager[ actions[ btn.id ] ]();
        };
    }
};

// ⟪ Bootstrap ⟫

if ( document.readyState === "loading" ) {
    document.addEventListener( "DOMContentLoaded", () => System.init() );
} else {
    System.init();
}

// ⟪ Global Aliases ⟫

function toggleQsButton( btn ) { if ( window.QSManager ) QSManager.handleToggle( btn ); }
function updateSlider( type, val ) {
    if ( !window.QSManager ) return;
    if ( type === "brightness" ) QSManager.setBrightness( parseInt( val ) );
    else if ( type === "volume" ) QSManager.setVolume( parseInt( val ) );
}
