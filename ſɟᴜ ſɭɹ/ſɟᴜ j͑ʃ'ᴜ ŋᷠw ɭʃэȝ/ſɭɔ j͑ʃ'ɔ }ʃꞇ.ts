// ≺⧼ j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ſ͔ɭᴜ ᶅſɔ ſɭɹʞ 🌍 ⧽≻

import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { createNoise3D, NoiseFunction3D } from "simplex-noise"

class Mut6qKf2 {
    private beSaxe: NoiseFunction3D
    private bal2xaP2t6zo: HTMLCanvasElement
    private bal2xaKek: CanvasRenderingContext2D
    private mut6qKuba: HTMLElement
    private kxesuBal2xa: string
    private cukK61e: string
    private cuk: number
    private sefini: number
    private l6da: number
    private saxeS2sabo: boolean
    private saxeKuba: any
    private catahaq: any
    private suntaSaxe: any
    private mut6q: any
    private pucana: any
    private f2m2: any
    private kama: any
    private k2feXema: number | null
    private xema: {
        tsaK2fe: number
        hia: number
        tutalK2fe: number
        jaqoL6da: number
        pucanaK2fe: number
    }
    private lkoP2t6zo: HTMLCanvasElement = document.createElement( "canvas" )
    private k2fP2t6zo: HTMLCanvasElement
    private k2fKek: CanvasRenderingContext2D
    private k2fKxesu: boolean
    private kxesuX: number
    private kxesuY: number
    private b6K61e: HTMLElement
    private b6Kxesu: boolean

    k61eK2fe( k61e: string ): number {
        let k2fe = 0o0
        for ( let i = 0o0; i < k61e.length; i++ ) {
            const kp6 = k61e.charCodeAt( i )
            k2fe = ( k2fe << 0o5 ) - k2fe + kp6
            k2fe = k2fe & k2fe
        }
        return Math.abs( k2fe )
    }

    constructor() {
        const saxeBe = createNoise3D()
        this.beSaxe = saxeBe
        this.bal2xaP2t6zo = document.getElementById( "bal2xap2t6zo" ) as HTMLCanvasElement
        this.bal2xaKek = this.bal2xaP2t6zo.getContext( "2d" )!
        this.mut6qKuba = document.getElementById( "mut6qkuba" )!
        this.kxesuBal2xa = "saxebal2xa"
        this.cukK61e = "42"
        this.cuk = this.quqCuk( this.cukK61e )
        this.sefini = 0o2000
        this.l6da = 0o400
        this.saxeS2sabo = true
        this.saxeKuba = null
        this.catahaq = null
        this.suntaSaxe = null
        this.mut6q = null
        this.pucana = null
        this.kama = null
        this.k2feXema = null

        this.xema = {
            tsaK2fe: 0o2 / 0o10,
            hia: 0o4 / 0o10,
            tutalK2fe: 0o4,
            jaqoL6da: 0o3 / 0o10,
            pucanaK2fe: 0o6 / 0o10,
        }

        this.k2fP2t6zo = document.getElementById( "k2fp2t6zo" ) as HTMLCanvasElement
        this.k2fKek = this.k2fP2t6zo.getContext( "2d" )!
        this.k2fKxesu = false
        this.kxesuX = 0o0
        this.kxesuY = 0o0
        this.b6K61e = document.getElementById( "b6k61e" )!
        this.b6Kxesu = false

        this.saxe()
    }

    saxe() {
        this.p6zukP2t6zo()
        this.xemaSaxeKuba()
        this.xemaKeve()
        this.xemaK2f()
        this.v3ak2K6tani()
        this.kf2()

        window.addEventListener( "resize", () => {
            this.p6zukP2t6zo()
            this.p6zukSaxeKuba()
            this.suntaBal2xa()
        } )
    }

    v3ak2K6tani() {
        const cukK2fe = document.getElementById( "cukk2fe" )
        const tsaK2fe = document.getElementById( "tsak2fe" )
        const hiaK2fe = document.getElementById( "hiak2fe" )
        const tutalK2fe = document.getElementById( "tutalk2fe" )
        const jaqoK2fe = document.getElementById( "jaqok2fe" )
        const pucanaK2fe = document.getElementById( "pucanak2fe" )

        const cukXema = document.getElementById( "cuk" ) as HTMLInputElement
        const tsaXema = document.getElementById( "tsa" ) as HTMLInputElement
        const hiaXema = document.getElementById( "hia" ) as HTMLInputElement
        const tutalXema = document.getElementById( "tutal" ) as HTMLInputElement
        const jaqoXema = document.getElementById( "jaqo" ) as HTMLInputElement
        const pucanaXema = document.getElementById( "pucana" ) as HTMLInputElement

        if ( cukK2fe && cukXema ) cukK2fe.textContent = cukXema.value
        if ( tsaK2fe && tsaXema ) tsaK2fe.textContent = tsaXema.value
        if ( hiaK2fe && hiaXema ) hiaK2fe.textContent = hiaXema.value
        if ( tutalK2fe && tutalXema ) tutalK2fe.textContent = tutalXema.value
        if ( jaqoK2fe && jaqoXema ) jaqoK2fe.textContent = jaqoXema.value
        if ( pucanaK2fe && pucanaXema ) pucanaK2fe.textContent = pucanaXema.value
    }

    osakajoXema() {
        const cukXema = document.getElementById( "cuk" ) as HTMLInputElement
        const tsaXema = document.getElementById( "tsa" ) as HTMLInputElement
        const hiaXema = document.getElementById( "hia" ) as HTMLInputElement
        const tutalXema = document.getElementById( "tutal" ) as HTMLInputElement
        const jaqoXema = document.getElementById( "jaqo" ) as HTMLInputElement
        const pucanaXema = document.getElementById( "pucana" ) as HTMLInputElement

        const osakajoK61e = Math.random().toString( 0o44 ).substring( 0o2, 0o15 )
        const kxesuCuk = osakajoK61e
        const kxesuTsa = Math.floor( Math.random() * 0o100 )
        const kxesuHia = Math.floor( Math.random() * 0o100 )
        const kxesuTutal = Math.floor( Math.random() * 0o10 ) + 0o1
        const kxesuJaqo = Math.floor( Math.random() * 0o100 )
        const kxesuPucana = Math.floor( Math.random() * 0o100 )

        cukXema.value = kxesuCuk
        tsaXema.value = kxesuTsa.toString()
        hiaXema.value = kxesuHia.toString()
        tutalXema.value = kxesuTutal.toString()
        jaqoXema.value = kxesuJaqo.toString()
        pucanaXema.value = kxesuPucana.toString()

        this.cukK61e = kxesuCuk
        this.cuk = this.quqCuk( this.cukK61e )
        this.xema.tsaK2fe = kxesuTsa / 0o100
        this.xema.hia = kxesuHia / 0o100
        this.xema.tutalK2fe = kxesuTutal
        this.xema.jaqoL6da = kxesuJaqo / 0o100
        this.xema.pucanaK2fe = kxesuPucana / 0o100

        this.v3ak2K6tani()
        this.kf2()
    }

