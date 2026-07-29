// ≺⧼ UI Handlers, Actions & File Operations ⧽≻

import {
    canvas, stato, spacstato, historioStato, objektstato, tavolstato, paĝostato, tekststato, viŝilostato,
    TABULA_LARGXO, TABULA_ALTO, PAGXGRANDO_PRETOJ, MIN_PAGXGRANDO, MAX_PAGXGRANDO
} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import {
    normaligiHexKoloron, cxuValidaHexKoloro,
    agordiButononPremita, iniciiButonGrupon, iniciiButonojn
    } from "./ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

import { iniciiKomunanIlaron } from "../../}ʃɹ ɭʃᴜ j͑ʃɔ }ʃw j͑ʃᴜ ſɭᴜ ŋᷠᴜ.js";

import {
    pagAdministranto,
    renderiTavolojnListon,
    aldoniTavolon as aldoniTavolon,
    forigiTavolon as forigiTavolon,
    moviTavolon as moviTavolon,
    sinkronigiTavolojnKajKonservi as sinkronigiTavolojnKajKonservi,
    aldoniPagon as aldoniPagon,
    forigiPagon as forigiPagon,
    moviPagon as moviPagon,
    sinkronigiPagojnKajKonservi as sinkronigiPagojnKajKonservi
} from "./ɭʃᴜ }ʃɔƽ.js";import {
    redesegniTabulon, konserviStaton, desegniTabulanKradon,
    akiriAktualanTabulon, akiriAktualanCtx, gxisdatigiMalfarRefarButonojn,
    grandSxangxiAktivanPagon, gxisdatigiTabulanGrandanMontron, gxisdatigiPretajnButonojn
} from "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɹʞ.js";

import {
    duplicateSelectedObjects, copySelectedObjects, pasteObjects,
    editTextObject, updateTransformControls
} from "./ſɟᴜ ſɭɹʞ.js";

// ⟪ UI Initialization 🎨 ⟫

export function initColors(): void {
    const colorGrid = document.getElementById( "colorGrid" );
    if ( !colorGrid ) return;

    iniciiButonGrupon( "#colorGrid button[data-color]", "#colorGrid button", ( btn ) => {
        stato.color = btn.dataset.color!;
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
        stato.color = color;
        agordiButononPremita( "#colorGrid button", null );
    } );

    hexInput.addEventListener( "input", () => {
        const value = normaligiHexKoloron( hexInput.value );
        if ( cxuValidaHexKoloro( value ) ) {
            colorPicker.value = value;
            stato.color = value;
            agordiButononPremita( "#colorGrid button", null );
        }
    } );

    hexInput.addEventListener( "blur", () => {
        const value = normaligiHexKoloron( hexInput.value );
        if ( cxuValidaHexKoloro( value ) ) {
            hexInput.value = value.toUpperCase();
        }
    } );
}

export function initToolsAndShapes(): void {
    iniciiButonGrupon( "button[data-tool]", "button[data-tool]", ( btn ) => {
        stato.tool = btn.dataset.tool!;
        if ( canvas ) canvas.dataset.tool = stato.tool;
        updateTransformControls();
    } );

    iniciiButonGrupon( "button[data-shape]", "button[data-shape]", ( btn ) => {
        stato.shape = btn.dataset.shape!;
        stato.tool = "shape";
        if ( canvas ) canvas.dataset.tool = "shape";
        updateTransformControls();
    } );

    const htmlTextCheckbox = document.getElementById( "htmlTextCheckbox" ) as HTMLInputElement | null;
    if ( htmlTextCheckbox ) {
        tekststato.useHtml = htmlTextCheckbox.checked;
        htmlTextCheckbox.addEventListener( "change", () => { tekststato.useHtml = htmlTextCheckbox.checked; } );
    }

    const eraserModeCheckbox = document.getElementById( "eraserModeCheckbox" ) as HTMLInputElement | null;
    if ( eraserModeCheckbox ) {
        viŝilostato.eraseObjects = eraserModeCheckbox.checked;
        eraserModeCheckbox.addEventListener( "change", () => { viŝilostato.eraseObjects = eraserModeCheckbox.checked; } );
    }
}

export function initSizeSlider(): void {
    const slider = document.getElementById( "brushSize" ) as HTMLInputElement;
    const valueDisplay = document.getElementById( "brushSizeValue" );

    slider.addEventListener( "input", () => {
        stato.size = parseInt( slider.value );
        valueDisplay!.textContent = stato.size.toString();
    } );
}

export function initToolbar(): void {
    iniciiKomunanIlaron();
}

// ⟪ History & Undo/Redo 📚 ⟫
// saveState is imported from managers.js

export function undo(): void { changeHistory( -1 ); }
export function redo(): void { changeHistory( 1 ); }

