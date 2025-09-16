/* ===== Velora Energy Scripts ===== */

// ===== Dynamic Year in Footer =====
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ===== Mobile Menu Toggle =====
const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuBtn?.addEventListener("click", () => {
  nav?.classList.toggle("open");
  if (nav?.classList.contains("open")) {
    nav.style.display = "flex";
  } else if (window.innerWidth < 840) {
    nav.style.display = "none";
  }
});

// ===== Scroll Reveal Animations =====
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal, .animate-fadein, .animate-slideup").forEach((el) =>
  io.observe(el)
);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== Contact Form (EmailJS) =====
(function () {
  emailjs.init("agvYhTDqGqzLOWOQF"); // your EmailJS public key
})();

const form = document.getElementById("contact-form");

form?.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    user_name: form.user_name.value,
    user_email: form.user_email.value,
    user_phone: form.user_phone.value,
    user_city: form.user_city.value,
    message: form.message.value,
  };

  // 1️⃣ Send THANK YOU to client
  emailjs
    .send("service_hyozrzj", "template_s3fux7m", formData)
    .then(() => {
      console.log("📨 Thank-you email sent to CLIENT ✔️");

      // 2️⃣ Send details to you
      return emailjs.send("service_hyozrzj", "template_tt014on", formData);
    })
    .then(() => {
      console.log("📩 Email sent to YOU ✔️");
      alert("✅ Message sent! Thank you for reaching out to Velora Energy.");
      form.reset();
    })
    .catch((error) => {
      console.error("❌ EmailJS error:", error);
      alert("⚠️ There was an error. Please try again later.");
    });
});

// ===== Highlight "Current Special" Bundle =====
const specialBundle = document.querySelector(".solar-bundle");

if (specialBundle) {
  // Add pulse effect on load
  specialBundle.classList.add("animate-pulse");

  // Remove pulse after a few seconds and fade in content
  setTimeout(() => {
    specialBundle.classList.remove("animate-pulse");
    specialBundle.classList.add("animate-fadein");
  }, 3500);
}