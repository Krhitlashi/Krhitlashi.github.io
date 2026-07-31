import QRCode, { QRCode as QRCodeType } from "qrcode";

// ⟪ j͑ʃɹ ſɭᴜ ɽ͑ʃ'ᴜ }ʃw ⚙️ ⟫

const KANAQANIDOMA_2TBE = 0o14 / 0o20; // 0.0 ( kvadrato ) ĝis 1.0 ( plena cirklo / folio )
const VEM2_XAHA = 0o1; // Super-specimena faktoro por kontraŭ-glatiĝo

const PAL6_KUCAQ_XAHA = 0o20 * 0o10; // Kestogrando * super-specimenado

const VOP2_RUVACATAHAQU = "ɭʃɔ";

// ⟪ ŋᷠᴜ ſȷɔ ſɭ,ꞇ 🔧 ⟫

/**
 * Ŝarĝas bildon el URL kaj revenigas kiel promeson
 * @param src - Bilda fonta URL
 * @returns Promeso solvanta al HTMLImageElement
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
 * Centrigas pli malgrandan dimension ene de pli granda
 * @param pliGranda - La uja grandeco
 * @param pliMalgranda - La enhava grandeco
 * @returns La deŝovo por centrigi la enhavon
 */
function neq2qCepu( pliGranda: number, pliMalgranda: number ): number {
    return Math.floor( ( pliGranda - pliMalgranda ) / 2 );
}

/**
 * Kreas kanvason kun specifitaj dimensioj
 * @param larĝo - Kanvasa larĝo
 * @param alto - Kanvasa alto
 * @returns HTMLCanvasElement kun dimensioj agorditaj
 */
function k2falTahaq( larĝo: number, alto: number ): HTMLCanvasElement {
    const tahaq = document.createElement( "canvas" );
    tahaq.width = larĝo;
    tahaq.height = alto;
    return tahaq;
}

// ⟪ ſ͔ɭɔ }ʃɔɔ˞ ֭ſɭᴜ ı],ɔ �🖌️ ⟫

