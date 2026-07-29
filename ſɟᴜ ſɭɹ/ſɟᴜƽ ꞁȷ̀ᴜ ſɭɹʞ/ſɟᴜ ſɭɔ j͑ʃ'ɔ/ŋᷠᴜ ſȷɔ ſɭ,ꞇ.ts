// ≺⧼ Utils and Helpers ⧽≻

import {
    canvas, ctx, stato, panstato, spacstato, tavolstato, objektstato, vojstato, tekststato,
    ILAR_KURSOROJ, KURSORAJ_KLASOJ,
    TABULA_LARGXO, TABULA_ALTO, MIN_GRANDO,
    ROTACIA_TENILA_FORGXO, ROTACIA_TENILA_RADIUSO, GRANDA_TENILA_KONTAKTO,
    TEKSTGRANDA_MULTIPLIKANTO, TEKST_MINLARGXA_MULTIPLIKANTO,
    LINIA_PUNKTO_PATRONO,
    HELEGA_PEZO_R, HELEGA_PEZO_G, HELEGA_PEZO_B, HELEGA_DIVIDANTO, HELEGA_LIMVALORO,
    ANTAPREZENTA_ALFA, KOVRA_LIMVALORA_FRACIO,
    TabulObjekto, Punkto, Objektilo} from "./ꞁȷ̀ɔ j͑ʃƽɔƽ.js";

import {
    malplenigiTekstanObjektonKeson,
    malvalidigiTekstajnKesxojnPorObjektoj
} from "./ſןᴜ ʃɜƽ.js";

// ⟪ Event Helpers 🖱️ ⟫

export interface TuŝaMusaEvento extends MouseEvent {
    touches?: TouchList;
    changedTouches?: TouchList;
}

export function akiriKlientajnKoordinatojn( e: TuŝaMusaEvento ): Punkto {
    const touch = e.touches?.[ 0 ] || e.changedTouches?.[ 0 ];
    return {
        x: touch ? touch.clientX : e.clientX,
        y: touch ? touch.clientY : e.clientY
    };
}

// ⟪ ID Generation 🆔 ⟫

export function generiId( ): string {
    return Date.now( ).toString( 36 ) + Math.random( ).toString( 36 ).substring( 2, 9 );
}

// ⟪ Cursor Helpers 🖰 ⟫

export function restarigiKursoron( ): void {
    if ( !spacstato.isPressed ) {
        agordiKursoron( akiriIlanKursoron( ) );
    }
}

export function agordiKursoron( kursoroTipo: string ): void {
    if ( !canvas ) return;
    canvas.classList.remove( ...KURSORAJ_KLASOJ );
    canvas.classList.add( `canvas-cursor-${kursoroTipo}` );
}

export function akiriIlanKursoron( ): string {
    return ILAR_KURSOROJ[ stato.tool ] || "default";
}

// ⟪ State Reset Helpers 🔄 ⟫

export interface RestartigajOpcioj {
    selection?: boolean;
    panning?: boolean;
    drawing?: boolean;
    textEdit?: boolean;
}

export function restarigiCxiomStaton( opcioj: RestartigajOpcioj = { } ): void {
    const {
        selection = true,
        panning = true,
        drawing = true,
        textEdit = false
    } = opcioj;

    if ( selection ) {
        objektstato.isDragging = false;
        objektstato.isSelecting = false;
        objektstato.isResizing = false;
        objektstato.isRotating = false;
        objektstato.resizeHandle = null;
        objektstato.selectionRect = null;
        objektstato.dragStartX = 0;
        objektstato.dragStartY = 0;
        objektstato.initialRotationAngle = 0;
        objektstato.initialObjectRotations = [];
        objektstato.initialBounds = null;
        objektstato.initialCenterX = 0;
        objektstato.initialCenterY = 0;
        objektstato.initialRotation = 0;
        objektstato.initialObjectStates = [];
    }

    if ( panning ) {
        panstato.isPanning = false;
        if ( spacstato.isPressed ) {
            agordiKursoron( "grab" );
        } else {
            restarigiKursoron( );
        }
    }

    if ( drawing ) {
        stato.isDrawing = false;
        vojstato.current = [];
        vojstato.preview = null;
    }

    if ( textEdit && tekststato.input ) {
        finiTekstanRedaktadon( );
    }

    restarigiKursoron( );
}

export function restarigiSelektanStaton( ): void {
    restarigiCxiomStaton( { selection: true, panning: false, drawing: false } );
}

// ⟪ Button Initialization Helpers 🎛️ ⟫

export function agordiButononPremita( grupaSelektilo: string, btn: HTMLElement | null ): void {
    document.querySelectorAll( grupaSelektilo ).forEach( b =>
        b.setAttribute( "aria-pressed", "false" )
    );
    if ( btn ) btn.setAttribute( "aria-pressed", "true" );
}

export function iniciiButonGrupon( selektilo: string, grupaSelektilo: string, onClick: ( btn: HTMLElement ) => void ): void {
    document.querySelectorAll( selektilo ).forEach( btn => {
        btn.addEventListener( "click", () => {
            if ( grupaSelektilo ) agordiButononPremita( grupaSelektilo, btn as HTMLElement );
            onClick( btn as HTMLElement );
        } );
    } );
}

export function iniciiButonon( id: string, onClick: ( ) => void ): void {
    const btn = document.getElementById( id );
    if ( btn ) btn.addEventListener( "click", onClick );
}

export function iniciiButonojn( butonajAgordoj: Array<{ id: string; onClick: ( ) => void }> ): void {
    butonajAgordoj.forEach( ( { id, onClick } ) => iniciiButonon( id, onClick ) );
}

// ⟪ Text Edit Helpers 📝 ⟫

export function poziciigiTekstanEnigon( x: number, y: number, grandeco: number, koloro: string ): void {
    const zoom = stato.zoomNum / stato.zoomDen;

    tekststato.input!.style.setProperty( "--text-x", ( x * zoom ) + "px" );
    tekststato.input!.style.setProperty( "--text-y", ( ( y - grandeco ) * zoom ) + "px" );
    tekststato.input!.style.setProperty( "--text-size", ( grandeco * zoom ) + "px" );
    tekststato.input!.style.setProperty( "--text-color", koloro );
}

export function akiriTekstanPozicion( ): { textX: number; textY: number } {
    const zoom = stato.zoomNum / stato.zoomDen;

    const x = parseFloat( tekststato.input!.style.getPropertyValue( "--text-x" ) ) / zoom;
    const y = parseFloat( tekststato.input!.style.getPropertyValue( "--text-y" ) ) / zoom + stato.size * TEKSTGRANDA_MULTIPLIKANTO;

    return { textX: x, textY: y };
}

export function finiTekstanRedaktadon( ): void {
    tekststato.input!.classList.remove( "visible" );
    tekststato.input!.innerText = "";
    tekststato.isEditing = false;
    tekststato.editingIndex = -1;
}

// ⟪ Object Bounds Helpers 📐 ⟫

export function akiriObjektonLimojn( obj: TabulObjekto ): { x: number; y: number; width: number; height: number } {
    return akiriObjektilon( obj ).akiriLimojn( obj );
}

export function akiriObjektonEtenditajnLimojn( obj: TabulObjekto, padding: number = 0 ): { x: number; y: number; width: number; height: number } {
    const bounds = akiriObjektonLimojn( obj );
    return {
        x: bounds.x - padding,
        y: bounds.y - padding,
        width: bounds.width + padding * 2,
        height: bounds.height + padding * 2
    };
}

