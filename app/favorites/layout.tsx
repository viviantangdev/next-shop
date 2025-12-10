import { Metadata } from 'next';
import React from 'react';

interface FavoritesLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata({}: FavoritesLayoutProps): Promise<Metadata> {
  return {
    title: 'My Favorites | NextShop',
    description: 'My Favorites',
  };
}

export default async function FavoritesLayout({
  children,
}: FavoritesLayoutProps) {
  return (
    <>
      <main className='flex flex-col items-center min-h-screen py-20 px-5'>
        {children}
      </main>
    </>
  );
}