/**
 * Kalkulas kurbecon por angulo
 * @param sost2 ( [ number, number ] ) - Centra punkto [ x, y ]
 * @param ka5ik ( number ) - Radiuso
 * @param sefini_saxe ( number ) - Komenca angulo en gradoj
 * @param sefini_tlakak ( number ) - Fina angulo en gradoj
 * @param tafani_swek2fe ( number = 0o40 ) - Nombro da punktoj ( defaŭlte 0o40 por pli glataj kurboj )
 * @returns [ number, number ][]
 *     Tabelo de punktoj laŭ la arko
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
    moduloj: boolean[][];
    catu5ek: number;
}

class IitbesuRuvaCatahaqu {
    private _tahaq: HTMLCanvasElement;
    private kunteksto: CanvasRenderingContext2D | null = null;
    private araqal_c2h2su_tahaq: string | undefined;
    public kuba_swepal6: number;
    public catu5ek: number;
    public kx2k2f_sweweh2: [number, number, number, number];
    public KANAQANIDOMA_2TBE: number = KANAQANIDOMA_2TBE;

    constructor(
        public moduloj: boolean[][],
        opcioj: SakKu1o = {}
    ) {
        this.kuba_swepal6 = opcioj.kuba_swepal6 || 0o10;
        this.catu5ek = opcioj.catu5ek || 4;
        this.kx2k2f_sweweh2 = opcioj.kx2k2f_sweweh2 || [ 0, 0, 0, 255 ];
        this.araqal_c2h2su_tahaq = opcioj.araqal_c2h2su_tahaq;

        const hakek_swek2fe = moduloj.length;
        const grandeco = ( hakek_swek2fe + this.catu5ek * 2 ) * this.kuba_swepal6;
        this._tahaq = document.createElement( "canvas" );
        this._tahaq.width = grandeco;
        this._tahaq.height = grandeco;
        this.kunteksto = this._tahaq.getContext( "2d" );
    }

    async k2fal_sost2su_tahaq(): Promise<void> {
        if ( !this.araqal_c2h2su_tahaq || !this.kunteksto ) return;

        const tahaq = await q2qTahaq( this.araqal_c2h2su_tahaq );
        const sf = this._tahaq.width;
        const ld = this._tahaq.height;
        const araq: [number, number] = [
            neq2qCepu( sf, tahaq.width ),
            neq2qCepu( ld, tahaq.height )
        ];

        this.kunteksto.drawImage( tahaq, araq[0], araq[1] );
    }

    desegni_rectangulan_kuntekston( tapuni: number, cepuni: number, ruva: RuvaCatahaquVop2, a1a_kozeq?: Set<string> ): void {
        if ( !this.kunteksto ) {
            this.kunteksto = this._tahaq.getContext( "2d" );
        }

        if ( this.k2fIibanu( tapuni, cepuni, ruva ) ) {
            const sefini = ruva.moduloj.length;
            const a1a_ls = tapuni === 0 && cepuni === 0;
            const a1a_lr = tapuni === 0 && cepuni === sefini - 7;
            const a1a_ks = tapuni === sefini - 7 && cepuni === 0;

            if ( a1a_ls || a1a_lr || a1a_ks ) {
                this.k2f_2banusost2su( tapuni, cepuni, a1a_ls, a1a_lr, a1a_ks );
            }
            return;
        }

        this.k2falCepuSak( tapuni, cepuni, ruva, a1a_kozeq );
    }

    private k2fIibanu( tapuni: number, cepuni: number, ruva: RuvaCatahaquVop2 ): boolean {
        const sefini = ruva.moduloj.length;
        const sozaCtama = tapuni < 7 && cepuni < 7;
        const sozaPtama = tapuni < 7 && cepuni >= sefini - 7;
        const psazCtama = tapuni >= sefini - 7 && cepuni < 7;
        return sozaCtama || sozaPtama || psazCtama;
    }

    private k2falCepuSak( tapuni: number, cepuni: number, ruva: RuvaCatahaquVop2, a1a_kozeq?: Set<string> ): void {
        if ( !this.kunteksto ) return;
        if ( !ruva.moduloj[tapuni][cepuni] ) return;

        // Preterlasu se jam a1a_kozeq ( parto de antaŭa vertikala sinsekvo )
        const kxesu_araq = `${tapuni},${cepuni}`;
        if ( a1a_kozeq && a1a_kozeq.has( kxesu_araq ) ) return;

        // Marku la nunan modulon kiel a1a_kozeq
        if ( a1a_kozeq ) a1a_kozeq.add( kxesu_araq );

        // Trovu vertikalan sinsekvon - kalkulu sinsekvajn modulojn sube de ĉi tiu
        let hacepuni_swel6da = 1;
        while ( tapuni + hacepuni_swel6da < ruva.moduloj.length && ruva.moduloj[tapuni + hacepuni_swel6da][cepuni] ) {
            if ( a1a_kozeq ) a1a_kozeq.add( `${tapuni + hacepuni_swel6da},${cepuni}` );
            hacepuni_swel6da++;
        }

        const x = ( cepuni + this.catu5ek ) * this.kuba_swepal6;
        const y = ( tapuni + this.catu5ek ) * this.kuba_swepal6;

        // Vertikala pilolo - pli mallarĝa larĝo, plena alto kun rondigitaj supro/malsupro
        const sakSwesefi = this.kuba_swepal6 * 0o6 / 0o10; // 6/8 = 3/4 de kestogrando
        const sakSwetapu = x + ( this.kuba_swepal6 - sakSwesefi ) / 2;
        const ka5ik = sakSwesefi / 2;
        const sost2Swetapu = sakSwetapu + ka5ik;

        // Por longigita pilolo, supra arko ĉe komenco, malsupra arko ĉe fino de la sinsekvo
        const sozaFkabeSost2Cepuni = y + ka5ik;
        const psazFkabeSost2Cepuni = y + ( hacepuni_swel6da * this.kuba_swepal6 ) - ka5ik;

        // Desegnu longigitan vertikalan pilolformon ( horloĝdirekta vojo )
        this.kunteksto.fillStyle = `rgba( ${ this.kx2k2f_sweweh2.join( "," ) } )`;
        this.kunteksto.beginPath();
        // Komencu ĉe supro-maldekstre ( 9-a horloĝo de la supra arko )
        this.kunteksto.moveTo( sost2Swetapu - ka5ik, sozaFkabeSost2Cepuni );
        // Desegnu supran duoncirklo ( maldekstre al dekstre tra supro ) - horloĝdirekte de π al 2π
        this.kunteksto.arc( sost2Swetapu, sozaFkabeSost2Cepuni, ka5ik, Math.PI, 2 * Math.PI, false );
        // Desegnu rektan linion malsupren laŭ la dekstra flanko al la malsupra arko
        this.kunteksto.lineTo( sost2Swetapu + ka5ik, psazFkabeSost2Cepuni );
        // Desegnu malsupran duoncirklo ( dekstre al maldekstre tra malsupro ) - horloĝdirekte de 0 al π
        this.kunteksto.arc( sost2Swetapu, psazFkabeSost2Cepuni, ka5ik, 0, Math.PI, false );
        // Desegnu rektan linion supren laŭ la maldekstra flanko por fermi
        this.kunteksto.lineTo( sost2Swetapu - ka5ik, sozaFkabeSost2Cepuni );
        this.kunteksto.closePath();
        this.kunteksto.fill();
    }

    private k2f_nakoxa(
        kuba: [number, number, number, number],
        tafani: [boolean, boolean, boolean, boolean],
        tem2ni: [number, number, number, number]
    ): void {
        if ( !this.kunteksto ) return;

        const [ tp_heta, cp_heta, tp_xaqa, cp_xaqa ] = kuba;
        const sf = tp_xaqa - tp_heta;
        const ld = cp_xaqa - cp_heta;

        // Por vertikalaj piloloj, uzu larĝo-bazitan ka5ik por supro/malsupro
        const kemafi_fkabe = sf / 2;
        const ka5ik = kemafi_fkabe * this.KANAQANIDOMA_2TBE;
        const fkabe_cibe = kemafi_fkabe * 0o2 / 0o10;

        const er2ha_vem2: [number, number][] = [];

        // TL ( 180 ĝis 270 ) , Centro ( tp_heta + ka5ik , cp_heta + ka5ik )
        if ( tafani[0] ) {
            const sost2: [number, number] = [ tp_heta + fkabe_cibe, cp_heta + fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 180, 270 ) );
        } else {
            const sost2: [number, number] = [ tp_heta + ka5ik, cp_heta + ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 180, 270 ) );
        }

        // TR ( 270 ĝis 360 ) , Centro ( tp_xaqa - ka5ik , cp_heta + ka5ik )
        if ( tafani[1] ) {
            const sost2: [number, number] = [ tp_xaqa - fkabe_cibe, cp_heta + fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 270, 360 ) );
        } else {
            const sost2: [number, number] = [ tp_xaqa - ka5ik, cp_heta + ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 270, 360 ) );
        }

        // BR ( 0 ĝis 90 ) , Centro ( tp_xaqa - ka5ik , cp_xaqa - ka5ik )
        if ( tafani[2] ) {
            const sost2: [number, number] = [ tp_xaqa - fkabe_cibe, cp_xaqa - fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 0, 90 ) );
        } else {
            const sost2: [number, number] = [ tp_xaqa - ka5ik, cp_xaqa - ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 0, 90 ) );
        }

        // BL ( 90 ĝis 180 ) , Centro ( tp_heta + ka5ik , cp_xaqa - ka5ik )
        if ( tafani[3] ) {
            const sost2: [number, number] = [ tp_heta + fkabe_cibe, cp_xaqa - fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 90, 180 ) );
        } else {
            const sost2: [number, number] = [ tp_heta + ka5ik, cp_xaqa - ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 90, 180 ) );
        }

        this.kunteksto.beginPath();
        if ( er2ha_vem2.length > 0 ) {
            this.kunteksto.moveTo( er2ha_vem2[0][0], er2ha_vem2[0][1] );
            for ( let i = 1; i < er2ha_vem2.length; i++ ) {
                this.kunteksto.lineTo( er2ha_vem2[i][0], er2ha_vem2[i][1] );
            }
        }
        this.kunteksto.closePath();

        // Se tute travidebla, malplenigu la forman areon anstataŭ plenigi
        if ( tem2ni[3] === 0 ) {
            this.kunteksto.save();
            this.kunteksto.clip();
            this.kunteksto.clearRect( tp_heta, cp_heta, sf, ld );
            this.kunteksto.restore();
            return;
        }

        this.kunteksto.fillStyle = `rgba( ${ tem2ni.join( "," ) } )`;
        this.kunteksto.fill();
    }

    private k2f_2banusost2su(
        tapuni: number,
        cepuni: number,
        a1a_ls: boolean,
        a1a_lr: boolean,
        a1a_ks: boolean
    ): void {
        // Ekstera Kadro ( 7x7 moduloj )
        const tlkk_sc = this.c2tasu_kuba( tapuni, cepuni );
        const tlkk_pp = this.c2tasu_kuba( tapuni + 6, cepuni + 6 );
        const kuba_3akak: [number, number, number, number] = [
            tlkk_sc[0][0], tlkk_sc[0][1], tlkk_pp[1][0], tlkk_pp[1][1]
        ];

        // Interna Truo ( 5x5 moduloj , unu modulo enigita de la kadro )
        const sx_sc = this.c2tasu_kuba( tapuni + 1, cepuni + 1 );
        const sx_pp = this.c2tasu_kuba( tapuni + 5, cepuni + 5 );
        const kuba_saxe: [number, number, number, number] = [
            sx_sc[0][0], sx_sc[0][1], sx_pp[1][0], sx_pp[1][1]
        ];

        // Okulglobeto ( 3x3 moduloj , du moduloj enigitaj de la kadro )
        const iibanu_sc = this.c2tasu_kuba( tapuni + 2, cepuni + 2 );
        const iibanu_pp = this.c2tasu_kuba( tapuni + 4, cepuni + 4 );
        const kuba_2banusost2su: [number, number, number, number] = [
            iibanu_sc[0][0], iibanu_sc[0][1], iibanu_pp[1][0], iibanu_pp[1][1]
        ];

        // Difinu Angulan Akrecon
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

        // Desegnu la formojn
        this.k2f_nakoxa( kuba_3akak, fkabe_2banu, this.kx2k2f_sweweh2 );
        this.k2f_nakoxa( kuba_saxe, fkabe_2banu, [ 0, 0, 0, 0 ] );
        this.k2f_nakoxa( kuba_2banusost2su, fkabe_2banusost2, this.kx2k2f_sweweh2 );
    }

    private c2tasu_kuba( tapuni: number, cepuni: number ): [[number, number], [number, number]] {
        const x = ( cepuni + this.catu5ek ) * this.kuba_swepal6;
        const y = ( tapuni + this.catu5ek ) * this.kuba_swepal6;
        return [ [ x, y ], [ x + this.kuba_swepal6, y + this.kuba_swepal6 ] ];
    }

    alKanvaso(): HTMLCanvasElement {
        return this._tahaq;
    }
}

/**
 * Kreas folioforman maskan kanvason
 * @param vem2 ( number ) - Grandeco de la kanvaso
 * @returns HTMLCanvasElement
 *     Kanvaso kun folioformo desegnita blanke
 */
