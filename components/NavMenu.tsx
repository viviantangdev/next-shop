'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { use, useState } from 'react';
import { CategoryType } from '../lib/types';

export default function NavMenu({ items }: { items: Promise<CategoryType[]> }) {
  const [isMensOpen, setIsMensOpen] = useState(false);
  const [isWomensOpen, setIsWomensOpen] = useState(false);
  const categories = use(items);

  const mensCategories: CategoryType[] = [
    {
      slug: 'mens',
      name: 'All Mens',
      url: '',
    },
  ];
  const womensCategories: CategoryType[] = [
    {
      slug: 'womens',
      name: 'All Womens',
      url: '',
    },
  ];
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
    <NavigationMenu className='w-full'>
      <NavigationMenuList className='flex-wrap w-full'>
        {/* Sale */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/sale`} className='navlink-button text-red-700'>
              Sale
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* All products */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/all-products`} className='navlink-button'>
              All Products
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Categories */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className='navlink-button'>
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className='bg-white'>
            <ul className='grid grid-flow-row grid-cols-[repeat(3,minmax(200px,1fr))] '>
              {/* Mens */}
              <li className='text-sm'>
                {mensCategories.length > 0 && (
                  <Collapsible
                    open={isMensOpen}
                    onOpenChange={setIsMensOpen}
                    className='flex flex-col gap-2'
                  >
                    <CollapsibleTrigger asChild>
                      <div className='flex justify-between items-center navlink-button'>
                        <span>Mens</span>
                        <ChevronDown size={15} />
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent className='ml-4'>
                      <ul>
                        <li>
                          {mensCategories.map((category, index) => (
                            <NavigationMenuLink key={index} asChild>
                              <Link
                                href={`/category/${category.slug}`}
                                className='navlink-button'
                              >
                                {category.name}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </li>
              {/* Womens */}
              <li className='text-sm'>
                {womensCategories.length > 0 && (
                  <Collapsible
                    open={isWomensOpen}
                    onOpenChange={setIsWomensOpen}
                    className='flex flex-col gap-2'
                  >
                    <CollapsibleTrigger asChild>
                      <div className='flex justify-between items-center navlink-button'>
                        <span>Womens</span>
                        <ChevronDown size={15} />
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent className='ml-4'>
                      <ul>
                        <li>
                          {womensCategories.map((category, index) => (
                            <NavigationMenuLink key={index} asChild>
                              <Link
                                href={`/category/${category.slug}`}
                                className='navlink-button'
                              >
                                {category.name}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </li>

              {otherCategories.map((category) => (
                <NavigationMenuItem key={category.slug}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/category/${category.slug}`}
                      className='navlink-button'
                    >
                      {category.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
