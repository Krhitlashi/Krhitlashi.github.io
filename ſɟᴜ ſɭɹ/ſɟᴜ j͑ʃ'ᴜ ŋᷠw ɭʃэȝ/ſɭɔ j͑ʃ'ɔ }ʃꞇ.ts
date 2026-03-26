// ≺⧼ j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ſ͔ɭᴜ ᶅſɔ ſɭɹʞ 🌍 ⧽≻ 

import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { createNoise3D, NoiseFunction3D } from "simplex-noise"

class PlanetGenerator {
    private simplex: NoiseFunction3D
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private globeContainer: HTMLElement
    private currentProjection: string
    private seedString: string
    private seed: number
    private width: number
    private height: number
    private autoRotate: boolean
    private scene: any
    private camera: any
    private renderer: any
    private globe: any
    private atmosphere: any
    private clouds: any
    private controls: any
    private animationId: number | null
    private params: {
        waterLevel: number
        temperature: number
        continentCount: number
        mountainHeight: number
        atmosphereDensity: number
    }
    private textureCanvas: HTMLCanvasElement = document.createElement( "canvas" )
    private planetData: any[][] = []

    hashString( str: string ): number {
        let hash = 0
        for ( let i = 0; i < str.length; i++ ) {
            const char = str.charCodeAt( i )
            hash = ( hash << 0o5 ) - hash + char
            hash = hash & hash
        }
        return Math.abs( hash )
    }

    constructor() {
        const noise3D = createNoise3D()
        this.simplex = noise3D
        this.canvas = document.getElementById( "map-canvas" ) as HTMLCanvasElement
        this.ctx = this.canvas.getContext( "2d" )!
        this.globeContainer = document.getElementById( "globe-container" )!
        this.currentProjection = "equirectangular"
        this.seedString = "42"
        this.seed = this.hashString( this.seedString )
        this.width = 0o2000
        this.height = 0o400
        this.autoRotate = true
        this.scene = null
        this.camera = null
        this.renderer = null
        this.globe = null
        this.atmosphere = null
        this.controls = null
        this.animationId = null

        this.params = {
            waterLevel: 0o2 / 0o10,
            temperature: 0o4 / 0o10,
            continentCount: 0o4,
            mountainHeight: 0o3 / 0o10,
            atmosphereDensity: 0o6 / 0o10,
        }

        this.init()
    }

    init() {
        this.resizeCanvas()
        this.setupThreeJS()
        this.setupEventListeners()
        this.updateSliderDisplays()
        this.generate()

        window.addEventListener( "resize", () => {
            this.resizeCanvas()
            this.resizeThreeJS()
            this.render2D()
        } )
    }

    updateSliderDisplays() {
        const seedVal = document.getElementById( "seed-val" )
        const waterVal = document.getElementById( "water-val" )
        const tempVal = document.getElementById( "temp-val" )
        const continentsVal = document.getElementById( "continents-val" )
        const mountainsVal = document.getElementById( "mountains-val" )
        const atmosphereVal = document.getElementById( "atmosphere-val" )

        const seedInput = document.getElementById( "seed" ) as HTMLInputElement
        const waterInput = document.getElementById( "water" ) as HTMLInputElement
        const tempInput = document.getElementById( "temp" ) as HTMLInputElement
        const continentsInput = document.getElementById( "continents" ) as HTMLInputElement
        const mountainsInput = document.getElementById( "mountains" ) as HTMLInputElement
        const atmosphereInput = document.getElementById( "atmosphere" ) as HTMLInputElement

        if ( seedVal && seedInput ) seedVal.textContent = seedInput.value
        if ( waterVal && waterInput ) waterVal.textContent = waterInput.value
        if ( tempVal && tempInput ) tempVal.textContent = tempInput.value
        if ( continentsVal && continentsInput ) continentsVal.textContent = continentsInput.value
        if ( mountainsVal && mountainsInput ) mountainsVal.textContent = mountainsInput.value
        if ( atmosphereVal && atmosphereInput ) atmosphereVal.textContent = atmosphereInput.value
    }