function kf2_k6liqani_2tbesu( vem2: number ): HTMLCanvasElement {
    const kanvaso = document.createElement( "canvas" );
    kanvaso.width = vem2;
    kanvaso.height = vem2;
    const kumukalasu = kanvaso.getContext( "2d" );
    if ( !kumukalasu ) return kanvaso;

    const tp_heta = 0, cp_heta = 0, tp_xaqa = vem2, cp_xaqa = vem2;
    const er2ha_vem2ni: [number, number][] = [];

    const fkabe_taf = ( vem2 / 2 ) * KANAQANIDOMA_2TBE;
    const fkabe_cibe = ( vem2 / 2 ) * 0o2 / 0o10;

    // ( Rondigita ) 180-270
    const sost2_sc: [number, number] = [ tp_heta + fkabe_taf, cp_heta + fkabe_taf ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_sc, fkabe_taf, 180, 270 ) );

    // ( Akra ) 270-360
    const sost2_sr: [number, number] = [ tp_xaqa - fkabe_cibe, cp_heta + fkabe_cibe ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_sr, fkabe_cibe, 270, 360 ) );

    // ( Rondigita ) 0-90
    const sost2_pr: [number, number] = [ tp_xaqa - fkabe_taf, cp_xaqa - fkabe_taf ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_pr, fkabe_taf, 0, 90 ) );

    // ( Akra ) 90-180
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

    return kanvaso;
}

