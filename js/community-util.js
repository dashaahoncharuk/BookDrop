/* BookDrop — js/community-util.js
   Спільні утиліти сторінки «Спільнота». Підключати після store.js, до community*.js */
(() => {
  "use strict";

  const Store = window.BookDrop;
  const KEYS = {
    challenge: "bookdrop-challenge",
    clubs: "bookdrop-clubs",
    posts: "bookdrop-posts",
    likes: "bookdrop-post-likes",
    replies: "bookdrop-replies",
    streak: "bookdrop-streak",
    sessions: "bookdrop-timer-sessions",
    vote: "bookdrop-vote",
    meetings: "bookdrop-meetings",
    badgesSeen: "bookdrop-badges-seen",
  };
  const memory = {};

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : (memory[key] ?? fallback);
    } catch (e) {
      return memory[key] ?? fallback;
    }
  }

  function write(key, value, { silent = false } = {}) {
    memory[key] = value;
    let ok = true;
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { ok = false; }
    if (!silent) window.dispatchEvent(new CustomEvent("community:change", { detail: { key } }));
    return ok;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function icon(classes) {
    const i = el("i", classes);
    i.setAttribute("aria-hidden", "true");
    return i;
  }

  function plural(n, one, few, many) {
    const t = n % 100, l = n % 10;
    if (t >= 11 && t <= 14) return many;
    if (l === 1) return one;
    if (l >= 2 && l <= 4) return few;
    return many;
  }

  const pad = (n) => String(n).padStart(2, "0");
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  function hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i += 1) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return h;
  }

  function seededRandom(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const sortedBooks = () => [...Store.books].sort((a, b) => a.id.localeCompare(b.id));

  /* ---- Серія читання ---- */
  function streakInfo() {
    const set = new Set(read(KEYS.streak, []));
    const cursor = new Date();
    if (!set.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    let current = 0;
    while (set.has(dayKey(cursor))) { current += 1; cursor.setDate(cursor.getDate() - 1); }

    let best = 0, run = 0, prev = null;
    [...set].sort().forEach((k) => {
      const d = new Date(`${k}T00:00:00`);
      run = prev && Math.round((d - prev) / 86400000) === 1 ? run + 1 : 1;
      best = Math.max(best, run);
      prev = d;
    });
    return { current, best, total: set.size, markedToday: set.has(dayKey()), set };
  }

  function markToday() {
    const days = new Set(read(KEYS.streak, []));
    if (days.has(dayKey())) return false;
    days.add(dayKey());
    write(KEYS.streak, [...days].sort());
    return true;
  }

  function unmarkToday() {
    const days = new Set(read(KEYS.streak, []));
    days.delete(dayKey());
    write(KEYS.streak, [...days].sort());
  }

  /* ---- Клуби (спільні дані) ---- */
  const CLUBS = [
    { id: "night", icon: "fa-moon", name: "Нічні детективи", desc: "Трилери й детективи, після яких важко заснути. Без спойлерів у перші дні.", category: "thriller", members: 128, weekday: 4, hour: 20, minute: 0 },
    { id: "worlds", icon: "fa-dragon", name: "Інші світи", desc: "Фентезі та фантастика: від епічних саг до камерних історій про майбутнє.", category: "fantasy", members: 94, weekday: 6, hour: 18, minute: 0 },
    { id: "slow", icon: "fa-mug-hot", name: "Повільне читання", desc: "Проза для неспішних вечорів: емоції, герої, цитати та чашка чогось теплого.", category: "novel", members: 156, weekday: 0, hour: 19, minute: 0 },
  ];

  function clubBook(index) {
    const club = CLUBS[index];
    const pool = sortedBooks().filter((b) => b.category === club.category);
    return pool[(index * 7) % Math.max(pool.length, 1)] || null;
  }

  /* ---- Статистика для бейджів і картки року ---- */
  function getStats() {
    const progress = Store.getProgress();
    let started = 0, finished = 0, pagesRead = 0;
    const genres = new Set();
    const finishedBooks = [], startedBooks = [];
    Store.books.forEach((book) => {
      const entry = progress[book.id];
      const readPages = Number(entry?.readPages);
      if (!Number.isFinite(readPages) || readPages <= 0) return;
      const total = entry?.totalPages ?? book.totalPages;
      started += 1;
      pagesRead += readPages;
      genres.add(book.category);
      startedBooks.push(book);
      if (total && readPages >= total) { finished += 1; finishedBooks.push(book); }
    });
    const posts = read(KEYS.posts, []);
    const streak = streakInfo();
    return {
      saved: Store.getWishlist().size,
      started, finished, pagesRead, finishedBooks, startedBooks,
      genres: genres.size,
      posts: Array.isArray(posts) ? posts.length : 0,
      clubs: (read(KEYS.clubs, []) || []).length,
      streak: streak.current, bestStreak: streak.best, streakDays: streak.total,
      sessions: Number(read(KEYS.sessions, 0)) || 0,
      voted: Boolean(read(KEYS.vote, null)),
    };
  }

  /* ---- Підказки (toast) ---- */
  let toastTimer;
  function toast(message) {
    const region = document.querySelector("[data-toast]");
    if (!region) return;
    const item = el("p", "toast", message);
    region.replaceChildren(item);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => region.replaceChildren(), 4500);
  }

  window.CommunityUtil = Object.freeze({
    KEYS, read, write, el, icon, plural, dayKey, hash, seededRandom, sortedBooks,
    streakInfo, markToday, unmarkToday, CLUBS, clubBook, getStats, toast,
  });
})();
