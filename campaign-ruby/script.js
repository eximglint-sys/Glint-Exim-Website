// Simple scroll helpers and CTA redirect
(function () {
  const SHOPIFY_PAGE_URL = 'https://fq0a1w-t7.myshopify.com/pages/ruby-maanak';

  // Wait for DOM to be ready
  function init() {
    // Setup scroll handlers
    document.querySelectorAll('[data-scroll]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-scroll');
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Setup Shopify button handlers - wait for Shopify to be ready
    setupShopifyButtons();
  }

  // Setup Shopify button handlers - simple one-time setup
  function setupShopifyButtons() {
    const ctaShop = document.getElementById('ctaShop');
    if (ctaShop && !ctaShop.dataset.shopifyListener) {
      ctaShop.dataset.shopifyListener = 'true';
      ctaShop.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        triggerShopifyModal();
      });
    }

    const shopRubyBtn = document.getElementById('shopRubyBtn');
    if (shopRubyBtn && !shopRubyBtn.dataset.shopifyListener) {
      shopRubyBtn.dataset.shopifyListener = 'true';
      shopRubyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        triggerShopifyModal();
      });
    }
  }

  // Listen for Shopify ready event
  window.addEventListener('shopifyReady', function() {
    console.log('Shopify ready event received');
    setupShopifyButtons();
  });

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Shopify Buy Button Triggers - Simple one-click approach
  let isModalTriggering = false;
  
  function triggerShopifyModal() {
    // Prevent multiple clicks
    if (isModalTriggering) {
      return;
    }
    isModalTriggering = true;
    
    console.log('Opening Shopify modal...');
    
    const productComponent = document.getElementById('product-component-1768370709576');
    if (!productComponent) {
      console.error('Shopify component not found');
      isModalTriggering = false;
      return;
    }

    // Make component temporarily visible so buttons can be clicked
    // Store original inline styles
    const originalStyles = {
      position: productComponent.style.position || '',
      left: productComponent.style.left || '',
      top: productComponent.style.top || '',
      visibility: productComponent.style.visibility || '',
      opacity: productComponent.style.opacity || '',
      pointerEvents: productComponent.style.pointerEvents || '',
      width: productComponent.style.width || '',
      height: productComponent.style.height || '',
      zIndex: productComponent.style.zIndex || ''
    };

    // Temporarily make it visible but off-screen (so it renders properly)
    productComponent.style.setProperty('position', 'fixed', 'important');
    productComponent.style.setProperty('left', '0', 'important');
    productComponent.style.setProperty('top', '0', 'important');
    productComponent.style.setProperty('visibility', 'visible', 'important');
    productComponent.style.setProperty('opacity', '1', 'important');
    productComponent.style.setProperty('pointer-events', 'auto', 'important');
    productComponent.style.setProperty('width', 'auto', 'important');
    productComponent.style.setProperty('height', 'auto', 'important');
    productComponent.style.setProperty('z-index', '-1', 'important');

    // Wait a moment for it to render, then find and click button
    setTimeout(() => {
      // Try to find the button - check multiple places
      let button = null;
      
      // First, try direct selectors
      const selectors = [
        '.shopify-buy__btn',
        'button.shopify-buy__btn',
        'a.shopify-buy__btn',
        '.shopify-buy__product__btn',
        'button',
        'a'
      ];
      
      for (let selector of selectors) {
        button = productComponent.querySelector(selector);
        if (button && button.offsetParent !== null) {
          break;
        }
      }

      // If not found, check iframes
      if (!button) {
        const iframes = productComponent.querySelectorAll('iframe');
        for (let iframe of iframes) {
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            button = iframeDoc.querySelector('.shopify-buy__btn, button, a');
            if (button) break;
          } catch (e) {
            // Cross-origin, can't access
          }
        }
      }

      // Click the button if found
      if (button) {
        console.log('Found button, clicking...');
        try {
          button.click();
          console.log('Button clicked!');
        } catch (e) {
          console.error('Error clicking button:', e);
        }
      } else {
        console.warn('Button not found');
      }

      // Restore original styles
      productComponent.style.removeProperty('position');
      productComponent.style.removeProperty('left');
      productComponent.style.removeProperty('top');
      productComponent.style.removeProperty('visibility');
      productComponent.style.removeProperty('opacity');
      productComponent.style.removeProperty('pointer-events');
      productComponent.style.removeProperty('width');
      productComponent.style.removeProperty('height');
      productComponent.style.removeProperty('z-index');

      // Reset flag after a short delay
      setTimeout(() => {
        isModalTriggering = false;
      }, 500);
    }, 300); // Give component time to render
  }

  // Re-setup buttons after Shopify initializes (in case they weren't ready)
  if (window.shopifyUI || document.getElementById('product-component-1768370709576')) {
    setTimeout(setupShopifyButtons, 2000);
  }
})();

