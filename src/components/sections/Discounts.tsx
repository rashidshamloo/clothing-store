// react-fast-marquee
import Marquee from 'react-fast-marquee';

const Discounts = () => {
  return (
    <div className="bg-veryDarkPurple px-[4px] py-[3px] font-medium text-white md:px-[8px] md:py-[6px] md:text-[18px]">
      <Marquee autoFill={true}>
        <div className="ml-[32px] flex items-center justify-center gap-[32px]">
          <p>FREE SHIPPING on all orders above ¥20000</p>
          <div className="aspect-square w-[8px] rounded-full bg-white" />
        </div>
      </Marquee>
    </div>
  );
};

export default Discounts;
