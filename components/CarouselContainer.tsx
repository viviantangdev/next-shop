'use client';
import { Dispatch, SetStateAction } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

interface CarouselProps {
  children: React.ReactNode;
  setApi?: Dispatch<SetStateAction<CarouselApi | undefined>>;
}

export default function CarouselContainer({ children, setApi }: CarouselProps) {
  return (
    <div className='relative w-full h-full'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className='w-full h-full rounded-2xl '
      >
        <CarouselContent>{children}</CarouselContent>
        <CarouselPrevious className='cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white' />
        <CarouselNext className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white' />
      </Carousel>
    </div>
  );
}
