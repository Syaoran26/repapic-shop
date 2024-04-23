import { Router } from 'express';
import {
  googleAuth,
  login,
  logout,
  refreshToken,
  register,
  forgotPassword,
  resetPassword,
} from '../app/controllers/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.put('/refresh-token', refreshToken);
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
