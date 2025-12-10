import BenefitsContainer from '@/components/footer/BenefitsContainer';
import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Sale | NextShop',
  description: 'Sale',
};

export default function SaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Hero title={'Sale'} />
      <main className='flex flex-col items-center min-h-screen'>
        {children}
      </main>
      {/* Benefits */}
      <BenefitsContainer />
    </>
  );
}
