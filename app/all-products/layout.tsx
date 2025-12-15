import BenefitsContainer from '@/components/BenefitsContainer';
import BreadCrumbs from '@/components/BreadCrumbs';
import Hero from '@/components/Hero';
import { Metadata } from 'next';
import React from 'react';

interface AllProductsLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'All Products | NextShop',
  description: 'All Products',
};

export default async function AllProductsLayout({
  children,
}: AllProductsLayoutProps) {
  const title = 'All Products';
  return (
    <>
      <Hero title={title} />
      <main className='flex flex-col items-center max-w-9xl'>
        <BreadCrumbs title={title} />
        {children}
      </main>
      {/* Benefits */}
      <BenefitsContainer />
    </>
  );
}
