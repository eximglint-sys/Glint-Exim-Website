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
    ctaShop.addEventListener('click', (e) => {
      e.preventDefault();
      triggerShopifyModal();
    });
  }

  // Shopify Buy Button Triggers
  function triggerShopifyModal() {
    console.log('Triggering Shopify modal...');
    
    const productComponent = document.getElementById('product-component-1768370709576');
    if (!productComponent) {
      console.error('Shopify product component not found');
      setTimeout(triggerShopifyModal, 500);
      return;
    }

    // Function to find and click button
    function findAndClickButton() {
      // Try multiple selectors - component should be rendered but off-screen
      const selectors = [
        '.shopify-buy__btn',
        'button.shopify-buy__btn',
        'a.shopify-buy__btn',
        '.shopify-buy__product__btn',
        'button[data-shopify-button]',
        '[data-shopify-modal]',
        'button',
        'a[href*="cart"]',
        '[role="button"]',
        '.shopify-buy__product__buy-button',
        '[class*="shopify-buy"] button',
        '[class*="shopify-buy"] a'
      ];

      // Try querySelector on component and document
      for (let selector of selectors) {
        let button = productComponent.querySelector(selector);
        if (!button) {
          // Also try in document in case component uses shadow DOM or iframe
          button = document.querySelector('#product-component-1768370709576 ' + selector);
        }
        
        if (button) {
          console.log('Found button with selector:', selector, button);
          try {
            button.click();
            console.log('Button clicked successfully');
            return true;
          } catch (e) {
            console.log('Error clicking button:', e);
          }
        }
      }

      // Try finding by text content
      const allElements = productComponent.querySelectorAll('*');
      for (let el of allElements) {
        const text = (el.textContent || '').toLowerCase().trim();
        const tagName = el.tagName.toLowerCase();
        if ((tagName === 'button' || tagName === 'a' || el.onclick) && 
            (text.includes('add to cart') || text.includes('buy') || 
             text.includes('purchase') || el.classList.toString().includes('shopify'))) {
          console.log('Found element by content:', el, text);
          try {
            el.click();
            return true;
          } catch (e) {
            console.log('Error clicking element:', e);
          }
        }
      }

      // Check for iframes
      const iframes = productComponent.querySelectorAll('iframe');
      for (let iframe of iframes) {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          const iframeButton = iframeDoc.querySelector('button, a, [role="button"]');
          if (iframeButton) {
            console.log('Found button in iframe');
            iframeButton.click();
            return true;
          }
        } catch (e) {
          console.log('Cannot access iframe (cross-origin):', e);
        }
      }

      console.warn('No Shopify button found');
      return false;
    }

    // Try immediately
    if (!findAndClickButton()) {
      // Retry with increasing delays
      let attempts = 0;
      const maxAttempts = 20;
      const retryInterval = setInterval(() => {
        attempts++;
        if (findAndClickButton() || attempts >= maxAttempts) {
          clearInterval(retryInterval);
          if (attempts >= maxAttempts) {
            console.error('Could not find Shopify button after', maxAttempts, 'attempts');
          }
        }
      }, 300);
    }
  }

  // Add click handler for Shop Ruby button
  const shopRubyBtn = document.getElementById('shopRubyBtn');
  if (shopRubyBtn) {
    shopRubyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerShopifyModal();
    });
  }
})();

