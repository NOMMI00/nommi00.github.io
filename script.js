const header = document.querySelector(".site-header");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const copyBtn = document.getElementById("copyEmail");
const toast = document.getElementById("toast");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.classList.toggle("active", open);
  menuBtn.setAttribute("aria-expanded", open);
  document.body.classList.toggle("menu-open", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
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

const metrics = document.querySelectorAll("[data-count]");
let metricsDone = false;

const countUp = (el) => {
  const target = Number(el.dataset.count);
  let current = 0;
  const duration = 900;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    current = Math.floor(target * progress);
    el.textContent = target === 100 ? current + "%" : current + (target === 2 ? "+" : "");
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

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1700);
    } catch {
      alert(email);
    }
  });
}

document.querySelectorAll(".demo-link").forEach(link => {
  link.addEventListener("click", (e) => {
    if (link.getAttribute("href") === "#") {
      e.preventDefault();
      toast.textContent = "Replace this demo link with your real project/profile URL.";
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        toast.textContent = "Email copied!";
      }, 2200);
    }
  });
});
