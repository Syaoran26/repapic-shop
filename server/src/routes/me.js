import { Router } from 'express';
import { getUser, getCart, changePassword, addToCart, removeCart, updateCart } from '../app/controllers/me.js';

const router = Router();

router.get('/cart', getCart);
router.get('/', getUser);
router.post('/cart', addToCart);
router.delete('/cart/:itemId', removeCart);
router.patch('/cart/:itemId', updateCart);
router.patch('/change-password', changePassword);

export default router;