    randomizeSettings() {
        const seedInput = document.getElementById( "seed" ) as HTMLInputElement
        const waterInput = document.getElementById( "water" ) as HTMLInputElement
        const tempInput = document.getElementById( "temp" ) as HTMLInputElement
        const continentsInput = document.getElementById( "continents" ) as HTMLInputElement
        const mountainsInput = document.getElementById( "mountains" ) as HTMLInputElement
        const atmosphereInput = document.getElementById( "atmosphere" ) as HTMLInputElement

        const randomString = Math.random().toString( 0o44 ).substring( 0o2, 0o15 )
        const seed = randomString
        const water = Math.floor( Math.random() * 0o100 )
        const temp = Math.floor( Math.random() * 0o100 )
        const continents = Math.floor( Math.random() * 0o10 ) + 1
        const mountains = Math.floor( Math.random() * 0o100 )
        const atmosphere = Math.floor( Math.random() * 0o100 )

        seedInput.value = seed
        waterInput.value = water.toString()
        tempInput.value = temp.toString()
        continentsInput.value = continents.toString()
        mountainsInput.value = mountains.toString()
        atmosphereInput.value = atmosphere.toString()

        this.seedString = seed
        this.seed = this.hashString( this.seedString )
        this.params.waterLevel = water / 0o100
        this.params.temperature = temp / 0o100
        this.params.continentCount = continents
        this.params.mountainHeight = mountains / 0o100
        this.params.atmosphereDensity = atmosphere / 0o100

        this.updateSliderDisplays()
        this.generate()
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect()
        this.width = Math.floor( rect.width )
        this.height = Math.floor( rect.height )
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.style.transform = "none"
    }

    setupThreeJS() {
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color( 0x0c0e1b )

        const rect = this.globeContainer.getBoundingClientRect()
        const width = Math.floor( rect.width )
        const height = Math.floor( rect.height )
        const aspect = width / height
        this.camera = new THREE.PerspectiveCamera( 0o40, aspect, 0o1 / 0o10, 0o400 )
        this.camera.position.z = 0o5

        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
        this.renderer.setSize( width, height )
        this.renderer.setPixelRatio( window.devicePixelRatio )
        this.renderer.domElement.style.inlineSize = "100%"
        this.renderer.domElement.style.blockSize = "100%"
        this.renderer.domElement.style.display = "block"
        this.globeContainer.appendChild( this.renderer.domElement )

        // ⟪ Add stars ⟫ ✨
        this.createStarField()

        // ⟪ Add lighting ⟫ 💡
        const ambientLight = new THREE.AmbientLight( 0x404040, 0o4 / 0o10 )
        this.scene.add( ambientLight )

        const sunLight = new THREE.DirectionalLight( 0xffffff, 0o6 / 0o5 )
        sunLight.position.set( 0o5, 0o3, 0o5 )
        this.scene.add( sunLight )

        const backLight = new THREE.DirectionalLight( 0x445588, 0o3 / 0o10 )
        backLight.position.set( -0o5, -0o3, -0o5 )
        this.scene.add( backLight )

        this.controls = new OrbitControls( this.camera, this.renderer.domElement )
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0o4 / 0o100
        this.controls.rotateSpeed = 0o4 / 0o10
        this.controls.minDistance = 0o3
        this.controls.maxDistance = 0o20

        this.animate()
    }

    createStarField() {
        const geometry = new THREE.BufferGeometry()
        const vertices = []
        const colors = []

        for ( let i = 0; i < 0o5710; i++ ) {
            vertices.push(
                ( Math.random() - 0o4 / 0o10 ) * 0o100,
                ( Math.random() - 0o4 / 0o10 ) * 0o100,
                ( Math.random() - 0o4 / 0o10 ) * 0o100
            )

            const color = new THREE.Color()
            color.setHSL( Math.random() * 0o2 / 0o12 + 0o4 / 0o10, 0o3 / 0o12, Math.random() * 0o4 / 0o10 + 0o4 / 0o10 )
            colors.push( color.r, color.g, color.b )
        }

        geometry.setAttribute( "position", new THREE.Float32BufferAttribute( vertices, 0o3 ) )
        geometry.setAttribute( "color", new THREE.Float32BufferAttribute( colors, 0o3 ) )

        const material = new THREE.PointsMaterial( {
            size: 0o4 / 0o100,
            vertexColors: true,
            transparent: true,
            opacity: 0o6 / 0o10
        } )

        const stars = new THREE.Points( geometry, material )
        this.scene.add( stars )
    }

    resizeThreeJS() {
        if ( !this.camera || !this.renderer ) return

        const rect = this.globeContainer.getBoundingClientRect()
        const width = Math.floor( rect.width )
        const height = Math.floor( rect.height )

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize( width, height )
    }