    p6zukP2t6zo() {
        const saxeAraq = this.bal2xaP2t6zo.getBoundingClientRect()
        this.sefini = Math.floor( saxeAraq.width )
        this.l6da = Math.floor( saxeAraq.height )
        this.bal2xaP2t6zo.width = this.sefini
        this.bal2xaP2t6zo.height = this.l6da
        this.bal2xaP2t6zo.style.transform = "none"
    }

    xemaSaxeKuba() {
        this.saxeKuba = new THREE.Scene()
        this.saxeKuba.background = new THREE.Color( 0x0c0e1b )

        const saxeAraq = this.mut6qKuba.getBoundingClientRect()
        const sefini = Math.floor( saxeAraq.width )
        const l6da = Math.floor( saxeAraq.height )
        const sefiniL6da = sefini / l6da
        this.catahaq = new THREE.PerspectiveCamera( 0o40, sefiniL6da, 0o1 / 0o10, 0o400 )
        this.catahaq.position.z = 0o5

        this.suntaSaxe = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
        this.suntaSaxe.setSize( sefini, l6da )
        this.suntaSaxe.setPixelRatio( window.devicePixelRatio )
        this.suntaSaxe.domElement.style.inlineSize = "100%"
        this.suntaSaxe.domElement.style.blockSize = "100%"
        this.suntaSaxe.domElement.style.display = "block"
        this.mut6qKuba.appendChild( this.suntaSaxe.domElement )

        // ⟪ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ⟫ ✨
        this.kf2Sexi()

        // ⟪ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſᶘꞇ ɭl̀ɔ ⟫ 💡
        const saxeTsije = new THREE.AmbientLight( 0x404040, 0o4 / 0o10 )
        this.saxeKuba.add( saxeTsije )

        const so12Tsije = new THREE.DirectionalLight( 0xffffff, 0o6 / 0o5 )
        so12Tsije.position.set( 0o5, 0o3, 0o5 )
        this.saxeKuba.add( so12Tsije )

        const araqTsije = new THREE.DirectionalLight( 0x445588, 0o3 / 0o10 )
        araqTsije.position.set( -0o5, -0o3, -0o5 )
        this.saxeKuba.add( araqTsije )

        this.kama = new OrbitControls( this.catahaq, this.suntaSaxe.domElement )
        this.kama.enableDamping = true
        this.kama.dampingFactor = 0o4 / 0o100
        this.kama.rotateSpeed = 0o4 / 0o10
        this.kama.minDistance = 0o3
        this.kama.maxDistance = 0o20

        this.kxesuS2sabo()
    }

    kf2Sexi() {
        const xezHtaka = new THREE.BufferGeometry()
        const n2kCa1ara = []
        const weh2Ca1ara = []

        for ( let i = 0o0; i < 0o5710; i++ ) {
            n2kCa1ara.push(
                ( Math.random() - 0o4 / 0o10 ) * 0o100,
                ( Math.random() - 0o4 / 0o10 ) * 0o100,
                ( Math.random() - 0o4 / 0o10 ) * 0o100
            )

            const weh2 = new THREE.Color()
            weh2.setHSL( Math.random() * 0o2 / 0o12 + 0o4 / 0o10, 0o3 / 0o12, Math.random() * 0o4 / 0o10 + 0o4 / 0o10 )
            weh2Ca1ara.push( weh2.r, weh2.g, weh2.b )
        }

        xezHtaka.setAttribute( "position", new THREE.Float32BufferAttribute( n2kCa1ara, 0o3 ) )
        xezHtaka.setAttribute( "color", new THREE.Float32BufferAttribute( weh2Ca1ara, 0o3 ) )

        const eskek = new THREE.PointsMaterial( {
            size: 0o4 / 0o100,
            vertexColors: true,
            transparent: true,
            opacity: 0o6 / 0o10
        } )

        const sexi = new THREE.Points( xezHtaka, eskek )
        this.saxeKuba.add( sexi )
    }

    p6zukSaxeKuba() {
        if ( !this.catahaq || !this.suntaSaxe ) return

        const saxeAraq = this.mut6qKuba.getBoundingClientRect()
        const sefini = Math.floor( saxeAraq.width )
        const l6da = Math.floor( saxeAraq.height )

        this.catahaq.aspect = sefini / l6da
        this.catahaq.updateProjectionMatrix()
        this.suntaSaxe.setSize( sefini, l6da )
    }

