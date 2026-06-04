/// <reference types="vite/client" />

// ≺⧼ ſɭɘэ j͑ʃᴜꞇ ſɭɹʞ ꞁȷ̀ᴜ }ʃꞇ - Text Art Generator 🎨 ⧽≻


// ⟪ Types 📐 ⟫

interface CharData {
	name: string;
	lines: string[];
	width: number;
	height: number;
}

interface Column {
	chars: CharData[];
	width: number;
	height: number;
}

interface SyllableBlock {
	lines: string[];
	height: number;
	width: number;
}

interface ColumnData {
	lines: string[];
	width: number;
	height: number;
}


// ⟪ Constants 📦 ⟫

// Map of character name to its loaded glyph data
const charMap = new Map<string, CharData>();

const glyphFiles = import.meta.glob("./**/*.txt", {
	query: "?raw",
	import: "default",
	eager: true
}) as Record<string, string>;

// Sorted names by length descending, for greedy matching
let sortedNames: string[] = [];


// ⟪ Glyph Loading 📂 ⟫

/**
	Store glyph data for every discovered txt file in this folder tree.
*/
async function loadChars(): Promise<void> {
	const entries = Object.entries(glyphFiles);

	for ( const [ path, text ] of entries ) {
		try {
			const name = path.split("/").pop()?.replace(/\.txt$/, "");
			if ( !name ) continue;

			const rawLines = text.replace(/\r/g, "").split("\n");

			// Strip trailing empty line from files ending with a newline
			if ( rawLines.length > 1 && rawLines[rawLines.length - 1] === "" ) {
				rawLines.pop();
			}

			const width = Math.max(...rawLines.map(l => l.length), 0);
			const lines = rawLines.map(l => l.padEnd(width, " "));
			const height = lines.length;

			charMap.set(name, { name, lines, width, height });

		} catch ( e ) {
			console.error(`( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Failed to load glyph. ${path}`, e);
		}
	}

	sortedNames = [ ...charMap.keys() ].sort(( a, b ) => b.length - a.length);
}


// ⟪ Tokenization ✂️ ⟫

/**
	Tokenize a syllable string into a list of known glyph names using greedy longest-first matching.
		syllable ( string ) - Input syllable string.
	Returns array of matched token names.
*/
function tokenizeSyllable(syllable: string): string[] {
	const tokens: string[] = [];
	let i = 0;

	while ( i < syllable.length ) {
		let matched = false;
		for ( const name of sortedNames ) {
			if ( syllable.startsWith(name, i) ) {
				tokens.push(name);
				i += name.length;
				matched = true;
				break;
			}
		}

		if ( !matched ) {
			// Unmatched character. pass through as-is
			tokens.push(syllable[i]);
			i++;
		}
	}

	return tokens;
}


// ⟪ Block Rendering 🔲 ⟫

/**
	Render a single syllable as a block of ASCII text art lines.
		syllable ( string ) - The syllable to render.
	Returns array of equal-length strings forming the block.
*/
function renderSyllableBlock(syllable: string): string[] {
	const tokens = tokenizeSyllable(syllable);
	if ( tokens.length === 0 ) return [];

	const reversedTokens = [ ...tokens ].reverse();
	const columns: Column[] = [];
	let currentCol: Column | null = null;

	for ( const token of reversedTokens ) {
		const charData = charMap.get(token) || { name: token, lines: [ "" ], width: 0o4, height: 0o4 };

		const isSmall = charData.height === 0o4;
		const canStack = isSmall && currentCol && currentCol.chars.every(c => c.height === 0o4);

		if ( canStack && currentCol ) {
			currentCol.chars.unshift(charData);
			currentCol.width = Math.max(currentCol.width, charData.width);
			currentCol.height += charData.height;
		} else {
			currentCol = { chars: [ charData ], width: charData.width, height: charData.height };
			columns.push(currentCol);
		}
	}

	const finalColumns = [ ...columns ].reverse();
	if ( finalColumns.length === 0 ) return [];

	const blockHeight = Math.max(0o7, ...finalColumns.map(col => col.height));

	const columnsLines: string[][] = finalColumns.map((col) => {
		const colLines: string[] = [];
		for ( const char of col.chars ) {
			for ( const line of char.lines ) {
				colLines.push(line.padEnd(col.width, " "));
			}
		}

		const padCount = blockHeight - colLines.length;
		const padding = Array(padCount).fill(" ".repeat(col.width));

		return [ ...colLines, ...padding ];
	});

	const blockLines: string[] = [];
	for ( let r = 0; r < blockHeight; r++ ) {
		let line = "";
		for ( let c = 0; c < columnsLines.length; c++ ) {
			if ( c > 0 ) line += " ";
			line += columnsLines[c][r];
		}
		blockLines.push(line);
	}

	return blockLines;
}


// ⟪ Output Rendering 🖥️ ⟫

