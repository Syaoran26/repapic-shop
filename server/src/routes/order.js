import { Router } from 'express';
import { deleteOrder, getOrder, getOrders, updateOrder ,checkOutOrder, updateOrderStatus,cancelOrder,deleteOrderByAdmin,getAllOrder,getOrderById,getUserOrderById } from '../app/controllers/order.js';
import { verifyAdmin } from '../app/middlewares/auth.js';

const router = Router();

router.put('/:id', verifyAdmin, updateOrder);
router.delete('/:id', verifyAdmin, deleteOrder);
router.get('/:id', verifyAdmin, getOrder);
router.get('/', verifyAdmin, getOrders);
router.post('/orders', checkOutOrder);
router.patch('/orders/:orderId/cancel', updateOrderStatus);
router.delete('/orders/:orderId', verifyAdmin, cancelOrder)
router.get('/orders',verifyAdmin, getAllOrder)
router.get('/orders/:orderId', verifyAdmin,getOrderById)

export default router;
