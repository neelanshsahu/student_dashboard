// ============================================================
// Signup.jsx — Premium dark auth page
// ============================================================
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, User, Mail, Lock, Eye, EyeOff, Hash, ArrowRight, CheckCircle2 } from 'lucide-react';

const FIELD_LIST = [
  { name: 'name',       label: 'Full Name',   type: 'text',     placeholder: 'Neelansh Sahu',        icon: User  },
  { name: 'email',      label: 'Email',        type: 'email',    placeholder: 'you@university.edu',    icon: Mail  },
  { name: 'rollNumber', label: 'Roll Number',  type: 'text',     placeholder: 'CSE-2024-0001',         icon: Hash  },
];

const PERKS = [
  'Track attendance & CGPA in one place',
  'Manage assignments with deadlines',
  'Visualize performance with charts',
];

export default function Signup() {
  const { signup } = useAuth();
  const navigate   = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', rollNumber: '', password: '', confirm: '' });
  const [showPw, setShowPw]  = useState(false);
  const [error,  setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 6)       { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      signup(form.name, form.email.trim(), form.password, form.rollNumber);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen auth-bg flex items-center justify-center p-4 relative overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-64 -right-64 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
             style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} />
        <div className="absolute -bottom-64 -left-64 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
             style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
             style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
      </div>

      <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Left — branding panel */}
        <div className="hidden lg:flex flex-col gap-8 animate-slide-up">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 24px rgba(99,102,241,0.4)' }}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-display font-bold text-lg leading-tight">EduPortal</p>
              <p className="text-white/40 text-xs">Student Dashboard</p>
            </div>
          </div>

          {/* Hero text */}
          <div>
            <h2 className="text-4xl font-display font-bold text-white leading-tight">
              Your <span style={{ background: 'linear-gradient(135deg, #818cf8, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>academic</span><br />
              life, organized.
            </h2>
            <p className="text-white/50 mt-3 leading-relaxed text-sm">
              Join thousands of students who manage their college life smarter with EduPortal.
            </p>
          </div>

          {/* Feature perks */}
          <div className="space-y-3">
            {PERKS.map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                     style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <CheckCircle2 size={12} className="text-white" />
                </div>
                <span className="text-white/70 text-sm">{perk}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            {[['2.4k+', 'Students'], ['98%', 'Uptime'], ['All Free', 'Features']].map(([val, label]) => (
              <div key={label}>
                <p className="text-white font-display font-bold text-xl">{val}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form panel */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                 style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 24px rgba(99,102,241,0.4)' }}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-white font-display font-bold text-xl">EduPortal</h1>
          </div>

          <div className="auth-card p-8">
            <div className="mb-6">
              <h3 className="text-xl font-display font-bold text-white">Create your account</h3>
              <p className="text-white/50 text-sm mt-1">Fill in your details to get started</p>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Text fields */}
              {FIELD_LIST.map(({ name, label, type, placeholder, icon: Icon }) => (
                <div key={name}>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    <input
                      id={`signup-${name}`}
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={form[name]}
                      onChange={handleChange}
                      className="auth-input pl-10"
                      required
                    />
                  </div>
                </div>
              ))}

              {/* Password */}
              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  <input
                    id="signup-password"
                    type={showPw ? 'text' : 'password'}
                    name="password"
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    className="auth-input pl-10 pr-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  <input
                    id="signup-confirm"
                    type="password"
                    name="confirm"
                    placeholder="Repeat password"
                    value={form.confirm}
                    onChange={handleChange}
                    className="auth-input pl-10"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="auth-btn mt-2">
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowRight size={16} />
                )}
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-white/40 text-sm mt-5">
              Already registered?{' '}
              <Link to="/login" className="text-indigo-300 font-semibold hover:text-white transition-colors">
                Sign in →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
