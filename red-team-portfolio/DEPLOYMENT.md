# Deployment Guide - Red Team Portfolio

## Pre-Deployment Checklist

### ✅ Code Status
- [x] Navigation bug fixed (Home button now works correctly)
- [x] Intro sequence working (plays once per session)
- [x] All pages accessible and rendering correctly
- [x] Video effects functioning properly
- [x] Consistent color scheme across all pages
- [x] No galaxy effects (removed for performance)

### ✅ Assets Verified
**Videos** (`/public/videos/`):
- ✅ `sunrise.mp4` (1.4M)
- ✅ `sunset.mp4` (4.9M)
- ✅ `homepage.mp4` (3.4M)

**Total video assets**: ~9.7MB

### ✅ Configuration Files
- ✅ `package.json` - Dependencies and scripts configured
- ✅ `.gitignore` - Properly configured to exclude large files
- ✅ `next.config.js` - Default Next.js configuration
- ✅ `tailwind.config.js` - Tailwind CSS configuration

---

## GitHub Repository Setup

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click "New repository"
3. Repository name: `red-team-portfolio` (or your preferred name)
4. Description: "Professional red team operator portfolio showcasing projects, research, and services"
5. Choose: **Public** (recommended for portfolio)
6. **Do NOT** initialize with README, .gitignore, or license (we have these)
7. Click "Create repository"

### Step 2: Initialize and Push to GitHub

```bash
cd /home/paradigm/red-team-portfolio

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Professional red team portfolio

- Intro sequence with video-in-text effects
- Homepage with video background
- Projects, Services, About, Contact, Research pages
- Responsive design with consistent color scheme
- Fixed navigation and intro replay logic"

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/red-team-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Vercel Deployment

### Prerequisites
1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Connected to Vercel

### Step 1: Import Project to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository:
   - Select "Import Git Repository"
   - Choose `red-team-portfolio`
   - Click "Import"

### Step 2: Configure Build Settings
Vercel will auto-detect Next.js. Verify these settings:

**Framework Preset**: Next.js  
**Root Directory**: `./`  
**Build Command**: `npm run build`  
**Output Directory**: `.next` (auto-detected)  
**Install Command**: `npm install`  
**Development Command**: `npm run dev`

### Step 3: Environment Variables (Optional)
Currently, no environment variables are required. 

**Future Variables** (when ready):
- `NEXT_PUBLIC_FORMSPREE_ID` - For contact form (get from formspree.io)
- `GITHUB_TOKEN` - For GitHub Stats API (if rate limits become an issue)

### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment (usually 2-3 minutes)
3. Vercel will provide a URL: `https://red-team-portfolio.vercel.app`

### Step 5: Custom Domain (Optional)
1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain (e.g., `darriusgrate.com`)
3. Follow Vercel's instructions to configure DNS:
   - **A Record**: `76.76.21.21` (Vercel)
   - **CNAME Record**: `cname.vercel-dns.com`
4. SSL certificates are automatically provisioned

---

## Post-Deployment Testing

### Critical Tests
1. **Intro Sequence**:
   - Visit homepage
   - Verify intro plays correctly
   - Test skip button (ESC key and button)
   - Verify homepage loads after intro

2. **Navigation**:
   - Test all nav links from homepage
   - Test navigation back to homepage from each page
   - Verify browser back/forward buttons work
   - Test logo click returns to homepage

3. **Intro Behavior**:
   - Navigate away and back → Intro should NOT replay
   - Refresh page → Intro should NOT replay (same session)
   - Open new tab → Intro SHOULD play (new session)

4. **Videos**:
   - Verify sunrise video in intro
   - Verify sunset video in intro
   - Verify homepage background video
   - Check video-in-text effects on hero section

5. **All Pages**:
   - Projects: Grid layout, project cards
   - Services: Service offerings, pricing
   - About: 90-day journey, skills, philosophy
   - Contact: Form (placeholder), contact info
   - Research: Research cards

6. **Performance**:
   - Page load speed
   - Video loading and playback
   - No stuttering or glitches
   - Smooth animations

### Browser Console
- Open DevTools (F12) → Console tab
- Verify no errors
- Check for 404s (especially video files)
- Verify no hydration errors

### Mobile Testing (Quick Check)
- Test on mobile device or browser DevTools
- Verify responsive design
- Check navigation (hamburger menu)
- Test video playback on mobile

---

## Known Limitations & Future Enhancements

