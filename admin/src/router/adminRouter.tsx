import { RouteObject } from 'react-router-dom';
import config from '~/config';
import AdminLayout from '~/layouts/AdminLayout';
import Dashboard from '~/pages/Dashboard';
import ProductCreate from '~/pages/Product/Create';
import ProductList from '~/pages/Product/List';

const router: RouteObject = {
  path: config.routes.admin,
  element: <AdminLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: config.routes.product.list, element: <ProductList /> },
    { path: config.routes.product.create, element: <ProductCreate /> },
  ],
};

export default router;
