// ============================================================
// Assignments.jsx — Upgraded list with status & priority
// ============================================================
import { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Clock, CheckCircle2, AlertCircle, Search, ClipboardX } from 'lucide-react';

const FILTERS = ['all', 'pending', 'submitted', 'overdue'];

const STATUS = {
  pending: {
    label: 'Pending',
    icon: Clock,
    row:    'border-l-amber-400',
    chip:   'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    iconBg: 'linear-gradient(135deg,#f59e0b,#f97316)',
  },
  submitted: {
    label: 'Submitted',
    icon: CheckCircle2,
    row:    'border-l-emerald-400',
    chip:   'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    iconBg: 'linear-gradient(135deg,#10b981,#06b6d4)',
  },
  overdue: {
    label: 'Overdue',
    icon: AlertCircle,
    row:    'border-l-rose-400',
    chip:   'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
    iconBg: 'linear-gradient(135deg,#f43f5e,#e11d48)',
  },
};

const PRIORITY = {
  high:   'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  low:    'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400',
};

export default function Assignments() {
  const { assignments } = useStudent();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const counts = {
    all:       assignments.length,
    pending:   assignments.filter((a) => a.status === 'pending').length,
    submitted: assignments.filter((a) => a.status === 'submitted').length,
    overdue:   assignments.filter((a) => a.status === 'overdue').length,
  };

  const filtered = assignments.filter((a) => {
    const matchFilter = filter === 'all' || a.status === filter;
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="animate-slide-up" style={{ animationFillMode: 'both' }}>
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">Assignments</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
          {assignments.length} total · {counts.overdue} overdue · {counts.submitted} submitted
        </p>
      </div>

      {/* Filter bar + search */}
      <div
        className="glass-card p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center
                   animate-slide-up"
        style={{ animationDelay: '0.05s', animationFillMode: 'both' }}
      >
        {/* Filter pills */}
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all duration-200 ${
                  active
                    ? 'text-white shadow-indigo'
                    : 'bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/[0.08]'
                }`}
                style={active ? {
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
                } : {}}
              >
                {f === 'all' ? 'All' : STATUS[f].label}
                <span className="ml-1.5 opacity-60">({counts[f] ?? 0})</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="sm:ml-auto flex items-center gap-2
                        bg-slate-100/80 dark:bg-white/[0.05]
                        border border-slate-200/60 dark:border-white/[0.07]
                        rounded-xl px-3 py-2.5 w-full sm:w-56">
          <Search size={14} className="text-indigo-500 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-700 dark:text-slate-200
                       placeholder-slate-400 outline-none flex-1"
          />
        </div>
      </div>

      {/* Assignment rows */}
      <div className="space-y-2.5">
        {filtered.map((a, i) => {
          const cfg = STATUS[a.status];
          const Icon = cfg.icon;
          return (
            <div
              key={a.id}
              className={`glass-card p-4 border-l-[3px] ${cfg.row}
                          flex flex-col sm:flex-row sm:items-center gap-3
                          hover:-translate-y-0.5 hover:shadow-[0_6px_24px_-4px_rgba(99,102,241,0.15)]
                          transition-all duration-200 animate-slide-up group`}
              style={{ animationDelay: `${i * 0.04}s`, animationFillMode: 'both' }}
            >
              {/* Status icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: cfg.iconBg, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
              >
                <Icon size={17} className="text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 dark:text-white text-sm truncate
                               group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                               transition-colors">
                  {a.title}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {a.subject} · Due {a.dueDate}
                </p>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`badge capitalize ${PRIORITY[a.priority]}`}>
                  {a.priority}
                </span>
                <span className={`badge ${cfg.chip}`}>
                  {cfg.label}
                </span>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20
                            flex items-center justify-center">
              <ClipboardX size={24} className="text-indigo-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">No assignments found</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm">Try a different filter or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
