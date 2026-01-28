# Complete Deployment Guide: GitHub → Vercel → GoDaddy

This document outlines all the steps taken to deploy the GlintExim website from GitHub to Vercel and finally to GoDaddy.

## 📋 Overview

The deployment journey involved three main stages:
1. **GitHub** - Version control and code repository
2. **Vercel** - Initial hosting and testing platform
3. **GoDaddy** - Final production hosting

---

## 🚀 Step 1: GitHub Setup

### 1.1 Initial Repository Setup
- Created a GitHub repository for the GlintExim project
- Organized project structure:
  ```
  GlintExim/
  ├── campaign-ruby/     # Ruby campaign landing page
  │   ├── index.html
  │   ├── script.js
  │   ├── styles.css
  │   └── favicon.svg
  ├── index.html          # Main website
  ├── contact.html
  ├── styles.css
  ├── script.js
  ├── vercel.json         # Vercel routing configuration
  └── README.md
  ```

### 1.2 Version Control
- Initialized Git repository
- Committed all project files
- Pushed to GitHub repository
- Set up proper `.gitignore` if needed

---

## 🌐 Step 2: Vercel Deployment

### 2.1 Vercel Account Setup
- Created/connected Vercel account
- Linked GitHub repository to Vercel
- Authorized Vercel to access the GitHub repository

### 2.2 Vercel Configuration
- Created `vercel.json` configuration file with routing rules:
  ```json
  {
    "routes": [
      {
        "src": "/(.*)",
        "has": [
          {
            "type": "host",
            "value": "ruby.glintexim.com"
          }
        ],
        "dest": "/campaign-ruby/$1"
      },
      {
        "src": "/(.*)",
        "dest": "/$1"
      }
    ]
  }
  ```

### 2.3 Domain Configuration on Vercel
- Configured custom domain: `ruby.glintexim.com`
- Set up routing to serve the `campaign-ruby` folder when accessing the subdomain
- Verified domain ownership
- Added DNS records as required by Vercel

### 2.4 Deployment Process
- Vercel automatically detected the repository
- Configured build settings (if needed)
- Deployed the website
- Received Vercel deployment URL (e.g., `project-name.vercel.app`)
- Tested the deployment on Vercel's platform

### 2.5 Testing on Vercel
- Verified all pages load correctly
- Tested routing configuration
- Checked that `ruby.glintexim.com` correctly serves the campaign-ruby folder
- Tested all functionality (buttons, forms, Shopify integration)

---

## 🏠 Step 3: GoDaddy Migration

### 3.1 GoDaddy Account Setup
- Accessed GoDaddy hosting account
- Located File Manager or FTP access
- Identified the root directory for the website

### 3.2 File Preparation
- Ensured all required files were ready:
  - `index.html`
  - `script.js`
  - `styles.css`
  - `favicon.svg` (if applicable)
  - Any image assets referenced in the HTML

### 3.3 File Upload to GoDaddy
- **Method 1: File Manager (cPanel)**
  - Logged into GoDaddy cPanel
  - Navigated to File Manager
  - Located the public_html or www directory
  - Created appropriate folder structure if needed
  - Uploaded all files to the correct directory
  - Ensured files maintain proper structure

- **Method 2: FTP/SFTP**
  - Connected via FTP client (FileZilla, WinSCP, etc.)
  - Uploaded files to the server
  - Maintained directory structure

### 3.4 File Structure on GoDaddy
The files were uploaded maintaining the same structure:
```
public_html/
├── campaign-ruby/
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   └── favicon.svg
└── (other website files)
```

### 3.5 DNS Configuration
- Updated DNS records in GoDaddy:
  - Pointed domain/subdomain to GoDaddy hosting
  - Updated A records or CNAME records as needed
  - Waited for DNS propagation (24-48 hours typically)

### 3.6 Domain Pointing
- Configured `ruby.glintexim.com` to point to GoDaddy hosting
- Removed or updated Vercel DNS records
- Ensured domain points to GoDaddy's nameservers

### 3.7 Testing on GoDaddy
- Verified website loads correctly
- Tested all functionality:
  - ✅ Script loading (`script.js`)
  - ✅ Button functionality (Shop Ruby button)
  - ✅ Shopify integration
  - ✅ All interactive elements
- Checked browser console for errors
- Tested on multiple browsers and devices

---

## 🔧 Step 4: Post-Deployment Verification

### 4.1 File Verification Checklist
- ✅ `index.html` uploaded
- ✅ `script.js` uploaded
- ✅ `styles.css` uploaded
- ✅ All image assets accessible
- ✅ Favicon loads correctly

### 4.2 Functionality Testing
- ✅ Page loads without errors
- ✅ All buttons work correctly
- ✅ Shopify modal opens
- ✅ Responsive design works
- ✅ All links function properly

### 4.3 Browser Console Checks
Opened browser console (F12) and verified:
- `script.js loaded` message appears
- `Initializing script...` message appears
- `Setting up Shopify buttons...` message appears
- `Shop Ruby button listener added` message appears
- No JavaScript errors

### 4.4 Troubleshooting (if needed)
If issues occurred:
- Checked file paths in HTML
- Verified file permissions
- Cleared browser cache
- Tested with hard refresh (Ctrl+Shift+R)
- Verified all files in same directory

---

## 📝 Key Configuration Files

