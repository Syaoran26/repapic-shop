import { Router } from 'express';
import {
  getUser,
  getCart,
  changePassword,
  addToCart,
  removeCart,
  updateCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../app/controllers/me.js';
import {} from '../app/controllers/user.js';
import { getUserOrderById, getUserOrders } from '../app/controllers/order.js';

const router = Router();

router.get('/cart', getCart);
router.get('/', getUser);
router.post('/cart', addToCart);
router.delete('/cart/:itemId', removeCart);
router.patch('/cart/:itemId', updateCart);
router.patch('/change-password', changePassword);
router.get('/wishlist', getWishlist);
router.post('/wishlist/:productId', addToWishlist);
router.patch('/wishlist/:productId', removeFromWishlist);
router.get('orders', getUserOrders)
router.get('orders/:orderId', getUserOrderById)
export default router;
