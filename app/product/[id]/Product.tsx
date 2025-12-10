'use client';
import CartDrawer from '@/app/cart/CartDrawer';
import CarouselContainer from '@/components/CarouselContainer';
import CategoryBadge from '@/components/CategoryBadge';
import Thumb from '@/components/ThumbImage';
import { CarouselApi, CarouselItem } from '@/components/ui/carousel';
import { addItemToCart, getCartFromStorage } from '@/lib/cart';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState(getCartFromStorage());

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
      setCartItems(getCartFromStorage());
      setIsDrawerOpen(true);
    };
     const handleCartUpdate = () => {
    setCartItems(getCartFromStorage());
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
          <button    type='button'
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }} className='primary-button flex justify-center items-center gap-2'>
            <ShoppingCart size={15} />
            <span>Add to cart</span>
          </button>
          <button className='secondary-button flex justify-center items-center gap-2'>
            <Heart size={15} />
            <span>Wishlist</span>
          </button>
        </section>
      </div>
         {/* Drawer shown when adding to cart */}
            <CartDrawer
              isOpen={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
              cartItems={cartItems}
              onUpdate={handleCartUpdate}
            />
    </div>
  );
}


