// ≺⧼ Whiteboard Application - Main ⧽≻

import {
    canvas, ctx, state, panState, spaceState, layerState, objectState, pathState, textState, eraserState, historyState, connectionState,
    clipboardState, pageState, touchGestureState,
    CANVAS_WIDTH, CANVAS_HEIGHT, HANDLE_SIZE, HANDLE_RADIUS, CORNER_RADIUS,
    ROTATE_HANDLE_OFFSET, ROTATE_HANDLE_RADIUS, MIN_ZOOM, MAX_ZOOM,
    ZOOM_STEP_NUM, ZOOM_STEP_DEN, WHEEL_ZOOM_NUM, WHEEL_ZOOM_DEN, SMOOTHING_FACTOR,
    TEXT_SIZE_MULTIPLIER, TEXT_MIN_WIDTH_MULTIPLIER, HISTORY_MAX, ZOOM_BASE,
    LINE_DASH_PATTERN, SELECTION_LINE_WIDTH, HANDLE_FILL_COLOR, HANDLE_STROKE_COLOR, SELECTION_STROKE_COLOR,

    WhiteboardObject, Point, Layer, Page
} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import {
    getClientCoords, generateId, resetCursor, setCursor, getToolCursor,
    resetSelectionState, stopPanning,
    setButtonPressed, initButtonGroup, initButton, initButtons,
    startTextEdit, positionTextEditInput, getTextEditPosition, finishTextEditCommon,
    getObjectBounds,
    getCenter, getCenterX, getCenterY,
    TouchOrMouseEvent,
    findObjectAtPoint,

    drawRoundedRectPath, drawShapePath, createShapeObject,
    createPathObject, drawPathSegments, drawPathPreview,
    drawPreviewShape,
    normalizeRect, isObjectInRect,
    normalizeHexColor, isValidHexColor, getContrastingColors,
    getObjectInitialState, invalidateTextCaches,
    getHandles, findResizeHandle, findRotateHandle, getResizeCursor, resizeObject,

    moveObjectByDelta,
    eraseObjectsAlongPath,




    getConnectionEndpoints
} from "./ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

// ⟪ Layer Manager Class 📋 ⟫

class LayerManager {
    layers: Layer[];
    activeId: number;
    counter: number;

    constructor() {
        this.layers = [];
        this.activeId = 0;
        this.counter = 0;
    }

    create( name?: string ): Layer {
        this.counter++;
        const layer: Layer = {
            id: this.counter,
            name: name || `ꞙɭ${this.counter} ɭ(ꞇ ɭʃᴜ }ʃɔƽ`,
            visible: true,
            objects: []
        };
        this.layers.push( layer );
        this.activeId = this.counter;
        return layer;
    }

    delete( layerId: number ): boolean {
        if ( this.layers.length <= 1 ) return false;
        const index = this.layers.findIndex( l => l.id === layerId );
        if ( index === -1 ) return false;

        objectState.objects = objectState.objects.filter( o => o.layerId !== layerId );
        this.layers.splice( index, 1 );

        if ( this.activeId === layerId ) {
            this.activeId = this.layers[ 0 ].id;
        }
        return true;
    }

    move( layerId: number, direction: number ): boolean {
        const index = this.layers.findIndex( l => l.id === layerId );
        const swapIndex = index + direction;
        if ( swapIndex < 0 || swapIndex >= this.layers.length ) return false;

        [ this.layers[ index ], this.layers[ swapIndex ] ] =
            [ this.layers[ swapIndex ], this.layers[ index ] ];
        return true;
    }

    toggleVisibility( layerId: number ): boolean {
        const layer = this.layers.find( l => l.id === layerId );
        if ( layer ) {
            layer.visible = !layer.visible;
            return true;
        }
        return false;
    }

    setActive( layerId: number ): void {
        this.activeId = layerId;
    }

    getActive(): Layer | undefined {
        return this.layers.find( l => l.id === this.activeId );
    }

    isVisible( layerId: number ): boolean {
        return this.layers.find( l => l.id === layerId )?.visible ?? false;
    }

    syncToLayerState(): void {
        layerState.layers = this.layers;
        layerState.activeId = this.activeId;
        layerState.counter = this.counter;
    }
}

const layerManager = new LayerManager();

// ⟪ Page Manager Class 📄 ⟫

class PageManager {
    pages: Page[];
    activeId: number;
    counter: number;

    constructor() {
        this.pages = [];
        this.activeId = 0;
        this.counter = 0;
    }

    create( name?: string ): Page {
        this.counter++;
        const page: Page = {
            id: this.counter,
            name: name || `ꞙɭ${this.counter} ɭ(ꞇ ɭʃᴜ }ʃɔƽ`,
            visible: true,
            objects: []
        };
        this.pages.push( page );
        this.activeId = this.counter;

        if ( this.counter > 1 ) {
            this.createPageContainer( page );
        }

        this.showPage( page.id );
        return page;
    }

    createPageContainer( page: Page ): void {
        const mainContainer = document.getElementById( "whiteboardContainer" );
        if ( !mainContainer?.parentNode ) return;

        document.getElementById( `page-${page.id}` )?.remove();

        const pageContainer = document.createElement( "div" );
        pageContainer.id = `page-${page.id}`;
        pageContainer.className = "whiteboard-container";
        pageContainer.dataset.pageId = page.id.toString();
        pageContainer.style.display = "none";

        const canvasWrapper = document.createElement( "div" );
        canvasWrapper.className = "whiteboard-canvas-wrapper";

        const pageCanvas = document.createElement( "canvas" );
        pageCanvas.id = `pageCanvas-${page.id}`;
        pageCanvas.className = "whiteboard-canvas";
        pageCanvas.width = CANVAS_WIDTH;
        pageCanvas.height = CANVAS_HEIGHT;

        const ctx = pageCanvas.getContext( "2d" );
        if ( ctx ) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect( 0, 0, pageCanvas.width, pageCanvas.height );
        }

        canvasWrapper.appendChild( pageCanvas );
        pageContainer.appendChild( canvasWrapper );
        mainContainer.parentNode.insertBefore( pageContainer, mainContainer.nextSibling );
    }

    removePageCanvas( pageId: number ): void {
        document.getElementById( `page-${pageId}` )?.remove();
    }

    delete( pageId: number ): boolean {
        if ( this.pages.length <= 1 ) return false;
        const index = this.pages.findIndex( p => p.id === pageId );
        if ( index === -1 ) return false;

        this.removePageCanvas( pageId );
        this.pages.splice( index, 1 );

        if ( this.activeId === pageId ) {
            this.activeId = this.pages[ 0 ].id;
        }
        return true;
    }

    toggleVisibility( pageId: number ): boolean {
        const page = this.pages.find( p => p.id === pageId );
        if ( !page ) return false;

        page.visible = !page.visible;
        const container = this.getPageContainer( pageId );
        if ( container ) {
            container.style.display = page.visible ? "flex" : "none";
        }
        return true;
    }

    setActive( pageId: number ): void {
        this.activeId = pageId;
        this.showPage( pageId );
    }

    getActive(): Page | undefined {
        return this.pages.find( p => p.id === this.activeId );
    }

    getPageContainer( pageId: number ): HTMLElement | null {
        return pageId === 1
            ? document.getElementById( "whiteboardContainer" )
            : document.getElementById( `page-${pageId}` );
    }

    showPage( pageId: number ): void {
        const activePage = this.pages.find( p => p.id === pageId );

        this.pages.forEach( p => {
            const container = this.getPageContainer( p.id );
            if ( container ) {
                container.style.display = ( p.id === pageId && p.visible ) ? "flex" : "none";
            }
        } );

        if ( activePage ) {
            switchToPageCanvas( activePage );
        }
    }

    isVisible( pageId: number ): boolean {
        return this.pages.find( p => p.id === pageId )?.visible ?? false;
    }

    syncToPageState(): void {
        pageState.pages = this.pages;
        pageState.activeId = this.activeId;
        pageState.counter = this.counter;
    }
}

