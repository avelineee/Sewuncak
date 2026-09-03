'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  category: string;
  price_per_day: number;
  image_url?: string;
  size?: string;
  quantity: number;
}

export interface RentalTransaction {
  id: number;
  rental_date: string;
  return_date: string;
  days: number;
  items: CartItem[];
  total_price: number;
  deposit: number;
  status: 'PENDING' | 'APPROVED' | 'RENTED' | 'RETURNED' | 'CANCELLED';
  user_name: string;
  user_email: string;
  user_phone: string;
  created_at: string;
}

interface CartContextType {
  cart: CartItem[];
  startDate: string;
  endDate: string;
  daysDuration: number;
  addToCart: (item: any, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  setRentalDates: (start: string, end: string) => void;
  rentals: RentalTransaction[];
  addRentalTransaction: (rental: Omit<RentalTransaction, 'id' | 'created_at'>) => void;
  updateRentalStatus: (id: number, status: RentalTransaction['status']) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [startDate, setStartDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState<string>(() => {
    const nextThreeDays = new Date();
    nextThreeDays.setDate(nextThreeDays.getDate() + 3);
    return nextThreeDays.toISOString().split('T')[0];
  });

  const [rentals, setRentals] = useState<RentalTransaction[]>([
    {
      id: 101,
      rental_date: '2026-09-10',
      return_date: '2026-09-13',
      days: 3,
      items: [
        {
          id: 1,
          name: 'Eiger North Mountain Tent 2P',
          category: 'Tenda & Shelter',
          price_per_day: 45000,
          size: '2 Person',
          quantity: 1,
        },
        {
          id: 4,
          name: 'The North Face Summit Series Jacket',
          category: 'Jaket & Outfit',
          price_per_day: 40000,
          size: 'L',
          quantity: 1,
        },
      ],
      total_price: 255000,
      deposit: 100000,
      status: 'APPROVED',
      user_name: 'Pendaki Pro',
      user_email: 'user@sewuncak.com',
      user_phone: '081234567891',
      created_at: '2026-09-02T10:00:00Z',
    },
  ]);

  useEffect(() => {
    const storedCart = localStorage.getItem('sewuncak_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {}
    }
    const storedRentals = localStorage.getItem('sewuncak_rentals');
    if (storedRentals) {
      try {
        setRentals(JSON.parse(storedRentals));
      } catch (e) {}
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('sewuncak_cart', JSON.stringify(newCart));
  };

  const saveRentals = (newRentals: RentalTransaction[]) => {
    setRentals(newRentals);
    localStorage.setItem('sewuncak_rentals', JSON.stringify(newRentals));
  };

  const calculateDays = (startStr: string, endStr: string) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const daysDuration = calculateDays(startDate, endDate);

  const addToCart = (item: any, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
      } else {
        updated = [
          ...prev,
          {
            id: item.id,
            name: item.name,
            category: item.category,
            price_per_day: item.price_per_day,
            image_url: item.image_url,
            size: item.size,
            quantity: qty,
          },
        ];
      }
      saveCart(updated);
      return updated;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveCart(updated);
      return updated;
    });
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item));
      saveCart(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('sewuncak_cart');
  };

  const setRentalDates = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const addRentalTransaction = (rentalData: Omit<RentalTransaction, 'id' | 'created_at'>) => {
    const newRental: RentalTransaction = {
      ...rentalData,
      id: 100 + rentals.length + 1,
      created_at: new Date().toISOString(),
    };
    const updated = [newRental, ...rentals];
    saveRentals(updated);
    clearCart();
  };

  const updateRentalStatus = (id: number, status: RentalTransaction['status']) => {
    const updated = rentals.map((r) => (r.id === id ? { ...r, status } : r));
    saveRentals(updated);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        startDate,
        endDate,
        daysDuration,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setRentalDates,
        rentals,
        addRentalTransaction,
        updateRentalStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
