// ≺⧼ Panel Manager ⧽≻ - Consolidated panel management with directional animations

declare const CONSTANTS: any;
declare const AnimationManager: any;
declare const DOMCache: any;
declare const hasClass: any;
declare const removeClass: any;
declare const addClass: any;
declare const setButtonPressed: any;
declare const getStartMenu: any;
declare const getTaskbar: any;
declare const isTaskbarLarge: any;
declare const renderRecents: any;
declare const updateDock: any;
declare const getOpenWindows: any;

class PanelManager {
    static animationDuration: number = CONSTANTS.ANIM.DURATION_DEFAULT;

    static panels: { [key: string]: string } = {
        quickSettings: "quick-settings-container",
        notifications: "notifications-panel",
        recents: "recents-panel",
        clockFlyout: "clock-panel",
        startMenu: "start-menu",
        dock: "taskbar-dock"
    };

    // ⟪ Get Panel By ID ⟫
    static getPanel(panelId: string): HTMLElement | null {
        return DOMCache.get(panelId);
    }

    // ⟪ Check Panel Visibility ⟫
    static isPanelVisible(panel: HTMLElement | null): boolean {
        return panel != null && hasClass(panel, "visible");
    }

    // ⟪ Set Button Pressed State ⟫
    static setButtonPressed(btnId: string, pressed: boolean): void {
        setButtonPressed(btnId, pressed);
    }

    // ⟪ Hide Panel With Directional Animation ⟫
    static hidePanel(panel: HTMLElement, panelId: string): Promise<void> {
        if (!panel) return Promise.resolve();

        return AnimationManager.closePanel(panel, panelId, {
            duration: this.animationDuration
        }).then(() => {
            removeClass(panel, "visible");
        });
    }

    // ⟪ Show Panel With Directional Animation ⟫
    static showPanel(panel: HTMLElement, btnId: string, isSliders: boolean = false, panelId: string | null = null): Promise<void> {
        if (!panel) return Promise.resolve();

        this.positionPanel(panel, btnId, isSliders, panelId);

        void panel.offsetWidth;

        this.setButtonPressed(btnId, true);

        return AnimationManager.openPanel(panel, panelId || btnId, {
            duration: this.animationDuration
        }).then(() => {
            addClass(panel, "visible");
        });
    }

    // ⟪ Close System Panels ⟫
    static closeSystemPanels(): Promise<void[]> {
        const animations: Promise<void>[] = [];

        [this.panels.quickSettings, this.panels.notifications, this.panels.clockFlyout].forEach(panelId => {
            const panel = this.getPanel(panelId);
            if (panel && this.isPanelVisible(panel)) {
                animations.push(this.hidePanel(panel, panelId));
            }
        });

        const dock = this.getPanel(this.panels.dock);
        if (dock && this.isPanelVisible(dock)) {
            removeClass(dock, "visible");
        }

        ["status-area", "notification-btn", "clock-area"].forEach(btnId => {
            this.setButtonPressed(btnId, false);
        });

        return Promise.all(animations);
    }

    // ⟪ Close All Panels ⟫
    static closeAllPanels(): Promise<void[]> {
        const animations: Promise<void>[] = [];

        [this.panels.quickSettings, this.panels.notifications, this.panels.clockFlyout, this.panels.recents].forEach(panelId => {
            const panel = this.getPanel(panelId);
            if (panel && this.isPanelVisible(panel)) {
                animations.push(this.hidePanel(panel, panelId));
            }
        });

        const startMenu: HTMLElement | null = getStartMenu();
        if (startMenu && hasClass(startMenu, "open")) {
            animations.push(AnimationManager.closePanel(startMenu, "startMenu", {
                duration: this.animationDuration
            }).then(() => {
                removeClass(startMenu, "open");
                removeClass(document.body, "start-menu-open");
            }));
        }

        ["status-area", "notification-btn", "clock-area", "recents-btn", "home-area"].forEach(btnId => {
            this.setButtonPressed(btnId, false);
        });

        const dock = this.getPanel(this.panels.dock);
        if (this.isPanelVisible(dock)) {
            animations.push(AnimationManager.fadeOut(dock, {
                duration: CONSTANTS.ANIM.DURATION_SHORT
            }).then(() => {
                removeClass(dock, "visible");
            }));
        }

        return Promise.all(animations);
    }

