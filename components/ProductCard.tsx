'use client';
import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/context/CartDrawerContext';
import { useToast } from '@/context/ToastContext';
import { ProductType } from '@/lib/product';
import Image from 'next/image';
import Link from 'next/link';
import CategoryBadge from './CategoryBadge';
import StarRating from './StarRating';
import CartButton from './buttons/CartButton';
import FavoriteButton from './buttons/FavoriteButton';
import { useFavorites } from '@/context/FavoritesContext';

interface ProductCardProps {
  item: ProductType;
}
export default function ProductCard({ item }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { openCartDrawer } = useCartDrawer();
  const { toastCart, toastFavorite } = useToast();
  const { addItemToCart } = useCart();
  const handleAddToCart = () => {
    addItemToCart(item);
    openCartDrawer();
    toastCart(item);
  };

  const handleFavorite = () => {
    toggleFavorite(item);
    toastFavorite(item, !isFavorite(item.id));
  };

  return (
    <article className='product-card w-full md:w-[350px] h-155 flex flex-col justify-between'>
      <Link href={`/product/${item.id}`}>
        <div className='relative h-75 w-full overflow-hidden '>
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            priority
            className='object-contain'
          />
        </div>
        <section className='p-4 flex flex-col'>
          <div className='flex flex-col gap-3'>
            <span className='font-semibold'>{item.title}</span>
            <CategoryBadge text={item.category} />
            <StarRating rating={item.rating} />
          </div>
          {/* Price */}
          <div className='flex flex-col justify-center  py-3'>
            <div>
              <span
                className={`font-extrabold text-xl ${
                  item.isOnSale && 'text-red-600'
                }`}
              >
                ${item.finalPrice}
              </span>
            </div>
            {/* Original price and discount percentage */}
            {item.isOnSale && (
              <div className='flex gap-1 items-center'>
                <span className='text-sm text-gray-500'>Original price:</span>
                <span className='text-sm line-through text-gray-500'>{`$${item.price}`}</span>
                <span className='pl-2 text-red-600 text-sm'>
                  (-{Math.round(item.discountPercentage)}%)
                </span>
              </div>
            )}
          </div>
        </section>
      </Link>
      {/* Action buttons */}
      <section className='flex flex-col gap-3 px-3 pb-3'>
        <CartButton onClick={handleAddToCart} />
        <FavoriteButton
          onClick={handleFavorite}
          isFavorited={isFavorite(item.id)}
        />
      </section>
    </article>
  );
}
