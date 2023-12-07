'use client';

// react
import { useCallback, useEffect, useRef, useState } from 'react';

//clsx
import clsx from 'clsx';

// swiper
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import { useMediaQuery } from 'react-responsive';

// server actions
import { getProducts } from './getProducts';

// types
import { Product } from '@/lib/shopify/types';
import { Collection } from '.';

// components
import ProductCard from '../../product/ProductCard';

const Slider = ({ collection }: { collection: Collection }) => {
  const isSm = useMediaQuery({ query: '(min-width: 480px)' });

  const [products, setProducts] = useState<Product[]>([]);

  // swiper
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const swiper = useRef<SwiperClass | null>(null);

  const updateProducts = useCallback(async (collection: Collection) => {
    try {
      setProducts(await getProducts(collection));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    updateProducts(collection);
  }, [collection, updateProducts]);

  useEffect(() => {
    swiper.current && swiper.current.slideTo(0, 0);
  }, [products]);

  return (
    <>
      <Swiper
        modules={[Navigation, A11y]}
        slidesPerView="auto"
        spaceBetween={16}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        breakpoints={{
          768: {
            spaceBetween: 32,
            slidesOffsetBefore: 32,
            slidesOffsetAfter: 32
          },
          1024: {
            spaceBetween: 32,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0
          }
        }}
        navigation={{ nextEl: 'swiper-button-next', prevEl: 'swiper-button-prev' }}
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
      >
        {products.map((product, i) => (
          <SwiperSlide key={product.handle} className="!w-[180px] sm:!w-[280px]">
            <ProductCard
              product={product}
              delay={i > (isSm ? 2 : 1) ? 0 : i * 0.5}
              duration={i > (isSm ? 2 : 1) ? 0 : undefined}
              rank={i + 1}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={clsx(
          'absolute -right-[5%] top-[180px] hidden font-[swiper-icons] text-[40px] transition-all duration-300 will-change-transform lg:block',
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
          'absolute -left-[5%] top-[180px] hidden font-[swiper-icons] text-[40px] transition-all duration-300 will-change-transform lg:block',
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
    </>
  );
};

export default Slider;
