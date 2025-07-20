document.addEventListener("DOMContentLoaded", function () {
  const typingTexts = [
    "Frontend Web & Mobile Apps Developer",
    "Pengembang Frontend Web & Aplikasi Mobile",
    "Siap Kolaborasi Project Digital!",
  ];

  const typingElement = document.querySelector(".typing");
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = typingTexts[textIndex];
    let displayedText = currentText.slice(0, charIndex);
    typingElement.textContent = displayedText;

    if (!isDeleting && charIndex < currentText.length) {
      charIndex++;
      setTimeout(typeEffect, 80);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 40);
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
      } else {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(typeEffect, 500);
      }
    }
  }

  typeEffect();

  function animateSkillBars() {
    const skillSection = document.getElementById("skills");
    const rect = skillSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      document.querySelectorAll(".skill-bar").forEach((bar) => {
        bar.style.width = bar.getAttribute("data-width");
      });
      window.removeEventListener("scroll", animateSkillBars);
    }
  }
  window.addEventListener("scroll", animateSkillBars);
  window.addEventListener("load", animateSkillBars);

  function revealOnScroll() {
    document.querySelectorAll(".fade-in-up").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add("visible");
      }
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);

  const toggleBtn = document.querySelector(".toggle-dark");
  const toggleIcon = toggleBtn.querySelector("i");

  function setDarkMode(on) {
    document.body.classList.toggle("dark", on);
    toggleIcon.className = on ? "fas fa-sun" : "fas fa-moon";
    localStorage.setItem("darkmode", on ? "1" : "0");
  }

  toggleBtn.onclick = () =>
    setDarkMode(!document.body.classList.contains("dark"));

  (function () {
    const saved = localStorage.getItem("darkmode");
    if (
      saved === "1" ||
      (saved === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    }
  })();

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("nav");

  menuToggle.onclick = () => nav.classList.toggle("open");
  nav.querySelectorAll("a").forEach((link) => {
    link.onclick = () => nav.classList.remove("open");
  });

  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 70;
      const id = section.getAttribute("id");
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelectorAll("nav a")
          .forEach((a) => a.classList.remove("active"));
        const activeLink = document.querySelector(`nav a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  });
});
