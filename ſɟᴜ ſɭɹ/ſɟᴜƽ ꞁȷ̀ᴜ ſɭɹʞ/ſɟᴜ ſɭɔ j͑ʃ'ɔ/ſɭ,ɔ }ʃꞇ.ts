// ≺⧼ UI Handlers, Actions & File Operations ⧽≻

import {
    canvas, state, spaceState, historyState, objectState, layerState, pageState, textState, eraserState,
    CANVAS_WIDTH, CANVAS_HEIGHT
    } from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import {
    normalizeHexColor, isValidHexColor,
    setButtonPressed, initButtonGroup, initButtons
    } from "./ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

import { initSharedToolbar } from "../../}ʃɹ ɭʃᴜ j͑ʃɔ }ʃw j͑ʃᴜ ſɭᴜ ŋᷠᴜ.js";

import {
    pageManager,
    renderLayerList,
    addLayer as addLayerAction,
    deleteLayer as deleteLayerAction,
    moveLayer as moveLayerAction,
    syncLayersAndSave as syncLayersAndSaveAction,
    addPage as addPageAction,
    deletePage as deletePageAction,
    movePage as movePageAction,
    syncPagesAndSave as syncPagesAndSaveAction
} from "./ɭʃᴜ }ʃɔƽ.js";

import {
    redrawCanvas, saveState,
    getCurrentCanvas, getCurrentCtx, updateUndoRedoButtons
} from "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɹʞ.js";

import {
    duplicateSelectedObjects, copySelectedObjects, pasteObjects,
    editTextObject, updateTransformControls
} from "./ſɟᴜ ſɭɹʞ.js";

// ⟪ UI Initialization 🎨 ⟫

