import QRCode, { QRCode as QRCodeType } from "qrcode";

// ⟪ j͑ʃɹ ſɭᴜ ɽ͑ʃ'ᴜ }ʃw ⚙️ ⟫

const KANAQANIDOMA_2TBE = 0o14 / 0o20; // 0.0 ( square ) to 1.0 ( full circle / leaf )
const VEM2_XAHA = 0o1; // Supersampling factor for anti-aliasing

const PAL6_KUCAQ_XAHA = 0o20 * 0o10; // Box size * supersampling

const VOP2_RUVACATAHAQU = "ɭʃɔ";

// ⟪ ŋᷠᴜ ſȷɔ ſɭ,ꞇ 🔧 ⟫

/**
 * Loads an image from URL and returns as promise
 * @param src - Image source URL
 * @returns Promise resolving to HTMLImageElement
 */
function q2qTahaq( src: string ): Promise<HTMLImageElement> {
    return new Promise( ( resolve, reject ) => {
        const tahaq = new Image();
        tahaq.onload = () => resolve( tahaq );
        tahaq.onerror = reject;
        tahaq.src = src;
    } );
}

/**
 * Centers a smaller dimension within a larger one
 * @param larger - The container size
 * @param smaller - The content size
 * @returns The offset to center the content
 */
function neq2qCepu( larger: number, smaller: number ): number {
    return Math.floor( ( larger - smaller ) / 2 );
}

/**
 * Creates a canvas with specified dimensions
 * @param width - Canvas width
 * @param height - Canvas height
 * @returns HTMLCanvasElement with dimensions set
 */
function k2falTahaq( width: number, height: number ): HTMLCanvasElement {
    const tahaq = document.createElement( "canvas" );
    tahaq.width = width;
    tahaq.height = height;
    return tahaq;
}

// ⟪ ſ͔ɭɔ }ʃɔɔ˞ ֭ſɭᴜ ı],ɔ �🖌️ ⟫

/**
 * Calculates amount curved for angle
 * @param sost2 ( [ number, number ] ) - Center point [ x, y ]
 * @param ka5ik ( number ) - Radius
 * @param sefini_saxe ( number ) - Start angle in degrees
 * @param sefini_tlakak ( number ) - End angle in degrees
 * @param tafani_swek2fe ( number = 0o40 ) - Number of points ( default 0o40 for smoother curves )
 * @returns [ number, number ][]
 *     Array of points along the arc
 */
function quq_vem2_fkabe(
    sost2: [number, number],
    ka5ik: number,
    sefini_saxe: number,
    sefini_tlakak: number,
    tafani_swek2fe: number = 0o40
): [number, number][] {
    const er2ha_vem2ni: [number, number][] = [];
    for ( let i = 0; i <= tafani_swek2fe; i++ ) {
        const tafkaq = ( sefini_saxe + ( sefini_tlakak - sefini_saxe ) * i / tafani_swek2fe ) * ( Math.PI / 180 );
        er2ha_vem2ni.push( [
            sost2[0] + ka5ik * Math.cos( tafkaq ),
            sost2[1] + ka5ik * Math.sin( tafkaq )
        ] );
    }
    return er2ha_vem2ni;
}

interface SakKu1o {
    kuba_swepal6?: number;
    catu5ek?: number;
    kx2k2f_sweweh2?: [number, number, number, number];
    araqal_c2h2su_tahaq?: string;
    [ kxesu_araq: string ]: unknown;
}

interface RuvaCatahaquVop2 {
    modules: boolean[][];
    catu5ek: number;
}

class IitbesuRuvaCatahaqu {
    private _tahaq: HTMLCanvasElement;
    private canvas: CanvasRenderingContext2D | null = null;
    private araqal_c2h2su_tahaq: string | undefined;
    public kuba_swepal6: number;
    public catu5ek: number;
    public kx2k2f_sweweh2: [number, number, number, number];
    public KANAQANIDOMA_2TBE: number = KANAQANIDOMA_2TBE;

