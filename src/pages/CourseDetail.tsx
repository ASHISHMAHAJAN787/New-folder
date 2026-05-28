import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getCourseById } from '../data/courses';
import {
  enroll, isEnrolled, markLessonComplete, getProgress,
  getChatHistory, saveChatMessage, clearChatHistory,
  saveQuizResult,
} from '../utils/db';
import { chatWithTutor, generateQuiz, generateFlashcards, summarizeLesson } from '../utils/gemini';
import type { ChatMessage, QuizQuestion, Lesson } from '../types';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

type Tab = 'video' | 'tutor' | 'quiz' | 'flashcards' | 'notes';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((s) => s.user)!;
  const course = useMemo(() => (id ? getCourseById(id) : undefined), [id]);

  const [enrolled, setEnrolled] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [tab, setTab] = useState<Tab>('video');

  useEffect(() => {
    if (!course) return;
    setEnrolled(isEnrolled(user.id, course.id));
    setActiveLesson(course.lessons[0]);
    setCompleted(getProgress(user.id, course.id));
  }, [course, user.id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Course not found</h2>
          <Link to="/dashboard" className="mt-4 inline-block text-indigo-600 font-medium">← Back to dashboard</Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    enroll(user.id, course.id);
    setEnrolled(true);
    toast.success('Enrolled successfully!');
  };

  const handleLessonComplete = () => {
    if (!activeLesson) return;
    markLessonComplete(user.id, course.id, activeLesson.id);
    setCompleted(getProgress(user.id, course.id));
    toast.success('Lesson marked complete!');
  };

  const progressPct = Math.round((completed.length / course.lessons.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className={`bg-gradient-to-br ${course.color} text-white`}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Link to="/dashboard" className="text-white/80 hover:text-white text-sm font-medium">← Back</Link>
          <div className="mt-3 flex items-start gap-5">
            <div className="text-6xl">{course.thumbnail}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded">{course.category}</span>
                <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded">{course.level}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
              <p className="mt-2 text-white/90 max-w-2xl">{course.description}</p>
              <p className="mt-2 text-white/80 text-sm">By {course.instructor} · {course.lessons.length} lessons</p>
            </div>
            {!enrolled ? (
              <button onClick={handleEnroll} className="px-6 py-2.5 bg-white text-slate-900 font-semibold rounded-lg shadow-lg hover:scale-105 transition">
                Enroll Free
              </button>
            ) : (
              <div className="text-right">
                <div className="text-sm text-white/80">Progress</div>
                <div className="text-2xl font-bold">{progressPct}%</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!enrolled ? (
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-slate-600">Enroll in this course to access lessons, AI tutor, quizzes and more.</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Sidebar - lessons */}
          <aside className="bg-white rounded-2xl border border-slate-200 p-4 h-fit lg:sticky lg:top-20">
            <h3 className="font-bold text-slate-900 px-2 mb-3">Lessons</h3>
            <div className="space-y-1">
              {course.lessons.map((l, idx) => {
                const done = completed.includes(l.id);
                const active = activeLesson?.id === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => { setActiveLesson(l); setTab('video'); }}
                    className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition ${
                      active ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      done ? 'bg-emerald-500 text-white' : active ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {done ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-900 truncate">{l.title}</div>
                      <div className="text-xs text-slate-500">{l.duration}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Main panel */}
          <main className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="border-b border-slate-200 flex overflow-x-auto">
              {([
                { k: 'video', label: '📺 Video' },
                { k: 'tutor', label: '🤖 AI Tutor' },
                { k: 'quiz', label: '📝 Quiz' },
                { k: 'flashcards', label: '🃏 Flashcards' },
                { k: 'notes', label: '📒 AI Notes' },
              ] as { k: Tab; label: string }[]).map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition border-b-2 ${
                    tab === t.k ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeLesson && tab === 'video' && (
                <VideoPanel lesson={activeLesson} onComplete={handleLessonComplete} done={completed.includes(activeLesson.id)} />
              )}
              {activeLesson && tab === 'tutor' && (
                <TutorPanel courseId={course.id} courseTitle={course.title} userId={user.id} />
              )}
              {activeLesson && tab === 'quiz' && (
                <QuizPanel courseTitle={course.title} courseId={course.id} userId={user.id} defaultTopic={activeLesson.title} />
              )}
              {activeLesson && tab === 'flashcards' && (
                <FlashcardsPanel defaultTopic={activeLesson.title} />
              )}
              {activeLesson && tab === 'notes' && (
                <NotesPanel lessonTitle={activeLesson.title} courseName={course.title} />
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

/* ---------------- Video Panel ---------------- */
function VideoPanel({ lesson, onComplete, done }: { lesson: Lesson; onComplete: () => void; done: boolean }) {
  return (
    <div>
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black mb-4">
        <iframe
          key={lesson.youtubeId}
          src={`https://www.youtube.com/embed/${lesson.youtubeId}?rel=0`}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{lesson.title}</h2>
          <p className="text-slate-600 mt-1">{lesson.description}</p>
          <p className="text-sm text-slate-500 mt-1">⏱️ {lesson.duration}</p>
        </div>
        <button
          onClick={onComplete}
          disabled={done}
          className={`px-5 py-2.5 rounded-lg font-semibold whitespace-nowrap transition ${
            done ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {done ? '✓ Completed' : 'Mark complete'}
        </button>
      </div>
    </div>
  );
}

/* ---------------- AI Tutor Panel ---------------- */
function TutorPanel({ courseId, courseTitle, userId }: { courseId: string; courseTitle: string; userId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages(getChatHistory(userId, courseId));
  }, [userId, courseId]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { id: 'u-' + Date.now(), role: 'user', content: input, timestamp: new Date().toISOString() };
    saveChatMessage(userId, courseId, userMsg);
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const reply = await chatWithTutor(courseTitle, messages.map((m) => ({ role: m.role, content: m.content })), userMsg.content);
      const aiMsg: ChatMessage = { id: 'a-' + Date.now(), role: 'assistant', content: reply, timestamp: new Date().toISOString() };
      saveChatMessage(userId, courseId, aiMsg);
      setMessages((m) => [...m, aiMsg]);
    } catch (err: any) {
      toast.error(err.message || 'Tutor failed');
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    clearChatHistory(userId, courseId);
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[60vh]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-900">Ask your AI Tutor</h2>
        {messages.length > 0 && (
          <button onClick={clear} className="text-xs text-slate-500 hover:text-red-600">Clear chat</button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
        {messages.length === 0 && (
          <div className="text-center text-slate-500 mt-12 text-sm">
            👋 Ask me anything about <strong>{courseTitle}</strong>!<br />
            <span className="text-xs">e.g. "Explain recursion with an example"</span>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
              m.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-sm text-slate-500">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask anything..."
          className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
        <button onClick={send} disabled={loading || !input.trim()} className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg disabled:opacity-50 hover:bg-indigo-700">
          Send
        </button>
      </div>
    </div>
  );
}

/* ---------------- Quiz Panel ---------------- */
function QuizPanel({ courseTitle, courseId, userId, defaultTopic }: { courseTitle: string; courseId: string; userId: string; defaultTopic: string }) {
  const [topic, setTopic] = useState(defaultTopic);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setSubmitted(false);
    try {
      const qs = await generateQuiz(courseTitle, topic, 5);
      setQuestions(qs);
      setAnswers(new Array(qs.length).fill(-1));
    } catch (err: any) {
      toast.error('Failed to generate quiz: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const submit = () => {
    setSubmitted(true);
    const score = questions.reduce((s, q, i) => s + (answers[i] === q.correctIndex ? 1 : 0), 0);
    saveQuizResult({
      id: 'q-' + Date.now(), userId, courseId, topic, score, total: questions.length, takenAt: new Date().toISOString(),
    });
    toast.success(`Score: ${score}/${questions.length}`);
  };

  const score = submitted ? questions.reduce((s, q, i) => s + (answers[i] === q.correctIndex ? 1 : 0), 0) : 0;

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900 mb-3">AI-Generated Quiz</h2>
      <div className="flex gap-2 mb-5">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Quiz topic"
          className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button onClick={generate} disabled={loading} className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg disabled:opacity-50 hover:bg-indigo-700">
          {loading ? 'Generating…' : questions.length ? 'Regenerate' : 'Generate Quiz'}
        </button>
      </div>

      {questions.length > 0 && (
        <div className="space-y-5">
          {questions.map((q, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-5">
              <p className="font-semibold text-slate-900 mb-3">{i + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const selected = answers[i] === oi;
                  const correct = submitted && oi === q.correctIndex;
                  const wrong = submitted && selected && oi !== q.correctIndex;
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => setAnswers((a) => a.map((v, idx) => (idx === i ? oi : v)))}
                      className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition ${
                        correct ? 'bg-emerald-50 border-emerald-400 text-emerald-800' :
                        wrong ? 'bg-red-50 border-red-400 text-red-800' :
                        selected ? 'bg-indigo-50 border-indigo-400 text-indigo-800' :
                        'border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {String.fromCharCode(65 + oi)}. {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className="mt-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
                  💡 {q.explanation}
                </p>
              )}
            </div>
          ))}
          {!submitted ? (
            <button onClick={submit} disabled={answers.includes(-1)} className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg disabled:opacity-50 hover:bg-emerald-700">
              Submit Quiz
            </button>
          ) : (
            <div className="text-center py-5 bg-indigo-50 rounded-xl">
              <div className="text-4xl font-bold text-indigo-600">{score}/{questions.length}</div>
              <div className="text-sm text-slate-600 mt-1">Score</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Flashcards Panel ---------------- */
function FlashcardsPanel({ defaultTopic }: { defaultTopic: string }) {
  const [topic, setTopic] = useState(defaultTopic);
  const [cards, setCards] = useState<{ front: string; back: string }[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const c = await generateFlashcards(topic, 8);
      setCards(c);
      setIdx(0);
      setFlipped(false);
    } catch (err: any) {
      toast.error('Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900 mb-3">AI Flashcards</h2>
      <div className="flex gap-2 mb-5">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button onClick={generate} disabled={loading} className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg disabled:opacity-50 hover:bg-indigo-700">
          {loading ? 'Generating…' : 'Generate'}
        </button>
      </div>
      {cards.length > 0 && (
        <div>
          <div
            onClick={() => setFlipped((f) => !f)}
            className="cursor-pointer mx-auto max-w-xl h-64 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-8 flex items-center justify-center text-center text-xl font-medium shadow-xl select-none hover:scale-[1.02] transition"
          >
            {flipped ? cards[idx].back : cards[idx].front}
          </div>
          <p className="text-center text-xs text-slate-500 mt-2">Click card to flip</p>
          <div className="flex items-center justify-between mt-5 max-w-xl mx-auto">
            <button onClick={() => { setIdx(Math.max(0, idx - 1)); setFlipped(false); }} disabled={idx === 0} className="px-4 py-2 bg-slate-200 rounded-lg disabled:opacity-50">← Prev</button>
            <span className="text-sm text-slate-600">{idx + 1} / {cards.length}</span>
            <button onClick={() => { setIdx(Math.min(cards.length - 1, idx + 1)); setFlipped(false); }} disabled={idx === cards.length - 1} className="px-4 py-2 bg-slate-200 rounded-lg disabled:opacity-50">Next →</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Notes Panel ---------------- */
function NotesPanel({ lessonTitle, courseName }: { lessonTitle: string; courseName: string }) {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const n = await summarizeLesson(lessonTitle, courseName);
      setNotes(n);
    } catch (err: any) {
      toast.error('Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">AI Study Notes</h2>
        <button onClick={generate} disabled={loading} className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg disabled:opacity-50 hover:bg-indigo-700">
          {loading ? 'Generating…' : notes ? 'Regenerate' : 'Generate Notes'}
        </button>
      </div>
      {notes ? (
        <div className="prose prose-sm max-w-none bg-slate-50 p-6 rounded-xl border border-slate-200 whitespace-pre-wrap text-slate-800">
          {notes}
        </div>
      ) : (
        <p className="text-center text-slate-500 py-12">Click "Generate Notes" to create AI study notes for this lesson.</p>
      )}
    </div>
  );
}
