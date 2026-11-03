/* BookDrop — js/app.js (виправлена версія) */

// ---------- ЧИСТА ЛОГІКА ПІДБОРУ (можна тестувати окремо) ----------

// Порядок збігається з порядком чіпів «Настрій» в index.html
const MOOD_RULES = [
  { moods: ['cozy', 'uplifting'],           vibes: ['cozy', 'light'] },                                 // Затишок & Кава
  { moods: ['mysterious', 'dark', 'drive'], vibes: ['intense-thriller', 'gothic'] },                    // Адреналін & Детектив
  { moods: ['intellectual'],                vibes: ['dark-academia', 'introspective', 'dystopian'] },   // Інтелектуальний виклик
  { moods: ['romantic'],                    vibes: ['romantic', 'light'] }                               // Легкий романс
];

function scoreBooks(list, { moodIndex, tension, length, genre = 'any' }) {
  const rule = MOOD_RULES[moodIndex] || MOOD_RULES[0];

  const scored = list.map(book => {
    const tensionDiff = Math.abs((book.tension || 5) - tension);
    const tensionScore = Math.max(0, 100 - tensionDiff * 12) * 0.6;           // до 60

    const moodHits = (book.moods || []).filter(m => rule.moods.includes(m)).length;
    const vibeHit = rule.vibes.includes(book.vibe);
    const moodScore = (moodHits > 0 ? 25 : 0) + (vibeHit ? 10 : 0);            // до 35

    let lengthOk = true;
    if (length === 'short') lengthOk = book.pages <= 300;
    if (length === 'long') lengthOk = book.pages >= 450;

    const genreOk = genre === 'any' || book.category === genre;
    const relevant = moodHits > 0 || vibeHit;

    const raw = tensionScore + moodScore + (lengthOk ? 5 : 0) + Math.random() * 3;

    // Пріоритет: жанр (жорстко) → настрій + обсяг → настрій → обсяг → решта
    const tier = (genreOk ? 0 : 4) + (relevant && lengthOk ? 0 : relevant ? 1 : lengthOk ? 2 : 3);

    return { ...book, matchScore: Math.max(1, Math.min(99, Math.round(raw))), tier };
  });

  return scored
    .sort((a, b) => a.tier - b.tier || b.matchScore - a.matchScore)
    .slice(0, 4);
}

