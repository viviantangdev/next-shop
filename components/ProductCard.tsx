'use client';
import { Badge } from '@/components/ui/badge';
import { ProductType } from '@/lib/types';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  item: ProductType;
}
export default function ProductCard({ item }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className='product-card'>
      <div className='group relative h-54 w-full overflow-hidden '>
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className='object-cover transition-transform duration-700 group-hover:scale-110 mask-[linear-gradient(to_bottom,white_92%,transparent)]'
        />
        <Heart
          size={35}
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute right-3 top-3 stroke-1 transition-all duration-500 hover:stroke-red-500 ${
            isLiked ? 'fill-red-500 stroke-red-500' : 'stroke-zinc-600 '
          }`}
        />
      </div>
      <div className='flex flex-col h-50 md:h-40 justify-between p-2'>
        <div className='flex flex-col gap-2'>
          <span className='font-semibold'>{item.title}</span>
          <Badge variant='secondary' className='bg-slate-200 font-light '>
            {item.category}
          </Badge>
        </div>
        <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-end'>
          <span className='font-bold text-xl'>${item.price}</span>
          <button className='icon-button flex justify-center items-center gap-2'>
            <ShoppingCart size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
