import { RouteObject } from 'react-router-dom';
import config from '~/config';
import MainLayout from '~/layouts/MainLayout';
import AboutUs from '~/pages/AboutUs';
import ContactUs from '~/pages/ContactUs';
import Home from '~/pages/Home';
import Shop from '~/pages/Shop';

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
      path: config.routes.aboutUs,
      element: <AboutUs />,
    },
    {
      path:config.routes.contactUs,
      element: <ContactUs />
    }
  ],
};

export default router;
