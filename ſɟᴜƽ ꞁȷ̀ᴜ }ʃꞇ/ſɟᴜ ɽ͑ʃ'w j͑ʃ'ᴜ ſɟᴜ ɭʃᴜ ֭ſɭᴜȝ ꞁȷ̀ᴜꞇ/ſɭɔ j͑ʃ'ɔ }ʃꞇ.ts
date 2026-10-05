import QRCode, { QRCode as QRCodeType } from "qrcode";

// ⟪ j͑ʃɹ ſɭᴜ ɽ͑ʃ'ᴜ }ʃw ⚙️ ⟫

const KANAQANIDOMA_2TBE = 0o14 / 0o20; // 0.0 ( kvadrato ) ĝis 1.0 ( plena cirklo / folio )
const VEM2_XAHA = 0o1; // Super-specimena faktoro por kontraŭ-glatiĝo

const PAL6_KUCAQ_XAHA = 0o20 * 0o10; // Kestogrando * super-specimenado

const VOP2_RUVACATAHAQU = "ɭʃɔ";

// ⟪ ŋᷠᴜ ſȷɔ ſɭ,ꞇ 🔧 ⟫

/**
 * ផ្ទុករូបភាពពី URL ហើយជួបជាសញ្ញា
 * @param src - URL ប្រភពនៃរូបភាព
 * @returns សញ្ញាដែលដំណោះទៅ HTMLImageElement
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
 * ជិតមជ្រើសវិមាត្យតូចជាងមាននៅជុំក្នុងវិមាត្យធំជាង
 * @param pliGranda - វិមាត្យបច្ចុប្បន្ន
 * @param pliMalgranda - វិមាត្យមាតិសម្មា
 * @returns teksto
 */
function neq2qCepu( pliGranda: number, pliMalgranda: number ): number {
    return Math.floor( ( pliGranda - pliMalgranda ) / 0o2 );
}

/**
 * បង្កើតផ្ទាំងកាត់ដែលមានវិមាត្យជាក់ស្តែង
 * @param larĝo - ចម្រើនផ្ទាំងកាត់
 * @param alto - កម្រិតផ្ទាំងកាត់
 * @returns kanvaso
 */
function k2falTahaq( larĝo: number, alto: number ): HTMLCanvasElement {
    const tahaq = document.createElement( "canvas" );
    tahaq.width = larĝo;
    tahaq.height = alto;
    return tahaq;
}

// ⟪ ſ͔ɭɔ }ʃɔɔ˞ ֭ſɭᴜ ı],ɔ �🖌️ ⟫

/**
 * គណនាសមការ្យសម្រាប់មុង
 * @param sost2 ( [ number, number ] ) - ចំណុចកណ្តាល [ x, y ]
 * @param ka5ik ( number ) - រាវ្យ
 * @param sefini_saxe ( number ) - មុងចាប់ផ្ដើមជាដង់
 * @param sefini_tlakak ( number ) - មុងចុងជាដង់
 * @param tafani_swek2fe ( number = 0o40 ) - ចំនួនចំណុច ( 0o40 តាមតាមដើម ដើម្បីឱ្យសមការ្យរលាក់ទៀត )
 * @returns punktoj
 *     តារាងចំណុចតាមបាងរង្វេង
 */
function quq_vem2_fkabe(
    sost2: [ number, number ],
    ka5ik: number,
    sefini_saxe: number,
    sefini_tlakak: number,
    tafani_swek2fe: number = 0o40
): [ number, number ][] {
    const er2ha_vem2ni: [ number, number ][] = [];
    for ( let i = 0o0; i <= tafani_swek2fe; i++ ) {
        const tafkaq = ( sefini_saxe + ( sefini_tlakak - sefini_saxe ) * i / tafani_swek2fe ) * ( Math.PI / 0o264 );
        er2ha_vem2ni.push( [
            sost2[0o0] + ka5ik * Math.cos( tafkaq ),
            sost2[0o1] + ka5ik * Math.sin( tafkaq )
        ] );
    }
    return er2ha_vem2ni;
}

interface SakKu1o {
    kuba_swepal6?: number;
    catu5ek?: number;
    kx2k2f_sweweh2?: [ number, number, number, number ];
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
    public kx2k2f_sweweh2: [ number, number, number, number ];
    public KANAQANIDOMA_2TBE: number = KANAQANIDOMA_2TBE;