    constructor(
        public modules: boolean[][],
        options: SakKu1o = {}
    ) {
        this.kuba_swepal6 = options.kuba_swepal6 || 0o10;
        this.catu5ek = options.catu5ek || 4;
        this.kx2k2f_sweweh2 = options.kx2k2f_sweweh2 || [ 0, 0, 0, 255 ];
        this.araqal_c2h2su_tahaq = options.araqal_c2h2su_tahaq;

        const hakek_swek2fe = modules.length;
        const size = ( hakek_swek2fe + this.catu5ek * 2 ) * this.kuba_swepal6;
        this._tahaq = document.createElement( "canvas" );
        this._tahaq.width = size;
        this._tahaq.height = size;
        this.canvas = this._tahaq.getContext( "2d" );
    }

    async k2fal_sost2su_tahaq(): Promise<void> {
        if ( !this.araqal_c2h2su_tahaq || !this.canvas ) return;

        const tahaq = await q2qTahaq( this.araqal_c2h2su_tahaq );
        const sf = this._tahaq.width;
        const ld = this._tahaq.height;
        const araq: [number, number] = [
            neq2qCepu( sf, tahaq.width ),
            neq2qCepu( ld, tahaq.height )
        ];

        this.canvas.drawImage( tahaq, araq[0], araq[1] );
    }

    drawrect_context( tapuni: number, cepuni: number, qr: RuvaCatahaquVop2, a1a_kozeq?: Set<string> ): void {
        if ( !this.canvas ) {
            this.canvas = this._tahaq.getContext( "2d" );
        }

        if ( this.k2fIibanu( tapuni, cepuni, qr ) ) {
            const sefini = qr.modules.length;
            const a1a_ls = tapuni === 0 && cepuni === 0;
            const a1a_lr = tapuni === 0 && cepuni === sefini - 7;
            const a1a_ks = tapuni === sefini - 7 && cepuni === 0;

            if ( a1a_ls || a1a_lr || a1a_ks ) {
                this.k2f_2banusost2su( tapuni, cepuni, a1a_ls, a1a_lr, a1a_ks );
            }
            return;
        }

        this.k2falCepuSak( tapuni, cepuni, qr, a1a_kozeq );
    }

    private k2fIibanu( tapuni: number, cepuni: number, qr: RuvaCatahaquVop2 ): boolean {
        const sefini = qr.modules.length;
        const sozaCtama = tapuni < 7 && cepuni < 7;
        const sozaPtama = tapuni < 7 && cepuni >= sefini - 7;
        const psazCtama = tapuni >= sefini - 7 && cepuni < 7;
        return sozaCtama || sozaPtama || psazCtama;
    }

    private k2falCepuSak( tapuni: number, cepuni: number, qr: RuvaCatahaquVop2, a1a_kozeq?: Set<string> ): void {
        if ( !this.canvas ) return;
        if ( !qr.modules[tapuni][cepuni] ) return;

        // Skip if already a1a_kozeq (part of a previous vertical run)
        const kxesu_araq = `${tapuni},${cepuni}`;
        if ( a1a_kozeq && a1a_kozeq.has( kxesu_araq ) ) return;

        // Mark current module as a1a_kozeq
        if ( a1a_kozeq ) a1a_kozeq.add( kxesu_araq );

        // Find vertical run - count consecutive modules below this one
        let hacepuni_swel6da = 1;
        while ( tapuni + hacepuni_swel6da < qr.modules.length && qr.modules[tapuni + hacepuni_swel6da][cepuni] ) {
            if ( a1a_kozeq ) a1a_kozeq.add( `${tapuni + hacepuni_swel6da},${cepuni}` );
            hacepuni_swel6da++;
        }

        const x = ( cepuni + this.catu5ek ) * this.kuba_swepal6;
        const y = ( tapuni + this.catu5ek ) * this.kuba_swepal6;

        // Vertical pill - narrower width, full height with rounded top/bottom
        const sakSwesefi = this.kuba_swepal6 * 0o6 / 0o10; // 6/8 = 3/4 of box size
        const sakSwetapu = x + ( this.kuba_swepal6 - sakSwesefi ) / 2;
        const ka5ik = sakSwesefi / 2;
        const sost2Swetapu = sakSwetapu + ka5ik;

        // For elongated pill, top arc at start, bottom arc at end of run
        const sozaFkabeSost2Cepuni = y + ka5ik;
        const psazFkabeSost2Cepuni = y + ( hacepuni_swel6da * this.kuba_swepal6 ) - ka5ik;

        // Draw elongated vertical pill shape (clockwise path)
        this.canvas.fillStyle = `rgba( ${ this.kx2k2f_sweweh2.join( "," ) } )`;
        this.canvas.beginPath();
        // Start at top-left (9 o'clock of top arc)
        this.canvas.moveTo( sost2Swetapu - ka5ik, sozaFkabeSost2Cepuni );
        // Draw top semicircle (left to right via top) - clockwise from π to 2π
        this.canvas.arc( sost2Swetapu, sozaFkabeSost2Cepuni, ka5ik, Math.PI, 2 * Math.PI, false );
        // Draw straight line down right side to bottom arc
        this.canvas.lineTo( sost2Swetapu + ka5ik, psazFkabeSost2Cepuni );
        // Draw bottom semicircle (right to left via bottom) - clockwise from 0 to π
        this.canvas.arc( sost2Swetapu, psazFkabeSost2Cepuni, ka5ik, 0, Math.PI, false );
        // Draw straight line up left side to close
        this.canvas.lineTo( sost2Swetapu - ka5ik, sozaFkabeSost2Cepuni );
        this.canvas.closePath();
        this.canvas.fill();
    }

