import { getMenu } from '@/lib/shopify';

import Link from 'next/link';
import MobileMenu from './mobile-menu';

// next

// components
import Cart from '@/components/cart';
import OpenCart from '@/components/cart/open-cart';
import Logo from '@/components/layout/Logo';
import { Suspense } from 'react';
import Menu from './Menu';
import SearchIcon from './SearchIcon';

const Header = async () => {
  const menu = await getMenu('main-menu');
  return (
    <header className="flex w-full items-center justify-center border-b border-purple bg-white/80 px-[8px] py-[4px] md:h-[80px] md:py-0 xl:px-[48px]">
      <h1 className="sr-only">Rumusha</h1>
      <nav className="flex h-full w-full max-w-full items-center justify-between md:w-[1440px]">
        <h2 className="sr-only">Main Navigation Menu</h2>
        <div className="flex h-full w-full items-center justify-between">
          <div className="md:hidden">
            <MobileMenu menu={menu} />
          </div>
          <Link
            href="/"
            title="Home"
            className="header-link flex h-full items-center justify-center"
          >
            <Logo size="sm" />
          </Link>
          <Menu menu={menu} />
          <div className="flex h-full items-center justify-end md:w-[115px] xl:w-[150px]">
            <SearchIcon />
            {/* <Image src="/images/profile.png" width="36" height="36" alt="profile" /> */}
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
