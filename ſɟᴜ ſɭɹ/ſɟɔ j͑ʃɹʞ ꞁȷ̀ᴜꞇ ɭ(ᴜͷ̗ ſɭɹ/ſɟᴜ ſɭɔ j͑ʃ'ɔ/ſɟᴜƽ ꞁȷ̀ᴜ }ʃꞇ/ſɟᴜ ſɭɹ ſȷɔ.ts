// ≺⧼ Math Utilities ⧽≻

/**
 * Clamp a value between min and max
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp( value: number, min: number, max: number ): number {
    return Math.max( min, Math.min( max, value ) );
}

/**
 * Debounce function
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
function debounce<T extends ( ...args: any[] ) => void>( func: T, wait: number ): ( ...args: Parameters<T> ) => void {
    let timeout: any;
    return function executedFunction( ...args: Parameters<T> ) {
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
function throttle<T extends ( ...args: any[] ) => void>( func: T, limit: number ): ( ...args: Parameters<T> ) => void {
    let inThrottle: any;
    return function ( this: any, ...args: Parameters<T> ) {
        if ( !inThrottle ) {
            func.apply( this, args );
            inThrottle = true;
            setTimeout( () => inThrottle = false, limit );
        }
    };
}

// Attach to window for global access
( window as any ).clamp = clamp;
( window as any ).debounce = debounce;
( window as any ).throttle = throttle;