export function akiriObjektonAngulajnPunktojn( obj: TabulObjekto, padding: number = 0 ): Punkto[] {
    const bounds = akiriObjektonEtenditajnLimojn( obj, padding );
    return [
        { x: bounds.x, y: bounds.y },
        { x: bounds.x + bounds.width, y: bounds.y },
        { x: bounds.x, y: bounds.y + bounds.height },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height }
    ];
}

export function akiriCentron( obj: TabulObjekto ): Punkto {
    return akiriObjektilon( obj ).akiriCentron( obj );
}

export function akiriCentronX( obj: TabulObjekto ): number {
    return akiriCentron( obj ).x;
}

export function akiriCentronY( obj: TabulObjekto ): number {
    return akiriCentron( obj ).y;
}

// ⟪ Punkto/Object Detection 🎯 ⟫

export function cxuPunktoEnObjekto( x: number, y: number, obj: TabulObjekto ): boolean {
    return akiriObjektilon( obj ).cxuPunktoEnInterne( x, y, obj );
}

export function troviObjektonCePunkto( x: number, y: number ): TabulObjekto | null {
    for ( let i = objektstato.objects.length - 1; i >= 0; i-- ) {
        const obj = objektstato.objects[ i ];
        const layer = tavolstato.layers.find( l => l.id === obj.layerId );
        if ( !layer || !layer.visible ) continue;

        if ( cxuPunktoEnObjekto( x, y, obj ) ) {
            return obj;
        }
    }
    return null;
}

export function distancoAlObjekto( x: number, y: number, obj: TabulObjekto ): number {
    switch ( obj.type ) {
        case "line":
            return punktoAlLiniaDistanco( x, y, obj.x1!, obj.y1!, obj.x2!, obj.y2! );
        case "connection":
            const endpoints = akiriKonektajnFinpunktojn( obj );
            if ( !endpoints ) return Infinity;
            return punktoAlLiniaDistanco( x, y, endpoints.start.x, endpoints.start.y,
                                       endpoints.end.x, endpoints.end.y );
        case "circle":
            const distToCenter = Math.sqrt( Math.pow( x - obj.x!, 2 ) + Math.pow( y - obj.y!, 2 ) );
            return Math.abs( distToCenter - Math.max( obj.radiusX!, obj.radiusY! ) );
        case "path":
        case "smoothPath":
            let minDist = Infinity;
            for ( let i = 0; i < obj.points!.length - 1; i++ ) {
                const p1 = obj.points![ i ];
                const p2 = obj.points![ i + 1 ];
                const dist = punktoAlLiniaDistanco( x, y, p1.x, p1.y, p2.x, p2.y );
                minDist = Math.min( minDist, dist );
            }
            return minDist;
        default:
            const bounds = akiriObjektonLimojn( obj );
            const closestX = Math.max( bounds.x, Math.min( x, bounds.x + bounds.width ) );
            const closestY = Math.max( bounds.y, Math.min( y, bounds.y + bounds.height ) );
            return Math.sqrt( Math.pow( x - closestX, 2 ) + Math.pow( y - closestY, 2 ) );
    }
}

// ⟪ Geometry Utilities 📏 ⟫

export function punktoAlLiniaDistanco( px: number, py: number, x1: number, y1: number, x2: number, y2: number ): number {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if ( lenSq !== 0 ) param = dot / lenSq;

    let xx, yy;
    if ( param < 0 ) {
        xx = x1; yy = y1;
    } else if ( param > 1 ) {
        xx = x2; yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt( dx * dx + dy * dy );
}

export function distanco( p1: Punkto, p2: Punkto ): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt( dx * dx + dy * dy );
}

// ⟪ Shape Utilities 🔷 ⟫

export function desegniRondigitanAngulanVojon( x: number, y: number, width: number, height: number, radius: number, fill: boolean = false ): void {
    ctx!.beginPath( );
    ctx!.moveTo( x + radius, y );
    ctx!.lineTo( x + width - radius, y );
    ctx!.quadraticCurveTo( x + width, y, x + width, y + radius );
    ctx!.lineTo( x + width, y + height - radius );
    ctx!.quadraticCurveTo( x + width, y + height, x + width - radius, y + height );
    ctx!.lineTo( x + radius, y + height );
    ctx!.quadraticCurveTo( x, y + height, x, y + height - radius );
    ctx!.lineTo( x, y + radius );
    ctx!.quadraticCurveTo( x, y, x + radius, y );
    ctx!.closePath( );
    if ( fill ) ctx!.fill( );
    ctx!.stroke( );
}

export function desegniMalregulanKvadratanVojon( x: number, y: number, width: number, height: number, largeRadius: number, smallRadius: number ): void {
    ctx!.moveTo( x + largeRadius, y );
    ctx!.lineTo( x + width - smallRadius, y );
    ctx!.quadraticCurveTo( x + width, y, x + width, y + smallRadius );
    ctx!.lineTo( x + width, y + height - largeRadius );
    ctx!.quadraticCurveTo( x + width, y + height, x + width - largeRadius, y + height );
    ctx!.lineTo( x + smallRadius, y + height );
    ctx!.quadraticCurveTo( x, y + height, x, y + height - smallRadius );
    ctx!.lineTo( x, y + largeRadius );
    ctx!.quadraticCurveTo( x, y, x + largeRadius, y );
    ctx!.closePath( );
}

/**
 * Compute the two rounded-corner radii used by the asymmetric-square shape
 * and the selection rectangle from a single minimum dimension.
 *     minDimensio ( number ) - the smaller of width / height.
 * Returns both large and small corner radii.
 */
export function kalkuliFormajnRadiusojn( minDimensio: number ): { largeRadius: number; smallRadius: number } {
    return {
        largeRadius: minDimensio / 0o3,
        smallRadius: minDimensio / 0o14
    };
}

export function desegniFormanVojon( x: number, y: number, width: number, height: number, shape: string ): void {
    switch ( shape ) {
        case "triangle":
            ctx!.moveTo( x + width / 2, y );
            ctx!.lineTo( x + width, y + height );
            ctx!.lineTo( x, y + height );
            ctx!.closePath( );
            break;
        case "square":
            const { largeRadius, smallRadius } = kalkuliFormajnRadiusojn( Math.min( width, height ) );
            desegniMalregulanKvadratanVojon( x, y, width, height, largeRadius, smallRadius );
            break;
    }
}

export function desegniFormanAntaprezenton( obj: TabulObjekto, context: CanvasRenderingContext2D | null = null ): void {
    const { x, y, width, height, shape } = obj;
    const ctxToUse = context || ctx;
    if ( !ctxToUse ) return;

    ctxToUse.beginPath( );
    desegniFormanVojon( x!, y!, width!, height!, shape! );
    ctxToUse.stroke( );
}

export function kreiFormanObjekton( shape: string, x1: number, y1: number, x2: number, y2: number ): TabulObjekto | null {
    const baseObj = {
        color: stato.color,
        size: stato.size,
        rotation: 0,
        layerId: tavolstato.activeId
    };

    switch ( shape ) {
        case "line":
            return { ...baseObj, type: "line", x1: x1, y1: y1, x2: x2, y2: y2 };
        case "circle":
            return {
                ...baseObj, type: "circle",
                x: ( x1 + x2 ) / 2, y: ( y1 + y2 ) / 2,
                radiusX: Math.abs( x2 - x1 ) / 2, radiusY: Math.abs( y2 - y1 ) / 2
            };
        case "square":
        case "triangle":
            return {
                ...baseObj, type: "shape", shape: shape,
                x: Math.min( x1, x2 ), y: Math.min( y1, y2 ),
                width: Math.abs( x2 - x1 ), height: Math.abs( y2 - y1 )
            };
        default:
            return null;
    }
}

