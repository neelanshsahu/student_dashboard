// ============================================================
// Sidebar.jsx — Sleek navigation sidebar
// ============================================================
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, ClipboardList,
  BarChart2, CalendarDays, User, GraduationCap, X,
  ChevronRight, Zap,
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

const navItems = [
  { path: '/',            label: 'Dashboard',   icon: LayoutDashboard },
  { path: '/subjects',    label: 'Subjects',    icon: BookOpen },
  { path: '/assignments', label: 'Assignments', icon: ClipboardList, badge: 3 },
  { path: '/analytics',   label: 'Analytics',   icon: BarChart2 },
  { path: '/timetable',   label: 'Timetable',   icon: CalendarDays },
  { path: '/profile',     label: 'Profile',     icon: User },
];

export default function Sidebar({ open, onClose }) {
  const { profile } = useStudent();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        id="sidebar"
        className={`
          fixed top-0 left-0 h-full w-[256px] z-50
          sidebar-glass flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 pt-6 pb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,0.4)' }}
            >
              <GraduationCap className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <p className="font-display font-bold text-slate-900 dark:text-white text-sm leading-tight">
                EduPortal
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 tracking-wide">
                STUDENT DASHBOARD
              </p>
            </div>
          </div>
          <button
            className="lg:hidden w-7 h-7 rounded-lg flex items-center justify-center
                       hover:bg-slate-100 dark:hover:bg-white/[0.06]
                       text-slate-400 transition-colors"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* CGPA hero card */}
        <div className="mx-3 mb-4 p-3.5 rounded-2xl relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}>
          <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-white/10" />
          <div className="absolute -right-3 -bottom-8 w-24 h-24 rounded-full bg-white/5" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-indigo-200 text-[10px] font-semibold uppercase tracking-wide">Current CGPA</p>
              <p className="text-white text-2xl font-display font-bold mt-0.5">{profile.cgpa || '–'}</p>
              <p className="text-indigo-200/70 text-[11px] mt-0.5">{profile.semester || 'N/A'}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-2">
            Navigation
          </p>
          {navItems.map(({ path, label, icon: Icon, badge }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              id={`nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={onClose}
              className={({ isActive }) => `nav-link group ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} className="shrink-0" />
              <span className="flex-1 text-[13.5px]">{label}</span>
              {badge && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
              {!badge && (
                <ChevronRight
                  size={13}
                  className="opacity-0 group-hover:opacity-40 transition-opacity shrink-0"
                />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-3 h-px bg-slate-100 dark:bg-white/[0.05]" />

        {/* Student profile footer */}
        <div className="px-3 py-4">
          <NavLink
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-white/[0.05] transition-colors group"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)' }}
            >
              {profile.avatar || '?'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[13px] font-semibold text-slate-800 dark:text-white truncate leading-tight">
                {profile.name || 'Student'}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                {profile.course ? profile.course.split(' ').slice(0, 2).join(' ') : 'No course'}
              </p>
            </div>
            <ChevronRight size={13} className="text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors shrink-0" />
          </NavLink>
        </div>
      </aside>
    </>
  );
}
