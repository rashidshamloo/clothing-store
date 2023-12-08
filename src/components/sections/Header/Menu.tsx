'use client';

import Link from 'next/link';

import { Menu } from '@/lib/shopify/types';
import SubMenu from './SubMenu';

const Menu = ({ menu }: { menu: Menu[] }) => {
  return (
    <>
      {menu.length ? (
        <ul className="hidden h-full gap-[16px] text-base font-medium text-veryDarkPurple md:flex md:items-center lg:gap-[24px] lg:text-[18px] xl:gap-[48px]">
          {menu.map((item: Menu) => (
            <li
              key={item.title}
              className="h-full"
              onMouseLeave={(e) => {
                if (
                  !item.items.length ||
                  (e.relatedTarget as HTMLElement).parentElement === e.currentTarget
                )
                  return;
                ((e.currentTarget as HTMLLIElement).lastChild as HTMLDivElement).classList.add(
                  'opacity-0',
                  'pointer-events-none',
                  '[&_.fade-up]:animate-fadeOut',
                  '[&_.fade-up-delay]:animate-fadeOut'
                );
              }}
            >
              <Link
                href={item.path}
                className="header-link flex items-center justify-center transition-all duration-300 will-change-transform"
                onMouseEnter={(e) => {
                  if (!item.items.length) return;
                  const containerElement = (e.target as HTMLAnchorElement)
                    .nextSibling as HTMLDivElement;
                  if (!containerElement || !containerElement.classList.contains('opacity-0'))
                    return;
                  containerElement.classList.remove(
                    'opacity-0',
                    'pointer-events-none',
                    '[&_.fade-up]:animate-fadeOut',
                    '[&_.fade-up-delay]:animate-fadeOut',
                    '[&_.fade-up]:animate-fadeUp',
                    '[&_.fade-up-delay]:animate-fadeUpDelay'
                  );
                  void containerElement.offsetHeight;
                  containerElement.classList.add(
                    '[&_.fade-up]:animate-fadeUp',
                    '[&_.fade-up-delay]:animate-fadeUpDelay'
                  );
                }}
              >
                {item.title}
              </Link>
              {item.items.length > 0 && <SubMenu items={item.items} parent={item.title} />}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default Menu;