// ⟪ Path Utilities 〰️ ⟫

export function kreiVojojnObjekton( points: Punkto[], color: string, size: number ): TabulObjekto {
    const xs = points.map( p => p.x );
    const ys = points.map( p => p.y );
    const minX = Math.min( ...xs );
    const minY = Math.min( ...ys );
    const maxX = Math.max( ...xs );
    const maxY = Math.max( ...ys );

    return {
        type: "path",
        points: [ ...points ],
        color: color,
        size: size,
        rotation: 0,
        layerId: tavolstato.activeId,
        bounds: { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
    };
}

export function desegniVojojnSegmentojn( points: Punkto[] ): void {
    if ( points.length < 2 ) return;

    ctx!.beginPath( );
    ctx!.moveTo( points[ 0 ].x, points[ 0 ].y );
    for ( let i = 1; i < points.length; i++ ) {
        ctx!.lineTo( points[ i ].x, points[ i ].y );
    }
}

export function desegniVojojnAntaprezenton( points: Punkto[], color: string, size: number, context: CanvasRenderingContext2D | null = null ): void {
    if ( points.length < 2 ) return;

    const ctxToUse = context || ctx;
    if ( !ctxToUse ) return;

    ctxToUse.save( );
    ctxToUse.strokeStyle = color;
    ctxToUse.lineWidth = size;
    ctxToUse.lineCap = "round";
    ctxToUse.lineJoin = "round";

    desegniVojojnSegmentojn( points );
    ctxToUse.stroke( );
    ctxToUse.restore( );
}

// ⟪ Preview Utilities 👁️ ⟫

export function desegniAntaprezentanFormon( obj: TabulObjekto, context: CanvasRenderingContext2D | null = null ): void {
    if ( !obj ) return;

    const ctxToUse = context || ctx;
    if ( !ctxToUse ) return;

    ctxToUse.save( );
    ctxToUse.setLineDash( LINIA_PUNKTO_PATRONO );
    ctxToUse.strokeStyle = obj.color!;
    ctxToUse.lineWidth = obj.size || 2;
    ctxToUse.globalAlpha = ANTAPREZENTA_ALFA;

    switch ( obj.type ) {
        case "line":
            ctxToUse.beginPath( );
            ctxToUse.moveTo( obj.x1!, obj.y1! );
            ctxToUse.lineTo( obj.x2!, obj.y2! );
            ctxToUse.stroke( );
            break;
        case "circle":
            ctxToUse.beginPath( );
            ctxToUse.ellipse( obj.x!, obj.y!, obj.radiusX!, obj.radiusY!, 0, 0, Math.PI * 0o2 );
            ctxToUse.stroke( );
            break;
        case "shape":
            desegniFormanAntaprezenton( obj, ctxToUse );
            break;
    }

    ctxToUse.restore( );
}

// ⟪ Rectanguloangle Utilities ⬜ ⟫

export interface Rectangulo {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function normaligiRectangulon( rect: Rectangulo ): Rectangulo {
    return {
        x: Math.min( rect.x, rect.x + rect.width ),
        y: Math.min( rect.y, rect.y + rect.height ),
        width: Math.abs( rect.width ),
        height: Math.abs( rect.height )
    };
}

export function cxuObjektoEnRectangulo( obj: TabulObjekto, rect: Rectangulo ): boolean {
    const normalizedRectangulo = normaligiRectangulon( rect );
    const corners = akiriObjektonAngulajnPunktojn( obj );

    for ( const corner of corners ) {
        if ( corner.x >= normalizedRectangulo.x && corner.x <= normalizedRectangulo.x + normalizedRectangulo.width &&
            corner.y >= normalizedRectangulo.y && corner.y <= normalizedRectangulo.y + normalizedRectangulo.height ) {
            return true;
        }
    }
    return false;
}

// ⟪ Color Utilities 🎨 ⟫

export function normaligiHexKoloron( value: string ): string {
    if ( !value.startsWith( "#" ) ) value = "#" + value;
    return value;
}

export function cxuValidaHexKoloro( value: string ): boolean {
    return /^#[0-9A-Fa-f]{6}$/.test( value );
}

export function akiriKontrastajnKolorojn( samplePunktos: Punkto[] ): { stroke: string; fill: string } {
    let lightCount = 0;
    let darkCount = 0;

    for ( const point of samplePunktos ) {
        const pixelData = ctx!.getImageData( Math.floor( point.x ), Math.floor( point.y ), 1, 1 ).data;
        const brightness =
            ( pixelData[ 0 ] * HELEGA_PEZO_R +
             pixelData[ 1 ] * HELEGA_PEZO_G +
             pixelData[ 2 ] * HELEGA_PEZO_B ) / HELEGA_DIVIDANTO;
        if ( brightness > HELEGA_LIMVALORO ) lightCount++;
        else darkCount++;
    }

    return {
        stroke: lightCount > darkCount ? "#000000" : "#ffffff",
        fill: lightCount > darkCount ? "rgba( 0, 0, 0, 0.25 )" : "rgba( 255, 255, 255, 0.25 )"
    };
}

// ⟪ Transform Utilities 🔄 ⟫

export function akiriObjektonKomencanStaton( obj: TabulObjekto ): any {
    const bounds = akiriObjektonLimojn( obj );
    if ( obj.type === "line" ) {
        return { bounds, x1: obj.x1, y1: obj.y1, x2: obj.x2, y2: obj.y2 };
    } else if ( obj.type === "circle" ) {
        return { bounds, x: obj.x, y: obj.y, radiusX: obj.radiusX, radiusY: obj.radiusY };
    } else if ( obj.type === "path" || obj.type === "smoothPath" ) {
        return {
            bounds: { ...obj.bounds },
            points: obj.points!.map( p => ( { x: p.x, y: p.y } ) )
        };
    } else {
        return { bounds, x: obj.x, y: obj.y, width: obj.width, height: obj.height };
    }
}

export function malvalidigiTekstajnKesxojn( ): void {
    malvalidigiTekstajnKesxojnPorObjektoj( objektstato.objects );
}

export function forigiObjekton( obj: TabulObjekto ): void {
    const index = objektstato.objects.indexOf( obj );
    if ( index > -1 ) objektstato.objects.splice( index, 1 );
}

export function transformiSelektitajnObjektojn(
    transformFn: ( obj: TabulObjekto ) => void,
    redrawFn: ( ) => void,
    saveFn: ( ) => void
): void {
    if ( objektstato.selected.length === 0 ) return;
    objektstato.selected.forEach( obj => {
        transformFn( obj );
        malplenigiTekstanObjektonKeson( obj );
    } );
    redrawFn( );
    saveFn( );
}

// ⟪ Resize Handle Utilities 🎯 ⟫

export interface Handle {
    x: number;
    y: number;
    name: string;
    localX: number;
    localY: number;
}

/**
 * Generate the 8 standard resize-handle positions from object bounds.
 * Returns positions in local (un-rotated) coordinates.
 */
function getLocalHandlePositions( bounds: { x: number; y: number; width: number; height: number } ): Array<{ x: number; y: number; name: string }> {
    return [
        { x: bounds.x, y: bounds.y, name: "nw" },
        { x: bounds.x + bounds.width, y: bounds.y, name: "ne" },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height, name: "se" },
        { x: bounds.x, y: bounds.y + bounds.height, name: "sw" },
        { x: bounds.x + bounds.width / 2, y: bounds.y, name: "n" },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height / 2, name: "e" },
        { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height, name: "s" },
        { x: bounds.x, y: bounds.y + bounds.height / 2, name: "w" }
    ];
}

