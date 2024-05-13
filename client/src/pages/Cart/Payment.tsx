import { Button, Container, Link, Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import CheckoutStepper from './components/CheckoutStepper';
import { FaAngleLeft, FaPen } from 'react-icons/fa6';
import config from '~/config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { AddressShipping } from '@common/types';
import Order from './components/Order';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const address = location.state?.address as AddressShipping;

  useLayoutEffect(() => {
    if (!address) {
      navigate(-1);
    }
  }, [address, navigate]);

  return (
    <Container className="pt-16 mb-20 md:pt-20">
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <h1 className="my-6 text-xl font-bold md:my-10 md:text-2xl">Thanh toán</h1>
      <CheckoutStepper step={3} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Paper className="p-6 mb-6">
            <h2 className="text-lg font-semibold">Vận chuyển</h2>
          </Paper>
          <Paper className="p-6 mb-6">
            <h2 className="mb-6 text-lg font-semibold">Phương thức thanh toán</h2>
          </Paper>
          <div className="mt-6">
            <Button
              variant="text"
              startIcon={<FaAngleLeft size={16} />}
              component={Link}
              href={config.routes.cartAddress}
            >
              Trờ lại
            </Button>
          </div>
        </div>
        <div className="col-span-1">
          <Paper className="p-6 mb-6">
            <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom={3}>
              <h2 className="text-lg font-semibold">Địa chỉ</h2>
              <Button
                variant="text"
                size="small"
                startIcon={<FaPen size={16} />}
                component={Link}
                href={config.routes.cartAddress}
              >
                Sửa
              </Button>
            </Stack>
            <Stack gap={1} className="text-sm">
              <div className="flex items-center gap-2">
                <h6 className="font-semibold">{address.name}</h6>
                <span className="text-fade">({address.home ? 'Nhà ở' : 'Văn phòng'})</span>
              </div>
              <span className="text-fade">{address.addressStr}</span>
              <span className="text-fade">{address.phone}</span>
            </Stack>
          </Paper>
          <Order editable />
          <div className="mt-6">
            <Button size="large" fullWidth>
              Hoàn thành
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Payment;