export function changeHistory( direction: number ): void {
    const newIndex = historioStato.index + direction;
    if ( newIndex < 0 || newIndex >= historioStato.history.length ) return;

    historioStato.index = newIndex;
    const stateData = JSON.parse( historioStato.history[ historioStato.index ] );
    tavolstato.layers = stateData.layers;
    paĝostato.pages = stateData.pages;
    paĝostato.pages.forEach( page => {
        if ( !page.infinite ) {
            page.width = page.width || TABULA_LARGXO;
            page.height = page.height || TABULA_ALTO;
        }
    } );
    pagAdministranto.pages = paĝostato.pages;

    const activePage = pagAdministranto.getActive();
    if ( activePage ) {
        objektstato.objects = activePage.objects;
        if ( activePage.infinite ) {
            grandSxangxiAktivanPagon( window.innerWidth, window.innerHeight );
        } else {
            grandSxangxiAktivanPagon( activePage.width || TABULA_LARGXO, activePage.height || TABULA_ALTO );
        }
    }

    renderiTavolojnListon();
    redesegniTabulon();
    gxisdatigiMalfarRefarButonojn();
}

// ⟪ Actions & Keyboard Shortcuts ⌨️ ⟫

export function handleKeyboard( e: KeyboardEvent ): void {
    const target = e.target as HTMLElement;
    const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

    if ( isInput && target !== tekststato.input ) return;

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
        objektstato.selected = [];
        updateTransformControls();
        redesegniTabulon();
    } else if ( e.key === " " && !spacstato.isPressed ) {
        spacstato.isPressed = true;
        if ( canvas ) canvas.dataset.cursor = "grab";
    }
}

export function deleteSelectedObjects(): void {
    if ( objektstato.selected.length === 0 ) return;
    objektstato.objects = objektstato.objects.filter( o => !objektstato.selected.includes( o ) );
    objektstato.selected = [];
    updateTransformControls();
    redesegniTabulon();
    konserviStaton();
}

export function initActions(): void {
    iniciiButonojn( [
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
        { id: "moveLayerUp", onClick: () => moveSelectedLayer( 1 ) },
        { id: "moveLayerDown", onClick: () => moveSelectedLayer( -1 ) },
        { id: "flipH", onClick: () => flipSelected( "h" ) },
        { id: "flipV", onClick: () => flipSelected( "v" ) },
        { id: "bringFront", onClick: bringToFront },
        { id: "sendBack", onClick: sendToBack }
    ] );
}

export function initLayerControls(): void {
    iniciiButonojn( [
        { id: "addLayerBtn", onClick: aldoniTavolon },
        { id: "deleteLayerBtn", onClick: forigiTavolon },
        { id: "moveLayerUpBtn", onClick: () => moviTavolon( 1 ) },
        { id: "moveLayerDownBtn", onClick: () => moviTavolon( -1 ) }
    ] );
}

export function initPageControls(): void {
    iniciiButonojn( [
        { id: "addPageBtn", onClick: aldoniPagon },
        { id: "deletePageBtn", onClick: forigiPagon },
        { id: "movePageUpBtn", onClick: () => moviPagon( 1 ) },
        { id: "movePageDownBtn", onClick: () => moviPagon( -1 ) }
    ] );
}

function clampPageSize( value: number ): number {
    if ( !Number.isFinite( value ) ) return MIN_PAGXGRANDO;
    return Math.max( MIN_PAGXGRANDO, Math.min( MAX_PAGXGRANDO, Math.round( value ) ) );
}

function setPageSizeInputs( width: number, height: number ): void {
    const widthInput = document.getElementById( "customPageWidth" ) as HTMLInputElement | null;
    const heightInput = document.getElementById( "customPageHeight" ) as HTMLInputElement | null;
    if ( widthInput ) widthInput.value = width.toString();
    if ( heightInput ) heightInput.value = height.toString();
}

export function initPageSizeControls(): void {
    const buttons = document.querySelectorAll<HTMLButtonElement>( "#pageSizePresetButtons button[data-preset]" );
    const widthInput = document.getElementById( "customPageWidth" ) as HTMLInputElement | null;
    const heightInput = document.getElementById( "customPageHeight" ) as HTMLInputElement | null;
    const applyBtn = document.getElementById( "applyCustomPageSize" );
    if ( buttons.length === 0 || !widthInput || !heightInput || !applyBtn ) return;

    const activePage = pagAdministranto.getActive();
    setPageSizeInputs( activePage?.width || TABULA_LARGXO, activePage?.height || TABULA_ALTO );

    buttons.forEach( btn => {
        btn.addEventListener( "click", () => {
            const preset = btn.dataset.preset!;
            if ( preset === "custom" ) return;
            const size = PAGXGRANDO_PRETOJ[ preset ];
            if ( !size ) return;
            const activePage = pagAdministranto.getActive();
            if ( activePage ) {
                activePage.infinite = size.infinite === true;
                if ( !activePage.infinite ) {
                    activePage.width = size.width;
                    activePage.height = size.height;
                }
            }
            if ( size.infinite ) {
                grandSxangxiAktivanPagon( window.innerWidth, window.innerHeight );
                setPageSizeInputs( window.innerWidth, window.innerHeight );
            } else {
                grandSxangxiAktivanPagon( size.width!, size.height! );
                setPageSizeInputs( size.width!, size.height! );
            }
            konserviStaton();
            gxisdatigiPretajnButonojn( preset );
        } );
    } );

    applyBtn.addEventListener( "click", () => {
        const width = clampPageSize( Number( widthInput.value ) );
        const height = clampPageSize( Number( heightInput.value ) );
        const activePage = pagAdministranto.getActive();
        if ( activePage ) {
            activePage.infinite = false;
            activePage.width = width;
            activePage.height = height;
        }
        setPageSizeInputs( width, height );
        grandSxangxiAktivanPagon( width, height );
        konserviStaton();
        gxisdatigiPretajnButonojn( "custom" );
    } );

    gxisdatigiTabulanGrandanMontron();
}

