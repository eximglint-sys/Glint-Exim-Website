# Ruby Purchase Flow - File Structure

## ✅ Essential Files (Keep These)

### Core Flow Pages
1. **`ruby-login.html`** - Login page (Google/Email/Phone)
2. **`ruby-products.html`** - Product selection page
3. **`ruby-address.html`** - Delivery address form
4. **`ruby-payment.html`** - Payment method selection
5. **`ruby-success.html`** - Order confirmation page

### JavaScript Files
- **`ruby-auth.js`** - Authentication logic
- **`ruby-products.js`** - Product & cart management
- **`ruby-address.js`** - Address form handling
- **`ruby-payment.js`** - Payment processing
- **`ruby-success.js`** - Success page & notifications
- **`ruby-notifications.js`** - Email & SMS service

### Styling
- **`ruby-styles.css`** - All styles for the purchase flow

### Documentation
- **`README.md`** - Flow documentation
- **`BACKEND_SETUP.md`** - Email/SMS setup guide

### Assets
- **`images/`** - Product images folder

## 🗑️ Deleted Files (Removed)

- ~~`ruby-cart.html`~~ - Old cart page (not needed)
- ~~`ruby-cart.js`~~ - Old cart logic (not needed)
- ~~`ruby.html`~~ - Old product page (replaced by ruby-products.html)
- ~~`ruby-payment-new.html`~~ - Renamed to ruby-payment.html
- ~~`ruby-success-new.html`~~ - Renamed to ruby-success.html

## 📍 Flow Order

1. Login → `ruby-login.html`
2. Products → `ruby-products.html`
3. Address → `ruby-address.html`
4. Payment → `ruby-payment.html`
5. Success → `ruby-success.html`

## 🔗 Entry Point

**Start here:** `ruby-login.html`

