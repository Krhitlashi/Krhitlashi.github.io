/**
 * Minecraft block definitions for the 3D block builder.
 *
 * Each block uses Minecraft's legacy numeric block id (pre-1.13), which is
 * still used by schematic formats (e.g. MCEdit / .schematic).
 */

/**
 * Minecraft block definition
 *     id ( number ) - legacy Minecraft numeric block id (pre-1.13)
 *     name ( string ) - Minecraft block name
 *     color ( string ) - representative hex color
 */
export interface MinecraftBlock {
    id: number;
    name: string;
    color: string;
}

/**
 * The 16 Minecraft dye colors in their canonical order ( white ... black ).
 * Used for the Wool / Concrete / Stained Glass / Glazed Terracotta families.
 *     [ 0 ] ( string ) - dye display name.
 *     [ 1 ] ( string ) - representative hex color.
 */
const DYE_COLORS: ReadonlyArray<readonly [ string, string ]> = [
    [ "White", "#e8e8e8" ],
    [ "Orange", "#d89048" ],
    [ "Magenta", "#b848a8" ],
    [ "Light Blue", "#68a8d8" ],
    [ "Yellow", "#d8c848" ],
    [ "Lime", "#88c848" ],
    [ "Pink", "#d888b8" ],
    [ "Gray", "#888888" ],
    [ "Light Gray", "#c0c0c0" ],
    [ "Cyan", "#58c0c0" ],
    [ "Purple", "#8848b8" ],
    [ "Blue", "#4858b8" ],
    [ "Brown", "#884818" ],
    [ "Green", "#488818" ],
    [ "Red", "#b81818" ],
    [ "Black", "#282828" ]
];

/**
 * Build an array of colour-family blocks starting at `startId`, naming each
 * one `"${ dye } ${ family }"` with the canonical hex color.
 *     startId ( number ) - first numeric block id of the family.
 *     family ( string ) - family suffix appended to each dye name.
 * Returns block list in order matching DYE_COLORS.
 * Example. buildDyeFamily( 256, "Wool" ) => [ { id:256,name:"White Wool",...}, ... ].
 */
function buildDyeFamily(startId: number, family: string): MinecraftBlock[] {
    return DYE_COLORS.map(([dye, color], i) => ({
        id: startId + i,
        name: `${dye} ${family}`,
        color
    }));
}

/**
 * Build a block entry from an id and an explicit [ name, color ] pair.
 *     id ( number ) - minecraft numeric block id.
 *     pair ( readonly [ name, color ] ) - human name plus hex.
 * Returns block.
 */
function block(id: number, pair: readonly [ string, string ]): MinecraftBlock {
    return { id, name: pair[0], color: pair[1] };
}

/**
 * Palette of Minecraft blocks with their legacy numeric ids and colors.
 * Colors use the #n0n0n0 or #n8n8n8 format ( n is any 0-f digit ).
 */