// ⟪ Transform Control Actions 🎛️ ⟫

function editSelectedText(): void {
    if ( objektstato.selected.length !== 1 || objektstato.selected[ 0 ].type !== "text" ) return;
    editTextObject( objektstato.selected[ 0 ] );
}

function clearSelected(): void {
    if ( objektstato.selected.length !== 1 ) return;
    const obj = objektstato.selected[ 0 ];
    if ( obj.type === "text" ) {
        obj.text = "";
        obj.textDirty = true;
        redesegniTabulon();
        konserviStaton();
    }
}

function rotateSelected( angle: number ): void {
    if ( objektstato.selected.length === 0 ) return;
    objektstato.selected.forEach( obj => {
        obj.rotation = ( obj.rotation || 0 ) + angle;
    } );
    redesegniTabulon();
    konserviStaton();
}

/**
 * Move the sole selected object within the object list by one slot.
 *     direction ( number ) - +1 swaps forward, -1 swaps backward.
 * No-op when nothing / multi-selection or when already at the edge.
 */
function moveSelectedLayer( direction: number ): void {
    if ( objektstato.selected.length !== 1 ) return;
    const obj = objektstato.selected[ 0 ];
    const index = objektstato.objects.indexOf( obj );
    const swapIndex = index + direction;
    if ( swapIndex < 0 || swapIndex >= objektstato.objects.length ) return;

    [ objektstato.objects[ index ], objektstato.objects[ swapIndex ] ] =
        [ objektstato.objects[ swapIndex ], objektstato.objects[ index ] ];
    redesegniTabulon();
    konserviStaton();
}

function flipSelected( axis: "h" | "v" ): void {
    if ( objektstato.selected.length === 0 ) return;
    objektstato.selected.forEach( obj => {
        if ( axis === "h" ) obj.flipH = !obj.flipH;
        else obj.flipV = !obj.flipV;
    } );
    redesegniTabulon();
    konserviStaton();
}

function bringToFront(): void {
    if ( objektstato.selected.length === 0 ) return;
    objektstato.selected.forEach( obj => {
        const index = objektstato.objects.indexOf( obj );
        if ( index >= 0 ) {
            objektstato.objects.splice( index, 1 );
            objektstato.objects.push( obj );
        }
    } );
    redesegniTabulon();
    konserviStaton();
}

function sendToBack(): void {
    if ( objektstato.selected.length === 0 ) return;
    objektstato.selected.forEach( obj => {
        const index = objektstato.objects.indexOf( obj );
        if ( index >= 0 ) {
            objektstato.objects.splice( index, 1 );
            objektstato.objects.unshift( obj );
        }
    } );
    redesegniTabulon();
    konserviStaton();
}

// ⟪ File Operations 💾 ⟫

export function saveCanvas(): void {
    akiriAktualanTabulon()!.toBlob( ( blob: Blob | null ) => {
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
    const currentCanvas = akiriAktualanTabulon()!;
    const width = currentCanvas.width;
    const height = currentCanvas.height;

    const doc = new pdfModule.jsPDF( {
        orientation: width > height ? "l" : "p",
        unit: "px",
        format: [ width, height ]
    } );

    const imgData = currentCanvas.toDataURL( "image/jpeg", 0o1 );
    doc.addImage( imgData, "JPEG", 0, 0, width, height );
    doc.save( "whiteboard.pdf" );
}

export function loadCanvas( file: File ): void {
    const reader = new FileReader();
    reader.onload = ( e ) => {
        const img = new Image();
        img.onload = () => {
            akiriAktualanCtx()!.drawImage( img, 0, 0 );
            redesegniTabulon();
            konserviStaton();
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
    if ( !akiriAktualanCtx() || !akiriAktualanTabulon() ) return;
    const ctx = akiriAktualanCtx()!;
    const cvs = akiriAktualanTabulon()!;
    objektstato.objects = [];
    objektstato.selected = [];
    updateTransformControls();
    // redrawCanvas will fill the appropriate background
    redesegniTabulon();
    konserviStaton();
}
