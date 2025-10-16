# Quick Testing Guide
**Run these tests before deployment**

## 🚀 Development Server
The server is already running at: **http://localhost:3001**

---

## ✅ Critical Tests (5 minutes)

### 1. Homepage & Intro (2 min)
- [ ] Load `http://localhost:3001`
- [ ] Watch intro: DARRIUS GRATE video → glitch → FOREVERLX video
- [ ] Press ESC key → Should skip to homepage
- [ ] Reload page → Try skip button (appears after 2 seconds)
- [ ] Verify homepage video background plays

### 2. Navigation Test (2 min)
**From Homepage:**
- [ ] Click "Projects" → Projects page loads
- [ ] Click logo → **Homepage loads (intro does NOT replay)** ← CRITICAL TEST
- [ ] Click "Services" → Services page loads
- [ ] Click "Home" button → **Homepage loads (intro does NOT replay)** ← CRITICAL TEST

**Cross-page:**
- [ ] Projects → About (using nav)
- [ ] About → Contact (using nav)
- [ ] Contact → Research (using nav)
- [ ] Research → Home (using logo)

### 3. Browser Console Check (1 min)
1. Press F12 (or Cmd+Option+I on Mac)
2. Click "Console" tab
3. Look for:
   - ❌ Red errors → Report if found
   - ❌ 404 errors → Report if found
   - ✅ Should see: FPS counter messages (normal)
   - ✅ Videos loading messages (normal)

---

## 📱 Quick Mobile Test (Optional - 2 min)
1. Press F12 → Click device icon (top left)
2. Select "iPhone 12 Pro" or similar
3. Test:
   - [ ] Intro plays correctly
   - [ ] Homepage scrolls smoothly
   - [ ] Navigation menu (hamburger icon) works
   - [ ] Pages load correctly

---

## 🎯 Expected Behavior

### ✅ GOOD - What You Should See:
- Intro plays on first visit
- Smooth transitions between DARRIUS and FOREVERLX
- Skip button appears after 2 seconds
- Homepage loads after intro
- Navigation works to all pages
- **Clicking Home/logo from any page returns to homepage**
- Intro does NOT replay when returning to homepage
- No red errors in console
- Videos load and play smoothly

### ❌ BAD - Report These Issues:
- Intro loops forever
- Black screen
- Clicking Home/logo doesn't navigate to homepage
- Page stuck when trying to navigate
- Red errors in console
- 404 errors for videos
- Stuttering or performance issues
- Intro replays every time you return to homepage

---

## 🐛 If You Find Issues

### Issue: Homepage Navigation Not Working
**Symptoms**: Clicking Home or logo changes URL but page doesn't update

**Quick Fix Attempt**:
```bash
# Clear sessionStorage
1. Open browser console (F12)
2. Type: sessionStorage.clear()
3. Press Enter
4. Refresh page (Ctrl+R)
```

### Issue: Intro Playing Every Time
**Fix**:
```bash
# In browser console:
sessionStorage.setItem('hasSeenIntro', 'true')
```

### Issue: Videos Not Loading
**Check**:
1. Console shows 404 errors for `/videos/*.mp4`?
2. Verify files exist: `ls -lh /home/paradigm/red-team-portfolio/public/videos/`
3. Try hard refresh: Ctrl+Shift+R

### Issue: Development Server Not Running
**Restart**:
```bash
cd /home/paradigm/red-team-portfolio
npm run dev
# Wait for "Ready on http://localhost:3001"
```

---

## 📋 Test Results

Use this checklist:

```
Date: ___________
Time: ___________

CRITICAL TESTS:
[ ] Intro plays correctly
[ ] Skip button works
[ ] Homepage navigation works (from Projects page)
[ ] Homepage navigation works (from Services page)
[ ] Logo click returns to homepage
[ ] Intro does NOT replay on return
[ ] No console errors

PAGES:
[ ] Projects page loads
[ ] Services page loads
[ ] About page loads
[ ] Contact page loads
[ ] Research page loads

FUNCTIONALITY:
[ ] All nav links work
[ ] Video backgrounds play
[ ] Hover effects work
[ ] Responsive on mobile (if tested)

CONSOLE:
[ ] No red errors
[ ] No 404s
[ ] Videos load successfully

PERFORMANCE:
[ ] No stuttering
[ ] Smooth animations
[ ] Quick page loads

NOTES:
_______________________________
_______________________________
_______________________________
```

---

## ✅ If All Tests Pass

**You're ready to deploy! Next steps:**

1. **Stop dev server**: Press Ctrl+C in terminal
2. **Read deployment docs**: See `DEPLOYMENT.md`
3. **Create GitHub repo**: Follow instructions
4. **Deploy to Vercel**: Import and deploy
5. **Test live site**: Run same tests on production URL

---

## 📞 Getting Help

If you encounter issues not covered here:
1. Note the exact error message
2. Check browser console for details
3. Try clearing cache and sessionStorage
4. Restart dev server
5. Report specific symptoms

---

**Ready?** Open `http://localhost:3001` and start testing! 🚀


