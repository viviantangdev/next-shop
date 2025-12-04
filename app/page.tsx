'use client';
import ProductsWrapper from '@/components/ProductsWrapper';
import { ProductsWrapperSkeleton } from '@/components/Skeletons';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { getAllProducts } from '@/lib/api';
import { Suspense, useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const products = getAllProducts(searchTerm);
  
  return (
    <>
      <section>
        <Field>
          <Input
            id='Search'
            placeholder='Search here...'
            onChange={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.value);
            }}
          />
        </Field>
      </section>
      <section>
        <Suspense fallback={<ProductsWrapperSkeleton />}>
          <h3>All products</h3>
          <ProductsWrapper items={products} />
        </Suspense>
      </section>
    </>
  );
}
