// Base 8 Symbols Mapping ( 0-7 )
const digitSymbols = [ "ɔ", "ı", "ɿ", "ц", "э", "ꞟ", "ɩ", "ƨ" ];
const base = 8;

// Operator Symbols
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

// State - Store as actual numbers internally
let currentValue = 0;
let previousValue = 0;
let pendingOperator = null;
let lastResult = 0;
let resetScreen = false;
let octalDecimalMode = false;
let inputStarted = false;

// DOM Elements
const expressionEl = document.getElementById( "expression" );
const resultEl = document.getElementById( "result" );
const keypadEl = document.getElementById( "keypad" );

function toSymbolString( num ) {
    if ( num === null || num === undefined || isNaN( num ) ) return "Error";
    if ( num === 0 ) return digitSymbols[ 0 ];
    
    let absNum = Math.abs( Math.floor( num ) );
    let str = "";
    do {
        const remainder = absNum % base;
        str = digitSymbols[ remainder ] + str;
        absNum = Math.floor( absNum / base );
    } while ( absNum > 0 );
    return num < 0 ? opSymbols.negative + str : str;
}

function fromSymbolString( str ) {
    if ( !str || str === "" ) return 0;
    let negative = false;
    let cleanStr = str;
    if ( str.startsWith( opSymbols.negative ) ) {
        negative = true;
        cleanStr = str.slice( 1 );
    }
    let num = 0;
    for ( let char of cleanStr ) {
        const index = digitSymbols.indexOf( char );
        if ( index !== -1 ) {
            num = num * base + index;
        }
    }
    return negative ? -num : num;
}

function toOctalDecimalString( num ) {
    if ( num === null || num === undefined || isNaN( num ) ) return "Error";
    let negative = num < 0;
    num = Math.abs( num );
    let intPart = Math.floor( num );
    let fracPart = num - intPart;

    let intStr = intPart === 0 ? digitSymbols[ 0 ] : "";
    let tempInt = intPart;
    while ( tempInt > 0 ) {
        intStr = digitSymbols[ tempInt % base ] + intStr;
        tempInt = Math.floor( tempInt / base );
    }

    let fracStr = "";
    let tempFrac = fracPart;
    let precision = 6;
    for ( let i = 0; i < precision && tempFrac > 0.0001; i++ ) {
        tempFrac *= base;
        let digit = Math.floor( tempFrac );
        fracStr += digitSymbols[ digit ];
        tempFrac -= digit;
    }

    if ( fracStr.length > 0 ) {
        let lastDigit = digitSymbols.indexOf( fracStr[ fracStr.length - 1 ] );
        if ( lastDigit === 4 && fracStr.length === precision ) {
            fracStr = fracStr.slice( 0, -1 );
        }
    }

    let result = intStr;
    if ( fracStr ) {
        result += " " + opSymbols.decimal + fracStr;
    }

    return negative ? opSymbols.negative + result : result;
}

function fromOctalDecimalString( str ) {
    if ( !str || str === "" ) return 0;
    let negative = false;
    let cleanStr = str;
    if ( str.startsWith( opSymbols.negative ) ) {
        negative = true;
        cleanStr = str.slice( 1 );
    }

    let parts = cleanStr.split( " " );
    let intPart = 0;
    let fracPart = 0;

    if ( parts[ 0 ] ) {
        for ( let char of parts[ 0 ] ) {
            const index = digitSymbols.indexOf( char );
            if ( index !== -1 ) {
                intPart = intPart * base + index;
            }
        }
    }

    if ( parts[ 1 ] && parts[ 1 ].startsWith( opSymbols.decimal ) ) {
        let fracStr = parts[ 1 ].slice( 1 );
        for ( let i = 0; i < fracStr.length; i++ ) {
            const index = digitSymbols.indexOf( fracStr[ i ] );
            if ( index !== -1 ) {
                fracPart += index / Math.pow( base, i + 1 );
            }
        }
    }

    let result = intPart + fracPart;
    return negative ? -result : result;
}

function getDisplayValue() {
    if ( octalDecimalMode ) {
        return toOctalDecimalString( currentValue );
    } else {
        return toSymbolString( currentValue );
    }
}

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

