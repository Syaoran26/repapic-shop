
import { FC } from 'react';
import { Avatar } from '@mui/material';
import { format } from '@common/utils';

export interface Product {
  name: string;
  image: string;
  type: string;
  price: number;
  quantity:number;
}
interface ProductProps {
  data: Product;
}

const ProductCart: FC<ProductProps> = ({ data }) => {
  return (
    <div className="flex flex-row items-center py-6 border-b-2 border-dashed min-w-[640px]">
      <Avatar
        alt="product"
        src={data.image}
        sx={{ width: 48, height: 48, borderRadius: '12px', marginRight: '16px' }}
        variant="rounded"
      ></Avatar>
      <div className="m-0 text-sm font-normal shrink grow basis-auto">
        <p>{data.name}</p>
        <p className="mt-1 text-fader">{data.type}</p>
      </div>
      <div className="text-sm font-normal">x{data.quantity}</div>
      <div className="text-sm font-semibold text-right w-[110px]">{format.price(data.price)}</div>
    </div>
  );
};

export default ProductCart;
