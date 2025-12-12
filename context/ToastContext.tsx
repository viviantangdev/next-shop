'use client';
import { ProductType } from '@/lib/product';
import { ShoppingCart, Trash } from 'lucide-react';
import { createContext, useContext } from 'react';
import { toast } from 'sonner';

type ToastContextType = {
  toastCart: (item: ProductType) => void;
  toastDelete: (item: ProductType) => void;
  toastFavorite: (item: ProductType, isFavorited: boolean) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastCart = (item: ProductType) =>
    toast.success('Added to cart', {
      description: item.title,
      icon: <ShoppingCart className='size-4 text-emerald-500' />,
    });
  const toastDelete = (item: ProductType) =>
    toast.success('Deleted from cart', {
      description: item.title,
      icon: <Trash className='size-4 text-red-500' />,
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
    <ToastContext.Provider value={{ toastCart, toastFavorite, toastDelete }}>
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
