'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import { Menu } from '@/lib/shopify/types';
import { Spin as Hamburger } from 'hamburger-react';
import Search from './search';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <div className="relative z-40">
        <Hamburger
          toggled={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          label="Open mobile menu"
          size={30}
        />
      </div>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white/70 pb-6 backdrop-blur-lg ">
              <div className="px-4 pb-4 pt-2">
                <div className="mb-4 text-darkPurple">
                  <Hamburger
                    toggled={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                    label="Close mobile menu"
                    size={30}
                  />
                </div>

                <div className="mb-4 w-full">
                  <Search />
                </div>
                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: Menu) => (
                      <li
                        className="py-2 text-xl font-semibold text-darkPurple transition-colors"
                        key={item.title}
                      >
                        <Link href={item.path} onClick={closeMobileMenu} className="hover-line">
                          {item.title}
                        </Link>
                        {item.items.length > 0 && (
                          <ul className="ml-4 mt-2 flex w-full flex-col">
                            {item.items.map((subItem) => (
                              <li
                                className="py-2 text-lg font-semibold text-darkPurple transition-colors"
                                key={subItem.title}
                              >
                                <Link
                                  href={subItem.path}
                                  onClick={closeMobileMenu}
                                  className="hover-line"
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
