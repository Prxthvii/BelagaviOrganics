/* =========================================================
   Belagavi Organics — Main UI script
   Handles: nav toggle, smooth scroll, scroll reveal, language
   switcher, header scroll state, back-to-top, animated logo SVG
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function getHeaderHeight() {
    const header = $(".site-header");
    return header ? header.offsetHeight : 70;
  }

  /* ---------- Scroll reveal observer ---------- */
  // Stored on window so other scripts (products.js) can add new elements
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
  );
  window.revealObserver = revealObserver;

  function observeReveals() {
    $$(".reveal:not(.is-visible)").forEach(el => revealObserver.observe(el));
  }

  /* ---------- Header scroll state ---------- */
  function handleHeaderScroll() {
    const header = $(".site-header");
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  function setupSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (!href || href === "#" || href.length < 2) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight();
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  function setupNavToggle() {
    const btn = $("#navToggle");
    const nav = $("#mainNav");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      btn.classList.toggle("open", isOpen);
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close nav when a link is clicked (mobile)
    nav.addEventListener("click", e => {
      if (e.target.tagName === "A" && window.innerWidth < 880) {
        nav.classList.remove("open");
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // Reset on resize to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 880) {
        nav.classList.remove("open");
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Language switcher ---------- */
  function setupLangSwitcher() {
    const btn = $("#langBtn");
    const menu = $("#langMenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", e => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    menu.addEventListener("click", e => {
      const li = e.target.closest("li[data-lang]");
      if (!li) return;
      const lang = li.getAttribute("data-lang");
      if (window.setLang) window.setLang(lang);
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });

    // Close when clicking outside
    document.addEventListener("click", e => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Back to top button ---------- */
  function setupBackToTop() {
    const btn = $("#toTop");
    if (!btn) return;

    const toggleVisibility = () => {
      btn.classList.toggle("visible", window.scrollY > 600);
    };

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
  }

  /* ---------- Animated logo SVG (leaf draws on load) ---------- */
  function animateLogo() {
    const logoSvgs = $$(".logo-mark svg");
    logoSvgs.forEach(svg => {
      const stem = svg.querySelector(".stem");
      const leaves = svg.querySelectorAll(".leaf");
      if (stem) {
        stem.style.strokeDasharray = "100";
        stem.style.strokeDashoffset = "100";
        stem.style.transition = "stroke-dashoffset 1.4s ease-out";
        // trigger after a tick
        requestAnimationFrame(() => {
          stem.style.strokeDashoffset = "0";
        });
      }
      leaves.forEach((leaf, i) => {
        leaf.style.opacity = "0";
        leaf.style.transformOrigin = "center";
        leaf.style.transform = "scale(0.5)";
        leaf.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        setTimeout(() => {
          leaf.style.opacity = "1";
          leaf.style.transform = "scale(1)";
        }, 700 + i * 250);
      });
    });
  }

  /* ---------- Catalogue iframe height tweak for small screens ---------- */
  function setupCatalogueFrame() {
    const iframe = $(".catalog-iframe");
    if (!iframe) return;
    const adjust = () => {
      if (window.innerWidth < 600) {
        iframe.style.height = "480px";
      } else if (window.innerWidth < 1024) {
        iframe.style.height = "600px";
      } else {
        iframe.style.height = "720px";
      }
    };
    adjust();
    window.addEventListener("resize", adjust);
  }

  /* ---------- Lazy image fade-in ---------- */
  function setupImageFade() {
    $$("img[loading='lazy']").forEach(img => {
      img.style.opacity = "0";
      img.style.transition = "opacity 0.5s ease";
      if (img.complete) {
        img.style.opacity = "1";
      } else {
        img.addEventListener("load", () => { img.style.opacity = "1"; });
      }
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    observeReveals();
    handleHeaderScroll();
    setupSmoothScroll();
    setupNavToggle();
    setupLangSwitcher();
    setupBackToTop();
    setupCatalogueFrame();
    setupImageFade();
    animateLogo();

    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  });

  // Re-observe reveals after window load (in case images shift layout)
  window.addEventListener("load", () => {
    observeReveals();
  });
})();
