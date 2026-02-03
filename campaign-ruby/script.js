// Simple scroll helpers and CTA redirect
(function () {
  'use strict';
  
  const SHOPIFY_PAGE_URL = 'https://fq0a1w-t7.myshopify.com/pages/ruby-maanak';
  
  console.log('script.js loaded');

  // Wait for DOM to be ready
  function init() {
    console.log('Initializing script...');
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
    console.log('Setting up Shopify buttons...');
    
    const ctaShop = document.getElementById('ctaShop');
    if (ctaShop && !ctaShop.dataset.shopifyListener) {
      ctaShop.dataset.shopifyListener = 'true';
      ctaShop.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('CTA Shop button clicked');
        triggerShopifyModal();
      });
      console.log('CTA Shop button listener added');
    }

    const shopRubyBtn = document.getElementById('shopRubyBtn');
    if (shopRubyBtn && !shopRubyBtn.dataset.shopifyListener) {
      shopRubyBtn.dataset.shopifyListener = 'true';
      shopRubyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Shop Ruby button clicked');
        triggerShopifyModal();
      });
      console.log('Shop Ruby button listener added');
    } else if (shopRubyBtn) {
      console.log('Shop Ruby button already has listener');
    } else {
      console.warn('Shop Ruby button not found!');
    }

    // Setup floating button
    const floatingShopBtn = document.getElementById('floatingShopRubyBtn');
    if (floatingShopBtn && !floatingShopBtn.dataset.shopifyListener) {
      floatingShopBtn.dataset.shopifyListener = 'true';
      floatingShopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Floating Shop Ruby button clicked');
        triggerShopifyModal();
      });
      console.log('Floating Shop Ruby button listener added');
    }
  }

  // Show/hide floating button on scroll
  function setupFloatingButton() {
    const floatingBtn = document.getElementById('floatingShopBtn');
    if (!floatingBtn) return;

    let lastScrollTop = 0;
    const scrollThreshold = 200; // Show after scrolling 200px

    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > scrollThreshold) {
        floatingBtn.classList.add('visible');
      } else {
        floatingBtn.classList.remove('visible');
      }
      
      lastScrollTop = scrollTop;
    }, false);
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
    
    // Try product component first (original), then collection component
    const productComponent = document.getElementById('product-component-1768370709576');
    const collectionComponent = document.getElementById('collection-component-1769582114770');
    const component = productComponent || collectionComponent;
    
    if (!component) {
      console.error('Shopify component not found');
      isModalTriggering = false;
      return;
    }

    // Make component temporarily visible so buttons can be clicked
    // Store original inline styles
    const originalStyles = {
      position: component.style.position || '',
      left: component.style.left || '',
      top: component.style.top || '',
      visibility: component.style.visibility || '',
      opacity: component.style.opacity || '',
      pointerEvents: component.style.pointerEvents || '',
      width: component.style.width || '',
      height: component.style.height || '',
      zIndex: component.style.zIndex || ''
    };

    // Temporarily make it visible but off-screen (so it renders properly for Shopify)
    // This allows Shopify to render the component and open the cart sidebar
    component.style.removeProperty('display');
    component.style.setProperty('position', 'fixed', 'important');
    component.style.setProperty('left', '-9999px', 'important');
    component.style.setProperty('top', '0', 'important');
    component.style.setProperty('visibility', 'visible', 'important');
    component.style.setProperty('opacity', '1', 'important');
    component.style.setProperty('pointer-events', 'auto', 'important');
    component.style.setProperty('width', 'auto', 'important');
    component.style.setProperty('height', 'auto', 'important');
    component.style.setProperty('z-index', '9999', 'important');

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
        button = component.querySelector(selector);
        if (button && button.offsetParent !== null) {
          break;
        }
      }

      // If not found, check iframes
      if (!button) {
        const iframes = component.querySelectorAll('iframe');
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

      // Restore hidden state after button click (cart sidebar should be open now)
      component.style.setProperty('visibility', 'hidden', 'important');
      component.style.setProperty('position', 'absolute', 'important');
      component.style.setProperty('left', '-9999px', 'important');
      component.style.setProperty('top', '-9999px', 'important');
      component.style.setProperty('width', '1px', 'important');
      component.style.setProperty('height', '1px', 'important');
      component.style.setProperty('overflow', 'hidden', 'important');
      component.style.removeProperty('opacity');
      component.style.removeProperty('pointer-events');
      component.style.removeProperty('z-index');

      // Reset flag after a short delay
      setTimeout(() => {
        isModalTriggering = false;
      }, 500);
    }, 300); // Give component time to render
  }

  // Setup floating button scroll handler
  setupFloatingButton();

  // Video Carousel
  function setupVideoCarousel() {
    const carousel = document.querySelector('.video-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.video-slide');
    const videos = carousel.querySelectorAll('.carousel-video');
    const prevBtn = carousel.querySelector('.video-carousel-prev');
    const nextBtn = carousel.querySelector('.video-carousel-next');
    const indicators = carousel.querySelectorAll('.video-indicator');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;

      // Pause all videos
      videos.forEach(v => {
        v.pause();
      });

      // Update slides
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });

      // Update indicators
      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentIndex);
      });

      // Play active slide video when section is in view
      const activeVideo = videos[currentIndex];
      if (activeVideo) {
        activeVideo.muted = true;
        activeVideo.play().catch(function() {});
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        goToSlide(currentIndex - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        goToSlide(currentIndex + 1);
      });
    }
    indicators.forEach((ind, i) => {
      ind.addEventListener('click', function() {
        goToSlide(i);
      });
    });

    // When a video ends, automatically go to the next video
    videos.forEach(function(video) {
      video.addEventListener('ended', function() {
        goToSlide(currentIndex + 1);
      });
    });

    window.videoCarouselGoToSlide = goToSlide;
  }

  // Auto-play active carousel video when section comes into view
  function setupVideoAutoplay() {
    const videoSection = document.getElementById('video');
    const carousel = document.querySelector('.video-carousel');
    
    if (!videoSection) return;

    const videos = document.querySelectorAll('.carousel-video');
    const slides = document.querySelectorAll('.video-slide');
    let sectionInView = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        sectionInView = entry.isIntersecting;

        if (entry.isIntersecting) {
          // Find active slide and play its video
          const activeSlide = document.querySelector('.video-slide.active');
          if (activeSlide) {
            const video = activeSlide.querySelector('.carousel-video');
            if (video) {
              video.muted = true;
              video.play().catch(function() {});
            }
          }
        } else {
          // Pause all videos when section is out of view
          videos.forEach(v => v.pause());
        }
      });
    }, {
      threshold: 0.25,
      rootMargin: '0px'
    });

    observer.observe(videoSection);
  }

  // Initialize video carousel and autoplay after DOM is ready
  function initVideoSection() {
    setupVideoCarousel();
    setupVideoAutoplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoSection);
  } else {
    initVideoSection();
  }

  // Re-setup buttons after Shopify initializes (in case they weren't ready)
  if (window.shopifyUI || document.getElementById('product-component-1768370709576') || document.getElementById('collection-component-1769582114770')) {
    setTimeout(setupShopifyButtons, 2000);
  }
  
  // Also setup on window load (for GoDaddy/live sites where timing might differ)
  window.addEventListener('load', function() {
    console.log('Window load event - setting up buttons');
    setTimeout(setupShopifyButtons, 1500);
    setTimeout(initVideoSection, 500); // Ensure video carousel and autoplay are set up after full load
  });
  
  // Make functions globally available for debugging
  window.setupShopifyButtons = setupShopifyButtons;
  window.triggerShopifyModal = triggerShopifyModal;

  // Product Modal Functionality
  const productDescriptions = {
    'ruby': {
      title: 'Natural Pear-Cut Ruby Gemstone',
      description: 'Discover the timeless power and elegance of this Natural Pear-Cut Ruby Gemstone, sourced directly from the rich ruby mines of Mozambique. This gemstone is 100% natural ruby, prized for its deep red hue, excellent clarity, and finely executed faceted finish that enhances its brilliance and fire. The graceful pear cut adds sophistication, making it ideal for premium rings, pendants, or bespoke jewelry creations.<br><br>Beyond its beauty, this ruby carries profound spiritual significance. It has been Om Mantra enchanted, a sacred Vedic process believed to activate positive vibrations, inner strength, confidence, and vitality. Blessed with divine energies, this gemstone is traditionally associated with courage, leadership, prosperity, and protection from negative influences.<br><br>Each stone is carefully selected to ensure authenticity, purity, and superior quality. Whether worn for its astrological benefits, spiritual value, or luxurious appeal, this Mozambique ruby is a powerful symbol of passion, success, and divine blessings—perfect for those who seek both beauty and meaning in a precious gemstone.'
    },
    'ganesh': {
      title: 'Divine 40 Carat Natural Ruby Ganesh Ji',
      description: 'This Divine 40 Carat Natural Ruby Ganesh Ji is a rare fusion of spirituality and natural beauty. Expertly hand-cut from a genuine ruby, the idol showcases intricate detailing that reflects skilled craftsmanship and devotion. The rich red hue and natural inclusions highlight the stone\'s authenticity and uniqueness. Revered as the remover of obstacles and the harbinger of prosperity, Ganesh Ji makes this sacred gem ideal for worship, collection, or gifting. Perfect for those seeking spiritual energy, elegance, and exclusivity, this exquisite ruby idol embodies devotion, positivity, and timeless value.'
    }
  };

  function openProductModal(productType) {
    const modal = document.getElementById('productModal');
    const titleEl = document.getElementById('modalTitle');
    const descEl = document.getElementById('modalDescription');
    
    if (!modal || !productDescriptions[productType]) return;
    
    const product = productDescriptions[productType];
    titleEl.textContent = product.title;
    descEl.innerHTML = product.description;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }

  // Setup modal close handlers
  function setupProductModal() {
    const closeBtn = document.getElementById('closeModal');
    const modal = document.getElementById('productModal');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', closeProductModal);
    }
    
    if (modal) {
      // Close on overlay click
      const overlay = modal.querySelector('.product-modal-overlay');
      if (overlay) {
        overlay.addEventListener('click', closeProductModal);
      }
      
      // Close on Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          closeProductModal();
        }
      });
    }
  }

  // Setup product click handlers - make product titles clickable
  function setupProductClicks() {
    const collectionComponent = document.getElementById('collection-component-1769582114770');
    if (!collectionComponent) {
      console.log('Collection component not found');
      return;
    }

    console.log('Setting up product title clicks...');
    
    // Function to find and make product titles clickable
    function makeTitlesClickable() {
      // Find all text nodes and elements
      const walker = document.createTreeWalker(
        collectionComponent,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
        null,
        false
      );
      
      let rubyFound = false;
      let ganeshFound = false;
      let node;
      
      while (node = walker.nextNode()) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent.trim();
          const parent = node.parentElement;
          
          // Check for Ruby product title
          if (text.includes('Natural Pear-Cut Ruby Gemstone') && !rubyFound && parent) {
            // Find the best parent element to make clickable
            let clickableElement = parent;
            
            // Walk up to find a better container (heading, div with title class, etc.)
            let current = parent;
            for (let i = 0; i < 5 && current; i++) {
              const tag = current.tagName;
              const classes = current.classList ? current.classList.toString().toLowerCase() : '';
              
              if (tag.match(/^H[1-6]$/) || 
                  classes.includes('title') || 
                  classes.includes('name') ||
                  classes.includes('product')) {
                clickableElement = current;
                break;
              }
              current = current.parentElement;
            }
            
            // Make it clickable
            if (clickableElement && !clickableElement.dataset.rubyClickHandler) {
              clickableElement.dataset.rubyClickHandler = 'true';
              clickableElement.style.cursor = 'pointer';
              clickableElement.style.textDecoration = 'underline';
              clickableElement.style.textDecorationColor = 'rgba(216, 170, 58, 0.5)';
              clickableElement.style.transition = 'all 0.2s ease';
              
              clickableElement.addEventListener('click', function(e) {
                if (e.target.closest('button') || e.target.closest('a[class*="btn"]')) {
                  return;
                }
                e.preventDefault();
                e.stopPropagation();
                console.log('Ruby title clicked!');
                openProductModal('ruby');
              });
              
              console.log('Made Ruby title clickable');
              rubyFound = true;
            }
          }
          
          // Check for Ganesh product title
          if ((text.includes('Ganesh') || text.includes('Ganesh Ji')) && !ganeshFound && parent) {
            let clickableElement = parent;
            
            // Walk up to find a better container
            let current = parent;
            for (let i = 0; i < 5 && current; i++) {
              const tag = current.tagName;
              const classes = current.classList ? current.classList.toString().toLowerCase() : '';
              
              if (tag.match(/^H[1-6]$/) || 
                  classes.includes('title') || 
                  classes.includes('name') ||
                  classes.includes('product')) {
                clickableElement = current;
                break;
              }
              current = current.parentElement;
            }
            
            // Make it clickable
            if (clickableElement && !clickableElement.dataset.ganeshClickHandler) {
              clickableElement.dataset.ganeshClickHandler = 'true';
              clickableElement.style.cursor = 'pointer';
              clickableElement.style.textDecoration = 'underline';
              clickableElement.style.textDecorationColor = 'rgba(216, 170, 58, 0.5)';
              clickableElement.style.transition = 'all 0.2s ease';
              
              clickableElement.addEventListener('click', function(e) {
                if (e.target.closest('button') || e.target.closest('a[class*="btn"]')) {
                  return;
                }
                e.preventDefault();
                e.stopPropagation();
                console.log('Ganesh title clicked!');
                openProductModal('ganesh');
              });
              
              console.log('Made Ganesh title clickable');
              ganeshFound = true;
            }
          }
        }
      }
      
      // Also try event delegation on the entire collection component
      if (!collectionComponent.dataset.delegationHandler) {
        collectionComponent.dataset.delegationHandler = 'true';
        collectionComponent.addEventListener('click', function(e) {
          // Don't trigger on buttons
          if (e.target.closest('button') || e.target.closest('a[class*="btn"]')) {
            return;
          }
          
          // Get the clicked element and walk up to find product container
          let element = e.target;
          let depth = 0;
          
          while (element && depth < 10) {
            const text = element.textContent || '';
            
            // Check if this element contains Ruby product text
            if (text.includes('Natural Pear-Cut Ruby Gemstone') || 
                (text.includes('Pear-Cut Ruby') && text.includes('Deep Red'))) {
              e.preventDefault();
              e.stopPropagation();
              console.log('Ruby product clicked via delegation');
              openProductModal('ruby');
              return;
            }
            
            // Check if this element contains Ganesh product text
            if (text.includes('Ganesh Ji') || 
                (text.includes('Ganesh') && text.includes('Carat'))) {
              e.preventDefault();
              e.stopPropagation();
              console.log('Ganesh product clicked via delegation');
              openProductModal('ganesh');
              return;
            }
            
            element = element.parentElement;
            depth++;
          }
        }, true); // Use capture phase
        console.log('Event delegation handler attached');
      }
      
      console.log('Ruby clickable:', rubyFound, 'Ganesh clickable:', ganeshFound);
    }
    
    // Try making titles clickable immediately
    makeTitlesClickable();
    
    // Use MutationObserver to watch for dynamically added content
    const observer = new MutationObserver(function(mutations) {
      let hasNewContent = false;
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          hasNewContent = true;
        }
      });
      if (hasNewContent) {
        setTimeout(makeTitlesClickable, 500);
      }
    });

    observer.observe(collectionComponent, {
      childList: true,
      subtree: true
    });
    
    // Retry periodically to catch titles that load later
    let retryCount = 0;
    const maxRetries = 15;
    const retryInterval = setInterval(function() {
      makeTitlesClickable();
      
      // Check if we found both titles
      const rubyElement = collectionComponent.querySelector('[data-ruby-click-handler="true"]');
      const ganeshElement = collectionComponent.querySelector('[data-ganesh-click-handler="true"]');
      
      if ((rubyElement && ganeshElement) || retryCount >= maxRetries) {
        clearInterval(retryInterval);
        if (rubyElement && ganeshElement) {
          console.log('Both product titles are now clickable!');
        }
      }
      retryCount++;
    }, 1000);
  }

  // Initialize modal
  setupProductModal();
  
  // Wait for Shopify collection to render, then setup clicks
  setTimeout(function() {
    setupProductClicks();
  }, 3000);
  
  // Also try after window load
  window.addEventListener('load', function() {
    setTimeout(setupProductClicks, 4000);
  });
  
  // Listen for Shopify ready event
  window.addEventListener('shopifyReady', function() {
    setTimeout(setupProductClicks, 2000);
  });
  
  // Retry periodically until products are found
  let retryCount = 0;
  const maxRetries = 10;
  const retryInterval = setInterval(function() {
    const collectionComponent = document.getElementById('collection-component-1769582114770');
    if (collectionComponent) {
      const products = collectionComponent.querySelectorAll('.shopify-buy__product, [class*="shopify-buy__product"], [class*="product"]');
      if (products.length > 0 || retryCount >= maxRetries) {
        clearInterval(retryInterval);
        if (products.length > 0) {
          console.log('Products found, setting up clicks');
          setupProductClicks();
        }
      }
    }
    retryCount++;
  }, 1000);

  // Make modal functions globally available
  window.openProductModal = openProductModal;
  window.closeProductModal = closeProductModal;
})();

