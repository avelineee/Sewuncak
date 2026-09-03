'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getOutfitById } from '@/lib/api';
import { useCart } from '@/lib/CartContext';
import {
  ArrowLeft,
  Calendar,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Info,
  Clock,
} from 'lucide-react';

export default function OutfitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart, setRentalDates, startDate, endDate } = useCart();

  const outfitId = Number(resolvedParams.id);
  const [outfit, setOutfit] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const [quantity, setQuantity] = useState(1);
  const [successMsg, setSuccessMsg] = useState(false);

  React.useEffect(() => {
    async function load() {
      try {
        const res = await getOutfitById(outfitId);
        const item = res?.data || res;
        if (item && item.id) {
          setOutfit(item);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [outfitId]);

  const calculateDays = (start: string, end: string) => {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diff = Math.ceil(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const durationDays = calculateDays(localStartDate, localEndDate);
  const totalPrice = outfit ? outfit.price_per_day * durationDays * quantity : 0;

  const handleAddToCart = () => {
    setRentalDates(localStartDate, localEndDate);
    addToCart(outfit, quantity);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const handleDirectRent = () => {
    setRentalDates(localStartDate, localEndDate);
    addToCart(outfit, quantity);
    router.push('/rental');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  if (!outfit) {
    return (
      <div className="text-center py-20 text-white">
        Outfit tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button */}
      <Link
        href="/outfits"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Katalog Outfit</span>
      </Link>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Image Showcase */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-3xl overflow-hidden relative h-[400px] sm:h-[480px]">
            <img
              src={outfit.image_url}
              alt={outfit.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-6 left-6 badge-available text-xs font-bold px-4 py-1.5 rounded-full backdrop-blur-md">
              Ready Stock ({outfit.stock} unit)
            </span>
            <span className="absolute bottom-6 right-6 bg-slate-950/80 backdrop-blur-md text-xs font-bold text-amber-400 px-4 py-1.5 rounded-full border border-amber-500/30">
              {outfit.category}
            </span>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-2xl text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <span className="block text-[11px] font-bold text-white">Steril 100%</span>
              <span className="text-[10px] text-gray-400">Dibersihkan rutin</span>
            </div>
            <div className="glass-panel p-4 rounded-2xl text-center">
              <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <span className="block text-[11px] font-bold text-white">Garansi Rusak</span>
              <span className="text-[10px] text-gray-400">Asuransi pemakaian</span>
            </div>
            <div className="glass-panel p-4 rounded-2xl text-center">
              <Clock className="w-5 h-5 text-teal-400 mx-auto mb-1" />
              <span className="block text-[11px] font-bold text-white">Pengambilan 24H</span>
              <span className="text-[10px] text-gray-400">Basecamp Malang</span>
            </div>
          </div>
        </div>

        {/* Right Info & Rental Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Spesifikasi Perlengkapan
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 leading-snug">
                {outfit.name}
              </h1>
              <div className="mt-3 flex items-center gap-4 text-xs">
                <span className="text-gray-400">Ukuran: <strong className="text-white">{outfit.size || 'Standard'}</strong></span>
                <span className="text-gray-400">Warna: <strong className="text-white">{outfit.color || 'Outdoor Mixed'}</strong></span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed border-t border-b border-emerald-900/40 py-4">
              {outfit.description}
            </p>

            {/* Price Badge */}
            <div className="bg-[#0b1311]/80 border border-emerald-800/40 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-gray-400 uppercase font-semibold">Harga Sewa Standar</span>
                <span className="text-2xl font-black text-emerald-400">
                  Rp {outfit.price_per_day.toLocaleString('id-ID')}
                  <span className="text-xs text-gray-400 font-normal"> /hari</span>
                </span>
              </div>
            </div>

            {/* Rental Date Picker */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                Pilih Durasi Sewa
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block text-[10px] text-gray-400 mb-1">Tanggal Sewa (Mulai)</span>
                  <input
                    type="date"
                    value={localStartDate}
                    onChange={(e) => setLocalStartDate(e.target.value)}
                    className="w-full bg-[#0b1311] border border-emerald-900/60 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 mb-1">Tanggal Kembali (Selesai)</span>
                  <input
                    type="date"
                    value={localEndDate}
                    onChange={(e) => setLocalEndDate(e.target.value)}
                    className="w-full bg-[#0b1311] border border-emerald-900/60 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-gray-300">Jumlah Unit:</span>
                <div className="flex items-center gap-3 bg-[#0b1311] border border-emerald-900/60 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 font-bold hover:bg-emerald-900"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-white px-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(outfit.stock, quantity + 1))}
                    className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 font-bold hover:bg-emerald-900"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Total Price Calculation Box */}
            <div className="bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-2xl space-y-2">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Durasi Penyewaan:</span>
                <strong className="text-white">{durationDays} Hari</strong>
              </div>
              <div className="flex justify-between text-xs text-gray-300">
                <span>Estimasi Biaya Sewa:</span>
                <strong className="text-emerald-400 text-sm">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </strong>
              </div>
            </div>

            {/* Toast feedback */}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Outfit berhasil ditambahkan ke keranjang sewa!</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="py-3.5 px-4 rounded-2xl bg-[#0b1311] border border-emerald-600 text-emerald-400 font-bold text-xs hover:bg-emerald-950/60 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>+ Keranjang</span>
              </button>
              <button
                onClick={handleDirectRent}
                className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
              >
                Sewa Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
