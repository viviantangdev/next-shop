'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from 'react';

type SearchContextType = {
  searchTerm: string;
  onUpdateSearchTerm: (searchTerm: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const onUpdateSearchTerm = (term: string) => setSearchTerm(term);
  
  const onNavigation = useEffectEvent(() => {
    setSearchTerm('');
  });

  /** Clears the searchTerm
   * - Whenever pathname and searchParams is updated
   */
  useEffect(() => {
    onNavigation();
  }, [pathname, searchParams]);

  return (
    <SearchContext.Provider value={{ searchTerm, onUpdateSearchTerm }}>
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
