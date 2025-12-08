import Hero from '@/components/Hero';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'NextShop | Sale',
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
      <main>{children}</main>
    </>
  );
}
