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
})();