    // ⟪ Position Panel ⟫
    static positionPanel(panel: HTMLElement, btnId: string, isSliders: boolean = false, panelId: string | null = null): void {
        if (!panel) return;
        const taskbar: HTMLElement | null = getTaskbar();
        const pos: string = taskbar ? (taskbar.dataset.position || "left") : "left";
        const isVertical: boolean = pos === "left" || pos === "right";

        const tbSize: number = parseInt(getComputedStyle(document.documentElement).getPropertyValue(CONSTANTS.CSS_VARS.taskbarSize)) || CONSTANTS.SYS.TASKBAR_SIZE;
        const tbBuffer: string = `${tbSize + CONSTANTS.SYS.MARGIN * 2}px`;
        const edge: string = `${CONSTANTS.SYS.MARGIN}px`;
        const gap: string = "8px";

        ["left", "right", "top", "bottom"].forEach(p => { (panel.style as any)[p] = "auto"; });
        panel.style.transform = "none";
        panel.style.blockSize = "fit-content";

        const positions: { [key: string]: string } = this.#getPanelPositions(tbBuffer, edge, gap, isSliders, isVertical, pos, btnId, panelId, taskbar);

        Object.entries(positions).forEach(([prop, val]) => {
            (panel.style as any)[prop] = val;
        });
    }

    // ⟪ Get Panel Positions ⟫
    static #getPanelPositions(tbBuffer: string, edge: string, gap: string, isSliders: boolean, isVertical: boolean, pos: string, btnId: string, panelId: string | null, taskbar: HTMLElement | null): { [key: string]: string } {
        const sliderOffset: string = isSliders ? `calc(${tbBuffer} + 300px + ${gap})` : tbBuffer;
        const isLeftAligned: boolean = btnId === "status-area" || btnId === "recents-btn";
        const isRightAligned: boolean = btnId === "clock-area" || btnId === "notification-btn";
        const isCenterAligned: boolean = !isLeftAligned && !isRightAligned;

        // Position config lookup table
        const configs: { [key: string]: { offset: string; align: string; opposite: string; secondary: string; transform: string } } = {
            bottom: { offset: "bottom", align: "left", opposite: "top", secondary: "right", transform: "translateX(-50%)" },
            top:    { offset: "top",    align: "left", opposite: "bottom", secondary: "right", transform: "translateX(-50%)" },
            left:   { offset: "left",   align: "top",  opposite: "right", secondary: "bottom", transform: "translateY(-50%)" },
            right:  { offset: "right",  align: "top",  opposite: "left", secondary: "bottom", transform: "translateY(-50%)" }
        };

        const config = configs[pos] || configs.bottom;
        const alignValue = isLeftAligned ? edge : isRightAligned ? "auto" : "50%";

