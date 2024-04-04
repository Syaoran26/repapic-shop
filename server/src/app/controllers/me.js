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
