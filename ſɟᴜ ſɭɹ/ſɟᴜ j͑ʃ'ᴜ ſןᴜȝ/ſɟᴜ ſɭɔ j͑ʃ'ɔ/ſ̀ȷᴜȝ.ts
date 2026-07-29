/**
 * ≺⧼ ſ̀ȷᴜȝ ⧽≻
 *
 * Import and export helpers for the 3D block builder.
 * Kept separate from the main workspace so the IO concern is isolated.
 */

import * as THREE from "three";

/**
 * A parsed schematic block with integer grid coordinates and a name/id.
 *     x ( number ) - grid x.
 *     y ( number ) - grid y.
 *     z ( number ) - grid z.
 *     name ( string | number ) - minecraft block name or numeric id.
 *     color ( string ) - fallback color when name is unknown.
 */
export interface AnalizitaSchematikaBloko {
    x: number;
    y: number;
    z: number;
    name: string | number;
    color: string;
    formo?: string;
    rotation?: number;
}

/**
 * NBT reader for binary schematic / mcstructure files.
 */
class NBTLegilo {
    constructor(aperaBufro: ArrayBuffer, cxuMalgrandaEndo: boolean = false) {
        this.vido = new DataView(aperaBufro);
        this.movo = 0;
        this.cxuMalgrandaEndo = cxuMalgrandaEndo;
    }

    private vido: DataView;
    private movo: number;
    private cxuMalgrandaEndo: boolean;

    legiBajton(): number {
        const val = this.vido.getInt8(this.movo);
        this.movo += 1;
        return val;
    }

    legiMallongon(): number {
        const val = this.vido.getInt16(this.movo, this.cxuMalgrandaEndo);
        this.movo += 2;
        return val;
    }

    legiNesignanMallongon(): number {
        const val = this.vido.getUint16(this.movo, this.cxuMalgrandaEndo);
        this.movo += 2;
        return val;
    }

    legiEntjeron(): number {
        const val = this.vido.getInt32(this.movo, this.cxuMalgrandaEndo);
        this.movo += 4;
        return val;
    }

    legiFlosanton(): number {
        const val = this.vido.getFloat32(this.movo, this.cxuMalgrandaEndo);
        this.movo += 4;
        return val;
    }

    legiDuoblon(): number {
        const val = this.vido.getFloat64(this.movo, this.cxuMalgrandaEndo);
        this.movo += 8;
        return val;
    }

    legiStringon(): string {
        const length = this.legiNesignanMallongon();
        const bajtoj = new Uint8Array(this.vido.buffer, this.vido.byteOffset + this.movo, length);
        this.movo += length;
        return new TextDecoder().decode(bajtoj);
    }

    legiEtikedon(typeId: number): any {
        switch (typeId) {
            case 0: return null;
            case 1: return this.legiBajton();
            case 2: return this.legiMallongon();
            case 3: return this.legiEntjeron();
            case 4: {
                const val = this.vido.getBigInt64(this.movo, this.cxuMalgrandaEndo);
                this.movo += 8;
                return val;
            }
            case 5: return this.legiFlosanton();
            case 6: return this.legiDuoblon();
            case 7: {
                const length = this.legiEntjeron();
                const bajtoj = new Uint8Array(this.vido.buffer, this.vido.byteOffset + this.movo, length);
                this.movo += length;
                return bajtoj;
            }
            case 8: return this.legiStringon();
            case 9: {
                const elementType = this.legiBajton();
                const length = this.legiEntjeron();
                const listo = [];
                for (let i = 0; i < length; i++) {
                    listo.push(this.legiEtikedon(elementType));
                }
                return listo;
            }
            case 10: {
                const komponajho: Record<string, any> = {};
                while (true) {
                    const etikedaTipo = this.legiBajton();
                    if (etikedaTipo === 0) break;
                    const etikedaNomo = this.legiStringon();
                    const etikedaValoro = this.legiEtikedon(etikedaTipo);
                    komponajho[etikedaNomo] = etikedaValoro;
                }
                return komponajho;
            }
            case 11: {
                const length = this.legiEntjeron();
                const tabelo = [];
                for (let i = 0; i < length; i++) {
                    tabelo.push(this.legiEntjeron());
                }
                return tabelo;
            }
            case 12: {
                const length = this.legiEntjeron();
                const tabelo = [];
                for (let i = 0; i < length; i++) {
                    const val = this.vido.getBigInt64(this.movo, this.cxuMalgrandaEndo);
                    this.movo += 8;
                    tabelo.push(val);
                }
                return tabelo;
            }
            default:
                throw new Error(`Unknown NBT tag type. ${typeId}`);
        }
    }

