(() => {
  "use strict";

  const journalList = document.querySelector("[data-journal-list]");
  const wishlistList = document.querySelector("[data-wishlist-list]");
  const emptyState = document.querySelector("[data-empty-state]");
  const wishlistTotal = document.querySelector("[data-wishlist-total]");
  const storageNote = document.querySelector("[data-storage-note]");
  const wishlistHeading = document.querySelector("#wishlist-title");
  const statsList = document.querySelector("[data-stats]");
  const suggestionsList = document.querySelector("[data-suggestions-list]");
  const suggestionsRefresh = document.querySelector("[data-suggestions-refresh]");
  const SUGGESTIONS_COUNT = 4;
  const BASE_STORAGE_NOTE = "Прогрес і вішлист зберігаються в цьому браузері.";
  const STORAGE_FAILURE_NOTE = "Прогрес оновлено лише на цей візит: браузер не дозволяє зберегти дані.";
  const WISHLIST_FAILURE_NOTE = "Вішлист оновлено лише на цей візит: браузер не дозволяє зберегти дані.";
  const drafts = new Map();

  function getWishlistBooks() {
    const savedIds = window.BookDrop.getWishlist();
    return window.BookDrop.books.filter((book) => savedIds.has(book.id));
  }

  function getBookCountLabel(count) {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;
    const noun = lastTwoDigits >= 11 && lastTwoDigits <= 14
      ? "книг"
      : lastDigit === 1
        ? "книга"
        : lastDigit >= 2 && lastDigit <= 4
          ? "книги"
          : "книг";

    return `${count} ${noun}`;
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

  function setStorageNote(saved, failureMessage = STORAGE_FAILURE_NOTE) {
    if (!storageNote) {
      return;
    }
    storageNote.textContent = saved ? BASE_STORAGE_NOTE : failureMessage;
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

  function createJournalRow(book, entry) {
    const item = createElement("li");
    const row = createElement("article", "journal-row");
    row.dataset.bookId = book.id;

    const cover = createElement("img", "journal-cover");
    cover.src = book.cover;
    cover.alt = book.alt;
    cover.loading = "lazy";

    const details = createElement("div", "journal-details");
    const title = createElement("h3", "journal-book-title", book.title);
    const author = createElement("p", "journal-author", book.author);
    const progress = createElement("div", "journal-progress");
    progress.dataset.progressDisplay = "";
    details.append(title, author, progress);

    const form = createElement("form", "progress-editor");
    form.dataset.progressForm = "";
    form.dataset.bookId = book.id;
    form.noValidate = true;

    const draft = drafts.get(book.id);
    const readValue = draft ? draft.readPages : entry?.readPages;
    const totalValue = draft ? draft.totalPages : entry?.totalPages ?? book.totalPages;
    const readField = createPageField(book, "read", readValue);
    const totalField = createPageField(book, "total", totalValue);

    const saveButton = createElement("button", "progress-save", "Зберегти прогрес");
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
    row.append(cover, details, form);
    item.append(row);
    updateProgressDisplay(progress, entry, book);

    form.addEventListener("input", () => {
      const currentDraft = drafts.get(book.id) || {};
      currentDraft.readPages = readField.input.value;
      currentDraft.totalPages = totalField.input.value;
      drafts.set(book.id, currentDraft);
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
    const wrapper = createElement("div", "progress-field");
    const label = createElement(
      "label",
      "",
      isReadField ? "Прочитано сторінок" : "Усього сторінок",
    );
    label.htmlFor = fieldId;

    const input = document.createElement("input");
    input.id = fieldId;
    input.name = type === "read" ? "readPages" : "totalPages";
    input.type = "number";
    input.inputMode = "numeric";
    input.min = isReadField ? "0" : "1";
    input.step = "1";
    input.placeholder = isReadField ? "Напр., 84" : "Напр., 320";
    input.autocomplete = "off";
    if (value !== null && value !== undefined && value !== "") {
      input.value = String(value);
    }

    const hint = document.createElement("span");
    hint.id = `${type}-pages-hint-${book.id}`;
    hint.className = "visually-hidden";
    hint.textContent = isReadField
      ? `Кількість прочитаних сторінок у книзі «${book.title}».`
      : `Загальна кількість сторінок у виданні книги «${book.title}».`;

    wrapper.append(label, input, hint);
    return { wrapper, input, hintId: hint.id };
  }

  function updateProgressDisplay(container, entry, book) {
    container.replaceChildren();

    const hasReadPosition = entry?.readPages !== null && entry?.readPages !== undefined;
    const totalPages = entry?.totalPages ?? book.totalPages;

    if (!hasReadPosition) {
      container.append(createElement("p", "progress-summary", "Прогрес ще не додано."));
      if (!totalPages) {
        container.append(createElement(
          "p",
          "progress-reminder",
          "Додай кількість сторінок, щоб бачити прогрес.",
        ));
      }
      return;
    }

    if (!totalPages) {
      container.append(createElement(
        "p",
        "progress-summary",
        `${entry.readPages} ${getPageNoun(entry.readPages, "accusative")} прочитано.`,
      ));
      container.append(createElement(
        "p",
        "progress-reminder",
        "Додай кількість сторінок, щоб бачити прогрес.",
      ));
      return;
    }

    const percentage = Math.round((entry.readPages / totalPages) * 100);
    const summary = createElement(
      "p",
      "progress-summary",
      `${entry.readPages} із ${totalPages} ${getPageNoun(totalPages)} · ${percentage}%`,
    );
    if (entry.readPages === totalPages) {
      summary.append(
        document.createTextNode(" · "),
        createElement("span", "progress-complete", "Прочитано"),
      );
    }

    const progress = document.createElement("progress");
    progress.className = "tracker-progress";
    progress.max = 100;
    progress.value = percentage;
    progress.setAttribute("aria-label", `Прогрес читання: ${book.title}`);
    progress.setAttribute(
      "aria-valuetext",
      `${entry.readPages} із ${totalPages} ${getPageNoun(totalPages)}, ${percentage}%`,
    );
    container.append(summary, progress);
  }

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

    drafts.delete(book.id);
    const saved = window.BookDrop.saveProgress(book.id, {
      readPages: readResult.value,
      totalPages: totalResult.value,
    });
    setStorageNote(saved);
    feedback.textContent = saved
      ? "Прогрес збережено."
      : "Прогрес оновлено лише на цей візит: браузер не дозволяє зберегти дані.";
  }

  function renderJournal() {
    if (!journalList) {
      return;
    }

    const progress = window.BookDrop.getProgress();
    const fragment = document.createDocumentFragment();

    getWishlistBooks().forEach((book) => {
      fragment.append(createJournalRow(book, progress[book.id], book));
    });

    journalList.replaceChildren(fragment);
  }

  function createWishlistCard(book, saved = true) {
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
    const detailLink = createElement("a", "btn btn-sm btn-outline", "Про книгу");
    detailLink.href = book.detailHref;
    const favButton = createElement("button", "btn-fav");
    favButton.type = "button";
    favButton.dataset.wishlistButton = "";
    favButton.dataset.bookId = book.id;
    favButton.dataset.title = book.title;
    favButton.setAttribute("data-glyph", "");
    favButton.setAttribute("aria-pressed", String(saved));
    favButton.setAttribute(
      "aria-label",
      `${saved ? "Видалити з вішлиста" : "Додати у вішлист"}: ${book.title}`,
    );
    favButton.textContent = saved ? "♥" : "♡";
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
    const fragment = document.createDocumentFragment();
    books.forEach((book) => fragment.append(createWishlistCard(book)));
    wishlistList.replaceChildren(fragment);

    if (wishlistTotal) {
      wishlistTotal.textContent = getBookCountLabel(books.length);
    }
    if (emptyState) {
      emptyState.hidden = books.length > 0;
    }
  }

  function createStat(value, label) {
    const item = createElement("li", "tracker-stat");
    item.append(createElement("strong", "tracker-stat-value", String(value)), createElement("span", "tracker-stat-label", label));
    return item;
  }

  function renderStats() {
    if (!statsList) {
      return;
    }

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

    statsList.replaceChildren(
      createStat(books.length, "у вішлисті"),
      createStat(started, "розпочато"),
      createStat(finished, "прочитано"),
      createStat(pagesRead.toLocaleString("uk-UA"), "сторінок усього"),
    );
  }

  function pickSuggestions() {
    const saved = window.BookDrop.getWishlist();
    const groups = new Map();
    window.BookDrop.books
      .filter((book) => !saved.has(book.id))
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
    const fragment = document.createDocumentFragment();
    pickSuggestions().forEach((book) => fragment.append(createWishlistCard(book, false)));
    suggestionsList.replaceChildren(fragment);
  }

  function getNextFocusTarget(books, removedId) {
    const removedIndex = books.findIndex((book) => book.id === removedId);
    const next = books.slice(removedIndex + 1).find((book) => book.id !== removedId);
    const previous = books.slice(0, removedIndex).reverse().find((book) => book.id !== removedId);
    return next?.id || previous?.id || null;
  }

  function handleWishlistChange(event) {
    const activeElement = document.activeElement instanceof Element
      ? document.activeElement.closest("[data-wishlist-button]")
      : null;
    const shouldRestoreFocus = Boolean(
      event.detail?.removing
      && activeElement
      && activeElement.dataset.bookId === event.detail.bookId,
    );
    const previousWishlistIds = new Set(event.detail?.ids || []);
    if (event.detail?.removing && event.detail.bookId) {
      previousWishlistIds.add(event.detail.bookId);
    }
    const previousBooks = window.BookDrop.books.filter((book) =>
      previousWishlistIds.has(book.id),
    );
    const nextFocusId = shouldRestoreFocus
      ? getNextFocusTarget(previousBooks, event.detail.bookId)
      : null;

    renderJournal();
    renderWishlist();
    renderStats();

    if (shouldRestoreFocus) {
      const nextButton = nextFocusId
        ? wishlistList.querySelector(`[data-wishlist-button][data-book-id="${nextFocusId}"]`)
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

  suggestionsRefresh?.addEventListener("click", renderSuggestions);

  renderJournal();
  renderWishlist();
  renderStats();
  renderSuggestions();
})();
