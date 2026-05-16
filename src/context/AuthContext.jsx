import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("foodapp_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("foodapp_user");
      }
    }
    setLoading(false);
  }, []);

  // Signup — store new user in a users registry + set current session
  const signup = useCallback(({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("foodapp_users") || "[]");
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error("An account with this email already exists.");

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // plain text only — no real backend, no security requirement
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("foodapp_users", JSON.stringify(users));

    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar };
    localStorage.setItem("foodapp_user", JSON.stringify(sessionUser));
    setUser(sessionUser);
    return sessionUser;
  }, []);

  // Login — validate against stored users registry
  const login = useCallback(({ email, password, remember }) => {
    const users = JSON.parse(localStorage.getItem("foodapp_users") || "[]");
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    // Allow any email/password if no users registered yet (demo mode)
    const sessionUser = found
      ? { id: found.id, name: found.name, email: found.email, avatar: found.avatar }
      : {
          id: `guest_${Date.now()}`,
          name: email.split("@")[0],
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        };

    if (remember) {
      localStorage.setItem("foodapp_user", JSON.stringify(sessionUser));
    } else {
      sessionStorage.setItem("foodapp_user", JSON.stringify(sessionUser));
    }
    localStorage.setItem("foodapp_user", JSON.stringify(sessionUser));
    setUser(sessionUser);
    return sessionUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("foodapp_user");
    sessionStorage.removeItem("foodapp_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
