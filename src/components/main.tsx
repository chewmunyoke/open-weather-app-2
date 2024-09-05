'use client';

import { useEffect, useRef } from 'react';

import { CSS_VAR_IMG_SIZE } from '@/constants';
import { debounce } from '@/utils/helpers';

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (mainRef.current) {
        const width = mainRef.current.clientWidth;
        mainRef.current.style.setProperty(CSS_VAR_IMG_SIZE, `${width / 2}px`);
      }
    };

    const resizeObserver = new ResizeObserver(
      debounce(() => handleResize(), 100)
    );
    if (mainRef.current) {
      resizeObserver.observe(mainRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <main className='responsive flex flex-col gap-y-4' ref={mainRef}>
      {children}
    </main>
  );
}
