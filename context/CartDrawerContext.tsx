'use client';

import { createContext, useContext, useState } from 'react';

type CartDrawerContextType = {
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
};
const CartDrawerContext = createContext<CartDrawerContextType | undefined>(
  undefined
);

export function CartDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);
  const toggleCartDrawer = () => setIsCartDrawerOpen((prev) => !prev);

  return (
    <CartDrawerContext.Provider
      value={{ isCartDrawerOpen, openCartDrawer, closeCartDrawer, toggleCartDrawer }}
    >
      {children}
    </CartDrawerContext.Provider>
  );
}

// Custom hook 
export const useCartDrawer = () => {
  const context = useContext(CartDrawerContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};