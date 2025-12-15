import { ProductSkeleton, ReviewsSkeleton } from '@/components/Skeletons';
import { getSingleProduct } from '@/lib/api';
import { Suspense } from 'react';
import Product from './Product';
import Reviews from './Reviews';
import Descriptions from './Descriptions';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getSingleProduct(parseInt(id));

  // Extract reviews from product promise
  const reviews = product.then((p) => p.reviews);

  return (
    <article className='flex flex-col gap-12 px-5 '>
      {/* Product */}
      <Suspense fallback={<ProductSkeleton />}>
        <Product item={product} />
      </Suspense>
      {/* Reviews */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <Descriptions item={product} />
      </Suspense>
      {/* Reviews */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews item={reviews} />
      </Suspense>
    </article>
  );
}
