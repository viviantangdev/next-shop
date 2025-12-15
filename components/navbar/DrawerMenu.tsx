'use client';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { CategoryType, GROUP_LABELS, GROUP_ORDER, groupCategories, GroupKey } from '@/lib/categories';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';

interface DrawerMenuProps {
  categories: CategoryType[];
}


/**
 * Drawer menu
 * - For smaller devices
 * - Containing navigation to Sale, New Arrivals etc.
 */
export default function DrawerMenu({ categories }: DrawerMenuProps) {
  const { grouped, withAll } = groupCategories(categories);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="cursor-pointer hover:scale-105 transition-transform duration-300">
          <Menu size={24} />
        </button>
      </DrawerTrigger>

      <DrawerContent autoFocus className="bg-white h-full">
        <DrawerHeader className="flex flex-row justify-between items-center pb-8">
          <DrawerTitle className="text-2xl font-bold">NextShop</DrawerTitle>
          <DrawerClose asChild>
            <button className="p-2">
              <X size={24} />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-6 pb-8 overflow-y-auto h-full">
          <ul className="space-y-4">
            {/* Static Top Links */}
            <div className="flex flex-col space-y-3">
              <LinkItem href="/sale" className="text-red-600 font-semibold">
                Sale
              </LinkItem>
              <LinkItem href="/new-arrivals">New Arrivals</LinkItem>
              <LinkItem href="/all-products">All Products</LinkItem>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 my-6" />

            {/* Category Groups - Each with its own collapsible and Chevron */}
            {GROUP_ORDER.map((groupKey: GroupKey) => {
              const items = grouped[groupKey];
              if (!items || items.length === 0) return null;

              const itemsWithAll = withAll[`${groupKey}WithAll` as const];
              if (!itemsWithAll || itemsWithAll.length === 0) return null;

              return (
                <Collapsible key={groupKey} defaultOpen={false}>
                  <CollapsibleTrigger className="w-full group">
                    <div className="flex justify-between items-center py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="font-semibold text-gray-900">
                        {GROUP_LABELS[groupKey]}
                      </span>
                      <ChevronDown
                        size={20}
                        className="text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180"
                      />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <ul className="flex flex-col space-y-5 mt-2 ml-4 border-l-2 border-gray-100 pl-4 pb-4">
                      {itemsWithAll.map((item) => (
                        <li key={item.name}>
                          <LinkItem
                            href={`/category/${item.slug}`}
                            className={
                              item.slug === groupKey
                                ? 'font-medium text-primary'
                                : 'text-gray-700 hover:text-primary transition-colors'
                            }
                          >
                            {item.name}
                          </LinkItem>
                        </li>
                      ))}
                    </ul>
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
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <DrawerClose asChild>
    <Link href={href} className={`navlink-button ${className}`}>
      {children}
    </Link>
  </DrawerClose>
);