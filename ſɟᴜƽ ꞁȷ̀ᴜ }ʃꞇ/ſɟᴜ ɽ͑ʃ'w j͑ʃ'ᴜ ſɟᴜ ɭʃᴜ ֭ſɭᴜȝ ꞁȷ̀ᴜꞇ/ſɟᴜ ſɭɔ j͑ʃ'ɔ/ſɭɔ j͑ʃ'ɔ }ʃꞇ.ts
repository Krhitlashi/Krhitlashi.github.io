import QRCode, { QRCode as QRCodeType } from "qrcode";

// ⟪ j͑ʃɹ ſɭᴜ ɽ͑ʃ'ᴜ }ʃw ⚙️ ⟫

const KANAQANIDOMA_2TBE = 0o14 / 0o20; // 0.0 ( square ) to 1.0 ( full circle / leaf )
const VEM2_XAHA = 0o1; // Supersampling factor for anti-aliasing

const PAL6_KUCAQ_XAHA = 0o20 * 0o10; // Box size * supersampling

const VOP2_RUVACATAHAQU = "ɭʃɔ";

// ⟪ ſ͔ɭɔ }ʃɔɔ˞ ֭ſɭᴜ ı],ɔ 🖌️ ⟫

/**
 * Calculates amount curved for angle
 * @param sost2 ( [ number, number ] ) - Center point [ x, y ]
 * @param r ( number ) - Radius
 * @param sefini_saxe ( number ) - Start angle in degrees
 * @param sefini_tlakak ( number ) - End angle in degrees
 * @param n ( number = 45 ) - Number of points ( default 45 for smoother curves )
 * Returns [ number, number ][]
 *     Array of points along the arc
 */
function quq_vem2_fkabe(
    sost2: [number, number],
    r: number,
    sefini_saxe: number,
    sefini_tlakak: number,
    n: number = 45
): [number, number][] {
    const er2ha_vem2ni: [number, number][] = [];
    for ( let i = 0; i <= n; i++ ) {
        const tafkaq = ( sefini_saxe + ( sefini_tlakak - sefini_saxe ) * i / n ) * ( Math.PI / 180 );
        er2ha_vem2ni.push( [
            sost2[0] + r * Math.cos( tafkaq ),
            sost2[1] + r * Math.sin( tafkaq )
        ] );
    }
    return er2ha_vem2ni;
}

interface StyledPilImageOptions {
    box_size?: number;
    border?: number;
    paint_color?: [number, number, number, number];
    embeded_araq_tahaq?: string;
    [ key: string ]: unknown;
}

interface QRCodeData {
    modules: boolean[][];
    border: number;
}

class IitbesuRuvaCatahaqu {
    private _img: HTMLCanvasElement;
    private canvas: CanvasRenderingContext2D | null = null;
    private embeded_araq_tahaq: string | undefined;
    public box_size: number;
    public border: number;
    public paint_color: [number, number, number, number];
    public KANAQANIDOMA_2TBE: number = KANAQANIDOMA_2TBE;

    constructor(
        public modules: boolean[][],
        options: StyledPilImageOptions = {}
    ) {
        this.box_size = options.box_size || 0o10;
        this.border = options.border || 4;
        this.paint_color = options.paint_color || [ 0, 0, 0, 255 ];
        this.embeded_araq_tahaq = options.embeded_araq_tahaq;

        const moduleCount = modules.length;
        const size = ( moduleCount + this.border * 2 ) * this.box_size;
        this._img = document.createElement( "canvas" );
        this._img.width = size;
        this._img.height = size;
        this.canvas = this._img.getContext( "2d" );
    }

    async k2fal_sost2su_tahaq(): Promise<void> {
        if ( !this.embeded_araq_tahaq || !this.canvas ) return;

        const tahaq = await this.loadImage( this.embeded_araq_tahaq );
        const sf = this._img.width;
        const ld = this._img.height;
        const araq: [number, number] = [
            Math.floor( ( sf - tahaq.width ) / 2 ),
            Math.floor( ( ld - tahaq.height ) / 2 )
        ];

        this.canvas.drawImage( tahaq, araq[0], araq[1] );
    }

