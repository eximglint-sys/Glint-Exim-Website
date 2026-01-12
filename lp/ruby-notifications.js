// Email and SMS Notification Service

// EmailJS Configuration
// TODO: Replace these with your EmailJS credentials (see BACKEND_SETUP.md)
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

// SMS API Configuration (Using TextLocal for India)
// TODO: Replace with your TextLocal API credentials (see BACKEND_SETUP.md)
const SMS_API_KEY = 'YOUR_SMS_API_KEY';
const SMS_SENDER = 'GLINTX'; // Your sender ID (max 6 chars)

// Initialize EmailJS (call this before using emailjs.send)
function initEmailJS() {
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        return true;
    }
    return false;
}

/**
 * Send order confirmation email to customer
 */
async function sendOrderEmail(orderData) {
    try {
        // Check if EmailJS is configured
        if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
            EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
            EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            console.warn('EmailJS not configured. Please set up EmailJS credentials.');
            return { success: false, error: 'EmailJS not configured' };
        }

        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS SDK not loaded');
            return { success: false, error: 'EmailJS SDK not loaded' };
        }

        // Initialize EmailJS
        if (!initEmailJS()) {
            return { success: false, error: 'EmailJS initialization failed' };
        }

        // Prepare email template parameters
        const emailParams = {
            to_email: orderData.customerEmail || orderData.address?.email || '',
            to_name: orderData.address?.fullName || 'Customer',
            order_id: orderData.orderId,
            order_date: new Date(orderData.timestamp).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            order_items: orderData.items.map(item => 
                `${item.name} × ${item.quantity} = ₹${item.total.toLocaleString('en-IN')}`
            ).join('\n'),
            order_total: `₹${orderData.total.toLocaleString('en-IN')}`,
            delivery_address: formatAddress(orderData.address),
            customer_phone: orderData.address?.phone || '',
            payment_method: orderData.payment?.method || 'N/A',
            message: 'Thank you for your purchase! Your order has been confirmed and will be processed shortly. You will soon be able to track your order once it gets shipped.'
        };

        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            emailParams,
            EMAILJS_PUBLIC_KEY
        );

        console.log('Email sent successfully:', response);
        return { success: true, response };

    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Send order confirmation SMS to customer
 */
async function sendOrderSMS(orderData) {
    try {
        // Check if SMS is configured
        if (SMS_API_KEY === 'YOUR_SMS_API_KEY') {
            console.warn('SMS API not configured. Please set up TextLocal credentials.');
            return { success: false, error: 'SMS API not configured' };
        }

        const phoneNumber = orderData.address?.phone;
        if (!phoneNumber) {
            return { success: false, error: 'Phone number not available' };
        }

        // Format phone number (add country code if needed)
        let formattedPhone = phoneNumber.replace(/\D/g, '');
        if (!formattedPhone.startsWith('91') && formattedPhone.length === 10) {
            formattedPhone = '91' + formattedPhone;
        }

        // SMS message
        const message = `Thank you for your purchase! Order ${orderData.orderId} confirmed. Total: ₹${orderData.total.toLocaleString('en-IN')}. You will soon be able to track your order once it gets shipped. - Glint Exim`;

        // Send SMS via TextLocal API
        const smsResponse = await fetch('https://api.textlocal.in/send/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                apikey: SMS_API_KEY,
                numbers: formattedPhone,
                message: message,
                sender: SMS_SENDER
            })
        });

        const smsData = await smsResponse.json();
        
        if (smsData.status === 'success') {
            console.log('SMS sent successfully:', smsData);
            return { success: true, response: smsData };
        } else {
            console.error('SMS sending failed:', smsData);
            return { success: false, error: smsData.errors?.[0]?.message || 'SMS sending failed' };
        }

    } catch (error) {
        console.error('Error sending SMS:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Send notification via backend API (Alternative method)
 * Use this if you have your own backend server
 */
async function sendNotificationViaBackend(orderData) {
    try {
        const response = await fetch('https://your-backend-api.com/api/orders/notify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: orderData.orderId,
                customerEmail: orderData.customerEmail || orderData.address?.email,
                customerPhone: orderData.address?.phone,
                customerName: orderData.address?.fullName,
                orderTotal: orderData.total,
                orderItems: orderData.items,
                deliveryAddress: orderData.address,
                paymentMethod: orderData.payment?.method
            })
        });

        if (!response.ok) {
            throw new Error('Backend notification failed');
        }

        const data = await response.json();
        return { success: true, data };

    } catch (error) {
        console.error('Error sending notification via backend:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Format address for email display
 */
function formatAddress(address) {
    if (!address) return 'N/A';
    
    let formatted = address.fullName || '';
    formatted += '\n' + address.addressLine1 || '';
    if (address.addressLine2) {
        formatted += ', ' + address.addressLine2;
    }
    formatted += '\n' + (address.city || '') + ', ' + (address.state || '') + ' - ' + (address.pincode || '');
    formatted += '\nPhone: ' + (address.phone || '');
    
    return formatted;
}

/**
 * Send both email and SMS notifications
 */
async function sendOrderNotifications(orderData) {
    const results = {
        email: { success: false },
        sms: { success: false }
    };

    // Send email
    if (orderData.customerEmail || orderData.address?.email) {
        results.email = await sendOrderEmail(orderData);
    }

    // Send SMS
    if (orderData.address?.phone) {
        results.sms = await sendOrderSMS(orderData);
    }

    return results;
}

