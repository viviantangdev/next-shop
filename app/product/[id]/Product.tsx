'use client';
import CarouselContainer from '@/components/CarouselContainer';
import CategoryBadge from '@/components/CategoryBadge';
import Thumb from '@/components/ThumbImage';
import { CarouselApi, CarouselItem } from '@/components/ui/carousel';
import { useCartDrawer } from '@/context/CartDrawerContext';
import { useToast } from '@/context/ToastContext';
import { addItemToCart } from '@/lib/cart';
import { getFavorites, toggleFavorite } from '@/lib/favorites';
import { ProductType } from '@/lib/products';
import { Heart, ShoppingCart } from 'lucide-react';
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

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

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
                    className='object-contain'
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
      {/* Product details */}
      <div className='w-full'>
        {/* Details */}
        <section className='flex flex-col gap-2'>
          <h2 className='text-2xl font-semibold'>{product.title}</h2>
          <CategoryBadge text={product.category} />
          <span className='font-extrabold text-xl'>{`$${product.price}`}</span>
          <p className='text-sm'>{product.description}</p>
        </section>
        {/* Action buttons */}
        <section className='flex flex-col gap-3 my-4 md:flex-row'>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className='primary-button flex justify-center items-center gap-2'
          >
            <ShoppingCart size={15} />
            <span>Add to cart</span>
          </button>
          <button
            type='button'
            onClick={handleFavorite}
            className={`flex justify-center items-center gap-2 transition-all duration-400 ease-out
              ${
                isFavorited
                  ? 'favorite-button text-red-700 '
                  : 'favorite-button'
              }`}
          >
            <Heart
              size={15}
              className={`transition-all duration-400
                ${
                  isFavorited
                    ? 'fill-red-500 stroke-red-500 scale-110'
                    : 'fill-transparent stroke-black group-hover:stroke-red-500'
                }`}
            />

            <span>{isFavorited ? 'Saved' : 'Add to favorites'}</span>
          </button>
        </section>
      </div>
    </div>
  );
}
