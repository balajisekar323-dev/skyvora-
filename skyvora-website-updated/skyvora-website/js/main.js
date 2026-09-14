document.addEventListener("DOMContentLoaded", () => {

  /* ---- Intro animation ---- */
  const intro = document.getElementById("intro");
  if (intro) {
    const hide = () => intro.classList.add("intro-hide");
    const already = sessionStorage.getItem("skyvora-intro-shown");
    if (already) {
      intro.classList.add("intro-hide");
    } else {
      setTimeout(hide, 1600);
      sessionStorage.setItem("skyvora-intro-shown", "1");
    }
  }

  /* ---- Sticky nav on scroll ---- */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => mobileMenu.classList.add("open"));
    if (closeMenu) closeMenu.addEventListener("click", () => mobileMenu.classList.remove("open"));
    mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));
  }

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }
});
