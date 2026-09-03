'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useCart } from '@/lib/CartContext';
import { MOCK_OUTFITS } from '@/lib/api';
import {
  LayoutDashboard,
  Package,
  CalendarCheck,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { rentals } = useCart();

  const totalOutfitCount = MOCK_OUTFITS.length;
  const totalRentalsCount = rentals.length;
  const totalRevenue = rentals.reduce((acc, r) => acc + r.total_price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 border border-amber-800/60 px-3.5 py-1.5 rounded-full inline-block mb-2">
            Panel Pengelola Admin
          </span>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-emerald-400" />
            Dashboard Administrasi Sewuncak
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Pantau inventaris outfit, transaksi penyewaan aktif, dan data pendaki gunung.
          </p>
        </div>

        <Link
          href="/admin/outfits"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Outfit Baru</span>
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Total Outfit</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <span className="block text-3xl font-black text-white">{totalOutfitCount}</span>
          <span className="text-[10px] text-emerald-400 font-semibold">Tersedia dalam katalog</span>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Total Penyewaan</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <span className="block text-3xl font-black text-amber-400">{totalRentalsCount}</span>
          <span className="text-[10px] text-amber-400 font-semibold">Transaksi sewa tercatat</span>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">Pendapatan Rental</span>
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <span className="block text-2xl font-black text-emerald-400">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </span>
          <span className="text-[10px] text-teal-400 font-semibold">Estimasi omset persewaan</span>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase">User Terdaftar</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <span className="block text-3xl font-black text-white">25+</span>
          <span className="text-[10px] text-blue-400 font-semibold">Member pendaki aktif</span>
        </div>
      </div>

      {/* Quick Nav Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/outfits"
          className="glass-card p-8 rounded-3xl group hover:-translate-y-1 transition-all space-y-4 border border-emerald-900/40"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
            Kelola Data Outfit
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Tambah produk baru, ubah tarif sewa per hari, atur jumlah stok, dan hapus item lama.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
            Kelola Outfit <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          href="/admin/rentals"
          className="glass-card p-8 rounded-3xl group hover:-translate-y-1 transition-all space-y-4 border border-emerald-900/40"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
            Kelola Transaksi Rental
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Pantau status transaksi pendaki, konfirmasi persetujuan sewa, dan pengembalian unit.
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
            Kelola Rental <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          href="/admin/users"
          className="glass-card p-8 rounded-3xl group hover:-translate-y-1 transition-all space-y-4 border border-emerald-900/40"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            Data Pengguna Terdaftar
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Lihat daftar lengkap pengguna yang terdaftar di database NestJS backend (`/users`).
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
            Lihat Users <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
