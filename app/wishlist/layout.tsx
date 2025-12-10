import { Metadata } from 'next';
import React from 'react';

interface WishlistLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata({}: WishlistLayoutProps): Promise<Metadata> {
  return {
    title: 'My Wishlist | NextShop',
    description: 'My Wishlist',
  };
}

export default async function WishlistLayout({
  children,
}: WishlistLayoutProps) {
  return (
    <>
      <main className='flex flex-col items-center min-h-screen py-20 px-5'>
        {children}
      </main>
    </>
  );
}
