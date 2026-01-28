# Deployment Prompt for Cursor AI

Copy and paste this prompt when you need to deploy a website to hosting (GoDaddy, cPanel, or similar):

---

## Prompt to Give to Cursor:

```
I need to deploy my website to hosting (GoDaddy/cPanel/FTP). Help me with the complete deployment process:

1. **Review my project structure** - Identify all files that need to be uploaded (HTML, CSS, JS, images, fonts, etc.)

2. **Create a deployment checklist** - List all files that must be uploaded to the hosting server

3. **Verify file paths** - Check that all relative paths in HTML, CSS, and JavaScript are correct and will work on the hosting server

4. **Create a deployment guide** with step-by-step instructions:
   - How to access the hosting (File Manager/FTP)
   - Which directory to upload files to (public_html, www, etc.)
   - File structure to maintain
   - DNS configuration steps (if needed)
   - Testing steps after deployment

5. **Create a troubleshooting guide** for common issues:
   - Files not loading
   - Scripts not working
   - Images not displaying
   - Path errors
   - Browser console errors

6. **Provide testing checklist**:
   - What to check after deployment
   - Browser console commands to verify everything works
   - How to test all functionality

7. **Update any configuration files** if needed for the hosting environment

Please create comprehensive documentation that I can follow step-by-step to deploy my website successfully.
```

---

## Alternative Shorter Prompt:

```
Help me deploy my website to hosting (GoDaddy/cPanel). I need:
1. A list of all files to upload
2. Step-by-step deployment instructions
3. File path verification
4. Post-deployment testing checklist
5. Troubleshooting guide for common issues

Create a complete deployment guide I can follow.
```

---

## For Specific Hosting Providers:

### For GoDaddy:
```
I'm deploying my website to GoDaddy hosting. Help me:
1. Identify all files needed for upload
2. Create instructions for uploading via GoDaddy File Manager
3. Verify all file paths are correct
4. Create a testing checklist
5. Provide troubleshooting steps for GoDaddy-specific issues
```

### For cPanel:
```
I'm deploying to cPanel hosting. Help me:
1. List all files to upload via cPanel File Manager
2. Verify directory structure (public_html, etc.)
3. Check file permissions if needed
4. Create deployment and testing guide
```

### For FTP/SFTP:
```
I'm deploying via FTP/SFTP. Help me:
1. Identify all files to upload
2. Create instructions for FTP upload
3. Verify file paths and structure
4. Create testing checklist
```

---

## For Projects with Build Steps:

```
I have a website project that needs to be deployed to hosting. 
Before deployment, help me:
1. Identify if there are any build steps needed
2. List all files that need to be uploaded (including built/compiled files)
3. Create deployment instructions
4. Verify all paths work on the hosting server
5. Create testing checklist
```

---

## Tips for Using This Prompt:

1. **Be specific about your hosting**: Mention if it's GoDaddy, cPanel, shared hosting, VPS, etc.

2. **Mention your project type**: Static HTML, React, Vue, etc. (if applicable)

3. **Include any special requirements**: Custom domains, subdomains, SSL, etc.

4. **Ask for file verification**: Request that Cursor checks all file paths and dependencies

5. **Request troubleshooting**: Always ask for a troubleshooting section

---

## Example Full Prompt:

```
I'm deploying my [PROJECT_NAME] website to [HOSTING_PROVIDER] hosting. 

My project structure:
- [Brief description of your project structure]

Help me:
1. Review all files and create a complete upload checklist
2. Verify all file paths (HTML, CSS, JS, images) are correct for hosting
3. Create step-by-step deployment instructions for [HOSTING_PROVIDER]
4. Provide a post-deployment testing checklist
5. Create a troubleshooting guide for common deployment issues
6. Check if any configuration files need updates for production

I need clear, actionable steps I can follow to deploy successfully.
```

---

**Note**: Replace [PROJECT_NAME] and [HOSTING_PROVIDER] with your actual details when using the prompt.

