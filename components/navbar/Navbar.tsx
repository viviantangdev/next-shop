'use client';
import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/context/CartDrawerContext';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { getCategories } from '../../lib/api';
import { NavbarCategoriesSkeleton, NavbarIconsSkeleton } from '../Skeletons';
import DrawerMenu from './DrawerMenu';
import IconWithBadge from './IconWithBadge';
import MegaMenu from './MegaMenu';
import { useFavorites } from '@/context/FavoritesContext';

export default function Navbar() {
  const categories = getCategories();
  const { openCartDrawer } = useCartDrawer();
  const { allFavorites } = useFavorites();
  const { allCartItems } = useCart();
  let activateCartBadge = false;
  let activateFavoriteBadge = false;

  if (allFavorites.length > 0) {
    activateFavoriteBadge = true;
  }
  if (allCartItems.length > 0) {
    activateCartBadge = true;
  }

  return (
    <>
      <nav className='flex items-center justify-between p-10'>
        <Link href='/' className='text-2xl font-bold'>
          <h1>NextShop</h1>
        </Link>

        <Suspense fallback={<NavbarIconsSkeleton count={3} />}>
          <div className='flex gap-10'>
            {/* My cart drawer and Link to Favorites */}
            <IconWithBadge
              isBadgeVisible={activateCartBadge}
              onClick={openCartDrawer}
            >
              <ShoppingCart />
            </IconWithBadge>

            <Link href='/favorites'>
              <IconWithBadge isBadgeVisible={activateFavoriteBadge}>
                <Heart />
              </IconWithBadge>
            </Link>

            {/* Drawer menu on Small devices */}
            <div className='xl:hidden'>
              <DrawerMenu items={categories} />
            </div>
          </div>
        </Suspense>
      </nav>

      {/* Mega menu on Large devices */}
      <nav className='relative hidden xl:flex items-center justify-center p-4 overflow-visible '>
        <Suspense fallback={<NavbarCategoriesSkeleton />}>
          <MegaMenu items={categories} />
        </Suspense>
      </nav>
    </>
  );
}
