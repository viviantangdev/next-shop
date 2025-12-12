'use client';
import ProductsContainer from '@/components/ProductsContainer';
import { ProductsContainerSkeleton } from '@/components/Skeletons';
import { getNewArrivals } from '@/lib/api';
import { Suspense } from 'react';

export default function NewArrivalsPage() {
  const newArrivals = getNewArrivals();
  return (
    <>
      <Suspense fallback={<ProductsContainerSkeleton />}>
        <ProductsContainer items={newArrivals} />
      </Suspense>
    </>
  );
}