export function akiriTenilojn( obj: TabulObjekto ): Handle[] {
    const bounds = akiriObjektonLimojn( obj );
    const cx = akiriCentronX( obj );
    const cy = akiriCentronY( obj );
    const rotation = obj.rotation || 0;
    const c = Math.cos( rotation ), s = Math.sin( rotation );

    const localHandles = getLocalHandlePositions( bounds );

    return localHandles.map( h => ( {
        x: cx + ( h.x - cx ) * c - ( h.y - cy ) * s,
        y: cy + ( h.x - cx ) * s + ( h.y - cy ) * c,
        name: h.name,
        localX: h.x,
        localY: h.y
    } ) );
}

export function troviGrandSxangxanTenilon( x: number, y: number ): string | null {
    const obj = objektstato.selected[ 0 ];
    if ( !obj ) return null;

    const cx = akiriCentronX( obj );
    const cy = akiriCentronY( obj );
    const rotation = obj.rotation || 0;
    const c = Math.cos( -rotation ), s = Math.sin( -rotation );

    const localX = cx + ( x - cx ) * c - ( y - cy ) * s;
    const localY = cy + ( x - cx ) * s + ( y - cy ) * c;

    const bounds = akiriObjektonLimojn( obj );
    const localHandles = getLocalHandlePositions( bounds );

    for ( const h of localHandles ) {
        if ( Math.abs( localX - h.x ) < GRANDA_TENILA_KONTAKTO &&
            Math.abs( localY - h.y ) < GRANDA_TENILA_KONTAKTO ) {
            return h.name;
        }
    }
    return null;
}

export function troviRotacianTenilon( x: number, y: number ): boolean {
    const obj = objektstato.selected[ 0 ];
    if ( !obj ) return false;

    const cx = akiriCentronX( obj );
    const cy = akiriCentronY( obj );
    const bounds = akiriObjektonLimojn( obj );
    const rotation = obj.rotation || 0;
    const c = Math.cos( rotation ), s = Math.sin( rotation );

    const localTopMid = { x: bounds.x + bounds.width / 2, y: bounds.y };
    const rhX = cx + ( localTopMid.x - cx ) * c - ( localTopMid.y - cy ) * s;
    const rhY = cy + ( localTopMid.x - cx ) * s + ( localTopMid.y - cy ) * c - ROTACIA_TENILA_FORGXO;

    const dist = Math.sqrt( ( x - rhX ) ** 2 + ( y - rhY ) ** 2 );
    return dist < ROTACIA_TENILA_RADIUSO;
}

export function akiriGrandSxangxanKursoron( handle: string ): string {
    const cursors: Record<string, string> = {
        "nw": "nwse-resize", "ne": "nesw-resize",
        "sw": "nesw-resize", "se": "nwse-resize",
        "n": "ns-resize", "s": "ns-resize",
        "w": "ew-resize", "e": "ew-resize"
    };
    return cursors[ handle ] || "default";
}

export function grandSxangxiObjekton( obj: TabulObjekto, x: number, y: number, handle: string ): void {
    const rotation = obj.rotation || 0;
    const cx = akiriCentronX( obj );
    const cy = akiriCentronY( obj );

    const cosR = Math.cos( -rotation );
    const sinR = Math.sin( -rotation );
    const localX = cx + ( x - cx ) * cosR - ( y - cy ) * sinR;
    const localY = cy + ( x - cx ) * sinR + ( y - cy ) * cosR;

    const objIndex = objektstato.selected.indexOf( obj );
    const init = objektstato.initialObjectStates[ objIndex ] || { };
    const baseBounds = init.bounds || init;

    let newLeft = baseBounds.x, newTop = baseBounds.y;
    let newRight = baseBounds.x + baseBounds.width;
    let newBottom = baseBounds.y + baseBounds.height;

    if ( handle.includes( "w" ) ) newLeft = localX;
    if ( handle.includes( "e" ) ) newRight = localX;
    if ( handle.includes( "n" ) ) newTop = localY;
    if ( handle.includes( "s" ) ) newBottom = localY;

    const newWidth = Math.max( MIN_GRANDO, newRight - newLeft );
    const newHeight = Math.max( MIN_GRANDO, newBottom - newTop );

    if ( newWidth === MIN_GRANDO ) {
        if ( handle.includes( "w" ) ) newLeft = newRight - MIN_GRANDO;
        else newRight = newLeft + MIN_GRANDO;
    }
    if ( newHeight === MIN_GRANDO ) {
        if ( handle.includes( "n" ) ) newTop = newBottom - MIN_GRANDO;
        else newBottom = newTop + MIN_GRANDO;
    }

    if ( obj.type === "line" ) {
        grandSxangxiLinianObjekton( obj, handle, baseBounds, newLeft, newTop, newRight, newBottom, newWidth, newHeight );
    } else if ( obj.type === "circle" ) {
        obj.x = ( newLeft + newRight ) / 2;
        obj.y = ( newTop + newBottom ) / 2;
        obj.radiusX = newWidth / 2;
        obj.radiusY = newHeight / 2;
    } else if ( obj.type === "path" || obj.type === "smoothPath" ) {
        grandSxangxiVojojnObjekton( obj, handle, baseBounds, newLeft, newTop, newWidth, newHeight, init );
    } else {
        grandSxangxiFormanObjekton( obj, handle, baseBounds, newLeft, newTop, newWidth, newHeight );
    }
}

export function grandSxangxiLinianObjekton( obj: TabulObjekto, handle: string, baseBounds: any, newLeft: number, newTop: number, newRight: number, newBottom: number, newWidth: number, newHeight: number ): void {
    const { scaleX, scaleY, originX, originY } = akiriGrandSxangxanDevenonKajSkalon( baseBounds, handle, newWidth, newHeight );
    const objIndex = objektstato.selected.indexOf( obj );
    const init = objektstato.initialObjectStates[ objIndex ] || { };

    obj.x1 = originX + ( init.x1 - originX ) * scaleX;
    obj.y1 = originY + ( init.y1 - originY ) * scaleY;
    obj.x2 = originX + ( init.x2 - originX ) * scaleX;
    obj.y2 = originY + ( init.y2 - originY ) * scaleY;
}

export function grandSxangxiVojojnObjekton( obj: TabulObjekto, handle: string, baseBounds: any, newLeft: number, newTop: number, newWidth: number, newHeight: number, init: any ): void {
    const { scaleX, scaleY, originX, originY } = akiriGrandSxangxanDevenonKajSkalon( baseBounds, handle, newWidth, newHeight );

    if ( init.points ) {
        init.points.forEach( ( p: Punkto, i: number ) => {
            obj.points![ i ].x = originX + ( p.x - originX ) * scaleX;
            obj.points![ i ].y = originY + ( p.y - originY ) * scaleY;
        } );
    }

    obj.bounds!.width = newWidth;
    obj.bounds!.height = newHeight;
    if ( handle.includes( "w" ) ) obj.bounds!.x = newLeft;
    if ( handle.includes( "n" ) ) obj.bounds!.y = newTop;
}

