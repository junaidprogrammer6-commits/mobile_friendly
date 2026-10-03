const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");
const topBtn = document.getElementById("topBtn");
const themeBtn = document.getElementById("themeBtn");

// Light / dark theme toggle
(function () {
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("jq_theme");
    if (saved) root.dataset.theme = saved;
  } catch {
    /* storage unavailable, ignore */
  }
  themeBtn.addEventListener("click", () => {
    const isLight = root.dataset.theme === "light";
    root.dataset.theme = isLight ? "dark" : "light";
    try {
      localStorage.setItem("jq_theme", root.dataset.theme);
    } catch {
      /* storage unavailable, ignore */
    }
  });
})();

// Mobile menu toggle
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.textContent = nav.classList.contains("open") ? "✕" : "☰";
});
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

// FAQ accordion
document.querySelectorAll(".faq-item").forEach(item => {
  item.querySelector(".faq-q").addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(open => open.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
});

// Scroll progress bar
const progressBar = document.getElementById("progressBar");
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + "%";
}

// Active link on scroll + back-to-top visibility
function handleScroll() {
  topBtn.classList.toggle("show", window.scrollY > 400);
  updateProgress();

  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", handleScroll);
handleScroll();

topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Contact form -> saves to localStorage, then opens visitor's email app
const CONTACT_STORAGE_KEY = "jq_contact_messages";
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

function saveMessageLocally(entry) {
  try {
    const existing = JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) || "[]");
    existing.unshift(entry);
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    /* storage unavailable, ignore */
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const business = document.getElementById("business").value.trim();
  const message = document.getElementById("message").value.trim();

  saveMessageLocally({ name, email, business, message, date: new Date().toISOString() });

  formMsg.textContent = `Thanks ${name}! Your message was saved. Opening your email app...`;
  const body = `${message}\n\nFrom: ${name}\nEmail: ${email}\nBusiness: ${business || "-"}`;
  window.location.href = `mailto:junaidprogrammer6@gmail.com?subject=${encodeURIComponent("New project inquiry from " + name)}&body=${encodeURIComponent(body)}`;

  form.reset();
  setTimeout(() => (formMsg.textContent = ""), 5000);
});

document.getElementById("year").textContent = new Date().getFullYear();
