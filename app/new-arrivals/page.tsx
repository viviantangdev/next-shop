'use client';
import ProductsContainer from '@/components/ProductsContainer';
import SearchField from '@/components/SearchField';
import { ProductsContainerSkeleton } from '@/components/Skeletons';
import { useSearch } from '@/context/SearchContext';
import { getNewArrivals } from '@/lib/api';
import { Suspense } from 'react';

export default function NewArrivalsPage() {
    const { searchTerm } = useSearch();
  
  const newArrivals = getNewArrivals(searchTerm);
  return (
    <>
      <SearchField />
      <Suspense fallback={<ProductsContainerSkeleton />}>
        <ProductsContainer items={newArrivals} />
      </Suspense>
    </>
  );
}
