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
  return (
    <>
      <Hero title={'New Arrivals'} />
      <main className='flex flex-col items-center min-h-screen'>
        {children}
      </main>
      {/* Benefits */}
      <BenefitsContainer />
    </>
  );
}
