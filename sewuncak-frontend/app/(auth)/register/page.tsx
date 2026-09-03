'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { Compass, UserPlus, Mail, Lock, User, Phone, MapPin, ShieldAlert, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await register({
        name,
        email,
        password,
        phone,
        address,
        role,
      });

      if (role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/outfits');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Pendaftaran gagal. Pastikan email belum terdaftar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-xl shadow-emerald-900/40 mb-4">
            <div className="w-full h-full bg-[#0b1311] rounded-[14px] flex items-center justify-center">
              <Compass className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Buat Akun Sewuncak
          </h1>
          <p className="text-xs text-gray-400 mt-2">
            Bergabunglah dengan ribuan pendaki untuk menyewa perlengkapan kemping & outfit gunung
          </p>
        </div>

        {/* Register Card */}
        <div className="glass-card p-8 rounded-3xl">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800/60 text-red-400 text-xs flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Tipe Pengguna (Role)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('USER')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                    role === 'USER'
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                      : 'bg-[#0b1311] text-gray-400 border-emerald-900/60 hover:text-white'
                  }`}
                >
                  USER (Pendaki Gunung)
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ADMIN')}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                    role === 'ADMIN'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-[#0b1311] text-gray-400 border-emerald-900/60 hover:text-white'
                  }`}
                >
                  ADMIN (Pengelola)
                </button>
              </div>
            </div>

            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-500/70" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Rendi Adventurer"
                  className="w-full bg-[#0b1311]/80 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-500/70" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full bg-[#0b1311]/80 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-500/70" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-[#0b1311]/80 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all"
                />
              </div>
            </div>

            {/* Phone & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  No. Telepon / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-500/70" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full bg-[#0b1311]/80 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Kota / Alamat
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-500/70" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Malang, Jawa Timur"
                    className="w-full bg-[#0b1311]/80 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Mendaftarkan...</span>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Daftar Akun Sewuncak</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 pt-6 border-t border-emerald-900/40 text-center text-xs text-gray-400">
            Sudah memiliki akun?{' '}
            <Link href="/login" className="text-emerald-400 font-bold hover:underline">
              Masuk Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
