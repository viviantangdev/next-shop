'use client';
import { ProductType } from '@/lib/types';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Dispatch, SetStateAction } from 'react';

interface CarouselProps {
  item: ProductType;
  setApi: Dispatch<SetStateAction<CarouselApi | undefined>>;
}

export default function CarouselContainer({ item , setApi}: CarouselProps) {
  return (
    <div className='relative w-full h-full'>
      <Carousel
      setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className='w-full h-full rounded-2xl shadow-lg'
      >
        <CarouselContent>
          {item.images.map((item, index) => (
            <CarouselItem key={index} className='w-full'>
              <div className="relative w-full h-64 md:h-[420px]">
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
        </CarouselContent>
        <CarouselPrevious className='cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-10' />
        <CarouselNext className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-10' />
      </Carousel>
    </div>
  );
}
