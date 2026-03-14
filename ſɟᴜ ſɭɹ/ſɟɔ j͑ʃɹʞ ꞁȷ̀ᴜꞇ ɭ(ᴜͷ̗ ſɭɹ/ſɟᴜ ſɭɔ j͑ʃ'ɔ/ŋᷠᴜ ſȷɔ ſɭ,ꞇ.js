// ≺⧼ Shared DOM Utilities ⧽≻

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
 * Set the dragging state on the document body
 * @param {boolean} isDragging
 */
function setDraggingState(isDragging) {
    document.body.classList.toggle("is-dragging", isDragging);
}

/**
 * Set aria-pressed state on a button
 * @param {string|HTMLElement} btn - Button ID or element
 * @param {boolean} pressed
 */
function setButtonPressed(btn, pressed) {
    const el = typeof btn === "string" ? document.getElementById(btn) : btn;
    if (el) {
        if (pressed) {
            el.setAttribute("aria-pressed", "true");
        } else {
            el.removeAttribute("aria-pressed");
        }
    }
}

/**
 * Show element with fade-in animation
 * @param {HTMLElement} el
 */
function showWithAnimation(el) {
    el.classList.add("visible");
}

/**
 * Hide element with fade-out animation
 * @param {HTMLElement} el
 * @param {number} duration - Animation duration in ms
 */
function hideWithAnimation(el, duration = 0o300) {
    el.classList.remove("visible");
    setTimeout(() => el.style.display = "none", duration);
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
 * Setup drag and drop event handlers
 * @param {Function} onMove
 * @param {Function} onUp
 */
function setupDragHandlers(onMove, onUp) {
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", onMove);
        onUp();
    });
}

/**
 * Get container dimensions with fallbacks
 * @param {number|null} fixedWidth
 * @param {number|null} fixedHeight
 * @param {HTMLElement} container
 * @returns {{width: number, height: number}}
 */
function getContainerDimensions(fixedWidth, fixedHeight, container) {
    if ( fixedWidth && fixedHeight ) return { width: fixedWidth, height: fixedHeight };

    // Always prefer container client area if available and visible
    if ( container && container.clientWidth > 0 && container.clientHeight > 0 ) {
        return { width: container.clientWidth, height: container.clientHeight };
    }

    // Fallback to measuring the computed style or bounding rect
    if ( container ) {
        const rect = container.getBoundingClientRect();
        if ( rect.width > 0 && rect.height > 0 ) {
            return { width: rect.width, height: rect.height };
        }
    }

    // Ultimate fallback window inner minus panel insets
    const style = getComputedStyle( document.documentElement );
    const iT = parseInt( style.getPropertyValue( '--panel-inset-top' ) ) || 0;
    const iB = parseInt( style.getPropertyValue( '--panel-inset-bottom' ) ) || 0;
    const iL = parseInt( style.getPropertyValue( '--panel-inset-left' ) ) || 0;
    const iR = parseInt( style.getPropertyValue( '--panel-inset-right' ) ) || 0;

    return {
        width: fixedWidth || ( window.innerWidth - iL - iR ) || window.innerWidth,
        height: fixedHeight || ( window.innerHeight - iT - iB ) || window.innerHeight
    };
}

/**
 * Get element span values from dataset
 * @param {HTMLElement} el
 * @returns {{colSpan: number, rowSpan: number}}
 */
function getElementSpans(el) {
    return {
        colSpan: parseInt(el.dataset.colSpan) || 1,
        rowSpan: parseInt(el.dataset.rowSpan) || 1
    };
}

/**
 * Set element span values
 * @param {HTMLElement} el
 * @param {number} colSpan
 * @param {number} rowSpan
 */
function setElementSpans(el, colSpan, rowSpan) {
    el.dataset.colSpan = colSpan;
    el.dataset.rowSpan = rowSpan;
}

/**
 * Get WindowManager with fallback
 * @returns {any|null}
 */
function getWindowManager() {
    return window.WindowManager || (typeof WindowManager !== "undefined" ? WindowManager : null);
}

/**
 * Set element dragging state (class)
 * @param {HTMLElement} el
 * @param {boolean} dragging
 */
function setElementDragging(el, dragging) {
    el.classList.toggle("dragging", dragging);
}

/**
 * Force reflow on element (triggers layout recalculation)
 * @param {HTMLElement} el
 */
function forceReflow( el ) {
    void el.offsetWidth;
}

/**
 * Stop event propagation and default behavior
 * @param {Event} e
 */
function stopEvent( e ) {
    e.preventDefault();
    e.stopPropagation();
}

/**
 * Get element position and span values from dataset
 * @param {HTMLElement} el
 * @returns {{col: number, row: number, colSpan: number, rowSpan: number}}
 */
