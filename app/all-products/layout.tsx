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
  return (
    <>
      <Hero title={'All Products'} />
      <main>{children}</main>
    </>
  );
}
