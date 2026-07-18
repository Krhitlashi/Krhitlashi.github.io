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
 * Map a Minecraft legacy numeric block id to the shape it should render with.
 * Blocks without a special shape fall back to the cube.
 *     id ( number ) - minecraft numeric block id.
 * Returns ShapeId.
 */
export function shapeForBlockId(id: number): ShapeId {
    if (id >= 44 && id <= 57 && (id - 44) % 2 === 0) return "slab";
    if (id >= 125 && id <= 127) return "slab";
    if (id === 181) return "slab";
    if (id >= 203 && id <= 205) return "slab";
    if (id === 53 || (id >= 134 && id <= 136 && (id - 134) % 2 === 0)) return "wedge";
    if (id === 67) return "wedge";
    if (id >= 108 && id <= 109) return "wedge";
    if (id === 114) return "wedge";
    if (id >= 126 && id <= 128) return "wedge";
    if (id === 156) return "wedge";
    if (id === 180) return "wedge";
    if (id === 204) return "wedge";
    if (id === 155 || id === 202 || id === 203) return "pillar";
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
