'use client';
import { ProductType } from '@/lib/product';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  product: ProductType;
  quantity: number;
}

interface CartContextType {
  allCartItems: CartItem[];
  setAllCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addItemToCart: (product: ProductType, quantity?: number) => void;
  removeItemFromCart: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopping-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [allCartItems, setAllCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAllCartItems(parsed);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(allCartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [allCartItems]);

  const addItemToCart = (product: ProductType, quantity: number = 1) => {
    setAllCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItemFromCart = (productId: number) => {
    setAllCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const updateItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromCart(productId);
      return;
    }

    setAllCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setAllCartItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  };

  return (
    <CartContext.Provider
      value={{
        allCartItems,
        setAllCartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
