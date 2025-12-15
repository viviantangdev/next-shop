import BreadCrumbs from '@/components/BreadCrumbs';
import BenefitsContainer from '@/components/footer/BenefitsContainer';
import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'New Arrivals | NextShop',
  description: 'Sale',
};

export default function NewArrivalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const title = 'New Arrivals';
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