    private loadImage( src: string ): Promise<HTMLImageElement> {
        return new Promise( ( resolve, reject ) => {
            const img = new Image();
            img.onload = () => resolve( img );
            img.onerror = reject;
            img.src = src;
        } );
    }

    drawrect_context( row: number, col: number, qr: QRCodeData, visited?: Set<string> ): void {
        if ( !this.canvas ) {
            this.canvas = this._img.getContext( "2d" );
        }

        if ( this.is_eye( row, col, qr ) ) {
            const sefini = qr.modules.length;
            const a1a_ls = row === 0 && col === 0;
            const a1a_lr = row === 0 && col === sefini - 7;
            const a1a_ks = row === sefini - 7 && col === 0;

            if ( a1a_ls || a1a_lr || a1a_ks ) {
                this.k2f_2banusost2su( row, col, a1a_ls, a1a_lr, a1a_ks );
            }
            return;
        }

        this.drawVerticalPill( row, col, qr, visited );
    }

    private is_eye( row: number, col: number, qr: QRCodeData ): boolean {
        const sefini = qr.modules.length;
        const inTopLeft = row < 7 && col < 7;
        const inTopRight = row < 7 && col >= sefini - 7;
        const inBottomLeft = row >= sefini - 7 && col < 7;
        return inTopLeft || inTopRight || inBottomLeft;
    }

    private drawVerticalPill( row: number, col: number, qr: QRCodeData, visited?: Set<string> ): void {
        if ( !this.canvas ) return;
        if ( !qr.modules[row][col] ) return;

        // Skip if already visited (part of a previous vertical run)
        const key = `${row},${col}`;
        if ( visited && visited.has( key ) ) return;

        // Mark current module as visited
        if ( visited ) visited.add( key );

        // Find vertical run - count consecutive modules below this one
        let runLength = 1;
        while ( row + runLength < qr.modules.length && qr.modules[row + runLength][col] ) {
            if ( visited ) visited.add( `${row + runLength},${col}` );
            runLength++;
        }

        const x = ( col + this.border ) * this.box_size;
        const y = ( row + this.border ) * this.box_size;

        // Vertical pill - narrower width, full height with rounded top/bottom
        const pillWidth = this.box_size * 0o6 / 0o10; // 6/8 = 3/4 of box size
        const pillX = x + ( this.box_size - pillWidth ) / 2;
        const radius = pillWidth / 2;
        const centerX = pillX + radius;

        // For elongated pill, top arc at start, bottom arc at end of run
        const topArcCenterY = y + radius;
        const bottomArcCenterY = y + ( runLength * this.box_size ) - radius;

        // Draw elongated vertical pill shape (clockwise path)
        this.canvas.fillStyle = `rgba( ${ this.paint_color.join( "," ) } )`;
        this.canvas.beginPath();
        // Start at top-left (9 o'clock of top arc)
        this.canvas.moveTo( centerX - radius, topArcCenterY );
        // Draw top semicircle (left to right via top) - clockwise from π to 2π
        this.canvas.arc( centerX, topArcCenterY, radius, Math.PI, 2 * Math.PI, false );
        // Draw straight line down right side to bottom arc
        this.canvas.lineTo( centerX + radius, bottomArcCenterY );
        // Draw bottom semicircle (right to left via bottom) - clockwise from 0 to π
        this.canvas.arc( centerX, bottomArcCenterY, radius, 0, Math.PI, false );
        // Draw straight line up left side to close
        this.canvas.lineTo( centerX - radius, topArcCenterY );
        this.canvas.closePath();
        this.canvas.fill();
    }

