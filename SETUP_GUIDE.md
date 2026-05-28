# LearnAI Platform - Complete Setup Guide

## 🎯 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Update Environment Variables
The `.env` file is already configured. Verify it has:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your-jwt-secret-key-change-in-production
PORT=5000
VITE_API_URL=http://localhost:5000
```

### Step 3: Start the Application
```bash
# Option 1: Run both frontend and backend together
npm run dev:full

# Option 2: Run frontend only (if backend is already running)
npm run dev

# Option 3: Run backend only
npm run server
```

### Step 4: Access the Platform
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Step 5: Login with Demo Account
```
Email: admin@learnai.com
Password: admin123
```

---

## 📖 Complete Feature Walkthrough

### For Regular Users (Students)

#### 1. Sign Up
- Click "Sign Up" on the home page
- Enter your name, email, and password
- Click "Sign Up"
- You'll be logged in automatically and taken to dashboard

#### 2. View Courses
- Dashboard shows all available courses
- Scroll through "Available Courses" section
- See course title, description, level, and duration

#### 3. Enroll in a Course
- Click "Enroll Now" button on any course card
- Confirmation toast appears
- Course now appears in "My Learning Courses" section

#### 4. Access Course Features

**Overview Tab**:
- See course description
- View all course modules with durations
- Check course metadata (instructor, level, duration)

**Video Tab**:
- Watch embedded YouTube video for the course
- Video player is responsive and full-featured

**AI Tutor Tab**:
- Ask any question about the course
- Get instant AI-powered responses
- Chat history is maintained in the session
- Example questions:
  - "Explain variables and data types in Python"
  - "What is object-oriented programming?"
  - "Help me understand pointers in C++"

**Quiz Tab**:
- Select a topic from course modules
- Choose difficulty level (Beginner/Intermediate/Advanced)
- Click "Generate Quiz"
- Answer 5 multiple-choice questions
- See results with detailed explanations
- Understand why answers are correct/incorrect

**Notes Tab**:
- Select a topic from course modules
- Click "Generate Notes"
- Receive comprehensive study material including:
  - Key Concepts
  - Important Definitions
  - Examples
  - Common Mistakes
  - Summary Points
- Save or print the notes

#### 5. Track Progress
- Dashboard shows enrolled courses
- Click "Continue" to resume learning
- Progress is saved (ready for backend enhancement)

---

### For Admin Users (Instructors)

#### 1. Access Admin Panel
- Log in with admin account (admin@learnai.com / admin123)
- Click "Admin Panel" button in top-right
- You'll see the course management interface

#### 2. Add a New Course

**Step 1: Basic Information**
- Click "+ Add New Course"
- Fill in course title
- Enter course description (what students will learn)
- Set total duration (e.g., "40 hours")
- Select difficulty level

**Step 2: Add YouTube Video**
- Get the embed URL from YouTube:
  1. Go to any YouTube video
  2. Click "Share" button
  3. Click "Embed" tab
  4. Copy the URL from the src attribute
  5. Example format: `https://www.youtube.com/embed/dQw4w9WgXcQ`
- Paste the URL in the "YouTube Video URL" field

**Step 3: Add Course Modules**
- Each module represents a learning unit
- For each module, add:
  - **Module Title**: Topic name (e.g., "Variables and Data Types")
  - **Duration**: How long to complete (e.g., "2h")
- Click "+ Add Module" to add more modules
- You can have as many modules as needed

**Step 4: Create Course**
- Click "Create Course"
- Success message appears
- Course is immediately available to all students
- Form resets for adding another course

#### 3. Example: Adding a JavaScript Course

```
Title: JavaScript Advanced Concepts
Description: Master advanced JavaScript patterns, async programming, and modern ES6+ features for building scalable web applications

Duration: 35 hours

Level: Intermediate

YouTube URL: https://www.youtube.com/embed/[video-id]

Modules:
1. Advanced Functions & Closures (3h)
2. Async/Await & Promises (4h)
3. Design Patterns (5h)
4. Event Loop & Performance (4h)
5. Modern JavaScript Tools (3h)
```

