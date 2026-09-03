const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('sewuncak_token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.message || data?.error || 'Terjadi kesalahan pada server';
    throw new Error(errorMsg);
  }

  return data;
}

// Mock Data fallbacks for outfits & rentals if backend endpoints are empty or local DB is not seeded yet
export const MOCK_OUTFITS = [
  {
    id: 1,
    name: 'Eiger North Mountain Tent 2P',
    category: 'Tenda & Shelter',
    description: 'Tenda kemping double layer kapasitas 2 orang, tahan badai dan hujan deras dengan kelembaban tinggi.',
    size: '2 Person',
    color: 'Forest Green',
    price_per_day: 45000,
    stock: 8,
    status: 'AVAILABLE',
    image_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    name: 'Consina Expedition 60L Carrier',
    category: 'Carrier & Tas',
    description: 'Tas kerir kapasitas 60 Liter dilengkapi backsystem ergonomic presisi tinggi untuk beban berat.',
    size: '60 Liter',
    color: 'Deep Black',
    price_per_day: 35000,
    stock: 12,
    status: 'AVAILABLE',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    name: 'Salomon Quest 4 Gore-Tex Hiking Boots',
    category: 'Sepatu Tracking',
    description: 'Sepatu gunung waterproof berteknologi Gore-Tex anti licin di medan berbatu & berlumpur.',
    size: '42 EU',
    color: 'Earth Brown',
    price_per_day: 50000,
    stock: 5,
    status: 'AVAILABLE',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    name: 'The North Face Summit Series Jacket',
    category: 'Jaket & Outfit',
    description: 'Jaket gunung windproof & waterproof polar thermal penahan suhu ekstrem hingga -5°C.',
    size: 'L',
    color: 'Crimson Red',
    price_per_day: 40000,
    stock: 10,
    status: 'AVAILABLE',
    image_url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    name: 'Naturehike Nest Portable Cooking Set',
    category: 'Alat Masak',
    description: 'Set kompor dan nesting aluminium anti lengket ultra ringan untuk 3-4 pendaki.',
    size: 'Compact',
    color: 'Silver Grey',
    price_per_day: 25000,
    stock: 15,
    status: 'AVAILABLE',
    image_url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    name: 'Black Diamond Headlamp Spot 400',
    category: 'Penerangan',
    description: 'Senter kepala LED waterproof 400 Lumens dengan mode malam merah dan zoom fokus jauh.',
    size: 'Universal',
    color: 'Neon Yellow',
    price_per_day: 15000,
    stock: 20,
    status: 'AVAILABLE',
    image_url: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&q=80&w=800',
  },
];