    private k2f_nakoxa(
        kuba: [number, number, number, number],
        tafani: [boolean, boolean, boolean, boolean],
        tem2ni: [number, number, number, number]
    ): void {
        if ( !this.canvas ) return;

        const [ x0, y0, x1, y1 ] = kuba;
        const sf = x1 - x0;
        const ld = y1 - y0;
        
        // For vertical pills, use width-based radius for top/bottom
        const kemafi_fkabe = sf / 2;
        const r = kemafi_fkabe * this.KANAQANIDOMA_2TBE;
        const fkabe_cibe = kemafi_fkabe * 0o2 / 0o10;

        const er2ha_vem2: [number, number][] = [];

        // TL ( 180 to 270 ) , Center ( x0 + r , y0 + r )
        if ( tafani[0] ) {
            const sost2: [number, number] = [ x0 + fkabe_cibe, y0 + fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 180, 270 ) );
        } else {
            const sost2: [number, number] = [ x0 + r, y0 + r ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, r, 180, 270 ) );
        }

        // TR ( 270 to 360 ) , Center ( x1 - r , y0 + r )
        if ( tafani[1] ) {
            const sost2: [number, number] = [ x1 - fkabe_cibe, y0 + fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 270, 360 ) );
        } else {
            const sost2: [number, number] = [ x1 - r, y0 + r ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, r, 270, 360 ) );
        }

        // BR ( 0 to 90 ) , Center ( x1 - r , y1 - r )
        if ( tafani[2] ) {
            const sost2: [number, number] = [ x1 - fkabe_cibe, y1 - fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 0, 90 ) );
        } else {
            const sost2: [number, number] = [ x1 - r, y1 - r ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, r, 0, 90 ) );
        }

        // BL ( 90 to 180 ) , Center ( x0 + r , y1 - r )
        if ( tafani[3] ) {
            const sost2: [number, number] = [ x0 + fkabe_cibe, y1 - fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 90, 180 ) );
        } else {
            const sost2: [number, number] = [ x0 + r, y1 - r ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, r, 90, 180 ) );
        }

        this.canvas.beginPath();
        if ( er2ha_vem2.length > 0 ) {
            this.canvas.moveTo( er2ha_vem2[0][0], er2ha_vem2[0][1] );
            for ( let i = 1; i < er2ha_vem2.length; i++ ) {
                this.canvas.lineTo( er2ha_vem2[i][0], er2ha_vem2[i][1] );
            }
        }
        this.canvas.closePath();
        this.canvas.fillStyle = `rgba( ${ tem2ni.join( "," ) } )`;
        this.canvas.fill();
    }

    private k2f_2banusost2su(
        tapuni: number,
        cepuni: number,
        a1a_ls: boolean,
        a1a_lr: boolean,
        a1a_ks: boolean
    ): void {
        // Outer Frame ( 7x7 modules )
        const tlkk_sc = this.pixel_box( tapuni, cepuni );
        const tlkk_pp = this.pixel_box( tapuni + 6, cepuni + 6 );
        const kuba_3akak: [number, number, number, number] = [
            tlkk_sc[0][0], tlkk_sc[0][1], tlkk_pp[1][0], tlkk_pp[1][1]
        ];

        // Inner Hole ( 5x5 modules , one module inset from frame )
        const sx_sc = this.pixel_box( tapuni + 1, cepuni + 1 );
        const sx_pp = this.pixel_box( tapuni + 5, cepuni + 5 );
        const kuba_saxe: [number, number, number, number] = [
            sx_sc[0][0], sx_sc[0][1], sx_pp[1][0], sx_pp[1][1]
        ];

        // Eyeball ( 3x3 modules , two modules inset from frame )
        const iibanu_sc = this.pixel_box( tapuni + 2, cepuni + 2 );
        const iibanu_pp = this.pixel_box( tapuni + 4, cepuni + 4 );
        const kuba_2banusost2su: [number, number, number, number] = [
            iibanu_sc[0][0], iibanu_sc[0][1], iibanu_pp[1][0], iibanu_pp[1][1]
        ];

        // Define Corner Sharpness
        const fkabe_2banu: [boolean, boolean, boolean, boolean] = [ false, false, false, false ];
        const fkabe_2banusost2: [boolean, boolean, boolean, boolean] = [ false, false, false, false ];

        if ( a1a_ls ) {
            fkabe_2banu[0] = fkabe_2banu[2] = true;
            fkabe_2banusost2[0] = true;
        } else if ( a1a_lr ) {
            fkabe_2banu[1] = fkabe_2banu[3] = true;
            fkabe_2banusost2[1] = true;
        } else if ( a1a_ks ) {
            fkabe_2banu[3] = fkabe_2banu[1] = true;
            fkabe_2banusost2[3] = true;
        }

        // Draw the shapes
        this.k2f_nakoxa( kuba_3akak, fkabe_2banu, this.paint_color );
        this.k2f_nakoxa( kuba_saxe, fkabe_2banu, [ 255, 255, 255, 255 ] );
        this.k2f_nakoxa( kuba_2banusost2su, fkabe_2banusost2, this.paint_color );
    }

    private pixel_box( row: number, col: number ): [[number, number], [number, number]] {
        const x = ( col + this.border ) * this.box_size;
        const y = ( row + this.border ) * this.box_size;
        return [ [ x, y ], [ x + this.box_size, y + this.box_size ] ];
    }

    toCanvas(): HTMLCanvasElement {
        return this._img;
    }
}

