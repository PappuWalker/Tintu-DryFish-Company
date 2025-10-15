"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '@/lib/products';

interface CartItem extends Product {
  quantity: number; // number of units for this weight variant
  weightKg: 0.25 | 0.5 | 1 | 1.5 | 2; // variant weight in kg
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, units: number, weightKg: 0.25 | 0.5 | 1 | 1.5 | 2) => void;
  removeFromCart: (productName: string, weightKg: 0.25 | 0.5 | 1 | 1.5 | 2) => void;
  updateQuantity: (productName: string, weightKg: 0.25 | 0.5 | 1 | 1.5 | 2, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, units: number, weightKg: 0.25 | 0.5 | 1 | 1.5 | 2) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name && item.weightKg === weightKg);
      if (existingItem) {
        const stock = typeof existingItem.inventory === 'number' ? existingItem.inventory : Infinity;
        const newQty = Math.min(stock, existingItem.quantity + units);
        return prevCart.map((item) =>
          item.name === product.name && item.weightKg === weightKg
            ? { ...item, quantity: newQty }
            : item
        );
      }
      const stock = typeof product.inventory === 'number' ? product.inventory : Infinity;
      const initialQty = Math.min(stock, units);
      return [...prevCart, { ...product, quantity: initialQty, weightKg }];
    });
  };

  const removeFromCart = (productName: string, weightKg: 0.25 | 0.5 | 1 | 1.5 | 2) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.name === productName && item.weightKg === weightKg)));
  };

  const updateQuantity = (productName: string, weightKg: 0.25 | 0.5 | 1 | 1.5 | 2, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.name === productName && item.weightKg === weightKg) {
          const stock = typeof item.inventory === 'number' ? item.inventory : Infinity;
          const clamped = Math.max(1, Math.min(stock, quantity));
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => {
    const unit = item.price;
    return total + (unit * item.weightKg) * item.quantity;
  }, 0);
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
