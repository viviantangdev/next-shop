'use client';
import { ProductType } from '@/lib/types';
import { use } from 'react';
import ProductCard from './ProductCard';

interface ProductsWrapperProps {
  items: Promise<ProductType[]>;
}
export default function ProductsWrapper({ items }: ProductsWrapperProps) {
  const products = use(items);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 md:px-8 lg:px-12'>
      {products.map((product) => (
        <ProductCard key={product.id}
          item={product}
        />
      ))}
    </div>
  );
}
