import BreadCrumbs from '@/components/BreadCrumbs';
import BenefitsContainer from '@/components/footer/BenefitsContainer';
import Hero from '@/components/Hero';
import {
  CATEGORY_GROUPS,
  getGroupDisplayName,
  GROUP_LABELS,
  GroupKey,
} from '@/lib/categories';
import { toTitleCase } from '@/lib/helpers';
import { Metadata } from 'next';
import React from 'react';

interface SlugLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

// Helper: check if slug is a top-level group
function isTopLevelGroup(slug: string): boolean {
  return slug in CATEGORY_GROUPS;
}

// Helper: get parent group slug for a subcategory
function getParentGroupSlug(slug: string): string | null {
  for (const [group, subcats] of Object.entries(CATEGORY_GROUPS)) {
    if ((subcats as unknown as string[]).includes(slug)) {
      return group;
    }
  }
  return null;
}

export async function generateMetadata({
  params,
}: SlugLayoutProps): Promise<Metadata> {
  const { slug } = await params;

  let displayName: string;

  if (isTopLevelGroup(slug)) {
    const label = GROUP_LABELS[slug as GroupKey];
    displayName = `All ${label}`;
  } else if (getParentGroupSlug(slug)) {
    displayName = toTitleCase(slug);
  } else {
    displayName = getGroupDisplayName(slug);
  }

  return {
    title: `${displayName} | NextShop`,
    description: `Shop ${displayName} at NextShop`,
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
    currentTitle = toTitleCase(slug);
    ancestorsInDropdown = [
      {
        title: `All ${GROUP_LABELS[parentGroupSlug! as GroupKey]}`, // ← Changed here too for consistency
        href: `/category/${parentGroupSlug!}`,
      },
    ];
  } else if (isTopLevelGroup(slug)) {
    // Top-level group page: e.g., /category/fashion
    const label = GROUP_LABELS[slug as GroupKey];
    currentTitle = `All ${label}`; // ← This is the key change
    ancestorsInDropdown = [];
  } else {
    // Fallback (shouldn't happen with current data)
    currentTitle = toTitleCase(slug);
  }

  return (
    <>
      <Hero title={currentTitle} />
      <main className='flex flex-col items-center max-w-9xl'>
        <BreadCrumbs
          title={currentTitle}
          ancestorsInDropdown={ancestorsInDropdown}
        />
        {children}
      </main>
      {/* Benefits */}
      <BenefitsContainer />{' '}
    </>
  );
}
