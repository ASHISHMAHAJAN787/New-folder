import type { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'python',
    title: 'Python Programming',
    description: 'Master Python from basics to advanced. Learn syntax, OOP, data structures, and build real projects.',
    category: 'Programming',
    level: 'Beginner',
    thumbnail: '🐍',
    color: 'from-yellow-400 to-blue-500',
    instructor: 'freeCodeCamp',
    lessons: [
      { id: 'py-1', title: 'Python Full Course for Beginners', description: 'Complete Python tutorial from scratch.', youtubeId: 'rfscVS0vtbw', duration: '4h 26m' },
      { id: 'py-2', title: 'Python OOP Tutorial', description: 'Object-oriented programming concepts.', youtubeId: 'JeznW_7DlB0', duration: '1h 15m' },
      { id: 'py-3', title: 'Python Data Structures', description: 'Lists, dicts, sets, tuples, and more.', youtubeId: 'R-HLU9Fl5ug', duration: '1h 45m' },
    ],
  },
  {
    id: 'cpp',
    title: 'C++ Programming',
    description: 'Learn modern C++. From fundamentals to STL, pointers, templates, and competitive programming.',
    category: 'Programming',
    level: 'Intermediate',
    thumbnail: '⚡',
    color: 'from-blue-600 to-indigo-700',
    instructor: 'freeCodeCamp',
    lessons: [
      { id: 'cpp-1', title: 'C++ Tutorial for Beginners', description: 'Full course covering basics to advanced.', youtubeId: 'vLnPwxZdW4Y', duration: '4h 1m' },
      { id: 'cpp-2', title: 'C++ STL Tutorial', description: 'Standard Template Library deep dive.', youtubeId: 'LyGlTmaWEPs', duration: '2h 30m' },
      { id: 'cpp-3', title: 'C++ Pointers & Memory', description: 'Master pointers and memory management.', youtubeId: 'zuegQmMdy8M', duration: '55m' },
    ],
  },
  {
    id: 'java',
    title: 'Java Programming',
    description: 'Complete Java course. Learn syntax, OOP, collections, multithreading, and Spring Boot.',
    category: 'Programming',
    level: 'Beginner',
    thumbnail: '☕',
    color: 'from-orange-500 to-red-600',
    instructor: 'freeCodeCamp',
    lessons: [
      { id: 'java-1', title: 'Java Programming Full Course', description: 'Java basics to advanced concepts.', youtubeId: 'A74TOX803D0', duration: '12h' },
      { id: 'java-2', title: 'Java OOP Tutorial', description: 'Object oriented programming in Java.', youtubeId: 'pTB0EiLXUC8', duration: '1h 30m' },
      { id: 'java-3', title: 'Java Collections Framework', description: 'Lists, Sets, Maps, and more.', youtubeId: 'GdAon80-0KA', duration: '2h' },
    ],
  },
  {
    id: 'os',
    title: 'Operating Systems',
    description: 'Understand processes, threads, scheduling, memory management, file systems, and concurrency.',
    category: 'Computer Science',
    level: 'Intermediate',
    thumbnail: '💻',
    color: 'from-gray-700 to-gray-900',
    instructor: 'Neso Academy',
    lessons: [
      { id: 'os-1', title: 'Operating System Full Course', description: 'Complete OS course for university students.', youtubeId: 'vBURTt97EkA', duration: '11h' },
      { id: 'os-2', title: 'Process Scheduling Algorithms', description: 'FCFS, SJF, Round Robin, Priority.', youtubeId: 'EWkQl0n0w5M', duration: '1h 20m' },
      { id: 'os-3', title: 'Memory Management', description: 'Paging, segmentation, virtual memory.', youtubeId: 'qdkxXygc3rE', duration: '1h 45m' },
    ],
  },
  {
    id: 'webdev',
    title: 'Web Development',
    description: 'Full-stack web development. HTML, CSS, JavaScript, React, Node.js, and databases.',
    category: 'Web',
    level: 'Beginner',
    thumbnail: '🌐',
    color: 'from-pink-500 to-purple-600',
    instructor: 'freeCodeCamp',
    lessons: [
      { id: 'web-1', title: 'HTML & CSS Full Course', description: 'Build beautiful websites.', youtubeId: 'mU6anWqZJcc', duration: '6h 30m' },
      { id: 'web-2', title: 'JavaScript Full Course', description: 'Modern JS from scratch.', youtubeId: 'PkZNo7MFNFg', duration: '3h 26m' },
      { id: 'web-3', title: 'React Full Course', description: 'Build modern UIs with React.', youtubeId: 'bMknfKXIFA8', duration: '11h 55m' },
    ],
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Master DSA for interviews. Arrays, trees, graphs, dynamic programming, and problem-solving.',
    category: 'Computer Science',
    level: 'Advanced',
    thumbnail: '🧮',
    color: 'from-emerald-500 to-teal-600',
    instructor: 'freeCodeCamp',
    lessons: [
      { id: 'dsa-1', title: 'Data Structures Easy to Advanced', description: 'Full DSA course with implementations.', youtubeId: 'RBSGKlAvoiM', duration: '8h' },
      { id: 'dsa-2', title: 'Algorithms in Python', description: 'Sorting, searching, DP, greedy.', youtubeId: '8hly31xKli0', duration: '5h 22m' },
      { id: 'dsa-3', title: 'Graph Algorithms', description: 'BFS, DFS, Dijkstra, MST.', youtubeId: '09_LlHjoEiY', duration: '2h 15m' },
    ],
  },
  {
    id: 'dbms',
    title: 'Database Management',
    description: 'Learn SQL, normalization, transactions, indexing, and NoSQL databases like MongoDB.',
    category: 'Computer Science',
    level: 'Intermediate',
    thumbnail: '🗄️',
    color: 'from-cyan-500 to-blue-600',
    instructor: 'freeCodeCamp',
    lessons: [
      { id: 'db-1', title: 'SQL Tutorial Full Course', description: 'Complete SQL for beginners.', youtubeId: 'HXV3zeQKqGY', duration: '4h 20m' },
      { id: 'db-2', title: 'MongoDB Crash Course', description: 'NoSQL database fundamentals.', youtubeId: 'ofme2o29ngU', duration: '1h 9m' },
      { id: 'db-3', title: 'Database Design Course', description: 'ER diagrams, normalization.', youtubeId: 'ztHopE5Wnpc', duration: '8h 38m' },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Introduction to ML. Supervised, unsupervised learning, neural networks, and Python libraries.',
    category: 'AI/ML',
    level: 'Advanced',
    thumbnail: '🤖',
    color: 'from-violet-500 to-fuchsia-600',
    instructor: 'freeCodeCamp',
    lessons: [
      { id: 'ml-1', title: 'Machine Learning Full Course', description: 'ML from scratch with Python.', youtubeId: 'NWONeJKn6kc', duration: '10h' },
      { id: 'ml-2', title: 'Deep Learning with TensorFlow', description: 'Neural networks and CNNs.', youtubeId: 'tPYj3fFJGjk', duration: '6h 52m' },
      { id: 'ml-3', title: 'Scikit-learn Tutorial', description: 'Classic ML algorithms in Python.', youtubeId: 'pqNCD_5r0IU', duration: '1h 30m' },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  // Check custom courses from localStorage first
  const custom = JSON.parse(localStorage.getItem('learnai_custom_courses') || '[]') as Course[];
  return [...COURSES, ...custom].find((c) => c.id === id);
}

export function getAllCourses(): Course[] {
  const custom = JSON.parse(localStorage.getItem('learnai_custom_courses') || '[]') as Course[];
  return [...COURSES, ...custom];
}

export function addCustomCourse(course: Course) {
  const custom = JSON.parse(localStorage.getItem('learnai_custom_courses') || '[]') as Course[];
  custom.push(course);
  localStorage.setItem('learnai_custom_courses', JSON.stringify(custom));
}

export function deleteCustomCourse(id: string) {
  const custom = JSON.parse(localStorage.getItem('learnai_custom_courses') || '[]') as Course[];
  localStorage.setItem('learnai_custom_courses', JSON.stringify(custom.filter((c) => c.id !== id)));
}
