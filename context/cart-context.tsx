"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";

// Types used by the cart throughout the app
export type CartItem = {
  id: string;
  name: string;
  name_ta?: string;
  image: string;
  price: number; // base price per kg
  sale_price?: number; // discounted price per kg, if present
  weightKg: number; // selected weight for this line item (e.g., 0.5, 1, 1.5, 2)
  quantity: number; // number of packs for the selected weight
  inventory?: number; // optional available stock for this weight
};

type CartContextValue = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  // Backward-compatible helper: allow (product, quantity, weightKg)
  // Note: kept for compatibility with components like `components/product-section.tsx`.
  // Prefer constructing a CartItem and using addToCart directly in new code.
  addProductToCart: (product: Product, quantity: number, weightKg: number) => void;
  updateQuantity: (name: string, weightKg: number, quantity: number) => void;
  removeFromCart: (name: string, weightKg: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "tintu_cart_v1";

function loadInitialCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as CartItem[];
    return [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadInitialCart);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex((it) => it.name === item.name && it.weightKg === item.weightKg);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
  };

  const addProductToCart = (product: Product, quantity: number, weightKg: number) => {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      name_ta: product.name_ta,
      image: product.image,
      price: product.price,
      sale_price: product.sale_price ?? undefined,
      weightKg,
      quantity,
      inventory: typeof product.inventory === 'number' ? product.inventory : undefined,
    };
    addToCart(item);
  };

  const updateQuantity = (name: string, weightKg: number, quantity: number) => {
    setCart((prev) => {
      // If new quantity <= 0, remove the item
      if (quantity <= 0) return prev.filter((it) => !(it.name === name && it.weightKg === weightKg));
      return prev.map((it) => (it.name === name && it.weightKg === weightKg ? { ...it, quantity } : it));
    });
  };

  const removeFromCart = (name: string, weightKg: number) => {
    setCart((prev) => prev.filter((it) => !(it.name === name && it.weightKg === weightKg)));
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, it) => {
      const unit = typeof it.sale_price === "number" ? it.sale_price : it.price;
      // price is per kg; multiply by selected kg and pack count
      return sum + unit * it.weightKg * it.quantity;
    }, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, it) => sum + it.quantity, 0);
  }, [cart]);

  const value = useMemo<CartContextValue>(
    () => ({ cart, addToCart, addProductToCart, updateQuantity, removeFromCart, clearCart, cartTotal, cartItemCount }),
    [cart, cartTotal, cartItemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