if (typeof module !== 'undefined' && module.exports) module.exports = { scoreBooks };
if (typeof document === 'undefined') { /* Node-тест: далі не виконуємо */ }
else document.addEventListener('DOMContentLoaded', () => {

  const booksDatabase = (typeof books !== 'undefined' && Array.isArray(books)) ? books : [];

  const resultsContainer = document.getElementById('recommendations-container') || document.getElementById('books-grid');
  const emptyState = document.getElementById('recommendation-status');
  const tensionSlider = document.getElementById('tension-range');
  const tensionValueDisplay = document.getElementById('tension-value');
  const submitBtn = document.querySelector('.matcher-submit') || document.getElementById('submit-matcher');

  // Окремі групи чіпів
  const moodChips = [...document.querySelectorAll('[aria-label="Оберіть настрій"] .matcher-chip')];
  const genreChips = [...document.querySelectorAll('[aria-label="Оберіть жанр"] .matcher-chip')];
  const lengthChips = [...document.querySelectorAll('[aria-label="Оберіть обсяг книги"] .matcher-chip')];

  const ACTIVE_CLASSES = ['bg-indigo-600', 'text-white', 'border-indigo-600'];

  function selectChip(group, chip) {
    group.forEach(c => {
      const on = c === chip;
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
      ACTIVE_CLASSES.forEach(cls => c.classList.toggle(cls, on));
    });
  }
  [moodChips, genreChips, lengthChips].forEach(group => {
    group.forEach(chip => chip.addEventListener('click', () => selectChip(group, chip)));
  });

  // 1. Слайдер напруги
  function syncTension() {
    if (!tensionSlider) return;
    const v = Number(tensionSlider.value);
    if (tensionValueDisplay) tensionValueDisplay.textContent = `${v} із 10`;
    tensionSlider.setAttribute('aria-valuenow', v);
    document.querySelectorAll('[data-tension-tick]').forEach(t => {
      t.classList.toggle('is-active', Number(t.dataset.tensionTick) === v);
    });
  }
  if (tensionSlider) {
    tensionSlider.addEventListener('input', syncTension);
    syncTension();
  }

  // 2. Збір вибраних значень
  function currentOptions() {
    const moodIndex = Math.max(0, moodChips.findIndex(c => c.getAttribute('aria-pressed') === 'true'));
    const lengthIndex = lengthChips.findIndex(c => c.getAttribute('aria-pressed') === 'true');
    const genreChip = genreChips.find(c => c.getAttribute('aria-pressed') === 'true');
    return {
      moodIndex,
      genre: genreChip ? (genreChip.dataset.genre || 'any') : 'any',
      tension: tensionSlider ? parseInt(tensionSlider.value, 10) : 7,
      length: lengthIndex === 0 ? 'short' : lengthIndex === 1 ? 'long' : 'any'
    };
  }

  function runMoodMatcher(scrollToResults = false) {
    if (!booksDatabase.length) {
      console.error('BookDrop: масив books не знайдено. Перевірте, що js/books.js підключено перед app.js.');
      return;
    }
    renderResults(scoreBooks(booksDatabase, currentOptions()));
    if (scrollToResults) {
      document.getElementById('books')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (submitBtn) submitBtn.addEventListener('click', () => runMoodMatcher(true));

  // 3. Допоміжне
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const Store = window.BookDrop;
  const updateBadge = () => Store && Store.updateBadge();
  const checkIsBookInWishlist = id => Boolean(Store && Store.isInWishlist(id));

  // 4. Рендеринг карток
  function renderResults(booksList) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = '';

    if (!booksList || booksList.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }
    if (emptyState) emptyState.classList.add('hidden');

    booksList.forEach(book => {
      const isSaved = checkIsBookInWishlist(book.id);
      const li = document.createElement('li');
      li.innerHTML = `
        <article class="group relative flex flex-col h-full bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-[#3F3F46] hover:border-indigo-500/60 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1">
          <figure class="relative w-full aspect-[2/3] overflow-hidden bg-zinc-100 dark:bg-[#27272A]">
            <img src="${esc(book.cover)}" alt="Обкладинка книги «${esc(book.title)}»" loading="lazy"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                 onerror="const p=this.nextElementSibling;p.classList.remove('hidden');p.classList.add('flex');this.remove();">
            <div class="hidden absolute inset-0 flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-indigo-600/30 to-zinc-900/40">
              <i class="fa-solid fa-book text-3xl text-indigo-400 mb-3" aria-hidden="true"></i>
              <span class="font-display font-bold text-zinc-900 dark:text-white leading-tight">${esc(book.title)}</span>
              <span class="text-xs text-zinc-600 dark:text-zinc-300 mt-1">${esc(book.author)}</span>
            </div>
            <span class="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#18181B]/90 backdrop-blur-sm border border-[#10B981]/40 text-[#10B981] text-xs font-bold">
              <span class="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span> MATCH ${book.matchScore}%
            </span>
          </figure>
          <div class="flex flex-col flex-grow p-5">
            <p class="text-[11px] font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">${esc(book.genre)}</p>
            <h3 class="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-500 transition-colors line-clamp-2 mt-1">${esc(book.title)}</h3>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">${esc(book.author)} · ${book.pages} стор. · напруга ${book.tension}/10</p>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed line-clamp-3">${esc(book.description)}</p>
            <div class="mt-auto pt-4 flex items-center justify-between gap-3">
              <a href="book-details.html?id=${encodeURIComponent(book.id)}" class="flex-grow inline-flex items-center justify-center h-10 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors">
                Детальніше
              </a>
              <button type="button" class="flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-300 dark:border-[#3F3F46] bg-zinc-100 dark:bg-[#27272A] text-zinc-600 dark:text-zinc-300 hover:border-indigo-400 transition-colors"
                      data-wishlist-button data-book-id="${esc(book.id)}" aria-pressed="${isSaved}" aria-label="Додати «${esc(book.title)}» у вішлист">
                <i class="${isSaved ? 'fa-solid fa-heart text-indigo-400' : 'fa-regular fa-heart'} text-sm" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </article>`;
      resultsContainer.appendChild(li);
    });
  }

  // 5. Вішлист: клік по [data-wishlist-button] обробляє js/store.js

  // 6. Перемикач теми та мобільне меню
  const themeBtn = document.querySelector('.btn-theme:not(#mobile-menu-btn)');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const root = document.documentElement;
      const toLight = root.classList.contains('dark');
      root.classList.toggle('dark', !toLight);
      root.setAttribute('data-theme', toLight ? 'light' : 'dark');
      try { localStorage.setItem('bookdrop-theme', toLight ? 'light' : 'dark'); } catch (e) {}
    });
  }

  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('mobile-menu-icon');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const open = menu.classList.toggle('hidden') === false;
      menuBtn.setAttribute('aria-expanded', String(open));
      if (menuIcon) menuIcon.className = open ? 'fa-solid fa-xmark text-lg' : 'fa-solid fa-bars text-lg';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      if (menuIcon) menuIcon.className = 'fa-solid fa-bars text-lg';
    }));
  }

  // 7. Первинний запуск
  updateBadge();
  if (booksDatabase.length > 0) runMoodMatcher(false);
});