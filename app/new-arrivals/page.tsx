'use client';
import ProductsContainer from '@/components/ProductsContainer';
import SearchField from '@/components/SearchField';
import { ProductsContainerSkeleton } from '@/components/Skeletons';
import { getNewArrivals } from '@/lib/api';
import { Suspense } from 'react';

export default function NewArrivalsPage() {
  const newArrivals = getNewArrivals();

  return (
    <>
      <SearchField />
      <Suspense fallback={<ProductsContainerSkeleton />}>
        <ProductsContainer items={newArrivals} />
      </Suspense>
    </>
  );
}
