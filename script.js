
let isPowerOn = false;
let isInverted = false; 

function togglePower() {
    isPowerOn = !isPowerOn;
    let display = document.getElementById('display');
    if (!isPowerOn) {
        display.value = '';
    } else {
        display.value = '0';
    }
}



function appendValue(value) {
    if (isPowerOn) {
        let display = document.getElementById('display');
        if (value === '^') {
            // Check if the last character is a number or a closing parenthesis
            let lastChar = display.value.charAt(display.value.length - 1);
            if (!isNaN(lastChar) || lastChar === ')') {
                display.value += '**';
            }
        } else if (display.value === '0' && value !== '.') {
            display.value = value;
        } else {
            display.value += value;
        }
    }
}

function clearDisplay() {
    if (isPowerOn) {
        document.getElementById('display').value = '0';
    }
}

function backspace() {
    if (isPowerOn) {
        let display = document.getElementById('display').value;
        document.getElementById('display').value = display.substring(0, display.length - 1);
    }
}



let memoryValue = 0;

// Function to clear the memory (MC)
function memoryClear() {
    memoryValue = 0;
}

// Function to recall the memory value (MR)
function memoryRecall() {
    // Assuming you have a display element with an ID "number-display"
    // You can set the display value to the memory value
    document.getElementById("number-display").textContent = memoryValue;
}

function toggleInverse() {
    isInverted = !isInverted;
}


const originalMathFunctions = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan
};

Math.sin = function (x) {
    return isInverted ? originalMathFunctions.asin(x) : originalMathFunctions.sin(x);
};

Math.cos = function (x) {
    return isInverted ? originalMathFunctions.acos(x) : originalMathFunctions.cos(x);
};

Math.tan = function (x) {
    return isInverted ? originalMathFunctions.atan(x) : originalMathFunctions.tan(x);
};


function calculatePercentage() {
    let display = document.getElementById('display');
    let expression = display.value;
    try {
        let result = eval(expression) / 100;
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}



let prevAnswer = null;

function calculate() {
    if (isPowerOn) {
        let expression = document.getElementById('display').value;
        let result;
        try {
            expression = expression.replace(/\^/g, '**');
            result = eval(expression);
            if (result === Infinity) {
                throw new Error('Division by zero error');
            }
            document.getElementById('display').value = result;
            prevAnswer = result; // Store the result as previous answer
        } catch (error) {
            document.getElementById('display').value = 'Error';
        }
    }
}

function appendValue(value) {
    if (isPowerOn) {
        let display = document.getElementById('display');
        if (value === 'ans') { // Check if the value is "ans"
            if (prevAnswer !== null) {
                display.value += prevAnswer; // Append previous answer to display
            }
        } else if (value === '^') {
            let lastChar = display.value.charAt(display.value.length - 1);
            if (!isNaN(lastChar) || lastChar === ')') {
                display.value += '**';
            }
        } else if (display.value === '0' && value !== '.') {
            display.value = value;
        } else {
            display.value += value;
        }
    }
}

function memoryClear() {
    if (isPowerOn) {
        let memoryValue = localStorage.getItem('memoryValue');
        if (memoryValue !== null) {
            let display = document.getElementById('display');
            if (display.value === '0') {
                display.value = memoryValue;
            } else {
                display.value += memoryValue;
            }
        }
        prevAnswer = null; // Clear the previous answer when memory is recalled
    }
}
function memoryRecall() {
    if (isPowerOn) {
        let display = document.getElementById('display');
        if (prevAnswer !== null) {
            display.value += prevAnswer; // Append previous answer to display
        }
    }
}

function appendValue(value) {
    if (isPowerOn) {
        let display = document.getElementById('display');
        if (value === '^') {
            let number = parseFloat(display.value);
            if (!isNaN(number)) {
                display.value = number * number; // Square the number
            }
        } else if (display.value === '0' && value !== '.') {
            display.value = value;
        } else {
            display.value += value;
        }
    }
}


function square() {
    if (isPowerOn) {
        let display = document.getElementById('display');
        let currentNumber = parseFloat(display.value);
        if (!isNaN(currentNumber)) {
            display.value = currentNumber * currentNumber; // Multiply the number by itself (square)
        }
    }
}


