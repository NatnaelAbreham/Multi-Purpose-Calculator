/* function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById("themeIcon");
  const btn = document.getElementById("themeToggle");

  const isDark = html.getAttribute("data-bs-theme") === "dark";
  html.setAttribute("data-bs-theme", isDark ? "light" : "dark");

  // Change icon and button style
  if (isDark) {
    icon.className = "bi bi-sun-fill";
    btn.classList.remove("btn-outline-light");
    btn.classList.add("btn-outline-dark");
  } else {
    icon.className = "bi bi-moon-fill";
    btn.classList.remove("btn-outline-dark");
    btn.classList.add("btn-outline-light");
  }
} */
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById("themeIcon");
  const btn = document.getElementById("themeToggle");

  const isDark = html.getAttribute("data-bs-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";

  html.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme); // ✅ Store preference

  // Change icon and button style
  if (isDark) {
    icon.className = "bi bi-sun-fill";
    btn.classList.remove("btn-outline-light");
    btn.classList.add("btn-outline-dark");
  } else {
    icon.className = "bi bi-moon-fill";
    btn.classList.remove("btn-outline-dark");
    btn.classList.add("btn-outline-light");
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");
}

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const currentPage = location.pathname.split("/").pop();

  links.forEach((link) => {
    // Normalize the href by removing leading './'
    const href = link.getAttribute("href").replace(/^\.?\//, "");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});

/* // Get current URL pathname (e.g., "/calculator.html")
const currentPath = window.location.pathname.split("/").pop();

// Select all sidebar links
const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');

sidebarLinks.forEach(link => {
  // Get href attribute (file name)
  const href = link.getAttribute('href');
  
  if (href === currentPath) {
    link.classList.add('active');  // add active class
  } else {
    link.classList.remove('active'); // just in case
  }
});
 */