    constructor(
        public moduloj: boolean[][],
        opcioj: SakKu1o = {}
    ) {
        this.kuba_swepal6 = opcioj.kuba_swepal6 || 0o10;
        this.catu5ek = opcioj.catu5ek || 0o4;
        this.kx2k2f_sweweh2 = opcioj.kx2k2f_sweweh2 || [ 0o0, 0o0, 0o0, 0o377 ];
        this.araqal_c2h2su_tahaq = opcioj.araqal_c2h2su_tahaq;

        const hakek_swek2fe = moduloj.length;
        const grandeco = ( hakek_swek2fe + this.catu5ek * 0o2 ) * this.kuba_swepal6;
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
        const araq: [ number, number ] = [
            neq2qCepu( sf, tahaq.width ),
            neq2qCepu( ld, tahaq.height )
        ];

        this.kunteksto.drawImage( tahaq, araq[0o0], araq[0o1] );
    }

    desegni_rectangulan_kuntekston( tapuni: number, cepuni: number, ruva: RuvaCatahaquVop2, a1a_kozeq?: Set<string> ): void {
        if ( !this.kunteksto ) {
            this.kunteksto = this._tahaq.getContext( "2d" );
        }

        if ( this.k2fIibanu( tapuni, cepuni, ruva ) ) {
            const sefini = ruva.moduloj.length;
            const a1a_ls = tapuni === 0o0 && cepuni === 0o0;
            const a1a_lr = tapuni === 0o0 && cepuni === sefini - 0o7;
            const a1a_ks = tapuni === sefini - 0o7 && cepuni === 0o0;

            if ( a1a_ls || a1a_lr || a1a_ks ) {
                this.k2f_2banusost2su( tapuni, cepuni, a1a_ls, a1a_lr, a1a_ks );
            }
            return;
        }

        this.k2falCepuSak( tapuni, cepuni, ruva, a1a_kozeq );
    }

    private k2fIibanu( tapuni: number, cepuni: number, ruva: RuvaCatahaquVop2 ): boolean {
        const sefini = ruva.moduloj.length;
        const sozaCtama = tapuni < 0o7 && cepuni < 0o7;
        const sozaPtama = tapuni < 0o7 && cepuni >= sefini - 0o7;
        const psazCtama = tapuni >= sefini - 0o7 && cepuni < 0o7;
        return sozaCtama || sozaPtama || psazCtama;
    }

