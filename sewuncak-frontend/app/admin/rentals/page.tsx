'use client';

import React, { useState, useEffect } from 'react';
import { getRentals, updateRentalStatus } from '@/lib/api';
import { CalendarCheck, CheckCircle2, Clock, XCircle, ShieldCheck, User } from 'lucide-react';

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRentals = async () => {
    try {
      const res = await getRentals();
      setRentals(Array.isArray(res) ? res : res?.data || []);
    } catch (err) {
      console.error('Failed to load rentals', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await updateRentalStatus(id, status);
      fetchRentals();
    } catch (err) {
      console.error('Failed to update status', err);
      alert('Gagal mengupdate status penyewaan.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <CalendarCheck className="w-8 h-8 text-amber-400" />
          Kelola Transaksi Penyewaan
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Konfirmasi status pengajuan sewa, setujui penyewaan, dan perbarui status pengembalian unit.
        </p>
      </div>

      {/* Transactions List */}
      <div className="space-y-6">
        {rentals.map((rental) => (
          <div key={rental.id} className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-emerald-900/40">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-900/40 pb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  ID Transaksi #{rental.id}
                </span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-1">
                  <User className="w-4 h-4 text-emerald-400" />
                  {rental.users?.name || 'Unknown'} ({rental.users?.email || 'No Email'})
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Tanggal Sewa: <strong className="text-white">{new Date(rental.rental_date).toLocaleDateString()}</strong> s/d <strong className="text-white">{new Date(rental.return_date).toLocaleDateString()}</strong>
                </p>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-semibold mr-2">Ubah Status:</span>
                <button
                  onClick={() => handleUpdateStatus(rental.id, 'APPROVED')}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    rental.status === 'APPROVED'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-[#0b1311] border border-emerald-800/60 text-emerald-400 hover:bg-emerald-900/60'
                  }`}
                >
                  Disetujui
                </button>
                <button
                  onClick={() => handleUpdateStatus(rental.id, 'RENTED')}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    rental.status === 'RENTED'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-[#0b1311] border border-amber-800/60 text-amber-400 hover:bg-amber-900/60'
                  }`}
                >
                  Sedang Disewa
                </button>
                <button
                  onClick={() => handleUpdateStatus(rental.id, 'RETURNED')}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    rental.status === 'RETURNED'
                      ? 'bg-teal-500 text-slate-950 shadow-md'
                      : 'bg-[#0b1311] border border-teal-800/60 text-teal-400 hover:bg-teal-900/60'
                  }`}
                >
                  Dikembalikan
                </button>
                <button
                  onClick={() => handleUpdateStatus(rental.id, 'CANCELLED')}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    rental.status === 'CANCELLED'
                      ? 'bg-red-500 text-slate-950 shadow-md'
                      : 'bg-[#0b1311] border border-red-800/60 text-red-400 hover:bg-red-900/60'
                  }`}
                >
                  Batal
                </button>
              </div>
            </div>

            {/* Items Disewa Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Rincian Outfit Disewa:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(rental.rental_items || rental.items || []).map((item: any, idx: number) => (
                  <div key={idx} className="bg-[#0b1311]/80 border border-emerald-950 p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">{item.outfits?.name || item.name || 'Outfit'}</span>
                      <span className="text-[10px] text-gray-400">Qty: {item.quantity} Unit</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">
                      Rp {(item.subtotal || (item.price_per_day * item.quantity) || 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Summary */}
            <div className="flex justify-between items-center bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/40">
              <span className="text-xs text-gray-300">
                Deposit Jaminan: <strong className="text-amber-400">Rp {(rental.deposit || 0).toLocaleString('id-ID')}</strong>
              </span>
              <span className="text-lg font-black text-emerald-400">
                Total Tagihan: Rp {(rental.total_price || 0).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
