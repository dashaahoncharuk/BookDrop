/* BookDrop — js/app.js Вайб-квіз (чіпси + слайдер напруги) і рендеринг персонального дропу. Підключати ПІСЛЯ js/books.js та js/store.js. */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const WISHLIST_KEY = 'bookdrop-wishlist';
    const WISHED_EVENT = 'bookdrop:wishlist-change';
    const RESULT_COUNT = 4;

    // Класи, які підсвічують обраний чіпс
    const ACTIVE_CHIP_CLASSES = ['bg-indigo-600', 'text-white', 'border-indigo-600'];

    /* ---------- DOM ---------- */
    const resultsGrid = document.getElementById('recommendations-container');
    const booksSection = document.getElementById('books');
    const submitBtn = document.querySelector('.matcher-submit');
    const tensionSlider = document.getElementById('tension-range');
    const tensionValueDisplay = document.getElementById('tension-value');
    const tensionTicks = Array.from(document.querySelectorAll('[data-tension-tick]'));

    // Коректний пошук груп чіпів за їхніми секціями або батьківськими елементами
    const chipGroups = {
        mood: Array.from(document.querySelectorAll('.matcher-step:nth-child(1) .matcher-chip, [aria-label="Оберіть настрій"] .matcher-chip')),
        genre: Array.from(document.querySelectorAll('.matcher-step:nth-child(2) .matcher-chip, [aria-label="Оберіть жанр"] .matcher-chip')),
        length: Array.from(document.querySelectorAll('.matcher-step:nth-child(4) .matcher-chip, [aria-label="Оберіть обсяг книги"] .matcher-chip')),
    };

    let booksDatabase = [];
    let currentPicks = [];
    let isLoading = false;

    /* ---------- Утиліти ---------- */
    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[char]));

    const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Чіпси: вибір у межах групи ---------- */
    function setChipState(chip, isPressed) {
        chip.setAttribute('aria-pressed', String(isPressed));
        ACTIVE_CHIP_CLASSES.forEach((className) => chip.classList.toggle(className, isPressed));
    }

    function initChipGroup(chips) {
        if (!chips.length) return;
        chips.forEach((chip) => {
            // Синхронізуємо початковий стан
            setChipState(chip, chip.getAttribute('aria-pressed') === 'true');
            chip.addEventListener('click', () => {
                chips.forEach((item) => setChipState(item, item === chip));
            });
        });
    }

    function selectedChip(groupName) {
        const group = chipGroups[groupName];
        if (!group || !group.length) return null;
        return group.find((chip) => chip.getAttribute('aria-pressed') === 'true') || group[0] || null;
    }

    /* ---------- Слайдер напруги 1–10 ---------- */
    function updateTensionUI(rawValue) {
        const value = Number(rawValue);
        if (!Number.isFinite(value)) return;
        const label = `${value} із 10`;
        if (tensionValueDisplay) tensionValueDisplay.textContent = label;
        if (tensionSlider) {
            tensionSlider.setAttribute('aria-valuenow', String(value));
            tensionSlider.setAttribute('aria-valuetext', label);
        }
        tensionTicks.forEach((tick) => {
            tick.classList.toggle('is-active', Number(tick.dataset.tensionTick) === value);
        });
    }

    if (tensionSlider) {
        tensionSlider.addEventListener('input', (event) => updateTensionUI(event.target.value));
        tensionSlider.addEventListener('change', (event) => updateTensionUI(event.target.value));
        updateTensionUI(tensionSlider.value);
    } else {
        updateTensionUI(7);
    }

    /* ---------- Каталог ---------- */
    async function loadBooks() {
        if (Array.isArray(window.books) && window.books.length) {
            booksDatabase = window.books;
            return;
        }
        if (isLoading) return;
        isLoading = true;
        try {
            const response = await fetch('books.json');
            if (!response.ok) throw new Error(`Каталог недоступний: ${response.status}`);
            const data = await response.json();
            if (!Array.isArray(data) || !data.length) throw new Error('Каталог порожній');
            booksDatabase = data;
        } catch (error) {
            console.error('BookDrop: не вдалося завантажити каталог книг.', error);
            // Фолбек на window.books, якщо феч не вдався, але глобальний масив є
            booksDatabase = Array.isArray(window.books) ? window.books : [];
            if (!booksDatabase.length) {
                showErrorState("Не вдалося завантажити каталог книг. Перевірте, чи підключено js/books.js.");
            }
        } finally {
            isLoading = false;
        }
    }

    /* ---------- Скоринг ---------- */
    function scoreBooks() {
        const moodChip = selectedChip('mood');
        const genreChip = selectedChip('genre');
        const lengthChip = selectedChip('length');

        const selectedMoodText = moodChip ? moodChip.textContent.trim().toLowerCase() : '';
        const genre = genreChip?.dataset.genre || (genreChip ? genreChip.textContent.trim() : 'any');
        const lengthText = lengthChip ? lengthChip.textContent.trim().toLowerCase() : 'any';
        const targetTension = Number(tensionSlider?.value ?? 7);

        const scored = booksDatabase
            .filter((book) => book && (book.title || book.id))
            .map((book) => {
                const tensionGap = Math.abs((Number(book.tension) || 5) - targetTension);
                const tensionScore = Math.max(0, 100 - tensionGap * 12);

                const bookMoods = (book.moods || []).map(m => m.toLowerCase());
                const moodMatch = bookMoods.some(m => selectedMoodText.includes(m) || m.includes(selectedMoodText));
                const moodScore = moodMatch ? 100 : 50;

                const genreScore = (genre === 'any' || genre.includes('не принципово')) ? 70 :
                                   ((book.genre && book.genre.toLowerCase().includes(genre.toLowerCase())) ? 100 : 40);

                const pages = Number(book.pages) || 0;
                const lengthFits = lengthText.includes('не має') || lengthText.includes('any') ||
                                   (lengthText.includes('до 300') && pages > 0 && pages <= 300) ||
                                   (lengthText.includes('масивний') && pages >= 450);

                const base = tensionScore * 0.4 + moodScore * 0.4 + genreScore * 0.2;
                const matchScore = Math.min(99, Math.round(lengthFits ? base : base * 0.8));
                return { ...book, matchScore, lengthFits };
            });

        return scored.sort((a, b) => (b.matchScore - a.matchScore) || (Number(b.lengthFits) - Number(a.lengthFits)));
    }

    /* ---------- Вішлист ---------- */
    function readWishlist() {
        try {
            const parsed = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
            return Array.isArray(parsed) ? parsed.map(String) : [];
        } catch (error) {
            return [];
        }
    }

    function isBookSaved(bookId) {
        if (window.BookDrop && typeof window.BookDrop.isInWishlist === 'function') {
            return window.BookDrop.isInWishlist(bookId);
        }
        return readWishlist().includes(String(bookId));
    }

    function toggleWishlist(bookId, button) {
        const id = String(bookId);
        let saved;
        if (window.BookDrop && typeof window.BookDrop.toggleWishlist === 'function') {
            saved = !window.BookDrop.toggleWishlist(id).removing;
        } else {
            const ids = readWishlist();
            const index = ids.indexOf(id);
            saved = index === -1;
            if (saved) ids.push(id); else ids.splice(index, 1);
            try {
                localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
            } catch (error) {
                console.error('BookDrop: не вдалося зберегти вішлист.', error);
            }
            updateWishlistBadge(ids.length);
            window.dispatchEvent(new CustomEvent(WISHED_EVENT, { detail: { ids: [...ids], bookId: id, removing: !saved } }));
        }
        button.setAttribute('aria-pressed', String(saved));
        const icon = button.querySelector('i');
        if (icon) icon.className = saved ? 'fa-solid fa-heart text-rose-400' : 'fa-regular fa-heart';
    }

    function updateWishlistBadge(count) {
        const total = typeof count === 'number' ? count : readWishlist().length;
        document.querySelectorAll('.wishlist-count').forEach((badge) => {
            badge.textContent = String(total);
        });
    }

    /* ---------- Рендеринг карток ---------- */
    function buildCard(book) {
        const saved = isBookSaved(book.id);
        const cover = book.cover || 'assets/covers/default.webp';
        const title = escapeHtml(book.title || 'Без назви');
        const author = escapeHtml(book.author || '');
        const genre = escapeHtml(book.genre || 'Художня література');
        const description = escapeHtml(book.description || '');
        return `
            <li class="h-full">
                <article class="book-card group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/60 dark:border-[#3F3F46] dark:bg-[#18181B]">
                    <figure class="relative aspect-[2/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                        <img src="${escapeHtml(cover)}" alt="Обкладинка книги «${title}»" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
                        <span class="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-[#121212]/90 px-3 py-1.5 text-xs font-bold text-emerald-300 backdrop-blur-sm">
                            <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true"></span> MATCH ${book.matchScore}%
                        </span>
                        <button type="button" data-wishlist-toggle="${escapeHtml(book.id)}" aria-pressed="${saved}" aria-label="${saved ? 'Видалити' : 'Зберегти'} «${title}» у вішлист" class="absolute right-3 top-3 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/20 bg-[#121212]/80 text-white backdrop-blur-sm transition-all hover:scale-105 hover:text-rose-400">
                            <i class="${saved ? 'fa-solid fa-heart text-rose-400' : 'fa-regular fa-heart'}" aria-hidden="true"></i>
                        </button>
                    </figure>
                    <div class="flex flex-1 flex-col p-5">
                        <div class="mb-3 flex flex-wrap gap-2">
                            <span class="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">${genre}</span>
                        </div>
                        <h3 class="font-display text-xl font-bold leading-snug text-zinc-900 dark:text-white">${title}</h3>
                        <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">${author}</p>
                        <p class="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400 line-clamp-2">${description}</p>
                        <div class="mt-auto pt-5">
                            <a href="book-details.html?id=${encodeURIComponent(book.id)}" class="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-800 transition-all hover:border-indigo-500 hover:bg-indigo-50 dark:border-[#3F3F46] dark:text-zinc-100 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"> Анатомія дропу </a>
                        </div>
                    </div>
                </article>
            </li>
        `;
    }

    function renderResults(books) {
        if (!resultsGrid) return;
        if (!books || !books.length) {
            resultsGrid.innerHTML = `<li class="col-span-full rounded-2xl border border-zinc-200 dark:border-[#3F3F46] px-6 py-10 text-center text-sm text-zinc-600 dark:text-zinc-400">Не знайшли збігів під цей вайб. Спробуйте інший настрій або знизьте напругу.</li>`;
            return;
        }
        resultsGrid.innerHTML = books.map(buildCard).join('');
    }

    function showErrorState(message) {
        if (!resultsGrid) return;
        resultsGrid.innerHTML = `<li class="col-span-full py-10 text-center text-rose-400">${escapeHtml(message)}</li>`;
    }

    /* ---------- Показ / приховання секції добірки ---------- */
    function revealBooksSection() {
        if (!booksSection) return;
        booksSection.hidden = false;
        booksSection.classList.remove('hidden');
        booksSection.style.display = 'block';
        if (prefersReducedMotion()) {
            booksSection.style.opacity = '1';
        } else {
            booksSection.style.opacity = '0';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    booksSection.style.opacity = '1';
                });
            });
        }
        if (submitBtn) submitBtn.setAttribute('aria-expanded', 'true');
        booksSection.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'start',
        });
    }

    function hideBooksSection() {
        if (!booksSection) return;
        booksSection.classList.add('hidden');
        booksSection.hidden = true;
        booksSection.style.display = 'none';
        booksSection.style.opacity = '';
        if (submitBtn) submitBtn.setAttribute('aria-expanded', 'false');
    }

    /* ---------- Перемикання обкладинок (подія зі store.js) ---------- */
    window.addEventListener('bookdrop:covers-change', () => {
        if (!currentPicks.length) return;
        currentPicks = currentPicks.map((pick) => {
            const fresh = booksDatabase.find((b) => String(b.id) === String(pick.id));
            return fresh ? { ...pick, cover: fresh.cover } : pick;
        });
        renderResults(currentPicks);
    });

    /* ---------- Головна дія: «Згенерувати дроп» ---------- */
    async function runMatcher() {
        if (!booksDatabase.length) await loadBooks();
        const picks = scoreBooks().slice(0, RESULT_COUNT);
        currentPicks = picks;
        renderResults(picks);
        revealBooksSection();
    }

    /* ---------- Flip-картки в секції переваг: тап / клавіатура ---------- */
    document.querySelectorAll('.flip-card').forEach((card) => {
        const inner = card.querySelector('.flip-card__inner');
        if (!inner) return;
        const canHover = window.matchMedia('(hover: hover)').matches;
        const toggle = () => {
            const flipped = card.classList.toggle('is-flipped');
            inner.setAttribute('aria-pressed', String(flipped));
        };
        // На пристроях із наведенням картка перевертається через CSS :hover, тап потрібен лише на тачскрінах
        inner.addEventListener('click', () => { if (!canHover) toggle(); });
        inner.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggle();
            }
        });
    });

    /* ---------- Ініціалізація ---------- */
    Object.values(chipGroups).forEach(initChipGroup);

    // Тримаємо добірку прихованою при завантаженні сторінки
    hideBooksSection();

    if (resultsGrid) {
        resultsGrid.addEventListener('click', (event) => {
            const button = event.target instanceof Element ? event.target.closest('[data-wishlist-toggle]') : null;
            if (!button) return;
            event.preventDefault();
            toggleWishlist(button.dataset.wishlistToggle, button);
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            runMatcher();
        });
    }

    loadBooks();
    updateWishlistBadge();
});