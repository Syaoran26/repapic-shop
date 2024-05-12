import { createBrowserRouter } from 'react-router-dom';
import mainRouter from './mainRouter';
import authRouter from './authRouter';
import baseRouter from './baseRouter';
import { ErrorBoundary } from '~/pages/ErrorBoundary';

const router = createBrowserRouter(
  [mainRouter, authRouter, baseRouter].map((route) => {
    return { ...route, ErrorBoundary: ErrorBoundary };
  }),
);

export default router;