#### 4. Update Course Information
Currently, courses are created once. To update future:
1. Edit `server.js` to add PUT/PATCH endpoints
2. Add edit functionality to AdminCourses.tsx
3. Implement database update operations

---

## 🤖 AI Features Deep Dive

### How AI Tutor Works

**Technology**: Google Gemini 2.5 Pro API

**What Happens**:
1. Student asks a question about the course
2. Request sent to backend with question and course context
3. Gemini API receives:
   - System prompt with course name and modules
   - Student's question
4. AI generates contextual response based on course content
5. Response displayed in chat interface

**Example Interactions**:

*Question*: "What is the difference between stack and heap memory?"
*Response*: (Detailed explanation with code examples)

*Question*: "Can you explain recursion?"
*Response*: (Concept explanation, examples, and common mistakes)

### How Quiz Generation Works

**Technology**: Google Gemini 2.5 Pro API with structured output

**What Happens**:
1. Admin/Student selects a topic and difficulty level
2. Request sent to backend with topic details
3. Gemini generates 5 multiple-choice questions
4. Questions returned in JSON format with:
   - Question text
   - 4 options (A, B, C, D)
   - Correct answer
   - Explanation of why it's correct
5. Student answers all questions
6. System calculates score and shows results

**Example Topics**:
- Python: "Functions", "OOP Basics"
- C++: "Pointers & Memory", "STL Libraries"
- Java: "Collections Framework", "Exception Handling"
- OS: "Process Management", "Memory Management"

### How Study Notes Generation Works

**Technology**: Google Gemini 2.5 Pro API

**What Happens**:
1. Student selects a topic
2. Request sent to backend
3. Gemini generates comprehensive notes including:
   - Overview and key concepts
   - Detailed explanations
   - Code examples (where applicable)
   - Common mistakes to avoid
   - Summary and key takeaways
4. Notes displayed in readable format
5. Can be copied or printed

---

## 🔑 Authentication System

### How It Works

1. **Registration**:
   - User provides: email, password, name
   - Password hashed using bcryptjs (10 rounds)
   - User stored in database
   - JWT token created and returned

2. **Login**:
   - User provides: email, password
   - Password compared with stored hash
   - If valid, JWT token created
   - Token stored in localStorage

3. **Protected Routes**:
   - Token required to access dashboard, courses, admin panel
   - Invalid/missing token redirects to login
   - Token sent with every API request in Authorization header

4. **Logout**:
   - Token removed from localStorage
   - User redirected to home page

### Default Credentials

```
Email: admin@learnai.com
Password: admin123
```

Change these in production!

---

## 📊 Database Structure (In-Memory)

Currently uses in-memory arrays. Structure:

```javascript
// Users
{
  id: string,
  email: string,
  name: string,
  password: string (hashed),
  isAdmin: boolean,
  enrolledCourses: string[]
}

// Courses
{
  id: string,
  title: string,
  description: string,
  instructor: string,
  youtubeUrl: string,
  level: 'Beginner' | 'Intermediate' | 'Advanced',
  duration: string,
  thumbnail: string,
  modules: [
    {
      id: string,
      title: string,
      duration: string
    }
  ]
}

// Enrollments
{
  id: string,
  userId: string,
  courseId: string,
  enrolledAt: Date,
  progress: number
}
```

---

## 🔧 API Endpoints Reference

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response: { token, user }
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { token, user }
```

### Courses

#### Get All Courses
```http
GET /api/courses

Response: [{ id, title, description, ... }, ...]
```

#### Get Course Details
```http
GET /api/courses/:id

Response: { id, title, description, modules, ... }
```

### Enrollments

#### Enroll in Course
```http
POST /api/enrollments
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "1"
}

Response: { message, enrollment }
```

#### Get User's Enrollments
```http
GET /api/enrollments
Authorization: Bearer <token>

Response: [{ course with enrollment data }, ...]
```

### AI Features

#### Chat with AI Tutor
```http
POST /api/ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Explain variables in Python",
  "courseId": "1"
}

Response: { answer: "..." }
```

#### Generate Quiz
```http
POST /api/ai/quiz
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "1",
  "topic": "Functions",
  "level": "Beginner"
}

