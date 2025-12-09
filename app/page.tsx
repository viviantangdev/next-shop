'use client';
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
      </main>
    </>
  );
}
