/* ---------- simple theme toggle ---------- */
const htmlEl = document.documentElement;
const toggleEl = document.getElementById("themeToggle");

// load preference
const saved = localStorage.getItem("theme") || "light";
htmlEl.setAttribute("data-bs-theme", saved);
toggleEl.checked = saved === "dark";

// change on click
toggleEl.addEventListener("change", () => {
  const mode = toggleEl.checked ? "dark" : "light";
  htmlEl.setAttribute("data-bs-theme", mode);
  localStorage.setItem("theme", mode);
});

/* ---------- FX logic ---------- */
/* const baseRates = { USD: 1, AED: 3.672, ETB: 57.6, EUR: 0.92 }; */

let baseRates = {};

window.addEventListener("DOMContentLoaded", loadExchangeRates);

async function loadExchangeRates() {
  try {
    const res = await fetch(
      "http://yourdomainorip.com/utility/ExchangeRate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    if (Array.isArray(data.message)) {
      const fromSel = document.getElementById("fromCur");
      const toSel = document.getElementById("toCur");

      // Clear existing options
      fromSel.innerHTML = "";
      toSel.innerHTML = "";

      data.message.forEach((entry) => {
        const { currencyID, meanRate } = entry;
        if (currencyID && meanRate) {
          baseRates[currencyID] = meanRate;

          // Create <option> element
          const option = new Option(currencyID, currencyID);

          // Append to both dropdowns
          fromSel.appendChild(option.cloneNode(true));
          toSel.appendChild(option);
        }
      });
    }

    console.log("Base Rates:", baseRates);
  } catch (err) {
    console.error("Error fetching exchange rates:", err);
  }
}

const kindFactor = { cash: 1.0, currency: 1.005, purchase: 0.995 };

const rateTypeSel = document.getElementById("rateType");
const fromSel = document.getElementById("fromCur");
const toSel = document.getElementById("toCur");
const amountInp = document.getElementById("amount");

const outType = document.getElementById("outType");
const outRate = document.getElementById("outRate");
const outInverse = document.getElementById("outInverse");
const outAmount = document.getElementById("outAmount");

document.getElementById("calcBtn").addEventListener("click", () => {
  const kind = rateTypeSel.value;
  const from = fromSel.value;
  const to = toSel.value;
  const amt = parseFloat(amountInp.value) || 0;

  const errorMsg = document.getElementById("errorMsg");

  if (from === to) {
    errorMsg.textContent = "Choose two different currencies.";
    errorMsg.style.display = "block";
    return;
  }

  if (amt <= 0) {
    errorMsg.textContent = "Enter a positive amount.";
    errorMsg.style.display = "block";
    return;
  }

  // If no errors:
  errorMsg.style.display = "none";

  const rate = (baseRates[from] / baseRates[to]) * kindFactor[kind];
  const inverse = 1 / rate;
  const converted = amt * rate;

  outType.value = kind.charAt(0).toUpperCase() + kind.slice(1);
  outRate.value = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  outInverse.value = `1 ${to} = ${inverse.toFixed(4)} ${from}`;
  outAmount.value = `${converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${to}`;
});

document.getElementById("resetBtn").addEventListener("click", () => {
  outType.value = outRate.value = outInverse.value = outAmount.value = "—";
});

const errorMsg = document.getElementById("errorMsg");
const errorText = document.getElementById("errorText");
const errorCloseBtn = document.getElementById("errorCloseBtn");

errorCloseBtn.addEventListener("click", () => {
  errorMsg.style.display = "none";
});

function showError(message) {
  errorText.textContent = message;
  errorMsg.style.display = "block";
}

document.getElementById("calcBtn").addEventListener("click", () => {
  const kind = rateTypeSel.value;
  const from = fromSel.value;
  const to = toSel.value;
  const amt = parseFloat(amountInp.value);

  // Clear previous error
  errorMsg.style.display = "none";

  if (from === to) {
    showError("Choose two different currencies.");
    return;
  }

  if (isNaN(amt) || amt <= 0) {
    showError("Enter a positive amount.");
    return;
  }

  // ...rest of your calculation code here
});
