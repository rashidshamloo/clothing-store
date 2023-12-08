'use client';

import Link from 'next/link';

// data
import clothingImages from '@/data/clothing-images.json';
import clsx from 'clsx';
import Image from 'next/image';

// types
const images: Record<string, Array<{ title: string; image: string; url: string }>> = {};

images['clothing'] = clothingImages;

const SubMenu = ({
  items,
  parent
}: {
  items: { title: string; path: string }[];
  parent: string;
}) => {
  return (
    <div
      className="pointer-events-none absolute left-0 right-0 top-[79px] z-40 flex items-center justify-center border-t border-purple bg-white/70 py-[24px] opacity-0 backdrop-blur-lg transition-all duration-500"
      // border-b border-purple
    >
      <div className="flex w-full max-w-[670px] items-stretch justify-between">
        <nav className="flex flex-col items-start justify-start gap-6">
          <h3 className="sr-only">{parent} Sub Menu</h3>
          {items.map((item, i) => (
            <Link href={item.path} key={i} className="hover-line">
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-center gap-4">
          {images[parent.toLowerCase()]?.slice(0, 2).map((imageItem, i) => (
            <Link
              href={imageItem.url}
              key={i}
              title={imageItem.title}
              className={clsx(
                'transition-all hover:[&_img]:scale-110',
                i === 0 ? 'fade-up' : 'fade-up-delay'
              )}
              style={{ opacity: 0 }}
            >
              <div className="relative aspect-[7/10] h-[200px] overflow-hidden rounded-[8px]">
                <Image
                  src={imageItem.image}
                  alt={imageItem.title}
                  fill
                  className="object-cover transition-all duration-300 will-change-transform"
                  sizes="140px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubMenu;
