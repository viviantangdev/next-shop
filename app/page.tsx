'use client';
import ProductsWrapper from '@/components/ProductsWrapper';
import { ProductsWrapperSkeleton } from '@/components/Skeletons';
import { getAllProducts } from '@/lib/api';
import { Suspense } from 'react';

export default function Home() {
  const products = getAllProducts();

  return (
    <>
      <section>
        <Suspense fallback={<ProductsWrapperSkeleton />}>
          <h3>All products</h3>
          <ProductsWrapper items={products} />
        </Suspense>
      </section>
    </>
  );
}
