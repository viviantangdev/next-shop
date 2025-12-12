// app/components/ScrollToTop.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Scroll to top
 * - Whenever the pathname is change → Page scrolls to top
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Scroll to top on every route change (including search params)
    window.scrollTo(0, 0);


  }, [pathname, searchParams]
  );

  return null;
}