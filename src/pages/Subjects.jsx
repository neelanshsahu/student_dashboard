// ============================================================
// Subjects.jsx — Upgraded card grid
// ============================================================
import { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { BookOpen, User, Award, Search, Layers } from 'lucide-react';

const ACCENT_GRADIENTS = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #06b6d4, #6366f1)',
  'linear-gradient(135deg, #10b981, #06b6d4)',
  'linear-gradient(135deg, #f59e0b, #f97316)',
  'linear-gradient(135deg, #f43f5e, #f97316)',
  'linear-gradient(135deg, #8b5cf6, #ec4899)',
  'linear-gradient(135deg, #06b6d4, #10b981)',
];

function gradeColor(g) {
  if (g.startsWith('A')) return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400';
  if (g.startsWith('B')) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
  return 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400';
}

function attendColor(n) {
  if (n >= 90) return 'green';
  if (n >= 75) return 'amber';
  return 'red';
}

function attendTextColor(n) {
  if (n >= 90) return 'text-emerald-500';
  if (n >= 75) return 'text-amber-500';
  return 'text-rose-500';
}

export default function Subjects() {
  const { subjects } = useStudent();
  const [search, setSearch] = useState('');

  const filtered = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.teacher.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 animate-slide-up" style={{ animationFillMode: 'both' }}>
        <div>
          <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">My Subjects</h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
            {subjects.length} subjects enrolled this semester
          </p>
        </div>

        {/* Search */}
        <div className="sm:ml-auto flex items-center gap-2.5
                        bg-white dark:bg-white/[0.05]
                        border border-slate-200 dark:border-white/[0.07]
                        rounded-xl px-3.5 py-2.5 w-full sm:w-60
                        shadow-sm">
          <Search size={15} className="text-indigo-500 shrink-0" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-700 dark:text-slate-200
                       placeholder-slate-400 outline-none flex-1"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((s, i) => (
          <div
            key={s.id}
            className="glass-card-hover overflow-hidden group
                       animate-slide-up"
            style={{
              animationDelay: `${i * 0.05}s`,
              animationFillMode: 'both',
            }}
          >
            {/* Top gradient bar */}
            <div
              className="h-1 w-full"
              style={{ background: ACCENT_GRADIENTS[i % ACCENT_GRADIENTS.length] }}
            />

            <div className="p-5">
              {/* Subject code + grade */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white mb-2"
                    style={{ background: ACCENT_GRADIENTS[i % ACCENT_GRADIENTS.length] }}
                  >
                    {s.code}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-white leading-tight
                                 group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                                 transition-colors truncate pr-2">
                    {s.name}
                  </h3>
                </div>
                <span className={`badge shrink-0 ${gradeColor(s.grade)}`}>{s.grade}</span>
              </div>

              {/* Teacher + credits */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-5">
                <User size={12} className="shrink-0" />
                <span className="truncate flex-1">{s.teacher}</span>
                <span className="badge bg-slate-100 dark:bg-white/[0.07] text-slate-500 dark:text-slate-400 shrink-0">
                  {s.credits} cr
                </span>
              </div>

              {/* Attendance bar */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Attendance</span>
                  <span className={`font-bold ${attendTextColor(s.attendance)}`}>
                    {s.attendance}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`progress-fill ${attendColor(s.attendance)}`}
                    style={{ width: `${s.attendance}%` }}
                  />
                </div>
              </div>

              {/* Marks */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-white/[0.05]
                              flex items-center gap-2">
                <Award size={13} className="text-violet-400 shrink-0" />
                <span className="text-xs text-slate-500 dark:text-slate-400">Marks</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {s.marks}<span className="font-normal text-slate-400">/100</span>
                </span>
                <div className="progress-bar flex-1 ml-1">
                  <div
                    className="progress-fill"
                    style={{ width: `${s.marks}%`, background: ACCENT_GRADIENTS[i % ACCENT_GRADIENTS.length] }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20
                            flex items-center justify-center mx-auto mb-4">
              <Layers size={24} className="text-indigo-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">No subjects match your search</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Try a different keyword</p>
          </div>
        )}
      </div>
    </div>
  );
}
