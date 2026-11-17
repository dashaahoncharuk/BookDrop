/**
 * BookDrop · Валідація форми «Запропонувати тайтл» + доступне модальне вікно успіху
 * Файл: js/validation.js
 * Підключення (community.html, перед </body>):
 *   <script src="js/validation.js" defer></script>
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const $ = (id) => document.getElementById(id);

  const form = $('dropForm');
  if (!form) return;

  // ---------------------------------------------------------------------------
  // Константи
  // ---------------------------------------------------------------------------

  // локальна частина: атоми без пробілів/@/крапок, розділені одинарними крапками
  // домен: мітки з літер, цифр і дефісів (не на краях), TLD із ≥ 2 літер
  const EMAIL_RE =
    /^[^\s@.]+(?:\.[^\s@.]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  const PHONE_RE = /^\+380[1-9]\d{8}$/; // +380, код оператора не з 0, разом 9 цифр
  const MAX_EMAIL = 254;
  const MAX_COMMENT = 500;
  const COMMENT_WARN_AT = 450;
  const STORAGE_KEY = 'bookdrop-suggestions';
  const MAX_STORED = 50;

  // ---------------------------------------------------------------------------
  // Кеш DOM-елементів (один раз, без getElementById на кожне натискання)
  // ---------------------------------------------------------------------------

  const names = ['title', 'author', 'email', 'phone', 'comment', 'consent'];
  const ui = {};
  names.forEach((name) => {
    const input = form.elements[name];
    const box = $(`drop-${name}-error`);
    if (!input || !box) return;
    ui[name] = {
      input,
      box,
      text: box.querySelector('[data-error-text]') || box,
    };
  });

  const submitBtn = $('dropSubmit');
  const btnText = $('dropBtnText');
  const spinner = $('dropSpinner');
  const counter = $('drop-comment-count');
  const counterStatus = $('drop-comment-status');
  const formError = $('dropFormError');
  const formErrorText = formError ? formError.querySelector('[data-error-text]') || formError : null;

  const modal = $('successModal');
  const modalCloseBtn = modal ? modal.querySelector('[data-modal-close]') : null;
  const modalOverlay = modal ? modal.querySelector('[data-modal-overlay]') : null;

  if (!submitBtn || names.some((n) => !ui[n])) {
    // Розмітка неповна: не ламаємо сторінку, але й не даємо нативної відправки
    console.warn('[validation.js] Розмітка форми неповна, валідацію не активовано.');
    form.addEventListener('submit', (e) => e.preventDefault());
    return;
  }

  // ---------------------------------------------------------------------------
  // Нормалізація тексту
  // ---------------------------------------------------------------------------

  // Прибирає символи нульової ширини, обрізає краї
  function cleanText(v) {
    return v.replace(/[​-‍﻿]/g, '').trim();
  }

  // Те саме + згортає повторні пробіли (для збереження)
  function tidyText(v) {
    return cleanText(v).replace(/\s+/g, ' ');
  }

  // ---------------------------------------------------------------------------
  // Телефон
  // ---------------------------------------------------------------------------

  // Прибирає пробіли, нерозривні пробіли, дефіси, дужки
  function cleanPhone(raw) {
    return raw.replace(/[\s \-()]/g, '');
  }

  // М'яке автодоповнення: 050… → +38050…, 380… → +380…
  function autoPrefixPhone(v) {
    if (v.startsWith('0')) return '+38' + v;
    if (v.startsWith('380')) return '+' + v;
    return v;
  }

  // Повертає текст помилки або '' (поле необов'язкове: порожнє = ОК)
  function getPhoneError(value) {
    const v = value.trim();
    if (!v) return '';
    if (PHONE_RE.test(v)) return '';
    if (!v.startsWith('+380')) return 'Номер має починатися з +380';
    const rest = v.slice(4);
    if (/\D/.test(rest)) return 'Лише цифри: без пробілів, дужок, дефісів і літер';
    if (rest.length !== 9) return 'Після +380 має бути рівно 9 цифр. Формат: +380XXXXXXXXX';
    return 'Код оператора після +380 не може починатися з 0';
  }

  // Спрацьовує на input: і введення, і вставка, і автозаповнення браузера.
  // Нормалізація тут же, тож окремий paste-обробник не потрібен (і Ctrl+Z працює).
  function handlePhoneInput() {
    const el = ui.phone.input;
    const before = el.value;
    const next = autoPrefixPhone(cleanPhone(before));

    if (next !== before) {
      const caret = el.selectionStart;
      el.value = next;
      if (document.activeElement === el && caret !== null) {
        const pos = Math.max(0, Math.min(next.length, caret + (next.length - before.length)));
        try {
          el.setSelectionRange(pos, pos);
        } catch (err) {
          /* не критично */
        }
      }
    }

    // Під час введення червоне не показуємо: ховаємо стару помилку,
    // а зелений вмикаємо лише коли номер уже повністю коректний
    hideError('phone');
    el.removeAttribute('aria-invalid');
    setFieldState(el, PHONE_RE.test(el.value.trim()));
  }

  // ---------------------------------------------------------------------------
  // Правила
  // ---------------------------------------------------------------------------

  const rules = {
    title: (v) => {
      v = cleanText(v);
      if (!v) return 'Вкажіть назву книги';
      if (v.length < 2) return 'Назва має містити щонайменше 2 символи';
      return '';
    },
    author: (v) => {
      v = cleanText(v);
      if (!v) return 'Вкажіть автора';
      if (v.length < 2) return 'Імʼя автора має містити щонайменше 2 символи';
      return '';
    },
    email: (v) => {
      v = v.trim();
      if (!v) return ''; // необов'язкове
      if (v.length > MAX_EMAIL || !EMAIL_RE.test(v)) {
        return 'Введіть коректну адресу, наприклад name@example.com';
      }
      return '';
    },
    phone: (v) => getPhoneError(v),
    comment: (v) => (v.length > MAX_COMMENT ? `Максимум ${MAX_COMMENT} символів` : ''),
    consent: (_, el) => (el.checked ? '' : 'Потрібна згода з політикою конфіденційності'),
  };

  const touched = new Set();
  let isSubmitting = false;

  // ---------------------------------------------------------------------------
  // Стани поля: помилка (aria-invalid) та успіх (data-valid)
  // ---------------------------------------------------------------------------

  function setFieldState(el, valid) {
    if (valid) el.dataset.valid = 'true';
    else delete el.dataset.valid;
  }

  function showError(name, message) {
    const { input, box, text } = ui[name];
    // Текст перезаписуємо лише при зміні, щоб скрінрідер не читав його повторно
    if (text.textContent !== message) text.textContent = message;
    box.classList.remove('hidden');
    input.setAttribute('aria-invalid', 'true');
    setFieldState(input, false);
  }

  function hideError(name) {
    const { box, text } = ui[name];
    if (text.textContent !== '') text.textContent = '';
    box.classList.add('hidden');
  }

  function validate(name) {
    const { input } = ui[name];
    const message = rules[name](input.value, input);

    if (message) {
      showError(name, message);
    } else {
      hideError(name);
      input.removeAttribute('aria-invalid');
      const filled = input.type === 'checkbox' ? input.checked : cleanText(input.value) !== '';
      setFieldState(input, filled);
    }
    return !message;
  }

  // ---------------------------------------------------------------------------
  // Лічильник коментаря (з повідомленням для скрінрідера на межах)
  // ---------------------------------------------------------------------------

  function updateCounter() {
    const len = ui.comment.input.value.length;
    counter.textContent = `${len} / ${MAX_COMMENT}`;
    if (!counterStatus) return;
    let msg = '';
    if (len >= MAX_COMMENT) msg = `Досягнуто ліміт ${MAX_COMMENT} символів`;
    else if (len >= COMMENT_WARN_AT) msg = `Залишилось ${MAX_COMMENT - len} символів`;
    if (counterStatus.textContent !== msg) counterStatus.textContent = msg;
  }

  // ---------------------------------------------------------------------------
  // Обробники полів (blur / input / change)
  // ---------------------------------------------------------------------------

  names.forEach((name) => {
    const { input } = ui[name];
    const isCheckbox = input.type === 'checkbox';

    // Перша повна перевірка: при втраті фокуса
    input.addEventListener('blur', () => {
      touched.add(name);
      validate(name);
    });

    // Далі: перевірка в реальному часі
    input.addEventListener(isCheckbox ? 'change' : 'input', () => {
      if (name === 'phone') {
        handlePhoneInput();
        return;
      }
      if (name === 'comment') updateCounter();
      const hasError = !ui[name].box.classList.contains('hidden');
      if (isCheckbox || touched.has(name) || hasError) validate(name);
    });
  });

  // ---------------------------------------------------------------------------
  // Форм-рівнева помилка (мережа, збереження)
  // ---------------------------------------------------------------------------

  function showFormError(message) {
    if (!formError) return;
    formErrorText.textContent = message;
    formError.classList.remove('hidden');
  }

  function hideFormError() {
    if (!formError) return;
    formErrorText.textContent = '';
    formError.classList.add('hidden');
  }

  // ---------------------------------------------------------------------------
  // Модальне вікно успіху (доступне)
  // ---------------------------------------------------------------------------

  const FOCUSABLE =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // Усе, що лежить на сторінці поза модалкою: ізолюємо від клавіатури та скрінрідера
  function backgroundNodes() {
    return Array.from(document.body.children).filter(
      (n) => n !== modal && n.tagName !== 'SCRIPT' && n.tagName !== 'STYLE'
    );
  }

  function setBackgroundInert(state) {
    backgroundNodes().forEach((n) => {
      if (state) n.setAttribute('inert', '');
      else n.removeAttribute('inert');
    });
  }

  function isModalOpen() {
    return !!modal && !modal.classList.contains('hidden');
  }

  function onModalKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeSuccessModal();
      return;
    }
    if (e.key !== 'Tab') return;

    // Focus trap: фокус циклічно ходить усередині діалогу
    const items = modal.querySelectorAll(FOCUSABLE);
    if (!items.length) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];

    // Фокус опинився поза модалкою (клік по тексту картки, body тощо): повертаємо всередину
    if (!modal.contains(document.activeElement)) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
      return;
    }
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function openSuccessModal() {
    if (!modal || !modalCloseBtn) {
      console.warn('[validation.js] Модальне вікно #successModal не знайдено.');
      return;
    }
    if (isModalOpen()) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    setBackgroundInert(true);
    document.addEventListener('keydown', onModalKeydown);
    modalCloseBtn.focus(); // фокус всередину діалогу
  }

  function closeSuccessModal() {
    if (!isModalOpen()) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    document.removeEventListener('keydown', onModalKeydown);
    setBackgroundInert(false); // спершу знімаємо inert, інакше фокус не повернеться
    submitBtn.focus(); // повернення фокусу на кнопку «Надіслати»
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSuccessModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeSuccessModal);

  // ---------------------------------------------------------------------------
  // Скидання, збереження, стан завантаження
  // ---------------------------------------------------------------------------

  function resetFormState() {
    form.reset();
    touched.clear();
    updateCounter();
    hideFormError();
    names.forEach((name) => {
      hideError(name);
      ui[name].input.removeAttribute('aria-invalid');
      setFieldState(ui[name].input, false);
    });
  }

  // Знімок значень, зроблений одразу після валідації (до будь-яких затримок)
  function collectPayload() {
    return {
      title: tidyText(ui.title.input.value),
      author: tidyText(ui.author.input.value),
      email: ui.email.input.value.trim(),
      phone: ui.phone.input.value.trim(),
      comment: ui.comment.input.value.replace(/[​-‍﻿]/g, '').trim(),
      createdAt: new Date().toISOString(),
    };
  }

  // Повертає true, якщо запис збережено
  function saveSuggestion(payload) {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const list = Array.isArray(raw) ? raw : [];
      list.push(payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(-MAX_STORED)));
      return true;
    } catch (err) {
      return false; // приватний режим, квота, зіпсований JSON
    }
  }

  function setLoading(state) {
    isSubmitting = state;
    submitBtn.disabled = state;
    submitBtn.setAttribute('aria-busy', String(state));
    spinner.classList.toggle('hidden', !state);
    btnText.textContent = state ? 'Надсилаємо…' : 'Надіслати дроп';
    // Поки йде надсилання, поля заблоковані для редагування
    if ('inert' in form) form.inert = state;
  }

  // ---------------------------------------------------------------------------
  // Відправка форми
  // ---------------------------------------------------------------------------

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // захист від подвійного кліку

    hideFormError();

    // Перевіряємо всі поля, фокус на першому невалідному
    let firstInvalid = null;
    names.forEach((name) => {
      touched.add(name);
      if (!validate(name) && !firstInvalid) firstInvalid = ui[name].input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Знімок значень ДО затримки: зберігаємо саме те, що пройшло валідацію
    const payload = collectPayload();

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200)); // імітація запиту (тут може бути fetch)

      const saved = saveSuggestion(payload);

      // 1. Розблоковуємо форму та кнопку ДО повернення фокусу
      setLoading(false);

      if (!saved) {
        showFormError('Не вдалося зберегти пропозицію в браузері. Перевірте, чи не заповнене сховище, і спробуйте ще раз.');
        submitBtn.focus();
        return;
      }

      // 2. Знімаємо фокус із поля ДО reset, інакше blur покаже помилки на порожніх полях
      if (document.activeElement instanceof HTMLElement && form.contains(document.activeElement)) {
        document.activeElement.blur();
      }
      // 3. Очищаємо форму та відкриваємо модалку
      resetFormState();
      openSuccessModal();
    } catch (err) {
      setLoading(false);
      showFormError('Не вдалося надіслати. Спробуйте ще раз.');
      submitBtn.focus();
    }
  });

  updateCounter();
});