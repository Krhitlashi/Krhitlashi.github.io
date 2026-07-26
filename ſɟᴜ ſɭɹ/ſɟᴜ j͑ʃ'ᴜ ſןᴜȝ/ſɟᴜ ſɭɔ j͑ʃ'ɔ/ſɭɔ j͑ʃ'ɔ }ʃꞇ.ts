/**
 * ≺⧼ ſɟᴜ j͑ʃ'ᴜ ſןᴜȝ - 3D Build 🧱 ⧽≻
 *
 * A 3D workspace for building structures with blocks on a grid.
 */

import * as THREE from "three";
import { OrbitControls, TransformControls } from "three/addons";
import { initSharedToolbar } from "../../}ʃɹ ɭʃᴜ j͑ʃɔ }ʃw j͑ʃᴜ ſɭᴜ ŋᷠᴜ.js";
import { MINECRAFT_BLOCKS, type MinecraftBlock } from "./ſɭw ʃᴜ ɽ͑ʃ'w j͑ʃ'ᴜ.js";
import {
    parseSchematicOrStructure,
    buildOBJ,
    downloadText,
    parseJSONBlocks,
    gridToWorld,
    worldToGrid,
    type ParsedSchematicBlock
} from "./ſ̀ȷᴜȝ.js";
import { SHAPES, buildShapeGeometry, shapeForBlockId, type ShapeId } from "./}ʃᴜ ſɭɜ ı],ᴜ.js";
import { BackgroundManager, type BackgroundMode } from "./ꞁȷ̀ɹ ɭʃɹͷ̗.js";

/**
 * Editing mode.
 *     @param minecraft ( string ) - restricted to minecraft blocks and their palette.
 *     @param general ( string ) - free 3D editing with custom colors.
 */
type EditMode = "minecraft" | "general";

/**
 * Block data structure
 *     @param position ( object ) - x, y, z coordinates.
 *     @param color ( string ) - hex color ( fallback / display ).
 *     @param id ( string ) - unique identifier.
 *     @param blockId ( number ) - minecraft numeric block id.
 *     @param name ( string ) - minecraft block name.
 *     @param shape ( string ) - shape id.
 * @returns block
 */
interface BlockData {
    position: { x: number; y: number; z: number };
    color: string;
    id: string;
    blockId: number;
    name: string;
    shape: ShapeId;
    rotation: number;
    // Per-axis scale. Defaults to {1, 1, 1}; persisted so save/load round
    // trips preserve resized blocks. Optional so legacy snapshots without
    // the field keep working.
    scale?: { x: number; y: number; z: number };
}

/**
 * History entry for undo/redo
 *     @param action ( string ) - add, remove, paint, paint-group, group, move, rotate.
 *     @param block ( BlockData | null ) - block data.
 *     @param previousData ( BlockData | BlockData[] | string | null ) - previous block data
 *         for paint or move, or an array of snapshots for group operations.
 */
interface HistoryEntry {
    action: string;
    block: BlockData | null;
    previousData: BlockData | BlockData[] | string | null;
    // Multi-block history entries ( gizmo-transform ) need somewhere to
    // stash the post-transform state. We deliberately keep `block` typed
    // as `BlockData | null` so the legacy `paint` / `move` handlers keep
    // their narrow type assumption.
    newData?: BlockData[];
}

/**
 * Main workspace class.
 */
class BlockBuilderWorkspace {
    private canvas: HTMLCanvasElement;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;
    private gridHelper!: THREE.GridHelper;
    private ground!: THREE.Mesh;    private blocks: Map<string, THREE.Mesh>;

    private borderGeometry: THREE.EdgesGeometry;
    private borderMaterial: THREE.LineBasicMaterial;
    private hoverBox!: THREE.Group;
    private history: HistoryEntry[];
    private historyIndex: number;
    private currentTool: string;
    private currentBlock: MinecraftBlock;
    private currentColor: string;
    private currentShape: ShapeId;
    private currentMode: EditMode;
    private gridSize: number;
    private showGrid: boolean;
    private snapToGrid: boolean;
    private selectedBlocks: THREE.Mesh[];
    private selectionGroup!: THREE.Group;
    private selectionBox!: THREE.LineSegments;
    private selectStartPos: THREE.Vector3 | null;
    private selectEndPos: THREE.Vector3 | null;
    private isAreaSelecting: boolean;
    private selectRectMesh: THREE.LineSegments | null;
    private isDragging: boolean;
    private dragStarted: boolean;
    private dragStartMouse: THREE.Vector2 | null;
    private dragStartPosition: THREE.Vector3;
    private dragOffset: THREE.Vector3;
    private dragStartPositions: Map<string, THREE.Vector3>;
    private verticalGridGroup!: THREE.Group;
    private pendingToolAction: { tool: string; block?: THREE.Mesh; x?: number; y?: number; z?: number } | null;
    private toolMouseDownPos: { x: number; y: number } | null;
    private pendingRotation: number;
    private sceneryMesh!: THREE.Mesh;
    private backgroundManager: BackgroundManager;
    private autoRotate: boolean;
    private rotateSpeed: number;
    private zoomSpeed: number;
    private panSpeed: number;
    private stepSize: number;
    private groups: Map<string, THREE.Group>;
    private groupCounter: number;
    private selectionBounds: THREE.LineSegments | null;
    private keysPressed: Set<string>;
    private wasdSpeed: number;
    // ── 3D gizmo (TransformControls) ────────────────────────────────
    // A proxy Object3D that the gizmo attaches to. The gizmo can only
    // manipulate one target, but selection is often many blocks. We park
    // the proxy at the selection's bounding-box centre and translate /
    // rotate each selected block relative to that centre when the gizmo
    // changes.
    // Three TransformControls attached to the same selection proxy; all
    // three helpers ( translate / rotate / scale ) are shown
    // simultaneously so the user can drag, rotate, and scale without
    // mode-switching hotkeys. `dragging-changed` on any active TC
    // suspends OrbitControls and snapshots selection state so each drag
    // is one undoable multi-block operation.
    private tcTranslate: TransformControls | null;
    private tcRotate: TransformControls | null;
    private tcScale: TransformControls | null;
    // TransformControls itself is a Controls instance, not an Object3D, so
    // it has no `.visible` flag. Each TC's helper Object3D IS in the
    // scene graph, and we toggle THAT to show / hide the gizmo bundle.
    private tcHelpers: Map<"translate" | "rotate" | "scale", THREE.Object3D>;
    private selectionProxy!: THREE.Group;
    private gizmoDragging: boolean;
    private gizmoMode: "translate" | "rotate" | "scale";  // preserved for serialisation compat
    // Snapshot of selection state captured the moment a gizmo drag
    // begins, used both to compute incremental transforms while the
    // user pulls the handle and to drive undo once the drag ends.
    private gizmoDragStart: {
        proxyPosition: THREE.Vector3;
        proxyQuaternion: THREE.Quaternion;
        blocks: Array<{ block: THREE.Mesh; position: THREE.Vector3; rotation: number; quaternion: THREE.Quaternion }>;
    } | null;
    // The screen-space drag plane used by the move / select tool. Built
    // perpendicular to the camera at the moment of click, so dragging
    // feels like the block is glued to the cursor (POV-based) instead of
    // sliding along the world ground plane.
    private dragPlane: THREE.Plane | null;

