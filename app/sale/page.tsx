import ProductsContainer from '@/components/ProductsContainer';
import { getDiscountedProducts } from '@/lib/api';
import { Suspense } from 'react';

export default function SalePage() {
  const discountedProducts = getDiscountedProducts();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProductsContainer items={discountedProducts} isDiscout={true}/>
    </Suspense>
  );
}
