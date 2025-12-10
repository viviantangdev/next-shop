import React from 'react';

interface IconWithBadgeProps {
  children: React.ReactNode;
  isBadgeVisible: boolean;
}

/**
 * Icon button with a rounded badge
 * - For Cart and Wishlist
 * - If at least 1 product added in Cart or Wishlist → Rounded badge will be visible
 */
export default function IconWithBadge({
  children,
  isBadgeVisible,
}: IconWithBadgeProps) {
  return (
    <button className='relative group cursor-pointer'>
      <div className='group-hover:scale-103 transition-transform duration-500'>
        {children}
      </div>
      {isBadgeVisible && (
        <div className='absolute top-[-5] right-[-10] h-3 w-3 bg-amber-500 rounded-full' />
      )}
    </button>
  );
}
