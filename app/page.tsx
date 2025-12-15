'use client';
import CarouselContainer from '@/components/CarouselContainer';
import BenefitsContainer from '@/components/footer/BenefitsContainer';
import ProductsContainer from '@/components/ProductsContainer';
import { ProductsContainerSkeleton } from '@/components/Skeletons';
import { CarouselItem } from '@/components/ui/carousel';
import { getNewArrivals } from '@/lib/api';
import { GROUP_LABELS, GROUP_ORDER } from '@/lib/categories';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Home() {
  const CATEGORY_IMAGES: Record<string, string> = {
    fashion:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=600&fit=crop&auto=format',
    technology:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&auto=format',
    home: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&auto=format',
    beauty:
      'https://img.freepik.com/free-photo/macadamia-body-lotion-skin-cream_1150-42812.jpg?semt=ais_hybrid&w=800&h=600&fit=crop&auto=format',
    sports:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format',
    automotive:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&auto=format',
  };
  const newArrivals = getNewArrivals(4);

  return (
    <>
      <header className='relative h-70 bg-amber-400'>
        <Image
          src={'/hero.jpg'}
          alt={'Hero'}
          fill
          priority
          className='object-cover'
        />
        {/* Overlay content */}
        <div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-4'>
          <p className='text-4xl font-bold text-white drop-shadow-2xl'>
            Biggest offer revealed
          </p>
          <p className='mt-4 text-2xl text-white drop-shadow-lg'>
            Up to 50% off on selected items
          </p>
          <Link href={'/sale'}>
            <button className='mt-4 uppercase primary-button'>Shop sale</button>
          </Link>
        </div>

        {/* Dark overlay for better text readability */}
        <div className='absolute inset-0 bg-black/60 z-0' />
      </header>
      {/* Shop by category */}
      <section className='w-full flex flex-col items-center py-10 px-5'>
        <div className='flex flex-row items-center gap-5'>
          <div className='bg-amber-500 w-2 h-7'/>
          <h3 className='text-xl uppercase'>Shop by category</h3>
        </div>
        <div className='w-full py-15'>
          <CarouselContainer>
            {GROUP_ORDER.map((groupKey) => {
              const label = GROUP_LABELS[groupKey];
              const imageUrl = CATEGORY_IMAGES[groupKey] || '/hero.jpg';

              return (
                <CarouselItem
                  key={groupKey}
                  className='md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4'
                >
                  <Link href={`/category/${groupKey}`}>
                    <div className='group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-50'>
                      {/* Image */}
                      <Image
                        src={imageUrl}
                        alt={label}
                        fill
                        priority
                        className='object-cover group-hover:scale-110 transition-transform duration-500'
                      />

                      {/* Overlay */}
                      <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent' />

                      {/* Text */}
                      <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                        <h4 className='text-2xl md:text-3xl font-bold tracking-wide'>
                          {label}
                        </h4>
                        <div className='flex items-center gap-2 mt-2'>
                          <p className='text-sm opacity-90'>Shop Now</p>
                          <MoveRight
                            strokeWidth={1}
                            className='transition-transform duration-300 ease-out group-hover:translate-x-2'
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContainer>
        </div>
      </section>
      {/* New Arrivals */}
      <section className='flex flex-col items-center py-10 px-5'>
       <div className='flex flex-row items-center gap-5'>
          <div className='bg-amber-500 w-2 h-7'/>
          <h3 className='text-xl uppercase'>New arrivals</h3>
        </div>
        <div className='flex flex-col items-center py-7 gap-5 w-full'>
          <Suspense fallback={<ProductsContainerSkeleton />}>
            <ProductsContainer items={newArrivals} />
            <Link href={'/new-arrivals'}>
              <button className='group primary-button flex items-center justify-center'>
                <div className='flex justify-center items-center gap-2'>
                  <p>View all new arrivals</p>
                  <MoveRight
                    strokeWidth={1}
                    className='transition-transform duration-300 ease-out
                 group-hover:translate-x-2'
                  />
                </div>
              </button>
            </Link>
          </Suspense>
        </div>
      </section>
      {/* Benefits */}
      <BenefitsContainer />
    </>
  );
}
