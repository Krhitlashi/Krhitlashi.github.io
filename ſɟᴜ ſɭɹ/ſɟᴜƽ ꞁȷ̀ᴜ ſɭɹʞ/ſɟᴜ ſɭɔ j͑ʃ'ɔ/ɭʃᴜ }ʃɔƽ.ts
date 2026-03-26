// ≺⧼ Layer & Page Managers ⧽≻

import {
    layerState, objectState, pageState,
    CANVAS_WIDTH, CANVAS_HEIGHT, Layer, Page
} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import { redrawCanvas, saveState, switchToPageCanvas } from "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɹʞ.js";

// ⟪ Base Item Manager Interface 📋 ⟫

export interface ItemManager<T> {
    activeId: number;
    counter: number;
    create( name?: string ): T;
    delete( itemId: number ): boolean;
    move( itemId: number, direction: number ): boolean;
    toggleVisibility( itemId: number ): boolean;
    setActive( itemId: number ): void;
    getActive(): T | undefined;
    isVisible( itemId: number ): boolean;
    syncToState(): void;
}

// ⟪ Generic Item Manager Base Class 📋 ⟫

export abstract class BaseItemManager<T extends { id: number; name: string; visible: boolean }> implements ItemManager<T> {
    items: T[];
    activeId: number;
    counter: number;
    protected namePrefix: string;

    constructor( namePrefix: string ) {
        this.items = [];
        this.activeId = 0;
        this.counter = 0;
        this.namePrefix = namePrefix;
    }

    abstract syncToState(): void;

    create( name?: string ): T {
        this.counter++;
        const item = this.createItem( this.counter, name || `${this.namePrefix}${this.counter} ɭ(ꞇ ɭʃᴜ }ʃɔƽ` );
        this.items.push( item );
        this.activeId = this.counter;
        return item;
    }

    protected abstract createItem( id: number, name: string ): T;

    delete( itemId: number ): boolean {
        if ( this.items.length <= 1 ) return false;
        const index = this.items.findIndex( i => i.id === itemId );
        if ( index === -1 ) return false;

        this.onItemDeleting( this.items[ index ] );
        this.items.splice( index, 1 );

        if ( this.activeId === itemId ) {
            this.activeId = this.items[ 0 ].id;
        }
        return true;
    }

    protected onItemDeleting( _item: T ): void { }

    move( itemId: number, direction: number ): boolean {
        const index = this.items.findIndex( i => i.id === itemId );
        const swapIndex = index + direction;
        if ( swapIndex < 0 || swapIndex >= this.items.length ) return false;

        [ this.items[ index ], this.items[ swapIndex ] ] =
            [ this.items[ swapIndex ], this.items[ index ] ];
        return true;
    }

    toggleVisibility( itemId: number ): boolean {
        const item = this.items.find( i => i.id === itemId );
        if ( item ) {
            item.visible = !item.visible;
            return true;
        }
        return false;
    }

    setActive( itemId: number ): void {
        this.activeId = itemId;
    }

    getActive(): T | undefined {
        return this.items.find( i => i.id === this.activeId );
    }

    isVisible( itemId: number ): boolean {
        return this.items.find( i => i.id === itemId )?.visible ?? false;
    }
}

// ⟪ Layer Manager Class 📚 ⟫

export class LayerManager extends BaseItemManager<Layer> {
    layers: Layer[];

    constructor() {
        super( "ꞙɭ" );
        this.layers = [];
    }

    protected createItem( id: number, name: string ): Layer {
        const layer: Layer = { id, name, visible: true, objects: [] };
        this.layers.push( layer );
        return layer;
    }

    syncToState(): void {
        layerState.layers = this.layers;
        layerState.activeId = this.activeId;
        layerState.counter = this.counter;
    }

    protected override onItemDeleting( layer: Layer ): void {
        objectState.objects = objectState.objects.filter( o => o.layerId !== layer.id );
    }
}

export const layerManager = new LayerManager();

// ⟪ Page Manager Class 📄 ⟫

export class PageManager extends BaseItemManager<Page> {
    pages: Page[];

    constructor() {
        super( "ꞙɭ" );
        this.pages = [];
    }

    protected createItem( id: number, name: string ): Page {
        const page: Page = { id, name, visible: true, objects: [] };
        this.pages.push( page );
        return page;
    }

