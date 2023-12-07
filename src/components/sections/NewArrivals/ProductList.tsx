'use client';

import { useMediaQuery } from 'react-responsive';

// components
import ProductCard from '@/components/product/ProductCard';

// types
import { Product } from '@/lib/shopify/types';

const ProductList = ({ products }: { products: Product[] }) => {
  const isLg = useMediaQuery({ query: '(min-width: 1024px)' });
  return (
    <div className="grid w-full grid-cols-2 items-start justify-center gap-x-[4px] gap-y-[16px] xs:gap-x-[16px] md:gap-[32px] lg:grid-cols-3">
      {products.map((product, i) => (
        <ProductCard key={i} product={product} delay={(i % (isLg ? 3 : 2)) * 0.25} />
      ))}
    </div>
  );
};

export default ProductList;
