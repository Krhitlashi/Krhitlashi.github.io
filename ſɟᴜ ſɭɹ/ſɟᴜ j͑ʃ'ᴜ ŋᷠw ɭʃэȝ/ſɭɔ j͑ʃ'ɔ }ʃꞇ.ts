// ≺⧼ j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ſ͔ɭᴜ ᶅſɔ ſɭɹʞ 🌍 ⧽≻ 

import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { createNoise3D, NoiseFunction3D } from "simplex-noise"

class PlanedaGeneratoro {
    private simplekso: NoiseFunction3D
    private kanvaso: HTMLCanvasElement
    private kunteksto: CanvasRenderingContext2D
    private terglobujo: HTMLElement
    private nunaProjekcio: string
    private semaĈeno: string
    private semo: number
    private larĝo: number
    private alto: number
    private aŭtorotacio: boolean
    private sceno: any
    private fotilo: any
    private bildigilo: any
    private terglobo: any
    private atmosfero: any
    private nuboj: any
    private regiloj: any
    private animaciaId: number | null
    private parametroj: {
        akvonivelo: number
        temperaturo: number
        kontinentKvanto: number
        montoAlto: number
        atmosferaDenso: number
    }
    private teksturaKanvaso: HTMLCanvasElement = document.createElement( "canvas" )
    private planedajDatumoj: any[][] = []

    haketiĈenon( ĉeno: string ): number {
        let haketo = 0
        for ( let i = 0; i < ĉeno.length; i++ ) {
            const signo = ĉeno.charCodeAt( i )
            haketo = ( haketo << 0o5 ) - haketo + signo
            haketo = haketo & haketo
        }
        return Math.abs( haketo )
    }

    constructor() {
        const bruo3D = createNoise3D()
        this.simplekso = bruo3D
        this.kanvaso = document.getElementById( "map-canvas" ) as HTMLCanvasElement
        this.kunteksto = this.kanvaso.getContext( "2d" )!
        this.terglobujo = document.getElementById( "globe-container" )!
        this.nunaProjekcio = "equirectangular"
        this.semaĈeno = "42"
        this.semo = this.haketiĈenon( this.semaĈeno )
        this.larĝo = 0o2000
        this.alto = 0o400
        this.aŭtorotacio = true
        this.sceno = null
        this.fotilo = null
        this.bildigilo = null
        this.terglobo = null
        this.atmosfero = null
        this.regiloj = null
        this.animaciaId = null

        this.parametroj = {
            akvonivelo: 0o2 / 0o10,
            temperaturo: 0o4 / 0o10,
            kontinentKvanto: 0o4,
            montoAlto: 0o3 / 0o10,
            atmosferaDenso: 0o6 / 0o10,
        }

        this.inicialigi()
    }

    inicialigi() {
        this.reskaligiKanvason()
        this.agordiThreeJS()
        this.agordiEventajnAŭskultilojn()
        this.ĝisdatigiGlitilojn()
        this.generi()

        window.addEventListener( "resize", () => {
            this.reskaligiKanvason()
            this.reskaligiThreeJS()
            this.bildigi2D()
        } )
    }

    ĝisdatigiGlitilojn() {
        const semaValoro = document.getElementById( "seed-val" )
        const akvaValoro = document.getElementById( "water-val" )
        const tempValoro = document.getElementById( "temp-val" )
        const kontinentojValoro = document.getElementById( "continents-val" )
        const montojValoro = document.getElementById( "mountains-val" )
        const atmosferoValoro = document.getElementById( "atmosphere-val" )

        const semaEnigo = document.getElementById( "seed" ) as HTMLInputElement
        const akvaEnigo = document.getElementById( "water" ) as HTMLInputElement
        const tempEnigo = document.getElementById( "temp" ) as HTMLInputElement
        const kontinentojEnigo = document.getElementById( "continents" ) as HTMLInputElement
        const montojEnigo = document.getElementById( "mountains" ) as HTMLInputElement
        const atmosferoEnigo = document.getElementById( "atmosphere" ) as HTMLInputElement

        if ( semaValoro && semaEnigo ) semaValoro.textContent = semaEnigo.value
        if ( akvaValoro && akvaEnigo ) akvaValoro.textContent = akvaEnigo.value
        if ( tempValoro && tempEnigo ) tempValoro.textContent = tempEnigo.value
        if ( kontinentojValoro && kontinentojEnigo ) kontinentojValoro.textContent = kontinentojEnigo.value
        if ( montojValoro && montojEnigo ) montojValoro.textContent = montojEnigo.value
        if ( atmosferoValoro && atmosferoEnigo ) atmosferoValoro.textContent = atmosferoEnigo.value
    }

