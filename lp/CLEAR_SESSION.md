# How to Clear Session / See Login Page

## Quick Fix: Clear Browser Storage

### Method 1: Use the Logout Button (Easiest)
1. Open `ruby-login.html` in your browser
2. If you're already logged in, you'll see a "Logout & Show Login Page" button at the bottom
3. Click it to clear your session and see the login page

### Method 2: Clear via Browser Console
1. Open `ruby-login.html` in your browser
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Type and press Enter:
   ```javascript
   localStorage.clear();
   location.reload();
   ```

### Method 3: Clear via Browser Settings
1. Press `F12` to open Developer Tools
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Local Storage** → `file://` or your domain
4. Right-click and select **Clear** or delete `rubyUser` key
5. Refresh the page

### Method 4: Add `?force=true` to URL
Open: `ruby-login.html?force=true`

This will force show the login page even if logged in.

---

## What Was Changed

- **Auto-redirect disabled:** Login page no longer automatically redirects if you're logged in
- **Logout button added:** You can now logout directly from the login page
- **Session persists:** Your login will be remembered until you logout or clear storage

---

## For Testing

To test the login flow repeatedly:
1. Use the logout button after each test
2. Or clear localStorage between tests
3. Or use incognito/private browsing mode

