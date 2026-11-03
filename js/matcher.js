/* BookDrop — підбір книг (matcher.js)
   Підключати ПІСЛЯ js/books.js. Працює з поточною розміткою index.html. */
(function () {
  'use strict';

  // Відповідність чіпів «Настрій» (за порядком у HTML) даним з books.js
  var MOOD_RULES = [
    { moods: ['cozy', 'uplifting'],            vibes: ['cozy', 'light'] },                         // Затишок & Кава
    { moods: ['mysterious', 'dark', 'drive'],  vibes: ['intense-thriller', 'gothic'] },            // Адреналін & Детектив
    { moods: ['intellectual'],                 vibes: ['dark-academia', 'introspective', 'dystopian'] }, // Інтелектуальний виклик
    { moods: ['romantic'],                     vibes: ['romantic', 'light'] }                      // Легкий романс
  ];

  // Чиста функція підбору (легко тестувати)
  function pickBooks(list, opts) {
    var rule = MOOD_RULES[opts.moodIndex] || MOOD_RULES[0];
    var scored = list.map(function (b) {
      var moodHits = (b.moods || []).filter(function (m) { return rule.moods.indexOf(m) !== -1; }).length;
      var vibeHit = rule.vibes.indexOf(b.vibe) !== -1 ? 1 : 0;
      var tensionGap = Math.abs((b.tension || 0) - opts.tension);

      var lengthOk = true;
      if (opts.length === 'short') lengthOk = b.pages <= 300;
      if (opts.length === 'long') lengthOk = b.pages >= 450;

      var score = moodHits * 3 + vibeHit * 2 - tensionGap * 1.2 + Math.random() * 0.8;
      return { book: b, score: score, relevant: (moodHits + vibeHit) > 0, lengthOk: lengthOk };
    });

    function top(arr) {
      return arr.sort(function (a, b) { return b.score - a.score; });
    }

    // 1) підходять і за настроєм, і за обсягом
    var result = top(scored.filter(function (s) { return s.relevant && s.lengthOk; }));
    // 2) якщо мало — послаблюємо обсяг
    if (result.length < 4) {
      var extra = top(scored.filter(function (s) { return s.relevant && !s.lengthOk; }));
      result = result.concat(extra);
    }
    // 3) якщо все ще мало — беремо найближчі за напругою
    if (result.length < 4) {
      var rest = top(scored.filter(function (s) { return !s.relevant; }));
      result = result.concat(rest);
    }
    return result.slice(0, 4).map(function (s) { return s.book; });
  }

  // Експорт для тестів у Node
  if (typeof module !== 'undefined' && module.exports) { module.exports = { pickBooks: pickBooks }; }
  if (typeof document === 'undefined') return;

  // ---------- DOM ----------
  var WISHLIST_KEY = 'bookdrop-wishlist';

  function readWishlist() {
    try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; } catch (e) { return []; }
  }
  function writeWishlist(arr) {
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(arr)); } catch (e) {}
  }
  function updateWishlistBadge() {
    var n = readWishlist().length;
    document.querySelectorAll('.wishlist-count').forEach(function (el) { el.textContent = n; });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function cardHTML(b, inWishlist) {
    var tropes = (b.tropes || []).slice(0, 2).map(function (t) {
      return '<span class="px-2 py-0.5 text-[11px] rounded-full bg-zinc-100 dark:bg-[#27272A] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-[#3F3F46]">' + esc(t) + '</span>';
    }).join('');

    return '' +
    '<li>' +
      '<article class="group flex flex-col h-full bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-[#3F3F46] rounded-2xl overflow-hidden shadow-sm dark:shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-500/10">' +
        '<div class="relative aspect-[2/3] bg-zinc-100 dark:bg-[#27272A]">' +
          '<img src="' + esc(b.cover) + '" alt="Обкладинка книги «' + esc(b.title) + '»" loading="lazy" class="absolute inset-0 w-full h-full object-cover" ' +
            'onerror="var p=this.nextElementSibling;p.classList.remove(\'hidden\');p.classList.add(\'flex\');this.remove();">' +
          '<div class="hidden absolute inset-0 flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-indigo-600/30 to-zinc-900/40">' +
            '<i class="fa-solid fa-book text-3xl text-indigo-400 mb-3" aria-hidden="true"></i>' +
            '<span class="font-display font-bold text-zinc-900 dark:text-white leading-tight">' + esc(b.title) + '</span>' +
            '<span class="text-xs text-zinc-600 dark:text-zinc-300 mt-1">' + esc(b.author) + '</span>' +
          '</div>' +
          '<span class="absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-lg bg-black/70 text-white backdrop-blur">' +
            '<i class="fa-solid fa-bolt text-amber-400 mr-1" aria-hidden="true"></i>' + b.tension + '/10</span>' +
          '<button type="button" class="wish-btn absolute top-3 right-3 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" ' +
            'data-id="' + esc(b.id) + '" aria-pressed="' + (inWishlist ? 'true' : 'false') + '" aria-label="Додати «' + esc(b.title) + '» у вішлист">' +
            '<i class="' + (inWishlist ? 'fa-solid' : 'fa-regular') + ' fa-heart" aria-hidden="true"></i></button>' +
        '</div>' +
        '<div class="flex flex-col flex-1 p-5">' +
          '<p class="text-[11px] font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">' + esc(b.genre) + '</p>' +
          '<h3 class="text-base font-bold text-zinc-900 dark:text-white mt-1 leading-snug">' + esc(b.title) + '</h3>' +
          '<p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">' + esc(b.author) + ' · ' + b.pages + ' стор.</p>' +
          '<p class="text-sm text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed line-clamp-4">' + esc(b.description) + '</p>' +
          '<div class="flex flex-wrap gap-1.5 mt-auto pt-4">' + tropes + '</div>' +
        '</div>' +
      '</article>' +
    '</li>';
  }

  function init() {
    var container = document.getElementById('recommendations-container');
    var submit = document.querySelector('.matcher-submit');
    var range = document.getElementById('tension-range');
    if (!container || !submit || !range) return;

    var list = window.books;
    if (!Array.isArray(list) || !list.length) {
      container.innerHTML = '<li class="col-span-full text-sm text-zinc-500">Не вдалося завантажити каталог книг (js/books.js).</li>';
      console.error('BookDrop: window.books не знайдено. Перевірте, що js/books.js підключено перед matcher.js');
      return;
    }

    var moodChips = Array.prototype.slice.call(document.querySelectorAll('[aria-label="Оберіть настрій"] .matcher-chip'));
    var lengthChips = Array.prototype.slice.call(document.querySelectorAll('[aria-label="Оберіть обсяг книги"] .matcher-chip'));

    function selectChip(chips, chip) {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
    }
    moodChips.forEach(function (c) { c.addEventListener('click', function () { selectChip(moodChips, c); }); });
    lengthChips.forEach(function (c) { c.addEventListener('click', function () { selectChip(lengthChips, c); }); });

    // Слайдер напруги
    var valueEl = document.getElementById('tension-value');
    function syncRange() {
      var v = Number(range.value);
      if (valueEl) valueEl.textContent = v + ' із 10';
      document.querySelectorAll('[data-tension-tick]').forEach(function (t) {
        t.classList.toggle('is-active', Number(t.getAttribute('data-tension-tick')) === v);
      });
    }
    range.addEventListener('input', syncRange);
    syncRange();

    function currentOpts() {
      var mi = Math.max(0, moodChips.findIndex(function (c) { return c.getAttribute('aria-pressed') === 'true'; }));
      var li = lengthChips.findIndex(function (c) { return c.getAttribute('aria-pressed') === 'true'; });
      return { moodIndex: mi, tension: Number(range.value), length: li === 0 ? 'short' : li === 1 ? 'long' : 'any' };
    }

    function render(scroll) {
      var picks = pickBooks(list, currentOpts());
      var wl = readWishlist();
      container.innerHTML = picks.map(function (b) { return cardHTML(b, wl.indexOf(b.id) !== -1); }).join('');
      if (scroll) {
        var sec = document.getElementById('books');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    submit.addEventListener('click', function () { render(true); });

    // Вішлист (делегування подій)
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('.wish-btn');
      if (!btn) return;
      var id = btn.getAttribute('data-id');
      var wl = readWishlist();
      var i = wl.indexOf(id);
      if (i === -1) wl.push(id); else wl.splice(i, 1);
      writeWishlist(wl);
      var on = i === -1;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.querySelector('i').className = (on ? 'fa-solid' : 'fa-regular') + ' fa-heart';
      updateWishlistBadge();
    });

    updateWishlistBadge();
    render(false); // початкова добірка за значеннями за замовчуванням
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();