export function grandSxangxiFormanObjekton( obj: TabulObjekto, handle: string, baseBounds: any, newLeft: number, newTop: number, newWidth: number, newHeight: number ): void {
    const adjustments: Record<string, () => void> = {
        "n": () => { obj.y = newTop; obj.height = newHeight; },
        "s": () => { obj.y = baseBounds.y; obj.height = newHeight; },
        "w": () => { obj.x = newLeft; obj.width = newWidth; },
        "e": () => { obj.x = baseBounds.x; obj.width = newWidth; },
        "nw": () => { obj.x = newLeft; obj.y = newTop; obj.width = newWidth; obj.height = newHeight; },
        "ne": () => { obj.x = baseBounds.x; obj.y = newTop; obj.width = newWidth; obj.height = newHeight; },
        "sw": () => { obj.x = newLeft; obj.y = baseBounds.y; obj.width = newWidth; obj.height = newHeight; },
        "se": () => { obj.x = baseBounds.x; obj.y = baseBounds.y; obj.width = newWidth; obj.height = newHeight; }
    };

    if ( adjustments[ handle ] ) adjustments[ handle ]( );

    if ( obj.type === "text" ) {
        obj.size = obj.height! / TEKSTGRANDA_MULTIPLIKANTO;
        obj.textDirty = true;
        obj.cachedCanvas = null;
        obj.cachedWidth = null;
        obj.cachedHeight = null;
    }
}

// ⟪ Move Object Utilities 🚚 ⟫

export function moviObjektonPerDelta( obj: TabulObjekto, dx: number, dy: number, initial: any ): void {
    if ( obj.type === "line" ) {
        obj.x1 = initial.x1 + dx; obj.y1 = initial.y1 + dy;
        obj.x2 = initial.x2 + dx; obj.y2 = initial.y2 + dy;
    } else if ( obj.type === "circle" ) {
        obj.x = initial.x + dx; obj.y = initial.y + dy;
    } else if ( obj.type === "path" || obj.type === "smoothPath" ) {
        const initBounds = initial.bounds || initial;
        obj.points!.forEach( ( p: Punkto, i: number ) => {
            const initPunkto = initial.points ? initial.points[ i ] : p;
            p.x = initPunkto.x + dx;
            p.y = initPunkto.y + dy;
        } );
        obj.bounds!.x = initBounds.x + dx;
        obj.bounds!.y = initBounds.y + dy;
    } else {
        obj.x = initial.x + dx;
        obj.y = initial.y + dy;
        malplenigiTekstanObjektonKeson( obj );
    }
}

// ⟪ Eraser Utilities 🧹 ⟫

export function etendiLimojn( bounds: { x: number; y: number; width: number; height: number }, radius: number ): { x: number; y: number; width: number; height: number } {
    return {
        x: bounds.x - radius,
        y: bounds.y - radius,
        width: bounds.width + radius * 2,
        height: bounds.height + radius * 2
    };
}

export function forvisxiObjektojnLaute( eraserPath: Punkto[], eraserSize: number, eraseEntireObjects: boolean = false ): boolean {
    const objectsToRemove: TabulObjekto[] = [];
    const objectsToSplit: Array<{ object: TabulObjekto; index: number }> = [];
    const newObjects: TabulObjekto[] = [];
    const eraserRadius = eraserSize;

    for ( let i = objektstato.objects.length - 1; i >= 0; i-- ) {
        const obj = objektstato.objects[ i ];
        const layer = tavolstato.layers.find( l => l.id === obj.layerId );
        if ( !layer || !layer.visible ) continue;

        if ( eraseEntireObjects ) {
            if ( cxuObjektoTusxasVojon( obj, eraserPath, eraserRadius ) ) {
                objectsToRemove.push( obj );
            }
        } else {
            const intersection = cxuObjektoKuntrasasVojon( obj, eraserPath, eraserRadius );
            if ( intersection === "full" ) {
                objectsToRemove.push( obj );
            } else if ( intersection === "partial" ) {
                objectsToSplit.push( { object: obj, index: i } );
            }
        }
    }

    objectsToRemove.forEach( obj => forigiObjekton( obj ) );

    objectsToSplit.reverse( ).forEach( item => {
        const { object: obj, index } = item;
        const splitResult = dividiObjektonPerVojo( obj, eraserPath, eraserRadius );

        if ( splitResult ) {
            forigiObjekton( obj );
            if ( splitResult.newObjects ) {
                splitResult.newObjects.forEach( newObj => {
                    if ( newObj && cxuValidaObjekto( newObj ) ) {
                        newObjects.push( newObj );
                    }
                } );
            }
        }
    } );

    newObjects.forEach( obj => objektstato.objects.push( obj ) );
    return objectsToRemove.length + objectsToSplit.length > 0;
}

export function cxuObjektoTusxasVojon( obj: TabulObjekto, path: Punkto[], eraserRadius: number ): boolean {
    const expandedBounds = etendiLimojn( akiriObjektonLimojn( obj ), eraserRadius );

    if ( obj.type === "line" ) {
        for ( let i = 0; i < path.length - 1; i++ ) {
            if ( cxuSegmentojKuntrasasKunRadiuso(
                obj.x1!, obj.y1!, obj.x2!, obj.y2!,
                path[ i ].x, path[ i ].y, path[ i + 1 ].x, path[ i + 1 ].y,
                eraserRadius
            ) ) return true;
        }
    } else if ( obj.type === "path" || obj.type === "smoothPath" ) {
        for ( let j = 0; j < obj.points!.length - 1; j++ ) {
            const p1 = obj.points![ j ];
            const p2 = obj.points![ j + 1 ];
            for ( let i = 0; i < path.length - 1; i++ ) {
                if ( cxuSegmentojKuntrasasKunRadiuso(
                    p1.x, p1.y, p2.x, p2.y,
                    path[ i ].x, path[ i ].y, path[ i + 1 ].x, path[ i + 1 ].y,
                    eraserRadius
                ) ) return true;
            }
        }
    }

    for ( const point of path ) {
        if ( point.x >= expandedBounds.x && point.x <= expandedBounds.x + expandedBounds.width &&
            point.y >= expandedBounds.y && point.y <= expandedBounds.y + expandedBounds.height ) {
            if ( distancoAlObjekto( point.x, point.y, obj ) <= eraserRadius ) return true;
        }
    }
    return false;
}

export function cxuObjektoKuntrasasVojon( obj: TabulObjekto, path: Punkto[], eraserRadius: number ): "none" | "partial" | "full" {
    const expandedBounds = etendiLimojn( akiriObjektonLimojn( obj ), eraserRadius );
    let anyPunktoNearObject = false;

    for ( const point of path ) {
        if ( point.x >= expandedBounds.x && point.x <= expandedBounds.x + expandedBounds.width &&
            point.y >= expandedBounds.y && point.y <= expandedBounds.y + expandedBounds.height ) {
            anyPunktoNearObject = true;
            break;
        }
    }

    if ( !anyPunktoNearObject ) return "none";

    const objectSamplePunktos = akiriObjektonSpecimenajnPunktojnPorVisxado( obj );
    let coveredCount = 0;

    for ( const samplePunkto of objectSamplePunktos ) {
        for ( const erasePunkto of path ) {
            if ( distanco( samplePunkto, erasePunkto ) <= eraserRadius ) {
                coveredCount++;
                break;
            }
        }
    }

    if ( coveredCount >= objectSamplePunktos.length * KOVRA_LIMVALORA_FRACIO ) return "full";
    return "partial";
}