    private k2f_nakoxa(
        kuba: [number, number, number, number],
        tafani: [boolean, boolean, boolean, boolean],
        tem2ni: [number, number, number, number]
    ): void {
        if ( !this.canvas ) return;

        const [ tp_heta, cp_heta, tp_xaqa, cp_xaqa ] = kuba;
        const sf = tp_xaqa - tp_heta;
        const ld = cp_xaqa - cp_heta;

        // For vertical pills, use width-based ka5ik for top/bottom
        const kemafi_fkabe = sf / 2;
        const ka5ik = kemafi_fkabe * this.KANAQANIDOMA_2TBE;
        const fkabe_cibe = kemafi_fkabe * 0o2 / 0o10;

        const er2ha_vem2: [number, number][] = [];

        // TL ( 180 to 270 ) , Center ( tp_heta + ka5ik , cp_heta + ka5ik )
        if ( tafani[0] ) {
            const sost2: [number, number] = [ tp_heta + fkabe_cibe, cp_heta + fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 180, 270 ) );
        } else {
            const sost2: [number, number] = [ tp_heta + ka5ik, cp_heta + ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 180, 270 ) );
        }

        // TR ( 270 to 360 ) , Center ( tp_xaqa - ka5ik , cp_heta + ka5ik )
        if ( tafani[1] ) {
            const sost2: [number, number] = [ tp_xaqa - fkabe_cibe, cp_heta + fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 270, 360 ) );
        } else {
            const sost2: [number, number] = [ tp_xaqa - ka5ik, cp_heta + ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 270, 360 ) );
        }

        // BR ( 0 to 90 ) , Center ( tp_xaqa - ka5ik , cp_xaqa - ka5ik )
        if ( tafani[2] ) {
            const sost2: [number, number] = [ tp_xaqa - fkabe_cibe, cp_xaqa - fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 0, 90 ) );
        } else {
            const sost2: [number, number] = [ tp_xaqa - ka5ik, cp_xaqa - ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 0, 90 ) );
        }

        // BL ( 90 to 180 ) , Center ( tp_heta + ka5ik , cp_xaqa - ka5ik )
        if ( tafani[3] ) {
            const sost2: [number, number] = [ tp_heta + fkabe_cibe, cp_xaqa - fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 90, 180 ) );
        } else {
            const sost2: [number, number] = [ tp_heta + ka5ik, cp_xaqa - ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 90, 180 ) );
        }

        this.canvas.beginPath();
        if ( er2ha_vem2.length > 0 ) {
            this.canvas.moveTo( er2ha_vem2[0][0], er2ha_vem2[0][1] );
            for ( let i = 1; i < er2ha_vem2.length; i++ ) {
                this.canvas.lineTo( er2ha_vem2[i][0], er2ha_vem2[i][1] );
            }
        }
        this.canvas.closePath();

        // If fully transparent, clear the shape area instead of filling
        if ( tem2ni[3] === 0 ) {
            this.canvas.save();
            this.canvas.clip();
            this.canvas.clearRect( tp_heta, cp_heta, sf, ld );
            this.canvas.restore();
            return;
        }

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
        const tlkk_sc = this.c2tasu_kuba( tapuni, cepuni );
        const tlkk_pp = this.c2tasu_kuba( tapuni + 6, cepuni + 6 );
        const kuba_3akak: [number, number, number, number] = [
            tlkk_sc[0][0], tlkk_sc[0][1], tlkk_pp[1][0], tlkk_pp[1][1]
        ];

        // Inner Hole ( 5x5 modules , one module inset from frame )
        const sx_sc = this.c2tasu_kuba( tapuni + 1, cepuni + 1 );
        const sx_pp = this.c2tasu_kuba( tapuni + 5, cepuni + 5 );
        const kuba_saxe: [number, number, number, number] = [
            sx_sc[0][0], sx_sc[0][1], sx_pp[1][0], sx_pp[1][1]
        ];

        // Eyeball ( 3x3 modules , two modules inset from frame )
        const iibanu_sc = this.c2tasu_kuba( tapuni + 2, cepuni + 2 );
        const iibanu_pp = this.c2tasu_kuba( tapuni + 4, cepuni + 4 );
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
        this.k2f_nakoxa( kuba_3akak, fkabe_2banu, this.kx2k2f_sweweh2 );
        this.k2f_nakoxa( kuba_saxe, fkabe_2banu, [ 0, 0, 0, 0 ] );
        this.k2f_nakoxa( kuba_2banusost2su, fkabe_2banusost2, this.kx2k2f_sweweh2 );
    }

    private c2tasu_kuba( tapuni: number, cepuni: number ): [[number, number], [number, number]] {
        const x = ( cepuni + this.catu5ek ) * this.kuba_swepal6;
        const y = ( tapuni + this.catu5ek ) * this.kuba_swepal6;
        return [ [ x, y ], [ x + this.kuba_swepal6, y + this.kuba_swepal6 ] ];
    }

    toCanvas(): HTMLCanvasElement {
        return this._tahaq;
    }
}

