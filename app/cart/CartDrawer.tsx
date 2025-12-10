'use client';
import CartArticle from '@/app/cart/CartArticle';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { CartItem } from '@/lib/cart';
import { totalSum } from '@/lib/helpers';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../../components/ui/separator';

interface CartDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  onUpdate: () => void;
}

export default function CartDrawer({
  isOpen,
  onOpenChange,
  cartItems,
  onUpdate,
}: CartDrawerProps) {
  const cartTotalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const cartTotalSum = totalSum(cartItems);

  return (
    <Drawer direction='right' open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent autoFocus className=' bg-white w-full'>
        <DrawerHeader className='flex flex-row justify-between items-center pb-10 w-full'>
          <DrawerTitle className='text-2xl font-bold'>
            My Cart ({cartTotalItems})
          </DrawerTitle>
          <DrawerClose asChild>
            <button className='p-2 cursor-pointer'>
              <X size={24} />
            </button>
          </DrawerClose>
        </DrawerHeader>
        <DrawerDescription />
        <div className='px-3 pb-8 overflow-y-auto'>
          <div className='flex flex-col gap-10'>
            {cartItems.length > 0 ? (
              cartItems.map((cartItem) => (
                <CartArticle
                  key={cartItem.product.id}
                  cartItem={cartItem}
                  size={110}
                  onUpdate={onUpdate}
                />
              ))
            ) : (
              <p className='text-gray-500'>Your cart is empty</p>
            )}
          </div>
        </div>
        <DrawerFooter>
          <div className='flex flex-col'>
            <Separator className='bg-black/20' />
            <div className='flex flex-row justify-between items-center my-10'>
              <span className='text-2xl font-semibold'>Total:</span>
              <span className='text-2xl font-bold'>${cartTotalSum}</span>
            </div>

            <div className='flex flex-col gap-2 w-full'>
              <button
                type='button'
                onClick={() => {
                  onOpenChange(false);
                }}
                className='primary-button w-full'
              >
                Continue to checkout
              </button>
              <Link href={'/cart'} className='w-full'>
                <button
                  type='button'
                  onClick={() => {
                    onOpenChange(false);
                  }}
                  className='secondary-button w-full'
                >
                  View cart
                </button>
              </Link>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
