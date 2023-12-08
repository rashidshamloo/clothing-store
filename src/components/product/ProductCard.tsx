'use client';

// next
import Image from 'next/image';

// react
import { useMemo, useRef, useState } from 'react';

// framer motion
import { LazyMotion, domAnimation, m } from 'framer-motion';

// clsx
import clsx from 'clsx';

// utils
import { getNumberWithOrdinal } from '@/lib/utils';

// settings
import { colors } from '@/settings/colors';

// types
import { Product } from '@/lib/shopify/types';

const ProductCard = ({
  product,
  rank,
  delay = 0,
  duration = 0.5
}: {
  product: Product;
  rank?: number;
  delay?: number;
  duration?: number;
}) => {
  const [activeImage, setActiveImage] = useState('main');
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

  // my old method of getting color and image information
  // get unique color virants with images
  // inspired by: https://stackoverflow.com/a/58429784
  // const colorVariants = useMemo(
  //   () =>
  //     Array.from(
  //       new Map(
  //         product.variants
  //           // filter only variants that have the color key
  //           .filter((variant) => variant.selectedOptions[0]?.name === 'Color')
  //           // extract the needed information from each variant
  //           .map((variant) => ({
  //             name: variant.selectedOptions[0]?.value,
  //             image: variant.image.originalSrc
  //           }))
  //           // convert variants to a map with color name as the key
  //           // so that duplicate keys (colors) get removed
  //           .map((variant) => [variant.name, variant])
  //         // get the values (objects) only
  //       ).values()
  //     ),
  //   [product.variants]
  // );

  // get unique color virants with images
  const colorVariants = useMemo(
    () =>
      product.options
        .find((option) => option.name === 'Color')
        ?.values.map((color) => ({
          name: color,
          image:
            product.variants.find(
              (variant) =>
                variant.selectedOptions[0]?.name === 'Color' &&
                variant.selectedOptions[0].value === color
            )?.image.originalSrc || ''
        })) || [],
    [product.options, product.variants]
  );

  return (
    <LazyMotion features={domAnimation}>
      <m.article
        className="relative flex w-[180px] flex-col items-center justify-center gap-[10px] sm:w-[280px]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeOut', duration, delay }}
        viewport={{ once: true }}
      >
        <a
          href={'/product/' + product.handle}
          onMouseEnter={() => {
            setActiveImage('hover');
            clearTimeout(timeoutId.current);
          }}
          onMouseLeave={() => setActiveImage('main')}
        >
          <div className="relative aspect-[7/10] h-[257px] overflow-hidden rounded-[16px] sm:h-[400px]">
            {rank !== undefined && (
              <div className="absolute left-0 top-0 z-10 flex aspect-square w-[20%] max-w-[56px] items-center justify-center rounded-br-[16px] bg-white/50 text-[clamp(16px,4px_+_2vw,24px)] font-bold text-veryDarkPurple/70 backdrop-blur-sm">
                {getNumberWithOrdinal(rank)}
              </div>
            )}
            <Image
              src={product.images[0]?.url || ''}
              alt="product image"
              fill
              sizes="(min-width: 768px) 280px, 180px"
              className={clsx('object-cover transition-all duration-500 will-change-transform', {
                'opacity-0': activeImage !== 'main',
                'opacity-100': activeImage === 'main'
              })}
            />
            <Image
              src={product.images[1]?.url || ''}
              alt="product image"
              fill
              sizes="(min-width: 768px) 280px, 180px"
              className={clsx('object-cover transition-all duration-500 will-change-transform', {
                'opacity-0': activeImage !== 'hover',
                'opacity-100': activeImage === 'hover'
              })}
            />
            {colorVariants.map((variant, i) => {
              return (
                <Image
                  key={i}
                  src={variant.image}
                  fill
                  sizes="(min-width: 768px) 280px, 180px"
                  alt="product image"
                  className={clsx(
                    'object-cover transition-all duration-300 will-change-transform',
                    {
                      'opacity-0': activeImage !== variant.image,
                      'opacity-100': activeImage === variant.image
                    }
                  )}
                />
              );
            })}
          </div>
        </a>
        <div className="flex flex-wrap items-center justify-center gap-[24px] lg:gap-[8px]">
          {colorVariants.map((variant, i) => {
            return (
              <button
                key={i}
                className="aspect-square w-[20px] cursor-pointer rounded-full border border-purple"
                style={{ backgroundColor: colors[variant.name as keyof typeof colors] }}
                onClick={() => setActiveImage(variant.image)}
                onMouseLeave={() => {
                  timeoutId.current = setTimeout(() => setActiveImage('main'), 2000);
                }}
                onMouseEnter={() => clearTimeout(timeoutId.current)}
                title={variant.name}
              />
            );
          })}
        </div>
        <a href={'/product/' + product.handle}>
          <h3 className="text-center font-quicksand text-[clamp(20px,8px_+_2vw,22px)] font-bold text-darkPurple transition-all duration-300 hover:text-purple">
            {product.title}
          </h3>
        </a>
        <p className="font-lora text-[clamp(20px,8px_+_2vw,24px)] text-darkPurple">
          {Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(
            Number(product.priceRange.minVariantPrice.amount)
          )}
        </p>
      </m.article>
    </LazyMotion>
  );
};

export default ProductCard;
