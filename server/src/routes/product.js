import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../app/controllers/product.js';
import { verifyAdmin, verifyToken } from '../app/middlewares/auth.js';
import { editReview, writeReview } from '../app/controllers/review.js';
import { upload } from '../app/middlewares/upload.js';

const router = Router();

router.post('/', upload().single('thumbnail'), upload().fields({ name: 'images', maxCount: 10 }), createProduct);
router.post('/:slug/review', verifyToken, writeReview);
router.put('/:slug', verifyAdmin, updateProduct);
router.put('/:slug/review', verifyToken, editReview);
router.delete('/:slug', verifyAdmin, deleteProduct);
router.get('/:slug', getProduct);
router.get('/', getProducts);

export default router;
