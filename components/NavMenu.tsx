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
import { CategoryType } from '../lib/types';

export default function NavMenu({ items }: { items: Promise<CategoryType[]> }) {
  const categories = use(items);

  const mensCategories: CategoryType[] = [
    {
      slug: 'mens',
      name: 'All Mens',
      url: '',
    },
  ];
  const womensCategories: CategoryType[] = [  {
      slug: 'womens',
      name: 'All Womens',
      url: '',
    },];
  const otherCategories: CategoryType[] = [];

  categories.forEach((category) => {
    if (category.slug.startsWith('mens-')) {
      mensCategories.push(category);
    } else if (category.slug.startsWith('womens-')) {
      womensCategories.push(category);
    } else {
      otherCategories.push(category);
    }
  });

  return (
    <NavigationMenu viewport={false} className='w-full'>
      <NavigationMenuList className='flex-wrap w-full'>
        {/* Reanders mens categories */}
        {mensCategories.length > 0 && (
          <NavigationMenuItem className='hidden md:block'>
            <NavigationMenuTrigger className='navlink-button'>
              Mens
            </NavigationMenuTrigger>
            <NavigationMenuContent className='bg-white border-none z-50'>
              <ul className='grid w-[200px] gap-4'>
                <li>
                  {mensCategories.map((category, index) => (
                    <NavigationMenuLink key={index} asChild>
                      <Link
                        href={`${category.slug}`}
                        className='navlink-button'
                      >
                        {category.name}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        {/* Reanders womens categories */}
        {womensCategories.length > 0 && (
          <NavigationMenuItem className='hidden md:block'>
            <NavigationMenuTrigger className='navlink-button'>
              Womens
            </NavigationMenuTrigger>
            <NavigationMenuContent className='bg-white border-none z-50'>
              <ul className='grid w-[200px] gap-4'>
                <li>
                  {womensCategories.map((category, index) => (
                    <NavigationMenuLink key={index} asChild>
                      <Link
                        href={`${category.slug}`}
                        className='navlink-button'
                      >
                        {category.name}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        {/* Reanders all categorise except mens categories */}
        {otherCategories.map((category) => (
          <NavigationMenuItem key={category.slug}>
            <NavigationMenuLink asChild>
              <Link href={`/${category.slug}`} className='navlink-button'>
                {category.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
