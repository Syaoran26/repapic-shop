import { createBrowserRouter } from 'react-router-dom';
import mainRouter from './mainRouter';
import authRouter from './authRouter';
import baseRouter from './baseRouter';

const router = createBrowserRouter([mainRouter, authRouter, baseRouter]);

export default router;
