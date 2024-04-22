import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { ErrorWithStatus } from '../../utils/error.js';

// Get current user
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { password, isAdmin, refreshToken, cart, wishlist, deliveryAddress, ...others } = user._doc;
  res.status(200).json(others);
});

// Get user's cart
export const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { cart } = user._doc;
  res.status(200).json(cart);
});

export const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { $set: req.body });
  if (!user) {
    throw new ErrorWithStatus(400, 'Người dùng không tồn tại!');
  }

  res.status(200).json({ message: 'Thay đổi mật khẩu thành công!' });
});
