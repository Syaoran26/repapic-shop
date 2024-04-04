import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from '../app/controllers/category.js';
import { verifyAdmin } from '../app/middlewares/auth.js';

const router = Router();

router.post('/', verifyAdmin, createCategory);
router.put('/:slug', verifyAdmin, updateCategory);
router.delete('/:slug', verifyAdmin, deleteCategory);
router.get('/:slug', getCategory);
router.get('/', getCategories);

export default router;
