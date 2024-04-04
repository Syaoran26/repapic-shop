import { Router } from 'express';
import { getUser, getCart } from '../app/controllers/me.js';

const router = Router();

router.get('/cart', getCart);
router.get('/', getUser);

export default router;
