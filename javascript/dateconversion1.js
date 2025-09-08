// Theme Toggle
/* import { changeToEthiopia1 } from "./dateutility.js"; */

const gregDate = document.getElementById("gregDate");
gregDate.max = new Date().toISOString().split("T")[0];

let ethday, ethmonth, ethyear;

ethday = 0;
ethmonth = 0;
ethyear = 0;

let gday, gmonth, gyear;

gday = 0;
gmonth = 0;
gyear = 0;

// Get the current date
let currentDate = new Date();

// Extract year, month, and day
let year = currentDate.getFullYear();
let month = currentDate.getMonth() + 1; // getMonth() returns 0–11, so add 1
let day = currentDate.getDate();

changeToEthiopia1(day, month, year);

// Populate Ethiopian year select
const ethYear = document.getElementById("ethYear");
for (let y = 1900; y <= ethyear; y++) {
  ethYear.innerHTML += `<option value="${y}">${y}</option>`;
}

// Populate Ethiopian day select depending on month
const ethDay = document.getElementById("ethDay");
const ethMonth = document.getElementById("ethMonth");

function updateEthDays() {
  const month = +ethMonth.value;
  let maxDays = 30;

  if (month === 13) {
    maxDays = leapYear(+ethYear.value); // Pagume days
  }
  ethDay.innerHTML = "";
  for (let d = 1; d <= maxDays; d++) {
    ethDay.innerHTML += `<option value="${d}">${d}</option>`;
  }
}
ethMonth.addEventListener("change", updateEthDays);
updateEthDays();
ethYear.addEventListener("change", updateEthDays);
updateEthDays();

// Toggle calendar input fields
const calendarType = document.getElementById("calendarType");
calendarType.addEventListener("change", function () {
  document
    .querySelectorAll(".calendar-input")
    .forEach((el) => el.classList.add("hidden"));
  document.getElementById(this.value + "Input").classList.remove("hidden");
  clearValidation();
  clearError();
});

// Show error message inline and mark invalid field
function showError(message, element) {
  const errorBox = document.getElementById("errorMsg");
  errorBox.textContent = message;
  errorBox.classList.remove("d-none");
  if (element) element.classList.add("is-invalid");
}

// Clear error and invalid classes
function clearError() {
  const errorBox = document.getElementById("errorMsg");
  errorBox.classList.add("d-none");
  errorBox.textContent = "";
}

function clearValidation() {
  gregDate.classList.remove("is-invalid");
  ethDay.classList.remove("is-invalid");
  ethMonth.classList.remove("is-invalid");
  ethYear.classList.remove("is-invalid");
}

// Animate count for age digits
function animateCount(id, target) {
  const el = document.getElementById(id);
  let current = 0;
  const step = Math.max(1, Math.floor(target / 30));
  const interval = setInterval(() => {
    if (current < target) {
      current += step;
      if (current > target) current = target;
      el.textContent = current;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function calculateAge() {
  clearError();
  clearValidation();

  let dob;
  if (calendarType.value === "gregorian") {
    const input = gregDate.value;
    if (!input) {
      showError("Please select a Gregorian date.", gregDate);
      return;
    }
    /* dob = new Date(input); */

    [year, month, day] = input.split("-").map(Number);

    changeToEthiopia1(day, month, year);

    animateCount("yearsOut", ethyear);
    animateCount("monthsOut", ethmonth);
    animateCount("daysOut", ethday);
    document.getElementById("datetitle").textContent = "Ethiopian Calendar";
    // document.getElementById("textualOutput").textContent = text;
  } else {
    // Validate Ethiopian inputs
    if (!ethDay.value) {
      showError("Please select Ethiopian day.", ethDay);
      return;
    }
    if (!ethMonth.value) {
      showError("Please select Ethiopian month.", ethMonth);
      return;
    }
    if (!ethYear.value) {
      showError("Please select Ethiopian year.", ethYear);
      return;
    }
    const d = +ethDay.value;
    const m = +ethMonth.value;
    const y = +ethYear.value;
    //dob = jdToGregorian(ethiopianToJD(y, m, d));
    getGregorianDate(d, m, y);

    /* dob = new Date(gyear, gmonth - 1, gday); */
    animateCount("yearsOut", gyear);
    animateCount("monthsOut", gmonth);
    animateCount("daysOut", gday);

    //document.getElementById("textualOutput").textContent = text;
    document.getElementById("datetitle").textContent = "Gregorian Calendar";
  }

  /* const today = new Date();
  if (dob > today) {
    showError(
      "Date cannot be in the future.",
      calendarType.value === "gregorian" ? gregDate : ethYear
    );
    return;
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  } */

  /* animateCount("yearsOut", gyear);
  animateCount("monthsOut", gmonth);
  animateCount("daysOut", gday); */

  /* const text =
    `You are ${years} year${years !== 1 ? "s" : ""}` +
    (months > 0 ? `, ${months} month${months !== 1 ? "s" : ""}` : "") +
    (days > 0 ? `, and ${days} day${days !== 1 ? "s" : ""}` : "") +
    " old."; */

  // document.getElementById("textualOutput").textContent = text;

  new bootstrap.Modal(document.getElementById("resultModal")).show();
}

// Theme Toggle
