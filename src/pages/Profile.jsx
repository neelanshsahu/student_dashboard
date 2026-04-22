// ============================================================
// Profile.jsx — Editable profile with banner
// ============================================================
import { useState, useEffect } from 'react';
import { useStudent } from '../context/StudentContext';
import { useAuth } from '../context/AuthContext';
import {
  Edit2, Save, X, User, Mail, Phone, MapPin,
  BookOpen, Hash, Calendar, Award, TrendingUp, LogOut,
} from 'lucide-react';

const FIELDS = [
  { key: 'name',       label: 'Full Name',   icon: User,     type: 'text'  },
  { key: 'email',      label: 'Email',        icon: Mail,     type: 'email' },
  { key: 'phone',      label: 'Phone',        icon: Phone,    type: 'text'  },
  { key: 'rollNumber', label: 'Roll Number',  icon: Hash,     type: 'text'  },
  { key: 'course',     label: 'Course',       icon: BookOpen, type: 'text'  },
  { key: 'batch',      label: 'Batch',        icon: Calendar, type: 'text'  },
  { key: 'semester',   label: 'Semester',     icon: Calendar, type: 'text'  },
  { key: 'section',    label: 'Section',      icon: User,     type: 'text'  },
  { key: 'college',    label: 'College',      icon: BookOpen, type: 'text'  },
  { key: 'address',    label: 'Address',      icon: MapPin,   type: 'text'  },
];

export default function Profile() {
  const { profile }  = useStudent();
  const { logout }   = useAuth();

  const [editing, setEditing] = useState(false);
  const [toast,   setToast]   = useState(false);
  const [form, setForm]       = useState(profile);

  // Sync when profile changes (e.g. student switch)
  useEffect(() => { setForm(profile); }, [profile]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = () => {
    setEditing(false);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  const handleCancel = () => {
    setForm(profile);
    setEditing(false);
  };

  const statItems = [
    { label: 'CGPA',        value: form.cgpa,       icon: TrendingUp, color: 'text-indigo-500',  bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { label: 'Attendance',  value: `${form.attendance || 0}%`, icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Semester',    value: form.semester,   icon: BookOpen,   color: 'text-violet-500',   bg: 'bg-violet-50 dark:bg-violet-900/20' },
    { label: 'Section',     value: form.section,    icon: User,       color: 'text-amber-500',    bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ];

  return (
    <div className="space-y-5 max-w-3xl">

      {/* ── Banner card ──────────────────────────────────────── */}
      <div
        className="glass-card overflow-hidden animate-slide-up"
        style={{ animationFillMode: 'both' }}
      >
        {/* Hero band */}
        <div
          className="h-36 relative"
          style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%)' }}
        >
          {/* decorative circles */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/[0.07]" />
          <div className="absolute top-6 right-28 w-14 h-14 rounded-full bg-white/[0.1]" />
          <div className="absolute -bottom-6 right-10 w-20 h-20 rounded-full bg-white/[0.05]" />
        </div>

        <div className="px-6 pb-6 relative">
          {/* Avatar + buttons row */}
          <div className="flex items-end justify-between -mt-12 mb-5">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center
                         text-white text-3xl font-display font-bold
                         border-4 border-white dark:border-navy-900"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
                boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
              }}
            >
              {form.avatar || form.name?.slice(0, 2).toUpperCase() || 'ST'}
            </div>

            <div className="flex gap-2">
              {editing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                               bg-slate-100 dark:bg-white/[0.05]
                               text-slate-600 dark:text-slate-300
                               text-sm font-medium
                               hover:bg-slate-200 dark:hover:bg-white/[0.08]
                               transition-colors"
                  >
                    <X size={14} /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl
                               text-white font-semibold text-sm
                               transition-all hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                      boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
                    }}
                  >
                    <Save size={14} /> Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                               bg-indigo-50 dark:bg-indigo-900/20
                               text-indigo-600 dark:text-indigo-400
                               text-sm font-semibold
                               hover:bg-indigo-100 dark:hover:bg-indigo-900/30
                               transition-colors"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                               bg-rose-50 dark:bg-rose-900/20
                               text-rose-500
                               text-sm font-semibold
                               hover:bg-rose-100 dark:hover:bg-rose-900/30
                               transition-colors"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Name + course */}
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            {form.name || 'Student'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            {form.course || 'Course not set'}
          </p>

          {/* Quick stat chips */}
          <div className="flex flex-wrap gap-3 mt-5">
            {statItems.map((s) => (
              <div
                key={s.label}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
                            ${s.bg} border border-slate-100 dark:border-white/[0.06]`}
              >
                <s.icon size={14} className={s.color} />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold">{s.label}</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{s.value || '–'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Toast ────────────────────────────────────────────── */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                     flex items-center gap-2.5 px-5 py-3 rounded-2xl
                     text-white text-sm font-semibold animate-slide-up"
          style={{
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            boxShadow: '0 8px 32px rgba(16,185,129,0.4)',
          }}
        >
          <span>✓</span> Profile saved successfully
        </div>
      )}

      {/* ── Info fields ──────────────────────────────────────── */}
      <div
        className="glass-card p-6 animate-slide-up"
        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
      >
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(#6366f1, #8b5cf6)' }} />
          <h3 className="section-title">Personal Information</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FIELDS.map(({ key, label, icon: Icon, type }) => (
            <div key={key}>
              <label className="block text-[11px] font-bold text-slate-400 dark:text-slate-500
                                uppercase tracking-widest mb-2">
                {label}
              </label>
              {editing ? (
                <input
                  type={type}
                  name={key}
                  value={form[key] ?? ''}
                  onChange={handleChange}
                  className="form-input"
                />
              ) : (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl
                                bg-slate-50/80 dark:bg-white/[0.03]
                                border border-slate-100 dark:border-white/[0.06]">
                  <Icon size={14} className="text-indigo-400 shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                    {form[key] || <span className="italic text-slate-400">Not set</span>}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
