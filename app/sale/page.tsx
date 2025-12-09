import ProductsContainer from '@/components/ProductsContainer';
import { ProductsContainerSkeleton } from '@/components/Skeletons';
import { getDiscountedProducts } from '@/lib/api';
import { Suspense } from 'react';

export default function SalePage() {
  const discountedProducts = getDiscountedProducts();

  return (
    <Suspense fallback={<ProductsContainerSkeleton />}>
      <ProductsContainer items={discountedProducts} isDiscout={true} />
    </Suspense>
  );
}
