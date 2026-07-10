/* ============================================================================
   Everwood Construction — interactive behavior only.
   No page content is rendered here. This file handles: the mobile drawer,
   same-page smooth-scroll, one fade-up-on-scroll animation, and the
   demo-mode quote form (validation + localStorage + confirmation).
   ========================================================================== */

const PROMISE_TEXT = "Free on-site estimate, no obligation, written quote within 3 business days";
// SOURCE OF TRUTH: js/client-data.js → promise field. Update both files together.

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------------- Mobile drawer */
  var toggle = document.querySelector(".nav-toggle");
  var drawer = document.getElementById("drawer");
  var scrim = document.querySelector(".scrim");
  var drawerClose = document.querySelector(".drawer-close");
  var lastFocused = null;

  function focusable() {
    if (!drawer) return [];
    return Array.prototype.slice.call(
      drawer.querySelectorAll('a[href], button:not([disabled])')
    );
  }

  function openDrawer() {
    if (!drawer) return;
    lastFocused = document.activeElement;
    drawer.classList.add("is-open");
    if (scrim) scrim.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    var f = focusable();
    if (f.length) f[0].focus();
  }

  function closeDrawer() {
    if (!drawer || !drawer.classList.contains("is-open")) return;
    drawer.classList.remove("is-open");
    if (scrim) scrim.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  if (toggle) toggle.addEventListener("click", openDrawer);
  if (scrim) scrim.addEventListener("click", closeDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeDrawer(); // close on link click
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!drawer || !drawer.classList.contains("is-open")) return;
    if (e.key === "Escape") { closeDrawer(); return; }
    if (e.key === "Tab") { // focus trap
      var f = focusable();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* --------------------------------------------------- Same-page smooth scroll */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (id === "#" || id.length < 2) return;
    var target = document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    if (history.replaceState) history.replaceState(null, "", id);
  });

  /* ------------------------------------------------- One fade-up-on-scroll anim */
  var faders = document.querySelectorAll(".fade-up");
  if (faders.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      faders.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      faders.forEach(function (el) { io.observe(el); });
    }
  }

  /* --------------------------------------------------------- Quote form (demo) */
  var form = document.getElementById("quote-form");
  if (!form) return;

  var memoryStore = []; // in-memory fallback if localStorage is unavailable

  function setError(field, msg) {
    var wrap = field.closest(".field");
    if (wrap) wrap.classList.add("has-error");
    field.setAttribute("aria-invalid", "true");
    var el = document.getElementById(field.id + "-error");
    if (el) el.textContent = msg;
  }
  function clearError(field) {
    var wrap = field.closest(".field");
    if (wrap) wrap.classList.remove("has-error");
    field.removeAttribute("aria-invalid");
    var el = document.getElementById(field.id + "-error");
    if (el) el.textContent = "";
  }

  var fName = form.querySelector("#name");
  var fPhone = form.querySelector("#phone");
  var fEmail = form.querySelector("#email");
  var fService = form.querySelector("#service");

  function validate() {
    var firstInvalid = null;
    [fName, fPhone, fEmail, fService].forEach(clearError);

    if (!fName.value.trim()) { setError(fName, "Please enter your name."); firstInvalid = firstInvalid || fName; }

    var digits = fPhone.value.replace(/\D/g, "");
    if (!fPhone.value.trim()) { setError(fPhone, "Please enter a phone number."); firstInvalid = firstInvalid || fPhone; }
    else if (digits.length < 7) { setError(fPhone, "Please enter a valid phone number."); firstInvalid = firstInvalid || fPhone; }

    if (!fEmail.value.trim()) { setError(fEmail, "Please enter your email."); firstInvalid = firstInvalid || fEmail; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail.value.trim())) { setError(fEmail, "Please enter a valid email address."); firstInvalid = firstInvalid || fEmail; }

    if (!fService.value) { setError(fService, "Please choose a service."); firstInvalid = firstInvalid || fService; }

    return firstInvalid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = validate();
    if (bad) { bad.focus(); return; }

    var lead = {
      name: fName.value.trim(),
      phone: fPhone.value.trim(),
      email: fEmail.value.trim(),
      service: fService.value,
      details: (form.querySelector("#details") || {}).value || "",
      savedAt: new Date().toISOString()
    };

    // Persist locally (demo mode). Wrapped so file:// or blocked storage can't break it.
    try {
      var key = "everwood_demo_leads";
      var existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push(lead);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (err) {
      memoryStore.push(lead); // in-memory fallback
    }

    var region = document.getElementById("form-status");
    var name = lead.name.split(" ")[0] || lead.name;
    var html =
      '<span class="demo-flag">Demo mode</span>' +
      '<h3>Thanks, ' + escapeHtml(name) + " — we’ll be in touch.</h3>" +
      "<p>Here’s our promise: " + PROMISE_TEXT + ".</p>" +
      "<p>This is a demo confirmation. Your details are saved only in this browser and have not been sent anywhere yet — a form backend must be wired up before this goes live.</p>" +
      '<p>Need to reach us now? <a href="tel:+15552148890">(555) 214-8890</a> · ' +
      '<a href="mailto:hello@everwoodconstruction.com">hello@everwoodconstruction.com</a></p>';

    if (region) {
      region.innerHTML = html;
      region.hidden = false;
      form.hidden = true;
      region.setAttribute("tabindex", "-1");
      region.focus({ preventScroll: false });
    }
  });

  /* -------------------------------------------------------- Cookie consent */
  /* Shows the banner once on first visit. A choice — or simply ignoring it —
     is remembered so the banner never reopens. No choice counts as a decline:
     a default "decline" is written the moment the banner is shown, then
     upgraded to "accept" only if the visitor clicks Accept. */
  function initCookieBanner() {
    var banner = document.getElementById("cookie-banner");
    if (!banner) return;

    var key = "everwood_cookie_consent";
    var stored = null;
    try { stored = localStorage.getItem(key); } catch (err) { stored = null; }
    if (stored) return; // already accepted or declined — never reopen

    function record(choice) {
      try { localStorage.setItem(key, choice); } catch (err) { /* storage blocked */ }
    }

    // Stamp a default decline so an ignored banner still counts as declined.
    record("decline");
    banner.classList.add("is-open");

    function dismiss(choice) {
      record(choice);
      banner.classList.remove("is-open");
    }

    var acceptBtn = banner.querySelector('[data-consent="accept"]');
    var declineBtn = banner.querySelector('[data-consent="decline"]');
    if (acceptBtn) acceptBtn.addEventListener("click", function () { dismiss("accept"); });
    if (declineBtn) declineBtn.addEventListener("click", function () { dismiss("decline"); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && banner.classList.contains("is-open")) dismiss("decline");
    });
  }

  initCookieBanner();

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
})();
