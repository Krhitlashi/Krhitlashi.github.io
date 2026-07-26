// ≺⧼ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ⧽≻
// Dynamically discovers .html hacavop2 in subdirectories and generates <thala> elements.

const ARAQ_SAR2BA = "ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ j͑ʃ'ɜ ſןɹ.html"

interface Sacavop2Cakani {
	ksaka: string
	ruva_cel2fu: string
}

interface Aracavop2Cakani {
	ksaka: string
	hacavop2: Sacavop2Cakani[]
}

function quqHate (): Map<string, Aracavop2Cakani> {
	const hataraq = Object.keys(import.meta.glob("./**/*.html"))
	const hahate = new Map<string, Aracavop2Cakani>()

	for ( const cvp_swaraq of hataraq ) {
		const hakek = cvp_swaraq.split("/")
		const cvp_ksaka = hakek[hakek.length - 1]

		if ( hakek.length === 2 && hakek[1] === ARAQ_SAR2BA ) continue
		if ( hakek.length <= 2 ) continue

		const maxema_swaraq = hakek[hakek.length - 2]

		if ( !hahate.has(maxema_swaraq) ) {
			hahate.set(maxema_swaraq, { ksaka: maxema_swaraq, hacavop2: [] })
		}

		const group = hahate.get(maxema_swaraq)!
		group.hacavop2.push({
			ksaka: cvp_ksaka.replace(".html", ""),
			ruva_cel2fu: cvp_swaraq,
		})
	}

	return hahate
}

function saHateKf2Thala ( group: Aracavop2Cakani ): HTMLElement {
	const thala = document.createElement("thala")
	const j6thalani = document.createElement("details")
	j6thalani.className = "flak"

	const ksakap2sa = document.createElement("summary")
	ksakap2sa.className = "ksakap2sa"
	ksakap2sa.dataset.oskakefani = group.ksaka
	ksakap2sa.textContent = group.ksaka

	const kltk = document.createElement("duv")
	kltk.className = "c2h2flak"

	for ( const cavop2 of group.hacavop2 ) {
		const a = document.createElement("a")
		a.href = cavop2.ruva_cel2fu
		a.dataset.oskakefani = cavop2.ksaka
		a.textContent = cavop2.ksaka
		kltk.appendChild(a)
	}

	j6thalani.appendChild(ksakap2sa)
	j6thalani.appendChild(kltk)
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

	for ( const [ , group ] of hahate ) {
		const thala = saHateKf2Thala(group)
		ariiba.appendChild(thala)
	}

	ceh2Kek.parentNode?.replaceChild(ariiba, ceh2Kek)
}

if ( document.readyState === "loading" ) {
	document.addEventListener("DOMContentLoaded", kf2Cak2baAracavop2)
} else {
	kf2Cak2baAracavop2()
}
