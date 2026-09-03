'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { Compass, LogIn, Lock, Mail, ArrowRight, ShieldAlert, Sparkles, User, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await login(email, password);
      if (role === 'ADMIN' || email.toLowerCase().includes('admin')) {
        router.push('/admin/dashboard');
      } else {
        router.push('/outfits');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (demoRole: 'USER' | 'ADMIN') => {
    setRole(demoRole);
    if (demoRole === 'ADMIN') {
      setEmail('admin@sewuncak.com');
      setPassword('admin123');
    } else {
      setEmail('user@sewuncak.com');
      setPassword('user123');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-xl shadow-emerald-900/40 mb-4">
            <div className="w-full h-full bg-[#0b1311] rounded-[14px] flex items-center justify-center">
              <Compass className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Selamat Datang Kembali
          </h1>
          <p className="text-xs text-gray-400 mt-2">
            Masuk ke akun Sewuncak untuk melakukan penyewaan outfit gunung
          </p>
        </div>

        {/* Demo Fast Fill Buttons */}
        <div className="glass-panel p-3 rounded-2xl mb-6 border border-emerald-800/40 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Quick Demo Fill
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount('USER')}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-950/60 border border-emerald-700/50 hover:bg-emerald-900/60 text-xs font-semibold text-emerald-300 transition-all"
            >
              <User className="w-3.5 h-3.5" /> Akun User Demo
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('ADMIN')}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-950/40 border border-amber-700/50 hover:bg-amber-900/50 text-xs font-semibold text-amber-300 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Akun Admin Demo
            </button>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="glass-card p-8 rounded-3xl">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800/60 text-red-400 text-xs flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-500/70" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full bg-[#0b1311]/80 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-500/70" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0b1311]/80 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Memproses...</span>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Masuk Ke Sewuncak</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 pt-6 border-t border-emerald-900/40 text-center text-xs text-gray-400">
            Belum punya akun Sewuncak?{' '}
            <Link href="/register" className="text-emerald-400 font-bold hover:underline">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
