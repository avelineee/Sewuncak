'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Mountain,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';
import { MOCK_OUTFITS } from '@/lib/api';
import { useCart } from '@/lib/CartContext';

export default function HomePage() {
  const { addToCart } = useCart();

  const categories = [
    { title: 'Tenda & Shelter', icon: '⛺', count: '12+ Pilihan', desc: 'Tenda anti badai double-layer' },
    { title: 'Carrier & Tas', icon: '🎒', count: '18+ Ukuran', desc: 'Backsystem ergonomis 45L - 80L' },
    { title: 'Sepatu Tracking', icon: '🥾', count: '25+ Pasang', desc: 'Gore-Tex waterproof & anti slip' },
    { title: 'Jaket & Thermal', icon: '🧥', count: '20+ Model', desc: 'Windproof penahan dingin ekstrem' },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>#1 Rental Perlengkapan Gunung & Outdoor Malang</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
                Sewa Outfit Gunung <br />
                <span className="text-gradient-emerald">Siap Taklukkan Puncak</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                Nikmati pendakian impian tanpa perlu membeli alat mahal. Sewuncak menyediakan tenda anti-badai, jaket thermal, sepatu tracking Gore-Tex, dan carrier profesional berstandar internasional.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/outfits"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  <Compass className="w-5 h-5" />
                  <span>Jelajahi Katalog Outfit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-4 rounded-2xl bg-[#13221e] border border-emerald-700/60 text-emerald-300 font-bold text-sm hover:bg-emerald-950/50 hover:border-emerald-400 transition-all"
                >
                  Daftar Akun Baru
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-emerald-900/40">
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-white">5,000+</span>
                  <span className="text-xs text-gray-400">Pendaki Terlayani</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-amber-400">100%</span>
                  <span className="text-xs text-gray-400">Alat Steril & Ready</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-400">4.9 / 5</span>
                  <span className="text-xs text-gray-400">Rating Kepuasan</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000" />
                <div className="relative glass-card p-6 rounded-3xl space-y-6">
                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800"
                      alt="Pendakian Gunung"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> Featured Gear
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">Eiger North Mountain 2P</h3>
                      <p className="text-xs text-emerald-400">Rp 45.000 / Hari</p>
                    </div>
                    <Link
                      href="/outfits/1"
                      className="p-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:scale-110 transition-transform"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori Utama Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
            Kategori Perlengkapan
          </h2>
          <p className="text-3xl font-black text-white">
            Pilihan Lengkap Petualangan Puncak
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <span className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                {cat.count}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{cat.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">{cat.desc}</p>
              <Link
                href="/outfits"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:text-emerald-300"
              >
                <span>Lihat Koleksi</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Outfit Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">
              Favorit Pendaki
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              Koleksi Outfit Terlaris
            </h2>
          </div>
          <Link
            href="/outfits"
            className="flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-white transition-colors"
          >
            <span>Lihat Semua ({MOCK_OUTFITS.length}+ Item)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_OUTFITS.slice(0, 3).map((item) => (
            <div key={item.id} className="glass-card rounded-3xl overflow-hidden flex flex-col group">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 badge-available text-[11px] font-bold px-3 py-1 rounded-full">
                  Ready Stock ({item.stock})
                </span>
                <span className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-amber-400 border border-amber-500/30">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-900/40 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-semibold">Harga Sewa</span>
                    <span className="text-lg font-black text-emerald-400">
                      Rp {item.price_per_day.toLocaleString('id-ID')}
                      <span className="text-xs text-gray-400 font-normal"> /hari</span>
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:scale-105 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Sewa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Sewuncak Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-800/40 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Alat Steril & Terawat</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Setiap alat disterilisasi dan diuji kelayakannya sebelum disewakan untuk keamanan pendaki.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Proses Sewa Instan</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Pilih tanggal rental, lakukan konfirmasi, dan perlengkapan siap dijemput di basecamp atau dikirim.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Harga Sewa Ramah Kantong</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Nikmati perlengkapan kelas dunia tanpa harus mengeluarkan modal beli puluhan juta rupiah.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