    parse(): { name: string; value: any } {
        const rootType = this.legiBajton();
        if (rootType !== 10) {
            throw new Error(`Expected root tag of TAG_Compound ( 10 ), got ${rootType}`);
        }
        const name = this.legiStringon();
        const value = this.legiEtikedon(10);
        return { name, value };
    }
}

function malkodiVariantanEntjeranTabelon(bajtaTabelo: Uint8Array | number[]): number[] {
    const rezulto: number[] = [];
    let indekso = 0;
    while (indekso < bajtaTabelo.length) {
        let valoro = 0;
        let sxtovo = 0;
        let b;
        do {
            b = bajtaTabelo[indekso++];
            valoro |= (b & 0o177) << sxtovo;
            sxtovo += 7;
        } while (b & 0o200);
        rezulto.push(valoro);
    }
    return rezulto;
}

async function malpremiGzip(aperaBufro: ArrayBuffer): Promise<ArrayBuffer> {
    const DecompressionStreamClass = (window as any).DecompressionStream;
    if (!DecompressionStreamClass) {
        throw new Error("DecompressionStream is not supported in this browser.");
    }
    const ds = new DecompressionStreamClass("gzip");
    const respondo = new Response(aperaBufro);
    if (!respondo.body) {
        throw new Error("Response body is null");
    }
    const fluo = respondo.body.pipeThrough(ds);
    return await new Response(fluo).arrayBuffer();
}

/**
 * Read a string-or-number field from an NBT compound, trying camelCase,
 * snake_case, and PascalCase variants in that order before falling back to
 * a numeric default.
 *     obj ( any ) - compound tag (may be null ).
 *     keys ( string[] ) - candidate keys to read, in priority order.
 *     fallback ( number ) - value returned when none of the keys resolve.
 * Returns coalesced numeric value.
 */
function legiNombranKampon(obj: any, klavoj: readonly string[], defaŭlto: number): number {
    if (!obj) return defaŭlto;
    for (const klavo of klavoj) {
        const v = obj[klavo];
        if (v !== undefined && v !== null) return Number(v);
    }
    return defaŭlto;
}

/**
 * Resolve the Bedrock block palette from a structure tag, checking the common
 * locations ( block_palette, palette.default, palettes.default ).
 *     structure ( any ) - structure compound from the NBT root.
 * Returns palette array or null.
 */
function solviMcstructurePaletton(strukturo: any): any[] | null {
    const deDefaŭlto = (containilo: any): any[] | null => {
        const def = containilo?.default ?? containilo?.Default;
        return def ? (def.block_palette ?? def.blockPalette ?? null) : null;
    };

    return strukturo.block_palette
        ?? strukturo.blockPalette
        ?? deDefaŭlto(strukturo.palette ?? strukturo.Palette)
        ?? deDefaŭlto(strukturo.palettes ?? strukturo.Palettes)
        ?? null;
}

/**
 * Parse a binary NBT schematic ( .schem ) or mcstructure ( .mcstructure ) file
 * into a flat list of grid blocks.
 *     arrayBuffer ( ArrayBuffer ) - raw file bytes.
 *     isMcstructure ( boolean ) - whether the file is a Bedrock .mcstructure.
 * Returns parsed blocks.
 */