export function akiriObjektonSpecimenajnPunktojnPorVisxado( obj: TabulObjekto ): Punkto[] {
    const points: Punkto[] = [];
    const bounds = akiriObjektonLimojn( obj );
    const center = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };

    points.push( center );
    points.push(
        { x: bounds.x, y: bounds.y },
        { x: bounds.x + bounds.width, y: bounds.y },
        { x: bounds.x, y: bounds.y + bounds.height },
        { x: bounds.x + bounds.width, y: bounds.y + bounds.height },
        { x: center.x, y: bounds.y },
        { x: center.x, y: bounds.y + bounds.height },
        { x: bounds.x, y: center.y },
        { x: bounds.x + bounds.width, y: center.y }
    );

    if ( obj.type === "path" || obj.type === "smoothPath" ) {
        obj.points!.forEach( p => points.push( { x: p.x, y: p.y } ) );
    }

    if ( obj.type === "line" ) {
        points.push( { x: obj.x1!, y: obj.y1! }, { x: obj.x2!, y: obj.y2! } );
    }

    return points;
}

export function dividiObjektonPerVojo( obj: TabulObjekto, eraserPath: Punkto[], eraserSize: number ): { newObjects: TabulObjekto[] } {
    const eraserRadius = eraserSize;

    if ( obj.type === "path" || obj.type === "smoothPath" ) {
        return dividiVojojnObjekton( obj, eraserPath, eraserRadius );
    } else if ( obj.type === "line" ) {
        return dividiLinianObjekton( obj, eraserPath, eraserRadius );
    } else if ( obj.type === "circle" ) {
        return dividiRondanObjekton( obj, eraserPath, eraserRadius );
    }

    return { newObjects: [] };
}

export function dividiVojojnObjekton( obj: TabulObjekto, eraserPath: Punkto[], eraserRadius: number ): { newObjects: TabulObjekto[] } {
    const segments: Punkto[][] = [];
    let currentSegment: Punkto[] = [];

    for ( let i = 0; i < obj.points!.length; i++ ) {
        const point = obj.points![ i ];
        let pointErased = false;

        for ( const erasePunkto of eraserPath ) {
            if ( distanco( point, erasePunkto ) <= eraserRadius ) {
                pointErased = true;
                break;
            }
        }

        if ( i > 0 && !pointErased ) {
            const prevPunkto = obj.points![ i - 1 ];
            for ( let j = 0; j < eraserPath.length - 1; j++ ) {
                const e1 = eraserPath[ j ];
                const e2 = eraserPath[ j + 1 ];
                if ( cxuSegmentojKuntrasasKunRadiuso(
                    prevPunkto.x, prevPunkto.y, point.x, point.y,
                    e1.x, e1.y, e2.x, e2.y, eraserRadius
                ) ) {
                    pointErased = true;
                    break;
                }
            }
        }

        if ( pointErased ) {
            if ( currentSegment.length > 1 ) segments.push( [ ...currentSegment ] );
            currentSegment = [];
        } else {
            currentSegment.push( { x: point.x, y: point.y } );
        }
    }

    if ( currentSegment.length > 1 ) segments.push( currentSegment );

    if ( segments.length === 0 ) return { newObjects: [] };
    if ( segments.length === 1 && segments[ 0 ].length === obj.points!.length ) return { newObjects: [ obj ] };

    const newObjects = segments.map( segment => {
        const xs = segment.map( p => p.x );
        const ys = segment.map( p => p.y );
        return {
            type: obj.type,
            points: segment,
            color: obj.color,
            size: obj.size,
            rotation: 0,
            layerId: obj.layerId,
            bounds: {
                x: Math.min( ...xs ),
                y: Math.min( ...ys ),
                width: Math.max( ...xs ) - Math.min( ...xs ),
                height: Math.max( ...ys ) - Math.min( ...ys )
            }
        };
    } );

    return { newObjects };
}

export function dividiLinianObjekton( obj: TabulObjekto, eraserPath: Punkto[], eraserRadius: number ): { newObjects: TabulObjekto[] } {
    const intersections: number[] = [];

    for ( let i = 0; i < eraserPath.length - 1; i++ ) {
        const e1 = eraserPath[ i ];
        const e2 = eraserPath[ i + 1 ];

        const expandedEraserSegments = [
            { x1: e1.x - eraserRadius, y1: e1.y, x2: e2.x - eraserRadius, y2: e2.y },
            { x1: e1.x + eraserRadius, y1: e1.y, x2: e2.x + eraserRadius, y2: e2.y }
        ];

        for ( const seg of expandedEraserSegments ) {
            const t = liniaLiniaKuntraso(
                obj.x1!, obj.y1!, obj.x2!, obj.y2!,
                seg.x1, seg.y1, seg.x2, seg.y2
            );
            if ( t !== null && t >= 0 && t <= 1 ) intersections.push( t );
        }

        const dist1 = punktoAlLiniaDistanco( e1.x, e1.y, obj.x1!, obj.y1!, obj.x2!, obj.y2! );
        const dist2 = punktoAlLiniaDistanco( e2.x, e2.y, obj.x1!, obj.y1!, obj.x2!, obj.y2! );

        if ( dist1 < eraserRadius ) {
            const t = akiriLiniaT( e1.x, e1.y, obj.x1!, obj.y1!, obj.x2!, obj.y2! );
            if ( t !== null ) intersections.push( t );
        }
        if ( dist2 < eraserRadius ) {
            const t = akiriLiniaT( e2.x, e2.y, obj.x1!, obj.y1!, obj.x2!, obj.y2! );
            if ( t !== null ) intersections.push( t );
        }
    }

    intersections.push( 0, 1 );
    intersections.sort( ( a, b ) => a - b );
    const unique = [ intersections[ 0 ] ];
    for ( let i = 1; i < intersections.length; i++ ) {
        if ( intersections[ i ] - intersections[ i - 1 ] > 0o1 / 0o100 ) unique.push( intersections[ i ] );
    }

    const newObjects: TabulObjekto[] = [];
    for ( let i = 0; i < unique.length - 1; i++ ) {
        const t1 = unique[ i ];
        const t2 = unique[ i + 1 ];
        const midT = ( t1 + t2 ) / 2;

        const midX = obj.x1! + ( obj.x2! - obj.x1! ) * midT;
        const midY = obj.y1! + ( obj.y2! - obj.y1! ) * midT;

        let isErased = false;
        const midPunkto = { x: midX, y: midY };
        for ( const erasePunkto of eraserPath ) {
            if ( distanco( midPunkto, erasePunkto ) < eraserRadius ) {
                isErased = true;
                break;
            }
        }

        if ( !isErased ) {
            newObjects.push( {
                type: "line",
                x1: obj.x1! + ( obj.x2! - obj.x1! ) * t1,
                y1: obj.y1! + ( obj.y2! - obj.y1! ) * t1,
                x2: obj.x1! + ( obj.x2! - obj.x1! ) * t2,
                y2: obj.y1! + ( obj.y2! - obj.y1! ) * t2,
                color: obj.color,
                size: obj.size,
                rotation: 0,
                layerId: obj.layerId
            } );
        }
    }

    return { newObjects };
}

