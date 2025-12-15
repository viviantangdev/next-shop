import BreadCrumbs from '@/components/BreadCrumbs';
import BenefitsContainer from '@/components/footer/BenefitsContainer';
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
  const title = 'All Products'
  return (
    <>
      <Hero title={title} />
      <BreadCrumbs title={title}/>
      <main className='flex flex-col items-center min-h-screen'>
        {children}
      </main>
      {/* Benefits */}
      <BenefitsContainer />
    </>
  );
}
