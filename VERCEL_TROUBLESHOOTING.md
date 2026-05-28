# 🔧 Vercel Deployment Troubleshooting Guide

## 🚨 **Common Errors & Solutions**

### **Error 1: "Failed to build"**
**Symptoms:**
- Red ❌ in Vercel dashboard
- Build logs show npm errors

**Solutions:**
1. **Check Node.js version:**
```json
// In package.json, add:
"engines": {
  "node": ">=18.0.0"
}
```

2. **Clear npm cache locally:**
```bash
npm cache clean --force
npm install
npm run build
```

3. **Update dependencies:**
```bash
npm update
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### **Error 2: "Blank white page"**
**Symptoms:**
- Website loads but shows empty white page
- Console shows 404 errors

**Solutions:**
1. **Add vercel.json SPA routing:**
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

2. **Check dist folder structure:**
```bash
# Locally, run:
npm run build
ls -la dist/
# Should show: index.html, assets/ folder
```

3. **Clear browser cache & test incognito**

### **Error 3: "Git push rejected"**
**Symptoms:**
```
! [rejected] main -> main (fetch first)
error: failed to push some refs
```

**Solutions:**
```bash
# Force push (if you don't care about history):
git push -f origin main

# OR pull first:
git pull origin main --allow-unrelated-histories
git push origin main
```

### **Error 4: "YouTube videos not loading"**
**Symptoms:**
- Black YouTube player
- "Video unavailable" message

**Solutions:**
1. **This is normal** - YouTube embeds work on live domains
2. Wait 5 minutes after deployment
3. Test on different network
4. Check if YouTube is blocked in your region

### **Error 5: "AI features not working"**
**Symptoms:**
- AI Tutor/Quiz/Flashcards show errors
- "API key invalid" messages

**Solutions:**
1. **Check Gemini API key:**
   - Login as admin (`admin@learnai.com` / `admin123`)
   - Go to Admin → Gemini API Key
   - Verify key is correct

2. **Update environment variable in Vercel:**
   - Vercel dashboard → Project → Settings → Environment Variables
   - Add: `VITE_GEMINI_API_KEY` = your key
   - Redeploy

### **Error 6: "Port 3000 already in use"**
**Symptoms:**
- Can't run `npm run dev` locally

**Solutions:**
```bash
# Find and kill process:
npx kill-port 3000 5173 5000

# OR change port in package.json:
"scripts": {
  "dev": "vite --port 3001"
}
```

## 📊 **Vercel Log Analysis**

### **How to read Vercel logs:**
1. Go to Vercel dashboard
2. Click on failed deployment
3. Click **View Logs**
4. Look for keywords:
   - `ERR!` - npm error
   - `404` - missing file
   - `ENOENT` - file not found
   - `EACCES` - permission error

### **Common log messages:**
```
# Good - deployment successful
✓ Build completed
✓ Uploading build outputs
✓ Deployed to production
```

```
# Bad - build failed
× Build failed
npm ERR! code ELIFECYCLE
```

## 🔧 **Advanced Fixes**

### **Fix 1: Missing dependencies**
```bash
# Locally:
rm -rf node_modules package-lock.json
npm install
npm run build

# Commit and push:
git add .
git commit -m "Reinstall dependencies"
git push
```

### **Fix 2: TypeScript errors**
```bash
# Check for TypeScript errors:
npx tsc --noEmit

# If errors, fix them or add to tsconfig.json:
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

### **Fix 3: Memory issues**
```json
// In vercel.json:
{
  "functions": {
    "**/*.js": {
      "maxDuration": 10,
      "memory": 1024
    }
  }
}
```

## 📞 **Vercel Support Channels**

### **1. Official Documentation**
- https://vercel.com/docs
- Search: "Vite deployment", "SPA routing", "environment variables"

### **2. Community Help**
- **Vercel Discord:** https://vercel.com/discord
- **GitHub Discussions:** https://github.com/vercel/vercel/discussions
- **Stack Overflow:** Tag `vercel`

### **3. Direct Support**
- **Email:** support@vercel.com
- **Twitter:** @vercel
- **Status Page:** https://vercel-status.com

## 🛠️ **Quick Diagnostic Commands**

### **Before deploying, run locally:**
```bash
# 1. Install dependencies
npm install

# 2. Build project
npm run build

# 3. Serve built version
npx serve dist/

# 4. Test at http://localhost:3000
```

### **Check project structure:**
```bash
# Essential files that must exist:
ls -la package.json      # Must exist
ls -la vite.config.ts    # Must exist
ls -la src/App.tsx       # Must exist
ls -la dist/index.html   # After build
```

## 🎯 **Deployment Checklist**

### **Pre-Deployment:**
- [ ] `npm run build` works locally
- [ ] `dist/` folder contains index.html
- [ ] No TypeScript errors
- [ ] All dependencies in package.json

### **Post-Deployment:**
- [ ] Website loads without errors
- [ ] All routes work (refresh test)
- [ ] Assets load (images, CSS, JS)
- [ ] API calls work (AI features)
- [ ] Mobile responsive

## ⚡ **Emergency Rollback**

### **If deployment breaks everything:**
1. Go to Vercel dashboard
2. Click on previous working deployment
3. Click **•••** → **Promote to Production**
4. Your site reverts to last working version

### **Disable auto-deploy:**
1. Vercel dashboard → Project → Settings → Git
2. Disable **Auto Deploy on Push**
3. Deploy manually when ready

## 🎉 **Success Indicators**
- ✅ Green "Deployment complete" in Vercel
- ✅ Website loads in < 3 seconds
- ✅ No console errors (F12 → Console)
- ✅ All features functional
- ✅ Mobile/desktop responsive

---

**Remember:** Most deployment issues are fixed by:
1. Checking Vercel logs
2. Running `npm run build` locally first
3. Ensuring `vercel.json` has SPA routing
4. Waiting 5 minutes after deployment