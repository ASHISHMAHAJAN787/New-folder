# 🚀 Deploy AI Learning Platform to Vercel

This guide will walk you through deploying your AI Learning Platform to Vercel in 5-10 minutes.

## 📋 **Prerequisites**
1. A GitHub account (free)
2. A Vercel account (free - sign up at vercel.com)
3. Your project folder extracted and ready

## 🎯 **Method 1: Deploy via GitHub (Recommended)**

### **Step 1: Create GitHub Repository**
1. Go to https://github.com
2. Click **+** → **New repository**
3. Name: `ai-learning-platform`
4. **DO NOT** initialize with README, .gitignore, or license
5. Click **Create repository**

### **Step 2: Upload to GitHub**
```bash
# Open terminal in your project folder
cd /path/to/your/project

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Learning Platform"

# Connect to GitHub
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-learning-platform.git

# Push to GitHub
git push -u origin main
```

**Alternative: Use GitHub Desktop**
1. Open GitHub Desktop
2. File → Add Local Repository
3. Select your project folder
4. Commit with message "Initial commit"
5. Publish repository to GitHub

### **Step 3: Deploy on Vercel**
1. Go to https://vercel.com
2. Sign up/login (use GitHub to sign in)
3. Click **Add New...** → **Project**
4. Import your `ai-learning-platform` repository
5. Click **Import**

### **Step 4: Configure Vercel**
1. **Project Name:** `ai-learning-platform` (or choose your own)
2. **Framework Preset:** Vite
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Install Command:** `npm install`
6. Click **Deploy**

### **Step 5: Wait for Deployment**
- Vercel will automatically build and deploy
- Takes 1-3 minutes
- You'll get a live URL like: `https://ai-learning-platform.vercel.app`

## 🎯 **Method 2: Deploy via Vercel CLI (Advanced)**

### **Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

### **Step 2: Login to Vercel**
```bash
vercel login
```

### **Step 3: Deploy**
```bash
cd /path/to/your/project
vercel
```

### **Step 4: Follow Prompts**
```
? Set up and deploy "~/project"? [Y/n] Y
? Which scope do you want to deploy to? (Select your account)
? Link to existing project? [y/N] N
? What's your project's name? ai-learning-platform
? In which directory is your code located? ./
? Want to override the settings? [y/N] N
```

### **Step 5: Deploy to Production**
```bash
vercel --prod
```

## 🎯 **Method 3: Drag & Drop (Easiest)**

### **Step 1: Build Your Project**
```bash
cd /path/to/your/project
npm run build
```

### **Step 2: Go to Vercel**
1. Visit https://vercel.com/dashboard
2. Click **Add New...** → **Project**
3. Click **Continue with GitHub** (if prompted)
4. Scroll down to **"Deploy from a Git repository"**
5. Click **Import Third-Party Git Repository**
6. Paste your GitHub repo URL
7. Follow Method 1 steps from Step 3

## ⚙️ **Vercel Configuration File**

Create `vercel.json` in your project root for advanced configuration:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_GEMINI_API_KEY": "your_gemini_api_key_here"
  }
}
```

## 🔧 **Environment Variables (Optional)**

If you want to use a different Gemini API key:

1. In Vercel dashboard, go to your project
2. **Settings** → **Environment Variables**
3. Add:
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** Your Gemini API key
   - **Environment:** Production
4. Click **Save**
5. Redeploy

## 🌐 **Custom Domain (Optional)**

1. Go to Vercel dashboard → Project → **Settings** → **Domains**
2. Add your domain (e.g., `learnai.yourdomain.com`)
3. Follow DNS configuration instructions
4. Wait for propagation (up to 24 hours)

## 🚨 **Common Issues & Solutions**

### **Issue 1: Build fails on Vercel**
**Solution:** 
1. Check Vercel logs for error
2. Common fix: Update `package.json` build script:
```json
"scripts": {
  "build": "tsc && vite build"
}
```

### **Issue 2: Blank page after deployment**
**Solution:**
1. Check if `dist/index.html` exists
2. Add `vercel.json` with SPA routing (see above)
3. Ensure all assets are loading (check browser console)

### **Issue 3: YouTube videos not loading**
**Solution:**
1. This is normal - YouTube embeds work on live domains
2. Test on your deployed URL
3. If blocked, check browser console for CORS errors

### **Issue 4: AI features not working**
**Solution:**
1. Check if Gemini API key is valid
2. Test locally first: `npm run dev`
3. Check Vercel logs for API errors

## 📊 **Monitoring Your Deployment**

1. **Vercel Dashboard:** View deployments, logs, analytics
2. **Real-time Logs:** Project → **Deployments** → Click deployment → **Logs**
3. **Analytics:** Project → **Analytics** (traffic, performance)
4. **Speed Insights:** Project → **Speed Insights** (performance metrics)

## 🔄 **Continuous Deployment**

Every time you push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```
Vercel automatically redeploys!

## 🎉 **Deployment Complete!**

Your AI Learning Platform is now live at:
`https://ai-learning-platform.vercel.app`

**Share with users:**
- Students: Share the URL
- Admin: `admin@learnai.com` / `admin123`
- Demo student: `student@example.com` / `student123`

## 📞 **Need Help?**

1. **Vercel Docs:** https://vercel.com/docs
2. **Vercel Support:** https://vercel.com/support
3. **GitHub Issues:** Create issue in your repository
4. **Community:** Vercel Discord community

## 🏆 **Next Steps After Deployment**

1. **Test all features** on live URL
2. **Add more courses** via Admin panel
3. **Share with beta testers**
4. **Monitor usage** in Vercel analytics
5. **Set up custom domain** (optional)
6. **Enable HTTPS** (automatic on Vercel)