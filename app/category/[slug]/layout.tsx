import Hero from '@/components/Hero';
import { getGroupDisplayName } from '@/lib/categories';
import { Metadata } from 'next';
import React from 'react';

interface SlugLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SlugLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const displayName = getGroupDisplayName(slug);

  return {
    title: `${displayName} | NextShop`,
    description: `${displayName}`,
  };
}

export default async function SlugLayout({
  children,
  params,
}: SlugLayoutProps) {
  const { slug } = await params;
  const heroTitle = getGroupDisplayName(slug);
  return (
    <>
      <Hero title={heroTitle} />
      <main className='min-h-screen'>{children}</main>
    </>
  );
}
