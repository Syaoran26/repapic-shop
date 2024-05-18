import { Router } from 'express';
import {
  checkout,
  createPaymentLink,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrderStatus,
} from '../app/controllers/order.js';
import { verifyAdmin, verifyToken } from '../app/middlewares/auth.js';

const router = Router();

router.post('/', verifyToken, checkout);
router.patch('/:id', verifyAdmin, updateOrderStatus);
router.delete('/:id', verifyAdmin, deleteOrder);
router.get('/:id', verifyToken, getOrder);
router.get('/', verifyToken, getOrders);
router.post('/:orderId/payos-link', createPaymentLink);

export default router;