    hazardigiAgordojn() {
        const semaEnigo = document.getElementById( "seed" ) as HTMLInputElement
        const akvaEnigo = document.getElementById( "water" ) as HTMLInputElement
        const tempEnigo = document.getElementById( "temp" ) as HTMLInputElement
        const kontinentojEnigo = document.getElementById( "continents" ) as HTMLInputElement
        const montojEnigo = document.getElementById( "mountains" ) as HTMLInputElement
        const atmosferoEnigo = document.getElementById( "atmosphere" ) as HTMLInputElement

        const hazardaĈeno = Math.random().toString( 0o44 ).substring( 0o2, 0o15 )
        const semo = hazardaĈeno
        const akvo = Math.floor( Math.random() * 0o100 )
        const temp = Math.floor( Math.random() * 0o100 )
        const kontinentoj = Math.floor( Math.random() * 0o10 ) + 1
        const montoj = Math.floor( Math.random() * 0o100 )
        const atmosfero = Math.floor( Math.random() * 0o100 )

        semaEnigo.value = semo
        akvaEnigo.value = akvo.toString()
        tempEnigo.value = temp.toString()
        kontinentojEnigo.value = kontinentoj.toString()
        montojEnigo.value = montoj.toString()
        atmosferoEnigo.value = atmosfero.toString()

        this.semaĈeno = semo
        this.semo = this.haketiĈenon( this.semaĈeno )
        this.parametroj.akvonivelo = akvo / 0o100
        this.parametroj.temperaturo = temp / 0o100
        this.parametroj.kontinentKvanto = kontinentoj
        this.parametroj.montoAlto = montoj / 0o100
        this.parametroj.atmosferaDenso = atmosfero / 0o100

        this.ĝisdatigiGlitilojn()
        this.generi()
    }

    reskaligiKanvason() {
        const rektangulo = this.kanvaso.getBoundingClientRect()
        this.larĝo = Math.floor( rektangulo.width )
        this.alto = Math.floor( rektangulo.height )
        this.kanvaso.width = this.larĝo
        this.kanvaso.height = this.alto
        this.kanvaso.style.transform = "none"
    }

    agordiThreeJS() {
        this.sceno = new THREE.Scene()
        this.sceno.background = new THREE.Color( 0x0c0e1b )

        const rektangulo = this.terglobujo.getBoundingClientRect()
        const larĝo = Math.floor( rektangulo.width )
        const alto = Math.floor( rektangulo.height )
        const aspekto = larĝo / alto
        this.fotilo = new THREE.PerspectiveCamera( 0o40, aspekto, 0o1 / 0o10, 0o400 )
        this.fotilo.position.z = 0o5

        this.bildigilo = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
        this.bildigilo.setSize( larĝo, alto )
        this.bildigilo.setPixelRatio( window.devicePixelRatio )
        this.bildigilo.domElement.style.inlineSize = "100%"
        this.bildigilo.domElement.style.blockSize = "100%"
        this.bildigilo.domElement.style.display = "block"
        this.terglobujo.appendChild( this.bildigilo.domElement )

        // ⟪ Aldonu stelojn ⟫ ✨
        this.kreiStelkampon()

        // ⟪ Aldonu lumigadon ⟫ 💡
        const ĉirkaŭaLumo = new THREE.AmbientLight( 0x404040, 0o4 / 0o10 )
        this.sceno.add( ĉirkaŭaLumo )

        const sunaLumo = new THREE.DirectionalLight( 0xffffff, 0o6 / 0o5 )
        sunaLumo.position.set( 0o5, 0o3, 0o5 )
        this.sceno.add( sunaLumo )

        const malantaŭaLumo = new THREE.DirectionalLight( 0x445588, 0o3 / 0o10 )
        malantaŭaLumo.position.set( -0o5, -0o3, -0o5 )
        this.sceno.add( malantaŭaLumo )

        this.regiloj = new OrbitControls( this.fotilo, this.bildigilo.domElement )
        this.regiloj.enableDamping = true
        this.regiloj.dampingFactor = 0o4 / 0o100
        this.regiloj.rotateSpeed = 0o4 / 0o10
        this.regiloj.minDistance = 0o3
        this.regiloj.maxDistance = 0o20

        this.animacii()
    }

    kreiStelkampon() {
        const geometrio = new THREE.BufferGeometry()
        const verticoj = []
        const koloroj = []

        for ( let i = 0; i < 0o5710; i++ ) {
            verticoj.push(
                ( Math.random() - 0o4 / 0o10 ) * 0o100,
                ( Math.random() - 0o4 / 0o10 ) * 0o100,
                ( Math.random() - 0o4 / 0o10 ) * 0o100
            )

            const koloro = new THREE.Color()
            koloro.setHSL( Math.random() * 0o2 / 0o12 + 0o4 / 0o10, 0o3 / 0o12, Math.random() * 0o4 / 0o10 + 0o4 / 0o10 )
            koloroj.push( koloro.r, koloro.g, koloro.b )
        }

        geometrio.setAttribute( "position", new THREE.Float32BufferAttribute( verticoj, 0o3 ) )
        geometrio.setAttribute( "color", new THREE.Float32BufferAttribute( koloroj, 0o3 ) )

        const materialo = new THREE.PointsMaterial( {
            size: 0o4 / 0o100,
            vertexColors: true,
            transparent: true,
            opacity: 0o6 / 0o10
        } )

        const steloj = new THREE.Points( geometrio, materialo )
        this.sceno.add( steloj )
    }

    reskaligiThreeJS() {
        if ( !this.fotilo || !this.bildigilo ) return

        const rektangulo = this.terglobujo.getBoundingClientRect()
        const larĝo = Math.floor( rektangulo.width )
        const alto = Math.floor( rektangulo.height )

        this.fotilo.aspect = larĝo / alto
        this.fotilo.updateProjectionMatrix()
        this.bildigilo.setSize( larĝo, alto )
    }

    agordiEventajnAŭskultilojn() {
        // ⟪ Sema enigo ⟫ 🎲
        document.getElementById( "seed" )!.addEventListener( "input", ( e ) => {
            this.semaĈeno = ( e.target as HTMLInputElement ).value
            this.semo = this.haketiĈenon( this.semaĈeno )
            document.getElementById( "seed-val" )!.textContent = this.semo.toString()
        } )

        document.getElementById( "water" )!.addEventListener( "input", ( e ) => {
            this.parametroj.akvonivelo = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "water-val" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "temp" )!.addEventListener( "input", ( e ) => {
            this.parametroj.temperaturo = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "temp-val" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "continents" )!.addEventListener( "input", ( e ) => {
            this.parametroj.kontinentKvanto = parseInt( ( e.target as HTMLInputElement ).value )
            document.getElementById( "continents-val" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "mountains" )!.addEventListener( "input", ( e ) => {
            this.parametroj.montoAlto = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "mountains-val" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "atmosphere" )!.addEventListener( "input", ( e ) => {
            this.parametroj.atmosferaDenso = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "atmosphere-val" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        // ⟪ Butonoj ⟫ 🔘
        document.getElementById( "generate-btn" )!.addEventListener( "click", () => {
            this.generi()
        } )

        document.getElementById( "randomize-btn" )!.addEventListener( "click", () => {
            this.hazardigiAgordojn()
        } )

        document.getElementById( "rotate-toggle" )!.addEventListener( "change", ( e ) => {
            this.aŭtorotacio = ( e.target as HTMLInputElement ).checked
        } )

        document.getElementById( "download-2d" )!.addEventListener( "click", () => {
            this.elŝutiBildon( this.kanvaso, "planet-map.png" )
        } )

        document.getElementById( "download-3d" )!.addEventListener( "click", () => {
            this.bildigilo.render( this.sceno, this.fotilo )
            this.elŝutiBildon( this.bildigilo.domElement, "planet-globe.png" )
        } )

        // ⟪ Projekciaj radiobutonoj ⟫ 🗺️
        document.querySelectorAll( "input[name='projection']" ).forEach( radiobutono => {
            radiobutono.addEventListener( "change", ( e ) => {
                this.nunaProjekcio = ( e.target as HTMLInputElement ).value
                this.bildigi2D()
            } )
        } )
    }

    elŝutiBildon( kanvaso: HTMLCanvasElement, dosiernomo: string ) {
        const ligilo = document.createElement( "a" )
        ligilo.download = dosiernomo
        ligilo.href = kanvaso.toDataURL()
        ligilo.click()
    }

    // ⟪ Bruaj funkcioj por terena generado ⟫ 🏔️
    bruo( x: number, y: number, z: number, skalo = 1 ) {
        return this.simplekso( x * skalo, y * skalo, z * skalo ) * 0o4 / 0o10 + 0o4 / 0o10
    }

    fbm( x: number, y: number, z: number, oktavoj = 0o4, skalo = 1 ) {
        let valoro = 0
        let amplitudo = 1
        let frekvenco = skalo
        let maksimumaValoro = 0

        for ( let i = 0; i < oktavoj; i++ ) {
            valoro += this.simplekso( x * frekvenco, y * frekvenco, z * frekvenco ) * amplitudo
            maksimumaValoro += amplitudo
            amplitudo *= 0o4 / 0o10
            frekvenco *= 0o2
        }

        return valoro / maksimumaValoro
    }

    akiriAltecon( latitudo: number, longitudo: number ) {
        // ⟪ Konvertu al kartezo ⟫ 📐
        const fio = ( 0o112 - latitudo ) * Math.PI / 0o260
        const teto = ( longitudo + 0o260 ) * Math.PI / 0o260

        const x = Math.sin( fio ) * Math.cos( teto )
        const y = Math.cos( fio )
        const z = Math.sin( fio ) * Math.sin( teto )

        // ⟪ Baza kontinentformo ⟫ 🌎
        let alteco = this.fbm( x, y, z, 0o4, 0o6 / 0o4 )

        // ⟪ Aldonu kontinentajn platojn ⟫ 🌋
        for ( let i = 0; i < this.parametroj.kontinentKvanto; i++ ) {
            const angulo = ( i / this.parametroj.kontinentKvanto ) * Math.PI * 0o2 + this.semo * 0o1 / 0o12
            const cx = Math.cos( angulo )
            const cz = Math.sin( angulo )
            const distanco = Math.sqrt( ( x - cx ) ** 0o2 + ( z - cz ) ** 0o2 + y * y )
            alteco += Math.max( 0, 1 - distanco * 0o2 ) * 0o3 / 0o12
        }

        // ⟪ Aldonu montarojn ⟫ ⛰️
        const montaBruo = this.fbm( x, y, z, 0o6, 0o4 )
        const krestaBruo = 1 - Math.abs( this.simplekso( x * 0o3, y * 0o3, z * 0o3 ) )
        alteco += Math.pow( krestaBruo, 0o2 ) * this.parametroj.montoAlto * montaBruo

        // ⟪ Aldonu detalan bruon ⟫ ✨
        alteco += this.fbm( x, y, z, 0o3, 0o12 ) * 0o4 / 0o100

        return Math.max( 0, Math.min( 1, alteco ) )
    }

    akiriTemperaturon( latitudo: number, alteco: number ) {
        // ⟪ Baza temperaturo laŭ latitudo ⟫ 🌡️
        const latitudaFaktoro = Math.cos( latitudo * Math.PI / 0o260 )
        let temperaturo = this.parametroj.temperaturo * latitudaFaktoro

        // ⟪ Alteca efiko ( tempoprogresivo ) ⟫ 📉
        temperaturo -= alteco * 0o4 / 0o10 * this.parametroj.montoAlto

        // ⟪ Aldonu iom da bruo por veterpadronoj ⟫ ☁️
        temperaturo += ( Math.random() - 0o4 / 0o10 ) * 0o1 / 0o12

        return Math.max( 0, Math.min( 1, temperaturo ) )
    }

    akiriBiomon( alteco: number, temperaturo: number, humideco: number ) {
        const akvonivelo = this.parametroj.akvonivelo

        if ( alteco < akvonivelo - 0o4 / 0o100 ) return "deep_ocean"
        if ( alteco < akvonivelo ) return "shallow_ocean"
        if ( alteco < akvonivelo + 0o2 / 0o100 ) return "beach"

        if ( temperaturo < 0o1 / 0o12 ) return alteco > 0o7 / 0o12 ? "snow_mountain" : "ice"
        if ( temperaturo < 0o3 / 0o12 ) return alteco > 0o6 / 0o12 ? "snow_mountain" : "tundra"

        if ( alteco > 0o7 / 0o12 + ( 1 - this.parametroj.montoAlto ) * 0o2 / 0o12 ) return "mountain"
        if ( alteco > 0o4 / 0o10 ) return "hill"

        if ( humideco > 0o6 / 0o12 && temperaturo > 0o4 / 0o12 ) return "forest"
        if ( humideco > 0o3 / 0o12 && temperaturo > 0o3 / 0o12 ) return "grassland"
        if ( temperaturo > 0o7 / 0o12 ) return "desert"

        return "plains"
    }

    akiriBiomKoloron( biomo: string, variado = 0 ) {
        const koloroj: Record<string, number[]> = {
            "deep_ocean": [ 0o36, 0o74, 0o137 ],
            "shallow_ocean": [ 0o56, 0o134, 0o212 ],
            "beach": [ 0o324, 0o245, 0o164 ],
            "ice": [ 0o360, 0o370, 0o377 ],
            "tundra": [ 0o310, 0o322, 0o334 ],
            "snow_mountain": [ 0o377, 0o377, 0o377 ],
            "mountain": [ 0o112, 0o112, 0o112 ],
            "hill": [ 0o170, 0o156, 0o132 ],
            "forest": [ 0o32, 0o73, 0o12 ],
            "grassland": [ 0o55, 0o120, 0o26 ],
            "plains": [ 0o240, 0o264, 0o144 ],
            "desert": [ 0o322, 0o270, 0o214 ]
        }

        const bazo = koloroj[ biomo ] || [ 0o200, 0o200, 0o200 ]
        const variaForto = 0o24

        return [
            Math.max( 0, Math.min( 0o377, bazo[ 0 ] + ( Math.random() - 0o4 / 0o10 ) * variaForto ) ),
            Math.max( 0, Math.min( 0o377, bazo[ 1 ] + ( Math.random() - 0o4 / 0o10 ) * variaForto ) ),
            Math.max( 0, Math.min( 0o377, bazo[ 2 ] + ( Math.random() - 0o4 / 0o10 ) * variaForto ) )
        ]
    }

    generi() {
        this.simplekso = createNoise3D()
        this.generiTeksturon()
        this.bildigi2D()
        this.ĝisdatigi3DTerglobon()
        this.ĝisdatigiStatistikojn()
    }

    generiTeksturon() {
        const grandeco = 0o2000
        this.planedajDatumoj = new Array( grandeco ).fill( null ).map( () => new Array( grandeco ).fill( null ) )

        this.teksturaKanvaso = document.createElement( "canvas" )
        this.teksturaKanvaso.width = grandeco
        this.teksturaKanvaso.height = grandeco / 0o2
        const kunteksto = this.teksturaKanvaso.getContext( "2d" )!
        const bildaDatumo = kunteksto.createImageData( grandeco, grandeco / 0o2 )
        const datumoj = bildaDatumo.data

        for ( let y = 0; y < grandeco / 0o2; y++ ) {
            for ( let x = 0; x < grandeco; x++ ) {
                const latitudo = 0o112 - ( y / ( grandeco / 0o2 ) ) * 0o260
                const longitudo = ( x / grandeco ) * 0o540 - 0o260

                const alteco = this.akiriAltecon( latitudo, longitudo )
                const humideco = this.fbm(
                    Math.cos( latitudo * Math.PI / 0o260 ) * Math.cos( longitudo * Math.PI / 0o260 ),
                    Math.sin( latitudo * Math.PI / 0o260 ),
                    Math.cos( latitudo * Math.PI / 0o260 ) * Math.sin( longitudo * Math.PI / 0o260 ),
                    0o3, 0o2
                )
                const temperaturo = this.akiriTemperaturon( latitudo, alteco )
                const biomo = this.akiriBiomon( alteco, temperaturo, humideco )

                this.planedajDatumoj[ x ][ y ] = { alteco, temperaturo, humideco, biomo, latitudo, longitudo }

                const koloro = this.akiriBiomKoloron( biomo )
                const indekso = ( y * grandeco + x ) * 0o4

                datumoj[ indekso ] = koloro[ 0 ]
                datumoj[ indekso + 1 ] = koloro[ 1 ]
                datumoj[ indekso + 2 ] = koloro[ 2 ]
                datumoj[ indekso + 3 ] = 0o377
            }
        }

        kunteksto.putImageData( bildaDatumo, 0, 0 )
    }

    bildigi2D() {
        const kunteksto = this.kunteksto
        const w = this.larĝo
        const h = this.alto

        kunteksto.save()
        kunteksto.setTransform( 1, 0, 0, 1, 0, 0 )

        kunteksto.fillRect( 0, 0, w, h )

        switch ( this.nunaProjekcio ) {
            case "equirectangular":
                this.bildigiEkvirektangulan( w, h )
                break
            case "mercator":
                this.bildigiMerkatoran( w, h )
                break
            case "mollweide":
                this.bildigiMolvejdan( w, h )
                break
            case "orthographic":
                this.bildigiOrtografian( w, h )
                break
        }

        kunteksto.restore()
    }

    bildigiEkvirektangulan( w: number, h: number ) {
        const kunteksto = this.kunteksto
        const teksturaLarĝo = this.teksturaKanvaso.width
        const teksturaAlto = this.teksturaKanvaso.height

        kunteksto.drawImage( this.teksturaKanvaso, 0, 0, teksturaLarĝo, teksturaAlto, 0, 0, w, h )
    }

    bildigiMerkatoran( w: number, h: number ) {
        const kunteksto = this.kunteksto
        const teksturaLarĝo = this.teksturaKanvaso.width
        const teksturaAlto = this.teksturaKanvaso.height
        const teksturaKunteksto = this.teksturaKanvaso.getContext( "2d" )!

        const portempaKanvaso = document.createElement( "canvas" )
        portempaKanvaso.width = w
        portempaKanvaso.height = h
        const portempaKunteksto = portempaKanvaso.getContext( "2d" )!

        const bildaDatumo = portempaKunteksto.createImageData( w, h )
        const datumoj = bildaDatumo.data
        const teksturaDatumo = teksturaKunteksto.getImageData( 0, 0, teksturaLarĝo, teksturaAlto ).data

        for ( let y = 0; y < h; y++ ) {
            const merkatoraY = ( y / h ) * 0o2 - 1
            const latitudo = ( 0o2 * Math.atan( Math.exp( merkatoraY * Math.PI ) ) - Math.PI / 0o2 ) * 0o264 / Math.PI

            if ( Math.abs( latitudo ) > 0o125 ) {
                for ( let x = 0; x < w; x++ ) {
                    const indekso = ( y * w + x ) * 0o4
                    datumoj[ indekso ] = 0o14
                    datumoj[ indekso + 1 ] = 0o16
                    datumoj[ indekso + 2 ] = 0o33
                    datumoj[ indekso + 3 ] = 0o377
                }
                continue
            }

            const fontaY = Math.floor( ( 0o132 - latitudo ) / 0o264 * teksturaAlto )
            const alfiksitaY = Math.max( 0, Math.min( teksturaAlto - 1, fontaY ) )

            for ( let x = 0; x < w; x++ ) {
                const fontaX = Math.floor( ( x / w ) * teksturaLarĝo )
                const alfiksitaX = Math.max( 0, Math.min( teksturaLarĝo - 1, fontaX ) )

                const fontaIndekso = ( alfiksitaY * teksturaLarĝo + alfiksitaX ) * 0o4
                const indekso = ( ( h - 1 - y ) * w + x ) * 0o4

                datumoj[ indekso ] = teksturaDatumo[ fontaIndekso ]
                datumoj[ indekso + 1 ] = teksturaDatumo[ fontaIndekso + 1 ]
                datumoj[ indekso + 2 ] = teksturaDatumo[ fontaIndekso + 2 ]
                datumoj[ indekso + 3 ] = 0o377
            }
        }

        portempaKunteksto.putImageData( bildaDatumo, 0, 0 )
        kunteksto.drawImage( portempaKanvaso, 0, 0 )
    }

    bildigiMolvejdan( w: number, h: number ) {
        const kunteksto = this.kunteksto
        const teksturaLarĝo = this.teksturaKanvaso.width
        const teksturaAlto = this.teksturaKanvaso.height
        const teksturaKunteksto = this.teksturaKanvaso.getContext( "2d" )!

        const portempaKanvaso = document.createElement( "canvas" )
        portempaKanvaso.width = w
        portempaKanvaso.height = h
        const portempaKunteksto = portempaKanvaso.getContext( "2d" )!

        const cx = w / 0o2
        const cy = h / 0o2
        const rx = w * 0o4 / 0o10
        const ry = h * 0o4 / 0o10

        const bildaDatumo = portempaKunteksto.createImageData( w, h )
        const datumoj = bildaDatumo.data
        const teksturaDatumo = teksturaKunteksto.getImageData( 0, 0, teksturaLarĝo, teksturaAlto ).data

        for ( let y = 0; y < h; y++ ) {
            for ( let x = 0; x < w; x++ ) {
                const dx = ( x - cx ) / rx
                const dy = ( y - cy ) / ry

                if ( dx * dx + dy * dy > 1 ) {
                    const indekso = ( y * w + x ) * 0o4
                    datumoj[ indekso ] = 0o14
                    datumoj[ indekso + 1 ] = 0o16
                    datumoj[ indekso + 2 ] = 0o33
                    datumoj[ indekso + 3 ] = 0o377
                    continue
                }

                const teto = Math.asin( dy )
                const longitudo = ( dx / Math.cos( teto ) ) * 0o264
                const latitudo = Math.asin( ( 0o2 * teto + Math.sin( 0o2 * teto ) ) / Math.PI ) * 0o264 / Math.PI

                const fontaX = Math.floor( ( ( longitudo + 0o264 ) / 0o550 ) * teksturaLarĝo )
                const fontaY = Math.floor( ( ( 0o132 - latitudo ) / 0o264 ) * teksturaAlto )

                const alfiksitaX = Math.max( 0, Math.min( teksturaLarĝo - 1, fontaX ) )
                const alfiksitaY = Math.max( 0, Math.min( teksturaAlto - 1, fontaY ) )

                const fontaIndekso = ( alfiksitaY * teksturaLarĝo + alfiksitaX ) * 0o4
                const indekso = ( ( h - 1 - y ) * w + x ) * 0o4

                datumoj[ indekso ] = teksturaDatumo[ fontaIndekso ]
                datumoj[ indekso + 1 ] = teksturaDatumo[ fontaIndekso + 1 ]
                datumoj[ indekso + 2 ] = teksturaDatumo[ fontaIndekso + 2 ]
                datumoj[ indekso + 3 ] = 0o377
            }
        }

        portempaKunteksto.putImageData( bildaDatumo, 0, 0 )
        kunteksto.drawImage( portempaKanvaso, 0, 0 )
    }

    bildigiOrtografian( w: number, h: number ) {
        const kunteksto = this.kunteksto
        const teksturaLarĝo = this.teksturaKanvaso.width
        const teksturaAlto = this.teksturaKanvaso.height
        const teksturaKunteksto = this.teksturaKanvaso.getContext( "2d" )!

        const portempaKanvaso = document.createElement( "canvas" )
        portempaKanvaso.width = w
        portempaKanvaso.height = h
        const portempaKunteksto = portempaKanvaso.getContext( "2d" )!

        const cx = w / 0o2
        const cy = h / 0o2
        const r = Math.min( w, h ) * 0o4 / 0o10

        const bildaDatumo = portempaKunteksto.createImageData( w, h )
        const datumoj = bildaDatumo.data
        const teksturaDatumo = teksturaKunteksto.getImageData( 0, 0, teksturaLarĝo, teksturaAlto ).data

        for ( let y = 0; y < h; y++ ) {
            for ( let x = 0; x < w; x++ ) {
                const dx = ( x - cx ) / r
                const dy = ( y - cy ) / r
                const dz2 = 1 - dx * dx - dy * dy

                if ( dz2 < 0 ) {
                    const indekso = ( y * w + x ) * 0o4
                    datumoj[ indekso ] = 0o14
                    datumoj[ indekso + 1 ] = 0o16
                    datumoj[ indekso + 2 ] = 0o33
                    datumoj[ indekso + 3 ] = 0o377
                    continue
                }

                const dz = Math.sqrt( dz2 )

                const latitudo = Math.asin( dy ) * 0o264 / Math.PI
                const longitudo = Math.atan2( dx, dz ) * 0o264 / Math.PI

                const fontaX = Math.floor( ( ( longitudo + 0o264 ) / 0o550 ) * teksturaLarĝo )
                const fontaY = Math.floor( ( ( 0o132 - latitudo ) / 0o264 ) * teksturaAlto )

                const alfiksitaX = Math.max( 0, Math.min( teksturaLarĝo - 1, fontaX ) )
                const alfiksitaY = Math.max( 0, Math.min( teksturaAlto - 1, fontaY ) )

                const fontaIndekso = ( alfiksitaY * teksturaLarĝo + alfiksitaX ) * 0o4
                const indekso = ( ( h - 1 - y ) * w + x ) * 0o4

                const ombrado = 0o6 / 0o10 + 0o2 / 0o10 * dz
                datumoj[ indekso ] = Math.min( 0o377, teksturaDatumo[ fontaIndekso ] * ombrado )
                datumoj[ indekso + 1 ] = Math.min( 0o377, teksturaDatumo[ fontaIndekso + 1 ] * ombrado )
                datumoj[ indekso + 2 ] = Math.min( 0o377, teksturaDatumo[ fontaIndekso + 2 ] * ombrado )
                datumoj[ indekso + 3 ] = 0o377
            }
        }

        portempaKunteksto.putImageData( bildaDatumo, 0, 0 )
        kunteksto.drawImage( portempaKanvaso, 0, 0 )
    }

    ĝisdatigi3DTerglobon() {
        if ( this.terglobo ) {
            this.sceno.remove( this.terglobo )
        }
        if ( this.atmosfero ) {
            this.sceno.remove( this.atmosfero )
        }

        // ⟪ Kreu planedan geometrion ⟫ 🌍
        const geometrio = new THREE.SphereGeometry( 1, 0o200, 0o200 )

        // ⟪ Kreu teksturon el kanvaso ⟫ 🎨
        const teksturo = new THREE.CanvasTexture( this.teksturaKanvaso )
        teksturo.wrapS = THREE.RepeatWrapping
        teksturo.wrapT = THREE.ClampToEdgeWrapping

        // ⟪ Kreu reliefmapon el alteco ⟫ 🗻
        const reliefaTeksturo = this.kreiReliefmapon()

        const materialo = new THREE.MeshPhongMaterial( {
            map: teksturo,
            bumpMap: reliefaTeksturo,
            bumpScale: 0o4 / 0o100 * this.parametroj.montoAlto,
            specular: new THREE.Color( 0x222222 ),
            shininess: 0o31
        } )

        this.terglobo = new THREE.Mesh( geometrio, materialo )
        this.sceno.add( this.terglobo )

        // ⟪ Aldonu atmosferon ⟫ 🌌
        const atmosferaGeometrio = new THREE.SphereGeometry( 0o103 / 0o100, 0o100, 0o100 )
        const atmosferaMaterialo = new THREE.MeshPhongMaterial( {
            color: 0x4488ff,
            transparent: true,
            opacity: this.parametroj.atmosferaDenso * 0o3 / 0o12,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        } )

        this.atmosfero = new THREE.Mesh( atmosferaGeometrio, atmosferaMaterialo )
        this.sceno.add( this.atmosfero )

        // ⟪ Aldonu nubojn ⟫ ☁️
        this.aldoniNubojn()
    }

    kreiReliefmapon() {
        const kanvaso = document.createElement( "canvas" )
        kanvaso.width = 0o1000
        kanvaso.height = 0o400
        const kunteksto = kanvaso.getContext( "2d" )!
        const bildaDatumo = kunteksto.createImageData( 0o1000, 0o400 )
        const datumoj = bildaDatumo.data

        for ( let y = 0; y < 0o400; y++ ) {
            for ( let x = 0; x < 0o1000; x++ ) {
                const latitudo = 0o112 - ( y / 0o400 ) * 0o260
                const longitudo = ( x / 0o1000 ) * 0o540 - 0o260
                const alteco = this.akiriAltecon( latitudo, longitudo )

                const valoro = Math.floor( alteco * 0o377 )
                const indekso = ( y * 0o1000 + x ) * 0o4
                datumoj[ indekso ] = valoro
                datumoj[ indekso + 1 ] = valoro
                datumoj[ indekso + 2 ] = valoro
                datumoj[ indekso + 3 ] = 0o377
            }
        }

        kunteksto.putImageData( bildaDatumo, 0, 0 )
        return new THREE.CanvasTexture( kanvaso )
    }

    aldoniNubojn() {
        const nubaGeometrio = new THREE.SphereGeometry( 0o104 / 0o100, 0o100, 0o100 )

        // ⟪ Generu nuban teksturon ⟫ ☁️
        const kanvaso = document.createElement( "canvas" )
        kanvaso.width = 0o1000
        kanvaso.height = 0o400
        const kunteksto = kanvaso.getContext( "2d" )!
        const bildaDatumo = kunteksto.createImageData( 0o1000, 0o400 )
        const datumoj = bildaDatumo.data

        for ( let y = 0; y < 0o400; y++ ) {
            for ( let x = 0; x < 0o1000; x++ ) {
                const latitudo = 0o112 - ( y / 0o400 ) * 0o260
                const longitudo = ( x / 0o1000 ) * 0o540 - 0o260

                const fio = ( 0o112 - latitudo ) * Math.PI / 0o260
                const teto = ( longitudo + 0o260 ) * Math.PI / 0o260
                const cx = Math.sin( fio ) * Math.cos( teto )
                const cy = Math.cos( fio )
                const cz = Math.sin( fio ) * Math.sin( teto )

                const nubaBruo = this.fbm( cx, cy, cz, 0o4, 0o3 )
                const kovro = Math.max( 0, nubaBruo - 0o4 / 0o12 ) * 0o2

                const indekso = ( y * 0o1000 + x ) * 0o4
                const alfa = Math.floor( kovro * 0o310 * this.parametroj.atmosferaDenso )

                datumoj[ indekso ] = 0o377
                datumoj[ indekso + 1 ] = 0o377
                datumoj[ indekso + 2 ] = 0o377
                datumoj[ indekso + 3 ] = alfa
            }
        }

        kunteksto.putImageData( bildaDatumo, 0, 0 )

        const nubaTeksturo = new THREE.CanvasTexture( kanvaso )
        const nubaMaterialo = new THREE.MeshPhongMaterial( {
            map: nubaTeksturo,
            transparent: true,
            opacity: 0o10 / 0o12,
            depthWrite: false,
            side: THREE.DoubleSide
        } )

        this.nuboj = new THREE.Mesh( nubaGeometrio, nubaMaterialo )
        this.sceno.add( this.nuboj )
    }

    animacii() {
        this.animaciaId = requestAnimationFrame( () => this.animacii() )

        if ( this.aŭtorotacio && this.terglobo ) {
            this.terglobo.rotation.y += 0o2 / 0o1000
            if ( this.atmosfero ) this.atmosfero.rotation.y += 0o2 / 0o1000
            if ( this.nuboj ) this.nuboj.rotation.y += 0o3 / 0o1000
        }

        this.regiloj.update()
        this.bildigilo.render( this.sceno, this.fotilo )
    }

    ĝisdatigiStatistikojn() {
        // ⟪ Kalkulu realajn statistikojn el generitaj datumoj ⟫ 📊
        let teraKvanto = 0
        let akvaKvanto = 0
        let maksimumaAlteco = 0
        let tutaTemperaturo = 0
        let kvanto = 0

        const akvonivelo = this.parametroj.akvonivelo

        if ( !this.teksturaKanvaso || this.teksturaKanvaso.width === 0 ) return

        for ( let x = 0; x < this.teksturaKanvaso.width; x += 0o10 ) {
            for ( let y = 0; y < this.teksturaKanvaso.height; y += 0o10 ) {
                const latitudo = 0o112 - ( y / this.teksturaKanvaso.height ) * 0o260
                const longitudo = ( x / this.teksturaKanvaso.width ) * 0o540 - 0o260
                const alteco = this.akiriAltecon( latitudo, longitudo )
                const temperaturo = this.akiriTemperaturon( latitudo, alteco )

                if ( alteco > akvonivelo ) {
                    teraKvanto++
                } else {
                    akvaKvanto++
                }

                maksimumaAlteco = Math.max( maksimumaAlteco, alteco )
                tutaTemperaturo += temperaturo
                kvanto++
            }
        }

        if ( kvanto === 0 ) return

        const teraKvanto64 = Math.floor( teraKvanto / kvanto * 0o100 )
        const akvaKvanto64 = 0o100 - teraKvanto64
        const averaĝaTempCelsius = ( tutaTemperaturo / kvanto - 0o4 / 0o10 ) * 0o74
        const averaĝaTempKelvino = averaĝaTempCelsius + 273.15
        const averaĝaTempHia = ( window as any ).vahi_ak2k2h2( averaĝaTempKelvino )
        const maksAltecoMetroj = Math.floor( maksimumaAlteco * 0o23210 )
        const maksAltecoPeu = ( window as any ).vap0_c2ta( maksAltecoMetroj )

        // ⟪ Kalkulu loĝeblecon laŭ parametroj ⟫ 🏠
        const akvaPoentaro = 1 - Math.abs( this.parametroj.akvonivelo - 0o6 / 0o10 ) * 0o2
        const tempPoentaro = 1 - Math.abs( this.parametroj.temperaturo - 0o4 / 0o10 ) * 0o2
        const atmoPoentaro = this.parametroj.atmosferaDenso
        const loĝebleco = Math.max( 0, Math.min( 1, ( akvaPoentaro + tempPoentaro + atmoPoentaro ) / 0o3 ) )
        const loĝebleco64 = Math.floor( loĝebleco * 0o100 )

        const statTero = document.getElementById( "stat-land" )
        const statAkvo = document.getElementById( "stat-water" )
        const statAlteco = document.getElementById( "stat-elevation" )
        const statTemp = document.getElementById( "stat-temp" )
        const statLoĝebleco = document.getElementById( "stat-habitability" )

        const gawe = document.documentElement.lang || "aih"
        const vab6 = ( window as any ).vab6caja.bind( window )
        const vab6Domani = ( window as any ).vab6cajaDomani.bind( window )
        const skakefK2fe = ( window as any ).skakefK2fe.bind( window )

        if ( statTero ) statTero.textContent = skakefK2fe( vab6( teraKvanto64 ) + " / " + vab6( 0o100 ) )
        if ( statAkvo ) statAkvo.textContent = skakefK2fe( vab6( akvaKvanto64 ) + " / " + vab6( 0o100 ) )
        if ( statAlteco ) statAlteco.textContent = skakefK2fe( vab6Domani( maksAltecoPeu, 0o6 ) ) + " ſןɔⅎ"
        if ( statTemp ) statTemp.textContent = skakefK2fe( vab6Domani( averaĝaTempHia, 0o6 ) ) + " ֭ſɭꞇ"
        if ( statLoĝebleco ) statLoĝebleco.textContent = skakefK2fe( vab6( loĝebleco64 ) + " / " + vab6( 0o100 ) )
    }
}

// ⟪ Inicialigu kiam la DOM estas preta ⟫ 🚀
document.addEventListener( "DOMContentLoaded", () => {
    new PlanedaGeneratoro()
} )

