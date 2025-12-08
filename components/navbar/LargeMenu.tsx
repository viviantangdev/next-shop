'use client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { use } from 'react';
import { CategoryType } from '../../lib/types';

export default function LargeMenu({
  items,
}: {
  items: Promise<CategoryType[]>;
}) {
  const categories = use(items);

  // Group categories
  const groupedCategories = categories.reduce(
    (acc, category) => {
      if (category.slug.startsWith('mens-')) {
        acc.mens.push(category);
      } else if (category.slug.startsWith('womens-')) {
        acc.womens.push(category);
      } else {
        acc.others.push(category);
      }
      return acc;
    },
    {
      mens: [] as CategoryType[],
      womens: [] as CategoryType[],
      others: [] as CategoryType[],
    }
  );

  const { mens, womens, others } = groupedCategories;

  // Prepend "All Mens" / "All Womens" only if subcategories exist
  const mensItems: CategoryType[] =
    mens.length > 0
      ? [
          {
            slug: 'mens',
            name: 'All Mens',
            url: '/category/mens',
          },
          ...mens,
        ]
      : [];
  const womensItems: CategoryType[] =
    womens.length > 0
      ? [
          {
            slug: 'womens',
            name: 'All Womens',
            url: '/category/womens',
          },
          ...womens,
        ]
      : [];

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
        {(mensItems.length > 0 ||
          womensItems.length > 0 ||
          others.length > 0) && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className='navlink-button'>
              Categories
            </NavigationMenuTrigger>

            <NavigationMenuContent className='bg-white'>
              <div className='grid grid-cols-3 grid-flow-row bg-white w-150 p-8'>
                {/* Mens Section */}
                {mens.length > 0 && (
                  <div className='space-y-2'>
                    <h4 className='mb-3 px-3 text-sm font-semibold text-gray-900'>
                      Mens
                    </h4>
                    <ul className='space-y-1'>
                      {mensItems.map((item) => (
                        <LinkItem
                          key={item.slug}
                          href={`/category/${item.slug}`}
                        >
                          {item.name}
                        </LinkItem>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Womens Section */}
                {womens.length > 0 && (
                  <div className='space-y-2'>
                    <h4 className='mb-3 px-3 text-sm font-semibold text-gray-900'>
                      Womens
                    </h4>
                    <ul className='space-y-1'>
                      {womensItems.map((item) => (
                        <LinkItem
                          key={item.slug}
                          href={`/category/${item.slug}`}
                        >
                          {item.name}
                        </LinkItem>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Other Categories */}
                {others.length > 0 && (
                  <div className='space-y-2'>
                    <h4 className='mb-3 px-3 text-sm font-semibold text-gray-900'>
                      Other
                    </h4>
                    <ul className='space-y-1'>
                      {others.map((item) => (
                        <LinkItem
                          key={item.slug}
                          href={`/category/${item.slug}`}
                        >
                          {item.name}
                        </LinkItem>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
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
