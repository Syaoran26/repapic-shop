import { Router } from 'express';
import { getUser, getCart, changePassword } from '../app/controllers/me.js';

const router = Router();

router.get('/cart', getCart);
router.get('/', getUser);
router.patch('/change-password', changePassword);

export default router;
