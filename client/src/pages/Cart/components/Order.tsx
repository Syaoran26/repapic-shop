import { FC, useEffect } from 'react';
import { format, functions } from '@common/utils';
import { Button, FormControl, InputAdornment, Link, OutlinedInput, Paper, Stack } from '@mui/material';
import { FaPen } from 'react-icons/fa6';
import config from '~/config';
import { ShippingCost, ShippingEnum } from '../constants';
import { useAppSelector } from '~/app/hooks';

interface OrderProps {
  editable?: boolean;
  shipping?: ShippingEnum;
  getTotal?: (value: number) => void;
}

const Order: FC<OrderProps> = ({ editable = false, shipping, getTotal }) => {
  const { items } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce((total, item) => total + functions.finalPrice(item.product) * item.quantity, 0);
  const total = subtotal + (shipping ? ShippingCost[shipping] : 0);

  useEffect(() => {
    getTotal?.(total);
  }, [total, getTotal]);

  return (
    <Paper className="p-6">
      <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom={3}>
        <h2 className="text-lg font-semibold">Chi tiết thanh toán</h2>
        {editable && (
          <Button
            variant="text"
            size="small"
            startIcon={<FaPen size={16} />}
            component={Link}
            href={config.routes.cart}
          >
            Sửa
          </Button>
        )}
      </Stack>
      <Stack gap={2} className="text-sm">
        <Stack direction="row" justifyContent="space-between">
          <span className="text-fade">Tổng tiền hàng</span>
          <span className="font-semibold">{format.price(subtotal)}</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <span className="text-fade">Phí ship</span>
          <span className="font-semibold">{shipping ? format.price(ShippingCost[shipping]) : 'Free'}</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <span className="text-fade">Giảm giá</span>
          <span className="font-semibold">-</span>
        </Stack>
        <hr className="border-t border-dashed" />
        <Stack direction="row" justifyContent="space-between" className="text-base font-semibold">
          <span>Tổng thanh toán</span>
          <span className="text-error">{format.price(total)}</span>
        </Stack>
        {!editable && (
          <FormControl>
            <OutlinedInput
              placeholder="Mã giảm giá"
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="text" color="primary">
                    Áp dụng
                  </Button>
                </InputAdornment>
              }
            />
          </FormControl>
        )}
      </Stack>
    </Paper>
  );
};

export default Order;
