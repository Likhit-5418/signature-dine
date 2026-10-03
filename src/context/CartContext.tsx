import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/restaurantData';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedSpice: 'mild' | 'medium' | 'spicy';
  specialNote?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, spice?: 'mild' | 'medium' | 'spicy', note?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('signature_dine_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('signature_dine_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (item: MenuItem, spice: 'mild' | 'medium' | 'spicy' = item.spiceLevel, note?: string) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.item.id === item.id && ci.selectedSpice === spice);
      if (existing) {
        return prev.map(ci =>
          ci.item.id === item.id && ci.selectedSpice === spice
            ? { ...ci, quantity: ci.quantity + 1, specialNote: note || ci.specialNote }
            : ci
        );
      }
      return [...prev, { item, quantity: 1, selectedSpice: spice, specialNote: note }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(ci => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(ci => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        isBookingOpen,
        setIsBookingOpen,
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
