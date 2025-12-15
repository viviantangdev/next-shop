import BreadCrumbs from '@/components/BreadCrumbs';
import BenefitsContainer from '@/components/footer/BenefitsContainer';
import { getSingleProduct } from '@/lib/api';
import { getGroupDisplayName, GROUP_TO_CATEGORIES } from '@/lib/categories';
import { toTitleCase } from '@/lib/helpers';
import { Metadata } from 'next';
import React from 'react';

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: number }>;
}

// Helper to capitalize subcategory names nicely
function formatSubcategoryTitle(slug: string): string {
  return toTitleCase(slug.replace(/-/g, ' ')); // e.g., "smartphones" → "Smartphones"
}

// Helper to get top-level group slug
function getParentGroupSlug(slug: string): string {
  for (const [group, subcats] of Object.entries(GROUP_TO_CATEGORIES)) {
    if ((subcats as string[]).includes(slug)) {
      return group;
    }
  }
  return slug; // fallback
}

export async function generateMetadata({
  params,
}: ProductLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getSingleProduct(id);
  return {
    title: `${product.title} | NextShop`,
    description: `${product.title}`,
  };
}

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { id } = await params;
  const product = await getSingleProduct(id);
  const categorySlug = product.category; // e.g., "smartphones"

  const parentGroupSlug = categorySlug
    ? getParentGroupSlug(categorySlug)
    : null;

  const ancestorsInDropdown =
    parentGroupSlug && categorySlug
      ? [
          {
            title: getGroupDisplayName(parentGroupSlug),
            href: `/category/${parentGroupSlug}`,
          },
          {
            title: toTitleCase(categorySlug.replace(/-/g, ' ')),
            href: `/category/${categorySlug}`,
          },
        ]
      : parentGroupSlug
      ? [
          {
            title: getGroupDisplayName(parentGroupSlug),
            href: `/category/${parentGroupSlug}`,
          },
        ]
      : [];

  return (
    <>
      <BreadCrumbs
        title={product.title}
        ancestorsInDropdown={ancestorsInDropdown}
      />
      <main className='flex flex-col items-center min-h-screen py-20 px-5'>
        {children}
      </main>
      {/* Benefits */}
      <BenefitsContainer />{' '}
    </>
  );
}
