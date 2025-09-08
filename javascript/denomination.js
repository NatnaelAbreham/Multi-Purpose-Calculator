function computeTotal() {
  const inputs = document.querySelectorAll('input[type="number"]');
  let isValid = true;

  inputs.forEach((input) => {
    const value = input.value.trim();
    const intValue = parseInt(value, 10);
    const floatValue = parseFloat(value);

    // Remove previous error styles
    input.classList.remove("border-red-500");
    const errorEl = input.parentElement.querySelector(".error-message");
    if (errorEl) errorEl.remove();

    if (
      value === "" ||
      isNaN(floatValue) ||
      floatValue < 0 ||
      floatValue % 1 !== 0
    ) {
      isValid = false;
      input.classList.add("border-red-500");

      // Add error message
      const errorMessage = document.createElement("div");
      errorMessage.className = "text-sm text-red-500 mt-1 error-message";
      errorMessage.innerText = "Please enter a valid whole number.";
      input.parentElement.appendChild(errorMessage);
    }
  });

  if (!isValid) return;

  const note200 = parseInt(document.getElementById("note200").value) || 0;
  const note100 = parseInt(document.getElementById("note100").value) || 0;
  const note50 = parseInt(document.getElementById("note50").value) || 0;
  const note10 = parseInt(document.getElementById("note10").value) || 0;
  const note5 = parseInt(document.getElementById("note5").value) || 0;
  const note1 = parseInt(document.getElementById("note1").value) || 0;

  const total =
    note200 * 200 +
    note100 * 100 +
    note50 * 50 +
    note10 * 10 +
    note5 * 5 +
    note1 * 1;

  /*  document.getElementById("totalDisplay").innerText = total.toLocaleString(
    "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ); */

  const totalDisplay = document.getElementById("totalDisplay");
  const currentTotal =
    parseFloat(totalDisplay.innerText.replace(/,/g, "")) || 0;

  animateTotal(currentTotal, total);
}
document.getElementById("resetBtn").addEventListener("click", () => {
  // Reset all inputs to "0"
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.value = "0";
    input.classList.remove("border-red-500");
    const error = input.parentElement.querySelector(".error-message");
    if (error) error.remove();
  });

  // Reset total
  document.getElementById("totalDisplay").innerText = "0.00";
});

document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("focus", () => {
    if (input.value === "0") {
      input.value = "";
    }
  });

  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.value = "0";
    }
  });

  input.addEventListener("input", computeTotal);
});

// Automatically recalculate total on input change
document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("input", computeTotal);
});
document
  .querySelectorAll('input[type="number"]')
  .forEach((input, index, inputs) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // prevent form submission or default behavior
        let nextInput = inputs[index + 1];
        if (nextInput) {
          nextInput.focus();
          nextInput.select(); // optional: select the text
        } else {
          nextInput = inputs[0];
          nextInput.focus();
          nextInput.select();
        }
      }
    });
  });

function animateTotal(from, to) {
  const duration = 500; // animation duration in ms
  const frameRate = 60; // frames per second
  const totalFrames = Math.round((duration / 1000) * frameRate);
  let frame = 0;

  const totalDisplay = document.getElementById("totalDisplay");

  const counter = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const current = from + (to - from) * progress;

    totalDisplay.innerText = current.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (frame === totalFrames) clearInterval(counter);
  }, 1000 / frameRate);
}
