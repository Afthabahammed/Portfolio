// =========================================
// script.js — Afthab Ahammed N Portfolio
// Author: Afthab Ahammed N
// =========================================

"use strict";

/* ---- Dark / Light Mode Toggle ---- */
const themeToggle = document.getElementById("themeToggle");
const themeIcon   = document.getElementById("themeIcon");
const html        = document.documentElement;

// Load saved theme preference
const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next    = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "bi bi-sun-fill";
    themeToggle.setAttribute("title", "Switch to Light Mode");
  } else {
    themeIcon.className = "bi bi-moon-fill";
    themeToggle.setAttribute("title", "Switch to Dark Mode");
  }
}

/* ---- Navbar: scroll shadow + active link ---- */
const navbar  = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link[href^='#']");

window.addEventListener("scroll", () => {
  // Shadow on scroll
  navbar.classList.toggle("scrolled", window.scrollY > 30);

  // Scroll-to-top button visibility
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);

  // Active nav link highlighting
  const scrollPos = window.scrollY + 100;
  navLinks.forEach(link => {
    const targetId  = link.getAttribute("href").slice(1);
    const section   = document.getElementById(targetId);
    if (!section) return;
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    link.classList.toggle("active", scrollPos >= top && scrollPos < bottom);
  });
});

/* ---- Scroll to Top Button ---- */
const scrollTopBtn = document.getElementById("scrollTop");
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---- Intersection Observer: Fade Animations ---- */
const fadeEls = document.querySelectorAll(".fade-up, .fade-left, .fade-right");

const observerOptions = {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Don't unobserve — allow re-animation on re-scroll (optional)
    }
  });
}, observerOptions);

fadeEls.forEach(el => observer.observe(el));

/* ---- Skill Bar Animation via Intersection Observer ---- */
const skillBars = document.querySelectorAll(".skill-bar-fill");

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.width;
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ---- Typing Animation for Hero Title ---- */
const typingEl   = document.getElementById("typingText");
const typingTexts = [
  "Aspiring DevOps Engineer",
  "B.Tech CS Graduate",
  "Cloud Enthusiast",
  "Automation Learner",
  "Open Source Explorer"
];
let tIndex = 0, cIndex = 0, isDeleting = false;

function typeLoop() {
  const current = typingTexts[tIndex];
  if (isDeleting) {
    typingEl.textContent = current.slice(0, cIndex--);
    if (cIndex < 0) {
      isDeleting = false;
      tIndex = (tIndex + 1) % typingTexts.length;
      setTimeout(typeLoop, 500);
      return;
    }
    setTimeout(typeLoop, 55);
  } else {
    typingEl.textContent = current.slice(0, cIndex++);
    if (cIndex > current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2200);
      return;
    }
    setTimeout(typeLoop, 100);
  }
}
typeLoop();

/* ---- Smooth scroll for nav links (extra safety on mobile) ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    // Close mobile nav if open
    const bsNav = document.querySelector(".navbar-collapse");
    if (bsNav && bsNav.classList.contains("show")) {
      bsNav.classList.remove("show");
    }
  });
});

/* ---- Terminal typing effect in contact section ---- */
const terminalLines = [
  { prompt: "~$", cmd: " cat contact.json", delay: 300 },
  { output: '{', delay: 600 },
  { kv: ["  name", "Afthab Ahammed N"], delay: 800 },
  { kv: ["  role", "Aspiring DevOps Engineer"], delay: 1000 },
  { kv: ["  email", "afthabvadassery@gmail.com"], delay: 1200 },
  { kv: ["  phone", "+91 9074696894"], delay: 1400 },
  { kv: ["  location", "Alappuzha, Kerala, India"], delay: 1600 },
  { kv: ["  linkedin", "linkedin.com/in/afthab-ahammed-n-b7314a364"], delay: 1800 },
  { kv: ["  github", "github.com/afthabahammed"], delay: 2000 },
  { output: '}', delay: 2200 },
  { prompt: "~$", cmd: " █", delay: 2400 }
];

const termBody = document.getElementById("termBody");

function renderTerminal() {
  termBody.innerHTML = "";
  terminalLines.forEach(line => {
    setTimeout(() => {
      const div = document.createElement("div");
      if (line.prompt) {
        div.innerHTML =
          `<span class="t-prompt">${line.prompt}</span><span class="t-cmd">${line.cmd}</span>`;
      } else if (line.kv) {
        div.innerHTML =
          `<span class="t-key">"${line.kv[0]}"</span><span class="t-output">: </span><span class="t-val">"${line.kv[1]}"</span><span class="t-output">,</span>`;
      } else {
        div.innerHTML = `<span class="t-output">${line.output}</span>`;
      }
      termBody.appendChild(div);
    }, line.delay);
  });
}

// Trigger terminal animation when visible
const terminalEl = document.getElementById("terminalBox");
if (terminalEl) {
  const termObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      renderTerminal();
      termObs.unobserve(terminalEl);
    }
  }, { threshold: 0.3 });
  termObs.observe(terminalEl);
}

/* ---- Navbar mobile close on outside click ---- */
document.addEventListener("click", (e) => {
  const nav = document.querySelector(".navbar-collapse");
  const toggler = document.querySelector(".navbar-toggler");
  if (nav && nav.classList.contains("show") && !nav.contains(e.target) && !toggler.contains(e.target)) {
    toggler.click();
  }
});

/* ---- Year in footer ---- */
const yearEl = document.getElementById("footerYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();
