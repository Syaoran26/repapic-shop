import { Button, Container, Link, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import CheckoutStepper from './components/CheckoutStepper';
import Order from './components/Order';
import AddressCard from './components/AddressCard';
import { FaAngleLeft, FaPlus } from 'react-icons/fa6';
import config from '~/config';
import { AddressShipping } from '@common/types';

const addressList: AddressShipping[] = [
  {
    name: 'Jayvion Simon',
    home: true,
    addressStr: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
    phone: '365-374-4961',
    isDefault: true,
  },
  {
    name: 'Deja Brady',
    home: false,
    addressStr: '1147 Rohan Drive Suite 819 - Burlington, VT / 82021',
    phone: '904-966-2836',
    isDefault: false,
  },
  {
    name: 'Lucian Obrien',
    home: false,
    addressStr: '18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337',
    phone: '399-757-9909',
    isDefault: false,
  },
  {
    name: 'Harrison Stein',
    home: false,
    addressStr: '110 Lamar Station Apt. 730 - Hagerstown, OK / 49808',
    phone: '692-767-2903',
    isDefault: false,
  },
];

const Address = () => {
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
            {addressList.map((address, index) => (
              <AddressCard data={address} key={index} />
            ))}
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" marginTop={3}>
            <Button variant="text" startIcon={<FaAngleLeft size={16} />} component={Link} href={config.routes.cart}>
              Trở về
            </Button>
            <Button variant="text" color="primary" startIcon={<FaPlus size={16} />}>
              Địa chỉ mới
            </Button>
          </Stack>
        </div>
        <div className="col-span-1">
          <Order />
        </div>
      </div>
    </Container>
  );
};

export default Address;
