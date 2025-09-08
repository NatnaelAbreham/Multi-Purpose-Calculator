const gregDate = document.getElementById("gregDate");
gregDate.max = new Date().toISOString().split("T")[0];

// Populate Ethiopian year select
const ethYear = document.getElementById("ethYear");
for (let y = 1900; y <= 2030; y++) {
  ethYear.innerHTML += `<option value="${y}">${y}</option>`;
}

// Populate Ethiopian day select depending on month
const ethDay = document.getElementById("ethDay");
const ethMonth = document.getElementById("ethMonth");
function updateEthDays() {
  const month = +ethMonth.value;
  let maxDays = 30;
  if (month === 13) maxDays = 6; // Pagume days
  ethDay.innerHTML = "";
  for (let d = 1; d <= maxDays; d++) {
    ethDay.innerHTML += `<option value="${d}">${d}</option>`;
  }
}
ethMonth.addEventListener("change", updateEthDays);
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

// Ethiopian to JD
function ethiopianToJD(year, month, day) {
  const JD_EPOCH_OFFSET = 1723856;
  return (
    JD_EPOCH_OFFSET +
    365 * (year - 1) +
    Math.floor(year / 4) +
    30 * (month - 1) +
    (day - 1)
  );
}

// JD to Gregorian Date
function jdToGregorian(jd) {
  let j = jd + 0.5;
  let z = Math.floor(j);
  let a = z;
  let b = a + 1524;
  let c = Math.floor((b - 122.1) / 365.25);
  let d = Math.floor(365.25 * c);
  let e = Math.floor((b - d) / 30.6001);
  let day = Math.floor(b - d - Math.floor(30.6001 * e));
  let month = e < 14 ? e - 1 : e - 13;
  let year = month > 2 ? c - 4716 : c - 4715;
  return new Date(year, month - 1, day);
}

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
    dob = new Date(input);
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
    dob = jdToGregorian(ethiopianToJD(y, m, d));
  }

  const today = new Date();
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
  }

  animateCount("yearsOut", years);
  animateCount("monthsOut", months);
  animateCount("daysOut", days);

  let date = new Date(y, m - 1, d);
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = weekdays[date.getDay()];

  const text =
    `You are ${years} year${years !== 1 ? "s" : ""}` +
    (months > 0 ? `, ${months} month${months !== 1 ? "s" : ""}` : "") +
    (days > 0 ? `, and ${days} day${days !== 1 ? "s" : ""}` : "") +
    " old.";

  document.getElementById("textualOutput").textContent = text;

  new bootstrap.Modal(document.getElementById("resultModal")).show();
}
