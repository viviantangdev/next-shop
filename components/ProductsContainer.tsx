'use client';
import { useSearch } from '@/context/SearchContext';
import { ProductType } from '@/lib/product';
import { SearchSlash } from 'lucide-react';
import { use, useEffect } from 'react';
import ProductCard from './ProductCard';

interface ProductsContainerProps {
  items: Promise<ProductType[]>;
}
export default function ProductsContainer({ items }: ProductsContainerProps) {
  const products = use(items);
  const { searchTerm, filteredProducts, setAllProducts } = useSearch();

  useEffect(() => {
    setAllProducts(products);
  }, [products, setAllProducts]);

  if (filteredProducts.length === 0) {
    return (
      <section className='container mx-auto py-16 text-center'>
        <SearchSlash className='w-16 h-16 mx-auto text-gray-300 mb-6' />
        <h2 className='text-2xl mb-2'>
          <span>No results found for </span>
          <span className='italic font-light'>{`"${searchTerm}"`}</span>
          <span> :(</span>
        </h2>
        <p className='text-gray-600'>Try searching for something else.</p>
      </section>
    );
  }

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 py-8 px-5 w-full md:w-auto'>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}
    </section>
  );
}
