// Address Form Handler
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const userData = localStorage.getItem('rubyUser');
    if (!userData) {
        window.location.href = 'ruby-login.html';
        return;
    }

    // Check cart
    const cart = JSON.parse(localStorage.getItem('rubyCartNew') || '{"items":[]}');
    if (cart.items.length === 0) {
        window.location.href = 'ruby-products.html';
        return;
    }

    // Load order summary
    loadOrderSummary('orderSummaryItems');

    // Load saved address if exists
    const savedAddress = localStorage.getItem('rubyAddress');
    if (savedAddress) {
        const address = JSON.parse(savedAddress);
        document.getElementById('fullName').value = address.fullName || '';
        document.getElementById('phone').value = address.phone || '';
        document.getElementById('email').value = address.email || '';
        document.getElementById('addressLine1').value = address.addressLine1 || '';
        document.getElementById('addressLine2').value = address.addressLine2 || '';
        document.getElementById('city').value = address.city || '';
        document.getElementById('state').value = address.state || '';
        document.getElementById('pincode').value = address.pincode || '';
        document.getElementById('addressType').value = address.addressType || 'home';
    }

    // Try to load email from user data if available
    if (userData && !document.getElementById('email').value) {
        try {
            const user = JSON.parse(userData);
            if (user.email) {
                document.getElementById('email').value = user.email;
            }
        } catch (e) {
            console.error('Error loading user email:', e);
        }
    }

    // Form submission
    const addressForm = document.getElementById('addressForm');
    if (!addressForm) {
        console.error('Address form not found!');
        return;
    }

    addressForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Form submitted');

        // Disable submit button to prevent double submission
        const submitBtn = addressForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        }

        const fullName = document.getElementById('fullName');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const addressLine1 = document.getElementById('addressLine1');
        const city = document.getElementById('city');
        const state = document.getElementById('state');
        const pincode = document.getElementById('pincode');

        if (!fullName || !phone || !email || !addressLine1 || !city || !state || !pincode) {
            alert('Error: Form fields not found. Please refresh the page.');
            return;
        }

        const addressData = {
            fullName: fullName.value.trim(),
            phone: phone.value.trim(),
            email: email.value.trim(),
            addressLine1: addressLine1.value.trim(),
            addressLine2: document.getElementById('addressLine2').value.trim(),
            city: city.value.trim(),
            state: state.value,
            pincode: pincode.value.trim(),
            addressType: document.getElementById('addressType').value,
            saveAddress: document.getElementById('saveAddress').checked
        };

        // Validate
        if (!addressData.fullName || !addressData.phone || !addressData.email || 
            !addressData.addressLine1 || !addressData.city || !addressData.state || !addressData.pincode) {
            alert('Please fill all required fields');
            return false;
        }

        if (addressData.phone.length !== 10) {
            alert('Please enter a valid 10-digit phone number');
            return false;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(addressData.email)) {
            alert('Please enter a valid email address');
            return false;
        }

        if (addressData.pincode.length !== 6 || !/^\d{6}$/.test(addressData.pincode)) {
            alert('Please enter a valid 6-digit PIN code');
            return false;
        }

        // Save address
        if (addressData.saveAddress) {
            localStorage.setItem('rubyAddress', JSON.stringify(addressData));
        }

        try {
            // Save to order
            localStorage.setItem('rubyOrderAddress', JSON.stringify(addressData));
            console.log('Address saved:', addressData);
            console.log('Redirecting to payment page...');

            // Small delay to show processing state
            setTimeout(() => {
                window.location.href = 'ruby-payment.html';
            }, 300);
        } catch (error) {
            console.error('Error saving address:', error);
            alert('An error occurred. Please try again.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }
        return false;
    });
});