export async function analiziSchematikonAuStructure(aperaBufro: ArrayBuffer, cxuMcstructure: boolean): Promise<AnalizitaSchematikaBloko[]> {
    let malpremita = aperaBufro;
    const uint8 = new Uint8Array(aperaBufro);
    if (uint8[0] === 0o37 && uint8[1] === 0o213) {
        malpremita = await malpremiGzip(aperaBufro);
    }

    const legilo = new NBTLegilo(malpremita, cxuMcstructure);
    const radiko = legilo.parse();
    const datumoj = radiko.value;

    const blokoj: AnalizitaSchematikaBloko[] = [];

    if (cxuMcstructure) {
        const amplekso = datumoj.size || datumoj.Size;
        if (!amplekso || amplekso.length < 3) throw new Error("Invalid structure size");
        const larĝo = Number(amplekso[0]);
        const alto = Number(amplekso[1]);
        const longo = Number(amplekso[2]);

        const strukturo = datumoj.structure || datumoj.Structure;
        if (!strukturo) throw new Error("No structure tag found");

        const blokoIndeksojListo = strukturo.block_indices || strukturo.blockIndices;
        if (!blokoIndeksojListo || blokoIndeksojListo.length === 0) throw new Error("No block_indices found");
        const blokoIndeksoj = blokoIndeksojListo[0];

        const blokaPaleto = solviMcstructurePaletton(strukturo);
        if (!blokaPaleto) throw new Error("No block_palette found");

        const inversaPaleto = blokaPaleto.map((eniro: any) => eniro.name || eniro.Name || "minecraft:air");

        for (let i = 0; i < blokoIndeksoj.length; i++) {
            const paletaIndekso = blokoIndeksoj[i];
            if (paletaIndekso === -1) continue;

            const blokaNomo = inversaPaleto[paletaIndekso];
            if (!blokaNomo || blokaNomo === "minecraft:air" || blokaNomo === "minecraft:structure_void") continue;

            const x = Math.floor(i / (longo * alto));
            const y = Math.floor((i / longo) % alto);
            const z = i % longo;

            blokoj.push({ x, y, z, name: blokaNomo, color: "#888888", formo: "cube", rotation: 0 });
        }
    } else {
        const larĝo = legiNombranKampon(datumoj, [ "Width", "width" ], 0);
        const alto = legiNombranKampon(datumoj, [ "Height", "height" ], 0);
        const longo = legiNombranKampon(datumoj, [ "Length", "length" ], 0);

        if (!larĝo || !alto || !longo) throw new Error("Invalid schematic dimensions");

        const paletaObjekto = datumoj.Palette || datumoj.palette;
        if (!paletaObjekto) throw new Error("No Palette found");        const inversaPaleto: string[] = [];
        for (const [klavo, val] of Object.entries(paletaObjekto)) {
            inversaPaleto[Number(val)] = klavo;
        }

        const blokoDatumajBajtoj = datumoj.BlockData || datumoj.block_data || datumoj.blockdata;
        if (!blokoDatumajBajtoj) throw new Error("No BlockData found");

        const blokoIndeksoj = malkodiVariantanEntjeranTabelon(blokoDatumajBajtoj);

        for (let i = 0; i < blokoIndeksoj.length; i++) {
            const paletaIndekso = blokoIndeksoj[i];
            const blokaNomo = inversaPaleto[paletaIndekso];
            if (!blokaNomo || blokaNomo === "minecraft:air" || blokaNomo.startsWith("minecraft:air[")) continue;

            const y = Math.floor(i / (larĝo * longo));
            const z = Math.floor((i % (larĝo * longo)) / larĝo);
            const x = i % larĝo;

            blokoj.push({ x, y, z, name: blokaNomo, color: "#888888", formo: "cube", rotation: 0 });
        }
    }

    return blokoj;
}

/**
 * Convert a grid ( integer-cell ) coordinate to the world-space center used
 * by the builder ( cell offset by half a unit ).
 *     value ( number ) - grid coordinate.
 * Returns world coordinate.
 */
export function kradoAlMondo(valoro: number): number {
    return valoro + ( 1 / 2 );
}

/**
 * Convert a world-space coordinate back to its grid ( integer-cell ) index,
 * rounding to the nearest cell.
 *     value ( number ) - world coordinate.
 * Returns grid coordinate.
 */
export function mondoAlKrado(valoro: number): number {
    return Math.round(valoro - ( 1 / 2 ));
}

/**
 * The 8-vertex offset pattern for an axis-aligned unit cube anchored at the
 * block's lower-left-back corner ( 0,0,0 ). Each triple is a face triangle in
 * OBJ index space ( 0..7, lifted to 1..N at write time by `vertexOffset` ).
 *
 * Two triangles per face x six faces = twelve triangles for a closed cube.
 */
const KUBAJ_VIZAGXOJ_TRIOJ: ReadonlyArray<readonly [ number, number, number ]> = [
    [ 0, 1, 2 ], [ 0, 2, 3 ],   // back ( -Z )
    [ 4, 7, 6 ], [ 4, 6, 5 ],   // front ( +Z )
    [ 3, 2, 6 ], [ 3, 6, 7 ],   // top ( +Y )
    [ 0, 5, 4 ], [ 0, 1, 5 ],   // bottom ( -Y )
    [ 1, 5, 6 ], [ 1, 6, 2 ],   // right ( +X )
    [ 0, 4, 7 ], [ 0, 7, 3 ]    // left ( -X )
];

