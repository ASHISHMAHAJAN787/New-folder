import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { addCustomCourse, deleteCustomCourse, getAllCourses } from '../data/courses';
import { setGeminiKey, getGeminiKey } from '../utils/db';
import type { Course, Lesson } from '../types';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const COLORS = [
  'from-pink-500 to-purple-600',
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-yellow-400 to-orange-500',
  'from-cyan-500 to-blue-600',
];

function extractYouTubeId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return url.trim(); // assume already an id
}

export default function AdminCourses() {
  const user = useAuthStore((s) => s.user)!;
  const [courses, setCourses] = useState(getAllCourses());
  const [apiKey, setApiKey] = useState(getGeminiKey());

  // form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [thumbnail, setThumbnail] = useState('🎓');
  const [color, setColor] = useState(COLORS[0]);
  const [instructor, setInstructor] = useState('');
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: 'l1', title: '', description: '', youtubeId: '', duration: '' },
  ]);

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Admin only</h2>
          <p className="text-slate-600 mt-2">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const addLesson = () => {
    setLessons([...lessons, { id: 'l' + (lessons.length + 1), title: '', description: '', youtubeId: '', duration: '' }]);
  };
  const updateLesson = (i: number, field: keyof Lesson, val: string) => {
    setLessons((arr) => arr.map((l, idx) => (idx === i ? { ...l, [field]: field === 'youtubeId' ? extractYouTubeId(val) : val } : l)));
  };
  const removeLesson = (i: number) => setLessons((arr) => arr.filter((_, idx) => idx !== i));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || lessons.some((l) => !l.title || !l.youtubeId)) {
      toast.error('Please fill all required fields');
      return;
    }
    const newCourse: Course = {
      id: 'custom-' + Date.now(),
      title, description, category, level, thumbnail, color, instructor: instructor || 'Admin',
      lessons: lessons.map((l, i) => ({ ...l, id: `cl-${Date.now()}-${i}` })),
    };
    addCustomCourse(newCourse);
    setCourses(getAllCourses());
    setTitle(''); setDescription(''); setInstructor('');
    setLessons([{ id: 'l1', title: '', description: '', youtubeId: '', duration: '' }]);
    toast.success('Course added!');
  };

  const remove = (id: string) => {
    if (!confirm('Delete this course?')) return;
    deleteCustomCourse(id);
    setCourses(getAllCourses());
    toast.success('Course deleted');
  };

  const saveKey = () => {
    setGeminiKey(apiKey);
    toast.success('Gemini API key saved');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Panel</h1>
        <p className="text-slate-600 mb-8">Manage courses and AI settings.</p>

        {/* API Key Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Gemini API Key</h2>
          <p className="text-sm text-slate-600 mb-3">
            Used for AI tutor, quizzes, flashcards, and question paper generation.
            Get a key from <a href="https://aistudio.google.com/apikey" target="_blank" className="text-indigo-600 underline">Google AI Studio</a>.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
            />
            <button onClick={saveKey} className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
              Save
            </button>
          </div>
        </div>

        {/* Add course form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Add new course</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Instructor</label>
                <input value={instructor} onChange={(e) => setInstructor(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
                <select value={level} onChange={(e) => setLevel(e.target.value as any)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Emoji</label>
                <input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-2xl text-center" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
                <select value={color} onChange={(e) => setColor(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">Lessons (paste full YouTube URL)</label>
                <button type="button" onClick={addLesson} className="text-sm text-indigo-600 font-medium">+ Add lesson</button>
              </div>
              <div className="space-y-3">
                {lessons.map((l, i) => (
                  <div key={i} className="grid md:grid-cols-[1fr_2fr_1fr_auto] gap-2 items-start p-3 bg-slate-50 rounded-lg">
                    <input placeholder="Title" value={l.title} onChange={(e) => updateLesson(i, 'title', e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input placeholder="YouTube URL or ID" value={l.youtubeId} onChange={(e) => updateLesson(i, 'youtubeId', e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input placeholder="Duration" value={l.duration} onChange={(e) => updateLesson(i, 'duration', e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                    {lessons.length > 1 && (
                      <button type="button" onClick={() => removeLesson(i)} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">✕</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
              Create course
            </button>
          </form>
        </div>

        {/* Course list */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">All courses ({courses.length})</h2>
          <div className="space-y-2">
            {courses.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl`}>{c.thumbnail}</div>
                  <div>
                    <div className="font-semibold text-slate-900">{c.title}</div>
                    <div className="text-xs text-slate-500">{c.lessons.length} lessons · {c.category}</div>
                  </div>
                </div>
                {c.id.startsWith('custom-') && (
                  <button onClick={() => remove(c.id)} className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
