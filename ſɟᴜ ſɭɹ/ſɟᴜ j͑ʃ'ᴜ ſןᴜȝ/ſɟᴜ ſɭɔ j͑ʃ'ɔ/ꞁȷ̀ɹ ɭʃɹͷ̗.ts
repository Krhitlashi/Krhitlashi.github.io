/**
 * ≺⧼ ꞁȷ̀ɹ ɭʃɹͷ̗ - Background Management 🌄 ⧽≻
 *
 * Manages background scenery modes for the 3D block builder.
 *     ring ( default ) - dimmed template copies in concentric rings.
 *     islands - organic floating landmasses with structures at various heights.
 */

import * as THREE from "three";
import { type ShapeId } from "./}ʃᴜ ſɭɜ ı],ᴜ.js";
import {
    parseJSONBlocks,
    gridToWorld,
    type ParsedSchematicBlock
} from "./ſ̀ȷᴜȝ.js";

/**
 * Background mode identifier.
 */
export type BackgroundMode = "ring" | "islands";

/**
 * Manages background scenery: loads a template, builds either ring or
 * floating-island layouts, and switches between them with sky/fog changes.
 */
export class BackgroundManager {
    private scene: THREE.Scene;
    private group: THREE.Group;
    private template: ParsedSchematicBlock[] = [];
    private gridSize: number;
    private createBlock: ( color: string, shape: ShapeId, rotation: number ) => THREE.Mesh;
    private currentMode: BackgroundMode;

    /**
     *     scene ( THREE.Scene ) - the active Three.js scene.
     *     gridSize ( number ) - current grid size ( determines ring/island radii ).
     *     createBlock ( function ) - factory for a background block mesh.
     */
    constructor(
        scene: THREE.Scene,
        gridSize: number,
        createBlock: ( color: string, shape: ShapeId, rotation: number ) => THREE.Mesh
    ) {
        this.scene = scene;
        this.gridSize = gridSize;
        this.createBlock = createBlock;
        this.group = new THREE.Group();
        this.group.name = "backgroundBuildings";
        this.currentMode = "ring";

        // Apply default daytime sky immediately so the scene never shows
        // a dark background while the template loads asynchronously.
        const canvas = document.createElement( "canvas" );
        canvas.width = 0o20;
        canvas.height = 0o400;
        const ctx = canvas.getContext( "2d" )!;
        const gradient = ctx.createLinearGradient( 0, 0, 0, 0o400 );
        gradient.addColorStop( 0, "#58a8e8" );
        gradient.addColorStop( ( 4 / 8 ), "#98c8e8" );
        gradient.addColorStop( ( 6 / 8 ), "#d8f0f8" );
        gradient.addColorStop( 1, "#e8f8f8" );
        ctx.fillStyle = gradient;
        ctx.fillRect( 0, 0, 0o20, 0o400 );
        const texture = new THREE.CanvasTexture( canvas );
        texture.colorSpace = THREE.SRGBColorSpace;
        this.scene.background = texture;
    }

    /**
     * Update the grid size ( called when the user changes the slider ).
     *     size ( number ) - new grid size.
     */
    setGridSize( size: number ): void {
        this.gridSize = size;
    }

    /**
     * Fetch and parse the shared building template JSON.
     * Returns true on success, false on failure.
     */
    async loadTemplate(): Promise<boolean> {
        try {
            const url = new URL( "./ſןᴜȝ/j͑ʃᴜ ɭʃᴜͷ̗.json", import.meta.url );
            const res = await fetch( url );
            if ( !res.ok ) throw new Error( `HTTP ${ res.status }` );
            this.template = parseJSONBlocks( await res.text() );
            return this.template.length > 0;
        } catch ( err ) {
            console.warn( "ſ͕ȷɜ ſɭʞɹ j͑ʃɔ j͑ʃ'ᴜ ɭʃᴜͷ̗ ꞁȷ̀ɔ ƽᶗ‹ ᶅſɔ j͐ʃэ ⟅", err );
            return false;
        }
    }

