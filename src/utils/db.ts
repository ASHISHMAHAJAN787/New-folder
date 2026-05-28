// LocalStorage-based "database" for users, enrollments, progress, chat history
import type { User, Enrollment, ChatMessage, QuizResult } from '../types';

const KEYS = {
  USERS: 'learnai_users',
  CURRENT_USER: 'learnai_current_user',
  ENROLLMENTS: 'learnai_enrollments',
  CHAT_HISTORY: 'learnai_chat_history',
  QUIZ_RESULTS: 'learnai_quiz_results',
  PROGRESS: 'learnai_progress',
  GEMINI_KEY: 'learnai_gemini_key',
};

const ENV_GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------------- Gemini key ----------------
export function getGeminiKey(): string {
  return localStorage.getItem(KEYS.GEMINI_KEY) || ENV_GEMINI_KEY;
}
export function setGeminiKey(key: string) {
  localStorage.setItem(KEYS.GEMINI_KEY, key);
}

// ---------------- Users / Auth ----------------
type StoredUser = User & { password: string };

function hash(s: string): string {
  // simple non-cryptographic hash for demo
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return String(h);
}

export function seedAdmin() {
  const users = read<StoredUser[]>(KEYS.USERS, []);
  if (!users.find((u) => u.email === 'admin@learnai.com')) {
    users.push({
      id: 'admin-1',
      email: 'admin@learnai.com',
      name: 'Admin',
      role: 'admin',
      password: hash('admin123'),
      createdAt: new Date().toISOString(),
    });
    write(KEYS.USERS, users);
  }
}

export function registerUser(email: string, password: string, name: string): User {
  const users = read<StoredUser[]>(KEYS.USERS, []);
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Email already registered');
  }
  const newUser: StoredUser = {
    id: 'user-' + Date.now(),
    email,
    name,
    role: 'student',
    password: hash(password),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  write(KEYS.USERS, users);
  const { password: _p, ...safe } = newUser;
  write(KEYS.CURRENT_USER, safe);
  return safe;
}

export function loginUser(email: string, password: string): User {
  const users = read<StoredUser[]>(KEYS.USERS, []);
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error('No account found with this email');
  if (user.password !== hash(password)) throw new Error('Incorrect password');
  const { password: _p, ...safe } = user;
  write(KEYS.CURRENT_USER, safe);
  return safe;
}

export function logoutUser() {
  localStorage.removeItem(KEYS.CURRENT_USER);
}

export function getCurrentUser(): User | null {
  return read<User | null>(KEYS.CURRENT_USER, null);
}

// ---------------- Enrollments ----------------
export function getEnrollments(userId: string): Enrollment[] {
  const all = read<Enrollment[]>(KEYS.ENROLLMENTS, []);
  return all.filter((e) => e.userId === userId);
}
export function isEnrolled(userId: string, courseId: string): boolean {
  return getEnrollments(userId).some((e) => e.courseId === courseId);
}
export function enroll(userId: string, courseId: string) {
  const all = read<Enrollment[]>(KEYS.ENROLLMENTS, []);
  if (!all.find((e) => e.userId === userId && e.courseId === courseId)) {
    all.push({
      id: 'enr-' + Date.now(),
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
    });
    write(KEYS.ENROLLMENTS, all);
  }
}

// ---------------- Lesson progress ----------------
export function getProgress(userId: string, courseId: string): string[] {
  const all = read<Record<string, string[]>>(KEYS.PROGRESS, {});
  return all[`${userId}:${courseId}`] || [];
}
export function markLessonComplete(userId: string, courseId: string, lessonId: string) {
  const all = read<Record<string, string[]>>(KEYS.PROGRESS, {});
  const key = `${userId}:${courseId}`;
  const list = all[key] || [];
  if (!list.includes(lessonId)) list.push(lessonId);
  all[key] = list;
  write(KEYS.PROGRESS, all);
}

// ---------------- Chat history ----------------
export function getChatHistory(userId: string, courseId: string): ChatMessage[] {
  const all = read<Record<string, ChatMessage[]>>(KEYS.CHAT_HISTORY, {});
  return all[`${userId}:${courseId}`] || [];
}
export function saveChatMessage(userId: string, courseId: string, msg: ChatMessage) {
  const all = read<Record<string, ChatMessage[]>>(KEYS.CHAT_HISTORY, {});
  const key = `${userId}:${courseId}`;
  all[key] = [...(all[key] || []), msg];
  write(KEYS.CHAT_HISTORY, all);
}
export function clearChatHistory(userId: string, courseId: string) {
  const all = read<Record<string, ChatMessage[]>>(KEYS.CHAT_HISTORY, {});
  delete all[`${userId}:${courseId}`];
  write(KEYS.CHAT_HISTORY, all);
}

// ---------------- Quiz results ----------------
export function saveQuizResult(result: QuizResult) {
  const all = read<QuizResult[]>(KEYS.QUIZ_RESULTS, []);
  all.push(result);
  write(KEYS.QUIZ_RESULTS, all);
}
export function getQuizResults(userId: string): QuizResult[] {
  const all = read<QuizResult[]>(KEYS.QUIZ_RESULTS, []);
  return all.filter((r) => r.userId === userId);
}
