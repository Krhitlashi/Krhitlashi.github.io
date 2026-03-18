// ≺⧼ Input Handler - Unified Touch and Mouse Controls ⧽≻

/* eslint-disable @typescript-eslint/no-explicit-any */

// Runtime: get CONSTANTS from window (loaded by HTML script tag)
const CONSTANTS = (window as any).CONSTANTS;

interface PointerData {
    x?: number;
    y?: number;
    deltaX?: number;
    deltaY?: number;
    handle?: string;
}

interface InputHandlerState {
    isDragging: boolean;
    isResizing: boolean;
    isTouch: boolean;
    activeElement: HTMLElement | null;
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
    startWidth: number;
    startHeight: number;
    offsetX: number;
    offsetY: number;
    dragThreshold: number;
    longPressTimer: number | null;
    longPressDuration: number;
}

const InputHandler = {
    // ⟪ State ⟫
    isDragging: false,
    isResizing: false,
    isTouch: false,
    activeElement: null as HTMLElement | null,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    startWidth: 0,
    startHeight: 0,
    offsetX: 0,
    offsetY: 0,
    dragThreshold: CONSTANTS.INPUT.DRAG_THRESHOLD,
    longPressTimer: null as number | null,
    longPressDuration: CONSTANTS.INPUT.LONG_PRESS_DURATION,

    // ⟪ Event Normalization ⟫
    getPointerPos(e: Event): { x: number; y: number } {
        if (e.type.startsWith("touch")) {
            const touch = (e as TouchEvent).touches?.[0] || (e as TouchEvent).changedTouches?.[0];
            return { x: touch?.clientX || 0, y: touch?.clientY || 0 };
        }
        return { x: (e as MouseEvent).clientX || 0, y: (e as MouseEvent).clientY || 0 };
    },

    isTouchEvent(e: Event): boolean {
        return e.type.startsWith("touch");
    },

    // ⟪ Setup Functions ⟫
    setupDrag(
        element: HTMLElement,
        onStart: ((e: Event, data: PointerData) => void) | null,
        onMove: ((e: Event, data: PointerData) => void) | null,
        onEnd: ((e: Event, data: PointerData) => void) | null
    ): (() => void) | undefined {
        if (!element) return;

        const handleStart = (e: Event) => {
            this.isTouch = this.isTouchEvent(e);
            const pos = this.getPointerPos(e);

            this.startX = pos.x;
            this.startY = pos.y;
            this.activeElement = element;

            if (onStart) onStart(e, { x: pos.x, y: pos.y });

            if (this.isTouch) {
                element.addEventListener("touchmove", handleMove, { passive: false });
                element.addEventListener("touchend", handleEnd);
                element.addEventListener("touchcancel", handleEnd);
            } else {
                element.addEventListener("mousemove", handleMove);
                element.addEventListener("mouseup", handleEnd);
            }
        };

        const handleMove = (e: Event) => {
            if (!this.activeElement) return;
            if (this.isTouch) e.preventDefault();

            const pos = this.getPointerPos(e);
            const deltaX = pos.x - this.startX;
            const deltaY = pos.y - this.startY;

            if (!this.isDragging && Math.abs(deltaX) + Math.abs(deltaY) > this.dragThreshold) {
                this.isDragging = true;
            }

            if (onMove) onMove(e, { x: pos.x, y: pos.y, deltaX, deltaY });
        };

        const handleEnd = (e: Event) => {
            if (!this.activeElement) return;

            const pos = this.getPointerPos(e);
            const deltaX = pos.x - this.startX;
            const deltaY = pos.y - this.startY;

            if (onEnd) onEnd(e, { x: pos.x, y: pos.y, deltaX, deltaY });

            this.cleanup();
        };

        element.addEventListener("mousedown", handleStart);
        element.addEventListener("touchstart", handleStart, { passive: true });

        return () => this.cleanup();
    },

    setupResize(
        element: HTMLElement,
        handle: string,
        onStart: ((e: Event, data: PointerData) => void) | null,
        onMove: ((e: Event, data: PointerData) => void) | null,
        onEnd: ((e: Event, data: PointerData) => void) | null
    ): (() => void) | undefined {
        if (!element) return;

        const handleStart = (e: Event) => {
            e.stopPropagation();
            e.preventDefault();

            this.isTouch = this.isTouchEvent(e);
            const pos = this.getPointerPos(e);

            this.startX = pos.x;
            this.startY = pos.y;
            this.activeElement = element;
            this.isResizing = true;

            if (onStart) onStart(e, { x: pos.x, y: pos.y, handle });

            if (this.isTouch) {
                document.addEventListener("touchmove", handleMove, { passive: false });
                document.addEventListener("touchend", handleEnd);
                document.addEventListener("touchcancel", handleEnd);
            } else {
                document.addEventListener("mousemove", handleMove);
                document.addEventListener("mouseup", handleEnd);
            }
        };

        const handleMove = (e: Event) => {
            if (!this.activeElement || !this.isResizing) return;
            if (this.isTouch) e.preventDefault();

            const pos = this.getPointerPos(e);
            const deltaX = pos.x - this.startX;
            const deltaY = pos.y - this.startY;

            if (onMove) onMove(e, { x: pos.x, y: pos.y, deltaX, deltaY, handle });
        };

        const handleEnd = (e: Event) => {
            if (!this.isResizing) return;

            if (onEnd) onEnd(e, { handle });

            this.isResizing = false;
            this.cleanup();
        };

        element.addEventListener("mousedown", handleStart);
        element.addEventListener("touchstart", handleStart, { passive: false });

        return () => this.cleanup();
    },

    setupTap(
        element: HTMLElement,
        onTap: ((e: Event) => void) | null,
        onLongPress: ((e: Event) => void) | null
    ): void {
        if (!element) return;

        let timer: number | null = null;
        let isTouch = false;

        const handleStart = (e: Event) => {
            isTouch = this.isTouchEvent(e);

            if (isTouch && onLongPress) {
                timer = window.setTimeout(() => {
                    onLongPress(e);
                    timer = null;
                }, this.longPressDuration);
            }
        };

        const handleEnd = (e: Event) => {
            if (timer) {
                window.clearTimeout(timer);
                if (onTap) onTap(e);
            }
            timer = null;
        };

        element.addEventListener("mousedown", handleStart);
        element.addEventListener("mouseup", handleEnd);
        element.addEventListener("touchstart", handleStart, { passive: true });
        element.addEventListener("touchend", handleEnd);
    },

    setupSwipe(
        element: HTMLElement,
        onSwipe: ((direction: string, data: { diffX: number; diffY: number }) => void) | null,
        threshold: number = CONSTANTS.INPUT.SWIPE_THRESHOLD
    ): void {
        if (!element) return;

        let startX = 0;
        let startY = 0;

        const handleStart = (e: Event) => {
            const pos = this.getPointerPos(e);
            startX = pos.x;
            startY = pos.y;
        };

        const handleEnd = (e: Event) => {
            const pos = this.getPointerPos(e);
            const diffX = pos.x - startX;
            const diffY = pos.y - startY;

            if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) return;

            let direction: string;
            if (Math.abs(diffX) > Math.abs(diffY)) {
                direction = diffX > 0 ? "right" : "left";
            } else {
                direction = diffY > 0 ? "down" : "up";
            }

            if (onSwipe) onSwipe(direction, { diffX, diffY });
        };

        element.addEventListener("touchstart", handleStart, { passive: true });
        element.addEventListener("touchend", handleEnd);
    },

    setupPinch(
        element: HTMLElement,
        onPinch: ((scale: number, data: { startDistance: number; currentDistance: number }) => void) | null
    ): void {
        if (!element) return;

        let startDistance = 0;
        let startScale = 1;

        const getDistance = (touches: TouchList): number => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const handleStart = (e: Event) => {
            const touches = (e as TouchEvent).touches;
            if (touches?.length === 2) {
                startDistance = getDistance(touches);
                startScale = 1;
            }
        };

        const handleMove = (e: Event) => {
            const touches = (e as TouchEvent).touches;
            if (touches?.length === 2) {
                e.preventDefault();
                const currentDistance = getDistance(touches);
                const scale = currentDistance / startDistance;

                if (onPinch) onPinch(scale, { startDistance, currentDistance });
            }
        };

        element.addEventListener("touchstart", handleStart, { passive: true });
        element.addEventListener("touchmove", handleMove, { passive: false });
    },

    setupDoubleTap(
        element: HTMLElement,
        onDoubleTap: ((e: Event) => void) | null,
        delay: number = CONSTANTS.INPUT.DOUBLE_TAP_DELAY
    ): void {
        if (!element) return;

        let lastTap = 0;

        const handleTap = (e: Event) => {
            const now = Date.now();
            if (now - lastTap < delay) {
                if (onDoubleTap) onDoubleTap(e);
                e.preventDefault();
            }
            lastTap = now;
        };

        element.addEventListener("click", handleTap);
        element.addEventListener("touchend", handleTap);
    },

    setupPan(
        element: HTMLElement,
        onPan: ((e: Event, data: PointerData) => void) | null,
        onPanStart: ((e: Event) => void) | null,
        onPanEnd: ((e: Event) => void) | null
    ): (() => void) | undefined {
        return this.setupDrag(element, onPanStart, (e, data) => {
            if (onPan) onPan(e, data);
        }, onPanEnd);
    },

    // ⟪ Cleanup ⟫
    cleanup(): void {
        this.isDragging = false;
        this.isResizing = false;
        this.activeElement = null;
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
    },

    // ⟪ Utilities ⟫
    stopEvent(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
    },

    isPointerInElement(x: number, y: number, element: HTMLElement): boolean {
        const rect = element.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    },

    getRelativePointerPos(e: Event, element: HTMLElement): { x: number; y: number } {
        const pos = this.getPointerPos(e);
        const rect = element.getBoundingClientRect();
        return { x: pos.x - rect.left, y: pos.y - rect.top };
    }
};

// ⟪ Global Helpers ⟫
function isDragging(): boolean {
    return InputHandler.isDragging;
}

function isResizing(): boolean {
    return InputHandler.isResizing;
}

function setDraggingState(state: boolean): void {
    InputHandler.isDragging = state;
    document.body.classList.toggle("is-dragging", state);
}

function setResizingState(state: boolean): void {
    InputHandler.isResizing = state;
}

// Attach to window for global access
(window as any).InputHandler = InputHandler;
(window as any).isDragging = isDragging;
(window as any).isResizing = isResizing;
(window as any).setDraggingState = setDraggingState;
(window as any).setResizingState = setResizingState;