/**
 * Creates a leaf-shaped mask canvas
 * @param vem2 ( number ) - Size of the canvas
 * Returns HTMLCanvasElement
 *     Canvas with leaf shape drawn in white
 */
function kf2_k6liqani_2tbesu( vem2: number ): HTMLCanvasElement {
    const canvas = document.createElement( "canvas" );
    canvas.width = vem2;
    canvas.height = vem2;
    const ctx = canvas.getContext( "2d" );
    if ( !ctx ) return canvas;

    const x0 = 0, y0 = 0, x1 = vem2, y1 = vem2;
    const er2ha_vem2ni: [number, number][] = [];

    const fkabe_taf = ( vem2 / 2 ) * KANAQANIDOMA_2TBE;
    const fkabe_cibe = ( vem2 / 2 ) * 0o2 / 0o10;

    // ( Rounded ) 180-270
    const sost2_sc: [number, number] = [ x0 + fkabe_taf, y0 + fkabe_taf ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_sc, fkabe_taf, 180, 270 ) );

    // ( Sharp ) 270-360
    const sost2_sr: [number, number] = [ x1 - fkabe_cibe, y0 + fkabe_cibe ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_sr, fkabe_cibe, 270, 360 ) );

    // ( Rounded ) 0-90
    const sost2_pr: [number, number] = [ x1 - fkabe_taf, y1 - fkabe_taf ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_pr, fkabe_taf, 0, 90 ) );

    // ( Sharp ) 90-180
    const sost2_pc: [number, number] = [ x0 + fkabe_cibe, y1 - fkabe_cibe ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_pc, fkabe_cibe, 90, 180 ) );

    ctx.beginPath();
    if ( er2ha_vem2ni.length > 0 ) {
        ctx.moveTo( er2ha_vem2ni[0][0], er2ha_vem2ni[0][1] );
        for ( let i = 1; i < er2ha_vem2ni.length; i++ ) {
            ctx.lineTo( er2ha_vem2ni[i][0], er2ha_vem2ni[i][1] );
        }
    }
    ctx.closePath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    return canvas;
}

/**
 * Crops and masks an image into a leaf shape
 * @param araq_saxe ( string ) - Source image path
 * @param pal6_l6kanaz ( number, optional ) - Target size
 * Returns HTMLCanvasElement | null
 *     Masked canvas or null on error
 */