/**
 * Creates a leaf-shaped mask canvas
 * @param vem2 ( number ) - Size of the canvas
 * @returns HTMLCanvasElement
 *     Canvas with leaf shape drawn in white
 */
function kf2_k6liqani_2tbesu( vem2: number ): HTMLCanvasElement {
    const canvas = document.createElement( "canvas" );
    canvas.width = vem2;
    canvas.height = vem2;
    const kumukalasu = canvas.getContext( "2d" );
    if ( !kumukalasu ) return canvas;

    const tp_heta = 0, cp_heta = 0, tp_xaqa = vem2, cp_xaqa = vem2;
    const er2ha_vem2ni: [number, number][] = [];

    const fkabe_taf = ( vem2 / 2 ) * KANAQANIDOMA_2TBE;
    const fkabe_cibe = ( vem2 / 2 ) * 0o2 / 0o10;

    // ( Rounded ) 180-270
    const sost2_sc: [number, number] = [ tp_heta + fkabe_taf, cp_heta + fkabe_taf ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_sc, fkabe_taf, 180, 270 ) );

    // ( Sharp ) 270-360
    const sost2_sr: [number, number] = [ tp_xaqa - fkabe_cibe, cp_heta + fkabe_cibe ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_sr, fkabe_cibe, 270, 360 ) );

    // ( Rounded ) 0-90
    const sost2_pr: [number, number] = [ tp_xaqa - fkabe_taf, cp_xaqa - fkabe_taf ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_pr, fkabe_taf, 0, 90 ) );

    // ( Sharp ) 90-180
    const sost2_pc: [number, number] = [ tp_heta + fkabe_cibe, cp_xaqa - fkabe_cibe ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_pc, fkabe_cibe, 90, 180 ) );

    kumukalasu.beginPath();
    if ( er2ha_vem2ni.length > 0 ) {
        kumukalasu.moveTo( er2ha_vem2ni[0][0], er2ha_vem2ni[0][1] );
        for ( let i = 1; i < er2ha_vem2ni.length; i++ ) {
            kumukalasu.lineTo( er2ha_vem2ni[i][0], er2ha_vem2ni[i][1] );
        }
    }
    kumukalasu.closePath();
    kumukalasu.fillStyle = "#FFFFFF";
    kumukalasu.fill();

    return canvas;
}

