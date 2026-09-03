'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useCart } from '@/lib/CartContext';
import {
  ShoppingBag,
  Trash2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  Phone,
  CreditCard,
} from 'lucide-react';

export default function RentalCheckoutPage() {
  const { user } = useAuth();
  const { cart, startDate, endDate, daysDuration, removeFromCart, updateQuantity, clearCart, addRentalTransaction } = useCart();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'TRANSFER' | 'BASECAMP'>('QRIS');
  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price_per_day * item.quantity * daysDuration, 0);
  const deposit = subtotal > 0 ? 50000 : 0;
  const totalPay = subtotal + deposit;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }
    if (cart.length === 0) return;

    addRentalTransaction({
      rental_date: startDate,
      return_date: endDate,
      days: daysDuration,
      items: cart,
      total_price: totalPay,
      deposit: deposit,
      status: 'PENDING',
      user_name: user.name,
      user_email: user.email,
      user_phone: user.phone || '081234567890',
    });

    setSuccess(true);
    setTimeout(() => {
      router.push('/history');
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="glass-card p-10 rounded-3xl text-center max-w-md space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto text-3xl animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white">Penyewaan Berhasil Diajukan!</h2>
          <p className="text-xs text-gray-300">
            Transaksi sewa Anda telah dicatat. Mengalihkan ke riwayat penyewaan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-emerald-400" />
          Formulir & Keranjang Sewa
        </h1>
        <p className="text-xs text-gray-400">
          Periksa kembali daftar perlengkapan gunung dan pilih metode pembayaran rental Anda.
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-950/60 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
            🎒
          </div>
          <h3 className="text-xl font-bold text-white">Keranjang Sewa Kosong</h3>
          <p className="text-xs text-gray-400">
            Anda belum menambahkan perlengkapan apapun ke keranjang sewa.
          </p>
          <Link
            href="/outfits"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:scale-105 transition-all"
          >
            Lihat Katalog Outfit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Cart List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                Daftar Item ({cart.length} Outfit)
              </h2>
              <button
                onClick={clearCart}
                className="text-xs text-red-400 hover:underline font-semibold"
              >
                Kosongkan Keranjang
              </button>
            </div>

            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-4 rounded-2xl flex items-center gap-4 border border-emerald-900/40"
                >
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4'}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">{item.category}</span>
                    <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                    <p className="text-xs text-emerald-400 font-semibold mt-1">
                      Rp {item.price_per_day.toLocaleString('id-ID')} / hari
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-[#0b1311] border border-emerald-900/60 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-emerald-950 text-emerald-400 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-white px-1.5">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-emerald-950 text-emerald-400 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Durasi & Tanggal Box */}
            <div className="glass-panel p-6 rounded-2xl space-y-3 border border-emerald-800/40">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Calendar className="w-4 h-4" /> Durasi Sewa Aktif
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-300">
                <div>
                  <span className="block text-[10px] text-gray-400">Mulai:</span>
                  <strong className="text-white text-sm">{startDate}</strong>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400">Selesai:</span>
                  <strong className="text-white text-sm">{endDate}</strong>
                </div>
              </div>
              <div className="pt-2 text-xs text-amber-400 font-bold">
                Total Durasi: {daysDuration} Hari Penyewaan
              </div>
            </div>
          </div>

          {/* Right Summary & Checkout Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <h2 className="text-lg font-black text-white">Ringkasan Biaya Rental</h2>

              <div className="space-y-3 text-xs border-b border-emerald-900/40 pb-4">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal Sewa ({daysDuration} hari)</span>
                  <strong className="text-white">Rp {subtotal.toLocaleString('id-ID')}</strong>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Uang Jaminan (Deposit)</span>
                  <strong className="text-amber-400">Rp {deposit.toLocaleString('id-ID')}</strong>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-black text-white">
                <span>Total Pembayaran</span>
                <span className="text-2xl text-emerald-400">
                  Rp {totalPay.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Pilih Pembayaran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('QRIS')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'QRIS'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                        : 'bg-[#0b1311] text-gray-400 border-emerald-900/60'
                    }`}
                  >
                    QRIS Instan
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('TRANSFER')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'TRANSFER'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                        : 'bg-[#0b1311] text-gray-400 border-emerald-900/60'
                    }`}
                  >
                    Transfer BCA
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('BASECAMP')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'BASECAMP'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                        : 'bg-[#0b1311] text-gray-400 border-emerald-900/60'
                    }`}
                  >
                    Bayar Basecamp
                  </button>
                </div>
              </div>

              {/* User Check Note */}
              {!user && (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Anda akan diminta masuk/login saat menekan tombol pengajuan sewa.</span>
                </div>
              )}

              {/* Submit Form */}
              <form onSubmit={handleCheckout}>
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Ajukan Penyewaan Sekarang</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
