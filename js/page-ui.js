/* BookDrop — js/page-ui.js
   Спільні для сторінок «Мій простір» і «Спільнота» інтерфейсні деталі:
   перемикання теми, мобільне меню, поява секцій, анімовані числа,
   липкі пігулки розділів і вкладки. Підключати останнім (defer). */
(() => {
  "use strict";

  const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const toLocale = (value) => Number(value).toLocaleString("uk-UA").replace(/\u00A0/g, " ");

  /* ------------------------------------------------------------ тема сайту */

  function setupTheme() {
    const root = document.documentElement;
    const buttons = document.querySelectorAll("[data-theme-toggle]");
    if (!buttons.length) {
      return;
    }

    const sync = () => {
      const isLight = root.getAttribute("data-theme") === "light";
      buttons.forEach((button) => {
        button.setAttribute("aria-pressed", String(isLight));
        button.setAttribute("aria-label", isLight ? "Увімкнути темну тему" : "Увімкнути світлу тему");
        button.title = isLight ? "Темна тема" : "Світла тема";
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const isLight = root.getAttribute("data-theme") === "light";
        const nextTheme = isLight ? "dark" : "light";
        root.setAttribute("data-theme", nextTheme);
        root.classList.toggle("dark", nextTheme === "dark");
        try {
          localStorage.setItem("bookdrop-theme", isLight ? "dark" : "light");
          localStorage.removeItem("theme");
        } catch (error) { /* тема просто не збережеться */ }
        sync();
      });
    });

    sync();
  }

  /* -------------------------------------------------------- мобільне меню */

  function setupMobileMenu() {
    const button = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    if (!button || !menu) {
      return;
    }

    const icon = document.getElementById("mobile-menu-icon");
    const setOpen = (open) => {
      menu.classList.toggle("hidden", !open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Закрити головне меню" : "Відкрити головне меню");
      if (icon) {
        icon.className = open ? "fa-solid fa-xmark text-lg" : "fa-solid fa-bars text-lg";
      }
    };

    button.addEventListener("click", () => {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        button.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768 && button.getAttribute("aria-expanded") === "true") {
        setOpen(false);
      }
    });
  }

  /* -------------------------------------------------- поява та лічильники */

  function setupReveal() {
    const items = Array.from(document.querySelectorAll(".reveal"));
    if (!items.length) {
      return;
    }

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    items.forEach((item) => observer.observe(item));
  }

  function setupCounters() {
    const items = Array.from(document.querySelectorAll("[data-count]"));
    if (!items.length) {
      return;
    }

    if (prefersReducedMotion()) {
      items.forEach((item) => {
        item.textContent = toLocale(Number(item.dataset.count));
      });
      return;
    }

    items.forEach((element) => {
      const target = Number(element.dataset.count);
      if (!Number.isFinite(target)) {
        return;
      }
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min(1, (now - start) / 600);
        element.textContent = toLocale(Math.round(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    });
  }

  /* --------------------------------------------- липкі пігулки (Мій простір) */

  function setupSectionPills() {
    const pills = Array.from(document.querySelectorAll(".nav-pill[data-target]"));
    if (!pills.length) {
      return;
    }

    const sections = pills
      .map((pill) => document.getElementById(pill.dataset.target))
      .filter(Boolean);

    const activate = (id) => {
      pills.forEach((pill) => pill.classList.toggle("is-active", pill.dataset.target === id));
    };

    pills.forEach((pill) => {
      pill.addEventListener("click", (event) => {
        const target = document.getElementById(pill.dataset.target);
        if (!target) {
          return;
        }
        event.preventDefault();
        activate(pill.dataset.target);
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
        history.replaceState(null, "", `#${pill.dataset.target}`);
      });
    });

    if (!sections.length || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activate(entry.target.id);
        }
      });
    }, { rootMargin: "-150px 0px -55% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
  }

  /* ----------------------------------------------------- вкладки (Спільнота) */

  function setupTabs() {
    const tabs = Array.from(document.querySelectorAll("[data-tab]"));
    const panels = Array.from(document.querySelectorAll(".tabpanel"));
    if (!tabs.length || !panels.length) {
      return;
    }

    const activate = (name, { scroll = false } = {}) => {
      const panel = panels.find((item) => item.id === `panel-${name}`);
      if (!panel) {
        return;
      }

      tabs.forEach((tab) => {
        const selected = tab.dataset.tab === name;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((item) => {
        item.hidden = item !== panel;
      });

      if (scroll) {
        document.querySelector(".tabs-wrap")?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
      }

      history.replaceState(null, "", `#${panel.id.replace("panel-", "")}`);
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab.dataset.tab));
      tab.addEventListener("keydown", (event) => {
        const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (!step) {
          return;
        }
        event.preventDefault();
        const next = tabs[(index + step + tabs.length) % tabs.length];
        next.focus();
        activate(next.dataset.tab);
      });
    });

    document.querySelectorAll("[data-tab-target]").forEach((trigger) => {
      trigger.addEventListener("click", () => activate(trigger.dataset.tabTarget));
    });

    document.querySelectorAll("[data-jump]").forEach((trigger) => {
      trigger.addEventListener("click", () => activate(trigger.dataset.jump, { scroll: true }));
    });

    // Старі посилання на конкретні розділи тепер ведуть у відповідну вкладку
    const HASH_ALIASES = {
      "suggest-form": "more",
      privacy: "more",
      contacts: "more",
      rules: "more",
      suggest: "more",
      "review-form-title": "discussions",
    };

    // Пряме посилання (community.html#vote або #panel-vote) відкриває потрібну вкладку
    const rawHash = window.location.hash.replace("#", "");
    const hash = HASH_ALIASES[rawHash] || rawHash.replace("panel-", "");
    if (hash && panels.some((panel) => panel.id === `panel-${hash}`)) {
      activate(hash);
      if (rawHash && !rawHash.startsWith("panel-") && HASH_ALIASES[rawHash]) {
        const anchor = document.getElementById(rawHash);
        if (anchor) {
          anchor.scrollIntoView({ behavior: "auto", block: "start" });
        }
      }
    } else {
      const initial = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
      activate(initial.dataset.tab);
    }
  }

  setupTheme();
  setupMobileMenu();
  setupReveal();
  setupCounters();
  setupSectionPills();
  setupTabs();
})();
