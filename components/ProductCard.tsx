'use client';
import CartArticle from '@/app/cart/CartArticle';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ProductType } from '@/lib/types';
import { Heart, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CategoryBadge from './CategoryBadge';
import StarRating from './StarRating';
import { Separator } from './ui/separator';

interface ProductCardProps {
  item: ProductType;
}
export default function ProductCard({ item }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className='product-card w-full md:w-[350px] h-135 flex flex-col'>
      <div className='h-full'>
        <Link href={`/product/${item.id}`}>
          <div className='relative h-64 w-full overflow-hidden '>
            <Image
              src={item.images[0]}
              alt={item.title}
              fill
              priority
              className='object-contain'
            />
          </div>
          <div className='flex flex-col justify-between gap-6 p-2'>
            <div className='flex flex-col gap-3'>
              <span className='font-semibold'>{item.title}</span>
              <CategoryBadge text={item.category} />
              <StarRating rating={item.rating} />
            </div>
            <div className='flex items-end justify-between'>
              {/* Sale price – only if product isOnSale is true */}
              <div className='flex items-center gap-2'>
                {item.isOnSale === true && (
                  <span className='font-extrabold text-xl text-red-600'>
                    ${item.finalPrice}
                  </span>
                )}
                {/* Original price – with line-through when isOnSale */}
                <span
                  className={`${
                    item.isOnSale === true
                      ? 'line-through text-gray-500 text-sm'
                      : ' font-extrabold text-xl'
                  }`}
                >
                  ${item.price}
                </span>
              </div>
              {/* isOnSale percentage badge */}
              {item.isOnSale === true && (
                <span className='bg-red-600 text-white px-2 py-1 rounded text-sm font-bold'>
                  -{Math.round(item.discountPercentage)}%
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
      {/* Action buttons */}
      <section className='flex flex-col justify-end pb-3 px-3 gap-2 w-full h-full'>
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            setIsDrawerOpen(true);
          }}
          className='primary-button flex justify-center items-center gap-2 w-full'
        >
          <ShoppingCart size={15} />
          <span>Add to cart</span>
        </button>
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className='secondary-button flex justify-center items-center gap-2 w-full'
        >
          <Heart
            size={15}
            className={`transition-all duration-500 hover:stroke-red-500 ${
              isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-zinc-600 '
            }`}
          />
          <span>Wishlist</span>
        </button>
      </section>

      {/* Drawer shown when adding to cart */}
      <Drawer
        direction='right'
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      >
        <DrawerContent autoFocus className='w-80 bg-white'>
          <DrawerHeader className='flex flex-row justify-between items-center w-full'>
            <DrawerTitle className='text-2xl font-bold'>My Cart (0)</DrawerTitle>
            <DrawerClose asChild>
              <button className='p-2 cursor-pointer'>
                <X size={24} />
              </button>
            </DrawerClose>
            <DrawerDescription />
          </DrawerHeader>
          <div className='px-6 pb-8 overflow-y-auto'>
            <div className='flex flex-col gap-5'>
              {[
                Array.from({ length: 4 }).map((item, i) => (
                  <CartArticle key={i} size={150} />
                )),
              ]}
            </div>
          </div>
          <DrawerFooter>
            <div className='flex flex-col'>
              <Separator className='bg-black/20' />
              <div className='flex flex-row justify-between items-center my-10'>
                <span className='text-2xl font-semibold'>Total:</span>
                <span className='text-2xl font-bold'>$XXXX</span>
              </div>
              <div className='flex gap-2 w-full'>
                <DrawerClose className='secondary-button w-full'>
                  Close
                </DrawerClose>
                <Link href={'/cart'} className='w-full'>
                  <button
                    type='button'
                    onClick={() => {
                      setIsDrawerOpen(false);
                    }}
                    className='primary-button w-full'
                  >
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
