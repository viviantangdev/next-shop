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
import { GROUP_LABELS, GROUP_ORDER, groupCategories } from '@/lib/categories';
import { CategoryType } from '@/lib/types';
import { CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

interface DrawerMenuProps {
  items: Promise<CategoryType[]>;
}

/**
 * Drawer menu
 * - For small devices
 * - Containing navigation to Sale, New Arrivals etc. 
 */
export default function DrawerMenu({ items }: DrawerMenuProps) {
  const categories = use(items);
  const { grouped, withAll } = groupCategories(categories);

  return (
    <Drawer direction='right'>
      <DrawerTrigger asChild>
        <button className='cursor-pointer hover:scale-103 transition-transform duration-500'>
          <Menu size={24} />
        </button>
      </DrawerTrigger>

      <DrawerContent autoFocus className='w-80 bg-white'>
        <DrawerHeader className='flex flex-row justify-between items-center w-full'>
          <DrawerTitle className='text-2xl font-bold'>NextShop</DrawerTitle>
          <DrawerClose asChild>
            <button className='p-2'>
              <X size={24} />
            </button>
          </DrawerClose>
          <DrawerDescription />
        </DrawerHeader>

        <div className='px-6 pb-8 overflow-y-auto'>
          <ul className='space-y-3'>
            {/* Top Links */}
            <div className='flex flex-row pt-3 flex-wrap'>
              <LinkItem
                href='/sale'
                classNameProps='text-red-600 font-semibold'
              >
                Sale
              </LinkItem>
              <LinkItem href='/new-arrivals'>New Arrivals</LinkItem>
              <LinkItem href='/all-products'>All Products</LinkItem>
            </div>

            <div className='h-px bg-gray-200 my-4' />

            {/* Dynamic Category Groups */}
            {GROUP_ORDER.map((groupKey) => {
              const items = grouped[groupKey];
              if (!items || items.length === 0) return null;

              const itemsWithAll = withAll[`${groupKey}WithAll` as const];
              if (!itemsWithAll || itemsWithAll.length === 0) return null;

              return (
                <Collapsible key={groupKey} defaultOpen={false}>
                  <CollapsibleTrigger className='w-full group'>
                    <div className='flex justify-between items-center py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors'>
                      <span className='font-medium text-gray-900'>
                        {GROUP_LABELS[groupKey]}
                      </span>
                      <ChevronDown
                        size={18}
                        className='text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180'
                      />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className='flex flex-col ml-6 mt-2 space-y-2 pb-3 border-l-2 border-gray-100 pl-4'>
                      {itemsWithAll.map((item, i) => (
                        <LinkItem
                          key={i}
                          href={`/category/${item.slug}`}
                          classNameProps={
                            item.slug === groupKey
                              ? 'font-medium text-primary'
                              : ''
                          }
                        >
                          {item.name}
                        </LinkItem>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
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
