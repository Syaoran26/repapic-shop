import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Get current user
export const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { password, isAdmin, refreshToken, cart, wishlist, deliveryAddress, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    throw error;
  }
});

// Get user's cart
export const getCart = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { cart } = user._doc;
    res.status(200).json(cart);
  } catch (error) {
    throw error;
  }
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { $set: req.body });
  if (!user) {
    return next(createError(400, 'Người dùng không tồn tại!'));
  }

  res.status(200).json({ message: 'Thay đổi mật khẩu thành công!' });
});