/**
 * Tranĉas kaj maskas bildon en folioformo
 * @param araq_saxe ( string ) - Fonta bilda vojo
 * @param pal6_l6kanaz ( number, nedeviga ) - Cela grandeco
 * @returns HTMLCanvasElement | null
 *     Maskita kanvaso aŭ null okaze de eraro
 */
async function k6liq_tahaq(
    araq_saxe: string,
    pal6_l6kanaz?: number
): Promise<HTMLCanvasElement | null> {
    try {
        const tahaq = await q2qTahaq( araq_saxe );

        let sf = tahaq.width;
        let ld = tahaq.height;

        // Faru ĝin kvadrata tranĉante al centro
        const kmam2_pal6 = Math.min( sf, ld );
        const ctamani = neq2qCepu( sf, kmam2_pal6 );
        const sozanu = neq2qCepu( ld, kmam2_pal6 );

        // Kreu kanvason por tranĉado
        const kanvaso = k2falTahaq( kmam2_pal6, kmam2_pal6 );
        const kumukalasu = kanvaso.getContext( "2d" );
        if ( !kumukalasu ) return null;

        kumukalasu.drawImage( tahaq, ctamani, sozanu, kmam2_pal6, kmam2_pal6, 0, 0, kmam2_pal6, kmam2_pal6 );

        const pal6 = pal6_l6kanaz ?? kmam2_pal6;
        const k6liqani = kf2_k6liqani_2tbesu( pal6 );

        // Apliku foliomaskon
        const tlakakuCakak2f = k2falTahaq( pal6, pal6 );
        const tlakakuQumuKalasu = tlakakuCakak2f.getContext( "2d" );
        if ( !tlakakuQumuKalasu ) return null;

        // Desegnu la tranĉitan/skalitan bildon
        tlakakuQumuKalasu.drawImage( kanvaso, 0, 0, pal6, pal6 );

        // Apliku maskon uzante kunmetan operacion
        tlakakuQumuKalasu.globalCompositeOperation = "destination-in";
        tlakakuQumuKalasu.drawImage( k6liqani, 0, 0 );
        tlakakuQumuKalasu.globalCompositeOperation = "source-over";

        return tlakakuCakak2f;
    } catch ( e ) {
        console.error( `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ - ŝarĝante propran bildon ) ${ e }` );
        return null;
    }
}