export const MINECRAFT_BLOCKS: MinecraftBlock[] = [
    { id: 0, name: "Air", color: "#d0d0d0" },
    { id: 1, name: "Stone", color: "#888888" },
    { id: 2, name: "Grass", color: "#788858" },
    { id: 3, name: "Dirt", color: "#888838" },
    { id: 4, name: "Cobblestone", color: "#888888" },
    { id: 5, name: "Oak Planks", color: "#b88858" },
    { id: 6, name: "Sapling", color: "#588848" },
    { id: 7, name: "Bedrock", color: "#585858" },
    { id: 12, name: "Sand", color: "#d8c898" },
    { id: 13, name: "Gravel", color: "#888880" },
    { id: 14, name: "Gold Ore", color: "#988838" },
    { id: 15, name: "Iron Ore", color: "#a8a8a8" },
    { id: 16, name: "Coal Ore", color: "#383838" },
    { id: 17, name: "Oak Log", color: "#688848" },
    { id: 18, name: "Leaves", color: "#388838" },
    { id: 19, name: "Sponge", color: "#d8d898" },
    { id: 20, name: "Glass", color: "#a8d8e8" },
    { id: 21, name: "Lapis Ore", color: "#280480" },
    { id: 22, name: "Lapis Block", color: "#280880" },
    { id: 24, name: "Sandstone", color: "#d8c898" },
    { id: 35, name: "Wool", color: "#e8e8e8" },
    { id: 36, name: "Piston Extension", color: "#808088" },
    { id: 41, name: "Gold Block", color: "#f8d848" },
    { id: 42, name: "Iron Block", color: "#e8e8e8" },
    { id: 43, name: "Slab", color: "#988888" },
    { id: 45, name: "Brick", color: "#988838" },
    { id: 46, name: "TNT", color: "#983828" },
    { id: 47, name: "Bookshelf", color: "#888858" },
    { id: 48, name: "Mossy Cobble", color: "#688858" },
    { id: 49, name: "Obsidian", color: "#180828" },
    { id: 50, name: "Torch", color: "#f8d888" },
    { id: 53, name: "Oak Stairs", color: "#b88858" },
    { id: 56, name: "Diamond Ore", color: "#688d88" },
    { id: 57, name: "Diamond Block", color: "#58f8f8" },
    { id: 58, name: "Crafting Table", color: "#988858" },
    { id: 60, name: "Farmland", color: "#888838" },
    { id: 73, name: "Redstone Ore", color: "#880828" },
    { id: 79, name: "Ice", color: "#a8e8f8" },
    { id: 80, name: "Snow", color: "#f8f8f8" },
    { id: 82, name: "Clay", color: "#988888" },
    { id: 84, name: "Netherrack", color: "#680828" },
    { id: 86, name: "Pumpkin", color: "#e08818" },
    { id: 87, name: "Soul Sand", color: "#584838" },
    { id: 88, name: "Soul Sand", color: "#584838" },
    { id: 89, name: "Glowstone", color: "#f8e888" },
    { id: 98, name: "Stone Bricks", color: "#808080" },
    { id: 103, name: "Melon", color: "#588838" },
    { id: 110, name: "Mycelium", color: "#688880" },
    { id: 121, name: "End Stone", color: "#d8d8b8" },
    { id: 129, name: "Emerald Block", color: "#288880" },
    { id: 155, name: "Quartz Block", color: "#e8e8d8" },
    { id: 159, name: "Stained Clay", color: "#988838" },
    { id: 168, name: "Prismarine", color: "#608880" },
    { id: 173, name: "Coal Block", color: "#180818" },
    { id: 179, name: "Red Sandstone", color: "#c88858" },
    { id: 30, name: "Cobweb", color: "#e8e8e8" },
    { id: 81, name: "Cactus", color: "#588848" },
    { id: 112, name: "Nether Brick", color: "#280828" },
    { id: 123, name: "Redstone Lamp", color: "#808858" },
    { id: 152, name: "Redstone Block", color: "#f80808" },
    { id: 165, name: "Slime Block", color: "#788c88" },
    { id: 169, name: "Sea Lantern", color: "#b0d8d8" },
    { id: 170, name: "Hay Block", color: "#a88828" },
    { id: 172, name: "Hardened Clay", color: "#988858" },
    { id: 174, name: "Packed Ice", color: "#8888f8" },
    { id: 201, name: "Purpur Block", color: "#c888c8" },
    { id: 202, name: "Purpur Pillar", color: "#c888c8" },
    { id: 206, name: "End Stone Bricks", color: "#e8e8b8" },
    { id: 207, name: "Beetroots", color: "#880828" },
    { id: 213, name: "Magma Block", color: "#a83818" },
    { id: 214, name: "Nether Wart Block", color: "#880828" },
    { id: 216, name: "Bone Block", color: "#e8d8c8" },
    { id: 241, name: "Blue Ice", color: "#6888f8" },
    { id: 8, name: "Water", color: "#2080f8" },
    { id: 9, name: "Lava", color: "#f83808" },
    { id: 10, name: "Lava ( Stationary )", color: "#f83808" },
    { id: 11, name: "Water ( Stationary )", color: "#2080f8" },
    { id: 23, name: "Dispenser", color: "#808080" },
    { id: 25, name: "Note Block", color: "#a88858" },
    { id: 26, name: "Bed", color: "#a83858" },
    { id: 27, name: "Powered Rail", color: "#a88858" },
    { id: 28, name: "Detector Rail", color: "#a88858" },
    { id: 29, name: "Sticky Piston", color: "#808088" },
    { id: 31, name: "Dead Bush", color: "#888858" },
    { id: 32, name: "Dead Bush", color: "#888858" },
    { id: 33, name: "Piston", color: "#808088" },
    { id: 34, name: "Piston Head", color: "#808088" },
    { id: 37, name: "Dandelion", color: "#f8d848" },
    { id: 38, name: "Poppy", color: "#c81818" },
    { id: 39, name: "Brown Mushroom", color: "#a85828" },
    { id: 40, name: "Red Mushroom", color: "#a81818" },
    { id: 44, name: "Slab", color: "#988888" },
    { id: 51, name: "Fire", color: "#f86008" },
    { id: 52, name: "Monster Spawner", color: "#888888" },
    { id: 54, name: "Chest", color: "#a87848" },
    { id: 55, name: "Redstone Wire", color: "#a81818" },
    { id: 59, name: "Wheat", color: "#c8c848" },
    { id: 61, name: "Furnace", color: "#888888" },
    { id: 62, name: "Burning Furnace", color: "#888888" },
    { id: 63, name: "Standing Sign", color: "#a87848" },
    { id: 64, name: "Oak Door", color: "#a87848" },
    { id: 65, name: "Ladder", color: "#a87848" },
    { id: 66, name: "Rail", color: "#888888" },
    { id: 67, name: "Cobblestone Stairs", color: "#888888" },
    { id: 68, name: "Wall Sign", color: "#a87848" },
    { id: 69, name: "Lever", color: "#888888" },
    { id: 70, name: "Stone Pressure Plate", color: "#888888" },
    { id: 71, name: "Iron Door", color: "#e8e8e8" },
    { id: 72, name: "Wooden Pressure Plate", color: "#a87848" },
    { id: 74, name: "Redstone Ore ( Lit )", color: "#880828" },
    { id: 75, name: "Redstone Torch", color: "#f8d888" },
    { id: 76, name: "Redstone Torch ( Lit )", color: "#a81818" },
    { id: 77, name: "Stone Button", color: "#888888" },
    { id: 78, name: "Snow Layer", color: "#f8f8f8" },
    { id: 83, name: "Sugar Cane", color: "#588848" },
    { id: 85, name: "Fence", color: "#a87848" },
    { id: 90, name: "Nether Portal", color: "#8808a8" },
    { id: 91, name: "Jack O Lantern", color: "#e08818" },
    { id: 92, name: "Cake", color: "#e8d8c8" },
    { id: 93, name: "Repeater", color: "#a81818" },
    { id: 94, name: "Repeater ( Lit )", color: "#a81818" },
    { id: 95, name: "Stained Glass", color: "#a8d8e8" },
    { id: 96, name: "Trapdoor", color: "#a87848" },
    { id: 97, name: "Monster Egg", color: "#888888" },
    { id: 99, name: "Brown Mushroom Block", color: "#a85828" },
    { id: 100, name: "Red Mushroom Block", color: "#a81818" },
    { id: 101, name: "Iron Bars", color: "#e8e8e8" },
    { id: 102, name: "Glass Pane", color: "#a8d8e8" },
    { id: 104, name: "Pumpkin Stem", color: "#588848" },
    { id: 105, name: "Melon Stem", color: "#588848" },
    { id: 106, name: "Vines", color: "#388838" },
    { id: 107, name: "Fence Gate", color: "#a87848" },
    { id: 108, name: "Brick Stairs", color: "#988838" },
    { id: 109, name: "Stone Brick Stairs", color: "#808080" },
    { id: 111, name: "Lily Pad", color: "#288838" },
    { id: 113, name: "Nether Brick Fence", color: "#280828" },
    { id: 114, name: "Nether Brick Stairs", color: "#280828" },
    { id: 115, name: "Nether Wart", color: "#880828" },
    { id: 116, name: "Enchantment Table", color: "#280858" },
    { id: 117, name: "Brewing Stand", color: "#808080" },
    { id: 118, name: "Cauldron", color: "#888888" },
    { id: 119, name: "End Portal", color: "#8808a8" },
    { id: 120, name: "End Portal Frame", color: "#280858" },
    { id: 122, name: "Dark Prismarine", color: "#208878" },
    { id: 124, name: "Redstone Lamp ( Lit )", color: "#f8e888" },
    { id: 125, name: "Wooden Slab", color: "#b88858" },
    { id: 126, name: "Acacia Stairs", color: "#b88858" },
    { id: 127, name: "Cocoa", color: "#588838" },
    { id: 128, name: "Sandstone Stairs", color: "#d8c898" },
    { id: 130, name: "Ender Chest", color: "#280858" },
    { id: 131, name: "Tripwire Hook", color: "#a87848" },
    { id: 132, name: "Tripwire", color: "#e8e8e8" },
    { id: 133, name: "Emerald Ore", color: "#288880" },
    { id: 134, name: "Spruce Stairs", color: "#788848" },
    { id: 135, name: "Birch Stairs", color: "#d8c898" },
    { id: 136, name: "Jungle Stairs", color: "#688848" },
    { id: 137, name: "Command Block", color: "#280858" },
    { id: 138, name: "Beacon", color: "#58f8f8" },
    { id: 139, name: "Cobblestone Wall", color: "#888888" },
    { id: 140, name: "Flower Pot", color: "#a87848" },
    { id: 141, name: "Carrots", color: "#c8c848" },
    { id: 142, name: "Potatoes", color: "#c8c848" },
    { id: 143, name: "Wooden Button", color: "#a87848" },
    { id: 144, name: "Skull", color: "#e8e8e8" },
    { id: 145, name: "Anvil", color: "#588888" },
    { id: 146, name: "Trapped Chest", color: "#a87848" },
    { id: 147, name: "Weighted Pressure Plate ( Light )", color: "#e8e8e8" },
    { id: 148, name: "Weighted Pressure Plate ( Heavy )", color: "#e8e8e8" },
    { id: 149, name: "Comparator", color: "#a81818" },
    { id: 150, name: "Comparator ( Lit )", color: "#a81818" },
    { id: 151, name: "Daylight Sensor", color: "#808080" },
    { id: 153, name: "Quartz Ore", color: "#e8e8d8" },
    { id: 154, name: "Hopper", color: "#888888" },
    { id: 156, name: "Quartz Stairs", color: "#e8e8d8" },
    { id: 157, name: "Activator Rail", color: "#a88858" },
    { id: 158, name: "Dropper", color: "#808080" },
    { id: 160, name: "Iron Trapdoor", color: "#e8e8e8" },
    { id: 161, name: "Leaves ( Acacia )", color: "#388838" },
    { id: 162, name: "Acacia Log", color: "#688848" },
    { id: 163, name: "Acacia Planks", color: "#b88858" },
    { id: 164, name: "Acacia Sapling", color: "#588848" },
    { id: 166, name: "Barrier", color: "#a8a8a8" },
    { id: 167, name: "Iron Trapdoor", color: "#e8e8e8" },
    { id: 171, name: "Hay Block", color: "#a88828" },
    { id: 175, name: "Sunflower", color: "#f8d848" },
    { id: 176, name: "Wall Banner", color: "#f8f8f8" },
    { id: 177, name: "Standing Banner", color: "#f8f8f8" },
    { id: 178, name: "Inverted Daylight Sensor", color: "#808080" },
    { id: 180, name: "Red Sandstone Stairs", color: "#c88858" },
    { id: 181, name: "Red Sandstone Slab", color: "#c88858" },
    { id: 182, name: "Spruce Fence Gate", color: "#788848" },
    { id: 183, name: "Birch Fence Gate", color: "#d8c898" },
    { id: 184, name: "Jungle Fence Gate", color: "#688848" },
    { id: 185, name: "Dark Oak Fence Gate", color: "#588838" },
    { id: 186, name: "Acacia Fence Gate", color: "#b88858" },
    { id: 187, name: "Spruce Fence", color: "#788848" },
    { id: 188, name: "Birch Fence", color: "#d8c898" },
    { id: 189, name: "Jungle Fence", color: "#688848" },
    { id: 190, name: "Dark Oak Fence", color: "#588838" },
    { id: 191, name: "Acacia Fence", color: "#b88858" },
    { id: 192, name: "Spruce Door", color: "#788848" },
    { id: 193, name: "Birch Door", color: "#d8c898" },
    { id: 194, name: "Jungle Door", color: "#688848" },
    { id: 195, name: "Acacia Door", color: "#b88858" },
    { id: 196, name: "Dark Oak Door", color: "#588838" },
    { id: 197, name: "End Rod", color: "#f8f8f8" },
    { id: 198, name: "Chorus Plant", color: "#a088b8" },
    { id: 199, name: "Chorus Flower", color: "#a088b8" },
    { id: 200, name: "Chorus Flower", color: "#a088b8" },
    { id: 203, name: "Purpur Slab", color: "#c888c8" },
    { id: 204, name: "Purpur Stairs", color: "#c888c8" },
    { id: 205, name: "Purpur Double Slab", color: "#c888c8" },
    { id: 208, name: "Beetroot", color: "#880828" },
    { id: 209, name: "Grass Path", color: "#788858" },
    { id: 210, name: "End Gateway", color: "#8808a8" },
    { id: 211, name: "Repeating Command Block", color: "#280858" },
    { id: 212, name: "Chain Command Block", color: "#280858" },
    { id: 215, name: "Structure Void", color: "#888888" },
    { id: 217, name: "Shulker Box", color: "#a888c8" },

    // ── Glazed Terracotta ( IDs 218..233 — full 16-color palette ) ──
    ...buildDyeFamily( 218, "Glazed Terracotta" ),

    { id: 234, name: "Concrete", color: "#c8c8c8" },
    { id: 235, name: "Concrete Powder", color: "#c8c8c8" },
    { id: 236, name: "Structure Block", color: "#888888" },
    { id: 237, name: "Structure Block ( Corner )", color: "#888888" },
    { id: 238, name: "Structure Block ( Data )", color: "#888888" },
    { id: 239, name: "Structure Block ( Load )", color: "#888888" },
    { id: 240, name: "Structure Block ( Save )", color: "#888888" },

    // ── Concrete ( IDs 242..255 — only the 14-entry subset used by the
    //    legacy palette: Black, White, Orange, Magenta, Light Blue, Yellow,
    //    Lime, Pink, Gray, Silver, Cyan, Purple, Blue, Brown ) ──
    block( 242, [ "Black Concrete", "#282828" ] ),
    block( 243, [ "White Concrete", "#e8e8e8" ] ),
    block( 244, [ "Orange Concrete", "#d89048" ] ),
    block( 245, [ "Magenta Concrete", "#b848a8" ] ),
    block( 246, [ "Light Blue Concrete", "#68a8d8" ] ),
    block( 247, [ "Yellow Concrete", "#d8c848" ] ),
    block( 248, [ "Lime Concrete", "#88c848" ] ),
    block( 249, [ "Pink Concrete", "#d888b8" ] ),
    block( 250, [ "Gray Concrete", "#888888" ] ),
    block( 251, [ "Silver Concrete", "#c0c0c0" ] ),
    block( 252, [ "Cyan Concrete", "#58c0c0" ] ),
    block( 253, [ "Purple Concrete", "#8848b8" ] ),
    block( 254, [ "Blue Concrete", "#4858b8" ] ),
    block( 255, [ "Brown Concrete", "#884818" ] ),

    // ── Wool Colors ( IDs 256..271 — full 16-color palette ) ──
    ...buildDyeFamily( 256, "Wool" ),

    // ── Wood Planks ( IDs 272..276 — by wood type, not dye ) ──
    block( 272, [ "Spruce Planks", "#788848" ] ),
    block( 273, [ "Birch Planks", "#d8c898" ] ),
    block( 274, [ "Jungle Planks", "#688848" ] ),
    block( 275, [ "Acacia Planks", "#b88858" ] ),
    block( 276, [ "Dark Oak Planks", "#588838" ] ),

    // ── Logs ( IDs 277..281 ) ──
    block( 277, [ "Spruce Log", "#483828" ] ),
    block( 278, [ "Birch Log", "#d8d8c8" ] ),
    block( 279, [ "Jungle Log", "#688848" ] ),
    block( 280, [ "Acacia Log", "#585858" ] ),
    block( 281, [ "Dark Oak Log", "#483818" ] ),

    // ── Stained Glass Colors ( IDs 282..297 — full 16-color palette ) ──
    ...buildDyeFamily( 282, "Stained Glass" ),

    // ── Saplings ( IDs 298..301 ) ──
    block( 298, [ "Spruce Sapling", "#488848" ] ),
    block( 299, [ "Birch Sapling", "#588848" ] ),
    block( 300, [ "Jungle Sapling", "#388848" ] ),
    block( 301, [ "Acacia Sapling", "#588848" ] ),

    // ── Leaves ( IDs 302..304 ) ──
    block( 302, [ "Spruce Leaves", "#287828" ] ),
    block( 303, [ "Birch Leaves", "#489848" ] ),
    block( 304, [ "Jungle Leaves", "#388838" ] )
];
