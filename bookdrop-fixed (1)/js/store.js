/* BookDrop — js/store.js
   Спільне сховище (вішлист + прогрес читання) для всіх сторінок.
   Підключати ПІСЛЯ js/books.js і ПЕРЕД app.js / tracker.js. */
(() => {
  "use strict";

  const WISHLIST_KEY = "bookdrop-wishlist"; // масив id-рядків (той самий формат, що й раніше)
  const PROGRESS_KEY = "bookdrop-progress"; // { [bookId]: { readPages, totalPages } }

  // Якщо localStorage недоступний — працюємо з пам'яттю на час візиту
  const memory = { wishlist: [], progress: {} };


  /* ---------- Обкладинки ----------
     За замовчуванням — єдині стильні обкладинки, згенеровані з назви, автора й жанру.
     Оригінальні скани лишаються доступними через перемикач у футері. */
  const COVERS_KEY = "bookdrop-covers"; // "styled" (за замовчуванням) | "photo"
  let coverMode = "styled";
  try { coverMode = localStorage.getItem(COVERS_KEY) === "photo" ? "photo" : "styled"; } catch (error) { /* лишаємо стильні */ }

  const COVER_HUES = { thriller: 205, novel: 340, scifi: 250, fantasy: 160, horror: 355, other: 35 };

  function hashString(text) {
    let h = 5381;
    for (let i = 0; i < text.length; i += 1) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
    return h;
  }

  function xmlEscape(text) {
    return String(text).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  }

  function wrapTitle(title, maxChars, maxLines) {
    const lines = [];
    let line = "";
    title.split(/\s+/).forEach((word) => {
      if (!line) { line = word; return; }
      if ((line + " " + word).length <= maxChars) { line += " " + word; } else { lines.push(line); line = word; }
    });
    if (line) lines.push(line);
    if (lines.length > maxLines) {
      lines.length = maxLines;
      lines[maxLines - 1] = lines[maxLines - 1].replace(/[\s.,;:!?-]*$/, "").slice(0, Math.max(maxChars - 1, 1)) + "…";
    }
    return lines;
  }

  function decoration(kind, accent) {
    const f = `fill="none" stroke="${accent}" stroke-opacity="0.16" stroke-width="2"`;
    switch (kind) {
      case 0: return [60, 120, 180, 240, 300].map((r) => `<circle cx="400" cy="0" r="${r}" ${f}/>`).join("");
      case 1: return Array.from({ length: 14 }, (_, i) => `<line x1="${-100 + i * 50}" y1="600" x2="${200 + i * 50}" y2="0" ${f}/>`).join("");
      case 2: return Array.from({ length: 7 }, (_, r) => Array.from({ length: 5 }, (_, c) => `<circle cx="${50 + c * 75}" cy="${40 + r * 28}" r="3" fill="${accent}" fill-opacity="0.22"/>`).join("")).join("");
      case 3: return [260, 190, 120].map((size, i) => `<rect x="${330 - size / 2}" y="${90 - size / 2}" width="${size}" height="${size}" transform="rotate(45 330 90)" ${f} opacity="${1 - i * 0.2}"/>`).join("");
      default: return Array.from({ length: 6 }, (_, i) => `<path d="M0 ${60 + i * 22} Q100 ${30 + i * 22} 200 ${60 + i * 22} T400 ${60 + i * 22}" ${f}/>`).join("");
    }
  }

  function createCover(book) {
    const h = hashString(String(book.id));
    const base = COVER_HUES[book.category] ?? COVER_HUES.other;
    const hue = (base + (h % 36) - 18 + 360) % 360;
    const sat = book.category === "other" ? 18 : 50;
    const c1 = `hsl(${hue} ${sat}% 13%)`;
    const c2 = `hsl(${(hue + 24) % 360} ${sat + 8}% 29%)`;
    const accent = `hsl(${hue} ${Math.min(sat + 30, 85)}% 80%)`;

    const title = String(book.title || "");
    const longestWord = Math.max(...title.split(/\s+/).map((w) => w.length), 1);
    const size = Math.min(
      title.length <= 14 ? 56 : title.length <= 24 ? 46 : title.length <= 38 ? 38 : 31,
      Math.floor(316 / (longestWord * 0.6)),
    );
    const maxChars = Math.floor(320 / (size * 0.54));
    const lines = wrapTitle(title, maxChars, 6);
    const lh = Math.round(size * 1.18);
    const startY = 300 - (lines.length * lh) / 2 + size * 0.8;
    const titleSvg = lines.map((l, i) => `<text x="40" y="${Math.round(startY + i * lh)}">${xmlEscape(l)}</text>`).join("");

    let author = String(book.author || "");
    if (author.length > 30) author = author.slice(0, 29) + "…";
    const genre = xmlEscape(String(book.genre || "").toUpperCase().slice(0, 28));

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">`
      + `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`
      + `<rect width="400" height="600" fill="url(#g)"/>`
      + decoration(h % 5, accent)
      + `<rect x="14" y="14" width="372" height="572" rx="6" fill="none" stroke="${accent}" stroke-opacity="0.28" stroke-width="1.5"/>`
      + `<text x="40" y="70" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" letter-spacing="2.5" fill="${accent}">${genre}</text>`
      + `<rect x="40" y="86" width="44" height="3" fill="${accent}"/>`
      + `<g font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${size}" fill="#FFFFFF">${titleSvg}</g>`
      + `<text x="40" y="540" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="600" fill="${accent}">${xmlEscape(author)}</text>`
      + `<text x="40" y="566" font-family="Arial, Helvetica, sans-serif" font-size="11" letter-spacing="1.5" fill="#FFFFFF" fill-opacity="0.45">BOOKDROP.</text>`
      + `</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg).replace(/'/g, "%27")}`;
  }

  // Підміняємо cover у спільному масиві books, щоб app.js, matcher.js та інші теж бачили стильні обкладинки
  (Array.isArray(window.books) ? window.books : []).forEach((book) => {
    if (!book.coverPhoto) book.coverPhoto = book.cover;
    book.cover = coverMode === "styled" || !book.coverPhoto ? createCover(book) : book.coverPhoto;
  });

  const books = (Array.isArray(window.books) ? window.books : []).map((book) => ({
    ...book,
    alt: `Обкладинка книги «${book.title}»`,
    totalPages: book.pages || null,
    detailHref: `book-details.html?id=${encodeURIComponent(book.id)}`,
  }));
  const booksById = new Map(books.map((book) => [String(book.id), book]));

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return null; // null = сховище недоступне
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function getWishlistIds() {
    const stored = readJSON(WISHLIST_KEY, []);
    const list = Array.isArray(stored) ? stored.map(String) : memory.wishlist;
    return list.filter((id) => booksById.has(id));
  }

  function getWishlist() {
    return new Set(getWishlistIds());
  }

  function isInWishlist(id) {
    return getWishlist().has(String(id));
  }

  function getProgress() {
    const stored = readJSON(PROGRESS_KEY, {});
    return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : memory.progress;
  }

  function emit(name, detail) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  function wishlistLabel(count) {
    const lastTwo = count % 100;
    const last = count % 10;
    const noun = lastTwo >= 11 && lastTwo <= 14 ? "книг"
      : last === 1 ? "книга"
      : last >= 2 && last <= 4 ? "книги" : "книг";
    return `${count} ${noun}`;
  }

  function updateBadge() {
    const count = getWishlistIds().length;
    document.querySelectorAll(".wishlist-count").forEach((el) => { el.textContent = String(count); });
    document.querySelectorAll(".wishlist-badge").forEach((el) => {
      el.setAttribute("aria-label", `Перейти у вішлист, ${wishlistLabel(count)}`);
    });
  }

  // Синхронізує вигляд усіх кнопок-сердець на сторінці зі станом вішлиста
  function syncButtons() {
    const ids = getWishlist();
    document.querySelectorAll("[data-wishlist-button]").forEach((btn) => {
      const on = ids.has(String(btn.dataset.bookId));
      btn.setAttribute("aria-pressed", String(on));
      const icon = btn.querySelector("i");
      if (icon) {
        icon.className = on ? "fa-solid fa-heart text-indigo-400 text-sm" : "fa-regular fa-heart text-sm";
      }
      if (btn.hasAttribute("data-glyph")) {
        btn.textContent = on ? "♥" : "♡";
      }
      if (btn.dataset.title) {
        btn.setAttribute(
          "aria-label",
          `${on ? "Видалити з вішлиста" : "Додати у вішлист"}: ${btn.dataset.title}`,
        );
      }
    });
  }

  function toggleWishlist(id) {
    const bookId = String(id);
    if (!booksById.has(bookId)) {
      return { saved: false, removing: false };
    }
    const ids = getWishlistIds();
    const index = ids.indexOf(bookId);
    const removing = index > -1;
    if (removing) {
      ids.splice(index, 1);
    } else {
      ids.push(bookId);
    }
    memory.wishlist = ids;
    const saved = writeJSON(WISHLIST_KEY, ids);
    updateBadge();
    emit("bookdrop:wishlist-change", { ids: [...ids], bookId, removing, saved });
    syncButtons();
    return { saved, removing };
  }

  function saveProgress(id, entry) {
    const bookId = String(id);
    const progress = { ...getProgress() };
    progress[bookId] = {
      readPages: entry.readPages ?? null,
      totalPages: entry.totalPages ?? null,
    };
    memory.progress = progress;
    const saved = writeJSON(PROGRESS_KEY, progress);
    emit("bookdrop:progress-change", { bookId, saved });
    return saved;
  }

  // Єдиний обробник кліків для всіх кнопок вішлиста (працює й після перерендерингу)
  document.addEventListener("click", (event) => {
    const btn = event.target instanceof Element ? event.target.closest("[data-wishlist-button]") : null;
    if (!btn || !btn.dataset.bookId) {
      return;
    }
    event.preventDefault();
    toggleWishlist(btn.dataset.bookId);
  });

  // Зміни з іншої вкладки браузера
  window.addEventListener("storage", (event) => {
    if (event.key === WISHLIST_KEY) {
      updateBadge();
      syncButtons();
      emit("bookdrop:wishlist-change", { ids: getWishlistIds(), saved: true, external: true });
    } else if (event.key === PROGRESS_KEY) {
      emit("bookdrop:progress-change", { saved: true, external: true });
    }
  });

  window.BookDrop = Object.freeze({
    books,
    bookById: (id) => booksById.get(String(id)) || null,
    getWishlist,
    isInWishlist,
    toggleWishlist,
    getProgress,
    saveProgress,
    updateBadge,
    syncButtons,
    wishlistLabel,
  });

  function initCoverUi() {
    document.querySelectorAll("img[data-cover-id]").forEach((img) => {
      const book = booksById.get(String(img.dataset.coverId));
      if (book) { img.src = book.cover; }
    });

    const footer = document.querySelector(".site-footer");
    if (!footer || footer.querySelector("[data-cover-toggle]")) return;
    const host = footer.querySelector(".footer-brand") || footer;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "cover-toggle";
    button.dataset.coverToggle = "";
    button.textContent = coverMode === "styled" ? "Показати оригінальні обкладинки" : "Показати стильні обкладинки";
    button.addEventListener("click", () => {
      try { localStorage.setItem(COVERS_KEY, coverMode === "styled" ? "photo" : "styled"); } catch (error) { /* ignore */ }
      window.location.reload();
    });
    host.append(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCoverUi);
  } else {
    initCoverUi();
  }

  updateBadge();
})();
