/* BookDrop — js/community-extras.js
   Головний блок, книга тижня, серія, таймер, бейджі, картка року, голосування, зустрічі. */
(() => {
  "use strict";

  const Store = window.BookDrop;
  const U = window.CommunityUtil;
  if (!Store || !U) return;
  const { KEYS, read, write, el, icon, plural, dayKey, hash, toast } = U;
  const $ = (sel) => document.querySelector(sel);
  const fmtLong = (d) => d.toLocaleDateString("uk-UA", { day: "numeric", month: "long" });
  const CATEGORY_LABELS = { thriller: "Трилер", novel: "Проза", scifi: "Фантастика", fantasy: "Фентезі", horror: "Горор", other: "Інше" };

  /* ================= Головний блок ================= */
  function renderHero() {
    const mosaic = $("[data-mosaic]");
    if (mosaic && !mosaic.children.length) {
      const rand = U.seededRandom(hash(dayKey()));
      const pool = U.sortedBooks();
      const picked = [];
      while (picked.length < 12 && pool.length) picked.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
      mosaic.replaceChildren(...picked.map((b, i) => {
        const img = el("img", "mosaic-cover"); img.src = b.cover; img.alt = ""; img.loading = "lazy"; img.style.setProperty("--i", i);
        return img;
      }));
    }
    const s = U.getStats();
    const reviews = 6 + s.posts;
    const values = { books: Store.books.length, clubs: U.CLUBS.length, reviews, streak: s.streak };
    const labels = {
      books: plural(values.books, "книга", "книги", "книг"),
      clubs: plural(values.clubs, "клуб", "клуби", "клубів"),
      reviews: plural(values.reviews, "відгук", "відгуки", "відгуків"),
      streak: plural(values.streak, "день серії", "дні серії", "днів серії"),
    };
    Object.keys(values).forEach((k) => {
      const box = $(`[data-hero-stat="${k}"]`);
      if (box) { box.querySelector("strong").textContent = String(values[k]); box.querySelector("span").textContent = labels[k]; }
    });
  }

  /* ================= Книга тижня та порада дня ================= */
  const TIPS = [
    "Читай 10 хвилин щодня — за рік це десяток книг без зусиль.",
    "Не дочитується? Відклади без провини: книга почекає свого настрою.",
    "Залишай закладку з нотаткою: одне речення про те, що зачепило.",
    "Чергуй важке з легким: після драми — щось тепле й смішне.",
    "Читай перед сном замість екрана — і засинатимеш швидше.",
    "Обговорюй прочитане з другом: вдвічі більше деталей запам’ятаєш.",
    "Бери з собою невелику книгу: черги та дорога стануть читанням.",
    "Спробуй жанр, який зазвичай оминаєш. Раптом це твоє?",
    "Став реальну ціль на місяць, а не на рік — так легше не здаватись.",
    "Перечитуй улюблене: другий раз помічаєш те, що пропустив у першому.",
    "Аудіокнига теж читання: прибирання з нею минає непомітно.",
    "Склади список «колись» у вішлисті — потім обирай за настроєм.",
    "Перші 50 сторінок — чесний шанс для будь-якої книги.",
    "Запиши, скільки сторінок прочитав, — видимий прогрес мотивує.",
  ];

  function renderWeek() {
    const root = $("[data-week-book]");
    if (root) {
      const now = new Date();
      const week = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 864e5));
      const pool = U.sortedBooks();
      const book = pool[(now.getFullYear() * 7 + week * 13) % pool.length];
      const cover = el("figure", "week-cover");
      const img = el("img"); img.src = book.cover; img.alt = book.alt; cover.append(img);
      const info = el("div", "week-info");
      const title = el("h3", "week-title", book.title);
      const wish = el("button", "btn btn-secondary btn-wishlist");
      wish.type = "button"; wish.dataset.wishlistButton = ""; wish.dataset.bookId = book.id; wish.dataset.title = book.title;
      const saved = Store.isInWishlist(book.id);
      wish.setAttribute("aria-pressed", String(saved));
      wish.setAttribute("aria-label", `${saved ? "Видалити з вішлиста" : "Додати у вішлист"}: ${book.title}`);
      const label = el("span", "", saved ? "У вішлисті" : "У вішлист");
      wish.append(icon(saved ? "fa-solid fa-heart" : "fa-regular fa-heart"), label);
      const more = el("a", "btn btn-primary", "Про книгу"); more.href = book.detailHref;
      const actions = el("div", "details-actions"); actions.append(more, wish);
      info.append(
        el("span", "details-genre", `${CATEGORY_LABELS[book.category] || book.genre} · ${book.genre}`),
        title, el("p", "details-author", book.author), el("p", "week-desc", book.description),
        el("p", "week-meta", `${book.pages} сторінок · напруга ${book.tension}/10`), actions,
      );
      const article = el("article", "week-card");
      article.append(cover, info);
      root.replaceChildren(article);
      window.addEventListener("bookdrop:wishlist-change", () => {
        const on = Store.isInWishlist(book.id);
        label.textContent = on ? "У вішлисті" : "У вішлист";
        const i = wish.querySelector("i");
        if (i) i.className = on ? "fa-solid fa-heart text-indigo-400 text-sm" : "fa-regular fa-heart text-sm";
      });
    }
    const tip = $("[data-tip]");
    if (tip) {
      const now = new Date();
      const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 864e5);
      tip.textContent = TIPS[dayOfYear % TIPS.length];
    }
  }

  /* ================= Серія читання ================= */
  function renderStreak() {
    const root = $("[data-streak]");
    if (!root) return;
    const info = U.streakInfo();
    const wrap = el("div", "streak");
    const top = el("div", "streak-top");
    const flame = el("span", "streak-flame"); flame.append(icon("fa-solid fa-fire"));
    const num = el("div");
    num.append(el("p", "streak-number", String(info.current)), el("p", "streak-caption", `${plural(info.current, "день", "дні", "днів")} поспіль`));
    top.append(flame, num);

    const dots = el("ul", "streak-dots");
    dots.setAttribute("aria-label", "Останні 7 днів");
    for (let i = 6; i >= 0; i -= 1) {
      const day = new Date(); day.setDate(day.getDate() - i);
      const on = info.set.has(dayKey(day));
      const li = el("li", `streak-dot${on ? " is-on" : ""}${i === 0 ? " is-today" : ""}`);
      li.append(el("span", "streak-dot-mark"), el("span", "streak-dot-label", day.toLocaleDateString("uk-UA", { weekday: "short" })));
      li.setAttribute("aria-label", `${fmtLong(day)}: ${on ? "читав" : "не читав"}`);
      dots.append(li);
    }

    const row = el("div", "btn-row");
    const btn = el("button", `btn ${info.markedToday ? "btn-secondary" : "btn-primary"}`, info.markedToday ? "Сьогодні відмічено" : "Читав сьогодні");
    btn.type = "button";
    if (info.markedToday) btn.prepend(icon("fa-solid fa-check"), document.createTextNode(" "));
    btn.addEventListener("click", () => {
      if (info.markedToday) { U.unmarkToday(); } else { U.markToday(); toast("Записано! Так тримати 🔥"); }
      $("[data-streak] .btn")?.focus();
    });
    row.append(btn);

    wrap.append(top, dots, row, el("p", "streak-note", `Найкраща серія: ${info.best} · Усього днів читання: ${info.total}`));
    root.replaceChildren(wrap);
  }

  /* ================= Таймер читання ================= */
  const timer = { duration: 25 * 60, remaining: 25 * 60, running: false, end: 0, id: null };
  const baseTitle = document.title;

  function fmtTime(sec) { return `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`; }

  function tick() {
    timer.remaining = Math.max(0, Math.round((timer.end - Date.now()) / 1000));
    updateTimerView();
    if (timer.remaining <= 0) finishTimer();
  }

  function finishTimer() {
    clearInterval(timer.id);
    timer.running = false;
    timer.remaining = timer.duration;
    document.title = baseTitle;
    write(KEYS.sessions, (Number(read(KEYS.sessions, 0)) || 0) + 1, { silent: true });
    U.markToday();
    toast("Сесію завершено! День читання записано.");
    window.dispatchEvent(new CustomEvent("community:change", { detail: { key: KEYS.sessions } }));
  }

  function updateTimerView() {
    const display = $("[data-timer-display]");
    if (display) display.textContent = fmtTime(timer.remaining);
    const ring = $("[data-timer-ring]");
    if (ring) ring.style.setProperty("--p", String(((timer.duration - timer.remaining) / timer.duration) * 100));
    document.title = timer.running ? `${fmtTime(timer.remaining)} · BookDrop.` : baseTitle;
  }

  function setupTimer() {
    const root = $("[data-timer]");
    if (!root) return;
    const toggle = root.querySelector("[data-timer-toggle]");
    const reset = root.querySelector("[data-timer-reset]");
    const presets = [...root.querySelectorAll("[data-timer-preset]")];

    function syncToggle() {
      toggle.textContent = timer.running ? "Пауза" : (timer.remaining < timer.duration ? "Продовжити" : "Старт");
      presets.forEach((b) => { b.disabled = timer.running; });
    }
    function stop() { clearInterval(timer.id); timer.running = false; }

    toggle.addEventListener("click", () => {
      if (timer.running) { stop(); } else {
        timer.running = true;
        timer.end = Date.now() + timer.remaining * 1000;
        timer.id = setInterval(() => { tick(); syncToggle(); }, 250);
      }
      syncToggle(); updateTimerView();
    });
    reset.addEventListener("click", () => { stop(); timer.remaining = timer.duration; syncToggle(); updateTimerView(); });
    presets.forEach((b) => b.addEventListener("click", () => {
      timer.duration = Number(b.dataset.timerPreset) * 60;
      timer.remaining = timer.duration;
      presets.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      syncToggle(); updateTimerView();
    }));
    window.addEventListener("community:change", syncToggle);
    syncToggle(); updateTimerView();
  }

  /* ================= Бейджі ================= */
  const BADGES = [
    { id: "first-save", icon: "fa-bookmark", title: "Перша закладка", desc: "Додай книгу у вішлист", val: (s) => s.saved, goal: 1 },
    { id: "collector", icon: "fa-layer-group", title: "Колекціонер", desc: "5 книг у вішлисті", val: (s) => s.saved, goal: 5 },
    { id: "finisher", icon: "fa-flag-checkered", title: "Перша прочитана", desc: "Дочитай книгу до кінця", val: (s) => s.finished, goal: 1 },
    { id: "bookworm", icon: "fa-book-open-reader", title: "Книгоїд", desc: "Дочитай 5 книг", val: (s) => s.finished, goal: 5 },
    { id: "pages500", icon: "fa-file-lines", title: "500 сторінок", desc: "Прочитай 500 сторінок", val: (s) => s.pagesRead, goal: 500 },
    { id: "pages2000", icon: "fa-mountain", title: "2000 сторінок", desc: "Прочитай 2000 сторінок", val: (s) => s.pagesRead, goal: 2000 },
    { id: "genres", icon: "fa-shapes", title: "Три жанри", desc: "Читай книги з 3 різних жанрів", val: (s) => s.genres, goal: 3 },
    { id: "voice", icon: "fa-comment-dots", title: "Голос спільноти", desc: "Напиши свій перший відгук", val: (s) => s.posts, goal: 1 },
    { id: "club", icon: "fa-users", title: "Клубний читач", desc: "Приєднайся до клубу", val: (s) => s.clubs, goal: 1 },
    { id: "streak3", icon: "fa-fire", title: "Три дні поспіль", desc: "Серія читання 3 дні", val: (s) => s.bestStreak, goal: 3 },
    { id: "streak7", icon: "fa-fire-flame-curved", title: "Тиждень читання", desc: "Серія читання 7 днів", val: (s) => s.bestStreak, goal: 7 },
    { id: "focus", icon: "fa-hourglass-half", title: "Фокус", desc: "Заверши сесію таймера", val: (s) => s.sessions, goal: 1 },
    { id: "voter", icon: "fa-check-to-slot", title: "Голосувальник", desc: "Проголосуй за книгу місяця", val: (s) => (s.voted ? 1 : 0), goal: 1 },
  ];

  function renderBadges() {
    const root = $("[data-badges]");
    if (!root) return;
    const s = U.getStats();
    const unlocked = BADGES.filter((b) => b.val(s) >= b.goal);

    const seenRaw = read(KEYS.badgesSeen, null);
    if (seenRaw === null) {
      write(KEYS.badgesSeen, unlocked.map((b) => b.id), { silent: true });
    } else {
      const seen = new Set(seenRaw);
      const fresh = unlocked.filter((b) => !seen.has(b.id));
      if (fresh.length) {
        write(KEYS.badgesSeen, [...seen, ...fresh.map((b) => b.id)], { silent: true });
        toast(`Нове досягнення: ${fresh.map((b) => `«${b.title}»`).join(", ")} 🏅`);
      }
    }

    const summary = $("[data-badges-summary]");
    if (summary) summary.textContent = `${unlocked.length} із ${BADGES.length}`;

    root.replaceChildren(...BADGES.map((b) => {
      const value = Math.min(b.val(s), b.goal);
      const on = value >= b.goal;
      const li = el("li", `badge${on ? " is-unlocked" : ""}`);
      const medal = el("span", "badge-medal"); medal.append(icon(`fa-solid ${on ? b.icon : "fa-lock"}`));
      const text = el("div");
      text.append(el("p", "badge-title", b.title), el("p", "badge-desc", b.desc), el("p", "badge-progress", on ? "Отримано" : `${value} / ${b.goal}`));
      li.append(medal, text);
      li.setAttribute("aria-label", `${b.title}: ${on ? "отримано" : `${value} із ${b.goal}`}`);
      return li;
    }));
  }

  /* ================= Картка «Мій рік у книгах» ================= */
  const canvas = $("[data-year-canvas]");
  let yearTimer;

  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  async function drawYear(withCovers) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const s = U.getStats();
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#121212"); grad.addColorStop(1, "#1E1B4B");
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    const glow = ctx.createRadialGradient(W * 0.85, H * 0.1, 10, W * 0.85, H * 0.1, 600);
    glow.addColorStop(0, "rgba(99,102,241,0.35)"); glow.addColorStop(1, "rgba(99,102,241,0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

    const font = (w, px) => `${w} ${px}px Inter, system-ui, sans-serif`;
    ctx.fillStyle = "#A5B4FC"; ctx.font = font(700, 34); ctx.fillText("BookDrop.", 80, 120);
    ctx.fillStyle = "#FFFFFF"; ctx.font = font(700, 96); ctx.fillText("Мій рік", 80, 270); ctx.fillText("у книгах 2026", 80, 380);

    const cells = [
      [s.finished, plural(s.finished, "книга прочитана", "книги прочитано", "книг прочитано")],
      [s.pagesRead.toLocaleString("uk-UA"), "сторінок усього"],
      [s.saved, "у вішлисті"],
      [s.bestStreak, "днів — найкраща серія"],
    ];
    cells.forEach(([value, label], i) => {
      const x = 80 + (i % 2) * 480, y = 500 + Math.floor(i / 2) * 220;
      ctx.fillStyle = "rgba(255,255,255,0.06)"; ctx.beginPath(); ctx.roundRect(x, y, 440, 190, 28); ctx.fill();
      ctx.fillStyle = "#818CF8"; ctx.font = font(700, 84); ctx.fillText(String(value), x + 32, y + 100);
      ctx.fillStyle = "#D4D4D8"; ctx.font = font(500, 30); ctx.fillText(label, x + 32, y + 150);
    });

    const shelf = [...s.finishedBooks, ...s.startedBooks, ...Store.books.filter((b) => Store.isInWishlist(b.id))]
      .filter((b, i, arr) => arr.findIndex((x) => x.id === b.id) === i).slice(0, 4);
    ctx.fillStyle = "#A1A1AA"; ctx.font = font(600, 30);
    ctx.fillText(shelf.length ? "МОЯ ПОЛИЦЯ" : "ДОДАЙ КНИГИ — І ТУТ З’ЯВЛЯТЬСЯ ОБКЛАДИНКИ", 80, 990);
    if (withCovers) {
      const images = await Promise.all(shelf.map((b) => loadImage(b.cover)));
      images.forEach((img, i) => {
        if (!img) return;
        const x = 80 + i * 240, y = 1020, w = 220, h = 300;
        ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, 14); ctx.clip(); ctx.drawImage(img, x, y, w, h); ctx.restore();
      });
    }
    ctx.fillStyle = "#71717A"; ctx.font = font(500, 26); ctx.fillText("Drop everything. Read the vibe.", 80, H - 20);
  }

  function scheduleYear() {
    if (!canvas) return;
    clearTimeout(yearTimer);
    yearTimer = setTimeout(async () => {
      try { await document.fonts?.ready; } catch (e) { /* шрифти не обов'язкові */ }
      await drawYear(true);
    }, 150);
  }

  function setupYear() {
    if (!canvas) return;
    const btn = $("[data-year-download]");
    btn?.addEventListener("click", async () => {
      const save = (blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob); a.download = "bookdrop-2026.png";
        document.body.append(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      };
      const toBlob = () => new Promise((resolve, reject) => {
        try { canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("empty"))), "image/png"); } catch (e) { reject(e); }
      });
      try { save(await toBlob()); } catch (e) {
        // Відкрито як file:// — браузер блокує експорт із обкладинками; зберігаємо без них
        await drawYear(false);
        try { save(await toBlob()); toast("Збережено без обкладинок: відкрий сайт через локальний сервер, щоб вони теж потрапили в картку."); } catch (err) { toast("Не вдалося зберегти картинку в цьому браузері."); }
        scheduleYear();
      }
    });
    scheduleYear();
  }

  /* ================= Голосування за книгу місяця ================= */
  const monthKey = () => dayKey().slice(0, 7);

  function candidates() {
    const key = monthKey();
    return ["thriller", "scifi", "fantasy", "novel"].map((cat) => {
      const pool = U.sortedBooks().filter((b) => b.category === cat);
      return pool[hash(`${key}-${cat}`) % pool.length];
    });
  }

  function renderVote() {
    const root = $("[data-vote]");
    if (!root) return;
    const key = monthKey();
    const list = candidates();
    const vote = read(KEYS.vote, null);
    const myId = vote && vote.month === key ? vote.bookId : null;
    const counts = list.map((b) => 25 + (hash(`${b.id}-${key}`) % 45) + (b.id === myId ? 1 : 0));
    const total = counts.reduce((a, b) => a + b, 0);

    const monthName = new Date().toLocaleDateString("uk-UA", { month: "long" });
    const title = $("[data-vote-month]"); if (title) title.textContent = monthName;

    const grid = el("ul", "vote-grid");
    list.forEach((book, i) => {
      const li = el("li");
      const card = el("article", `panel vote-card${book.id === myId ? " is-mine" : ""}`);
      const img = el("img", "vote-cover"); img.src = book.cover; img.alt = book.alt; img.loading = "lazy";
      const body = el("div", "vote-body");
      const link = el("a", "", book.title); link.href = book.detailHref;
      const h = el("h3", "vote-title"); h.append(link);
      body.append(h, el("p", "vote-author", book.author));

      if (myId) {
        const pct = Math.round((counts[i] / total) * 100);
        const bar = document.createElement("progress");
        bar.className = "vote-bar"; bar.max = 100; bar.value = pct;
        bar.setAttribute("aria-label", `Голоси за «${book.title}»`);
        body.append(el("p", "vote-percent", `${pct}% · ${counts[i]} ${plural(counts[i], "голос", "голоси", "голосів")}`), bar);
      }
      const btn = el("button", "club-join vote-btn", book.id === myId ? "Ваш вибір" : (myId ? "Змінити голос" : "Голосувати"));
      btn.type = "button"; btn.dataset.voteId = book.id;
      btn.setAttribute("aria-pressed", String(book.id === myId));
      btn.setAttribute("aria-label", `Проголосувати за «${book.title}»`);
      btn.addEventListener("click", () => {
        write(KEYS.vote, { month: key, bookId: book.id });
        toast(`Голос за «${book.title}» враховано`);
        document.querySelector(`[data-vote-id="${book.id}"]`)?.focus();
      });
      body.append(btn);
      card.append(img, body);
      li.append(card);
      grid.append(li);
    });

    const note = el("p", "community-section-note", myId
      ? `Усього голосів: ${total}. Переможця оголосимо наприкінці місяця — голоси ілюстративні й зберігаються лише у вашому браузері.`
      : "Проголосуй, щоб побачити, як розподілилися голоси.");
    note.setAttribute("aria-live", "polite");
    root.replaceChildren(grid, note);
  }

  /* ================= Календар зустрічей ================= */
  function nextMeetings() {
    const now = new Date();
    const out = [];
    U.CLUBS.forEach((club, i) => {
      for (let n = 0, found = 0; n < 21 && found < 2; n += 1) {
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + n, club.hour, club.minute);
        if (date.getDay() === club.weekday && date > now) {
          out.push({ club, index: i, date, key: `${club.id}-${dayKey(date).replaceAll("-", "")}` });
          found += 1;
        }
      }
    });
    return out.sort((a, b) => a.date - b.date).slice(0, 4);
  }

  function downloadIcs(m, book) {
    const p = (n) => String(n).padStart(2, "0");
    const stamp = (d) => `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
    const end = new Date(m.date.getTime() + 90 * 60000);
    const now = new Date();
    const lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//BookDrop//UK", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
      `UID:${m.key}@bookdrop`,
      `DTSTAMP:${now.getUTCFullYear()}${p(now.getUTCMonth() + 1)}${p(now.getUTCDate())}T${p(now.getUTCHours())}${p(now.getUTCMinutes())}00Z`,
      `DTSTART;TZID=Europe/Kyiv:${stamp(m.date)}`, `DTEND;TZID=Europe/Kyiv:${stamp(end)}`,
      `SUMMARY:Клуб «${m.club.name}»${book ? `: ${book.title}` : ""}`,
      `DESCRIPTION:Онлайн-зустріч книжкового клубу BookDrop. Час київський.`,
      "END:VEVENT", "END:VCALENDAR",
    ];
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = `${m.key}.ics`;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function renderMeetings() {
    const root = $("[data-meetings]");
    if (!root) return;
    const going = new Set(read(KEYS.meetings, []));
    root.replaceChildren(...nextMeetings().map((m) => {
      const book = U.clubBook(m.index);
      const on = going.has(m.key);
      const li = el("li");
      const card = el("article", "panel meeting");
      const date = el("div", "meeting-date");
      date.append(el("strong", "", String(m.date.getDate())), el("span", "", m.date.toLocaleDateString("uk-UA", { month: "short" })));
      const info = el("div", "meeting-info");
      info.append(el("h3", "meeting-title", m.club.name));
      const when = `${m.date.toLocaleDateString("uk-UA", { weekday: "long" })}, ${String(m.date.getHours()).padStart(2, "0")}:${String(m.date.getMinutes()).padStart(2, "0")} (київський час)`;
      info.append(el("p", "meeting-when", when));
      if (book) { const p = el("p", "meeting-book", "Обговорюємо: "); const a = el("a", "", book.title); a.href = book.detailHref; p.append(a); info.append(p); }
      const count = 12 + (hash(m.key) % 20) + (on ? 1 : 0);
      info.append(el("p", "meeting-count", `${count} ${plural(count, "учасник", "учасники", "учасників")} йдуть`));

      const actions = el("div", "meeting-actions");
      const go = el("button", "club-join", on ? "Ви йдете" : "Піду");
      go.type = "button"; go.dataset.meetingKey = m.key;
      go.setAttribute("aria-pressed", String(on));
      go.setAttribute("aria-label", `${on ? "Скасувати участь" : "Піду"}: ${m.club.name}, ${fmtLong(m.date)}`);
      go.addEventListener("click", () => {
        const set = new Set(read(KEYS.meetings, []));
        if (set.has(m.key)) set.delete(m.key); else { set.add(m.key); toast("Чекаємо вас на зустрічі!"); }
        write(KEYS.meetings, [...set]);
        document.querySelector(`[data-meeting-key="${m.key}"]`)?.focus();
      });
      const ics = el("button", "link-button", "У календар");
      ics.type = "button";
      ics.setAttribute("aria-label", `Додати до календаря: ${m.club.name}, ${fmtLong(m.date)}`);
      ics.addEventListener("click", () => downloadIcs(m, book));
      actions.append(go, ics);
      card.append(date, info, actions);
      li.append(card);
      return li;
    }));
  }

  /* ================= Оновлення ================= */
  function renderAll() {
    renderHero();
    renderStreak();
    renderBadges();
    renderVote();
    renderMeetings();
    scheduleYear();
  }

  window.addEventListener("community:change", renderAll);
  window.addEventListener("bookdrop:progress-change", renderAll);
  window.addEventListener("bookdrop:wishlist-change", renderAll);
  window.addEventListener("storage", renderAll);

  renderWeek();
  setupTimer();
  setupYear();
  renderAll();
})();