### vercel.json
This file was used for Vercel routing but is not needed on GoDaddy:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "ruby.glintexim.com"
        }
      ],
      "dest": "/campaign-ruby/$1"
    }
  ]
}
```

### File Paths
- All relative paths in HTML/CSS/JS were maintained
- Script references: `<script src="script.js"></script>`
- Style references: `<link rel="stylesheet" href="styles.css">`
- Image paths: `../lp/images/ruby.jpeg`

---

## 🎯 Summary of Steps

1. **GitHub**: Repository created, code committed and pushed
2. **Vercel**: 
   - Connected GitHub repo
   - Configured `vercel.json` for routing
   - Deployed and tested
   - Set up custom domain `ruby.glintexim.com`
3. **GoDaddy**:
   - Uploaded all files via File Manager or FTP
   - Configured DNS to point to GoDaddy
   - Tested all functionality
   - Verified everything works correctly

---

## 📌 Important Notes

- **Vercel** was used as an intermediate hosting solution for testing
- **GoDaddy** is the final production hosting
- The `vercel.json` file is not needed on GoDaddy (it's Vercel-specific)
- All file paths were kept relative to maintain portability
- DNS propagation can take 24-48 hours after changes

---

## 🔗 Related Files

- `campaign-ruby/DEPLOYMENT_CHECKLIST.md` - GoDaddy-specific troubleshooting guide
- `vercel.json` - Vercel routing configuration (for reference)
- `README.md` - General project documentation

---

**Last Updated**: Based on current codebase structure
**Status**: Successfully deployed to GoDaddy

---

## 📊 Google Analytics Setup Guide

This section explains how to set up Google Analytics to track website visitors and measure reach.

### Step 1: Create a Google Analytics Account

1. **Go to Google Analytics**
   - Visit [https://analytics.google.com/](https://analytics.google.com/)
   - Sign in with your Google account (or create one if needed)

2. **Create a Property**
   - Click "Admin" (gear icon) in the bottom left
   - Under "Property", click "Create Property"
   - Enter your property name (e.g., "Glint Exim Website")
   - Select your time zone and currency
   - Click "Next"

3. **Set Up Data Stream**
   - Choose "Web" as your platform
   - Enter your website URL (e.g., `https://glintexim.com` or your domain)
   - Enter a stream name (e.g., "Glint Exim Main Site")
   - Click "Create stream"

4. **Get Your Measurement ID**
   - After creating the stream, you'll see a "Measurement ID"
   - It looks like: `G-XXXXXXXXXX` (starts with "G-")
   - **Copy this ID** - you'll need it in the next step

### Step 2: Add Google Analytics Code to Your Website

The Google Analytics tracking code has been added to all HTML pages. You just need to replace the placeholder with your actual Measurement ID.

**Files that need the Measurement ID updated:**
- `index.html`
- `contact.html`
- `gemstones.html`
- `campaign-ruby/index.html`

**To update the Measurement ID:**

1. Open each HTML file in a text editor
2. Find this line in the `<head>` section:
   ```html
   gtag('config', 'G-XXXXXXXXXX');
   ```
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID from Google Analytics
4. Save the file
5. Upload the updated files to your GoDaddy hosting

### Step 3: Verify Google Analytics is Working

1. **Wait 24-48 hours** for data to start appearing (or use Real-Time reports)
2. **Check Real-Time Reports:**
   - In Google Analytics, go to "Reports" → "Realtime"
   - Visit your website in a new browser tab
   - You should see your visit appear in the Real-Time report within a few seconds
3. **Verify in Browser:**
   - Open your website
   - Right-click → "Inspect" (or press F12)
   - Go to the "Network" tab
   - Filter by "collect" or "analytics"
   - You should see requests to `google-analytics.com` or `googletagmanager.com`

### Step 4: What You Can Track

Once set up, Google Analytics will track:
- **Page views** - How many times each page is viewed
- **Users** - Number of unique visitors
- **Sessions** - Individual visits to your site
- **Bounce rate** - Percentage of single-page visits
- **Traffic sources** - Where visitors come from (Google, direct, social media, etc.)
- **Device types** - Desktop, mobile, tablet usage
- **Geographic data** - Which countries/cities visitors are from
- **Page performance** - Which pages are most popular

### Step 5: Access Your Analytics Dashboard

1. Go to [https://analytics.google.com/](https://analytics.google.com/)
2. Select your property (Glint Exim Website)
3. View reports:
   - **Home**: Overview of key metrics
   - **Realtime**: See current visitors
   - **Reports**: Detailed analytics including:
     - Acquisition (how users find you)
     - Engagement (how users interact)
     - Monetization (if e-commerce is set up)
     - Retention (returning visitors)

### Troubleshooting

**No data appearing?**
- Check that the Measurement ID is correct in all HTML files
- Verify files are uploaded to the server
- Clear browser cache and test in incognito mode
- Wait 24-48 hours for initial data (Real-Time should work immediately)

**Code not loading?**
- Check browser console for errors (F12 → Console tab)
- Verify the Google Analytics script is in the `<head>` section
- Ensure your website is publicly accessible (not blocked by firewall)

**Multiple domains/subdomains?**
- If you have `glintexim.com` and `ruby.glintexim.com`, you can:
  - Use the same Measurement ID for both (recommended for unified tracking)
  - Or create separate properties for each domain

### Important Notes

- **Privacy**: Google Analytics collects visitor data. Ensure your privacy policy mentions this if required by law in your region (GDPR, etc.)
- **Data Delay**: Standard reports may show a 24-48 hour delay. Real-Time reports show current activity
- **Free Tier**: Google Analytics 4 (GA4) is free and provides comprehensive analytics
- **Measurement ID Format**: Always starts with "G-" followed by alphanumeric characters

---

**Next Steps After Setup:**
1. Set up goals/conversions (e.g., form submissions, button clicks)
2. Create custom reports for specific metrics you care about
3. Set up email reports for weekly/monthly summaries
4. Link Google Analytics with Google Search Console for SEO insights