/**
 * The 8 local-space offsets that form the block's vertex cloud ( before the
 * block's lower-back corner translation ). Index matches CUBE_FACE_TRIS.
 */
const KUBAJ_VERTEXOJ_LOKAJ_DEVIACIOJ: ReadonlyArray<readonly [ number, number, number ]> = [
    [ 0, 0, 0 ], [ 1, 0, 0 ], [ 1, 1, 0 ], [ 0, 1, 0 ],
    [ 0, 0, 1 ], [ 1, 0, 1 ], [ 1, 1, 1 ], [ 0, 1, 1 ]
];

/**
 * Build the OBJ text body for a list of blocks, returning the OBJ string and
 * the MTL material string.
 *     blocks ( Array ) - blocks with position and color.
 * Returns object with obj and mtl strings.
 */
export function konstruiOBJ(blokoj: Array<{ position: THREE.Vector3Like; color: string }>): { obj: string; mtl: string } {
    let obj = "# ſןᴜȝ j͑ʃп́ɔ ſ̀ȷᴜȝ\n";
    let mat = "# ſןᴜȝ j͑ʃп́ɔ ֭ſɭᴜ ʃᴜ\n";
    const materialoj = new Map<string, number>();
    let matIndekso = 0;
    let verticaMovo = 1;

    for (const bloko of blokoj) {
        const koloro = bloko.color;

        if (!materialoj.has(koloro)) {
            materialoj.set(koloro, matIndekso++);
            const r = parseInt(koloro.slice(1, 3), 0o20) / 255;
            const g = parseInt(koloro.slice(3, 5), 0o20) / 255;
            const b = parseInt(koloro.slice(5, 7), 0o20) / 255;
            mat += `newmtl mat_${materialoj.get(koloro)}\n`;
            mat += `Kd ${r} ${g} ${b}\n`;
        }

        const x = mondoAlKrado(bloko.position.x);
        const y = mondoAlKrado(bloko.position.y);
        const z = mondoAlKrado(bloko.position.z);

        for (const [ox, oy, oz] of KUBAJ_VERTEXOJ_LOKAJ_DEVIACIOJ) {
            obj += `v ${x + ox} ${y + oy} ${z + oz}\n`;
        }

        obj += `usemtl mat_${materialoj.get(koloro)}\n`;
        for (const [a, b, c] of KUBAJ_VIZAGXOJ_TRIOJ) {
            obj += `f ${verticaMovo + a} ${verticaMovo + b} ${verticaMovo + c}\n`;
        }

        verticaMovo += 0o10;
    }

    return { obj, mtl: mat };
}

/**
 * Trigger a browser download for a text blob.
 *     filename ( string ) - download name.
 *     content ( string ) - file contents.
 *     mime ( string ) - mime type.
 */
export function elŝutiTekston(dosierNomo: string, enhavo: string, mime: string): void {
    const blobo = new Blob([enhavo], { type: mime });
    const url = URL.createObjectURL(blobo);
    const ligilo = document.createElement("a");
    ligilo.download = dosierNomo;
    ligilo.href = url;
    ligilo.click();
    URL.revokeObjectURL(url);
}

/**
 * Parse an uploaded JSON save or schematic into a normalized block list.
 *     text ( string ) - file contents.
 * Returns parsed blocks.
 */
export function analiziJSONBlokojn(teksto: string): AnalizitaSchematikaBloko[] {
    const analizita = JSON.parse(teksto);
    const listo = Array.isArray(analizita) ? analizita : (analizita.blocks ?? []);
    if (!Array.isArray(listo)) throw new Error("No blocks array found");

    const blokoj: AnalizitaSchematikaBloko[] = [];
    listo.forEach((sb: any) => {
        const blokaIdAuNomo = sb.blockId ?? sb.id ?? sb.name;
        let x: number, y: number, z: number;
        if (sb.position) {
            x = mondoAlKrado(Number(sb.position.x ?? 0));
            y = mondoAlKrado(Number(sb.position.y ?? 0));
            z = mondoAlKrado(Number(sb.position.z ?? 0));
        } else {
            x = Number(sb.x ?? 0);
            y = Number(sb.y ?? 0);
            z = Number(sb.z ?? 0);
        }
        const koloro = sb.color || "#888888";
        const formo = sb.shape || "cube";
        const rotacio = Number(sb.rotation ?? 0);
        blokoj.push({ x, y, z, name: blokaIdAuNomo, color: koloro, formo, rotation: rotacio });
    });
    return blokoj;
}
