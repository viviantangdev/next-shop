'use client';
import { ProductType } from '@/lib/types';
import { use } from 'react';
import ProductsContainer from './ProductsContainer';

interface PopularProductsContainerProps {
  allProducts: Promise<ProductType[]>;
}

export default function PopularProductsContainer({
  allProducts,
}: PopularProductsContainerProps) {
  const products = use(allProducts);

  const topRated = products
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  return (
    <div>
        <h2 className='text-xl font-bold uppercase'>Top rated products</h2>
      <ProductsContainer items={Promise.resolve(topRated)} />
    </div>
  );
}