const pageManager = new PageManager();

// ⟪ Page Canvas Management 📄 ⟫

let currentCanvas: HTMLCanvasElement | null = canvas;
let currentCtx: CanvasRenderingContext2D | null = ctx;

function switchToPageCanvas( page: Page ): void {
    const pageCanvas = page.id === 1
        ? document.getElementById( "whiteboardCanvas" ) as HTMLCanvasElement
        : document.getElementById( `pageCanvas-${page.id}` ) as HTMLCanvasElement;

    if ( !pageCanvas ) return;

    syncPageObjects();

    currentCanvas = pageCanvas;
    currentCtx = pageCanvas.getContext( "2d" );

    objectState.objects = page.objects;
    objectState.selected = [];

    redrawCanvas();
}

function getCurrentCanvas(): HTMLCanvasElement | null {
    return currentCanvas;
}

function getCurrentCtx(): CanvasRenderingContext2D | null {
    return currentCtx;
}

function syncPageObjects(): void {
    const activePage = pageManager.getActive();
    if ( activePage ) {
        activePage.objects = [ ...objectState.objects ];
    }
}

// ⟪ Initialization 🚀 ⟫

function init(): void {
    initCanvas();
    initLayers();
    initPages();
    initTextEditInput();
    initColors();
    initToolsAndShapes();
    initSizeSlider();
    initToolbar();
    initCanvasEvents();
    initActions();
    initLayerControls();
    initPageControls();
    initZoom();
    initFileOperations();
    saveState();
}

function initCanvas(): void {
    if ( !currentCanvas ) return;
    currentCanvas.width = CANVAS_WIDTH;
    currentCanvas.height = CANVAS_HEIGHT;

    currentCtx!.fillStyle = "#ffffff";
    currentCtx!.fillRect( 0, 0, currentCanvas.width, currentCanvas.height );

    document.getElementById( "canvasSize" )!.textContent = `${currentCanvas.width} × ${currentCanvas.height}`;
}

function initLayers(): void {
    layerManager.layers = [];
    layerManager.counter = 0;
    layerManager.create( "ꞙɭı ɭ(ꞇ ɭʃᴜ }ʃɔƽ" );
    layerManager.syncToLayerState();
    renderLayerList();
}

function initPages(): void {
    pageManager.pages = [];
    pageManager.counter = 0;
    pageManager.create( "ꞙɭı ɭ(ꞇ ɭʃᴜ }ʃɔƽ" );
    pageManager.syncToPageState();
    renderPageList();
}

// ⟪ Layer Management 📚 ⟫

function syncLayersAndSave(): void {
    layerManager.syncToLayerState();
    renderLayerList();
    redrawCanvas();
    saveState();
}

function addLayer(): void {
    layerManager.create();
    syncLayersAndSave();
}

function deleteLayer(): void {
    if ( layerManager.delete( layerState.activeId ) ) syncLayersAndSave();
}

function moveLayer( direction: number ): void {
    if ( layerManager.move( layerState.activeId, direction ) ) {
        layerManager.syncToLayerState();
        renderLayerList();
        saveState();
    }
}

function toggleLayerVisibility( layerId: number ): void {
    if ( layerManager.toggleVisibility( layerId ) ) syncLayersAndSave();
}

function selectLayer( layerId: number ): void {
    layerManager.setActive( layerId );
    layerManager.syncToLayerState();
    renderLayerList();
}

function renderLayerList(): void {
    const layerList = document.getElementById( "layerList" );
    if ( !layerList ) return;

    layerList.innerHTML = "";

    layerState.layers.slice().reverse().forEach( layer => {
        const layerItem = document.createElement( "button" );
        layerItem.setAttribute( "aria-pressed", layer.id === layerState.activeId ? "true" : "false" );
        layerItem.innerHTML = `
            <span>${layer.name}</span>
            <span class="layer-visibility" data-visible="${layer.visible}"></span>
        `;
        layerItem.addEventListener( "click", ( e ) => {
            if ( ( e.target as HTMLElement ).classList.contains( "layer-visibility" ) ) {
                toggleLayerVisibility( layer.id );
            } else {
                selectLayer( layer.id );
            }
        } );
        layerList.appendChild( layerItem );
    } );
}

// ⟪ Page Management 📄 ⟫

function syncPagesAndSave(): void {
    pageManager.syncToPageState();
    renderPageList();
    redrawCanvas();
    saveState();
}

function addPage(): void {
    pageManager.create();
    syncPagesAndSave();
}

function deletePage(): void {
    if ( pageManager.delete( pageState.activeId ) ) syncPagesAndSave();
}


function togglePageVisibility( pageId: number ): void {
    if ( pageManager.toggleVisibility( pageId ) ) syncPagesAndSave();
}

function selectPage( pageId: number ): void {
    pageManager.setActive( pageId );
    pageManager.syncToPageState();
    renderPageList();
}

function renderPageList(): void {
    const pageList = document.getElementById( "pageList" );
    if ( !pageList ) return;

    pageList.innerHTML = "";

    pageState.pages.forEach( page => {
        const pageItem = document.createElement( "button" );
        pageItem.setAttribute( "aria-pressed", page.id === pageState.activeId ? "true" : "false" );
        pageItem.innerHTML = `
            <span>${page.name}</span>
            <span class="page-visibility" data-visible="${page.visible}"></span>
        `;
        pageItem.addEventListener( "click", ( e ) => {
            const target = e.target as HTMLElement;
            if ( target.classList.contains( "page-visibility" ) ) {
                togglePageVisibility( page.id );
            } else {
                selectPage( page.id );
            }
        } );
        pageList.appendChild( pageItem );
    } );
}


// ⟪ Text Editing 📝 ⟫

function removeEmptyTextObject( index: number ): void {
    if ( index >= 0 && objectState.objects[ index ] ) {
        objectState.objects.splice( index, 1 );
        objectState.selected = [];
        updateTransformControls();
        redrawCanvas();
        saveState();
    }
}

function initTextEditInput(): void {
    textState.input = document.createElement( "textarea" );
    textState.input.className = "text-edit-input";

    textState.input.addEventListener( "blur", finishTextEditing );
    textState.input.addEventListener( "keydown", ( e ) => {
        if ( e.key === "Escape" ) {
            e.preventDefault();
            cancelTextEditing();
        } else if ( e.key === "Enter" && !e.shiftKey ) {
            e.preventDefault();
            finishTextEditing();
        }
    } );
    textState.input.addEventListener( "input", () => {
        if ( textState.editingIndex >= 0 && objectState.objects[ textState.editingIndex ] ) {
            const obj = objectState.objects[ textState.editingIndex ];
            obj.text = textState.input!.value;
            obj.textDirty = true;
            obj.cachedCanvas = null;
            obj.cachedWidth = null;
            obj.cachedHeight = null;
            redrawCanvas();
        }
    } );

    document.getElementById( "whiteboardContainer" )!.appendChild( textState.input );
}

function finishTextEditing(): void {
    if ( !textState.isEditing || !textState.input ) return;

    const text = textState.input.value;

    if ( textState.editingIndex >= 0 && objectState.objects[ textState.editingIndex ] ) {
        const obj = objectState.objects[ textState.editingIndex ];

        if ( text.trim() === "" ) {
            removeEmptyTextObject( textState.editingIndex );
            finishTextEditCommon();
            return;
        }

        obj.text = text;
        obj.color = state.color;
        obj.textDirty = true;
        obj.cachedCanvas = null;
        obj.cachedWidth = null;
        obj.cachedHeight = null;
        redrawCanvas();
    } else if ( text.trim() !== "" ) {
        const { textX, textY } = getTextEditPosition();
        objectState.objects.push( {
            type: "text",
            x: textX, y: textY,
            text: text,
            color: state.color,
            size: state.size * TEXT_SIZE_MULTIPLIER,
            rotation: 0,
            layerId: layerState.activeId,
            useHtmlText: textState.useHtml,
            textDirty: true,
            cachedWidth: null,
            cachedHeight: null
        } );
        redrawCanvas();
    }

    finishTextEditCommon();
    saveState();
}

