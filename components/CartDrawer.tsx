'use client';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/context/CartDrawerContext';
import { totalSum } from '@/lib/helpers';
import { X } from 'lucide-react';
import { useState } from 'react';
import CartArticle from './CartArticle';
import { Separator } from './ui/separator';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer } = useCartDrawer();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refreshKey, setRefreshKey] = useState(0); // ← Dummy state for refresh
  const { allCartItems } = useCart();
  const totalItems = allCartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = totalSum(allCartItems);

  const handleQuantityChange = () => {
    setRefreshKey((prev) => prev + 1); // ← Toggle to force re-render!
  };

  return (
    <Drawer
      direction='right'
      open={isCartDrawerOpen}
      onOpenChange={(open) => !open && closeCartDrawer()}
    >
      <DrawerContent className=' bg-white w-full'>
        <DrawerHeader className='flex flex-row justify-between items-center pb-10 w-full'>
          <DrawerTitle className='text-2xl font-bold'>
            My Cart ({totalItems})
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
            {allCartItems.length > 0 ? (
              allCartItems.map((cartItem) => (
                <CartArticle
                  key={cartItem.product.id}
                  cartItem={cartItem}
                  size={110}
                  onQuantityChange={handleQuantityChange}
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
              <span className='text-2xl font-bold'>${totalPrice}</span>
            </div>

            <button
              type='button'
              onClick={() => {
                closeCartDrawer();
              }}
              className='primary-button w-full'
            >
              Continue to checkout
            </button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