    /**
     * Unload the current background group from the scene.
     */
    private removeCurrent(): void {
        if ( this.group.parent ) {
            this.scene.remove( this.group );
        }
        this.group = new THREE.Group();
        this.group.name = "backgroundBuildings";
    }

    /**
     * Build concentric rings of template copies at ground level.
     *     template ( ParsedSchematicBlock[] ) - building block list.
     */
    buildRing( template: ParsedSchematicBlock[] ): void {
        this.removeCurrent();

        const minX = Math.min( ...template.map( ( b ) => b.x ) );
        const maxX = Math.max( ...template.map( ( b ) => b.x ) );
        const minY = Math.min( ...template.map( ( b ) => b.y ) );
        const minZ = Math.min( ...template.map( ( b ) => b.z ) );
        const maxZ = Math.max( ...template.map( ( b ) => b.z ) );
        const cx = ( minX + maxX ) / 2;
        const cz = ( minZ + maxZ ) / 2;

        const scale = 1.6;
        const rings = [
            { count: 12, radius: this.gridSize * ( 5 / 4 ) },
            { count: 16, radius: this.gridSize * 2 },
            { count: 20, radius: this.gridSize * ( 11 / 4 ) }
        ];
        let ringIndex = 0;
        let globalIndex = 0;

        for ( const ring of rings ) {
            const spacing = ( Math.PI * 2 ) / ring.count;
            for ( let i = 0; i < ring.count; i++ ) {
                const angle = i * spacing + ringIndex * ( spacing / 2 );
                const offsetX = Math.cos( angle ) * ring.radius;
                const offsetZ = Math.sin( angle ) * ring.radius;
                const yaw = globalIndex * ( Math.PI / 2 );

                const building = new THREE.Group();
                for ( const b of template ) {
                    const block = this.createBlock(
                        b.color || "#888888",
                        ( b.shape as ShapeId ) ?? "cube",
                        b.rotation ?? 0
                    );
                    block.position.set(
                        ( gridToWorld( b.x ) - gridToWorld( cx ) ) * scale,
                        ( gridToWorld( b.y ) - gridToWorld( minY ) ) * scale,
                        ( gridToWorld( b.z ) - gridToWorld( cz ) ) * scale
                    );
                    block.scale.setScalar( scale );
                    building.add( block );
                }
                building.rotation.y = yaw;
                building.position.set( offsetX, 0, offsetZ );
                this.group.add( building );
                globalIndex++;
            }
            ringIndex++;
        }

        this.scene.add( this.group );
    }

