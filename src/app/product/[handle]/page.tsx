// next
import type { Metadata } from 'next';
// import Link from 'next/link';
import { notFound } from 'next/navigation';

// react
import { Suspense } from 'react';

// shopify
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants';
import { getProduct } from '@/lib/shopify';

// components
// import { ProductDescription } from '@/components/product/product-description';
import ProductDescription from '@/components/product/ProductDescription';
import ProductSlider from '@/components/product/ProductSlider';
import RecommendedItems from '@/components/product/RecommendedItems';

// types
// import { Image } from '@/lib/shopify/types';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

const ProductPage = async ({ params }: { params: { handle: string } }) => {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <section className="flex w-full flex-col items-center justify-center py-[24px] md:py-[48px]">
        <h2 className="sr-only">Product Information</h2>
        <article className="flex w-full max-w-[95%] flex-col items-stretch justify-center gap-4 md:w-[1000px] md:flex-row">
          <div className="max-w-[450px] md:w-1/2">
            <ProductSlider product={product} />
          </div>
          <div className="md:w-1/2">
            <ProductDescription product={product} />
          </div>
        </article>
        <Suspense>
          <RecommendedItems productId={product.id} />
        </Suspense>
      </section>
    </>
  );
};

export default ProductPage;
