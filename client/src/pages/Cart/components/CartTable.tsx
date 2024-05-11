import { Image, NoData, Quantity } from '@common/components';
import { CartEmptyIcon, TrashIcon } from '@common/components/Icons';
import { CartItem } from '@common/types';
import { format } from '@common/utils';
import { IconButton, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { changeQuantity, removeFromCart } from '~/features/cart/cartSlice';

const CartTable = () => {
  const cart = useAppSelector((state) => state.cart);

  return (
    <Paper className="overflow-hidden">
      <h2 className="p-6 text-lg font-semibold">
        Giỏ hàng
        <span className="text-base font-normal text-fade">&nbsp;({cart.items.length} sản phẩm)</span>
      </h2>
      {cart.items.length > 0 ? (
        <Table aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell width="100%">Sản phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell align="right">Tổng</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.items.map((item) => (
              <CartRow key={item.product._id} data={item} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoData
          title="Giỏ hàng rỗng"
          subtitle="Có vẻ như bạn không có mặt hàng nào trong giỏ hàng."
          icon={<CartEmptyIcon width={160} height={160} />}
        />
      )}
    </Paper>
  );
};

interface CartRowProps {
  data: CartItem;
}

const CartRow: FC<CartRowProps> = ({ data }) => {
  const { product, quantity } = data;
  const dispatch = useAppDispatch();

  const finalPrice = product.discount ? product.price - product.price * product.discount : product.price;

  const handleRemove = () => {
    dispatch(removeFromCart(product._id));
  };

  const handleChangeQuantity = (value: number) => {
    dispatch(changeQuantity({ productId: product._id, quantity: value }));
  };

  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" gap={2} alignItems="center">
          <div className="flex-shrink-0 size-16">
            <Image src={product.thumbnail} rounded="xl" />
          </div>
          <h6 className="font-semibold line-clamp-2">{product.title}</h6>
        </Stack>
      </TableCell>
      <TableCell>{format.price(finalPrice)}</TableCell>
      <TableCell>
        <Quantity value={quantity} available={product.stock || 0} onChange={handleChangeQuantity} />
      </TableCell>
      <TableCell>{format.price(finalPrice * quantity)}</TableCell>
      <TableCell>
        <IconButton color="error" onClick={handleRemove}>
          <TrashIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartTable;