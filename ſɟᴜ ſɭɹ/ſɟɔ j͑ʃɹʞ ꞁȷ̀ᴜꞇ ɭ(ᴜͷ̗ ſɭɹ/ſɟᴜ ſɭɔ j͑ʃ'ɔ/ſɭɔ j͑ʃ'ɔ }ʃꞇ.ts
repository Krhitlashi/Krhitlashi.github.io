// ≺⧼ Main Entry Point ⧽≻ - Loads all OS modules in correct order 🚀

console.log( "<( OS Entry Point Loading )>" );

// ⟨ Constants ⟩ - must load first (defines window.CONSTANTS)
import "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

// ⟨ Utilities ⟩ - provide helper functions
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſɭɹ ſȷɔ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ı],ɔ ŋᷠᴜ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ j͑ʃ'ᴜ ı],ᴜ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſɭɔƽ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſ͕ɭwȝ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜƽ ꞁȷ̀ɜ ſɭɔʞ.js";
import "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſ̀ȷᴜȝ.js";

// ⟨ Managers ⟩ - these attach to window
import "./ɭʃᴜ ֭ſɭᴜ j͐ʃᴜ ſ͕ɭᴜƴ.js";
import "./ı],ɔ ſɭw ſᶘɜ.js";
import "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ɭʃᴜ ı],c̗ᴜ.js";
import "./}ʃɹ ɭʃᴜ j͑ʃɔ }ʃw.js";
import "./ſɟᴜ ſɭɹ ſןɹ.js";
import "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js"; // Type definitions
import "./ſɟɔ }ʃᴜ.js";
import "./ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ.js";
import "./}ʃɹ ɭʃᴜ j͑ʃɔ }ʃw j͑ʃw ſɭʞɹȝ ꞁȷ̀ᴜꞇ.js";
import "./ſ̀ȷᴜ ſɟᴜ ſɭɹ j͑ʃᴜꞇ.js";
import "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɟᴜ j͑ʃƨꞇ ſȷɔ ֭ſɭɹ.js";
import "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɔ ֭ſɭɔ ſɭɹ ſןɹ.js";

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
