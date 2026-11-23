/* Portfolio — small enhancements. The page works fully without this file. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ----- Theme toggle (light ↔ dark, remembers choice) ----- */
  var THEME_KEY = "portfolio-theme";
  function readTheme() { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } }
  function saveTheme(v) { try { localStorage.setItem(THEME_KEY, v); } catch (e) { /* storage blocked */ } }

  var saved = readTheme();
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      saveTheme(next);
      themeBtn.setAttribute("aria-label", "Switch to " + (next === "dark" ? "light" : "dark") + " theme");
    });
  }

  /* ----- Mobile menu ----- */
  var menuBtn = document.getElementById("menu-toggle");
  var links = document.getElementById("nav-links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", function () {
      var open = links.getAttribute("data-open") === "true";
      links.setAttribute("data-open", String(!open));
      menuBtn.setAttribute("aria-expanded", String(!open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a") && window.matchMedia("(max-width: 760px)").matches) {
        links.setAttribute("data-open", "false");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----- Header hairline after scrolling ----- */
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- Highlight the nav link for the section in view ----- */
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if ("IntersectionObserver" in window && navAnchors.length) {
    var byId = {};
    navAnchors.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) { a.removeAttribute("aria-current"); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  /* ----- Copy buttons ----- */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.getElementById(btn.getAttribute("data-copy"));
      if (!target) return;
      var text = target.textContent.trim();
      function done(msg) {
        var original = btn.textContent;
        btn.textContent = msg;
        setTimeout(function () { btn.textContent = original; }, 1600);
      }
      function selectFallback() {
        var range = document.createRange();
        range.selectNodeContents(target);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        done("Selected");
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done("Copied"); }, selectFallback);
      } else {
        selectFallback();
      }
    });
  });

  /* ----- Footer year ----- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
