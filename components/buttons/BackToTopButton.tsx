'use client';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Back to top button
 * - Visible button when scrollY > 500px → Else is invisible
 * - Whenever button is clicked → Page scrolls to top
 */
export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleVisible, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={backToTop}
      className='cursor-pointer fixed bottom-6 right-6 z-50
        flex h-14 w-14 items-center justify-center rounded-full
        text-white shadow-2xl bg-black

        transition-all duration-500 ease-out
      hover:scale-110 hover:shadow-3xl'
      aria-label='Scroll to top'
    >
      <ArrowUp className='h-6 w-6' />
    </button>
  );
}
