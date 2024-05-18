import { Router } from 'express';
import {
  createOrder,
  createPaymentLink,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
  checkOutOrder,
  updateOrderStatus,
  getAllOrder,
  getOrderById,
} from '../app/controllers/order.js';
import { verifyAdmin } from '../app/middlewares/auth.js';

const router = Router();

router.post('/', createOrder);
router.put('/:id', verifyAdmin, updateOrder);
router.delete('/:id', verifyAdmin, deleteOrder);
router.get('/:id', verifyAdmin, getOrder);
router.get('/', verifyAdmin, getOrders);
router.post('/', checkOutOrder);
router.patch('/:orderId', verifyAdmin, updateOrderStatus);
router.get('/', verifyAdmin, getAllOrder);
router.get('/:orderId', verifyAdmin, getOrderById);
router.post('/:orderId/payos-link', createPaymentLink);

export default router;
