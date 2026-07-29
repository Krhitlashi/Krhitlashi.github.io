// ≺⧼ Layer & Page Managers ⧽≻

import {
    tavolstato, objektstato, paĝostato,
    TABULA_LARGXO, TABULA_ALTO, Tavolo, Paĝo
} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";import {
    redesegniTabulon, konserviStaton, sxangxiAlPagaTabulo, agordiTabulanGrandonPorPago, desegniTabulanKradon
} from "./ꞁȷ̀ᴜ ɽ͑ʃ'ᴜ ſɭɹʞ.js";

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

export class LayerManager extends BaseItemManager<Tavolo> {
    layers: Tavolo[];

    constructor() {
        super( "ꞙɭ" );
        this.layers = [];
    }

    protected createItem( id: number, name: string ): Tavolo {
        const layer: Tavolo = { id, name, visible: true };
        this.layers.push( layer );
        return layer;
    }

    syncToState(): void {
        tavolstato.layers = this.layers;
        tavolstato.activeId = this.activeId;
        tavolstato.counter = this.counter;
    }

    protected override onItemDeleting( layer: Tavolo ): void {
        objektstato.objects = objektstato.objects.filter( o => o.layerId !== layer.id );
    }
}

export const tavolAdministranto = new LayerManager();

// ⟪ Page Manager Class 📄 ⟫

export class PageManager extends BaseItemManager<Paĝo> {
    pages: Paĝo[];

    constructor() {
        super( "ꞙɭ" );
        this.pages = [];
    }

    protected createItem( id: number, name: string ): Paĝo {
        const activePage = this.getActive();
        const page: Paĝo = {
            id,
            name,
            visible: true,
            width: activePage?.width || TABULA_LARGXO,
            height: activePage?.height || TABULA_ALTO,
            infinite: true,  // Default to full/whiteboard mode
            objects: []
        };
        this.pages.push( page );
        return page;
    }

    syncToState(): void {
        paĝostato.pages = this.pages;
        paĝostato.activeId = this.activeId;
        paĝostato.counter = this.counter;
    }

    override create( name?: string ): Paĝo {
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
            sxangxiAlPagaTabulo( activePage );
        }
    }

    removePageCanvas( pageId: number ): void {
        document.getElementById( `page-${pageId}` )?.remove();
    }

    createPageContainer( page: Paĝo ): void {
        const mainContainer = document.getElementById( "whiteboardContainer" );
        if ( !mainContainer?.parentNode ) return;

        document.getElementById( `page-${page.id}` )?.remove();

        const pageContainer = document.createElement( "div" );
        pageContainer.id = `page-${page.id}`;
        pageContainer.className = "whiteboard-container";
        pageContainer.classList.toggle( "infinite-container", page.infinite );
        pageContainer.dataset.pageId = page.id.toString();
        pageContainer.style.display = "none";

        const canvasWrapper = document.createElement( "div" );
        canvasWrapper.className = "whiteboard-canvas-wrapper";

        const pageCanvas = document.createElement( "canvas" );
        pageCanvas.id = `pageCanvas-${page.id}`;
        pageCanvas.className = "whiteboard-canvas";
        pageCanvas.classList.toggle( "bordered-canvas", !page.infinite );
        pageCanvas.classList.toggle( "infinite-canvas", page.infinite );
        agordiTabulanGrandonPorPago( pageCanvas, page );

        const ctx = pageCanvas.getContext( "2d" );
        if ( ctx ) {
            if ( page.infinite ) {
                desegniTabulanKradon( ctx, pageCanvas.width, pageCanvas.height );
            } else {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect( 0, 0, pageCanvas.width, pageCanvas.height );
            }
        }

        canvasWrapper.appendChild( pageCanvas );
        pageContainer.appendChild( canvasWrapper );
        mainContainer.parentNode.insertBefore( pageContainer, mainContainer.nextSibling );
    }
}

export const pagAdministranto = new PageManager();

// ⟪ Shared Sync & Save Helper 📋 ⟫

function syncAndSave( renderListFn: () => void ): void {
    renderListFn();
    redesegniTabulon();
    konserviStaton();
}

// ⟪ Layer Management Functions 📚 ⟫

export function sinkronigiTavolojnKajKonservi(): void {
    tavolAdministranto.syncToState();
    syncAndSave( renderiTavolojnListon );
}

export function aldoniTavolon(): void {
    tavolAdministranto.create();
    sinkronigiTavolojnKajKonservi();
}

export function forigiTavolon(): void {
    if ( tavolAdministranto.delete( tavolstato.activeId ) ) sinkronigiTavolojnKajKonservi();
}

export function moviTavolon( direction: number ): void {
    if ( tavolAdministranto.move( tavolstato.activeId, direction ) ) {
        tavolAdministranto.syncToState();
        renderiTavolojnListon();
        konserviStaton();
    }
}

export function baskuligiTavolanVideblon( layerId: number ): void {
    if ( tavolAdministranto.toggleVisibility( layerId ) ) sinkronigiTavolojnKajKonservi();
}

export function elektiTavolon( layerId: number ): void {
    tavolAdministranto.setActive( layerId );
    tavolAdministranto.syncToState();
    renderiTavolojnListon();
}

// ⟪ Page Management Functions 📄 ⟫

export function sinkronigiPagojnKajKonservi(): void {
    pagAdministranto.syncToState();
    syncAndSave( renderiPagojnListon );
}

export function aldoniPagon(): void {
    pagAdministranto.create();
    sinkronigiPagojnKajKonservi();
}

export function forigiPagon(): void {
    if ( pagAdministranto.delete( paĝostato.activeId ) ) sinkronigiPagojnKajKonservi();
}

export function moviPagon( direction: number ): void {
    if ( pagAdministranto.move( paĝostato.activeId, direction ) ) {
        pagAdministranto.syncToState();
        renderiPagojnListon();
        konserviStaton();
    }
}

export function baskuligiPaganVideblon( pageId: number ): void {
    if ( pagAdministranto.toggleVisibility( pageId ) ) sinkronigiPagojnKajKonservi();
}

export function elektiPagon( pageId: number ): void {
    pagAdministranto.setActive( pageId );
    pagAdministranto.syncToState();
    renderiPagojnListon();
}

// ⟪ Shared Item List Rendering 📋 ⟫

export function renderiObjektojnListon<T extends { id: number; name: string; visible: boolean }>(
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

export function renderiTavolojnListon(): void {
    renderiObjektojnListon(
        "layerList",
        tavolstato.layers.slice().reverse(),
        "layer-visibility",
        tavolstato.activeId,
        baskuligiTavolanVideblon,
        elektiTavolon
    );
}

export function renderiPagojnListon(): void {
    renderiObjektojnListon(
        "pageList",
        paĝostato.pages.slice().reverse(),
        "page-visibility",
        paĝostato.activeId,
        baskuligiPaganVideblon,
        elektiPagon
    );
}
