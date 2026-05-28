import { useState } from 'react';
import { generateQuestionPaper } from '../utils/gemini';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

export default function QuestionPaper() {
  const [subject, setSubject] = useState('Python Programming');
  const [topics, setTopics] = useState('Loops, Functions, OOP, File Handling');
  const [difficulty, setDifficulty] = useState('Medium');
  const [numQuestions, setNumQuestions] = useState(10);
  const [paper, setPaper] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const result = await generateQuestionPaper(subject, topics, difficulty, numQuestions);
      setPaper(result);
    } catch (err: any) {
      toast.error('Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const printPaper = () => window.print();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Question Paper Generator</h1>
        <p className="text-slate-600 mb-8">Generate a complete examination paper on any topic in seconds.</p>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 print:hidden">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Topics (comma separated)</label>
              <textarea value={topics} onChange={(e) => setTopics(e.target.value)} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Number of questions</label>
              <input type="number" min={5} max={30} value={numQuestions} onChange={(e) => setNumQuestions(parseInt(e.target.value) || 10)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <button onClick={generate} disabled={loading} className="mt-5 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg disabled:opacity-50 hover:shadow-lg">
            {loading ? 'Generating paper… (may take 10-20s)' : '✨ Generate Question Paper'}
          </button>
        </div>

        {paper && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-end mb-4 print:hidden">
              <button onClick={printPaper} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg text-sm">
                🖨️ Print / Save as PDF
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-slate-800 text-sm leading-relaxed">{paper}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
