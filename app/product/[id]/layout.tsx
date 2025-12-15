import BenefitsContainer from '@/components/BenefitsContainer';
import BreadCrumbs from '@/components/BreadCrumbs';
import { getSingleProduct } from '@/lib/api';
import { CATEGORY_GROUPS, GROUP_LABELS, GroupKey } from '@/lib/categories';
import { toTitleCase } from '@/lib/helpers';
import { Metadata } from 'next';
import React from 'react';

interface ProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: number }>;
}

// Helper to get top-level group slug
function getParentGroupSlug(categorySlug: string): GroupKey | null {
  for (const [group, subcats] of Object.entries(CATEGORY_GROUPS)) {
    if ((subcats as unknown as string[]).includes(categorySlug)) {
      return group as GroupKey;
    }
  }
  return null;
}

// Helper: check if slug is a top-level group (e.g., "fashion")
function isTopLevelGroup(slug: string): slug is GroupKey {
  return slug in CATEGORY_GROUPS;
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
  const categorySlug = product.category; // e.g., "smartphones" or possibly "technology"

  let ancestorsInDropdown: { title: string; href: string }[] = [];

  if (categorySlug) {
    const parentGroup = getParentGroupSlug(categorySlug);
    const isDirectlyTopLevel = isTopLevelGroup(categorySlug);

    if (isDirectlyTopLevel) {
      // Product belongs directly to a top-level group (rare, but possible)
      ancestorsInDropdown = [
        {
          title: `All ${GROUP_LABELS[categorySlug as GroupKey]}`,
          href: `/category/${categorySlug}`,
        },
      ];
    } else if (parentGroup) {
      // Normal case: subcategory → belongs to a group
      ancestorsInDropdown = [
        {
          title: `All ${GROUP_LABELS[parentGroup]}`,
          href: `/category/${parentGroup}`,
        },
        {
          title: toTitleCase(categorySlug.replace(/-/g, ' ')),
          href: `/category/${categorySlug}`,
        },
      ];
    } else {
      // Fallback: unknown category, just show it nicely
      ancestorsInDropdown = [
        {
          title: toTitleCase(categorySlug.replace(/-/g, ' ')),
          href: `/category/${categorySlug}`,
        },
      ];
    }
  }

  return (
    <>
      <main className='flex flex-col items-center max-w-9xl'>
        <BreadCrumbs
          title={product.title}
          ancestorsInDropdown={ancestorsInDropdown}
        />
        {children}
      </main>
      {/* Benefits */}
      <BenefitsContainer />{' '}
    </>
  );
}
