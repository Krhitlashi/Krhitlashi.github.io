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
export interface ParsedSchematicBlock {
    x: number;
    y: number;
    z: number;
    name: string | number;
    color: string;
    shape?: string;
    rotation?: number;
}

/**
 * NBT reader for binary schematic / mcstructure files.
 */
class NBTReader {
    private view: DataView;
    private offset: number;
    private isLittleEndian: boolean;

    constructor(arrayBuffer: ArrayBuffer, isLittleEndian: boolean = false) {
        this.view = new DataView(arrayBuffer);
        this.offset = 0;
        this.isLittleEndian = isLittleEndian;
    }

    readByte(): number {
        const val = this.view.getInt8(this.offset);
        this.offset += 1;
        return val;
    }

    readShort(): number {
        const val = this.view.getInt16(this.offset, this.isLittleEndian);
        this.offset += 2;
        return val;
    }

    readUShort(): number {
        const val = this.view.getUint16(this.offset, this.isLittleEndian);
        this.offset += 2;
        return val;
    }

    readInt(): number {
        const val = this.view.getInt32(this.offset, this.isLittleEndian);
        this.offset += 4;
        return val;
    }

    readFloat(): number {
        const val = this.view.getFloat32(this.offset, this.isLittleEndian);
        this.offset += 4;
        return val;
    }

    readDouble(): number {
        const val = this.view.getFloat64(this.offset, this.isLittleEndian);
        this.offset += 8;
        return val;
    }

    readString(): string {
        const length = this.readUShort();
        const bytes = new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, length);
        this.offset += length;
        return new TextDecoder().decode(bytes);
    }

    readTag(typeId: number): any {
        switch (typeId) {
            case 0: return null;
            case 1: return this.readByte();
            case 2: return this.readShort();
            case 3: return this.readInt();
            case 4: {
                const val = this.view.getBigInt64(this.offset, this.isLittleEndian);
                this.offset += 8;
                return val;
            }
            case 5: return this.readFloat();
            case 6: return this.readDouble();
            case 7: {
                const length = this.readInt();
                const bytes = new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, length);
                this.offset += length;
                return bytes;
            }
            case 8: return this.readString();
            case 9: {
                const elementType = this.readByte();
                const length = this.readInt();
                const list = [];
                for (let i = 0; i < length; i++) {
                    list.push(this.readTag(elementType));
                }
                return list;
            }
            case 10: {
                const compound: Record<string, any> = {};
                while (true) {
                    const tagType = this.readByte();
                    if (tagType === 0) break;
                    const tagName = this.readString();
                    const tagValue = this.readTag(tagType);
                    compound[tagName] = tagValue;
                }
                return compound;
            }
            case 11: {
                const length = this.readInt();
                const array = [];
                for (let i = 0; i < length; i++) {
                    array.push(this.readInt());
                }
                return array;
            }
            case 12: {
                const length = this.readInt();
                const array = [];
                for (let i = 0; i < length; i++) {
                    const val = this.view.getBigInt64(this.offset, this.isLittleEndian);
                    this.offset += 8;
                    array.push(val);
                }
                return array;
            }
            default:
                throw new Error(`Unknown NBT tag type. ${typeId}`);
        }
    }

    parse(): { name: string; value: any } {
        const rootType = this.readByte();
        if (rootType !== 10) {
            throw new Error(`Expected root tag of TAG_Compound ( 10 ), got ${rootType}`);
        }
        const name = this.readString();
        const value = this.readTag(10);
        return { name, value };
    }
}

function decodeVarIntArray(byteArray: Uint8Array | number[]): number[] {
    const result: number[] = [];
    let index = 0;
    while (index < byteArray.length) {
        let value = 0;
        let shift = 0;
        let b;
        do {
            b = byteArray[index++];
            value |= (b & 0o177) << shift;
            shift += 7;
        } while (b & 0o200);
        result.push(value);
    }
    return result;
}