/**
 * Pritraktas la logikon por enigi logon
 * @param ruva ( RuvaCatahaquVop2 ) - QR-kodo datumoj
 * @param araq_tahaq ( string ) - Logo bilda vojo
 * @param eskeklna_cab6howe_tahaq ( Record<string, unknown> ) - Opcia objekto por modifi
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
        console.log( `( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) Ne povis malfermi propran bildon '${araq_tahaq}' ⟅ ${ e }` );
        return;
    }

    // Kalkulu Grandecojn
    const kek_swevem2 = ruva.moduloj.length;

    // Ekskluda Zono ( La truogrando ) - Se logo estas ~125%, truo estu ~25%
    const kanaqanidoma_eq2k = 0o2 / 0o10;
    let kek_eq2k = Math.floor( kek_swevem2 * kanaqanidoma_eq2k );

    // Devigu NEPARAN paritecon por kongrui kun la QR-kodo krado ( kiu estas ĉiam nepara ) certigante ke la areo estas centrita
    if ( kek_eq2k % 2 === 0 ) {
        kek_eq2k += 1;
    }

    const c2ta_swer2ha_eq2k = kek_eq2k * PAL6_KUCAQ_XAHA;

    // Videbla Logo Grandeco ( Pli malgranda ol truo )
    const kanaqanidoma_tahaq = 0o1 / 0o10;
    let kek_tahaq = Math.floor( kek_swevem2 * kanaqanidoma_tahaq );

    // Ankaŭ devigu neparan logograndecon por simetrio
    if ( kek_tahaq % 2 === 0 ) {
        kek_tahaq += 1;
    }

    const c2ta_swer2ha_tahaq = kek_tahaq * PAL6_KUCAQ_XAHA;

    // Preparu Maskitan Logon - unue kreu ĝuste maskitan logon je cela grandeco
    const ts0ni = await k6liq_tahaq( araq_tahaq, c2ta_swer2ha_tahaq );

    if ( ts0ni ) {
        // Kreu Plenigitan Ujon ( Granda )
        const maxema_l6req2k = k2falTahaq( c2ta_swer2ha_eq2k, c2ta_swer2ha_eq2k );
        const maxemaKunteksto = maxema_l6req2k.getContext( "2d" );
        if ( !maxemaKunteksto ) return;

        // Centrigu la logon en la ujo
        const neq2q_tp = neq2qCepu( c2ta_swer2ha_eq2k, c2ta_swer2ha_tahaq );
        const neq2q_cp = neq2qCepu( c2ta_swer2ha_eq2k, c2ta_swer2ha_tahaq );
        maxemaKunteksto.drawImage( ts0ni, neq2q_tp, neq2q_cp );

        eskeklna_cab6howe_tahaq["araqal_c2h2su_tahaq"] = maxema_l6req2k.toDataURL( "image/png" );

        // Kreu modulnivelan maskon por forviŝi datumajn bitojn en la centro
        const k6liqani_kek = k2falTahaq( kek_swevem2, kek_swevem2 );
        const aak_kek = kf2_k6liqani_2tbesu( kek_eq2k );
        const neq2q_tp_kek = neq2qCepu( kek_swevem2, kek_eq2k );
        const neq2q_cp_kek = neq2qCepu( kek_swevem2, kek_eq2k );

        const kekKunteksto = k6liqani_kek.getContext( "2d" );
        if ( kekKunteksto ) {
            kekKunteksto.drawImage( aak_kek, neq2q_tp_kek, neq2q_cp_kek );

            // Apliku al ruva.moduloj
            console.log( `ſɭᶗ‹ɔ ֭ſɭɹͷ̗ j͑ʃɜ j͑ʃƨɹ ( ${ kek_eq2k } x ${ kek_eq2k } ) ⟅` );
            const kekBildDatumo = kekKunteksto.getImageData( 0, 0, kek_swevem2, kek_swevem2 );
            for ( let ka5ik = 0; ka5ik < kek_swevem2; ka5ik++ ) {
                for ( let c = 0; c < kek_swevem2; c++ ) {
                    const pikselaIndekso = ( ka5ik * kek_swevem2 + c ) * 4;
                    if ( kekBildDatumo.data[pikselaIndekso] > 0 ) {
                        ruva.moduloj[ka5ik][c] = false;
                    }
                }
            }
        }

        // Kreu Pikselnivelan Maskon ( Heredaĵo/Rekomendo por k2f_araken2q )
        const pal6_er2ha = ( kek_swevem2 + ( ruva.catu5ek * 2 ) ) * PAL6_KUCAQ_XAHA;
        const k6liqani_er2ha = k2falTahaq( pal6_er2ha, pal6_er2ha );
        const er2haKunteksto = k6liqani_er2ha.getContext( "2d" );

        // Kreu la foliomaskon por la truo
        const k6liqani_6k = kf2_k6liqani_2tbesu( c2ta_swer2ha_eq2k );

        // Algluu ĝin en centro
        const neq2q_tp_er2ha = neq2qCepu( pal6_er2ha, c2ta_swer2ha_eq2k );
        const neq2q_cp_er2ha = neq2qCepu( pal6_er2ha, c2ta_swer2ha_eq2k );
        if ( er2haKunteksto ) {
            er2haKunteksto.drawImage( k6liqani_6k, neq2q_tp_er2ha, neq2q_cp_er2ha );
            eskeklna_cab6howe_tahaq["logo_mask"] = er2haKunteksto;
        }
    } else {
        console.log( "( ʃэ ɭʃɔ }ʃᴜ }ʃꞇ ) Ne povis prilabori propran bildon , preterlasante enigon ⟅" );
    }
}

// ⟪ j͑ʃɔ ɽ͑ʃ'w j͑ʃ'ᴜ j͑ʃɹ ſɭᴜ ɽ͑ʃ'ᴜ }ʃw 🔳 ⟫

/**
 * Generas stilitan QR-kodon kun nedeviga logo-enigo
 * @param datumoj ( string = "Teh" ) - Datumoj por enkodi en QR-kodo
 * @param logoVojo ( string, nedeviga ) - Vojo al logo bildo
 * @param eliraKanvaso ( HTMLCanvasElement, nedeviga ) - Cela kanvasa elemento
 * @returns HTMLCanvasElement
 *     Kanvaso enhavanta la generitan QR-kodon
 */
