// ≺⧼ Event Utilities ⧽≻

function addEventListeners(
    elements: HTMLElement | HTMLElement[] | NodeList,
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
): void {
    if ( !elements ) return;
    const list = Array.isArray( elements ) ? elements : ( elements instanceof NodeList ? Array.from( elements ) : [ elements ] );
    list.forEach( el => el?.addEventListener( event, handler, options ) );
}

function removeEventListeners(
    elements: HTMLElement | HTMLElement[] | NodeList,
    event: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
): void {
    if ( !elements ) return;
    const list = Array.isArray( elements ) ? elements : ( elements instanceof NodeList ? Array.from( elements ) : [ elements ] );
    list.forEach( el => el?.removeEventListener( event, handler, options ) );
}

// Attach to window for global access
( window as any ).addEventListeners = addEventListeners;
( window as any ).removeEventListeners = removeEventListeners;