async function decompressGzip(arrayBuffer: ArrayBuffer): Promise<ArrayBuffer> {
    const DecompressionStreamClass = (window as any).DecompressionStream;
    if (!DecompressionStreamClass) {
        throw new Error("DecompressionStream is not supported in this browser.");
    }
    const ds = new DecompressionStreamClass("gzip");
    const response = new Response(arrayBuffer);
    if (!response.body) {
        throw new Error("Response body is null");
    }
    const stream = response.body.pipeThrough(ds);
    return await new Response(stream).arrayBuffer();
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
function readNumericField(obj: any, keys: readonly string[], fallback: number): number {
    if (!obj) return fallback;
    for (const key of keys) {
        const v = obj[key];
        if (v !== undefined && v !== null) return Number(v);
    }
    return fallback;
}

/**
 * Resolve the Bedrock block palette from a structure tag, checking the common
 * locations ( block_palette, palette.default, palettes.default ).
 *     structure ( any ) - structure compound from the NBT root.
 * Returns palette array or null.
 */
function resolveMcstructurePalette(structure: any): any[] | null {
    const fromDefault = (container: any): any[] | null => {
        const def = container?.default ?? container?.Default;
        return def ? (def.block_palette ?? def.blockPalette ?? null) : null;
    };

    return structure.block_palette
        ?? structure.blockPalette
        ?? fromDefault(structure.palette ?? structure.Palette)
        ?? fromDefault(structure.palettes ?? structure.Palettes)
        ?? null;
}

/**
 * Parse a binary NBT schematic ( .schem ) or mcstructure ( .mcstructure ) file
 * into a flat list of grid blocks.
 *     arrayBuffer ( ArrayBuffer ) - raw file bytes.
 *     isMcstructure ( boolean ) - whether the file is a Bedrock .mcstructure.
 * Returns parsed blocks.
 */
export async function parseSchematicOrStructure(arrayBuffer: ArrayBuffer, isMcstructure: boolean): Promise<ParsedSchematicBlock[]> {
    let decompressed = arrayBuffer;
    const uint8 = new Uint8Array(arrayBuffer);
    if (uint8[0] === 0o37 && uint8[1] === 0o213) {
        decompressed = await decompressGzip(arrayBuffer);
    }

    const reader = new NBTReader(decompressed, isMcstructure);
    const root = reader.parse();
    const data = root.value;

    const blocks: ParsedSchematicBlock[] = [];

    if (isMcstructure) {
        const size = data.size || data.Size;
        if (!size || size.length < 3) throw new Error("Invalid structure size");
        const width = Number(size[0]);
        const height = Number(size[1]);
        const length = Number(size[2]);

        const structure = data.structure || data.Structure;
        if (!structure) throw new Error("No structure tag found");

        const blockIndicesList = structure.block_indices || structure.blockIndices;
        if (!blockIndicesList || blockIndicesList.length === 0) throw new Error("No block_indices found");
        const blockIndices = blockIndicesList[0];

        const blockPalette = resolveMcstructurePalette(structure);
        if (!blockPalette) throw new Error("No block_palette found");

        const reversePalette = blockPalette.map((entry: any) => entry.name || entry.Name || "minecraft:air");

        for (let i = 0; i < blockIndices.length; i++) {
            const paletteIndex = blockIndices[i];
            if (paletteIndex === -1) continue;

            const blockName = reversePalette[paletteIndex];
            if (!blockName || blockName === "minecraft:air" || blockName === "minecraft:structure_void") continue;

            const x = Math.floor(i / (length * height));
            const y = Math.floor((i / length) % height);
            const z = i % length;

            blocks.push({ x, y, z, name: blockName, color: "#888888", shape: "cube", rotation: 0 });
        }
    } else {
        const width = readNumericField(data, [ "Width", "width" ], 0);
        const height = readNumericField(data, [ "Height", "height" ], 0);
        const length = readNumericField(data, [ "Length", "length" ], 0);

        if (!width || !height || !length) throw new Error("Invalid schematic dimensions");

        const paletteObj = data.Palette || data.palette;
        if (!paletteObj) throw new Error("No Palette found");        const reversePalette: string[] = [];
        for (const [key, val] of Object.entries(paletteObj)) {
            reversePalette[Number(val)] = key;
        }

        const blockDataBytes = data.BlockData || data.block_data || data.blockdata;
        if (!blockDataBytes) throw new Error("No BlockData found");

        const blockIndices = decodeVarIntArray(blockDataBytes);

        for (let i = 0; i < blockIndices.length; i++) {
            const paletteIndex = blockIndices[i];
            const blockName = reversePalette[paletteIndex];
            if (!blockName || blockName === "minecraft:air" || blockName.startsWith("minecraft:air[")) continue;

            const y = Math.floor(i / (width * length));
            const z = Math.floor((i % (width * length)) / width);
            const x = i % width;

            blocks.push({ x, y, z, name: blockName, color: "#888888", shape: "cube", rotation: 0 });
        }
    }

    return blocks;
}

/**
 * Convert a grid ( integer-cell ) coordinate to the world-space center used
 * by the builder ( cell offset by half a unit ).
 *     value ( number ) - grid coordinate.
 * Returns world coordinate.
 */
export function gridToWorld(value: number): number {
    return value + ( 1 / 2 );
}

/**
 * Convert a world-space coordinate back to its grid ( integer-cell ) index,
 * rounding to the nearest cell.
 *     value ( number ) - world coordinate.
 * Returns grid coordinate.
 */
export function worldToGrid(value: number): number {
    return Math.round(value - ( 1 / 2 ));
}

/**
 * The 8-vertex offset pattern for an axis-aligned unit cube anchored at the
 * block's lower-left-back corner ( 0,0,0 ). Each triple is a face triangle in
 * OBJ index space ( 0..7, lifted to 1..N at write time by `vertexOffset` ).
 *
 * Two triangles per face x six faces = twelve triangles for a closed cube.
 */
const CUBE_FACE_TRIS: ReadonlyArray<readonly [ number, number, number ]> = [
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
const CUBE_VERTEX_LOCAL_OFFSETS: ReadonlyArray<readonly [ number, number, number ]> = [
    [ 0, 0, 0 ], [ 1, 0, 0 ], [ 1, 1, 0 ], [ 0, 1, 0 ],
    [ 0, 0, 1 ], [ 1, 0, 1 ], [ 1, 1, 1 ], [ 0, 1, 1 ]
];

/**
 * Build the OBJ text body for a list of blocks, returning the OBJ string and
 * the MTL material string.
 *     blocks ( Array ) - blocks with position and color.
 * Returns object with obj and mtl strings.
 */
export function buildOBJ(blocks: Array<{ position: THREE.Vector3Like; color: string }>): { obj: string; mtl: string } {
    let obj = "# ſןᴜȝ j͑ʃп́ɔ ſ̀ȷᴜȝ\n";
    let mat = "# ſןᴜȝ j͑ʃп́ɔ ֭ſɭᴜ ʃᴜ\n";
    const materials = new Map<string, number>();
    let matIndex = 0;
    let vertexOffset = 1;

    for (const block of blocks) {
        const color = block.color;

        if (!materials.has(color)) {
            materials.set(color, matIndex++);
            const r = parseInt(color.slice(1, 3), 0o20) / 255;
            const g = parseInt(color.slice(3, 5), 0o20) / 255;
            const b = parseInt(color.slice(5, 7), 0o20) / 255;
            mat += `newmtl mat_${materials.get(color)}\n`;
            mat += `Kd ${r} ${g} ${b}\n`;
        }

        const x = worldToGrid(block.position.x);
        const y = worldToGrid(block.position.y);
        const z = worldToGrid(block.position.z);

        for (const [ox, oy, oz] of CUBE_VERTEX_LOCAL_OFFSETS) {
            obj += `v ${x + ox} ${y + oy} ${z + oz}\n`;
        }

        obj += `usemtl mat_${materials.get(color)}\n`;
        for (const [a, b, c] of CUBE_FACE_TRIS) {
            obj += `f ${vertexOffset + a} ${vertexOffset + b} ${vertexOffset + c}\n`;
        }

        vertexOffset += 0o10;
    }

    return { obj, mtl: mat };
}

/**
 * Trigger a browser download for a text blob.
 *     filename ( string ) - download name.
 *     content ( string ) - file contents.
 *     mime ( string ) - mime type.
 */
export function downloadText(filename: string, content: string, mime: string): void {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

/**
 * Parse an uploaded JSON save or schematic into a normalized block list.
 *     text ( string ) - file contents.
 * Returns parsed blocks.
 */
export function parseJSONBlocks(text: string): ParsedSchematicBlock[] {
    const parsed = JSON.parse(text);
    const list = Array.isArray(parsed) ? parsed : (parsed.blocks ?? []);
    if (!Array.isArray(list)) throw new Error("No blocks array found");

    const blocks: ParsedSchematicBlock[] = [];
    list.forEach((sb: any) => {
        const blockIdOrName = sb.blockId ?? sb.id ?? sb.name;
        let x: number, y: number, z: number;
        if (sb.position) {
            x = worldToGrid(Number(sb.position.x ?? 0));
            y = worldToGrid(Number(sb.position.y ?? 0));
            z = worldToGrid(Number(sb.position.z ?? 0));
        } else {
            x = Number(sb.x ?? 0);
            y = Number(sb.y ?? 0);
            z = Number(sb.z ?? 0);
        }
        const color = sb.color || "#888888";
        const shape = sb.shape || "cube";
        const rotation = Number(sb.rotation ?? 0);
        blocks.push({ x, y, z, name: blockIdOrName, color, shape, rotation });
    });
    return blocks;
}