async function k6liq_tahaq(
    araq_saxe: string,
    pal6_l6kanaz?: number
): Promise<HTMLCanvasElement | null> {
    try {
        const tahaq = await new Promise<HTMLImageElement>( ( resolve, reject ) => {
            const img = new Image();
            img.onload = () => resolve( img );
            img.onerror = reject;
            img.src = araq_saxe;
        } );

        let sf = tahaq.width;
        let ld = tahaq.height;

        // Make it square by cropping to center
        const kmam2_pal6 = Math.min( sf, ld );
        const ctamani = Math.floor( ( sf - kmam2_pal6 ) / 2 );
        const soza = Math.floor( ( ld - kmam2_pal6 ) / 2 );

        // Create canvas for cropping
        const canvas = document.createElement( "canvas" );
        canvas.width = kmam2_pal6;
        canvas.height = kmam2_pal6;
        const ctx = canvas.getContext( "2d" );
        if ( !ctx ) return null;

        ctx.drawImage( tahaq, ctamani, soza, kmam2_pal6, kmam2_pal6, 0, 0, kmam2_pal6, kmam2_pal6 );

        let pal6: number;
        if ( pal6_l6kanaz ) {
            pal6 = pal6_l6kanaz;
        } else {
            pal6 = kmam2_pal6;
        }

        const k6liqani = kf2_k6liqani_2tbesu( pal6 );

        // Apply leaf mask
        const finalCanvas = document.createElement( "canvas" );
        finalCanvas.width = pal6;
        finalCanvas.height = pal6;
        const finalCtx = finalCanvas.getContext( "2d" );
        if ( !finalCtx ) return null;

        // Draw the cropped/scaled image
        finalCtx.drawImage( canvas, 0, 0, pal6, pal6 );

        // Apply mask using composite operation
        finalCtx.globalCompositeOperation = "destination-in";
        finalCtx.drawImage( k6liqani, 0, 0 );
        finalCtx.globalCompositeOperation = "source-over";

        return finalCanvas;
    } catch ( e ) {
        console.error( `( Error loading custom image ) ${ e }` );
        return null;
    }
}

/**
 * Handles the logic for embedding a logo
 * @param ruva ( QRCodeData ) - QR code data
 * @param araq_tahaq ( string ) - Logo image path
 * @param eskeklna_cab6howe_tahaq ( Record<string, unknown> ) - Options object to modify
 * Returns void
 */
