import productRouter from './product.js';
import authRouter from './auth.js';
import cateRouter from './category.js';
import userRouter from './user.js';
import orderRouter from './order.js';
import meRouter from './me.js';
import addressRouter from './address.js';
import { verifyToken } from '../app/middlewares/auth.js';

const routes = (app) => {
  app.use('/api/auth/me', verifyToken, meRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/products', productRouter);
  app.use('/api/categories', cateRouter);
  app.use('/api/users', userRouter);
  app.use('/api/orders', orderRouter);
  app.use('/api/address', addressRouter);
};

export default routes;