    private k2falCepuSak( tapuni: number, cepuni: number, ruva: RuvaCatahaquVop2, a1a_kozeq?: Set<string> ): void {
        if ( !this.kunteksto ) return;
        if ( !ruva.moduloj[tapuni][cepuni] ) return;

        // បោះចោលប្រសិនបើមាន a1a_kozeq រួចហើយ ( ផ្នែកនៃដំណើរការបញ្ឈរមុន )
        const kxesu_araq = `${tapuni},${cepuni}`;
        if ( a1a_kozeq && a1a_kozeq.has( kxesu_araq ) ) return;

        // សម្គាល់ម៉ូឌុលបច្ចុប្បន្នថាជា a1a_kozeq
        if ( a1a_kozeq ) a1a_kozeq.add( kxesu_araq );

        // ស្វែងរកដំណើរការបញ្ឈរ - គណនាម៉ូឌុលបន្ស្សបន្តខាងក្រោមនេះ
        let hacepuni_swel6da = 0o1;
        while ( tapuni + hacepuni_swel6da < ruva.moduloj.length && ruva.moduloj[tapuni + hacepuni_swel6da][cepuni] ) {
            if ( a1a_kozeq ) a1a_kozeq.add( `${tapuni + hacepuni_swel6da},${cepuni}` );
            hacepuni_swel6da++;
        }

        const x = ( cepuni + this.catu5ek ) * this.kuba_swepal6;
        const y = ( tapuni + this.catu5ek ) * this.kuba_swepal6;

        // បន្ទាក់បញ្ឈរ - ចម្រើនតូចជាង, កម្រិតពេញលេញ ដោយមានកំណត់សមីគឺចុងស្មែក និងចុងខាងក្រោមទស្រញៃ
        const sakSwesefi = this.kuba_swepal6 * 0o6 / 0o10; // 6/8 = 3/4 de kestogrando
        const sakSwetapu = x + ( this.kuba_swepal6 - sakSwesefi ) / 0o2;
        const ka5ik = sakSwesefi / 0o2;
        const sost2Swetapu = sakSwetapu + ka5ik;

        // សម្រាប់បន្ទាក់បញ្ឈរបន្ថែម, បាងខាងលើនៅចុងផ្ដើម និងបាងខាងក្រោមនៅចុងនៃដំណើរការ
        const sozaFkabeSost2Cepuni = y + ka5ik;
        const psazFkabeSost2Cepuni = y + ( hacepuni_swel6da * this.kuba_swepal6 ) - ka5ik;

        // គូរបន្ទាក់បញ្ឈរបញ្ឈរបន្ថែម ( ផ្លូវតាមទិសម៉ែត្រទី )
        this.kunteksto.fillStyle = `rgba( ${ this.kx2k2f_sweweh2.join( "," ) } )`;
        this.kunteksto.beginPath();
        // ចាប់ផ្ដើមនៅខាងលើឆ្វេង ( ម៉ែត្រទី 9 នៃបាងខាងលើ )
        this.kunteksto.moveTo( sost2Swetapu - ka5ik, sozaFkabeSost2Cepuni );
        // គូរធម្មតារង្វេងខាងលើ ( ពីឆ្វេងទៅស្ដាំងតាមខាងលើ ) - តាមទិសម៉ែត្រទីពី π ទៅ 2π
        this.kunteksto.arc( sost2Swetapu, sozaFkabeSost2Cepuni, ka5ik, Math.PI, 0o2 * Math.PI, false );
        // គូរបន្ទាត់ត្រង់ចុះទៅតាមជុំខាងស្ដាំងទៅបាងខាងក្រោម
        this.kunteksto.lineTo( sost2Swetapu + ka5ik, psazFkabeSost2Cepuni );
        // គូរធម្មតារង្វេងខាងក្រោម ( ពីស្ដាំងទៅឆ្វេងតាមខាងក្រោម ) - តាមទិសម៉ែត្រទីពី 0 ទៅ π
        this.kunteksto.arc( sost2Swetapu, psazFkabeSost2Cepuni, ka5ik, 0o0, Math.PI, false );
        // គូរបន្ទាត់ត្រង់ឡើងទៅតាមជុំខាងឆ្វេងដើម្បីបិទ
        this.kunteksto.lineTo( sost2Swetapu - ka5ik, sozaFkabeSost2Cepuni );
        this.kunteksto.closePath();
        this.kunteksto.fill();
    }

