'use client';
import { ProductType } from '@/lib/products';
import { use } from 'react';
import ProductCard from './ProductCard';

interface ProductsContainerProps {
  items: Promise<ProductType[]>;
}
export default function ProductsContainer({ items }: ProductsContainerProps) {
  const products = use(items);
  console.log(products)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 py-8 px-5 w-full md:w-auto'>
      {products.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}
    </div>
  );
}
