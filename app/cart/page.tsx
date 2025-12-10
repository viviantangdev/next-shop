'use client';
import { Separator } from '@/components/ui/separator';
import CartArticle from './CartArticle';

export default function CartPage() {
  return (
    <>
      <h2 className='text-2xl font-bold mb-7'>My Cart (0)</h2>
      <div className='flex flex-col gap-10'>
        {[Array.from({ length: 4 }).map((item, i) => <CartArticle key={i} />)]}
        <Separator className='bg-black/20' />
      </div>
      <div className='py-5 space-x-3'>
        <span className='text-2xl font-semibold'>Total:</span>
        <span className='text-2xl font-bold'>$XXXX</span>
      </div>
      <button className='primary-button'>Checkout</button>
    </>
  );
}
