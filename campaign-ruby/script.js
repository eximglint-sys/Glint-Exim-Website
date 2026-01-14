// Simple scroll helpers and CTA redirect
(function () {
  const SHOPIFY_PAGE_URL = 'https://fq0a1w-t7.myshopify.com/pages/ruby-maanak';

  document.querySelectorAll('[data-scroll]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-scroll');
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const ctaShop = document.getElementById('ctaShop');
  if (ctaShop) {
    ctaShop.addEventListener('click', () => {
      window.location.href = SHOPIFY_PAGE_URL;
    });
  }

  // Hero Carousel
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const carouselDots = document.querySelectorAll('.carousel-dots .dot');
  let currentSlide = 0;
  let carouselInterval;

  function showSlide(index) {
    carouselSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    carouselDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % carouselSlides.length;
    showSlide(next);
  }

  function startCarousel() {
    carouselInterval = setInterval(nextSlide, 10000); // Change slide every 10 seconds
  }

  function stopCarousel() {
    clearInterval(carouselInterval);
  }

  // Initialize carousel
  if (carouselSlides.length > 0) {
    startCarousel();

    // Dot click handlers
    carouselDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopCarousel();
        showSlide(index);
        startCarousel();
      });
    });

    // Pause on hover
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
      heroCarousel.addEventListener('mouseenter', stopCarousel);
      heroCarousel.addEventListener('mouseleave', startCarousel);
    }
  }
})();