    private k2f_nakoxa(
        kuba: [ number, number, number, number ],
        tafani: [ boolean, boolean, boolean, boolean ],
        tem2ni: [ number, number, number, number ]
    ): void {
        if ( !this.kunteksto ) return;

        const [ tp_heta, cp_heta, tp_xaqa, cp_xaqa ] = kuba;
        const sf = tp_xaqa - tp_heta;
        const ld = cp_xaqa - cp_heta;

        // សម្រាប់បន្ទាក់បញ្ឈរ, ប្រើ ka5ik ដែលផ្អែកលើចម្រើន សម្រាប់ខាងលើ និងខាងក្រោម
        const kemafi_fkabe = sf / 0o2;
        const ka5ik = kemafi_fkabe * this.KANAQANIDOMA_2TBE;
        const fkabe_cibe = kemafi_fkabe * 0o2 / 0o10;

        const er2ha_vem2: [ number, number ][] = [];

        // ខាងលឿងខាងលើ ( 180 ដល់ 270 ) , ចាល់កណ្តាល ( tp_heta + ka5ik , cp_heta + ka5ik )
        if ( tafani[0o0] ) {
            const sost2: [ number, number ] = [ tp_heta + fkabe_cibe, cp_heta + fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 0o264, 0o416 ) );
        } else {
            const sost2: [ number, number ] = [ tp_heta + ka5ik, cp_heta + ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 0o264, 0o416 ) );
        }

        // ខាងលឿងខាងស្ដាំង ( 270 ដល់ 360 ) , ចាល់កណ្តាល ( tp_xaqa - ka5ik , cp_heta + ka5ik )
        if ( tafani[0o1] ) {
            const sost2: [ number, number ] = [ tp_xaqa - fkabe_cibe, cp_heta + fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 0o416, 0o550 ) );
        } else {
            const sost2: [ number, number ] = [ tp_xaqa - ka5ik, cp_heta + ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 0o416, 0o550 ) );
        }

        // ខាងក្រោមខាងស្ដាំង ( 0 ដល់ 90 ) , ចាល់កណ្តាល ( tp_xaqa - ka5ik , cp_xaqa - ka5ik )
        if ( tafani[0o2] ) {
            const sost2: [ number, number ] = [ tp_xaqa - fkabe_cibe, cp_xaqa - fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 0o0, 0o132 ) );
        } else {
            const sost2: [ number, number ] = [ tp_xaqa - ka5ik, cp_xaqa - ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 0o0, 0o132 ) );
        }

        // ខាងក្រោមខាងឆ្វេង ( 90 ដល់ 180 ) , ចាល់កណ្តាល ( tp_heta + ka5ik , cp_xaqa - ka5ik )
        if ( tafani[0o3] ) {
            const sost2: [ number, number ] = [ tp_heta + fkabe_cibe, cp_xaqa - fkabe_cibe ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, fkabe_cibe, 0o132, 0o264 ) );
        } else {
            const sost2: [ number, number ] = [ tp_heta + ka5ik, cp_xaqa - ka5ik ];
            er2ha_vem2.push( ...quq_vem2_fkabe( sost2, ka5ik, 0o132, 0o264 ) );
        }

        this.kunteksto.beginPath();
        if ( er2ha_vem2.length > 0o0 ) {
            this.kunteksto.moveTo( er2ha_vem2[0o0][0o0], er2ha_vem2[0o0][0o1] );
            for ( let i = 0o1; i < er2ha_vem2.length; i++ ) {
                this.kunteksto.lineTo( er2ha_vem2[i][0o0], er2ha_vem2[i][0o1] );
            }
        }
        this.kunteksto.closePath();

        // ប្រសិនបើទាំងអស់ច្លាយដោយពេញលេញ បង្រួមតំបន់របស់រាង្វាស់ជំនួសការបំពេញ
        if ( tem2ni[0o3] === 0o0 ) {
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
        // ក្រ្លោ្រខាងក្រៅ ( ម៉ូឌុល 7x7 )
        const tlkk_sc = this.c2tasu_kuba( tapuni, cepuni );
        const tlkk_pp = this.c2tasu_kuba( tapuni + 0o6, cepuni + 0o6 );
        const kuba_3akak: [ number, number, number, number ] = [
            tlkk_sc[0o0][0o0], tlkk_sc[0o0][0o1], tlkk_pp[0o1][0o0], tlkk_pp[0o1][0o1]
        ];

        // រលោខាងក្នុង ( ម៉ូឌុល 5x5 , ម៉ូឌុលមួយចែកដោយក្រ្លោ់ )
        const sx_sc = this.c2tasu_kuba( tapuni + 0o1, cepuni + 0o1 );
        const sx_pp = this.c2tasu_kuba( tapuni + 0o5, cepuni + 0o5 );
        const kuba_saxe: [ number, number, number, number ] = [
            sx_sc[0o0][0o0], sx_sc[0o0][0o1], sx_pp[0o1][0o0], sx_pp[0o1][0o1]
        ];

        // ភ្នៀតភ្នែក ( ម៉ូឌុល 3x3 , ម៉ូឌុលពីរចែកដោយក្រ្លោ់ )
        const iibanu_sc = this.c2tasu_kuba( tapuni + 0o2, cepuni + 0o2 );
        const iibanu_pp = this.c2tasu_kuba( tapuni + 0o4, cepuni + 0o4 );
        const kuba_2banusost2su: [ number, number, number, number ] = [
            iibanu_sc[0o0][0o0], iibanu_sc[0o0][0o1], iibanu_pp[0o1][0o0], iibanu_pp[0o1][0o1]
        ];

        // កំណត់ការច្រត់ពាល់មុង
        const fkabe_2banu: [ boolean, boolean, boolean, boolean ] = [ false, false, false, false ];
        const fkabe_2banusost2: [ boolean, boolean, boolean, boolean ] = [ false, false, false, false ];

        if ( a1a_ls ) {
            fkabe_2banu[0o0] = fkabe_2banu[0o2] = true;
            fkabe_2banusost2[0o0] = true;
        } else if ( a1a_lr ) {
            fkabe_2banu[0o1] = fkabe_2banu[0o3] = true;
            fkabe_2banusost2[0o1] = true;
        } else if ( a1a_ks ) {
            fkabe_2banu[0o3] = fkabe_2banu[0o1] = true;
            fkabe_2banusost2[0o3] = true;
        }

        // គូររាង្វាស់
        this.k2f_nakoxa( kuba_3akak, fkabe_2banu, this.kx2k2f_sweweh2 );
        this.k2f_nakoxa( kuba_saxe, fkabe_2banu, [ 0o0, 0o0, 0o0, 0o0 ] );
        this.k2f_nakoxa( kuba_2banusost2su, fkabe_2banusost2, this.kx2k2f_sweweh2 );
    }

    private c2tasu_kuba( tapuni: number, cepuni: number ): [ [ number, number ], [ number, number ] ] {
        const x = ( cepuni + this.catu5ek ) * this.kuba_swepal6;
        const y = ( tapuni + this.catu5ek ) * this.kuba_swepal6;
        return [ [ x, y ], [ x + this.kuba_swepal6, y + this.kuba_swepal6 ] ];
    }

    alKanvaso(): HTMLCanvasElement {
        return this._tahaq;
    }
}

