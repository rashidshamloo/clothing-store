// next
import Image from 'next/image';

// data
import paymentMethods from '@/data/payment-methods.json';

const PaymentMethods = () => {
  return (
    <div className="flex">
      {paymentMethods.map((paymentMethod, i) => (
        <Image src={paymentMethod.image} alt={paymentMethod.title} width="66" height="49" key={i} />
      ))}
    </div>
  );
};

export default PaymentMethods;
