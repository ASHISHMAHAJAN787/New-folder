import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition">
            L
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            LearnAI
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition">Dashboard</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition">Admin</Link>
              )}
              <Link to="/question-paper" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition">Paper Generator</Link>
              <div className="ml-2 flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition">Sign in</Link>
              <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md shadow-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/40 transition">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
