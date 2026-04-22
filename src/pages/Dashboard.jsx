// ============================================================
// Dashboard.jsx — Upgraded home page
// ============================================================
import { useStudent } from '../context/StudentContext';
import {
  BookOpen, ClipboardList, TrendingUp, Users,
  ArrowUpRight, CheckCircle2, Clock, AlertCircle,
  Zap, Target, Flame, Trophy,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

// ── Custom chart tooltip ────────────────────────────────────
function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-4 py-2.5 text-xs shadow-lg border border-indigo-100 dark:border-white/10">
      <p className="font-semibold text-slate-600 dark:text-slate-300 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-medium">CGPA: {p.value}</p>
      ))}
    </div>
  );
}

// ── Stat card ───────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, gradient, iconGlow, delay = '0s' }) {
  return (
    <div
      className="stat-card animate-slide-up"
      style={{ animationDelay: delay, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: gradient, boxShadow: iconGlow }}
        >
          <Icon size={20} className="text-white" />
        </div>
        <ArrowUpRight size={14} className="text-slate-300 dark:text-slate-600 mt-0.5" />
      </div>
      <p className="text-2xl font-display font-bold text-slate-800 dark:text-white">{value}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}

// ── Status icon chip ────────────────────────────────────────
function StatusChip({ status }) {
  const cfg = {
    submitted: { icon: CheckCircle2, bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400' },
    pending:   { icon: Clock,        bg: 'bg-amber-100 dark:bg-amber-900/30',     text: 'text-amber-600 dark:text-amber-400' },
    overdue:   { icon: AlertCircle,  bg: 'bg-rose-100 dark:bg-rose-900/30',       text: 'text-rose-600 dark:text-rose-400' },
  }[status] || {};
  const { icon: Icon, bg, text } = cfg;
  return (
    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
      <Icon size={14} className={text} />
    </div>
  );
}

// ── Main component ──────────────────────────────────────────
export default function Dashboard() {
  const { profile, subjects, assignments, cgpaHistory } = useStudent();

  const pending   = assignments.filter((a) => a.status === 'pending').length;
  const overdue   = assignments.filter((a) => a.status === 'overdue').length;
  const avgAttend = subjects.length
    ? Math.round(subjects.reduce((acc, s) => acc + s.attendance, 0) / subjects.length)
    : 0;

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const stats = [
    {
      icon: BookOpen, label: 'Subjects Enrolled', value: subjects.length,
      sub: 'This semester',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      iconGlow: '0 4px 16px rgba(99,102,241,0.4)',
      delay: '0.05s',
    },
    {
      icon: Users, label: 'Avg Attendance', value: `${avgAttend}%`,
      sub: 'Across all subjects',
      gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
      iconGlow: '0 4px 16px rgba(16,185,129,0.4)',
      delay: '0.1s',
    },
    {
      icon: ClipboardList, label: 'Pending Tasks', value: pending + overdue,
      sub: `${overdue} overdue`,
      gradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
      iconGlow: '0 4px 16px rgba(245,158,11,0.4)',
      delay: '0.15s',
    },
    {
      icon: TrendingUp, label: 'Current CGPA', value: profile.cgpa || '–',
      sub: "Dean's List eligible",
      gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
      iconGlow: '0 4px 16px rgba(139,92,246,0.4)',
      delay: '0.2s',
    },
  ];

  return (
    <div className="space-y-6">

      {/* ── Welcome banner ─────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 lg:p-8 animate-slide-up"
        style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #6366f1 70%, #06b6d4 100%)',
          boxShadow: '0 8px 40px rgba(99,102,241,0.35)',
          animationFillMode: 'both',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.06]" />
        <div className="absolute top-4 right-24 w-16 h-16 rounded-full bg-white/[0.08]" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/[0.05]" />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame size={14} className="text-amber-300" />
              <span className="text-indigo-200 text-xs font-medium">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-white">
              {greeting}, {profile.name?.split(' ')[0] || 'Student'} 👋
            </h2>
            <p className="text-indigo-200 text-sm mt-1.5 max-w-lg">
              {pending > 0
                ? `You have ${pending} pending assignment${pending > 1 ? 's' : ''} · Stay on track!`
                : 'Great work! No pending assignments right now.'}
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {[
              { icon: Trophy, label: 'CGPA',       value: profile.cgpa || '–',     bg: 'bg-white/15' },
              { icon: Target, label: 'Attendance',  value: `${avgAttend}%`,           bg: 'bg-white/15' },
              { icon: Zap,    label: 'Assignments', value: `${pending + overdue} left`, bg: 'bg-white/15' },
            ].map((m) => (
              <div key={m.label} className={`${m.bg} backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/15`}>
                <m.icon size={16} className="text-amber-300 shrink-0" />
                <div>
                  <p className="text-indigo-200 text-[10px] uppercase tracking-wider">{m.label}</p>
                  <p className="text-white font-display font-bold text-sm">{m.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stat cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* ── Charts + Assignments ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* CGPA area chart */}
        <div
          className="glass-card p-5 lg:col-span-3 animate-slide-up"
          style={{ animationDelay: '0.25s', animationFillMode: 'both' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(#6366f1,#8b5cf6)' }} />
              <h3 className="section-title">CGPA Progression</h3>
            </div>
            <span className="badge bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
              {profile.cgpa || 'N/A'}
            </span>
          </div>

          {cgpaHistory.length === 0 ? (
            <div className="h-52 flex items-center justify-center text-slate-400 text-sm">
              No CGPA data yet
            </div>
          ) : (
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cgpaHistory} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cgpaG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.07)" />
                  <XAxis dataKey="semester" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[3.0, 4.0]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Area
                    type="monotone"
                    dataKey="cgpa"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fill="url(#cgpaG)"
                    dot={{ fill: '#6366f1', r: 4, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ fill: '#8b5cf6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Upcoming tasks */}
        <div
          className="glass-card p-5 lg:col-span-2 animate-slide-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(#f59e0b, #f97316)' }} />
            <h3 className="section-title">Upcoming Tasks</h3>
          </div>

          {assignments.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-slate-400">
              <CheckCircle2 size={28} className="text-emerald-400" />
              <p className="text-sm font-medium">All done! 🎉</p>
            </div>
          ) : (
            <div className="space-y-2">
              {assignments.slice(0, 4).map((a) => (
                <div
                  key={a.id}
                  className="flex items-start gap-3 p-2.5 rounded-xl
                             hover:bg-slate-50/80 dark:hover:bg-white/[0.03]
                             transition-colors group cursor-default"
                >
                  <StatusChip status={a.status} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-medium text-slate-700 dark:text-slate-200 truncate
                                  group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {a.title}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {a.subject} · Due {a.dueDate}
                    </p>
                  </div>
                  <span className={`badge capitalize shrink-0 ${
                    a.priority === 'high'   ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' :
                    a.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                    'bg-slate-100 dark:bg-slate-700/40 text-slate-500 dark:text-slate-400'
                  }`}>
                    {a.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Subject table ───────────────────────────────────── */}
      <div
        className="glass-card p-5 animate-slide-up"
        style={{ animationDelay: '0.35s', animationFillMode: 'both' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(#10b981, #06b6d4)' }} />
            <h3 className="section-title">Subject Overview</h3>
          </div>
          <span className="badge bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400">
            {subjects.length} subjects
          </span>
        </div>

        {subjects.length === 0 ? (
          <p className="text-slate-400 text-sm py-6 text-center">No subjects loaded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Credits</th>
                  <th>Attendance</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {subjects.slice(0, 5).map((s) => (
                  <tr key={s.id}>
                    <td className="font-medium text-slate-800 dark:text-white">{s.name}</td>
                    <td>{s.teacher}</td>
                    <td>
                      <span className="badge bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                        {s.credits}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar w-20">
                          <div
                            className={`progress-fill ${s.attendance >= 90 ? 'green' : s.attendance >= 75 ? 'amber' : 'red'}`}
                            style={{ width: `${s.attendance}%` }}
                          />
                        </div>
                        <span className={`text-xs font-semibold ${
                          s.attendance >= 90 ? 'text-emerald-500' :
                          s.attendance >= 75 ? 'text-amber-500' : 'text-rose-500'
                        }`}>
                          {s.attendance}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        s.grade.startsWith('A')
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                      }`}>
                        {s.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
