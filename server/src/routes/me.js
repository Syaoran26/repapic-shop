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
import {
  createDeliveryInfo,
  updateDeliveryInfo,
  removeDeliveryInfo,
  getDeliveryInfos,
  getDeliveryInfo,
} from '../app/controllers/address.js';
import { cancelOrder } from '../app/controllers/order.js';

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
router.post('/deliveries', createDeliveryInfo);
router.put('/deliveries/:id', updateDeliveryInfo);
router.delete('/deliveries/:id', removeDeliveryInfo);
router.get('/deliveries/:id', getDeliveryInfo);
router.get('/deliveries', getDeliveryInfos);
router.patch('/orders/:id/cancel', cancelOrder);

export default router;
