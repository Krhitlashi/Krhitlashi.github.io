// ≺⧼ Panel Manager ⧽≻ - Consolidated panel management with directional animations

class PanelManager {
    static animationDuration = ANIM_DURATION_DEFAULT;

    static panels = {
        quickSettings: "quick-settings-container",
        notifications: "notifications-panel",
        recents: "recents-panel",
        clockFlyout: "clock-panel",
        startMenu: "start-menu",
        dock: "taskbar-dock"
    };

    // ⟪ Check Panel Visibility ⟫

    static isPanelVisible( panelId ) {
        const panel = DOMCache.get( panelId );
        return panel && hasClass( panel, "visible" );
    }

    // ⟪ Set Button Pressed State ⟫

    static setButtonPressed( btnId, pressed ) {
        setButtonPressed( btnId, pressed );
    }

    // ⟪ Hide Panel With Directional Animation ⟫

    static hidePanel( panel, panelId ) {
        if ( !panel ) return Promise.resolve();

        // Use directional animation based on taskbar position
        // Remove visible class after animation completes to prevent double animation
        return AnimationManager.closePanel( panel, panelId, {
            duration: this.animationDuration
        } ).then( () => {
            removeClass( panel, "visible" );
        } );
    }

    // ⟪ Show Panel With Directional Animation ⟫

    static showPanel( panel, btnId, isSliders = false, panelId ) {
        if ( !panel ) return Promise.resolve();

        this.positionPanel( panel, btnId, isSliders, panelId );
        panel.style.display = "flex";

        // Force reflow
        void panel.offsetWidth;

        this.setButtonPressed( btnId, true );

        // Use directional animation based on taskbar position
        // Add visible class after animation completes to prevent double animation
        return AnimationManager.openPanel( panel, panelId, {
            duration: this.animationDuration
        } ).then( () => {
            addClass( panel, "visible" );
        } );
    }

    // ⟪ Close System Panels ( QS, Notifications ) ⟫

    static closeSystemPanels() {
        const animations = [];

        // Hide quick settings, notifications and clock flyout
        [ this.panels.quickSettings, this.panels.notifications, this.panels.clockFlyout ].forEach( panelId => {
            const panel = DOMCache.get( panelId );
            if ( panel && hasClass( panel, "visible" ) ) {
                animations.push( this.hidePanel( panel, panelId ) );
            }
        } );

        // Hide dock
        const dock = DOMCache.get( this.panels.dock );
        if ( dock && hasClass( dock, "visible" ) ) {
            removeClass( dock, "visible" );
        }

        // Reset system button states
        [ "status-area", "notification-btn", "clock-area" ].forEach( btnId => {
            this.setButtonPressed( btnId, false );
        } );

        return Promise.all( animations );
    }

    // ⟪ Close All Panels ⟫

    static closeAllPanels() {
        const animations = [];

        // Hide quick settings, notifications, clock flyout, and recents
        [ this.panels.quickSettings, this.panels.notifications, this.panels.clockFlyout, this.panels.recents ].forEach( panelId => {
            const panel = DOMCache.get( panelId );
            if ( panel && hasClass( panel, "visible" ) ) {
                animations.push( this.hidePanel( panel, panelId ) );
            }
        } );

        // Close start menu
        const startMenu = getStartMenu();
        if ( startMenu && hasClass( startMenu, "open" ) ) {
            animations.push( AnimationManager.closePanel( startMenu, "startMenu", {
                duration: this.animationDuration
            } ).then( () => {
                removeClass( startMenu, "open" );
                removeClass( document.body, "start-menu-open" );
            } ) );
        }

        // Reset button states
        [ "status-area", "notification-btn", "clock-area", "recents-btn", "home-area" ].forEach( btnId => {
            this.setButtonPressed( btnId, false );
        } );

        // Hide dock
        const dock = DOMCache.get( this.panels.dock );
        if ( dock && hasClass( dock, "visible" ) ) {
            animations.push( AnimationManager.fadeOut( dock, {
                duration: ANIM_DURATION_SHORT
            } ).then( () => {
                removeClass( dock, "visible" );
            } ) );
        }

        return Promise.all( animations );
    }

    // ⟪ Position Panel ⟫