function getElementPosition( el ) {
    return {
        col: parseInt( el.dataset.col ) || 0,
        row: parseInt( el.dataset.row ) || 0,
        colSpan: parseInt( el.dataset.colSpan ) || 1,
        rowSpan: parseInt( el.dataset.rowSpan ) || 1
    };
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
 * Check if element is within bounds
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {DOMRect} rect - Bounding rectangle
 * @returns {boolean}
 */
function isWithinBounds(x, y, rect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

/**
 * Get element center point
 * @param {HTMLElement} el
 * @returns {{x: number, y: number}}
 */
function getElementCenter(el) {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

/**
 * Clamp a value between min and max
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// ≺⧼ DOM Cache Utility ⧽≻

const DOMCache = {
    _cache: {},

    /**
     * Get element by ID with caching
     * @param {string} id
     * @returns {HTMLElement|null}
     */
    get( id ) {
        if ( !this._cache[ id ] ) {
            this._cache[ id ] = document.getElementById( id );
        }
        return this._cache[ id ];
    },

    /**
     * Clear the cache
     */
    clear() {
        this._cache = {};
    },

    /**
     * Remove specific ID from cache
     * @param {string} id
     */
    remove( id ) {
        delete this._cache[ id ];
    }
};

// ≺⧼ Event Listener Utilities ⧽≻

/**
 * Add event listeners to multiple elements
 * @param {HTMLElement|HTMLElement[]|NodeList} elements
 * @param {string} event
 * @param {Function} handler
 * @param {object} options
 */
function addEventListeners( elements, event, handler, options ) {
    if ( !elements ) return;
    const list = Array.isArray( elements ) ? elements : ( elements instanceof NodeList ? Array.from( elements ) : [ elements ] );
    list.forEach( el => el?.addEventListener( event, handler, options ) );
}

/**
 * Remove event listeners from multiple elements
 * @param {HTMLElement|HTMLElement[]|NodeList} elements
 * @param {string} event
 * @param {Function} handler
 * @param {object} options
 */
function removeEventListeners( elements, event, handler, options ) {
    if ( !elements ) return;
    const list = Array.isArray( elements ) ? elements : ( elements instanceof NodeList ? Array.from( elements ) : [ elements ] );
    list.forEach( el => el?.removeEventListener( event, handler, options ) );
}

/**
 * Add event listener with automatic cleanup
 * @param {HTMLElement} element
 * @param {string} event
 * @param {Function} handler
 * @param {object} options
 * @returns {Function} cleanup function
 */
function addEventListenerOnce( element, event, handler, options ) {
    if ( !element ) return () => {};
    element.addEventListener( event, handler, options );
    return () => element.removeEventListener( event, handler, options );
}

// ≺⧼ Class Toggle Utilities ⧽≻

/**
 * Toggle class on element
 * @param {HTMLElement} el
 * @param {string} className
 * @param {boolean} force
 */
function toggleClass( el, className, force ) {
    if ( !el ) return;
    el.classList.toggle( className, force );
}

/**
 * Add class to element
 * @param {HTMLElement} el
 * @param {string} className
 */
function addClass( el, className ) {
    el?.classList.add( className );
}

/**
 * Remove class from element
 * @param {HTMLElement} el
 * @param {string} className
 */
function removeClass( el, className ) {
    el?.classList.remove( className );
}

/**
 * Check if element has class
 * @param {HTMLElement} el
 * @param {string} className
 * @returns {boolean}
 */
function hasClass( el, className ) {
    return el?.classList.contains( className ) ?? false;
}

/**
 * Set multiple classes on element
 * @param {HTMLElement} el
 * @param {string[]} classNames
 */
function setClasses( el, classNames ) {
    if ( !el ) return;
    el.className = classNames.join( " " );
}

// ≺⧼ String/Text Utilities ⧽≻

/**
 * Split string by delimiter and clean
 * @param {string} str
 * @param {string} delimiter
 * @returns {string[]}
 */
function splitByDelimiter( str, delimiter = " " ) {
    if ( !str ) return [];
    return str.split( delimiter ).map( s => s.trim() ).filter( Boolean );
}

/**
 * Check if string contains any of the terms
 * @param {string} str
 * @param {string[]} terms
 * @returns {boolean}
 */
function containsAny( str, terms ) {
    if ( !str ) return false;
    return terms.some( term => str.includes( term ) );
}

/**
 * Check if string contains all of the terms
 * @param {string} str
 * @param {string[]} terms
 * @returns {boolean}
 */
function containsAll( str, terms ) {
    if ( !str ) return false;
    return terms.every( term => str.includes( term ) );
}

/**
 * Check if string exactly matches any term
 * @param {string} str
 * @param {string[]} terms
 * @returns {boolean}
 */
function exactMatch( str, terms ) {
    if ( !str ) return false;
    return terms.includes( str );
}

/**
 * Escape HTML special characters
 * @param {string} str
 * @returns {string}
 */
function escapeHtml( str ) {
    if ( !str ) return "";
    const div = document.createElement( "div" );
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Truncate string to max length with ellipsis
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
function truncate( str, maxLength = 0o40 ) {
    if ( !str ) return "";
    return str.length > maxLength ? str.slice( 0, maxLength ) + "..." : str;
}

// ≺⧼ Bounds/Object Utilities ⧽≻

/**
 * Get element bounds
 * @param {HTMLElement} el
 * @returns {{left: number, top: number, width: number, height: number, right: number, bottom: number}}
 */
function getBounds( el ) {
    if ( !el ) return { left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0 };
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        right: rect.right,
        bottom: rect.bottom
    };
}

/**
 * Check if two rects overlap
 * @param {DOMRect} rect1
 * @param {DOMRect} rect2
 * @returns {boolean}
 */
function rectsOverlap( rect1, rect2 ) {
    return !( rect1.right < rect2.left ||
              rect1.left > rect2.right ||
              rect1.bottom < rect2.top ||
              rect1.top > rect2.bottom );
}

/**
 * Check if point is within rect
 * @param {number} x
 * @param {number} y
 * @param {DOMRect} rect
 * @returns {boolean}
 */
function pointInRect( x, y, rect ) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

/**
 * Get distance between two points
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
function getDistance( x1, y1, x2, y2 ) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt( dx * dx + dy * dy );
}

/**
 * Get distance from point to line
 * @param {number} px
 * @param {number} py
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
function pointToLineDistance( px, py, x1, y1, x2, y2 ) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if ( lenSq !== 0 ) param = dot / lenSq;

    let xx, yy;

    if ( param < 0 ) {
        xx = x1;
        yy = y1;
    } else if ( param > 1 ) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt( dx * dx + dy * dy );
}

// ≺⧼ Storage Utilities ⧽≻

const Storage = {
    /**
     * Get item from localStorage
     * @param {string} key
     * @param {any} defaultValue
     * @returns {any}
     */
    get( key, defaultValue = null ) {
        try {
            const item = localStorage.getItem( key );
            return item ? JSON.parse( item ) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    /**
     * Set item in localStorage
     * @param {string} key
     * @param {any} value
     */
    set( key, value ) {
        try {
            localStorage.setItem( key, JSON.stringify( value ) );
        } catch ( e ) {
            console.error( "Storage set failed", e );
        }
    },

    /**
     * Remove item from localStorage
     * @param {string} key
     */
    remove( key ) {
        localStorage.removeItem( key );
    },

    /**
     * Clear localStorage
     */
    clear() {
        localStorage.clear();
    },

    /**
     * Get item from sessionStorage
     * @param {string} key
     * @param {any} defaultValue
     * @returns {any}
     */
    getSession( key, defaultValue = null ) {
        try {
            const item = sessionStorage.getItem( key );
            return item ? JSON.parse( item ) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    /**
     * Set item in sessionStorage
     * @param {string} key
     * @param {any} value
     */
    setSession( key, value ) {
        try {
            sessionStorage.setItem( key, JSON.stringify( value ) );
        } catch ( e ) {
            console.error( "SessionStorage set failed", e );
        }
    },

    /**
     * Get item from localStorage merged with defaults
     * @param {string} key
     * @param {object} defaults
     * @returns {object}
     */
    loadWithDefaults( key, defaults ) {
        try {
            const item = localStorage.getItem( key );
            if ( !item ) return { ...defaults };
            const parsed = JSON.parse( item );
            return { ...defaults, ...parsed };
        } catch {
            return { ...defaults };
        }
    },

    /**
     * Update existing stored object with new values
     * @param {string} key
     * @param {object} updates
     * @returns {object} merged result
     */
    saveWithMerge( key, updates ) {
        try {
            const existing = this.get( key, {} );
            const merged = { ...existing, ...updates };
            localStorage.setItem( key, JSON.stringify( merged ) );
            return merged;
        } catch ( e ) {
            console.error( "Storage merge failed", e );
            return updates;
        }
    }
};

// ≺⧼ Debounce/Throttle Utilities ⧽≻

/**
 * Debounce function
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
function debounce( func, wait ) {
    let timeout;
    return function executedFunction( ...args ) {
        const later = () => {
            clearTimeout( timeout );
            func( ...args );
        };
        clearTimeout( timeout );
        timeout = setTimeout( later, wait );
    };
}

/**
 * Throttle function
 * @param {Function} func
 * @param {number} limit
 * @returns {Function}
 */
function throttle( func, limit ) {
    let inThrottle;
    return function( ...args ) {
        if ( !inThrottle ) {
            func.apply( this, args );
            inThrottle = true;
            setTimeout( () => inThrottle = false, limit );
        }
    };
}
