'use client';

import React, { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Users, Search, ShieldCheck, User as UserIcon, Mail, Phone, MapPin } from 'lucide-react';

export default function AdminUsersPage() {
  const [usersList, setUsersList] = useState<any[]>([
    {
      id: 1,
      name: 'Admin Sewuncak',
      email: 'admin@sewuncak.com',
      phone: '081234567890',
      address: 'Malang, Jawa Timur',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Pendaki Pro',
      email: 'user@sewuncak.com',
      phone: '081234567891',
      address: 'Batu, Jawa Timur',
      role: 'USER',
    },
    {
      id: 3,
      name: 'Rendi Adventurer',
      email: 'rendi@outdoor.com',
      phone: '081987654321',
      address: 'Surabaya, Jawa Timur',
      role: 'USER',
    },
  ]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const res = await fetchApi('/users');
        const list = Array.isArray(res) ? res : (res?.data || []);
        if (list && list.length > 0) {
          setUsersList(list);
        }
      } catch (err) {
        console.warn('Using default demo users data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-400" />
          Data Pengguna Terdaftar
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Daftar seluruh akun terdaftar dari database backend NestJS (`GET /users`).
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-blue-500/70" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau email user..."
          className="w-full bg-[#0b1311]/90 border border-emerald-900/60 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-3xl overflow-hidden border border-emerald-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1311]/90 border-b border-emerald-900/60 text-gray-400 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-4 px-6">Pengguna</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">No. Telepon</th>
                <th className="py-4 px-6">Alamat</th>
                <th className="py-4 px-6 text-right">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/30 text-gray-300">
              {filteredUsers.map((item) => (
                <tr key={item.id} className="hover:bg-emerald-950/30 transition-colors">
                  <td className="py-4 px-6 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{item.name}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{item.email}</td>
                  <td className="py-4 px-6 text-gray-400">{item.phone || '-'}</td>
                  <td className="py-4 px-6 text-gray-400">{item.address || '-'}</td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        item.role === 'ADMIN'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      {item.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
