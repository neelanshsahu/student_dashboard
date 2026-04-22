// ============================================================
// AuthContext.jsx — Authentication context using localStorage
// ============================================================
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

/**
 * Derive a readable display name from an email address.
 * e.g. "neelansh.sahu@krmu.edu.in" → "Neelansh Sahu"
 */
function nameFromEmail(email) {
  const local = email.split('@')[0]; // "neelansh.sahu"
  return local
    .split(/[._-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore existing session on page load
    const session = localStorage.getItem('sd_session');
    if (session) setUser(JSON.parse(session));
    setLoading(false);
  }, []);

  /**
   * login(email, password)
   *
   * Two behaviours:
   *  • If email already registered → validate password.
   *  • If email is NEW (first time) → auto-create the account and log in.
   *
   * This means ANY email — including @krmu.edu.in — works on the first try.
   * Just enter your email and pick any password (min 4 chars).
   */
  const login = (email, password) => {
    if (!password || password.length < 4) {
      throw new Error('Password must be at least 4 characters');
    }

    const users = JSON.parse(localStorage.getItem('sd_users') || '[]');
    const existing = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    let sessionUser;

    if (existing) {
      // Known user — check password
      if (existing.password !== password) {
        throw new Error('Incorrect password. Try again or sign up.');
      }
      sessionUser = existing;
    } else {
      // Unknown email — auto-register (first-time login)
      const newUser = {
        name: nameFromEmail(email),
        email: email.toLowerCase(),
        password,
        rollNumber: '', // fill in Profile page later
      };
      localStorage.setItem('sd_users', JSON.stringify([...users, newUser]));
      sessionUser = newUser;
    }

    const session = {
      name: sessionUser.name,
      email: sessionUser.email,
      rollNumber: sessionUser.rollNumber,
    };
    localStorage.setItem('sd_session', JSON.stringify(session));
    setUser(session);
    return session;
  };

  /**
   * signup(name, email, password, rollNumber)
   * Explicit registration from the Signup page.
   */
  const signup = (name, email, password, rollNumber) => {
    const users = JSON.parse(localStorage.getItem('sd_users') || '[]');
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already registered — please login instead');
    }
    const newUser = { name, email: email.toLowerCase(), password, rollNumber };
    localStorage.setItem('sd_users', JSON.stringify([...users, newUser]));
    const session = { name, email: email.toLowerCase(), rollNumber };
    localStorage.setItem('sd_session', JSON.stringify(session));
    setUser(session);
    return session;
  };

  const logout = () => {
    localStorage.removeItem('sd_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
