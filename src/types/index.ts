export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  youtubeId: string; // e.g. "rfscVS0vtbw"
  duration: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string; // emoji or url
  color: string; // tailwind gradient
  instructor: string;
  lessons: Lesson[];
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  courseId: string;
  topic: string;
  score: number;
  total: number;
  takenAt: string;
}
