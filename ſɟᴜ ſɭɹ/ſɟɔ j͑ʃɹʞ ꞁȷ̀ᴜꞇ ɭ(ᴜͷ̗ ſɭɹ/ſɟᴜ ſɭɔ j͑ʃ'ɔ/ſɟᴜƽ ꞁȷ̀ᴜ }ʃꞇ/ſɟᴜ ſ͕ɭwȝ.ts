// ≺⧼ DOM Utilities ⧽≻

/* eslint-disable @typescript-eslint/no-explicit-any */

declare const CONSTANTS: any;
declare const APPS: any;
declare const kjesaiGawe: any;
declare const skakefani: any;
declare const WindowManager: any;

interface TaskbarInfo {
    pos: string;
    isVertical: boolean;
}

/**
 * Get the taskbar element
 * @returns {HTMLElement|null}
 */
function getTaskbar(): HTMLElement | null {
    return document.getElementById( "taskbar" );
}

// Attach to window for global access
( window as any ).getTaskbar = getTaskbar;

/**
 * Get the start menu element
 * @returns {HTMLElement|null}
 */
function getStartMenu(): HTMLElement | null {
    return document.getElementById( "start-menu" );
}

/**
 * Get the home area element
 * @returns {HTMLElement|null}
 */
function getHomeArea(): HTMLElement | null {
    return document.getElementById( "home-area" );
}

/**
 * Get the window container element
 * @returns {HTMLElement|null}
 */
function getWindowContainer(): HTMLElement | null {
    return document.getElementById( "window-container" );
}

/**
 * Get all open windows
 * @returns {NodeList}
 */
function getOpenWindows(): NodeListOf<HTMLElement> {
    return document.querySelectorAll( ".window" );
}

/**
 * Get taskbar position and orientation info
 * @returns {{pos: string, isVertical: boolean}}
 */
function getTaskbarInfo(): TaskbarInfo {
    const taskbar = getTaskbar();
    const pos = taskbar?.dataset.position || "left";
    return { pos, isVertical: pos === "left" || pos === "right" };
}

/**
 * Check if taskbar is in large mode
 * @returns {boolean}
 */
function isTaskbarLarge(): boolean {
    const isVertical = window.innerWidth <= window.innerHeight;
    return isVertical ? window.innerWidth >= CONSTANTS.BREAKPOINTS.MOBILE : window.innerHeight >= CONSTANTS.BREAKPOINTS.MOBILE;
}

/**
 * Get window title from a window element
 * @param {HTMLElement} win
 * @returns {string}
 */
function getWindowTitle( win: HTMLElement ): string {
    return ( win.querySelector( ".title-bar-title" ) as HTMLElement )?.innerText || "App";
}

/**
 * Get app icon from APPS data
 * @param {string} title
 * @returns {string}
 */
function getAppIcon( title: string ): string {
    if ( typeof APPS === "undefined" ) return "🖥️";
    const app = ( APPS as any[] ).find( ( a: any ) => a.app === title );
    return app?.icon || "🖥️";
}

/**
 * Get language strings
 * @returns {object}
 */
function getStrings(): { [key: string]: string } {
    const lang = ( typeof kjesaiGawe !== "undefined" ? kjesaiGawe : "aih" );
    return ( typeof skakefani !== "undefined" && ( skakefani as any )[ lang ] )
        ? ( skakefani as any )[ lang ]
        : ( skakefani ? ( skakefani as any ).en : {} );
}

/**
 * Get WindowManager with fallback
 * @returns {any|null}
 */
function getWindowManager(): any {
    return ( window as any ).WindowManager || ( typeof WindowManager !== "undefined" ? WindowManager : null );
}

// Attach all utilities to window for global access
( window as any ).getStartMenu = getStartMenu;
( window as any ).getHomeArea = getHomeArea;
( window as any ).getWindowContainer = getWindowContainer;
( window as any ).getOpenWindows = getOpenWindows;
( window as any ).getTaskbarInfo = getTaskbarInfo;
( window as any ).isTaskbarLarge = isTaskbarLarge;
( window as any ).getWindowTitle = getWindowTitle;
( window as any ).getAppIcon = getAppIcon;
( window as any ).getStrings = getStrings;
( window as any ).getWindowManager = getWindowManager;