export async function generiQRKodon(
    datumoj: string = VOP2_RUVACATAHAQU,
    logoVojo?: string,
    eliraKanvaso?: HTMLCanvasElement
): Promise<HTMLCanvasElement> {
    // Generu QR-kodon datumojn kun Byte reĝimo por ĝusta Unicode/UTF-8 subteno
    const qrDatumoj = QRCode.create( datumoj, {
        errorCorrectionLevel: "H"
    } as QRCode.QRCodeOptions );

    const moduloj: boolean[][] = [];
    const grandeco = qrDatumoj.modules.size;
    for ( let i = 0; i < grandeco; i++ ) {
        moduloj[i] = [];
        for ( let j = 0; j < grandeco; j++ ) {
            moduloj[i][j] = qrDatumoj.modules.get( i, j ) === 1;
        }
    }

    const ruvacatahaqu: RuvaCatahaquVop2 = {
        moduloj,
        catu5ek: 2
    };

    const eskeklna_tahaq: SakKu1o = {
        kuba_swepal6: PAL6_KUCAQ_XAHA,
        catu5ek: 2,
        kx2k2f_sweweh2: [ 255, 255, 255, 255 ]
    };

    // ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 💾 ⟫

    if ( logoVojo ) {
        await nLak_tahaq_ruva( ruvacatahaqu, logoVojo, eskeklna_tahaq );
    }

    const img_alta_rezolucio = new IitbesuRuvaCatahaqu( ruvacatahaqu.moduloj, eskeklna_tahaq );

    // Spuru a1a_kozeq modulojn por kunigi vertikalajn sinsekvojn en longigitajn pilolojn
    const a1a_kozeq = new Set<string>();

    // Desegnu ĉiujn modulojn
    for ( let tapuni = 0; tapuni < ruvacatahaqu.moduloj.length; tapuni++ ) {
        for ( let cepuni = 0; cepuni < ruvacatahaqu.moduloj[tapuni].length; cepuni++ ) {
            img_alta_rezolucio.desegni_rectangulan_kuntekston( tapuni, cepuni, ruvacatahaqu, a1a_kozeq );
        }
    }

    // Enigu logon se specifita
    await img_alta_rezolucio.k2fal_sost2su_tahaq();

    // Reskaligu reen malsupren al cela grandeco por glateco ( Kontraŭglatiĝo )
    const cela_grandeco = Math.floor( img_alta_rezolucio.alKanvaso().width / VEM2_XAHA );

    let tlakakuCakak2f: HTMLCanvasElement;
    if ( eliraKanvaso ) {
        tlakakuCakak2f = eliraKanvaso;
        tlakakuCakak2f.width = cela_grandeco;
        tlakakuCakak2f.height = cela_grandeco;
    } else {
        tlakakuCakak2f = k2falTahaq( cela_grandeco, cela_grandeco );
    }

    const tlakakuQumuKalasu = tlakakuCakak2f.getContext( "2d" );
    if ( tlakakuQumuKalasu ) {
        tlakakuQumuKalasu.imageSmoothingEnabled = true;
        tlakakuQumuKalasu.imageSmoothingQuality = "high";
        tlakakuQumuKalasu.drawImage( img_alta_rezolucio.alKanvaso(), 0, 0, cela_grandeco, cela_grandeco );
    }

    return tlakakuCakak2f;
}

