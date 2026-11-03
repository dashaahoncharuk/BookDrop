/* BookDrop — js/book-details.js: сторінка книги (book-details.html?id=book-001) */
(() => {
  "use strict";

  const root = document.querySelector("[data-details-root]");
  const related = document.querySelector("[data-related]");
  const relatedList = document.querySelector("[data-related-list]");
  if (!root || !window.BookDrop) {
    return;
  }

  const MOODS = {
    dark: "Темний", mysterious: "Загадковий", emotional: "Емоційний", melancholic: "Меланхолійний",
    drive: "Динамічний", intellectual: "Інтелектуальний", cozy: "Затишний", romantic: "Романтичний",
    adventurous: "Пригодницький", funny: "Гумористичний", uplifting: "Надихаючий",
  };
  const PACE = { fast: "Швидкий", medium: "Помірний", slow: "Повільний" };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function fact(label, value) {
    const box = el("div");
    box.append(el("dt", "", label), el("dd", "", value));
    return box;
  }

  function tags(items) {
    const list = el("ul", "tag-list");
    items.forEach((item) => list.append(el("li", "", item)));
    return list;
  }

  function renderNotFound() {
    document.title = "Книгу не знайдено — BookDrop.";
    const box = el("section", "page-notice");
    const title = el("h1", "", "Книгу не знайдено");
    title.id = "page-title";
    const link = el("a", "btn btn-primary", "Повернутися до добірки");
    link.href = "index.html#books";
    box.append(title, el("p", "", "Можливо, посилання застаріло. Підберіть книгу під настрій на головній."), link);
    root.replaceChildren(box);
  }

  function createCard(book) {
    const item = el("li");
    const article = el("article", "book-card");
    const cover = el("figure", "card-cover");
    const img = el("img");
    img.src = book.cover;
    img.alt = book.alt;
    img.loading = "lazy";
    cover.append(img);

    const body = el("section", "card-body");
    const link = el("a", "btn btn-sm btn-outline", "Про книгу");
    link.href = book.detailHref;
    const actions = el("footer", "card-actions");
    actions.append(link);
    body.append(el("h3", "book-title", book.title), el("p", "book-author", book.author), actions);
    article.append(cover, body);
    item.append(article);
    return item;
  }

  function renderBook(book) {
    document.title = `${book.title} — BookDrop.`;

    const cover = el("figure", "details-cover");
    const img = el("img");
    img.src = book.cover;
    img.alt = book.alt;
    cover.append(img);

    const info = el("div");
    const title = el("h1", "details-title", book.title);
    title.id = "page-title";
    info.append(
      el("span", "details-genre", book.genre),
      title,
      el("p", "details-author", book.author),
      el("p", "details-description", book.description),
    );

    const facts = el("dl", "details-facts");
    facts.append(
      fact("Сторінок", String(book.pages)),
      fact("Напруга", `${book.tension} із 10`),
      fact("Темп", PACE[book.pace] || "—"),
    );
    info.append(facts);

    if (book.moods?.length) {
      info.append(el("h2", "details-subtitle", "Настрій"), tags(book.moods.map((m) => MOODS[m] || m)));
    }
    if (book.tropes?.length) {
      info.append(el("h2", "details-subtitle", "Тропи"), tags(book.tropes));
    }

    const saved = window.BookDrop.isInWishlist(book.id);
    const wishBtn = el("button", "btn btn-secondary btn-wishlist");
    wishBtn.type = "button";
    wishBtn.dataset.wishlistButton = "";
    wishBtn.dataset.bookId = book.id;
    wishBtn.setAttribute("aria-pressed", String(saved));
    wishBtn.setAttribute("aria-label", `${saved ? "Видалити з вішлиста" : "Додати у вішлист"}: ${book.title}`);
    wishBtn.dataset.title = book.title;
    wishBtn.setAttribute("data-label-toggle", "");
    const icon = el("i", saved ? "fa-solid fa-heart" : "fa-regular fa-heart");
    icon.setAttribute("aria-hidden", "true");
    const label = el("span", "", saved ? "У вішлисті" : "У вішлист");
    wishBtn.append(icon, label);

    const trackerLink = el("a", "btn btn-primary", "Відкрити Мій простір");
    trackerLink.href = "tracker.html#reading-journal";
    const actions = el("div", "details-actions");
    actions.append(wishBtn, trackerLink);
    info.append(actions);

    const wrapper = el("article", "details");
    wrapper.append(cover, info);
    root.replaceChildren(wrapper);

    // Підпис кнопки оновлюємо після кліку (іконку й aria-* веде store.js)
    window.addEventListener("bookdrop:wishlist-change", () => {
      const on = window.BookDrop.isInWishlist(book.id);
      label.textContent = on ? "У вішлисті" : "У вішлист";
      icon.className = on ? "fa-solid fa-heart text-indigo-400 text-sm" : "fa-regular fa-heart text-sm";
    });

    // Схожі книги: той самий жанр-категорія, ближчі за напругою
    const similar = window.BookDrop.books
      .filter((b) => b.id !== book.id && b.category === book.category)
      .sort((a, b) => Math.abs(a.tension - book.tension) - Math.abs(b.tension - book.tension) || a.id.localeCompare(b.id))
      .slice(0, 4);
    if (similar.length && related && relatedList) {
      relatedList.replaceChildren(...similar.map(createCard));
      related.hidden = false;
    }
  }

  const id = new URLSearchParams(window.location.search).get("id");
  const book = id ? window.BookDrop.bookById(id) : null;
  if (book) {
    renderBook(book);
  } else {
    renderNotFound();
  }
})();
