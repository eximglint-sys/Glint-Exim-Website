// Products & Cart Management

// Ruby Products Data - Single Product
// Use window.RUBY_PRODUCTS to prevent redeclaration errors
if (typeof window.RUBY_PRODUCTS === 'undefined') {
    window.RUBY_PRODUCTS = [
    {
        id: 'ruby-1',
        name: 'Ruby / Maanak',
        price: 999,
        image: 'images/ruby.jpeg', // Ruby gemstone
        origin: 'Mozambique',
        unit: '1-50',
        certification: 'IGI Certified',
        qualityTags: [
            '100% Natural',
            '100% Non-Heated',
            '100% Non-Treated'
        ]
    }
    ];
}

// Use the global variable (safe redeclaration)
const RUBY_PRODUCTS = window.RUBY_PRODUCTS;

// Initialize Products Page
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const userData = localStorage.getItem('rubyUser');
    if (!userData) {
        window.location.href = 'ruby-login.html';
        return;
    }

    // Display user name
    if (document.getElementById('userName')) {
        const user = JSON.parse(userData);
        document.getElementById('userName').textContent = user.name || user.email || 'User';
    }

    // Load products
    if (document.getElementById('productsGrid')) {
        loadProducts();
    }

    // Load cart summary
    if (document.getElementById('cartSummaryBar')) {
        updateCartSummary();
    }

    // Continue button
    const continueBtn = document.getElementById('continueToAddress');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            const cart = getCart();
            if (cart.items.length === 0) {
                alert('Please select at least one Ruby');
                return;
            }
            window.location.href = 'ruby-address.html';
        });
    }
});

function loadProducts() {
    const grid = document.getElementById('productsGrid');
    const cart = getCart();

    grid.innerHTML = RUBY_PRODUCTS.map(product => {
        const cartItem = cart.items.find(item => item.id === product.id);
        const quantity = cartItem ? cartItem.quantity : 0;

        return `
            <div class="product-card-ruby">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image-ruby">
                    <div class="product-badge">${product.certification}</div>
                </div>
                <div class="product-info-ruby">
                    <h3 class="product-name-ruby">${product.name}</h3>
                    <div class="product-subtitle">
                        Premium, hand-picked ruby for astrological and jewellery use
                    </div>
                    <div class="product-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${product.origin}</span>
                        <span><i class="fas fa-weight"></i> ${product.unit} units</span>
                    </div>
                    <ul class="product-quality-list">
                        <li><i class="fas fa-check-circle"></i> 100% Natural, Earth-Mined Ruby</li>
                        <li><i class="fas fa-check-circle"></i> 100% Non-Heated &amp; Non-Treated</li>
                        <li><i class="fas fa-certificate"></i> Lab-Certified for Authenticity</li>
                    </ul>
                    <div class="product-price-ruby">
                        <span class="price-label">₹${product.price.toLocaleString('en-IN')}</span>
                        <span class="price-unit">per unit</span>
                    </div>
                    <div class="product-quantity-selector">
                        <button class="qty-btn-small qty-minus" onclick="updateProductQuantity('${product.id}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="qty-input-small" value="${quantity}" min="0" max="50" 
                               id="qty-${product.id}" readonly>
                        <button class="qty-btn-small qty-plus" onclick="updateProductQuantity('${product.id}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updateProductQuantity(productId, change) {
    const product = RUBY_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const cart = getCart();
    const existingItem = cart.items.find(item => item.id === productId);
    
    let newQuantity = existingItem ? existingItem.quantity + change : change;
    
    if (newQuantity < 0) newQuantity = 0;
    if (newQuantity > 50) {
        alert('Maximum 50 items allowed per product');
        return;
    }

    // Update cart
    if (newQuantity === 0) {
        cart.items = cart.items.filter(item => item.id !== productId);
    } else {
        if (existingItem) {
            existingItem.quantity = newQuantity;
            existingItem.total = newQuantity * product.price;
        } else {
            cart.items.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: newQuantity,
                total: newQuantity * product.price,
                image: product.image
            });
        }
    }

    saveCart(cart);
    
    // Update UI
    const qtyInput = document.getElementById(`qty-${productId}`);
    if (qtyInput) qtyInput.value = newQuantity;
    
    updateCartSummary();
}

function getCart() {
    const cartData = localStorage.getItem('rubyCartNew');
    return cartData ? JSON.parse(cartData) : { items: [], total: 0 };
}

function saveCart(cart) {
    cart.total = cart.items.reduce((sum, item) => sum + item.total, 0);
    localStorage.setItem('rubyCartNew', JSON.stringify(cart));
}

function updateCartSummary() {
    const cart = getCart();
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    if (document.getElementById('cartCount')) {
        document.getElementById('cartCount').textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''}`;
    }
    
    if (document.getElementById('cartTotalBar')) {
        document.getElementById('cartTotalBar').textContent = `₹${cart.total.toLocaleString('en-IN')}`;
    }

    const continueBtn = document.getElementById('continueToAddress');
    if (continueBtn) {
        continueBtn.disabled = itemCount === 0;
    }
}

// Load order summary for address/payment pages
function loadOrderSummary(containerId) {
    const cart = getCart();
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = cart.items.map(item => `
        <div class="order-item-summary">
            <img src="${item.image}" alt="${item.name}" class="order-item-image">
            <div class="order-item-details-summary">
                <div class="order-item-name-summary">${item.name}</div>
                <div class="order-item-qty-summary">Qty: ${item.quantity}</div>
                <div class="order-item-price-summary">₹${item.total.toLocaleString('en-IN')}</div>
            </div>
        </div>
    `).join('');

    // Update totals
    if (document.getElementById('summarySubtotal')) {
        document.getElementById('summarySubtotal').textContent = `₹${cart.total.toLocaleString('en-IN')}`;
    }
    if (document.getElementById('summaryTotal')) {
        document.getElementById('summaryTotal').textContent = `₹${cart.total.toLocaleString('en-IN')}`;
    }
    if (document.getElementById('paymentSubtotal')) {
        document.getElementById('paymentSubtotal').textContent = `₹${cart.total.toLocaleString('en-IN')}`;
    }
    if (document.getElementById('paymentTotalAmount')) {
        document.getElementById('paymentTotalAmount').textContent = `₹${cart.total.toLocaleString('en-IN')}`;
    }
}