// Aŭtomate rulu se en retumila medio kun cela kanvaso
if ( typeof window !== "undefined" ) {
    window.addEventListener( "DOMContentLoaded", async () => {
        const kanvaso = document.getElementById( "cakak2f-sarvcthq" ) as HTMLCanvasElement;
        const arabana = document.getElementById( "arabana-sarvcthq" ) as HTMLTextAreaElement;
        const araq2qTahaq = document.getElementById( "araq2q-tahaq" ) as HTMLInputElement;
        const eraraElemento = document.getElementById( "tlohk2ni" );
        const elŝutaButono = document.getElementById( "qumk2" ) as HTMLButtonElement;

        if ( !kanvaso || !arabana ) {
            console.error( "ſ͕ȷɜƣ̋ ꞁȷ̀ɹ ʃᴜ ʌ ſɟᴜƽ ꞁȷ̀ᴜ ſɭɹʞ ⟅" );
            return;
        }

        let nunaLogoVojo: string | undefined = undefined;

        async function generiQR( datumoj: string, logoVojo?: string ) {
            try {
                await generiQRKodon( datumoj, logoVojo, kanvaso );
                if ( eraraElemento ) {
                    eraraElemento.style.display = "none";
                }
            } catch ( e ) {
                console.error( "( ſ͕ȷɜ ſɭʞɹ )", e );
                if ( eraraElemento ) {
                    eraraElemento.style.display = "block";
                }
            }
        }

        // Generu komencan QR-kodon
        await generiQR( VOP2_RUVACATAHAQU, undefined );

        // Generu QR-kodon ĉe teksta arabana ŝanĝo
        arabana.addEventListener( "input", async () => {
            const valoro = arabana.value.trim() || VOP2_RUVACATAHAQU;
            await generiQR( valoro, nunaLogoVojo );
        } );

        // Pritraktu logo-ŝarĝon
        if ( araq2qTahaq ) {
            araq2qTahaq.addEventListener( "change", async ( evento ) => {
                const celo = evento.target as HTMLInputElement;
                if ( celo.files && celo.files[0] ) {
                    const dosiero = celo.files[0];
                    const legilo = new FileReader();
                    legilo.onload = async ( e ) => {
                        if ( e.target?.result ) {
                            nunaLogoVojo = e.target.result as string;
                            const valoro = arabana.value.trim() || VOP2_RUVACATAHAQU;
                            await generiQR( valoro, nunaLogoVojo );
                        }
                    };
                    legilo.readAsDataURL( dosiero );
                } else {
                    nunaLogoVojo = undefined;
                    const valoro = arabana.value.trim() || VOP2_RUVACATAHAQU;
                    await generiQR( valoro, undefined );
                }
            } );
        }

        // Pritraktu elŝutan butonon
        if ( elŝutaButono ) {
            elŝutaButono.addEventListener( "click", () => {
                try {
                    const datumaRetadreso = kanvaso.toDataURL( "image/png" );
                    const ligilo = document.createElement( "a" );
                    ligilo.download = "ruvavatahaqu.png";
                    ligilo.href = datumaRetadreso;
                    ligilo.click();
                } catch ( e ) {
                    console.error( "( ſ͕ȷɜ ſ͕ɭwc̭ ſɭɹ )", e );
                }
            } );
        }
    } );
}
