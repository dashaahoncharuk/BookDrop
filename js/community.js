/* BookDrop — js/community.js
   Челендж, клуби та обговорення (фільтри, відгуки, відповіді). Дані — лише в браузері. */
(() => {
  "use strict";

  const Store = window.BookDrop;
  const U = window.CommunityUtil;
  if (!Store || !U) return;
  const { KEYS, read, write, el, icon, plural } = U;

  const CATEGORY_LABELS = { thriller: "Трилер", novel: "Проза", scifi: "Фантастика", fantasy: "Фентезі", horror: "Горор", other: "Інше" };

  /* ---------------- Челендж ---------------- */
  const chRoot = document.querySelector("[data-challenge]");

  function renderChallenge() {
    if (!chRoot) return;
    const state = read(KEYS.challenge, null);
    const goal = state && Number.isInteger(state.goal) ? state.goal : null;
    const finished = U.getStats().finished;

    const left = el("div");
    const form = el("form", "challenge-form");
    form.noValidate = true;

    if (goal) {
      const done = Math.min(finished, goal);
      left.append(
        el("p", "challenge-number", `${done} / ${goal}`),
        el("p", "challenge-caption", `${plural(goal, "книга", "книги", "книг")} у челенджі 2026`),
      );
      const bar = document.createElement("progress");
      bar.className = "challenge-bar";
      bar.max = goal;
      bar.value = done;
      bar.setAttribute("aria-label", "Прогрес челенджу");
      const status = el("p", "challenge-status",
        finished >= goal
          ? "Ціль досягнуто — вітаємо!"
          : `Ще ${goal - finished} ${plural(goal - finished, "книга", "книги", "книг")}. Позначай прочитане в «Моєму просторі».`);
      status.setAttribute("aria-live", "polite");
      left.append(bar, status);
    } else {
      left.append(
        el("p", "challenge-number", "2026"),
        el("p", "challenge-caption", "Обери, скільки книг хочеш прочитати за рік. Прогрес рахується автоматично з «Мого простору»."),
      );
    }

    const field = el("div", "field");
    const label = el("label", "", goal ? "Змінити ціль (книг)" : "Скільки книг у цілі?");
    label.htmlFor = "challenge-goal";
    const input = document.createElement("input");
    input.type = "number"; input.id = "challenge-goal"; input.min = "1"; input.max = "100"; input.step = "1";
    input.value = goal ? String(goal) : "12";
    input.setAttribute("aria-describedby", "challenge-error");
    const error = el("p", "field-error"); error.id = "challenge-error"; error.setAttribute("aria-live", "polite");
    field.append(label, input, error);

    const row = el("div", "btn-row");
    const submit = el("button", "btn btn-primary", goal ? "Зберегти ціль" : "Почати челендж");
    submit.type = "submit";
    row.append(submit);
    if (goal) {
      const reset = el("button", "link-button", "Скинути челендж");
      reset.type = "button";
      reset.addEventListener("click", () => write(KEYS.challenge, null));
      row.append(reset);
    }
    form.append(field, row);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = Number(input.value);
      if (!Number.isInteger(value) || value < 1 || value > 100) {
        input.setAttribute("aria-invalid", "true");
        error.textContent = "Вкажи ціле число від 1 до 100.";
        input.focus();
        return;
      }
      write(KEYS.challenge, { goal: value });
      document.querySelector("#challenge-goal")?.focus();
    });

    const panel = el("div", "challenge");
    panel.append(left, form);
    chRoot.replaceChildren(panel);
  }

  /* ---------------- Клуби ---------------- */
  const clubsRoot = document.querySelector("[data-clubs]");

  function renderClubs() {
    if (!clubsRoot) return;
    const joined = new Set(read(KEYS.clubs, []));
    clubsRoot.replaceChildren(...U.CLUBS.map((club, i) => {
      const book = U.clubBook(i);
      const on = joined.has(club.id);
      const card = el("li");
      const article = el("article", "panel club-card");
      const iconBox = el("span", "club-icon");
      iconBox.append(icon(`fa-solid ${club.icon}`));
      article.append(iconBox, el("h3", "club-name", club.name), el("p", "club-desc", club.desc));

      if (book) {
        const reading = el("div", "club-reading");
        const img = el("img"); img.src = book.cover; img.alt = ""; img.loading = "lazy";
        const info = el("div");
        const link = el("a", "", book.title); link.href = book.detailHref;
        info.append(el("p", "club-reading-label", "Читаємо зараз"), link);
        reading.append(img, info);
        article.append(reading);
      }

      const footer = el("footer", "club-footer");
      const members = club.members + (on ? 1 : 0);
      footer.append(el("span", "club-members", `${members} ${plural(members, "учасник", "учасники", "учасників")}`));
      const btn = el("button", "club-join", on ? "Ви в клубі" : "Приєднатися");
      btn.type = "button";
      btn.dataset.clubId = club.id;
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", `${on ? "Вийти з клубу" : "Приєднатися до клубу"} «${club.name}»`);
      btn.addEventListener("click", () => {
        const set = new Set(read(KEYS.clubs, []));
        if (set.has(club.id)) set.delete(club.id); else { set.add(club.id); U.toast(`Ви приєдналися до клубу «${club.name}»`); }
        write(KEYS.clubs, [...set]);
        clubsRoot.querySelector(`[data-club-id="${club.id}"]`)?.focus();
      });
      footer.append(btn);
      article.append(footer);
      card.append(article);
      return card;
    }));
  }

  /* ---------------- Обговорення ---------------- */
  const postsRoot = document.querySelector("[data-posts]");
  const postsCount = document.querySelector("[data-posts-count]");
  const reviewForm = document.querySelector("[data-review-form]");
  const filters = {
    q: document.querySelector("#post-search"),
    category: document.querySelector("#post-category"),
    sort: document.querySelector("#post-sort"),
    mine: document.querySelector("#post-mine"),
  };
  const openReplies = new Set();

  const d = (y, m, day) => new Date(y, m - 1, day, 12).getTime();
  const SEED = [
    { id: "seed-1", bookId: "book-003", name: "Олена", rating: 5, likes: 14, ts: d(2026, 10, 12), text: "Думала, що фантастика — не моє, але «Дюна» затягнула з перших розділів. Політика, екологія й вибір героя — усе працює разом." },
    { id: "seed-2", bookId: "book-001", name: "Максим", rating: 4, likes: 9, ts: d(2026, 10, 3), text: "Фінал справді несподіваний. Раджу не читати відгуків перед початком — саме тому BookDrop без спойлерів." },
    { id: "seed-3", bookId: "book-002", name: "Ірина", rating: 5, likes: 21, ts: d(2026, 9, 27), text: "Читала за два вечори. Кожна історія про кохання змушує переосмислити, чого насправді хоче людина." },
    { id: "seed-4", bookId: "book-041", name: "Тарас", rating: 5, likes: 17, ts: d(2026, 10, 20), text: "Повільний старт, але потім не відірватися. Рекомендую читати з тими, хто теж в курсі — є що обговорити." },
    { id: "seed-5", bookId: "book-146", name: "Софія", rating: 4, likes: 11, ts: d(2026, 10, 25), text: "Коротка, моторошна й дуже візуальна. Ідеально для одного вечора з увімкненим світлом." },
    { id: "seed-6", bookId: "book-007", name: "Дмитро", rating: 5, likes: 26, ts: d(2026, 10, 30), text: "Після цієї книги по-іншому дивишся на новини. Сумно, що вона досі настільки актуальна." },
  ];
  const SEED_REPLIES = {
    "seed-1": [{ id: "sr-1", name: "Андрій", ts: d(2026, 10, 13), text: "Згоден! Раджу після книги ще глянути екранізацію — цікаво порівняти." }],
    "seed-2": [{ id: "sr-2", name: "Марічка", ts: d(2026, 10, 4), text: "Теж не вгадала розв’язку. Ось що значить без спойлерів." }],
    "seed-6": [{ id: "sr-3", name: "Олена", ts: d(2026, 10, 31), text: "Класика, до якої варто повертатися." }],
  };

  const formatDate = (ts) => new Date(ts).toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });

  function ownPosts() {
    const own = read(KEYS.posts, []);
    return Array.isArray(own) ? own : [];
  }

  function repliesFor(postId) {
    const own = (read(KEYS.replies, {})[postId] || []).map((r) => ({ ...r, own: true }));
    return [...(SEED_REPLIES[postId] || []), ...own];
  }

  function visiblePosts(liked) {
    const q = (filters.q?.value || "").trim().toLowerCase();
    const cat = filters.category?.value || "all";
    const mine = Boolean(filters.mine?.checked);
    const list = [...ownPosts().map((p) => ({ ...p, own: true })), ...SEED]
      .map((p) => ({ ...p, book: Store.bookById(p.bookId) }))
      .filter((p) => p.book)
      .filter((p) => cat === "all" || p.book.category === cat)
      .filter((p) => !mine || p.own)
      .filter((p) => !q || [p.book.title, p.book.author, p.name, p.text].some((v) => String(v).toLowerCase().includes(q)));
    const score = (p) => (p.likes || 0) + (liked.has(p.id) ? 1 : 0) + repliesFor(p.id).length * 2;
    list.sort(filters.sort?.value === "popular" ? (a, b) => score(b) - score(a) || b.ts - a.ts : (a, b) => b.ts - a.ts);
    return list;
  }

  function createReplies(post) {
    const wrap = el("div", "replies");
    const list = el("ul", "replies-list");
    repliesFor(post.id).forEach((r) => {
      const item = el("li", "reply");
      item.append(el("p", "reply-meta", `${r.own ? "Ви" : r.name} · ${formatDate(r.ts)}`), el("p", "reply-text", r.text));
      list.append(item);
    });
    const form = el("form", "reply-form");
    form.noValidate = true;
    const input = document.createElement("input");
    input.type = "text"; input.maxLength = 300; input.placeholder = "Твоя відповідь…"; input.autocomplete = "off";
    input.id = `reply-${post.id}`;
    input.setAttribute("aria-label", `Відповісти на відгук про «${post.book.title}»`);
    const send = el("button", "btn btn-primary btn-sm", "Надіслати"); send.type = "submit";
    const err = el("p", "field-error reply-error"); err.setAttribute("aria-live", "polite");
    form.append(input, send, err);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const text = input.value.trim();
      if (text.length < 3) { err.textContent = "Напиши хоча б 3 символи."; input.setAttribute("aria-invalid", "true"); input.focus(); return; }
      const all = { ...read(KEYS.replies, {}) };
      all[post.id] = [...(all[post.id] || []), { id: `r-${Date.now()}`, ts: Date.now(), text }].slice(-30);
      openReplies.add(post.id);
      write(KEYS.replies, all);
      document.querySelector(`#reply-${post.id}`)?.focus();
    });
    wrap.append(list, form);
    return wrap;
  }

  function renderPosts() {
    if (!postsRoot) return;
    const liked = new Set(read(KEYS.likes, []));
    const total = ownPosts().length + SEED.length;
    const posts = visiblePosts(liked);
    if (postsCount) postsCount.textContent = posts.length === total
      ? `${total} ${plural(total, "відгук", "відгуки", "відгуків")}`
      : `${posts.length} із ${total}`;

    if (!posts.length) {
      const empty = el("li", "posts-empty");
      empty.append(el("p", "", "Нічого не знайдено. Спробуй інший запит або жанр."));
      const reset = el("button", "link-button", "Скинути фільтри");
      reset.type = "button";
      reset.addEventListener("click", resetFilters);
      empty.append(reset);
      postsRoot.replaceChildren(empty);
      return;
    }

    postsRoot.replaceChildren(...posts.map((post) => {
      const { book } = post;
      const item = el("li");
      item.dataset.postId = post.id;
      const article = el("article", "post");

      const head = el("div", "post-head");
      const img = el("img", "post-cover"); img.src = book.cover; img.alt = book.alt; img.loading = "lazy";
      const info = el("div");
      const title = el("h3", "post-book");
      const link = el("a", "", book.title); link.href = book.detailHref; title.append(link);
      info.append(title, el("p", "post-meta", `${book.author} · ${post.name} · ${formatDate(post.ts)}`));
      head.append(img, info, el("span", "post-rating", `★ ${post.rating}/5`));

      const actions = el("div", "post-actions");
      const isLiked = liked.has(post.id);
      const like = el("button", "post-like");
      like.type = "button";
      like.setAttribute("aria-pressed", String(isLiked));
      like.setAttribute("aria-label", `${isLiked ? "Прибрати вподобання" : "Подобається"}: відгук про «${book.title}»`);
      like.append(icon(isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"), document.createTextNode(String((post.likes || 0) + (isLiked ? 1 : 0))));
      like.addEventListener("click", () => {
        const set = new Set(read(KEYS.likes, []));
        if (set.has(post.id)) set.delete(post.id); else set.add(post.id);
        write(KEYS.likes, [...set]);
        postsRoot.querySelector(`[data-post-id="${post.id}"] .post-like`)?.focus();
      });

      const count = repliesFor(post.id).length;
      const isOpen = openReplies.has(post.id);
      const toggle = el("button", "post-like", `Відповіді (${count})`);
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.addEventListener("click", () => {
        if (openReplies.has(post.id)) openReplies.delete(post.id); else openReplies.add(post.id);
        renderPosts();
        postsRoot.querySelector(`[data-post-id="${post.id}"] [aria-expanded]`)?.focus();
      });
      actions.append(like, toggle);

      if (post.own) {
        const del = el("button", "link-button", "Видалити");
        del.type = "button";
        del.addEventListener("click", () => {
          const replies = { ...read(KEYS.replies, {}) };
          delete replies[post.id];
          write(KEYS.replies, replies, { silent: true });
          write(KEYS.posts, ownPosts().filter((p) => p.id !== post.id));
          document.querySelector("#review-book")?.focus();
        });
        actions.append(del, el("span", "post-tag", "Ваш відгук"));
      } else {
        actions.append(el("span", "post-tag", "Ілюстративний відгук"));
      }

      article.append(head, el("p", "post-text", post.text), actions);
      if (isOpen) article.append(createReplies(post));
      item.append(article);
      return item;
    }));
  }

  function resetFilters() {
    if (filters.q) filters.q.value = "";
    if (filters.category) filters.category.value = "all";
    if (filters.sort) filters.sort.value = "new";
    if (filters.mine) filters.mine.checked = false;
    renderPosts();
  }

  function setupFilters() {
    if (filters.category) {
      Object.entries(CATEGORY_LABELS).forEach(([value, text]) => {
        const o = el("option", "", text); o.value = value; filters.category.append(o);
      });
    }
    Object.values(filters).forEach((control) => control?.addEventListener("input", renderPosts));
    document.querySelector("[data-filters-reset]")?.addEventListener("click", resetFilters);
  }

  function setupReviewForm() {
    if (!reviewForm) return;
    const select = reviewForm.querySelector("#review-book");
    const frag = document.createDocumentFragment();
    const placeholder = el("option", "", "Обери книгу…"); placeholder.value = "";
    frag.append(placeholder);
    [...Store.books].sort((a, b) => a.title.localeCompare(b.title, "uk")).forEach((b) => {
      const o = el("option", "", `${b.title} — ${b.author}`); o.value = b.id; frag.append(o);
    });
    select.append(frag);

    const textarea = reviewForm.querySelector("#review-text");
    const counter = reviewForm.querySelector("[data-review-counter]");
    const MAX = 600;
    textarea.addEventListener("input", () => { counter.textContent = `${textarea.value.length} / ${MAX}`; });

    const err = (name) => reviewForm.querySelector(`[data-error="${name}"]`);
    const feedback = reviewForm.querySelector("[data-review-feedback]");

    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      ["book", "rating", "text"].forEach((n) => { err(n).textContent = ""; });
      [select, textarea].forEach((n) => n.removeAttribute("aria-invalid"));
      feedback.textContent = "";

      const bookId = select.value;
      const ratingInput = reviewForm.querySelector('input[name="rating"]:checked');
      const text = textarea.value.trim();
      const name = (reviewForm.querySelector("#review-name").value.trim() || "Гість").slice(0, 40);

      let firstInvalid = null;
      if (!bookId) { err("book").textContent = "Обери книгу зі списку."; select.setAttribute("aria-invalid", "true"); firstInvalid = firstInvalid || select; }
      if (!ratingInput) { err("rating").textContent = "Постав оцінку від 1 до 5."; firstInvalid = firstInvalid || reviewForm.querySelector('input[name="rating"]'); }
      if (text.length < 20) { err("text").textContent = "Напиши хоча б 20 символів, щоб відгук був корисним."; textarea.setAttribute("aria-invalid", "true"); firstInvalid = firstInvalid || textarea; }
      if (text.length > MAX) { err("text").textContent = `Максимум ${MAX} символів.`; textarea.setAttribute("aria-invalid", "true"); firstInvalid = firstInvalid || textarea; }
      if (firstInvalid) { firstInvalid.focus(); return; }

      const posts = ownPosts();
      const ts = Date.now();
      posts.unshift({ id: `own-${ts}`, bookId, name, rating: Number(ratingInput.value), text, ts, likes: 0 });
      if (filters.q) filters.q.value = "";
      if (filters.category) filters.category.value = "all";
      if (filters.mine) filters.mine.checked = false;
      if (filters.sort) filters.sort.value = "new";
      const saved = write(KEYS.posts, posts.slice(0, 50));
      reviewForm.reset();
      counter.textContent = `0 / ${MAX}`;
      feedback.textContent = saved ? "Відгук опубліковано. Він зберігається в цьому браузері." : "Відгук додано лише на цей візит: браузер не дозволяє зберегти дані.";
    });
  }

  function renderAll() {
    renderChallenge();
    renderClubs();
    renderPosts();
  }

  window.addEventListener("community:change", renderAll);
  window.addEventListener("bookdrop:progress-change", renderChallenge);
  window.addEventListener("storage", renderAll);

  setupFilters();
  setupReviewForm();
  renderAll();
})();
