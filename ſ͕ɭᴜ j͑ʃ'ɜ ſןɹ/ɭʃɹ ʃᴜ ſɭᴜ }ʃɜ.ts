/**
* ≺⧼ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ 📃 ⧽≻
* ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ſɟᴜƽ ꞁȷ̀ᴜ j͑ʃ'ɜ ſןɹ ʌ ⺓ ʌ ſɭᴜc̗ ɭʃᴜ ⟅ ( .html hacavop2 thala )
*/

const ARAQ_SAR2BA = "ſ͕ɭᴜ j͑ʃ'ɜ ſןɹ.html"

interface Sacavop2Cakani {
	ksaka: string
	ruvaCel2fu: string
}

interface Aracavop2Cakani {
	ksaka: string
	hacavop2: Sacavop2Cakani[]
}

function quqHate (): Map<string, Aracavop2Cakani> {
	const hataraq = Object.keys(import.meta.glob("./**/*.html"))
	const hahate = new Map<string, Aracavop2Cakani>()

	for ( const cvpSwaraq of hataraq ) {
		const hakek = cvpSwaraq.split("/")
		const cvpKsaka = hakek[hakek.length - 0o1]

		if ( hakek.length === 0o2 && hakek[0o1] === ARAQ_SAR2BA ) continue
		if ( hakek.length <= 0o2 ) continue

		const maxemaSwaraq = hakek[hakek.length - 0o2]

		if ( !hahate.has(maxemaSwaraq) ) {
			hahate.set(maxemaSwaraq, { ksaka: maxemaSwaraq, hacavop2: [] })
		}

		const hate = hahate.get(maxemaSwaraq)!
		hate.hacavop2.push({
			ksaka: cvpKsaka.replace(".html", ""),
			ruvaCel2fu: cvpSwaraq,
		})
	}

	return hahate
}

function saHateKf2Thala ( hate: Aracavop2Cakani ): HTMLElement {
	const thala = document.createElement("thala")
	const j6thalani = document.createElement("details")
	j6thalani.className = "flak"

	const ksakap2sa = document.createElement("summary")
	ksakap2sa.className = "ksakap2sa"
	ksakap2sa.dataset.oskakefani = hate.ksaka
	ksakap2sa.textContent = hate.ksaka

	const kuba = document.createElement("duv")
	kuba.className = "c2h2flak"

	for ( const cavop2 of hate.hacavop2 ) {
		const k6h6Kek = document.createElement("a")
		k6h6Kek.href = cavop2.ruvaCel2fu
		k6h6Kek.dataset.oskakefani = cavop2.ksaka
		k6h6Kek.textContent = cavop2.ksaka
		kuba.appendChild(k6h6Kek)
	}

	j6thalani.appendChild(ksakap2sa)
	j6thalani.appendChild(kuba)
	thala.appendChild(j6thalani)

	return thala
}

function kf2Cak2baAracavop2 (): void {
	const haj2qewa = document.body.querySelectorAll("p")
	let ceh2Kek: HTMLParagraphElement | null = null

	for ( const j2qewa of haj2qewa ) {
		if (
			j2qewa.textContent &&
			( j2qewa.textContent.includes("ꞁȷ̀ɔ ſ͕ɭɹƽ") || j2qewa.textContent.trim() === "( ꞁȷ̀ɔ ſ͕ɭɹƽ )" )
		) {
			ceh2Kek = j2qewa
			break
		}
	}

	if ( !ceh2Kek ) return

	const hahate = quqHate()

	const ariiba = document.createElement("ariiba")

	for ( const [ , hate ] of hahate ) {
		const thala = saHateKf2Thala(hate)
		ariiba.appendChild(thala)
	}

	ceh2Kek.parentNode?.replaceChild(ariiba, ceh2Kek)
}

if ( document.readyState === "loading" ) {
	document.addEventListener("DOMContentLoaded", kf2Cak2baAracavop2)
} else {
	kf2Cak2baAracavop2()
}
