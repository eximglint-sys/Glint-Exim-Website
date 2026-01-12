# Backend Integration Setup Guide

## Email & SMS Notifications Setup

This guide will help you set up email and SMS notifications for order confirmations.

---

## 📧 Email Setup (EmailJS)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. Copy your **Service ID** (e.g., `service_xxxxx`)

### Step 3: Create Email Template
1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template:

**Template Name:** Order Confirmation

**Subject:** Order Confirmed - {{order_id}} | Glint Exim

**Content:**
```
Dear {{to_name}},

Thank you for your purchase! Your order has been confirmed and will be processed shortly.

Order Details:
Order ID: {{order_id}}
Order Date: {{order_date}}

Items:
{{order_items}}

Total Amount: {{order_total}}

Delivery Address:
{{delivery_address}}

Payment Method: {{payment_method}}

You will soon be able to track your order once it gets shipped. We will send you tracking details via email and SMS.

Thank you for choosing Glint Exim!

Best regards,
Glint Exim Team
```

4. Copy your **Template ID** (e.g., `template_xxxxx`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

### Step 5: Update Configuration
Open `lp/ruby-notifications.js` and update:

```javascript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

---

## 📱 SMS Setup (TextLocal - India)

### Step 1: Create TextLocal Account
1. Go to [https://www.textlocal.in/](https://www.textlocal.in/)
2. Sign up for an account
3. Verify your phone number

### Step 2: Get API Key
1. Login to TextLocal dashboard
2. Go to **API** section
3. Copy your **API Key**

### Step 3: Set Sender ID
1. Go to **Settings** → **Sender ID**
2. Set your sender ID (max 6 characters, e.g., "GLINTX")
3. Note: Sender ID needs to be approved (may take 24-48 hours)

### Step 4: Update Configuration
Open `lp/ruby-notifications.js` and update:

```javascript
const SMS_API_KEY = 'your_textlocal_api_key_here';
const SMS_SENDER = 'GLINTX'; // Your approved sender ID
```

---

## 🔄 Alternative: Backend API Setup

If you prefer to use your own backend server:

### Option 1: Use Formspree (Easier)
1. Go to [https://formspree.io/](https://formspree.io/)
2. Create a new form
3. Use the endpoint in `sendNotificationViaBackend()` function

### Option 2: Custom Backend
Create an API endpoint that accepts POST requests:

**Endpoint:** `POST /api/orders/notify`

**Request Body:**
```json
{
  "orderId": "RUBY-2025-0001",
  "customerEmail": "customer@example.com",
  "customerPhone": "9876543210",
  "customerName": "John Doe",
  "orderTotal": 99900,
  "orderItems": [
    {
      "name": "Ruby / Maanak",
      "quantity": 50,
      "total": 99900
    }
  ],
  "deliveryAddress": {
    "fullName": "John Doe",
    "phone": "9876543210",
    "addressLine1": "123 Main St",
    "city": "Delhi",
    "state": "Delhi",
    "pincode": "110001"
  },
  "paymentMethod": "upi"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Notifications sent successfully"
}
```

Then update `ruby-notifications.js`:
```javascript
const BACKEND_API_URL = 'https://your-backend-api.com/api/orders/notify';
```

---

## ✅ Testing

1. Complete a test order
2. Check customer email inbox for confirmation
3. Check customer phone for SMS
4. Verify order details are correct

---

## 🔒 Security Notes

- Never commit API keys to public repositories
- Use environment variables in production
- Consider rate limiting for SMS to prevent abuse
- EmailJS free tier: 200 emails/month
- TextLocal pricing: Check their website for current rates

---

## 📞 Support

- EmailJS Support: [support@emailjs.com](mailto:support@emailjs.com)
- TextLocal Support: [support@textlocal.in](mailto:support@textlocal.in)

