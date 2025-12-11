'use client';
import { ProductType } from '@/lib/products';
import Image from 'next/image';
import { createContext, useContext } from 'react';
import { toast } from 'sonner';

type ToastContextType = {
  toastCart: (item: ProductType) => void;
  toastFavorite: (item: ProductType, isFavorited: boolean) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastCart = (item: ProductType) =>
    toast.success('Added to cart ✓', {
      description: item.title,
      icon: (
        <Image
          src={item.images[0]}
          alt={item.title}
          height={10}
          width={10}
          className='object-contain'
        />
      ),
    });
  const toastFavorite = (item: ProductType, isFavorited: boolean) =>
    toast.success(
      isFavorited ? 'Removed from favorites' : 'Added to favorites',
      {
        description: item.title,
        icon: isFavorited ? '💔' : '❤️',
      }
    );

  return (
    <ToastContext.Provider value={{ toastCart, toastFavorite }}>
      {children}
    </ToastContext.Provider>
  );
}

// Custom hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
