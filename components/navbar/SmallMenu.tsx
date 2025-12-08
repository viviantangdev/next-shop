'use client';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { groupCategories } from '@/lib/categories';
import { CategoryType } from '@/lib/types';
import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

export default function SmallMenu({
  items,
}: {
  items: Promise<CategoryType[]>;
}) {
  const categories = use(items);
  const { mensWithAll, womensWithAll, others } = groupCategories(categories);

  return (
    <Drawer direction='right'>
      <DrawerTrigger asChild>
        <Menu />
      </DrawerTrigger>
      <DrawerContent autoFocus className='bg-white'>
        <DrawerHeader className='flex flex-row justify-between pb-10'>
          <DrawerTitle className='cursor-pointer'>NextShop</DrawerTitle>
          <DrawerDescription />
          <DrawerClose asChild className='cursor-pointer'>
            <button>
              <X />
            </button>
          </DrawerClose>
        </DrawerHeader>
        {/* Nav links */}
        <div className='flex-1 overflow-y-auto overscroll-contain px-6 pb-8 pt-4'>
          <ul className='flex flex-col gap-2'>
            {/* Sale */}
            <LinkItem href={'/sale'} classNameProps='text-red-600'>
              Sale
            </LinkItem>
            {/* All products */}
            <LinkItem href={'/all-products'}>All Products</LinkItem>
            {/* Mens collapsible */}
            {mensWithAll.length > 0 && (
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger className='group w-full'>
                  <div className='flex justify-between items-center navlink-button'>
                    <span>Mens</span>
                    <ChevronDown
                      size={15}
                      className='transition-transform duration-300 group-data-[state=open]:rotate-180'
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className='data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden'>
                  <div className='flex flex-col gap-4 ml-10 my-4'>
                    {mensWithAll.map((item) => (
                      <LinkItem key={item.slug} href={`/category/${item.slug}`}>
                        {item.name}
                      </LinkItem>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
            {/* Wommens collapsible */}
            {womensWithAll.length > 0 && (
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger className='group w-full'>
                  <div className='flex justify-between items-center navlink-button'>
                    <span>Womens</span>
                    <ChevronDown
                      size={15}
                      className='transition-transform duration-300 group-data-[state=open]:rotate-180'
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className='data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden'>
                  <div className='flex flex-col gap-4 ml-10 my-4'>
                    {womensWithAll.map((item) => (
                      <LinkItem key={item.slug} href={`/category/${item.slug}`}>
                        {item.name}
                      </LinkItem>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
            {/* Others collapsible*/}
            {others.length > 0 && (
              <Collapsible defaultOpen={false}>
                <CollapsibleTrigger className='group w-full'>
                  <div className='flex justify-between items-center navlink-button'>
                    <span>Others</span>
                    <ChevronDown
                      size={15}
                      className='transition-transform duration-300 group-data-[state=open]:rotate-180'
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className='data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden'>
                  <div className='flex flex-col gap-4 ml-10 my-4'>
                    {others.map((item) => (
                      <LinkItem key={item.slug} href={`/category/${item.slug}`}>
                        {item.name}
                      </LinkItem>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
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
  <DrawerClose asChild>
    <Link href={href} className={`navlink-button ${classNameProps}`}>
      {children}
    </Link>
  </DrawerClose>
);
