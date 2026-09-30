"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initMobileMenu();
  initHeaderScroll();
  initContactForm();
  initNewsletterForm();
  initReveal();
  initCounters();
});

function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function initMobileMenu() {
  const toggle = document.querySelector(".navbar__toggle");
  const menu = document.getElementById("menu-principal");

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú de navegación");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = form.querySelector(".form__status");
  const fields = Array.from(form.querySelectorAll("input, textarea"));

  const validators = {
    nombre: (value) =>
      value.trim().length >= 2 || "Escribe tu nombre completo.",
    email: (value) =>
      EMAIL_PATTERN.test(value.trim()) || "Ingresa un correo válido.",
    telefono: (value) =>
      value.trim() === "" ||
      /^[+\d\s()-]{7,}$/.test(value.trim()) ||
      "Ingresa un teléfono válido.",
    mensaje: (value) =>
      value.trim().length >= 10 ||
      "Cuéntanos un poco más (mínimo 10 caracteres).",
  };

  const setError = (field, message) => {
    const error = document.getElementById(`error-${field.name}`);
    if (!error) return;

    if (message) {
      error.textContent = message;
      error.hidden = false;
      field.setAttribute("aria-invalid", "true");
    } else {
      error.textContent = "";
      error.hidden = true;
      field.removeAttribute("aria-invalid");
    }
  };

  const validateField = (field) => {
    const validator = validators[field.name];
    if (!validator) return true;

    const result = validator(field.value);
    const isValid = result === true;
    setError(field, isValid ? "" : result);
    return isValid;
  };

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    status.hidden = true;
    status.className = "form__status";

    const invalidFields = fields.filter((field) => !validateField(field));
    if (invalidFields.length > 0) {
      invalidFields[0].focus();
      return;
    }

    form.reset();
    fields.forEach((field) => setError(field, ""));
    status.textContent =
      "¡Gracias! Tu mensaje fue enviado. Te responderemos muy pronto.";
    status.classList.add("form__status--success");
    status.hidden = false;
  });
}

function initNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  const input = form.querySelector("input[type='email']");
  const error = document.getElementById("error-newsletter");
  const status = form.querySelector(".form__status");

  const setError = (message) => {
    if (message) {
      error.textContent = message;
      error.hidden = false;
      input.setAttribute("aria-invalid", "true");
    } else {
      error.textContent = "";
      error.hidden = true;
      input.removeAttribute("aria-invalid");
    }
  };

  const validate = () => {
    const value = input.value.trim();
    if (value === "") {
      setError("Ingresa tu correo electrónico.");
      return false;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError("Ingresa un correo válido.");
      return false;
    }
    setError("");
    return true;
  };

  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true") validate();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    status.hidden = true;
    status.className = "form__status";

    if (!validate()) {
      input.focus();
      return;
    }

    form.reset();
    status.textContent = "¡Listo! Revisa tu correo para confirmar la suscripción.";
    status.classList.add("form__status--success");
    status.hidden = false;
  });
}

const REVEAL_SELECTOR = [
  ".section__header",
  ".about__text",
  ".about__image",
  ".card",
  ".testimonial",
  ".stat",
  ".contact__intro",
  ".contact__form",
  ".cta__inner",
].join(",");

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initReveal() {
  const elements = document.querySelectorAll(REVEAL_SELECTOR);
  if (elements.length === 0) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  elements.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

function initCounters() {
  const values = document.querySelectorAll(".stat__value");
  if (values.length === 0) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

  const animate = (el) => {
    const match = el.textContent.trim().match(/^(\D*)(\d+)(\D*)$/);
    if (!match) return;

    const [, prefix, digits, suffix] = match;
    const target = parseInt(digits, 10);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  values.forEach((el) => observer.observe(el));
}