Response: { quiz: [{ question, options, correctAnswer, explanation }, ...] }
```

#### Generate Study Notes
```http
POST /api/ai/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "1",
  "topic": "Variables and Data Types"
}

Response: { notes: "..." }
```

### Admin

#### Add New Course
```http
POST /api/admin/courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Course",
  "description": "Description",
  "youtubeUrl": "https://...",
  "level": "Beginner",
  "duration": "40 hours",
  "modules": [
    { "id": "1", "title": "Module 1", "duration": "3h" }
  ]
}

Response: { id, title, description, ... }
```

---

## 🐛 Common Issues & Solutions

### Issue: "Failed to load courses"
**Solution**:
- Ensure backend server is running: `npm run server`
- Check if port 5000 is available: `netstat -tuln | grep 5000`
- Check browser console for detailed error

### Issue: "API Error" on AI features
**Solution**:
- Verify Gemini API key in .env
- Check API quota at https://aistudio.google.com/apikey
- Ensure internet connection is stable
- Wait a moment and try again (rate limiting)

### Issue: "Invalid token" or keeps redirecting to login
**Solution**:
- Clear browser localStorage: Open DevTools → Application → Local Storage → Clear All
- Log out and log in again
- Check if JWT_SECRET matches in server.js

### Issue: Can't enroll in courses
**Solution**:
- Make sure you're logged in
- Refresh the page to reload enrollment data
- Try a different course
- Check backend logs for errors

### Issue: YouTube video not embedding
**Solution**:
- Verify you're using the embed URL format:
  - ✅ Correct: `https://www.youtube.com/embed/dQw4w9WgXcQ`
  - ❌ Wrong: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Get correct URL:
  1. Go to YouTube video
  2. Click "Share"
  3. Click "Embed"
  4. Copy src value from the iframe code

---

## 🚀 Production Deployment Checklist

### Before Deploying:

- [ ] Change default admin password
- [ ] Update JWT_SECRET to a random strong key
- [ ] Set up MongoDB or other persistent database
- [ ] Enable HTTPS
- [ ] Set up environment variables in production
- [ ] Configure CORS for production domain
- [ ] Set NODE_ENV=production
- [ ] Enable error logging/monitoring
- [ ] Set up automated backups
- [ ] Test all features in production environment
- [ ] Set up rate limiting on API
- [ ] Configure API key rotation for Gemini API

### Deployment Platforms:

**Backend** (Node.js/Express):
- Heroku, Railway, AWS EC2, DigitalOcean, Azure

**Frontend** (React/Vite):
- Vercel, Netlify, AWS S3 + CloudFront, Firebase Hosting

**Database**:
- MongoDB Atlas, AWS RDS, Firebase Firestore

---

## 📚 Learning Resources

### For Understanding the Code:
- React Router: https://reactrouter.com
- Zustand State Management: https://github.com/pmndrs/zustand
- Tailwind CSS: https://tailwindcss.com
- Google Gemini API: https://ai.google.dev

### For Improving the Platform:
- Add MongoDB integration
- Implement user progress tracking
- Add payment processing
- Create mobile app
- Add real-time features (WebSocket)
- Implement search and filtering
- Add analytics dashboard

---

## 🎓 Next Steps

1. **Start Using**: Log in and explore the platform
2. **Add Courses**: Use admin panel to add your own courses
3. **Customize**: Modify colors and branding in Tailwind CSS
4. **Integrate Database**: Replace in-memory storage with MongoDB
5. **Deploy**: Push to production using your preferred platform

---

## ✅ Final Verification Checklist

After setup, verify:

- [ ] Both frontend and backend are running
- [ ] Can access http://localhost:5173
- [ ] Can log in with admin@learnai.com / admin123
- [ ] Can see 4 pre-loaded courses
- [ ] Can enroll in a course
- [ ] Can watch embedded YouTube video
- [ ] Can chat with AI tutor
- [ ] Can generate a quiz
- [ ] Can generate study notes
- [ ] Can access admin panel and add a course
- [ ] Can log out successfully

If all checks pass, your LearnAI platform is ready to use! 🎉

---

**Need help? Check the README.md or SETUP_GUIDE.md (this file) for detailed information.**

Built with ❤️ using LearnAI Platform
