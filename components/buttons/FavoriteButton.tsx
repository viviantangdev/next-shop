'use client';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  onClick: () => void;
  isFavorited?: boolean;
}
export default function FavoriteButton({
  onClick,
  isFavorited = false,
}: FavoriteButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`group favorite-button flex justify-center items-center gap-2 w-full ${isFavorited && 'text-red-700 ring-2 ring-red-200'}`}
    >
      <Heart
        size={15}
        className={`transition-all duration-400
                ${
                  isFavorited
                    ? 'fill-red-500 stroke-red-500 scale-110'
                    : 'fill-transparent stroke-black group-hover:stroke-3 group-hover:stroke-red-500'
                }`}
      />
      <span>{isFavorited === true? 'Saved': 'Add to favorites'}</span>
    </button>
  );
}
