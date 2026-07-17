/**
 * ≺⧼ ſɟᴜ j͑ʃ'ᴜ ſןᴜȝ - 3D Build 🧱 ⧽≻
 *
 * A 3D workspace for building structures with blocks on a grid.
 */

import * as THREE from "three";
import { OrbitControls } from "three/addons";
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

/**
 * Editing mode.
 *     minecraft ( string ) - restricted to minecraft blocks and their palette.
 *     general ( string ) - free 3D editing with custom colors.
 */
type EditMode = "minecraft" | "general";

/**
 * Block data structure
 *     position ( object ) - x, y, z coordinates.
 *     color ( string ) - hex color ( fallback / display ).
 *     id ( string ) - unique identifier.
 *     blockId ( number ) - minecraft numeric block id.
 *     name ( string ) - minecraft block name.
 *     shape ( string ) - shape id.
 * Returns block.
 */
interface BlockData {
    position: { x: number; y: number; z: number };
    color: string;
    id: string;
    blockId: number;
    name: string;
    shape: ShapeId;
    rotation: number;
}

/**
 * History entry for undo/redo
 *     action ( string ) - add, remove, paint, move.
 *     block ( BlockData | null ) - block data.
 *     previousData ( BlockData | string | null ) - previous color for paint or previous position for move.
 */
interface HistoryEntry {
    action: string;
    block: BlockData | null;
    previousData: BlockData | string | null;
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
    private ground!: THREE.Mesh;
    private blocks: Map<string, THREE.Mesh>;
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
    private currentHeight: number;
    private gridSize: number;
    private showGrid: boolean;
    private snapToGrid: boolean;
    private selectedBlock: THREE.Mesh | null;
    private selectionBox!: THREE.LineSegments;
    private isDragging: boolean;
    private dragPlane: THREE.Plane;
    private dragOffset: THREE.Vector3;
    private backgroundGroup: THREE.Group;
    private backgroundTemplate: ParsedSchematicBlock[] = [];

    constructor() {
        this.canvas = document.getElementById("workspace3dCanvas") as HTMLCanvasElement;
        this.scene = new THREE.Scene();
        this.scene.background = this.createSkyTexture();

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
        this.currentMode = "minecraft";
        this.currentHeight = 0;
        this.gridSize = 0o40;
        this.showGrid = true;
        this.snapToGrid = true;
        this.selectedBlock = null;
        this.isDragging = false;
        this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        this.dragOffset = new THREE.Vector3();
        this.backgroundGroup = new THREE.Group();
        this.backgroundGroup.name = "backgroundBuildings";

        this.setupScene();
        this.setupEventListeners();
        this.setupUI();
        this.updateCameraInfo();
        this.animate();
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

        const skyLight = new THREE.HemisphereLight("#b0d8e0", "#608850", ( 5 / 8 ));
        this.scene.add(skyLight);

        this.scene.fog = new THREE.Fog("#b0d8e0", this.gridSize * ( 3 / 2 ), this.gridSize * ( 9 / 2 ));

        this.gridHelper = this.createGridHelper();
        this.scene.add(this.gridHelper);

        const sceneryGeometry = new THREE.CircleGeometry(this.gridSize * 0o10, 0o60);
        const sceneryMaterial = new THREE.MeshLambertMaterial({ color: "#688858" });
        const scenery = new THREE.Mesh(sceneryGeometry, sceneryMaterial);
        scenery.rotation.x = -Math.PI / 2;
        scenery.position.y = -( 5 / 8 );
        scenery.name = "scenery";
        this.scene.add(scenery);

        const baseplate = this.createBaseplate(this.gridSize + 0o10, ( 1 / 2 ), ( 1 / 2 ));
        baseplate.position.y = -( 1 / 0o100 );
        baseplate.name = "ground";
        this.ground = baseplate;
        this.scene.add(baseplate);

        const selectionBoxGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(( 1 + ( 1 / 0o100 ) ), ( 1 + ( 1 / 0o100 ) ), ( 1 + ( 1 / 0o100 ) )));
        const selectionBoxMaterial = new THREE.LineBasicMaterial({ color: "#FFFFFF", linewidth: 0o10 });
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

