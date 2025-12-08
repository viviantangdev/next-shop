'use client';
import { ProductType } from '@/lib/types';
import Link from 'next/link';
import { use } from 'react';
import ProductCard from './ProductCard';

interface ProductsContainerProps {
  items: Promise<ProductType[]>;
}
export default function ProductsContainer({ items }: ProductsContainerProps) {
  const products = use(items);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 md:px-8 lg:px-12'>
      {products.map((product) => (
        <Link key={product.id} href={`/${product.category}/${product.id}`}>
          <ProductCard key={product.id} item={product} />
        </Link>
      ))}
    </div>
  );
}
