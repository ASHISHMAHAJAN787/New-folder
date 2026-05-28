# AI Learning Platform - Complete Setup Guide

A full-featured AI-powered learning platform with Gemini AI integration, YouTube video player, quizzes, flashcards, and more.

## 🚀 Quick Start (VS Code)

### Step 1: Extract and Open in VS Code
1. Extract the downloaded ZIP file to a folder (e.g., `ai-learning-platform`)
2. Open VS Code
3. Click **File → Open Folder** and select the extracted folder

### Step 2: Install Dependencies
Open the **VS Code Terminal** (`Ctrl + \`` or `View → Terminal`):

```bash
npm install
```

This will install all required packages (React, Vite, Tailwind, Gemini AI SDK, etc.)

### Step 3: Start the Development Server
In the same terminal:

```bash
npm run dev
```

Wait for it to say:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

### Step 4: Open in Browser
Click the **Local** link or open: http://localhost:5173

## 📁 Project Structure

```
ai-learning-platform/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── utils/         # Utilities (database, AI client)
│   └── types.ts       # TypeScript types
├── public/            # Static assets
├── index.html         # Main HTML file
├── package.json       # Dependencies
├── vite.config.ts     # Build configuration
└── tailwind.config.js # Tailwind CSS config
```

## 👤 Default Accounts

### Admin Account (Pre-seeded)
- **Email:** `admin@learnai.com`
- **Password:** `admin123`

### Regular User
- Sign up with any email/password
- Or use: `student@example.com` / `student123`

## 🎯 Features

### 1. **Authentication**
- Sign up / Login with email & password
- Persistent sessions (localStorage)
- Protected routes

### 2. **Courses**
- 8 pre-seeded courses (Python, C++, Java, etc.)
- Each course has 3 YouTube lessons
- Progress tracking (% complete)
- Enroll/unenroll functionality

### 3. **AI Features**
- **AI Tutor Chat**: Ask questions about the current lesson
- **AI Quiz Generator**: 5 MCQs with explanations
- **AI Flashcards**: Interactive flip cards
- **AI Study Notes**: Summarized notes per lesson
- **AI Question Paper**: Generate printable exam papers

### 4. **YouTube Integration**
- Watch videos directly in the platform
- No external links needed
- Fullscreen support
- Progress saved per user

### 5. **Admin Panel**
- Add new courses
- Update Gemini API key
- View all courses

## 🔧 Configuration

### Gemini API Key
The default key is already set. To use your own:

1. Get a free Gemini API key from: https://aistudio.google.com/apikey
2. Login as admin (`admin@learnai.com` / `admin123`)
3. Go to **Admin** page
4. Update the **Gemini API Key** field
5. Click **Save Key**

### Adding New Courses
1. Login as admin
2. Go to **Admin** page
3. Fill in:
   - Course Title
   - Description
   - Category
   - YouTube URLs (3 videos)
4. Click **Create Course**

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Port Configuration
If port 5173 is busy, edit `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3000  // Change to any port
  }
})
```

## 📦 Production Build

To create a production build:

```bash
npm run build
```

The built files will be in `dist/` folder. You can deploy this to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

## 🔍 Troubleshooting

### 1. "npm install" fails
- Ensure you have Node.js 18+ installed
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then retry

### 2. "Port already in use"
```bash
# Find process using port 5173
netstat -ano | findstr :5173
# Kill the process (Windows)
taskkill /PID [PID] /F
```

Or change port in `vite.config.ts`

### 3. "Gemini API error"
- Check if API key is valid
- Ensure internet connection
- Try updating the key in Admin panel

### 4. "YouTube videos not loading"
- Check if YouTube is blocked in your region
- Try different video URLs
- Ensure URLs are in format: `youtube.com/watch?v=...` or `youtu.be/...`

## 📚 Dependencies

### Core
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (navigation)

### AI & Utilities
- @google/generative-ai (Gemini SDK)
- date-fns (date formatting)
- react-icons (icons)

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Change to your color
        secondary: '#10B981',
      }
    }
  }
}
```

### Add More Features
1. **Database**: Replace localStorage with Firebase/Supabase
2. **Backend**: Add Express/Node.js server
3. **Payment**: Integrate Stripe for paid courses
4. **Analytics**: Add user progress analytics

## 📞 Support

### Common Issues & Solutions

**Q: Can't sign up/login?**
A: Clear browser localStorage and refresh, or use incognito mode.

**Q: AI features not working?**
A: Check Gemini API key in Admin panel, ensure it's valid.

**Q: Videos not playing?**
A: YouTube might be blocked. Try VPN or different videos.

**Q: Progress not saving?**
A: Ensure cookies/localStorage is enabled in browser.

### Need Help?
1. Check browser console for errors (`F12 → Console`)
2. Verify all dependencies installed
3. Ensure Node.js version is 18+

## 📄 License

This project is for educational purposes. Feel free to modify and use as needed.

---

**Happy Learning! 🚀**