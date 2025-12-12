'use client';
import CartButton from '@/components/buttons/CartButton';
import FavoriteButton from '@/components/buttons/FavoriteButton';
import CarouselContainer from '@/components/CarouselContainer';
import CategoryBadge from '@/components/CategoryBadge';
import Thumb from '@/components/ThumbImage';
import { CarouselApi, CarouselItem } from '@/components/ui/carousel';
import { useCartDrawer } from '@/context/CartDrawerContext';
import { useToast } from '@/context/ToastContext';
import { addItemToCart } from '@/lib/cart';
import { getFavorites, toggleFavorite } from '@/lib/favorites';
import { ProductType } from '@/lib/product';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';

interface ProductProps {
  item: Promise<ProductType>;
}
export default function Product({ item }: ProductProps) {
  const product = use(item);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { openCartDrawer } = useCartDrawer();
  const [favorites, setFavorites] = useState(getFavorites);
  const isFavorited = favorites.some((p) => p.id === product.id);
  const { toastCart, toastFavorite } = useToast();

  /** Tracking the current imageindex from CarouselApi
   * - Used for thumb images
   **/
  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleAddToCart = () => {
    addItemToCart(product);
    openCartDrawer();
    toastCart(product);
  };

  const handleFavorite = () => {
    toggleFavorite(product);
    setFavorites(getFavorites());
    toastFavorite(product, isFavorited);
  };

  return (
    <div className='flex flex-col items-center gap-12 lg:gap-7 lg:flex-row w-full'>
      {/* Image section */}
      <section className='flex flex-col items-center gap-3 w-full'>
        <div className='w-full'>
          <CarouselContainer setApi={setApi}>
            {product.images.map((item, index) => (
              <CarouselItem key={index} className='w-full'>
                <div className='relative w-full h-64 md:h-[420px]'>
                  <Image
                    src={item}
                    alt={`product-image-${index}`}
                    fill
                    className='object-contain '
                    priority
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContainer>
        </div>
        <div className='flex gap-2'>
          {product.images.map((img, index) => (
            <Thumb
              key={index}
              image={img}
              isActive={current === index}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </section>
      {/* Product title, price and action buttons */}
      <div className='w-full'>
        {/* Title price */}
        <section className='flex flex-col gap-2'>
          <h2 className='text-2xl'>{product.title}</h2>
          <CategoryBadge text={product.category} />
          <div className='flex flex-col gap-1 py-2'>
            <span
              className={`font-extrabold text-xl ${
                product.isOnSale && 'text-red-500'
              }`}
            >{`$${product.finalPrice}`}</span>
            {/* Original price – with line-through when isOnSale */}
            {product.isOnSale && (
              <div className='flex gap-1 items-center'>
                <span className='text-sm text-gray-500'>Original price:</span>
                <span className='text-sm line-through text-gray-500'>{`$${product.price}`}</span>
                <span className='ml-3 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold'>
                  -{Math.round(product.discountPercentage)}%
                </span>
              </div>
            )}
          </div>
        </section>
        {/* Action buttons */}
        <section className='flex flex-col gap-3 my-4 md:flex-row'>
          <CartButton onClick={handleAddToCart} />
          <FavoriteButton onClick={handleFavorite} isFavorited={isFavorited} />
        </section>
      </div>
    </div>
  );
}
