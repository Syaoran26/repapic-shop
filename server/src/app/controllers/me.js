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

export const addToCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new ErrorWithStatus(400, 'Người dùng không tồn tại!');
  }
  const cartItem = {
    product: req.body.product,
    quantity: req.body.quantity,
  };
  user.cart.push(cartItem);
  await user.save();
  res.status(200).json({ message: 'Đã thêm sản phẩm vào giỏ hàng.' });
});

export const removeCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const id = req.params.itemId;
  if (!user) {
    throw new ErrorWithStatus(400, 'Người dùng không tồn tại!');
  }
  user.cart = user.cart.filter((i) => !i.product._id.equals(id));
  await user.save();
  res.status(200).json({ message: 'Đã xóa sản phẩm ra khỏi giỏ hàng.' });
});

export const updateCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const id = req.params.itemId;
  const quantity = req.body.quantity;
  if (!user) {
    throw new ErrorWithStatus(400, 'Người dùng không tồn tại!');
  }
  const item = user.cart.findIndex((i) => i.product._id.equals(id));
  if (item === -1) {
    throw new ErrorWithStatus(400, 'Sản phẩm không tồn tại trong giỏ hàng!');
  }
  user.cart[item].quantity = quantity;
  await user.save();
  res.status(200).json({ message: 'Đã cập nhật sản phẩm thành công.' });
});