function cancelTextEditing(): void {
    if ( !textState.isEditing || !textState.input ) return;

    if ( textState.editingIndex >= 0 && objectState.objects[ textState.editingIndex ]?.text?.trim() === "" ) {
        removeEmptyTextObject( textState.editingIndex );
    } else {
        finishTextEditCommon();
    }
}

function editTextObject( obj: WhiteboardObject ): void {
    startTextEdit();
    textState.isEditing = true;
    textState.editingIndex = objectState.objects.indexOf( obj );
    positionTextEditInput( obj.x!, obj.y!, obj.size!, obj.color! );
    textState.input!.value = obj.text || "";
    textState.input!.classList.add( "visible" );
    textState.input!.focus();
    textState.input!.select();
}

// ⟪ UI Initialization 🎨 ⟫

function initColors(): void {
    const colorGrid = document.getElementById( "colorGrid" );
    if ( !colorGrid ) return;

    initButtonGroup( "#colorGrid button[data-color]", "#colorGrid button", ( btn ) => {
        state.color = btn.dataset.color!;
    } );

    initCustomColor();
}

function initCustomColor(): void {
    const colorPicker = document.getElementById( "customColor" ) as HTMLInputElement | null;
    const hexInput = document.getElementById( "hexColor" ) as HTMLInputElement | null;

    if ( !colorPicker || !hexInput ) return;

    colorPicker.addEventListener( "input", () => {
        const color = colorPicker.value;
        hexInput.value = color.toUpperCase();
        state.color = color;
        setButtonPressed( "#colorGrid button", null );
    } );

    hexInput.addEventListener( "input", () => {
        const value = normalizeHexColor( hexInput.value );
        if ( isValidHexColor( value ) ) {
            colorPicker.value = value;
            state.color = value;
            setButtonPressed( "#colorGrid button", null );
        }
    } );

    hexInput.addEventListener( "blur", () => {
        const value = normalizeHexColor( hexInput.value );
        if ( isValidHexColor( value ) ) {
            hexInput.value = value.toUpperCase();
        }
    } );
}

function initToolsAndShapes(): void {
    initButtonGroup( "button[data-tool]", "button[data-tool]", ( btn ) => {
        state.tool = btn.dataset.tool!;
        if ( canvas ) canvas.dataset.tool = state.tool;
        updateTransformControls();
        if ( !panState.isPanning && !state.isDrawing ) setCursor( getToolCursor() );
    } );

    initButtonGroup( "button[data-shape]", "button[data-shape]", ( btn ) => {
        state.shape = btn.dataset.shape!;
        state.tool = "shape";
        if ( canvas ) canvas.dataset.tool = "shape";
        updateTransformControls();
        if ( !panState.isPanning && !state.isDrawing ) setCursor( getToolCursor() );
    } );

    const htmlTextCheckbox = document.getElementById( "htmlTextCheckbox" ) as HTMLInputElement | null;
    if ( htmlTextCheckbox ) {
        textState.useHtml = htmlTextCheckbox.checked;
        htmlTextCheckbox.addEventListener( "change", () => { textState.useHtml = htmlTextCheckbox.checked; } );
    }

    const eraserModeCheckbox = document.getElementById( "eraserModeCheckbox" ) as HTMLInputElement | null;
    if ( eraserModeCheckbox ) {
        eraserState.eraseObjects = eraserModeCheckbox.checked;
        eraserModeCheckbox.addEventListener( "change", () => { eraserState.eraseObjects = eraserModeCheckbox.checked; } );
    }
}

function initSizeSlider(): void {
    const slider = document.getElementById( "brushSize" ) as HTMLInputElement;
    const valueDisplay = document.getElementById( "brushSizeValue" );

    slider.addEventListener( "input", () => {
        state.size = parseInt( slider.value );
        valueDisplay!.textContent = state.size.toString();
    } );
}

function initToolbar(): void {
    const toolbar = document.getElementById( "toolbarContainer" );
    initButton( "toolbarToggle", () => {
        if ( toolbar ) ( window as any ).a3esoza( toolbar );
    } );
}

// ⟪ History & Undo/Redo 📚 ⟫

function saveState(): void {
    historyState.history = historyState.history.slice( 0, historyState.index + 1 );

    syncPageObjects();

    const stateData = {
        layers: JSON.parse( JSON.stringify( layerState.layers ) ),
        pages: JSON.parse( JSON.stringify( pageState.pages ) )
    };

    historyState.history.push( JSON.stringify( stateData ) );
    historyState.index++;

    if ( historyState.history.length > HISTORY_MAX ) {
        historyState.history.shift();
        historyState.index--;
    }

    updateUndoRedoButtons();
}

function undo(): void { changeHistory( -1 ); }
function redo(): void { changeHistory( 1 ); }

function changeHistory( direction: number ): void {
    const newIndex = historyState.index + direction;
    if ( newIndex < 0 || newIndex >= historyState.history.length ) return;

    historyState.index = newIndex;
    const stateData = JSON.parse( historyState.history[ historyState.index ] );
    layerState.layers = stateData.layers;
    pageState.pages = stateData.pages;

    const activePage = pageManager.getActive();
    if ( activePage ) {
        objectState.objects = activePage.objects;
    }

    renderLayerList();
    redrawCanvas();
    updateUndoRedoButtons();
}

function updateUndoRedoButtons(): void {
    const btnStates = [
        { ids: [ "undoBtn", "quickUndo" ], disabled: historyState.index <= 0 },
        { ids: [ "redoBtn", "quickRedo" ], disabled: historyState.index >= historyState.history.length - 1 }
    ];

    btnStates.forEach( ( { ids, disabled } ) => {
        ids.forEach( id => {
            const btn = document.getElementById( id );
            if ( btn ) ( btn as HTMLButtonElement ).disabled = disabled;
        } );
    } );
}

// ⟪ Canvas Input & Drawing ✏️ ⟫

function getCanvasCoords( e: TouchOrMouseEvent ): Point {
    if ( !canvas ) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const zoom = state.zoomNum / state.zoomDen;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const coords = getClientCoords( e );

    return {
        x: ( coords.x - rect.left ) * scaleX,
        y: ( coords.y - rect.top ) * scaleY
    };
}

function startDrawing( e: TouchOrMouseEvent ): void {
    e.preventDefault();
    state.isDrawing = true;

    const coords = getCanvasCoords( e );
    state.startX = coords.x;
    state.startY = coords.y;
    state.lastX = coords.x;
    state.lastY = coords.y;

    switch ( state.tool ) {
        case "select":
            handleSelectToolClick( coords.x, coords.y, e );
            return;
        case "pen":
        case "eraser":
            pathState.current = [ { x: coords.x, y: coords.y } ];
            break;
        case "smooth":
            pathState.smooth = [ { x: coords.x, y: coords.y } ];
            pathState.smoothX = coords.x;
            pathState.smoothY = coords.y;
            break;
        case "shape":
            if ( state.shape ) pathState.preview = createShapeObject( state.shape, state.startX, state.startY, coords.x, coords.y );
            break;
        case "text":
            createTextBox( state.startX, state.startY );
            state.isDrawing = false;
            break;
        case "connect":
            const clickedObject = findObjectAtPoint( coords.x, coords.y );
            if ( clickedObject ) {
                if ( !clickedObject.id ) clickedObject.id = generateId();
                connectionState.startObj = clickedObject;
            } else {
                state.isDrawing = false;
            }
            break;
    }
}

function createTextBox( x: number, y: number ): void {
    const textObj: WhiteboardObject = {
        type: "text", x: x, y: y,
        text: "", color: state.color,
        size: state.size * TEXT_SIZE_MULTIPLIER,
        rotation: 0, layerId: layerState.activeId,
        useHtmlText: textState.useHtml,
        textDirty: true, cachedWidth: null, cachedHeight: null
    };
    objectState.objects.push( textObj );
    objectState.selected = [ textObj ];
    updateTransformControls();
    redrawCanvas();
    saveState();

    setTimeout( () => editTextObject( textObj ), 0o10 );
}

