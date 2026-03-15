// ≺⧼ Event Utilities ⧽≻

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
 * Stop event propagation and default behavior
 * @param {Event} e
 */
function stopEvent(e) {
    e.preventDefault();
    e.stopPropagation();
}

/**
 * Add event listeners to multiple elements
 * @param {HTMLElement|HTMLElement[]|NodeList} elements
 * @param {string} event
 * @param {Function} handler
 * @param {object} options
 */
function addEventListeners(elements, event, handler, options) {
    if (!elements) return;
    const list = Array.isArray(elements) ? elements : (elements instanceof NodeList ? Array.from(elements) : [elements]);
    list.forEach(el => el?.addEventListener(event, handler, options));
}

/**
 * Remove event listeners from multiple elements
 * @param {HTMLElement|HTMLElement[]|NodeList} elements
 * @param {string} event
 * @param {Function} handler
 * @param {object} options
 */
function removeEventListeners(elements, event, handler, options) {
    if (!elements) return;
    const list = Array.isArray(elements) ? elements : (elements instanceof NodeList ? Array.from(elements) : [elements]);
    list.forEach(el => el?.removeEventListener(event, handler, options));
}
