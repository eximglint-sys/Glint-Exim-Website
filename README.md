# Glintexim - Import & Export Business Website

A professional, elegant, and responsive website for Glintexim - an import and export business with 25+ years of experience.

## 🌟 Features

- **Elegant Design**: Luxurious Navy Blue & Gold color scheme
- **Real Product Images**: High-quality images from Unsplash
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Hero Slider**: Auto-playing carousel with stunning product images
- **Product Showcase**: Dedicated sections for:
  - Gemstones
  - Jewellery
  - Beds & Furniture
  - Tables
  - Indian Spices
- **Separate Contact Page**: Professional dedicated contact page with multiple features
- **WhatsApp Integration**: Floating WhatsApp button for instant communication
- **Smooth Animations**: Engaging scroll animations and transitions
- **SEO Friendly**: Proper HTML structure and meta tags

## 📋 To-Do: Update Contact Information

Before deploying the website, please update the following placeholders with actual information:

### 1. In `index.html`:

#### Top Bar Contact Info (Line ~15-17):
```html
<span><i class="fas fa-map-marker-alt"></i> [Address - To Be Updated]</span>
```
Replace with your actual address.

#### Footer Contact Info (Line ~630-633):
```html
<li><i class="fas fa-map-marker-alt"></i> [Address - To Be Updated]</li>
<li><i class="fas fa-phone"></i> [Phone - To Be Updated]</li>
```
Replace with your actual address and phone number.

#### Contact Section (Line ~500-515):
Update the contact information cards with your actual details.

#### WhatsApp Button (Line ~645):
```html
<a href="https://wa.me/[PHONE_NUMBER]"
```
Replace `[PHONE_NUMBER]` with your WhatsApp number in international format (e.g., `919876543210` for India).

### 2. Social Media Links:

Update all social media links throughout the website:
- Facebook: Line ~20, ~623
- Twitter: Line ~21, ~624
- Instagram: Line ~22, ~625
- LinkedIn: Line ~23, ~626
- YouTube: Line ~627

Replace `#` with your actual social media profile URLs.

### 3. Email Address:

The default email is `info@glintexim.com`. Update if you have a different email address.

## 🚀 How to Use

1. **Open the website**: Simply open `index.html` in any modern web browser.

2. **Update information**: Follow the instructions above to add your contact details.

3. **Customize content**: Feel free to modify any text, colors, or images to match your brand.

4. **Deploy**: Upload all files to your web hosting service.

## 📁 File Structure

```
GlintExim/
│
├── index.html          # Main home page
├── contact.html        # Dedicated contact page
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Customization Tips

### Change Colors:
Open `styles.css` and modify the CSS variables at the top:
```css
:root {
    --primary-color: #0a1128;  /* Navy Blue */
    --secondary-color: #1c2541;  /* Navy Light */
    --accent-color: #d4af37;  /* Gold */
    --gold: #d4af37;
    ...
}
```

### Add Images:
Replace the icon placeholders with actual images:
1. Add your images to an `images/` folder
2. Update the background styles in product cards, gallery items, etc.

### Modify Products:
Add or remove products in the Products Section of `index.html` (around line ~270).

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📱 Responsive Breakpoints

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px
- Small Mobile: < 480px

## 🔧 Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- JavaScript (ES6+)
- Font Awesome Icons

## 📞 Contact Form

The contact form currently shows an alert message. To make it functional:
1. Set up a backend service (PHP, Node.js, etc.)
2. Update the form submission handler in `script.js` (line ~150)
3. Or use a third-party service like Formspree, EmailJS, or Netlify Forms

## 🎯 Next Steps

1. ✅ Website structure created
2. ⏳ Add your contact information
3. ⏳ Add real product images
4. ⏳ Set up contact form backend
5. ⏳ Connect social media accounts
6. ⏳ Deploy to hosting service

## 📝 Notes

- All sections are fully responsive
- WhatsApp button appears on all pages
- Smooth scroll navigation included
- SEO-optimized structure
- Fast loading and performance optimized

## 🆘 Support

For any questions or modifications needed, please refer to the code comments or contact your web developer.

---

**Glintexim** - 25+ Years of Excellence in Import & Export

