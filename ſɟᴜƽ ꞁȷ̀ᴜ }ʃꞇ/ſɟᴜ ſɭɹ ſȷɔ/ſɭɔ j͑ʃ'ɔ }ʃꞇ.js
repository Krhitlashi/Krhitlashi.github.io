// ≺⧼ Base 8 Calculator - ſɟᴜ ſɭɔ j͑ʃ'ɔ ⧽≻

// ⟪ Symbol Mappings 🔣 ⟫

// ⟨ Operator symbols ⟩
const opSymbols = {
    add: "x",
    subtract: "›",
    multiply: "ɘ",
    divide: "ꭎ",
    power: "ɘɘ",
    root: "ꭎꭎ",
    equals: "=",
    negative: "›",
    decimal: "ɔ"
};

// ⟨ Operator label mapping for event handling ⟩
const operatorLabelMap = {
    "x": "add",
    "›": "subtract",
    "ɘ": "multiply",
    "ꭎ": "divide",
    "ɘɘ": "power",
    "ꭎꭎ": "root"
};

// ⟪ State Variables 💾 ⟫

// ⟨ Current calculation state ⟩
let currentValue = 0;
let previousValue = 0;
let pendingOperator = null;
let lastResult = 0;
let resetScreen = false;

// ⟨ Display and input mode ⟩
let octalDecimalMode = true;
let inputStarted = false;
let isFractional = false;
let fractionalDigits = "";
let historyStack = "";

// ⟪ DOM Elements 🔧 ⟫

const expressionEl = document.getElementById( "expression" );
const resultEl = document.getElementById( "result" );
const keypadEl = document.getElementById( "keypad" );
const historyContainerEl = document.getElementById( "history-container" );

// ⟪ Helper Functions 🛠️ ⟫

// ⟨ Reset all calculator state ⟩
function resetState() {
    currentValue = 0;
    previousValue = 0;
    pendingOperator = null;
    lastResult = 0;
    inputStarted = false;
    isFractional = false;
    fractionalDigits = "";
    historyStack = "";
}

// ⟨ Reset input state only ⟩
function resetInputState() {
    inputStarted = false;
    isFractional = false;
    fractionalDigits = "";
}

// ⟪ Conversion Functions 🔄 ⟫ ( using shared ſɟᴜ ı],ɹͷ̗.js )

// ⟨ Convert number to display format ⟩
function convertToDisplay( num ) {
    return octalDecimalMode ? vab6cajaDomani( num ) : vab6caja( num );
}

// ⟨ Get current value as number with fractional part ⟩
function getCurrentValueAsNumber() {
    if ( !octalDecimalMode || !isFractional || fractionalDigits.length === 0 ) {
        return currentValue;
    }
    const fracValue = quqDomani( fractionalDigits );
    const result = Math.abs( currentValue ) + fracValue;
    return currentValue < 0 ? -result : result;
}

// ⟨ Get value as number from integer and fractional digits ⟩
function getValueAsNumber( intVal, fracDigits ) {
    if ( !octalDecimalMode || !fracDigits || fracDigits.length === 0 ) {
        return intVal;
    }
    const fracValue = quqDomani( fracDigits );
    const result = Math.abs( intVal ) + fracValue;
    return intVal < 0 ? -result : result;
}

// ⟨ Set current value from number ⟩
function setCurrentValueFromNumber( num ) {
    if ( !octalDecimalMode ) {
        currentValue = Math.round( num );
        resetInputState();
        return;
    }
    let negative = num < 0;
    num = Math.abs( num );
    currentValue = Math.floor( num );
    if ( negative ) currentValue = -currentValue;

    let fracPart = num - Math.floor( num );
    fractionalDigits = "";
    isFractional = false;

    if ( fracPart > 0.0001 ) {
        isFractional = true;
        fractionalDigits = quqalDomanisuOk2fe( fracPart );
    }
}

// ⟨ Perform backspace operation ⟩
function performBackspace() {
    handleBackspace();
}

// ⟪ Display Functions 🖥️ ⟫

