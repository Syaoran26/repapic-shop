import { Router } from 'express';
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../app/controllers/blog.js';
import { verifyAdmin } from '../app/middlewares/auth.js';

const router = Router();

router.post('/', verifyAdmin, createBlog);
router.put('/:slug', verifyAdmin, updateBlog);
router.delete('/:slug', verifyAdmin, deleteBlog);
router.get('/:slug', getBlog);
router.get('/', getBlogs);

export default router;
