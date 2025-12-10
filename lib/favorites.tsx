import { ProductType } from './products';

export type FavoriteItem = ProductType;

const FAVORITES_STORAGE_KEY = 'favorites';

export function getFavorites(): ProductType[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse favorites', error);
    return [];
  }
}

export function saveFavorites(favorites: ProductType[]) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites', error);
  }
}



export function toggleFavorite(product: ProductType): ProductType[] {
  const favorites = getFavorites();
  const exists = favorites.some((p) => p.id === product.id);

const updated = exists
    ? favorites.filter(p => p.id !== product.id)
    : [...favorites, product];

  saveFavorites(updated);

  return updated;
}