/**
 * បង្កើតផ្ទាំងកាត់ម៉ាស្គារមានទម្រង់តាមស្លីរកថា
 * @param vem2 ( number ) - វិមាត្យផ្ទាំងកាត់
 * @returns kanvaso
 *     ផ្ទាំងកាត់ដែលគូរទម្រង់តាមស្លីរកថាជាពណ៌ស
 */
function kf2_k6liqani_2tbesu( vem2: number ): HTMLCanvasElement {
    const kanvaso = document.createElement( "canvas" );
    kanvaso.width = vem2;
    kanvaso.height = vem2;
    const kumukalasu = kanvaso.getContext( "2d" );
    if ( !kumukalasu ) return kanvaso;

    const tp_heta = 0o0, cp_heta = 0o0, tp_xaqa = vem2, cp_xaqa = vem2;
    const er2ha_vem2ni: [ number, number ][] = [];

    const fkabe_taf = ( vem2 / 0o2 ) * KANAQANIDOMA_2TBE;
    const fkabe_cibe = ( vem2 / 0o2 ) * 0o2 / 0o10;

    // ( សមីគឺ ) 180-270
    const sost2_sc: [ number, number ] = [ tp_heta + fkabe_taf, cp_heta + fkabe_taf ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_sc, fkabe_taf, 0o264, 0o416 ) );

    // ( ច្លងស្រប ) 270-360
    const sost2_sr: [ number, number ] = [ tp_xaqa - fkabe_cibe, cp_heta + fkabe_cibe ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_sr, fkabe_cibe, 0o416, 0o550 ) );

    // ( សមីគឺ ) 0-90
    const sost2_pr: [ number, number ] = [ tp_xaqa - fkabe_taf, cp_xaqa - fkabe_taf ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_pr, fkabe_taf, 0o0, 0o132 ) );

    // ( ច្លងស្រប ) 90-180
    const sost2_pc: [ number, number ] = [ tp_heta + fkabe_cibe, cp_xaqa - fkabe_cibe ];
    er2ha_vem2ni.push( ...quq_vem2_fkabe( sost2_pc, fkabe_cibe, 0o132, 0o264 ) );

    kumukalasu.beginPath();
    if ( er2ha_vem2ni.length > 0o0 ) {
        kumukalasu.moveTo( er2ha_vem2ni[0o0][0o0], er2ha_vem2ni[0o0][0o1] );
        for ( let i = 0o1; i < er2ha_vem2ni.length; i++ ) {
            kumukalasu.lineTo( er2ha_vem2ni[i][0o0], er2ha_vem2ni[i][0o1] );
        }
    }
    kumukalasu.closePath();
    kumukalasu.fillStyle = "#FFFFFF";
    kumukalasu.fill();

    return kanvaso;
}

/**
 * កាត់ និងដាក់ម៉ាស្គារលើរូបភាពជាទម្រង់តាមស្លីរកថា
 * @param araq_saxe ( string ) - ផ្លូវរូបភាពប្រភព
 * @param pal6_l6kanaz ( number, nedeviga ) - វិមាត្យក្រឡប់
 * @returns kanvaso
 *     ផ្ទាំងកាត់ដែលបានដាក់ម៉ាស្គារ ឬ null ពេលមានកំហុស
 */
