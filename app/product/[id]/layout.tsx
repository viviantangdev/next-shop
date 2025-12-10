import BenefitsContainer from '@/components/BenefitsContainer';
import { getSingleProduct } from '@/lib/api';
import { Metadata } from 'next';
import React from 'react';

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: number }>;
}

export async function generateMetadata({
  params,
}: ProductLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getSingleProduct(id);
  return {
    title: `${product.title} | NextShop`,
    description: `${product.title}`,
  };
}

export default async function SlugLayout({ children }: ProductLayoutProps) {
  return (
    <>
      <main className='flex flex-col items-center min-h-screen'>
        {children}
      </main>
      {/* Benefits */}
      <BenefitsContainer />{' '}
    </>
  );
}
