import { RouteObject } from 'react-router-dom';
import config from '~/config';
import AuthLayout from '~/layouts/AuthLayout';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

const router: RouteObject = {
  path: '/',
  element: <AuthLayout />,
  children: [
    { path: config.routes.login, element: <Login /> },
    { path: config.routes.register, element: <Register /> },
  ],
};

export default router;