export function dividiRondanObjekton( obj: TabulObjekto, eraserPath: Punkto[], eraserRadius: number ): { newObjects: TabulObjekto[] } {
    let anyPunktoErased = false;
    const sampleAngles = [ 0, Math.PI / 0o4, Math.PI / 0o2, 3 * Math.PI / 0o4, Math.PI, 5 * Math.PI / 0o4, 3 * Math.PI / 0o2, 7 * Math.PI / 0o4 ];
    const survivingPunktos: Array<{ angle: number; x: number; y: number }> = [];

    for ( const angle of sampleAngles ) {
        const point = {
            x: obj.x! + obj.radiusX! * Math.cos( angle ),
            y: obj.y! + obj.radiusY! * Math.sin( angle )
        };

        let pointErased = false;
        for ( const erasePunkto of eraserPath ) {
            if ( distanco( point, erasePunkto ) < eraserRadius ) {
                pointErased = true;
                anyPunktoErased = true;
                break;
            }
        }

        if ( !pointErased ) survivingPunktos.push( { angle, x: point.x, y: point.y } );
    }

    let centerErased = false;
    const center = { x: obj.x!, y: obj.y! };
    for ( const erasePunkto of eraserPath ) {
        if ( distanco( center, erasePunkto ) < eraserRadius ) {
            centerErased = true;
            break;
        }
    }

    if ( !anyPunktoErased ) return { newObjects: [ obj ] };
    if ( survivingPunktos.length < 3 || centerErased ) return { newObjects: [] };
    return { newObjects: [] };
}

export function akiriLiniaT( x: number, y: number, x1: number, y1: number, x2: number, y2: number ): number | null {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.abs( dx ) > Math.abs( dy ) ? ( dx !== 0 ? ( x - x1 ) / dx : null ) : ( dy !== 0 ? ( y - y1 ) / dy : null );
}

export function cxuLiniojKuntrasas( x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number ): boolean {
    const denom = ( y4 - y3 ) * ( x2 - x1 ) - ( x4 - x3 ) * ( y2 - y1 );
    if ( denom === 0 ) return false;
    const ua = ( ( x4 - x3 ) * ( y1 - y3 ) - ( y4 - y3 ) * ( x1 - x3 ) ) / denom;
    const ub = ( ( x2 - x1 ) * ( y1 - y3 ) - ( y2 - y1 ) * ( x1 - x3 ) ) / denom;
    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}

export function liniaLiniaKuntraso( x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number ): number | null {
    const denom = ( y4 - y3 ) * ( x2 - x1 ) - ( x4 - x3 ) * ( y2 - y1 );
    if ( denom === 0 ) return null;
    return ( ( x4 - x3 ) * ( y1 - y3 ) - ( y4 - y3 ) * ( x1 - x3 ) ) / denom;
}

export function cxuSegmentojKuntrasasKunRadiuso( x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, radius: number ): boolean {
    if ( cxuLiniojKuntrasas( x1, y1, x2, y2, x3, y3, x4, y4 ) ) return true;

    const dist1 = punktoAlSegmentaDistanco( x1, y1, x3, y3, x4, y4 );
    const dist2 = punktoAlSegmentaDistanco( x2, y2, x3, y3, x4, y4 );
    if ( dist1 <= radius || dist2 <= radius ) return true;

    const dist3 = punktoAlSegmentaDistanco( x3, y3, x1, y1, x2, y2 );
    const dist4 = punktoAlSegmentaDistanco( x4, y4, x1, y1, x2, y2 );
    return dist3 <= radius || dist4 <= radius;
}

export function punktoAlSegmentaDistanco( px: number, py: number, x1: number, y1: number, x2: number, y2: number ): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;

    if ( lenSq === 0 ) return distanco( { x: px, y: py }, { x: x1, y: y1 } );

    let t = ( ( px - x1 ) * dx + ( py - y1 ) * dy ) / lenSq;
    t = Math.max( 0, Math.min( 1, t ) );

    const closestX = x1 + t * dx;
    const closestY = y1 + t * dy;

    return distanco( { x: px, y: py }, { x: closestX, y: closestY } );
}

export function cxuValidaObjekto( obj: TabulObjekto | null ): boolean {
    if ( !obj ) return false;
    if ( obj.type === "path" || obj.type === "smoothPath" ) {
        return obj.points !== undefined && obj.points.length > 1;
    }
    if ( obj.type === "line" ) {
        return Math.abs( ( obj.x2 || 0 ) - ( obj.x1 || 0 ) ) > 0o1 / 0o100 || Math.abs( ( obj.y2 || 0 ) - ( obj.y1 || 0 ) ) > 0o1 / 0o100;
    }
    return true;
}

// ⟪ Resize Helpers 📐 ⟫

export function akiriGrandSxangxanDevenonKajSkalon( baseBounds: any, handle: string, newWidth: number, newHeight: number ): { scaleX: number; scaleY: number; originX: number; originY: number } {
    const scaleX = newWidth / baseBounds.width;
    const scaleY = newHeight / baseBounds.height;
    const originX = handle.includes( "w" ) ? baseBounds.x + baseBounds.width : baseBounds.x;
    const originY = handle.includes( "n" ) ? baseBounds.y + baseBounds.height : baseBounds.y;

    return { scaleX, scaleY, originX, originY };
}

// ⟪ Object Type Registry 📐 ⟫

