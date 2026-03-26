const TOOLBAR_CONTAINER_ID = "toolbarContainer";
const TOOLBAR_TOGGLE_ID = "toolbarToggle";

export function initSharedToolbar(): void {
    initToolbarToggle();
    initToolbarTouchScroll();
}

export function isSharedUiElement(target: EventTarget | null): boolean {
    return target instanceof HTMLElement
        && target.closest(".n2tase, .n2tasenusakama, .cakaxa") !== null;
}

function initToolbarToggle(): void {
    const toolbar = document.getElementById(TOOLBAR_CONTAINER_ID);
    const toggle = document.getElementById(TOOLBAR_TOGGLE_ID);

    if (!(toolbar instanceof HTMLElement) || !(toggle instanceof HTMLElement)) return;
    toggle.addEventListener("click", () => window.a3esoza(toolbar));
}

function initToolbarTouchScroll(): void {
    const toolbar = document.getElementById(TOOLBAR_CONTAINER_ID);
    if (!(toolbar instanceof HTMLElement)) return;

    let startY = 0;
    let startScroll = 0;

    toolbar.addEventListener("touchstart", (event: TouchEvent) => {
        if (event.touches.length !== 1) return;
        startY = event.touches[0].clientY;
        startScroll = toolbar.scrollTop;
    }, { passive: true });

    toolbar.addEventListener("touchmove", (event: TouchEvent) => {
        if (event.touches.length !== 1) return;
        toolbar.scrollTop = startScroll + (startY - event.touches[0].clientY);
    }, { passive: true });
}