async function k6liq_tahaq(
    araq_saxe: string,
    pal6_l6kanaz?: number
): Promise<HTMLCanvasElement | null> {
    try {
        const tahaq = await q2qTahaq( araq_saxe );

        let sf = tahaq.width;
        let ld = tahaq.height;

        // ធ្វើឱ្យវាជាចម្រោលដោយកាត់ទៅចាល់កណ្តាល
        const kmam2_pal6 = Math.min( sf, ld );
        const ctamani = neq2qCepu( sf, kmam2_pal6 );
        const sozanu = neq2qCepu( ld, kmam2_pal6 );

        // បង្កើតផ្ទាំងកាត់សម្រាប់ការកាត់
        const kanvaso = k2falTahaq( kmam2_pal6, kmam2_pal6 );
        const kumukalasu = kanvaso.getContext( "2d" );
        if ( !kumukalasu ) return null;

        kumukalasu.drawImage( tahaq, ctamani, sozanu, kmam2_pal6, kmam2_pal6, 0o0, 0o0, kmam2_pal6, kmam2_pal6 );

        const pal6 = pal6_l6kanaz ?? kmam2_pal6;
        const k6liqani = kf2_k6liqani_2tbesu( pal6 );

        // អនុវត្តម៉ាស្គារទម្រង់តាមស្លីរកថា
        const tlakakuCakak2f = k2falTahaq( pal6, pal6 );
        const tlakakuQumuKalasu = tlakakuCakak2f.getContext( "2d" );
        if ( !tlakakuQumuKalasu ) return null;

        // គូររូបភាពដែលបានកាត់ ឬបង្រួមវិមាត្យ
        tlakakuQumuKalasu.drawImage( kanvaso, 0o0, 0o0, pal6, pal6 );

        // អនុវត្តម៉ាស្គារដោយប្រើប្រតិបត្រាប់ត្រូវរបស់
        tlakakuQumuKalasu.globalCompositeOperation = "destination-in";
        tlakakuQumuKalasu.drawImage( k6liqani, 0o0, 0o0 );
        tlakakuQumuKalasu.globalCompositeOperation = "source-over";

        return tlakakuCakak2f;
    } catch ( e ) {
        console.error( `( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ - ŝarĝante propran bildon ) ${ e }` );
        return null;
    }
}