export const OBJEKTILOJ: Record<string, Objektilo> = {
    line: {
        akiriLimojn( obj ) {
            return {
                x: Math.min( obj.x1!, obj.x2! ),
                y: Math.min( obj.y1!, obj.y2! ),
                width: Math.abs( obj.x2! - obj.x1! ),
                height: Math.abs( obj.y2! - obj.y1! )
            };
        },
        akiriCentron( obj ) {
            return { x: ( obj.x1! + obj.x2! ) / 2, y: ( obj.y1! + obj.y2! ) / 2 };
        },
        cxuPunktoEnInterne( x, y, obj ) {
            return punktoAlLiniaDistanco( x, y, obj.x1!, obj.y1!, obj.x2!, obj.y2! ) < obj.size! + 0o4;
        },
        akiriKomencajnLimojn( obj ) {
            return { x1: obj.x1, y1: obj.y1, x2: obj.x2, y2: obj.y2 };
        },
        grandSxangxi( obj, handle, localX, localY, init ) {
            if ( handle.includes( "n" ) ) obj.y1 = localY;
            if ( handle.includes( "s" ) ) obj.y2 = localY;
            if ( handle.includes( "w" ) ) obj.x1 = localX;
            if ( handle.includes( "e" ) ) obj.x2 = localX;
        }
    },

    circle: {
        akiriLimojn( obj ) {
            return {
                x: obj.x! - obj.radiusX!,
                y: obj.y! - obj.radiusY!,
                width: obj.radiusX! * 2,
                height: obj.radiusY! * 2
            };
        },
        akiriCentron( obj ) {
            return { x: obj.x!, y: obj.y! };
        },
        cxuPunktoEnInterne( x, y, obj ) {
            const dx = x - obj.x!;
            const dy = y - obj.y!;
            return ( dx * dx ) / ( obj.radiusX! * obj.radiusX! ) +
                   ( dy * dy ) / ( obj.radiusY! * obj.radiusY! ) <= 1;
        },
        akiriKomencajnLimojn( obj ) {
            return { x: obj.x!, y: obj.y!, radiusX: obj.radiusX!, radiusY: obj.radiusY! };
        },
        grandSxangxi( obj, handle, localX, localY, init ) {
            const newLeft = localX, newTop = localY;
            const newRight = init.x + ( init.radiusX * 0o2 );
            const newBottom = init.y + ( init.radiusY * 0o2 );
            obj.x = ( newLeft + newRight ) / 2;
            obj.y = ( newTop + newBottom ) / 2;
            obj.radiusX = Math.max( MIN_GRANDO, newRight - newLeft ) / 2;
            obj.radiusY = Math.max( MIN_GRANDO, newBottom - newTop ) / 2;
        }
    },

    text: {
        akiriLimojn( obj ) {
            if ( obj.useHtmlText && obj.cachedWidth && obj.cachedHeight ) {
                return {
                    x: obj.x!,
                    y: obj.y! - obj.cachedHeight,
                    width: obj.cachedWidth,
                    height: obj.cachedHeight
                };
            }
            ctx!.font = `${obj.size}px "j͑ʃꞇȝ", "ı],ᴜ }ʃᴜ", sans-serif`;
            const metrics = ctx!.measureText( obj.text || "W" );
            const width = Math.max( metrics.width, obj.size! * TEKST_MINLARGXA_MULTIPLIKANTO );
            const height = obj.size!;
            return { x: obj.x!, y: obj.y! - height, width, height };
        },
        akiriCentron( obj ) {
            const bounds = OBJEKTILOJ.text.akiriLimojn( obj );
            return { x: obj.x! + bounds.width / 2, y: obj.y! - bounds.height / 2 };
        },
        cxuPunktoEnInterne( x, y, obj ) {
            const bounds = OBJEKTILOJ.text.akiriLimojn( obj );
            return x >= bounds.x && x <= bounds.x + bounds.width &&
                   y >= bounds.y && y <= bounds.y + bounds.height;
        },
        akiriKomencajnLimojn( obj ) {
            return { x: obj.x, y: obj.y, width: obj.cachedWidth, height: obj.cachedHeight };
        },
        grandSxangxi( obj, handle, localX, localY, init ) {
            obj.x = localX;
            obj.y = localY + obj.size!;
        }
    },

    path: {
        akiriLimojn( obj ) {
            return { ...obj.bounds! };
        },
        akiriCentron( obj ) {
            return {
                x: obj.bounds!.x + obj.bounds!.width / 2,
                y: obj.bounds!.y + obj.bounds!.height / 2
            };
        },
        cxuPunktoEnInterne( x, y, obj ) {
            return x >= obj.bounds!.x && x <= obj.bounds!.x + obj.bounds!.width &&
                   y >= obj.bounds!.y && y <= obj.bounds!.y + obj.bounds!.height;
        },
        akiriKomencajnLimojn( obj ) {
            return {
                bounds: { ...obj.bounds },
                points: obj.points!.map( ( p: Punkto ) => ( { x: p.x, y: p.y } ) )
            };
        },
        grandSxangxi( obj, handle, localX, localY, init ) {
            const { scaleX, scaleY, originX, originY } = akiriGrandSxangxanDevenonKajSkalon( init.bounds, handle,
                localX - init.bounds.x, localY - init.bounds.y );
            obj.points = init.points.map( ( p: Punkto ) => ( {
                x: originX + ( p.x - originX ) * scaleX,
                y: originY + ( p.y - originY ) * scaleY
            } ) );
            const xs = obj.points!.map( ( p: Punkto ) => p.x );
            const ys = obj.points!.map( ( p: Punkto ) => p.y );
            obj.bounds = {
                x: Math.min( ...xs ),
                y: Math.min( ...ys ),
                width: Math.max( ...xs ) - Math.min( ...xs ),
                height: Math.max( ...ys ) - Math.min( ...ys )
            };
        }
    },

    smoothPath: {
        akiriLimojn( obj ) { return OBJEKTILOJ.path!.akiriLimojn( obj ); },
        akiriCentron( obj ) { return OBJEKTILOJ.path!.akiriCentron( obj ); },
        cxuPunktoEnInterne( x, y, obj ) { return OBJEKTILOJ.path!.cxuPunktoEnInterne( x, y, obj ); },
        akiriKomencajnLimojn( obj ) { return OBJEKTILOJ.path!.akiriKomencajnLimojn!( obj ); },
        grandSxangxi( obj, handle, localX, localY, init ) { OBJEKTILOJ.path!.grandSxangxi!( obj, handle, localX, localY, init ); }
    },

    connection: {
        akiriLimojn( obj ) {
            const endpoints = akiriKonektajnFinpunktojn( obj );
            if ( !endpoints ) return { x: 0, y: 0, width: 0, height: 0 };
            return {
                x: Math.min( endpoints.start.x, endpoints.end.x ),
                y: Math.min( endpoints.start.y, endpoints.end.y ),
                width: Math.abs( endpoints.end.x - endpoints.start.x ),
                height: Math.abs( endpoints.end.y - endpoints.start.y )
            };
        },
        akiriCentron( obj ) {
            const endpoints = akiriKonektajnFinpunktojn( obj );
            if ( !endpoints ) return { x: 0, y: 0 };
            return {
                x: ( endpoints.start.x + endpoints.end.x ) / 2,
                y: ( endpoints.start.y + endpoints.end.y ) / 2
            };
        },
        cxuPunktoEnInterne( x, y, obj ) {
            const endpoints = akiriKonektajnFinpunktojn( obj );
            if ( !endpoints ) return false;
            return punktoAlLiniaDistanco( x, y, endpoints.start.x, endpoints.start.y,
                                       endpoints.end.x, endpoints.end.y ) < obj.size! + 0o4;
        },
        akiriKomencajnLimojn( obj ) {
            return { startId: obj.startId, endId: obj.endId };
        },
    },

    shape: {
        akiriLimojn( obj ) {
            return {
                x: obj.x!,
                y: obj.y!,
                width: obj.width || TABULA_LARGXO,
                height: obj.height || TABULA_ALTO
            };
        },
        akiriCentron( obj ) {
            return {
                x: obj.x! + ( obj.width || TABULA_LARGXO ) / 2,
                y: obj.y! + ( obj.height || TABULA_ALTO ) / 2
            };
        },
        cxuPunktoEnInterne( x, y, obj ) {
            return x >= obj.x! && x <= obj.x! + obj.width! &&
                   y >= obj.y! && y <= obj.y! + obj.height!;
        },
        akiriKomencajnLimojn( obj ) {
            return { x: obj.x, y: obj.y, width: obj.width, height: obj.height };
        },
        grandSxangxi( obj, handle, localX, localY, init ) {
            const { scaleX, scaleY, originX, originY } = akiriGrandSxangxanDevenonKajSkalon( init, handle,
                localX - init.x, localY - init.y );
            obj.x = originX;
            obj.y = originY;
            obj.width = Math.max( MIN_GRANDO, init.width * scaleX );
            obj.height = Math.max( MIN_GRANDO, init.height * scaleY );
        }
    }
};

export const IMPLICITA_OBJEKTILO: Objektilo = {
    akiriLimojn( obj ) {
        return { x: obj.x!, y: obj.y!, width: TABULA_LARGXO, height: TABULA_ALTO };
    },
    akiriCentron( obj ) {
        return { x: obj.x! + TABULA_LARGXO / 2, y: obj.y! + TABULA_ALTO / 2 };
    },
    cxuPunktoEnInterne( x, y, obj ) {
        return false;
    },
    akiriKomencajnLimojn( obj ) {
        return { x: obj.x, y: obj.y, width: obj.width, height: obj.height };
    },
    grandSxangxi( obj, handle, localX, localY, init ) { }
};

export function akiriObjektilon( obj: TabulObjekto ): Objektilo {
    return OBJEKTILOJ[ obj.type ] || IMPLICITA_OBJEKTILO;
}

// ⟪ Connection Helpers 🔗 ⟫

export function akiriKonektajnFinpunktojn( connectionObj: TabulObjekto ): { start: Punkto; end: Punkto } | null {
    const startObj = objektstato.objects.find( o => o.id === connectionObj.startId );
    const endObj = objektstato.objects.find( o => o.id === connectionObj.endId );
    if ( !startObj || !endObj ) return null;
    return { start: akiriCentron( startObj ), end: akiriCentron( endObj ) };
}
