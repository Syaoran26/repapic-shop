import { Button, Container, Link } from '@mui/material';
import { Helmet } from 'react-helmet';
import CheckoutStepper from './components/CheckoutStepper';
import CartTable from './components/CartTable';
import Order from './components/Order';
import { FaAngleLeft } from 'react-icons/fa6';
import config from '~/config';

const Cart = () => {
  return (
    <Container className="pt-16 mb-20 md:pt-20">
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <h1 className="my-6 text-xl font-bold md:my-10 md:text-2xl">Giỏ hàng</h1>
      <CheckoutStepper step={1} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartTable />
          <div className="mt-6">
            <Button variant="text" startIcon={<FaAngleLeft size={16} />} component={Link} href={config.routes.shop}>
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
        <div className="col-span-1">
          <Order />
          <div className="mt-6">
            <Button size="large" fullWidth component={Link} href={config.routes.cartAddress}>
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
