'use client';
import ProductCard from '@/components/ProductCard';
import { getFavorites } from '@/lib/favorites';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const favoriteProducts = getFavorites();

  if (favoriteProducts.length === 0) {
    return (
      <div className='container mx-auto py-16 text-center'>
        <Heart className='w-16 h-16 mx-auto text-gray-300 mb-6' />
        <h2 className='text-2xl mb-2'>Your favorites is empty :(</h2>
        <p className='text-gray-600'>Items you save will appear here.</p>
      </div>
    );
  }

  return (
    <>
      <div className='flex gap-2'>
        <Heart className='w-8 h-8 fill-red-500 text-red-500' />
        <h2 className='text-2xl mb-7'>My Favorites</h2>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </>
  );
}
