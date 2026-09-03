import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import { CartProvider } from '@/lib/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sewuncak - Persewaan Outfit & Peralatan Mendaki Gunung',
  description: 'Sewa perlengkapan kemping dan hiking profesional dengan harga terjangkau dan kualitas terjamin.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0b1311] text-gray-100 selection:bg-emerald-500 selection:text-slate-950">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