function handleSelectToolClick( x: number, y: number, e: TouchOrMouseEvent ): void {
    const coords = { x, y };

    if ( objectState.selected.length > 0 && startRotation( coords.x, coords.y ) ) return;

    const clickedObject = findObjectAtPoint( coords.x, coords.y );

    if ( clickedObject ) {
        const wasAlreadySelected = objectState.selected.includes( clickedObject );

        if ( !e.shiftKey && !wasAlreadySelected ) {
            objectState.selected = [ clickedObject ];
            updateTransformControls();
            redrawCanvas();
            if ( startRotation( coords.x, coords.y ) ) return;
            objectState.isDragging = true;
            objectState.dragStartX = coords.x;
            objectState.dragStartY = coords.y;
            objectState.initialObjectStates = objectState.selected.map( getObjectInitialState );
            return;
        }
        if ( e.shiftKey ) {
            if ( wasAlreadySelected ) {
                objectState.selected = objectState.selected.filter( o => o !== clickedObject );
                updateTransformControls();
                redrawCanvas();
                return;
            }
            objectState.selected.push( clickedObject );
        }

        if ( objectState.selected.length > 0 && startRotation( coords.x, coords.y ) ) return;

        objectState.isDragging = true;
        objectState.dragStartX = coords.x;
        objectState.dragStartY = coords.y;
        objectState.initialObjectStates = objectState.selected.map( getObjectInitialState );
    } else {
        if ( !e.shiftKey ) objectState.selected = [];
        objectState.isSelecting = true;
        objectState.selectionRect = { x: state.startX, y: state.startY, width: 0, height: 0 };
    }

    updateTransformControls();
    redrawCanvas();
}

function startRotation( x: number, y: number ): boolean {
    if ( findRotateHandle( x, y ) ) {
        objectState.isRotating = true;
        const obj = objectState.selected[ 0 ];
        const center = getCenter( obj );
        const dx = x - center.x, dy = y - center.y;
        objectState.initialRotationAngle = Math.atan2( dy, dx );
        objectState.initialObjectRotations = objectState.selected.map( o => o.rotation || 0 );
        redrawCanvas();
        return true;
    }

    const clickedHandle = findResizeHandle( x, y );
    if ( clickedHandle ) {
        objectState.isResizing = true;
        objectState.resizeHandle = clickedHandle;
        const obj = objectState.selected[ 0 ];
        objectState.initialBounds = getObjectBounds( obj );
        objectState.initialCenterX = getCenterX( obj );
        objectState.initialCenterY = getCenterY( obj );
        objectState.initialRotation = obj.rotation || 0;
        objectState.initialObjectStates = objectState.selected.map( getObjectInitialState );
        redrawCanvas();
        return true;
    }

    return false;
}

function rotateSelectedObjects( x: number, y: number ): void {
    const obj = objectState.selected[ 0 ];
    const center = getCenter( obj );
    const dx = x - center.x, dy = y - center.y;
    const currentAngle = Math.atan2( dy, dx );
    const angleDelta = currentAngle - objectState.initialRotationAngle;
    objectState.selected.forEach( ( o, i ) => {
        o.rotation = ( objectState.initialObjectRotations[ i ] || 0 ) + angleDelta;
    } );
    redrawCanvas();
}

function draw( e: TouchOrMouseEvent ): void {
    e.preventDefault();
    const coords = getCanvasCoords( e );

    document.getElementById( "cursorPos" )!.textContent =
        `${Math.round( coords.x / 0o10 ) * 0o10}, ${Math.round( coords.y / 0o10 ) * 0o10}`;

    if ( state.tool === "select" && !state.isDrawing ) {
        const hoveredObject = findObjectAtPoint( coords.x, coords.y );
        const hoveredHandle = findResizeHandle( coords.x, coords.y );
        const hoveredRotate = findRotateHandle( coords.x, coords.y );
        redrawCanvas();
        if ( hoveredObject && !objectState.selected.includes( hoveredObject ) ) drawHoverEffect( hoveredObject );
        if ( hoveredHandle ) setCursor( getResizeCursor( hoveredHandle ) );
        else if ( hoveredRotate ) setCursor( "pointer" );
        else if ( hoveredObject ) setCursor( "move" );
        else setCursor( "default" );
        return;
    }

    if ( !state.isDrawing ) return;

    if ( state.tool === "select" ) {
        if ( objectState.isResizing && objectState.resizeHandle && objectState.selected.length > 0 ) {
            objectState.selected.forEach( obj => resizeObject( obj, coords.x, coords.y, objectState.resizeHandle! ) );
            redrawCanvas();
        } else if ( objectState.isRotating && objectState.selected.length > 0 ) {
            rotateSelectedObjects( coords.x, coords.y );
        } else if ( objectState.isDragging && objectState.selected.length > 0 ) {
            const dx = coords.x - objectState.dragStartX;
            const dy = coords.y - objectState.dragStartY;
            objectState.selected.forEach( ( obj, i ) => moveObjectByDelta( obj, dx, dy, objectState.initialObjectStates[ i ] || {} ) );
            redrawCanvas();
        } else if ( objectState.isSelecting ) {
            objectState.selectionRect!.width = coords.x - state.startX;
            objectState.selectionRect!.height = coords.y - state.startY;
            redrawCanvas();
            drawSelectionRect();
        }
        return;
    }

    if ( state.tool === "pen" ) {
        pathState.current.push( { x: coords.x, y: coords.y } );
        redrawCanvas();
        drawPathPreview( pathState.current, state.color, state.size, currentCtx );
    } else if ( state.tool === "smooth" ) {
        pathState.smoothX += ( coords.x - pathState.smoothX ) * SMOOTHING_FACTOR;
        pathState.smoothY += ( coords.y - pathState.smoothY ) * SMOOTHING_FACTOR;
        pathState.smooth.push( { x: pathState.smoothX, y: pathState.smoothY } );
        redrawCanvas();
        drawPathPreview( pathState.smooth, state.color, state.size, currentCtx );
    } else if ( state.tool === "eraser" ) {
        pathState.current.push( { x: coords.x, y: coords.y } );
        redrawCanvas();
        eraseObjectsAlongPath( pathState.current, state.size * TEXT_SIZE_MULTIPLIER, eraserState.eraseObjects );
        redrawCanvas();
    } else if ( state.tool === "connect" && connectionState.startObj ) {
        redrawCanvas();
        ctx!.save();
        ctx!.strokeStyle = state.color;
        ctx!.lineWidth = state.size;
        ctx!.setLineDash( LINE_DASH_PATTERN );
        ctx!.beginPath();
        const startC = getCenter( connectionState.startObj );
        ctx!.moveTo( startC.x, startC.y );
        ctx!.lineTo( coords.x, coords.y );
        ctx!.stroke();
        ctx!.restore();
    }

    if ( state.tool === "shape" && state.shape ) {
        pathState.preview = createShapeObject( state.shape, state.startX, state.startY, coords.x, coords.y );
        redrawCanvas();
        if ( pathState.preview ) drawPreviewShape( pathState.preview, currentCtx );
    }

    state.lastX = coords.x;
    state.lastY = coords.y;
}

