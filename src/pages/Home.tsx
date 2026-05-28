import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar';

export default function Home() {
  const user = useAuthStore((s) => s.user);

  const features = [
    { icon: '🎓', title: 'Curated Courses', desc: 'Hand-picked courses on Python, C++, Java, OS, DSA, ML and more.' },
    { icon: '🤖', title: 'AI Tutor', desc: 'Chat with a Gemini-powered tutor that knows your course context.' },
    { icon: '📝', title: 'AI Quizzes', desc: 'Auto-generated quizzes with explanations to test your knowledge.' },
    { icon: '📄', title: 'Question Paper Maker', desc: 'Generate full exam papers on any topic in seconds.' },
    { icon: '🃏', title: 'Smart Flashcards', desc: 'AI creates flashcards to help you revise faster.' },
    { icon: '📺', title: 'In-app Video', desc: 'Watch curated YouTube lessons inside the platform — no distractions.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          Powered by Google Gemini 2.5
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
          Learn anything with your <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            personal AI tutor
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Watch curated video lessons, chat with an AI that explains concepts instantly,
          generate quizzes & question papers — all in one beautiful platform.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to={user ? '/dashboard' : '/register'}
            className="px-7 py-3.5 text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition"
          >
            {user ? 'Go to Dashboard' : 'Start learning free'}
          </Link>
          {!user && (
            <Link to="/login" className="px-7 py-3.5 font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition">
              Sign in
            </Link>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100 transition group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition origin-left">{f.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © 2026 LearnAI · Built with React, Tailwind & Gemini
      </footer>
    </div>
  );
}
