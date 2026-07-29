/**
 * ≺⧼ }ʃᴜ ſɭɜ ı],ᴜ ⧽≻
 *
 * Geometry definitions for the block shapes supported by the builder.
 * A shape is anything that fits inside a single 1x1x1 grid cell.
 */

import * as THREE from "three";

/**
 * Identifier for each supported shape.
 */
export type FormoId = "cube" | "slab" | "wedge" | "panel" | "pillar" | "cylinder";

/**
 * Description of a shape.
 *     @param id ( FormoId ) - shape id.
 *     @param name ( string ) - display name.
 */
export interface FormoDifino {
    id: FormoId;
    name: string;
}

/**
 * All supported shapes. The stairs shape is folded into wedge ( a triangular
 * prism ) so Minecraft stairs and the free wedge share one geometry.
 */
export const FORMOJ: FormoDifino[] = [
    { id: "cube", name: "Cube" },
    { id: "slab", name: "Slab" },
    { id: "panel", name: "Panel" },
    { id: "pillar", name: "Pillar" },
    { id: "wedge", name: "Wedge" },
    { id: "cylinder", name: "Cylinder" }
];

/**
 * Block ids whose shape is the half-height "slab".
 * Unions of original numeric ranges: 44,46,48,50,52,54,56 — 125..127 — 181 — 203..205.
 */
const PLATAJ_IDOJ: ReadonlySet<number> = new Set([
    44, 46, 48, 50, 52, 54, 56,
    125, 126, 127,
    181,
    203, 204, 205
]);

/**
 * Block ids whose shape is the triangular-prism "wedge" ( stairs share this ).
 */
const KOJNOJ_IDOJ: ReadonlySet<number> = new Set([
    53, 67,
    108, 109, 114,
    126, 128,
    134, 135, 136,
    156,
    180,
    204
]);

/**
 * Block ids whose shape is the slim "pillar" ( half-width x 1 x half-depth ).
 */
const PILIERAJ_IDOJ: ReadonlySet<number> = new Set([
    155, 202, 203
]);

/**
 * Map a Minecraft legacy numeric block id to the shape it should render with.
 * Blocks without a special shape fall back to the cube.
 *     @param id ( number ) - minecraft numeric block id.
 * @returns FormoId
 */
export function formoPorBlokoId( id: number ): FormoId {
    if ( PLATAJ_IDOJ.has(id) ) return "slab";
    if ( KOJNOJ_IDOJ.has(id) ) return "wedge";
    if ( PILIERAJ_IDOJ.has(id) ) return "pillar";
    return "cube";
}

/**
 * Build a geometry for the given shape, centered at the origin and sized to
 * fill a 1x1x1 cell ( half extents of 0.5 ).
 *     @param formo ( FormoId ) - shape id.
 * @returns BufferGeometry
 */
export function konstruiFormonGeometrion(formo: FormoId): THREE.BufferGeometry {
    switch (formo) {
        case "slab":
            return new THREE.BoxGeometry(1, ( 1 / 2 ), 1).translate(0, -( 1 / 4 ), 0);
        case "panel":
            return new THREE.BoxGeometry(1, 1, ( 1 / 8 )).translate(0, 0, ( 7 / 16 ));
        case "pillar":
            return new THREE.BoxGeometry(( 1 / 2 ), 1, ( 1 / 2 ));
        case "wedge":
            return konstruiKojnonGeometrion();
        case "cylinder":
            return new THREE.CylinderGeometry(( 1 / 2 ), ( 1 / 2 ), 1, 0o30);
        case "cube":
        default:
            return new THREE.BoxGeometry(1, 1, 1);
    }
}

/**
 * Build a triangular prism ( wedge / stairs ) that occupies the lower half on
 * one side and rises to the top on the opposite side.
 * @returns BufferGeometry
 */
function konstruiKojnonGeometrion(): THREE.BufferGeometry {
    const shape = new THREE.Shape();
    shape.moveTo(-0.5, -0.5);
    shape.lineTo(0.5, -0.5);
    shape.lineTo(0.5, 0.5);
    shape.lineTo(-0.5, -0.5);

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 1,
        bevelEnabled: false,
        steps: 1
    });
    geometry.translate(0, 0, -0.5);
    geometry.computeVertexNormals();
    return geometry;
}