    /**
     * Build floating islands with organic terrain ( rocky underside, grassy top )
     * spread across a wide vertical range — some above the baseplate, some below.
     *     template ( ParsedSchematicBlock[] ) - building block list.
     */
    buildIslands( template: ParsedSchematicBlock[] ): void {
        this.removeCurrent();

        const minX = Math.min( ...template.map( ( b ) => b.x ) );
        const maxX = Math.max( ...template.map( ( b ) => b.x ) );
        const minY = Math.min( ...template.map( ( b ) => b.y ) );
        const minZ = Math.min( ...template.map( ( b ) => b.z ) );
        const maxZ = Math.max( ...template.map( ( b ) => b.z ) );
        const cx = ( minX + maxX ) / 2;
        const cz = ( minZ + maxZ ) / 2;

        const scale = ( 11 / 8 );
        const hg = this.gridSize / 2;

        // Spread islands across a wide range of distances and heights.
        // All minimum radii are well outside the editable grid ( hg ) so
        // structures never overlap the editor baseplate.
        const islandConfigs: Array<{
            count: number;
            radiusMin: number;
            radiusMax: number;
            heightMin: number;
            heightMax: number;
        }> = [
            // Lower ring — some below baseplate, some just above
            { count: 6,  radiusMin: hg * ( 5 / 2 ),  radiusMax: hg * ( 7 / 2 ),  heightMin: -hg * ( 5 / 8 ),  heightMax:  hg * ( 1 / 4 ) },
            // Middle ring — widely spread, straddling the baseplate plane
            { count: 8,  radiusMin: hg * 4,          radiusMax: hg * 6,          heightMin: -hg * ( 3 / 8 ),  heightMax:  hg * 1 },
            // Outer ring — far out, high up, small silhouettes
            { count: 14, radiusMin: hg * 7,          radiusMax: hg * 10,         heightMin: -hg * ( 1 / 8 ),  heightMax:  hg * 2 },
            // Distant fringe — very far, creating depth
            { count: 8,  radiusMin: hg * 11,         radiusMax: hg * 15,         heightMin: -hg * ( 5 / 8 ),  heightMax:  hg * 3 }
        ];

        let globalIndex = 0;

        for ( const cfg of islandConfigs ) {
            const spacing = ( Math.PI * 2 ) / cfg.count;
            for ( let i = 0; i < cfg.count; i++ ) {
                const angle = i * spacing + ( globalIndex * ( 1 / 4 ) );
                const radius = cfg.radiusMin + Math.random() * ( cfg.radiusMax - cfg.radiusMin );
                const offsetX = Math.cos( angle ) * radius;
                const offsetZ = Math.sin( angle ) * radius;
                const height = cfg.heightMin + Math.random() * ( cfg.heightMax - cfg.heightMin );
                const yaw = globalIndex * ( Math.PI / 3 );
                const tiltX = ( Math.random() - ( 1 / 2 ) ) * ( 1 / 8 );
                const tiltZ = ( Math.random() - ( 1 / 2 ) ) * ( 1 / 8 );

                // ── Organic island body ──────────────────────────────────
                // Size the rock proportionally to the template so the island
                // is always large enough to seat the structure comfortably.
                // First compute the cap radius ( the usable baseplate ), then
                // derive the rock radius from the cap-to-rock ratio.
                const templateW = ( maxX - minX + 1 ) * scale;
                const templateD = ( maxZ - minZ + 1 ) * scale;
                const templateDiag = Math.sqrt( templateW * templateW + templateD * templateD );
                const minCap = Math.ceil( templateDiag * ( 1 / 2 ) * ( 9 / 8 ) );
                const minRock = Math.ceil( minCap * ( 8 / 7 ) );
                const rockRadius = minRock + Math.floor( Math.random() * minRock * ( 1 / 2 ) );

                const rockGeom = new THREE.DodecahedronGeometry( rockRadius, 1 );
                const vStretch = height > 0
                    ? ( 5 / 8 ) + Math.random() * ( 5 / 8 )
                    : 1 + Math.random() * ( 5 / 8 );
                const positions = rockGeom.attributes.position.array as Float32Array;
                // Flatten the top: squash upper vertices toward a flat cap
                // height so the island forms a usable baseplate, while keeping
                // the underside rough and tapered for the floating-terrain look.
                const topY = rockRadius * vStretch * ( 15 / 16 );
                for ( let j = 0; j < positions.length; j += 3 ) {
                    const py = positions[ j + 1 ];
                    if ( py >= 0 ) {
                        // Upper half — collapse toward the flat-cap height
                        const t = py / rockRadius;
                        positions[ j + 1 ] = topY * ( ( 63 / 64 ) + t * ( 1 / 64 ) );
                        // Gentle outward taper for upper rim
                        const rimTaper = 1 - t * ( 1 / 8 );
                        positions[ j ] *= rimTaper;
                        positions[ j + 2 ] *= rimTaper;
                    } else {
                        // Lower half — elongate for the hanging-terrain silhouette
                        const stretch = vStretch * ( 1 + Math.abs( py ) / rockRadius * ( 5 / 8 ) );
                        positions[ j + 1 ] = py * stretch;
                        const taper = 1 - ( py / rockRadius ) * ( 1 / 8 );
                        positions[ j ] *= taper;
                        positions[ j + 2 ] *= taper;
                    }
                }
                rockGeom.computeVertexNormals();

                const baseBrightness = ( 3 / 8 ) + Math.random() * ( 1 / 8 );
                const rockColor = new THREE.Color().setHSL(
                    ( 9 / 0o200 ),
                    ( 1 / 8 ),
                    baseBrightness
                );
                const rockMat = new THREE.MeshLambertMaterial( { color: rockColor, flatShading: false } );
                const rockMesh = new THREE.Mesh( rockGeom, rockMat );
                rockMesh.position.set( offsetX, height, offsetZ );
                rockMesh.rotation.x = tiltX;
                rockMesh.rotation.z = tiltZ;
                this.group.add( rockMesh );

                // ── Grass cap on top ─────────────────────────────────────
                const capRadius = rockRadius * ( 7 / 8 );
                const capShape = new THREE.Shape();
                const segs = 0o20;
                for ( let s = 0; s <= segs; s++ ) {
                    const a = ( s / segs ) * Math.PI * 2;
                    const r = capRadius * ( 15 / 16 + Math.random() * ( 1 / 16 ) );
                    if ( s === 0 ) capShape.moveTo( Math.cos( a ) * r, Math.sin( a ) * r );
                    else capShape.lineTo( Math.cos( a ) * r, Math.sin( a ) * r );
                }
                const capGeom = new THREE.ShapeGeometry( capShape );
                const grassHue = ( 9 / 32 ) + Math.random() * ( 1 / 16 );
                const grassSat = ( 3 / 8 ) + Math.random() * ( 1 / 8 );
                const grassLight = ( 1 / 4 ) + Math.random() * ( 1 / 8 );
                const grassColor = new THREE.Color().setHSL( grassHue, grassSat, grassLight );
                const capMat = new THREE.MeshLambertMaterial( { color: grassColor, side: THREE.DoubleSide } );
                const capMesh = new THREE.Mesh( capGeom, capMat );
                const capY = topY;
                capMesh.rotation.x = -Math.PI / 2;
                capMesh.position.set( offsetX, height + capY, offsetZ );
                this.group.add( capMesh );

                // ── Small decorative spikes on the underside ─────────────
                const spikeCount = 2 + Math.floor( Math.random() * 4 );
                for ( let s = 0; s < spikeCount; s++ ) {
                    const spikeGeom = new THREE.ConeGeometry(
                        ( 3 / 8 ) + Math.random() * ( 5 / 8 ),
                        ( 5 / 8 ) + Math.random() * ( 11 / 8 ),
                        0o6
                    );
                    const spikeMat = new THREE.MeshLambertMaterial( {
                        color: rockColor.clone().multiplyScalar( 7 / 8 + Math.random() * ( 1 / 8 ) )
                    } );
                    const spike = new THREE.Mesh( spikeGeom, spikeMat );
                    const sa = Math.random() * Math.PI * 2;
                    const sr = rockRadius * ( 3 / 8 ) + Math.random() * rockRadius * ( 3 / 8 );
                    const sx = Math.cos( sa ) * sr;
                    const sz = Math.sin( sa ) * sr;
                    const sy = -rockRadius * vStretch * ( 1 / 8 + Math.random() * ( 3 / 8 ) );
                    spike.position.set( offsetX + sx, height + sy, offsetZ + sz );
                    spike.rotation.x = ( Math.random() - ( 1 / 2 ) ) * ( 3 / 8 );
                    spike.rotation.z = ( Math.random() - ( 1 / 2 ) ) * ( 3 / 8 );
                    this.group.add( spike );
                }

                // ── Building on top ( centered on the island ) ───────────
                // The island is sized to fit the template, so the building
                // sits comfortably in the middle of the grass cap.
                const building = new THREE.Group();
                for ( const b of template ) {
                    const block = this.createBlock(
                        b.color || "#888888",
                        ( b.shape as ShapeId ) ?? "cube",
                        b.rotation ?? 0
                    );
                    block.position.set(
                        ( gridToWorld( b.x ) - gridToWorld( cx ) ) * scale,
                        ( gridToWorld( b.y ) - gridToWorld( minY ) ) * scale + capY,
                        ( gridToWorld( b.z ) - gridToWorld( cz ) ) * scale
                    );
                    block.scale.setScalar( scale );
                    building.add( block );
                }
                building.rotation.y = yaw;
                building.position.set( offsetX, height, offsetZ );
                this.group.add( building );

                globalIndex++;
            }
        }

        this.scene.add( this.group );
    }

