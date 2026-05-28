# 📋 Vercel Deployment - Step by Step

## 🎯 **QUICK 5-MINUTE DEPLOYMENT**

### **Step 1: Create GitHub Account (if you don't have one)**
1. Go to https://github.com
2. Click **Sign up**
3. Use email/password
4. Verify email

### **Step 2: Upload Project to GitHub**
**Option A: Using GitHub Website**
1. Go to https://github.com/new
2. Repository name: `ai-learning-platform`
3. **IMPORTANT:** Leave all checkboxes UNCHECKED
4. Click **Create repository**
5. On next page, scroll to "…or push an existing repository"
6. Copy these commands:
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-learning-platform.git
git push -u origin main
```
7. Open VS Code terminal in your project folder
8. Paste and run each command one by one

**Option B: Using GitHub Desktop**
1. Download GitHub Desktop from https://desktop.github.com
2. Install and open
3. Sign in with GitHub account
4. File → Add Local Repository
5. Select your project folder
6. Click "Create a repository"
7. Name: `ai-learning-platform`
8. Click "Create repository"
9. Click "Publish repository"

### **Step 3: Create Vercel Account**
1. Go to https://vercel.com
2. Click **Sign up**
3. Choose **Continue with GitHub**
4. Authorize Vercel to access GitHub

### **Step 4: Deploy on Vercel**
1. After signing in, click **Add New...** → **Project**
2. Find your `ai-learning-platform` repository
3. Click **Import**

### **Step 5: Configure Settings**
```
Project Name: ai-learning-platform
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### **Step 6: Click DEPLOY**
1. Wait 1-3 minutes
2. You'll see: ✅ Deployment complete!
3. Click **Visit** to open your live website

## 🌐 **Your Live Website URL**
`https://ai-learning-platform.vercel.app`

## 🔑 **Login Credentials**
- **Admin:** `admin@learnai.com` / `admin123`
- **Student:** `student@example.com` / `student123`

## 📱 **Share Your Platform**
1. Share the Vercel URL with students
2. They can sign up for free accounts
3. You can add unlimited courses via Admin panel

## 🔧 **Troubleshooting**

### **If deployment fails:**
1. Check Vercel logs (click on failed deployment)
2. Common issues:
   - Missing `package.json`
   - Build script error
   - Node.js version mismatch

### **If website shows blank page:**
1. Wait 5 minutes
2. Clear browser cache
3. Try incognito mode
4. Check browser console (F12 → Console)

### **If YouTube videos don't load:**
1. This is normal on first load
2. Refresh page
3. Check if YouTube is blocked in your region

## 📞 **Need Immediate Help?**
1. **Vercel Status:** https://vercel-status.com
2. **Vercel Docs:** https://vercel.com/docs
3. **Contact Support:** https://vercel.com/contact

## 🎉 **Congratulations!**
Your AI Learning Platform is now live on the internet! Anyone in the world can access it at your Vercel URL.