        this.scatterBackgroundBuildings();
    }

    /**
     * Create a soft vertical sky-gradient texture used as the scene background.
     * Returns CanvasTexture.
     */
    private createSkyTexture(): THREE.CanvasTexture {
        const canvas = document.createElement("canvas");
        canvas.width = 0o20;
        canvas.height = 0o400;
        const ctx = canvas.getContext("2d")!;
        const gradient = ctx.createLinearGradient(0, 0, 0, 0o400);
        gradient.addColorStop(0, "#58a8e8");
        gradient.addColorStop(( 4 / 8 ), "#98c8e8");
        gradient.addColorStop(( 6 / 8 ), "#d8f0f8");
        gradient.addColorStop(1, "#e8f8f8");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 0o20, 0o400);
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }

    /**
     * Create a grid helper sized to the current grid size.
     * Returns GridHelper.
     */
    private createGridHelper(): THREE.GridHelper {
        const gridHelper = new THREE.GridHelper(this.gridSize, this.gridSize, "#384838", "#282828");
        gridHelper.position.y = ( 1 / 0o100 );
        return gridHelper;
    }

    /**
     * Create a rounded rectangular baseplate ( a 3D slab with beveled edges ).
     *     size ( number ) - width/depth of the plate.
     *     height ( number ) - thickness of the plate.
     *     radius ( number ) - corner radius.
     * Returns Mesh.
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
     *     color ( string ) - material color.
     *     shape ( ShapeId ) - shape id.
     *     rotation ( number ) - block's own y rotation in radians.
     * Returns Mesh.
     */
    private createBackgroundBlock(color: string, shape: ShapeId, rotation: number): THREE.Mesh {
        const material = new THREE.MeshLambertMaterial({ color });
        const mesh = new THREE.Mesh(buildShapeGeometry(shape), material);
        mesh.rotation.y = rotation;
        return mesh;
    }

    /**
     * Fetch and parse the shared building template, then scatter dimmed,
     * non-interactive copies of it around the background ring of the grid.
     */
    private async scatterBackgroundBuildings(): Promise<void> {
        let blocks: ParsedSchematicBlock[] = [];
        try {
            const url = new URL("./ſןᴜȝ/j͑ʃᴜ ɭʃᴜͷ̗.json", import.meta.url);
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            blocks = parseJSONBlocks(await res.text());
        } catch (err) {
            console.warn("ſ͕ȷɜ ſɭʞɹ j͑ʃɔ j͑ʃ'ᴜ ɭʃᴜͷ̗ ꞁȷ̀ɔ ƽᶗ‹ ᶅſɔ j͐ʃэ ⟅", err);
            return;
        }
        if (blocks.length === 0) return;

        this.backgroundTemplate = blocks;
        this.rebuildBackground(blocks);
    }

    /**
     * ( Re ) build the scattered background buildings from a parsed template.
     *     template ( ParsedSchematicBlock[] ) - building block list in grid cells.
     */
    private rebuildBackground(template: ParsedSchematicBlock[]): void {
        if (this.backgroundGroup.parent) {
            this.scene.remove(this.backgroundGroup);
        }
        this.backgroundGroup = new THREE.Group();
        this.backgroundGroup.name = "backgroundBuildings";

        const minX = Math.min(...template.map((b) => b.x));
        const maxX = Math.max(...template.map((b) => b.x));
        const minY = Math.min(...template.map((b) => b.y));
        const minZ = Math.min(...template.map((b) => b.z));
        const maxZ = Math.max(...template.map((b) => b.z));
        const cx = (minX + maxX) / 2;
        const cz = (minZ + maxZ) / 2;

        const scale = 1.6;
        const rings = [
            { count: 12, radius: this.gridSize * ( 5 / 4 ) },
            { count: 16, radius: this.gridSize * 2 },
            { count: 20, radius: this.gridSize * ( 11 / 4 ) }
        ];
        let ringIndex = 0;
        let globalIndex = 0;

        for (const ring of rings) {
            const spacing = (Math.PI * 2) / ring.count;
            for (let i = 0; i < ring.count; i++) {
                const angle = i * spacing + ringIndex * (spacing / 2);
                const offsetX = Math.cos(angle) * ring.radius;
                const offsetZ = Math.sin(angle) * ring.radius;
                const yaw = globalIndex * (Math.PI / 2);

                const building = new THREE.Group();
                for (const b of template) {
                    const block = this.createBackgroundBlock(
                        b.color || "#888888",
                        (b.shape as ShapeId) ?? "cube",
                        b.rotation ?? 0
                    );
                    block.position.set(
                        (gridToWorld(b.x) - gridToWorld(cx)) * scale,
                        (gridToWorld(b.y) - gridToWorld(minY)) * scale,
                        (gridToWorld(b.z) - gridToWorld(cz)) * scale
                    );
                    block.scale.setScalar(scale);
                    building.add(block);
                }
                building.rotation.y = yaw;
                building.position.set(offsetX, 0, offsetZ);
                this.backgroundGroup.add(building);
                globalIndex++;
            }
            ringIndex++;
        }

        this.scene.add(this.backgroundGroup);
    }

    /**
     * Setup mouse and keyboard event listeners.
     */
    private setupEventListeners(): void {

        window.addEventListener("resize", () => this.onWindowResize());
        window.addEventListener("mouseup", () => this.onMouseUp());
        this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
        this.canvas.addEventListener("mouseup", () => this.onMouseUp());
        this.canvas.addEventListener("mouseleave", () => { this.hoverBox.visible = false; });
        this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());

        document.addEventListener("keydown", (e) => this.onKeyDown(e));
    }

    /**
     * Setup UI controls.
     */
    private setupUI(): void {
        initSharedToolbar();

        this.bindToggleGroup("#toolsPanel button[data-tool]", "data-tool", (value) => this.setTool(value));
        this.bindToggleGroup("button[data-mode]", "data-mode", (value) => this.setMode(value as EditMode));
        this.bindToggleGroup("#shapesPanel button[data-shape]", "data-shape", (value) => this.setShape(value as ShapeId));

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
                    this.setBlock({ id, name: `Block ${id}`, color: "#888888", transparent: false });
                }
            });
        }

        const colorInput = this.el<HTMLInputElement>("colorInput");
        if (colorInput) {
            colorInput.value = this.currentColor;
            colorInput.addEventListener("input", (e) => {
                this.currentColor = (e.target as HTMLInputElement).value;
                if (this.currentMode === "general") {
                    this.currentBlock = { id: 0, name: "Custom", color: this.currentColor, transparent: false };
                }
                this.syncColorTextInput(this.currentColor);
                this.updateSelectedBlockInfo();
            });
        }

        const colorTextInput = this.el<HTMLInputElement>("colorTextInput");
        if (colorTextInput) {
            colorTextInput.value = this.currentColor;
            const applyTextColor = (): void => {
                const value = colorTextInput.value.trim();
                if (value && /^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(value)) {
                    const normalized = value.startsWith("#") ? value : "#" + value;
                    this.currentColor = normalized;
                    if (this.currentMode === "general") {
                        this.currentBlock = { id: 0, name: "Custom", color: this.currentColor, transparent: false };
                    }
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
                this.camera.fov = Math.min(Math.max(value, 0o14), 0o144);
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
                if (this.backgroundTemplate.length > 0) {
                    this.rebuildBackground(this.backgroundTemplate);
                }
            });
        }

        const fileInput = this.el<HTMLInputElement>("fileInput");
        const schematicInput = this.el<HTMLInputElement>("schematicInput");
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
            ["importSchematicBtn", () => schematicInput?.click()]
        ];

        actionBindings.forEach(([id, handler]) => bindClick(id, handler));

        fileInput?.addEventListener("change", (e) => this.load(e));
        schematicInput?.addEventListener("change", (e) => this.importSchematic(e));
    }

    /**
     * Wire a group of toggle buttons so clicking one selects it ( aria-pressed )
     * and invokes the handler with the button's attribute value.
     *     selector ( string ) - query selector for the buttons.
     *     attr ( string ) - attribute holding the value.
     *     handler ( function ) - called with the selected value.
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
     *     id ( string ) - element id.
     * Returns element or null.
     */
    private el<T extends HTMLElement = HTMLElement>(id: string): T | null {
        return document.getElementById(id) as T | null;
    }

    /**
     * Sync the color and block-id input fields to the given values.
     *     blockId ( number ) - minecraft numeric block id.
     *     color ( string ) - hex color.
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

    /**
     * Set current block by Minecraft block definition.
     *     block ( MinecraftBlock ) - block definition.
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
     *     mode ( EditMode ) - minecraft or general.
     */
    private setMode(mode: EditMode): void {
        this.currentMode = mode;
        const minecraftPanel = document.getElementById("colorsPanel");
        const generalPanel = document.getElementById("generalColorsPanel");
        const shapesPanel = document.getElementById("shapesPanel");
        if (minecraftPanel) minecraftPanel.style.display = mode === "minecraft" ? "" : "none";
        if (generalPanel) generalPanel.style.display = mode === "general" ? "" : "none";
        if (shapesPanel) shapesPanel.style.display = mode === "general" ? "" : "none";
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
     * Returns ShapeId.
     */
    private getCurrentShape(): ShapeId {
        if (this.currentMode === "minecraft") {
            return shapeForBlockId(this.currentBlock.id);
        }
        return this.currentShape;
    }

    /**
     * Set current shape ( used in general 3D mode ).
     *     shape ( ShapeId ) - shape id.
     */
    private setShape(shape: ShapeId): void {
        this.currentShape = shape;
        this.updateShapeButtons();
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
            const shapeName = SHAPES.find((s) => s.id === this.getCurrentShape())?.name ?? "Cube";
            label.textContent = `${this.currentBlock.name} ( id.${this.currentBlock.id} ) - ${shapeName}`;
        }
        const colorEl = document.getElementById("selectedBlockColor");
        if (colorEl) {
            const display = this.currentMode === "general" ? this.currentColor : this.currentBlock.color;
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
     *     tool ( string ) - tool name.
     */
    private setTool(tool: string): void {
        this.currentTool = tool;
        this.canvas.style.cursor = tool === "select" ? "default" : "crosshair";
        if (tool !== "add" && tool !== "paint") {
            this.hoverBox.visible = false;
        }
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
     * undo/redo so the look stays consistent.
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

        const { blockIntersects, groundIntersects } = this.getIntersections();

        let intersect: THREE.Intersection | null = null;
        if (blockIntersects.length > 0) {
            intersect = blockIntersects[0];
        } else if (groundIntersects.length > 0) {
            intersect = groundIntersects[0];
        }

        if (intersect) {
            if (this.currentTool === "picker" && intersect.object instanceof THREE.Mesh && intersect.object.name === "block") {
                this.pickBlock(intersect.object);
            } else if (this.currentTool === "add" && intersect.object.name === "ground") {
                this.clearSelection();
                const point = intersect.point.clone();
                const x = Math.floor(point.x) + ( 1 / 2 );
                const y = this.snapToGrid ? ( 1 / 2 ) : point.y;
                const z = Math.floor(point.z) + ( 1 / 2 );
                this.addBlock(x, y, z);
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
                this.addBlock(x, y, z);
            } else if (this.currentTool === "remove" && intersect.object instanceof THREE.Mesh && intersect.object.name === "block") {
                this.removeBlock(intersect.object);
            } else if (this.currentTool === "paint" && intersect.object instanceof THREE.Mesh && intersect.object.name === "block") {
                this.clearSelection();
                this.paintBlock(intersect.object);
            } else if (this.currentTool === "paint" && intersect.object.name === "ground") {
                // Don't allow painting on ground.
            } else if (this.currentTool === "rotate" && intersect.object instanceof THREE.Mesh && intersect.object.name === "block") {
                this.rotateBlock(intersect.object);
            } else if (this.currentTool === "select" && intersect.object instanceof THREE.Mesh && intersect.object.name === "block") {
                this.selectBlock(intersect.object);
                this.isDragging = true;
                this.dragOffset.copy(intersect.object.position).sub(intersect.point);
                this.controls.enabled = false;
            } else if (this.currentTool === "select" && intersect.object.name === "ground") {
                this.clearSelection();
            }
        } else {
            if (this.currentTool === "select") {
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

        if (this.isDragging && this.selectedBlock) {
            const intersects = this.raycaster.intersectObjects([this.scene.getObjectByName("ground")!]);
            if (intersects.length > 0) {
                const point = intersects[0].point.clone().add(this.dragOffset);
                if (this.snapToGrid) {
                    point.x = Math.floor(point.x) + ( 1 / 2 );
                    point.y = Math.max(( 1 / 2 ), Math.floor(point.y) + ( 1 / 2 ));
                    point.z = Math.floor(point.z) + ( 1 / 2 );
                }
                this.selectedBlock.position.copy(point);
                this.updateCursorPosition(point);
            }
        } else {
            const { blockIntersects, groundIntersects } = this.getIntersections();

            if (blockIntersects.length > 0) {
                this.updateCursorPosition(blockIntersects[0].point);
                this.updateHoverBox(blockIntersects[0].point, this.currentTool);
            } else if (groundIntersects.length > 0) {
                this.updateCursorPosition(groundIntersects[0].point);
                this.updateHoverBox(groundIntersects[0].point, this.currentTool);
            } else {
                this.hoverBox.visible = false;
            }
        }
    }

    /**
     * Raycast the pointer against the placed blocks and the ground, returning
     * both intersection lists.
     * Returns block and ground intersections.
     */
    private getIntersections(): { blockIntersects: THREE.Intersection[]; groundIntersects: THREE.Intersection[] } {
        const blockMeshes = Array.from(this.blocks.values());
        const ground = this.scene.getObjectByName("ground")!;
        return {
            blockIntersects: this.raycaster.intersectObjects(blockMeshes, false),
            groundIntersects: this.raycaster.intersectObjects([ground])
        };
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
    private updateHoverBox(point: THREE.Vector3, tool: string): void {
        const show = tool === "add" || tool === "paint";
        if (!show) {
            this.hoverBox.visible = false;
            return;
        }
        const x = Math.floor(point.x) + ( 1 / 2 );
        const y = tool === "paint" ? point.y : (this.snapToGrid ? ( 1 / 2 ) : point.y);
        const z = Math.floor(point.z) + ( 1 / 2 );

        if (!this.isWithinGrid(x, y, z)) {
            this.hoverBox.visible = false;
            return;
        }

        this.refreshHoverGeometry();
        this.updateHoverShapeLabel();
        this.hoverBox.position.set(x, y, z);
        this.hoverBox.visible = true;
    }

    /**
     * Update the on-screen label describing the shape that will be placed.
     */
    private updateHoverShapeLabel(): void {
        const el = document.getElementById("hoverShapeLabel");
        if (el) {
            const shapeName = SHAPES.find((s) => s.id === this.getCurrentShape())?.name ?? "Cube";
            el.textContent = shapeName;
        }
    }

    /**
     * Handle mouse up.
     */
    private onMouseUp(): void {
        if (this.isDragging && this.selectedBlock) {
            const block = this.selectedBlock;
            const pos = block.position;
            const oldPos = { x: pos.x - this.dragOffset.x, y: pos.y - this.dragOffset.y, z: pos.z - this.dragOffset.z };
            const newPos = { x: pos.x, y: pos.y, z: pos.z };

            if (oldPos.x !== newPos.x || oldPos.y !== newPos.y || oldPos.z !== newPos.z) {
                this.addToHistory("move", this.readBlockData(block), null);
            }
        }
        this.isDragging = false;
        this.controls.enabled = true;
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
            if (this.selectedBlock) {
                this.removeBlock(this.selectedBlock);
            }
        } else if (event.key === "1") this.setTool("select");
        else if (event.key === "2") this.setTool("add");
        else if (event.key === "3") this.setTool("remove");
        else if (event.key === "4") this.setTool("paint");
        else if (event.key === "5") this.setTool("picker");
        else if (event.key === "6") this.setTool("rotate");
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
        if (block.transparent) {
            materialOptions.transparent = true;
            materialOptions.opacity = ( 5 / 8 );
        }
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
        if (!this.isWithinGrid(x, y, z)) return;

        const key = `${x},${y},${z}`;
        if (this.blocks.has(key)) return;

        const color = this.currentMode === "general" ? this.currentColor : this.currentBlock.color;
        const shape = this.getCurrentShape();
        const block = this.createBlock(this.currentBlock, color, shape, x, y, z);

        this.scene.add(block);
        this.blocks.set(key, block);

        this.addToHistory("add", { position: { x, y, z }, color, id: key, blockId: this.currentBlock.id, name: this.currentBlock.name, shape, rotation: 0 }, null);
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

        if (this.selectedBlock === block) {
            this.clearSelection();
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
        const previous = this.readBlockData(block);
        const color = this.currentMode === "general" ? this.currentColor : this.currentBlock.color;
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
        this.currentBlock = found ?? { id: data.blockId, name: data.name, color, transparent: material.transparent };
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
        this.selectedBlock = block;
        this.updateSelectionBox();
    }

    /**
     * Update selection box position.
     */
    private updateSelectionBox(): void {
        if (this.selectedBlock) {
            this.selectionBox.position.copy(this.selectedBlock.position);
            this.selectionBox.visible = true;
        } else {
            this.selectionBox.visible = false;
        }
    }

    /**
     * Clear selection.
     */
    private clearSelection(): void {
        this.selectedBlock = null;
        this.updateSelectionBox();
    }

    /**
     * Read a block's current properties back into a BlockData snapshot.
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
            rotation: (block.userData.rotation as number) ?? 0
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
        const parsed = parseInt(trimmed, 10);
        if (!isNaN(parsed) && String(parsed) === trimmed) {
            return { numericId: parsed, name: null };
        }
        let name = trimmed.toLowerCase();
        if (name.startsWith("minecraft:")) name = name.substring(10);
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
            return { id: numericId, name: `Block ${numericId}`, color, transparent: false };
        }
        if (name !== null) {
            const found = this.findBlockByName(name);
            if (found) return found;
            return { id: 0, name: String(idOrName), color, transparent: false };
        }
        return { id: 0, name: "Unknown Block", color, transparent: false };
    }

    /**
     * Whether a block id or name is transparent.
     *     idOrName ( number | string ) - block id or name.
     * Returns boolean.
     */
    private isTransparent(idOrName: number | string): boolean {
        return this.getBlockById(idOrName, "#888888").transparent;
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
        material.transparent = this.isTransparent(blockId);
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
    private addToHistory(action: string, block: BlockData | null, previousData: BlockData | string | null): void {
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
        this.updateBlockCount();
    }

    /**
     * Save structure to JSON file.
     */
    private save(): void {
        const data: BlockData[] = [];
        for (const block of this.blocks.values()) {
            data.push(this.readBlockData(block));
        }

        const json = JSON.stringify(data, null, 2);
        const timestamp = this.getTimestamp();
        downloadText(`ſןᴜȝ - ${timestamp}.json`, json, "application/json");
    }

    /**
     * Get timestamp using custom clock system.
     */
    private getTimestamp(): string {
        const now = new Date();
        const cax2l = typeof window.cax2lStafl2 === "function" ? window.cax2lStafl2(now) : null;
        const stifeh2 = typeof window.castifeh2 === "function" ? window.castifeh2(now) : null;

        if (cax2l && stifeh2) {
            return `${cax2l.stibix}.${cax2l.pal2stif}.${cax2l.stafl2} - ${stifeh2.haqe}.${stifeh2.qe}.${stifeh2.he}`;
        }

        return ``;
    }

    /**
     * Load structure from file.
     *     event ( Event ) - file input event.
     */
    private load(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

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
     * Update cursor position display.
     *     point ( THREE.Vector3 ) - 3D point.
     */
    private updateCursorPosition(point: THREE.Vector3): void {
        const posEl = document.getElementById("cursorPos");
        if (posEl) {
            posEl.textContent = `${Math.round(point.x)}, ${Math.round(point.y)}, ${Math.round(point.z)}`;
        }
    }

    private updateCameraInfo(): void {
        const infoEl = document.getElementById("cameraInfo");
        if (infoEl) {
            const fov = Math.round(this.camera.fov);
            const angle = Math.round((Math.atan2(this.camera.position.x, this.camera.position.z) * 0o264) / Math.PI);
            infoEl.textContent = `${fov}°, ${angle}°`;
        }
    }

    /**
     * Animation loop.
     */
    private animate(): void {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        if (this.selectedBlock) {
            this.selectionBox.position.copy(this.selectedBlock.position);
        }
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize workspace when DOM is ready.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => new BlockBuilderWorkspace());
} else {
    new BlockBuilderWorkspace();
}
