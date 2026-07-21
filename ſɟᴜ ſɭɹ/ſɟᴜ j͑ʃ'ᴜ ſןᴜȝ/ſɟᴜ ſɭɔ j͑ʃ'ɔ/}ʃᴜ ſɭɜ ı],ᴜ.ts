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
export type ShapeId = "cube" | "slab" | "wedge" | "panel" | "pillar";

/**
 * Description of a shape.
 *     id ( ShapeId ) - shape id.
 *     name ( string ) - display name.
 */
export interface ShapeDef {
    id: ShapeId;
    name: string;
}

/**
 * All supported shapes. The stairs shape is folded into wedge ( a triangular
 * prism ) so Minecraft stairs and the free wedge share one geometry.
 */
export const SHAPES: ShapeDef[] = [
    { id: "cube", name: "Cube" },
    { id: "slab", name: "Slab" },
    { id: "panel", name: "Panel" },
    { id: "pillar", name: "Pillar" },
    { id: "wedge", name: "Wedge" }
];

/**
 * Block ids whose shape is the half-height "slab".
 * Unions of original numeric ranges: 44,46,48,50,52,54,56 — 125..127 — 181 — 203..205.
 */
const SLAB_IDS: ReadonlySet<number> = new Set([
    44, 46, 48, 50, 52, 54, 56,
    125, 126, 127,
    181,
    203, 204, 205
]);

/**
 * Block ids whose shape is the triangular-prism "wedge" ( stairs share this ).
 */
const WEDGE_IDS: ReadonlySet<number> = new Set([
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
const PILLAR_IDS: ReadonlySet<number> = new Set([
    155, 202, 203
]);

/**
 * Map a Minecraft legacy numeric block id to the shape it should render with.
 * Blocks without a special shape fall back to the cube.
 *     id ( number ) - minecraft numeric block id.
 * Returns ShapeId.
 */
export function shapeForBlockId( id: number ): ShapeId {
    if ( SLAB_IDS.has(id) ) return "slab";
    if ( WEDGE_IDS.has(id) ) return "wedge";
    if ( PILLAR_IDS.has(id) ) return "pillar";
    return "cube";
}

/**
 * Build a geometry for the given shape, centered at the origin and sized to
 * fill a 1x1x1 cell ( half extents of 0.5 ).
 *     shape ( ShapeId ) - shape id.
 * Returns BufferGeometry.
 */
export function buildShapeGeometry(shape: ShapeId): THREE.BufferGeometry {
    switch (shape) {
        case "slab":
            return new THREE.BoxGeometry(1, 0.5, 1).translate(0, -0.25, 0);
        case "panel":
            return new THREE.BoxGeometry(1, 1, 0.125).translate(0, 0, 0.4375);
        case "pillar":
            return new THREE.BoxGeometry(0.5, 1, 0.5);
        case "wedge":
            return buildWedgeGeometry();
        case "cube":
        default:
            return new THREE.BoxGeometry(1, 1, 1);
    }
}

/**
 * Build a triangular prism ( wedge / stairs ) that occupies the lower half on
 * one side and rises to the top on the opposite side.
 * Returns BufferGeometry.
 */
function buildWedgeGeometry(): THREE.BufferGeometry {
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
