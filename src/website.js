const $ = (selector, root = document) => root.querySelector(selector);

function setYear() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function wireContactForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill out all fields.";
      return;
    }

    status.textContent = "Thanks! Your message is ready to send (hook up a backend to actually deliver it).";
    form.reset();
  });
}

setYear();
wireContactForm();