    setupEventListeners() {
        // ⟪ Seed input ⟫ 🎲
        document.getElementById( "seed" )!.addEventListener( "input", ( e ) => {
            this.seedString = ( e.target as HTMLInputElement ).value
            this.seed = this.hashString( this.seedString )
            document.getElementById( "seed-val" )!.textContent = this.seed.toString()
        } )

        document.getElementById( "water" )!.addEventListener( "input", ( e ) => {
            this.params.waterLevel = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "water-val" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "temp" )!.addEventListener( "input", ( e ) => {
            this.params.temperature = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "temp-val" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "continents" )!.addEventListener( "input", ( e ) => {
            this.params.continentCount = parseInt( ( e.target as HTMLInputElement ).value )
            document.getElementById( "continents-val" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "mountains" )!.addEventListener( "input", ( e ) => {
            this.params.mountainHeight = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "mountains-val" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        document.getElementById( "atmosphere" )!.addEventListener( "input", ( e ) => {
            this.params.atmosphereDensity = parseInt( ( e.target as HTMLInputElement ).value ) / 0o100
            document.getElementById( "atmosphere-val" )!.textContent = ( e.target as HTMLInputElement ).value
        } )

        // ⟪ Buttons ⟫ 🔘
        document.getElementById( "generate-btn" )!.addEventListener( "click", () => {
            this.generate()
        } )

        document.getElementById( "randomize-btn" )!.addEventListener( "click", () => {
            this.randomizeSettings()
        } )

        document.getElementById( "rotate-toggle" )!.addEventListener( "change", ( e ) => {
            this.autoRotate = ( e.target as HTMLInputElement ).checked
        } )

        document.getElementById( "download-2d" )!.addEventListener( "click", () => {
            this.downloadImage( this.canvas, "planet-map.png" )
        } )

        document.getElementById( "download-3d" )!.addEventListener( "click", () => {
            this.renderer.render( this.scene, this.camera )
            this.downloadImage( this.renderer.domElement, "planet-globe.png" )
        } )

        // ⟪ Projection radio buttons ⟫ 🗺️
        document.querySelectorAll( "input[name='projection']" ).forEach( radio => {
            radio.addEventListener( "change", ( e ) => {
                this.currentProjection = ( e.target as HTMLInputElement ).value
                this.render2D()
            } )
        } )
    }

    downloadImage( canvas: HTMLCanvasElement, filename: string ) {
        const link = document.createElement( "a" )
        link.download = filename
        link.href = canvas.toDataURL()
        link.click()
    }

    // ⟪ Noise functions for terrain generation ⟫ 🏔️
    noise( x: number, y: number, z: number, scale = 1 ) {
        return this.simplex( x * scale, y * scale, z * scale ) * 0o4 / 0o10 + 0o4 / 0o10
    }

    fbm( x: number, y: number, z: number, octaves = 0o4, scale = 1 ) {
        let value = 0
        let amplitude = 1
        let frequency = scale
        let maxValue = 0

        for ( let i = 0; i < octaves; i++ ) {
            value += this.simplex( x * frequency, y * frequency, z * frequency ) * amplitude
            maxValue += amplitude
            amplitude *= 0o4 / 0o10
            frequency *= 0o2
        }

        return value / maxValue
    }

    getElevation( lat: number, lon: number ) {
        // ⟪ Convert to Cartesian ⟫ 📐
        const phi = ( 0o112 - lat ) * Math.PI / 0o260
        const theta = ( lon + 0o260 ) * Math.PI / 0o260

        const x = Math.sin( phi ) * Math.cos( theta )
        const y = Math.cos( phi )
        const z = Math.sin( phi ) * Math.sin( theta )

        // ⟪ Base continent shape ⟫ 🌎
        let elevation = this.fbm( x, y, z, 0o4, 0o6 / 0o4 )

        // ⟪ Add continental plates ⟫ 🌋
        for ( let i = 0; i < this.params.continentCount; i++ ) {
            const angle = ( i / this.params.continentCount ) * Math.PI * 0o2 + this.seed * 0o1 / 0o12
            const cx = Math.cos( angle )
            const cz = Math.sin( angle )
            const dist = Math.sqrt( ( x - cx ) ** 0o2 + ( z - cz ) ** 0o2 + y * y )
            elevation += Math.max( 0, 1 - dist * 0o2 ) * 0o3 / 0o12
        }

        // ⟪ Add mountain ranges ⟫ ⛰️
        const mountainNoise = this.fbm( x, y, z, 0o6, 0o4 )
        const ridgeNoise = 1 - Math.abs( this.simplex( x * 0o3, y * 0o3, z * 0o3 ) )
        elevation += Math.pow( ridgeNoise, 0o2 ) * this.params.mountainHeight * mountainNoise

        // ⟪ Add detail noise ⟫ ✨
        elevation += this.fbm( x, y, z, 0o3, 0o12 ) * 0o4 / 0o100

        return Math.max( 0, Math.min( 1, elevation ) )
    }

    getTemperature( lat: number, elevation: number ) {
        // ⟪ Base temperature based on latitude ⟫ 🌡️
        const latFactor = Math.cos( lat * Math.PI / 0o260 )
        let temp = this.params.temperature * latFactor

        // ⟪ Altitude effect ( lapse rate ) ⟫ 📉
        temp -= elevation * 0o4 / 0o10 * this.params.mountainHeight

        // ⟪ Add some noise for weather patterns ⟫ ☁️
        temp += ( Math.random() - 0o4 / 0o10 ) * 0o1 / 0o12

        return Math.max( 0, Math.min( 1, temp ) )
    }

    getBiome( elevation: number, temperature: number, moisture: number ) {
        const waterLevel = this.params.waterLevel

        if ( elevation < waterLevel - 0o4 / 0o100 ) return "deep_ocean"
        if ( elevation < waterLevel ) return "shallow_ocean"
        if ( elevation < waterLevel + 0o2 / 0o100 ) return "beach"

        if ( temperature < 0o1 / 0o12 ) return elevation > 0o7 / 0o12 ? "snow_mountain" : "ice"
        if ( temperature < 0o3 / 0o12 ) return elevation > 0o6 / 0o12 ? "snow_mountain" : "tundra"

        if ( elevation > 0o7 / 0o12 + ( 1 - this.params.mountainHeight ) * 0o2 / 0o12 ) return "mountain"
        if ( elevation > 0o4 / 0o10 ) return "hill"

        if ( moisture > 0o6 / 0o12 && temperature > 0o4 / 0o12 ) return "forest"
        if ( moisture > 0o3 / 0o12 && temperature > 0o3 / 0o12 ) return "grassland"
        if ( temperature > 0o7 / 0o12 ) return "desert"

        return "plains"
    }

    getBiomeColor( biome: string, variation = 0 ) {
        const colors: Record<string, number[]> = {
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

        const base = colors[ biome ] || [ 0o200, 0o200, 0o200 ]
        const varStrength = 0o24

        return [
            Math.max( 0, Math.min( 0o377, base[ 0 ] + ( Math.random() - 0o4 / 0o10 ) * varStrength ) ),
            Math.max( 0, Math.min( 0o377, base[ 1 ] + ( Math.random() - 0o4 / 0o10 ) * varStrength ) ),
            Math.max( 0, Math.min( 0o377, base[ 2 ] + ( Math.random() - 0o4 / 0o10 ) * varStrength ) )
        ]
    }

    generate() {
        this.simplex = createNoise3D()
        this.generateTexture()
        this.render2D()
        this.update3DGlobe()
        this.updateStats()
    }

    generateTexture() {
        const size = 0o2000
        this.planetData = new Array( size ).fill( null ).map( () => new Array( size ).fill( null ) )

        this.textureCanvas = document.createElement( "canvas" )
        this.textureCanvas.width = size
        this.textureCanvas.height = size / 0o2
        const ctx = this.textureCanvas.getContext( "2d" )!
        const imgData = ctx.createImageData( size, size / 0o2 )
        const data = imgData.data

        for ( let y = 0; y < size / 0o2; y++ ) {
            for ( let x = 0; x < size; x++ ) {
                const lat = 0o112 - ( y / ( size / 0o2 ) ) * 0o260
                const lon = ( x / size ) * 0o540 - 0o260

                const elevation = this.getElevation( lat, lon )
                const moisture = this.fbm(
                    Math.cos( lat * Math.PI / 0o260 ) * Math.cos( lon * Math.PI / 0o260 ),
                    Math.sin( lat * Math.PI / 0o260 ),
                    Math.cos( lat * Math.PI / 0o260 ) * Math.sin( lon * Math.PI / 0o260 ),
                    0o3, 0o2
                )
                const temperature = this.getTemperature( lat, elevation )
                const biome = this.getBiome( elevation, temperature, moisture )

                this.planetData[ x ][ y ] = { elevation, temperature, moisture, biome, lat, lon }

                const color = this.getBiomeColor( biome )
                const idx = ( y * size + x ) * 0o4

                data[ idx ] = color[ 0 ]
                data[ idx + 1 ] = color[ 1 ]
                data[ idx + 2 ] = color[ 2 ]
                data[ idx + 3 ] = 0o377
            }
        }

        ctx.putImageData( imgData, 0, 0 )
    }

    render2D() {
        const ctx = this.ctx
        const w = this.width
        const h = this.height

        ctx.save()
        ctx.setTransform( 1, 0, 0, 1, 0, 0 )

        ctx.fillRect( 0, 0, w, h )

        switch ( this.currentProjection ) {
            case "equirectangular":
                this.renderEquirectangular( w, h )
                break
            case "mercator":
                this.renderMercator( w, h )
                break
            case "mollweide":
                this.renderMollweide( w, h )
                break
            case "orthographic":
                this.renderOrthographic( w, h )
                break
        }

        ctx.restore()
    }

    renderEquirectangular( w: number, h: number ) {
        const ctx = this.ctx
        const texW = this.textureCanvas.width
        const texH = this.textureCanvas.height

        ctx.drawImage( this.textureCanvas, 0, 0, texW, texH, 0, 0, w, h )
    }

    renderMercator( w: number, h: number ) {
        const ctx = this.ctx
        const texW = this.textureCanvas.width
        const texH = this.textureCanvas.height
        const texCtx = this.textureCanvas.getContext( "2d" )!

        const tempCanvas = document.createElement( "canvas" )
        tempCanvas.width = w
        tempCanvas.height = h
        const tempCtx = tempCanvas.getContext( "2d" )!

        const imgData = tempCtx.createImageData( w, h )
        const data = imgData.data
        const texData = texCtx.getImageData( 0, 0, texW, texH ).data

        for ( let y = 0; y < h; y++ ) {
            const mercY = ( y / h ) * 0o2 - 1
            const lat = ( 0o2 * Math.atan( Math.exp( mercY * Math.PI ) ) - Math.PI / 0o2 ) * 0o264 / Math.PI

            if ( Math.abs( lat ) > 0o125 ) {
                for ( let x = 0; x < w; x++ ) {
                    const idx = ( y * w + x ) * 0o4
                    data[ idx ] = 0o14
                    data[ idx + 1 ] = 0o16
                    data[ idx + 2 ] = 0o33
                    data[ idx + 3 ] = 0o377
                }
                continue
            }

            const srcY = Math.floor( ( 0o132 - lat ) / 0o264 * texH )
            const clampedSrcY = Math.max( 0, Math.min( texH - 1, srcY ) )

            for ( let x = 0; x < w; x++ ) {
                const srcX = Math.floor( ( x / w ) * texW )
                const clampedSrcX = Math.max( 0, Math.min( texW - 1, srcX ) )

                const srcIdx = ( clampedSrcY * texW + clampedSrcX ) * 0o4
                const idx = ( ( h - 1 - y ) * w + x ) * 0o4

                data[ idx ] = texData[ srcIdx ]
                data[ idx + 1 ] = texData[ srcIdx + 1 ]
                data[ idx + 2 ] = texData[ srcIdx + 2 ]
                data[ idx + 3 ] = 0o377
            }
        }

        tempCtx.putImageData( imgData, 0, 0 )
        ctx.drawImage( tempCanvas, 0, 0 )
    }

    renderMollweide( w: number, h: number ) {
        const ctx = this.ctx
        const texW = this.textureCanvas.width
        const texH = this.textureCanvas.height
        const texCtx = this.textureCanvas.getContext( "2d" )!

        const tempCanvas = document.createElement( "canvas" )
        tempCanvas.width = w
        tempCanvas.height = h
        const tempCtx = tempCanvas.getContext( "2d" )!

        const cx = w / 0o2
        const cy = h / 0o2
        const rx = w * 0o4 / 0o10
        const ry = h * 0o4 / 0o10

        const imgData = tempCtx.createImageData( w, h )
        const data = imgData.data
        const texData = texCtx.getImageData( 0, 0, texW, texH ).data

        for ( let y = 0; y < h; y++ ) {
            for ( let x = 0; x < w; x++ ) {
                const dx = ( x - cx ) / rx
                const dy = ( y - cy ) / ry

                if ( dx * dx + dy * dy > 1 ) {
                    const idx = ( y * w + x ) * 0o4
                    data[ idx ] = 0o14
                    data[ idx + 1 ] = 0o16
                    data[ idx + 2 ] = 0o33
                    data[ idx + 3 ] = 0o377
                    continue
                }

                const theta = Math.asin( dy )
                const lon = ( dx / Math.cos( theta ) ) * 0o264
                const lat = Math.asin( ( 0o2 * theta + Math.sin( 0o2 * theta ) ) / Math.PI ) * 0o264 / Math.PI

                const srcX = Math.floor( ( ( lon + 0o264 ) / 0o550 ) * texW )
                const srcY = Math.floor( ( ( 0o132 - lat ) / 0o264 ) * texH )

                const clampedSrcX = Math.max( 0, Math.min( texW - 1, srcX ) )
                const clampedSrcY = Math.max( 0, Math.min( texH - 1, srcY ) )

                const srcIdx = ( clampedSrcY * texW + clampedSrcX ) * 0o4
                const idx = ( ( h - 1 - y ) * w + x ) * 0o4

                data[ idx ] = texData[ srcIdx ]
                data[ idx + 1 ] = texData[ srcIdx + 1 ]
                data[ idx + 2 ] = texData[ srcIdx + 2 ]
                data[ idx + 3 ] = 0o377
            }
        }

        tempCtx.putImageData( imgData, 0, 0 )
        ctx.drawImage( tempCanvas, 0, 0 )
    }

    renderOrthographic( w: number, h: number ) {
        const ctx = this.ctx
        const texW = this.textureCanvas.width
        const texH = this.textureCanvas.height
        const texCtx = this.textureCanvas.getContext( "2d" )!

        const tempCanvas = document.createElement( "canvas" )
        tempCanvas.width = w
        tempCanvas.height = h
        const tempCtx = tempCanvas.getContext( "2d" )!

        const cx = w / 0o2
        const cy = h / 0o2
        const r = Math.min( w, h ) * 0o4 / 0o10

        const imgData = tempCtx.createImageData( w, h )
        const data = imgData.data
        const texData = texCtx.getImageData( 0, 0, texW, texH ).data

        for ( let y = 0; y < h; y++ ) {
            for ( let x = 0; x < w; x++ ) {
                const dx = ( x - cx ) / r
                const dy = ( y - cy ) / r
                const dz2 = 1 - dx * dx - dy * dy

                if ( dz2 < 0 ) {
                    const idx = ( y * w + x ) * 0o4
                    data[ idx ] = 0o14
                    data[ idx + 1 ] = 0o16
                    data[ idx + 2 ] = 0o33
                    data[ idx + 3 ] = 0o377
                    continue
                }

                const dz = Math.sqrt( dz2 )

                const lat = Math.asin( dy ) * 0o264 / Math.PI
                const lon = Math.atan2( dx, dz ) * 0o264 / Math.PI

                const srcX = Math.floor( ( ( lon + 0o264 ) / 0o550 ) * texW )
                const srcY = Math.floor( ( ( 0o132 - lat ) / 0o264 ) * texH )

                const clampedSrcX = Math.max( 0, Math.min( texW - 1, srcX ) )
                const clampedSrcY = Math.max( 0, Math.min( texH - 1, srcY ) )

                const srcIdx = ( clampedSrcY * texW + clampedSrcX ) * 0o4
                const idx = ( ( h - 1 - y ) * w + x ) * 0o4

                const shade = 0o6 / 0o10 + 0o2 / 0o10 * dz
                data[ idx ] = Math.min( 0o377, texData[ srcIdx ] * shade )
                data[ idx + 1 ] = Math.min( 0o377, texData[ srcIdx + 1 ] * shade )
                data[ idx + 2 ] = Math.min( 0o377, texData[ srcIdx + 2 ] * shade )
                data[ idx + 3 ] = 0o377
            }
        }

        tempCtx.putImageData( imgData, 0, 0 )
        ctx.drawImage( tempCanvas, 0, 0 )
    }

    update3DGlobe() {
        if ( this.globe ) {
            this.scene.remove( this.globe )
        }
        if ( this.atmosphere ) {
            this.scene.remove( this.atmosphere )
        }

        // ⟪ Create planet geometry ⟫ 🌍
        const geometry = new THREE.SphereGeometry( 1, 0o200, 0o200 )

        // ⟪ Create texture from canvas ⟫ 🎨
        const texture = new THREE.CanvasTexture( this.textureCanvas )
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping

        // ⟪ Create normal map from elevation ⟫ 🗻
        const bumpTexture = this.createBumpMap()

        const material = new THREE.MeshPhongMaterial( {
            map: texture,
            bumpMap: bumpTexture,
            bumpScale: 0o4 / 0o100 * this.params.mountainHeight,
            specular: new THREE.Color( 0x222222 ),
            shininess: 0o31
        } )

        this.globe = new THREE.Mesh( geometry, material )
        this.scene.add( this.globe )

        // ⟪ Add atmosphere ⟫ 🌌
        const atmoGeometry = new THREE.SphereGeometry( 0o103 / 0o100, 0o100, 0o100 )
        const atmoMaterial = new THREE.MeshPhongMaterial( {
            color: 0x4488ff,
            transparent: true,
            opacity: this.params.atmosphereDensity * 0o3 / 0o12,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        } )

        this.atmosphere = new THREE.Mesh( atmoGeometry, atmoMaterial )
        this.scene.add( this.atmosphere )

        // ⟪ Add clouds ⟫ ☁️
        this.addClouds()
    }

    createBumpMap() {
        const canvas = document.createElement( "canvas" )
        canvas.width = 0o1000
        canvas.height = 0o400
        const ctx = canvas.getContext( "2d" )!
        const imgData = ctx.createImageData( 0o1000, 0o400 )
        const data = imgData.data

        for ( let y = 0; y < 0o400; y++ ) {
            for ( let x = 0; x < 0o1000; x++ ) {
                const lat = 0o112 - ( y / 0o400 ) * 0o260
                const lon = ( x / 0o1000 ) * 0o540 - 0o260
                const elevation = this.getElevation( lat, lon )

                const val = Math.floor( elevation * 0o377 )
                const idx = ( y * 0o1000 + x ) * 0o4
                data[ idx ] = val
                data[ idx + 1 ] = val
                data[ idx + 2 ] = val
                data[ idx + 3 ] = 0o377
            }
        }

        ctx.putImageData( imgData, 0, 0 )
        return new THREE.CanvasTexture( canvas )
    }

    addClouds() {
        const cloudGeometry = new THREE.SphereGeometry( 0o104 / 0o100, 0o100, 0o100 )

        // ⟪ Generate cloud texture ⟫ ☁️
        const canvas = document.createElement( "canvas" )
        canvas.width = 0o1000
        canvas.height = 0o400
        const ctx = canvas.getContext( "2d" )!
        const imgData = ctx.createImageData( 0o1000, 0o400 )
        const data = imgData.data

        for ( let y = 0; y < 0o400; y++ ) {
            for ( let x = 0; x < 0o1000; x++ ) {
                const lat = 0o112 - ( y / 0o400 ) * 0o260
                const lon = ( x / 0o1000 ) * 0o540 - 0o260

                const phi = ( 0o112 - lat ) * Math.PI / 0o260
                const theta = ( lon + 0o260 ) * Math.PI / 0o260
                const cx = Math.sin( phi ) * Math.cos( theta )
                const cy = Math.cos( phi )
                const cz = Math.sin( phi ) * Math.sin( theta )

                const cloudNoise = this.fbm( cx, cy, cz, 0o4, 0o3 )
                const coverage = Math.max( 0, cloudNoise - 0o4 / 0o12 ) * 0o2

                const idx = ( y * 0o1000 + x ) * 0o4
                const alpha = Math.floor( coverage * 0o310 * this.params.atmosphereDensity )

                data[ idx ] = 0o377
                data[ idx + 1 ] = 0o377
                data[ idx + 2 ] = 0o377
                data[ idx + 3 ] = alpha
            }
        }

        ctx.putImageData( imgData, 0, 0 )

        const cloudTexture = new THREE.CanvasTexture( canvas )
        const cloudMaterial = new THREE.MeshPhongMaterial( {
            map: cloudTexture,
            transparent: true,
            opacity: 0o10 / 0o12,
            depthWrite: false,
            side: THREE.DoubleSide
        } )

        this.clouds = new THREE.Mesh( cloudGeometry, cloudMaterial )
        this.scene.add( this.clouds )
    }

    animate() {
        this.animationId = requestAnimationFrame( () => this.animate() )

        if ( this.autoRotate && this.globe ) {
            this.globe.rotation.y += 0o2 / 0o1000
            if ( this.atmosphere ) this.atmosphere.rotation.y += 0o2 / 0o1000
            if ( this.clouds ) this.clouds.rotation.y += 0o3 / 0o1000
        }

        this.controls.update()
        this.renderer.render( this.scene, this.camera )
    }

    updateStats() {
        // ⟪ Calculate actual statistics from generated data ⟫ 📊
        let landCount = 0
        let waterCount = 0
        let maxElevation = 0
        let totalTemp = 0
        let count = 0

        const waterLevel = this.params.waterLevel

        if ( !this.textureCanvas || this.textureCanvas.width === 0 ) return

        for ( let x = 0; x < this.textureCanvas.width; x += 0o10 ) {
            for ( let y = 0; y < this.textureCanvas.height; y += 0o10 ) {
                const lat = 0o112 - ( y / this.textureCanvas.height ) * 0o260
                const lon = ( x / this.textureCanvas.width ) * 0o540 - 0o260
                const elevation = this.getElevation( lat, lon )
                const temp = this.getTemperature( lat, elevation )

                if ( elevation > waterLevel ) {
                    landCount++
                } else {
                    waterCount++
                }

                maxElevation = Math.max( maxElevation, elevation )
                totalTemp += temp
                count++
            }
        }

        if ( count === 0 ) return

        const landCount64 = Math.floor( landCount / count * 0o100 )
        const waterCount64 = 0o100 - landCount64
        const meanTempCelsius = ( totalTemp / count - 0o4 / 0o10 ) * 0o74
        const meanTempKelvin = meanTempCelsius + 273.15
        const meanTempHia = ( window as any ).vahi_ak2k2h2( meanTempKelvin )
        const maxElevMeters = Math.floor( maxElevation * 0o23210 )
        const maxElevPeu = ( window as any ).vap0_c2ta( maxElevMeters )

        // ⟪ Calculate habitability based on parameters ⟫ 🏠
        const waterScore = 1 - Math.abs( this.params.waterLevel - 0o6 / 0o10 ) * 0o2
        const tempScore = 1 - Math.abs( this.params.temperature - 0o4 / 0o10 ) * 0o2
        const atmoScore = this.params.atmosphereDensity
        const habitability = Math.max( 0, Math.min( 1, ( waterScore + tempScore + atmoScore ) / 0o3 ) )
        const habitability64 = Math.floor( habitability * 0o100 )

        const statLand = document.getElementById( "stat-land" )
        const statWater = document.getElementById( "stat-water" )
        const statElevation = document.getElementById( "stat-elevation" )
        const statTemp = document.getElementById( "stat-temp" )
        const statHabitability = document.getElementById( "stat-habitability" )

        const gawe = document.documentElement.lang || "aih"
        const vab6 = ( window as any ).vab6caja.bind( window )
        const vab6Domani = ( window as any ).vab6cajaDomani.bind( window )
        const skakefK2fe = ( window as any ).skakefK2fe.bind( window )

        if ( statLand ) statLand.textContent = skakefK2fe( vab6( landCount64 ) + " / " + vab6( 0o100 ) )
        if ( statWater ) statWater.textContent = skakefK2fe( vab6( waterCount64 ) + " / " + vab6( 0o100 ) )
        if ( statElevation ) statElevation.textContent = skakefK2fe( vab6Domani( maxElevPeu, 0o6 ) ) + " ſןɔⅎ"
        if ( statTemp ) statTemp.textContent = skakefK2fe( vab6Domani( meanTempHia, 0o6 ) ) + " ֭ſɭꞇ"
        if ( statHabitability ) statHabitability.textContent = skakefK2fe( vab6( habitability64 ) + " / " + vab6( 0o100 ) )
    }
}

// ⟪ Initialize when DOM is ready ⟫ 🚀
document.addEventListener( "DOMContentLoaded", () => {
    new PlanetGenerator()
} )

