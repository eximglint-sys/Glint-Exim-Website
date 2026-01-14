# GoDaddy Deployment Checklist

## Files to Upload
Make sure ALL these files are uploaded to your GoDaddy server in the same directory:
- ✅ `index.html`
- ✅ `script.js`
- ✅ `styles.css`

## Common Issues & Solutions

### 1. Script Not Loading
**Check:** Open browser console (F12) on your live site and look for:
- `Failed to load script.js` error
- `script.js loaded` message (should appear)

**Solution:** 
- Verify `script.js` is in the same folder as `index.html`
- Check file permissions (should be readable)
- Try clearing browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### 2. Button Not Working
**Check:** Open browser console and look for:
- `Shop Ruby button clicked` message when you click
- `Setting up Shopify buttons...` message
- Any JavaScript errors

**Solution:**
- If you see errors, check the console messages
- Make sure Shopify component is loading (check for "Shopify component initialized")
- Try hard refresh: Ctrl+F5 or Cmd+Shift+R

### 3. File Path Issues
If your site structure is different, you may need to update the script path in `index.html`:
- Current: `<script src="script.js"></script>`
- If in subfolder: `<script src="./script.js"></script>`
- If in parent folder: `<script src="../script.js"></script>`

### 4. Testing on Live Site
1. Open your live site
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Look for these messages:
   - `script.js loaded` ✅
   - `Initializing script...` ✅
   - `Setting up Shopify buttons...` ✅
   - `Shop Ruby button listener added` ✅
5. Click "Shop Ruby" button
6. Should see: `Shop Ruby button clicked` ✅
7. Modal should open

### 5. If Still Not Working
Run this in the browser console on your live site:
```javascript
// Check if everything is loaded
console.log('Script loaded:', typeof triggerShopifyModal);
console.log('Button exists:', !!document.getElementById('shopRubyBtn'));
console.log('Shopify ready:', !!window.shopifyReady);

// Manually trigger (for testing)
if (typeof triggerShopifyModal === 'function') {
  triggerShopifyModal();
} else {
  console.error('triggerShopifyModal function not found!');
}
```

## Quick Fixes

### Force Button Setup
If buttons aren't working, run this in console:
```javascript
setupShopifyButtons();
```

### Manual Modal Trigger
To test if modal works:
```javascript
triggerShopifyModal();
```

