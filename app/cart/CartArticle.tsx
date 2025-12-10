'use client';
import { MinusCircle, PlusCircle, Trash } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function CartArticle() {
  const [count, setCount] = useState(1);

  function handleCount(adjustment: number) {
    if (count + adjustment >= 0) {
      return setCount(count + adjustment);
    }
  }

  return (
    <article>
      <div className='flex flex-row gap-3'>
        <Image
          src={'/hero.jpg'}
          alt={''}
          width={250}
          height={250}
          priority
          className={`rounded-lg object-contain`}
        />
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col gap-2'>
            <p>Title</p>
            <div className='flex gap-3'>
              <p className='text-red-500 font-bold'>$price</p>
              <p className='font-bold'>$price</p>
            </div>
            <span className='text-sm text-red-500'>5%</span>
          </div>
          <div className='flex flex-row gap-3'>
            <button onClick={() => handleCount(-1)}>
              <MinusCircle />
            </button>
            <span>{count}</span>
            <button onClick={() => handleCount(+1)}>
              <PlusCircle />
            </button>
            <button>
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
