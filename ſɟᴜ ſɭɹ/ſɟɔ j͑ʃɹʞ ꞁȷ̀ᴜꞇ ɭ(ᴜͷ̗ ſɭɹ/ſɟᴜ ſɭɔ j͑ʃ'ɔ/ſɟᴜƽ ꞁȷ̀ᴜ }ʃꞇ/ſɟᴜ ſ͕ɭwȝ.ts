// ≺⧼ DOM Utilities ⧽≻

declare const CONSTANTS: any;
declare const APPS: any;
declare const kjesaiGawe: any;
declare const skakefani: any;
declare const WindowManager: any;

interface TaskbretoInfo {
    pos: string;
    isVertical: boolean;
}

/**
 * Get the taskbar element
 * @returns {HTMLElement|null}
 */
function akiriTaskobreton(): HTMLElement | null {
    return document.getElementById( "taskbar" );
}

// Attach to window for global access
( window as any ).getTaskbar = akiriTaskobreton;

/**
 * Get the start menu element
 * @returns {HTMLElement|null}
 */
function akiriKomencanMenuon(): HTMLElement | null {
    return document.getElementById( "start-menu" );
}

/**
 * Get the home area element
 * @returns {HTMLElement|null}
 */
function akiriHejmanAreon(): HTMLElement | null {
    return document.getElementById( "home-area" );
}

/**
 * Get the window container element
 * @returns {HTMLElement|null}
 */
function akiriFenestranUjon(): HTMLElement | null {
    return document.getElementById( "window-container" );
}

/**
 * Get all open windows
 * @returns {NodeList}
 */
function akiriMalfermajnFenestrojn(): NodeListOf<HTMLElement> {
    return document.querySelectorAll( ".window" );
}

/**
 * Get taskbar position and orientation info
 * @returns {{pos: string, isVertical: boolean}}
 */
function akiriTaskbretonInfo(): TaskbretoInfo {
    const taskbar = akiriTaskobreton();
    const pos = taskbar?.dataset.position || "left";
    return { pos, isVertical: pos === "left" || pos === "right" };
}

/**
 * Check if taskbar is in large mode
 * @returns {boolean}
 */
function cxuTaskbretoGranda(): boolean {
    const isVertical = window.innerWidth <= window.innerHeight;
    return isVertical ? window.innerWidth >= CONSTANTS.BREAKPOINTS.MOBILE : window.innerHeight >= CONSTANTS.BREAKPOINTS.MOBILE;
}

/**
 * Get window title from a window element
 * @param {HTMLElement} win
 * @returns {string}
 */
function akiriFenestranTitolon( win: HTMLElement ): string {
    return ( win.querySelector( ".title-bar-title" ) as HTMLElement )?.innerText || "App";
}

/**
 * Get app icon from APPS data
 * @param {string} title
 * @returns {string}
 */
function akiriAplikoPiktogramon( title: string ): string {
    if ( typeof APPS === "undefined" ) return "🖥️";
    const app = ( APPS as any[] ).find( ( a: any ) => a.app === title );
    return app?.icon || "🖥️";
}

/**
 * Get language strings
 * @returns {object}
 */
function akiriTextojn(): { [key: string]: string } {
    const lang = ( typeof kjesaiGawe !== "undefined" ? kjesaiGawe : "aih" );
    return ( typeof skakefani !== "undefined" && ( skakefani as any )[ lang ] )
        ? ( skakefani as any )[ lang ]
        : ( skakefani ? ( skakefani as any ).en : {} );
}

/**
 * Get WindowManager with fallback
 * @returns {any|null}
 */
function akiriFenestranAdministranton(): any {
    return ( window as any ).WindowManager || ( typeof WindowManager !== "undefined" ? WindowManager : null );
}

// Attach all utilities to window for global access
( window as any ).getStartMenu = akiriKomencanMenuon;
( window as any ).getHomeArea = akiriHejmanAreon;
( window as any ).getWindowContainer = akiriFenestranUjon;
( window as any ).getOpenWindows = akiriMalfermajnFenestrojn;
( window as any ).getTaskbarInfo = akiriTaskbretonInfo;
( window as any ).isTaskbarLarge = cxuTaskbretoGranda;
( window as any ).getWindowTitle = akiriFenestranTitolon;
( window as any ).getAppIcon = akiriAplikoPiktogramon;
( window as any ).getStrings = akiriTextojn;
( window as any ).getWindowManager = akiriFenestranAdministranton;
