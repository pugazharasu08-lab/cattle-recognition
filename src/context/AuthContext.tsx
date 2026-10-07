import React, { createContext, useContext, useState } from 'react';
import type { UserProfile } from '../types/cattle';

const AUTH_STORAGE_KEY = 'cattle_recognition_auth_user';
const USERS_STORAGE_KEY = 'cattle_recognition_users';

interface StoredUser {
  name: string;
  email: string;
  passwordHash: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => { success: boolean; error?: string };
  updateName: (name: string) => void;
}

// Simple hash for prototype (not cryptographically secure — LocalStorage only)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

export function isValidGmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+\-]+@gmail\.com$/.test(email);
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
  if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least one special character.';
  return null;
}

function getStoredUsers(): StoredUser[] {
  try {
    const saved = localStorage.getItem(USERS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // ignore
  }
  return [];
}

function saveStoredUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    // ignore
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return null;
  });

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    if (!isValidGmail(email)) {
      return { success: false, error: 'Please enter a valid Gmail address (e.g. example@gmail.com).' };
    }
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, error: 'No account found with this email. Please create an account.' };
    }
    if (found.passwordHash !== simpleHash(password)) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }
    const profile: UserProfile = { name: found.name, email: found.email };
    setUser(profile);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    return { success: true };
  };

  const signup = (name: string, email: string, password: string): { success: boolean; error?: string } => {
    if (!name.trim()) return { success: false, error: 'Full name is required.' };
    if (!isValidGmail(email)) {
      return { success: false, error: 'Please enter a valid Gmail address (e.g. example@gmail.com).' };
    }
    const passError = validatePassword(password);
    if (passError) return { success: false, error: passError };

    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists. Please login.' };
    }
    const newUser: StoredUser = { name: name.trim(), email: email.toLowerCase(), passwordHash: simpleHash(password) };
    saveStoredUsers([...users, newUser]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const changePassword = (currentPassword: string, newPassword: string): { success: boolean; error?: string } => {
    if (!user) return { success: false, error: 'Not logged in.' };
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === user.email.toLowerCase());
    if (!found || found.passwordHash !== simpleHash(currentPassword)) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    const passError = validatePassword(newPassword);
    if (passError) return { success: false, error: passError };
    const updated = users.map((u) =>
      u.email.toLowerCase() === user.email.toLowerCase()
        ? { ...u, passwordHash: simpleHash(newPassword) }
        : u
    );
    saveStoredUsers(updated);
    return { success: true };
  };

  const updateName = (name: string) => {
    if (!user) return;
    const newProfile = { ...user, name };
    setUser(newProfile);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newProfile));
    const users = getStoredUsers();
    const updated = users.map((u) =>
      u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, name } : u
    );
    saveStoredUsers(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, changePassword, updateName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
