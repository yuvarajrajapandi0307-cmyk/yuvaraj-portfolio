// Small, dependency-free interactions for Yuvaraj's portfolio.
document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

// Reveal content as it enters the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Subtle pointer glow.
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", event => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}, { passive: true });

// Gentle 3D tilt on the code card, disabled for touch / reduced motion.
const card = document.querySelector(".tilt-card");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (card && window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
  card.addEventListener("pointermove", event => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 6}deg)`;
  });
  card.addEventListener("pointerleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}
