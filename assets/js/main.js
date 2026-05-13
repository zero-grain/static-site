const root = document.documentElement;
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");
const openSidebarBtn = document.getElementById("openSidebarBtn");
const closeSidebarBtn = document.getElementById("closeSidebarBtn");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");

const siteTitle = "\u516c\u6587\u7cfb\u7d71\u8aaa\u660e\u7db2\u7ad9";
const navLabels = new Map([
  ["index.html", "\u9996\u9801\u7e3d\u89bd"],
  ["Receipt-Instructions.html", "E-mail \u6536\u6587\u8aaa\u660e"],
  ["Founding.html", "\u5275\u7a3f\u6d41\u7a0b"],
  ["Archive.html", "\u6b78\u6a94\u4f5c\u696d"],
  ["Branch.html", "\u5206\u6587\u4f5c\u696d"],
]);

function renderIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function normalizeLayoutText() {
  document.title = siteTitle;

  const sidebarTitle = sidebar?.querySelector("h1, p.truncate");
  if (sidebarTitle) sidebarTitle.textContent = siteTitle;

  const subtitle = sidebar?.querySelector(".text-xs");
  if (subtitle) subtitle.textContent = "\u64cd\u4f5c\u6559\u5b78\u8207\u6d41\u7a0b\u6307\u5357";

  const mobileTitle = document.querySelector("header .text-sm");
  if (mobileTitle) mobileTitle.textContent = siteTitle;

  const footer = document.querySelector("footer");
  if (footer) {
    footer.innerHTML = '&copy; <span id="year"></span> ' + siteTitle;
  }

  const author = sidebar?.querySelector(".mt-auto p:first-child, .border-t p:first-child");
  if (author) author.textContent = "\u88fd\u4f5c\u8005\uFF1ATeddy_Chou";

  const privacy = sidebar?.querySelector('.footer-link[href="Privacy-Policy.html"]');
  if (privacy && !privacy.querySelector("svg")) {
    privacy.textContent = "\u96b1\u79c1\u6b0a\u653f\u7b56";
  }

  const currentFile = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = (link.getAttribute("href") || "").replace(/^#/, "");
    const label = navLabels.get(href);
    if (label) {
      const span = link.querySelector("span:last-child");
      if (span) span.textContent = label;
      else link.textContent = label;
    }
    link.classList.toggle("active", href === currentFile);
  });

  if (openSidebarBtn && !openSidebarBtn.querySelector("svg")) {
    openSidebarBtn.textContent = "\u9078\u55ae";
  }

  if (closeSidebarBtn && !closeSidebarBtn.querySelector("svg")) {
    closeSidebarBtn.textContent = "\u95dc\u9589";
  }

  const pageYear = document.getElementById("year");
  if (pageYear) {
    pageYear.textContent = new Date().getFullYear();
  }
}

function openSidebar() {
  sidebar?.classList.remove("-translate-x-full");
  overlay?.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeSidebar() {
  sidebar?.classList.add("-translate-x-full");
  overlay?.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function setTheme(mode) {
  const isDark = mode === "dark";
  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);
  localStorage.setItem("od-theme", mode);

  if (toggleThemeBtn) {
    toggleThemeBtn.innerHTML = isDark
      ? '<i data-lucide="sun" class="h-4 w-4"></i><span>\u6dfa\u8272</span>'
      : '<i data-lucide="moon" class="h-4 w-4"></i><span>\u6df1\u8272</span>';
    renderIcons();
  }
}

function openModal(imgElement) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  if (!modal || !modalImg || !imgElement) return;

  modalImg.src = imgElement.currentSrc || imgElement.src;
  modalImg.alt = imgElement.alt || "\u5716\u7247\u9810\u89bd";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeModal() {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  if (!modal || !modalImg) return;

  modal.classList.remove("flex");
  modal.classList.add("hidden");
  modalImg.removeAttribute("src");
  document.body.classList.remove("overflow-hidden");
}

openSidebarBtn?.addEventListener("click", openSidebar);
closeSidebarBtn?.addEventListener("click", closeSidebar);
overlay?.addEventListener("click", closeSidebar);

toggleThemeBtn?.addEventListener("click", () => {
  setTheme(root.classList.contains("dark") ? "light" : "dark");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSidebar();
    closeModal();
  }
});

document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "imgModal") {
    closeModal();
  }
});

normalizeLayoutText();
setTheme(localStorage.getItem("od-theme") || "light");
renderIcons();