### Current State
✅ Core functionality complete and tested  
✅ All pages created with professional styling  
✅ Navigation working correctly  
✅ Intro sequence with video effects  
✅ Video background on homepage  
✅ Consistent color scheme  

### Placeholder Content
⚠️ **Contact Form**: Uses placeholder Formspree endpoint - needs real endpoint  
⚠️ **About Page**: Day counter (45/90) is hardcoded - can automate later  
⚠️ **Services**: "Get Started" buttons don't have actions yet  
⚠️ **Projects**: Some projects marked as "Planned" with "Coming Soon" buttons  

### Future Enhancements (Post-Launch)
- **Formspree Integration**: Set up real contact form
- **GitHub Stats**: Implement live GitHub API integration
- **Attack Chain Visualizer**: Make interactive (currently static)
- **Blog/Research Content**: Add actual blog posts with MDX
- **Analytics**: Add Vercel Analytics or Google Analytics
- **Day Counter Automation**: Calculate from start date
- **Project Detail Pages**: Add more content and media

---

## Formspree Setup (When Ready)

### Step 1: Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up for free account
3. Create new form: "Portfolio Contact Form"

### Step 2: Get Form Endpoint
1. Copy your form endpoint ID (looks like: `abc123xyz`)
2. Your endpoint URL: `https://formspree.io/f/abc123xyz`

### Step 3: Update Contact Page
```bash
# Edit this file:
nano /home/paradigm/red-team-portfolio/src/app/contact/page.tsx

# Find line 46 and replace:
const response = await fetch('https://formspree.io/f/yourformid', {
# With your actual endpoint:
const response = await fetch('https://formspree.io/f/abc123xyz', {
```

### Step 4: Redeploy
```bash
git add src/app/contact/page.tsx
git commit -m "Add Formspree endpoint for contact form"
git push
```
Vercel will auto-deploy the changes.

---

## Day Counter Automation (Optional)

### Option A: Manual Update
Edit `/home/paradigm/red-team-portfolio/src/app/about/page.tsx`
```javascript
const currentDay = 45 // Update this number manually
```

### Option B: Automatic Calculation
```javascript
// Set your start date
const startDate = new Date('2025-01-01') // Your 90-day journey start date
const currentDate = new Date()
const daysPassed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24))
const currentDay = Math.min(daysPassed, 90) // Cap at 90
```

---

## Troubleshooting

### Videos Not Loading
- Check browser console for 404 errors
- Verify video files exist in `/public/videos/`
- Try hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

### Intro Replaying Every Time
- Clear browser cache and sessionStorage
- Check browser console for errors
- Verify sessionStorage is not disabled in browser

### Navigation Not Working
- Check browser console for JavaScript errors
- Verify all page files exist in `/src/app/`
- Try hard refresh

### Build Errors
```bash
# Clean and rebuild
rm -rf .next
npm run build
```

### Performance Issues
- Video file sizes might be too large for slow connections
- Consider further video compression
- Use Vercel Analytics to monitor performance

---

## Support & Maintenance

### Updating Content
1. Edit relevant files in `/src/app/` and `/src/components/`
2. Test locally: `npm run dev`
3. Commit and push to GitHub
4. Vercel auto-deploys changes

### Monitoring
- **Vercel Dashboard**: Track deployments, errors, analytics
- **Browser DevTools**: Debug client-side issues
- **Vercel Logs**: Check build and runtime logs

### Backup
- GitHub repository is your source of truth
- Vercel keeps deployment history
- Consider periodic backups of large assets (videos)

---

## Success Criteria

✅ **Navigation**: All pages accessible, Home button works  
✅ **Intro**: Plays once per session, skip button works  
✅ **Videos**: All video effects working correctly  
✅ **Performance**: No stuttering, smooth animations  
✅ **Console**: No errors, no 404s  
✅ **Mobile**: Responsive design working  
✅ **Deployment**: Live on Vercel with custom domain (optional)  

---

## Next Steps After Deployment

1. **Test Live Site**: Run through all tests on production URL
2. **Share Portfolio**: Add to resume, LinkedIn, Twitter
3. **Content Updates**: Fill in placeholder content as projects progress
4. **Formspree Setup**: Activate contact form
5. **Analytics**: Add tracking to monitor visitors
6. **SEO**: Submit to Google Search Console
7. **Advanced Features**: Implement GitHub stats, attack chain visualizer

---

**Deployed**: Ready for deployment  
**Last Updated**: 2025-10-15  
**Version**: 1.0.0 (Pre-Launch)


