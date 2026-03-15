// ≺⧼ Element Utilities ⧽≻

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
function forceReflow(el) {
    void el.offsetWidth;
}

/**
 * Get element position and span values from dataset
 * @param {HTMLElement} el
 * @returns {{col: number, row: number, colSpan: number, rowSpan: number}}
 */
function getElementPosition(el) {
    return {
        col: parseInt(el.dataset.col) || 0,
        row: parseInt(el.dataset.row) || 0,
        colSpan: parseInt(el.dataset.colSpan) || 1,
        rowSpan: parseInt(el.dataset.rowSpan) || 1
    };
}

/**
 * Toggle class on element
 * @param {HTMLElement} el
 * @param {string} className
 * @param {boolean} force
 */
function toggleClass(el, className, force) {
    if (!el) return;
    el.classList.toggle(className, force);
}

/**
 * Add class to element
 * @param {HTMLElement} el
 * @param {string} className
 */
function addClass(el, className) {
    el?.classList.add(className);
}

/**
 * Remove class from element
 * @param {HTMLElement} el
 * @param {string} className
 */
function removeClass(el, className) {
    el?.classList.remove(className);
}

/**
 * Check if element has class
 * @param {HTMLElement} el
 * @param {string} className
 * @returns {boolean}
 */
function hasClass(el, className) {
    return el?.classList.contains(className) ?? false;
}
