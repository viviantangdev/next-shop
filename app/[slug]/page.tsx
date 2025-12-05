import ProductsWrapper from '@/components/ProductsWrapper';
import { ProductsWrapperSkeleton } from '@/components/Skeletons';
import { getProductsByCategory } from '@/lib/api';
import { Suspense } from 'react';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = getProductsByCategory(slug);

  return (
    <>
      <header className='p-20 bg-amber-500'>
        <h3 className='uppercase font-bold text-white text-3xl text-center'>{slug}</h3>
      </header>
      <main>
        <Suspense fallback={<ProductsWrapperSkeleton />}>
          <ProductsWrapper items={products} />
        </Suspense>
      </main>
    </>
  );
}
