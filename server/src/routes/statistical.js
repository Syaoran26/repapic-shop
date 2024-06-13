import { Router } from 'express';
import { numProduct, income, numUser, incomeByMonth } from '../app/controllers/statistical.js';
import { verifyAdmin } from '../app/middlewares/auth.js';

const router = Router();

router.get('/number-product', numProduct);
router.get('/income', income);
router.get('/number-user', numUser);
router.get('/', incomeByMonth);

export default router;
