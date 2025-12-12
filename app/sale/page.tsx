'use client';
import ProductsContainer from '@/components/ProductsContainer';
import { ProductsContainerSkeleton } from '@/components/Skeletons';
import { getSaleProducts } from '@/lib/api';
import { Suspense } from 'react';

export default function SalePage() {
  const saleProducts = getSaleProducts();

  return (
    <>
      <Suspense fallback={<ProductsContainerSkeleton />}>
        <ProductsContainer items={saleProducts} />
      </Suspense>
    </>
  );
}
