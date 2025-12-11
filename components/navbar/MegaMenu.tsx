'use client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { GROUP_LABELS, GROUP_ORDER, groupCategories } from '@/lib/categories';
import Link from 'next/link';
import { use } from 'react';
import { CategoryType } from '../../lib/product';

interface MegaMenuProps {
  items: Promise<CategoryType[]>;
}

/**
 * Mega menu
 * - For large devices
 * - Containing navigation to Sale, New Arrivals etc.
 */
export default function MegaMenu({ items }: MegaMenuProps) {
  const categories = use(items);
  const { grouped, withAll } = groupCategories(categories);

  // Check if we have any grouped categories at all
  const hasAnyCategories = GROUP_ORDER.some(
    (key) => grouped[key] && grouped[key].length > 0
  );

  return (
    <NavigationMenu className='w-full'>
      <NavigationMenuList className='flex flex-wrap w-full gap-2'>
        {/* Sale */}
        <NavigationMenuItem>
          <LinkItem href='/sale' classNameProps='text-red-600 font-semibold'>
            Sale
          </LinkItem>
        </NavigationMenuItem>
        {/* New Arrivals */}
        <NavigationMenuItem>
          <LinkItem href='/new-arrivals'>New Arrivals</LinkItem>
        </NavigationMenuItem>

        {/* All Products */}
        <NavigationMenuItem>
          <LinkItem href='/all-products'>All Products</LinkItem>
        </NavigationMenuItem>

        {/* Categories Dropdown */}
        {hasAnyCategories && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className='navlink-button font-normal'>
              Categories
            </NavigationMenuTrigger>

            <NavigationMenuContent className='bg-white'>
              <div className='grid grid-cols-4 gap-10 p-8 w-[800px]  bg-white'>
                {GROUP_ORDER.map((groupKey) => {
                  const items = grouped[groupKey];
                  if (!items || items.length === 0) return null;

                  const itemsWithAll = withAll[`${groupKey}WithAll` as const];
                  if (!itemsWithAll || itemsWithAll.length === 0) return null;

                  return (
                    <div key={groupKey} className='space-y-3'>
                      <h4 className='text-sm font-bold text-gray-900 uppercase tracking-wider'>
                        {GROUP_LABELS[groupKey]}
                      </h4>
                      <ul className='flex flex-col ml-2 mt-2 space-y-2 pb-3 border-l-2 border-gray-100 pl-1'>
                        {itemsWithAll.map((item, i) => (
                          <li key={i}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={`/category/${item.slug}`}
                                className='navlink-button'
                              >
                                {item.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
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
