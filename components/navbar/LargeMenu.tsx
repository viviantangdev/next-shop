'use client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { groupCategories } from '@/lib/categories';
import Link from 'next/link';
import { use } from 'react';
import { CategoryType } from '../../lib/types';

export default function LargeMenu({
  items,
}: {
  items: Promise<CategoryType[]>;
}) {
  const categories = use(items);
  const { mensWithAll, womensWithAll, others } = groupCategories(categories);

  return (
    <NavigationMenu className='w-full'>
      <NavigationMenuList className='flex-wrap w-full'>
        {/* Sale */}
        <NavigationMenuItem>
          <LinkItem href={`/sale`} classNameProps='text-red-600'>
            Sale
          </LinkItem>
        </NavigationMenuItem>
        {/* All products */}
        <NavigationMenuItem>
          <LinkItem href={`/all-products`}>All Products</LinkItem>
        </NavigationMenuItem>

        {/* Categories Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className='navlink-button'>
            Categories
          </NavigationMenuTrigger>

          <NavigationMenuContent className='bg-white'>
            <div className='grid grid-cols-3 grid-flow-row bg-white w-150 p-8'>
              {/* Mens */}
              {mensWithAll.length > 0 && (
                <div className='space-y-2'>
                  <h4 className='mb-3 px-3 text-sm font-semibold text-gray-900'>
                    Mens
                  </h4>
                  <ul className='space-y-1'>
                    {mensWithAll.map((item) => (
                      <LinkItem key={item.slug} href={`/category/${item.slug}`}>
                        {item.name}
                      </LinkItem>
                    ))}
                  </ul>
                </div>
              )}

              {/* Womens */}
              {womensWithAll.length > 0 && (
                <div className='space-y-2'>
                  <h4 className='mb-3 px-3 text-sm font-semibold text-gray-900'>
                    Womens
                  </h4>
                  <ul className='space-y-1'>
                    {womensWithAll.map((item) => (
                      <LinkItem key={item.slug} href={`/category/${item.slug}`}>
                        {item.name}
                      </LinkItem>
                    ))}
                  </ul>
                </div>
              )}

              {/* Others */}
              {others.length > 0 && (
                <div className='space-y-2'>
                  <h4 className='mb-3 px-3 text-sm font-semibold text-gray-900'>
                    Other
                  </h4>
                  <ul className='space-y-1'>
                    {others.map((item) => (
                      <LinkItem key={item.slug} href={`/category/${item.slug}`}>
                        {item.name}
                      </LinkItem>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Reusable link component
const LinkItem = ({
  href,
  children,
  classNameProps,
}: {
  href: string;
  children: React.ReactNode;
  classNameProps?: string;
}) => (
  <NavigationMenuLink asChild>
    <Link href={href} className={`navlink-button ${classNameProps}`}>
      {children}
    </Link>
  </NavigationMenuLink>
);
