import BreadCrumbs from '@/components/BreadCrumbs';
import BenefitsContainer from '@/components/footer/BenefitsContainer';
import Hero from '@/components/Hero';
import { getGroupDisplayName, GROUP_TO_CATEGORIES } from '@/lib/categories';
import { toTitleCase } from '@/lib/helpers';
import { Metadata } from 'next';
import React from 'react';

interface SlugLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

// Helper: check if slug is a top-level group
function isTopLevelGroup(slug: string): boolean {
  return slug in GROUP_TO_CATEGORIES;
}

// Helper: get parent group slug for a subcategory
function getParentGroupSlug(slug: string): string | null {
  for (const [group, subcats] of Object.entries(GROUP_TO_CATEGORIES)) {
    if ((subcats as string[]).includes(slug)) {
      return group;
    }
  }
  return null;
}

// Helper: format subcategory title nicely
function formatSubcategoryTitle(slug: string): string {
  return toTitleCase(slug.replace(/-/g, ' ')); // "mens-shirts" → "Men's Shirts"
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

export default async function CategoryLayout({
  children,
  params,
}: SlugLayoutProps) {
const { slug } = await params;
  const parentGroupSlug = getParentGroupSlug(slug);
  const isSubcategory = parentGroupSlug !== null && !isTopLevelGroup(slug);

  let currentTitle: string;
  let ancestorsInDropdown: { title: string; href: string }[] = [];

  if (isSubcategory) {
    // Subcategory page: e.g., /category/mens-shirts
    currentTitle = formatSubcategoryTitle(slug);
    ancestorsInDropdown = [
      {
        title: getGroupDisplayName(parentGroupSlug!),
        href: `/category/${parentGroupSlug!}`,
      },
    ];
  } else {
    // Top-level group page: e.g., /category/fashion
    currentTitle = getGroupDisplayName(slug);
    ancestorsInDropdown = []; // no ellipsis
  }

  return (
    <>
   <Hero title={currentTitle} />
      <BreadCrumbs
        title={currentTitle}
        ancestorsInDropdown={ancestorsInDropdown}
      />
      
      <main className='flex flex-col items-center min-h-screen'>
        {children}
      </main>
      {/* Benefits */}
      <BenefitsContainer />{' '}
    </>
  );
}
