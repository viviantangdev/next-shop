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
      <main className='flex flex-col items-center min-h-screen py-20 px-5'>
        {children}
      </main>
    </>
  );
}
