import { createBrowserRouter } from 'react-router-dom';
import adminRouter from './adminRouter';
import { ErrorBoundary } from '~/pages/ErrorBoundary';

const router = createBrowserRouter(
  [adminRouter].map((route) => {
    return { ...route, ErrorBoundary: ErrorBoundary };
  }),
);

export default router;
