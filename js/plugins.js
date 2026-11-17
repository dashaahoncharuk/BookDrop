document.addEventListener('DOMContentLoaded', () => {
  // 1. Typed.js у головному блоці (Hero)
  const typedTarget = document.querySelector('#typed-text');
  if (typedTarget && typeof Typed !== 'undefined') {
    typedTarget.textContent = ''; // очищаємо початковий текст перед стартом
    new Typed('#typed-text', {
      strings: [
        'психологічний трилер',
        'затишний роман',
        'атмосферну містику',
        'інтелектуальну фантастику',
        'легку історію на вечір'
      ],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      smartBackspace: true
    });
  }

  // 2. Swiper.js — слайдер бестселерів тижня
  if (document.querySelector('.books-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.books-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3200,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.books-swiper .swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.books-swiper .swiper-button-next',
        prevEl: '.books-swiper .swiper-button-prev'
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 }
      }
    });
  }

  // 3. Swiper.js — слайдер відгуків читачів
  if (document.querySelector('.reviews-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.reviews-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.reviews-swiper .swiper-pagination',
        clickable: true
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  // 4. Fancybox v5 — галерея обкладинок із зумом
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind('[data-fancybox="bookdrop-covers"]', {
      Thumbs: { autoStart: false },
      Toolbar: {
        display: {
          left: ['infobar'],
          middle: ['zoomIn', 'zoomOut', 'toggle1to1', 'rotateCCW', 'rotateCW'],
          right: ['close']
        }
      },
      Images: {
        zoom: true
      }
    });
  }
});