export function initColors(): void {
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

export function initToolsAndShapes(): void {
    initButtonGroup( "button[data-tool]", "button[data-tool]", ( btn ) => {
        state.tool = btn.dataset.tool!;
        if ( canvas ) canvas.dataset.tool = state.tool;
        updateTransformControls();
    } );

    initButtonGroup( "button[data-shape]", "button[data-shape]", ( btn ) => {
        state.shape = btn.dataset.shape!;
        state.tool = "shape";
        if ( canvas ) canvas.dataset.tool = "shape";
        updateTransformControls();
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

export function initSizeSlider(): void {
    const slider = document.getElementById( "brushSize" ) as HTMLInputElement;
    const valueDisplay = document.getElementById( "brushSizeValue" );

    slider.addEventListener( "input", () => {
        state.size = parseInt( slider.value );
        valueDisplay!.textContent = state.size.toString();
    } );
}

export function initToolbar(): void {
    initSharedToolbar();
}

// ⟪ History & Undo/Redo 📚 ⟫
// saveState is imported from managers.js

export function undo(): void { changeHistory( -1 ); }
export function redo(): void { changeHistory( 1 ); }

export function changeHistory( direction: number ): void {
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

// ⟪ Actions & Keyboard Shortcuts ⌨️ ⟫

export function handleKeyboard( e: KeyboardEvent ): void {
    const target = e.target as HTMLElement;
    const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

    if ( isInput && target !== textState.input ) return;

    if ( e.key === "z" && ( e.ctrlKey || e.metaKey ) && !e.shiftKey ) {
        e.preventDefault();
        undo();
    } else if ( e.key === "y" && ( e.ctrlKey || e.metaKey ) ) {
        e.preventDefault();
        redo();
    } else if ( e.key === "z" && ( e.ctrlKey || e.metaKey ) && e.shiftKey ) {
        e.preventDefault();
        redo();
    } else if ( e.key === "d" && ( e.ctrlKey || e.metaKey ) ) {
        e.preventDefault();
        duplicateSelectedObjects();
    } else if ( e.key === "c" && ( e.ctrlKey || e.metaKey ) ) {
        e.preventDefault();
        copySelectedObjects();
    } else if ( e.key === "v" && ( e.ctrlKey || e.metaKey ) ) {
        e.preventDefault();
        pasteObjects();
    } else if ( e.key === "Delete" || e.key === "Backspace" ) {
        if ( !isInput ) {
            e.preventDefault();
            deleteSelectedObjects();
        }
    } else if ( e.key === "Escape" ) {
        e.preventDefault();
        objectState.selected = [];
        updateTransformControls();
        redrawCanvas();
    } else if ( e.key === " " && !spaceState.isPressed ) {
        spaceState.isPressed = true;
        if ( canvas ) canvas.dataset.cursor = "grab";
    }
}

export function deleteSelectedObjects(): void {
    if ( objectState.selected.length === 0 ) return;
    objectState.objects = objectState.objects.filter( o => !objectState.selected.includes( o ) );
    objectState.selected = [];
    updateTransformControls();
    redrawCanvas();
    saveState();
}

export function initActions(): void {
    initButtons( [
        { id: "undoBtn", onClick: undo },
        { id: "redoBtn", onClick: redo },
        { id: "quickUndo", onClick: undo },
        { id: "quickRedo", onClick: redo },
        { id: "quickClear", onClick: clearCanvas },
        { id: "quickSave", onClick: saveCanvas },
        { id: "clearBtn", onClick: clearCanvas },
        { id: "saveBtn", onClick: saveCanvas },
        { id: "savePdfBtn", onClick: saveCanvasAsPDF },
        { id: "loadBtn", onClick: () => document.getElementById( "fileInput" )!.click() },
        { id: "editSelected", onClick: editSelectedText },
        { id: "duplicateSelected", onClick: duplicateSelectedObjects },
        { id: "copySelected", onClick: copySelectedObjects },
        { id: "pasteSelected", onClick: pasteObjects },
        { id: "deleteSelected", onClick: deleteSelectedObjects },
        { id: "clearSelected", onClick: clearSelected },
        { id: "rotateLeft", onClick: () => rotateSelected( -Math.PI / 0o12 ) },
        { id: "rotateRight", onClick: () => rotateSelected( Math.PI / 0o12 ) },
        { id: "moveLayerUp", onClick: moveSelectedLayerUp },
        { id: "moveLayerDown", onClick: moveSelectedLayerDown },
        { id: "flipH", onClick: () => flipSelected( "h" ) },
        { id: "flipV", onClick: () => flipSelected( "v" ) },
        { id: "bringFront", onClick: bringToFront },
        { id: "sendBack", onClick: sendToBack }
    ] );
}

export function initLayerControls(): void {
    initButtons( [
        { id: "addLayerBtn", onClick: addLayerAction },
        { id: "deleteLayerBtn", onClick: deleteLayerAction },
        { id: "moveLayerUpBtn", onClick: () => moveLayerAction( 1 ) },
        { id: "moveLayerDownBtn", onClick: () => moveLayerAction( -1 ) }
    ] );
}

export function initPageControls(): void {
    initButtons( [
        { id: "addPageBtn", onClick: addPageAction },
        { id: "deletePageBtn", onClick: deletePageAction },
        { id: "movePageUpBtn", onClick: () => movePageAction( 1 ) },
        { id: "movePageDownBtn", onClick: () => movePageAction( -1 ) }
    ] );
}

// ⟪ Transform Control Actions 🎛️ ⟫

function editSelectedText(): void {
    if ( objectState.selected.length !== 1 || objectState.selected[ 0 ].type !== "text" ) return;
    editTextObject( objectState.selected[ 0 ] );
}

function clearSelected(): void {
    if ( objectState.selected.length !== 1 ) return;
    const obj = objectState.selected[ 0 ];
    if ( obj.type === "text" ) {
        obj.text = "";
        obj.textDirty = true;
        redrawCanvas();
        saveState();
    }
}

function rotateSelected( angle: number ): void {
    if ( objectState.selected.length === 0 ) return;
    objectState.selected.forEach( obj => {
        obj.rotation = ( obj.rotation || 0 ) + angle;
    } );
    redrawCanvas();
    saveState();
}

function moveSelectedLayerUp(): void {
    if ( objectState.selected.length !== 1 ) return;
    const obj = objectState.selected[ 0 ];
    const index = objectState.objects.indexOf( obj );
    if ( index < objectState.objects.length - 1 ) {
        [ objectState.objects[ index ], objectState.objects[ index + 1 ] ] =
            [ objectState.objects[ index + 1 ], objectState.objects[ index ] ];
        redrawCanvas();
        saveState();
    }
}

function moveSelectedLayerDown(): void {
    if ( objectState.selected.length !== 1 ) return;
    const obj = objectState.selected[ 0 ];
    const index = objectState.objects.indexOf( obj );
    if ( index > 0 ) {
        [ objectState.objects[ index ], objectState.objects[ index - 1 ] ] =
            [ objectState.objects[ index - 1 ], objectState.objects[ index ] ];
        redrawCanvas();
        saveState();
    }
}

function flipSelected( axis: "h" | "v" ): void {
    if ( objectState.selected.length === 0 ) return;
    objectState.selected.forEach( obj => {
        if ( axis === "h" ) obj.flipH = !obj.flipH;
        else obj.flipV = !obj.flipV;
    } );
    redrawCanvas();
    saveState();
}

function bringToFront(): void {
    if ( objectState.selected.length === 0 ) return;
    objectState.selected.forEach( obj => {
        const index = objectState.objects.indexOf( obj );
        if ( index >= 0 ) {
            objectState.objects.splice( index, 1 );
            objectState.objects.push( obj );
        }
    } );
    redrawCanvas();
    saveState();
}

function sendToBack(): void {
    if ( objectState.selected.length === 0 ) return;
    objectState.selected.forEach( obj => {
        const index = objectState.objects.indexOf( obj );
        if ( index >= 0 ) {
            objectState.objects.splice( index, 1 );
            objectState.objects.unshift( obj );
        }
    } );
    redrawCanvas();
    saveState();
}

// ⟪ File Operations 💾 ⟫

export function saveCanvas(): void {
    getCurrentCanvas()!.toBlob( ( blob: Blob | null ) => {
        if ( !blob ) return;
        const url = URL.createObjectURL( blob );
        const a = document.createElement( "a" );
        a.href = url;
        a.download = "whiteboard.png";
        a.click();
        URL.revokeObjectURL( url );
    } );
}

export function saveCanvasAsPDF(): void {
    const pdfModule = ( window as any ).jspdf;
    if ( !pdfModule ) {
        console.error( "jsPDF not loaded" );
        return;
    }

    const doc = new pdfModule.jsPDF( {
        orientation: CANVAS_WIDTH > CANVAS_HEIGHT ? "l" : "p",
        unit: "px",
        format: [ CANVAS_WIDTH, CANVAS_HEIGHT ]
    } );

    const imgData = getCurrentCanvas()!.toDataURL( "image/jpeg", 0o1 );
    doc.addImage( imgData, "JPEG", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    doc.save( "whiteboard.pdf" );
}

export function loadCanvas( file: File ): void {
    const reader = new FileReader();
    reader.onload = ( e ) => {
        const img = new Image();
        img.onload = () => {
            getCurrentCtx()!.drawImage( img, 0, 0 );
            redrawCanvas();
            saveState();
        };
        img.src = e.target!.result as string;
    };
    reader.readAsDataURL( file );
}

export function initFileOperations(): void {
    const fileInput = document.getElementById( "fileInput" ) as HTMLInputElement;
    if ( fileInput ) {
        fileInput.addEventListener( "change", ( e ) => {
            const files = ( e.target as HTMLInputElement ).files;
            if ( files && files.length > 0 ) loadCanvas( files[ 0 ] );
            fileInput.value = "";
        } );
    }
}

export function clearCanvas(): void {
    if ( !getCurrentCtx() || !getCurrentCanvas() ) return;
    getCurrentCtx()!.fillStyle = "#ffffff";
    getCurrentCtx()!.fillRect( 0, 0, getCurrentCanvas()!.width, getCurrentCanvas()!.height );
    objectState.objects = [];
    objectState.selected = [];
    updateTransformControls();
    redrawCanvas();
    saveState();
}
