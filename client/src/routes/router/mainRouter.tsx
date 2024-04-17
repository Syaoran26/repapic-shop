import { RouteObject } from 'react-router-dom';
import config from '~/config';
import MainLayout from '~/layouts/MainLayout';
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
  ],
};

export default router;