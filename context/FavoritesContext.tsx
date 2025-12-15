'use client';
import { ProductType } from '@/lib/product';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  allFavorites: ProductType[];
  toggleFavorite: (product: ProductType) => void;
  isFavorite: (productId: string | number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const FAVORITES_STORAGE_KEY = 'favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [allFavorites, setAllFavorites] = useState<ProductType[]>([]);

  // Load favorites from localStorage on initial mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ProductType[];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAllFavorites(parsed);
      }
    } catch (error) {
      console.error('Failed to load favories from localStorage:', error);
    }
  }, []);

  // Persist favorites to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(allFavorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [allFavorites]);

  // Toggle favorite and update state
  const toggleFavorite = (product: ProductType) => {
    setAllFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Helper to check if a product is favorited
  const isFavorite = (productId: string | number) => {
    return allFavorites.some((p) => p.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        allFavorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
