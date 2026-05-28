# How to Add New Courses - Step by Step Guide

## 📹 Video Tutorial (Quick Start)
1. Login as admin: `admin@learnai.com` / `admin123`
2. Go to **Admin** page
3. Fill the form and click **Create Course**
4. Done! Course appears instantly

## 📝 Detailed Text Guide

### Step 1: Get YouTube Video URLs
Find educational videos on YouTube. You need **3 videos per course**.

**Good sources:**
- FreeCodeCamp (long tutorials)
- Traversy Media (web dev)
- Corey Schafer (Python)
- The Net Ninja (various)
- CS50 (Harvard)
- MIT OpenCourseWare

**Format examples:**
```
https://www.youtube.com/watch?v=VIDEO_ID
https://youtu.be/VIDEO_ID
```

### Step 2: Prepare Course Information

**Example Course:**
```yaml
Title: Python for Beginners
Description: Learn Python from scratch with hands-on examples
Category: Programming
Videos:
  1. https://youtu.be/rfscVS0vtbw (Python full course)
  2. https://youtu.be/_uQrJ0TkZlc (Python tutorial)
  3. https://youtu.be/kqtD5dpn9C8 (Python projects)
```

### Step 3: Add Course via Admin Panel

1. **Login** as admin
2. Click **Admin** in navbar
3. Fill the form:
   - **Course Title**: Python for Beginners
   - **Description**: Learn Python from scratch...
   - **Category**: Programming
   - **Video URLs** (one per line):
     ```
     https://youtu.be/rfscVS0vtbw
     https://youtu.be/_uQrJ0TkZlc
     https://youtu.be/kqtD5dpn9C8
     ```
4. Click **Create Course**

### Step 4: Verify Course Added
- Go to Dashboard
- See new course in list
- Click to open and test features

## 🎯 Course Categories

Use these categories for consistency:
- **Programming**: Python, JavaScript, Java, C++, etc.
- **Web Development**: HTML, CSS, React, Node.js
- **Data Science**: ML, AI, Statistics, Python
- **Computer Science**: Algorithms, OS, DBMS, Networks
- **Mathematics**: Calculus, Linear Algebra, Statistics
- **Business**: Marketing, Finance, Management
- **Languages**: English, Spanish, etc.
- **Other**: Any other topics

## 📚 Example Courses to Add

### 1. **Web Development Full Course**
```
Title: Full Stack Web Development
Description: Learn HTML, CSS, JavaScript, React, Node.js, MongoDB
Category: Web Development
Videos:
  https://youtu.be/3PHXvlpOkf4
  https://youtu.be/Oe421EPjeBE
  https://youtu.be/CvCiNeLnZ00
```

### 2. **Machine Learning Basics**
```
Title: Machine Learning for Beginners
Description: Introduction to ML concepts with Python
Category: Data Science
Videos:
  https://youtu.be/GwIo3gDZCVQ
  https://youtu.be/KNAWp2S3w94
  https://youtu.be/i_LwzRVP7bg
```

### 3. **Data Structures & Algorithms**
```
Title: DSA Masterclass
Description: Essential algorithms and data structures
Category: Computer Science
Videos:
  https://youtu.be/8hly31xKli0
  https://youtu.be/RBSGKlAvoiM
  https://youtu.be/zWg7U0OEAoE
```

## 🔧 Advanced: Edit Existing Courses

Currently, courses cannot be edited after creation. To modify:

1. **Delete and recreate** (loses user progress)
2. **Or edit localStorage directly** (advanced):

```javascript
// In browser console (F12)
let courses = JSON.parse(localStorage.getItem('ai-learning-courses') || '[]')
// Find and edit course
courses[0].title = "New Title"
localStorage.setItem('ai-learning-courses', JSON.stringify(courses))
location.reload()
```

## 🎨 Course Design Tips

### 1. **Video Selection**
- Choose videos under 2 hours (ideal: 30-60 min)
- Ensure good audio/video quality
- Prefer structured tutorials over random talks
- Include hands-on coding videos

### 2. **Course Structure**
- Start with basics
- Progress to intermediate
- End with projects/applications
- Each video should build on previous

### 3. **Description Writing**
- Be clear about prerequisites
- Mention what students will learn
- Include key topics covered
- Add motivational element

**Example good description:**
> "Learn Python programming from absolute beginner to building real applications. This course covers variables, functions, OOP, file handling, and web scraping. By the end, you'll build 3 practical projects."

## 📊 Managing Multiple Courses

### Organize by Difficulty
- **Beginner**: Basics, no prerequisites
- **Intermediate**: Some experience needed
- **Advanced**: For experienced learners

### Create Learning Paths
1. Python Basics → Web Dev → Django
2. HTML/CSS → JavaScript → React
3. Statistics → Python → Machine Learning

### Update Gemini API Key
If AI features stop working:
1. Get new key from https://aistudio.google.com/apikey
2. Go to Admin → Gemini API Key
3. Paste and Save

## 🚀 Bulk Add Courses

To add many courses quickly, use this script in browser console:

```javascript
// Add multiple courses at once
const newCourses = [
  {
    id: Date.now().toString(),
    title: "React Masterclass",
    description: "Learn React with modern practices",
    category: "Web Development",
    lessons: [
      { id: "1", title: "React Basics", videoUrl: "https://youtu.be/w7ejDZ8SWv8" },
      { id: "2", title: "Hooks & State", videoUrl: "https://youtu.be/9D1x7-2FmTA" },
      { id: "3", title: "Advanced Patterns", videoUrl: "https://youtu.be/F2JCjVSZlG0" }
    ],
    enrolledUsers: [],
    createdAt: new Date().toISOString()
  }
  // Add more courses here...
];

let existingCourses = JSON.parse(localStorage.getItem('ai-learning-courses') || '[]');
existingCourses.push(...newCourses);
localStorage.setItem('ai-learning-courses', JSON.stringify(existingCourses));
location.reload();
```

## ❓ FAQ

### Q: Can I add more than 3 videos per course?
A: Currently fixed at 3 videos. To change, edit the AdminCourses.tsx component.

### Q: What if a YouTube video gets deleted?
A: The video won't play. You'll need to delete and recreate the course with new URLs.

### Q: Can students add their own courses?
A: No, only admin can add courses. Regular users can only enroll.

### Q: How to delete a course?
A: Currently no UI. Use browser console:
```javascript
let courses = JSON.parse(localStorage.getItem('ai-learning-courses') || '[]');
courses = courses.filter(c => c.id !== "COURSE_ID_TO_DELETE");
localStorage.setItem('ai-learning-courses', JSON.stringify(courses));
location.reload();
```

### Q: Can I export/backup courses?
A: Export from localStorage:
```javascript
console.log(JSON.stringify(JSON.parse(localStorage.getItem('ai-learning-courses') || '[]'), null, 2));
```

## 🆘 Need Help?

1. **YouTube URL not working?**
   - Try different video
   - Check if video is publicly accessible
   - Test URL in browser first

2. **Course not appearing?**
   - Check browser console for errors
   - Refresh page
   - Clear localStorage and try again

3. **AI features not working with new course?**
   - Wait a minute after adding
   - Test with existing courses first
   - Check Gemini API key

**Remember:** All data is stored in your browser. If you clear browser data, courses will be lost unless you export them first.