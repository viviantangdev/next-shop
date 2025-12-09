'use client';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { getCategories } from '../../lib/api';
import { NavbarCategoriesSkeleton, NavbarIconsSkeleton } from '../Skeletons';
import LargeMenu from './LargeMenu';
import SmallMenu from './SmallMenu';

export default function Navbar() {
  const categories = getCategories();

  return (
    <>
      <nav className='flex items-center justify-between p-4 '>
        <Link href='/' className='text-2xl font-bold'>
          NextShop
        </Link>

        <Suspense fallback={<NavbarIconsSkeleton count={3} />}>
          <div className='flex gap-6'>
            <Link href='/cart'>
              <ShoppingCart />
            </Link>
            <Link href='/wishlist'>
              <Heart />
            </Link>

            {/* Hamburger menu on Mobile */}
            <div className='lg:hidden'>
              <SmallMenu items={categories} />
            </div>
          </div>
        </Suspense>
      </nav>

      {/* Mega menu on Large devices */}
      <nav className='relative hidden lg:flex items-center justify-center p-4 overflow-visible '>
        <Suspense fallback={<NavbarCategoriesSkeleton />}>
          <LargeMenu items={categories} />
        </Suspense>
      </nav>
    </>
  );
}
