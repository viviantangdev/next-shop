'use client';
import ProductsContainer from '@/components/ProductsContainer';
import SearchField from '@/components/SearchField';
import { ProductsContainerSkeleton } from '@/components/Skeletons';
import { getSaleProducts } from '@/lib/api';
import { Suspense } from 'react';

export default function SalePage() {
  const saleProducts = getSaleProducts();

  return (
    <>
      <SearchField />
      <Suspense fallback={<ProductsContainerSkeleton />}>
        <ProductsContainer items={saleProducts} />
      </Suspense>
    </>
  );
}
