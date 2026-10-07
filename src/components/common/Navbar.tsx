import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Scan,
  History,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Sun,
  Moon
} from 'lucide-react';

import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Recognize Cattle', path: '/recognize', icon: Scan },
    { name: 'History', path: '/history', icon: History },
    { name: 'Cattle Breeds', path: '/breeds', icon: BookOpen },
    { name: 'Profile', path: '/profile', icon: User }
  ];

  const ThemeButton = () => (
    <button
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
      id="theme-toggle-btn"
      className="p-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-[var(--color-text-muted)] hover:text-emerald-700 transition-all"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-nav-bg)] backdrop-blur-md border-b border-[var(--color-border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="focus:outline-none">
            <Logo size="md" showTagline={true} />
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated ? (
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-700/50'
                          : 'text-[var(--color-text-muted)] hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-[var(--color-surface)]'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-emerald-600" />
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          ) : (
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/breeds"
                className="text-sm font-semibold text-[var(--color-text-muted)] hover:text-emerald-700 transition"
              >
                Cattle Breeds
              </Link>
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-700/20 transition-all active:scale-95"
              >
                Login
              </Link>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeButton />

            {isAuthenticated && (
              <div className="flex items-center gap-2 pl-2 border-l border-[var(--color-border)]">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-bg)] border border-[var(--color-border)] transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-xs font-bold text-[var(--color-text)] leading-tight truncate max-w-[120px]">
                      {user?.name?.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-[var(--color-text-muted)] font-medium">My Profile</p>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  id="logout-btn"
                  className="p-2 text-[var(--color-text-muted)] hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeButton />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-card)] px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)] px-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-bold text-sm text-[var(--color-text)]">{user?.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition ${
                          isActive
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-700/50'
                            : 'text-[var(--color-text)] hover:bg-[var(--color-surface)]'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 text-emerald-600" />
                      <span>{link.name}</span>
                    </NavLink>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[var(--color-border)]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 font-semibold text-sm hover:bg-rose-100 dark:hover:bg-rose-900/30 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-2 pt-2">
              <Link
                to="/breeds"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-xl transition"
              >
                Cattle Breeds
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3 bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:bg-emerald-800 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3 border border-emerald-700 text-emerald-700 dark:text-emerald-400 font-bold rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
