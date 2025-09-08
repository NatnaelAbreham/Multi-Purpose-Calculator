const mainInput = document.getElementById("mainInput");
const inputContainer = document.getElementById("inputContainer");
const totalDisplay = document.getElementById("totalDisplay");

// Create an error message element
const errorMsg = document.createElement("div");
errorMsg.style.color = "red";
errorMsg.style.fontSize = "0.9rem";
errorMsg.style.marginTop = "5px";
errorMsg.style.display = "none"; // hidden by default
mainInput.insertAdjacentElement("afterend", errorMsg);

// Format numbers like 4,000.00
function formatCurrency(amount) {
  return amount.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

let currentDisplayedTotal = 0; // keep track of current total for smooth animation

function updateTotal() {
  const inputs = inputContainer.querySelectorAll("input");
  let sum = 0;
  inputs.forEach((input) => {
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
      sum += value;
      input.classList.remove("is-invalid");
    } else {
      input.classList.add("is-invalid");
    }
  });

  animateTotal(currentDisplayedTotal, sum);
  currentDisplayedTotal = sum; // update current displayed total
}

function createInput(value) {
  const wrapper = document.createElement("div");
  wrapper.className = "input-wrapper";

  const newInput = document.createElement("input");
  newInput.type = "number";
  newInput.className = "form-control";
  newInput.value = value;

  newInput.addEventListener("input", updateTotal);

  const cancelBtn = document.createElement("button");
  cancelBtn.innerHTML = "&times;";
  cancelBtn.className = "remove-btn";
  cancelBtn.title = "Remove input";

  cancelBtn.addEventListener("click", () => {
    wrapper.remove();
    updateTotal();
  });

  wrapper.appendChild(newInput);
  wrapper.appendChild(cancelBtn);
  inputContainer.appendChild(wrapper);

  updateTotal();
}

mainInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const value = mainInput.value.trim();
    const numericValue = parseFloat(value);

    if (value === "" || isNaN(numericValue)) {
      mainInput.classList.add("is-invalid");
      errorMsg.textContent = "Please enter a valid number.";
      errorMsg.style.display = "block";
      return;
    }

    createInput(value);
    mainInput.value = "";
    mainInput.classList.remove("is-invalid");
    errorMsg.style.display = "none";
  }
});

function clearAllInputs() {
  inputContainer.innerHTML = "";
  totalDisplay.textContent = "Total: 0.00";
  mainInput.classList.remove("is-invalid");
  errorMsg.style.display = "none";
}
function animateTotal(from, to) {
  const duration = 500; // animation duration in ms
  const frameRate = 60;
  const totalFrames = Math.round((duration / 1000) * frameRate);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const current = from + (to - from) * progress;

    totalDisplay.textContent = `Total: ${formatCurrency(current)}`;

    if (frame === totalFrames) clearInterval(counter);
  }, 1000 / frameRate);
}

function printRunup() {
  const inputs = document.querySelectorAll("#inputContainer input");
  const total = document.getElementById("totalDisplay").textContent;

  // Create a new print window
  let printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>Runup Print</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: center; }
          th { background-color: #f2f2f2; }
          .total { font-size: 18px; font-weight: bold; margin-top: 20px; text-align: right; }
        </style>
      </head>
      <body>
        <h2>Runup Calculation Summary</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            ${Array.from(inputs)
              .map(
                (input, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${input.value}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
        <div class="total">${total}</div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}
