'use client';
import { ProductType } from '@/lib/types';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import CategoryBadge from './CategoryBadge';
import StarRating from './StarRating';
import { discountedPrice } from '@/lib/helpers';

interface ProductCardProps {
  item: ProductType;
  isDiscount?: boolean;
}
export default function ProductCard({ item, isDiscount }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className='product-card h-120 2xl:h-100 flex flex-col'>
      <div className='relative h-64 w-full overflow-hidden '>
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
          <StarRating rating={item.rating} />
        </div>
        <div className='flex items-end justify-between'>
          {/* Discounted price – only shown when isDiscount is true */}
          <div className='flex items-center gap-2'>
            {isDiscount && (
              <span className='font-extrabold text-xl text-red-600'>
                {discountedPrice(item.price, item.discountPercentage)}
              </span>
            )}
            {/* Original price – with line-through when discounted */}
            <span
              className={`${
                isDiscount
                  ? 'line-through text-gray-500 text-sm'
                  : ' font-extrabold text-xl'
              }`}
            >
              ${item.price}
            </span>
          </div>

          {/* Discount percentage badge */}
          {isDiscount && (
            <span className='bg-red-600 text-white px-2 py-1 rounded text-sm font-bold'>
              -{Math.round(item.discountPercentage)}%
            </span>
          )}
        </div>
        {/* Action buttons */}
        <section className='flex flex-col gap-3 2xl:flex-row w-full'>
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
