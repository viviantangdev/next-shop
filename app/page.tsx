'use client';
import CarouselContainer from '@/components/CarouselContainer';
import { CarouselItem } from '@/components/ui/carousel';
import { BenefitItems } from '@/lib/benefits';
import { GROUP_LABELS, GROUP_ORDER } from '@/lib/categories';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <>
      <main className='space-y-12'>
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
            <h2 className='text-4xl font-bold text-white drop-shadow-2xl'>
              Biggest offer revealed
            </h2>
            <p className='mt-4 text-2xl text-white drop-shadow-lg'>
              Up to 50% off on selected items
            </p>
            <Link href={'/sale'}>
              <button className='mt-4 uppercase primary-button'>
                Shop sale
              </button>
            </Link>
          </div>

          {/* Dark overlay for better text readability */}
          <div className='absolute inset-0 bg-black/60 z-0' />
        </header>
        <section className='w-full flex flex-col items-center'>
          <h3 className='text-xl'>Shop by category</h3>
          <div className='w-full py-5'>
            <CarouselContainer>
              {GROUP_ORDER.map((groupKey) => {
                const label = GROUP_LABELS[groupKey];
                const imageUrl =
                  CATEGORY_IMAGES[groupKey] || '/placeholder.jpg';

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
                          className='object-cover group-hover:scale-110 transition-transform duration-500'
                        />

                        {/* Overlay */}
                        <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent' />

                        {/* Text */}
                        <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                          <h4 className='text-2xl md:text-3xl font-bold tracking-wide'>
                            {label}
                          </h4>
                          <p className='mt-2 text-sm opacity-90'>Shop Now</p>
                        </div>

                        {/* Hover glow effect */}
                        <div className='absolute inset-0 ring-4 ring-transparent group-hover:ring-white/30 transition-all duration-300 rounded-2xl' />
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContainer>
          </div>
        </section>
        {/* Benefits Section */}
        <section>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'>
              {BenefitItems.map((benefit, i) => (
                <div key={i} className='flex flex-col items-center text-center'>
                  <div className='w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                    {benefit.icon}
                  </div>
                  <h4 className='font-semibold text-gray-900 mb-1'>
                    {benefit.title}
                  </h4>
                  <p className='text-sm text-gray-600'> {benefit.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
