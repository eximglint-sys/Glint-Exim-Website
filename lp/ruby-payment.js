// Payment Page Handler
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const userData = localStorage.getItem('rubyUser');
    if (!userData) {
        window.location.href = 'ruby-login.html';
        return;
    }

    // Check address
    const address = localStorage.getItem('rubyOrderAddress');
    if (!address) {
        window.location.href = 'ruby-address.html';
        return;
    }

    // Load order summary
    loadOrderSummary('paymentOrderItems');

    // Load delivery address
    const addressData = JSON.parse(address);
    const addressDisplay = document.getElementById('deliveryAddress');
    if (addressDisplay) {
        addressDisplay.innerHTML = `
            <div class="delivery-address-display">
                <strong>${addressData.fullName}</strong>
                <p>${addressData.addressLine1}${addressData.addressLine2 ? ', ' + addressData.addressLine2 : ''}</p>
                <p>${addressData.city}, ${addressData.state} - ${addressData.pincode}</p>
                <p><i class="fas fa-phone"></i> ${addressData.phone}</p>
            </div>
        `;
    }

    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Hide all detail forms
            document.getElementById('upiDetails').style.display = 'none';
            document.getElementById('cardDetails').style.display = 'none';
            document.getElementById('netbankingDetails').style.display = 'none';

            // Show selected form
            if (this.value === 'upi') {
                document.getElementById('upiDetails').style.display = 'block';
            } else if (this.value === 'card') {
                document.getElementById('cardDetails').style.display = 'block';
            } else if (this.value === 'netbanking') {
                document.getElementById('netbankingDetails').style.display = 'block';
            }

            // Update summary (shipping / discount / total) based on selected method
            updatePaymentSummary(this.value);
        });
    });

    // Initial summary calculation for default selected method
    const initiallySelected = document.querySelector('input[name="paymentMethod"]:checked');
    if (initiallySelected) {
        updatePaymentSummary(initiallySelected.value);
    }

    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formatted;
        });
    }

    // Card expiry formatting
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // Pay button
    document.getElementById('payNowBtn').addEventListener('click', function() {
        const selectedRadio = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedRadio) {
            alert('Please select a payment method');
            return;
        }
        const selectedMethod = selectedRadio.value;
        
        // Validate payment details
        if (selectedMethod === 'upi') {
            const upiId = document.getElementById('upiId').value;
            if (!upiId || !upiId.includes('@')) {
                alert('Please enter a valid UPI ID');
                return;
            }
        } else if (selectedMethod === 'card') {
            const cardNum = document.getElementById('cardNumber').value.replace(/\s/g, '');
            const expiry = document.getElementById('cardExpiry').value;
            const cvv = document.getElementById('cardCvv').value;
            const name = document.getElementById('cardName').value;

            if (!cardNum || cardNum.length < 16) {
                alert('Please enter a valid card number');
                return;
            }
            if (!expiry || expiry.length < 5) {
                alert('Please enter expiry date (MM/YY)');
                return;
            }
            if (!cvv || cvv.length < 3) {
                alert('Please enter CVV');
                return;
            }
            if (!name) {
                alert('Please enter cardholder name');
                return;
            }
        } else if (selectedMethod === 'netbanking') {
            const bank = document.getElementById('bankSelect').value;
            if (!bank) {
                alert('Please select your bank');
                return;
            }
        }

        // Show processing
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
        this.disabled = true;

        // Simulate payment processing
        setTimeout(() => {
            // Save payment info
            const paymentInfo = {
                method: selectedMethod,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('rubyPayment', JSON.stringify(paymentInfo));

            // Redirect to success
            window.location.href = 'ruby-success.html';
        }, 2000);
    });
});

// Calculate and update shipping, discount and total based on payment method
function updatePaymentSummary(paymentMethod) {
    if (typeof getCart !== 'function') {
        return;
    }

    const cart = getCart();
    const subtotal = cart.total || 0;

    let shipping = 0;
    let discount = 0;

    // COD: ₹49 shipping fee
    if (paymentMethod === 'cod') {
        shipping = 49;
    }

    // UPI: 5% discount, no shipping fee
    if (paymentMethod === 'upi') {
        discount = Math.round(subtotal * 0.05);
    }

    // GST 0.25% on amount after discount (before shipping)
    const taxableAmount = Math.max(0, subtotal - discount);
    const gst = Math.round(taxableAmount * 0.0025);

    const total = Math.max(0, taxableAmount + gst + shipping);

    const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

    const subtotalEl = document.getElementById('paymentSubtotal');
    const shippingEl = document.getElementById('paymentShippingAmount');
    const discountEl = document.getElementById('paymentDiscount');
    const gstEl = document.getElementById('paymentGST');
    const totalEl = document.getElementById('paymentTotalAmount');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);

    if (shippingEl) {
        shippingEl.textContent = shipping > 0 ? formatCurrency(shipping) : 'Free';
    }

    if (discountEl) {
        discountEl.textContent = discount > 0 ? `- ${formatCurrency(discount)}` : '₹0';
    }

    if (gstEl) {
        gstEl.textContent = gst > 0 ? formatCurrency(gst) : '₹0';
    }

    if (totalEl) totalEl.textContent = formatCurrency(total);
}

