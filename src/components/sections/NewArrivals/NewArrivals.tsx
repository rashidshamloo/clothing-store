// shopify
import { getProducts } from '@/lib/shopify';

// components
import ProductList from './ProductList';

const NewArrivals = async () => {
  const products = await getProducts({ sortKey: 'CREATED_AT', reverse: true, first: 6 });
  return (
    <section className="flex w-full items-center justify-center pb-[48px] pt-[24px] md:pt-[48px]">
      <div className="flex flex-col items-center justify-center gap-[24px] sm:max-w-[95%] md:w-[904px] md:gap-[48px]">
        <h2 className="w-full text-center font-lora text-[clamp(28px,20px_+_2vw,40px)] font-medium text-veryDarkPurple md:text-left">
          New Arrivals
        </h2>
        <ProductList products={products} />
        <a href="/search/all-products" className="btn text-[clamp(18px,10px_+_2vw,22px)]">
          View More
        </a>
      </div>
    </section>
  );
};

export default NewArrivals;
