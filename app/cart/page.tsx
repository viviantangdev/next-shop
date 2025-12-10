'use client';
import { Separator } from '@/components/ui/separator';
import { getCartFromStorage } from '@/lib/cart';
import { totalSum } from '@/lib/helpers';
import { useState } from 'react';
import CartArticle from './CartArticle';

export default function CartPage() {
  const [cartItems, setCartItems] = useState(() => getCartFromStorage());

  const handleCartUpdate = () => {
    setCartItems(getCartFromStorage());
  };
  
  const cartTotalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const cartTotalSum = totalSum(cartItems);

  return (
    <>
      <h2 className='text-2xl font-bold mb-7'>My Cart ({cartTotalItems})</h2>
      <div className='flex flex-col gap-10'>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartArticle
              key={item.product.id}
              cartItem={item}
              onUpdate={handleCartUpdate}
            />
          ))
        ) : (
          <p className='text-gray-500'>Your cart is empty</p>
        )}
        <Separator className='bg-black/20' />
      </div>
      <div className='py-5 space-x-3'>
        <span className='text-2xl font-semibold'>Total:</span>
        <span className='text-2xl font-bold'>${cartTotalSum}</span>
      </div>
      {cartItems.length > 0 && (
        <button className='primary-button'>Continue to checkout</button>
      )}
    </>
  );
}
