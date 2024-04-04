import { createBrowserRouter } from 'react-router-dom';
import config from '.';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import BaseLayout from '../layouts/BaseLayout';
import ForgotPassword from '../pages/ForgotPassword';
import Verify from '../pages/Verify';
import NewPassword from '../pages/NewPassword';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: config.routes.login, element: <Login /> },
      { path: config.routes.register, element: <Register /> },
    ],
  },
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: config.routes.forgotPassword, element: <ForgotPassword /> },
      { path: config.routes.verify, element: <Verify /> },
      { path: config.routes.newPassword, element: <NewPassword /> },
    ],
  },
]);

export default router;
