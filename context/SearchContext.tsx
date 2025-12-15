'use client';

import { ProductType } from '@/lib/product';
import { usePathname } from 'next/navigation';
import React, {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from 'react';

type SearchContextType = {
  searchTerm: string;
  onUpdateSearchTerm: (searchTerm: string) => void;
  allProducts: ProductType[];
  filteredProducts: ProductType[];
  setAllProducts: (products: ProductType[]) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const onUpdateSearchTerm = (term: string) => setSearchTerm(term);

  /** Filter all products from searchTerm
   */
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return allProducts;

    const term = searchTerm.toLowerCase().trim();
    return allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }, [allProducts, searchTerm]);

  const onNavigation = useEffectEvent(() => {
    setSearchTerm('');
  });

  /** Clears the searchTerm
   * - Whenever pathname is updated
   */
  useEffect(() => {
    onNavigation();
  }, [pathname]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        onUpdateSearchTerm,
        allProducts,
        filteredProducts,
        setAllProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// Custom hook
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch nust be used within a SearchProvider');
  }
  return context;
};
