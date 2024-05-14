import { RouteObject } from 'react-router-dom';
import config from '~/config';
import MainLayout from '~/layouts/MainLayout';
import AboutUs from '~/pages/AboutUs';
import Cart from '~/pages/Cart';
import Address from '~/pages/Cart/Address';
import Payment from '~/pages/Cart/Payment';
import Account from '~/pages/Account';
import ContactUs from '~/pages/ContactUs';
import Home from '~/pages/Home';
import Shop from '~/pages/Shop';
import ProductDetail from '~/pages/Shop/ProductDetail';

const router: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: config.routes.shop,
      element: <Shop />,
    },
    {
      path: config.routes.detail,
      element: <ProductDetail />,
    },
    {
      path: config.routes.aboutUs,
      element: <AboutUs />,
    },
    {
      path:config.routes.contactUs,
      element: <ContactUs />
    },
    {
      path:config.routes.cart,
      element: <Cart />
    },{
      path:config.routes.cartAddress,
      element: <Address />
    },{
      path:config.routes.cartPayment,
      element: <Payment />
    },{
      path:config.routes.account,
      element: <Account />
    }
  ],
};

export default router;
