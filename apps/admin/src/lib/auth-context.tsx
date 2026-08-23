'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api, ApiError } from './api';

export type AdminRole = 'SUPER_ADMIN' | 'EDITOR' | 'VIEWER';

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: AdminRole;
}

interface AuthContextValue {
  user: CurrentUser | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const me = await api.get<CurrentUser>('/admin/auth/me');
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (identifier: string, password: string) => {
    const { user: loggedInUser } = await api.post<{ user: CurrentUser }>('/admin/auth/login', {
      identifier,
      password,
    });
    setUser(loggedInUser);
  }, []);

  const logout = useCallback(async () => {
    await api.post('/admin/auth/logout');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { ApiError };
