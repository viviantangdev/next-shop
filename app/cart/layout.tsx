import { Metadata } from 'next';
import React from 'react';

interface CartLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata({}: CartLayoutProps): Promise<Metadata> {
  return {
    title: 'Cart | NextShop',
    description: 'Cart',
  };
}

export default async function CartLayout({ children }: CartLayoutProps) {
  return (
    <>
      <main className='min-h-screen'>{children}</main>
    </>
  );
}
