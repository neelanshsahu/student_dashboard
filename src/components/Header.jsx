// ============================================================
// Header.jsx — Polished top navigation bar
// ============================================================
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu, Moon, Sun, Bell, Search, X, BellOff,
  ChevronDown, LogOut, User as UserIcon,
} from 'lucide-react';
import { useTheme }   from '../context/ThemeContext';
import { useStudent } from '../context/StudentContext';
import { useAuth }    from '../context/AuthContext';

const PAGE_META = {
  '/':            { title: 'Dashboard',   sub: "Today's overview" },
  '/subjects':    { title: 'Subjects',    sub: 'Enrolled this semester' },
  '/assignments': { title: 'Assignments', sub: 'Track tasks and deadlines' },
  '/analytics':   { title: 'Analytics',  sub: 'Visualize your performance' },
  '/timetable':   { title: 'Timetable',  sub: 'Weekly class schedule' },
  '/profile':     { title: 'Profile',    sub: 'Your personal details' },
};

const NOTIF_ICONS = { assignment: '📋', grade: '🎓', schedule: '📅', event: '🎉' };

export default function Header({ onMenuClick }) {
  const { pathname } = useLocation();
  const { dark, toggle } = useTheme();
  const { profile, notifications } = useStudent();
  const { logout, user } = useAuth();

  const meta = PAGE_META[pathname] || PAGE_META['/'];

  const [notifs, setNotifs]         = useState(notifications);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUser,   setShowUser]   = useState(false);
  const [search, setSearch]         = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const notifRef = useRef(null);
  const userRef  = useRef(null);
  const unread   = notifs.filter((n) => !n.read).length;

  // Sync notifications when student changes
  useEffect(() => { setNotifs(notifications); }, [notifications]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false);
      if (userRef.current  && !userRef.current.contains(e.target))  setShowUser(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () =>
    setNotifs((n) => n.map((x) => ({ ...x, read: true })));

  return (
    <header
      id="header"
      className="sticky top-0 z-30 flex items-center justify-between
                 px-5 lg:px-7 h-[64px]
                 bg-white/85 dark:bg-[#060b18]/90
                 backdrop-blur-2xl
                 border-b border-slate-100/80 dark:border-white/[0.05]"
    >
      {/* Left: menu btn + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl
                     hover:bg-slate-100 dark:hover:bg-white/[0.06]
                     text-slate-500 dark:text-slate-400 transition-colors"
        >
          <Menu size={19} />
        </button>
        <div>
          <h1 className="font-display font-bold text-slate-900 dark:text-white text-base leading-tight">
            {meta.title}
          </h1>
          <p className="text-slate-400 dark:text-slate-500 text-[11px] hidden sm:block">
            {meta.sub}
          </p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1">

        {/* Search */}
        <div className={`flex items-center transition-all duration-300 overflow-hidden ${searchOpen ? 'w-44 md:w-52' : 'w-9'}`}>
          {searchOpen ? (
            <div className="flex items-center gap-2 bg-slate-100/80 dark:bg-white/[0.06]
                            rounded-xl px-3 py-2 w-full
                            border border-slate-200/60 dark:border-white/[0.08]">
              <Search size={13} className="text-indigo-500 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-slate-700 dark:text-slate-200
                           placeholder-slate-400 outline-none flex-1 min-w-0"
              />
              <button onClick={() => { setSearchOpen(false); setSearch(''); }}>
                <X size={13} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl
                         hover:bg-slate-100 dark:hover:bg-white/[0.06]
                         text-slate-500 dark:text-slate-400 transition-colors"
            >
              <Search size={17} />
            </button>
          )}
        </div>

        {/* Dark / light toggle */}
        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center rounded-xl
                     hover:bg-slate-100 dark:hover:bg-white/[0.06]
                     text-slate-500 dark:text-slate-400 transition-colors"
        >
          {dark
            ? <Sun  size={17} className="text-amber-400" />
            : <Moon size={17} />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifs((s) => !s)}
            className="w-9 h-9 flex items-center justify-center rounded-xl
                       hover:bg-slate-100 dark:hover:bg-white/[0.06]
                       text-slate-500 dark:text-slate-400 transition-colors relative"
          >
            <Bell size={17} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse-slow" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 glass-card shadow-indigo-lg overflow-hidden animate-fade-in z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/[0.05]">
                <h3 className="font-semibold text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  Notifications
                  {unread > 0 && (
                    <span className="badge bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                      {unread}
                    </span>
                  )}
                </h3>
                <button
                  onClick={markAllRead}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 dark:divide-white/[0.03]">
                {notifs.length === 0
                  ? (
                    <div className="flex flex-col items-center gap-2 py-8 text-slate-400">
                      <BellOff size={22} />
                      <p className="text-sm">All caught up!</p>
                    </div>
                  )
                  : notifs.map((n) => (
                    <div
                      key={n.id}
                      className={`flex gap-3 px-4 py-3 transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02] ${
                        !n.read ? 'bg-indigo-50/40 dark:bg-indigo-500/[0.04]' : ''
                      }`}
                    >
                      <span className="text-lg mt-0.5">{NOTIF_ICONS[n.type] || '🔔'}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${!n.read ? 'font-semibold text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                          {n.title}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{n.message}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* User / Avatar */}
        <div className="relative ml-1" ref={userRef}>
          <button
            onClick={() => setShowUser((s) => !s)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl
                       hover:bg-slate-100 dark:hover:bg-white/[0.06]
                       transition-colors"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              {profile.avatar || (profile.name?.[0] ?? 'S')}
            </div>
            <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 hidden md:block max-w-[100px] truncate">
              {profile.name?.split(' ')[0] || 'Student'}
            </span>
            <ChevronDown
              size={13}
              className={`text-slate-400 transition-transform ${showUser ? 'rotate-180' : ''}`}
            />
          </button>

          {showUser && (
            <div className="absolute right-0 top-12 w-52 glass-card shadow-indigo overflow-hidden animate-fade-in z-50">
              {/* Info */}
              <div className="px-4 py-3 border-b border-slate-100 dark:border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                  >
                    {profile.avatar || (profile.name?.[0] ?? 'S')}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                      {profile.name || 'Student'}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-1.5">
                <button
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg
                             text-sm text-slate-600 dark:text-slate-300
                             hover:bg-slate-50 dark:hover:bg-white/[0.05]
                             transition-colors"
                  onClick={() => setShowUser(false)}
                >
                  <UserIcon size={14} />
                  View Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg
                             text-sm text-rose-500
                             hover:bg-rose-50 dark:hover:bg-rose-500/[0.08]
                             transition-colors"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