/**
 * Crops and masks an image into a leaf shape
 * @param araq_saxe ( string ) - Source image path
 * @param pal6_l6kanaz ( number, optional ) - Target size
 * @returns HTMLCanvasElement | null
 *     Masked canvas or null on error
 */
async function k6liq_tahaq(
    araq_saxe: string,
    pal6_l6kanaz?: number
): Promise<HTMLCanvasElement | null> {
    try {
        const tahaq = await q2qTahaq( araq_saxe );

        let sf = tahaq.width;
        let ld = tahaq.height;

        // Make it square by cropping to center
        const kmam2_pal6 = Math.min( sf, ld );
        const ctamani = neq2qCepu( sf, kmam2_pal6 );
        const sozanu = neq2qCepu( ld, kmam2_pal6 );

        // Create canvas for cropping
        const canvas = k2falTahaq( kmam2_pal6, kmam2_pal6 );
        const kumukalasu = canvas.getContext( "2d" );
        if ( !kumukalasu ) return null;

        kumukalasu.drawImage( tahaq, ctamani, sozanu, kmam2_pal6, kmam2_pal6, 0, 0, kmam2_pal6, kmam2_pal6 );

        const pal6 = pal6_l6kanaz ?? kmam2_pal6;
        const k6liqani = kf2_k6liqani_2tbesu( pal6 );

        // Apply leaf mask
        const tlakakuCakak2f = k2falTahaq( pal6, pal6 );
        const tlakakuQumuKalasu = tlakakuCakak2f.getContext( "2d" );
        if ( !tlakakuQumuKalasu ) return null;

        // Draw the cropped/scaled image
        tlakakuQumuKalasu.drawImage( canvas, 0, 0, pal6, pal6 );

        // Apply mask using composite operation
        tlakakuQumuKalasu.globalCompositeOperation = "destination-in";
        tlakakuQumuKalasu.drawImage( k6liqani, 0, 0 );
        tlakakuQumuKalasu.globalCompositeOperation = "source-over";

        return tlakakuCakak2f;
    } catch ( e ) {
        console.error( `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ - loading custom image ) ${ e }` );
        return null;
    }
}

/**
 * Handles the logic for embedding a logo
 * @param ruva ( RuvaCatahaquVop2 ) - QR code data
 * @param araq_tahaq ( string ) - Logo image path
 * @param eskeklna_cab6howe_tahaq ( Record<string, unknown> ) - Options object to modify
 * @returns void
 */
