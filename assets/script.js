document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      mobileMenu.classList.toggle("closed", !open);
      menuButton.setAttribute("aria-expanded", String(open));
    });
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        mobileMenu.classList.add("closed");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active page link
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach(link => {
    const target = link.getAttribute("href").split("/").pop() || "index.html";
    if (target === page || (page === "" && target === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }

  // Simple counter animation
  document.querySelectorAll("[data-counter]").forEach(el => {
    const target = Number(el.dataset.counter);
    const suffix = el.dataset.suffix || "";
    let started = false;
    const startCounter = () => {
      if (started) return;
      started = true;
      const duration = 1200;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          startCounter();
          io.disconnect();
        }
      });
      io.observe(el);
    } else startCounter();
  });

  // Contact form validation + mailto handoff
  const form = document.querySelector("[data-inquiry-form]");
  if (form) {
    const status = document.querySelector("[data-form-status]");
    form.addEventListener("submit", event => {
      event.preventDefault();
      let valid = true;
      form.querySelectorAll("[required]").forEach(field => {
        const error = form.querySelector(`[data-error-for="${field.name}"]`);
        if (!field.value.trim()) {
          valid = false;
          field.classList.add("invalid");
          if (error) error.textContent = "This field is required.";
        } else {
          field.classList.remove("invalid");
          if (error) error.textContent = "";
        }
      });

      const email = form.elements.email;
      if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        valid = false;
        email.classList.add("invalid");
        const error = form.querySelector('[data-error-for="email"]');
        if (error) error.textContent = "Enter a valid email address.";
      }

      if (!valid) {
        status.innerHTML = '<div class="error-text">Please correct the highlighted fields and try again.</div>';
        return;
      }

      const data = new FormData(form);
      const subject = encodeURIComponent(`Aether Dux inquiry — ${data.get("messageType")}`);
      const body = encodeURIComponent(
        `Name: ${data.get("name")}\n` +
        `Email: ${data.get("email")}\n` +
        `Organization: ${data.get("organization")}\n` +
        `Inquiry type: ${data.get("messageType")}\n\n` +
        `${data.get("message")}`
      );

      // Replace this address with your real company inbox before deployment.
      window.location.href = `mailto:shonibareqadir00@gmail.com?subject=${subject}&body=${body}`;
      status.innerHTML = '<div class="success-box">Your email client should open with the inquiry pre-filled. If it does not, email us directly at <strong>hello@aetherdux.com</strong>.</div>';
      form.reset();
    });
  }

  // Current year
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
});
