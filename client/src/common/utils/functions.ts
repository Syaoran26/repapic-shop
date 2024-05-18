import { Product } from '@common/types';

const finalPrice = ({ price, discount }: Product) => {
  return price - (price * (discount || 0)) / 100;
};

const functions = { finalPrice };

export default functions;
