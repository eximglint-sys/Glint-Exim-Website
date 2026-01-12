# How to Run the Ruby Purchase Flow

## 🚀 Quick Start Guide

### Option 1: Run Locally (For Testing)

#### Method A: Direct File Open (Simplest)
1. Navigate to the `lp` folder:
   ```
   C:\Users\user\Desktop\GlintExim\lp
   ```
2. Double-click `ruby-login.html` to open in your browser
3. **Note:** Some features may not work perfectly due to browser security restrictions

#### Method B: Local Server (Recommended for Testing)

**Using Python (if installed):**
```powershell
# Open PowerShell in the GlintExim folder
cd C:\Users\user\Desktop\GlintExim
python -m http.server 8000
```
Then open: `http://localhost:8000/lp/ruby-login.html`

**Using Node.js (if installed):**
```powershell
# Install http-server globally (one time)
npm install -g http-server

# Run server
cd C:\Users\user\Desktop\GlintExim
http-server -p 8000
```
Then open: `http://localhost:8000/lp/ruby-login.html`

**Using VS Code Live Server:**
1. Install "Live Server" extension in VS Code
2. Right-click on `ruby-login.html`
3. Select "Open with Live Server"

---

## 🌐 Deploy to Production (Vercel)

### Step 1: Push to GitHub

```powershell
# Navigate to project root
cd C:\Users\user\Desktop\GlintExim

# Check git status
git status

# Add all files
git add .

# Commit changes
git commit -m "Add Ruby purchase flow"

# Push to GitHub
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"Add New Project"**
4. Import your GitHub repository (`Glint-Exim-Website`)
5. Vercel will auto-detect settings
6. Click **"Deploy"**

### Step 3: Access Your Site

After deployment, your site will be live at:
- **Main site:** `https://glintexim.com`
- **Ruby flow:** `https://glintexim.com/lp/ruby-login.html`

---

## 📋 Testing the Flow

### Complete Purchase Flow Test:

1. **Login Page** (`ruby-login.html`)
   - Click "Continue with Google" (mock login)
   - OR enter email and click "Continue with Email"
   - OR enter phone number and click "Continue with Phone"

2. **Products Page** (`ruby-products.html`)
   - Select quantity (0-50) using +/- buttons
   - Check cart summary at bottom
   - Click "Continue" button

3. **Address Page** (`ruby-address.html`)
   - Fill in all required fields:
     - Full Name
     - Phone Number
     - Email Address
     - Address Line 1
     - City, State, PIN Code
   - Click "Save Address & Continue"

4. **Payment Page** (`ruby-payment.html`)
   - Select payment method (UPI/Card/Net Banking)
   - Fill in payment details
   - Click "Pay Securely"

5. **Success Page** (`ruby-success.html`)
   - View order confirmation
   - Check email/SMS notifications (if configured)

---

## ⚙️ Configuration Required

### Before Going Live:

1. **Email Notifications** (See `BACKEND_SETUP.md`)
   - Set up EmailJS account
   - Update credentials in `ruby-notifications.js`

2. **SMS Notifications** (Optional, See `BACKEND_SETUP.md`)
   - Set up TextLocal account
   - Update credentials in `ruby-notifications.js`

3. **Product Image**
   - Your ruby gemstone image is already in place:
     ```
     lp/images/ruby.jpeg
     ```

---

## 🔍 Troubleshooting

### Issue: Images not loading
- **Solution:** Make sure `images/ruby.jpeg` exists in the `lp/images/` folder
- Or update the image path in `ruby-products.js` (line 9)

### Issue: Login redirects not working
- **Solution:** Use a local server (Method B) instead of direct file open
- Browser security blocks `file://` protocol redirects

### Issue: Form submissions not working
- **Solution:** 
  - For contact form: Configure Formspree (already done)
  - For order notifications: Set up EmailJS (see `BACKEND_SETUP.md`)

### Issue: Cart not persisting
- **Solution:** This is normal - cart clears after successful order
- Cart persists during the session (page refreshes)

---

## 📱 Mobile Testing

1. **On Your Phone:**
   - Deploy to Vercel first
   - Open the live URL on your phone
   - Test the complete flow

2. **Chrome DevTools:**
   - Press `F12` in Chrome
   - Click device toolbar icon (Ctrl+Shift+M)
   - Select device (iPhone/Android)
   - Refresh page

---

## 🔗 Important URLs

### Local Testing:
- Login: `http://localhost:8000/lp/ruby-login.html`
- Products: `http://localhost:8000/lp/ruby-products.html`
- Address: `http://localhost:8000/lp/ruby-address.html`
- Payment: `http://localhost:8000/lp/ruby-payment.html`
- Success: `http://localhost:8000/lp/ruby-success.html`

### Production (After Deployment):
- Login: `https://glintexim.com/lp/ruby-login.html`
- Products: `https://glintexim.com/lp/ruby-products.html`
- Address: `https://glintexim.com/lp/ruby-address.html`
- Payment: `https://glintexim.com/lp/ruby-payment.html`
- Success: `https://glintexim.com/lp/ruby-success.html`

---

## ✅ Quick Checklist

- [x] Product image placed in `lp/images/ruby.jpeg` ✓
- [ ] Tested locally using a server
- [ ] Pushed code to GitHub
- [ ] Deployed to Vercel
- [ ] Configured EmailJS (optional but recommended)
- [ ] Tested complete flow end-to-end
- [ ] Tested on mobile device

---

## 🆘 Need Help?

- Check `BACKEND_SETUP.md` for email/SMS setup
- Check `README.md` for flow documentation
- Check `FILES_STRUCTURE.md` for file organization

