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

// Outfit endpoints
export async function getOutfits() {
  return fetchApi('/outfits');
}

export async function getOutfitById(id: number) {
  return fetchApi(`/outfits/${id}`);
}

export async function createOutfit(data: any) {
  return fetchApi('/outfits', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateOutfit(id: number, data: any) {
  return fetchApi(`/outfits/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteOutfit(id: number) {
  return fetchApi(`/outfits/${id}`, {
    method: 'DELETE',
  });
}

// Rental endpoints
export async function getRentals() {
  return fetchApi('/rentals');
}

export async function getUserRentals(userId: number) {
  return fetchApi(`/rentals/user/${userId}`);
}

export async function createRental(data: any) {
  return fetchApi('/rentals', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateRentalStatus(id: number, status: string) {
  return fetchApi(`/rentals/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
