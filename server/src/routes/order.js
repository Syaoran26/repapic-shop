import { Router } from 'express';
import {
  createOrder,
  createPaymentLink,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from '../app/controllers/order.js';
import { verifyAdmin } from '../app/middlewares/auth.js';

const router = Router();

router.post('/', createOrder);
router.put('/:id', verifyAdmin, updateOrder);
router.delete('/:id', verifyAdmin, deleteOrder);
router.get('/:id', verifyAdmin, getOrder);
router.get('/', verifyAdmin, getOrders);
router.post('/:orderId/payos-link', createPaymentLink);

export default router;
