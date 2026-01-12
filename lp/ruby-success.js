// Success Page Handler
document.addEventListener('DOMContentLoaded', async function() {
    const cart = JSON.parse(localStorage.getItem('rubyCartNew') || '{"items":[]}');
    const address = JSON.parse(localStorage.getItem('rubyOrderAddress') || '{}');
    const payment = JSON.parse(localStorage.getItem('rubyPayment') || '{}');
    const userData = JSON.parse(localStorage.getItem('rubyUser') || '{}');

    // Generate order ID
    const orderId = 'RUBY-' + new Date().getFullYear() + '-' + 
                    Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    document.getElementById('orderIdDisplay').textContent = orderId;

    // Get customer email from user data or address
    const customerEmail = userData.email || address.email || '';

    // Load order details
    const orderDetailsList = document.getElementById('orderDetailsList');
    if (orderDetailsList) {
        orderDetailsList.innerHTML = cart.items.map(item => `
            <div class="order-detail-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>₹${item.total.toLocaleString('en-IN')}</span>
            </div>
        `).join('');
    }

    // Load delivery details
    const deliveryDetails = document.getElementById('deliveryDetails');
    if (deliveryDetails && address.fullName) {
        deliveryDetails.innerHTML = `
            <p><strong>${address.fullName}</strong></p>
            <p>${address.addressLine1}${address.addressLine2 ? ', ' + address.addressLine2 : ''}</p>
            <p>${address.city}, ${address.state} - ${address.pincode}</p>
            <p><i class="fas fa-phone"></i> ${address.phone}</p>
            ${customerEmail ? `<p><i class="fas fa-envelope"></i> ${customerEmail}</p>` : ''}
        `;
    }

    // Update totals
    document.getElementById('finalSubtotal').textContent = `₹${cart.total.toLocaleString('en-IN')}`;
    document.getElementById('finalTotal').textContent = `₹${cart.total.toLocaleString('en-IN')}`;

    // Prepare order data
    const orderData = {
        orderId: orderId,
        items: cart.items,
        total: cart.total,
        address: address,
        payment: payment,
        customerEmail: customerEmail,
        timestamp: new Date().toISOString()
    };

    // Save order
    localStorage.setItem('rubyOrder_' + orderId, JSON.stringify(orderData));

    // Send email and SMS notifications
    try {
        const notificationResults = await sendOrderNotifications(orderData);
        console.log('Notification results:', notificationResults);
        
        // Show notification status (optional)
        if (notificationResults.email.success || notificationResults.sms.success) {
            console.log('Notifications sent successfully');
        }
    } catch (error) {
        console.error('Error sending notifications:', error);
        // Don't block the success page if notifications fail
    }

    // Clear cart after successful order
    localStorage.removeItem('rubyCartNew');
    localStorage.removeItem('rubyOrderAddress');
    localStorage.removeItem('rubyPayment');
});

