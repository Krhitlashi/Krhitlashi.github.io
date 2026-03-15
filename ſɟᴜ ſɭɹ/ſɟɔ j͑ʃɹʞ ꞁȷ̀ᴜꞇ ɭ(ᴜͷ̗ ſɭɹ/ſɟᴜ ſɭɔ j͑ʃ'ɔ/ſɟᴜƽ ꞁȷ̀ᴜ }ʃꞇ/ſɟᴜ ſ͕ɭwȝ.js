// ≺⧼ DOM Utilities ⧽≻

/**
 * Get the taskbar element
 * @returns {HTMLElement|null}
 */
function getTaskbar() {
    return document.getElementById("taskbar");
}

/**
 * Get the start menu element
 * @returns {HTMLElement|null}
 */
function getStartMenu() {
    return document.getElementById("start-menu");
}

/**
 * Get the home area element
 * @returns {HTMLElement|null}
 */
function getHomeArea() {
    return document.getElementById("home-area");
}

/**
 * Get the window container element
 * @returns {HTMLElement|null}
 */
function getWindowContainer() {
    return document.getElementById("window-container");
}

/**
 * Get all open windows
 * @returns {NodeList}
 */
function getOpenWindows() {
    return document.querySelectorAll(".window");
}

/**
 * Get taskbar position and orientation info
 * @returns {{pos: string, isVertical: boolean}}
 */
function getTaskbarInfo() {
    const taskbar = getTaskbar();
    const pos = taskbar?.dataset.position || "left";
    return { pos, isVertical: pos === "left" || pos === "right" };
}

/**
 * Check if taskbar is in large mode
 * @returns {boolean}
 */
function isTaskbarLarge() {
    const isVertical = window.innerWidth <= window.innerHeight;
    return isVertical ? window.innerWidth >= 768 : window.innerHeight >= 768;
}

/**
 * Get window title from a window element
 * @param {HTMLElement} win
 * @returns {string}
 */
function getWindowTitle(win) {
    return win.querySelector(".title-bar-title")?.innerText || "App";
}

/**
 * Get app icon from APPS data
 * @param {string} title
 * @returns {string}
 */
function getAppIcon(title) {
    if (typeof APPS === "undefined") return "🖥️";
    const app = APPS.find(a => a.app === title);
    return app?.icon || "🖥️";
}

/**
 * Get language strings
 * @returns {object}
 */
function getStrings() {
    const lang = (typeof kjesaiGawe !== "undefined" ? kjesaiGawe : "aih");
    return (typeof skakefani !== "undefined" && skakefani[lang])
        ? skakefani[lang]
        : (skakefani ? skakefani.en : {});
}

/**
 * Get WindowManager with fallback
 * @returns {any|null}
 */
function getWindowManager() {
    return window.WindowManager || (typeof WindowManager !== "undefined" ? WindowManager : null);
}
