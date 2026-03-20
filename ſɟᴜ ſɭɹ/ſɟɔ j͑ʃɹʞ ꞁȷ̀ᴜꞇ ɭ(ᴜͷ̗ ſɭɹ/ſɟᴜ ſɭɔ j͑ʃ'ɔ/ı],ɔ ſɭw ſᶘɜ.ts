// ≺⧼ Quick Settings Manager ⧽≻ - Centralized QS state management

declare const CONSTANTS: any;
declare const StorageUtil: any;

interface QSState {
    [ key: string ]: any;
}

const QSManager = ( function() {
    let state: QSState = { ...CONSTANTS.QS.DEFAULTS };

    // ⟪ Load From Storage ⟫
    function loadFromStorage(): void {
        state = StorageUtil.loadWithDefaults( CONSTANTS.STORAGE_KEYS.qsState, CONSTANTS.QS.DEFAULTS );
    }

    // ⟪ Save To Storage ⟫
    function saveToStorage(): void {
        StorageUtil.set( CONSTANTS.STORAGE_KEYS.qsState, state );
    }

    // ⟪ Dispatch Change Event ⟫

    function dispatchChange( key: string, value: any ): void {
        const event = new CustomEvent( CONSTANTS.EVENT_NAMES.settingsChange, {
            detail: { key, value }
        } );
        document.dispatchEvent( event );
    }

    return {
        // ⟪ Get State ⟫

        get( key: string ): any {
            return state[ key ];
        },

        // ⟪ Set State ⟫

        set( key: string, value: any ): void {
            state[ key ] = value;
            saveToStorage();
            dispatchChange( key, value );
        },

        // ⟪ Toggle State ⟫

        toggle( key: string ): boolean {
            const newValue = !state[ key ];
            this.set( key, newValue );
            return newValue;
        },

        // ⟪ Get All State ⟫

        getAll(): QSState {
            return { ...state };
        },

        // ⟪ Set All State ⟫

        setAll( newState: QSState ): void {
            state = { ...state, ...newState };
            saveToStorage();
        },

        // ⟪ Update Brightness ⟫

        setBrightness( value: number ): void {
            this.set( "brightness", value );
            document.documentElement.style.setProperty( CONSTANTS.CSS_VARS.brightness, ( value / CONSTANTS.SYS.BRIGHTNESS_MAX ).toString() );
            const osRoot = document.getElementById( "os-root" );
            if ( osRoot ) {
                osRoot.style.filter = `brightness(${CONSTANTS.ANIM.FRACTIONS.fourEighths + ( value / CONSTANTS.SYS.BRIGHTNESS_BUFFER )})`;
            }
        },

        // ⟪ Update Volume ⟫

        setVolume( value: number ): void {
            this.set( "volume", value );
            // Could integrate with Web Audio API here
        },

        // ⟪ Toggle Button Handler ⟫

        handleToggle( btn: HTMLElement ): void {
            const isPressed = btn.getAttribute( "aria-pressed" ) === "true";
            const newState = !isPressed;
            btn.setAttribute( "aria-pressed", newState.toString() );

            const setting = btn.getAttribute( "data-setting" );
            if ( setting ) {
                this.set( setting, newState );
            }
        },

        // ⟪ Init ⟫

        init(): void {
            loadFromStorage();
            this.restoreUI();
        },

        // ⟪ Restore UI State ⟫

        restoreUI(): void {
            // Restore toggle button states
            document.querySelectorAll( ".xeku1okek" ).forEach( ( btn: Element ) => {
                const setting = ( btn as HTMLElement ).getAttribute( "data-setting" );
                if ( setting ) {
                    const value = this.get( setting );
                    ( btn as HTMLElement ).setAttribute( "aria-pressed", value?.toString() || "false" );
                }
            } );

            // Restore slider values
            document.querySelectorAll( "#quick-settings-sliders input[type='range']" ).forEach( ( slider: Element ) => {
                const parent = slider.closest( "[data-qs-id]" );
                const id = parent?.getAttribute( "data-qs-id" );
                if ( id ) {
                    ( slider as HTMLInputElement ).value = this.get( id ) || 0;
                }
            } );
        }
    };
} )();

// ⟪ Global Alias ⟫

( window as any ).QSManager = QSManager;