function stopDrawing( e: TouchOrMouseEvent ): void {
    if ( !state.isDrawing ) return;

    const coords = getCanvasCoords( e );

    if ( state.tool === "select" ) {
        if ( objectState.isSelecting && objectState.selectionRect ) {
            const rect = normalizeRect( objectState.selectionRect );
            objectState.selected = objectState.objects.filter( obj => isObjectInRect( obj, rect ) );
            updateTransformControls();
            redrawCanvas();
        }
        resetSelectionState();
        resetCursor();
        state.isDrawing = false;
        if ( objectState.selected.length > 0 ) saveState();
        return;
    }

    if ( state.tool === "shape" && state.shape && pathState.preview ) {
        let shouldAdd = false;
        if ( pathState.preview.type === "circle" ) {
            shouldAdd = pathState.preview.radiusX! > 0o2 || pathState.preview.radiusY! > 0o2;
        } else if ( pathState.preview.type === "line" ) {
            shouldAdd = Math.abs( pathState.preview.x2! - pathState.preview.x1! ) > 0o4 ||
                Math.abs( pathState.preview.y2! - pathState.preview.y1! ) > 0o4;
        } else {
            shouldAdd = pathState.preview.width! > 0o4 || pathState.preview.height! > 0o4;
        }

        if ( shouldAdd ) {
            objectState.objects.push( pathState.preview );
        }
        pathState.preview = null;
    }

    if ( state.tool === "pen" && pathState.current.length > 1 ) {
        objectState.objects.push( createPathObject( pathState.current, state.color, state.size ) );
        pathState.current = [];
    }

    if ( state.tool === "smooth" && pathState.smooth.length > 1 ) {
        const smoothObj = createPathObject( pathState.smooth, state.color, state.size );
        smoothObj.type = "smoothPath";
        objectState.objects.push( smoothObj );
        pathState.smooth = [];
    }

    if ( state.tool === "connect" && connectionState.startObj ) {
        const targetObj = findObjectAtPoint( coords.x, coords.y );
        if ( targetObj && targetObj !== connectionState.startObj ) {
            if ( !targetObj.id ) targetObj.id = generateId();
            objectState.objects.push( {
                type: "connection",
                id: generateId(),
                startId: connectionState.startObj.id!,
                endId: targetObj.id,
                color: state.color,
                size: state.size,
                layerId: layerState.activeId
            } );
        }
        connectionState.startObj = null;
    }

    if ( state.tool === "eraser" && pathState.current.length > 1 ) {
        pathState.current = [];
    }

    state.isDrawing = false;
    resetCursor();

    if ( state.tool !== "text" ) {
        redrawCanvas();
        saveState();
    }
}

function drawSelectionRect(): void {
    if ( !objectState.selectionRect ) return;

    const rect = normalizeRect( objectState.selectionRect );
    const colors = getContrastingColors( [
        { x: rect.x + 0o4, y: rect.y + 0o4 },
        { x: rect.x + rect.width - 0o4, y: rect.y + rect.height - 0o4 }
    ] );

    currentCtx!.save();
    currentCtx!.strokeStyle = colors.stroke;
    currentCtx!.lineWidth = 1;
    currentCtx!.setLineDash( LINE_DASH_PATTERN );
    currentCtx!.fillStyle = colors.fill;
    drawRoundedRectPath( rect.x, rect.y, rect.width, rect.height, CORNER_RADIUS, true );
    currentCtx!.restore();
}

function drawHoverEffect( obj: WhiteboardObject ): void {
    const colors = getContrastingColors( [ { x: getCenterX( obj ), y: getCenterY( obj ) } ] );

    currentCtx!.save();
    applyObjectTransform( obj );
    currentCtx!.strokeStyle = colors.stroke;
    currentCtx!.fillStyle = "rgba(0,0,0,0)";
    currentCtx!.lineWidth = SELECTION_LINE_WIDTH;
    currentCtx!.setLineDash( LINE_DASH_PATTERN );

    const bounds = getObjectBounds( obj );
    drawRoundedRectPath( bounds.x, bounds.y, bounds.width, bounds.height, CORNER_RADIUS, false );
    currentCtx!.restore();
}

// ⟪ Transform Controls 🎛️ ⟫

function updateTransformControls(): void {
    const controls = document.getElementById( "transformControls" );
    if ( controls ) {
        const hasTextObject = objectState.selected.some( obj => obj.type === "text" );
        controls.classList.toggle( "visible", objectState.selected.length > 0 );
        controls.classList.toggle( "has-text", hasTextObject );
    }
}

// ⟪ Duplicate, Copy, Paste 📋 ⟫

function duplicateSelectedObjects(): void {
    if ( objectState.selected.length === 0 ) return;

    const newObjects: WhiteboardObject[] = [];
    const offset = 0o20;

    objectState.selected.forEach( obj => {
        const newObj = JSON.parse( JSON.stringify( obj ) );
        newObj.id = generateId();

        if ( newObj.x !== undefined ) newObj.x += offset;
        if ( newObj.y !== undefined ) newObj.y += offset;
        if ( newObj.x1 !== undefined ) newObj.x1 += offset;
        if ( newObj.y1 !== undefined ) newObj.y1 += offset;
        if ( newObj.x2 !== undefined ) newObj.x2 += offset;
        if ( newObj.y2 !== undefined ) newObj.y2 += offset;
        if ( newObj.points ) {
            newObj.points = newObj.points.map( ( p: Point ) => ( { x: p.x + offset, y: p.y + offset } ) );
        }

        objectState.objects.push( newObj );
        newObjects.push( newObj );
    } );

    objectState.selected = newObjects;
    updateTransformControls();
    redrawCanvas();
    saveState();
}

function copySelectedObjects(): void {
    if ( objectState.selected.length === 0 ) return;

    clipboardState.objects = objectState.selected.map( obj => JSON.parse( JSON.stringify( obj ) ) );
}

function pasteObjects(): void {
    if ( clipboardState.objects.length === 0 ) return;

    const newObjects: WhiteboardObject[] = [];
    const offset = 0o20;

    clipboardState.objects.forEach( obj => {
        const newObj = JSON.parse( JSON.stringify( obj ) );
        newObj.id = generateId();

        if ( newObj.x !== undefined ) newObj.x += offset;
        if ( newObj.y !== undefined ) newObj.y += offset;
        if ( newObj.x1 !== undefined ) newObj.x1 += offset;
        if ( newObj.y1 !== undefined ) newObj.y1 += offset;
        if ( newObj.x2 !== undefined ) newObj.x2 += offset;
        if ( newObj.y2 !== undefined ) newObj.y2 += offset;
        if ( newObj.points ) {
            newObj.points = newObj.points.map( ( p: Point ) => ( { x: p.x + offset, y: p.y + offset } ) );
        }

        objectState.objects.push( newObj );
        newObjects.push( newObj );
    } );

    objectState.selected = newObjects;
    updateTransformControls();
    redrawCanvas();
    saveState();
}

// ⟪ Canvas Rendering 🖼️ ⟫

function redrawCanvas(): void {
    if ( !currentCtx || !currentCanvas ) return;
    currentCtx.fillStyle = "#ffffff";
    currentCtx.fillRect( 0, 0, currentCanvas.width, currentCanvas.height );

    objectState.objects
        .filter( obj => {
            const layer = layerState.layers.find( l => l.id === obj.layerId );
            return layer && layer.visible;
        } )
        .forEach( obj => drawObject( obj ) );

    objectState.selected.forEach( obj => drawSelectionBox( obj ) );
}

function applyObjectTransform( obj: WhiteboardObject ): void {
    const cx = getCenterX( obj );
    const cy = getCenterY( obj );

    if ( obj.rotation !== undefined && obj.rotation !== 0 ) {
        currentCtx!.translate( cx, cy );
        currentCtx!.rotate( obj.rotation );
        currentCtx!.translate( -cx, -cy );
    }

    if ( obj.flipH && obj.width ) {
        currentCtx!.translate( obj.x! + obj.width, 0 );
        currentCtx!.scale( -1, 1 );
        currentCtx!.translate( -obj.x!, 0 );
    }

    if ( obj.flipV && obj.height ) {
        currentCtx!.translate( 0, obj.y! + obj.height );
        currentCtx!.scale( 1, -1 );
        currentCtx!.translate( 0, -obj.y! );
    }
}

