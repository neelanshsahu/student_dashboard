// ============================================================
// Login.jsx — Premium dark auth page
// ============================================================
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { label: 'Neelansh Sahu', email: 'neelansh.sahu@university.edu' },
  { label: 'Aditi Sharma',  email: 'aditi.sharma@university.edu'  },
];

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error,  setError]  = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      login(form.email.trim(), form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (email) =>
    setForm({ email, password: 'demo1234' });

  return (
    <div className="min-h-screen auth-bg flex items-center justify-center p-4 relative overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
             style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
             style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-10 blur-3xl"
             style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
      </div>

      {/* Floating dots decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              top:  `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center animate-glow-pulse"
                   style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)', boxShadow: '0 8px 32px rgba(99,102,241,0.4)' }}>
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center">
                <Sparkles size={10} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-white tracking-tight">
                EduPortal
              </h1>
              <p className="text-white/40 text-xs mt-0.5 tracking-wide">STUDENT DASHBOARD</p>
            </div>
          </div>
        </div>

        {/* Auth card */}
        <div className="auth-card p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>

          <div className="mb-6">
            <h2 className="text-xl font-display font-bold text-white">Welcome back</h2>
            <p className="text-white/50 text-sm mt-1">Sign in to access your academic portal</p>
          </div>

          {/* Demo account pills */}
          <div className="mb-6">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-2">
              Quick Demo Access
            </p>
            <div className="flex gap-2 flex-wrap">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => fillDemo(a.email)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                             bg-white/[0.08] border border-white/10 text-white/70
                             hover:bg-white/[0.14] hover:text-white hover:border-white/20
                             transition-all duration-200"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500
                                  flex items-center justify-center text-[8px] font-bold text-white">
                    {a.label[0]}
                  </div>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="you@university.edu"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="auth-input pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  placeholder="Min. 4 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="auth-input pl-10 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <p className="text-white/30 text-[11px] mt-1.5">
                First time? Any password auto-creates your account.
              </p>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="auth-btn mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ArrowRight size={16} />
              )}
              {loading ? 'Signing you in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            New student?{' '}
            <Link to="/signup" className="text-indigo-300 font-semibold hover:text-white transition-colors">
              Create account →
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-6">
          EduPortal © {new Date().getFullYear()} · Secure Academic Portal
        </p>
      </div>
    </div>
  );
}
