'use client';
import ProductsContainer from '@/components/ProductsContainer';
import SearchField from '@/components/SearchField';
import { ProductsContainerSkeleton } from '@/components/Skeletons';
import { getAllProducts } from '@/lib/api';
import { Suspense } from 'react';

export default function AllProductsPage() {
  const allProducts = getAllProducts();

  return (
    <>
      <SearchField />
      <Suspense fallback={<ProductsContainerSkeleton />}>
        <ProductsContainer items={allProducts} />
      </Suspense>
    </>
  );
}
