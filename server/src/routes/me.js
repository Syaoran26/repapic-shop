import { Router } from 'express';
import { getUser, getCart, changePassword } from '../app/controllers/me.js';
import { getWishList, addProductToWishList, deleteProductToWishList } from '../app/controllers/user.js';

const router = Router();

router.get('/cart', getCart);
router.get('/', getUser);
router.patch('/change-password', changePassword);
router.get('/wishlist', getWishList);
router.post('/wishlist/:productId', addProductToWishList)
router.patch('/wishlist/:productId', deleteProductToWishList)
export default router;