function drawObject( obj: WhiteboardObject ): void {
    currentCtx!.save();
    applyObjectTransform( obj );

    currentCtx!.strokeStyle = obj.color!;
    currentCtx!.fillStyle = obj.color!;
    currentCtx!.lineWidth = obj.size || 2;
    currentCtx!.lineCap = "round";
    currentCtx!.lineJoin = "round";

    switch ( obj.type ) {
        case "line":
            currentCtx!.beginPath();
            currentCtx!.moveTo( obj.x1!, obj.y1! );
            currentCtx!.lineTo( obj.x2!, obj.y2! );
            currentCtx!.stroke();
            break;
        case "connection":
            const endpoints = getConnectionEndpoints( obj );
            if ( endpoints ) {
                currentCtx!.beginPath();
                currentCtx!.moveTo( endpoints.start.x, endpoints.start.y );
                currentCtx!.lineTo( endpoints.end.x, endpoints.end.y );
                currentCtx!.stroke();
            }
            break;
        case "circle":
            currentCtx!.beginPath();
            currentCtx!.ellipse( obj.x!, obj.y!, obj.radiusX!, obj.radiusY!, 0, 0, Math.PI * 2 );
            currentCtx!.stroke();
            break;
        case "text":
            currentCtx!.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
            if ( obj.useHtmlText ) drawHtmlText( obj );
            else currentCtx!.fillText( obj.text || "", obj.x!, obj.y! );
            break;
        case "path":
        case "smoothPath":
            drawPath( obj );
            break;
        case "shape":
            drawShape( obj );
            break;
    }

    currentCtx!.restore();
}

function drawHtmlText( obj: WhiteboardObject ): void {
    const hasCache = obj.cachedCanvas && obj.cachedWidth && obj.cachedHeight;
    if ( hasCache && !obj.textDirty ) {
        currentCtx!.imageSmoothingEnabled = true;
        currentCtx!.imageSmoothingQuality = "high";
        currentCtx!.drawImage( obj.cachedCanvas!, obj.x!, obj.y! - ( obj.cachedHeight || 0 ), obj.cachedWidth!, obj.cachedHeight! );
        return;
    }

    const uniqueClass = "cepufal-html-text-" + Date.now();
    const tempContainer = document.createElement( "div" );
    tempContainer.className = "cepufal cepufal-html-text-measure " + uniqueClass;
    tempContainer.style.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
    tempContainer.style.color = obj.color!;

    const textContent = obj.text || " ";
    tempContainer.appendChild( document.createTextNode( textContent ) );
    document.body.appendChild( tempContainer );

    ( window as any ).vacepu( uniqueClass );

    let width = tempContainer.offsetWidth;
    let height = tempContainer.offsetHeight;
    width = Math.max( width, obj.size! * TEXT_MIN_WIDTH_MULTIPLIER );
    height = Math.max( height, obj.size! );

    const dpr = window.devicePixelRatio || 1;
    const offscreen = document.createElement( "canvas" );
    offscreen.width = Math.max( 1, Math.floor( width * dpr ) );
    offscreen.height = Math.max( 1, Math.floor( height * dpr ) );
    const offCtx = offscreen.getContext( "2d" )!;
    offCtx.scale( dpr, dpr );
    offCtx.clearRect( 0, 0, width, height );
    offCtx.font = `${obj.size}px "ı],ᴜ }ʃᴜ", sans-serif`;
    offCtx.fillStyle = obj.color!;
    offCtx.textBaseline = "top";
    offCtx.textAlign = "left";

    const childNodes = tempContainer.childNodes;
    const containerRect = tempContainer.getBoundingClientRect();

    for ( let i = 0; i < childNodes.length; i++ ) {
        const node = childNodes[ i ];
        if ( node.nodeType === Node.ELEMENT_NODE && ( node as HTMLElement ).classList.contains( "cepufalxez" ) ) {
            const rect = ( node as HTMLElement ).getBoundingClientRect();
            offCtx.fillText( ( node as HTMLElement ).textContent!, rect.left - containerRect.left, rect.top - containerRect.top );
        } else if ( node.nodeType === Node.TEXT_NODE && node.textContent?.trim() ) {
            const range = document.createRange();
            range.selectNodeContents( node );
            const rect = range.getBoundingClientRect();
            offCtx.fillText( node.textContent, rect.left - containerRect.left, rect.top - containerRect.top );
        }
    }

    obj.cachedCanvas = offscreen;
    obj.cachedWidth = width;
    obj.cachedHeight = height;
    obj.textDirty = false;

    currentCtx!.imageSmoothingEnabled = true;
    currentCtx!.imageSmoothingQuality = "high";
    currentCtx!.drawImage( offscreen, obj.x!, obj.y! - height, width, height );

    document.body.removeChild( tempContainer );
}

function drawPath( obj: WhiteboardObject ): void {
    if ( obj.points!.length < 2 ) return;

    drawPathSegments( obj.points! );
    currentCtx!.stroke();
}

function drawShape( obj: WhiteboardObject ): void {
    const { x, y, width, height, color, size, shape } = obj;
    currentCtx!.strokeStyle = color!;
    currentCtx!.lineWidth = size!;
    currentCtx!.beginPath();
    drawShapePath( x!, y!, width!, height!, shape! );
    currentCtx!.stroke();
}

function drawSelectionBox( obj: WhiteboardObject ): void {
    const handles = getHandles( obj );
    const cx = getCenterX( obj );
    const cy = getCenterY( obj );
    const bounds = getObjectBounds( obj );
    const rotation = obj.rotation || 0;
    const c = Math.cos( rotation ), s = Math.sin( rotation );

    currentCtx!.save();
    currentCtx!.strokeStyle = SELECTION_STROKE_COLOR;
    currentCtx!.fillStyle = "rgba(0,0,0,0)";
    currentCtx!.lineWidth = SELECTION_LINE_WIDTH;
    currentCtx!.setLineDash( LINE_DASH_PATTERN );

    currentCtx!.beginPath();
    currentCtx!.moveTo( handles[ 0 ].x, handles[ 0 ].y );
    currentCtx!.lineTo( handles[ 1 ].x, handles[ 1 ].y );
    currentCtx!.lineTo( handles[ 2 ].x, handles[ 2 ].y );
    currentCtx!.lineTo( handles[ 3 ].x, handles[ 3 ].y );
    currentCtx!.closePath();
    currentCtx!.stroke();

    currentCtx!.fillStyle = HANDLE_FILL_COLOR;
    currentCtx!.strokeStyle = HANDLE_STROKE_COLOR;
    currentCtx!.lineWidth = 2;
    currentCtx!.setLineDash( [] );

    for ( let i = 0; i < 0o10; i++ ) {
        const h = handles[ i ];
        currentCtx!.beginPath();
        currentCtx!.roundRect( h.x - HANDLE_SIZE / 2, h.y - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE, HANDLE_RADIUS );
        currentCtx!.fill();
        currentCtx!.stroke();
    }

    const localTopMid = { x: bounds.x + bounds.width / 2, y: bounds.y };
    const rhX = cx + ( localTopMid.x - cx ) * c - ( localTopMid.y - cy ) * s;
    const rhY = cy + ( localTopMid.x - cx ) * s + ( localTopMid.y - cy ) * c - ROTATE_HANDLE_OFFSET;

    currentCtx!.beginPath();
    currentCtx!.arc( rhX, rhY, ROTATE_HANDLE_RADIUS, 0, Math.PI * 2 );
    currentCtx!.fillStyle = HANDLE_FILL_COLOR;
    currentCtx!.fill();
    currentCtx!.stroke();
    currentCtx!.beginPath();
    currentCtx!.arc( rhX, rhY, 0o10, 0, Math.PI * ( 3 / 2 ) );
    currentCtx!.strokeStyle = HANDLE_STROKE_COLOR;
    currentCtx!.lineWidth = SELECTION_LINE_WIDTH;
    currentCtx!.stroke();

    currentCtx!.restore();
}

// ⟪ Zoom & Pan 🔍 ⟫

function getTouchDistance( e: TouchEvent ): number {
    if ( e.touches.length < 2 ) return 0;
    const dx = e.touches[ 0 ].clientX - e.touches[ 1 ].clientX;
    const dy = e.touches[ 0 ].clientY - e.touches[ 1 ].clientY;
    return Math.sqrt( dx * dx + dy * dy );
}