function updateDisplay() {
    const symCurr = octalDecimalMode ? toOctalDecimalString( currentValue ) : toSymbolString( currentValue );
    const symPrev = octalDecimalMode ? toOctalDecimalString( previousValue ) : toSymbolString( previousValue );
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
        inputStarted = false;
    }

    if ( !inputStarted ) {
        currentValue = 0;
        inputStarted = true;
    }

    const digitIndex = digitSymbols.indexOf( symbol );
    if ( digitIndex !== -1 ) {
        if ( octalDecimalMode ) {
            currentValue = currentValue * base + digitIndex;
        } else {
            currentValue = currentValue * base + digitIndex;
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

    pendingOperator = op;
    inputStarted = false;
    resetScreen = false;
    updateDisplay();
}

function calculate() {
    if ( !pendingOperator ) return;
    if ( previousValue === 0 && currentValue === 0 ) return;

    let result = 0;
    let prevOctal = octalDecimalMode ? fromOctalDecimalString( toOctalDecimalString( previousValue ) ) : previousValue;
    let currOctal = octalDecimalMode ? fromOctalDecimalString( toOctalDecimalString( currentValue ) ) : currentValue;

    switch ( pendingOperator ) {
        case "add":
            result = currOctal + prevOctal;
            break;
        case "subtract":
            result = currOctal - prevOctal;
            break;
        case "multiply":
            result = currOctal * prevOctal;
            break;
        case "divide":
            result = prevOctal !== 0 ? currOctal / prevOctal : 0;
            break;
        case "power":
            result = Math.pow( currOctal, prevOctal );
            break;
        case "root":
            result = Math.pow( currOctal, 1 / prevOctal );
            break;
        default:
            return;
    }

    const prevSym = octalDecimalMode ? toOctalDecimalString( previousValue ) : toSymbolString( previousValue );
    const currSym = octalDecimalMode ? toOctalDecimalString( currentValue ) : toSymbolString( currentValue );
    const resultSym = octalDecimalMode ? toOctalDecimalString( result ) : toSymbolString( result );
    const opSym = getOpSymbol( pendingOperator );

    expressionEl.textContent = `${ opSymbols.equals } ( ${ opSym } ${ currSym } c ${ prevSym } ) c ${ resultSym }`;

    lastResult = result;
    currentValue = result;
    previousValue = 0;
    pendingOperator = null;
    inputStarted = false;
    resetScreen = true;

    resultEl.textContent = octalDecimalMode ? toOctalDecimalString( currentValue ) : toSymbolString( currentValue );
}

function clearAll() {
    currentValue = 0;
    previousValue = 0;
    pendingOperator = null;
    lastResult = 0;
    resetScreen = false;
    inputStarted = false;
    expressionEl.textContent = "";
    resultEl.textContent = digitSymbols[ 0 ];
}

function handleSeparator() {
    if ( inputStarted ) {
        if ( previousValue === 0 ) {
            previousValue = currentValue;
            currentValue = 0;
            inputStarted = false;
        } else if ( pendingOperator ) {
            calculate();
        }
        updateDisplay();
    }
}

function toggleNegative() {
    if ( !inputStarted && currentValue === 0 ) return;
    currentValue = -currentValue;
    updateDisplay();
}

function toggleOctalDecimal() {
    octalDecimalMode = !octalDecimalMode;
    const modeBtn = document.getElementById( "modeBtn" );
    if ( octalDecimalMode ) {
        modeBtn.classList.add( "mode-active" );
        modeBtn.textContent = "ɔ.";
    } else {
        modeBtn.classList.remove( "mode-active" );
        modeBtn.textContent = "ɔ";
    }
    currentValue = 0;
    previousValue = 0;
    pendingOperator = null;
    inputStarted = false;
    updateDisplay();
}

keypadEl.querySelectorAll( ".number-buttons button, .function-buttons button, .control-buttons button" ).forEach( button => {
    button.addEventListener( "click", () => {
        const label = button.textContent;
        const className = button.className;

        if ( label === "c" ) { handleSeparator(); return; }
        if ( className.includes( "number-btn" ) ) handleDigit( label );
        else if ( className.includes( "operator-btn" ) && label === "x" ) handleOperator( "add" );
        else if ( className.includes( "operator-btn" ) && label === "›" ) handleOperator( "subtract" );
        else if ( className.includes( "operator-btn" ) && label === "ɘ" ) handleOperator( "multiply" );
        else if ( className.includes( "operator-btn" ) && label === "ꭎ" ) handleOperator( "divide" );
        else if ( className.includes( "power-btn" ) && label === "ɘɘ" ) handleOperator( "power" );
        else if ( className.includes( "power-btn" ) && label === "ꭎꭎ" ) handleOperator( "root" );
        else if ( className.includes( "power-btn" ) && label === "›" ) toggleNegative();
        else if ( className.includes( "mode-btn" ) ) toggleOctalDecimal();
        else if ( className.includes( "clear-btn" ) && label === "///" ) clearAll();
        else if ( className.includes( "clear-btn" ) && label === "⌫" ) {
            currentValue = Math.floor( currentValue / base );
            if ( currentValue === 0 ) inputStarted = false;
            updateDisplay();
        }
        else if ( className.includes( "equals-btn" ) ) calculate();
    } );
} );

document.addEventListener( "keydown", ( e ) => {
    if ( digitSymbols.includes( e.key ) ) {
        handleDigit( e.key );
    } else if ( e.key === "Enter" || e.key === "=" ) {
        calculate();
    } else if ( e.key === "Escape" ) {
        clearAll();
    } else if ( e.key === "Backspace" ) {
        currentValue = Math.floor( currentValue / base );
        if ( currentValue === 0 ) inputStarted = false;
        updateDisplay();
    } else if ( e.key === "n" || e.key === "N" ) {
        toggleNegative();
    } else if ( e.key === "d" || e.key === "D" ) {
        toggleOctalDecimal();
    }
} );

updateDisplay();
