import { Router } from 'express';

import { getUser, getCart, changePassword, addToCart, removeCart, updateCart, getWishList, addProductToWishList, deleteProductToWishList } from '../app/controllers/me.js';
import { verifyToken } from '../app/middlewares/auth.js';

const router = Router();

router.get('/cart', verifyToken, getCart);
router.get('/', verifyToken, getUser);
router.post('/cart/add', verifyToken, addToCart);
router.delete('/cart/remove/:itemId', verifyToken, removeCart);
router.patch('/cart/update/:itemId', verifyToken, updateCart);
router.patch('/change-password', verifyToken, changePassword);
router.get('/wishlist', getWishList);
router.post('/wishlist/:productId', addProductToWishList);
router.patch('/wishlist/:productId', deleteProductToWishList);

export default router;
