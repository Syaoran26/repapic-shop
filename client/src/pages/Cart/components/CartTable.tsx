import { Image, NoData, Quantity } from '@common/components';
import { CartEmptyIcon, TrashIcon } from '@common/components/Icons';
import { useDebounce, useUpdateEffect } from '@common/hooks';
import { CartItem } from '@common/types';
import { format } from '@common/utils';
import { IconButton, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FC, useState } from 'react';
import SimpleBar from 'simplebar-react';
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
      <SimpleBar>
        {cart.items.length > 0 ? (
          <Table aria-label="cart table" className="min-w-[720px]">
            <TableHead>
              <TableRow>
                <TableCell width={350}>Sản phẩm</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell align="center">Số lượng</TableCell>
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
            title="Giỏ hàng trống"
            subtitle="Có vẻ như bạn không có mặt hàng nào trong giỏ hàng."
            icon={<CartEmptyIcon width={160} height={160} />}
          />
        )}
      </SimpleBar>
    </Paper>
  );
};

interface CartRowProps {
  data: CartItem;
}

const CartRow: FC<CartRowProps> = ({ data }) => {
  const { product, quantity } = data;
  const dispatch = useAppDispatch();
  const [rowQuantity, setRowQuantity] = useState(quantity);
  const debounceQuantity = useDebounce(rowQuantity, 250);

  const finalPrice = product.discount ? product.price - product.price * product.discount : product.price;

  const handleRemove = () => {
    dispatch(removeFromCart(product._id));
  };

  const handleChangeQuantity = (value: number) => {
    setRowQuantity(value);
  };

  useUpdateEffect(() => {
    dispatch(changeQuantity({ product, quantity: debounceQuantity }));
  }, [debounceQuantity]);

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
      <TableCell align="center">
        <Quantity value={rowQuantity} available={product.stock || 0} onChange={handleChangeQuantity} />
      </TableCell>
      <TableCell align="right">{format.price(finalPrice * rowQuantity)}</TableCell>
      <TableCell>
        <IconButton color="error" onClick={handleRemove}>
          <TrashIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartTable;