    xemaKeve() {
        // ⟪ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ⟫ 🎲
        document.getElementById( "cuk" )!.addEventListener( "input", ( e ) => {
            this.cukK61e = ( e.target as HTMLInputElement ).value
            this.cuk = this.quqCuk( this.cukK61e )
            document.getElementById( "cukk2fe" )!.textContent = this.cuk.toString()
        } )

        document.getElementById( "tsa" )!.addEventListener( "input", ( e ) => {
            this.xema.tsaK2fe = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "tsak2fe" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "hia" )!.addEventListener( "input", ( e ) => {
            this.xema.hia = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "hiak2fe" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "tutal" )!.addEventListener( "input", ( e ) => {
            this.xema.tutalK2fe = parseInt( ( e.target as HTMLInputElement ).value )
            document.getElementById( "tutalk2fe" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "jaqo" )!.addEventListener( "input", ( e ) => {
            this.xema.jaqoL6da = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "jaqok2fe" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "pucana" )!.addEventListener( "input", ( e ) => {
            this.xema.pucanaK2fe = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "pucanak2fe" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        // ⟪ ſᶘɹ }ʃᴜ }ʃw 🔘 ⟫
        document.getElementById( "kf2kek" )!.addEventListener( "click", () => {
            this.kf2()
        } )

        document.getElementById( "osakajokek" )!.addEventListener( "click", () => {
            this.osakajoXema()
        } )

        document.getElementById( "s2sabokek" )!.addEventListener( "change", ( e ) => {
            this.saxeS2sabo = ( e.target as HTMLInputElement ).checked
        } )

        document.getElementById( "qumk2bal2xa" )!.addEventListener( "click", () => {
            this.qumk2Tahaq( this.bal2xaP2t6zo, "planet-map.png" )
        } )

        document.getElementById( "qumk2l6ksabosai" )!.addEventListener( "click", () => {
            this.suntaSaxe.render( this.saxeKuba, this.catahaq )
            this.qumk2Tahaq( this.suntaSaxe.domElement, "planet-globe.png" )
        } )

        // ⟪ ſᶘɹ }ʃᴜ }ʃw 🗺️ ⟫
        document.querySelectorAll( "input[name='bal2xa']" ).forEach( kp6Kek => {
            kp6Kek.addEventListener( "change", ( e ) => {
                this.kxesuBal2xa = ( e.target as HTMLInputElement ).value
                this.suntaBal2xa()
            } )
        } )
    }

    qumk2Tahaq( p2t6zo: HTMLCanvasElement, ksaka: string ) {
        const qumk2 = document.createElement( "a" )
        qumk2.download = ksaka
        qumk2.href = p2t6zo.toDataURL()
        qumk2.click()
    }

    // ⟪ ſɭɹʞ ʌ ᶅſɔ ֭ſɭɹ ʌ ʃɔ 🖌️ ⟫

    // ⟪ ſɟɔ ŋᷠɔ ʌ ʃɔ ʌ ⺓ ʌ ꞁȷ̀ꞇ j͑ʃ'ɹƴ ⟅ 🔢 ⟫
    quqCuk( k61e: string ): number {
        if ( /^[0-9]+$/.test( k61e ) ) return parseInt( k61e )
        return this.k61eK2fe( k61e )
    }

    // ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ ʌ ʃɔ 🎲 ⟫
    kf2Osakajo( cuk: number ): () => number {
        let kxesuK2fe = cuk >>> 0o0
        return () => {
            kxesuK2fe = ( kxesuK2fe + 0o15512674765 ) >>> 0o0
            let t = kxesuK2fe
            t = Math.imul( t ^ ( t >>> 0o17 ), t | 0o1 )
            t ^= t + Math.imul( t ^ ( t >>> 0o7 ), t | 0o75 )
            return ( ( t ^ ( t >>> 0o16 ) ) >>> 0o0 ) / 0o40000000000
        }
    }

    xemaK2f() {
        // ⟪ ſɭʞɹ ʌ ᶅſɔ ֭ſɭɹ 🖌️ ⟫
        this.k2fP2t6zo.style.touchAction = "none"
        this.ne1aK2f()

        this.k2fP2t6zo.addEventListener( "pointerdown", ( e ) => {
            this.k2fKxesu = true
            const kxesuAraq = this.quqK2fN2k( e )
            this.kxesuX = kxesuAraq[0o0]
            this.kxesuY = kxesuAraq[0o1]
            this.k2fP2t6zo.setPointerCapture( e.pointerId )
        } )

        this.k2fP2t6zo.addEventListener( "pointermove", ( e ) => {
            if ( !this.k2fKxesu ) return
            const kxesuAraq = this.quqK2fN2k( e )
            this.k2fKek.lineWidth = 0o4
            this.k2fKek.lineCap = "round"
            this.k2fKek.lineJoin = "round"
            this.k2fKek.strokeStyle = "#FFFFFF"
            this.k2fKek.beginPath()
            this.k2fKek.moveTo( this.kxesuX, this.kxesuY )
            this.k2fKek.lineTo( kxesuAraq[0o0], kxesuAraq[0o1] )
            this.k2fKek.stroke()
            this.kxesuX = kxesuAraq[0o0]
            this.kxesuY = kxesuAraq[0o1]
        } )

        const kxesuNe1a = () => {
            this.k2fKxesu = false
        }

        this.k2fP2t6zo.addEventListener( "pointerup", kxesuNe1a )
        this.k2fP2t6zo.addEventListener( "pointerleave", kxesuNe1a )

        document.getElementById( "ne1akek" )!.addEventListener( "click", () => {
            this.ne1aK2f()
        } )

        document.getElementById( "q2qkek" )!.addEventListener( "click", () => {
            document.getElementById( "q2qxema" )!.click()
        } )

        document.getElementById( "q2qxema" )!.addEventListener( "change", ( e ) => {
            const q2qXema = e.target as HTMLInputElement
            const cakavop2 = q2qXema.files?.[ 0o0 ]
            if ( !cakavop2 ) return
            this.quqQ2q( cakavop2 )
            q2qXema.value = ""
        } )

        document.getElementById( "b6kek" )!.addEventListener( "click", () => {
            this.b6Cuk()
        } )
    }

    quqK2fN2k( e: PointerEvent ): [ number, number ] {
        const saxeAraq = this.k2fP2t6zo.getBoundingClientRect()
        const x = ( e.clientX - saxeAraq.left ) * ( this.k2fP2t6zo.width / saxeAraq.width )
        const y = ( e.clientY - saxeAraq.top ) * ( this.k2fP2t6zo.height / saxeAraq.height )
        return [ x, y ]
    }

    ne1aK2f() {
        this.k2fKek.fillStyle = "#001828"
        this.k2fKek.fillRect( 0o0, 0o0, this.k2fP2t6zo.width, this.k2fP2t6zo.height )
        this.b6K61e.textContent = ""
    }

    quqQ2q( cakavop2: File ) {
        const cakavop2Xema = new FileReader()
        cakavop2Xema.onload = () => {
            const tahaq = new Image()
            tahaq.onload = () => {
                this.ne1aK2f()
                const sefiniL6da = Math.min( this.k2fP2t6zo.width / tahaq.width, this.k2fP2t6zo.height / tahaq.height )
                const w = tahaq.width * sefiniL6da
                const h = tahaq.height * sefiniL6da
                const x = ( this.k2fP2t6zo.width - w ) / 0o2
                const y = ( this.k2fP2t6zo.height - h ) / 0o2
                this.k2fKek.drawImage( tahaq, x, y, w, h )
            }
            tahaq.src = cakavop2Xema.result as string
        }
        cakavop2Xema.readAsDataURL( cakavop2 )
    }

    // ⟪ ſɭc̗ᴜ j͑ʃ'ɔ ʌ ʃɔ 🎯 ⟫
    b6Cuk() {
        if ( this.b6Kxesu ) return
        // ⟪ ſɟɔ ŋᷠɔ ʌ ſɭw ʃᴜ 🗺️ ⟫
        const b6KubaSefini = 0o30
        const b6KubaL6da = 0o14
        const b6KubaK2fe = b6KubaSefini * b6KubaL6da

        const b6KubaP2t6zo = document.createElement( "canvas" )
        b6KubaP2t6zo.width = b6KubaSefini
        b6KubaP2t6zo.height = b6KubaL6da
        const b6KubaKek = b6KubaP2t6zo.getContext( "2d" )!
        b6KubaKek.drawImage( this.k2fP2t6zo, 0o0, 0o0, b6KubaSefini, b6KubaL6da )
        const sab2 = b6KubaKek.getImageData( 0o0, 0o0, b6KubaSefini, b6KubaL6da ).data

        const kxesuOzCa1ara: boolean[] = []
        let tsijeK2fe = 0o0
        for ( let i = 0o0; i < b6KubaK2fe; i++ ) {
            const tsije = ( sab2[i * 0o4] + sab2[i * 0o4 + 0o1] + sab2[i * 0o4 + 0o2] ) / 0o3
            const oz = tsije >= 0o200
            kxesuOzCa1ara.push( oz )
            if ( oz ) tsijeK2fe++
        }

        if ( tsijeK2fe === 0o0 ) {
            document.getElementById( "b6ciihii" )!.classList.remove( "kobe" )
            this.b6K61e.textContent = "ꞁȷ̀ɔ ſ͕ɭɹƽ"
            return
        }

        const ozSefiniL6da = tsijeK2fe / b6KubaK2fe
        const tsaKubaK2fe = b6KubaK2fe - tsijeK2fe
        const saxeTsaK2fe = this.xema.tsaK2fe

        // ⟪ }ʃɹƽ ʌ ʃɔ 📊 ⟫
        const qu1al = ( cuk: number ): number => {
            this.cuk = cuk
            this.beSaxe = createNoise3D( this.kf2Osakajo( cuk ) )
            let ozXekox2q = 0o0
            let tsaXekox2q = 0o0
            let kf2OzK2fe = 0o0
            for ( let y = 0o0; y < b6KubaL6da; y++ ) {
                for ( let x = 0o0; x < b6KubaSefini; x++ ) {
                    const l6daK2fe = 0o132 - ( y / b6KubaL6da ) * 0o264
                    const sefiniK2fe = ( x / b6KubaSefini ) * 0o550 - 0o264
                    const oz = this.quqL6da( l6daK2fe, sefiniK2fe ) > saxeTsaK2fe
                    if ( oz ) kf2OzK2fe++
                    const kxesuOz = kxesuOzCa1ara[y * b6KubaSefini + x]
                    if ( oz && kxesuOz ) ozXekox2q++
                    else if ( !oz && !kxesuOz ) tsaXekox2q++
                }
            }
            // ⟪ ɭʃэ ſɭɔȝ ʌ ſᶘᴜ ⚖️ ⟫
            const kxesuXekox2q = ( ozXekox2q * 0o20 + tsaXekox2q ) / ( tsijeK2fe * 0o20 + tsaKubaK2fe )
            const sefiniL6daXekox2q = 0o1 - Math.abs( ozSefiniL6da - kf2OzK2fe / b6KubaK2fe )
            return kxesuXekox2q * 0o5 / 0o10 + sefiniL6daXekox2q * 0o3 / 0o10
        }

        // ⟪ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ⏳ ⟫
        this.b6Kxesu = true
        document.getElementById( "b6ciihii" )!.classList.remove( "kobe" )
        this.b6K61e.textContent = "…"
        window.setTimeout( () => {
            try {
            // ⟪ ſɭw ʃᴜ 🎲 ⟫
            const osakajo = this.kf2Osakajo( Math.floor( Math.random() * 0o200000000 ) )
            const osakajoCa1ara: number[] = []
            for ( let i = 0o0; i < 0o200; i++ ) osakajoCa1ara.push( Math.floor( osakajo() * 0o4000000 ) )

            // ⟪ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ʃɔ 🏝️ ⟫
            let kemafi: { cuk: number, qu1al: number, tutalK2fe: number } = { cuk: 0o0, qu1al: 0o0, tutalK2fe: this.xema.tutalK2fe }
            for ( let tutalK2fe = 0o1; tutalK2fe <= 0o10; tutalK2fe++ ) {
                this.xema.tutalK2fe = tutalK2fe
                let kemafiCa1ara: { cuk: number, qu1al: number }[] = []
                for ( const osakajoKxesu of osakajoCa1ara ) {
                    const kxesuQu1al = qu1al( osakajoKxesu )
                    kemafiCa1ara.push( { cuk: osakajoKxesu, qu1al: kxesuQu1al } )
                    kemafiCa1ara.sort( ( a, b ) => b.qu1al - a.qu1al )
                    if ( kemafiCa1ara.length > 0o4 ) kemafiCa1ara.pop()
                }

                // ⟪ j͑ʃ'ᴜ j͑ʃᴜ ſɭᴜ ʌ ſɭw ʃᴜ ⛰️ ⟫
                let kemafiKxesu = kemafiCa1ara[0o0]
                for ( const kxesuKemafi of kemafiCa1ara ) {
                    const tlak2Kemafi = this.tlak2Cuk( kxesuKemafi.cuk, qu1al )
                    if ( tlak2Kemafi.qu1al > kemafiKxesu.qu1al ) kemafiKxesu = tlak2Kemafi
                }

                if ( kemafiKxesu.qu1al > kemafi.qu1al ) {
                    kemafi = { cuk: kemafiKxesu.cuk, qu1al: kemafiKxesu.qu1al, tutalK2fe: tutalK2fe }
                }
            }

            // ⟪ ſɭɹ ɽ͑ʃ'ɔ ʌ ֭ſɭᴜ ı],ɔ 🎲 ⟫
            this.xema.tutalK2fe = kemafi.tutalK2fe
            const tutalXema = document.getElementById( "tutal" ) as HTMLInputElement
            tutalXema.value = kemafi.tutalK2fe.toString()
            document.getElementById( "tutalk2fe" )!.textContent = kemafi.tutalK2fe.toString()

            const kxesuCuk = Math.floor( kemafi.cuk )
            this.cukK61e = kxesuCuk.toString()
            this.cuk = kxesuCuk
            const cukXema = document.getElementById( "cuk" ) as HTMLInputElement
            cukXema.value = this.cukK61e
            document.getElementById( "cukk2fe" )!.textContent = this.cuk.toString()
            this.kf2()

            // ⟪ ſɟɔ ŋᷠɔ ʌ }ʃɹƽ 📊 ⟫
            const vab6 = ( window as any ).vab6caja.bind( window )
            const skakefK2fe = ( window as any ).skakefK2fe.bind( window )
            const qu1alK2fe = Math.floor( kemafi.qu1al * 0o100 )
            this.b6K61e.textContent = skakefK2fe( vab6( qu1alK2fe ) + " / " + vab6( 0o100 ) )
            } finally {
                this.b6Kxesu = false
            }
        }, 0o0 )
    }

    // ⟪ ꞁȷ̀ɹ ʃᴜ ſɭᴜ }ʃɜ ʌ ʃɔ ⛰️ ⟫
    tlak2Cuk( saxeCuk: number, saxeQu1al: ( cuk: number ) => number ): { cuk: number, qu1al: number } {
        let cuk = saxeCuk
        let kemafiQu1al = saxeQu1al( cuk )
        let v3ak2 = true
        while ( v3ak2 ) {
            v3ak2 = false
            for ( const saxeK2fe of [ 0o1, 0o10, 0o100, 0o1000, 0o10000, 0o100000 ] ) {
                for ( const saxeAraq of [ -0o1, 0o1 ] ) {
                    const kxesuCuk = cuk + saxeAraq * saxeK2fe
                    if ( kxesuCuk < 0o0 ) continue
                    const kxesuQu1al = saxeQu1al( kxesuCuk )
                    if ( kxesuQu1al > kemafiQu1al ) {
                        cuk = kxesuCuk
                        kemafiQu1al = kxesuQu1al
                        v3ak2 = true
                        break
                    }
                }
                if ( v3ak2 ) break
            }
        }
        return { cuk: cuk, qu1al: kemafiQu1al }
    }

    // ⟪ ſɭʞɹ ʌ ʃɔ 🏔️ ⟫
    be( x: number, y: number, z: number, p6zuk = 0o1 ) {
        return this.beSaxe( x * p6zuk, y * p6zuk, z * p6zuk ) * 0o4 / 0o10 + 0o4 / 0o10
    }

    fbm( x: number, y: number, z: number, n2k = 0o4, p6zuk = 0o1 ) {
        let eskek = 0o0
        let k2fe = 0o1
        let kxesuP6zuk = p6zuk
        let kemafiK2fe = 0o0

        for ( let i = 0o0; i < n2k; i++ ) {
            eskek += this.beSaxe( x * kxesuP6zuk, y * kxesuP6zuk, z * kxesuP6zuk ) * k2fe
            kemafiK2fe += k2fe
            k2fe *= 0o4 / 0o10
            kxesuP6zuk *= 0o2
        }

        return eskek / kemafiK2fe
    }

    quqL6da( l6daK2fe: number, sefiniK2fe: number ) {
        // ⟪ ɭʃɀɜ ʌ }ʃɹƽ 📐 ⟫
        const l6daQuqK2fe = ( 0o132 - l6daK2fe ) * Math.PI / 0o264
        const sefiniQuqK2fe = ( sefiniK2fe + 0o264 ) * Math.PI / 0o264

        const x = Math.sin( l6daQuqK2fe ) * Math.cos( sefiniQuqK2fe )
        const y = Math.cos( l6daQuqK2fe )
        const z = Math.sin( l6daQuqK2fe ) * Math.sin( sefiniQuqK2fe )

        // ⟪ ſɭc̗ᴜ ſɭɹ ſȷɔ 🌎 ⟫
        let ozL6da = this.fbm( x, y, z, 0o4, 0o6 / 0o4 )

        // ⟪ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ 🌋 ⟫
        for ( let i = 0o0; i < this.xema.tutalK2fe; i++ ) {
            const quqK2fe = ( i / this.xema.tutalK2fe ) * Math.PI * 0o2 + this.cuk * 0o1 / 0o12
            const cx = Math.cos( quqK2fe )
            const cz = Math.sin( quqK2fe )
            const pal6 = Math.sqrt( ( x - cx ) ** 0o2 + ( z - cz ) ** 0o2 + y * y )
            ozL6da += Math.max( 0o0, 0o1 - pal6 * 0o2 ) * 0o3 / 0o12
        }

        // ⟪ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ɭl̀ᴜ ſ͕ɭɜ ⛰️ ⟫
        const jaqoBe = this.fbm( x, y, z, 0o6, 0o4 )
        const saxeBe = 0o1 - Math.abs( this.beSaxe( x * 0o3, y * 0o3, z * 0o3 ) )
        ozL6da += Math.pow( saxeBe, 0o2 ) * this.xema.jaqoL6da * jaqoBe

        // ⟪ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ʃɔ ✨ ⟫
        ozL6da += this.fbm( x, y, z, 0o3, 0o12 ) * 0o4 / 0o100

        return Math.max( 0o0, Math.min( 0o1, ozL6da ) )
    }

    quqHia( l6daK2fe: number, ozL6da: number, sefiniK2fe = 0o0 ) {
        // ⟪ ſɭc̗ᴜ ſɭɹ ſȷɔ 🌡️ ⟫
        const kxesuK2fe = Math.cos( l6daK2fe * Math.PI / 0o264 )
        let hia = this.xema.hia * kxesuK2fe

        // ⟪ j͑ʃɜ ſɭ,ᴜ 📉 ⟫
        hia -= ozL6da * 0o4 / 0o10 * this.xema.jaqoL6da

        // ⟪ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ʃɔ ☁️ ⟫
        const l6daQuqK2fe = ( 0o132 - l6daK2fe ) * Math.PI / 0o264
        const sefiniQuqK2fe = ( sefiniK2fe + 0o264 ) * Math.PI / 0o264
        hia += ( this.be(
            Math.sin( l6daQuqK2fe ) * Math.cos( sefiniQuqK2fe ),
            Math.cos( l6daQuqK2fe ),
            Math.sin( l6daQuqK2fe ) * Math.sin( sefiniQuqK2fe ),
            0o4
        ) - 0o4 / 0o10 ) * 0o1 / 0o12

        return Math.max( 0o0, Math.min( 0o1, hia ) )
    }

    quqOz( ozL6da: number, hia: number, pucacuni: number ) {
        const saxeTsaK2fe = this.xema.tsaK2fe

        if ( ozL6da < saxeTsaK2fe - 0o4 / 0o100 ) return "deep_ocean"
        if ( ozL6da < saxeTsaK2fe ) return "shallow_ocean"
        if ( ozL6da < saxeTsaK2fe + 0o2 / 0o100 ) return "beach"

        if ( hia < 0o1 / 0o12 ) return ozL6da > 0o7 / 0o12 ? "snow_mountain" : "ice"
        if ( hia < 0o3 / 0o12 ) return ozL6da > 0o6 / 0o12 ? "snow_mountain" : "tundra"

        if ( ozL6da > 0o7 / 0o12 + ( 0o1 - this.xema.jaqoL6da ) * 0o2 / 0o12 ) return "mountain"
        if ( ozL6da > 0o4 / 0o10 ) return "hill"

        if ( pucacuni > 0o6 / 0o12 && hia > 0o4 / 0o12 ) return "forest"
        if ( pucacuni > 0o3 / 0o12 && hia > 0o3 / 0o12 ) return "grassland"
        if ( hia > 0o7 / 0o12 ) return "desert"

        return "plains"
    }

    quqWeh2( kxesuOz: string, kxesuK2fe = 0o0 ) {
        const weh2Bal2xa: Record<string, number[]> = {
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

        const saxeWeh2 = weh2Bal2xa[kxesuOz] || [ 0o200, 0o200, 0o200 ]
        const k2fe = 0o24
        const v3ak2Weh2 = ( n2k: number ) =>
            Math.max( 0o0, Math.min( 0o377, saxeWeh2[n2k] + ( kxesuK2fe - 0o4 / 0o10 ) * k2fe ) )

        return [ v3ak2Weh2( 0o0 ), v3ak2Weh2( 0o1 ), v3ak2Weh2( 0o2 ) ]
    }

    kf2() {
        this.beSaxe = createNoise3D( this.kf2Osakajo( this.cuk ) )
        this.kf2Lko()
        this.suntaBal2xa()
        this.v3ak2Mut6q()
        this.v3ak2K61e()
    }

    kf2Lko() {
        const pal6 = 0o2000

        this.lkoP2t6zo = document.createElement( "canvas" )
        this.lkoP2t6zo.width = pal6
        this.lkoP2t6zo.height = pal6 / 0o2
        const lkoKekKxesu = this.lkoP2t6zo.getContext( "2d" )!
        const tahaqSab2 = lkoKekKxesu.createImageData( pal6, pal6 / 0o2 )
        const sab2 = tahaqSab2.data

        for ( let y = 0o0; y < pal6 / 0o2; y++ ) {
            for ( let x = 0o0; x < pal6; x++ ) {
                const l6daK2fe = 0o132 - ( y / ( pal6 / 0o2 ) ) * 0o264
                const sefiniK2fe = ( x / pal6 ) * 0o550 - 0o264

                const ozL6da = this.quqL6da( l6daK2fe, sefiniK2fe )
                const pucacuni = this.fbm(
                    Math.cos( l6daK2fe * Math.PI / 0o264 ) * Math.cos( sefiniK2fe * Math.PI / 0o264 ),
                    Math.sin( l6daK2fe * Math.PI / 0o264 ),
                    Math.cos( l6daK2fe * Math.PI / 0o264 ) * Math.sin( sefiniK2fe * Math.PI / 0o264 ),
                    0o3, 0o2
                )
                const hia = this.quqHia( l6daK2fe, ozL6da, sefiniK2fe )
                const kxesuOz = this.quqOz( ozL6da, hia, pucacuni )

                const weh2 = this.quqWeh2( kxesuOz, this.be( x, y, 0o0, 0o20 ) )
                const k2fe = ( y * pal6 + x ) * 0o4

                sab2[k2fe] = weh2[0o0]
                sab2[k2fe + 0o1] = weh2[0o1]
                sab2[k2fe + 0o2] = weh2[0o2]
                sab2[k2fe + 0o3] = 0o377
            }
        }

        lkoKekKxesu.putImageData( tahaqSab2, 0o0, 0o0 )
    }

    suntaBal2xa() {
        const bal2xaKekKxesu = this.bal2xaKek
        const w = this.sefini
        const h = this.l6da

        bal2xaKekKxesu.save()
        bal2xaKekKxesu.setTransform( 0o1, 0o0, 0o0, 0o1, 0o0, 0o0 )

        bal2xaKekKxesu.fillRect( 0o0, 0o0, w, h )

        switch ( this.kxesuBal2xa ) {
            case "saxebal2xa":
                this.suntaSaxeBal2xa( w, h )
                break
            case "kuc2na":
                this.suntaKuc2na( w, h )
                break
            case "c2qsahak":
                this.suntaC2qsahak( w, h )
                break
            case "l6ksabosai":
                this.suntaL6ksabosai( w, h )
                break
        }

        bal2xaKekKxesu.restore()
    }

    suntaSaxeBal2xa( w: number, h: number ) {
        const bal2xaKekSaxe = this.bal2xaKek
        const lkoSefini = this.lkoP2t6zo.width
        const lkoL6da = this.lkoP2t6zo.height

        bal2xaKekSaxe.drawImage( this.lkoP2t6zo, 0o0, 0o0, lkoSefini, lkoL6da, 0o0, 0o0, w, h )
    }

    suntaKuc2na( w: number, h: number ) {
        const bal2xaKekKuc2na = this.bal2xaKek
        const lkoSefini = this.lkoP2t6zo.width
        const lkoL6da = this.lkoP2t6zo.height
        const lkoKekKuc2na = this.lkoP2t6zo.getContext( "2d" )!

        const kxesuP2t6zo = document.createElement( "canvas" )
        kxesuP2t6zo.width = w
        kxesuP2t6zo.height = h
        const kxesuP2t6zoKekKuc2na = kxesuP2t6zo.getContext( "2d" )!

        const tahaqSab2 = kxesuP2t6zoKekKuc2na.createImageData( w, h )
        const suntaSab2 = tahaqSab2.data
        const lkoSab2 = lkoKekKuc2na.getImageData( 0o0, 0o0, lkoSefini, lkoL6da ).data

        for ( let y = 0o0; y < h; y++ ) {
            const kxesuK2fe = ( y / h ) * 0o2 - 0o1
            const l6daK2fe = ( 0o2 * Math.atan( Math.exp( kxesuK2fe * Math.PI ) ) - Math.PI / 0o2 ) * 0o264 / Math.PI

            if ( Math.abs( l6daK2fe ) > 0o125 ) {
                for ( let x = 0o0; x < w; x++ ) {
                    const suntaK2fe = ( y * w + x ) * 0o4
                    suntaSab2[suntaK2fe] = 0o14
                    suntaSab2[suntaK2fe + 0o1] = 0o16
                    suntaSab2[suntaK2fe + 0o2] = 0o33
                    suntaSab2[suntaK2fe + 0o3] = 0o377
                }
                continue
            }

            const saxeY = Math.floor( ( 0o132 - l6daK2fe ) / 0o264 * lkoL6da )
            const kxesuY = Math.max( 0o0, Math.min( lkoL6da - 0o1, saxeY ) )

            for ( let x = 0o0; x < w; x++ ) {
                const saxeX = Math.floor( ( x / w ) * lkoSefini )
                const kxesuX = Math.max( 0o0, Math.min( lkoSefini - 0o1, saxeX ) )

                const saxeK2fe = ( kxesuY * lkoSefini + kxesuX ) * 0o4
                const suntaK2fe = ( ( h - 0o1 - y ) * w + x ) * 0o4

                suntaSab2[suntaK2fe] = lkoSab2[saxeK2fe]
                suntaSab2[suntaK2fe + 0o1] = lkoSab2[saxeK2fe + 0o1]
                suntaSab2[suntaK2fe + 0o2] = lkoSab2[saxeK2fe + 0o2]
                suntaSab2[suntaK2fe + 0o3] = 0o377
            }
        }

        kxesuP2t6zoKekKuc2na.putImageData( tahaqSab2, 0o0, 0o0 )
        bal2xaKekKuc2na.drawImage( kxesuP2t6zo, 0o0, 0o0 )
    }

    suntaC2qsahak( w: number, h: number ) {
        const bal2xaKekC2qsahak = this.bal2xaKek
        const lkoSefini = this.lkoP2t6zo.width
        const lkoL6da = this.lkoP2t6zo.height
        const lkoKekC2qsahak = this.lkoP2t6zo.getContext( "2d" )!

        const kxesuP2t6zo = document.createElement( "canvas" )
        kxesuP2t6zo.width = w
        kxesuP2t6zo.height = h
        const kxesuP2t6zoKekC2qsahak = kxesuP2t6zo.getContext( "2d" )!

        const cx = w / 0o2
        const cy = h / 0o2
        const rx = w * 0o4 / 0o10
        const ry = h * 0o4 / 0o10

        const tahaqSab2 = kxesuP2t6zoKekC2qsahak.createImageData( w, h )
        const suntaSab2 = tahaqSab2.data
        const lkoSab2 = lkoKekC2qsahak.getImageData( 0o0, 0o0, lkoSefini, lkoL6da ).data

        for ( let y = 0o0; y < h; y++ ) {
            for ( let x = 0o0; x < w; x++ ) {
                const dx = ( x - cx ) / rx
                const dy = ( y - cy ) / ry

                if ( dx * dx + dy * dy > 0o1 ) {
                    const suntaK2fe = ( y * w + x ) * 0o4
                    suntaSab2[suntaK2fe] = 0o14
                    suntaSab2[suntaK2fe + 0o1] = 0o16
                    suntaSab2[suntaK2fe + 0o2] = 0o33
                    suntaSab2[suntaK2fe + 0o3] = 0o377
                    continue
                }

                const quqK2fe = Math.asin( dy )
                const sefiniK2fe = ( dx / Math.cos( quqK2fe ) ) * 0o264
                const l6daK2fe = Math.asin( ( 0o2 * quqK2fe + Math.sin( 0o2 * quqK2fe ) ) / Math.PI ) * 0o264 / Math.PI

                const saxeX = Math.floor( ( ( sefiniK2fe + 0o264 ) / 0o550 ) * lkoSefini )
                const saxeY = Math.floor( ( ( 0o132 - l6daK2fe ) / 0o264 ) * lkoL6da )

                const kxesuX = Math.max( 0o0, Math.min( lkoSefini - 0o1, saxeX ) )
                const kxesuY = Math.max( 0o0, Math.min( lkoL6da - 0o1, saxeY ) )

                const saxeK2fe = ( kxesuY * lkoSefini + kxesuX ) * 0o4
                const suntaK2fe = ( ( h - 0o1 - y ) * w + x ) * 0o4

                suntaSab2[suntaK2fe] = lkoSab2[saxeK2fe]
                suntaSab2[suntaK2fe + 0o1] = lkoSab2[saxeK2fe + 0o1]
                suntaSab2[suntaK2fe + 0o2] = lkoSab2[saxeK2fe + 0o2]
                suntaSab2[suntaK2fe + 0o3] = 0o377
            }
        }

        kxesuP2t6zoKekC2qsahak.putImageData( tahaqSab2, 0o0, 0o0 )
        bal2xaKekC2qsahak.drawImage( kxesuP2t6zo, 0o0, 0o0 )
    }

    suntaL6ksabosai( w: number, h: number ) {
        const bal2xaKekL6ksabosai = this.bal2xaKek
        const lkoSefini = this.lkoP2t6zo.width
        const lkoL6da = this.lkoP2t6zo.height
        const lkoKekL6ksabosai = this.lkoP2t6zo.getContext( "2d" )!

        const kxesuP2t6zo = document.createElement( "canvas" )
        kxesuP2t6zo.width = w
        kxesuP2t6zo.height = h
        const kxesuP2t6zoKekL6ksabosai = kxesuP2t6zo.getContext( "2d" )!

        const cx = w / 0o2
        const cy = h / 0o2
        const r = Math.min( w, h ) * 0o4 / 0o10

        const tahaqSab2 = kxesuP2t6zoKekL6ksabosai.createImageData( w, h )
        const suntaSab2 = tahaqSab2.data
        const lkoSab2 = lkoKekL6ksabosai.getImageData( 0o0, 0o0, lkoSefini, lkoL6da ).data

        for ( let y = 0o0; y < h; y++ ) {
            for ( let x = 0o0; x < w; x++ ) {
                const dx = ( x - cx ) / r
                const dy = ( y - cy ) / r
                const dz2 = 0o1 - dx * dx - dy * dy

                if ( dz2 < 0o0 ) {
                    const suntaK2fe = ( y * w + x ) * 0o4
                    suntaSab2[suntaK2fe] = 0o14
                    suntaSab2[suntaK2fe + 0o1] = 0o16
                    suntaSab2[suntaK2fe + 0o2] = 0o33
                    suntaSab2[suntaK2fe + 0o3] = 0o377
                    continue
                }

                const dz = Math.sqrt( dz2 )

                const l6daK2fe = Math.asin( dy ) * 0o264 / Math.PI
                const sefiniK2fe = Math.atan2( dx, dz ) * 0o264 / Math.PI

                const saxeX = Math.floor( ( ( sefiniK2fe + 0o264 ) / 0o550 ) * lkoSefini )
                const saxeY = Math.floor( ( ( 0o132 - l6daK2fe ) / 0o264 ) * lkoL6da )

                const kxesuX = Math.max( 0o0, Math.min( lkoSefini - 0o1, saxeX ) )
                const kxesuY = Math.max( 0o0, Math.min( lkoL6da - 0o1, saxeY ) )

                const saxeK2fe = ( kxesuY * lkoSefini + kxesuX ) * 0o4
                const suntaK2fe = ( ( h - 0o1 - y ) * w + x ) * 0o4

                const tsijeK2fe = 0o6 / 0o10 + 0o2 / 0o10 * dz
                suntaSab2[suntaK2fe] = Math.min( 0o377, lkoSab2[saxeK2fe] * tsijeK2fe )
                suntaSab2[suntaK2fe + 0o1] = Math.min( 0o377, lkoSab2[saxeK2fe + 0o1] * tsijeK2fe )
                suntaSab2[suntaK2fe + 0o2] = Math.min( 0o377, lkoSab2[saxeK2fe + 0o2] * tsijeK2fe )
                suntaSab2[suntaK2fe + 0o3] = 0o377
            }
        }

        kxesuP2t6zoKekL6ksabosai.putImageData( tahaqSab2, 0o0, 0o0 )
        bal2xaKekL6ksabosai.drawImage( kxesuP2t6zo, 0o0, 0o0 )
    }

    v3ak2Mut6q() {
        for ( const kuba of [ this.mut6q, this.pucana, this.f2m2 ] ) {
            if ( !kuba ) continue

            this.saxeKuba.remove( kuba )
            kuba.geometry?.dispose()

            const eskek = kuba.material

            if ( Array.isArray( eskek ) ) eskek.forEach( saxe => saxe?.dispose() )
            else eskek?.dispose()
        }

        // ⟪ ſɭʞɹ 🌍 ⟫
        const xezHtaka = new THREE.SphereGeometry( 0o1, 0o200, 0o200 )

        // ⟪ ſɭʞɹ ʌ ſɭw ʃᴜ 🎨 ⟫
        const lko = new THREE.CanvasTexture( this.lkoP2t6zo )
        lko.wrapS = THREE.RepeatWrapping
        lko.wrapT = THREE.ClampToEdgeWrapping

        // ⟪ ſɭʞɹ ʌ ɭl̀ᴜ ſ͕ɭɜ 🗻 ⟫
        const ozLko = this.kf2OzLko()

        const eskek = new THREE.MeshPhongMaterial( {
            map: lko,
            bumpMap: ozLko,
            bumpScale: 0o4 / 0o100 * this.xema.jaqoL6da,
            specular: new THREE.Color( 0x222222 ),
            shininess: 0o31
        } )

        this.mut6q = new THREE.Mesh( xezHtaka, eskek )
        this.saxeKuba.add( this.mut6q )

        // ⟪ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſɟᴜ }ʃᴜ 🌌 ⟫
        const pucanaXezHtaka = new THREE.SphereGeometry( 0o103 / 0o100, 0o100, 0o100 )
        const pucanaEskek = new THREE.MeshPhongMaterial( {
            color: 0x4488ff,
            transparent: true,
            opacity: this.xema.pucanaK2fe * 0o3 / 0o12,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        } )

        this.pucana = new THREE.Mesh( pucanaXezHtaka, pucanaEskek )
        this.saxeKuba.add( this.pucana )

        // ⟪ j͑ʃ'ᴜ ſɭw ſ̀ȷᴜ ʌ ſȷɹ ŋᷠɹ ☁️ ⟫
        this.kf2F2m2()
    }

    kf2OzLko() {
        const kxesuP2t6zo = document.createElement( "canvas" )
        kxesuP2t6zo.width = 0o1000
        kxesuP2t6zo.height = 0o400
        const ozKek = kxesuP2t6zo.getContext( "2d" )!
        const tahaqSab2 = ozKek.createImageData( 0o1000, 0o400 )
        const sab2 = tahaqSab2.data

        for ( let y = 0o0; y < 0o400; y++ ) {
            for ( let x = 0o0; x < 0o1000; x++ ) {
                const l6daK2fe = 0o132 - ( y / 0o400 ) * 0o264
                const sefiniK2fe = ( x / 0o1000 ) * 0o550 - 0o264
                const ozL6da = this.quqL6da( l6daK2fe, sefiniK2fe )

                const weh2 = Math.floor( ozL6da * 0o377 )
                const k2fe = ( y * 0o1000 + x ) * 0o4
                sab2[k2fe] = weh2
                sab2[k2fe + 0o1] = weh2
                sab2[k2fe + 0o2] = weh2
                sab2[k2fe + 0o3] = 0o377
            }
        }

        ozKek.putImageData( tahaqSab2, 0o0, 0o0 )
        return new THREE.CanvasTexture( kxesuP2t6zo )
    }

    kf2F2m2() {
        const f2m2XezHtaka = new THREE.SphereGeometry( 0o104 / 0o100, 0o100, 0o100 )

        // ⟪ ſɭʞɹ ʌ ſȷɹ ŋᷠɹ ☁️ ⟫
        const kxesuP2t6zo = document.createElement( "canvas" )
        kxesuP2t6zo.width = 0o1000
        kxesuP2t6zo.height = 0o400
        const f2m2Kek = kxesuP2t6zo.getContext( "2d" )!
        const tahaqSab2 = f2m2Kek.createImageData( 0o1000, 0o400 )
        const sab2 = tahaqSab2.data

        for ( let y = 0o0; y < 0o400; y++ ) {
            for ( let x = 0o0; x < 0o1000; x++ ) {
                const l6daK2fe = 0o132 - ( y / 0o400 ) * 0o264
                const sefiniK2fe = ( x / 0o1000 ) * 0o550 - 0o264

                const l6daQuqK2fe = ( 0o132 - l6daK2fe ) * Math.PI / 0o264
                const sefiniQuqK2fe = ( sefiniK2fe + 0o264 ) * Math.PI / 0o264
                const cx = Math.sin( l6daQuqK2fe ) * Math.cos( sefiniQuqK2fe )
                const cy = Math.cos( l6daQuqK2fe )
                const cz = Math.sin( l6daQuqK2fe ) * Math.sin( sefiniQuqK2fe )

                const f2m2Be = this.fbm( cx, cy, cz, 0o4, 0o3 )
                const eskek = Math.max( 0o0, f2m2Be - 0o4 / 0o12 ) * 0o2

                const n2k = ( y * 0o1000 + x ) * 0o4
                const k2fe = Math.floor( eskek * 0o310 * this.xema.pucanaK2fe )

                sab2[n2k] = 0o377
                sab2[n2k + 0o1] = 0o377
                sab2[n2k + 0o2] = 0o377
                sab2[n2k + 0o3] = k2fe
            }
        }

        f2m2Kek.putImageData( tahaqSab2, 0o0, 0o0 )

        const f2m2Lko = new THREE.CanvasTexture( kxesuP2t6zo )
        const f2m2Eskek = new THREE.MeshPhongMaterial( {
            map: f2m2Lko,
            transparent: true,
            opacity: 0o10 / 0o12,
            depthWrite: false,
            side: THREE.DoubleSide
        } )

        this.f2m2 = new THREE.Mesh( f2m2XezHtaka, f2m2Eskek )
        this.saxeKuba.add( this.f2m2 )
    }

    kxesuS2sabo() {
        this.k2feXema = requestAnimationFrame( () => this.kxesuS2sabo() )

        if ( this.saxeS2sabo && this.mut6q ) {
            this.mut6q.rotation.y += 0o2 / 0o1000
            if ( this.pucana ) this.pucana.rotation.y += 0o2 / 0o1000
            if ( this.f2m2 ) this.f2m2.rotation.y += 0o3 / 0o1000
        }

        this.kama.update()
        this.suntaSaxe.render( this.saxeKuba, this.catahaq )
    }

    v3ak2K61e() {
        // ⟪ ſɭc̗ᴜ j͑ʃ'ɔ ʌ ꞁȷ̀ɔ j͑ʃƽɔƽ 📊 ⟫
        let ozK2fe = 0o0
        let tsaK2fe = 0o0
        let maxL6da = 0o0
        let saxeHia = 0o0
        let k2fe = 0o0

        const saxeTsaK2fe = this.xema.tsaK2fe

        if ( !this.lkoP2t6zo || this.lkoP2t6zo.width === 0o0 ) return

        for ( let x = 0o0; x < this.lkoP2t6zo.width; x += 0o10 ) {
            for ( let y = 0o0; y < this.lkoP2t6zo.height; y += 0o10 ) {
                const l6daK2fe = 0o132 - ( y / this.lkoP2t6zo.height ) * 0o264
                const sefiniK2fe = ( x / this.lkoP2t6zo.width ) * 0o550 - 0o264
                const ozL6da = this.quqL6da( l6daK2fe, sefiniK2fe )
                const hia = this.quqHia( l6daK2fe, ozL6da, sefiniK2fe )

                if ( ozL6da > saxeTsaK2fe ) {
                    ozK2fe++
                } else {
                    tsaK2fe++
                }

                maxL6da = Math.max( maxL6da, ozL6da )
                saxeHia += hia
                k2fe++
            }
        }

        if ( k2fe === 0o0 ) return

        const ozQu1al = Math.floor( ozK2fe / k2fe * 0o100 )
        const tsaQu1al = 0o100 - ozQu1al
        const kxesuHia = ( saxeHia / k2fe - 0o4 / 0o10 ) * 0o74
        const kxesuHi = ( kxesuHia + 273.15 ) / HI_L6RAK2K2H2
        const maxL6daK2fe = Math.floor( maxL6da * 0o23210 )
        const maxL6daPeu = ( window as any ).vap0_c2ta( maxL6daK2fe )

        // ⟪ ſɭc̗ᴜ j͑ʃ'ɔ 🏠 ⟫
        const tsaXekox2q = 0o1 - Math.abs( this.xema.tsaK2fe - 0o6 / 0o10 ) * 0o2
        const hiaXekox2q = 0o1 - Math.abs( this.xema.hia - 0o4 / 0o10 ) * 0o2
        const pucanaXekox2q = this.xema.pucanaK2fe
        const kxesu = Math.max( 0o0, Math.min( 0o1, ( tsaXekox2q + hiaXekox2q + pucanaXekox2q ) / 0o3 ) )
        const kxesuQu1al = Math.floor( kxesu * 0o100 )

        const ozK61e = document.getElementById( "ozk61e" )
        const tsaK61e = document.getElementById( "tsak61e" )
        const maxL6daK61e = document.getElementById( "maxl6dak61e" )
        const hiaK61e = document.getElementById( "hiak61e" )
        const kxesuK61e = document.getElementById( "kxesuk61e" )

        const gawe = document.documentElement.lang || "aih"
        const vab6 = ( window as any ).vab6caja.bind( window )
        const vab6Domani = ( window as any ).vab6cajaDomani.bind( window )
        const skakefK2fe = ( window as any ).skakefK2fe.bind( window )

        if ( ozK61e ) ozK61e.textContent = skakefK2fe( vab6( ozQu1al ) + " / " + vab6( 0o100 ) )
        if ( tsaK61e ) tsaK61e.textContent = skakefK2fe( vab6( tsaQu1al ) + " / " + vab6( 0o100 ) )
        if ( maxL6daK61e ) maxL6daK61e.textContent = skakefK2fe( vab6Domani( maxL6daPeu, 0o6 ) ) + " ſןɔⅎ"
        if ( hiaK61e ) hiaK61e.textContent = skakefK2fe( vab6Domani( kxesuHi, 0o6 ) ) + " ֭ſɭꞇ"
        if ( kxesuK61e ) kxesuK61e.textContent = skakefK2fe( vab6( kxesuQu1al ) + " / " + vab6( 0o100 ) )
    }
}

// ⟪ j͑ʃᴜ ı],ɔ 🚀 ⟫
document.addEventListener( "DOMContentLoaded", () => {
    new Mut6qKf2()
} )