    constructor() {
        this.canvas = document.getElementById("workspace3dCanvas") as HTMLCanvasElement;
        this.scene = new THREE.Scene();

        const width = this.canvas.clientWidth || window.innerWidth;
        const height = this.canvas.clientHeight || window.innerHeight;

        this.camera = new THREE.PerspectiveCamera(0o100, width / height, ( 1 / 0o10 ), 0o1000);
        this.camera.position.set(0o10, 0o10, 0o10);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = ( 1 / 0o20 );
        this.controls.zoomToCursor = true;
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.0;
        this.controls.panSpeed = 1.0;
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 0;
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        };

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.borderGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1));
        this.borderMaterial = new THREE.LineBasicMaterial({ color: "#FFFFFF", transparent: true, opacity: ( 1 / 0o10 ) });
        this.blocks = new Map();
        this.history = [];
        this.historyIndex = -1;

        this.currentTool = "select";
        this.currentBlock = MINECRAFT_BLOCKS[0];
        this.currentColor = MINECRAFT_BLOCKS[0].color;
        this.currentShape = "cube";
        this.currentMode = "general";
        this.gridSize = 0o40;
        this.showGrid = true;
        this.snapToGrid = true;
        this.selectedBlocks = [];
        this.selectStartPos = null;
        this.selectEndPos = null;
        this.isAreaSelecting = false;
        this.selectRectMesh = null;
        this.isDragging = false;
        this.dragStarted = false;
        this.dragStartMouse = null;
        this.dragStartPosition = new THREE.Vector3();
        this.dragOffset = new THREE.Vector3();
        this.dragStartPositions = new Map();
        this.pendingToolAction = null;
        this.toolMouseDownPos = null;
        this.pendingRotation = 0;
        this.autoRotate = false;
        this.rotateSpeed = 1.0;
        this.zoomSpeed = 1.0;
        this.panSpeed = 1.0;
        this.stepSize = 1;
        this.groups = new Map();
        this.groupCounter = 0;
        this.selectionBounds = null;
        this.keysPressed = new Set();
        this.wasdSpeed = 5;
        // Make sure dampingFactor lines up with the damping slider default
        // ( slider value 10 / 0o100 = 0.15625 ) instead of the previous
        // 1 / 0o20 = 0.0625 so tuned values do not jump at startup.
        this.controls.dampingFactor = 0o10 / 0o100;

        // Gizmo state defaults. The actual TransformControls instance and
        // selection proxy are created in setupGizmo() once the scene exists,
        // because TransformControls attaches pointer listeners to a DOM
        // element and we want to do that in one tidy block.
        this.tcTranslate = null;
        this.tcRotate = null;
        this.tcScale = null;
        this.tcHelpers = new Map();
        this.gizmoDragging = false;
        this.gizmoMode = "translate";
        this.gizmoDragStart = null;
        this.dragPlane = null;

        // Initialise background manager ( scene background set inside )
        this.backgroundManager = new BackgroundManager(
            this.scene,
            this.gridSize,
            ( color, shape, rotation ) => this.createBackgroundBlock( color, shape, rotation )
        );

        this.setupScene();

        // Default tool is "select", so show vertical grid initially
        this.verticalGridGroup.visible = true;
        this.setupGizmo();
        this.setupEventListeners();
        this.setupUI();
        this.updateCameraInfo();
        this.animate();

        // Load background template asynchronously
        this.backgroundManager.loadTemplate().then( ( loaded ) => {
            if ( loaded ) {
                this.backgroundManager.setMode( "ring", this.sceneryMesh, this.scene.fog as THREE.Fog );
            }
        } );
    }

    /**
     * Setup scene lighting and grid.
     */
    private setupScene(): void {
        const ambientLight = new THREE.AmbientLight("#FFFFFF", ( 1 / 2 ));
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight("#f0f8f0", ( 7 / 8 ));
        directionalLight.position.set(0o14, 0o20, 0o10);
        this.scene.add(directionalLight);

        const skyLight = new THREE.HemisphereLight("#b0d8e0", "#608858", ( 5 / 8 ));
        this.scene.add(skyLight);

        this.scene.fog = new THREE.Fog("#b0d8e0", this.gridSize * ( 3 / 2 ), this.gridSize * ( 9 / 2 ));

        this.gridHelper = this.createGridHelper();
        this.scene.add(this.gridHelper);

        const sceneryGeometry = new THREE.CircleGeometry(this.gridSize * 0o10, 0o60);
        const sceneryMaterial = new THREE.MeshLambertMaterial({ color: "#688858" });
        this.sceneryMesh = new THREE.Mesh(sceneryGeometry, sceneryMaterial);
        this.sceneryMesh.rotation.x = -Math.PI / 2;
        this.sceneryMesh.position.y = -( 5 / 8 );
        this.sceneryMesh.name = "scenery";
        this.scene.add(this.sceneryMesh);

        const baseplate = this.createBaseplate(this.gridSize + 0o10, ( 1 / 2 ), ( 1 / 2 ));
        baseplate.position.y = -( 1 / 0o100 );
        baseplate.name = "ground";
        this.ground = baseplate;
        this.scene.add(baseplate);

        const selectionBoxGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(( 1 + ( 1 / 0o100 ) ), ( 1 + ( 1 / 0o100 ) ), ( 1 + ( 1 / 0o100 ) )));
        const selectionBoxMaterial = new THREE.LineBasicMaterial({ color: "#FFFFFF", linewidth: 0o10 });
        this.selectionGroup = new THREE.Group();
        this.selectionGroup.name = "selectionGroup";
        this.scene.add(this.selectionGroup);

        // Keep one reusable selection box wireframe for drag-follow in move tool
        this.selectionBox = new THREE.LineSegments(selectionBoxGeometry, selectionBoxMaterial);
        this.selectionBox.visible = false;
        this.scene.add(this.selectionBox);

        const hoverGroup = new THREE.Group();
        hoverGroup.name = "hoverBox";
        const hoverFill = new THREE.Mesh(
            buildShapeGeometry(this.getCurrentShape()),
            new THREE.MeshBasicMaterial({ color: "#888888", transparent: true, opacity: ( 2 / 8 ), depthWrite: false })
        );
        const hoverWire = new THREE.LineSegments(
            new THREE.EdgesGeometry(buildShapeGeometry(this.getCurrentShape())),
            new THREE.LineBasicMaterial({ color: "#888888" })
        );
        hoverGroup.add(hoverFill, hoverWire);
        hoverGroup.visible = false;
        this.hoverBox = hoverGroup;
        this.scene.add(this.hoverBox);

        this.verticalGridGroup = this.createVerticalGrid();
        // Fix the grid to the positive-Z wall of the workspace so it stays
        // in a constant position as the user orbits the camera.
        const hg = this.gridSize / 2;
        this.verticalGridGroup.position.set( 0, hg, hg );
        this.verticalGridGroup.rotation.y = Math.PI;
        this.scene.add( this.verticalGridGroup );

        // Selection proxy — the gizmo attaches to this group so multi-block
        // selections can be transformed as one. We never add the proxy to
        // `this.blocks`, so it stays purely a UI helper.
        this.selectionProxy = new THREE.Group();
        this.selectionProxy.name = "selectionProxy";
        this.scene.add( this.selectionProxy );
    }

    /**
     * Create the TransformControls instance and wire up its events. The gizmo
     * is invisible until something is selected AND the active tool is one
     * where manipulation makes sense ( select / move ). `dragging-changed`
     * suspends OrbitControls and snapshots selection state so the drag can be
     * undone as a single multi-block entry. `objectChange` re-projects each
     * selected block relative to the proxy so dragging a 3D handle moves or
     * rotates every member of the selection around the proxy centre.
     */
    private setupGizmo(): void {
        // Three TransformControls instances attached to the same
        // `selectionProxy`. Only ONE helper is visible at a time, switched
        // All three helpers are shown simultaneously; the active
        // TC's `dragging-changed` pauses OrbitControls and snapshots
        // selection state so each drag is one undoable operation.
        const tcTranslate = new TransformControls( this.camera, this.renderer.domElement );
        const tcRotate = new TransformControls( this.camera, this.renderer.domElement );
        const tcScale = new TransformControls( this.camera, this.renderer.domElement );
        tcTranslate.setMode( "translate" );
        tcRotate.setMode( "rotate" );
        tcScale.setMode( "scale" );
        const tcs: TransformControls[] = [ tcTranslate, tcRotate, tcScale ];
        for ( const tc of tcs ) {
            const helper = ( tc as unknown as { getHelper?: () => THREE.Object3D } ).getHelper?.()
                ?? ( tc as unknown as THREE.Object3D );
            // Give each gizmo a distinct size so the handles do not
            // visually overlap when stacked at the proxy centre.
            // Translate ( arrows ) gets the largest, rotate ( rings )
            // a step smaller, and scale ( cube ) the smallest.
            const gizmoSize =
                tc === tcTranslate ? ( 8 / 8 )
                : tc === tcRotate ? ( 5 / 8 )
                : ( 3 / 8 );
            tc.setSize( gizmoSize );
            tc.enabled = false;
            helper.visible = false;
            tc.attach( this.selectionProxy );
            const mode: "translate" | "rotate" | "scale" =
                tc === tcTranslate ? "translate"
                : tc === tcRotate ? "rotate"
                : "scale";
            this.tcHelpers.set( mode, helper as THREE.Object3D );
            this.scene.add( helper as THREE.Object3D );
            tc.addEventListener( "dragging-changed", ( event: { value: unknown } ) => {
                const dragging = event.value === true;
                this.gizmoDragging = dragging;
                if ( dragging ) {
                    if ( !this.isColorInputFocused() ) {
                        this.controls.enabled = false;
                    }
                    this.gizmoDragStart = this.snapshotSelectionForGizmo();
                } else {
                    if ( !this.isColorInputFocused() ) {
                        this.controls.enabled = true;
                    }
                    if ( this.gizmoDragStart ) {
                        this.commitGizmoTransform( this.gizmoDragStart );
                        this.gizmoDragStart = null;
                        // Re-sync the selection outlines and all three
                        // helpers after the drag ends. The TC internals
                        // may have detached or hidden some helpers during
                        // the drag cycle, so we re-assert the expected
                        // state here in the same frame. Centre the proxy
                        // first so the TCs attach at the correct position.
                        this.updateSelectionVisuals();
                        this.attachAllGizmos();
                    }
                }
            } );
            tc.addEventListener( "change", () => {
                // While the gizmo is being dragged, re-project selected
                // blocks so the preview tracks the handle in real time.
                if ( this.gizmoDragging ) {
                    this.applyGizmoTransformLive();
                }
            } );
        }
        this.tcTranslate = tcTranslate;
        this.tcRotate = tcRotate;
        this.tcScale = tcScale;
        // Default mode plus snap wiring so the gizmo is ready before the
        // first selection appears.
        this.attachAllGizmos();
        this.updateGizmoSnaps();
    }

    /**
     * Show all three TransformControls ( translate + rotate + scale )
     * simultaneously on the selection proxy so the user can drag, rotate,
     * and scale in one interaction without mode-switching hotkeys.
     */
    private attachAllGizmos(): void {
        const hasSelection = this.selectedBlocks.length > 0;
        for ( const [ mode, tc ] of [
            [ "translate", this.tcTranslate ],
            [ "rotate", this.tcRotate ],
            [ "scale", this.tcScale ]
        ] as Array<[ "translate" | "rotate" | "scale", TransformControls | null ]> ) {
            if ( !tc ) continue;
            const helper = this.tcHelpers.get( mode );
            if ( hasSelection ) {
                if ( helper ) helper.visible = true;
                tc.enabled = true;
                tc.attach( this.selectionProxy );
            } else {
                if ( helper ) helper.visible = false;
                tc.enabled = false;
                tc.detach();
            }
        }
    }

    /**
     * Sync the active gizmo's snap step with the workspace's snap-toggle
     * and step-size. The rotation and scale TCs get a direct snap value;
     * the translation TC gets `null` because `setTranslationSnap` rounds
     * the proxy's absolute position to multiples of the snap value, but
     * blocks sit at half-integer grid centres ( 0.5, 1.5, 2.5… ) — the
     * rounding produces integer positions, introducing a 0.5 offset.
     * Instead we snap block positions manually inside
     * `applyGizmoTransformLive` using the same `applySnap` helper that
     * block-placement already uses.
     */
    private updateGizmoSnaps(): void {
        // Rotation snap ( 45° ) and scale snap ( subdivision step ) can
        // use the TC's built-in snap. Translation snap is handled in
        // `applyGizmoTransformLive` to preserve the 0.5 cell offset.
        const rotSnap = this.snapToGrid ? Math.PI / 4 : null;
        const scSnap = this.snapToGrid ? 1 / Math.max( 0o1, this.stepSize ) : null;
        if ( this.tcTranslate ) this.tcTranslate.setTranslationSnap( null );
        if ( this.tcRotate ) this.tcRotate.setRotationSnap( rotSnap );
        if ( this.tcScale ) this.tcScale.setScaleSnap( scSnap );
    }

    /**
     * Capture the selection's pose just before a gizmo drag begins. We keep
     * each member's position, rotation, quaternion, and scale so the live
     * preview and the eventual history entry can replay the exact
     * transform.
     *     @returns snapshot for use during drag
     */
    private snapshotSelectionForGizmo(): {
        proxyPosition: THREE.Vector3;
        proxyQuaternion: THREE.Quaternion;
        blocks: Array<{ block: THREE.Mesh; position: THREE.Vector3; rotation: number; quaternion: THREE.Quaternion }>;
    } {
        const blocks = this.selectedBlocks.map( ( block ) => ( {
            block,
            position: block.position.clone(),
            rotation: ( block.userData.rotation as number ) ?? 0,
            quaternion: block.quaternion.clone()
        } ) );
        return {
            proxyPosition: this.selectionProxy.position.clone(),
            proxyQuaternion: this.selectionProxy.quaternion.clone(),
            blocks
        };
    }

    /**
     * Project the proxy's current transform onto each selected block while a
     * gizmo drag is in progress. Translation simply offsets every block by
     * the proxy's positional delta; rotation orbits each block's local
     * offset around the proxy centre using the proxy's quaternion delta;
     * scaling multiplies each block's offset by the proxy's per-axis
     * scale and applies the same multiplier to the block's own scale.
     *
     * When `snapToGrid` is enabled the block's final position is rounded to
     * the nearest valid grid position using `gizmoGridSnap`, which preserves
     * the 0.5 cell-centre offset that `setTranslationSnap` cannot ( since
     * the TC snap rounds to absolute multiples, producing integer positions
     * that are 0.5 off from where blocks actually sit ).
     *
     * Important: this does NOT call `updateSelectionVisuals()`. That would
     * be expensive (disposing/rebuilding edge geometries per frame) and it
     * would also re-anchor the gizmo proxy, cancelling the user's drag.
     * Instead the per-frame visual follow happens in `animate()`, which
     * already slides the existing outline LineSegments to block positions.
     */
    private applyGizmoTransformLive(): void {
        const start = this.gizmoDragStart;
        if ( !start ) return;
        const deltaPos = new THREE.Vector3().subVectors( this.selectionProxy.position, start.proxyPosition );
        const deltaQuat = new THREE.Quaternion().copy( this.selectionProxy.quaternion ).multiply(
            new THREE.Quaternion().copy( start.proxyQuaternion ).invert()
        );
        for ( const snap of start.blocks ) {
            // Rotate the block's offset relative to the proxy centre by the
            // proxy's rotation delta, then re-add the translated centre.
            const offset = snap.position.clone().sub( start.proxyPosition );
            offset.applyQuaternion( deltaQuat );
            const desired = start.proxyPosition.clone().add( offset ).add( deltaPos );
            // Manual grid snap that accounts for the 0.5 cell-centre offset
            // that blocks always sit at. TC's built-in setTranslationSnap
            // snaps to multiples of the snap value ( producing integer
            // positions ), which is why we do it ourselves here.
            if ( this.snapToGrid ) {
                desired.x = this.gizmoGridSnap( desired.x );
                desired.y = this.gizmoGridSnap( desired.y );
                desired.z = this.gizmoGridSnap( desired.z );
            }
            snap.block.position.copy( desired );
            snap.block.quaternion.copy( deltaQuat ).multiply( snap.quaternion );
            snap.block.userData.rotation = this.extractYRotation( snap.block.quaternion );
        }
    }

    /**
     * Snap a coordinate to the nearest valid grid position for blocks.
     * Blocks sit at cell centres, which are offset by 0.5 from integer grid
     * lines.  The subdivision granularity is `1/stepSize`, so stepSize=1
     * produces positions at 0.5, 1.5, 2.5… and stepSize=2 produces 0.5, 1.0,
     * 1.5, 2.0, 2.5… ( half-grid precision ).
     *     value ( number ) - world-space coordinate to snap.
     * Returns snapped coordinate.
     */
    private gizmoGridSnap( value: number ): number {
        const step = Math.max( 0o1, this.stepSize );
        // Shift value by 0.5 so the rounded result lands on a half-grid
        // centre, then shift back.
        return Math.round( ( value - ( 1 / 2 ) ) * step ) / step + ( 1 / 2 );
    }

    /**
     * Reduce a quaternion to a scalar rotation around the world Y axis. We
     * only ever rotate cubic blocks in integer multiples of π/2, so a single
     * scalar is enough to reconstruct the look during undo / redo.
     *     @returns rotation in radians
     */
    private extractYRotation( quaternion: THREE.Quaternion ): number {
        // Convert quaternion to Euler using YXZ order so the primary Y axis
        // value stays the meaningful one even after small roll/pitch caused
        // by quaternion normalisation drift.
        const euler = new THREE.Euler().setFromQuaternion( quaternion, "YXZ" );
        return euler.y;
    }

    /**
     * Finalise a gizmo drag: push a single multi-block history entry so the
     * user can undo the entire translation / rotation / scale in one step.
     *     @param start ( snapshot ) - snapshot taken at the start of the drag.
     */
    private commitGizmoTransform( start: NonNullable<typeof this.gizmoDragStart> ): void {
        // Determine which selection members actually changed so we avoid
        // polluting history when the drag did not move anything ( e.g. user
        // grabbed a handle but let go without dragging ).
        const oldSnapshots: BlockData[] = [];
        const newSnapshots: BlockData[] = [];
        const threshold = 0.001;
        for ( const snap of start.blocks ) {
            // Skip members that were deleted mid-drag so we never reach
            // into a freed mesh for material / userData. If the block is
            // orphaned ( removed from the scene ) we simply skip it.
            if ( !snap.block.parent ) continue;
            const newPos = snap.block.position;
            const moved = Math.abs( newPos.x - snap.position.x ) > threshold
                || Math.abs( newPos.y - snap.position.y ) > threshold
                || Math.abs( newPos.z - snap.position.z ) > threshold;
            const oldRot = snap.rotation;
            const newRot = ( snap.block.userData.rotation as number ) ?? oldRot;
            const rotated = Math.abs( newRot - oldRot ) > 0.01;
            if ( !moved && !rotated ) {
                continue;
            }
            oldSnapshots.push( {
                position: { x: snap.position.x, y: snap.position.y, z: snap.position.z },
                color: this.getBlockColor( snap.block ),
                id: this.blockKey( snap.position ),
                blockId: snap.block.userData.blockId as number,
                name: snap.block.userData.blockName as string,
                shape: snap.block.userData.shape as ShapeId,
                rotation: oldRot
            } );
            const p = snap.block.position;
            newSnapshots.push( {
                position: { x: p.x, y: p.y, z: p.z },
                color: this.getBlockColor( snap.block ),
                id: this.blockKey( p ),
                blockId: snap.block.userData.blockId as number,
                name: snap.block.userData.blockName as string,
                shape: snap.block.userData.shape as ShapeId,
                rotation: newRot
            } );
            // Mirror the rotation back into mesh.rotation.y ( which the rest
            // of the renderer reads ) AND keep block.quaternion strictly in
            // sync with the scalar rotation. Without the quaternion sync,
            // the next gizmo drag would compile its delta from an outdated,
            // drifted quaternion and visibly diverge from the cleaner Y-only
            // model that drives the scalar rotation.
            snap.block.rotation.y = newRot;
            snap.block.quaternion.setFromAxisAngle(
                new THREE.Vector3( 0, 1, 0 ),
                newRot
            );
        }
        if ( oldSnapshots.length === 0 ) {
            return;
        }
        // The post-transform state lives in `newData` rather than `block`
        // so the existing single-block handlers ( paint / move / rotate )
        // keep their narrow `BlockData` typing intact.
        this.history.push( {
            action: "gizmo-transform",
            block: null,
            previousData: oldSnapshots,
            newData: newSnapshots
        } );
        this.historyIndex++;
    }

    /**
     * Read a block's current transform ( including scale ) back into a
     * BlockData snapshot for save and history purposes.
     *     @param block ( THREE.Mesh ) - block to read.
     *     @returns BlockData
     */
    private readBlockDataWithScale( block: THREE.Mesh ): BlockData {
        const base = this.readBlockData( block );
        return {
            ...base,
            scale: { x: block.scale.x, y: block.scale.y, z: block.scale.z }
        };
    }

    /**
     * Update the properties panel inputs to reflect the current selection.
     * For multi-block selections we display "( mixed )" placeholders for any
     * axis whose value differs across the selection. The panel is also shown
     * whenever a block is selected, regardless of which tool is active.
     */
    private updatePropertiesPanel(): void {
        const panel = document.getElementById( "propertiesPanel" );
        if ( !panel ) return;
        // Show whenever we have any selection. Even with an unknown tool
        // ( e.g. user dragged the toolbar buttons in a weird order ) the
        // panel still surfaces the block state.
        if ( this.selectedBlocks.length === 0 ) {
            panel.style.display = "none";
            return;
        }
        panel.style.display = "";
        // Aggregate values across the selection, falling back to "( mixed )"
        // anywhere the blocks disagree. Rotation values are kept in radians
        // — the input is a radians field, not degrees.
        const r2 = Math.PI / 2;
        const fields: Array<{
            input: HTMLInputElement | null;
            values: number[];
            step: number;
            parse: ( s: string ) => number | null;
        }> = [
            {
                input: this.el<HTMLInputElement>( "propPosX" ),
                values: this.selectedBlocks.map( ( b ) => b.position.x ),
                step: 0.5,
                parse: parseFloat
            },
            {
                input: this.el<HTMLInputElement>( "propPosY" ),
                values: this.selectedBlocks.map( ( b ) => b.position.y ),
                step: 0.5,
                parse: parseFloat
            },
            {
                input: this.el<HTMLInputElement>( "propPosZ" ),
                values: this.selectedBlocks.map( ( b ) => b.position.z ),
                step: 0.5,
                parse: parseFloat
            },
            {
                input: this.el<HTMLInputElement>( "propRot" ),
                values: this.selectedBlocks.map( ( b ) => ( b.userData.rotation as number ) ?? 0 ),
                // PI/2 = 90° — preserves the rotation snap cadence in radians.
                step: r2,
                parse: parseFloat
            }
        ];
        for ( const f of fields ) {
            if ( !f.input ) continue;
            const allEqual = f.values.every( ( v ) => Math.abs( v - f.values[0] ) < 0.001 );
            f.input.value = allEqual
                ? this.formatPropValue( f.values[0], f )
                : this.el<HTMLElement>( "propertiesMixedLabel" )?.textContent ?? "( mixed )";
            f.input.dataset["consistent"] = allEqual ? "1" : "0";
        }
        // Block metadata ( name, id, color ) is shown only for single-block
        // selections since multi-select strings are not generally equal.
        const first = this.selectedBlocks[0];
        // In general 3D mode, hide the Minecraft-specific name and block-id
        // fields so the panel shows only shape, colour, and transforms.
        const mcSection = document.getElementById( "minecraftPropsSection" );
        if ( mcSection ) {
            mcSection.style.display = this.currentMode === "minecraft" ? "" : "none";
        }
        this.applyMetadataField( "propName", first?.userData.blockName ?? "" );
        this.applyMetadataField( "propBlockId", ( first?.userData.blockId ?? "" ).toString() );
        const colorEl = this.el<HTMLElement>( "propColorSwatch" );
        if ( colorEl && first ) {
            const color = this.getBlockColor( first );
            colorEl.style.background = color;
            colorEl.textContent = color;
        }
        const shapeEl = this.el<HTMLElement>( "propShape" );
        if ( shapeEl && first ) {
            shapeEl.textContent = first.userData.shape ?? "cube";
        }
    }

    /**
     * Format a numeric property value for the panel input. We use a small
     * precision-friendly formatter ( .toFixed( 2 ) ) so values like
     * position do not show floating-point noise, but stepSize > 1 values
     * stay simple integers.
     *     @param value ( number ) - the value to format.
     *     @param field ( object ) - the field definition from updatePropertiesPanel.
     *     @returns string for the input
     */
    private formatPropValue( value: number, field: { step: number } ): string {
        const decimalPlaces = field.step >= 1 ? 0 : 2;
        return value.toFixed( decimalPlaces );
    }

    private applyMetadataField( id: string, value: string ): void {
        const el = this.el<HTMLElement>( id );
        if ( el ) el.textContent = value;
    }

    /**
     * Commit a typed value from the properties panel back onto every
     * selected block and record a single history entry so the user can
     * undo their edit. Rotation is in radians — the input field is radians,
     * so no degree conversion happens here.
     *     @param field ( string ) - "pos.x" | "pos.y" | "pos.z" | "rot".
     *     @param raw ( string ) - the raw input string (radians for `rot`).
     */
    private applyPropertyEdit( field: string, raw: string ): void {
        if ( this.selectedBlocks.length === 0 ) return;
        const parsed = parseFloat( raw );
        if ( !isFinite( parsed ) ) return;
        const snapshots = this.selectedBlocks.map( ( block ) => {
            if ( !block.parent ) return null;
            return {
                pos: block.position.clone(),
                rot: ( block.userData.rotation as number ) ?? 0,
                scl: block.scale.clone()
            };
        } ).filter( <T>( v: T | null ): v is T => v !== null );
        for ( const block of this.selectedBlocks ) {
            switch ( field ) {
                case "pos.x": block.position.x = parsed; break;
                case "pos.y": block.position.y = parsed; break;
                case "pos.z": block.position.z = parsed; break;
                case "rot": {
                    // `rot` is radians — no conversion applied.
                    block.rotation.y = parsed;
                    block.userData.rotation = parsed;
                    block.quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), parsed );
                    break;
                }
                default: return;
            }
        }
        // Build a single history entry per affected block using the same
        // multi-block scheme as the gizmo so undo / redo stay consistent.
        const oldData: BlockData[] = [];
        const newData: BlockData[] = [];
        for ( let i = 0; i < this.selectedBlocks.length; i++ ) {
            const block = this.selectedBlocks[i];
            const before = snapshots[i];
            if ( !block.parent || !before ) continue;
            oldData.push( {
                position: { x: before.pos.x, y: before.pos.y, z: before.pos.z },
                color: this.getBlockColor( block ),
                id: this.blockKey( before.pos ),
                blockId: block.userData.blockId as number,
                name: block.userData.blockName as string,
                shape: block.userData.shape as ShapeId,
                rotation: before.rot,
                scale: { x: before.scl.x, y: before.scl.y, z: before.scl.z }
            } );
            newData.push( {
                position: { x: block.position.x, y: block.position.y, z: block.position.z },
                color: this.getBlockColor( block ),
                id: this.blockKey( block.position ),
                blockId: block.userData.blockId as number,
                name: block.userData.blockName as string,
                shape: block.userData.shape as ShapeId,
                rotation: ( block.userData.rotation as number ) ?? 0,
                scale: { x: block.scale.x, y: block.scale.y, z: block.scale.z }
            } );
        }
        if ( oldData.length === 0 ) return;
        this.history.push( {
            action: "property-edit",
            block: null,
            previousData: oldData,
            newData
        } );
        this.historyIndex++;
        this.refreshGizmoVisibility();
        this.updateSelectionVisuals();
    }

    /**
     * Snap a per-axis scale value to the nearest integer multiple of the
     * (no longer relevant — scale UI was removed in favour of the
     * always-snapping combined transform panel).
     */



    /**
     * Create a grid helper sized to the current grid size.
     *     @returns GridHelper
     */
    private createGridHelper(): THREE.GridHelper {
        const gridHelper = new THREE.GridHelper(this.gridSize, this.gridSize, "#384838", "#282828");
        gridHelper.position.y = ( 1 / 0o100 );
        return gridHelper;
    }

    /**
     * Create a rounded rectangular baseplate ( a 3D slab with beveled edges ).
     *     @param size ( number ) - width/depth of the plate.
     *     @param height ( number ) - thickness of the plate.
     *     @param radius ( number ) - corner radius.
     *     @returns Mesh
     */
    private createBaseplate(size: number, height: number, radius: number): THREE.Mesh {
        const shape = new THREE.Shape();
        const half = size / 2;
        const r = Math.min(radius, half);
        shape.moveTo(-half + r, -half);
        shape.lineTo(half - r, -half);
        shape.quadraticCurveTo(half, -half, half, -half + r);
        shape.lineTo(half, half - r);
        shape.quadraticCurveTo(half, half, half - r, half);
        shape.lineTo(-half + r, half);
        shape.quadraticCurveTo(-half, half, -half, half - r);
        shape.lineTo(-half, -half + r);
        shape.quadraticCurveTo(-half, -half, -half + r, -half);

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: height,
            bevelEnabled: false,
            curveSegments: 0o14
        });
        geometry.rotateX(-Math.PI / 2);
        geometry.translate(0, -height, 0);

        const material = new THREE.MeshLambertMaterial({ color: "#784838" });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = "ground";
        return mesh;
    }

    /**
     * Build a single background block mesh ( no selection edges ) used for the
     * scattered decorative buildings.
     *     @param color ( string ) - material color.
     *     @param shape ( ShapeId ) - shape id.
     *     @param rotation ( number ) - block's own y rotation in radians.
     *     @returns Mesh
     */
    private createBackgroundBlock(color: string, shape: ShapeId, rotation: number): THREE.Mesh {
        const material = new THREE.MeshLambertMaterial({ color });
        const mesh = new THREE.Mesh(buildShapeGeometry(shape), material);
        mesh.rotation.y = rotation;
        return mesh;
    }

    /**
     * Build a 2D reference grid on a vertical plane used as a visual aid for
     * vertical selection.  The group is repositioned and rotated each frame to
     * face the camera at the far edge of the workspace.
     *     @returns Group
     */
    private createVerticalGrid(): THREE.Group {
        const group = new THREE.Group();
        group.name = "verticalGrid";

        const material = new THREE.LineBasicMaterial({
            color: "#384838",
            transparent: true,
            opacity: ( 2 / 8 ),
            depthWrite: false
        });

        const half = this.gridSize / 2;
        const step = 0o4;
        const positions: number[] = [];

        // Vertical lines ( parallel to the y-axis ) in local xy-plane
        for ( let gx = -half; gx <= half; gx += step ) {
            positions.push( gx, -half, 0 );
            positions.push( gx, half, 0 );
        }

        // Horizontal lines ( parallel to the x-axis ) in local xy-plane
        for ( let gy = -half; gy <= half; gy += step ) {
            positions.push( -half, gy, 0 );
            positions.push( half, gy, 0 );
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( "position", new THREE.Float32BufferAttribute( positions, 3 ) );
        const mesh = new THREE.LineSegments( geometry, material );
        group.add( mesh );

        // Flat translucent surface so the raycaster can hit it, allowing the
        // select tool to start / end a drag on the vertical grid plane and
        // capture the y-coordinate for a vertical slice selection.
        const planeGeo = new THREE.PlaneGeometry( this.gridSize, this.gridSize );
        const planeMat = new THREE.MeshBasicMaterial({
            color: "#384838",
            transparent: true,
            opacity: ( 1 / 8 ),
            depthWrite: false,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh( planeGeo, planeMat );
        plane.name = "verticalGrid";
        group.add( plane );

        group.visible = false;
        return group;
    }



    /**
     * Setup mouse and keyboard event listeners.
     */
    private setupEventListeners(): void {

        window.addEventListener("resize", () => this.onWindowResize());
        window.addEventListener("mouseup", (e) => this.onMouseUp(e));
        this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
        this.canvas.addEventListener("mouseleave", () => {
            this.hoverBox.visible = false;
            if ( this.isAreaSelecting ) {
                this.hideSelectRect();
                this.isAreaSelecting = false;
                this.selectStartPos = null;
                this.selectEndPos = null;
                if ( !this.isColorInputFocused() ) this.controls.enabled = true;
            }
        });
        this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());

        document.addEventListener("keydown", (e) => this.onKeyDown(e));
        document.addEventListener("keyup", (e) => this.onKeyUp(e));
    }

    /**
     * Setup UI controls.
     */
    private setupUI(): void {
        initSharedToolbar();

        this.bindToggleGroup("#toolsPanel button[data-tool]", "data-tool", (value) => this.setTool(value));
        this.bindToggleGroup("button[data-mode]", "data-mode", (value) => this.setMode(value as EditMode));
        this.bindToggleGroup("#shapesPanel button[data-shape]", "data-shape", (value) => this.setShape(value as ShapeId));
        this.bindToggleGroup("button[data-background]", "data-background", (value) => {
            this.backgroundManager.setMode(value as BackgroundMode, this.sceneryMesh, this.scene.fog as THREE.Fog);
        });
        // Kick the gizmo once so its visibility reflects the initial
        // selection state ( empty on load ). Without this the gizmo
        // would stay hidden until the user toggles the tool for the first
        // time.
        this.refreshGizmoVisibility();
        this.setTool( this.currentTool );
        // Wire the properties-panel inputs once the DOM is ready. They are
        // hidden on first load ( no selection ) so binding is cheap.
        this.bindPropertiesPanel();
        this.updatePropertiesPanel();

        // Initialize mode panels to match default currentMode ( "general" )
        this.setMode( this.currentMode );

        const blockIdInput = this.el<HTMLInputElement>("blockIdInput");
        const blockIdList = document.getElementById("blockIdList");
        if (blockIdList) {
            MINECRAFT_BLOCKS.forEach((block) => {
                const option = document.createElement("option");
                option.value = block.id.toString();
                option.label = `${block.id} - ${block.name}`;
                blockIdList.appendChild(option);
            });
        }
        if (blockIdInput) {
            blockIdInput.value = this.currentBlock.id.toString();
            blockIdInput.addEventListener("change", (e) => {
                const id = parseInt((e.target as HTMLInputElement).value, 10);
                const block = MINECRAFT_BLOCKS.find((b) => b.id === id);
                if (block) {
                    this.setBlock(block);
                } else {
                    this.setBlock({ id, name: `Block ${id}`, color: "#888888" });
                }
            });
        }

        const colorInput = this.el<HTMLInputElement>("colorInput");
        if (colorInput) {
            colorInput.value = this.currentColor;
            colorInput.addEventListener("focus", () => { this.controls.enabled = false; });
            colorInput.addEventListener("blur", () => { this.controls.enabled = true; });
            colorInput.addEventListener("input", (e) => {
                this.setCurrentColor((e.target as HTMLInputElement).value);
                this.syncColorTextInput(this.currentColor);
                this.updateSelectedBlockInfo();
            });
        }

        const colorTextInput = this.el<HTMLInputElement>("colorTextInput");
        if (colorTextInput) {
            colorTextInput.value = this.currentColor;
            colorTextInput.addEventListener("focus", () => { this.controls.enabled = false; });
            colorTextInput.addEventListener("blur", () => { this.controls.enabled = true; });
            const applyTextColor = (): void => {
                const value = colorTextInput.value.trim();
                if ( value && /^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(value) ) {
                    const normalized = value.startsWith("#") ? value : "#" + value;
                    this.setCurrentColor(normalized);
                    colorInput!.value = normalized;
                    this.updateSelectedBlockInfo();
                }
            };
            colorTextInput.addEventListener("input", applyTextColor);
            colorTextInput.addEventListener("change", applyTextColor);
        }

        this.el("colorPickerTool")?.addEventListener("click", () => this.setTool("picker"));

        this.updateSelectedBlockInfo();
        const zoomSlider = this.el<HTMLInputElement>("zoomSlider");
        if (zoomSlider) {
            zoomSlider.addEventListener("input", (e) => {
                const value = parseInt((e.target as HTMLInputElement).value, 10);
                this.camera.fov = Math.min(Math.max(value, 0o14), 0o140);
                this.camera.updateProjectionMatrix();
                this.updateCameraInfo();
            });
        }

        const rotateSlider = this.el<HTMLInputElement>("rotateSlider");
        if (rotateSlider) {
            rotateSlider.addEventListener("input", (e) => {
                const angle = parseInt((e.target as HTMLInputElement).value, 10);
                const rad = (angle * Math.PI) / 180;
                const radius = Math.sqrt(this.camera.position.x * this.camera.position.x + this.camera.position.z * this.camera.position.z);
                const height = this.camera.position.y;
                this.camera.position.x = Math.sin(rad) * radius;
                this.camera.position.z = Math.cos(rad) * radius;
                this.camera.position.y = height;
                this.camera.lookAt(0, 0, 0);
                this.updateCameraInfo();
            });
        }

        this.el("resetCameraBtn")?.addEventListener("click", () => {
            this.camera.position.set(0o10, 0o10, 0o10);
            this.camera.lookAt(0, 0, 0);
            this.controls.reset();
            this.updateCameraInfo();
        });

        const gridToggle = this.el<HTMLInputElement>("gridToggle");
        if (gridToggle) {
            gridToggle.addEventListener("change", (e) => {
                this.showGrid = (e.target as HTMLInputElement).checked;
                this.gridHelper.visible = this.showGrid;
            });
        }

        const snapToggle = this.el<HTMLInputElement>("snapToggle");
        if (snapToggle) {
            snapToggle.addEventListener("change", (e) => {
                this.snapToGrid = (e.target as HTMLInputElement).checked;
                // Re-sync gizmo snap so dragging handles also honours the
                // new toggle ( and respects the user's pick between world
                // units and freeform movement within the same frame ).
                this.updateGizmoSnaps();
            });
        }

        const gridSizeSlider = this.el<HTMLInputElement>("gridSizeSlider");
        if (gridSizeSlider) {
            gridSizeSlider.addEventListener("input", (e) => {
                const size = parseInt((e.target as HTMLInputElement).value, 10);
                this.gridSize = size;
                if (this.gridHelper) {
                    this.scene.remove(this.gridHelper);
                }
                this.gridHelper = this.createGridHelper();
                this.gridHelper.visible = this.showGrid;
                this.scene.add(this.gridHelper);
                if (this.ground) {
                    this.scene.remove(this.ground);
                    this.ground.geometry.dispose();
                    this.ground = this.createBaseplate(size + 0o10, ( 1 / 2 ), ( 1 / 2 ));
                    this.ground.position.y = -( 1 / 0o100 );
                    this.ground.name = "ground";
                    this.scene.add(this.ground);
                }
                this.backgroundManager.setGridSize(size);
                this.backgroundManager.rebuildCurrent(this.sceneryMesh, this.scene.fog as THREE.Fog);
                // Rebuild vertical grid to match new size
                if ( this.verticalGridGroup ) {
                    const wasVisible = this.verticalGridGroup.visible;
                    this.scene.remove( this.verticalGridGroup );
                    this.verticalGridGroup = this.createVerticalGrid();
                    const hg = this.gridSize / 2;
                    this.verticalGridGroup.position.set( 0, hg, hg );
                    this.verticalGridGroup.rotation.y = Math.PI;
                    this.verticalGridGroup.visible = wasVisible;
                    this.scene.add( this.verticalGridGroup );
                }
            });
        }

        const fileInput = this.el<HTMLInputElement>("fileInput");
        const bindClick = (id: string, handler: () => void): void => {
            this.el(id)?.addEventListener("click", handler);
        };

        const actionBindings: Array<[string, () => void]> = [
            ["undoBtn", () => this.undo()],
            ["quickUndo", () => this.undo()],
            ["redoBtn", () => this.redo()],
            ["quickRedo", () => this.redo()],
            ["clearBtn", () => this.clearAll()],
            ["quickClear", () => this.clearAll()],
            ["saveBtn", () => this.save()],
            ["quickSave", () => this.save()],
            ["loadBtn", () => fileInput?.click()],
            ["export3DBtn", () => this.exportOBJ()],
            ["exportSchematicBtn", () => this.exportSchematic()],
            ["combineBtn", () => this.combineSelected()],
            ["groupBtn", () => this.groupSelected()],
            ["ungroupBtn", () => this.ungroupSelected()],
            ["unionBtn", () => this.unionSelected()]
        ];

        actionBindings.forEach(([id, handler]) => bindClick(id, handler));

        const autoRotateToggle = this.el<HTMLInputElement>("autoRotateToggle");
        if (autoRotateToggle) {
            autoRotateToggle.checked = this.autoRotate;
            this.controls.autoRotate = this.autoRotate;
            autoRotateToggle.addEventListener("change", (e) => {
                this.autoRotate = (e.target as HTMLInputElement).checked;
                this.controls.autoRotate = this.autoRotate;
            });
        }

        const rotateSpeedSlider = this.el<HTMLInputElement>("rotateSpeedSlider");
        if (rotateSpeedSlider) {
            this.controls.rotateSpeed = this.rotateSpeed;
            rotateSpeedSlider.addEventListener("input", (e) => {
                this.rotateSpeed = parseInt((e.target as HTMLInputElement).value, 10) / 0o10;
                this.controls.rotateSpeed = this.rotateSpeed;
            });
        }

        const zoomSpeedSlider = this.el<HTMLInputElement>("zoomSpeedSlider");
        if (zoomSpeedSlider) {
            this.controls.zoomSpeed = this.zoomSpeed;
            zoomSpeedSlider.addEventListener("input", (e) => {
                this.zoomSpeed = parseInt((e.target as HTMLInputElement).value, 10) / 0o10;
                this.controls.zoomSpeed = this.zoomSpeed;
            });
        }

        const panSpeedSlider = this.el<HTMLInputElement>("panSpeedSlider");
        if (panSpeedSlider) {
            this.controls.panSpeed = this.panSpeed;
            panSpeedSlider.addEventListener("input", (e) => {
                this.panSpeed = parseInt((e.target as HTMLInputElement).value, 10) / 0o10;
                this.controls.panSpeed = this.panSpeed;
            });
        }

        const dampingSlider = this.el<HTMLInputElement>("dampingSlider");
        if (dampingSlider) {
            this.controls.dampingFactor = parseInt(dampingSlider.value, 10) / 0o100;
            dampingSlider.addEventListener("input", (e) => {
                this.controls.dampingFactor = parseInt((e.target as HTMLInputElement).value, 10) / 0o100;
            });
        }

        const wasdSpeedSlider = this.el<HTMLInputElement>("wasdSpeedSlider");
        if (wasdSpeedSlider) {
            wasdSpeedSlider.addEventListener("input", (e) => {
                this.wasdSpeed = parseInt((e.target as HTMLInputElement).value, 10);
            });
        }

        const stepSizeSlider = this.el<HTMLInputElement>("stepSizeSlider");
        if (stepSizeSlider) {
            stepSizeSlider.value = this.stepSize.toString();
        stepSizeSlider.addEventListener("input", (e) => {
            const value = parseInt((e.target as HTMLInputElement).value, 10);
            this.stepSize = Math.max(0o1, value);
            // The active gizmo's snap step depends on stepSize, so refresh
            // it in the same frame the slider moves — otherwise the next
            // TC drag uses the previous step until something else triggers
            // refreshGizmoVisibility.
            this.updateGizmoSnaps();
        });
        }

        fileInput?.addEventListener("change", (e) => this.load(e));
    }

    /**
     * Wire a group of toggle buttons so clicking one selects it ( aria-pressed )
     * and invokes the handler with the button's attribute value.
     *     @param selector ( string ) - query selector for the buttons.
     *     @param attr ( string ) - attribute holding the value.
     *     @param handler ( function ) - called with the selected value.
     */
    private bindToggleGroup(selector: string, attr: string, handler: (value: string) => void): void {
        const buttons = document.querySelectorAll<HTMLElement>(selector);
        buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const value = btn.getAttribute(attr);
                if (!value) return;
                handler(value);
                buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
                btn.setAttribute("aria-pressed", "true");
            });
        });
    }

    /**
     * Get an element by id, optionally typed.
     *     @param id ( string ) - element id.
     *     @returns element or null
     */
    private el<T extends HTMLElement = HTMLElement>(id: string): T | null {
        return document.getElementById(id) as T | null;
    }

    /**
     * Sync the color and block-id input fields to the given values.
     *     @param blockId ( number ) - minecraft numeric block id.
     *     @param color ( string ) - hex color.
     */
    private syncBlockInputs(blockId: number, color: string): void {
        const colorInput = this.el<HTMLInputElement>("colorInput");
        if (colorInput) colorInput.value = color;
        this.syncColorTextInput(color);
        const input = this.el<HTMLInputElement>("blockIdInput");
        if (input) input.value = blockId.toString();
    }

    private syncColorTextInput(color: string): void {
        const colorTextInput = this.el<HTMLInputElement>("colorTextInput");
        if (colorTextInput) colorTextInput.value = color;
    }

    private isColorInputFocused(): boolean {
        const active = document.activeElement;
        return active === this.el( "colorInput" ) || active === this.el( "colorTextInput" );
    }

    /**
     * Update the current color, switching to a custom block in general mode.
     *     @param color ( string ) - hex color string.
     */
    private setCurrentColor(color: string): void {
        this.currentColor = color;
        if ( this.currentMode === "general" ) {
            this.currentBlock = { id: 0, name: "Custom", color };
        }
    }

    /**
     * Set current block by Minecraft block definition.
     *     @param block ( MinecraftBlock ) - block definition.
     */
    private setBlock(block: MinecraftBlock): void {
        this.currentBlock = block;
        this.currentColor = block.color;
        if (this.currentMode === "minecraft") {
            this.currentShape = shapeForBlockId(block.id);
        }
        this.syncBlockInputs(block.id, block.color);
        this.updateSelectedBlockInfo();
    }

    /**
     * Set current editing mode.
     *     @param mode ( EditMode ) - minecraft or general.
     */
    private setMode(mode: EditMode): void {
        this.currentMode = mode;
        const minecraftPanel = document.getElementById("colorsPanel");
        const generalPanel = document.getElementById("generalColorsPanel");
        const shapesPanel = document.getElementById("shapesPanel");
        const schematicPanel = document.getElementById("schematicPanel");
        const groupingPanel = document.getElementById("groupingPanel");
        if (minecraftPanel) minecraftPanel.style.display = mode === "minecraft" ? "" : "none";
        if (generalPanel) generalPanel.style.display = mode === "general" ? "" : "none";
        if (shapesPanel) shapesPanel.style.display = mode === "general" ? "" : "none";
        if (schematicPanel) schematicPanel.style.display = mode === "minecraft" ? "" : "none";
        if (groupingPanel) groupingPanel.style.display = mode === "general" ? "" : "none";
        if (mode === "minecraft") {
            this.currentShape = shapeForBlockId(this.currentBlock.id);
        }
        this.updateShapeButtons();
        this.updateSelectedBlockInfo();
    }

    /**
     * Resolve the shape to use for the current selection. In Minecraft mode
     * the shape is derived from the block id, otherwise the manual choice is
     * used.
     *     @returns ShapeId
     */
    private getCurrentShape(): ShapeId {
        if (this.currentMode === "minecraft") {
            return shapeForBlockId(this.currentBlock.id);
        }
        return this.currentShape;
    }

    /**
     * Set current shape ( used in general 3D mode ).
     *     @param shape ( ShapeId ) - shape id.
     */
    private setShape(shape: ShapeId): void {
        this.currentShape = shape;
        this.updateShapeButtons();
    }

    /**
     * Resolve the display name for the current shape.
     *     @returns shape name string
     */
    private getCurrentShapeName(): string {
        return SHAPES.find((s) => s.id === this.getCurrentShape())?.name ?? "Cube";
    }

    /**
     * Resolve the effective color based on editing mode.
     *     @returns hex color string
     */
    private getEffectiveColor(): string {
        return this.currentMode === "general" ? this.currentColor : this.currentBlock.color;
    }

    /**
     * Sync the shape selector buttons to the active shape.
     */
    private updateShapeButtons(): void {
        const active = this.getCurrentShape();
        const shapeButtons = document.querySelectorAll("#shapesPanel button[data-shape]");
        shapeButtons.forEach((b) => {
            b.setAttribute("aria-pressed", (b.getAttribute("data-shape") === active).toString());
        });
    }

    /**
     * Update the selected block info label and color swatch.
     */
    private updateSelectedBlockInfo(): void {
        const label = document.getElementById("selectedBlockLabel");
        if (label) {
            const shapeName = this.getCurrentShapeName();
            label.textContent = `${this.currentBlock.name} ( id.${this.currentBlock.id} ) - ${shapeName}`;
        }
        const colorEl = document.getElementById("selectedBlockColor");
        if (colorEl) {
            const display = this.getEffectiveColor();
            colorEl.textContent = display;
            (colorEl as HTMLElement).style.color = display;
        }
        const generalColorEl = document.getElementById("selectedBlockColorGeneral");
        if (generalColorEl) {
            generalColorEl.textContent = this.currentColor;
            (generalColorEl as HTMLElement).style.color = this.currentColor;
        }
    }

    /**
     * Set current tool.
     *     @param tool ( string ) - tool name.
     */
    private setTool(tool: string): void {
        // Drop the screen-space drag plane when the user leaves the move
        // tool. Otherwise a stale plane from a half-finished drag would
        // raycast on the next click and yank the next block off the grid.
        if ( tool !== "move" ) {
            this.dragPlane = null;
        }
        this.currentTool = tool;
        if (tool === "select") {
            this.canvas.style.cursor = "crosshair";
        } else if (tool === "move") {
            this.canvas.style.cursor = "move";
        } else if (tool === "add" || tool === "paint" || tool === "remove") {
            this.canvas.style.cursor = "crosshair";
        } else {
            this.canvas.style.cursor = "default";
        }
        // Show vertical grid only in select mode to help with vertical selection
        this.verticalGridGroup.visible = ( tool === "select" );
        if (tool !== "add" && tool !== "paint" && tool !== "remove") {
            this.hoverBox.visible = false;
        }
        // Reset pending rotation when leaving add tool
        if ( tool !== "add" ) {
            this.pendingRotation = 0;
        }
        // Hide / show the properties panel based purely on selection state
        // ( the gizmo is tool-agnostic once combined translate+rotate are
        // active, so the legacy transform-panel toggle is no longer needed ).
        this.refreshGizmoVisibility();
        this.updatePropertiesPanel();
    }

    /**
     * Toggle the gizmo handles on or off based on the current tool and
     * selection. Three TransformControls instances exist but only the
     * active mode's helper is left visible — their handles would otherwise
     * collide at the proxy centre.
     */
    private refreshGizmoVisibility(): void {
        if ( !this.tcTranslate || !this.tcRotate || !this.tcScale ) return;
        const toolSupportsGizmo = this.currentTool === "select" || this.currentTool === "move";
        const hasSelection = this.selectedBlocks.length > 0;
        if ( toolSupportsGizmo && hasSelection ) {
            this.attachAllGizmos();
            this.updateSelectionVisuals();
        } else {
            for ( const [ mode, tc ] of [
                [ "translate", this.tcTranslate ] as const,
                [ "rotate", this.tcRotate ] as const,
                [ "scale", this.tcScale ] as const
            ] ) {
                if ( !tc ) continue;
                tc.detach();
                tc.enabled = false;
                const helper = this.tcHelpers.get( mode );
                if ( helper ) helper.visible = false;
            }
        }
        // Keep snaps in sync with snapToGrid + stepSize so the gizmo
        // honours the same toggle / step the user picked in the toolbar.
        this.updateGizmoSnaps();
    }

    /**
     * Handle window resize.
     */
    private onWindowResize(): void {
        const width = this.canvas.clientWidth || window.innerWidth;
        const height = this.canvas.clientHeight || window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    /**
     * Build a history lookup key for a block's world position.
     *     pos ( THREE.Vector3 ) - block position.
     * Returns key string.
     */
    private blockKey(pos: { x: number; y: number; z: number }): string {
        return `${pos.x},${pos.y},${pos.z}`;
    }

    /**
     * Find the placed block mesh at the position described by BlockData.
     *     data ( BlockData ) - block data identifying the position.
     * Returns mesh or undefined.
     */
    private getBlockAt(data: BlockData): THREE.Mesh | undefined {
        return this.blocks.get(this.blockKey(data.position));
    }

    /**
     * Apply a block's color, shape and name in one step, used by paint and
     * undo/redo so the look stays consistent. Caller is responsible for
     * ensuring the target is a Mesh — Groups must be descended into first.
     *     block ( THREE.Mesh ) - block to update.
     *     blockId ( number ) - minecraft block id.
     *     color ( string ) - material color.
     *     shape ( ShapeId ) - shape id.
     *     name ( string ) - block display name.
     */
    private updateBlock(block: THREE.Mesh, blockId: number, color: string, shape: ShapeId, name: string): void {
        this.applyBlockMaterial(block, blockId, color);
        this.applyBlockShape(block, shape);
        block.userData.blockName = name;
    }

    /**
     * Update the shared mouse NDC coordinates from a canvas mouse event.
     *     event ( MouseEvent ) - mouse event.
     */
    private updateMouseFromEvent(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    /**
     * Handle mouse down.
     *     event ( MouseEvent ) - mouse event.
     */
    private onMouseDown(event: MouseEvent): void {
        this.updateMouseFromEvent(event);

        const { blockIntersects, groundIntersects, gridIntersects } = this.getIntersections();

        let intersect: THREE.Intersection | null = null;
        if (blockIntersects.length > 0) {
            intersect = blockIntersects[0];
        } else if (gridIntersects.length > 0 && this.currentTool === "select") {
            intersect = gridIntersects[0];
        } else if (groundIntersects.length > 0) {
            intersect = groundIntersects[0];
        }

        if (intersect) {
            // Resolve the top-level selectable ancestor. If the hit object is
            // a Mesh inside a logged group, treat the group as the
            // selection target so moving / painting act on the whole group.
            const selectionTarget = this.resolveSelectionTarget( intersect.object );
            if (this.currentTool === "picker" && intersect.object instanceof THREE.Mesh && intersect.object.name === "block") {
                this.pickBlock(intersect.object);
            } else if (this.currentTool === "add" && intersect.object.name === "ground") {
                this.clearSelection();
                const point = intersect.point.clone();
                const x = Math.floor(point.x) + ( 1 / 2 );
                const y = this.snapToGrid ? ( 1 / 2 ) : point.y;
                const z = Math.floor(point.z) + ( 1 / 2 );
                this.toolMouseDownPos = new THREE.Vector2(this.mouse.x, this.mouse.y);
                this.pendingToolAction = { tool: "add", x, y, z };
            } else if (this.currentTool === "add" && intersect.object instanceof THREE.Mesh) {
                this.clearSelection();
                const center = intersect.object.position;
                const dx = intersect.point.x - center.x;
                const dy = intersect.point.y - center.y;
                const dz = intersect.point.z - center.z;
                const ax = Math.abs(dx), ay = Math.abs(dy), az = Math.abs(dz);
                let ox = 0, oy = 0, oz = 0;
                if (ax >= ay && ax >= az) ox = Math.sign(dx);
                else if (ay >= ax && ay >= az) oy = Math.sign(dy);
                else oz = Math.sign(dz);
                const pos = center.clone().add(new THREE.Vector3(ox, oy, oz));
                const x = Math.floor(pos.x) + ( 1 / 2 );
                const y = Math.floor(pos.y) + ( 1 / 2 );
                const z = Math.floor(pos.z) + ( 1 / 2 );
                this.toolMouseDownPos = new THREE.Vector2(this.mouse.x, this.mouse.y);
                this.pendingToolAction = { tool: "add", x, y, z };
            } else if (this.currentTool === "remove" && intersect.object instanceof THREE.Mesh && intersect.object.name === "block") {
                this.toolMouseDownPos = new THREE.Vector2(this.mouse.x, this.mouse.y);
                this.pendingToolAction = { tool: "remove", block: selectionTarget as THREE.Mesh };
            } else if (this.currentTool === "paint" && intersect.object instanceof THREE.Mesh && intersect.object.name === "block") {
                this.clearSelection();
                this.toolMouseDownPos = new THREE.Vector2(this.mouse.x, this.mouse.y);
                this.pendingToolAction = { tool: "paint", block: selectionTarget as THREE.Mesh };
            } else if (this.currentTool === "paint" && intersect.object.name === "ground") {
                // Don't allow painting on ground.
            } else if (this.currentTool === "rotate" && intersect.object instanceof THREE.Mesh && intersect.object.name === "block") {
                this.rotateBlock(selectionTarget as THREE.Mesh);
            } else if (this.currentTool === "select" && ( intersect.object.name === "block" || intersect.object.name === "ground" || intersect.object.name === "verticalGrid" ) ) {
                // Area select. Start selection from any surface ( ground or block face )
                this.selectStartPos = intersect.point.clone();
                this.selectEndPos = intersect.point.clone();
                this.isAreaSelecting = true;
                this.dragStartMouse = new THREE.Vector2( this.mouse.x, this.mouse.y );
                this.controls.enabled = false;
            } else if (this.currentTool === "move" && intersect.object instanceof THREE.Mesh && intersect.object.name === "block") {
                const clickedBlock = selectionTarget as THREE.Mesh;
                // Ctrl / Shift. Modify the selection without starting a drag.
                if ( event.ctrlKey || event.shiftKey ) {
                    if ( event.ctrlKey ) {
                        this.toggleSelectBlock( clickedBlock );
                    } else {
                        this.addSelectBlock( clickedBlock );
                    }
                    return;
                }
                // If the clicked block is already in the selection, keep all
                // selected blocks and move them together. Otherwise, select
                // only the clicked block.
                if ( this.selectedBlocks.includes( clickedBlock ) && this.selectedBlocks.length > 1 ) {
                    this.dragStartPositions.clear();
                    for ( const block of this.selectedBlocks ) {
                        this.dragStartPositions.set( block.uuid, block.position.clone() );
                    }
                } else {
                    this.clearSelection();
                    this.selectBlock( clickedBlock );
                    this.dragStartPositions.clear();
                    this.dragStartPositions.set( clickedBlock.uuid, clickedBlock.position.clone() );
                }
                this.dragStartMouse = new THREE.Vector2(this.mouse.x, this.mouse.y);
                this.dragStartPosition.copy(clickedBlock.position);
                this.dragOffset.copy(clickedBlock.position).sub(intersect.point);
                // Build a screen-aligned drag plane perpendicular to the
                // current camera forward vector and passing through the
                // click point. Subsequent mousemoves raycast against this
                // plane so the block stays glued to the cursor ( POV-based
                // drag ), instead of sliding along the world ground plane
                // as it did before. The plane is dropped when the move
                // tool exits so other tools keep their old behaviour.
                const camNormal = this.camera.getWorldDirection( new THREE.Vector3() ).negate();
                this.dragPlane = new THREE.Plane().setFromNormalAndCoplanarPoint( camNormal, intersect.point );
                this.dragStarted = false;
                this.controls.enabled = false;
            } else if (this.currentTool === "move" && intersect.object.name === "ground") {
                this.clearSelection();
            }
        } else {
            if (this.currentTool === "select" || this.currentTool === "move") {
                this.clearSelection();
            }
        }
    }

    /**
     * Handle mouse move.
     *     event ( MouseEvent ) - mouse event.
     */
    private onMouseMove(event: MouseEvent): void {
        this.updateMouseFromEvent(event);

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Check drag threshold — don't start dragging until the mouse moves
        // at least 4px so a simple click-to-select doesn't trigger a move.
        if ( this.selectedBlocks.length > 0 && !this.isDragging && this.dragStartMouse ) {
            const dx = this.mouse.x - this.dragStartMouse.x;
            const dy = this.mouse.y - this.dragStartMouse.y;
            const cw = this.canvas.clientWidth || window.innerWidth;
            const ch = this.canvas.clientHeight || window.innerHeight;
            const pxDist = Math.sqrt((dx * cw / 2) ** 2 + (dy * ch / 2) ** 2);
            if (pxDist > 4) {
                this.isDragging = true;
                this.dragStarted = true;
            }
        }

        if (this.isDragging && this.selectedBlocks.length > 0) {
            // Drag all selected blocks together. We cast against the ground
            // AND every non-selected block, then pick the closest hit. If the
            // closest hit is a block, snap to the adjacent cell on the
            // outside of the hit face so the dragged block can land on top
            // of, beside, or beneath existing walls and structures — not
            // just on the ground plane.
            const point = this.computeBlockAwareDragPoint();
            if (point) {
                if (this.snapToGrid) {
                    point.x = Math.floor(point.x) + ( 1 / 2 );
                    point.y = Math.max(( 1 / 2 ), Math.floor(point.y) + ( 1 / 2 ));
                    point.z = Math.floor(point.z) + ( 1 / 2 );
                }
                // Compute the delta from the clicked block's original start position
                const deltaX = point.x - this.dragStartPosition.x;
                const deltaY = point.y - this.dragStartPosition.y;
                const deltaZ = point.z - this.dragStartPosition.z;
                // Apply the same delta to all selected blocks
                for ( const block of this.selectedBlocks ) {
                    const start = this.dragStartPositions.get( block.uuid );
                    if ( start ) {
                        block.position.set(
                            start.x + deltaX,
                            start.y + deltaY,
                            start.z + deltaZ
                        );
                    }
                }
                this.updateCursorPosition( point );
            }
        } else if (this.isAreaSelecting && this.selectStartPos) {
            // Area select in progress. Track end pos from nearest surface
            const { blockIntersects, groundIntersects, gridIntersects } = this.getIntersections();
            if ( blockIntersects.length > 0 ) {
                this.selectEndPos = blockIntersects[0].point.clone();
                this.showSelectRect( this.selectStartPos, this.selectEndPos );
            } else if ( gridIntersects.length > 0 ) {
                this.selectEndPos = gridIntersects[0].point.clone();
                this.showSelectRect( this.selectStartPos, this.selectEndPos );
            } else if ( groundIntersects.length > 0 ) {
                this.selectEndPos = groundIntersects[0].point.clone();
                this.showSelectRect( this.selectStartPos, this.selectEndPos );
            }
        } else if ( this.pendingToolAction && this.toolMouseDownPos ) {
            // Check if mouse moved beyond threshold — if so, clear pending action ( user is dragging )
            const dx = this.mouse.x - this.toolMouseDownPos.x;
            const dy = this.mouse.y - this.toolMouseDownPos.y;
            const cw = this.canvas.clientWidth || window.innerWidth;
            const ch = this.canvas.clientHeight || window.innerHeight;
            const pxDist = Math.sqrt((dx * cw / 2) ** 2 + (dy * ch / 2) ** 2);
            if ( pxDist > 4 ) {
                this.pendingToolAction = null;
                this.toolMouseDownPos = null;
            }
        }

        if ( !this.pendingToolAction ) {
            if ( this.currentTool === "add" || this.currentTool === "paint" || this.currentTool === "remove" ) {
                // For placement tools. Check blocks first, then always project onto grid plane
                const { blockIntersects } = this.getIntersections();
                if ( blockIntersects.length > 0 ) {
                    this.updateCursorPosition( blockIntersects[0].point );
                    this.updateHoverBox( blockIntersects[0].point, this.currentTool, blockIntersects[0].object );
                } else {
                    // Project onto y=0 plane (grid surface level)
                    const groundPoint = new THREE.Vector3();
                    const groundPlane = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 );
                    if ( this.raycaster.ray.intersectPlane( groundPlane, groundPoint ) !== null ) {
                        this.updateCursorPosition( groundPoint );
                        this.updateHoverBox( groundPoint, this.currentTool, undefined );
                    } else {
                        this.hoverBox.visible = false;
                    }
                }
            } else {
                const { blockIntersects, groundIntersects } = this.getIntersections();
                if ( blockIntersects.length > 0 ) {
                    this.updateCursorPosition( blockIntersects[0].point );
                    this.updateHoverBox( blockIntersects[0].point, this.currentTool, blockIntersects[0].object );
                } else if ( groundIntersects.length > 0 ) {
                    this.updateCursorPosition( groundIntersects[0].point );
                    this.updateHoverBox( blockIntersects[0].point, this.currentTool, groundIntersects[0].object );
                } else {
                    this.hoverBox.visible = false;
                }
            }
        }
    }

    /**
     * Raycast the pointer against the placed blocks and the ground, returning
     * both intersection lists.
     * Groups stored in `this.blocks` are flattened to their child Meshes so
     * that blocks inside a group remain raycastable ( Groups have no
     * geometry themselves ).
     * Returns block and ground intersections.
     */
    /**
     * Walk up the parent chain from the hit object to the first ancestor
     * that qualifies as a logical selectable unit ( a registered group or
     * the root block map entry ). Falls back to the original object if no
     * such ancestor exists.
     *     hitObject ( THREE.Object3D ) - raycaster intersection target.
     * Returns the selectable ancestor.
     */
    private resolveSelectionTarget( hitObject: THREE.Object3D ): THREE.Object3D {
        let current: THREE.Object3D | null = hitObject;
        while ( current && current !== this.scene ) {
            if ( current instanceof THREE.Group && current.userData.groupId !== undefined ) {
                return current;
            }
            const key = this.blockKey( current.position );
            if ( current !== hitObject && this.blocks.has( key ) ) {
                return current;
            }
            current = current.parent;
        }
        return hitObject;
    }

    private getIntersections(): { blockIntersects: THREE.Intersection[]; groundIntersects: THREE.Intersection[]; gridIntersects: THREE.Intersection[] } {
        const blockMeshes: THREE.Object3D[] = [];
        for ( const entry of this.blocks.values() ) {
            if ( entry instanceof THREE.Group ) {
                for ( const child of entry.children ) {
                    blockMeshes.push( child );
                }
            } else {
                blockMeshes.push( entry );
            }
        }
        const ground = this.scene.getObjectByName("ground")!;
        const vg = this.scene.getObjectByName( "verticalGrid" );
        return {
            blockIntersects: this.raycaster.intersectObjects(blockMeshes, false),
            groundIntersects: this.raycaster.intersectObjects([ground]),
            gridIntersects: vg ? this.raycaster.intersectObjects( [vg] ) : []
        };
    }

    /**
     * Snap a world-space coordinate to the nearest sub-cell position. The
     * step size divides each grid cell into `stepSize` subdivisions so the
     * builder can place micro-blocks at quarter / eighth precision without
     * re-architecting the world map.
     *     value ( number ) - world-space coordinate.
     * Returns snapped value.
     */
    private applySnap( value: number ): number {
        const step = Math.max( 0o1, this.stepSize );
        return Math.round( value * step ) / step;
    }

    /**
     * Compute the target drag position for the move tool. The pointer is
     * cast against the ground and every non-selected block; the nearest hit
     * wins. When a block is hit, we snap the dragged blocks to the cell
     * directly outside the hit face ( top, side, or bottom ) so vertical
     * walls become stackable targets just like the ground. When nothing is
     * hit, we fall back to the legacy ground-plane projection with the
     * click-point offset so single-block moves still feel identical to
     * before this upgrade.
     * Returns drag target world position or null if the ray missed
     * everything in the workspace.
     */
    private computeBlockAwareDragPoint(): THREE.Vector3 | null {
        // Prefer the camera-aligned drag plane ( move tool ) so the block
        // rides with the cursor instead of sliding along the world ground.
        if ( this.dragPlane ) {
            const projected = new THREE.Vector3();
            const hit = this.raycaster.ray.intersectPlane( this.dragPlane, projected );
            if ( hit ) {
                return projected.clone().add( this.dragOffset );
            }
        }
        // Collect every non-selected block mesh so the raycast cannot hit
        // the very blocks we are dragging. Groups are flattened to their
        // child meshes using the same convention as getIntersections so
        // grouped blocks also act as snap anchors.
        const snapTargets: THREE.Object3D[] = [];
        for ( const entry of this.blocks.values() ) {
            if ( this.selectedBlocks.includes( entry as THREE.Mesh ) ) continue;
            if ( entry instanceof THREE.Group ) {
                for ( const child of entry.children ) {
                    if ( child instanceof THREE.Object3D ) {
                        snapTargets.push( child );
                    }
                }
            } else {
                snapTargets.push( entry );
            }
        }
        const groundMesh = this.scene.getObjectByName( "ground" );

        const blockHits = this.raycaster.intersectObjects( snapTargets, false );
        const groundHits = groundMesh
            ? this.raycaster.intersectObjects( [groundMesh] )
            : [];

        // Pick the closest hit so when the cursor straddles a wall and the
        // ground, the user gets the wall ( which is usually what they want
        // while editing a structure ).
        let bestBlock: THREE.Intersection | null = null;
        for ( const hit of blockHits ) {
            if ( !bestBlock || hit.distance < bestBlock.distance ) {
                bestBlock = hit;
            }
        }
        let bestGround: THREE.Intersection | null = null;
        for ( const hit of groundHits ) {
            if ( !bestGround || hit.distance < bestGround.distance ) {
                bestGround = hit;
            }
        }

        if ( bestBlock && ( !bestGround || bestBlock.distance < bestGround.distance ) ) {
            return this.faceSnapPoint( bestBlock );
        }
        if ( bestGround ) {
            return bestGround.point.clone().add( this.dragOffset );
        }
        // Fallback to the world y=0 plane when even the ground missed, so
        // dragging near the horizon still produces a usable delta.
        const groundPlane = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 );
        const projected = new THREE.Vector3();
        if ( this.raycaster.ray.intersectPlane( groundPlane, projected ) !== null ) {
            return projected.add( this.dragOffset );
        }
        return null;
    }

    /**
     * Convert a raycaster block-face hit into the world position of the
     * adjacent cell on the outside of that face. The face normal describes
     * which side of the block the ray pierced, so we step one block outward
     * along it to find the cell the dragged object will occupy. Faces are
     * resolved in world space so rotated blocks still produce axis-aligned
     * snap anchors in the common case.
     *     hit ( THREE.Intersection ) - first block hit from the raycaster.
     * Returns cell-centre position suitable for grid snapping.
     */
    private faceSnapPoint( hit: THREE.Intersection ): THREE.Vector3 {
        const blockCenter = new THREE.Vector3();
        hit.object.getWorldPosition( blockCenter );
        if ( !hit.face ) {
            return blockCenter;
        }
        const worldNormal = new THREE.Vector3()
            .copy( hit.face.normal )
            .transformDirection( hit.object.matrixWorld );
        // Round to the nearest cardinal axis so non-axis-aligned geometries
        // ( cylinders, wedges ) still snap to a regular grid cell rather
        // than landing mid-air.
        worldNormal.x = Math.round( worldNormal.x );
        worldNormal.y = Math.round( worldNormal.y );
        worldNormal.z = Math.round( worldNormal.z );
        // Walk one full block outward from the hit block's centre along the
        // face normal. This produces the cell the dragged blocks should
        // occupy regardless of which face was pierced.
        return blockCenter.clone().add( worldNormal );
    }

    /**
     * Whether a ( snapped ) cell center is inside the editable grid bounds.
     *     x ( number ) - x coordinate.
     *     y ( number ) - y coordinate.
     *     z ( number ) - z coordinate.
     * Returns boolean.
     */
    private isWithinGrid(x: number, y: number, z: number): boolean {
        const half = this.gridSize / 2;
        const cx = worldToGrid(x);
        const cy = worldToGrid(y);
        const cz = worldToGrid(z);
        return cx >= -half && cx < half && cz >= -half && cz < half && cy >= 0 && cy < this.gridSize;
    }

    /**
     * Rebuild the hover preview geometry to match the current shape, so the
     * preview shows the correct form and which side it occupies.
     */
    private refreshHoverGeometry(): void {
        const shape = this.getCurrentShape();
        const fill = this.hoverBox.children[0] as THREE.Mesh;
        const wire = this.hoverBox.children[1] as THREE.LineSegments;
        fill.geometry.dispose();
        wire.geometry.dispose();
        fill.geometry = buildShapeGeometry(shape);
        wire.geometry = new THREE.EdgesGeometry(buildShapeGeometry(shape));
    }

    /**
     * Show or hide the cursor-following hover preview at the snapped cell.
     *     point ( THREE.Vector3 ) - raw intersection point.
     *     tool ( string ) - name of the active tool.
     */
    private updateHoverBox(point: THREE.Vector3, tool: string, hitObject?: THREE.Object3D): void {
        if ( tool === "select" || tool === "move" ) {
            // Show hover outline on the block itself
            if ( hitObject && hitObject.name === "block" ) {
                const mesh = hitObject as THREE.Mesh;
                this.refreshHoverGeometry();
                this.hoverBox.position.copy( mesh.position );
                this.hoverBox.visible = true;
            } else {
                this.hoverBox.visible = false;
            }
            return;
        }

        const show = tool === "add" || tool === "paint" || tool === "remove";
        if ( !show ) {
            this.hoverBox.visible = false;
            return;
        }

        // Update hover material colors based on tool
        const fillMesh = this.hoverBox.children[0] as THREE.Mesh;
        const fillMat = fillMesh.material as THREE.MeshBasicMaterial;
        if ( tool === "remove" ) {
            fillMat.color.setHex( 0xf82828 );
        } else {
            fillMat.color.setHex( 0x888888 );
        }

        let x: number, y: number, z: number;

        if ( tool === "remove" && hitObject && hitObject.name === "block" ) {
            // Remove tool. Show hover on the block itself
            const mesh = hitObject as THREE.Mesh;
            x = mesh.position.x;
            y = mesh.position.y;
            z = mesh.position.z;
        } else if ( hitObject && hitObject.name === "block" ) {
            const mesh = hitObject as THREE.Mesh;
            if ( tool === "add" ) {
                // Hovering over a block with add tool. Snap to adjacent grid cell
                const center = mesh.position;
                const dx = point.x - center.x;
                const dy = point.y - center.y;
                const dz = point.z - center.z;
                const ax = Math.abs( dx ), ay = Math.abs( dy ), az = Math.abs( dz );
                let ox = 0, oy = 0, oz = 0;
                if ( ax >= ay && ax >= az ) ox = Math.sign( dx );
                else if ( ay >= ax && ay >= az ) oy = Math.sign( dy );
                else oz = Math.sign( dz );
                const pos = center.clone().add( new THREE.Vector3( ox, oy, oz ) );
                x = Math.floor( pos.x ) + ( 1 / 2 );
                y = Math.floor( pos.y ) + ( 1 / 2 );
                z = Math.floor( pos.z ) + ( 1 / 2 );
            } else {
                // Paint tool. Show hover on the block itself
                x = mesh.position.x;
                y = mesh.position.y;
                z = mesh.position.z;
            }
        } else {
            // Hovering over ground. Snap to sub-grid ( step size ) so the
            // user sees the chosen subdivision precision in the preview.
            x = this.applySnap( point.x );
            y = tool === "paint" ? point.y : ( this.snapToGrid ? ( 1 / 2 ) : point.y );
            z = this.applySnap( point.z );
        }

        // When hovering for add tool, apply pending rotation to hover preview
        if ( tool === "add" && this.pendingRotation !== 0 ) {
            this.hoverBox.rotation.y = this.pendingRotation;
        } else {
            this.hoverBox.rotation.y = 0;
        }

        if ( !this.isWithinGrid( x, y, z ) ) {
            this.hoverBox.visible = false;
            return;
        }

        this.refreshHoverGeometry();
        this.updateHoverShapeLabel();
        this.hoverBox.position.set( x, y, z );
        this.hoverBox.visible = true;
    }

    /**
     * Update the on-screen label describing the shape that will be placed.
     */
    private updateHoverShapeLabel(): void {
        const el = document.getElementById("hoverShapeLabel");
        if (el) {
            el.textContent = this.getCurrentShapeName();
        }
    }

    /**
     * Handle mouse up.
     */
    private onMouseUp(event?: MouseEvent): void {
        // Always drop the camera-aligned drag plane at the end of a move-
        // tool drag. If we leave it alive, the next drag ( or even just the
        // user waving the cursor ) will raycast against a plane that no
        // longer matches the click point and the block will jump to the
        // wrong cell on the first mousemove.
        this.dragPlane = null;
        if (this.isAreaSelecting && this.selectStartPos) {
            // Check if mouse barely moved — treat as click-to-select on the
            // intersected object rather than a drag-area-select.
            const startMouse = this.dragStartMouse;
            const dx = startMouse ? this.mouse.x - startMouse.x : 0;
            const dy = startMouse ? this.mouse.y - startMouse.y : 0;
            const cw = this.canvas.clientWidth || window.innerWidth;
            const ch = this.canvas.clientHeight || window.innerHeight;
            const pxDist = Math.sqrt((dx * cw / 2) ** 2 + (dy * ch / 2) ** 2);
            const isClick = pxDist < 4;

            if ( isClick ) {
                // Simple click: select the block under the cursor ( if any ).
                // Resolve the hit to its enclosing group so clicking inside a
                // composite selects the whole group, consistent with the
                // non-select tools.
                const { blockIntersects } = this.getIntersections();
                if ( blockIntersects.length > 0 && blockIntersects[0].object.name === "block" ) {
                    const block = this.resolveSelectionTarget( blockIntersects[0].object ) as THREE.Mesh;
                    if ( event && event.ctrlKey ) {
                        this.toggleSelectBlock( block );
                    } else if ( event && event.shiftKey ) {
                        this.addSelectBlock( block );
                    } else {
                        this.clearSelection();
                        this.selectBlock( block );
                    }
                } else {
                    this.clearSelection();
                }
            } else {
                // Drag: finalize area selection.
                const endPos = this.selectEndPos;
                const start = this.selectStartPos;
                if ( endPos ) {
                    const minX = Math.min( start.x, endPos.x );
                    const maxX = Math.max( start.x, endPos.x );
                    const minZ = Math.min( start.z, endPos.z );
                    const maxZ = Math.max( start.z, endPos.z );
                    // When start or end is on a block face ( not ground ),
                    // use the y-range from start to end to select a vertical
                    // slice. Otherwise ( both on ground ), select the full
                    // column at all heights.
                    const onGround = ( obj: THREE.Vector3 ): boolean =>
                        Math.abs( obj.y - ( 1 / 0o100 ) ) < 0.1 || Math.abs( obj.y + ( 1 / 0o100 ) ) < 0.1;
                    const bothOnGround = onGround( start ) && onGround( endPos );
                    const minY = bothOnGround ? -Infinity : Math.min( start.y, endPos.y );
                    const maxY = bothOnGround ? Infinity : Math.max( start.y, endPos.y );

                    this.clearSelection();
                    for ( const block of this.blocks.values() ) {
                        const p = block.position;
                        if (
                            p.x >= minX && p.x <= maxX &&
                            p.z >= minZ && p.z <= maxZ &&
                            p.y >= minY && p.y <= maxY
                        ) {
                            this.selectedBlocks.push( block );
                        }
                    }
                    this.updateSelectionVisuals();
                }
            }
            this.hideSelectRect();
            this.isAreaSelecting = false;
            this.selectStartPos = null;
            this.selectEndPos = null;
            this.dragStartMouse = null;
            if ( !this.isColorInputFocused() ) this.controls.enabled = true;
            return;
        }

        if (this.isDragging && this.selectedBlocks.length > 0 && this.dragStarted) {
            const block = this.selectedBlocks[0];
            const pos = block.position;
            const oldPos = this.dragStartPosition;
            const newPos = { x: pos.x, y: pos.y, z: pos.z };

            // Only record a move when the block actually changed position.
            const moved = Math.abs(oldPos.x - newPos.x) > 0.01
                || Math.abs(oldPos.y - newPos.y) > 0.01
                || Math.abs(oldPos.z - newPos.z) > 0.01;
            if (moved) {
                this.addToHistory("move", this.readBlockData(block), {
                    position: { x: oldPos.x, y: oldPos.y, z: oldPos.z },
                    color: this.getBlockColor(block),
                    id: this.blockKey(oldPos),
                    blockId: block.userData.blockId as number,
                    name: block.userData.blockName as string,
                    shape: block.userData.shape as ShapeId,
                    rotation: block.userData.rotation as number
                });
            }
        }
        // Execute pending tool action if not a drag
        if ( this.pendingToolAction && this.toolMouseDownPos ) {
            const dx = this.mouse.x - this.toolMouseDownPos.x;
            const dy = this.mouse.y - this.toolMouseDownPos.y;
            const cw = this.canvas.clientWidth || window.innerWidth;
            const ch = this.canvas.clientHeight || window.innerHeight;
            const pxDist = Math.sqrt((dx * cw / 2) ** 2 + (dy * ch / 2) ** 2);
            if ( pxDist < 4 ) {
                const action = this.pendingToolAction;
                if ( action.tool === "add" && action.x !== undefined && action.y !== undefined && action.z !== undefined ) {
                    this.addBlock( action.x, action.y, action.z );
                } else if ( action.tool === "remove" && action.block ) {
                    this.removeBlock( action.block );
                } else if ( action.tool === "paint" && action.block ) {
                    this.paintBlock( action.block );
                }
            }
            this.pendingToolAction = null;
            this.toolMouseDownPos = null;
        }

        if ( this.selectionBox ) {
            this.selectionBox.visible = false;
        }
        this.dragStartPositions.clear();
        this.isDragging = false;
        this.dragStarted = false;
        this.dragStartMouse = null;
        if ( !this.isColorInputFocused() ) this.controls.enabled = true;
    }

    /**
     * Handle keyboard events.
     *     event ( KeyboardEvent ) - keyboard event.
     */
    private onKeyDown(event: KeyboardEvent): void {
        if (event.ctrlKey || event.metaKey) {
            if (event.key === "z") {
                event.preventDefault();
                if (event.shiftKey) {
                    this.redo();
                } else {
                    this.undo();
                }
            } else if (event.key === "y") {
                event.preventDefault();
                this.redo();
            }
        } else if (event.key === "Delete" || event.key === "Backspace") {
            if (this.selectedBlocks.length > 0) {
                // Remove all selected blocks
                const toRemove = [ ...this.selectedBlocks ];
                this.clearSelection();
                for ( const block of toRemove ) {
                    this.removeBlock(block);
                }
            }
        } else if (event.key === "Escape") {
            event.preventDefault();
            this.clearSelection();
        }        else if (event.key === "1") this.setTool("select");
        else if (event.key === "2") this.setTool("move");
        else if (event.key === "3") this.setTool("add");
        else if (event.key === "4") this.setTool("remove");
        else if (event.key === "5") this.setTool("paint");
        else if (event.key === "6") this.setTool("picker");
        else if (event.key === "7") this.setTool("rotate");
        else if ( event.key === "r" || event.key === "R" ) {
            // R spins the next-placed block (add tool) — all three gizmo
            // handles (translate / rotate / scale) are always visible in
            // select / move tools, so R no longer switches modes.
            if ( this.currentTool === "add" ) {
                event.preventDefault();
                this.pendingRotation = ( this.pendingRotation + Math.PI / 2 ) % ( Math.PI * 2 );
                this.refreshHoverGeometry();
            }
        }

        // WASD / arrow keys for camera movement — skip when focus is on an
        // interactive element so the user can still type in inputs.
        const tag = document.activeElement?.tagName?.toLowerCase();
        if ( !tag || tag === "body" || !["input","textarea","select","button"].includes( tag ) ) {
            const key = event.key.toLowerCase();
            if ( key === "w" || key === "a" || key === "s" || key === "d" ||
                 key === "arrowup" || key === "arrowdown" || key === "arrowleft" || key === "arrowright" ||
                 key === " " || key === "shift" || key === "q" || key === "e" ) {
                event.preventDefault();
                this.keysPressed.add( key );
            }
        }
    }

    /**
     * Handle key up — remove released key from the pressed set.
     *     event ( KeyboardEvent ) - keyboard event.
     */
    private onKeyUp(event: KeyboardEvent): void {
        const key = event.key.toLowerCase();
        this.keysPressed.delete( key );
    }

    /**
     * Create a block with the current shape and border edges.
     *     block ( MinecraftBlock ) - block definition.
     *     color ( string ) - color override.
     *     shape ( ShapeId ) - shape id.
     *     x ( number ) - x coordinate.
     *     y ( number ) - y coordinate.
     *     z ( number ) - z coordinate.
     * Returns Mesh.
     */
    private createBlock(block: MinecraftBlock, color: string, shape: ShapeId, x: number, y: number, z: number, rotation: number = 0): THREE.Mesh {
        const materialOptions: THREE.MeshLambertMaterialParameters = { color };
        const material = new THREE.MeshLambertMaterial(materialOptions);
        const geometry = buildShapeGeometry(shape);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.name = "block";
        mesh.userData.blockId = block.id;
        mesh.userData.blockName = block.name;
        mesh.userData.shape = shape;
        const edges = new THREE.LineSegments(this.borderGeometry, this.borderMaterial);
        mesh.add(edges);
        mesh.rotation.y = (rotation as number) ?? 0;
        mesh.userData.rotation = (rotation as number) ?? 0;
        return mesh;
    }

    /**
     * Add block at position.
     *     x ( number ) - x coordinate.
     *     y ( number ) - y coordinate.
     *     z ( number ) - z coordinate.
     */
    private addBlock(x: number, y: number, z: number): void {
        if (this.snapToGrid) {
            x = Math.floor( x ) + ( 1 / 2 );
            y = Math.floor( y ) + ( 1 / 2 );
            z = Math.floor( z ) + ( 1 / 2 );
        }
        if (!this.isWithinGrid(x, y, z)) return;

        const key = this.blockKey({ x, y, z });
        if (this.blocks.has(key)) return;

        const color = this.getEffectiveColor();
        const shape = this.getCurrentShape();
        const rotation = this.pendingRotation;
        const block = this.createBlock(this.currentBlock, color, shape, x, y, z, rotation);

        this.scene.add(block);
        this.blocks.set(key, block);

        this.addToHistory("add", { position: { x, y, z }, color, id: key, blockId: this.currentBlock.id, name: this.currentBlock.name, shape, rotation }, null);
        this.updateBlockCount();
    }

    /**
     * Remove block.
     *     block ( THREE.Mesh ) - block to remove.
     */
    private removeBlock(block: THREE.Mesh): void {
        const key = this.blockKey(block.position);
        const data = this.readBlockData(block);

        this.scene.remove(block);
        this.blocks.delete(key);

        if (block instanceof THREE.Group) {
            for (const child of block.children) {
                // Only meshes carry geometry — guard so TS keeps the
                // narrower Mesh overload.
                if (child instanceof THREE.Mesh) {
                    child.geometry?.dispose();
                }
            }
            block.clear();
            (block as THREE.Group).userData;
            this.groups.delete(String(block.userData.groupId));
        }

        const idx = this.selectedBlocks.indexOf(block);
        if (idx !== -1) {
            this.selectedBlocks.splice(idx, 1);
            this.updateSelectionVisuals();
        }

        this.addToHistory("remove", null, data);
        this.updateBlockCount();
    }

    /**
     * Rotate a block 90° around the vertical ( Y ) axis.
     *     block ( THREE.Mesh ) - block to rotate.
     */
    private rotateBlock(block: THREE.Mesh): void {
        const previous = this.readBlockData(block);
        const rotation = (block.userData.rotation ?? 0) + Math.PI / 2;
        block.rotation.y = rotation;
        block.userData.rotation = rotation;

        const data = this.readBlockData(block);
        this.addToHistory("rotate", data, previous);
    }

    /**
     * Paint block with current color.
     *     block ( THREE.Mesh ) - block to paint.
     */
    private paintBlock(block: THREE.Mesh): void {
        // Groups can be painted too — descend into their children so the
        // entire composite takes the new color without losing per-block
        // identity.
        if ( block instanceof THREE.Group ) {
            const previous = this.getSelectedSnapshots();
            const color = this.getEffectiveColor();
            for ( const child of block.children ) {
                if ( child instanceof THREE.Mesh ) {
                    this.updateBlock( child, this.currentBlock.id, color, this.getCurrentShape(), this.currentBlock.name );
                }
            }
            this.addToHistory( "paint-group", {
                position: { x: block.position.x, y: block.position.y, z: block.position.z },
                color,
                id: this.blockKey( block.position ),
                blockId: this.currentBlock.id,
                name: this.currentBlock.name,
                shape: this.getCurrentShape(),
                rotation: block.userData.rotation ?? 0
            }, previous );
            return;
        }
        const previous = this.readBlockData(block);
        const color = this.getEffectiveColor();
        const shape = this.getCurrentShape();
        this.updateBlock(block, this.currentBlock.id, color, shape, this.currentBlock.name);

        const key = this.blockKey(block.position);

        this.addToHistory("paint", { position: { x: block.position.x, y: block.position.y, z: block.position.z }, color, id: key, blockId: this.currentBlock.id, name: this.currentBlock.name, shape, rotation: previous.rotation }, previous);
    }

    /**
     * Pick color and block from an existing block, copying its properties to
     * the current selection.
     *     block ( THREE.Mesh ) - block to pick from.
     */
    private pickBlock(block: THREE.Mesh): void {
        const material = block.material as THREE.MeshLambertMaterial;
        const color = "#" + material.color.getHexString();
        const data = this.readBlockData(block);

        const found = MINECRAFT_BLOCKS.find((b) => b.id === data.blockId);
        this.currentBlock = found ?? { id: data.blockId, name: data.name, color };
        this.currentColor = color;
        this.currentShape = data.shape;

        this.syncBlockInputs(data.blockId, color);
        this.updateShapeButtons();
        this.updateSelectedBlockInfo();
        if (typeof window.alert === "function") {
            window.alert(`Picked ${data.name} ( ${color} )`);
        }
    }

    /**
     * Select block.
     *     block ( THREE.Mesh ) - block to select.
     */
    private selectBlock(block: THREE.Mesh): void {
        this.selectedBlocks = [ block ];
        this.updateSelectionVisuals();
        this.updatePropertiesPanel();
        this.attachAllGizmos();
    }

    /**
     * Toggle a block in the current selection — if already selected, remove
     * it; otherwise add it.
     *     block ( THREE.Mesh ) - block to toggle.
     */
    private toggleSelectBlock(block: THREE.Mesh): void {
        const idx = this.selectedBlocks.indexOf( block );
        if ( idx !== -1 ) {
            this.selectedBlocks.splice( idx, 1 );
        } else {
            this.selectedBlocks.push( block );
        }
        this.updateSelectionVisuals();
        this.updatePropertiesPanel();
        this.attachAllGizmos();
    }

    /**
     * Add a block to the current selection without clearing it.
     *     block ( THREE.Mesh ) - block to add.
     */
    private addSelectBlock(block: THREE.Mesh): void {
        if ( !this.selectedBlocks.includes( block ) ) {
            this.selectedBlocks.push( block );
            this.updateSelectionVisuals();
            this.updatePropertiesPanel();
            this.attachAllGizmos();
        }
    }

    /**
     * Wire up the properties-panel inputs so typing into them commits an
     * `property-edit` history entry through `applyPropertyEdit`. Bound
     * from setupUI once the panel exists in the DOM.
     */
    private bindPropertiesPanel(): void {
        const fields: Array<{ id: string; field: string }> = [
            { id: "propPosX", field: "pos.x" },
            { id: "propPosY", field: "pos.y" },
            { id: "propPosZ", field: "pos.z" },
            { id: "propRot", field: "rot" }
        ];
        for ( const { id, field } of fields ) {
            const input = this.el<HTMLInputElement>( id );
            if ( !input ) continue;
            const commit = (): void => {
                this.applyPropertyEdit( field, input.value );
            };
            input.addEventListener( "change", commit );
            input.addEventListener( "blur", commit );
        }
    }

    /**
     * Rebuild the selection wireframe visuals for all selected blocks.
     * Also keeps the gizmo proxy anchored to the selection's bounding-box
     * centre so the user can grab a 3D handle and translate / rotate the
     * whole selection as one unit.
     */
    private updateSelectionVisuals(): void {
        // Clear old visuals
        while ( this.selectionGroup.children.length > 0 ) {
            const child = this.selectionGroup.children[0];
            this.selectionGroup.remove(child);
            if ( child instanceof THREE.LineSegments ) {
                child.geometry.dispose();
            }
        }
        // Per-block outline (helps users see which exact blocks are selected).
        for ( const block of this.selectedBlocks ) {
            const box = new THREE.LineSegments(
                new THREE.EdgesGeometry( new THREE.BoxGeometry(( 1 + ( 1 / 0o100 ) ), ( 1 + ( 1 / 0o100 ) ), ( 1 + ( 1 / 0o100 ) ) ) ),
                new THREE.LineBasicMaterial({ color: "#FFFFFF", linewidth: 0o10 })
            );
            box.position.copy( block.position );
            this.selectionGroup.add( box );
        }
        // Aggregate bounding box around the entire selection so users see a
        // single region outline in addition to the per-block outlines.
        if ( this.selectionBounds ) {
            this.scene.remove( this.selectionBounds );
            this.selectionBounds.geometry.dispose();
            this.selectionBounds = null;
        }
        if ( this.selectedBlocks.length > 0 ) {
            const box = new THREE.Box3();
            for ( const block of this.selectedBlocks ) {
                // Force a world-matrix update so Box3 reads accurate
                // positions for blocks that still live inside a freshly
                // created Group ( their world transforms are stale until
                // updateMatrixWorld runs ).
                block.updateMatrixWorld( true );
                box.expandByObject( block );
            }
            const size = new THREE.Vector3();
            const center = new THREE.Vector3();
            box.getSize( size );
            box.getCenter( center );
            const outlineGeometry = new THREE.EdgesGeometry(
                new THREE.BoxGeometry( size.x + ( 1 / 0o100 ), size.y + ( 1 / 0o100 ), size.z + ( 1 / 0o100 ) )
            );
            const outlineMaterial = new THREE.LineBasicMaterial({ color: "#f8d848", transparent: true, opacity: ( 6 / 8 ) });
            this.selectionBounds = new THREE.LineSegments( outlineGeometry, outlineMaterial );
            this.selectionBounds.position.copy( center );
            this.scene.add( this.selectionBounds );

            // Re-anchor the gizmo proxy at the selection centre so the 3D
            // handles stay visually locked to whatever the user has
            // selected. Reset rotation because the next drag will compute a
            // fresh delta from zero.
            //
            // CRITICAL. Only re-anchor between drags — never while a drag is
            // in flight. The user pulls a handle, the proxy position is
            // touched, and our live handler projects that onto the selected
            // blocks. If we re-anchored mid-drag the proxy would teleport
            // back to the moved blocks' centroid every frame and cancel the
            // very motion the user just requested.
            if ( this.selectionProxy && !this.gizmoDragging ) {
                this.selectionProxy.position.copy( center );
                this.selectionProxy.quaternion.set( 0, 0, 0, 1 );
                // Re-attach ALL three TCs so the proxy position update is
                // reflected in every helper.  The old code only iterated
                // translate + rotate, which left the scale helper frozen
                // at the previous centre until the next drag.
                for ( const tc of [ this.tcTranslate, this.tcRotate, this.tcScale ] ) {
                    if ( tc && tc.enabled ) tc.attach( this.selectionProxy );
                }
            }
        }
    }

    /**
     * Clear selection.
     */
    private clearSelection(): void {
        // Drop the screen-space drag plane so a stale plane from a prior
        // move-tool drag cannot hijack the next raycast.
        this.dragPlane = null;
        this.selectedBlocks = [];
        if ( this.selectionBounds ) {
            this.scene.remove( this.selectionBounds );
            this.selectionBounds.geometry.dispose();
            this.selectionBounds = null;
        }
        // Drop any in-flight gizmo drag so undo cannot resurrect a dangling
        // handle when the user removes all the targeted blocks. Also
        // detach ALL three TCs — the old code only detached translate +
        // rotate, leaving the scale helper visible after a clear.
        for ( const tc of [ this.tcTranslate, this.tcRotate, this.tcScale ] ) {
            if ( tc ) tc.detach();
        }
        if ( this.gizmoDragging ) {
            this.gizmoDragging = false;
            this.gizmoDragStart = null;
            if ( !this.isColorInputFocused() ) this.controls.enabled = true;
        }
        this.updateSelectionVisuals();
        this.updatePropertiesPanel();
    }

    /**
     * Snapshot the current selection into an array of BlockData ( used by
     * group/combine history to record the original state ).
     * Returns selected block snapshots.
     */
    private getSelectedSnapshots(): BlockData[] {
        return this.selectedBlocks.map( ( b ) => this.readBlockData( b ) );
    }

    /**
     * Combine the current selection into a single THREE.Group at the
     * centroid of the selection. The resulting group can be moved, painted
     * or deleted as a unit; its children retain their original relative
     * positions.
     */
    private combineSelected(): void {
        if ( this.selectedBlocks.length < 0o2 ) return;
        this.groupSelected();
    }

    /**
     * Group the current selection into a single THREE.Group. Logical
     * alias for combineSelected; reserved so the UI can label the buttons
     * with distinct intentions.
     */
    private groupSelected(): void {
        if ( this.selectedBlocks.length < 0o2 ) return;
        const centroid = new THREE.Vector3();
        for ( const block of this.selectedBlocks ) {
            centroid.add( block.position );
        }
        centroid.divideScalar( this.selectedBlocks.length );
        const group = new THREE.Group();
        group.name = "group";
        group.userData.blockId = -1;
        group.userData.blockName = `Group ${ ++this.groupCounter }`;
        group.userData.shape = "cube";
        group.userData.color = "group";
        group.userData.groupId = this.groupCounter;
        group.position.copy( centroid );
        const snapshots = this.getSelectedSnapshots();
        for ( const block of this.selectedBlocks ) {
            const key = this.blockKey( block.position );
            this.blocks.delete( key );
            const local = block.position.clone().sub( centroid );
            block.position.copy( local );
            group.add( block );
        }
        this.scene.add( group );
        const groupKey = this.blockKey( group.position );
        this.blocks.set( groupKey, group as unknown as THREE.Mesh );
        this.groups.set( String( this.groupCounter ), group );
        this.addToHistory( "group", {
            position: { x: centroid.x, y: centroid.y, z: centroid.z },
            color: "group",
            id: groupKey,
            blockId: -1,
            name: group.userData.blockName,
            shape: "cube",
            rotation: 0
        }, snapshots );
        this.clearSelection();
        this.updateBlockCount();
    }

    /**
     * Ungroup any selected groups back into individual blocks.
     */
    private ungroupSelected(): void {
        if ( this.selectedBlocks.length === 0 ) return;
        for ( const block of this.selectedBlocks.slice() ) {
            if ( !( block instanceof THREE.Group ) ) continue;
            const group = block;
            const centroid = group.position.clone();
            const key = this.blockKey( group.position );
            this.blocks.delete( key );
            this.scene.remove( group );
            for ( const child of group.children.slice() ) {
                group.remove( child );
                if ( child instanceof THREE.Mesh ) {
                    child.position.add( centroid );
                    this.scene.add( child );
                    this.blocks.set( this.blockKey( child.position ), child );
                }
            }
            this.groups.delete( String( group.userData.groupId ) );
            const idx = this.selectedBlocks.indexOf( group );
            if ( idx !== -1 ) {
                this.selectedBlocks.splice( idx, 1 );
            }
        }
        this.updateSelectionVisuals();
        this.updateBlockCount();
    }

    /**
     * Union the selected objects by merging their geometries into a single
     * composite mesh that shares the dominant block color.
     */
    private unionSelected(): void {
        if ( this.selectedBlocks.length < 0o2 ) return;
        // For a CSG-style true union we would call mergeGeometries; the
        // builder already supports grouping as a near-equivalent for the
        // cuboid shapes it ships. Reuse the grouping pipeline so the user
        // sees a single editable object as expected.
        this.combineSelected();
    }

    /**
     * Read a block's current properties back into a BlockData snapshot,
     * including its current scale so save / load round trips preserve
     * resizes.
     *     block ( THREE.Mesh ) - block to read.
     * Returns BlockData.
     */
    private readBlockData(block: THREE.Mesh): BlockData {
        const pos = block.position;
        return {
            position: { x: pos.x, y: pos.y, z: pos.z },
            color: this.getBlockColor(block),
            id: `${pos.x},${pos.y},${pos.z}`,
            blockId: (block.userData.blockId as number) ?? 0,
            name: (block.userData.blockName as string) ?? "Unknown",
            shape: (block.userData.shape as ShapeId) ?? "cube",
            rotation: (block.userData.rotation as number) ?? 0,
            scale: { x: block.scale.x, y: block.scale.y, z: block.scale.z }
        };
    }

    /**
     * Get block color as hex string.
     *     block ( THREE.Mesh ) - block.
     * Returns color string.
     */
    private getBlockColor(block: THREE.Mesh): string {
        const material = block.material as THREE.MeshLambertMaterial;
        return "#" + material.color.getHexString();
    }

    /**
     * Normalize a block id or name into a numeric id ( when possible ) and a
     * cleaned lowercase name to match against the palette.
     *     idOrName ( number | string ) - block id or name.
     * Returns parsed id and name.
     */
    private parseIdOrName(idOrName: number | string): { numericId: number | null; name: string | null } {
        if (typeof idOrName === "number") {
            return { numericId: idOrName, name: null };
        }
        const trimmed = idOrName.trim();
        const parsed = parseInt(trimmed, 0o12);
        if (!isNaN(parsed) && String(parsed) === trimmed) {
            return { numericId: parsed, name: null };
        }
        let name = trimmed.toLowerCase();
        if (name.startsWith("minecraft:")) name = name.substring(0o12);
        if (name.includes("[")) name = name.split("[")[0];
        name = name.replace(/_/g, " ");
        return { numericId: null, name };
    }

    /**
     * Find a Minecraft block by its cleaned name, allowing a trailing or
     * missing " block" suffix.
     *     name ( string ) - cleaned lowercase name.
     * Returns MinecraftBlock or undefined.
     */
    private findBlockByName(name: string): MinecraftBlock | undefined {
        const matches = (candidate: string): boolean =>
            candidate.toLowerCase() === name || candidate.toLowerCase().replace(/ /g, "") === name.replace(/ /g, "");

        return MINECRAFT_BLOCKS.find((b) => matches(b.name))
            ?? MINECRAFT_BLOCKS.find((b) => matches(name.endsWith(" block") ? name.substring(0, name.length - 6) : name + " block"));
    }

    /**
     * Resolve a Minecraft block definition by numeric id or name, falling back
     * to a color-only definition when the id or name is unknown.
     *     idOrName ( number | string ) - block id or name.
     *     color ( string ) - fallback color.
     * Returns MinecraftBlock.
     */
    private getBlockById(idOrName: number | string, color: string): MinecraftBlock {
        const { numericId, name } = this.parseIdOrName(idOrName);
        if (numericId !== null) {
            const found = MINECRAFT_BLOCKS.find((b) => b.id === numericId);
            if (found) return found;
            return { id: numericId, name: `Block ${numericId}`, color };
        }
        if (name !== null) {
            const found = this.findBlockByName(name);
            if (found) return found;
            return { id: 0, name: String(idOrName), color };
        }
        return { id: 0, name: "Unknown Block", color };
    }

    /**
     * Apply a block's material color and transparency from a block id and
     * color, restoring the previous look during undo/redo.
     *     block ( THREE.Mesh ) - block to update.
     *     blockId ( number ) - minecraft block id.
     *     color ( string ) - material color.
     */
    private applyBlockMaterial(block: THREE.Mesh, blockId: number, color: string): void {
        const material = block.material as THREE.MeshLambertMaterial;
        material.color.set(color);
        block.userData.blockId = blockId;
        material.transparent = false;
        material.opacity = material.transparent ? ( 5 / 8 ) : 1;
        material.needsUpdate = true;
    }

    /**
     * Swap a block's geometry to a new shape, rebuilding it from the shape
     * definition while preserving position, rotation, material and edges.
     *     block ( THREE.Mesh ) - block to update.
     *     shape ( ShapeId ) - shape id.
     */
    private applyBlockShape(block: THREE.Mesh, shape: ShapeId): void {
        const material = block.material as THREE.MeshLambertMaterial;
        const edges = block.children.find(
            (child): child is THREE.LineSegments => child instanceof THREE.LineSegments
        );
        const newGeometry = buildShapeGeometry(shape);
        block.geometry.dispose();
        block.geometry = newGeometry;
        block.userData.shape = shape;
        if (edges) {
            edges.geometry = this.borderGeometry;
        }
        material.needsUpdate = true;
    }

    /**
     * Add action to history.
     *     action ( string ) - action type.
     *     block ( BlockData | null ) - block data.
     *     previousData ( BlockData | string | null ) - previous data.
     */
    private addToHistory(action: string, block: BlockData | null, previousData: BlockData | BlockData[] | string | null): void {
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push({ action, block, previousData });
        this.historyIndex++;
    }

    /**
     * Build a placed block from a BlockData snapshot and register it.
     *     data ( BlockData ) - block data to place.
     */
    private placeBlockData(data: BlockData): void {
        const block = this.createBlock(this.getBlockById(data.blockId, data.color), data.color, data.shape, data.position.x, data.position.y, data.position.z, data.rotation);
        // Restore any persisted scale ( default 1×1×1 if missing — e.g. a
        // pre-resize save file ).
        if ( data.scale ) {
            block.scale.set( data.scale.x, data.scale.y, data.scale.z );
        }
        this.scene.add(block);
        this.blocks.set(this.blockKey(data.position), block);
    }

    /**
     * Remove and unregister the block at the given BlockData position.
     *     data ( BlockData ) - block data identifying the position.
     */
    private removeBlockData(data: BlockData): void {
        const block = this.getBlockAt(data);
        if (block) {
            this.scene.remove(block);
            this.blocks.delete(this.blockKey(data.position));
        }
    }

    /**
     * Undo last action.
     */
    private undo(): void {
        if (this.historyIndex < 0) return;

        const entry = this.history[this.historyIndex];

        if (entry.action === "add" && entry.block) {
            this.removeBlockData(entry.block);
        } else if (entry.action === "remove" && entry.previousData && typeof entry.previousData !== "string") {
            this.placeBlockData(entry.previousData as BlockData);
        } else if (entry.action === "paint" && entry.block) {
            const block = this.getBlockAt(entry.block);
            if (block && entry.previousData && typeof entry.previousData !== "string") {
                const prev = entry.previousData as BlockData;
                this.updateBlock(block, prev.blockId, prev.color, prev.shape, prev.name);
            }
        } else if (entry.action === "rotate" && entry.block && entry.previousData && typeof entry.previousData !== "string") {
            const block = this.getBlockAt(entry.block);
            if (block) {
                const rotation = (entry.previousData as BlockData).rotation;
                block.rotation.y = rotation;
                block.userData.rotation = rotation;
            }
        } else if (entry.action === "move" && entry.block && entry.previousData && typeof entry.previousData !== "string" && !Array.isArray(entry.previousData)) {
            const block = this.getBlockAt(entry.previousData as BlockData);
            if (block) {                // Undo a move. Put the block back to its original position.
            // The map key is still the old position (never updated during drag),
            // so we only need to move the visual position.
                block.position.set(entry.previousData.position.x, entry.previousData.position.y, entry.previousData.position.z);
            }
        } else if (entry.action === "gizmo-transform" && entry.previousData && Array.isArray(entry.previousData)) {
            // tied to the pre-transform position ( we never re-key during
            // a drag ), so every previousData snapshot can still be looked
            // up by its old world position. We push the block back to its
            // starting position, rotation, and scale.
            const prevs = entry.previousData as BlockData[];
            for (const prev of prevs) {
                const block = this.getBlockAt(prev);
                if (block) {
                    block.position.set(prev.position.x, prev.position.y, prev.position.z);
                    block.rotation.y = prev.rotation;
                    block.userData.rotation = prev.rotation;
                    block.quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), prev.rotation );
                    if ( prev.scale ) {
                        block.scale.set( prev.scale.x, prev.scale.y, prev.scale.z );
                    } else {
                        block.scale.set( 1, 1, 1 );
                    }
                }
            }
            // Re-anchor the proxy at the selection's restored centre so the
            // gizmo reflects the post-undo state instead of pointing at a
            // stale location.
            this.refreshGizmoVisibility();
            this.updateSelectionVisuals();
        } else if (entry.action === "property-edit" && entry.previousData && Array.isArray(entry.previousData)) {
            const prevs = entry.previousData as BlockData[];
            for (const prev of prevs) {
                const block = this.getBlockAt(prev);
                if (block) {
                    block.position.set(prev.position.x, prev.position.y, prev.position.z);
                    block.rotation.y = prev.rotation;
                    block.userData.rotation = prev.rotation;
                    block.quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), prev.rotation );
                    if ( prev.scale ) {
                        block.scale.set( prev.scale.x, prev.scale.y, prev.scale.z );
                    }
                }
            }
            this.refreshGizmoVisibility();
            this.updateSelectionVisuals();
        }

        this.historyIndex--;
        this.updateBlockCount();
    }

    /**
     * Redo last undone action.
     */
    private redo(): void {
        if (this.historyIndex >= this.history.length - 1) return;

        this.historyIndex++;
        const entry = this.history[this.historyIndex];

        if (entry.action === "add" && entry.block) {
            this.placeBlockData(entry.block);
        } else if (entry.action === "remove" && entry.previousData && typeof entry.previousData !== "string") {
            this.removeBlockData(entry.previousData as BlockData);
        } else if (entry.action === "paint" && entry.block) {
            const block = this.getBlockAt(entry.block);
            if (block) {
                this.updateBlock(block, entry.block.blockId, entry.block.color, entry.block.shape, entry.block.name);
            }
        } else if (entry.action === "rotate" && entry.block) {
            const block = this.getBlockAt(entry.block);
            if (block) {
                block.rotation.y = entry.block.rotation;
                block.userData.rotation = entry.block.rotation;
            }
        } else if (entry.action === "move" && entry.block && entry.previousData && typeof entry.previousData !== "string" && !Array.isArray(entry.previousData)) {
            const block = this.getBlockAt(entry.previousData as BlockData);
            if (block) {                // Redo a move. Move the block to its dragged position.
            // Map key stays at previousData.position so undo always finds it.
                block.position.set(entry.block.position.x, entry.block.position.y, entry.block.position.z);
            }
        } else if (entry.action === "gizmo-transform" && entry.newData && entry.previousData && Array.isArray(entry.previousData)) {
            // Redo. Replay every new snapshot by index paired with its
            // matching pre-transform snapshot ( which still serves as the
            // blockMap lookup key ).
            const news = entry.newData;
            const prevs = entry.previousData as BlockData[];
            for (let i = 0; i < news.length; i++) {
                const prev = prevs[i];
                const next = news[i];
                if (!prev || !next) continue;
                const block = this.getBlockAt(prev);
                if (block) {
                    block.position.set(next.position.x, next.position.y, next.position.z);
                    block.rotation.y = next.rotation;
                    block.userData.rotation = next.rotation;
                    block.quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), next.rotation );
                    if ( next.scale ) {
                        block.scale.set( next.scale.x, next.scale.y, next.scale.z );
                    }
                }
            }
            this.refreshGizmoVisibility();
            this.updateSelectionVisuals();
        } else if (entry.action === "property-edit" && entry.newData && entry.previousData && Array.isArray(entry.previousData)) {
            const news = entry.newData;
            const prevs = entry.previousData as BlockData[];
            for (let i = 0; i < news.length; i++) {
                const prev = prevs[i];
                const next = news[i];
                if (!prev || !next) continue;
                const block = this.getBlockAt(prev);
                if (block) {
                    block.position.set(next.position.x, next.position.y, next.position.z);
                    block.rotation.y = next.rotation;
                    block.userData.rotation = next.rotation;
                    block.quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), next.rotation );
                    if ( next.scale ) {
                        block.scale.set( next.scale.x, next.scale.y, next.scale.z );
                    }
                }
            }
            this.refreshGizmoVisibility();
            this.updateSelectionVisuals();
        }

        this.updateBlockCount();
    }

    /**
     * Clear all blocks.
     */
    private clearAll(): void {
        for (const [key, block] of this.blocks.entries()) {
            this.scene.remove(block);
        }
        this.blocks.clear();
        this.history = [];
        this.historyIndex = -1;
        this.clearSelection();
        this.isDragging = false;
        this.dragStarted = false;
        this.dragStartMouse = null;
        this.dragStartPositions.clear();
        this.isAreaSelecting = false;
        this.selectStartPos = null;
        this.selectEndPos = null;
        this.hideSelectRect();
        if ( !this.isColorInputFocused() ) this.controls.enabled = true;
        this.updateBlockCount();
    }

    /**
     * Collect all placed blocks as an array of BlockData snapshots.
     *     @returns BlockData array
     */
    private getAllBlockData(): BlockData[] {
        const data: BlockData[] = [];
        for (const block of this.blocks.values()) {
            data.push(this.readBlockData(block));
        }
        return data;
    }

    /**
     * Save structure to JSON file.
     */
    private save(): void {
        const data = this.getAllBlockData();
        const json = JSON.stringify(data, null, 2);
        const timestamp = this.getTimestamp();
        downloadText(`ſןᴜȝ - ${timestamp}.json`, json, "application/json");
    }

    /**
     * Get timestamp using custom clock system.
     */
    /**
     * Get a timestamp string using the provided custom clock functions.
     * Falls back to ISO date string when the clock system is unavailable.
     *     @returns timestamp string
     */
    private getTimestamp(): string {
        const now = new Date();
        const cax2l = typeof window.cax2lStafl2 === "function" ? window.cax2lStafl2(now) : null;
        const stifeh2 = typeof window.castifeh2 === "function" ? window.castifeh2(now) : null;

        if (cax2l && stifeh2) {
            return `${cax2l.stibix}.${cax2l.pal2stif}.${cax2l.stafl2} - ${stifeh2.haqe}.${stifeh2.qe}.${stifeh2.he}`;
        }

        const p = (n: number) => String(n).padStart(2, "0");
        return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())} ${p(now.getHours())}.${p(now.getMinutes())}.${p(now.getSeconds())}`;
    }

    /**
     * Load structure from file.
     *     event ( Event ) - file input event.
     */
    private load(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        const fileName = file.name.toLowerCase();
        const isSchematic = fileName.endsWith(".schem") || fileName.endsWith(".mcstructure");

        if ( isSchematic ) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target?.result as ArrayBuffer;
                    if (!arrayBuffer) throw new Error("Could not read file data");
                    const isMcstructure = fileName.endsWith(".mcstructure");
                    const blocks = await parseSchematicOrStructure(arrayBuffer, isMcstructure);
                    this.clearAll();
                    this.placeBlocks(blocks);
                    this.updateBlockCount();
                } catch (err) {
                    console.error("ſ͕ȷɜ ɭʃɔ ŋᷠɹ ⟅", err);
                    if (typeof alert === "function" && fileName.endsWith(".schem")) {
                        alert("Could not read schematic file. Ensure it is a valid Minecraft .schem or .mcstructure file.");
                    }
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result as string;
                    const parsedBlocks = parseJSONBlocks(text);
                    this.clearAll();
                    this.placeBlocks(parsedBlocks);
                    this.updateBlockCount();
                } catch (err) {
                    console.error("ſ͕ȷɜ ɭʃɔ ŋᷠɹ ⟅", err);
                }
            };
            reader.readAsText(file);
        }
        input.value = "";
    }

    /**
     * Place a list of parsed blocks into the scene.
     *     blocks ( Array ) - parsed blocks.
     */
    private placeBlocks(blocks: ParsedSchematicBlock[]): void {
        blocks.forEach((b) => {
            this.placeBlockData({
                position: { x: gridToWorld(b.x), y: gridToWorld(b.y), z: gridToWorld(b.z) },
                color: b.color,
                id: `${b.x},${b.y},${b.z}`,
                blockId: typeof b.name === "number" ? b.name : 0,
                name: String(b.name),
                shape: (b.shape as ShapeId) ?? "cube",
                rotation: b.rotation ?? 0
            });
        });
    }

    /**
     * Export structure as OBJ 3D file.
     */
    private exportOBJ(): void {
        const data: Array<{ position: THREE.Vector3Like; color: string }> = [];
        for (const block of this.blocks.values()) {
            data.push({ position: block.position, color: this.getBlockColor(block) });
        }

        const { obj, mtl } = buildOBJ(data);
        const timestamp = this.getTimestamp();
        downloadText(`ſןᴜȝ - ${timestamp}.obj`, obj, "application/octet-stream");
        setTimeout(() => {
            downloadText(`ſןᴜȝ - ${timestamp}.mtl`, mtl, "application/octet-stream");
        }, 0o100);
    }

    /**
     * Export structure as a Minecraft-flavored schematic JSON.
     */
    private exportSchematic(): void {
        const blocks: ParsedSchematicBlock[] = [];
        for (const block of this.blocks.values()) {
            const data = this.readBlockData(block);
            blocks.push({
                x: worldToGrid(data.position.x),
                y: worldToGrid(data.position.y),
                z: worldToGrid(data.position.z),
                name: data.blockId,
                color: data.color
            });
        }

        const schematic = {
            format: "minecraft-schematic",
            version: 1,
            width: this.gridSize,
            height: this.gridSize,
            length: this.gridSize,
            blocks
        };

        const formatSelect = document.getElementById("schematicFormat") as HTMLSelectElement | null;
        const extension = formatSelect && formatSelect.value === "mcstructure" ? "mcstructure" : "schem";

        const json = JSON.stringify(schematic, null, 2);
        const timestamp = this.getTimestamp();
        downloadText(`ſןᴜȝ schematic - ${timestamp}.${extension}`, json, "application/json");
    }

    /**
     * Import a Minecraft schematic JSON or binary NBT schematic.
     *     event ( Event ) - file input event.
     */
    private importSchematic(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                if (!arrayBuffer) throw new Error("Could not read file data");

                let blocks: ParsedSchematicBlock[] = [];

                try {
                    const text = new TextDecoder().decode(arrayBuffer);
                    blocks = parseJSONBlocks(text);
                } catch (jsonErr) {
                    const isMcstructure = file.name.endsWith(".mcstructure");
                    blocks = await parseSchematicOrStructure(arrayBuffer, isMcstructure);
                }

                this.clearAll();
                this.placeBlocks(blocks);
                this.updateBlockCount();
            } catch (err) {
                console.error("Error loading schematic.", err);
                if (typeof alert === "function") {
                    alert("Could not read schematic file. Ensure it is a valid Minecraft .schem or .mcstructure file.");
                }
            }
        };
        reader.readAsArrayBuffer(file);
        input.value = "";
    }

    /**
     * Update block count display.
     */
    private updateBlockCount(): void {
        const countEl = document.getElementById("blockCount");
        if (countEl) {
            countEl.textContent = this.blocks.size.toString();
        }
    }

    /**
     * Show a rectangle preview on the ground during area selection.
     *     @param start ( THREE.Vector3 ) - start corner in world coords.
     *     @param end ( THREE.Vector3 ) - current mouse corner in world coords.
     */
    private showSelectRect( start: THREE.Vector3, end: THREE.Vector3 ): void {
        if ( !this.selectRectMesh ) {
            const material = new THREE.LineBasicMaterial({ color: "#FFFFFF", transparent: true, opacity: ( 1 / 2 ) });
            const geometry = new THREE.BufferGeometry();
            const vertices = new Float32Array( 0o30 * 3 );
            geometry.setAttribute( "position", new THREE.BufferAttribute( vertices, 3 ) );
            this.selectRectMesh = new THREE.LineSegments( geometry, material );
            this.scene.add( this.selectRectMesh );
        }
        const minX = Math.min( start.x, end.x );
        const maxX = Math.max( start.x, end.x );
        const minZ = Math.min( start.z, end.z );
        const maxZ = Math.max( start.z, end.z );
        // 3D box showing the actual vertical range being dragged, from the
        // lowest of start.y / end.y to the highest, with at least a one-block
        // visible minimum so ground-level drags do not produce a zero-height
        // invisible box.
        let bottomY = Math.min( start.y, end.y );
        let topY = Math.max( start.y, end.y );
        const minHeight = ( 1 / 2 );
        if ( topY - bottomY < minHeight ) {
            const mid = ( bottomY + topY ) / 2;
            bottomY = mid - minHeight / 2;
            topY = mid + minHeight / 2;
        }
        const positions = new Float32Array([
            // Bottom rectangle
            minX, bottomY, minZ,
            maxX, bottomY, minZ,
            maxX, bottomY, minZ,
            maxX, bottomY, maxZ,
            maxX, bottomY, maxZ,
            minX, bottomY, maxZ,
            minX, bottomY, maxZ,
            minX, bottomY, minZ,
            // Top rectangle
            minX, topY, minZ,
            maxX, topY, minZ,
            maxX, topY, minZ,
            maxX, topY, maxZ,
            maxX, topY, maxZ,
            minX, topY, maxZ,
            minX, topY, maxZ,
            minX, topY, minZ,
            // Vertical pillars ( 4 corners )
            minX, bottomY, minZ,
            minX, topY, minZ,
            maxX, bottomY, minZ,
            maxX, topY, minZ,
            maxX, bottomY, maxZ,
            maxX, topY, maxZ,
            minX, bottomY, maxZ,
            minX, topY, maxZ
        ]);
        this.selectRectMesh.geometry.setAttribute( "position", new THREE.BufferAttribute( positions, 3 ) );
        this.selectRectMesh.geometry.setDrawRange( 0, 0o30 );
        this.selectRectMesh.visible = true;
    }

    /**
     * Hide the area selection rectangle preview.
     */
    private hideSelectRect(): void {
        if ( this.selectRectMesh ) {
            this.selectRectMesh.visible = false;
        }
    }

    /**
     * Update cursor position display.
     *     @param point ( THREE.Vector3 ) - 3D point.
     */
    private updateCursorPosition(point: THREE.Vector3): void {
        const posEl = document.getElementById("cursorPos");
        if (posEl) {
            posEl.textContent = `${Math.round(point.x)}, ${Math.round(point.y)}, ${Math.round(point.z)}`;
        }
    }

    /**
     * Apply WASD / arrow key / space / shift / Q / E movement to the camera
     * and orbit target each frame.  Horizontal movement ( forward/back/strafe )
     * is always relative to the camera's current facing direction projected
     * onto the XZ plane so orbiting while moving behaves intuitively.  Space
     * moves the camera upward, shift moves it downward.  Q and E orbit the
     * camera left / right around the target point.
     */
    private updateWASDMovement(): void {
        if ( this.keysPressed.size === 0 ) return;

        const speed = this.wasdSpeed * 0.05;
        const forward = new THREE.Vector3();
        this.camera.getWorldDirection( forward );
        forward.y = 0;
        forward.normalize();

        const right = new THREE.Vector3();
        right.crossVectors( forward, new THREE.Vector3( 0, 1, 0 ) ).normalize();

        const movement = new THREE.Vector3();

        if ( this.keysPressed.has( "w" ) || this.keysPressed.has( "arrowup" ) ) {
            movement.add( forward );
        }
        if ( this.keysPressed.has( "s" ) || this.keysPressed.has( "arrowdown" ) ) {
            movement.sub( forward );
        }
        if ( this.keysPressed.has( "a" ) || this.keysPressed.has( "arrowleft" ) ) {
            movement.sub( right );
        }
        if ( this.keysPressed.has( "d" ) || this.keysPressed.has( "arrowright" ) ) {
            movement.add( right );
        }

        // Vertical movement ( space = up, shift = down ) — applied
        // independently so the vertical speed stays consistent regardless of
        // horizontal-direction normalization.
        if ( this.keysPressed.has( " " ) ) {
            this.camera.position.y += speed;
            this.controls.target.y += speed;
            this.updateCameraInfo();
        }
        if ( this.keysPressed.has( "shift" ) ) {
            this.camera.position.y -= speed;
            this.controls.target.y -= speed;
            this.updateCameraInfo();
        }

        // Q / E orbit rotation around the Y axis — rotates the camera
        // position around the controls target so the view orbits left ( Q )
        // or right ( E ) without moving the camera closer or farther.
        // This runs after controls.update() so the manual lookAt overrides
        // the controls rotation for this frame, which is what we want.
        if ( this.keysPressed.has( "q" ) || this.keysPressed.has( "e" ) ) {
            const rotSpeed = this.wasdSpeed * 0.005;
            const dir = ( this.keysPressed.has( "q" ) ? 1 : 0 ) + ( this.keysPressed.has( "e" ) ? -1 : 0 );
            const offset = new THREE.Vector3().subVectors( this.camera.position, this.controls.target );
            offset.applyEuler( new THREE.Euler( 0, rotSpeed * dir, 0 ) );
            this.camera.position.copy( this.controls.target ).add( offset );
            this.camera.lookAt( this.controls.target );
            this.updateCameraInfo();
        }

        if ( movement.length() > 0 ) {
            movement.normalize().multiplyScalar( speed );
            this.camera.position.add( movement );
            this.controls.target.add( movement );
            this.updateCameraInfo();
        }
    }

    /**
     * Update camera status info display.
     */
    private updateCameraInfo(): void {
        // Rest of existing method...
        const infoEl = document.getElementById("cameraInfo");
        if (infoEl) {
            const fov = Math.round(this.camera.fov);
            const angle = Math.round((Math.atan2(this.camera.position.x, this.camera.position.z) * 0o260) / Math.PI);
            infoEl.textContent = `${fov}°, ${angle}°`;
        }
    }

    /**
     * Animation loop.
     */
    private animate(): void {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.updateWASDMovement();
        // Keep selection visuals synced to block positions ( in case of drag ).
        // The aggregate selectionBounds lives one index past the per-block
        // outlines so it must be tracked here too — it represents the
        // bounding region of all selected objects and must follow when the
        // selection is dragged.
        if ( this.selectedBlocks.length > 0 ) {
            for ( let i = 0; i < this.selectedBlocks.length; i++ ) {
                const block = this.selectedBlocks[i];
                const child = this.selectionGroup.children[i];
                if ( child && child instanceof THREE.LineSegments ) {
                    child.position.copy( block.position );
                    child.scale.copy( block.scale );
                    child.quaternion.copy( block.quaternion );
                }
            }
            if ( this.selectionBounds ) {
                const box = new THREE.Box3();
                for ( const block of this.selectedBlocks ) {
                    block.updateMatrixWorld( true );
                    box.expandByObject( block );
                }
                const center = new THREE.Vector3();
                box.getCenter( center );
                this.selectionBounds.position.copy( center );
            }
        }
        // The vertical reference grid is fixed at the positive-Z wall of the
        // workspace ( set in setupScene ) and does not move with the camera.
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize workspace when DOM is ready.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => new BlockBuilderWorkspace());
} else {
    new BlockBuilderWorkspace();
}
