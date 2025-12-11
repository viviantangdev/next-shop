'use client';
import { CartItem, removeItemFromCart, updateItemQuantity } from '@/lib/cart';
import { MinusCircle, PlusCircle, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface CartArticleProps {
  size?: number;
  cartItem: CartItem;
  onQuantityChange: () => void;
}
export default function CartArticle({
  size = 120,
  cartItem,
  onQuantityChange,
}: CartArticleProps) {
  const [count, setCount] = useState(cartItem.quantity || 1);

  const totalAricleSum = (
    cartItem.product.finalPrice * cartItem.quantity
  ).toFixed(2);

  function handleCount(adjustment: number) {
    const newCount = count + adjustment;
    if (newCount <= 0 && cartItem) {
      // Remove item if quantity drops to 0
      removeItemFromCart(cartItem.product.id);
    } else if (newCount >= 1 && cartItem) {
      setCount(newCount);
      updateItemQuantity(cartItem.product.id, newCount);
    }
    onQuantityChange();
  }

  function handleRemove() {
    if (cartItem) {
      removeItemFromCart(cartItem.product.id);
    }
    onQuantityChange();
  }

  if (!cartItem) {
    return null;
  }

  return (
    <article>
      <div className='flex flex-row gap-3 w-full'>
        <Link href={`/product/${cartItem.product.id}`}>
          <Image
            src={cartItem.product.images[0]}
            alt={cartItem.product.title}
            width={size}
            height={size}
            priority
            className={`rounded-lg object-contain shadow-md`}
          />
        </Link>
        <div className='flex flex-col justify-between w-full'>
          <span className='text-sm'>{cartItem.product.title}</span>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col'>
              <span
                className={`font-bold ${
                  cartItem.product.isOnSale && 'text-red-500 '
                }`}
              >
                ${totalAricleSum}
              </span>
              {cartItem.product.isOnSale && (
                <div className='flex items-center gap-2'>
                  <div>
                    <span className='text-xs text-gray-500'>
                      Orignal price:
                    </span>
                    <span className='text-xs line-through text-gray-500'>
                      ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
                    </span>
                  </div>
                  <span className='text-xs text-red-500'>
                    (-{Math.round(cartItem.product.discountPercentage)}%)
                  </span>
                </div>
              )}
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex flex-row gap-3'>
                <button
                  onClick={() => handleCount(-1)}
                  className='cursor-pointer'
                >
                  <MinusCircle />
                </button>
                <span>{count}</span>
                <button
                  onClick={() => handleCount(+1)}
                  className='cursor-pointer'
                >
                  <PlusCircle />
                </button>
              </div>
              <button
                onClick={handleRemove}
                className='cursor-pointer hover:text-red-500 transition-all duration-300'
              >
                <Trash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