    static positionPanel( panel, btnId, isSliders = false, panelId = null ) {
        if ( !panel ) return;
        const taskbar = getTaskbar();
        const pos = taskbar ? ( taskbar.dataset.position || "left" ) : "left";
        const isVertical = pos === "left" || pos === "right";

        const tbSize = parseInt( getComputedStyle( document.documentElement ).getPropertyValue( CSS_VARS.taskbarSize ) ) || SYS_TASKBAR_SIZE;
        const tbBuffer = `${tbSize + SYS_MARGIN * 2}px`;
        const edge = `${SYS_MARGIN}px`;
        const gap = "8px";

        // Clear all position properties before applying new ones
        [ "left", "right", "top", "bottom" ].forEach( p => { panel.style[ p ] = "auto"; } );
        panel.style.transform = "none";
        panel.style.blockSize = "fit-content"; // Default

        const positions = this.#getPanelPositions( tbBuffer, edge, gap, isSliders, isVertical, pos, btnId, panelId );

        Object.entries( positions ).forEach( ( [ prop, val ] ) => {
            panel.style[ prop ] = val;
        } );
    }

    // ⟪ Get Panel Positions ⟫

    static #getPanelPositions( tbBuffer, edge, gap, isSliders, isVertical, pos, btnId, panelId ) {
        const sliderOffset = isSliders ? `calc(${tbBuffer} + 300px + ${gap})` : tbBuffer;
        const isFullSizePanel = panelId === "notifications" || panelId === "clockFlyout";
        const isLeftAligned = btnId === "status-area" || btnId === "recents-btn";
        const isRightAligned = btnId === "clock-area" || btnId === "notification-btn";

        // Configuration object for panel positions based on taskbar position
        const positionConfig = {
            top: {
                primary: isLeftAligned ? "left" : isRightAligned ? "right" : "left",
                secondary: isLeftAligned || isRightAligned ? "top" : "top",
                primaryOffset: sliderOffset,
                secondaryOffset: isLeftAligned ? edge : isRightAligned ? edge : "50%",
                opposite: isFullSizePanel ? edge : "auto",
                transform: !isLeftAligned && !isRightAligned ? "translateX(-50%)" : "none"
            },
            bottom: {
                primary: isLeftAligned ? "left" : isRightAligned ? "right" : "left",
                secondary: isLeftAligned || isRightAligned ? "bottom" : "bottom",
                primaryOffset: sliderOffset,
                secondaryOffset: isLeftAligned ? edge : isRightAligned ? edge : "50%",
                opposite: isFullSizePanel ? edge : "auto",
                transform: !isLeftAligned && !isRightAligned ? "translateX(-50%)" : "none"
            },
            left: {
                primary: isLeftAligned ? "top" : isRightAligned ? "bottom" : "top",
                secondary: isLeftAligned || isRightAligned ? "left" : "left",
                primaryOffset: isLeftAligned ? edge : isRightAligned ? edge : "50%",
                secondaryOffset: sliderOffset,
                opposite: isFullSizePanel ? edge : "auto",
                transform: !isLeftAligned && !isRightAligned ? "translateY(-50%)" : "none"
            },
            right: {
                primary: isLeftAligned ? "top" : isRightAligned ? "bottom" : "top",
                secondary: isLeftAligned || isRightAligned ? "right" : "right",
                primaryOffset: isLeftAligned ? edge : isRightAligned ? edge : "50%",
                secondaryOffset: sliderOffset,
                opposite: isFullSizePanel ? edge : "auto",
                transform: !isLeftAligned && !isRightAligned ? "translateY(-50%)" : "none"
            }
        };

        const cfg = positionConfig[ pos ] || positionConfig.bottom;

