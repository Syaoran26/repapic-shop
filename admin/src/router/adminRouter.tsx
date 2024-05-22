import { RouteObject } from 'react-router-dom';
import BaseLayout from '~/layouts/BaseLayout';

const router: RouteObject = {
  path: '/',
  element: <BaseLayout />,
  children: [],
};

export default router;
