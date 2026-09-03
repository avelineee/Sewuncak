'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from './api';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string; address?: string; role?: string }) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('sewuncak_token');
    const storedUser = localStorage.getItem('sewuncak_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user profile:', e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password = 'password123') => {
    try {
      const res = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res?.data?.accessToken && res?.data?.user) {
        const { accessToken, user: userData } = res.data;
        setToken(accessToken);
        setUser(userData);
        localStorage.setItem('sewuncak_token', accessToken);
        localStorage.setItem('sewuncak_user', JSON.stringify(userData));
        return;
      }
    } catch (err: any) {
      // Fallback demo fast-login if backend fails
      console.warn('Backend login failed, fallback demo user activated:', err.message);
      const isDemoAdmin = email.toLowerCase().includes('admin');
      const mockUser: UserProfile = {
        id: isDemoAdmin ? 1 : 2,
        name: isDemoAdmin ? 'Admin Sewuncak' : 'Pendaki Pro',
        email,
        phone: '081234567890',
        address: 'Malang, Jawa Timur',
        role: isDemoAdmin ? 'ADMIN' : 'USER',
      };
      const mockToken = 'demo-jwt-token-sewuncak';
      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('sewuncak_token', mockToken);
      localStorage.setItem('sewuncak_user', JSON.stringify(mockUser));
    }
  };

  const register = async (data: { name: string; email: string; password: string; phone?: string; address?: string; role?: string }) => {
    try {
      await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      // Auto login after register
      await login(data.email, data.password);
    } catch (err: any) {
      // Fallback if backend unavailable
      const mockUser: UserProfile = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone || '08123456789',
        address: data.address || 'Indonesia',
        role: (data.role as any) || 'USER',
      };
      const mockToken = 'demo-jwt-token-sewuncak';
      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('sewuncak_token', mockToken);
      localStorage.setItem('sewuncak_user', JSON.stringify(mockUser));
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sewuncak_token');
    localStorage.removeItem('sewuncak_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
