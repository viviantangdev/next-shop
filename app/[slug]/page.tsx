
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
    <section>
      <Suspense fallback={<ProductsWrapperSkeleton />}>
        <h3>{slug}</h3>
        <ProductsWrapper items={products} />
      </Suspense>
    </section>
  );
}
