import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { useAuth, isValidGmail, validatePassword } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(null);
    setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(null);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    if (!isValidGmail(email)) {
      setEmailError('Please enter a valid Gmail address (e.g. example@gmail.com)');
      return;
    }

    // Validate password format
    const passError = validatePassword(password);
    if (passError) {
      setPasswordError(passError);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-[var(--color-bg)]">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-block">
            <Logo size="lg" showTagline={false} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] mt-4">
            Welcome to Cattle Recognition
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Identify cattle breeds and explore useful livestock information using AI.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[var(--color-card)] p-8 rounded-3xl shadow-xl border border-[var(--color-border)] space-y-5">
          {/* Global error */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 flex items-center gap-2.5 text-sm text-rose-800 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
                Gmail Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your Gmail address"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium text-[var(--color-text)] bg-[var(--color-input-bg)] outline-none transition focus:ring-2 focus:ring-emerald-500/20 ${
                    emailError
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-[var(--color-border)] focus:border-emerald-600'
                  }`}
                />
              </div>
              {emailError && (
                <p className="text-xs text-rose-600 mt-1">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm font-medium text-[var(--color-text)] bg-[var(--color-input-bg)] outline-none transition focus:ring-2 focus:ring-emerald-500/20 ${
                    passwordError
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-[var(--color-border)] focus:border-emerald-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--color-text-muted)] hover:text-emerald-600 transition"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-rose-600 mt-1">{passwordError}</p>
              )}
              <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                Min. 8 characters with uppercase, lowercase, number & special character
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              id="login-submit-btn"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Signing in...' : 'Login'}</span>
            </button>
          </form>

          {/* Signup link */}
          <p className="text-center text-sm text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-emerald-700 font-bold hover:text-emerald-800 hover:underline transition"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
