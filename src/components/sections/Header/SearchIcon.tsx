'use client';

// react
import { useEffect, useRef, useState } from 'react';

// next
import Image from 'next/image';

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

// components
import Search from './search';

const SearchIcon = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    isSearchVisible && ref.current && ref.current.querySelector<HTMLInputElement>('input')?.focus();
  }, [isSearchVisible]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') setIsSearchVisible(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });
  return (
    <>
      <button
        title="search"
        onClick={() => setIsSearchVisible(!isSearchVisible)}
        className="header-link hidden md:block [&>*]:transition-all [&>*]:duration-300 hover:[&>*]:opacity-50"
      >
        <Image src="/images/magnifier.png" width="36" height="36" alt="search" />
      </button>
      <AnimatePresence>
        {isSearchVisible && (
          <div
            className="absolute inset-0 z-40 hidden md:block"
            onClick={() => setIsSearchVisible(false)}
          >
            <LazyMotion features={domAnimation}>
              <m.div
                className="absolute left-0 right-0 top-[80px] flex h-[50px] items-center justify-center bg-white/70 backdrop-blur-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                onClick={(e) => e.stopPropagation()}
                ref={ref}
              >
                <Search />
              </m.div>
            </LazyMotion>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchIcon;
