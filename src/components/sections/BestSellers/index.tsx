'use client';

// react
import { useState } from 'react';

// clsx
import clsx from 'clsx';

// components
import Slider from './Slider';

// types
const collections = ['clothing', 'bags', 'shoes', 'accessories'] as const;
export type Collection = (typeof collections)[number];

const BestSellers = () => {
  const [activeCollection, setActiveCollection] = useState<Collection>('clothing');
  return (
    <section className="flex w-full flex-col items-center justify-center gap-[24px] pb-[32px] pt-[24px] md:gap-[48px] md:pb-[64px] md:pt-[48px]">
      <div className="flex w-full max-w-[95%] flex-col items-center justify-center gap-2 font-lora font-medium text-veryDarkPurple md:w-[904px] md:flex-row md:justify-between md:gap-0">
        <h2 className="text-[clamp(28px,20px_+_2vw,40px)]">Best Sellers</h2>
        <div className="flex gap-4 text-[clamp(20px,10px_+_2vw,26px)] md:gap-8">
          {collections.map((collection, i) => (
            <button
              key={i}
              className={clsx(
                'relative cursor-pointer leading-[2] transition-all duration-300 first-letter:uppercase before:absolute before:bottom-0 before:left-1/2 before:h-[4px] before:-translate-x-1/2 before:bg-purple before:transition-all before:duration-300 hover:text-purple hover:before:w-full hover:before:opacity-100',
                {
                  'before:w-full before:opacity-100': collection === activeCollection,
                  'before:w-0 before:opacity-0': collection !== activeCollection
                }
              )}
              onClick={() => setActiveCollection(collection)}
            >
              {collection}
            </button>
          ))}
        </div>
      </div>
      <div className="relative max-w-full md:w-[904px]">
        <Slider collection={activeCollection} />
      </div>
    </section>
  );
};

export default BestSellers;
