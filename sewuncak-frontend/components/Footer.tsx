'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Mountain, ShieldCheck, PhoneCall, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070d0b] border-t border-emerald-900/40 text-gray-400 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/30">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-900/30">
                <div className="w-full h-full bg-[#0b1311] rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-2xl font-black text-white tracking-wider">
                SEWUN<span className="text-emerald-400">CAK</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Platform persewaan outfit dan peralatan outdoor pendakian gunung berkualitas standar internasional. Bebas eksplorasi puncak tanpa terbeban biaya beli alat mahal.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" /> 100% Peralatan Terawat & Steril
            </div>
          </div>

          {/* Navigasi Cepat */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home Landing Page
                </Link>
              </li>
              <li>
                <Link href="/outfits" className="hover:text-emerald-400 transition-colors">
                  Katalog Perlengkapan
                </Link>
              </li>
              <li>
                <Link href="/rental" className="hover:text-emerald-400 transition-colors">
                  Formulir Rental
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-emerald-400 transition-colors">
                  Riwayat Penyewaan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategori Populer */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Kategori Outdoor</h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" /> Tenda & Shelter Waterproof
              </li>
              <li className="flex items-center gap-2">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" /> Carrier & Tas Ergonomis
              </li>
              <li className="flex items-center gap-2">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" /> Sepatu Tracking Anti Slip
              </li>
              <li className="flex items-center gap-2">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" /> Jaket Windproof Thermal
              </li>
            </ul>
          </div>

          {/* Kontak & Lokasi */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Basecamp Sewuncak</h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Puncak Gunung Panderman No. 88, Malang, Jawa Timur</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+62 812-3456-7890 (Customer Service 24/7)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@sewuncak.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Sewuncak Mountain Gear. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-1 text-emerald-400/80 font-medium">
            Dibuat untuk petualang puncak sejati 🏔️
          </p>
        </div>
      </div>
    </footer>
  );
}
