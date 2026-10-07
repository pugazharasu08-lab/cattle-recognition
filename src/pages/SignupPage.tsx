import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { useAuth, isValidGmail, validatePassword } from '../context/AuthContext';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const getPasswordStrength = () => {
    if (!password) return null;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 2) return { label: 'Weak', color: 'bg-rose-500', width: '40%' };
    if (score <= 3) return { label: 'Fair', color: 'bg-amber-500', width: '60%' };
    if (score <= 4) return { label: 'Good', color: 'bg-teal-500', width: '80%' };
    return { label: 'Strong', color: 'bg-emerald-600', width: '100%' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Full name is required.');
      return;
    }
    if (!isValidGmail(email)) {
      setError('Please enter a valid Gmail address (e.g. example@gmail.com).');
      return;
    }
    const passError = validatePassword(password);
    if (passError) {
      setError(passError);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter your password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = signup(name, email, password);
      setLoading(false);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Signup failed. Please try again.');
      }
    }, 500);
  };

  if (success) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-[var(--color-bg)]">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[var(--color-text)]">Account Created!</h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Account created successfully. Please login to continue.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-[var(--color-bg)]">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-block">
            <Logo size="lg" showTagline={false} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] mt-4">
            Create Account
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Join Cattle Recognition — identify breeds and explore livestock information.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-[var(--color-card)] p-8 rounded-3xl shadow-xl border border-[var(--color-border)] space-y-5">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 flex items-center gap-2.5 text-sm text-rose-800 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="signup-name" className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="signup-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(null); }}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-[var(--color-text)] bg-[var(--color-input-bg)] outline-none transition"
                />
              </div>
            </div>

            {/* Gmail */}
            <div>
              <label htmlFor="signup-email" className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
                Gmail Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  placeholder="Enter your Gmail address"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--color-border)] focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-[var(--color-text)] bg-[var(--color-input-bg)] outline-none transition"
                />
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                Only Gmail addresses accepted (e.g. yourname@gmail.com)
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[var(--color-border)] focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-sm font-medium text-[var(--color-text)] bg-[var(--color-input-bg)] outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--color-text-muted)] hover:text-emerald-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Password strength bar */}
              {password && strength && (
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)]">
                    Strength: <span className="font-semibold">{strength.label}</span>
                  </p>
                </div>
              )}
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                Min. 8 chars · uppercase · lowercase · number · special character
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="signup-confirm-password" className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(null); }}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm font-medium text-[var(--color-text)] bg-[var(--color-input-bg)] outline-none transition focus:ring-2 ${
                    confirmPassword && confirmPassword !== password
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                      : confirmPassword && confirmPassword === password
                      ? 'border-emerald-500 focus:border-emerald-600 focus:ring-emerald-500/20'
                      : 'border-[var(--color-border)] focus:border-emerald-600 focus:ring-emerald-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--color-text-muted)] hover:text-emerald-600 transition"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs text-rose-600 mt-1">Passwords do not match</p>
              )}
              {confirmPassword && confirmPassword === password && (
                <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Passwords match</span>
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              id="signup-submit-btn"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <User className="w-4 h-4" />
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-emerald-700 font-bold hover:text-emerald-800 hover:underline transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
