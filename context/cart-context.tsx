"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '@/lib/products';

interface CartItem extends Product {
  quantity: number; // number of units for this weight variant
  weightKg: 1 | 2; // variant weight in kg
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, units: number, weightKg: 1 | 2) => void;
  removeFromCart: (productName: string, weightKg: 1 | 2) => void;
  updateQuantity: (productName: string, weightKg: 1 | 2, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, units: number, weightKg: 1 | 2) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name && item.weightKg === weightKg);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name && item.weightKg === weightKg
            ? { ...item, quantity: item.quantity + units }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: units, weightKg }];
    });
  };

  const removeFromCart = (productName: string, weightKg: 1 | 2) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.name === productName && item.weightKg === weightKg)));
  };

  const updateQuantity = (productName: string, weightKg: 1 | 2, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === productName && item.weightKg === weightKg
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.weightKg) * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
