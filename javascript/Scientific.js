const display = document.getElementById("display");

/* --- calculator logic --- */
//const display = document.getElementById("display");
function append(val) {
  if (display.value == "Invalid Expression.") display.value = "";
  display.value += val;
  moveCursorToEnd();
  display.scrollTop = display.scrollHeight;
}

/* ---------- KEYBOARD HANDLER ---------- */
document.addEventListener("keydown", function (e) {
  const digitKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operatorKeys = ["+", "-", "*", "/", ".", "%"];
  const controlKeys = ["Backspace", "Enter", "="];
  const allowedKeys = [...digitKeys, ...operatorKeys, ...controlKeys];

  const display = document.getElementById("display"); // Make sure you have an input with id="display"

  const lastChar = display.value.slice(-1);
  const isOperator = operatorKeys.includes(e.key);

  // 1. Block all unallowed keys
  if (!allowedKeys.includes(e.key)) {
    e.preventDefault();
    return;
  }

  // 2. Handle Backspace
  if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }
  // 3. Handle Enter or =
  else if (e.key === "Enter" || e.key === "=") {
    calculate(); // your custom function
  }
  // 4. Handle input validation before adding digit/operator
  else {
    // Block starting with + * /
    if (
      display.value.length === 0 &&
      (e.key === "+" || e.key === "*" || e.key === "/" || e.key === ".")
    ) {
      e.preventDefault();
      return;
    }

    // Prevent consecutive operators
    if (isOperator && operatorKeys.includes(lastChar)) {
      e.preventDefault();
      return;
    }
    // Prevent multiple dots in the current number
    if (e.key === ".") {
      // Get the current number (after the last operator)
      const currentNumber = display.value.split(/[\+\-\*\/]/).pop();
      if (currentNumber.includes(".")) {
        e.preventDefault();
        return;
      }
    }

    // Append only if valid
    display.value += e.key;
  }

  // 5. Keep view updated
  display.scrollTop = display.scrollHeight;

  // 6. Prevent default behavior
  e.preventDefault();
});
function appendOperator(op) {
  const display = document.getElementById("display");
  const lastChar = display.value.slice(-1);

  // ❌ Prevent starting with invalid operators
  if (display.value === "" && ["*", "/", "%", ".", "+"].includes(op)) {
    return;
  }

  // ❌ Prevent consecutive operators
  if ("+-*/%.".includes(lastChar)) {
    if (op === ".") {
      // Handle dot exception below
    } else {
      display.value = display.value.slice(0, -1) + op;
      display.scrollTop = display.scrollHeight;
      return;
    }
  }

  // ✅ Allow only one dot in the current number (after last operator)
  if (op === ".") {
    const lastNumber = display.value.split(/[\+\-\*\/%]/).pop();
    if (lastNumber.includes(".")) {
      return;
    }
  }

  display.value += op;
  display.scrollTop = display.scrollHeight;
}

function clearDisplay() {
  display.value = "";
}
function backspace() {
  display.value = display.value.slice(0, -1);
}
function calculate() {
  let expression = preprocessExpression(display.value);
  expression = expression
    .replace(/π/g, "Math.PI")
    .replace(/(?<![a-zA-Z0-9_])e(?![a-zA-Z0-9_])/g, "Math.E")
    .replace(/\^/g, "**")
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/sqrt\(/g, "Math.sqrt(");

  if (!Math.log10) Math.log10 = (x) => Math.log(x) / Math.LN10;

  try {
    display.value = eval(expression); // ✅ correct variable name
  } catch {
    display.value = "Invalid Expression.";
    //alert("Invalid Expression");
  }
}
function moveCursorToEnd() {
  // Put both selectionStart and selectionEnd at the end of the text
  display.selectionStart = display.selectionEnd = display.value.length;
}
function preprocessExpression(expr) {
  // Add * between number and (
  expr = expr.replace(/(\d)(\()/g, "$1*$2");

  // Add * between ) and number
  expr = expr.replace(/(\))(\d)/g, "$1*$2");

  // Add * between ) and (
  expr = expr.replace(/(\))(\()/g, "$1*$2");

  // Add * between number and function
  expr = expr.replace(/(\d)(sin|cos|tan|log|sqrt)/g, "$1*$2");

  return expr;
}
