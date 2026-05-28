# 🚀 How to Run This Project in VS Code - Complete Guide

## 📦 **What You Have Downloaded**
You have a **complete AI Learning Platform** with:
- 8 pre-built courses (Python, C++, Java, etc.)
- AI Tutor, Quizzes, Flashcards, Notes, Question Papers
- YouTube video player integrated
- Admin panel to add more courses
- User authentication system

## 🎯 **Step-by-Step Setup**

### **Step 1: Extract the Files**
1. Right-click the downloaded ZIP file
2. Select "Extract All..."
3. Choose a folder (e.g., `C:\Users\YourName\ai-learning-platform`)
4. Click "Extract"

### **Step 2: Open in VS Code**
1. Open **VS Code**
2. Click **File → Open Folder**
3. Navigate to the extracted folder
4. Click **Select Folder**

### **Step 3: Install Dependencies**
**Method A: Using Setup Script (Easiest)**
1. In VS Code, open Terminal (`Ctrl + ``)
2. Type: `setup.bat` (Windows) or `bash setup.sh` (Mac/Linux)
3. Press Enter

**Method B: Manual Installation**
```bash
npm install
```

### **Step 4: Start the Application**
In the same terminal:
```bash
npm run dev
```

Wait for the message:
```
➜  Local:   http://localhost:5173/
```

### **Step 5: Open in Browser**
1. Click the link: http://localhost:5173
2. Or copy-paste into your browser

## 👤 **Login Credentials**

### **Admin Account (Full Access)**
- **Email:** `admin@learnai.com`
- **Password:** `admin123`

### **Regular User Account**
- **Email:** `student@example.com`
- **Password:** `student123`

Or **sign up** with any email/password

## 🎮 **Quick Test - Verify Everything Works**

1. **Open** http://localhost:5173
2. **Login** as admin: `admin@learnai.com` / `admin123`
3. **Click** any course (e.g., "Python Programming")
4. **Test features:**
   - ▶️ Play YouTube video
   - 💬 Chat with AI Tutor
   - 📝 Generate Quiz
   - 🎴 View Flashcards
   - 📄 Create Study Notes
   - 📝 Generate Question Paper

## 🔧 **If Something Doesn't Work**

### **1. "npm install" fails**
```bash
# Try these commands:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### **2. "Port 5173 already in use"**
```bash
# Find and kill the process:
# Windows:
netstat -ano | findstr :5173
taskkill /PID [PID] /F

# Or change port in vite.config.ts:
# server: { port: 3000 }
```

### **3. "Cannot open localhost:5173"**
1. Check if terminal shows "Local: http://localhost:5173"
2. Try: http://127.0.0.1:5173
3. Check firewall settings

### **4. "AI features not working"**
1. Login as admin
2. Go to **Admin** page
3. Check Gemini API key is set
4. Or update with your key from: https://aistudio.google.com/apikey

## 📚 **Adding Your Own Courses**

### **Easy Method:**
1. Login as `admin@learnai.com`
2. Click **Admin** in navbar
3. Fill the form:
   - Title: "Your Course Name"
   - Description: "What students will learn"
   - Category: "Programming" (or other)
   - Video URLs (3 YouTube links, one per line)
4. Click **Create Course**

### **Example:**
```
Title: React JS Masterclass
Description: Learn React from basics to advanced
Category: Web Development
Video URLs:
https://youtu.be/w7ejDZ8SWv8
https://youtu.be/9D1x7-2FmTA
https://youtu.be/F2JCjVSZlG0
```

## 🚀 **Production Deployment**

To share with others:

### **Build for Production**
```bash
npm run build
```

### **Deploy to:**
1. **Vercel** (easiest): Drag `dist` folder to vercel.com
2. **Netlify**: Drag `dist` folder to netlify.com
3. **GitHub Pages**: Follow GitHub Pages setup
4. **Any web hosting**: Upload `dist` folder contents

## 📁 **Project Structure Explained**

```
ai-learning-platform/
├── src/                    # Source code
│   ├── components/        # Reusable UI components
│   ├── pages/            # Main pages (Login, Dashboard, etc.)
│   ├── utils/            # Database & AI utilities
│   └── types.ts          # TypeScript types
├── public/               # Static files
├── package.json          # Dependencies
├── vite.config.ts        # Build configuration
├── tailwind.config.js    # Styling configuration
├── README.md             # Complete documentation
├── setup.bat             # Windows setup script
└── setup.sh              # Mac/Linux setup script
```

## 🛠️ **VS Code Tips**

### **Useful Extensions to Install:**
1. **ESLint** - Code quality
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense** - Tailwind autocomplete
4. **Auto Rename Tag** - HTML/XML
5. **GitLens** - Git integration

### **Keyboard Shortcuts:**
- `Ctrl + `` - Open terminal
- `Ctrl + Shift + P` - Command palette
- `F5` - Start debugging
- `Ctrl + S` - Save all files

## 🔍 **Debugging**

### **Check Console:**
1. In browser, press `F12`
2. Go to **Console** tab
3. Look for red error messages

### **Check Network:**
1. `F12` → **Network** tab
2. Refresh page
3. Look for failed requests

### **Check Application Data:**
1. `F12` → **Application** tab
2. **Local Storage** → `http://localhost:5173`
3. See stored users, courses, progress

## 📞 **Need Help?**

### **Common Issues & Solutions:**

**Q: Page shows "Cannot GET /"**
A: Run `npm run dev` first, then open browser

**Q: Videos not playing**
A: YouTube might be blocked. Try VPN or different videos

**Q: AI chat not responding**
A: Check Gemini API key in Admin panel

**Q: Progress not saving**
A: Don't use private/incognito mode

**Q: Can't login**
A: Clear localStorage: `F12 → Console → localStorage.clear()`

## 🎉 **Congratulations!**

You now have a fully functional AI Learning Platform running locally. You can:

✅ **Add unlimited courses**  
✅ **Customize AI features**  
✅ **Modify the design**  
✅ **Add more features**  
✅ **Deploy online for others**

## 🔗 **Useful Links**

- **Gemini API Key:** https://aistudio.google.com/apikey
- **Node.js Download:** https://nodejs.org/
- **VS Code Download:** https://code.visualstudio.com/
- **YouTube Video Search:** https://www.youtube.com/

## 📝 **Next Steps**

1. **Add more courses** using Admin panel
2. **Customize colors** in `tailwind.config.js`
3. **Add new features** by editing components
4. **Deploy online** to share with students
5. **Backup data** by exporting localStorage

---

**Happy Teaching! 🎓**