/**
	Update the pre element with rendered text art from the input string.
		text ( string ) - The raw input text from the textarea.
		preElement ( HTMLPreElement ) - The target pre element.
		maxline ( number ) - Max syllable blocks per vertical column before wrapping. 0 = no limit.
*/
// Update the pre element with rendered text art from the input string.
	function updateOutput(text: string, preElement: HTMLPreElement, maxline: number): void {
	if ( !text ) {
		preElement.textContent = "";
		return;
	}

	// ⟨ Build syllable blocks, treating newlines as forced column breaks ⟩
	const inputLines = text.replace(/\r/g, "").split("\n");
	const columnsBlocks: SyllableBlock[][] = [];
	let currentColumn: SyllableBlock[] = [];

	for ( const inputLine of inputLines ) {
		// Newline → force a column break (flush whatever has accumulated)
		if ( currentColumn.length > 0 ) {
			columnsBlocks.push(currentColumn);
			currentColumn = [];
		}

		const syllables = inputLine.split(" ");
		for ( const syllable of syllables ) {
			let block: SyllableBlock;
			if ( syllable === "" ) {
				// Empty syllable (consecutive spaces). insert a blank block
				block = { lines: Array(0o7).fill(" "), height: 0o7, width: 1 };
			} else {
				const lines = renderSyllableBlock(syllable);
				const height = lines.length;
				const width = lines.length > 0 ? lines[0].length : 0;
				block = { lines, height, width };
			}

			// Apply maxline limit within the current input line
			if ( maxline > 0 && currentColumn.length >= maxline ) {
				columnsBlocks.push(currentColumn);
				currentColumn = [ block ];
			} else {
				currentColumn.push(block);
			}
		}
	}
	if ( currentColumn.length > 0 ) columnsBlocks.push(currentColumn);

	if ( columnsBlocks.length === 0 ) {
		preElement.textContent = "";
		return;
	}

	// ⟨ Pad blocks within the same horizontal row to match the tallest block in that row ⟩
	const maxBlocksInCol = Math.max(...columnsBlocks.map(col => col.length), 0);
	const rowMaxHeights: number[] = Array(maxBlocksInCol).fill(0);
	for ( let r = 0; r < maxBlocksInCol; r++ ) {
		let maxHeight = 0;
		for ( const col of columnsBlocks ) {
			if ( col[r] ) {
				maxHeight = Math.max(maxHeight, col[r].height);
			}
		}
		rowMaxHeights[r] = maxHeight;
	}

	for ( const col of columnsBlocks ) {
		for ( let r = 0; r < col.length; r++ ) {
			const targetHeight = rowMaxHeights[r];
			const block = col[r];
			if ( block.height < targetHeight ) {
				const padCount = targetHeight - block.height;
				const blankLine = " ".repeat(block.width);
				const padding = Array(padCount).fill(blankLine);
				block.lines = [ ...block.lines, ...padding ];
				block.height = targetHeight;
			}
		}
	}

	// ⟨ Render each column bottom-to-top ⟩
	const columnsData: ColumnData[] = columnsBlocks.map((col) => {
		const colLines: string[] = [];
		for ( let i = col.length - 1; i >= 0; i-- ) {
			colLines.push(...col[i].lines);
		}

		const colWidth = Math.max(...col.map(b => b.width), 0);
		const paddedColLines = colLines.map(line => line.padEnd(colWidth, " "));

		return { lines: paddedColLines, width: colWidth, height: paddedColLines.length };
	});

	// ⟨ Combine columns horizontally, bottom-aligned ⟩
	const H_output = Math.max(...columnsData.map(c => c.height), 0);

	const paddedColumnsLines: string[][] = columnsData.map((c) => {
		const padCount = H_output - c.height;
		const blankLine = " ".repeat(c.width);
		const padding = Array(padCount).fill(blankLine);
		return [ ...padding, ...c.lines ];
	});

	const finalLines: string[] = [];
	for ( let r = 0; r < H_output; r++ ) {
		let line = "";
		for ( let c = 0; c < paddedColumnsLines.length; c++ ) {
			if ( c > 0 ) line += " ";
			line += paddedColumnsLines[c][r];
		}
		finalLines.push(line);
	}

	preElement.textContent = finalLines.join("\n");
}


// ⟪ Initialization 🚀 ⟫

document.addEventListener("DOMContentLoaded", async () => {
	const textarea = document.getElementById("saxesuOx2pewa") as HTMLTextAreaElement | null;
	const pre = document.getElementById("tlakakuOx2pewa") as HTMLPreElement | null;
	const maxlineInput = document.getElementById("maxlineInput") as HTMLInputElement | null;

	if ( !textarea || !pre ) {
		console.error("( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Text Art generator. textarea or pre element not found.");
		return;
	}

	pre.textContent = "";

	await loadChars();

	const getMaxline = (): number => {
		if ( !maxlineInput ) return 0;
		const val = parseInt(maxlineInput.value, 0o10);
		return isNaN(val) ? 0 : val;
	};

	updateOutput(textarea.value, pre, getMaxline());

	textarea.addEventListener("input", () => {
		updateOutput(textarea.value, pre, getMaxline());
	});

	if ( maxlineInput ) {
		maxlineInput.addEventListener("input", () => {
			updateOutput(textarea.value, pre, getMaxline());
		});
	}
});