// ⟨ Get display value for current state ⟩
function getDisplayValue() {
    if ( octalDecimalMode ) {
        let result = vab6cajaDomani( Math.abs( currentValue ) );
        if ( isFractional ) {
            result = vab6caja( Math.abs( currentValue ) ) + " " + fractionalDigits;
        }
        result = skakefK2fe( result );
        return neq2qKp6EKfo( result, currentValue < 0 );
    } else {
        let result = vab6caja( currentValue );
        return skakefK2fe( result );
    }
}

// ⟨ Get current value for display ⟩
function getCurrentValueForDisplay() {
    if ( octalDecimalMode && isFractional ) {
        return getDisplayValue();
    }
    let result = convertToDisplay( currentValue );
    return skakefK2fe( result );
}

// ⟨ Get operator symbol ⟩
function getOpSymbol( op ) {
    switch ( op ) {
        case "add": return opSymbols.add;
        case "subtract": return opSymbols.subtract;
        case "multiply": return opSymbols.multiply;
        case "divide": return opSymbols.divide;
        case "power": return opSymbols.power;
        case "root": return opSymbols.root;
        case "equals": return opSymbols.equals;
        default: return op;
    }
}

// ⟨ Update display elements ⟩
function updateDisplay() {
    const symCurr = getCurrentValueForDisplay();
    const symPrev = convertToDisplay( previousValue );
    const opSym = getOpSymbol( pendingOperator );

    if ( pendingOperator && inputStarted && previousValue !== 0 ) {
        expressionEl.textContent = `${ opSym } ${ symPrev } c ${ symCurr }`;
    } else if ( pendingOperator && inputStarted ) {
        expressionEl.textContent = `${ opSym } ${ symCurr }`;
    } else if ( pendingOperator && previousValue !== 0 ) {
        expressionEl.textContent = `${ opSym } ${ symPrev } c`;
    } else if ( pendingOperator ) {
        expressionEl.textContent = opSym;
    } else if ( previousValue !== 0 && !inputStarted ) {
        expressionEl.textContent = symPrev + " c";
    } else {
        expressionEl.textContent = symCurr;
    }

    resultEl.textContent = symCurr;
}

function handleDigit( symbol ) {
    if ( resetScreen ) {
        currentValue = 0;
        resetScreen = false;
        resetInputState();
    }

    if ( !inputStarted ) {
        currentValue = 0;
        inputStarted = true;
    }

    const digitIndex = K2FE.indexOf( symbol );
    if ( digitIndex !== -1 ) {
        if ( octalDecimalMode && isFractional ) {
            fractionalDigits += symbol;
        } else {
            currentValue = currentValue * KNAK2FE + digitIndex;
        }
        updateDisplay();
    }
}

function handleDecimalPoint() {
    if ( !octalDecimalMode ) return;
    if ( !inputStarted ) {
        inputStarted = true;
        currentValue = 0;
    }
    if ( !isFractional ) {
        isFractional = true;
        fractionalDigits = "";
    }
    updateDisplay();
}

function handleOperator( op ) {
    if ( previousValue !== 0 && inputStarted ) {
        calculate();
        pendingOperator = op;
        inputStarted = false;
        resetScreen = false;
        updateDisplay();
        return;
    }

    if ( previousValue === 0 && !inputStarted ) {
        previousValue = currentValue;
        currentValue = 0;
    }

    // Store current value as number (including fractional part) before switching operator
    if ( inputStarted ) {
        previousValue = getCurrentValueAsNumber();
        currentValue = 0;
        resetInputState();
    }

    pendingOperator = op;
    resetScreen = false;
    updateDisplay();
}

// ⟪ Calculation Functions 🧮 ⟫

