'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { useCart } from '@/lib/CartContext';
import { History, Calendar, CheckCircle2, Clock, AlertTriangle, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HistoryPage() {
  const { user } = useAuth();
  const { rentals } = useCart();

  const userRentals = user
    ? rentals.filter((r) => r.user_email === user.email || r.user_name === user.name)
    : rentals;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="badge-available px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Disetujui
          </span>
        );
      case 'RENTED':
        return (
          <span className="badge-rented px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Sedang Disewa
          </span>
        );
      case 'RETURNED':
        return (
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Dikembalikan
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Dibatalkan
          </span>
        );
      default:
        return (
          <span className="badge-pending px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Menunggu Konfirmasi
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <History className="w-8 h-8 text-emerald-400" />
          Riwayat Penyewaan Saya
        </h1>
        <p className="text-xs text-gray-400">
          Pantau status persetujuan, tanggal pengembalian, dan rincian transaksi sewa outfit Anda.
        </p>
      </div>

      {userRentals.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-950/60 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
            📜
          </div>
          <h3 className="text-xl font-bold text-white">Belum Ada Riwayat Sewa</h3>
          <p className="text-xs text-gray-400">
            Anda belum memiliki transaksi sewa outfit atau perlengkapan gunung di Sewuncak.
          </p>
          <Link
            href="/outfits"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:scale-105 transition-all"
          >
            Mulai Sewa Sekarang <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {userRentals.map((rental) => (
            <div key={rental.id} className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-emerald-900/40">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/40 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                    ID Transaksi #{rental.id}
                  </span>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {rental.rental_date} s/d {rental.return_date} ({rental.days} Hari)
                    </span>
                  </div>
                </div>

                <div>{getStatusBadge(rental.status)}</div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Perlengkapan Yang Disewa:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rental.items.map((item, idx) => (
                    <div key={idx} className="bg-[#0b1311]/80 border border-emerald-950 p-3.5 rounded-2xl flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                        🎒
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <span className="text-[10px] text-gray-400 block">
                          Qty: {item.quantity} x Rp {item.price_per_day.toLocaleString('id-ID')} /hr
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Summary */}
              <div className="bg-emerald-950/40 border border-emerald-800/40 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-xs text-gray-300">
                  <span>Uang Jaminan: </span>
                  <strong className="text-amber-400">Rp {rental.deposit.toLocaleString('id-ID')}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Total Pembayaran</span>
                  <span className="text-xl font-black text-emerald-400">
                    Rp {rental.total_price.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
