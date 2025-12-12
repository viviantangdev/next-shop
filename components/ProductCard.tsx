'use client';
import { useCartDrawer } from '@/context/CartDrawerContext';
import { useToast } from '@/context/ToastContext';
import { addItemToCart } from '@/lib/cart';
import { getFavorites, toggleFavorite } from '@/lib/favorites';
import { ProductType } from '@/lib/product';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CategoryBadge from './CategoryBadge';
import StarRating from './StarRating';
import CartButton from './buttons/CartButton';
import FavoriteButton from './buttons/FavoriteButton';

interface ProductCardProps {
  item: ProductType;
}
export default function ProductCard({ item }: ProductCardProps) {
  const [favorites, setFavorites] = useState(getFavorites());
  const isFavorited = favorites.some((p) => p.id === item.id);
  const { openCartDrawer } = useCartDrawer();
  const { toastCart, toastFavorite } = useToast();

  const handleAddToCart = () => {
    addItemToCart(item);
    openCartDrawer();
    toastCart(item);
  };

  const handleFavorite = () => {
    toggleFavorite(item);
    setFavorites(getFavorites());
    toastFavorite(item, isFavorited);
  };

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
                      : 'font-extrabold text-xl'
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
        <CartButton onClick={handleAddToCart} />
        <FavoriteButton onClick={handleFavorite} isFavorited={isFavorited} />
      </section>
    </div>
  );
}
