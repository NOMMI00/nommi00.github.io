const header = document.querySelector(".site-header");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const toast = document.getElementById("toast");

// Intro loader: reveal the page once it has loaded (with a safety timeout)
const markLoaded = () => document.body.classList.add("loaded");
window.addEventListener("load", () => setTimeout(markLoaded, 500));
setTimeout(markLoaded, 2500);

const progressBar = document.getElementById("scrollProgress");

const onScroll = () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const closeMenu = () => {
  navLinks.classList.remove("open");
  menuBtn.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.classList.toggle("active", open);
  menuBtn.setAttribute("aria-expanded", open);
  document.body.classList.toggle("menu-open", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Highlight the nav link for the section currently on screen
const navMap = new Map();
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
  const section = document.querySelector(link.getAttribute("href"));
  if (section) navMap.set(section, link);
});

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navMap.forEach(link => link.classList.remove("active"));
      navMap.get(entry.target).classList.add("active");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

navMap.forEach((_, section) => navObserver.observe(section));

const metrics = document.querySelectorAll("[data-count]");
let metricsDone = false;

const countUp = (el) => {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const metricSection = document.querySelector(".metrics");
const metricObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !metricsDone) {
    metricsDone = true;
    metrics.forEach(countUp);
  }
}, { threshold: 0.3 });

if (metricSection) metricObserver.observe(metricSection);

const showToast = (text) => {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1700);
};

document.querySelectorAll("[data-copy]").forEach(btn => {
  btn.addEventListener("click", async () => {
    const value = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast(btn.dataset.copyLabel || "Copied!");
    } catch {
      alert(value);
    }
  });
});

// Contact sidebar drawer
const drawer = document.getElementById("contactDrawer");
const backdrop = document.getElementById("drawerBackdrop");
const drawerClose = document.getElementById("drawerClose");
const openers = document.querySelectorAll("[data-open-contact]");
let lastFocus = null;

const setDrawer = (open) => {
  drawer.classList.toggle("open", open);
  backdrop.classList.toggle("open", open);
  drawer.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("drawer-open", open);
  openers.forEach(btn => btn.setAttribute("aria-expanded", String(open)));
  if (open) {
    lastFocus = document.activeElement;
    drawerClose.focus();
  } else if (lastFocus) {
    lastFocus.focus();
  }
};

openers.forEach(btn => btn.addEventListener("click", (e) => {
  e.preventDefault();
  closeMenu();
  setDrawer(true);
}));
drawerClose.addEventListener("click", () => setDrawer(false));
backdrop.addEventListener("click", () => setDrawer(false));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && drawer.classList.contains("open")) setDrawer(false);
});

// Hide the side rail while the contact section itself is on screen
const sideRail = document.getElementById("sideRail");
const contactSection = document.getElementById("contact");

if (sideRail && contactSection) {
  new IntersectionObserver(entries => {
    sideRail.classList.toggle("hidden", entries[0].isIntersecting);
  }, { threshold: 0.25 }).observe(contactSection);
}

// Rotating word in the hero headline
const rotator = document.getElementById("rotator");
const words = ["mobile", "puzzle", "driving", "action"];
let wordIndex = 0;

if (rotator) {
  setInterval(() => {
    rotator.classList.add("out");
    setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotator.textContent = words[wordIndex];
      rotator.classList.remove("out");
      rotator.classList.add("in");
      requestAnimationFrame(() => requestAnimationFrame(() => rotator.classList.remove("in")));
    }, 350);
  }, 2600);
}

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// 3D tilt of the hero visual following the mouse
const hero = document.querySelector(".hero");
const heroVisual = document.querySelector(".hero-visual");

if (hero && heroVisual && canHover) {
  hero.addEventListener("mousemove", (e) => {
    if (!document.body.classList.contains("loaded")) return;
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    heroVisual.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  hero.addEventListener("mouseleave", () => {
    heroVisual.style.transform = "";
  });
}

// Spotlight that follows the cursor on cards, plus a slight tilt on game cards
document.querySelectorAll(".game-card, .skill-card, .project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    if (card.classList.contains("game-card") && canHover) {
      const rx = (y / r.height - 0.5) * -8;
      const ry = (x / r.width - 0.5) * 8;
      card.style.transform = `perspective(800px) translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Soft glow that follows the mouse around the page
if (canHover) {
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);
  window.addEventListener("mousemove", (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    glow.classList.add("active");
  }, { passive: true });
  document.addEventListener("mouseleave", () => glow.classList.remove("active"));
}

// Magnetic buttons: they lean toward the cursor
if (canHover) {
  document.querySelectorAll(".btn, .nav-cta").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.translate = `${x * 0.2}px ${y * 0.3}px`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.translate = ""; });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
