import { getSingleProduct } from '@/lib/api';
import Product from './Product';
import { Suspense } from 'react';
import { ProductSkeleton, ReviewsSkeleton } from '@/components/Skeletons';
import Reviews from './Reviews';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { id } = await params;
  const product = getSingleProduct(parseInt(id));
  
  // Extract reviews from product promise
  const reviews = product.then(p => p.reviews);

  return (
    <main className='py-20'>
      <article className='flex flex-col gap-10'>
        {/* Product */}
        <Suspense fallback={<ProductSkeleton/>}> 
          <Product item={product} />
        </Suspense>
        {/* Reviews */}
        <Suspense fallback={<ReviewsSkeleton/>}> 
          <Reviews item={reviews} />
        </Suspense>
      </article>
    </main>
  );
}