function getTouchCenter( e: TouchEvent ): Point {
    if ( e.touches.length < 2 ) return { x: 0, y: 0 };
    return {
        x: ( e.touches[ 0 ].clientX + e.touches[ 1 ].clientX ) / 2,
        y: ( e.touches[ 0 ].clientY + e.touches[ 1 ].clientY ) / 2
    };
}

function constrainPan(): void {
    const zoom = state.zoomNum / state.zoomDen;
    const scaledWidth = CANVAS_WIDTH * zoom;
    const scaledHeight = CANVAS_HEIGHT * zoom;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const margin = Math.max( viewportWidth, viewportHeight ) * 2;
    const maxX = margin;
    const maxY = margin;

    panState.offsetX = Math.min( Math.max( panState.offsetX, -maxX ), maxX );
    panState.offsetY = Math.min( Math.max( panState.offsetY, -maxY ), maxY );
}

function initZoom(): void {
    const zoomLevel = document.getElementById( "zoomLevel" );
    const toolbar = document.getElementById( "toolbarContainer" );

    if ( !zoomLevel ) {
        console.warn( "zoomLevel element not found" );
        return;
    }

    function updateZoom(): void {
        const zoom = state.zoomNum / state.zoomDen;
        document.documentElement.style.setProperty( "--zoom", zoom.toString() );
        document.documentElement.style.setProperty( "--pan-x", panState.offsetX + "px" );
        document.documentElement.style.setProperty( "--pan-y", panState.offsetY + "px" );
        if ( zoomLevel ) zoomLevel.textContent = `${state.zoomNum}/${state.zoomDen}x`;
        invalidateTextCaches();
        redrawCanvas();
    }

    function setZoom( newZoom: number ): void {
        if ( newZoom < MIN_ZOOM ) {
            state.zoomNum = 0o1;
            state.zoomDen = 0o4;
        } else if ( newZoom > MAX_ZOOM ) {
            state.zoomNum = 0o4;
            state.zoomDen = 0o1;
        } else {
            const zoomNumerator = Math.round( newZoom * ZOOM_BASE );
            state.zoomNum = zoomNumerator;
            state.zoomDen = ZOOM_BASE;
        }

        constrainPan();
        updateZoom();
    }

    function adjustZoom( numeratorMult: number, denominatorMult: number ): void {
        const oldZoom = state.zoomNum / state.zoomDen;
        const newZoom = oldZoom * ( numeratorMult / denominatorMult );
        setZoom( newZoom );
    }

    initButton( "zoomIn", () => adjustZoom( ZOOM_STEP_NUM, ZOOM_STEP_DEN ) );
    initButton( "zoomOut", () => adjustZoom( ZOOM_STEP_DEN, ZOOM_STEP_NUM ) );
    initButton( "zoomReset", () => {
        state.zoomNum = 0o1; state.zoomDen = 0o1;
        panState.offsetX = 0; panState.offsetY = 0;
        updateZoom();
    } );

    document.addEventListener( "wheel", ( e: WheelEvent ) => {
        if ( isUIElement( e.target ) ) {
            return;
        }
        if ( e.ctrlKey ) {
            e.preventDefault();
            const currentZoom = state.zoomNum / state.zoomDen;
            const zoomFactor = e.deltaY < 0 ? ( WHEEL_ZOOM_NUM / WHEEL_ZOOM_DEN ) : ( WHEEL_ZOOM_DEN / WHEEL_ZOOM_NUM );
            const newZoom = currentZoom * zoomFactor;
            setZoom( newZoom );
        } else if ( !panState.isPanning && !state.isDrawing ) {
            e.preventDefault();
            panState.offsetX -= e.deltaX;
            panState.offsetY -= e.deltaY;
            constrainPan();
            updateZoom();
        }
    }, { passive: false, capture: true } );

    document.addEventListener( "touchstart", ( e: TouchEvent ) => {
        if ( isUIElement( e.target ) ) {
            return;
        }
        if ( e.touches.length === 2 ) {
            e.preventDefault();
            touchGestureState.isPinching = true;
            touchGestureState.initialDistance = getTouchDistance( e );
            touchGestureState.lastTouchDistance = touchGestureState.initialDistance;
            touchGestureState.initialZoom = state.zoomNum / state.zoomDen;
            touchGestureState.panStartX = panState.offsetX;
            touchGestureState.panStartY = panState.offsetY;
        }
    }, { passive: false } );

    document.addEventListener( "touchmove", ( e: TouchEvent ) => {
        if ( isUIElement( e.target ) ) {
            return;
        }
        if ( e.touches.length === 2 && touchGestureState.isPinching ) {
            e.preventDefault();
            const currentDistance = getTouchDistance( e );
            if ( currentDistance > 0 && touchGestureState.initialDistance > 0 ) {
                const scale = currentDistance / touchGestureState.initialDistance;
                const newZoom = touchGestureState.initialZoom * scale;
                setZoom( newZoom );
            }

            const center = getTouchCenter( e );
            const dx = center.x - touchGestureState.panStartX;
            const dy = center.y - touchGestureState.panStartY;
            panState.offsetX = touchGestureState.panStartX + dx;
            panState.offsetY = touchGestureState.panStartY + dy;
            constrainPan();
            updateZoom();
        }
    }, { passive: false } );

    document.addEventListener( "touchend", ( e: TouchEvent ) => {
        if ( isUIElement( e.target ) ) {
            return;
        }
        if ( e.touches.length < 2 ) {
            touchGestureState.isPinching = false;
        }
    } );

    document.addEventListener( "touchcancel", () => {
        touchGestureState.isPinching = false;
    } );
}

// ⟪ File Operations 💾 ⟫

function saveCanvas(): void {
    if ( !canvas ) return;
    const link = document.createElement( "a" );
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL( "image/png" );
    link.click();
}

function saveCanvasAsPDF(): void {
    if ( !currentCanvas ) return;

    syncPageObjects();

    const allPages = pageState.pages.filter( p => p.visible );
    if ( allPages.length === 0 ) return;

    const printWindow = window.open( "", "_blank" );
    if ( !printWindow ) {
        alert( "Please allow popups to save as PDF" );
        return;
    }

    let pagesHTML = "";

    allPages.forEach( ( page, index ) => {
        const pageCanvas = page.id === 1
            ? document.getElementById( "whiteboardCanvas" ) as HTMLCanvasElement
            : document.getElementById( `pageCanvas-${page.id}` ) as HTMLCanvasElement;

        if ( !pageCanvas ) return;

        const imgData = pageCanvas.toDataURL( "image/png" );

        pagesHTML += `
            <img src="${imgData}" style="width: 100%; display: block;${index < allPages.length - 1 ? ' page-break-after: always;' : ''}">
        `;
    } );

    printWindow.document.write( `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Whiteboard</title>
            <style>
                @media print {
                    @page { margin: 0; size: landscape; }
                    body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
                }
                body { margin: 0; }
                img { width: 100%; }
            </style>
        </head>
        <body>
            ${pagesHTML}
        </body>
        </html>
    ` );

    printWindow.document.close();
    printWindow.focus();

    setTimeout( () => {
        printWindow.print();
    }, 250 );
}

function loadCanvas( file: File ): void {
    const reader = new FileReader();
    reader.onload = ( e ) => {
        const img = new Image();
        img.onload = () => {
            ctx!.clearRect( 0, 0, canvas!.width, canvas!.height );
            ctx!.fillStyle = "#ffffff";
            ctx!.fillRect( 0, 0, canvas!.width, canvas!.height );
            ctx!.drawImage( img, 0, 0 );
            saveState();
        };
        img.src = e.target!.result as string;
    };
    reader.readAsDataURL( file );
}

function initFileOperations(): void {
    const loadInput = document.getElementById( "fileInput" ) as HTMLInputElement | null;

    initButton( "saveBtn", saveCanvas );
    initButton( "quickSave", saveCanvas );
    initButton( "savePdfBtn", saveCanvasAsPDF );

    if ( loadInput ) {
        initButton( "loadBtn", () => loadInput.click() );
        loadInput.addEventListener( "change", ( e ) => {
            if ( ( e.target as HTMLInputElement ).files![ 0 ] ) loadCanvas( ( e.target as HTMLInputElement ).files![ 0 ] );
        } );
    }
}