async function nLak_tahaq_ruva(
    ruva: RuvaCatahaquVop2,
    araq_tahaq: string,
    eskeklna_cab6howe_tahaq: Record<string, unknown>
): Promise<void> {
    if ( !araq_tahaq ) return;

    try {
        await q2qTahaq( araq_tahaq );
    } catch ( e ) {
        console.log( `( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) Could not open custom image '${araq_tahaq}' ⟅ ${ e }` );
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
    const ts0ni = await k6liq_tahaq( araq_tahaq, c2ta_swer2ha_tahaq );

    if ( ts0ni ) {
        // Create Padding Container ( Large )
        const maxema_l6req2k = k2falTahaq( c2ta_swer2ha_eq2k, c2ta_swer2ha_eq2k );
        const maxemaCtx = maxema_l6req2k.getContext( "2d" );
        if ( !maxemaCtx ) return;

        // Center the logo in the container
        const neq2q_tp = neq2qCepu( c2ta_swer2ha_eq2k, c2ta_swer2ha_tahaq );
        const neq2q_cp = neq2qCepu( c2ta_swer2ha_eq2k, c2ta_swer2ha_tahaq );
        maxemaCtx.drawImage( ts0ni, neq2q_tp, neq2q_cp );

        eskeklna_cab6howe_tahaq["araqal_c2h2su_tahaq"] = maxema_l6req2k.toDataURL( "image/png" );

        // Create a module-level mask to erase data bits in the center
        const k6liqani_kek = k2falTahaq( kek_swevem2, kek_swevem2 );
        const aak_kek = kf2_k6liqani_2tbesu( kek_eq2k );
        const neq2q_tp_kek = neq2qCepu( kek_swevem2, kek_eq2k );
        const neq2q_cp_kek = neq2qCepu( kek_swevem2, kek_eq2k );

        const kekCtx = k6liqani_kek.getContext( "2d" );
        if ( kekCtx ) {
            kekCtx.drawImage( aak_kek, neq2q_tp_kek, neq2q_cp_kek );

            // Apply to ruva.modules
            console.log( `ſɭᶗ‹ɔ ֭ſɭɹͷ̗ j͑ʃɜ j͑ʃƨɹ ( ${ kek_eq2k } x ${ kek_eq2k } ) ⟅` );
            const kekImageData = kekCtx.getImageData( 0, 0, kek_swevem2, kek_swevem2 );
            for ( let ka5ik = 0; ka5ik < kek_swevem2; ka5ik++ ) {
                for ( let c = 0; c < kek_swevem2; c++ ) {
                    const pixelIndex = ( ka5ik * kek_swevem2 + c ) * 4;
                    if ( kekImageData.data[pixelIndex] > 0 ) {
                        ruva.modules[ka5ik][c] = false;
                    }
                }
            }
        }

        // Create Pixel-Level Mask ( Legacy/Backup for k2f_araken2q )
        const pal6_er2ha = ( kek_swevem2 + ( ruva.catu5ek * 2 ) ) * PAL6_KUCAQ_XAHA;
        const k6liqani_er2ha = k2falTahaq( pal6_er2ha, pal6_er2ha );
        const er2haCtx = k6liqani_er2ha.getContext( "2d" );

        // Create the leaf mask for the hole
        const k6liqani_6k = kf2_k6liqani_2tbesu( c2ta_swer2ha_eq2k );

        // Paste it in center
        const neq2q_tp_er2ha = neq2qCepu( pal6_er2ha, c2ta_swer2ha_eq2k );
        const neq2q_cp_er2ha = neq2qCepu( pal6_er2ha, c2ta_swer2ha_eq2k );
        if ( er2haCtx ) {
            er2haCtx.drawImage( k6liqani_6k, neq2q_tp_er2ha, neq2q_cp_er2ha );
            eskeklna_cab6howe_tahaq["logo_mask"] = er2haCtx;
        }
    } else {
        console.log( "( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) Could not process custom image , skipping embedding ⟅" );
    }
}

// ⟪ j͑ʃɔ ɽ͑ʃ'w j͑ʃ'ᴜ j͑ʃɹ ſɭᴜ ɽ͑ʃ'ᴜ }ʃw 🔳 ⟫

/**
 * Generates a styled QR code with optional logo embedding
 * @param data ( string = "Teh" ) - Data to encode in QR code
 * @param logoPath ( string, optional ) - Path to logo image
 * @param outputCanvas ( HTMLCanvasElement, optional ) - Target canvas element
 * @returns HTMLCanvasElement
 *     Canvas containing the generated QR code
 */
export async function generateQRCode(
    data: string = VOP2_RUVACATAHAQU,
    logoPath?: string,
    outputCanvas?: HTMLCanvasElement
): Promise<HTMLCanvasElement> {
    // Generate QR code data with Byte mode for proper Unicode/UTF-8 support
    const qrData = QRCode.create( data, {
        errorCorrectionLevel: "H"
    } as QRCode.QRCodeOptions );

    const modules: boolean[][] = [];
    const size = qrData.modules.size;
    for ( let i = 0; i < size; i++ ) {
        modules[i] = [];
        for ( let j = 0; j < size; j++ ) {
            modules[i][j] = qrData.modules.get( i, j ) === 1;
        }
    }

    const ruvacatahaqu: RuvaCatahaquVop2 = {
        modules,
        catu5ek: 2
    };

    const eskeklna_tahaq: SakKu1o = {
        kuba_swepal6: PAL6_KUCAQ_XAHA,
        catu5ek: 2,
        kx2k2f_sweweh2: [ 255, 255, 255, 255 ]
    };

    // ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 💾 ⟫

    if ( logoPath ) {
        await nLak_tahaq_ruva( ruvacatahaqu, logoPath, eskeklna_tahaq );
    }

    const img_high_res = new IitbesuRuvaCatahaqu( ruvacatahaqu.modules, eskeklna_tahaq );

    // Track a1a_kozeq modules to merge vertical runs into elongated pills
    const a1a_kozeq = new Set<string>();

    // Draw all modules
    for ( let tapuni = 0; tapuni < ruvacatahaqu.modules.length; tapuni++ ) {
        for ( let cepuni = 0; cepuni < ruvacatahaqu.modules[tapuni].length; cepuni++ ) {
            img_high_res.drawrect_context( tapuni, cepuni, ruvacatahaqu, a1a_kozeq );
        }
    }

    // Embed logo if specified
    await img_high_res.k2fal_sost2su_tahaq();

    // Resize back down to target size for smoothness ( Antialiasing )
    const target_size = Math.floor( img_high_res.toCanvas().width / VEM2_XAHA );

    let tlakakuCakak2f: HTMLCanvasElement;
    if ( outputCanvas ) {
        tlakakuCakak2f = outputCanvas;
        tlakakuCakak2f.width = target_size;
        tlakakuCakak2f.height = target_size;
    } else {
        tlakakuCakak2f = k2falTahaq( target_size, target_size );
    }

    const tlakakuQumuKalasu = tlakakuCakak2f.getContext( "2d" );
    if ( tlakakuQumuKalasu ) {
        tlakakuQumuKalasu.imageSmoothingEnabled = true;
        tlakakuQumuKalasu.imageSmoothingQuality = "high";
        tlakakuQumuKalasu.drawImage( img_high_res.toCanvas(), 0, 0, target_size, target_size );
    }

    return tlakakuCakak2f;
}

// Auto-run if in browser environment with a target canvas
if ( typeof window !== "undefined" ) {
    window.addEventListener( "DOMContentLoaded", async () => {
        const canvas = document.getElementById( "cakak2f-sarvcthq" ) as HTMLCanvasElement;
        const arabana = document.getElementById( "arabana-sarvcthq" ) as HTMLTextAreaElement;
        const araq2qTahaq = document.getElementById( "araq2q-tahaq" ) as HTMLInputElement;
        const errorEl = document.getElementById( "tlohk2ni" );
        const downloadBtn = document.getElementById( "qumk2" ) as HTMLButtonElement;

        if ( !canvas || !arabana ) {
            console.error( "ſ͕ȷɜƣ̋ ꞁȷ̀ɹ ʃᴜ ʌ ſɟᴜƽ ꞁȷ̀ᴜ ſɭɹʞ ⟅" );
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
                console.error( "( ſ͕ȷɜ ſɭʞɹ )", e );
                if ( errorEl ) {
                    errorEl.style.display = "block";
                }
            }
        }

        // Generate initial QR code
        await generateQR( VOP2_RUVACATAHAQU, undefined );

        // Generate QR code on text arabana change
        arabana.addEventListener( "input", async () => {
            const value = arabana.value.trim() || VOP2_RUVACATAHAQU;
            await generateQR( value, currentLogoPath );
        } );

        // Handle logo upload
        if ( araq2qTahaq ) {
            araq2qTahaq.addEventListener( "change", async ( event ) => {
                const target = event.target as HTMLInputElement;
                if ( target.files && target.files[0] ) {
                    const file = target.files[0];
                    const reader = new FileReader();
                    reader.onload = async ( e ) => {
                        if ( e.target?.result ) {
                            currentLogoPath = e.target.result as string;
                            const value = arabana.value.trim() || VOP2_RUVACATAHAQU;
                            await generateQR( value, currentLogoPath );
                        }
                    };
                    reader.readAsDataURL( file );
                } else {
                    currentLogoPath = undefined;
                    const value = arabana.value.trim() || VOP2_RUVACATAHAQU;
                    await generateQR( value, undefined );
                }
            } );
        }

        // Handle download button
        if ( downloadBtn ) {
            downloadBtn.addEventListener( "click", () => {
                try {
                    const dataUrl = canvas.toDataURL( "image/png" );
                    const link = document.createElement( "a" );
                    link.download = "ruvavatahaqu.png";
                    link.href = dataUrl;
                    link.click();
                } catch ( e ) {
                    console.error( "( ſ͕ȷɜ ſ͕ɭwc̭ ſɭɹ )", e );
                }
            } );
        }
    } );
}
