// app/components/ScrollToTop.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Scroll to top
 * - Whenever the pathname is change → Page scrolls to top
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on every route change (including search params)
    window.scrollTo(0, 0);


  }, [pathname]
  );

  return null;
}