async function nLak_tahaq_ruva(
    ruva: QRCodeData,
    araq_tahaq: string,
    eskeklna_cab6howe_tahaq: Record<string, unknown>
): Promise<void> {
    if ( !araq_tahaq ) return;

    try {
        await new Promise<HTMLImageElement>( ( resolve, reject ) => {
            const img = new Image();
            img.onload = () => resolve( img );
            img.onerror = reject;
            img.src = araq_tahaq;
        } );
    } catch ( e ) {
        console.log( `( Warning ) Could not open custom image '${araq_tahaq}' ⟅ ${ e }` );
        return;
    }

    // Calc Sizes
    const kek_swevem2 = ruva.modules.length;

    // Exclusion Zone ( The hole size ) - If logo is ~125%, hole should be ~25%
    const kanaqanidoma_eq2k = 0o2 / 0o10;
    let kek_eq2k = Math.floor( kek_swevem2 * kanaqanidoma_eq2k );

    // Force ODD parity to match QR code grid ( which is always odd ) ensuring area is centered
    if ( kek_eq2k % 2 === 0 ) {
        kek_eq2k += 1;
    }

    const c2ta_swer2ha_eq2k = kek_eq2k * PAL6_KUCAQ_XAHA;

    // Visible Logo Size ( Smaller than hole )
    const kanaqanidoma_tahaq = 0o1 / 0o10;
    let kek_tahaq = Math.floor( kek_swevem2 * kanaqanidoma_tahaq );

    // Also force odd logo size for symmetry
    if ( kek_tahaq % 2 === 0 ) {
        kek_tahaq += 1;
    }

    const c2ta_swer2ha_tahaq = kek_tahaq * PAL6_KUCAQ_XAHA;

    // Prepare Masked Logo - first create correctly masked logo at target size
    const result = await k6liq_tahaq( araq_tahaq, c2ta_swer2ha_tahaq );

    if ( result ) {
        // Create Padding Container ( Large )
        const maxema_l6req2k = document.createElement( "canvas" );
        maxema_l6req2k.width = c2ta_swer2ha_eq2k;
        maxema_l6req2k.height = c2ta_swer2ha_eq2k;
        const maxemaCtx = maxema_l6req2k.getContext( "2d" );
        if ( !maxemaCtx ) return;

        // Center the logo in the container
        const neq2q_tp = Math.floor( ( c2ta_swer2ha_eq2k - c2ta_swer2ha_tahaq ) / 2 );
        const neq2q_cp = Math.floor( ( c2ta_swer2ha_eq2k - c2ta_swer2ha_tahaq ) / 2 );
        maxemaCtx.drawImage( result, neq2q_tp, neq2q_cp );

        eskeklna_cab6howe_tahaq["embeded_araq_tahaq"] = maxema_l6req2k.toDataURL( "image/png" );

        // Create a module-level mask to erase data bits in the center
        const k6liqani_kek = document.createElement( "canvas" );
        k6liqani_kek.width = kek_swevem2;
        k6liqani_kek.height = kek_swevem2;
        const aak_kek = kf2_k6liqani_2tbesu( kek_eq2k );
        const neq2q_tp_kek = Math.floor( ( kek_swevem2 - kek_eq2k ) / 2 );
        const neq2q_cp_kek = Math.floor( ( kek_swevem2 - kek_eq2k ) / 2 );

        const kekCtx = k6liqani_kek.getContext( "2d" );
        if ( kekCtx ) {
            kekCtx.drawImage( aak_kek, neq2q_tp_kek, neq2q_cp_kek );

            // Apply to ruva.modules
            console.log( `ſɭᶗ‹ɔ ֭ſɭɹͷ̗ j͑ʃɜ j͑ʃƨɹ ( ${ kek_eq2k } x ${ kek_eq2k } ) ⟅` );
            const kekImageData = kekCtx.getImageData( 0, 0, kek_swevem2, kek_swevem2 );
            for ( let r = 0; r < kek_swevem2; r++ ) {
                for ( let c = 0; c < kek_swevem2; c++ ) {
                    const pixelIndex = ( r * kek_swevem2 + c ) * 4;
                    if ( kekImageData.data[pixelIndex] > 0 ) {
                        ruva.modules[r][c] = false;
                    }
                }
            }
        }

        // Create Pixel-Level Mask ( Legacy/Backup for k2f_araken2q )
        const pal6_er2ha = ( kek_swevem2 + ( ruva.border * 2 ) ) * PAL6_KUCAQ_XAHA;
        const k6liqani_er2ha = document.createElement( "canvas" );
        k6liqani_er2ha.width = pal6_er2ha;
        k6liqani_er2ha.height = pal6_er2ha;
        const er2haCtx = k6liqani_er2ha.getContext( "2d" );

        // Create the leaf mask for the hole
        const k6liqani_6k = kf2_k6liqani_2tbesu( c2ta_swer2ha_eq2k );

        // Paste it in center
        const neq2q_tp_er2ha = Math.floor( ( pal6_er2ha - c2ta_swer2ha_eq2k ) / 2 );
        const neq2q_cp_er2ha = Math.floor( ( pal6_er2ha - c2ta_swer2ha_eq2k ) / 2 );
        if ( er2haCtx ) {
            er2haCtx.drawImage( k6liqani_6k, neq2q_tp_er2ha, neq2q_cp_er2ha );
            eskeklna_cab6howe_tahaq["logo_mask"] = er2haCtx;
        }
    } else {
        console.log( "( Warning ) Could not process custom image , skipping embedding ⟅" );
    }
}

// ⟪ j͑ʃɔ ɽ͑ʃ'w j͑ʃ'ᴜ j͑ʃɹ ſɭᴜ ɽ͑ʃ'ᴜ }ʃw 🔳 ⟫

/**
 * Generates a styled QR code with optional logo embedding
 * @param data ( string = "Teh" ) - Data to encode in QR code
 * @param logoPath ( string, optional ) - Path to logo image
 * @param outputCanvas ( HTMLCanvasElement, optional ) - Target canvas element
 * Returns HTMLCanvasElement
 *     Canvas containing the generated QR code
 */
