(() => {
  "use strict";

  const journalList = document.querySelector("[data-journal-list]");
  const wishlistList = document.querySelector("[data-wishlist-list]");
  const wishRail = document.querySelector("[data-wish-rail]");
  const emptyState = document.querySelector("[data-empty-state]");
  const wishlistTotal = document.querySelector("[data-wishlist-total]");
  const railTotal = document.querySelector("[data-wish-rail-total]");
  const journalCount = document.querySelector("[data-journal-count]");
  const journalPill = document.querySelector("[data-journal-pill]");
  const wishPill = document.querySelector("[data-wish-pill]");
  const storageNote = document.querySelector("[data-storage-note]");
  const wishlistHeading = document.querySelector("#wishlist-title");
  const statsList = document.querySelector("[data-stats]");
  const suggestionsList = document.querySelector("[data-suggestions-list]");
  const suggestionsRefresh = document.querySelector("[data-suggestions-refresh]");
  const chartBars = document.querySelector("[data-chart-bars]");
  const chartRange = document.querySelector("[data-chart-range]");
  const chartTotal = document.querySelector("[data-chart-total]");
  const chartLegend = document.querySelector("[data-chart-legend]");

  // Чекаємо, поки store.js підготує каталог (він підключається раніше)
  if (!window.BookDrop) {
    return;
  }

  const SUGGESTIONS_COUNT = 4;
  const PAGES_LOG_KEY = "bookdrop-pages-log";
  const BASE_STORAGE_NOTE = "Прогрес і вішлист зберігаються в цьому браузері.";
  const STORAGE_FAILURE_NOTE = "Прогрес оновлено лише на цей візит: браузер не дозволяє зберегти дані.";
  const WISHLIST_FAILURE_NOTE = "Вішлист оновлено лише на цей візит: браузер не дозволяє зберегти дані.";
  const WEEKDAYS_SHORT = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const drafts = new Map();

  /* ---------------------------------------------------------------- утиліти */

  function getWishlistBooks() {
    const savedIds = window.BookDrop.getWishlist();
    return window.BookDrop.books.filter((book) => savedIds.has(String(book.id)));
  }

  function getBookNoun(count, grammaticalCase = "nominative") {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return "книг";
    }
    if (grammaticalCase === "instrumental") {
      return lastDigit === 1 ? "книжкою" : "книжками";
    }
    if (lastDigit === 1) {
      return "книга";
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return "книги";
    }
    return "книг";
  }

  function getBookCountLabel(count, grammaticalCase = "nominative") {
    return `${count} ${getBookNoun(count, grammaticalCase)}`;
  }

  function getPageNoun(count, grammaticalCase = "genitive") {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return "сторінок";
    }
    if (grammaticalCase === "genitive") {
      return lastDigit === 1 ? "сторінки" : "сторінок";
    }
    if (lastDigit === 1) {
      return "сторінку";
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return "сторінки";
    }
    return "сторінок";
  }

  function formatNumber(value) {
    return Number(value).toLocaleString("uk-UA").replace(/\u00A0/g, " ");
  }

  function setStorageNote(saved, failureMessage = STORAGE_FAILURE_NOTE) {
    if (!storageNote) {
      return;
    }
    const target = storageNote.querySelector("[data-storage-note-text]") || storageNote;
    target.textContent = saved ? BASE_STORAGE_NOTE : failureMessage;
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text !== undefined) {
      element.textContent = text;
    }
    return element;
  }

  function createIcon(classes) {
    const icon = createElement("i", classes);
    icon.setAttribute("aria-hidden", "true");
    return icon;
  }

  /* -------------------------------------------------- журнал сторінок по днях */

  const dayKeyOf = (date = new Date()) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  };

  function readPagesLog() {
    try {
      const raw = localStorage.getItem(PAGES_LOG_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function writePagesLog(log) {
    try {
      localStorage.setItem(PAGES_LOG_KEY, JSON.stringify(log));
      return true;
    } catch (error) {
      return false;
    }
  }

  function addPagesToday(delta) {
    if (!Number.isFinite(delta) || delta <= 0) {
      return;
    }
    const log = readPagesLog();
    const key = dayKeyOf();
    log[key] = (Number(log[key]) || 0) + delta;
    writePagesLog(log);
  }

  // Перший візит: якщо історії немає, а прогрес уже збережено — вважаємо його підсумком на сьогодні
  function seedPagesLogIfEmpty(pagesRead) {
    const log = readPagesLog();
    if (Object.keys(log).length || pagesRead <= 0) {
      return;
    }
    const seeded = {};
    seeded[dayKeyOf()] = pagesRead;
    writePagesLog(seeded);
  }

  /* ------------------------------------------------------------------ графік */

  function renderChart() {
    if (!chartBars) {
      return;
    }

    const log = readPagesLog();
    const days = [];
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setDate(date.getDate() - offset);
      days.push({ date, key: dayKeyOf(date), pages: Number(log[dayKeyOf(date)]) || 0 });
    }

    const max = Math.max(...days.map((day) => day.pages), 1);
    const total = days.reduce((sum, day) => sum + day.pages, 0);
    const best = Math.max(...days.map((day) => day.pages), 0);
    const fragment = document.createDocumentFragment();

    days.forEach((day, index) => {
      const isToday = index === days.length - 1;
      const column = createElement("div", `chart-col${isToday ? " is-today" : ""}`);
      const height = day.pages > 0 ? Math.max(4, Math.round((day.pages / max) * 100)) : 0;

      const value = createElement("span", "chart-value", day.pages > 0 ? formatNumber(day.pages) : "—");
      const track = createElement("span", "chart-track");
      const fill = createElement("span", `chart-fill${isToday ? " is-today" : ""}`);
      fill.style.height = `${height}%`;
      track.append(fill);
      const label = createElement("span", "chart-day", WEEKDAYS_SHORT[day.date.getDay()]);
      column.append(value, track, label);
      column.setAttribute(
        "aria-label",
        `${day.date.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })}: ${day.pages} ${getPageNoun(day.pages, "accusative")}`,
      );
      fragment.append(column);
    });

    chartBars.replaceChildren(fragment);
    chartBars.setAttribute(
      "aria-label",
      `Прочитано сторінок за сім днів: ${days.map((day) => `${WEEKDAYS_SHORT[day.date.getDay()]} ${day.pages}`).join(", ")}`,
    );

    const first = days[0].date;
    const last = days[days.length - 1].date;
    const sameMonth = first.getMonth() === last.getMonth();
    const rangeStart = first.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: sameMonth ? undefined : "long",
    });
    const rangeEnd = last.toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
    if (chartRange) {
      chartRange.textContent = `${rangeStart} – ${rangeEnd}`;
    }
    if (chartTotal) {
      chartTotal.textContent = formatNumber(total);
    }
    if (chartLegend) {
      chartLegend.replaceChildren(
        createElement("span", "", total > 0 ? `Найкращий день: ${formatNumber(best)} ${getPageNoun(best, "genitive")}` : "Ще немає записів за тиждень"),
        createElement("span", "", total > 0 ? `Середнє: ${Math.round(total / days.length)} ${getPageNoun(Math.round(total / days.length), "genitive")} на день` : "Онови прогрес — і тут з’явиться графік"),
      );
    }
  }

  /* ------------------------------------------------------------- статистика */

  function createStatCard({ icon, value, label, extra, href }) {
    const item = createElement("li");
    const link = createElement("a", "stat");
    link.href = href;

    const iconBox = createElement("span", "stat-icon");
    iconBox.append(createIcon(icon));
    const number = createElement("strong", "stat-value", formatNumber(value));
    number.dataset.count = String(value);
    const labelEl = createElement("span", "stat-label", label);
    const extraEl = createElement("span", "stat-extra");
    if (extra) {
      extraEl.append(...extra);
    }

    link.append(iconBox, number, labelEl);
    if (extra) {
      link.append(extraEl);
    }
    item.append(link);
    return item;
  }

  function collectStats() {
    const progress = window.BookDrop.getProgress();
    const books = getWishlistBooks();
    let started = 0;
    let finished = 0;
    let pagesRead = 0;

    books.forEach((book) => {
      const entry = progress[book.id];
      const readPages = Number(entry?.readPages);
      const totalPages = entry?.totalPages ?? book.totalPages;
      if (Number.isFinite(readPages) && readPages > 0) {
        started += 1;
        pagesRead += readPages;
        if (totalPages && readPages >= totalPages) {
          finished += 1;
        }
      }
    });

    return { books, started, finished, pagesRead };
  }

  function renderStats() {
    const { books, started, finished, pagesRead } = collectStats();

    if (statsList) {
      statsList.replaceChildren(
        createStatCard({
          icon: "fa-solid fa-bookmark",
          value: books.length,
          label: "книг у вішлисті",
          href: "#wishlist",
          extra: [createElement("b", "", String(started)), document.createTextNode(" у процесі читання")],
        }),
        createStatCard({
          icon: "fa-solid fa-book-open",
          value: started,
          label: "розпочато",
          href: "#journal",
          extra: [createElement("b", "", formatNumber(pagesRead)), document.createTextNode(` ${getPageNoun(pagesRead, "genitive")} прочитано`)],
        }),
        createStatCard({
          icon: "fa-solid fa-flag-checkered",
          value: finished,
          label: "прочитано",
          href: "#journal",
          extra: [document.createTextNode(`із ${getBookCountLabel(books.length)} у вішлисті`)],
        }),
        createStatCard({
          icon: "fa-solid fa-file-lines",
          value: pagesRead,
          label: "сторінок усього",
          href: "#chart-title",
          extra: [document.createTextNode("за "), createElement("b", "", String(started)), document.createTextNode(` ${getBookNoun(started, "instrumental")}`)],
        }),
      );
    }

    if (journalCount) {
      journalCount.textContent = getBookCountLabel(books.length);
    }
    if (journalPill) {
      journalPill.textContent = String(books.length);
    }
    if (wishPill) {
      wishPill.textContent = String(books.length);
    }
    if (railTotal) {
      railTotal.textContent = getBookCountLabel(books.length);
    }
    if (wishlistTotal) {
      wishlistTotal.textContent = `${getBookCountLabel(books.length)} · ${formatNumber(pagesRead)} ${getPageNoun(pagesRead, "genitive")}`;
    }

    seedPagesLogIfEmpty(pagesRead);
    renderChart();
  }

  /* ------------------------------------------------------------- щоденник */

  function createJournalRow(book, entry) {
    const item = createElement("li");
    const row = createElement("article", "journal-row");
    row.dataset.bookId = String(book.id);

    const coverLink = createElement("a", "journal-cover");
    coverLink.href = book.detailHref;
    coverLink.setAttribute("aria-label", `${book.title} — деталі книги`);
    const cover = createElement("img");
    cover.src = book.cover;
    cover.alt = book.alt;
    cover.loading = "lazy";
    coverLink.append(cover);

    const body = createElement("div", "journal-body");
    const details = createElement("div");
    const title = createElement("h3", "journal-title");
    const titleLink = createElement("a", "", book.title);
    titleLink.href = book.detailHref;
    title.append(titleLink);
    const author = createElement("p", "journal-author", book.author);
    const progress = createElement("div");
    progress.dataset.progressDisplay = "";
    details.append(title, author, progress);

    const form = createElement("form", "progress-editor");
    form.dataset.progressForm = "";
    form.dataset.bookId = String(book.id);
    form.noValidate = true;

    const draft = drafts.get(String(book.id));
    const readValue = draft ? draft.readPages : entry?.readPages;
    const totalValue = draft ? draft.totalPages : entry?.totalPages ?? book.totalPages;
    const readField = createPageField(book, "read", readValue);
    const totalField = createPageField(book, "total", totalValue);

    const saveButton = createElement("button", "progress-save", "Зберегти");
    saveButton.type = "submit";
    saveButton.dataset.progressSave = "";

    const error = createElement("p", "progress-error");
    error.id = `progress-error-${book.id}`;
    error.setAttribute("aria-live", "polite");
    const feedback = createElement("p", "progress-feedback");
    feedback.dataset.progressFeedback = "";
    feedback.setAttribute("aria-live", "polite");

    readField.input.setAttribute("aria-describedby", `${readField.hintId} ${error.id}`);
    totalField.input.setAttribute("aria-describedby", `${totalField.hintId} ${error.id}`);

    form.append(readField.wrapper, totalField.wrapper, saveButton, error, feedback);
    body.append(details, form);
    row.append(coverLink, body);
    item.append(row);

    updateProgressDisplay(progress, entry, book);

    form.addEventListener("input", () => {
      const currentDraft = drafts.get(String(book.id)) || {};
      currentDraft.readPages = readField.input.value;
      currentDraft.totalPages = totalField.input.value;
      drafts.set(String(book.id), currentDraft);
      form.classList.add("is-dirty");
      error.textContent = "";
      readField.input.removeAttribute("aria-invalid");
      totalField.input.removeAttribute("aria-invalid");
      feedback.textContent = "";
    });

    return item;
  }

  function createPageField(book, type, value) {
    const isReadField = type === "read";
    const fieldId = `${type}-pages-${book.id}`;
    const wrapper = createElement("label", "progress-field");
    wrapper.htmlFor = fieldId;
    const caption = createElement("span", "", isReadField ? "Поточна" : "Усього");

    const input = document.createElement("input");
    input.id = fieldId;
    input.name = type === "read" ? "readPages" : "totalPages";
    input.type = "number";
    input.inputMode = "numeric";
    input.min = isReadField ? "0" : "1";
    input.step = "1";
    input.placeholder = isReadField ? "84" : "320";
    input.autocomplete = "off";
    input.setAttribute("aria-label", isReadField ? "Поточна сторінка" : "Усього сторінок");
    if (value !== null && value !== undefined && value !== "") {
      input.value = String(value);
    }

    const hint = document.createElement("span");
    hint.id = `${type}-pages-hint-${book.id}`;
    hint.className = "visually-hidden";
    hint.textContent = isReadField
      ? `Кількість прочитаних сторінок у книзі «${book.title}».`
      : `Загальна кількість сторінок у виданні книги «${book.title}».`;

    wrapper.append(caption, input, hint);
    return { wrapper, input, hintId: hint.id };
  }

  function updateProgressDisplay(container, entry, book) {
    container.replaceChildren();

    const hasReadPosition = entry?.readPages !== null && entry?.readPages !== undefined;
    const totalPages = entry?.totalPages ?? book.totalPages;

    if (!hasReadPosition) {
      container.append(createElement("p", "progress-hint-line", "Прогрес ще не додано."));
      if (!totalPages) {
        container.append(createElement("p", "progress-hint-line", "Додай кількість сторінок, щоб бачити прогрес."));
      }
      return;
    }

    if (!totalPages) {
      container.append(createElement("p", "progress-line", `${entry.readPages} ${getPageNoun(entry.readPages, "accusative")} прочитано.`));
      container.append(createElement("p", "progress-hint-line", "Додай кількість сторінок, щоб бачити прогрес."));
      return;
    }

    const percentage = Math.round((entry.readPages / totalPages) * 100);
    const line = createElement("div", "progress-line");
    line.append(
      createElement("span", "", `${entry.readPages} із ${totalPages} стор.`),
      createElement("span", "pct", `${percentage}%`),
    );

    const track = createElement("div", "progress-track");
    const bar = createElement("i");
    bar.style.width = `${percentage}%`;
    track.append(bar);

    container.append(line, track);

    if (entry.readPages >= totalPages) {
      const done = createElement("span", "badge-done");
      done.append(createIcon("fa-solid fa-check"), document.createTextNode("Прочитано"));
      container.append(done);
    }
  }

  function renderJournal() {
    if (!journalList) {
      return;
    }

    const progress = window.BookDrop.getProgress();
    const fragment = document.createDocumentFragment();

    getWishlistBooks().forEach((book) => {
      fragment.append(createJournalRow(book, progress[book.id]));
    });

    journalList.replaceChildren(fragment);
  }

  /* ----------------------------------------------------------------- вішлист */

  function createWishRow(book) {
    const item = createElement("li", "wish-row");

    const coverLink = createElement("a", "wish-cover");
    coverLink.href = book.detailHref;
    coverLink.tabIndex = -1;
    coverLink.setAttribute("aria-hidden", "true");
    const cover = createElement("img");
    cover.src = book.cover;
    cover.alt = "";
    cover.loading = "lazy";
    coverLink.append(cover);

    const meta = createElement("div");
    const title = createElement("h3", "wish-title");
    const link = createElement("a", "", book.title);
    link.href = book.detailHref;
    title.append(link);
    const author = createElement("p", "wish-author", book.author);
    meta.append(title, author);

    const remove = createElement("button", "wish-remove");
    remove.type = "button";
    remove.dataset.wishlistButton = "";
    remove.dataset.bookId = String(book.id);
    remove.dataset.title = book.title;
    remove.setAttribute("aria-pressed", "true");
    remove.setAttribute("aria-label", `Прибрати «${book.title}» з вішлиста`);
    remove.append(createIcon("fa-solid fa-xmark"));

    item.append(coverLink, meta, remove);
    return item;
  }

  function renderWishRail() {
    if (!wishRail) {
      return;
    }

    const books = getWishlistBooks();
    if (!books.length) {
      const empty = createElement("li", "wish-empty", "Порожньо. Додай книгу з добірки нижче.");
      wishRail.replaceChildren(empty);
      return;
    }

    wishRail.replaceChildren(...books.map(createWishRow));
  }

  function createBookCard(book, saved) {
    const item = createElement("li");
    const article = createElement("article", "book-card tracker-wishlist-card");
    const cover = createElement("figure", "card-cover");
    const image = createElement("img");
    image.src = book.cover;
    image.alt = book.alt;
    image.loading = "lazy";
    cover.append(image);

    const body = createElement("section", "card-body");
    const titleId = `${saved ? "wishlist" : "suggestion"}-book-${book.id}`;
    body.setAttribute("aria-labelledby", titleId);
    const title = createElement("h3", "book-title", book.title);
    title.id = titleId;
    const author = createElement("p", "book-author", book.author);

    const actions = createElement("footer", "card-actions");
    const detailLink = createElement("a", "card-details", "Деталі");
    detailLink.href = book.detailHref;
    const favButton = createElement("button", "btn-fav");
    favButton.type = "button";
    favButton.dataset.wishlistButton = "";
    favButton.dataset.bookId = String(book.id);
    favButton.dataset.title = book.title;
    favButton.setAttribute("aria-pressed", String(saved));
    favButton.setAttribute(
      "aria-label",
      `${saved ? "Видалити з вішлиста" : "Додати у вішлист"}: ${book.title}`,
    );
    favButton.append(createIcon(saved ? "fa-solid fa-heart" : "fa-regular fa-heart"));

    actions.append(detailLink, favButton);
    body.append(title, author, actions);
    article.append(cover, body);
    item.append(article);
    return item;
  }

  function renderWishlist() {
    if (!wishlistList) {
      return;
    }

    const books = getWishlistBooks();
    wishlistList.replaceChildren(...books.map((book) => createBookCard(book, true)));

    if (emptyState) {
      emptyState.hidden = books.length > 0;
    }
  }

  /* --------------------------------------------------------------- добірка */

  function pickSuggestions() {
    const saved = window.BookDrop.getWishlist();
    const groups = new Map();
    window.BookDrop.books
      .filter((book) => !saved.has(String(book.id)))
      .forEach((book) => {
        const key = book.category || "other";
        if (!groups.has(key)) {
          groups.set(key, []);
        }
        groups.get(key).push(book);
      });

    const shuffle = (list) => {
      const copy = [...list];
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    // По одній книзі з різних жанрів, поки не наберемо потрібну кількість
    const queues = shuffle([...groups.values()]).map(shuffle);
    const picked = [];
    while (picked.length < SUGGESTIONS_COUNT && queues.some((queue) => queue.length)) {
      queues.forEach((queue) => {
        if (picked.length < SUGGESTIONS_COUNT && queue.length) {
          picked.push(queue.shift());
        }
      });
    }
    return picked;
  }

  function renderSuggestions() {
    if (!suggestionsList) {
      return;
    }
    suggestionsList.replaceChildren(...pickSuggestions().map((book) => createBookCard(book, false)));
  }

  /* ------------------------------------------------------- збереження прогресу */

  function parseOptionalInteger(input) {
    if (input.value.trim() === "") {
      return { valid: true, value: null };
    }

    const value = Number(input.value);
    return {
      valid: Number.isSafeInteger(value),
      value: Number.isSafeInteger(value) ? value : null,
    };
  }

  function saveProgress(book, readInput, totalInput, error, feedback) {
    error.textContent = "";
    readInput.removeAttribute("aria-invalid");
    totalInput.removeAttribute("aria-invalid");

    const readResult = parseOptionalInteger(readInput);
    const totalResult = parseOptionalInteger(totalInput);
    let invalidInput = null;
    let errorMessage = "";

    if (
      readResult.valid
      && totalResult.valid
      && readResult.value === null
      && totalResult.value === null
    ) {
      invalidInput = readInput;
      errorMessage = "Вкажи прочитані сторінки або загальну кількість сторінок.";
    } else if (!readResult.valid || (readResult.value !== null && readResult.value < 0)) {
      invalidInput = readInput;
      errorMessage = "Укажи ціле число від нуля.";
    } else if (!totalResult.valid || (totalResult.value !== null && totalResult.value <= 0)) {
      invalidInput = totalInput;
      errorMessage = "Укажи ціле число сторінок, більше за нуль.";
    } else if (
      readResult.value !== null
      && totalResult.value !== null
      && readResult.value > totalResult.value
    ) {
      invalidInput = readInput;
      errorMessage = "Прочитаних сторінок не може бути більше за загальну кількість.";
    }

    if (invalidInput) {
      invalidInput.setAttribute("aria-invalid", "true");
      error.textContent = errorMessage;
      feedback.textContent = "";
      invalidInput.focus();
      return;
    }

    const previous = window.BookDrop.getProgress()[book.id]?.readPages;
    const previousRead = Number(previous) || 0;
    const nextRead = readResult.value === null ? 0 : readResult.value;
    const delta = nextRead > previousRead ? nextRead - previousRead : 0;

    drafts.delete(String(book.id));
    // спершу фіксуємо приріст сторінок за сьогодні, щоб графік оновився разом зі статистикою
    addPagesToday(delta);
    const saved = window.BookDrop.saveProgress(book.id, {
      readPages: readResult.value,
      totalPages: totalResult.value,
    });
    setStorageNote(saved);
    feedback.textContent = saved
      ? (delta > 0 ? `Прогрес збережено · +${delta} ${getPageNoun(delta, "accusative")}` : "Прогрес збережено.")
      : "Прогрес оновлено лише на цей візит: браузер не дозволяє зберегти дані.";
    const form = readInput.closest(".progress-editor");
    form?.classList.remove("is-dirty");
  }

  /* ------------------------------------------------------------------- події */

  function getNextFocusTarget(books, removedId) {
    const removedIndex = books.findIndex((book) => String(book.id) === String(removedId));
    const next = books.slice(removedIndex + 1).find((book) => String(book.id) !== String(removedId));
    const previous = books.slice(0, removedIndex).reverse().find((book) => String(book.id) !== String(removedId));
    return next?.id || previous?.id || null;
  }

  function handleWishlistChange(event) {
    const activeElement = document.activeElement instanceof Element
      ? document.activeElement.closest("[data-wishlist-button]")
      : null;
    const shouldRestoreFocus = Boolean(
      event.detail?.removing
      && activeElement
      && String(activeElement.dataset.bookId) === String(event.detail.bookId),
    );
    const previousWishlistIds = new Set((event.detail?.ids || []).map(String));
    if (event.detail?.removing && event.detail.bookId) {
      previousWishlistIds.add(String(event.detail.bookId));
    }
    const previousBooks = window.BookDrop.books.filter((book) => previousWishlistIds.has(String(book.id)));
    const nextFocusId = shouldRestoreFocus
      ? getNextFocusTarget(previousBooks, event.detail.bookId)
      : null;

    renderJournal();
    renderWishlist();
    renderWishRail();
    renderStats();
    renderSuggestions();

    if (shouldRestoreFocus) {
      const nextButton = nextFocusId
        ? wishlistList?.querySelector(`[data-wishlist-button][data-book-id="${nextFocusId}"]`)
        : null;
      (nextButton || wishlistHeading)?.focus();
    }

    if (event.detail?.saved === false) {
      setStorageNote(false, WISHLIST_FAILURE_NOTE);
    }
  }

  function handleProgressChange(event) {
    const progressEntries = window.BookDrop.getProgress();
    const bookId = event.detail?.bookId;
    const booksToUpdate = bookId
      ? [window.BookDrop.bookById(bookId)].filter(Boolean)
      : getWishlistBooks();

    booksToUpdate.forEach((book) => {
      const row = journalList?.querySelector(`[data-book-id="${book.id}"]`);
      const progress = row?.querySelector("[data-progress-display]");
      if (progress) {
        updateProgressDisplay(progress, progressEntries[book.id], book);
      }
    });

    renderStats();

    if (event.detail?.saved === false) {
      setStorageNote(false);
    }
  }

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches("[data-progress-form]")) {
      return;
    }

    const book = window.BookDrop.bookById(form.dataset.bookId);
    const inputs = form.querySelectorAll("input");
    const error = form.querySelector(".progress-error");
    const feedback = form.querySelector("[data-progress-feedback]");
    if (book && error && feedback && inputs.length === 2) {
      event.preventDefault();
      saveProgress(book, inputs[0], inputs[1], error, feedback);
    }
  });

  window.addEventListener("bookdrop:wishlist-change", handleWishlistChange);
  window.addEventListener("bookdrop:progress-change", handleProgressChange);

  suggestionsRefresh?.addEventListener("click", () => {
    const icon = suggestionsRefresh.querySelector("i");
    if (icon) {
      icon.style.transition = "transform .5s ease";
      icon.style.transform = "rotate(180deg)";
      setTimeout(() => { icon.style.transform = ""; }, 520);
    }
    renderSuggestions();
  });

  renderJournal();
  renderWishlist();
  renderWishRail();
  renderStats();
  renderSuggestions();
})();
