import { ChangeEvent, FormEvent, useState } from 'react';
import {
  Button,
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import CheckoutStepper from './components/CheckoutStepper';
import Order from './components/Order';
import AddressCard from './components/AddressCard';
import { FaAngleLeft, FaPlus } from 'react-icons/fa6';
import config from '~/config';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { createDelivery, getDeliveries } from '~/features/deliveries/deliveriesSlice';
import { useMount } from '@common/hooks';
import { CityPicker, DistrictPicker, NoData, WardPicker } from '@common/components';
import { constants } from '@common/utils';

const Address = () => {
  const { deliveries } = useAppSelector((state) => state.deliveries);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [formItem, setFormItem] = useState({
    isHome: true,
    name: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    street: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    city: '',
    district: '',
    street: '',
  });

  useMount(() => {
    dispatch(getDeliveries());
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormItem({ ...formItem, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, phone, city, district, isHome, street, ward } = formItem;
    const error = {
      name: name ? '' : 'Vui lòng nhập tên đúng',
      phone: phone.match(constants.phoneRegex) ? '' : 'Vui lòng nhập số điện thoại đúng điện dạng',
      city: city ? '' : 'Vui lòng chọn tỉnh hoặc thành phố',
      district: district ? '' : 'Vui lòng chọn quận hoặc huyện',
      street: street ? '' : 'Vui lòng nhập số nhà và tên đường',
    };
    setErrors(error);
    const isValid = Object.values(error).every((value) => value === '');
    if (isValid) {
      dispatch(createDelivery({ name, phone, isHome, address: { city, district, ward, street } }));
      setOpen(false);
    }
  };

  return (
    <Container className="pt-16 mb-20 md:pt-20">
      <Helmet>
        <title>Chọn địa chỉ</title>
      </Helmet>
      <h1 className="my-6 text-xl font-bold md:my-10 md:text-2xl">Chọn địa chỉ</h1>
      <CheckoutStepper step={2} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Stack gap={3}>
            {deliveries.length > 0 ? (
              deliveries.map((info) => <AddressCard data={info} key={info._id} />)
            ) : (
              <NoData title="Không có địa chỉ " />
            )}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" marginTop={3}>
            <Button variant="text" startIcon={<FaAngleLeft size={16} />} component={Link} href={config.routes.cart}>
              Trở về
            </Button>
            <Button variant="text" color="primary" startIcon={<FaPlus size={16} />} onClick={handleOpen}>
              Địa chỉ mới
            </Button>
          </Stack>
        </div>
        <div className="col-span-1">
          <Order editable />
        </div>
      </div>
      <Dialog open={open} PaperProps={{ sx: { width: '100%', maxWidth: 600 } }}>
        <h2 className="p-6 text-lg font-bold">Thêm địa chỉ mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 px-6">
            <RadioGroup
              aria-labelledby="radio-buttons-group-home"
              defaultValue={true}
              row
              name="isHome"
              value={formItem.isHome}
              onChange={handleChange}
            >
              <FormControlLabel value={true} control={<Radio />} label="Nhà ở" />
              <FormControlLabel value={false} control={<Radio />} label="Văn phòng" />
            </RadioGroup>
            <div className="flex gap-4">
              <TextField
                label="Họ tên"
                className="flex-1"
                name="name"
                value={formItem.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Số điện thoại"
                className="flex-1"
                name="phone"
                value={formItem.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </div>
            <FormControl error={!!errors.city}>
              <CityPicker value={formItem.city} onChange={(value) => setFormItem({ ...formItem, city: value })} />
              <FormHelperText>{errors.city}</FormHelperText>
            </FormControl>
            <FormControl error={!!errors.district}>
              <DistrictPicker
                city={formItem.city}
                value={formItem.district}
                onChange={(value) => setFormItem({ ...formItem, district: value })}
              />
              <FormHelperText>{errors.district}</FormHelperText>
            </FormControl>
            <WardPicker
              district={formItem.district}
              value={formItem.ward}
              onChange={(value) => setFormItem({ ...formItem, ward: value })}
            />
            <TextField
              label="Số nhà, tên đường"
              name="street"
              value={formItem.street}
              onChange={handleChange}
              error={!!errors.street}
              helperText={errors.street}
            />
          </div>
          <div className="flex justify-end gap-2 p-6">
            <Button variant="outlined" onClick={handleClose}>
              Huỷ
            </Button>
            <Button type="submit">Thêm</Button>
          </div>
        </form>
      </Dialog>
    </Container>
  );
};

export default Address;