export async function generateQRCode(
    data: string = VOP2_RUVACATAHAQU,
    logoPath?: string,
    outputCanvas?: HTMLCanvasElement
): Promise<HTMLCanvasElement> {
    // Generate QR code data
    const qrData = QRCode.create( data, {
        errorCorrectionLevel: "H",
        version: 1
    } );

    const modules: boolean[][] = [];
    const size = qrData.modules.size;
    for ( let i = 0; i < size; i++ ) {
        modules[i] = [];
        for ( let j = 0; j < size; j++ ) {
            modules[i][j] = qrData.modules.get( i, j ) === 1;
        }
    }

    const ruvacatahaqu: QRCodeData = {
        modules,
        border: 2
    };

    const eskeklna_tahaq: StyledPilImageOptions = {
        box_size: PAL6_KUCAQ_XAHA,
        border: 2,
        paint_color: [ 0o200, 0o200, 0o200, 255 ] // #808080
    };

    // ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 💾 ⟫

    if ( logoPath ) {
        await nLak_tahaq_ruva( ruvacatahaqu, logoPath, eskeklna_tahaq );
    }

    const img_high_res = new IitbesuRuvaCatahaqu( ruvacatahaqu.modules, eskeklna_tahaq );

    // Track visited modules to merge vertical runs into elongated pills
    const visited = new Set<string>();

    // Draw all modules
    for ( let row = 0; row < ruvacatahaqu.modules.length; row++ ) {
        for ( let col = 0; col < ruvacatahaqu.modules[row].length; col++ ) {
            img_high_res.drawrect_context( row, col, ruvacatahaqu, visited );
        }
    }

    // Embed logo if specified
    await img_high_res.k2fal_sost2su_tahaq();

    // Resize back down to target size for smoothness ( Antialiasing )
    const target_size = Math.floor( img_high_res.toCanvas().width / VEM2_XAHA );

    let finalCanvas: HTMLCanvasElement;
    if ( outputCanvas ) {
        finalCanvas = outputCanvas;
        finalCanvas.width = target_size;
        finalCanvas.height = target_size;
    } else {
        finalCanvas = document.createElement( "canvas" );
        finalCanvas.width = target_size;
        finalCanvas.height = target_size;
    }

    const finalCtx = finalCanvas.getContext( "2d" );
    if ( finalCtx ) {
        finalCtx.imageSmoothingEnabled = true;
        finalCtx.imageSmoothingQuality = "high";
        finalCtx.drawImage( img_high_res.toCanvas(), 0, 0, target_size, target_size );
    }

    return finalCanvas;
}

// Auto-run if in browser environment with a target canvas
if ( typeof window !== "undefined" ) {
    window.addEventListener( "DOMContentLoaded", async () => {
        const canvas = document.getElementById( "qr-canvas" ) as HTMLCanvasElement;
        const input = document.getElementById( "qr-input" ) as HTMLTextAreaElement;
        const logoInput = document.getElementById( "logo-input" ) as HTMLInputElement;
        const errorEl = document.getElementById( "tlohk2ni" );

        if ( !canvas || !input ) {
            console.error( "QR canvas or input not found" );
            return;
        }

        let currentLogoPath: string | undefined = undefined;

        async function generateQR( data: string, logoPath?: string ) {
            try {
                await generateQRCode( data, logoPath, canvas );
                if ( errorEl ) {
                    errorEl.style.display = "none";
                }
            } catch ( e ) {
                console.error( "QR generation failed:", e );
                if ( errorEl ) {
                    errorEl.style.display = "block";
                }
            }
        }

        // Generate initial QR code
        await generateQR( VOP2_RUVACATAHAQU, undefined );

        // Generate QR code on text input change
        input.addEventListener( "input", async () => {
            const value = input.value.trim() || VOP2_RUVACATAHAQU;
            await generateQR( value, currentLogoPath );
        } );

        // Handle logo upload
        if ( logoInput ) {
            logoInput.addEventListener( "change", async ( event ) => {
                const target = event.target as HTMLInputElement;
                if ( target.files && target.files[0] ) {
                    const file = target.files[0];
                    const reader = new FileReader();
                    reader.onload = async ( e ) => {
                        if ( e.target?.result ) {
                            currentLogoPath = e.target.result as string;
                            const value = input.value.trim() || VOP2_RUVACATAHAQU;
                            await generateQR( value, currentLogoPath );
                        }
                    };
                    reader.readAsDataURL( file );
                } else {
                    currentLogoPath = undefined;
                    const value = input.value.trim() || VOP2_RUVACATAHAQU;
                    await generateQR( value, undefined );
                }
            } );
        }
    } );
}
