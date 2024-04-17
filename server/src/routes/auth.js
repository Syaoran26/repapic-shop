import { Router } from 'express';
import {
  googleAuth,
  login,
  logout,
  refreshToken,
  register,
  forgotPassword,
  resetPassword,
  changePassword,
} from '../app/controllers/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.put('/refresh-token', refreshToken);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/changePassword', changePassword);
router.patch('/resetPassword/:token', resetPassword);

export default router;
