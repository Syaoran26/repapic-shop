import { Router } from 'express';
import { deleteOrder, getOrder, getOrders, updateOrder } from '../app/controllers/order.js';
import { verifyAdmin } from '../app/middlewares/auth.js';

const router = Router();

router.put('/:id', verifyAdmin, updateOrder);
router.delete('/:id', verifyAdmin, deleteOrder);
router.get('/:id', verifyAdmin, getOrder);
router.get('/', verifyAdmin, getOrders);

export default router;
