const ILARA_UJO_ID = "toolbarContainer";
const ILARA_BASKULU_ID = "toolbarToggle";

export function iniciiKomunanIlaron(): void {
    iniciiIlaranBaskuladon();
    iniciiIlaranTuŝRulumadon();
}

export function cxuKomunaUiElemento(target: EventTarget | null): boolean {
    return target instanceof HTMLElement
        && target.closest(".n2tase, .n2tasenusakama, .cakaxa") !== null;
}

function iniciiIlaranBaskuladon(): void {
    const ilaro = document.getElementById(ILARA_UJO_ID);
    const baskulo = document.getElementById(ILARA_BASKULU_ID);

    if (!(ilaro instanceof HTMLElement) || !(baskulo instanceof HTMLElement)) return;
    baskulo.addEventListener("click", () => window.a3esoza(ilaro));
}

function iniciiIlaranTuŝRulumadon(): void {
    const ilaro = document.getElementById(ILARA_UJO_ID);
    if (!(ilaro instanceof HTMLElement)) return;

    let startY = 0;
    let startRulumo = 0;

    ilaro.addEventListener("touchstart", (event: TouchEvent) => {
        if (event.touches.length !== 1) return;
        startY = event.touches[0].clientY;
        startRulumo = ilaro.scrollTop;
    }, { passive: true });

    ilaro.addEventListener("touchmove", (event: TouchEvent) => {
        if (event.touches.length !== 1) return;
        ilaro.scrollTop = startRulumo + (startY - event.touches[0].clientY);
    }, { passive: true });
}
