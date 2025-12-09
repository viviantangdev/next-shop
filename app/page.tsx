'use client';
import CarouselContainer from '@/components/CarouselContainer';
import { CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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
              <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                Hej
              </CarouselItem>
              <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                då
              </CarouselItem>
              <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                bbbb
              </CarouselItem>
            </CarouselContainer>
          </div>
        </section>
      </main>
    </>
  );
}
