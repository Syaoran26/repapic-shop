import { FC } from 'react';
import { format } from '@common/utils';
import { Button, FormControl, InputAdornment, Link, OutlinedInput, Paper, Stack } from '@mui/material';
import { FaPen } from 'react-icons/fa6';
import config from '~/config';

interface OrderProps {
  editable?: boolean;
}

const Order: FC<OrderProps> = ({ editable = false }) => {
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
          <span className="font-semibold">{format.price(100000)}</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <span className="text-fade">Phí ship</span>
          <span className="font-semibold">Free</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <span className="text-fade">Giảm giá</span>
          <span className="font-semibold">-</span>
        </Stack>
        <hr className="border-t border-dashed" />
        <Stack direction="row" justifyContent="space-between" className="text-base font-semibold">
          <span>Tổng thanh toán</span>
          <span className="text-error">{format.price(120000)}</span>
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
