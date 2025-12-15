'use client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  CategoryType,
  GROUP_LABELS,
  GROUP_ORDER,
  groupCategories,
  GroupKey,
} from '@/lib/categories';
import Link from 'next/link';

interface MegaMenuProps {
  categories: CategoryType[];
}

/**
 * Mega menu
 * - For large devices
 * - Containing navigation to Sale, New Arrivals etc.
 */
export default function MegaMenu({ categories }: MegaMenuProps) {
  const { withAll } = groupCategories(categories);

  // Check if any group has items (including "All" entry)
  const hasCategories = GROUP_ORDER.some(
    (key) => withAll[`${key}WithAll`]?.length > 0
  );

  return (
    <NavigationMenu className='w-full'>
      <NavigationMenuList className='flex flex-wrap w-full gap-2'>
        {/* Static Links */}
        <NavigationMenuItem>
          <LinkItem href='/sale' className='text-red-600 font-semibold'>
            Sale
          </LinkItem>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <LinkItem href='/new-arrivals'>New Arrivals</LinkItem>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <LinkItem href='/all-products'>All Products</LinkItem>
        </NavigationMenuItem>

        {/* Categories Dropdown */}
        {hasCategories && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className='navlink-button font-normal'>
              Categories
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <div className='grid grid-cols-4 gap-10 p-8 w-[800px] bg-white'>
                {GROUP_ORDER.map((groupKey: GroupKey) => {
                  const items = withAll[`${groupKey}WithAll`];
                  if (!items || items.length === 0) return null;

                  return (
                    <div key={groupKey} className='space-y-3'>
                      <h4 className='text-sm font-bold text-gray-900 uppercase tracking-wider'>
                        {GROUP_LABELS[groupKey]}
                      </h4>
                      <ul className='flex flex-col space-y-2 mt-2 ml-2 pb-3 border-l-2 border-gray-100 pl-1'>
                        {items.map((item) => (
                          <li key={item.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={`/category/${item.slug}`}
                                className='navlink-button text-sm hover:text-primary transition-colors'
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
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <NavigationMenuLink asChild>
    <Link href={href} className={`navlink-button ${className}`}>
      {children}
    </Link>
  </NavigationMenuLink>
);
