// ≺⧼ Quick Settings Manager ⧽≻ - Centralized QS state management

const QSManager = ( function() {
    let state = { ...CONSTANTS.QS.DEFAULTS };

    // ⟪ Load From Storage ⟫

    function loadFromStorage() {
        state = Storage.loadWithDefaults( CONSTANTS.STORAGE_KEYS.qsState, CONSTANTS.QS.DEFAULTS );
    }

    // ⟪ Save To Storage ⟫

    function saveToStorage() {
        Storage.set( CONSTANTS.STORAGE_KEYS.qsState, state );
    }

    // ⟪ Dispatch Change Event ⟫

    function dispatchChange( key, value ) {
        const event = new CustomEvent( CONSTANTS.EVENT_NAMES.settingsChange, {
            detail: { key, value }
        } );
        document.dispatchEvent( event );
    }

    return {
        // ⟪ Get State ⟫

        get( key ) {
            return state[ key ];
        },

        // ⟪ Set State ⟫

        set( key, value ) {
            state[ key ] = value;
            saveToStorage();
            dispatchChange( key, value );
        },

        // ⟪ Toggle State ⟫

        toggle( key ) {
            const newValue = !state[ key ];
            this.set( key, newValue );
            return newValue;
        },

        // ⟪ Get All State ⟫

        getAll() {
            return { ...state };
        },

        // ⟪ Set All State ⟫

        setAll( newState ) {
            state = { ...state, ...newState };
            saveToStorage();
        },

        // ⟪ Update Brightness ⟫

        setBrightness( value ) {
            this.set( "brightness", value );
            document.documentElement.style.setProperty( CONSTANTS.CSS_VARS.brightness, value / CONSTANTS.SYS.BRIGHTNESS_MAX );
            const osRoot = document.getElementById( "os-root" );
            if ( osRoot ) {
                osRoot.style.filter = `brightness(${CONSTANTS.ANIM.FRACTIONS.fourEighths + ( value / CONSTANTS.SYS.BRIGHTNESS_BUFFER )})`;
            }
        },

        // ⟪ Update Volume ⟫

        setVolume( value ) {
            this.set( "volume", value );
            // Could integrate with Web Audio API here
        },

        // ⟪ Toggle Button Handler ⟫

        handleToggle( btn ) {
            const isPressed = btn.getAttribute( "aria-pressed" ) === "true";
            const newState = !isPressed;
            btn.setAttribute( "aria-pressed", newState.toString() );

            const setting = btn.getAttribute( "data-setting" );
            if ( setting ) {
                this.set( setting, newState );
            }
        },

        // ⟪ Init ⟫

        init() {
            loadFromStorage();
            this.restoreUI();
        },

        // ⟪ Restore UI State ⟫

        restoreUI() {
            // Restore toggle button states
            document.querySelectorAll( ".xeku1okek" ).forEach( btn => {
                const setting = btn.getAttribute( "data-setting" );
                if ( setting ) {
                    const value = this.get( setting );
                    btn.setAttribute( "aria-pressed", value?.toString() || "false" );
                }
            } );

            // Restore slider values
            document.querySelectorAll( "#quick-settings-sliders input[type='range']" ).forEach( slider => {
                const parent = slider.closest( "[data-qs-id]" );
                const id = parent?.getAttribute( "data-qs-id" );
                if ( id ) {
                    slider.value = this.get( id ) || 0;
                }
            } );
        }
    };
} )();

// ⟪ Global Alias ⟫

window.QSManager = QSManager;
