// components
import Categories from './Categories';
import CopyRight from './CopyRight';
import Disclaimer from './Disclaimer';
import PaymentMethods from './PaymentMethods';
import SocialMedia from './SocialMedia';

const index = () => {
  return (
    <footer className="flex items-center justify-center border-t-[1px] border-purple p-[24px] md:p-[48px]">
      <h2 className="sr-only">Footer</h2>
      <div className="flex w-full max-w-full flex-col items-start justify-between md:w-[1440px] md:flex-row">
        <Categories />
        <div className="my-8 flex flex-col items-center justify-center gap-8 md:my-0">
          <SocialMedia />
          <CopyRight />
          <PaymentMethods />
        </div>
        <Disclaimer />
      </div>
    </footer>
  );
};

export default index;
