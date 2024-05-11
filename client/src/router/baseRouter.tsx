import { RouteObject } from 'react-router-dom';
import config from '~/config';
import BaseLayout from '~/layouts/BaseLayout';
import ForgotPassword from '~/pages/ForgotPassword';
import NewPassword from '~/pages/NewPassword';
import Verify from '~/pages/Verify';

const router: RouteObject = {
  path: '/',
  element: <BaseLayout />,
  children: [
    { path: config.routes.forgotPassword, element: <ForgotPassword /> },
    { path: config.routes.verify, element: <Verify /> },
    { path: config.routes.newPassword, element: <NewPassword /> },
  ],
};

export default router;
