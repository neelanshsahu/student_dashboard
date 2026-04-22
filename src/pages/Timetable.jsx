// ============================================================
// Timetable.jsx — Weekly class schedule view
// ============================================================
import { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Clock, MapPin, CalendarDays } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const TODAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const todayName = TODAY_NAMES[new Date().getDay()];

const TYPE_CFG = {
  Lecture: {
    border:  'border-l-indigo-400',
    rowBg:   'bg-indigo-50/50 dark:bg-indigo-500/[0.05]',
    badge:   'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400',
    dot:     'bg-indigo-500',
    icon:    'text-indigo-400',
  },
  Lab: {
    border:  'border-l-emerald-400',
    rowBg:   'bg-emerald-50/50 dark:bg-emerald-500/[0.05]',
    badge:   'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400',
    dot:     'bg-emerald-500',
    icon:    'text-emerald-400',
  },
  Tutorial: {
    border:  'border-l-violet-400',
    rowBg:   'bg-violet-50/50 dark:bg-violet-500/[0.05]',
    badge:   'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-400',
    dot:     'bg-violet-500',
    icon:    'text-violet-400',
  },
};

export default function Timetable() {
  const { timetable } = useStudent();
  const [activeDay, setActiveDay] = useState(
    DAYS.includes(todayName) ? todayName : 'Monday'
  );

  const dayClasses = timetable[activeDay] ?? [];

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="animate-slide-up" style={{ animationFillMode: 'both' }}>
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">Weekly Timetable</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">
          Class schedule for the current semester
        </p>
      </div>

      {/* Type legend */}
      <div className="flex items-center gap-5 flex-wrap animate-slide-up" style={{ animationDelay: '0.05s', animationFillMode: 'both' }}>
        {Object.entries(TYPE_CFG).map(([type, cfg]) => (
          <div key={type} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{type}</span>
          </div>
        ))}
      </div>

      {/* Day tabs */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 animate-slide-up"
        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
      >
        {DAYS.map((day) => {
          const isToday  = day === todayName;
          const isActive = day === activeDay;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold
                          whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'text-white shadow-indigo'
                  : `bg-white dark:bg-white/[0.05]
                     border border-slate-200/60 dark:border-white/[0.07]
                     text-slate-600 dark:text-slate-400
                     hover:border-indigo-200 dark:hover:border-indigo-700/50
                     hover:text-indigo-600 dark:hover:text-indigo-400`
              }`}
              style={isActive ? {
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
              } : {}}
            >
              {day.slice(0, 3)}
              {isToday && (
                <span className={`ml-1.5 text-[10px] font-bold ${isActive ? 'text-indigo-200' : 'text-indigo-500'}`}>
                  Today
                </span>
              )}
              {/* Today ring on inactive */}
              {isToday && !isActive && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Classes */}
      <div className="space-y-3">
        {dayClasses.map((cls, i) => {
          const cfg = TYPE_CFG[cls.type] || TYPE_CFG.Lecture;
          return (
            <div
              key={i}
              className={`glass-card border-l-[3px] ${cfg.border} ${cfg.rowBg}
                          p-4 animate-slide-up group
                          hover:-translate-y-0.5
                          hover:shadow-[0_6px_24px_-4px_rgba(99,102,241,0.15)]
                          transition-all duration-200`}
              style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="font-semibold text-slate-800 dark:text-white text-sm
                                   group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                                   transition-colors">
                      {cls.subject}
                    </h3>
                    <span className={`badge ${cfg.badge}`}>{cls.type}</span>
                  </div>

                  <div className="flex items-center gap-5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className={cfg.icon} />
                      {cls.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-violet-400" />
                      {cls.room}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {dayClasses.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20
                            flex items-center justify-center text-3xl">
              🎉
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-700 dark:text-slate-200">No classes on {activeDay}!</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Enjoy your free time</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
