'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { getCategories } from '../lib/api';
import NavMenu from './NavMenu';
import { NavMenuSkeleton } from './Skeletons';

export default function Navbar() {
  const categories = getCategories();
  
  return (
    <>
      <nav className='flex items-center justify-between p-4'>
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
        </div>
      </nav>

      <nav className='relative flex items-center justify-center p-4 overflow-visible'>
        <Suspense fallback={<NavMenuSkeleton/>}>
          <NavMenu items={categories} />
        </Suspense>
      </nav>
    </>
  );
}