const navigationItems = [
  { id: "home", label: "Overview", href: "index.html" },
  { id: "about", label: "About", href: "about.html" },
  { id: "experience", label: "Experience", href: "experience.html" },
  { id: "innovations", label: "AI & Engineering", href: "innovations.html" }
];

const currentPage = document.body.dataset.page || "home";
const header = document.getElementById("site-header");
const footer = document.getElementById("site-footer");

if (header) {
  header.innerHTML = `
    <nav class="navbar navbar-expand-lg site-nav sticky-top" aria-label="Main navigation">
      <div class="container">
        <a class="navbar-brand" href="index.html" aria-label="Executive technology leadership, home">
          <span class="brand-mark" aria-hidden="true">IT</span>
          <span>Technology Leadership<span class="brand-caption">Enterprise IT · Global Delivery</span></span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#primaryNavigation" aria-controls="primaryNavigation" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="primaryNavigation">
          <ul class="navbar-nav ms-auto align-items-lg-center">${navigationItems.map((item) => `<li class="nav-item"><a class="nav-link${currentPage === item.id ? " active" : ""}"${currentPage === item.id ? ' aria-current="page"' : ""} href="${item.href}">${item.label}</a></li>`).join("")}</ul>
          <a class="btn nav-contact${currentPage === "contact" ? " active" : ""}"${currentPage === "contact" ? ' aria-current="page"' : ""} href="contact.html">Contact <i class="bi bi-arrow-up-right ms-1" aria-hidden="true"></i></a>
        </div>
      </div>
    </nav>`;
}

if (footer) {
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container footer-inner">
      <span><span class="footer-signature">Technology Leadership</span> · Hyderabad, India</span>
      <span>© <span id="current-year"></span> · Built for what comes next.</span>
      <nav class="footer-links" aria-label="Footer navigation"><a href="about.html">About</a><a href="experience.html">Experience</a><a href="innovations.html">AI &amp; Engineering</a><a href="contact.html">Contact</a></nav>
    </div>`;
  const year = footer.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
}

const siteNav = document.querySelector(".site-nav");
const updateNavigation = () => siteNav?.classList.toggle("nav-scrolled", window.scrollY > 12);
updateNavigation();
window.addEventListener("scroll", updateNavigation, { passive: true });

const animateCounter = (element) => {
  const target = Number(element.dataset.count);
  if (!Number.isFinite(target)) return;
  const suffix = element.dataset.suffix || "";
  const duration = 900;
  const startedAt = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const counters = document.querySelectorAll("[data-count]");
if (counters.length && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.7 });
  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach(animateCounter);
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formStatus = document.getElementById("form-status");
    contactForm.classList.add("was-validated");
    if (!contactForm.checkValidity()) {
      formStatus.textContent = "Please review the highlighted fields.";
      contactForm.querySelector(":invalid")?.focus();
      return;
    }

    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(formData.get("subject").toString());
    const body = encodeURIComponent(`From: ${formData.get("name")} (${formData.get("email")})\n\n${formData.get("message")}`);
    formStatus.textContent = "Your email app is opening with the message prepared. Add the recipient address to publish this form.";
    window.location.href = `mailto:contact@example.com?subject=${subject}&body=${body}`;
  });
}