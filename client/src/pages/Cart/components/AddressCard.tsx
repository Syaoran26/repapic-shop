import { FC } from 'react';
import { AddressShipping } from '@common/types';
import { Button, Chip, Link, Paper, Stack } from '@mui/material';
import config from '~/config';

interface AddressCardProps {
  data: AddressShipping;
}

const AddressCard: FC<AddressCardProps> = ({ data }) => {
  return (
    <Paper className="flex flex-col justify-between gap-4 p-6 text-sm md:flex-row">
      <Stack gap={1}>
        <div className="flex items-center gap-2">
          <h6>{data.name}</h6>
          <span className="text-fade">({data.home ? 'Nhà ở' : 'Văn phòng'})</span>
          {data.isDefault && <Chip label="Mặc định" color="info" size="small" />}
        </div>
        <span className="text-fade">{data.addressStr}</span>
        <span className="text-fade">{data.phone}</span>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1} alignSelf="end">
        {!data.isDefault && (
          <Button variant="text" color="error" size="small">
            Xoá
          </Button>
        )}
        <Button variant="outlined" size="small" component={Link} href={config.routes.cartPayment}>
          Tiếp tục
        </Button>
      </Stack>
    </Paper>
  );
};

export default AddressCard;
