import React from 'react';

interface IconWithBadgeProps {
  children: React.ReactNode;
  isBadgeVisible: boolean;
  onClick?: () => void;
}

/**
 * Icon button with a rounded badge
 * - For Cart and Favorites
 * - If at least 1 product added in Cart or Favorites → Rounded badge will be visible
 */
export default function IconWithBadge({
  children,
  isBadgeVisible,onClick
}: IconWithBadgeProps) {
  return (
    <button onClick={onClick} className='relative group cursor-pointer'>
      <div className='group-hover:scale-103 transition-transform duration-500'>
        {children}
      </div>
      {isBadgeVisible && (
        <div className='absolute top-[-5] right-[-10] h-3 w-3 bg-amber-500 rounded-full' />
      )}
    </button>
  );
}
