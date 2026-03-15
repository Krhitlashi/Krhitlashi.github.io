// ≺⧼ Drag & Resize Utilities ⧽≻

/**
 * Create a drag handler for elements
 * @param {HTMLElement} element - Element being dragged
 * @param {object} callbacks - Callback functions
 * @param {Function} callbacks.onStart - Called when drag starts
 * @param {Function} callbacks.onMove - Called during drag (newX, newY)
 * @param {Function} callbacks.onEnd - Called when drag ends
 * @returns {object} Handler functions
 */
function createDragHandler(element, callbacks) {
    let startX, startY, shiftX, shiftY;
    let isDragging = false;

    const onStart = (e) => {
        const rect = element.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

        startX = clientX;
        startY = clientY;
        shiftX = clientX - rect.left;
        shiftY = clientY - rect.top;
        isDragging = true;

        if (callbacks.onStart) callbacks.onStart();

        const moveHandler = (ev) => {
            if (!isDragging) return;
            ev.preventDefault();

            const cx = ev.clientX || (ev.touches && ev.touches[0].clientX) || 0;
            const cy = ev.clientY || (ev.touches && ev.touches[0].clientY) || 0;

            if (callbacks.onMove) {
                callbacks.onMove(cx - shiftX, cy - shiftY);
            }
        };

        const endHandler = () => {
            isDragging = false;
            document.removeEventListener("mousemove", moveHandler);
            document.removeEventListener("mouseup", endHandler);
            document.removeEventListener("touchmove", moveHandler);
            document.removeEventListener("touchend", endHandler);

            if (callbacks.onEnd) callbacks.onEnd();
        };

        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", endHandler);
        document.addEventListener("touchmove", moveHandler, { passive: false });
        document.addEventListener("touchend", endHandler);
    };

    return { onStart };
}

/**
 * Create a resize handler for elements
 * @param {HTMLElement} element - Element being resized
 * @param {string} handle - Resize handle direction (n, s, e, w, ne, nw, se, sw)
 * @param {object} constraints - Size constraints
 * @param {number} constraints.minWidth - Minimum width
 * @param {number} constraints.minHeight - Minimum height
 * @param {Function} onResizeStart - Called when resize starts
 * @param {Function} onResize - Called during resize
 * @param {Function} onResizeEnd - Called when resize ends
 * @returns {Function} Start handler
 */
function createResizeHandler(element, handle, constraints = {}, onResizeStart, onResize, onResizeEnd) {
    const minW = constraints.minWidth || 0o460;
    const minH = constraints.minHeight || 0o310;

    let startX, startY;
    let startLeft, startTop, startWidth, startHeight, startRight, startBottom;
    let offsetX = 0, offsetY = 0;
    let isResizing = false;

    const onStart = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const rect = element.getBoundingClientRect();
        startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
        startLeft = element.offsetLeft;
        startTop = element.offsetTop;
        startWidth = element.offsetWidth;
        startHeight = element.offsetHeight;
        startRight = startLeft + startWidth;
        startBottom = startTop + startHeight;

        offsetX = handle.includes('w') ? startX - rect.left : 0;
        offsetY = handle.includes('n') ? startY - rect.top : 0;
        isResizing = true;

        if (onResizeStart) onResizeStart();

        const doResize = (clientX, clientY) => {
            const dx = clientX - startX;
            const dy = clientY - startY;

            let newLeft = startLeft, newTop = startTop, newRight = startRight, newBottom = startBottom;

            if (handle.includes('w')) {
                newLeft = startLeft + dx + offsetX;
            } else if (handle.includes('e')) {
                newRight = startRight + dx;
            }
            if (handle.includes('n')) {
                newTop = startTop + dy + offsetY;
            } else if (handle.includes('s')) {
                newBottom = startBottom + dy;
            }

            const finalWidth = Math.max(minW, newRight - newLeft);
            const finalHeight = Math.max(minH, newBottom - newTop);

            if (onResize) {
                onResize(newLeft, newTop, finalWidth, finalHeight);
            }
        };

        const stopResize = () => {
            isResizing = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchUp);

            if (onResizeEnd) onResizeEnd();
        };

        const onMouseMove = (ev) => doResize(ev.clientX, ev.clientY);
        const onMouseUp = stopResize;
        const onTouchMove = (ev) => {
            ev.preventDefault();
            const touch = ev.touches[0];
            doResize(touch.clientX, touch.clientY);
        };
        const onTouchUp = stopResize;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("touchmove", onTouchMove, { passive: false });
        document.addEventListener("touchend", onTouchUp);
    };

    return onStart;
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
