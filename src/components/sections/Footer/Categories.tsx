// next
import Link from 'next/link';

// shopify
import { getMenu } from '@/lib/shopify';

const Categories = async () => {
  const menu = await getMenu('main-menu');
  return (
    <div className="flex w-full flex-col items-center justify-center md:w-auto md:items-start md:justify-start">
      <h3 className="text-[20px] font-semibold text-veryDarkPurple">Navigation</h3>
      <div className="mt-4 flex flex-col items-start justify-start gap-2 md:mt-2">
        {menu.map((menuItem, i) => (
          <div
            className="mb-4 flex flex-col gap-4 text-darkPurple md:mb-0 md:flex-row md:pl-[14px]"
            key={i}
          >
            <Link href={menuItem.path} key={i} className="hover-line text-[18px] font-semibold">
              {menuItem.title}
            </Link>
            {menuItem.items.map((subMenuItem, i) => (
              <Link href={subMenuItem.path} key={i} className="hover-line ml-4 text-[18px] md:ml-0">
                {subMenuItem.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