    syncToState(): void {
        pageState.pages = this.pages;
        pageState.activeId = this.activeId;
        pageState.counter = this.counter;
    }

    override create( name?: string ): Page {
        const page = super.create( name );

        if ( this.counter > 1 ) {
            this.createPageContainer( page );
        }

        this.showPage( page.id );
        return page;
    }

    override delete( pageId: number ): boolean {
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

    override toggleVisibility( pageId: number ): boolean {
        const page = this.pages.find( p => p.id === pageId );
        if ( !page ) return false;

        page.visible = !page.visible;
        const container = this.getPageContainer( pageId );
        if ( container ) {
            container.style.display = page.visible ? "flex" : "none";
        }
        return true;
    }

    override setActive( pageId: number ): void {
        this.activeId = pageId;
        this.showPage( pageId );
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

    removePageCanvas( pageId: number ): void {
        document.getElementById( `page-${pageId}` )?.remove();
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
}

export const pageManager = new PageManager();

// ⟪ Shared Sync & Save Helper 📋 ⟫

function syncAndSave( renderListFn: () => void ): void {
    renderListFn();
    redrawCanvas();
    saveState();
}

// ⟪ Layer Management Functions 📚 ⟫

export function syncLayersAndSave(): void {
    layerManager.syncToState();
    syncAndSave( renderLayerList );
}

export function addLayer(): void {
    layerManager.create();
    syncLayersAndSave();
}

export function deleteLayer(): void {
    if ( layerManager.delete( layerState.activeId ) ) syncLayersAndSave();
}

export function moveLayer( direction: number ): void {
    if ( layerManager.move( layerState.activeId, direction ) ) {
        layerManager.syncToState();
        renderLayerList();
        saveState();
    }
}

export function toggleLayerVisibility( layerId: number ): void {
    if ( layerManager.toggleVisibility( layerId ) ) syncLayersAndSave();
}

export function selectLayer( layerId: number ): void {
    layerManager.setActive( layerId );
    layerManager.syncToState();
    renderLayerList();
}

// ⟪ Page Management Functions 📄 ⟫

export function syncPagesAndSave(): void {
    pageManager.syncToState();
    syncAndSave( renderPageList );
}

export function addPage(): void {
    pageManager.create();
    syncPagesAndSave();
}

export function deletePage(): void {
    if ( pageManager.delete( pageState.activeId ) ) syncPagesAndSave();
}

export function movePage( direction: number ): void {
    if ( pageManager.move( pageState.activeId, direction ) ) {
        pageManager.syncToState();
        renderPageList();
        saveState();
    }
}

export function togglePageVisibility( pageId: number ): void {
    if ( pageManager.toggleVisibility( pageId ) ) syncPagesAndSave();
}

export function selectPage( pageId: number ): void {
    pageManager.setActive( pageId );
    pageManager.syncToState();
    renderPageList();
}

// ⟪ Shared Item List Rendering 📋 ⟫

export function renderItemList<T extends { id: number; name: string; visible: boolean }>(
    listId: string,
    items: T[],
    visibilityClass: string,
    activeId: number,
    onToggleVisibility: ( id: number ) => void,
    onSelect: ( id: number ) => void
): void {
    const itemList = document.getElementById( listId );
    if ( !itemList ) return;

    itemList.innerHTML = "";

    items.forEach( item => {
        const listItem = document.createElement( "button" );
        listItem.setAttribute( "aria-pressed", item.id === activeId ? "true" : "false" );
        listItem.innerHTML = `
            <span>${item.name}</span>
            <span class="${visibilityClass}" data-visible="${item.visible}"></span>
        `;
        listItem.addEventListener( "click", ( e ) => {
            if ( ( e.target as HTMLElement ).classList.contains( visibilityClass ) ) {
                onToggleVisibility( item.id );
            } else {
                onSelect( item.id );
            }
        } );
        itemList.appendChild( listItem );
    } );
}

export function renderLayerList(): void {
    renderItemList(
        "layerList",
        layerState.layers.slice().reverse(),
        "layer-visibility",
        layerState.activeId,
        toggleLayerVisibility,
        selectLayer
    );
}

export function renderPageList(): void {
    renderItemList(
        "pageList",
        pageState.pages.slice().reverse(),
        "page-visibility",
        pageState.activeId,
        togglePageVisibility,
        selectPage
    );
}
