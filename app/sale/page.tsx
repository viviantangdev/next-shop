import DiscountedProducts from '@/components/DiscountedProducts';
import { getDiscountedProducts } from '@/lib/api';
import { Suspense } from 'react';

export default function SalePage() {
  const discountedProducts = getDiscountedProducts();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DiscountedProducts items={discountedProducts} />
    </Suspense>
  );
}
