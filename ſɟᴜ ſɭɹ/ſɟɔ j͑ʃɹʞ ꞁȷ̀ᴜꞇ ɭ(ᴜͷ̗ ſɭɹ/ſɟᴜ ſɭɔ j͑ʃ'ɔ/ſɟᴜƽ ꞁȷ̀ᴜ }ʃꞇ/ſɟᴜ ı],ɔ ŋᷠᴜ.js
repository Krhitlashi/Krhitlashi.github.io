// ≺⧼ Bounds Utilities ⧽≻

/**
 * Get container dimensions with fallbacks
 * @param {number|null} fixedWidth
 * @param {number|null} fixedHeight
 * @param {HTMLElement} container
 * @returns {{width: number, height: number}}
 */
function getContainerDimensions(fixedWidth, fixedHeight, container) {
    if (fixedWidth && fixedHeight) return { width: fixedWidth, height: fixedHeight };

    if (container && container.clientWidth > 0 && container.clientHeight > 0) {
        return { width: container.clientWidth, height: container.clientHeight };
    }

    if (container) {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            return { width: rect.width, height: rect.height };
        }
    }

    const style = getComputedStyle(document.documentElement);
    const iT = parseInt(style.getPropertyValue('--panel-inset-top')) || 0;
    const iB = parseInt(style.getPropertyValue('--panel-inset-bottom')) || 0;
    const iL = parseInt(style.getPropertyValue('--panel-inset-left')) || 0;
    const iR = parseInt(style.getPropertyValue('--panel-inset-right')) || 0;

    return {
        width: fixedWidth || (window.innerWidth - iL - iR) || window.innerWidth,
        height: fixedHeight || (window.innerHeight - iT - iB) || window.innerHeight
    };
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
 * Get element bounds
 * @param {HTMLElement} el
 * @returns {{left: number, top: number, width: number, height: number, right: number, bottom: number}}
 */
function getBounds(el) {
    if (!el) return { left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0 };
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
function rectsOverlap(rect1, rect2) {
    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
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
