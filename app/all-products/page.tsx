'use client';
import ProductsContainer from '@/components/ProductsContainer';
import SearchField from '@/components/SearchField';
import { ProductsContainerSkeleton } from '@/components/Skeletons';
import { useSearch } from '@/context/SearchContext';
import { getAllProducts } from '@/lib/api';
import { Suspense } from 'react';

export default function AllProductsPage() {
  const { searchTerm } = useSearch();
  const allProducts = getAllProducts(searchTerm);

  return (
    <>
      <SearchField />
      <Suspense fallback={<ProductsContainerSkeleton />}>
        <ProductsContainer items={allProducts} />
      </Suspense>
    </>
  );
}
