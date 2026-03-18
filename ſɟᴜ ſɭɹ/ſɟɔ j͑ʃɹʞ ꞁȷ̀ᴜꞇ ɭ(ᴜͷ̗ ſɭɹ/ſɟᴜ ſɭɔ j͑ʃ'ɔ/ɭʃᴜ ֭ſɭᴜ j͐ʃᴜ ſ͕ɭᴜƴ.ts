// ≺⧼ Animation Manager ⧽≻ - Taskbar-directional animations with octal fractions

/* eslint-disable @typescript-eslint/no-explicit-any */

declare const CONSTANTS: any;
declare const getTaskbar: any;

const AnimationManager: {
    defaults: { duration: number; easing: string };
    easings: any;
    [key: string]: any;
} = {
    // ⟪ Default Animation Settings ⟫
    defaults: {
        duration: CONSTANTS.ANIM.DURATION_DEFAULT,
        easing: CONSTANTS.ANIM.EASINGS.ease
    },

    // ⟪ Easing Functions ⟫
    easings: CONSTANTS.ANIM.EASINGS,

    // ⟪ Position Utilities ⟫

    // Get complete position configuration for a taskbar position
    getPositionConfig(pos: any = null): any {
        const taskbar: HTMLElement | null = getTaskbar();
        const position: string = pos || taskbar?.dataset.position || "left";

        const transforms: { [key: string]: { slide: string; offset: string; axis: string; invert: number } } = {
            top: { slide: "translateY(-100%)", offset: "translateY({offset}px)", axis: "Y", invert: -1 },
            bottom: { slide: "translateY(100%)", offset: "translateY(-{offset}px)", axis: "Y", invert: -1 },
            left: { slide: "translateX(-100%)", offset: "translateX({offset}px)", axis: "X", invert: 1 },
            right: { slide: "translateX(100%)", offset: "translateX(-{offset}px)", axis: "X", invert: 1 }
        };

        const cfg = transforms[position] || transforms.bottom;

        return {
            position,
            slideTransform: cfg.slide,
            offsetTransform: cfg.offset,
            axis: cfg.axis,
            invert: cfg.invert,
            insetProp: position
        };
    },

    // ⟪ Get Panel Animation Direction Based on Taskbar ⟫

    // All panels slide out from the taskbar edge
    getPanelDirection(panelId: string): { from: string; to: string } {
        const { position } = this.getPositionConfig();
        // All panels share the same directional logic — slide from taskbar edge
        return { from: position, to: position };
    },

    // ⟪ Get Transform for Direction ⟫

    getDirectionTransform(direction: string, fraction: number = 1): string {
        const { slideTransform } = this.getPositionConfig(direction);
        // Apply fraction to the percentage
        const percentage: number = fraction * 100;
        const transforms: { [key: string]: string } = {
            top: `translateY(-${percentage}%)`,
            bottom: `translateY(${percentage}%)`,
            left: `translateX(-${percentage}%)`,
            right: `translateX(${percentage}%)`
        };
        return transforms[direction] || transforms.bottom;
    },

    // ⟪ Get Taskbar Edge Offset ⟫

    getTaskbarOffset(fraction: number = 1): { transform: string; inset: { [key: string]: string } } {
        const { position, offsetTransform, insetProp } = this.getPositionConfig();
        const tbSize: number = parseInt(getComputedStyle(document.documentElement).getPropertyValue(CONSTANTS.CSS_VARS.taskbarSize)) || CONSTANTS.SYS.TASKBAR_SIZE;
        const offset: number = tbSize * fraction;

        return {
            transform: offsetTransform.replace("{offset}", offset.toString()),
            inset: { [insetProp]: `${offset}px` }
        };
    },

    // ⟪ Get Taskbar Size for Position ⟫

    getTaskbarSizeForPosition(pos: any = null, fraction: number = 1): { position: string; size: number; offset: number } {
        const { position } = this.getPositionConfig(pos);
        const tbSize: number = parseInt(getComputedStyle(document.documentElement).getPropertyValue(CONSTANTS.CSS_VARS.taskbarSize)) || CONSTANTS.SYS.TASKBAR_SIZE;
        return {
            position,
            size: tbSize,
            offset: tbSize * fraction
        };
    },

    // ⟪ Fade In ⟫

    fadeIn(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.defaults.duration;
        const easing: string = options.easing ?? this.defaults.easing;

        element.style.opacity = "0";
        element.style.display = options.display || "flex";
        element.style.pointerEvents = "none";

        void element.offsetWidth;

        return element.animate(
            [
                { opacity: 0 },
                { opacity: 1 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.opacity = "";
            element.style.pointerEvents = "";
        });
    },

    // ⟪ Fade Out ⟫

    fadeOut(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.defaults.duration;
        const easing: string = options.easing ?? this.defaults.easing;

        element.style.pointerEvents = "none";

        return element.animate(
            [
                { opacity: 1 },
                { opacity: 0 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.display = "none";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        });
    },

    // ⟪ Slide Panel ( Unified Internal Method ) ⟫

    slidePanel(
        element: HTMLElement,
        panelId: string,
        isEntering: boolean,
        options: any = {}
    ): Promise<void> {
        if (!element) return Promise.resolve();

        const { duration, easing, fraction = 1 } = options;
        const direction = this.getPanelDirection(panelId);
        const edge = isEntering ? direction.from : direction.to;

        const baseTransform: string = element.style.transform && element.style.transform !== "none" ? element.style.transform : "";
        const slideTransform: string = this.getDirectionTransform(edge, fraction);
        
        const startTransform: string = isEntering ? `${baseTransform} ${slideTransform}`.trim() : (baseTransform || "translate(0, 0)");
        const endTransform: string = isEntering ? (baseTransform || "translate(0, 0)") : `${baseTransform} ${slideTransform}`.trim();

        element.style.display = options.display || "flex";
        element.style.transform = startTransform;
        element.style.opacity = isEntering ? "0" : "1";
        element.style.pointerEvents = "none";

        void element.offsetWidth;

        return element.animate(
            [
                { transform: startTransform, opacity: isEntering ? 0 : 1 },
                { transform: endTransform, opacity: isEntering ? 1 : 0 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.transform = baseTransform;
            element.style.opacity = "";
            element.style.pointerEvents = "";
            if (!isEntering) element.style.display = "none";
        });
    },

    // ⟪ Slide In From Taskbar Edge ⟫

    slideInFromTaskbar(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.defaults.duration;
        const easing: string = options.easing ?? this.easings.easeOut;
        const fraction: number = options.fraction ?? 1;

        return this.slidePanel(element, panelId, true, { duration, easing, fraction, display: options.display });
    },

    // ⟪ Slide Out To Taskbar Edge ⟫

    slideOutToTaskbar(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.defaults.duration;
        const easing: string = options.easing ?? this.easings.easeIn;
        const fraction: number = options.fraction ?? 1;

        return this.slidePanel(element, panelId, false, { duration, easing, fraction, display: options.display });
    },

    // ⟪ Slide In ( from edge ) ⟫

    slideIn(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.defaults.duration;
        const easing: string = options.easing ?? this.easings.easeOut;
        const fromEdge: string = options.fromEdge || "bottom";
        const distance: string = options.distance || "100%";

        const startTransform: string = this.getDirectionTransform(fromEdge.replace("%", ""), 1);

        element.style.display = options.display || "flex";
        element.style.transform = startTransform;
        element.style.opacity = "0";
        element.style.pointerEvents = "none";

        void element.offsetWidth;

        return element.animate(
            [
                { transform: startTransform, opacity: 0 },
                { transform: "translate(0, 0)", opacity: 1 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        });
    },

    // ⟪ Slide Out ( to edge ) ⟫

    slideOut(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.defaults.duration;
        const easing: string = options.easing ?? this.easings.easeIn;
        const toEdge: string = options.toEdge || "bottom";
        const distance: string = options.distance || "100%";

        const endTransform: string = this.getDirectionTransform(toEdge.replace("%", ""), 1);

        element.style.pointerEvents = "none";

        return element.animate(
            [
                { transform: "translate(0, 0)", opacity: 1 },
                { transform: endTransform, opacity: 0 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.display = "none";
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        });
    },

    // ⟪ Scale In ( pop effect ) ⟫

    scaleIn(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.defaults.duration;
        const easing: string = options.easing ?? this.easings.spring;
        const fromScale: number = options.fromScale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths;

        element.style.display = options.display || "flex";
        element.style.transform = `scale(${fromScale})`;
        element.style.opacity = "0";
        element.style.pointerEvents = "none";

        void element.offsetWidth;

        return element.animate(
            [
                { transform: `scale(${fromScale})`, opacity: 0 },
                { transform: "scale(1)", opacity: 1 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        });
    },

    // ⟪ Scale Out ( shrink effect ) ⟫

    scaleOut(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.defaults.duration;
        const easing: string = options.easing ?? this.easings.easeIn;
        const toScale: number = options.toScale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths;

        element.style.pointerEvents = "none";

        return element.animate(
            [
                { transform: "scale(1)", opacity: 1 },
                { transform: `scale(${toScale})`, opacity: 0 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.display = "none";
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        });
    },

    // ⟪ Window Open Animation ( slide + fade from taskbar ) ⟫

    windowOpen(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? CONSTANTS.ANIM.DURATION_LONG;
        const easing: string = options.easing ?? this.easings.easeOut;
        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.oneEighth;
        const scale: number = options.scale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths;

        // Get taskbar position and offset
        const { position, offset } = this.getTaskbarSizeForPosition(null, fraction);

        // Calculate offset based on taskbar position
        const offsets: { [key: string]: string } = {
            left: `translateX(${offset}px) translateY(-20px)`,
            right: `translateX(-${offset}px) translateY(-20px)`,
            top: `translateY(${offset}px)`,
            bottom: `translateY(-${offset}px)`
        };

        const startTransform: string = offsets[position] || offsets.bottom;

        element.style.display = "block";
        element.style.transform = startTransform + ` scale(${scale})`;
        element.style.opacity = "0";

        void element.offsetWidth;

        return element.animate(
            [
                { transform: startTransform + ` scale(${scale})`, opacity: 0 },
                { transform: "scale(1)", opacity: 1 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.transform = "";
            element.style.opacity = "";
        });
    },

    // ⟪ Window Close Animation ( scale down + fade toward taskbar ) ⟫

    windowClose(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? CONSTANTS.ANIM.DURATION_SHORT;
        const easing: string = options.easing ?? this.easings.easeIn;
        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.oneEighth;
        const scale: number = options.scale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths;

        // Get taskbar position and offset
        const { position, offset } = this.getTaskbarSizeForPosition(null, fraction);

        // Calculate end transform toward taskbar
        const offsets: { [key: string]: string } = {
            left: `translateX(${offset}px) translateY(8px)`,
            right: `translateX(-${offset}px) translateY(8px)`,
            top: `translateY(${offset}px)`,
            bottom: `translateY(-${offset}px)`
        };

        const endTransform: string = offsets[position] || offsets.bottom;

        element.style.pointerEvents = "none";

        return element.animate(
            [
                { transform: "scale(1)", opacity: 1 },
                { transform: endTransform + ` scale(${scale})`, opacity: 0 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.display = "none";
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        });
    },

    // ⟪ Minimize Window Animation ( scale into taskbar ) ⟫

    minimizeWindow(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? CONSTANTS.ANIM_SETTINGS.windowMinimize.duration;
        const easing: string = options.easing ?? CONSTANTS.ANIM_SETTINGS.windowMinimize.easing;
        const scale: number = options.scale ?? CONSTANTS.ANIM_SETTINGS.windowMinimize.scale;

        // Get taskbar position and size
        const { position } = this.getPositionConfig();
        const taskbar: HTMLElement | null = getTaskbar();
        const tbRect: DOMRect = taskbar?.getBoundingClientRect() || { left: 0, top: window.innerHeight, right: window.innerWidth, bottom: window.innerHeight, width: window.innerWidth, height: 0, x: 0, y: window.innerHeight, toJSON() { return {}; } };
        const winRect: DOMRect = element.getBoundingClientRect();

        // Calculate the center point of the window
        const winCenterX: number = winRect.left + winRect.width / 2;
        const winCenterY: number = winRect.top + winRect.height / 2;

        // Calculate target point on taskbar
        let targetX: number, targetY: number;
        switch (position) {
            case "left":
                targetX = tbRect.right;
                targetY = winCenterY;
                break;
            case "right":
                targetX = tbRect.left;
                targetY = winCenterY;
                break;
            case "top":
                targetX = winCenterX;
                targetY = tbRect.bottom;
                break;
            case "bottom":
            default:
                targetX = winCenterX;
                targetY = tbRect.top;
                break;
        }

        // Calculate translation distance
        const translateX: number = targetX - winCenterX;
        const translateY: number = targetY - winCenterY;

        element.style.pointerEvents = "none";

        return element.animate(
            [
                { transform: "scale(1)", opacity: 1 },
                { transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`, opacity: 0 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        });
    },

    // ⟪ Maximize Window Animation ⟫

    maximizeWindow(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.duration;
        const easing: string = options.easing ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.easing;
        const fromScale: number = options.fromScale ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.scale;

        return element.animate(
            [
                { transform: `scale(${fromScale})`, opacity: CONSTANTS.ANIM.FRACTIONS.sixEighths },
                { transform: "scale(1)", opacity: 1 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.transform = "";
            element.style.opacity = "";
        });
    },

    // ⟪ Restore from Maximize Animation ⟫

    unmaximizeWindow(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.duration;
        const easing: string = options.easing ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.easing;
        const toScale: number = options.toScale ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.scale;

        return element.animate(
            [
                { transform: "scale(1)", opacity: 1 },
                { transform: `scale(${toScale})`, opacity: CONSTANTS.ANIM.FRACTIONS.sixEighths }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.transform = "";
            element.style.opacity = "";
        });
    },

    // ⟪ Restore Window Animation ( from minimized ) ⟫

    restoreWindow(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? CONSTANTS.ANIM.DURATION_DEFAULT;
        const easing: string = options.easing ?? this.easings.spring;
        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.oneEighth;

        element.style.display = "block";
        element.style.transform = `scale(${fraction})`;
        element.style.opacity = "0";

        void element.offsetWidth;

        return element.animate(
            [
                { transform: `scale(${fraction})`, opacity: 0 },
                { transform: "scale(1)", opacity: 1 }
            ],
            { duration, easing }
        ).finished.then(() => {
            element.style.transform = "";
            element.style.opacity = "";
        });
    },

    // ⟪ Ripple Effect ( for buttons ) ⟫

    ripple(element: HTMLElement, event: MouseEvent, options: any = {}): void {
        if (!element) return;

        const duration: number = options.duration ?? CONSTANTS.ANIM.DURATION_DEFAULT;
        const color: string = options.color ?? `rgba(255, 255, 255, ${CONSTANTS.ANIM.FRACTIONS.twoEighths})`;

        const ripple: HTMLSpanElement = document.createElement("span");
        ripple.className = "ripple-effect";
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.backgroundColor = color;
        ripple.style.transform = "scale(0)";
        ripple.style.animation = `ripple ${duration}ms ${this.easings.easeOut}`;
        ripple.style.pointerEvents = "none";

        const rect: DOMRect = element.getBoundingClientRect();
        const size: number = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (event?.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (event?.clientY - rect.top - size / 2) + "px";

        element.style.position = "relative";
        element.style.overflow = "hidden";
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), duration);
    },

    // ⟪ Animate Value ( for counters, sliders ) ⟫

    animateValue(element: HTMLElement, start: number, end: number, duration: number, formatter?: (val: number) => string): Promise<void> {
        if (!element) return Promise.resolve();

        const startTime: number = performance.now();

        return new Promise((resolve) => {
            const animate = (currentTime: number) => {
                const elapsed: number = currentTime - startTime;
                const progress: number = Math.min(elapsed / duration, 1);

                const easedProgress: number = this.parseEasing(this.easings.easeOut, progress);

                const currentValue: number = start + (end - start) * easedProgress;

                if (formatter) {
                    element.textContent = formatter(currentValue);
                } else {
                    element.textContent = Math.round(currentValue).toString();
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    },

    // ⟪ Parse Easing Function ⟫

    parseEasing(easing: string, t: number): number {
        if (easing.includes("cubic-bezier")) {
            return t < CONSTANTS.ANIM.FRACTIONS.fourEighths ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        return t;
    },

    // ⟪ Cancel All Animations on Element ⟫

    cancelAnimations(element: HTMLElement): void {
        if (element && element.getAnimations) {
            element.getAnimations().forEach(anim => anim.cancel());
        }
    },

    // ⟪ Popup Animation ( for context menu ) ⟫

    popupIn(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();
        const duration: number = options.duration ?? CONSTANTS.ANIM_SETTINGS.popup.duration;
        const easing: string = options.easing ?? CONSTANTS.ANIM_SETTINGS.popup.easing;
        const scale: number = options.scale ?? CONSTANTS.ANIM_SETTINGS.popup.scale;

        element.style.transform = `scale(${scale})`;
        element.style.opacity = "0";
        void element.offsetWidth;

        return element.animate([
            { transform: `scale(${scale})`, opacity: 0 },
            { transform: "scale(1)", opacity: 1 }
        ], { duration, easing }).finished.then(() => {
            element.style.transform = "";
            element.style.opacity = "";
        });
    },

    // ⟪ Popup Close Animation ( fade out ) ⟫

    popupOut(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();
        const duration: number = options.duration ?? CONSTANTS.ANIM_SETTINGS.popup.duration;
        const easing: string = options.easing ?? CONSTANTS.ANIM_SETTINGS.popup.easing;
        const scale: number = options.scale ?? CONSTANTS.ANIM_SETTINGS.popup.scale;

        element.style.pointerEvents = "none";

        return element.animate([
            { transform: "scale(1)", opacity: 1 },
            { transform: `scale(${scale})`, opacity: 0 }
        ], { duration, easing }).finished.then(() => {
            element.style.display = "none";
            element.style.transform = "";
            element.style.opacity = "";
            element.style.pointerEvents = "";
        });
    },

    // ⟪ Popup Animation ( for context menu ) - Legacy Alias ⟫

    popup(element: HTMLElement, options: any = {}): Promise<void> {
        return this.popupIn(element, options);
    },

    // ⟪ Full Screen App Fade In ⟫

    fullScreenApp(element: HTMLElement, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();
        return this.fadeIn(element, options);
    },

    // ⟪ Animate Panel Open ( from taskbar edge ) ⟫

    openPanel(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.full;
        const duration: number = options.duration ?? CONSTANTS.ANIM_SETTINGS.panelSlide.duration;
        const easing: string = options.easing ?? CONSTANTS.ANIM_SETTINGS.panelSlide.easing;

        return this.slideInFromTaskbar(element, panelId, {
            duration,
            easing,
            fraction
        });
    },

    // ⟪ Animate Panel Close ( to taskbar edge ) ⟫

    closePanel(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.full;
        const duration: number = options.duration ?? CONSTANTS.ANIM_SETTINGS.panelSlide.duration;
        const easing: string = options.easing ?? CONSTANTS.ANIM_SETTINGS.panelSlide.easing;

        return this.slideOutToTaskbar(element, panelId, {
            duration,
            easing,
            fraction
        });
    }
};

// Attach to window for global access
(window as any).AnimationManager = AnimationManager;