// ⟪ Actions & Keyboard Shortcuts ⌨️ ⟫

const KEYBOARD_SHORTCUTS: Record< string, ( shift: boolean ) => void | ( () => void ) > = {
    "z": ( shift ) => shift ? redo() : undo(),
    "y": () => redo(),
    "s": ( shift ) => shift ? saveCanvasAsPDF() : document.getElementById( "saveBtn" )?.click(),
    "d": () => duplicateSelectedObjects(),
    "c": () => copySelectedObjects(),
    "v": () => pasteObjects()
};

function handleKeyboard( e: KeyboardEvent ): void {
    const isCtrl = e.ctrlKey || e.metaKey;

    if ( isCtrl && KEYBOARD_SHORTCUTS[ e.key ] ) {
        e.preventDefault();
        ( KEYBOARD_SHORTCUTS[ e.key ] as ( shift: boolean ) => void )( e.shiftKey );
        return;
    }
    if ( ( e.key === "Delete" || e.key === "Backspace" ) &&
        objectState.selected.length > 0 && document.activeElement === document.body ) {
        e.preventDefault();
        document.getElementById( "deleteSelected" )?.click();
        return;
    }
    if ( e.key === "Escape" ) {
        e.preventDefault();
        document.getElementById( "clearSelected" )?.click();
        return;
    }
    if ( e.code === "Space" ) {
        spaceState.isPressed = true;
        if ( !state.isDrawing && !panState.isPanning ) setCursor( "grab" );
    }
}

function initActions(): void {
    initButtons( [
        { id: "undoBtn", onClick: undo },
        { id: "quickUndo", onClick: undo },
        { id: "redoBtn", onClick: redo },
        { id: "quickRedo", onClick: redo }
    ] );

    const clearCanvas = () => {
        if ( confirm( "Clear the entire canvas - This cannot be undone." ) ) {
            objectState.objects = [];
            objectState.selected = [];
            redrawCanvas();
            saveState();
        }
    };

    initButtons( [
        { id: "clearBtn", onClick: clearCanvas },
        { id: "quickClear", onClick: clearCanvas }
    ] );
}

function initLayerControls(): void {
    initButtons( [
        { id: "addLayerBtn", onClick: addLayer },
        { id: "deleteLayerBtn", onClick: deleteLayer },
        { id: "moveLayerUpBtn", onClick: () => moveLayer( 1 ) },
        { id: "moveLayerDownBtn", onClick: () => moveLayer( -1 ) }
    ] );
}

function initPageControls(): void {
    initButtons( [
        { id: "addPageBtn", onClick: () => addPage() },
        { id: "deletePageBtn", onClick: deletePage }
    ] );
}

function handleKeyup( e: KeyboardEvent ): void {
    if ( e.code === "Space" ) {
        spaceState.isPressed = false;
        if ( !panState.isPanning && !state.isDrawing ) setCursor( getToolCursor() );
    }
}

function handleBlur(): void {
    spaceState.isPressed = false;
    panState.isPanning = false;
    resetCursor();
}

// ⟪ Canvas Events & Panning 🖱️ ⟫

function initCanvasEvents(): void {
    if ( !canvas ) return;

    canvas.addEventListener( "dblclick", handleDoubleClick );

    initToolbarTouch();

    document.addEventListener( "touchstart", handleTouchStart, { passive: false } );
    document.addEventListener( "touchmove", handleTouchMove, { passive: false } );
    document.addEventListener( "touchend", handleTouchEnd, { passive: false } );
    document.addEventListener( "touchcancel", handleTouchCancel, { passive: false } );

    document.addEventListener( "mousedown", handleDocumentMouseDown, { passive: false } );
    document.addEventListener( "mousemove", handleDocumentMouseMove, { passive: false } );
    document.addEventListener( "mouseup", handleDocumentMouseUp, { passive: false } );
    document.addEventListener( "keydown", handleKeyboard );
    document.addEventListener( "keyup", handleKeyup );
    document.addEventListener( "blur", handleBlur );
}

function isUIElement( target: EventTarget | null ): boolean {
    if ( !target ) return false;
    const element = target as HTMLElement;
    return !!element.closest( '#toolbarContainer, .toolbar-wrapper, .zoom-controls, .quick-actions, #transformControls' );
}

function initToolbarTouch(): void {
    const toolbar = document.getElementById( "toolbarContainer" );
    if ( !toolbar ) return;

    toolbar.addEventListener( "scroll", ( e ) => {
        e.stopImmediatePropagation();
    }, { passive: true, capture: true } );
}

function handleDocumentMouseDown( e: MouseEvent ): void {
    if ( isUIElement( e.target ) ) {
        return;
    }
    if ( e.button === 1 || ( spaceState.isPressed && e.button === 0 ) ) {
        e.preventDefault();
        panState.isPanning = true;
        panState.startX = e.clientX;
        panState.startY = e.clientY;
        setCursor( "grabbing" );
        return;
    }
    if ( e.button === 0 && !spaceState.isPressed && !panState.isPanning && !state.isDrawing ) {
        startDrawing( e );
    }
}

function handleDocumentMouseMove( e: MouseEvent ): void {
    if ( isUIElement( e.target ) ) {
        return;
    }
    if ( panState.isPanning ) {
        e.preventDefault();

        const dx = e.clientX - panState.startX;
        const dy = e.clientY - panState.startY;

        panState.offsetX += dx;
        panState.offsetY += dy;

        panState.startX = e.clientX;
        panState.startY = e.clientY;

        constrainPan();
        document.documentElement.style.setProperty( "--pan-x", panState.offsetX + "px" );
        document.documentElement.style.setProperty( "--pan-y", panState.offsetY + "px" );
        return;
    }

    if ( state.isDrawing || state.tool === "select" ) {
        draw( e );
        return;
    }
}

function handleDocumentMouseUp( e: MouseEvent ): void {
    if ( isUIElement( e.target ) ) {
        return;
    }
    if ( panState.isPanning ) {
        e.preventDefault();
        panState.isPanning = false;
        resetCursor();
        return;
    }

    if ( state.isDrawing ) {
        stopDrawing( e );
    } else {
        state.isDrawing = false;
    }
}

function isScrollableElement( el: EventTarget | null ): boolean {
    if ( !el ) return false;
    const element = el as HTMLElement;
    if ( element.closest( '#toolbarContainer' ) ) return true;
    const style = window.getComputedStyle( element );
    return style.overflowY === 'auto' || style.overflowY === 'scroll';
}

function handleTouchStart( e: TouchEvent ): void {
    if ( isUIElement( e.target ) ) {
        return;
    }
    if ( e.touches.length === 1 && !touchGestureState.isPinching ) {
        startDrawing( e as any );
    }
}

function handleTouchMove( e: TouchEvent ): void {
    if ( isUIElement( e.target ) ) {
        return;
    }
    if ( e.touches.length === 1 && !touchGestureState.isPinching ) {
        if ( isScrollableElement( e.target ) ) {
            return;
        }
        draw( e as any );
    }
}

function handleTouchEnd( e: TouchEvent ): void {
    if ( isUIElement( e.target ) ) {
        return;
    }
    if ( !touchGestureState.isPinching ) {
        stopDrawing( e as any );
    }
}

function handleTouchCancel( e: TouchEvent ): void {
    if ( isUIElement( e.target ) ) {
        return;
    }
    if ( !touchGestureState.isPinching ) {
        stopDrawing( e as any );
    }
}

function handleDoubleClick( e: MouseEvent ): void {
    if ( e.button !== 0 ) return;

    const coords = getCanvasCoords( e );
    const clickedObject = findObjectAtPoint( coords.x, coords.y );

    if ( clickedObject && clickedObject.type === "text" ) {
        editTextObject( clickedObject );
    }
}

document.addEventListener( "DOMContentLoaded", init );
