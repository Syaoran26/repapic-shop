import { FC } from 'react';
import { Avatar } from '@mui/material';
import { format } from '@common/utils';
import { CartItem } from '@common/types';

interface ProductProps {
  data: CartItem;
}

const ProductCart: FC<ProductProps> = ({ data }) => {
  return (
    <div className="flex flex-row items-center py-6 border-b-2 border-dashed min-w-[640px]">
      <Avatar
        alt="product"
        src={data.product.thumbnail}
        sx={{ width: 48, height: 48, borderRadius: '12px', marginRight: '16px' }}
        variant="rounded"
      ></Avatar>
      <div className="m-0 text-sm font-normal shrink grow basis-auto">
        <p>{data.product.title}</p>
      </div>
      <div className="text-sm font-normal">x{data.quantity}</div>
      <div className="text-sm font-semibold text-right w-[110px]">{format.price(data.product.price)}</div>
    </div>
  );
};

export default ProductCart;
