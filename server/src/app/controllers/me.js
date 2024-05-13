import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { ErrorWithStatus } from '../../utils/error.js';
import Product from '../models/Product.js';

// Get current user
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { password, isAdmin, refreshToken, cart, wishlist, deliveryAddress, ...others } = user._doc;
  res.status(200).json(others);
});

export const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { $set: req.body });
  if (!user) {
    throw new ErrorWithStatus(400, 'Người dùng không tồn tại!');
  }

  res.status(200).json({ message: 'Thay đổi mật khẩu thành công!' });
});

export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('wishlist').populate('wishlist');
  res.status(200).json(user.wishlist);
});

export const addToWishlist = asyncHandler(async (req, res) => {
  // Check sản phẩm có tồn tại không
  const product = await Product.findById(req.params.productId).select('_id');
  if (!product) {
    throw new ErrorWithStatus(404, 'Không tìm thấy sản phẩm!');
  }

  // Check sản phẩm đã có trong wishlist chưa
  const user = await User.findById(req.user.id).select('wishlist');
  const existedProduct = user.wishlist.find((item) => item.equals(product._id));
  if (existedProduct) {
    throw new ErrorWithStatus(404, 'Đã tồn tại sản phẩm!');
  }

  user.wishlist.push(product._id);
  await user.save();
  res.status(200).json(user.wishlist);
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    throw new ErrorWithStatus('Không tìm thấy sản phẩm!');
  }

  const user = await User.findByIdAndUpdate(req.user.id, { $pull: { wishlist: product._id } }, { new: true }).select(
    'wishlist',
  );
  res.status(200).json(user.wishlist);
});

export const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('cart').populate('cart.product');
  res.status(200).json(user.cart);
});

export const addToCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('cart');
  const { product, quantity } = req.body;

  const existProduct = await Product.findById(product);
  if (!existProduct) {
    throw new ErrorWithStatus(400, 'Sản phẩm không tồn tại!');
  }

  const existCartItemIndex = user.cart.findIndex((item) => item.product.equals(product));

  if (existCartItemIndex !== -1) {
    user.cart[existCartItemIndex].quantity += quantity;
  } else {
    user.cart.push({ product, quantity });
  }
  await user.save();
  res.status(200).json(user.cart);
});

export const removeCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('cart');
  const id = req.params.itemId;
  if (!user) {
    throw new ErrorWithStatus(400, 'Người dùng không tồn tại!');
  }
  user.cart = user.cart.filter((i) => !i.product._id.equals(id));
  await user.save();
  res.status(200).json(user.cart);
});

export const updateCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('cart');
  const id = req.params.itemId;
  const quantity = req.body.quantity;
  if (!user) {
    throw new ErrorWithStatus(400, 'Người dùng không tồn tại!');
  }
  const item = user.cart.findIndex((i) => i.product._id.equals(id));
  if (item === -1) {
    throw new ErrorWithStatus(400, 'Sản phẩm không tồn tại trong giỏ hàng!');
  }
  if (quantity === 0) {
    user.cart.splice(item, 1);
  } else {
    user.cart[item].quantity = quantity;
  }
  await user.save();
  res.status(200).json(user.cart);
});