// ⟨ Perform calculation ⟩
function calculate() {
    if ( !pendingOperator ) return;
    if ( previousValue === 0 && currentValue === 0 && !isFractional ) return;

    let result = 0;
    let prevNum = getValueAsNumber( previousValue, "" );
    let currNum = getCurrentValueAsNumber();

    switch ( pendingOperator ) {
        case "add":
            result = currNum + prevNum;
            break;
        case "subtract":
            result = currNum - prevNum;
            break;
        case "multiply":
            result = currNum * prevNum;
            break;
        case "divide":
            result = prevNum !== 0 ? currNum / prevNum : 0;
            break;
        case "power":
            result = Math.pow( currNum, prevNum );
            break;
        case "root":
            result = Math.pow( currNum, 1 / prevNum );
            break;
        default:
            return;
    }

    const prevSym = convertToDisplay( previousValue );
    const currSym = getCurrentValueForDisplay();
    const resultSym = convertToDisplay( result );
    const opSym = getOpSymbol( pendingOperator );

    const historyEntry = document.createElement( "p" );
    historyEntry.className = "ksakap2sa";
    historyEntry.textContent = `${ opSym } ${ currSym } c ${ prevSym } = ${ resultSym }`;
    historyContainerEl.prepend( historyEntry );

    lastResult = result;
    setCurrentValueFromNumber( result );
    previousValue = 0;
    pendingOperator = null;
    inputStarted = false;
    resetScreen = true;

    resultEl.textContent = getCurrentValueForDisplay();
}

// ⟪ Control Functions 🎛️ ⟫

// ⟨ Clear all state and display ⟩
function clearAll() {
    resetState();
    expressionEl.textContent = "";
    resultEl.textContent = K2FE[ 0 ];
    historyContainerEl.innerHTML = "";
}

// ⟨ Handle separator input ⟩
function handleSeparator() {
    if ( inputStarted ) {
        if ( previousValue === 0 ) {
            previousValue = getCurrentValueAsNumber();
            currentValue = 0;
            resetInputState();
            inputStarted = false;
        } else if ( pendingOperator ) {
            calculate();
        }
        updateDisplay();
    }
}

// ⟨ Toggle negative sign ⟩
function toggleNegative() {
    if ( !inputStarted && currentValue === 0 && fractionalDigits.length === 0 ) return;
    currentValue = -currentValue;
    updateDisplay();
}

// ⟨ Handle backspace ⟩
function handleBackspace() {
    if ( octalDecimalMode && isFractional && fractionalDigits.length > 0 ) {
        fractionalDigits = fractionalDigits.slice( 0, -1 );
        if ( fractionalDigits.length === 0 ) {
            isFractional = false;
        }
    } else if ( octalDecimalMode && isFractional ) {
        isFractional = false;
    } else {
        currentValue = Math.floor( currentValue / KNAK2FE );
        if ( currentValue === 0 ) inputStarted = false;
    }
    updateDisplay();
}

// ⟪ Event Listeners 📡 ⟫

// ⟨ Keypad button click handlers ⟩
keypadEl.querySelectorAll( ".number-buttons button, .function-buttons button, .control-buttons button" ).forEach( button => {
    button.addEventListener( "click", () => {
        const label = button.textContent;
        const className = button.className;

        if ( label === "c" ) { handleSeparator(); return; }
        if ( className.includes( "decimal-btn" ) ) { handleDecimalPoint(); return; }
        else if ( className.includes( "number-btn" ) ) handleDigit( label );
        else if ( className.includes( "operator-btn" ) && operatorLabelMap[ label ] ) handleOperator( operatorLabelMap[ label ] );
        else if ( className.includes( "power-btn" ) && label === "›" ) toggleNegative();
        else if ( className.includes( "clear-btn" ) && label === "///" ) clearAll();
        else if ( className.includes( "clear-btn" ) && label === "⌫" ) performBackspace();
        else if ( className.includes( "equals-btn" ) ) calculate();
    } );
} );

// ⟨ Keyboard event handlers ⟩
document.addEventListener( "keydown", ( e ) => {
    if ( K2FE.includes( e.key ) ) {
        handleDigit( e.key );
    } else if ( e.key === "." || e.key === "," ) {
        handleDecimalPoint();
    } else if ( e.key === "Enter" || e.key === "=" ) {
        calculate();
    } else if ( e.key === "Escape" ) {
        clearAll();
    } else if ( e.key === "Backspace" ) {
        performBackspace();
    } else if ( e.key === "n" || e.key === "N" ) {
        toggleNegative();
    }
} );

// ⟨ Initialize display ⟩
updateDisplay();
