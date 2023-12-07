'use client';

// react
import { useRef, useState } from 'react';

// next
import Image from 'next/image';

//clsx
import clsx from 'clsx';

// swiper
import { A11y, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

// types
import { Product } from '@/lib/shopify/types';

const ProductSlider = ({ product }: { product: Product }) => {
  // swiper
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const swiper = useRef<SwiperClass | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="sticky top-1">
      <div className="flex flex-col items-center justify-center gap-[24px] pb-[24px] md:hidden">
        <h2 className="font-lora text-[clamp(28px,18px_+_2vw,40px)] font-bold leading-[1] text-darkPurple">
          {product.title}
        </h2>
      </div>
      <div className="relative">
        <Swiper
          modules={[Navigation, A11y, Thumbs]}
          navigation={{ nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev' }}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
          }}
          onSwiper={(s) => {
            swiper.current = s;
          }}
          onSlidesUpdated={(s) => {
            setIsEnd(s.isEnd);
            setIsStart(s.isBeginning);
          }}
          onSlideChange={(s) => {
            setIsEnd(s.isEnd);
            setIsStart(s.isBeginning);
          }}
          className="w-full max-w-[80%] rounded-[16px]"
        >
          {product.images.map((image, i) => (
            <SwiperSlide className="relative aspect-[7/10] cursor-pointer" key={i}>
              <Image
                src={image.url || ''}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 25vw, 80vw"
                priority={i === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={clsx(
            'absolute right-[1%] top-1/2 font-[swiper-icons] text-[40px] transition-all duration-300 will-change-transform -translate-y-1/2',
            {
              'text-purple hover:text-darkPurple hover:drop-shadow-lg hover:scale-110': !isEnd,
              'text-purple/30': isEnd
            }
          )}
          onClick={() => swiper.current?.slideNext()}
          disabled={isEnd}
        >
          next
        </button>
        <button
          className={clsx(
            'absolute left-[1%] top-1/2 font-[swiper-icons] text-[40px] transition-all duration-300 will-change-transform -translate-y-1/2',
            {
              'text-purple hover:text-darkPurple hover:drop-shadow-lg hover:scale-110': !isStart,
              'text-purple/30': isStart
            }
          )}
          onClick={() => swiper.current?.slidePrev()}
          disabled={isStart}
        >
          prev
        </button>
      </div>
      <Swiper
        modules={[Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        slidesPerView="auto"
        spaceBetween={8}
        className="mt-4 [&_.swiper-slide-thumb-active]:border-darkPurple [&_not(.swiper-slide-thumb-active)]:border-transparent"
      >
        {product.images.map((image, i) => (
          <SwiperSlide
            className="relative aspect-[7/10] !w-[100px] cursor-pointer overflow-hidden rounded-[8px] border-2"
            key={i}
          >
            <Image
              src={image.url || ''}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 100px, 25vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
