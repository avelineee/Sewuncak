'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { fetchApi } from '@/lib/api';
import { User, Mail, Phone, MapPin, ShieldCheck, Edit, CheckCircle2, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, token, setUser, logout } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const updated = {
      ...user,
      name,
      phone,
      address,
    };
    setUser(updated);
    localStorage.setItem('sewuncak_user', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Silakan masuk/login terlebih dahulu.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-900/30">
          <div className="w-full h-full bg-[#0b1311] rounded-[22px] flex items-center justify-center font-black text-2xl text-emerald-400">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{user.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="badge-available px-3 py-0.5 rounded-full text-xs font-bold">
              {user.role} SEWUNCAK
            </span>
            <span className="text-xs text-gray-400">{user.email}</span>
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <div className="glass-card p-8 rounded-3xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-400" /> Pengaturan Identitas Akun
        </h2>

        {saved && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Perubahan profil berhasil disimpan!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-500/70" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0b1311]/90 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Email (Terverifikasi)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full bg-[#0b1311]/40 border border-emerald-950/60 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full bg-[#0b1311]/90 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                Alamat / Kota Domisili
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-500/70" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#0b1311]/90 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:scale-105 transition-all shadow-md shadow-emerald-500/20"
            >
              Simpan Perubahan
            </button>

            <button
              type="button"
              onClick={logout}
              className="py-3 px-6 rounded-xl bg-red-950/40 border border-red-800/50 text-red-400 font-semibold text-xs hover:bg-red-900/50 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Keluar dari Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
