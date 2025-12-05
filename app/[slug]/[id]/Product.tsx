'use client';
import CarouselContainer from '@/components/CarouselContainer';
import CategoryBadge from '@/components/CategoryBadge';
import Thumb from '@/components/Thumb';
import { CarouselApi } from '@/components/ui/carousel';
import { ProductType } from '@/lib/types';
import { Heart, ShoppingCart } from 'lucide-react';
import { use, useEffect, useState } from 'react';

interface ProductProps {
  item: Promise<ProductType>;
}
export default function Product({ item }: ProductProps) {
  const product = use(item);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className='flex flex-col items-center gap-12 lg:gap-7 lg:flex-row w-full'>
      {/* Image section */}
      <section className='flex flex-col items-center gap-3 w-full'>
        <div className='w-full'>
          <CarouselContainer setApi={setApi} item={product} />
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
          <button className='primary-button flex justify-center items-center gap-2'>
            <ShoppingCart size={15} />
            <span>Add to cart</span>
          </button>
          <button className='secondary-button flex justify-center items-center gap-2'>
            <Heart size={15} />
            <span>Wishlist</span>
          </button>
        </section>
      </div>
    </div>
  );
}
