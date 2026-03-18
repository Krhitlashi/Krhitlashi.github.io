// ≺⧼ Main Entry Point ⧽≻ - Loads all OS modules in correct order 🚀

/* eslint-disable @typescript-eslint/no-explicit-any */

console.log( "<( OS Entry Point Loading )>" );

// ⟨ Constants ⟩ - must load first (defines window.CONSTANTS)
import "./ꞁȷ̀ɔ j͑ʃƽɔƽ.ts";

// ⟨ Utilities ⟩ - provide helper functions
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſɭɹ ſȷɔ.ts";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ı],ɔ ŋᷠᴜ.ts";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ j͑ʃ'ᴜ ı],ᴜ.ts";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſɭɔƽ.ts";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſ͕ɭwȝ.ts";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜƽ ꞁȷ̀ɜ ſɭɔʞ.ts";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſ̀ȷᴜȝ.ts"; // StorageUtil

// ⟨ Managers ⟩ - these attach to window
import "./ɭʃᴜ ֭ſɭᴜ j͐ʃᴜ ſ͕ɭᴜƴ.ts"; // AnimationManager
import "./ı],ɔ ſɭw ſᶘɜ.ts"; // QSManager
import "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ɭʃᴜ ı],c̗ᴜ.ts"; // NotificationManager
import "./}ʃɹ ɭʃᴜ j͑ʃɔ }ʃꞇ.ts"; // PanelManager
import "./ſɟᴜ ſɭɹ ſןɹ.ts"; // System ( coordination )
import "./ſ̀ȷᴜ ſɟᴜ ſɭɹ j͑ʃᴜꞇ.ts"; // IconGrid / DesktopIconManager
import "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ.ts"; // WindowManager

console.log( "<( All OS Modules Loaded )>" );

// ⟨ Initialization ⟩
// System module in ſɟᴜ ſɭɹ ſןɹ.ts handles the main bootstrap

function startOS() {
    const System = ( window as any ).System;
    if ( System ) {
        console.log( "<( Starting OS via System Manager )>" );
        System.init();
    } else {
        console.error( "System Manager not found!" );
    }
}

// Coordinate with System's own internal bootstrap
if ( document.readyState === "loading" ) {
    window.addEventListener( "DOMContentLoaded", startOS );
} else {
    // If System already initialized itself, startOS might be redundant but safe
    startOS();
}

console.log( "OS Entry Point Ready" );
