// ============================================================
// Analytics.jsx — Multi-chart analytics view
// ============================================================
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { useStudent } from '../context/StudentContext';
import { marksData, attendanceData } from '../data/mockData';

// ── Custom tooltip ──────────────────────────────────────────
function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card px-4 py-3 text-xs shadow-indigo-lg border border-indigo-100 dark:border-white/10">
      <p className="font-bold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

// ── Chart wrapper card ─────────────────────────────────────
function ChartCard({ title, gradient, delay = '0s', children }) {
  return (
    <div
      className="glass-card p-5 animate-slide-up"
      style={{ animationDelay: delay, animationFillMode: 'both' }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-1 h-5 rounded-full shrink-0" style={{ background: gradient }} />
        <h3 className="section-title">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function Analytics() {
  const { subjects, cgpaHistory } = useStudent();
  const subjectMarks = subjects.map((s) => ({ name: s.code, marks: s.marks }));

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="animate-slide-up" style={{ animationFillMode: 'both' }}>
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
          Performance Analytics
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
          Visualize your academic progress over time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Monthly marks trend */}
        <ChartCard
          title="Monthly Marks Trend"
          gradient="linear-gradient(#6366f1, #8b5cf6)"
          delay="0.05s"
        >
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marksData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="dsa"  name="DS&A"  stroke="#6366f1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="dbms" name="DBMS"  stroke="#8b5cf6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="os"   name="OS"    stroke="#f59e0b" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="cn"   name="CN"    stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Attendance bar chart */}
        <ChartCard
          title="Attendance by Subject"
          gradient="linear-gradient(#10b981, #06b6d4)"
          delay="0.1s"
        >
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} barSize={30} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.07)" />
                <XAxis dataKey="subject" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="attended" name="Attendance %" fill="url(#attGrad)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* CGPA history */}
        <ChartCard
          title="CGPA History"
          gradient="linear-gradient(#8b5cf6, #a78bfa)"
          delay="0.15s"
        >
          <div className="h-60">
            {cgpaHistory.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                No CGPA data available yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cgpaHistory} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cgpaGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
                  <XAxis dataKey="semester" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[3.0, 4.0]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Area
                    type="monotone"
                    dataKey="cgpa"
                    name="CGPA"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    fill="url(#cgpaGrad2)"
                    dot={{ fill: '#8b5cf6', r: 4, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ fill: '#6366f1', r: 5, strokeWidth: 2, stroke: '#fff' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartCard>

        {/* Marks by subject */}
        <ChartCard
          title="Marks by Subject"
          gradient="linear-gradient(#f59e0b, #f97316)"
          delay="0.2s"
        >
          <div className="h-60">
            {subjectMarks.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                No subject marks available yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectMarks} barSize={30} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="marksGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,158,11,0.08)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="marks" name="Marks" fill="url(#marksGrad)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
