import { useState } from 'react';
import { CityPicker, DistrictPicker, WardPicker } from '@common/components';
import { Avatar, Button, Paper, TextField } from '@mui/material';
import * as yup from 'yup';
import { useAppSelector } from '~/app/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  name: yup.string().min(2, 'Vui lòng nhập ít nhất 2 kí tự'),
  phone: yup.string(),
  description: yup.string(),
});

const AccountGeneral = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [address, setAddress] = useState({
    city: '',
    district: '',
    ward: '',
    street: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    console.log({ ...data, address });
  };

  return (
    <div className="grid-cols-3 lg:grid">
      <div className="col-span-1 p-3">
        <Paper>
          <div className="px-6 pt-20 pb-10 text-center">
            <div className="p-2 m-auto border border-dashed rounded-full cursor-pointer w-36 h-36">
              <Avatar alt="avatar" src="/images/avatar/avatar_25.jpg" sx={{ width: 126.5, height: 126.5 }} />
            </div>
            <div className="mt-6 text-xs text-fade">
              Allowed *.jpeg, *.jpg, *.png, *.gif <br /> max size of 3 Mb
            </div>
          </div>
        </Paper>
      </div>
      <div className="col-span-2 p-3">
        <Paper className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid-cols-2 gap-y-6 gap-x-4 md:grid ">
              <TextField
                id="name"
                label="Tên"
                defaultValue={user?.name}
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField id="email" label="Email" disabled defaultValue={user?.email} />
              <TextField id="phoneNumber" label="Số điện thoại" {...register('phone')} />
              <CityPicker value={address.city} onChange={(value) => setAddress({ ...address, city: value })} />
              <DistrictPicker
                city={address.city}
                value={address.district}
                onChange={(value) => setAddress({ ...address, district: value })}
              />
              <WardPicker
                district={address.district}
                value={address.ward}
                onChange={(value) => setAddress({ ...address, ward: value })}
              />
              <TextField
                id="address"
                label="Tên đường/Số nhà"
                value={address.street}
                onChange={(event) => setAddress({ ...address, street: event.target.value })}
              />
              <TextField
                id="description"
                multiline
                rows={4}
                label="Mô tả"
                className="col-span-2"
                {...register('description')}
              />
            </div>
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex justify-end">
                <Button type="submit" variant="contained">
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default AccountGeneral;
