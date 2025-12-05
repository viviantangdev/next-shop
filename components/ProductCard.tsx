'use client';
import { ProductType } from '@/lib/types';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import CategoryBadge from './CategoryBadge';

interface ProductCardProps {
  item: ProductType;
}
export default function ProductCard({ item }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className='product-card h-95 flex flex-col'>
      <div className='relative h-54 w-full overflow-hidden '>
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className='object-contain'
        />
      </div>
      <div className='flex flex-col justify-between h-full p-2'>
        <div className='flex flex-col gap-2'>
          <span className='font-semibold'>{item.title}</span>
          <CategoryBadge text={item.category} />
        </div>
        <div>
          <span className='font-extrabold text-xl'>{`$${item.price}`}</span>
        </div>
        {/* <div className='flex flex-col gap-2'>
        </div>
        {/* Action buttons */}
        <section className='flex flex-col gap-3 xl:flex-row w-full'>
          <button className='primary-button flex justify-center items-center gap-2 w-full'>
            <ShoppingCart size={15} />
            <span>Add to cart</span>
          </button>
          <button className='secondary-button flex justify-center items-center gap-2 w-full'>
            <Heart
              size={15}
              onClick={() => setIsLiked(!isLiked)}
              className={`transition-all duration-500 hover:stroke-red-500 ${
                isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-zinc-600 '
              }`}
            />
            <span>Wishlist</span>
          </button>
        </section>
      </div>
    </div>
  );
}