        // Build position object based on orientation
        if ( isVertical ) {
            return {
                [ cfg.secondary ]: cfg.secondaryOffset,
                [ cfg.primary ]: cfg.primaryOffset,
                [ cfg.primary === "top" ? "bottom" : "top" ]: cfg.opposite,
                transform: cfg.transform
            };
        } else {
            return {
                [ cfg.secondary ]: cfg.secondaryOffset,
                [ cfg.primary ]: cfg.primaryOffset,
                [ cfg.primary === "left" ? "right" : "left" ]: cfg.opposite,
                transform: cfg.transform
            };
        }
    }

    // ⟪ Toggle Panel ⟫

    static togglePanel( panelId, btnId, isSliders = false ) {
        const panel = DOMCache.get( panelId );
        if ( !panel ) return;

        const isVisible = hasClass( panel, "visible" );
        this.closeAllPanels();

        if ( !isVisible ) {
            setTimeout( () => {
                this.showPanel( panel, btnId, isSliders, panelId );
            }, this.animationDuration );
        }
    }

    // ⟪ Toggle Quick Settings ⟫

    static toggleQuickSettings() {
        const container = DOMCache.get( this.panels.quickSettings );
        if ( !container ) return;
        const isVisible = hasClass( container, "visible" );
        this.closeAllPanels();

        if ( !isVisible && container ) {
            if ( container._hideTimeout ) {
                clearTimeout( container._hideTimeout );
                delete container._hideTimeout;
            }

            setTimeout( () => {
                container.style.display = "flex";
                this.positionPanel( container, "status-area", false, "quickSettings" );
                void container.offsetWidth;
                addClass( container, "visible" );
                this.setButtonPressed( "status-area", true );
                AnimationManager.openPanel( container, "quickSettings", {
                    duration: this.animationDuration
                } );
            }, this.animationDuration );
        }
    }

    // ⟪ Toggle Notifications ⟫

    static toggleNotifications() {
        if ( window.NotificationManager ) NotificationManager.render();
        const panel = DOMCache.get( this.panels.notifications );
        if ( !panel ) return;
        const isVisible = hasClass( panel, "visible" );
        this.closeAllPanels();

        if ( !isVisible ) {
            setTimeout( () => {
                this.showPanel( panel, "notification-btn", false, "notifications" );
            }, this.animationDuration );
        }
    }

    // ⟪ Toggle Clock Flyout ⟫

    static toggleClockFlyout() {
        if ( window.ClockManager ) {
            window.ClockManager.update();
        }
        const panel = DOMCache.get( this.panels.clockFlyout );
        if ( !panel ) return;
        const isVisible = hasClass( panel, "visible" );
        this.closeAllPanels();

        if ( !isVisible ) {
            setTimeout( () => {
                this.showPanel( panel, "clock-area", false, "clockFlyout" );
            }, this.animationDuration );
        }
    }

    // ⟪ Toggle Start Menu ⟫

    static toggleStartMenu() {
        const startMenu = getStartMenu();
        if ( !startMenu ) return;

        const isOpen = hasClass( startMenu, "open" );
        if ( isOpen ) {
            AnimationManager.closePanel( startMenu, "startMenu", {
                duration: this.animationDuration
            } ).then( () => {
                removeClass( startMenu, "open" );
                removeClass( document.body, "start-menu-open" );
            });
        } else {
            this.closeSystemPanels();
            setTimeout( () => {
                // Refresh grid before showing to ensure correct tile dimensions
                if (window.DesktopIconManager?.startMenu) {
                    window.DesktopIconManager.startMenu.refresh();
                }

                // Start animation first, add class after animation completes
                AnimationManager.openPanel( startMenu, "startMenu", {
                    duration: this.animationDuration
                } ).then( () => {
                    addClass( startMenu, "open" );
                    addClass( document.body, "start-menu-open" );
                } );
            }, this.animationDuration );
        }
    }

    // ⟪ Show Recents Panel ⟫

    static showRecents( e ) {
        if ( e ) e.preventDefault();
        
        const panel = DOMCache.get( this.panels.recents );
        if ( !panel ) return;
        const dock = DOMCache.get( this.panels.dock );

        const isVisible = hasClass( panel, "visible" );
        
        // Close system panels AND the start menu if it's open to prevent interference
        this.closeAllPanels();

        if ( !isVisible ) {
            if ( typeof renderRecents === "function" ) {
                renderRecents();
            }

            if ( !isTaskbarLarge() && dock ) {
                if ( typeof updateDock === "function" ) {
                    updateDock();
                }
                const windows = getOpenWindows();
                if ( windows.length > 0 ) {
                    addClass( dock, "visible" );
                    AnimationManager.fadeIn( dock, { duration: ANIM_DURATION_SHORT } );
                }
            }

            setTimeout( () => {
                this.showPanel( panel, "recents-btn", false, "recents" );
            }, this.animationDuration );
        }
    }

    // ⟪ Initialize Panel Click Outside Handler ⟫

    static initClickOutsideHandler() {
        document.addEventListener( "mousedown", ( e ) => {
            const selectors = [ ".system-panel", "#taskbar", "#taskbar-dock", "#start-menu", "#recents-panel", "#quick-settings-container" ];
            if ( !selectors.some( sel => e.target.closest( sel ) ) ) {
                this.closeAllPanels();
            }
        } );
    }
}
