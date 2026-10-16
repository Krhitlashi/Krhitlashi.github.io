// ≺⧼ ſɟᴜ j͑ʃᴜƣ̋ ꞁȷ̀ɜ ʃэ ſɟᴜ ſɭɹ ⧽≻ - j͑ʃɔ Service Worker ʌ ʃэ j͑ʃ'ɔ ſ͔ɭɔ ɭl̀ɔᶗ‹ ꞁȷ̀ᴜ }ʃꞇ

async function b6vegejexSakeveni() {
	if ( "serviceWorker" in navigator ) {
		try {
			const b6vegejexRuva = new URL("/ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ʃᴜ j͐ʃɹ ı],ᴜ/j͑ʃᴜ ſɭɔ j͑ʃ'ɔ.js", window.location.origin);
			const b6vegejex = await navigator
			.serviceWorker
			.register(b6vegejexRuva);
			console.log("( ſ̀ȷᴜ ſɭᴜƽ ꞁȷ̀w ʃэ j͑ʃ'ɔ ɭl̀ɔᶗ‹ ⸙ j͑ʃᴜ ſɭɔ j͑ʃ'ɔ }ʃꞇ ⸙ ✔️ )", b6vegejex.scope);
		}
		catch ( e ) {
			console.log("( ſ͕ȷɜ ʃэ j͑ʃ'ɔ ɭl̀ɔᶗ‹ ⸙ j͑ʃᴜ ſɭɔ j͑ʃ'ɔ }ʃꞇ ⸙ ❌ )", e);
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	b6vegejexSakeveni();
});
