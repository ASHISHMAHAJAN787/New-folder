import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getAllCourses } from '../data/courses';
import { getEnrollments } from '../utils/db';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const user = useAuthStore((s) => s.user)!;
  const [filter, setFilter] = useState<string>('All');
  const courses = getAllCourses();
  const enrollments = getEnrollments(user.id);
  const enrolledIds = new Set(enrollments.map((e) => e.courseId));

  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];
  const filtered = filter === 'All' ? courses : courses.filter((c) => c.category === filter);
  const myCourses = courses.filter((c) => enrolledIds.has(c.id));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Welcome back, {user.name} 👋</h1>
          <p className="text-slate-600 mt-2">Pick up where you left off or start something new.</p>
        </div>

        {myCourses.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Continue learning</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myCourses.map((c) => (
                <CourseCard key={c.id} course={c} enrolled />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-slate-900">All courses</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition ${
                    filter === cat
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} enrolled={enrolledIds.has(c.id)} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CourseCard({ course, enrolled }: { course: any; enrolled: boolean }) {
  return (
    <Link
      to={`/course/${course.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition"
    >
      <div className={`h-32 bg-gradient-to-br ${course.color} flex items-center justify-center text-6xl relative`}>
        {course.thumbnail}
        {enrolled && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold bg-white/90 text-indigo-700 rounded-full backdrop-blur">
            Enrolled
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{course.category}</span>
          <span className="text-xs text-slate-500">{course.level}</span>
        </div>
        <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition">{course.title}</h3>
        <p className="text-sm text-slate-600 mt-1.5 line-clamp-2">{course.description}</p>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>📚 {course.lessons.length} lessons</span>
          <span className="text-indigo-600 font-medium group-hover:translate-x-1 transition">Open →</span>
        </div>
      </div>
    </Link>
  );
}
