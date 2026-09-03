'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ShoppingBag, Eye, Star, ChevronDown, Check } from 'lucide-react';
import { getOutfits } from '@/lib/api';
import { useCart } from '@/lib/CartContext';

export default function OutfitsPage() {
  const { addToCart } = useCart();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [sortBy, setSortBy] = useState<'PRICE_ASC' | 'PRICE_DESC' | 'NAME'>('PRICE_ASC');
  
  const [outfits, setOutfits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getOutfits();
        setOutfits(Array.isArray(res) ? res : res?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const categories = [
    { key: 'ALL', label: 'Semua Outfit' },
    { key: 'Tenda & Shelter', label: '⛺ Tenda & Shelter' },
    { key: 'Carrier & Tas', label: '🎒 Carrier & Tas' },
    { key: 'Sepatu Tracking', label: '🥾 Sepatu Tracking' },
    { key: 'Jaket & Outfit', label: '🧥 Jaket & Outfit' },
    { key: 'Alat Masak', label: '🍳 Alat Masak' },
    { key: 'Penerangan', label: '🔦 Penerangan' },
  ];

  const filteredOutfits = outfits.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesPrice = item.price_per_day <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'PRICE_ASC') return a.price_per_day - b.price_per_day;
    if (sortBy === 'PRICE_DESC') return b.price_per_day - a.price_per_day;
    return a.name.localeCompare(b.name);
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/60 border border-emerald-800/60 px-4 py-1.5 rounded-full inline-block">
          Katalog Sewuncak Outdoor
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Daftar Outfit & Perlengkapan Gunung
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Pilih perlengkapan sesuai kebutuhan pendakian Anda dengan standar kualitas teruji.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-6 rounded-3xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Field */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-emerald-500/70" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama outfit, tenda, sepatu..."
              className="w-full bg-[#0b1311]/90 border border-emerald-900/60 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Max Price Filter */}
          <div className="md:col-span-4 flex items-center gap-3 bg-[#0b1311]/90 border border-emerald-900/60 px-4 py-2 rounded-2xl">
            <div className="text-xs font-bold text-gray-400 shrink-0">
              Maks: <span className="text-emerald-400">Rp {maxPrice.toLocaleString('id-ID')}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={100000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full bg-[#0b1311]/90 border border-emerald-900/60 rounded-2xl py-3 px-4 text-xs font-bold text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="PRICE_ASC">Harga: Termurah dulu</option>
              <option value="PRICE_DESC">Harga: Termahal dulu</option>
              <option value="NAME">Nama Outfit (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-[#0b1311] text-gray-400 hover:text-white border border-emerald-900/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Outfit Grid */}
      {filteredOutfits.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <h3 className="text-lg font-bold text-white">Outfit Tidak Ditemukan</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Tidak ada perlengkapan yang sesuai dengan filter pencarian Anda. Coba atur ulang kata kunci atau harga maksimum.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('ALL');
              setMaxPrice(100000);
            }}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOutfits.map((item) => (
            <div key={item.id} className="glass-card rounded-3xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300">
              {/* Image & Badge */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 badge-available text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
                  Stock: {item.stock}
                </span>
                <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                  {item.size || 'Standard'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mt-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="pt-4 border-t border-emerald-900/40 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Tarif Per Hari</span>
                    <span className="text-xl font-black text-emerald-400">
                      Rp {item.price_per_day.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/outfits/${item.id}`}
                      className="py-2.5 px-3 rounded-xl bg-[#0b1311] border border-emerald-800/60 text-emerald-300 font-bold text-xs text-center hover:bg-emerald-950/60 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-4 h-4" />
                      Detail
                    </Link>
                    <button
                      onClick={() => addToCart(item)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs text-center hover:scale-105 transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Sewa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