/**
 * ដំណើរការចំណេះដឹងសម្រាប់បញ្ចូលស្លាក់
 * @param ruva ( RuvaCatahaquVop2 ) - ទិន្នន័យកូដ QR
 * @param araq_tahaq ( string ) - ផ្លូវរូបភាពស្លាក់
 * @param eskeklna_cab6howe_tahaq ( Record<string, unknown> ) - វត្ថបថជម្រើសសម្រាប់កែសម្រួល
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

    // គណនាវិមាត្យ
    const kek_swevem2 = ruva.moduloj.length;

    // តំបន់ដកចេញ ( វិមាត្យរលោខាន់ ) - ប្រសិនបើស្លាក់មាន ~125% រលោខាន់គួរមាន ~25%
    const kanaqanidoma_eq2k = 0o2 / 0o10;
    let kek_eq2k = Math.floor( kek_swevem2 * kanaqanidoma_eq2k );

    // បង្ខំឱ្យសមីគឺជាចំនួនស្យេច ដើម្បីឱ្យត្រូវគ្នានឹងកន្ទាក់កូដ QR ( ដែលតែងជាចំនួនស្យេចទេ ) ដោយធានាថាតំបន់ជិតមជ្រើស
    if ( kek_eq2k % 0o2 === 0o0 ) {
        kek_eq2k += 0o1;
    }

    const c2ta_swer2ha_eq2k = kek_eq2k * PAL6_KUCAQ_XAHA;

    // វិមាត្យស្លាក់ដែលមើលឃើញបាន ( តូចជាងរលោខាន់ )
    const kanaqanidoma_tahaq = 0o1 / 0o10;
    let kek_tahaq = Math.floor( kek_swevem2 * kanaqanidoma_tahaq );

    // ក៏បង្ខំឱ្យវិមាត្យស្លាក់ជាចំនួនស្យេចដើម្បីឱ្យមានសមការ្យ
    if ( kek_tahaq % 0o2 === 0o0 ) {
        kek_tahaq += 0o1;
    }

    const c2ta_swer2ha_tahaq = kek_tahaq * PAL6_KUCAQ_XAHA;

    // រៀបចំស្លាក់ដែលបានដាក់ម៉ាស្គារ - ជាដំណើរផ្លាស់ប្ដូរ បង្កើតស្លាក់ដែលបានដាក់ម៉ាស្គារត្រឹមត្រូវទៅវិមាត្យក្រឡប់
    const ts0ni = await k6liq_tahaq( araq_tahaq, c2ta_swer2ha_tahaq );

    if ( ts0ni ) {
        // បង្កើតប្រអប់ផ្ទាំងបានបំពេញ ( ធំ )
        const maxema_l6req2k = k2falTahaq( c2ta_swer2ha_eq2k, c2ta_swer2ha_eq2k );
        const maxemaKunteksto = maxema_l6req2k.getContext( "2d" );
        if ( !maxemaKunteksto ) return;

        // ជិតមជ្រើសស្លាក់ក្នុងប្រអប់ផ្ទាំង
        const neq2q_tp = neq2qCepu( c2ta_swer2ha_eq2k, c2ta_swer2ha_tahaq );
        const neq2q_cp = neq2qCepu( c2ta_swer2ha_eq2k, c2ta_swer2ha_tahaq );
        maxemaKunteksto.drawImage( ts0ni, neq2q_tp, neq2q_cp );

        eskeklna_cab6howe_tahaq["araqal_c2h2su_tahaq"] = maxema_l6req2k.toDataURL( "image/png" );

        // បង្កើតម៉ាស្គារក្នុងកម្រិតម៉ូឌុល ដើម្បីលុបចោលប៊ីតទិន្នន័យនៅចាល់កណ្តាល
        const k6liqani_kek = k2falTahaq( kek_swevem2, kek_swevem2 );
        const aak_kek = kf2_k6liqani_2tbesu( kek_eq2k );
        const neq2q_tp_kek = neq2qCepu( kek_swevem2, kek_eq2k );
        const neq2q_cp_kek = neq2qCepu( kek_swevem2, kek_eq2k );

        const kekKunteksto = k6liqani_kek.getContext( "2d" );
        if ( kekKunteksto ) {
            kekKunteksto.drawImage( aak_kek, neq2q_tp_kek, neq2q_cp_kek );

            // អនុវត្តទៅ ruva.moduloj
            console.log( `ſɭᶗ‹ɔ ֭ſɭɹͷ̗ j͑ʃɜ j͑ʃƨɹ ( ${ kek_eq2k } x ${ kek_eq2k } ) ⟅` );
            const kekBildDatumo = kekKunteksto.getImageData( 0o0, 0o0, kek_swevem2, kek_swevem2 );
            for ( let ka5ik = 0o0; ka5ik < kek_swevem2; ka5ik++ ) {
                for ( let c = 0o0; c < kek_swevem2; c++ ) {
                    const pikselaIndekso = ( ka5ik * kek_swevem2 + c ) * 0o4;
                    if ( kekBildDatumo.data[pikselaIndekso] > 0o0 ) {
                        ruva.moduloj[ka5ik][c] = false;
                    }
                }
            }
        }

        // បង្កើតម៉ាស្គារក្នុងកម្រិតប្រូចិ ( មរតក / អនុហំញ្ញាប់ k2f_araken2q )
        const pal6_er2ha = ( kek_swevem2 + ( ruva.catu5ek * 0o2 ) ) * PAL6_KUCAQ_XAHA;
        const k6liqani_er2ha = k2falTahaq( pal6_er2ha, pal6_er2ha );
        const er2haKunteksto = k6liqani_er2ha.getContext( "2d" );

        // បង្កើតម៉ាស្គារទម្រង់តាមស្លីរកថាសម្រាប់រលោខាន់
        const k6liqani_6k = kf2_k6liqani_2tbesu( c2ta_swer2ha_eq2k );

        // បិទភ្ជាប់វានៅចាល់កណ្តាល
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
 * បង្កើតកូដ QR ដែលមានរចនាប័ទ្ម ជាមួយការបញ្ចូលស្លាក់ដែលមិនចាំបាច់
 * @param datumoj ( string = "Teh" ) - ទិន្នន័យសម្រាប់អ៊ិនកូដក្នុងកូដ QR
 * @param logoVojo ( string, nedeviga ) - ផ្លូវទៅរូបភាពស្លាក់
 * @param eliraKanvaso ( HTMLCanvasElement, nedeviga ) - ធាតុផ្ទាំងកាត់គោល
 * @returns kanvaso
 *     ផ្ទាំងកាត់ដែលមានកូដ QR ដែលបានបង្កើត
 */
