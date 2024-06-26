import { Router } from 'express';
import {
  googleAuth,
  login,
  logout,
  refreshToken,
  register,
  verify,
  resendOTP,
  resetPassword,
  loginByRefreshToken,
} from '../app/controllers/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/login/others', googleAuth);
router.post('/login-refresh', loginByRefreshToken);
router.put('/refresh-token', refreshToken);
router.get('/logout', logout);
router.patch('/verify', verify);
router.post('/forgot-password', resendOTP);
router.post('/resend', resendOTP);
router.patch('/reset-password', resetPassword);

export default router;
