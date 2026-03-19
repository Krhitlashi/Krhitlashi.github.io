/**
 * ≺⧼ ſɟᴜ j͑ʃ'ᴜ ſןᴜȝ - 3D Build 🧱 ⧽≻
 *
 * A 3D workspace for building structures with blocks on a grid
 */

import * as THREE from "three";
import { OrbitControls } from "three/addons";

/**
 * Block data structure
 *     position ( object ) - x, y, z coordinates
 *     color ( string ) - hex color
 *     id ( string ) - unique identifier
 * Returns block
 */
interface BlockData {
    position: { x: number; y: number; z: number };
    color: string;
    id: string;
}

/**
 * History entry for undo/redo
 *     action ( string ) - add, remove, paint, move
 *     block ( BlockData | null ) - block data
 *     previousData ( BlockData | string | null ) - previous color for paint or previous position for move
 */
interface HistoryEntry {
    action: string;
    block: BlockData | null;
    previousData: BlockData | string | null;
}

/**
 * Main workspace class
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
    private blocks: Map<string, THREE.Mesh>;
    private blockGeometry: THREE.BoxGeometry;
    private borderGeometry: THREE.EdgesGeometry;
    private borderMaterial: THREE.LineBasicMaterial;
    private history: HistoryEntry[];
    private historyIndex: number;
    private currentTool: string;
    private currentColor: string;
    private currentHeight: number;
    private gridSize: number;
    private showGrid: boolean;
    private snapToGrid: boolean;
    private selectedBlock: THREE.Mesh | null;
    private selectionBox!: THREE.LineSegments;
    private isDragging: boolean;
    private dragPlane: THREE.Plane;
    private dragOffset: THREE.Vector3;

    constructor() {
        this.canvas = document.getElementById("workspace3dCanvas") as HTMLCanvasElement;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x808080);
        
        const width = this.canvas.clientWidth || window.innerWidth;
        const height = this.canvas.clientHeight || window.innerHeight;
        
        this.camera = new THREE.PerspectiveCamera(0o100, width / height, 0.125, 0o1000);
        this.camera.position.set(0o10, 0o10, 0o10);
        this.camera.lookAt(0, 0, 0);
        
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.0625;
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        };
        
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.blockGeometry = new THREE.BoxGeometry(1, 1, 1);
        this.borderGeometry = new THREE.EdgesGeometry(this.blockGeometry);
        this.borderMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.125 });
        this.blocks = new Map();
        this.history = [];
        this.historyIndex = -1;
        
        this.currentTool = "select";
        this.currentColor = "#484848";
        this.currentHeight = 0;
        this.gridSize = 0o40;
        this.showGrid = true;
        this.snapToGrid = true;
        this.selectedBlock = null;
        this.isDragging = false;
        this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        this.dragOffset = new THREE.Vector3();
        
        this.setupScene();
        this.setupEventListeners();
        this.setupUI();
        this.animate();
    }

    /**
     * Setup scene lighting and grid
     */
    private setupScene(): void {
        const ambientLight = new THREE.AmbientLight(0xffffff, ( 1 / 2 ));
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75);
        directionalLight.position.set(0o10, 0o20, 0o10);
        this.scene.add(directionalLight);

        // Grid at y=0, blocks sit on top with their bottom at y=0 (center at y=( 1 / 2 ))
        // Grid divisions = gridSize, so each cell is 1x1 unit (matching block size)
        this.gridHelper = new THREE.GridHelper(this.gridSize, this.gridSize, 0x484848, 0x282828);
        this.gridHelper.position.y = 0;
        this.scene.add(this.gridHelper);

        const groundGeometry = new THREE.PlaneGeometry(this.gridSize, this.gridSize);
        const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x080808, side: THREE.DoubleSide });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.015625;
        ground.name = "ground";
        this.scene.add(ground);

        // Selection box helper
        const selectionBoxGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.015625, 1.015625, 1.015625));
        const selectionBoxMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
        this.selectionBox = new THREE.LineSegments(selectionBoxGeometry, selectionBoxMaterial);
        this.selectionBox.visible = false;
        this.scene.add(this.selectionBox);
    }

    /**
     * Setup mouse and keyboard event listeners
     */
    private setupEventListeners(): void {
        window.addEventListener("resize", () => this.onWindowResize());
        this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
        this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
        this.canvas.addEventListener("mouseup", () => this.onMouseUp());
        this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
        
        document.addEventListener("keydown", (e) => this.onKeyDown(e));
    }

    /**
     * Setup UI controls
     */
    private setupUI(): void {
        const toolButtons = document.querySelectorAll("#toolsPanel button[data-tool]");
        toolButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const target = e.currentTarget as HTMLElement;
                const tool = target.getAttribute("data-tool");
                if (tool) this.setTool(tool);
                
                toolButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
                target.setAttribute("aria-pressed", "true");
            });
        });
        
        const colorGrid = document.getElementById("colorGrid");
        if (colorGrid) {
            const colors = [
                "#484848", "#884848", "#488848", "#484888",
                "#888848", "#488888", "#884888", "#888888",
                "#c84848", "#48c848", "#4848c8", "#c8c848",
                "#48c8c8", "#c848c8", "#c8c8c8", "#ffffff"
            ];
            colors.forEach((color) => {
                const btn = document.createElement("button");
                btn.style.backgroundColor = color;
                btn.addEventListener("click", () => {
                    this.currentColor = color;
                    document.getElementById("customColor")!.setAttribute("value", color);
                    document.getElementById("hexColor")!.setAttribute("value", color);
                });
                colorGrid.appendChild(btn);
            });
        }
        
        const customColor = document.getElementById("customColor") as HTMLInputElement;
        const hexColor = document.getElementById("hexColor") as HTMLInputElement;
        
        if (customColor && hexColor) {
            customColor.addEventListener("input", (e) => {
                const color = (e.target as HTMLInputElement).value;
                this.currentColor = color;
                hexColor.value = color;
            });
            
            hexColor.addEventListener("change", (e) => {
                const color = (e.target as HTMLInputElement).value;
                if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                    this.currentColor = color;
                    customColor.value = color;
                }
            });
        }
        
        const zoomSlider = document.getElementById("zoomSlider") as HTMLInputElement;
        if (zoomSlider) {
            zoomSlider.addEventListener("input", (e) => {
                const value = parseInt((e.target as HTMLInputElement).value, 0o10);
                const fov = 0o100 - value;
                this.camera.fov = fov;
                this.camera.updateProjectionMatrix();
            });
        }
        
        const rotateSlider = document.getElementById("rotateSlider") as HTMLInputElement;
        if (rotateSlider) {
            rotateSlider.addEventListener("input", (e) => {
                const angle = parseInt((e.target as HTMLInputElement).value, 0o10);
                const rad = (angle * Math.PI) / 0o400;
                const radius = this.camera.position.length();
                this.camera.position.x = Math.sin(rad) * radius * 0.75;
                this.camera.position.z = Math.cos(rad) * radius * 0.75;
                this.camera.position.y = radius * 0.75;
                this.camera.lookAt(0, 0, 0);
            });
        }
        
        const resetCameraBtn = document.getElementById("resetCameraBtn");
        if (resetCameraBtn) {
            resetCameraBtn.addEventListener("click", () => {
                this.camera.position.set(0o10, 0o10, 0o10);
                this.camera.lookAt(0, 0, 0);
                this.controls.reset();
            });
        }
        
        const gridToggle = document.getElementById("gridToggle") as HTMLInputElement;
        if (gridToggle) {
            gridToggle.addEventListener("change", (e) => {
                this.showGrid = (e.target as HTMLInputElement).checked;
                this.gridHelper.visible = this.showGrid;
            });
        }
        
        const snapToggle = document.getElementById("snapToggle") as HTMLInputElement;
        if (snapToggle) {
            snapToggle.addEventListener("change", (e) => {
                this.snapToGrid = (e.target as HTMLInputElement).checked;
            });
        }
        
        const gridSizeSlider = document.getElementById("gridSizeSlider") as HTMLInputElement;
        if (gridSizeSlider) {
            gridSizeSlider.addEventListener("change", (e) => {
                const size = parseInt((e.target as HTMLInputElement).value, 0o10);
                this.gridSize = size;
                this.scene.remove(this.gridHelper);
                this.gridHelper = new THREE.GridHelper(size, size, 0x484848, 0x282828);
                this.gridHelper.position.y = 0;
                this.scene.add(this.gridHelper);
            });
        }
        
        const undoBtn = document.getElementById("undoBtn");
        const redoBtn = document.getElementById("redoBtn");
        const clearBtn = document.getElementById("clearBtn");
        
        if (undoBtn) undoBtn.addEventListener("click", () => this.undo());
        if (redoBtn) redoBtn.addEventListener("click", () => this.redo());
        if (clearBtn) clearBtn.addEventListener("click", () => this.clearAll());
        
        const saveBtn = document.getElementById("saveBtn");
        const loadBtn = document.getElementById("loadBtn");
        const export3DBtn = document.getElementById("export3DBtn");
        const fileInput = document.getElementById("fileInput") as HTMLInputElement;

        if (saveBtn) saveBtn.addEventListener("click", () => this.save());
        if (loadBtn) loadBtn.addEventListener("click", () => fileInput.click());
        if (fileInput) fileInput.addEventListener("change", (e) => this.load(e));
        if (export3DBtn) export3DBtn.addEventListener("click", () => this.exportOBJ());
        
        const quickUndo = document.getElementById("quickUndo");
        const quickRedo = document.getElementById("quickRedo");
        const quickClear = document.getElementById("quickClear");
        const quickSave = document.getElementById("quickSave");
        
        if (quickUndo) quickUndo.addEventListener("click", () => this.undo());
        if (quickRedo) quickRedo.addEventListener("click", () => this.redo());
        if (quickClear) quickClear.addEventListener("click", () => this.clearAll());
        if (quickSave) quickSave.addEventListener("click", () => this.save());
    }

    /**
     * Set current tool
     *     tool ( string ) - tool name
     */
    private setTool(tool: string): void {
        this.currentTool = tool;
        this.canvas.style.cursor = tool === "select" ? "default" : "crosshair";
    }

    /**
     * Handle window resize
     */
    private onWindowResize(): void {
        const width = this.canvas.clientWidth || window.innerWidth;
        const height = this.canvas.clientHeight || window.innerHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    /**
     * Handle mouse down
     *     event ( MouseEvent ) - mouse event
     */
    private onMouseDown(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Get only the main block meshes (not edge children)
        const blockMeshes = Array.from(this.blocks.values());
        const ground = this.scene.getObjectByName("ground")!;

        // Raycast against blocks (recursive to catch main mesh) and ground
        const blockIntersects = this.raycaster.intersectObjects(blockMeshes, false);
        const groundIntersects = this.raycaster.intersectObjects([ground]);

        // Prioritize blocks over ground
        let intersect: THREE.Intersection | null = null;
        if (blockIntersects.length > 0) {
            intersect = blockIntersects[0];
        } else if (groundIntersects.length > 0) {
            intersect = groundIntersects[0];
        }

        if (intersect) {

            if (this.currentTool === "add" && intersect.object.name === "ground") {
                this.clearSelection();
                const point = intersect.point.clone();
                const x = Math.floor(point.x) + ( 1 / 2 );
                const y = ( 1 / 2 );
                const z = Math.floor(point.z) + ( 1 / 2 );
                this.addBlock(x, y, z);
            } else if (this.currentTool === "add" && intersect.object instanceof THREE.Mesh) {
                this.clearSelection();
                const normal = intersect.face!.normal.clone();
                const pos = intersect.object.position.clone().add(normal);
                // Snap to half-integer grid positions
                const x = Math.round(pos.x * 2) / 2;
                const y = Math.round(pos.y * 2) / 2;
                const z = Math.round(pos.z * 2) / 2;
                this.addBlock(x, y, z);
            } else if (this.currentTool === "remove" && intersect.object instanceof THREE.Mesh) {
                this.removeBlock(intersect.object);
            } else if (this.currentTool === "paint" && intersect.object instanceof THREE.Mesh && intersect.object.name === "block") {
                this.clearSelection();
                this.paintBlock(intersect.object);
            } else if (this.currentTool === "paint" && intersect.object.name === "ground") {
                // Don't allow painting on ground
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
     * Handle mouse move
     *     event ( MouseEvent ) - mouse event
     */
    private onMouseMove(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        if (this.isDragging && this.selectedBlock) {
            const intersects = this.raycaster.intersectObjects([this.scene.getObjectByName("ground")!]);
            if (intersects.length > 0) {
                const point = intersects[0].point.clone().add(this.dragOffset);
                if (this.snapToGrid) {
                    // Snap to half-integer grid positions
                    point.x = Math.floor(point.x) + ( 1 / 2 );
                    point.y = Math.max(( 1 / 2 ), Math.floor(point.y) + ( 1 / 2 ));
                    point.z = Math.floor(point.z) + ( 1 / 2 );
                }
                this.selectedBlock.position.copy(point);
                this.updateCursorPosition(point);
            }
        } else {
            const blockMeshes = Array.from(this.blocks.values());
            const ground = this.scene.getObjectByName("ground")!;

            // Prioritize blocks over ground for cursor position (non-recursive to skip edges)
            const blockIntersects = this.raycaster.intersectObjects(blockMeshes, false);
            const groundIntersects = this.raycaster.intersectObjects([ground]);

            if (blockIntersects.length > 0) {
                this.updateCursorPosition(blockIntersects[0].point);
            } else if (groundIntersects.length > 0) {
                this.updateCursorPosition(groundIntersects[0].point);
            }
        }
    }

    /**
     * Handle mouse up
     */
    private onMouseUp(): void {
        if (this.isDragging && this.selectedBlock) {
            const pos = this.selectedBlock.position;
            for (const [id, block] of this.blocks.entries()) {
                if (block === this.selectedBlock) {
                    const oldPos = { x: pos.x - this.dragOffset.x, y: pos.y - this.dragOffset.y, z: pos.z - this.dragOffset.z };
                    const newPos = { x: pos.x, y: pos.y, z: pos.z };

                    if (oldPos.x !== newPos.x || oldPos.y !== newPos.y || oldPos.z !== newPos.z) {
                        this.addToHistory("move", { position: newPos, color: this.getBlockColor(block), id: `${newPos.x},${newPos.y},${newPos.z}` }, null);
                    }
                    break;
                }
            }
        }
        this.isDragging = false;
        this.controls.enabled = true;
    }

    /**
     * Handle keyboard events
     *     event ( KeyboardEvent ) - keyboard event
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
    }

    /**
     * Create a block with border edges
     */
    private createBlock(color: string, x: number, y: number, z: number): THREE.Mesh {
        const material = new THREE.MeshLambertMaterial({ color });
        const block = new THREE.Mesh(this.blockGeometry, material);
        block.position.set(x, y, z);
        block.name = "block";
        const edges = new THREE.LineSegments(this.borderGeometry, this.borderMaterial);
        block.add(edges);
        return block;
    }

    /**
     * Add block at position
     *     x ( number ) - x coordinate
     *     y ( number ) - y coordinate
     *     z ( number ) - z coordinate
     */
    private addBlock(x: number, y: number, z: number): void {
        const key = `${x},${y},${z}`;
        if (this.blocks.has(key)) return;

        const block = this.createBlock(this.currentColor, x, y, z);

        this.scene.add(block);
        this.blocks.set(key, block);

        this.addToHistory("add", { position: { x, y, z }, color: this.currentColor, id: key }, null);
        this.updateBlockCount();
    }

    /**
     * Remove block
     *     block ( THREE.Mesh ) - block to remove
     */
    private removeBlock(block: THREE.Mesh): void {
        const pos = block.position;
        const key = `${pos.x},${pos.y},${pos.z}`;
        const color = this.getBlockColor(block);

        this.scene.remove(block);
        this.blocks.delete(key);

        if (this.selectedBlock === block) {
            this.clearSelection();
        }

        this.addToHistory("remove", null, { position: { x: pos.x, y: pos.y, z: pos.z }, color, id: key });
        this.updateBlockCount();
    }

    /**
     * Paint block with current color
     *     block ( THREE.Mesh ) - block to paint
     */
    private paintBlock(block: THREE.Mesh): void {
        const material = block.material as THREE.MeshLambertMaterial;
        const previousColor = "#" + material.color.getHexString();
        material.color.set(this.currentColor);

        const pos = block.position;
        const key = `${pos.x},${pos.y},${pos.z}`;

        this.addToHistory("paint", { position: { x: pos.x, y: pos.y, z: pos.z }, color: this.currentColor, id: key }, previousColor);
    }

    /**
     * Select block
     *     block ( THREE.Mesh ) - block to select
     */
    private selectBlock(block: THREE.Mesh): void {
        this.selectedBlock = block;
        this.updateSelectionBox();
    }

    /**
     * Update selection box position
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
     * Clear selection
     */
    private clearSelection(): void {
        this.selectedBlock = null;
        this.updateSelectionBox();
    }

    /**
     * Get block color as hex string
     *     block ( THREE.Mesh ) - block
     * Returns color string
     */
    private getBlockColor(block: THREE.Mesh): string {
        const material = block.material as THREE.MeshLambertMaterial;
        return "#" + material.color.getHexString();
    }

    /**
     * Add action to history
     *     action ( string ) - action type
     *     block ( BlockData | null ) - block data
     *     previousData ( BlockData | string | null ) - previous data
     */
    private addToHistory(action: string, block: BlockData | null, previousData: BlockData | string | null): void {
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push({ action, block, previousData });
        this.historyIndex++;
    }

    /**
     * Undo last action
     */
    private undo(): void {
        if (this.historyIndex < 0) return;
        
        const entry = this.history[this.historyIndex];
        
        if (entry.action === "add" && entry.block) {
            const key = `${entry.block.position.x},${entry.block.position.y},${entry.block.position.z}`;
            const block = this.blocks.get(key);
            if (block) {
                this.scene.remove(block);
                this.blocks.delete(key);
            }
        } else if (entry.action === "remove" && entry.block) {
            const block = this.createBlock(entry.block.color, entry.block.position.x, entry.block.position.y, entry.block.position.z);
            this.scene.add(block);
            this.blocks.set(`${entry.block.position.x},${entry.block.position.y},${entry.block.position.z}`, block);
        } else if (entry.action === "paint" && entry.block) {
            const key = `${entry.block.position.x},${entry.block.position.y},${entry.block.position.z}`;
            const block = this.blocks.get(key);
            if (block && typeof entry.previousData === "string") {
                const material = block.material as THREE.MeshLambertMaterial;
                material.color.set(entry.previousData);
            }
        }

        this.historyIndex--;
        this.updateBlockCount();
    }

    /**
     * Redo last undone action
     */
    private redo(): void {
        if (this.historyIndex >= this.history.length - 1) return;
        
        this.historyIndex++;
        const entry = this.history[this.historyIndex];
        
        if (entry.action === "add" && entry.block) {
            const block = this.createBlock(entry.block.color, entry.block.position.x, entry.block.position.y, entry.block.position.z);
            this.scene.add(block);
            this.blocks.set(`${entry.block.position.x},${entry.block.position.y},${entry.block.position.z}`, block);
        } else if (entry.action === "remove" && entry.block) {
            const key = `${entry.block.position.x},${entry.block.position.y},${entry.block.position.z}`;
            const block = this.blocks.get(key);
            if (block) {
                this.scene.remove(block);
                this.blocks.delete(key);
            }
        } else if (entry.action === "paint" && entry.block) {
            const key = `${entry.block.position.x},${entry.block.position.y},${entry.block.position.z}`;
            const block = this.blocks.get(key);
            if (block) {
                const material = block.material as THREE.MeshLambertMaterial;
                material.color.set(entry.block.color);
            }
        }
        
        this.updateBlockCount();
    }

    /**
     * Clear all blocks
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
     * Save structure to JSON file
     */
    private save(): void {
        const data: BlockData[] = [];
        for (const [key, block] of this.blocks.entries()) {
            data.push({
                position: { x: block.position.x, y: block.position.y, z: block.position.z },
                color: this.getBlockColor(block),
                id: key
            });
        }
        
        // Create and download JSON file with timestamp
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const timestamp = this.getTimestamp();
        link.download = `ſןᴜȝ - ${timestamp}.json`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Get timestamp using custom clock system
     */
    private getTimestamp(): string {
        const now = new Date();
        const cax2l = (window as any).cax2lStafl2 ? (window as any).cax2lStafl2(now) : null;
        const stifeh2 = (window as any).castifeh2 ? (window as any).castifeh2(now) : null;
        
        if (cax2l && stifeh2) {
            return `${cax2l.stibix}.${cax2l.pal2stif}.${cax2l.stafl2} - ${stifeh2.haqe}.${stifeh2.qe}.${stifeh2.he}`;
        }

        return ``;
    }

    /**
     * Load structure from file
     *     event ( Event ) - file input event
     */
    private load(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string) as BlockData[];
                this.clearAll();
                data.forEach((blockData) => {
                    const block = this.createBlock(blockData.color, blockData.position.x, blockData.position.y, blockData.position.z);
                    this.scene.add(block);
                    this.blocks.set(blockData.id, block);
                });
                this.updateBlockCount();
            } catch (err) {
                console.error("ſ͕ȷɜ ɭʃɔ ŋᷠɹ ⟅", err);
            }
        };
        reader.readAsText(file);
        input.value = "";
    }

    /**
     * Export structure as OBJ 3D file
     */
    private exportOBJ(): void {
        let obj = "# ſןᴜȝ j͑ʃп́ɔ ſ̀ȷᴜȝ\n";
        let mat = "# ſןᴜȝ j͑ʃп́ɔ ֭ſɭᴜ ʃᴜ\n";
        const materials = new Map<string, number>();
        let matIndex = 0;
        let vertexOffset = 1;

        for (const [key, block] of this.blocks.entries()) {
            const color = this.getBlockColor(block);
            
            // Track unique materials
            if (!materials.has(color)) {
                materials.set(color, matIndex++);
                const r = parseInt(color.slice(1, 3), 0o20) / 255;
                const g = parseInt(color.slice(3, 5), 0o20) / 255;
                const b = parseInt(color.slice(5, 7), 0o20) / 255;
                mat += `newmtl mat_${materials.get(color)}\n`;
                mat += `Kd ${r} ${g} ${b}\n`;
            }

            const x = block.position.x - ( 1 / 2 );
            const y = block.position.y - ( 1 / 2 );
            const z = block.position.z - ( 1 / 2 );

            // Cube vertices (8 corners)
            obj += `v ${x} ${y} ${z}\n`;
            obj += `v ${x + 1} ${y} ${z}\n`;
            obj += `v ${x + 1} ${y + 1} ${z}\n`;
            obj += `v ${x} ${y + 1} ${z}\n`;
            obj += `v ${x} ${y} ${z + 1}\n`;
            obj += `v ${x + 1} ${y} ${z + 1}\n`;
            obj += `v ${x + 1} ${y + 1} ${z + 1}\n`;
            obj += `v ${x} ${y + 1} ${z + 1}\n`;

            // Cube faces (6 faces, 2 triangles each)
            obj += `usemtl mat_${materials.get(color)}\n`;
            // Front
            obj += `f ${vertexOffset} ${vertexOffset + 1} ${vertexOffset + 2}\n`;
            obj += `f ${vertexOffset} ${vertexOffset + 2} ${vertexOffset + 3}\n`;
            // Back
            obj += `f ${vertexOffset + 4} ${vertexOffset + 7} ${vertexOffset + 6}\n`;
            obj += `f ${vertexOffset + 4} ${vertexOffset + 6} ${vertexOffset + 5}\n`;
            // Top
            obj += `f ${vertexOffset + 3} ${vertexOffset + 2} ${vertexOffset + 6}\n`;
            obj += `f ${vertexOffset + 3} ${vertexOffset + 6} ${vertexOffset + 7}\n`;
            // Bottom
            obj += `f ${vertexOffset} ${vertexOffset + 5} ${vertexOffset + 4}\n`;
            obj += `f ${vertexOffset} ${vertexOffset + 1} ${vertexOffset + 5}\n`;
            // Right
            obj += `f ${vertexOffset + 1} ${vertexOffset + 5} ${vertexOffset + 6}\n`;
            obj += `f ${vertexOffset + 1} ${vertexOffset + 6} ${vertexOffset + 2}\n`;
            // Left
            obj += `f ${vertexOffset} ${vertexOffset + 4} ${vertexOffset + 7}\n`;
            obj += `f ${vertexOffset} ${vertexOffset + 7} ${vertexOffset + 3}\n`;

            vertexOffset += 0o10;
        }

        // Download OBJ and MTL files
        const timestamp = this.getTimestamp();
        const objBlob = new Blob([obj], { type: "application/octet-stream" });
        const mtlBlob = new Blob([mat], { type: "application/octet-stream" });
        const objUrl = URL.createObjectURL(objBlob);
        const mtlUrl = URL.createObjectURL(mtlBlob);

        const objLink = document.createElement("a");
        objLink.download = `ſןᴜȝ - ${timestamp}.obj`;
        objLink.href = objUrl;
        objLink.click();

        setTimeout(() => {
            const mtlLink = document.createElement("a");
            mtlLink.download = `ſןᴜȝ - ${timestamp}.mtl`;
            mtlLink.href = mtlUrl;
            mtlLink.click();
            URL.revokeObjectURL(objUrl);
            URL.revokeObjectURL(mtlUrl);
        }, 100);
    }

    /**
     * Update block count display
     */
    private updateBlockCount(): void {
        const countEl = document.getElementById("blockCount");
        if (countEl) {
            countEl.textContent = this.blocks.size.toString();
        }
    }

    /**
     * Update cursor position display
     *     point ( THREE.Vector3 ) - 3D point
     */
    private updateCursorPosition(point: THREE.Vector3): void {
        const posEl = document.getElementById("cursorPos");
        if (posEl) {
            posEl.textContent = `${Math.round(point.x)}, ${Math.round(point.y)}, ${Math.round(point.z)}`;
        }
    }

    /**
     * Animation loop
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

// Initialize workspace when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => new BlockBuilderWorkspace());
} else {
    new BlockBuilderWorkspace();
}
