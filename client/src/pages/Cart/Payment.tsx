import { Button, Container, FormControl, FormHelperText, Link, Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import CheckoutStepper from './components/CheckoutStepper';
import { FaAngleLeft, FaPen } from 'react-icons/fa6';
import config from '~/config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { AddressShipping } from '@common/types';
import Order from './components/Order';
import { CashIcon, PayOSLogo, RocketIcon, TruckIcon } from '@common/icons';
import { constants, format } from '@common/utils';
import { PaymentEnum, ShippingCost, ShippingEnum } from './constants';
import api from '~/config/api';
import { toast } from 'react-toastify';
import { useAppDispatch } from '~/app/hooks';
import { resetCart } from '~/features/cart/cartSlice';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const delivery: AddressShipping = location.state?.delivery;
  const [shipping, setShipping] = useState<ShippingEnum>();
  const [payment, setPayment] = useState<PaymentEnum>();
  const [errors, setErrors] = useState({ payment: '', shipping: '' });
  const [total, setTotal] = useState<number>();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!delivery) {
      navigate(-1);
    }
  }, [delivery, navigate]);

  const handleCheckout = () => {
    setErrors({
      shipping: shipping ? '' : 'Vui lòng chọn cách vận chuyển',
      payment: payment ? '' : 'Vui lòng chọn phương thức thanh toán',
    });
    if (payment && shipping) {
      api
        .post('/orders', { deliveryInfo: delivery, deliveryPrice: ShippingCost[shipping], total })
        .then((res) => {
          dispatch(resetCart());
          if (payment === PaymentEnum.PayOS) {
            api
              .post(`orders/${res.data._id}/payos-link`, {
                returnUrl: `${window.location.protocol}//${window.location.host + config.routes.cartPurchase}`,
                cancelUrl: `${window.location.protocol}//${window.location.host + config.routes.cartPurchase}`,
              })
              .then((res) => {
                openPaymentDialog(res.data);
              })
              .catch((err) => toast.error(err.response?.data.message || constants.sthWentWrong));
          } else {
            navigate(config.routes.cartPurchase);
          }
        })
        .catch((err) => toast.error(err.response?.data.message));
    }
  };

  const openPaymentDialog = async function (checkoutUrl: string) {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

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
            <h2 className="mb-6 text-lg font-semibold">Vận chuyển</h2>
            <Stack gap={3}>
              <Paper
                variant="outlined"
                className="p-5"
                onClick={() => setShipping(ShippingEnum.Standard)}
                sx={shipping === ShippingEnum.Standard ? { borderColor: 'var(--default-color)' } : undefined}
              >
                <div className="flex items-center">
                  <h5 className="flex-1 font-semibold">Tiêu chuẩn</h5>
                  <TruckIcon size={32} />
                </div>
                <div className="flex items-start justify-between">
                  <p className="text-sm text-fade">Trong 3 - 5 ngày</p>
                  <span className="text-lg font-bold">{format.price(15000)}</span>
                </div>
              </Paper>
              <Paper
                variant="outlined"
                className="p-5"
                onClick={() => setShipping(ShippingEnum.Express)}
                sx={shipping === ShippingEnum.Express ? { borderColor: 'var(--default-color)' } : undefined}
              >
                <div className="flex items-center">
                  <h5 className="flex-1 font-semibold">Hoả tốc</h5>
                  <RocketIcon size={32} />
                </div>
                <div className="flex items-start justify-between">
                  <p className="text-sm text-fade">Trong 1 - 2 ngày</p>
                  <span className="text-lg font-bold">{format.price(30000)}</span>
                </div>
              </Paper>
            </Stack>
            <FormControl error>
              <FormHelperText>{errors.shipping}</FormHelperText>
            </FormControl>
          </Paper>
          <Paper className="p-6">
            <h2 className="mb-6 text-lg font-semibold">Phương thức thanh toán</h2>
            <Stack gap={3}>
              <Paper
                variant="outlined"
                className="p-5"
                onClick={() => setPayment(PaymentEnum.PayOS)}
                sx={payment === PaymentEnum.PayOS ? { borderColor: 'var(--default-color)' } : undefined}
              >
                <div className="flex items-center">
                  <h5 className="flex-1 font-semibold">Mã QR</h5>
                  <PayOSLogo width={66.8} height={32} />
                </div>
                <p className="text-sm text-fade">Chúng tôi hỗ trợ thanh toán trước thông qua mã QR</p>
              </Paper>
              <Paper
                variant="outlined"
                className="p-5"
                onClick={() => setPayment(PaymentEnum.Cash)}
                sx={payment === PaymentEnum.Cash ? { borderColor: 'var(--default-color)' } : undefined}
              >
                <div className="flex items-center">
                  <h5 className="flex-1 font-semibold">Tiền mặt</h5>
                  <CashIcon size={32} />
                </div>
                <p className="text-sm text-fade">Thanh toán bằng tiền mặt khi đơn hàng của bạn được giao.</p>
              </Paper>
            </Stack>
            <FormControl error>
              <FormHelperText>{errors.payment}</FormHelperText>
            </FormControl>
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
                <h6 className="font-semibold">{delivery.name}</h6>
                <span className="text-fade">({delivery.isHome ? 'Nhà ở' : 'Văn phòng'})</span>
              </div>
              <span className="text-fade">{`${delivery.address.street}, ${delivery.address.detail}`}</span>
              <span className="text-fade">{delivery.phone}</span>
            </Stack>
          </Paper>
          <Order editable shipping={shipping} getTotal={setTotal} />
          <div className="mt-6">
            <Button size="large" fullWidth onClick={handleCheckout}>
              Hoàn thành
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Payment;
