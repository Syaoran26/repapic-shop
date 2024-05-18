import { FC, MouseEvent } from 'react';
import { AddressShipping } from '@common/types';
import { Button, Paper, Stack } from '@mui/material';
import config from '~/config';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
import { deleteDelivery } from '~/features/deliveries/deliveriesSlice';

interface AddressCardProps {
  data: AddressShipping;
}

const AddressCard: FC<AddressCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    navigate(config.routes.cartPayment, { state: { delivery: data } });
  };

  const handleDelete = (id: string) => (event: MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteDelivery(id));
  };

  return (
    <Paper className="flex flex-col justify-between gap-4 p-6 text-sm md:flex-row">
      <Stack gap={1}>
        <div className="flex items-center gap-2">
          <h6 className="font-semibold">{data.name}</h6>
          <span className="text-fade">({data.isHome ? 'Nhà ở' : 'Văn phòng'})</span>
        </div>
        <span className="text-fade">{`${data.address.street}, ${data.address.detail}`}</span>
        <span className="text-fade">{data.phone}</span>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1} alignSelf="end" flexShrink={0}>
        <Button variant="text" color="error" size="small" onClick={handleDelete(data._id)}>
          Xoá
        </Button>
        <Button variant="outlined" size="small" onClick={handleClick}>
          Tiếp tục
        </Button>
      </Stack>
    </Paper>
  );
};

export default AddressCard;