export async function generiQRKodon(
    datumoj: string = VOP2_RUVACATAHAQU,
    logoVojo?: string,
    eliraKanvaso?: HTMLCanvasElement
): Promise<HTMLCanvasElement> {
    // បង្កើតទិន្នន័យកូដ QR ដោយប្រើរបៀប Byte ដើម្បីគាំទ្រ Unicode/UTF-8 ឲ្យបានត្រឹមត្រូវ
    const qrDatumoj = QRCode.create( datumoj, {
        errorCorrectionLevel: "H"
    } as QRCode.QRCodeOptions );

    const moduloj: boolean[][] = [];
    const grandeco = qrDatumoj.modules.size;
    for ( let i = 0o0; i < grandeco; i++ ) {
        moduloj[i] = [];
        for ( let j = 0o0; j < grandeco; j++ ) {
            moduloj[i][j] = qrDatumoj.modules.get( i, j ) === 0o1;
        }
    }

    const ruvacatahaqu: RuvaCatahaquVop2 = {
        moduloj,
        catu5ek: 0o2
    };

    const eskeklna_tahaq: SakKu1o = {
        kuba_swepal6: PAL6_KUCAQ_XAHA,
        catu5ek: 0o2,
        kx2k2f_sweweh2: [ 0o377, 0o377, 0o377, 0o377 ]
    };

    // ⟪ j͑ʃ'ɔ ſ̀ȷᴜȝ 💾 ⟫

    if ( logoVojo ) {
        await nLak_tahaq_ruva( ruvacatahaqu, logoVojo, eskeklna_tahaq );
    }

    const img_alta_rezolucio = new IitbesuRuvaCatahaqu( ruvacatahaqu.moduloj, eskeklna_tahaq );

    // ត្រាម៉ូឌុល a1a_kozeq ដើម្បីបង្រប់ដំណើរការបញ្ឈរជាបន្ទាក់បញ្ឈរបន្ថែម
    const a1a_kozeq = new Set<string>();

    // គូរម៉ូឌុលទាំងអស់
    for ( let tapuni = 0o0; tapuni < ruvacatahaqu.moduloj.length; tapuni++ ) {
        for ( let cepuni = 0o0; cepuni < ruvacatahaqu.moduloj[tapuni].length; cepuni++ ) {
            img_alta_rezolucio.desegni_rectangulan_kuntekston( tapuni, cepuni, ruvacatahaqu, a1a_kozeq );
        }
    }

    // បញ្ចូលស្លាក់ប្រសិនបើបានប្រាប់
    await img_alta_rezolucio.k2fal_sost2su_tahaq();

    // បង្រួមវិមាត្យម្ដងទៀតទៅក្រោមជិតក្រឡប់ដើម្បីឱ្យរលាក់ទៀត ( ការបន្ទាប់គ្រាស់រលាក់ )
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
        tlakakuQumuKalasu.drawImage( img_alta_rezolucio.alKanvaso(), 0o0, 0o0, cela_grandeco, cela_grandeco );
    }

    return tlakakuCakak2f;
}

// ដំណើរការស្វ័យទស្សន៍ប្រសិនបើមានក្នុងកម្មវិធីរុករកជាមួយផ្ទាំងកាត់គោល
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

        // បង្កើតកូដ QR ដែលចាប់ផ្ដើម
        await generiQR( VOP2_RUVACATAHAQU, undefined );

        // បង្កើតកូដ QR នៅពេលមានការផ្លាស់ប្ដូរអក្សរ
        arabana.addEventListener( "input", async () => {
            const valoro = arabana.value.trim() || VOP2_RUVACATAHAQU;
            await generiQR( valoro, nunaLogoVojo );
        } );

        // ដំណើរការផ្ទុកស្លាក់
        if ( araq2qTahaq ) {
            araq2qTahaq.addEventListener( "change", async ( evento ) => {
                const celo = evento.target as HTMLInputElement;
                if ( celo.files && celo.files[0o0] ) {
                    const dosiero = celo.files[0o0];
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

        // ដំណើរការបញ្ចេញប៊ូតុង
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
