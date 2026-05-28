# Troubleshooting Guide

## 🚨 Common Issues & Solutions

### 1. **"npm install" fails**
**Symptoms:**
- Errors about missing packages
- Network timeout
- Permission denied

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try installing again
npm install
```

**If on Windows:**
```cmd
# Run as Administrator
npm cache clean --force
del package-lock.json
rmdir /s /q node_modules
npm install
```

### 2. **"Port 5173 already in use"**
**Solutions:**
```bash
# Find what's using the port
# Windows:
netstat -ano | findstr :5173
# Then kill the process: taskkill /PID [PID] /F

# Mac/Linux:
lsof -i :5173
# Then kill: kill -9 [PID]
```

**Or change the port:**
Edit `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3000  // Change to any available port
  }
})
```

### 3. **"Cannot find module" errors**
**Symptoms:**
- Red squiggly lines in VS Code
- Import errors
- Type errors

**Solutions:**
```bash
# Restart TypeScript server in VS Code
# Press Ctrl+Shift+P, type "Restart TS Server"

# Or reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### 4. **"Gemini API Error"**
**Symptoms:**
- AI features not working
- "Failed to generate" messages
- Network errors

**Solutions:**
1. Check your internet connection
2. Verify Gemini API key is valid
3. Update key in Admin panel
4. Try a different key from: https://aistudio.google.com/apikey

### 5. **"YouTube videos not loading"**
**Symptoms:**
- Black screen in video player
- "Video unavailable" message
- Loading spinner forever

**Solutions:**
1. Check if YouTube is accessible in your region
2. Try different video URLs
3. Ensure URLs are in correct format:
   - `https://www.youtube.com/watch?v=VIDEO_ID`
   - `https://youtu.be/VIDEO_ID`
4. Try VPN if YouTube is blocked

### 6. **"Login/Signup not working"**
**Symptoms:**
- Form submits but nothing happens
- "Invalid credentials" even with correct info
- Page refreshes but doesn't log in

**Solutions:**
1. Clear browser localStorage:
   ```javascript
   // In browser console (F12)
   localStorage.clear()
   location.reload()
   ```
2. Try incognito/private mode
3. Check browser console for errors (F12 → Console)

### 7. **"Progress not saving"**
**Symptoms:**
- Completed lessons reset
- Enrollment status lost
- Chat history disappears

**Solutions:**
1. Ensure cookies/localStorage is enabled
2. Don't use "Clear browsing data" while using app
3. Check if browser is in private mode (won't save)

### 8. **"Slow performance"**
**Symptoms:**
- Laggy interface
- Slow AI responses
- Video buffering

**Solutions:**
1. Close other browser tabs
2. Check internet speed
3. Use lighter Gemini model (switch to gemini-2.0-flash in Admin)
4. Clear browser cache

## 🔧 VS Code Specific Issues

### 1. **TypeScript errors in editor but app runs fine**
```bash
# Install TypeScript globally
npm install -g typescript

# Or update project TypeScript
npm install typescript@latest --save-dev
```

### 2. **ESLint/Prettier not working**
1. Install VS Code extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
2. Reload VS Code (Ctrl+Shift+P → "Reload Window")

### 3. **Auto-import not working**
Add to `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true
}
```

## 🌐 Browser Issues

### 1. **App works in Chrome but not Firefox/Edge**
1. Enable localStorage in browser settings
2. Disable strict privacy modes
3. Allow third-party cookies

### 2. **"Mixed content" errors**
If using HTTPS:
```bash
# Update vite.config.ts
export default defineConfig({
  server: {
    https: true
  }
})
```

### 3. **CORS errors with Gemini API**
This shouldn't happen as we call Gemini directly from browser. If it does:
1. Check if API key allows browser usage
2. Try different browser
3. Contact Google AI Studio support

## 📱 Mobile Issues

### 1. **Layout broken on mobile**
- Check Tailwind responsive classes
- Ensure viewport meta tag in index.html
- Test with Chrome DevTools device emulation

### 2. **Touch events not working**
- Ensure buttons have proper padding
- Check for z-index issues
- Test on actual device, not just emulator

## 🗄️ Data Issues

### 1. **Lost all data (courses, users, etc.)**
Data is stored in browser localStorage. To restore:
1. Don't clear browser data
2. Export/backup feature coming soon
3. For now, re-add courses as admin

### 2. **Corrupted data**
Clear and reset:
```javascript
// In browser console
localStorage.clear()
sessionStorage.clear()
location.reload()
```

## 📞 Getting Help

### 1. **Check Console Logs**
Press F12 → Console tab
Look for red error messages

### 2. **Check Network Requests**
F12 → Network tab
Look for failed requests (red)

### 3. **Debug Steps**
1. Can you access http://localhost:5173?
2. Does `npm run dev` show any errors?
3. Check Node.js version (`node --version`)
4. Check npm version (`npm --version`)

### 4. **Still stuck?**
1. Take screenshot of error
2. Copy console logs
3. Check Node.js version compatibility
4. Try fresh clone of project

## 🛠️ Advanced Troubleshooting

### Reset Everything
```bash
# Backup any important data first
# Then:
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

### Check Dependencies
```bash
# List installed packages
npm list --depth=0

# Check for outdated packages
npm outdated

# Update all packages
npm update
```

### Memory Issues
If Node.js runs out of memory:
```bash
# Increase memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
# Then run npm commands
```

**Remember:** This is a frontend-only app. All data is stored in your browser. If you clear browser data, you'll lose everything.