    /**
     * Apply the sky and fog colours for a given background mode.
     * In island mode the scenery ground is hidden so structures below the
     * baseplate line are fully visible.  In ring mode it is restored.
     *     mode ( BackgroundMode ) - target mode.
     *     sceneryMesh ( THREE.Mesh ) - the ground-circle mesh to show/hide.
     *     fog ( THREE.Fog ) - the scene fog.
     */
    applyAtmosphere( mode: BackgroundMode, sceneryMesh: THREE.Mesh, fog: THREE.Fog ): void {
        if ( mode === "islands" ) {
            // Twilight / sunset sky
            const canvas = document.createElement( "canvas" );
            canvas.width = 0o20;
            canvas.height = 0o400;
            const ctx = canvas.getContext( "2d" )!;
            const gradient = ctx.createLinearGradient( 0, 0, 0, 0o400 );
            gradient.addColorStop( 0, "#281848" );
            gradient.addColorStop( ( 3 / 8 ), "#a85068" );
            gradient.addColorStop( ( 6 / 8 ), "#d8a078" );
            gradient.addColorStop( 1, "#e8c8a8" );
            ctx.fillStyle = gradient;
            ctx.fillRect( 0, 0, 0o20, 0o400 );
            const texture = new THREE.CanvasTexture( canvas );
            texture.colorSpace = THREE.SRGBColorSpace;
            this.scene.background = texture;

            fog.color.setHex( 0xa85068 );

            // Hide the scenery ground so islands below the baseplate are
            // fully visible through the ground plane.
            sceneryMesh.visible = false;
        } else {
            // Default daytime sky
            const canvas = document.createElement( "canvas" );
            canvas.width = 0o20;
            canvas.height = 0o400;
            const ctx = canvas.getContext( "2d" )!;
            const gradient = ctx.createLinearGradient( 0, 0, 0, 0o400 );
            gradient.addColorStop( 0, "#58a8e8" );
            gradient.addColorStop( ( 4 / 8 ), "#98c8e8" );
            gradient.addColorStop( ( 6 / 8 ), "#d8f0f8" );
            gradient.addColorStop( 1, "#e8f8f8" );
            ctx.fillStyle = gradient;
            ctx.fillRect( 0, 0, 0o20, 0o400 );
            const texture = new THREE.CanvasTexture( canvas );
            texture.colorSpace = THREE.SRGBColorSpace;
            this.scene.background = texture;

            fog.color.setHex( 0xb0d8e0 );

            // Restore the green scenery ground
            sceneryMesh.visible = true;
            ( sceneryMesh.material as THREE.MeshLambertMaterial ).color.setHex( 0x688858 );
        }
    }

    /**
     * Switch to a background mode, rebuilding the structures and updating the
     * atmosphere.
     *     mode ( BackgroundMode ) - target mode.
     *     sceneryMesh ( THREE.Mesh ) - ground circle.
     *     fog ( THREE.Fog ) - scene fog.
     */
    setMode( mode: BackgroundMode, sceneryMesh: THREE.Mesh, fog: THREE.Fog ): void {
        this.currentMode = mode;
        this.applyAtmosphere( mode, sceneryMesh, fog );
        if ( this.template.length > 0 ) {
            if ( mode === "islands" ) {
                this.buildIslands( this.template );
            } else {
                this.buildRing( this.template );
            }
        }
    }

    /**
     * Rebuild the current background ( called after grid-size change ).
     *     sceneryMesh ( THREE.Mesh ) - ground circle.
     *     fog ( THREE.Fog ) - scene fog.
     */
    rebuildCurrent( sceneryMesh: THREE.Mesh, fog: THREE.Fog ): void {
        if ( this.template.length === 0 ) return;
        if ( this.currentMode === "islands" ) {
            this.buildIslands( this.template );
        } else {
            this.buildRing( this.template );
        }
        this.applyAtmosphere( this.currentMode, sceneryMesh, fog );
    }
}
