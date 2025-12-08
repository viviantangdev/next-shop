import Hero from '@/components/Hero';
import { toTitleCase } from '@/lib/helpers';
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

  const slugName = toTitleCase(slug);

  return {
    title: `${slugName} | NextShop`,
    description: `${slugName}`,
  };
}

export default async function SlugLayout({
  children,
  params,
}: SlugLayoutProps) {
  const { slug } = await params;
  return (
    <>
      <Hero title={slug} />
      <main>{children}</main>
    </>
  );
}
