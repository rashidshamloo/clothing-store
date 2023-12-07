'use client';

// next
import Image from 'next/image';

// react-scroll-parallax
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

const Promotions = () => {
  return (
    <ParallaxProvider>
      <div className="relative h-[570px] overflow-hidden sm:h-screen">
        <h2 className="sr-only">Promotions</h2>
        <Parallax speed={-50} className="relative hidden h-full w-full sm:block">
          <Image
            src="/images/promotions/winter.jpg"
            alt="winter collection"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="block h-full w-full sm:hidden">
          <Image
            src="/images/promotions/winter.jpg"
            alt="winter collection"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute right-[5%] top-[50%] flex w-[65%] max-w-[610px] -translate-y-1/2 flex-col items-center justify-center gap-[16px] rounded-[16px] bg-white/30 p-[16px] text-center md:gap-[32px] md:p-[32px]">
          <h3 className="font-lora text-[clamp(24px,14px_+_2vw,60px)] font-bold leading-[1.5] text-white drop-shadow-md">
            Stay Warm,
            <br />
            Stay Stylish
          </h3>
          <p className="text-[clamp(18px,10px_+_2vw,32px)] font-semibold text-veryDarkPurple drop-shadow-md">
            Stay cozy and fashionable this winter with our winter collection!
          </p>
          <a className="btn text-[clamp(16px,8px_+_2vw,22px)]" href="/search/winter-2024">
            View Collection
          </a>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default Promotions;
