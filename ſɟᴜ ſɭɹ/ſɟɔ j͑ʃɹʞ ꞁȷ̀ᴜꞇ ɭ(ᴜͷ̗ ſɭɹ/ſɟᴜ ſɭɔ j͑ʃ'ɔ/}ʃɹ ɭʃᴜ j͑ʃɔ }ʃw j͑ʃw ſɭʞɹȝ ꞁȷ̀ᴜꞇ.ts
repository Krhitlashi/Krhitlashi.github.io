// ≺⧼ Context Menu Manager ⧽≻

declare const CONSTANTS: any;
declare const AnimacioAdministranto: any;
declare const getStrings: any;
declare const getWindowManager: any;

import { AppData } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";
import { akiriMaksimumanPaĝon } from "./ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ.js";

let APPS: AppData[] = [];

// ⟪ Context Menu Manager ⟫

export const KuntekstaMenuoAdministranto = {
    menuo: null as any,
    labortablo: null as any,
    menuoMalfermita: false,
    nunaKahelo: null as any,

    init() {
        this.menuo = document.getElementById( "context-menu" );
        this.labortablo = document.getElementById( "desktop" );
        if ( !this.menuo || !this.labortablo ) return;

        this.labortablo.addEventListener( "contextmenu", ( e: MouseEvent ) => {
            if ( ( e.target as HTMLElement ).closest( ".app-tile" ) ) return;
            e.preventDefault();
            e.stopPropagation();
            this.menuoMalfermita = true;
            this.showForDesktop( e.clientX, e.clientY );
        } );

        // Hide menu on click outside (same pattern as PanelManager)
        document.addEventListener( "mousedown", ( e: MouseEvent ) => {
            if ( !this.menuoMalfermita ) return;
            const selectors: string[] = [ "#context-menu" ];
            if ( !selectors.some( sel => ( e.target as HTMLElement ).closest( sel ) ) ) {
                this.kaŝi();
            }
        } );

        // Hide menu on right click outside (to show new context menu)
        document.addEventListener( "contextmenu", ( e: MouseEvent ) => {
            if ( !this.menuoMalfermita ) return;
            const inMenu = ( e.target as HTMLElement ).closest( "#context-menu" );
            if ( !inMenu ) {
                this.kaŝi();
            }
        } );
    },

     showForDesktop( x: number, y: number ) {
        this.nunaKahelo = null;
        this._renderMenu( [
            { action: "edit-mode", label: "Edit Mode", icon: "✏️", i18n: "ctx_edit_mode" }
        ], [
            { action: "refresh", label: "Refresh", icon: "🔄", i18n: "ctx_refresh" },
            { action: "new-note", label: "New Note", icon: "📝", i18n: "ctx_new_note" },
            { action: "terminal", label: "Terminal", icon: "💻", i18n: "ctx_terminal" }
        ], x, y );
    },

     showForTile( x: number, y: number, tileEl: HTMLElement ) {
        this.nunaKahelo = tileEl;

        // Build move page actions for mobile
        const movePageActions = [];
        const maxPage = akiriMaksimumanPaĝon( APPS );

        if ( maxPage > 0 ) {
            for ( let i = 0; i <= maxPage; i++ ) {
                movePageActions.push( {
                    action: `move-page-${i}`,
                    label: `Page ${i + 1}`,
                    icon: `${i + 1}`,
                    i18n: "ctx_move_page"
                } );
            }
        }

        this._renderMenu( [
            { action: "edit-mode", label: "Edit Mode", icon: "✏️", i18n: "ctx_edit_mode" }
        ], [
            ...movePageActions,
            { action: "toggle-widget", label: "Widget Mode", icon: "🖼️", i18n: "ctx_widget_mode" },
            { action: "toggle-live-tile", label: "Live Tile Mode", icon: "✨", i18n: "ctx_live_tile_mode" }
        ], x, y );
    },

    _renderMenu( primaryActions: any[], secondaryActions: any[], x: number, y: number ) {
        const allActions = [ ...primaryActions, ...secondaryActions ];
        const strings = typeof getStrings === "function" ? getStrings() : {};

        const renderButton = ( btn: any ) => {
            let label = btn.label || "";
            let i18nLabel = "";
            
            // Handle i18n with placeholder substitution for ctx_move_page
            if ( btn.i18n && strings[ btn.i18n ] ) {
                i18nLabel = strings[ btn.i18n ];
                if ( btn.i18n === "ctx_move_page" && btn.label ) {
                    const pageNum = btn.label.replace( "Page ", "" );
                    label = i18nLabel.replace( "{ɿ}", pageNum );
                } else {
                    label = i18nLabel;
                }
            }

            const i18nAttr = btn.i18n ? ` data-oskakefani="${btn.i18n}"` : "";
            const labelHtml = label ? `<span>${label}</span>` : "";
            
            return `<button data-action="${btn.action}"${i18nAttr} title="${label}">${labelHtml}<span>${btn.icon}</span></button>`;
        };

        if ( this.menuo ) {
            this.menuo.innerHTML = allActions.map( renderButton ).join( "" );
            this._bindMenuEvents();
             this.montri( x, y );
        }
    },

    _bindMenuEvents() {
        if ( this.menuo ) {
            this.menuo.querySelectorAll( "button" ).forEach( ( item: any ) => {
                ( item as HTMLElement ).onclick = ( e: MouseEvent ) => {
                    this.handleAction( ( e.currentTarget as HTMLElement ).dataset.action );
                    this.kaŝi();
                };
            } );
        }
    },

    montri( x: number, y: number ) {
        if ( this.menuo ) {
            this.menuo.style.left = x + "px";
            this.menuo.style.top = y + "px";
            this.menuo.classList.add( "visible" );

            const rect = this.menuo.getBoundingClientRect();
            if ( rect.right > window.innerWidth ) this.menuo.style.left = ( window.innerWidth - rect.width ) + "px";
            if ( rect.bottom > window.innerHeight ) this.menuo.style.top = ( window.innerHeight - rect.height ) + "px";

            if ( AnimacioAdministranto ) {
                AnimacioAdministranto.popupIn( this.menuo, {
                    duration: CONSTANTS.ANIM_SETTINGS.popup.duration,
                    easing: CONSTANTS.ANIM_SETTINGS.popup.easing
                } );
            }
        }
    },

    kaŝi() {
        if ( this.menuo ) {
            if ( AnimacioAdministranto ) {
                AnimacioAdministranto.popupOut( this.menuo, {
                    duration: CONSTANTS.ANIM_SETTINGS.popup.duration,
                    easing: CONSTANTS.ANIM_SETTINGS.popup.easing
                } ).then( () => {
                    this.menuo?.classList.remove( "visible" );
                } );
            } else {
                this.menuo?.classList.remove( "visible" );
            }
        }
        this.menuoMalfermita = false;
    },

    handleAction( action: string | undefined ) {
        if ( !action ) return;
        const wm = getWindowManager();

        // Handle move page actions for mobile
        if ( action.startsWith( "move-page-" ) ) {
            const targetPage = parseInt( action.replace( "move-page-", "" ) );
            if ( this.nunaKahelo && ( window as any ).DesktopIconManager?.desktop ) {
                ( window as any ).DesktopIconManager.moveTileToPage( this.nunaKahelo, targetPage );
            }
            return;
        }

        switch ( action ) {
            case "refresh": location.reload(); break;
            case "toggle-widget":
            case "toggle-live-tile":
                if ( this.nunaKahelo ) {
                    this.nunaKahelo.classList.toggle( "widget-mode", action === "toggle-widget" );
                    this.nunaKahelo.classList.toggle( "live-tile-mode", action === "toggle-live-tile" );
                }
                break;
            case "edit-mode": ( window as any ).DesktopIconManager?.desktop?.toggleEdit(); break;
            case "new-note": wm?.loadAppFromPath( "ſɟᴜ ſɭɹ/ſɟᴜ ſᶘᴜ j͐ʃɹ.html", "Notes" ); break;
            case "terminal": wm?.loadAppFromPath( "ſɟᴜ ſɭɹ/ſןɔ ſɭʞꞇ.html", "Terminal" ); break;
        }
    }
};

// Attach to window for global access
( window as any ).KuntekstaMenuoAdministranto = KuntekstaMenuoAdministranto;
