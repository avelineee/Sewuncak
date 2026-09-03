'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useCart } from '@/lib/CartContext';
import {
  Compass,
  ShoppingBag,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Package,
  History,
  LayoutDashboard,
  Users,
  CalendarCheck,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b1311] rounded-[10px] flex items-center justify-center">
                <Compass className="w-6 h-6 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider text-white flex items-center gap-1">
                SEWUN<span className="text-emerald-400">CAK</span>
              </span>
              <span className="block text-[10px] font-medium tracking-widest text-emerald-500 uppercase -mt-1">
                Mountain Gear Rental
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-[#13221e]/80 border border-emerald-900/40 p-1.5 rounded-full backdrop-blur-md">
            {user?.role === 'ADMIN' ? (
              // ADMIN MENU
              <>
                <Link
                  href="/admin/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive('/admin/dashboard')
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/40'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/outfits"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive('/admin/outfits')
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/40'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  Kelola Outfit
                </Link>
                <Link
                  href="/admin/rentals"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive('/admin/rentals')
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/40'
                  }`}
                >
                  <CalendarCheck className="w-4 h-4" />
                  Kelola Rental
                </Link>
                <Link
                  href="/admin/users"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive('/admin/users')
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/40'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Data User
                </Link>
              </>
            ) : (
              // USER & GUEST MENU
              <>
                <Link
                  href="/"
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive('/')
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/40'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/outfits"
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive('/outfits')
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/40'
                  }`}
                >
                  Katalog Outfit
                </Link>
                {user && (
                  <Link
                    href="/history"
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      isActive('/history')
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/40'
                    }`}
                  >
                    <History className="w-4 h-4" />
                    Riwayat Rental
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon (For Users) */}
            {user?.role !== 'ADMIN' && (
              <Link
                href="/rental"
                className="relative p-2.5 rounded-full bg-[#13221e] border border-emerald-800/50 text-emerald-400 hover:border-emerald-400 transition-all group"
                title="Keranjang Sewa"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-bold flex items-center justify-center animate-bounce shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#13221e] border border-emerald-700/50 text-white hover:border-emerald-400 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left leading-tight">
                    <span className="block text-xs font-semibold text-white max-w-[100px] truncate">{user.name}</span>
                    <span className="block text-[10px] text-emerald-400 font-medium">{user.role}</span>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="p-2.5 rounded-full bg-red-950/30 border border-red-800/40 text-red-400 hover:bg-red-900/50 hover:border-red-500 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full text-xs font-semibold text-emerald-300 hover:text-white hover:bg-emerald-950/50 border border-emerald-800/60 transition-all"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20 hover:scale-105 transition-all"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            {user?.role !== 'ADMIN' && (
              <Link href="/rental" className="relative p-2 text-emerald-400">
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-emerald-900/60 bg-[#0b1311]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {user?.role === 'ADMIN' ? (
            <>
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/30"
              >
                Dashboard Admin
              </Link>
              <Link
                href="/admin/outfits"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/30"
              >
                Kelola Outfit
              </Link>
              <Link
                href="/admin/rentals"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/30"
              >
                Kelola Rental
              </Link>
              <Link
                href="/admin/users"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/30"
              >
                Data User
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/30"
              >
                Home
              </Link>
              <Link
                href="/outfits"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/30"
              >
                Katalog Outfit
              </Link>
              {user && (
                <Link
                  href="/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:bg-emerald-900/30"
                >
                  Riwayat Rental
                </Link>
              )}
            </>
          )}

          <div className="pt-3 border-t border-emerald-900/40">
            {user ? (
              <div className="space-y-2">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Profile ({user.name})</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-red-950/40 border border-red-800/50 text-red-400 font-semibold"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl text-sm font-semibold border border-emerald-800 text-emerald-300"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl text-sm font-bold bg-emerald-500 text-slate-950"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
