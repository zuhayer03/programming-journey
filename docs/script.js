"use strict";

// Small enhancements only: the content and links work without JavaScript.
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Project filters keep all four real projects present in the HTML and accessible without scripts.
const filters = [...document.querySelectorAll(".filter")];
const cards = [...document.querySelectorAll(".project-card")];
filters.forEach((button) => {
  button.addEventListener("click", () => {
    const choice = button.dataset.filter;
    filters.forEach((f) => {
      const active = f === button;
      f.classList.toggle("active", active);
      f.setAttribute("aria-pressed", String(active));
    });
    cards.forEach((card) => {
      card.hidden = choice !== "all" && card.dataset.lang !== choice;
    });
  });
});

// Command palette: Ctrl/Cmd+K or /, arrow keys, Enter, and Escape.
const palette = document.getElementById("command-palette");
const cmdInput = document.getElementById("command-input");
const cmdList = document.getElementById("command-list");
const cmdLaunch = document.getElementById("command-launch");
const cmdClose = document.getElementById("command-close");
const commands = [
  { label: "Home", detail: "01 / Introduction", href: "#home" },
  { label: "About", detail: "02 / My story", href: "#about" },
  { label: "Projects", detail: "03 / Source and demos", href: "#projects" },
  { label: "Toolkit", detail: "04 / Technologies", href: "#skills" },
  { label: "Experience", detail: "05 / Timeline", href: "#experience" },
  { label: "Contact", detail: "06 / Co-op opportunities", href: "#contact" },
  { label: "GitHub", detail: "External / Profile", href: "https://github.com/zuhayer03" },
  { label: "LinkedIn", detail: "External / Professional profile", href: "https://www.linkedin.com/in/zuhayer-alam-faiyaz-8bb1a3442/" }
];
let matches = commands.slice();
let selection = 0;
let priorFocus = null;
function paintPalette() {
  const query = cmdInput.value.trim().toLowerCase();
  matches = commands.filter((item) => (item.label + " " + item.detail).toLowerCase().includes(query));
  selection = Math.min(selection, Math.max(0, matches.length - 1));
  cmdList.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement("p");
    empty.textContent = "No matching destination.";
    empty.style.cssText = "padding:12px;color:#aebcce";
    cmdList.appendChild(empty);
  }
  matches.forEach((item, index) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "palette-item" + (index === selection ? " selected" : "");
    row.setAttribute("role", "option");
    row.setAttribute("aria-selected", String(index === selection));
    const name = document.createElement("span"); name.textContent = item.label;
    const detail = document.createElement("small"); detail.textContent = item.detail;
    row.append(name, detail);
    row.addEventListener("mouseenter", () => { selection = index; cmdList.querySelectorAll(".palette-item").forEach((el, i) => { el.classList.toggle("selected", i === index); el.setAttribute("aria-selected", String(i === index)); }); });
    row.addEventListener("click", () => navigate(item));
    cmdList.appendChild(row);
  });
}
function showPalette() {
  priorFocus = document.activeElement;
  palette.hidden = false;
  document.body.style.overflow = "hidden";
  cmdInput.value = "";
  selection = 0;
  paintPalette();
  cmdInput.focus();
}
function hidePalette() {
  palette.hidden = true;
  document.body.style.overflow = "";
  if (priorFocus && typeof priorFocus.focus === "function") priorFocus.focus();
}
function navigate(item) {
  hidePalette();
  if (!item) return;
  if (item.href.startsWith("#")) {
    const target = document.querySelector(item.href);
    if (target) target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  } else window.open(item.href, "_blank", "noopener,noreferrer");
}
cmdLaunch.addEventListener("click", showPalette);
cmdClose.addEventListener("click", hidePalette);
palette.addEventListener("click", (event) => { if (event.target === palette) hidePalette(); });
cmdInput.addEventListener("input", () => { selection = 0; paintPalette(); });
document.addEventListener("keydown", (event) => {
  const isTextInput = event.target instanceof HTMLElement &&
    (event.target.closest("input,textarea,[contenteditable=true]") !== null);
  if (!palette.hidden) {
    if (event.key === "Escape") { event.preventDefault(); hidePalette(); }
    if (event.key === "ArrowDown") { event.preventDefault(); selection = (selection + 1) % Math.max(1, matches.length); paintPalette(); }
    if (event.key === "ArrowUp") { event.preventDefault(); selection = (selection - 1 + Math.max(1, matches.length)) % Math.max(1, matches.length); paintPalette(); }
    if (event.key === "Enter") { event.preventDefault(); navigate(matches[selection]); }
    if (event.key === "Tab") { event.preventDefault(); cmdInput.focus(); }
    return;
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault(); showPalette();
  } else if (event.key === "/" && !isTextInput && !event.ctrlKey && !event.metaKey) {
    event.preventDefault(); showPalette();
  }
});

// Light animated connection field: never intercepts clicks and stops when not visible.
const canvas = document.getElementById("particles");
const ctx = canvas && canvas.getContext("2d");
if (ctx && !reducedMotion) {
  let width = 0, height = 0, points = [], raf = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(58, Math.round(width / 24));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      r: Math.random() * 1.2 + .3
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const p of points) {
      p.x = (p.x + p.vx + width) % width;
      p.y = (p.y + p.vy + height) % height;
      ctx.fillStyle = "rgba(117,236,235,.45)";
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI); ctx.fill();
    }
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 115) {
          ctx.strokeStyle = "rgba(134,157,255," + ((1 - distance / 115) * .11) + ")";
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(raf);
    if (!document.hidden) draw();
  });
  draw();
}
