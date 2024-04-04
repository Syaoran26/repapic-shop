import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../app/controllers/user.js';
import { verifyAdmin } from '../app/middlewares/auth.js';
import { upload } from '../app/middlewares/upload.js';

const router = Router();

router.post('/', verifyAdmin, upload.single('avatar'), createUser);
router.put('/:id', verifyAdmin, updateUser);
router.delete('/:id', verifyAdmin, deleteUser);
router.get('/:id', getUser);
router.get('/', getUsers);

export default router;
