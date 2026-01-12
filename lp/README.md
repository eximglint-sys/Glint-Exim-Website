# Ruby Purchase Flow - Professional E-commerce Flow

## 📍 URL Structure

This is a **hidden purchase flow** accessible only via direct link (e.g., Instagram Ads).

**Entry Point:** `https://glintexim.com/lp/ruby-login.html`

## 🗺️ Complete Page Flow

1. **Login Page:** `/lp/ruby-login.html`
   - Google OAuth login
   - Email login
   - Phone number login
   - User authentication required

2. **Product Selection Page:** `/lp/ruby-products.html`
   - Multiple Ruby products displayed in grid
   - Each product shows: Name, Origin, unit range, Price per unit, Image
   - Quantity selector for each product (0-10 items)
   - Sticky cart summary bar at bottom
   - Continue to Address button

3. **Address Page:** `/lp/ruby-address.html`
   - Full address form (Name, Phone, Address Lines, City, State, PIN)
   - Address type selection (Home/Work/Other)
   - Order summary sidebar
   - Save address option
   - Continue to Payment button

4. **Payment Page:** `/lp/ruby-payment.html`
   - Payment method selection (UPI / Card / Net Banking)
   - Payment details form (dynamic based on selection)
   - Order summary sidebar
   - Delivery address display
   - Security badges
   - Pay Securely button

5. **Success Page:** `/lp/ruby-success.html`
   - Order confirmation with checkmark
   - Order ID display
   - Order details, Delivery address, Payment summary
   - Next steps information
   - Continue Shopping / Print Receipt buttons

## 🔒 Access Control

- **NOT visible** in main website navigation
- **NOT linked** from homepage, footer, or sitemap
- **Accessible** only via direct URL or ad links
- **Meta tags:** `noindex, nofollow` (prevents search engine indexing)

## 💰 Pricing

- **Base Price:** ₹25,000 per unit
- **Quantity Range:** 1-10 units
- **Total Calculation:** Quantity × ₹25,000

## 🛒 Cart Storage

Uses **localStorage** to persist cart data:
- Key: `rubyCart`
- Data: `{ product, quantity, pricePerunit, total, image, timestamp }`

## 🎨 Design Features

- **Color Scheme:** Deep red (#8b0000, #dc143c), Gold (#d4af37)
- **Typography:** Playfair Display (headings) + Inter (body)
- **Animations:** Sparkle effect, smooth transitions
- **Mobile-First:** Fully responsive with sticky Buy Now button

## 🔧 Technical Details

- **Pure HTML/CSS/JavaScript** (no React/Next.js)
- **No backend required** (uses localStorage)
- **Formspree integration ready** (for future contact forms)
- **Payment gateway:** Mock structure (ready for Razorpay/Stripe)

## 📱 Mobile Features

- Sticky Buy Now button appears on scroll
- Optimized touch targets
- Full-width buttons on mobile
- Responsive images and layouts

## 🚀 Deployment

1. Upload all files in `/lp/` folder to your server
2. Ensure paths are correct (relative to domain root)
3. Test the flow: `/lp/ruby.html` → Cart → Payment → Success
4. Use `/lp/ruby.html` as your Instagram Ad landing URL

## 📝 Notes

- All pages are self-contained
- Navigation only within the purchase flow
- Back buttons stay within flow (never redirect to main site)
- Cart persists across page navigation
- Cart clears after successful order

