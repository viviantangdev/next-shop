import ProductsContainer from '@/components/ProductsContainer';
import { ProductsContainerSkeleton } from '@/components/Skeletons';
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
    <Suspense fallback={<ProductsContainerSkeleton />}>
      <ProductsContainer items={products} />
    </Suspense>
  );
}