        return {
            [config.offset]: sliderOffset,
            [config.align]: alignValue,
            [config.secondary]: isRightAligned ? edge : "auto",
            [config.opposite]: "auto",
            transform: isCenterAligned ? config.transform : "none"
        };
    }

    // ⟪ Toggle Panel ⟫
    static togglePanel(panelId: string, btnId: string, isSliders: boolean = false): void {
        const panel = this.getPanel(panelId);
        if (!panel) return;

        const isVisible = this.isPanelVisible(panel);
        this.closeAllPanels();

        if (!isVisible) {
            setTimeout(() => {
                this.showPanel(panel, btnId, isSliders, panelId);
            }, this.animationDuration);
        }
    }

    // ⟪ Toggle Quick Settings ⟫
    static toggleQuickSettings(): void {
        const container = this.getPanel(this.panels.quickSettings);
        if (!container) return;

        const isVisible = this.isPanelVisible(container);
        this.closeAllPanels();

        if (!isVisible) {
            if ((container as any)._hideTimeout) {
                clearTimeout((container as any)._hideTimeout);
                delete (container as any)._hideTimeout;
            }

            setTimeout(() => {
                this.positionPanel(container, "status-area", false, "quickSettings");
                void container.offsetWidth;
                addClass(container, "visible");
                this.setButtonPressed("status-area", true);
                AnimationManager.openPanel(container, "quickSettings", {
                    duration: this.animationDuration
                });
            }, this.animationDuration);
        }
    }

    // ⟪ Toggle Notifications ⟫
    static toggleNotifications(): void {
        if ((window as any).NotificationManager) (window as any).NotificationManager.render();
        const panel = this.getPanel(this.panels.notifications);
        if (!panel) return;

        const isVisible = this.isPanelVisible(panel);
        this.closeAllPanels();

        if (!isVisible) {
            setTimeout(() => {
                this.showPanel(panel, "notification-btn", false, "notifications");
            }, this.animationDuration);
        }
    }

    // ⟪ Toggle Clock Flyout ⟫
    static toggleClockFlyout(): void {
        if ((window as any).ClockManager) {
            (window as any).ClockManager.update();
        }
        const panel = this.getPanel(this.panels.clockFlyout);
        if (!panel) return;

        const isVisible = this.isPanelVisible(panel);
        this.closeAllPanels();

        if (!isVisible) {
            setTimeout(() => {
                this.showPanel(panel, "clock-area", false, "clockFlyout");
            }, this.animationDuration);
        }
    }

    // ⟪ Toggle Start Menu ⟫
    static toggleStartMenu(): void {
        const startMenu: HTMLElement | null = getStartMenu();
        if (!startMenu) return;

        const isOpen = hasClass(startMenu, "open");
        if (isOpen) {
            AnimationManager.closePanel(startMenu, "startMenu", {
                duration: this.animationDuration
            }).then(() => {
                removeClass(startMenu, "open");
                removeClass(document.body, "start-menu-open");
            });
        } else {
            this.closeSystemPanels();
            setTimeout(() => {
                if ((window as any).DesktopIconManager?.startMenu) {
                    (window as any).DesktopIconManager.startMenu.refresh();
                }

                AnimationManager.openPanel(startMenu, "startMenu", {
                    duration: this.animationDuration
                }).then(() => {
                    addClass(startMenu, "open");
                    addClass(document.body, "start-menu-open");
                });
            }, this.animationDuration);
        }
    }

    // ⟪ Show Recents Panel ⟫
    static showRecents(e?: Event): void {
        if (e) e.preventDefault();

        const panel = this.getPanel(this.panels.recents);
        if (!panel) return;
        const dock = this.getPanel(this.panels.dock);

        const isVisible = this.isPanelVisible(panel);
        this.closeAllPanels();

        if (!isVisible) {
            if (typeof renderRecents === "function") {
                renderRecents();
            }

            if (!isTaskbarLarge() && dock) {
                if (typeof updateDock === "function") {
                    updateDock();
                }
                const windows: NodeListOf<HTMLElement> = getOpenWindows();
                if (windows.length > 0) {
                    addClass(dock, "visible");
                    AnimationManager.fadeIn(dock, { duration: CONSTANTS.ANIM.DURATION_SHORT });
                }
            }

            setTimeout(() => {
                this.showPanel(panel, "recents-btn", false, "recents");
            }, this.animationDuration);
        }
    }

    // ⟪ Initialize Panel Click Outside Handler ⟫
    static initClickOutsideHandler(): void {
        document.addEventListener("mousedown", (e: MouseEvent) => {
            const selectors: string[] = [".system-panel", "#taskbar", "#taskbar-dock", "#start-menu", "#recents-panel", "#quick-settings-container"];
            if (!selectors.some(sel => (e.target as HTMLElement).closest(sel))) {
                this.closeAllPanels();
            }
        });
    }
}

// Attach to window for global access
(window as any).PanelManager = PanelManager;
