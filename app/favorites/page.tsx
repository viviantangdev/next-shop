'use client';
import ProductCard from '@/components/ProductCard';
import { getFavorites } from '@/lib/favorites';
import { ProductType } from '@/lib/product';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
const [favoriteProducts, setFavoriteProducts] = useState<ProductType[]>([]);

// Load once on mount (safe for hydration)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavoriteProducts(getFavorites());
  }, []);

  // Manual refresh function
  const refreshFavorites = () => {
    setFavoriteProducts(getFavorites());
  };

  if (favoriteProducts.length === 0) {
    return (
      <section className='container mx-auto py-16 text-center'>
        <Heart className='w-16 h-16 mx-auto text-gray-300 mb-6' />
        <h2 className='text-2xl mb-2'>Your favorites is empty :(</h2>
        <p className='text-gray-600'>Items you save will appear here.</p>
      </section>
    );
  }

  return (
    <>
      <section className='flex flex-row gap-2'>
        <Heart className='w-8 h-8 fill-red-500 text-red-500' />
        <h2 className='text-2xl mb-7'>My Favorites</h2>
      </section>
      <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 py-8 px-5 w-full md:w-auto'>
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} item={product} onFavoriteChange={refreshFavorites}/>
        ))}
      </section>
    </>
  );
}
