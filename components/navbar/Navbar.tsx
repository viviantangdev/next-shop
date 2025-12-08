'use client';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { getCategories } from '../../lib/api';
import { NavMenuSkeleton } from '../Skeletons';
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

        <div className='flex gap-6'>
          <Link href='/cart'>
            <ShoppingCart />
          </Link>
          <Link href='/wishlist'>
            <Heart />
          </Link>

          {/* Hamburger menu on Mobile */}
          <div className='lg:hidden'>
            <Suspense fallback={<p>Loading</p>}>
              <SmallMenu items={categories} />
            </Suspense>
          </div>
        </div>
      </nav>

      {/* Mega menu on Large devices */}
      <nav className='relative hidden lg:flex items-center justify-center p-4 overflow-visible '>
        <Suspense fallback={<NavMenuSkeleton />}>
          <LargeMenu items={categories} />
        </Suspense>
      </nav>
    </>
  );
}
