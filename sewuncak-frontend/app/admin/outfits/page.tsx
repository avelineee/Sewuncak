'use client';

import React, { useState } from 'react';
import { MOCK_OUTFITS } from '@/lib/api';
import { Package, Plus, Edit, Trash2, CheckCircle2, Search, X } from 'lucide-react';

export default function AdminOutfitsPage() {
  const [outfits, setOutfits] = useState(MOCK_OUTFITS);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Tenda & Shelter');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState(35000);
  const [stock, setStock] = useState(5);
  const [size, setSize] = useState('L');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800');

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setCategory('Tenda & Shelter');
    setDescription('');
    setPricePerDay(35000);
    setStock(5);
    setSize('L');
    setImageUrl('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800');
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingId(item.id);
    setName(item.name);
    setCategory(item.category);
    setDescription(item.description || '');
    setPricePerDay(item.price_per_day);
    setStock(item.stock);
    setSize(item.size || 'L');
    setImageUrl(item.image_url || '');
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus outfit ini?')) {
      setOutfits((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Edit existing
      setOutfits((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name,
                category,
                description,
                price_per_day: pricePerDay,
                stock,
                size,
                image_url: imageUrl,
              }
            : item
        )
      );
    } else {
      // Add new
      const newItem = {
        id: Date.now(),
        name,
        category,
        description,
        price_per_day: pricePerDay,
        stock,
        size,
        color: 'Outdoor Mix',
        status: 'AVAILABLE',
        image_url: imageUrl,
      };
      setOutfits([newItem, ...outfits]);
    }
    setIsModalOpen(false);
  };

  const filtered = outfits.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Package className="w-8 h-8 text-emerald-400" />
            Kelola Inventaris Outfit
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Tambah, sunting tarif sewa per hari, serta perbarui ketersediaan stok produk.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Outfit Baru</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-500/70" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama outfit atau kategori..."
          className="w-full bg-[#0b1311]/90 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
        />
      </div>

      {/* Outfits Table */}
      <div className="glass-card rounded-3xl overflow-hidden border border-emerald-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1311]/90 border-b border-emerald-900/60 text-gray-400 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-4 px-6">Outfit</th>
                <th className="py-4 px-6">Kategori</th>
                <th className="py-4 px-6">Ukuran</th>
                <th className="py-4 px-6">Tarif / Hari</th>
                <th className="py-4 px-6">Stok</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30 text-gray-300">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-emerald-950/30 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <strong className="text-white block font-bold text-sm">{item.name}</strong>
                      <span className="text-[10px] text-gray-400 line-clamp-1">{item.description}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-amber-400">{item.category}</td>
                  <td className="py-4 px-6">{item.size || 'Standard'}</td>
                  <td className="py-4 px-6 font-bold text-emerald-400">
                    Rp {item.price_per_day.toLocaleString('id-ID')}
                  </td>
                  <td className="py-4 px-6">
                    <span className="badge-available px-2.5 py-1 rounded-full text-[11px] font-bold">
                      {item.stock} Unit
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 hover:bg-emerald-900/60 transition-all"
                        title="Edit Outfit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-red-950/60 border border-red-800/60 text-red-400 hover:bg-red-900/60 transition-all"
                        title="Hapus Outfit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg p-8 rounded-3xl space-y-6 animate-fadeIn border border-emerald-800/60">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4">
              <h2 className="text-lg font-black text-white">
                {editingId ? 'Sunting Data Outfit' : 'Tambah Outfit Baru'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-300 uppercase mb-1">Nama Outfit / Alat</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Tenda Eiger North Mountain 2P"
                  className="w-full bg-[#0b1311] border border-emerald-900/60 rounded-xl py-2.5 px-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0b1311] border border-emerald-900/60 rounded-xl py-2.5 px-3 text-white"
                  >
                    <option value="Tenda & Shelter">Tenda & Shelter</option>
                    <option value="Carrier & Tas">Carrier & Tas</option>
                    <option value="Sepatu Tracking">Sepatu Tracking</option>
                    <option value="Jaket & Outfit">Jaket & Outfit</option>
                    <option value="Alat Masak">Alat Masak</option>
                    <option value="Penerangan">Penerangan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Ukuran / Kapasitas</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="L / 2 Person / 60L"
                    className="w-full bg-[#0b1311] border border-emerald-900/60 rounded-xl py-2.5 px-3 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Harga Sewa / Hari (Rp)</label>
                  <input
                    type="number"
                    required
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(Number(e.target.value))}
                    className="w-full bg-[#0b1311] border border-emerald-900/60 rounded-xl py-2.5 px-3 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 uppercase mb-1">Jumlah Stok</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-[#0b1311] border border-emerald-900/60 rounded-xl py-2.5 px-3 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-300 uppercase mb-1">URL Gambar Outfit</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#0b1311] border border-emerald-900/60 rounded-xl py-2.5 px-3 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 uppercase mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#0b1311] border border-emerald-900/60 rounded-xl py-2.5 px-3 text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-emerald-900 text-gray-400 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-emerald-500 text-slate-950 font-bold"
                >
                  Simpan Outfit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
